// Remove Visited Links
// 20050412
// 
// Actual Javascript Code taken from Pornzilla's Hide Visited Links Bookmarklet
// Pornzilla: http://www.squarefree.com/pornzilla/
//
// Converted to a Greesemonkey User Script by Noviota ( http://noviota.com/ )
//
// Has no default includes on purpose!
// 
// ==UserScript==
// @name           Remove Visited Links
// @namespace      http://noviota.com/greasemonkey/removevisited.user.js
// @description    Removes Visited Links. Code taken from Pornzilla's 'Hide Visited Links' Bookmarklet
// @include        
// ==/UserScript==

(function(){
  var newSS, styles=':visited {display: none}';
  if(document.createStyleSheet) {
   document.createStyleSheet("javascript:'"+styles+"'");
  } else {
   newSS=document.createElement('link');
   newSS.rel='stylesheet';
   newSS.href='data:text/css,'+escape(styles);
   document.documentElement.childNodes[0].appendChild(newSS);
  }
 })();

