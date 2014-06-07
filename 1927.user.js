
// Delicious Tag Focus
// version 0.1
// 2005-08-11
// Copyright (c) 2005, Joe Grossberg
// under Creative Commons SA 1.0
// http://creativecommons.org/licenses/sa/1.0/
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
// select "Access Bar", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Delicious Tag Focus
// @namespace     http://www.joegrossberg.com/delicioustagfocus.user.js
// @description   auto-focus on the "tags" input
// @include       http://del.icio.us/*
// ==/UserScript==

(function() {

  window.addEventListener("load", function(e) {
  
  var tagfield = document.getElementById("tags");
  tagfield.focus();
  
  }, false);

})();

