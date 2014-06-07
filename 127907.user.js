// ==UserScript==
// @name           Facebook v1
// @namespace      Milan Miljkovic (willand_87@yahoo.com)
// @description    removes ads from yourtvseries.eu
// @include        http://*.facebook.com/*
// @version		   1.0.0
// @attribution    ""
// ==/UserScript==

tmp = document.getElementById('rightCol');
tmp.style.display = "none";

tmp = document.getElementById('contentArea');
tmp.style.width = "97%";