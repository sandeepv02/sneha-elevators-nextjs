"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { usePreloader } from "@/components/PreloaderContext";

export default function Contact() {
  const { isCompleted } = usePreloader();
  const containerRef = useRef(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    message: "",
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
        body: JSON.stringify(formData),
      });

      const crmPromise = fetch("/api/crm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          message: formData.message,
          formType: "contact",
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
          message: "Thank you! Your message has been sent successfully.",
        });
        setFormData({ fullName: "", email: "", phoneNumber: "", message: "" });

        // Hide status after 4 seconds
        setTimeout(() => {
          setStatus({ submitted: false, success: false, message: "" });
        }, 4000);
      } else {
        setStatus({
          submitted: true,
          success: false,
          message: "Failed to send your message. Please try again later.",
        });
      }
    } catch (error) {
      setStatus({
        submitted: true,
        success: false,
        message: "Error submitting message: " + error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  // 1. Initial GSAP state setup (runs instantly on mount to prevent any flash/glitch)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tag = document.querySelector(".contact-header .section-2-tagline");
      const title = document.querySelector(".contact-header .contact-title");
      const subtext = document.querySelector(".contact-header .contact-subtext");
      const infoBlock = document.querySelector(".contact-info");
      const formCard = document.querySelector(".contact-form-card");

      if (tag && title && subtext && infoBlock && formCard) {
        gsap.set([tag, title, subtext, infoBlock, formCard], {
          opacity: 0,
          y: 30,
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // 2. Play animations and register ScrollTriggers (runs once preloader is completed)
  useLayoutEffect(() => {
    if (!isCompleted) return;

    const ctx = gsap.context(() => {
      const tag = document.querySelector(".contact-header .section-2-tagline");
      const title = document.querySelector(".contact-header .contact-title");
      const subtext = document.querySelector(".contact-header .contact-subtext");
      const infoBlock = document.querySelector(".contact-info");
      const formCard = document.querySelector(".contact-form-card");

      gsap.to([tag, title, subtext], {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });

      gsap.to([infoBlock, formCard], {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.6,
        stagger: 0.2,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isCompleted]);

  return (
    <div ref={containerRef} style={{ width: "100%", overflowX: "hidden" }}>
      <div className="page-width">
        {/* Contact Header */}
        <section className="contact-header">
          <p className="section-2-tagline">
            <span className="section-2-dot" aria-hidden="true"></span>Contact Us
          </p>
          <h1 className="contact-title">Get in Touch</h1>
          <p className="contact-subtext">
            Get in touch with Sneha Elev8r for elevator manufacturing, installation, modernization,
            or maintenance services and New Installation or AMC explicitly.
          </p>
        </section>

        {/* Contact Body */}
        <section className="contact-section">
          <div className="contact-wrapper container-fluid">
            {/* Left Content */}
            <div className="contact-info">
              <h2>Let's Start the Conversation</h2>
              <p className="contact-desc">
                Have a question or a project in mind? Whether you're planning a new installation,
                upgrading an existing system, or seeking expert guidance, our team is ready to
                assist. From consultation to completion, contact us for elevator & escalator services.
              </p>

              <div className="info-grid">
                <div className="info-block">
                  <h4>Call us on</h4>
                  <p>
                    <a href="tel:+919100812345" aria-label="Call us">
                      +91 91008 12345
                    </a>
                  </p>
                </div>

                <div className="info-block">
                  <h4>Address</h4>
                  <p>
                    D.No : 2-40/30/1, Road No. 5,
                    <br />
                    Jubilee Gardens, Kondapur,
                    <br />
                    Hyderabad - 500084, Telangana, India.
                  </p>
                </div>

                <div className="info-block">
                  <h4>Mail</h4>
                  <p>
                    <a href="mailto:sales@snehaelev8r.com" aria-label="Email sales">
                      sales@snehaelev8r.com
                    </a>
                    <br />
                    <a href="mailto:info@snehaelev8r.com" aria-label="Email info">
                      info@snehaelev8r.com
                    </a>
                  </p>
                </div>

                <div className="social-icons">
                  <div className="info-block">
                    <h4>Social Media</h4>
                    <div className="social-icons mt-2">
                      <a
                        href="https://www.facebook.com/SnehaElev8r"
                        className="facebook"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fab fa-facebook-f"></i>
                      </a>
                      <a
                        href="https://x.com/snehaelev8r"
                        className="twitter"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fab fa-twitter"></i>
                      </a>
                      <a
                        href="https://www.linkedin.com/company/sneha-elev8r/"
                        className="linkedin"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                      <a
                        href="https://www.instagram.com/snehaelev8r/"
                        className="instagram"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fab fa-instagram"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form Card */}
            <div className="contact-form-card">
              <p>Contact Information</p>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Contact number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
                <textarea
                  name="message"
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
                <button type="submit" disabled={loading}>
                  {loading ? "Sending..." : "Send message"}
                </button>
              </form>

              {status.submitted && (
                <div
                  style={{
                    marginTop: "20px",
                    padding: "12px",
                    borderRadius: "4px",
                    textAlign: "center",
                    fontWeight: "bold",
                    backgroundColor: status.success ? "#d4edda" : "#f8d7da",
                    color: status.success ? "#155724" : "#721c24",
                  }}
                >
                  {status.message}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* Google Maps Section */}
      <div className="page-width">
        <section className="map-section">
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3127.0662251607287!2d78.36499317412563!3d17.4596488007215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb973a4e7cf7fd%3A0xacb1af920dfdea3!2sSneha%20Elev8r%20%7C%20Best%20Home%20Elevator%20Services%20in%20Hyderabad!5e1!3m2!1sen!2sin!4v1769077796617!5m2!1sen!2sin"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </section>
      </div>
    </div>
  );
}
