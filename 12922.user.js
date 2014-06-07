// ==UserScript==
// @name        Reddit Zebra-izer (Alternate)
// @namespace   http://loonyone.livejournal.com
// @description Highlight alternate rows on reddit.com
// @creator     Manpreet Singh |junkblocker<at>yahoo<dot>com|
// @include     http://reddit.com
// @source      http://userscripts.org/scripts/show/12922
// @identifier  http://userscripts.org/scripts/source/12922.user.js
// @include     http://*.reddit.com
// @include     http://reddit.com/
// @include     http://*.reddit.com/
// @include     http://reddit.com/*
// @include     http://*.reddit.com/*
// @namespace   http://loonyone.livejournal.com
// @version     0.6
// @date        2008-3-12
// ==/UserScript==

// Changelog
// ==========
// Version 0.6 - Disable future updates as the basic premise of the script is incorrect
// 0.5 - Undid the darker color which was changed due to a bad display
// 0.4 - Made the default color darker
//       Allow easy customization
// 0.3 - Update for new reddit
// 0.2 - Added auto update facility
// 0.1 - First release

(function() {

  // CHANGE THE LINE BELOW TO CHANGE COLOR. For example     var color = 'cyan';

  var color = '#f0f0f0';

  GM_addStyle(".oddRow {background-color: " + color + " !important}"); // leave it just in case reddit changes back to it
  GM_addStyle(".odd {background-color: " + color + " !important}");
})();