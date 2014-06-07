// ==UserScript==
// @name          Bei-uns.de Back to Posteingang
// @description   Nach Senden wieder in den Posteingang
// @include       */nachrichten/verfassen/erfolgreich*
// ==/UserScript==

//
// By Madboy 2008
//

var vheck = confirm("Back zum Posteingang?");
if(vheck == true){
  var peurl = "http://" + window.location.host + "/nachrichten/posteingang/";
  window.location.href = peurl;
}


