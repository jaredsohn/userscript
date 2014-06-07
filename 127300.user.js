// ==UserScript==
// @name           [A&S] 2xApostrophe WD
// @namespace      w-game.net
// @description    Petit script pour doubler les apostrophes lors de l'envoi d'une wd
// @include        http://w-game.net/messages.php?*&action=compose*
// @include        http://w-game.net/messages.php?*&action=reply*
// ==/UserScript==

function supprApostrophes(bouton){
	bouton.setAttribute("onclick", "var textarea = document.getElementsByName('text')[0]; textarea.value = textarea.value.replace(/'/g, \"''\");"+bouton.getAttribute("onclick")+";");
}

var envoyer = new Array(document.getElementsByTagName('input')[0],document.getElementsByTagName('input')[document.getElementsByTagName('input').length - 1]);

supprApostrophes(envoyer[0]);
supprApostrophes(envoyer[1]);