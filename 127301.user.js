// ==UserScript==
// @name           [A&S] 2xApostrophe ModuleCompa
// @namespace      w-game.net
// @description    Petit script pour doubler les apostrophes du module compa lors de l'envoi d'un nouveau message.
// @include        http://w-game.net/compagnie.php*
// ==/UserScript==

var enregistrer = document.getElementsByName('enregistrer')[0];
enregistrer.setAttribute("onclick", "var textarea = document.getElementsByTagName('textarea')[document.getElementsByTagName('textarea').length - 1]; textarea.value = textarea.value.replace(/'/g, \"''\"); return true;");