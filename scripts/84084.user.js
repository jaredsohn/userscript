// ==UserScript==
// @name           Average Fame
// @namespace      http://popodeus.com
// @description    Adds an 'Average Fame' and Average Media Coverage value on the artist Fame & Popularity page in Popmundo
// @contributor    Dentxinho
// @include        http://www*.popmundo.com/Common/Artist.asp?action=Popularity&ArtistID=*
// @require        http://usocheckup.redirectme.net/84084.js
// @version        1.0
// @copyright      Popodeus.com, 2010
// ==/UserScript==

var XPATH = "/html/body/table[3]/tbody/tr/td/table[2]/tbody/tr/td/table";

var strAvgFame = "Average Fame"; //change this for your language

function xpathNode(xpath) {
	return document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

var tbl = xpathNode(XPATH);

var total_fame = 0;
var total_mc = 0;
/*
var qtd = 0;
for (var index = 1; index < document.links.length; index++) {
	var a = document.links[index];
	var valid = (a.href.indexOf('Rules.asp?action=Scoring&Word=') >= 0);
	if (valid) {
		var score = a.href.match(/Word=(\d+)/)[1];
		total_fame += parseInt(score);
		qtd++;
	}
}
*/
var ROWS = tbl.rows.length-1;
for (var ri=1; ri<tbl.rows.length; ri++) {
	var row = tbl.rows[ri];
	var link = row.cells[1].getElementsByTagName('a')[0];
	var fame = parseInt(link.href.match(/Word=(\d+)/)[1])-1;
	total_fame += fame;
	total_mc += parseInt(row.cells[2].getElementsByTagName('img')[1].title.match(/(\d+)%/)[1]);
	if (fame >= 5) {
		link.style.fontWeight = 'bold';
		link.style.color = 'green'; 
	}
}

var tr = document.createElement('tr');

var td = document.createElement('td');
	td.width = 112;
	tr.appendChild(td);
	var bold = document.createElement('b');
	bold.appendChild(document.createTextNode(' ' + strAvgFame + ':'));
	td.appendChild(bold);

td = document.createElement('td');
	var avg_fame = new Number(total_fame/ROWS);
	td.appendChild(document.createTextNode(avg_fame.toPrecision(4)));
	tr.appendChild(td);

td = document.createElement('td');
	td.width = 223;
	td.align = 'right';
	var avg_mc = new Number(total_mc/ROWS);
	td.appendChild(document.createTextNode(avg_mc.toPrecision(4)));
	td.appendChild(document.createTextNode(' %'));
	tr.appendChild(td);

tbl.appendChild(tr);
