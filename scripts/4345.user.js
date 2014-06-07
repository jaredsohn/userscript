// ==UserScript==
// @name          CPAN Search - 100 results per page
// @namespace     http://www.unixdaemon.net/gmscripts/
// @description   Show 100 entries in each page of search results
// @include       http://search.cpan.org/search*
// ==/UserScript==

(function() {
  if (!(window.location.href.match(/\&n=/))) {
    window.location.replace(window.location + "&n=100");
  } else {
    if (!(window.location.href.match(/\&n=100/))) {
      if (window.location.href.match(/\&n=\d+/)) {
        window.location.replace(window.location.href.replace(/\&n=\d+/, "&n=100"));
      }
    }
  }

})();
