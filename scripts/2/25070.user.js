// ==UserScript==
// @name           hatenarss_mobile
// @namespace      hatenarss_mobile
// @include        http://r.hatena.ne.jp/*/*/entrymobile*
// ==/UserScript==

(function() {
	window.location.href = document.evaluate('/html/body/a[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.href;
})();