function generateStars(num) {
  const body = document.querySelector("body");

  const stars = window.innerWidth <= 768 ? Math.floor(num / 2) : num;

  for (let i = 0; i < stars; i++) {
    const star = document.createElement("div");

    // Random properties
    const size = Math.random() * 3 + 1;              // star size
    const posX = Math.random() * (window.innerWidth - size); // random X position
    const posY = Math.random() * (window.innerHeight - size); // random Y position
    const randomX = Math.random() * 50 - 25;         // random X drift
    const randomY = Math.random() * 50 - 25;         // random Y drift
    const animationDelay = Math.random() * 5 + "s";  // random delay

    // styles
    star.style.setProperty("--randomX", `${randomX}px`);
    star.style.setProperty("--randomY", `${randomY}px`);
    star.classList.add("star", "z-70");
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${posX}px`;
    star.style.top = `${posY}px`;
    star.style.animationDelay = animationDelay;

    body.appendChild(star);
  }
}

generateStars(150);
document.body.style.overflow = "hidden";
