// ==UserScript==
// @name           DDL2 Fixer
// @namespace      #aVg
// @description    Fixes DDL2
// @include        http://ddl2.com/*
// @include        http://www.ddl2.com/*
// @version        0.1
// @license        Creative Commons (Attribution-Noncommercial-No Derivative Works) 3.0 Unported (http://creativecommons.org/licenses/by-nc-nd/3.0/)
// ==/UserScript==
function single() {if(arguments.length==2 && !arguments[1]) return;return document.evaluate("." + arguments[0], arguments[1] || document.body, null, 9, null).singleNodeValue}
function remove(A) {if(A) A.parentNode.removeChild(A);return remove}
remove(single("//div[@class='side']"));
GM_addStyle(".footer, .content, .download-header, table.download {width:100%} .col-downloadname{width:533px}");
if(location.pathname.indexOf("/search/")==0) {
	var a = single("//span[.='Sponsored Results']/..");
	remove(a.nextSibling.nextSibling);
	remove(a.nextSibling);
	remove(a);
	a = single("//div[@class='content']/table[@class='download'][2]");
	remove(a.nextSibling.nextSibling);
	remove(a.nextSibling);
	remove(a.previousSibling.previousSibling);
	remove(a.previousSibling);
	remove(a);
}