// ==UserScript==
// @name          Mozilla.org Add-on Pages - 100 results per page
// @namespace     http://www.unixdaemon.net/gmscripts/
// @description   Show 100 entries in each page of extensions
// @include       https://addons.mozilla.org/extensions/showlist.php*
// @include       http://addons.mozilla.org/extensions/showlist.php*
// ==/UserScript==

(function() {
  if (!(window.location.href.match(/\&numpg=/))) {
    window.location.replace(window.location + "&numpg=100");
  } else {
    if (!(window.location.href.match(/\&numpg=100/))) {
      if (window.location.href.match(/\&numpg=\d+/)) {
        window.location.replace(window.location.href.replace(/\&numpg=\d+/, "&numpg=100"));
      }
    }
  }

})();
