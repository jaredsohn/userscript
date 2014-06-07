// ==UserScript==
// @name           GotoArticlePage
// @namespace      http://owlwatch.blogspot.com/
// @description    Goto article page for IEEE
// @include        http://0-ieeexplore.ieee.org.catalog.library.colostate.edu/*
// ==/UserScript==
var citationLink = document.evaluate('//a[text()="View citation and abstract"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

if(citationLink) {
    location.href = citationLink.href;
}