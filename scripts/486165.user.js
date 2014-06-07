// ==UserScript==
// @name       Walk to Wank
// @namespace  http://*/*
// @version    0.1
// @description  Converts the word walk to wank. There used to be a plugin for that, but I can't find it, and the one that's there doesn't do cloud to butts (even though that is its name).
// @match      http://*/*
// @copyright  none, none of this is original
// ==/UserScript==

textNodes = document.evaluate( 
    "//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
var searchRE = new RegExp('Walk','g'); 
var replace = 'Wank'; 
for (var i=0;i<textNodes.snapshotLength;i++) { 
    var node = textNodes.snapshotItem(i); 
    node.data = node.data.replace(searchRE, replace);}

var searchRE = new RegExp('walks','g'); 
var replace = 'wanks'; 
for (var i=0;i<textNodes.snapshotLength;i++) { 
    var node = textNodes.snapshotItem(i); 
    node.data = node.data.replace(searchRE, replace);}

var searchRE = new RegExp('walk','g'); 
var replace = 'wank'; 
for (var i=0;i<textNodes.snapshotLength;i++) { 
    var node = textNodes.snapshotItem(i); 
    node.data = node.data.replace(searchRE, replace);}

var searchRE = new RegExp('Walks','g'); 
var replace = 'Wanks'; 
for (var i=0;i<textNodes.snapshotLength;i++) { 
    var node = textNodes.snapshotItem(i); 
    node.data = node.data.replace(searchRE, replace);}

var searchRE = new RegExp('WALK','g'); 
var replace = 'WANK'; 
for (var i=0;i<textNodes.snapshotLength;i++) { 
    var node = textNodes.snapshotItem(i); 
    node.data = node.data.replace(searchRE, replace);}

var searchRE = new RegExp('WALKS','g'); 
var replace = 'WANKS'; 
for (var i=0;i<textNodes.snapshotLength;i++) { 
    var node = textNodes.snapshotItem(i); 
    node.data = node.data.replace(searchRE, replace);}