// ==UserScript==
// @name           fix boagworld menu
// @namespace      http://www.fiveminuteargument.com
// @description    fix boagworld's horrible menu
// @include        http://boagworld.com/*
// ==/UserScript==

var dds = document.getElementById('shows').
getElementsByTagName('dd');

for (i in dds)	dds[i].style.display = 'block';