// ==UserScript==
// @name           TL.net hide Liquibet
// @namespace      http://teamliquid.net
// @description    Hides the Liquibet notification
// @include        http://*teamliquid.net*
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

var link = xpath(document.body, "//a[@class='openlb']")[0];
link.parentNode.removeChild(link);
})();
