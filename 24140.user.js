// ==UserScript==
// @name           Funda2hCard
// @namespace      http://naarvoren.nl/artikel/monkeyformats/
// @description    Changes address listings into hCards.
// @include        http://*.funda.nl/*
// ==/UserScript==

function replaceClass(thepath, theclass) {
	var allDivs, thisDiv;
	allDivs = document.evaluate(thepath,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	for (var i = 0; i < allDivs.snapshotLength; i++) {
    	thisDiv = allDivs.snapshotItem(i);
    	thisDiv.className += theclass;
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
		
replaceClass("//table[@class='listing']/tbody/tr[@class!='ad']"," adr");
replaceClass("//tr[contains(@class,'adr')]/td/a[@class='item']"," street-address");
replaceText("//tr[contains(@class,'adr')]/td", "([0-9][0-9][0-9][0-9]) ([A-Z][A-Z]) ([^<]+)", "<span class=\"postal-code\">\$1 \$2</span> <span class=\"locality\">\$3</span>");

replaceClass("//div[contains(@class,'realtors-hdr')]/parent::div/parent::div"," vcard");
replaceClass("//th[contains(@class,'realtors-hdr')]/h1"," fn org");
replaceClass("//div[contains(@class,'realtors-hdr')]/h1"," fn org");

replaceClass("//address"," adr");
replaceText("//address", "(.*?)<br[^>]+>", "<span class=\"street-address\">\$1</span><br/>");
replaceText("//address", "([0-9][0-9][0-9][0-9]) ([A-Z][A-Z]) ([^<]+)", "<span class=\"postal-code\">\$1 \$2</span> <span class=\"locality\">\$3</span>");

replaceClass("//li[@class='contact-phone']"," tel");
replaceClass("//li/a[@class='contact-info']"," url");
