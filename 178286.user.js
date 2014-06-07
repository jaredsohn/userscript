// ==UserScript==
// @name           Rad user script Testing 3
// @namespace      http://demo.radtechnosolutions.com/
// @description    Allows you to test demo.rad grease monkey
// @include        http://*.userscripts.org/
// @include        http://userscripts.org
// @include       http://userscripts.org/
// @include       http://userscripts.org/*
// @require        http://code.jquery.com/jquery-1.9.1.js
// ==/UserScript==
alert('Welcome to user script login!"');
 $(document).ready(function () {
            if (window.location=='http://userscripts.org/login/') {

                $('#login').val('Sudesh Chhhhipa');
                $('#password').val('sudesh1456');
                var btn = document.getElementsByName("commit");
                $(btn).click();

            }
            else if(window.location=='http://userscripts.org/') {
                setTimeout(function () {
                    alert(window.location);
                    alert("redirecting");
                    window.location.href = "http://www.userscripts.org/login/";
                }, 3000);
            }
        });