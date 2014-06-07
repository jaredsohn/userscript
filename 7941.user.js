// ==UserScript==
// @name          IBS.org Printer Friendly Redirect
// @description	  Redirect any IBS.org page to its printer friendly correspondent if it exists.
// @include       http://www.ibs.org/*

//by Jason
// ==/UserScript==

(function() {

//document.getElementByClassName = function(listenprintLink) {
//  var xpathResult = document.evaluate("//span[@class = 'listenprintLink']", document, null, 0, null);
//  var outArray = new Array();
//  while ((outArray[outArray.length] = xpathResult.iterateNext())) {
//  }
//  return outArray;
//}

var printSpans;
printSpans = document.evaluate(
    "//span[@class='listenprintLink']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

	//var toolsDiv = document.getElementById("listenprintLink");
	var redirectPage = printSpans.snapshotItem(0).getElementsByTagName("a")[0].href
	if( redirectPage ) document.location = redirectPage

})();
