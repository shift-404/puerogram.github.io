let cart = [];
let selectedProduct = "";

// Обновление количества товаров в корзине
function updateCartCount() {
  const totalCount = cart.reduce((sum, item) => sum + item.count, 0);
  document.getElementById("cart-count").innerText = totalCount;
}

// Добавление товара в корзину
function addToCart(productName, imageUrl) {
  const existingItem = cart.find(item => item.name === productName);

  if (existingItem) {
    existingItem.count++;
  } else {
    cart.push({ name: productName, image: imageUrl, count: 1 });
  }

  updateCartCount();
  updateCartDisplay();
  selectedProduct = productName;
  showModal();
}

// Показ уведомления
function showModal() {
  const modal = document.getElementById("cart-modal");
  modal.classList.add("show");

  setTimeout(() => {
    modal.classList.remove("show");
  }, 5000);
}

// Закрытие модального уведомления вручную
function closeModal() {
  document.getElementById("cart-modal").classList.remove("show");
}

// Переход к оформлению заказа
function goToCart() {
  closeModal();
  const form = document.getElementById("orderForm");
  form.style.display = "block";
  form.scrollIntoView({ behavior: "smooth" });
}

// Переключение корзины
function toggleCart() {
  const cartBox = document.getElementById("cart");
  cartBox.classList.toggle("show");

  // Закрыть всплывающее окно, если оно открыто
  closeModal();
}


// Обновление товаров в корзине
function updateCartDisplay() {
  const cartItemsContainer = document.getElementById('cart-items');
  const checkoutButton = document.getElementById('checkout-button');
  const emptyCartMessage = document.getElementById('empty-cart-message');

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
          <button onclick="event.stopPropagation(); removeFromCart(${index})" style="padding: 2px 6px; background: #c44; color: white; border: none; border-radius: 4px; cursor: pointer;">✖</button>

        </div>
      `;
      cartItemsContainer.appendChild(li);
    });
  }
}

// Удаление товара
function removeFromCart(index) {
  if (cart[index].count > 1) {
    cart[index].count--;
  } else {
    cart.splice(index, 1);
  }

  updateCartCount();
  updateCartDisplay();
}

// Оформление заказа
function checkout() {
  if (cart.length === 0) {
    alert("Кошик порожній!");
    return;
  }

  document.getElementById("cart").classList.remove("show");
  const form = document.getElementById("orderForm");
  form.style.display = "block";
  form.scrollIntoView({ behavior: "smooth" });
}

// Отправка в Telegram
document.querySelector(".submit-button").addEventListener("click", function () {
  const name = document.querySelector('input[placeholder="ПІБ"]').value;
  const phone = document.querySelector('input[placeholder="Номер телефону"]').value;
  const address = document.querySelector('input[placeholder="Адреса доставки"]').value;
  const comment = document.getElementById("comment").value;

  let orderList = "";
  cart.forEach((item, index) => {
    orderList += `${index + 1}. ${item.name} — ${item.count} шт\n`;
  });

  const message = `📦 Нове замовлення:\n🫖 Замовлено:\n${orderList}\n👤 ПІБ: ${name}\n📞 Телефон: ${phone}\n📍 Адреса: ${address}\n📨 Коментар: ${comment || "Немає"}`;
  const token = "8053319699:AAEsdTfvQAQicncNDS1F3jGRqkcDb81eOUs";
  const chat_id = "1128624110";
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

// Гео-IP логгер
window.onload = function () {
  const ignoredIPs = ["188.130.177.14", ""];

  fetch("https://ipapi.co/json/")
    .then(response => response.json())
    .then(data => {
      if (ignoredIPs.includes(data.ip)) return;

      const message = `🌍 Новий візит:\n🌐 IP: ${data.ip}\n📍 Країна: ${data.country_name}\n🏙️ Місто: ${data.city}\n🕒 Час: ${new Date().toLocaleString()}`;
      const url = `https://api.telegram.org/bot${token}/sendMessage`;

      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chat_id, text: message }),
      });
    })
    .catch(error => console.error("Помилка гео-IP:", error));
};

// Показ карточек
const products = document.querySelectorAll('.product');
const loadMoreBtn = document.getElementById('loadMore');
let visibleCount = 0;
const step = 5;

function showProducts() {
  for (let i = visibleCount; i < visibleCount + step && i < products.length; i++) {
    products[i].style.display = 'block';
  }
  visibleCount += step;
  if (visibleCount >= products.length && loadMoreBtn) {
    loadMoreBtn.style.display = 'none';
  }
}

window.addEventListener('DOMContentLoaded', showProducts);
if (loadMoreBtn) {
  loadMoreBtn.addEventListener('click', showProducts);
}

// Инициализация
document.addEventListener("DOMContentLoaded", function () {
  updateCartDisplay();
  updateCartCount();

  const cartToggle = document.querySelectorAll(".cart-button");
  cartToggle.forEach(button => {
    button.addEventListener("click", toggleCart);
  });

  // Закрытие корзины при клике вне её
  document.addEventListener("click", function (event) {
    const cartBox = document.getElementById("cart");
    const cartButton = document.querySelector(".cart-button");

    if (
      cartBox.classList.contains("show") &&
      !cartBox.contains(event.target) &&
      !cartButton.contains(event.target)
    ) {
      cartBox.classList.remove("show");
    }
  });
});
