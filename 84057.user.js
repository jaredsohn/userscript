// ==UserScript==
// @name           UltraCorps Minion
// @namespace      http://ultracorps.sjgames.com/
// @description    Useful helpers for the browser game http://ultracorps.sjgames.com/
// @include        http://ultracorps.sjgames.com/zgame/game/*
// @author         Alexander Miseler
// @version        0.1.0
// @require        http://sizzlemctwizzle.com/updater.php?id=84057&days=1
// ==/UserScript==


// *************************************************************************************************
// UltraCorps is copyright © 1998-2002, 2005-2010 by Steve Jackson Games.
// UltraCorps is a trademark of Steve Jackson Games, which reserves all rights.
// This program was created and distributed by permission of Steve Jackson Games.
// Conquest is Job One!
// *************************************************************************************************


// *************************************************************************************************
// Utils

function defined(variable)
{
	if(typeof variable == "undefined") return false;
	return true;
}
function undefined(variable)
{
	return !defined(variable);
}
String.prototype.contains = function(search)
{
	return this.indexOf(search) != -1;
}
String.prototype.format = function()
{
	var pattern = /\{\d+\}/g;
	var args = arguments;
	return this.replace(pattern, function(capture){ return args[capture.match(/\d+/)]; });
}
var HTTPRequest=Object();
HTTPRequest.urlEncode = function (array)
{
	var result="";
	var delimiter="";
	for(i in array)
	{
		result += delimiter+encodeURIComponent(i)+"="+encodeURIComponent(array[i]);
		delimiter="&";
	}
	return result;
}
HTTPRequest.waitForAllRequests = function(callback)
{
	if(undefined(HTTPRequest.open_requests)) callback();
	else if(HTTPRequest.open_requests.length==0) callback();
	else
	{
		if(undefined(HTTPRequest.waiting_callbacks)) HTTPRequest.waiting_callbacks = new Array();
		HTTPRequest.waiting_callbacks.push(callback);
	}
}
HTTPRequest.getNewRequestId = function()
{
	if(undefined(HTTPRequest.next_request_id)) HTTPRequest.next_request_id = 0;
	return HTTPRequest.next_request_id += 1;
}
HTTPRequest.requestFinished = function(id)
{
	var index = HTTPRequest.open_requests.indexOf(id);
	if(index != -1) HTTPRequest.open_requests.splice(index, 1);
	if(HTTPRequest.open_requests.length==0 && defined(HTTPRequest.waiting_callbacks))
	{
		var callbacks = HTTPRequest.waiting_callbacks;
		HTTPRequest.waiting_callbacks = new Array();
		for(index in callbacks) callbacks[index]();
	}
}
HTTPRequest.POST = function(url, data, callback, fallback)
{
	if(undefined(HTTPRequest.open_requests)) HTTPRequest.open_requests = new Array();
	var requestId = HTTPRequest.getNewRequestId();
	HTTPRequest.open_requests.push(requestId);
	GM_xmlhttpRequest({
		method: 'POST',
		url: url,
		headers: {
			'User-agent': 'Mozilla/5.0 (compatible) UC_Minion',
			'Accept': 'text/html,application/xhtml+xml',
			"Content-Type": "application/x-www-form-urlencoded",
		},
		data: HTTPRequest.urlEncode(data),
		onload: function(details)
		{
			GM_log("finished request -> status: {0}    text: {1}    state: {2}".format(details.status,details.statusText,details.readyState));
			if(details.readyState==4)
			{
				HTTPRequest.requestFinished(requestId);
				if(details.status==200)
				{
					if(callback) callback(details);
				}
				else if(fallback)
				{
					fallback(details);
				}
			}
		}
	});
}
HTTPRequest.GET = function(url, data, callback, fallback)
{
	if(undefined(HTTPRequest.open_requests)) HTTPRequest.open_requests = new Array();
	var requestId = HTTPRequest.getNewRequestId();
	HTTPRequest.open_requests.push(requestId);
	GM_xmlhttpRequest({
		method: 'GET',
		url: url+"?"+HTTPRequest.urlEncode(data),
		headers: {
			'User-agent': 'Mozilla/5.0 (compatible) UC_Minion',
		},
		onload: function(details)
		{
			GM_log("finished request -> status: {0}    text: {1}    state: {2}".format(details.status,details.statusText,details.readyState));
			if(details.readyState==4)
			{
				HTTPRequest.requestFinished(requestId);
				if(details.status==200)
				{
					if(callback) callback(details);
				}
				else if(fallback)
				{
					fallback(details);
				}
			}
		}
	});
}

