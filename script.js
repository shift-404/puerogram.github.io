let selectedProduct = "";

document.querySelectorAll(".order-button").forEach(button => {
  button.addEventListener("click", function () {
    selectedProduct = this.getAttribute("data-product"); // Получаем название товара
    const form = document.getElementById("orderForm");
    form.style.display = "block";
    form.scrollIntoView({ behavior: "smooth" }); // Прокрутка к форме заказа
  });
});

document.querySelector(".submit-button").addEventListener("click", function () {
  const name = document.querySelector('input[placeholder="ФИО"]').value;
  const phone = document.querySelector('input[placeholder="Номер телефона"]').value;
  const address = document.querySelector('input[placeholder="Адрес доставки"]').value;
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
