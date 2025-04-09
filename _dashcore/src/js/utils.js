/**
 * Multiple utils functions used across all scripts
 */
export const gridFloatBreakpointMax = 768 - 1;

export const toInt = value =>
  value && !Number.isNaN(value) ? Number.parseInt(value) : value;

export const isBool = value => (value ? ["true", "false"].includes(value.toLowerCase()) : false);

export const toBool = value => (value ? value.toLowerCase() === "true" : false);

export const isDef = value => value !== undefined;

export const removeClass = (element, className) =>
  element.classList.remove(className);

export const addClass = (element, className) =>
  element.classList.add(className);

export const hasClass = (element, className) =>
  element.classList.contains(className);

export const siblings = (element, matchTest) => {
  // Setup siblings array and get the first sibling
  let siblings = [];
  let sibling = element.parentNode.firstChild;

  // Loop through each sibling and push to the array
  while (sibling) {
    if (
      sibling.nodeType === 1 &&
      (matchTest && sibling.matches(matchTest)) &&
      sibling !== element
    ) {
      siblings.push(sibling);
    }

    sibling = sibling.nextSibling;
  }

  return siblings;
};

export const queryArray = (el, parent) => {
  parent || (parent = document.body);

  return Array.prototype.slice.call(parent.querySelectorAll(el));
};

export const isEmpty = obj => Object.keys(obj).length === 0;

export const touch = () => {
  return {
    isSupported: "ontouchstart" in document || navigator.maxTouchPoints,
    isDragging: false
  };
};
