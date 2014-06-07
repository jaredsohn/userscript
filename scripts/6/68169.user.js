// ==UserScript==
// @name           Tata Indicom Broadband Usage Totals
// @namespace      http://userscripts.org/users/131031
// @include        http://tataindicombroadband.in/MyAccount/BbUsage.do?method=getBbUsageDetails
// @description    Used to calculate Bandwidth usage totals for a month on the Tata Indicom Broadband "My Usage" page.
// ==/UserScript==

var rows = document.getElementsByTagName('table')[7].rows;
var total = 0;
var totalup = 0;
var totaldown = 0;

for (i in rows) {
	if (rows[i].cells && rows[i].cells[4] && isNaN(parseInt(rows[i].cells[4].innerHTML)) == false) {
		totalup += parseFloat(rows[i].cells[4].innerHTML);
	}
	if (rows[i].cells && rows[i].cells[5] && isNaN(parseInt(rows[i].cells[5].innerHTML)) == false) {
		totaldown += parseFloat(rows[i].cells[5].innerHTML);
	}
	if (rows[i].cells && rows[i].cells[6] && isNaN(parseInt(rows[i].cells[6].innerHTML)) == false) {
		total += parseFloat(rows[i].cells[6].innerHTML);
	}
}

total = parseInt(total * 100) / 100;
rows[rows.length - 1].cells[0].colSpan = 4;

rows[rows.length - 1].insertCell(1);
rows[rows.length - 1].cells[1].innerHTML = totalup;
rows[rows.length - 1].cells[1].align = "right";

rows[rows.length - 1].insertCell(2);
rows[rows.length - 1].cells[2].innerHTML = totaldown;
rows[rows.length - 1].cells[2].align = "right";

rows[rows.length - 1].insertCell(3);
rows[rows.length - 1].cells[3].innerHTML = total;
rows[rows.length - 1].cells[3].align = "right";