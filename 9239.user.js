// ==UserScript==
// @name           last.fm slogan to title
// @namespace      html
// @description    adds slogan to page title
// @include        http://www.last.fm/*
// ==/UserScript==

if ( document.getElementById('slogan') ) {
 document.title += ' | ' + document.getElementById('slogan').innerHTML;
}