// ==UserScript==
// @name        Dl-protect skipper
// @description Automatically skips the dl-protect intersitial if there is no capcha to enter
// @icon        http://dl-protect.com/favicon.ico
// @include     *dl-protect.com*
// @version     1.0
// @grant none
// ==/UserScript==

lnkForm = document.forms["ccerure"]; // Get the continue form
if (lnkForm.onsubmit == null) { // Onsubmit is only here when asking for a capcha
    lnkForm.submit(); // Go to the real page
}