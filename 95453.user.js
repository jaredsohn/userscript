// ==UserScript==
// @name           yahoo japan auction colorize bid log
// @namespace      causeless
// @include        http://page*.auctions.yahoo.co.jp/jp/show/bid_hist?aID=*&typ=log
// ==/UserScript==

var snap = document.evaluate( "id('modCtgSearchResult')//td" , document,null,7,null );

var autobid = [];
var bid = [];

for (var i=0; i<snap.snapshotLength; i++) {
	var t = snap.snapshotItem(i);

	/\] ([0-9A-Za-z_]*?) /.test(t.textContent);
	var u = RegExp.$1;

	if (t.textContent.indexOf(' 入札。') != -1) {
		t.setAttribute('style','color: red;' + t.getAttribute('style'));

		for (var j = 0; j < bid.length; j += 1) {
			if (u == bid[j]) {
				break;
			}
		}
		if (j == bid.length) {
			// new
			bid.push(u);
			t.textContent += ' <-- 最新';
		}
	}


	for (var j = 0; j < autobid.length; j += 1) {
		if (u == autobid[j]) {
			break;
		}
	}
	if (j == autobid.length) {
		// new
		autobid.push(u);

		t.setAttribute('style','color: blue;' + t.getAttribute('style'));

		var a = document.createElement('a');
		a.textContent = '('+ u + 'の評価)'
		a.href = 'http://rating.auctions.yahoo.co.jp/jp/show/rating?userID=' + u + '&filter=-1';
		
		t.textContent += ' <-- 入札額 ';
		t.appendChild(a);

	}


}
