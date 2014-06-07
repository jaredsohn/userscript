// ==UserScript==
// @name          hatebu star GV
// @namespace     http://www.petitnoir.net/
// @description   
// @include       http://b.hatena.ne.jp/entry/*
// ==/UserScript==

///////////////////////////////////////////////////////
// hatenastarをinterval個ある毎にcoefficientの値だけ薄くなっていきます。
//interval = 5 , coefficient = 0.2 の場合
//1ページで合計4つのはてなスターを付けたユーザーの透過度は1.0です。
//合計5つのはてなスターを付けたユーザーの透過度は0.8です
//合計25以上付けると透過度が0となり見えなくなります。
var  interval= 5;
var coefficient = 0.2;
//問答無用で透過度を0にしてしまうユーザーはここに記入
//記入例 ignore_id = ["user1","user2","user3"]
var ignore_id = [];
///////////////////////////////////////////////////////

(function (){
	setTimeout(function(){
		var stars = document.evaluate('//img[@class = "hatena-star-star"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
		var count = new Array();
		for (i=0; i < stars.snapshotLength; i++) {
			count[stars.snapshotItem(i).alt] = 0;
		}
		for (i=0; i < stars.snapshotLength; i++) {
			count[stars.snapshotItem(i).alt] += 1;
		}
		for (i=0; i < stars.snapshotLength; i++) {
			stars.snapshotItem(i).style.opacity = 1 - Math.floor(count[stars.snapshotItem(i).alt] / interval) * coefficient;
			for (j =0; j < ignore_id.length; j++){
				if (stars.snapshotItem(i).alt == ignore_id[j]){
					stars.snapshotItem(i).style.opacity = 0;
				}
			}
		}
	},4000);
})();