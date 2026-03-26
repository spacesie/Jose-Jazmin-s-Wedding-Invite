const envelopeSection = document.getElementById("envelopeSection");
const invite = document.getElementById("invite");
const sealButton = document.getElementById("sealButton");
const envelopeFigure = document.getElementById("envelopeFigure");
const cascadeLayer = document.getElementById("cascadeLayer");
const whiteFlash = document.getElementById("whiteFlash");
const fallingFlowers = document.getElementById("fallingFlowers");
const countdown = document.getElementById("countdown");
const rsvpForm = document.getElementById("rsvpForm");
const rsvpMessage = document.getElementById("rsvpMessage");

let isOpening = false;

function revealInvite() {
  invite.classList.remove("hidden");
  invite.classList.add("fade-in-slow");
  window.scrollTo({ top: 0, behavior: "auto" });
}

function createFlowerPiece() {
  const piece = document.createElement("span");
  const rand = Math.random();

  let type = "petal";
  if (rand > 0.55 && rand <= 0.85) type = "leaf";
  if (rand > 0.85) type = "baby";

  piece.className = `flower-piece ${type} fall`;

  const left = Math.random() * 100;
  const duration = 2.7 + Math.random() * 2.1;
  const delay = Math.random() * 0.7;
  const drift = `${-90 + Math.random() * 180}px`;
  const spin = `${-240 + Math.random() * 480}deg`;

  piece.style.left = `${left}%`;
  piece.style.setProperty("--drift-x", drift);
  piece.style.setProperty("--spin", spin);
  piece.style.animationDuration = `${duration}s`;
  piece.style.animationDelay = `${delay}s`;

  if (type === "petal") {
    const width = 14 + Math.random() * 18;
    piece.style.width = `${width}px`;
    piece.style.height = `${width * 1.42}px`;
  } else if (type === "leaf") {
    const width = 18 + Math.random() * 28;
    piece.style.width = `${width}px`;
    piece.style.height = `${width * 0.56}px`;
  } else {
    const size = 5 + Math.random() * 7;
    piece.style.width = `${size}px`;
    piece.style.height = `${size}px`;
  }

  fallingFlowers.appendChild(piece);

  setTimeout(() => {
    piece.remove();
  }, (duration + delay + 0.5) * 1000);
}

function burstFlowers(total = 120) {
  for (let i = 0; i < total; i++) {
    setTimeout(() => {
      createFlowerPiece();
    }, i * 24);
  }
}

function continueFlowers(durationMs = 2100, rateMs = 70) {
  const start = Date.now();

  const interval = setInterval(() => {
    createFlowerPiece();

    if (Date.now() - start > durationMs) {
      clearInterval(interval);
    }
  }, rateMs);
}

sealButton.addEventListener("click", () => {
  if (isOpening) return;
  isOpening = true;

  envelopeFigure.classList.add("opening");

  setTimeout(() => {
    cascadeLayer.classList.add("active");
    burstFlowers(window.innerWidth < 768 ? 140 : 120);
  }, 950);

  setTimeout(() => {
    continueFlowers(2400, 65);
  }, 1300);

  setTimeout(() => {
    whiteFlash.classList.add("active");
  }, 3000);

  setTimeout(() => {
    envelopeFigure.classList.add("fade-away");
  }, 3200);

  setTimeout(() => {
    revealInvite();
  }, 3600);

  setTimeout(() => {
    cascadeLayer.classList.add("fade-out");
  }, 3900);

  setTimeout(() => {
    envelopeSection.classList.add("hidden");
  }, 5200);
});

const targetDate = new Date("December 18, 2026 16:00:00").getTime();

function updateCountdown() {
  if (!countdown) return;

  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance < 0) {
    countdown.innerHTML = "<p>The big day is here!</p>";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  countdown.innerHTML = `
    <div><strong>${days}</strong><br>Days</div>
    <div><strong>${hours}</strong><br>Hours</div>
    <div><strong>${minutes}</strong><br>Minutes</div>
    <div><strong>${seconds}</strong><br>Seconds</div>
  `;
}

setInterval(updateCountdown, 1000);
updateCountdown();

if (rsvpForm) {
  rsvpForm.addEventListener("submit", (e) => {
    e.preventDefault();
    rsvpMessage.textContent = "Your RSVP was recorded.";
  });
}
