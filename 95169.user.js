// ==UserScript==
// @name           yahoo japan auction force negative filter
// @namespace      causeless
// @include        http://*.auctions.yahoo.co.jp/*
// @include        http://auctions.search.yahoo.co.jp/*
// ==/UserScript==
// Yahoo! Japan オークションで評価を表示する際、「全て表示」を「悪い評価のみ表示」に自動で切り替える
// 追加効果として、Yahooのクリックトラッキング機能を除去する。

if (location.href.indexOf('.auctions.yahoo.co.jp/jp/show/rating?userID=') != -1 && location.href.indexOf('&filter=') == -1) {
	location.replace(location.href + '&filter=-1');
}

var snap = document.evaluate( "//a[contains(@href,'.auctions.yahoo.co.jp/jp/show/rating?userID=') and not(contains(@href,'&filter='))]" , document,null,7,null );

for (var i=0; i<snap.snapshotLength; i++) {
	var t = snap.snapshotItem(i);
	t.href += '&filter=-1';
}

var snap = document.evaluate('//a[starts-with(@onmousedown,"this.href=\'http://ord.yahoo.co.jp/")]' , document,null,7,null );
for (var i=0; i<snap.snapshotLength; i++) {
	var t = snap.snapshotItem(i);
	t.setAttribute('onmousedown', null);
}

