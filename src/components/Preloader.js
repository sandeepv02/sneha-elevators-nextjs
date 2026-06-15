"use client";

import { usePreloader } from "./PreloaderContext";

export default function Preloader() {
  const { isCompleted, fading } = usePreloader();

  if (isCompleted) return null;

  return (
    <div
      id="siteLoader"
      className={`site-loader ${fading ? "site-loader--hidden" : ""}`}
      aria-hidden="true"
    >
      <div className="spinner" role="status" aria-label="Loading"></div>
      <div className="loader-text">Loading</div>
    </div>
  );
}
