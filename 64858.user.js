// ==UserScript==
// @name           BvS Market Analyzer
// @namespace      BvS
// @include        http://*animecubed.com/billy/bvs/villagemarketplace*
// @description    Stores recent sales in a local database. Requires Google Gears. (Modified to upload data to Garyzx's server.)
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
	this.array = function() {
		// Array of data to store in DB
		return [this.key(), this.item, this.units, this.price, this.buyer, this.seller,
			this.postlength, this.timestamp];
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

function addLoadEvent(func)
{
	// Add onLoad hook
	var oldonload = unsafeWindow.onload;
	if (typeof unsafeWindow.onload != 'function') {
		unsafeWindow.onload = func;
	} else {
		unsafeWindow.onload = function() {
			if (oldonload) {
				oldonload();
			}
			func();
		}
	}
}

function parseSalesTable()
{
	var salesTable = document.evaluate("//center/table/tbody/tr/td/table/tbody/tr/td/center/table/tbody" +
		"/tr/td/center/table/tbody/tr/td/div/table", document, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var salesList = new Array();
	var n = 0;
	for (var i = 0; i < salesTable.snapshotLength; i++) {
		var tds = salesTable.snapshotItem(i).getElementsByTagName("td");

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
	}
	return salesList.length > 0 ? salesList : null;
}

function getPriceList(item)
{
	var unitsTotal = 0;
	var list = [];
	var rs = db.execute('select Price,Units from MarketplaceSales where Item=? order by Price asc', [item]);
	while (rs.isValidRow()) {
		list.push({price: rs.field(0), units: rs.field(1)});
		unitsTotal += rs.field(1);
		rs.next();
	}
	rs.close();
	return {list: list, units: unitsTotal};
}

function percentile(list, p)
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
	// Initialize Gears
	if (!unsafeWindow.google)
		unsafeWindow.google = {};
	if (!unsafeWindow.google.gears) {
		try {
			unsafeWindow.google.gears = {};
			unsafeWindow.google.gears.factory = unsafeWindow.GearsFactory();
		} catch(e) {
			alert("Error initializing Gears: " + e.message);
		}
	}
	// Open database
	try {
		db = unsafeWindow.google.gears.factory.create('beta.database');
		if (db) {
			db.open('bvs_marketplace');
			db.execute('create table if not exists MarketplaceSales ' +
				'(Key integer, Item text, Units integer, Price real, Buyer text, ' +
				'Seller text, Postlength integer, Timestamp integer)');
		}
	} catch (e) {
		alert("Error opening database: " + e.message);
	}

	if (!unsafeWindow.bvs_market_analyzer)
		unsafeWindow.bvs_market_analyzer = {};
	unsafeWindow.bvs_market_analyzer.getPriceList = getPriceList;
	unsafeWindow.bvs_market_analyzer.percentile = percentile;
	unsafeWindow.bvs_market_analyzer.average = average;
	unsafeWindow.bvs_market_analyzer.prettyPrice = prettyPrice;
	
	main();
}

function main()
{
	var list = parseSalesTable();
	var inserted = 0;
	var ignored = 0;
	var invalid = 0;
	var rs;
	
	//The following code is added by Garyzx
		var str="";
		var numRows=0;
	//End modifications
	
	// Store parsed sales
	for (var i in list) {
		try {
			rs = db.execute('select * from MarketplaceSales where Key=?', [list[i].key()]);
			if (rs.isValidRow()) {
				// Row already exists
				rs.close();
				ignored++;
				continue;
			}
			if (list[i].isValid()) {
				rs = db.execute('insert into MarketplaceSales values (?, ?, ?, ?, ?, ?, ?, ?)',
					list[i].array());
				rs.close()
				inserted++;
				//The following code is added by Garyzx
					numRows++;
					str+=list[i].key()+","+list[i].item+","+list[i].units+","+list[i].price+","+list[i].postlength+","+list[i].timestamp+"\n";
				//End modifications	
			} else
				invalid++;
		} catch (e) {
			alert(e);
			break;
		}
	}
	GM_log("Inserted: " + inserted + ", ignored: " + ignored + ", invalid: " + invalid);
	// Purge old data
	rs = db.execute('delete from MarketplaceSales where Timestamp<?', [nowTimestamp() - PurgeTime]);
	rs.close();
	//The following code is added by Garyzx
		if(numRows>0){
			str=numRows+"\n"+str;
			GM_xmlhttpRequest({
				method: "POST",
				url: "http://bvs-garyzx.appspot.com/bvs/marketplace",
				data: str,
				
				onload: function(response){GM_log(response.responseText);}
			});
		}
	//End modifications
}

addLoadEvent(init);
