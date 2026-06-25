"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { usePreloader } from "@/components/PreloaderContext";

export default function ProductSeriesTemplate({
  seriesName,
  heroImage,
  highlightsTitle,
  highlightsDescription,
  features,
  specifications,
  spaces,
  personalisationHead,
  personalisationChoices,
  safetyIntroText,
  safetyFeatures,
}) {
  const { isCompleted } = usePreloader();
  const containerRef = useRef(null);
  const [activeSpaceIdx, setActiveSpaceIdx] = useState(0);
  const [activeChoiceIdx, setActiveChoiceIdx] = useState(0);

  // Default personalisation choices when none are passed from parent
  const defaultVLChoices = [
    { title: "Brushed Steel", image: "/img/vl-choice-1.png" },
    { title: "Oak Finish", image: "/img/vl-choice-2.png" },
    { title: "Warm LED Lighting", image: "/img/vl-choice-3.png" },
  ];

  const defaultSLChoices = [
    { title: "Glossy White", image: "/img/sl-choice-1.png" },
    { title: "Glass Panel", image: "/img/sl-choice-2.png" },
    { title: "Cool LED Lighting", image: "/img/sl-choice-3.png" },
  ];

  const choices =
    personalisationChoices && personalisationChoices.length
      ? personalisationChoices
      : seriesName && seriesName.toLowerCase().includes("vl")
      ? defaultVLChoices
      : defaultSLChoices;

  // 1. Initial GSAP state setup (runs instantly on mount to prevent any flash/glitch)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Find all reveal-heading elements on the page and hide them instantly
      const revealElements = containerRef.current.querySelectorAll(".reveal-heading");
      revealElements.forEach((el) => {
        gsap.set(el, { opacity: 0, clipPath: "inset(100% 0 0 0)" });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // 2. Play GSAP Animations & register ScrollTriggers (runs once preloader is completed)
  useLayoutEffect(() => {
    if (!isCompleted) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Hero Background zoom-in
      const productHeroBg = document.getElementById("productHeroBg");
      if (productHeroBg) {
        productHeroBg.classList.add("zoom-in");
      }

      // Group all `.reveal-heading` elements by their parent section/wrapper
      const sections = new Set();
      const revealElements = containerRef.current.querySelectorAll(".reveal-heading");

      revealElements.forEach((el) => {
        const parent = el.closest(
          "section, .product-hero-section, .why-choose-rm-header-section, .why-choose-rm-section, .product-specs-section, .built-for-spaces-section, .personalisation-choices-section, .safety-trust-section"
        );
        if (parent) {
          sections.add(parent);
        }
      });

      // Create a ScrollTrigger for each section to stagger-reveal its children using clipPath bottom-to-top
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

  // Automatic transition for personalisation choices mobile carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveChoiceIdx((prev) => (prev + 1) % choices.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [choices.length]);

  return (
    <div ref={containerRef} style={{ width: "100%", overflowX: "hidden" }}>
      {/* Product Hero Section */}
      <section className="product-hero-section">
        <img src={heroImage} alt={`${seriesName} Background`} className="product-hero-bg" id="productHeroBg" />
        <div className="product-hero-content" id="productHeroContent">
          <h1 className="product-hero-title reveal-heading" id="productHeroTitle" data-reveal-delay="0.1">
            {seriesName}
          </h1>
          <div className="product-hero-cta reveal-heading" id="productHeroCta" data-reveal-delay="0.3">
            <Link href="/contact" className="product-cta-btn">
              Book a Free Consultation <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Key Highlights Section */}
      <div className="page-width">
        <section className="why-choose-rm-header-section">
          <div className="container-fluid">
            <div className="why-choose-rm-header-wrapper">
              <p className="section-2-tagline reveal-heading" data-reveal-delay="0.2">
                <span className="section-2-dot" aria-hidden="true"></span>Key Highlights
              </p>
              <h2 className="why-choose-rm-heading reveal-heading" data-reveal-delay="0.3">
                {highlightsTitle}
              </h2>
              <p className="why-choose-rm-description reveal-heading" data-reveal-delay="0.5">
                {highlightsDescription}
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Why Choose RM/SL/VL Section */}
      <div className="page-width">
        <section className="why-choose-rm-section container-fluid">
          <div className="why-choose">
            <div className="why-choose-rm-wrapper">
              <div className="row">
                {/* Left Column: Features 1 & 2 */}
                <div className="col-lg-4">
                  <div className="rm-feature-block reveal-heading" id="rmFeature1" data-reveal-delay="0.5">
                    <div className="service-icon">
                      <img src={features[0].icon} alt={features[0].title} />
                    </div>
                    <h3 className="rm-feature-title">{features[0].title}</h3>
                    <p className="rm-feature-description">{features[0].description}</p>
                  </div>
                  <div className="rm-feature-block reveal-heading" id="rmFeature2" data-reveal-delay="0.6" style={{ marginTop: "40px" }}>
                    <div className="service-icon">
                      <img src={features[1].icon} alt={features[1].title} />
                    </div>
                    <h3 className="rm-feature-title">{features[1].title}</h3>
                    <p className="rm-feature-description">{features[1].description}</p>
                  </div>
                </div>

                {/* Center Column: Image */}
                <div className="col-lg-4 text-center my-4 my-lg-0">
                  <div className="rm-image-container" id="rmImageContainer">
                    <img
                      src={features[4]?.centerImage || "/img/rm-series-block.png"}
                      alt={`${seriesName} Elevator`}
                      className="rm-center-image reveal-heading"
                      id="rmCenterImage"
                      data-reveal-delay="0.5"
                    />
                  </div>
                </div>

                {/* Right Column: Features 3 & 4 */}
                <div className="col-lg-4">
                  <div className="rm-feature-block reveal-heading" id="rmFeature3" data-reveal-delay="0.7">
                    <div className="service-icon">
                      <img src={features[2].icon} alt={features[2].title} />
                    </div>
                    <h3 className="rm-feature-title">{features[2].title}</h3>
                    <p className="rm-feature-description">{features[2].description}</p>
                  </div>
                  <div className="rm-feature-block reveal-heading" id="rmFeature4" data-reveal-delay="0.8" style={{ marginTop: "40px" }}>
                    <div className="service-icon">
                      <img src={features[3].icon} alt={features[3].title} />
                    </div>
                    <h3 className="rm-feature-title">{features[3].title}</h3>
                    <p className="rm-feature-description">{features[3].description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Product Specifications Section */}
      <section className="product-specs-section" id="productSpecsSection">
        <div className="page-width">
          <div className="specs-wrapper" id="specsWrapper">
            {specifications.map((spec, idx) => (
              <div className="spec-item reveal-heading" key={idx} data-reveal-delay={0.5 + idx * 0.1}>
                <h3 className="spec-title">{spec.title}</h3>
                <p className="spec-value">{spec.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brochure Section */}
      <section className="brochure-section" id="brochureSection">
        <div className="brochure-background">
          <img src="/img/image-16.jpg" alt="Brochure Background" className="brochure-bg-image" />
          <div className="brochure-overlay"></div>
        </div>
        <div className="container">
          <div className="brochure-wrapper">
            <div className="brochure-content" id="brochureContent">
              <h2 className="brochure-heading">Brochure</h2>
              <p className="brochure-description">
                For more details about the {seriesName}, click to download the brochure.
              </p>
              <a
                href="/img/SnehaElev8r_Brochure_%20Final%20Print.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="brochure-download-btn"
              >
                <i className="fas fa-download"></i> Download Brochure
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Fits Seamlessly Into These Spaces Section */}
      <section className="built-for-spaces-section" id="builtForSpacesSection">
        <div className="container-fluid">
          <div className="built-for-spaces-wrapper">
            <div className="built-for-spaces-header">
              <p className="section-2-tagline reveal-heading" data-reveal-delay="0.6">
                <span className="section-2-dot" aria-hidden="true"></span>
                {seriesName} Applications
              </p>
              <h2 className="built-for-spaces-heading reveal-heading" data-reveal-delay="0.6">Fits Seamlessly Into These Spaces</h2>
            </div>

            {/* Desktop Carousel with arrows */}
            <div className="built-for-spaces-desktop-carousel d-none d-md-flex align-items-center justify-content-between" id="builtForSpacesDesktopCarousel">
              <button
                type="button"
                className="spaces-nav spaces-nav-left"
                onClick={() => setActiveSpaceIdx((prev) => (prev - 1 + spaces.length) % spaces.length)}
                aria-label="Previous space"
              >
                <i className="fas fa-chevron-left"></i>
              </button>
              <div className="built-for-spaces-carousel-wrapper">
                {spaces.map((space, idx) => {
                  const isVisible = idx === activeSpaceIdx || idx === (activeSpaceIdx + 1) % spaces.length;
                  return (
                    <div
                      className={`space-card ${activeSpaceIdx === idx ? "active" : ""} ${isVisible ? "desktop-visible" : ""}`}
                      key={idx}
                    >
                      <div className="space-image-container">
                        <img src={space.image} alt={space.title} className="space-image" />
                        <div className="space-tag">{space.title}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <button
                type="button"
                className="spaces-nav spaces-nav-right"
                onClick={() => setActiveSpaceIdx((prev) => (prev + 1) % spaces.length)}
                aria-label="Next space"
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>

            {/* Mobile Carousel List */}
            <div className="built-for-spaces-mobile-carousel d-block d-md-none">
              <div id="builtForSpacesMobileCarousel" className="carousel slide" data-bs-touch="true">
                <div className="carousel-inner">
                  {spaces.map((space, idx) => (
                    <div className={`carousel-item ${activeSpaceIdx === idx ? "active" : ""}`} key={idx}>
                      <div className="space-card is-active" style={{ display: "block" }}>
                        <div className="space-image-container">
                          <img src={space.image} alt={space.title} className="space-image" />
                          <div className="space-tag">{space.title}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="carousel-indicators">
                  {spaces.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={activeSpaceIdx === idx ? "active" : ""}
                      onClick={() => setActiveSpaceIdx(idx)}
                      aria-label={`Slide ${idx + 1}`}
                    ></button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Personalisation Choices Section */}
      <section className="personalisation-choices-section container-fluid">
        <div className="personalisation-choices">
          <div className="page-width">
            <div className="row align-items-center personal" style={{ padding: "0 15px" }}>
              <div className="col-lg-5">
                <div className="personalisation-header">
                  <p className="section-2-tagline reveal-heading" id="personalisationChoicesTagline" data-reveal-delay="0.6">
                    <span className="section-2-dot" aria-hidden="true"></span>Personalisation Choices
                  </p>
                  <h2 className="section-title reveal-heading" id="personalisationChoicesHeading" data-reveal-delay="0.6">
                    Tailored To Match
                    <br /> Your Architecture
                  </h2>
                </div>
              </div>
              <div className="col-lg-7">
                <p className="section-description reveal-heading" id="personalisationChoicesDescription" data-reveal-delay="0.6">
                 {personalisationHead}
                </p>
              </div>
            </div>
          </div>

          {/* Desktop/Tablet Choices Grid (All active/fully opaque as requested) */}
          <div className="personalisation-carousel page-width d-none d-md-block" style={{ marginTop: "40px" }}>
            <div className="row justify-content-center">
              {choices.map((choice, idx) => (
                <div
                  className="col-lg-4 col-md-6 mb-4 choice-card-anim"
                  key={idx}
                  style={{
                    opacity: 1,
                    transition: "opacity 0.6s ease",
                  }}
                >
                  <div className="choice-card">
                    <div className="image-wrapper">
                      <img src={choice.image} alt={choice.title} className="choice-img" />
                    </div>
                    <p className="choice-title">{choice.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Choices Carousel */}
          <div className="personalisation-carousel page-width d-block d-md-none" style={{ marginTop: "40px" }}>
            <div id="personalisationMobileCarousel" className="carousel slide" data-bs-touch="true">
              <div className="carousel-inner">
                {choices.map((choice, idx) => (
                  <div className={`carousel-item ${activeChoiceIdx === idx ? "active" : ""}`} key={idx}>
                    <div className="choice-card" style={{ display: "block" }}>
                      <div className="image-wrapper">
                        <img src={choice.image} alt={choice.title} className="choice-img" />
                      </div>
                      <p className="choice-title">{choice.title}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="carousel-indicators">
                {choices.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={activeChoiceIdx === idx ? "active" : ""}
                    onClick={() => setActiveChoiceIdx(idx)}
                    aria-label={`Slide ${idx + 1}`}
                  ></button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Personalisation Choices Section Duplicate */}
      <section className="personalisation-choices-section personalisation-choices-section-duplicate container-fluid">
        <div className="personalisation-choices personalisation-choices-duplicate">
          <div className="page-width">
            <div className="row align-items-center personal" style={{ padding: "0 15px" }}>
              <div className="col-lg-5">
                <div className="personalisation-header">
                  <p className="section-2-tagline reveal-heading" data-reveal-delay="0.6">
                    <span className="section-2-dot" aria-hidden="true"></span>Personalisation Choices
                  </p>
                  <h2 className="section-title reveal-heading" data-reveal-delay="0.6">
                    Tailored To Match
                    <br /> Your Architecture
                  </h2>
                </div>
              </div>
              <div className="col-lg-7">
                <p className="section-description reveal-heading" data-reveal-delay="0.6">
                  {personalisationHead}
                </p>
              </div>
            </div>
          </div>

          <div className="personalisation-carousel page-width d-none d-md-block" style={{ marginTop: "40px" }}>
            <div className="row justify-content-center">
              {choices.map((choice, idx) => (
                <div
                  className="col-lg-4 col-md-6 mb-4 choice-card-anim"
                  key={`duplicate-${idx}`}
                  style={{
                    opacity: 1,
                    transition: "opacity 0.6s ease",
                  }}
                >
                  <div className="choice-card">
                    <div className="image-wrapper">
                      <img src={choice.image} alt={choice.title} className="choice-img" />
                    </div>
                    <p className="choice-title">{choice.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="personalisation-carousel page-width d-block d-md-none" style={{ marginTop: "40px" }}>
            <div id="personalisationMobileCarouselDuplicate" className="carousel slide" data-bs-touch="true">
              <div className="carousel-inner">
                {choices.map((choice, idx) => (
                  <div className={`carousel-item ${activeChoiceIdx === idx ? "active" : ""}`} key={`duplicate-mobile-${idx}`}>
                    <div className="choice-card" style={{ display: "block" }}>
                      <div className="image-wrapper">
                        <img src={choice.image} alt={choice.title} className="choice-img" />
                      </div>
                      <p className="choice-title">{choice.title}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="carousel-indicators">
                {choices.map((_, idx) => (
                  <button
                    key={`duplicate-indicator-${idx}`}
                    type="button"
                    className={activeChoiceIdx === idx ? "active" : ""}
                    onClick={() => setActiveChoiceIdx(idx)}
                    aria-label={`Slide ${idx + 1}`}
                  ></button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Features Section */}
      <div className="page-width">
        <section className="safety-trust-section">
          <div className="container-fluid">
            <div className="built-for-spaces-header">
              <p className="section-2-tagline reveal-heading" data-reveal-delay="0.6">
                <span className="section-2-dot" aria-hidden="true"></span>Safety Features
              </p>
              <h2 className="built-for-spaces-heading reveal-heading" data-reveal-delay="0.6">
                Safety At Every Level
              </h2>
              {safetyIntroText && (
                <p className="reveal-heading" data-reveal-delay="0.6">
                  {safetyIntroText}
                </p>
              )}
            </div>

            <div className="safety-trust-grid" style={{ marginTop: "30px" }}>
              {safetyFeatures.map((feat, idx) => (
                <article
                  className="safety-trust-card reveal-heading"
                  key={idx}
                  data-reveal-delay="0.7"
                >
                  <div className="service-icon">
                    <img src={feat.icon} alt={feat.title} />
                  </div>
                  <h3>{feat.title}</h3>
                  <p>{feat.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
