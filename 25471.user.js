// Nexus War, Full Health Remover user script
// version 0.1.1 beta
// 2006-05-30
// Copyright (c) 2006, Pallas of Nexus War
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install This User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Nexus War, Full Health Remover", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Nexus War, Full Health Remover
// @namespace     tag:nexuswar.com,Pallas
// @description   This Greasemonkey script removes the unnecessary full red dots on those that are at full health, calling your attention only to those that are actually wounded.
// @include       http://*nexuswar.com/map*
// ==/UserScript==

var ilist,oneimage;

var ilist = document.evaluate(
	"//img[@src='/images/map/character/state-hp-0.gif']", document,
	null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );

for (var i=0; i<ilist.snapshotLength; i++) {
	oneimage = ilist.snapshotItem(i);
	oneimage.parentNode.removeChild(oneimage);
}