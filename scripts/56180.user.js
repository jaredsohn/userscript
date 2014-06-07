// ==UserScript==
// @name           YouTube Auto Scroll To Video
// @namespace      http://userscripts.org/users/23652
// @description    Automatically scrolls to the vido on load
// @include        http://*.youtube.com/watch?*v=*
// @copyright      JoeSimmons
// @version        1.0.1
// @license        Creative Commons Attribution-Noncommercial 3.0 United States License
// @downloadURL    http://userscripts.org/scripts/source/56180.user.js
// @updateURL      http://userscripts.org/scripts/source/56180.meta.js
// ==/UserScript==

+function () {

    function scrollToElement(theElement) {
        var posY = 0;
        theElement = document.getElementById(theElement);

        while (theElement != null) {
            posY += theElement.offsetTop;
            theElement = theElement.offsetParent;
        }

        window.scrollTo(0, posY);
    }

    scrollToElement('player-api');

}();