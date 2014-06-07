// Facebook - Customize Word "Christmas"
// Made By {nerdbot}
// Last updated: 4 dec 2010
//
// This script searches all
// text nodes on pages within Facebook and replaces any instances of the
// string 'christmas' with whatever your heart desires.
//
// ==UserScript==
// @name              Facebook - Customize Word "Christmas"
// @namespace     http://nerdbot
// @description     Replaces any instances of the word "christmas" with whatever your heart desires.
// @include           *.facebook.com*
// ==/UserScript==
(function () {

  var replacements, regex, key, textnodes, node, s;


replacements = {
  "christmas": "saturnalia",
  "Christmas": "Saturnalia"
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