document.addEventListener("DOMContentLoaded", () => {

    "use strict";

    initLenisScrooling();
    openDialog();
    componentNavigation();
    observeProducts();
    wsliderInit(4000, 1000, true, false);
    accordionInit();

    const viewMoreLinks = document.querySelectorAll(".view-more-link");

    viewMoreLinks.forEach(viewMoreLink => {

        viewMoreLink.addEventListener("click", (e) => {
            e.preventDefault();

        });
    });
});