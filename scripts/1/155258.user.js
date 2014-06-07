// ==UserScript==
// @name       alec is butt lol
// @version   1.0a
// @description  lmao
// @match      http://*.nma-fallout.com/*
// @copyright  2012, lr
// ==/UserScript==

var allImgs,thisImg; 
allImgs = document.evaluate('//img[@src]', 
document, 
null, 
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
null);

for (var i=0;i<allImgs.snapshotLength;i++) { 
var thisImg = allImgs.snapshotItem(i); 
var src = thisImg.src; 
var srcMatch = src.match('^http://www.nma-fallout.com/forum/images/smiles/[^ ]*.gif'); 
if (srcMatch != null) { 
thisImg.src = 'http://i.imgur.com/H9ZQC.png'; 
}
}
//suck it nma lmao