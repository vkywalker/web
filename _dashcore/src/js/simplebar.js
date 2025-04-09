/**
 * Simplebar lib calling
 */
import "simplebar";
import "simplebar/dist/simplebar.css";

// You will need a ResizeObserver polyfill for browsers that don't support it! (iOS Safari, Edge, ...)
import ResizeObserver from 'resize-observer-polyfill';
window.ResizeObserver = ResizeObserver;