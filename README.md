# ScrollSmoother React Hook

The `useScrollSmoother` React Hook provides a simple way to manage smooth scrolling behavior using the ScrollSmoother plugin from the GreenSock Animation Platform (GSAP). This hook enhances the scrolling experience by smoothly catching up to the native scroll position, applying effects to specified elements, and providing various configuration options.

Autocomplete, guides on hover and type definitions are available for the configs.

## Installation

```bash
npm install usescrollsmoother
```

Make sure you have club GSAP (shockingly or business) installed. You can install it using npm (required):

```bash
npm install gsap@npm:@gsap/shockingly
```

Install the prop types, so you can have type definitions (required):

```bash
npm install prop-types
```

## Usage

### Importing the Hook

```javascript
import { useScrollSmoother } from 'usescrollsmoother';
```

### Basic Usage
This will use the default configurations

```javascript
function YourApp() {
  const { smoothWrapperRef, smoothContentRef } = useScrollSmoother();

  return (
    <div ref={smoothWrapperRef}>
      <div ref={smoothContentRef}>
        {/* Your content goes here */}
      </div>
    </div>
  );
}
```

### Configuration

You can customize the behavior by passing a configuration object to the hook:

```javascript
const { smoothWrapperRef, smoothContentRef } = useScrollSmoother({
  config: {
    smooth: 1, // Time (in seconds) to catch up to the native scroll position
    smoothTouch: false, // Enable scroll smoothing on touch devices
    normalizeScroll: false, // Force scrolling on the JavaScript thread
    ignoreMobileResize: false, // Avoid triggering ScrollTrigger.refresh() on mobile resize
    effects: false, // Apply effects based on data-speed and data-lag attributes
    effectsPrefix: 'scroll-', // Custom prefix for effects data attributes
    effectsPadding: 0, // Expand effects application to a specified number of pixels
    ease: 'expo', // Easing function for smooth scrolling
    onUpdate: () => {}, // Function to call after each smooth scroll update
    onFocusIn: () => true, // Function to call when a new element receives focus
    onStop: () => {}, // Function to call when smooth scrolling comes to a stop
  },
});
```

## PropTypes

```javascript
useScrollSmoother.propTypes = {
  props: PropTypes.shape({
    config: PropTypes.shape({
      smooth: PropTypes.number,
      smoothTouch: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
      normalizeScroll: PropTypes.bool,
      ignoreMobileResize: PropTypes.bool,
      effects: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.array]),
      effectsPrefix: PropTypes.string,
      effectsPadding: PropTypes.number,
      ease: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
      onUpdate: PropTypes.func,
      onFocusIn: PropTypes.func,
      onStop: PropTypes.func,
    }),
  }),
};
```

## Notes

- Ensure that the `smoothWrapperRef` and `smoothContentRef` are applied to the correct elements in your component.
- Make sure GSAP and prop-types are properly installed and available in your project.

Feel free to adjust the configuration options to suit your specific use case. For more details on GSAP and ScrollSmoother, refer to the [GSAP documentation](https://greensock.com/docs/).
