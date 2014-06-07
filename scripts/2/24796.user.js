// ==UserScript==
// @name           DasTelefonbuch2hCard
// @namespace      http://naarvoren.nl/artikel/monkeyformats/
// @description    Adds microformats to entries from Das Telefonbuch (Deutsche Telekom)
// @include        http://*.dastelefonbuch.de/*
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

addClass("//table[contains(@class,'bg-01')]","vcard");
addClass("//table[contains(@class,'bg-02')]","vcard");
addClass("//table[contains(@class,'bg-03')]","vcard");
addClass("//table[contains(@class,'vcard')]/tbody/tr/td[contains(@class,'col1')]/a","fn");
addClass("//table[contains(@class,'vcard')]/tbody/tr"," adr");
addClass("//table[contains(@class,'vcard')]/tbody/tr/td[contains(@class,'col2')]","street-address");
replaceText("//table[contains(@class,'vcard')]/tbody/tr/td[contains(@class,'col3')]", "([0-9][0-9][0-9][0-9][0-9])&nbsp;(.*?)$", "<span class=\"postal-code\">\$1</span> <span class=\"locality\">\$2</span>");
addClass("//table[contains(@class,'vcard')]/tbody/tr/td[contains(@class,'col4')]","tel");

