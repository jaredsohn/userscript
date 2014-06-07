// ==UserScript==
// @name           eBay Article Description Font Size Limiter
// @namespace      none
// @description    Limits the size of the fonts used in the description of ebay articles
// @include        http://*.ebay.tld/*
// ==/UserScript==
//

var FontSizeLimit = 3;

var fontTags = document.evaluate("//DIV[@id='EBdescription']//FONT[@size>"+FontSizeLimit+"]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < fontTags.snapshotLength; i++){
	fontTags.snapshotItem(i).size = FontSizeLimit;
}
