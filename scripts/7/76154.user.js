// ==UserScript==
// @name          Good old google search
// @namespace     http://kitakitsune.org
// @description   This script hides ugly left menu in google search results.
// @include       http://*.google.*/search*
// @include       http://*.google.*/images*
// ==/UserScript==

document.getElementById("leftnav").style.display='None';
document.getElementById("center_col").style.marginLeft = "0";