(function () {
  document.addEventListener("DOMContentLoaded", () => {
    // console.log('Page Loaded');
    const preloader = document.querySelector('.page-loading');
    preloader.classList.remove('active');

    setTimeout(function () {
      preloader.remove();
    }, 1000);
  });
})();
