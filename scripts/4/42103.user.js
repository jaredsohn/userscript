// ==UserScript==
// @name           RBC-link-correction
// @namespace      blog.laptev.info
// @description    Correction of links in old RBC RSS (in google reader)
// @include        http://www.rbc.ru*
// ==/UserScript==

if ( location.href.indexOf('http://www.rbc.ru/rbcfreenews.shtml?%2F',0) >=0 ) {
	zhref = 'http://www.rbc.ru/rbcfreenews/'+location.href.substr(39, location.href.length-39 ) ;
	document.location=zhref;
};