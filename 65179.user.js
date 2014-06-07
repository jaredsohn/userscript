// ==UserScript==
// @name           BvS Clock
// @description    Floating server time clock for Billy Vs. SNAKEMAN!
// @namespace      http://userscripts.org/users/dtkarlsson
// @include        http://*animecubed.com/billy/bvs/*
// @licence        MIT; http://www.opensource.org/licenses/mit-license.php
// @copyright      2009, Daniel Karlsson
// @require        http://userscripts.org/scripts/source/57756.user.js
// @version        1.2.2
// @history        1.2.2 Fixed invasion timer bug when target name starts with a number
// @history        1.2.1 Fixed a bingo timer bug
// @history        1.2.0 Added timer window with bingo and invasion timers
// @history        1.2.0 Added Dark Hour and dayroll counter
// @history        1.1.3 AM/PM confusion fixed
// @history        1.1.2 Fixed parsing bug
// @history        1.1.1 Fixed annoying flickering while moving the clock
// @history        1.1.0 Toggle 24h/12h clock by doubleclicking on the clock
// @history        1.0.0 Initial release
// ==/UserScript==
try {
	ScriptUpdater.check(65179, "1.2.2");
}
catch (e)
{
	// meh
}

var SETTINGS = {
	servertime: "12h",
	darkhour: "Countdown",
	dayroll: "Countdown"
};

var OPTIONS = {
	servertime: ["24h", "12h", "Hide"],
	darkhour: ["Countdown", "24h", "12h", "Hide"],
	dayroll: ["Countdown", "24h", "12h", "Hide"],
}

const MINUTE = 60 * 1000; //ms
const HOUR = 60 * MINUTE; //ms
const DAY = 24 * HOUR; //ms
const UPDATEINTERVAL = 250; //ms

