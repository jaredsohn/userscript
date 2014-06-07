// ==UserScript==
// @name           Préformatage BBcode Forumactf
// @namespace      BBcode Forumactif
// @description    Un préremplisseur de textarea pour Forumactif
// @include        http://*.pro-forums.org/*
// @include		   http://*.ogameteam.com/*
// @include		   http://*.xooit.*/*
// @exclude		   http://*.*.*/post.forum?mode=editpost&p=*
// @exclude		   http://*.*/profile.php*
// @exclude		   http://*.*.*/posting.forum
// @exclude		   http://*.*.*/posting.php?mode=reply&t=*#previewBox
// @exclude		   http://*.ogameteam.com/posting.php?mode=editpost&p=*
// @exclude		   http://*.*.*/profile.forum?mode=editprofile&page_profil=signature
// ==/UserScript==

window.addEventListener("load", function()
{
var textarea = document.getElementsByTagName("textarea")[0];
var avantCurseur= textarea.value + "[b][color=white]"; //Mettre ici la mise en forme voulu à chaque message : entre les guillemets
var apresCurseur= "<br>Caly.[/color][/b]";                             //Mettre ici la mise en forme voulu à chaque message
var taille = avantCurseur.length;
textarea.innerHTML=avantCurseur + apresCurseur;
textarea.setSelectionRange(taille, taille);
}, false);