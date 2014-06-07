// ==UserScript==
// @name           Binsearch in Amazon 2

// @namespace      http://mywebsite.com/myscripts
// @description    Puts links to search binsearch in amazon
// @include        *amazon.*
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
var binsearchlink = document.createElement('a');
binsearchlink.innerHTML = '(Search 4 Download)';
divnode.insertBefore(binsearchlink,
                     divnode.lastChild.nextSibling);
binsearchlink.href = "http://www.binsearch.info/?q="+productname+"&max=250&adv_age=&server=";


