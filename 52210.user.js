// ==UserScript==
// @name           SectaChan remove LinkBucks
// @namespace      reemplaza los links de sectachan.org que contienen un enlace a linkbucks con enlaces directos, ideal para ver trankilo las fotos ^^
// @description    reemplaza los links de sectachan.org que contienen un enlace a linkbucks con enlaces directos, ideal para ver trankilo las fotos ^^

ACTUALIZADO!!! funciona denuevo

Alejandro Silva - pm5k.sk@gmail.com :P
// @include        http://www.sectachan.org/*
// ==/UserScript==

function xpath(query) { 
	return document.evaluate(
		query, 
		document, 
		null, 		
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
		null
	); 
}

var res = xpath('*//A[@target="_pic"]');
var size = res.snapshotLength;
for (var i = 0; i<size ; ++i){
	var A = res.snapshotItem(i);
	var pos = A.href.lastIndexOf("sectachan.org");
	A.href = "http://www."+A.href.substr(pos);
}
// VIVA CHILE MIERDA!!