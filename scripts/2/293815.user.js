// ==UserScript==
// @name AmeliorationTchat2.2
// @namespace InGame
// @author krix
// @date 22/12/2013 
// @version 1.0
// @description Ameliore l'utilisation des balises /me combinée aux couleurs. Adaptation du script de Gideon pour la version de l'interface précédente.
// @license WTF Public License; http://en.wikipedia.org/wiki/WTF_Public_License
// @include http://www.dreadcast.net/Main
// @compat Firefox, Chrome
// ==/UserScript==

	var ameliorInput = function(e) { 
		if (e.keyCode==13) {
			$("#chatForm .text_chat").val($("#chatForm .text_chat").val().replace(/\$([^\$]+)\$/gi, "[couleur=vert][i]$1[/i][/couleur]"));
			
			do {
			$("#chatForm .text_chat").val($("#chatForm .text_chat").val().replace(/(^\/me.+?)$([^\$]+)$/gi, "$1[couleur=vert]$2[/couleur]"));
		}while (/(^\/me.+?)$([^\$]+)$/i.test($("#chatForm .text_chat").val()));
			
		}
	}
	
	document.addEventListener('keypress', ameliorInput, false);
