// ==UserScript==
// @name           LinkBucks Remover
// @namespace      monkeyisback
// @description    envoi direct vers megaupload, parce que linkbucks c'est de la pub et on n aime pas la pub.
// @include        http://*.blahetc.*/
// @include        http://*.linkbucks.*/
// @include        http://*.placepictures.*/
// @include        http://*.seriousurls.*/
// ==/UserScript==

window.location.href = document.getElementsByTagName('NOSCRIPT')[0].innerHTML.split('\"')[3];

// Après analyse ... ouais, y'a qu'une seule ligne de code nécéssaire... Ballot.