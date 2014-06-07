// ==UserScript==
// @name           nanikiruTileDirectPost
// @namespace      http://d.hatena.ne.jp/so_blue/
// @author         so_blue
// @version        0.7.1
// @include        http://twitter.com/
// @include        https://twitter.com/
// @include        http://twitter.com/home
// @include        https://twitter.com/home
// ==/UserScript==
(function(){

	//なんとなく麻雀牌っぽくするcss
	GM_addStyle(<><![CDATA[
		span.tiles {
			display: inline-block;
			border: solid 1px #aaa;
			-moz-border-radius: 3px;
			cursor: pointer;
			margin-right: 1px;
		}
		span.tiles:hover {
			background: #ffa500;
			color: #fff;
		}
	]]></>);

	//選択した捨て牌をtextareaにセットする関数
	function choiceTile(evt) {
		var s = '@nanikiru ' + evt.target.textContent + ' #nanikiru';
		var twf = document.forms.namedItem('status_update_form');
		twf.elements.namedItem('status').value = s;
		twf.elements.namedItem('status').focus();
		
		//DIRECT_MODE = true の時はsubmitまでしちゃう
		if (DIRECT_MODE) twf.submit();
	}

	/*
	ユーザースクリプトコマンド追加
	via http://d.hatena.ne.jp/hitode909/20090706/1246868182
	*/
	//ダイレクトポスト設定真偽値取得 ※デフォルトはfalse(ダイレクトポストしない)
	var DIRECT_MODE = eval(GM_getValue('DIRECT_MODE'));
	if (typeof(DIRECT_MODE) == 'undefined') {
		DIRECT_MODE = false;
	}
	//ダイレクトポスト設定メニューを作る
	GM_registerMenuCommand(
		'捨て牌ダイレクトポスト切替',
		function() {
			DIRECT_MODE = !DIRECT_MODE;
			GM_setValue("DIRECT_MODE", uneval(DIRECT_MODE));
			var directText = DIRECT_MODE ? 'する': 'しない';
			alert('捨て牌ダイレクトポスト => ' + directText);
		});

	//nanikiruのつぶやきを取得するXPath
	var xpath = './/span[@class="entry-content"][not(@lang="ja")][contains(concat(" ",normalize-space(../../../@class)," "), " u-nanikiru ")]';
	var func = function(docs) {

		var qs   = document.evaluate(xpath, docs, null, 7, null);
		var tile = document.createElement('span');
		tile.className = 'tiles';

		for (var i = 0, len = qs.snapshotLength; i < len; i++) {
			var q = qs.snapshotItem(i);

			if (/【問題編】/.test(q.innerHTML)) {
				//牌部分とそれ以外に切り分け
				var tiles = q.innerHTML.substring(0, 14);
				var other = q.innerHTML.substring(14);
				var arr   = tiles.split('');
				q.innerHTML = '';
				var j = 0, elm = null;
				while (j < 14) {
					elm = tile.cloneNode(true);
					elm.textContent = arr[j];
					elm.addEventListener('click', choiceTile, false);
					q.appendChild(elm);
					j++;
				}

				//ツモとカンの選択肢追加
				elm = tile.cloneNode(true);
				elm.textContent = 'カン';
				elm.addEventListener('click', choiceTile, false);
				q.appendChild(elm);
				elm = tile.cloneNode(true);
				elm.textContent = 'ツモ';
				elm.addEventListener('click', choiceTile, false);
				q.appendChild(elm);

				//牌以外の部分をappendChild
				var span = document.createElement('span');
				span.innerHTML = other;
				q.appendChild(span);
				
				//処理済マークを付ける
				q.lang = 'ja';
			}
		}
		tile = null;
	}

	document.body.addEventListener('DOMNodeInserted', function(evt) {
		var doc = evt.target;
		func(doc);
	}, false);

	func(document.body);

})();
