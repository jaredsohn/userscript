// ==UserScript==
// @name           Yad2 Enhancer
// @namespace      liorzur
// @description    Removes ads, more
// @include        http://www.yad2.co.il/*
// ==/UserScript==
//
//########################################################################
//
// Written by: Lior Zur, 2008
// Released under the GPL license (http://www.gnu.org/copyleft/gpl.html)
// If you reuse parts of the code, please give credit. Thanks.
// Improvements & suggestions are welcome.
//
//########################################################################

function removeElements (xPath) {
	var thisElement, allElements = document.evaluate(xPath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (f = 0; f < allElements.snapshotLength; f++) {
    thisElement = allElements.snapshotItem(f);
    thisElement.parentNode.removeChild(thisElement);
	}
	if (allElements.snapshotLength > 0) return true; 
		else return false;
}
function $(id) {
  return document.getElementById(id);
}
function $x(p, context) {
  if (!context) context = document;
  var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
  return arr;
}

function removeById (elementIds) {
   if (typeof elementIds == 'string') elementIds = [elementIds];
	var x, thisElement;
	for (x in elementIds) {
		if (elementIds[x] !== ""){
			thisElement = document.getElementById(elementIds[x]);
			if (thisElement) { thisElement.parentNode.removeChild(thisElement); }
		}
	}
}



removeById(['ads.top.1', 'premium_ad', 'plazma', 'ads.700x180.1', 'GamboBanner', 
				'tr.MidStrip.1', 'tr.MidStrip.2', 'tr.MidStrip.3', 'tr.MidStrip.4']);

removeElements("//table[@width=770 and @height=102]"); //@width=456 and @height=250
removeElements("//table[@width=770 and @height=250]"); //@width=456 and @height=250
removeElements("//td[@width=463 and @height=250]");
removeElements("//iframe[@name='ads_frame']/ancestor::table[1]"); //An iframe called "ads frame". How good can THAT be?




