"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { usePreloader } from "@/components/PreloaderContext";

export default function AboutClient() {
  const { isCompleted } = usePreloader();
  const containerRef = useRef(null);
  const statsRef = useRef(null);
  const [stats, setStats] = useState({
    excellence: 0,
    installations: 0,
    locations: 0,
    engineers: 0,
    satisfaction: 0,
  });

  // Interactive number counting hook when stats are in view
  useEffect(() => {
    if (!isCompleted) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const duration = 2000; // 2 seconds counting animation
            const start = performance.now();

            const targets = {
              excellence: 12,
              installations: 3500,
              locations: 8,
              engineers: 50,
              satisfaction: 100,
            };

            const animate = (timestamp) => {
              const elapsed = timestamp - start;
              const progress = Math.min(elapsed / duration, 1);
              // Ease out quad formula
              const easeProgress = progress * (2 - progress);

              setStats({
                excellence: Math.floor(easeProgress * targets.excellence),
                installations: Math.floor(easeProgress * targets.installations),
                locations: Math.floor(easeProgress * targets.locations),
                engineers: Math.floor(easeProgress * targets.engineers),
                satisfaction: Math.floor(easeProgress * targets.satisfaction),
              });

              if (progress < 1) {
                requestAnimationFrame(animate);
              }
            };

            requestAnimationFrame(animate);
            observer.disconnect(); // Only animate once
          }
        });
      },
      { threshold: 0.2 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [isCompleted]);

  // 1. Initial GSAP state setup (runs instantly on mount to prevent any flash/glitch)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const revealElements = containerRef.current.querySelectorAll(".reveal-heading");
      revealElements.forEach((el) => {
        gsap.set(el, { opacity: 0, clipPath: "inset(100% 0 0 0)" });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // 2. Play animations and register ScrollTriggers (runs once preloader is completed)
  useLayoutEffect(() => {
    if (!isCompleted) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const sections = new Set();
      const revealElements = containerRef.current.querySelectorAll(".reveal-heading");

      revealElements.forEach((el) => {
        const parent = el.closest(
          "section, .about-us-hero-section, .about-company-section, .about-approach-section, .mission-vision-section, .founders-message-section, .about-certifications-section, .consultation-banner-section"
        );
        if (parent) {
          sections.add(parent);
        }
      });

      // Stagger reveal on ScrollTrigger enter
      sections.forEach((section) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top 80%",
          onEnter: () => {
            const children = section.querySelectorAll(".reveal-heading");
            children.forEach((el, idx) => {
              const delay = parseFloat(el.getAttribute("data-reveal-delay")) || idx * 0.2;
              gsap.to(el, {
                opacity: 1,
                clipPath: "inset(0% 0 0 0)",
                duration: 1.2,
                delay: delay,
                ease: "power3.out",
              });
            });
          },
          once: true,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isCompleted]);

  // 3. Our Approach Section Line-by-Line Scroll Animation (Grey to Black)
  useEffect(() => {
    if (!isCompleted) return;

    const section = document.querySelector(".about-approach-section");
    if (!section) return;

    const tagline = section.querySelector(".about-approach-tagline");
    const heading = section.querySelector(".about-approach-heading");
    const textParagraphs = section.querySelectorAll(".about-approach-text");
    const textLines = section.querySelectorAll(".text-line");

    // Set tagline and heading initial states if not handled by generic reveal
    if (tagline && !tagline.classList.contains("reveal-heading")) {
      gsap.set(tagline, { opacity: 0, clipPath: "inset(100% 0 0 0)" });
    }
    if (heading && !heading.classList.contains("reveal-heading")) {
      gsap.set(heading, { opacity: 0, clipPath: "inset(100% 0 0 0)" });
    }

    // Set all paragraphs to grey and lines to grey + low opacity initially
    textParagraphs.forEach((para) => {
      gsap.set(para, { color: "#999999" });
    });
    textLines.forEach((line) => {
      gsap.set(line, { color: "#999999", opacity: 0.3 });
    });

    let rafId = null;
    let lastScrollY = window.scrollY || window.pageYOffset;

    function updateLinesOnScroll() {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;

        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const sectionTop = rect.top;
        const sectionHeight = rect.height;

        // Only animate when section is in viewport
        if (sectionTop > windowHeight || sectionTop + sectionHeight < 0) {
          return;
        }

        // Reveal tagline and heading when section enters viewport (if not handled by generic reveal)
        if (tagline && !tagline.classList.contains("revealed") && !tagline.classList.contains("reveal-heading")) {
          const taglineRect = tagline.getBoundingClientRect();
          if (taglineRect.top < windowHeight * 0.8) {
            tagline.classList.add("revealed");
            gsap.to(tagline, {
              opacity: 1,
              clipPath: "inset(0% 0 0 0)",
              duration: 2,
              ease: "power3.out",
            });
          }
        }

        if (heading && !heading.classList.contains("revealed") && !heading.classList.contains("reveal-heading")) {
          const headingRect = heading.getBoundingClientRect();
          if (headingRect.top < windowHeight * 0.8) {
            heading.classList.add("revealed");
            gsap.to(heading, {
              opacity: 1,
              clipPath: "inset(0% 0 0 0)",
              duration: 2,
              ease: "power3.out",
            });
          }
        }

        const triggerPoint = windowHeight * 0.7; // Trigger when line reaches 70% of viewport

        // Animate each line based on scroll position
        textLines.forEach((line) => {
          const lineRect = line.getBoundingClientRect();
          const lineTop = lineRect.top;
          const lineBottom = lineRect.bottom;
          const isPastTrigger = lineTop < triggerPoint && lineTop > 0 && lineBottom > 0;

          if (isPastTrigger) {
            // Active line - black and fully opaque
            gsap.to(line, {
              color: "#000000",
              opacity: 1,
              duration: 1.2,
              ease: "power2.out",
            });
          } else if (lineTop >= triggerPoint || lineTop < 0) {
            // Inactive / out-of-focus line - grey and faded
            gsap.to(line, {
              color: "#999999",
              opacity: 0.3,
              duration: 1.2,
              ease: "power2.out",
            });
          }
        });
      });
    }

    function handleScroll() {
      const currentScrollY = window.scrollY || window.pageYOffset;
      if (Math.abs(currentScrollY - lastScrollY) > 1) {
        lastScrollY = currentScrollY;
        updateLinesOnScroll();
      }
    }

    // Use IntersectionObserver to bind/unbind scroll listener for optimal performance
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            window.addEventListener("scroll", handleScroll, { passive: true });
            // Run once immediately on intersection to set initial visible states
            updateLinesOnScroll();
          } else {
            window.removeEventListener("scroll", handleScroll);
          }
        });
      },
      { threshold: 0.01 }
    );

    observer.observe(section);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, [isCompleted]);

  return (
    <div ref={containerRef} style={{ width: "100%", overflowX: "hidden" }}>
      {/* About Us Hero Section */}
      <div className="page-width">
        <section className="about-us-hero-section">
          <div className="container-fluid">
            <div className="elevator-services-wrapper about-us-hero-wrapper">
              <div className="row align-items-start">
                <div className="col-lg-6">
                  <div className="about-us-hero-content">
                    <p
                      className="about-us-hero-tagline reveal-heading"
                      id="aboutUsHeroTagline"
                      data-reveal-delay="0.1"
                    >
                      <span className="section-2-dot" aria-hidden="true"></span> Reliability in
                      Every Ride
                    </p>
                    <h1
                      className="about-us-hero-heading reveal-heading"
                      id="aboutUsHeroHeading"
                      data-reveal-delay="0.3"
                    >
                      Legacy of Trust <br />
                      for Modern Elevators
                    </h1>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="about-us-hero-description">
                    <p
                      className="about-us-hero-text reveal-heading"
                      id="aboutUsHeroText"
                      data-reveal-delay="0.5"
                    >
                      Recognised as the best elevator company, Sneha Elev8r, a flagship brand of the
                      Sneha Group, represents Telangana’s growing strength in the lift
                      manufacturing sector. Committed to delivering safe, reliable, and
                      high-quality vertical mobility, Sneha Elev8r combines engineering expertise
                      with a deep understanding of real-world building needs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Company Overview Section */}
      <section className="about-company-section">
        <div className="container-fluid page-width">
          <div className="elevator-services-wrapper about-company-wrapper">
            <div className="row align-items-start about-company-top">
              <div className="col-lg-6">
                <p className="about-company-tagline reveal-heading" data-reveal-delay="0.1">
                  <span className="section-2-dot" aria-hidden="true"></span> Who We Are
                </p>
                <h2 className="about-company-heading reveal-heading" data-reveal-delay="0.3">
                  Smart Engineering For <br />
                  Trusted Elevator Solutions
                </h2>
              </div>
              <div className="col-lg-6">
                <div className="about-company-description reveal-heading" data-reveal-delay="0.5">
                  <p>
                   Sneha Elev8r has been building and installing elevators across South India since 2017. Based in Telangana, we serve Hyderabad, Vijayawada, Visakhapatnam, Nellore, Warangal, Nizamabad, and Bengaluru.

