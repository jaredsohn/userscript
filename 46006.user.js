// ==UserScript==
// @name           DE2RO
// @namespace      DE2RO
// @description    ...
// @include        http://*.ikariam.*/*
// @version        1.1.2
// ==/UserScript==

//document.replace(/Profil/g, "112233").innerHTML;

(function() {
 var replacements, regex, key, textnodes, node, s;

replacements = {
 
"Flota ta de transport din":"Ai mutat din", 	
"a sosit in":"in", 	
"si a adus urmatoarele bunuri":"urmatoarele",

};

regex = {};
for (key in replacements) {
   regex[key] = new RegExp(key, 'g');
}
textnodes = document.evaluate( "//body//text()", document, null,
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < textnodes.snapshotLength; i++) {
   node = textnodes.snapshotItem(i);
   s = node.data;
   for (key in replacements) {
       s = s.replace(regex[key], replacements[key]);
   }
   node.data = s;
}

})();