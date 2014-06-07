// ==UserScript==
// @name        pay.reddit.com HTTPS Fix
// @description Fixes meta links on the pay.reddit.com domain
// @namespace   userscripts.org
// @match       https://pay.reddit.com/*
// @grant       none
// @version     1.0.0
// @license     GPL version 3; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==

(function() {
  var links = document.getElementsByTagName('a');

  for (var i = 0; i < links.length; i++) {
    var href = links[i].href;
    href = href.replace('https://www.reddit.com/',
      'https://pay.reddit.com/');

    if (links[i].href != href) {
      links[i].href = href;
    }
  }
})();
