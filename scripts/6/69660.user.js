// ==UserScript==
// @name          Link to Developer Replies on addons.mozilla.org
// @namespace     http://userscripts.org/scripts/show/69660
// @version       0.0
// @description   Adds a link to developer replies to the reviews on addons.mozilla.org.
// @include       https://addons.mozilla.org/*
// @include       https://preview.addons.mozilla.org/*
// @license       This program is in the public domain.
// ==/UserScript==

// See https://bugzilla.mozilla.org/show_bug.cgi?id=453128 for a related discussion.

void function() {
  var HTML_NS = 'http://www.w3.org/1999/xhtml';

  var found = location.href.match(/^https:\/\/[^\/]+\/([^\/?#]+)\/([^\/?#]+)\/addon\/([0-9]+)\/?$/);
  if (!found)
    return;
  var lang = found[1];
  var application = found[2];
  var addonid = found[3];
  var reviews = document.evaluate('id("reviews")/following::div[@class="article"]/div[@class="hreview"]',
    document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  if (!reviews || reviews.snapshotLength == 0)
    return;

  // Create an invisible iframe to access the DOM of the review page (ugh).
  var reviewPageURL = '/' + lang + '/' + application + '/reviews/display/' + addonid;
  var iframe = document.createElementNS(HTML_NS, 'iframe');
  iframe.src = reviewPageURL;
  iframe.width = '0';
  iframe.height = '0';
  iframe.marginWidth = '0';
  iframe.marginHeight = '0';
  iframe.addEventListener('load', function (event) {
    if (event.target != event.currentTarget)
      return;
    var reviewDoc = iframe.contentDocument;

    // Now we can access the DOM of the review page.
    // Check whether each review on the detail page has a developer reply,
    // and if so add a link to it.
    // We match reviews by the URL of the user page.
    for (var i = 0; i < reviews.snapshotLength; i++)
    {
      var review = reviews.snapshotItem(i);
      var reviewInfo = document.evaluate('p[@class="description"]/following-sibling::p[1]',
        review, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
      if (!reviewInfo)
        continue;
      var userURL = document.evaluate('descendant::a[@class="profileLink"]/@href',
        reviewInfo, null, XPathResult.STRING_TYPE, null).stringValue;
      if (!userURL)
        continue;
      // Create an XPath expression dynamically (ugh again).
      var userURLQuoted = userURL.replace(/"/g, '""');
      var replyIter = reviewDoc.evaluate('//div[@class="item review"][descendant::a[@class="profileLink" and @href="' + userURLQuoted + '"]]/following-sibling::div',
        reviewDoc.body, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
      while (true)
      {
        var reply = replyIter.iterateNext();
        if (!reply)
          break;
        if (reply.className == 'review review-reply')
        {
          var replyLinkSpan = document.createElementNS(HTML_NS, 'span');
          replyLinkSpan.appendChild(document.createTextNode('['));
          var link = document.createElementNS(HTML_NS, 'a');
          link.appendChild(document.createTextNode('view reply'));
          link.href = reviewPageURL + '#' + reply.id;
          replyLinkSpan.appendChild(link);
          replyLinkSpan.appendChild(document.createTextNode(']'));
          reviewInfo.appendChild(replyLinkSpan);
          break;
        }
        if (reply.className != 'others-by-user-load')
          break;
      }
    }

    // We are done with the review page.
    // Remove the iframe so that it does not affect the tab order any longer.
    iframe.parentNode.removeChild(iframe);
  }, false);
  document.body.appendChild(iframe);
}();
