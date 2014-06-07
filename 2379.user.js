// ==UserScript==
// @name Frooglize Amazon (new window, use local froogle)
// @description Places a Froogle search link on Amazon product pages. Link opens in new window/tab and local froogle is used.
// @include *amazon.*
// ==/UserScript==

// search the heading / product name
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

// create a linebreak before the froogle link
var umbruch = document.createElement('br');

// insert the created linebreak
divnode.insertBefore(umbruch,
                     divnode.lastChild.nextSibling);

// create a new link
var frooglelink = document.createElement('a');

// set the name of the link
frooglelink.innerHTML = 'check item on Froogle';

// set the link to open up in a new window/tab
frooglelink.target = '_blank';

//insert the link
divnode.insertBefore(frooglelink,
                     divnode.lastChild.nextSibling);
// read domain
var href = window.location.host;

// split domain at "amazon."
var tldtemp = href.split('amazon.');

// split domain by the "/" after the tld (de, com ...)
var tld = tldtemp[1].split('/');

// link to the google with same tld as the amazon page visited
frooglelink.href = "http://froogle.google."+tld[0]+"/froogle?q="+productname+"&scoring=r";

