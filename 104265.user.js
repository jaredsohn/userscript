// ==UserScript==
// @name                broken image icon
// @description         shows broken image placeholders even if alt text has been specified!
// @include             http://*
// ==/UserScript==

var allImgs = document.getElementsByTagName("img");

for (var i in allImgs) {
  if (allImgs[i].src) { 
    allImgs[i].addEventListener("error", fixImg, false); 
  }
}

function fixImg(event) {
  var img = event.target;
  img.removeEventListener("error", arguments.callee, false);
  if (img.complete) {

  	if (img.getAttribute("width")) {
  		img.width = img.getAttribute("width");
  	} else if(img.getAttribute("height")) {
  		img.width = img.getAttribute("height");
  	} else {
  		img.width = 24;
  	}

  	if (img.getAttribute("height")) {
  		img.height = img.getAttribute("height");
  	} else if(img.getAttribute("width")) {
  		img.height = img.getAttribute("width");
  	} else {
  		img.height = 24;
  	}

    img.style.MozForceBrokenImageIcon = 1;
  }
}