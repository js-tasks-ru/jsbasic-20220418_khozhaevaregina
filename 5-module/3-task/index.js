function initCarousel () {
  let carouselArrowRight = document.querySelector('.carousel__arrow_right');
  let carouselArrowLeft = document.querySelector('.carousel__arrow_left');
  let carouselInner = document.querySelector('.carousel__inner');
  let slidesCount = document.querySelectorAll('.carousel__slide').length;

  let carouselInnerWidth = carouselInner.offsetWidth;
  let slidesIndex = 0;

  setArrow(slidesIndex, carouselArrowRight, carouselArrowLeft, slidesCount);

  carouselArrowRight.addEventListener('click', () => {
    slidesIndex++;
    carouselInner.style.transform = `translateX(-${slidesIndex * carouselInnerWidth}px)`;
    setArrow(slidesIndex, carouselArrowRight, carouselArrowLeft, slidesCount);
  });

  carouselArrowLeft.addEventListener('click', () => {
    slidesIndex--;
    carouselInner.style.transform = `translateX(-${slidesIndex * carouselInnerWidth}px)`;
    setArrow(slidesIndex, carouselArrowRight, carouselArrowLeft, slidesCount);
  });
}

function setArrow (slidesIndex, carouselArrowRight, carouselArrowLeft, slidesCount) {
  if (slidesIndex === 0) {
    carouselArrowLeft.style.display = 'none';
  } else {
    carouselArrowLeft.style.display = '';
  }

  if (slidesIndex >= slidesCount - 1) {
    carouselArrowRight.style.display = 'none';
  } else {
    carouselArrowRight.style.display = '';
  }
}