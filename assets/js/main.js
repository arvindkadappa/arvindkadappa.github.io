document.addEventListener("DOMContentLoaded", () => {

  /* =============================
     Expand / Collapse Sections
  ============================= */
  const headers = document.querySelectorAll(".card-header");
  headers.forEach((header) => {
    const targetId = header.getAttribute("data-target");
    const body = document.getElementById(targetId);
    if (!body) return;
    body.style.maxHeight = body.scrollHeight + "px";

    header.addEventListener("click", () => {
      const isCollapsed = body.style.maxHeight === "0px";
      if (isCollapsed) {
        body.style.maxHeight = body.scrollHeight + "px";
        body.style.opacity = "1";
      } else {
        body.style.maxHeight = "0";
        body.style.opacity = "0";
      }
    });
  });


  /* =============================
     Auto Gallery Loader
  ============================= */
  async function loadGallery() {
    const gallery = document.getElementById("gallery");
    if (!gallery) return;

    try {
      const res = await fetch("assets/images/images.json");
      const images = await res.json();

      images.forEach((file) => {
        const img = document.createElement("img");
        img.src = `assets/images/${file}`;
        img.alt = file.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
        img.loading = "lazy";
        img.addEventListener("click", () => openLightbox(img));
        gallery.appendChild(img);
      });
    } catch (err) {
      console.error("Gallery load failed:", err);
      gallery.innerHTML = `<p style="color:#ccc;">No images found. Add some to <code>assets/images</code>.</p>`;
    }
  }


  /* =============================
     Lightbox Full Image View
  ============================= */
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const lightboxClose = document.getElementById("lightbox-close");

  function openLightbox(img) {
    if (!lightbox) return;
    lightboxImg.src = img.src;
    lightboxCaption.textContent = img.alt || "";
    lightbox.style.display = "flex";
    document.body.style.overflow = "hidden";
  }

  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox || e.target === lightboxClose) {
        lightbox.style.display = "none";
        document.body.style.overflow = "auto";
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        lightbox.style.display = "none";
        document.body.style.overflow = "auto";
      }
    });
  }

  // Load gallery dynamically
  loadGallery();
});
