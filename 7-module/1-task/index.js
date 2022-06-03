import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.render();
    this.clickHandler();
  }

  render() {
    this.elem = createElement(`
      <div class="ribbon">
        <button class="ribbon__arrow ribbon__arrow_left">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon"/>
        </button>
        <nav class="ribbon__inner"></nav>
        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon"/>
        </button>
      </div>
    `);

    this.categories.map(item => {
      let category = createElement(`
        <a href="#" class="ribbon__item" data-id="${item.id}">${item.name}</a>
      `);

      this.elem.querySelector('.ribbon__inner').append(category);
    });
  }

  updatePosition() {
    let ribbonInner = this.elem.querySelector('.ribbon__inner');
    let scrollWidth = ribbonInner.scrollWidth;
    let scrollLeft = ribbonInner.scrollLeft;
    let clientWidth = ribbonInner.clientWidth;

    let scrollRight = scrollWidth - scrollLeft - clientWidth;

    if (scrollLeft === 0) {
      this.elem.querySelector('.ribbon__arrow_left').classList.remove('ribbon__arrow_visible');
    } else {
      this.elem.querySelector('.ribbon__arrow_left').classList.add('ribbon__arrow_visible');
    }

    if (scrollRight < 1) {
      this.elem.querySelector('.ribbon__arrow_right').classList.remove('ribbon__arrow_visible');
    } else {
      this.elem.querySelector('.ribbon__arrow_right').classList.add('ribbon__arrow_visible');
    }
  }

  swipeLeft() {
    this.elem.querySelector('.ribbon__inner').scrollBy(-350, 0);
    this.updatePosition();
  }

  swipeRight() {
    this.elem.querySelector('.ribbon__inner').scrollBy(350, 0);
    this.updatePosition();
  }

  clickHandler() {
    this.elem.addEventListener('click', (event) => {
      event.preventDefault();

      if (this.elem.querySelector('.ribbon__item_active')) {
        this.elem.querySelector('.ribbon__item_active').classList.remove('ribbon__item_active');
      }

      event.target.classList.add('ribbon__item_active');

      this.elem.dispatchEvent(new CustomEvent('ribbon-select', {
        detail: event.target.dataset.id,
        bubbles: true
      }));
    });

    this.elem.addEventListener('click', (event) => {
      if (event.target.closest('.ribbon__arrow_left')) {
        this.swipeLeft();
      }

      if (event.target.closest('.ribbon__arrow_right')) {
        this.swipeRight();
      }
    });

    this.elem.querySelector('.ribbon__inner').addEventListener('scroll', () => {
      this.updatePosition();
    });
  }
}
