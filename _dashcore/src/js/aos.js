/**
 * Adding AOS.
 * Transition elements while scrolling
 */
import AOS from "aos";
import "aos/dist/aos.css";

document.addEventListener("DOMContentLoaded", () => {
  AOS.init({
    offset: 100,
    duration: 1500,
    disable: "mobile"
  });
});
