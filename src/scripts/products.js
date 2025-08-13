import {addProductEvent} from "./dialog.js";

export function observeProducts() {
    'use strict';

    const addToCartForms = document.querySelectorAll('.add-to-cart-form');
    const addToCartProductForm = document.querySelector('.add-to-cart-standard-form');

    if (addToCartForms && addToCartForms.length > 0) {

        addToCartForms.forEach(form => {
            form.addEventListener('submit', formAction);
        });
    }
    if (addToCartProductForm && addToCartProductForm.length > 0) {

        addToCartProductForm.addEventListener('submit', formProductAction);
    }
}
function formProductAction(e) {
    "use strict";
    e.preventDefault();

    if (this.dataset.nodeType === "add-to-cart-form") {

        let oldText = this.lastElementChild.textContent;
        this.lastElementChild.textContent = this.lastElementChild.dataset.loadingText;

        setTimeout(() => {

            this.lastElementChild.textContent = oldText;
            productFormAddToCart();

        },1000);
    }
}
function formAction(e) {
    'use strict';
    e.preventDefault();

    if (this.dataset.nodeType === "add-to-cart-form") {

        let oldText = this.firstElementChild.textContent;
        this.firstElementChild.textContent = this.firstElementChild.dataset.loadingText;

        setTimeout(() => {

            this.firstElementChild.textContent = oldText;
            productAddToCart(this.parentElement.nextElementSibling);

        },1000);
    }
}
function productFormAddToCart() {
    "use strict";

    let product = {
        name: '',
        price: '',
        imgUrl: '',
        count: '',
    };

    const productWrapper = document.querySelector('.product-details-name-wrapper');

    product.name = productWrapper.firstElementChild.textContent;
    product.price = productWrapper.lastElementChild.textContent;
    product.imgUrl = document.querySelector('.product-details-image').src;
    product.count = document.querySelector('#product-quantity').value;

    const cart = document.querySelector('#commerce-cart');

    const event = new addProductEvent(product);
    cart.dispatchEvent(event);
}

function productAddToCart(productWrapper) {
    'use strict';

    let product = {
        name: '',
        price: '',
        imgUrl: '',
        count: '1',
    };

    product.name = productWrapper.lastElementChild.firstElementChild.textContent;
    product.price = productWrapper.lastElementChild.lastElementChild.textContent;
    product.imgUrl = productWrapper.firstElementChild.firstElementChild.src;

    const cart = document.querySelector('#commerce-cart');

    const event = new addProductEvent(product);
    cart.dispatchEvent(event);
}