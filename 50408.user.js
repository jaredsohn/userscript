// ==UserScript==
// @name          Reddit Preview
// @namespace     http://jeffpalm.com/redditpreview
// @description   Provides a preview of any images that are reddit links
// @include       http://www.reddit.com/*
// @include       http://reddit.com/*
// ==/UserScript==

/*
 * Copyright 2009 Jeffrey Palm.
 */

var TESTING = false;
var IMAGE_EXTS = ["jpg",
                  "jpeg",
                  "png",
                  "gif",
                  "bmp",
                  "tiff",
                  ];

function isImage(url) {
  var parts = url.split(/\./);
  var ext = parts[parts.length-1].toLowerCase();
  for (var i=0; i<IMAGE_EXTS.length; i++) {
    if (ext == IMAGE_EXTS[i]) return true;
  }
  return false;
}

function main() {
  var divs = document.getElementsByTagName("div");
 outer: for (var i=0; i<divs.length; i++) {
    var div = divs[i];
    if (div.className != "entry") continue;
    var as = div.getElementsByTagName("a");
  inner: for (var j=0; j<as.length; j++) {
      var a = as[j];
      if (a.className != "title") continue;
      if (!isImage(a.href)) continue;
      var br = document.createElement("br");
      div.appendChild(br);
      var newA = document.createElement("a");
      newA.href = a.href;
      newA.target = "_";
      div.appendChild(newA);
      var img = document.createElement("img");
      img.src = a.href;
      img.style.width = "150px";
      newA.appendChild(img);
    }
  }
}

try {main();} catch (e) {if (TESTING) alert(e);}
