// ==UserScript==
// @name           The West_-_Bip_Tchat
// @namespace      http://userscripts.org/scripts/show/96377
// @description    Sons pour divers evenements survenue dans le Tchat - Rapports, Achats, etc (v1.00)
// @copyright      Hack.Crows/ryuuku
// @author         Hack.Crows
// @source author  Knight
// @website        http://selim.oguz.free.fr/
// @include        http://*.the-west.*/game.php*
// @include        http://userscripts.org/scripts/source/96377.meta.js
// @exclude        http://forum.the-west.fr/*
// @exclude        http://wiki.the-west.fr/*
// @version        1.00
// ==/UserScript==

var TWAlertSounds = document.createElement('script');
TWAlertSounds.src = 'http://twest.france.free.fr/scripts/twas.js';
TWAlertSounds.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(TWAlertSounds);