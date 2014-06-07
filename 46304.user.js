// ==UserScript==
// @name           SSW Spader
// @namespace      http://homeworlds.secretsocietywars.com/nardo
// @description    Spades item drops.
// @include        http://www.secretsocietywars.com/index.php?p=monsters*
// @include        http://www.secretsocietywars.com/index.php?p=quests&a=quest*
// @include        http://www.secretsocietywars.com/index.php?p=syndicates&a=forum*
// @include        http://www.secretsocietywars.com/index.php?p=planets*
// ==/UserScript==

var locopt = document.evaluate('//select[@name="jumpmenu"]/option[@value="'+document.location.href+'"]', document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
var loc = GM_getValue("location", "");
var data;
var statnames = {"CONSTITUTION": "cons", "COMBAT": "exp", "CREATIVITY": "crea", "LUCK": "luck", "SEXINESS": "sexy", "CONFIDENCE": "conf"};
var youares = ['DRUNK', 'FULL', 'HORNY'];
var associations = new Object();
var ua_good = GM_getValue("ua_good", 0);
var ua_order = GM_getValue("ua_order", 0);


if(document.location.href.indexOf("p=planets")) {
	add_alignments();
}

if(document.location.href.indexOf("p=syndicates&a=forum") > -1) {
	check_syndicate_posts();
}

if(locopt) {
	loc = locopt.text;
	GM_setValue("location", loc);
}

if(document.evaluate('//fieldset[@class="results"]//text()[.="You win the fight!"]', document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue) {
//	var items = document.evaluate('//fieldset[@class="results"]//text()[starts-with(., "Giving ")]', document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
//	var items = document.evaluate('//fieldset[@class="results"]//text()[starts-with(., "Giving ")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var items = document.evaluate('//fieldset[@class="results"]//h3[text()="Goodies!"]/ancestor::tr[1]/following-sibling::tr//text()[starts-with(., "Giving ")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var item;
	var monstername = get_monstername();
	var monsterimg = document.evaluate('//fieldset[@class="results"]//img', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var t;
	var stats = get_stats();
	var fieldset = new SSWFieldset();
	var cell;
	var cellhtml = "";
	var didstat = false;
	var linktable = document.createElement('table');
	var itemcells = new Array();

	data = eval(GM_getValue("data", "({})"));
	initialize(data, loc, monstername);
	t = data[loc][monstername].turns++;
	for(var stat in stats) {
		data[loc][monstername][stat] = (data[loc][monstername][stat] * t + stats[stat])/(t + 1.0);
	}
	if(get_doppelpet_health() > 0) {
		var dt = data[loc][monstername].dopturns;
		data[loc][monstername].dopexp = (data[loc][monstername].dopexp * dt + get_doppelpet_exp())/(dt + 1.0);
		data[loc][monstername].dopturns++;
	}
	if(document.evaluate('//fieldset[@class="results"]//text()[.="You gain 1 hit point!"]', document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue) {
		data[loc][monstername].hpgains.push([stats.drunk, stats.full, stats.horny]);
	}
	data[loc][monstername].img = image_name(monsterimg);
	for(var i = 0; i < items.snapshotLength; i++) {
		var itemname;
		var quantity;
		var re;
		item = items.snapshotItem(i);
		if(re = /Giving\s+([\d,]+)\s+(.*)\./.exec(item.data)) {
			var img = document.evaluate('./ancestor::td[1]/preceding-sibling::td[1]/img', item, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
			var key;
			quantity = parseInt(re[1].replace(/,/g, ""), 10);
			itemname = re[2];
			if(quantity > 1) {
				key = quantity + " " + itemname;
			} else {
				key = itemname;
			}
			if(img && itemname != "Imperial Starbux") {
				var imgname = image_name(img);
				var t;
				initialize(data, loc, monstername, key);
				data[loc][monstername][key].found++;
				data[loc][monstername][key].img = imgname;
				data[loc][monstername][key].name = itemname;
				itemcells.push([item.parentNode, key]);
			}
		}
	}
	GM_setValue("data", data.toSource());
	for(var i = 0; i < itemcells.length; i++) {
		itemcells[i][0].appendChild(document.createElement('br'));
		itemcells[i][0].appendChild(document.createTextNode((data[loc][monstername][itemcells[i][1]].found/data[loc][monstername].turns * 100).toFixed(2)+"%"));
	}
	cellhtml = "Defeated "+monstername+" "+(t+1)+" times<br>";
	cellhtml += "Averages ";
	for(var statname in statnames) {
		if(didstat) {
			cellhtml += ", ";
		}
		didstat = true;
		cellhtml += statname.toLowerCase() + ": " + data[loc][monstername][statnames[statname]].toFixed(0);
	}
	for(var i = 0; i < youares.length; i++) {
		cellhtml += ", "+youares[ i ].toLowerCase()+": " + data[loc][monstername][youares[i].toLowerCase()].toFixed(0)+"%";
	}
	cellhtml += "<br>";
	items = sort_items(data[loc][monstername]);
	for(var i = 0; i < items.length; i++) {
		cellhtml += "Found " + data[loc][monstername][items[ i ]].found + " " + items[ i ] + "<br>";
	}
	cell = fieldset.newcell();
	cell.innerHTML = cellhtml;
	linktable.width = "100%";
	linktable.cellPadding = 0;
	linktable.cellSpacing = 0;
	linktable.insertRow(0);
	linktable.rows[0].insertCell(0);
	linktable.rows[0].insertCell(1);
	linktable.rows[0].cells[1].align = "right";
	linktable.rows[0].cells[0].appendChild(expand_link());
	linktable.rows[0].cells[1].appendChild(reset_link());
	cell.appendChild(linktable);
}

function get_doppelpet_health() {
	var h = document.evaluate('//text()[contains(., "Mini-")]/following-sibling::a[1][contains(@href, "p=records&a=view_player&id=")]/ancestor::tr[1]/following-sibling::tr[1]//span[contains(@title, "health")]/text()', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if(h) {
		var re;
		if(re = /(\d+)\/\d+/.exec(h.data)) {
			return parseInt(re[1].replace(/,/g, ""));
		}
	}
	return 0;
}

function get_doppelpet_exp() {
	var exp = document.evaluate('//text()[contains(., "Mini-")]/following-sibling::a[1][contains(@href, "p=records&a=view_player&id=")]/ancestor::tr[1]/following-sibling::tr[1]//span[contains(@title, "experience points")]/text()', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if(exp) {
		return parseInt(exp.data.replace(/,/g, ""), 10);
	}
	return 0;
}

function expand_link() {
	var a = document.createElement('a');
	a.href = document.location.href;
	a.innerHTML = "Full Spading Information";
	a.addEventListener('click', show_all_information, false);
	return a;
}

function reset_link() {
	var a = document.createElement('a');
	a.href = document.location.href;
	a.innerHTML = "Reset All Stats";
	a.addEventListener('click', confirm_reset, false);
	return a;
}

function confirm_reset(ev) {
	ev.preventDefault();
	if(confirm("Reset all spading information?")) {
		reset_stats();
		ev.target.parentNode.removeChild(ev.target);
	}
}

function reset_stats() {
	data = new Object();
	GM_setValue("data", data.toSource());
}

function show_all_information(ev) {
	var fieldset = new SSWFieldset();
	var locations = new Array();
	var simple_html = new Array();
	var simple;
	ev.preventDefault();
	ev.target.parentNode.removeChild(ev.target);
	for(var location in data) {
		locations.push(location);
	}
	locations = locations.sort();
	for(var i = 0; i < locations.length; i++) {
		var cell = fieldset.newcell();
		var monsters = new Array();
		var table = document.createElement('table');
		for(var monster in data[locations[ i ]]) {
			monsters.push(monster);
		}
		monsters = monsters.sort();
		cell.innerHTML = "<h3>"+locations[ i ]+"</h3><br>";
		simple = "Location: "+locations[ i ] + "<br>";
		for(var j = 0; j < monsters.length; j++) {
			var row = table.insertRow(table.rows.length);
			var img = document.createElement('img');
			var monster = data[locations[ i ]][monsters[j]];
			var cellhtml = "";
			var monstername = document.createElement('h3');
			var didstat = false;
			var items;
			var itemsdone = 0;
			if(data[locations[ i ]][monsters[j]].img) {
				img.src = monster.img;
			}
			row.insertCell(0);
			row.cells[0].appendChild(img);
			monstername.innerHTML = monsters[j];
			row.cells[0].appendChild(monstername);
			row.cells[0].align = "center";
			row.insertCell(1);
			row.cells[1].width = "100%";
			cellhtml = "Defeated " + monsters[j] + " " + monster.turns + " times<br>";
			simple += "Monster: " + monsters[j] + "<br>";
			simple += "Turns: " + monster.turns + "<br>";
//			cellhtml += "Average stats ";
			for(var statname in statnames) {
				if(didstat) {
					cellhtml += ", ";
				}
				didstat = true;
				cellhtml += statname.toLowerCase() + ": " + monster[statnames[statname]].toFixed(0);
				simple += statname.toLowerCase() + ": " + monster[statnames[statname]].toFixed(0) + "<br>";
			}
			for(var y = 0; y < youares.length; y++) {
				cellhtml += ", "+youares[y].toLowerCase()+": " + monster[youares[y].toLowerCase()].toFixed(0)+"%";
				simple += youares[y].toLowerCase()+": " + monster[youares[y].toLowerCase()].toFixed(0)+"%<br>";
			}
			if(typeof(monster.dopexp) != "undefined") {
				simple += "doppelpet turns: " + monster.dopturns + "<br>";
				simple += "doppelpet exp: " + monster.dopexp.toFixed(0) + "<br>";
			}
			cellhtml += "<br>";
			if(monster.hpgains && monster.hpgains.length > 0) {
				var hpgroups = group_hp_gains(monster.hpgains);
				cellhtml += "HP Gains: " + monster.hpgains.length + " (#,D,F,H) ";
				simple += "HP Gains: " + monster.hpgains.length + " (#,D,F,H) ";
				for(var hpg = 0; hpg < hpgroups.length; hpg++) {
					cellhtml += "("+hpgroups[hpg][3]+","+hpgroups[hpg][0]+","+hpgroups[hpg][1]+","+hpgroups[hpg][2]+") ";
					simple += "("+hpgroups[hpg][3]+","+hpgroups[hpg][0]+","+hpgroups[hpg][1]+","+hpgroups[hpg][2]+") ";
				}
				cellhtml += "<br>";
				simple += "<br>";
			}

			items = sort_items(monster);
			cellhtml += "<table>";
			for(var k = 0; k < items.length; k++) {
				if((itemsdone % 3) == 0) {
					cellhtml += "<tr>";
				}
				cellhtml += '<td><img src="'+monster[items[k]].img+'"></td><td>'+items[k]+"<br>Found "+monster[items[k]].found+" ("+(monster[items[k]].found/monster.turns * 100).toFixed(2)+"%)</td>";
				simple += items[k] + ": " + monster[items[k]].found + " ("+(monster[items[k]].found/monster.turns * 100).toFixed(2)+"%)<br>";
				itemsdone++;
				if((itemsdone % 3) == 0) {
					cellhtml += "</tr>";
				}
			}
			simple += "<br>";
			cellhtml += "</table>";
			row.cells[1].innerHTML = cellhtml;
		}
		simple_html.push(simple);
		cell.appendChild(table);
	}
	for(var i = 0; i < simple_html.length; i++) {
		cell = fieldset.newcell();
		cell.innerHTML = simple_html[i];
	}
}



function sort_items(h) {
	var names = new Object();
	var i = new Array();
	for(var item in h) {
		if(typeof(h[item]) == "object") {
			if(item != "hpgains") {
				names[item] = h[item].name;
				i.push(item);
			}
		}
	}
	return i.sort(function(a, b) {return hcmp(a, b, names);});
}

function hcmp(a, b, h) {
	if(h[a] == h[ b ]) {
		return parseInt("0"+a, 10) - parseInt("0"+b, 10);
	} else if(h[a] > h[ b ]) {
		return 1;
	} else {
		return -1;
	}
}

function group_hp_gains(hpgains) {
	var count = new Array();
	var groups = new Array();
	for(var i = 0; i < hpgains.length; i++) {
		var [d,f,h] = hpgains[i];
		if(typeof(count[d]) == "undefined") {
			count[d] = new Array();
		}
		if(typeof(count[d][f]) == "undefined") {
			count[d][f] = new Array();
		}
		if(typeof(count[d][f][h]) == "undefined") {
			count[d][f][h] = 0;
		}
		count[d][f][h]++;
	}
	for(var d = 0; d < count.length; d++) {
		if(count[d]) {
			for(var f = 0; f < count[d].length; f++) {
				if(count[d][f]) {
					for(var h = 0; h < count[d][f].length; h++) {
						if(count[d][f][h]) {
							groups.push([d,f,h,count[d][f][h]]);
						}
					}
				}
			}
		}
	}
	return groups.sort(function(a, b) {return b[3] - a[3];});
}

function initialize(d, location, monstername, item) {
	if(typeof(d[location]) == "undefined") {
		d[location] = new Object();
	}
	if(typeof(d[location][monstername]) == "undefined") {
		d[location][monstername] = new Object();
		d[location][monstername].turns = 0;
		d[location][monstername].cons = 0.0;
		d[location][monstername].exp = 0.0;
		d[location][monstername].crea = 0.0;
		d[location][monstername].luck = 0.0;
		d[location][monstername].sexy = 0.0;
		d[location][monstername].conf = 0.0;
		d[location][monstername].drunk = 0;
		d[location][monstername].full = 0;
		d[location][monstername].horny = 0;
	}
/*
	if(typeof(d[location][monstername].drunk) == "undefined") {
		d[location][monstername].drunk = 0;
		d[location][monstername].full = 0;
		d[location][monstername].horny = 0;
	}
*/
	if(typeof(d[location][monstername].dopturns) == "undefined") {
		d[location][monstername].dopturns = 0;
		d[location][monstername].dopexp = 0;
	}
	if(typeof(d[location][monstername].hpgains) == "undefined") {
		d[location][monstername].hpgains = new Array();
	}
	if(item && typeof(d[location][monstername][item]) == "undefined") {
		d[location][monstername][item] = new Object();
		d[location][monstername][item].found = 0;
	}
}

function get_stats() {
	var s = new Object();
	for(var stat in statnames) {
		var val = document.evaluate('//td[contains(@class, "pattr") and contains(text(), "'+stat+'")]/following-sibling::td[1]/text()', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		if(val) {
			s[statnames[stat]] = parseInt(val.data.replace(/,/g, ""), 10);
		}
	}
	for(var i = 0; i < youares.length; i++) {
		var img;
		s[youares[ i ].toLowerCase()] = 0;
		if(img = document.evaluate('//img[contains(@alt, "'+youares[ i ]+'!")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue) {
			var re;
			if(re = /(\d+)%/.exec(img.alt)) {
				s[youares[ i ].toLowerCase()] = parseInt(re[1], 10);
			}
		}
	}
				
	return s;
}

function get_monstername() {
	var name = "";
	var t = document.evaluate('//fieldset[@class="results"]//text()[contains(., "You face the ")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if(t) {
		var re;
		if(re = /You face the ([^,]+)/.exec(t.data)) {
			name = re[1];
		}
	}
	return name;
}
	

function image_name(img) {
	return img.src.replace(/^.*?\.com/, "");
}

function check_syndicate_posts() {
	var post_cells = document.evaluate('//img[@alt="Quote and reply to this post"]/ancestor::table[1]/ancestor::tr[1]/preceding-sibling::tr[1]/td[1]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for(var i = 0; i < post_cells.snapshotLength; i++) {
		var lines = document.evaluate('./text()', post_cells.snapshotItem(i), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var location = "";
		var monster = "";
		var notes = "";
		var monsternotes = "";
		
		for(var j = 0; j < lines.snapshotLength; j++) {
			var t = lines.snapshotItem(j).data;
			var re;
			if(re = /^\s*Location: (.*)$/.exec(t)) {
				location = re[1];
			} else if(re = /^\s*Monster: (.*)$/.exec(t)) {
				var a = document.createElement('a');
				var clicknum = 0;
				a.href = document.location.href;
				monster = re[1];
				lines.snapshotItem(j).parentNode.insertBefore(a, lines.snapshotItem(j));
				a.appendChild(lines.snapshotItem(j));
				if(typeof(associations[location]) != "undefined" && typeof(associations[location][monster]) != "undefined") {
					clicknum = associations[location][monster].length;
				}
				a.addEventListener('click', make_association_callback(location, monster, clicknum), false);
			} else if(location == "") {
				notes += t + "<br>";
			} else if((monster != "") && (t.match(/^\s*$/) || j == lines.snapshotLength-1)) {
				var mobj = new Object();
				if(j == lines.snapshotLength-1) {
					monsternotes += t + "<br>";
				}
				mobj.player = get_post_username(post_cells.snapshotItem(i));
				mobj.notes = notes;
				mobj.monsterdata = monsternotes;
				mobj.insertpoint = lines.snapshotItem(j);
				if(typeof(associations[location]) == "undefined") {
					associations[location] = new Object();
				}
				if(typeof(associations[location][monster]) == "undefined") {
					associations[location][monster] = new Array();
				}
				if(mobj.monsterdata.indexOf("luck:") > -1) {
					associations[location][monster].push(mobj);
				}
				monster = "";
				monsternotes = "";
			} else {
				monsternotes += t + "<br>";
			}
		}
	}
}

/*
function show_association(location, monster, clicknum) {
	var table = document.createElement('table');
	var div = document.createElement('div');
	var a = document.createElement('a');
	var aname = location.replace(/\s+/g, "") + monster.replace(/\s+/g, "") + clicknum;
	a.name = aname;
	div.appendChild(a);
	div.appendChild(table);
	table.border = 1;
	table.insertRow(0); //number of associations
	table.insertRow(1); //player
	table.insertRow(2); //monsterdata
	table.insertRow(3); //notes
	if(typeof(associations[location][monster]) != "undefined") {
		var insertpoint = associations[location][monster][clicknum].insertpoint;
		div.style.width = associations[location][monster].length * 270;
		table.rows[0].insertCell(0);
		table.rows[0].cells[0].colSpan = associations[location][monster].length;
		table.rows[0].cells[0].innerHTML = "Comparing " + associations[location][monster].length + " " + location + " > " + monster;
		for(var i = 0; i < associations[location][monster].length; i++) {
			var cell;
			cell = table.rows[1].insertCell(table.rows[1].cells.length);
			cell.width = parseInt(100/associations[location][monster].length, 10)+"%";
			cell.innerHTML = associations[location][monster][i].player;
			cell = table.rows[2].insertCell(table.rows[2].cells.length);
			cell.innerHTML = associations[location][monster][i].monsterdata;
			cell = table.rows[3].insertCell(table.rows[3].cells.length);
			cell.innerHTML = associations[location][monster][i].notes;
		}
		insertpoint.parentNode.insertBefore(div, insertpoint);
		document.location.href = "#"+aname;
	}
}
*/

function show_association(location, monster, clicknum) {
	var table = document.createElement('table');
	var div = document.createElement('div');
	var a = document.createElement('a');
	var aname = location.replace(/\s+/g, "") + monster.replace(/\s+/g, "") + clicknum;
	var bordercolor = "#BAFF55";
	a.name = aname;
	div.appendChild(a);
	div.appendChild(table);
	table.border = 1;
	table.cellSpacing = 0;
	table.cellPadding = 3;
	table.border = 0;
	table.insertRow(0); //number of associations
	table.insertRow(1); //player
	table.insertRow(2); //turns
//	table.insertRow(2); //monsterdata
//	table.insertRow(3); //notes
	if(typeof(associations[location][monster]) != "undefined") {
		var all_stats = ["luck", "drunk", "full", "doppelpet turns", "doppelpet exp", "constitution", "combat", "creativity", "sexiness", "confidence", "horny"];
		var all_items = get_all_association_items(associations[location][monster]);
		var insertpoint = associations[location][monster][clicknum].insertpoint;
		div.style.width = associations[location][monster].length * 310;
		table.rows[0].insertCell(0);
		table.rows[0].cells[0].bgColor = "#ADDEFF";
		table.rows[0].cells[0].colSpan = associations[location][monster].length * 2;
		table.rows[0].cells[0].innerHTML = "Comparing " + associations[location][monster].length + " " + location + " > " + monster;
		for(var i = 0; i < Math.max(all_stats.length, all_items.length); i++) {
			table.appendChild(document.createElement('tr'));
		}
		table.appendChild(document.createElement('tr'));
		for(var i = 0; i < associations[location][monster].length; i++) {
			var cell = document.createElement('td');
			var data = parse_association_monsterdata(associations[location][monster][i].monsterdata);
			cell.colSpan = 2;
			cell.align = "center";
			cell.bgColor = ["#FFAAAA", "#E39595"][i%2];
			cell.width = parseInt(100/associations[location][monster].length, 10)+"%";
			cell.appendChild(document.createTextNode(associations[location][monster][i].player));
			table.rows[1].appendChild(cell);

			cell = document.createElement('td');
			cell.colSpan = 2;
			cell.align = "center";
			cell.bgColor = ["#FFAAAA", "#E39595"][i%2];
			if(data["Turns"]) {
				cell.appendChild(document.createTextNode("Turns: " + data["Turns"]));
			}
			table.rows[2].appendChild(cell);

			for(var statnum = 0; statnum < Math.max(all_stats.length, all_items.length); statnum++) {
				cell = document.createElement('td');
				cell.bgColor = "white";
				cell.style.borderTop = bordercolor+" thin solid";
				if(i == 0) {
					cell.style.borderLeft = bordercolor+" thin solid";
				}
				if(statnum == Math.max(all_stats.length, all_items.length)-1) {
					cell.style.borderBottom = bordercolor+" thin solid";
				}
				if(data[all_stats[statnum]]) {
					cell.bgColor = ["#FFFFAE", "#FFFF88"][statnum%1];
					cell.appendChild(document.createTextNode(all_stats[statnum] + ": " + data[all_stats[statnum]]));
				} else {
					cell.innerHTML = "&nbsp;";
				}
				table.rows[3+statnum].appendChild(cell);

				cell = document.createElement('td');
				if(statnum <= all_items.length) {
					cell.style.borderTop = bordercolor+" thin solid";
				}
				if(i == associations[location][monster].length-1) {
					cell.style.borderRight = bordercolor+" thin solid";
				}
				if(statnum == Math.max(all_stats.length, all_items.length)-1) {
					cell.style.borderBottom = bordercolor+" thin solid";
				}
				if(data[all_items[statnum]]) {
					cell.bgColor = ["#CAFFAE", "#CAFF88"][statnum%1];
					cell.appendChild(document.createTextNode(all_items[statnum] + ": " + data[all_items[statnum]]));
				} else {
					cell.innerHTML = "&nbsp;";
					if(statnum < all_items.length) {
						cell.bgColor = "white";
					}
				}
				table.rows[3+statnum].appendChild(cell);
			}
			cell = document.createElement('td');
			cell.colSpan = 2;
			if(associations[location][monster][i].notes) {
				cell.bgColor = ["#FCDBFF", "#FAC9FF"][i%2];
				cell.innerHTML = associations[location][monster][i].notes;
			}
			table.rows[3+Math.max(all_stats.length, all_items.length)].appendChild(cell);
		}
		insertpoint.parentNode.insertBefore(div, insertpoint);
		document.location.href = "#"+aname;
	}
}

function parse_association_monsterdata(monsterdata) {
	var data = new Object();
	var lines = monsterdata.split("\n");
	var re;
	for(var i = 0; i < lines.length; i++) {
//		if(re = /(.*):[^\d]+(\d+).+\(([\d\.%]+)\)/.exec(lines[i])) {
		if(re = /(.*):[^\d]+([^<]+)/.exec(lines[i])) {
			data[re[1]] = re[2];
		}
	}
	return data;
}

function get_all_association_items(ar) {
	var found = new Object();
//	var items = new Array();
	var re;
	for(var i = 0; i < ar.length; i++) {
		while(re = /(.*):[^\d]+(\d+).+\(([\d\.%]+)\)/g.exec(ar[i].monsterdata)) {
			if(!found[re[1]]) {
//				items.push(re[1]);
				found[re[1]] = new Object();
				found[re[1]].name = re[1];
			}
		}
	}
	return sort_items(found);
//	return items.sort(function(a, b) {return hcmp(a, b, names);});
}

function make_association_callback(location, monster, clicknum) {
	return function(ev) {ev.preventDefault(); show_association(location, monster, clicknum);};
}

function get_post_username(cell) {
	var name = document.evaluate('./ancestor::table[1]/ancestor::tr[1]/td/a/text()', cell, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if(name) {
		return name.data;
	}
	return "";
}

function add_alignments() {
	var areas = document.evaluate('//area', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var jumpmenu = document.evaluate('//select[@name="jumpmenu"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var alignments = {"ACME, Inc. HQ": [["Corporate Enforcer", 2, -6], ["Trinoc Corporate Secretary", 2, 2], ],
		"Aquaculture Lab": [["Pillhead Aquaculture Lab Researcher", -2, -2], ["Pillhead Aquaculture Lab Scientist", 2, 2], ],
		"BiChi Gang Pagoda": [["Chicken Taheen", 2, -2], ["Hoodie Lumberjack", 2, -3], ["Stormy Warrior", -5, 4], ["Swordmaster", 1, -3], ["Swordmistress", 2, -2], ],
		"Borian Caps Military HQ": [["Borian CAPS Commander", 3, -3], ["Borian CAPS Disrifleman", 2, -2], ["Borian CAPS Doublegunner", 2, -2], ["Borian CAPS Infantryman", 1, -1], ["Oddfellow Operative", 4, -3], ],
		"Borian Masks Military HQ": [["Borian MASKS Commander", -3, 3], ["Borian MASKS Disrifleman", -2, 2], ["Borian MASKS Doublegunner", -2, 2], ["Borian MASKS Infantryman", -1, 1], ],
		"Cat House": [["Chunky Fatcat", -2, -3], ["Curious Kitty", -1, -3], ["Plentiful Pussy", 2, 2], ],
		"Chi Chitown": [["Broom Lady", -2, 2], ["Hooker", -3, 1], ["Tour Guide", -2, 3], ],
		"Colonel Tsander's Beach": [["B.J.", -2, 2], ["Pamie", 2, -2], ],
		"Crash Pod": [["Bacon Salt Fairy", -1, -3], ["Bandersnatch", -2, 2], ["Eyectopus", -2, -1], ["Mantison", 3, -1], ],
		"Cybernetics Lab": [["Ceylon", -3, -2], ["Pharma Pillhead Scientist", 2, 2], ["Pharma Pillhead Technician", 2, 2], ],
		"Dank Buds Weedfarm": [["Ceylon Rastafarmer", 2, -2], ["Totally Lost Astronaut", 2, 2], ],
		"Disunification Church Wedding Chapel": [["Eastern Star Operative", -4, -4], ["Sunny", 1, 1], ],
		"Dog Pound": [["Mad Dog", -3, -2], ["Under Dawg", -2, -1], ["Watch Dog", -1, 0], ],
		"Earth Central Park": [["Annoyingly Drunk Tourist", -2, -1], ["Artificially Enhanced College Girl", -3, -2], ["El Chapulin Rosado", -3, -5], ["Lanky Ecotourist", 1, -2], ["RapMime", -2, -2], ["Sunny", 1, 1], ["Sunny Mooner", -2, -3], ["Sunny Proselyte", 1, 2], ["Unamusing Drunk Tourist", -1, -1], ],
		"Earth's Agricultural Bubble": [["Farmer Bob", -1, -1], ["Intelligent Cow", 1, -1], ["Pancake Rabbit", 1, -3], ["Sheep Shagger", -2, -2], ],
		"Emperor Jim Norton University": [["Artificially Enhanced College Girl", -1, 1], ["Bookish Nerd", 5, 3], ["Drunk Frat Alien", -3, -4], ["Guidance Counselor", 3, 4], ["Shite Classroom Janitor", -3, 3], ["Squat-Thrust Team Player", -5, 5], ],
		"Fortune Cookie Factory": [["CT Agent", -1, -1], ["Disgruntled Factory Worker", -1, -1], ["Factory Worker", 1, 1], ["Mutant Fortune Cookie", 1, -1], ],
		"Galactic INS Office": [["Neurotic Faceless Bureaucrat", 1, -1], ["Obsessive-Compulsive Faceless Bureaucrat", -1, 1], ],
		"General Tso's Beach": [["Imitation Crab", 1, -1], ],
		"Glass House": [["Big Fish", 1, -1], ["Bubbles", 2, 2], ["Loch Jaws", 2, 2], ],
		"Holy Headwear Wars Battlefront": [["Borian CAPS Commander", 3, -3], ["Borian CAPS Disrifleman", 2, -2], ["Borian CAPS Doublegunner", 2, -2], ["Borian CAPS Infantryman", 1, -1], ["Borian MASKS Commander", -3, 3], ["Borian MASKS Disrifleman", -2, 2], ["Borian MASKS Doublegunner", -2, 2], ["Borian MASKS Infantryman", -1, 1], ],
		"Mystical Movements": [["Trinoc Colonic Enforcer", -3, -3], ["Trinoc WhipSnapper", -3, 2], ["Trinoc Colonic Enforcer", -3, -3], ],
		"New Ceylon City Entrance": [["Colonial Colonel", -3, -3], ["Cordial Ceylon Greeter", -3, -2], ["Hot Green Alien Chick", 0, -5], ["Scuba Dude", 3, 2], ],
		"NyaCity Chitown": [["Crunchy Ecotourist", 1, 1], ["Dancing Axe Murderer", 4, -3], ["Fat Angry Cock", 1, -5], ["Nutty Ecotourist", 1, 1], ],
		"Penile Colony": [["Beefytough Erotislut", -2, -3], ["Erotislut Disembodied Muff Diver", -5, -1], ["Erotislut Grape Peeler", -2, -2], ["Erotislut Hobbling Cockgobbler", -4, -1], ["Erotislut Horny Demongirl", -5, -5], ["Erotislut Man Candy", -2, -3], ["Erotislut Penis-Leech", -1, -4], ["Erotislut Slim Jimmy", -3, -3], ["Erotislut Snailgirl", -2, -3], ["Erotislut Strapping Lad", -2, -3], ],
		"Pharma Agricultural Level": [["Genetically Fuqt Hamster", -3, -3], ["Pair of Weasels", -2, -2], ],
		"Pharma Research Level": [["Pillhead Female", 2, 3], ["Pillhead Male", -2, -1], ],
		"Pigpen": [["Big Pudgy Pig", 2, 2], ["Dancing Cavy", 2, 2], ["Dippity Pig", 2, 2], ],
		"Psycho Vets": [["Demented Medicine Man", -1, 2], ["Paranoid Sociopath Vet", 1, 2], ["Psychotic Assistant", -2, 2], ],
		"Rat Shack": [["Astronaut", 4, -2], ["Sneaky Shack Rat", -3, -1], ["Speedy Shack Rat", -2, -2], ],
		"Robodolphin Rodeo": [["Robodolphin", 2, 2], ["Robodolphin Rider", 2, 2], ],
		"Rubber Chicken Factory": [["Chicken Choker", -1, -1], ["Cock Gobbler", 1, -1], ["Colonel Tsander", -1, -1], ["Rubber Chicken Factory Worker", -1, -1], ],
		"SanFran Chitown": [["Mega Market Cashier", -2, 2], ["Mega Market Stock Clerk", -2, 2], ["Pong's Place Delivery Boy", 1, 1], ["Space Trucker", -3, 1], ],
		"Serenity Beach": [["Serene Sunbather", 1, 1], ],
		"Sweatshop": [["Shite Sweatshop Cleaning Lady", 4, -2], ["Shite Sweatshop Custodian", -3, 3], ["Shite Sweatshop Worker", 3, -3], ],
		"The Big Top": [["Alien Clown Kid Knife Tosser", -3, -1], ["Alien Siamese Twins", 0, -5], ["Bear Unicyclist", -3, -2], ["Beast Master", -4, 1], ["Clown", -5, 0], ["Ganeshi", -1, -4], ["Half-Naked Warrior Clown", 1, -4], ["Ring Master", -5, 0], ["Skinny Clown", 0, -5], ],
		"The Crooked Straight": [["Security Shark", -1, -1], ],
		"The Pentagon": [["Amaranthine Agent", -2, 2], ["Another Amaranthine Agent", 2, -2], ["Bacon Salt Fairy", -1, -3], ["Beefytough Erotislut", -2, -3], ["Eastern Star Operative", -4, -4], ["Erotislut Horny Demongirl", -5, -5], ["Erotislut Slim Jimmy", -3, -3], ["Erotislut Snailgirl", -2, -3], ["Hooker", -3, 1], ["Illuminati Agent", 4, 3], ["Illuminati Agent O", 4, 3], ["Oddfellow Operative", 4, -3], ],
		"The Poopery": [["Short Shite Poop Miner", -2, -1], ["Tall Shite Poop Miner", -2, -1], ],
		"The Sunflower Fields": [["Depressed Sunflower", -2, -3], ["Pissy Sunflower", -3, -2], ["Stubborn Sunflower", -3, -3], ],
		"The Sunny Sea": [["Merkitten", 1, -1], ["Mermaid", 2, -2], ["Merman", 2, -2], ["Octopussy", -2, 1], ],
		"The Sunny Sushi Chef School": [["Sunny", 1, 1], ],
		"Trader Ghuknig's HQ": [["Trinoc Corporate Enforcer", 3, 2], ["Trinoc Corporate Secretary", 3, -2], ],
		"Tranquility Beach": [["Sheep Shagger", -2, -2], ],
		"Tsander's Beach": [["B.J.", -2, 2], ["Hurblehoff", -1, -1], ["Karolyne", -2, -2], ["Pamie", 2, -2], ],
		"Tso's Beach": [["Good-Natured Lifeguard", 1, 1], ["Imitation Crab", 1, -1], ["Oblivious Sunbather", 1, 1], ["Scuba Diver", 0, 0], ],
		"Tso's Garden": [["Badger", 1, -1], ["Cete of Badgers", -3, -3], ["Chick", 1, 1], ["Fat Angry Cock", -1, -1], ["General Tso's Gardener", 1, -1], ["Harmless Little Bunny", 1, -1], ["Hen", 1, 1], ["Infected Mushroom", -1, -1], ["Snail", 1, 1], ],
		"Yee-hawdi Training Camp": [["Yeranian Yee-hawdi Insurgent", 2, 4], ["Yeranian Yee-hawdi Militant", 2, 4], ["Yeranian Yee-hawdi Revolutionary", 3, 3], ],
		"Yeranian Embassy": [["High Strung Faceless Bureaucrat", 1, -1], ["Snippy Faceless Bureaucrat", -1, 1], ],
		};

	check_ua();

	for(var i = 0; i < areas.snapshotLength; i++) {
		if(/a=(meet|quest|daily_maze|gofish)/.exec(areas.snapshotItem(i).href)) {
			var name = get_location_name(areas.snapshotItem(i).href, jumpmenu);
			if(name && unsafeWindow.overlib) {
				var text;
				if(alignments[name]) {
					text = make_alignment_text(alignments[name]);
				} else {
					text = "Sorry, no data available";
				}
				areas.snapshotItem(i).addEventListener('mouseover', make_overlib_callback(text), false);
				areas.snapshotItem(i).addEventListener('mouseout', unsafeWindow.nd, false);
				areas.snapshotItem(i).title = "";
			}
		}
	}
}

function make_alignment_text(ar) {
	var text = "";
	for(var i = 0; i < ar.length; i++) {
		text += ar[i][0]+", "+(ar[i][1]+ua_good)+"/"+(ar[i][2]+ua_order)+"<br>";
	}
	return text;
}

function check_ua() {
	var last_checked = GM_getValue("ua_checked", "");
	var day;
	var time;
	[day, time] = get_day_time();
	if((day != last_checked) && (time > 5)) {
		GM_log("loading the UA");
		GM_get("/index.php?p=help&a=snapshot", parse_ua);
	}
}

function get_day_time() {
	var t = document.evaluate('//text()[starts-with(., "UTC:")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if(t) {
		var re;
		if(re = /(\d+):(\d+)\s*(.*)$/.exec(t.data)) {
			return [re[3], parseInt(re[1], 10)*60 + parseInt(re[2], 10)];
		}
	}
	return ["", ""];
}

function parse_ua(responseText) {
	var re;
	var day;
	var time;
	if(re = /<dataset[^>]+seriesName=['"]?Good\/Evil.*?<set[^>]+value=['"]?(-?\d+)[^>]*><\/dataset/.exec(responseText)) {
		if(parseInt(re[1], 10) > 0) {
			ua_good = Math.ceil(parseInt(re[1], 10)/100);
		} else {
			ua_good = Math.floor(parseInt(re[1], 10)/100);
		}
		GM_setValue("ua_good", ua_good);
	}
	if(re = /<dataset[^>]+seriesName=['"]?Order\/Chaos.*?<set[^>]+value=['"]?(-?\d+)[^>]*><\/dataset/.exec(responseText)) {
		if(parseInt(re[1], 10) > 0) {
			ua_order = Math.ceil(parseInt(re[1], 10)/100);
		} else {
			ua_order = Math.floor(parseInt(re[1], 10)/100);
		}
		GM_setValue("ua_order", ua_order);
	}
	GM_log("good: " + ua_good + ", order: " + ua_order);
	[day, time] = get_day_time();
	GM_setValue("ua_checked", day);
}

function make_overlib_callback(name) {
	return function(ev) {unsafeWindow.overlib(name, unsafeWindow.DELAY, 1000);};
}

function get_location_name(href, jumpmenu) {
	var opt = document.evaluate('./option[@value="'+href+'"]', jumpmenu, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	if(opt) {
		return opt.text;
	}
	return false;
}


function SSWFieldset() {
	this.fieldset = document.evaluate('//fieldset[@class="results"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

	if(this.fieldset) {
		this.table = document.evaluate('.//table//table', this.fieldset, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		this.legend = document.evaluate('.//legend', this.fieldset, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	} else {
		var maintd = document.evaluate('//td[@class="main"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		var table;
		var cell;
	
		this.legend = document.createElement('legend');
		this.legend.className = "results";
		this.fieldset = document.createElement('fieldset');
		this.fieldset.className = "results";
		table = document.createElement('table');
		table.width = "100%";
		table.cellSpacing = table.cellPadding = table.border = 0;
		cell = table.insertRow(0).insertCell(0);
		cell.style.padding = "10px";
		cell.style.backgroundColor = "white";
		cell.appendChild(this.fieldset);
		maintd.insertBefore(table, maintd.firstChild);
		table = document.createElement('table');
		table.width = "100%";
		table.cellSpacing = table.border = 0;
		table.cellPadding = 10;
		cell = table.insertRow(0).insertCell(0);
		this.fieldset.appendChild(this.legend);
		this.fieldset.appendChild(table);
		this.table = document.createElement('table');
		this.table.width = "100%";
		this.table.cellSpacing = this.table.border = 0;
		this.table.cellPadding = 10;
		cell.appendChild(this.table);
	}
	
	this.caption = function(cap) {
		this.legend.innerHTML = "&nbsp;&nbsp;<b>"+cap+"</b>&nbsp;&nbsp;";
	}

	this.newcell = function() {
		var cell;
		cell = this.table.insertRow(this.table.rows.length).insertCell(0);
		if(this.table.rows.length % 2) {
			cell.style.backgroundColor = "rgb(204, 204, 204)";
		} else {
			cell.style.backgroundColor = "rgb(238, 238, 238)";
		}
		return cell;
	}
	
	this.clear = function() {
		while(this.table.rows.length > 0) {
			this.table.deleteRow(0);
		}
	}
}

function GM_get( dest, callback, external) {
	var theHost = (external)?"":document.location.host;
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://'+ theHost + dest,
		onload:function(details) {
			if( typeof callback=='function' ){
				callback(details.responseText);
			}
		}
	});
}
