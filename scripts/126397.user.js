// ==UserScript==
// @name          WF Blueprints Mod
// @namespace     http://www.wanush.net/
// @description	  Displays additional items on colony page
// @include       http://*.war-facts.com/blueprints.php*
// @include       http://*.war-facts.com/extras/blueprint.php*
// @include       http://*.war-facts.com/build_facility.php*
// @version       1.1
// ==/UserScript==

// Copyright (c) 2006 Michael Wanush, all rights reserved.
// There is absolutely no warrantee whatsoever. If this script messes up
// your computer the user is responsible, not the writer. You have been
// warned. That said, the script is tested for Grease Monkey 0.6.4 ONLY.

// Version 1.1 - Fixed for H6

window.GM_wfbp_onBlueprintsLoad = function(e) {
	try {
		var doc = document.evaluate("/html/body/div/div[1]/div/center/form[1]/table/tbody", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null).iterateNext();
		if (!doc) {
			return ;
		}
		var i = 0;
		var processing = "";
		while (i < doc.rows.length)
		{
			if (doc.rows[i].cells[1].innerHTML == "&nbsp;")
			{
				i++;
				processing = doc.rows[i].cells[1].childNodes[0].childNodes[0].innerHTML;
			} else {
				doProcessing(processing, doc.rows[i]);
			}
			i++;
		}
	} catch (ex) {
		alert('wfblueprintsmod1 exception ' + ex.name + ' : ' + ex.message);
	}
}

window.GM_wfbp_onBlueprintMarketLoad = function(e) {
	try {
		var doc = document.evaluate("/html/body/div/div[1]/div/center/form[1]/table/tbody", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null).iterateNext();
		if (!doc) {
			return ;
		}
		var i = 0;
		var processing = "";
		while (i < doc.rows.length)
		{
			if (doc.rows[i].cells[1].innerHTML == "&nbsp;")
			{
				i++;
				processing = doc.rows[i].cells[1].childNodes[0].childNodes[0].innerHTML;
			} else {
				doProcessing(processing, doc.rows[i]);
			}
			i++;
		}
	} catch (ex) {
		alert('wfblueprintsmod2 exception ' + ex.name + ' : ' + ex.message);
	}
}

window.GM_wfbp_onBuildFacilityLoad = function(e) {
	try {
	//var doc = document.body.childNodes[3].rows[0].cells[1].getElementsByTagName('table')[0];
	var doc = document.evaluate("/html/body/div/div[1]/div/center/p[3]/table/tbody", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null).iterateNext();
	if (!doc) {
		doc = document.evaluate("/html/body/div/div[1]/div/center/p[4]/table/tbody", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null).iterateNext();
	}
	if (!doc) {
		return;
	}

	//var mod = document.body.childNodes[3].rows[0].cells[1];
	var mod = document.evaluate("/html/body/div/div[1]/div/center/strong/font/a[1]", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null).iterateNext();
	// Grab Planet ID
	var pid = mod.href.replace(/^.*colony=(\d+).*$/m,"$1");

	var i = 1;
	var processing = "";
	while (i < doc.rows.length)
	{
		if (doc.rows[i].cells[1].childNodes[0].nodeName == "B")
		{
			processing = doc.rows[i].cells[1].childNodes[0].childNodes[0].innerHTML;
		} else {
			var orelist = doc.rows[i].cells[2].childNodes[0];
			for (var ore = 1; ore < orelist.rows.length - 1; ore++)
			{
				var mine = orelist.rows[ore].cells[0].innerHTML;
				var newlink = document.createElement('a');
				var theurl = "http://www.war-facts.com/build_facility.php?type=1&colony=" + pid + "&subtype=" + ore;
				newlink.setAttribute("href", theurl);
				newlink.appendChild(document.createTextNode(mine));
				orelist.rows[ore].cells[0].replaceChild(newlink, orelist.rows[ore].cells[0].firstChild);
			}
			doProcessing(processing, doc.rows[i]);
		}
		i++;
	}
	} catch (ex) {
		alert('wfblueprintsmod3 exception ' + ex.name + ' : ' + ex.message);
	}
}

