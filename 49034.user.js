// ==UserScript==
// @name           Faster to FASTA
// @namespace      geological-supplies.com
// @description    Sets default NCBI view to FASTA
// @include        http://www.ncbi.nlm.nih.gov/*?report=genbank
// @include        http://www.ncbi.nlm.nih.gov/protein/*
// @include       	http://www.ncbi.nlm.nih.gov/*&dopt=*
// @version  	0.8  Includes most URLs; please report any others it should recognise
// ==/UserScript==

url = window.location.href;
if (!url.match(/[fF]asta/)) {
	if (url.match('genbank')) {
		window.location.href = url.replace('genbank', 'fasta');
	} else if (url.match('GenBank')) {
		window.location.href = url.replace('GenBank', 'fasta');
	} else if (url.match('^http://www.ncbi.nlm.nih.gov/protein/')) {
		window.location.href += (url.match(/\?/)?'&':'?') + 'report=fasta';
	}
	else if (url.match('&dopt=')) {
		window.location.href	= url.replace(/&dopt=\w+/, '&dopt=Fasta');
	}
}