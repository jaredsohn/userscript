// Reddit <3 vimperator
// version 0.1
// 17 January 2011
// Copyright (c) Marius Orcsik
// marius@habarnam.ro
// License: GPLv2 or later
//
// ==UserScript==
// @name            Reddit getting friendly with vimperator
// @namespace       http://userscripts.org/scripts/show/95075
// @description     Removes the onclick attributes from div and body elements which get hinted by vimperator.
// @include         http://reddit.com/*
// @include         http://*.reddit.com/*
// ==/UserScript==

(function() {
var body,ds,de;

// remove the onclick existent on the body element
body = document.getElementsByTagName("body").item(0);
body.removeAttribute("onclick");

// remove onclick on div.thing elements
ds = document.getElementsByTagName ("div");
for (var i = 0; i < ds.length; i++) {
  de = ds[i];
  if (de.getAttribute ("class") && de.getAttribute ("class").indexOf("thing") != -1 && de.getAttribute("onclick") ) {
      de.removeAttribute("onclick");
  }
}

// making visited links appear purple
GM_addStyle(".title.loggedin:visited { color: #551a8b ! important; }");

})();
