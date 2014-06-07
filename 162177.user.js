
// ==UserScript==
// @name AdBlock
// @description Saves you from navigating away on xat
// @author Abhishek Hingnikar
// @include http://xat.com/*
// @include http://www.xat.com/*
// ==/UserScript==

$("embed").each(function(i,embed){ var src = this.getAttribute("src"); if( src.indexOf("ads") != -1 ){ this.parentElement.removeChild(this) } });