// ==UserScript==
// @name           SSW Trade Route Finder
// @namespace      http://homeworlds.secretsocietywars.com/nardo
// @description    Finds trade routes from the Sector Map
// @include        http://www.secretsocietywars.com/index.php?p=space&a=sector_map
// ==/UserScript==

var divs;
var buyore = new Array();
var sellore = new Array();
var ores = ["Afaikite", "Esabatmite", "Lolnium", "Omgonite", "Bofhozonite","Fwiwzium","Imhozium","Lmaozium","Nimbyite","Pebkacium","Rofolzium","Tanstaaflite"];
var parent_table;
var cell;
var cellhtml = "";
var asteroids = new Array();
var luvsats = new Array();
var bgcolors = new Array();

//buyore[orename] = [[sector, price], [sector, price]]

//divs = document.evaluate('//td[@class="main"]//div[contains(@onmouseover, "Sector #")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
divs = document.evaluate('//td[@class="main"]//div[contains(@onmouseover, "Buying") or contains(@onmouseover, "Selling") or contains(@onmouseover, "asteroid") or contains(@onmouseover, "LuvSat")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
parent_table = document.evaluate('//td[@class="main"]//table', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

cell = parent_table.insertRow(1).insertCell(0);
cell.colSpan = 23;
cell.innerHTML = "";

for(var i = 0; i < divs.snapshotLength; i++) {
	var div = divs.snapshotItem(i);
//	var txt = div.parentNode.innerHTML;
	var txt = div.getAttribute("onmouseover");
	var sector = 0;
	var re;
	var selling_txt;
	var buying;
	var selling;

	if(re = /Sector #(\d+)/i.exec(txt)) {
		sector = re[1];
		bgcolors[sector] = div.style.backgroundColor;
	}

//	cellhtml += "Checking sector " + sector;

	if(re = /Buying:.([^<]+)/i.exec(txt)) {
		var re2;
//
		buying = re[1].split(", ");
		for(var j = 0; j < buying.length; j++) {
			if(re2 = /\s*([^\s]+)\s+Ore\s*\((\d+)\s+SB\)/i.exec(buying[j])) {
				if(buyore[re2[1]] == undefined) {
					buyore[re2[1]] = new Array();
				}
				buyore[re2[1]].push([sector, re2[2]]);
			}
		}
	}
	if(re = /Selling:.([^<]+)/i.exec(txt)) {
		var re2;
		
		selling_txt = re[1];
		selling = selling_txt.split(", ");
		for(var j = 0; j < selling.length; j++) {
			if(re2 = /\s*([^\s]+)\s+Ore\s*\((\d+)\s+SB\)/i.exec(selling[j])) {
				if(sellore[re2[1]] == undefined) {
					sellore[re2[1]] = new Array();
				}
				sellore[re2[1]].push([sector, re2[2]]);
			}
		}
	}
	if(re = /<b>There is an asteroid in this sector:<\/b><br>\s*([^\s]+)/i.exec(txt)) {
		if(asteroids[re[1]] == undefined) {
			asteroids[re[1]] = new Array();
		}
		asteroids[re[1]].push(sector);
	}
	if(txt.indexOf("LuvSat in sector") > -1) {
		luvsats.push(sector);
	}
}

for(var i = 0; i < ores.length; i++) {
	var orename;
	var this_buying;
	var this_selling;
	var maxprice;
	var minprice;
	var buyingsectors = new Array();
	var sellingsectors = new Array();

	orename = ores[ i ];

	if(buyore[orename] && sellore[orename]) {
	
		this_buying  = buyore[orename].sort(ore_sort).reverse();
		this_selling = sellore[orename].sort(ore_sort);
		maxprice = this_buying[0][1];
		minprice = this_selling[0][1];
		for(var j = 0; (j < this_buying.length) && (this_buying[j][1] == maxprice); j++) {
			buyingsectors.push(this_buying[j][0]);
		}
		for(var j = 0; (j < this_selling.length) && (this_selling[j][1] == minprice); j++) {
			sellingsectors.push(this_selling[j][0]);
		}
		cellhtml += "<b>" + orename + "</b> buy @ " + minprice + ": " + sellingsectors.sort(numsort).map(color_sector_number).join(", ") + "<br>";
		cellhtml += "<b>" + orename + "</b> sell @ " + maxprice + ": " + buyingsectors.sort(numsort).map(color_sector_number).join(", ") + "<br><br>";
	}
}

for(var i = 0; i < ores.length; i++) {
	var orename;
	
	orename = ores[ i ];
	if(asteroids[orename]) {
		cellhtml += "<b>" + orename + "</b> asteroids: " + asteroids[orename].sort(numsort).map(color_sector_number).join(", ") + "<br>";
	}
}

var sectors;
var unexplored = new Array();
//sectors = document.evaluate('//a[contains(@style, "background: rgb(153") or contains(@style, "background:#999999")]/text() | //a[contains(@style, "background: rgb(204")]/text()', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
sectors = document.evaluate('//a[contains(@style, "rgb(153") or contains(@style, "background:#999999")]/text() | //a[contains(@style, "rgb(204")]/text()', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for(var i = 0; i < sectors.snapshotLength; i++) {
//	if(sectors.snapshotItem(i).innerHTML.indexOf('#00ff00') == -1) {
//		unexplored.push(sectors.snapshotItem(i).innerHTML);
			unexplored.push(sectors.snapshotItem(i).data);
//	}
}
cellhtml += unexplored.length + " unexplored sectors: " + unexplored.join(", ") + "<br>";
cellhtml += "<b>LuvSats:</b> "+luvsats.map(color_sector_number).join()+"<br>";
cell.innerHTML = cellhtml;

function ore_sort(a, b) {
	return a[1] - b[1];
}

function numsort(a, b) {
	return a - b;
}

function get_owner_color(sector) {
	var div = document.evaluate('//text()[.="'+sector+'"]/parent::a[contains(@href, "p=space&a=blastoff") or contains(@href, "p=space&a=move")]//preceding-sibling::div[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if(div) {
		var re;
		if(re = /^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)/.exec(div.style.background)) {
			return re[0];
		}
	}
}

function color_sector_number(sector) {
//	var color = get_owner_color(sector);
	var color = bgcolors[sector];
	if(color && color != "rgb(0, 0, 0)") {
		return "<span style='color:"+color+"'>"+sector+'</span>';
	}
	return sector;
}
