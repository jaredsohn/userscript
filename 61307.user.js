// ==UserScript==
// @name           Terrible WASSP
// @description    WASSP is possibly the worst webmail I've ever seen.
// @include        *compose.wssp?OrigMessage*
// ==/UserScript==

var telm = document.evaluate("//textarea[@name='Body']",
	document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
telm.value = telm.value.replace(/<br>/g, '');
