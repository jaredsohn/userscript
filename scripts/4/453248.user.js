// ==UserScript==
// @name        facebook-design
// @namespace   facebook-design
// @include     /^https?://(www\.)?facebook\.com(.*)$/
// @version     1.3
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==/UserScript==


function main(){
	// suppression de la colonne de droite (pub, jeux, groupes proposés... bref de l'inutile)
	$("#rightCol").remove();	

	// container global taille maximale
	$("#globalContainer").css("width", "100%"); 
	$("#globalContainer").css("padding-right", "0");

	$("#contentCol").css("margin", "0 190px 0 210px");
	$("#contentArea").css("width", "100%");

	$('#pagelet_friend_list_header').remove();
	
	// suppression de l'event du logo, remplacé par un lien normal (rechargement de page classique)
	var logoLink = $("#pageLogo a").get(0);
	logoLink.onclick = function(){window.location.href = logoLink.href};
}
main();