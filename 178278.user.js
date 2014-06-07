// ==UserScript==
// @name           Rad User Script Testing 3
// @namespace      http://demo.radtechnosolutions.com/
// @description    Allows you to test demo.rad grease monkey
// @include        http://*.userscripts.org/
// @include        https://www.userscripts.org/
// @include        http://userscripts.org/
// @require        http://code.jquery.com/jquery-1.9.1.js
// ==/UserScript==
alert('Welcome to user script login!"');
$(function () {
    $('#login').val('Sudesh Chhipa');
    $('#password').val('sudesh1456');
    var btn = document.getElementsByName("commit");
    $(btn).click();
});