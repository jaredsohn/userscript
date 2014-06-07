// ==UserScript==
// @name           ACM portal search result augmentation
// @namespace      http://www.kussmaul.org
// @description    Search other databases from ACM Portal
// @include        http://portal.acm.org/*
// ==/UserScript==

function addLink(label, title, href, target) {
  // replace space and punctuation with +
  target = target.innerHTML.replace(/[?&,:. ]+/g, '+');
  var link = document.createElement('a');
  link.setAttribute('title', title);
  link.setAttribute('href' , href + target);
  link.innerHTML = label;
  return link;
}

function addGoogleLink(target) {
  return addLink(' (G) ',         'Find with Google',         'http://www.google.com/search?hl=en&lr=&q=',      target);
}
function addScholarLink(target) {
  return addLink(' (GS) ',        'Find with Google Scholar', 'http://scholar.google.com/scholar?hl=en&lr=&q=', target);
}
function addLibraryLink(target) {
  return addLink(' (Berg) ',      'Find at Muhlenberg',       'http://library.muhlenberg.edu/search/?searchtype=j&searcharg=',  target);
}
function addWorldCatLink(target) {
  return addLink(' (WorldCat) ',  'Find at WorldCat',         'http://www.worldcat.org/search?q=ti%3A',                         target);
}

// extract data items and find position to insert links

var title = document.evaluate("//td[@class='medium-text']/strong",
  document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
if (title) {
  title.parentNode.appendChild(addGoogleLink (title));
  title.parentNode.appendChild(addScholarLink(title));
}

var source = document.evaluate("//span[@class='mediumb-text']",
  document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
if (source) {
  source.parentNode.insertBefore(addWorldCatLink(source), source.nextSibling);
  source.parentNode.insertBefore(addLibraryLink (source), source.nextSibling);
  source.parentNode.insertBefore(addScholarLink (source), source.nextSibling);
  source.parentNode.insertBefore(addGoogleLink  (source), source.nextSibling);
}

var authors = document.evaluate("//div[@class='authors']/table/tbody/tr/td[@class='small-text']/a",
  document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i=0; i<authors.snapshotLength; i++) {
  var author = authors.snapshotItem(i);
  var node   = document.createElement('td');
  node.appendChild(addGoogleLink (author));
  node.appendChild(addScholarLink(author));
  author.parentNode.parentNode.insertBefore(node, author.parentNode.nextSibling);
}

