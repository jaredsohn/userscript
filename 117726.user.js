// ==UserScript==
// @name            袁公なかよしロリロリ～♪ タイトル書き換え(タブブラウザ用)
// @namespace       http://m21.3gokushi.jp/
// @description    BBSのWebページタイトルを変更します。
// @include         http://rorirori.chatx2.whocares.jp/
// @version         0.1
// ==/UserScript==
// ver 0.1 同盟内公開
(function(){
	if(document.title.indexOf("袁公なかよしロリロリ～♪") > -1 ) { 
			document.title = "単一電子トランジスタのための量子シミュレーションに関する詳細";
		}
}());