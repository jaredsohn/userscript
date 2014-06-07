// ==UserScript==
// @name           AutoPatchWork3gokushi
// @version        0.0.1
// @namespace      http://userscripts.org/scripts/show/xxxxxx
// @description    ブラウザ三国志でAutoPatchWork(Chrome Extension)を便利に使うためのスクリプト
// @include        http://*.3gokushi.jp/*
// @run-at         document-end
// ==/UserScript==
( function(){

	function reindex_busho_cards(max_index, cardFileList) {
		var sameCheck = {};	// indexの重複チェック用テーブル

		var cards = cardFileList.getElementsByClassName('cardColmn');
		for (var i = 0; i < cards.length; i++) {

			var target = undefined;
			var index = undefined;

			// id="card_frontback\d+"を持つ要素を探す
			for (var j = 0; j < cards[i].childNodes.length; j++) {

				// ノード種別が1(=要素)以外は対象外
				if (cards[i].childNodes[j].nodeType != 1) {
					continue;
				}

				var id = cards[i].childNodes[j].getAttribute('id');
				if (id && id.match(/card_frontback(\d+)$/)) {
					target = cards[i].childNodes[j];
					index = RegExp.$1;
					break;
				}
			}

			if (! index) {
				continue;
			}

			if (sameCheck[index]) {
				// indexが重複している場合は、新しいindexを生成して、idを書き換える
				max_index++;

				target.setAttribute('id', 'card_frontback' + max_index);

				for (var j = 0; j < target.childNodes.length; j++) {
					// ノード種別が1(=要素)以外は対象外
					if (target.childNodes[j].nodeType != 1) {
						continue;
					}

					// "card_frontback\d-front" or "card_frontback\d-back"の「\d」の部分を書き換える
					var id = target.childNodes[j].getAttribute('id');
					if (id && id.match(/card_frontback\d+\-(front|back)$/)) {
						target.childNodes[j].setAttribute('id', 'card_frontback' + max_index + '-' + RegExp.$1);

						var aElements = target.childNodes[j].getElementsByTagName('a');
						for (var k = 0; k < aElements.length; k++) {
							var href = aElements[k].getAttribute('href');
							if (href && href.match(/^javascript:execute(A|B)/)) {
								aElements[k].setAttribute('href', 'javascript:execute' + RegExp.$1 + '(' + max_index + ')');//TODO:
							}
						}
					}
				}

				sameCheck[max_index] = max_index;

			} else {
				// indexが重複してない場合は、記録するだけ
				sameCheck[index] = index;
			}
		}
		return;
	}

	// AutoPatchWork or AutoPagerizeで、次ページを自動読込完了したときの処理
	function pageRefresh() {

		//--------------------------------------------------------------------------------------------------
		// デッキの[9～15枚表示時] 武将カードをクリックして詳細を画面表示させるために、thickboxを再初期化
		//--------------------------------------------------------------------------------------------------

		// userscriptからはwebページ側の関数は直接呼べないので、<script>を生成して無理やりtb_init()を呼ぶ
		var script = document.createElement('script');
		script.innerHTML = "tb_init('a.thickbox, area.thickbox, input.thickbox')";
		document.body.appendChild(script);

		//--------------------------------------------------------------------------------------------------
		// デッキの[カード表示時] 武将カードを裏表返すために、indexを振りなおす
		//--------------------------------------------------------------------------------------------------

		// 現在の最大index値を取得
		var max_index = undefined;
		for (var i = 1; i < 999; i++) {
			if (! document.getElementById('card_frontback' + i)) {
				max_index = (i - 1);
				break;
			}
		}
		if (! max_index) {
			// 最大index値が見つからない時は何もしない
			return;
		}

		// 次ページ読込の結果、indexが重複してしまった場合は、indexをインクリメントして再設定
		var cardFileList = document.getElementById('cardFileList');
		if (cardFileList) {
			reindex_busho_cards(max_index, cardFileList);
		}
		var cardFileListBack = document.getElementById('cardFileListBack');
		if (cardFileListBack) {
			reindex_busho_cards(max_index, cardFileListBack);
		}

		// 一括「カード表表示」「カード裏表示」対応
		var uraomote_area = document.getElementById('card_uraomote');
		if (uraomote_area) {
			var aElements = uraomote_area.getElementsByTagName('a');
			for (var i = 0; i < aElements.length; i++) {
				var href = aElements[i].getAttribute('href');
				if (href && href.match(/javascript:executeA\(999,(\d+)\)/)) {
					aElements[i].setAttribute('href', 'javascript:executeA(999,' + max_index + ')');
				} else if (href && href.match(/javascript:executeB\(999,(\d+)\)/)) {
					aElements[i].setAttribute('href', 'javascript:executeB(999,' + max_index + ')');
				}
			}
		}
	}

	// [Chrome Extension] AutoPatchWork(https://chrome.google.com/extensions/detail/aeolcjbaammbkgaiagooljfdepnjmkfd)の読込完了時
	addEventListener('AutoPatchWork.pageloaded', function() {
		pageRefresh();
	}, false);

	// [Chrome/FireFox/Safari Extension] AutoPagerize(http://autopagerize.net/)の読込完了時
	addEventListener('GM_AutoPagerizeNextPageLoaded', function() {
		pageRefresh();
	}, false);

}) ();
