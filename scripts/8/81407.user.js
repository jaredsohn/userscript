// Remove Chrome Ad from Google Homepage
// version 0.1
// 2010
// Copyleft (c) 2010, Will Robertson
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Remove Chrome Ad", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Remove Chrome Ad
// @description   Removes annoying chrome ad from Google
// @include       http://www.google.com/
// ==/UserScript==
//
// --------------------------------------------------------------------

(function () {
	var chrome = document.getElementById('pmocntr');
	chrome.innerHTML = '';

    var css =  '#fctr,#ghead,#pmocntr,#sbl,#tba,#tbe,.fade,.gbh { opacity: 1 !important; filter:alpha(opacity=100) !important; }';
    if (typeof GM_addStyle != 'undefined') {
      GM_addStyle(css);
	  } else if (typeof PRO_addStyle != 'undefined') {
      PRO_addStyle(css);
	  } else {
      var style = document.createElement('style');
      style.type = 'text/css';
      style.innerHTML = css;
      document.getElementsByTagName('head')[0].appendChild(style);
    }
})();