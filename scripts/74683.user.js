// ==UserScript==
// @name           eRepublik Market Sorter
// @namespace      erepmarketsort
// @include        http://www.erepublik.com/*/market/*
// @description Sorts the market pages in eRepublik to show the cheapest product on top, also including the quality of the product. i.e. a product costing 1.5 of Q2 is cheaper than a product costing 1.0 of Q1.
// ==/UserScript==
var array = [];
var i=2; 
var table = {};
while ( true ){
var findPattern = "/html/body/div[3]/div[4]/table/tbody/tr[" + i + "]";
var pattern2  = "/td[2]/span/span";
var patternprice1 = "/td[4]/span";
var patternprice2 = "/td[4]/sup";
if (document.evaluate( findPattern + pattern2, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null ).snapshotItem(0) == null)
	break;
var stylestr = document.evaluate( findPattern + pattern2, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null ).snapshotItem(0).getAttribute("style");
var q = 0;
if (stylestr == "width: 20%;")
	q = 1;
if (stylestr == "width: 40%;")
	q = 2;
if (stylestr == "width: 60%;")
	q = 3;
if (stylestr == "width: 80%;")
	q = 4;
if (stylestr == "width: 100%;")
	q = 5;
var price = parseFloat(document.evaluate( findPattern + patternprice1, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE , null ).singleNodeValue.innerHTML + document.evaluate( findPattern + patternprice2, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE , null ).singleNodeValue.innerHTML);
price = price / q;
var node = document.evaluate( findPattern, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE , null ).singleNodeValue;
var obj = {};
obj.price = price;
obj.node = node;
array.push(obj);
table = node.parentNode;
node.parentNode.removeChild(node);
}
array.sort(function(a,b) { return a.price < b.price ? -1 : 1; });
for (var i = 0; i < array.length; ++i)
	table.appendChild(array[i].node);