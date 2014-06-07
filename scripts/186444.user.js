// ==UserScript==
// @name        v2ex-kill-short-links
// @namespace   v2ex
// @include     http://*.v2ex.com/t/*
// @include     http://v2ex.com/t/*
// @include     https://*.v2ex.com/t/*
// @include     https://v2ex.com/t/*
// ==/UserScript==

(function (window, document, undefined) {
    Array.prototype.slice.call(document.querySelectorAll('.reply_content a[rel=nofollow], .topic_content a[rel=nofollow]'), 0).forEach(function (link) {
    var href = link.getAttribute('href');
    if (!href) return;
    GM_xmlhttpRequest({
      method: 'HEAD',
      url: href,
      onload: function(response) {
        if (response.finalUrl == href) return;
        link.setAttribute('title', response.finalUrl);
        link.setAttribute('href', response.finalUrl);
        link.textContent = response.finalUrl;
      }
    });
  });
}(window, document, undefined));