// Clean Google user script
// version 0.1 BETA!
// 2010-05-31
// Copyright (c) 2010, Thomas Palmer
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select this script, and click Uninstall.
//
// --------------------------------------------------------------------
//
// Anti fade part from:
// Disable Google Fade-in Homepage
// http://googlesystem.blogspot.com
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Clean Google
// @namespace     http://thomaspalmer.com/
// @description   Clean Google homepage
// @include       http://www.google.com/
// ==/UserScript==

var header = document.getElementById('ghead');
if (header) {
    header.parentNode.removeChild(header);
}
var footer = document.getElementById('footer');
if (footer) {
    footer.parentNode.removeChild(footer);
}
var cpFooter = document.getElementById('cpFooter');
if (cpFooter) {
    cpFooter.parentNode.removeChild(cpFooter);
}
var ds = document.getElementById('ds');
if (ds) {
    ds.parentNode.removeChild(ds);
}

(function () {
    var css =  '#fctr,#ghead,#pmocntr,#sbl,#tba,#tbe,.fade,.gbh { opacity: 100 !important; filter:alpha(opacity=1) !important; }';
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