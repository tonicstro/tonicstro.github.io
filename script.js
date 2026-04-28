console.log("Portfolio cargado correctamente");

// Animación suave al hacer scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Cursor custom
const cursor = document.querySelector(".cursor");

window.addEventListener("mousemove", (e) => {
  cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});

const hoverables = document.querySelectorAll("a, button, .btn");
hoverables.forEach((el) => {
  el.addEventListener("mouseenter", () => cursor.classList.add("cursor--hover"));
  el.addEventListener("mouseleave", () => cursor.classList.remove("cursor--hover"));
});

// Año footer
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Toggle nav móvil
const body = document.body;
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".nav-link");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    body.classList.toggle("nav-open");
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    body.classList.remove("nav-open");
  });
});

// Scroll reveal
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
  }
);

revealElements.forEach((el) => revealObserver.observe(el));

// Nav activo por sección
const sections = document.querySelectorAll("section[id]");
const navMap = {};
navLinks.forEach((link) => {
  const href = link.getAttribute("href");
  if (href && href.startsWith("#")) {
    navMap[href.slice(1)] = link;
  }
});

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute("id");
      if (!id) return;
      if (entry.isIntersecting) {
        navLinks.forEach((l) => l.classList.remove("active"));
        const active = navMap[id];
        if (active) active.classList.add("active");
      }
    });
  },
  {
    threshold: 0.4,
  }
);

sections.forEach((section) => sectionObserver.observe(section));

// Toggle tema claro/oscuro
const themeToggle = document.querySelector(".theme-toggle");
const themeIcon = document.querySelector(".theme-icon");

const THEME_KEY = "portfolio-theme";

function applyTheme(theme) {
  if (theme === "light") {
    document.body.classList.add("light");
    themeIcon.textContent = "☀️";
  } else {
    document.body.classList.remove("light");
    themeIcon.textContent = "🌙";
  }
}

const savedTheme = localStorage.getItem(THEME_KEY);
if (savedTheme) {
  applyTheme(savedTheme);
} else {
  const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  applyTheme(prefersLight ? "light" : "dark");
}

themeToggle.addEventListener("click", () => {
  const newTheme = document.body.classList.contains("light") ? "dark" : "light";
  localStorage.setItem(THEME_KEY, newTheme);
  applyTheme(newTheme);
});

// Formulario: validación mínima + feedback
const form = document.querySelector(".contact-form");
const statusEl = document.getElementById("form-status");

if (form && statusEl) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.querySelector("#name").value.trim();
    const email = form.querySelector("#email").value.trim();
    const message = form.querySelector("#message").value.trim();

    if (!name || !email || !message) {
      statusEl.textContent = "Por favor, completa todos los campos.";
      statusEl.classList.remove("success");
      statusEl.classList.add("error");
      return;
    }

    statusEl.textContent = "Gracias, tu mensaje ha sido simulado como enviado.";
    statusEl.classList.remove("error");
    statusEl.classList.add("success");

    form.reset();

    setTimeout(() => {
      statusEl.textContent = "";
    }, 4000);
  });
}
