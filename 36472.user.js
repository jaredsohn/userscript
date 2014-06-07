// ==UserScript==
// @name           SSW Automine
// @namespace      http://homeworlds.secretsocietywars.com/nardo
// @description    Mines multiple turns for you
// @include        http://www.secretsocietywars.com/index.php?p=space*
// @include        http://www.secretsocietywars.com/index.php?p=pvp*
// ==/UserScript==

var mine_text = document.evaluate('//a[contains(@href, "index.php?p=space&a=mine_asteroid")]//text()[contains(., "mine")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
var mine_link = find_parent(mine_text, "A");
var backgrounds = ["rgb(204, 204, 204)", "rgb(238, 238, 238)"];
var running = false;
var turns = 0;
var turns_span;
var stoplink;
var item_gotspans = new Object();
var item_numspans = new Object();
var item_table;
var previous_time;
var timeout;
var again_span;

if(mine_link) {
	var span = document.createElement('span');
	var a = document.createElement('a');
	
	a.setAttribute("style", mine_link.getAttribute("style"));
	a.href = "/index.php?p=space&a=mine_asteroid";
	a.innerHTML = "automine";
	a.addEventListener('click', automine, false);
	span.appendChild(document.createTextNode(" | "));
	span.appendChild(a);
	
	mine_link.parentNode.insertBefore(span, mine_link.nextSibling);
}

function automine(ev) {
	var fieldset;
	var outertable;
	var table;
	var cell;
	var again_link;

	ev.preventDefault();
	
	if(running) {
		return;
	}
	running = true;

	fieldset = get_fieldset();

	outertable = document.createElement('table');
	outertable.width = "100%";
	outertable.cellSpacing = 0;
	outertable.cellPadding = 10;
	outertable.border = 0;
	table = document.createElement('table');
	table.width = "100%";
	table.cellSpacing = 0;
	table.cellPadding = 10;
	table.border = 0;
	outertable.insertRow(0).insertCell(0).appendChild(table);
	cell = table.insertRow(0).insertCell(0);
	cell.style.backgroundColor = backgrounds[0];
	cell.appendChild(make_mining_infospan());
	fieldset.appendChild(outertable);

	item_table = table;
	again_span = document.createElement('span');
	again_span.style.display = "none";
	again_link = document.createElement('a');
	again_link.style.color = "rgb(102, 0, 0)";
	again_link.style.cursor = "pointer";
	again_link.innerHTML = "[Again!]";
	again_link.addEventListener('click', again, false);
	again_span.appendChild(again_link);
	cell.appendChild(again_span);
	
	again();
}

function again(ev) {
	previous_time = new Date();
	clearTimeout(timeout);
	timeout = null;
	again_span.style.display = "none";
	if(running) {
		GM_get("/index.php?p=space&a=mine_asteroid", process_mine);
	} else {
		stoplink.innerHTML = "";
		turns = 0;
	}
}

function process_mine(responseText) {
	var re;

	clearTimeout(timeout);
	timeout = null;

	if(re = /<img[^>]*src="([^"]+)".*?Giving\s+(\d+)\s+([^\.<]+).*?Now you have\s+([\d,]+)/i.exec(responseText)) {
		var imgname = re[1];
		var itemgot = parseInt(re[2]);
		var itemname = re[3];
		var newtotal = re[4];

		turns++;
		turns_span.innerHTML = turns;

		if(!item_numspans[imgname]) {
			var cell;
			var itemtable;

			cell = item_table.insertRow(item_table.rows.length).insertCell(0);
			cell.style.backgroundColor = backgrounds[ (item_table.rows.length - 1) % backgrounds.length ];
			itemtable = make_item_table(imgname, itemname);
			cell.appendChild(itemtable);
		}
		item_numspans[imgname].innerHTML = newtotal;
		item_gotspans[imgname].innerHTML = parseInt(item_gotspans[imgname].innerHTML) + itemgot;
		check_pvp(responseText);
	} else {
		running = false;
		if(responseText.indexOf("You lack the appropriate tool") > -1) {
			alert("Automine: You don't have an ore mining tool equipped");
		} else {
			alert("Automine: Could not parse the results, sorry.  Perhaps you were PVP'd");
		}
	}

	if(running) {
		var current_time = new Date();
		var pause = 3000 - (current_time.getTime() - previous_time.getTime());
		if(pause > 0) {
			clearTimeout(timeout); /* this helps with a race condition that could cause two threads */
			timeout = null;
			again_span.style.display = "inline";
			timeout = setTimeout(again, pause);
		} else {
			again();
		}
	} else {
		stoplink.innerHTML = "";
		turns = 0;
	}
}

/* check_pvp checks for other players in the sector that can be pvp'd and puts them in the floaters table
   It does not check to see if you have been pvp'd */
