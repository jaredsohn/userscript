// ebay Gesamtpreis incl Versandtkosten (v2)
// 16.06.2009
//
// borrowed some code from Price + Shipping = Total (http://jobson.us), thx!
//
//
// ==UserScript==
// @name		ebay Gesamtpreis v2
// @namespace		http://www.lifestylepics.de/
// @version		2.6
// @description		Zeigt den Gesamtpreis in den Suchergebnissen (keine neue Spalte)
// @include		http://*.ebay.de/*
// @include		http://ebay.de/*
// ==/UserScript==
setTimeout(init,500);
Eid = function(id) {return document.getElementById(id);}

function init() {
	if (!Eid('ResultSet')) return;
	var rows = Eid('ResultSet').getElementsByTagName('tr');
	
	Eid('ResultSet').getElementsByClassName('prices g-nav center')[0].getElementsByTagName('a')[0].innerHTML = 'Gesamtpreis';
	Eid('ResultSet').getElementsByClassName('shipping g-nav center')[0].innerHTML = 'ohne Versand';

	// --- add total price to each line ---
	for (var i=0;i<rows.length;i++) {
		if (rows[i].getElementsByClassName('prices').length==0) continue;
		if (rows[i].getElementsByClassName('ship').length==0)   continue;
		
		var	ship  = rows[i].getElementsByClassName('ship')[0].innerHTML.replace(/^\+\EUR/,'');
		var	ship  = parseFloat(ship.replace(',','.'));  // convert e.g. 1.00 to 1,00
			ship = (isNaN(ship)) ? 0 : ship;
		
		// --- if 2 prices are avaible
		if (rows[i].getElementsByClassName('prices')[0].getElementsByTagName('div').length>0){
			var price1 = rows[i].getElementsByClassName('prices')[0].getElementsByTagName('div')[0].innerHTML.replace(/^\EUR/,'');
			var price2 = rows[i].getElementsByClassName('prices')[0].getElementsByTagName('div')[1].innerHTML.replace(/^\EUR/,'');
			var	price1 = parseFloat(price1.replace(',','.'));	// convert e.g. 1.00 to 1,00
			var	price2 = parseFloat(price2.replace(',','.'));	// convert e.g. 1.00 to 1,00
			var	total1 = (ship+price1).toFixed(2);
			var	total2 = (ship+price2).toFixed(2);
				rows[i].getElementsByClassName('ship')[0].innerHTML = price1.toFixed(2) + " " +unescape("%u20AC")+ "<br /><br />" +price2.toFixed(2)+unescape("%u20AC");
				
				rows[i].getElementsByClassName('prices')[0].getElementsByTagName('div')[0].innerHTML = total1 + " " +unescape("%u20AC");
				rows[i].getElementsByClassName('prices')[0].getElementsByTagName('div')[1].innerHTML = total2 + " " +unescape("%u20AC");
		} else {
			var	price = rows[i].getElementsByClassName('prices')[0].innerHTML.replace(/^\EUR/,'');
			var	price = parseFloat(price.replace(',','.'));	// convert e.g. 1.00 to 1,00
			var	total = (ship+price).toFixed(2);
				rows[i].getElementsByClassName('ship')[0].innerHTML = price.toFixed(2) + " " +unescape("%u20AC");
				rows[i].getElementsByClassName('prices')[0].innerHTML = total + " " +unescape("%u20AC");	
		}
		
	}
}