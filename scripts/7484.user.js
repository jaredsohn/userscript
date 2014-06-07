// ==UserScript==
// @name           Google from Scholar
// @namespace      http://www.kussmaul.org
// @description    Link Google Scholar results to Google
// @include        http://scholar.google.com/scholar*
// ==/UserScript==

function addLink(target, label) {
  // replace space and punctuation with +
  target = target.replace(/[?&,:. ]+/g, '+');
  var link = document.createElement('a');
  link.setAttribute('title', 'Find with Google');
  link.setAttribute('href' , 'http://www.google.com/search?hl=en&lr=&q=' + target);
  link.innerHTML = label;
  return link;
}


// PART A - add query link

var item = document.evaluate("//input[@name='q']", 
  document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
if (item) {
  var link = addLink(item.getAttribute('value'), 'Web Search ');
  item = item.parentNode.nextSibling.nextSibling.firstChild;
  item.insertBefore(document.createElement('br'), item.firstChild);
  item.insertBefore(link, item.firstChild);
}


 
// Part B - add result links
// TODO: decide what to do, since Google Scholar already provides Web Search link

var linked = document.evaluate("//p[@class='g']/span[@class='w']/a", 
  document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
// extract title and insert in Google link
for (var i=0; i<linked.snapshotLength; i++) {
  var item  = linked.snapshotItem(i);
  var link  = addLink(item.innerHTML, '- L Google ');
  item = item.parentNode.parentNode;
  item.insertBefore(link, item.lastChild);
}

var unlinked = document.evaluate("//p[@class='g']/font[2]", 
  document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
// extract title and insert in Google link
for (var i=0; i<unlinked.snapshotLength; i++) {
  var item  = unlinked.snapshotItem(i);
  var link  = addLink(item.parentNode.childNodes[1].nodeValue, '- U Google ');
  item = item.parentNode;
  item.insertBefore(link, item.lastChild);
}

/* 
  combinations:
    linked source, with group - SPAN A? FONT
        <p class='g'>
          <!-- linked title, in SPAN -->
          <span class='w'>
            <font size='-2'><b>[book]</b></font>
            <a>title</a>
          </span>
          <!-- only when part of a group -->
          <a class='fl'>group of</a>
          <!-- consistent -->
          <font size='-1'>
            <span class='a'>author, year, source</span>
            <a>cited by</a><a>related</a><a>cached</a><a>web search</a>
          </font>
        </p>
    unlinked source - FONT A? FONT
        <p class='g'>
          <!-- unlinked title, not in SPAN -->
          <font size='-2'><b>[book]</b></font>
          title
          <!-- only when part of a group -->
          <a class='fl'>group of</a> 
          <!-- consistent -->
          <font size='-1'>
            <span class='a'>author, year, source</span>
            <a>cited by</a><a>related</a><a>cached</a><a>web search</a>
          </font>
        </p>
*/
