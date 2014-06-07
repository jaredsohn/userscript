// ==UserScript==

// @name		InstaFresh

// @namespace	http://userscripts.org/users/504264

// @description Included pages reload every 10 minutes.

// @include		http://rogue.angellearning.com/default.asp

// @include		http://www.rogue.angellearning.com/default.asp

// @include		http://rogue.angellearning.com/*

// @include		http://www.rogue.angellearning.com/*

// @grant	none

// ==/UserScript==



var nM = 10;

window.setTimeout("document.location.reload();", nM*60000);