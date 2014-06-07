// Based on a script in Mark Pilgram's "Dive into Greasemonkey"

// ==UserScript==
// @name          Nice Shot?
// @author	  Michael Sarver (with help from other scripts)
// @namespace     http://michaelsarver.com/
// @description   Identifies comments containing the word "shot" in the "Nice Shot!" Flickr group and makes them easier to see for group moderators.
// @include       http://www.flickr.com/photos/*/in/pool-niceshot/
// @include  	  http://flickr.com/photos/*/in/pool-niceshot/
// ==/UserScript==

//******************************************************************
// 2005.10.4 - Initial Revision (v0.1)
//      -I would still like to create better identification for comments 
//        containing the word "shot", but that will come with time and experience.
//******************************************************************

(function() {
 var replacements, regex, key, textnodes, node, s;

 replacements = {
   "SHOT": "****S H O T****",
   "Shot": "****S H O T****",
   "shot": "****S H O T****"};

regex = {};
for (key in replacements) {
   regex[key] = new RegExp(key, 'g');
}

textnodes = document.evaluate( "//body//text()", document, null,
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < textnodes.snapshotLength; i++) {
   node = textnodes.snapshotItem(i);
   s = node.data;
   for (key in replacements) {
       s = s.replace(regex[key], replacements[key]);
   }
   node.data = s;
}

})();