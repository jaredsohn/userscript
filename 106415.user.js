// ==UserScript==
// @name           Remove about:home ads
// @namespace   about:home
// @description    removes the ads
// @include        about:home
// ==/UserScript==
document.onLoad= function(){
document.getElementById("snippetContainer").innerHTML = "<div align='center'>NO ADS!</div>";
}