// ==UserScript==
// @name           My Skitch URLs
// @description    Rewrites some of the default copyable URLs in My Skitch
// @version        0.1
// @include        http://skitch.com/*
// ==/UserScript==

(function(){
  
  var get = function(query, index) {
    return document.querySelectorAll('#content ' + query)[index];
  };
  var info = get('.myskitch-image-infotext', 0);
  var image = get('.myskitch-image-img', 0);
  var input = get('.myskitch-selectcopy-text', 3);
  
  if (info && image && input) {
    if (info.firstChild && info.firstChild.nodeValue) {
      var value = info.firstChild.nodeValue;
      value = value.split(' @ ')[0].replace(/px$/, '').split('x');
      if (value.length) {
        input.value = ['<img src="', image.src,
                       '" width="', value[0],
                       '" height="', value[1],
                       '">'
                      ].join('');
      }
    }
  }

})();