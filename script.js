let selectedProduct = "";

document.querySelectorAll(".order-button").forEach(button => {
  button.addEventListener("click", function () {
    selectedProduct = this.getAttribute("data-product");
    const form = document.getElementById("orderForm");
    form.style.display = "block";
    form.scrollIntoView({ behavior: "smooth" });
  });
});

document.querySelector(".submit-button").addEventListener("click", function () {
  const name = document.querySelector('input[placeholder="ПІБ"]').value;
  const phone = document.querySelector('input[placeholder="Номер телефону"]').value;
  const address = document.querySelector('input[placeholder="Адреса доставки"]').value;
  const comment = document.getElementById("comment").value;

  const message = `📦 Новый заказ:
🫖 Товар: ${selectedProduct || "Не выбран"}
👤 ФИО: ${name}
📞 Телефон: ${phone}
📍 Адрес: ${address}
📨 Комментарий: ${comment || "Нет"}`;

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
      alert("✅ Заказ отправлен!");
      document.getElementById("orderForm").style.display = "none";
    } else {
      alert("❌ Ошибка при отправке");
    }
  })
  .catch(error => alert("⚠ Ошибка: " + error));
});

window.onload = function () {
  // Список IP, для которых не нужно отправлять сообщение
  const ignoredIPs = ["188.130.177.14", ""]; // 🔧 добавь свои IP здесь

  fetch("https://ipapi.co/json/")
    .then(response => response.json())
    .then(data => {
      // Если IP в списке игнорируемых — выходим
      if (ignoredIPs.includes(data.ip)) return;

      const message = `🌍 Новий візит:
🌐 IP: ${data.ip}
📍 Країна: ${data.country_name}
🏙️ Місто: ${data.city}
🕒 Час: ${new Date().toLocaleString()}`;

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
      });
    })
    .catch(error => console.error("Помилка гео-IP:", error));
}
