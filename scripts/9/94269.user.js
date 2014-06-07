// ==UserScript==
// @name           wetteronline
// @namespace      ak
// @include        http://www.wetteronline.de/*
// ==/UserScript==

var framesets = document.getElementsByTagName("frameset");

for(var i = 0; i < framesets.length; i++) {
  var frameset = framesets[i];
  if(frameset.rows == "90,30,*") {
    frameset.rows = "0,30,*";
  }
}
