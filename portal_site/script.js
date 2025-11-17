const scrollButtons = document.querySelectorAll(".nav a, .primary");
scrollButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const href = btn.getAttribute("href");
    if (href && href.startsWith("#")) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  });
});

const downloadBtn = document.querySelector(".secondary");
downloadBtn?.addEventListener("click", () => {
  alert("Blueprint download coming soon. Contact placement@campusflow.edu");
});

