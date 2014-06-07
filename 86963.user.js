// ==UserScript==
// @name           CCLinkbar
// @namespace      http://userscripts.soft-me.de/cclinkbar.user.js
// @description  Fügt bei Schüler CC in der Chatleiste 2 Links ein. 
// @include        *.schueler.cc/*
// ==/UserScript==
span = document.createElement("span");
span.innerHTML = '<a style="font-size: 14px;" href="s,klasse,uebersicht.php#pinnwand">Pinnwand</a> <a style="font-size: 14px;" href="s,profil,anzeigen.php#gb">Mein GB</a>';
document.getElementById('Bar').appendChild(span);