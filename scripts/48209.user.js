// ==UserScript==
// @name           Google Display the Date a Web Page was Published
// @namespace      http://d.hatena.ne.jp/griffith181/
// @description    This script enables you to add '&as_qdr=y15' to a URL of google's search result automatically
// @include        http://www.google.*/search?*
// ==/UserScript==
if(document.URL.search("&as_qdr=") == -1)
{
	window.location.search += "&as_qdr=y15";
}