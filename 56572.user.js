// ==UserScript==
// @name           BvS Dropalyzer
// @namespace      BvS
// @version        0.2.0
// @history        0.2.0 Flipper Autograph fix
// @licence        MIT; http://www.opensource.org/licenses/mit-license.php
// @copyright      2009, Daniel Karlsson
// @include        http://*animecubed.com/billy/bvs/missions/mission1*
// @description    Remembers mission drops (events, items etc) so you don't have to.
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

function splitAt(str, sep)
{
	// Split string at first occurrence of separator
	var i = str.indexOf(sep, 0);
	return [str.slice(0, i), str.slice(i + 1)];
}

function strip(str)
{
	// Remove leading and trailing whitespace
	str = str.replace(/^\s+/, "");
	str = str.replace(/\s+$/, "");
	str = str.replace(/\s+/g, " ");
	return str;
}

function parseEvent(e)
{
	// Tidy up event string
	var s = splitAt(e, ":");
	var type = s[0];
	var event = s[1];
	
	event = event.replace(/\!$/, "");
	event = event.replace(/Contracts? Received/, "Contract");
	
	switch (type) {
	case "Ally":
		break;
	case "Item":
		// Toss multi item drops
		var match = event.match(/^\d+ .*/);
		if (match)
			return false;
		break;
	case "Event":
		var match = event.match(/^\+?(\d+) ([\w\d\s]*)/);
		if (match) {
			var n = parseInt(match[1]);
			if (n % 11 == 0)
				n /= 11;
			if (n > 1)
				event = n + " " + match[2];
			else
				event = match[2];
		}
		break;
	case "Jutsu":
		break;
	case "Level":
		break;
	}
	return type + ":" + event;
}

function fix(events)
{
	// Reparse old event strings and remove duplicates. Darned megamissions!
	var fixed = [];
	for (var i in events) {
		var e = parseEvent(events[i]);
		if (!e)
			continue;
		var skip = false;
		for (var j in fixed)
			if (fixed[j] == e)
				skip = true;
		if (!skip)
			fixed.push(parseEvent(events[i]));
	}

	return fixed;
}

function insertElement(xpath, element, before)
{
	// Insert element before or after an element matching xpath
	var pos = document.evaluate(xpath, document, null, XPathResult.ANY_UNORDERED_NODE_TYPE,
		null).singleNodeValue;
	if (!pos)
		throw "No matching element";
	if (before)
		pos.parentNode.insertBefore(hint, pos);
	else
		pos.parentNode.insertBefore(element, pos.nextSibling);
}

function missionID(text)
{
	var splut = text.split(/Ability #\d+:\s+/);

    var crankDiff = 0;
    var crankSucc = 0;
	// Find crank level if any
	var crank = splut[0].match(/Crank Level: (\d+)/);
    if (crank) {
		crankDiff = parseInt(crank[1]);
    	crankSucc = parseInt(crank[1]);
    }
    
    // Check for Flipper Autograph reduced crank difficulty
    crank = splut[0].match(/\+(\d+) Diff, \+(\d+) Succ/);
    if (crank) {
        crankDiff = parseInt(crank[1]);
        crankSucc = parseInt(crank[2]);
    }
	
	var id;

	// Match primary stat and mission title
	var match = splut[0].match(/(\w+)jutsu\|([^|]*)\|([^|]*)\|.*Difficulty (\d+) Successes (\d+)/);
	if (match) {
		var type = match[1];
		var title = match[2];
		var description = match[3];
		var dif = parseInt(match[4]) - crankDiff;
		var suc = parseInt(match[5]) - crankSucc;
		
		id = title + ":" + type.toLowerCase() + dif + "/" + suc;
	}
	// Match any additional stats
	for (var i = 1; i < splut.length; i++) {
		var match = splut[i].match(/(\w+)jutsu.*Difficulty (\d+) Successes (\d+)/);
		if (match) {
			var type = match[1];
			var dif = parseInt(match[2]) - crankDiff;
			var suc = parseInt(match[3]) - crankSucc;
			id += ":" + type.toLowerCase() + dif + "/" + suc;
		}
	}

	return id;
}

function textCat(xpath)
{
	// Concatenate textnodes
	var txtdoc = "";
	var txtSnap = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var txt;
	for (var i = 0; txt = txtSnap.snapshotItem(i); i++) {
		var str = strip(txt.textContent);
		if (str == "")
			continue; // Ignore whitespace/empty nodes
		txtdoc += str + "|";
	}
	return txtdoc;
}

function appendHidden(mission, event)
{
	var known = GM_getValue(mission);
	if (known) {
		var k = known.split("|");
		for (var i = 0; i < k.length; i++)
			if (k[i] == event)
				return;
		GM_setValue(mission, known + "|" + event);
	} else
		GM_setValue(mission, event);
}

// Convert mission description to text
var txtdoc = textCat("//div[@class='miscontainer']//text()");
// Parse mission challenges
var mission = missionID(txtdoc);

if (!mission)
	return;

// Check tables with no table or forms descendants
var leafTables = document.evaluate("//table[count(descendant::table)=0 and count(descendant::form)=0]",
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

var event;
var megamission = false;
for (var i = 0; i < leafTables.snapshotLength; i++) {
	var html = leafTables.snapshotItem(i).innerHTML;

	if (/Special Event/.test(html)) {
		var b = leafTables.snapshotItem(i).getElementsByTagName("b")[0];
		event =  "Event:" + b.innerHTML;
	} else if (/You got an Item/.test(html)) {
		var b = leafTables.snapshotItem(i).getElementsByTagName("b")[0];
		event =  "Item:" + b.innerHTML;
	} else if (/You got an Ally/.test(html)) {
		var b = leafTables.snapshotItem(i).getElementsByTagName("b")[0];
		event =  "Ally:" + b.innerHTML;
	} else if (/Level Up/.test(html)) {
		var b = leafTables.snapshotItem(i).getElementsByTagName("b")[0];
		if (!/Level Up/.test(b.innerHTML))
			// Not a stat level up
			event =  "Level:" + b.innerHTML;
	} else if (/You analyzed a Jutsu/.test(html)) {
		var b = leafTables.snapshotItem(i).getElementsByTagName("b")[0];
		event =  "Jutsu:" + b.innerHTML;
	} else if (/MegaMissions Enabled/.test(html))
		megamission = true;
}

if (event)
	appendHidden(mission, parseEvent(event));

if (GM_getValue(mission)) {
	var hint = document.createElement("div");
	try {
		insertElement("//div[@class='miscontainer']", hint, false);
		var drops = GM_getValue(mission).split("|");
		drops = fix(drops); // Fix old events strings
		var txt = "";
		for (var i = 0; i < drops.length; i++) {
			var missionDrop = splitAt(drops[i], ":");
			if (txt != "")
				txt += "<br/>";
			txt += "(Hidden " + missionDrop[0] + ": " + missionDrop[1] + ")";
		}
		hint.innerHTML = txt;
		GM_setValue(mission, drops.join("|"));
	} catch(e) {
		alert(e);
	}
}
