// ==UserScript==
// @name          NicoNico Search autocomplete on
// @namespace     http://shink.info/
// @include       http://www.nicovideo.jp/
// @include       http://www.nicovideo.jp/?header
// @include       http://seiga.nicovideo.jp/
// @include       http://seiga.nicovideo.jp/?header
// @include       http://live.nicovideo.jp/
// @include       http://live.nicovideo.jp/?header
// @include       http://www.nicovideo.jp/ranking
// @include       http://www.nicovideo.jp/video_top
// @grant       none
// @description	  ニコニコ動画の検索履歴を以前のように残します。
// ==/UserScript==

(function() {
	Nico.SuggestSearch.prototype = {  
	    d: function () {
	        this.$targetInput.attr("autocomplete", "on");
	    }
	}
})();