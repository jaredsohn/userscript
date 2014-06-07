// Darken
// version 0.1
// Gina Trapani
// 2007-05-10
// Released to the public domain.
//
// ==UserScript==
// @name          Darken
// @description   Turns a web pages' background Grey and text White for readability.
// @include       *
// ==/UserScript==
//
// ==RevisionHistory==
// Version 0.1:
// Released: 2007-05-10.
// Initial release.
// ==/RevisionHistory==

javascript:(function(){var newSS, styles='* { background: #333333 ! important; color: #FFFFFF ! important } :link, :link * { color: #FADB66 !important } :visited, :visited * { color: #17B6FC !important }'; if(document.createStyleSheet) { document.createStyleSheet("javascript:'"+styles+"'"); } else { newSS=document.createElement('link'); newSS.rel='stylesheet'; newSS.href='data:text/css,'+escape(styles); document.getElementsByTagName("head")[0].appendChild(newSS); } })();
//.user.js