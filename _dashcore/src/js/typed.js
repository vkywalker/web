/**
 * typed.js
 **/

import Typed from "typed.js";

const typed = document.querySelectorAll(".typed");

if (typed && typed.length > 0) {
  typed.forEach(el => {
    const strings = el.dataset.strings;

    const options = {
      strings: JSON.parse(strings),
      typeSpeed: 150,
      backDelay: 500,
      backSpeed: 50,
      loop: true
    };

    new Typed(el, options);
  });
}
