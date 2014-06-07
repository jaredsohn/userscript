// ==UserScript==
// @name           BvS Virtual Fighto
// @namespace      http://userscripts.org/users/dtkarlsson
// @include        http://animecubed.com/billy/bvs/villagerobofightowide.*
// @include        http://www.animecubed.com/billy/bvs/villagerobofightowide.*
// @require        http://userscripts.org/scripts/source/57756.user.js
// @licence        MIT; http://www.opensource.org/licenses/mit-license.php
// @copyright      2009, Daniel Karlsson
// @version        0.3.1
// ==/UserScript==

try {
	ScriptUpdater.check(67074, "0.3.1");
}
catch (e) {}

const pilotRank = {
	G: 1,
	F: 2,
	E: 3,
	D: 4,
	C: 5,
	B: 6,
	A: 7
};

const bonusDisplay = {
	levels: {str: "Levels", unit: ""},
	range: {str: "Range", unit: ""},
	strength: {str: "Strength", unit: ""},
	successes: {str: "Successes", unit: ""},
	push: {str: "Push Chance", unit: "%"},
	charged: {str: "Charged", unit: "%"},
	risky: {str: "Risky", unit: "%"},
	chained: {str: "Chained", unit: ""},
	berserk: {str: "Berserk", unit: ""},
	juiced: {str: "Juiced", unit: "%"},
	doubletap: {str: "DoubleTap", unit: "%"},
	cranked: {str: "Cranked", unit: "00%"}
};

function Build() {
	this.levels = 0;
	this.range = 0;
	this.strength = 0;
	this.successes = 0;
	this.push = 0;
	this.rank = 0;
	
	// Create a new copy
	this.copy = function() {
		var cpy = new Build();
		for (var i in this)
			if (typeof(this[i]) != "function")
				cpy[i] = this[i];
		return cpy;
	}
	
	// Add number values from other object
	this.add = function(rhs) {
		for (var i in rhs)
			if (typeof(rhs[i]) != "function")
				if (i == "rank")
					this[i] = Math.max(this[i], rhs[i]);
				else
					this[i] = (this[i] || 0) + rhs[i];
	}
}

var baseValues = new Build();
baseValues.push = 70;
baseValues.levels = 5;
baseValues.range = 10;

function options()
{
	var opt = document.createElement("div");
	opt.innerHTML = "" + <r><![CDATA[
	<form id="vfoptions">
	<fieldset>
		<legend>Pilot / Tournament</legend>
		<table>
			<tbody>
				<tr>
					<td>Piloting Bonus</td>
					<td>
						<select id="vfpilotlevels">
							<option value="0">0</option>
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="4">4</option>
							<option value="5">5</option>
							<option value="6">6</option>
							<option value="7">7</option>
						</select>
					</td>
				</tr>
				<tr>
					<td>Fine Tuning</td>
					<td>
						<input type="checkbox" id="vffinetuning" value="true" />
					</td>
				</tr>
				<tr>
					<td>Risky Tournament</td>
					<td>
						<input type="checkbox" id="vfrisky" value="true" />
					</td>
				</tr>
			</tbody>
		</table>
	</fieldset>
	<fieldset>
		<legend>Build</legend>
		<table>
			<tbody id="vfbuildtable">
				<tr>
					<td>Levels</td>
					<td>5</td>
				</tr>
				<tr>
					<td>Range</td>
					<td>10</td>
				</tr>
				<tr>
					<td>Strength</td>
					<td>0</td>
				</tr>
				<tr>
					<td>Successes</td>
					<td>0</td>
				</tr>
				<tr>
					<td>Push Chance</td>
					<td>70%</td>
				</tr>
			</tbody>
		</table>
	</fieldset>
	<fieldset>
		<legend>Scores</legend>
		<table>
			<tbody id="vfoutput"/>
		</table>
		<div id="vffightogo">Simulate</div>
	</fieldset>
	</form>
]]></r>

	return opt;
}

