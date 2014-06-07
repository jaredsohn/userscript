// ==UserScript==
// @name           RR Ads block
// @namespace      renren.com
// @description    block ads in renren.com
// @include        *.renren.com/*
// ==/UserScript==

function process()
{
	var xpath, targets, regex;
	
	xpath = '//div[contains(@id, "ad")]';
	regex = /^ad(\S*)/ig;
	
	targets = document.evaluate(xpath, document, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
	for (var i=0; i<targets.snapshotLength; i++) {
		var target = targets.snapshotItem(i);
		if (!regex.test(target.id)) continue;
		target.parentNode.removeChild(target);
	}

	xpath = '//a[contains(@id, "ad")]';
	regex = /^ad(\S*)/ig;
	
	targets = document.evaluate(xpath, document, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
	for (var i=0; i<targets.snapshotLength; i++) {
		var target = targets.snapshotItem(i);
		if (!regex.test(target.id)) continue;
		target.parentNode.removeChild(target);
	}
}

function final_process()
{
	window.clearInterval(timer);
	process();
}

var timer = window.setInterval(process, 500);

window.addEventListener("load", final_process, false);
