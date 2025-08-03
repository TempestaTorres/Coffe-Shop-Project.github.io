import {Base} from "./base.js";
import {wsliderInit} from "./component.js";
import {accordionInit} from "./component.js";

export class Home extends Base {
    constructor() {
        super();
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
(function () {

    "use strict";

    document.addEventListener("DOMContentLoaded", () => {

        //initLenisScrooling();
        const home = new Home();
        home.Init();
    });

})();