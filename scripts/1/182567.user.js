// ==UserScript==
// @name           Amazon marketplace filter
// @namespace      none
// @description    マーケットプレイスの場合「ショッピングカートに入れる」ボタンを半透明にします
// @include        http://www.amazon.co.jp/*
// @version        1.0
// ==/UserScript==


(function(){
	function $x(exp) {return document.evaluate(exp,document,null,7,null)};
	if (!$x('//a[text()="在庫状況"]').snapshotItem(0).parentNode.textContent.match(/Amazon\.co\.jp *が販売、発送/)) {
		document.getElementById('buyboxDivId').style.opacity = 0.35;
	}
})();
