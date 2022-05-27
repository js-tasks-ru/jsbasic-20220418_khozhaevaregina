import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.currentIndex = 0;

    this.carouse = createElement(
      `<div class="carousel">
     <div class="carousel__arrow carousel__arrow_right">
       <img src="/assets/images/icons/angle-icon.svg" alt="icon">
     </div>
     <div class="carousel__arrow carousel__arrow_left" style="display: none;" >
       <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
     </div>
   </div>`
    );

    this.carouselInner = createElement(`<div class="carousel__inner"></div>`);

    for (const slide of this.slides) {
      this.carouselInner.insertAdjacentHTML('beforeEnd',
        `
        <div class="carousel__slide" data-id="${slide.id}">
            <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
            <div class="carousel__caption">
              <span class="carousel__price">€${slide.price.toFixed(2)}</span>
              <div class="carousel__title">${slide.name}</div>
              <button type="button" class="carousel__button">
                <img src="/assets/images/icons/plus-icon.svg" alt="icon">
              </button>
            </div>
          </div>
        `
      );
    }

    this.carouse.insertAdjacentElement('beforeEnd', this.carouselInner);

    this.carouse.addEventListener('click', (event) => {
      if (event.target.closest('.carousel__arrow_right')) {
        this.currentIndex++;
        this.setArrow();
      }

      if (event.target.closest('.carousel__arrow_left')) {
        this.currentIndex--;
        this.setArrow();
      }
    });

    this.carouse.addEventListener('click', (event) => {
      const carouselButton = event.target.closest('.carousel__button');

      if (carouselButton) {
        const productAddEventCarousel = new CustomEvent('product-add', {
          detail: event.target.closest('.carousel__slide').dataset.id,
          bubbles: true,
        });
        carouselButton.dispatchEvent(productAddEventCarousel);
      }
    });

  }

  get elem() {
    return this.carouse;
  }

  setArrow() {
    this.carouseArrowRight = document.querySelector('.carousel__arrow_right');
    this.carouseArrowLeft = document.querySelector('.carousel__arrow_left');

    this.offset = -this.carouselInner.offsetWidth * this.currentIndex;

    this.carouselInner.style.transform = `translateX(${this.offset}px)`;
    if (this.currentIndex === this.slides.length - 1) {
      this.carouseArrowRight.style.display = 'none';
    } else {
      this.carouseArrowRight.style.display = '';
    }

    if (this.currentIndex === 0) {
      this.carouseArrowLeft.style.display = 'none';
    } else {
      this.carouseArrowLeft.style.display = '';
    }
  }
}
