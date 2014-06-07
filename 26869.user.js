// ==UserScript==
// @name           NS Reisplanner
// @namespace      http://monkeyformats.org/
// @include        http://www.ns.nl/reisplanner-v2/*
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

function getText(thepath) {
	var allDivs, thisDiv;
	allDivs = document.evaluate(thepath,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	if (allDivs.snapshotLength>0) {
    	thisDiv = allDivs.snapshotItem(0);
		return thisDiv.innerHTML;
	} else {
		return "";
	}
}


addClass("//div[contains(@class,'destinations')]/p[1]","summary-top");
replaceText("//p[contains(@class,'summary-top')]", "(.*?)\n\t+<img[^>]+>\n\t+(.*?)\n\t+<", "<span class=\"summary-container\" style=\"display:none;\">$1 naar $2</span>$1\n\t <img alt=\"\" src=\"/ns2007/static/images/icons/arrow-right-trip.gif\"/>\n\t $2<");
var summaryText = getText("//span[contains(@class,'summary-container')]");

addClass("//table[contains(@class,'time-table')]/tbody/tr","vevent");

replaceText("//table[contains(@class,'time-table')]/tbody/tr", "<td class=\"departure-date\">([^<]+)</td>\n\t+<td class=\"departure\">([^<]+)</td>", "<td class=\"departure-date\"><span class=\"summary\">"+summaryText+" ($2)</span> <abbr class=\"dtstart\" title=\"$1T$2\">$1</abbr></td><td class=\"departure\">$2</td>");
replaceText("//table[contains(@class,'time-table')]/tbody/tr", "<td class=\"arrival-date\">([^<]+)</td>\n\t+<td class=\"arrival\">([^<]+)</td>", "<td class=\"arrival-date\"><abbr class=\"dtend\" title=\"$1T$2\">$1</abbr></td><td class=\"arrival\">$2</td>");
