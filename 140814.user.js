// ==UserScript==  
// @name	nico-tag-seektime
// @namespace	http://kiwofusi.sakura.ne.jp/nico-tag-seektime/
// @description	ニコニコ動画の再生時間を表すタグ(00:00)にシークボタン[seek]を追加します。
// @include	http://www.nicovideo.jp/watch/*
// ==/UserScript==  

/* このスクリプトについて
改変・再配布は自由です。
その際リンクまたは報告があるとうれしいです。
公開ページ http://kiwofusi.sakura.ne.jp/nico-tag-seektime/
連絡先 kiwofusi@gmail.com OR http://twitter.com/kiwofusi
*/

/* 更新履歴
2012-08-13 作成
*/

(function () {
	var DEBUG = true;
	function p(obj) { // なんか console.log が動かない
		if (DEBUG) unsafeWindow.console.log(obj);
	}
	p("start");
	
	try {
		function get_tags() {
			// div#video_tags > p > nobr > a.nicopedia(a[0])
			// <nobr> をタグ要素として扱う
			var tags = document.getElementById('video_tags').getElementsByTagName('p')[0].getElementsByTagName('nobr');
			return tags
		}
		var tags = get_tags();

		function extract_time(tag) { // 時間の記述がなかったら null
			// (nobr > a.nicopedia).innerHTML
			var tag_text = tag.getElementsByTagName('a')[0].innerHTML;
			tag_text = tag_text.replace(/：/g, ':').replace(/０/g, '0').replace(/１/g, '1').replace(/２/g, '2').replace(/３/g, '3').replace(/４/g, '4').replace(/５/g, '5').replace(/６/g, '6').replace(/７/g, '7').replace(/８/g, '8').replace(/９/g, '9');
			var time_ptn = /(\d+:)+\d+/;// "00:00" "00:00:00" など
			var time = tag_text.match(time_ptn); 
			if (time) time = time[0];
			return time;
		}
		function add_timeseek_button(tag, time) {
			// insertBefore to (nobr > a[1])
			var seektime_button = document.createElement("a");
			var seektime_button_text = '<b><a href="#" class="seekTime" data-seektime="' + time + '" onclick="seekNicoPlayer(\'#' + time + '\'); return false;">[seek]</a></b>';
			seektime_button.innerHTML = seektime_button_text;
			var target_elm = tag.getElementsByTagName("a")[1];
			tag.insertBefore(seektime_button, target_elm);
		}
		for(var i=0; i<tags.length; i++) {
			var tag = tags.item(i);
			var time = extract_time(tag);
			if (time) add_timeseek_button(tag, time);
		}
	} catch(e) {
		p(e);
	}
	
	p("end");
})();


// 参考
// 文法チェック http://www.javascriptlint.com/online_lint.php
// DOM http://www.openspc2.org/JavaScript/JavaScript_DOM/

/* 作業ログ
2012-08-13
	2035 開始
	2144 完成(1h14m)
*/

/* やること
タグパターン：/(\d+:)+\d+/
タグ：
シークボタン：<a href="#" class="seekTime" data-seektime="0:27" onclick="seekNicoPlayer('#0:27'); return false;">#0:27</a>

タグ取得
タグパターンマッチ＆抽出
ボタン追加
*/