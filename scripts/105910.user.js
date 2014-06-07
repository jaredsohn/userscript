// ==UserScript==
// @name            4players AD Blocker
// @namespace       4players AD Blocker
// @description     Die nervigen "Sie haben einen Ad Blocker installiert" Meldungen entfernen
// @include         http://*4players.de*
// ==/UserScript==

document.getElementsByTagName("body")[0].onload = function(e) {
  for( var i=0; i<document.getElementsByTagName("div").length; i++ ) {
    if( document.getElementsByTagName("div")[i].innerHTML.search(/WERBUNG NOT FOUND/) != -1 ) {
      document.getElementsByTagName("div")[i].style.display = 'none'
    }
  }
}