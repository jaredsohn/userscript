// ==UserScript==
// @name           FzzTitleImprover
// @namespace      none
// @include        http://*.fourmizzz.fr/*
// @include        http://*.antzzz.org/*
// @author         Juju31
// ==/UserScript==

var nomServeur = document.domain.split(".")[0].toUpperCase();
var pageCourrante = document.location.pathname.split("/")[1].split(".")[0];
var nomJeu = "Fourmizzz";

if (document.domain.split(".")[1] == "antzzz") {
	nomJeu = "Antzzz";
}
if(pageCourrante == "alliance"){
	var sousPage = document.URL.split("?")[1];
	
	if(sousPage == "forum_menu") sousPage = "Forum Interne";
	if(sousPage == "voirCandidature") sousPage = "Candidatures";
	if(sousPage == "messCollectif") sousPage = "Message Collectif";
	if(sousPage == null) sousPage = "Chat";
	
	pageCourrante += " - " + sousPage;
}

document.title = nomServeur +" | "+ pageCourrante +" | "+ nomJeu;
