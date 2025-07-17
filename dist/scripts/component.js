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
// W-Slider

function wsliderInit(delay, duration, loop, bButtons) {

    "use strict";

    const wSlider = document.querySelectorAll('.w-slider');

    if (wSlider.length > 0) {

        for (let i = 0; i < wSlider.length; i++) {

            _wsInit.call(wSlider[i], delay, duration, loop, bButtons);
        }
    }
}
function _wsInit(delay, duration, loop, bButtons) {

    "use strict";

    const frame = this.firstElementChild;
    let frameWidth = frame.getBoundingClientRect().width;
    let width = frameWidth.toFixed(2);
    let w = parseFloat(width);

    this.dataset.frameWidth = `${w}`;
    this.dataset.delay = `${delay}`;
    this.dataset.duration = `${duration}`;
    this.dataset.autoPlay = `${loop}`;

    let totalFrames = frame.children.length;

    _wsSlideShow.call(frame.children[0], 1);

    frame.children[0].style.transition = `all ${duration}ms ease`;

    for (let i = 1; i < totalFrames; i++) {

        let slide = frame.children[i];

        _wsSlideHide.call(slide, i + 1);

        slide.style.transition = `all ${duration}ms ease`;

    }

    const wsNav = this.querySelector('.w-slider-nav');

    // Nav init
    if (wsNav) {

        for (let i = 0; i < totalFrames; i++) {

            let dot = document.createElement('div');
            dot.classList.add('w-slider-dot');

            if (i === 0) {
                dot.classList.add('w-active');
            }
            dot.dataset.nodeIndex = `${i + 1}`;
            dot.dataset.nodeType = `nav-button`;

            wsNav.appendChild(dot);
        }
        /*
                wsNav.children[0].classList.add('w-active');

                for (let i = 0; i < wsNav.children.length; i++) {

                    wsNav.children[i].dataset.nodeIndex = `${i + 1}`;
                    wsNav.children[i].dataset.nodeType = `nav-button`;
                }
        */
        wsNav.addEventListener('click', _wsNavClick);
    }

    if (bButtons) {

        const buttons = document.createElement('div');
        buttons.classList.add('w-slider-buttons');

        const prevButton = document.createElement('div');
        prevButton.classList.add('w-slide-button', 'w-prev-button');

        const firstChildPrev = document.createElement('div');
        const lastChildPrev = document.createElement('div');

        prevButton.appendChild(firstChildPrev);
        prevButton.appendChild(lastChildPrev);

        prevButton.role = 'button';
        prevButton.dataset.nodeIndex = '1';
        prevButton.dataset.nodeType = 'prev-button';
        prevButton.addEventListener('click', _wsButtonClick);


        const nextButton = document.createElement('div');
        nextButton.classList.add('w-slide-button', 'w-next-button');

        const firstChildNext = document.createElement('div');
        const lastChildNext = document.createElement('div');

        nextButton.appendChild(firstChildNext);
        nextButton.appendChild(lastChildNext);

        nextButton.role = 'button';
        nextButton.dataset.nodeIndex = '1';
        nextButton.dataset.nodeType = 'next-button';
        nextButton.addEventListener('click', _wsButtonClick);

        buttons.appendChild(prevButton);
        buttons.appendChild(nextButton);

        this.appendChild(buttons);
    }

    if (loop) {
        this.dataset.activeState = 'false';
        _wsAutoPlay.call(this);

        this.addEventListener("mousemove", _wsAutoplayStop);
        this.addEventListener("mouseout", _wsAutoplayStart);
    }

}
function _wsButtonClick(e) {

    "use strict";

    let index = parseInt(e.target.dataset.nodeIndex);
    let numberOfButtons = e.target.parentElement.parentElement.firstElementChild.children.length;

    if (e.target.dataset.nodeType === 'next-button') {

        ++index;

        if (index > numberOfButtons) {
            index = 1;
        }
        e.target.dataset.nodeIndex = `${index}`;
        e.target.parentElement.firstElementChild.dataset.nodeIndex = `${index}`;

        let sliderFrame = e.target.parentElement.parentElement.firstElementChild;

        _wsShiftSlide.call(sliderFrame, index);

        let nav = e.target.parentElement.parentElement.querySelector('.w-slider-nav');

        if (nav) {

            let target = nav.children[index - 1];

            _wsToggleButton.call(target);
        }
    }
    else if (e.target.dataset.nodeType === 'prev-button') {
        --index;
        if (index === 0) {
            index = numberOfButtons;
        }
        e.target.dataset.nodeIndex = `${index}`;
        e.target.parentElement.lastElementChild.dataset.nodeIndex = `${index}`;

        let sliderFrame = e.target.parentElement.parentElement.firstElementChild;

        _wsShiftSlide.call(sliderFrame, index);

        let nav = e.target.parentElement.parentElement.querySelector('.w-slider-nav');

        if (nav) {

            let target = nav.children[index - 1];

            _wsToggleButton.call(target);
        }
    }

}
function _wsSlideShow(position) {
    "use strict";

    let frameWidth = this.parentElement.parentElement.dataset.frameWidth;
    let width = parseFloat(frameWidth);
    let offsetX = width * (position - 1);

    this.dataset.slideType = `${position} of ${this.parentElement.children.length}`;
    this.dataset.ariaLabel = `visible`;
    this.style.opacity = '1';
    this.style.visibility = 'visible';
    this.style.zIndex = '1100';
    this.style.transform = `translateX(-${offsetX}px)`;
}
function _wsSlideHide(position) {
    "use strict";

    this.dataset.slideType = `${position} of ${this.parentElement.children.length}`;
    this.dataset.ariaLabel = `hidden`;
    this.style.opacity = '0';
    this.style.visibility = 'hidden';
    this.style.zIndex = '1000';
    this.style.transform = "translateX(0)";
}
function _wsNavClick(e) {

    if (e.target.dataset.nodeType === `nav-button` && !e.target.classList.contains('w-active')) {

        _wsToggleButton.call(e.target);

        let index = parseInt(e.target.dataset.nodeIndex);

        let sliderFrame = e.target.parentElement.parentElement.firstElementChild;

        _wsShiftSlide.call(sliderFrame, index);

    }
}
function _wsAutoplayStop(e) {
    "use strict";

    e.currentTarget.dataset.activeState = "true";
}
function _wsAutoplayStart(e) {
    "use strict";

    e.currentTarget.dataset.activeState = "false";
}

