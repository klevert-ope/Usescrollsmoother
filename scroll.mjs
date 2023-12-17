import gsap from 'gsap';
import ScrollSmoother from 'gsap/ScrollSmoother';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useRef, useLayoutEffect, useEffect } from 'react';

/**
 * @file
 * useScrollSmoother
 * A src for managing smooth scrolling behavior using gsap's ScrollSmoother.
 * @copyright (c) 2023 Klevert Opee
 * @license ISC
 */
gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
function useScrollSmoother({ config } = {}) {
  const Config = config || {};
  const smoothWrapperRef = useRef(null);
  const smoothContentRef = useRef(null);
  let UseIsomorphicLayoutEffect;
  if (typeof window !== "undefined") {
    UseIsomorphicLayoutEffect = useLayoutEffect;
  } else {
    UseIsomorphicLayoutEffect = useEffect;
  }
  UseIsomorphicLayoutEffect(() => {
    if (!smoothWrapperRef.current || !smoothContentRef.current) {
      throw new Error("Smooth wrapper or content Ref not found. Make sure the refs exist.");
    }
    const gsapContext = gsap.context(() => {
      ScrollTrigger.normalizeScroll(Config.snormalizescroll);
      ScrollTrigger.config({
        ignoreMobileResize: Config.signoremobileresize,
        syncInterval: 100
      });
      ScrollSmoother.create({
        wrapper: smoothWrapperRef.current,
        content: smoothContentRef.current,
        ...Config
      });
    });
    return () => {
      gsapContext.revert();
    };
  }, []);
  return { smoothWrapperRef, smoothContentRef };
}

export { useScrollSmoother };
//# sourceMappingURL=scroll.mjs.map
