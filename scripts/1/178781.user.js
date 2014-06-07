// ==UserScript==
// @name        Highlight google ads
// @namespace   www.google.co.uk/showads
// @description Increases the contrast of the box around Google ads in the top/centre region of Google search results
// @include        http://www.google.*
// @include        https://www.google.*
// @include        https://encrypted.google.*
// @version     0.1
// @grant       none
// ==/UserScript==


(function() {

    function patch() {
        document.getElementById("tads").style.backgroundColor="#fe7fe7";

    }
    patch();
    setInterval(patch, 400);
})();
;