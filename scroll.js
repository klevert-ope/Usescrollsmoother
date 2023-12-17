'use strict';

var gsap = require('gsap');
var ScrollSmoother = require('gsap/ScrollSmoother');
var ScrollTrigger = require('gsap/ScrollTrigger');
var react = require('react');

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
  const smoothWrapperRef = react.useRef(null);
  const smoothContentRef = react.useRef(null);
  let UseIsomorphicLayoutEffect;
  if (typeof window !== "undefined") {
    UseIsomorphicLayoutEffect = react.useLayoutEffect;
  } else {
    UseIsomorphicLayoutEffect = react.useEffect;
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

exports.useScrollSmoother = useScrollSmoother;
//# sourceMappingURL=scroll.js.map
