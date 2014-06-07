// ==UserScript==
// @name           BvS Improved Contribution Report
// @namespace      http://userscripts.org/users/dtkarlsson
// @include        http://www.animecubed.com/billy/bvs/village.*
// @include        http://animecubed.com/billy/bvs/village.*
// @licence        MIT; http://www.opensource.org/licenses/mit-license.php
// @copyright      2010, Daniel Karlsson
// @require        http://userscripts.org/scripts/source/57756.user.js
// @version        0.1.2
// ==/UserScript==

try {
	ScriptUpdater.check(67314);
}
catch (e) {}

const DEBUG = true;

// Pick a random, active (performed village action) ninja
const RANDOMNINJA = true;

// Calculate and display karma?
const KARMA = true;
// Tsukiballs normally count as two attacks, this will override default behaviour
const TSUKIATTACKS = 0;
// Contribution weights
const KARMAWEIGHT = {
	action: 0.25,
	noaction: 0,
	awesome: 0.25,
	ryo: 0.00001,
	spies: 0.25,
	invasions: 0.5,
	majorcontracts: 0.05,
	minorcontracts: 0.01,
	majormills: 0.05,
	minormills: 0.01,
	kaijuattacks: 0.5,
	favours: 2.5,
	zrewards: 1
};

var KAIJUNAME = "unknown";

const DAYROLLHOURS = 5;
const DAYROLLMINUTES = 15;

const MINUTE = 60 * 1000; // ms
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;
const MONTH = 4 * WEEK;

const BillyTZ = 6 * HOUR; // milliseconds from UTC

const STYLESHEET = "" + <r><![CDATA[
li.hilite {color: rgb(0%, 33%, 0%);}
#icrwrapper {
	border: 1px solid black;
	padding: 2px;
	font-family: 'arial', sans-serif;
	font-size: 12px;
	background-color: rgb(91%, 79%, 62%);
	color: black;
	-moz-box-shadow: rgb(45%, 40%, 31%) 2px 2px 2px;
	-webkit-box-shadow: rgb(45%, 40%, 31%) 2px 2px 2px;
}
#icrwrapper h3 {
	margin: 3px;
	text-align: center;
	font-weight: bold;
	font-size: 150%;
	cursor: pointer;
}
#icrwrapper p {
	color: black;
	margin: 0;
	padding: 2px;
}
#icr {
	font-size: 12px;
	border-collapse: collapse;
	border: 1px solid black;
	width: 100%;
}
#icr thead {
	font-weight: bold;
	background-color: rgb(51%, 8%, 2%);
	color: white;
}
#icr tbody > tr {
	border-top: 1px solid rgb(58%, 53%, 44%);
}
#icr tr.odd {
	background-color: rgb(91%, 85%, 76%);
}
#icr tr.even {
	background-color: rgb(87%, 79%, 66%);
}
#icr tr.random {
	background-color: rgb(100%, 100%, 35%);
}
#icr .idle {
	color: maroon;
}
#icr .idle14 {
	color: maroon;
	text-decoration: line-through;
}
#icr td {
	text-align: center;
}
#icr td.ryo {
	text-align: right;
}
#icr td.name {
	text-align: left;
}
#icr a {
	color: inherit;
	font-weight: bold;
	text-decoration: none;
}
#icr a:hover {
	text-decoration: underline;
}
abbr.icraction {
	padding: 0px 1px 0px 1px;
	font-size: 83%;
	font-weight: bold;
	border: 1px solid black;
}
abbr.icractionidle:after {
	content: ")";
}
abbr.icractionidle:before {
	content: "(";
}
abbr.icractionC {
	border-color: rgb(0%, 100%, 0%);
	background-color: rgb(0%, 75%, 0%);
}
abbr.icractionP {
	border-color: rgb(100%, 0%, 0%);
	background-color: rgb(75%, 0%, 0%);
}
abbr.icractionR {
	border-color: rgb(0%, 0%, 100%);
	background-color: rgb(0%, 0%, 75%);
}
abbr.icractionU {
	border-color: rgb(100%, 100%, 0%);
	background-color: rgb(66%, 66%, 0%);
}
abbr.icractionZ {
	border-color: rgb(0%, 50%, 0%);
	background-color: rgb(0%, 0%, 0%);
	color: rgb(0%, 100%, 0%);
}
]]></r>

