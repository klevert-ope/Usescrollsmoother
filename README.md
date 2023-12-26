# ScrollSmoother React Hook
[![Static Badge](https://img.shields.io/badge/npm-latest_v1.1.5-blue?logo=npm)](https://www.npmjs.com/package/use-scrollsmoother)
![Static Badge](https://img.shields.io/badge/license-ISC-red)

The `useScrollSmoother` React Hook provides a simple way to manage smooth scrolling behavior using the ScrollSmoother plugin from the GreenSock Animation Platform (GSAP). This hook enhances the scrolling experience by smoothly catching up to the native scroll position, applying effects to specified elements, and providing various configuration options.

Autocomplete, guides on hover and type definitions are available for the configs.

## Installation

```bash
npm install use-scrollsmoother
```

Make sure you have club GSAP (shockingly or business) installed. You can install it using npm (required dependency):

```bash
npm install gsap@npm:@gsap/shockingly
```

## Usage

```javascript
import { useScrollSmoother } from 'use-scrollsmoother';

function YourApp() {
  const { smoothWrapperRef, smoothContentRef } = useScrollSmoother({
	  config: {
		  smooth: 1, // Time (in seconds) to catch up to the native scroll position
		  smoothTouch: false, // Enable scroll smoothing on touch devices
		  normalizeScroll: false, // Force scrolling on the JavaScript thread
		  snormalizescroll: false, // Force scrolling on the JavaScript thread
		  ignoreMobileResize: false, // Avoid triggering ScrollTrigger.refresh() on mobile resize
		  signoremobileresize: false, // Avoid triggering ScrollTrigger.refresh() on mobile resize
		  effects: false, // Apply effects based on data-speed and data-lag attributes
		  effectsPrefix: 'scroll-', // Custom prefix for effects data attributes
		  effectsPadding: 0, // Expand effects application to a specified number of pixels
		  ease: 'expo', // Easing function for smooth scrolling
		  onUpdate: () => {}, // Function to call after each smooth scroll update
		  onFocusIn: () => true, // Function to call when a new element receives focus
		  onStop: () => {}, // Function to call when smooth scrolling comes to a stop
	  },
  });

  return (
    <div ref={smoothWrapperRef}>
      <div ref={smoothContentRef}>
        {/* Your content goes here */}
      </div>
    </div>
  );
}
```

## Notes

- Ensure that the `smoothWrapperRef` and `smoothContentRef` are applied to the correct elements in your component and in the order as illustrated in the example above.
- Make sure GSAP is properly installed and available in your project.
- In my test usage snormalizescroll same as `ScrollTrigger.normalizeScroll()` and signoremobileresize same as `ScrollTrigger.ignoreMobileResize()` work better in mobile as compared to the normalizeScroll and ignoreMobileResize.

Feel free to adjust the configuration options to suit your specific use case. For more details on GSAP and ScrollSmoother, refer to the [GSAP documentation](https://greensock.com/docs/).
