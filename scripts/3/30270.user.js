// Google Results Hightlighter
// version 0.1
// Copyright (c) 2008, Sandaruwan Gunathilake
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
// select "Google Results Highlighter", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Google Results Highlighter
// @namespace     http://www.sandaru1.com/
// @description   highlight popular sites in google results
// @include       http://www.google.*/search?*
// ==/UserScript==

sites = [
	'en\.wikipedia\.org',
	'imdb\.com'
];

regex = [];
for (key in sites) {
    regex.push(new RegExp(sites[key],''));
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('.highlight { background-color: #FFFFEE; }');

var results,res,a;
results = document.evaluate(
    "//div[@class='g']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
    
var links = document.evaluate("//a[@class='l']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

for (var i = 0; i < results.snapshotLength; i++) {
    res = results.snapshotItem(i);
    href = links.snapshotItem(i).href;
    for(k=0; k < regex.length; k++) {
    	if (regex[k].test(href)) {
    		res.className = "g highlight";
    		break;
    	}
    }
}
