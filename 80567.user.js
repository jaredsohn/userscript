// ==UserScript==
// @name          Flickr confirm favoriting
// @namespace     http://henrik.nyh.se
// @description   Prompts to confirm favoriting/unfavoriting on Flickr so you don't do it by mistake.
// @include       http://www.flickr.com/photos/*
// ==/UserScript==

function isLeftButton(e) {
  return !(e.which > 1 || e.shiftKey || e.ctrlKey || e.altKey || e.metaKey);
}

document.addEventListener("click", function(e) {
  if ((e.target.id=="button-bar-fave" || e.target.className=="star") && isLeftButton(e) && !confirm("Really toggle favorite?") ) {
    e.preventDefault(); e.stopPropagation();
  }
}, true);
