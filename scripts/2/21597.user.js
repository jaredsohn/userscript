// ==UserScript==
// @name           Ceph phails at life
// @namespace      Ceph phails at life
// @description    From now on, you'll be happy to see him.
// @include        *
// ==/UserScript==

(function() {
  var replacements, regex, key, textnodes, node, s; 

  replacements = { 
    "cba": "am too fucking lazy",
    "CBA": "am too fucking lazy",
    "C.B.A": "Doucheville",
    "ëþher": "ÿ",
    "Cephas": "Giant Vagina",
    "-dies-": "I'm sorry I'm such a loser.",
    "-fucking dies-": "I'm sorry I'm such a fucking loser.",
};


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

