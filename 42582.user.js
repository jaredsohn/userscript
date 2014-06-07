// ==UserScript==
// @name           Wieviel zum Schloss fehlt by NewMan
// @namespace      http://ego-shooters.foren-city.de/
// @description    Das Script zeigt im Übersichtbereich die Anzahl der Flaschen an und wieviel Flaschen bzw Geld noch bis zum Schloss (590000) fehlen.
// @include        http://*.pennergame.de/overview/
// ==/UserScript==


GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://www.pennergame.de/stock/bottle/',
	onload: function(responseDetails) {
		var side = responseDetails.responseText;
		//alert(side);
		user(side)
		
	}
});

function user(side){
	var side_split = side.split('<td align="left" width="250"><span>');
	var side_split_2 = side_split[1].split('Pfandflaschen');
	var table = document.getElementsByClassName('tieritemA')[0];
	var tbody = table.getElementsByTagName('tbody')[0];
	var tr = table.getElementsByTagName('tr');
	
	newtr = document.createElement('tr');
	tbody.insertBefore(newtr, tbody.getElementsByTagName('tr')[10]);
	tr[10].innerHTML = '<td valign="middle" bgcolor="#2f2f2f">Flaschenanzahl:</td><td valign="middle" bgcolor="#2f2f2f">&nbsp;'+ side_split_2[0] +'</td>';
	
	var kurs = document.getElementById('pfandflaschen_kurs_ajax').innerHTML;
	var rest = Math.round(59000000 / kurs - side_split_2[0]);
	var rest_geld = Math.round(590000 - side_split_2[0] * kurs / 100)
	newtr_2 = document.createElement('tr');
	tbody.insertBefore(newtr_2, tbody.getElementsByTagName('tr')[11]);
	tr[11].innerHTML = '<td></td><td valign="middle" bgcolor="#2f2f2f" colspan="2">Dir fehlen bis zum Schloss noch:&nbsp;'+ rest +' Flaschen oder&nbsp;'+ rest_geld +' Euro</td>';
	


	
}



//Script von NewMan im Penergame unter NewMan01 zu finden.