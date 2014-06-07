// ==UserScript==
// @name           Profilci
// @namespace      bilmem
// @include        http://www.erepublik.com/*/citizen/profile/*
// @include        http://www.erepublik.com/*/organization/*
// @version        v1 (2/9/10)
// ==/UserScript==

var allDivs, thisDiv, uid, ver;
ver = "0.14";

allDivs = document.evaluate(
	"//a[@class='citizen_name']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    
	thisDiv = allDivs.snapshotItem(i);
	var ind = thisDiv.href.lastIndexOf('/');
	uid = thisDiv.href.substring(ind+1);
}

<div id="content"> uid </div>

document.getElementById('container').insertBefore(toggleDiv, document.getElementById('content'));