// ==UserScript==
// @name           No more red backgrounds
// @description    Some corporate filtering software has the tendency to send a bright red "Forbidden" page when it blocks a site.  This script changes that background to white.
// @namespace      *
// ==/UserScript==

(function () {
    if (window.getComputedStyle(document.body, null).getPropertyValue("background-color") == "rgb(255, 0, 0)" ) {
        document.body.setAttribute("style", "background-color: #FFFFFF;");
   
    }
})();