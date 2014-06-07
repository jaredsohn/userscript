// ==UserScript==
// @name              JP's Facebook Text Customiser
// @namespace     http://userscripts.org/users/107131
// @description     Replaces any word in Facebook to anything you want desires.
// @include           *.facebook.com*
// ==/UserScript==

(function () {

  var replacements, regex, key, textnodes, node, s;

// You can replace the word friends with any word you want, meaning that if you see **** is now firends with ***, it will become **** is now [ your new word] with ****
// Remember not to delete the quotes when editing or it will not work.

replacements = {
  "friends": "Mis amigos",
  "friends": "Mis amigos"
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