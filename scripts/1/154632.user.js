// ==UserScript==
// @name        TitreCourtAgora
// @namespace   http://userscripts.org/users/498900
// @description Suppression fonction "titre court" d'agora
// @include     http://agora.ingerop.com/*
// @version     1
// ==/UserScript==

// Déclaration d'une variable avec portée globale
// http://www.siteduzero.com/tutoriel-3-379719-manipuler-le-code-html-partie-1-2.html
var length = 10000;
window.length = 20000;

alert(length);

// Docs à lire
// http://commons.oreilly.com/wiki/index.php/Greasemonkey_Hacks/Getting_Started#Add_or_Remove_Content_on_a_Page