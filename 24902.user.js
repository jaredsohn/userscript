// ==UserScript==
// @name          MeFi comment numbering
// @namespace     http://www.metafilter.com/
// @description   Numbers comments - handy in longboat threads.
// @include       http://*.metafilter.com/*
// @include       http://metafilter.com/*
// ==/UserScript==
if (/.*metafilter\.com\/(\d{1,7}\/|mefi\/|comments\.mefi).*/.test(window.location)) {
	var elements = document.evaluate('//div/span[@class="smallcopy"]/parent::node()',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	for (var i=1,element;element = elements.snapshotItem(i);i++) {
		var count = document.createElement("span");
		count.setAttribute("style","font-size:10px;position:absolute;left:15px;");
		count.innerHTML = i;
		element.insertBefore(count,element.childNodes[0]);
	}
}