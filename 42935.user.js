// ==UserScript==
// @name           youtube hi
// @namespace      http://www.userscripts.org/people/171
// @include        http://www.youtube.com/watch?v=*
// ==/UserScript==
if(window.location.href.match("fmt=18")!="fmt=18")
	window.location.href = window.location.href+"&fmt=18";