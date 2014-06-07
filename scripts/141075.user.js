// ==UserScript==
// @name           Waypoint Stuff
// @namespace      Daedalos42
// @description    Changes some stuff.
// @include        https://forums.halo.xbox.com/*
// @version        42.2.1
// ==/UserScript==

textNodes = document.evaluate( 
    "//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
var searchRE = new RegExp('Master of Unicorns', 'gi'); 
var replace = 'Smelly Poopface'; 
for (var i=0;i<textNodes.snapshotLength;i++) { 
    var node = textNodes.snapshotItem(i); 
    node.data = node.data.replace(searchRE, replace);
};

textNodes = document.evaluate( 
    "//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
var searchRE = new RegExp('Spartan -', 'gi'); 
var replace = 'Post Booster -'; 
for (var i=0;i<textNodes.snapshotLength;i++) { 
    var node = textNodes.snapshotItem(i); 
    node.data = node.data.replace(searchRE, replace);
};
    
textNodes = document.evaluate( 
    "//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
var searchRE = new RegExp('Twitter', 'gi'); 
var replace = 'the Hipster Network'; 
for (var i=0;i<textNodes.snapshotLength;i++) { 
    var node = textNodes.snapshotItem(i); 
    node.data = node.data.replace(searchRE, replace);
};
    
textNodes = document.evaluate( 
    "//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
var searchRE = new RegExp('TAG AS FAVORITE', 'gi'); 
var replace = '****ING FAVOURITE DIS THREAD'; 
for (var i=0;i<textNodes.snapshotLength;i++) { 
    var node = textNodes.snapshotItem(i); 
    node.data = node.data.replace(searchRE, replace);
};
    
textNodes = document.evaluate( 
    "//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
var searchRE = new RegExp('Retweet', 'gi'); 
var replace = 'Share on the Hipster Network'; 
for (var i=0;i<textNodes.snapshotLength;i++) { 
    var node = textNodes.snapshotItem(i); 
    node.data = node.data.replace(searchRE, replace);
};
    
textNodes = document.evaluate( 
    "//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
var searchRE = new RegExp('dog', 'g'); 
var replace = 'cat'; 
for (var i=0;i<textNodes.snapshotLength;i++) { 
    var node = textNodes.snapshotItem(i); 
    node.data = node.data.replace(searchRE, replace);
};
    
textNodes = document.evaluate( 
    "//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
var searchRE = new RegExp('Medals:', 'gi'); 
var replace = 'Commendations:'; 
for (var i=0;i<textNodes.snapshotLength;i++) { 
    var node = textNodes.snapshotItem(i); 
    node.data = node.data.replace(searchRE, replace);
};
    
textNodes = document.evaluate( 
    "//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
var searchRE = new RegExp('Dog', 'g'); 
var replace = 'Cat'; 
for (var i=0;i<textNodes.snapshotLength;i++) { 
    var node = textNodes.snapshotItem(i); 
    node.data = node.data.replace(searchRE, replace);
};

textNodes = document.evaluate( 
    "//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
var searchRE = new RegExp('DOG', 'g'); 
var replace = 'CAT'; 
for (var i=0;i<textNodes.snapshotLength;i++) { 
    var node = textNodes.snapshotItem(i); 
    node.data = node.data.replace(searchRE, replace);
};

textNodes = document.evaluate( 
    "//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
var searchRE = new RegExp('Dormant Monitor', 'g'); 
var replace = 'In Cryo'; 
for (var i=0;i<textNodes.snapshotLength;i++) { 
    var node = textNodes.snapshotItem(i); 
    node.data = node.data.replace(searchRE, replace);
};

textNodes = document.evaluate( 
    "//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
var searchRE = new RegExp('Administration', 'g'); 
var replace = 'Supreme Overlord'; 
for (var i=0;i<textNodes.snapshotLength;i++) { 
    var node = textNodes.snapshotItem(i); 
    node.data = node.data.replace(searchRE, replace);
};