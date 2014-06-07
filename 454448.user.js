// ==UserScript==
// @name       SICP Readability Tweaks
// @namespace  http://www.racheet.me/
// @version    1.1
// @description  Some minor style tweaks to make the web version of SICP easier to read.
// @match      http://mitpress.mit.edu/sicp/full-text/book/*
// @copyright  2012+, Racheet Davé
// ==/UserScript==

var body = document.getElementsByTagName("body")[0];
    body.style.width = "35em";
    body.style.lineHeight = "1.35";
    body.style.margin = "0 20%";
    body.style.fontFamily = "calibri,helvetica,sans-serif";