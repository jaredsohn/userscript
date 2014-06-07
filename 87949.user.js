// ==UserScript==
// @name           web.de - Logout vergessen
// @namespace      ak
// @include        *.web.de/*
// ==/UserScript==

if(/nologout\.htm/.test(window.location.href)) {
  var result = document.evaluate(
      "//a[@accesskey='f']", document, null, 
      XPathResult.FIRST_ORDERED_NODE_TYPE, null
  );
  window.location.href = result.singleNodeValue.href;
}
