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

