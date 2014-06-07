// ==UserScript==
// @name           Fix for Digg's Link Problem
// @namespace      http://pile0nades.wordpress.com/
// @description    When a link is posted between two parentheses "(http://google.com/)" the right paren is included in the address, which breaks it. This Greasemonkey script fixes it.
// @include        http://*digg.com/*
// ==/UserScript==

var link, rightparen, bits, i, j;
var b0rked = get("//div[@class='c-body-inside']//a");
var shit = [
  ")",
  escape("}")
]
var notshit = [
  "(",
  escape("{")
]

for(i=0; i<b0rked.snapshotLength; i++) {
  link = b0rked.snapshotItem(i);

  for(j=0; j<shit.length; j++) {
    if(
      link.href.indexOf(shit[j]) != -1 &&
      link.href.indexOf(notshit[j]) == -1
    ) {
      bits = unescape(link.href.substring(link.href.indexOf(shit[j]), link.href.length));
      link.href = link.href.substring(0, link.href.indexOf(shit[j]));
      link.innerHTML = link.href;

      rightparen = document.createTextNode(bits);
      link.parentNode.insertBefore(rightparen, link);
      link.parentNode.insertBefore(link, rightparen);
    }
  }
}



// xpath function
function get(query) {
  return document.evaluate(
    query,
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null
  );
}