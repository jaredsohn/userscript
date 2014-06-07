// ==UserScript==
// @name           PC INpact v5 - zone commentaires plus large
// @namespace      *
// @description    Zone commentaires plus large (comme la v4)
// @include        http://www.pcinpact.com/news/*
// ==/UserScript==

function addNewStyle(newStyle) {
    var styleElement = document.getElementById('styles_js');
    if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        styleElement.id = 'styles_js';
        document.getElementsByTagName('head')[0].appendChild(styleElement);
    }
    styleElement.appendChild(document.createTextNode(newStyle));
}


(function () {
	
	var bloc_commentaires = document.getElementById('bloc_commentaires');
	var content_left = document.getElementById('content_left');
	var layout = document.getElementById('layout');

	// Déplacement du bloc
	content_left.removeChild(bloc_commentaires);		
	layout.appendChild(bloc_commentaires);

	// Mise à jour du style
	bloc_commentaires.style.width = '99%';	
	addNewStyle('.bandeau_colore {width: 99%;}');
	addNewStyle('.commentaire_entete {width: 99%;}');
	addNewStyle('.commentaire_entete_team {width: 99%;}');
        addNewStyle('.commentaire_supprime > div {width: 99% !important;}');
	addNewStyle('.commentaire_content {width: 89%;}');	
})()

