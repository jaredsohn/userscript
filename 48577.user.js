// ==UserScript==
// @name           Fasta Selecta
// @namespace      geological-supplies.com
// @description    Selects & copies fasta sequences from NCBI
// @include        http://www.ncbi.nlm.nih.gov/sites/entrez?*asta*
// @include        http://www.ncbi.nlm.nih.gov/protein/*fasta*
// @version        1.0 - seems to work okay!
// ==/UserScript==

 window.copyToClipboard = function() {
 content = document.getElementById('maincontent');
 content.innerHTML = content.innerHTML.replace(/<pre>&gt;.*\|/, '<textarea cols=68 rows=30>&gt;').replace("</pre>", '</textarea>');
 //content.innerHTML = content.innerHTML.replace(/orthodenticle/, 'otx');
 content.firstChild.focus();
 content.firstChild.select();
 GM_log('ok');
}
 
 if (document.getElementById('maincontent')) {
	content = document.getElementById('maincontent');
	content.addEventListener("click", copyToClipboard, true);
}
