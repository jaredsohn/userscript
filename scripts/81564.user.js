// ==UserScript==
// @name           Reddit Thumbnails
// @namespace      hertert.redditthumbnails
// @description    Make Reddit Thumbnails Bigger
// @include        http://reddit.com/*
// @include        http://www.reddit.com/*
// ==/UserScript==

function withJQuery(func) {
  if(!unsafeWindow.jQuery) {
    var s = document.createElement('script');
    s.src = 'http://code.jquery.com/jquery-1.1.2.js';

    s.addEventListener('load',function() {
      // lots of people like to have their own $ function
      unsafeWindow.jQuery.noConflict(); 
      func(unsafeWindow.jQuery);
    },false);

    document.getElementsByTagName('head')[0].appendChild(s);
  } else {
    func(unsafeWindow.jQuery);
  }
}

// your code goes here, use withJQuery when you need it
withJQuery(function($) {
	$('a.thumbnail img').css('width', '100%');
	$('a.thumbnail').css('width', '50%');
});