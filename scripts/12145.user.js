// ==UserScript==
// @name           Comet.srl.ro quick search
// @namespace      http://decampos.eu.org
// @include        http://www.comet.srl.ro/shop/menu.html
// @description    Add a quicksearch box to the shop left frame
//
// Copyright (C) 2007 Alex Badea <vamposdecampos@gmail.com>
// ==/UserScript==


(function () {
	var form = document.createElement('div');
	form.innerHTML = '<br/><form method="post" action="statements.html" target="view">' +
		'<input type="hidden" name="Type" value="ALL" />' +
		'<input type="text" name="Text" size="10" style="border: 1px solid black" title="Search" />' +
		'<input type="hidden" name="Block" value="25" />' +
		'<input type="submit" value="Search" style="display: none" />' +
		'</form>';

	var imgs = document.getElementsByTagName('img');
	if (imgs.length && imgs[0].nextSibling) {
		imgs[0].parentNode.insertBefore(form, imgs[0].nextSibling);
	} else {
		// fallback
		document.body.appendChild(form);
	}
})();
