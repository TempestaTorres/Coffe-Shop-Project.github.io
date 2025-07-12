// Parallax

function parallax() {

    "use strict";

    const parallaxes = document.querySelectorAll('.parallax');

    if (parallaxes.length > 0) {

        parallaxesInit.call(parallaxes);
        const _handleScroll = handleScroll.bind(parallaxes);
        window.addEventListener('scroll', _handleScroll);
        window.addEventListener('resize', handleWindowResize);
    }
}
function parallaxesInit() {

    'use strict';

    this.forEach(parallax => {

        parallax.firstElementChild.style.opacity = '1';
        parallax.firstElementChild.addEventListener("load", handleImageLoad.call(parallax));
    });
}
function handleScroll() {
    "use strict";

    for (let i = 0; i < this.length; i++) {
        let parallax = this[i];
        updateParallax.call(parallax);
    }
}
function handleWindowResize() {
    "use strict";
    if (window.innerWidth < 800) {
        window.removeEventListener('resize', handleWindowResize);
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('load', handleImageLoad);
    }
}
function handleImageLoad() {

    'use strict';

    updateParallax.call(this);
}
function updateParallax() {

    "use strict";

    let parallaxContainerHeight = this.getBoundingClientRect().height > 0 ? this.parentNode.offsetHeight : 500;
    let imgHeight = this.firstElementChild.offsetHeight;
    let parallaxDist = imgHeight - parallaxContainerHeight;
    let top = getTopOffset.call(this);
    let bottom = top + parallaxContainerHeight;
    let scrollTop = document.documentElement.scrollTop;
    let windowHeight = window.innerHeight;
    let windowBottom = scrollTop + windowHeight;
    let percentScrolled = (windowBottom - top) / (parallaxContainerHeight + windowHeight);
    let parallax = parallaxDist * percentScrolled;

    if (bottom > scrollTop && top < scrollTop + windowHeight) {

        this.firstElementChild.style.transform = "translate3D(0, " + parallax + "px, 0)";
    }
}
function getTopOffset() {
    "use strict";

    let rect = this.getBoundingClientRect();
    return rect.top + window.pageYOffset - document.documentElement.clientTop;
}
// Navigation
function componentNavigation() {
    "use strict";

    const navOpenContainer = document.querySelector('.nav-mobile-open-container');
    const navCloseContainer = document.querySelector('.nav-menu-close-wrapper');
    const navMobileMenu = document.querySelector('.nav-mobile-menu');

    function navTrigger(e) {

        e.preventDefault();
        navMobileMenu.classList.toggle('is-active');
        e.stopPropagation();
    }

    navOpenContainer.addEventListener('click', navTrigger);
    navCloseContainer.addEventListener('click', navTrigger);
}