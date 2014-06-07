// ==UserScript==
// @name         Free Foreign Policy
// @namespace    http://burnthepage.com
// @include      http://*.foreignpolicy.com/*
// @include      https://*.foreignpolicy.com/*
// @grant        none
// @datecreated  2013-10-17
// @version      0.2
// @author       ruggedrudgate
// @license      GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @description  Removes the nagging subscription popup / paywall from Foreign Policy ( foreignpolicy.com )
// ==/UserScript==

window.addEventListener('load', function() {
   var ids = ["paywallWrapper", "TB_window", "TB_overlay", "anKe3"];
    for(var i=0; i<ids.length; i++){
        var dom = document.getElementById(ids[i]);
        if (dom) {
            dom.parentNode.parentNode.removeChild(dom.parentNode);
        }
    }
}, false);
