// ==UserScript==
// @name           GoogleFast
// @namespace      marclucchini
// @description    Type
// @include        http://www.google.*
// ==/UserScript==

document.addEventListener("keypress", quickSearch, true)

function quickSearch(e) {
    if (isAQuickSearchToLaunch(e))
        GM_openInTab(getLinkFromKey(String.fromCharCode(e.which)))
    return true
}

function isAQuickSearchToLaunch(e) {
    return (e.shiftKey && isAQuickSearchKey(String.fromCharCode(e.which)))
}

function isAQuickSearchKey(k) {
    return (k > 0 && k < 10)
}

function getLinkFromKey(k) {
	var links = document.evaluate("//span[@id='search']//li[" + k + "]/h3/a/@href", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null)
	if (links.snapshotLength > 0) {
		var link = links.snapshotItem(0)
		if (link.value)
			document.location.href = link.value
	}
}
