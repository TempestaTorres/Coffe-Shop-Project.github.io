class addProductEvent extends Event {
    #product;

    constructor(item) {
        super("addProduct");
        this.#product = item;
    }

    get getProduct() {
        return this.#product;
    }
}


function openDialog() {

    'use strict';

    const cart = document.querySelector('#commerce-cart');
    const cartOpenButton = document.querySelector(".cart-open-button");
    const dialogCloseButton = document.querySelector(".dialog-close-button");
    const dialog = document.querySelector(".cart-dialog-wrapper");

    dialog.style.display = "none";

    function toggleCart(e) {

        e.preventDefault();

        dialog.style.display = "";
        //disableLenisScroll();

        setTimeout(() => {
            dialog.classList.toggle("pop-up");
        }, 300);

        e.stopPropagation();
    }

    function closeCart(e) {

        e.preventDefault();
        dialog.classList.toggle("pop-up");
        //enableLenisScroll();

        setTimeout(() => {
            dialog.style.display = "none";
        }, 300);

        e.stopPropagation();
    }

    function saveProduct(product) {

        let products = getFromLocalStorage('productItems');

        products.push(product);
        addToLocalStorage('productItems', products);
    }

    function checkCart() {

        let products = getFromLocalStorage('productItems');

        if (products && products.length > 0) {

            for (let i = 0; i < products.length; i++) {
                let product = products[i];

                addProduct(product);
            }
        }
    }

    function removeFromStorage(name) {

        let products = getFromLocalStorage('productItems');

        const result = products.filter((item) => {

            return item.name !== name;
        });

        localStorage.removeItem('productItems');

        if (result.length > 0) {
            addToLocalStorage('productItems', result);
        }
    }

    function productListOnClick(e) {

        if (e.target.parentElement.className === 'cart-remove-button') {

            e.preventDefault();

            removeProductItem(e.target.parentElement);

            e.stopPropagation();
        }
    }

    function removeProductItem(removeButtonEl) {

        let parentList = removeButtonEl.parentElement.parentElement;
        let itemName = getItemName(removeButtonEl.parentElement);

        console.log(itemName);

        removeButtonEl.parentElement.remove();
        removeFromStorage(itemName);

        if (parentList.children.length === 0) {

            parentList.parentElement.dataset.nodeType = "cart-form-empty";
            document.querySelector('.cart-state-empty').style.display = "flex";
        }
        else {
            updateTotalSum(parentList);
        }
        updateCart(parentList);
    }

    function productCheckout(e) {
        e.preventDefault();

        console.log('checkout...');
    }

    function addProduct(product) {

        const commerceForm = document.querySelector('.product-form');
        const productList = commerceForm.querySelector('.cart-item-list');

        if (commerceForm.dataset.nodeType === "cart-form-empty") {

            commerceForm.dataset.nodeType = "cart-form-full";
            document.querySelector('.cart-state-empty').style.display = "none";
            productList.addEventListener('click', productListOnClick);
            document.querySelector('.checkout-button').addEventListener('click', productCheckout);
        }

        let cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        let img = document.createElement('img');
        img.classList.add('cart-img');
        img.src = product.imgUrl;

        let cartImg = document.createElement('div');
        cartImg.classList.add('cart-img');

        cartImg.appendChild(img);

        cartItem.appendChild(cartImg);
        // Details
        let cartItemInfo = document.createElement('div');
        cartItemInfo.classList.add('cart-item-info');

        let textInfo = document.createElement('div');
        textInfo.classList.add('cart-item-text-wrapper');

        let cartName = document.createElement('div');
        cartName.classList.add('cart-item-name');
        cartName.textContent = product.name;

        textInfo.appendChild(cartName);

        let cartPrice = document.createElement('div');
        cartPrice.classList.add('text-size-small');
        cartPrice.textContent = product.price;

        textInfo.appendChild(cartPrice);

        cartItemInfo.appendChild(textInfo);

        // Input
        let input = document.createElement('input');
        input.classList.add('cart-quantity');
        input.type = 'number';
        input.required = true;
        input.inputMode = 'numeric';
        input.pattern = "^[0-9]+$";
        input.name = "quantity";
        input.autocomplete = "off";
        input.id = "quantity";
        input.value = `${product.count}`;

        cartItemInfo.appendChild(input);

        cartItem.appendChild(cartItemInfo);

        //Remove
        let buttonRemove = document.createElement('a');
        buttonRemove.classList.add('cart-remove-button');
        buttonRemove.href = "#";
        buttonRemove.role = "button";

        let closeImg = document.createElement('img');
        closeImg.src = "./dist/assets/img/icons-close.svg";
        closeImg.alt = "";
        closeImg.loading = "lazy";

        buttonRemove.appendChild(closeImg);

        cartItem.appendChild(buttonRemove);

        // Add product to list
        productList.append(cartItem);

        updateTotalSum(productList);
        updateCart(productList);
    }

    function updateCart(productList) {

        const cart = document.querySelector('.cart-open-button');
        const count = cart.querySelector('.cart-items-count');

        let itemsCount = productList.children.length;

        cart.ariaLabel = `Open cart containing ${itemsCount} items`;
        count.textContent = `${itemsCount}`;

    }
    function updateTotalSum(productList) {

        let subtotal = productList.nextElementSibling.firstElementChild.lastElementChild;
        let totalSum = 0;

        for (let i = 0; i < productList.children.length; i++) {

            let item = productList.children[i];

            totalSum += getItemPrice(item);
        }

        subtotal.textContent = `$ ${totalSum} USD`;
    }

    function getItemPrice(item) {

        let info = item.children[1];
        let textWrapper = info.children[0];
        let price = textWrapper.children[1];
        let priceText = price.textContent;

        let numbers = priceText.match(/\d+\.\d+/g);
        return parseFloat(numbers[0]);
    }

    function getItemName(item) {

        let info = item.children[1];
        let textWrapper = info.children[0];
        let name = textWrapper.children[0];

        return name.textContent;
    }

    function addProductToCart(e) {

        let product = e.getProduct;

        saveProduct(product);
        addProduct(product);

        cartOpenButton.dispatchEvent(new Event("click"));
    }

    cartOpenButton.addEventListener("click", toggleCart);
    dialogCloseButton.addEventListener("click", closeCart);
    cart.addEventListener("addProduct", addProductToCart);
    checkCart();
}