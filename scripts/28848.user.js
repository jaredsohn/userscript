// ==UserScript==
// @name           SSW Quicklinks
// @namespace      http://homeworlds.secretsocietywars.com/nardo
// @description    Adds user defined links to SSW pages
// @include        http://www.secretsocietywars.com/*
// ==/UserScript==

var quicklinks_accesskey = 'q';


var all_quicklinks = eval(GM_getValue("links", '[]'));
var qlinks_top;
var qlinks_left;
var qlinks_bottom;
var qlinks_invisible;
var configure_div;
var configure_lines;
var locations = {'Blast Off!': 'http://www.secretsocietywars.com/index.php?p=space&a=blastoff',
                 'Consume Stuff': 'http://www.secretsocietywars.com/index.php?p=inventory&a=consumables',
                 'DataBuddy': 'http://www.secretsocietywars.com/index.php?p=account&a=databuddy',
                 'Equipment': 'http://www.secretsocietywars.com/index.php?p=inventory&a=equipment',
                 'Inventory': 'http://www.secretsocietywars.com/index.php?p=inventory&a=inventory',
                 'Make Stuff': 'http://www.secretsocietywars.com/index.php?p=inventory&a=combine',
                 'Sector Map': 'http://www.secretsocietywars.com/index.php?p=space&a=sector_map',
                 'Sell Stuff': 'http://www.secretsocietywars.com/index.php?p=inventory&a=pack',

                 'Places': 'optgroup',
                 'Bank': 'http://www.secretsocietywars.com/index.php?p=inventory&a=bank',
                 'Display Case': 'http://www.secretsocietywars.com/index.php?p=inventory&a=collection',
                 'Lodge': 'http://www.secretsocietywars.com/index.php?p=lodge&a=lodgemaster',
                 'Secure Storage': 'http://www.secretsocietywars.com/index.php?p=inventory&a=storage',

                 'Planets': 'optgroup',
                 'Ahlnuldia': 'http://www.secretsocietywars.com/index.php?p=planets&a=teleport&planet_id=18',
                 'Barnimus': 'http://www.secretsocietywars.com/index.php?p=planets&a=teleport&planet_id=14',
                 'Boria': 'http://www.secretsocietywars.com/index.php?p=planets&a=teleport&planet_id=2',
                 'Deep Six Fauna': 'http://www.secretsocietywars.com/index.php?p=planets&a=teleport&planet_id=12',
                 'Earth': 'http://www.secretsocietywars.com/index.php?p=planets&a=teleport&planet_id=1',
                 'Eroticon 69': 'http://www.secretsocietywars.com/index.php?p=planets&a=teleport&planet_id=11',
                 'Laxloo': 'http://www.secretsocietywars.com/index.php?p=planets&a=teleport&planet_id=5',
                 'Lucky Spaceman Distilleries': 'http://www.secretsocietywars.com/index.php?p=planets&a=teleport&planet_id=9',
                 'New Ceylon': 'http://www.secretsocietywars.com/index.php?p=planets&a=teleport&planet_id=4',
                 'Nortonia': 'http://www.secretsocietywars.com/index.php?p=planets&a=teleport&planet_id=8',
                 'Phallorus': 'http://www.secretsocietywars.com/index.php?p=planets&a=teleport&planet_id=6',
                 'Pharma': 'http://www.secretsocietywars.com/index.php?p=planets&a=teleport&planet_id=3',
                 'Solaris': 'http://www.secretsocietywars.com/index.php?p=planets&a=teleport&planet_id=7',
                 'Tranquility': 'http://www.secretsocietywars.com/index.php?p=planets&a=teleport&planet_id=16',
                 'Trinoc': 'http://www.secretsocietywars.com/index.php?p=planets&a=teleport&planet_id=10',
                 'Xiao MeiMei': 'http://www.secretsocietywars.com/index.php?p=planets&a=teleport&planet_id=17',
                 'Yeranus': 'http://www.secretsocietywars.com/index.php?p=planets&a=teleport&planet_id=13',
                 'Custom': 'optgroup'};


qlinks_top       = find_qlinks_pos(all_quicklinks, "top");
qlinks_left      = find_qlinks_pos(all_quicklinks, "left");
qlinks_bottom    = find_qlinks_pos(all_quicklinks, "bottom");
qlinks_invisible = find_qlinks_pos(all_quicklinks, "hidden");


add_qlinks_top(qlinks_top);
add_qlinks_left(qlinks_left);
add_qlinks_bottom(qlinks_bottom);
add_qlinks_hidden(qlinks_invisible);

