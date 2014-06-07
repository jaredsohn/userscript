// ==UserScript==
// @name           Serialeonline - wyszczególnienie obejrzanych, ominięcie strony z komentarzami i ominięcie limitu megavideo
// @namespace      serialeonline
// @include        http://www.serialeonline.pl/*
// ==/UserScript==

with(win=unsafeWindow) doc=document,this.$=$;
with(styl = doc.createElement('style'))
{
	type = 'text/css';
	innerHTML = '#center h1 a {color:#009;font-weight:bold}\n#center h1 a:visited {color:#333!important;font-weight:normal}';
}
with(location)
{
	href.match(/\?p=ogladaj/) ? (nloc = $('.text>a').attr('href'),
		replace((vid = nloc.match(/megavideo\.com\/\?v=(\w+)/)) ?
			'http://www.tv.wrzuc.to/check-servers/' + vid[1] : nloc)
	) : doc.body.appendChild(styl);
}