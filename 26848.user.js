// ==UserScript==
// @name           1188-cz-telefony 
// @namespace      http://www.1188.cz/ 
// @description    Add hCard microformats to 1188.cz phonebook 
// @include        http://www.1188.cz/*
// ==/UserScript==

function addClass(thepath, theclass)
{
	var allDivs, thisDiv;
	allDivs = document.evaluate(thepath,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	for (var i = 0; i < allDivs.snapshotLength; i++)
	{
	    	thisDiv = allDivs.snapshotItem(i);
	    	thisDiv.className = thisDiv.className +' '+ theclass;
	}
} 

function replaceText(thepath, searchText, replaceText)
{
	var allDivs, thisDiv;
	re = new RegExp(searchText,'g');
	allDivs = document.evaluate(thepath,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	for (var i = 0; i < allDivs.snapshotLength; i++)
	{
    		thisDiv = allDivs.snapshotItem(i);
		thisDiv.innerHTML = thisDiv.innerHTML.replace(re, replaceText);
	}
} 


addClass("//div[contains(@class,'result')]", "vcard");
addClass("//div[contains(@class,'vcard')]/h3", "fn");
addClass("//div[contains(@class,'vcard')]//p[contains(@class,'phone-top')]", "adr");
addClass("//div[contains(@class,'vcard')]//p[contains(@class,'phone-bottom')]/strong[2]", "tel");
addClass("//div[contains(@class,'vcard')]//table[contains(@class,'phone-bottom')]//th", "tel");
addClass("//div[contains(@class,'vcard')]//p[contains(@class,'phone-top')]/strong", "street-address");
replaceText("//div[contains(@class,'vcard')]//p[contains(@class,'phone-top')]", "</strong><br>\n.*([0-9]{3}.[0-9]{2}),(.*)", "</strong><br><span class=\"postal-code\">\$1</span>,<span class=\"locality\">\$2</span>");
