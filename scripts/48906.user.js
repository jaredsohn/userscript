// ==UserScript==
// @name           Anti-POBSTAR
// @namespace      ZDNet
// @description    Filtre les messages de POBSTAR sur ZDNet
// @include        http://www.zdnet.fr/actualites/informatique/*
// ==/UserScript==

/** 
 * Prédicat qui dit si l'auteur est indésirable ou non.
 * Modifier le corps de cette fonction pour changer le prédicat de filtrage
 * Par défaut, ne filtre que POBSTAR.
 */ 
window.isIntrusive = function(author){
	return (author == 'POBSTAR' || author == 'POBSTAR1');
}

/**
 * Action appliquée à l'élément <li> contenant le commentaire indésirable
 * Par défaut, masque le texte, mais pas l'entête de l'auteur.
 * On pourrait aussi envisager une belle diarrhée chromatique du genre :
 *
 * li_element.getElementsByTagName('p')[1].setAttribute('style',"background-color:red;");
 *
 */
window.filter = function(li_element){
	li_element.getElementsByTagName('p')[1].style.display = "none";
}

/** 
 * MAIN
 * Parcourt l'ensemble des commentaires de ZDNet, puis applique 'filter' à tous
 * les commentaires répondant au prédicat 'isIntrusive'.
 */ 

var storytalkback = document.getElementById("storytalkback");

// Liste de tous les éléments <li> de la page
var li_list = storytalkback.getElementsByTagName('li');
for(i=0;i<li_list.length;i++){
	current_li = li_list[i];
	p_list = current_li.getElementsByTagName('p');
	// Récupération de l'auteur
	author = p_list[0].getElementsByTagName('cite')[0].getElementsByTagName('a')[0].innerHTML;
	// Vérification de l'auteur, et fermeture des éléments indésirables
	if(isIntrusive(author)){
		filter(current_li);
	}
}