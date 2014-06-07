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
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          IMDB Pro
// @namespace     http://localhost
// @description   Makes the Pro page visible without login. (Links still won't work tho).
// @include       http://pro.imdb.com/*
// @version       0.0.1
// ==/UserScript==

(function() 
{
   document.getElementById("thead").parentNode.removeChild(document.getElementById("thead"));
   var src = document.body.innerHTML;
   src = src.replace("opacity: 0.3","opacity: 1.0");

   document.body.innerHTML = src;
   return;
})();

// 0.0.1		First version.