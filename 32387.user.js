// ==UserScript==
// @name           Star Pirates: Stock Watcher
// @namespace      enoyhs
// @include        http://www.starpirates.net/*
// ==/UserScript==

if (GM_getValue('setup', true)) {
	GM_setValue('minPrices', '1000000,1000000,1000000,1000000,1000000,1000000,1000000,1000000,1000000,1000000,1000000');
	GM_setValue('maxPrices', '0,0,0,0,0,0,0,0,0,0,0');
	GM_setValue('updateTime', 5);
	GM_setValue('setup', false)
}

if (document.body.innerHTML.indexOf('login.php')!=-1) {
	return;
}

var d = Number(new Date());
if (Number(GM_getValue('lastUpdate', d))+(60000*GM_getValue('updateTime')) <= d) {
	document.getElementById('datenow').innerHTML += '<div id="stockInfo"></div>';
	var div = document.getElementById('stockInfo');
	div.style.display = 'block';
	div.style.position = 'fixed';
	div.style.left = '65%';
	div.style.zIndex = 999;
	div.style.width = '400px';
	div.innerHTML = '<table width="100%"></tr><td class="contenthead"><b>Stock Updates</b></td></tr><tr><td class="contentcontent"><b><i>Retrieving data...</i></b></td></tr></table>';
	function convert(data) {
		var ret = '';
		for (var i in data) {
			ret += data[i] + ',';
		}
		return ret.substring(0, ret.length-1);
	}
	
	function updateStocks(responseDetails) {
		var r = responseDetails.responseText.split('<form');
		var prices = new Array;
		for (var i=1; i<r.length; i++) {
			r[i] = r[i].split('<td>');
			prices.push(r[i][2].substring(1, r[i][2].indexOf(' ')).replace(',',''));
		}
		var lastPrices = GM_getValue('lastPrices').split(',');
		var maxPrices = GM_getValue('maxPrices').split(',');
		var minPrices = GM_getValue('minPrices').split(',');
		var names = new Array('New World Jumpsystems', 'D-fensive Systems Inc.', 'Assault Systems Inc.', 'SREAG Incorp.', 'Snakehead Games Inc.', 'Galactic Credit Bank Inc.', 'Celeb Idol News Corp.', 'Fusion4u.com.ast Ltd.', 'VicFrank\'s NuPets Inc.', 'Clones etc. Ltd.', 'BlackJack\'s Casino Ltd.');
		var response = '<b>';
		for (var i=0; i<11; i++) {
			if (Number(prices[i])>Number(maxPrices[i])) {
				maxPrices[i] = prices[i];
				response += "<font color='#00FF00'>" + names[i] + " is now at its highest price: $" + prices[i] + ".</font><br/>";
			} else if (Number(prices[i])<Number(minPrices[i])) {
				minPrices[i] = prices[i];
				response += "<font color='#FF0000'>" + names[i] + " is now at its lowest price: $" + prices[i] + ".</font><br/>";
			} else if (Number(prices[i])==Number(lastPrices[i])){
				response += names[i] + " has not changed its price.<br/>";
			} else if (Number(prices[i])>Number(lastPrices[i])) {
				response += "<font color='#006600'>" + names[i] + "'s price is now $" + prices[i] + ".</font><br/>";
			} else if (Number(prices[i])<Number(lastPrices[i])) {
				response += "<font color='#990000'>" + names[i] + "'s price is now $" + prices[i] + ".</font><br/>";
			}
		}
		GM_setValue('lastPrices', convert(prices));
		GM_setValue('maxPrices', convert(maxPrices));
		GM_setValue('minPrices', convert(minPrices));
		div.getElementsByClassName('contentcontent', 'td')[0].innerHTML = response + '</b>';
	}
	
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://www.starpirates.net/brokerage.php', 
		onload: updateStocks,
	});
	GM_setValue('lastUpdate', '' + d + '');
}