function die(sides)
{
	return Math.floor(Math.random() * sides) + 1;
}

function roll(build)
{
	return Math.min(build.range, Math.floor(Math.random() * build.range) + 1 + build.strength);
}

// Add thousand separator and round to "nice" number
function numberToStr(n)
{
	// Round to 2.5 significant digits
	if (n == 0)
		return "0";
	// m = 10^(number of digits - 1)
	// Divide n by m to get a number in range [1, 10[
	var m = Math.pow(10, Math.floor(Math.log(n) / Math.log(10)));

	// 100 <= n / m * 100 < 1000
	// round off, scale back to original magnitude and return
	var str = "" + Math.round(Math.round(n / m * 20) / 20 * m);
	return str.replace(/\d{1,3}(?=(\d{3})+)/g, "$&,");
}

var AVERAGE_PUSH = 0;
function tourney(build, rounds)
{
	var t1 = new Date();
	var scores = [];
	var avgcount = 0;
	
	build = build.copy();
	
	if (!rounds)
		rounds = 1000;
	
	for (var i = 0; i < rounds; i++) {
		var pushes = 0;
		var pushChance = build.push;
		var score = 0;
		var chargedBonus = (build.charged || 0);
		var chainedBonus = 0;
		var backup = build.copy();
		do {
			var levels = build.levels;

			// Berserk
			if (build.berserk && pushes == 0)
				levels += build.berserk;

			// Successes
			var pushscore = build.range * build.successes;

			// Juiced
			var sign = 1;
			if (build.juiced)
				if (die(100) <= build.juiced)
					sign = -1;

			// DoubleTap
			if (build.doubletap)
				if (die(100) <= build.doubletap)
					sign *= 2;

			// Cranked
			if (build.cranked && pushes == 11)
				sign *= (1 + build.cranked);

			// FIGHTO!
			for (var j = 0; j < levels; j++)
				pushscore += sign * roll(build);

			AVERAGE_PUSH += pushscore;
			avgcount++;

			score += pushscore;

			// Risky
			if (build.risky && pushes >= 1)
				pushChance -= build.risky;

			// Charged reset
			if (pushes == 1)
				chargedBonus = 0;

			// Chained
			if (build.chained && pushes >= 1)
				build.range += build.chained;

			pushes++;
		} while (die(100) <= pushChance + chargedBonus);

		build = backup;
		scores.push(score);
	}

	AVERAGE_PUSH /= avgcount;
	
	scores.sort(function(a,b) {return b - a;}); // sort highest to lowest
	
	return scores;
}

