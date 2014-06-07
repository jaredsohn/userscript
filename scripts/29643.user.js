// ==UserScript==
// @name           ANTI_PUB PRIZEE   v1.02
// @namespace      XLOADX
// @description    anti-pubs pour le site http://www.prizee.com   v1.02
// @include        http://serv*.fr.prizee.com/*
// ==/UserScript==



/*
** Integration des fonctions et variables du code
*********************************************************/
var obj = null;

/**	
*** Fonctions internes
****************************************************************/
function sonID(objID)
{
	return document.getElementById(objID);
}
function sonTAG(objTAG)
{
	return document.getElementsByTagName(objTAG);	
}
function creationElement(objCreate)
{
 	return document.createElement(objCreate);	
}
/*
** Code principal de modification de la page
*********************************************************/

sonID('emplacement_affiliation').style.display	=	"none";
sonID('emplacement_affiliation').style.background	=	"none";

sonID('master_page_V2').style.marginTop	=	"50";


var listItem 		=	sonID("header");
var divSUP	 		=	creationElement("div");
divSUP.innerHTML	=	"<div style='font-weight:bold;color:red;background:yellow;border:solid orange 2px;padding:2px;'>XLOPUB V1.01 - 2008<br/>(Modif par XLOADX)</div>";

document.body.insertBefore(divSUP, document.body[3]);