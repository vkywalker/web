/**
 * All about using swiper plugin
 * https://swiperjs.com/migration-guide-v9
 */

// core version + navigation, pagination modules:
import Swiper from 'swiper';
import {Autoplay, Navigation, Pagination} from 'swiper/modules';

import { toInt, isDef, toBool, isBool, removeClass, addClass, hasClass, siblings } from "./utils.js";
import 'swiper/css/bundle';

Swiper.use([Navigation, Pagination, Autoplay]);

const configure = container => {
  // Reading from data attributes
  const boolData = {
    breakpoints: container.dataset.swBreakpoints,
    activeSelector: container.dataset.swActiveSelector,
    coverFlow: container.dataset.swCoverflow,
    autoPlay: container.dataset.swAutoplay,
    loop: container.dataset.swLoop,
    centered: container.dataset.swCenteredSlides,
    pagination: container.dataset.swPagination,
    navArrows: container.dataset.swNavArrows,
    allowMove: container.dataset.swAllowMove,
  };

  const breakPoints = boolData.breakpoints
    ? JSON.parse(boolData.breakpoints)
    : false;
  const autoPlay = isDef(boolData.autoPlay) ? toInt(boolData.autoPlay) : false;
  const speed = toInt(container.dataset.swSpeed) || 1100;
  const effect = container.dataset.swEffect || "slide";

  const showItems = toInt(container.dataset.swShowItems) || 1;
  const loop = isDef(boolData.loop) ? toBool(boolData.loop) : false;
  const centered = isDef(boolData.centered) ? toBool(boolData.centered) : false;
  const spaceBetween = toInt(container.dataset.swSpaceBetween) || (showItems > 1 ? 20 : 0);
  const scrollItems = toInt(container.dataset.swScrollItems) || 1;
  const navigationElementId = container.dataset.swNavigation;
  const navigationActiveClass =
    container.dataset.swNavigationActive || "active";
  const navigationActiveSelector = isDef(boolData.activeSelector)
    ? toBool(boolData.activeSelector)
    : false;
  const paginationCss = isDef(boolData.pagination)
    ? (isBool(boolData.pagination) ? toBool(boolData.pagination) : boolData.pagination)
    : ".swiper-pagination";
  const navigationCss = isDef(boolData.navArrows)
    ? (isBool(boolData.navArrows) ? toBool(boolData.navArrows) : boolData.navArrows)
    : ".swiper-button";

  // Setting swiper options based on data attributes
  const coverflow = boolData.coverFlow
    ? {
      coverflowEffect: Object.assign(
        {
          stretch: 0,
          depth: 0,
          modifier: 1,
          rotate: 0,
          slideShadows: false
        },
        JSON.parse(boolData.coverFlow)
      )
    }
    : {};

  const autoplay = autoPlay
    ? {
      autoplay: {
        delay: autoPlay,
        disableOnInteraction: false
      },
      speed: speed
    }
    : {};

  const allowMove = isDef(boolData.allowMove) ? toBool(boolData.allowMove) : true;

  let pagination = {};

  if (paginationCss) {
    pagination.pagination = {
      el: paginationCss,
      clickable: true,
      dynamicBullets: true
    };
  }

  if (navigationCss) {
    pagination.navigation = {
      nextEl: navigationCss + "-next",
      prevEl: navigationCss + "-prev"
    };
  }

  const navigationElement = navigationElementId
    ? document.getElementById(navigationElementId.slice(1))
    : null;

  // Events
  let events = {};
  if (navigationElement) {
    events = {
      transitionEnd: () => {
        if (!navigationElement) return;

        if (navigationActiveSelector) {
          const activeElement = navigationElement.querySelector(
            `${navigationActiveSelector} .${navigationActiveClass}`
          );

          removeClass(activeElement, navigationActiveClass);
        } else {
          const activeElement = navigationElement.querySelector(
            `.${navigationActiveClass}`
          );
          const realElement = navigationElement.querySelectorAll(".nav-item");

          removeClass(activeElement, navigationActiveClass);
          addClass(realElement[swiper.realIndex], navigationActiveClass);
        }
      }
    };
  }

  const options = Object.assign({
      loop: loop,
      slidesPerGroup: scrollItems,
      spaceBetween: spaceBetween,
      centeredSlides: centered,
      breakpoints: breakPoints,
      allowTouchMove: allowMove,
      slidesPerView: showItems,
      parallax: true,
      effect: effect,
    },
    pagination,
    autoplay,
    coverflow
  );

  // THE MAIN SWIPER ELEMENT
  let swiper = new Swiper(container, options);

  // console.log(options);
  Object.keys(events).forEach(e => {
    swiper.on(e, events[e]);
  });

  if (navigationElement) {
    navigationElement.querySelectorAll(".nav-item").forEach(item =>
      item.addEventListener("click", evt => {
        evt.preventDefault();
        let item = evt.currentTarget;
        let activeItem = item;

        if (navigationActiveSelector) {
          activeItem = item.querySelector(navigationActiveSelector);
        }

        if (hasClass(activeItem, navigationActiveClass)) {
          return false;
        }

        let index = item.dataset.step || (item.querySelector(".nav-link").dataset.step - 1);
        swiper.slideTo(index);

        if (navigationActiveSelector) {
          siblings(item).forEach(item => {
            removeClass(
              item.querySelector(navigationActiveSelector),
              navigationActiveClass
            );
          });

          addClass(activeItem, navigationActiveClass);
        } else {
          siblings(item, `.${navigationActiveClass}`).forEach(item =>
            removeClass(item, navigationActiveClass)
          );
          addClass(item, navigationActiveClass);
        }

        evt.stopPropagation();
        return false;
      })
    );
  }

  container.dataset.swiperInstance = swiper;
};

const swipers = document.querySelectorAll(".swiper");

if (swipers) {
  swipers.forEach(container => configure(container));
}
