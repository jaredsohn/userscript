// ==UserScript==
// @name         Feedly subscribe
// @namespace    http://elektroelch.net
// @description  v0.1 - Feedly subscribe. This one was designed to use as little screen size as possible. It only adds a feed icon in the top right corner. On mouse over the subscribe links are shown.
// ==/UserScript==
// Notes:
// This is a shameless fork of "Jasper's Google Reader subscribe" (http://browservulsel.blogspot.de/2006/01/jaspers-google-reader-subscribe-user.html)

/*

  Author: Lutz Schröer, latz@elektroelch.net
  Date:   2013-07-01

*/

var result = document.evaluate('//link[@rel="alternate"][contains(@type, "rss") or contains(@type, "atom") or contains(@type, "rdf")]', document, null, 0, null);
var item;
var feeds = [];
while (item = result.iterateNext()) feeds.push(item);

if (feeds.length > 0) {
    GM_addStyle('#FeedlyMain { position: fixed; z-index: 32767; top: 0; right: 0; padding: 0 0 0 20px; min-height: 20px; background: 2px 2px url("http://cloud.feedly.com/favicon.ico") no-repeat; }');
    GM_addStyle('#FeedlyMain:hover { padding: 0; }');
    GM_addStyle('#FeedlyMain > div { display: none; }');
    GM_addStyle('#FeedlyMain:hover > div { display: block; padding: 1px 0; background: #f8f8f8; -moz-border-radius: 0 0 0 10px; border: solid #ccc; border-width: 0 0 1px 1px; }');
    GM_addStyle('#FeedlyMain a { display: block; margin: 4px 0; padding: 0 10px; font-family: "Verdana"; font-size: 11px; line-height: 14px; font-weight: normal; color: #669; text-decoration: underline; text-align: left; background: #f8f8f8; border: 0; }');
    GM_addStyle('#FeedlyMain a:hover { color: #f66; }');

    var FeedlyMain = document.createElement('div');
    FeedlyMain.setAttribute('id', 'FeedlyMain');
    document.body.appendChild(FeedlyMain);

    var FeedlyFeeds = document.createElement('div');
    FeedlyMain.appendChild(FeedlyFeeds);

    for (var i = 0, feed; feed = feeds[i]; i++) {
        FeedlyFeeds.innerHTML += '<a href=http://cloud.feedly.com/#subscription/feed/'+ encodeURIComponent(feed.href) +'>'+ feed.title +'</a>';
    }
}
