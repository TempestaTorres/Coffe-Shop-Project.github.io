/*
* https://github.com/darkroomengineering/lenis
* https://www.digidop.com/blog/lenis-smooth-scroll
* */
let lenis = new Lenis({
    lerp: 0.1,
    wheelMultiplier: 0.7,
    gestureOrientation: "vertical",
    normalizeWheel: false,
    smoothTouch: false,
    autoRaf: true,
});

function initLenisScrooling() {
    'use strict';

    /*
    lenis.on('scroll', (e) => {
        console.log(e)
    })

     */
    function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
}

// Function to disable Lenis scroll
const disableLenisScroll = () => {
    if (typeof lenis !== 'undefined') {
        lenis.stop(); // This will stop the Lenis scroll
    }
    document.body.classList.add('overflow-hidden');
};

// Function to enable Lenis scroll
const enableLenisScroll = () => {
    if (typeof lenis !== 'undefined') {
        lenis.start(); // This will start the Lenis scroll
    }
    document.body.classList.remove('overflow-hidden');
};