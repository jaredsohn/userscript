// ==UserScript==
// @name           Hatena_Dlg_Sogebu
// @namespace      http://d.hatena.ne.jp/kha/
// @description    はてなブックマーク削除時の確認ダイロアログを非表示にします
// @include        http://b.hatena.ne.jp/*
// ==/UserScript==
(function(){
	function evalInPage(fun) {
	  location.href = "javascript:void (" + fun + ")()";
	}
	evalInPage(function () {
		confirm_remove_bookmark = "このブックマークを削除しますか？";
		var commonlyConfirm = confirm;
		confirm = function(message){
			if (message = confirm_remove_bookmark){
				return true;
			} else {
				return commonlyConfirm(message);
			}
		}
	});
})();