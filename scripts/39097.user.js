// ==UserScript==
// @name           NaturalChimieForum
// @namespace      NaturalChimie
// @description    Place automatiquement le code de sécurité quand on répond a un sujet
// @include        http://www.naturalchimie.com/forum.html/thread/*/replyForm
// @author        w.gattor@laposte.net
// ==/UserScript==

/*
Ce script permet de faciliter les réponses dans les forums du jeu natural chimie.
Plus besoin de taper le code à chaque réponse. Le script le fait pour vous.
*/

/* onrécupére la valeur de sécurité */
var hiti = document.getElementById("form").getElementsByTagName("strong")[2].innerHTML;

/*on l'injecte dans la case correspondante*/
document.getElementById("security").value = hiti;