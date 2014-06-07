// ==UserScript==
// @name        Truc pour Max
// @namespace   Fab
// @description Truc pour l'université
// @include     http://ipweb.univ-paris1.fr/ipweb/
// @version     1
// ==/UserScript==

if(GM_getValue('changed') != 'ok') {
	if(typeof GM_getValue('contenu') === 'undefined') {
		alert('Initilalisation....');
		GM_setValue('contenu', document.body.innerHTML.toString());
		alert('Ok !');
	}
	setTimeout(function() {
		if(document.body.innerHTML.toString() != GM_getValue('contenu')) {
			GM_setValue('changed', 'ok');
			alert('ça change!')
		}
		else {
			location.reload();
		}	
	}, 1564);
}