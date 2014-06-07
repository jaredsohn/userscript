// ==UserScript==
// @name       wiki_lang_highlight
// @version    0.2
// @match      http://*.wikipedia.org*
// ==/UserScript==

var q = function (s, ctx) {
	ctx || (ctx = document);
	return ctx.querySelectorAll(s);
}
var dom = q('#p-lang ul')[0];
var a = ['en', 'zh'];
var arr = [];
for (var i = 0; i < a.length; i++) {
	var e = a[i];
	e = q('[class*=-' + e + ']', dom);
    for (var j = 0; j< e.length; j++) { arr.push(e[j]) }
}

dom.innerHTML = '';
for (var i = 0; i < arr.length; i++) {
	var e = arr[i];
	dom.appendChild(e);
};