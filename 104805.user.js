// ==UserScript==
// @name		Prefix Nuker
// @description		Nukes the dumb prefixes
// @author		CDMoyer
// @contributor		Stupac
// @version			1.0
// @include			http://forums.kingdomofloathing.com/*
// ==/UserScript==

var taglinks = document.evaluate("//td[contains(@id,'td_threadtitle_')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var td, span, spans;
for (i = 0; i < taglinks.snapshotLength; i++) {
	td = taglinks.snapshotItem(i);
	spans = td.getElementsByTagName("span");
	for (var j = 0; j < spans.length; j++) {
		span = spans[j];
		if (span.innerHTML.match(/\[.*\]\s*/)) {
			span.style.display = 'none';
		}   
	}   
}