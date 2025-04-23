// ===== Слайдер =====
document.addEventListener('DOMContentLoaded', () => {
  const slidesContainer = document.getElementById('sliderSlides');
  const slideImages = slidesContainer.querySelectorAll('img');
  const slideCount = slideImages.length;
  let currentSlide = 1;

  // Клонируем первый и последний слайды
  const firstClone = slideImages[0].cloneNode();
  const lastClone = slideImages[slideCount - 1].cloneNode();

  slidesContainer.appendChild(firstClone);
  slidesContainer.insertBefore(lastClone, slideImages[0]);

  const slides = slidesContainer.querySelectorAll('img');
  const slideWidth = slides[0].clientWidth;

  slidesContainer.style.transform = `translateX(-${slideWidth * currentSlide}px)`;

  let transitioning = false;

  function moveToSlide(index) {
  if (transitioning) return;
  transitioning = true;

  const slideWidth = slides[0].clientWidth; // ← пересчёт ширины каждый раз
  slidesContainer.style.transition = 'transform 0.5s ease-in-out';
  slidesContainer.style.transform = `translateX(-${slideWidth * index}px)`;
  currentSlide = index;

  slidesContainer.addEventListener('transitionend', handleTransitionEnd);
}


  function handleTransitionEnd() {
    slidesContainer.removeEventListener('transitionend', handleTransitionEnd);
    if (currentSlide === 0) {
      slidesContainer.style.transition = 'none';
      currentSlide = slideCount;
      slidesContainer.style.transform = `translateX(-${slideWidth * currentSlide}px)`;
    }
    if (currentSlide === slideCount + 1) {
      slidesContainer.style.transition = 'none';
      currentSlide = 1;
      slidesContainer.style.transform = `translateX(-${slideWidth * currentSlide}px)`;
    }
    transitioning = false;
  }

  document.getElementById('next').addEventListener('click', () => {
    moveToSlide(currentSlide + 1);
  });

  document.getElementById('prev').addEventListener('click', () => {
    moveToSlide(currentSlide - 1);
  });
});
