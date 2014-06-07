// ==UserScript==
// @name        Inqleaner
// @namespace   CookieFoetsie
// @description Removes annoying sliding widget in left pane
// @include     http://www.theinquirer.net/*
// @version     1.0
// @grant       none
// ==/UserScript==

var CookieFoetsie = document.getElementById('large_share_wrapper');
CookieFoetsie.parentElement.removeChild(CookieFoetsie);