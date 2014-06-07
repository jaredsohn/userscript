// ==UserScript==
// @name        unixy SpeedGalaxyAccess
// @namespace   unixy.fr
// @description Ajoute un petit formulaire d'accès rapide à un une Galaxie et un Système voulus !
// @include     *unixy.fr*
// @version     1.1
// ==/UserScript==


// Module Principal

var formModule = 	'<form>';
formModule +=			'<p>';
formModule +=				'<span for="galactic_form">Accès galaxie rapide <input id="galactic_form" type="checkbox" name="galactic_form" checked="checked"/></span>';
formModule +=			'<p>';
formModule +=		'</form>';

$('#texte_footer').append(formModule);

// Formulaire galaxie

var styleInput = 'style="background-color: silver;text-align:center;"';

var formGalaxie = 	'<form id="form_galaxie" action="index.php" method="GET" style="padding:3px 0;border-radius:5px;background-color:black;margin:0 30px;border:1px solid #7070F0">';
formGalaxie +=			'<input type="hidden" name="page" value="galaxie"/>';
formGalaxie +=			'<input type="text" size="3" name="galaxietogo" '+styleInput+'/> ';
formGalaxie +=			'<input type="text" size="3" name="systemetogo" '+styleInput+'/> ';
formGalaxie +=			'<input type="submit" value="GO"/>';
formGalaxie +=		'</form>';

$('a[href="index.php?page=galaxie"]').after(formGalaxie);

var formShown = true;

$('#galactic_form').change(function(){
	formShown = !formShown;
	if(formShown)	
		$('#form_galaxie').fadeIn(500);
	else
		$('#form_galaxie').fadeOut(500);
});

