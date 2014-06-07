// ==UserScript==
// @name           Kat.ph URL Confirmation Replacer
// @namespace      Nikko
// @description    Replaces the Kat.ph URLs confirmation with direct links
// @include        http://kat.ph/*
// @include        https://kat.ph/*
// @version        2013.05.31
// @icon           https://kat.ph/favicon.ico
// @author         http://userscripts.org/users/mynikko
// ==/UserScript==

(function() {
	if (document.URL.indexOf("/confirm/url/") !== -1) {
		window.location.replace(document.forms[2].action);		
	} else {
		var $ajaxLinks = document.evaluate("//a[contains(@href, '/confirm/url/')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
		 
		for (var $i=0; $i < $ajaxLinks.snapshotLength; $i++) {
			if ($ajaxLinks.snapshotItem($i).text.indexOf('http') == 0) {
				$ajaxLinks.snapshotItem($i).href = $ajaxLinks.snapshotItem($i).text; 
				$ajaxLinks.snapshotItem($i).className = "";
				$ajaxLinks.snapshotItem($i).target = "_blank";
			} else {
				$ajaxLinks.snapshotItem($i).href = $ajaxLinks.snapshotItem($i).href.replace("https", "http");
				$ajaxLinks.snapshotItem($i).className = "";
				$ajaxLinks.snapshotItem($i).target = "_blank";
			}
		}
	}
}) ();