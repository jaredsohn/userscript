//
// ==UserScript==
// @name          Renderosity file links
// @namespace     http://sparcman.net/Documents/
// @author        SparcMan
// @description	  Thumbs link to images instead of image webpage
// @include       http://www.renderosity.com/mod/gallery/*
// ==/UserScript==

// A quick and dirty script to change all the gallery thumbnail links
// to point to the image itself instead of the gallery page containing
// the image. Works well with the Instant Gallery script. This was
// only my second script I've ever made so there are probably cleaner
// ways to do this, but hey, it works. This is based off my
// Renderosity thumbs script which used the gallery.aethereality.net
// script by yoshi314 as a reference.

// 3/13/07 - Small update to assume jpg image even when thumbnail is
//           a gif file

// 3/16/07 - Thanks to LouCypher, I was able accomplish the same
//           task with a much cleaner script and I also have a
//           slightly better understanding of xpath and
//           parentNode. I may be able to use my newly discovered
//           powers for the forces of good and clean up my other
//           script as well.

var xpath = "//td[contains(@class, 'gallery_images_cell')]" +
            "//a[@href]/img[contains(@src, 'media/folder')]";

var links = document.evaluate(xpath, document, null,
            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

if (links.snapshotLength) {
  for (var i = 0; i < links.snapshotLength; i++) {
    var img, link;
    img = links.snapshotItem(i);
    link = img.parentNode;
    var idx = img.src.indexOf("/thumb_");
    if (idx > 0) {
      link.href= img.src.substr(0,idx) + "/file_" + img.src.substr(idx + 7);
      var gifidx = link.href.indexOf(".gif");
      if (gifidx > -1) link.href = link.href.substr(0,gifidx) + ".jpg" ;
    }
    else {
      link.href = img.src ;
    }
  }
}