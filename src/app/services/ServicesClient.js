"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { usePreloader } from "@/components/PreloaderContext";

export default function ServicesClient() {
  const { isCompleted } = usePreloader();
  const containerRef = useRef(null);
  const statsRef = useRef(null);
  const videoRef = useRef(null);
  const videoStageRef = useRef(null);
  const videoSectionRef = useRef(null);
  const videoSpacerRef = useRef(null);

  const [activeTimelineStep, setActiveTimelineStep] = useState(0);
  const [stats, setStats] = useState({
    trust: 0,
    experience: 0,
    supported: 0,
  });

  // 1. Initial GSAP state setup (runs instantly on mount to prevent any flash/glitch)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Instantly hide hero and service cards / why-service section elements to prevent FOUC
      const heroHeading = document.getElementById("aboutUsHeroHeading");
      const heroText = document.getElementById("aboutUsHeroText");
      if (heroHeading) gsap.set(heroHeading, { opacity: 0, clipPath: "inset(100% 0 0 0)" });
      if (heroText) gsap.set(heroText, { opacity: 0, clipPath: "inset(100% 0 0 0)" });

      const cards = gsap.utils.toArray(".service-card");
      if (cards.length) gsap.set(cards, { opacity: 0, y: 50 });

      const benefitsIntro = document.querySelector(".why-service");
      const benefitsList = document.querySelector(".why-list");
      if (benefitsIntro && benefitsList) {
        gsap.set([benefitsIntro, benefitsList], { opacity: 0, y: 40 });
      }

      // Initial styles for the video stage to prevent it from showing oversized before load
      const video = videoRef.current;
      const stage = videoStageRef.current;
      if (video && stage) {
        if (window.innerWidth > 768) {
          video.style.setProperty('--video-scale', '0.7');
          stage.style.setProperty('--video-radius', '20px');
          stage.style.setProperty('--video-width', '90vw');
        }
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // 2. High-Performance Video Scroll Zoom Effect (70% to 100vw) matching original HTML logic
  useEffect(() => {
    if (!isCompleted) return;

    const section = videoSectionRef.current;
    const stage = videoStageRef.current;
    const video = videoRef.current;
    const spacer = videoSpacerRef.current;

    if (!section || !stage || !video || !spacer) return;

    // Check if mobile - disable animation on mobile
    function isMobileDevice() {
      return window.innerWidth <= 768;
    }

    function setMobileStatic() {
      video.style.setProperty('--video-scale', '1');
      stage.style.setProperty('--video-radius', '16px');
      stage.style.setProperty('--video-width', '100%');
      stage.classList.add('mobile-static');
      stage.classList.remove('is-pinned', 'is-ended');
      spacer.style.height = '0';
      section.style.minHeight = 'auto';
    }

    // Zoom scale points
    const steps = [0.5, 1.0];

    const clamp01 = (n) => Math.max(0, Math.min(1, n));
    let rafId = null;

    // Smooth starting variables
    let smoothScale = 0.5;
    let smoothRadius = 40;
    let smoothWidthVw = 90;

    function computeScale(progress) {
      const p = clamp01(progress);
      const segments = steps.length - 1; // 1
      const segmentSize = 1 / segments;  // 1

      const idx = Math.min(segments - 1, Math.floor(p / segmentSize));
      const local = (p - idx * segmentSize) / segmentSize;

      return steps[idx] + (steps[idx + 1] - steps[idx]) * local;
    }

    function update() {
      rafId = null;
      if (!section || !stage || !video || !spacer) return;

      const vh = window.innerHeight || document.documentElement.clientHeight;
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const sectionTop = section.getBoundingClientRect().top + scrollY;
      const pinTop = 80; // must match CSS .video-stage.is-pinned top
      const stageHeight = stage.getBoundingClientRect().height || 0;

      // Ensure the section is tall enough to contain the video even at 100vw.
      const fullWidthStageHeight =
          (video.videoWidth && video.videoHeight)
              ? (window.innerWidth * (video.videoHeight / video.videoWidth))
              : stageHeight;

      const neededMinHeight = Math.ceil(vh + fullWidthStageHeight + pinTop);
      section.style.minHeight = neededMinHeight + 'px';

      const sectionHeight = section.offsetHeight;
      const start = sectionTop;
      const end = sectionTop + Math.max(1, sectionHeight - stageHeight - pinTop);

      // JS pin: fixed while inside range, then "end" state at section bottom.
      const shouldPin = scrollY >= start && scrollY < end;
      const isEnded = scrollY >= end;

      if (shouldPin) {
        spacer.style.height = stageHeight + 'px';
        stage.classList.add('is-pinned');
        stage.classList.remove('is-ended');
      } else {
        stage.classList.remove('is-pinned');

        if (isEnded) {
          spacer.style.height = stageHeight + 'px';
          stage.classList.add('is-ended');
        } else {
          spacer.style.height = '';
          stage.classList.remove('is-ended');
        }
      }

      let progress = 0;
      if (scrollY <= start) {
        progress = 0;
      } else if (scrollY >= end) {
        progress = 1;
      } else {
        progress = (scrollY - start) / (end - start);
      }

      const targetScale = computeScale(progress);

      // Width: 90vw -> 100vw
      const targetWidthVw = 90 + (10 * clamp01(progress));

      // Border radius animation
      const radiusStart = 20;
      const radiusEnd = 0;
      const targetRadius = radiusStart + (radiusEnd - radiusStart) * clamp01(progress);

      // Smooth easing
      const ease = 0.3;
      smoothScale += (targetScale - smoothScale) * ease;
      smoothRadius += (targetRadius - smoothRadius) * ease;
      smoothWidthVw += (targetWidthVw - smoothWidthVw) * ease;

      video.style.setProperty('--video-scale', smoothScale.toFixed(3));
      stage.style.setProperty('--video-radius', smoothRadius.toFixed(1) + 'px');
      stage.style.setProperty('--video-width', smoothWidthVw.toFixed(2) + 'vw');
    }

    function onScrollOrResize() {
      if (isMobileDevice()) {
        setMobileStatic();
        return;
      }

      if (rafId) return;
      rafId = window.requestAnimationFrame(update);
    }

    // Initial check
    if (isMobileDevice()) {
      setMobileStatic();
    } else {
      video.style.setProperty('--video-scale', '0.7');
      update();
    }

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [isCompleted]);

  // 3. Grey-to-Black Line-by-Line Scroll Animation & Stats Count-up
  useEffect(() => {
    if (!isCompleted) return;

    // Stats Count Up
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const duration = 2000;
            const start = performance.now();
            const targets = { trust: 95, experience: 10, supported: 500 };

            const animate = (timestamp) => {
              const elapsed = timestamp - start;
              const progress = Math.min(elapsed / duration, 1);
              const easeProgress = progress * (2 - progress);

              setStats({
                trust: Math.floor(easeProgress * targets.trust),
                experience: Math.floor(easeProgress * targets.experience),
                supported: Math.floor(easeProgress * targets.supported),
              });

              if (progress < 1) {
                requestAnimationFrame(animate);
              }
            };
            requestAnimationFrame(animate);
            statsObserver.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    if (statsRef.current) {
      statsObserver.observe(statsRef.current);
    }

    // Grey to Black Text Scroll Listener
    const textLines = document.querySelectorAll(".services-approach-section .text-line");
    const handleTextScroll = () => {
      const triggerPoint = window.innerHeight * 0.7;

      textLines.forEach((line) => {
        const rect = line.getBoundingClientRect();
        if (rect.top < triggerPoint && rect.top > 0) {
          line.style.color = "#000000";
          line.style.opacity = "1";
        } else {
          line.style.color = "#999999";
          line.style.opacity = "0.3";
        }
      });
    };

    window.addEventListener("scroll", handleTextScroll, { passive: true });
    handleTextScroll(); // init

    return () => {
      statsObserver.disconnect();
      window.removeEventListener("scroll", handleTextScroll);
    };
  }, [isCompleted]);

  // 4. Trusted Timeline Step Highlights
  useEffect(() => {
    if (!isCompleted) return;

    const handleTimelineScroll = () => {
      const timelineItems = document.querySelectorAll(".trusted-timeline .timeline-item");
      const viewportAnchor = window.innerHeight * 0.35;
      let activeIndex = 0;

      timelineItems.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        if (rect.top <= viewportAnchor) {
          activeIndex = index;
        }
      });

      setActiveTimelineStep(activeIndex);
    };

    window.addEventListener("scroll", handleTimelineScroll, { passive: true });
    handleTimelineScroll(); // init

    return () => {
      window.removeEventListener("scroll", handleTimelineScroll);
    };
  }, [isCompleted]);

  // 5. Play GSAP Entrance Reveals (once preloader completes)
  useLayoutEffect(() => {
    if (!isCompleted) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Hero Reveal
      const hHeading = document.getElementById("aboutUsHeroHeading");
      const hText = document.getElementById("aboutUsHeroText");
      if (hHeading && hText) {
        gsap.fromTo(
          hHeading,
          { opacity: 0, clipPath: "inset(100% 0 0 0)" },
          { opacity: 1, clipPath: "inset(0% 0 0 0)", duration: 1.2, ease: "power3.out" }
        );
        gsap.fromTo(
          hText,
          { opacity: 0, clipPath: "inset(100% 0 0 0)" },
          {
            opacity: 1,
            clipPath: "inset(0% 0 0 0)",
            duration: 1.2,
            delay: 0.3,
            ease: "power3.out",
          }
        );
      }

      // 2. Service Cards Reveal
      const cards = gsap.utils.toArray(".service-card");
      if (cards.length) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2,
            scrollTrigger: {
              trigger: ".service-section",
              start: "top 75%",
            },
          }
        );
      }

      // 3. Parallax Section items reveal
      const benefitsIntro = document.querySelector(".why-service");
      const benefitsList = document.querySelector(".why-list");
      if (benefitsIntro && benefitsList) {
        gsap.fromTo(
          [benefitsIntro, benefitsList],
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2,
            scrollTrigger: {
              trigger: ".why-service-hero",
              start: "top 80%",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isCompleted]);

  return (
    <div ref={containerRef} style={{ width: "100%", overflowX: "hidden" }}>
      {/* Services Hero Section */}
      <div className="page-width">
        <section className="about-us-hero-section">
          <div className="container-fluid">
            <div className="elevator-services-wrapper about-us-hero-wrapper">
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <div className="about-us-hero-content">
                    <p className="section-2-tagline">
                      <span className="section-2-dot" aria-hidden="true"></span>Service that keeps
                      you moving
                    </p>
                    <h1 className="about-us-hero-heading" id="aboutUsHeroHeading">
                      Dependable Care for <br />
                      Every Installation
                    </h1>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="about-us-hero-description">
                    <p className="about-us-hero-text" id="aboutUsHeroText">
                      At Sneha Elev8r, service is an integral part of our business philosophy. It’s
                      a commitment that continues long after installation. Our comprehensive
                      services ensure that your lifts and Elevators run safely and smoothly at all
                      times.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Video Zoom Section */}
      <section
        ref={videoSectionRef}
        className="video-scroll-wrapper"
      >
        <div ref={videoSpacerRef} className="video-pin-spacer" aria-hidden="true"></div>
        <div
          ref={videoStageRef}
          className="video-stage stage-1"
        >
          <video
            ref={videoRef}
            className="scroll-video"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/img/services-video.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      {/* Services Approach Section with grey-to-black scroll lines */}
      <section className="services-approach-section">
        <div className="page-width">
          <div className="elevator-services-wrapper about-approach-wrapper container-fluid">
            <div className="about-approach-description">
              <p className="about-approach-text" id="aboutApproachText">
                <span className="text-line" style={{ transition: "color 0.4s, opacity 0.4s" }}>
                  {" "}
                  Our commitment to service goes beyond routine maintenance. We focus on long-term
                </span>
                <span className="text-line" style={{ transition: "color 0.4s, opacity 0.4s" }}>
                  {" "}
                  performance, safety, through proactive inspections, timely repairs, and expert
                  technical support.
                </span>
                <span className="text-line" style={{ transition: "color 0.4s, opacity 0.4s" }}>
                  With trained engineers,structured service schedules, and responsive assistance, we
                  ensure your
                </span>
                <span className="text-line" style={{ transition: "color 0.4s, opacity 0.4s" }}>
                  elevators operate smoothly today and for years to come.Serving in Telangana,
                  Andhra Pradesh & Karnataka.
                </span>
              </p>

              {/* Dynamic Counters */}
              <div className="row services-company-stats" ref={statsRef}>
                <div className="col-6 col-lg-3 about-stat">
                  <div className="about-stat-number">
                    <span className="about-stat-count">{stats.trust}</span>
                    <span className="about-stat-plus">%</span>
                  </div>
                  <div className="about-stat-label">
                    customer trust &<br /> satisfaction
                  </div>
                </div>
                <div className="col-6 col-lg-3 about-stat">
                  <div className="about-stat-number">
                    <span className="about-stat-count">{stats.experience}</span>
                    <span className="about-stat-plus">+</span>
                  </div>
                  <div className="about-stat-label">
                    Years of <br />
                    service experience
                  </div>
                </div>
                <div className="col-6 col-lg-3 about-stat">
                  <div className="about-stat-number">
                    <span className="about-stat-count">{stats.supported}</span>
                    <span className="about-stat-plus">+</span>
                  </div>
                  <div className="about-stat-label">
                    Elevators reliably <br /> Supported
                  </div>
                </div>
                <div className="col-6 col-lg-3 about-stat">
                  <div className="about-stat-number">
                    <span className="about-stat-count">24</span>
                    <span className="about-stat-suffix">/7</span>
                  </div>
                  <div className="about-stat-label">
                    support for <br />
                    uninterrupted operation
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* End-to-end Services cards Section */}
      <div className="page-width">
        <section className="service-section">
          <div className="services-combo container-fluid">
            <div className="service-header">
              <div className="service-title">
                <span className="service-subtitle">
                  <p className="section-2-tagline">
                    <span className="section-2-dot"></span>Our Services
                  </p>
                </span>
                <h2>
                  End-to-end Elevator
                  <br />
                  Service Solutions
                </h2>
              </div>
              <Link href="/contact" className="service-btn">
                Request Service
              </Link>
            </div>

            <div className="service-cards">
              {/* Card 1 */}
              <div className="service-card">
                <div className="service-icon">
                  <img src="/img/service-icon-1.png" alt="Service icon 1" />
                </div>
                <h3>
                  Annual Maintenance
                  <br /> Contract (AMC)
                </h3>
                <p>Preventive maintenance for consistent performance and extended lifespan.</p>
                <ul>
                  <li>Scheduled inspections & servicing</li>
                  <li>Proactive fault detection</li>
                  <li>Compliance with safety standards</li>
                </ul>
              </div>

              {/* Card 2 */}
              <div className="service-card">
                <div className="service-icon">
                  <img src="/img/service-icon-2.png" alt="Service icon 2" />
                </div>
                <h3>
                  Maintenance &
                  <br /> Repair Services
                </h3>
                <p>Quick, efficient repair services to restore elevator operation.</p>
                <ul>
                  <li>Breakdown troubleshooting</li>
                  <li>Genuine spare parts replacement</li>
                  <li>Fast response by trained technicians</li>
                </ul>
              </div>

              {/* Card 3 */}
              <div className="service-card">
                <div className="service-icon">
                  <img src="/img/service-icon-3.png" alt="Service icon 3" />
                </div>
                <h3>
                  Modernization &
                  <br /> Upgrades
                </h3>
                <p>Upgrade aging elevators with modern technology for better performance.</p>
                <ul>
                  <li>Control panel & drive upgrades</li>
                  <li>Improved cabin interiors</li>
                  <li>Enhanced safety systems</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Benefits of Servicing Section (Parallax visual match) */}
      <div className="why-service-hero why-service-inline">
        <div className="why-service-overlay"></div>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 why-service">
              <p className="Benefits-of-Servicing">
                <span className="Benefits-of-Servicing-dot"></span>Benefits of Servicing With Us
              </p>
              <h2 className="section-5-heading">We Are With You Beyond Installation</h2>
              <p className="section-5-para">
                We go beyond routine maintenance to deliver reliable performance, enhanced safety,
                and long-term value. Our service solutions are designed to keep your elevators
                running efficiently while minimizing disruptions.
              </p>
            </div>
            <div className="col-lg-6">
              <ul className="why-list">
                <li>
                  <i className="fas fa-check"></i>Timely maintenance to reduce breakdowns and
                  downtime
                </li>
                <li>
                  <i className="fas fa-check"></i> Improved safety and compliance with current
                  standards
                </li>
                <li>
                  <i className="fas fa-check"></i>Extended equipment lifespan for better performance
                </li>
                <li>
                  <i className="fas fa-check"></i> Quick response times and dependable technical
                  support
                </li>
                <li>
                  <i className="fas fa-check"></i> Transparent service processes and experienced
                  professionals
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Scroll Process Section */}
      <div className="page-width" style={{ marginTop: "80px" }}>
        <section className="trusted-timeline">
          <div className="container-fluid">
            <div className="timeline-container">
              {/* Left Column (Sticky behavior matching original desktop css) */}
              <div className="timeline-left">
                <div className="sticky" style={{ position: "sticky", top: "120px" }}>
                  <p className="section-2-tagline">
                    <span className="section-2-dot"></span>Our Service Process
                  </p>
                  <h2>
                    Committed to performance <br />
                    at every step
                  </h2>
                  <p style={{ marginTop: "15px", opacity: 0.8 }}>
                    At Sneha Elev8r, we follow a structured and transparent approach to ensure every
                    elevator we support operates safely, efficiently, and without interruption. From
                    the first inspection to ongoing support, every step is handled with precision
                    and accountability.
                  </p>
                </div>
              </div>

              {/* Right Column containing steps scroll triggers */}
              <div className="timeline-right">
                <div className="timeline-line">
                  <ol className="timeline-items">
                    <li className={`timeline-item ${activeTimelineStep === 0 ? "active" : ""}`}>
                      <span className="dot" aria-hidden="true"></span>
                      <div className="timeline-content">
                        <h3>1.System Evaluation</h3>
                        <p>
                          Once you contact us, our technical team performs a detailed evaluation of
                           your elevator system. We review operational performance, safety
                          conditions, usage patterns, and potential areas of improvement to gain a
                          complete understanding of your system’s requirements.
                        </p>
                      </div>
                    </li>

                    <li className={`timeline-item ${activeTimelineStep === 1 ? "active" : ""}`}>
                      <span className="dot" aria-hidden="true"></span>
                      <div className="timeline-content">
                        <h3>2.Tailored Service Plan</h3>
                        <p>
                          Based on our assessment, we recommend a service or maintenance plan
                          designed specifically for your elevator type and usage. Our proposals
                          outline the scope of work, timelines, and costs, ensuring full
                          transparency and informed decision-making.
                        </p>
                      </div>
                    </li>

                    <li className={`timeline-item ${activeTimelineStep === 2 ? "active" : ""}`}>
                      <span className="dot" aria-hidden="true"></span>
                      <div className="timeline-content">
                        <h3>3.Professional Service Execution</h3>
                        <p>
                          Our trained and certified technicians carry out maintenance, repairs, or
                          upgrades using industry-approved methods and genuine components. Every
                          task is performed with careful attention to safety, efficiency, and
                          long-term reliability.
                        </p>
                      </div>
                    </li>

                    <li className={`timeline-item ${activeTimelineStep === 3 ? "active" : ""}`}>
                      <span className="dot" aria-hidden="true"></span>
                      <div className="timeline-content">
                        <h3>4.Ongoing Support & Care</h3>
                        <p>
                          Our commitment continues even after the service is completed. We provide
                          continued monitoring, scheduled checks, and responsive support to ensure
                          your elevator remains dependable and performs at its best over time.
                        </p>
                      </div>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Closing Call to Action Banner */}
      <section className="consultation-banner-section mt-3" style={{ marginTop: "60px" }}>
        <div className="consultation-banner-background">
          <img
            src="/img/image-13.png"
            alt="services closing banner"
            className="consultation-banner-image"
          />
        </div>
        <div className="container">
          <div className="consultation-banner-wrapper-2">
            <div className="consultation-banner-content">
              <h2 className="consultation-banner-heading">Ready for a Safer Elevator Solution?</h2>
              <p className="consultation-banner-description">
                Get expert guidance, accurate estimates, and the right solution for your building.
              </p>
              <Link href="/contact" className="consultation-banner-cta">
                Book Free Consultation <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
