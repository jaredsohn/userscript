// ==UserScript==
// @name           googleSpellCheck
// @namespace      blakeHymer,4-10-08
// @include        http://www.google.com/*
// @include        www.google.com/*
// @include        google.com/*
var gs = document.getElementsByTagName("input");
var sf = gs[1];
sf.spellcheck = true;
// ==/UserScript==