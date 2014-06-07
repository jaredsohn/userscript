// ==UserScript==
// @name           duuberproxy imgur
// @namespace      
// @author         duuberman
// @description    wraps i.imgur.com links through duuberproxy.appspot.com
// @match          http://*.reddit.com/*
// @match          https://*.reddit.com/*
// @include        http://*.reddit.com/*
// @include        https://*.reddit.com/*
// @version        1.0
// ==/UserScript==

(function() {
    "use strict";
    var replaceImgur = {
        repLinks: function(ele) {
            var i, len;
            for (i = 0, len = ele.length; i < len; i += 1) {
                ele[i].href = ele[i].href.replace('http://i.imgur.com', 'http://duuberproxy.appspot.com/?url=i.imgur.com');
                if (ele[i].srcurl) {
                    ele[i].srcurl = ele[i].srcurl.replace('http://i.imgur.com', 'http://duuberproxy.appspot.com/?url=i.imgur.com');
                }
            }
        },
        init: function() {
            var t;
            if (document.querySelector('.comments-page')) {
                replaceImgur.repLinks(document.querySelectorAll('.comment .usertext a'));
                document.body.addEventListener('DOMNodeInserted', function(event) {
                    t = event.target;
                    if (t.localName === 'div' && t.classList.contains('comment')) {
                        replaceImgur.repLinks(t.querySelectorAll('.usertext a'));
                    }
                }, true);
            } else {
                replaceImgur.repLinks(document.querySelectorAll('a.title,.thumbnail'));
                document.body.addEventListener('DOMNodeInserted', function(event) {
                    t = event.target;
                    if (t.localName === 'div' && t.id && t.id.indexOf('siteTable') !== -1) {
                        replaceImgur.repLinks(t.querySelectorAll('a.title,.thumbnail'));
                    }
                }, true);
        ;    }
        }
    };
    replaceImgur.init();
}())