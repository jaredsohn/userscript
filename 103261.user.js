// ==UserScript==
// @name           BvS Marketplace Helper (Firefox 4)
// @namespace      Garyzx
// @description    BvS Marketplace Tweak and Market Analyzer for Firefox 4: Show graphs and sort listings by price per unit in the Marketplace.  Upload data to server.
// @include        http://www.animecubed.com/billy/bvs/villagemarketplace.html
// @include        http://animecubed.com/billy/bvs/villagemarketplace.html
// @version        1.00
// @history        1.00 Initial version
// ==/UserScript==

/*
This script uploads the following information for each Marketplace sale:
	item name
	quantity
	price
	length posted
	time
*/

try{
    ScriptUpdater.check(103261, "1.00");
} catch(e){}


/*
Copyright (c) 2009 Daniel Karlsson
Copyright (c) 2011 Garyzx

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



//=====BvS Marketplace Tweak=====

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

function searchItem(name){
	var form=document.forms.namedItem("slist");
	form.children.namedItem("search_item").value = unescape(name);
	form.wrappedJSObject.submit();
}
unsafeWindow.searchItem=searchItem;

function searchSales(name){
	var form=document.forms.namedItem("soldlist");
	form.children.namedItem("sold_item").value = unescape(name);
	form.wrappedJSObject.submit();
}
unsafeWindow.searchSales=searchSales;

function loadItemInfo(lnk)
{
	if (document.getElementById("placeholder") && document.getElementById("placeholder").innerHTML == "") {
		document.getElementById("placeholder").innerHTML = "Loading...";
		loadXMLDoc('/billy/bvs/iteminfo.html?item=' + unescape(lnk));
	}
}
unsafeWindow.loadItemInfo=loadItemInfo;

function showGraph(name, days){
	name=unescape(name);
	var div = document.getElementById("graphDiv");
	div.innerHTML="";
	var img=document.createElement("img");
	d=new Date();
	d.setDate(d.getDate()-days);
	img.alt="Loading...";
	img.src="http://bvs-garyzx.appspot.com/bvs/marketplacegraph.svg?item="+name+"&starttime="+Math.floor(d.getTime()/60000)+"&scale=0.45";
	img.addEventListener("error", function(){div.innerHTML="No data!"; }, false);
	var a=document.createElement("a");
	a.href="http://bvs-garyzx.appspot.com/bvs/Marketplace.xhtml?item="+name;
	a.target="_blank";
	div.appendChild(a);
	a.appendChild(img);
}
unsafeWindow.showGraph=showGraph;

function itemInfo(name, lnk, popit){
	getPriceList(unescape(name), function(prices){
		itemInfoCallback(name, lnk, popit, prices);
	});
}

function itemInfoCallback(name, lnk, popit, prices)
{
	name = unescape(name);
	lnk = unescape(lnk);
	
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
	if (!prices || prices.units <= 0) {
		/*var p = document.createElement("p");
		p.innerHTML = "No data!";
		infowin.appendChild(p);*/
	} else {
		var table = document.createElement("table");
		infowin.appendChild(table);
		table.setAttribute("class", "miw");
	
		var tr = document.createElement("tr");
		tr.setAttribute("class", "header");
		table.appendChild(tr);
		tr.innerHTML = "<td colspan='2'>Last " + prices.list.length + "</td>";
		
		appendTableRow(table, "Average", prettyPrice(average(prices.list)));
		appendTableRow(table, "1st quartile", prettyPrice(percentile2(prices.list, 0.25)));
		appendTableRow(table, "Median", prettyPrice(percentile2(prices.list, 0.5)));
		appendTableRow(table, "3rd quartile", prettyPrice(percentile2(prices.list, 0.75)));
		appendTableRow(table, "Sales", prices.list.length);
		appendTableRow(table, "Avg batch size", Math.round(prices.units / prices.list.length * 10) / 10);
	}
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

	div = document.createElement("div");
	infowin.appendChild(div);
	div.innerHTML = "Search for " + name + ":</br><ul>" + 
		"<li><a href='javascript:searchItem(\"" + escape(name) + "\")'>Listings &gt;</a></li>" +
		"<li><a href='javascript:searchSales(\"" + escape(name) + "\")'>Sales &gt;</a></li>" +
		"</ul>(searching costs one marketplace action)";
	return false;
}

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
	div.id="top25";

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
		//span.setAttribute("onclick", "itemInfo(\'" + escape(items[i].name) + "\', \'" +
		//	escape(itemStats[items[i].key].infoLink) + "\')");
		span.addEventListener("click", function(name, link){
			return function(){itemInfo(name, link)}
		}(escape(items[i].name), escape(itemStats[items[i].key].infoLink)), false);
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

