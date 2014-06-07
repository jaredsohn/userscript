// ==UserScript==
// @name           SSW Universe Snapshot
// @namespace      http://homeworlds.secretsocietywars.com/nardo
// @description    Takes a snapshot of your Sector Map every time that you load it
// @include        http://www.secretsocietywars.com/index.php?p=space&a=sector_map*
// ==/UserScript==

/*
blue    0000 0
green   0001 1
red     0010 2
orange  0011 3
grey    0100 4
none    0101 5
unknown 0110 6
error   0111 7

first bit specifies multiples:
1000 - multiple blues
1001 - multiple green
*/

var color_values = {"rgb(0, 0, 153)":     0,
                    "rgb(0, 153, 0)":     1,
                    "rgb(204, 0, 0)":     2,
                    "rgb(255, 51, 0)":    3,
                    "rgb(153, 153, 153)": 4,
                    "rgb(17, 17, 17)":    5,};

var color_array = ["rgb(0, 0, 153)", "rgb(0, 153, 0)", "rgb(204, 0, 0)", "rgb(255, 51, 0)", "rgb(153, 153, 153)", "rgb(17, 17, 17)"];

var sectorlinks = document.evaluate('//a[contains(@href, "p=space&a=blastoff") or contains(@href, "p=space&a=move")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
var animation_adivs = document.evaluate('//a[contains(@href, "p=space&a=blastoff") or contains(@href, "p=space&a=move")]/ancestor::div[1]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
var animation_sdivs = document.evaluate('//a[contains(@href, "p=space&a=blastoff") or contains(@href, "p=space&a=move")]/preceding-sibling::div[1]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
var data = new Array();
var snapshots = eval(GM_getValue("snapshots", "[]"));
var last_selected = -1;
var select_span;

var compressed_data;

for(var i = 0; i < sectorlinks.snapshotLength; i++) {
	var link = sectorlinks.snapshotItem(i);
	if((link.style.background.indexOf("rgb(153, 153, 153)") > -1) || (link.style.background.indexOf("rgb(204, 204, 204)") > -1)) {
		data.push(6);
/*	} else if(link.style.background.indexOf("rgb(204, 204, 204)") > -1) {
		data.push(5);*/
	} else {
//		var div = document.evaluate('./ancestor::div[1]', link, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		var div = animation_adivs.snapshotItem(i);
		if(div) {
			if(typeof(color_values[div.style.backgroundColor]) != "undefined") {
				data.push(color_values[div.style.backgroundColor]);
			} else {
				data.push(7);
			}
		} else {
			data.push(7); //the sector format was unrecognized, maybe a planet, maybe an error, maybe something else entirely
		}
	}
}

if(data.length == 1089) {
	compressed_data = compress(data);
/*
	uncompressed_data = uncompress(compressed_data);
	if(data.toSource() != uncompressed_data.toSource()) {
		alert("data != uncompressed_data!!!!");
	}
*/
	snapshots.push([get_date_and_time(), compressed_data]);
	GM_setValue("snapshots", snapshots.toSource());
}

if(snapshots.length > 0) {
	insert_select_span();
}

function insert_select_span() {
	var new_span = make_select_span();
	if(select_span) {
		select_span.parentNode.replaceChild(new_span, select_span);
	} else {
		var parent_table = document.evaluate('//td[@class="main"]//table', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		var cell = parent_table.insertRow(parent_table.rows.length).insertCell(0);
		cell.colSpan = 23;
		cell.appendChild(new_span);
	}
	select_span = new_span;
}

function make_select_span() {
	var span = document.createElement('span');
	var select = make_snapshots_select();
	var data_used = Comma(snapshots.toSource().length);
	var table = document.createElement('table');
	var delete_link = document.createElement('a');
	var delete_before_link = document.createElement('a');
	var delete_after_link = document.createElement('a');
	var delete_all_link = document.createElement('a');

	span.style.fontSize = "9px";
	table.innerHTML = "<tr><td>Snapshots are using " + data_used + " bytes<br></td><td></td></tr>";
	table.rows[0].cells[0].appendChild(select);
	delete_link.href = '/index.php?p=space&a=sector_map';
	delete_link.innerHTML = "Delete this snapshot";
	delete_link.addEventListener('click', function(ev) {delete_links(ev, select, 1);}, false);
	table.rows[0].cells[1].appendChild(delete_link);
	table.rows[0].cells[1].appendChild(document.createElement('br'));
	delete_before_link.href = '/index.php?p=space&a=sector_map';
	delete_before_link.innerHTML = "Delete all snapshots earlier than this";
	delete_before_link.addEventListener('click', function(ev) {delete_links(ev, select, 2);}, false);
	table.rows[0].cells[1].appendChild(delete_before_link);
	table.rows[0].cells[1].appendChild(document.createElement('br'));
	delete_after_link.href = '/index.php?p=space&a=sector_map';
	delete_after_link.innerHTML = "Delete all snapshots more recent than this";
	delete_after_link.addEventListener('click', function(ev) {delete_links(ev, select, 3);}, false);
	table.rows[0].cells[1].appendChild(delete_after_link);
	table.rows[0].cells[1].appendChild(document.createElement('br'));
	delete_all_link.href = '/index.php?p=space&a=sector_map';
	delete_all_link.innerHTML = "Delete ALL snapshots";
	delete_all_link.addEventListener('click', function(ev) {delete_links(ev, select, 4);}, false);
	table.rows[0].cells[1].appendChild(delete_all_link);
	span.appendChild(table);
	return span;
}

function delete_links(ev, select, deltype) {
	var update = false;
	var start = parseInt(select.options[select.selectedIndex].value);
	ev.preventDefault();
	if(deltype == 1) {
		if(start >= 0) {
			snapshots.splice(start, 1);
			update = true;
		}
	} else if(deltype == 2) {
		if(confirm("Please confirm you want to delete your snapshots earlier than the selected one")) {
			if(start < 0) {
				start = snapshots.length;
			}
			snapshots.splice(0, start);
			update = true;
		}
	} else if(deltype == 3) {
		if(confirm("Do you want to delete all of the snapshots more recent than the selected one?")) {
			if(start >= 0) {
				snapshots.splice(start+1, snapshots.length-start-1);
				update = true;
			}
		}
	} else if(deltype == 4) {
		if(confirm("Do you really want to delete ALL of your snapshots?")) {
			snapshots = [];
			update = true;
		}
	}
	if(update) {
		GM_setValue("snapshots", snapshots.toSource());
		insert_select_span();
	}
}
			

function make_snapshots_select() {
	var select = document.createElement('select');
	select.addEventListener('change', load_snapshot, false);
	select.addEventListener('keyup', load_snapshot, false);
	select.add(new Option("Load Snapshot", -1, false, false), null);
//	for(var i = 0; i < snapshots.length; i++) {
	for(var i = snapshots.length-1; i >= 0; i--) {
		select.add(new Option(snapshots[i][0], i, false, false), null);
	}
	return select;
}

function load_snapshot(ev) {
	var num = ev.target.options[ev.target.selectedIndex].value;
	if((num >= 0) && (num != last_selected)) {
		var uncompressed_data = uncompress(snapshots[num][1]);
		for(var i = 0; i < uncompressed_data.length; i++) {
			var color = color_array[uncompressed_data[i]];
			if(color) {
				animation_adivs.snapshotItem(i).style.backgroundColor = color;
				animation_sdivs.snapshotItem(i).style.backgroundColor = color;
//			} else if(uncompressed_data[i] < 7) {
			} else if(uncompressed_data[i] == 6) {
				animation_adivs.snapshotItem(i).style.backgroundColor = "";
				animation_sdivs.snapshotItem(i).style.backgroundColor = "black";
			}
			if(uncompressed_data[i] == 6) {
				sectorlinks.snapshotItem(i).style.backgroundColor = "rgb(204, 204, 204)";
			} else {
				sectorlinks.snapshotItem(i).style.backgroundColor = "rgb(0, 255, 0)";
			}
		}
	}
}
		

/* compress() assumes that it will not receive a number in sectorarray greater than 7 */
function compress(sectorarray) {
	var numbers = new Array(sectorarray.length);
	var startpos = 0;
	var data_array = new Array();
	for(var i = 0; i < sectorarray.length-1; i++) {
		numbers[i] = 1;
		if(sectorarray[i] == sectorarray[i+1]) {
			numbers[startpos]++;
		} else {
			data_array.push([numbers[startpos], sectorarray[startpos]]);
			startpos = i+1;
		}
	}
	numbers[sectorarray.length-1] = 1;
	data_array.push([numbers[startpos], sectorarray[startpos]]);
	return base64prep(data_array);
}

function uncompress(b64data) {
	var raw_data = base64Decode(b64data);
	var sectorarray = new Array();
	var shift = 4;
	var temp = 0;
	var multiples = false;
	var color;

	for(var i = 0; i < raw_data.length*2; i++) {
		if(i & 1) {
			temp = raw_data.charCodeAt(parseInt(i/2)) & 15;
		} else {
			temp = raw_data.charCodeAt(i/2) >> 4;
		}
		if(multiples) {
			for(var j = 0; j < temp; j++) {
				sectorarray.push(color);
			}
			multiples = false;
		} else {
			if(temp & 8) {
				multiples = true;
				color = temp & 7;
			} else {
				sectorarray.push(temp);
			}
		}
	}
	return sectorarray;
}

function get_date_and_time() {
	var re;
	if(re = /UTC:(?:\s|<[^>]*>|&nbsp;)*(\d+:\d+)(?:\s|&nbsp;)+(\w+)(?:\s|&nbsp;)+(\d+),(?:\s|&nbsp;)+(\d+)/.exec(document.body.innerHTML)) {
		return re[1] + " " + re[2] + " " + re[3] + " " + re[4];
	}
	return "unknown";
}

function base64prep(data_array) {
	var shift = 4;
	var temp = 0;
	var binary_string = "";
	for(var i = 0; i < data_array.length; i++) {
		if(data_array[i][0] == 1) {
			temp |= data_array[i][1] << shift;
			if(shift) {
				shift = 0;
			} else {
				shift = 4;
				binary_string += String.fromCharCode(temp);
				temp = 0;
			}
		} else {
			for(var j = 0; j < data_array[i][0]; j += 15) {
				var total = Math.min(data_array[i][0] - j, 15);
				if(shift) {
					temp = (data_array[i][1] | 8) << shift;
					temp |= total;
					binary_string += String.fromCharCode(temp);
					temp = 0;
				} else {
					temp |= (data_array[i][1] | 8);
					binary_string += String.fromCharCode(temp);
					temp = total << 4;
				}
			}
		}
	}
	if(!shift) {
		binary_string += String.fromCharCode(temp | 8);
	}
	return base64Encode(binary_string);
}

/* Base64 conversion methods.
 * Copyright (c) 2006 by Ali Farhadi.
 * released under the terms of the Gnu Public License.
 * see the GPL for details.
 *
 * Email: ali[at]farhadi[dot]ir
 * Website: http://farhadi.ir/
 */

function base64Encode(data){
	if (typeof(btoa) == 'function') return btoa(data);//use internal base64 functions if available (gecko only)
	var b64_map = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
	var byte1, byte2, byte3;
	var ch1, ch2, ch3, ch4;
	var result = new Array(); //array is used instead of string because in most of browsers working with large arrays is faster than working with large strings
	var j=0;
	for (var i=0; i<data.length; i+=3) {
		byte1 = data.charCodeAt(i);
		byte2 = data.charCodeAt(i+1);
		byte3 = data.charCodeAt(i+2);
		ch1 = byte1 >> 2;
		ch2 = ((byte1 & 3) << 4) | (byte2 >> 4);
		ch3 = ((byte2 & 15) << 2) | (byte3 >> 6);
		ch4 = byte3 & 63;
		
		if (isNaN(byte2)) {
			ch3 = ch4 = 64;
		} else if (isNaN(byte3)) {
			ch4 = 64;
		}

		result[j++] = b64_map.charAt(ch1)+b64_map.charAt(ch2)+b64_map.charAt(ch3)+b64_map.charAt(ch4);
	}

	return result.join('');
}

function base64Decode(data){
	data = data.replace(/[^a-z0-9\+\/=]/ig, '');// strip none base64 characters
	if (typeof(atob) == 'function') return atob(data);//use internal base64 functions if available (gecko only)
	var b64_map = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
	var byte1, byte2, byte3;
	var ch1, ch2, ch3, ch4;
	var result = new Array(); //array is used instead of string because in most of browsers working with large arrays is faster than working with large strings
	var j=0;
	while ((data.length%4) != 0) {
		data += '=';
	}
	
	for (var i=0; i<data.length; i+=4) {
		ch1 = b64_map.indexOf(data.charAt(i));
		ch2 = b64_map.indexOf(data.charAt(i+1));
		ch3 = b64_map.indexOf(data.charAt(i+2));
		ch4 = b64_map.indexOf(data.charAt(i+3));

		byte1 = (ch1 << 2) | (ch2 >> 4);
		byte2 = ((ch2 & 15) << 4) | (ch3 >> 2);
		byte3 = ((ch3 & 3) << 6) | ch4;

		result[j++] = String.fromCharCode(byte1);
		if (ch3 != 64) result[j++] = String.fromCharCode(byte2);
		if (ch4 != 64) result[j++] = String.fromCharCode(byte3);	
	}

	return result.join('');
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
	} else
		return number;
}