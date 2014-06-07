// ==UserScript==
// @name           HatenaBookmarkSort
// @namespace      star.zero
// @version        1.0.0
// @include        http://b.hatena.ne.jp/
// @include        http://b.hatena.ne.jp/hotentry*
// @description    はてなブックマークをブックマーク数が多い順にソートする
// ==/UserScript==
(function() {

	// エントリーをソートし再表示する
	function sortEntry(entry) {

		// 子要素
		var elems = Array.prototype.slice.call(entry.childNodes);

		var i = 0;
		var elem;

		var arr = [];

		while (elem = elems[i++]) {
			if (elem.tagName && elem.tagName.toLowerCase() == 'li') {
				// ブックマーク数取得
				var user = elem.getElementsByClassName('users')[0];
				var text = user.getElementsByTagName('a')[0].innerHTML;
				var num = Number(text.match(/\d+/));
				// オブジェクト生成
				var o = {};
				o.num = num;
				o.elem = elem;
				// 配列にpush
				arr.push(o);
			}
		}

		// ブックマーク数の降順にソート
		arr.sort(function(a, b) {
			return (a.num < b.num) ? 1 : -1;
		});

		// 既存の要素を削除
		while(entry.childNodes.length) {
			entry.removeChild(entry.firstChild);
		}

		i = 0;
		var e;

		// 要素を再表示
		while (e = arr[i++]) {
			entry.appendChild(e.elem);
		}
	}

	// エントリー取得
	var entrys = Array.prototype.slice.call(document.getElementsByClassName('hotentry'));
	for (var i = 0, entry; entry = entrys[i]; i++) {
		if (entry.tagName.toUpperCase() == 'UL') {
			// ソート処理
			sortEntry(entry);
		}
	}

})();