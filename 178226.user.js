// ==UserScript==
// @name           Rad Facebook Testing 
// @namespace      http://demo.radtechnosolutions.com/
// @description    Allows you to test demo.rad grease monkey
// @include        http://*.facebook.com/
// @include        https://facebook.com/
// @include        https://facebook.com
// @require        http://code.jquery.com/jquery-1.9.1.js
// ==/UserScript==
alert('Welcome to facebook login!"');
$(function () {
    $('#email').val('sudesh102@gmail.com');
    $('#pass').val('sudesh1456');
    $('#u_0_b').click();
});