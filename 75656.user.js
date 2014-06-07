// ==UserScript==
// @name           Ikariam toolbar links
// @namespace      byElwiZ
// @description    Add toolbar links (wikia, ika-world).
// @include        http://*.ikariam.com/*
// @exclude        http://board.*.ikariam.com/*
// ==/UserScript==

var toolbar = document.getElementById('GF_toolbar');
if (toolbar) {
	var uls = toolbar.getElementsByTagName('ul');
	if (uls.length == 1) {
		var ul = uls[0];

		ul.innerHTML = '<li class="ikaworld"><a target="_blank" title="Ika World" href="http://www.ika-world.com/"><span class="textLabel">Ika World</span></a><li>'+ul.innerHTML;
		ul.innerHTML = '<li class="wikia"><a target="_blank" title="Wikia" href="http://ikariam.wikia.com/"><span class="textLabel">Wikia</span></a><li>'+ul.innerHTML;

		ul.style.paddingLeft = '30px';
		ul.style.width = '950px';
		ul.style.textAlign = 'center';
	}
}
