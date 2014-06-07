// YoutubeCleanUp
// version 0.3
// 21-04-2007
// Copyright (c) 2007, Simon Potter
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
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
// select this script, and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          YoutubeCleanUp
// @namespace     http://hazexp.googlepages.com/greasemonkey
// @description   Removes the clutter from Youtube pages
// @include       http://www.youtube.com/
// @include       http://youtube.com/
// ==/UserScript==

var elements = ['gNavBottom', 'hpMainContent', 'footerDiv', 'hpSideContent'];

for (i = 0; i < elements.length; ++i)
    {
    var element = document.getElementById(elements[i]);
    if (element) {
        element.parentNode.removeChild(element);
        }
    }

var els = ['logoTagDiv', 'utilDiv', 'gNavDiv', 'searchDiv', 'upload'];

for (i = 0; i < els.length; ++i)
    {
    var el = document.getElementById(els[i]);
    if (el) {
        el.style.marginLeft = 'auto';
		el.style.marginRight = 'auto';
		el.style.padding = '0px';
		el.style.cssFloat = 'none';
		el.style.textAlign = 'center';
        }
    }	
	
var allDiv, thisDivS;
allDiv = document.evaluate(
    "//div[@class='tab']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < allDiv.snapshotLength; i++) {
    thisDivS = allDiv.snapshotItem(i);
    thisDivS.style.cssFloat = "none";
	thisDivS.style.display = "inline";
	thisDivS.style.position = "relative";
	thisDivS.style.bottom = "70px";
}

var hometip = document.getElementById('logoHomeTip');
hometip.parentNode.removeChild(hometip);
	
var baseDiv = document.getElementById('baseDiv');
baseDiv.style.width = '100%';
	
var logo = document.getElementById('logoTagDiv');
logo.style.width = '123px';
logo.style.position = "relative";
logo.style.top = "50px";

var userbar = document.getElementById('utilDiv');
userbar.style.position = "relative";
userbar.style.bottom = "63px";

var navigation = document.getElementById('gNavDiv');
navigation.style.position = "relative";
navigation.style.top = "90px";

var search = document.getElementById('searchDiv');
search.style.position = "relative";
search.style.top = "120px";
search.style.zIndex = "32768";

var upload = document.getElementById('upload');
upload.style.position = "relative";
upload.style.top = "50px";