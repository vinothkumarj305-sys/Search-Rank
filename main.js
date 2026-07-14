(function () {
  "use strict";

  const navToggle = document.querySelector(".nav__toggle");
  const navList = document.querySelector(".nav__list");

  if (navToggle && navList) {
    navToggle.addEventListener("click", function () {
      const isOpen = navList.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.setAttribute(
        "aria-label",
        isOpen ? "Close menu" : "Open menu"
      );
    });

    document.addEventListener("click", function (event) {
      if (
        navList.classList.contains("is-open") &&
        !navToggle.contains(event.target) &&
        !navList.contains(event.target)
      ) {
        navList.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Open menu");
      }
    });
  }

  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav__link");

  navLinks.forEach(function (link) {
    const href = link.getAttribute("href");
    if (!href) return;

    const linkPath = href.split("/").pop();
    const isHome =
      (currentPath === "" || currentPath === "index.html") &&
      (linkPath === "index.html" || linkPath === "" || linkPath === "./");
    const isMatch = linkPath === currentPath;

    if (isHome || isMatch) {
      link.setAttribute("aria-current", "page");
    }
  });

  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(function (item) {
    const question = item.querySelector(".faq-item__question");
    if (!question) return;

    question.addEventListener("click", function () {
      const isOpen = item.classList.toggle("is-open");
      question.setAttribute("aria-expanded", String(isOpen));
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (event) {
      const targetId = this.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
})();
