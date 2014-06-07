// ==UserScript==
// @name           Amazon_shop_filter
// @namespace      http://d.hatena.ne.jp/Koonies/
// @description    Amazon以外の業者が販売しているときは「ショッピングカートに入れる」ボタンを半透明にします
// @include        http://www.amazon.co.jp/*
// @version        1.2
// ==/UserScript==

(function(){
	function $x(exp) {return document.evaluate(exp,document,null,7,null)};
	if (!$x('//a[text()="在庫状況"]').snapshotItem(0).parentNode.textContent.match(/Amazon\.co\.jp *が販売、発送/)) {
		$x('//label[text()="数量:"]').snapshotItem(0).parentNode.parentNode.parentNode.style.opacity = '0.25';
	}
})();
