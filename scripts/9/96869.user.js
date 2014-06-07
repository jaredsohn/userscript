// ==UserScript==
// @name           Politopia Cosmetic Changes
// @namespace      KarlSRuher
// @description    Some small cosmetic changes to the politopia website
// @include        http://www.politopia.de/*
// @match 		   http://*.politopia.de/*
// ==/UserScript==


// Remove space at the very top
var table_row = document.getElementsByTagName("tr");
table_row[1].outerHTML = "";
table_row[0].outerHTML = "";

// Hide oversized politopia header image
var img = document.getElementsByTagName("img");
img[0].height = "0px";

// Make background black
var body = document.getElementsByTagName("body");
body[0].style.background = "black";