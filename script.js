document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     NAVIGATION (Instant Jump)
  =============================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: "auto" });
      }
    });
  });


  /* ===============================
     MODAL FUNCTIONALITY
  =============================== */
  const enrollBtn = document.getElementById("enrollBtn");
  const modal = document.getElementById("admissionModal");
  const closeModal = document.getElementById("closeModal");

  if (enrollBtn && modal) {
    enrollBtn.addEventListener("click", () => {
      modal.style.display = "flex";
    });
  }

  if (closeModal && modal) {
    closeModal.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }

  if (modal) {
    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  }


  /* ===============================
     EMAILJS FORM HANDLING
  =============================== */
  if (typeof emailjs !== "undefined") {
    emailjs.init("kqEJZThYDrxbSAIq7");
  }

  const forms = document.querySelectorAll(".email-form");

  forms.forEach(form => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (typeof emailjs === "undefined") return;

      emailjs.sendForm(
        "service_0g1ksss",
        "template_dtvh6ep",
        form
      )
      .then(() => {
        alert("Submitted successfully!");
        form.reset();

        if (modal && modal.style.display === "flex") {
          modal.style.display = "none";
        }
      })
      .catch(error => {
        alert("Failed to send message. Please try again.");
        console.error(error);
      });
    });
  });


  /* ===============================
     CARDS SCROLL DOT INDICATOR
  =============================== */
  const cards = document.getElementById("cards");
  const dotsContainer = document.getElementById("dots");

  if (cards && dotsContainer) {

    const totalDots = 2;

    for (let i = 0; i < totalDots; i++) {
      const dot = document.createElement("div");
      dot.classList.add("dot");
      if (i === 0) dot.classList.add("active");
      dotsContainer.appendChild(dot);
    }

    const dots = dotsContainer.querySelectorAll(".dot");

    cards.addEventListener("scroll", () => {
      const maxScroll = cards.scrollWidth - cards.clientWidth;
      const progress = cards.scrollLeft / maxScroll;
      const activeIndex = progress < 0.5 ? 0 : 1;

      dots.forEach(dot => dot.classList.remove("active"));
      if (dots[activeIndex]) {
        dots[activeIndex].classList.add("active");
      }
    });
  }


  /* ===============================
     FAQ TOGGLE
  =============================== */
  const faqCards = document.querySelectorAll(".faq-card");
  const toggleBtn = document.getElementById("faqToggleBtn");

  if (faqCards.length > 0) {
    const visibleCount = 3;
    let expanded = false;

    faqCards.forEach((card, index) => {
      if (index < visibleCount) {
        card.classList.add("visible");
      }
    });

    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => {
        expanded = !expanded;

        faqCards.forEach((card, index) => {
          if (expanded || index < visibleCount) {
            card.classList.add("visible");
          } else {
            card.classList.remove("visible");
          }
        });

        toggleBtn.textContent = expanded ? "See Less ⌃" : "See More ...";
      });
    }
  }

});