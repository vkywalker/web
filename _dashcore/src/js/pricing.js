/**
 * PRICING TABLES
 **/

import "odometer/odometer.min.js";
import "odometer/themes/odometer-theme-minimal.css";
import {gridFloatBreakpointMax, addClass, queryArray, removeClass} from "./utils";

// the pricing table
const pricingElement = document.querySelector('.pricing-element');
const pricingTable = pricingElement && pricingElement.querySelector("table");

// get the default basis
const basisInput = document.querySelector('input[name="pricing-basis"][checked]');
let basis = basisInput && basisInput.value;

// all basis checks
const basisInputs = queryArray('input[name="pricing-basis"]', pricingElement);

// the pricing values, will change the value on updating the basis
const tableOdometers = queryArray('.odometer', pricingElement);

// Needs a way to calculate prices, it will require additional logic and work
const calculatePrice = (basis) => {};

const resizeWindow = function(e) {
  const cells = queryArray('.expand-mobile .visible-cell', pricingTable);

  if (e.innerWidth <= gridFloatBreakpointMax) {
    cells.forEach(cell => {
      cell.setAttribute("colspan", 2);
    });
  } else {
    cells.forEach(cell => {
      cell.removeAttribute("colspan");
    });
  }
};

const moveToPricingTab = function(tab) {
  const hid = "ph-" + tab;

  const cells = queryArray('.expand-mobile .visible-cell', pricingTable);
  cells.forEach(cell => {
    removeClass(cell, "visible-cell");
    cell.removeAttribute("colspan");
  });

  const ths = queryArray("thead th#" + hid, pricingTable);
  ths.forEach(th => {
    addClass(th, "visible-cell");
    th.setAttribute("colspan", 2);
  });

  const headers = queryArray(".expand-mobile td[headers*=" + hid + "]", pricingTable);
  headers.forEach(header => {
    header.setAttribute("colspan", 2);
  });

  const visibleHeaders = queryArray("td[headers].visible-cell", pricingTable);
  visibleHeaders.forEach(header => {
    removeClass(header, "visible-cell");
  });

  const hiddenHeaders = queryArray("td[headers*=" + hid + "]", pricingTable);
  hiddenHeaders.forEach(header => {
    addClass(header, "visible-cell");
  });
};

document.addEventListener("DOMContentLoaded", () => {
  // pricing-basis interaction, monthly/yearly
  basisInputs.forEach(check => {
    check.addEventListener("change", () => {
      basis = check.value;
      if (pricingTable) {
        removeClass(pricingTable, `${basis === 'yearly' ? 'monthly' : 'yearly'}-display`);
        addClass(pricingTable, `${basis}-display`);
      }

      tableOdometers.forEach(odometer => {
        odometer.innerHTML = odometer.dataset[basis];
      });
    });
  });

  // Mobile interaction
  const tabs = document.querySelector('.pricing-table-tabs');
  const inputs = queryArray('input[name="pricing-plan"]', tabs);

  inputs.forEach(input => {
    input.addEventListener("change", () => moveToPricingTab(input.value));
  });

  // Desktop interaction
  // table dropdowns selects, this can be removed if your table doesn't require user interaction
  const togglePrice = queryArray('[data-toggle="price"]');

  togglePrice.forEach(ddl => {
    ddl.addEventListener("change", () => {
      const currentValue = ddl.value;
      const price = calculatePrice(currentValue);

      // Calculating the prices will require additional effort,
      // As a demo matter just toggle between monthly and yearly values
      basis = basis === "yearly" ? "monthly" : "yearly";

      tableOdometers.forEach(odometer => {
        odometer.innerHTML = odometer.dataset[basis];
      });
    });
  });

  // Windows resize
  window.addEventListener("resize", e => {
    resizeWindow(e.target);
  }, true);

  resizeWindow(window);
});