var res = parseBuylist();
replaceBuylist(res[0], res[1]);




//=====BvS Market Analyzer=====

var BillyTZ = 5 * 60 * 60 * 1000; // milliseconds from UTC

var OneDay = 24 * 60; // in minutes
var OneWeek = 7 * OneDay;
var OneMonth = 4 * OneWeek;

var PurgeTime = 2 * OneMonth; // Older DB entries are deleted

var db = null;

function Sale()
{
	this._hash = 0; // use key() method to access
	this.item = "";
	this.units = 0;
	this.price = 0; // Price per unit
	this.buyer = "";
	this.seller = "";
	this.postlength = 0;
	this.timestamp = 0; // Minutes since 1970-01-01
	this.data = function() {
		return {key:this.key(), item:this.item, units:this.units, price:this.price,
			buyer:this.buyer, seller:this.seller, postlength:this.postlength, timestamp:this.timestamp};
	}
	this.key = function() {
		// Calculate and return hash key
		// used to detect duplicate entries
		if (this._hash == 0) {
			var str = this.item + ":" + this.seller + ":" + this.buyer + ":" + this.timestamp + ":" +
				this.postlength + ":" + Math.round(this.price) + ":" + this.units;
			this._hash = djb2hash(str);
		}
		return this._hash;
	}
	this.isValid = function() {
		// Sanity check
		if (!this.item || this.item == "")
			return false;
		if (!this.seller || this.seller == "")
			return false;
		if (!this.buyer || this.buyer == "")
			return false;
		if (this.units <= 0)
			return false;
		if (this.price <= 0)
			return false;
		if (this.postlength < 0)
			return false;
		if (this.timestamp <= 0)
			return false;
		if (this.key() == 0)
			return false;
		return true;
	}
}

function round3d(n)
{
	// Round to 3 significant digits
	if (n < 0)
		return -round3d(-n);
	else if (n == 0)
		return 0;
	// m = 10^(number of digits - 1)
	// Divide n by m to get a number in range [1, 10[
	var m = Math.pow(10, Math.floor(Math.log(n) / Math.log(10)));

	// 100 <= n / m * 100 < 1000
	// round off, scale back to original magnitude and return
	return Math.round(Math.round(n / m * 100) / 100 * m);
}

function nowTimestamp()
{
	// Minutes since 1970-01-01 UTC
	var date = new Date();
	date.setTime(date.getTime() + BillyTZ - date.getTimezoneOffset() * 60 * 1000);
	return date.getTime() / 60000;
}

function parseTime(t)
{
	// Parse date and time, adjust to UTC by correcting for local and Billy TZ
	// t format: "7/23 (Thu - 16:21)"
	// TODO: Simplicity over accuracy, this could fail during new year

	var date = new Date();
	var d = t.match(/(\d+)\/(\d+)[^\d]+(\d+)\:(\d+)/);
	date.setMonth(parseInt(d[1]) - 1, parseInt(d[2]));
	date.setHours(parseInt(d[3]));
	date.setMinutes(parseInt(d[4]), 0, 0);
	date.setTime(date.getTime() + BillyTZ - date.getTimezoneOffset() * 60 * 1000);
	return date;
}

function djb2hash(str)
{
	// String hash by Daniel J Bernstein (comp.lang.c)
	var hash = 5381;

	for (var i = 0; i < str.length; i++)
		hash = (hash * 33 + str.charCodeAt(i)) % 4294967296;

	return hash;
}

