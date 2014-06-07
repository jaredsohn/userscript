// ==UserScript==
// @name           Rate Your Music Go to Good Search Result
// @namespace      http://www.google.com/search?q=brtkrbzhnv
// @description    If one of the search results is totally superior, you get taken automatically to it
// @include        http://rateyourmusic.com/search?searcht*
// @include        http://www.rateyourmusic.com/search?searcht*
// ==/UserScript==
// 2010-09-26: Complete rewrite.
function main() {
  var query = x("//form[@id='search_box_p']/fieldset/input[1]").value;
  var links = xpath("//div[@id='content']/table/tbody/tr/td[1]/table/tbody/tr/td[2]/table/tbody/tr/td[1]/*/a");
  var candidates = new Array();
  for(var i = 0; link = links.snapshotItem(i); ++i) if (roughlyEqual(link.innerHTML, query)) candidates.push(link);
  if(candidates.length == 1) location.href = candidates[0];
}
function roughlyEqual(a, b) {
  return normalize(a) == normalize(b);
}
function normalize(s) {
  return s.toLowerCase().replace(/\s\(.*\)/ig,"");
}
// Modified from Dive Into Greasemonkey:
function xpath(query, doc) {
	return document.evaluate(query, doc ? doc : document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}
// Return the first element that matches the path query
function x(query, e) {
	return xpath(query, e).snapshotItem(0);
}
document.addEventListener("DOMNodeInserted", main, false);