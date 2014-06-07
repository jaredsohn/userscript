// ==UserScript==
// @name           Ambroisie : RTL
// @namespace      http://sites.google.com/site/projetambroisie/
// @include        http://www.rtl.fr/*
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
// Ajout Lien Podcast au début de la page
home=document.getElementById("rtl_header")
if (home != null){
	lien_Podcast=document.createElement("a");
	lien_Podcast.innerHTML="Se rendre aux Podcasts"
	lien_Podcast.setAttribute("href","http://www.rtl.fr/podcasts")
	home.appendChild(lien_Podcast);
	home.appendChild(document.createElement("br"));
}


/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Masquage d'éléments ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

element1=getElementsByAttribute(document.getElementById("footer"),"*", "class", "list");

// Définition du contenu de liste_Des_Elements_A_Masquer 
var liste_Des_Elements_A_Masquer = new Array()
liste_Des_Elements_A_Masquer=liste_Des_Elements_A_Masquer.concat(

document.getElementById("rtl_adstop"),
getElementsByAttribute(document.getElementById("rtl_body"),"*", "class", "adlink"),
getElementsByAttribute(document.getElementById("hat"),"a", "href"),
getElementsByAttribute(document.getElementById("header"),"*", "class", "onair"),
getElementsByAttribute(document.getElementById("header"),"*", "class", "menu"),
document.getElementById("rtl_full"),
getElementsByAttribute(document.getElementById("rtl_body"),"*", "class", "tools"),
getElementsByAttribute(document.getElementById("rtl_body"),"*", "class", "text"),
getElementsByAttribute(document.getElementById("rtl_body"),"*", "class", "afp"),
getElementsByAttribute(document.getElementById("rtl_body"),"*", "class", "pollQuestion"),
getElementsByAttribute(document.getElementById("rtl_body"),"*", "class", "carrousel horizontal"),
getElementsByAttribute(document.getElementById("rtl_body"),"*", "class", "temoins"),
getElementsByAttribute(document.getElementById("rtl_body"),"*", "class", "actualite_images"),
getElementsByAttribute(document.getElementById("rtl_body"),"*", "class", "blogs"),
getElementsByAttribute(document.getElementById("rtl_body"),"*", "class", "tools"),
getElementsByAttribute(document.getElementById("rtl_body"),"*", "class", "text"),
document.getElementById("rtl_right"),
document.getElementById("rtl_insert_footer"),
getElementsByAttribute(document.getElementById("footer"),"a", "href", "http://www.rtl.fr/frequences"),
getElementsByAttribute(document.getElementById("footer"),"a", "href", "http://www.rtl.fr/mobile"),
getElementsByAttribute(document.getElementById("footer"),"a", "href", "http://www.rtl.fr/aide"),
getElementsByAttribute(document.getElementById("footer"),"*", "title", "Devenez fan de la page Facebook RTL"),
getElementsByAttribute(document.getElementById("footer"),"*", "title", "Suivez-nous sur le Twitter RTL"),
element1[1],
element1[4],

// http://www.rtl.fr/podcasts
getElementsByAttribute(document.getElementById("rtl_body"),"a", "href", "http://phobos.apple.com/*"),
getElementsByAttribute(document.getElementById("rtl_body"),"*", "class", "toolbar_mea"),
// http://www.rtl.fr/*
getElementsByAttribute(document.getElementById("rtl_body"),"*", "class", "toolbar_filter"),
getElementsByAttribute(document.getElementById("rtl_body"),"*", "class", "toolbar_other"),
getElementsByAttribute(document.getElementById("rtl_body"),"*", "class", "toolbar_coms"),
getElementsByAttribute(document.getElementById("rtl_body"),"a", "title", "Témoigner en images")



)



// Masquage de tous les éléments de liste_Des_Elements_A_Masquer 
for ( i=0; i <= liste_Des_Elements_A_Masquer.length; i++ )  {
	if (liste_Des_Elements_A_Masquer[i]!=null){
		liste_Des_Elements_A_Masquer[i].setAttribute("style", "display: none");	
	}
}


