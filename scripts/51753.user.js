// ==UserScript== 
// @name          Underfilter
// @namespace     tag:opet@underskog.no,2001-06-17:underfilter
// @description   Fjerner kommentarer fra enkeltpersoner 
// @include       http://underskog.no/*  
// ==/UserScript== 

var allDivs, thisDiv, removeDiv; 
allDivs = document.evaluate( 
    "//div[@class='comment']",
    document, 
    null, 
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
    null); 
for (var i = 0; i < allDivs.snapshotLength; i++) { 
    thisDiv = allDivs.snapshotItem(i);
    // do something with thisDiv    
    if (thisDiv.innerHTML.match(/vis\/[brukernavn1her|brukernavn2her]/)) {
    	thisDiv.parentNode.removeChild(thisDiv);
    }
}