// ==UserScript==
// @name          Google Results Redirect Remover
// @namespace     http://daragh.org
// @description   Replaces Google's referral tracking obfuscatory referrer links and just gives you the url straight up.
// @include       http://*google.*
// ==/UserScript==

var links, a;
links = document.evaluate(
  "//a[contains(@href, '/url?sa=U')]",
  document,
  null,
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  null);

for (var i = 0; i < links.snapshotLength; i++) {
  a = links.snapshotItem(i);	
  a.href = a.href.replace(/http:\/\/.*.google..*\/.*http:\/\//,"http://").replace(/&ei=.*&usg=.*$/,"");
  if (a.href.search(/(%[^%]{2})/) != -1) { a.href = URLDecode(a.href); }
}

function URLDecode (encodedString) {
  var output = encodedString;
  var binVal, thisString;
  var myregexp = /(%[^%]{2})/;
  while ((match = myregexp.exec(output)) != null
             && match.length > 1
             && match[1] != '') {
    binVal = parseInt(match[1].substr(1),16);
    thisString = String.fromCharCode(binVal);
    output = output.replace(match[1], thisString);
  }
  return output;
} /* from http://cass-hacks.com/articles/code/js_url_encode_decode/ */


