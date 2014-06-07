// ==UserScript==
// @author          tumpio
// @name            MiddleClick Reload
// @description     F5 with mouse!
// @namespace       userscripts.org/users/439657
// @homepage        http://userscripts.org/scripts/show/409810
// @icon            http://s3.amazonaws.com/uso_ss/icon/409810/large.png
// @updateURL       https://userscripts.org/scripts/source/409810.meta.js
// @downloadURL     https://userscripts.org/scripts/source/409810.user.js
// @match           *://*/*
// @grant           none
// @run-at          document-start
// @version         0.0.2
// ==/UserScript==

document.addEventListener("click", function (e) {
    //console.log(e.target);
    if (e.button == 1 &&
        !e.target.getAttribute("href") &&
        !e.target.parentNode.getAttribute("href") &&
        e.target.tagName != "A" &&
        e.target.tagName != "INPUT" &&
        e.target.tagName != "TEXTAREA") {
        document.location.reload(false);
    }
}, true);