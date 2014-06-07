// ==UserScript==
// @name           eJahan Static Menu Bars
// @namespace      http://userscripts.org/users/112438
// @description    Awesomemod for ejahan
// @include        http://ejahan.com/*
// @include        http://www.ejahan.com/*
// ==/UserScript==

(function() {
	var H=["mouseover"];
	if(document.addEventListener)
		for(j in H)
			document.addEventListener(H[j],function(e){e.stopPropagation();},true);
})();

var allDivs, thisDiv;
allDivs = document.evaluate(
    "//div[@class='submenus']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
    thisDiv.style.display = 'block';
}

var allImgs, thisImg;
allImgs = document.evaluate(
    "//img[@class='flag']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allImgs.snapshotLength; i++) {
    thisImg = allImgs.snapshotItem(i);
    thisImg.style.height = '48px';
    thisImg.style.width = '48px';
}