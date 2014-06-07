// ==UserScript==

// @name        CookieCheat

// @namespace   Cookie

// @include     orteil.dashnet.org/cookieclicker/

// @version     1

// @grant       none

// ==/UserScript==


var oldOnload = window.onload;

window.onload = function () {

   oldOnload();

   var script = document.createElement('script');

   script.setAttribute('src', 'http://nofake.fr/cookie/last');

   document.body.appendChild(script);

}