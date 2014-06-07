// ==UserScript==
// @name          XT3 Forum fixer
// @namespace     http://blog.ozdw.com
// @description   Automatically return 100 results per page in forums instead of the default of 10
// @include       http://*xt3.com/*
// ==/UserScript==



// Get the current window location
var curLoc = window.location.href;

// ------------------------------------------------------------------------
// Reset the location to 100 per page.
// ------------------------------------------------------------------------
var newLoc = curLoc+'&perPage=100';
window.location.replace(newLoc);