function openDialog() {

    'use strict';

    const cartOpenButton = document.querySelector(".cart-open-button");
    const dialogCloseButton = document.querySelector(".dialog-close-button");
    const dialog = document.querySelector(".cart-dialog-wrapper");

    dialog.style.display = "none";

    function toggleCart(e) {

        e.preventDefault();

        dialog.style.display = "";

        setTimeout(() => {
            dialog.classList.toggle("pop-up");
        }, 300);

        e.stopPropagation();
    }

    function closeCart(e) {
        e.preventDefault();
        dialog.classList.toggle("pop-up");

        setTimeout(() => {
            dialog.style.display = "none";
        }, 300);

        e.stopPropagation();
    }

    cartOpenButton.addEventListener("click", toggleCart);
    dialogCloseButton.addEventListener("click", closeCart);
}