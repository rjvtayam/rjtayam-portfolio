// Wait for the DOM to be fully loaded before executing the script
document.addEventListener("DOMContentLoaded", () => {
  // Select all navigation links and sections
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section");

  // Intersection Observer for section visibility
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          setActiveNavLink(id);
        }
      });
    },
    { threshold: 0.5 }
  );

  // Observe all sections
  sections.forEach((section) => sectionObserver.observe(section));

  // Function to set active navigation link
  function setActiveNavLink(sectionId) {
    navLinks.forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${sectionId}`
      );
    });
  }

  // Smooth scrolling for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Animate elements when they come into view
  const animateOnScroll = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        }
      });
    },
    { threshold: 0.1 }
  );

  document
    .querySelectorAll(".animate-on-scroll")
    .forEach((el) => animateOnScroll.observe(el));

  // Handle mobile menu toggle
  const menuToggle = document.querySelector(".navbar-toggler");
  const navbarCollapse = document.querySelector(".navbar-collapse");

  if (menuToggle && navbarCollapse) {
    menuToggle.addEventListener("click", () => {
      navbarCollapse.classList.toggle("show");
    });

    // Close mobile menu when a link is clicked
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navbarCollapse.classList.remove("show");
      });
    });
  }

  // Lazy loading for images
  const lazyImages = document.querySelectorAll("img[data-src]");
  const lazyImageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
        observer.unobserve(img);
      }
    });
  });

  lazyImages.forEach((img) => lazyImageObserver.observe(img));

  // Form submission handling
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(contactForm);
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Thank you for your message. I will get back to you soon!");
        contactForm.reset();
      } else {
        alert(
          "Oops! There was a problem submitting your form. Please try again later."
        );
      }
    });
  }

  // Project filter functionality
  const filterButtons = document.querySelectorAll(".filter-button");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter");

      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      projectCards.forEach((card) => {
        const category = card.getAttribute("data-category");
        if (filter === "all" || filter === category) {
          card.style.display = "block";
          setTimeout(() => (card.style.opacity = "1"), 50);
        } else {
          card.style.opacity = "0";
          setTimeout(() => (card.style.display = "none"), 500);
        }
      });
    });
  });
});
