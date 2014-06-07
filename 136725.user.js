// ==UserScript==
// @name        Google.com Redirect
// @namespace   http://www.koatconsulting.com/
// @version     1.0
// @description google.com redirect
// @include	*://www.google.*/*
// @exclude	*://www.google.com/*
// @copyright   2012+, Pete Koat
// ==/UserScript==

var url = window.location.href; 
window.location.replace(url.replace(/google[^\//]*/g, 'google.com')); 
