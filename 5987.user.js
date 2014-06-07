// ==UserScript==
// @name          New Fucking Messages
// @namespace     http://diveintomark.org/projects/greasemonkey/
// @description   Swap the words Messages and Massages
// @include       *
// ==/UserScript==
//
// --------------------------------------------------------------------
//
// This script is basically just hacked from the DumbQuotes Greasemonkey script.
// Please don't sue me.
//

(function() {
    var replacements, regex, key, textnodes, node, i, s;

    replacements = {
        "Comments": "thing1",
        "Fucking Comments": "thing2",
		"thing1": "Fuckin Comments",
		"thing2": "Fuckin Comments"};
    regex = {};
    for (key in replacements) {
        regex[key] = new RegExp(key, 'g');
    }

    textnodes = document.evaluate(
        "//body//text()",
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);
    for (i = 0; i < textnodes.snapshotLength; i += 1) {
        node = textnodes.snapshotItem(i);
        s = node.data;
        for (key in replacements) {
            s = s.replace(regex[key], replacements[key]);
        }
        node.data = s;
    }
})();

