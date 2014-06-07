// ==UserScript==
// @name           Amazon short URI
// @namespace      http://www.foxking.org/
// @description    title attribute complition from alt text
// @include        *
// ==/UserScript==

(function() {
  var imgs = document.getElementsByTagName('img');

  for (var i = 0; i < imgs.length; i++) {
    var title = imgs[i].getAttribute('title');
    if (!title) { 
      imgs[i].setAttribute('title', imgs[i].getAttribute('alt'));
    }
  }
})();
