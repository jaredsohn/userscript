// ==UserScript==
// @id             minecraftskins-no-ads
// @name           minecraftskins.com AdBlock
// @version        0.1a
// @author         RainyAyne
// @description    Blocks ads and anti-adblock message at minecraftskins.com
// @include        http://www.minecraftskins.com/*
// @run-at         document-start
// ==/UserScript==

var adsSelector = '#lt, .afs_ads, [class*="banner"], [class*="add"], [id*="aswift"], ' + 
    '.right_whitebox, .detail_part2, [src*="show_ads.js"], [id*="cpmstar"]';

var interval;

/*
 * Hide ads while page is loading
 */
function waitHead() {
    if(document.head) {
        var style = document.createElement("style");
        style.type = "text/css";
        var css = document.createTextNode(adsSelector + ' { display: none !important; }');
        style.appendChild(css);
        document.head.appendChild(style);
        clearInterval(interval);
    }
}

interval = setInterval(waitHead, 100); // Try to hide ads before the user sees them

/*
 * Remove ads once page is loaded
 */
function waitBody() {
    var ads = document.querySelectorAll(adsSelector);
    if(ads)
        for(var ad in ads)
            ads[ad].parentNode.removeChild(ads[ad]);
}

var bodyInterval = setInterval(waitDOM, 100); // Try to remove ads before they load

window.addEventListener("DOMContentLoaded", function() {
    clearInterval(bodyInterval);
    waitBody();
}, false);
window.addEventListener("load", waitBody, false);