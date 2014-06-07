// ==UserScript==
// @name          Add TwitterKensaku
// @namespace     http://ss-o.net/
// @description   twitterの画面に「twitter検索」用の検索窓を表示します
// @include       http://twitter.com/*
// ==/UserScript==
//
// this script based on Add TwitterKensaku
//   by  http://twitter.g.hatena.ne.jp/hayashih/20070527
(function(d){
	if(!(d=document.getElementById('side'))) return;
	var POSITION_AT_SECTION = 1;

	var search_twitter_com = [
		'<div class="section-header"><h1>Twitter Search</h1></div>'
		,'<form action="http://search.twitter.com/search" method="get" target="_blank">'
		,'<input type="text" name="q" size="20" value="" />'
		,'<input type="submit" value="Search" />'
		,'<br>[<a href="http://search.twitter.com/advanced" target="_blank">Advanced Search</a>]<br>'
		,'</form><br>'
	].join('\n');

	// http://pcod.no-ip.org/yats/search?query=twitter
	var pcod_no_ip_org_yats = [
		'<div class="section-header"><h1>Twitter 検索</h1></div>'
		,'<form action="http://pcod.no-ip.org/yats/search" method="get" target="_blank">'
		,'<input type="text" name="query" size="20" value="" />'
		,'<input type="submit" value="検索" />'
		,'<br><input type="checkbox" name="lang" id="lang" value="ja"checked="checked"/><label for="lang">日本語ユーザーのみ表示 (beta)</label>'
		,'</form><br>'
	].join('\n');

	var twitter_1x1_jp = [
		'<div class="section-header"><h1>Twitter 検索</h1></div>'
		,'<form action="http://twitter.1x1.jp/search/" method="get" target="_blank">'
		,'<input type="text" name="keyword" size="20" value="" />'
		,'<input type="submit" value="検索" />'
		,'<br><label><input type="checkbox" checked="checked" name="text" value="1" />本文のみ</label>'
		,'[<a href="http://www.1x1.jp/blog/2007/08/twitter_search_option.html" target="_blank">検索式</a>]<br>'
		,'</form><br>'
	].join('\n');

	var buzztter_com_ja = [
		'<div class="section-header"><h1>buzztter 検索</h1></div>'
		,'<form action="http://buzztter.com/ja/k/" onsubmit="window.open(this.action+this.keyword.value);return false;" method="get">'
		,'<input type="text" name="keyword" size="20" value="" />'
		,'<input type="submit" value="検索" />'
		,'</form><br>'
	].join('\n');

	var div = document.createElement('div');
	div.className = 'section';
	div.innerHTML = ''
		+ search_twitter_com
		+ pcod_no_ip_org_yats
		+ twitter_1x1_jp
		+ buzztter_com_ja
	;

	d.insertBefore(div, d.getElementsByClassName("section")[POSITION_AT_SECTION]);
})();
