// Potpals for reddit 
// Made By bhollander
// Last updated: 2 January 2011
//
// Laptop backwards is potpal :)
//
// ==UserScript==
// @name              Laptop=Potpal
// @namespace     http://userscripts.org/
// @description     potpal
// @include           *reddit.com/r/trees*
// ==/UserScript==

(function () {

  var replacements, regex, key, textnodes, node, s;



replacements = {
  "laptop": "potpal",
  "Laptop": "Potpal",
  "Laptops": "Potpals",
  "laptops": "potpals"
  };
regex = {};
for ( key in replacements ) {
  regex[key] = new RegExp(key, 'g');
}

textnodes = document.evaluate( "//text()" , document , null , XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE , null );
for ( var i=0 ; i<textnodes.snapshotLength ; i++ ) {
  node = textnodes.snapshotItem(i);
  s = node.data;
  for ( key in replacements ) {
    s = s.replace( regex[key] , replacements[key] );
  }
  node.data = s;
}

})();
