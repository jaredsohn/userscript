// ==UserScript==
// @name        TheBigTotal
// @namespace   TheBigBoss
// @description Totals row for download stats on TheBigBoss
// @include     http://apt.thebigboss.org/stats.php?dev=*
// @version     1.1
// @require  	https://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js
// ==/UserScript==

"use strict";

$(document).ready(function() {

	var tables = $("table");
	
	var statsTable = tables[tables.length - 1];

	// sum stats
	var sumTotal = 0,
		sumInstaller = 0,
		sumCydia = 0;	

	$(statsTable).find("td").each(function() {
		if ($(this).index() == 1)
	       	sumTotal += Number($(this).text());

		if ($(this).index() == 2)
	       	sumInstaller += Number($(this).text());

		if ($(this).index() == 3)
	       	sumCydia += Number($(this).text());
    });
	
	var rows = $(statsTable).find("tr");
	
	var lastRow = rows[rows.length - 1];
	var newRow = $(lastRow).clone();
	$(newRow).css("font-weight", "bold")
	$(newRow).find("td").css("border-top", "thick double");
	$(statsTable).find("tbody").append(newRow);
	$(newRow).find("td").text("");
	
	$(newRow).find("td:first").text("Totals");
	$(newRow).find("td:eq(1)").text(sumTotal);
	$(newRow).find("td:eq(2)").text(sumInstaller);
	$(newRow).find("td:eq(3)").text(sumCydia);

});