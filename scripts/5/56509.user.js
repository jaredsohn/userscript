// ==UserScript==
// @name           Remove Comments on Tuts+
// @namespace      http://userscripts.org/scripts/source/56509
// @description    Removes the comments on PSDTuts+
// @include        http://*tutsplus.com/*
// @version 1.5
// ==/UserScript==
// Updated it so it includes all of TutsPlus not just PSDTuts+
// Cleaned up the code a little
// It now includes all tutsplus websties ex. PSD NET

(document.getElementById('commentlist')).parentNode.removeChild(commentlist);