We specialize in home lifts, residential, commercial elevators and hospital elevators, backed by reliable service and OEM (Original Equipment Manufacturer) spare parts.

With over 3,500 + elevators installed, we continue to grow through quality engineering, reliable maintenance support and lasting customer trust.

                  </p>
                </div>
              </div>
            </div>

           
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="about-approach-section page-width">
        <div className="container-fluid">
          <div className="elevator-services-wrapper about-approach-wrapper">
            <p className="about-approach-tagline reveal-heading" id="aboutApproachTagline" data-reveal-delay="0.1">
              {" "}
              <span className="section-2-dot" aria-hidden="true"></span> Our Approach
            </p>
            <h2 className="about-approach-heading reveal-heading" id="aboutApproachHeading" data-reveal-delay="0.3">
              From Concept To Completion,
              <br /> Driven By Commitment
            </h2>
            <div className="about-approach-description" data-reveal-delay="0.5">
              <p className="about-approach-text" id="aboutApproachText">
                <span className="text-line">
                  At Sneha Elev8r,our approach is built on clarity, precision, and accountability.
                  Every project for lift{" "}
                </span>
                <span className="text-line">
                  manufacturing begins with understanding the space,usage needs, and long-term
                  expectations.
                </span>
                <span className="text-line">
                  {" "}
                  From consultation and design planning to manufacturing, installation, and ongoing
                  support,
                </span>
                <span className="text-line">
                  {" "}
                  follows a structured process guided by engineering discipline and each stage
                  safety standards.
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="mission-vision-section">
        <div className="container-fluid">
          {/* Top Section: Mission */}
          <div className="mission-vision-row mission-vision-top">
            <div className="mission-vision-text-block mission-block">
              <h2 className="mission-vision-heading reveal-heading" id="missionHeading" data-reveal-delay="0.7">Our Vision
                
              </h2>
              <ul className="mission-vision-text reveal-heading" id="missionList" data-reveal-delay="0.8">
                <li style={{ listStyleType: "none" }}>
                  <p>
                  To build a trusted, future-ready mobility brand that elevates everyday living through safety, quality, and engineering excellence.
                  </p>
                </li>
              
              </ul>
            </div>
            <div className="mission-vision-image-block">
              <div className="auto-scroll-image-wrapper reveal-heading" id="missionImageWrapper" data-reveal-delay="0.7">
                <img
                  src="/img/vision.png"
                  alt="Elevator Mission"
                  className="auto-scroll-image"
                  id="missionImage"
                />
              </div>
            </div>
          </div>

          {/* Bottom Section: Vision */}
          <div className="mission-vision-row mission-vision-bottom">
            <div className="mission-vision-image-block">
              <div className="auto-scroll-image-wrapper reveal-heading" id="visionImageWrapper" data-reveal-delay="1.1">
                <img
                  src="/img/mission.png"
                  alt="Elevator Vision"
                  className="auto-scroll-image reveal-heading"
                  id="visionImage"
                  data-reveal-delay="1.1"
                />
              </div>
            </div>
            <div className="mission-vision-text-block vision-block">
              <h2 className="mission-vision-heading reveal-heading" id="visionHeading" data-reveal-delay="1.2">Our Mission</h2>
              <div className="mission-vision-text reveal-heading" id="visionText" data-reveal-delay="1.3">
                <p>
                  To deliver safe, reliable, and innovative elevator solutions that ensure seamless mobility for homes and commercial spaces, designed for today, built for tomorrow.
                </p>
                <p>
                  We provide complete elevator solutions defined by:
                </p>
                <ul className="mission-vision-text reveal-heading" id="missionList" data-reveal-delay="0.8">
                  <li>
                    <p>
                      High standards of Safety, Reliability & Quality
                    </p>
                  </li>
                  <li>
                    <p>
                      Contemporary aesthetics aligned with modern architectural trends
                    </p>
                  </li>
                  <li>
                    <p>
                      Flexibility in design to suit diverse project requirements
                    </p>
                  </li>
                  <li>
                    <p>
                      Efficient installation and responsive service support
                    </p>
                  </li>
                  <li>
                    <p>
                      Advanced, future-ready technology
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder's Message Section */}
      <section className="founders-message-section page-width">
        <div className="container-fluid">
          <div className="elevator-services-wrapper founders-message-wrapper">
            <div className="row align-items-center">
              <div className="col-lg-6 col-sm-6 col-md-6 col-xs-12">
                <div className="founders-message-content">
                  <p className="founders-message-tagline reveal-heading" id="foundersMessageTagline" data-reveal-delay="0.7">
                    <span className="section-2-dot" aria-hidden="true"></span> Leadership & Vision
                  </p>
                  <h2 className="founders-message-heading reveal-heading" id="foundersMessageHeading" data-reveal-delay="0.8">Founder's Message</h2>
                  <p className="founders-message-text reveal-heading" id="foundersMessageText" data-reveal-delay="0.9">
                    What began with a focused presence in villa projects has steadily evolved into
                    large-scale commercial installations. Today, we are proud to be entrusted with
                    bulk orders, a clear reflection of the confidence our customers place in our
                    capabilities, reliability, and execution standards. This progress has reinforced
                    our position as a dependable and established name in the market. At the core of
                    Sneha Elevators are the values of safety and reliability. Every system we deliver
                    is engineered with a clear priority-ensuring long-term performance, operational
                    safety, and peace of mind. While we continuously adopt the latest technologies
                    and innovations to enhance efficiency and user experience, we never compromise
                    on the fundamental reliability of our products.
                  </p>
                  <div className="founders-message-author reveal-heading" id="foundersMessageAuthor" data-reveal-delay="1.0">
                    <p className="founders-message-name">Vaibhav Reddy</p>
                    <p className="founders-message-title">Managing Director</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-sm-6 col-md-6 col-xs-12">
                <div className="founders-message-image-wrapper reveal-heading" id="foundersMessageImageWrapper" data-reveal-delay="0.7">
                  <img
                    src="/img/founder.png"
                    alt="MD Vaibhav Reddy"
                    className="founders-message-image reveal-heading"
                    data-reveal-delay="0.7"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safety & Certifications */}
      <section className="about-certifications-section">
        <div className="container-fluid page-width">
          <div className="elevator-services-wrapper about-certifications-wrapper">
            <div className="row align-items-start about-certifications-header">
              <div className="about-certifications col-lg-6">
                <p className="about-certifications-tagline reveal-heading" data-reveal-delay="0.7">
                  {" "}
                  <span className="section-2-dot" aria-hidden="true"></span> Safety & Certification
                </p>
                <h2 className="about-certifications-heading reveal-heading" data-reveal-delay="0.8">
                  Safety & Trust Built
                  <br /> Into Every Ride
                </h2>
              </div>
              <div className="col-lg-6">
                <p className="about-certifications-intro reveal-heading" data-reveal-delay="0.9">
                  Our commitment to safety goes beyond compliance. Designed to meet regulatory
                  standards and tested for real-world conditions, we prioritise passenger protection,
                  operational reliability, and long-term safety.
                </p>
              </div>
            </div>

            <div className="row about-certifications-grid" style={{ marginTop: "40px" }}>
              <div className="col-lg-6">
                <article className="about-cert-card reveal-heading" id="certCard1" data-reveal-delay="1.0">
                  <div className="about-cert-media">
                    <img src="/img/certi2.png" alt="Safety Certificate" className="about-cert-img" />
                  </div>
                </article>
              </div>
              <div className="col-lg-6">
                <article className="about-cert-card reveal-heading" id="certCard2" data-reveal-delay="1.1">
                  <div className="about-cert-media">
                    
                    <img
                      src="/img/certi-3.jpeg"
                      alt="Quality Certificate"
                      className="about-cert-img"
                    />
                    <br></br>
                     <img
                      src="/img/certi-1.png"
                      alt="Quality Certificate"
                      className="about-cert-img"
                    />
                  </div>
                </article>
              </div>
              
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Consultation Call to Action */}
      <section className="consultation-banner-section" style={{ marginTop: "80px" }}>
        <div className="consultation-banner-background">
          <img
            src="/img/aboutus-clouser.png"
            alt="About closing banner"
            className="consultation-banner-image"
          />
        </div>
        <div className="container">
          <div className="consultation-banner-wrapper reveal-heading" id="consultationBannerWrapper" data-reveal-delay="0.5">
            <div className="consultation-banner-content reveal-heading" id="consultationBannerContent" data-reveal-delay="0.6">
              <h2 className="consultation-banner-heading reveal-heading" id="consultationBannerHeading" data-reveal-delay="0.7">
                Let's Build The Right Solution Together
              </h2>
              <Link href="/contact" className="consultation-banner-cta reveal-heading" id="consultationBannerCta" data-reveal-delay="0.8">
                Book a Consultation <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
