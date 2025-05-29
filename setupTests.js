import "@testing-library/jest-dom";

// Polyfill for missing browser APIs
if (typeof window !== "undefined") {
  window.HTMLElement = window.HTMLElement || function () {};
  window.EventTarget = window.EventTarget || function () {};
}
