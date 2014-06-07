// ==UserScript==
// @name           Select all hats

// @namespace      KamaZz
// @include        http://www.tf2items.com/trading/*
// ==/UserScript==

setInterval((function() {
	var div_id = document.getElementById('newTrade').getElementsByTagName('span')[1];
	var div_id2 = document.getElementById('editTrade').getElementsByTagName('span')[1];
	if (div_id) {
		div_id.innerHTML = '<input type="button" title="Select all hats" style="float: right; margin: 0 8px;" value="SELECT ALL HATS!!!!111" onclick="selectAllTradeHats();"></button>';
	} else {
		if (div_id2) {
			div_id2.innerHTML = '<input type="button" title="Select all hats" style="float: right; margin: 0 8px;" value="SELECT ALL HATS!!!!111" onclick="selectAllTradeHats();"></button>';
		}
	}
}), 1000);