// ==UserScript==
// @name        Blitzkrieg_look
// @namespace   10.248.49.254
// @description Trouve le nom de celui qui a la balle dans le classement
// @include     http://waar.me/events/blitzkriegcup.php
// @version     1
// ==/UserScript==

function poke(){
	node = document.getElementsByClassName("groupe_compartiment");
	link=node[7].childNodes[1].childNodes[1].childNodes[1].childNodes[5].childNodes[0].childNodes[0];// a
	window.open(link.href, '_blank');
}

poke();

window.setTimeout(location.reload,10000);