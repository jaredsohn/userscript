// ==UserScript==
// @name        El Reg Cookie Notice Deleter
// @namespace   CookieFoetsie
// @include     http://*.theregister.co.uk/*
// @include     http://*.channelregister.co.uk/*
// @version     1.2
// @description Removes Grey Cookie Notice Bar from bottom of screen
// ==/UserScript==

// remove cookie notice footer
var CookieFoetsie = document.getElementById('RegCCO');
CookieFoetsie.parentElement.removeChild(CookieFoetsie);