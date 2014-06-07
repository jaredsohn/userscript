// ==UserScript==
// @name           YellowPages.com
// @namespace      http://monkeyformats.org/
// @description    Add hCard microformats to YellowPages.com
// @include        http://www.yellowpages.com/*
// ==/UserScript==

function addClass(thepath, theclass) {
	var allDivs, thisDiv;
	allDivs = document.evaluate(thepath,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	for (var i = 0; i < allDivs.snapshotLength; i++) {
    	thisDiv = allDivs.snapshotItem(i);
    	thisDiv.className = thisDiv.className +' '+ theclass;
	}
}

function replaceClass(thepath, theclass) {
	var allDivs, thisDiv;
	allDivs = document.evaluate(thepath,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	for (var i = 0; i < allDivs.snapshotLength; i++) {
    	thisDiv = allDivs.snapshotItem(i);
    	thisDiv.className = theclass;
	}
}

function replaceText(thepath, searchText, replaceText) {
	var allDivs, thisDiv;
	re = new RegExp(searchText,'g');
	allDivs = document.evaluate(thepath,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	for (var i = 0; i < allDivs.snapshotLength; i++) {
    	thisDiv = allDivs.snapshotItem(i);
		thisDiv.innerHTML = thisDiv.innerHTML.replace(re, replaceText);
	}
}

addClass("//li[contains(@class,'listing')]","vcard");
addClass("//li[contains(@class,'vcard')]/div/h2/a","fn org");
addClass("//li[contains(@class,'vcard')]/div/ul/li[contains(@class,'number')]","tel");
addClass("//li[contains(@class,'vcard')]/div/p","adr");
replaceText("//li[contains(@class,'vcard')]/div/p", "(.*?)<br", "<span class=\"street-address\">\$1</span><br");
replaceText("//li[contains(@class,'vcard')]/div/p", "<br>(.*?), ([A-Z][A-Z]) ([^<]+)", "<br><span class=\"locality\">\$1</span>, <span class=\"region\">\$2</span> <span class=\"postal-code\">\$3</span>");