function check_pvp(responseText) {
	var re;
	var pvp_tables = new Array();
	var floaters_table;
	var current_row;

	while(re = /<table border="0" cellpadding="0" cellspacing="0" width="150">[\s\S]*?<\/table>/gi.exec(document.body.innerHTML)) {
		var table_html = re[0];

		if(table_html.indexOf("index.php?p=pvp") > -1) {
			pvp_tables.push(table_html);
		}
	}
	floaters_table = get_floaters_table();
	for(var i = 1; i < floaters_table.rows.length; i++) {
		floaters_table.deleteRow(i);
	}
	for(var i = 0; i < pvp_tables.length; i++) {
		if((i % 3) == 0) {
			current_row = floaters_table.insertRow(floaters_table.rows.length);
		}
		current_row.insertCell(current_row.cells.length).innerHTML = pvp_tables[i];
	}
}

function get_floaters_table() {
	var floaters_text = document.evaluate('//text()[contains(., "FLOATERS")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var floaters_table;
	
	if(floaters_text) {
		floaters_table = find_parent(floaters_text, "TABLE");
	} else {
		var cell;
		var attractions_text = document.evaluate('//text()[contains(., "ATTRACTIONS")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		var attractions_table = find_parent(attractions_text, "TABLE");
		
		floaters_table = document.createElement('table');
		floaters_table.width = "100%";
		floaters_table.cellSpaing = 0;
		floaters_table.cellPadding = 5;
		floaters_table.border = 0;
		cell = floaters_table.insertRow(0).insertCell(0);
		cell.setAttribute("style", "color: rgb(255, 255, 255); background-color: rgb(102, 102, 102); font-weight: bold;");
		cell.appendChild(document.createTextNode("FLOATERS"));
		attractions_table.parentNode.insertBefore(floaters_table, attractions_table.nextSibling);
	}
	return floaters_table;
}

function make_item_table(imgname, itemname) {
	var table = document.createElement('table');
	var cell;
	var img = document.createElement('img');
	
	table.border = 0;
	table.insertRow(0);
	cell = table.rows[0].insertCell(0);
	cell.width = 50;
	img.src = imgname;
	cell.appendChild(img);
	cell = table.rows[0].insertCell(1);
	cell.appendChild(document.createTextNode("Mined "));
	item_gotspans[imgname] = document.createElement('span');
	item_gotspans[imgname].innerHTML = "0";
	cell.appendChild(item_gotspans[imgname]);
	cell.appendChild(document.createTextNode(" " + itemname));
	cell.appendChild(document.createElement('br'));
	cell.appendChild(document.createTextNode("Now you have "));
	item_numspans[imgname] = document.createElement('span');
	item_numspans[imgname].innerHTML = "0";
	cell.appendChild(item_numspans[imgname]);
	return table;
}

function make_mining_infospan() {
	var span = document.createElement('span');
	
	turns_span = document.createElement('span');
	stoplink = document.createElement('a');
	stoplink.style.color = "rgb(102, 0, 0)";
	stoplink.style.cursor = "pointer";
	stoplink.innerHTML = "[Stop]";
	stoplink.addEventListener('click', stop_automine, false);
	span.appendChild(stoplink);
	span.appendChild(document.createTextNode(" Mined for "));
	turns_span.innerHTML = "0";
	span.appendChild(turns_span);
	span.appendChild(document.createTextNode(" turns."));
	return span;
}

function stop_automine(ev) {
	ev.preventDefault();
	running = false;
	stoplink.innerHTML = "Stopping...";
}

function get_fieldset() {
	var fieldset = document.evaluate('//fieldset[@class="results"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var legend = document.createElement('legend');
		
	
	if(fieldset) {
		fieldset.innerHTML = "";
	} else {
		var maintd = document.evaluate('//td[@class="main"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		var table = document.createElement('table');
		var cell;
		
		table.width = "100%";
		table.cellSpacing = 0;
		table.cellPadding = 0;
		table.border = 0;
		fieldset = document.createElement('fieldset');
		fieldset.className = "results";
		cell = table.insertRow(0).insertCell(0);
		cell.setAttribute("style", "padding: 10px; background-color: rgb(255, 255, 255);");
		cell.appendChild(fieldset);
		maintd.insertBefore(table, maintd.firstChild);
	}
	legend.className = "results";
	legend.innerHTML = "&nbsp;&nbsp;<b>WHAT'S HAPPENING???</b>&nbsp;&nbsp;";
	fieldset.appendChild(legend);
	return fieldset;
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

function find_parent(node, nodetype) {
	while(node && (node.nodeName != nodetype)) {
		node = node.parentNode;
	}
	return node;
}
