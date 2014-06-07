// ==UserScript==
// @name Frooglize Thinkgeek
// @namespace http://www.miranda.org/~jkominek/
// @description Places a Froogle search link on Thinkgeek product pages
// @include *thinkgeek.com/*
// ==/UserScript==

var results =
   document.evaluate("//div[@class='breadcrumb']",
                     document, null,
                     XPathResult.FIRST_ORDERED_NODE_TYPE,
                     null);
var divnode = results.singleNodeValue;
var productname = divnode.innerHTML;
var space = document.createTextNode(' ');
divnode.insertBefore(space,
                     divnode.lastChild.nextSibling);
var frooglelink = document.createElement('a');
frooglelink.innerHTML = '(Froogle)';
divnode.insertBefore(frooglelink,
                     divnode.lastChild.nextSibling);
frooglelink.href = "http://froogle.google.com/froogle?q="+productname+" -thinkgeek";
