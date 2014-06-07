// ==UserScript==

// @name           LS1GTO

// @namespace      http://geekminute.com/LS1GTO

// @description    Clean up LS1GTO.com

// @include        http://*ls1gto.com/*

// ==/UserScript==



//Ebay search box

var ebay = document.getElementById('DR-ebay-search-boxCSS');

ebay.parentNode.removeChild(ebay);



var googlesearch = document.getElementById('cse-search-box');

googlesearch.parentNode.removeChild(googlesearch);



//<TABLE bgcolor=#000000 border=1 bordercolor=#cccccc width="100">

var sponsors = document.evaluate("//TABLE[@width='100']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

sponsors.snapshotItem(0).parentNode.removeChild(sponsors.snapshotItem(0))

//Hide pay link
var pay = document.evaluate("//a[contains(@href,'payments.php')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

pay.snapshotItem(0).parentNode.removeChild(pay.snapshotItem(0))


//<a rel="nofollow" href="http://www.jdoqocy.com/click-3193633-10521304?URL=http%3A%2F%2Fwww.newegg.com%2FProduct%2FProduct.aspx%3FItem%3DN82E16811129021"
var jdo = document.evaluate("//a[contains(@href,'http://www.jdoqocy.com/click-3193633-10521304')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < jdo.snapshotLength; i++)
{

	jdo.snapshotItem(i).href=unescape(jdo.snapshotItem(i).href.replace('http://www.jdoqocy.com/click-3193633-10521304?URL=', ''));
}

//PostRelease
//author[first-name = "Bob"]
//author[* = "Bob"]
var PostRelease = document.evaluate('//div[span = "PostRelease"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < PostRelease.snapshotLength; i++)
{

	PostRelease.snapshotItem(i).parentNode.parentNode.parentNode.removeChild(PostRelease.snapshotItem(i).parentNode.parentNode)
}

//Make usernames small again
var ss = document.styleSheets[document.styleSheets.length-1];
if(ss.insertRule) ss.insertRule('.bigusername' + '{' + 'font-size: 11pt;' + '}', ss.cssRules.length);
else if(ss.addRule) ss.addRule(selector, attributes);
