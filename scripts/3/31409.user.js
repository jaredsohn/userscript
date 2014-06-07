// ==UserScript==
// @name           SSW My Drone Locations
// @namespace      http://homeworlds.secretsocietywars.com/nardo
// @description    Locates your drones from the sector map
// @include        http://www.secretsocietywars.com/index.php?p=space&a=sector_map
// ==/UserScript==


var divs = document.evaluate('//td[@class="main"]//div[contains(@onmouseover, "Your Drones:")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var parent_table = document.evaluate('//td[@class="main"]//table', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
var previous = eval(GM_getValue("previous", "[]"));
var current = new Array();
var cell = parent_table.insertRow(1).insertCell(0);
var total_drones = 0;
var cellhtml = "";

cell.colSpan = 23;
cell.innerHTML = "";

for(var i = 0; i < divs.snapshotLength; i++) {
	var re;
	var div = divs.snapshotItem(i);
	var txt = div.parentNode.innerHTML;
	var sector;
	var drones;

	if(re = /<b>Your Drones:<\/b>\s*([\d,]+)/i.exec(txt)) {
		drones = parseInt(re[1]);
		total_drones += drones;
		if(re = /Sector #(\d+)/i.exec(txt)) {
			sector = parseInt(re[1]);
			current[sector] = drones;
			cellhtml += "Sector " + sector + ": " + drones + " of your drones";
			if(!previous[sector]) {
				previous[sector] = 0;
			}
			if(previous[sector] != drones) {
				cellhtml += " (" + (drones - previous[sector]) + ")";
			}
			cellhtml += "<br>";
		}
	}
}

cell.innerHTML = cellhtml;

GM_setValue("previous", current.toSource());
for(var i = 1; i < previous.length; i++) {
	if(previous[ i ] && !current[ i ]) {
		cell.innerHTML += "<b>***LOST ALL</b> " + previous[ i ] + " drones at sector #" + i + "***<br>";
	}
}
cell.innerHTML += "Total Drones: " + total_drones + "<br>";

