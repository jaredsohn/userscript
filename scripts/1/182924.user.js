// ==UserScript==
// @name           etao rss Link fix
// @version        1.0
// @description    替换www.etao.com的rss订阅中错误的跳转连接
// @include       http://www.etao.com/*
// @include       https://www.etao.com/*
// @installURL    http://userscripts.org/scripts/source/182924.user.js
// @updateURL    http://userscripts.org/scripts/source/182824.meta.js
// @run-at        document-end
// ==/UserScript==

var eturl = location.href.toLowerCase();
if (eturl.indexOf('www.etao.com/?#') > 0) {
    location.href = eturl.replace(/http:\/\/www\.etao\.com\/..(\d+)/, 'http://www.etao.com/youhui/1-$1.html');
};
