// ==UserScript==
// @name Portail Captif Grenet - INPG autoselect
// @description Sélectionne automatiquement l'INPG dans la liste des établissement
// @include https://portail-captif.grenet.fr/*
// @version 1.0
// @history 18/09/2011 version 1.0
// ==/UserScript== 

for(var i=0;i<document.forms[0].elements.length;i++)
{
	var etab = document.forms[0].elements[i];
	if(etab.type=="radio") 
		if(etab.value == "@grenoble-inp.fr") 
			etab.checked=true;
}
