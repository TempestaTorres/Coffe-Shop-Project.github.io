document.addEventListener("DOMContentLoaded", () => {

    "use strict";

    //initLenisScrooling();
    openDialog();
    componentNavigation();
    observeProducts();

    const viewMoreLinks = document.querySelectorAll(".view-more-link");

    viewMoreLinks.forEach(viewMoreLink => {

        viewMoreLink.addEventListener("click", (e) => {
            e.preventDefault();

        });
    });
});