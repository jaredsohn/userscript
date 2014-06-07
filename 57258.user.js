// ==UserScript==
// @name           Money Market Profit Finder
// @namespace      http://republiktools.com
// @description    finds the best currencies to trade in to make a profit
// @include        http://ereptools.net/currencies/local
// @author		   Alex Polfliet (alex_pof)
// ==/UserScript==

var table = document.getElementsByTagName('table')[0];

for(i=0; i<table.rows.length; i++) {
	var curRate = table.rows[i].children[2].children[1].innerHTML;
	var goldRate= table.rows[i].children[3].children[0].innerHTML;
	var profit = (((curRate*goldRate) - 1)*100).toFixed(2);
	table.rows[i].insertCell(5).innerHTML = profit + '%';
}