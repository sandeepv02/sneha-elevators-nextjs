<?php
require_once 'google_sheets.php';

// -------------------------------
// ✅ Security: Sanitize Input Function
// -------------------------------
function sanitizeInput($input) {
    if (empty($input)) return '';
    $input = strip_tags($input);
    $input = htmlspecialchars($input, ENT_QUOTES, 'UTF-8');
    $input = preg_replace('/https?:\/\/[^\s]+/i', '[URL_REMOVED]', $input);
    $input = preg_replace('/www\.[^\s]+/i', '[URL_REMOVED]', $input);
    return substr($input, 0, 1000);
}

// -------------------------------
// ✅ Format Indian Phone Number (+91)
// -------------------------------
function formatIndianPhone($phone) {
    if (empty($phone)) return '';

    // Keep only numbers
    $phone = preg_replace('/\D+/', '', $phone);

    // If country code already exists, keep last 10 digits
    if (strlen($phone) > 10) {
        $phone = substr($phone, -10);
    }

    // Add +91
    return '+91' . $phone;
}

// -------------------------------
// ✅ Get Form Data and Sanitize
// -------------------------------
$fullname     = sanitizeInput($_POST['fullname'] ?? '');
$email        = sanitizeInput($_POST['email'] ?? '');
$rawPhone     = sanitizeInput($_POST['phone'] ?? '');
$phone        = formatIndianPhone($rawPhone);
$state        = sanitizeInput($_POST['state'] ?? '');
$message      = sanitizeInput($_POST['message'] ?? '');
$utm_source   = sanitizeInput($_POST['utm_source'] ?? '');
$utm_campaign = sanitizeInput($_POST['utm_campaign'] ?? '');
$utm_medium   = sanitizeInput($_POST['utm_medium'] ?? '');
$form_type    = sanitizeInput($_POST['form_type'] ?? '');

date_default_timezone_set('Asia/Kolkata');
$timestamp = date("Y-m-d H:i:s");

// -------------------------------
// ✅ Parallel API Execution (Google Sheets + CRM API)
// -------------------------------
$sheetData = [
    'Full Name'     => $fullname,
    'Email'         => $email,
    'Phone'         => $phone,
    'State'         => $state,
    'Message'       => $message,
    'Form Type'     => $form_type,
    'UTM Source'    => $utm_source,
    'UTM Campaign'  => $utm_campaign,
    'UTM Medium'    => $utm_medium,
    'Timestamp'     => $timestamp
];

$mh = curl_multi_init();

// 1. Google Sheets Handle
$ch_sheet = getGoogleSheetCurlHandle($sheetData);
curl_multi_add_handle($mh, $ch_sheet);

// 2. CRM API Handle
$combinedNotes =
    "Message: $message\n" .
    "State: $state\n" .
    "Form Type: $form_type\n" .
    "UTM Source: $utm_source\n" .
    "UTM Medium: $utm_medium\n" .
    "UTM Campaign: $utm_campaign";

$data = [
    "leadName"         => $fullname,
    "leadMobileNumber" => $phone,
    "lead_source_name" => "landing-page",
    "emailId"          => $email,
    "notes"            => $combinedNotes,
];

$url_crm = "https://sneha-apis.elevatorplus.net/lead/createLead";
$ch_crm = curl_init($url_crm);
curl_setopt($ch_crm, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch_crm, CURLOPT_POST, true);
curl_setopt($ch_crm, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch_crm, CURLOPT_TIMEOUT, 10);
curl_setopt($ch_crm, CURLOPT_HTTPHEADER, [
    "Content-Type: application/json",
    "accessKey: 17b6fa3398be6c83c31a1204694bd4f8:08aff750fde466d2131a21c793ad5b724bc8f270de27299689b840576e4b1a91"
]);
curl_multi_add_handle($mh, $ch_crm);

// Execute handles in parallel
$running = null;
do {
    $mrc = curl_multi_exec($mh, $running);
} while ($mrc == CURLM_CALL_MULTI_PERFORM);

while ($running && $mrc == CURLM_OK) {
    if (curl_multi_select($mh) != -1) {
        do {
            $mrc = curl_multi_exec($mh, $running);
        } while ($mrc == CURLM_CALL_MULTI_PERFORM);
    }
}

// Clean up
curl_multi_remove_handle($mh, $ch_sheet);
curl_multi_remove_handle($mh, $ch_crm);
curl_multi_close($mh);

// -------------------------------
// ✅ Response: AJAX (JSON) or Default
// -------------------------------
$isAjax = !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';

if ($isAjax) {
    header('Content-Type: application/json');
    echo json_encode([
        'status' => 'success',
        'message' => 'Lead submitted successfully',
        'redirect' => 'thankyou.php'
    ]);
    exit;
} else {
    header("Location: thankyou.php");
    exit;
}
?>
