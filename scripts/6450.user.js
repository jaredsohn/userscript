// ==UserScript==
// @name          Newsgator Title Fix
// @namespace     http://freegarethandrew.org/projects/userScripts/
// @description   Adds the feed title to the page title
// @include       http://www.newsgator.*/ngs/subscriber/WebEd2.aspx?fid=*
// ==/UserScript==

var titleXPath = "//div[@id='FeedBanner']//*/a[@href]";
var titleString = document.evaluate(titleXPath,
                                 document, 
                                 null, 
                                 XPathResult.FIRST_ORDERED_NODE_TYPE, 
                                 null).singleNodeValue.innerHTML;

document.title = titleString + " - Newsgator Online";