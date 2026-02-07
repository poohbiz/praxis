/* Praxis Systems — Main */
(() => {
  const SITE = window.SITE || {};

  const qs = (s, root = document) => root.querySelector(s);
  const qsa = (s, root = document) => Array.from(root.querySelectorAll(s));

  // Basic binds
  qsa('[data-bind="brand"]').forEach(
    (el) => (el.textContent = SITE.brand || "Praxis Systems"),
  );
  qsa('[data-bind="tagline"]').forEach(
    (el) => (el.textContent = SITE.tagline || ""),
  );
  qsa('[data-bind="oneLiner"]').forEach(
    (el) => (el.textContent = SITE.oneLiner || ""),
  );
  qsa('[data-bind="locationShort"]').forEach(
    (el) => (el.textContent = SITE.locationShort || ""),
  );
  qsa('[data-bind="primaryCtaLabel"]').forEach(
    (el) => (el.textContent = SITE.primaryCtaLabel || "Free Audit"),
  );
  qsa('[data-bind="secondaryCtaLabel"]').forEach(
    (el) => (el.textContent = SITE.secondaryCtaLabel || "See Proof"),
  );

  qsa('[data-bind="primaryCtaHref"]').forEach((el) =>
    el.setAttribute("href", SITE.primaryCtaHref || "audit.html"),
  );
  qsa('[data-bind="secondaryCtaHref"]').forEach((el) =>
    el.setAttribute("href", SITE.secondaryCtaHref || "proof.html"),
  );

  // Contact binds
  qsa('[data-bind="contactEmail"]').forEach(
    (el) => (el.textContent = SITE.contactEmail || ""),
  );
  qsa('[data-bind="contactEmailHref"]').forEach((el) =>
    el.setAttribute("href", `mailto:${SITE.contactEmail || ""}`),
  );

  if (!SITE.contactPhoneDisplay || !SITE.contactPhoneE164) {
    qsa('[data-bind="phoneWrap"]').forEach((el) => (el.style.display = "none"));
  } else {
    qsa('[data-bind="contactPhone"]').forEach(
      (el) => (el.textContent = SITE.contactPhoneDisplay),
    );
    qsa('[data-bind="contactPhoneHref"]').forEach((el) =>
      el.setAttribute("href", `tel:${SITE.contactPhoneE164}`),
    );
  }

  // Pricing binds (if present)
  const p = SITE.pricing || {};
  const bindPkg = (key) => {
    const pkg = p[key];
    if (!pkg) return;
    qsa(`[data-bind="${key}Name"]`).forEach(
      (el) => (el.textContent = pkg.name),
    );
    qsa(`[data-bind="${key}Price"]`).forEach(
      (el) => (el.textContent = pkg.price),
    );
    qsa(`[data-bind="${key}Bullets"]`).forEach((el) => {
      el.innerHTML = "";
      (pkg.bullets || []).forEach((b) => {
        const li = document.createElement("li");
        li.textContent = b;
        el.appendChild(li);
      });
    });
  };
  bindPkg("launch");
  bindPkg("optimize");
  bindPkg("growth");

  // Case studies tiles (home + proof index)
  qsa('[data-component="caseTiles"]').forEach((wrap) => {
    wrap.innerHTML = "";
    (SITE.caseStudies || []).forEach((cs) => {
      const a = document.createElement("a");
      a.className = "tile";
      a.href = cs.href || "proof.html";
      a.innerHTML = `
        <div class="tag">${cs.tag || "Proof"}</div>
        <div style="font-weight:920; font-size:16px; margin-bottom:4px;">${escapeHtml(cs.title)}</div>
        <div style="color: var(--muted); font-size:13px; margin-bottom:10px;">${escapeHtml(cs.subtitle || "")}</div>
        <ul class="ul">
          ${(cs.bullets || [])
            .slice(0, 3)
            .map((b) => `<li>${escapeHtml(b)}</li>`)
            .join("")}
        </ul>
      `;
      wrap.appendChild(a);
    });
  });

  // Footer note
  qsa('[data-bind="footerNote"]').forEach(
    (el) => (el.textContent = SITE.footerNote || ""),
  );

  // Mobile drawer
  const drawer = qs("#drawer");
  const openBtn = qs("#hamburger");
  const closeBtn = qs("#drawerClose");
  const openDrawer = () => drawer && drawer.classList.add("is-open");
  const closeDrawer = () => drawer && drawer.classList.remove("is-open");

  openBtn?.addEventListener("click", openDrawer);
  closeBtn?.addEventListener("click", closeDrawer);
  drawer?.addEventListener("click", (e) => {
    if (e.target === drawer) closeDrawer();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDrawer();
  });

  // Active nav highlighting
  const page = document.body?.dataset?.page || "";
  qsa(`[data-nav="${page}"]`).forEach((el) => {
    el.style.color = "var(--ink)";
    el.style.background = "rgba(255,255,255,.06)";
  });

  // Tracking helper (GA4 if installed; always logs)
  window.track = function track(eventName, params = {}) {
    try {
      if (typeof window.gtag === "function") {
        window.gtag("event", eventName, params);
      }
    } catch {}
    // Always console log in dev
    // eslint-disable-next-line no-console
    console.log("[track]", eventName, params);
  };

  // Track CTA clicks (buttons/links with data-track)
  qsa("[data-track]").forEach((el) => {
    el.addEventListener("click", () => {
      const name = el.getAttribute("data-track") || "cta_click";
      window.track(name, {
        page,
        label: el.textContent?.trim()?.slice(0, 60) || "",
        href: el.getAttribute("href") || "",
      });
    });
  });

  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }
})();
