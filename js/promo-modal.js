document.addEventListener("DOMContentLoaded", function () {
  const promoButton = document.getElementById("promo-button");
  const promoModal = document.getElementById("promo-modal");
  const promoContent = promoModal?.querySelector(".modal-content");
  const closePromo = document.getElementById("close-promo");
  const promoUseBtn = document.getElementById("promo-use-btn");
  const promoTimer = document.getElementById("promo-timer");
  
  function showPromoNotification() {
  const notice = document.createElement("div");
  notice.className = "promo-notice";
  notice.textContent = "⏳ Успій замовити до завершення акції! Удачі!";

  document.body.appendChild(notice);

  setTimeout(() => {
    notice.style.opacity = "0";
    setTimeout(() => notice.remove(), 500);
  }, 4000);
}

  const PROMO_DURATION = 300; // секунд = 5 минут
  let timerInterval;

  function getRemainingTime() {
    const promoStart = parseInt(localStorage.getItem("promoStart") || Date.now());
    const elapsed = Math.floor((Date.now() - promoStart) / 1000);
    return Math.max(0, PROMO_DURATION - elapsed);
  }

  function startTimer() {
    let remaining = getRemainingTime();

    function updateTimer() {
      const minutes = String(Math.floor(remaining / 60)).padStart(2, "0");
      const seconds = String(remaining % 60).padStart(2, "0");
      promoTimer.textContent = `${minutes}:${seconds}`;

      if (remaining <= 0) {
        clearInterval(timerInterval);
        promoUseBtn.disabled = true;
        promoUseBtn.textContent = "Час вийшов";
        return;
      }

      remaining--;
    }

    updateTimer();
    timerInterval = setInterval(updateTimer, 1000);
  }

  function openPromoModal() {
    promoModal.classList.add("show");
    promoModal.classList.remove("hidden");

    if (!localStorage.getItem("promoStart")) {
  const startTime = Date.now();
  localStorage.setItem("promoStart", startTime);
  localStorage.setItem("promoEndTime", startTime + PROMO_DURATION * 1000);
}


    const remaining = getRemainingTime();
    promoUseBtn.disabled = remaining <= 0;
    promoUseBtn.textContent = remaining > 0 ? "Використати знижку" : "Час вийшов";

    startTimer();
  }

  function closePromoModal() {
    promoModal.classList.remove("show");
    setTimeout(() => promoModal.classList.add("hidden"), 300);
  }

  if (promoButton && promoModal && promoContent && closePromo) {
    promoButton.addEventListener("click", openPromoModal);
    closePromo.addEventListener("click", closePromoModal);

    window.addEventListener("click", function (e) {
      if (!promoContent.contains(e.target) && !promoButton.contains(e.target)) {
        closePromoModal();
      }
    });

    const alreadyShown = localStorage.getItem("promoShown");
    if (!alreadyShown) {
      openPromoModal();
      localStorage.setItem("promoShown", "true");
    }

  promoUseBtn?.addEventListener("click", function () {
      closePromoModal();
      showPromoNotification();
});

  }
});