function parseSalesTable()
{
	var salesTable = document.getElementById("last25s").children[0];
	var salesList = new Array();
	var n = 0;
	//for (var i = 0; i < salesTable.snapshotLength; i++) {
	var tds = salesTable.getElementsByTagName("td");

	for (var j = 0; j < tds.length; j++) {
		var txt = tds[j].innerHTML;
		var match = /(.*) bought (\d+) (.*) from (.*) for ([\d,]+) Ryo/.exec(txt);
		if (match) {
			salesList[n] = new Sale();
			sale = salesList[n];
			sale.units = parseInt(match[2]);
			sale.buyer = match[1].replace(/[^\w\d\s]/g, "");
			sale.seller = match[4].replace(/[^\w\d\s]/g, "");
			sale.item = match[3];
			sale.price = parseInt(match[5].replace(/,/g, "")) / sale.units;

			match = /(\d+\/\d+ \(\w+ - \d+\:\d+\)).*Length Posted: (.*)\)/.exec(txt);
			var d = parseTime(match[1]);
			sale.timestamp = Math.round(d.getTime() / 60000); // ms -> min
			if (/(\d+) seconds/.test(match[2]))
				sale.postlength = parseInt(RegExp.lastParen);
			else if (/(\d+) minutes/.test(match[2]))
				sale.postlength = parseInt(RegExp.lastParen) * 60;
			else if (/(\d+) hours/.test(match[2]))
				sale.postlength = parseInt(RegExp.lastParen) * 3600;
			else if (/(\d+) days/.test(match[2]))
				sale.postlength = parseInt(RegExp.lastParen) * 86400;
			else
				// Autobuy probably
				sale.postlength = 0;
			n++;
		} else
			break;
	}
	//}
	return salesList.length > 0 ? salesList : null;
}

function getPriceList(item, callback){
	var unitsTotal = 0;
	var list = [];
	db.transaction("Sales").objectStore("Sales").index("item")
			.openCursor(IDBKeyRange.wrappedJSObject.only(item)).onsuccess = function(event){
		var cursor = event.target.result;
		if (cursor) {
			list.push({price: cursor.value.price, units: cursor.value.units});
			unitsTotal+=cursor.value.units;
			cursor.continue();
		}
		else{
			list.sort(function(a, b) a.price-b.price);
			callback({list: list, units: unitsTotal});
		}
	}
}

function percentile2(list, p)
{
	var sum = 0;
	var i;
	
	for (i = 0; i < list.length; i++)
		sum += list[i].units;

	var n = 0;
	for (i = 0; i < list.length; i++) {
		n += list[i].units;
		if (n >= p * sum)
			return list[i].price;
	}

	return 0;
}

function average(list)
{
	var units = 0;
	var pricetot = 0;
	for (var i = 0; i < list.length; i++) {
		units += list[i].units;
		pricetot += list[i].units * list[i].price;
	}
	return pricetot / units;
}

function prettyPrice(n)
{
	var str = "" + round3d(n) + " Ryo";
	return str.replace(/\d{1,3}(?=(\d{3})+(?![\d\w]))/g, "$&,");
}

function init()
{
	
	var request = mozIndexedDB.open("Marketplace");
	request.onerror = function(event) {
		alert("IndexedDB is not supported on this browser.");
	};
	request.onsuccess = function(event) {
		db = event.target.result;
		db.onerror = function(event) {
			alert("Database error: " + event.target.errorCode);
		};
		if(db.version != "1.0") {
			db.setVersion("1.0").onsuccess = function(event){
				var objectStore = db.createObjectStore("Sales");
				objectStore.createIndex("item", "item");
				objectStore.createIndex("timestamp", "timestamp");
				main();
			}
		}
		else
			main();
	};
	
}

function main()
{
	
	var list = parseSalesTable();
	var str="";
	var numRows=0;
	
	var transaction=db.transaction(["Sales"], IDBTransaction.wrappedJSObject.READ_WRITE);
	var os=transaction.objectStore("Sales");
	
	function storeSale(sale){
		var req=os.get(sale.key());
		req.onsuccess = function(event){
			if(!event.target.result){
				os.put(sale.data(), sale.key()).onsuccess = function(event){
					numRows++;
					str+=sale.key()+","+sale.item+","+sale.units+","+sale.price+","+sale.postlength+","+sale.timestamp+"\n";
				}
			}
		}
	}
		
	transaction.oncomplete = function(event){
		//GM_log("Total: " + list.length + ", inserted: " + numRows);
		
		if(numRows>0){
			str=numRows+"\n"+str;
			GM_xmlhttpRequest({
				method: "POST",
				url: "http://bvs-garyzx.appspot.com/bvs/marketplace",
				data: str,
				
				onload: function(response){GM_log("Server response: "+response.responseText);}
			});
		}
		
		db.transaction("Sales", IDBTransaction.wrappedJSObject.READ_WRITE).objectStore("Sales").index("timestamp")
				.openCursor(IDBKeyRange.wrappedJSObject.upperBound(nowTimestamp() - PurgeTime)).onsuccess = function(event){
			var cursor = event.target.result;
			if (cursor) {
				cursor.delete();
				cursor.continue();
			}
		}
		
	}
	
	for (var i in list){
		storeSale(list[i]);
	}

}

init();
