// ==UserScript==
// @name           R00t Success Chance
// @description    Calculates success chance for r00t field actions.
// @namespace      http://userscripts.org/users/dtkarlsson
// @include        http://*animecubed.com/billy/bvs/villagefields*
// @licence        MIT; http://www.opensource.org/licenses/mit-license.php
// @copyright      2009, Daniel Karlsson
// @require        http://userscripts.org/scripts/source/57756.user.js
// @version        0.10.0
// @history        0.10.0 Added rough estimate of max difficulty
// @history        0.9.1 Text was supposed to be white, now it is
// ==/UserScript==
try {
	ScriptUpdater.check(65225, "0.10.0");
}
catch (e)
{
}

var jutsuTypes = {
	gen: "Genjutsu",
	nin: "Ninjutsu",
	tai: "Taijutsu",
	dou: "Doujutsu"
}
var basicJutsuTypes = {
	gen: "Genjutsu",
	nin: "Ninjutsu",
	tai: "Taijutsu"
}

function Ability()
{
	this.lvl = 0;
	this.str = 0;
	this.rng = 0;
	this.suc = 0;
}

function Ninja()
{
	this.gen = new Ability();
	this.nin = new Ability();
	this.tai = new Ability();
	this.dou = new Ability();
}

function Challenge()
{
	this.dif = 0;
	this.suc = 0;
}

function Mission()
{
	this.gen = new Challenge();
	this.nin = new Challenge();
	this.tai = new Challenge();
	this.dou = new Challenge();
	this.order = [];
	this.crank = 0;
}

// Math stuff below

function binomialCoefficient(n, k)
{
	// n!/[k!(n-k)!]
	if (k > n || k < 0)
		return 0;
	k = Math.max(k, n - k);
	var i = 1;
	var j = k + 1;
	var c = 1;
	// i = 1 ... n-k => (n-k)!
	// j = k+1 ... n => n!/k!
	while (j <= n)
		c *= j++ / i++;
	return c;
}

function binomdist(k, n, p, cumulative)
{
	// Cumulative distribution, k or less successes in n trials
	if (cumulative) {
		var sum = 0;
		for (var i = 0; i <= k; i++)
			sum += binomdist(i, n, p, false);
		return sum;
	}
	// Exactly k successes in n trials with probability p
	return binomialCoefficient(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
}

function successChance(challenge, ability, crank)
{
	if (!crank)
		crank = 0;

	// Successful rolls required
	var req = (challenge.suc + crank)- ability.suc;
	if (req > ability.lvl)
		return 0;
	else if (req <= 0)
		return 1;

	if ((challenge.dif + crank) > ability.rng)
		return 0;

	// Success probability per roll
	var prob = (ability.str + ability.rng - (challenge.dif + crank) + 1) / ability.rng;

	if (prob >= 1)
		return 1;

	return Math.min(0.9999, 1 - binomdist(req - 1, ability.lvl, prob, true));
}

function expectedSuccesses(challenge, ability, crank)
{
	if (!crank)
		crank = 0;

	if ((challenge.dif + crank) > ability.rng)
		return 0;

	// Success probability per roll
	var prob = (ability.str + ability.rng - (challenge.dif + crank) + 1) / ability.rng;
	
	return ability.suc + Math.min(1, prob) * ability.lvl;
}

function percent(n)
{
	if (n == 1.0)
		return "100%";
	else if (n == 0.0)
		return "0%";
	var p = Math.round(n * 1000) / 10;
	if (p > 99.9)
		return ">99.9%";
	else if (p < 0.1)
		return "<0.1%";
	return p + "%";
}

// Parsing

function parseAbilities()
{
	var ninja = new Ninja();
	var tables = document.evaluate("//table[count(descendant::table)=4]//table",
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
	for (var i = 0; i < tables.snapshotLength; i++) {
		var ab = new Ability();
		var type = "";
		
		var lines = tables.snapshotItem(i).textContent.split(/\n/);
		for (var l in lines) {
			var m;
			
			m = lines[l].match(/Suc: (\d+)( \(\+(\d+)\))?/);
			if (m) {
				ab.suc += parseInt(m[1]);
				if (m[3])
					ab.suc += parseInt(m[3]);
				continue;
			}
			
			m = lines[l].match(/Str: (\d+)( \(\+(\d+)\))?/);
			if (m) {
				ab.str += parseInt(m[1]);
				if (m[3])
					ab.str += parseInt(m[3]);
				continue;
			}
			
			m = lines[l].match(/Rng: (\d+)( \(\+(\d+)\))?/);
			if (m) {
				ab.rng += parseInt(m[1]);
				if (m[3])
					ab.rng += parseInt(m[3]);
				continue;
			}
			
			m = lines[l].match(/Lvl: (\d+)( \(\+(\d+)\))?/);
			if (m) {
				ab.lvl += parseInt(m[1]);
				if (m[3])
					ab.lvl += parseInt(m[3]);
				continue;
			}
			
			m = lines[l].match(/(\w{3}): (\d+)/);
			if (m) {
				type = m[1].toLowerCase();
				ab.lvl += parseInt(m[2]);
				continue;
			}
		}
		ninja[type] = ab;
	}

	return ninja;
}

function parseMission()
{
	var tables = document.evaluate("//table[count(descendant::table)=0]",
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
	var node = null;
	var mission = new Mission();
	for (var i = 0; i < tables.snapshotLength; i++) {
		var txt = tables.snapshotItem(i).textContent;
		if (/virus attack/i.test(txt)) {
			var lines = txt.split(/\n/);
			// Gen  D: 15  S: 15
			for (var l in lines) {
				var line = lines[l].replace(/\s+/g, " ");
				var m = line.match(/(\w{3}) D: (\d+) S: (\d+)/);
				if (m) {
					var type = m[1].toLowerCase();
					mission[type].dif = parseInt(m[2]);
					mission[type].suc = parseInt(m[3]);
					node = tables.snapshotItem(i);
				}
			}
			break;
		}
	}
	
	if (node)
		return {mission: mission, node: node};
}

var ninja = parseAbilities();
var missionNode = parseMission();

if (missionNode) {
	var mission = missionNode.mission;
	var node = missionNode.node;
	
	var p = 1;
	for (var t in jutsuTypes) {
		p *= successChance(mission[t], ninja[t]);
	}
	
	var tr = document.createElement("tr");
	var td = document.createElement("td");
	td.textContent = "Success chance: " + percent(p);
	td.style.color = "white";
	tr.appendChild(td);
	node.firstChild.appendChild(tr);
}

// Rough estimate of average field difficulty
function fieldChallenge(diff)
{
	diff = Math.min(230, diff);
	diff = Math.max(0, diff);
	var c = new Challenge();
	c.dif = Math.round(0.13 * diff + 15);
	c.suc = Math.round(0.11 * diff + 15);
	return c;
}

// Calculate max difficulty a ninja can reliably handle
var diff, p;
for (diff = 230; diff >= 0; diff -= 5) {
	p = 1;
	for (var t in basicJutsuTypes)
		p = Math.min(p, successChance(fieldChallenge(diff), ninja[t]));
	if (p > 0.95)
		break;
}
var form = document.getElementsByName("field")[0];
var div = document.createElement("div");
div.textContent = "Recommended difficulty (estimate): " + diff + " (" + percent(p) + ")";
form.parentNode.insertBefore(div, form);
