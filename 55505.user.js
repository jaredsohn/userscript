// ==UserScript==
// @name           BvS Success Probability
// @namespace      BvS
// @description    Calculates success chance for spy, attack and mission attempts.
// @include        http://*animecubed.com/billy/bvs/*
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

// Options
// Display crank hint?
var crankHint = true;
// Display success chance on mission resolution page?
var missionResolutionTable = true;

var STYLESHEET = "" + <r><![CDATA[
table#successprobability {background-color: rgb(91%, 80%, 63%); border-collapse: collapse;}
#successprobability tr {border: 1px solid black;}
#successprobability td {text-align: left; padding: 4px 8px 4px 4px;}
#successprobability td+td {text-align: right; padding: 4px 4px 4px 8px;}
#successprobability .gen {background-color: rgb(0%, 33%, 0%); color: white;}
#successprobability .nin {background-color: rgb(33%, 0%, 0%); color: white;}
#successprobability .tai {background-color: rgb(0%, 0%, 33%); color: white;}
#successprobability .dou {background-color: rgb(33%, 33%, 0%); color: white;}
]]></r>

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

// Parsing stuff

function strip(str)
{
	// Remove leading and trailing whitespace
	str = str.replace(/^\s+/, "");
	str = str.replace(/\s+$/, "");
	str = str.replace(/\s+/g, " ");
	return str;
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

function parseAbilities(jutsu, text)
{
	text = text.replace(/\|/g, " ");
	// E.g. "Taijutsu: 29 (+22) +12 Str 1-31 R 2 Suc"
	var re = new RegExp(jutsu + ": (\\d+)( \\(([+-]\\d+)\\))?( ([+-]\\d+) Str)? 1-(\\d+) R( (\\d+) Suc)?");
	var match = text.match(re);

	if (match) {
		var lvl = parseInt(match[1]) || 0;
		lvl += parseInt(match[3]) || 0;
		return {
			lvl: lvl,
			str: parseInt(match[5]) || 0,
			rng: parseInt(match[6]) || 0,
			suc: parseInt(match[8]) || 0
		};
	}
	
	return null;
}

function parseMission(xpath)
{
	var mission = new Mission();

	var txtdoc = textCat(xpath);
	var splut = txtdoc.split(/Ability #\d+:\s+/);

	// Find crank level if any
	var crank = splut[0].match(/Crank Level: (\d+)/);
	if (crank)
		mission.crank = parseInt(crank[1]);
	
	// Match primary stat and mission title
	var match = splut[0].match(/(\w+)jutsu\|([^|]*)\|([^|]*)\|.*Difficulty (\d+) Successes (\d+)/);
	if (match) {
		var c = new Challenge();
		c.dif = parseInt(match[4]) - mission.crank;
		c.suc = parseInt(match[5]) - mission.crank;
		var type = match[1].toLowerCase();
		mission[type] = c;
		mission.order.push(type);
	} else {
		// Rolling challenge?
		match = splut[0].match(/(\w+)jutsu\|([^|]*)\|([^|]*)\|.*Difficulty (\d+) Successes Remaining (\d+)/);
		if (match) {
			var c = new Challenge();
			c.dif = parseInt(match[4]) - mission.crank;
			c.suc = parseInt(match[5]) - mission.crank;
			var type = match[1].toLowerCase();
			mission[type] = c;
			mission.order.push(type);
			mission.rolling = true;
		} else
			return null;
	}
	// Match any additional stats
	for (var i = 1; i < splut.length; i++) {
		var match = splut[i].match(/(\w+)jutsu.*Difficulty (\d+) Successes (\d+)/);
		if (match) {
			var c = new Challenge();
			c.dif = parseInt(match[2]) - mission.crank;
			c.suc = parseInt(match[3]) - mission.crank;
			var type = match[1].toLowerCase();
			mission[type] = c;
			mission.order.push(type);
		}
	}

	return mission;
}

function parseNinja(xpath)
{
	// Convert sidebar to text
	var txtdoc = textCat("//center/table/tbody/tr/td[2]/table/tbody/tr//text()");

	// Parse jutsu abilities
	var ninja = new Ninja();
	for (var t in jutsuTypes)
		ninja[t] = parseAbilities(jutsuTypes[t], txtdoc);
	
	return ninja;
}

// Output

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

function tableRow(s1, s2, cls)
{
	var tr = document.createElement("tr");
	var td = document.createElement("td");
	tr.appendChild(td);
	td.innerHTML = s1;
	td = document.createElement("td");
	tr.appendChild(td);
	td.innerHTML = s2;
	
	if (cls)
		tr.setAttribute("class", cls);
	
	return tr;
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

// Main

if (/billy.bvs.missions.mission1.html/.test(location.href)) {
	// Mission
	if (!document.forms.namedItem("attempt") && !missionResolutionTable)
		return;
	
	addHeaderNode("style", "text/css", STYLESHEET);
	
	var ninja = parseNinja("//center/table/tbody/tr/td[2]/table/tbody/tr//text()");

	// Parse mission challenges
	var mission = parseMission("//div[@class='miscontainer']//text()");
	if (!mission)
		return;

	try {
		var hint = document.createElement("table");
		hint.setAttribute("id", "successprobability");
		insertElement("//div[@class='miscontainer']", hint, false);

		var ptot = 1.0;
		for (var j in mission.order) {
			var type = mission.order[j];
			if (mission[type].dif > 0) {
				var p;
				p = successChance(mission[type], ninja[type], mission.crank);
				hint.appendChild(tableRow(jutsuTypes[type], percent(p), type));
				ptot *= p;
			}
		}
		hint.appendChild(tableRow("Total", percent(ptot)));

		if (crankHint) {
			var maxcrank = 0;
			var maxp = -1;
			for (var crank = 0; crank < 100; crank++) {
				var p = 1.0;
				for (var j in mission.order) {
					var type = mission.order[j];
					p *= successChance(mission[type], ninja[type], crank);
				}
				if (maxp == -1 || p >= 0.95) {
					maxcrank = crank;
					maxp = p;
				}
				if (p < 0.95)
					break;
			}
			hint.appendChild(tableRow("Crank " + maxcrank , percent(maxp)));
		}
	}
	catch (e) {
		GM_log(e);
	}
} else if (/billy.bvs.questattempt.html/.test(location.href)) {
	// Quest
	addHeaderNode("style", "text/css", STYLESHEET);

	var ninja = parseNinja("//center/table/tbody/tr/td[2]/table/tbody/tr//text()");

	// Parse mission challenges
	var mission = parseMission("//center/table[@width='388']//text()");
	if (!mission)
		return;

	var hint;
	try {
		hint = document.createElement("table");
		hint.setAttribute("id", "successprobability");
		insertElement("//form[@name='attack']", hint, true);
	}
	catch (e) {
		GM_log(e);
		return;
	}

	if (mission.rolling) {
		// Rolling challenge
		for (var j in mission.order) {
			var type = mission.order[j];
			var expect = expectedSuccesses(mission[type], ninja[type]);
			var attempts = mission[type].suc / expect;
			expect = Math.round(expect * 10) / 10; // Round to 1 decimal place
			hint.appendChild(tableRow(jutsuTypes[type], expect + " Suc", type));
		}
	} else {
		var ptot = 1.0;
		for (var j in mission.order) {
			var type = mission.order[j];
			if (mission[type].dif > 0) {
				var p;
				p = successChance(mission[type], ninja[type]);
				hint.appendChild(tableRow(jutsuTypes[type], percent(p), type));
				ptot *= p;
			}
		}
		hint.appendChild(tableRow("Total", percent(ptot)));
	}
} else if (/billy.bvs.villagespyattempt.html/.test(location.href)) {
	// Spying
	addHeaderNode("style", "text/css", STYLESHEET);

	var ninja = parseNinja("//center/table/tbody/tr/td[2]/table/tbody/tr//text()");

	var txtdoc = textCat("//table/tbody/tr/td/table/tbody/tr/td/font//text()");
	
	var match = txtdoc.match(/Difficulty (\d+)(\+5\?)?(\+10\?)? Successes (\d+)/);
	
	if (match) {
		var challenge = new Challenge();
		
		challenge.dif = parseInt(match[1]);
		challenge.suc = parseInt(match[4]);
		if (match[2])
			challenge.dif += 5; // Special forces
		
		try {
			var hint = document.createElement("table");
			hint.setAttribute("id", "successprobability");
			insertElement("//form[@name='spyatt']", hint, true);
			hint.appendChild(tableRow("Assumed difficulty", challenge.dif + "d/" + challenge.suc + "s"));
			for (var type in basicJutsuTypes)
				hint.appendChild(tableRow(jutsuTypes[type],
					percent(successChance(challenge, ninja[type])), type));
		}
		catch(e) {
			GM_log(e);
		}
	}
} else if (/billy.bvs.villageattackattempt.html/.test(location.href)) {
	// Raid / Invasion
	addHeaderNode("style", "text/css", STYLESHEET);

	var ninja = parseNinja("//center/table/tbody/tr/td[2]/table/tbody/tr//text()");
	
	var txtdoc = textCat("//table/tbody/tr[3]/td[3]/center/table/tbody/tr/td//text()");
	
	var match = txtdoc.match(/Difficulty (\d+) Successes (\d+)/);
	
	if (match) {
		var p = {};
		var ptot = 1.0;
		var challenge = new Challenge();

		challenge.dif = parseInt(match[1]);
		challenge.suc = parseInt(match[2]);
		
		for (var j in basicJutsuTypes) {
			p[j] = successChance(challenge, ninja[j]);
			ptot *= p[j];
		}

		try {
			var hint = document.createElement("table");
			hint.setAttribute("id", "successprobability");
			insertElement("//form[@name='attatt']", hint, true);

			hint.appendChild(tableRow("All three (invasion)", percent(ptot)));
			ptot += (1 - p.gen) * p.nin * p.tai +
				p.gen * (1 - p.nin) * p.tai +
				p.gen * p.nin * (1 - p.tai);
			hint.appendChild(tableRow("Any two (raid)", percent(ptot)));
		}
		catch (e) {
			GM_log(e);
		}
	}
}
