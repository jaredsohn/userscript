// ==UserScript==
// @name     _Remove div
// @include  http://www.navratdoreality.cz/*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==/UserScript==

var deldiv = document.evaluate("//div[contains(@style, 'position: absolute; left: 50%; top: 280px; z-index:1000;')]", document, null, 9, null).singleNodeValue;*/
deldiv.parentNode.removeChild(deldiv);
