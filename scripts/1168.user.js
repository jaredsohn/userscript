// ==UserScript==
// @name          SA Forums Threads New Window
// @namespace     http://cygnustm.com/gmscripts/
// @description	  Opens all SA Forums threads in a new window
// @include       http://*somethingawful.com/member2.php*
// @include       http://*somethingawful.com/forumdisplay.php*
// ==/UserScript==

(function() {
  for (var i=0; i < document.links.length; i++) {
    if (document.links[i].href.indexOf("showthread.php") > 0) {
      if (document.links[i].target != '') { break; }
      document.links[i].target = '_blank';
    }
  }
})();
