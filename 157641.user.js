// ==UserScript==
// @name        Blitzkrieg_targetted
// @namespace   10.248.49.254
// @description Onglet du joueur ouvert, let's attack this f*cker!
// @include     http://waar.me/joueur.php?*
// @version     1
// ==/UserScript==

function poke(){
	node = document.getElementsByClassName("groupe_compartiment");
	link=node[3].childNodes[1].childNodes[1].childNodes[1].childNodes[2].childNodes[1].childNodes[1];// a
	location.href = link.href;
}
poke();