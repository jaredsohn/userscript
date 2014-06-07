// ==UserScript==
// @name                broken image placeholders
// @description         shows broken image placeholders even if alt text has been specified!
// @include             *
// ==/UserScript==

var allImgs = document.getElementsByTagName("img").wrappedJSObject;

for (var i in allImgs) {
  if (allImgs[i].src) { allImgs[i].onerror = fixImg; }
}

function fixImg() {
  if (this.complete) {

  	if (this.getAttribute("width")) {
  		this.width = this.getAttribute("width");
  	} else if(this.getAttribute("height")) {
  		this.width = this.getAttribute("height");
  	} else {
  		this.width = 24;
  	}

  	if (this.getAttribute("height")) {
  		this.height = this.getAttribute("height");
  	} else if(this.getAttribute("width")) {
  		this.height = this.getAttribute("width");
  	} else {
  		this.height = 24;
  	}

    this.style.MozForceBrokenImageIcon = 1;
  }
}