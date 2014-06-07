// ==UserScript==
// @name           BvS Marketplace Quantity
// @namespace      BvS Marketplace Quantity
// @description    Show info about owned items in the marketplace
// @include        http://*animecubed.com/billy/bvs/villagemarketplace.html
// @include        http://*animecubed.com/billy/bvs/itemorder.html
// @require        http://userscripts.org/scripts/source/74144.user.js
// @version        0.5
// @history        0.5 Shortened XPath so BillyClub etc doesn't break it.
// @history        0.4 Fix for Firefox 3.x
// @history        0.3a Woops, debug statement left in release
// @history        0.3 Added script updater, added notice if user hasn't scanned items yet.
// @history        0.2 Opera/Chrome compatibility
// @history        0.1 Initial release
// @copyright      2011, BenV
// ==/UserScript==

/******************* Variables and Constants *******************/
const VERSION = "0.5";
const GMSTORAGE_PATH = "BvS_Marketplace_";

var gvar = new Object(); // Opera/Chrome fix var
var playerName;
var playerData = {};
/******************* Script updater  *******************/
try { ScriptUpdater.check(102981, VERSION); } catch(e){}
/******************* Utility functions *******************/
function dump(arr,level)
{
	var dumped_text = "";
	var level_padding = "";
	if(!level) level = 0;
	for(var j=0;j<level+1;j++) level_padding += "    ";
	if(typeof(arr) == 'object') // Array/Hashes/Objects
	{
		for(var item in arr)
		{
			var value = arr[item];
			if(typeof(value) == 'object')
			{
				dumped_text += level_padding + "'" + item + "' ===>\n";
				dumped_text += dump(value,level+1);
			}
			else
			{
				dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
			}
		}
	}
	else
	{
		dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
	}
	return dumped_text;
}

document.getElementByName = function(str)
{
	var rtrn = document.getElementsByName(str);
	if ((rtrn == null) || (rtrn.length == 0)) return null;
	return rtrn[0];
};

if(typeof(String.prototype.trim) === "undefined")
{
	String.prototype.trim = function()
	{
		return String(this).replace(/^\s+|\s+$/g, '');
	};
}

