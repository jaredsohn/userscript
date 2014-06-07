// ==UserScript==
// @name           Binary2ASCII
// @namespace      http://brennanashton.com/gm/
// @description    Convert binary text to ascii chars
// @include        http://www.facebook.com/*
// ==/UserScript==


var threadDivs, test;
threadDivs = document.evaluate(
    "//div[@class='thread']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
test = threadDivs.snapshotItem(0);
function convbin(){
	var allDivs, thisDiv, finalTxt;
	var pattern = /(0|1){8}/g
	allDivs = document.evaluate(
    "//div[@class='post_message']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
	for (var i = 0; i < allDivs.snapshotLength; i++) {
		thisDiv = allDivs.snapshotItem(i);
		tmpTxt = thisDiv.innerHTML;
		var k = tmpTxt.match(pattern);
		if(k!=null){
			finalTxt = 'Parsed Binary: ';
			for(var j = 0; j < k.length; j++) {
				finalTxt = finalTxt + String.fromCharCode(parseInt(k[j],2));
			}
			thisDiv.innerHTML = finalTxt;
		}
	}
}
unsafeWindow.setInterval(function () {convbin()},1000);

