// ==UserScript==
// @name           Page padder
// @namespace      geological-supplies.com
// @include        http://*.geoscienceworld.org*/cgi/*
// @include        http://palaeo-electronica.org/1*
// @include        http://palaeo-electronica.org/2*
// @include        http://www.mycologia.org*
// @include        http://journals.cambridge.org*
// @include        */cgi/content/*

// ==/UserScript==

document.getElementsByTagName("body")[0].style.padding = "0 20%;";
document.getElementsByTagName("body")[0].style.background = "#ffd";
document.getElementsByTagName("body")[0].style.color = "#004";