// *************************************************************************************************
// BUTTON: Smart Max
// smart max buy function for planet production (queues max buildable for this turn + max lock)

if(document.location.pathname == "/zgame/game/worldproduction.html")
{
	// insert Smart Max button into upper button bar ...
	var inputs = document.getElementsByTagName("input");
	var buttonMaxLock = document.createElement("input");
	buttonMaxLock.type = "button";
	buttonMaxLock.name = "act";
	buttonMaxLock.value = "Smart Max";
	buttonMaxLock.addEventListener("click", buySmartMax, false);
	var before = inputs[5];
	before.parentNode.insertBefore(buttonMaxLock, before);
	before.parentNode.insertBefore(document.createTextNode('\n'), before);

	// ... and into lower button bar
	buttonMaxLock = document.createElement("input");
	buttonMaxLock.type = "button";
	buttonMaxLock.name = "act";
	buttonMaxLock.value = "Smart Max";
	buttonMaxLock.addEventListener("click", buySmartMax, false);
	before = inputs[inputs.length-5];
	before.parentNode.insertBefore(buttonMaxLock, before);
	before.parentNode.insertBefore(document.createTextNode('\n'), before);
}
function buySmartMax()
{
	var form = document.forms.namedItem("form");
	var units = document.getElementsByName("unit");
	var qty = form.elements.namedItem("qty");
	var qty2 = form.elements.namedItem("qty2");
	var unit = null;
	var worldId = parseInt(document.getElementsByTagName("input")[1].getAttribute("value"));
	GM_log("worldId: {0}".format(worldId));

	// find the selected unit
	if(units.length)
	{
		for (var i=0; i <= units.length-1; i++)
		{
			if(units[i].checked) unit = units[i];
		}
	}
	else unit = units;

	if(unit == null) alert("You didn't select a unit to order.");
	else
	{
		// find cost and max lock for selected unit
		var data = unit.parentNode.parentNode.getElementsByTagName("td");
		var maxLock = parseInt(data[3].innerHTML);
		data = data[8].innerHTML.split("<br>");
		var ult = parseInt(data[0].match(/(.*>)?\s*(\d+)/)[2]);
		var cpx = parseInt(data[1].match(/(.*>)?\s*(\d+)/)[2]);
		GM_log("unit: {0} max    {1} ult    {2} cpx".format(maxLock, ult, cpx));

		// find total available ult & cpx
		var ultLeft = 0;
		var cpxLeft = 0;
		var rows = document.getElementsByTagName("tr");
		var row = rows[rows.length-1];
		var cells = row.getElementsByTagName("td");
		if(cells.length!=3)
		{	// no left over info, either we already have a lock going into next turn
			// or there is exactly 0/0 left.
		}
		else
		{
			var cell = cells[1];
			if(cell.innerHTML.match(/The production queue is empty/))
			{// nothing queued; no left over info; we need to grab the total current ult/cpx
				row = row.parentNode.firstChild;
				cell = row.getElementsByTagName("td")[3].firstChild;
				data = cell.innerHTML.split("/");
				ultLeft = parseInt(data[0]);
				cpxLeft = parseInt(data[1]);
			}
			else
			{// we have either data or both. data not found in the left over field stays 0
				var result = null;
				result = cell.innerHTML.match(/(\d+)\s+ultranium/);
				if(result) ultLeft = parseInt(result[1]);
				result = cell.innerHTML.match(/(\d+)\s+population/);
				if(result) cpxLeft = parseInt(result[1]);
			}
		}
		GM_log("total: {0} max    {1} ult    {2} cpx".format(maxLock, ultLeft, cpxLeft));

		// reserve 1 ult and 1 pop for locking
		ultLeft -= 1;
		cpxLeft -= 1;
		
		// send this turns orders
		var order = null;
		while(ultLeft >= ult && cpxLeft >= cpx)
		{
			order = Math.min(Math.floor(ultLeft/ult), Math.floor(cpxLeft/cpx));
			order = Math.min(order,maxLock);
			ultLeft -= order * ult;
			cpxLeft -= order * cpx;
			GM_log("order: {0}    {1} ult    {2} cpx".format(order, ultLeft, cpxLeft));
			
			var params = {"worldID":worldId,"qty":order,"qty2":order,"act":"Buy","unit":unit.getAttribute("value")};
			HTTPRequest.POST('/zgame/game/worldproduction.html', params);
		}
		
		// and finally lock max for next turn
		// yes, this is called even when 0 pop or 0 ult is left or we already have a lock into next turn
		// thus the button works like a smart Max Buy button
		HTTPRequest.waitForAllRequests(function()
		{
			qty.value = maxLock;
			qty2.value = qty.value;
			form.submit();
		});
	}
}

