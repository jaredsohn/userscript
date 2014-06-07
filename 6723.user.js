// ==UserScript==
// @name          Google Search Results Filter
// @namespace     pile0nades@gmail.com
// @description   Greasemonkey port of http://userstyles.org/style/show/303
// @include       http://www.google.com/custom*
// @include       http://www.google.com/search*
// ==/UserScript==


var results = get("//div[@class='g']/h2[@class='r']/a[@class='l']");

var spam = /(amazon|citysearch|experts-exchange|geeksquad|match|myhelpdesk|oreilly|rentspeed|socialgrid|tech24)\.com/;

for(var i = 0; i < results.snapshotLength; i++) {
  var l = results.snapshotItem(i);
  if(spam.test(l.href)) {
    l.parentNode.parentNode.style.display = "none";
  }
}


function get(query) {
  var result = document.evaluate(
    query,
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null
  );
  return result;
}