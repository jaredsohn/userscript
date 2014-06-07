// ==UserScript==
// @name        derstandard.at Silbentrennung
// @namespace   http://harald.schil.ly
// @description Silbentrennung für derstandard.at
// @include     http://derstandard.at/*
// @include     https://derstandard.at/*
// @version     1.0
// ==/UserScript==
var page = document.getElementById('documentCanvas');
page.setAttribute('lang', 'de');
page.setAttribute('style', '-moz-hyphens: auto; hyphens: auto; -webkit-hyphens: auto; -ms--hyphens: auto; word-break: break-word;');
