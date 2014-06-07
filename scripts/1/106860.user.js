// ==UserScript==
// @name           Ambroisie : France Culture
// @namespace      http://sites.google.com/site/projetambroisie/
// @include        http://www.franceculture.com/*
// ==/UserScript==
 
/* 
L'ensemble des scripts du Projet Ambroisie sont sous Copyright (© Lelong Anthony - 2011 - Tous droits réservés), et vous n'êtes pas autorisés à modifier, copier ou redistribuer ces scripts. Veuillez lire les conditions d'utilisation avant toute utilisation.
 */

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Fonctions ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

/*getElementsByAttribute by Robert Nyman : http://robertnyman.com/2006/01/23/monday-code-giveaway-getelementsbyattribute/ */
/*
	Copyright Robert Nyman, http://www.robertnyman.com
	Free to use if this text is included
	--------------------------------------------------
	Anthony Lelong : Fonction modifiée de manière à ce qu'il n'y ait pas d'erreur lorsque oElm=null
*/
function getElementsByAttribute(oElm, strTagName, strAttributeName, strAttributeValue){
	var arrReturnElements = new Array(); 
	if (oElm != null){
		var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
		var oAttributeValue = (typeof strAttributeValue != "undefined")? new RegExp("(^|\\s)" + strAttributeValue + "(\\s|$)") : null;
		var oCurrent;
		var oAttribute; 
		for(var i=0; i<arrElements.length; i++){
			oCurrent = arrElements[i];
			oAttribute = oCurrent.getAttribute && oCurrent.getAttribute(strAttributeName);
			if(typeof oAttribute == "string" && oAttribute.length > 0){
				if(typeof strAttributeValue == "undefined" || (oAttributeValue && oAttributeValue.test(oAttribute))){
					arrReturnElements.push(oCurrent);
				}
			}
		}
	}
	return arrReturnElements;
}




/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Notification en bas de la page ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
notification=document.createTextNode("Cette Page a été modifiée par Projet Ambroisie. Veuillez lire les conditions d'utilisation avant toute utilisation.")
document.body.appendChild(notification)

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Modifications ponctuelles d'éléments existants ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

// Que lisent-ils ? -> Ecouter la radio
var element_A_Modifier=getElementsByAttribute(document.getElementById("menu-top"),"*", "href", "/quelisentils")
if (element_A_Modifier.length > 0){
	element_A_Modifier[0].innerHTML="Ecouter France Culture";
	element_A_Modifier[0].setAttribute("href", "/player");
}
// Agenda -> Fiction
var element_A_Modifier=getElementsByAttribute(document.getElementById("menu-top"),"*", "href", "/votre-agenda")
if (element_A_Modifier.length > 0){
	element_A_Modifier[0].innerHTML="Fiction";
	element_A_Modifier[0].setAttribute("href", "/theme/type-éditorial/fiction");
}
// Disparition de Share (la méthode normale ne semble pas marcher)
var element_A_Modifier=document.getElementById("share")
if (element_A_Modifier!=null){
	element_A_Modifier.innerHTML=null
}

// Note explicative podcast
element1=getElementsByAttribute(document.getElementById("content-inner"),"*", "class", "article-full first last odd")
if (element1.length > 0){
	element_A_Modifier=element1[0].getElementsByTagName("h3");
	if (element_A_Modifier.length > 0){
		element_A_Modifier[0].innerHTML="Pour télécharger les émissions disponibles ou vous abonner au podcast, cliquez le lien RSS ci-dessous."
	}
}


/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Masquage d'éléments ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

// Définition du contenu de liste_Des_Elements_A_Masquer 
var liste_Des_Elements_A_Masquer = new Array()
liste_Des_Elements_A_Masquer=liste_Des_Elements_A_Masquer.concat(

getElementsByAttribute(document.getElementById("page"),"*", "class", "pictos rollover"),
getElementsByAttribute(document.getElementById("page"),"*", "class", "rubrique"),
getElementsByAttribute(document.getElementById("page"),"*", "class", "theme2"),
getElementsByAttribute(document.getElementById("menu-top"),"*", "href", "/quelisentils"),
document.getElementById("header-commun"),
document.getElementById("block-simplenews-65"),
document.getElementById("sidebar-right"),
document.getElementById("content-right"),
document.getElementById("footer-chaine"),
getElementsByAttribute(document.getElementById("footer-rf"),"*", "href", "http://www.radiofrance.fr/"),
getElementsByAttribute(document.getElementById("footer-rf"),"*", "href", "http://sites.radiofrance.fr/radiofrance/kiosque/liste.php?trier=date&ac=0&support=0&theme=0&collection=0&chaine=5"),
getElementsByAttribute(document.getElementById("footer-rf"),"*", "href", "http://espacepublic.radiofrance.fr/"),
getElementsByAttribute(document.getElementById("footer-rf"),"*", "href", "http://www.radiofrance.fr/boite-a-outils/frequences/"),
getElementsByAttribute(document.getElementById("footer-rf"),"*", "class", "haut-de-page"),
document.getElementById("block-views-lesplusconsultes-block_1"),
document.getElementById("cb-left"),
document.getElementById("content-right"),

// http://www.franceculture.com/podcasts/titre
getElementsByAttribute(document.getElementById("content-inner"),"*", "alt", "S'abonner à cette emission"),
//getElementsByAttribute(document.getElementById("content-inner"),"*", "class", "view-content"),
getElementsByAttribute(document.getElementById("content-inner"),"*", "class", "secondary-tabs"),
getElementsByAttribute(document.getElementById("content-inner"),"img", "class", "imagecache imagecache-podcast_image_grille imagecache-default imagecache-podcast_image_grille_default"),
// http://www.franceculture.com/podcast/3607721
getElementsByAttribute(document.getElementById("content-inner"),"*", "class", "itune"),
getElementsByAttribute(document.getElementById("content-inner"),"*", "class", "reader"),
getElementsByAttribute(document.getElementById("content-inner"),"*", "class", "yahoo"),
getElementsByAttribute(document.getElementById("content-inner"),"*", "class", "netvibes"),
// http://www.franceculture.com/emissions/titre
getElementsByAttribute(document.getElementById("content-inner"),"img", "class", "imagecache imagecache-blog_grille"),
// http://www.franceculture.com/emission-l-agenda-europeen-l-agenda-europeen-pologne-grece-italie-islande-2011-07-01.html
document.getElementById("block-print-0"),
document.getElementById("comments"),
getElementsByAttribute(document.getElementById("content-inner"),"*", "class", "netvibes")


)



// Masquage de tous les éléments de liste_Des_Elements_A_Masquer 
for ( i=0; i <= liste_Des_Elements_A_Masquer.length; i++ )  {
	if (liste_Des_Elements_A_Masquer[i]!=null){
		liste_Des_Elements_A_Masquer[i].setAttribute("style", "display: none");	
	}
}


