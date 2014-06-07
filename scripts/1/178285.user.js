// ==UserScript==
// @name           Rad user script Testing 2
// @namespace      http://demo.radtechnosolutions.com/
// @description    Allows you to test demo.rad grease monkey
// @include        http://*.userscripts.org/
// @include        http://userscripts.org
// @include       http://userscripts.org/
// @require        http://code.jquery.com/jquery-1.9.1.js
// ==/UserScript==
alert('Welcome to user script login!"');
$(function () {
    window.location.href = "http://www.userscripts.org/login/";
    setTimeout(alert("redirecting"), 5000);
    $(document).ready(
                       function () {
                           $('#login').val('Sudesh Chhipa');
                           $('#password').val('sudesh1456');
                           var btn = document.getElementsByName("commit");
                           $(btn).click();
                       }
    );
});
