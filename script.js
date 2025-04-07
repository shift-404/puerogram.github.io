let selectedProduct = "";

// 📩 Повідомлення в Telegram про відвідувача (приховано)
window.addEventListener("load", function () {
  const visitMessage = `👀 Новий відвідувач на сайті!
🕒 Час: ${new Date().toLocaleString()}`;
  
  const token = "8053319699:AAEsdTfvQAQicncNDS1F3jGRqkcDb81eOUs";
  const chat_id = "1128624110";
  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chat_id,
      text: visitMessage,
    }),
  }).catch(error => console.error("⚠ Помилка надсилання повідомлення:", error));
});

// 🛒 Обробка натискання кнопки "Замовити"
document.querySelectorAll(".order-button").forEach(button => {
  button.addEventListener("click", function () {
    selectedProduct = this.getAttribute("data-product"); // Отримуємо назву товару
    const form = document.getElementById("orderForm");
    form.style.display = "block";
    form.scrollIntoView({ behavior: "smooth" }); // Прокрутка до форми
  });
});

// 📦 Обробка натискання кнопки "Надіслати замовлення"
document.querySelector(".submit-button").addEventListener("click", function () {
  const name = document.querySelector('input[placeholder="ПІБ"]').value;
  const phone = document.querySelector('input[placeholder="Номер телефону"]').value;
  const address = document.querySelector('input[placeholder="Адреса доставки"]').value;
  const comment = document.getElementById("comment").value;

  const message = `📦 Нове замовлення:
🫖 Товар: ${selectedProduct || "Не вибрано"}
👤 ПІБ: ${name}
📞 Телефон: ${phone}
📍 Адреса: ${address}
💬 Коментар: ${comment || "Немає"}`;

  const token = "8053319699:AAEsdTfvQAQicncNDS1F3jGRqkcDb81eOUs";
  const chat_id = "1128624110";
  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chat_id,
      text: message,
    }),
  })
  .then(response => {
    if (response.ok) {
      alert("✅ Замовлення надіслано!");
      document.getElementById("orderForm").style.display = "none";
    } else {
      alert("❌ Помилка при надсиланні");
    }
  })
  .catch(error => alert("⚠ Помилка: " + error));
});