// *************************************************************************************************
// MAP: double click on planet
// double click on a planet in the map centers on that planet
// single click still selects the planet
// ctrl+click centers on the planet without selecting it

if(document.location.pathname == "/zgame/game/map.cgi")
{
	var gameId = parseInt(unsafeWindow.gameID);
	var planets = document.getElementsByTagName("area");
	for (var i=0; i < planets.length; i++)
	{
		var planet = planets[i];
		var dblclick = function(event, obj)
		{
			if(undefined(obj)) obj = this;
			var planetId = parseInt(obj.href.match(/javascript:mapClick\((\d+)\)/)[1]);
			var params = {"gameID":gameId,"world":planetId};
			document.location.href = "/zgame/game/map.cgi?"+HTTPRequest.urlEncode(params);
		};
		planet.addEventListener("dblclick", dblclick, false);
		var click = function(event)
		{
			if(event.ctrlKey)
			{// don't select planets on single click
				event.stopPropagation();
				event.preventDefault();
				dblclick(event, this);
			}
		};
		planet.addEventListener("click", click, true);
	}
}

// *************************************************************************************************
// planet screen: hide "Show All Fleets" to make room for more fleet buttons

if(document.location.pathname == "/zgame/game/ultracorps.html")
{
	var form = document.getElementsByTagName("form")[0];
	if(undefined(form)) return;
	var inputs = form.getElementsByTagName("input");
	inputs[1].style.display="none"; // hide "Show All Fleets" button
	if(inputs[0].getAttribute("value")=="Make New Fleet")
	{
		inputs[0].setAttribute("value", "New Fleet")
	}
}

// *************************************************************************************************
// BUTTON: Combine Fleets

