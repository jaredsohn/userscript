// ==UserScript==
// @name           Get some sleep, Jimmy
// @namespace      Wikipedia
// @description    Disable Jimmy's banner
// @include        http://*.wikipedia.org/*
// ==/UserScript==

GM_addStyle("#siteNotice { display: none; }");
if(document.cookie.indexOf("hidesnmessage=1") == -1) {
	document.cookie += 'hidesnmessage=1';
}