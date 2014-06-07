// ==UserScript==
// @name           HN Splitview
// @namespace      hacker_news_sv
// @description    Split view for Hacker News
// @include        http://news.ycombinator.com/*
// ==/UserScript==
(function () {
    e=document.createElement('script');
    e.setAttribute('src','http://www.nirmalpatel.com/splitter.js');
    document.body.appendChild(e);
})();