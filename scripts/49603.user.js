// ==UserScript==
// @name           Google search - Always Show Thumbnail
// @namespace      anticafe (http://getnewsit.blogspot.com)
// @description    Always show image (thumbnail) when google search
// @include        http://*google.*/search?*
// ==/UserScript==

if(document.URL.search("&tbs=") == -1)
{
	window.location.search += "&tbs=img:1";
}