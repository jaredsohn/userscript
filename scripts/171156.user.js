// ==UserScript==
// @name        replace channel numbers
// @namespace   http://localhost
// @description Replace bogus channel numbers with currently correct ones...
// @include     http://tvlistings.zap2it.com/tvlistings/ZCGrid.do?loginRedirectReq=true
// @version     1
// @grant       none
//
//  I consider this script somewhat broken - BUT it does function.  
//  Zap2it offers a set of 'providers' that is inadequate for many - a small local system
//  often offers a subset of channels (and from multiple sources).  An equivalent subset of
//  favorite channels can be selected from the given providers, but the wrong channel will 
//  show up in the listing.  This script allows for swapping channels numbers to be displayed.
//
//  This was my first clumsy attempt at a script.  I'm sure it can be made more effeint,
//  and currently the logo for the station disappear when run.  But I'm using it...
//
// ==/UserScript==

textNodes = document.evaluate( 
"//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 

// NBC //
var searchRE = new RegExp('393','gi'); 
var replace = '2'; 
for (var i=0;i<textNodes.snapshotLength;i++) { 
var node = textNodes.snapshotItem(i); 
node.data = node.data.replace(searchRE, replace); 
}

// CBS //
var searchRE = new RegExp('5','gi'); 
var replace = '3'; 
for (var i=0;i<textNodes.snapshotLength;i++) { 
var node = textNodes.snapshotItem(i); 
node.data = node.data.replace(searchRE, replace); 
}

// ABC //
var searchRE = new RegExp('396','gi'); 
var replace = '4'; 
for (var i=0;i<textNodes.snapshotLength;i++) { 
var node = textNodes.snapshotItem(i); 
node.data = node.data.replace(searchRE, replace); 
}

// Hallmark //
var searchRE = new RegExp('312','gi'); 
var replace = '6'; 
for (var i=0;i<textNodes.snapshotLength;i++) { 
var node = textNodes.snapshotItem(i); 
node.data = node.data.replace(searchRE, replace); 
}

// ION //
var searchRE = new RegExp('26','gi'); 
var replace = '7'; 
for (var i=0;i<textNodes.snapshotLength;i++) { 
var node = textNodes.snapshotItem(i); 
node.data = node.data.replace(searchRE, replace); 
}

// CARTOON //
var searchRE = new RegExp('296','gi'); 
var replace = '12'; 
for (var i=0;i<textNodes.snapshotLength;i++) { 
var node = textNodes.snapshotItem(i); 
node.data = node.data.replace(searchRE, replace); 
}

// HLN //
var searchRE = new RegExp('204','gi'); 
var replace = '15'; 
for (var i=0;i<textNodes.snapshotLength;i++) { 
var node = textNodes.snapshotItem(i); 
node.data = node.data.replace(searchRE, replace); 
}

// FOX NEWS //
var searchRE = new RegExp('360','gi'); 
var replace = '16'; 
for (var i=0;i<textNodes.snapshotLength;i++) { 
var node = textNodes.snapshotItem(i); 
node.data = node.data.replace(searchRE, replace); 
}

// DISCOVERY //
var searchRE = new RegExp('278','gi'); 
var replace = '17'; 
for (var i=0;i<textNodes.snapshotLength;i++) { 
var node = textNodes.snapshotItem(i); 
node.data = node.data.replace(searchRE, replace); 
}

// FX //
var searchRE = new RegExp('248','gi'); 
var replace = '18'; 
for (var i=0;i<textNodes.snapshotLength;i++) { 
var node = textNodes.snapshotItem(i); 
node.data = node.data.replace(searchRE, replace); 
}

// NATGEO //
var searchRE = new RegExp('276','gi'); 
var replace = '19'; 
for (var i=0;i<textNodes.snapshotLength;i++) { 
var node = textNodes.snapshotItem(i); 
node.data = node.data.replace(searchRE, replace); 
}

// TBS //
var searchRE = new RegExp('247','gi'); 
var replace = '21'; 
for (var i=0;i<textNodes.snapshotLength;i++) { 
var node = textNodes.snapshotItem(i); 
node.data = node.data.replace(searchRE, replace); 
}

// GOLF //
var searchRE = new RegExp('218','gi'); 
var replace = '22'; 
for (var i=0;i<textNodes.snapshotLength;i++) { 
var node = textNodes.snapshotItem(i); 
node.data = node.data.replace(searchRE, replace); 
}

// TNT //
var searchRE = new RegExp('243','gi'); 
var replace = '23'; 
for (var i=0;i<textNodes.snapshotLength;i++) { 
var node = textNodes.snapshotItem(i); 
node.data = node.data.replace(searchRE, replace); 
}

// HISTORY //
var searchRE = new RegExp('79','gi'); 
var replace = '24'; 
for (var i=0;i<textNodes.snapshotLength;i++) { 
var node = textNodes.snapshotItem(i); 
node.data = node.data.replace(searchRE, replace); 
}

// WEATHER //
var searchRE = new RegExp('362','gi'); 
var replace = '25'; 
for (var i=0;i<textNodes.snapshotLength;i++) { 
var node = textNodes.snapshotItem(i); 
node.data = node.data.replace(searchRE, replace); 
}

// USA //
var searchRE = new RegExp('242','gi'); 
var replace = '29'; 
for (var i=0;i<textNodes.snapshotLength;i++) { 
var node = textNodes.snapshotItem(i); 
node.data = node.data.replace(searchRE, replace); 
}

// TNT //
var searchRE = new RegExp('304','gi'); 
var replace = '31'; 
for (var i=0;i<textNodes.snapshotLength;i++) { 
var node = textNodes.snapshotItem(i); 
node.data = node.data.replace(searchRE, replace); 
}
