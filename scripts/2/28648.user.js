// ==UserScript==
// @name  2ch RSS Auto Discovery
// @namespace  http://d.hatena.ne.jp/youpy/
// @include  http://*.2ch.net/test/read.cgi/*
// @exclude  http://b.hatena.ne.jp/*
// @exclude  http://2ch2rss.dip.jp/*
// ==/UserScript==

(function () {
  var rss = 'http://2ch2rss.dip.jp/rss.xml?url=' + escape(location.href);
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
