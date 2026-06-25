"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Close navbar collapse on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (href) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname === href || pathname.startsWith(href + "/");
  };

  const isProductActive = () => {
    return pathname.startsWith("/products/");
  };

  return (
    <header className="main-header fade-in" id="mainHeader">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          {/* Logo */}
          <Link href="/" className="navbar-brand">
            <div className="logo-container">
              <img
                src="/img/full-logo.png"
                alt="Sneha Elev8r logo"
                className="header-logo"
              />
            </div>
          </Link>

          {/* Mobile Toggle Button */}
          <button
            className={`navbar-toggler ${isOpen ? "" : "collapsed"}`}
            type="button"
            onClick={toggleNavbar}
            aria-controls="navbarNav"
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navigation Menu */}
          <div
            className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
            id="navbarNav"
          >
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link
                  href="/"
                  className={`nav-link ${isActive("/") ? "active" : ""}`}
                  aria-current={isActive("/") ? "page" : undefined}
                >
                  HOME
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  href="/about"
                  className={`nav-link ${isActive("/about") ? "active" : ""}`}
                  aria-current={isActive("/about") ? "page" : undefined}
                >
                  ABOUT
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className={`nav-link dropdown-toggle ${
                    isProductActive() ? "active" : ""
                  }`}
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  PRODUCT
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      className={`dropdown-item ${
                        pathname === "/products/slseries" ? "active" : ""
                      }`}
                      href="/products/slseries"
                    >
                      SL Series
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`dropdown-item ${
                        pathname === "/products/vlseries" ? "active" : ""
                      }`}
                      href="/products/vlseries"
                    >
                      VL Series
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`dropdown-item ${
                        pathname === "/products/rmgseries" ? "active" : ""
                      }`}
                      href="/products/rmgseries"
                    >
                      RMG Series
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link
                  href="/services"
                  className={`nav-link ${isActive("/services") ? "active" : ""}`}
                  aria-current={isActive("/services") ? "page" : undefined}
                >
                  SERVICES
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  href="/blogs"
                  className={`nav-link ${isActive("/blogs") ? "active" : ""}`}
                  aria-current={isActive("/blogs") ? "page" : undefined}
                >
                  BLOGS
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  href="/contact"
                  className={`nav-link ${isActive("/contact") ? "active" : ""}`}
                  aria-current={isActive("/contact") ? "page" : undefined}
                >
                  CONTACT US
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
