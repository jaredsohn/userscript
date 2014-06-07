// ==UserScript==
// @name        HTTP_Everywhere
// @namespace   DutchSaint
// @description For people who absolutely, positively can't use https.
// @include	https://nolinks.net/*
// @include	https://www.nolinks.net/*
// @version     1
// ==/UserScript==

window.location.href = window.location.href.replace(/^https:/, 'http:');