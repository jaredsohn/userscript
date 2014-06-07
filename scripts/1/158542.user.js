// ==UserScript==
// @name           P&T - Ingame Link zum Konsortium F-Trade
// @namespace      P&T-Tools
// @description    Erstellt Ingame einen Link zur F-Trade Homepage
// @include        http://www.producers-and-traders.de/*
// ==/UserScript==


	var div_selection = document.getElementsByTagName("ul")[0];
	var insert_before = document.getElementsByTagName("ul")[0].getElementsByTagName("li")[8];

	
	var create_li = document.createElement("li");
	create_li.innerHTML = "<a title='F-Trade Homepage' href='http://f-trade.esport-kolosseum.de/' target='_blank'>F-Trade</a>";
	div_selection.insertBefore(create_li,insert_before);