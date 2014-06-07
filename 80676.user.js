// ==UserScript==
// @name           Google Homepage Shortcut
// @namespace      googleShortcut
// @version 0.1.2
// @author Erik Vold
// @include *
// @exclude http://google.tld/
// @description Adds a 'alt+g' hotkey to all pages that will redirect you to the Google homepage.
// @homepageURL http://gist.github.com/462456
// ==/UserScript==

(function(d){
d.addEventListener('keydown', function(e) {
  // pressed alt+g
  if (e.keyCode == 71 && !e.shiftKey && !e.ctrlKey && e.altKey && !e.metaKey) {
   d.location = "http://google.com"; // go to google.
  }
}, false);
})(document);