var ccc = 0;

window.doProcessing = function(processing, node)
{
	var bp = node.cells[1].getElementsByTagName('table')[0];

	// Look for NR
	var ores = node.cells[2].getElementsByTagName('table')[0];
	var orec = 0;
	var orec2 = 0;
	for (var i = 1; i < 11; i++)
	{
		var orenum = ores.rows[i].cells[1].childNodes[0];
		while (orenum.nodeName != "#text") orenum = orenum.childNodes[0];
		var am = parseInt(orenum.nodeValue.replace(/,/g,""),10);
		orec += am;
		if (i >= 3 && i <= 8) {
			orec2 += am;
		}
	}
	if (orec == 0) {
		ores.style.backgroundColor = '#919133';
	} else if (orec2 == 0) {
		ores.style.backgroundColor = '#555555';
	}

	switch (processing) {

		case "Empire Administration":
			var workers = parseInt(bp.rows[0].cells[1].innerHTML.replace(/,/g,""), 10);
			var effic   = parseInt(bp.rows[1].cells[1].innerHTML.replace(/,/g,""), 10);

			var ntr = document.createElement('tr');
			var ntd1 = document.createElement('td');
			var ntd2 = document.createElement('td');
			ntd1.innerHTML = "Corruption:";
			ntd2.innerHTML = Math.ceil(workers * effic * 0.05 * 100) / 100;
			ntd2.innerHTML += "%";
			ntr.appendChild(ntd1);
			ntr.appendChild(ntd2);
			bp.appendChild(ntr);

			addANode(node, "Upkeep", workers * effic * 1000);
			addCosts(node, workers * effic * 0.05, "Cost / % Corruption");
			break;

		case "Mall":
			var workers = parseInt(bp.rows[0].cells[1].innerHTML.replace(/,/g,""), 10);
			var effic   = parseInt(bp.rows[1].cells[1].innerHTML.replace(/,/g,""), 10);

			var ntr = document.createElement('tr');
			var ntd1 = document.createElement('td');
			var ntd2 = document.createElement('td');
			ntd1.innerHTML = "People Served:";
			ntd2.innerHTML = Math.ceil(workers * effic * 40 / 100);
			ntr.appendChild(ntd1);
			ntr.appendChild(ntd2);
			bp.appendChild(ntr);
			addCosts(node, workers * effic / 100, "Cost / Eff Worker");
			break;

		case "Entertainment Facility":
		case "Hospital":
		case "Police Station":
		case "School":
		case "Copper Mine":
		case "Diamond Mine":
		case "Drilling Rig":
		case "Farm":
		case "Gold Mine":
		case "Iron Mine":
		case "Platinum Mine":
		case "Silver Mine":
		case "Titanium Mine":
		case "Uranium Mine":
		case "Well":
			var workers = parseInt(bp.rows[0].cells[1].innerHTML.replace(/,/g,""), 10);
			var effic   = parseInt(bp.rows[1].cells[1].innerHTML.replace(/,/g,""), 10);
			addCosts(node, workers * effic / 100, "Cost / Eff Worker");
			break;
		case "Research Facility":
			var workers = parseInt(bp.rows[0].cells[1].innerHTML.replace(/,/g,""), 10);
			//var effic   = parseInt(bp.rows[1].cells[1].innerHTML.replace(/,/g,""), 10);
			addCosts(node, workers, "Cost / Worker");
			break;
		case "Terraformer":
			var workers = parseInt(bp.rows[0].cells[1].innerHTML.replace(/,/g,""), 10);
			var effic   = parseInt(bp.rows[1].cells[1].innerHTML.replace(/,/g,""), 10);
			addCosts(node, workers * effic / 100, "Cost / Eff Worker");
			break;

		case "Battleship Hull":
		case "Bomber Hull":
		case "Corvette Hull":
		case "Destroyer Hull":
		case "Troop Transport":
			var cannons = parseInt(bp.rows[1].cells[1].innerHTML.replace(/,/g,""), 10);
			addCosts(node, cannons, "Cost / Cannon");
			var layout = parseInt(bp.rows[8].cells[1].innerHTML.replace(/,/g,""), 10);
			addCosts(node, layout/1000.0, "Cost / Layout");
			addANode(node, "Layout / Cannon", Math.ceil(layout / cannons*100)/100);
			var eng   = parseInt(bp.rows[9].cells[1].innerHTML.replace(/,/g,""),10);
			var mass  = parseInt(bp.rows[10].cells[1].innerHTML.replace(/,/g,""),10);
			addANode(node, "Mass / Engine", Math.ceil(mass / eng * 100) / 100);
			addANode(node, "Layout / Engine", Math.ceil(layout / eng * 100) / 100);
			break;
		case "Carrier Hull":
			var fighter = parseInt(bp.rows[3].cells[1].innerHTML.replace(/,/g,""), 10);
			addCosts(node, fighter, "Cost / Fighter");
			var eng   = parseInt(bp.rows[9].cells[1].innerHTML.replace(/,/g,""),10);
			var mass  = parseInt(bp.rows[10].cells[1].innerHTML.replace(/,/g,""),10);
			var layout = parseInt(bp.rows[8].cells[1].innerHTML.replace(/,/g,""), 10);
			addANode(node, "Mass / Engine", Math.ceil(mass / eng * 100) / 100);
			addANode(node, "Layout / Engine", Math.ceil(layout / eng * 100) / 100);
			break;
		case "Colony Ship Hull":
		case "Genesis Hull":
			var colonist = parseInt(bp.rows[5].cells[1].innerHTML.replace(/,/g,""), 10);
			addCosts(node, colonist, "Cost / Colonist");
			var eng   = parseInt(bp.rows[9].cells[1].innerHTML.replace(/,/g,""),10);
			var mass  = parseInt(bp.rows[10].cells[1].innerHTML.replace(/,/g,""),10);
			var layout = parseInt(bp.rows[8].cells[1].innerHTML.replace(/,/g,""), 10);
			addANode(node, "Mass / Engine", Math.ceil(mass / eng * 100) / 100);
			addANode(node, "Layout / Engine", Math.ceil(layout / eng * 100) / 100);
			break;
		case "Command Frigate":
		case "High Stability Sphere Hull":
			var layout = parseInt(bp.rows[8].cells[1].innerHTML.replace(/,/g,""), 10);
			addCosts(node, layout/1000, "Cost / 1k Layout");
			var eng   = parseInt(bp.rows[9].cells[1].innerHTML.replace(/,/g,""),10);
			var mass  = parseInt(bp.rows[10].cells[1].innerHTML.replace(/,/g,""),10);
			addANode(node, "Mass / Engine", Math.ceil(mass / eng * 100) / 100);
			addANode(node, "Layout / Engine", Math.ceil(layout / eng * 100) / 100);
			break;
		case "Probe Hull":
		case "Surveyor Hull":
			var scan = parseInt(bp.rows[6].cells[1].innerHTML.replace(/,/g,""), 10);
			addCosts(node, scan, "Cost / ScanLvl");
			var eng   = parseInt(bp.rows[9].cells[1].innerHTML.replace(/,/g,""),10);
			var mass  = parseFloat(bp.rows[10].cells[1].innerHTML.replace(/,/g,""),10);
			addANode(node, "Mass / Engine", Math.ceil((100 * mass) / eng));
			break;
		case "Crimson Cruiser":
		case "Crimson Colossus":
		case "Crimson Gunboat":
		case "Fighter Hull":
			var guns = parseInt(bp.rows[0].cells[1].innerHTML.replace(/,/g,""), 10);
			addCosts(node, guns, "Cost / Gun");
			var layout = parseInt(bp.rows[8].cells[1].innerHTML.replace(/,/g,""), 10);
			addCosts(node, layout/1000.0, "Cost / Layout");
			addANode(node, "Layout / Gun", Math.ceil(layout / guns * 100)/100);
			var eng   = parseInt(bp.rows[9].cells[1].innerHTML.replace(/,/g,""),10);
			var mass  = parseInt(bp.rows[10].cells[1].innerHTML.replace(/,/g,""),10);
			addANode(node, "Mass / Engine", Math.ceil(mass / eng * 100) / 100);
			addANode(node, "Layout / Engine", Math.ceil(layout / eng * 100) / 100);
			break;
		case "Space Station Hull":
			var layout = parseInt(bp.rows[8].cells[1].innerHTML.replace(/,/g,""), 10);
			addCosts(node, layout/1000, "Cost / 1k Layout");
			var transp = parseInt(bp.rows[4].cells[1].innerHTML.replace(/,/g,""), 10);
			addCosts(node, transp/1000, "Cost / 1k Transport");
			break;
		case "Transport Hull":
		case "Freighter Hull":
			var transp = parseInt(bp.rows[4].cells[1].innerHTML.replace(/,/g,""), 10);
			addCosts(node, transp/1000, "Cost / 1k Transport");
			var eng   = parseInt(bp.rows[9].cells[1].innerHTML.replace(/,/g,""),10);
			var mass  = parseInt(bp.rows[10].cells[1].innerHTML.replace(/,/g,""),10);
			var layout = parseInt(bp.rows[8].cells[1].innerHTML.replace(/,/g,""), 10);
			addANode(node, "Mass / Engine", Math.ceil(mass / eng * 100) / 100);
			addANode(node, "Layout / Engine", Math.ceil(layout / eng * 100) / 100);
			break;

		case "Cannon":
		case "Gun Battery":
		case "Single Barrel Gun":
			var damage = parseFloat(bp.rows[0].cells[1].innerHTML.replace(/,/g,""), 10);
			var rate = bp.rows[1].cells[1].innerHTML.replace(/,/g,"");
			var rate = parseFloat(bp.rows[1].cells[1].innerHTML.replace(/,/g,""), 10);
			//var rate1 = parseInt(rate, 10);
			//var rate2 = parseInt(rate.substr(rate.indexOf('.')+1), 10);
			//rate = rate1 + rate2 / 100;
			var mass = parseInt(bp.rows[2].cells[1].innerHTML.replace(/,/g,""), 10);
			addANode(node, "Dmg / 1000kg", Math.ceil(damage * rate / mass * 100*1000) / 100);
			addCosts(node, Math.ceil(damage * rate / mass * 100*1000) / 100, "Cost / Dmg");
			break;

		case "Anti Matter Drive":
		case "Capital Ship Drive":
		case "Small Vessel Drive":
			var power = parseFloat(bp.rows[0].cells[1].innerHTML.replace(/,/g,""));
			var eff   = parseFloat(bp.rows[1].cells[1].innerHTML.replace(/,/g,""));
			var mass  = parseFloat(bp.rows[2].cells[1].innerHTML.replace(/,/g,""));
			addANode(node, "Power / Mass", Math.ceil(power / mass * 1000));
			addANode(node, "Eff / Mass", Math.ceil(eff / mass * 1000));
			break;

		case "Armor Plating":
			var armor = parseInt(bp.rows[0].cells[1].innerHTML.replace(/,/g,""), 10);
			var stab   = parseInt(bp.rows[2].cells[1].innerHTML.replace(/,/g,""), 10);
			var mass  = parseInt(bp.rows[3].cells[1].innerHTML.replace(/,/g,""), 10);
			addANode(node, "Armor / Mass", Math.ceil(armor * stab * 1000 / 100 / mass ));
			addCosts(node, armor * stab / 100, "Cost / Armor");
			break;
		case "Energy Shield":
			var shield = parseInt(bp.rows[1].cells[1].innerHTML.replace(/,/g,""), 10);
			var stab   = parseInt(bp.rows[2].cells[1].innerHTML.replace(/,/g,""), 10);
			var mass  = parseInt(bp.rows[3].cells[1].innerHTML.replace(/,/g,""), 10);
			addANode(node, "Shield / Mass", Math.ceil(shield * stab * 1000 / 100 / mass * 1000) / 1000);
			addCosts(node, shield * stab / 100, "Cost / Shield");
			break;

		case "AA Battery":
		case "Guided Missile Launcher":
			var damage = parseInt(bp.rows[0].cells[1].innerHTML.replace(/,/g,""), 10);
			var rate = bp.rows[1].cells[1].innerHTML.replace(/,/g,"");
			var rate1 = parseInt(rate, 10);
			var rate2 = parseInt(rate.substr(rate.indexOf('.')+1), 10);
			rate = rate1 + rate2 / 100;
			var mass = parseInt(bp.rows[2].cells[1].innerHTML.replace(/,/g,""), 10);
			addANode(node, "Damage", Math.ceil(damage * rate * 100) / 100);
			addCosts(node, Math.ceil(damage * rate * 100) / 100, "Cost / Dmg");
			break;
	}
}

