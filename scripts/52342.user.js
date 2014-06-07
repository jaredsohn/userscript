// ==UserScript==
// @name           SSW Sector Map Planet Jumps
// @namespace      http://homeworlds.secretsocietywars.com/nardo
// @description    Displays the shortest planet jump to a sector on your sector map.  Press 'W' for the shortest warps from planets.  Press 'Q' for the shortest warps from your current sector.
// @include        http://www.secretsocietywars.com/index.php?p=space&a=sector_map
// @include        http://www.secretsocietywars.com/index.php?p=space*
// ==/UserScript==

var planets = [["Ahlnuldia", 471], ["Barnimus", 457], ["Boria", 33], ["Deep Six Fauna", 142], ["Earth", 1], ["Eroticon 69", 69], ["Flambe", 1070], ["Laxloo", 493], ["Lucky Spaceman", 49], ["New Ceylon", 92], ["Nortonia", 365], ["Phallorus", 123], ["Pharma", 102], ["Solaris", 15], ["Tranquility", 899], ["Trinoc", 202], ["Xiao MeiMei", 612], ["Yeranus", 30],];
var already_done = eval(GM_getValue("already_done", "({})"));
var jumps = eval(GM_getValue("shortest_jumps", "[]"));
var outbound = eval(GM_getValue("outbound", "[]"));
var original_overlib = unsafeWindow.overlib;
var showing_warps = false;
var working = false;
var backgrounds = new Array();
var sectorlinks;

if(document.location.href.indexOf("a=sector_map") > -1) {
	sector_map();
} else {
	outer_space();
}

