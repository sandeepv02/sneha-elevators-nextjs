import React from "react";

export const metadata = {
  title: "Privacy Policy - Sneha Elev8r",
  description: "Read our Privacy Policy to understand how we collect, use, and protect your data.",
};

export default function PrivacyPolicy() {
  return (
    <div style={{ width: "100%", overflowX: "hidden" }}>
      <section
        className="container-fluid page-width terms-hero"
        style={{ padding: "140px 0 80px" }}
      >
        <h1 style={{ fontSize: "36px", marginBottom: "40px", fontWeight: "bold" }}>
          Privacy Policy
        </h1>

        <h3>1. Introduction</h3>
        <p>
          SnehaElev8r ("we," "us," or "our") respects your privacy and is committed to protecting
          your personal information. This Privacy Policy explains how we collect, use, disclose,
          store, and share your information when you use our mobile application ("App") and
          related services ("Services").
          <br />
          By using the SnehaElev8r App, you agree to the collection and use of information in
          accordance with this Privacy Policy. If you do not agree with our policies and
          practices, please do not use our App.
        </p>

        <h3>2. Information We Collect</h3>
        <p className="form-label">2.1 Personal Information</p>
        <p>We may collect the following types of personal information from you:</p>
        <ul>
          <li>Name</li>
          <li>Email address</li>
          <li>Phone number</li>
          <li>Company name</li>
          <li>Device information (e.g., device model, operating system, unique device identifiers)</li>
          <li>Account credentials (username and password)</li>
        </ul>

        <p className="form-label">2.2 Location Data</p>
        <p>Our App collects and processes location data as described below:</p>
        <p className="sub-heading-form">Types of Location Data Collected:</p>
        <ul>
          <li>
            Precise Location Data: We collect precise GPS coordinates (latitude and longitude) from
            your device when you use certain features of the App, such as technician tracking, job
            assignment, and real-time service updates.
          </li>
          <li>
            Approximate Location Data: We may also collect approximate location information based on
            your IP address or network-based location services.
          </li>
        </ul>

        <p className="sub-heading-form">How Location Data is Collected:</p>
        <ul>
          <li>
            When in Use: Location data is collected when you are actively using the App,
            particularly when using features that require location services (such as viewing
            technician locations or logging service visits).
          </li>
          <li>
            Background Location (if applicable): For field technicians, the App may collect
            location data in the background to enable real-time tracking and efficient job
            assignment, even when the App is not actively open. This background collection is
            essential for operational efficiency and safety purposes.
          </li>
          <li>
            Technical Methods: Location data is collected through GPS, Wi-Fi, cellular network
            towers, and other location-sensing technologies available on your device.
          </li>
        </ul>

        <p className="sub-heading-form">Purpose of Location Data Collection:</p>
        <ul>
          <li>
            Technician Tracking: To enable real-time tracking of field technicians for operational
            efficiency, safety, and customer service purposes.
          </li>
          <li>
            Job Assignment: To assign service jobs to the nearest available technician based on
            their current location.
          </li>
          <li>
            Service Optimization: To optimize service routes, reduce travel time, and improve
            overall service efficiency.
          </li>
          <li>
            Emergency Response: To provide assistance and support to technicians in case of
            emergencies or safety concerns.
          </li>
          <li>
            Service Verification: To verify that service visits occur at the correct locations and
            maintain accurate service records.
          </li>
          <li>
            Analytics and Improvement: To analyze service patterns, improve App functionality, and
            enhance user experience.
          </li>
        </ul>

        <p className="sub-heading-form">User Control Over Location Data:</p>
        <ul>
          <li>
            Permission Required: The App will request your permission before accessing location
            data. You can grant or deny this permission through your device settings.
          </li>
          <li>
            Control Settings: You can control location access at any time through your device's
            Settings app under Location Services or App Permissions.
          </li>
          <li>
            Disabling Location: If you disable location services, certain features of the App (such
            as technician tracking and job assignment) may not function properly or may be
            unavailable.
          </li>
          <li>
            Revoking Permission: You can revoke location permission at any time. However, this may
            limit your ability to use certain App features.
          </li>
        </ul>

        <p className="sub-heading-form">Location Data Retention:</p>
        <ul>
          <li>
            Retention Period: Location data is retained for as long as necessary to fulfill the
            purposes outlined above, typically for the duration of active service assignments and
            for a reasonable period thereafter for record-keeping and analytics purposes.
          </li>
          <li>
            Deletion: You may request deletion of your location data by contacting us at
            info@snehaelev8r.com. We will delete your location data in accordance with applicable
            laws, except where retention is required for legal or legitimate business purposes.
          </li>
        </ul>

        <p className="sub-heading-form">Sharing of Location Data:</p>
        <p>Location data may be shared in the following circumstances:</p>
        <ul>
          <li>
            Within the App: Location data is shared with authorized users within your organization
            (such as dispatchers, managers, and other technicians) who need access to this
            information for operational purposes.
          </li>
          <li>
            Service Providers: We may share location data with trusted third-party service
            providers who assist us in operating the App, such as cloud hosting providers and
            analytics services. These providers are contractually obligated to protect your data
            and use it only for the purposes we specify.
          </li>
          <li>
            Legal Requirements: We may disclose location data if required to do so by law or in
            response to valid legal requests by public authorities.
          </li>
        </ul>

        <p className="sub-heading-form">Location Data Security:</p>
        <p>
          We implement appropriate technical and organizational security measures to protect
          location data from unauthorized access, disclosure, alteration, or destruction. These
          measures include encryption during transmission, secure storage, and access controls.
        </p>

        <p className="form-label">2.3 Usage Data</p>
        <p>
          We automatically collect information about your interactions with the App, including:
        </p>
        <ul>
          <li>Features accessed and time spent on the App</li>
          <li>Pages or screens viewed</li>
          <li>Actions taken within the App</li>
          <li>Error logs and crash reports for App performance improvements</li>
          <li>Date and time of access</li>
        </ul>

        <p className="form-label">2.4 Cookies and Tracking Technologies</p>
        <p>
          The App may use cookies or similar tracking technologies to enhance your experience,
          remember your preferences, and analyze usage patterns. You can manage cookie preferences
          through your device settings.
        </p>

        <h3>3. How We Use Your Information</h3>
        <p>We use the information we collect for the following purposes:</p>
        <ul>
          <li>
            Provide and Maintain Services: To deliver the core functionality of the App, including
            maintenance scheduling, breakdown alerts, job assignments, and technician tracking.
          </li>
          <li>
            Improve User Experience: To optimize App performance, personalize your experience, and
            develop new features.
          </li>
          <li>
            Communication: To send you notifications about maintenance reminders, job updates,
            service alerts, and other important information related to your use of the App.
          </li>
          <li>
            Customer Support: To respond to your inquiries, provide technical assistance, and
            address any issues you may encounter.
          </li>
          <li>
            Business Operations: To manage appointments, facilitate communication between clients
            and technicians, and ensure operational efficiency.
          </li>
          <li>
            Marketing and Promotions: To send you updates, promotions, and relevant business
            information, with your consent where required by law.
          </li>
          <li>
            Security and Fraud Prevention: To detect, prevent, and address fraud, abuse, security
            breaches, and other potentially harmful activities.
          </li>
          <li>
            Legal Compliance: To comply with applicable laws, regulations, legal processes, and
            enforceable governmental requests.
          </li>
          <li>
            Analytics and Research: To analyze usage patterns, conduct research, and generate
            insights to improve our Services.
          </li>
        </ul>

        <h3>4. How We Share Your Information</h3>
        <p>
          We do not sell, trade, or rent your personal information to third parties. However, we may
          share your information in the following circumstances:
        </p>
        <ul>
          <li>
            Service Providers: We may share your information with trusted third-party service
            providers who assist us in operating the App, such as cloud hosting providers,
            analytics services, customer support platforms, and payment processors. These providers
            are contractually obligated to protect your data and use it only for the purposes we
            specify.
          </li>
          <li>
            Business Partners: With your explicit consent, we may share your information with
            business partners for collaborative services or marketing purposes.
          </li>
          <li>
            Within Your Organization: Information may be shared with authorized users within your
            organization (such as managers, dispatchers, and technicians) who need access for
            operational purposes.
          </li>
          <li>
            Legal Obligations: We may disclose your information to comply with legal obligations,
            law enforcement requests, court orders, or to protect our rights, property, or safety,
            or that of others.
          </li>
          <li>
            Business Transfers: In the event of a merger, acquisition, reorganization, or sale of
            assets, your information may be transferred to the acquiring entity, subject to this
            Privacy Policy.
          </li>
          <li>
            Aggregated or Anonymized Data: We may share aggregated or anonymized data that does not
            personally identify you for research, analytics, or marketing purposes.
          </li>
        </ul>

        <h3>5. Data Security</h3>
        <p>
          We take the security of your personal information seriously and implement reasonable
          technical, administrative, and physical security measures to protect your data from
          unauthorized access, disclosure, alteration, or destruction. These measures include:
        </p>
        <ul>
          <li>Encryption of data during transmission and storage</li>
          <li>Secure access controls and authentication mechanisms</li>
          <li>Regular security assessments and updates</li>
          <li>Employee training on data security and privacy practices</li>
        </ul>
        <p>
          However, please note that no method of transmission over the internet or method of
          electronic storage is 100% secure. While we strive to protect your personal information,
          we cannot guarantee its absolute security.
        </p>

        <h3>6. Data Retention</h3>
        <p>
          We retain your personal information for as long as necessary to fulfill the purposes
          outlined in this Privacy Policy, or as required by law. The retention period depends on:
        </p>
        <ul>
          <li>The nature and purpose of the data collection</li>
          <li>Your ongoing use of the App and Services</li>
          <li>Legal, regulatory, or contractual obligations</li>
          <li>Legitimate business interests (e.g., record-keeping, dispute resolution)</li>
        </ul>
        <p>
          Once the retention period expires, we will securely delete or anonymize your personal
          information in accordance with applicable laws and our data retention policies.
        </p>

        <h3>7. Your Privacy Rights</h3>
        <p>Depending on your location, you may have certain rights regarding your personal information:</p>
        <ul>
          <li>Access and Review: You have the right to access and review the personal information we hold about you.</li>
          <li>Correction: You have the right to request correction of any inaccurate or incomplete personal information.</li>
          <li>Deletion: You have the right to request deletion of your personal information, subject to certain legal exceptions.</li>
          <li>Restriction of Processing: You have the right to request restriction of the processing of your personal information.</li>
          <li>Data Portability: You have the right to request a copy of your personal information in a structured format.</li>
          <li>Objection: You have the right to object to the processing of your personal information.</li>
          <li>Withdraw Consent: Where processing is based on your consent, you have the right to withdraw consent.</li>
        </ul>
        <p>To exercise any of these rights, please contact us at info@snehaelev8r.com.</p>

        <h3>8. Contact Us</h3>
        <p>If you have any questions or concerns regarding this Privacy Policy, please contact us:</p>
        <ul>
          <li>Email: info@snehaelev8r.com</li>
          <li>Website: www.snehaelev8r.com</li>
        </ul>
      </section>
    </div>
  );
}
