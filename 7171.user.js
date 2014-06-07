// ==UserScript== 
// @name                broken images 
// @namespace           tag:zzedar@gmail.com,2006-01-20:brokenimages
// @description         show broken image outlines 
// @include             *
// ==/UserScript== 

var allImgs = document.getElementsByTagName("img").wrappedJSObject;

for (var i in allImgs) {
  /*Use getAttribute rather than hasAttribute in order to deal with images
    that have an empty string for src*/
  if (allImgs[i].getAttribute("src")) { allImgs[i].onerror = fix; }
}

function fix() {
  if (this.complete) {
    this.width = Math.max(this.width, 24);
    this.height = Math.max(this.height, 24);
    this.style.MozForceBrokenImageIcon = 1;
  }
}