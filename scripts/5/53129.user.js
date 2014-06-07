// ==UserScript==
// @name           Newegg Specs First
// @namespace      ctcherry
// @description    Display the specifications tab by default on the newegg product page
// @include        http://www.newegg.com/Product/Product.aspx*
// ==/UserScript==

spec_link = xpathFirst("//img[@alt='Specifications']/parent::a")
location.href = spec_link.href;

function xpathFirst(p, c) {
  return document.evaluate(p, c || document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
}