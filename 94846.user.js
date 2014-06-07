// ==UserScript==
// @name           joes a troll
// @namespace      test
// @include        *
// ==/UserScript==


var replacements, regex, key, textnodes, node, s;
textnodes = document.evaluate( "//body//text()", document, null,
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < textnodes.snapshotLength; i++) {
	node = textnodes.snapshotItem(i);
	if(node != null  && /\S/.test(node.nodeValue))
	{

		s = node.data;
        s = s.replace( /\bJoseph Kearney\b/g, "Troll");
		node.data = s;

	}
}



