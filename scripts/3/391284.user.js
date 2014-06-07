// ==UserScript==
// @name       Cloud to Butts
// @namespace  http://*/*
// @version    0.1
// @description  Converts the word cloud to butt. There used to be a plugin for that, but I can't find it, and the one that's there doesn't do cloud to butts (even though that is its name).
// @match      http://*/*
// @copyright  none, none of this is original
// ==/UserScript==

textNodes = document.evaluate( 
    "//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
var searchRE = new RegExp('Cloud','gi'); 
var replace = 'Butt'; 
for (var i=0;i<textNodes.snapshotLength;i++) { 
    var node = textNodes.snapshotItem(i); 
    node.data = node.data.replace(searchRE, replace);}

var searchRE = new RegExp('clouds','gi'); 
var replace = 'butts'; 
for (var i=0;i<textNodes.snapshotLength;i++) { 
    var node = textNodes.snapshotItem(i); 
    node.data = node.data.replace(searchRE, replace);}

var searchRE = new RegExp('cloud','gi'); 
var replace = 'butt'; 
for (var i=0;i<textNodes.snapshotLength;i++) { 
    var node = textNodes.snapshotItem(i); 
    node.data = node.data.replace(searchRE, replace);}

var searchRE = new RegExp('Clouds','gi'); 
var replace = 'Butts'; 
for (var i=0;i<textNodes.snapshotLength;i++) { 
    var node = textNodes.snapshotItem(i); 
    node.data = node.data.replace(searchRE, replace);}

var searchRE = new RegExp('CLOUD','gi'); 
var replace = 'BUTT'; 
for (var i=0;i<textNodes.snapshotLength;i++) { 
    var node = textNodes.snapshotItem(i); 
    node.data = node.data.replace(searchRE, replace);}

var searchRE = new RegExp('CLOUDS','gi'); 
var replace = 'BUTTS'; 
for (var i=0;i<textNodes.snapshotLength;i++) { 
    var node = textNodes.snapshotItem(i); 
    node.data = node.data.replace(searchRE, replace);}