// ==UserScript==
// @name           Google click-tracker disabler
// @namespace      techbuddy.us
// @description    Disables all google click tracking from results pages
// @include        http://*.google.com/*
// ==/UserScript==

Array.prototype.forEach.call(document.getElementsByTagName('a'), function(el) {
    var href = el.href;
    if (href.match('^http://www.google.com')
      && ! href.match('^http://www.google.com/finance')) {
        if (href.match('q=')) {
            href = href.replace(/^.*q=([^&]*)&.*$/, '$1');
        } else if (href.match('url=')) {
            href = href.replace(/^.*url=([^&]*)&.*$/, '$1');
        }
        el.href = href;
    }
});