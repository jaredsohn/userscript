// ==UserScript==
// @name           YouTube - [NO AUTOPLAY]
// @author	   tlb - since 2011
// @namespace      http://userscripts.org/scripts/show/113972
// @description    Blockierendes Auto-Play bei YouTube-Videos im Dossergame.
// @version        1.0.0
// @include        *bumrise.com/profil/*
// @include        *clodogame.fr/profil/*
// @include        *dossergame.co.uk/profil/*
// @include        *faveladogame.com.br/profil/*
// @include        *koeln.pennergame.de/profil/*
// @include        *mendigogame.es/profil/*
// @include        *menelgame.pl/profil/*
// @include        *pennergame.de/profil/*
// @include        *reloaded.pennergame.de/profil/*
// @include        *serserionline.com/profil/*
// ==/UserScript==

for (var i = 0; document.getElementsByTagName('embed')[i]; i++) document.getElementsByTagName('embed')[i].src = document.getElementsByTagName('embed')[i].src.replace(/autoplay=1/, 'autoplay=0');



