// ==UserScript==
// @name           Ambroisie : Paroles Mania
// @namespace      http://sites.google.com/site/projetambroisie/
// @include        http://www.parolesmania.com/*
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
element1=document.getElementById("footer_r")
if (element1 != null) {
	element1.appendChild(notification);
}
else {
	document.body.appendChild(notification);
}

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Modifications ponctuelles d'éléments existants ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
//Barre de recherche
element1=document.getElementById("aa")
if (element1 != null) {
	element_A_Modifier=getElementsByAttribute(document,"form", "action")
	if (element_A_Modifier.length > 0) {
		element1.appendChild(element_A_Modifier[0])
	}
}

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Masquage d'éléments ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */


// Définition du contenu de liste_Des_Elements_A_Masquer 
var liste_Des_Elements_A_Masquer = new Array()
liste_Des_Elements_A_Masquer=liste_Des_Elements_A_Masquer.concat(

document.getElementById("aa2"),
document.getElementById("tabs"),
getElementsByAttribute(document,"div","class", "thinbox"),
getElementsByAttribute(document,"a", "class", "let"),


// http://www.parolesmania.com/paroles_nolwenn_leroy_8924.html
getElementsByAttribute(document.getElementById("albums"),"a", "target"),

// http://www.parolesmania.com/paroles_nolwenn_leroy_8924/paroles_greensleeves_1132791.html
getElementsByAttribute(document.getElementById("albums"),"iframe", "src")


)



// Masquage de tous les éléments de liste_Des_Elements_A_Masquer 
for ( i=0; i <= liste_Des_Elements_A_Masquer.length; i++ )  {
	if (liste_Des_Elements_A_Masquer[i]!=null){
		liste_Des_Elements_A_Masquer[i].setAttribute("style", "display: none");	
	}
}


