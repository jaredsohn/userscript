// ==UserScript==
// @name            Reddit Arrow Keys prev/next navigation
// @version         0.1
// @namespace       http://userscripts.org/users/141275
// @description     Left Arrow (prev) & Right Arrow (next) unless in input/textarea
// @include         http://*.reddit.com/*
// @grant           none
// ==/UserScript==

// enable jquery
var $ = unsafeWindow.jQuery;

$("body").keydown(function(e) {
    
  var tag = e.target.tagName.toLowerCase();

  if(tag != 'input' && tag != 'textarea') {
  
    if(e.keyCode == 37) { // left

        location.href = $("a[rel~=prev]")[0].href;
    }
    
    else if(e.keyCode == 39) { // right
        
        location.href = $("a[rel~=next]")[0].href;
    }
  }
});