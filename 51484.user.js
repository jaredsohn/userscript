// ebay Gesamtpreis incl Versandtkosten
// Version 1.0
// 14.06.2009
//
// borrowed some code from Price + Shipping = Total (http://jobson.us) thx!
//
//
// ==UserScript==
// @name           ebay Gesamtpreis
// @namespace      http://www.lifestylepics.de/
// @description    Zeigt den Gesamtpreis in den Suchergebnissen (neue Spalte)
// @include        http://*.ebay.de/*
// @include        http://ebay.de/*
// ==/UserScript==

var console;
setTimeout(init,500);

$ = function(id) {
	return document.getElementById(id);
}

$$ = function(cls) {
	return document.getElementsByClassName(cls);
}

function init() {
	console = unsafeWindow.console;
	
	if (!$('ResultSet')) return;
	
	var rows = $('ResultSet').getElementsByTagName('tr');
	
	var td = document.createElement('td');
		td.style.width = '60px';
		td.style.textAlign = 'right';
	
	for (var i=0;i<rows.length;i++) {
		if (rows[i].getElementsByClassName('shipping').length>0) {
			var col = td.cloneNode(true);
				col.style.textAlign = 'right';
				col.innerHTML = 'Gesamt';
			rows[i].insertBefore(col,rows[i].getElementsByClassName('time')[0])
		}
		if (rows[i].getElementsByClassName('prices').length==0) continue;
		if (rows[i].getElementsByClassName('ship').length==0)   continue;
		var price = rows[i].getElementsByClassName('prices')[0].innerHTML.replace(/^\EUR/,'');
		var price = parseFloat(price.replace(',','.'));
		var ship  = rows[i].getElementsByClassName('ship')[0].innerHTML.replace(/^\+\EUR/,'');
		var ship  = parseFloat(ship.replace(',','.'));
			ship = (isNaN(ship)) ? 0 : ship;
		var total = (ship+price).toFixed(2);
		var col = td.cloneNode(true);
			col.innerHTML = total + " " +unescape("%u20AC");
		rows[i].insertBefore(col,rows[i].getElementsByClassName('time')[0])
	}
}