// Return currently selected item from dropdown
function getSelectedItem(xpath)
{
	var dropdown = document.evaluate(xpath, document, null, 
		XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	return dropdown.options[dropdown.selectedIndex].text;
}

// Remove uninteresting characters
function chomp(txt)
{
	return txt.replace(/^[^\w\d-]*/, "").replace(/[^\w\d]*$/, "");
}

// Normalise bonus names
function bonusKey(txt)
{
	txt = txt.toLowerCase();
	txt = chomp(txt.replace(/pilot/, ""));
	return txt.replace(/level$/, "levels").replace(/success$/, "successes").replace(/.*tap$/, "doubletap");
}

// Parse item description
function parseItem(txt)
{
	var item = new Build();
	
	var split = txt.match(/(\(.*\))/);
	if (split)
		txt = chomp(split[1]);

	split = txt.match(/(.*): Rank (\w)/);
	if (!split)
		return;
	item.rank = pilotRank[split[2]];
	txt = chomp(split[1]);
	
	do {
		split = txt.match(/(.*?)(\w+):(\d+)(.*)/);
		if (split) {
			item[bonusKey(split[2])] = parseInt(split[3]);
			txt = chomp(split[1] + split[4]);
		}
	} while (split);
	do {
		split = txt.match(/(.*?)(-?\d+)%? ([\w\s]+)(.*)/);
		if (split) {
			item[bonusKey(split[3])] = parseInt(split[2]);
			txt = chomp(split[1] + split[4]);
		}
	} while (split);
	
	return item;
}

function tableRow(td1, td2)
{
	var tr = document.createElement("tr");

	var td = document.createElement("td");
	tr.appendChild(td);
	td.textContent = td1;

	td = document.createElement("td");
	tr.appendChild(td);
	td.textContent = td2;
	
	return tr;
}

var currentBuild;
var effectiveLevels;
function fightoGo(event, rounds)
{
	if (!rounds)
		rounds = 10000;

	// Update build and scores
	var table = document.getElementById("vfbuildtable");
	table.innerHTML = "";
	table.appendChild(tableRow("Rank", String.fromCharCode(72 - currentBuild.rank) + "(+" + effectiveLevels + ")"));
	for (var i in bonusDisplay)
		if (currentBuild[i])
			table.appendChild(tableRow(bonusDisplay[i].str, currentBuild[i] + bonusDisplay[i].unit));

	var table = document.getElementById("vfoutput");
	table.innerHTML = "";
	var s = tourney(currentBuild, rounds);
	var percentiles = [0.01, 0.025, 0.05, 0.1];
	for (var p in percentiles) {
		var para = document.createElement("p");
		var i = Math.floor(s.length * percentiles[p]);
		table.appendChild(tableRow((percentiles[p] * 100) + "%", numberToStr(s[i])));
	}
	table.appendChild(tableRow("Per push", numberToStr(Math.round(AVERAGE_PUSH))));
	table.appendChild(tableRow("Rounds", numberToStr(rounds)));
}

function onChange()
{
	// Parse parts from dropdown boxes
	var build = new Build();
	for (var i = 1; i <= 5; i++)
		build.add(parseItem(getSelectedItem("//select[@name='section-" + i + "']")));

	build.add(baseValues);

	// Pilot/Tournament values
	var pt = new Build();

	// Pilot levels
	var opt = document.getElementById("vfpilotlevels");
	var plvl = parseInt(opt.options[opt.selectedIndex].text);

	// Effective level
	pt.levels = Math.min(build.rank, plvl);
	effectiveLevels = pt.levels;
	
	// Fine tuning?
	opt = document.getElementById("vffinetuning");
	if (opt.checked)
		pt.push = 3;
	
	// Risky tournament?
	opt = document.getElementById("vfrisky");
	if (opt.checked)
		pt.risky = 1;
	
	build.add(pt);

	currentBuild = build;

	fightoGo(null, 1000);
}

var links = document.evaluate("//a[@href]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

var buildButton;
for (var i = 0; i < links.snapshotLength; i++)
	if (links.snapshotItem(i).href == "javascript:document.rebuildrobot.submit();") {
		buildButton = links.snapshotItem(i);
		break;
	}
if (!buildButton)
	return;

GM_addStyle("div#virtualfighto {color: white; vertical-align: top;}");
GM_addStyle("div#vffightogo {border: 1px outset grey; background-color: grey; color: black; cursor: pointer;}");
GM_addStyle("#virtualfighto fieldset {display: inline-block; vertical-align: top;}");
GM_addStyle("#virtualfighto table {color: white;}");
var div = options();
div.id = "virtualfighto";
buildButton.parentNode.insertBefore(div, buildButton.nextSibling);

for (var i = 1; i < 6; i++) {
	var sel = document.evaluate("//select[@name='section-" + i + "']", document, null,
		XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	if (!sel)
		break;
	sel.addEventListener("change", onChange, false);
}

var widgets = ["vfpilotlevels", "vffinetuning", "vfrisky"];
for (var i in widgets)
	document.getElementById(widgets[i]).addEventListener("change", onChange, false);
	
document.getElementById("vffightogo").addEventListener("click", fightoGo, false);

onChange();
