// ==UserScript==
// @name           Blaster to Fasta
// @namespace      geological-supplies.com
// @description    Links blast results directly to FASTA output
// @include        http://blast.ncbi.nlm.nih.gov/Blast.cgi
// ==/UserScript==

as = document.getElementsByTagName('a');
asCount = as.length;

for (i=0; i<asCount; i++){
	as[i].href = as[i].href.replace('GenPept', 'Fasta');
}

if (document.getElementById('descriptions')) {
	document.getElementById('descriptions').addEventListener('click', wikiLink, true);
}

function wikiLink() {
	descs = document.getElementById('descriptions');
	descs.innerHTML = descs.innerHTML.replace(/\[(\w+) (\w+)/g, "[<a style=font-style:italic href='http://en.wikipedia.org/wiki/$1'>$1</a> <a style=font-style:italic  href='http://www.google.com/search?q=$1+$2'>$2</a>");
	document.getElementById('descriptions').removeEventListener('click', wikiLink, true);
}