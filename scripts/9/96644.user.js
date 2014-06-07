// ==UserScript==
// @name           amazon_order_check
// @namespace      http://example.com/
// @description    Amazonで同じ商品を2つ以上注文していたら警告を表示します。
// @include        http://www.amazon.co.jp/*
// @include        https://www.amazon.co.jp/*
// ==/UserScript==

(function (){
	// 警告メッセージ情報
	var warn = {
		message: '２つ以上注文している商品があります。<br>' +
		         '二重注文していないか数量を確認してください。',
		style: {
			backgroundColor: '#FFC000',
			borderStyle: 'solid',
			borderWidth: '4px',
			fontSize: '32pt',
			fontWeight: 'bold',
			padding: '20px'
		}
	};
	
	// エラーメッセージ情報
	var error = {
		message: 'Amazon注文チェックスクリプトでエラーが発生しました。<br>' +
		         '二重注文チェックができませんでした。<br>' +
		         'あなたの目で注文数量をよく確認してください。',
		style: {
			backgroundColor: '#FF8080',
			borderStyle: 'solid',
			borderWidth: '4px',
			fontSize: '32pt',
			fontWeight: 'bold',
			padding: '20px'
		}
	};
	
	// ページ設定
	var pages = [
		// href : チェックを適用するページのURL文字列。
		// cart : カートに商品がある場合に存在するはずのカート要素のXPath文字列。
		// items: カートにある商品要素のXPath文字列。
		// getter: 商品個数を表す要素を取り出すための関数。
		// pattern: 商品個数を抽出するための正規表現文字列。
		{
			// カートに入れた直後の画面
			href: 'http://www.amazon.co.jp/gp/cart/view-upsell.html',
			cart: '//form[@id="cartViewForm"]',
			items: "//td/span[@class='tiny']",
			getter: function(node){
				return node.firstChild.nodeValue;
			},
			pattern: "数量: (\\d+)",
		}
        , {
			// カートを見る
			href: 'http://www.amazon.co.jp/gp/cart/view.html/',
			cart: '//a[@name="tobuynow"]',
			items: '//form[@id="cartViewForm"]//input[@type="text"]',
			getter: function(node){
				return node.value;
			},
			pattern: "(\\d+)",
		}
        , {
			// 注文確定前の確認画面
			href: 'https://www.amazon.co.jp/gp/buy/payselect/handlers/continue.html',
			cart: null,
			items: '//span[@class="tiny"]',
			getter: function(node){
				return node.firstChild.nodeValue;
			},
			pattern: '数量[:： 　]*(\\d+)',
		}
        /*
        /**/
	];
	
	main(document);
	
	// メイン処理
	function main(){
		for(var i = 0, n = pages.length; i < n; i++){
			if(! processPage(pages[i])){
				return;
			}
		}
	}
	
	// 指定したページ情報を処理する。
	function processPage(page){
		// 処理対象ページかチェックする。対象外なら正常終了。
		var href = document.location.href;
		if(href.indexOf(page.href) != 0){
			return true;
		}
		
		// 必要があれば、処理対象カートの存在をチェックする。存在しなければ正常終了。
		if(page.cart){
			var cart = $X(page.cart, document);
			if(! cart.snapshotLength){
				return true;
			}
		}
				
		// 処理対象商品の存在をチェックする。存在しなければエラー。
		var items = $X(page.items, document);
		if(! items.snapshotLength){
			return showMessage(error);
		}
		
		// 商品個数をチェックする。
		var hits = 0;
		var re = new RegExp(page.pattern);
		for(var i = 0, n = items.snapshotLength; i < n; i++){
			var text = page.getter(items.snapshotItem(i));
			var counter = (re.exec(text) || [])[1];
			if(counter){
				hits++;
				if(2 <= counter){
					return showMessage(warn);
				}
			}
		}
		
		// 商品個数を表す要素の取得に失敗していればエラー。
		if(hits == 0){
			return showMessage(error);
		}
		
		return true;
	}
	
	// 指定されたメッセージを表示する。
	function showMessage(messageData){
		var elem = document.createElement("div");
		elem.innerHTML = messageData.message;
		for(var k in messageData.style){
			elem.style[k] = messageData.style[k];
		}
		
		var body = document.getElementsByTagName('body')[0];
		body.insertBefore(elem, body.firstChild);
		
		return false;
	}
	
	// 指定したXPath文字列から要素を取得する。
	function $X(xpath, node){
		var nodes = node.evaluate(xpath,
			node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		return nodes;
	}
})();
