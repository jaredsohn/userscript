// ==UserScript==
// @name           FA Hide Site News
// @namespace      net.fa
// @description    We don't care, Piche
// @include        http://*.furaffinity.net/*
// @include	   https://*.furaffinity.net/*
// ==/UserScript==

var hasRun = false;

function hideSiteNews(e) {
	var result = document.evaluate("/html/body/div/table/tbody/tr[2]/td/table/tbody/tr/td/div[2]/table/tbody/tr/td[2]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);

	if(result != null) {
		hasRun = true;
		result.singleNodeValue.style.display = "none";
	}

	if(hasRun) {
		document.removeEventListener("DOMContentChanged", hideSiteNews, false);
	}

}

document.addEventListener("DOMContentLoaded", hideSiteNews, false);
