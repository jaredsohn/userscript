// ==UserScript==
// @name           amazon-to-hon.jp
// @version        1.0
// @namespace      http://userscripts.org/users/438377
// @author         henge
// @description    amazonの商品ページにhon.jpの電子書籍検索結果を表示する
// @include        http://www.amazon.co.jp/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @run-at         document-end
// ==/UserScript==

(function () {
	// 商品ページ判定
	if($("#btAsinTitle").size() == 0) return;

	// 商品種別判定
	if(!isBook() && !isKindle()) return;

	const BASE_URL = "http://hon.jp/rest/2.1/";
	const OTOMODACHI_ID = "aOENZ00002"; // hon.jpアカウントのお友達IDを設定してください

	// タイトル取得
	var title = $("#btAsinTitle").contents().filter(function() {
		return this.nodeType == 3;
	}).text();
	keywords = parseTitle(title);
	
	// 著者取得(先頭の1名のみ)
	author = $(".parseasinTitle").parent("div").find("a:first").text();
	hardware = 70; // PC
	
	count = 0;
	request();

	// hon.jpへの問い合わせ
	function request() {
		GM_xmlhttpRequest({
			method: 'GET',
			url: buildUrl(keywords, count),
			onload: function (response) {
				xml = $(response.responseText);
				results = xml.find('results');
				html = '<div id="honjp">';
				
				if(results.size() > 1) { // 複数作品の場合
					html += "<div class='multiple'>複数の作品がヒットしました</div>";
					results.each(function(){
						title = $(this).find("title").text();
						creator = $(this).find("creator").text();
						publisher = $(this).find("publisher").text();
						html += "<div class='hontitle'>" + title + " " + creator + "(" + publisher + ")</div>";

						details = $(this).find("details");
						details.each(function(){
							shop = $(this).find("shop").text();
							url = $(this).find("url").text();
							html += '<a target=_blank href="' + url + '">' + shop + '</a>';
						});
						html += "<br>";
					});
				} else { // 1作品の場合
					details = xml.find("details");
					if (details.size() > 0) {
						details.each(function(){
							shop = $(this).find("shop").text();
							url = $(this).find("url").text();
							html += '<a target=_blank href="' + url + '">' + shop + '</a>';
						});
						
					} else {
						if (count < 3 && keywords.length - count > 1) {
							count++;
							request();
							return;
						} else {
							html += "電子書籍は見つかりませんでした。";
						}
					}
				}
				if (OTOMODACHI_ID == "aOENZ00002") {
					html += "<div class='warning'>お試し用のお友達IDが使用されています。hon.jpアカウントのお友達IDを設定してください。</div>";
				}
				html += "</div>";
				
				$(".parseasinTitle").parent("div").append(html);
				$("#honjp a").css("padding", "0 3px");
				$("#honjp .warning").css("color", "red");
				$("#honjp .multiple, #honjp .hontitle").css("font-weight", "bold");
			}
		});
	}

	function parseTitle(title) {
		// 記号
		pattern = /[―!！"”#＃$＄%％&＆(（)）=＝^＾~～\\￥|｜,，、.．。<>＜＞〈〉`｀\/／・?？＼_＿[\]「」{}｛｝+＋;；*＊:：]/g;
		// 連続した空白
		pattern2 = /[\s　]{2,}/g;
		// 前後の空白
		pattern3 = /(^[\s　]+)|([\s　]+$)/g;

		return title.replace(pattern, " ").replace(pattern2, " ").replace(pattern3, "").split(/[\s　]/);
	}

	function buildUrl(keywords, count) {
		len = keywords.length - count;
		url = BASE_URL;
		for (i = 0; i < len; i++) {
			url += keywords[i] + " ";
		}
		url += author + "/" + OTOMODACHI_ID + "/hardware=" + hardware;
		return url;
	}
	// 書籍の判定
	function isBook() {
		// isbnの取得
		isbn10 = null;
		isbn13 = null;
		$("table .bucket .content li").each(function() {
			text = this.textContent;
			if(text.indexOf("ISBN-10:") >= 0) {
				isbn10 = text.match(/\d{10}/)[0];
				return false;
			}
			if(text.indexOf("ISBN-13:") >= 0) {
				isbn13 = text.match(/\d{3}-\d{10}/)[0].replace("-", "");
				return false;
			}
		});
		return (isbn10 !== null || isbn13 !== null);
	}

	// キンドル版の判定
	function isKindle() {
		edition = $("#btAsinTitle span").text();
		return edition.indexOf("Kindle") >= 0;
	}
})();
