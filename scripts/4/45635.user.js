// ==UserScript==
// @name           Klassic Wikipedia
// @namespace      http://userscripts.org/users/85574
// @description    Remove some HTML tags from Wikipedia's HTML
// @source         http://userscripts.org/scripts/show/45635
// @identifier     http://userscripts.org/scripts/source/45635.user.js
// @version        0.1
// @date           2009-04-01
// @creator        dirs <dirceuu@gmail.com>
// @include        http://*.wikipedia.org/*
// ==/UserScript==

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js'; // JQUERY POWER
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,1); }
	else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

function letsJQuery() {
	// bem simples: copia somente conteúdo do #content para um novo body e apaga o antigo.
	var content = 
	$('#content')
		.clone()
		.css({
			'margin': 0,
			'padding': 0,
			'border': 0
		});
	
	$('html body *')
		.remove()
	.end()
	.find('body')
		.append(content)
		.css({
			'background': 'none',
			'font-size': '1.2em',
			'margin': '0 auto',
			'width': 600,
			'font-family': 'Georgia',
			'text-align': 'justify',
			'text-height': '1.5em'
		});
}