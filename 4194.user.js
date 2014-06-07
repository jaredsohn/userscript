// ==UserScript==
// @name          Hackaday Sidebar
// @namespace     http://8overpar.com/poppeseed/greasemonkey/
// @description   Gets rid of sidebar at Hackaday.com
// @include       http://*.hackaday.com/*
// @include       http://hackaday.com/*
// ==/UserScript==

var nav = document.getElementById('nav');
if (nav) {
    nav.parentNode.removeChild(nav);
}
var promo = document.getElementById('promo');
if (promo) {
    promo.parentNode.removeChild(promo);
}
var dogear = document.getElementById('dogear');
if (dogear) {
    dogear.parentNode.removeChild(dogear);
}
var sky = document.getElementById('sky');
if (sky) {
    sky.parentNode.removeChild(sky);
}
var dual = document.getElementById('dual');
if (dual) {
    dual.parentNode.removeChild(dual);
}