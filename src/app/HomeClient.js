"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { usePreloader } from "@/components/PreloaderContext";

export default function HomeClient() {
  const { isCompleted, fading } = usePreloader();
  const [blogs, setBlogs] = useState([]);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [activeFeature, setActiveFeature] = useState(null);

  const containerRef = useRef(null);

  const testimonials = [
    {
      text: "Sneha Elevators provided excellent service from start to finish. The installation was done smoothly, with good quality materials and proper safety standards. A special appreciation to Site Engineer T.Siva Krishna—he was very knowledgeable, responsive, and ensured everything was completed on time without any issues. Overall, a reliable and professional team. I would definitely recommend Sneha Elevators.",
      name: "Mark",
      date: "13/03/2026",
      rating: 4,
      image: "/img/testimonialsone.png",
      avatar: "/img/neha.png",
    },
    {
      text: "We are Happy to Install SNEHA ELEV 8R elevator at our House. We are enjoying the use of elevator. It is really good to use, the Ambience is beautiful. All my family & relatives expressed the same.",
      name: "Devanand",
      date: "2/01/2026",
      rating: 4,
      image: "/img/testimonialstwo.png",
      avatar: "/img/Aarav.png",
    },
    {
      text: "One of the best homegrown elevator brands in India known for reliability and value for money. Very happy with their support and elevators performance. Decided to install second lift with elva8r.",
      name: "Abhishek",
      date: "26/04/2026",
      rating: 5,
      image: "/img/testimonialsthree.png",
      avatar: "/img/kiran.png",
    },
  ];

  // Fetch blogs
  useEffect(() => {
    async function getBlogs() {
      try {
        const res = await fetch("https://sneha-elevators-api.onrender.com/blogs?limit=3");
        if (res.ok) {
          const data = await res.json();
          setBlogs(data.blogs || []);
        }
      } catch (err) {
        console.error("Failed to load homepage blogs:", err);
      }
    }
    getBlogs();
  }, []);

  // 1. Initial GSAP state setup (runs instantly on mount to prevent any flash/glitch)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Hero content
      const heroH2 = document.querySelector("#heroContent h2");
      const heroH1 = document.querySelector("#heroContent h1");
      const heroBtn = document.querySelector("#heroContent .btn");
      if (heroH2 && heroH1 && heroBtn) {
        gsap.set([heroH2, heroH1, heroBtn], { opacity: 0, clipPath: "inset(100% 0 0 0)" });
      }

      // Category Sections
      const categories = [
        { tagline: "tagline01", heading: "heading01", image: "image01" },
        { tagline: "tagline02", heading: "heading02", image: "image02" },
        { tagline: "tagline03", heading: "heading03", image: "image03" },
        { tagline: "tagline04", heading: "heading04", image: "image04" },
      ];
      categories.forEach((cat) => {
        const tagline = document.getElementById(cat.tagline);
        const heading = document.getElementById(cat.heading);
        const img = document.getElementById(cat.image);
        if (tagline && heading && img) {
          gsap.set(tagline, { opacity: 0, clipPath: "inset(0 100% 0 0)" });
          gsap.set(heading, { clipPath: "inset(100% 0 0 0)" });
          gsap.set(img, { opacity: 0, clipPath: "inset(100% 0 0 0)" });
        }
      });

      // Features Section Grid
      const featuresHeading = document.getElementById("featuresHeading");
      const cards = gsap.utils.toArray(".feature-card");
      if (featuresHeading && cards.length) {
        gsap.set(featuresHeading, { opacity: 0, clipPath: "inset(100% 0 0 0)" });
        gsap.set(cards, { opacity: 0, clipPath: "inset(100% 0 0 0)" });
      }

      // Clients
      const clientsHeading = document.getElementById("clientsHeading");
      const logoTrack = document.getElementById("logoTrack");
      if (clientsHeading && logoTrack) {
        gsap.set([clientsHeading, logoTrack], { opacity: 0, y: 40 });
      }

      // Services initial setup is deferred to the main layout effect to support mobile overrides dynamically.
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // 2. Play animations and register ScrollTriggers (runs once preloader starts fading)
  useLayoutEffect(() => {
    if (!fading) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Hero Zoom & Text Inset Reveal
      const heroLogo = document.getElementById("heroLogo");
      const heroBg = document.getElementById("heroBg");
      const heroContent = document.getElementById("heroContent");
      const heroH2 = heroContent?.querySelector("h2");
      const heroH1 = heroContent?.querySelector("h1");
      const heroBtn = heroContent?.querySelector(".btn");
      const mainHeader = document.getElementById("mainHeader");

      if (heroLogo && heroBg && heroContent) {
        // Step 1: Start logo zoom out animation (starts exactly as preloader fades out)
        const t1 = setTimeout(() => {
          heroLogo.classList.add("zoom-out");
        }, 10);

        // Step 2: After logo zoom out (0.8s), start hero-bg zoom in animation (circle expansion)
        const t2 = setTimeout(() => {
          heroBg.classList.add("zoom-in");
        }, 810);

        // Step 3: After hero-bg animation completes (1.2s), reveal text with clipPath
        const t3 = setTimeout(() => {
          gsap.to(heroH2, {
            opacity: 1,
            clipPath: "inset(0% 0 0 0)",
            duration: 1.5,
            ease: "power3.out",
          });

          // Animate h1 with bottom to top reveal
          const t4 = setTimeout(() => {
            gsap.to(heroH1, {
              opacity: 1,
              clipPath: "inset(0% 0 0 0)",
              duration: 1.5,
              ease: "power3.out",
            });
          }, 200);

          // Animate button with bottom to top reveal
          const t5 = setTimeout(() => {
            gsap.to(heroBtn, {
              opacity: 1,
              clipPath: "inset(0% 0 0 0)",
              duration: 1.5,
              ease: "power3.out",
            });
          }, 400);

          // Fade in header
          if (mainHeader) {
            mainHeader.classList.add("fade-in");
          }
        }, 2010);
      }

      // 2. Section 2 Heading Reveal
      const s2Heading = document.getElementById("section2Heading");
      const s2Para = document.getElementById("section2Para");
      if (s2Heading && s2Para) {
        gsap.fromTo(
          s2Heading,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: ".section-2",
              start: "top 80%",
            },
          }
        );

        gsap.fromTo(
          s2Para,
          { opacity: 0, clipPath: "inset(0 100% 0 0)" },
          {
            opacity: 1,
            clipPath: "inset(0 0% 0 0)",
            duration: 1.5,
            delay: 0.3,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: ".section-2",
              start: "top 80%",
            },
          }
        );
      }

      // 3. Category Sections
      const categories = [
        { tagline: "tagline01", heading: "heading01", image: "image01" },
        { tagline: "tagline02", heading: "heading02", image: "image02" },
        { tagline: "tagline03", heading: "heading03", image: "image03" },
        { tagline: "tagline04", heading: "heading04", image: "image04" },
      ];

      categories.forEach((cat) => {
        const tagline = document.getElementById(cat.tagline);
        const heading = document.getElementById(cat.heading);
        const img = document.getElementById(cat.image);

        if (tagline && heading && img) {
          const wrapper = tagline.closest(".elevator-category-section");

          ScrollTrigger.create({
            trigger: wrapper,
            start: "top 75%",
            onEnter: () => {
              gsap.to(tagline, {
                opacity: 1,
                clipPath: "inset(0 0% 0 0)",
                duration: 1.5,
                ease: "power2.inOut",
              });
              gsap.to(heading, {
                clipPath: "inset(0% 0 0 0)",
                duration: 1.5,
                delay: 0.3,
                ease: "power3.out",
              });
              gsap.to(img, {
                opacity: 1,
                clipPath: "inset(0% 0 0 0)",
                duration: 1,
                delay: 0.5,
                ease: "power3.out",
              });
            },
          });
        }
      });

      // 4. Features Section Grid
      const featuresHeading = document.getElementById("featuresHeading");
      const cards = gsap.utils.toArray(".feature-card");

      if (featuresHeading && cards.length) {
        ScrollTrigger.create({
          trigger: ".features-section",
          start: "top 75%",
          onEnter: () => {
            gsap.to(featuresHeading, {
              opacity: 1,
              clipPath: "inset(0% 0 0 0)",
              duration: 1.2,
              ease: "power3.out",
            });
            gsap.to(cards, {
              opacity: 1,
              clipPath: "inset(0% 0 0 0)",
              duration: 1.2,
              stagger: 0.2,
              ease: "power3.out",
              delay: 0.2,
            });
          },
        });
      }

      // 5. Clients Header & Logotrack
      const clientsHeading = document.getElementById("clientsHeading");
      const logoTrack = document.getElementById("logoTrack");
      if (clientsHeading && logoTrack) {
        ScrollTrigger.create({
          trigger: ".clients-section",
          start: "top 80%",
          onEnter: () => {
            gsap.to(clientsHeading, {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power2.out",
            });
            gsap.to(logoTrack, {
              opacity: 1,
              y: 0,
              duration: 1,
              delay: 0.2,
              ease: "power2.out",
            });
          },
        });
      }

      // 6. Services Section Scroll Animations (Mobile Responsive & High-Fidelity Highlights)
      const elevatorServicesSection = document.querySelector(".elevator-services-section");
      if (elevatorServicesSection) {
        const servicesIntro = elevatorServicesSection.querySelector(".elevator-services-content");
        const servicesTagline = servicesIntro?.querySelector(".section-2-tagline");
        const servicesHeading = servicesIntro?.querySelector(".elevator-services-heading");
        const servicesLink = servicesIntro?.querySelector(".elevator-services-link");
        const serviceItems = gsap.utils.toArray(".elevator-services-section .service-item");

        const isMobileView = window.matchMedia("(max-width: 768px)").matches;

        if (isMobileView) {
          // Mobile Viewport: Stagger reveal all items into view once, keep black and fully visible
          const mobileElements = [servicesTagline, servicesHeading, servicesLink].filter(Boolean);

          mobileElements.forEach((element) => {
            gsap.set(element, { opacity: 0, y: 40 });
          });

          serviceItems.forEach((item) => {
            gsap.set(item, { opacity: 0, y: 40 });
            const title = item.querySelector(".service-title");
            const description = item.querySelector(".service-description");
            if (title) gsap.set(title, { color: "#000000" });
            if (description) gsap.set(description, { color: "#000000", opacity: 1 });
          });

          const mobileObserver = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                const revealTimeline = gsap.timeline({
                  defaults: { duration: 1, ease: "power2.out" },
                });

                mobileElements.forEach((element) => {
                  revealTimeline.to(element, { opacity: 1, y: 0 }, "-=0.2");
                });

                serviceItems.forEach((item) => {
                  revealTimeline.to(item, { opacity: 1, y: 0 }, "-=0.3");
                });

                mobileObserver.unobserve(entry.target);
              });
            },
            { threshold: 0.3, rootMargin: "0px 0px -40px 0px" }
          );

          mobileObserver.observe(elevatorServicesSection);
        } else {
          // Desktop Viewport: Set initial state
          if (servicesTagline && servicesHeading && servicesLink) {
            gsap.set([servicesTagline, servicesHeading, servicesLink], { opacity: 0, y: 30 });
          }

          serviceItems.forEach((item) => {
            gsap.set(item, { opacity: 0.3 });
            const title = item.querySelector(".service-title");
            const description = item.querySelector(".service-description");
            if (title) gsap.set(title, { color: "#999999" });
            if (description) gsap.set(description, { color: "#999999" });
          });

          // Animate left column stagger reveal
          const servicesTimeline = gsap.timeline({
            paused: true,
            defaults: { duration: 0.8, ease: "power3.out" },
          });

          if (servicesTagline && servicesHeading && servicesLink) {
            servicesTimeline
              .to(servicesTagline, { opacity: 1, y: 0 })
              .to(servicesHeading, { opacity: 1, y: 0 }, "+=0.2")
              .to(servicesLink, { opacity: 1, y: 0 }, "+=0.2");
          }

          ScrollTrigger.create({
            trigger: elevatorServicesSection,
            start: "top 70%",
            end: "bottom 30%",
            onEnter: () => servicesTimeline.restart(),
            onEnterBack: () => servicesTimeline.restart(),
            onLeave: () => servicesTimeline.pause(0),
            onLeaveBack: () => servicesTimeline.pause(0),
          });

          // Individual color observers (threshold 0.3)
          serviceItems.forEach((item) => {
            const title = item.querySelector(".service-title");
            const description = item.querySelector(".service-description");

            const itemObserver = new IntersectionObserver(
              (entries) => {
                entries.forEach((entry) => {
                  if (entry.isIntersecting) {
                    gsap.to(title, { color: "#000000", duration: 0.8, ease: "power3.out" });
                    gsap.to(description, { color: "#000000", duration: 0.8, ease: "power3.out" });
                  } else {
                    gsap.to(title, { color: "#999999", duration: 0.8, ease: "power2.out" });
                    gsap.to(description, { color: "#999999", duration: 0.8, ease: "power2.out" });
                  }
                });
              },
              { threshold: 0.3, rootMargin: "0px 0px -50px 0px" }
            );

            itemObserver.observe(item);
          });

          // Active opacity observer (threshold 0.5)
          const activeObserver = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  serviceItems.forEach((item) => {
                    gsap.to(item, {
                      opacity: item === entry.target ? 1 : 0.3,
                      duration: 0.6,
                      ease: "power2.out",
                    });
                  });
                }
              });
            },
            { threshold: 0.5, rootMargin: "0px 0px -50px 0px" }
          );

          serviceItems.forEach((item) => {
            activeObserver.observe(item);
          });
        }
      }
    }, containerRef);

    return () => ctx.revert();
  }, [fading]);

  const formatDate = (iso) => {
    if (!iso) return "";
    return new Date(iso).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div ref={containerRef} style={{ width: "100%", overflowX: "hidden" }}>
      {/* Hero Logo Spinner */}
      <img src="/img/single-logo.png" alt="Logo" className="hero-logo" id="heroLogo" />

      {/* Hero Section */}
      <section className="hero-section">
        <picture>
          <source media="(max-width: 767px)" srcSet="/img/hero-product.png" />
          <img src="/img/hero-bg.png" alt="Hero Background" className="hero-bg" id="heroBg" />
        </picture>
        <div className="hero-content" id="heroContent">
          <h2 className="text-white">
            Best elevator company combining engineering excellence with thoughtful designs.
          </h2>
          <h1>SAFE AND SOUND, ALL AROUND</h1>
          <Link href="/products/vlseries" className="btn">
            Explore Our Elevator Solutions
          </Link>
        </div>
      </section>

      <div className="page-width">
        {/* Section 2: Core tagline and description */}
        <section className="section-2">
          <div className="container-fluid">
            <div className="section-2-content">
              <p className="section-2-tagline">
                <span className="section-2-dot" aria-hidden="true"></span>Complete Vertical Mobility Solutions
              </p>
              <h2 className="section-2-heading" id="section2Heading">
                Built in Telangana.Trusted Across South India.
              </h2>
              <p className="section-2-para" id="section2Para">
                Powered by 20+ years of engineering excellence, our solutions elevate the way people
                move, live, and experience their spaces.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Section 01: Residential Elevators */}
      <section className="elevator-category-section page-width">
        <div className="container-fluid">
          <div className="elevator-section-wrapper">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="elevator-category-text-content">
                  <span className="elevator-category-number">01</span>
                  <div className="elevator-category-content-wrapper">
                    <div className="elevator-category-top-line">
                      <span className="elevator-category-red-line"></span>
                      <p className="elevator-category-tagline" id="tagline01">
                        SMOOTH RIDES, ENHANCED SAFETY
                      </p>
                    </div>
                    <h2 className="elevator-category-heading" id="heading01">
                      Residential
                      <br /> Elevators
                    </h2>
                    <p className="elevator-category-description">
                     Experience the perfect blend of comfort, style, and advanced technology with
                      our residential elevators. Choose from the VL Series and RM Series, engineered for homes from low to high rise buildings. Thoughtfully engineered for modern living spaces.
                      Designed with a compact footprint, they seamlessly integrate into your
                      interiors without compromising space, while their sleek aesthetics enhance the
                      overall look of your home. Every ride is smooth, quiet, and energy-efficient,
                      ensuring minimal power consumption alongside maximum performance.
                    
                    </p>

                      <div className="residential-buttons-grid">
                      <Link href="/products/vlseries" className="residential-button">
                       Explore VL Series
                      </Link>
                      <Link href="/products/rmgseries" className="residential-button">
                        Explore RM Series
                      </Link>
                    </div>

                    <Link href="/contact" className="elevator-category-link">
                      Enquire Now <i className="fas fa-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="elevator-image-container">
                  <img src="/img/residential-elevators.png" alt="Residential Elevator" id="image01" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 02: Commercial Elevators */}
      <section className="elevator-category-section page-width">
        <div className="container-fluid">
          <div className="elevator-section-wrapper">
            <div className="row align-items-center">
              <div className="col-lg-6 order-2 order-lg-1">
                <div className="elevator-image-container">
                  <img src="/img/commercial-elevators.png" alt="Commercial Elevator" id="image02" />
                </div>
              </div>
              <div className="col-lg-6 order-1 order-lg-2">
                <div className="elevator-category-text-content">
                  <span className="elevator-category-number">02</span>
                  <div className="elevator-category-content-wrapper">
                    <div className="elevator-category-top-line">
                      <span className="elevator-category-red-line"></span>
                      <p className="elevator-category-tagline" id="tagline02">
                        ENGINEERED FOR DURABILITY
                      </p>
                    </div>
                    <h2 className="elevator-category-heading" id="heading02">
                      Commercial <br /> Elevators
                    </h2>
                    <p className="elevator-category-description">
                      Built to perform in demanding, high-traffic environments, our commercial
                      elevators deliver unmatched durability, efficiency, and reliability. Ideal
                      for offices, retail spaces, and business complexes, they are designed to
                      handle continuous usage while maintaining smooth and consistent operation.
                      Engineered with robust materials and advanced technology, these elevators
                      ensure long-lasting performance with minimal downtime.
                    </p>
                    <Link href="/contact" className="elevator-category-link">
                      Enquire Now <i className="fas fa-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 03: Hospital Elevators */}
      <section className="elevator-category-section page-width">
        <div className="container-fluid">
          <div className="elevator-section-wrapper">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="elevator-category-text-content">
                  <span className="elevator-category-number">03</span>
                  <div className="elevator-category-content-wrapper">
                    <div className="elevator-category-top-line">
                      <span className="elevator-category-red-line"></span>
                      <p className="elevator-category-tagline" id="tagline03">
                       Engineered for Care, Built for Reliability
                      </p>
                    </div>
                    <h2 className="elevator-category-heading" id="heading03">
                      Hospital
                      <br />
                      Elevators
                    </h2>
                    <p className="elevator-category-description">
                    Designed for hospitals, nursing homes, and diagnostic centres, our elevators provide smooth and reliable transportation for patients, stretchers, beds, attendants, and medical equipment. Quiet operation and spacious cabins ensure safe and comfortable movement when it matters most.<br/>Use ‘Lifts’ across Residential, Commercial, Hospital & Goods Lift.
                    </p>
                    <Link href="/contact" className="elevator-category-link">
                      Enquire Now <i className="fas fa-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="elevator-image-container">
                  <img src="/img/Hospital-elevators.png" alt="Hospital Elevator" id="image03" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 04: Goods Lifts */}
      <section className="elevator-category-section page-width">
        <div className="container-fluid">
          <div className="elevator-section-wrapper">
            <div className="row align-items-center">
              <div className="col-lg-6 order-2 order-lg-1">
                <div className="elevator-image-container">
                  <img src="/img/goods-lifts.png" alt="Goods Lift" id="image04" />
                </div>
              </div>
              <div className="col-lg-6 order-1 order-lg-2">
                <div className="elevator-category-text-content">
                  <span className="elevator-category-number">04</span>
                  <div className="elevator-category-content-wrapper">
                    <div className="elevator-category-top-line">
                      <span className="elevator-category-red-line"></span>
                      <p className="elevator-category-tagline" id="tagline04">
                        HEAVY-DUTY COMMERCIAL STRENGTH
                      </p>
                    </div>
                    <h2 className="elevator-category-heading" id="heading04">
                      Goods
                      <br />
                      Lifts
                    </h2>
                    <p className="elevator-category-description">
                      Engineered for strength and reliability, our goods lifts are built to handle
                      demanding industrial and commercial applications with ease. Perfect for
                      warehouses, hotels, factories, and logistics environments, they ensure safe
                      and efficient movement of heavy materials across floors. Constructed with
                      high-load capacity components and rugged materials, these lifts deliver
                      consistent performance even under intensive usage.
                    </p>
                    <Link href="/contact" className="elevator-category-link">
                      Enquire Now <i className="fas fa-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="interactive-features-section">
        <div className="container page-width">
          <div className="features-grid-wrapper">
            <div className="features-section-header">
              <p className="section-2-tagline">
                <span className="section-2-dot" aria-hidden="true"></span>Engineered with Precision, Delivered with Trust.
              </p>
              <h2 className="features-grid-heading" id="featuresHeading">
                Why Choose Us
              </h2>
            </div>
            <div className="features-grid">
              {/* Card 1: Custom Built */}
              <div
                className={`feature-card ${activeFeature === "top-left" ? "hovered" : ""}`}
                data-position="top-left"
                onMouseEnter={() => setActiveFeature("top-left")}
                onMouseLeave={() => setActiveFeature(null)}
              >
                <div className="service-icon">
                  <img src="/img/home-page-icon-1.png" alt="Custom Built icon" />
                </div>
                <h3 className="feature-title">Custom Built</h3>
                <p className="feature-description">
                  Every building is unique, and our solutions are customised to match the space,
                  usage requirements, and architectural preferences.
                </p>
              </div>

              {/* Card 2: Fully Automated */}
              <div
                className={`feature-card ${activeFeature === "top-right" ? "hovered" : ""}`}
                data-position="top-right"
                onMouseEnter={() => setActiveFeature("top-right")}
                onMouseLeave={() => setActiveFeature(null)}
              >
                <div className="service-icon">
                  <img src="/img/home-page-icon-2.png" alt="Fully Automated icon" />
                </div>
                <h3 className="feature-title"> Quality assurance</h3>
                <p className="feature-description">
                 Stringent quality checks and reliable manufacturing practices ensure superior product performance.

                </p>
              </div>

              {/* Central Logo */}
              <div className="central-logo">
                <div className={`logo-container ${activeFeature ? "active" : ""}`} id="logoContainer">
                  <div className={`logo-circle ${activeFeature ? "active" : ""}`}>
                    <img src="/img/white-logo.png" alt="White Logo" className="logo-white-icon" />
                    <img src="/img/single-logo.png" alt="Logo" className="logo-elevator-icon" />
                  </div>
                  <div
                    className="circle-corner-fill"
                    data-direction={activeFeature || "none"}
                  ></div>
                </div>
              </div>

              {/* Card 3: Safety & Security */}
              <div
                className={`feature-card ${activeFeature === "bottom-left" ? "hovered" : ""}`}
                data-position="bottom-left"
                onMouseEnter={() => setActiveFeature("bottom-left")}
                onMouseLeave={() => setActiveFeature(null)}
              >
                <div className="service-icon">
                  <img src="/img/home-page-icon-3.png" alt="Safety & Security icon" />
                </div>
                <h3 className="feature-title">Safety & Security</h3>
                <p className="feature-description">
                  Advanced safety systems, sensor-based doors, and automatic rescue features for
                  secure and dependable movement.
                </p>
              </div>

              {/* Card 4: Competitive Pricing */}
              <div
                className={`feature-card ${activeFeature === "bottom-right" ? "hovered" : ""}`}
                data-position="bottom-right"
                onMouseEnter={() => setActiveFeature("bottom-right")}
                onMouseLeave={() => setActiveFeature(null)}
              >
                <div className="service-icon">
                  <img src="/img/home-page-icon-4.png" alt="Competitive Pricing icon" />
                </div>
                <h3 className="feature-title">Competitive Pricing</h3>
                <p className="feature-description">
                 Best value through optimized manufacturing processes and reduced intermediary costs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="clients-section">
        <div className="container-fluid">
          <div className="clients-wrapper">
            <div className="clients-header">
              <p className="section-2-tagline">
                <span className="section-2-dot" aria-hidden="true"></span>Our Trusted Partners
              </p>
              <h2 className="clients-heading" id="clientsHeading">
                Clients Associated With Us
              </h2>
            </div>

            <div className="clients-logo-container">
              <div className="clients-logo-track" id="logoTrack">
                {[
                  "vasavi.png",
                  "raymond.png",
                  "vasmiram.png",
                  "myhome.png",
                  "urbanx.png",
                  "hallmark.png",
                  "muppa.png",
                  "kinara.png",
                  "rajapushpa.png",
                  "jyothiwoods.png",
                  "pmrgroup.png",
                  "raichandani.png",
                  "zudio.png",
                  "speed.png",
                  "apr-group.png",
                  "Vessella_Meadows.png",
                  "sakat.png",
                  "magna.png",
                  "srisrinivasa.png",
                  "virchows.png",
                  "atz.png",
                  "raghavendra.png",
                  "kala.png",
                ].map((logo, idx) => (
                  <div className="client-logo-item" key={idx}>
                    <img src={`/img/${logo}`} alt={logo.split(".")[0]} className="client-logo" />
                  </div>
                ))}
                {/* Loop sets for infinite scrolling */}
                {[
                  "vasavi.png",
                  "raymond.png",
                  "vasmiram.png",
                  "myhome.png",
                  "urbanx.png",
                  "hallmark.png",
                  "muppa.png",
                  "kinara.png",
                  "rajapushpa.png",
                  "jyothiwoods.png",
                  "pmrgroup.png",
                  "raichandani.png",
                  "zudio.png",
                  "speed.png",
                  "apr-group.png",
                  "Vessella_Meadows.png",
                  "sakat.png",
                  "magna.png",
                  "srisrinivasa.png",
                  "virchows.png",
                  "atz.png",
                  "raghavendra.png",
                  "kala.png",
                ].map((logo, idx) => (
                  <div className="client-logo-item" key={`dup-${idx}`}>
                    <img src={`/img/${logo}`} alt={logo.split(".")[0]} className="client-logo" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview Section */}
      <div className="page-width">
        <section className="elevator-services-section">
          <div className="container-fluid">
            <div className="elevator-services-wrapper">
              <div className="row">
                <div className="col-lg-6">
                  <div className="elevator-services-content">
                    <p className="section-2-tagline">
                      <span className="section-2-dot" aria-hidden="true"></span>Services Overview
                    </p>
                    <h2 className="elevator-services-heading">
                      Committed Beyond <br />
                      Installation
                    </h2>
                    <Link href="/services" className="elevator-services-link">
                      All our services <i className="fas fa-arrow-right"></i>
                    </Link>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="elevator-services-list">
                    <div
                      className="service-item"
                      id="serviceItem1"
                    >
                      <h3 className="service-title">
                        Maintenance
                      </h3>
                      <p className="service-description">
                        Regular upkeep for seamless operation
                      </p>
                    </div>
                    <div
                      className="service-item"
                      id="serviceItem2"
                    >
                      <h3 className="service-title">
                        AMC (Annual Maintenance Contract)
                      </h3>
                      <p className="service-description">
                        Long-term functioning, safety, and consistent performance
                      </p>
                    </div>
                    <div
                      className="service-item"
                      id="serviceItem3"
                    >
                      <h3 className="service-title">
                        Modernisation & Upgrade
                      </h3>
                      <p className="service-description">
                        Upgrading the old elevator with new technology
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Testimonials Carousel Section */}
      <section className="testimonials-section">
        <div className="container">
          <div className="testimonials-wrapper">
            <div className="testimonials-header">
              <p className="section-2-tagline">
                <span className="section-2-dot" aria-hidden="true"></span>Testimonials
              </p>
              <h2 className="testimonials-heading">Our Voices Of Trust</h2>
            </div>

            <div className="testimonials-carousel-container">
              <button
                className="testimonials-arrow testimonials-arrow-left"
                onClick={() =>
                  setCurrentTestimonial(
                    (prev) => (prev - 1 + testimonials.length) % testimonials.length
                  )
                }
              >
                <i className="fas fa-chevron-left"></i>
              </button>

              <div className="testimonials-content">
                <div className="row align-items-center">
                  <div className="col-lg-6">
                    <div className="testimonials-image-container">
                      <img
                        src={testimonials[currentTestimonial].image}
                        alt={testimonials[currentTestimonial].name}
                        className="testimonials-image"
                        style={{ transition: "opacity 0.5s" }}
                      />
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="testimonial-card active">
                      <div className="testimonial-quote-icon" aria-hidden="true">
                        <i className="fas fa-quote-left"></i>
                      </div>
                      <p className="testimonial-text">{testimonials[currentTestimonial].text}</p>
                      <div className="testimonial-separator"></div>
                      <div className="testimonial-client-info">
                        <div className="testimonial-client-left">
                          <img
                            src={testimonials[currentTestimonial].avatar}
                            alt={testimonials[currentTestimonial].name}
                            className="testimonial-avatar"
                          />
                          <div className="testimonial-client-details">
                            <h4 className="testimonial-client-name">
                              {testimonials[currentTestimonial].name}
                            </h4>
                            <div className="testimonial-rating">
                              {[...Array(5)].map((_, starIdx) => (
                                <i
                                  key={starIdx}
                                  className={`${
                                    starIdx < testimonials[currentTestimonial].rating
                                      ? "fas"
                                      : "far"
                                  } fa-star`}
                                ></i>
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="testimonial-date">
                          {testimonials[currentTestimonial].date}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button
                className="testimonials-arrow testimonials-arrow-right"
                onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>

            <div className="testimonials-pagination">
              {testimonials.map((_, idx) => (
                <span
                  key={idx}
                  className={`testimonial-dot ${currentTestimonial === idx ? "active" : ""}`}
                  onClick={() => setCurrentTestimonial(idx)}
                ></span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blogs Slider Section */}
      <section className="blogs-section page-width">
        <div className="container-fluid">
          <p className="section-2-tagline">
            <span className="section-2-dot"></span> Blogs
          </p>
          <h2 className="blogs-heading">The Knowledge Hub</h2>

          <div className="row blogs-grid-layout" style={{ marginTop: "40px" }}>
            {blogs.map((blog) => {
              const slug = blog.slug || blog.blogUrl || "";
              const featuredImage = blog.featuredImage?.startsWith("http")
                ? blog.featuredImage
                : `https://sneha-elevators-api.onrender.com/${blog.featuredImage?.replace(/^\//, "") || "uploads/default.png"}`;

              return (
                <div className="col-lg-4 col-md-6 mb-4" key={blog._id || slug}>
                  <Link href={`/blogs/${slug}`} className="blog-card-link">
                    <div className="blog-card">
                      <img
                        src={featuredImage}
                        className="blog-image"
                        alt={blog.title}
                        onError={(e) => {
                          e.target.src = "/img/image-8.png";
                        }}
                      />
                      <div className="blog-content">
                        <h3 className="blog-title">{blog.title}</h3>
                        <p className="blog-description">{blog.excerpt}</p>
                        <div className="blog-meta">
                          <span className="blog-author">{blog.category || "General"}</span>
                          <span>{formatDate(blog.datePosted || blog.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
            {blogs.length === 0 &&
              [1, 2, 3].map((placeholder) => (
                <div className="col-lg-4 col-md-6 mb-4" key={placeholder}>
                  <div className="blog-card" style={{ opacity: 0.7 }}>
                    <img src="/img/image-8.png" className="blog-image" alt="Blog loading" />
                    <div className="blog-content">
                      <h3 className="blog-title">Loading dynamic blogs...</h3>
                      <p className="blog-description">
                        Connecting to the Sneha Elev8r knowledge network.
                      </p>
                      <div className="blog-meta">
                        <span className="blog-author">Sneha</span>
                        <span>May 2026</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Consultation Banner Section */}
      <section className="consultation-banner-section">
        <div className="consultation-banner-background">
          <img
            src="/img/image-9.jpg"
            alt="Consultation banner"
            className="consultation-banner-image"
          />
        </div>
        <div className="container">
          <div className="consultation-banner-wrapper">
            <div className="consultation-banner-content">
              <h2 className="consultation-banner-heading">Let's Move Your Vision Forward</h2>
              <p className="consultation-banner-description">
                End-to-end support from consultation, planning, installation, and beyond.
              </p>
              <Link href="/contact" className="consultation-banner-cta">
                Book a Consultation <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
