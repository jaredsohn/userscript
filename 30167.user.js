// ==UserScript==
// @name           TL.net link single post
// @namespace      http://teamliquid.net
// @description    To every post, insert a link that directly references the post
// @include        http://www.teamliquid.net/*/view*
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

var links = xpath(document.body, "//a[@name]");
for (var i = 0; i < links.length; i ++) {
	a = document.createElement("a");
	href = location.href.split('#')[0];
	a.href= href + "#"+links[i].getAttribute("name");
	a.innerHTML = "Link";
	a.className = "submessage";
	links[i]				// a
		.parentNode			// td
		.childNodes[1]		// table
		.childNodes[0]		// tbody
		.childNodes[0]		// tr
		.childNodes[1]		// 2. td
		.appendChild(a);
}
})();