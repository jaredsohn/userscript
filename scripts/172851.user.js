// ==UserScript==
// @name        Circuitsonline Cookie Notice Deleter
// @namespace   CookieFoetsie
// @grant       none
// @include     http://www.circuitsonline.net/*
// @version     1.0
// ==/UserScript==

NooCook = document.getElementsByClassName('cookiePopupSmall')[0];
if(NooCook.parentNode)
NooCook.parentNode.removeChild(NooCook);