// ==UserScript==
// @name           Basil Quotes
// @namespace      basilmarket
// @description    Takes your quoted posts from meebo, and adds it to the basil menu.
// @include        http://www.basilmarket.com/*
// ==/UserScript==

var togglem = function() {
	var removemeebo = GM_getValue('meebo', false);
	removemeebo = !removemeebo;
	GM_setValue('meebo', removemeebo);
	if(removemeebo) {
		var meebo = document.getElementById('meebo');
		if(meebo)
			meebo.parentNode.removeChild(meebo);
	}
}
GM_registerMenuCommand("Toggle Meebo", togglem);

var removemeebo = GM_getValue('meebo', 0);
if(removemeebo) {
	var meebo = document.getElementById('meebo');
	if(meebo)
		meebo.parentNode.removeChild(meebo);
}
var menu  = document.getElementsByTagName('ul')[0];
var quotes = document.createElement('li');
quotes.className = 'lf mm-item';
menu.insertBefore(quotes, document.getElementsByTagName('li')[0]);
var quoted = document.getElementById('widgetQuoted');
if(quoted != null) {
	var newquotes = quoted.getElementsByTagName('div').length/2 - quoted.getElementsByTagName('strike').length;
	if(newquotes > 0)
		quotes.innerHTML = '<a href=\"#\" style=\"color: #ff9900\"class=\"navtop mm-item-link\">Quotes (+' + newquotes + ')</a><div style=\"display: none;\" class=\"snWrap mm-item-content\"><div class=\"mm-content-base\">' + quoted.innerHTML + '</div></div></li>';
	else
		quotes.innerHTML = '<a href=\"#\" class=\"navtop mm-item-link\">Quotes</a><div style=\"display: none;\" class=\"snWrap mm-item-content\"><div class=\"mm-content-base\">' + quoted.innerHTML + '</div></div></li>';
} else {
	quotes.innerHTML = '<a href=\"#\" class=\"navtop mm-item-link\">Quotes</a></li>'
}