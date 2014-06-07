// ==UserScript==
// @name           FlashGot Gallery Broken Image Remover
// @namespace      www.highlanders.co.za
// @description    Removes broken images from the gallery built using the Build Gallery feature of FlashGot
// @include        file:///*
// ==/UserScript==

var allImgs = document.getElementsByTagName("img").wrappedJSObject;

for (var i = 0; i < allImgs.length; i++) {
	if (allImgs[i].getAttribute("src")) { allImgs[i].onerror = fix; }
}

function fix() {
  this.parentNode.parentNode.removeChild(this.parentNode);
}