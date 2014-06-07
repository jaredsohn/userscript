// ==UserScript==
// @name CheatInterface
// @namespace Cookie
// @include orteil.dashnet.org/cookieclicker/
// @version 1
// @grant none
// ==/UserScript==
var oldOnload = window.onload;
window.onload = function () {
    oldOnload();
    var script = document.createElement('script');
    script.setAttribute('src', '<source link>');
    document.body.appendChild(script);