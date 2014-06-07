// ==UserScript==
// @name           SSW Food Rememberer
// @namespace      http://homeworlds.secretsocietywars.com/nardo
// @description    Remembers which food and drink you like.  Also uses any daily use IOTMs that you have.
// @include        http://www.secretsocietywars.com/index.php?p=inventory&a=consume*
// @include        http://www.secretsocietywars.com/index.php?p=inventory&a=consumables*
// @include        http://www.secretsocietywars.com/index.php?p=inventory&a=use*
// ==/UserScript==

// "Item Name": [times to use, top lines to trim, skip times used line, default confirmed]
var iotms = {"ACME Money Press": [5, 1, false, true], "ACME Smiley Dictionary": [5, 1, false, true], "Alien Gazing Ball": [5, 1, false, false], "Easy Button": [5, 1, false, true], "Happy Fun Ball": [10, 1, false, true], "Max Million's Mini-MMG": [5, 1, false, true], "Mr. Lucky Golden Horse Shoe": [5, 2, true, true], "Mysterious Green Pyramid": [5, 2, true, true], "Pyramid of Asclepius": [5, 1, true, false], "Samoflange": [5,1,false, true], "Seeker Orb": [5, 2, true, true], "Tele Pet Healer": [10, 1, false, false], "Zurichite Artifact": [5, 2, true, true]};
var iotms_confirmed = eval(GM_getValue("iotms_confirmed", "({})"));
var second_br = document.evaluate('//button[text()="meds"]/following-sibling::br[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
var consume_button = document.evaluate('//input[@value="Consume Item(s) >>>"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
//var multiuse_items = ["Trade-Recharge Hypo", "Cigarette"];

add_use_all_link();
add_multiuse_buttons();

if(second_br) {
	var span = document.createElement('span');
	span.style.fontSize = "10px";
	add_food_links(span);
	second_br.parentNode.insertBefore(span, second_br);
}

if(consume_button) {
	consume_button.addEventListener('click', save_food_and_drink, false);
}

function add_multiuse_buttons() {
	var use_its = document.evaluate('//input[@value="Use It"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for(var i = 0; i < use_its.snapshotLength; i++) {
		var button = use_its.snapshotItem(i);
		var itemname = get_multiuse_item_name(button);
		button.addEventListener('click', multiuse_click, false);
		button.addEventListener('contextmenu', multiuse_toggle, false);
		if(GM_getValue("multiuse_"+itemname, false)) {
			button.value = "Multiuse";
		}
	}
}

function multiuse_toggle(ev) {
	var itemname = get_multiuse_item_name(ev.target);
	ev.preventDefault();
	ev.stopPropagation();
	if(itemname) {
		if(GM_getValue("multiuse_"+itemname, false)) {
			GM_setValue("multiuse_"+itemname, false);
			ev.target.value = "Use It";
		} else {
			GM_setValue("multiuse_"+itemname, true);
			ev.target.value = "Multiuse";
		}
	}
}

function multiuse_click(ev) {
	var itemname = get_multiuse_item_name(ev.target);
	var change_value = true;
	var inv = document.evaluate('./preceding-sibling::input[@name="inv"]', ev.target, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var textbox = document.evaluate('./preceding-sibling::input[@name="qty"]', ev.target, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var qty = parseInt(textbox.value, 10);
	if((itemname == "Cigarette") && (qty > 100)) {
		ev.preventDefault();
		var aidnum = get_consume_number("Third Aid Kit");
		multismoke("", inv.value, aidnum, qty);
	} else if(itemname && GM_getValue("multiuse_"+itemname, false)) {
		if(inv && textbox && (parseInt(textbox.value, 10) > 1)) {
			ev.preventDefault();
			change_value = false;
			multiuse("", inv.value, qty);
		}
	}
	if(change_value) {
		ev.target.value = "Use It";
	}
}

function get_consume_number(itemname) {
	var re;
	var regex = new RegExp("(\\d+)\\s*:\\s*\""+itemname+" \\(\\d");
	GM_log("(\\d+)\\s*:\\s*\""+itemname+" \\(\\d");
	if(re = regex.exec(document.getElementsByTagName("HEAD")[0].innerHTML)) {
		return re[1];
	}
}

function multiuse(responseText, itemnum, qty, data) {
	var re;
	if(!data) {
		data = new Object();
		data.fieldset = new SSWFieldset();
		data.fieldset.clear();
		data.fieldset.caption("WHAT'S HAPPENING???");
	}
	if(re = /<fieldset[^>]+class="results"[\s\S]+?<\/fieldset/i.exec(responseText)) {
		if((re = /<table[^>]*>([\s\S]*)<\/table/i.exec(re[0])) && (re = /<table[^>]*>([\s\S]*)<\/table/i.exec(re[1]))) {
			var table = document.createElement('table');
			table.innerHTML = re[1];
			for(var row = 0; row < table.rows.length; row++) {
//				var cellname = table.rows[row].cells[0].innerHTML.replace(/\d+/g, "");
//				GM_log("cellname: " + cellname);
				var cell = data.fieldset.newcell();
				cell.innerHTML = table.rows[row].cells[0].innerHTML;
			}
		}
	}
	if(qty > 0) {
		GM_post("/index.php?p=inventory&a=use", "inv="+itemnum+"&qty=1&action=Use It", function(responseText) {multiuse(responseText, itemnum, qty-1, data);});
	} else {
		data.fieldset.caption("WHAT HAPPENED???");
		data.fieldset.newcell().innerHTML = "<b>Done</b>";
	}
}

function multismoke(responseText, cignum, aidnum, qty, data) {
	var re;
	var cigs_used = 0;
	var aid_used = 0;
	if(!data) {
		data = new Object();
		data.fieldset = new SSWFieldset();
		data.fieldset.clear();
		data.fieldset.caption("WHAT'S HAPPENING???");
	}
	GM_log("cignum: " + cignum + ", aidnum: " + aidnum + ", qty: " + qty);
	if(re = /<fieldset[^>]+class="results"[\s\S]+?<\/fieldset/i.exec(responseText)) {
		if((re = /<table[^>]*>([\s\S]*)<\/table/i.exec(re[0])) && (re = /<table[^>]*>([\s\S]*)<\/table/i.exec(re[1]))) {
			var table = document.createElement('table');
			table.innerHTML = re[1];
			for(var row = 0; row < table.rows.length; row++) {
				var cell = data.fieldset.newcell();
				cell.innerHTML = table.rows[row].cells[0].innerHTML;
			}
		}
	}
	if(re = /You use (\d+) Cigarettes/.exec(responseText)) {
		cigs_used = parseInt(re[1], 10);
		qty -= cigs_used;
	} else if(re = /Taking (\d+) Third Aid Kit/.exec(responseText)) {
		aid_used = parseInt(re[1], 10);
	}
	if(!cigs_used && !aid_used && responseText) {
		data.fieldset.caption("WHAT HAPPENED???");
		data.fieldset.newcell().innerHTML = "<b>The script thinks you ran out of either cigarettes or third aid kits and is stopping</b>";
		return;
	}
	if(qty > 0) {
		if(cigs_used) {
			GM_post("/index.php?p=inventory&a=consume", "med_inv[0]="+aidnum+"&qty[0]=&action=Consume Item(s) >>>", function(responseText) {multismoke(responseText, cignum, aidnum, qty, data);});
		} else {
			GM_post("/index.php?p=inventory&a=use", "inv="+cignum+"&qty="+(qty > 90 ? 90 : qty)+"&action=Use It", function(responseText) {multismoke(responseText, cignum, aidnum, qty, data);});
		}
	} else {
		data.fieldset.caption("WHAT HAPPENED???");
		data.fieldset.newcell().innerHTML = "<b>Done</b>";
	}
}
	

function get_multiuse_item_name(button) {
	var textnode = document.evaluate('./ancestor::td[1]/b/text()', button, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if(textnode) {
		return textnode.data;
	}
	return null;
}

function save_food_and_drink() {
	var fselect = document.evaluate('//select[starts-with(@name, "food_inv[")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var dselect = document.evaluate('//select[starts-with(@name, "drink_inv[")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var foodname = get_item_name(fselect);
	var drinkname = get_item_name(dselect);

	if(foodname) {
		GM_setValue('food', foodname);
	}
	if(drinkname) {
		GM_setValue('drink', drinkname);
	}
}

function get_item_name(select) {
	if(select) {
		var optvalue = select.options[select.selectedIndex].text;
		var re;
		if(re = /^(.*) \(\d+\)\s*$/.exec(optvalue)) {
			return re[1];
		}
	}
}

function get_favorite_food() {
	var food = GM_getValue('food', false);
	if(food) {
		for (var i in unsafeWindow.food_items) {
			if(unsafeWindow.food_items[i].search(food + " \\(") == 0) {
				return i;
			}
		}
	}
}

function get_favorite_drink() {
	var drink = GM_getValue('drink', false);
	if(drink) {
		for (var i in unsafeWindow.drink_items) {
			if(unsafeWindow.drink_items[i].search(drink + " \\(") == 0) {
				return i;
			}
		}
	}
}

function select_item(ev, thing, id) {
	var selectnum = unsafeWindow.inputs;
	var select;
	
	ev.preventDefault();
	unsafeWindow.addConsumeInput(thing);
	if(select = document.getElementById("inv["+selectnum+"]")) {
		select.value = id;
	}
}

function add_food_links(span) {
	var food_id = get_favorite_food();
	var drink_id = get_favorite_drink();

	if(food_id) {
		var flink = document.createElement('a');
		flink.innerHTML = GM_getValue('food');
		flink.href = "/index.php?p=inventory&a=consumables";
		flink.addEventListener('click', function(ev){select_item(ev, "food", food_id);}, false);
		span.appendChild(flink);
	}
	if(drink_id) {
		var dlink = document.createElement('a');
		dlink.innerHTML = GM_getValue('drink');
		dlink.href = "/index.php?p=inventory&a=consumables";
		dlink.addEventListener('click', function(ev){select_item(ev, "drink", drink_id);}, false);
		if(food_id) {
			span.appendChild(document.createTextNode(", "));
		}
		span.appendChild(dlink);
	}
}

function add_use_all_link() {
	var insert_after = document.evaluate('//b[text()="USE STUFF"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var confirm_span;
	var link;
	var b;
	if(insert_after) {
		b = document.createElement('b');
		link = document.createElement('a');
		link.href = document.location.href;
		link.innerHTML = "USE IOTMs";
		link.setAttribute("style", insert_after.getAttribute("style"));
		link.addEventListener("click", use_all_iotms, false);
		confirm_span = make_iotm_confirm_span(insert_after.getAttribute("style"));
		confirm_span.style.display = "none";
		link.addEventListener("contextmenu", function(ev) {ev.stopPropagation(); ev.preventDefault(); toggle_visibility(confirm_span);}, false);
		b.appendChild(document.createTextNode(" - "));
		b.appendChild(link);
		b.appendChild(confirm_span);
		insert_after.parentNode.insertBefore(b, insert_after.nextSibling);
	} else {
		GM_log("didn't find insert_after");
	}
}

function toggle_visibility(elem) {
	if(elem.style.display == "none") {
		elem.style.display = "";
	} else {
		elem.style.display = "none";
	}
}

function make_iotm_confirm_span(style) {
	var span = document.createElement('span');
	var items_found = false;
	var table = document.createElement('table');
	var cellcount = 0;
	var row;
	table.setAttribute("style", style);
	for(var itemname in iotms) {
			if(get_item_number(itemname) > 0) {
				var cell = document.createElement('td');
				if((cellcount % 3) == 0) {
					row = document.createElement('tr');
					table.appendChild(row);
				}
				row.appendChild(cell);
				cellcount++;
				var chk = document.createElement('input');
				chk.type = "checkbox";
				if(iotms_confirmed[itemname] == undefined) {
					iotms_confirmed[itemname] = iotms[itemname][3];
				}
				chk.checked = iotms_confirmed[itemname];
				chk.name = itemname;
				chk.addEventListener("click", iotm_confirm_click, false);
				cell.appendChild(chk);
				cell.appendChild(document.createTextNode(itemname+" "));
				items_found = true;
			}
	}
	if(!items_found) {
		span.innerHTML = "";
	} else {
		span.appendChild(table);
	}
	return span;
}
			

function iotm_confirm_click(ev) {
	var chk = ev.target;
	if(chk.checked) {
		iotms_confirmed[chk.name] = true;
	} else {
		iotms_confirmed[chk.name] = false;
	}
	GM_setValue("iotms_confirmed", iotms_confirmed.toSource());
}

function use_all_iotms(ev) {
	var fieldset = new SSWFieldset();
	var itemdata = new Array();
	var usable = new Array();
	ev.preventDefault();
	fieldset.clear();
	fieldset.caption("Using IOTMs");
	for(var itemname in iotms) {
		var num = get_item_number(itemname);
		if(num > 0) {
//			if(iotms[itemname][3] || iotms_confirmed[itemname]) {
			if(iotms_confirmed[itemname]) {
				itemdata.push([itemname, num]);
			}
		}
		usable.push(itemname);
	}
	if(itemdata.length > 0) {
		use_all_iotms_main(fieldset, itemdata, 0, "");
	} else {
		fieldset.newcell().innerHTML = "<b>I did not find any items I can use in your inventory.</b><br>The script is either broken (possibly due to a layout change), misconfigured, or you don't actually have any IOTMs that this script uses.  This script can use the following items:<br>"+usable.join("<br>")+"<br>If you have some of these items then right click on the 'USE IOTMs' link to see if the script is configured to use them.  If right clicking on the link doesn't do anything then the script is broken (assuming that you have some of these items).";
	}
}

function use_all_iotms_main(fieldset, itemlist, timesused, responseText, cell_list) {
	var itemname = itemlist[0][0];
	var itemnum  = itemlist[0][1];
	var rows = get_response_rows(responseText);
	var rowstart = (timesused == 1 ? 0 : iotms[itemname][1]);
	var re;

	if(timesused == 0 || !cell_list) {
		cell_list = new Object();
	}

	for(var i = 0; i < rows.length; i++) {
		var skip_this = false;
		var used_item_name = "";
		if(re = /You have (?:used|rubbed) your[^\d]+(\d+) times? today/.exec(rows[i])) {
			timesused = parseInt(re[1], 10);
			if(timesused < iotms[itemname][0]) {
				skip_this = iotms[itemname][2];
				rows[i] = rows[i].replace(/You have (?:used|rubbed) your[^\d]+\d+ times? today\./, "");
			}
		}
		if(re = /Giving\s+(\d+)\s+([^<>\r\n]*)\./.exec(rows[i])) {
			used_item_name = re[2].replace(/s$/, "");
			if(cell_list[used_item_name]) {
				var received = parseInt(re[1], 10);
				var cell = cell_list[used_item_name];
				var newhtml = cell.innerHTML;
				var old_received = 0;
				var have = 0;
				if(re = /Giving\s+(\d+)/.exec(newhtml)) {
					old_received = parseInt(re[1], 10);
				}
				if(re = /Now you have\s+(\d+)/.exec(rows[i])) {
					have = parseInt(re[1], 10);
				}
				newhtml = newhtml.replace(/Giving\s+\d+/, "Giving "+(old_received+received)).replace(/Now you have\s+\d+/, "Now you have "+have);
				cell.innerHTML = newhtml;
				skip_this = true;
			}
		}
		if((rows[i].indexOf("You feel luckier!") > -1) && (timesused < iotms[itemname][0])) {
			skip_this = true;
		}
		if(i >= rowstart && !skip_this) {
			var cell = fieldset.newcell();
			cell.innerHTML = rows[i];
			if(used_item_name) {
				cell_list[used_item_name] = cell;
			}
		}
	}
	if(timesused >= iotms[itemname][0]) {
		itemlist.shift();
		timesused = 0;
		cell_list = new Object();
	}
	if(itemlist.length > 0) {
		itemname = itemlist[0][0];
		itemnum  = itemlist[0][1];
		fieldset.caption("Using " + itemname + " ("+(timesused+1)+"/"+iotms[itemname][0]+")");
		if(itemnum > 0) {
			GM_post("/index.php?p=inventory&a=use", "inv="+itemnum+"&qty=1&action=Use It", function(rt) {use_all_iotms_main(fieldset, itemlist, timesused+1, rt, cell_list);});
		} else {
			var cell = fielset.newcell();
			cell.innerHTML = "Error: Unable to find item number for "+itemname+"<br>Terminating";
		}
	} else {
		fieldset.caption("WHAT HAPPENED???");
		fieldset.newcell().innerHTML = "<b>Finished using IOTMs</b>";
	}
}

function get_response_rows(responseText) {
	var rows = new Array();
	var re;
//	if(re = /<FIELDSET[^>]+CLASS="results"[\s\S]*?<table[\s\S]*?<table[^>]*([\s\S]*?)<\/table/i.exec(responseText)) {
	if(re = /<FIELDSET[\s\S]*?<\/FIELDSET/i.exec(responseText)) {
		if(re = /<table[\s\S]*?<table[^>]*([\s\S]+)<\/table[\s\S]*?<\/table/i.exec(re[0])) {
			var table = document.createElement('table');
			table.innerHTML = re[1];
			for(var i = 0; i < table.rows.length; i++) {
				rows.push(table.rows[i].cells[0].innerHTML);
			}
		}
	}
	return rows;
}

function get_item_number(itemname) {
	var inv = document.evaluate('//b[text()="'+itemname+'"]/ancestor::td[1]//input[@name="inv"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if(inv) {
		return inv.value;
	}
	return -1;
}

function SSWFieldset() {
	this.fieldset = document.evaluate('//fieldset[@class="results"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	this.cells = new Object();

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

	this.newcell = function(cellname) {
		var cell;
		cell = this.table.insertRow(this.table.rows.length).insertCell(0);
		if(this.table.rows.length % 2) {
			cell.style.backgroundColor = "rgb(204, 204, 204)";
		} else {
			cell.style.backgroundColor = "rgb(238, 238, 238)";
		}
		if(cellname && (typeof(this.cells[cellname]) == "undefined")) {
			this.cells[cellname] = cell;
		}
		return cell;
	}

	this.cell = function(cellname) {
		return this.cells[cellname];
	}
	
	this.clear = function() {
		while(this.table.rows.length > 0) {
			this.table.deleteRow(0);
		}
	}
}

function GM_post( dest, vars, callback, external) {
	var theHost = (external)?"":document.location.host;
	if(GM_getValue('debug',false)){ 
		GM_log("dest " + dest);
		GM_log("var " + vars);
		GM_log("fn: "+callback.name);
		GM_log("caller "+GM_post.caller.name);
	}
	 GM_xmlhttpRequest({
	    method: 'POST',
	    url: 'http://'+theHost + dest,
	    headers: {'Content-type': 'application/x-www-form-urlencoded'},
			data: vars,
			onload:function(details) {
				if( typeof callback=='function' ){
					callback( details.responseText);
				}
			}
	});
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

function GM_post( dest, vars, callback, external) {
	var theHost = (external)?"":document.location.host;
	if(GM_getValue('debug',false)){ 
		GM_log("dest " + dest);
		GM_log("var " + vars);
		GM_log("fn: "+callback.name);
		GM_log("caller "+GM_post.caller.name);
	}
	 GM_xmlhttpRequest({
	    method: 'POST',
	    url: 'http://'+theHost + dest,
	    headers: {'Content-type': 'application/x-www-form-urlencoded'},
			data: vars,
			onload:function(details) {
				if( typeof callback=='function' ){
					callback( details.responseText);
				}
			}
	});
}
