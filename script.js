const pwInput = document.getElementById("password");
const pwBar = document.getElementById("pw-bar");
const toggle = document.getElementById("pw-toggle");
const eyeIcon = document.getElementById("pw-eye");

const reqs = {
  len: { el: document.getElementById("req-len"), test: (v) => v.length >= 8 },
  upper: {
    el: document.getElementById("req-upper"),
    test: (v) => /[A-Z]/.test(v),
  },
  lower: {
    el: document.getElementById("req-lower"),
    test: (v) => /[a-z]/.test(v),
  },
  num: { el: document.getElementById("req-num"), test: (v) => /\d/.test(v) },
  sym: {
    el: document.getElementById("req-sym"),
    test: (v) => /[@$!%*?&_\-]/.test(v),
  },
};

const strengthColors = ["#E24B4A", "#EF9F27", "#EF9F27", "#639922", "#1D9E75"];
const strengthSteps = [0, 20, 40, 60, 80, 100];

if (pwInput) {
  pwInput.addEventListener("input", function () {
    const val = this.value;
    let score = 0;

    Object.values(reqs).forEach((r) => {
      const ok = r.test(val);
      r.el.classList.toggle("met", ok);
      if (ok) score++;
    });

    if (pwBar) {
      pwBar.style.width = val.length === 0 ? "0%" : strengthSteps[score] + "%";
      pwBar.style.background =
        val.length === 0 ? "" : strengthColors[score - 1] || strengthColors[0];
    }

    const valid = score === 5;
    this.setCustomValidity(
      valid || val.length === 0 ? "" : "Contraseña inválida",
    );
  });
}

if (toggle && pwInput && eyeIcon) {
  toggle.addEventListener("click", function () {
    const show = pwInput.type === "password";
    pwInput.type = show ? "text" : "password";
    eyeIcon.className = show ? "ti ti-eye-off" : "ti ti-eye";
  });
}

function handleRegistro(e) {
  e.preventDefault();
  const form = e.target;
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  window.location.href = "exitoso.html";
}

// ANIMACIONES (PARCIAL 2 RESULTADO DE APRENDIZAJE 1)

const cards = document.querySelectorAll("#card");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function animateElement(element, animationType = "up", delay = 0) {
  if (!element) {
    return;
  }

  if (prefersReducedMotion) {
    element.style.opacity = "1";
    element.style.transform = "none";
    return;
  }

  const keyframes = {
    // ANIMACION 1
    up: [
      { opacity: 0, transform: "translateY(24px)" },
      { opacity: 1, transform: "translateY(0)" },
    ],
    // ANIMACION 2
    left: [
      { opacity: 0, transform: "translateX(-24px)" },
      { opacity: 1, transform: "translateX(0)" },
    ],
    // ANIMACION 3
    right: [
      { opacity: 0, transform: "translateX(24px)" },
      { opacity: 1, transform: "translateX(0)" },
    ],
    // ANIMACION 4
    scale: [
      { opacity: 0, transform: "scale(0.96)" },
      { opacity: 1, transform: "scale(1)" },
    ],
  };

  element.animate(keyframes[animationType] || keyframes.up, {
    duration: 700,
    delay,
    easing: "cubic-bezier(0.22, 1, 0.36, 1)",
    fill: "forwards",
  });
}

function startEntranceAnimations() {

  const animatedElements = document.querySelectorAll("[data-js-animate]");

  if (!("IntersectionObserver" in window)) {
    animatedElements.forEach((element, index) => {
      element.style.opacity = "0";
      animateElement(element, element.dataset.jsAnimate || "up", index * 90);
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const element = entry.target;
        const index = Array.from(animatedElements).indexOf(element);
        animateElement(element, element.dataset.jsAnimate || "up", index * 90);
        observer.unobserve(element);
      });
    },
    {
      threshold: 0.15,
    },
  );

  animatedElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.willChange = "opacity, transform";
    observer.observe(element);
  });
}

function CardHover() {
  cards.forEach((card) => {

    // ANIMACION 5
    card.addEventListener("mouseenter", () => {
      card.animate(
        [
          { transform: "translateY(0) scale(1)", boxShadow: "0 8px 18px rgba(0, 0, 0, 0.07)" },
          { transform: "translateY(-6px) scale(1.02)", boxShadow: "0 16px 28px rgba(0, 0, 0, 0.12)" },
        ],
        {
          duration: 220,
          easing: "ease-out",
          fill: "forwards",
        },
      );
    });

    // ANIMACION 6
    card.addEventListener("mouseleave", () => {
      card.animate(
        [
          { transform: "translateY(-6px) scale(1.02)", boxShadow: "0 16px 28px rgba(0, 0, 0, 0.12)" },
          { transform: "translateY(0) scale(1)", boxShadow: "0 8px 18px rgba(0, 0, 0, 0.07)" },
        ],
        {
          duration: 220,
          easing: "ease-in",
          fill: "forwards",
        },
      );
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  startEntranceAnimations();
  CardHover();
});