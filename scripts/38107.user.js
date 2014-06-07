// ==UserScript==
// @name           Trademe.co.nz RSS
// @namespace      http://bieh.net
// @description    Adds RSS feeds to http://trademe.co.nz using the bieh.net scraper + RSS generator
// @include        http://*trademe.co.nz*
// @exclude        http://*trademe.co.nz/*/auction*
// @exclude        http://*trademe.co.nz/Sell/*
// @exclude        http://*trademe.co.nz/MyTradeMe/*
// @exclude        http://*trademe.co.nz/Community/*
// @exclude        http://*trademe.co.nz/Track.aspx*
// @exclude        http://*trademe.co.nz/*/Listing.aspx*
// ==/UserScript==

// Basically I just took http://userscripts.org/scripts/review/28648 and changed the URL.
// So, thanks heaps to 'youpy' for writing the original :)

(function () {
  var rss = 'http://metatrade.co.nz/lib/request.py?url=' + escape(location.href);
  var link = createElement('link', {
    rel: 'alternate',
    href: rss,
    type: 'application/rss+xml',
    title: 'RSS'
  });

  var head = document.getElementsByTagName('head')[0];
  head.insertBefore(link, head.childNodes[0]);

  function createElement(tagName, attrs, innerHTML) {
    var element = document.createElement(tagName);
    for(var k in attrs) {
      element.setAttribute(k, attrs[k]);
    }
    element.innerHTML = innerHTML;
    
    return element;
  }
})();
