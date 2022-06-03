import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.segments = steps - 1;

    this.render();
    this.clickHandler();
    this.setValue(value);
  }

  render() {
    this.elem = createElement(`
      <div class="slider">
        <div class="slider__thumb"">
          <span class="slider__value"></span>
        </div>
        <div class="slider__progress"></div>
        <div class="slider__steps">
          ${'<span></span>'.repeat(this.steps)}
        </div>
      </div>
    `);
  }

  setValue(value) {
    this.value = value;
    let valuePercents = value / this.segments * 100;

    this.getElem('.slider__value').innerHTML = value;
    
    this.getElem('.slider__thumb').style.left = `${valuePercents}%`;
    this.getElem('.slider__progress').style.width = `${valuePercents}%`;

    if (this.getElem('.slider__step-active')) {
      this.getElem('.slider__step-active').classList.remove('slider__step-active');
    }

    this.getElem('.slider__steps').children[this.value].classList.add('slider__step-active');
  }

  clickHandler() {
    this.elem.onclick = this.onClick;

    this.getElem('.slider__thumb').ondragstart = () => false;
    this.getElem('.slider__thumb').onpointerdown = this.onPointerDown;
  }

  onClick = event => {
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;
    let approximateValue = leftRelative * this.segments;
    let value = Math.round(approximateValue);

    this.setValue(value);

    this.elem.dispatchEvent(
      new CustomEvent('slider-change', {
        detail: this.value,
        bubbles: true
      })
    );

  }

  onPointerDown = event => {
    event.preventDefault();

    this.elem.classList.add('slider_dragging');

    document.addEventListener('pointermove', this.onPointerMove);
    document.addEventListener('pointerup', this.onPointerUp);
  }

  onPointerMove = event => {
    event.preventDefault();

    let newLeft = this.calcLeftByEvent(event);

    this.getElem('.slider__thumb').style.left = `${newLeft * 100}%`;
    this.getElem('.slider__progress').style.width = `${newLeft * 100}%`;

    this.value = Math.round(this.segments * newLeft);
    this.getElem('.slider__value').innerHTML = this.value;

    if (this.getElem('.slider__step-active')) {
      this.getElem('.slider__step-active').classList.remove('slider__step-active');
    }

    this.getElem('.slider__steps').children[this.value].classList.add('slider__step-active');
  };

  calcLeftByEvent(event) {
    let newLeft = (event.clientX - this.elem.getBoundingClientRect().left) / this.elem.offsetWidth;

    if (newLeft < 0) { newLeft = 0; }
    if (newLeft > 1) { newLeft = 1; }

    return newLeft;
  }

  onPointerUp = () => {
    document.removeEventListener('pointermove', this.onPointerMove);
    document.removeEventListener('pointerup', this.onPointerUp);

    this.elem.classList.remove('slider_dragging');

    this.getElem('.slider__thumb').style.left = `${(this.value / this.segments) * 100}%`;
    this.getElem('.slider__progress').style.width = `${(this.value / this.segments) * 100}%`;

    this.elem.dispatchEvent(
      new CustomEvent('slider-change', {
        detail: this.value,
        bubbles: true
      })
    );
  };

  getElem(ref) {
    return this.elem.querySelector(ref);
  }
}
