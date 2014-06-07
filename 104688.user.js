// ==UserScript==
// @name           Hide Fastmail's Welcome Message
// @description    Removes the "Welcome to FastMail.FM..." message upon login.
// @lastupdated    2011-6-13
// @namespace      4ceYffHjy7
// @version        1.1
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @compatibility  Firefox 3.5
// @include        http://fastmail.fm/mail/*
// @include        https://fastmail.fm/mail/*
// @include        http://www.fastmail.fm/mail/*
// @include        https://www.fastmail.fm/mail/*
// ==/UserScript==

/*
Version 1.1 2011-6-13
 - Added additional @includes
*/

// Most of this code was adapted from lazytrick's "Reddit forget comment points."

var divs = xpathArray('//div[contains(@class,"statusMessage")]');
divs.forEach(function(d){
    // Uncomment to hide all statusMessage's
    //d.style.display = "none";
    if (RegExp("Welcome to FastMail.FM, ").test(d.innerHTML)) {
        d.style.display = "none";
    }
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
