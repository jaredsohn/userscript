// MobileRead - Customize Word "Liseuse"
// Made By Byrne Hollander {http://userscripts.org/users/62712/}
// Last updated: 12 August 2008
//
// This script searches all
// text nodes on pages within MobileRead and replaces any instances of the
// string 'Liseuse' with whatever your heart desires. in this case E-book Reader
//
// ==UserScript==
// @name              MobileRead - Customize Word "Liseuse"
// @namespace     http://userscripts.org/users/92684
// @description     Replaces any instances of the word "Liseuse" with whatever your heart desires.
// @include           *.MobileRead.com*
// ==/UserScript==

(function () {

  var replacements, regex, key, textnodes, node, s;

// you can customize the script below by changing the letter "a" to a lowercase version of the word
// and the letter "B" to the uppercase version of the word. Currently, in this version you
// can only change "a" and B to a word that turns plural by just adding an "s"
// Remember: KEEP THE QUOTES when changing "E-book Reader"

replacements = {
  "liseuse": "E-book Reader",
  "Liseuse": "E-book Reader"
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