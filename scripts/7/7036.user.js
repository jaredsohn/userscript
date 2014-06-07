// Remove Sales From Netflix Queue
// version 0.1 BETA!
// 2007-01-09
// by Jim Biancolo
//
// Thanks to Mark Pilgrim for Dive Into Greasemonkey:
//   http://diveintogreasemonkey.org/
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
// select "Autosort Netflix Queue", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Remove Sales From Netflix Queue
// @namespace     http://www.biancolo.com
// @description   Removes those annoying sale links that clutter up your Netflix queue.
// @include       http://netflix.com/Queue*
// @include       http://*.netflix.com/Queue*
// ==/UserScript==


addGlobalStyle('.qpv { display: none ! important; }');

function addGlobalStyle(css) {
  var head, style;
  head = document.getElementsByTagName('head')[0];
  if (!head) { return; }
  style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = css;
  head.appendChild(style);
}

