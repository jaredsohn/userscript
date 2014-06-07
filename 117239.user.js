// Darken_S
// version 0.1
// Sam
?? all credits goes to Gina Trapani
// 2011-04-11
// Released to the public domain.
//
// ==UserScript==
// @name          Darken_S
// @description   Turns a web pages' background Black and text White for readability.
// @include       *
// ==/UserScript==
//
// ==RevisionHistory==
// Version 0.1:
// Released: 2007-05-10.
// Initial release.
// ==/RevisionHistory==

javascript:(function(){var newSS, styles='* { background: #000000 ! important; color: #FFFFFF ! important } :link, :link * { color: #FADB66 !important } :visited, :visited * { color: #17B6FC !important }'; if(document.createStyleSheet) { document.createStyleSheet("javascript:'"+styles+"'"); } else { newSS=document.createElement('link'); newSS.rel='stylesheet'; newSS.href='data:text/css,'+escape(styles); document.getElementsByTagName("head")[0].appendChild(newSS); } })();
//.user.js