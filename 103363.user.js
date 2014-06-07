// Bashfr's Notes user script
// version 1.0
// 22/05/2011
// Copyright (c) 2011, Louis Brunner
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: https://addons.mozilla.org/en-US/firefox/addon/748
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Bashfr's Notes", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           Bashfr's Notes
// @namespace      http://www.hyrrmadr.net/
// @description    Automatically calculate the score according to the users' votes on BashFR/DTC.
// @include        http://danstonchat.com/*
// @include        http://bashfr.org/*
// ==/UserScript==

/* BASHFR'S NOTES USER SCRIPT */
// Définition des RegExp
var rep = /^\([+]\) ([0-9]+)$/g;
var rem = /^\(\-\) ([0-9]+)$/g;

// Récupération du tableau des balises contenant les votes
var t = document.getElementsByClassName("item-infos");

// Variables récurrentes à chaque boucle 
var l = t.length, i = 0;
var node, np, nm, all, note, elem, text;

// Parcours du tableau
for(i = 0; i < l; i++)
{
	// Récupération du noeud parent
	node = t[i];
	
	// Récupération, parsage et conversion des votes (+) et (-)
	np = parseInt(node.getElementsByClassName("voteplus")[0].innerHTML.replace(rep, "$1"));
	nm = parseInt(node.getElementsByClassName("voteminus")[0].innerHTML.replace(rem, "$1"));
	
	// Calcul de la note
	all = np + nm;
	note = parseInt((np / all) * 10);
	
	// Création de l'élément qui contient la note
	elem = document.createElement("a");
	elem.className = "voteplus"; // Ajout d'une CLASS
	elem.id = "note"; // Ajout d'un ID
	elem.setAttribute("title", "Note générée par le script GreaseMonkey Bashfr's Notes"); // Ajout d'un title
	elem.innerHTML = "Note : " + note; // Définition de la note
	node.insertBefore(elem, node.getElementsByClassName("item-notice")[0]); // Insertion devant les notifications
	
	// Création de l'élément qui sert de séparateur
	text = document.createElement("text"); // Création
	text.innerHTML = " - ";	 // Définition du séparateur
	node.insertBefore(text, node.getElementsByClassName("voteplus")[1]); // Insertion devant la note
}