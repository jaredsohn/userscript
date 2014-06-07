// ==UserScript==
// @name       A Lonely Life Stealth Mode
// @namespace  http://www.alonelylife.com/
// @version    0.1
// @description  This will hide the logo and all mentions of A Lonely Life from the top of the page. So you can view the forum without people seeing.
// @match      http://www.alonelylife.com/*
// @copyright  2014+, Kamya
// ==/UserScript==

var xpathResult = document.evaluate('//*[@id="header"]/div[1]/a/img', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
var node=xpathResult.singleNodeValue;

var xpathResult2 = document.evaluate('//*[@id="content"]/div[2]/span', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
var node2=xpathResult2.singleNodeValue;

var xpathResult3 = document.evaluate('//*[@id="content"]/div[2]/a[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
var node2=xpathResult3.singleNodeValue;

node.style.display='none';
node2.style.display='none';
node3.style.display='none';
