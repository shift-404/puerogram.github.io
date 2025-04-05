function showOrderForm() {
  document.getElementById("orderForm").style.display = "block";
}

document.querySelector(".submit-button").addEventListener("click", function () {
  const name = document.querySelector('input[placeholder="ФИО"]').value;
  const phone = document.querySelector('input[placeholder="Номер телефона"]').value;
  const address = document.querySelector('input[placeholder="Адрес доставки"]').value;

  const message = `📦 Новый заказ:\n👤 ФИО: ${name}\n📞 Телефон: ${phone}\n📍 Адрес: ${address}`;

  const token = "8053319699:AAEsdTfvQAQicncNDS1F3jGRqkcDb81eOUs";
  const chat_id = "<ВАШ_CHAT_ID>"; // Укажите сюда ваш Telegram ID (подробнее ниже)
  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  fetch(url, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    chat_id: chat_id,
    text: message,
  }),
})
  .then(response => response.json())
  .then(data => {
    if (data.ok) {
      alert("✅ Заказ отправлен!");
    } else {
      console.error("Ошибка Telegram:", data);
      alert("❌ Ошибка Telegram: " + data.description);
    }
  })
  .catch(error => {
    console.error("Fetch error:", error);
    alert("⚠ Ошибка при подключении: " + error.message);
  });
