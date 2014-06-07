// ==UserScript==
// @name           Better iCCup.com
// @namespace      http://teamliquid.net
// @description    A couple of fixes that make iCCup.com usable
// @include        http://*iccup.com/*
// @exclude        http://*iccup.com/iccscprofile/*
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


//
// rewrite links to point to the player's profile
//
var nodes = xpath(document.body, "//a[contains(@href,'iccprofile')]");
for (var i = 0; i < nodes.length; i++) {
	nodes[i].href = nodes[i].href.replace('iccprofile', 'iccscprofile');
}

var tds = xpath(document.body, "//td[@bgcolor = '#888888']")[0];
tds.style.color = '#000000';
//
// make game details table readable
//
var i;
var tds = xpath(document.body, "//td[@class = 'small' and @bgcolor = '#eeeeee']");
for (i in tds) {
	tds[i].style.color = '#000';
	tds[i].style.fontSize = 'medium';
	tds[i].style.padding = '0.5ex';
}

tds = xpath(document.body, "//td[@class = 'small' and @bgcolor = '#aaaaaa']");
for (i in tds) {
	tds[i].style.color = '#000';
	tds[i].style.fontSize = 'medium';
	tds[i].style.padding = '0.5ex';
}
tds = xpath(document.body, "//td[@width = '100%']");
for (i in tds) {
	tds[i].width = '';
}

tds = xpath(document.body, "//td[@bgcolor='#cccccc']/table/tbody/tr/td");
for (i in tds) {
	tds[i].style.color = '#000';
	tds[i].style.fontSize = 'medium';
	tds[i].style.padding = '0.5ex';
	tds[i].style.border = '1px solid black';
}

})();
