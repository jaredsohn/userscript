// ==UserScript==
// @name        Handelsblatt Bilderstrecken ohne Werbung
// @namespace   @redd
// @include     *.handelsblatt.com*
// @version     1
// @grant       none
// @description Erkennt, ob eine Bilderseite als Werbung angezeigt wurde und läd das Bild erneut ohne Werbung
// ==/UserScript==


var _url = document.location.href.toString();
var new_url = _url.replace(/a=true/g, "a=false");

//window.alert(new_url);

if (new_url != _url) {
 document.location.href = new_url;
}