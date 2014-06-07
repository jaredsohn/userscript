// ==UserScript==
// @name           SSW SPACENAV 1001
// @namespace      http://homeworlds.secretsocietywars.com/nardo
// @description    Adds information from the sector map to your spacenav
// @include        http://www.secretsocietywars.com/index.php?p=space*
// @include        http://www.secretsocietywars.com/index.php?p=pvp*
// @include        http://www.secretsocietywars.com/index.php?p=facilities&a=facilities*
// @exclude        http://www.secretsocietywars.com/index.php?p=space&a=launch_probe
// @exclude        http://www.secretsocietywars.com/index.php?p=space&a=spacegate
// ==/UserScript==

chromeinit();

var background_replacements = {"rgb(0, 153, 0)": "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAVSURBVBjTY2T4z9DAQARgHFVIX4UAEPEPATZVIZ8AAAAASUVORK5CYII=)",
                               "rgb(0, 0, 153)": "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAVSURBVBjTY2Rg+N/AQARgHFVIX4UABvsPAV0UzwoAAAAASUVORK5CYII=)",
                               "rgb(204, 0, 0)": "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAVSURBVBjTY/zPwNDAQARgHFVIX4UAGucPAUFQuloAAAAASUVORK5CYII=)",
                               "rgb(255, 51, 0)": "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAVSURBVBjTY/w/kaGBgQjAOKqQvgoBDR0Uq+m2kx0AAAAASUVORK5CYII=)",
                               "rgb(153, 153, 153)": "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAUSURBVBjTY2wAAgYiAOOoQvoqBAB3aBQLsmSTkgAAAABJRU5ErkJggg==)",
                               "questionmark": "url(data:image/png;base64,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)",
};

var society_circles = {"Triad": "data:image/png;base64,R0lGODlhBAAEAJEAAP+fAMB4AFU1AAAAACwAAAAABAAEAAACB1RiAKd4UgAAOw==",
	                     "Illuminati": "data:image/png;base64,R0lGODlhBAAEAJEAAAD/BgDABQBVAgAAACwAAAAABAAEAAACB1RiAKd4UgAAOw==",
	                     "Oddfellows": "data:image/png;base64,R0lGODlhBAAEAJEAAACE/wBjwAAsVQAAACwAAAAABAAEAAACB1RiAKd4UgAAOw==",
	                     //unconfirmed:
	                     "Eastern Star": "data:image/png;base64,R0lGODlhBAAEAJEAAP8AAMAAAFUAAAAAACwAAAAABAAEAAACB1RiAKd4UgAAOw==",
	                     "Amaranth": "data:image/png;base64,R0lGODlhBAAEAJEAAKenp5GRkWxsbE9PTywAAAAABAAEAAACB1RiAKd4UgAAOw==",
};

var society_colors = {"The Illuminati": "rgb(0, 153, 0)",
	                    "The Society of Oddfellows": "rgb(0, 0, 153)",
	                    "The Order of the Eastern Star": "rgb(204, 0, 0)",
	                    "The Triad Cabbal": "rgb(255, 51, 0)",
	                    "The Order of the Amaranth": "rgb(153, 153, 153)",
};

var exclamation = "data:image/png;base64,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";
var society_color = society_colors[get_society()];
var sectordata;
var movepath = eval(GM_getValue("movepath", "[]"));
var color_remap = eval(GM_getValue("color_remap", "({})"));
var honordarken = eval(GM_getValue("honordarken", true));
var colored_boxes = new Object();
var powerups = ["Eroticons", "Freemen", "Gnomes Of Zurich", "Laddie Moe", "Leprechauns", "Motivationists", "Nurse Betty", "Shield Generator", "Space Monkeys", "Tricky Dicks"];
var facilities; //Your facilities
var other_facilities = []; //Other people's facilities
var level = get_level();
var cancelpath = false;
var divheight = 40;
var divwidth = 45;

document.addEventListener("keydown", kp, false);

GM_setValue("pathfind_unexplored", GM_getValue("pathfind_unexplored", false))


if(document.location.href.indexOf('sector_map') > -1) {
	read_sector_map();
} else if(document.location.href.indexOf('p=facilities') > -1) {
	var nardocom2 = document.createElement('input');

	/* this allows the sort facilities to alert the spacenav when facilities from other pages have been loaded */
	nardocom2.type = "button";
	nardocom2.id = "nardocom2";
	nardocom2.style.display = "none";
	nardocom2.addEventListener('click', read_facility_locations, false);
	document.body.appendChild(nardocom2);

	read_facility_locations();
} else {
	sectordata = eval(GM_getValue("sectordata", []));
	insert_drone_nardocom();
//	update_spacenav();
	update_wrapper();
}

function insert_drone_nardocom() {
/*
	var nardocom = document.createElement('input');
	nardocom.type = "button";
	nardocom.id = "nardocom-spacenav-countdrones";
	nardocom.style.display = "none";
	nardocom.addEventListener('click', recount_drones, false);
	document.body.appendChild(nardocom);
*/
}

function click_nardocoms(val) {
	var buttons = document.evaluate('//span[starts-with(@id, "nardocom")]/input[@value="'+val+'"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for(var i = 0; i < buttons.snapshotLength; i++) {
		buttons.snapshotItem(i).click();
	}
}

