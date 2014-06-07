

// ==UserScript==
// @name Unembed
// @namespace http://neugierig.org/software/greasemonkey
// @description Adds a download link to embedded movies
// @include *
// ==/UserScript
//
// *** NOTE: there is an easier way to accomplish this than using this script.
// ***       please see http://neugierig.org/software/greasemonkey/ for info.
 
(function() {
  var xpath = "//embed";
  var res = document.evaluate(xpath, document, null,
                              XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
  var i, embed;
  for (i = 0; embed = res.snapshotItem(i); ++i) {
    var dl = document.createElement('a');
    dl.href = embed.src;
    dl.appendChild(document.createTextNode('[download]'));
    embed.parentNode.insertBefore(dl, embed.nextSibling);
  }
})();
 
// vim: set ts=2 sw=2 :
