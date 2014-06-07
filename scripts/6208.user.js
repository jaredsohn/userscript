// ==UserScript==
// @name           M1.dk Adskipper
// @namespace
// @description    This script will skip the annoying advertisement on M1 Free SMS Service. Expand functionality with an autologinscript.
// @include        https://m1.dk/sms_payment.php
// ==/UserScript==

(function() {
    window.location.href = "https://m1.dk/sms_payment.php?product=websms";
})();


