// ==UserScript==
// @name           no youtube autoplay
// @author	   abwasch - pennerhack.foren-city.de
// @namespace      no youtube autoplay
// @description    Blocked the automatic playing of YouTube videos.
// @include        *pennergame.de/profil/*
// @include        *clodogame.fr/profil/*
// @include        *mendigogame.es/profil/*
// @include        *menelgame.pl/profil/*
// @include        *dossergame.co.uk/profil/*
// @include        *serserionline.com/profil/*
// @include        *bumrise.com/profil/*
// @include        *faveladogame.com.br/profil/*
// ==/UserScript==

for (var i = 0; document.getElementsByTagName('embed')[i]; i++) document.getElementsByTagName('embed')[i].src = document.getElementsByTagName('embed')[i].src.replace(/autoplay=1/, 'autoplay=0');
