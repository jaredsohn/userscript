// ==UserScript==
// @name           QShare Auto-redirect
// @namespace      http://www.mathemaniac.org
// @description    Skips download timer on QShare
// @include        http://*qshare.tld/*
// @version 	1.0.0
// ==/UserScript==

var loc = (""+document.location);

if (loc.match(/get\/\d+\/.*\.html$/)) {
	var freeDLLink = document.evaluate('//a[contains(@href,"option=free")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	document.location = freeDLLink.href;
}

if (loc.match(/sysm=file_transfer/)) {
	setTimeout(function () {
		unsafeWindow.count_down(0);
		var downloadLink = document.evaluate('//div[@id="download_link"]/a', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		document.location = downloadLink.href;
	},10);
}

