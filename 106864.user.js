// ==UserScript==
// @name           Ambroisie : Wikipedia
// @namespace      http://sites.google.com/site/projetambroisie/
// @include        http://fr.wikipedia.org/*
// ==/UserScript==

/* 
L'ensemble des scripts du Projet Ambroisie sont sous Copyright (© Lelong Anthony - 2011 - Tous droits réservés), et vous n'êtes pas autorisés à modifier, copier ou redistribuer ces scripts. Veuillez lire les conditions d'utilisation avant toute utilisation.
 */

/* Redirige simplement vers la page associée sur wikipedia mobile */

// Le titre de la page devient "Rediction..." 
var element_A_Modifier=document.getElementsByTagName("title")
if (element_A_Modifier!= []){
element_A_Modifier[0].innerHTML="Redirection..."
}

// Redirige vers la page associée sur wikipedia mobile
window.location.replace("http://fr.m.wikipedia.org/" + window.location.pathname)
