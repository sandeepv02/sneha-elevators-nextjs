"use client";

import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
  });
  const [status, setStatus] = useState({
    submitted: false,
    success: false,
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ submitted: false, success: false, message: "" });

    try {
      // 1. Gather UTM parameters from URL if present
      let utmSource = "";
      let utmCampaign = "";
      let utmMedium = "";
      
      if (typeof window !== "undefined") {
        const searchParams = new URLSearchParams(window.location.search);
        utmSource = searchParams.get("utm_source") || "";
        utmCampaign = searchParams.get("utm_campaign") || "";
        utmMedium = searchParams.get("utm_medium") || "";
      }

      // 2. Trigger both requests in parallel
      const apiPromise = fetch("https://sneha-elevators-api.onrender.com/contact/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          phoneNumber: formData.phoneNumber,
          email: "",
          message: "Submitted from Footer Contact Form",
        }),
      });

      const crmPromise = fetch("/api/crm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: "",
          phoneNumber: formData.phoneNumber,
          message: "Submitted from Footer Contact Form",
          formType: "footer",
          utmSource,
          utmCampaign,
          utmMedium,
        }),
      });

      const [apiResponse, crmResponse] = await Promise.all([apiPromise, crmPromise]);

      if (apiResponse.ok || crmResponse.ok) {
        setStatus({
          submitted: true,
          success: true,
          message: "Thank you! Your request has been sent successfully.",
        });
        setFormData({ fullName: "", phoneNumber: "" });

        // Hide notification after 3 seconds
        setTimeout(() => {
          setStatus({ submitted: false, success: false, message: "" });
        }, 3000);
      } else {
        setStatus({
          submitted: true,
          success: false,
          message: "Failed to send request. Please try again.",
        });
      }
    } catch (error) {
      setStatus({
        submitted: true,
        success: false,
        message: "Error sending message: " + error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="site-footer">
      <div className="container-fluid page-width">
        <div className="row">
          <div className="col-12 text-center footer-logo-section">
            <img src="/img/full-logo.png" alt="Sneha Elev8r" className="footer-logo" />
          </div>
        </div>
        <hr className="footer-divider" />
        <div className="footer-wrapper">
          <div className="row footer-content">
            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 mb-4">
              <h5 className="footer-heading">Reach us</h5>
              <div className="footer-contact">
                <div className="contact-item">
                  <i className="fas fa-phone-alt fa-flip-horizontal"></i>
                  <span>
                    <a href="tel:+919100812345">+91 91008 12345</a>
                  </span>
                </div>
                <div className="contact-item">
                  <i className="fas fa-envelope"></i>
                  <div className="contact-emails">
                    <span>
                      <a href="mailto:sales@snehaelev8r.com">sales@snehaelev8r.com</a>
                    </span>
                    <span>
                      <a href="mailto:info@snehaelev8r.com">info@snehaelev8r.com</a>
                    </span>
                  </div>
                </div>
                <div className="contact-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>
                    D.No : 2-40/30/1, Road No. 5,
                    <br />
                    Jubilee Gardens, Kondapur,
                    <br />
                    Hyderabad - 500084, Telangana, India.
                  </span>
                </div>
              </div>
            </div>
            <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 mb-4">
              <h5 className="footer-heading">Company</h5>
              <ul className="footer-links">
                <li>
                  <Link href="/about">About</Link>
                </li>
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
                <li>
                  <Link href="/blogs">Blogs</Link>
                </li>
              </ul>
            </div>
            <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 mb-4">
              <h5 className="footer-heading">Legal</h5>
              <ul className="footer-links">
                <li>
                  <Link href="/privacy-policy">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/terms-and-conditions">Terms & Conditions</Link>
                </li>
              </ul>
            </div>
            <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 mb-4">
              <h5 className="footer-heading">Quick Links</h5>
              <ul className="footer-links">
                <li>
                  <Link href="/services">Services</Link>
                </li>
              </ul>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-12 mb-4">
              <div className="contact-form-wrapper">
                <h5 className="footer-heading">Contact us</h5>
                <form className="footer-contact-form" onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="fullName"
                      className="form-control"
                      placeholder="Name"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="tel"
                      name="phoneNumber"
                      className="form-control"
                      placeholder="Phone number"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-submit" disabled={loading}>
                    {loading ? "Submitting..." : "Submit"}
                  </button>
                </form>
                {status.submitted && (
                  <div
                    style={{
                      marginTop: "10px",
                      padding: "10px",
                      borderRadius: "4px",
                      fontSize: "0.9rem",
                      backgroundColor: status.success ? "#d4edda" : "#f8d7da",
                      color: status.success ? "#155724" : "#721c24",
                    }}
                  >
                    {status.message}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