/*
	BvS Utility Functions
*/
var BvS = {
	playerName: function() {
		try {
			return document.evaluate("//input[@name='player' and @type='hidden']", document, null,
				XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue.value;
		}
		catch (e) {
			return;
		}
	}
}

/*
	DOM Storage wrapper class
	Constructor:
		var store = new DOMStorage({"session"|"local"}, [<namespace>]);
	Set item:
		store.setItem(<key>, <value>);
	Get item:
		store.getItem(<key>[, <default value>]);
	Remove item:
		store.removeItem(<key>);
	Get all keys in namespace as array:
		var array = store.keys();
*/
function DOMStorage(type, namespace)
{
	var my = this;
	
	if (typeof(type) != "string")
		type = "session";
	switch (type) {
		case "local": my.storage = localStorage; break;
		case "session": my.storage = sessionStorage; break;
		default: my.storage = sessionStorage;
	}
	
	if (!namespace || typeof(namespace) != "string")
		namespace = "Greasemonkey";

	my.ns = namespace + ".";
	my.setItem = function(key, val) {
		try {
			my.storage.setItem(escape(my.ns + key), val);
		}
		catch (e) {
			GM_log(e);
		}
	},
	my.getItem = function(key, def) {
		try {
			var val = my.storage.getItem(escape(my.ns + key));
			if (val)
				return val;
			else
				return def;
		}
		catch (e) {
			return def;
		}
	}
	my.removeItem = function(key) {
		try {
			// Kludge, avoid Firefox crash
			my.storage.setItem(escape(my.ns + key), null);
		}
		catch (e) {
			GM_log(e);
		}
	}
	my.keys = function() {
		// Return array of all keys in this namespace
		var arr = [];
		var i = 0;
		do {
			try {
				var key = unescape(my.storage.key(i));
				if (key.indexOf(my.ns) == 0 && my.storage.getItem(key))
					arr.push(key.slice(my.ns.length));
			}
			catch (e) {
				break;
			}
			i++;
		} while (true);
		return arr;
	}
}

var clockSettings = new DOMStorage("local", "BvSClock");
var playerTimers;
if (BvS.playerName())
	playerTimers = new DOMStorage("local", "BvSClock." + BvS.playerName());

function twoDigits(n)
{
	if (n < 10)
		return "0" + n;
	else
		return "" + n;
}

// Time functions

// Current time in ms since 1970-01-01 UTC
function utcNow()
{
	var d = new Date();
	return d.getTime() + d.getTimezoneOffset() * 60000;
}

// Current server time in ms
function serverNow()
{
	return utcNow() + parseInt(clockSettings.getItem("offset"));
}

// Next dayroll (servertime)
function dayroll()
{
	var dr = new Date();
	dr.setTime(serverNow());
	dr.setHours(5);
	dr.setMinutes(10);
	dr.setSeconds(0);
	dr.setMilliseconds(0);
	dr = dr.getTime();
	if (dr < serverNow())
		dr += DAY;
	return dr;
}

// Milliseconds to hours, minutes, seconds
function msToHMS(t)
{
	if (t < 0)
		return "-" + msToHMS(-t);

	t = Math.ceil(t / 1000);
	var h = Math.floor(t / 3600);
	var m = Math.floor((t % 3600) / 60);
	var s = t % 60;
	return twoDigits(h) + ":" + twoDigits(m) + ":" + twoDigits(s);
}

// Convert 12h to 24h
function convert12h_24h(hour, ampm)
{
	hour %= 12;
	if (ampm == "PM")
		hour += 12;
	return hour;
}

// Convert time (in ms from 1970-01-01 BvS time)
function timeString(time, fmt)
{
	// Formats:
	// Countdown: T-hh:mm:ss
	// 12h: hh:mm:ss am/pm
	// 24h: hh:mm:ss
	time = parseInt(time);
	
	if (fmt == "Countdown") {
		var str = msToHMS(time - serverNow());
		if (str[0] == "-")
			return "T+" + str.substr(1);
		else
			return "T-" + str;
	} else if (fmt == "Timer") {
		var seconds = (time - serverNow()) / 1000;
		if (seconds < 0)
			return "Now";
		var minutes = seconds / 60;
		var hours = minutes / 60;
		if (hours > 4)
			return Math.round(hours) + " h";
		else if (minutes > 5)
			return Math.round(minutes) + " min";
		else
			return Math.round(seconds) + " s";
	} else {
		var d = new Date();
		d.setTime(time);
		var h = d.getHours();
		var m = d.getMinutes();
		var s = d.getSeconds();
		
		if (fmt == "24h")
			return twoDigits(h) + ":" + twoDigits(m) + ":" + twoDigits(s);
		else if (fmt == "12h") {
			var ampm = (h >= 12 ? "PM" : "AM");
			h %= 12;
			if (h == 0)
				h = 12;
			return twoDigits(h) + ":" + twoDigits(m) + ":" + twoDigits(s) + " " + ampm;
		}
	}
}

// Parsing

// Get player name
function playerName()
{
	var input = document.evaluate("//input[@name='player' and @type='hidden']", document, null,
		XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	if (input)
		return input.value;
}

// Try to parse server time clock periodically. The clock is updated by a timer script
// so it is not available immediately on page load
function delayedParseServerTime(element)
{
	var match = element.textContent.match(/0?(\d+):0?(\d+):0?(\d+) (.M)/);
	if (match) {
		var hours = parseInt(match[1]);
		var minutes = parseInt(match[2]);
		var seconds = parseInt(match[3]);

		hours = hours % 12;
		if (match[4] == "PM")
			hours += 12;

		var server = new Date();
		server.setHours(hours);
		server.setMinutes(minutes);
		server.setSeconds(seconds);
		server.setMilliseconds(0);

		// Make sure offset is < 0 and > -12h
		var offset = server.getTime() - utcNow();
		if (offset > 0)
			offset -= DAY;
		if (offset < -DAY / 2)
			offset += DAY;

		var oldOffset = getOffset();
		
		if (Math.abs(oldOffset - offset) < 10000)
			offset = Math.round((offset + oldOffset) / 2);

		clockSettings.setItem("offset", offset);
		clockSettings.setItem("sync", utcNow());
	} else {
		// Try again in 0.25s
		setTimeout(function() {delayedParseServerTime(element);}, 250);
	}
}

// Helper function for getting clock offset from localStorage
function getOffset()
{
	var offset;
	try {
		offset = clockSettings.getItem("offset");
		return parseInt(offset);
	}
	catch (e) {
		GM_log(e);
		return;
	}
}

// Parse server time clock
function parseServerTime()
{
	var clock = document.getElementById("clock");
	if (clock)
		delayedParseServerTime(clock);
}

// Parse dark hours
function parseDarkHours()
{
	var dh = document.getElementById("hours");
	if (dh) {
		var match = dh.textContent.match(
			/(\d+).?(.M)[^\d]*(\d+).?(.M)[^\d]*(\d+).?(.M)[^\d]*(\d+).?(.M)/);
		if (match) {
			var hours = [];
			
			for (var i = 0; i < 4; i++) {
				hours[i] = new Date();
				hours[i].setTime(serverNow());
				hours[i].setHours(convert12h_24h(parseInt(match[2 * i + 1]), match[2 * i + 2]));
				hours[i].setMinutes(0);
				hours[i].setSeconds(0);
				hours[i].setMilliseconds(0);
				
				hours[i] = hours[i].getTime();
				if (hours[i] + DAY < dayroll() - HOUR)
					hours[i] += DAY;
				clockSettings.setItem("darkhour" + i, hours[i]);
			}
			return true;
		}
	}
}

function parseInvasionPlan()
{
	var data = document.evaluate("//table[@width='240']/tbody/tr/td", document, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		
	var village, time;
	for (var i = 0; i < data.snapshotLength; i++) {
		var txt = data.snapshotItem(i).textContent;
		var rows = txt.split(/\n/);
		for (var r in rows) {
			var match = rows[r].match(/Planning to Invade:\s*(.*) Village(.*)/);
			if (match) {
				village = match[1];
				time = match[2];
				if (/(\d+)$/.test(time))
					time = parseInt(RegExp.lastParen) * MINUTE;
				else if (/Invasion is Ready/.test(time))
					time = 0;
				else
					time = false;
				break;
			} else if (/Planning to Invade: None/.test(rows[r])) {
				playerTimers.removeItem("invasion.targer");
				playerTimers.removeItem("invasion.time");
				break;
			}
		}
	}
	if (village && (time || time == 0) && playerTimers) {
		playerTimers.setItem("invasion.target", village);
		playerTimers.setItem("invasion.time", time + serverNow());
	}
}

function parseBingoCooldown()
{
	if (!/billy.bvs.pages.main/.test(location.href))
		return;

	var data = document.evaluate("//table[count(descendant::tr)=1 and " +
		"count(descendant::td)=1]/tbody/tr/td", document, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	var cooldown = 0;
	for (var i = 0; i < data.snapshotLength; i++) {
		var txt = data.snapshotItem(i).textContent.replace(/\s+/g, " ");
		var match = txt.match(/(.*)\!.*Release in[^\d]*(\d+) (\w+)/);
		if (match) {
			var unit = match[3].replace(/\s+/g, "");
			var type = match[1].replace(/\s+/g, "");
			var time = parseInt(match[2]);
			var min, max;
			switch (unit) {
			case "hours":
				min = time * HOUR;
				max = min + HOUR;
				break;
			case "minutes":
				min = time * MINUTE;
				max = min + MINUTE;
				break;
			default:
				min = time * 1000;
				max = min;
			}
			min += serverNow();
			max += serverNow();
			
			var set, remove;
			switch (type) {
			case "Bingo'd":
				set = "bingo";
				remove = "cooldown";
				break;
			case "Cooldown":
				set = "cooldown";
				remove = "bingo";
				break;
			}
			try {
				t = playerTimers.getItem(set).split(/-/);
				var pmin = parseInt(t[0]);
				var pmax = parseInt(t[1]);
				pmin = Math.max(min, pmin);
				pmax = Math.min(max, pmax);
				if (pmax >= pmin) {
					min = pmin;
					max = pmax;
				}
			}
			catch (e) {}
			playerTimers.setItem(set, min + "-" + max);
			playerTimers.removeItem(remove);
			return;
		}
	}
	playerTimers.removeItem("cooldown");
	playerTimers.removeItem("bingo");
}

// UI

function Window(id, storage)
{
	var my = this;
	
	my.id = id;
	
	// Window dragging events
	my.offsetX = 0;
	my.offsetY = 0;
	my.moving = false;
	my.drag = function(event) {
		if (my.moving) {
			my.element.style.left = (event.clientX - my.offsetX)+'px';
			my.element.style.top = (event.clientY - my.offsetY)+'px';
			event.preventDefault();
		}
	}
	my.stopDrag = function(event) {
		if (my.moving) {
			my.moving = false;
			var x = parseInt(my.element.style.left);
			var y = parseInt(my.element.style.top);
			storage.setItem(my.id + ".coord.x", x);
			storage.setItem(my.id + ".coord.y", y);
			my.element.style.opacity = 1;
			window.removeEventListener('mouseup', my.stopDrag, true);
			window.removeEventListener('mousemove', my.drag, true);
		}
	}
	my.startDrag = function(event) {
		if (event.button != 0) {
			my.moving = false;
			return;
		}
		my.offsetX = event.clientX - parseInt(my.element.style.left);
		my.offsetY = event.clientY - parseInt(my.element.style.top);
		my.moving = true;
		my.element.style.opacity = 0.75;
		event.preventDefault();
		window.addEventListener('mouseup', my.stopDrag, true);
		window.addEventListener('mousemove', my.drag, true);
	}

	my.element = document.createElement("div");
	my.element.id = id;
	document.body.appendChild(my.element);
	my.element.addEventListener('mousedown', my.startDrag, true);

	if (storage.getItem(my.id + ".coord.x"))
		my.element.style.left = storage.getItem(my.id + ".coord.x") + "px";
	else
		my.element.style.left = "6px";
	if (storage.getItem(my.id + ".coord.y"))
		my.element.style.top = storage.getItem(my.id + ".coord.y") + "px";
	else
		my.element.style.top = "6px";

}

function FloatingClock()
{
	var my = this;

	my.window = new Window("floatingclock", clockSettings);
	
	// Set up floating clock
	GM_addStyle("#floatingclock {border: 2px solid black; position: fixed; z-index: 100; " +
		"color: white; background-color: rgb(2%, 28%, 4%); padding: 4px; " +
		"text-align: center; cursor: move;");
	GM_addStyle("#floatingclock dl {margin: 0; padding: 0;}");
	GM_addStyle("#floatingclock dt {margin: 0; padding: 0; font-size: 12px;}");
	GM_addStyle("#floatingclock dd {margin: 0; padding: 0; font-size: 24px;}");

	// Updates the clock periodically
	my.update = function()
	{
		var node = document.getElementById("bcservertime");
		if (!node)
			return;

		var offset = getOffset();
		if (!offset)
			return;

		var clock = new Date();
		clock.setTime(utcNow() + parseInt(offset));

		node.textContent = timeString(serverNow(), SETTINGS.servertime);

		var dr = document.getElementById("bcdayroll");
		if (dr)
			dr.textContent = timeString(dayroll(), SETTINGS.dayroll);
			
		var dh = document.getElementById("bcdarkhour");
		if (dh) {
			var clock = document.getElementById("floatingclock");
			var next = DAY;
			var now = serverNow();
			for (var i = 0; i < 4; i++) {
				var t = parseInt(clockSettings.getItem("darkhour" + i)) - now;
				if (t < next && t > -HOUR)
					next = t;
			}
			if (next < 0) {
				clock.style.backgroundColor = "rgb(22%, 1%, 9%)";
				dh.textContent = "Now";
			} else {
				clock.style.backgroundColor = "rgb(2%, 28%, 4%)";
				dh.textContent = timeString(next + now, SETTINGS.darkhour);
			}
		}
		setTimeout(my.update, UPDATEINTERVAL);
	}

	my.redraw = function() {
		var html = "<dl>" +
			"<dt>BvS Server Time</dt>" +
			"<dd id='bcservertime'>??:??:??</dd>";
		if (SETTINGS.darkhour != "Hidden")
			html += "<dt>Next Dark Hour</dt><dd id='bcdarkhour'>??:??:??</dd>";
		if (SETTINGS.dayroll != "Hidden")
			html += "<dt>Dayroll</dt><dd id='bcdayroll'>??:??:??</dd>";
		html += "</dl>";
		my.window.element.innerHTML = html;
	}

	my.redraw();
	my.update();
}

function Timers()
{
	if (!playerTimers)
		return;
	
	var my = this;

	my.window = new Window("bctimers", playerTimers);
	
	// Set up floating clock
	GM_addStyle("#bctimers {border: 2px solid black; position: fixed; z-index: 100; " +
		"color: white; background-color: rgb(2%, 28%, 4%); padding: 4px; " +
		"text-align: center; cursor: move;");
	GM_addStyle("#bctimers table {color: white; margin: 0; padding: 0; font-size: 12px; border-collapse: collapse;}");
	GM_addStyle("#bctimers thead {font-size: 16px;}");
	GM_addStyle("#bctimers td {padding: 3px;}");
	GM_addStyle("#bctimers td.time {color: yellow; text-align: right;}");

	// Updates the clock periodically
	my.update = function()
	{
		var tbody = my.window.element.getElementsByTagName("tbody")[0];
		
		var html = "";
		if (playerTimers.getItem("cooldown")) {
			var t = playerTimers.getItem("cooldown").split(/-/);
			t = (parseInt(t[0]) + parseInt(t[1])) / 2;
			if (t - serverNow() > 0)
				html += "<tr><td>Cooldown</td><td class='time'>" +
					timeString(t, "Timer") +
					"</td></tr>";
			else
				playerTimers.removeItem("cooldown");
		} else if (playerTimers.getItem("bingo")) {
			var t = playerTimers.getItem("bingo").split(/-/);
			t = (parseInt(t[0]) + parseInt(t[1])) / 2;
			if (t - serverNow() > 0)
				html += "<tr><td>Bingo</td><td class='time'>" +
					timeString(t, "Timer") +
					"</td></tr>";
			else
				playerTimers.removeItem("bingo");
		}
		if (playerTimers.getItem("invasion.target")) {
			var time = "";
			if (parseInt(playerTimers.getItem("invasion.time")) < serverNow())
				time = "Now";
			else
				time = timeString(playerTimers.getItem("invasion.time"), "Timer");
			html += "<tr><td>Invasion: " + playerTimers.getItem("invasion.target") +
				"</td><td class='time'>" + time +
				"</td></tr>";
		}
		
		tbody.innerHTML = html;
		setTimeout(my.update, UPDATEINTERVAL);
	}

	my.redraw = function() {
		my.window.element.innerHTML = "<table><thead>" +
			"<tr><td colspan='2'>Timers - " + playerName() + "</td></tr>" +
			"</thead><tbody/></table>";
	}

	my.redraw();
	my.update();
}

var clock = new FloatingClock();
var timers = new Timers();

if (/billy.bvs.pages.main\b/.test(location.href)) {
	parseServerTime();
	parseDarkHours();
	parseBingoCooldown();
} else if (/billy.bvs.arena/.test(location.href)) {
	parseServerTime();
	parseDarkHours();
} else if (/billy.bvs.village\b/.test(location.href)) {
	parseInvasionPlan();
}
