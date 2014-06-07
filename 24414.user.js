/*
  --------------------------------------------------------------------
  How to Install a Greasemonkey Script
  --------------------------------------------------------------------

  - You need the Firefox web browser - Download and install
  http://www.mozilla.com/en-US/firefox/

  - You need to install Greasemonkey - How-To
  http://internetducttape.com/2007/08/23/howto-install-firefox-extensions-screenshots/

  - Install this script - How-To
  http://internetducttape.com/2007/08/24/howto-use-firefox-greasemonkey-userscripts-screenshots/

  --------------------------------------------------------------------

*/

// ==UserScript==
// @name           Quotably Relinker
// @namespace      http://internetducttape.com
// @description    Convert direct links to Twitter tweets to use Quotably instead
// @include        http://twitter.com/*/statuses/*
// ==/UserScript==


(function() {
  document.location.hostname = "quotably.com";
})();
