// ==UserScript==
// @name           Reddit - Show shortlink
// @namespace      http://userscripts.org/scripts/show/136421
// @author         gavin19
// @description    Append redd.it shortlink after the link title
// @match          http://*.reddit.com/*
// @match          https://*.reddit.com/*
// @include        http://*.reddit.com/*
// @include        https://*.reddit.com/*
// @version        1.1
// ==/UserScript==
(function () {
    "use strict";
    var showShortLink = {
        repLinks: function (ele) {
            var i, len, c, s, d;
            for (i = 0, len = ele.length; i < len; i += 1) {
                c = ele[i].querySelector('.comments').href.split('/')[6];
                d = ele[i].querySelector('.domain');
                s = document.createElement('a');
                s.textContent = ' redd.it/' + c;
                s.href = location.protocol + '//redd.it/' + c;
                s.setAttribute('style', 'font-size:x-small;');
                if (c && d) {d.parentNode.insertBefore(s, d.nextSibling)}
            }
        },
        init: function () {
            var t;
            document.body.addEventListener('DOMNodeInserted', function (e) {
                t = e.target;
                if (t.localName === 'div' && t.id && t.id.indexOf('siteTable') !== -1) {
                    showShortLink.repLinks(t.querySelectorAll('.link'));
                }
            }, true);
            showShortLink.repLinks(document.querySelectorAll('.linklisting .link'));
        }
    };
    if (document.body && document.querySelector('.listing-page')) {
        setTimeout(function () {
            showShortLink.init();
        }, 300);
    }
}());