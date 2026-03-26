const envelopeSection = document.getElementById("envelopeSection");
const invite = document.getElementById("invite");
const sealButton = document.getElementById("sealButton");
const envelopeFigure = document.getElementById("envelopeFigure");
const floatingGarden = document.getElementById("floatingGarden");
const transitionLayer = document.getElementById("transitionLayer");
const countdown = document.getElementById("countdown");
const rsvpForm = document.getElementById("rsvpForm");
const rsvpMessage = document.getElementById("rsvpMessage");

let isOpening = false;

function showInvite() {
  envelopeSection.classList.add("hidden");
  invite.classList.remove("hidden");
  invite.classList.add("fade-in");
  window.scrollTo(0, 0);
}

function createFlowerPiece() {
  const piece = document.createElement("span");
  const rand = Math.random();

  let type = "petal";
  if (rand > 0.55 && rand <= 0.85) type = "leaf";
  if (rand > 0.85) type = "baby";

  piece.className = `flower-piece ${type} fall`;

  const left = Math.random() * 100;
  const duration = 2.8 + Math.random() * 2.2;
  const delay = Math.random() * 0.9;
  const drift = `${-80 + Math.random() * 160}px`;
  const spin = `${-220 + Math.random() * 440}deg`;

  piece.style.left = `${left}%`;
  piece.style.setProperty("--drift-x", drift);
  piece.style.setProperty("--spin", spin);
  piece.style.animationDuration = `${duration}s`;
  piece.style.animationDelay = `${delay}s`;

  if (type === "petal") {
    const width = 14 + Math.random() * 18;
    piece.style.width = `${width}px`;
    piece.style.height = `${width * 1.45}px`;
  } else if (type === "leaf") {
    const width = 18 + Math.random() * 30;
    piece.style.width = `${width}px`;
    piece.style.height = `${width * 0.56}px`;
  } else {
    const size = 5 + Math.random() * 7;
    piece.style.width = `${size}px`;
    piece.style.height = `${size}px`;
  }

  floatingGarden.appendChild(piece);

  setTimeout(() => {
    piece.remove();
  }, (duration + delay + 0.5) * 1000);
}

function startGardenBurst(total = 80) {
  transitionLayer.classList.add("active");

  for (let i = 0; i < total; i++) {
    setTimeout(() => {
      createFlowerPiece();
    }, i * 35);
  }
}

function continueGardenFlow(durationMs = 2200, rateMs = 90) {
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
    startGardenBurst(window.innerWidth < 768 ? 95 : 80);
  }, 800);

  setTimeout(() => {
    invite.classList.remove("hidden");
    invite.classList.add("fade-in");
    continueGardenFlow(2400, 70);
    window.scrollTo(0, 0);
  }, 1700);

  setTimeout(() => {
    transitionLayer.classList.add("fade-out");
  }, 3200);

  setTimeout(() => {
    showInvite();
  }, 4100);
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

rsvpForm.addEventListener("submit", (e) => {
  e.preventDefault();
  rsvpMessage.textContent = "Your RSVP was recorded.";
});
