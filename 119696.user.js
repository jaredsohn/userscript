// ==UserScript==
// @name           TeamLiquid.net Hide Liquibet2
// @namespace      http://teamliquid.net
// @description    Hides the Liquibet SC2 notification
// @include        http://*teamliquid.net*
// ==/UserScript==
// Source: http://userscripts.org/scripts/show/23750
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

var link = xpath(document.body, "//a[@href='/liquibet2/']")[0];
link.parentNode.removeChild(link);
})();
