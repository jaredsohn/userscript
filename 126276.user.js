// ==UserScript==
// @name           loda direct dl
// @namespace      qip
// @include        http://loda.jp/*
// ==/UserScript==

var replacer = /\?id=\d+">(.*?)<\/a>/g;
var table = document.getElementById('myTable');
if (table) {
	var html = table.innerHTML;
	html = html.replace(replacer, '?id=$1" class="dllink">$1</a>');
	table.innerHTML = html;
	var links = document.getElementsByClassName('dllink');
	var s = '';
	for (i in links)
		s += links[i].href + '\n';
	var ta = document.createElement('textarea');
	ta.textContent = s;
	document.body.appendChild(ta);
}