// ==UserScript==
// @name           PhazeDDL Fixer
// @namespace      #aVg
// @include        http://www.phazeddl.com/*
// ==/UserScript==
function $(A) {return document.getElementById(A);}
function remove(A) {if(A)A.parentNode.removeChild(A);}
function single(A, B) {return document.evaluate(A, B||document, null, 9, null).singleNodeValue;}
remove($("searchResult"));
remove(single("./iframe", $("foot")));
GM_addStyle(".ad {display:none !important;} #content {max-width:100%!important;} #main-content {margin:0!important;}");