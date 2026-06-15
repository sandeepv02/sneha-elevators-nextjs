"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const PreloaderContext = createContext({
  isCompleted: false,
  fading: false,
});

export function PreloaderProvider({ children }) {
  const pathname = usePathname();
  const [isCompleted, setIsCompleted] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Whenever the route pathname changes, reset the preloader states
    setIsCompleted(false);
    setFading(false);

    // Simulate preloader loading for exactly 500ms
    const t1 = setTimeout(() => {
      setFading(true);
      // Wait for the 400ms CSS fade transition to finish before marking completed
      const t2 = setTimeout(() => {
        setIsCompleted(true);
      }, 400);
      return () => clearTimeout(t2);
    }, 500);

    return () => {
      clearTimeout(t1);
    };
  }, [pathname]);

  return (
    <PreloaderContext.Provider value={{ isCompleted, fading }}>
      {children}
    </PreloaderContext.Provider>
  );
}

export function usePreloader() {
  return useContext(PreloaderContext);
}
