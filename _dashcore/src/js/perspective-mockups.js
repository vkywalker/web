import { gridFloatBreakpointMax, removeClass } from "./utils";

// This element is used as reference for relocation of the mockups on mobile devices.
// If you remove it please be sure you add another reference element preferably within the same section and/or position the button was.
// You can change the selector (".learn-more") to one that uniquely identifies the reference element.
const topReference = document.querySelector(".lightweight-template .learn-more");

// Perspective mockups reference
const perspectiveMockupsSection = document.querySelector(".perspective-mockups");

const setMockupsTop = (e) => {
  // console.log('Setting mockups');
  // check if the perspective mockups elements are on the page, if you're not going to use them, you can remove all its references
  if (!perspectiveMockupsSection) return;

  if (e.innerWidth < gridFloatBreakpointMax) {
    const clientRect = topReference.getBoundingClientRect();
    const scrollTop = window.scrollY;

    const top = clientRect.top + scrollTop;

    perspectiveMockupsSection.style.top = `${top}px`;
  } else {
    perspectiveMockupsSection.removeAttribute("style");
  }
};

if (topReference) {
  // Position the perspective mockups at the end of the first content section on mobile
  if (perspectiveMockupsSection) {
    removeClass(perspectiveMockupsSection, "hidden-preload");
  }

  // Setting the mockups on window resize
  window.addEventListener("resize", e => {
    setMockupsTop(e.target);
  }, true);

  // Listen for scrolling behavior, it happens on page loading the windows scrolling starts at a certain scrolling position
  // then it scrolls to top
  window.addEventListener("scroll", () => {
    if (window.scrollY <= 10) {
      setMockupsTop(window);
    }
  });

  setTimeout(() => setMockupsTop(window), 300);
}
