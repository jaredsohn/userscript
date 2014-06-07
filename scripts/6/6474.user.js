
//Check boxes 
// version 0.1 BETA!
// 2006-11-22
// Copyright (c) 2005, Tamas Amon
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
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Check boxes
// @namespace     http://linkfelho.amon.hu/
// @description   check all checkboxes ar none or invert
// @include       *
// ==/UserScript==

var allchecks, thisLink;
allchecks = document.evaluate(
    '//input[@type="checkbox"]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
window.setTimeout(function() {
if (allchecks.snapshotLength) {
  var logo = document.createElement("div");
  logo.innerHTML = '<div style="background-color: black; margin:0;padding:0;color:white; text-align: center;">Checkboxes check: <a href="#" id="_all" style="color: white">All</a> <a href="#" id="_none" style="color: white">None</a> <a href="#" id="_invert" style="color: white">Invert</a></div>';
  document.body.insertBefore(logo, document.body.firstChild);
  
  _all = document.getElementById('_all');
	_all.addEventListener('click', function(event) {for (var i = 0; i < allchecks.snapshotLength; i++) {thisLink = allchecks.snapshotItem(i);thisLink.checked = true;event.preventDefault();}}, true)
  _none = document.getElementById('_none');
	_none.addEventListener('click', function(event) {for (var i = 0; i < allchecks.snapshotLength; i++) {thisLink = allchecks.snapshotItem(i);thisLink.checked = false;event.preventDefault();}}, true)
  _invert = document.getElementById('_invert');
	_invert.addEventListener('click', function(event) {for (var i = 0; i < allchecks.snapshotLength; i++) {thisLink = allchecks.snapshotItem(i);thisLink.checked = !thisLink.checked;event.preventDefault();}}, true)
}
},60);
