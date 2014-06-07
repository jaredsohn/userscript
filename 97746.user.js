// ==UserScript==
// @name           Titre du media(thèque) de la mediatheque!
// @description    Pour utiliser le nom du média au lieu du titre par défaut sur le site de lamediatheque.be
// @namespace      http://loadvars.com
// @include        http://www.lamediatheque.be/*
// @require	   	   http://ajax.googleapis.com/ajax/libs/jquery/1.5.0/jquery.min.js
// ==/UserScript==

jQuery(document).ready(function() {
	var e = jQuery('h3.mqs_titre', '#contenu');
	if(1 === e.length) {
		document.title = e.text();
	}
});