ql_insert_config_link();

function ql_find_parent(obj, ptype) {
	var p = obj;
	
	while(p && (p.nodeName != ptype)) {
		p = p.parentNode;
	}
	return p;
}

function ql_generate_top_bottom_hrefs(qlinks) {
	var hrefs = new Array();
	
	for(var i = 0; i < qlinks.length; i++) {
		var txt = "";
		txt = '<a href="' + qlinks[i].url + '" style="color: rgb(255, 255, 255); font-size: 10px;"';
		if(qlinks[i].accesskey) {
			txt += ' accesskey="' + qlinks[i].accesskey + '"';
		}
		txt += '>' + qlinks[i].name + '</a>';
		hrefs.push(txt);
	}
	return hrefs;
}

function add_qlinks_top_bottom(qlinks, toprow_cell) {
	var toprow_row;
	
	toprow_row  = ql_find_parent(toprow_cell, "TR");
	if(toprow_row) {
		var new_table;
		var r1;
		var r2;
		var c1;
		var c2;
		var qlinks_html;
		var cell_html;
		
		qlinks_html = ql_generate_top_bottom_hrefs(qlinks);
		cell_html = toprow_cell.innerHTML;
		
		new_table = document.createElement('table');
		r1 = new_table.insertRow(0);
		r2 = new_table.insertRow(1);
		c1 = r1.insertCell(0);
		c2 = r2.insertCell(0);
		c1.innerHTML = cell_html;
		c2.innerHTML = qlinks_html.join("&nbsp;&nbsp;|&nbsp;&nbsp;");
		c1.style.fontSize = "9px";
		c1.style.color = "rgb(204, 204, 204)";
		c2.setAttribute("align", "left");
		c2.setAttribute("style", "font-size: 9px; color: rgb(204, 204, 204);");
		toprow_row.setAttribute("style", toprow_cell.getAttribute("style"));
		toprow_row.style.background = "url(data:image/gif;base64,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)";
		toprow_cell.removeAttribute("style");
		toprow_cell.setAttribute("align", "center");
		toprow_cell.innerHTML = "";
		toprow_cell.appendChild(new_table);
	}
}

function add_qlinks_hidden(qlinks) {
	for(var i = 0; i < qlinks.length; i++) {
		var newlink = document.createElement('a');
		newlink.href = qlinks[i].url;
		if(qlinks[i].accesskey) {
			newlink.accessKey = qlinks[i].accesskey;
		}
		document.body.appendChild(newlink);
	}
}

