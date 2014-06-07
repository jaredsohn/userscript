// ==UserScript==
// @namespace     http://www.splintor.com/userscript
// @name          Hide Weblogs Inc. blogs ads
// @description   Hide the ads that appear between posts in Weblogs Inc. blogs
// @include       http://www.downloadsquad.com/
// @include       http://www.downloadsquad.com/page/*
// ==/UserScript==

var d = document;
function hide(id) { var e = d.getElementById(id); if(e) e.style.display = "none"; }
hide("bp3");
hide("bp5");
hide("bp9");