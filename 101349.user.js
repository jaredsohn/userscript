// ==UserScript==
// @name           LibraryThing Work Page Member Search
// @namespace      http://userscripts.org/users/brightcopy
// @include        http://*.librarything.*/work/*
// ==/UserScript==

// get the member list
var elems = document.evaluate(
    '//*[@id="workpagesort_10" or @class="social" or @class="memberlistline showmore"]//a[contains(@href, "/profile/")]',
    document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

var title = '';

try {
  title = document.evaluate(
      '//span[@id="yourlibraryButton"]/a',
      document.body, null, XPathResult.ANY_UNORDERED_NODE_TYPE, 
      null).singleNodeValue.getAttribute('href').split('=').pop();
} catch (e) {}

if (title == '') {
  // try pulling it from the Work Details line (English only because of the "by")

  try {
    var titleParts = document.evaluate(
        '//div[@class="workdetails"]/p/text()',
        document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null).snapshotItem(0).textContent.split(' by ').shift();
  } catch (e) {}
}

if (title == '') {
  // pull it from the top of the page (could be work or book title)

  try {
    title = document.evaluate(
        '//div[@class="headsummary"]/h1/text()',
        document.body, null, XPathResult.ANY_UNORDERED_NODE_TYPE, 
        null).singleNodeValue.textContent;
  } catch (e) {}
}

if (title != '') {
  title = unescape(title).split(/[;:(]/).shift().replace(/\W/g, ' ').trim().replace(/ +/g, ' ');

  for (var i = 0; i < elems.snapshotLength; i++) {
    var user = elems.snapshotItem(i);
    user.setAttribute('href', 
        '/catalog.php?view=' + user.getAttribute('href').split('/')[2] + 
        '&searchall=1&deepsearch=' + title + '&collection=-1&shelf=list');
  }
}
