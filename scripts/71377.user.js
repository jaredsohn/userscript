// ==UserScript==
// @name           GoogleFloatingForm+
// @namespace      http://www.otchy.com/
// @include        http://www.google.*/search*
// @include        http://images.google.co.jp/*
// @version        2008/08/21 21:15 by Alice0775 2010/03/15 +
// ==/UserScript==

(function() {
  xpath = '//input[@name="q"]';
  res = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
  if (!res.singleNodeValue) return;
  input = res.singleNodeValue;
  input.id = 'query_string';

  document.body.addEventListener('dblclick', function (event) {
    input.focus(); input.select();
  }, false);
})();
