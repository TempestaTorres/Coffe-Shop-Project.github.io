import {Base} from "./base.js";
import {vaccordionInit} from "./component.js";


export class Product extends Base {
    constructor() {
        super();
    }
    Init() {
        vaccordionInit();
    }
}

(function () {

    "use strict";

    document.addEventListener("DOMContentLoaded", () => {

        //initLenisScrooling();
        const product = new Product();
        product.Init();
    });

})();