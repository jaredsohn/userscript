// ==UserScript==
// @name           Steam Sales Editingness
// @namespace      freakz
// @include        http://store.steampowered.com/app/*
// @version        0.2
// ==/UserScript==

var comparison = "";
var suffix = "uk";
var firstPrice;
var newDiv = "<div id=\"priceWars\" class=\"game_area_purchase_game\" style=\"padding-bottom: 16px;z-index:-1;\"><span style=\"font-size: 14px; color: #FFFFFF; font-weight: bold;\">Price Comparison:</span><br><div id=\"prices\">Waiting...</div></div>";
document.getElementsByClassName('game_purchase_action_bg')[0].parentNode.parentNode.parentNode.innerHTML += newDiv;

function main() {
	var url = window.location.toString() + "?cc=" + suffix;
	GM_xmlhttpRequest({
		method: "GET",
		url:url,
		onload: function(r) {
			var doc1 = document.createElement('div');
			doc1.innerHTML = r.responseText;
			var temp = doc1.getElementsByClassName('game_purchase_action_bg')[0];
			var amount;
			var cur;
			if (temp.getElementsByClassName('discount_final_price').length == 1) {
				amount = temp.getElementsByClassName('discount_final_price')[0].innerHTML.toString().replace(/	/g, '').replace(/\n/g, '');
				cur = amount.charAt(0);
			}

			if (temp.getElementsByClassName('game_purchase_price').length == 1) {
				amount = temp.getElementsByTagName('div')[0].innerHTML.toString().replace(/	/g, '').replace(/\n/g, '');
				cur = amount.charAt(0);
			}
			
			if (amount != "") {
				amount = amount.replace(/ /g,'');
				if (!isNaN(cur)) {
					cur = amount.charAt(amount.length-1);
				}
				
				amount = amount.replace(cur, '').replace(/,/g,'.');
				cur = cur.charCodeAt(0);
				switch (cur) {
					case 8364:
						if (suffix == "se") {
							comparison += "<strong>Europe Teir 1:</strong> &#" + cur + ";" + amount;
						} else if (suffix == "no") {
							comparison += "<strong>Europe Teir 2:</strong> &#" + cur + ";" + amount;
						}
						cur = "EUR";
						break;
					case 36:
						comparison += "<strong>USA:</strong> &#" + cur + ";" + amount;
						cur = "USD";
						break;
					case 163:
						comparison += "<strong>UK:</strong> &#" + cur + ";" + amount;
						cur = "GBP";
						firstPrice = amount;
						break;
					default:
						alert("Unknown Currency - " + cur + " | " + amount);
						return 0;
				}
				//Adds Price Comparison where i want it!
				//document.getElementsByClassName('game_purchase_action_bg')[0].parentNode.parentNode.parentNode.innerHTML += comparison;
				GM_xmlhttpRequest({
					method: "GET",
					url: "http://www.xe.com/ucc/convert/?Amount=" + amount + "&From=" + cur + "&To=GBP",
					onload: function(r) {
						var doc = document.createElement('div');
						doc.innerHTML = r.responseText;
						
						var curCon = doc.getElementsByClassName('CnvrsnTxt')[0].getElementsByTagName('td');						
						var inAmount = curCon[0].innerHTML.toString().split('&nbsp;')[0];
						var outAmount = parseFloat(curCon[2].innerHTML.toString().split('&nbsp;')[0]).toFixed(2);
						priceDiff = parseFloat(outAmount - firstPrice).toFixed(2);
						if (priceDiff < 0) {
							priceDiff = "<span style=\"color: #009900;\">" + priceDiff + "</span>";
						} else if (priceDiff > 0) {
							priceDiff = "<span style=\"color: #FF0000;\">" + priceDiff + "</span>";
						}
						comparison += " [GPB: " + outAmount + "] [Price Difference: " + priceDiff + "]<br>";
						switch (suffix) {
							case "uk":
								suffix = "us";
								main();
								break;
							case "us":
								suffix = "se";
								main();
								break;
							case "se":
								suffix = "no";
								main();
								break;
							default:
								document.getElementById('prices').innerHTML = comparison;
								//comparison;
								break;
						}
					}
				});
			}
		}	
	});
}

main();