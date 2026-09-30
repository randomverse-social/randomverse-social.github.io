document.documentElement.classList.add("js");

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("is-visible");
  });
}


/* =========================================================
   NAVIGATION
   ========================================================= */

const siteNav = document.querySelector(".site-nav");
const navToggle = document.querySelector(".site-nav__toggle");
const mobileNav = document.querySelector(".site-nav__mobile");
const navLinks = document.querySelectorAll(
  '.site-nav__links a[href^="#"], .site-nav__mobile a[href^="#"]'
);

function updateNavScrollState() {
  if (!siteNav) return;

  siteNav.classList.toggle("is-scrolled", window.scrollY > 30);
}

updateNavScrollState();

window.addEventListener("scroll", updateNavScrollState, {
  passive: true,
});


/* =========================================================
   MOBILE MENU
   ========================================================= */

if (siteNav && navToggle && mobileNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");

    navToggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    navToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");

      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Open navigation");
    });
  });
}


/* =========================================================
   ACTIVE SECTION
   ========================================================= */

const sections = document.querySelectorAll(
  "main section[id]"
);

const desktopNavLinks = document.querySelectorAll(
  '.site-nav__links a[href^="#"]'
);

if ("IntersectionObserver" in window && sections.length) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        desktopNavLinks.forEach((link) => {
          link.classList.toggle(
            "is-active",
            link.getAttribute("href") === `#${entry.target.id}`
          );
        });
      });
    },
    {
      rootMargin: "-35% 0px -55% 0px",
      threshold: 0,
    }
  );

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });
}