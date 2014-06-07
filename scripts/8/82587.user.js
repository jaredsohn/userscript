// ==UserScript==
// @name           Subscription Bar
// @namespace      Adam Rock
// @include        http://*youtube.com/watch?v=*
// ==/UserScript==


if (/[\?&]playnext=1/i.test(document.location.href)) 
    document.location.replace(document.location.href.replace("playnext=1","playnext=0"));
	
	if (/[\?&]list=UL/i.test(document.location.href)) 
    document.location.replace(document.location.href.replace("list=UL",""));


GM_addStyle("#quicklist-bar, #playlist-bar{display: none}");
GM_addStyle("#quicklist-tray-container{display: none}");
GM_addStyle("#quicklist-bar-container{display: none}");