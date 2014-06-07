// ==UserScript==
// @name           Aol Reader Middle Click Fixer for Firefox
// @author         e9
// @description    Middle click to open in background tab for Firefox.
// @homepage       https://userscripts.org/scripts/show/172634
// @updateURL      https://userscripts.org/scripts/source/172634.meta.js
// @downloadURL    https://userscripts.org/scripts/source/172634.user.js
// @include        http*://reader.aol.com/*
// @version        1.0
// ==/UserScript==


//
// Version 1.0:
//  - Initial release


(function() {
    window.addEventListener("click", function(e) {
        if (
              e.button == 1
           )    {
                var mid_clk = e.target.href;
                GM_openInTab(mid_clk, true);
                }
    }, true);
})();