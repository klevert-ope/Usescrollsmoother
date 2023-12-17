/**
 * @file
 * useScrollSmoother
 * A src for managing smooth scrolling behavior using gsap's ScrollSmoother.
 * @copyright (c) 2023 Klevert Opee
 * @license ISC
 */

import gsap from "gsap";
import ScrollSmoother from "gsap/ScrollSmoother";
import ScrollTrigger from "gsap/ScrollTrigger";
import React, {DependencyList, EffectCallback, useEffect, useLayoutEffect, useRef} from "react";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

type ScrollSmootherConfig = {
		/**
		 * smooth - the time (in seconds) that it takes to "catch up" to the native scroll position.
		 */
	smooth: number;
		/**
		 *  smoothTouch - by default, ScrollSmoother will NOT apply scroll smoothing on touch-only
		 *   devices (like phones) because that typically feels odd to users when it disconnects from their finger's drag
		 *   position, but you can force smoothing on touch devices too by setting smoothTouch: true (same as smooth value) or
		 *   specify an amount like smoothTouch: 0.1 (in seconds).
		 */
	smoothTouch: boolean | number;
		/**
		 * if true, it forces scrolling to be done on the JavaScript thread,
		 * ensuring it is synchronized, and the address bar doesn't show/hide on mobile devices.
		 * it debounces because smooth scrolling makes that possible.
		 */
	normalizeScroll: boolean;
		/**
		 * This is ScrollTrigger.normalizeScroll()
		 * if true,
		 * it forces scrolling to be done on the JavaScript thread,
		 * ensuring it is synchronized, and the address bar doesn't show/hide on mobile devices.
		 */
	snormalizescroll: boolean;
		/**
		 * if true,
		 * vertical resizes (of 25% of the viewport height) on touch-only devices won't trigger a ScrollTrigger.refresh(),
		 * avoiding the jumps that can happen when the start/end values are recalculated.
		 * Beware that if you skip the refresh(),
		 * the start/end trigger positions may be inaccurate but in many scenarios
		 * that are preferable to the visual jumps that occur due to the new start/end positions.
		 */
	ignoreMobileResize: boolean;
		/**
		 * This is ScrollTrigger.ignoreMobileResize()
		 * if true, vertical resizes (of 25% of the viewport height) on touch-only devices won't trigger a ScrollTrigger.refresh(),
		 * avoiding the jumps that can happen when the start/end values are recalculated.
		 * Beware that if you skip the refresh(),
		 * the start/end trigger positions may be inaccurate but in many scenarios
		 * that are preferable to the visual jumps that occur due to the new start/end positions.
	 */
	signoremobileresize: boolean;
		/**
		 * if true, ScrollSmoother will find all elements that have a data-speed
		 * and/or data-lag attribute and apply those effects accordingly so that they move at the designated speed or delay,
		 * so data-speed="0.5" would scroll at half the normal speed, and data-speed="2" would scroll at twice the normal speed.
		 * data-lag="0.8" would take 0.8 seconds to "catch up" to the smoothed scroll position. You can also use
		 * selector text or an Array of elements, so effects: ".box" would only look for the attributes on elements with the ".box" class.
		 * You can use the effects() method to apply effects directly via JavaScript instead.
		 * See that method's docs for more details about how effects work.
		 * Note: effects should not be nested.
	 */
	effects: EffectsType;
		/**
		 * perhaps you're already using data-speed and/or data-lag for other purposes,
		 * and you'd like to use a custom prefix for effects data attributes like effectsPrefix:
		 * "scroll-" would resolve to data-scroll-speed and data-scroll-lag.
	 */
	effectsPrefix: string;
		/**
		 * Normally, effects applied to a particular element begin as soon as the natural
		 * position of the element enters the viewport and then end when the natural position leaves the viewport. However, in
		 * some rare cases you may want to expand that, so you can pass a number (in pixels) as the effectsPadding.
	 */
	effectsPadding: number;
		/**
		 * the easing function to be used for smooth scrolling. Default is "expo".
	 */
	ease: string | (() => void);
		/**
		 * a function to call after each time the SmoothScroller updates the position of the content.
	 */
	onUpdate: () => void;
		/**
		 * a function to call when a new element receives focus,
		 * and you can return false if you want ScrollSmoother to skip ensuring that the element is in the viewport
		 * (overriding that default behavior).
	 */
	onFocusIn: () => void;
		/**
		 * a function to call when the smoothed scroll comes to a stop (catches up to the native scroll position).
	 */
	onStop: () => void;
};

type UseScrollSmootherProps = {
	/**
	 * Configuration options for the ScrollSmoother.
	 */
	config?: ScrollSmootherConfig;
};

type UseScrollSmootherResult = {
	smoothWrapperRef: React.RefObject<HTMLDivElement>;
	smoothContentRef: React.RefObject<HTMLDivElement>;
};

type EffectsType = string | boolean | StringArray | undefined;
type StringArray = string[];

/**
 * A src for managing smooth scrolling behavior using gsap ScrollSmoother.
 *
 * @param {UseScrollSmootherProps} props - The src's properties of ScrollSmoother.create({config});
 * @returns {UseScrollSmootherResult} - The result containing refs for smooth wrapper and content.
 */
export function useScrollSmoother({ config }: UseScrollSmootherProps = {}): UseScrollSmootherResult {
	const Config: ScrollSmootherConfig = config || ({} as ScrollSmootherConfig);

	const smoothWrapperRef = useRef<HTMLDivElement>(null);
	const smoothContentRef = useRef<HTMLDivElement>(null);

	let UseIsomorphicLayoutEffect: (effect: EffectCallback, deps?: DependencyList) => void;
	if (typeof window !== 'undefined') {
		UseIsomorphicLayoutEffect = useLayoutEffect;
	} else {
		UseIsomorphicLayoutEffect = useEffect;
	}

	UseIsomorphicLayoutEffect(() => {
		if (!smoothWrapperRef.current || !smoothContentRef.current) {
			throw new Error('Smooth wrapper or content Ref not found. Make sure the refs exist.');
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
