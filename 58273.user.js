// ==UserScript==
// @name AEspot
// @namespace http://aespot.com/
// @description Bits and pieces for AE, written from scratch.
// @copyright 2009
// @license Creative Commons
// @version 0.92
// @include http://aespot.com/options*
// @include http://aespot.com/pos*
// @include http://*.astroempires.com/*
// @exclude http://*.astroempires.com/home*
// @exclude http://*.astroempires.com/login*
// @exclude http://*.astroempires.com/lost*
// @exclude http://forum.astroempires.com/*
// @exclude http://support.astroempires.com/*
// @exclude http://wiki.astroempires.com/*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

/***********************\
|** Define some stuff **|
\***********************/
var head = document.getElementsByTagName("head")[0].innerHTML;
var layout = false;
if (head.match(/skins\/DeepSpace/)) { layout = true; }
var creditPath = "/table/tbody/tr/td[position() = 2 and contains(.,'INCOMETYPE')]/../td[3]";
var queuePath = "//table[@id='base_queue']/tbody/tr[2]/td/table/tbody";
if (layout) {
	var creditPath = "//div/table/tbody/tr/td[position() = 2 and contains(.,'INCOMETYPE')]/../td[3]";
	var empireMenu = "//table[@id='empire_menu' and position() = 1]";
	var empireMenuAfter = "//table[@id='main-header']";
	queuePath += "/tr/td[2]/div/table/tbody/tr[position() != last()]/td[position() = 1 and contains(.,'STRUCTURETYPE')]";
	var structurePath = "//table[@id='base_structures']/tbody/tr[2]/td/table/tbody/tr/td[2]/div";
	var techPath = "//table[@id='empire_technologies']/tbody/tr[2]/td/table/tbody/tr/td[2]/div";
	var tradePath = "//td[2]/small[2]";
	var tradePathBoard = "//table[@id='board_main']//a[contains(.,'NAMED')]";
	var tradePathNamed = "//td[2]/small[position() = 2 and contains(.,'NAMED')]";
} else {
	var creditPath = "//table[@id='credits_table_inside']/tbody/tr/td"+creditPath;
	var empireMenu = "//table[@id='empire_menu']";
	var empireMenuAfter = "//table[@class='top']/following::br[1]";
	queuePath += "/tr[position() != last()]/td[position() = 1 and contains(.,'STRUCTURETYPE')]";
	var structurePath = "//table[@id='base_structures']/tbody/tr[2]/td";
	var techPath = "/html/body/table[@id='empire_technologies']/tbody/tr[2]/td";
	var tradePath = "//td[2]/small[2]";
	var tradePathBoard = "//table[@id='board_main']//a[contains(.,'NAMED')]";
	var tradePathNamed = "//td[2]/small[position() = 2 and contains(.,'NAMED')]";
}
var basePath = "//table[@id='bases_list']/tbody/tr[2]/td/table/tbody/tr/td[2]/div/table/tbody/tr";
var baseIdPath = basePath+"/td[1]/a";
var baseLocationPath = basePath+"/td[2]/a";
var commanderPath = "//td[position() = 6 and contains(.,'Base Commander')]/../td[position() = 2 and contains(.,'COMMANDERTYPE')]";
var commanderLocationPath = commanderPath+"/../td[3]/a/small";
empireMenuAfter+="/following::*[1]"
structurePath += "/table/tbody/tr[contains(.,'STRUCTURETYPE')]";
var structureBuildPath = structurePath+"/td[@id='time1']";
var structureLevelPath = structurePath+"/td[contains(.,'Level')]";
var techPathEnergy = techPath+"/table/tbody/tr[2]/td[5]";

var dateMinute = (60 * 1000);
var dateHour = (60 * dateMinute);
var dateDay = (24 * dateHour);
var dateWeek = (7 * dateDay);
var player = /(\[.+\])\s(.*)/;
var debug = GM_getValue('debug', false);

function formatNum(num){num=String(num);var format=/(\d+)(\d{3})/;while(format.test(num)){num=num.replace(format,'$1'+','+'$2');}return num;}
function getGuild(str){var g=str.match(player);if(g!=null){return g[1];}return str;}
function getName(str){var n=str.match(player);if(n!=null){return n[2];}return str;}
function getCost(structure, level, commander) {
	if (level == null) { level = 1; }
	if (commander == null) { commander = 0; }
	var StructureCost = 0;
	switch (structure) {
		case "Gas Plants":
		case "Metal Refineries":
		case "Urban Structures":
		case "Solar Plants":		structureCost = 1;
						break;
		case "Crystal Mines":
		case "Research Labs":		structureCost = 2;
						break;
		case "Robotic Factories":
		case "Spaceports":
		case "Shipyards":		structureCost = 5;
						break;
		case "Command Centers":
		case "Fusion Plants":		structureCost = 20;
						break;
		case "Economic Centers":
		case "Nanite Factories":
		case "Terraform":		structureCost = 80;
						break;
		case "Android Factories":	structureCost = 1000;
						break;
		case "Antimatter Plants":
		case "Orbital Base":		structureCost = 2000;
						break;
		case "Jump Gate":		structureCost = 5000;
						break;
		case "Multi-Level Platforms":
		case "Orbital Shipyards":	structureCost = 10000;
						break;
		case "Capital":			structureCost = 15000;
						break;
		case "Biosphere Modification":	structureCost = 20000;
						break;
	}
	cost = Math.ceil( structureCost * Math.pow(1.5,level-1) * ((100 - commander) / 100) );
	return cost;
}

