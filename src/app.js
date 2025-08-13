import {Router} from './router.js';
import {openDialog} from "../dist/scripts/dialog.js";
import {componentNavigation} from "../dist/scripts/component.js";

(function () {

    const newRouter = new Router();

    window.addEventListener('DOMContentLoaded', () => {

        "use strict";
        //initLenisScrolling();
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