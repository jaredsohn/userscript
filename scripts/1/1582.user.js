// ==UserScript==
// @name           Strip tab prefixes
// @namespace      http://henrik.nyh.se
// @description    Remove site name from titles, i.e. tabs. Intended for forums with titles like "Forum Name - Thread Name". Will remove the first space-dash-space and everything preceding it. Modify @include if necessary.
// @include        http://forum.*/*
// @include        http://*/forum/*
// ==/UserScript==

t = document.title;
i = t.indexOf(' - ');

if (i > 0) document.title = t.substring(i + 3);