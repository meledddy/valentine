(() => {
  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");
  const cardTitle = document.getElementById("cardTitle");
  const cardImage = document.getElementById("cardImage");
  const actions = document.getElementById("actions");
  const page = document.getElementById("page");

  if (!yesBtn || !noBtn || !cardTitle || !cardImage || !actions || !page) return;

  let yesScale = 1;
  const maxScale = 1.14;
  const scaleStep = 0.03;

  const growYesButton = () => {
    yesScale = Math.min(maxScale, yesScale + scaleStep);
    yesBtn.style.setProperty("--yes-scale", yesScale.toFixed(2));
  };

  const moveNoButton = () => {
    const padding = 12;
    if (!noBtn.classList.contains("is-floating")) {
      noBtn.classList.add("is-floating");
    }

    const buttonRect = noBtn.getBoundingClientRect();
    const maxX = window.innerWidth - buttonRect.width - padding;
    const maxY = window.innerHeight - buttonRect.height - padding;

    const nextX = Math.max(padding, Math.random() * maxX);
    const nextY = Math.max(padding, Math.random() * maxY);

    noBtn.style.left = `${Math.round(nextX)}px`;
    noBtn.style.top = `${Math.round(nextY)}px`;
  };

  ["mouseenter", "click", "touchstart"].forEach((evt) => {
    noBtn.addEventListener(evt, (event) => {
      event.preventDefault();
      growYesButton();
      moveNoButton();
    });
  });

  const createEnvelope = () => {
    if (document.getElementById("envelopeWrap")) return;

    const wrap = document.createElement("div");
    wrap.className = "envelope-wrap";
    wrap.id = "envelopeWrap";

    wrap.innerHTML = `
      <div class="envelope" id="envelope">
        <div class="envelope-base"></div>
        <div class="letter-sleeve">
          <div class="letter">
            <div class="letter-inner">
              <h3>My Valentine 💌</h3>
              <p>You are my favorite person, my warmest comfort, and my sweetest smile.</p>
              <p>Thank you for making every day feel softer and brighter.</p>
              <p class="sig">— from me</p>
            </div>
          </div>
        </div>
        <div class="envelope-front"></div>
        <div class="envelope-heart"></div>
        <div class="envelope-flap"></div>
      </div>
    `;

    page.appendChild(wrap);

    const envelope = document.getElementById("envelope");
    if (!envelope) return;

    envelope.addEventListener("click", () => {
      if (!envelope.classList.contains("is-open")) {
        envelope.classList.add("is-open");
      }
    });
  };

  yesBtn.addEventListener("click", () => {
    cardTitle.textContent = "Ура! С 14 февраля ❤️";
    cardImage.src = "assets/yay.gif";
    cardImage.alt = "Valentine gif";
    actions.style.display = "none";
    createEnvelope();
  });
})();
