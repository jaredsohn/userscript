// Facebook - Customize Word "Logout"
// This script searches all
// text nodes on pages within Facebook and replaces any instances of the
// string 'profil' with whatever your heart desires.
//
// ==UserScript==
// @name              Facebook - Customize Word "Logout"
// @namespace     http://userscripts.org/users/107131
// @description     Replaces any instances of the word "Logout" with whatever your heart desires.
// @include           *.facebook.com*
// ==/UserScript==

(function () {

  var replacements, regex, key, textnodes, node, s;

// you can customize the script below by changing the letter "a" to a lowercase version of the word
// and the letter "B" to the uppercase version of the word. Currently, in this version you
// can only change "a" and B to a word that turns plural by just adding an "s"
// Remember: KEEP THE QUOTES when changing "a" and "B"

replacements = {
  "Logout": "Metu ah",
  "Logout": "Metu ah"
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