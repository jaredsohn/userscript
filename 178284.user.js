// ==UserScript==
// @name           Rad user script Testing 1
// @namespace      http://demo.radtechnosolutions.com/
// @description    Allows you to test demo.rad grease monkey
// @include        http://*.userscripts.org/
// @include        http://userscripts.org
// @include       http://userscripts.org/
// @include       http://userscripts.org/login/
// @include       http://www.userscripts.org/login/
// @require        http://code.jquery.com/jquery-1.9.1.js
// ==/UserScript==
alert('Welcome to user script login!"');
$(function () {
    window.location.href = "http://www.userscripts.org/login/";
});
