// ==UserScript==
// @name           Beta auto select
// @namespace      ikariam
// @description    Selection automatique de l'univers Beta dans le formulaire de connexion.
// @include        http://ikariam.fr/
// @include        http://www.ikariam.fr/
// @include        http://ikariam.fr/index.php
// @include	   http://s*.ikariam.*/*
// ==/UserScript==

var testerror = document.getElementById('text').getElementsByTagName('h1');
if ( testerror[0].innerHTML == 'Erreur !'){
	window.location="http://ikariam.fr/";
}

if ( document.getElementById('universe') != null ){
	var opts = document.getElementById('universe').getElementsByTagName('option');
	// Changer l'index d'opts de 0 à 7 (alpha à theta) pour changer l'univers par défaut
	opts[1].selected = true;
}