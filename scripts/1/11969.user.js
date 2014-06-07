// Facebook - Mate-ify v0.1
// Made By Luke Stevenson {http://www.lucanos.com/}
// Distributed and Maintained via GMVC
// Last updated: 04 September 2007
//
//   This script, built on the example Greasemonkey script at
// http://diveintogreasemonkey.org/casestudy/dumbquotes.html searches all
// text nodes on pages within Facebook and replaces any instances of the
// string 'friend' with 'mate'.
//
// ==UserScript==
// @name              Facebook - Mate-ify
// @namespace         http://gmvc.lucanos.com/
// @description       (v0.1) Replaces any instances of the word "friend" with "mate". Enjoy, mate.
// @include           *.facebook.com*
// ==/UserScript==

(function () {

  var replacements, regex, key, textnodes, node, s;

replacements = {
  "friend": "mate",
  "Friend": "Mate"
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