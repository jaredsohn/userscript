// ==UserScript==
// @name Smart quotes
// @author Adam Fontenot
// @namespace http://adamfontenot.com
// @description Replaces straight quotes with smart quotes
// @include *
// ==/UserScript==

//******************************************************************
// Acknowledgements
// Michael Sarver - michaelsarver.com for the script's skeleton
// Dr. Drang - leancrew.com for the regex replacement code
// -> http://www.leancrew.com/all-this/2010/11/smart-quotes-in-javascript/
//******************************************************************

//******************************************************************
// 2013.03.27 - Don't mess around with scripting - 0.5
// - Javascript's .replace is dumb, so we have to whitelist scripts.
// - Reenable Amazon etc. Should all be working now.
//
// 2013.03.27 - No code tags - 0.4
// - Some sites, e.g. stackoverflow, use code tags. Don't convert these.
//
// 2013.03.13 - No textarea tags - 0.3
// - Obviously, don't want textarea text changed either
//
// 2013.03.13 - No pre tags - 0.2
// - Fix a case where quotes inside pre tags would be changed
//
// 2013.03.13 - Initial Revision - 0.1
// - Minimal testing
//******************************************************************

(function() {
 var textnodes, node, s;

textnodes = document.evaluate( "//body//text()[not(ancestor::pre) and not(ancestor::textarea) and not(ancestor::code) and not(ancestor::input) and not(ancestor::script)]",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < textnodes.snapshotLength; i++) {
   node = textnodes.snapshotItem(i);
   s = node.textContent;
      s = s.replace(/(^|[-\u2014\s(\["])'/g, "$1\u2018"); // opening singles
      s = s.replace(/'/g, "\u2019"); // closing singles & apostrophes
      s = s.replace(/(^|[-\u2014/\[(\u2018\s])"/g, "$1\u201c"); // opening doubles
      s = s.replace(/"/g, "\u201d"); // closing doubles
      s = s.replace(/--/g, "\u2014"); // em-dashes
   node.data = s;
}

})();