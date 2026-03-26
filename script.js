const envelopeSection = document.getElementById("envelopeSection");
const invite = document.getElementById("invite");
const sealButton = document.getElementById("sealButton");
const envelopeFigure = document.getElementById("envelopeFigure");
const cascadeLayer = document.getElementById("cascadeLayer");
const whiteFlash = document.getElementById("whiteFlash");
const countdown = document.getElementById("countdown");
const rsvpForm = document.getElementById("rsvpForm");
const rsvpMessage = document.getElementById("rsvpMessage");

let isOpening = false;

function revealInvite() {
  invite.classList.remove("hidden");
  invite.classList.add("fade-in-slow");
  window.scrollTo({ top: 0, behavior: "instant" });
}

sealButton.addEventListener("click", () => {
  if (isOpening) return;
  isOpening = true;

  envelopeFigure.classList.add("opening");

  setTimeout(() => {
    cascadeLayer.classList.add("active");
  }, 1400);

  setTimeout(() => {
    whiteFlash.classList.add("active");
  }, 4200);

  setTimeout(() => {
    revealInvite();
  }, 4550);

  setTimeout(() => {
    cascadeLayer.classList.add("fade-out");
  }, 4900);

  setTimeout(() => {
    envelopeSection.classList.add("hidden");
  }, 6600);
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
