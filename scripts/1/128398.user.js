// ==UserScript==
// @name           Better titling
// @namespace      Scimonster,Scratch
// @description    When the tab titles are truncated, it doesn't help much to just see "Scratch |" or "Scratch Forums /" and not know what's after. This script is a fix.
// @include        http://scratch.mit.edu/*
// @exclude        http://scratch.mit.edu/
// ==/UserScript==

document.getElementsByTagName("title")[0].innerHTML = document.getElementsByTagName("title")[0].innerHTML.split(" / ").reverse().join(" / ").split("|").reverse().join(" | ");