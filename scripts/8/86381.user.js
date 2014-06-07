// ==UserScript==
// @name Flixster Ad Skipper
// @namespace 
// @version  1.0 
// @description    Skips the ad on the homepage.
// @include      *www.flixster.com/
// @author         TechOwner (http://userscripts.org/users/techowner)
// @license        GNU GENERAL PUBLIC LICENSE
// ==/UserScript==


//remove ad screen
var ad = document.getElementById('overlay_body');
if (ad) {
    ad.parentNode.removeChild(ad);
}

