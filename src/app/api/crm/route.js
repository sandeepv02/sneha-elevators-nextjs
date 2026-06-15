import { NextResponse } from "next/server";

function formatIndianPhone(phone) {
  if (!phone) return "";
  // Keep only numbers
  const digits = phone.replace(/\D+/g, "");
  // Keep last 10 digits
  const last10 = digits.slice(-10);
  return "+91" + last10;
}

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      fullName,
      email,
      phoneNumber,
      message,
      state = "",
      formType = "contact",
      utmSource = "",
      utmMedium = "",
      utmCampaign = "",
    } = body;

    const phone = formatIndianPhone(phoneNumber);

    const combinedNotes =
      `Message: ${message || ""}\n` +
      `State: ${state || ""}\n` +
      `Form Type: ${formType || ""}\n` +
      `UTM Source: ${utmSource || ""}\n` +
      `UTM Medium: ${utmMedium || ""}\n` +
      `UTM Campaign: ${utmCampaign || ""}`;

    const payload = {
      leadName: fullName || "",
      leadMobileNumber: phone,
      lead_source_name: "website",
      emailId: email || "",
      notes: combinedNotes,
    };

    const response = await fetch("https://sneha-apis.elevatorplus.net/lead/createLead", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "accessKey": "17b6fa3398be6c83c31a1204694bd4f8:08aff750fde466d2131a21c793ad5b724bc8f270de27299689b840576e4b1a91"
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { success: false, error: `CRM submission failed: ${errorText}` },
        { status: response.status }
      );
    }

    // Try parsing as JSON or text
    let data;
    try {
      data = await response.json();
    } catch {
      data = { success: true };
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
