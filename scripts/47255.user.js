// ==UserScript==
// @name           Højopløsningsbilledelinks for Politiken, JyllandsPosten og Ekstra Bladet
// @namespace      http://userscripts.org/users/87736
// @description    Tilføjer "[Højopløsning]"-links under billederne der ligger i "/archive/".
// @include        http://politiken.dk/*
// @include        http://ibyen.dk/*
// @include        http://ekstrabladet.dk/*
// @include        http://jp.dk/*
// ==/UserScript==

var allImages, thisImage;
allImages = document.getElementsByTagName('img');
for (var i = 0; i < allImages.length; i++) {
  thisImage = allImages[i];
  if (thisImage.src.indexOf("/archive/") != -1) {
    var surfixId = thisImage.src.lastIndexOf(".jpg")
    if (surfixId != -1) {
      var newSrc = "";
      newSrc = thisImage.src.substr(0,surfixId-1) + "a.jpg";
      newElement = document.createElement('a');
      newElement.href = newSrc;
      newElement.textContent = "★";
      newElement.setAttribute( "style", "z-index: 10; position: absolute; background-color: white;opacity: .5; padding:1px; line-height:normal; font-size:12px;");
      newElement.setAttribute("title","Link til billede i høj opløsning");
      thisImage.parentNode.parentNode.insertBefore(newElement, thisImage.parentNode);
    }    
  }
}