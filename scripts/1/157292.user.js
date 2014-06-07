// ==UserScript==
// @name        Get rid of stream ads
// @namespace   http://userscripts.org/users/411522
// @include     http://sashavol.net23.net/*
// @grant       none
// @version     1
// ==/UserScript==
window.onload= function()
{
var ad = document.getElementById("facebox");
ad.setAttribute('style', "visibility:hidden;");
}