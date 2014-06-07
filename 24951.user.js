// ==UserScript==
// @name           PagineBianchi2hCard
// @namespace      http://monkeyformats.org/
// @include        http://www.paginebianche.it/*
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

addClass("//table[contains(@class,'contattabile')]","vcard");
addClass("//table[contains(@class,'vcard')]/tbody/tr/td[contains(@class,'dati')]/span","fn");
addClass("//ul[contains(@class,'numFissi')]/li/span","tel");
addClass("//td[contains(@class,'dati')]","adr");
replaceText("//td[contains(@class,'dati')]", "([0-9][0-9][0-9][0-9][0-9])&nbsp;(.+?)&nbsp;\\(([A-Z]+?)\\)", "<span class=\"postal-code\">\$1</span> <span class=\"locality\">\$2</span> (<span class=\"region\">\$3</span>)");
replaceText("//td[contains(@class,'dati')]", "- ([^\<]+)", "<span class=\"street-address\">\$1</span>");
//replaceText("//td[contains(@class,'dati')]", "([0-9][0-9][0-9][0-9][0-9])&nbsp;(.+?)&nbsp;\n\n\t\t\t- (.+?)", "<span class=\"postal-code\">\$1</span> <span class=\"locality\">\$2</span> (<span class=\"street-address\">\$3</span>");
//addClass("//ul[contains(@class,'N6_bloc_parution_communication_div')]/li/strong","tel");
