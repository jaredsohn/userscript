// ==UserScript==
// @name           ok
// @namespace      jaxer
// @description    ok
// @include        https://ok.myxybb.com/*
// ==/UserScript==

document.title = Date()

function xpath(query) {
	return document.evaluate(query, document, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}


var allDivs, thisDiv;
allDivs = xpath("//th[@class='r_two']")
for (var i = 0; i < allDivs.snapshotLength; i++) {
	thisDiv = allDivs.snapshotItem(i);
	thisDiv.parentNode.removeChild(thisDiv)
}

allDivs = xpath("//tr[@class='tr3']")
for (var i = 0; i < allDivs.snapshotLength; i++) {
	thisDiv = allDivs.snapshotItem(i);
	thisDiv.parentNode.removeChild(thisDiv)
}

allDivs = xpath("//tr[@class='tr1 r_one']")
for (var i = 0; i < allDivs.snapshotLength; i++) {
	thisDiv = allDivs.snapshotItem(i);
	thisDiv.parentNode.removeChild(thisDiv)
}

allDivs = xpath("//center[@class='gray']")
for (var i = 0; i < allDivs.snapshotLength; i++) {
	thisDiv = allDivs.snapshotItem(i);
	thisDiv.parentNode.removeChild(thisDiv)
}

allDivs = xpath("//div[@class='tpc_content']")
for (var i = 0; i < allDivs.snapshotLength; i++) {
	thisDiv = allDivs.snapshotItem(i);
	thisDiv.align = 'center'
	thisDiv.setAttribute('class',"")
}

allDivs = xpath("//div[@class='t5']")
for (var i = 0; i < allDivs.snapshotLength; i++) {
	thisDiv = allDivs.snapshotItem(i);
	thisDiv.setAttribute('class',"")
}
allDivs = xpath("//div[@id='main']")
for (var i = 0; i < allDivs.snapshotLength; i++) {
	thisDiv = allDivs.snapshotItem(i);
	thisDiv.setAttribute('id',"")
}


var allimgs, thisimg;
allimgs = document.evaluate(
	"//img[@onload]",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
for (var i = 0; i < allimgs.snapshotLength; i++) {
	thisimg = allimgs.snapshotItem(i);
	thisimg.setAttribute('onload',"if(this.width>'1000')this.width='1000';")
}

