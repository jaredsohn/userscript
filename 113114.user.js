// ==UserScript==
// @name           Banned-Shmanned
// @namespace      ru.dimdimych
// @include        http://dirty.ru/*
// @include        http://www.dirty.ru/*
// ==/UserScript==

var divs = document.querySelectorAll('div.post div.dt,div.c_body');
var re = /([\u00C0-\u00DF].)/g;
for (var i=0, l=divs.length;i<l;i++) {
	while(re.test(divs[i].innerHTML))
		divs[i].innerHTML = divs[i].innerHTML.replace(re,replacer);
}

function replacer($0) {
	return String.fromCharCode((($0.charCodeAt(0)&31)<<6) + ($0.charCodeAt(1)&63));
}
var ul = document.querySelector('ul.left_col_nav');
(a = ul.appendChild(document.createElement('li')).appendChild(document.createElement('a')))
	.appendChild(document.createTextNode('Забаненные'));
a.href = '/banned';