// ==UserScript==
// @name         Foreign Policy Paywall Remover
// @namespace    fasterik
// @include      http://*.foreignpolicy.com/*
// @include      https://*.foreignpolicy.com/*
// @grant        none
// @datecreated  2014-04-01
// @version      0.2
// @author       fasterik
// @license      GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @description  Based on http://userscripts.org/scripts/show/180161. Removes the nagging subscription popup / paywall from Foreign Policy ( foreignpolicy.com )
// ==/UserScript==

window.addEventListener('load', function() {
    var ids = ["TB_window", "TB_overlay"];

    interval = setInterval(function() {
        if (ids.length == 0) {
            clearInterval(interval)
            return;
        }
        
        for (var i = 0; i < ids.length; i++) {
            var dom = document.getElementById(ids[i]);
            if (dom) {
                dom.parentNode.removeChild(dom);
                ids.splice(i, 1)
            }
        }
    }, 500);
    
}, false);
