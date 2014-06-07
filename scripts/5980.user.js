// ==UserScript==
// @name em411 google search
// @namespace http://www.em411.com/quicks
// @description Adds a google search to em411.com
// @include http://www.em411.com/*
// ==/UserScript==

var allLinks, tagSearchNode;
var googleSearch = document.createElement('a');
var bullet = document.createElement('Text');
bullet.innerHTML = " &#149 ";
googleSearch.setAttribute('style', 'cursor:pointer');
googleSearch.setAttribute('onclick', 'document.getElementById("googleSearch").style.display="block";');
googleSearch.innerHTML = "Google Search";
bullet.appendChild(googleSearch);
googleSearch = bullet;
allLinks = document.evaluate(
"//a[@href='/tag']",
document,
null,
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
null);
for (var i = 0; i < allLinks.snapshotLength; i++) {
tagSearchNode = allLinks.snapshotItem(i);
tagSearchNode.parentNode.insertBefore(googleSearch, tagSearchNode.nextSibling);
}

var emsearch = document.createElement("div");
emsearch.innerHTML =
'<form action="http://www.google.com/custom" style="display:block;text-align:left;">' +
'Google Search: <input type="text" name="q" size="20" />' +
'<input type="submit" value="Search" />' +
'<input type="hidden" name="sitesearch" value="www.em411.com" />' +
'</form>';
emsearch.setAttribute('class', 'topMsg');
emsearch.setAttribute('id', 'googleSearch');
emsearch.style.display = "none";
mainContentObj = document.getElementById('mainPageContent');
mainContentObj.insertBefore(emsearch, mainContentObj.firstChild);