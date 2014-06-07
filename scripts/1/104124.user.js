// SEMissourian Paywall
// version 0.1
// 0.1 initial version created
// last change: 03/06/2011
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: https://addons.mozilla.org/en-US/firefox/addon/748
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "SEMissourian Paywall", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          SEMissourian Paywall
// @namespace     
// @description   redirect SEMissourian to content via google
// @include       http://*.semissourian.com/*
// @include 	  http://www.google.com/url?*
// ==/UserScript==


var ggl_url = "http://www.google.com/url?sa=t&source=web&url=";

var story_links = document.evaluate(
    "//a[starts-with(@href, 'http://www.semissourian.com/story/')]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

var alink;

for (var i = 0; i < story_links.snapshotLength; i++) {
    alink = story_links.snapshotItem(i);
    if (alink.href.match(/\/story\/\d+\.html/)) {
        alink.href = ggl_url + alink.href;
    }
}

//var u = window.location.href;
//if(u.indexOf('http://www.google.com/url?')!=-1 && u.indexOf('semissourian')!=-1 ){
//    window.location.replace(document.links[0]);
//}