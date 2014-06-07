// shortLink
// (c) psyched 07
// ==UserScript==
// @name          shortLink
// @namespace     http://userscripts.org/users/33515;scripts
// @description   Verkuerzt lange Links die die Seiten zerreissen
// @include       http://forum.mods.de/bb/*
// ==/UserScript==

//------
var limit=75; //   Maximale Anzahl Buchstaben die als Link angezeigt werden sollen
//------


//  alle Links einsammeln
var allLinks=document.getElementsByTagName('a');

//  durchs Array gehen
for (var i=0; i<allLinks.length; i++) {

//  kein HTML-Tag innerhalb des <a>?
  if (!allLinks[i].innerHTML.match(/<img(.*)/gi) && allLinks[i].innerHTML.match(/(^(http\:|www\.))/gi)) {

    var linktext=allLinks[i].innerHTML;
    if (limit < linktext.length) {

//  Link verkuerzen
      linktext=linktext.substring(0, limit);
      linktext+='/[...]';
      allLinks[i].innerHTML=linktext;
    }
  }
}