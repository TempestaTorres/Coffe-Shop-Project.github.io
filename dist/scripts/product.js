
import {vaccordionInit} from "./component.js";
import {observeProducts} from "./products.js";


export class Product {
    constructor() {
        observeProducts();
    }
    Init() {
        vaccordionInit();
    }
}