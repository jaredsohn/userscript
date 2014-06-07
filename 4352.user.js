// ==UserScript==
// @name          use.perl.org nested comments
// @namespace     http://www.unixdaemon.net/gmscripts/
// @description   Expand the comments using the nested view
// @include       http://use.perl.org/comments.pl*
// ==/UserScript==

(function() {

  if (!(window.location.href.match(/mode=nested/))) {
    window.location.replace(window.location + "&mode=nested");
  }
})();
