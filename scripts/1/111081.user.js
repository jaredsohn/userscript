// ==UserScript==
// @name           What.CD Pot User
// @namespace      none
// @description    Replaces Power User class with "Pot User" on what.cd.
// @include        http://what.cd/*
// @include        https://ssl.what.cd/*
// ==/UserScript==
(function () {
	var replacements, regex, key, textnodes, node, s;
	replacements = {
		"(Power User)": "Pot User"
	};
	regex = {};
	for (key in replacements) {
		regex[key] = new RegExp(key, 'g');
	}
	textnodes = document.evaluate("//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < textnodes.snapshotLength; i++) {
		node = textnodes.snapshotItem(i);
		s = node.data;
		for (key in replacements) {
			s = s.replace(regex[key], replacements[key]);
		}
		node.data = s;
	}
})();