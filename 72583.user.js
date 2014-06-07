// ==UserScript==

// @name           Ultimate Price + Shipping + Total To Euro Converter

// @namespace      marios88

// @include        http://*.ebay.com/*

// @include        http://ebay.com/*

// @exclude        http://my.ebay.*/*

// @exclude        http://*search.ebay.*/*

// ==/UserScript==



var console;



// Configure

var myDate = new Date().getTime()

LastUpdate = parseInt(GM_getValue('Update', 0)); //Update every 24h

if (myDate > LastUpdate + 86400000) {

GM_setValue('Update',myDate+"");

Currency = new Array("USD","GBP","CAD","AUD");

for (i=0; i < Currency.length; i++) {

	var convertionURL = "http://finance.yahoo.com/d/quotes.csv?s="+encodeURIComponent(Currency[i]+"EUR"+"=X")+"&f=l1";

	GetRatio(convertionURL,Currency[i]);

	};

}



function GetRatio(link,CurrentCurrency) {

		GM_xmlhttpRequest({

		method: 'GET',

		url: link,

		onload: function(responseDetails) {

		GM_setValue(CurrentCurrency,responseDetails.responseText.replace(/\s+$/,""));

		} 

		});

	}



// Exchange rates

perUSD = parseFloat(GM_getValue('USD',0));  // this * US dollars = my currency

perGBP = parseFloat(GM_getValue('GBP',0));  // this * British pounds = my currency

perCAD = parseFloat(GM_getValue('CAD',0));  // this * Canadian dollars = my currency

perAUD = parseFloat(GM_getValue('AUD',0));  // this * Australian dollars = my currency



// Code



// Round to one decimal point

function roundC(v) {

	return Math.round(v*10)/10;

}





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

		td.style.width = '50px';

		td.style.textAlign = 'right';

	

	for (var i=0;i<rows.length;i++) {

		if (rows[i].getElementsByClassName('ship').length>0) {

			var col = td.cloneNode(true);

				col.style.textAlign = 'right';

				col.innerHTML = 'Total';

			rows[i].insertBefore(col,rows[i].getElementsByClassName('tme')[0])

			

		}

		var rows2 = rows[i].getElementsByTagName('td');

		if (rows[i].getElementsByClassName('prc').length==0) continue;

		if (rows[i].getElementsByClassName('ship').length==0) continue;
		var price = rows[i].getElementsByClassName('prc')[0].innerHTML.replace(/^\£/,'');
		price = price.replace(/\,/,'')

		price = parseFloat(price);

		var ship  = rows[i].getElementsByClassName('ship')[0].innerHTML.replace(/^\+\£/,'');

		ship = (ship == 'Free' || ship == 'Free shipping')?0.01:ship;

		ship  = parseFloat(ship);

		ship = (isNaN(ship)) ? 0 : ship;		

		

		if( rows2.length > 5 && ship == 0){		

			rows[i].style.display = 'none';		

		}else{

			var total = (ship+price).toFixed(2);

			var myCurrency = (total * perGBP).toFixed(2);  // Convert

			var col = td.cloneNode(true);

				col.innerHTML = total + '£ <br><span style="color:red;font-weight:bold">('+ myCurrency + '€ total)';

			rows[i].insertBefore(col,rows[i].getElementsByClassName('tme')[0])

		}				

	}

}