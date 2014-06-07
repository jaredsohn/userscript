// ==UserScript==
// @name           chiebukuroUsefulPointGetter
// @namespace      http://d.hatena.ne.jp/so_blue/
// @author         so_blue
// @version        0.3.1
// @include        http://my.chiebukuro.yahoo.co.jp/my/myspace_ansdetail.php*
// @include        http://my.chiebukuro.yahoo.co.jp/my/myspace_quedetail.php*
// ==/UserScript==
(function(){

	GM_addStyle(<><![CDATA[
		span.useful_info {
			display: inline-block;
			width: 120px;
			margin-right: 5px;
			padding: 2px 5px;
			border: solid 1px #ccc;
			font-size: small;
			-moz-border-radius: 5px;
		}
	]]></>);

	/*
	諸々のxpath
	*/
	//解決済み質問取得
	var xpathEndQ   = './/img[contains(@alt,"解決済")]/following-sibling::span/small/a[not(@lang="ja")]';
	//公開idの取得
	var xpathOpenID = 'id("my_top_header_bgbase")/h2';
	//ベストアンサー回答者
	var xpathBAId   = './/div[contains(@class, "bestAnswer")]//div[@class="qa"]/p[contains(@class, "user-name")]//em';
	//閲覧回数
	var xpathVTime  = './/li[@class="infoborder-none"][1]//dd';
	//お役立ち度
	var xpathUPoint = './/div[@class="useful"]/p';

	var openId = document.evaluate(xpathOpenID, document, null, 7, null).snapshotItem(0).textContent;
	
	var func = function(doc) {
		//解決済みのa要素だけ取得
		var anchors = document.evaluate(xpathEndQ, doc, null, 7, null);
		if (anchors) {
			for (var i = 0, len = anchors.snapshotLength; i < len; i++) {
				var a = anchors.snapshotItem(i)
				a.lang = 'ja';
				var sURL = a.href.split('\*-')[1];
				GM_xmlhttpRequest({
					method: 'GET',
					url: sURL,
					onload: addUsefulPoint(a)
				});
			}
		}
	}

	//評価ポイントの要素を追加する
	function addUsefulPoint(node) {
		return function(res) {
			var div = document.createElement('DIV');
			div.innerHTML = res.responseText;
			//ベストアンサー
			var BA = document.evaluate(xpathBAId, div, null, 9, null).singleNodeValue;
			//お役立ちポイントの取得
			var UP = document.evaluate(xpathUPoint, div, null, 9, null).singleNodeValue;
			//閲覧回数
			var VT = document.evaluate(xpathVTime, div, null, 9, null).singleNodeValue;
			console.log(BA);
			if (!BA || !UP || !VT) return;

			//お役立ちポイントを y / x 表示にする
			var arr = UP.textContent.split('\u4eba\u4e2d');
			var s1 = arr[0].match(/\d+/).join(''), s2 = arr[1].match(/\d+/).join('');
			//var s = '閲覧数：' + VT.textContent + '　' + '評価：' + s2 + ' / ' + s1;
			var s = VT.textContent + '　　' + s2 + ' / ' + s1;
			var span = document.createElement('SPAN');
			span.className = 'useful_info';

			//ベストアンサーが自分かどうかを判定して、自分の場合は背景色をピンクに変える
			if (BA.textContent === openId.replace('さんのMy知恵袋', '')) span.style.backgroundColor = '#FFEC8B';
			span.textContent = s;
			var before = node.parentNode.parentNode;
			node.parentNode.parentNode.parentNode.insertBefore(span, before);
		}
	}

	document.body.addEventListener('AutoPagerize_DOMNodeInserted', function(evt) {
		var doc = evt.target;
		func(doc);
	}, false);

	func(document.body);

	
})();