if(document.location.pathname == "/zgame/game/ultracorps.html")
{
	// insert Combine Fleets button
	var form = document.getElementsByTagName("form")[0];
	if(undefined(form)) return;
	var inputs = form.getElementsByTagName("input");
	var button = document.createElement("input");
	button.type = "button";
	button.value = "Combine Fleets";
	button.addEventListener("click", combineAllFleets, false);
	form.appendChild(button);
	form.appendChild(document.createTextNode('\n'));
}
function combineAllFleets_fillFromSpans(spans, units)
{
	var unitId = null;
	var count = null;
	for(var i=0; i<spans.length; i+=1)
	{
		var span = spans[i];
		var clss = span.getAttribute("class");
		if(clss.contains("left"))
		{
			unitId = parseInt(span.firstChild.href.match(/(\d+)'\)$/)[1]);
		}
		else if(clss.contains("bignum"))
		{
			count = span.children.length;
			if(span.lastChild.nodeType==3) count = span.lastChild.nodeValue;
			count = parseInt(count);
			if(units[unitId]) units[unitId] += count;
			else units[unitId] = count;
			// GM_log("unit: " + count + "*" + unitId);
		}
	}
}
function combineAllFleets()
{
	// remember the content of all relevant fleets
	var links = document.getElementsByTagName("a");
	var units = new Array();
	var fleets = new Array();
	for(var j=0; j<links.length; j++)
	{
		var link = links[j];
		var result = null;
		result = link.href.match(/javascript:fleetmgr\('disband',%20(\d+)/);
		if(result && link.parentNode.getAttribute("class").contains("combat")) // only do combat fleets
		{
			fleets.push(parseInt(result[1]));
			var spans = link.parentNode.parentNode.children[0].getElementsByTagName("span");
			combineAllFleets_fillFromSpans(spans, units);
		}
	}
	GM_log(units);
	
	// early out, no fleets to combine
	if(fleets.length < 2) return;
	
	// Kira uses some strange double entry bookkeeping for the fleet creation
	// thus we also need to know the base fleet amount of each unit
	var tds = document.getElementsByTagName("td");
	var base = new Array();
	var unitId = null;
	var count = null;
	for(var i=0; i<tds.length; i+=1)
	{
		var clss = tds[i].getAttribute("class");
		if(clss && clss.contains("base"))
		{
			var spans = tds[i].parentNode.parentNode.children[1];
			spans = spans.getElementsByTagName("span");
			combineAllFleets_fillFromSpans(spans, base);
		}
	}
	GM_log(base);
	
	// now disband the fleets in question
	disbandAllFleets();

	// disband causes reloads; remember data; continue after reload
	unsafeWindow.parent.combineFleets = [fleets, units, base];
}
if(document.location.pathname == "/zgame/game/ultracorps.html" && defined(unsafeWindow.parent.combineFleets))
{
	var container = unsafeWindow.parent.combineFleets;
	var fleets = container[0];
	var units = container[1];
	var base = container[2];
	
	// check whether all fleets are disbanded
	for(i in fleets)
	{
		GM_log("checking fleet {0}: {1}".format(fleets[i],document.getElementById("f_"+fleets[i])));
		if(document.getElementById("f_"+fleets[i])) return;
	}

	// remove temp data
	delete unsafeWindow.parent.combineFleets;

	// and finally create a new fleet that contains the remembered units
	GM_log("creating new fleet");
	var turn = parseInt(unsafeWindow.parent.map.document.getElementById("current").innerHTML.match(/Turn (\d+)/)[1]);
	var params = {	"worldID": parseInt(unsafeWindow.worldID),
					"game_turn": turn,
					"gameID": parseInt(unsafeWindow.gameID),
					"act":"Assemble Fleet",
					"fleet_type":"combat",
					"fleet_name":""
				};
	for(unitId in units)
	{
		count = units[unitId];
		base_count = 0;
		if(defined(base[unitId])) base_count = base[unitId];
		params["base_qty_"+unitId] = count;
		params["fleet_unit_"+unitId] = count;
		params["base_unit_"+unitId] = base_count;
		params["fleet_qty_"+unitId] = base_count;
	}
	GM_log(HTTPRequest.urlEncode(params));
	HTTPRequest.POST('/zgame/game/edfleet2.html', params, function(){document.location.reload()});
}

// *************************************************************************************************
// BUTTON: Disband Fleets

if(document.location.pathname == "/zgame/game/ultracorps.html")
{
	// insert Disband Fleets button
	var form = document.getElementsByTagName("form")[0];
	if(undefined(form)) return;
	var inputs = form.getElementsByTagName("input");
	var button = document.createElement("input");
	button.type = "button";
	button.value = "Disband Fleets";
	button.addEventListener("click", disbandAllFleets, false);
	form.appendChild(button);
	form.appendChild(document.createTextNode('\n'));
}
function disbandAllFleets()
{
	var links = document.getElementsByTagName("a");
	var fleets = new Array();
	for(var i=0; i<links.length; i++)
	{
		var result = null;
		result = links[i].href.match(/javascript:fleetmgr\('disband',%20(\d+)/);
		if(result && links[i].parentNode.getAttribute("class").contains("combat")) // only do combat fleets
		{
			fleets.push(parseInt(result[1]));
		}
	}
	for(index in fleets)
	{
		unsafeWindow.fleetmgr('disband', fleets[index]);
	}
}
