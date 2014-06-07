// ==UserScript==
// @name           Reddit - Show shortlink
// @namespace      http://userscripts.org/scripts/show/180687
// @author         Throne3d
// @description    Append redd.it shortlink at the end of the post options
// @match          http://*.reddit.com/*
// @match          https://*.reddit.com/*
// @include        http://*.reddit.com/*
// @include        https://*.reddit.com/*
// @version        1.1
// ==/UserScript==
// Modified by Throne3d from gavin19's original - now is "short" link, not "redd.it" link
(function () {
    "use strict";
    var showShortLink = {
        repLinks: function (ele) {
            var i, len, c, s, d, li;
            for (i = 0, len = ele.length; i < len; i += 1) {
                c = ele[i].querySelector('.comments').href.split('/')[6];
                d = ele[i].querySelector('.domain');
                li = document.createElement('li');
                s = document.createElement('a');
                s.textContent = 'short';
                s.href = location.protocol + '//redd.it/' + c;
                if (c && d) {
                    li.appendChild(s);
                    d.parentNode.parentNode.querySelector('.buttons').insertBefore(li, d.nextSibling);
                    li.parentNode.insertBefore(li, li.previousSibling);
                }
            }
        },
        init: function () {
            var t, a;
            document.body.addEventListener('DOMNodeInserted', function (e) {
                t = e.target;
                if (t.localName === 'div' && t.id && t.id.indexOf('siteTable') !== -1) {
                    a = Array.prototype.slice.call(t.querySelectorAll('.link'), 0);
                    setTimeout(function() {
                        showShortLink.repLinks(a);
                    }, 500);
                    showShortLink.repLinks(t.querySelectorAll('.link'));
                }
            }, true);
            showShortLink.repLinks(document.querySelectorAll('.linklisting .link'), 500);
        }
    };
    if (document.body && document.querySelector('.listing-page')) {
        setTimeout(function () {
            showShortLink.init();
        }, 300);
    }
}());