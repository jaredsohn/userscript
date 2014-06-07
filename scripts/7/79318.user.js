// ==UserScript==
// @name           The West_-_Petite_icone
// @namespace      http://userscripts.org/scripts/show/79318
// @description    Retreci les items du jeu - Petit, Moyen, Normale (v1.00)
// @copyright      Hack.Crows/ryuuku
// @author         Hack.Crows
// @source author  Knight
// @website        http://selim.oguz.free.fr/
// @include        http://*.the-west.*/game.php*
// @include        http://userscripts.org/scripts/source/79318.meta.js
// @exclude        http://forum.the-west.fr/*
// @exclude        http://wiki.the-west.fr/*
// @version        1.00
// ==/UserScript==

var TWSmallInventPics = document.createElement('script');
TWSmallInventPics.src = 'http://twest.france.free.fr/scripts/twsip.js';
TWSmallInventPics.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(TWSmallInventPics);