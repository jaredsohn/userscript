// ==UserScript==
// @name           Flickr Download Links
// @namespace      thehuey.com
// @description    Provides link to go download the image at different sizes
// @include        http://www.flickr.com/explore/interesting/7days/*
// ==/UserScript==

var imgs = document.getElementsByTagName("TD");
for (i=0;i<imgs.length;i++) {
 if (imgs.item(i).className == "Photo") {
  var src = imgs.item(i).childNodes[0].childNodes[0].src;
  var span = document.createElement("SPAN");
  span.innerHTML = "<A HREF='http://www.thehuey.com/flickr/?u=" + src + "'>Download</A>";
  imgs.item(i).appendChild(span);
 }
}