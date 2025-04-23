// ===== Слайдер =====
let currentSlide = 0;

function showSlide(index) {
  const slides = document.querySelector('.slides');
  const totalSlides = slides.children.length;

  // Циклическая прокрутка
  currentSlide = (index + totalSlides) % totalSlides;

  const offset = -currentSlide * 100;
  slides.style.transform = `translateX(${offset}%)`;
}

document.addEventListener('DOMContentLoaded', () => {
  // Обработка стрелок слайдера
  document.getElementById('prev').addEventListener('click', () => {
    showSlide(currentSlide - 1);
  });

  document.getElementById('next').addEventListener('click', () => {
    showSlide(currentSlide + 1);
  });

  // ===== Обработка кликов по карточкам =====
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', () => {
      const productId = card.getAttribute('data-product-id');
      window.location.href = `product${productId}.html`; // Пример: product1.html
    });
  });
});
