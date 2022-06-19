import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (!product) return;

    let currentCartItem = this.cartItems.find(cart => {
      return cart.product.id === product.id;
    });

    if (currentCartItem) {
      currentCartItem.count++;
      this.onProductUpdate(currentCartItem);
    } else {
      let newCartItem = {
        product: product,
        count: 1,
      };

      this.cartItems.push(newCartItem);
      this.onProductUpdate(newCartItem);
    }
  }

  updateProductCount(productId, amount) {
    let currentCartItem = this.cartItems.find(cart => cart.product.id === productId);

    currentCartItem.count += amount;

    this.cartItems = this.cartItems.filter(cart => cart.count !== 0);
    
    this.onProductUpdate(currentCartItem);
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    return this.cartItems.reduce((count, cartItem) => {
      return count + cartItem.count;
    }, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce((price, cartItem) => {
      return price + cartItem.product.price * cartItem.count;
    }, 0);
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal = new Modal();
    this.modal.setTitle('Your order');

    this.modal.setBody(createElement(`
      <div>
        ${this.cartItems.map((item) => {
          return this.renderProduct(item.product, item.count).outerHTML;
        }).join('')}
        ${this.renderOrderForm().outerHTML}
      </div>
    `));

    this.modal.open();

    this.modal.elem.querySelector('.cart-form').onsubmit = this.onSubmit.bind(this);
    this.modal.elem.querySelectorAll('.cart-counter__button_minus').forEach(btn => {
      btn.addEventListener('click', (event) => {
        let productId = event.currentTarget.closest('[data-product-id]').dataset.productId;
        this.updateProductCount(productId, -1);
      });
    });

    this.modal.elem.querySelectorAll('.cart-counter__button_plus').forEach(btn => {
      btn.addEventListener('click', (event) => {
        let productId = event.currentTarget.closest('[data-product-id]').dataset.productId;
        this.updateProductCount(productId, 1);
      });
    });
  }

  onProductUpdate(cartItem) {
    if (document.body.classList.contains('is-modal-open')) {
      let modalBody = document.querySelector('.modal');
      let elem = modalBody.querySelector(`[data-product-id='${cartItem.product.id}']`);

      if (cartItem.count === 0) {
        elem.parentNode.removeChild(elem);
      } else {
        let productCount = modalBody.querySelector(`[data-product-id="${cartItem.product.id}"] .cart-counter__count`);

        productCount.innerText = cartItem.count;
        
        let productPrice = modalBody.querySelector(`[data-product-id="${cartItem.product.id}"] .cart-product__price`);
        productPrice.innerText = '€' + (cartItem.product.price * cartItem.count).toFixed(2);
      }

      let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);
      infoPrice.innerHTML = '€' + this.getTotalPrice().toFixed(2);
    }

    this.cartIcon.update(this);

     if (this.cartItems.length === 0) {
       this.modal.close();
       return;
     }
  }

  onSubmit(event) {
    event.preventDefault();

    let cartForm = document.querySelector('.cart-form');
    let cartFormData = new FormData(cartForm);

    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: cartFormData
    }).then(() => {
      this.modal.setTitle('Success!');
      this.cartItems = [];
      this.cartIcon.update(this);
      this.modal.setBody(createElement(`
        <div class="modal__body-inner">
          <p>
            Order successful! Your order is being cooked :) <br>
            We’ll notify you about delivery time shortly.<br>
            <img src="/assets/images/delivery.gif">
          </p>
        </div>
      `));
    });
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

