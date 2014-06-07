// ==UserScript==
// @name           SSW Universal Delivery Itemizer
// @namespace      http://homeworlds.secretsocietywars.com/nardo
// @description    Displays a list of the items that were sent to you across multiple smails.
// @include        http://www.secretsocietywars.com/index.php?p=forums&a=show_pm*
// @include        http://www.secretsocietywars.com/index.php?p=forums&a=send_pm*
// @include        http://www.secretsocietywars.com/index.php?p=forums&a=pm_action
// ==/UserScript==

var smail_table = document.evaluate('//text()[.="Universal Express Delivery!"]/parent::a[contains(@href, "p=forums&a=show_pm&")]/ancestor::table[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
var colors = ["red", "cyan", "orchid", "orange", "blue"];
var color_index = 0;
var ignore_messages_under = 2;
var last_checkbox_id = -1;
var checkboxes = document.evaluate('//input[@type="checkbox" and contains(@id, "pmids")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);


if(smail_table) {
	var groups = find_groups(smail_table);
	for(var i = 0; i < groups.length; i++) {
		var row = smail_table.rows[groups[i][0]];
		var cell = row.insertCell(row.cells.length);
		cell.rowSpan = groups[i][1] - groups[i][0] + 1;
		cell.innerHTML = "&nbsp;";
		cell.bgColor = get_next_color();
		cell.style.cursor = "pointer";
		cell.addEventListener("click", read_smails, false);
	}
}
for(var i = 0; i < checkboxes.snapshotLength; i++) {
	checkboxes.snapshotItem(i).addEventListener('click', click_checkbox, false);
}

function click_checkbox(ev) {
	var re;
	var this_id = -1;
	if(re = /^pmids(\d+)$/.exec(ev.target.id)) {
		this_id = parseInt(re[1]);
	}
	if(ev.shiftKey) {
		if((last_checkbox_id > -1) && (this_id > -1)) {
			for(var i = Math.min(last_checkbox_id, this_id); i < Math.max(last_checkbox_id, this_id); i++) {
				var chk = document.getElementById("pmids"+i);
				if(chk) {
					chk.checked = true;
				}
			}
		}
	}
	last_checkbox_id = this_id;
}

function read_smails(ev) {
	var urls = new Array();
	var startidx = ev.target.parentNode.rowIndex;
	var endidx = startidx + ev.target.rowSpan - 1;
	var parent_table = document.evaluate('./ancestor::table[1]', ev.target, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var results_row;
	var results_cell;
	var messagecell = document.createElement('span');
	var percentcell = document.createElement('span');
	
	if(!parent_table) {
		alert("Unable to find the parent table for some reason.  This script isn't going to work right now.  Sorry.");
		return;
	}

	results_row = parent_table.insertRow(endidx+1);
	results_row.insertCell(0).colSpan = 2;
	results_row.insertCell(1).appendChild(document.createTextNode(get_sender(parent_table.rows[startidx])));
	results_row.cells[1].className = "mbdisplay_forumaltcolor1";
	results_cell = results_row.insertCell(2);
	results_cell.colSpan = 2;
	results_cell.className = "mbdisplay_forumaltcolor2";
	results_cell.appendChild(percentcell);
	results_cell.appendChild(messagecell)

	for(var i = startidx; i <= endidx; i++) {
		var row = smail_table.rows[i];
		var link = document.evaluate('.//a[contains(@href, "p=forums&a=show_pm&")]', row, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		if(link) {
			urls.push(link.href);
		}
	}
	load_smail_urls_wrapper(urls, results_cell, messagecell, percentcell);
}

function load_smail_urls_wrapper(urls, cell, messagecell, percentcell) {
	var messages = new Object();
	messages.cell = messagecell;
	messages.percentcell = percentcell;
	messages.text = new Object();
	load_smail_urls(urls, cell, 0, new Object(), messages);
}

function load_smail_urls(urls, cell, times, items, messages) {
	var url;
	if(times == 1) {
		/* If the first and last message are all the same item
		   then we assume that all the other messages are that item
		   so that we don't have to load them */
		url = urls.shift();
	} else {
		url = urls.pop();
	}
	if(times) {
		messages.percentcell.innerHTML = parseInt((times / (urls.length+1+times))*100) + "%<br>";
	} else {
		messages.percentcell.innerHTML = "Loading...<br>";
	}
	GM_xmlhttpRequest({
		method: 'GET',
		url: url,
		onload:function(response) {parse_smail(response.responseText, urls, cell, times+1, items, messages);},
	});
}

function parse_smail(responseText, urls, cell, times, items, messages) {
	var re;
	var msg;
	while(re = /<img[^>]+src="([^"]+)"([^>]+title="[^"]*")?.*?Giving\s+(\d+)\s+([^<]+).*?Now you have\s+([\d,]+)/gi.exec(responseText)) {
		var img = re[1];
		var num = parseInt(re[3], 10);
		var item = re[4];
		var have = parseInt(re[5].replace(/,/g, ""), 10);
		if(!items[img]) {
			items[img] = new Object();
			items[img].num = 0;
			items[img].start = have - num;
			items[img].name = item;
			items[img].have = have;
			insert_item_table(items[img], img, cell);
		}
		items[img].num += parseInt(num, 10);
		if(have > items[img].have) {
			items[img].have = have;
		}
	}
	for(var i in items) {
		if(!items[i].quickcalced || urls.length == 0) {
			items[i].textcell.innerHTML = "Giving " + Comma(items[i].num) + " " + items[i].name+"<br>Now you have "+Comma(items[i].have);
		}
	}
	msg = get_smail_message(responseText);
	if(!messages.text[msg]) {
		var wordcount = count_message_words(msg);
		messages.text[msg] = true;
		if(wordcount > ignore_messages_under) {
			messages.cell.innerHTML += "<b>Message:</b>"+msg;
		}
	}
	if(urls.length > 0) {
		if((times == 2) && (object_length(items) == 1)) {
			quickcalc(urls, cell, times, items);
		}
		load_smail_urls(urls, cell, times, items, messages);
	} else {
		messages.percentcell.innerHTML = "<br>";
	}
}

function count_message_words(msg) {
	var stripped = msg.replace(/<[^>]*>/g, "");
	var list = stripped.split(/\s+/);
	return list.length;
}

function get_smail_message(responseText) {
	var re;
	if(re = /<td[^>]+style="[^"]*padding:10px[^>]+>[^<]+<br[^>]*>\s*([\w\W]*?)<table/i.exec(responseText)) {
		return re[1];
	} else {
		return "unknown";
	}
}

function insert_item_table(obj, imgsrc, cell) {
	var table = document.createElement('table');
	var img = document.createElement('img');

	cell.appendChild(document.createElement('br'));
	img.src = imgsrc;
	table.insertRow(0);
	table.rows[0].insertCell(0).appendChild(img);
	obj.textcell = table.rows[0].insertCell(1);
	cell.appendChild(table);
	obj.img = img;
}

function quickcalc(urls, cell, times, items) {
	for(var i in items) {
		items[i].textcell.innerHTML = "Giving " + Comma(items[i].have - items[i].start) + " " + items[i].name + "<br>Now you have " + Comma(items[i].have) + '<br><font size="-2">(Quickcalc)</font>';
		items[i].quickcalced = true;
	}
}

function object_length(obj) {
	var len = 0;
	for(var i in obj) {
		len++;
	}
	return len;
}

function get_next_color() {
	if(color_index >= colors.length) {
		color_index = 0;
	}
	return colors[color_index++];
}

function find_groups(table) {
	var groups = new Array();
	var start;
	var end;
	var sender;
	var time;
	var rows = document.evaluate('.//text()[.="Universal Express Delivery!"]/parent::a[contains(@href, "p=forums&a=show_pm&")]/ancestor::tr[1]', table, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

	if(rows.snapshotLength > 0) {
		start = end = rows.snapshotItem(0).rowIndex;
		sender = get_sender(rows.snapshotItem(0));
		time = smail_time(rows.snapshotItem(0));
	}
	for(var i = 1; i < rows.snapshotLength; i++) {
		var idx = rows.snapshotItem(i).rowIndex;
		var new_sender = get_sender(rows.snapshotItem(i));
		var new_time = smail_time(rows.snapshotItem(i));
		if((new_sender != sender) || (Math.abs(new_time - time) > 5)) {
			groups.push([start,end]);
			start = end = idx;
		} else if(idx == end + 1) {
			end++;
		} else {
			groups.push([start,end]);
			start = end = idx;
		}
		sender = new_sender;
		time = new_time;
	}
	if(rows.snapshotLength > 0) {
		groups.push([start,end]);
	}
	return groups;
}

function get_sender(row) {
	var sender = document.evaluate('.//a[contains(@href, "p=records&a=view_player")]/text()', row, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if(sender) {
		return sender.data;
	} else {
		return "unknown";
	}
}

/* smail_time() won't account for date, so 00:00 is not seen as coming after 23:59
   this doesn't really matter much for the purpose it's being used */
function smail_time(row) {
	var re;
	var time = -100;
	if(re = /[^\d](\d\d):(\d\d)\s/.exec(row.cells[3].innerHTML)) {
		time = (parseInt(re[1], 10) * 60) + parseInt(re[2], 10);
	}
	return time;
}

function Comma(number) {
number = '' + number;
if (number.length > 3) {
var mod = number.length % 3;
var output = (mod > 0 ? (number.substring(0,mod)) : '');
for (i=0 ; i < Math.floor(number.length / 3); i++) {
if ((mod == 0) && (i == 0))
output += number.substring(mod+ 3 * i, mod + 3 * i + 3);
else
output+= ',' + number.substring(mod + 3 * i, mod + 3 * i + 3);
}
return (output);
}
else return number;
}
