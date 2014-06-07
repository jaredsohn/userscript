/* Flickr Profile Linker
   version 1.0.3
   2005-04-10
   By Sylvan Mably
   You can do pretty much whatever you like with this...
   ...as long as it isn't illegal. :)
*/

// ==UserScript==
// @name          Flickr Profile Linker
// @namespace     http://www.quasi.ca/flickr/
// @description   Links all Flickr users' icons to their profile instead of their photostream
// @include       http://www.flickr.com/*
// @include       http://flickr.com/*
// ==/UserScript==

(
function() {
  var imgs = document.getElementsByTagName("img");
  for (var i = 0; i < imgs.length; i++) {
    var img = imgs[i];
    if (img.src.match(/buddyicon/) &&
        img.parentNode.tagName == "A" &&
        img.parentNode.href.match(/flickr\.com\/photos\//)) {
      img.parentNode.href = img.parentNode.href.replace(/flickr\.com\/photos\//, "flickr.com/people/");
    }
  }
}
)();
