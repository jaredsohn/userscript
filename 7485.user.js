// ==UserScript==
// @name           Scholar from Google
// @namespace      http://www.kussmaul.org
// @description    Link Google results to Google Scholar
// @include        http://www.google.com/search*
// ==/UserScript==

function addLink(target, label) {
  // replace space and punctuation with +
  target = target.replace(/[?&,:. ]+/g, '+');
  var link = document.createElement('a');
  link.setAttribute('title', 'Find with Google Scholar');
  link.setAttribute('href' , 'http://scholar.google.com/scholar?hl=en&lr=&q=' + target);
  link.innerHTML = label;
  return link;
}

// PART A - add query link
var item = document.evaluate("//input[@name='q']", 
  document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
if (item) {
  var link = addLink(item.getAttribute('value'), 'Scholar Search ');
  item = item.parentNode.nextSibling.firstChild;
  item.insertBefore(document.createElement('br'), item.firstChild);
  item.insertBefore(link, item.firstChild);
}

// PART B - add result links
var results = document.evaluate("//div[@class='g']/h2",
  document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i=0; i<results.snapshotLength; i++) {
  var item = results.snapshotItem(i);
  var link = addLink(item.innerHTML, ' - Scholar');
  item = item.nextSibling.firstChild.firstChild.firstChild.firstChild;
  item.appendChild(link);
}