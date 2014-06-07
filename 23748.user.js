// ==UserScript==
// @name           TL.net jump to last response
// @namespace      http://teamliquid.net
// @include        http://*teamliquid.net/forum/index.php?*
// ==/UserScript==
(function() {
// my very favorite helper
function xpath(node, expr) {
	var resultSet =  document.evaluate(expr, node, null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var found = [];
	var res;
	for (var i = 0; i < resultSet.snapshotLength; i++) {
		found.push(resultSet.snapshotItem(i));
	}
	return found;
}

var links = xpath(document.body, "//a[contains(@href, 'currentpage') and @class = 'nounderline']");

for (var i = 0; i < links.length; i ++) {
	var num = xpath(links[i].parentNode.parentNode, "td[4]")[0];
	if (num) {
		links[i].href = links[i].href + '#'+(parseInt(num.textContent)+1);
	}
}
})();