function add_qlinks_top(qlinks) {
	var snapshot_link;
	var toprow_cell;

	if(!qlinks || (qlinks.length == 0)) {
		return;
	}
	
	snapshot_link = document.evaluate('//a[@href="http://www.secretsocietywars.com/index.php?p=help&a=snapshot"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	toprow_cell = ql_find_parent(snapshot_link, "TD");
	add_qlinks_top_bottom(qlinks, toprow_cell);
}

function add_qlinks_bottom(qlinks) {
	var snapshot_links;
	var bottomrow_cell;

	if(!qlinks || (qlinks.length == 0)) {
		return;
	}

	snapshot_links = document.evaluate('//a[@href="http://www.secretsocietywars.com/index.php?p=account&a=logout"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if(snapshot_links.snapshotLength > 1) {
		bottomrow_cell = ql_find_parent(snapshot_links.snapshotItem(snapshot_links.snapshotLength - 1), "TD");
		add_qlinks_top_bottom(qlinks, bottomrow_cell);
	}
}

function add_qlinks_left(qlinks) {
	var left_link;
	var left_cell;
	var left_row;
	var left_table;
	var new_row;
	var rownum = 1;
	var cellnum = 0;

	if(!qlinks || (qlinks.length == 0)) {
		return;
	}
	
	left_link = document.evaluate('//a[@title="View your player profile"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if(!left_link) {
		return;
	}
	left_cell = ql_find_parent(left_link, "TD");
	left_row = ql_find_parent(left_cell, "TR");
	left_table = ql_find_parent(left_row, "TABLE");
	
	for(var i = 0; i < qlinks.length; i++) {
		var new_cell;
		var new_link;
		
		if((cellnum % 3) == 0) {
			new_row = left_table.insertRow(rownum++);
			cellnum = 0;
			new_row.setAttribute("style", left_cell.getAttribute("style"));
		}
		new_cell = new_row.insertCell(cellnum++);
		
		new_link = document.createElement('a');
		new_link.href = qlinks[i].url;
		new_link.setAttribute("style", left_link.getAttribute("style"));
		new_link.innerHTML = qlinks[i].name;
		if(qlinks[i].accesskey) {
			new_link.accessKey = qlinks[i].accesskey;
		}
		new_cell.appendChild(new_link);
		new_cell.setAttribute("style", left_cell.getAttribute("style"));
	}
	for(var i = cellnum; i < 3; i++) {
		var new_cell;
		
		new_cell = new_row.insertCell(i);
		new_cell.setAttribute("style", left_cell.getAttribute("style"));
	}
}

function new_link_line() {
	var newlink = {name: "NEWLINK", url: 'http://www.secretsocietywars.com/index.php?p=space&a=blastoff',
	              position: "top", accesskey: ""};
	var tab;
	
	tab = configure_div.firstChild;
	insert_line(tab.insertRow(configure_lines.length + 1), newlink);
}

function save_links() {
	var savelines = new Array();

	all_quicklinks = new Array();	
	for(var i = 0; i < configure_lines.length; i++) {
		var thisname;
		var thisurl;
		var thispos;
		var thishotkey;
		var line = configure_lines[i];
		
		if(!line["delete"].checked) {
			thisname = line["name"].value;
			if(line["urlsel"].value == "Other") {
				thisurl = line["urltext"].value;
			} else {
				thisurl = line["urlsel"].value;
			}
			thispos = line["position"].value;
			thishotkey = line["accesskey"].value;
			all_quicklinks.push({"name": thisname, "url": thisurl, "position": thispos, "accesskey": thishotkey});
			savelines.push('{name: "' + thisname + '", url: "' + thisurl + '", position: "' + thispos + '", accesskey: "' + thishotkey + '"}');
		}
	}
	GM_setValue("links", '['+savelines.join(', ')+']');
	document.body.removeChild(configure_div);
}

function insert_line(row, qlink) {
	var name_textbox;
	var location_select;
	var location_textbox;
	var position_select;
	var hotkey_textbox;
	var delete_checkbox;

	name_textbox = document.createElement('input');
	name_textbox.type = "text";
	name_textbox.size = "12";
	name_textbox.value = qlink["name"];
	row.insertCell(0).appendChild(name_textbox);
		
	location_select = document.createElement('select');
	location_textbox = document.createElement('input');
	location_textbox.type = "text";
	location_textbox.size = "45";
	location_textbox.value = qlink["url"];

	if(populate_location(location_select, qlink["url"])) {
		var other_opt;
		
		other_opt = document.createElement('option');
		other_opt.text = "Other";
		other_opt.value = "Other";
		location_select.add(other_opt, null);
		location_select.addEventListener('change', check_for_other, false);
		row.insertCell(1).appendChild(location_select);
	} else {
		var other_opt;
		
		other_opt = document.createElement('option');
		other_opt.text = "Other";
		other_opt.value = "Other";
		location_select.add(other_opt, null);
		location_select.selectedIndex = other_opt.index;
		row.insertCell(1).appendChild(location_textbox);
	}

	position_select = make_position_select(qlink["position"]);
	row.insertCell(2).appendChild(position_select);
	
	hotkey_textbox = document.createElement('input');
	hotkey_textbox.type = "text";
	hotkey_textbox.size = "1";
	hotkey_textbox.value = qlink["accesskey"];
	row.insertCell(3).appendChild(hotkey_textbox);
		
	delete_checkbox = document.createElement('input');
	delete_checkbox.type = "checkbox";
	row.insertCell(4).appendChild(delete_checkbox);
	
	configure_lines.push({"name": name_textbox, "urlsel": location_select, "urltext": location_textbox, "position": position_select, "accesskey": hotkey_textbox, "delete" : delete_checkbox});

}


function configure_quicklinks(ev) {
	var tab;
	var row;
	var cell;
	var new_button;
	var save_button;

	ev.preventDefault();

	window.location.href = '#';
	
	configure_div = document.createElement('div');
	configure_div.className = "disable_altshift";
	configure_div.style.fontSize    = "9pt";
	configure_div.style.position    = "fixed";
	configure_div.style.position    = "absolute";
	configure_div.style.left        = "0";
	configure_div.style.right       = "0";
	configure_div.style.width       = "620px";
	configure_div.style.top         = "100px";
	configure_div.style.padding     = "0 10px";
	configure_div.style.margin      = "0 auto";
	configure_div.style.background  = "rgb(204, 204, 204)";
	configure_div.style.color       = "black";
	configure_div.style.borderStyle = "solid";
	configure_div.style.borderColor = "rgb(102, 0, 0)";
	configure_div.style.borderWidth = "5px";
	configure_div.style.MozBorderRadius = "20px";
	
	tab = document.createElement('table');
	tab.style.width = "100%";
	row = tab.insertRow(0);
	cell = row.insertCell(0);
	cell.appendChild(document.createTextNode("Name"));
	cell = row.insertCell(1);
	cell.appendChild(document.createTextNode("Location"));
	cell = row.insertCell(2);
	cell.appendChild(document.createTextNode("Position"));
	cell = row.insertCell(3);
	cell.appendChild(document.createTextNode("Hotkey"));
	cell = row.insertCell(4);
	cell.appendChild(document.createTextNode("Delete"));

	new_button = document.createElement('input');
	new_button.type = "button";
	new_button.value = "New Link";
	new_button.addEventListener("click", new_link_line, false);
	save_button = document.createElement('input');
	save_button.type = "button";
	save_button.value = "Save";
	save_button.addEventListener("click", save_links, false);
	
	row = tab.insertRow(1);
	cell = row.insertCell(0);
	cell.appendChild(document.createTextNode(" "));
	row = tab.insertRow(2);
	cell = row.insertCell(0);
	cell.colSpan = 2;
	cell.align = "left";
	cell.appendChild(new_button);
	cell = row.insertCell(1);
	cell.colSpan = 3;
	cell.align = "right";
	cell.appendChild(save_button);

	configure_lines = new Array();

	for(var i = 0; i < all_quicklinks.length; i++) {
		row = tab.insertRow(i+1);
		insert_line(row, all_quicklinks[i]);
	}
	
	configure_div.appendChild(tab);
	document.body.appendChild(configure_div);
}

function make_position_select(pos) {
	var positions = ["top", "bottom", "left", "hidden"];
	var sel = document.createElement('select');
	
	for(var i = 0; i < positions.length; i++) {
		var opt = document.createElement('option');
		opt.text = positions[i];
		opt.value = positions[i];
		sel.add(opt, null);
		if(positions[i] == pos) {
			sel.selectedIndex = opt.index;
		}
	}
	return sel;
}

function check_for_other(ev) {
	if(ev.target.value == "Other") {
		var line = find_matching_line(ev.target, "urlsel");
		if(line) {
			ev.target.parentNode.replaceChild(line["urltext"], ev.target);
		}
	}
}

function find_matching_line(obj, t) {
	for(var i = 0; i < configure_lines.length; i++) {
		if(configure_lines[i][t] == obj) {
			return configure_lines[i];
		}
	}
}

function populate_location(sel, txt) {
	var matched = false;
	
	for (var i in locations) {

		if(locations[i] == 'optgroup') {
			var optgroup = document.createElement('optgroup');
			optgroup.label = i;
			sel.add(optgroup, null);
		} else {
			var opt = document.createElement('option');
			opt.text = i;
			opt.value = locations[i];
			sel.add(opt, null);
			if(locations[i] == txt) {
				sel.selectedIndex = opt.index;
				matched = true;
			}
		}
	}
	return matched;
}

function ql_insert_config_link() {
	var bottom_snapshot;
	var bottom_cell;
	var bottom_cell_html;
	var re;
	
	bottom_snapshot = document.evaluate('//a[@href="http://www.secretsocietywars.com/index.php?p=account&a=logout"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if(bottom_snapshot.snapshotLength > 1) {
		var new_link;
		var logout_link;
		
		logout_link = bottom_snapshot.snapshotItem(bottom_snapshot.snapshotLength - 1);
		
		bottom_cell = ql_find_parent(logout_link, "TD");
		new_link = document.createElement('a');
		new_link.setAttribute("style", logout_link.getAttribute("style"));
		new_link.style.cursor = "pointer";
		new_link.title = "Configure Quicklinks";
		new_link.innerHTML = "QUICKLINKS";
		new_link.addEventListener('click', configure_quicklinks, false);
		bottom_cell.insertBefore(new_link, logout_link);
		bottom_cell.insertBefore(document.createTextNode("  | "), logout_link);
	}
}

function find_qlinks_pos(qlinks, pos) {
	var matched = new Array();

	for(var i = 0; i < qlinks.length; i++) {
		if(qlinks[i]["position"] == pos) {
			matched.push(qlinks[i]);
		}
	}
	return matched;
}
