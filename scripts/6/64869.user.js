// ==UserScript==
// @name           BvS Market Data Uploader
// @namespace      Garyzx
// @include        http://www.animecubed.com/billy/
// @description    BvS Marketplace bulk data uploader
// ==/UserScript==

var last;

function main(){
	last=GM_getValue("LastUpload", "0");
	var results=db.execute("select Key, Item, Units, Price, Postlength, Timestamp from MarketplaceSales where Timestamp>? order by Timestamp asc", [last]);
	if(!results.isValidRow()){
		alert("All entries have been uploaded.  Thank you for uploading.  Please disable this script.");
		return;
	}
	var str="";
	var numRows=0;
	while(results.isValidRow() && numRows<100){
		numRows++;
		for(var n=0; n<6; n++)
			str+=results.field(n)+",";
		str+="\n";
		last=results.field(5);
		results.next();
	}
	str=numRows+"\n"+str;
	GM_xmlhttpRequest({
		method: "POST",
		url: "http://bvs-garyzx.appspot.com/bvs/marketplace",
		data: str,
		
		onerror: function(response){alert("Error!");},
		onload: function(response){
			if (confirm(response.responseText+"more entries uploaded.\n\n"+(new Date(last*60000))+"\n\nPress OK to continue uploading or Cancel to stop."))
				main();
		}
	});
	results.close();
	GM_setValue("LastUpload", last);
}

//Copied stuff below:
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
var db = null;

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
	
	main();
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

addLoadEvent(init);
