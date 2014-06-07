// ==UserScript==
// @name           Fix topic
// @namespace      Fix topic
// @description    I fixed it ok
// @include        http://boards.endoftheinter.net/showmessages.php?board=42&topic=6295931
// @include        https://boards.endoftheinter.net/showmessages.php?board=42&topic=6295931
// ==/UserScript==

replacements = {
	
	"\\bpissed\\b": "missed"

};


var openingNumber = 0;

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


