// ==UserScript==
// @name           Mail.ru advertisment blocker
// @namespace      mail.ru/
// @include        http://win.mail.ru/
// ==/UserScript==
div = document.getElementsByTagName("div");
table = document.getElementsByTagName("table");
td = document.getElementsByTagName("td");
for (var i=0; i<div.length; i++) {
	if (div[i].className=='nadavi_global') div[i].style.display = 'none';
	if (div[i].className=='gogo_g') div[i].style.display = 'none';
}
for (i=0; i<td.length; i++) {
	if (td[i].className=='uups_top_nav') td[i].style.display = 'none';
	if (td[i].className=='cont') td[i].style.display = 'none';	
}
for (i=0; i<table.length; i++) {
	if (table[i].className=='top_menu') table[i].style.display = 'none';
	if (table[i].className=='news_list') table[i].style.display = 'none';
	if (table[i].className=='rassil') table[i].style.display = 'none';
	if (table[i].className=='lasttab') table[i].style.display = 'none';
}
if (document.getElementById('weatherInf')) document.getElementById('weatherInf').style.display='none';