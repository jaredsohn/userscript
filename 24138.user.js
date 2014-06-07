// ==UserScript==
// @name           Telefoongids2hCard
// @namespace      http://naarvoren.nl/artikel/monkeyformats/
// @description    Changes address listings into hCards.
// @include        http://*.detelefoongids.com/*
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
		
replaceClass("//div[contains(@class,'listing')]"," vcard");
replaceClass("//div[contains(@class,'header')]/h2/a"," fn org");

replaceClass("//td[@class='data']"," adr");
replaceText("//div[@class='adres']", "(.*?)<br", "<span class=\"street-address\">\$1</span><br");
replaceText("//td[@class='right']", "([0-9][0-9][0-9][0-9]).*?([A-Z][A-Z])", "<span class=\"postal-code\">\$1 \$2</span>");
replaceClass("//td[@class='right']/h2"," locality");

replaceClass("//div[contains(@class,'header')]/h6/a"," category");

replaceClass("//th[contains(.,'Web')]/following-sibling::td/a"," url");

replaceClass("//th[contains(.,'Tel')]"," type");

replaceClass("//th[contains(.,'Fax')]/parent::tr"," tel");
replaceClass("//th[contains(.,'Fax')]/following-sibling::td"," value");
replaceClass("//th[contains(.,'Fax')]"," type");

replaceClass("//th[contains(.,'Mob')]/parent::tr"," tel");
replaceClass("//th[contains(.,'Mob')]/following-sibling::td"," value");
replaceClass("//th[contains(.,'Mob')]"," type");
replaceText("//th[contains(.,'Mob')]", "Mob", "Cell");

