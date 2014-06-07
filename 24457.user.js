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
// @name           Friend Feed 100
// @namespace      http://internetducttape.com
// @description    View 100 items (max) on the Friend Feed homepage
// @include        http://friendfeed.com/
// ==/UserScript==

(function() {
  document.location = "http://friendfeed.com/?num=100";
})();
