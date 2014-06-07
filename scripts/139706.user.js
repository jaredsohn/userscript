// ==UserScript==
// @name        google reader - no kyoko
// @namespace   http://d.hatena.ne.jp/Cherenkov/
// @include     https://www.google.co.jp/reader/view/*
// @include     http://www.google.co.jp/reader/view/*
// @include     https://www.google.com/reader/view/*
// @include     http://www.google.com/reader/view/*
// @include     https://www.google.tld/reader/view/*
// @include     http://www.google.tld/reader/view/*
// @version     1.1
// ==/UserScript==

// 【ChromeでGoogleリーダーを見る際、特定のサイトと、そこへのは.. - 人力検索はてな
// http://q.hatena.ne.jp/1343728746


var rules = [/kyoko-np\.net/];
//var rules = [/kyoko-np\.net/, /gizmodo/]; //エントリーのURLにマッチする正規表現オブジェクトを配列に入れてフィルタルールを設定する。
//RegExp - MDN https://developer.mozilla.org/ja/Core_JavaScript_1.5_Reference/Global_Objects/RegExp

GM_addStyle('._GM_NG_FILTER_{display:none!important;}');
function filter() {
	var items = document.querySelectorAll('.entry-title-link');
	for (var i = 0, l = items.length; i < l; i++) {
		var item = items[i];
		var href = item.href;
		var isNG = Array.prototype.some.call(rules, function(e) {
			return e.test(href);
		});
		if (isNG) {
			var entryContainer = document.evaluate('ancestor::*[contains(concat(" ",normalize-space(@class)," "), " entry ")]', item, null, 9, null).singleNodeValue;
			entryContainer.classList.add('_GM_NG_FILTER_');
		}
	}
}

var container = document.querySelector('#viewer-entries-container');
container.addEventListener('DOMNodeInserted', nodeInsertedHandler, false);
function nodeInsertedHandler() {
	container.removeEventListener('DOMNodeInserted', nodeInsertedHandler, false);
	setTimeout(function() {
		filter();
		container.addEventListener('DOMNodeInserted', nodeInsertedHandler, false);
	}, 10);
}