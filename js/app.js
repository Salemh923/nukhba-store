document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.querySelector(".search");

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const keyword = searchInput.value.toLowerCase();
      const cards = document.querySelectorAll(".card");

      cards.forEach(function (card) {
        const text = card.innerText.toLowerCase();

        if (text.includes(keyword)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  }

  const sellButtons = document.querySelectorAll(".btn");

  sellButtons.forEach(function (btn) {
    if (btn.innerText.includes("بيع") || btn.innerText.includes("قيّم")) {
      btn.addEventListener("click", function () {
        window.location.href = "pages/sell.html";
      });
    }
  });
});

function openAccount() {
  window.location.href = "pages/account.html";
}

function openFavorites() {
  window.location.href = "pages/favorites.html";
}

function openCart() {
  window.location.href = "pages/cart.html";
}

function openProduct() {
  window.location.href = "pages/product.html";
}
