// ==UserScript==
// @name		evo+
// @version		5.01
// @hotfix		06142008
// @namespace		http://wildservices.net/userscripts
// @description		Release 5.0.1
// @include		http://playevo.com/*
// @author		~ravenlord~ (r4v3n10rd@gmail.com) - original 1.0x source
// @author		HETMAN (kanarinios@gmail.com) - upgrades
// @author		mindfox & Fire - upgrades
// @author		MadFrog (mbfrog@gmail.com)
// @author		Roland
// @author		WhyteWolf (whytewolf1@gmail.com)
// @author		Gavry
// @author		Ressol
// @author		Pinky
// @author		Toby-Jug
// @author		Chief Trajan
// @author		HACKhalo2 (hackhalotwo@gmail.com)
// @author		SpacePhoenix_
// ==/UserScript==

/* Evo+ 5 Update/Hotfix Log
 * Release 5.0.1
 	* Fixed Major page issues
 	* Added LSM and Resources tweaks
 	* Minor changes to script layout
 * HotFix 06142008 (HACKhalo2)
  * Added in Autoupdate (Version 2.0) script
  * Fixed Overview Page Bugs
  * Removed old CreHack Reference
 * HotFix 06062008 (SpacePhoenix)
  * Fixed the Double Creature Stats Bug
 * Release 5.0.0
  * Updated to work with new layout (Pinky)
  * Food Fixed on Overview Page (Dawn)
  * Updated to Include Guerrillas, Spys, and Superstealthwalls (Dawn)
*/


// ***************************************************************************
// ** Global Variables
// ***************************************************************************

const scriptversion = '5';
const scriptversionID = 'Evo+ ' + scriptversion;
const scriptTag = 'Version 5.0.1';
GM_log(scriptversionID + " start");

//ALP 1.1
var flag1 = false;
var flag2 = false;
var flag3 = false;
var fleetschecked;
var num;

//AutoUpdate
const AUVersion = '2.0'; //GM Script Version
const scriptVersion = "5.01"; //True Script Version
var upToDate = false;

// xscript data sharing
unsafeWindow.evo_plus = new Array();

// page handlers
var pageHandlers = new Array();

var units = new Object(); // units :P
var contents = null; // pointer to the 'content' node in the page

// boosts
const UT_NONE		= 0;
const UT_NATURAL	= 1;
const UT_ENG		= 2;

// max possible boosts
var maxBoosts = new Array();
maxBoosts[UT_NONE]	= 0;
maxBoosts[UT_NATURAL]	= 0.3946625;  //max boost for natural
maxBoosts[UT_ENG]	= 0.33126875; //max boost for eng
unsafeWindow.evo_plus['maxBoosts'] = maxBoosts;

// defense multiplier
var defenseMultiplier = 1.4;

// defender's boost
var defendersBoost = 1.44;

// intrinsic land defense
var landDefense = 80;

// mimimum score ratio fo attacks
var minAttack = 0.35;

// user current boosts
var boosts = new Array();
boosts[UT_NONE]    = 0;
boosts[UT_NATURAL] = Number(GM_getValue('boostNat', maxBoosts[UT_NATURAL]));
boosts[UT_ENG]     = Number(GM_getValue('boostEng', maxBoosts[UT_ENG]));
unsafeWindow.evo_plus['boosts'] = boosts;

var pMetal = 0, pMineral = 0, pFood = 0; //player's resources
var pRank = null, pScore = null; // player's ranking and score
var eeb = Number(GM_getValue('eeb', 1)); // efficient breeding center ratio

var dEvo = /^http:\/\/evo-dev\./.test(document.location.href);

