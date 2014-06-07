// ==UserScript==
// @name           Telephone
// @namespace      http://jibouleau.com/
// @include        *
// ==/UserScript==

var replacements, regex, key, textnodes, node, s;

textnodes = document.evaluate(
    "//text()",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < textnodes.snapshotLength; i++) {
    node = textnodes.snapshotItem(i);
	
	var re = /\(?(\d{3})\)?-? *(\d{3})-?(\d{4})/g;
	var ar = re.exec(node.data);
	
	if (ar != null)
	{
		var range = document.createRange();
		range.setStart(node, re.lastIndex);

		var obj = document.createElement("<a>");
		obj.href = "http://www.whitepages.com/search/ReversePhone?full_phone=" + ar[1] + ar[2] + ar[3];
		obj.innerHTML = "Recherche";
		obj.target = "_blank";
		obj.style.backgroundColor = "silver";
		obj.style.border = "thin gray outset";
		range.insertNode(obj);
		
		range.insertNode( document.createTextNode("  ") );
	}
}
