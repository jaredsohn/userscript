// ==UserScript==
// @name           Nico_Dlg_Sogebu
// @namespace      http://d.hatena.ne.jp/kha/
// @description    マイリストから動画を削除する際の確認ダイロアログを非表示にします
// @include        http://www.nicovideo.jp/my/mylist*
// ==/UserScript==
(function(){
	function evalInPage(fun) {
	  location.href = "javascript:void (" + fun + ")()";
	}
	evalInPage(function () {
		confirm_remove_mylist = "本当に削除してもよろしいですか？";
		var commonlyConfirm = confirm;
		confirm = function(message){
			if (message == confirm_remove_mylist){
				return true;
			} else {
				return commonlyConfirm(message);
			}
		}
	});
})();