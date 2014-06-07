// ==UserScript==
// @name           Gamedev.net IOTD Gallery Image remove link target
// @namespace      http://asztal.net/userscripts
// @description    Removes link target from pictures, so that auto-scrolling is possible.
// @include        http://www.gamedev.net/community/forums/galleryimage.asp?*
// ==/UserScript==

(function(){
  var links = document.links;
  for(var i = 0; i < links.length; ++i) {
    links[i].removeAttribute("href");
  }
})()