//
// ***************************************************************************
// ** Page handlers
// ***************************************************************************
//
//Auto-Update
regPageHandler(null,  evoAutoUpdate);
function evoAutoUpdate() //Version 2.0
{
		upToDate = false;
		GM_log("Checking for Updates...");
		GM_xmlhttpRequest(
		{
			method: 'GET',
			url: 'http://userscripts.org/scripts/review/27823?format=txt', //TXT page
			onload: function(responseDetails)
			{
				if (!responseDetails.responseText.match(/@version\s+([\d.]+)/)) 
				{ upToDate = true; }
				var theOtherVersion = parseFloat(RegExp.$1);
				if (theOtherVersion <= parseFloat(scriptVersion))
				{ upToDate = true; }
				if (upToDate)
				{ GM_log("Up to Date"); }
				else
				{ if (confirm("Evo+ "+theOtherVersion+" is available, click OK to update now."))
// time to update !
				  {
					GM_openInTab('http://userscripts.org/scripts/source/27823.user.js'); //JS Page
					GM_log("Update Sucessful");
				  }
				  else{ GM_log("Update Cancled by User"); }
				}
			}
		});
}
// Add stuff to the scans and create pages
regPageHandler(/^\/create/i, function () { evoTable(1); evoTable(2); evoTable(3); });
regPageHandler(/^\/create/i, evoCreateRatio );
regPageHandler(/^\/scans/i,  function () { evoTable(1); });
// Handle to add Ratios to each non-creature Item
function evoCreateRatio() {
	var scantable = document.evaluate("id('content')/table[starts-with(.,'Order Defence Systems')]", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	if (scantable){ /*
		var land = document.getElementById( 'panelinfo' ).textContent.match( /Land:\s([,?\d]+)/ );
		var curAmps = evoString2Number( scantable.rows[3].cells[2].textContent );
		var curLand = evoString2Number( land[1] );
		var ratio = Math.round(( curAmps / curLand ) * 1000 ) / 1000;
		if (ratio >= 5)
		{ scantable.rows[3].cells[2].innerHTML = scantable.rows[3].cells[2].innerHTML + '<br /><span style="text-size: 0.8em;color: greenyellow">'+ratio+'</span>'; }
		else
		{ scantable.rows[3].cells[2].innerHTML = scantable.rows[3].cells[2].innerHTML + '<br /><span style="text-size: 0.8em;color: orange">'+ratio+'</span>'; }
*/	}
}
// handle each creation table
function evoTable(tableID) {
	//
	// event handlers
	//
	// refreshes the max numbers when click on "max" or form field change
	function evoUpdateAvailableUnits(table) {
		var tmpMetal = pMetal;
		var tmpMineral = pMineral;
		var rows = table.rows;
		var row, unit, unitsToOrder, maxUnitsAvailable, span;

		// keep data between the two passes
		var createDataArray = new Array();
		function createData(unit, unitsToOrder, isTooMuch) {
			this.unit = unit;
			this.unitsToOrder = unitsToOrder;
			this.isTooMuch = isTooMuch;
		}

		// first pass
		//	- gather all necessary data for second pass
		//	- adjust metal/mineral amount
		for(var i = 2; i < (rows.length - 1); i++) {
			row = rows[i];
			unit = row.cells[1].getElementsByTagName('SPAN')[0].textContent.toLowerCase();
			unit = units[unit];

			unitsToOrder = Number(row.cells[3].getElementsByTagName('INPUT')[0].value);
			if( isNaN(unitsToOrder) ) unitsToOrder = 0;
			createDataArray[i] = new createData(unit, unitsToOrder, unitsToOrder > unit.getMaxUnits(tmpMetal, tmpMineral));

			if(! createDataArray[i].isTooMuch ) {
				tmpMetal = Math.max(tmpMetal - unitsToOrder * unit.getMetal(), 0);
				tmpMineral = Math.max(tmpMineral - unitsToOrder * unit.getMineral(), 0);
			}
		}
		// second pass
		//	- ui logic
		for(var i = 2; i < (rows.length - 1); i++) {
			row = rows[i];
			maxUnitsAvailable = createDataArray[i].unit.getMaxUnits(tmpMetal, tmpMineral);
			span = row.cells[3].getElementsByTagName('SPAN')[0];
			// have to replace the data of the child text node
			// span.textContent = html would recreate the child text node and cancel the onclick event
			span.firstChild.data = 'max: ' + String(createDataArray[i].isTooMuch ? maxUnitsAvailable : (maxUnitsAvailable + createDataArray[i].unitsToOrder));
			span.style.color = createDataArray[i].isTooMuch ? 'coral' : 'palegoldenrod';
		}
	}
	var onBlur = function() { evoUpdateAvailableUnits(table); };
	var onClick = function(e) {
		if( e.target.tagName.toLowerCase() == 'input' ) return;
		this.getElementsByTagName('input')[0].value = /max: (\d+)/m.exec(this.textContent)[1];
		evoUpdateAvailableUnits(table);
	};

	//
	// Helper functions
	//
	function addHeader(cellIndex, label) {
		var cell = table.rows[0].insertCell(cellIndex);
		cell.innerHTML = label;
		cell.align = "center"; cell.vAlign = "bottom"; cell.width = "60px";
		cell = table.rows[1].insertCell(cellIndex); cell.className = "alt1";
	}
	function addStat(row, cellIndex, base, square, value, boost) {
		var cell = row.insertCell(cellIndex);
		cell.className = row.cells[1].className; cell.align = "center";
		cell.innerHTML = '<span title="Unboosted: ' + base + '">' + ( base * boost ).toFixed(1)+ '</span><br /><span class="t_enormous" title="Unboosted: ' + square + '">' + (square*boost*boost).toFixed(0)+ '</span><br /><span title="Unboosted: ' + evoNumber2String(value) + '">' + evoNumber2String((value*boost*boost).toFixed(0)) + '</span>';
	}
	//
	// main
	//
	
	var unit, cell, unitCost, row;
	var table = null;
	var isScanPage = document.location.pathname == '/scans';
	var xPathTerm = ".//div";
	if( isScanPage) 
		xPathTerm = xPathTerm+ "[3]/following-sibling::table[1]";
	else 
		xPathTerm = xPathTerm + "["+tableID+"]/following-sibling::table[1]";
	table = document.evaluate(xPathTerm, document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	if(table == null) return;
	var showstats = !isScanPage && (tableID == 1);

	// Efficient breeding center?
	if( showstats && tableID == 1 ) {
		var monkey =  document.evaluate(".//tbody/tr/td[2][./a/span[@class='b' and text()='Monkey']]/text()", table, null, XPathResult.STRING_TYPE, null).stringValue;
		if( monkey ) {
			var match = /(\d+) metal, (\d+) mineral each\./.exec(monkey);
			if( match ) {
				eeb = parseInt(match[1]) / units['monkey'].metal;
				GM_setValue('eeb', String(eeb));
			}
		}
	}

	// add creatures/items stats
	if( showstats ) {
		// column headers
		addHeader(4, 'Attack/<br /><strong>Attack<sup>2</sup></strong>/<br /><span title="Attack per 100,000 resources (metal + mineral)">per 100K</span>');
		addHeader(5, 'Defense/<br /><strong>Defense<sup>2</sup></strong>/<br /><span title="Defense per 100,000 resources (metal + mineral)">per 100K</span>');
		addHeader(6, 'Total/<br /><strong>Total<sup>2</sup></strong>/<br /><span title="Attack + Defense per 100,000 resources (metal + mineral)">per 100K</span>');
	}

	// display stats for each item
	for( var i = 2; i < (table.rows.length - 1); i++ ) {
		row = table.rows[i];
		if( showstats ) {
			unit = (row.cells[1].getElementsByTagName('SPAN'))[0].textContent.toLowerCase();
			unit = units[unit];
			unitCost = unit.getMetal() + unit.getMineral();
			var att2 = unit.getAttackScore(1);
			var def2 = unit.getDefenseScore(1);
			var average = att2 + def2;
			var boost = 1 + unit.getBoost();
			addStat(row, 4, unit.attack,  att2, Math.round(att2*100000/unitCost), boost);
			addStat(row, 5, unit.defense, def2, Math.round(def2*100000/unitCost), boost);
			addStat(row, 6, (unit.defense + unit.attack), average, Math.round(average*100000/unitCost), boost);
		}
		// new UI
		cell = document.createElement('SPAN');
		cell.style.display = "block";
		row.cells[3].style.cursor = "pointer";
		cell.textContent = ' '; // forces the creation of a text node
		row.cells[3].appendChild(cell);
		// update hook
		row.cells[3].getElementsByTagName('INPUT')[0].addEventListener('blur', onBlur, false);
		// order max amount hook
		row.cells[3].addEventListener('click', onClick, false);
	}

	// hook up a confirmation dialog on the form
	var youSure = function(e)
		{
			if(! confirm('Are you sure you want to produce these items/creatures?'))
				e.preventDefault();
		}
	var daForm = table.getElementsByTagName('FORM')[0];
	daForm.addEventListener('submit', youSure, false);

	evoUpdateAvailableUnits(table);
}

//
// changes to the overview page
//
regPageHandler(/^\/(overview)?$/i,  evoOverview);
function evoOverview() {
	var tick = dEvo ? 5 : 60;
	var i, ticks, total;
	var node, match;
	var now = new Date(document.lastModified);
	var searchKey = dEvo ? "separator title":"separator title";
	now.setUTCMinutes(now.getUTCMinutes() - now.getUTCMinutes() % tick);

	// let's try to grab the player's coords
	node = document.evaluate(".//span[@class='t_little'][preceding-sibling::span[@class='t_medium b']]", contents, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	if( node != null && (match = node.innerHTML.match(/(\d*?),(\d*?),(\d*?):\w/)) ) {
		GM_setValue(dEvo?'devoCoords':'evoCoords', match[0]);
		unsafeWindow.evo_plus.coords = match[0];
	} else
		GM_log("Unable to find your coordinates :(", 1);

	// look for the fleets status table and show the ETA
	node = document.evaluate('.//div[@class="' + searchKey + '"]/following-sibling::div[1]/table[contains(., "Heading")]', contents, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	if( node ) {
		node.rows[0].cells[3].textContent = 'Ticks';
		node.rows[0].insertCell(4);
		node.rows[0].cells[4].textContent = 'ETA';
		// let's parse the ETAs...
		for(i = 1; i < node.rows.length; i++) {
			if( node.rows[i].cells.length == 4 ) {
				node.rows[i].insertCell(4);
				if(! isNaN(ticks = parseInt(node.rows[i].cells[3].textContent)) ) {
					var eta = new Date(now.valueOf() + (ticks * tick * 60000));
					node.rows[i].cells[4].textContent = evoFormatNumberZ(eta.getUTCHours(),2) + ":" + evoFormatNumberZ(eta.getUTCMinutes(),2) + " GMT";
				}
			}
		}
	}

	// Same for the R&D
	var nodes = document.evaluate(".//div[@id='cdev' or @id='cresearch']/div[2]", contents, null, 

XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if( !dEvo ) {
		for( i = 0; node = nodes.snapshotItem(i); i++ ) {
			node.innerHTML = node.innerHTML.replace(/(\d+)% \((\d+)\/(\d+)\) (\w+\W+)/,
					 function(str, p1, p2, p3, offset, s) {
						var minutes = (Number(p3) - Number(p2)) * tick;
						var eta = new Date(now.valueOf() + (minutes * 60000));
						return p1 + '% (' + p2 + '/' + p3 + ') complete - ETA: ' + evoFormatNumberZ(eta.getUTCHours(),2) + ":" + evoFormatNumberZ(eta.getUTCMinutes(),2) + " GMT" + (minutes > 1440 ? ' (+' + Math.floor(minutes/1440) + ' day' + (minutes >= 2880 ? 's' : '' ) + ')' : '')+ "<";
					 });
		}
	} else {
		for( i = 0; node = nodes.snapshotItem(i); i++ ) {
			node.innerHTML = node.innerHTML.replace(/(\d+)% \((\d+)\/(\d+)\) [\w\W]+<table/,
					 function(str, p1, p2, p3, offset, s) {
						var minutes = (Number(p3) - Number(p2)) * tick;
						var eta = new Date(now.valueOf() + (minutes * 60000));
						return p1 + '% (' + p2 + '/' + p3 + ') complete - ETA: ' + 

evoFormatNumberZ(eta.getUTCHours(),2) + ":" + 
						       evoFormatNumberZ(eta.getUTCMinutes(),2) + " GMT" + 
						       (minutes > 1440 ? ' (+' + Math.floor(minutes/1440) + ' day' + ( 

minutes >= 2880 ? 's' : '' ) + ')' : '')+ "<";
					 });
		}
	}

	// same for the creatures and stuff
	if( !dEvo)
			nodes = document.evaluate(".//div[@class='separator title']/following-sibling::div[@class='alt2 t_little']/table/tbody/tr[count(td)=3]",
			contents, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	else
		nodes = document.evaluate(".//div[@class='separator title']/following-sibling::div[@class='alt2 t_little']/table/tbody/tr[count(td)=3]",
			contents, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for( i = 0; node = nodes.snapshotItem(i); i++ ) {
		// add a column
		node.insertCell(3);
		if( match = /\d+% [\s\S]*,[\s\S]*(\d+)[\s\S]*/.exec(node.cells[2].textContent) ) {
			var eta = new Date(now.valueOf() + (Number(match[1]) * tick * 60000));
			node.cells[3].textContent = evoFormatNumberZ(eta.getUTCHours(),2) + ":" + evoFormatNumberZ(eta.getUTCMinutes(),2) + " GMT";
		}
	}

	// add a link to the continent/planet
	nodes = document.evaluate(".//td[child::span[@class='t_medium b']]", contents, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for( i= 0; node = nodes.snapshotItem(i); i++ )
		node.innerHTML = node.innerHTML.replace(/<span class="t_little".*\((\d+,\d+,\d+)(:\w)?\)<\/span>/i, '<a href="/$1" style="text-decoration:none">$&</a>');

	// attackers - defenders
	if( node = document.evaluate(".//div[@class='alt2 t_little']/center/span[@class='t_little']", contents, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue ) {
		attackers = new Array();
		defenders = new Array();
		var j, first = 24, last = 0;
		nodes = node.getElementsByTagName('font');
		for(i=0; i < 24; i++) attackers[i] = defenders[i] = 0;
		for(i = 0; i < nodes.length; i++ ) {
			if( match = /Incoming (\d+) creatures .* they will be here to (ATTACK|DEFEND) in (\d+) tick/.exec(nodes[i].innerHTML) ) {
				var num = parseInt(match[3]);
				if( match[2] == 'ATTACK' ) {
					for(j = num; j < num + 3; j++) attackers[j] += parseInt(match[1]);
				} else {
					for(j = num; j < num + 6; j++) defenders[j] += parseInt(match[1]);
				}
				if( j > last ) last = j;
				if( num < first ) first = num;
			} else if( match = /(\d+) creatures (DEFENDING|ATTACKING) .* - (\d+) tick/.exec(nodes[i].innerHTML) ) 

{
				var num = match[3];
				if( match[2] == 'ATTACKING' ) {
					for(j = 0; j < num; j++) attackers[j] += parseInt(match[1]);
				} else {
					for(j = 0; j < num; j++) defenders[j] += parseInt(match[1]);
				}
				if( num > last ) last = num;
				first = 0;
			}
		}
		var table = document.createElement('table');
		table.className = 't_little';
		table.cellSpacing = 1;
		var rowT = table.insertRow(table.rows.length);
		var rowA = table.insertRow(table.rows.length);
		var rowD = table.insertRow(table.rows.length);
		var cell;
		rowT.innerHTML = "<td class=\"row1 b\">Tick</td>";
		rowA.innerHTML = "<td class=\"row1 b\">Attackers</td>";
		rowD.innerHTML = "<td class=\"row1 b\">Defenders</td>";
		for( i = first; i < last; i++ ) {
			(cell = rowT.insertCell(rowT.cells.length)).textContent = i; cell.style.textAlign = "center"; cell.style.padding = "0 2px 0 2px";
			(cell = rowA.insertCell(rowA.cells.length)).textContent = attackers[i]; cell.style.textAlign = "center"; cell.style.padding = "0 2px 0 2px";
			(cell = rowD.insertCell(rowD.cells.length)).textContent = defenders[i]; cell.style.textAlign = "center"; cell.style.padding = "0 2px 0 2px";
		}
		node.parentNode.insertBefore(table, node.nextSibling);
	}

	//
	// Unallocated land percentage
	//

	var landtable = document.evaluate("id('cland')/div/table", contents, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	var alloc = evoString2Number(landtable.rows[1].cells[1].textContent)+evoString2Number(landtable.rows[2].cells[0].textContent)+evoString2Number(landtable.rows[2].cells[1].textContent);
	var l_min = evoString2Number(landtable.rows[2].cells[1].textContent);
	var l_food = evoString2Number(landtable.rows[1].cells[1].textContent);
	var l_met = evoString2Number(landtable.rows[2].cells[0].textContent);
	var total = alloc+ evoString2Number(landtable.rows[1].cells[0].textContent);
	var metal_per_alloc = Math.round(l_met*100/alloc);
	var mineral_per_alloc = Math.round(l_min*100/alloc);
	var food_per_alloc = Math.round(l_food*100/alloc);
	var per = Math.round(( total - alloc ) * 100 / total );
	var stMet = "<td style=\"background: #1598FD; height: "+Math.round(50-per*0.5)+"px ;width: "+Math.round(metal_per_alloc*0.5)+"px;\"></td>";
	var stMin = "<td style=\"background: #29D900; height: "+Math.round(50-per*0.5)+"px ;width: "+Math.round(mineral_per_alloc*0.5)+"px;\"></td>";
	var stFood = "<td style=\"background: #FD9315; height: "+Math.round(50-per*0.5)+"px ;width: "+Math.round(food_per_alloc*0.5)+"px;\"></td>";
	landtable.rows[0].cells[1].innerHTML = "<center><div style=\"border: 1px solid rgb(201, 201, 201); float: top; width: 50px; height: 50px;\"><table style=\"background: #C9C9C9; height: "+per+"%; width: 50px;\" cellpadding=\"0\" cellspacing=\"0\"><tbody><tr style=\"height : "+Math.round(per*0.5)+"px;\"><td></td></tr><tr>"+stMet+stMin+stFood+"</tr></tbody></table></div></center>";
	var elm = document.createElement('DIV');
	elm.className = 'separator title';
	elm.innerHTML = 'You currently have ' + per + '% Unallocated Land'; 
	landtable.parentNode.appendChild(elm);
	
	//
	// Fleet table
	//
	var cfleettable = document.evaluate("id('ccreat')/div/table", contents, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	if (cfleettable != null){
		var lfcost = 0, lfpercent = 0;
		for( i = 0; i < cfleettable.rows.length; i++ ) {
			unit = cfleettable.rows[i].cells[0].innerHTML.toLowerCase();
			if( unit != '' ) lfcost = lfcost + evoString2Number(cfleettable.rows[i].cells[1].textContent) * ( (units[unit].metal + units[unit].mineral ) / 100 );
			if( cfleettable.rows[i].cells.length > 2 ) {
				unit = cfleettable.rows[i].cells[2].innerHTML.toLowerCase();
				if( unit != '' ) lfcost = lfcost + evoString2Number(cfleettable.rows[i].cells[3].textContent) * ( (units[unit].metal + units[unit].mineral ) / 100 );
			}
		}
		if(GM_getValue('evo_SE',"no") == "yes") lfcost = lfcost * 0.95;
		var f1 = evoString2Number( cfleettable.rows[0].cells[1].textContent );
		var conc;
		var firstline = document.createElement('DIV');
		var midline = document.createElement('DIV');
		var lastline = document.createElement('DIV');
		var cfp = 24 * ( 500 + l_food * 100 );
		var dif = Math.round( ( lfcost - cfp ) / 4800 + 0.5 );
		var launchratio = 0;
		if( lfcost != 0 ) lfpercent = Math.round(( cfp / lfcost ) * 100 );
		if( dif > 0 )
		{ conc = '<span style="color: red">You should allocate '+dif+' more food land!</span>'; }
		else
		{ conc = 'Your food allocation is over your daily needs by '+dif+' land(s).'; }
		firstline.className = 'separator title';
		midline.className = 'separator title';
		lastline.className = 'separator title';
		firstline.innerHTML = 'Food Production / Launch Cost : ' + evoNumber2String(Math.round(cfp)) + ' / ' + evoNumber2String(Math.round(lfcost));
		midline.innerHTML = 'You can launch '+ lfpercent + '% of all of your creatures per day.';
		lastline.innerHTML = conc;
		cfleettable.parentNode.appendChild(firstline);
		cfleettable.parentNode.appendChild(midline);
		cfleettable.parentNode.appendChild(lastline);
	}
	
	//
	// Defences
	//
	var staticDefense = document.evaluate("id('cdef')/div/table", contents, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	var attack, defense, nDef, overallDefense = 0, overallAttack = 0;
	if (staticDefense != null){
		for( i = 0; i < staticDefense.rows.length; i++ ){
			for( j = 0; j < staticDefense.rows[i].cells.length; j += 2 ){
				defenseType = staticDefense.rows[i].cells[j].textContent.toLowerCase();
				nDef = parseInt(staticDefense.rows[i].cells[j+1].textContent);
				unit = units[defenseType];
				attack = unit.getAttackScore(nDef);
				defense = unit.getDefenseScore(nDef) * defendersBoost;
				staticDefense.rows[i].cells[j+1].title = 'Individual att2/def2 score: ' + evoNumber2String(attack.toFixed(0)) + ' / ' + evoNumber2String(defense.toFixed(0));
				overallAttack += attack;
				overallDefense += defense;
			}
		}
	
	var thecell = document.createElement('DIV');
	thecell.className = 'separator title';
	thecell.innerHTML = "Total Att&sup2;: " + evoNumber2String(overallAttack.toFixed(0)) + "<br /> Total Def&sup2;: " + evoNumber2String(overallDefense.toFixed(0));
	staticDefense.parentNode.appendChild(thecell);
	}


}

//
// restores the land cost display on the resources page
//
regPageHandler(/^\/rd\/d/i,  evoRnD);
function evoRnD() {
	if(GM_getValue('evo_SE',"no") != "yes"){
		var rndtable = document.evaluate(".//div[@class='alt2 t_little' and preceding-sibling::div[@class='separator title']]", contents, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if(rndtable.snapshotItem(1).innerHTML.indexOf("/rd/display/i11") != -1) GM_setValue('evo_SE',"yes");
	}
}
regPageHandler(/^\/resources\/overview/i,  evoResources);
function evoResources() { //rewrite 1

	var unusedLandNode = document.evaluate("id('testtable')/tbody/tr[1]/td[2]/span", contents, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	var metalLandNode = document.evaluate("id('testtable')/tbody/tr[5]/td[2]/span", contents, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	var mineralLandNode = document.evaluate("id('testtable')/tbody/tr[5]/td[3]/span", contents, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	var foodLandNode = document.evaluate("id('testtable')/tbody/tr[5]/td[4]/span", contents, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	
	if (unusedLandNode != null)
	{ var unusedLandTxt = unusedLandNode.textContent.match(/\d+(?=\s)/)[0]; }
	else
	{ var unusedLandTxt; }
	
	if (unusedLandTxt != null)
	{ 
		var unusedLand = evoString2Number(unusedLandTxt); //Unallocated Land
		var z = 1;
	}
	else
	{
		var unusedLand = 0; //Unallocated Land if the unusedLandNode isn't there
		var z = 0;
	}
	
	var metalLand = evoString2Number(metalLandNode.textContent); //Metal Land
	var mineralLand = evoString2Number(mineralLandNode.textContent); //Mineral Land
	var foodLand = evoString2Number(foodLandNode.textContent); //Food Land
	//Start Up
	rAllocated();
	rLandRatio();
	
	function rLandRatio() { //incomplete
	
	}
	
	function rAllocated() {	
		//Max Land that can be allocated
		var allLand = (metalLand + mineralLand + foodLand);
		var totalCost = 0;
		var nbr = 0; var qrty = 0;
	
		while( totalCost < pMetal) {
			qrty++;
			totalCost += (((allLand -1) *150) + 1000 + (qrty * 150 ));
			if (totalCost < pMetal)
			{ nbr++ }
		}
	
		// We need to have unallocated land
		if( z == 1 ) {
			if( unusedLand < nbr ) // If we have more than Allocated Land
			{ nbr = unusedLand; }
		} else
		{ nbr = 0; }
	
		// We need to figure out where to put the text
		var i = 0;
		var landNode;
		var lnn;
		while(i < 5) {
			i++;
			landNode = document.evaluate("id('content')/div["+i+"]/span", contents, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
			if (landNode != null) {
				if (landNode.textContent == "Land")
				{ lnn = i; }
			}
		}
	
		// Add the text
		var txtMod = (nbr == 0) ? '<font color= \"orange\">You currently cannot allocate any land.</font>' :'<font color=\"lawngreen\">You can currently allocate a maximum of '+nbr+' land.</font>';;
		var panel = document.evaluate("id('content')/div["+lnn+"]/span", contents, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
		panel.innerHTML = panel.innerHTML+" - "+txtMod;
	}
}

//
// Alliances page
//
regPageHandler(/^\/alliances$/i,  evoAlliances);
function evoAlliances() {
	var row;
	var rows = document.evaluate(".//table/tbody[tr/td[text()='Alliance Name']]/tr[count(td)=5]", contents, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for(var i = 1; row = rows.snapshotItem(i); i++) {
		row.cells[3].innerHTML = evoNumber2String(row.cells[3].textContent) + '<br /><span style="color: dodgerblue">' + evoNumber2String(Math.ceil(evoString2Number(row.cells[3].textContent)/evoString2Number(row.cells[2].textContent))) + "</span>";
		row.cells[3].style.textAlign = "right";
		row.cells[3].style.padding = "0 2px 0 2px";
	}
}

//
// Alliance members
//
regPageHandler(/^\/alliances\/(.*)\/members/i, evoAllianceMembers);
function evoAllianceMembers() {
	var smin = Math.ceil(pScore * minAttack);
	var tmax = Math.floor(pScore / minAttack);
	
	var memberTables = document.evaluate(".//div[@id='alliancememberlist']/div/table", contents, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
	// if we have rank edit powers.. we need another snapshot
	if(memberTables.snapshotItem(0) == null) var memberTables = 

document.evaluate(".//div[@id='alliancememberlist']/form/div/table", contents, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	var nbr = 0, snbr = 0, totscore = 0, stotscore = 0;

	var primeTag = unescape( window.location.href.match(/\/alliances\/(.*)\/members$/)[1] ); // get the alliance's tag

	for( var i = 0; memberTable = memberTables.snapshotItem(i); i++ ) {
		// Add some formatting
		memberTable.style.width = '100%';
		memberTable.rows[0].cells[0].style.width = '500px';
		memberTable.rows[0].cells[3].style.textAlign = 'right';
		memberTable.rows[0].style.fontWeight = 'right';
		memberTable.rows[0].style.fontWeight = 'bold';

		for(var j = 1; j < memberTable.rows.length; j++) {
			score = memberTable.rows[j].cells[2];		
			target = evoString2Number(score.textContent);
			if( target < smin ) {
				score.style.color = 'chocolate';
			}else{
				if( target > tmax ) score.style.color ='dodgerblue';
				else score.style.color = 'lime';
				thisTag = ( memberTable.rows[j].cells[0].textContent.match(/\[(.*)\]/) != null ) ? memberTable.rows[j].cells[0].textContent.match(/\[(.*)\]/)[1] : '';
				if( thisTag == primeTag ) {
					totscore += target;
					nbr += 1;
				}else{
					stotscore += target;
					snbr += 1;
				} 
			}
			memberTable.rows[j].cells[2].textContent = evoNumber2String(memberTable.rows[j].cells[2].textContent);
			memberTable.rows[j].cells[3].style.textAlign = 'right';
		}
	}
	// Show the info at the top
	var div = document.evaluate(".//div[@id='alliancememberlist']", contents, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;

	div.innerHTML = '<div class="separator title">You currently have <span style="color: lime">' + nbr + '</span> Primary targets in this alliance (' + evoNumber2String(totscore) + ')</div><div class="separator title">You currently have <span style="color: orange">' + snbr + '</span> Secondary targets in this alliance (' + evoNumber2String(stotscore) + ')</div><div class="separator title">Total of <span style="color: orangered">' + evoNumber2String(nbr + snbr) + '</span> Targets (' + evoNumber2String(totscore + stotscore) + ')</div>' + div.innerHTML;

	// quick buddy
	// This feature makes a direct request to the server which is deemed illegal
	// neon has however kindly accepted to allow it only for this particular feature
	// since it puts less strain on the server than doing it the regular way
	// AGAIN, THIS IS AN EXCEPTION. DON't USE XmlHttpRequest!!! IT IS ILLEGAL!
	function onBuddy(e) {
		var postData;
		e.preventDefault();
		try {
			postData = e.target.href.match(/\/buddies\/add\?(.*)$/)[1];
		} catch ( e ) {
			return;
		}
		if( count++ ) {
			alert("Wow... take it easy! One buddy at a time, will you?");
			--count;
			return;
		}
		e.target.textContent = "Please wait...";
		e.target.href = '#';
		GM_xmlhttpRequest({
			method: 'POST',
			url: 'http://'+document.location.hostname+'/buddies/add',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			data: postData,
			onreadystatechange: function(responseDetails) {
				if( responseDetails.readyState == 4 && responseDetails.status == 200 ) {
					e.target.parentNode.removeChild(e.target);
					--count;
				}
			},
			onerror: function(responseDetails) {
				e.target.href = "/buddies/add?" + postData;
				e.target.textContent = ' Add to buddies';
				--count;
			}
		});
	}

	var i, match;
	var re = /javascript:return continentBox\(\d+,(\d+),(\d+),(\d+),(\d+),'(\w)','([^']+)','([^']+)','([^']+)','([^']+)','([^']*)',\s*'([^']*)'/;
	var users = document.evaluate(".//a[@class='cleanlink continfo']", contents, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

	for(i = 0; node = users.snapshotItem(i); i++) {
		if( match = re.exec(node.getAttribute('onclick')) ) {
			if( match[11] == '' ) {
				var br, td = node.parentNode.parentNode;
				var a = document.createElement('a');
				a.href = '/buddies/add?x=' + match[2] + '&y=' + match[3] + '&z=' + match[4] + '&c=' + match[5] + '&nickname=' + encodeURIComponent(match[6]) + '&label=' + encodeURIComponent(node.textContent.match(/\[([^\]]+)\]/)[1]);
				a.appendChild(document.createTextNode(' Add to buddies'));
				a.addEventListener('click', onBuddy, false);
				if(! (br = node.parentNode.nextSibling) ) td.appendChild(document.createElement('br'));
				else br.nextSibling.textContent += ' ';
				td.appendChild(a);
			}
		}
	}
}

//
// Add some color to the scores on the universe pages
//
regPageHandler(/^\/(universe\/(home|search)|(\d+(,\d+)*))$/i,  evoUniverse);
function evoUniverse() {
	var smin = Math.ceil(pScore * minAttack);
	var tmax = Math.floor(pScore / minAttack);
	var table = document.getElementById('cont_list');
	if( table != null ) {
		// insert a column to show players' online/offline status
		table.rows[0].insertCell(4);
		table.rows[0].cells[4].textContent = 'Last Seen'; // New heading
		for(var i=2; i < table.rows.length; i++) {
			if( table.rows[i].cells.length < 4 ) continue;

			var cell1 = table.rows[i].cells[1];
			var cell3 = table.rows[i].cells[3];
			
			var matchr = /Last Seen: (?:(\d+) days )?(\d+) hours ago/.exec(cell1.getElementsByTagName("a")[0].getAttribute('onclick'));
			table.rows[i].insertCell(4);
			table.rows[i].cells[4].style.textAlign="left";
			// display player's online/offline status
			if( matchr ) {
				// player is not online
				table.rows[i].cells[4].textContent = matchr[0].split(":")[1];
				table.rows[i].cells[4].textContent = table.rows[i].cells[4].textContent.replace(/( days)|( hours)/g,function(thematch){if(thematch==" days") return "d"; else return "h"});
			} else {
				// player is online right now!
				table.rows[i].cells[4].innerHTML = '<span style="color:orangered"> Online!</span>';
			}
			table.rows[i].cells[4].innerHTML = '&nbsp;' + table.rows[i].cells[4].innerHTML; // insert preceding space for readability
						
			// Look for valid targets 
			var target = evoString2Number(cell3.innerHTML);

			if( target < smin ) cell3.style.color = 'chocolate';
			else if( target > tmax ) cell3.style.color ='dodgerblue';
			else cell3.style.color = 'lime';
		}
		var git = document.evaluate(".//table[tbody/tr[1]/td[1][text() = 'Key']]", contents, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
		if( git != null ) {
			var d = git.insertRow(4);
			d.className = "lightblue_bg_row2";
			d.innerHTML = '<td>Score colours:</td><td colspan="3" align="center">Players with <span style="color: chocolate">this score</span> can attack you, but you can\'t attack them <img src="http://evolution.neondragon.net/ui/emoticons/sad.png" alt=":(" align="absmiddle" /><br />Players with <span style="color: lime">this score</span> can attack you, and you can also attack them <img src="http://evolution.neondragon.net/ui/emoticons/smile.png" alt=":)" align="absmiddle" /><br />Players with <span style="color: dodgerblue">this score</span> can\'t attack you, but you can attack them <img src="http://evolution.neondragon.net/ui/emoticons/cool.png" alt="B)" align="absmiddle" /></td>';
		}
	}
}

//
// Evaluation of att/def on scans
//
regPageHandler(/^\/scans/i, evoScans );
regPageHandler(/^\/scans/i, evoAmpRatio );
regPageHandler(/^\/scans/i, evoLSM);

function evoAmpRatio() {
	var scantable = document.evaluate("id('content')/table[starts-with(.,'ItemDescription')]", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	if (scantable){ 
		var land = document.getElementById( 'panelinfo' ).textContent.match( /Land:\s([,?\d]+)/ );
		var curAmps = evoString2Number( scantable.rows[3].cells[2].textContent );
		var curLand = evoString2Number( land[1] );
		var ratio = Math.round(( curAmps / curLand ) * 1000 ) / 1000;
		if (ratio >= 5)
		{ scantable.rows[3].cells[2].innerHTML = scantable.rows[3].cells[2].innerHTML + '<br /><span style="text-size: 0.8em;color: greenyellow">'+ratio+'</span>'; }
		else
		{ scantable.rows[3].cells[2].innerHTML = scantable.rows[3].cells[2].innerHTML + '<br /><span style="text-size: 0.8em;color: orange">'+ratio+'</span>'; }
	}
}

//A complete rewrite to the Land Scan Message
function evoLSM() {
	var messageNode = document.evaluate("id('content')/div[1]", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	var successNode = document.evaluate("id('content')/div[1]/span[1]", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	var failedNode = document.evaluate("id('content')/div[1]/span[2]", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	if(successNode != null && failedNode != null) {
		var success = evoString2Number(successNode.textContent);
		var failed = evoString2Number(failedNode.textContent);
		var total = failed + success;

		var scansTxtMod;
		if( total <= 1)
		{ scansTxtMod = "Scan"; }
		else
		{ scansTxtMod = "Scans"; }
		
		var badScanRatio;
		if (success <= failed)
		{ badScanRatio = "<br>Consider building Scan Amplifiers to Raise your Successful:Failed Scans Ratio."; }
		else
		{ badScanRatio = "";}
		
		messageNode.innerHTML = "<img class=\"notificationimg\" style=\"float: left;\" src=\"http://playevo.com/images/icons/help-book.gif\"/><b>Land "+scansTxtMod+" Result - "+total+
		" "+scansTxtMod+" Launched</b> | <b><font color = \"greenyellow\">"+success+"</font></b>"
		+" Successful "+scansTxtMod+" (<i><b><font color = \"red\">"+failed+"</font></b> " +
		"Failed</i>)." + badScanRatio;
	}
}

function evoScans() { //4.0.6 code
	var scan = document.evaluate(".//div[@class='helpmessage']/strong", contents, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if( !scan ) return;
	var table = document.evaluate("./following-sibling::table", scan, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	scan = scan.textContent;
	if( scan.indexOf("Sector Scan") != -1 ) {
		var defenseData = new Array( new Array( 7, 'fort' ), new Array( 8, 'satellite mark 2' ), new Array( 9, 'nanowire wall' ));
		var attack, defense, overallAttack = 0, overallDefense = 0;
		var row, cells, nDef, unit, newCell;

		var landAmt = 0, nLands, unused = 0;
		var rows = table.rows;
		for( var i = 0; i < defenseData.length; i++ ) {
			cells = rows[defenseData[i][0]].cells;
			if( cells.length == 4 ) {
				// static defenses
				nDef = parseInt(cells[3].innerHTML);
				if( isNaN( nDef )) continue;
				unit = units[defenseData[i][1]];
				attack = unit.getAttackScore(nDef);
				defense = unit.getDefenseScore(nDef) * defendersBoost;
				overallAttack += attack;
				overallDefense += defense;
				cells[3].title = 'Individual attack/defense score: ' + evoNumber2String(attack.toFixed(0)) + ' / ' + evoNumber2String(defense.toFixed(0));
			}
			if( cells.length == 2 || cells.length == 4 ) {
				// land defense
				nLands = parseInt(cells[1].innerHTML);
				if( !isNaN( nLands )) landAmt += nLands;
			}
		}

		//
		// formatting score number / add attacker's score range
		//
		var resPics = new Array ('metal.png','mineral.png','food.png');
		for( var i = 2; i < 5; i++ ) {
			rows[i].cells[2].innerHTML = '<img src="http://images.neondragon.net/ev5/resources/' + resPics[i-2] + '" border="0" /> ' + rows[i].cells[2].innerHTML;
			rows[i].cells[3].innerHTML = '<span style="color: lightblue">' + evoNumber2String(parseInt(rows[i].cells[3].innerHTML)) + "</span>";
		}
		resPics = null;
		var score = parseInt(rows[2].cells[1].innerHTML);
		rows[2].cells[1].innerHTML = '<span style="color: greenyellow">' + evoNumber2String(score) + "</span>";
		rows[3].cells[0].innerHTML = "Max. Attacker Score";
		rows[3].cells[0].className = "alt1 b";
		rows[3].cells[1].innerHTML = '<span style="color: dodgerblue">' + evoNumber2String(Math.ceil(score/minAttack)) + "</span>";
		rows[4].cells[0].innerHTML = "Min. Attacker Score";
		rows[4].cells[0].className = "alt1 b";
		rows[4].cells[1].innerHTML = '<span style="color: chocolate">' + evoNumber2String(Math.ceil(score*minAttack)) + "</span>";
		unused = parseInt(rows[6].cells[1].innerHTML);
		row = table.insertRow(10);
		newCell = row.insertCell(0);
		newCell.className = "alt1 b";
		newCell.innerHTML = 'Land ratio/def&sup2;';
		newCell = row.insertCell(1);
		newCell.innerHTML = '<span style="color: gold">' + evoNumber2String(( 100 * landAmt / ( landAmt + unused )).toFixed(2)) + "%</span> / " + 
				    '<span style="color: tomato">' + evoNumber2String((( landAmt + unused ) * ( landDefense * landDefense ) * defenseMultiplier ).toFixed(0)) + "</span>";
		newCell = row.insertCell(2);
		newCell.className = "alt1 b";
		newCell.innerHTML = 'Overall att&sup2;/def&sup2;';
		newCell = row.insertCell(3);
		newCell.title = "This does NOT include the creature stats";
		newCell.innerHTML = '<span style="color: coral">' + evoNumber2String(overallAttack.toFixed(0)) + "</span> / " + 
				    '<span style="color: palegreen">' + evoNumber2String(overallDefense.toFixed(0)) + "</span>";

		for( var i = 6; i <= 9; i++ ) {
			if( rows[i].cells[1] ) rows[i].cells[1].innerHTML = evoNumber2String( parseInt( rows[i].cells[1].innerHTML ));
			if( rows[i].cells[3] ) rows[i].cells[3].innerHTML = evoNumber2String( parseInt( rows[i].cells[3].innerHTML ));
		}
	} else if( scan.indexOf( "Creature Scan" ) != -1 ) {
		var rows = table.rows;
		var row, cells, cell, unit, quantity, boost;
		var attack, defense, defendersDefense, overallAttack = 0, overallDefenseAttacking = 0, overallDefenseDefending = 0;
		var foodCost = 0;
		for(var i = 2; i < rows.length; i++) {
			row = rows[i];
			cells = row.cells;
			for(var j = 0; j < cells.length; j += 2) {
				unit = units[cells[j].textContent.toLowerCase()];
				cell = cells[j + 1];
				quantity = parseInt(cell.innerHTML);
				boost = 1 + unit.getBoost();
				attack = unit.getAttackScore(quantity) * boost * boost;
				defense = unit.getDefenseScore(quantity) * boost * boost;
				defendersDefense = defense * defendersBoost;
				foodCost += unit.getFoodCost(quantity);
				overallAttack += attack;
				overallDefenseAttacking += defense;
				overallDefenseDefending += defendersDefense;
				cell.title = "Individual attack/defense; with " + evoNumber2String( unit.getBoost() * 100 ) + "% boost: " +
					     evoNumber2String( attack.toFixed( 0 )) + " / " + evoNumber2String(defense.toFixed(0)) +
					     " (" + evoNumber2String(defendersDefense.toFixed(0)) + ")";
			}
		}
		var newRow = table.insertRow(rows.length);
		var newCell = newRow.insertCell(0);
		newCell.className = "alt1 b";
		newCell.innerHTML = 'Total att&sup2;/def&sup2;';
		newCell = newRow.insertCell(1);
		newCell.title = "Total attack/defense with currently configured boost";
		newCell.innerHTML = '<span style="color: coral">' + evoNumber2String( overallAttack.toFixed( 0 )) + "</span> / " + 
				    '<span style="color: palegreen">' + evoNumber2String( overallDefenseAttacking.toFixed( 0 )) + "</span> (" + 
				    '<span style="color: turquoise">' + evoNumber2String( overallDefenseDefending.toFixed( 0 )) + "</span> )";
		newCell.colSpan = 5;
		newRow = table.insertRow(rows.length);
		newCell = newRow.insertCell(0);
		newCell.className = "alt1 b";
		newCell.innerHTML = "Launch cost";
		newCell = newRow.insertCell(1);
		newCell.innerHTML = '<span style="color: pink">' + evoNumber2String( foodCost.toFixed( 0 )) + "</span>";
		newCell.colSpan = 5;
	}
}

//
// Fleets page
//
regPageHandler(/^\/fleets/i,  evoFleets );
function evoFleets() //version 4.0.6 with ALP 1.1
{
	function getCoords() {
	      var x = gup("x");
	      var y = gup("y");
	      var z = gup("z");
	      var c = gup("c");
	      if(x == "" || y == "" || z == "" || c == "")
		return;
	
	      //show all 3 fleets
	      for(var i = 1; i < 4; i++)
	      {
		var a = document.getElementById("fleetx" + i);
		if(a != null)
		  a.value = x;
	
		var b = document.getElementById("fleety" + i);
		if(b != null)
		  b.value = y;
	
		var d = document.getElementById("fleetz" + i);
		if(d != null)
		  d.value = z;
	
		var e = document.getElementsByName("f_c[" + i + "]")[0];
		if(e != null)
		  e.value = c;    
	      }
	}
	
        function gup(name)
        {
          var regexS = "[\\?&]"+name+"=([^&#]*)";
          var regex = new RegExp( regexS );
          var tmpURL = window.location.href;
          var results = regex.exec( tmpURL );
          if( results == null )
            return "";
          else
  	  return results[1];
        }
	
	function updateFleetsAddCell(row, cellIndex, className, scores) {
		var cell = row.insertCell(cellIndex);
		cell.className = className;
		cell.style.textAlign = 'center';
		cell.colSpan = 2;
		if(cellIndex > 0 && sumRow != null) {
			cell.style.fontSize = "12px";
			cell.innerHTML = evoNumber2String(scores[1]);
			cell.title = 'Unboosted: ' + evoNumber2String(scores[0]);
		} else {
			cell.innerHTML = scores; // cell title actually
		}
	}
	function updateFleetsAddRow(fleetsTable, isAttack) {
		var row = fleetsTable.insertRow(fleetsTable.rows.length - 2);
		updateFleetsAddCell(row, 0, "alt1 b", (isAttack ? "Attack" : "Defense") + 
				    '<br /><span style="font-size: smaller; font-weight: normal">(estimation with max boost)</span>');
		updateFleetsAddCell(row, 1, "red_bg", getFleetScore(1, fleetsTable, isAttack));
		updateFleetsAddCell(row, 2, "yellow_bg", getFleetScore(2, fleetsTable, isAttack));
		updateFleetsAddCell(row, 3, "green_bg", getFleetScore(3, fleetsTable, isAttack));
	}
	function getFleetScore(fleetNo, table, isAttack) {
		var rows, row;
		var unit, quantity, total = 0;
		var i, j, baseScore, boost, noBoostScore = 0, maxBoostScore = 0;
		rows = document.evaluate(".//tr[td[1]/a]", table, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for( i = 0; row = rows.snapshotItem(i); i++ ) {
			if( row.cells[0].rowSpan > 1 ) break;
			unit = units[row.cells[0].textContent.toLowerCase()];
			quantity = Number(row.cells[fleetNo * 2 + 1].textContent);
			total += quantity;
			baseScore = isAttack ? unit.getAttackScore(quantity) : unit.getDefenseScore(quantity);
			noBoostScore += baseScore;
			boost = 1 + unit.getBoost();
			maxBoostScore += baseScore * boost * boost;
		}
		row.cells[0].rowSpan = 12;
		if (sumRow != null) 
		{ 
			var cell = sumRow.cells[1 + fleetNo];
			cell.textContent = total;
			cell.style.textAlign = 'center';
			cell.style.fontSize = '12px';
			return new Array(Math.round(noBoostScore), Math.round(maxBoostScore));
		}
	}
	
	getCoords();
	
	var fleetsTable = null;
	fleetsTable = document.evaluate(".//table[preceding-sibling::h1[@class='title' and text()='Fleet Organisation']][1]", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	
	// Balancing act
	// This is a huge hack... but oh well, it works :P

	var FleetOne = 0; var FleetTwo = 0; var FleetThree= 0;
	
	for(q=1; q <= fleetsTable.rows.length-13; q++) {
	FleetOne += Number(fleetsTable.rows[q].cells[3].textContent);
	}
	
	for(q=1; q <= fleetsTable.rows.length-13; q++) {
	FleetTwo += Number(fleetsTable.rows[q].cells[5].textContent);
	}
	
	for(q=1; q <= fleetsTable.rows.length-13; q++) {
	FleetThree += Number(fleetsTable.rows[q].cells[7].textContent);
	}
	
	if(FleetOne > FleetTwo) {
		if(FleetOne > FleetThree) maxSize = FleetOne;
		else maxSize = FleetThree;
	}
	else {
		if(FleetTwo > FleetThree) maxSize = FleetTwo;
		else maxSize = FleetThree;
	}

	// Add the function to add monkeys to the correct box when clicking
	fleetsTable = document.evaluate(".//table[preceding-sibling::h1[@class='title' and text()='Fleet Organisation']][1]", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	var theRow = 0;
	for( var i = 1; i < (fleetsTable.rows.length); i++ ) {
		if(fleetsTable.rows[i].cells.length != 9) continue;
		if(fleetsTable.rows[i].cells[0].textContent.toLowerCase() == "monkey") theRow = i;
	}	
	var MonkeyClick = function(e){
    	fleetsTable.rows[theRow].cells[2].getElementsByTagName('INPUT')[0].value = this.textContent.split(" More")[0];
	};		
	
	if(FleetOne == maxSize) { cellToGo = 3; }
	else if(FleetTwo == maxSize) { cellToGo = 5; }
	else if(FleetThree == maxSize) { cellToGo = 7; }
	rawr = fleetsTable.insertRow(fleetsTable.rows.length-12);
	rawr.className = "alt1 b";
	rawr.style.textAlign = "center";
	
	heh = rawr.insertCell(0);
	heh.textContent = "Total Creatures";
	heh.style.textAlign = "left";
	heh.addEventListener("click", MonkeyClick, false);
	
	heh = rawr.insertCell(1);
	heh.className = "alt2 row2";
	heh.colSpan = 2;
	heh.addEventListener("click", MonkeyClick, false);
		
	heh = rawr.insertCell(2);
	heh.className = "red_bg";
	heh.colSpan = 2;
	heh.textContent = maxSize-FleetOne + ' More';
	heh.addEventListener("click", MonkeyClick, false);
		
	heh = rawr.insertCell(3);
	heh.className = "yellow_bg";
	heh.colSpan = 2;
	heh.textContent = maxSize-FleetTwo + ' More';
	heh.addEventListener("click", MonkeyClick, false);
		
	heh = rawr.insertCell(4);
	heh.className = "green_bg";
	heh.colSpan = 2;
	heh.textContent = maxSize-FleetThree + ' More';
	heh.addEventListener("click", MonkeyClick, false);
		
	// End the hack 
	
	// How many times can we launch?
	for(z=1; z <= 3; z++) {	
	var LaunchCell = fleetsTable.rows[fleetsTable.rows.length -2].cells[z];
	var LaunchCost = evoString2Number(fleetsTable.rows[fleetsTable.rows.length -2].cells[z].textContent);
		if((LaunchCost * 5) < pFood) { cellCol = "lightgreen"; }
		else if(LaunchCost < pFood ) { cellCol = "orange"; }
		else { cellCol = "red"; }
	LaunchCell.innerHTML = '<span style="color:' + cellCol + '">' + LaunchCell.innerHTML + '</span>';
	}

	//add row for fleet counts
	var sumRow = document.evaluate(".//tr[td[position()=1 and text()='Move to']]", fleetsTable, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	if (sumRow != null)
	{
		sumRow = fleetsTable.insertRow(sumRow.rowIndex);
		sumRow.innerHTML = '<td class="alt1 b">Total</td><td class="alt2" colspan="2"></td><td class="red_bg" colspan="2"></td><td class="yellow_bg" colspan="2"></td><td class="green_bg" colspan="2"></td>';
	}
	updateFleetsAddRow(fleetsTable, true);
	updateFleetsAddRow(fleetsTable, false);
	

	// Add the function to add numbers to the correct box when clicking
	var AddByClick = function(e) {
                 	fleetsTable.rows[this.parentNode.rowIndex].cells[this.cellIndex+1].getElementsByTagName('INPUT')[0].value = this.textContent;
	        };	
	for( var i = 1; i < (fleetsTable.rows.length); i++ ) {
		for( var j = 1; j <= 7; j+=2 ) {
		if(fleetsTable.rows[i].cells.length != 9) continue;
		row = fleetsTable.rows[i].cells[j];
		// Add the listener to the cell
		row.addEventListener("click", AddByClick, false); 
		}
	}
	
	var reorderRow = document.evaluate(".//td[input[@name='reorder']]", fleetsTable, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
		var randomButton = document.createElement('input');
		randomButton.type = "button";
		randomButton.style.color = "#FFFF00";
		randomButton.value = "Random";
		randomButton.addEventListener('click', randomFleets, false);
		reorderRow.insertBefore(randomButton, reorderRow.childNodes[0]);
		
		// hook up a listener on the Random Fleets button
	function randomFleets() {
		var moveRow = document.evaluate(".//tr[td[position()=1 and text()='Move to']]", fleetsTable, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
		var reorderButton = document.evaluate(".//input[@name='reorder']", fleetsTable, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
		var toFleet = new Array("0,0,0", "0,3,3", "2,2,0", "2,3,2", "3,2,3", "3,0,2");
		var rndFleet = Math.round(Math.random() * 5) % 5;		
		var positions = (toFleet[rndFleet]).split(",");
		var refreshMe = false;
		var allFleetsHome = true;
		
		for (var i = 2; i < 5; i++) {
			var input = moveRow.cells[i].childNodes[0];
			if (input){ input.selectedIndex = positions[i - 2]; } else { allFleetsHome = false; }
				
			if (allFleetsHome == true){
				if (positions[i - 2] > 0) {
					selectAllFleet((i - 1), fleetsTable);
					refreshMe = true;
				}
			}
			
		}
		
		if (allFleetsHome == true){
			if (refreshMe) {
				reorderButton.click();
			}	
		}else{
				alert('Error: You can\'t rotate fleets when you\'ve got some out!');
			}
	}
	
	function selectAllFleet(fleetNo, table){
		var rows, row;
		var unit, quantity, total = 0;
		var i, j, baseScore, boost, noBoostScore = 0, maxBoostScore = 0;
		rows = document.evaluate(".//tr[td[1]/a]", table, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

		for (i = 0; row = rows.snapshotItem(i); i++ ) {
			if (row.cells[0].rowSpan > 1) {
				break;
			}
			
			quantity = Number(row.cells[(fleetNo * 2) + 1].textContent);
			
			if (quantity > 0) {
					row.cells[(fleetNo * 2) + 2].childNodes[0].value = quantity
			}
		}
	}
	function numChecked()
	{
		var num = 0;
		if (flag1)
			num+= document.getElementsByName('f_submit[1]')[0].checked;
		if (flag2)
			num+= document.getElementsByName('f_submit[2]')[0].checked;
		if (flag3)
			num+= document.getElementsByName('f_submit[3]')[0].checked;
		return num;
	}

	function fleetsChecked()
	{
		var num = new Array(0,0,0);
		if (flag1)
			num[0] = document.getElementsByName('f_submit[1]')[0].checked;
		if (flag2)
			num[1]= document.getElementsByName('f_submit[2]')[0].checked;
		if (flag3)
			num[2]= document.getElementsByName('f_submit[3]')[0].checked;
		return num;
	}

	function compareFleets(fleet1, fleet2)
	{
		for(i=0;i < 4; ++i)
			if(fleet1[i] != fleet2[i])
				return (false);
		return (true)
	}

	function compareWindows()
	{
		num = numChecked();

		if(num < 2)
			return true;
		fleetschecked = fleetsChecked();
		for(i = 0; i < 3;++i)
			for(j=0; j<3; ++j)
			{
				if(i!=j)
				 if(fleetschecked[i] && fleetschecked[j])
				  if(!compareFleets(unsafeWindow.traveltimes[i],unsafeWindow.traveltimes[j]))
					return(false);
			}
		return true;
	}

	function submitFleets()
	{
		var message = "";
		if(!compareWindows())
			message+= "The fleets weight are not equal\n";
	
		message = message + "Are you sure you want to send the fleets?";
		if(confirm(message))			
			document.getElementsByName('launchform')[0].submit();
	}
	document.getElementsByName('f_submit[2]')[0]


	if(document.getElementsByName('f_submit[1]')[0]) 
	{
		document.getElementsByName('f_submit[1]')[0].type='checkbox';
		flag1=true;
	}
	if(document.getElementsByName('f_submit[2]')[0]) 
	{
		document.getElementsByName('f_submit[2]')[0].type='checkbox';
		flag2=true;
	}
	if(document.getElementsByName('f_submit[3]')[0]) {
		document.getElementsByName('f_submit[3]')[0].type='checkbox';
		flag3=true;
	}

	var Element = document.getElementsByName('launchform')[0].parentNode;

	if(Element && (flag1 || flag2 || flag3))
	{
		var button = document.createElement('input');
		button.type = "button";
		button.style.color = "#FFFF00";
		button.value = " **** Launch Fleets ***** ";
		button.addEventListener('click', submitFleets,true);	
		Element.insertBefore(button, Element.lastChild);	
	}
}

//
// News page
//
regPageHandler( /^\/news/i, evoNews );
function evoNews() {
	function addCell( row, cellIndex, attributes, html ) {
		var cell = row.insertCell(cellIndex);
		if( attributes ) for( var i = 0; i < attributes.length; i++) cell.setAttribute(attributes[i][0], attributes[i][1] );
		if( html ) cell.innerHTML = html;
		return cell;
	}

	var RegExpTerm = (".//table[@class='t_little']");
	var battleReports = document.evaluate(RegExpTerm, contents, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var battleReport;
	var rows, html, attDefRow, isAttacker, att, myAtt, def, myDef, idx, idx2,  unit, quantity, boost, landType, land, myLand, summaryRow, cell, j;
	var ruler = document.evaluate("//p[@id='navstatus']/strong[1]/text()", document, null, XPathResult.STRING_TYPE, null).stringValue; //openpanel
	var attPrefixRegex = /.*att<sup>2<\/sup>:\s*/;
	var attSuffixRegex = /<br.*/;
	var defPrefixRegex = /.*def<sup>2<\/sup>:\s*/;

	for( var i = 0; battleReport = battleReports.snapshotItem(i); i++ ) {
		rows = battleReport.rows;
		attDefRow = rows[0];
		isAttacker = attDefRow.cells[1].textContent.toLowerCase().indexOf(ruler.toLowerCase()) != -1;
		idx = isAttacker ? 1 : 2;
		att = attDefRow.cells[idx].innerHTML.replace(attPrefixRegex, "").replace(attSuffixRegex, "");
		att = parseInt(att ? att : 0);
		def = attDefRow.cells[idx].innerHTML.replace(defPrefixRegex, "");
		def = parseInt(def ? def : 0);
		myAtt = 0;
		myDef = 0;
		idx2 = isAttacker ? 1 : 6;

		for( j = 3; j < rows.length; j++ ) {
			unit = units[rows[j].cells[0].innerHTML.toLowerCase()];
			if(!unit) break;
			idx = rows[j].cells[idx2].innerHTML.indexOf("<br>");
			quantity = parseInt(rows[j].cells[idx2].innerHTML.substring(idx + 4));
			boost = 1 + unit.getBoost();
			myAtt += unit.getAttackScore(quantity) * boost * boost;
			myDef += unit.getDefenseScore(quantity)  * boost * boost;
		}
		summaryRow = battleReport.insertRow(rows.length);
		cell = addCell(summaryRow, 0, new Array(new Array("colSpan", "11"), new Array("height", "3")));
		summaryRow = battleReport.insertRow(rows.length);
		cell = addCell(summaryRow, 0, new Array(new Array("class", "alt1 b")), "Summary");
		html = "Att: " + evoNumber2String(myAtt.toFixed(0)) + " / <b>" + evoNumber2String(att) + "</b> (" + (att != 0 ? parseInt(100 * myAtt / att) : 0) + "%)<br/>" + "Def: " + evoNumber2String(myDef.toFixed(0)) + " / <b>" + evoNumber2String(def) + "</b> (" + (def != 0 ? parseInt(100 * myDef / def) : 0) + "%)";
		if( isAttacker ) {
			cell = addCell(summaryRow, 1, new Array(new Array("class", "red_bg_row2"), new Array("colSpan", "2")), html);
			html = "";
			for( ; j < rows.length - 2; j++ ) {
				if( rows[j].cells[0].innerHTML.indexOf("Land Capture") != -1 ) {
					j++;
					break;
				}
			}
			for(; j < rows.length - 2; j++) {
				landType = rows[j].cells[0].innerHTML;
				land = rows[j].cells[2].firstChild.innerHTML;
				myLand = rows[j].cells[2].innerHTML.replace(/.*<br>/, "");
				idx = landType.length + (11 - landType.length) * 6;
				landType = (landType + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;").substring(0, idx);
				html += landType + ": " + myLand + " / <b>" + land + "</b> (" + parseInt(100 * myLand / land) + "%)<br/>";
			}
			cell = addCell(summaryRow, 2, new Array(new Array("class", "red_bg_row2"), new Array("colSpan", "3")), html);
			cell = addCell(summaryRow, 3, new Array(new Array("class", "green_bg_row2"), new Array("colSpan", "5")));
		} else {
			cell = addCell(summaryRow, 1, new Array(new Array("class", "red_bg_row2"), new Array("colSpan", "5")));
			cell = addCell(summaryRow, 2, new Array(new Array("class", "green_bg_row2"), new Array("colSpan", "5")), html);
		}

        	// calcul land loss ratio
		for( j=rows.length-3;j>rows.length-8; j--) {
			if(rows[j].cells[0].innerHTML.indexOf("Land Capture") != -1) {
			j++;
			for(; j < rows.length -2; j++) {
				landBefo = parseInt(rows[j].cells[4].innerHTML);
				landLoss = parseInt(rows[j].cells[6].innerHTML);
				rows[j].cells[6].className=rows[j].cells[6].className.substring(0,13)+" red";
				rows[j].cells[6].innerHTML = "<B>"+rows[j].cells[6].innerHTML+"</B>"+(isAttacker?"<br />":"&nbsp;")+"("+(100*landLoss/landBefo).toFixed(2)+"%)";
			}
			break;
		}
	}
		//
		// losses evaluation
		//
		var total = new Array(), losses = new Array();
		total[0] = total[1] = losses[0] = losses[1] = 0;
		function updateLosses(unit, cells, idx, isAtt) {
            		var a = cells[idx].firstChild;
            		if( !a ) return; // no figures in the BR for defenses on the attacker's side
			a = Number(a.textContent);
			var l = Number(cells[idx+1].firstChild.textContent);
			if( a == 0 ) return;
			cells[idx+1].title = Math.round(100*l/a) + '% (' + evoNumber2String(Math.abs(l) * (unit.metal + unit.mineral)) + ')';
			// take captures into account for the global stats
			total[isAtt] += (a + Number(cells[idx+3].firstChild.textContent)) * (unit.metal + unit.mineral);
			losses[isAtt] += (l + Number(cells[idx+2].firstChild.textContent)) * (unit.metal + unit.mineral);
		}
		for( j = 3; j < rows.length; j++ ) {
			unit = rows[j].cells[0].innerHTML.toLowerCase();
			if(unit == '') break;
			unit = units[unit];
			if(!unit) continue; // unknown unit?
			updateLosses(unit, rows[j].cells, 1, 0);
			updateLosses(unit, rows[j].cells, 6, 1);
		}
		battleReport.insertRow(j+2).innerHTML = '<TD class="row1 b"></TD><TD class="red_bg_row1 b">' + evoNumber2String(total[0]) + 
							'</TD><TD class="red_bg_row1 b red" colspan="4">' + evoNumber2String(losses[0]) + 
							' (' + (losses[0]==0?0:Math.round(100*losses[0]/total[0])) + '%)</TD>' + 
							'<TD class="green_bg_row1 b">' + evoNumber2String(total[1]) + 
							'</TD><TD class="green_bg_row1 b red" colspan="4">' + i
							evoNumber2String(losses[1]) + ' (' + (losses[1]==0?0:Math.round(100*losses[1]/total[1])) + '%)</TD>';
	}
}

//
// Rankings page
//
regPageHandler(/^\/rankings\/continent$/i, evoContRankings);

function evoContRankings() {
	var smin = Math.ceil(pScore * minAttack);
	var tmax = Math.floor(pScore / minAttack);
	var rankTable = document.evaluate(".//table[@class='t_little grey_bg']", contents, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	for( var j = 1; j < rankTable.rows.length; j++ ) {
		if( rankTable.rows[j].cells.length != 4 ) continue;
		score = rankTable.rows[j].cells[3];		
		target = evoString2Number(score.textContent);
		if( target < smin ) score.style.color = 'chocolate';
		else if( target > tmax ) score.style.color ='dodgerblue';
		else score.style.color = 'lime';
	}
}

//
// Notepad, for evo!
//
regPageHandler(null, evoNotepad);

function evoNotepad() {
	function toggleNotepad() {
		var np = document.getElementById("hide_notepad");
		if(np.style.visibility == 'hidden') np.style.visibility = 'visible';
		else np.style.visibility = 'hidden';
	}
	
	function saveNotepad() {
		GM_setValue('notepad', this.value);
	}
	
	function clearNotepad() {
		var np = this.nextSibling;
		if(confirm('Clear Scratch Pad?')) {
			np.value = '';
			GM_setValue('notepad', '');
		}
	}
	
	var helpMenu = document.evaluate("id('openhelppanel')", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	var nImg = document.createElement('IMG');
	nImg.src = "http://img91.imageshack.us/img91/3329/notepadpi6.png"
	nImg.style.marginLeft = '10px';
	nImg.style.cursor = 'pointer';
	
	nImg.addEventListener('click', toggleNotepad, false);
	
	helpMenu.parentNode.insertBefore(nImg, helpMenu.nextSibling);

	var nDiv = document.createElement('DIV');
	nDiv.id = 'hide_notepad';
	nDiv.style.width = '177px';
	nDiv.style.height = '580px';
	nDiv.style.position = 'absolute';
	nDiv.style.visibility = 'hidden';
	nDiv.style.top = '30px';
	nDiv.style.left = '820px';

	
	var hDiv = document.createElement('DIV');
	hDiv.style.textAlign = 'left';
	hDiv.style.fontSize = '12px';
	hDiv.style.fontFamily = 'Verdana';
	hDiv.style.fontWeight = 'bold';
	hDiv.style.padding = '2px 0px 2px 10px';
	hDiv.style.backgroundColor = 'limegreen';
	hDiv.style.color = 'white';
	hDiv.style.cursor = 'pointer';
	hDiv.innerHTML = 'Scratch Pad';
	
	hDiv.addEventListener('click', clearNotepad, false);
	
	nDiv.appendChild(hDiv);

	var ele = document.createElement('TEXTAREA');
	ele.style.backgroundColor = 'pink';
	ele.style.fontSize = '10px';
	ele.style.fontFamily = 'Verdana';
	ele.style.color = 'black';
	ele.cols = 29;
	ele.rows = 10;
	ele.id = 'notepad';
	ele.wrap = 'virtual';
	ele.value = GM_getValue('notepad', '');

	ele.addEventListener('blur', saveNotepad, false);

	nDiv.appendChild(ele);

	var tb = document.getElementById("userinfocontents");

	tb.appendChild(nDiv);
}

//
// ***************************************************************************
// ** CONFIG
// ***************************************************************************
//

GM_registerMenuCommand( "Configure boosts...", evoConfigBoosts, null, null, 'b' );
function evoConfigBoosts() {
	var n;
	if(( n = prompt( "Boosts for Natural Creatures?\n(e.g. 39.466250 for Nanotech. or 27.050 for Advanced Genetics)", 

boosts[UT_NATURAL] * 100 )) != null && !isNaN( n = Number( n ))) GM_setValue( 'boostNat', String( n / 100 ));
	if(( n = prompt( "Boosts for Archaeological Creatures?\n(e.g. 33.126875 for Nanotech. or 21.275 for Advanced Genetics)", boosts[UT_ENG]*100)) != null && !isNaN(n
 = Number( n ))) GM_setValue('boostEng', String( n / 100 ));
	alert( "Please reload the page for the changes to take effect." );
}

//
// ***************************************************************************
// ** MAIN
// ***************************************************************************
//
(function () {
	var totalPlayers = null;
	var match;
	var node;
	var panel;

	var profiler = Date.now();

	// Initialization
	// -----------------------------------------------------------------------
	// contents node
	//contents = document.getElementById("content");
	contents = document.getElementById('userinfo');

	// get out of the bloody forums message editor
	if( contents == null ) return;

	// initialize the units table
	evoUnitsInitialize();

	// grab player's available resources



  panel = document.getElementById("navstatus");
  if( panel != null ) {
    var match = new Array();
    resources = document.evaluate("//acronym[@class='resourceAcronym']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

    for( i = 0; resource = resources.snapshotItem(i); i++ )
    {
        match[resource.title] = resource.textContent.match(/[\d,]+/);
    }
    
    unsafeWindow.evo_plus['pMetal'] = pMetal = evoString2Number(String(match['Metal']));
    unsafeWindow.evo_plus['pMineral'] = pMineral = evoString2Number(String(match['Mineral']));
    unsafeWindow.evo_plus['pFood'] = pFood = evoString2Number(String(match['Food']));
    unsafeWindow.evo_plus['pGold'] = pGold = evoString2Number(String(match['Gold']));
    unsafeWindow.evo_plus['pScore'] =pScore = evoString2Number(String(match['Score']));
    
    }

   	// ranking
	panel = document.evaluate("//div[@id='panelinfo']/table/tbody/tr/td[2]/p", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	if( panel != null ) {
		match = panel.innerHTML.match(/<strong>[\s\S]*<\/strong>[\s\S]*<br><strong>[\s\S]*<\/strong>[\s]+([\d,]+)\s\S*\s([\d,]+)/);
		if( match != null ) {
			pRank = match[1];
			totalPlayers = match[2];
		}
	}
	// coords
	unsafeWindow.evo_plus.coords = GM_getValue(dEvo?'devoCoords':'evoCoords');

	// Dispatch
	// -----------------------------------------------------------------------
	for(var i = 0; i < pageHandlers.length; i++ ) {
		if( pageHandlers[i].urlRegEx == null || pageHandlers[i].urlRegEx.test(document.location.pathname) )
			pageHandlers[i].handler();
	}

	// THE evo+ bar
	// -----------------------------------------------------------------------
	node = document.createElement('DIV');
  node.style.textAlign="center";
	node.style.marginRight="5px";
	node.style.marginTop="3px";
	node.style.marginBottom="3px";

	function addItemToContent(c, text, className, html, isLastItem) {
		c.appendChild(document.createTextNode(text));
		var span = document.createElement('SPAN');
		span.className = className;
		if( isLastItem ) html += "&nbsp;|&nbsp;";
		span.innerHTML = html;
		c.appendChild(span);
	}

	addItemToContent(node, 'Rank: ', 't_normal b', pRank + "/" + totalPlayers, true);
	addItemToContent(node, 'Min. TargetScore: ', 't_normal b', evoNumber2String(Math.ceil(pScore * minAttack)), true);
	addItemToContent(node, 'Max. AttackerScore: ', 't_normal b', evoNumber2String(Math.floor(pScore / minAttack)), false);
	
        contents.parentNode.insertBefore(node, contents);

	node = document.createElement('DIV');
	node.style.color = "lawngreen";
	node.style.fontSize = "8pt"; node.style.fontWeight = "bold";
	node.style.paddingLeft = "55px"; node.style.paddingTop = "25px";
	node.style.position = "absolute";
	node.innerHTML = scriptversionID;
	node.title = scriptTag;
	node.id = "evomagik";
	panel = panel = document.evaluate("id('navstatus')/strong", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	panel.parentNode.insertBefore(node, panel);

	profiler = Date.now() - profiler;
//	GM_log('evo+ exec time: ' + profiler + ' ms');
}) ();

//
// ***************************************************************************
// ** Helper functions
// ***************************************************************************
//
function gcf(a,b) {
	while( b != 0 ) {
		t = a%b;
		a = b;
		b = t;
	}
	return a;
}

function evoLayoutChanged()
{ alert('Oops.. Page layout was not recognized, Neon probably changed the page :('); }

function evoNumber2String(num) {
	var re = /(\d+)(\d{3})/g;
	num = String(num);
	var decimalIdx = num.indexOf('.');
	var part1 = '1', part2="";
	if( decimalIdx != -1 ) {
		part1 = num.substring(0, decimalIdx);
		part2 = num.substring(decimalIdx + 1, num.length);
	} else
	{ part1 = num; }
	while( re.test(part1) ) part1 = part1.replace(re, '$1,$2');
	return part2 == "" ? part1 : part1 + "." + part2;
}

function evoString2Number(num)
{ return Number(num.replace(/,/g,'')); }

function evoFormatNumberZ(num, zeros) {
	var str = "0000" + Math.floor(Math.abs(num));
	return str.substr(-zeros);
}

//
// ***************************************************************************
// ** Objects
// ***************************************************************************

// evoUnit
function evoUnit(unitName, unitType, ticks, metal, mineral, attack, defense, intel, weight, defenseBoost, eats) {
	this.unitName = unitName;
	this.unitType = unitType;
	this.defense = defense;
	this.attack = attack;
	this.metal = metal;
	this.ticks = ticks;
	this.intel = intel;
	this.weight = weight;
	this.mineral = mineral;
	this.eats = eats;
	this.defenseBoost = defenseBoost/100 + 1;
	return this;
}

//
// Page Handler hooks
function pageHandler(urlRegEx, handler) {
	this.urlRegEx = urlRegEx;
	this.handler = handler;
}
function regPageHandler(urlRegEx, handler)
{ pageHandlers.push(new pageHandler(urlRegEx,  handler)); }

//
// ***************************************************************************
// ** MISC
// ***************************************************************************

// GM implementation of cookies :)
function evoSetCookie(name, value, hours) {
	GM_setValue('cv_' + name, value);
	var expire = new Date();
	expire.setUTCHours(expire.getUTCHours() + hours);
	GM_setValue('cx_' + name, expire.toGMTString());
}

function evoGetCookie(name) {
	var value = GM_getValue('cv_' + name);
	var expire = GM_getValue('cx_' + name);
	if( value != null && expire != null ) {
		expire = new Date(expire);
		if( expire.valueOf() >= Date.now() ) return value;
	}
	return null;
}

//
// ***************************************************************************
// ** Evo units stats
// ***************************************************************************
function evoUnitsInitialize() {
	evoUnit.prototype.getFoodCost = function(count)
	{ return this.eats?count * (this.mineral+this.metal)/100:0; }

	evoUnit.prototype.getAttackScore = function(count)
	{ return count * this.attack * this.attack; }

	evoUnit.prototype.getDefenseScore = function(count)
	{ return count * this.defense * this.defense * this.defenseBoost; }

	evoUnit.prototype.getMaxUnits = function (metal, mineral) {
		if( this.unitType == UT_NATURAL )
			return Math.min(Math.floor(metal / (this.metal * eeb)), Math.floor(mineral / (this.mineral * eeb)));
		else
			return Math.min(Math.floor(metal / this.metal), Math.floor(mineral / this.mineral));
	}

	evoUnit.prototype.getMetal = function()
	{ return this.unitType == UT_NATURAL ? (this.metal * eeb) : this.metal; }

	evoUnit.prototype.getMineral = function()
	{ return this.unitType == UT_NATURAL ? (this.mineral * eeb) : this.mineral; }

	evoUnit.prototype.getBoost = function()
	{ return boosts[this.unitType]; }

	evoUnit.prototype.getWeight = function()
	{ return this.weight; }

	if(! dEvo ) {
		units['monkey']           = new evoUnit('Monkey'           ,UT_NATURAL ,3   ,500    ,250    ,4   ,4   ,3   ,0 

 ,40 ,true);

		units['sheep']            = new evoUnit('Sheep'            ,UT_NATURAL ,4   ,1500   ,750    ,11  ,11  ,6   ,0 

 ,40 ,true);
		units['wolf']             = new evoUnit('Wolf'             ,UT_NATURAL ,10  ,8000   ,4000   ,27  ,25  ,14  ,0 

 ,40 ,true);
		units['python']           = new evoUnit('Python'           ,UT_NATURAL ,12  ,12500  ,5000   ,36  ,30  ,7   ,1 

 ,40 ,true);
		units['kangaroo']         = new evoUnit('Kangaroo'         ,UT_NATURAL ,15  ,15000  ,8000   ,36  ,40  ,5   ,1 

 ,40 ,true);
		units['walrus']           = new evoUnit('Walrus'           ,UT_NATURAL ,18  ,26000  ,13000  ,52  ,51  ,4   ,2 

 ,40 ,true);

		units['cow']              = new evoUnit('Cow'              ,UT_NATURAL ,6   ,2500   ,1250   ,16  ,13  ,3   ,1 

 ,40 ,true);
		units['hyena']            = new evoUnit('Hyena'            ,UT_NATURAL ,9   ,8800   ,3300   ,28  ,27  ,9   ,1 

 ,40 ,true);
		units['ostrich']          = new evoUnit('Ostrich'          ,UT_NATURAL ,12  ,18000  ,8000   ,42  ,44  ,6   ,2 

 ,40 ,true);
		units['bear']             = new evoUnit('Bear'             ,UT_NATURAL ,15  ,30000  ,15000  ,60  ,57  ,12  ,3 

 ,40 ,true);
		units['elephant']         = new evoUnit('Elephant'         ,UT_NATURAL ,19  ,42000  ,21000  ,72  ,75  ,22  ,4 

 ,40 ,true);

		units['horse']            = new evoUnit('Horse'            ,UT_NATURAL ,5   ,2000   ,1000   ,13  ,13  ,4   ,1 

 ,40 ,true);
		units['fox']              = new evoUnit('Fox'              ,UT_NATURAL ,9   ,7200   ,3200   ,24  ,25  ,8   ,0 

 ,40 ,true);
		units['puma']             = new evoUnit('Puma'             ,UT_NATURAL ,13  ,11000  ,5000   ,32  ,32  ,5   ,1 

 ,40 ,true);
		units['lynx']             = new evoUnit('Lynx'             ,UT_NATURAL ,15  ,12000  ,5500   ,35  ,31  ,8   ,1 

 ,40 ,true);
		units['lion']             = new evoUnit('Lion'             ,UT_NATURAL ,15  ,12000  ,5000   ,31  ,35  ,8   ,1 

 ,40 ,true);
		units['cheetah']          = new evoUnit('Cheetah'          ,UT_NATURAL ,16  ,14000  ,7000   ,41  ,29  ,5   ,1 

 ,40 ,true);
		units['panther']          = new evoUnit('Panther'          ,UT_NATURAL ,16  ,14000  ,8000   ,32  ,41  ,6   ,1 

 ,40 ,true);
		units['tiger']            = new evoUnit('Tiger'            ,UT_NATURAL ,20  ,18000  ,9000   ,44  ,43  ,11  ,2 

 ,40 ,true);
		units['rhino']            = new evoUnit('Rhino'            ,UT_NATURAL ,24  ,28000  ,17000  ,66  ,51  ,3   ,3 

 ,40 ,true);
        
		units['centaur']          = new evoUnit('Centaur'          ,UT_ENG     ,5   ,4800   ,2400   ,22  ,23  ,10  ,1 

 ,40 ,true);
		units['unicorn']          = new evoUnit('Unicorn'          ,UT_ENG     ,8   ,7500   ,3750   ,31  ,26  ,6   ,1 

 ,40 ,true);
		units['gryphon']          = new evoUnit('Gryphon'          ,UT_ENG     ,12  ,10500  ,5250   ,36  ,36  ,8   ,2 

 ,40 ,true);
		units['minotaur']         = new evoUnit('Minotaur'         ,UT_ENG     ,18  ,19000  ,9500   ,54  ,43  ,13  ,2 

 ,40 ,true);
		units['dragon']           = new evoUnit('Dragon'           ,UT_ENG     ,24  ,30000  ,15000  ,76  ,67  ,9   ,3 

 ,40 ,true);

		units['fire sprite']      = new evoUnit('Fire Sprite'      ,UT_ENG     ,4   ,5000   ,2500   ,25  ,18  ,4   ,0 

 ,40 ,true);
		units['salamander']       = new evoUnit('Salamander'       ,UT_ENG     ,7   ,9000   ,4500   ,36  ,26  ,10  ,1 

 ,40 ,true);
		units['phoenix']          = new evoUnit('Phoenix'          ,UT_ENG     ,10  ,14600  ,7300   ,44  ,37  ,6   ,1 

 ,40 ,true);
		units['wyvern']           = new evoUnit('Wyvern'           ,UT_ENG     ,15  ,25000  ,12500  ,64  ,43  ,7   ,2 

 ,40 ,true);
		units['demon']            = new evoUnit('Demon'            ,UT_ENG     ,20  ,34000  ,17000  ,93  ,58  ,5   ,3 

 ,40 ,true);

		units['dryad']            = new evoUnit('Dyrad'            ,UT_ENG     ,7   ,3600   ,2700   ,21  ,21  ,13  ,1 

 ,40 ,true);
		units['basilisk']         = new evoUnit('Baskilisk'        ,UT_ENG     ,10  ,5800   ,4350   ,29  ,24  ,21  ,1 

 ,40 ,true);
		units['medusa']           = new evoUnit('Medusa'           ,UT_ENG     ,15  ,10000  ,7500   ,37  ,34  ,15  ,1 

 ,40 ,true);
		units['cockatrice']       = new evoUnit('Cockatrice'       ,UT_ENG     ,21  ,18000  ,13500  ,54  ,45  ,23  ,2 

 ,40 ,true);
		units['werewolf']         = new evoUnit('Werewolf'         ,UT_ENG     ,28  ,26000  ,19500  ,70  ,64  ,30  ,2 

 ,40 ,true);

		units['avimimus']         = new evoUnit('Avimimus'         ,UT_ENG     ,4   ,3600   ,1800   ,22  ,17  ,2   ,1 

 ,40 ,true);
		units['therizinosaurus']  = new evoUnit('Therizinosaurus'  ,UT_ENG     ,6   ,5300   ,2650   ,26  ,22  ,3   ,1 

 ,40 ,true);
		units['styracosaurus']    = new evoUnit('Styracosaurus'    ,UT_ENG     ,8   ,9400   ,4700   ,33  ,35  ,8   ,2 

 ,40 ,true);
		units['carnotaurus']      = new evoUnit('Carnotaurus'      ,UT_ENG     ,11  ,15200  ,7600   ,51  ,41  ,5   ,3 

 ,40 ,true);
		units['giganotosaurus']   = new evoUnit('Giganotosaurus'   ,UT_ENG     ,14  ,24000  ,12000  ,75  ,56  ,4   ,4 

 ,40 ,true);

		units['scarab beetle']    = new evoUnit('Scarab Beetle'    ,UT_ENG     ,8   ,6000   ,3000   ,25  ,25  ,7   ,0 

 ,40 ,true);
		units['mummy']            = new evoUnit('Mummy'            ,UT_ENG     ,12  ,12000  ,6000   ,38  ,35  ,1   ,1 

 ,40 ,true);
		units['sta']              = new evoUnit('Sta'              ,UT_ENG     ,18  ,19000  ,9500   ,46  ,44  ,12  ,1 

 ,40 ,true);
		units['sphinx']           = new evoUnit('Sphinx'           ,UT_ENG     ,24  ,28000  ,14000  ,67  ,57  ,14  ,3 

 ,40 ,true);
		units['anubis incarnate'] = new evoUnit('Anubis Incarnate' ,UT_ENG     ,32  ,42000  ,21000  ,93  ,78  ,7   ,3 

 ,40 ,true);

      		units['fort']             = new evoUnit('Fort'             ,UT_NONE    ,4   ,2000   ,1000   ,24  ,42  ,0   ,0 

 ,40 ,false);
      		units['satellite']        = new evoUnit('Satellite'        ,UT_NONE    ,6   ,7000   ,3500   ,57  ,49  ,0   ,0 

 ,40 ,false);
      		units['satellite mark 2'] = new evoUnit('Satellite Mark 2' ,UT_NONE    ,6   ,8000   ,4000   ,57  ,65  ,0   ,0 

 ,40 ,false);
      		units['nanowire wall']    = new evoUnit('Nanowire wall'    ,UT_NONE    ,9   ,10000  ,4000   ,66  ,61  ,0   ,0 

 ,40 ,false);

		units['wave reflector']   = new evoUnit('Wave Reflector'   ,UT_NONE    ,4   ,2000   ,2000   ,0   ,0   ,0   ,0 

 ,0  ,false);
		units['superstealthwall'] = new evoUnit('superstealthwall' ,UT_NONE    ,21  ,15000  ,6000   ,0   ,0   ,0   ,0 

 ,0  ,false);

		units['biochemical missile']     = new evoUnit('Biochemical Missile' ,UT_NONE ,12  ,10000  ,20000  ,0   ,0   

,0   ,0  ,0  ,false);
		units['nanovirus missile']       = new evoUnit('Nanovirus Missile' ,UT_NONE    ,12  ,30000  ,15000  ,0   ,0   

,0   ,0  ,0  ,false);
		units['bombs']                   = new evoUnit('Bombs'            ,UT_NONE    ,12  ,11000  ,7000   ,0   ,0   

,0   ,0  ,0  ,false);
		units['neural reorganiser bomb'] = new evoUnit('Neural Reorganiser Bomb' ,UT_NONE    ,24    ,50000   ,32000 

,0  ,0   ,0   ,0  ,0  ,false);
		units['poison bombs']            = new evoUnit('Poison Bombs'     ,UT_NONE    ,16  ,16000  ,12000  ,0   ,0   

,0   ,0  ,0  ,false);

		units['land scan']        = new evoUnit('Land Scan'        ,UT_NONE    ,4   ,1000   ,2000   ,0   ,0   ,0   ,0 

 ,0  ,false);
		units['scan amplifier']   = new evoUnit('Scan Amplifier'   ,UT_NONE    ,4   ,1000   ,1000   ,0   ,0   ,0   ,0 

 ,0  ,false);
		units['sector scan']      = new evoUnit('Sector Scan'      ,UT_NONE    ,8   ,2000   ,4000   ,0   ,0   ,0   ,0 

 ,0  ,false);
		units['creature scan']    = new evoUnit('Creature Scan'    ,UT_NONE    ,8   ,3000   ,6000   ,0   ,0   ,0   ,0 

 ,0  ,false);
		units['r&d scan']         = new evoUnit('R&D Scan'         ,UT_NONE    ,6   ,2000   ,3000   ,0   ,0   ,0   ,0 

 ,0  ,false);
		units['news scan']        = new evoUnit('News Scan'        ,UT_NONE    ,18  ,10000  ,20000  ,0   ,0   ,0   ,0 

 ,0  ,false);
		units['military scan']    = new evoUnit('Military Scan'    ,UT_NONE    ,12  ,6000   ,12000  ,0   ,0   ,0   ,0 

 ,0  ,false);
		units['microwave pulse']  = new evoUnit('Microwave Pulse'  ,UT_NONE    ,20  ,520000  ,1040000  ,0   ,0   ,0   

,0  ,0  ,false);
		units['overload pulse']   = new evoUnit('Overload Pulse'   ,UT_NONE    ,24  ,1600000  ,3200000  ,0   ,0   ,0  

 ,0  ,0  ,false);
		units['spy']              = new evoUnit('spy'              ,UT_NONE    ,24  ,1000000  ,500000  ,0   ,0   ,0   

,0  ,0  ,false);
		units['guerrilla ']        = new evoUnit('guerrilla'        ,UT_NONE    ,24  ,3000000  ,4500000  ,0   ,0   ,0  

 ,0  ,0  ,false);
	} else {
		// DEVO Stats
		units['monkey']           = new evoUnit('Monkey'           ,UT_NATURAL ,4   ,500    ,250    ,5   ,5   ,4   ,0 

 ,40 ,true);

		units['sheep']            = new evoUnit('Sheep'            ,UT_NATURAL ,4   ,1500   ,750    ,11  ,11  ,5   ,0 

 ,40 ,true);
		units['wolf']             = new evoUnit('Wolf'             ,UT_NATURAL ,10  ,8000   ,3500   ,27  ,25  ,14  ,0 

 ,40 ,true);
		units['python']           = new evoUnit('Python'           ,UT_NATURAL ,12  ,12500  ,5000   ,36  ,31  ,7   ,1 

 ,40 ,true);
		units['kangaroo']         = new evoUnit('Kangaroo'         ,UT_NATURAL ,15  ,17000  ,8000   ,37  ,42  ,5   ,1 

 ,40 ,true);
		units['walrus']           = new evoUnit('Walrus'           ,UT_NATURAL ,18  ,28000  ,14000  ,53  ,54  ,4   ,2 

 ,40 ,true);

		units['horse']            = new evoUnit('Horse'            ,UT_NATURAL ,5   ,2000   ,1000   ,13  ,13  ,6   ,1 

 ,40 ,true);
		units['fox']              = new evoUnit('Fox'              ,UT_NATURAL ,9   ,7200   ,3200   ,24  ,25  ,8   ,0 

 ,40 ,true);
		units['puma']             = new evoUnit('Puma'             ,UT_NATURAL ,13  ,11000  ,5000   ,32  ,32  ,6   ,1 

 ,40 ,true);
		units['lynx']             = new evoUnit('Lynx'             ,UT_NATURAL ,15  ,12000  ,5500   ,35  ,31  ,10  ,1 

 ,40 ,true);
		units['lion']             = new evoUnit('Lion'             ,UT_NATURAL ,15  ,12000  ,5000   ,31  ,35  ,10  ,1 

 ,40 ,true);
		units['cheetah']          = new evoUnit('Cheetah'          ,UT_NATURAL ,16  ,14000  ,7000   ,41  ,29  ,5   ,1 

 ,40 ,true);
		units['panther']          = new evoUnit('Panther'          ,UT_NATURAL ,16  ,14000  ,7000   ,30  ,40  ,6   ,1 

 ,40 ,true);
		units['tiger']            = new evoUnit('Tiger'            ,UT_NATURAL ,20  ,18000  ,9000   ,43  ,43  ,11  ,2 

 ,40 ,true);
		units['rhino']            = new evoUnit('Rhino'            ,UT_NATURAL ,24  ,28000  ,17000  ,66  ,53  ,3   ,3 

 ,40 ,true);

		units['cow']              = new evoUnit('Cow'              ,UT_NATURAL ,6   ,4500   ,2500   ,16  ,8   ,7   ,1 

 ,40 ,true);
		units['hyena']            = new evoUnit('Hyena'            ,UT_NATURAL ,10  ,8800   ,3600   ,28  ,27  ,8   ,1 

 ,40 ,true);
		units['ostrich']          = new evoUnit('Ostrich'          ,UT_NATURAL ,13  ,18000  ,8000   ,43  ,41  ,6   ,2 

 ,40 ,true);
		units['bear']             = new evoUnit('Bear'             ,UT_NATURAL ,16  ,26000  ,13000  ,57  ,50  ,12  ,3 

 ,40 ,true);
		units['elephant']         = new evoUnit('Elephant'         ,UT_NATURAL ,22  ,40000  ,20000  ,65  ,69  ,21  ,4 

 ,40 ,true);

		units['centaur']          = new evoUnit('Centaur'          ,UT_ENG     ,5   ,4000   ,2400   ,22  ,23  ,10  ,1 

 ,40 ,true);
		units['unicorn']          = new evoUnit('Unicorn'          ,UT_ENG     ,8   ,7200   ,3600   ,30  ,25  ,6   ,1 

 ,40 ,true);
		units['minotaur']         = new evoUnit('Minotaur'         ,UT_ENG     ,12  ,10800  ,5400   ,36  ,35  ,8   ,2 

 ,40 ,true);
		units['gryphon']          = new evoUnit('Gryphon'          ,UT_ENG     ,18  ,19000  ,9500   ,54  ,43  ,14  ,2 

 ,40 ,true);
		units['dragon']           = new evoUnit('Dragon'           ,UT_ENG     ,24  ,30000  ,10500  ,76  ,67  ,8   ,3 

 ,40 ,true);

		units['fire sprite']      = new evoUnit('Fire Sprite'      ,UT_ENG     ,5   ,5000   ,2500   ,25  ,18  ,4   ,0 

 ,40 ,true);
		units['salamander']       = new evoUnit('Salamander'       ,UT_ENG     ,7   ,9000   ,4500   ,36  ,26  ,10  ,1 

 ,40 ,true);
		units['phoenix']          = new evoUnit('Phoenix'          ,UT_ENG     ,12  ,14600  ,7300   ,44  ,35  ,6   ,1 

 ,40 ,true);
		units['wyvern']           = new evoUnit('Wyvern'           ,UT_ENG     ,14  ,25000  ,17500  ,69  ,45  ,7   ,2 

 ,40 ,true);
		units['demon']            = new evoUnit('Demon'            ,UT_ENG     ,21  ,36000  ,18000  ,96  ,60  ,5   ,3 

 ,40 ,true);

		units['dryad']            = new evoUnit('Dryad'            ,UT_ENG     ,6   ,3600   ,2700   ,21  ,21  ,13  ,1 

 ,40 ,true);
		units['basilisk']         = new evoUnit('Basilisk'         ,UT_ENG     ,9   ,6000   ,4500   ,29  ,24  ,21  ,1 

 ,40 ,true);
		units['medusa']           = new evoUnit('Medusa'           ,UT_ENG     ,15  ,10000  ,7500   ,37  ,34  ,15  ,1 

 ,40 ,true);
		units['cockatrice']       = new evoUnit('Cockatrice'       ,UT_ENG     ,20  ,18000  ,13500  ,54  ,45  ,23  ,2 

 ,40 ,true);
		units['werewolf']         = new evoUnit('Werewolf'         ,UT_ENG     ,26  ,28000  ,18500  ,71  ,65  ,30  ,2 

 ,40 ,true);

		units['avimimus']         = new evoUnit('Avimimus'         ,UT_ENG     ,5   ,3700   ,1850   ,22  ,17  ,2   ,1 

 ,40 ,true);
		units['therizinosaurus']  = new evoUnit('Therizinosaurus'  ,UT_ENG     ,7   ,5000   ,2500   ,23  ,22  ,3   ,1 

 ,40 ,true);
		units['styracosaurus']    = new evoUnit('Styracosaurus'    ,UT_ENG     ,13  ,9000   ,4500   ,32  ,41  ,8   ,2 

 ,40 ,true);
		units['carnotaurus']      = new evoUnit('Carnotaurus'      ,UT_ENG     ,15  ,15000  ,7500   ,48  ,55  ,5   ,3 

 ,40 ,true);
		units['giganotosaurus']   = new evoUnit('Giganotosaurus'   ,UT_ENG     ,20  ,24000  ,12000  ,74  ,58  ,4   ,4 

 ,40 ,true);

		units['scarab beetle']    = new evoUnit('Scarab Beetle'    ,UT_ENG     ,8   ,6000   ,3000   ,26  ,23  ,7   ,0 

 ,40 ,true);
		units['mummy']            = new evoUnit('Mummy'            ,UT_ENG     ,12  ,11000  ,5500   ,36  ,34  ,1   ,0 

 ,40 ,true);
		units['sta']              = new evoUnit('Sta'              ,UT_ENG     ,18  ,18000  ,9000   ,45  ,42  ,12  ,1 

 ,40 ,true);
		units['sphinx']           = new evoUnit('Sphinx'           ,UT_ENG     ,22  ,28000  ,14000  ,67  ,56  ,4   ,3 

 ,40 ,true);
		units['anubis incarnate'] = new evoUnit('Anubis Incarnate' ,UT_ENG     ,32  ,42000  ,21000  ,93  ,78  ,8   ,3 

 ,40 ,true);

		units['fort']             = new evoUnit('Fort'             ,UT_NONE    ,4   ,2000   ,1000   ,25  ,40  ,0   ,0 

 ,215 ,false);
		units['satellite']        = new evoUnit('Satellite'        ,UT_NONE    ,6   ,8000   ,4000   ,30  ,35  ,0   ,0 

 ,215 ,false);
		units['nanowire wall']    = new evoUnit('Nanowire wall'    ,UT_NONE    ,10  ,12000  ,4500   ,65  ,65  ,0   ,0 

 ,215 ,false);
		units['satellite mark 2'] = new evoUnit('Satellite Mark 2' ,UT_NONE    ,6   ,8000   ,4000   ,35  ,45  ,0   ,0 

 ,215 ,false);

		units['wave reflector']   = new evoUnit('Wave Reflector'   ,UT_NONE    ,4   ,2000   ,2000   ,0   ,0   ,0   ,0 

 ,0  ,false);
		units['superstealthwall'] = new evoUnit('superstealthwall' ,UT_NONE    ,21  ,15000  ,6000   ,0   ,0   ,0   ,0 

 ,0  ,false);

		units['biochemical missile']     = new evoUnit('Biochemical Missile' ,UT_NONE ,12  ,10000  ,20000  ,0   ,0   

,0   ,0  ,0  ,false);
		units['nanovirus missile']       = new evoUnit('Nanovirus Missile' ,UT_NONE    ,12  ,30000  ,15000  ,0   ,0   

,0   ,0  ,0  ,false);
		units['bombs']                   = new evoUnit('Bombs'            ,UT_NONE    ,12  ,11000  ,7000   ,0   ,0   

,0   ,0  ,0  ,false);
		units['neural reorganiser bomb'] = new evoUnit('Neural Reorganiser Bomb' ,UT_NONE    ,24    ,50000   ,32000 

,0  ,0   ,0   ,0  ,0  ,false);
		units['poison bombs']            = new evoUnit('Poison Bombs'     ,UT_NONE    ,16  ,16000  ,12000  ,0   ,0   

,0   ,0  ,0  ,false);

		units['land scan']        = new evoUnit('Land Scan'        ,UT_NONE    ,4   ,1000   ,2000   ,0   ,0   ,0   ,0 

 ,0  ,false);
		units['scan amplifier']   = new evoUnit('Scan Amplifier'   ,UT_NONE    ,4   ,1000   ,1000   ,0   ,0   ,0   ,0 

 ,0  ,false);
		units['sector scan']      = new evoUnit('Sector Scan'      ,UT_NONE    ,8   ,2000   ,4000   ,0   ,0   ,0   ,0 

 ,0  ,false);
		units['creature scan']    = new evoUnit('Creature Scan'    ,UT_NONE    ,8   ,3000   ,6000   ,0   ,0   ,0   ,0 

 ,0  ,false);
		units['r&d scan']         = new evoUnit('R&D Scan'         ,UT_NONE    ,6   ,2000   ,3000   ,0   ,0   ,0   ,0 

 ,0  ,false);
		units['news scan']        = new evoUnit('News Scan'        ,UT_NONE    ,18  ,10000  ,20000  ,0   ,0   ,0   ,0 

 ,0  ,false);
		units['military scan']    = new evoUnit('Military Scan'    ,UT_NONE    ,12  ,6000   ,12000  ,0   ,0   ,0   ,0 

 ,0  ,false);
		units['microwave pulse']  = new evoUnit('Microwave Pulse'  ,UT_NONE    ,20  ,520000  ,1040000  ,0   ,0   ,0   

,0  ,0  ,false);
		units['overload pulse']   = new evoUnit('Overload Pulse'   ,UT_NONE    ,24  ,1600000  ,3200000  ,0   ,0   ,0  

 ,0  ,0  ,false);
		units['spy']              = new evoUnit('spy'              ,UT_NONE    ,24  ,1000000  ,500000  ,0   ,0   ,0   

,0  ,0  ,false);
		units['guerrilla ']        = new evoUnit('guerrilla'        ,UT_NONE    ,24  ,3000000  ,4500000  ,0   ,0   ,0  

 ,0  ,0  ,false);
	}
	unsafeWindow.evo_plus['units'] = units;
}

GM_log("evo+ Finished");