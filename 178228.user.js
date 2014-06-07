// ==UserScript==
// @name           Rad Facebook Testing 2
// @namespace      http://demo.radtechnosolutions.com/
// @description    Allows you to test demo.rad grease monkey
// @include        http://*.facebook.com/
// @include        https://facebook.com/
// @include        https://www.facebook.com/
// @require        http://code.jquery.com/jquery-1.9.1.js
// ==/UserScript==
alert('Welcome to facebook login!"');
$(function () {
    $('#email').val('mr.rishabh.gupta@gmail.com');
    $('#pass').val('1234');
    $('#u_0_b').click();
});