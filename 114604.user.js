// ==UserScript==
// @name Portail Captif Grenet - INPG autoselect + autosubmit
// @description Sélectionne automatiquement l'INPG dans la liste des établissement
// @include https://portail-captif.grenet.fr/*
// @version 1.0
// @history 03/10/2011 version 1.0
// ==/UserScript== 

for(var i=0;i<document.forms[0].elements.length;i++)
{
	var etab = document.forms[0].elements[i];
	if(etab.type=="radio") 
		if(etab.value == "@grenoble-inp.fr") 
			etab.checked=true;
}

if(document.forms[0].username.value.length > 0 && document.forms[0].password.value.length > 0)
	submitAction();
