function generateStars(num) {
  const body = document.querySelector("body");

  // smaller screens
  const stars = window.innerWidth <= 768 ? Math.floor(num / 2) : num;

  for (let i = 0; i < stars; i++) {
    const star = document.createElement("div");
    const size = Math.random() * 3 + 1; // random size
    const posX = Math.random() * (window.innerWidth - size); // random x
    const posY = Math.random() * (window.innerHeight - size); // random y
    const randomX = Math.random() * 50 - 25; 
    const randomY = Math.random() * 50 - 25; 
    const animationDelay = Math.random() * 5 + "s"; // random delay

    star.style.setProperty("--randomX", `${randomX}px`);
    star.style.setProperty("--randomY", `${randomY}px`);
    star.classList.add("star");
    star.classList.add('z-70');
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
