// ==UserScript==
// @name        画像映像色反転
// @namespace   http://tys11.net/
// @description ページ内の画像や動画の色を反転します。
// @include     http://*
// @include     https://*
// @include     ftp://*
// @run-at 　　　document-start
// @grant       none
// @version     1.0.1
// ==/UserScript==

const 
	white = new RegExp("\\.jpe?g|^data:image/jpeg;|https?://encrypted-tbn(\\d+)?\\.gstatic\\.com/|https?://t(\\d+)?\\.gstatic\\.com/|http://img\\.tinami\\.com/|http://i(\\d+)?\\.pixiv\\.net/|http://img-comic\\.pixiv\\.net/|http://r(\\d+)?\\.isearch\\.c\\.yimg\\.jp/|http://tc(\\d+)?\\.search\\.naver\\.jp/|http://tn-skr(\\d+)?\\.smilevideo\\.jp/|http://lohas\\.nicoseiga\\.jp/|http://dic\\.nicovideo\\.jp/oekaki(_thumb)?/|http://p\\.twpl\\.jp/show/|http://(\\d+\\.)?media\\.tumblr\\.com/", "i"),
	black = new RegExp("logo\\.jpe?g$", "i"),
	embed = new RegExp("^http://video\\.fc2\\.com/flv3\\.swf\\?|^http://static\\.fc2\\.com/saymove/flash/movie\\.swf\\?|^http://himado.in/player\\.swf|^https?://fbstatic-a\\.akamaihd\\.net/rsrc\\.php/|^http://live\\.nicovideo\\.jp/nicoliveplayer\\.swf\\?|^http://nl\\.nimg\\.jp/public/swf/liveplayer\\.swf\\?|^http://res\\.nimg\\.jp/swf/player/nicoplayer\\.swf\\?|^http://s\\.ytimg\\.com/yts/swfbin/watch_as3-vflcwIWb1\\.swf"),
	object = new RegExp("^http://static1\\.dmcdn\\.net/flash/dmplayerv4/dmplayer-prod-compressed\\.swf|^http://static-cdn1\\.ustream\\.tv/swf/live/viewer:|^http://res\\.nimg\\.jp/swf/player_zero/nicoplayer\\.swf\\?"),
	backurl = new RegExp("url\\(([^\\)]*)\\)"),
	filterMethod = "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPg0KIDwhLS0gaHR0cDovL3VzZXJzdHlsZXMub3JnL3VzZXJzLzExNzg2NCAtLT4NCiA8ZmlsdGVyIGlkPSJpbnZyb3QiIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0ic1JHQiI+DQogIDxmZUNvbG9yTWF0cml4IHR5cGU9Im1hdHJpeCIgdmFsdWVzPSINCgktMSAwIDAgMCAxDQoJMCAtMSAwIDAgMQ0KCTAgMCAtMSAwIDENCgkwIDAgMCAxIDAiLz4NCiAgPGZlQ29sb3JNYXRyaXggdHlwZT0iaHVlUm90YXRlIiB2YWx1ZXM9IjE4MCIvPg0KIDwvZmlsdGVyPg0KPC9zdmc+#invrot)",
	xpath = "//img[@src and not(contains(@style,'filter: "+filterMethod+"'))] | //*[not(contains(@style,'filter: "+filterMethod+"'))and (contains(translate(normalize-space(@style), ' ', ''),'background-image:url(') or contains(translate(normalize-space(@style), ' ', ''),'background:url('))] | //embed[@src and not(contains(@style,'filter: "+filterMethod+"'))] | //object[@data and not(contains(@style,'filter: "+filterMethod+"'))]";
var timer = 0;
function filterAll()
{
	var e, i, result = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (i=0; i<result.snapshotLength; i++) {
		e = result.snapshotItem(i);
		if (e.tagName == "IMG" && matchList(e.src) ||
			e.tagName == "EMBED" && embed.test(e.src) ||
			e.tagName == "OBJECT" && object.test(e.data) ||
			(e.style.background.match(backurl) != null || e.style.backgroundImage.match(backurl) != null) && matchList(RegExp.$1)) {
			e.style["filter"] = filterMethod + " " + e.style["filter"];
		}
	}
	timer = 0;
}
function matchList(src)
{
	return white.test(src) && !black.test(src);
}
function listener()
{
	if (timer) return;
	timer = setTimeout(filterAll, 0);	
}
document.addEventListener("DOMContentLoaded", listener, false);
document.addEventListener("DOMSubtreeModified", listener, false);
