// Hackaday Simplifier!
// version 0.1 BETA!
// 2005-09-30
// Copyright (c) 2005, ADAM CLARK
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// Partial Code taken from
//
// Hide Google Adsense Ads
// (c) Carlo Zottmann, carlo@g-blog.net
// http://G-Spotting.net/
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Hackaday Simplifier", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Hackaday Simplifier
// @namespace     http://diveintogreasemonkey.org/download/
// @description   script to remove all menus...ads...all you'll see are the hacks
// @include       http://*hackaday.com*
// ==/UserScript==

(function() {

    var RemoveGoogleAds =
    {
        checkPage: function()
        {
            currentDoc = document;

            try {
                if (currentDoc.getElementsByTagName("body")[0].innerHTML.match(/google_ads_frame/i))
                {
                    this.injectCSS("iframe[name='google_ads_frame'] { display: none; }");
                }
            }
            catch(e) {}
        },


        injectCSS: function(css)
        {
            head = document.getElementsByTagName("head")[0];
            style = document.createElement("style");
            style.setAttribute("type", 'text/css');
            style.innerHTML = css;
            head.appendChild(style);
        }
    }

    RemoveGoogleAds.checkPage();

})();


var adSidebar = document.getElementById('promo');
if (adSidebar) {
    adSidebar.parentNode.removeChild(adSidebar);
}
var adSidebar = document.getElementById('sky');
if (adSidebar) {
    adSidebar.parentNode.removeChild(adSidebar);
}
var adSidebar = document.getElementById('slice');
if (adSidebar) {
    adSidebar.parentNode.removeChild(adSidebar);
}
var adSidebar = document.getElementById('dogear');
if (adSidebar) {
    adSidebar.parentNode.removeChild(adSidebar);
}
var adSidebar = document.getElementById('dual');
if (adSidebar) {
    adSidebar.parentNode.removeChild(adSidebar);
}