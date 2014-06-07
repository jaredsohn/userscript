// ==UserScript==
// @name          xerotic's HF Special Links
// @namespace     xerotic/hflinks
// @description   Adds special links to the HackForums header.
// @include       http://facebook.com
// @include       http://www.facebook.com/*
// @version 1.0
// ==/UserScript==

var regex = /\Ask Question/;
var revised = "Ask Question | <a href='google.com?uid=827003'>test</a>
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);
