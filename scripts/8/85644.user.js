// ==UserScript==
// @name           anonib instant thumbs
// @namespace      abcmailX@lycos.de
// @description    loads all thumbnauls of the page instantly, not when visible
// @include        http://anonib.com/*
// ==/UserScript==

location.assign('javascript:(function(){$(document).ready(function(){$("img[class*=\'thumb\'][original]").each(function(){this.src=this.getAttribute("original");this.setAttribute("style","display:"+(this.getAttribute("class").indexOf("multi") >= 0?"inline;":"block;"));});});})()')