// ==UserScript==
// @name           PicLens - page images
// @namespace      http://d.hatena.ne.jp/youpy/
// @include        *
// ==/UserScript==

var mediaRssFeedUrl = 'http://pipes.yahoo.com/pipes/pipe.run?_id=f345a40d7c4f05ed2e8a45901be7f7d7&_render=rss&url=' + encodeURIComponent(location.href);

var link = createElement('link', {
  rel: 'alternate',
  href: mediaRssFeedUrl,
  type: 'application/rss+xml',
  id: 'gallery',
  title: 'images(Media RSS)'
});

var script = createElement('script', {
  type: 'text/javascript',
  src: 'http://lite.piclens.com/current/piclens.js'
});

var head = document.getElementsByTagName('head')[0];
head.insertBefore(link, head.childNodes[0]);
head.insertBefore(script, head.childNodes[0]);

function createElement(tagName, attrs, innerHTML) {
  var element = document.createElement(tagName);
  for(var k in attrs) {
    element.setAttribute(k, attrs[k]);
  }
  element.innerHTML = innerHTML;

  return element;
}

GM_registerMenuCommand('PicLens - start', function() {
  location.href = 'javascript:PicLensLite.start();';
});
