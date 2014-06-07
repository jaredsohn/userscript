// ==UserScript==
// @name           Don't Register on Avignon2Night
// @namespace      http://blog.kodono.info/wordpress/greasemonkey/
// @description    Plus besoin de s'enregistrer sur Avignon2Night pour voir la photo
// @version        2007080100
// @include        http://www.avignon2night.com/*
// ==/UserScript==

for (var i=0; i < document.getElementsByTagName("IMG").length; i++) {
  var img = document.getElementsByTagName("IMG")[i];
  var imgSrc = img.src.replace("/photos/thumbnail/","/photos/images/"); // change url
  img.parentNode.href = imgSrc; // change le lien
  img.parentNode.target = "_blank";
}