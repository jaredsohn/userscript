// ==UserScript==
// @name        9292OV Opschoner
// @namespace   CookieFoetsie
// @description Removes cookie consent and wistjedat popup
// @include     http://9292.nl/*
// @version     1.0
// ==/UserScript==

// remove cookie notice footer
var CookieFoetsie = document.getElementById('cookie-consent-popup');
CookieFoetsie.parentElement.removeChild(CookieFoetsie);

// remove Wistjedat popup
var TipFoetsie = document.getElementById('mijn92tip');
TipFoetsie.parentElement.removeChild(TipFoetsie);