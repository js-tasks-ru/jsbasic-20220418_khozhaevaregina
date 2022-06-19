export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

