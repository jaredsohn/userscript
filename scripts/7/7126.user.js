// ==UserScript==
// @name          ScrollToY
// @namespace     http://henrik.nyh.se
// @description   Automatically scrolls to some vertical position on page load, to facilitate browsing e.g. image galleries with big headers. To configure the vertical position, scroll there and run "javascript:GM_setY()" in the address bar, ideally as a bookmarklet with the keyword "y". The position is saved per host, ignoring "www." – so setting a position at "http://www.example.com/foo" will scroll there when visiting "http://example.com/bar", but not "http://two.example.com/foo".
// @include       *
// ==/UserScript==


// Scrolling to stored y

var ys = eval(GM_getValue('ys', '({})'));
var host = location.hostname.replace( /^www\./i, '');
var y = ys[host];

function scrollToY() {
  scrollTo(window.pageXOffset, y);
}

if (y) {
  scrollToY();
  if (y && window.pageYOffset != y)  // Wait for images to load and extend page
    window.addEventListener("load", scrollToY, false);
}


// Storing y

unsafeWindow.GM_setY = function(){
  ys[host] = window.pageYOffset;
  // Wrapped in setTimeout for http://wiki.greasespot.net/0.7.20080121.0_compatibility
  setTimeout(function() { GM_setValue('ys', ys.toSource()) }, 0);
};
