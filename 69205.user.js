// ==UserScript==
// @name	Clubic anti filtrage
// @namespace 
// @description	Affiche automatiquement l'ensemble des commentaires de clubic.com lorqu'un filtrage est détecté
// @include        http://www.clubic.com/*
// @version	1.0
// @author	Madcat
// ==/UserScript==


function goTop() {
	window.scrollTo(0,0)	
}

function antiFiltrage() {
	if (comms.length != 0) {
		window.location.href = comms[0].firstChild.href;
		window.setTimeout(goTop, 500);
	}
}

comms = document.getElementsByClassName('goMsgReste');
antiFiltrage();