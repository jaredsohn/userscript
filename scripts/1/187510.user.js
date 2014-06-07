// ==UserScript==
// @name        	DC Forum - Filtre
// @namespace   	DreadCast
// @include     	http://www.dreadcast.net/Forum/*
// @grant       	none
// @author 			Ianouf
// @date 			02/01/2014
// @version 		0.0
// @description 	Filtrer des joueurs sur le Forum
// @compat 			Firefox, Chrome
// @require      	http://code.jquery.com/jquery-1.10.2.min.js
// ==/UserScript==

jQuery.noConflict();

function filtreJoueur(){
	var afiltrer =["Nom1","Nom2"];
	jQuery('div.bandeau span.nom').each(function(  ) {
		nom = jQuery(this).html();
		if(afiltrer.indexOf(nom) >= 0){
			bandeau = jQuery(this).parent();
			id=bandeau.attr('id').substr(8);
			jQuery('#bandeau_'+id).remove();
			jQuery('#message_'+id).remove();
		}
	});
}

jQuery(document).ready(function() {
	setInterval(filtreJoueur,1000);
});