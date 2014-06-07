// ==UserScript==
// @name           BvS CN Improved Spy Report
// @namespace      http://userscripts.org/users/dtkarlsson
// @description    Tabulated and sorted spy report for Billy vs SNAKEMAN.
//
// @include        http://animecubed.com/billy/bvs/village.*
// @include        http://animecubed.com/billy/bvs/villagespyreport.*
// @include        http://animecubed.com/billy/bvs/vlookup.*
// @include        http://animecubed.com/billy/bvs/lookup.*
//
// @include        http://www.animecubed.com/billy/bvs/village.*
// @include        http://www.animecubed.com/billy/bvs/villagespyreport.*
// @include        http://www.animecubed.com/billy/bvs/vlookup.*
// @include        http://www.animecubed.com/billy/bvs/lookup.*
//
// @match          http://animecubed.com/billy/bvs/village.*
// @match          http://animecubed.com/billy/bvs/villagespyreport.*
// @match          http://animecubed.com/billy/bvs/vlookup.*
// @match          http://animecubed.com/billy/bvs/lookup.*
//
// @match          http://www.animecubed.com/billy/bvs/village.*
// @match          http://www.animecubed.com/billy/bvs/villagespyreport.*
// @match          http://www.animecubed.com/billy/bvs/vlookup.*
// @match          http://www.animecubed.com/billy/bvs/lookup.*
//
// @require        http://userscripts.org/scripts/source/57756.user.js
// @licence        MIT; http://www.opensource.org/licenses/mit-license.php
// @copyright      2009, Daniel Karlsson (http://userscripts.org/users/dtkarlsson)
// @version        1.2.0
// @history        1.2.0 Added tier filter options
// @history        1.2.0 Stable sort for Chrome
// @history        1.1.1 Support for Google Chrome
// @history              Modified to exclude allied villages by SirDuck36
// @history              Modified to store and include village/player info by SirDuck36
// ==/UserScript==

try {
	ScriptUpdater.check(53839, "1.2.0");
}
catch (e) {}


// The CN village list for filtering

var CNVillageList =
[
	"Chikyuu",
	"Delicious",
	"Etherium",
	"Malcanthet",
	"Nevermore",
	"Red Death",
	"Satori",
	"Omega",
	"Spooky",
        "Gryphon",
	"The Island",
	"The W0rd",
	"BlackOrder",
	"Dood",
	"Redemption",
	"Shin Sekai",
	"SuperNova",
	"The Nu",
	"TigerClan",
	"Void Redux"
];




var log;
if (console && console.log)
	log = console.log;
else if (GM_log)
	log = GM_log;
else
	log = function() {}

/*
	Village objects have the following members:
	name - Village name (string)
	order - Original spy report order (integer, 1 - <n>)
	ryo - Ryo Stores (integer)
	bc - Brilliant Crystals (integer)
	mw - Medicinal Water (integer)
	pm - Precious Metals (integer)
	sf - Solid Fire (integer)
	ui - Unmelting Ice (integer)
	defense - Village defended against (string)
	target - Current target (string)
	attackers - Number of villages attacking (integer)
	tier - 0 - Pre-NRF, 1 - NRF, 2 - Beacon
	peace - Peacetime (integer)
	weight - Sorting weight (number)
*/

