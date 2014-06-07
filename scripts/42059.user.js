// ==UserScript==
// @name              Facebook - Customize Word "in a relationship with"
// @namespace     http://userscripts.org/users/80202
// @description     Replaces any instances of the word "in a relationship with" with anything you want.
// @include           *.facebook.com*
// ==/UserScript==

(function () {

  var replacements, regex, key, textnodes, node, s;

// you can customize the script below by changing the  "In a Relationship with" to a diffferent word
// and you can change "gay, or "hip likewise
// Remember: KEEP THE QUOTES

replacements = {
  "single.": "associate",
  "Single": "Associate"
  "In a Relationship with": "doing"
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
