import {Home} from "../dist/scripts/home.js";
import {Product} from "../dist/scripts/product.js";
import {observeProducts} from "../dist/scripts/products.js";

export class Router {
    constructor() {
        this.routes = [
            {
                route: "#/",
                pageTitle: "Early Birds",
                template: "../templates/index-template.html",
                load: () => {
                    const home = new Home();
                    home.Init();
                    this.#scrollToTop();
                }
            },
            {
                route: "#/shop",
                pageTitle: "Early Birds Shop",
                template: "../templates/shop-template.html",
                load: () => {
                    observeProducts();
                    this.#scrollToTop();
                }
            },
            {
                route: "#/blog",
                pageTitle: "Early Birds Blog",
                template: "../templates/blog-template.html",
                load: () => {
                    this.#scrollToTop();
                }
            },
            {
                route: "#/costa-rica",
                pageTitle: "Costa Rica",
                template: "../templates/costa-rica-template.html",
                load: () => {
                    const product = new Product();
                    product.Init();
                    this.#scrollToTop();
                }
            },
            {
                route: "#/decaf-expresso",
                pageTitle: "Decaf Expresso",
                template: "../templates/decaf-expresso-template.html",
                load: () => {
                    const product = new Product();
                    product.Init();
                    this.#scrollToTop();
                }
            },
            {
                route: "#/french-roast",
                pageTitle: "French Roast",
                template: "../templates/french-roast-template.html",
                load: () => {
                    const product = new Product();
                    product.Init();
                    this.#scrollToTop();
                }
            },
            {
                route: "#/decaf-french-expresso",
                pageTitle: "Decaf French Expresso",
                template: "../templates/decaf-french-expresso-template.html",
                load: () => {
                    const product = new Product();
                    product.Init();
                    this.#scrollToTop();
                }
            },
            {
                route: "#/midnight-mocha",
                pageTitle: "Midnight Mocha",
                template: "../templates/midnight-mocha-template.html",
                load: () => {
                    const product = new Product();
                    product.Init();
                    this.#scrollToTop();
                }
            },
            {
                route: "#/sunrise-blend",
                pageTitle: "Sunrise Blend",
                template: "../templates/sunrise-blend-template.html",
                load: () => {
                    const product = new Product();
                    product.Init();
                    this.#scrollToTop();
                }
            },
            {
                route: "#/alpine-arabica",
                pageTitle: "Alpine Arabica",
                template: "../templates/alpine-arabica-template.html",
                load: () => {
                    const product = new Product();
                    product.Init();
                    this.#scrollToTop();
                }
            },
            {
                route: "#/mystic-mountain",
                pageTitle: "Mystic Mountain",
                template: "../templates/mystic-mountain-brew-template.html",
                load: () => {
                    const product = new Product();
                    product.Init();
                    this.#scrollToTop();
                }
            },
            {
                route: "#/make-sure-your-coffee-is-as-fresh-as-it-can-be",
                pageTitle: "Early Birds Blog Post",
                template: "../templates/make-sure-your-coffee-is-as-fresh-as-it-can-be-template.html",
                load: () => {
                    this.#scrollToTop();
                }
            },
            {
                route: "#/the-best-coffee-advent-calendars-of-this-year",
                pageTitle: "Early Birds Blog Post",
                template: "../templates/the-best-coffee-advent-calendars-of-this-year-template.html",
                load: () => {
                    this.#scrollToTop();
                }
            },
            {
                route: "#/the-most-common-way-people-drink-noir-cafe",
                pageTitle: "Early Birds Blog Post",
                template: "../templates/the-most-common-way-people-drink-noir-cafe-template.html",
                load: () => {
                    this.#scrollToTop();
                }
            },
            {
                route: "#/coffee-beans-prepared-in-four-different-ways",
                pageTitle: "Early Birds Blog Post",
                template: "../templates/coffee-beans-prepared-in-four-different-ways-template.html",
                load: () => {
                    this.#scrollToTop();
                }
            },
            {
                route: "#/the-baristan-kettle-is-a-beacon-for-preparation",
                pageTitle: "Early Birds Blog Post",
                template: "../templates/the-baristan-kettle-is-a-beacon-for-preparation-template.html",
                load: () => {
                    this.#scrollToTop();
                }
            },
            {
                route: "#/the-worlds-best-coffee-tours-brasil",
                pageTitle: "Early Birds Blog Post",
                template: "../templates/the-worlds-best-coffee-tours-brasil-columbia-template.html",
                load: () => {
                    this.#scrollToTop();
                }
            }
        ];
    }
    #scrollToTop() {
        document.querySelector("html").scrollIntoView();
    }
    async routeConnect() {

        const route = this.routes.find(routeItem => {

            return routeItem.route === window.location.hash.split('?')[0];
        });

        if (route) {

            document.querySelector(".page-content-wrapper").innerHTML = await fetch(route.template)
                    .then(response => response.text());

            document.querySelector("#page-title").textContent = route.pageTitle;

            route.load();

        } else {
            location.href = '#/';
        }

    }
}