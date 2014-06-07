// ==UserScript==
// @name           YouTube Title Set Right
// @namespace      http://www.youtube.com/
// @description    Set YouTube title right
// @include        http://www.youtube.com/watch?*
// ==/UserScript==

var _needle = "YouTube - ";
if (document.title.indexOf(_needle) != -1)
{
	var _title = document.title.substring(_needle.length, document.title.length);
	document.title = _title + ' - YouTube';
}