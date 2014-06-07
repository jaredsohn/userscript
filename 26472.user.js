// ==UserScript==
// @name           DeleteImeNu
// @namespace      http://polog.org/
// @include        http://*.2ch.net/test/read.cgi/*
// ==/UserScript==

Array.forEach(document.links, function(e){if(e.href.match(/ime\.nu\//)) e.href = e.href.replace(/ime\.nu\//, '')});