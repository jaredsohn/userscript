// ==UserScript==
// @name           AnimeCrazy Script
// @description    Script That Changes Some Things On Animecrazy.net
// @version        0.8
// @require        http://sizzlemctwizzle.com/updater.php?id=42791&days=1
// @require        http://userscripts.org/scripts/source/45988.user.js
// @include        http://www.animecrazy.net/*
// @include        http://animecrazy.net/*
// @author         Realfree
// ==/UserScript== 
//=============================
//  Temperarely update log
//0.1 Start of Project
//0.2 New Updater, Include is Updated
//0.3 Test Updater
//0.4 Minor Change
//0.5 Deletion Ad
//0.6 All Ads Gone
//0.7 Fixes
//0.8 episode bar
//=============================
//All Ads (Remove)
//=============================
//Top
var adtop = document.evaluate("//Div[@class='adtop']",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = adtop.snapshotLength - 1; i >= 0; i--) {
		var elm = adtop.snapshotItem(i);
		elm.parentNode.removeChild(elm);
	}
//Side
var adside = document.evaluate("//Div[@class='adside']",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = adside.snapshotLength - 1; i >= 0; i--) {
		var elm = adside.snapshotItem(i);
		elm.parentNode.removeChild(elm);
	}
//Bottom-Box
var adbox = document.evaluate("//Div[@class='adbox']",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = adbox.snapshotLength - 1; i >= 0; i--) {
		var elm = adbox.snapshotItem(i);
		elm.parentNode.removeChild(elm);
	}
//=============================
//Voting Bar (Remove)
//=============================
var Stl = document.evaluate("//Div[@style='background-color: rgb(235, 248, 254); padding: 8px;']",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = Stl.snapshotLength - 1; i >= 0; i--) {
		var elm = Stl.snapshotItem(i);
		elm.parentNode.removeChild(elm);
	}
//=============================
//You're watching (Remove)
//=============================
var Stl = document.evaluate("//Div[@class='urwatching']",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = Stl.snapshotLength - 1; i >= 0; i--) {
		var elm = Stl.snapshotItem(i);
		elm.parentNode.removeChild(elm);
	}
//=============================
//Last watched (Remove)
//=============================
var Stl = document.evaluate("//Div[@class='lastwatching']",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = Stl.snapshotLength - 1; i >= 0; i--) {
		var elm = Stl.snapshotItem(i);
		elm.parentNode.removeChild(elm);
	}
//============================
//Episode Bar
//============================
var epi = document.getElementsByClassName('episodeBottom')[0];
var epic = epi.cloneNode(true);
document.body.insertBefore(epic, document.getElementById('mirror'));
epi.parentNode.removeChild(epi); 