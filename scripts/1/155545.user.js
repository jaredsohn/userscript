// ==UserScript==
// @name        Changer titre HP
// @namespace   http://vcutillas.com/
// @description Change le titre du forum HP
// @include     http://hautpotentiel.xooit.be/*
// @version     1
// ==/UserScript==
function changeTitreHP(){

	var tt = document.title;
	if(tt.match(/^Haut Potentiel - (.*)/i)[1] != null)
		tt = tt.match(/^Haut Potentiel - (.*)/i)[1];
	document.title = tt;
	if(document.getElementsByClassName("maintitle"))
		document.getElementsByClassName("maintitle")[0].innerHTML = "Amis des Zèbres, bonjour !";
	else
		setTimeout(changeTitreHP, 0);
}
setTimeout(changeTitreHP, 50);