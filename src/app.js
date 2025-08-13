import {Router} from './router.js';
import {openDialog} from "./scripts/dialog.js";
import {componentNavigation} from "./scripts/component.js";

(function () {

    let lenis = new Lenis({
        lerp: 0.1,
        wheelMultiplier: 0.7,
        gestureOrientation: "vertical",
        normalizeWheel: false,
        smoothTouch: false,
        autoRaf: true,
    });
    const newRouter = new Router();

    window.addEventListener('DOMContentLoaded', () => {

        "use strict";

        function raf(time) {
            lenis.raf(time)
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        routerHandler();
        openDialog();
        componentNavigation();
    });

    window.addEventListener('popstate', routerHandler);

    function routerHandler() {

        "use strict";

        newRouter.routeConnect();
    }

})();