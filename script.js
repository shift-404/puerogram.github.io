// cart.js — исправленный код корзины с Telegram-отправкой и логгером IP

let cart = [];
let selectedProduct = "";

const token = "8053319699:AAEsdTfvQAQicncNDS1F3jGRqkcDb81eOUs";
const chat_id = "1128624110";

function loadCart() {
  const storedCart = localStorage.getItem("cart");
  cart = storedCart ? JSON.parse(storedCart) : [];
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
  const totalCount = cart.reduce((sum, item) => sum + item.count, 0);
  const cartCountElem = document.getElementById("cart-count");
  if (cartCountElem) cartCountElem.innerText = totalCount;
}

function addToCart(productName, imageUrl) {
  loadCart();
  const existingItem = cart.find(item => item.name === productName);
  if (existingItem) {
    existingItem.count++;
  } else {
    cart.push({ name: productName, image: imageUrl, count: 1 });
  }
  saveCart();
  updateCartCount();
  updateCartDisplay();
  selectedProduct = productName;
  showModal();
}

function showModal() {
  const modal = document.getElementById("cart-modal");
  if (!modal) return;
  modal.classList.add("show");
  setTimeout(() => modal.classList.remove("show"), 5000);
}

function closeModal() {
  const modal = document.getElementById("cart-modal");
  if (modal) modal.classList.remove("show");
}

function goToCart() {
  closeModal();
  const form = document.getElementById("orderForm");
  if (form) {
    form.style.display = "block";
    form.scrollIntoView({ behavior: "smooth" });
  }
}

function toggleCart() {
  const cartBox = document.getElementById("cart");
  if (cartBox) {
    cartBox.classList.toggle("show");
    closeModal();
  }
}

function updateCartDisplay() {
  loadCart();
  const cartItemsContainer = document.getElementById('cart-items');
  const checkoutButton = document.getElementById('checkout-button');
  const emptyCartMessage = document.getElementById('empty-cart-message');

  if (!cartItemsContainer || !checkoutButton || !emptyCartMessage) return;

  cartItemsContainer.innerHTML = '';
  if (cart.length === 0) {
    checkoutButton.style.display = 'none';
    emptyCartMessage.style.display = 'block';
  } else {
    checkoutButton.style.display = 'block';
    emptyCartMessage.style.display = 'none';
    cart.forEach((item, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <div style="display: flex; align-items: center; margin-bottom: 10px;">
          <img src="${item.image}" alt="${item.name}" style="width: 40px; height: 40px; object-fit: cover; border-radius: 4px; margin-right: 10px;">
          <span style="flex-grow: 1;">${item.name}</span>
          <span style="margin: 0 10px;">${item.count} шт</span>
          <button type="button" class="remove-btn" data-index="${index}" style="padding: 2px 6px; background: #c44; color: white; border: none; border-radius: 4px; cursor: pointer;">✖</button>
        </div>
      `;
      cartItemsContainer.appendChild(li);
    });

    const removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach(button => {
      button.addEventListener('click', function(event) {
        event.stopPropagation();
        const index = parseInt(button.getAttribute('data-index'));
        removeFromCart(index);
      });
    });
  }
}

function removeFromCart(index) {
  loadCart();
  if (cart[index].count > 1) {
    cart[index].count--;
  } else {
    cart.splice(index, 1);
  }
  saveCart();
  updateCartCount();
  updateCartDisplay();
}

function checkout() {
  loadCart();
  if (cart.length === 0) {
    alert("Кошик порожній!");
    return;
  }
  const cartBox = document.getElementById("cart");
  if (cartBox) cartBox.classList.remove("show");
  const form = document.getElementById("orderForm");
  if (form) {
    form.style.display = "block";
    form.scrollIntoView({ behavior: "smooth" });
  }
}

function initCartSystem() {
  loadCart();
  updateCartDisplay();
  updateCartCount();
  const cartToggle = document.querySelectorAll(".cart-button");
  cartToggle.forEach(button => {
    button.addEventListener("click", toggleCart);
  });

  const checkoutButton = document.getElementById('checkout-button');
  if (checkoutButton) {
    checkoutButton.addEventListener('click', checkout);
  }

  document.addEventListener("click", function (event) {
    const cartBox = document.getElementById("cart");
    const cartButton = document.querySelector(".cart-button");
    if (
      cartBox && cartBox.classList.contains("show") &&
      !cartBox.contains(event.target) &&
      (!cartButton || !cartButton.contains(event.target))
    ) {
      cartBox.classList.remove("show");
    }
  });

  const submitBtn = document.querySelector(".submit-button");
  if (submitBtn) {
    submitBtn.addEventListener("click", function () {
      const name = document.querySelector('input[placeholder="ПІБ"]').value;
      const phone = document.querySelector('input[placeholder="Номер телефону"]').value;
      const address = document.querySelector('input[placeholder="Адреса доставки"]').value;
      const comment = document.getElementById("comment").value;

      let orderList = "";
      cart.forEach((item, index) => {
        orderList += `${index + 1}. ${item.name} — ${item.count} шт\n`;
      });

      const message = `📦 Нове замовлення:\n🫖 Замовлено:\n${orderList}\n👤 ПІБ: ${name}\n📞 Телефон: ${phone}\n📍 Адреса: ${address}\n📨 Коментар: ${comment || "Немає"}`;
      const url = `https://api.telegram.org/bot${token}/sendMessage`;

      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chat_id, text: message }),
      })
        .then(response => {
          if (response.ok) {
            alert("✅ Замовлення відправлено!");
            document.getElementById("orderForm").style.display = "none";
          } else {
            alert("❌ Помилка при відправці");
          }
        })
        .catch(error => alert("⚠ Помилка: " + error));
    });
  }

  // IP Logger
  const ignoredIPs = ["188.130.177.14", ""];
  fetch("https://ipapi.co/json/")
    .then(response => response.json())
    .then(data => {
      if (ignoredIPs.includes(data.ip)) return;
      const message = `🌍 Новий візит:\n🌐 IP: ${data.ip}\n📍 Країна: ${data.country_name}\n🏙️ Місто: ${data.city}\n🕒 Час: ${new Date().toLocaleString()}`;
      fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chat_id, text: message }),
      });
    })
    .catch(error => console.error("Помилка гео-IP:", error));
}

document.addEventListener("DOMContentLoaded", initCartSystem);