function Village()
{
	// Init members that might be missing from spy report
	this.defense = "";
	this.target = "";
	this.peace = 0;
	this.tier = 0;
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
		namespace = "Userscript";

	my.ns = namespace + ".";
	my.setItem = function(key, val) {
		try {
			my.storage.setItem(escape(my.ns + key), val);
		}
		catch (e) {
			log(e);
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
			log(e);
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

// Merge sort: merge function
function _merge(array, left, right, cmp)
{
	var ai = 0;
	var li = 0;
	var ri = 0;
	
	while (li < left.length && ri < right.length)
		if (cmp(left[li], right[ri]) <= 0)
			array[ai++] = left[li++];
		else
			array[ai++] = right[ri++];
			
	while (li < left.length)
		array[ai++] = left[li++];
	while (ri < right.length)
		array[ai++] = right[ri++];
}

// Merge sort
function mergeSort(array, cmp)
{
	if (array.length <= 1)
		return array;

	var left = [];
	var right = [];
	var mid = Math.floor(array.length / 2);
	
	// Divide
	for (var i = 0; i < mid; i++)
		left.push(array[i]);
	for (var i = mid; i < array.length; i++)
		right.push(array[i]);

	// Sort parts
	mergeSort(left, cmp);
	mergeSort(right, cmp);
	
	// Merge parts
	_merge(array, left, right, cmp);
}

function getPlayerName()
{
	return document.evaluate("//input[@name='player']", document, null,
		XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue.value;
}

function f(n)
{
	if (!n)
		return 0;
	// mapping from [0, inf) to [0, 1)
	return n / (n + 1);
}

function weight(village, wbc, wmw, wpm, wsf, wui)
{
	// Village resource weight used for sorting, higher weight on top
	var w = 0;
	var wsum = wbc + wmw + wpm + wsf + wui;
	if (wsum == 0)
		return 0;

	// Tiebreaker
	w = f(village.bc) * wbc + f(village.mw) * wmw + f(village.pm) * wpm + f(village.sf) * wsf +
		f(village.ui) * wui;
	w /= wsum;

	for (var n = 4; n >= 0; n--) {
		if (village.bc > n)
			w += wbc;
		if (village.mw > n)
			w += wmw;
		if (village.pm > n)
			w += wpm;
		if (village.sf > n)
			w += wsf;
		if (village.ui > n)
			w += wui;
		w /= wsum;
	}
	return w;
}

function numberToString(n)
{
	// Add thousand separator
	// 1234567 -> "1,234,567"
	if (n < 0)
		return "-" + numberToString(-n);
	var str = "" + Math.round(n);
	return str.replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, "$&,");
}

function stringToNumber(n)
{
	// n should be a string, possibly with "," as thousand separator
	if (n)
		return parseInt(n.replace(/,/g, ""));
	return 0;
}

function cmpOrder(v1, v2)
{
	// Sort by ascending order
	return cmpTier(v1, v2) || v1.order - v2.order;
}

function cmpAttackers(v1, v2)
{
	// Sort by ascending number of attackers
	return cmpTier(v1, v2) || v1.attackers - v2.attackers;
}

function cmpName(v1, v2)
{
	// Sort by ascending name
	if (cmpTier(v1, v2)) return cmpTier(v1, v2);
	if (v1.name < v2.name)
		return -1;
	else if (v1.name > v2.name)
		return 1;
	else
		return 0;
}

function cmpPeace(v1, v2)
{
	// Sort by ascending peacetime
	return cmpTier(v1, v2) || v1.peace - v2.peace;
}

function cmpRyo(v1, v2)
{
	// Sort by descending ryo
	return cmpTier(v1, v2) || v2.ryo - v1.ryo;
}

function cmp9(v1, v2)
{
	// Sort by descending UI
	return cmpTier(v1, v2) || v2.ui - v1.ui;
}

function cmpDefense(v1, v2)
{
	// Sort by ascending defense name
	if (cmpTier(v1, v2)) return cmpTier(v1, v2);
	if (v1.defense < v2.defense)
		return -1;
	else if (v1.defense > v2.defense)
		return 1;
	else
		return 0;
}

function cmpTarget(v1, v2)
{
	// Sort by ascending target
	if (cmpTier(v1, v2)) return cmpTier(v1, v2);
	if (v1.target < v2.target)
		return -1;
	else if (v1.target > v2.target)
		return 1;
	else
		return 0;
}

function cmpRes(v1, v2)
{
	// Sort by descending resources
	return cmpTier(v1, v2) || v2.weight - v1.weight;
}

function cmpTier(v1, v2)
{
	// Sort by Tier
	return v2.tier - v1.tier;
}

// Global-ish variables
var tierFilter = [true, true, true];
var villageList;
var comparator = [
	cmpOrder,
	cmpAttackers,
	cmpName,
	cmpPeace, 
	cmpRyo,
	cmpRes,
	cmpRes,
	cmpRes,
	cmpRes,
	cmpRes,
	cmpDefense,
	cmpTarget
	];

function setButton(n, state)
{
	var b = document.getElementById("isr_button" + n);
	if (state)
		b.setAttribute("class", "active");
	else
		b.removeAttribute("class");
}

function toggleButton(n)
{
	setButton(n, !isActive(n));
}

function isActive(n)
{
	// Return true is button <n> is activated
	if (/active/.test(document.getElementById("isr_button" + n).getAttribute("class")))
		return true;
	return false;
}
	
function sortOption(n)
{
	// Click event handler sends button id, grab number from the id
	var match = n.match(/\d+/);
	if (match)
		n = parseInt(match[0]);
	else
		return;
	
	if (n >= 5 && n <= 9) {
		for (var i = 1; i <= 4; i++)
			setButton(i, false);
		for (var i = 10; i <= 11; i++)
			setButton(i, false);
		toggleButton(n);
	} else
		for (var i = 1; i <= 11; i++)
			if (i == n)
				toggleButton(i);
			else
				setButton(i, false);

	n = 0;
	for (var i = 1; i <= 11; i++)
		if (isActive(i)) {
			n = i;
			break;
		}
		
	if (n >= 5 && n <= 9) {
		// Sorting by resources, recalculate weights
		for (var i = 0; i < villageList.length; i++) {
			var v = villageList[i];
			v.weight = weight(v,
				isActive(5) ? 1 : 0, 
				isActive(6) ? 1 : 0, 
				isActive(7) ? 1 : 0, 
				isActive(8) ? 1.1 : 0, 
				isActive(9) ? 1.1 : 0);
		}
	}
	mergeSort(villageList, comparator[n]);
	fillSpyTable();
}

function createElement(tag, attributes, html)
{
	var node = document.createElement(tag);
	if (attributes) {
		for (var a in attributes)
			node.setAttribute(a, attributes[a]);
	}
	if (html) {
		node.innerHTML = html;
	}
	return node;
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

function addHeaderNode(tag, type, text)
{
	var head = document.getElementsByTagName('head')[0];
	if (!head)
		return;
	var node = document.createElement(tag);
	node.type = type;
	node.textContent = text;
	head.appendChild(node);
}

function findSpyReportTd()
{
	// villagespyreport.html spy report
	var bSnap = document.evaluate("//tbody/tr/td/b[1]", document, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
	for (var i = 0; i < bSnap.snapshotLength; i++)
		if (/spy report/i.test(bSnap.snapshotItem(i).innerHTML))
			return bSnap.snapshotItem(i).parentNode;

	return null;
}

function isCNVillage(villageName)
{
	for (var i=0; i<CNVillageList.length; i++)
		if (villageName == CNVillageList[i])
			return true;

	// Name not found, not a CN Village
	return false;
}

function parseSpyReport()
{
	// node should be the <td> containing spy report
	var spyTable = findSpyReportTd();
	if (!spyTable)
		return null;
	
	// Scan the spy report and collect spy data
	villageList = [];
	var villageMap = {};
	var header;
	var currentVillage = new Village();
	for (var line = spyTable.firstChild; line != null; line = line.nextSibling) {
		if (line.tagName) {
			if (/b/i.test(line.tagName) && !header) {
				header = line.textContent;
			} else if (/hr/i.test(line.tagName)) {
				// Village done, don't store unless we found a name
				if (currentVillage.name && !isCNVillage(currentVillage.name)) {
					villageList.push(currentVillage);
					villageMap[currentVillage.name] = villageList.length - 1;
				}
				currentVillage = new Village();
			}
			continue;
		}
		// Skip non-text nodes
		if (line.nodeType != 3)
			continue;
		
		var txt = line.textContent;
		
		if (/NRF Found/.test(txt))
			currentVillage.tier = 1;
		else if (/Beacon Found/.test(txt))
			currentVillage.tier = 2;
		else if (/Defended.from\:.(.*).Village/.test(txt))
			currentVillage.defense = RegExp.lastParen;
		else if (/Attack Plans: (.*) Village/.test(txt))
			currentVillage.target = RegExp.lastParen;
		else if (/Current Stores: (.*) Ryo/.test(txt))
			currentVillage.ryo = stringToNumber(RegExp.lastParen);
		else if (/Brilliant Crystals: (\d+)/.test(txt))
			currentVillage.bc = stringToNumber(RegExp.lastParen);
		else if (/Medicinal Water: (\d+)/.test(txt))
			currentVillage.mw = stringToNumber(RegExp.lastParen);
		else if (/Precious Metals: (\d+)/.test(txt))
			currentVillage.pm = stringToNumber(RegExp.lastParen);
		else if (/Solid Fire: (\d+)/.test(txt))
			currentVillage.sf = stringToNumber(RegExp.lastParen);
		else if (/Unmelting Ice: (\d+)/.test(txt))
			currentVillage.ui = stringToNumber(RegExp.lastParen);
		else if (/Peacetime Bonus: (.?\d+)/.test(txt))
			currentVillage.peace = stringToNumber(RegExp.lastParen);
		else if (/(.*) Village/.test(txt))
			currentVillage.name = RegExp.lastParen;
	}
	if (currentVillage.name) {
		villageList.push(currentVillage);
		villageMap[currentVillage.name] = villageList.length - 1;
	}

	// Calculate weight and assign ordinal numbers
	var n = 1;
	for (var i in villageList) {
		villageList[i].weight = weight(villageList[i], 1, 1, 1, 1.1, 1.1);
		villageList[i].order = n++;
		villageList[i].attackers = 0;
	}
	
	for (var v1 in villageList) {
		if (villageList[v1].target) {
			var v2 = villageMap[villageList[v1].target];
			if (v2) {
				if (villageList[v1].tier == villageList[v2].tier)
					villageList[v2].attackers++;
				else
					villageList[v1].target = "(" + villageList[v1].target + ")";
			}
		}
		if (villageList[v1].defense) {
			var v2 = villageMap[villageList[v1].defense];
			if (v2 && villageList[v1].tier != villageList[v2].tier)
				villageList[v1].defense = "(" + villageList[v1].defense + ")";
		}
	}

	header = header.replace(/.*(Spy Report.*\)).*/, "$1");
	
	return header;
}

function createSpyTable(id, header)
{
	// Create table, headers and empty tbody
	var table = document.createElement("table");
	table.id = id;

	table.innerHTML = "<thead><tr class='isrtitle'><th colspan='15'/></tr>" +
		"<tr class='isrbuttonrow'>" +
		"<th id='isr_button1'>#Att</th>" +
		"<th id='isr_button2'>Village</th>" +
		"<th id='isr_button3'>Peace</th>" +
		"<th id='isr_button14'>Size</th>" +
		"<th id='isr_button15'>Ups</th>" +
		"<th id='isr_button4'>Ryo</th>" +
		"<th id='isr_button5' class='active'>BC</th>" +
		"<th id='isr_button6' class='active'>MW</th>" +
		"<th id='isr_button7' class='active'>PM</th>" +
		"<th id='isr_button8' class='active'>SF</th>" +
		"<th id='isr_button9' class='active'>UI</th>" +
		"<th id='isr_button11'>Target</th>" +
		"<th id='isr_button10'>Defense</th>" +
		"<th id='isr_button12'>Leader</th>" +
		"<th id='isr_button13'>Stats</th>" +
		"</tr></thead>";

	table.getElementsByTagName("th")[0].innerHTML = header;

	var tbody = document.createElement("tbody");
	table.appendChild(tbody);
	tbody.id = "isrbody";
	return table;
}

function fillSpyTable()
{
	// Get saved spy insertion times
	var player = getPlayerName();
	var db = new DOMStorage("local", "BvSImprovedSpyReport." + player);
	var dbPlayer = new DOMStorage("local", "BvSImprovedSpyReport.PlayerData");
	var dbVillage = new DOMStorage("local", "BvSImprovedSpyReport.VillageData");

	var infiltrating = {};
	var inf = db.getItem("infiltrating", "").split(":");
	for (var i = 0; i < inf.length; i++) {
		var match = inf[i].match(/(.*)=(.*)/);
		if (match)
			infiltrating[match[1]] = parseInt(match[2]);
	}
	var date = new Date();
	var age = parseInt(db.getItem("timestamp", "0"));
	age = Math.floor((date.getTime() - age) / 3600 / 1000);

	// Fill in <tbody>
	var tbody = document.getElementById("isrbody");
	tbody.textContent = "";
	var even = true;
	for (var i in villageList) {
		var v = villageList[i];
		
		if (!tierFilter[v.tier])
			continue;


		// Pull info from the Village and Player databases
		var vData = dbVillage.getItem(v.name.replace(/ /g, "_") + "_Village", null);
		vData = vData ? vData.split("|") : null;

		var pData = vData ? dbPlayer.getItem(vData[1].replace(/ /g, "_"), null) : null;
		pData = pData ? pData.split("|") : null;

		// Compute the age of village/leader info
		//    Age = 0 gives no message
		var vpAge = vData && pData ? Math.floor((date.getTime() - Math.min(pData[0], vData[0]))/1000/3600/24) : null;

		// Data older than 7 days has expired
		if (vpAge && vpAge >= 7)
		{
			vData = null;
			pData = null;
			vpAge = "";
		}
		else
			vpAge = vpAge ? " (" + vpAge + " d)" : "";

		// Build the table row entry data structure
		var data = [];
		data.push({cls: "number", text: v.attackers});
		if (infiltrating[v.name]) {
			// Village is still being infiltraded according to latest seen village.html spy list
			var t = infiltrating[v.name] - age;
			if (t < 0)
				data.push({cls: "name", html: "<a href='./vlookup.html?village=" + v.name + "'>" +
					v.name + "</a> (0 h?)"});
			else
				data.push({cls: "name", html: "<a href='./vlookup.html?village=" + v.name + "'>" +
					v.name + "</a> (" + t + " h)"});
		} else
			data.push({cls: "name", html: "<a href='./vlookup.html?village=" + v.name + "'>" +
				v.name + "</a>"});

		data.push({cls: "peace", text: v.peace ? "+" + v.peace : ""}); // Peace bonus
		data.push({cls: "peace", text: vData ? vData[2] : ""});        // Size
		data.push({cls: "peace", text: vData ? vData[3] : ""});        // Number of upgrades

		data.push({cls: "ryo", text: numberToString(v.ryo)});
		data.push({cls: "resource", text: v.bc});
		data.push({cls: "resource", text: v.mw});
		data.push({cls: "resource", text: v.pm});
		data.push({cls: "resource", text: v.sf});
		data.push({cls: "resource", text: v.ui});
		if (v.target[0] == "(")
			data.push({cls: "name oot", text: v.target});
		else
			data.push({cls: "name", text: v.target});
		if (v.defense[0] == "(")
			data.push({cls: "name oot", text: v.defense});
		else
			data.push({cls: "name", text: v.defense});


		data.push({cls: "name", text: vData ? vData[1] + vpAge : ""});  // Leader Name
		data.push({cls: "stats", text: pData ? pData[1] : ""});         // Leader Stats





		var tr = tableRow(data);
		tbody.appendChild(tr);
		tr.setAttribute("class", (even ? "even" : "odd") + " tier" + v.tier);
		even = !even;
	}
}

function improveSpyReport() {
	// Insert stylesheet
	addHeaderNode("style", "text/css",
		"table#improvedspyreport {width: 800px; font-size: 12px; " +
			"background-color: black; border-spacing: 1px;}\n" +
		"#improvedspyreport .isrtitle {font-size: 15px;}\n" +
		"#improvedspyreport thead {background-color: rgb(220, 180, 140); font-weight: bold; " +
			"text-align: center;}\n" +
		"#improvedspyreport th {border: 1px outset rgb(220, 180, 140);}\n" +
		"#improvedspyreport td {padding: 1px;}\n" +
		".isrbuttonrow th {cursor: pointer;}\n" +
		".isrbuttonrow th.active {border: 1px inset rgb(200, 160, 125) !important; color: yellow;}\n" +
		"#isrbody a {font-weight: bold;}\n" +
		"#isrbody .oot {color: grey;}\n" +
		"#isrbody .even.tier2 {background-color: rgb(234, 216, 195);}\n" +
		"#isrbody .odd.tier2 {background-color: rgb(222, 202, 168);}\n" +
		"#isrbody .even.tier1 {background-color: rgb(195, 216, 234);}\n" +
		"#isrbody .odd.tier1 {background-color: rgb(168, 202, 222);}\n" +
		"#isrbody .even.tier0 {background-color: rgb(195, 234, 216);}\n" +
		"#isrbody .odd.tier0 {background-color: rgb(168, 222, 202);}\n" +
		"#isrbody tr.tier0:hover {background-color: rgb(255, 255, 95);}\n" +
		"#isrbody tr.tier1:hover {background-color: rgb(255, 255, 95);}\n" +
		"#isrbody tr.tier2:hover {background-color: rgb(255, 255, 95);}\n" +
		"#isrbody td.number {text-align: center;}\n" +
		"#isrbody td.peace {text-align: center;}\n" +
		"#isrbody td.ryo {text-align: right;}\n" +
		"#isrbody td.name {overflow: hidden;}\n" +
		"#isrbody td.stats {overflow: hidden;}\n" +
		"#isrbody td.resource {width: 24px; text-align: right;}\n" +
		"#isrtierselect {padding: 0; text-align: center;}\n" +
		"#isrtierselect li {display: inline; margin: 0 2px 0 2px; padding: 2px 3px 2px 3px; " +
			"cursor: pointer; font-weight: bold;}\n" +
		"#isrtierselect .button {border: 2px outset grey;}\n" +
		"#isrtierselect .activebutton {border: 2px inset grey;}\n" +
		"#isrtierselect .tier2 {border-color: rgb(222, 202, 168); background-color: rgb(222, 202, 168);}\n" +
		"#isrtierselect .tier1 {border-color: rgb(168, 202, 222); background-color: rgb(168, 202, 222);}\n" +
		"#isrtierselect .tier0 {border-color: rgb(168, 222, 202); background-color: rgb(168, 222, 202);}");

	// Find spy report <td> node
	var spyTable = findSpyReportTd();
	if (!spyTable)
		return;
	var header = parseSpyReport();
	if (!header)
		return;
	// Go to <table> parent
	while (!/table/i.test(spyTable.tagName))
		spyTable = spyTable.parentNode;

	var player = getPlayerName();
	var db = new DOMStorage("local", "BvSImprovedSpyReport." + player);

	// Sort by resources
	mergeSort(villageList, cmpRes);

	var header = "- " + header + " (" + villageList.length + " villages) -";
	var improvedSpyTable = createSpyTable("improvedspyreport", header);
	spyTable.parentNode.replaceChild(improvedSpyTable, spyTable);
	
	// Tier filter
	tierFilter = [];
	var t = db.getItem("tiers", "0:1:2").split(/:/);
	for (var i in t)
		tierFilter[parseInt(t[i])] = true;
	
	var tiersel = document.createElement("ul");
	tiersel.id = "isrtierselect";
	for (var t = 2; t >= 0; t--) {
		var li = document.createElement("li");
		if (tierFilter[t])
			li.setAttribute("class", "activebutton tier" + t);
		else
			li.setAttribute("class", "button tier" + t);
		switch (t) {
		case 2: li.textContent = "Beacon (Tier 3)"; break;
		case 1: li.textContent = "NRF (Tier 2)"; break;
		case 0: li.textContent = "Basic (Tier 1)"; break;
		}
		li.id = "isrtier" + t;
		tiersel.appendChild(li);
		li.addEventListener("click", function(event) {
			if (/isrtier(\d+)/.test(event.target.id)) {
				var tier = parseInt(RegExp.lastParen);
				tierFilter[tier] = !tierFilter[tier];
				if (tierFilter[tier])
					event.target.setAttribute("class", "activebutton tier" + tier);
				else
					event.target.setAttribute("class", "button tier" + tier);
				fillSpyTable();
				var save = [];
				for (var t = 0; t < 3; t++)
					if (tierFilter[t])
						save.push(t);
				db.setItem("tiers", save.join(":"));
				event.preventDefault();
			}
		}, true);
	}
	improvedSpyTable.parentNode.insertBefore(tiersel, improvedSpyTable);
	
	var date = new Date();
	var age = parseInt(db.getItem("timestamp", "0"));
	age = Math.floor((date.getTime() - age) / 3600 / 1000);

	if (age > 0) {
		var div = document.createElement("div");
		improvedSpyTable.parentNode.insertBefore(div, improvedSpyTable);
		div.setAttribute("style", "font-size: 14px; text-align: center; font-weight: bold;");
		div.innerHTML = "Spy insertion times updated " + age + " hours ago. Check Village/Show All " +
			"Spies to update.";
	}

	fillSpyTable();
	
	// Listen to click events on the button row
	// send element id to sortOption function
	document.getElementById("isr_button1").parentNode.addEventListener(
		'mousedown',
		function(event) {
			sortOption(event.target.getAttribute("id"));
			return;
		},
		true);
}

function scanSpyList()
{
	// village.html spy list
	var spies = document.evaluate("//table/tbody/tr/td/div/ul/li",
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	var found = false;
	var infiltrating = [];
	for (var i = 0; i < spies.snapshotLength; i++) {
		var spy = spies.snapshotItem(i).innerHTML;
		// Match "Villagename (xxH to go)" and "Villagename"
		// where villagename can be one or two words consisting of letters and digits
		// "Foo Bar (12H to go)" => ["Foo Bar (12H to go)", "Foo Bar", "Bar", " (12H to go)", "12"] 
		// "Foo Bar" => ["Foo Bar", "Foo Bar", "Bar", undefined, undefined]
		var match = spy.match(/^([\w\d]+(\s[\w\d]+)?)(\s\((\d+)H to go\))?$/)
		if (match) {
			found = true;
			if (match[4])
				infiltrating.push(match[1] + "=" + match[4]);
		}
	}
	if (found) {
		var player = getPlayerName();
		var db = new DOMStorage("local", "BvSImprovedSpyReport." + player);
		var date = new Date();
		db.setItem("timestamp", "" + date.getTime());
		db.setItem("infiltrating", infiltrating.join(":"));
	}
}

function scanVillageLookup()
{
	// Open the database
	var db = new DOMStorage("local", "BvSImprovedSpyReport.VillageData");

	var IRtest = /The slightest thought of this Village<br>sends you quaking in fear!/.exec(document.body.innerHTML);

	var vName;
	var vLeader;
	var vNumVillagers;
	var vNumUpgrades;

	if (IRtest)
	{
		// Parse IR village lookup page

		var table = document.evaluate("//table/tbody/tr/td/b",
			document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

		var table2 = document.evaluate("//table/tbody/tr/td/font/b/a",
			document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

		var table3 = document.evaluate("//table/tbody/tr/td/font/b",
			document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

		// Village name
		vName = table3.snapshotItem(1).innerHTML.replace(/ /g, "_");

		// Leader name
		vLeader = table2.snapshotItem(0).innerHTML;

		// Number of villagers
		vNumVillagers = table.snapshotItem(0).innerHTML;

		// Number of upgrades
		vNumUpgrades = table.snapshotItem(1).innerHTML;

	}
	else
	{
		// Parse non IR village lookup page

		var table = document.evaluate("//table/tbody/tr/td/b",
			document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

		var table2 = document.evaluate("//table/tbody/tr/td/font/b/a",
			document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

		// Village name
		vName = table.snapshotItem(0).innerHTML.replace(/ /g, "_");

		// Leader name
		vLeader = table2.snapshotItem(0).innerHTML;
	
		// Number of villagers
		vNumVillagers = table.snapshotItem(1).innerHTML;

		// Number of upgrades
		vNumUpgrades = table.snapshotItem(2).innerHTML;
	}


	// Page view timestamp
	var date = new Date();

	// Build the village string
	var vString = date.getTime() + "|" + vLeader + "|" + vNumVillagers + "|" + vNumUpgrades;

	// Add this to the database
	db.setItem(vName, vString);
}

function scanPlayerLookup()
{
	// Open the database
	var db = new DOMStorage("local", "BvSImprovedSpyReport.PlayerData");

	var IRtest = /The slightest thought of them has you quaking in fear!/.exec(document.body.innerHTML);

	var pName;

	var pNumPerms;
	var pNumTrophies;
	var pNumSeason;
	var pNumRank;

	var pNumMono;
	var pNumWaste;

	var pNumLevel;
	var pRank;

	if (IRtest)
	{
		var table = document.evaluate("//table/tbody/tr/td/center/font/b",
			document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

		var table2 = document.evaluate("//table/tbody/tr/td/center/i/b/font",
			document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

		var table3 = document.evaluate("//table/tbody/tr/td/center/b/font/i",
			document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

		pName = table2.snapshotItem(0).innerHTML;

		pNumPerms    = table.snapshotItem(0).innerHTML;
		pNumTrophies = table.snapshotItem(1).innerHTML;
		pNumSeason   = table.snapshotItem(2).innerHTML;
		
		pNumRank     = table3.snapshotItem(0).innerHTML.replace("#","");
		if (/Idle/.exec(pNumRank))
			pNumRank = "(Idle)";
		else
			pNumRank = "#" + pNumRank;

		// Build the actual message that goes in the stats line
		pMessage =  pNumRank + "  S" + pNumSeason + "  KaijuKage";

	}
	else
	{
		// Grab some easy stuff

		// Season
		pNumSeason = /Season ([0-9]+)!/.exec(document.body.innerHTML);
		pNumSeason = pNumSeason ? pNumSeason[1] : "1";
		
		pNumMono = /Monochrome Missions: ([0-9]+)/.exec(document.body.innerHTML);
		pNumMono = pNumMono ? pNumMono[1] : "0";

		pNumWaste = /Wasteland Missions: ([0-9]+)/.exec(document.body.innerHTML);
		pNumWaste = pNumWaste ? pNumWaste[1] : "0";

		pNumPerms = /Permanent Items: <font color=..9d12c5.><b>([0-9]+)<\/b>/.exec(document.body.innerHTML);
		pNumPerms = pNumPerms ? pNumPerms[1] : "0";

		pNumRank = /Player Ranking: <b><font color=..006600.><i>#([0-9]+)<\/i>/.exec(document.body.innerHTML);
		pNumRank = pNumRank ? pNumRank[1] : "unranked";

		pNumTrophies = /Trophies: <font color=..9d1215.><b>([0-9]+)<\/b>/.exec(document.body.innerHTML);
		pNumTrophies = pNumTrophies ? pNumTrophies[1] : "0";

		var temp = /Level: <b>([0-9]+)<\/b> - <b>([^<]+)<\/b>/.exec(document.body.innerHTML);
		pNumLevel = temp[1];
		pRank     = temp[2];

		if (/Special/.exec(pRank))
			pRank = "Sp. Jonin";

		var table = document.evaluate("//table/tbody/tr/td/font/b",
			document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

		pName = table.snapshotItem(1).innerHTML;

		// Build the actual message that goes in the Stats line
		pMessage =  "#" + pNumRank + "  S" + pNumSeason + "  " + pRank + "  L" + pNumLevel;

		if (parseInt(pNumMono) == 0)
			pMessage = pMessage + "  --  No Monochrome!";
		else if (parseInt(pNumMono) < 50)
			pMessage = pMessage + "  --  " + pNumMono + " Monochrome";

	}

	// Page view timestamp
	var date = new Date();

	// Replace spaces in playername with "_"
	pName = pName.replace(/ /g, "_");

	// Build the pString
	var pString = date.getTime() + "|" + pMessage;

	// Add this to the database
	db.setItem(pName, pString);

}



// main
if (/billy.bvs.villagespyreport\./.test(location.href))
	improveSpyReport();
else if (/billy.bvs.village\./.test(location.href))
	scanSpyList();
else if (/billy.bvs.vlookup\./.test(location.href))
	scanVillageLookup();
else if (/billy.bvs.lookup\./.test(location.href))
	scanPlayerLookup();
