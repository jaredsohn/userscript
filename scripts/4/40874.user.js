// ==UserScript==
// @name          TEDIA annoyer remover
// @namespace     http://d.hatena.ne.jp/r-west
// @description   Let pages in TEDIA be readable without registering or logging-in. (dirty quick hack)
// @include       http://a.tedia.jp/*
// ==/UserScript==
////

(function (){
	var annoyEl = document.evaluate('/html/body/div[position()=1 and img and div/h3 and div/form and div/p]',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	annoyEl.parentNode.removeChild(annoyEl);
})();