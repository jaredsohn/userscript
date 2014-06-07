// ==UserScript==
// @name           SteamCalculator
// @namespace      gamingfreak
// @include        http://steamcommunity.com/id/*/games?tab=all
// ==/UserScript==

var games = document.getElementsByClassName('gameListRow');

var total = 0.00;
var newHTML = " | <span id='priceWars'>Steam Calculator: <a href='#' id='SCStart' onClick='return false;'>Start</a></span>";
var i = 0;
var error = "";
var currency = "";

var totalGames = games.length;

document.getElementById('mainContents').getElementsByTagName('p')[0].innerHTML += newHTML;
document.getElementById('SCStart').addEventListener("click", main, true);

function main() {
	if (document.getElementById('priceWC')) {
		document.getElementById('priceWC').removeEventListener("click", main, true);
	}
	
	if (i < games.length) {
		var url = games[i].getElementsByTagName('a')[0].href;
		document.getElementById('priceWars').innerHTML = "<span id='priceWI'>" + (i+1) + "</span> out of " + games.length + " [ " + url + " ] [ Total: " + currency + total/100 + " ]";
		GM_xmlhttpRequest({
			method: "GET",
			url: url,
			onerror: function(r) { error+= "<div class='gameListRow'>" + games[i].innerHTML + "</div>"; i++; main(); },
			onload: function(r) {
				var doc1 = document.createElement('div');
				doc1.innerHTML = r.responseText;
				if (r.finalUrl == "http://store.steampowered.com/" || doc1.getElementsByTagName('div')[0].id == 'errorPageContainer') { 
					error += "<div class='gameListRow'>" + games[i].innerHTML + "</div>";
					i++;
					main(); 
				} else {
					if (doc1.getElementsByClassName('btn_checkout_green').length) {
						alert("Age Verification");
						GM_openInTab(url);
						document.getElementById('priceWars').innerHTML = "<span id='priceWI'>" + (i+1) + "</span> out of " + games.length + " [ <a href='#' onClick='return false;' id='priceWC'>Continue</a> ]";
						var elmLink = document.getElementById('priceWC');
						elmLink.addEventListener("click", main, true);
					} else {
						if (doc1.getElementsByClassName('game_purchase_price price').length) {
							var price = doc1.getElementsByClassName('game_purchase_price price')[0].innerHTML;
							price = price.replace(/(\s|\t|\n)*/g, '');
							if (price == "Free") { price = "0"; }
							if (currency == "" && price != "0") { currency = price.charAt(0); }							
							price = price.replace(/£/, '');
							total += parseInt(parseFloat(price)*100);
						}
						i++;
						main();	
					}
				}
			}
			
		});
	} else {
		if (error != "") {
			games[0].parentNode.innerHTML = error;
			document.getElementsByClassName('games_list_tab active')[0].innerHTML = "SteamCalculator Error Games";
		}
		document.getElementById('priceWars').innerHTML = "Games Worth: " + currency + total/100 + " | Total Games: " + totalGames;
	}
}

