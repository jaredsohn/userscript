// ==UserScript==
// @id          userjs@stoptonymeow.com
// @name        Stop Tony Meow
// @namespace   stoptonymeow.com
// @description Replace photos of Tony Abbott with pictures of cute kittens.
// @version     1.0
// @grant       none
// @homepage    http://stoptonymeow.com
// @developer   @taybenlor
// @developer   @dannolan
// @developer   @mattro
// @icon        http://stoptonymeow.com/assets/favicon.ico https://addons.cdn.mozilla.net/img/uploads/addon_icons/483/483629-64.png
// @screenshot  http://stoptonymeow.com/assets/browsers.jpg
// ==/UserScript==

// Full credit goes to the authors of the Stop Tony Meow extensions.

function meowify(image) {
  var possibleTone = '' + image.getAttribute('src') + image.getAttribute('alt') + image.getAttribute('title');
  if (possibleTone.match(/abbott/i)) {
    image.setAttribute('src', 'http://placekitten.com/' + image.clientWidth + '/' + image.clientHeight);
  }
}

function meowifyAllImages() {
  var images = document.querySelectorAll('img');
  for (var i = 0; i < images.length; i++){
    var e = images[i];
    
    if (e.complete) {
      meowify(e);
      continue;
    }
    
    (function(image){
      image.addEventListener('load', function(){
        meowify(image);
      });
    })(e);
  }
}

if (document.readyState === "complete") {
  meowifyAllImages();
} else {
  document.addEventListener('DOMContentLoaded', meowifyAllImages);
}
