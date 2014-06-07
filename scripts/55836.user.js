// ==UserScript==
// @name           SSW Enhanced Combine
// @namespace      http://homeworlds.secretsocietywars.com/nardo
// @description    Replaces the combine interface with a better one.
// @include        http://www.secretsocietywars.com/index.php?p=inventory&a=combine
// ==/UserScript==

var d1 = document.createElement('div');
var d2 = document.createElement('div');
var sb = document.createElement('input');
var button = document.evaluate('//input[@type="submit" and @name="action" and @value="Combine"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
var combiner = new SSWCombiner(d1, d2, button, sb);
var dummy1 = document.evaluate('//select[@name="dummy1"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
var dummy2 = document.evaluate('//select[@name="dummy2"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
var sb_insert = document.evaluate('//b[text()="Inventory"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

sb.type = "text";
sb.style.fontSize = "12px";
sb.style.width = "150px";
d1.tabIndex = 10000;
d2.tabIndex = 10001;
sb.tabIndex = 10002;
d1.style.height = dummy1.offsetHeight+"px";
d1.style.width = "250px";
d1.style.overflow = "auto";
d2.style.height = dummy2.offsetHeight+"px";
d2.style.width = "250px";
d2.style.overflow = "auto";

if(dummy1 && dummy2) {
	var invlist = new Array();
	var transferlist = new Array();
	var form_buttons = document.evaluate('./ancestor::form[1]//input[@type="button"]', dummy1, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for(var i = 0; i < dummy1.options.length; i++) {
		invlist.push([dummy1.options[i].value, 0, dummy1.options[i].text]);
	}
	for(var i = 0; i < dummy2.options.length; i++) {
		invlist.push([dummy2.options[i].value, 0, dummy2.options[i].text]);
		transferlist.push(dummy2.options[i].text);
	}
	invlist.sort(function(x,y){ 
		var a = String(x[2]).toUpperCase(); 
		var b = String(y[2]).toUpperCase(); 
		if (a > b) 
			return 1 
		if (a < b) 
			return -1 
		return 0; 
	}); 
	combiner.fillinv(invlist);
	for(var i = 0; i < transferlist.length; i++) {
		combiner.increment_by_name(transferlist[i]);
	}
	dummy1.style.display = "none";
	dummy1.parentNode.insertBefore(d1, dummy1);
	dummy2.style.display = "none";
	dummy2.parentNode.insertBefore(d2, dummy2);
	sb_insert.parentNode.insertBefore(sb, sb_insert.nextSibling);
	sb_insert.textContent = "Search ";
	for(var i = 0; i < form_buttons.snapshotLength; i++) {
		form_buttons.snapshotItem(i).style.visibility = "hidden";
	}
}

function SSWCombiner(invdiv, combdiv, button, searchbox) {
	var evthis = this;
	this.invtable   = document.createElement('table');
	this.combtable  = document.createElement('table');
	this.searchbox  = searchbox;
	this.itemnames = new Array();
	this.reset_text = true;

	this.combtable.cellSpacing = 0;
	this.combtable.cellPadding = 2;
	this.invtable.cellSpacing = 0;
	this.invtable.cellPadding = 2;

	this.get_row_item_name = function(row) {
		var itemcell = row.cells[1];
		return itemcell.firstChild.firstChild.data;
	};
	
	this.divkey = function(ev) {
		var char = String.fromCharCode(ev.which).toLowerCase();
		if(/[a-z0-9 ]/.exec(char)) {
			if(evthis.reset_text) {
				evthis.searchbox.value = "";
				evthis.reset_text = false;
			}
			evthis.searchbox.value += char;
			evthis.filter(ev);
		} else if(ev.which == 8) {
			ev.preventDefault();
			if(evthis.reset_text) {
				evthis.searchbox.value = "";
				evthis.reset_text = false;
			}
			evthis.searchbox.value = evthis.searchbox.value.substr(0, evthis.searchbox.value.length-1);
			evthis.filter(ev);
		}
	};

	this.filter = function(ev) {
		var text = evthis.searchbox.value.toLowerCase();
		for(var i = 0; i < evthis.invtable.rows.length; i++) {
//			var name = this.get_row_item_name(this.invtable.rows[i]);
			var name = evthis.itemnames[i];
			if(name.indexOf(text) > -1) {
				evthis.invtable.rows[i].style.display = "";
			} else {
				evthis.invtable.rows[i].style.display = "none";
			}
		}
	};

	this.get_event_row = function(ev) {
		var row = document.evaluate('./ancestor::tr[1]', ev.target, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		return row;
	};

	this.adjust_total = function(row, adjustment) {
		var totalcell = 0;
		var total = parseInt(row.cells[totalcell].textContent, 10);
		total = (total + adjustment > 0 ? total + adjustment : 0);
		row.cells[totalcell].textContent = total;
		return total;
	};

	this.get_matching_row = function(table, matchrow) {
		var link = matchrow.cells[1].firstChild;
		var url = link.href;
		var itemname = link.textContent;
		var total = evthis.adjust_total(matchrow, 0);
		var re;

		for(var i = 0; i < table.rows.length; i++) {
			if(table.rows[i].cells[1].firstChild.href == url) {
				return table.rows[i];
			}
		}
		if(re = /&id=(\d+)/.exec(url)) {
			var itemid = parseInt(re[1], 10);
			var newrow = evthis.makerow(itemid, total, itemname, evthis.transfer_left);
			table.appendChild(newrow);
			return newrow;
		}
		alert("Enhanced Combine Script:\n\nUnable to find or create matching row, this script isn't going to work properly and should probably be disabled");
	};

	this.transfer_left = function(ev) {ev.preventDefault(); evthis.transfer(evthis.get_event_row(ev), evthis.combtable, evthis.invtable, -1, true);};
	this.transfer_right = function(ev) {ev.preventDefault(); evthis.transfer(evthis.get_event_row(ev), evthis.invtable, evthis.combtable, +1, false);};

//	this.transfer = function(ev, from, to, adjustment, remove) {
//		var clicked_row = evthis.get_event_row(ev);
	this.transfer = function(clicked_row, from, to, adjustment, remove) {
		var corresponding_row = evthis.get_matching_row(to, clicked_row);
		var new_total;
		clicked_row.parentNode.parentNode.focus(); //if the link disappears due to filtering, it will lose focus so we set focus to the div
		evthis.reset_text = true;
		new_total = evthis.adjust_total(clicked_row, adjustment);
		evthis.adjust_total(corresponding_row, adjustment);
		if(remove && !new_total) {
			clicked_row.parentNode.removeChild(clicked_row);
		}
		if(adjustment > 0) {
			clicked_row.style.backgroundColor = "#CBFFC7";
			if(new_total > 1) {
				corresponding_row.style.backgroundColor = "#FFDCB7";
			}
		} else if(adjustment < 0) {
			if(new_total == 0) {
				corresponding_row.style.backgroundColor = "";
			}
			if(new_total == 1) {
				clicked_row.style.backgroundColor = "";
			}
		}
	};

	this.increment_by_name = function(itemname) {
		itemname = itemname.toLowerCase();
		for(var i = 0; i < this.itemnames.length; i++) {
			if(this.itemnames[i] == itemname) {
				this.transfer(this.invtable.rows[i], this.invtable, this.combtable, 1, 0);
			}
		}
	};

	this.fillinv = function(list) {this.populate(list, this.invtable, this.transfer_right, true);};

	this.makerow = function(itemid, total, itemname, callback) {
		var tr = document.createElement('tr');
		var td = document.createElement('td');
		var link = document.createElement('a');
		td.appendChild(document.createTextNode(total));
		tr.appendChild(td);
		td = document.createElement('td');
		td.width = "100%";
		link.href = "/examine.php?examine=inv&id="+itemid;
		link.appendChild(document.createTextNode(itemname));
		link.addEventListener("click", callback, false);
		td.appendChild(link);
		tr.appendChild(td);
		return tr;
	}

	this.populate = function(list, table, callback, store) {
		for(var i = 0; i < list.length; i++) {
			var tr = this.makerow(list[i][0], list[i][1], list[i][2], callback);
			table.appendChild(tr);
			if(store) {
				this.itemnames.push(list[i][2].toLowerCase());
			}
		}
	};

	this.submit_form = function(ev) {
		var ids = new Array();
		var newform = document.createElement('form');
		var newright = document.createElement('input');
		var action = document.createElement('input');
		ev.preventDefault();
		newform.action = "/index.php?p=inventory&a=combine";
		newform.method = "post";
		newright.type = "hidden";
		newright.name = "newRight";
		action.type = "hidden";
		action.name = "action";
		action.value = "Combine";
		newform.appendChild(newright);
		newform.appendChild(action);
		for(var i = 0; i < evthis.combtable.rows.length; i++) {
			var row = evthis.combtable.rows[i];
			var total = evthis.adjust_total(row, 0);
			var url = row.cells[1].firstChild.href;
			var re;
			if(re = /&id=(\d+)/.exec(url)) {
				var id = parseInt(re[1], 10);
				for(var j = 0; j < total; j++) {
					ids.push(id);
				}
			}
		}
		newright.value = ids.join(",");
		document.body.appendChild(newform);
		newform.submit();
	}

	this.invtable.style.width = "100%";
	this.combtable.style.width = "100%";

	if(invdiv) {
		invdiv.appendChild(this.invtable);
		invdiv.addEventListener('keydown', this.divkey, true);
	}
	if(combdiv) {
		combdiv.appendChild(this.combtable);
		combdiv.addEventListener('keydown', this.divkey, false);
	}
	if(button) {
		button.addEventListener('click', this.submit_form, false);
	}
	if(searchbox) {
		searchbox.addEventListener('keyup', this.filter, false);
		searchbox.addEventListener('focus', function(ev) {ev.target.select();}, false);
	}
}