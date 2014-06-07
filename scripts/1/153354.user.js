// ==UserScript==
// @name AmeliorationTchat
// @namespace InGame
// @author Gideon
// @date 31/12/2011
// @version 1.2
// @description Ameliore l'utilisation des balises /me combinÃ©e aux couleurs.
// @license WTF Public License; http://en.wikipedia.org/wiki/WTF_Public_License
// @include http://www.dreadcast.net/Main
// @compat Firefox, Chrome
// ==/UserScript==


	var inputTchat = document.getElementById('message_chat').getElementsByTagName('input');
		inputTchat=inputTchat[0];


	var ameliorInput = function(e) { 
		if (e.keyCode==13) {
			inputTchat.value = inputTchat.value.replace(/\*([^\*]+)\*/gi, "[couleur=7BEEFF][i]$1[/i][/couleur]");

		do {
			inputTchat.value = inputTchat.value.replace(/(^\/me.+?)"([^\"]+)"/gi, "$1[couleur=FFFFFF]$2[/couleur]");
		}while (/(^\/me.+?)"([^\"]+)"/i.test(inputTchat.value));

		}
	}

		document.addEventListener('keypress', ameliorInput, false);