Array.prototype.max=function(){var max=this[0];var maxel=0;var len=this.length;for(var i=1;i<len;i++){if(this[i]>max){max=this[i];manel=i;}}return [max,maxel];}
Array.prototype.min=function(){var min=this[0];var minel=0;var len=this.length;for(var i=1;i<len;i++){if(this[i]<min){min=this[i];minel=i;}}return [min,minel];}
Array.prototype.count=function(x){var count=0;var len=this.length;for(var i=0;i<len;i++){if(this[i]===x){count++;}}return count;}

GM_addStyle('#spotout {background-color:transparent;z-index:13;border:#444444 solid;font-family:verdana,arial;font-size:12px;}');
/*************************\
|** Set output position **|
\*************************/
var spotoutPosition = "";
var spotoutPositionTop = 1;
var spotoutPositionRight = 1;
if (GM_getValue('posTopBottom', 'top') == 'top') { spotoutPositionTop = -1; }
if (GM_getValue('posLeftRight', 'right') == 'right') { spotoutPositionRight = -1; }
spotoutPosition += GM_getValue('posTopBottom', 'top');spotoutPosition += ":";spotoutPosition += GM_getValue('posTBPercent', 0);spotoutPosition += "%;";
spotoutPosition += GM_getValue('posLeftRight', 'right');spotoutPosition += ":";spotoutPosition += GM_getValue('posLRPercent', 0);spotoutPosition += "%;";

