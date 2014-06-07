// ==UserScript==
// @name           Dvorak Uncensored Referer Spoof
// @description    Dvorak Uncensored hides a post's content and comments for a foreign referer
// @include        http://www.dvorak.org/blog/*
// ==/UserScript==

if (!document.referrer.match(/^http:\/\/(?:www\.)?dvorak\.org\/blog|^$/)) {
	location.replace(location.href);
}
