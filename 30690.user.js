// Need Script doesn't take credit for this script. I only modified it as //an inside joke for my friend. 
//ditto on the original idea.... just another adaptation
//Facebook - Mate-ify v0.1
// Made By Luke Stevenson {http://www.lucanos.com/} Modified by Need Script / Brad Dillon
// Distributed and Maintained via GMVC
// Last updated: 28 July 2008
//Drunkenly modified by Brad Dillon to amuse everyone
//
//   This script, built on the example Greasemonkey script at
// http://diveintogreasemonkey.org/casestudy/dumbquotes.html searches all
// text nodes on pages within Facebook and replaces any instances of the
// string 'michigan state' with 'little brother'.
//
// ==UserScript==
// @name              Little Brother
// @namespace         
// @description       (v0.1) Replaces any instances of the word "michigan state" with "little brother". Enjoy, commy!.
// @include           *.facebook.com*
// @include           *
// ==/UserScript==

(function () {

  var replacements, regex, key, textnodes, node, s;

replacements = {
  "Michigan State": "Little Brother",
  "michigan state": "Little Brother",
  "Michigan state": "Little Brother",
  "michigan State": "Little Brother",
  "MICHIGAN STATE": "Little Brother",
  "MSU": "Little Brother",
  "msu": "Little Brother",
  "Msu": "Little Brother",
  "Mike Valenti": "The \'Rant\' Guy",
  "Mike valenti": "The \'Rant\' Guy",
  "mike valenti": "The \'Rant\' Guy"
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