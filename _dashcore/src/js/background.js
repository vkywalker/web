/**
 * DashCore - SaaS, App & Software Website template.
 * Background js file
 *
 * This file serves for those HTML elements with data-background-image attribute to be able to display
 * the background on them.
 * We can't just use a style attr because the html-loader doesn't support it.
 */
import { queryArray } from "./utils";

const attributeName = "data-background-image";
const backgroundImages = queryArray(`[${attributeName}]`);

backgroundImages.forEach(el => {
  const src = el.getAttribute(attributeName);
  if (src !== "") {
    el.style.backgroundImage = "url(" + src + ")";
  }

  el.removeAttribute(attributeName);
});
