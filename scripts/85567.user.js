// ==UserScript==
// @name           motherless
// @namespace      pp_dot_com
// @include        http://*motherless.com/*
// ==/UserScript==

theMedia = document.getElementById("mediaspace");
if (theMedia != null) {
  theFile = theMedia.innerHTML.match(/file=([^\&]*)/)
  if (theFile != null && theFile.length > 1) {
    newLink = document.createElement("a");
    newLink.href = theFile[1];
    newLink.innerHTML = "download";
    theMedia.parentNode.insertBefore(newLink, theMedia.nextSibling);
  }
}