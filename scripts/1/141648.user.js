// ==UserScript==  
// @name	nicolive-seektime-form
// @namespace	http://kiwofusi.sakura.ne.jp/nicolive-seektime-form/
// @description	ニコニコ生放送の配信ページに入力した時間にシークできるフォームを追加します（タイムシフト視聴用）。
// @include	http://live.nicovideo.jp/watch/*
// ==/UserScript==  

/* このスクリプトについて
Firefox 14.0.1 & Greasemonkey 0.9.20 & Zenoの前Verのニコ生で動作確認。
改変・再配布は自由です。
その際リンクまたは報告があるとうれしいです。
公開ページ http://
連絡先 kiwofusi@gmail.com OR http://twitter.com/kiwofusi
*/

/* 更新履歴
2012-08-17 作成
*/

(function () {
	var DEBUG = false;
	function p(obj) { // なんか console.log が動かない
		if (DEBUG) unsafeWindow.console.log(obj);
	}
	p("start");
	
	try {
		var pos = document.getElementById('player_btm');
		var seektime_form = document.createElement("div")
		seektime_form.innerHTML = '<form id="nicolive-seektime-form" onSubmit="javascript:setVpos(\'#\' + this.time.value); return false;">｜<input type="text" name="time" value="25:25" size="8"><input type="submit" value="seek"></form>';
		pos.appendChild(seektime_form);
	} catch(e) {
		p(e);
	}
	
	p("end");
})();


// 参考
// 文法チェック http://www.javascriptlint.com/online_lint.php
// DOM http://www.openspc2.org/JavaScript/JavaScript_DOM/

/* 作業ログ
2012-08-17
	1855 開始
	1945 完成(50m)
*/
