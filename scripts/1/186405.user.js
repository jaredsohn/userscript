// ==UserScript==
// @name 		Google Link Color Change
// @description	Changes the color of visited links in Google searches to red (For us color blind people).
// @author 		Noxidian
// @include 	*google.*
// ==/UserScript==

GM_addStyle('a:visited {color:#d31717 !important;}');
GM_addStyle('.mblink:visited, a:visited {color:#d31717 !important;}');