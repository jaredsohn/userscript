// ==UserScript==
// @name           Don't register on SoonNight
// @namespace      http://blog.kodono.info/wordpress/greasemonkey/
// @description    Pas besoin de s'enregistrer pour voir une photo sur SoonNight
// @version        2007090100
// @include        http://www.soonnight.com/*
// ==/UserScript==

for (var i=0; i < document.getElementsByTagName("IMG").length; i++) {
  var img = document.getElementsByTagName("IMG")[i];
  if (img.className == "imgBordurePhotos") {
    var imgSrc = img.src.replace("/photo_p/","/photos/"); // change url
    img.parentNode.href = imgSrc; // change le lien
  }
}