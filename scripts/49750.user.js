// ==UserScript==
// @name            Yahoo!メール(非Ajax版)のイメージブロック設定をヘッダの下にも表示
// @namespace       http://penguinlab.jp/
// @include         http://*.mail.yahoo.co.jp/*
// ==/UserScript==
(function() {
	var elements = document.getElementsByTagName('p');
	for(var i=0;i<elements.length;i++){
		if(elements[i].innerHTML.indexOf("イメージブロックの設定")!=-1){
			var newelement = elements[i].cloneNode(true);
			var msg = document.getElementById('message');
			msg.parentNode.insertBefore(newelement, msg);
			return;
		}
	}
})();