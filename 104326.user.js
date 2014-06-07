// ==UserScript==
// @name           Nu.nl geen Header, wel buttons
// @namespace      http://www.userscripts.org/users/watchout
// @description    Verbergt de nu.nl header, maar behoudt de buttons
// @include        http://*.nu.nl/*
// @include        http://*.zie.nl/*
// @include        http://*.nuwerk.nl/*
// ==/UserScript==

document.getElementById("pageheader").style.height = '26px';
document.getElementById("extensionnav").style.top = '0';

var ads = document.getElementsByClassName("adblock_h");
ads[0].style.display = 'none';