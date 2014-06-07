// ==UserScript==
// @name           Ticketmaster2hCalendar
// @namespace      http://naarvoren.nl/artikel/monkeyformats/
// @include        http://www.ticketmaster.nl/html/*
// @include        http://www.ticketmaster.co.uk/*
// @include        http://www.billettservice.no/html/*
// @include        http://www.billetnet.dk/html/*
// @include        http://www.ticnet.se/html/*
// @include        http://www.billettservice.no/html/*
// @include        http://www.lippupalvelu.fi/html/*
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
		
replaceClass("//table[contains(@class,'tableListing')]/tbody/tr"," vevent");
replaceClass("//span[contains(@class,'tableListing-act')]"," summary");
replaceText("//span[contains(@class,'tableListing-date')]", "(([0-9][0-9])/([0-9][0-9])/([0-9][0-9]).*?([0-9][0-9])\.([0-9][0-9]) uur)", "<abbr class=\"dtstart\" title=\"20$4-$3-$2T$5:$6\">$1</abbr>");
replaceClass("//span[contains(@class,'tableListing-venue')]/a"," location");

replaceClass("//div[@class='artistContent']"," vevent");
replaceClass("//div[contains(@class,'vevent')]/h3"," summary");
replaceClass("//div[contains(@class,'vevent')]/a"," location");

replaceText("//div[contains(@class,'vevent')]", "(([0-9][0-9])/([0-9][0-9])/([0-9][0-9]).*?([0-9][0-9])\.([0-9][0-9]) uur)", "<abbr class=\"dtstart\" title=\"20$4-$3-$2T$5:$6\">$1</abbr>");

