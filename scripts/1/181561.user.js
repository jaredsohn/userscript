// ==UserScript==
// @name Xzacked Hotspot Codes Unlocker
// @namespace Xzacked Hotspot Codes Unlocker
// @include http://xzacked.altervista.org*
// @include http://*code-wifi.fr*
// @grant none
// @version 0.2
// @description Directly show code without forcing to like the page
// ==/UserScript==

// Don't display the like enforcing stuff
document.getElementsByClassName("onp-sociallocker")[0].style="display: none;";
// Display the hidden content
document.getElementsByClassName("onp-sociallocker-content")[0].style="display: block;";