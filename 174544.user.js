// ==UserScript==
// @author		   Elevory
// @name           Last.FM Force List View
// @description    Redirects any Last.FM tracks page to its list view equivalent
// @version		   1.0
// @namespace      http://userscripts.org
// @run-at         document-start
// @include 	   http*://www.last.fm/*/tracks*
// @exclude		   *?view=compact&*
// ==/UserScript==

var path = document.URL;

if (path.indexOf("?page") == -1)
{
	window.location.replace(path + "?view=compact&");
}
else
{
	var pathFront = path.substring(0, path.indexOf("page="));
	var pathEnd = path.substring(pathFront.length, path.length);
	window.location.replace(pathFront + "view=compact&" + pathEnd);
}