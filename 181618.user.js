// ==UserScript==
// @name        Loading.se Skip
// @namespace   http://loading.se/
// @version     0.1.0
// @description 
// @match       http://loading.se/*
// @copyright   2013 vieekk
// ==/UserScript==

if (document.getElementsByTagName('body')[0].innerHTML.match(/Fortsätt till Loading.se/).length > 0) location.reload();