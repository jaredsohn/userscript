
// Google Search on My Yahoo
// version 0.1
// 2005-05-26
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
// @name          Google Search on My Yahoo
// @namespace     http://www.joegrossberg.com/googlemyyahoo.user.js
// @description   use Google's search on the My Yahoo page
// @include       http://my.yahoo.com/*
// ==/UserScript==

(function() {

  window.addEventListener("load", function(e) {
  
  var searchform = document.getElementById("sf1");
  searchform.onsubmit = "void(null)";
  searchform.action = 'http://www.google.com/search?hl=en&btnG=Google+Search'
  var searchinput = document.getElementById("fp");
  searchinput.name = 'q';
  var subinput = document.getElementById("sub");
  subinput.value = 'Google Search';
  
  }, false);

})();

//
// ChangeLog
// 2005-05-27 - 0.2 - changes submit button label
//
