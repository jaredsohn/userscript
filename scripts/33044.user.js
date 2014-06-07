// ==UserScript==
// @name           SSW Withdraw All
// @namespace      http://homeworlds.secretsocietywars.com/nardo
// @description    Withdraws all of the production from a facility
// @include        http://www.secretsocietywars.com/index.php?p=space*
// @include        http://www.secretsocietywars.com/index.php?p=pvp*
// @include        http://www.secretsocietywars.com/index.php?p=facilities&a=facility&id=*
// ==/UserScript==

var heal_threshold = GM_getValue("threshold", 2);
var withdraw_spans = new Array();
var manage_text = document.evaluate('//a//text()[contains(., "MANAGE FACILITY")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var deposit_cell = document.evaluate('//input[@type="submit"][@value="DEPOSIT"]//ancestor::td[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
var deposit_span;
var deposit_textbox;
//var facility_cells = document.evaluate('//text()[contains(., "Mining Colony #") or contains(., "Drone Factory #")]//ancestor::table[2]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
var facility_cells = document.evaluate('//text()[contains(., "Owner:")]//following-sibling::a[contains(@href, "index.php?p=records&a=view_player")]//ancestor::table[1]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
var main_withdraw_link;
var heal_too = false;
var recharge_too = false;
var deposit_too = false;
var action_type = GM_getValue("action", 4);

/* subtract 1 from action_type, then:
000 - withdraw
001 - withdraw + heal
010 - withdraw + recharge
011 - withdraw + heal + recharge
100 - withdraw + deposit
101 - withdraw + heal + deposit
110 - withdraw + recharge + deposit
111 - withdraw + heal + recharge + deposit
*/

action_type = GM_getValue("new_action", action_type-1);

if(action_type & 1) {
	heal_too = true;
}
if(action_type & 2) {
	recharge_too = true;
}
if(action_type & 4) {
	deposit_too = true;
}

GM_setValue("threshold", heal_threshold);

for(var i = 0; i < manage_text.snapshotLength; i++) {
	var manage_link = find_parent(manage_text.snapshotItem(i), "A");
	var parent_table = find_parent(manage_text.snapshotItem(i), "TABLE");

	if(manage_link) {
		var span = document.createElement('span');
		var withdraw_link;
		var parent_cell;
		var id;
		var re;
		
		
		if(re = /&id=(\d+)/.exec(manage_link.href)) {
			id = re[1];
		}
		withdraw_link = document.createElement('a');
		withdraw_link.setAttribute("style", manage_link.getAttribute("style"));
		withdraw_link.style.cursor = "pointer";
		withdraw_link.appendChild(document.createTextNode("WITHDRAW ALL"));
		withdraw_link.href = manage_link.href;
		span.appendChild(withdraw_link);
		add_span_callback(span, id);
		parent_cell = find_parent(manage_link, "TD");
		parent_cell.appendChild(document.createElement('br'));
		parent_cell.appendChild(span);
		if(parent_table.innerHTML.indexOf("Drone Factory") > -1) {
			withdraw_spans.splice(0, 0, [id,span]);
		} else {
			withdraw_spans.push([id,span]);
		}
	}
}
if(manage_text.snapshotLength > 0) {
	var facilities_link = document.evaluate('//a[contains(@href, "index.php?p=facilities&a=facilities")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

	if(facilities_link) {
		var span = document.createElement('span');

		main_withdraw_link = document.createElement('a');
		main_withdraw_link.innerHTML = "withdraw all";
		if(heal_too) {
			main_withdraw_link.innerHTML += " + heal";
		}
		if(recharge_too) {
			main_withdraw_link.innerHTML += " + recharge";
		}
		if(deposit_too) {
			main_withdraw_link.innerHTML += " + deposit";
		}
		main_withdraw_link.setAttribute("style", facilities_link.getAttribute("style"));
		main_withdraw_link.style.cursor = "pointer";
		main_withdraw_link.href = document.location.href;
		main_withdraw_link.addEventListener('click', withdraw_all, false);
		main_withdraw_link.addEventListener('contextmenu', toggle_heal, false);
		span.appendChild(main_withdraw_link);
		span.appendChild(document.createTextNode(" | "));
		facilities_link.parentNode.insertBefore(span, facilities_link);
	}
}

if(deposit_cell) {
	deposit_span = make_deposit_span();
	deposit_cell.insertBefore(deposit_span, deposit_cell.firstChild);
}

if(facility_cells.snapshotLength > 0) {
	var celldata = new Array();
	var re;
	for(var i = 0; i < facility_cells.snapshotLength; i++) {
		var cell = new Object();
		var cellhtml;
		var parent_table = document.evaluate('./ancestor::table[1]', facility_cells.snapshotItem(i), null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		cell.obj = facility_cells.snapshotItem(i);
		cellhtml = cell.obj.innerHTML;
		if(cellhtml.indexOf("Drone Factory") > -1) {
			cell.factory = true;
		} else {
			cell.factory = false;
		}
		if(cellhtml.indexOf("MANAGE FACILITY") > -1) {
			cell.mine = true;
		} else {
			cell.mine = false;
		}
		if(re = /"([^\s]+)\s+is the owner/.exec(cellhtml)) {
			cell.owner = re[1].toLowerCase();
		} else {
			cell.owner = "zzz";
		}
		if(re = /(?:Factory|Colony)\s+#(\d+)/.exec(cellhtml)) {
			cell.num = parseInt(re[1]);
		} else {
			cell.num = 0;
		}
		celldata.push(cell);
	}
	celldata.sort(sortfactories);
	for(var i = 0; i < celldata.length; i++) {
		var cell = parent_table.rows[parseInt(i/2)].cells[i%2];
		if(celldata[i].obj != cell.firstChild) {
			if(cell.firstChild) {
				cell.replaceChild(celldata[i].obj, cell.firstChild);
			} else {
				cell.appendChild(celldata[i].obj);
			}
		}
	}
	add_facility_num_info(celldata);
}

function add_facility_num_info(celldata) {
	var num_facilities = celldata.length;
//	var toprow = document.evaluate('//a[contains(@href, "p=facilities&a=create")]/text("create facility")/ancestor::tr[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var toprow = document.evaluate('//a[contains(@href, "p=facilities&a=create") and text()="create facility"]/ancestor::tr[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var table = toprow.parentNode;
	var newrow = table.insertRow(toprow.rowIndex+1);
	var newcell = newrow.insertCell(0);
	newcell.colSpan = 2;
	newcell.innerHTML = "There are " + celldata.length + " facilities here.";
	if(celldata.length < 33) {
		newcell.style.color = "white";
	} else if(celldata.length == 33) {
		newcell.style.color = "rgb(255, 64, 64)";
	} else {
		var last_builder = get_last_builder(celldata);
		newcell.style.color = "rgb(255, 64, 64)";
		newcell.innerHTML += "  Shame on you, "+get_last_builder(celldata);
	}
}

function get_last_builder(celldata) {
	var max = 0;
	var name = "unknown";
	for(var i = 0; i < celldata.length; i++) {
		if(celldata[i].num > max) {
			max = celldata[i].num;
			name = celldata[i].owner;
		}
	}
	return name;
}

function toggle_heal(ev) {
	var linktext = "withdraw all";
	ev.preventDefault();
	ev.stopPropagation();

	action_type++;
	if(action_type > 7) {
		action_type = 0;
	}
	GM_setValue("new_action", action_type);
	heal_too = false;
	recharge_too = false;
	deposit_too = false;
	if(action_type & 1) {
		heal_too = true;
		linktext += " + heal";
	}
	if(action_type & 2) {
		recharge_too = true;
		linktext += " + recharge";
	}
	if(action_type & 4) {
		deposit_too = true;
		linktext += " + deposit";
	}
	main_withdraw_link.innerHTML = linktext;
}

function sortfactories(a, b) {
	if(a.mine != b.mine) {
		return (a.mine ? -1 : 1);
	} else if(a.factory != b.factory) {
		return (a.factory ? -1 : 1);
	} else if(a.owner != b.owner) {
		return (a.owner < b.owner ? -1 : 1);
	} else {
		return (a.num - b.num);
	}
}

function make_deposit_span() {
	var span = document.createElement('div'); /* not a span anymore */
	var btn = document.createElement('input');
	var total = GM_getValue("deposit_value", "");

	span.align = "center";
	deposit_textbox = document.createElement('input');
	deposit_textbox.type = "text";
	deposit_textbox.size = 3;
	deposit_textbox.value = total;
	deposit_textbox.addEventListener("keydown", capture_enter, false);
	btn.type = "button";
	btn.value = "GO";
	btn.style.fontSize = "10px";
	btn.addEventListener("click", function() {deposit_ore(1);}, false);
	span.appendChild(document.createTextNode("Deposit "));
	span.appendChild(deposit_textbox);
	span.appendChild(document.createTextNode(" ore "));
	span.appendChild(btn);
	return span;
}

function capture_enter(ev) {
	if(ev.which == 13) {
		ev.preventDefault();
		deposit_ore(1);
		return false;
	}
	return true;
}

function deposit_ore(orenum) {
	var factory_num = find_factory_number();

	if(orenum == 1) {
		GM_setValue("deposit_value", deposit_textbox.value);
	}

	if(factory_num) {
		var vars = new Array();
		var var_string;
		var re;
		var submit = true;
//		vars.push("inputqty="+deposit_textbox.value);
		vars.push("action=deposit_input");
		vars.push("inputslot="+orenum);
		vars.push("submit=GO");
		if(orenum <= 3) {
			var_string = vars.join("&");
			if(re = /^\s*\+\s*(\d+)/.exec(deposit_textbox.value)) {
				var qty = parseInt(re[1], 10) - orestored(orenum);
				if(qty > 0) {
					var_string += "&inputqty="+qty;
					deposit_span.innerHTML = "Adding " + qty + " " + orename(orenum)+"...";
				} else {
					submit = false;
				}
			} else {
				var_string += "&inputqty="+deposit_textbox.value;
				deposit_span.innerHTML = "Adding "+deposit_textbox.value+" "+orename(orenum)+"...";
			}
			if(submit) {
				GM_post("/index.php?p=facilities&a=facility&id="+factory_num, var_string, function(responseText) {parse_ore_deposit(responseText, orenum);});
			} else {
				deposit_ore(orenum+1);
			}
		} else {
			var oldspan = deposit_span;
			deposit_span = make_deposit_span();
			oldspan.parentNode.replaceChild(deposit_span, oldspan);
		}
	}
}

function parse_ore_deposit(responseText, orenum) {
	var re;
	if(re = /Your facility now has ([\d,]+) of the raw material/.exec(responseText)) {
		update_inventory(orenum, re[1]);
	}
	deposit_ore(orenum+1);
}

function update_inventory(orenum, amount) {
	var tables = document.evaluate('//input[@type="submit"][@value="DEPOSIT"]//ancestor::table[1]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var re;
	if(tables.snapshotLength >= orenum) {
		tables.snapshotItem(orenum-1).innerHTML = tables.snapshotItem(orenum-1).innerHTML.replace(/Qty Stored:\s+[\d,]+/, "Qty Stored: " + amount);
		tables.snapshotItem(orenum-1).style.backgroundColor = "";
		tables.snapshotItem(orenum-1).rows[0].cells[1].style.color = "black";
	}
}

function orename(num) {
	var cells = document.evaluate('//input[@type="submit"][@value="DEPOSIT"]//ancestor::td[1]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var re;
	if(cells.snapshotLength >= num) {
		if(re = /([^\s>]+)\s+Ore/.exec(cells.snapshotItem(num-1).innerHTML)) {
			return re[1];
		}
	}
	return "unknown"+num;
}

function orestored(num) {
	var cells = document.evaluate('//input[@type="submit"][@value="DEPOSIT"]//ancestor::td[1]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var re;
	if(cells.snapshotLength >= num) {
		if(re = /Qty Stored:\s*([\d,]+)/.exec(cells.snapshotItem(num-1).innerHTML)) {
			return parseInt(re[1].replace(/,/g, ""), 10);
		}
	}
	return 0;
}

function find_factory_number() {
	var re;
	if(re = /Manage Drone Factory #(\d+)/.exec(document.body.innerHTML)) {
		return parseInt(re[1]);
	}
	return 0;
}

function withdraw_all(ev) {
	ev.preventDefault();
	for(var i = 0; i < withdraw_spans.length; i++) {
//		withdraw_from(withdraw_spans[i][0], withdraw_spans[i][1]);
		withdraw("", withdraw_spans[i][0], withdraw_spans[i][1]);
	}
}

function add_span_callback(span, id) {
//	span.addEventListener('click', function(ev) {ev.preventDefault(); withdraw_from(id, this);}, true);
	span.addEventListener('click', function(ev) {ev.preventDefault(); withdraw("", id, this);}, true);
}


function withdraw_from(id, span) {
	span.innerHTML = "Withdrawing...";
	GM_get("/index.php?p=facilities&a=facility&id="+id, function(responseText) {withdraw(responseText, id, span);});
}

function withdraw(responseText, id, span) {
	var qty;
	var post_url;
	var item_name;
	var re;

	span.style.fontColor = "rgb(255, 220, 220)";

	if(re = /ACTION="[^"]*(\/index.php\?p=facilities&a=facility&id=\d+)"/.exec(responseText)) {
		post_url = re[1];
	} else {
		post_url = "/index.php?p=facilities&a=facility&id="+id;
	}

	if(re = /<B>([^<]+)<\/B>\s*<BR>\s*Qty\s+Available:\s*([\d,]+)/.exec(responseText)) {
		item_name = re[1];
		qty = parseInt(re[2].replace(/,/g, ""));
	} else {
		item_name = "x";
		qty = 999999;
	}
	if(post_url && item_name && qty) {
		if(item_name == "x") {
			span.innerHTML = "Withdrawing...";
		} else {
			span.innerHTML = "Taking " + qty + " " + item_name + "..";
		}
		GM_post(post_url, "withdrawqty="+qty+"&action=withdraw_output&submit=GO", function(responseText) {withdraw_final(responseText, id, span);});
	} else if(post_url && item_name && (qty == 0)) {
		span.innerHTML = "Nothing to withdraw";
	} else {
		/* Error parsing responseText */
		span.innerHTML = "Error, unable to withdraw";
	}
}

function withdraw_final(responseText, id, span) {
	var re;
	if(re = /You withdraw\s+([\d,]+)\s+(?:Chunks of )?(.*?)!/.exec(responseText)) {
		span.innerHTML = "Withdrew " + re[1] + " " + re[2];
		if(heal_too) {
			heal(responseText, id, 1, 0, span, "Withdrew " + re[1] + " " + re[2]);
		} else if(recharge_too) {
			charge_shields(responseText, id, span, span.innerHTML);
		} else if(deposit_too) {
			autodeposit(responseText, id, 1, span, span.innerHTML);
		}
	} else {
		span.innerHTML = "Nothing to withdraw";
		if(heal_too) {
			heal(responseText, id, 1, 0, span, "Nothing to withdraw");
		} else if(recharge_too) {
			charge_shields(responseText, id, span, span.innerHTML);
		} else if(deposit_too) {
			autodeposit(responseText, id, 1, span, span.innerHTML);
		} else {
			span.style.fontColor = "";
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

function find_parent(node, nodetype) {
	while(node && (node.nodeName != nodetype)) {
		node = node.parentNode;
	}
	return node;
}

function heal(responseText, id, doppel_num, kits_used, span, endtext) {
	var post_url;
	var re;
	var doppelpet_name;

	if(re = /ACTION="[^"]*(\/index.php\?p=facilities&a=facility&id=\d+)"/.exec(responseText)) {
		post_url = re[1];
	} else {
		post_url = "/index.php?p=facilities&a=facility&id="+id;
	}
	if(re = /Taking\s+(\d+)\s+DoppelPet First Aid Kit/.exec(responseText)) {
		kits_used += parseInt(re[1]);
	}
	if(doppel_num > 1) {
		if(re = /COMBINED DP HEALTH[\s\S]*?<DIV[^>]+>\s*<DIV[^>]+width:(\d+%)/i.exec(responseText)) {
			var health_div = document.evaluate('./preceding-sibling::table[1]//div[contains(@title, "This facility\'s doppelpets")]/div', span, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
			if(health_div) {
				health_div.style.width = re[1];
			} else {
				alert("can not find health div");
			}
		}
	}
	while((doppel_num <= 3) && !(doppelpet_name = get_doppelpet_name(doppel_num, responseText))) {
		doppel_num++;
	}
	if(doppelpet_name) {
		span.innerHTML = endtext + "<br>Healing " + doppelpet_name + "...";
		GM_post(post_url, "action=heal&dpslot="+doppel_num+"&submit=HEAL&method=medkit", function(responseText) {heal(responseText, id, doppel_num+1, kits_used, span, endtext);});
	} else {
		span.innerHTML = endtext + "<br>Used " + kits_used + (kits_used == 1 ? " Medkit" : " Medkits");
		if(recharge_too) {
//			charge_shields(responseText, id, span, "<br>Used " + kits_used + (kits_used == 1 ? " Medkit" : " Medkits"));
			charge_shields(responseText, id, span, span.innerHTML);
		} else if(deposit_too) {
			autodeposit(responseText, id, 1, span, span.innerHTML);
		} else {
			span.style.fontColor = "";
		}
	}
}

function charge_shields(responseText, id, span, endtext) {
	var current;
	var max;
	var re;
	if(re = /SHIELD HEALTH[\s\S]+?(\d+)(?:\s|&nbsp;)*\/(?:\s|&nbsp;)*(\d+)/.exec(responseText)) {
		current = parseInt(re[1]);
		max = parseInt(re[2]);
	}
	if(current < max) {
		span.innerHTML = endtext + "<br>Charging shield...";
		GM_post("/index.php?p=facilities&a=facility&id="+id, "batterytype=d&batteryqty="+(max-current)+"&action=recharge&method=battery&submit=GO", function(responseText) {charged(responseText, id, span, endtext);});
	} else {
		span.innerHTML = endtext + "<br>Shields fully charged";
		span.style.fontColor = "";
		if(deposit_too) {
			autodeposit(responseText, id, 1, span, span.innerHTML);
		}
	}
}

function charged(responseText, id, span, endtext) {
	var re;
	if(re = /Taking\s+(\d+)\s+Bo Ray /.exec(responseText)) {
		span.innerHTML = endtext + "<br>Used " + re[1] + " D " + (re[1] == "1" ? "battery" : "batteries");
	} else {
		span.innerHTML = endtext + "<br>No batteries";
	}
	if(deposit_too) {
		autodeposit(responseText, id, 1, span, span.innerHTML);
	}
}

function autodeposit(responseText, id, orenum, span, endtext, skipped_previous) {
	var deposit = GM_getValue("deposit_value", 0);
	var re;

	if(responseText.indexOf("Drone Factory") > -1) {
		if(!skipped_previous) {
			if(re = /You deposit ([\d,]+) (?:Chunks of )?([^\s]+) Ore!/.exec(responseText)) {
				if(responseText.indexOf("Poor you, now you have none.") > 0) {
					endtext += '<span style="color: red;"><br>Deposited '+re[1]+' '+re[2]+'</span>';
				} else {
					endtext += "<br>Deposited "+re[1]+" "+re[2];
				}
				span.innerHTML = endtext;
			} else if(re = /You do not have any ([^\s]+) Ore to deposit in this facility/.exec(responseText)) {
				endtext += '<span style="color: red;"><br>Out of '+re[1]+'</span>';
				span.innerHTML = endtext;
			}
		}
		if(orenum <= 3) {
			var orename;
			var ore_deposited;
			var regex = new RegExp(">([^<>]+)\\sOre.*?Qty Stored:\\s*([\\d,]+).*?raw material input "+orenum+"\\s");
			var this_deposit = deposit;
			if(re = regex.exec(responseText)) {
				orename = re[1];
				ore_deposited = re[2].replace(/,/g, "");
				if(re = /^\s*\+\s*(\d+)/.exec(deposit)) {
					this_deposit = parseInt(re[1], 10) - ore_deposited;
				}
				if(this_deposit > 0) {
					span.innerHTML = endtext + "<br>Depositing " + this_deposit + " " + orename + "...";
					GM_post("/index.php?p=facilities&a=facility&id="+id, "action=deposit_input&inputslot="+orenum+"&submit=GO&inputqty="+this_deposit, function(responseText) {autodeposit(responseText, id, orenum+1, span, endtext);});
				} else {
					endtext += "<br>Skipping " + orename;
					span.innerHTML = endtext;
					autodeposit(responseText, id, orenum+1, span, endtext, true);
				}
			}
		}
	}
}

function get_doppelpet_name(num, responseText, forced) {
	var name;
	var start;
	var end;
	start = responseText.indexOf("DP Slot "+num);
	end = responseText.indexOf("DP Slot "+(num+1));

	if(end == -1) {
		end = responseText.length-1;
	}
	if((start > -1) && (re = /Remove Mini-([^<\s]+)/.exec(responseText.substring(start, end)))) {
		name = re[1];
	}
	if(!forced) {
		if(re = /Health:\s*(\d+)\s*\/\s*(\d+)/.exec(responseText.substring(start, end))) {
			if((parseInt(re[1])+heal_threshold) >= parseInt(re[2])) {
				/* really inelegant way of preventing doppelpets at full health from getting healed */
				name = null;
			}
		}
	}
	return name;
}
