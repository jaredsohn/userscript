// ==UserScript==
// @name           Womenboard
// @namespace      http://aetools.uuuq.com
// @description    Changes name of tradboard
// @include        http://gamma.astroempires.com/board.aspx?*
// @include        http://gamma.astroempires.com/board.aspx
// ==/UserScript==

document.getElementsByTagName("tbody")[2].getElementsByTagName("a")[3].firstChild.nodeValue = "Womenboard";