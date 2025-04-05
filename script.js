function showOrderForm() {
  document.getElementById("orderForm").style.display = "block";
}

document.querySelector(".submit-button").addEventListener("click", function () {
  const name = document.querySelector('input[placeholder="ФИО"]').value;
  const phone = document.querySelector('input[placeholder="Номер телефона"]').value;
  const address = document.querySelector('input[placeholder="Адрес доставки"]').value;

  const message = `📦 Новый заказ:\n👤 ФИО: ${name}\n📞 Телефон: ${phone}\n📍 Адрес: ${address}`;

  const token = "8053319699:AAEsdTfvQAQicncNDS1F3jGRqkcDb81eOUs";
  const chat_id = "chst_id:1128624110"; // Укажите сюда ваш Telegram ID (подробнее ниже)
  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chat_id,
      text: message,
    }),
  })
  .then(response => response.ok ? alert("✅ Заказ отправлен!") : alert("❌ Ошибка при отправке"))
  .catch(error => alert("⚠ Ошибка: " + error));
});
