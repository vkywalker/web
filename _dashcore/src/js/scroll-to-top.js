class ScrollToTop {
  constructor(scrollElement) {
    this.scrollElement = scrollElement;

    this.scrollElement.addEventListener('click', () => window.scrollTo({
      top: 0,
      behavior: 'smooth'
    }));

    // windows scroll event, toggle between sticky and non-sticky navbar
    window.addEventListener("scroll", () => {
      this.handleScroll();
    });
  }

  handleScroll() {
    const navTop = 800;

    if (window.scrollY >= navTop) {
      this.scrollElement.classList.add("to-top-visible");
    } else {
      this.scrollElement.classList.remove("to-top-visible");
    }
  }
}

const scrollToTopElement = document.querySelector(".scroll-to-top");

if (scrollToTopElement) {
  new ScrollToTop(scrollToTopElement);
}
