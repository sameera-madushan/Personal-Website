"use client";
import { useEffect, useRef } from "react";
import { Lightbox } from "@sameera_madushan/simple_lightbox";

export default function LightboxWrapper() {
  const lightboxRef = useRef<Lightbox | null>(null);

  useEffect(() => {
    lightboxRef.current = new Lightbox(".prose img", {
      navigation: false,
    });

    return () => {
      lightboxRef.current?.destroy();
      lightboxRef.current = null;
    };
  }, []);

  return null;
}
