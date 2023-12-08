/**
 * @typedef {Object} ScrollSmootherConfig
 * @property {number} smooth - the time (in seconds) that it takes to "catch up" to the native scroll position. Default is 1.
 * @property {boolean,number} smoothTouch - by default, ScrollSmoother will NOT apply scroll smoothing on touch-only devices (like phones) because that typically feels odd to users when it disconnects from their finger's drag position, but you can force smoothing on touch devices too by setting smoothTouch: true (same as smooth value) or specify an amount like smoothTouch: 0.1 (in seconds). Default is false.
 * @property {boolean} normalizeScroll - if true, it forces scrolling to be done on the JavaScript thread, ensuring it is synchronized and the address bar doesn't show/hide on mobile devices. This is the same as calling ScrollTrigger.normalizeScroll() except that it debounces because smooth scrolling makes that possible. Default is false.
 * @property {boolean} ignoreMobileResize - if true, vertical resizes (of 25% of the viewport height) on touch-only devices won't trigger a ScrollTrigger.refresh(), avoiding the jumps that can happen when the start/end values are recalculated. Beware that if you skip the refresh(), the start/end trigger positions may be inaccurate but in many scenarios that's preferable to the visual jumps that occur due to the new start/end positions. Default is false.
 * @property {string,boolean,array} effects - if true, ScrollSmoother will find all elements that have a data-speed and/or data-lag attribute and apply those effects accordingly so that they move at the designated speed or delay, so data-speed="0.5" would scroll at half the normal speed, and data-speed="2" would scroll at twice the normal speed. data-lag="0.8" would take 0.8 seconds to "catch up" to the smoothed scroll position. You can also use selector text or an Array of elements, so effects: ".box" would only look for the attributes on elements with the ".box" class. You can use the effects() method to apply effects directly via JavaScript instead. See that method's docs for more details about how effects work. Note: effects should not be nested. Default is false.
 * @property {string} effectsPrefix - perhaps you're already using data-speed and/or data-lag for other purposes, and you'd like to use a custom prefix for effects data attributes like effectsPrefix: "scroll-" would resolve to data-scroll-speed and data-scroll-lag.
 * @property {number} effectsPadding - Normally effects applied to a particular element begin as soon as the natural position of the element enters the viewport and then end when the natural position leaves the viewport, but in some rare cases you may want to expand that, so you can pass a number (in pixels) as the effectsPadding.
 * @property {string,function} ease - the easing function to be used for smooth scrolling. Default is "expo".
 * @property {function} onUpdate - a function to call after each time the SmoothScroller updates the position of the content.
 * @property {function} onFocusIn - a function to call when a new element receives focus, and you can return false if you want ScrollSmoother to skip ensuring that the element is in the viewport (overriding that default behavior).
 * @property {function} onStop - a function to call when the smoothed scroll comes to a stop (catches up to the native scroll position).
 */

/**
 * @typedef {Object} UseScrollSmootherProps
 * @property {ScrollSmootherConfig} [config] - The configuration object. If not provided,
 * the default values for smooth, smoothTouch, normalizeScroll, ignoreMobileResize, and effects will be used
 */

import gsap from 'gsap';
import ScrollSmoother from 'gsap/ScrollSmoother';
import ScrollTrigger from 'gsap/ScrollTrigger';
import PropTypes from 'prop-types';
import { useEffect, useLayoutEffect, useRef } from 'react';

gsap.registerPlugin (ScrollSmoother, ScrollTrigger);

/**
 * A hook for managing smooth scrolling behavior using gsap ScrollSmoother.
 * @param {UseScrollSmootherProps} [props]
 * @returns {Object} - An object with smoothWrapperRef and smoothContentRef.
 */
export function useScrollSmoother (props = {}) {
	const {
		config = {
			smooth: 1,
			smoothTouch: false,
			effects: false,
			normalizeScroll: false,
			ignoreMobileResize: false
		}
	} = props;

	const UseIsomorphicLayoutEffect =
		typeof window !== 'undefined' ? useLayoutEffect : useEffect;

	const smoothWrapperRef = useRef (null);
	const smoothContentRef = useRef (null);

	UseIsomorphicLayoutEffect (() => {
		if (! smoothWrapperRef.current || ! smoothContentRef.current) {
			console.warn (
				'Smooth wrapper or content Ref not found. Make sure the refs exist.'
			);
			return;
		}

		const gsapContext = gsap.context (() => {
			ScrollTrigger.normalizeScroll (config.normalizeScroll);
			ScrollTrigger.config ({
				ignoreMobileResize: config.ignoreMobileResize,
				autoRefreshEvents: 'DOMContentLoaded,load,resize'
			});

			ScrollSmoother.create ({
				wrapper: smoothWrapperRef.current,
				content: smoothContentRef.current,
				smooth: config.smooth,
				effects: config.effects,
				smoothTouch: config.smoothTouch,
				effectsPrefix: config.effectsPrefix,
				effectsPadding: config.effectsPadding,
				ease: config.ease,
				onUpdate: config.onUpdate,
				onFocusIn: config.onFocusIn,
				onStop: config.onStop
			});
		});

		ScrollTrigger.clearScrollMemory ();

		return () => {
			gsapContext.revert ();
		};
	}, []);

	return { smoothWrapperRef, smoothContentRef };
}

useScrollSmoother.propTypes = {
	props: PropTypes.shape ({
		config: PropTypes.shape ({
			smooth: PropTypes.number,
			smoothTouch: PropTypes.oneOfType ([PropTypes.number, PropTypes.bool]),
			normalizeScroll: PropTypes.bool,
			ignoreMobileResize: PropTypes.bool,
			effects: PropTypes.oneOfType ([PropTypes.string, PropTypes.bool, PropTypes.array]),
			effectsPrefix: PropTypes.string,
			effectsPadding: PropTypes.number,
			ease: PropTypes.oneOfType ([PropTypes.string, PropTypes.func]),
			onUpdate: PropTypes.func,
			onFocusIn: PropTypes.func,
			onStop: PropTypes.func
		})
	})
};
