// ==UserScript==
// @name          Expand Undeadly/OpenBSD Journal Comments
// @namespace     http://www.unixdaemon.net/gmscripts/
// @description   Expand the comments so the full text is visible.
// @include       http://undeadly.org/cgi?action=article*
// @include       http://www.undeadly.org/cgi?action=article*
// ==/UserScript==

(function() {

  if (!(window.location.href.match(/mode=expanded/))) {
    window.location.replace(window.location + "&mode=expanded");
  }
})();