var log;
if (DEBUG)
	log = function(arg) {GM_log(arg);}
else
	log = function() {}

function Ninja() {
	this.ryo = 0;
	this.action = "";
	this.idle = 0;
	this.awesome = 0;
	this.spies = 0;
	this.invasions = 0;
	this.majorcontracts = 0;
	this.minorcontracts = 0;
	this.majormills = 0;
	this.minormills = 0;
	this.kaijuattacks = 0;
	this.favours = 0;
	this.zrewards = 0;
	
	this.karma = function() {
		var k = 0;
		for (var i in this)
			if (typeof(this[i]) == "number" && KARMAWEIGHT[i])
				k += KARMAWEIGHT[i] * this[i];
		if (this.action != "")
			k += KARMAWEIGHT.action;
		else
			k += KARMAWEIGHT.noaction;
		return Math.round(k * 10) / 10;
	}
	
	this.str = function() {
		var s = "(" + this.action + ") " + this.ryo + " Ryo";
		s += ", " + this.spies + " Spies";
		s += ", " + this.invasions + " Invasions";
		s += ", " + this.majorcontracts + " Major";
		s += ", " + this.minorcontracts + " Minor";
		s += ", " + this.kaijuattacks + " Kaiju Attacks";
		s += ", " + this.favours + " Favours";
		s += ", " + this.zrewards + " Z-Rewards";
		return s;
	}
}

