// ==UserScript==
// @name Mustachify.me-overskæg på billederne for Politiken, JyllandsPosten og Ekstra Bladet
// @namespace http://userscripts.org/users/87736
// @description Tilføjer overskæg på billederne der ligger i "/archive/" eller "/drfront/images/".
// @include http://politiken.dk/*
// @include http://ibyen.dk/*
// @include http://ekstrabladet.dk/*
// @include http://jp.dk/*
// ==/UserScript==

var allImages, thisImage;
allImages = document.getElementsByTagName('img');
for (var i = 0; i < allImages.length; i++) {
  thisImage = allImages[i];
  if (thisImage.src.indexOf("/archive/") != -1 || thisImage.src.indexOf("/drfront/images/")  ) {
    var surfixId = thisImage.src.lastIndexOf(".jpg")
    if (surfixId != -1) {
      thisImage.src = "http://mustachify.me/?src=" + thisImage.src;
    }
  }
}