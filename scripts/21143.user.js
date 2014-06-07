// ==UserScript==
// @name           The Pirate Bay Language AutoSelector
// @namespace      http://userscripts.org/users/14536
// @description    Automatically sets The Pirate Bay to use English
// @include        http://thepiratebay.org/*
// @author         Vaughan Chandler
// ==/UserScript==

// Last updated on 2008-01-24

if (top!=self) { return; }

var inEnglish = document.body.innerHTML.toLowerCase().indexOf('search torrents')!=-1;
var onLangPage = location.href.toLowerCase().indexOf('thepiratebay.org/language')!=-1;

if (!inEnglish && !onLangPage) {
	GM_setValue('referer', location.href);
	location.replace('http://thepiratebay.org/language/en_EN');
}

if (inEnglish && onLangPage) {
	var referer = GM_getValue('referer');
	GM_setValue('referer', '');
	if (referer.length<1) { referer = 'http://thepiratebay.org/'; }
	location.replace(referer);
}