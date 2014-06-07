// ==UserScript==
// @name           CocologReplaceEnhancement
// @namespace      http://www.cocolog-nifty.com/
// @description    Can search/replace with excerpt field of the entry.
// @include        http://app.cocolog-nifty.com/t/app/weblog/post
// @include        http://app.f.cocolog-nifty.com/t/app/weblog/post
// @include        https://app.cocolog-nifty.com/t/app/weblog/post
// @include        https://app.f.cocolog-nifty.com/t/app/weblog/post
// ==/UserScript==

var mode = document.getElementsByName('__mode')[0];
if (mode.getAttribute('value') == 'search_replace') {
	var form = document.getElementsByTagName('form')[1];
	if (form.getAttribute('action').match(/\/t\/app\/weblog\/post/)) {
		var div = form.getElementsByTagName('div')[1];
		var label = document.createElement('label');
		var checkbox = document.createElement('input');
		checkbox.setAttribute('type', 'checkbox');
		checkbox.setAttribute('name', 'search_cols');
		checkbox.setAttribute('value', 'excerpt');
		label.appendChild(checkbox);
		label.innerHTML += '概要';
		div.appendChild(label);
	}
}
