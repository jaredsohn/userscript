// ==UserScript==
// @name        Farnell Cookie Notice Deleter
// @namespace   CookieFoetsie
// @include     http://*.farnell.com/*
// @version     1.0
// @description Removes huge blue cookie notice bar from top of screen
// ==/UserScript==

// remove cookie notice header
var CookieFoetsie = document.getElementById('mktg_Cookie_Wrap');
CookieFoetsie.parentElement.removeChild(CookieFoetsie);