// ==UserScript==
// @name			Kindle2kobo (for Japanese)
// @description		Amazon.co.jpのKindle本に楽天koboへのリンクを表示します。
// @namespace		http://userscripts.org/scripts/show/178869
// @include			http*://www.amazon.co.jp/gp/product/*
// @include			http*://www.amazon.co.jp/*-ebook/dp/*
// @include			http*://www.amazon.co.jp/s/*
// @include			http*://www.amazon.co.jp/b/*
// @version			0.7
// @downloadURL		http://userscripts.org/scripts/source/178869.user.js
// @updateURL		http://userscripts.org/scripts/source/178869.meta.js
// @run-at			document-end
// ==/UserScript==


(function () {
	'use strict';

//	if (unsafeWindow && window !== unsafeWindow.top) {
//		return;
//	}
	
	var sites = [
		{	// Amazon.co.jp 個別ページ
			url: "^https?://www\\.amazon\\.co\\.jp/.*\\-ebook/dp/\\w{10}",
			onAttach: function () {
				var titleNode = document.getElementById("btAsinTitle");
				var a = titleNode.parentNode.parentNode.getElementsByTagName("a");
				var author = "";
				if (a.length > 0) { 	// 複数の著者がいる場合、最初の著者のみ使用
					if (a[0].parentNode.className.indexOf("buying") !== -1) {
						author = a[0].textContent;
					}
				}
				var url = createToKoboUrl(titleNode.textContent.replace(/\s+\[Kindle版\].*$/, ""), author);	// authorが一人でない場合 全ての<a>から取得
				document.querySelector("li.listItem").parentNode.insertAdjacentHTML("beforeend", '<li class="listItem"><a href="' + url + '" target="_blank">この本を kobo で検索する</a></li>');
			},
		},
		{	// Amazon.co.jp 検索結果 & カテゴリ一覧
			url: "^https?://www\\.amazon\\.co\\.jp/(s|[^/]+/b)/",
			onAttach: function () {
				var handle = function (node) {
					Array.prototype.some.call(node.getElementsByTagName("a"), function (elm) {
						// もしくはelm.getAttribute("href")に-ebook/が含まれているかで判断できる
						if (elm.textContent.indexOf("Kindle版") !== -1) {
							let url = createToKoboUrl(node.querySelector("h3.newaps > a").textContent, node.querySelector("h3.newaps > span").textContent.replace(/\s*\(.*$/, "").replace(/、.*$/g, ""));	// " (2013/9/1) - Kindle本" 除去 (著者名が無い場合があるので\s*にすること
							elm.insertAdjacentHTML("afterend", '<a href="' + url + '" target="_blank">koboで検索</a>');
							return true;
						}
						return false;
					});
				};
				
				for (let i = 0, result = document.getElementsByClassName("celwidget"); i < result.length; i++) {
					handle(result[i]);
				}
				
				// for AutoPagerize
				document.body.addEventListener('AutoPagerize_DOMNodeInserted', function (evt) {
				//	var requestURL = evt.newValue;
				//	var parentNode = evt.relatedNode;
					handle(evt.target);	// <div>単位
				}, false);

			},			
		},
		/*
		{	// Kobo 個別ページ
			url: "^http://rakuten\\.kobobooks\\.com/ebook/[^\/]+/book\\-[\\w]+/",
		},
		{	// Kobo 検索結果 & ランキングTOP50 
			url: "^http://rakuten\\.kobobooks\\.com/(search/search\\.html|top50\\.html)",
		},*/
	];

	try {
		for (let i = 0; i < sites.length; i++) {
			if ((new RegExp(sites[i].url)).test(location.href)) {
				sites[i].onAttach();
				break;
			}
		}
	} catch (e) {
		console.log("Kindle2Kobo: " + e);
	}
/*
	function createToAmazonUrl(title, author) {
		return "http://www.amazon.co.jp/s/?url=search-alias%3Ddigital-text&field-keywords=" + encodeURIComponent(trim(title) + " " + trim(author)));
	}
*/	
	function createToKoboUrl(title, author) {
		title = zen2han(title).replace(/（/g, "(").replace(/）/g, ")").replace(/\([^\d]+\)$/, "").replace(/\((\d+)\)/, " $1 ");	// (ヤングチャンピオンコミックス) などの削除。(数字)を数字に変換
		var word = trim(title + " " + author).replace(/\s+/g, " ");
		
		
		return "http://hb.afl.rakuten.co.jp/hgc/11c47cf2.88df3437.11c47cf3.bb72870f/?pc=" + encodeURI("http://rakuten.kobobooks.com/search/search.html?q=" + encodeURIComponent(word)) + "%26scid%3daf_link_urltxt&amp;m=http%3a%2f%2frakuten.kobobooks.com";
	}
	
	function trim(str) {
		return str.replace(/^\s+|\s+$/g, "");
	}
	
	function zen2han(str) {
		return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s) {
		    return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
		});
	}
})();

