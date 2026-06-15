import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LenisScroll from "@/components/LenisScroll";
import Preloader from "@/components/Preloader";
import { PreloaderProvider } from "@/components/PreloaderContext";
import Link from "next/link";
import Script from "next/script";

export const metadata = {
  title: "Best Elevator Company in Hyderabad | Sneha Elev8r",
  description:
    "Sneha Elev8r is the Best Elevator Company in Hyderabad and Best in the Residential Home Elevators in Banjara Hills. We Manufactured Home Lift Doors & Modern Elevators.",
  icons: {
    icon: "/img/single-logo.png",
    shortcut: "/img/single-logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.css"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Mosvita:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet" />
      </head>
      <body className="home-page">
        <PreloaderProvider>
          <Preloader />
          <LenisScroll />
          <Navbar />
          {children}
          <Footer />
        </PreloaderProvider>

        {/* Sticky Enquire Now Button */}
        <div className="sticky-enquire">
          <Link href="/contact" className="enquire-sticky-btn">
            Enquire Now
          </Link>
        </div>

        {/* Third-party Script CDNs */}
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
