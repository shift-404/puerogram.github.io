let currentSlide = 1;

function showSlide(index) {
  const slidesContainer = document.querySelector('.slides');
  const slides = slidesContainer.querySelectorAll('.slide');
  const totalSlides = slides.length;

  slidesContainer.style.transition = 'transform 0.5s ease-in-out';
  slidesContainer.style.transform = `translateX(${-index * 100}%)`;

  currentSlide = index;

  // Обработка перехода за пределы
  slidesContainer.addEventListener('transitionend', () => {
    if (currentSlide === 0) {
      slidesContainer.style.transition = 'none';
      currentSlide = totalSlides - 2;
      slidesContainer.style.transform = `translateX(${-currentSlide * 100}%)`;
    } else if (currentSlide === totalSlides - 1) {
      slidesContainer.style.transition = 'none';
      currentSlide = 1;
      slidesContainer.style.transform = `translateX(${-currentSlide * 100}%)`;
    }
  }, { once: true });
}

document.addEventListener('DOMContentLoaded', () => {
  const slidesContainer = document.querySelector('.slides');
  const originalSlides = Array.from(slidesContainer.children);

  // Клонируем слайды
  const cloneFirst = originalSlides[0].cloneNode(true);
  const cloneLast = originalSlides[originalSlides.length - 1].cloneNode(true);

  slidesContainer.insertBefore(cloneLast, originalSlides[0]);
  slidesContainer.appendChild(cloneFirst);

  const allSlides = slidesContainer.querySelectorAll('.slide');
  slidesContainer.style.width = `${allSlides.length * 100}%`;
  allSlides.forEach(slide => {
    slide.style.width = `${100 / allSlides.length}%`;
  });

  // Показать первый настоящий слайд
  slidesContainer.style.transform = `translateX(-100%)`;

  document.getElementById('prev').addEventListener('click', () => {
    showSlide(currentSlide - 1);
  });

  document.getElementById('next').addEventListener('click', () => {
    showSlide(currentSlide + 1);
  });
});
