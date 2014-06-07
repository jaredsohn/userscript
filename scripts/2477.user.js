// ==UserScript==
// @name			evo+
// @version			2.4.0
// @namespace		http://wildservices.net/userscripts
// @description		Enchances evo game :-)
// @include			http://ev5.neondragon.net/*
// @include			http://evo-dev.neondragon.net/*
// @author			~ravenlord~ (r4v3n10rd@gmail.com) - original 1.0x source
// @author			HETMAN (kanarinios@gmail.com) - upgrades
// @author			mindfox & Fire - upgrades
// @author			MadFrog (mbfrog@gmail.com)
// @author			Roland
// @author			WhyteWolf (whytewolf1@gmail.com)
// @author			Gavry
// @author			Ressol
// ==/UserScript==

/*
 * $Id: evoplus.user.js,v 1.19 2006/07/01 20:55:50 madfrog Exp $
 *
 * $Log: evoplus.user.js,v $
 * Revision 1.19  2006/07/01 20:55:50  madfrog
 * Added a quick "add to buddies" link to the alliance members pages
 *
 * Revision 1.18  2006/06/29 18:26:41  madfrog
 * Updated dEvo stats
 * The allocated % on the Sector Scan was not taking the food into account
 * Optimized parsing on the Sector Scan
 *
 * Revision 1.17  2006/06/22 23:57:46  madfrog
 * Saving the Efficient Breeding Center coefficient as float was breaking GM
 * Removed an unused configuration item (for the scan page)
 *
 * Revision 1.16  2006/06/22 23:14:53  madfrog
 * Implemented changes from Ressol:
 * Sector Scan: Max/min attacker score in scan result.
 * Sector Scan: Allocated land ratio and estimated land defense.
 * Sector Scan: Number formatting / fields colorful.
 * Creature Scan: Estimated creatures launch cost.
 * Battle Report: Add land loss ratio in defense side.
 * Alliances Page: Add average member score
 *
 * Revision 1.15  2006/06/22 19:59:32  madfrog
 * Enabled the use of plugin scripts
 * Efficient Breeding Center setting is now saved in a GM_Variable (useful?)
 * Fixed a typo (Archological path)
 * Moved all utility functions at the bottom
 *
 * Revision 1.14  2006/06/21 22:39:17  madfrog
 * Fixed a problem with Efficient Breeding Center on the create page
 *
 * Revision 1.13  2006/03/17 17:12:38  madfrog
 * Fixed a problem with the land ratio calculator that caused an infinite loop
 *
 * Revision 1.12  2006/03/09 22:00:36  madfrog
 * removed a [NOD] tag from the script name :P
 *
 * Revision 1.11  2006/03/09 11:47:02  madfrog
 * added automatic handling ot the evo-dev.neondragon.net URL
 * forgot to credit Hemna for the evo-dev critter stats
 *
 * Revision 1.10  2006/03/09 01:55:06  madfrog
 * added support for evo-dev (5 mns ticks and creature stats - thanks to [BT]Hemna)
 * added support for the Efficient Breeding center on on the create page
 * fixed problems on the news page (NaNs on the BRs. /0 is innocent ;))
 * added average land per alliance member on the alliance ranking page (Gavry)
 *
 * Revision 1.9  2006/02/19 17:13:30  madfrog
 * Corrected a bug in the cost evaluation of losses (it broke with defenses like forts)
 * Removed a couple of NaNs caused by a div by zero (pun intended)
 *
 * Revision 1.8  2006/02/17 18:56:39  madfrog
 * Simplified land ratio on the resources page
 * Disabled land grab stats if defending
 * Added cost evaluation of losses on battle reports
 * Version bump
 *
 * Revision 1.7  2006/02/09 18:35:52  madfrog
 * Adapted to the new user interface
 *
 * Revision 1.6  2006/02/02 13:19:33  whytewolf
 * minor cost fix for OP and MP costs
 * also spelling correction
 *
 * Revision 1.5  2006/02/01 19:56:01  madfrog
 *
 * Implemented Maximum possible boosts (for scans, affected by previous change) separated from the players's boosts (for create and fleets).
 * Hooked the boost configuration to a menu command.
 * A bit of code cleanup in the land ratio display.
 * Better tooltip information in the scans att2/def2 evaluations.
 *
 * Revision 1.4  2006/01/31 22:56:12  whytewolf
 *
 * typo correction and version bump
 * and version change to include magor.minor.bug
 *
 * Revision 1.3  2006/01/31 22:42:36  whytewolf
 *
 * added land ratio function
 * and MaxBoost Configureation
 *
 * Revision 1.2  2006/01/30 16:19:18  madfrog
 * Added land grab stats on the news page (from Roland's)
 *
 * Revision 1.1  2006/01/30 13:21:09  madfrog
 * First 2.0 version. Almost complete rewrite of the 1.x series with some addtional features.
 *
*/

// ***************************************************************************
// ** Global Variables
// ***************************************************************************

const scriptversion = '2.4.0';
const scriptversionID = 'evo+ ' + scriptversion;
const scriptTag = 'Armageddon';
GM_log(scriptversionID + " start");

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
maxBoosts[UT_NONE]		= 0;
maxBoosts[UT_NATURAL]	= 0.3946625;  //max boost for natural
maxBoosts[UT_ENG]		= 0.33126875; //max boost for eng
unsafeWindow.evo_plus['maxBoosts'] = maxBoosts;