function GM_ApiBrowserCheck()
{
	if (typeof(unsafeWindow) === 'undefined') { unsafeWindow=window; }
	if (typeof(GM_log) === 'undefined') { GM_log = function(msg) { try { unsafeWindow.console.log('GM_log: ' + msg); } catch(e) {} }; }
	GM_clog = function(msg) { if (arguments.callee.counter) { arguments.callee.counter++; } else { arguments.callee.counter=1; } GM_log('('+arguments.callee.counter+') '+msg); }
	GM_addGlobalStyle = function(css)
	{
		var sel = document.createElement('style');
		sel.setAttribute('type','text/css');
		sel.appendChild(document.createTextNode(css));
		var hel = document.documentElement.firstChild;
		while (hel && hel.nodeName != 'HEAD') { hel=hel.nextSibling; }
		if (hel && hel.nodeName == 'HEAD') { hel.appendChild(sel); } else { document.body.insertBefore(sel,document.body.firstChild); }
		return sel;
	}
	
	var needApiUpgrade=false;

	if(window.navigator.appName.match(/^opera/i) && typeof(window.opera) != 'undefined')
	{
		needApiUpgrade=true; gvar.isOpera=true; GM_log=window.opera.postError; GM_log('Opera!');
	}

	if(typeof(GM_setValue) != 'undefined')
	{
		try
		{
			var gsv=GM_setValue.toString();
			if (gsv.indexOf('staticArgs') > 0) { gvar.isGreaseMonkey = true; GM_log('GreaseMonkey Api detected.'); }
			else if (gsv.match(/not\s+supported/)) { needApiUpgrade = true; gvar.isBuggedChrome = true; GM_log('Bugged Chrome GM Api detected.'); }
		}
		catch(e)
		{
			gvar.isGreaseMonkey = (typeof(GM_setValue) === 'function');
			if (gvar.isGreaseMonkey)
				GM_log('GreaseMonkey Api is assumed because of exception.');
			else
				needApiUpgrade = true;
		}
	}
	else
	{
		needApiUpgrade=true; GM_log('No GM Api detected.');
	}

	if(needApiUpgrade)
	{
		GM_log('Try to recreate needed GM Api.');
		var ws = null;
		try { ws=typeof(unsafeWindow.localStorage); unsafeWindow.localStorage.length; } catch(e) { ws=null; } // Catch Security error

		if (ws=='object')
		{
			GM_log('Using localStorage for GM Api.');
			GM_getValue=function(name,defValue) { var value=unsafeWindow.localStorage.getItem(GMSTORAGE_PATH+name); if(value==null) { return defValue; } else { switch(value.substr(0,2)) { case 'S]': return value.substr(2); case 'N]': return parseInt(value.substr(2)); case 'B]': return value.substr(2)=='true'; } } return value; }
			GM_setValue=function(name,value) { switch (typeof(value)) { case 'string': unsafeWindow.localStorage.setItem(GMSTORAGE_PATH+name,'S]'+value); break; case 'number': if(value.toString().indexOf('.')<0) { unsafeWindow.localStorage.setItem(GMSTORAGE_PATH+name,'N]'+value); } break; case 'boolean': unsafeWindow.localStorage.setItem(GMSTORAGE_PATH+name,'B]'+value); break; } }
			GM_deleteValue=function(name) { unsafeWindow.localStorage.removeItem(GMSTORAGE_PATH+name); }
		}
		else if(!gvar.isOpera || typeof(GM_setValue)=='undefined')
		{
			GM_log('Using temporarilyStorage for GM Api.'); gvar.temporarilyStorage=new Array();
			GM_getValue=function(name,defValue) { if(typeof(gvar.temporarilyStorage[GMSTORAGE_PATH+name])=='undefined') { return defValue; } else { return gvar.temporarilyStorage[GMSTORAGE_PATH+name]; } }
			GM_setValue=function(name,value) { switch (typeof(value)) { case "string": case "boolean": case "number": gvar.temporarilyStorage[GMSTORAGE_PATH+name]=value; } }
			GM_deleteValue=function(name) { delete gvar.temporarilyStorage[GMSTORAGE_PATH+name]; };
		}
		
		if(typeof(GM_openInTab)==='undefined') { GM_openInTab=function(url) { unsafeWindow.open(url,""); } }
		if(typeof(GM_registerMenuCommand)==='undefined') { GM_registerMenuCommand=function(name,cmd) { GM_log("Notice: GM_registerMenuCommand is not supported."); } } // Dummy
		if(!gvar.isOpera || typeof(GM_xmlhttpRequest)=='undefined')
		{
			GM_log('Using XMLHttpRequest for GM Api.');
			GM_xmlhttpRequest=function(obj)
			{
				var request=new XMLHttpRequest();
				request.onreadystatechange=function() { if(obj.onreadystatechange) { obj.onreadystatechange(request); }; if(request.readyState==4 && obj.onload) { obj.onload(request); } }
				request.onerror=function() { if(obj.onerror) { obj.onerror(request); } }
				try { request.open(obj.method,obj.url,true); } catch(e) { if(obj.onerror) { obj.onerror( {readyState:4,responseHeaders:'',responseText:'',responseXML:'',status:403,statusText:'Forbidden'} ); }; return; }
				if(obj.headers) { for(name in obj.headers) { request.setRequestHeader(name,obj.headers[name]); } }
				request.send(obj.data); return request;
			}
		}
	}
}
/******************* Program start *******************/
function getGM()
{
	GM_log("Loading old data.");
	var value = GM_getValue(playerName, "{}");
	if ((value == undefined) || (value == null) || (value == ""))
	{
		alert("No data found!");
		value = "{}";
	}
	playerData = JSON.parse(value);
}

function saveGM()
{
	GM_log("Saving data.");
	GM_setValue(playerName, JSON.stringify(playerData));
}

function load(ev)
{
	try
	{
		var temp = document.getElementByName("player");
		if ((temp == null) || (temp.localName.toLowerCase() == "text") || (temp.value.length == 0))
			return;
		playerName = temp.value

		GM_ApiBrowserCheck(); /* Fix for Opera etc */
		getGM();
		parsePage();
		applyGM();
	}
	catch(e)
	{
		alert("Marketplace quantity failure!\n\nError name: " + e.name + "\nError message: " + e.message);
	}
}

function waitForReady(callback)
{
	var docState;
	try { docState = unsafeWindow.document.readyState; } catch(e) { docState = null; }
	if(docState)
	{
		if ((docState != 'complete') && (docState != 'interactive'))
		{
			window.setTimeout(waitForReady, 150, callback);
			return;
		}
	}
	callback();
}

