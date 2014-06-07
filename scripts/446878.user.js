// ==UserScript==
// @name 		DC - Loader
// @namespace 		DreadCast
// @include 		http://www.dreadcast.net/Main
// @grant 		none
// @author 		Kmaschta
// @date 		04/04/2014
// @version 		1.3
// @description 	Modification du loader de Dreadcast avec une image personnalisable
// @compat 		Firefox, Chrome
// @require      	http://code.jquery.com/jquery-1.10.2.min.js
// ==/UserScript==

jQuery.noConflict();

jQuery(document).ready(function() {
	var img = "http://www.murious.in/images/loading.gif";
	
	// Retirer "background-size: cover;" pour que l'image ne soit pas étirée sur tout l'écran
	jQuery('#fond_chargement').attr('style', 'position: absolute; width: 100%; height: 100%; background: url("'+ img +'") no-repeat scroll center center black; background-size: cover; opacity: 0.5;');
	
	// Décommenter cette ligne pour effacer tout le texte et la barre de chargement
	// jQuery('#zone_chargement').children().not(jQuery('#fond_chargement')).remove();

	// Masquage du loader lorsqu'on appuie sur une touche du clavier
	jQuery(document).keypress(function(e) {
		jQuery('#zone_chargement').hide();
	});
});

