// ==UserScript==
// @name           ncbi feeling lucky
// @namespace      geological-supplies.com
// @description    Goes to first result if only one result on search results
// @include        http://www.ncbi.nlm.nih.gov/sites/entrez*
// ==/UserScript==

if (document.getElementById('ViewPanel')){
	results = document.getElementById('ViewPanel').innerHTML;
	
	if (results.match('ordinalpos=1') && !results.match('ordinalpos=2')) {
		var hr =  /[^'"]*ordinalpos=1[^'"]*/.exec(results);
		GM_log(hr[0]);
		window.location.href = 'http://www.ncbi.nlm.nih.gov' + hr[0] + (hr[0].match(/\?/)?'&':'?') + 'report=fasta';
	}
}