// user current boosts
var boosts = new Array();
boosts[UT_NONE]		= 0;
boosts[UT_NATURAL]	= Number(GM_getValue('boostNat', maxBoosts[UT_NATURAL]));
boosts[UT_ENG]		= Number(GM_getValue('boostEng', maxBoosts[UT_ENG]));
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
// Add stuff to the scans and create pages
//
regPageHandler(/^\/create/i, function () { evoCreate(1); evoCreate(2); evoCreate(3); });
regPageHandler(/^\/scans/i,  function () { evoCreate(1); });
// handle each creation table
function evoCreate(tableID) {
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
			span.style.color = createDataArray[i].isTooMuch ? 'red' : '#CCCCCC';
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
		cell.innerHTML = '<span title="Unboosted: ' + base + '">' + (base*boost).toFixed(1)
			+ '</span><br /><span class="t_enormous" title="Unboosted: ' + square + '">' + (square*boost*boost).toFixed(0)
			+ '</span><br /><span title="Unboosted: ' + evoNumber2String(value) + '">' + evoNumber2String((value*boost*boost).toFixed(0)) + '</span>';
	}
	//
	// main
	//
	var unit, cell, unitCost, row;
	var table = null;
	var isScanPage = document.location.pathname == '/scans';
	var xPathTerm = ".//div[@class='"+(dEvo?"separator title":"title")+"'";
	if( isScanPage) 
		xPathTerm = xPathTerm+ "][3]/following-sibling::table[1]";
	else 
		xPathTerm = xPathTerm + "]["+tableID+"]/following-sibling::table[1]";

	table = document.evaluate(xPathTerm, contents, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	if(table == null) return;

	var showstats = !isScanPage && (tableID == 1 || tableID == 2);

	// Efficient breeding center?
	if( showstats && tableID == 1 ) {
		var monkey =  document.evaluate(".//tbody/tr/td[2][./a/span[@class='b' and text()='Monkey']]/text()",
							table, null, XPathResult.STRING_TYPE, null).stringValue;
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
		addHeader(4, 'Attack/<br /><strong>Attack<sup>2</sup></strong>/<br /><span title="Att2 per 100,000 resources (metal + mineral)">per 100K</span>');
		addHeader(5, 'Defense/<br /><strong>Defense<sup>2</sup></strong>/<br /><span title="Def2 per 100,000 resources (metal + mineral)">per 100K</span>');
		addHeader(6, 'Total/<br /><strong>Total<sup>2</sup></strong>/<br /><span title="Att2+Def2 per 100,000 resources (metal + mineral)">per 100K</span>');
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
	var searchKey = dEvo ? "separator title":"title";
	now.setUTCMinutes(now.getUTCMinutes() - now.getUTCMinutes() % tick);

	// let's try to grab the player's coords
	node = document.evaluate(".//span[preceding-sibling::span[@class='t_medium b' and text()='Status of continent']]",
							 contents, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	if( node != null && (match = node.innerHTML.match(/(\d*?),(\d*?),(\d*?):\w/)) ) {
		GM_setValue(dEvo?'devoCoords':'evoCoords', match[0]);
		unsafeWindow.evo_plus.coords = match[0];
	} else
		GM_log("Unable to find your coordinates :(", 1);

	// look for the fleets status table and show the ETA
	node = document.evaluate('.//div[@class="'+searchKey+'" and contains(., "Fleets\' status")]/following-sibling::div[1]/table', contents, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
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
					node.rows[i].cells[4].textContent = evoFromatNumberZ(eta.getUTCHours(),2) + ":" + evoFromatNumberZ(eta.getUTCMinutes(),2) + " GMT";
				}
			}
		}
	}

	// Same for the R&D
	var nodes = document.evaluate(".//div[@class='alt2 t_little' and preceding-sibling::div[@class='"+searchKey+"' and starts-with(.,'Currently')]]",
			contents, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if( !dEvo ) {
		for( i = 0; node = nodes.snapshotItem(i); i++ ) {
			node.innerHTML = node.innerHTML.replace(/(\d+)% \((\d+)\/(\d+) ticks\) complete\./,
					function(str, p1, p2, p3, offset, s) {
						var minutes = (Number(p3) - Number(p2)) * tick;
						var eta = new Date(now.valueOf() + (minutes * 60000));
						return p1 + '% (' + p2 + '/' + p3 + ' ticks) complete - ETA: ' + evoFromatNumberZ(eta.getUTCHours(),2) + ":" + evoFromatNumberZ(eta.getUTCMinutes(),2) + " GMT" + (minutes > 1440 ? ' (+' + Math.floor(minutes/1440) + ' day' + ( minutes >= 2880 ? 's' : '' ) + ')' : '');
					});
			}
	} else {
		for( i = 0; node = nodes.snapshotItem(i); i++ ) {
			node.innerHTML = node.innerHTML.replace(/(\d+)% \((\d+)\/(\d+)\) complete\./,
					function(str, p1, p2, p3, offset, s) {
						var minutes = (Number(p3) - Number(p2)) * tick;
						var eta = new Date(now.valueOf() + (minutes * 60000));
						return p1 + '% (' + p2 + '/' + p3 + ') complete - ETA: ' + evoFromatNumberZ(eta.getUTCHours(),2) + ":" + evoFromatNumberZ(eta.getUTCMinutes(),2) + " GMT" + (minutes > 1440 ? ' (+' + Math.floor(minutes/1440) + ' day' + ( minutes >= 2880 ? 's' : '' ) + ')' : '');
					});	
		}
	}

	// same for the creatures and stuff
	if( !dEvo)
		nodes = document.evaluate(".//div[@class='alt2 t_little' and preceding-sibling::div[@class='title' and text()='Current Production']]/table/tbody/tr[count(td)=3]",
			contents, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	else
		nodes = document.evaluate(".//div[@class='separator title']/following-sibling::div[@class='alt2 t_little']/table/tbody/tr[count(td)=3]",
			contents, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for( i = 0; node = nodes.snapshotItem(i); i++ ) {
		// add a column
		node.insertCell(3);
		if( match = /\d+% complete, (\d+) ticks remain/.exec(node.cells[2].textContent) ) {
			var eta = new Date(now.valueOf() + (Number(match[1]) * tick * 60000));
			node.cells[3].textContent = evoFromatNumberZ(eta.getUTCHours(),2) + ":" + evoFromatNumberZ(eta.getUTCMinutes(),2) + " GMT";
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
			} else if( match = /(\d+) creatures (DEFENDING|ATTACKING) .* - (\d+) tick/.exec(nodes[i].innerHTML) ) {
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
}

//
// restores the land cost display on the resources page
//
regPageHandler(/^\/resources\/overview/i,  evoResources);
function evoResources() {
	var resourcetable = document.evaluate(".//table[@class='t_little' and preceding-sibling::div[@class='title' and text()='Land']]",
								   contents, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	evoLandRatio();

	if( resourcetable ) {
		// do we have the graphic?
		if( resourcetable.rows[0].cells[0].innerHTML == 'Unused Land' ) return;

		// get current amount of allocated
		var land = Number(resourcetable.rows[1].cells[1].innerHTML) + Number(resourcetable.rows[2].cells[1].innerHTML) + Number(resourcetable.rows[3].cells[1].innerHTML);

		// onclick function....
		showAllocCost = function(e) {
			var parent = this.parentNode;
			this.style.cursor = 'auto';
			this.style.textDecoration = "none";
			if( parent.nextSibling != null ) return;
			parent = parent.parentNode;
			var elm = document.createElement('IMG');
			elm.src = 'http://ev5.neondragon.net/graphs/land.php?land=' + land;
			parent.appendChild(elm);
			elm = document.createElement('BR');
			parent.appendChild(elm);
			elm = document.createElement('SPAN');
			elm.className = 't_little';
			elm.innerHTML = '<SPAN class="red">Red</SPAN> values are the costs in metal to initiate the number of land on the x axis.';
			parent.appendChild(elm);
		};

		var elm = document.createElement('DIV');
		var span = document.createElement('SPAN');
		elm.className = "title";
		span.innerHTML = 'Land Initiation Cost';
		span.style.textDecoration = "underline";
		span.style.cursor = "pointer";
		span.addEventListener('click',showAllocCost, false);
		elm.appendChild(span);
		resourcetable.parentNode.appendChild(elm);
	}
	function evoLandRatio() {
		var fields = resourcetable.rows.length;
		var food = Number(evoString2Number(resourcetable.rows[fields - 1].cells[1].textContent));
		var mineral = Number(evoString2Number(resourcetable.rows[fields - 2].cells[1].textContent));
		var metal = Number(evoString2Number(resourcetable.rows[fields - 3].cells[1].textContent));
		if( isNaN(food) || isNaN(mineral) || isNaN(metal) ) return;
		var gcd = gcf(gcf(metal,mineral),food);
		metal = metal / gcd;
		mineral = mineral / gcd;
		food = food / gcd;
		var row = resourcetable.insertRow(fields);
		row.className = 'row2';
		node = row.insertCell(0);
		node.innerHTML = 'Ratio';
		node.className = 'alt1 b';
		node.style.textAlign = 'right';
		node = row.insertCell(1);
		node.innerHTML = metal + ':' + mineral + ':' + food;
		node.style.textAlign = 'center';
		// give approx. ratio with: 1 <= food <= 2
		if( food > 2 && food < metal && food < mineral ) {
			gcd = Math.pow(2, Math.floor(Math.log(food) / Math.log(2))) // divider
			gcd = food / (food = Math.round(food / gcd)); // refine the divider
			metal = Math.round(metal / gcd);
			mineral = Math.round(mineral / gcd);
			gcd = gcf(gcf(metal,mineral),food);
			food /= gcd;
			mineral /= gcd;
			metal /= gcd;
			node = row.insertCell(2);
			node.innerHTML = '(~' + metal + ':' + mineral + ':' + food + ')';
			node.style.textAlign = 'center';
			node = row.insertCell(3);
			node.colSpan = 2;
		} else {
			node = row.insertCell(2);
			node.colSpan = 3;
		}
	}
}

//
// Alliances page
//
// @FIXME: optimize the below. I initially used a snapshot of each row because i ran into problems
// can't remember what though :(
//
if( !dEvo ) regPageHandler(/^\/alliances$/i,  evoAlliances);
function evoAlliances() {
	var row;
	var rows = document.evaluate(".//table/tbody[tr/td[text()='Alliance Name']]/tr[count(td)=5]",
								   contents, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for(var i = 1; row = rows.snapshotItem(i); i++) {
		row.cells[3].innerHTML = evoNumber2String(row.cells[3].textContent) + "<br><font color='#AAAAFF'>"+ evoNumber2String(Math.ceil(evoString2Number(row.cells[3].textContent)/evoString2Number(row.cells[2].textContent)))+"</font>";
		row.cells[3].style.textAlign = "right";
		row.cells[3].style.padding = "0 2px 0 2px";
	}
}

//
// Alliance members
//
regPageHandler(/^\/alliances\/members/i, evoAllianceMembers);
function evoAllianceMembers() {
	var smin = Math.ceil(pScore * 0.35);
	var tmax = Math.floor(pScore / 0.35);
	var tab = document.evaluate(".//table[tbody/tr/td[text()='Ruler of Continent Name']]", contents, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	var nbr = 0;
	var sums1 = 0;
	if(tab != null) {
		for(var i=1; i < tab.rows.length; i++) {
			var str = tab.rows[i].cells[2].innerHTML;
			var g2 =  evoString2Number(str);
			var cell2 = tab.rows[i].cells[2];
			sums1 = sums1 + g2;
			cell2.style.textAlign = 'right';
			if( g2 < smin ) cell2.style.color = '#CC4411';
			else if( g2 > tmax ) { cell2.style.color = '#0000FF'; nbr++; }
			else { cell2.style.color = '#00FF00'; nbr++; }
		}
		var g3=evoNumber2String(sums1);
		tab.rows[0].cells[2].innerHTML = tab.rows[0].cells[2].innerHTML +'<font color="#00FF00"> '+ g3 + '</font><BR>Targets for me: <font color="#00FF00">' + nbr + '</font>';
	} else
		return;

	var count = 0;

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
				if(! (br = node.parentNode.nextSibling) )
					td.appendChild(document.createElement('br'));
				else
					br.nextSibling.textContent += ' ';
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
	var smin = Math.ceil(pScore * 0.35);
	var tmax = Math.floor(pScore / 0.35);

	var table = document.getElementById('cont_list');
	if( table != null ) {
		// let's add some color and look for potential targets ;)
		for(var i=2; i < table.rows.length; i++) {
			if( table.rows[i].cells.length < 4 )
				continue;

			var cell1 = table.rows[i].cells[1];
			var cell3 = table.rows[i].cells[3];
			var target = evoString2Number(cell3.innerHTML);

			if( target < smin )
				cell3.style.color = '#CC4411';
			else if( target > tmax )
				cell3.style.color ='#0000FF';
			else
				cell3.style.color = '#00FF00';
		}
		var git = document.evaluate(".//table[tbody/tr[1]/td[1][text() = 'Key']]", contents, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
		if( git != null ) {
			var d = git.insertRow(4);
			d.className = "lightblue_bg_row2";
			d.innerHTML = '<td>Text colours:</td><td colspan="3" align="center"><font color="#FFFFFF">White</font> name of continent shows that this person is online<BR><font color="#C4C4C4">Gray</font> name of continent shows that this person is offline<BR><font color="#646464">Dark gray</font> name shows that person is offline from more than week</td>';
			var c = git.insertRow(5);
			c.className = "lightblue_bg_row1";
			c.innerHTML = '<td>Score colours:</td><td colspan="3" align="center">Player with that <font color="#CC4411">score</font> can attack you, but you can\'t<BR>Player with that <font color="#00FF00">score</font> can attack you, and you can also attack him<BR>Player with that <font color="#0000FF">score</font> can\'t attack you, but you can :D</td>';
		}
	}
}

//
// Evaluation of att/def on scans
//
regPageHandler(/^\/scans/i, evoScans );
function evoScans(){
	var scan = document.evaluate(".//div[@class='helpmessage']/strong", contents, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if (!scan) return;
	var table = document.evaluate("./following-sibling::table", scan, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	scan = scan.textContent;
	if (scan.indexOf("Sector Scan") != -1) {
		var defenceData = new Array(
			new Array(7, 'fort'),
			new Array(8, 'satellite mark 2'),
			new Array(9, 'nanowire wall')
		);
		var attack, defence, overallAttack = 0, overallDefence = 0;
		var row, cells, nDef, unit, newCell;
		var landAmt = 0, nLands = 0, unused = 0;
		var rows = table.rows;
		for (var i = 0; i < defenceData.length; i++){
			cells = rows[defenceData[i][0]].cells;
			if( cells.length == 4) {
				// land defence
				nLands = parseInt(cells[1].innerHTML);
				if (!isNaN(nLands)) landAmt += nLands;
				// static defences
				nDef = parseInt(cells[3].innerHTML);
				if (isNaN(nDef)) continue;
				unit = units[defenceData[i][1]];
				attack = unit.getAttackScore(nDef);
				defence = unit.getDefenseScore(nDef);
				overallAttack += attack;
				overallDefence += defence;
				cells[3].title = 'Estimated boosted att2/def2: ' + evoNumber2String(attack.toFixed(0)) + ' / ' + evoNumber2String(defence.toFixed(0));
			}
		}   

	    // formatting score number / add attacker's score range
		var resPics = new Array ('metal.png','mineral.png','food.png');
		for (var i = 2; i < 5; i++) {
		    rows[i].cells[2].innerHTML = "<img style=\"vertical-align: top\" src='http://images.neondragon.net/ev5/resources/"+resPics[i-2]+"' border='0'> "+rows[i].cells[2].innerHTML;
			rows[i].cells[3].innerHTML = "<font color=#ADD8E6>"+evoNumber2String(parseInt(rows[i].cells[3].innerHTML))+"<font>";
		}
		resPics = null;
	    var score = parseInt(rows[2].cells[1].innerHTML);
	    rows[2].cells[1].innerHTML = "<font color#FF850B>"+evoNumber2String(score)+"<font>";
	    rows[3].cells[0].innerHTML = "Max. Attacker Score";
	    rows[3].cells[0].className = "alt1 b";
	    rows[3].cells[1].innerHTML = "<font color=#FF850B>"+evoNumber2String(Math.ceil(score/.35))+"<font>";
	    rows[4].cells[0].innerHTML = "Min. Attacker Score";
	    rows[4].cells[0].className = "alt1 b";
	    rows[4].cells[1].innerHTML = "<font color=#FF850B>"+evoNumber2String(Math.ceil(score/2.5))+"<font>";
	    unused = parseInt(rows[6].cells[1].innerHTML);
		row = table.insertRow(10);
		row.title = "This DOES NOT include the creature stats";
		newCell = row.insertCell(0);
		newCell.className = "alt1 b";
		newCell.innerHTML = "Land ratio/def2<sup>*</sup>";
		newCell = row.insertCell(1);
		newCell.innerHTML = "<font color=yellow>"+evoNumber2String((landAmt/(landAmt+unused)*100).toFixed(2))+"%</font> / <font color=#8FED9B>"+ evoNumber2String(((landAmt+unused)*(105*105)*1.4).toFixed(0))+"</font>";
		newCell = row.insertCell(2);
		newCell.className = "alt1 b";
		newCell.innerHTML = "Overall att2/def2<sup>*</sup>";
		newCell = row.insertCell(3);
		newCell.innerHTML = "<font color=#F25763>"+evoNumber2String(overallAttack.toFixed(0)) + "</font> / <font color=#8FED9B>" + evoNumber2String(overallDefence.toFixed(0))+"</font>";

	    for( var i=6; i<=9; i++) {
	        if( rows[i].cells[1].innerHTML.length > 0)
	            rows[i].cells[1].innerHTML = evoNumber2String(parseInt(rows[i].cells[1].innerHTML));
	        if( rows[i].cells[3].innerHTML.length>0)
	            rows[i].cells[3].innerHTML = evoNumber2String(parseInt(rows[i].cells[3].innerHTML));
	    }
	} else if (scan.indexOf("Creature Scan") != -1) {
		var rows = table.rows;
		var row, cells, cell, unit, quantity, boost;
		var attack, defence, overallAttack = 0, overallDefence = 0;
		var foodCost = 0;
		for (var i = 2; i < rows.length; i++){
			row = rows[i];
			cells = row.cells;
			for (var j = 0; j < cells.length; j += 2) {
				unit = units[cells[j].textContent.toLowerCase()];
				cell = cells[j + 1];
				quantity = parseInt(cell.innerHTML);
				boost = 1 + unit.getMaxBoost();
				attack = unit.getAttackScore(quantity) * boost * boost;
				defence = unit.getDefenseScore(quantity) * boost * boost;
				foodCost += unit.getFoodCost(quantity);
				overallAttack += attack;
				overallDefence += defence;
				cell.title = 'Estimated boosted att2/def2: ' + evoNumber2String(attack.toFixed(0)) + ' / ' + evoNumber2String(defence.toFixed(0));
			}
		}
		var newRow = table.insertRow(rows.length);
		newRow.title = 'Estimation of att2/def2 with max possible boosts';
		var newCell = newRow.insertCell(0);
		newCell.className = "alt1 b";
		newCell.innerHTML = "Overall att2/def2<sup>*</sup>";
		newCell = newRow.insertCell(1);
		newCell.innerHTML = "<font color=#F25763>"+evoNumber2String(overallAttack.toFixed(0)) + "</font> / <font color=#8FED9B>" + evoNumber2String(overallDefence.toFixed(0))+"</font>"; // modify by ressol
		if( dEvo ) newCell.innerHTML = newCell.innerHTML + " / <font color=#4B74AF>" + evoNumber2String((overallDefence/1.4*3.15).toFixed(0))+"</font>";
		newCell.colSpan = 5;
		newRow = table.insertRow(rows.length);
		newCell = newRow.insertCell(0);
		newCell.className = "alt1 b";
		newCell.innerHTML = "Launch cost";
		newCell = newRow.insertCell(1);
		newCell.innerHTML = "<font color=#FF850B>"+evoNumber2String(foodCost.toFixed(0)) + "</font>"; // modify by ressol
		newCell.colSpan = 5;
	}
}

//
// Fleets page
//
regPageHandler(/^\/fleets/i,  evoFleets );
function evoFleets(){
	function updateFleetsAddCell(row, cellIndex, className, scores){
		var cell = row.insertCell(cellIndex);
		cell.className = className;
		cell.style.textAlign = 'center';
		cell.colSpan = 2;
		if (cellIndex > 0) {
			cell.style.fontSize = "12px";
			cell.innerHTML = evoNumber2String(scores[1]);
			cell.title = 'Unboosted: ' + evoNumber2String(scores[0]);
		} else {
			cell.innerHTML = scores; // cell title actually
		}
	}
	function updateFleetsAddRow(fleetsTable, isAttack){
		var row = fleetsTable.insertRow(fleetsTable.rows.length - 2);
		updateFleetsAddCell(row, 0, "alt1 b", (isAttack ? "Attack" : "Defence") + '<br /><span style="font-size:smaller; font-weight: normal">(estimation w/ max boost)</span>');
		updateFleetsAddCell(row, 1, "red_bg", getFleetScore(1, fleetsTable, isAttack));
		updateFleetsAddCell(row, 2, "yellow_bg", getFleetScore(2, fleetsTable, isAttack));
		updateFleetsAddCell(row, 3, "green_bg", getFleetScore(3, fleetsTable, isAttack));
	}
	function getFleetScore(fleetNo, table, isAttack){
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
			boost = unit.getBoost() + 1;
			maxBoostScore += baseScore * boost * boost;
		}
		row.cells[0].rowSpan = 12;
		var cell = sumRow.cells[1 + fleetNo];
		cell.textContent = total;
		cell.style.textAlign = 'center';
		cell.style.fontSize = '12px';
		return new Array(Math.round(noBoostScore), Math.round(maxBoostScore))
	}

	var fleetsTable = null;
	if( dEvo )
		fleetsTable = document.evaluate(".//table[preceding-sibling::h2[@class='title']][1]",
						contents, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	else
		fleetsTable = document.evaluate(".//table[preceding-sibling::h2[@class='forum' and text()='Fleet Organisation']][1]",
										 contents, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	// add row for fleet counts
	var sumRow = document.evaluate(".//tr[td[position()=1 and text()='Move to']]", fleetsTable, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	sumRow = fleetsTable.insertRow(sumRow.rowIndex);
	sumRow.innerHTML = '<td class="alt1 b">Total</td><td class="alt2" colspan="2"></td><td class="red_bg" colspan="2"></td><td class="yellow_bg" colspan="2"></td><td class="green_bg" colspan="2"></td>';
	updateFleetsAddRow(fleetsTable, true);
	updateFleetsAddRow(fleetsTable, false);
}

//
// News page
//
regPageHandler(/^\/news/i,  evoNews );
function evoNews() {
	function addCell(row, cellIndex, attributes, html) {
		var cell = row.insertCell(cellIndex);
		if (attributes)
			for (var i = 0; i < attributes.length; i++)
			cell.setAttribute(attributes[i][0], attributes[i][1]);

		if (html) cell.innerHTML = html;
		return cell;
	}

	var dEvoExpTerm = ".//h3[@class='cnewstitle' and child::span[starts-with(.,'Battle Report')]]/following-sibling::table";
	var RegExpTerm = (dEvo?dEvoExpTerm:".//tr[td[position()=2 and starts-with(.,'Battle Report')]]/following-sibling::tr[1]/td/table");
	var battleReports = document.evaluate(RegExpTerm, contents, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var battleReport;
	var rows, html, attDefRow, isAttacker, att, myAtt, def, myDef,
	idx, idx2,  unit, quantity, boost, landType, land, myLand, summaryRow, cell, j;
	var ruler = document.evaluate("//p[@id='openpanel']/strong[1]/text()", document, null, XPathResult.STRING_TYPE, null).stringValue;
	var attPrefixRegex = /.*att<sup>2<\/sup>:\s*/;
	var attSuffixRegex = /<br.*/;
	var defPrefixRegex = /.*def<sup>2<\/sup>:\s*/;
	for (var i = 0; battleReport = battleReports.snapshotItem(i); i++) {
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
		for (j = 3; j < rows.length; j++) {
			unit = units[rows[j].cells[0].innerHTML.toLowerCase()];
			if (!unit) break;
			idx = rows[j].cells[idx2].innerHTML.indexOf("<br>");
			quantity = parseInt(rows[j].cells[idx2].innerHTML.substring(idx + 4));
			boost = 1+unit.getBoost();
			myAtt += unit.getAttackScore(quantity) * boost * boost;
			myDef += unit.getDefenseScore(quantity)  * boost * boost;
		}
		summaryRow = battleReport.insertRow(rows.length);
		cell = addCell(summaryRow, 0, new Array(new Array("colSpan", "11"), new Array("height", "3")));
		
		summaryRow = battleReport.insertRow(rows.length);
		cell = addCell(summaryRow, 0, new Array(new Array("class", "alt1 b")), "Summary");
		
		html = "Att: " + evoNumber2String(myAtt.toFixed(0)) + " / <b>" + evoNumber2String(att) + "</b> (" + (att != 0 ? parseInt(100 * myAtt / att) : 0) + "%)<br/>" +
				"Def: " + evoNumber2String(myDef.toFixed(0)) + " / <b>" + evoNumber2String(def) + "</b> (" + (def != 0 ? parseInt(100 * myDef / def) : 0) + "%)";
		if (isAttacker) {
			cell = addCell(summaryRow, 1, new Array(new Array("class", "red_bg_row2"), new Array("colSpan", "2")), html);
			html = "";
			for (; j < rows.length - 2; j++) {
				if (rows[j].cells[0].innerHTML.indexOf("Land Capture") != -1) {
					j++;
					break;
				}
			}
			for (; j < rows.length - 2; j++) {
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
            if (rows[j].cells[0].innerHTML.indexOf("Land Capture") != -1) {
				j++;
			    for(; j < rows.length -2; j++) {
					landBefo = parseInt(rows[j].cells[4].innerHTML);
					landLoss = parseInt(rows[j].cells[6].innerHTML);
					rows[j].cells[6].className=rows[j].cells[6].className.substring(0,13)+" red";
					
					rows[j].cells[6].innerHTML = "<B>"+rows[j].cells[6].innerHTML+"</B>"+(isAttacker?"<BR>":"&nbsp;")+"("+(100*landLoss/landBefo).toFixed(2)+"%)";		        
			    }
				break;
			}
	    }

		// losses evaluation
		//
		var total = new Array(), losses = new Array();
		total[0] = total[1] = losses[0] = losses[1] = 0;
		function updateLosses(unit, cells, idx, isAtt) {
            var a = cells[idx].firstChild;
            if(! a ) return; // no figures in the BR for defenses on the attacker's side
			a = Number(a.textContent);
			var l = Number(cells[idx+1].firstChild.textContent);
			if( a == 0 ) return;
			cells[idx+1].title = Math.round(100*l/a) + '% (' + evoNumber2String(Math.abs(l) * (unit.metal + unit.mineral)) + ')';
			// take captures into account for the global stats
			total[isAtt] += (a + Number(cells[idx+3].firstChild.textContent)) * (unit.metal + unit.mineral);
			losses[isAtt] += (l + Number(cells[idx+2].firstChild.textContent)) * (unit.metal + unit.mineral);
		}

		for (j = 3; j < rows.length; j++) {
			unit = rows[j].cells[0].innerHTML.toLowerCase();
			if (unit == '') break;
			unit = units[unit];
			if (!unit) continue; // unknown unit?
			updateLosses(unit, rows[j].cells, 1, 0);
			updateLosses(unit, rows[j].cells, 6, 1);
		}

		battleReport.insertRow(j+2).innerHTML = '<TD class="row1 b"></TD><TD class="red_bg_row1 b">' + evoNumber2String(total[0]) + '</TD><TD class="red_bg_row1 b red" colspan="4">' + evoNumber2String(losses[0]) + ' (' + (losses[0]==0?0:Math.round(100*losses[0]/total[0])) + '%)</TD>'
			+ '<TD class="green_bg_row1 b">' + evoNumber2String(total[1]) + '</TD><TD class="green_bg_row1 b red" colspan="4">' + evoNumber2String(losses[1]) + ' (' + (losses[1]==0?0:Math.round(100*losses[1]/total[1])) + '%)</TD>';
	}
}

//
// Rankings page
//
regPageHandler(/^\/rankings\/alliance$/i, evoRankings);
function evoRankings() {
	var row;
	var score;
	var land;
	var members;
	var rows = document.evaluate(".//table/tbody[tr/td[text()='Alliance Name']]/tr[count(td)=5]", contents, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 2; row = rows.snapshotItem(i); i++ ) {
		members = row.cells[2].textContent;
		score = evoString2Number(row.cells[4].textContent);
		land = evoString2Number(row.cells[3].textContent);
		row.cells[0].style.textAlign = "center";
		row.cells[1].style.padding = "0 2px 0 2px";
		row.cells[2].style.textAlign = "center";
		row.cells[3].innerHTML = row.cells[3].textContent + "<br><font color='#AAAAFF'>" + evoNumber2String(Math.ceil(land / members)) + "</font>";
		row.cells[3].style.textAlign = "right";
		row.cells[3].style.padding = "0 2px 0 2px";
		row.cells[4].innerHTML = row.cells[4].textContent + "<br><font color='#AAAAFF'>" + evoNumber2String(Math.ceil(score / members)) + "</font>";
		row.cells[4].style.textAlign = "right";
		row.cells[4].style.padding = "0 2px 0 2px";
	}
}


//
// ***************************************************************************
// ** CONFIG
// ***************************************************************************
//

GM_registerMenuCommand( "Configure boosts...", evoConfigBoosts, null, null, 'b' );
function evoConfigBoosts() {
	var n;
	if( (n = prompt("Boost for Natural Creatures? (e.g. 39.46625)", boosts[UT_NATURAL]*100)) != null && !isNaN(n = Number(n)) )
		GM_setValue('boostNat', String(n/100));
	if( (n = prompt("Boost for Archeoligocal Creatures? (e.g. 33.126875)", boosts[UT_ENG]*100)) != null && !isNaN(n = Number(n)) )
		GM_setValue('boostEng', String(n/100));
	alert("Please reload the page for the changes to take effect.");
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
	contents = document.getElementById("content");

	// get out of the bloody forums message editor
	if( contents == null ) return;

	// initialize the units table
	evoUnitsInitialize();

	// grab player's available resources
	panel = document.getElementById("openpanel");
	if( panel != null ) {
		match = panel.textContent.match(/Metal:\s+([\d,]+)\s+Mineral:\s+([\d,]+)\s+Food:\s+([\d,]+)\s+Gold:\s+([\d,]+)\s+Score:\s+([\d,]+)/);
		unsafeWindow.evo_plus['pMetal'] = pMetal = evoString2Number(match[1]);
		unsafeWindow.evo_plus['pMineral'] = pMineral = evoString2Number(match[2]);
		unsafeWindow.evo_plus['pFood'] = pFood = evoString2Number(match[3]);
		unsafeWindow.evo_plus['pScore'] = pScore = evoString2Number(match[5]);
	}
	// ranking
	panel = document.evaluate("//div[@id='panelinfo']/table/tbody/tr/td[2]/p", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	if( panel != null ) {
		if( match = /Current\s+Ranking:\s+([,0-9]+)\s+of\s+([,0-9]+)/.exec(panel.textContent) ) {
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
	node.style.textAlign="right";
	node.style.marginRight="5px";
	node.style.marginTop="3px";
	node.style.marginBottom="3px";

	function addItemToContent(c, text, className, html, isLastItem) {
		c.appendChild(document.createTextNode(text));
		var span = document.createElement('SPAN');
		span.className = className;
		if (isLastItem)
			html += "&nbsp;|&nbsp;";
		span.innerHTML = html;
		c.appendChild(span);
	}

	addItemToContent(node, 'Rank: ', 't_normal b', pRank + "/" + totalPlayers, true);
	addItemToContent(node, 'Min. TargetScore: ', 't_normal b', evoNumber2String(Math.ceil(pScore * 0.35)), true);
	addItemToContent(node, 'Max. AttackerScore: ', 't_normal b', evoNumber2String(Math.floor(pScore / 0.35)), false);

	contents.parentNode.insertBefore(node, contents);

	node = document.createElement('DIV');
	node.style.color = "#6A9C01";
	node.style.fontSize = "8pt"; node.style.fontWeight = "bold";
	node.style.paddingLeft = "3px"; node.style.paddingTop = "3px";
	node.style.position = "absolute";
	node.innerHTML = scriptversionID;
	node.title = scriptTag;
	node.id = "evomagik";
	panel = document.getElementById('userinfo');
	panel.parentNode.insertBefore(node, panel);

	profiler = Date.now() - profiler;
//	GM_log('evo+ exec time: ' + profiler + ' ms');
}) ();

//
// ***************************************************************************
// ** Helper functions
// ***************************************************************************

function gcf(a,b){while(b!=0){t=a%b;a=b;b=t}return a;}

function evoLayoutChanged() {
	alert('Oops.. Page layout was not recognized, Neon probably changed the page :(');
}

function evoNumber2String(num) {
	var re = /(\d+)(\d{3})/g;

	num = String(num);
	var decimalIdx = num.indexOf('.');
	var part1 = '1', part2="";
	if( decimalIdx != -1 ) {
		part1 = num.substring(0, decimalIdx);
		part2 = num.substring(decimalIdx + 1, num.length);
	}
	else
		part1 = num;

	while( re.test(part1) )
		part1 = part1.replace(re, '$1,$2');

	return part2 == "" ? part1 : part1 + "." + part2;
}

function evoString2Number(num) {
	return Number(num.replace(/,/g,''));
}

function evoFromatNumberZ(num, zeros) {
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
function regPageHandler(urlRegEx, handler) {
	pageHandlers.push(new pageHandler(urlRegEx,  handler));
}

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
	evoUnit.prototype.getFoodCost = function(count) {
		return this.eats?count * (this.mineral+this.metal)/100:0;
	}

	evoUnit.prototype.getAttackScore = function(count) {
		return count * this.attack * this.attack;
	}

	evoUnit.prototype.getDefenseScore = function(count) {
		//Changed to reflect correct formula, Thanks to Mefisto of Alexandria
		return count * this.defense * this.defense * this.defenseBoost;
	}

	evoUnit.prototype.getMaxUnits = function (metal, mineral) {
		if( this.unitType == UT_NATURAL )
			return Math.min(Math.floor(metal / (this.metal * eeb)), Math.floor(mineral / (this.mineral * eeb)));
		else
			return Math.min(Math.floor(metal / this.metal), Math.floor(mineral / this.mineral));
	}

	evoUnit.prototype.getMetal = function() {
		return this.unitType == UT_NATURAL ? (this.metal * eeb) : this.metal;
	}

	evoUnit.prototype.getMineral = function() {
		return this.unitType == UT_NATURAL ? (this.mineral * eeb) : this.mineral;
	}

	evoUnit.prototype.getMaxBoost = function() {
		return maxBoosts[this.unitType];
	}

	evoUnit.prototype.getBoost = function() {
		return boosts[this.unitType];
	}

	if(! dEvo ) {
		units['monkey']           = new evoUnit('Monkey'           ,UT_NATURAL ,4   ,500    ,250    ,4   ,4   ,4   ,0  ,40 ,true);
		units['sheep']            = new evoUnit('Sheep'            ,UT_NATURAL ,5   ,3000   ,1500   ,13  ,9   ,7   ,0  ,40 ,true);
		units['horse']            = new evoUnit('Horse'            ,UT_NATURAL ,6   ,4000   ,2000   ,15  ,10  ,8   ,1  ,40 ,true);
		units['cow']              = new evoUnit('Cow'              ,UT_NATURAL ,6   ,4500   ,2500   ,16  ,8   ,7   ,1  ,40 ,true);
		units['fox']              = new evoUnit('Fox'              ,UT_NATURAL ,10  ,10000  ,4000   ,25  ,23  ,18  ,0  ,40 ,true);
		units['hyena']            = new evoUnit('Hyena'            ,UT_NATURAL ,11  ,11000  ,4500   ,28  ,26  ,12  ,0  ,40 ,true);
		units['wolf']             = new evoUnit('Wolf'             ,UT_NATURAL ,12  ,12000  ,5000   ,30  ,25  ,18  ,0  ,40 ,true);
		units['python']           = new evoUnit('Python'           ,UT_NATURAL ,12  ,18000  ,7500   ,45  ,35  ,10  ,1  ,40 ,true);
		units['ostrich']          = new evoUnit('Ostrich'          ,UT_NATURAL ,13  ,19000  ,8000   ,48  ,37  ,11  ,2  ,40 ,true);
		units['kangaroo']         = new evoUnit('Kangaroo'         ,UT_NATURAL ,14  ,28000  ,14000  ,55  ,55  ,7   ,1  ,40 ,true);
		units['lynx']             = new evoUnit('Lynx'             ,UT_NATURAL ,15  ,20000  ,9000   ,50  ,38  ,12  ,1  ,40 ,true);
		units['puma']             = new evoUnit('Puma'             ,UT_NATURAL ,15  ,20000  ,8000   ,45  ,40  ,12  ,1  ,40 ,true);
		units['lion']             = new evoUnit('Lion'             ,UT_NATURAL ,15  ,20000  ,9000   ,42  ,45  ,12  ,1  ,40 ,true);
		units['panther']          = new evoUnit('Panther'          ,UT_NATURAL ,16  ,25000  ,12500  ,30  ,60  ,12  ,1  ,40 ,true);
		units['bear']             = new evoUnit('Bear'             ,UT_NATURAL ,16  ,30000  ,15000  ,60  ,50  ,17  ,2  ,40 ,true);
		units['cheetah']          = new evoUnit('Cheetah'          ,UT_NATURAL ,18  ,25000  ,12500  ,60  ,25  ,12  ,1  ,40 ,true);
		units['walrus']           = new evoUnit('Walrus'           ,UT_NATURAL ,19  ,44000  ,22000  ,70  ,50  ,7   ,2  ,40 ,true);
		units['tiger']            = new evoUnit('Tiger'            ,UT_NATURAL ,20  ,30000  ,15000  ,55  ,55  ,14  ,1  ,40 ,true);
		units['rhino']            = new evoUnit('Rhino'            ,UT_NATURAL ,24  ,60000  ,36000  ,80  ,40  ,2   ,3  ,40 ,true);
		units['elephant']         = new evoUnit('Elephant'         ,UT_NATURAL ,24  ,52000  ,26000  ,75  ,55  ,7   ,4  ,40 ,true);

		units['centaur']          = new evoUnit('Centaur'          ,UT_ENG     ,6   ,5000   ,2500   ,25  ,20  ,19  ,1  ,40 ,true);
		units['unicorn']          = new evoUnit('Unicorn'          ,UT_ENG     ,8   ,12000  ,6000   ,40  ,30  ,20  ,1  ,40 ,true);
		units['minotaur']         = new evoUnit('Minotaur'         ,UT_ENG     ,18  ,50000  ,25000  ,65  ,50  ,13  ,2  ,40 ,true);
		units['gryphon']          = new evoUnit('Gryphon'          ,UT_ENG     ,14  ,28000  ,14000  ,55  ,40  ,18  ,2  ,40 ,true);
		units['dragon']           = new evoUnit('Dragon'           ,UT_ENG     ,24  ,100000 ,50000  ,85  ,65  ,10  ,3  ,40 ,true);
		units['fire sprite']      = new evoUnit('Fire Sprite'      ,UT_ENG     ,5   ,6000   ,3000   ,35  ,17  ,14  ,0  ,40 ,true);
		units['salamander']       = new evoUnit('Salamander'       ,UT_ENG     ,7   ,15000  ,7500   ,56  ,26  ,15  ,1  ,40 ,true);
		units['phoenix']          = new evoUnit('Phoenix'          ,UT_ENG     ,12  ,36000  ,18000  ,77  ,35  ,14  ,1  ,40 ,true);
		units['wyvern']           = new evoUnit('Wyvern'           ,UT_ENG     ,14  ,64000  ,32000  ,91  ,45  ,10  ,2  ,40 ,true);
		units['demon']            = new evoUnit('Demon'            ,UT_ENG     ,21  ,140000 ,70000  ,119 ,59  ,7   ,3  ,40 ,true);
		units['dyrad']            = new evoUnit('Dyrad'            ,UT_ENG     ,6   ,4000   ,3750   ,28  ,22  ,21  ,1  ,40 ,true);
		units['baskilisk']        = new evoUnit('Baskilisk'        ,UT_ENG     ,9   ,12000  ,9000   ,44  ,33  ,22  ,1  ,40 ,true);
		units['medusa']           = new evoUnit('Medusa'           ,UT_ENG     ,15  ,30000  ,22500  ,61  ,44  ,20  ,1  ,40 ,true);
		units['cockatrice']       = new evoUnit('Cockatrice'       ,UT_ENG     ,20  ,50000  ,37500  ,71  ,55  ,14  ,2  ,40 ,true);
		units['werewolf']         = new evoUnit('Werewolf'         ,UT_ENG     ,26  ,100000 ,75000  ,85  ,65  ,12  ,2  ,40 ,true);
		units['avimimus']         = new evoUnit('Avimimus'         ,UT_ENG     ,5   ,4000   ,2000   ,23  ,18  ,12  ,1  ,40 ,true);
		units['therizinsaurus']   = new evoUnit('Therizinsaurus'   ,UT_ENG     ,7   ,9600   ,4800   ,36  ,28  ,13  ,1  ,40 ,true);
		units['styracosaurus']    = new evoUnit('Styracosaurus'    ,UT_ENG     ,13  ,22400  ,11200  ,50  ,35  ,10  ,2  ,40 ,true);
		units['carnotaurus']      = new evoUnit('Carnotaurus'      ,UT_ENG     ,15  ,40000  ,20000  ,58  ,45  ,6   ,3  ,40 ,true);
		units['giganotosaurus']   = new evoUnit('Giganotosaurus'   ,UT_ENG     ,20  ,80000  ,40000  ,77  ,58  ,2   ,4  ,40 ,true);
		units['scarab beetle']    = new evoUnit('Scarab Beetle'    ,UT_ENG     ,8   ,6500   ,3250   ,30  ,26  ,19  ,0  ,40 ,true);
		units['mummy']            = new evoUnit('Mummy'            ,UT_ENG     ,12  ,16000  ,8000   ,52  ,39  ,13  ,1  ,40 ,true);
		units['sta']              = new evoUnit('Sta'              ,UT_ENG     ,18  ,38000  ,19000  ,72  ,52  ,12  ,1  ,40 ,true);
		units['sphinx']           = new evoUnit('Sphinx'           ,UT_ENG     ,22  ,70000  ,35000  ,83  ,65  ,18  ,3  ,40 ,true);
		units['anubis incarnate'] = new evoUnit('Anubis Incarnate' ,UT_ENG     ,32  ,180000 ,90000  ,110 ,83  ,8   ,3  ,40 ,true);

		units['fort']             = new evoUnit('Fort'             ,UT_NONE    ,4   ,2000   ,1000   ,25  ,40  ,0   ,0  ,40 ,false);
		units['satellite']        = new evoUnit('Satellite'        ,UT_NONE    ,6   ,8000   ,4000   ,30  ,35  ,0   ,0  ,40 ,false);
		units['nanowire wall']    = new evoUnit('Nanowire wall'    ,UT_NONE    ,10  ,12000  ,4500   ,65  ,65  ,0   ,0  ,40 ,false);
		units['satellite mark 2'] = new evoUnit('Satellite Mark 2' ,UT_NONE    ,6   ,8000   ,4000   ,35  ,45  ,0   ,0  ,40 ,false);

		units['wave reflector']   = new evoUnit('Wave Reflector'   ,UT_NONE    ,4   ,2000   ,2000   ,0   ,0   ,0   ,0  ,0  ,false);

		units['biochemical missile']=new evoUnit('Biochemical Missile',UT_NONE ,12  ,10000  ,20000  ,0   ,0   ,0   ,0  ,0  ,false);
		units['nanovirus missile']= new evoUnit('Nanovirus Missile',UT_NONE    ,12  ,30000  ,15000  ,0   ,0   ,0   ,0  ,0  ,false);
		units['bombs']            = new evoUnit('Bombs'            ,UT_NONE    ,12  ,11000  ,7000   ,0   ,0   ,0   ,0  ,0  ,false);
		units['neural reorganiser bomb']=new evoUnit('Neural Reorganiser Bomb',UT_NONE,24,50000,32000,0  ,0   ,0   ,0  ,0  ,false);
		units['poison bombs']     = new evoUnit('Poison Bombs'     ,UT_NONE    ,16  ,16000  ,12000  ,0   ,0   ,0   ,0  ,0  ,false);

		units['land scan']        = new evoUnit('Land Scan'        ,UT_NONE    ,4   ,1000   ,2000   ,0   ,0   ,0   ,0  ,0  ,false);
		units['scan amplifier']   = new evoUnit('Scan Amplifier'   ,UT_NONE    ,4   ,1000   ,1000   ,0   ,0   ,0   ,0  ,0  ,false);
		units['sector scan']      = new evoUnit('Sector Scan'      ,UT_NONE    ,8   ,2000   ,4000   ,0   ,0   ,0   ,0  ,0  ,false);
		units['creature scan']    = new evoUnit('Creature Scan'    ,UT_NONE    ,8   ,3000   ,6000   ,0   ,0   ,0   ,0  ,0  ,false);
		units['r&d scan']         = new evoUnit('R&D Scan'         ,UT_NONE    ,6   ,2000   ,3000   ,0   ,0   ,0   ,0  ,0  ,false);
		units['news scan']        = new evoUnit('News Scan'        ,UT_NONE    ,18  ,10000  ,20000  ,0   ,0   ,0   ,0  ,0  ,false);
		units['military scan']    = new evoUnit('Military Scan'    ,UT_NONE    ,12  ,6000   ,12000  ,0   ,0   ,0   ,0  ,0  ,false);
		units['microwave pulse']  = new evoUnit('Microwave Pulse'  ,UT_NONE    ,20  ,520000  ,1040000  ,0   ,0   ,0   ,0  ,0  ,false);
		units['overload pulse']   = new evoUnit('Overload Pulse'   ,UT_NONE    ,24  ,1600000  ,3200000  ,0   ,0   ,0   ,0  ,0  ,false);
	} else {
		// DEVO Stats
		units['monkey']           = new evoUnit('Monkey'           ,UT_NATURAL ,4   ,500    ,250    ,5   ,5   ,4   ,0  ,40 ,true);
		units['sheep']            = new evoUnit('Sheep'            ,UT_NATURAL ,4   ,1500   ,750    ,11  ,11  ,5   ,0  ,40 ,true);
		units['horse']            = new evoUnit('Horse'            ,UT_NATURAL ,5   ,2000   ,1000   ,13  ,13  ,6   ,1  ,40 ,true);
		units['cow']              = new evoUnit('Cow'              ,UT_NATURAL ,6   ,4500   ,2500   ,16  ,8   ,7   ,1  ,40 ,true);
		units['fox']              = new evoUnit('Fox'              ,UT_NATURAL ,9   ,7200   ,3200   ,24  ,25  ,8   ,0  ,40 ,true);
		units['hyena']            = new evoUnit('Hyena'            ,UT_NATURAL ,10  ,8800   ,3600   ,28  ,27  ,8   ,1  ,40 ,true);
		units['wolf']             = new evoUnit('Wolf'             ,UT_NATURAL ,10  ,8000   ,3500   ,27  ,25  ,14  ,0  ,40 ,true);
		units['python']           = new evoUnit('Python'           ,UT_NATURAL ,12  ,12500  ,5000   ,36  ,31  ,7   ,1  ,40 ,true);
		units['ostrich']          = new evoUnit('Ostrich'          ,UT_NATURAL ,13  ,18000  ,8000   ,43  ,41  ,6   ,2  ,40 ,true);
		units['kangaroo']         = new evoUnit('Kangaroo'         ,UT_NATURAL ,15  ,17000  ,8000   ,37  ,42  ,5   ,1  ,40 ,true);
		units['lynx']             = new evoUnit('Lynx'             ,UT_NATURAL ,15  ,12000  ,5500   ,35  ,31  ,10  ,1  ,40 ,true);
		units['puma']             = new evoUnit('Puma'             ,UT_NATURAL ,13  ,11000  ,5000   ,32  ,32  ,6   ,1  ,40 ,true);
		units['lion']             = new evoUnit('Lion'             ,UT_NATURAL ,15  ,12000  ,5000   ,31  ,35  ,10  ,1  ,40 ,true);
		units['panther']          = new evoUnit('Panther'          ,UT_NATURAL ,16  ,14000  ,7000   ,30  ,40  ,6   ,1  ,40 ,true);
		units['bear']             = new evoUnit('Bear'             ,UT_NATURAL ,16  ,26000  ,13000  ,57  ,50  ,12  ,3  ,40 ,true);
		units['cheetah']          = new evoUnit('Cheetah'          ,UT_NATURAL ,16  ,14000  ,7000   ,41  ,29  ,5   ,1  ,40 ,true);
		units['walrus']           = new evoUnit('Walrus'           ,UT_NATURAL ,18  ,28000  ,14000  ,53  ,54  ,4   ,2  ,40 ,true);
		units['tiger']            = new evoUnit('Tiger'            ,UT_NATURAL ,20  ,18000  ,9000   ,43  ,43  ,11  ,2  ,40 ,true);
		units['rhino']            = new evoUnit('Rhino'            ,UT_NATURAL ,24  ,28000  ,17000  ,66  ,53  ,3   ,3  ,40 ,true);
		units['elephant']         = new evoUnit('Elephant'         ,UT_NATURAL ,22  ,40000  ,20000  ,65  ,69  ,21  ,4  ,40 ,true);

		units['centaur']          = new evoUnit('Centaur'          ,UT_ENG     ,5   ,4000   ,2400   ,22  ,23  ,10  ,1  ,40 ,true);
		units['unicorn']          = new evoUnit('Unicorn'          ,UT_ENG     ,8   ,7200   ,3600   ,30  ,25  ,6   ,1  ,40 ,true);
		units['minotaur']         = new evoUnit('Minotaur'         ,UT_ENG     ,12  ,10800  ,5400   ,36  ,35  ,8   ,2  ,40 ,true);
		units['gryphon']          = new evoUnit('Gryphon'          ,UT_ENG     ,18  ,19000  ,9500   ,54  ,43  ,14  ,2  ,40 ,true);
		units['dragon']           = new evoUnit('Dragon'           ,UT_ENG     ,24  ,30000  ,10500  ,76  ,67  ,8   ,3  ,40 ,true);
		units['fire sprite']      = new evoUnit('Fire Sprite'      ,UT_ENG     ,5   ,5000   ,2500   ,25  ,18  ,4   ,0  ,40 ,true);
		units['salamander']       = new evoUnit('Salamander'       ,UT_ENG     ,7   ,9000   ,4500   ,36  ,26  ,10  ,1  ,40 ,true);
		units['phoenix']          = new evoUnit('Phoenix'          ,UT_ENG     ,12  ,14600  ,7300   ,44  ,35  ,6   ,1  ,40 ,true);
		units['wyvern']           = new evoUnit('Wyvern'           ,UT_ENG     ,14  ,25000  ,17500  ,69  ,45  ,7   ,2  ,40 ,true);
		units['demon']            = new evoUnit('Demon'            ,UT_ENG     ,21  ,36000  ,18000  ,96  ,60  ,5   ,3  ,40 ,true);
		units['dryad']            = new evoUnit('Dryad'            ,UT_ENG     ,6   ,3600   ,2700   ,21  ,21  ,13  ,1  ,40 ,true);
		units['basilisk']         = new evoUnit('Basilisk'         ,UT_ENG     ,9   ,6000   ,4500   ,29  ,24  ,21  ,1  ,40 ,true);
		units['medusa']           = new evoUnit('Medusa'           ,UT_ENG     ,15  ,10000  ,7500   ,37  ,34  ,15  ,1  ,40 ,true);
		units['cockatrice']       = new evoUnit('Cockatrice'       ,UT_ENG     ,20  ,18000  ,13500  ,54  ,45  ,23  ,2  ,40 ,true);
		units['werewolf']         = new evoUnit('Werewolf'         ,UT_ENG     ,26  ,28000  ,18500  ,71  ,65  ,30  ,2  ,40 ,true);
		units['avimimus']         = new evoUnit('Avimimus'         ,UT_ENG     ,5   ,3700   ,1850   ,22  ,17  ,2   ,1  ,40 ,true);
		units['therizinsaurus']   = new evoUnit('Therizinsaurus'   ,UT_ENG     ,7   ,5000   ,2500   ,23  ,22  ,3   ,1  ,40 ,true);
		units['styracosaurus']    = new evoUnit('Styracosaurus'    ,UT_ENG     ,13  ,9000   ,4500   ,32  ,41  ,8   ,2  ,40 ,true);
		units['carnotaurus']      = new evoUnit('Carnotaurus'      ,UT_ENG     ,15  ,15000  ,7500   ,48  ,55  ,5   ,3  ,40 ,true);
		units['giganotosaurus']   = new evoUnit('Giganotosaurus'   ,UT_ENG     ,20  ,24000  ,12000  ,74  ,58  ,4   ,4  ,40 ,true);
		units['scarab beetle']    = new evoUnit('Scarab Beetle'    ,UT_ENG     ,8   ,6000   ,3000   ,26  ,23  ,7   ,0  ,40 ,true);
		units['mummy']            = new evoUnit('Mummy'            ,UT_ENG     ,12  ,11000  ,5500   ,36  ,34  ,1   ,0  ,40 ,true);
		units['sta']              = new evoUnit('Sta'              ,UT_ENG     ,18  ,18000  ,9000   ,45  ,42  ,12  ,1  ,40 ,true);
		units['sphinx']           = new evoUnit('Sphinx'           ,UT_ENG     ,22  ,28000  ,14000  ,67  ,56  ,4   ,3  ,40 ,true);
		units['anubis incarnate'] = new evoUnit('Anubis Incarnate' ,UT_ENG     ,32  ,42000  ,21000  ,93  ,78  ,8   ,3  ,40 ,true);

		units['fort']             = new evoUnit('Fort'             ,UT_NONE    ,4   ,2000   ,1000   ,25  ,40  ,0   ,0  ,215 ,false);
		units['satellite']        = new evoUnit('Satellite'        ,UT_NONE    ,6   ,8000   ,4000   ,30  ,35  ,0   ,0  ,215 ,false);
		units['nanowire wall']    = new evoUnit('Nanowire wall'    ,UT_NONE    ,10  ,12000  ,4500   ,65  ,65  ,0   ,0  ,215 ,false);
		units['satellite mark 2'] = new evoUnit('Satellite Mark 2' ,UT_NONE    ,6   ,8000   ,4000   ,35  ,45  ,0   ,0  ,215 ,false);

		units['wave reflector']   = new evoUnit('Wave Reflector'   ,UT_NONE    ,4   ,2000   ,2000   ,0   ,0   ,0   ,0  ,0  ,false);

		units['biochemical missile']=new evoUnit('Biochemical Missile',UT_NONE ,12  ,10000  ,20000  ,0   ,0   ,0   ,0  ,0  ,false);
		units['nanovirus missile']= new evoUnit('Nanovirus Missile',UT_NONE    ,12  ,30000  ,15000  ,0   ,0   ,0   ,0  ,0  ,false);
		units['bombs']            = new evoUnit('Bombs'            ,UT_NONE    ,12  ,11000  ,7000   ,0   ,0   ,0   ,0  ,0  ,false);
		units['neural reorganiser bomb']=new evoUnit('Neural Reorganiser Bomb',UT_NONE,24,50000,32000,0  ,0   ,0   ,0  ,0  ,false);
		units['poison bombs']     = new evoUnit('Poison Bombs'     ,UT_NONE    ,16  ,16000  ,12000  ,0   ,0   ,0   ,0  ,0  ,false);

		units['land scan']        = new evoUnit('Land Scan'        ,UT_NONE    ,4   ,1000   ,2000   ,0   ,0   ,0   ,0  ,0  ,false);
		units['scan amplifier']   = new evoUnit('Scan Amplifier'   ,UT_NONE    ,4   ,1000   ,1000   ,0   ,0   ,0   ,0  ,0  ,false);
		units['sector scan']      = new evoUnit('Sector Scan'      ,UT_NONE    ,8   ,2000   ,4000   ,0   ,0   ,0   ,0  ,0  ,false);
		units['creature scan']    = new evoUnit('Creature Scan'    ,UT_NONE    ,8   ,3000   ,6000   ,0   ,0   ,0   ,0  ,0  ,false);
		units['r&d scan']         = new evoUnit('R&D Scan'         ,UT_NONE    ,6   ,2000   ,3000   ,0   ,0   ,0   ,0  ,0  ,false);
		units['news scan']        = new evoUnit('News Scan'        ,UT_NONE    ,18  ,10000  ,20000  ,0   ,0   ,0   ,0  ,0  ,false);
		units['military scan']    = new evoUnit('Military Scan'    ,UT_NONE    ,12  ,6000   ,12000  ,0   ,0   ,0   ,0  ,0  ,false);
		units['microwave pulse']  = new evoUnit('Microwave Pulse'  ,UT_NONE    ,20  ,520000  ,1040000  ,0   ,0   ,0   ,0  ,0  ,false);
		units['overload pulse']   = new evoUnit('Overload Pulse'   ,UT_NONE    ,24  ,1600000  ,3200000  ,0   ,0   ,0   ,0  ,0  ,false);
	}
	unsafeWindow.evo_plus['units'] = units;
}
