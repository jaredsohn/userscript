// ==UserScript==
// @name           Unbleep
// @namespace      http://userscripts.org/users/140322
// @description    Uncensors swearwords on SelectSmart
// @include        http://www.selectsmart.com/DISCUSS/*
// ==/UserScript==

(function() {
  var replacements, regex, key, textnodes, node, s; 
  
  replacements = [ 
    "fuck knuckles",
    "moist",
    "throbbing",
    "erect"
    ];

regex =  new RegExp("@#.%&", 'igm'); 

    //key = Math.floor(Math.random() * replacements.length);
    //alert(key);
    
textnodes = document.evaluate( "//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 

for (var i = 0; i < textnodes.snapshotLength; i++) { 
    node = textnodes.snapshotItem(i); 
    s = node.data; 
    key = Math.floor(Math.random() * replacements.length);
    s = s.replace(regex, replacements[key]);
    node.data = s; 
} 

})();