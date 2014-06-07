// ==UserScript==
// @name			Pardus SB Commander Trade Logger
// @namespace		marnick.leau@skynet.be
// @description		Logs trades from and to your SB to help the accounting.
// @include			http*://*.pardus.at/starbase_trade.php
// @include			http*://*.pardus.at/starbase_credits.php
// ==/UserScript==

//	try{
	if (location.href.match("trade")) {
		var tradeSummary = document.getElementById('tipBox').parentNode.getElementsByTagName('td')[0].innerHTML;
		if (tradeSummary.match("transferred")) {
			tradeSummary = tradeSummary.substring(tradeSummary.indexOf('</h1>') + 5,tradeSummary.indexOf('<hr>') - 5);

			var trades = new Array;
			if (tradeSummary.match('<br>')) {
				for (var i = 0;i < tradeSummary.split('<br>').length;i++) {
					trades[i] = tradeSummary.split('<br>')[i];
				}
			}
			else {
				trades[0] = tradeSummary;
			}

			var commodity,action,column,temp,ii,price,tonnage;
			for (i = 0;i < trades.length;i++) {
				if (trades[i].match("could not") === null) {
					trades[i] = trades[i].split(' ');
					if (trades[i].length === 9) {
						commodity = trades[i][4] + " " + trades[i][5];
					}
					else {
						commodity = trades[i][4];
					}
					
					if (trades[i][trades[i].length - 1].match("ship")) {
						action = "buy";
						column = document.getElementsByClassName('messagestyle')[1].getElementsByTagName('tr')[1].getElementsByTagName('table')[1];
					}
					else {
						action = "sell";
						column = document.getElementsByClassName('messagestyle')[1].getElementsByTagName('tr')[1].getElementsByTagName('table')[0];
					}
					
					column = column.getElementsByTagName('tr');
					function pricify(price,action) {
						if (price.split(',').length > 2) {
							switch (action) {
								case "buy":
									alert("You may want to check that trade because you just bought something reeeeeally expensive...");
									break;
								case "sell":
									alert("Wow, looks like you just gained a whole lot of money with that!");
									break;
							}
						}
						while(price.match(',')) {
							price = price.replace(',',"");
						}
						return parseInt(price);
					}
					
					for (ii = 1;ii < column.length - 3;ii++) {
						if (column[ii].getElementsByTagName('td')[1].innerHTML.match(commodity)) {
							switch (action) {
								case "buy":
									price = column[ii].getElementsByTagName('td')[6].innerHTML;
									price = price.substring(price.indexOf('</script>') + 9,price.length);
									price = pricify(price,action);
									break;
								case "sell":
									price = column[ii].getElementsByTagName('td')[3].innerHTML;
									price = pricify(price,action);
									break;
							}
						}
					}
					tonnage = parseInt(trades[i][1]);
					// alert("Did you " + action + " " + tonnage + " tons of " + commodity + " for " + price*tonnage + " credits?");
					
					if (action === "sell") {
						price = 0 - price;
					}
					GM_setValue("priceLog",GM_getValue("priceLog",0) + price*tonnage);
				}
			}
		}
	}
	else {
		var costs = GM_getValue("priceLog",0);
		unsafeWindow.restore = function(costs) {
			setTimeout(function() {
				document.getElementsByName('credits')[0].setAttribute('value',Math.abs(costs));
				var recipient = "your ship";
				if (costs > 0) {
					recipient = "the StarBase";
					
				}
				alert("Transfer them to " + recipient + " to balance the funds again.");
				GM_deleteValue("priceLog");
			},1);
		}
		
		var restoreButton = document.createElement('input');
		restoreButton.setAttribute('type','button');
		restoreButton.setAttribute('value','Restore funds');
		restoreButton.setAttribute('onclick','restore(' + costs + ')');
		document.getElementsByName('credits')[0].parentNode.innerHTML += "<br>";
		document.getElementsByName('credits')[0].parentNode.appendChild(restoreButton);
	}
/*	}
catch(error) {
	alert(error);
}	*/