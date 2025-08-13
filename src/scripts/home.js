
import {wsliderInit} from "./component.js";
import {accordionInit} from "./component.js";
import {observeProducts} from "./products.js";

export class Home {
    constructor() {
        observeProducts();
    }
    Init() {
        wsliderInit(3000, 1000, true, false);
        accordionInit();

        const viewMoreLinks = document.querySelectorAll(".view-more-link");

        if (viewMoreLinks) {

            viewMoreLinks.forEach(viewMoreLink => {
                viewMoreLink.addEventListener("click", (e) => {
                    if (e.currentTarget.ariaLabel !== "go-to-blog-post") {
                        e.preventDefault();
                    }
                });
            });
        }
    }
}