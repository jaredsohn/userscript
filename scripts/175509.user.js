// ==UserScript==
// @name           FB Sticker Shrinker
// @author         Michael Mitchell
// @version        1.0
// @namespace      http://userscripts.org/scripts/show/175509
// @description    Makes stickers smaller
// @include        *facebook.com*
// ==/UserScript==

function shrinkStickers() {
  var elements = document.getElementsByClassName('mvs');
  for (var i = 0; i < elements.length; i++) {
    var style = elements[i].style;
    var height = parseInt(style.height);
    if (height === 128) {
      style.height = '64px'
      style.width = '64px'
      style.backgroundSize = '64px 64px';
    }
  }
}

document.addEventListener("DOMNodeInserted", shrinkStickers, true);