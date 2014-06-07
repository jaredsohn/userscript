// ==UserScript==
// @name          Thanks jo Jaider
// @namespace      JD
// @include        http://*goalll.nl/forum/viewtopic.php?*
// ==/UserScript==


auteur=document.getElementsByClassName("postauthor");
for(i=0;i<=auteur.length;i++) {
	if(auteur[i].innerHTML=="wwww4") {
		auteur[i].parentNode.parentNode.parentNode.parentNode.innerHTML="Hier staat een ongewenste reactie van: "+auteur[i].innerHTML;
	}
}