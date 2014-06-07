// ==UserScript==
// @name           Triathletes are neither douchebags nor of good humor
// @namespace      Slowtwitcher
// @description    Replaces text "douchebag" on websites with "triathlete" to reduce offense toward certain "endurance" freaks. For more, visit www.slowtwitch.com, then in the Triathlon Forum, read this thread: Controversial Blog - "Triathlon a Stupid Sport"
// @include     http://*
// @include     https://*
// @version     1
// ==/UserScript==
(function() {
  var replacements, regex, key, textnodes, node, s; 

  replacements = { 
    "douchebag": "triathlete",
    "Douchebag": "Triathlete",
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


