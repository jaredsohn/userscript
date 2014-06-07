// ==UserScript==
// @name           SSW Secure Storage & Display Case Helper
// @namespace      http://homeworlds.secretsocietywars.com/nardo
// @description    Lets you easily grab an item out of storage
// @include        http://www.secretsocietywars.com/index.php?p=inventory&a=storage*
// @include        http://www.secretsocietywars.com/index.php?p=inventory&a=transfer_stor*
// @include        http://www.secretsocietywars.com/index.php?p=inventory&a=collection*
// @include        http://www.secretsocietywars.com/index.php?p=inventory&a=transfer_dc*
// ==/UserScript==

var dc_items;
var ss_items;
var add_inv;
var add_dc;
var inv;
var dc;

var inv_span;
var dc_span;


dc_items = document.evaluate('//td[@class="main"]//img[contains(@onclick, "examine=dc&id=")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
ss_items = document.evaluate('//td[@class="main"]//img[contains(@onclick, "examine=ss&id=")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

add_inv = document.evaluate('//td[@class="main"]//a[@href="javascript:addlistinv();"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
add_dc = document.evaluate('//td[@class="main"]//a[@href="javascript:addlistdc();"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;


displaycase(dc_items);
securestorage(ss_items);

add_inv.addEventListener('click', new_addlistinv, false);
add_dc.addEventListener('click', new_addlistdc, false);

inv = document.getElementsByName('howmanyinv[]');
dc  = document.getElementsByName('howmanydc[]');
for(var i = 0; i < inv.length; i++) {
	inv[i].value = "";
}
for(var i = 0; i < dc.length; i++) {
	dc[i].value = "";
}

setup_quick_transfer();

function displaycase(items) {
	make_item_links(items, "transfer_dc", "<<< DC to INV");
}

function securestorage(items) {
	make_item_links(items, "transfer_stor", "<<< STORAGE to INV");
}

function make_item_links(items, url_a, action_text) {
	for(var i = 0; i < items.snapshotLength; i++) {
		var table = find_parent(items.snapshotItem(i), "TABLE");
		var row;
		var cell;
		var take = document.createElement('a');
		var item_id;
		var re;

		cell = table.rows[table.rows.length - 1].cells[0];
		row = table.insertRow(table.rows.length - 1);
		cell = row.insertCell(0);
		cell.align = "center";
		take.style.cursor = "pointer";
		take.style.fontWeight = "bold";
		take.style.textDecoration = "underline";
		take.style.color = "rgb(0, 0, 255)";
		take.style.fontSize = "10px";
		take.innerHTML = "Take";
		cell.appendChild(take);
		if(re = /&id=(\d+)/.exec(items.snapshotItem(i).getAttribute('onclick'))) {
			add_take_listener(take, re[1], url_a, action_text);
		}
	}
}

function add_take_listener(take, itemnum, url_a, action_text) {
	take.addEventListener('click', function(ev) {take_item(itemnum, url_a, action_text, "", "dc");}, false);
	take.addEventListener('contextmenu', function(ev) {ev.preventDefault(); ev.stopPropagation(); take_item(itemnum, url_a, action_text, 1, "dc");}, false);
}

function take_item(item_num, url_a, action_text, howmany, suffix) {
	var form   = document.createElement('form');
	var item   = document.createElement('input');
	var num    = document.createElement('input');
	var action = document.createElement('input');

	form.action = "http://www.secretsocietywars.com/index.php?p=inventory&a=" + url_a;
	form.method = "post";
	item.name  = suffix + "[]";
	item.value = item_num;
	item.type  = "hidden";
	num.name  = "howmany" + suffix + "[]";
	num.value = howmany;
	num.type  = "hidden";
	action.name  = "action";
	action.value = action_text;
	action.type  = "hidden";
	form.appendChild(item);
	form.appendChild(num);
	form.appendChild(action);
	document.body.appendChild(form);
	form.submit();
}

function new_addlistinv(ev) {
	ev.preventDefault();
	addlist("inv");
}

function new_addlistdc(ev) {
	ev.preventDefault();
	addlist("dc");
}

function addlist(listname) {
	var span;
	var last_select;
	var first = false;
	
	for(var i = 2; i <= 33; i++) {
		if(document.getElementById(listname + i).innerHTML.length < 1) {
			var div;
			span = document.getElementById(listname + i);
			if(document.getElementById(listname + (i-1))) {
				div = document.getElementById(listname + (i-1));
				last_select = document.evaluate('./select[@name="'+listname+'[]"]', div, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
			} else {
				last_select = document.getElementsByName(listname + "[]")[0];
				first = true;
			}
			break;
		}
	}

	if(span) {
		var existing_selects = document.getElementsByName(listname + "[]");
		var sel = copy_select(existing_selects[0]);
		var textbox = document.createElement('input');
		textbox.type = "text";
		textbox.size = "2";
		textbox.value = "";
		textbox.name = "howmany" + listname + "[]";
		if(last_select && ((last_select.selectedIndex > 0) || first)) {
			var idx = last_select.selectedIndex + 1;
			while((sel.options.length > idx) && (sel.options[idx].style.color == "rgb(102, 0, 0)")) {
				idx++;
			}
			if(sel.options.length > idx) {
				sel.selectedIndex = idx;
			}
		}
		span.appendChild(textbox);
		span.appendChild(sel);
	} else {
		alert('33 is enough.');
	}
}

function copy_select(sel) {
	var new_sel = document.createElement('select');
	
	new_sel.name = sel.name;
	new_sel.setAttribute("style", sel.getAttribute("style"));
	for(var i = 0; i < sel.options.length; i++) {
		var opt = document.createElement('option');
		opt.value = sel.options[i].value;
		opt.text  = sel.options[i].text;
		opt.setAttribute("style", sel.options[i].getAttribute("style"));
		new_sel.add(opt, null);
	}
	return new_sel;
}

function setup_quick_transfer() {
	var qt_link = document.createElement('a');
	var items = eval(GM_getValue('quicktransfer', '["Bofhozonite Ore"]'));

	if(!inv_span) {
		inv_span = make_qt_span(0);
	}
	if(!dc_span) {
		dc_span  = make_qt_span(1);
	}
	
	inv_span.innerHTML = "";
	dc_span.innerHTML = "";
	
	qt_link.innerHTML = "[ Quick Transfer ]";
	qt_link.style.color = "rgb(102, 0, 0)";
	qt_link.style.cursor = "pointer";
	qt_link.style.fontWeight = "bold";
	qt_link.style.fontSize = "10px";
	qt_link.addEventListener('click', qt_configure, false);

	inv_span.appendChild(qt_link);
	
	for(var i = 0; i < items.length; i++) {
		var newlink = document.createElement('a');
		
		newlink.innerHTML = items[i];
		newlink.style.color = "rgb(0, 0, 255)";
		newlink.style.cursor = "pointer";
		newlink.style.fontWeight = "bold";
		newlink.style.fontSize = "10px";
		add_qt_listener(newlink, items[i]);
		inv_span.appendChild(document.createTextNode(" "));
		inv_span.appendChild(newlink);
	}
}

function add_qt_listener(obj, itemname) {
	obj.addEventListener('click', function(ev) {qt_transfer_to_dc(itemname, "");}, false);
	obj.addEventListener('contextmenu', function(ev) {ev.preventDefault(); ev.stopPropagation(); qt_transfer_to_dc(itemname, 1);}, false);

}

function qt_transfer_to_dc(itemname, howmany) {
	var itemnum = qt_find_item_num(itemname, "inv");
	var url_a;
	var action_text;
	
	if((document.location.href.indexOf('a=storage') > 0) ||
	   (document.location.href.indexOf('a=transfer_stor') > 0)) {
		url_a = "transfer_stor";
		action_text = "INV to STORAGE Shelf >>>"
	} else {
		url_a = "transfer_dc";
		action_text = "INV to DC Shelf >>>";
	}
	if(itemnum) {
		take_item(itemnum, url_a, action_text, howmany, "inv");
	} else {
		alert("Sorry, I can't find the item number for the " + itemname);
	}
}

function qt_find_item_num(itemname, listname) {
	var sels = document.getElementsByName(listname + "[]");
	var partial_match;
	var whole_match;
	
	itemname = String.toLowerCase(itemname);

	for(var i = 0; i < sels[0].options.length; i++) {
		var opt = sels[0].options[i];
		var txt = String.toLowerCase(opt.text);

		txt = txt.replace(/\s+\(\d+\)\s*$/, "");

		if(txt == itemname) {
			whole_match = opt.value;
			break;
		} else if(!partial_match && (txt.indexOf(itemname) > -1)) {
			partial_match = opt.value;
		}
	}
	if(whole_match) {
		return whole_match;
	}
	return partial_match;
}

function qt_configure(ev) {
	var items = eval(GM_getValue('quicktransfer', '["Bofhozonite Ore"]'));
	var new_items;
	
	new_items = prompt("Please enter a comma separated list of items", items.join(', '));
	if(new_items != null) {
		items = new_items.split(/\s*,\s*/);
		GM_setValue('quicktransfer', items.toSource());
		setup_quick_transfer();
	}
}

function make_qt_span(num) {
	var shelf_ids = document.getElementsByName('shelf_id');
	var div = document.createElement('div');
	var td;

	td = find_parent(shelf_ids[num], "TD");
	td.appendChild(div);
	div.style.textAlign = "left";
	return div;
}
	

function find_parent(node, nodetype) {
	while(node && (node.nodeName != nodetype)) {
		node = node.parentNode;
	}
	return node;
}