window.addANode = function(node, tag, val)
{
	var bp = node.cells[1].getElementsByTagName('table')[0];
	var nval = "";
	val = val.toString();
	if (Number(val) != Number.NaN)
	{
		if (val.indexOf('.') != -1) val = val.substring(0, val.indexOf('.'));
		while (val.length > 3)
		{
			nval += ',' + val.substring(val.length - 3);
			val = val.substring(0, val.length - 3);
		}
		nval = val + nval;
	}
	ntr = document.createElement('tr');
	ntr.style.backgroundColor = '#105f10';
	ntd1 = document.createElement('td');
	ntd2 = document.createElement('td');
	ntd1.appendChild(document.createTextNode(tag));
	ntd2.appendChild(document.createTextNode(nval));
	ntr.appendChild(ntd1);
	ntr.appendChild(ntd2);
	bp.appendChild(ntr);
}

window.addCosts = function(node, workers, tag)
{
	var bp = node.cells[1].getElementsByTagName('table')[0];
	var cost = node.cells[2].getElementsByTagName('table')[0].rows[0].cells[1].childNodes[0];
	while (cost.nodeName != "#text") cost = cost.childNodes[0];
	cost = parseInt(cost.nodeValue.replace(/,/g,""),10);
	cost = Math.ceil(cost / workers) + "";
	var ncost = "";
	if (cost.indexOf(".") != -1)
	{
		ncost = cost.substr(cost.indexOf("."));
		cost = cost.substr(0, cost.indexOf(".") - 1);
	}
	while (cost.length > 0)
	{
		ncost = cost.length < 3 ? cost + ncost : cost.substr(cost.length-3) + ncost;
		cost = cost.substr(0, cost.length-3);
		if (cost.length > 0) ncost = "," + ncost;
	}
	ntr = document.createElement('tr');
	ntr.style.backgroundColor = '#5f1010';
	ntd1 = document.createElement('td');
	ntd2 = document.createElement('td');
	ntd1.appendChild(document.createTextNode(tag));
	ntd2.appendChild(document.createTextNode(ncost + " cr"));
	ntr.appendChild(ntd1);
	ntr.appendChild(ntd2);
	bp.appendChild(ntr);
}


if (window.location.href.indexOf('/blueprints') != -1) {
	window.addEventListener("load", window.GM_wfbp_onBlueprintsLoad, false);
} else if (window.location.href.indexOf('/build_facility') != -1) {
	window.addEventListener("load", window.GM_wfbp_onBuildFacilityLoad, false);
} else if (window.location.href.indexOf('/extras/blueprint.php') != -1) {
	window.addEventListener("load", window.GM_wfbp_onBlueprintMarketLoad, false);
}
