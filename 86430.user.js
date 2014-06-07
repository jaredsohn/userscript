// ==UserScript==
// @name           Kigard - Filtre à Sohma (46)
// @namespace      none
// @include        http://www.kigard.fr/index.php?s=1&p=forum*
// ==/UserScript==

auteur_est = function(nom){
	if ( document.getElementsByTagName('blockquote')[i].getElementsByTagName('a')[0] ) {
		return document.getElementsByTagName('blockquote')[i].getElementsByTagName('a')[0].innerHTML.indexOf(nom) != -1;
	}
}
retirer_element = function(el){
	el.parentNode.removeChild(el);
}

filtre = {
	execution : function(ev){
		for (i = 0 ; i < document.getElementsByTagName('blockquote').length ; i++ ){
		var tab_ignores = ignores.split(',');
			for (j = 0 ; j < tab_ignores.length ; j++){
				if (auteur_est(tab_ignores[j])){
					retirer_element(document.getElementsByTagName('blockquote')[i]);
				}
			}
		}
	}
}

if (document.getElementsByTagName('blockquote')){
	ignores = 'Sohma';
	filtre.execution();
}