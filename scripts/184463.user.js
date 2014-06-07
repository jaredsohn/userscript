// ==UserScript==
// @name        Remove flickr logo from lightbox
// @namespace   http://b-burkhart.de
// @description As the name says.
// @include     http://*.flickr.com/photos/*
// @version     3
// @grant       none
// ==/UserScript==
unsafeWindow.setInterval(function() {
  var logoToRemove = document.getElementById("lightbox-logo");
  var unused = logoToRemove.parentElement.removeChild(logoToRemove);
}, 300);
