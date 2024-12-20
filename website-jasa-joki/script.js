// Animasi fade-in saat form muncul
gsap.from(".form-container", {
  opacity: 0,
  y: -50,
  duration: 1.5,
  ease: "power2.out"
});

// Animasi tombol saat di-hover
const buttons = document.querySelectorAll("button");
buttons.forEach(button => {
  button.addEventListener("mouseenter", () => {
    gsap.to(button, { scale: 1.1, duration: 0.2 });
  });
  button.addEventListener("mouseleave", () => {
    gsap.to(button, { scale: 1, duration: 0.2 });
  });
});
