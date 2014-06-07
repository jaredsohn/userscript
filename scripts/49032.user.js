// ==UserScript==
// @name           NCBI fasta generator
// @namespace      geological-supplies.com/scripts
// @description    One-click access to a fasta sequence
// @include        http://www.ncbi.nlm.nih.gov/nuccore/*
// ==/UserScript==

href = window.location.href;

if (href.match(/seqview/)) {
	 window.copyToClipboard = function() {
	 content = document.getElementById('viewercontent1');
	 content.innerHTML = content.innerHTML.replace(/<pre>/, "<textarea cols=68 rows=30>").replace("</pre>", '</textarea>');
	 content.innerHTML = content.innerHTML.replace(/[Oo]rthodenticle|OTX|otx/g, 'Otx');
	 content.innerHTML = content.innerHTML.replace(/[Rr]hodopsin\D*/g, 'Rh');
	 content.innerHTML = content.innerHTML.replace(/[Oo]psin\D*/g, 'OPS');
	 content.innerHTML = content.innerHTML.replace(/&gt;.*\|/g, '&gt;');
	 content.innerHTML = content.innerHTML.replace(/&gt;(.*)\[(.*)\]/g, '&gt;$2 $1');
	 content.innerHTML = content.innerHTML.replace(/[tT]ranscription [fF]actor/g, 'T.F.');
	 content.innerHTML = content.innerHTML.replace(/[hH]omeobox|homolog/g, '');
	 content.innerHTML = content.innerHTML.replace(/ (?!cols=|rows=)/g, '_');
	 content.innerHTML = content.innerHTML.replace(/_cds/, '');
	 content.innerHTML = content.innerHTML.replace(/&gt;_/, '&gt;');
	 content.firstChild.focus();
	 content.firstChild.select();
	}
 
	if (document.getElementById('viewercontent1')) {
		document.getElementById('viewercontent1').addEventListener("click", copyToClipboard, true);
}

} else {
	window.location.href = href + "?report=fasta&log$=seqview";
}