function read_facility_locations() {
	var facility_status_textobj = document.evaluate('//table//text()[contains(., "Facility Status")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var facilities = new Array();

	if(facility_status_textobj) {
		var facility_table = find_parent(facility_status_textobj, "TABLE");
		for(var i = 1; i < facility_table.rows.length; i++) {
			var facility_sector = get_facility_sector(facility_table.rows[i]);
			if(facility_sector) {
				if(!facilities[facility_sector]) {
					facilities[facility_sector] = new Object();
				}
				if(facility_table.rows[i].cells[0].innerHTML.indexOf('Drone Factory') >= 0) {
					facilities[facility_sector].drone = true;
				}
				if(facility_table.rows[i].cells[0].innerHTML.indexOf('Mining Colony') >= 0) {
					facilities[facility_sector].mine = true;
				}
			}
		}
	}
	GM_setValue("facilities", facilities.toSource());
}

function get_facility_sector(row) {
	var re;
	if(re = /Sector: (\d+)/.exec(row.cells[1].innerHTML)) {
		return parseInt(re[1]);
	}
	return 0;
}			

/*
function make_color_callback(div) {
	return function() {change_color(div, div.style.backgroundColor);};
}
*/

function make_color_callback(div, color) {
	return function() {change_color(div, color);};
}

function make_color_toggle_callback(color) {
	return function(ev) {ev.preventDefault(); ev.stopPropagation(); toggle_boxes(color);};
}

function toggle_boxes(color) {
	var boxes = colored_boxes[color];
	var disp;
	if(boxes) {
		if(boxes.snapshotItem(0).parentNode.style.display == "none") {
			disp = "";
		} else {
			disp = "none";
		}
		for(var i = 0; i < boxes.snapshotLength; i++) {
			boxes.snapshotItem(i).parentNode.style.display = disp;
		}
	}
}

function change_color(div, original_color) {
	var new_color;
	var previous_color = div.style.backgroundColor;
	var boxdivs;
	/* original color is the color that the html says it is
	   previous_color is the color that the user had previously chosen */
	
	new_color = prompt("Please enter the rgb value", div.style.backgroundColor);
	if(new_color != null) {
		if(new_color == "") {
			new_color = original_color;
		}
		div.style.backgroundColor = new_color;
		boxdivs = document.evaluate('//div[contains(@style, "width: 4px")][contains(@style, "'+previous_color+'")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for(var i = 0; i < boxdivs.snapshotLength; i++) {
			boxdivs.snapshotItem(i).style.backgroundColor = new_color;
		}
		color_remap[original_color] = new_color;
		GM_setValue("color_remap", color_remap.toSource());
	}
}

function read_sector_map() {
	var table;
	var row;
	var cell;
	var re;
	var sectordata = new Array();
	var sectors_found = 0;
	var colordivs;

//	table = document.evaluate('//table[contains(@style, "border-color: rgb(51, 51, 51)")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	table = document.evaluate('//div[@class="c1001"]/ancestor::table[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if(table) {
		for(var i = 0; i < table.rows.length; i++) {
			row = table.rows[i];
			for(var j = 0; j < row.cells.length; j++) {
				var child_divs;
				var box_colors = new Array();
				var width20_div;
				var firstdiv;
				var explored;
				var popup_text;
//				var linksto = "";
				var walldata = [['linkup', 1], ['linkdown', 2], ['linkright', 3], ['linkleft', 4]];

				cell = row.cells[j];
				width20_div = document.evaluate('.//div[contains(@style, "width: 20px") or contains(@style, "width: 18px")]', cell, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
				sectors_found++;
				popup_text = width20_div.getAttribute("onmouseover");
				if(re = /Sector #(\d+)/.exec(popup_text)) {
					var sector = parseInt(re[1]);
					sectordata[sector] = new Object();
				}
				sectordata[sector].linkupleft = false;
				sectordata[sector].linkupright = false;
				sectordata[sector].linkdownleft = false;
				sectordata[sector].linkdownright = false;
				if(re = /Links To: ([\d\s,]+)/.exec(popup_text)) {
					var neighbors = re[1].split(/\s*,\s+/);
					for(var neighbor = 0; neighbor < neighbors.length; neighbor++) {
						if(neighbors[neighbor] == sector-34) {
							sectordata[sector].linkupleft = true;
						} else if(neighbors[neighbor] == sector-32) {
							sectordata[sector].linkupright = true;
						} else if(neighbors[neighbor] == sector+32) {
							sectordata[sector].linkdownleft = true;
						} else if(neighbors[neighbor] == sector + 34) {
							sectordata[sector].linkdownright = true;
						}
					}
				}

//				explored = document.evaluate('.//a[contains(@style, "background: rgb(0, 255, 0)")]', cell, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
				explored = document.evaluate('.//a[contains(@style, "rgb(0, 255, 0)")]', cell, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
				if(!explored) {
					/* viewing the sector map from space will shade the current cell so we need to check for that too */
					if(!document.evaluate('.//a[contains(@style, "background: rgb(255, 204, 0)")]', cell, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue) {
						sectordata[sector].unexplored = true;
					}
				}
				sectordata[sector].linksto = true;
				for(var k = 0; k < walldata.length; k++) {
					sectordata[sector][walldata[k][0]] = false;
					if(width20_div.className.substr(walldata[k][1], 1) == '0') {
						sectordata[sector][walldata[k][0]] = true;
					}
				}
				if(width20_div && (re = /(rgb\((?:204, 0, 0|0, 153, 0|0, 0, 153|153, 153, 153|255, 51, 0)\))/.exec(width20_div.style.backgroundColor))) {
					var color = re[1];
					sectordata[sector].color = color;
				} else if(width20_div && (re = /(url\([^)]+\))/.exec(width20_div.style.background))) {
					var planet_graphic = re[1];
					sectordata[sector].color = planet_graphic;
				}
				child_divs = document.evaluate('.//div[contains(@style, "4px")]', cell, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
				for(var k = 0; k < child_divs.snapshotLength; k++) {
					var child_div = child_divs.snapshotItem(k);
					if(child_div.style.width == "4px" && child_div.style.height == "4px" && child_div.style.backgroundColor) {
						box_colors.push(child_div.style.backgroundColor);
					}
				}
				if(re = /<b>Your Drones:<\/b> (\d+)</.exec(popup_text)) {
					var link;
					var blastoff_link = document.evaluate('.//a[contains(@href, "p=space&a=")]', cell, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
/*
					var new_div = newdiv(4, 4);
					new_div.style.backgroundColor = '#FFFFFF';
*/
					sectordata[sector].your_drones = parseInt(re[1]);
//					box_colors.push("rgb(255, 255, 255)");
					if(blastoff_link) {
						blastoff_link.style.background = "rgb(255, 255, 255)";
					}
				}
				if(box_colors.length > 0) {
					sectordata[sector].boxes = box_colors;
				}
			}
		}
		if(sectors_found >= 1089) {
			GM_setValue("sectordata", sectordata.toSource());
			if(re = /<B>UTC:<\/B>\s*(\d+):(\d+)\s*(\w+\s*\d+,\s*\d+)/.exec(document.body.innerHTML)) {
				var current_minutes = (parseInt(re[1]) * 60) + parseInt(re[2]);
				var current_date = re[3];
				GM_setValue("minutes", current_minutes);
				GM_setValue("date", current_date);
			}
		}
	}

	colordivs = document.evaluate('//div[contains(@style, "width: 10px")][contains(@title, "Density")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for(var i = 0; i < colordivs.snapshotLength; i++) {
		var colordiv = colordivs.snapshotItem(i);
		colored_boxes[colordiv.style.backgroundColor] = document.evaluate('//div[contains(@style, "width: 4px")][contains(@style, "'+colordiv.style.backgroundColor+'")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		colordiv.addEventListener('dblclick', make_color_callback(colordiv, colordiv.style.backgroundColor), true);
		colordiv.addEventListener('contextmenu', make_color_toggle_callback(colordiv.style.backgroundColor), false);
		if(color_remap[colordivs.snapshotItem(i).style.backgroundColor]) {
			colordivs.snapshotItem(i).style.backgroundColor = color_remap[colordivs.snapshotItem(i).style.backgroundColor];
		}
	}
	for (var i in color_remap) {
		if(i != color_remap[i]) {
			var boxdivs = colored_boxes[i];
			if(boxdivs) {
				for(var j = 0; j < boxdivs.snapshotLength; j++) {
					boxdivs.snapshotItem(j).style.backgroundColor = color_remap[i];
				}
			}
		}
	}
}

function follow_path() {
	var expected_sector = movepath[0];
	var current_sector = find_current_sector();
	var reasons_to_stop
	var final_sector = movepath[movepath.length-1];

	reasons_to_stop = check_path_stop();

	if(expected_sector != current_sector) {
		update_spacenav("Unexpected sector, aborting travel to " + final_sector);
		movepath = [];
		GM_setValue("movepath", "[]");
	} else if((reasons_to_stop.length > 0) && (movepath.length > 1)) {
		movepath = [];
		GM_setValue("movepath", "[]");
		update_spacenav("Aborted travel to " + final_sector + " because of " + reasons_to_stop.join(", "));
	} else {
		movepath.shift();
		GM_setValue("movepath", movepath.toSource());
		if(movepath.length > 0) {
			var travel_link = document.evaluate('//a[contains(@href, "&destination='+movepath[0]+'&confirm")]', document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
			
			if(travel_link) {
				GM_log(travel_link.href);
				travel_to(travel_link.href);
			} else {
				movepath=[];
				GM_setValue("movepath", "[]");
				update_spacenav("Unable to find travel link");
			}
		} else {
			update_spacenav("Traveled from " + GM_getValue("movefrom", "unknown") + " to " + current_sector);
		}
	}
}

function update_wrapper() {
	var waitcom = document.evaluate('//span[@id="nardocom1"]//input[@id="wait"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

	if(waitcom) {
		setTimeout(update_wrapper, 50);
		return;
	}
	update_spacenav();
}

function travel_to(loc) {
	var waitcom = document.evaluate('//span[@id="nardocom1"]//input[@id="wait"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var current_sector = find_current_sector();

	if(waitcom) {
		setTimeout(function() {travel_to(loc);}, 100);
		return;
	}
	if(cancelpath) {
		update_spacenav("Travel aborted by user");
	}
		
	if(re = /[\d,]+\s+\w+\s+Drones!/.exec(document.body.innerHTML)) {
		if(society_color && (society_color != sectordata[current_sector].color)) {
			sectordata[current_sector].color = society_color;
		}
		GM_setValue("sectordata", sectordata.toSource());
	}
	document.location.href = loc;
}


function check_path_stop() {
	var sector_powerups = document.evaluate('//a[contains(@href, "p=space&a=powerup")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var pvp = document.evaluate('//a[contains(@href, "p=pvp&a=attack_player")]', document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	var sex0r = document.evaluate('//a[contains(@href, "p=pvp&a=sex0r_player")]', document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	var reasons_to_stop = new Array();
	var no_powerups_remaining = document.evaluate('//text()[contains(., "0 remaining today")]', document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;

	if(pvp && GM_getValue("PVP", false)) {
		reasons_to_stop.push("a PVP victim");
	}
	if(sex0r && GM_getValue("sex0r", false)) {
		reasons_to_stop.push("a player to sex0r");
	}
	if(!no_powerups_remaining || !no_powerups_remaining.data.match(/^\s*0 remaining/)) {
		for(var i = 0; i < sector_powerups.snapshotLength; i++) {
			var cell = find_parent(sector_powerups.snapshotItem(i), "TD");
			for(var j = 0; j < powerups.length; j++) {
				var prefname = powerups[j].replace(/ /g, "");
				if(GM_getValue(prefname, false) && (cell.innerHTML.indexOf(powerups[j]) > -1)) {
					reasons_to_stop.push(powerups[j]);
				}
			}
		}
	}
	return reasons_to_stop;
}

function make_pref_span() {
	var span = document.createElement('span');
	var opts = ["PVP", "sex0r"];
	var chk;
	var label;
	var other_options = [["pathfind_unexplored", "Route through unexplored sectors", false], ["disable_circles", "Disable facility circles", true], ["enable_arrows", "Enable arrow key navigation", false]];
	
	opts = opts.concat(powerups);

	span.style.textAlign = "left";
	span.appendChild(document.createTextNode("Stop traveling for:"));
	span.appendChild(document.createElement('br'));
	for(var i = 0; i < opts.length; i++) {
		var prefname = opts[i].replace(/ /g, "");

		chk = document.createElement('input');
		chk.type = "checkbox";
		chk.checked = GM_getValue(prefname, false);
		chk.id = prefname;
		chk.style.verticalAlign = "middle";
		chk.addEventListener('click', toggle_pref, false);
		span.appendChild(chk);
		label = document.createElement('label');
		label.innerHTML = opts[i];
		label.htmlFor = prefname;
		span.appendChild(label);
		span.appendChild(document.createElement('br'));
	}
	span.appendChild(document.createElement('br'));
	for(var i = 0; i < other_options.length; i++) {
		chk = document.createElement('input');
		chk.type = "checkbox";
//		chk.checked = GM_getValue("pathfind_unexplored", false);
		chk.checked = GM_getValue(other_options[i][0], other_options[i][2]);
//		chk.id = "pathfind_unexplored";
		chk.id = other_options[i][0];
		chk.style.verticalAlign = "middle";
		chk.addEventListener('click', toggle_pref, false);
		span.appendChild(chk);
		label = document.createElement('label');
//		label.innerHTML = "Route through unexplored sectors";
		label.innerHTML = other_options[i][1];
//		label.htmlFor = "pathfind_unexplored";
		label.htmlFor = other_options[i][0];
		span.appendChild(label);
		span.appendChild(document.createElement('br'));
	}
	return span;
}

function toggle_pref(ev) {
	var val = GM_getValue(this.id, false);
	
	val = !val;
	GM_setValue(this.id, val);
}

function update_spacenav(msg) {
	var spacenav_textobj;
//	var spacenav_links = document.evaluate('//table[@border="1"]//a[contains(@href, "index.php?p=space&a=move&destination=")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var spacenav_links = document.evaluate('//table[contains(@style, "border-collapse: collapse;")]//tr[position()>1]//a[contains(@href, "index.php?p=space&a=move&destination=")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var re;
	var current_sector = find_current_sector();
	var write_data = false;
	var table;
	var additional_radius = GM_getValue("radius", 1);
	var takelink = document.evaluate('//a[contains(@href, "index.php?p=space&a=take_drones")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var mainstringobjs = document.evaluate('//td[@class="main"]//text()', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var mainstring = "";
	
	for(var i = 0; i < mainstringobjs.snapshotLength; i++) {
		mainstring += mainstringobjs.snapshotItem(i).data + "\n";
	}
	
	GM_setValue("radius", additional_radius);
	facilities = eval(GM_getValue("facilities", "[]"));

	spacenav_textobj = document.evaluate('//text()[contains(., "SPACENAV ")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if(spacenav_textobj) {
		spacenav_textobj.data = spacenav_textobj.data.replace("SPACENAV 3K", "SPACENAV 4K");
	}

	if(!sectordata[current_sector]) {
		sectordata[current_sector] = new Object();
	}

	if(sectordata[current_sector].unexplored) {
		var boxes = new Array();
		var planet;

		if(document.evaluate('//img[contains(@src, "space_jellys.gif")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue) {
			boxes.push("rgb(153, 255, 255)");
		}
		if(document.evaluate('//a[contains(@href, "p=space&a=black_hole")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue) {
			boxes.push("rgb(255, 0, 0)");
		}
		if(document.evaluate('//a[contains(@href, "p=space&a=mine_asteroid")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue) {
			boxes.push("rgb(153, 153, 153)");
		}
		if(document.evaluate('//a[contains(@href, "p=inventory&a=vending")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue) {
			boxes.push("rgb(255, 0, 255)");
		}
		if(document.evaluate('//a[contains(@href, "p=inventory&a=trade_port")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue) {
			boxes.push("rgb(0, 255, 0)");
		}
		if(document.evaluate('//img[contains(@src, "less-than-3-satellite.gif")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue) {
			boxes.push("rgb(255, 153, 51)");
		}
		if(planet = document.evaluate('//a[contains(@href, "p=planets&a=land")]//img[contains(@src, "/planets/")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue) {
			boxes.push("rgb(0, 0, 0)");
			sectordata[current_sector].color = "url(" + planet.src + ")";
		}
		if(document.evaluate('//a[contains(@href, "p=planets&a=ipt_911")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue) {
			boxes.push("rgb(255, 255, 0)");
		}
		if(boxes.length > 0) {
			sectordata[current_sector].boxes = boxes;
		}
		sectordata[current_sector].linksto = "";
		sectordata[current_sector].linkup = false;
		sectordata[current_sector].linkdown = false;
		sectordata[current_sector].linkleft = false;
		sectordata[current_sector].linkright = false;
		for(var i = 0; i < spacenav_links.snapshotLength; i++) {
			var re;
			if(re = /destination=(\d+)/.exec(spacenav_links.snapshotItem(i).href)) {
				var neighbor = re[1];
				if(neighbor == current_sector-33) {
					sectordata[current_sector].linksto += "u";
					sectordata[current_sector].linkup = true;
				} else if(neighbor == current_sector-1) {
					sectordata[current_sector].linksto += "l";
					sectordata[current_sector].linkleft = true;
				} else if(neighbor == current_sector+1) {
					sectordata[current_sector].linksto += "r";
					sectordata[current_sector].linkright = true;
				} else if(neighbor == current_sector + 33) {
					sectordata[current_sector].linksto += "d";
					sectordata[current_sector].linkdown = true;
				}
			}
		}
		sectordata[current_sector].unexplored = false;
		write_data = true;
	}

	if(level >= 33) {
		other_facilities = eval(GM_getValue("other_facilities", "[]"));
		other_facilities[current_sector] = new Object;
		for(var soc in society_circles) {
			if((mainstring.indexOf(soc + " Mining Colony") > -1) || (mainstring.indexOf(soc + " Drone Factory") > -1)) {
				other_facilities[current_sector][soc] = true;
			}
		}
		GM_setValue("other_facilities", other_facilities.toSource());
	} else {
		GM_setValue("other_facilities", "[]");
	}

	if(re = /You have been blocked from entering sector (\d+) by enemy drones/.exec(mainstring)) {
		var enemy_sector = parseInt(re[1]);
		
		if(!sectordata[enemy_sector].color || (sectordata[enemy_sector].color == society_color)) {
			sectordata[enemy_sector].color = "questionmark";
			sectordata[enemy_sector].your_drones = 0;
			write_data = true;
		}
	}

	if(re = /[\d,]+\s+\w+(\s+\w+)?\s+Drones!/.exec(mainstring)) {

		if(society_color && (society_color != sectordata[current_sector].color)) {
			sectordata[current_sector].color = society_color;
		}
		write_data = true;
	} else if(/^rgb/.exec(sectordata[current_sector].color)) {
		delete(sectordata[current_sector].color);
		write_data = true;
	}

	if(takelink) {
		if(re = /(\d+) drone/.exec(takelink.innerHTML)) {
			if(sectordata[current_sector].your_drones != parseInt(re[1])) {
				sectordata[current_sector].your_drones = parseInt(re[1]);
				write_data = true;
			}
		}
	} else if(sectordata[current_sector].your_drones > 0) {
		sectordata[current_sector].your_drones = 0;
		write_data = true;
	}

	if((mainstring.indexOf('Defender Drones Destroyed') > -1) && (re = /Successfully entered Sector: (\d+)/.exec(mainstring))) {

		var sectornum = parseInt(re[1]);
		
		if(!sectordata[sectornum]) {
			sectordata[sectornum] = new Object();
		}
		sectordata[sectornum].color = "";
		write_data = true;
	} else if(re = /You have deployed \d+ battle drones? into sector (\d+)/.exec(mainstring)) {
		var sectornum = parseInt(re[1]);

		if(society_color) {
			if(!sectordata[sectornum]) {
				sectordata[sectornum] = new Object();
			}
			sectordata[sectornum].color = society_color;
			write_data = true;
		}
	}

	/* path call moved here so that the above code can update the sectordata */
	if((movepath.length > 0) && (msg == undefined)) {
		if(cancelpath) {
			msg = "Travel aborted by user";
		} else {
			if(write_data) {
				GM_setValue("sectordata", sectordata.toSource());
			}
			follow_path();
			return;
		}
	}

	if(data_expired()) {
		if(spacenav_textobj) {
			var update_span = document.createElement('span');
			var top_table = find_parent(spacenav_textobj, "TABLE");
			if(top_table) {
				var cell = top_table.insertRow(1).insertCell(0);
				var link = document.createElement('a');
				cell.colSpan = 2;
				cell.align = "center";
				cell.setAttribute("style", find_parent(spacenav_textobj, "TD").getAttribute("style"));
				link.style.color = "rgb(255, 204, 0)";
				link.href = "http://www.secretsocietywars.com/index.php?p=space&a=sector_map";
				link.innerHTML = "Update Sector Data";
				cell.appendChild(link);
			}
		}
	}

	if(msg && spacenav_textobj) {
		display_message(msg, spacenav_textobj);
	}

	color_sectors();
	for(i = 0; i < additional_radius; i++) {
		increase_spacenav_size();
	}
	click_nardocoms("increase");

	if(spacenav_textobj) {
		var plus = document.createElement('a');
		var minus = document.createElement('a');
		var prefspan = make_pref_span();
//		var spacenav_div = find_parent(spacenav_textobj, "DIV");
		var spacenav_div = find_parent(spacenav_textobj, "TD");
		var clickspan = document.createElement('span');
		
		spacenav_textobj.data = " "+spacenav_textobj.data+" ";


		plus.innerHTML = "+";
		plus.style.fontWeight = "bold";
		plus.style.cursor = "pointer";
		plus.style.color = "rgb(205, 204, 0)";
		plus.style.fontSize = "18px";
		plus.addEventListener('click', increase_spacenav_size_nardocom, false);
		spacenav_textobj.parentNode.insertBefore(plus, spacenav_textobj.nextSibling);
		
		minus.innerHTML = "-";
		minus.style.fontWeight = "bold";
		minus.style.cursor = "pointer";
		minus.style.color = "rgb(205, 204, 0)";
		minus.style.fontSize = "18px";
		minus.addEventListener('click', decrease_spacenav_size, false);
		spacenav_textobj.parentNode.insertBefore(minus, spacenav_textobj);

		
		prefspan.style.display = "none";
		spacenav_textobj.parentNode.insertBefore(prefspan, plus.nextSibling);
//		spacenav_div.addEventListener('contextmenu', function(ev) {ev.preventDefault(); ev.stopPropagation(); toggle_display(prefspan, "block");}, false);
		clickspan.addEventListener('click', function(ev) {ev.preventDefault(); ev.stopPropagation(); toggle_display(prefspan, "block");}, false);
		clickspan.style.cursor = "pointer";
		spacenav_textobj.parentNode.replaceChild(clickspan, spacenav_textobj);
		clickspan.appendChild(spacenav_textobj);
		
//		document.addEventListener("keydown", kp, false);
	}

	if(write_data) {
		GM_setValue("sectordata", sectordata.toSource());
	}
}

function display_message(msg, spacenav_textobj) {
	var results_table = document.evaluate('//fieldset[@class="results"]//table//table', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

	if(results_table && /^(Aborted|Unexpected)/.exec(msg)) {
		var previous_row, previous_cell;
		var results_cell;
		var img;
		var newtable;
		
		previous_row = results_table.rows[results_table.rows.length-1]
		previous_cell = previous_row.cells[0];
		results_cell = results_table.insertRow(results_table.rows.length).insertCell(0);
		if(previous_cell.style.backgroundColor == "rgb(204, 204, 204)") {
			results_cell.style.backgroundColor = "rgb(238, 238, 238)";
		} else {
			results_cell.style.backgroundColor = "rgb(204, 204, 204)";
		}
		newtable = document.createElement('table');
		newtable.insertRow(0);
		newtable.rows[0].insertCell(0);
		newtable.rows[0].insertCell(1);
		newtable.rows[0].cells[1].style.verticalAlign = "middle";
		img = document.createElement('img');
		img.src = exclamation;
		newtable.rows[0].cells[0].appendChild(img);
		newtable.rows[0].cells[1].appendChild(document.createTextNode(msg));
		results_cell.appendChild(newtable);
	} else if(spacenav_textobj) {
		var new_div = document.createElement('div');
		var old_div = find_parent(spacenav_textobj, "DIV");
		var msgtable = document.createElement('table');

		if(old_div) {
			new_div.setAttribute("style", old_div.getAttribute("style"));
		}

		new_div.align = "left";
		new_div.style.display = "block";
		new_div.style.color = "rgb(255, 204, 0)";
		new_div.appendChild(document.createTextNode(msg));
		spacenav_textobj.parentNode.insertBefore(new_div, spacenav_textobj.nextSibling);
	}
}


function toggle_display(obj, disptype) {
	if(obj.style.display == "none") {
		obj.style.display = disptype;
	} else {
		obj.style.display = "none";
	}
}

function kp(ev) {
	if(ev.which == 43 || ev.which == 61 || ev.which == 107) {
		increase_spacenav_size_nardocom(ev);
	} else if(ev.which == 109) {
		decrease_spacenav_size(ev);
	} else if((ev.which == 27 && ev.shiftKey) || String.fromCharCode(ev.which) == 'X') {
		cancelpath = true;
		GM_setValue("movepath", "[]");
	} else if(ev.which == 40 || ev.which == 98) {
		arrownavigate("down", ev);
	} else if(ev.which == 37 || ev.which == 100) {
		arrownavigate("left", ev);
	} else if(ev.which == 39 || ev.which == 102) {
		arrownavigate("right", ev);
	} else if(ev.which == 38 || ev.which == 104) {
		arrownavigate("up", ev);
	}
}

function arrownavigate(direction, ev) {
	var current_sector = find_current_sector();
	http://www.secretsocietywars.com/index.php?p=space&a=move&destination=34&confirm=1&origin=1
	if(GM_getValue("enable_arrows", false) && current_sector && sectordata[current_sector]) {
		ev.preventDefault();
		if(direction == "right" && sectordata[current_sector].linkright) {
			window.location.href = "/index.php?p=space&a=move&destination="+(current_sector+1)+"&confirm=1&origin="+current_sector;
		} else if(direction == "left" && sectordata[current_sector].linkleft) {
			window.location.href = "/index.php?p=space&a=move&destination="+(current_sector-1)+"&confirm=1&origin="+current_sector;
		} else if(direction == "up" && sectordata[current_sector].linkup) {
			window.location.href = "/index.php?p=space&a=move&destination="+(current_sector-33)+"&confirm=1&origin="+current_sector;
		} else if(direction == "down" && sectordata[current_sector].linkdown) {
			window.location.href = "/index.php?p=space&a=move&destination="+(current_sector+33)+"&confirm=1&origin="+current_sector;
		}
	}
}

function box_color(color) {
	if(color_remap[color]) {
		return color_remap[color];
	}
	return color;
}

function color_sector(sectorobj, darker) {
	var parent_td;
	var sectornum;
	var celldiv;

	parent_td = find_parent(sectorobj, "TD");
	if(!document.evaluate('.//div', parent_td, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue) {
		var celldiv = newdiv(divwidth, divheight);
		celldiv.style.textAlign = "center";
		celldiv.style.verticalAlign = "middle";
		sectorobj.parentNode.replaceChild(celldiv, sectorobj);
		celldiv.appendChild(sectorobj);
	}
	parent_td.style.verticalAlign = "bottom";
	if(re = /destination=(\d+)/.exec(sectorobj.href)) {
		var circles = new Array();
		
		sectornum = parseInt(re[1]);
		if(sectordata[sectornum] && sectordata[sectornum].color) {
			var color = sectordata[sectornum].color;
				
			if(background_replacements[color]) {
				color = background_replacements[color];
			}

			parent_td.style.background = color;
		}
		if(darker && honordarken) {
			sectorobj.style.opacity = "0.65";
		}
		mazedraw(parent_td, sectornum);

		if((level >= 33) && other_facilities[sectornum]) {
			for(var society in other_facilities[sectornum]) {
				if(society_circles[society]) {
					circles.push(society_circles[society]);
				}
			}
		}

		if(sectordata[sectornum] && (sectordata[sectornum].boxes || circles.length)) {
			var span = document.createElement('span');
			var boxtable = document.createElement('table');
			var boxrow = boxtable.insertRow(0);
			var boxes = sectordata[sectornum].boxes;

			boxtable.cellPadding = 0;
			boxtable.cellSpacing = 1;
			boxtable.border = 1;
			boxtable.style.borderColor = "rgb(0, 0, 0)";
			boxtable.style.borderCollapse = "collapse";

			if(!boxes) {
				boxes = new Array();
			}

/*
			if(sectordata[sectornum].your_drones > 0) {
				boxes = boxes.concat(["rgb(255, 255, 255)"]);
			}
*/
				
			for(var j = 0; j < boxes.length; j++) {

				var boxdiv = document.createElement('div');
				var boxcell = boxrow.insertCell(boxrow.cells.length);
				boxdiv.style.width = "4px";
				boxdiv.style.height = "4px";
				boxdiv.style.backgroundColor = box_color(boxes[j]);
				boxcell.appendChild(boxdiv);
			}
			if(circles.length && !GM_getValue("disable_circles", true)) {
				var parent_table = document.createElement('table');
				var circle_table = document.createElement('table');
				parent_table.border = 0;
				parent_table.cellSpacing = 0;
				parent_table.cellPadding = 0;
				parent_table.insertRow(0);
				parent_table.rows[0].insertCell(0).align = "left";
				parent_table.rows[0].insertCell(1).align = "right";
				parent_table.width = "100%";

				circle_table.border = 1;
				circle_table.cellSpacing = 1;
				circle_table.cellPadding = 0;
				circle_table.insertRow(0);
				circle_table.style.borderColor = "rgb(0, 0, 0)";
				circle_table.style.borderCollapse = "collapse";

				for(var j = 0; j < circles.length; j++) {
					var cell = circle_table.rows[0].insertCell(circle_table.rows[0].cells.length);
					var img = document.createElement('img');
					img.src = circles[j];
					cell.appendChild(img);
				}
				parent_table.rows[0].cells[0].appendChild(boxtable);
				parent_table.rows[0].cells[1].appendChild(circle_table);
				span.appendChild(parent_table);
			} else {
				span.appendChild(boxtable);
			}
			parent_td.insertBefore(span, parent_td.firstChild);
		}
		if(sectordata[sectornum] && sectordata[sectornum].unexplored) {
			sectorobj.innerHTML = sectorobj.innerHTML.replace("<br>", "U<br>");
		}

		if(sectordata[sectornum] && sectordata[sectornum].your_drones) {
			var linkspan = document.evaluate('.//span', sectorobj, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
			if(linkspan) {
				linkspan.appendChild(document.createElement("br"));
				linkspan.appendChild(document.createTextNode('YD: ' + (sectordata[sectornum].your_drones < 10000 ? sectordata[sectornum].your_drones : Math.round(sectordata[sectornum].your_drones/1000) + "K")));
			}
		}


		if((level >= 33) && facilities[sectornum]) {
			if(facilities[sectornum].drone) {
				sectorobj.innerHTML = sectorobj.innerHTML.replace("<br>", '<span style="color:red">D</span><br>');
			}
			if(facilities[sectornum].mine) {
				sectorobj.innerHTML = sectorobj.innerHTML.replace("<br>", '<span style="color:red">M</span><br>');
			}
		}
	}
}

function mazedraw(cell, sectornum) {
	if(sectordata[sectornum] && sectordata[sectornum].linksto) {
		if(sectordata[sectornum].linkup) {
			cell.style.borderTop = "none";
		} else {
			cell.style.borderTop = "solid";
			cell.style.borderTopWidth="thick";
		}
		if(sectordata[sectornum].linkdown) {
			cell.style.borderBottom = "none";
		} else {
			cell.style.borderBottom = "solid";
			cell.style.borderBottomWidth = "thick";
		}
		if(sectordata[sectornum].linkright) {
			cell.style.borderRight = "none";
		} else {
			cell.style.borderRight = "solid";
			cell.style.borderRightWidth = "thick";
		}
		if(sectordata[sectornum].linkleft) {
			cell.style.borderLeft = "none";
		} else {
			cell.style.borderLeft = "solid";
			cell.style.borderLeftWidth = "thick";
		}
		cell.style.borderColor = "yellow";
	}
}

function color_sectors() {
	var spacenav_links = document.evaluate('//table[contains(@style, "border-collapse: collapse;")]//tr[position()>1]//a[contains(@href, "index.php?p=space&a=move&destination=")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var current_sector = find_current_sector();
	for(var i = 0; i < spacenav_links.snapshotLength; i++) {
		color_sector(spacenav_links.snapshotItem(i), false);
	}
	if(spacenav_links.snapshotLength > 0) {
		var table = document.evaluate('./ancestor::table[1]', spacenav_links.snapshotItem(0), null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		for(var row = 1; row < table.rows.length; row++) {
			for(var col = 0; col < table.rows[row].cells.length; col++) {
				var cell = table.rows[row].cells[col];
				var link = document.evaluate('.//a[contains(@href, "index.php?p=space&a=move&destination=")]', cell, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
				var sector = 0;
				var newsector;
				var outside = false;
				if(!link) {
					if(row == 1 && current_sector <= 33) {
						outside = true;
					}
					if(col == 0 && (current_sector % 33 == 1)) {
						outside = true;
					}
					if(col == 2 && (current_sector % 33 == 0)) {
						outside = true;
					}
					newsector = current_sector + ((row-2)*33) + col-1;
					if(newsector > 1089 || newsector < 1) {
						outside = true;
					}
					if(!outside) {
						if(row == 2 && col == 1) {
							mazedraw(cell, newsector);
						} else {
							var navlink;
							style_spacenav_cell(cell);
							div = newdiv(divwidth, divheight);
							div.style.textAlign = "center";
							div.style.verticalAlign = "middle";
							div.appendChild(navlink = new_navlink(newsector, current_sector));
//							cell.appendChild(div);
							cell.replaceChild(div, cell.firstChild);
							color_sector(navlink, true);
						}
					}
				}
			}
		}
	}
}

function decrease_spacenav_size(ev) {
	var center_img = document.evaluate('//a[contains(@href, "index.php?p=space&a=view_sector")]//img[contains(@src, "/img/avatars/")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var additional_radius = GM_getValue("radius", 1);

	if(additional_radius > 0) {
		GM_setValue("radius", additional_radius - 1);

		table = find_parent(center_img, "TABLE");
		if(!table) {
			return;
		}
		table.deleteRow(1);
		table.deleteRow(table.rows.length - 1);
		for(var i = 1; i < table.rows.length; i++) {
			table.rows[i].deleteCell(0);
			table.rows[i].deleteCell(table.rows[i].cells.length - 1);
		}
		table.rows[0].cells[0].colSpan -= 2;
	}
}

function style_spacenav_cell(cell) {
	cell.style.backgroundImage = "url('images/leftside/ls_bg.gif')";
	cell.style.border = "1px solid rgb(255, 255, 255)";
	cell.style.height = "40px";
	cell.style.textAlign = "center";
	cell.style.verticalAlign = "bottom";
	return cell;
}

function increase_spacenav_size_nardocom(ev) {
	increase_spacenav_size(ev);
	click_nardocoms("increase");
}

function increase_spacenav_size(ev) {
//	var spacenav_links = document.evaluate('//table[@border="1"]//a[contains(@href, "index.php?p=space&a=move&destination=")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var spacenav_links = document.evaluate('//table[contains(@style, "border-collapse: collapse;")]//a[contains(@href, "index.php?p=space&a=move&destination=")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var current_sector = find_current_sector();
	var new_sectors = new Array();

	if(ev) {
		var additional_radius = GM_getValue("radius", 1);
		GM_setValue("radius", additional_radius + 1);
	}

	if(spacenav_links.snapshotLength > 0) {
		var row;
		var cell;
		var div;
		var first_sector;
		var first_line_start;
		/* current_line_start is the start of the row that the player is in, not the start of the line we're adding */
		var current_line_start = parseInt((current_sector - 1) / 33) * 33 + 1;
		var added_sector;
		var center_img;
		var table_width;
		var table_height;
		var rad;
		var navlink;

		center_img = document.evaluate('//a[contains(@href, "index.php?p=space&a=view_sector")]//img[contains(@src, "/img/avatars/")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		table = find_parent(center_img, "TABLE");
		if(!table) {
			return;
		}
		
		table_height = table.rows.length - 1;
		table_width = table.rows[1].cells.length;
		rad = parseInt((table_width - 1) / 2) - 1;

		row = table.insertRow(1);
		for(i = 0; i < table_width + 2; i++) {
			added_sector = current_sector - ((2 + rad) * 33) - (2 + rad) + i;
			cell = style_spacenav_cell(row.insertCell(i));
			div = newdiv(divwidth, divheight);
			div.style.textAlign = "center";
			div.style.verticalAlign = "middle";
			if((added_sector >= (current_line_start - ((2 + rad) * 33)))
			   && (added_sector <= (current_line_start - ((2 + rad) * 33) + 32))
			   && (added_sector > 0)) {
				div.appendChild(navlink = new_navlink(added_sector, current_sector));
//				cell.appendChild(navlink = new_navlink(added_sector, current_sector));
				new_sectors.push(navlink);
			} else {
				cell.style.backgroundImage = "";
				cell.style.background = "rgb(17, 17, 17)";
			}
			cell.appendChild(div);
		}
		first_sector = current_sector - ((rad + 1) * 33) - (rad + 2);
		first_line_start = current_line_start - ((rad + 1) * 33);
		for(i = 1; i < table_height + 1; i++) {
			added_sector = first_sector + ((i-1)*33);
			cell = style_spacenav_cell(table.rows[i+1].insertCell(0));
			div = newdiv(divwidth, divheight);
			div.style.textAlign = "center";
			div.style.verticalAlign = "middle";
			if((added_sector >= first_line_start + ((i-1)*33)) && (added_sector > 0) && (added_sector <= 1089)) {
				div.appendChild(navlink = new_navlink(added_sector, current_sector));
				new_sectors.push(navlink);
			} else {
				cell.style.backgroundImage = "";
				cell.style.background = "rgb(17, 17, 17)";
			}
			cell.appendChild(div);
			
			added_sector += 4 + rad*2;
			cell = style_spacenav_cell(table.rows[i+1].insertCell(4 + rad*2));
			div = newdiv(divwidth, divheight);
			div.style.textAlign = "center";
			div.style.verticalAlign = "middle";
			if((added_sector <= first_line_start + ((i-1)*33) + 32) && (added_sector > 0) && (added_sector <= 1089)) {
				div.appendChild(navlink = new_navlink(added_sector, current_sector));
				new_sectors.push(navlink);
			} else {
				cell.style.backgroundImage = "";
				cell.style.background = "rgb(17, 17, 17)";
			}
			cell.appendChild(div);
		}
//		row = table.insertRow(4 + rad*2);
		row = table.insertRow(4 + rad*2 + 1);
		for(i = 0; i < 5 + rad*2; i++) {
			added_sector = current_sector + ((2 + rad) * 33) - (2 + rad) + i;
			cell = style_spacenav_cell(row.insertCell(i));
			div = newdiv(divwidth, divheight);
			div.style.textAlign = "center";
			div.style.verticalAlign = "middle";
			if((added_sector >= (current_line_start + ((2 + rad) * 33)))
			   && (added_sector <= (current_line_start + ((2 + rad) * 33) + 32))
			   && (added_sector <= 1089)) {
				div.appendChild(navlink = new_navlink(added_sector, current_sector));
				new_sectors.push(navlink);
			} else {
				cell.style.backgroundImage = "";
				cell.style.background = "rgb(17, 17, 17)";
			}
			cell.appendChild(div);
		}

	table.rows[0].cells[0].colSpan += 2;

	}
	for(var i = 0; i < new_sectors.length; i++) {
		color_sector(new_sectors[i], true);
	}
}


function pathfind(endsector) {
	var radius = GM_getValue("radius", 1);
	var startsector = find_current_sector();
	var sectorgraph = new Array();
	var middle_line_start = parseInt((startsector - 1) / 33) * 33 + 1;
	var queue = new Array();
	var endx
	var endy;
	var debug_sectors = new Array();

	for(var i = 0; i < 3 + (radius *
	 2); i++) {
		var this_line_start = middle_line_start - (33*(radius+1)) + (33*i);
		sectorgraph[i] = new Array();
		for(var j = 0; j < 3 + (radius * 2); j++) {
			var this_sector = startsector - (34*(radius+1)) + (33*i) + j;
			var s;

			sectorgraph[i][j] = new Object();
			s = sectorgraph[i][j];
//			if(this_sector > 0 && this_sector <= 1089 && this_sector >= this_line_start && this_sector < (this_line_start + 33) && this_sector != 502) {
			if(this_sector > 0 && this_sector <= 1089 && this_sector >= this_line_start && this_sector < (this_line_start + 33)) {
				if(this_sector == endsector) {
					endx = i;
					endy = j;
				}
				s.sector = this_sector;
				if(this_sector == startsector) {
					s.dist = 0;
				} else {
					s.dist = 999999;
				}

				if(!sectordata[this_sector].color || (sectordata[this_sector].color == society_color) || (sectordata[this_sector].color.indexOf("url") == 0) || (this_sector == startsector) || (this_sector == endsector)) {
					if(sectordata[this_sector].unexplored) {
						if(GM_getValue("pathfind_unexplored", false)) {
							s.cost = 99;
						} else {
							s.cost = 101;
						}
					} else {
						s.cost = 100;
					}
					queue.push(new Array(i, j));
					debug_sectors.push(this_sector);
					s.inqueue = true;
				}
			}
		}
	}


//	sectorgraph[parseInt(sectorgraph.length / 2)][parseInt(sectorgraph.length/2)].dist = 0;
	while(queue.length > 0) {
		var qsub = pathfind_min_dist(queue, sectorgraph, endx, endy);
		var qx = queue[qsub][0];
		var qy = queue[qsub][1];
		var u = sectorgraph[qx][qy];
		var this_sector = startsector - (34*(radius+1)) + (33*qx) + qy;
		var rneighbor = 0;
		var lneighbor = 0;
		var uneighbor = 0;
		var dneighbor = 0;
		var ulneighbor = 0;
		var urneighbor = 0;
		var dlneighbor = 0;
		var drneighbor = 0;
		var neighbors = new Array();
		var adts = all_directions(this_sector);
		queue.splice(qsub, 1)
		u.inqueue = false;

		if(u.sector == endsector) {
			break;
		}

		if(this_sector % 33 > 0) {
			rneighbor = this_sector + 1;
			if((this_sector > 33) && sectordata[this_sector-32]) {
				urneighbor = this_sector - 32;
			}
			if((this_sector < 1057) && sectordata[this_sector+34]) {
				drneighbor = this_sector + 34;
			}
		}
		if(this_sector % 33 != 1) {
			if(sectordata[this_sector-1]) {
				lneighbor = this_sector - 1;
			}
			if((this_sector > 33) && sectordata[this_sector-34]) {
				ulneighbor = this_sector - 34;
			}
			if((this_sector < 1057) && sectordata[this_sector+32]) {
				dlneighbor = this_sector + 32;
			}
		}
		if(this_sector > 33) {
			if(sectordata[this_sector-33]) {
				uneighbor = this_sector - 33;
			}
		}
		if(this_sector < 1057) {
			if(sectordata[this_sector+33]) {
				dneighbor = this_sector + 33;
			}
		}

		if(sectordata[this_sector]) {
			if(sectordata[this_sector].linkright || (rneighbor && sectordata[rneighbor].linkleft)) {
				if(sectorgraph[qx][qy+1] && sectorgraph[qx][qy+1].inqueue) {
					neighbors.push(new Array(qx, qy+1));
				}
			}
			if(sectordata[this_sector].linkleft || (lneighbor && sectordata[lneighbor].linkright)) {
				if(sectorgraph[qx][qy-1] && sectorgraph[qx][qy-1].inqueue) {
					neighbors.push(new Array(qx, qy-1));
				}
			}
			if(sectordata[this_sector].linkup || (uneighbor && sectordata[uneighbor].linkdown)) {
				if(sectorgraph[qx-1] && sectorgraph[qx-1][qy].inqueue) {
					neighbors.push(new Array(qx-1, qy));
				}
			}
			if(sectordata[this_sector].linkdown || (dneighbor && sectordata[dneighbor].linkup)) {
				if(sectorgraph[qx+1] && sectorgraph[qx+1][qy].inqueue) {
					neighbors.push(new Array(qx+1, qy));
				}
			}
			if(sectordata[this_sector].linkupright) {
//			   || (urneighbor && sectordata[urneighbor].linkdownleft)
//			   || (sectordata[this_sector].linkup && sectordata[this_sector].linkright && urneighbor && sectordata[urneighbor].linkdown && sectordata[urneighbor].linkleft)
//			   || adts
//			   || (urneighbor && all_directions(urneighbor))) {
				if(sectorgraph[qx-1] && sectorgraph[qx-1][qy+1] && sectorgraph[qx-1][qy+1].inqueue) {
					neighbors.push(new Array(qx-1, qy+1));
				}
			}
			if(sectordata[this_sector].linkupleft) {
//			   || (ulneighbor && sectordata[ulneighbor].linkdownright)
//			   || (sectordata[this_sector].linkup && sectordata[this_sector].linkleft && ulneighbor && sectordata[ulneighbor].linkdown && sectordata[ulneighbor].linkright)
//			   || adts
//			   || (ulneighbor && all_directions(ulneighbor))) {
				if(sectorgraph[qx-1] && sectorgraph[qx-1][qy-1] && sectorgraph[qx-1][qy-1].inqueue) {
					neighbors.push(new Array(qx-1, qy-1));
				}
			}
			if(sectordata[this_sector].linkdownright) {
//			   || (drneighbor && sectordata[drneighbor].linkupleft)
//			   || (sectordata[this_sector].linkdown && sectordata[this_sector].linkright && drneighbor && sectordata[drneighbor].linkup && sectordata[drneighbor].linkleft)
//			   || adts
//			   || (drneighbor && all_directions(drneighbor))) {
				if(sectorgraph[qx+1] && sectorgraph[qx+1][qy+1] && sectorgraph[qx+1][qy+1].inqueue) {
					neighbors.push(new Array(qx+1, qy+1));
				}
			}
			if(sectordata[this_sector].linkdownleft) {
//			   || (dlneighbor && sectordata[dlneighbor].linkupright)
//			   || (sectordata[this_sector].linkdown && sectordata[this_sector].linkleft && dlneighbor && sectordata[dlneighbor].linkup && sectordata[dlneighbor].linkright)
//			   || adts
//			   || (dlneighbor && all_directions(dlneighbor))) {
				if(sectorgraph[qx+1] && sectorgraph[qx+1][qy-1] && sectorgraph[qx+1][qy-1].inqueue) {
					neighbors.push(new Array(qx+1, qy-1));
				}
			}
		}

/*
		for(var i = qx - 1; i <= qx + 1; i++) {
			for(var j = qy - 1; j <= qy + 1; j++) {
				if(i >= 0 && i < sectorgraph.length && j >= 0 && j < sectorgraph.length) {
					if(sectorgraph[i][j].inqueue) {
						if(u.sector == 501) {
							if(sectorgraph[i][j].sector == 500) {
								neighbors.push(new Array(i, j));
							}
						} else {
							neighbors.push(new Array(i, j));
						}
					}
				}
			}
		}
*/
		
		for(var i = 0; i < neighbors.length; i++) {
			var nx = neighbors[i][0];
			var ny = neighbors[i][1];
			var alt = u.dist + sectorgraph[nx][ny].cost;
			if(alt < sectorgraph[nx][ny].dist) {
				sectorgraph[nx][ny].dist = alt;
				sectorgraph[nx][ny].previous = u;
			}
		}
	}

	if(sectorgraph[endx][endy].previous) {
		var sectors = new Array();
		var s = sectorgraph[endx][endy];
		while(s.previous) {
			sectors.push(s.sector);
			s = s.previous;
		}
		if(s.sector == startsector) {
			GM_setValue("movefrom", startsector);
			GM_setValue("movepath", sectors.reverse().toSource());
			document.location.href = "http://www.secretsocietywars.com/index.php?p=space&a=move&destination="+sectors[0]+"&confirm=1&origin="+startsector;
//			alert("movefrom: " + startsector + "\nsectors.reverse: " + sectors.reverse().join(", "));
		}
	} else {
		alert("unable to find a path to there");
	}
}

function pathfind_min_dist(queue, graph, targetx, targety) {
	var min_dist = 1000000000;
	var min_sub;
	var min_abs = 1000000000;
	for(var i = 0; i < queue.length; i++) {
		var subs = queue[i];
		var this_abs;
		var this_dist = graph[subs[0]][subs[1]].dist;

		if(this_dist < min_dist) {
			min_dist = this_dist;
			min_abs = Math.abs(subs[0] - targetx) + Math.abs(subs[1] - targety);
			min_sub = i;
		} else if(this_dist == min_dist) {
			if((Math.abs(subs[0] - targetx) + Math.abs(subs[1] - targety)) < min_abs) {
				min_abs = Math.abs(subs[0] - targetx) + Math.abs(subs[1] - targety);
				min_sub = i;
			}
		}
	}
	return min_sub;
}

function all_directions(sector) {
	if(sectordata[sector].linkup && sectordata[sector].linkdown && sectordata[sector].linkright && sectordata[sector].linkleft) {
		return true;
	}
	return false;
}

function new_navlink(new_sector, origin) {
	var newlink = document.createElement('a');
	newlink.style.color = "rgb(255, 255, 255)";
	newlink.style.cursor = "pointer";
	newlink.style.fontSize = "12px";
	newlink.innerHTML = new_sector + '<br><span style="font-size: 10px">?</span>';
	newlink.href = "/index.php?p=space&a=move&destination="+new_sector+"&origin="+origin;
	newlink.addEventListener('click', multi_travel, false);
	return newlink;
}

function multi_travel(ev) {
	var re;
	
	ev.preventDefault();
	if(re = /destination=(\d+)/.exec(this.href)) {
		pathfind(parseInt(re[1]));
	}
}

function newdiv(w, h) {
	var div = document.createElement('div');
	div.style.width = w + "px";
	div.style.height = h + "px";
	return div;
}

function get_society() {
	var pattrname = document.evaluate('//td[@class="pattrName"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var society;
	if(pattrname) {
		var re;

		if(re = /color[^>]*>([^<]+)/.exec(pattrname.innerHTML)) {
			society = re[1];
		}
	}
	return society;
}

function get_level() {
	var pattrname = document.evaluate('//td[@class="pattrName"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var level = 0;
	
	if(pattrname) {
		var re;
		
		if(re = /Degree: (\d+)/.exec(pattrname.innerHTML)) {
			level = parseInt(re[1]);
		}
	}
	return level;
}

function data_expired() {
	var current_date, current_minutes;
	var data_date, data_minutes;
	var re;

	if(re = /<B>UTC:<\/B>\s*(\d+):(\d+)\s*(\w+\s*\d+,\s*\d+)/.exec(document.body.innerHTML)) {
		current_minutes = (parseInt(re[1]) * 60) + parseInt(re[2]);
		current_date = re[3];
	}
	data_minutes = GM_getValue("minutes", current_minutes);
	data_date = GM_getValue("date", current_date);
	
	if((current_minutes >= 5) && ((current_date != data_date) || (data_minutes < 5))) {
		return true;
	}
	return false;
}

function find_sector_num(obj) {
	var sectorlinks = obj.getElementsByTagName('a');
	var sectornum = 0;

	for(var i = 0; i < sectorlinks.length; i++) {
		var re;
		if(re = /destination=(\d+)/.exec(sectorlinks[i].href)) {
			sectornum = parseInt(re[1]);
			break;
		}
	}
	return sectornum;
}

function find_current_sector() {
	var viewlinks = document.evaluate('//a[contains(@href, "index.php?p=space&a=view_sector")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var sectornum = 0;

	for(var i = 0; i < viewlinks.snapshotLength; i++) {
		var re;
		if(re = /SECTOR\s+(\d+)/i.exec(viewlinks.snapshotItem(i).innerHTML)) {
			sectornum = parseInt(re[1]);
			break;
		}
	}
	return sectornum;
}

function find_parent(node, nodetype) {
	while(node && (node.nodeName != nodetype)) {
		node = node.parentNode;
	}
	return node;
}

function chromeinit() {
	if ((typeof GM_getValue == 'undefined') || (GM_getValue('a', 'b') == undefined)) {
		GM_addStyle = function(css) {
			var style = document.createElement('style');
			style.textContent = css;
			document.getElementsByTagName('head')[0].appendChild(style);
		}

		GM_deleteValue = function(name) {
			localStorage.removeItem(name);
		}

		GM_getValue = function(name, defaultValue) {
			var value = localStorage.getItem(name);
			if (!value)
				return defaultValue;
			var type = value[0];
			value = value.substring(1);
			switch (type) {
				case 'b':
					return value == 'true';
				case 'n':
					return Number(value);
				default:
					return value;
			}
		}

		GM_log = function(message) {
			console.log(message);
		}

		 GM_registerMenuCommand = function(name, funk) {
		//todo
		}

		GM_setValue = function(name, value) {
			value = (typeof value)[0] + value;
			localStorage.setItem(name, value);
		}
	}
}
