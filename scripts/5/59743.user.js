// ==UserScript==
// @name           Give To link remover
// @description    Remove "give" links for feeding stuff to familiars from your inventory
// @namespace      http://userscripts.org/users/75549
// @include        http://127.0.0.1*inventory.php*
// @include        *kingdomofloathing.com*inventory.php*
// ==/UserScript==

tmp = document.getElementsByTagName('a');
for(i=0;i<tmp.length;i++) {
	if(tmp[i].innerHTML.indexOf("[give ") != -1) {
		tmp[i].innerHTML = "";
	}
}