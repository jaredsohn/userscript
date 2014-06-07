// ==UserScript==
// @name          KOL Store Log Summary
// @namespace     http://www.kingdomofloathing.com/showplayer.php?who=1297608
// @description   Highlights new sales and summarizes all sales from the recent store activity page.
// @include       http://*kingdomofloathing.com/storelog.php*
// @include       http://*127.0.0.1:*/storelog.php*
// @exclude       http://images.kingdomofloathing.com/*
// @exclude       http://forums.kingdomofloathing.com/*
// ==/UserScript==

var texts = document.evaluate('//span[@class="small"]/text()[contains(., "bought ")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
var prices = new Object();
var itemarray = new Array();
var totals = new Object();
var sortby = "price";
var itemtable;
var lasttime = GM_getValue("lasttime", "");
var newlines = true;
var newsales = new Object();
var newprices = new Object();
var itemspans = new Object();
var sticky = false;
var highlight_color = "LightCoral";

if(texts.snapshotLength > 0) {
	GM_setValue("lasttime", texts.snapshotItem(0).previousSibling.previousSibling.data);
}
for(var i = 0; i < texts.snapshotLength; i++) {
	if(re = /bought\s+(\d+)\s+\((.*?)\)\s+for\s+(\d+)\s+Meat/.exec(texts.snapshotItem(i).data)) {
		var item;
		var price;
		var quantity;
		var re;
		var itemspan = document.createElement('span');
		item = re[2];
		quantity = parseInt(re[1], 10);
		price = parseInt(re[3], 10)/quantity;
		if(!(item in prices)) {
			prices[item] = new Object();
		}
		if(!(price in prices[item])) {
			prices[item][price] = 0;
		}
		if(!(item in itemspans)) {
			itemspans[item] = new Array();
		}
		prices[item][price] += quantity;
		add_itemspan(itemspan, texts.snapshotItem(i));
		itemspans[item].push(itemspan);
		if(newlines) {
			var thistime = texts.snapshotItem(i).previousSibling.previousSibling.data;
			if(thistime != lasttime) {
				var span = document.createElement('span');
				span.style.color = highlight_color;
				texts.snapshotItem(i).previousSibling.style.color = highlight_color;
				if(!newsales[item]) {
					newsales[item] = 0;
					newprices[item] = new Object();
				}
				if(!(price in newprices[item])) {
					newprices[item][price] = 0;
				}
				newprices[item][price] += quantity;
				newsales[item] += quantity*price;
				itemspan.parentNode.insertBefore(span, itemspan);
				span.appendChild(itemspan);
			} else {
				newlines = false;
			}
		}
	}
}

for (var item in prices) {
	var total = 0;
	for (var price in prices[item]) {
		itemarray.push([item,price,prices[item][price]]);
		total += price*prices[item][price];
	}
	totals[item] = total;
}
itemarray.sort(sortitems);
itemtable = create_table(itemarray, newsales);
insert_table(itemtable);

function add_itemspan(span, it) {
	it.parentNode.insertBefore(span, it.previousSibling.previousSibling);
	span.appendChild(it.previousSibling.previousSibling);
	span.appendChild(it.previousSibling);
	span.appendChild(it);
}

function sortitems(a, b) {
	if(sortby == "price") {
		return totals[b[0]]-totals[a[0]];
	}
	if(a[0] != b[0]) {
		if(a[0].toLowerCase() < b[0].toLowerCase()) {
			return -1;
		}
		return 1;
	}
	return a[1]-b[1];
}

function insert_table(table) {
	var tr = document.evaluate('//span[@class="small"]/ancestor::tr[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	tr.cells[0].vAlign = "top";
	var td = tr.insertCell(1);
	td.vAlign = "top";
	td.appendChild(table);
}

function highlight_items(ev) {
	var itemname = ev.target.firstChild.data;
	if(sticky && sticky != itemname) {
		dehighlight_itemname(sticky);
		sticky = false;
	}
	for(var i = 0; i < itemspans[itemname].length-1; i++) {
		var span = itemspans[itemname][i];
		var color = "BlueViolet";
		if(span.parentNode.style.color) {
			color = "red";
		}
		span.style.color = color;
		if(span.childNodes.length > 1) {
			span.childNodes[1].style.color = color;
		}
	}
}

function dehighlight_items(ev) {
	var itemname = ev.target.firstChild.data;
	if(!sticky) {
		dehighlight_itemname(itemname);
	}
}

function dehighlight_itemname(itemname) {
	for(var i = 0; i < itemspans[itemname].length; i++) {
		var span = itemspans[itemname][i];
		span.style.color = "";
		if(span.childNodes.length > 1) {
			span.childNodes[1].style.color = span.parentNode.style.color;
		}
	}
}

function stick(ev) {
	if(sticky) {
		itemspans[sticky][itemspans[sticky].length-1].style.color = "";
		sticky = false;
	} else {
		sticky = ev.target.firstChild.data;
		itemspans[sticky][itemspans[sticky].length-1].style.color = "BlueViolet";
	}
}

function create_table(arr, newsales) {
	var table = document.createElement('table');
	var lastitem = "";
	var tr;
	var td;
	var totalitems = 0;
	var totalsales = 0;
	var totalnewsales = 0;
	table.style.textAlign = "right";
	table.cellSpacing = 0;
	table.cellPadding = 5;
	table.style.borderWidth = 5;
	table.style.borderStyle = "solid";
	
	for(var i = 0; i < arr.length; i++) {
		var itemname = arr[i][0];
		if(itemname != lastitem) {
			var b = document.createElement('b');
			tr = document.createElement('tr');
			td = document.createElement('td');
			lastitem = itemname;
			if(totalitems++ % 2 == 0) {
				tr.style.backgroundColor = "rgb(192, 192, 192)";
			}
			td.valign = "top";
			b.appendChild(document.createTextNode(itemname));
			b.addEventListener('mouseover', highlight_items, false);
			b.addEventListener('mouseout', dehighlight_items, false);
			b.addEventListener('click', stick, false);
			b.style.cursor = "pointer";
			itemspans[itemname].push(b);
			td.appendChild(b);
			td.appendChild(document.createElement('br'));
			if(newsales[itemname] != totals[itemname]) {
				td.appendChild(document.createTextNode(addCommas(totals[itemname])));
			}
			totalsales += totals[itemname];
			if(newsales[itemname]) {
				var span = document.createElement('span');
				if(newsales[itemname] != totals[itemname]) {
					td.appendChild(document.createTextNode("/"));
				}
				span.style.color = "red";
				span.appendChild(document.createTextNode(addCommas(newsales[itemname])));
				td.appendChild(span);
				totalnewsales += newsales[itemname];
			}
			tr.appendChild(td);
			table.appendChild(tr);
			td = document.createElement('td');
			td.vAlign = "top";
			tr.appendChild(td);
		}
		/* begin quantity @ price code */
		if((newprices[itemname] && arr[i][2] != newprices[itemname][arr[i][1]]) || !newprices[itemname]) {
			td.appendChild(document.createTextNode(arr[i][2]));
			if(newprices[itemname]) {
				td.appendChild(document.createTextNode("/"));
			}
		}
		if(newprices[itemname] && newprices[itemname][arr[i][1]]) {
			var span = document.createElement('span');
			span.style.color = "red";
			span.appendChild(document.createTextNode(newprices[itemname][arr[i][1]]));
			td.appendChild(span);
		}
		td.appendChild(document.createTextNode(" @ "+addCommas(arr[i][1])));
		/* end quantity @ price code */
			
		td.appendChild(document.createElement('br'));
	}
	if(arr.length) {
		tr = document.createElement('tr');
		td = document.createElement('td');
		tr.style.backgroundColor = "rgb(192, 255, 192)";
		td.colSpan = 2;
		td.appendChild(document.createTextNode("Total: "+addCommas(totalsales)));
		if(totalnewsales) {
			var span = document.createElement('span');
			td.appendChild(document.createTextNode("/"));
			span.style.color = "red";
			span.appendChild(document.createTextNode(addCommas(totalnewsales)));
			td.appendChild(span);
		}
		tr.appendChild(td);
		table.appendChild(tr);
	}
	return table;
}

function addCommas(nStr)
{
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}
