// ==UserScript==
// @name           IMDB Old Layout
// @namespace      http://userscripts.org/scripts/show/88664
// @include        http://www.imdb.com/title/*
// @exclude        http://www.imdb.com/title/*/*
// ==/UserScript==

String.prototype.endsWith = function(str){return (this.match(str+"$")==str)}
var url=window.location.href;
if (url.indexOf('/combined') == -1){
	if (!url.endsWith('/')){
		url+='/';
	}
	url+='combined';
	window.location.href=url;
}
