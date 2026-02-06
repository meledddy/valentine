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

  const createSealedCard = () => {
    if (document.getElementById("sealedCardWrap")) return;

    const wrap = document.createElement("div");
    wrap.className = "sealed-card-wrap";
    wrap.id = "sealedCardWrap";

    wrap.innerHTML = `
      <div class="sealed-card" id="sealedCard">
        <div class="seal-ribbon">
          <span class="seal-heart"></span>
          <span class="seal-spark"></span>
          <span class="seal-text">Коснись сердца</span>
        </div>
        <div class="sealed-content">
          <p>Ты моё тепло, мой тихий уют и моя самая искренняя улыбка.</p>
          <p>Спасибо тебе за то, что делаешь мой день мягче, светлее и теплее.</p>
          <p class="sig">- от меня 💌</p>
        </div>
      </div>
    `;

    page.appendChild(wrap);

    const sealedCard = document.getElementById("sealedCard");
    if (!sealedCard) return;

    sealedCard.addEventListener("click", () => {
      if (!sealedCard.classList.contains("is-open")) {
        sealedCard.classList.add("is-open");
      }
    });
  };

  yesBtn.addEventListener("click", () => {
    cardTitle.textContent = "Поздравляю с нашим днём! 🫂";
    cardImage.src = "assets/yay.gif";
    cardImage.alt = "Valentine gif";
    actions.style.display = "none";
    createSealedCard();
  });
})();
