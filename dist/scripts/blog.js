document.addEventListener("DOMContentLoaded", () => {

    "use strict";

    //initLenisScrooling();
    openDialog();
    componentNavigation();
    observeProducts();

    const viewMoreLinks = document.querySelectorAll(".view-more-link");

    viewMoreLinks.forEach(viewMoreLink => {

        viewMoreLink.addEventListener("click", (e) => {

            if (e.currentTarget.ariaLabel !== "go-to-blog-post") {
                e.preventDefault();
            }
        });
    });
});