// ==UserScript==
// @name            Share with PRISM
// @namespace       http://userscripts.org/users/170776
// @description     Remember with whom you are sharing...
// @version         0.1
// @author          Michal Tajchert
// @updateURL       https://userscripts.org/scripts/source/
// @include         /^https?://www\.facebook\.com/.*/
// @grant           none
// ==/UserScript==
(function() {
  var replacements, regex, key, textnodes, node, s; 

  replacements = { 
    
    "<option value="80">Public</option>": "<option value="80">Public and NSA</option>",
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