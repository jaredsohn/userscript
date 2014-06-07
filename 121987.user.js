// ==UserScript==
// @name          Flickr Viewer
// @author        jnozsc
// @namespace     http://www.douban.com/people/1563045/
// @description   Across the Great Wall, we can view every pictures in the Flickr
// @include       *
// @match         http://*/*
// @version       1.2
// ==/UserScript==
(function () {
  var oldArray = new Array("farm3.staticflickr", "farm3.static.flickr", "farm5.staticflickr", "farm5.static.flickr", "farm6.staticflickr", "farm6.static.flickr", "farm7.staticflickr", "farm7.static.flickr");
  var newArray = new Array("ac4.farm3.staticflickr", "ac4.farm3.staticflickr", "ac4.farm5.staticflickr", "ac4.farm5.staticflickr", "bf1.farm6.staticflickr", "bf1.farm6.staticflickr", "bf1.farm7.staticflickr", "bf1.farm7.staticflickr");
  var allImages = document.images;
  if (allImages != null) {
    for (j = 0; j < allImages.length; j++) {
      if (allImages[j].src.indexOf("flickr.com") > 0) {
        for (i = 0; i < oldArray.length; i++) {
          if (allImages[j].src.indexOf(oldArray[i]) > 0) allImages[j].src = allImages[j].src.replace(oldArray[i], newArray[i]);
        }
      }
    }
  }
})();