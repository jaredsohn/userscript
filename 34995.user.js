// ==UserScript==
// @name           SSW Sort Facilities
// @namespace      http://homeworlds.secretsocietywars.com/nardo
// @description    Allows you to sort your facilities by sector and production
// @include        http://www.secretsocietywars.com/index.php?p=facilities&a=facilities*
// ==/UserScript==

var table = document.evaluate('//text()[contains(., "Facility Status")]//ancestor::table[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
var rows = new Array();
var greens = ["rgb(153, 238, 153)", "rgb(153, 204, 153)"];
var next_page_links = document.evaluate('//a[contains(@href, "a=facilities&row=")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
var produced = new Object();
var making = new Object();
var need = new Object();

if(table) {
	for(var i = 1; i < table.rows.length; i++) {
		rows.push(parse_row(table.rows[i]));
	}
	linkify(table.rows[0], "Sector", function(){fac_sort(sortby_sector);}, false);
	linkify(table.rows[0], "Doppelpets", function(){fac_sort(sortby_doppelpets);}, false);
	linkify(table.rows[0], "Production", function(){fac_sort(sortby_production);}, false);
	linkify(table.rows[0], "Facility Status", function(){fac_sort(sortby_facnum);}, false);
}

if(next_page_links.snapshotLength > 0) {
	var btn = document.createElement('input');
	var span = document.createElement('span');
	var cell = document.evaluate('./ancestor::p[1]', next_page_links.snapshotItem(0), null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

	btn.type = "button";
	btn.value = "Load Other Pages";
	btn.addEventListener("click", function() {load_next_pages(span);}, false);
	btn.style.fontSize = "11px";
	span.appendChild(btn);
	cell.insertBefore(span, cell.firstChild);
}

function load_next_pages(span) {
	var unique = new Object();
	var urls = new Array();
	for(var i = 0; i < next_page_links.snapshotLength; i++) {
		unique[next_page_links.snapshotItem(i).href] = true;
	}
	for(var url in unique) {
		urls.push(url);
	}
	span.innerHTML = "Loading..";
	load_urls(span, urls);
}

function load_urls(span, urls) {
	var re;
	if(urls.length > 0) {
		var url = urls.shift();
		span.innerHTML += ".";
		if(re = /http:\/\/[^/]+(.*)/.exec(url)) {
			url = re[1];
		}
		GM_get(url, function(responseText) {parse_response(responseText, span, urls);});
	} else {
		var nardocom2 = document.getElementById('nardocom2');
		if(nardocom2) {
			nardocom2.click();
		}
		span.innerHTML = "";
	}
}

function parse_response(responseText, span, urls) {
	var re;
	var row;
	while(re = /<TR>(\s*<TD STYLE="font-size:10px;[\s\S]*?(?:Ore\s+\([\d,]+\)\s*<\/small[\s\S]*?<\/small[\s\S]*?<\/small[\s\S]*?<\/tr|None Required)[\s\S]*?)<\/TR>/gi.exec(responseText)) {
		row = table.insertRow(table.rows.length);
		row.innerHTML = re[1];
		rows.push(parse_row(row));
	}
	load_urls(span, urls);
}

function parse_row(row) {
	var sortobj = new Object();
	var rowhtml = row.innerHTML;
	var captured = false;

	sortobj.obj = row;
	sortobj.doppelpets = 0;
	sortobj.doppelhealth = 0;
	while(re = /Mini-[^\s]+\s+(\d+)%/g.exec(rowhtml)) {
		sortobj.doppelpets++;
		sortobj.doppelhealth += parseInt(re[1]);
	}
	/*
	if(rowhtml.indexOf("background-color: rgb(238, 204, 204)") > -1) {
		captured = true;
	}
	*/
	if(document.evaluate('.//span[contains(@style, "background-color: rgb(204, 0, 0)")]/text()[contains(., "Sector:")]', row, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue) {
		captured = true;
	}
	if(re = /Sector: (\d+)/.exec(rowhtml)) {
		sortobj.sector = parseInt(re[1]);
	} else {
		sortobj.sector = -1;
	}
	if(re = /Battle Drone\s*\(([\d,]+)/.exec(rowhtml)) {
		sortobj.production = " Battle Drone";
		sortobj.stored = parseInt(re[1].replace(/,/g, ""));
		sort_required_ores(row.cells[4]);
	} else if(re = />\s*([^\s]+)\s+Ore\s*\(([\d,]+)/.exec(rowhtml)) {
		sortobj.production = re[1];
		sortobj.stored = parseInt(re[2].replace(/,/g, ""));
	} else {
		GM_log("unknown production");
		sortobj.production = "";
		sortobj.stored = -1;
	}
	if(re = /(?:Mining Colony|Drone Factory)\s+(\d+)/.exec(rowhtml)) {
		sortobj.facnum = parseInt(re[1]);
	}

	if(!making[sortobj.production]) {
		making[sortobj.production] = new Object();
		making[sortobj.production].num = 0;
		making[sortobj.production].captured = 0;
	}
	if(re = /OUTPUT:\s+(\d+)\s+per production cycle/.exec(rowhtml)) {
		var this_making = parseInt(re[1]);
		making[sortobj.production].num += this_making;
		if(captured) {
			making[sortobj.production].captured += this_making;
		}
		while(re = /<small>\s*([^\s]+)\s+Ore\s*\(([,\d]+)/gi.exec(rowhtml)) {
			var this_ore = re[1];
			if(!need[this_ore]) {
				need[this_ore] = new Object();
				need[this_ore].num = 0;
				need[this_ore].captured = 0;
			}
			need[this_ore].num += this_making;
			if(captured) {
				need[this_ore].captured += this_making;
			}
			linkify(row, this_ore, small_ore_callback(this_ore), true);
		}
	}

	if(!produced[sortobj.production]) {
		produced[sortobj.production] = new Object();
		produced[sortobj.production].num = 0;
		produced[sortobj.production].captured = 0;
	}
	produced[sortobj.production].num += sortobj.stored;
	if(captured) {
		produced[sortobj.production].captured += sortobj.stored;
	}
	linkify(row, sortobj.production, function() {display_produced(sortobj.production);}, true);
	return sortobj;
}

function sort_required_ores(cell) {
	var ore_tables = document.evaluate('./table//text()[contains(., " Ore ")]/ancestor::table[1]', cell, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var orenames = new Array();
	var tables = new Array();
	for(var i = 0; i < ore_tables.snapshotLength; i++) {
		var txtobj = document.evaluate('.//text()[contains(., " Ore ")]', ore_tables.snapshotItem(i), null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		var orename = (txtobj ? txtobj.data : "");
		orenames[i] = orename;
		tables[i] = ore_tables.snapshotItem(i);
		for(var j = 0; j < i; j++) {
			if(orenames[i] < orenames[j]) {
				var tmp;
				tables[i].parentNode.insertBefore(tables[i], tables[j]);
				tmp = orenames[i];
				orenames[i] = orenames[j];
				orenames[j] = tmp;
				tmp = tables[i];
				tables[i] = tables[j];
				tables[j] = tmp;
				break;
			}
		}
	}
}
				

function small_ore_callback(ore) {
	return function() {display_produced(ore);};
}

function display_produced(item) {
	var message;
	message = "You have " + produced[item].num;
	if(produced[item].captured) {
		message += "/"+(produced[item].num - produced[item].captured);
	}
	message += " " + item + " in facilities\nYou are making " + making[item].num;
	if(making[item].captured) {
		message += "/"+(making[item].num - making[item].captured);
	}
	message += " per cycle";
	if(need[item] && need[item].num) {
		message += "\nYou are using " + need[item].num;
		if(need[item].captured) {
			message += "/"+(need[item].num - need[item].captured);
		}
		message += " per cycle in your facilities";
	}
	alert(message);
//	alert("You have " + produced[item] + " " + item + " in facilities\nYou are making " + making[item] + " per cycle" + (need[item] ? "\nYou are using " + need[item] + " per cycle in your factories" : ""));
}

function linkify(obj, text, sortfunc, usespan) {
	var textnode = document.evaluate('.//text()[contains(., "'+text+'")]', obj, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if(textnode) {
		var link;
		if(usespan) {
			link = document.createElement('span');
		} else {
			link = document.createElement('a');
		}
//		textnode.parentNode.appendChild(link);
		textnode.parentNode.insertBefore(link, textnode);
		link.appendChild(textnode);
		link.style.cursor = "pointer";
//		link.addEventListener('click', function(){fac_sort(sortfunc);}, false);
		link.addEventListener('click', sortfunc, false);
	}
}

function fac_sort(sortfunc) {
	var sorted = rows.sort(sortfunc);
	for(var i = 0; i < sorted.length; i++) {
		if(sorted[i].obj != table.rows[i+1]) {
			sorted[i].obj.parentNode.insertBefore(sorted[i].obj, table.rows[i+1]);
		}
		for(var j = 0; j < sorted[i].obj.cells.length; j++) {
			if(isgreen(sorted[i].obj.cells[j])) {
				sorted[i].obj.cells[j].style.backgroundColor = greens[i%2];
			}
		}
	}
}

function isgreen(obj) {
	for(var i = 0; i < greens.length; i++) {
		if(obj.style.backgroundColor == greens[i]) {
			return true;
		}
	}
	return false;
}

function sortby_sector(a, b) {
	if(a.sector != b.sector) {
		return a.sector - b.sector;
	} else {
		return sortby_production(a, b);
	}
}

function sortby_doppelpets(a, b) {
	if(a.doppelpets != b.doppelpets) {
		return b.doppelpets - a.doppelpets;
	} else if(a.doppelhealth != b.doppelhealth) {
		return b.doppelhealth - a.doppelhealth;
	} else {
		return sortby_production(a, b);
	}
}

function sortby_production(a, b) {
	if(a.production < b.production) {
		return -1;
	} else if(a.production > b.production) {
		return 1;
	} else if(a.stored != b.stored) {
		return b.stored - a.stored;
	} else if(a.sector != b.sector) {
		return a.sector - b.sector;
	} else {
		return a.facnum - b.facnum;
	}
}

function sortby_facnum(a, b) {
	return a.facnum - b.facnum;
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
