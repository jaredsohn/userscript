// (c) Sascha beier
// ==UserScript==
// @name          SchülerVZ,StudiVZ,MeinVZ: Logout-Meldung entfernen
// @description   Entfernt die Meldung, die auf den Login-Button verweist, wenn man diesen beim letzten Besuch nicht verwendet hat.
// @include       http://www.schuelervz.net/*
// @include	  		http://www.studivz.net/*
// @include	  		http://www.meinvz.net/*
// ==/UserScript==

if( document.getElementById('PhxCover') != null )  
	document.getElementById('PhxCover').style.display = 'none';
	
if( document.getElementById('PhxDialog0') != null )
	document.getElementById('PhxDialog0').style.display = 'none';