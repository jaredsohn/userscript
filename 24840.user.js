// ==UserScript==
// @name           PagesBlanches
// @namespace      http://naarvoren.nl/artikel/monkeyformats/
// @description    Add microformats to PagesJaunes (France)
// @include        http://www.pagesjaunes.fr/*
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

addClass("//li[contains(@class,'N2_bloc_parution')]","vcard");
addClass("//div[contains(@class,'N3_bloc_parution_h')]/h5","fn");
addClass("//p[contains(@class,'N5_bloc_parution_adresse')]","adr");
replaceText("//p[contains(@class,'N5_bloc_parution_adresse')]", "\n(.*?)(| [0-9][0-9][0-9][0-9][0-9]) ([A-Z ]+?)$", "<span class=\"street-address\">\$1</span> <span class=\"postal-code\">\$2</span> <span class=\"locality\">\$3</span>");
addClass("//ul[contains(@class,'N6_bloc_parution_communication_div')]/li/strong","tel");

