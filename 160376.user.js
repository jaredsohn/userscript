// ==UserScript==
// @name             sale auto count [GW]
// @namespace        s3kat0r.com
// @description      Подставляет автоматом число ресурсов в продажу объекту.
// @include          http://www.ganjawars.ru/object.php?id=*
// @include          http://www.ganjawars.ru/objects-bar.php?id=*
// @version          0.2
// @author           s3kat0r
// @source           http://www.ganjawars.ru/syndicate.php?id=8516
// ==/UserScript==



(function() {
	var root = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;

	if (root.location.href.indexOf('http://www.ganjawars.ru/object.php?id=') == -1 &&
		root.location.href.indexOf('http://www.ganjawars.ru/objects-bar.php?id=') == -1) {
		return false;
	}


	var form = root.document.body.getElementsByTagName('form');
	for (var i = 0; i < form.length; ++i) {
		if (form[i].action != null && form[i].action.value == 'sell') {
			var tr   = form[i].parentNode.parentNode;
			var num  = (tr.cells[6] != null) ? 6 : 5;
			var may  = parseInt(tr.cells[3].textContent);
			var own  = parseInt(tr.cells[num].textContent);
			var need = 0;
			if (own == 0 || may == 0) {
				continue;
			}
			if (own > may || own == may) {
				need = may;
			} else {
				need = own;
			}
			if (root.location.href.indexOf('http://www.ganjawars.ru/objects-bar.php?id=') != -1) {
				need = own;
			}
			form[i].amount.value = need;
		}
	}


})();