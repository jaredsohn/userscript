// ==UserScript==
// @name           SSW Smail Search
// @namespace      http://homeworlds.secretsocietywars.com/nardo
// @description    Allows you to search for a smail from a particular user
// @include        http://www.secretsocietywars.com/index.php?p=forums&a=show_pm*
// @include        http://www.secretsocietywars.com/index.php?p=forums&a=send_pm*
// @include        http://www.secretsocietywars.com/index.php?p=forums&a=pm_action*
// ==/UserScript==

var from_cellnum = 2;
var date_cellnum = 3;
var subject_cellnum = 4;
var data = eval(GM_getValue("data", "new Object()"));
var re;
var today = get_current_date();
var search_source = "data:image/png;base64,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";
var delete_button = document.evaluate('//input[@value="With Selected:"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
var searchtext = document.createElement('input');


add_search_box();
if(re = /^#search:(.*)$/.exec(document.location.hash)) {
	search(re[1]);
	addhash("search:"+re[1]);
} else {
	initialize();
	GM_setValue("data", data.toSource());
	if(Math.random() < 0.01) {
		gc();
	}
}
delete_button.addEventListener('click', check_delete, false);

function initialize() {
	var rows = document.evaluate('//input[@type="checkbox" and contains(@id, "pmids")]/ancestor::tr[1]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for(var i = 0; i < rows.snapshotLength; i++) {
		var row = rows.snapshotItem(i);
		var playername = get_playername(row);
		var playerid = get_playerid(row);
		var date_time = get_date(row);
		var subject = get_subject(row);
		var id = get_smail_id(row);
		var a = document.createElement('a');
		var img = document.createElement('img');

		if(typeof(data[playername]) == "undefined") {
			data[playername] = new Object();
		}
		if(typeof(data[playername][id]) == "undefined") {
			data[playername][id] = [date_time, playerid, subject];
		}
		a.href = document.location.href;
		img.src = search_source;
		img.border = 0;
		a.appendChild(img);
		a.addEventListener('click', click_search, false);
		row.cells[from_cellnum].appendChild(a);
	}
}

function add_search_box() {
	var insert_point = document.evaluate('//input[@type="submit" and @value="Create Folder"]/ancestor::form[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var span = document.createElement('span');
	var button = document.createElement('input');
	span.innerHTML = "<br><b>Search</b><br>";
	searchtext.type = "text";
	searchtext.style.width = "130px";
	searchtext.addEventListener('keydown', capture_enter, false);
	span.appendChild(searchtext);
	button.type = "button";
	button.style.width = "100px";
	button.value = "Search";
	button.addEventListener('click', manual_search, false);
	span.appendChild(button);
	insert_point.parentNode.insertBefore(span, insert_point.nextSibling);
}

function capture_enter(ev) {
	if(ev.which == 13) {
		ev.preventDefault();
		manual_search();
		return false;
	}
	return true;
}

function check_delete(ev) {
	var action = document.evaluate('./ancestor::form[1]//select[@name="action"]', ev.target, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if(action && action.value == "move2trash") {
		var checkboxes = document.evaluate('./ancestor::form[1]//input[@type="checkbox" and @name="ids[]"]', action, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for(var i = 0; i < checkboxes.snapshotLength; i++) {
			if(checkboxes.snapshotItem(i).checked) {
				var row = document.evaluate('./ancestor::tr[1]', checkboxes.snapshotItem(i), null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
				var playername = get_playername(row);
				var id = get_smail_id(row);
				delete(data[playername][id]);
			}
		}
		GM_setValue("data", data.toSource());
	}
}

function gc() {
	for(var playername in data) {
		var to_delete = new Array();
		for(var id in data[playername]) {
			if(expired(data[playername][id][0])) {
				to_delete.push(id);
			}
		}
		for(var i = 0; i < to_delete.length; i++) {
			delete(expired(data[playername][to_delete[i]]));
		}
	}
	GM_setValue("data", data.toSource());
}

function addhash(h) {
	var url = document.location.href.replace(/#.*$/, "")+"#"+h;
	var form = document.evaluate('//form[@name="pmform" and contains(@action, "p=forums&a=pm_action")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	document.location.replace(url);
	if(form) {
		form.action = form.action.replace(/#.*$/, "")+"#"+h;
	}
}

function click_search(ev) {
	var row = document.evaluate('./ancestor::tr[1]', ev.target, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var playername = get_playername(row);
	ev.preventDefault();
	var start = new Date().getTime();
	search(playername);
	addhash("search:"+playername);
}

function manual_search(ev) {
	var start = new Date().getTime();
	search(searchtext.value);
	addhash("search:"+searchtext.value);
}	

function search(playername, use_table, counter) {
	var all_rows;
	var table;
	var ids = new Array();
	var found_expired = false;
	
	if(use_table) {
		table = use_table;
	} else {
		all_rows = document.evaluate('//input[@type="checkbox" and contains(@id, "pmids")]/ancestor::tr[1]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		table = document.evaluate('//input[@type="checkbox" and contains(@id, "pmids")]/ancestor::table[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		for(var i = 0; i < all_rows.snapshotLength; i++) {
			all_rows.snapshotItem(i).parentNode.removeChild(all_rows.snapshotItem(i));
		}
	}
	if(typeof(counter) == "undefined") {
		counter = 0;
	}
	if(data[playername]) {
		for(var id in data[playername]) {
			ids.push(id);
		}
	} else {
		var names = new Array();
		for(var name in data) {
			if(name.toLowerCase().indexOf(playername.toLowerCase()) > -1) {
				names.push(name);
			}
			names = names.sort(lcsort);
		}
		for(var i = 0; i < names.length; i++) {
			counter += search(names[i], table, counter);
		}
	}

	ids = ids.sort(invnumsort);
	for(var i = 0; i < ids.length; i++) {
		var row;
		if(!expired(data[playername][ids[i]][0])) {
			row = table.insertRow(table.rows.length);
			build_row(row, playername, data[playername][ids[i]][1], data[playername][ids[i]][0], ids[i], data[playername][ids[i]][2], i+counter);
		} else {
			found_expired = true;
		}
	}
	if(found_expired) {
		gc();
	}
	if(!use_table) {
		initialize();
	}
	return ids.length;
}

function build_row(row, playername, playerid, date_time, message_id, subject, counter) {
	var cell = row.insertCell(0);
	var chk = document.createElement('input');
	var img = document.createElement('img');
	var datespan = document.createElement('span');
	var namelink = document.createElement('a');
	var subjectlink = document.createElement('a');
	chk.type = "checkbox";
	chk.name = "ids[]";
	chk.id = "pmids"+(counter+1);
	chk.value = message_id;
	cell.className = "mbdisplay_forumaltcolor"+(counter%2+1);
	cell.appendChild(document.createTextNode(" "));
	cell.appendChild(chk);
	cell.appendChild(document.createTextNode(" "));
	cell = row.insertCell(1);
	img.border = 0;
	img.src = "/images/forums/grey_folder.gif";
	cell.className = "mbdisplay_forumaltcolor"+(counter%2+1);
	cell.appendChild(img);
	cell = row.insertCell(2);
	namelink.href = "/index.php?p=records&a=view_player&id="+playerid;
	namelink.className = "pm_link";
	namelink.style.color = "rgb(102, 102, 102)";
	namelink.appendChild(document.createTextNode(playername));
	cell.className = "mbdisplay_forumaltcolor"+(counter%2+1);
	cell.appendChild(namelink);
	cell.appendChild(document.createTextNode(" "));
	cell = row.insertCell(3);
	cell.className = "mbdisplay_forumaltcolor"+(counter%2+1);
	datespan.style.fontSize = "10px";
	datespan.style.color = "rgb(102, 102, 102)";
	datespan.appendChild(document.createTextNode(date_time));
	cell.appendChild(datespan);
	cell = row.insertCell(4);
	subjectlink.href = "/index.php?p=forums&a=show_pm&row=0&box=1&id="+message_id+"#search:"+playername;
	subjectlink.className = "pm_link";
	subjectlink.style.color = "rgb(102, 102, 102)";
	subjectlink.appendChild(document.createTextNode(subject));
	cell.className = "mbdisplay_forumaltcolor"+(counter%2+1);
	cell.appendChild(subjectlink);
}

function invnumsort(a, b) {
	return b-a;
}

function lcsort(a, b) {
	var alc = a.toLowerCase();
	var blc = b.toLowerCase();
	if(alc < blc) {
		return -1;
	} else if(blc < alc) {
		return 1;
	}
	return 0;
}

function get_playername(row) {
	var t;
	if(row.cells.length > from_cellnum) {
		t = document.evaluate('.//a[contains(@href, "view_player")]/text()', row.cells[from_cellnum], null, XPathResult.STRING_TYPE, null).stringValue;
	}
	return t;
}

function get_playerid(row) {
	var a;
	var re;
	if(row.cells.length > from_cellnum) {
		a = document.evaluate('.//a[contains(@href, "view_player")]', row.cells[from_cellnum], null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
		if(re = /&id=(\d+)/.exec(a.href)) {
			return parseInt(re[1], 10);
		}
	}
	return -1;
}

function get_date(row) {
	var t;
	if(row.cells.length > date_cellnum) {
		t = document.evaluate('.//span/text()', row.cells[date_cellnum], null, XPathResult.STRING_TYPE, null).stringValue;
	}
	return t;
}

function get_subject(row) {
	var t;
	if(row.cells.length > subject_cellnum) {
		t = document.evaluate('.//a[contains(@href, "id=")]/text()', row.cells[subject_cellnum], null, XPathResult.STRING_TYPE, null).stringValue;
	}
	return t;
}

function get_smail_id(row) {
	var a;
	var re;
	if(row.cells.length > subject_cellnum) {
		a = document.evaluate('.//a[contains(@href, "id=")]', row.cells[subject_cellnum], null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
		if(re = /&id=(\d+)/.exec(a.href)) {
			return parseInt(re[1], 10);
		}
	}
	return -1;
}

function get_current_date() {
	var date_string = document.evaluate('//text()[starts-with(., "UTC:")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var current_date = new Date();
	var re;
	if(date_string) {
		return make_date(date_string.data);
	}
}

function expired(sdate) {
	var smail_date = make_date(sdate);
	var day_milliseconds = 1000*60*60*24;
	if(today && smail_date) {
		if(Math.ceil((today.getTime() - smail_date.getTime())/day_milliseconds) > 30) {
			return true;
		}
	}
}

function make_date(date_string) {
	var months =  {"Jan":0, "Feb":1, "Mar":2, "Apr":3, "May":4, "Jun":5, "Jul":6, "Aug":7, "Sep":8, "Oct":9, "Nov":10, "Dec":11};
	var re;
	if(re = /\d+:\d+\s+(\w\w\w)\s+(\d+),\s+(\d+)/.exec(date_string)) {
		if(typeof(months[re[1]]) != "undefined") {
			var d = new Date();
			d.setFullYear(parseInt(re[3], 10), months[re[1]], parseInt(re[2], 10));
			return d;
		}
	}
}