// Checkmark image
function checkmark()
{
	var img = document.createElement("img");
	img.src = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%0D%00%00%00%0C%08%04%00%00%00%13%BE%FFR%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%02bKGD%00%00%AA%8D%232%00%00%00vIDAT%18%D3m%CF1%0EAQ%14%84%E1%8FD%ABS(D%AFW%DA%80N%F4o-v%A0%A2PJ4Z%9Bx%0B%B0%11%9DHd4%C8%E5%DD%BF%9C9%E7O%86%3Ac%BBn%D8C%E3nP%2B%F6%9E%DD%8F%3E%CER%2FNbT*%3El%C5%B2%BC%5E%9B%82%958%96%C5A%04Cq%7Bk%BF%5C%C5F%2Bf%3FzLD%C4%A5%B6%BD%15%E9%8E%84%85%87%F9%7F%F8%02%DB%05%1C%23Dk%7F%EC%00%00%00%00IEND%AEB%60%82";
	return img;
}

// Add a node to document head
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

// Remove leading and trailing whitespace
function chomp(text)
{
	return text.replace(/^\s+/, "").replace(/\s+$/, "");
}

// Current time in ms since 1970-01-01 Billy Time
function serverNow()
{
	var d = new Date();
	return d.getTime() - BillyTZ + d.getTimezoneOffset() * 60 * 1000;
}

// Last dayroll (ms)
function lastDayroll()
{
	var d = new Date();
	d.setTime(serverNow());
	var phase = d.getHours() * HOUR + d.getMinutes() * MINUTE + d.getSeconds() * 1000 + d.getMilliseconds();
	d.setHours(DAYROLLHOURS);
	d.setMinutes(DAYROLLMINUTES);
	d.setSeconds(0);
	d.setMilliseconds(0);
	return (phase < DAYROLLHOURS * HOUR + DAYROLLMINUTES * MINUTE) ? d.getTime() - DAY : d.getTime();
}

// Split message into header, time and message part
// E.g. Foo 1/1 (Mon - 01:01): Bar
// => ["Foo", "1/1 (Mon - 01:01)", "Bar"]
function splitMessage(text)
{
	text = chomp(text);
	
	var match = text.match(/([^:]*) (\d+\/\d+ \(\w{3} - \d+:\d+\)): (.*)/);
	if (match)
		return [match[1], match[2], match[3]];
	// Exception: Foo 1/1 (Mon - 01:01) Roller: Bar
	// => ["Foo - Roller", "1/1 (Mon - 01:01)", "Bar"]
	match = text.match(/([^:]*) (\d+\/\d+ \(\w{3} - \d+:\d+\)) ([^:]*): (.*)/);
	if (match)
		return [match[1] + " - " + match[3], match[2], match[4]];
	// Exception: Foo: Bar
	// => ["Foo", "", "Bar"]
	match = text.match(/([^:]*): (.*)/)
	if (match)
		return [match[1], "", match[2]]
	return ["", "", text];
}

// Parse date/time format "1/19 (Tue - 16:06)"
// Return ms since 1970-01-01 Billy time
function parseTime(text)
{
	var match = text.match(/(\d+)\/(\d+) \(\w{3} - (\d+):(\d+)\)/);
	
	if (match) {
		var d = new Date();
		try {
			var month = parseInt(match[1]);
			var day = parseInt(match[2]);
			var hour = parseInt(match[3]);
			var minutes = parseInt(match[4]);

			d.setTime(serverNow());
			d.setMonth(month - 1);
			d.setDate(day);
			d.setHours(hour);
			d.setMinutes(minutes);
			d.setSeconds(0);
			d.setMilliseconds(0);
		}
		catch (e) {return 0;}

		return d.getTime();
	}
	return 0;
}

// Update contribution from messages
function parseMessages(ninarray)
{
	var messages = document.evaluate("//ul[@id='messageul']//li/label", document, null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

	var ts = lastDayroll();
	for (var i = 0; i < messages.snapshotLength; i++) {
		var msg = splitMessage(messages.snapshotItem(i).textContent);

		if (parseTime(msg[1]))
			ts = parseTime(msg[1]);

		if (msg[0] == "Daily Collection") {
			var d = new Date();
			d.setTime(ts);
			d.setHours(DAYROLLHOURS);
			d.setMinutes(DAYROLLMINUTES);
			d.setSeconds(0);
			d.setMilliseconds(0);
			ts = d.getTime() - DAY;
		}
		
		if (ts < lastDayroll() - DAY)
			break;
		else if (ts >= lastDayroll()) {
			continue;
		}
		
		if (DEBUG) {
			var li = messages.snapshotItem(i).parentNode;
			li.setAttribute("class", li.getAttribute("class") + " hilite");
		}

		var m;
		switch (msg[0]) {
		case "Z-Rewards":
			m = msg[2].match(/(.*) gave (\d+) Z-Rewards to the village/);
			if (m) {
				if (!ninarray[m[1]])
					ninarray[m[1]] = new Ninja();
				ninarray[m[1]].zrewards += parseInt(m[2]);
			}
			break;
		case "Contracts":
			m = msg[2].match(/(.*) milled (\d+) Minor Village Contract/);
			if (m) {
				if (!ninarray[m[1]])
					ninarray[m[1]] = new Ninja();
				ninarray[m[1]].minormills += parseInt(m[2]);
			}
			m = msg[2].match(/(.*) milled (\d+) Major Village Contract/);
			if (m) {
				if (!ninarray[m[1]])
					ninarray[m[1]] = new Ninja();
				ninarray[m[1]].majormills += parseInt(m[2]);
			}
			m = msg[2].match(/(.*) has submitted (\d+) Minor Village Contract/);
			if (m) {
				if (!ninarray[m[1]])
					ninarray[m[1]] = new Ninja();
				ninarray[m[1]].minorcontracts += parseInt(m[2]);
			}
			m = msg[2].match(/(.*) has submitted (\d+) Major Village Contract/);
			if (m) {
				if (!ninarray[m[1]])
					ninarray[m[1]] = new Ninja();
				ninarray[m[1]].majorcontracts += parseInt(m[2]);
			}
			break;
		case "Bank":
			m = msg[2].match(/(.*) gave (\d+) Ryo/);
			if (m) {
				if (!ninarray[m[1]])
					ninarray[m[1]] = new Ninja();
				ninarray[m[1]].ryo += parseInt(m[2]);
			}
			break;
		case "Invasion Success":
			m = msg[2].match(/(.*) attempted to attack/);
			if (m) {
				if (!ninarray[m[1]])
					ninarray[m[1]] = new Ninja();
				ninarray[m[1]].invasions++;
			}
			break;
		case "Spy Success":
			m = msg[2].match(/(.*) has infiltrated a spy/);
			if (m) {
				if (!ninarray[m[1]])
					ninarray[m[1]] = new Ninja();
				ninarray[m[1]].spies++;
			}
			break;
		case "The Flash!":
			m = msg[2].match(/(.*) asks The Flash for a favor/);
			if (m) {
				if (!ninarray[m[1]])
					ninarray[m[1]] = new Ninja();
				ninarray[m[1]].favours++;
			}
			break;
		case "Kaiju Victory":
			m = msg[2].match("Your Village has defeated ([^\!]*).*Total attacks - (.*)\.");
			if (m) {
				KAIJUNAME = m[1];
				var attackers = m[2].split(/, /);
				for (var j in attackers) {
					m = attackers[j].match(/(.*) - (\d+)( \((\d+) Tsuki\))?/);
					if (m) {
						if (!ninarray[m[1]])
							ninarray[m[1]] = new Ninja();
						ninarray[m[1]].kaijuattacks += parseInt(m[2]);
						// Apply new tsuki score
						if (m[4]) {
							ninarray[m[1]].kaijuattacks -= 2 * parseInt(m[4]);
							ninarray[m[1]].kaijuattacks += TSUKIATTACKS * parseInt(m[4]);
						}
					}
				}
			}
			break;
		}
	}
}

// Convert number to string with thousand separator
function numberToStr(n, signed)
{
	if (n == 0)
		return "";
	var str = "" + n;
	if (signed && n > 0)
		return "+" + str.replace(/\d{1,3}(?=(\d{3})+)/g, "$&,");
	return str.replace(/\d{1,3}(?=(\d{3})+)/g, "$&,");
}

// Parse yesterday's report
function parseReport()
{
	var divs = document.evaluate("//tbody/tr/td/div", document, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	// Find yesterday's report
	var i = 0;
	var contributionDiv;
	for (var div = divs.snapshotItem(i); div; div = divs.snapshotItem(++i))
		if (/^Contributions/.test(div.textContent)) {
			contributionDiv = div;
			break;
		}
	if (!contributionDiv) {
		log("Fail");
		return;
	}
		
	// Parse child nodes
	var state;
	var action;
	var ninja = {};
	for (var line = contributionDiv.firstChild; line; line = line.nextSibling) {
		var txt = line.textContent;
		if (txt == "")
			continue;
	
		var skip = false;
		switch (txt) {
		case "Contributions:":
			state = "ryo";
			skip = true;
			break;
		case "Collectors:":
			state = "action";
			action = "C";
			skip = true;
			break;
		case "Patrollers:":
			state = "action";
			action = "P";
			skip = true;
			break;
		case "Repairers:":
			state = "action";
			action = "R";
			skip = true;
			break;
		case "Paper-pushers:":
			state = "action";
			action = "U";
			skip = true;
			break;
		case "Resuppliers:":
			state = "action";
			action = "Z";
			skip = true;
			break;
		case "Lazy Ninja:":
			state = "lazy";
			skip = true;
			break;
		case "Awesome Upkeep:":
			state = "awesome";
			skip = true;
			break;
		}
		if (skip)
			continue;
		
		if (state == "ryo") {
			var m = txt.match(/(.*) - (.*)/);
			if (m) {
				var name = m[1];
				var ryo = parseInt(m[2].replace(/[^\d]/, ""));
				if (!ninja[name])
					ninja[name] = new Ninja();
				ninja[name].ryo = ryo;
			}
		} else if (state == "lazy") {
			var m = txt.match(/(.*) \((\d+) days Idle\)/);
			if (m) {
				var name = m[1];
				if (!ninja[name])
					ninja[name] = new Ninja();
				ninja[name].idle = parseInt(m[2]);
			} else {
				var name = txt;
				if (!ninja[name])
					ninja[name] = new Ninja();
				ninja[name].action = "";
			}
		} else if (state == "action") {
			var name = txt;
			if (/[\w\d\s]+/.test(name) && name != "None") {
				if (!ninja[name])
					ninja[name] = new Ninja();
				ninja[name].action = action;
			}
		} else if (state == "awesome") {
			var m = txt.match(/(.*) Lvl.\s+(\d+)/);
			if (m) {
				var name = m[1];
				if (!ninja[name])
					ninja[name] = new Ninja();
				ninja[name].awesome = parseInt(m[2]);
			}
		}
	}
	return ninja;
}

// Create table row and fill with td from array
function tableRow(data)
{
	var tr = document.createElement("tr");
	
	for (var i in data) {
		var td = document.createElement("td");
		tr.appendChild(td);
		
		switch (typeof(data[i])) {
		case "string":
		case "number":
			td.textContent = data[i];
			break;
		case "object":
			if (data[i].element)
				td.appendChild(data[i].element);
			if (data[i].text)
				td.textContent = data[i].text;
			if (data[i].html)
				td.innerHTML = data[i].html;
			if (data[i].cls)
				td.setAttribute("class", data[i].cls);
			if (data[i].id)
				td.setAttribute("id", data[i].id);
			break;
		}
	}
	return tr;
}

// abbr element
function abbr(ab, txt)
{
	var a = document.createElement("abbr");
	a.textContent = ab;
	a.setAttribute("title", txt);
	return a;
}

// ISO 8601 date format
function isoDate(t)
{
	var d = new Date();
	d.setTime(t);
	var iso = [d.getFullYear(), d.getMonth() + 1, d.getDate()].join("-").replace(/-(\d)(?!\d)/g, "-0$1");
	var a = abbr(d.toDateString(), iso);
	a.setAttribute("class", "date");
	return a;
}

// Hyperlink
function link(txt, href)
{
	var el = document.createElement("a");
	el.href = href;
	el.textContent = txt;
	return el;
}

// Action icon
function actionAbbr(a)
{
	const abbrev = {
		C: "Collect",
		P: "Patrol",
		R: "Repair",
		Z: "Z-Action",
		U: "Paperwork"
	}

	var el;
	
	if (abbrev[a]) {
		el = abbr(a, abbrev[a]);
		el.setAttribute("class", "icraction icraction" + a);
	} else if (typeof(a) == "number") {
		el = abbr(a, "Idle: " + a);
		el.setAttribute("class", "icractionidle");
	}
	
	return el;
}

// Compare strings converted to lowercase
function strCmp(a, b)
{
	a = a.toLowerCase();
	b = b.toLowerCase();
	if (a < b)
		return -1;
	else if (b < a)
		return 1;
	return 0;
}

// Improved report table
function createReport(ninja)
{
	// Sort ninjas in alphabetical order
	var ninjaOrder = [];
	for (var name in ninja)
		ninjaOrder.push(name);
	ninjaOrder.sort(strCmp);
	
	var table = document.createElement("table");
	table.id = "icr";

	// Table head
	var thead = document.createElement("thead");
	table.appendChild(thead);
	if (KARMA)
		thead.appendChild(tableRow(["Name", "Karma", "Action", {element: abbr("AwUp", "Awesome Upkeep")},
			"Ryo", "Spies", "Invasions", {element: abbr("Contracts", "Major / Minor")},
			{element: abbr("Kaiju", "Kaiju: " + KAIJUNAME)}, "Favour", "Z-Rewards"]));
	else
		thead.appendChild(tableRow(["Name", "Action", {element: abbr("AwUp", "Awesome Upkeep")},
			"Ryo", "Spies", "Invasions", {element: abbr("Contracts", "Major / Minor")},
			{element: abbr("Kaiju", "Kaiju: " + KAIJUNAME)}, "Favour", "Z-Rewards"]));
	
	// Table body
	var tbody = document.createElement("tbody");
	table.appendChild(tbody);
	var even = true;
	for (var i in ninjaOrder) {
		var data = [];
		
		// Name
		if (ninja[ninjaOrder[i]].idle >= 14)
			data.push({element: link(ninjaOrder[i], "lookup.html?player=" + ninjaOrder[i]),
				cls: "name idle14"});
		else if (ninja[ninjaOrder[i]].idle > 0)
			data.push({element: link(ninjaOrder[i], "lookup.html?player=" + ninjaOrder[i]), cls: "name idle"});
		else
			data.push({element: link(ninjaOrder[i], "lookup.html?player=" + ninjaOrder[i]), cls: "name"});
		
		// Karma
		if (KARMA)
			data.push(numberToStr(ninja[ninjaOrder[i]].karma(), true));
		
		// Action / Idle
		if (ninja[ninjaOrder[i]].idle > 0) {
			data.push({element: actionAbbr(ninja[ninjaOrder[i]].idle)});
		} else {
			data.push({element: actionAbbr(ninja[ninjaOrder[i]].action)});
		}

		// Aweseme Upkeep, Ryo, Spies, Invasions
		data.push(numberToStr(ninja[ninjaOrder[i]].awesome));
		data.push({text: numberToStr(ninja[ninjaOrder[i]].ryo), cls: "ryo"});
		data.push(numberToStr(ninja[ninjaOrder[i]].spies));
		data.push(numberToStr(ninja[ninjaOrder[i]].invasions));
		
		// Contracts
		if (ninja[ninjaOrder[i]].majorcontracts + ninja[ninjaOrder[i]].majormills +
			ninja[ninjaOrder[i]].minorcontracts + ninja[ninjaOrder[i]].minormills > 0)
			data.push((ninja[ninjaOrder[i]].majorcontracts + ninja[ninjaOrder[i]].majormills) + " / " +
				(ninja[ninjaOrder[i]].minorcontracts + ninja[ninjaOrder[i]].minormills));
		else
			data.push("");
		
		// Kaiju, Storm favour
		data.push(numberToStr(ninja[ninjaOrder[i]].kaijuattacks));
		if (ninja[ninjaOrder[i]].favours > 0)
			data.push({element: checkmark()});
		else
			data.push("");
			
		data.push(numberToStr(ninja[ninjaOrder[i]].zrewards));

		var tr = tableRow(data);
		tbody.appendChild(tr);
		tr.setAttribute("class", (even ? "even" : "odd"));
		even = !even;
	}

	return table;
}

// Daily pseudorandom number
function randomNumber(ninja)
{
	// Seed PRNG
	var rnd = Math.floor(lastDayroll() / MINUTE) % 4294967296;
	
	var ryo = [];
	for (var i in ninja)
		ryo.push(ninja[i].ryo);
	ryo.sort(function(a,b) {return a - b;});
	for (var i in ryo)
		rnd = (69069 * rnd + ryo[i]) % 4294967296;

	// Number massage...
	rnd = (214013 * rnd + 2531011) % 4294967296;
	var r1 = ((rnd & 0x3fff0000) >> 16);
	rnd = (214013 * rnd + 2531011) % 4294967296;
	var r2 = ((rnd & 0x3fff0000) >> 2);

	return (r1 | r2) / 0x10000000;
}

//
// Main
//

var ninja = parseReport();
parseMessages(ninja);

addHeaderNode("style", "text/css", STYLESHEET);

var div = document.createElement("div");
div.id = "icrwrapper";

var ann = document.getElementById("annul");
ann.parentNode.insertBefore(div, ann.parentNode.firstChild);

var title = document.createElement("h3");
var d = new Date();
d.setTime(lastDayroll() - DAY);
title.textContent = "Village Contribution - ";
title.appendChild(isoDate(d.getTime()));
div.appendChild(title);

var report = createReport(ninja);
div.appendChild(report);

// Pick random ninja
if (RANDOMNINJA) {
	var active = [];
	for (var i in ninja)
		if (ninja[i].action != "")
			active.push(i);
	active.sort(strCmp);
	var nin = active[Math.floor(randomNumber(ninja) * active.length)];
	
	var txt = document.createElement("p");
	txt.textContent = "Today's random ninja: " + nin;
	div.appendChild(txt);
}

var hidden = true;
report.style.display = "none";
title.addEventListener("click", function() {hidden = !hidden; report.style.display =
	(hidden ? "none" : "table");}, false);
