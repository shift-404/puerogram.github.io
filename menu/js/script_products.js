let allProducts = [];

function loadProducts() {
  fetch('json/products.json')
    .then(response => {
      console.log('Відповідь fetch:', response);
      return response.json();
    })
    .then(data => {
      console.log('Дані з JSON:', data);
      allProducts = data;
      renderProductPlaceholders();
    })
    .catch(error => console.error('Помилка завантаження JSON:', error));
}

function renderProductPlaceholders() {
  const placeholders = document.querySelectorAll('.product-placeholder');
  console.log('Знайдено placeholder-ів:', placeholders.length);

  placeholders.forEach(placeholder => {
    const id = placeholder.dataset.id;
    const product = allProducts.find(p => p.id === id);

    console.log('Обробляємо ID:', id, '→', product);

    if (product) {
      placeholder.outerHTML = `
        <div class="product">
          <img src="${product.image}" alt="${product.name}" class="img2">
          <p class="caption">${product.name}</p>
          <p class="description">${product.description}</p>
          <p class="cost">${product.price}</p>
          <button class="order-button button" onclick="addToCart('${product.description}', '${product.image}')">Замовити</button>
        </div>
      `;
    }
  });
}

// Завантаження при відкритті сторінки
window.onload = loadProducts;

