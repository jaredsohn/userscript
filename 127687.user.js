// ==UserScript==
// @name           Jeuxvideo.com : Télécharger les vidéos en HD
// @namespace      http://www.jeuxvideo.com/
// @description    Affiche un lien pour télécharger les vidéos des tels que les CLIQ, Gaming Live, Vidéos de Jeux ou Chroniques. Basé en grand partie sur le script "Télécharger n'importe quelle vidéo" de bosam.
// @include        http://www.jeuxvideo.com/*
// @author	       B3rning14
// ==/UserScript==
/*
	Ce script est en partie basée sur le script de bosam "Jeuxvidéo.com : Télécharger n'importe quelle vidéo". (http://userscripts.org/scripts/show/42061).
	Les boutons podcasts & mp4 sont replacer par un seul et unique bouton qui permet de télécharger la vidéo en HD.
*/
var par = document.getElementById('barre_fonctions');
var pod = document.getElementById('pod');
var mp4 = document.getElementById('mp4');
var link_video = mp4.getElementsByTagName('a')[0].getAttribute('href');
link_video = link_video.replace('http://download.jeuxvideo.com/cgi-bin/gl_dl.cgi?file=', 'http://video.jeuxvideo.com/');
link_video = link_video.replace('low','high');
par.removeChild(pod).removeChild(mp4);
var li = document.createElement('li');
var a = document.createElement('a');
var span = document.createElement('span');
li.id = "telecharger";
a.href = link_video;
span.appendChild(document.createTextNode('Télécharger sur jeuxvideo.com'));
a.appendChild(span);
li.appendChild(a);
par.appendChild(li);