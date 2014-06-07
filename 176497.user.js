// ==UserScript==  
// @name	amazon-cart-to-calil
// @namespace	http://kiwofusi.sakura.ne.jp/
// @description	Amazonカートにカーリルの検索ページへのリンクを追加します。
// @include	http://www.amazon.co.jp/gp/cart/*
// ==/UserScript==  


(function () {
	var DEBUG = false;
	function p(obj) { // printデバッグ用
		if (DEBUG) unsafeWindow.console.log(obj)
	}
	p("start");
	
	try {
		// アイテム集合を取得する
		var items = document.getElementsByClassName("cart-item")
		for(var i = 0; i < items.length; i++) {
			// 検索パラメータを取得する
			var item_asin = items[i].getAttribute("asin")
			var item_title = items[i].getElementsByClassName("product-title")[0].textContent // innerText
			item_title = item_title.replace(/^\s+|\s+$/g, "").split(/[\(\[\-\―（－~～]/)[0] // 副題や出版社を省略する
			item_title = encodeURI(item_title)
			
			// リンク追加位置を取得する
			var buttons_elms = items[i].getElementsByClassName("buttons")
			buttons = buttons_elms[buttons_elms.length-1] // カートと保存カートで位置が異なるので「最後」のを取る
			// リンクを追加する
			buttons.setAttribute("style", "margin-right: 1em;") // 余計な余白をなくす
			calil_link = " · <a href=\"http://calil.jp/search?q=" + item_asin + "\" target=\"_blank\">カーリル</a>"
			calil_link_title = " · <a href=\"http://calil.jp/search?q=" + item_title + "\" target=\"_blank\">カーリル(書名)</a>"
			buttons.innerHTML += calil_link + calil_link_title
			
			// カーリルはAmazon準拠なのでASINも書名も可
			// その他加えたいリンク：ネットオフ、ブックオフオンライン、駿河屋、読書メーター、ブクログ
		}

	} catch(e) {
		p(e);
	}
	
	p("end");
})();

