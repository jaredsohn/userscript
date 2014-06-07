// ==UserScript==
// @name          Предпросмотр постов, комментов и инбоксов
// @namespace     http://leprosorium.ru
// @description   Нажми "Предпросмотр", чтобы не сделать глупость, %username%
// @include       http://leprosorium.ru/comments/*
// @include       http://*.leprosorium.ru/comments/*
// ==/UserScript==

document.onLoad = l_p();

function l_p()
{
	var t = document.getElementById('comment_textarea');
	if (t)
	{
		var p = t.parentNode;
		var d = document.createElement('div');
		d.innerHTML +='<div><a href="javascript:;" onmouseup="\
		document.getElementById(\'lp_preview\').innerHTML = \
		document.getElementById(\'comment_textarea\').value.replace(/<irony>/g, \'<span class=irony>\').replace(/<\\/irony>/g, \'</span>\').replace(/\\n/g, \'<br />\');\
		 return false;">Предпросмотр</a></div>\
		<div id="lp_preview"></div>\
		';
		p.appendChild(d);
	}
}