// ==UserScript==
// @name           MetaCritic Fixer
// @namespace      #aVg
// @version        0.1
// @description    Just sorts scores for now.
// @include        http://www.metacritic.com/film/titles/*
// ==/UserScript==
function $(A) {return document.getElementById(A);}
function hide(A) {A=$(A);if(A)A.style.display = "none";return hide;}
function show(A) {A=$(A);if(A)A.style.display = "";return show;}
hide("sortbyname1")("sortbyname2");
show("sortbyscore1")("sortbyscore2");