// ==UserScript==
// @name           PCS Check all sold and OM
// @namespace      http://www.simplysensibleconsulting.ca/gmscripts
// @description    Add a button to the main PCS site to check all sold and off market listings
// @include        http://appv.interfacexpress.com/pcs/victoria/DoLogin*
// ==/UserScript==

String.prototype.normalize_space = function() {
// Replace repeated spaces, newlines and tabs with a single space
return this.replace(/^\s*|\s(?=\s)|\s*$/g, "");
}

String.prototype.formatNumber = function() {
    return this.replace(/,/g, "");
}

var listingRows = document.evaluate("//*/td[@class='classSold' or @class='classOm']", document, null, XPathResult.ANY_TYPE, null);

var currentCell = listingRows.iterateNext();
while(currentCell) {
	var rowNum = currentCell.parentElement.id.substring(3);
	var checkboxResult = document.evaluate(".//input[@id='checkbox"+rowNum+"']", currentCell.parentElement, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE , null);
	var checkbox = checkboxResult.iterateNext();
	checkbox.checked = true;
	currentCell = listingRows.iterateNext();
}


