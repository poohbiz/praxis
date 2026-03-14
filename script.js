const siteConfig = {
  businessName: "Praxis Systems",
  bookingUrl: "#contact",
  contactEmail: "praxis.systems.co@gmail.com",
  contactPhone: "(573) 288-4254",
};

const ctaLinks = document.querySelectorAll("[data-cta-link]");
const emailLink = document.getElementById("emailLink");
const contactEmailText = document.getElementById("contactEmailText");
const contactPhoneText = document.getElementById("contactPhoneText");
const year = document.getElementById("year");

ctaLinks.forEach((link) => {
  link.setAttribute("href", siteConfig.bookingUrl);
});

if (emailLink) {
  emailLink.setAttribute(
    "href",
    `mailto:${siteConfig.contactEmail}?subject=7-Day%20Missed-Call%20Baseline`,
  );
}

if (contactEmailText) {
  contactEmailText.textContent = `Email: ${siteConfig.contactEmail}`;
}

if (contactPhoneText) {
  contactPhoneText.textContent = `Phone: ${siteConfig.contactPhone}`;
}

if (year) {
  year.textContent = new Date().getFullYear();
}

const menuToggle = document.getElementById("menuToggle");
const siteNav = document.getElementById("siteNav");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}
