// ==UserScript==
// @name           FFFFOUND! replace with better image
// @namespace      http://d.hatena.ne.jp/youpy/
// @include        http://ffffound.com/*
// ==/UserScript==

with(unsafeWindow) {
  var __calc_scroll_map = calc_scroll_map;
  
  var calc_scroll_map = function() {
    Array.filter(document.getElementsByTagName('img'), function (e) {
      return !e.replaced && e.src.match(/_m/);
    }).forEach(function(e) {
      var image = new Image();
      e.replaced = true;
    
      image.addEventListener('load', function() {
        e.src = image.src;
        e.width = image.width;
        e.height = image.height;
      
        // xxx
        __calc_scroll_map();
      }, false);
      
      image.src = e.src.split(/_m/).join('');
    });
  };

  addEventListener('load', function() {
    calc_scroll_map();
  }, false);
}
