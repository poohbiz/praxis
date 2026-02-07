/* Praxis Systems — Forms (Audit funnel) */
(() => {
  const qs = (s, root = document) => root.querySelector(s);

  const form = qs("#auditForm");
  if (!form) return;

  const submitBtn = qs("#auditSubmit");
  const statusEl = qs("#auditStatus");

  const required = ["name", "business", "contact"];

  const setStatus = (msg, kind = "info") => {
    if (!statusEl) return;
    statusEl.textContent = msg;
    statusEl.style.opacity = "1";
    statusEl.style.color =
      kind === "error" ? "rgba(255,180,180,.92)" : "var(--muted)";
  };

  const getVal = (name) => (qs(`[name="${name}"]`, form)?.value || "").trim();

  const buildPayload = () => {
    const payload = {
      name: getVal("name"),
      business: getVal("business"),
      contact: getVal("contact"),
      link: getVal("link"),
      bottleneck: getVal("bottleneck"),
      preferred: getVal("preferred"),
      notes: getVal("notes"),
      ts: new Date().toISOString(),
      page: "audit",
    };
    return payload;
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const missing = required.filter((k) => !getVal(k));
    if (missing.length) {
      setStatus("Please fill out name, business, and contact.", "error");
      window.track?.("audit_error", { missing: missing.join(",") });
      return;
    }

    submitBtn?.setAttribute("disabled", "disabled");
    setStatus("Sending…");

    const payload = buildPayload();

    // Always track
    window.track?.("audit_submit", {
      bottleneck: payload.bottleneck || "unspecified",
      preferred: payload.preferred || "unspecified",
    });

    // === Choose ONE submission method ===
    // Option A (fastest): mailto (no backend). Opens user's email client.
    // Option B: Formspree/Web3Forms/etc. (recommended later).
    const mode = "mailto"; // change to "formspree" later

    try {
      if (mode === "mailto") {
        const subject = encodeURIComponent(
          `Praxis Audit — ${payload.business}`,
        );
        const body = encodeURIComponent(
          [
            `Name: ${payload.name}`,
            `Business: ${payload.business}`,
            `Contact: ${payload.contact}`,
            `Link: ${payload.link}`,
            `Bottleneck: ${payload.bottleneck}`,
            `Preferred: ${payload.preferred}`,
            `Notes: ${payload.notes}`,
            `Timestamp: ${payload.ts}`,
          ].join("\n"),
        );

        const to = (window.SITE?.contactEmail || "").trim();
        if (!to) throw new Error("No contact email in config.js");

        window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
        window.location.href = "audit-thanks.html";
        return;
      }

      if (mode === "formspree") {
        // Replace with your endpoint, e.g. https://formspree.io/f/xxxxxx
        const endpoint = "https://formspree.io/f/YOUR_FORM_ID";
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Form submit failed");
        window.location.href = "audit-thanks.html";
        return;
      }
    } catch (err) {
      setStatus(
        "Something went wrong. Try again or email us directly.",
        "error",
      );
      window.track?.("audit_error", { message: String(err?.message || err) });
      submitBtn?.removeAttribute("disabled");
      return;
    }
  });
})();
