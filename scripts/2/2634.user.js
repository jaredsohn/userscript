// ==UserScript==
// @name           Newzbin in Amazon
// @namespace      http://mywebsite.com/myscripts
// @description    Puts links to search newzbin in amazon
// @include        *amazon.com/*
// ==/UserScript==


var results =
   document.evaluate("//b[@class='sans']",
                     document, null,
                     XPathResult.FIRST_ORDERED_NODE_TYPE,
                     null);
var divnode = results.singleNodeValue;
var productname = divnode.innerHTML;
var space = document.createTextNode(' ');
divnode.insertBefore(space,
                     divnode.lastChild.nextSibling);
var newzbinlink = document.createElement('a');
newzbinlink.innerHTML = '(Newzbin search)';
divnode.insertBefore(newzbinlink,
                     divnode.lastChild.nextSibling);
newzbinlink.href = "http://www.newzbin.com/search/query/p/?q="+productname+"&Category=-1&searchFP=p";