function parsePage()
{
	/* The bucket item reorder page looks like this:
		<UL id=DragContainer7 history="History1">
		<LI id=ListItem0 style="margin:3px;font-weight:bold"><font style="font-weight:normal">29</font> Roll of Tickets</LI>
		<LI id=ListItem1 style="margin:3px;font-weight:bold"><font style="font-weight:normal">27</font> Acid Vial</LI>
	   The XX is the "items below this line" blabla line.
	*/
	if (document.getElementById("DragContainer7") != null)
	{
		// Create new items hash.
		playerData["items"] = {};
		var s = document.evaluate("//ul[@id='DragContainer7']/li[not(contains(@id,'XX'))]/font[1]/text()|//ul[@id='DragContainer7']/li[not(contains(@id,'XX'))]/text()", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = 0; i < s.snapshotLength; i+=2)
		{
			var itemQty = s.snapshotItem(i).nodeValue.trim();
			var itemName = s.snapshotItem(i+1).nodeValue.trim();
			playerData.items[itemName] = itemQty;
		}
		GM_log("Items parsed.");
		saveGM();
	}
}

function applyGM()
{
	var s = document.evaluate("//center/table/tbody/tr/td/font/b[contains(text(), 'Marketplace')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (s == null || s.snapshotLength < 1)
	{
		GM_log("Wrong page.");
		return;
	}
	if (typeof(playerData.items) === "undefined")
	{
		GM_log("No items stored.");
		// Give user a warning.
		var wDiv = document.createElement("div");
		wDiv.style.backgroundColor = '#F00';
		wDiv.style.color = '#FFF';
		wDiv.style.fontWeight = 'bold';
		wDiv.style.padding = '30px';
		wDiv.innerHTML = "BvS Marketplace Quantity<br>WARNING: Go to <a href=\"javascript:document.minim12.submit();\">Bucket</a> -> Item Reorganization Menu first to load your items!";
		var center = document.getElementsByTagName('center')[0];
		center.insertBefore(wDiv, center.firstChild);
		return;
	}
	/* I would do this in one loop, but since the DOM is changed either greasemonkey bitches or nothing happens. Feh. */
	/* Change text */
	// var path = "//center/table/tbody/tr/td/table[2]/tbody/tr[2]/td/center/table/tbody/tr[3]/td[3]/center/table/tbody/tr/td//form/div/table/tbody/tr/td[2]";
	var path = "//form/div/table/tbody/tr/td[2]";
	var r = document.evaluate(path, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < r.snapshotLength; i++)
	{
		// Get itemname
		var tmp = document.evaluate("./b/span/text()", r.snapshotItem(i), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		if (tmp.snapshotLength > 0)
		{
			var node = tmp.snapshotItem(0);
			var iname = node.nodeValue;
			if (typeof(playerData.items[iname]) === "undefined")
			{
				node.parentNode.parentNode.parentNode.innerHTML = node.parentNode.parentNode.parentNode.innerHTML.replace(/(Qty:\s*[0-9]+)/i,"$1|Own: <strong>0</strong>");
			}
			else
			{
				var inv = playerData.items[iname];
				node.parentNode.parentNode.parentNode.innerHTML = node.parentNode.parentNode.parentNode.innerHTML.replace(/(Qty:\s*[0-9]+)/i,"$1|Own: "+inv);
			}
		}
	}
	/* Change colors */
	r = document.evaluate(path, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < r.snapshotLength; i++)
	{
		// Get itemname
		var tmp = document.evaluate("./b/span/text()", r.snapshotItem(i), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		if (tmp.snapshotLength > 0)
		{
			var node = tmp.snapshotItem(0);
			var iname = node.nodeValue;
			if (typeof(playerData.items[iname]) === "undefined")
			{
				node.parentNode.style.fontWeight = 'heavy';
				node.parentNode.style.color = '#0000FF';
				node.parentNode.style.backgroundColor = '#FF0000'; // red
			}
			else
			{
				var inv = playerData.items[iname];
				if (inv > 10)
				{
					node.parentNode.style.backgroundColor = '#00FF00'; // green
				}
				else
				{
					node.parentNode.style.backgroundColor = '#FFFF00'; // yellow
				}
			}
		}
	}
	GM_log("Change done!");
}
waitForReady(load);
// EOF
