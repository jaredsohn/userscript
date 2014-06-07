// ==UserScript==
// @name        MouseHunt Market Helper
// @author      Kevin Zhou
// @version     0.1.1
// @namespace   mhmarkethelp
// @description Shows you prices of things you want to sell.
// @include	    https://www.mousehuntgame.com/trade.php*
// @include     http://www.mousehuntgame.com/trade.php*
// ==/UserScript==
for (var i = 0; i < document.getElementById('image_drop_down_0|select').children.length; i++) {
	document.getElementById('image_drop_down_0|select').children[i].addEventListener("click", function() {
		(document.getElementById("priceAlert") != null) ? (document.getElementById("priceAlert").innerHTML = "") : null;
		getStats(document.getElementById('tradeItemSelector_0').value, function(stats) {
			if (document.getElementById("priceAlert") == null) {
				var ele = document.createElement("div");
				ele.innerHTML = numberWithCommas(stats[0].quantity) + "@" + numberWithCommas(stats[0].unit_price) + " gold each";
				ele.id = "priceAlert";
				document.getElementById("itemTradeSlots").getElementsByClassName("tradeslot")[0].appendChild(ele);
			} else {
				document.getElementById("priceAlert").innerHTML = numberWithCommas(stats[0].unit_price) + " gold";
			}
			//alert(stats[0].unit_price);
		});
		
	}, false);
}
function getStats(item, callback) {
	var priceGet = new XMLHttpRequest();
	priceGet.open("POST", location.protocol + "//www.mousehuntgame.com/managers/ajax/trades/tradelist.php", true);
	priceGet.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	priceGet.onreadystatechange = function() {
		if (priceGet.readyState == 4) {
			callback(JSON.parse(priceGet.response).trades);
		}
	};
	priceGet.send("hg_is_ajax=1&item_type=" + item + "&sort_by=cost&sort_order=asc&sn=Hitgrab");
}
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}