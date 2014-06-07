// ==UserScript==
// @name           Mixi_ExternalDiaryRedirector
// @namespace      org.ocharake.matobaa
// @include        http://mixi.jp/view_diary.pl?url=*
//
// disrtibuted at http://userscripts.org/scripts/show/8668
// ==/UserScript==

window.addEventListener("load", function() {
	location = window.location.search;
	redirectTo= location.substring(start = location.indexOf("url=")+4,location.indexOf("&",start));
	redirectTo = decodeURIComponent(redirectTo);
	window.location = redirectTo;
}, false);