function outer_space() {
	var link = document.evaluate('//a[contains(@href, "/index.php?p=planets&a=land") and contains(text(), "land")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var probelink = document.evaluate('//a[contains(@href, "/index.php?p=space&a=launch_probe") and contains(text(), "probe")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var sector = get_current_sector();
	var re;

	if(link) {
		if(!already_done[sector] && planet_sector(sector)) {
			var newlink = document.createElement('a');
			newlink.innerHTML = "LOAD JUMPS";
			newlink.style.color = "rgb(255, 0, 0)";
			newlink.style.fontWeight = "bold";
			newlink.href = "http://www.secretsocietywars.com/index.php?p=space&a=sector_map";
			link.parentNode.insertBefore(newlink, link.nextSibling);
			link.parentNode.insertBefore(document.createElement('br'), newlink);
		}
	}
	if(probelink && jumps[sector]) {
		var jumplink = document.createElement('a');
		jumplink.setAttribute("style", probelink.getAttribute("style"));
		jumplink.innerHTML = jumps[sector][1] + " ("+jumps[sector][0]+" turns)";
		jumplink.href = "/index.php?p=space&a=move&destination="+get_planet_sector(jumps[sector][1])+"&origin="+sector;
		probelink.parentNode.appendChild(document.createElement('br'));
		probelink.parentNode.appendChild(jumplink);
		if(outbound[sector]) {
			for(var i = 0; i < outbound[sector].length; i++) {
				var outlink = document.createElement('a');
				outlink.setAttribute("style", probelink.getAttribute("style"));
				outlink.href = "/index.php?p=space&a=move&destination="+outbound[sector][i][0]+"&origin="+sector;
				if(outbound[sector][i][1]) {
					outlink.appendChild(document.createTextNode("Sector #"+outbound[sector][i][0]+" ("+outbound[sector][i][1]+")"));
				} else {
					outlink.appendChild(document.createTextNode("Sector #"+outbound[sector][i][0]));
				}
				outlink.addEventListener('contextmenu', remove_outbound, false);
				probelink.parentNode.appendChild(document.createElement('br'));
				probelink.parentNode.appendChild(outlink);
			}
		}
	}
	if((re = /origin=(\d+)/.exec(document.location.href)) && (document.location.href.indexOf("confirm=1") > -1)) {
		var origin = parseInt(re[1], 10);
		if(is_warp(origin, sector) && !planet_sector(sector)) {
			if(!outbound_has_sector(origin, sector)) {
				var note = "";
				var asteroid_text = document.evaluate('//text()[contains(., "An Asteroid (")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
				if(!outbound[origin]) {
					outbound[origin] = new Array();
				}
				if((asteroid_text) && (re = /\(([^)]*)\sOre\)/i.exec(asteroid_text.data))) {
					note = re[1];
				}
				outbound[origin].push([sector,note]);
				outbound[origin].sort(function(a, b) {return a[0]-b[0];});
				GM_setValue("outbound", outbound.toSource());
			}
		}
	}
}

function remove_outbound(ev) {
	var current_sector = get_current_sector();
	var re;
	ev.preventDefault();
	ev.stopPropagation();
	if(re = /destination=(\d+)/.exec(ev.target.href)) {
		var target_sector = parseInt(re[1], 10);
		for(var i = 0; i < outbound[current_sector].length; i++) {
			if(outbound[current_sector][i][0] == target_sector) {
				outbound[current_sector].splice(i, 1);
				break;
			}
		}
		ev.target.parentNode.removeChild(ev.target);
		GM_setValue("outbound", outbound.toSource());
	}
}

function is_warp(s1, s2) {
	if((s1 >= s2-34 && s1 <= s2-32) || (s1 == s2-1) || (s1 == s2+1) || (s1 >= s2+32 && s1 <= s2+34)) {
		return false;
	}
	return true;
}

function outbound_has_sector(origin, sector) {
	if(outbound[origin]) {
		for(var i = 0; i < outbound[origin].length; i++) {
			if(outbound[origin][i][0] == sector) {
				return true;
			}
		}
	}
	return false;
}

function sector_map() {
	var sector = get_current_sector();
	var planet_name = get_planet_name(sector);

	if(!already_done[sector] && planet_sector(sector)) {
		var divs = document.evaluate('//div[contains(@onmouseover, "IR Warp")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for(var i = 0; i < divs.snapshotLength; i++) {
			var mouseover = divs.snapshotItem(i).getAttribute("onmouseover");
			var re;
			if(re = /IR Warp From #\d+ to #(\d+) \((\d+) turns/i.exec(mouseover)) {
				var dest = parseInt(re[1], 10);
				var dist = parseInt(re[2], 10);
				if((dest <= 1089) && (dest != sector) && (!jumps[dest] || (dist < jumps[dest][0]))) {
					jumps[dest] = [dist, planet_name];
				}
			}
		}
		already_done[sector] = true;
		GM_setValue("shortest_jumps", jumps.toSource());
		GM_setValue("already_done", already_done.toSource());
	}
	sectorlinks = document.evaluate('//td/div/a[contains(@href, "p=space&a=blastoff") or contains(@href, "p=space&a=move")]/text()', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	document.addEventListener("keydown", kd, false);
	unsafeWindow.overlib = jump_overlib;
	insert_reset_link();
}

function insert_reset_link() {
	var tr = document.evaluate('//select[@name="pnselect"]/ancestor::tr[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var td = document.createElement('td');
	var reset_link = document.createElement('a');
	td.style.verticalAlign = "middle";
	reset_link.href = document.location.href;
	reset_link.addEventListener('click', reset_warps, false);
	reset_link.style.color = "white";
	reset_link.innerHTML = "Reset Warps";
	td.appendChild(reset_link);
	tr.appendChild(td);
}

function reset_warps(ev) {
	ev.preventDefault();
	if(confirm("Do you want to reset all warp information?")) {
		GM_setValue("shortest_jumps", "[]");
		GM_setValue("already_done", "({})");
		GM_setValue("outbound", "[]");
		jumps = [];
		already_done = ({});
	}
}

function get_current_sector() {
	var sector = 0;
	var sector_text = document.evaluate('//a[contains(@href, "index.php?p=space&a=view_sector")]/text()[starts-with(., "SECTOR")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var re;
	if(sector_text && (re = /SECTOR\s+(\d+)/.exec(sector_text.data))) {
		sector = parseInt(re[1], 10);
	}
	return sector;
}

function get_planet_name(sector) {
	for(var i = 0; i < planets.length; i++) {
		if(planets[i][1] == sector) {
			return planets[i][0];
		}
	}
	return "Unknown Planet";
}

function get_planet_sector(name) {
	for(var i = 0; i < planets.length; i++) {
		if(planets[i][0] == name) {
			return planets[i][1];
		}
	}
	return 0;
}

function planet_sector(sector) {
	for(var i = 0; i < planets.length; i++) {
		if(planets[i][1] == sector) {
			return true;
		}
	}
	return false;
}

function jump_overlib(a, b, c) {
	var re;
	var sector = 0;
	if(re = /Sector\s+#(\d+)/i.exec(c)) {
		sector = parseInt(re[1]);
		if(jumps[sector]) {
			a += '<br><div style="background-color: rgb(255, 255, 187); text-align: center">'+jumps[sector][0]+" from "+jumps[sector][1]+'</div>';
		}
	}
	unsafeWindow.overlib = original_overlib;
	original_overlib(a, b, c);
	unsafeWindow.overlib = jump_overlib;
}

function kd(ev) {
	var c = String.fromCharCode(ev.which);
	if(working) {
		return;
	}
	working = true;
	if(c == 'W') {
		if(!showing_warps) {
			showing_warps = true;
			for(var i = 0; i < sectorlinks.snapshotLength; i++) {
				if(jumps[i+1]) {
					sectorlinks.snapshotItem(i).data = jumps[i+1][0];
					backgrounds[i] = sectorlinks.snapshotItem(i).parentNode.style.background;
					if(jumps[i+1][0] <= 4) {
						if(jumps[i+1][0] <= 1) {
							sectorlinks.snapshotItem(i).parentNode.style.background = "rgb(255, 0, 0)";
						} else {
							sectorlinks.snapshotItem(i).parentNode.style.background = "rgb(160, 0, 0)"
						}
					}
				}
			}
		} else {
			showing_warps = false;
			restore_backgrounds();
		}
	}
	working = false;
}

function restore_backgrounds() {
	for(var i = 0; i < sectorlinks.snapshotLength; i++) {
		sectorlinks.snapshotItem(i).data = i+1;
		sectorlinks.snapshotItem(i).parentNode.style.background = backgrounds[i];
	}
}
