// ==UserScript==
// @name           Fan Percentage
// @namespace      tag:a_hal89@hotmail.com,2008-05-22:Ahal
// @description    Adds a column to the userscripts script table displaying the percentage of users who are fans.
// @include        http://userscripts.org/scripts*
// ==/UserScript==

var table = document.getElementsByTagName("table")[0];
var scripts = table.getElementsByTagName("tr");

var title = document.createElement('th');
title.class = "1a";
title.width = "1%";
var link = document.createElement('a');
link.href="/scripts?sort=fans";
link.innerHTML = "Fan Percentage";
title.appendChild(link);
scripts[0].appendChild(title);

for (var i = 1; i < scripts.length; i++){
	var cells = scripts[i].getElementsByTagName("td");
	var num = (cells[3].innerHTML / cells[4].innerHTML) * 100;
	if (cells[3].innerHTML == 0){
		num = 0;
	}
	num = roundNumber(num, 3);
	var ratio = document.createElement('td');
	ratio.innerHTML = num + "%";
	scripts[i].appendChild(ratio);
}


function roundNumber(num, dec) {
	var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
	return result;
}