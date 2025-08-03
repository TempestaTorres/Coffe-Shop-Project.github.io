import {openDialog} from "./dialog.js";
import {componentNavigation} from "./component.js";
import {observeProducts} from "./products.js";

export class Base {
    constructor() {
        openDialog();
        componentNavigation();
        observeProducts();
    }
}