// ==UserScript==
// @name           MidwayUSA Cost Per Round
// @namespace      http://jobson.us
// @description    Calculates the cost per round.
// @include        http://www.midwayusa.com/BROWSE/BrowseProducts.aspx*
// ==/UserScript==

setTimeout(init,500);

function init() {
	var d = document.getElementById('Product');
	if (!d) return;
	
	var rows = d.getElementsByTagName('div');
	
	var price;
	var rounds;
	var cpr;
	for (var i=0;i<rows.length;i++) {
		if (rows[i].id == 'productDisplayItemQtyAvailableAtLabel') rows[i].style.display = 'inline';
		if (rows[i].id == 'productDisplayItemQtyAvailableAt') rows[i].style.display = 'inline';
		if (rows[i].id == 'productDisplayItemImage') rows[i].style.height = '80px';
		if (rows[i].id == 'productDisplayItemDescription') {
			rounds = parseFloat(rows[i].getElementsByTagName('a')[0].childNodes[0].nodeValue.match(/Box of (\d+)/)[1]);
		}
		if (rows[i].id == 'productDisplayItemCurrentPrice') {
			if (!rounds) continue;
			price = parseFloat(rows[i].childNodes[0].nodeValue.match(/\d+\.\d+/)[0])
			
			cpr = Math.round(price/rounds*1000)/10;
			
			var sp = document.createElement('span');
				sp.appendChild(document.createTextNode( '\u00a0|\u00a0'+ cpr +'\u00A2/round' ));
				sp.style.color = '#666666';
				
			rows[i].appendChild(sp);
			
			rounds = null;
			price  = null;
			cpr    = null;
		}
	}
}