if (window.location.hostname.match(/aespot/)) {
	if (window.location.pathname.match(/pos/)) {
		switch (window.location.search.substr(1)) {
			case 'tl':
				GM_setValue('posTopBottom', 'top');GM_setValue('posLeftRight', 'left');GM_setValue('posTBPercent', '0');GM_setValue('posLRPercent', '0');
				break;
			case 'tr':
				GM_setValue('posTopBottom', 'top');GM_setValue('posLeftRight', 'right');GM_setValue('posTBPercent', '0');GM_setValue('posLRPercent', '0');
				break;
			case 'bl':
				GM_setValue('posTopBottom', 'bottom');GM_setValue('posLeftRight', 'left');GM_setValue('posTBPercent', '0');GM_setValue('posLRPercent', '0');
				break;
			case 'br':
				GM_setValue('posTopBottom', 'bottom');GM_setValue('posLeftRight', 'right');GM_setValue('posTBPercent', '0');GM_setValue('posLRPercent', '0');
				break;
			case 'l':
				GM_setValue('posLRPercent',(Number(GM_getValue('posLRPercent', 0)) + (5 * -spotoutPositionRight)));
				break;
			case 'r':
				GM_setValue('posLRPercent',(Number(GM_getValue('posLRPercent', 0)) + (5 * spotoutPositionRight)));
				break;
			case 'u':
				GM_setValue('posTBPercent',(Number(GM_getValue('posTBPercent', 0)) + (5 * spotoutPositionTop)));
				break;
			case 'd':
				GM_setValue('posTBPercent',(Number(GM_getValue('posTBPercent', 0)) + (5 * -spotoutPositionTop)));
				break;
		}
		window.history.back();
	}
}
/*********************\
|** Get saved stuff **|
\*********************/
var techLevelEnergy = GM_getValue('techLevelEnergy', 0);
/***********************\
|** Create output div **|
\***********************/
var spotout = false;
function createOutputDiv() {
	var spotstyle = "position:fixed;"+spotoutPosition+";max-width:15%;";
	spotout = document.createElement("div");
	var map = document.createElement("map");
	map.name = "compass";
	var mapLeft=document.createElement("area");var mapRight=document.createElement("area");var mapUp=document.createElement("area");var mapDown=document.createElement("area");
	var mapTopLeft=document.createElement("area");var mapTopRight=document.createElement("area");var mapBottomLeft=document.createElement("area");var mapBottomRight=document.createElement("area");
	mapLeft.setAttribute('title', 'Move Left');mapRight.setAttribute('title', 'Move Right');mapUp.setAttribute('title', 'Move Up');mapDown.setAttribute('title', 'Move Down');
	mapTopLeft.setAttribute('title', 'Move to Top Left');mapTopRight.setAttribute('title', 'Move to Top Right');mapBottomLeft.setAttribute('title', 'Move to Bottom Left');mapBottomRight.setAttribute('title', 'Move to Bottom Right');
	mapLeft.setAttribute('shape', 'rect');mapRight.setAttribute('shape', 'rect');mapUp.setAttribute('shape', 'rect');mapDown.setAttribute('shape', 'rect');
	mapTopLeft.setAttribute('shape', 'poly');mapTopRight.setAttribute('shape', 'poly');mapBottomLeft.setAttribute('shape', 'poly');mapBottomRight.setAttribute('shape', 'poly');
	mapLeft.setAttribute('coords', "6,17,15,30");mapRight.setAttribute('coords', "32,17,41,30");mapUp.setAttribute('coords', "17,6,30,15");mapDown.setAttribute('coords', "17,32,30,41");
	mapTopLeft.setAttribute('coords', "2,2,21,2,21,5,5,21,2,21");mapTopRight.setAttribute('coords', "26,2,45,2,45,21,21,41,26,5");mapBottomRight.setAttribute('coords', "2,45,21,45,21,42,5,26,2,26");mapBottomLeft.setAttribute('coords', "26,45,26,42,42,26,45,26,45,45");
	mapLeft.setAttribute('href', "http://aespot.com/pos?l");mapRight.setAttribute('href', "http://aespot.com/pos?r");mapUp.setAttribute('href', "http://aespot.com/pos?u");mapDown.setAttribute('href', "http://aespot.com/pos?d");
	mapTopLeft.setAttribute('href', "http://aespot.com/pos?tl");mapTopRight.setAttribute('href', "http://aespot.com/pos?tr");mapBottomRight.setAttribute('href', "http://aespot.com/pos?bl");mapBottomLeft.setAttribute('href', "http://aespot.com/pos?br");
	map.appendChild(mapLeft);map.appendChild(mapRight);map.appendChild(mapUp);map.appendChild(mapDown);
	map.appendChild(mapTopLeft);map.appendChild(mapTopRight);map.appendChild(mapBottomLeft);map.appendChild(mapBottomRight);
	var compass = document.createElement("img");
	compass.src="http://aespot.com/img/compass.png";
	compass.setAttribute('usemap', '#compass');
	compass.setAttribute('height', '48');
	compass.setAttribute('width', '48');
	spotout.appendChild(map);
	spotout.appendChild(compass);
	spotout.appendChild(document.createElement("br"));
	var spotoptions = document.createElement("small");
	var spotoptionsLink = document.createElement("a");
	spotoptionsLink.setAttribute('href', 'http://aespot.com/options');
	spotoptionsLink.setAttribute('target', '_blank');
	spotoptionsLink.innerHTML = 'Options';
	spotoptions.appendChild(spotoptionsLink);
	spotout.appendChild(spotoptions);
	spotout.appendChild(document.createElement("br"));
	spotout.id='spotout';
	spotout.setAttribute('style', spotstyle);
	document.body.insertBefore(spotout,document.body.firstChild);
}
/***********************\
|** Check for updates **|
\***********************/
var version='0.92';
if (!checkRecord('update', 1)) {
	GM_xmlhttpRequest({method:"POST",url:"http://aespot.com/version",headers:{"Content-Type":"application/x-www-form-urlencoded","X-Requested-With":"XMLHttpRequest"},data:'version='+version,onload:function(responseDetails){spotout.innerHTML+=responseDetails.responseText;if(!responseDetails.responseText){updateRecord('update');}}});
}
/************************\
|** Check time records **|
\************************/
function checkRecord(type, intervalDays) {
	var lastRecord = GM_getValue(type+'Record', false);
	var currentRecord = new Date();
	if (lastRecord == false) {
		return false;
	} else {
		lastRecord = new Date(Date.parse(lastRecord));
		if (currentRecord.getTime() - (intervalDays * dateDay) > lastRecord.getTime()) {
			return false;
		}
	}
	return true;
}
function updateRecord(type) {
	var currentRecord = new Date();
	GM_setValue(type+'Record', currentRecord.toUTCString());
}
function requestRecordUpdate(type) {
	switch (type) {
		case 'bases':		return '<a href="base.aspx">Bases not updated in 7 days.</a><br />';
		case 'commanders':	return '<a href="commander.aspx">Commanders not updated in 7 days.</a><br />';
		case 'technologies':	return '<a href="empire.aspx?view=technologies">Technologies not updated in three days.</a><br />';
		case 'trade':		return '<a href="empire.aspx?view=trade">Trade routes not updated in three days.</a><br />';
		default:		return '';
	}
}
/****************************\
|** Empire credits summary **|
\****************************/
function summaryIncome(incomeType) {
	var income = 0;
	var nodes = document.evaluate(creditPath.replace(/INCOMETYPE/, incomeType), document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < nodes.snapshotLength; i++) {
		income += Number(nodes.snapshotItem(i).textContent.replace(/[+,.]/g,""));
	}
	return income;
}
function creditSummary() {
	var income = summaryIncome('Empire Income');
	var debris = summaryIncome('Debris collected');
	var pillage = summaryIncome('Pillage of');
	var production = summaryIncome('Production of');
	var productionCancel = summaryIncome('Cancel production');
	var construction = summaryIncome('Construction of');
	var constructionCancel = summaryIncome('Cancel construction');
	var research = summaryIncome('Research of');
	var researchCancel = summaryIncome('Cancel research');
	console.log(research);
	console.log(researchCancel);
	var text = "";
	text += "Empire Income: " + formatNum(income) + "<br />";
	text += "Debris Collected: " + formatNum(debris) + "<br />";
	text += "Pillage: " + formatNum(pillage) + "<br />";
	text += "Production: " + formatNum(production + productionCancel) + "<br />";
	text += "Construction: " + formatNum(construction + constructionCancel) + "<br />";
	text += "Research: " + formatNum(research + researchCancel) + "<br />";
	text += "Total: " + formatNum(income + debris + pillage + production + productionCancel + construction + constructionCancel + research + researchCancel) + "<br />";
	return text;
}
/************************************************\
|** Read trade routes and highlight duplicates **|
\************************************************/
function readTrades() {
	var curName, curCount, dupes;
	var tradeList = [];
	var nodes = document.evaluate(tradePath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < nodes.snapshotLength; i++) {
		tradeList.push(nodes.snapshotItem(i).textContent);
	}
	for (var i = 0; i < tradeList.length; i++) {
		curCount = tradeList.count(tradeList[i]);
		if (curCount > 1) {
			someVarnull = null;
			dupes = document.evaluate(tradePathNamed.replace(/NAMED/, tradeList[i]), document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			for (var j = 0; j < dupes.snapshotLength; j++) {
				dupes.snapshotItem(j).style.border="thin solid red";
				dupes.snapshotItem(j).style.background="#111111";
				dupes.snapshotItem(j).parentNode.parentNode.style.border="medium dotted orange";
			}
		}
	}
	selfs = document.evaluate("//table[@id='empire_trade_trade-routes']/tbody/tr[2]/td/table/tbody/tr/td[2]/div/table/tbody/tr/td[2]/small[position() = 2 and contains(.,'"+GM_getValue('player', "selftrade")+"')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < selfs.snapshotLength; i++) {
		selfs.snapshotItem(i).style.border="thin solid yellow";
		selfs.snapshotItem(i).style.background="#111111";
		selfs.snapshotItem(i).parentNode.parentNode.style.border="thin dotted gray";
	}
	for (var i = 0; i < tradeList.length; i++) {
		if (tradeList[i].indexOf('] ') != -1) {
			tradeList[i] = tradeList[i].substr(tradeList[i].indexOf('] ') + 2);
		}
	}
	GM_setValue("trades", tradeList.toSource());
}
/*****************************************\
|** Highlight non-unique on trade board **|
\*****************************************/
function boardTrades() {
	var tradeList = eval(GM_getValue("trades", "[]"));
	var curTrade = false;
	var curTrade2 = false;
	var tradeStr = new RegExp();
	for (var i = 0; i < tradeList.length; i++) {
		curTrade = document.evaluate(tradePathBoard.replace(/NAMED/, tradeList[i]), document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var j = 0; j < curTrade.snapshotLength; j++) {
			curTrade.snapshotItem(j).parentNode.style.border="medium dashed red";
		}
		curTrade2 = document.evaluate("//table[@id='board_main']//td[contains(text(),'"+tradeList[i]+"')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		tradeStr.compile('((\\[[^\\]]+\]\\s)?'+tradeList[i]+')');
		for (var j = 0; j < curTrade2.snapshotLength; j++) {
			curTrade2.snapshotItem(j).innerHTML = curTrade2.snapshotItem(j).innerHTML.replace(tradeStr, '<span style="border: medium dashed red;">$1</span>');
		}
	}
}
/*****************************\
|** Calculate factory costs **|
\*****************************/
function countQueue(structure) {
	var count = 0;
	var queue;
	queue = document.evaluate(queuePath.replace(/STRUCTURETYPE/, structure), document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if (queue.snapshotLength > 0) { count += queue.snapshotLength; }
	queue = document.evaluate(structureBuildPath.replace(/STRUCTURETYPE/, structure), document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if (queue.snapshotLength > 0) { count++; }
	return count;
}

function factoryCost() {
	var factories = document.evaluate(structurePath.replace(/STRUCTURETYPE/, "Metal Refineries') or contains(.,'Robotic Factories') or contains(.,'Nanite Factories') or contains(.,'Android Factories")+"/td[position() = 3 and not(text() = ' ')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var metal = document.evaluate("//table[@id='base_structures']//tr[contains(.,'Metal Refineries')]/following-sibling::tr[1]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var shipyards = document.evaluate(structurePath.replace(/STRUCTURETYPE/, "Shipyard') or contains(.,'Orbital Shipyards")+"/td[position() = 3 and not(text() = ' ')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var powerplants = document.evaluate(structurePath.replace(/STRUCTURETYPE/, "Solar Plants') or contains(.,'Gas Plants') or contains(.,'Fusion Plants') or contains(.,'Antimatter Plants")+"/td[position() = 3 and not(text() = ' ')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var solar = document.evaluate(structurePath.replace(/STRUCTURETYPE/, "Solar Plants")+"/td[4]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var gas = document.evaluate(structurePath.replace(/STRUCTURETYPE/, "Gas Plants")+"/td[4]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var land = document.evaluate("//table[@id='base_structures']//tr[contains(.,'Terraform') or contains(.,'Multi-Level Platforms')]/td[position() = 3 and not(text() = ' ')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var population = document.evaluate(structurePath.replace(/STRUCTURETYPE/, "Urban Structures') or contains(.,'Orbital Base') or contains(.,'Biosphere Modification")+"/td[position() = 3 and not(text() = ' ')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var crystalMines = document.evaluate(structurePath.replace(/STRUCTURETYPE/, "Crystal Mines")+"/td[3]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var crystalMinesEconomy = document.evaluate(structurePath.replace(/STRUCTURETYPE/, "Crystal Mines")+"/td[5]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var economicCenters = document.evaluate(structurePath.replace(/STRUCTURETYPE/, "Economic Centers")+"/td[3]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var spaceports = document.evaluate(structurePath.replace(/STRUCTURETYPE/, "Spaceports")+"/td[3]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var fertility = document.evaluate("//td[contains(text(),'increases population')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

	var bases = GM_getValue("bases");
	var commandersConstruction = GM_getValue("commandersConstruction");
	var commanderLevel = 0;
	var commanderRE = new RegExp("([A-H]\\d\\d:\\d\\d:\\d\\d:\\d\\d)::"+window.location.search.match(/base=(\d+)/)[1]+"+");
	if (bases.match(commanderRE)) { commanderRE.compile(bases.match(commanderRE)[1]+"::(\\d+)"); }
	if (commandersConstruction.match(commanderRE)) { commanderLevel = commandersConstruction.match(commanderRE)[1]; }
	var queued;

	var landNames = ['Terraform', 'Multi-Level Platforms'];
	var landCapacities = [5, 10];
	var landCosts = [];
	for (var i = 0; i < land.snapshotLength; i++) {
		if (land.snapshotItem(i).textContent.match(/[\d.,]+/) != null) {
			landCosts[i] = Number(land.snapshotItem(i).textContent.match(/[\d.,]+/)[0].replace(/[,.]/g, ''));
			queued = countQueue(landNames[i]);
			if (queued > 0) {
				var landLevel;
				var land = document.evaluate(structureLevelPath.replace(/STRUCTURETYPE/, landNames[i]), document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				if (land.snapshotLength) { landLevel = land.snapshotItem(0).textContent.match(/[\d]+/); }
				if (landLevel) { landLevel = Number(landLevel[0]); } else { landLevel = 0; }
				landCosts[i] = getCost(landNames[i], landLevel+queued+1, commanderLevel);
			}
		}
	}
	var landCPC = [];
	for (var i = 0; i < landCosts.length; i++) {
		landCPC.push(Math.ceil(landCosts[i] / landCapacities[i]));
	}
	var landCost = landCPC.min()[0];

	var powerplantNames = [];
	var powerplantCapacities = [];
	if (solar.snapshotLength > 0) {
		powerplantNames.push('Solar Plants');
		Number(powerplantCapacities.push(solar.snapshotItem(0).textContent.match(/\d/)[0]));
	}
	if (gas.snapshotLength > 0) {
		powerplantNames.push('Gas Plants');
		Number(powerplantCapacities.push(gas.snapshotItem(0).textContent.match(/\d/)[0]));
	}
	powerplantNames.push('Fusion Plants');
	powerplantCapacities.push(4);
	powerplantNames.push('Antimatter Plants');
	powerplantCapacities.push(10);
	var powerplantCosts = [];
	for (var i = 0; i < powerplants.snapshotLength; i++) {
		if (powerplants.snapshotItem(i).textContent.match(/[\d.,]+/) !== null) {
			powerplantCapacities[i] *= (1 + (techLevelEnergy * 0.05));
			powerplantCosts[i] = Number(powerplants.snapshotItem(i).textContent.match(/[\d.,]+/)[0].replace(/[,.]/g, ''));
			queued = countQueue(powerplantNames[i]);
			if (queued > 0) {
				var powerLevel;
				var power = document.evaluate(structureLevelPath.replace(/STRUCTURETYPE/, powerplantNames[i]), document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				if (power.snapshotLength) { powerLevel = power.snapshotItem(0).textContent.match(/[\d]+/); }
				if (powerLevel) { powerLevel = Number(powerLevel[0]); } else { powerLevel = 0; }
				powerplantCosts[i] = getCost(powerplantNames[i], powerLevel+queued+1, commanderLevel);
			}
			powerplantCosts[i] += landCost;
		}
	}
	var powerplantCPC = [];
	for (var i = 0; i < powerplantCosts.length; i++) {
		powerplantCPC.push(Math.ceil(powerplantCosts[i] / powerplantCapacities[i]));
	}
	var powerCost = powerplantCPC.min()[0];

	var populationNames = ['Urban Structures', 'Orbital Base', 'Biosphere Modification'];
	urbanLevel = Number(document.evaluate(structureLevelPath.replace(/STRUCTURETYPE/, "Urban Structures"), document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).textContent.match(/[\d]+/)[0]);
	var populationCapacities = [fertility.snapshotItem(0).textContent.match(/[\d]+/)[0], 10, urbanLevel - 1];
	var populationCosts = [];
	for (var i = 0; i < population.snapshotLength; i++) {
		populationCosts[i] = Number(population.snapshotItem(i).textContent.match(/[\d.,]+/)[0].replace(/[,.]/g, ''));
		queued = countQueue(populationNames[i]);
		if (queued > 0) {
			var populationLevel;
			var population = document.evaluate(structureLevelPath.replace(/STRUCTURETYPE/, populationNames[i]), document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			if (population.snapshotLength) { populationLevel = population.snapshotItem(0).textContent.match(/[\d]+/); }
			if (populationLevel) { populationLevel = Number(populationLevel[0]); } else { populationLevel = 0; }
			populationCosts[i] = getCost(populationNames[i], populationLevel+queued+1, commanderLevel);
		}
	}
	populationCosts[0] += landCost;
	if (populationCosts.length > 2) {
		populationCosts[2] += landCost;
		populationCosts[2] += (powerCost * 24);
	}
	var populationCPC = [];
	for (var i = 0; i < populationCosts.length; i++) {
		populationCPC.push(Math.ceil(populationCosts[i] / populationCapacities[i]));
	}

	var factoryNames = ['Metal Refineries', 'Robotic Factories', 'Nanite Factories', 'Android Factories'];
	var factoryCapacities = [metal.snapshotItem(0).textContent.match(/[1-3]/)[0], 2, 4, 6];
	var factoryEconomies = [1, 1, 2, 2];
	var factoryCosts = [];
	for (var i = 0; i < factories.snapshotLength; i++) {
		factoryCosts[i] = Number(factories.snapshotItem(i).textContent.match(/[\d.,]+/)[0].replace(/[,.]/g, ''));
		queued = countQueue(factoryNames[i]);
		if (queued > 0) {
			var factoryLevel;
			var factory = document.evaluate(structureLevelPath.replace(/STRUCTURETYPE/, factoryNames[i]), document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			if (factory.snapshotLength) { factoryLevel = factory.snapshotItem(0).textContent.match(/[\d]+/); }
			if (factoryLevel) { factoryLevel = Number(factoryLevel[0]); } else { factoryLevel = 0; }
			factoryCosts[i] = getCost(factoryNames[i], factoryLevel+queued+1, commanderLevel);
		}
		factoryCosts[i] += landCost;
		factoryCosts[i] += powerCost;
		if (i == 2) { factoryCosts[i] += powerCost; }
		if (i == 3) { factoryCosts[i] += 3 * powerCost; }
	}
	var factoryCPC = [];
	var factoryEPC = [];
	for (var i = 0; i < factoryCosts.length; i++) {
		factoryCPC.push(Math.ceil(factoryCosts[i] / factoryCapacities[i]));
		factoryEPC.push(Math.ceil(factoryCosts[i] / factoryEconomies[i]));
	}

	var shipyardNames = ['Shipyards', 'Orbital Shipyards'];
	var shipyardCapacities = [2, 8];
	var shipyardEconomies = [1, 2];
	var shipyardCosts = [];
	for (var i = 0; i < shipyards.snapshotLength; i++) {
		shipyardCosts[i] = Number(shipyards.snapshotItem(i).textContent.match(/[\d.,]+/)[0].replace(/[,.]/g, ''));
		queued = countQueue(shipyardNames[i]);
		if (queued > 0) {
			var shipyardLevel;
			var shipyard = document.evaluate(structureLevelPath.replace(/STRUCTURETYPE/, shipyardNames[i]), document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			if (shipyard.snapshotLength) { shipyardLevel = shipyard.snapshotItem(0).textContent.match(/[\d]+/); }
			if (shipyardLevel) { shipyardLevel = Number(shipyardLevel[0]); } else { shipyardLevel = 0; }
			shipyardCosts[i] = getCost(shipyardNames[i], shipyardLevel+queued+1, commanderLevel);
		}

		shipyardCosts[i] += powerCost;
		if (i == 1) { shipyardCosts[i] += 11 * powerCost; }
	}
	shipyardCosts[0] += landCost;
	var shipyardCPC = [];
	var shipyardEPC = [];
	for (var i = 0; i < shipyardCosts.length; i++) {
		shipyardCPC.push(Math.ceil(shipyardCosts[i] / shipyardCapacities[i]));
		shipyardEPC.push(Math.ceil(shipyardCosts[i] / shipyardEconomies[i]));
	}
	shipyardNames.concat(factoryNames);
	shipyardCPC.concat(factoryCPC);
	shipyardEPC.concat(factoryEPC);

	var ecoNames = ['Spaceports', 'Crystal Mines', 'Economic Centers'];
	var ecoCapacities = [2, 0, 3];
	var ecoPower = [1, 1, 2];
	var ecoCosts = [];
	for (var i = 0; i < spaceports.snapshotLength; i++) {
		if (spaceports.snapshotItem(i).textContent.match(/[\d.,]+/) != null) {
			ecoCosts[0] = Number(spaceports.snapshotItem(i).textContent.match(/[\d.,]+/)[0].replace(/[,.]/g, ''));
		}
	}
	for (var i = 0; i < crystalMines.snapshotLength; i++) {
		if (crystalMines.snapshotItem(i).textContent.match(/[\d.,]+/) != null) {
			ecoCosts[1] = Number(crystalMines.snapshotItem(i).textContent.match(/\d/)[0].replace(/[,.]/g, ''));
		}
	}
	for (var i = 0; i < crystalMinesEconomy.snapshotLength; i++) {
		if (crystalMinesEconomy.snapshotItem(i).textContent.match(/\d/) != null) {
			ecoCapacities[1] = Number(crystalMinesEconomy.snapshotItem(i).textContent.match(/\d/)[0]);
		}
	}
	for (var i = 0; i < economicCenters.snapshotLength; i++) {
		if (economicCenters.snapshotItem(i).textContent.match(/[\d.,]+/) != null) {
			ecoCosts[2] = Number(economicCenters.snapshotItem(i).textContent.match(/[\d.,]+/)[0].replace(/[,.]/g, ''));
		}
	}
	var ecoEPC = [];
	for (var i = 0; i < ecoCosts.length; i++) {
		queued = countQueue(ecoNames[i]);
		if (queued > 0) {
			var ecoLevel;
			var eco = document.evaluate(structureLevelPath.replace(/STRUCTURETYPE/, ecoNames[i]), document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			if (eco.snapshotLength) { ecoLevel = eco.snapshotItem(0).textContent.match(/[\d]+/); }
			if (ecoLevel) { ecoLevel = Number(ecoLevel[0]); } else { ecoLevel = 0; }
			ecoCosts[i] = getCost(ecoNames[i], ecoLevel+queued+1, commanderLevel);
		}

		ecoCosts[i] += landCost;
		ecoCosts[i] += powerCost * ecoPower[i];
		ecoEPC[i] = Math.ceil(ecoCosts[i] / ecoCapacities[i]);
	}
	ecoNames.concat(shipyardNames);
	ecoEPC.concat(shipyardEPC);

	spotout.innerHTML += "Lowest Cost per Unit<br />";
	spotout.innerHTML += "Cons.: " + factoryNames[factoryCPC.min()[1]] + "<br />";
	spotout.innerHTML += "Econ.: " + ecoNames[ecoEPC.min()[1]] + "<br />";
	spotout.innerHTML += "Land: " + landNames[landCPC.min()[1]] + "<br />";
	spotout.innerHTML += "Prod.: " + shipyardNames[shipyardCPC.min()[1]] + "<br />";
	spotout.innerHTML += "Power: " + powerplantNames[powerplantCPC.min()[1]] + "<br />";
	spotout.innerHTML += "Popu.: " + populationNames[populationCPC.min()[1]] + "<br />";
	//if (debug) {
		console.log(landNames,landCosts,populationNames,populationCosts,powerplantNames,powerplantCosts,factoryNames,factoryCosts,shipyardNames,shipyardCosts,ecoNames,ecoCosts);
	//}
}
/**********************\
|** Get technologies **|
\**********************/
function getTechs() {
	var techEnergy = document.evaluate(techPathEnergy, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if (techEnergy.snapshotLength > 0) { GM_setValue('techLevelEnergy', techEnergy.snapshotItem(0).textContent); }
}
/********************\
|** Get commanders **|
\********************/
function getCommanders() {
	var commanderLocations = document.evaluate(commanderLocationPath.replace(/COMMANDERTYPE/, "Construction"), document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var commanderLevels = document.evaluate(commanderPath.replace(/COMMANDERTYPE/, "Construction"), document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var commanders = "";
	for (var i = 0; i < commanderLocations.snapshotLength; i++) {
		commanders += commanderLocations.snapshotItem(i).textContent.slice(1,-1) + "::";
		commanders += commanderLevels.snapshotItem(i).textContent.match(/[\d]+/)[0] + "+";
	}
	GM_setValue('commandersConstruction', commanders);
}
/***************\
|** Get bases **|
\***************/
function getBases() {
	var baseLocations = document.evaluate(baseLocationPath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var baseIds = document.evaluate(baseIdPath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var bases = "";
	for (var i = 0; i < baseLocations.snapshotLength; i++) {
		bases += baseLocations.snapshotItem(i).href.match(/=.+/)[0].slice(1) + "::";
		bases += baseIds.snapshotItem(i).href.match(/=.+/)[0].slice(1) + "+";
	}
	GM_setValue('bases', bases);
}
/*****************\
|** Empire Menu **|
\*****************/
function getEmpireMenu() {
	var empireMenuNode = document.evaluate(empireMenu, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var menuDiv = document.createElement('div');
	menuDiv.appendChild(empireMenuNode.snapshotItem(0).cloneNode(true));
	menuDiv.innerHTML = menuDiv.innerHTML.replace(/\sid="[^"]+"/g, "").replace(/-active/g, "").replace(/table class="button[^>]+/g, "table class=\"button button-normal\" onmouseout=\"buttonOut(this)\" onmouseover=\"buttonOver(this, 'button button-normal-over')\"");
	GM_setValue('empireMenu', menuDiv.innerHTML);
}
function insertEmpireMenu() {
	var empireMenuAfterNode = document.evaluate(empireMenuAfter, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var menuDiv = document.createElement('div');
	menuDiv.innerHTML = GM_getValue('empireMenu', '');
	empireMenuAfterNode.snapshotItem(0).parentNode.insertBefore(menuDiv, empireMenuAfterNode.snapshotItem(0));
}
/**********************\
|** Parse and Output **|
\**********************/
if (window.location.pathname.match(/base/) && window.location.search == "") {
	getBases();
	updateRecord('bases');
}
if (window.location.pathname.match(/base/) && window.location.search.match(/structures/)) {
	if (!spotout) { createOutputDiv(); }
	factoryCost();
}
if (window.location.pathname.match(/board/) && window.location.search.match(/folder=3/)) {
	boardTrades();
}
if (window.location.pathname.match(/commander/)) {
	getCommanders();
	updateRecord('commanders');
}
if (window.location.pathname.match(/credits/)) {
	if (!spotout) { createOutputDiv(); }
	spotout.innerHTML += creditSummary();
}
if (window.location.pathname.match(/empire/)) {
	if (window.location.search.match(/technologies/)) {
		getTechs();
		updateRecord('technologies');
	}
	if (window.location.search.match(/trade/)) {
		readTrades();
		updateRecord('trade');
	}
	if (!checkRecord('bases', 7)) {
		if (!spotout) { createOutputDiv(); }
		spotout.innerHTML += requestRecordUpdate('bases');
	}
	if (!checkRecord('commanders', 7)) {
		if (!spotout) { createOutputDiv(); }
		spotout.innerHTML += requestRecordUpdate('commanders');
	}
	if (!checkRecord('trade', 3)) {
		if (!spotout) { createOutputDiv(); }
		spotout.innerHTML += requestRecordUpdate('trade');
	}
	if (!checkRecord('technologies', 7)) {
		if (!spotout) { createOutputDiv(); }
		spotout.innerHTML += requestRecordUpdate('technologies');
	}
	if (window.location.search == '')
	{
		getEmpireMenu();
	}
} else if (!window.location.pathname.match(/empire/)) { insertEmpireMenu(); }
