// ==UserScript==
// @name           BvS Marketplace Tweak
// @namespace      BvS
// @include        http://www.animecubed.com/billy/bvs/villagemarketplace.*
// @description    Calculates and shows price per unit in the marketplace. Modified to show graphs from Garyzx's server.
// ==/UserScript==
/*
Copyright (c) 2009 Daniel Karlsson

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
*/

var STYLESHEET = ""+<r><![CDATA[
div.itemlist {width: 514px; height: 25em; font-size: 12px; overflow: auto; border: 1px inset rgb(232,204,160);}
.itemlist table {width: 100%; font-size: 12px; background-color: black; border-spacing: 1px;}
.itemlist th {background-color: rgb(220, 180, 140); border: 1px outset rgb(220, 180, 140);
	font-weight: bold; text-align: center;}
.itemlist td {padding: 1px;}
.even {background-color: rgb(234, 216, 195);}
.even.disabled {background-color: rgb(218, 218, 218); color: rgb(109, 109, 109);}
.odd {background-color: rgb(222, 202, 168);}
.odd.disabled {background-color: rgb(204, 204, 204); color: rgb(102, 102, 102);}
.expensive {color: red;}
.cheap {color: green;}
.own {font-style: italic;}
td.price {text-align: right; width: 7.5em;}
td.item {white-space: nowrap;}
span.iteminfo {cursor: pointer; font-weight: bold;}
input.radio {padding: 0px; margin: 0px 2px;}
div.dropshadow {background-color: rgba(0,0,0,0.5); position: fixed; top: 8px; left: 8px; padding: 0; margin-bottom: 3px; margin-right: 3px;}
div#marketinfowin {background-image: url("http://www.animecubed.com/billy/layout/scrollbg.jpg");
	min-width: 240px; position: relative; top: -3px; left: -3px; padding: 0; border: 1px solid black;
	font-family: "arial", sans-serif;}
#marketinfowin div {font-size: 14px; padding: 8px;}
#marketinfowin h1 {color: white; font-size: 16px; font-weight: bold; padding: 4px; margin: 0;
	background-image: url("http://www.animecubed.com/billy/layout/scrolldark.jpg");}
#marketinfowin table.miw {width: 100%; font-size: 12px; background-color: black; border-spacing: 1px;}
.miw tr {background-color: rgb(234, 216, 195);}
.miw tr.header {background-color: rgb(220, 180, 140); font-weight: bold; text-align: center;}
.miw td {font-weight: bold;}
.miw td.number {font-weight: normal; text-align: right;}
img#closebutton {float: right; cursor: pointer; margin: 6px;}
img#infobutton {float: right; cursor: pointer; margin: 6px;}
#marketinfowin a {font-weight: bold; color: #a10000;}
#marketinfowin ul {margin: 0;}
]]></r>

