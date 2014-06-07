// ==UserScript==
// @name           Lookup Wikipedia Book Source in Amazon
// @description    Replace Wikipedia links to its book sources pages with links to their corresponding Amazon book pages.
// @namespace      http://centrinia.dyndns.org/greasemonkey
// @include        http://*.wikipedia.org/wiki/*
// @include        http://www.amazon.com/exec/obidos/ASIN/*
// ==/UserScript==

// The Amazon URL for a book with a given ISBN would be this string prepended to the ISBN string.
var amazonURL = "http://www.amazon.com/exec/obidos/ASIN/";
// Wikipedia ISBN links will have this substring.
var bookSourcesURI = "/wiki/Special:BookSources/";

var bookSourcesElements = document.evaluate("//a[contains(@href, '" + bookSourcesURI + "')]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

for(var i = bookSourcesElements.snapshotLength - 1; i>=0; i--){
  var element = bookSourcesElements.snapshotItem(i);
// Extract the ISBN from the link.
  var isbn = element.href.match(/wiki\/Special:BookSources\/([X\d]+)/)[1];
// Set the CSS class to reflect that the link is external and set the link reference.
  element.setAttribute("class","external text");
  element.setAttribute("href",amazonURL + isbn);
// Avoid influencing search engines' rankings of the Amazon link.
  element.setAttribute("rel","nofollow");
}

