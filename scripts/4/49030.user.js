// ==UserScript==
// @name           Entrez Different Finder
// @namespace      geological-supplies.com
// @description    Goes to page if it belongs to a different database
// @include        http://www.ncbi.nlm.nih.gov/sites/entrez
// ==/UserScript==

divs = document.getElementsByClassName('different');
if (divs[0]) {
	GM_log('found div');
	url = divs[0].childNodes.item(1).href;
	window.location.href = url + (url.match(/\?/)?'&':'?') + 'report=fasta';
} else GM_log('no different div found');