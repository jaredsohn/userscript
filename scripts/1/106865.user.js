// ==UserScript==
// @name           Ambroisie : Wikipedia Mobile
// @namespace      http://sites.google.com/site/projetambroisie/
// @include        http://fr.m.wikipedia.org/*
// ==/UserScript==

/* 
L'ensemble des scripts du Projet Ambroisie sont sous Copyright (© Lelong Anthony - 2011 - Tous droits réservés), et vous n'êtes pas autorisés à modifier, copier ou redistribuer ces scripts. Veuillez lire les conditions d'utilisation avant toute utilisation.
 */


/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Notification en bas de la page ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
notification=document.createTextNode("Cette Page a été modifiée par Projet Ambroisie. Veuillez lire les conditions d'utilisation avant toute utilisation.")
document.body.appendChild(notification)



// Modifications ponctuelles d'éléments existants
//Modification du Texte des Boutons
contenu=document.getElementById("bodyContent")
if (contenu !=null){
	liste_Des_Sections=contenu.getElementsByTagName("h2");
	if (liste_Des_Sections!=null){
		for ( i=0; i < liste_Des_Sections.length; i++ )  {
			span=liste_Des_Sections[i].getElementsByTagName("span");
			liste_Des_Boutons=liste_Des_Sections[i].getElementsByTagName("button");	
			if (span !=null){
				texte=span[0].innerHTML
			}
			for ( j=0; j < liste_Des_Boutons.length; j++ )  {
				liste_Des_Boutons[j].innerHTML= liste_Des_Boutons[j].innerHTML + " " + texte
			}
		}
	}
}




// Définition du contenu de liste_Des_Elements_A_Masquer 
var liste_Des_Elements_A_Masquer = new Array()
liste_Des_Elements_A_Masquer=liste_Des_Elements_A_Masquer.concat(

document.getElementById("footmenu")

)


// Masquage de tous les éléments de liste_Des_Elements_A_Masquer 
for ( i=0; i <= liste_Des_Elements_A_Masquer.length; i++ )  {
	if (liste_Des_Elements_A_Masquer[i]!=null){
		liste_Des_Elements_A_Masquer[i].setAttribute("style", "display: none");	
	}
}


