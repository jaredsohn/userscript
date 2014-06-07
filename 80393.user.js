// ==UserScript==
// @name        Reddit Zebra-izer (Alternate)
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

  var color = 'darkgrey';

  GM_addStyle(".oddRow {background-color: " + color + " !important}"); // leave it just in case reddit changes back to it
  GM_addStyle(".odd {background-color: " + color + " !important}");
})();