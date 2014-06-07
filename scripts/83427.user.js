// ==UserScript==
// @name           KPSS Yenileyici
// @namespace      Tanaydın 'Huzursuz' Şirin
// @include        http://sonuc.osym.gov.tr/*
// ==/UserScript==

	var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;
	var XPList  = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
	var XPIter  = XPathResult.UNORDERED_NODE_ITERATOR_TYPE;
	var position;

	function find(xpath, xpres){
		//alert(xpath);
		var ret = document.evaluate(xpath, document, null, xpres, null);
		return xpres == XPFirst ? ret.singleNodeValue : ret;
	}

	var t = find('/html/body/h1', XPFirst).innerHTML;
	//console.log(t);
	if ((t == 'Server is too busy') || (t == 'Service Unavailable')) {
		window.location.reload();
	}