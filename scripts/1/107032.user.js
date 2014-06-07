// ==UserScript==
// @name Ensisun autoselect
// @description Sélectionne automatiquement ensisun (serveur 3A) pour le webmail
// @include https://webmail.ensimag.fr/*
// @version 3.0
// @history 17/07/2011 version 1.0
// @history 18/07/2011 version 2.0 ultra-optimisation
// @history 22/07/2011 version 3.0 correctif by RB
// ==/UserScript== 
var box = document.getElementById('rcmloginhost');
if( box != null)
	box.selectedIndex=1;