// ==UserScript==
// @name          Something Awful Forums - disable swearing filter
// @namespace     http://dweezil.be/greasemonkey/
// @description   Disables swearing filter when you're not logged in.
// @include       http://forums.somethingawful.com/*
// ==/UserScript==

/*
Based on a script in Mark Pilgram's "Dive into Greasemonkey" 
*/ 


var replacements, regex, key, textnodes, node, s;

replacements = {
	"poo poo": "shit",
	"gently caress": "fuck"
	"drat": "damn"
	"rear end in a top hat": "asshole"
	"loving": "fucking"
	"surprise sex": "rape"
};
regex = {};
for (key in replacements) {
    regex[key] = new RegExp(key, 'g');
}

textnodes = document.evaluate(
    "//text()",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < textnodes.snapshotLength; i++) {
    node = textnodes.snapshotItem(i);
    s = node.data;
    for (key in replacements) {
	s = s.replace(regex[key], replacements[key]);
    }
    node.data = s;
}