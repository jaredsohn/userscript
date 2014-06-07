// ==UserScript==
// @name           wheel reloader
// @namespace      himuro
// @description    Reloads page by mouse wheel on page bottom
// @include        http://*
// ==/UserScript==
(function() {
/*
ステータスバーへの表示はFirefox本体のオプションから
コンテンツ > JavaScriptの詳細設定 > ステータスバーのテキストを変更する
のチェックを入れないと使えません
*/
/*
To show status bar message, please check the firefox option 
"content > Advanced JavaScript Settings > Change status bar text".
*/
	var s = 4;//回ホイールをページ末尾で下に回すとリロード
	//Number of times wheel down on page bottom to reload.

	var scrltop = false;//trueにするとリロード時にページ先頭に戻ります
	//When this is true scrolls to top on reloading the page.

	var t;
	var n = 0;
	window.addEventListener("DOMMouseScroll",function scroll(event) {
		window.clearTimeout(t);
		var y = window.scrollY;
		var ym = window.scrollMaxY;
		if (event.detail > 0 && y >= ym) {
			n++;
			window.status = "リロードぢから: " + parseInt(n * 100 / s) + "%";
			if (n == s) {
				tm();
				location.reload();
				return;
			}
			else
				t = window.setTimeout(tm,1000); 
		}
		else
			tm();
		return;
	} ,false);
	function tm() {
		n = 0;
		window.status="";
		return;
	}

	/*  リロード時にページ先頭にスクロール  */
	window.addEventListener("unload",function() {
		if (scrltop){
			window.scrollTo(0, 0);
		}
	} ,false);


})();