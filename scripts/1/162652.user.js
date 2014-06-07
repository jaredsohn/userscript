// ==UserScript==
// @name        Hide LinkedIn People You May Know
// @namespace   http://esdaniel.org/
// @description Hides the 'People You May Know' block on LinkedIn home page
// @include     http://www.linkedin.com/
// @include     http://www.linkedin.com/*
// @include     https://www.linkedin.com/
// @include     https://www.linkedin.com/*
// @grant	none
// @version     0.1
// @license Creative Commons; http://creativecommons.org/licenses/by-nc-sa/3.0/
// ==/UserScript==
var pymk = document.getElementById("pymk");

if (pymk) {
    pymk.style.display = 'none';
}