import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};

    this.render();
    this.populateProductList(this.products);
  }

  render() {
    this.elem = createElement(`
      <div class="products-grid">
        <div class="products-grid__inner">
        </div>
      </div>
    `);
  }

  populateProductList(products) {
    this.elem.querySelector('.products-grid__inner').innerHTML = '';

    for (const product of products) {
      let productCard = new ProductCard(product);

      this.elem.querySelector('.products-grid__inner').append(productCard.elem);
    }
  }

  updateFilter(filters) {
    this.filters = Object.assign(this.filters, filters);
    let filteredArray = this.products;

    for (let prop in this.filters) {
      let valueFilter = this.filters[prop];

      if (prop === 'noNuts') {
        filteredArray = filteredArray.filter(product => product.nuts !== valueFilter);
      }
      if (prop === 'vegeterianOnly') {
        filteredArray = filteredArray.filter(product => product.vegeterian === valueFilter);
      }
      if (prop === 'maxSpiciness') {
        filteredArray = filteredArray.filter(product => product.spiciness <= valueFilter);
      }
      if (prop === 'category') {
        filteredArray = filteredArray.filter(product => product.category === valueFilter);
      }
    }

    this.populateProductList(filteredArray);
  } 
}
