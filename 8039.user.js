// ==UserScript==
// @name        Nuke New My Yahoo My QuickLinks Ads
// @namespace   http://sprignaturemoves.com
// @description Removes the QuickLinks ads on the New My Yahoo pages
// @include     http://*.my.yahoo.com/*

// ==/UserScript==


var ad1 = document.getElementById('trough-ad');
if (ad1) {
    ad1.parentNode.removeChild(ad1);
}

ad1 = document.getElementById('my-prop-nav');
if (ad1) {
    ad1.parentNode.removeChild(ad1);
}

var ad1 = document.getElementById('my-prop-bb-nav');
if (ad1) {
    ad1.parentNode.removeChild(ad1);
}

var ad1 = document.getElementById('ynav');
if (ad1) {
    ad1.parentNode.removeChild(ad1);
}

var ad1 = document.getElementById('hd_ynav');
if (ad1) {
    ad1.parentNode.removeChild(ad1);
}

var ad1 = document.getElementById('bbYnav');
if (ad1) {
    ad1.parentNode.removeChild(ad1);
}