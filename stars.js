function generateStars(num) {
  const body = document.querySelector("body");
  for (let i = 0; i < num; i++) {
    const star = document.createElement("div");
    const size = Math.random() * 3 + 1; // random size
    const posX = Math.random() * window.innerWidth; // random x
    const posY = Math.random() * window.innerHeight; // random y
    const randomX = Math.random() * 200 - 100; // random horizontal move
    const randomY = Math.random() * 200 - 100; // random vertical move
    const animationDelay = Math.random() * 5 + "s"; // random delay

    star.style.setProperty("--randomX", `${randomX}px`);
    star.style.setProperty("--randomY", `${randomY}px`);
    star.classList.add("star");
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${posX}px`;
    star.style.top = `${posY}px`;
    star.style.animationDelay = animationDelay;
    body.appendChild(star);
  }
}

generateStars(150);
