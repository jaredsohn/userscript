// ==UserScript==
// @name          WoWWiki to WoWpedia url redirect
// @namespace     http:\\www.simplesamplecode.com
// @description   redirect any navigation to wowwiki  to go to wowpedia instead
// @include       http://www.wowwiki.com/*
// ==/UserScript==

(function() {
	window.location.href = window.location.href.replace('wowwiki.com', 'wowpedia.org');
})();
