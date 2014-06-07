// ==UserScript==
// @name           LGeL : Autofill Partie
// @namespace      http://userscripts.org/users/heaven
// @description    Autofill du formulaire de creation de nouvelle partie LGeL
// @include        http://www.loups-garous-en-ligne.com/index.php?page=room
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==
 
$(document).ready(function() {
	$('input[name=tchatName]').val('text');			//Nom de la Partie	('text')
	$('select[name=nbPersonMax]').val(6);			//Nombre de Personne Max (6; 7; 8; 9; 10; 11; 12; 13; 14; 15; 16; 25; 35; 50)
	$('input[value=0]').attr('checked', true);		//Partie Normal ? 	(true; false)
	$('input[value=1]').attr('checked', false);		//Partie Fun ? 		(true; false)
	$('input[value=2]').attr('checked', false);		//Partie Serieuse ? (true; false)
	$('input[value=micro]').attr('checked', false);		//Partie Micro ?	(true; false)
	$('input[name=reel]').attr('checked', false);		//MJR Réel ? 		(true; false)
	$('input[name=anonyme]').attr('checked', false);	//Partie Anonyme ?	(true; false)
	$('input[name=selective]').attr('checked', false);	//Partie Selective ?(true; false)
	$('select[name=debat]').val(4);				//Durée d'un tour (en min) (3; 4; 6; 8; 10; 12)
	$('input[name=passePrivee]').val('');			//Entrer MDP si Partie Privée ('text')
});