function _wsToggleButton() {

    let l = this.parentElement.children.length;

    for (let i = 0; i < l; i++) {

        let button = this.parentElement.children[i];

        button.classList.remove('w-active');
    }
    this.classList.add('w-active');
}
function _wsShiftSlide(slidePosition) {

    _wsHideAllSlides.call(this);

    _wsSlideShow.call(this.children[slidePosition - 1], slidePosition);

}
function _wsHideAllSlides() {

    let l = this.children.length;
    for (let i = 0; i < l; i++) {

        let slide = this.children[i];

        _wsSlideHide.call(slide, i + 1);
    }
}
function _wsAutoPlay() {

    "use strict";

    let slider = this;
    let delay = parseInt(slider.dataset.delay);
    let sliderFrame = this.firstElementChild;
    let numberOfButtons = this.firstElementChild.children.length;
    let nav = this.querySelector('.w-slider-nav');
    let buttons = this.querySelector('.w-slider-buttons');
    let currentIndex = 1;

    setInterval( () => {

        if (slider.dataset.activeState === "false") {

            if (nav) {
                for (let i = 0; i < numberOfButtons; i++) {

                    if (nav.children[i].classList.contains('w-active')) {

                        let nextIndex = i + 1;

                        if (nextIndex === numberOfButtons) {
                            nextIndex = 0;
                        }

                        let target = nav.children[nextIndex];

                        _wsToggleButton.call(target);

                        let index = parseInt(target.dataset.nodeIndex);

                        _wsShiftSlide.call(sliderFrame, index);

                        if (buttons) {
                            buttons.children[0].dataset.nodeIndex = `${index}`;
                            buttons.children[1].dataset.nodeIndex = `${index}`;
                        }

                        break;
                    }
                }
            }
            else {

                ++currentIndex;

                if (currentIndex > numberOfButtons) {
                    currentIndex = 1;
                }

                _wsShiftSlide.call(sliderFrame, currentIndex);

                if (buttons) {
                    buttons.children[0].nodeIndex = `${currentIndex}`;
                    buttons.children[1].nodeIndex = `${currentIndex}`;
                }
            }
        }

    }, delay);
}