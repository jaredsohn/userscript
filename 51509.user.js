// ==UserScript==
// @name           JC Link Rewriter
// @description    Reescreve os links internos do JC
// @namespace     World Domination Inc.
// @include        http://jc*.com.br/*
// ==/UserScript==
var links = document.evaluate("//a[contains(@href, 'http://jc3.uol.com.br/jornal/')]",document,null,6,null);
for(var i=links.snapshotLength-1; i>=0; i--) {
	var endereco = links.snapshotItem(i).href;
	if(endereco.match('http://jc3.uol.com.br/jornal/.*not.*php')) {
		var inicio = endereco.indexOf('_') + 1;
		var fim = inicio + 6;
		var id = endereco.substring(inicio, fim);
		links.snapshotItem(i).href = 'http://jc3.uol.com.br/jornal/noticias/imprimir.php?codigo='+id;
	}
}