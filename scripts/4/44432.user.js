// ==UserScript==
// @name           bbcode board ogame .fr
// @namespace      Script
// @include         http://board.ogame.fr/pms.php?action=replypm&pmid=*
// @include         http://board.ogame.fr/pms.php?action=forwardpm&pmid=*
// @include         http://board.ogame.fr/newthread.php?boardid=
// @include         http://board.ogame.fr/addreply.php?threadid=*
// @include         http://board.ogame.fr/addreply.php?action=quote&postid=*
// @include         http://*.com/post.forum?mode=*
// @include         http://board.ogame.fr/editpost.php?postid=*
// ==/UserScript==

window.addEventListener("load", function()
{
var textarea = document.getElementsByTagName("textarea")[0];
var avantCurseur= textarea.value + "[CENTER][COLOR=skyblue][b][SIZE=12]"; //Mettre ici la mise en forme voulu à chaque message : entre les guillemets
var apresCurseur= "[/SIZE][/b][/color][/CENTER]";                             //Mettre ici la mise en forme voulu à chaque message
var taille = avantCurseur.length;
textarea.innerHTML=avantCurseur + apresCurseur;
textarea.focus();
textarea.setSelectionRange(taille, taille);
}, false);