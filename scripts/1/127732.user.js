// ==UserScript==
// @name           Remove Clear overlay from images
// @namespace      None
// @include        http://*.quickmeme.com/meme/*/
// ==/UserScript==

var imgs = document.getElementsByTagName("img");
for (var i = 0; i < imgs.length; i++) {
 if (imgs[i].src == "http://static.quickmeme.com/media/social/qm.gif") { 
  imgs[i].style.display = "none"; }
  }