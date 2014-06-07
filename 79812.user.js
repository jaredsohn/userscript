// ==UserScript==
// @name           No Frozens
// @namespace      Magistream
// @description    No Frozen hatchies and eggs on Magistream
// @include        http://magistream.com/user/*
// ==/UserScript==

var trs  = document.body.getElementsByClassName('row');
var knotenListe = new Array();
for(var i=0; i<trs.length; i++){
	var test = trs[i].getElementsByClassName('usercol2');
	if(test[2].firstChild.data.match(/Frozen/)){
		var knoten = trs[i];
		knotenListe.push(knoten);
	}
}
for(var i =0; i<knotenListe.length; i++){
	knotenListe[i].parentNode.removeChild(knotenListe[i]);
}