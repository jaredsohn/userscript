// ==UserScript==
// @name         bloglines subscribe
// @namespace    http://www.bryantsai.com/
// @description  v0.1 - bloglines subscriber based on Jasper's Google Reader subscribe. "This one was designed to use as little screen size as possible. It only adds a feed icon in the top right corner. On mouse over the subscribe links are shown."
// ==/UserScript==

var result = document.evaluate('//link[@rel="alternate"][contains(@type, "rss") or contains(@type, "atom") or contains(@type, "rdf")]', document, null, 0, null);
var item;
var feeds = [];
while (item = result.iterateNext()) feeds.push(item);

if (feeds.length > 0) {
	GM_addStyle('#JGRSmain { position: fixed; z-index: 32767; top: 0; right: 0; padding: 0 0 0 20px; min-height: 20px; background: 2px 2px url("chrome://browser/skin/page-livemarks.png") no-repeat; }');
	GM_addStyle('#JGRSmain:hover { padding: 0; }');
	GM_addStyle('#JGRSmain > div { display: none; }');
	GM_addStyle('#JGRSmain:hover > div { display: block; padding: 1px 0; background: #f8f8f8; -moz-border-radius: 0 0 0 10px; border: solid #ccc; border-width: 0 0 1px 1px; }');
	GM_addStyle('#JGRSmain a { display: block; margin: 4px 0; padding: 0 10px; font-family: "Verdana"; font-size: 11px; line-height: 14px; font-weight: normal; color: #669; text-decoration: underline; text-align: left; background: #f8f8f8; border: 0; }');
	GM_addStyle('#JGRSmain a:hover { color: #f66; }');

	var JGRSmain = document.createElement('div');
	JGRSmain.setAttribute('id', 'JGRSmain');
	document.body.appendChild(JGRSmain);

	var JGRSfeeds = document.createElement('div');
	JGRSmain.appendChild(JGRSfeeds);

	for (var i = 0, feed; feed = feeds[i]; i++) {
		JGRSfeeds.innerHTML += '<a href=http://www.bloglines.com/sub/'+ feed.href +'>'+ feed.title +'</a>';
	}
}
