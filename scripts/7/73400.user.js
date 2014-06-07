// ==UserScript==
// @name           Zakupy google UK / USA
// @namespace      zakupy
// @include        *google.co.uk/products*
// @include        *google.com/products*
// ==/UserScript==

var temp = '';
var p = '';

if (document.URL.match('.co.uk'))
{
	var t = document.URL.replace('.co.uk/', '.com/');
	p = '<a href="' + t + '"> Szukaj w stanach </a>';
} else
{
	var t = document.URL.replace('.com/', '.co.uk/');
	p = '<a href="' + t + '"> Szukaj w Anglii </a>';
}


temp = '<div style="position: fixed; left: 20px; bottom: 20px;">' + p + '</div>';

document.body.innerHTML += temp;