// ==UserScript==
// @name          JoKes: Rotate Images
// @namespace     JoKes
// @description   Rotate all loaded images on webpages
// @require       http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @require       http://jqueryrotate.googlecode.com/svn/trunk/jQueryRotate.js
// @include       http://*/*
// @grant         none
// ==/UserScript==

$(function() {
    $('img').rotate(180);
});