var SCRIPT = ""+<r><![CDATA[
function median(array)
{
	array.sort(function(a,b) {return a - b;});
	var n = array.length - 1;
	if (n % 2)
		return (array[(n - 1) / 2] + array[(n + 1) / 2]) / 2;
	else
		return array[n / 2];
}

var infoHTTPReq;
function loadXMLDoc(url)
{
	infoHTTPReq = new XMLHttpRequest();

	if (infoHTTPReq != null) {
		infoHTTPReq.onreadystatechange = state_Change;
		infoHTTPReq.open("GET", url, true);
		infoHTTPReq.send(null);
	} else
		alert("Your browser does not support XMLHTTP.");
}

function state_Change()
{
	if (infoHTTPReq.readyState == 4) {
		// 4 = "loaded"
		if (infoHTTPReq.status == 200) {
			// 200 = OK
			var div = document.createElement("div");
			div.innerHTML = infoHTTPReq.responseText;
			var ph = document.getElementById("placeholder");
			ph.parentNode.replaceChild(div.getElementsByTagName("table")[1], ph);
		} else
			alert("Problem loadinging item info");
	}
}

function appendTableRow(table, td1, td2)
{
	var tr = document.createElement("tr");
	var td = document.createElement("td");
	td.innerHTML = td1;
	tr.appendChild(td);
	td = document.createElement("td");
	td.setAttribute("class", "number");
	td.innerHTML = td2;
	tr.appendChild(td);
	table.appendChild(tr);
}

function searchItem(name)
{
	document.slist.search_item.value = unescape(name);
	document.slist.submit();
}

function searchSales(name)
{
	document.soldlist.sold_item.value = unescape(name);
	document.soldlist.submit();
}

function loadItemInfo(lnk)
{
	if (document.getElementById("placeholder") && document.getElementById("placeholder").innerHTML == "") {
		document.getElementById("placeholder").innerHTML = "Loading...";
		loadXMLDoc('/billy/bvs/iteminfo.html?item=' + unescape(lnk));
	}
}

//The following code is added by Garyzx
function showGraph(name, days){
	name=unescape(name);
	var div = document.getElementById("graphDiv");
	div.innerHTML="";
	var object=document.createElement("object");
	object.type="image/svg+xml";
	d=new Date();
	d.setDate(d.getDate()-days);
	object.data="http://bvs-garyzx.appspot.com/bvs/marketplacegraph.svg?item="+name+"&starttime="+Math.floor(d.getTime()/60000)+"&scale=0.45";
	div.appendChild(object);

}
//End modifications

function itemInfo(name, lnk, popit)
{
	name = unescape(name);
	lnk = unescape(lnk);

	var BMA = window.bvs_market_analyzer;
	/*if (!BMA || popit) {
		var w = window.open('iteminfo.html?item=' + lnk, 'ItemInfo', 'location,width=330,height=180');
		w.focus();
		return false;
	}*/

	
	var infowin = document.getElementById("marketinfowin");
	if (!infowin) {
		var shadow = document.createElement("div");
		shadow.setAttribute("class", "dropshadow");
		document.body.appendChild(shadow);
		infowin = document.createElement("div");
		infowin.id = "marketinfowin";
		shadow.appendChild(infowin);
	}

	var node;
	while (node = infowin.firstChild)
		infowin.removeChild(node);
	
	infowin.innerHTML = "<img id='closebutton' "+
		"onclick=\"document.body.removeChild(document.getElementById('marketinfowin').parentNode)\" " +
		"title='Close' " +		"src='data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%03%00%00%00(-%0FS%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00TPLTE%BA%0C%0C%BF%1D%1D%C1%26%26%C1((%C1))%C8%3D%3D%C8%3F%3F%CBHH%CDPP%D6nn%DC%83%83%DD%89%89%DE%89%89%E2%98%98%E4%A0%A0%EC%BA%BA%F1%CB%CB%F3%D7%D7%F4%D7%D7%F6%E1%E1%F7%E3%E3%FB%F0%F0%FB%F2%F2%FB%F3%F3%FC%F6%F6%FE%FB%FB%FE%FE%FE%FF%FF%FFD%88%E1%E1%00%00%00rIDAT%18%D3%5D%CFY%0E%80%20%10%03%D0%BA%E0%8E%8A%0A(%BD%FF%3D%8Da%08%EA%FC%F5%25M%3A%08%FC%5C%00%F19%3EP%A5T%09lK%CC%CB%26%80%F9%EC%80%EE%9CS%05%188%8E%1C%90%01%139%E1%05%E5N%EEe%86%C6q%5D%E9%9A%04%B5%E7%01%1C%F4%B5%80%E5%A5%00u%D1Fh%03%F5S%D7%0C%AD%80%89%C3%8C%00%FA%22B%D1%E7%1D%AF%E7%FE%EF%DF%8Eb%0A%CB%F1%17%10%11%00%00%00%00IEND%AEB%60%82'/>" +
		"<img id='infobutton' "+
		"onclick=\"loadItemInfo('" + escape(lnk) + "')\" " +
		"title='Info' " +
"src='data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%03%00%00%00(-%0FS%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%84PLTE%16Q%AA%19S%AB%1BT%AB-a%B22e%B47i%B6%3Al%B7%40p%B9Ds%BAHv%BCJw%BDR%7D%C0S~%C0U%80%C1W%81%C1%60%88%C5c%8A%C5f%8C%C7r%96%CC~%9F%D0%80%A0%D0%97%B1%D9%9A%B3%D9%9C%B5%DB%A6%BC%DE%AD%C1%E0%B6%C8%E4%B6%C9%E4%BC%CD%E6%CA%D8%EC%D1%DC%EE%D8%E2%F1%DE%E6%F2%DE%E6%F3%E3%EA%F4%E4%EA%F5%E7%ED%F6%EC%F1%F8%EE%F2%F9%F9%FB%FD%FA%FB%FD%FD%FD%FE%FC%FE%FE%FF%FF%FF%CDU%9D%18%00%00%00dIDAT%18%D3%5D%CFE%0E%C0P%08%04%D0Rwww%E3%FE%F7k%17M%3Et%96%2F%04%18%09%7F%91%10X%3E%90u%D3%D4(d%C3%BEu%A9%00u%E8%CB%16%8FXL%D8%1A(%2B%16%02%DE8x%26%14%A2%13%1B%B2%14%DC%FB%AA%E8%15%C8%E6%91%FD%01V%18p%C8%97%89C%FD%96%60%60%F8%1E%9F%A0%E5~y%00%81%D7%0F%95%FE%E9%BB%BF%00%00%00%00IEND%AEB%60%82'/>" +
		"<h1>" + name + "</h1><div id='placeholder'/>";
	if(BMA){
		var prices = BMA.getPriceList(name);
		if (!prices || prices.units <= 0) {
			var p = document.createElement("p");
			p.innerHTML = "No data!";
			infowin.appendChild(p);
		} else {
			var table = document.createElement("table");
			infowin.appendChild(table);
			table.setAttribute("class", "miw");
		
			var tr = document.createElement("tr");
			tr.setAttribute("class", "header");
			table.appendChild(tr);
			prices = BMA.getPriceList(name);
			tr.innerHTML = "<td colspan='2'>Last " + prices.list.length + "</td>";
			
			appendTableRow(table, "Average", BMA.prettyPrice(BMA.average(prices.list)));
			appendTableRow(table, "1st quartile", BMA.prettyPrice(BMA.percentile(prices.list, 0.25)));
			appendTableRow(table, "Median", BMA.prettyPrice(BMA.percentile(prices.list, 0.5)));
			appendTableRow(table, "3rd quartile", BMA.prettyPrice(BMA.percentile(prices.list, 0.75)));
			appendTableRow(table, "Sales", prices.list.length);
			appendTableRow(table, "Avg batch size", Math.round(prices.units / prices.list.length * 10) / 10);
		}
	}
	//The following code is added by Garyzx
		var div=document.createElement("div");
		name=escape(name);
		div.innerHTML="<a href='javascript:showGraph(\""+name+"\", 31)'>Graph last month</a><br/>";
		div.innerHTML+="<a href='javascript:showGraph(\""+name+"\", 7)'>Graph last week</a><br/>";
		div.innerHTML+="<a href='javascript:showGraph(\""+name+"\", 1)'>Graph last day</a>";
		name=unescape(name);
		infowin.appendChild(div);
		div=document.createElement("div");
		div.id="graphDiv";
		infowin.appendChild(div);
	//End modifications

	div = document.createElement("div");
	infowin.appendChild(div);
	div.innerHTML = "Search for " + name + ":</br><ul>" + 
		"<li><a href='javascript:searchItem(\"" + escape(name) + "\")'>Listings &gt;</a></li>" +
		"<li><a href='javascript:searchSales(\"" + escape(name) + "\")'>Sales &gt;</a></li>" +
		"</ul>(searching costs one marketplace action)";
	return false;
}
]]></r>

