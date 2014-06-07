// ==UserScript==
// @name           mixi
// @namespace      net.tymy.net
// @description    どんどん追加
// @include        http://mixi.jp/list_request.pl
// ==/UserScript==

(function() {

	try {
		$$('submit_accept').form.submit();
	}
	catch(e) {
		console.info(e);
	}

	function $$(name) {
		return document.getElementsByName(name).item(0);
	}

	function $(id) {
		return document.getElementById(id);
	}
})();
