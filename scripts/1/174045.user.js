// ==UserScript==
// @name          Passpub-LGL
// @description   Just pass the pub of http://www.loups-garous-en-ligne.com/
// @include       http://www.loups-garous-en-ligne.com/jeu/index.php*
// ==/UserScript==

document.getElementById("lien").setAttribute("onclick", "adWatchedAfterAdblockCheck();");
