// ==UserScript==
// @id             prestigeSampleDownloader
// @name           prestigeSampleDownloader
// @include        http://www.prestige-av.com/*
// @author         phorbidden
// @version        1.20
// ==/UserScript==

(function() {

	var nowUrl = location.href;
	var catalogNumber = nowUrl.match(/\/([A-Z]+\-[0-9]+)\//);
	if(!!catalogNumber){
		var downloadHtml = '<a href="http://download.prestige-av.com/sample_movie/'
			 + catalogNumber[1] + '.wmv">DOWNLOAD</a>'

		var dl = document.createElement('div')
		dl.innerHTML = downloadHtml
		dl = dl.firstChild;

		var xpath = "id('Wrapper')//h1";
		var xpathHtml = document.evaluate(xpath, document.body, null,
			XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
		var xpathItem = xpathHtml.snapshotItem(0);

		xpathItem.parentNode.appendChild(dl, xpathItem);
	}
})();
