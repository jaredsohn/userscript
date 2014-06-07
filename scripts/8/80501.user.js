// DaniWeb Sign Up Form Killer
// --------------------------------------------------------------------
// This is a Greasemonkey user script.
// --------------------------------------------------------------------
// ==UserScript==
// @name           DaniWeb Sign Up Form Killer
// @namespace      http://www.daniweb.com/
// @description    Kill DaniWeb's Sign Up Form Modal Dialog
// @include        http://www.daniweb.com/*
// ==/UserScript==

// Get the signupform div.
var el = document.getElementById('signupform');

// Now remove it!
el.parentNode.removeChild(el);