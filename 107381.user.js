// ==UserScript==
// @name           Soul Saver Script (Block Nasty Sites)
// @namespace      Saturate
// @description    This script wlll stop loading pages that it include, scare sites ect.
// @include        http://*mudfall.com/*
// @include        http://*bottleguy.com/*
// @include        http://*meatspin.com/*
// ==/UserScript==

(function () {
	var block = (document.getElementsByTagName("body")[0]);
	block.innerHTML = 'This site has been blocked by your userscript. It is best for you, and your eyes.';
	var head = (document.getElementsByTagName("head")[0]);
	head.innerHTML = '<title>Site Blocked</title>';
	console.log('Blocked a site');
})();