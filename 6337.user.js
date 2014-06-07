// ==UserScript==
// @name          Google Reader Skip Fark Landing Pages
// @namespace     http://romansends.blogspot.com
// @description	  It's annoying to me to click on a link in Google Reader only to land on a page that requires me to click another link.  This annoys me the most with Fark, but I'll probably update to include other feeds as they annoy me also.
// @include       http*://*.google.com/reader/*
// ==/UserScript==
// version 2 doesn't use a timer to keep checking every link every half second,
// but only runs when reader inserts new links

function modifyFark(feed, title, body) {
  if(feed.match("http://www.fark.com/fark.rss")) {
    var link=title.firstChild;
    var match = null;
    if (match=link.innerHTML.match(/\[Photoshop\]/)) {
      link.href=link.href+"&thread_type=voteresults";
    } else if (match=link.href.match(/.*IDLink=(\d+)/)) {
      link.href="http://go.fark.com/cgi/fark/go.pl?i="+match[1];
    }
  }
}

function entriesInserted(e) {
  var mainresults = document.evaluate("//div[@class='entry-main' and not(@seenbyrob)]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var i=mainresults.snapshotLength-1; i >= 0; i--) {
    var main = mainresults.snapshotItem(i);
    var title = document.evaluate("h2[@class='entry-title']", main, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var itembody = document.evaluate("div[@class='entry-body']/div/ins[@class='item-body']/div", main, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var feedelm = document.evaluate("div[@class='entry-author']/span/a[@class='entry-source-title']", main, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var feed = unescape(feedelm.href.match(/.*\/reader\/view\/feed\/(.*)/)[1]);
    modifyFark(feed, title, itembody);
    main.setAttribute("seenbyrob", "true");
  }
}

var entries = document.getElementById("entries");
if (entries) {
  entries.addEventListener('DOMNodeInserted', entriesInserted, false);
}