//
// Classes, globals
//

var villagemarketplacePage = {
	buylist:
		function() {
			var snap = document.evaluate("//form[@name='buylist']/div/table", document, null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			if (snap.snapshotLength == 1)
				return snap.snapshotItem(0);
			else if (snap.snapshotLength > 1)
				throw "Found " + snap.snapshotLength + " buylist tables, I'm confused now";
			throw "Couldn't locate buylist table";
		},
	saleslist:
		function() {
			var snap = document.evaluate("//center/table/tbody/tr/td/table/tbody/tr/td/center/table/tbody" +
				"/tr/td/center/table/tbody/tr/td/div/table", document, null, 
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			if (snap.snapshotLength == 1)
				return snap.snapshotItem(0);
			else if (snap.snapshotLength > 1)
				throw "Found " + snap.snapshotLength + " sales tables, I'm confused now";
			throw "Couldn't locate sales table";
		}
}

function Item()
{
	this.name = "";
	this.id = "";
	this.qty = 0;
	this.infoLink = "";
	this.price = 0;
	this.disabled = false;
	this.own = false;
	this.sameIP = false;
	this.ppu = 0;
	this.key = "";
}

function ItemStats()
{
	this.infoLink = "";
	this.prices = new Array();
	this.sorted = false;
	this.q1 = 0;
	this.q2 = 0;
	this.q3 = 0;
}

function priceString(p)
{
	// Add thousand separator
	// 1234567 -> "1,234,567"
	var str = "" + Math.round(p);
	return str.replace(/\d{1,3}(?=(\d{3})+(?![\d\w]))/g, "$&,");
}

function sortItem(i1, i2)
{
	// Sort by name, then price per item, then total price
	if (i1.name > i2.name)
		return 1;
	else if (i1.name < i2.name)
		return -1;
	var a = i1.ppu - i2.ppu;
	if (a == 0)
		return i1.price - i2.price;
	return a;
}

function sortNumber(a,b)
{
	return a - b;
}

function percentile(p, sortedList)
{
	// 0 <= p < 1
	if (sortedList.length <= 1)
		return sortedList[0];
	
	var i1 = Math.floor((sortedList.length - 1) * p);
	var i2 = i1 + 1;
	var w2 = (sortedList.length - 1) * p - i1;

	return (1 - w2) * sortedList[i1] + w2 * sortedList[i2];
}

function addHeaderNode(tag, type, text)
{
	var head = document.getElementsByTagName('head')[0];
	if (!head)
		return;
	var node = document.createElement(tag);
	node.type = type;
	node.innerHTML = text;
	head.appendChild(node);
}

//
// Buylist tweak
//

function parseBuylist()
{
	// First find the buy list table
	var buylist = villagemarketplacePage.buylist();
	
	var trs = document.evaluate("//form[@name='buylist']/div/table/tbody/tr", document, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	var items = new Array();
	var itemStats = new Object();

	// Get data from each row in the buy list
	for (var i = 0; i < trs.snapshotLength; i++) {
		var data = trs.snapshotItem(i).getElementsByTagName("td");
		if (data.length != 3)
			return false;

		items[i] = new Item();
		
		// First td - radio button
		var radio = data[0].getElementsByTagName("input")[0];
		items[i].id = radio.value;
		if (radio.getAttribute("disabled") != null)
			items[i].disabled = true;

		// Second td - item name, link, quantity
		items[i].name = data[1].getElementsByTagName("span")[0].firstChild.nodeValue;
		if (!items[i].name) {
			// Own listing (inside <font> tag)
			var name = data[1].getElementsByTagName("span")[0].firstChild.innerHTML;
			if (/Your (.*)/.test(name)) {
				// Remove "Your " prefix for sorting
				items[i].name = RegExp.lastParen;
				items[i].own = true;
			} else if (/Same IP: (.*)/.test(name)) {
				items[i].name = RegExp.lastParen;
				items[i].sameIP = true;
			}
		}
		items[i].key = items[i].name.replace(/[^\w\d]/g, "");
		
		if (itemStats[items[i].key] == null) {
			var res = /item=(\d+.[^']+)/.exec(data[1].getElementsByTagName("b")[0].innerHTML);
			itemStats[items[i].key] = new ItemStats();
			itemStats[items[i].key].infoLink = res[1];
		}
		
		var res = /Qty:.(\d+)/.exec(data[1].innerHTML);
		items[i].qty = parseInt(res[1]);

		// Third td - price
		var p = data[2].innerHTML;
		items[i].price = parseInt(p.replace(/,/g, ""));
		
		items[i].ppu = items[i].price / items[i].qty;
		
		itemStats[items[i].key].prices.push(items[i].ppu);
	}
	
	return [items, itemStats];
}

function itemClick(target)
{
	alert(target.innerHTML);
}

function replaceBuylist(items, itemStats)
{
	if (document.getElementById("buylisttable"))
		return false;

	// New div and table
	var div = document.createElement("div");
	div.setAttribute("class", "itemlist");
	var olddiv = document.getElementsByName("buylist")[0].getElementsByTagName("div")[0];
	document.getElementsByName("buylist")[0].replaceChild(div, olddiv);

	// Table
	var table = document.createElement("table");
	table.setAttribute("id", "buylisttable");
	div.appendChild(table);

	// Header
	var thead = document.createElement("thead");
	table.appendChild(thead);

	thead.innerHTML = "<tr><th>Item</th><th>Price (total)</th><th>Price per unit</th></tr>";

	// Body
	var tbody = document.createElement("tbody");
	tbody.setAttribute("id", "buylistbody");
	table.appendChild(tbody);

	// Sort
	items.sort(sortItem);

	// Create new item list
	for (var i = 0; i < items.length; i++) {
		var row = document.createElement("tr");
		row.setAttribute("class", (i % 2) ? "odd" : "even");
		if (items[i].disabled)
			row.setAttribute("class", row.getAttribute("class") + " disabled");
		if (items[i].own)
			row.setAttribute("class", row.getAttribute("class") + " own");
		tbody.appendChild(row);

		td = document.createElement("td");
		td.setAttribute("class", "item");
		row.appendChild(td);

		// Radiobutton, possibly disabled
		var input = document.createElement("input");
		input.setAttribute("class", "radio");
		input.type = "radio";
		input.value = items[i].id;
		if (items[i].disabled)
			input.setAttribute("disabled", "true");
		input.setAttribute("name", "buy_item");
		td.appendChild(input);

		// Name and quantity
		span = document.createElement("span");
		span.setAttribute("class", "iteminfo");
		span.setAttribute("onclick", "itemInfo(\'" + escape(items[i].name) + "\', \'" +
			escape(itemStats[items[i].key].infoLink) + "\')");
		if (items[i].own)
			span.innerHTML = "Your " + items[i].name;
		else if (items[i].sameIP)
			span.innerHTML = "Same IP: " + items[i].name;
		else
			span.innerHTML = items[i].name;
		td.appendChild(span);
		
		qty = document.createTextNode(" (Qty: " + items[i].qty + ")");
		td.appendChild(qty);
		
		// Price
		td = document.createElement("td");
		td.setAttribute("class", "price");
		td.innerHTML = priceString(items[i].price) + " Ryo";
		row.appendChild(td);

		// Price per unit
		td = document.createElement("td");
		td.setAttribute("class", "price");
		td.innerHTML = priceString(items[i].ppu) + " Ryo";
		
		// Check for expensive listings but only if we can see at least 3 listings
		// expensive: price greater than 3rd quartile and median + 25%
		if (itemStats[items[i].key].prices.length >= 3) {
			var plist = itemStats[items[i].key].prices;

			if (!itemStats[items[i].key].sorted) {
				plist.sort(sortNumber);
				itemStats[items[i].key].sorted = true;
			}

			if (itemStats[items[i].key].q3 == 0) {
				itemStats[items[i].key].q2 = percentile(0.50, plist);
				itemStats[items[i].key].q3 = percentile(0.75, plist);
			}

			var expensive = Math.max(itemStats[items[i].key].q3,
				itemStats[items[i].key].q2 * 1.25);

			if (items[i].ppu > expensive)
				td.setAttribute("class", td.getAttribute("class") + " expensive");
		}
		
		row.appendChild(td);
	}

	return true;
}

addHeaderNode("style", "text/css", STYLESHEET);
addHeaderNode("script", "text/javascript", SCRIPT);

var res = parseBuylist();
replaceBuylist(res[0], res[1]);
