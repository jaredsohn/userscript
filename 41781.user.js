// ==UserScript==
// @name           toolmonger.com refresh killer
// @namespace      http://userscripts.org/scripts/show/41781
// @description    Stops toolmonger.com from automatically refreshing.
// @include        http://toolmonger.com/*
// ==/UserScript==

var metas = document.getElementsByTagName('META');
for (var i = 0; i < metas.length; i++) {
	if (metas[i].getAttribute('http-equiv') == 'refresh') {
		metas[i].parentNode.removeChild(metas[i]);
	}
}