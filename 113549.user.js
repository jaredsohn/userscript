// Potpal+
// Made By bhollander
// Last updated: 20 September 2011
//
// Laptop backwards is potpal! Oh and a surprise..
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
  "bud": "dankbushsuperkindbud",
  "Bud": "Dankbushsuperkindbud",
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
