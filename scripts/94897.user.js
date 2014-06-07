// ==UserScript==
// @name          Fullkomlig Idioti - "Improved"
// @namespace     A complete rip-off!
// @description	  Adds 'Vilket, sjävfallet, är fullkomlig idioti.' to the end of articles in swedish newspapers. A "improved" version of HongKongStuntman's scrip "Fullkomlig Idioti"
// @include       http://news.google.se/*
// @include       http://www.svd.se/*
// @include       http://www.aftonbladet.se*
// @include       http://www.dn.se/*

// ==/UserScript==s


//aftonbladet.se
var allDivs, thisDiv;
allDivs = document.evaluate(
    "//div[@class='abBody']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
 		content = thisDiv.innerHTML; 
 		content+= '&nbsp;&nbsp;&#160; Vilket, sjävfallet, är fullkomlig idioti.';
		thisDiv.innerHTML = content; 
}

//svd.se
var allDivs2, thisDiv2;
allDivs2 = document.evaluate(
    "//div[@class='saplo:body']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs2.snapshotLength; i++) {
    thisDiv2 = allDivs2.snapshotItem(i);
 		content = thisDiv2.innerHTML; 
 		content+= 'Vilket, sjävfallet, är fullkomlig idioti.';
		thisDiv2.innerHTML = content; 
}

//dn.se
var allDivs3, thisDiv3;
allDivs3 = document.evaluate(
    "//div[@class='content-body']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs3.snapshotLength; i++) {
    thisDiv3 = allDivs3.snapshotItem(i);
 		content = thisDiv3.innerHTML; 
 		content+= '<font size="2em">Vilket, sjävfallet, är fullkomlig idioti.</font>';
		thisDiv3.innerHTML = content; 
}

//news.google.se
var allDivs5, thisDiv5;
allDivs5 = document.evaluate(
    "//div[@class='snippet']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs5.snapshotLength; i++) {
    thisDiv5 = allDivs5.snapshotItem(i);
 		content = thisDiv5.innerHTML; 
 		content+= 'Vilket, sjävfallet, är fullkomlig idioti.';
		thisDiv5.innerHTML = content; 
}