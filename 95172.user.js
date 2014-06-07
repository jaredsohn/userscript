// ==UserScript==
// @name           yahoo japan auction rewrite listing link
// @namespace      causeless
// @include        http://openuser.auctions.yahoo.co.jp/jp/show/mystatus?select=*
// ==/UserScript==
// マイ・オークションに表示されるIDに評価へのリンクを追加する

var snap = document.evaluate( "//a[contains(@href, 'http://openuser.auctions.yahoo.co.jp/jp/user/')]" , document,null,7,null );

for (var i=0; i<snap.snapshotLength; i++) {
	var t = snap.snapshotItem(i)
	var a = document.createElement('a');
	var u = t.href.split('/').pop();
	var sp = document.createTextNode(' ');

	if (t.textContent.indexOf(u) == -1) {
		continue;
	}

	a.href = 'http://rating.auctions.yahoo.co.jp/jp/show/rating?userID=' + u + '&filter=-1';
	a.textContent = '(評価)';

	t.parentNode.insertBefore(sp,t.nextSibiling);
	t.parentNode.insertBefore(a,t.nextSibiling);
}

