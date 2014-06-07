// ==UserScript==
// @name           Notif dans l'onglet Noeltweet
// @namespace      www.revolte.eu
// @description    Ce script affiche les notif dans le titre de l'onglet (like FB ?)
// @version        1.00
// @include        http://noeltweet.fr/*
// ==/UserScript==

// Script by Aurelien t'as vu ma grosse ?
setInterval('notif()', 1000);
function notif() 
{
   var caca;
   caca = parseFloat(document.getElementById("dbrd_tab_mention").innerHTML) +    parseFloat(document.getElementById("dbrd_tab_private").innerHTML) + parseFloat(document.getElementById("dbrd_tab_commented").innerHTML);
if (caca>0){document.title=("Noeltweet ("+caca+")");}
}