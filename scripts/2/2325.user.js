// ==UserScript==
// @name          ThePants Renamer
// @namespace     http://www.suicidegirls.com/members/thepants
// @description   A spade by any other name...
// @include       http://*suicidegirls.com/*
// ==/UserScript==


(function() {
  var replacements, regex, key, textnodes, node, s;

  replacements = {
    "ThePants": "CleverClogs",
    "thepants": "cleverclogs",
    "THEPANTS": "CLEVERCLOGS"};

regex = {};
for (key in replacements) {
    regex[key] = new RegExp(key, 'g');
}

textnodes = document.evaluate( "//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < textnodes.snapshotLength; i++) {
    node = textnodes.snapshotItem(i);
    s = node.data;
    for (key in replacements) {
        s = s.replace(regex[key], replacements[key]);
    }
    node.data = s;
}

})();