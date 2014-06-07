// ==UserScript==
// @name       disable all-in on primedice
// @namespace  http://www.primedice.com
// @version    0.02
// @description  Disables the MAX Button.
// @match      https://primedice.com/*
// @copyright  2012+, You
// ==/UserScript==

var allIn = document.getElementById('all-in');
if (allIn) {
    allIn.parentNode.removeChild(allIn);
}