// ==UserScript==
// @name         Stop Gmail login focus annoyance
// @description  Prevent autofocus to the password field on load.
// @version      1.0.0
// @license      Public Domain
// @include      https://accounts.google.tld/*
// @grant        none
// ==/UserScript==

window.gaia_setFocus = function() {};
