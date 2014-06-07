// ==UserScript==
// @name           Blast search dehyphenator
// @namespace      geological-supplies.com
// @description    Removes hyphens from FASTA sequence on box doubleclick
// @include        http://blast.ncbi.nlm.nih.gov/Blast.cgi?*
// ==/UserScript==

if (document.getElementById('seq')) {
	seq = document.getElementById('seq');
	seq.addEventListener('dblclick', dehyphenate, true);
}

function dehyphenate () {
	seq = document.getElementById('seq');
	firstline = seq.value.match(/.*[\r\n]/); // Save title line
	seq.value = seq.value.replace(/.*[\r\n]/,''); // Remove title line
	seq.value = seq.value.replace(/[\-\r\n\d]/g,''); // Remove whitespace, hyphens, digits
	seq.value = firstline + seq.value.replace(/(\w{60})/g,"$1\n"); // Restore title line, and break into lines of a suitable length
}