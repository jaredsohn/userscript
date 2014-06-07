// ==UserScript==
// @name           editorSionabel
// @namespace      unknown
// @include        http://*.phpbbtest.com/*
// ==/UserScript==

if (navigator.userAgent.indexOf('Firefox')>-1)  // Identification du navigateur
{
	var FireFox = true; 
	var nomScript='';
}
else 											
{
	var FireFox = false;
	var nomScript='editor';
}
//------------------------
// Définition des fonctions GM_getValue et GM_setValue pour Google Chrome
//------------------------


	// Google Chrome & Opéra
	if(!FireFox) 
	{
		function GM_getValue(key,defaultVal) // déclaration des fonctions : 
		{
			var retValue = localStorage.getItem(key+nomScript);
			if ( !retValue ) 
			{
				return defaultVal;
			}
			return retValue;
		}

		function GM_setValue(key,value) 
		{
			localStorage.setItem(key+nomScript, value);
		}
	}
//*******
function save()
{
	var forum = location.href.split('//')[1].split('.')[0];
	var param=document.getElementById('Param').value;
	GM_setValue('ParamBBCode'+forum,param);
}

//*********************
//   SCRIPT
//*********************
var forum = location.href.split('//')[1].split('.')[0];
if (document.getElementById('text_editor_textarea'))
{
	var param = GM_getValue('ParamBBCode'+forum,0); // récup des paramètre saisis
	if (param != 0) // s'ils existent
	{
		if(document.getElementById('text_editor_textarea').textContent == '')
		{
		document.getElementById('text_editor_textarea').textContent=param; // on applique dans le champs de texte les paramètre saisis
		}
	}
}
/*if (document.getElementById('text_edit'))
{
var editButton = document.getElementById('text_edit').innerHTML;
GM_setValue('barreEdition',editButton);
}*/
if (location.href.split('phpbbtest')[1] == '.com/profile.forum?mode=editprofile') // Si on est dans la page de profil
{
	
	var bouton = document.createElement("input"); // Création du bouton SAVE et ajout d'attributs
	bouton.setAttribute('type','submit');
	bouton.setAttribute('id','submit');
	bouton.setAttribute('value','Save');
	bouton.addEventListener("click", save, false );

	/*var ed = GM_getValue('barreEdition',0);
	if ( ed != 0)
	{
	document.getElementById('page-body').innerHTML +='<table class="forumline" width="100%" cellspacing="1" cellpadding="0" border="0"><tr><th class="thSides" valign="middle" height="25" colspan="2"> ParamBBCode </th></tr><tr><td class="gen row1" align="left"><span>BBCode personnel</span></td><td class="gensmall row2">'+ed+'<textarea id="Param" cols="80" rows="1"></textarea></td></tr></table>';
	}
	else
	{*/
		document.getElementById('page-body').innerHTML +='<table class="forumline" width="100%" cellspacing="1" cellpadding="0" border="0"><tr><th class="thSides" valign="middle" height="25" colspan="2"> ParamBBCode </th></tr><tr><td class="gen row1" align="left"><span>BBCode personnel</span></td><td class="gensmall row2"><textarea id="Param" cols="80" rows="1"></textarea></td></tr></table>'; // Ajout de la partie paramètre BBCode dans le profil
	// }
		var param = GM_getValue('ParamBBCode'+forum,0); // recup des paramètres
	if (param != 0) // S'ils existent
	{
		document.getElementById('Param').textContent=param; // Initialisation du champs de saisie avec les paramètres précedents
	}
	document.getElementsByClassName('bodyline')[0].insertBefore(bouton, document.getElementById('page-footer')); // insertion du bouton SAVE
}

