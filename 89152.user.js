// ==UserScript==
// @name          WoWWiki to WoWpedia google search result rewrite
// @namespace     http:\\www.simplesamplecode.com
// @description   rewrites google search results for wowwiki to go directly to wowwiki
// @include       http://www.google.*/*
// ==/UserScript==

(function() {
	document.body.innerHTML= document.body.innerHTML.replace(/wowwiki.com/g,"wowpedia.org");
})();
