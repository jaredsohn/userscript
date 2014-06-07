// ==UserScript==
// @name           pdf2googleviewer
// @namespace      localhost
// @description    Converts links to PDF documents to Google Viewer
// @include        *
// @exclude        http://docs.google.com/*
// ==/UserScript==
gvURL="http://docs.google.com/viewer?url=";
for (var i = document.links.length - 1; i >= 0; i--) {
	var pdfLink = document.links[i];
	if (pdfLink.href.match(/pdf$/i)) {
		var pdfURL = pdfLink.href;
		pdfURL = gvURL+pdfURL;
		if (pdfURL != pdfLink.href) {
			pdfLink.href = pdfURL;
		}
	}
}

