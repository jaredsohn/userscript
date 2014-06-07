// ==UserScript==
// @name           Hide LiveLeak Comments
// @namespace      Yu8ZIiFqmV
// @description    This will hide video comments on LiveLeak.
// @lastupdated    2011-06-17
// @version        1.1
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @compatibility  Firefox 3.5
// @include        http://www.liveleak.com/view?i=*
// ==/UserScript==

// Most of this code was adapted from lazytrick's "Reddit forget comment points."

var divs = xpathArray('//div[contains(@id,"comments")]');
divs.forEach(function(d){
    d.style.display = "none";
});

function xpathArray(p, context) {
  if (!context) 
	context = document;
  var i, arr = [], xpr = xpath(p, context);
  for (i = 0; item = xpr.snapshotItem(i); i++) 
	arr.push(item);
  return arr;
}

function xpath(p, context) {
  if (!context) 
	context = document;
  return document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}