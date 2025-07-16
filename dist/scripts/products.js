function observeProducts() {
    'use strict';

    const addToCartForms = document.querySelectorAll('.add-to-cart-form');

    addToCartForms.forEach(form => {
        form.addEventListener('submit', formAction);
        form.lastElementChild.addEventListener('click', productInfoClick);
    })

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
function productAddToCart(productWrapper) {
    'use strict';

    let product = {
        name: '',
        price: '',
        imgUrl: '',
        count: 1,
    };

    product.name = productWrapper.lastElementChild.firstElementChild.textContent;
    product.price = productWrapper.lastElementChild.lastElementChild.textContent;
    product.imgUrl = productWrapper.firstElementChild.firstElementChild.src;

    const cart = document.querySelector('#commerce-cart');

    const event = new addProductEvent(product);
    cart.dispatchEvent(event);
}
function productInfoClick(e) {
    'use strict';
    e.preventDefault();

    console.log('product info link click');
}