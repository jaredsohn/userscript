// ==UserScript==
// @name           Google CN EN
// @namespace      bb
// @include        http://www.google.cn/search*
// ==/UserScript==
var n1 = document.getElementById('sff');
if (n1) {
	var newE = document.createElement('div');
	newE.id = 'issferb';
	newE.innerHTML = '<input id="all" type="radio" value="lang_en" name="lr"/><label for="all">English </label><input id="ch" type="radio" value="lang_zh-CN|lang_zh-TW" name="lr"/><label for="ch">chinese</label>';
	n1.appendChild(newE);
}