// ==UserScript==
// @name          Base Uploader (MiT)
// @description   Saves base info to a database
// @include       *.astroempires.com/*
// @exclude       *.astroempires.com/home.aspx*
// @exclude       *.astroempires.com/login.aspx*
// @exclude       forum.astroempires.com/*
// @exclude       support.astroempires.com/*
// @exclude       wiki.astroempires.com/*
// @exclude       wiki.astroempires.com/*/*
// @exclude       *.astroempires.com/upgrade.aspx*
// @exclude       *.astroempires.com/tables.aspx*
// @exclude       *.astroempires.com/register.aspx*
// @exclude       *.astroempires.com/smilies.aspx*
// ==/UserScript==


//================================================================
//===========================CONSTANTS============================
//================================================================

var SKIN = "Dark Astros";
var forumText = 'MiT Forum';
var database = 'mit';
var server = 'kappa';
var scriptVer = 1;

//================================================================
//=========================END CONSTANTS==========================
//================================================================


//================================================================
//===========================ID INFO==============================
//================================================================

//gets current server
function getGalaxy() {
  var href = document.location.href;
  href = href.substr("http://".length,href.indexOf(".") - "http://".length);
  return href;
}
//turns profile number to a link to your profile
function replaceIds() {
  var account = document.getElementById("account").nextSibling;
  var galaxy = getGalaxy();
  var id = account.innerHTML.substr(0,account.innerHTML.length);
  switch(galaxy) {
    case 'alpha': galaxy = "alpha"; break;
    case 'beta': galaxy = "beta"; break;
    case 'ceti': galaxy = "ceti"; break;
    case 'delta': galaxy = "delta"; break;
    case 'epsilon': galaxy = "epsilon"; break;
    case 'fenix': galaxy = "fenix"; break;
    case 'gamma': galaxy = "gamma"; break;
    case 'helion': galaxy = "helion"; break;
    case 'ixion': galaxy = "ixion"; break;
    case 'juno': galaxy = "juno"; break;
    default: return null;
  }
  var atag = '<a href="http://' + galaxy + 
   '.astroempires.com/profile.aspx?player=' + id + '">' + account.innerHTML + '</a>';
  account.innerHTML = atag;
}
//turns pending member id into a link to their faboo account
function replaceGuild() {
  var pending;
  if(!(pending = document.getElementById("guild_pending-members"))) {
    return;
  }
  var galaxy = getGalaxy();
  var regex = /<td>[0-9]+<\/td>/g;
  var matches = pending.innerHTML.match(regex);
if (matches == null) return;
  for(var i = 0;i < matches.length;i++) {
    var id = matches[i].substr(4,matches[i].length - 9);
    var atag = '<td><a target="_blank" href="http://faboo.org/eddie/' + galaxy + '/publicPlayer' 
      + '/playerid/' + id + '">' + id +  '</a></td>';
    pending.innerHTML=pending.innerHTML.replace(matches[i],atag);
  }
}
replaceIds();
replaceGuild();


//================================================================
//==========================End ID INFO===========================
//================================================================


//================================================================
//====================FORUM LINK IN NAV BAR====================
//================================================================
//Thanks to Nathan Hook for helping me with the nav bar link.

var databaseUrl = "http://menintights.freeforums.org/index.php";

window.addEventListener('load',
function() {
  
  // Representss the ' - ' between all the links at the top of the page.
  var dividerText = document.createElement('span');
  
  dividerText.innerHTML=' - ';
  
  var linkArray;
  
  linkArray = document.evaluate('//a[contains(@href, "home.aspx?session=logout&id=")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  
  var logoutLink = linkArray.snapshotItem(0);
  
  var databaseLink = document.createElement('a');
  
  databaseLink.href=databaseUrl;
  databaseLink.setAttribute('href', databaseUrl);
  databaseLink.innerHTML=forumText;
  // Opens the link in a new window.  Don't want that behavior, comment or remove the line below.
  databaseLink.target='_blank';
  
  logoutLink.parentNode.insertBefore(databaseLink, logoutLink);
  
  logoutLink.parentNode.insertBefore(dividerText, logoutLink);
  
}, true);

//================================================================
//======================END DATABASE LINK=========================
//================================================================

//================================================================
//======================ADDITIONAL FEATURES=======================
//================================================================




//****************************************************************
//**********************Start Insert Empire Menu***********************
//****************************************************************
function insertEmpireMenu() {
	var tables = document.evaluate("//table[@class='top']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    //console.log('Found '+ tables.snapshotLength + ' tables.');
    if (tables.snapshotLength == 0) return;
    var topTable = tables.snapshotItem(0);

    table = document.createElement("table");
	table.innerHTML="<tr><th width='10%'><a href='empire.aspx?view=bases_events'>Events</a></th><th width='10%'><a href='empire.aspx?view=bases_production'>Production</a></th><th width='10%'><a href='empire.aspx?view=economy'>Economy</a></th><th width='10%'><a href='empire.aspx?view=trade'>Trade</a></th><th width='10%'><a href='empire.aspx?ch=1&view=scanners'>Scanners</a></th></tr><tr><th width='10%'><a href='empire.aspx?view=bases_capacities'>Capacities</a></th><th width='10%'><a href='empire.aspx?view=structures'>Structures</a></th><th width='10%'><a href='empire.aspx?view=fleets'>Fleets</a></th><th width='10%'><a href='empire.aspx?view=units'>Units</a></th><th width='*'><a href='empire.aspx?view=technologies'>Technologies</a></th></tr>"
		table.width = "850"
	table.align = "center"
	if (topTable) {
        topTable.parentNode.insertBefore(table, topTable.nextSibling);
        var lineBreak = document.createElement('br');
        topTable.parentNode.insertBefore(lineBreak, table);
	}
}
    if (!document.location.href.match(/empire.aspx/)) {
        insertEmpireMenu();
    }


//****************************************************************
//**********************End Insert Empire Menu***********************
//****************************************************************



//****************************************************************
//**********************Start Strip Descriptions***********************
//****************************************************************


//function stripDescriptions() {
//    var helpCells = document.evaluate("//td[@class='help comment']", //document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
//    ////console.log(helpCells.snapshotLength);
//    for (var i = 0; i < helpCells.snapshotLength; i++) {
//        helpCells.snapshotItem(i).innerHTML = //helpCells.snapshotItem(i).innerHTML.match(/<div(.*?)id="itemDetails([0-//9]+)"(.*?)><\/div>/)[0]
//    }
//}
//
//if //(document.location.href.match(/http:\/\/(.+?).astroempires.com\/base.as//px\?base=[0-9]{1,}&view=production/)) {
//        stripDescriptions()
//    }


//****************************************************************
//**********************End Strip Descriptions***********************
//****************************************************************




//****************************************************************
//**********************Sum Credits Page***********************
//****************************************************************


function sumCreditsPage() {
 	table = document.createElement("table");
	table.innerHTML = document.getElementById("credits_table_sumary").innerHTML;
	table.width = "250"
	table.align = "center"
	document.getElementById("credits_table").parentNode.insertBefore(table, document.getElementById("credits_table")); 
	br = document.createElement("br");
	document.getElementById("credits_table").parentNode.insertBefore(br, document.getElementById("credits_table")); 
	document.getElementById("credits_table").parentNode.removeChild(document.getElementById("credits_table_sumary"))
}

if (document.location.href.match(/http:\/\/(.+?).astroempires\.com\/credits.aspx/)) {
        sumCreditsPage();
    }


//****************************************************************
//**********************End Sum Credits Page***********************
//****************************************************************



//****************************************************************
//**********************Link to Player Bases in DB***********************
//****************************************************************




function playerBases(){
  UserID = document.body.innerHTML.match(/<b>Player:<.b> ([0-9]+)/)[1];
  document.getElementById("profile_show").insertRow(1);
  document.getElementById("profile_show").rows[1].insertCell(0);
  document.getElementById("profile_show").rows[1].cells[0].innerHTML = "<a href='http://"+ server +".mckflux.co.cc/"+ database +"/astroInfo.php?submitted=TRUE&hideAll=show&showBlanks=show&show_age=TRUE&show_loc=TRUE&show_guild=TRUE&show_owner=TRUE&show_level=TRUE&show_economy=TRUE&show_ownerInc=TRUE&show_occdBy=TRUE&show_commander=TRUE&show_debris=TRUE&show_trades=TRUE&show_ccs=TRUE&show_jg=TRUE&show_cap=TRUE&show_dt=TRUE&show_des=TRUE&show_ps=TRUE&show_pr=TRUE&show_landed=TRUE&show_incoming=TRUE&filter_astroLoc=%28Any%29&filter_ownerGuild=%28Any%29&filter_owner=" + UserID + "&filter_level=%28Any%29&filter_jumpGate=%28Any%29&sortOrder=None&sortDirection=ASC&limit=50&page=0&hideGuild=' target='_blank'>User's Bases in DB</a>";
  document.getElementById("profile_show").rows[1].cells[0].align = "center";
}


//****************************************************************
//**********************End Link to Player Bases in DB*******************
//****************************************************************







//================================================================
//========================BATTLE CALC=============================
//================================================================

// Copyright (C) 2008  dave@mindkeep.org
// http://userscripts.org/scripts/show/39043

var NAME_INDEX = 0;
var START_QUANT_INDEX = 1;
var END_QUANT_INDEX = 2;
var POWER_INDEX = 3;
var ARMOR_INDEX = 4;
var SHIELD_INDEX = 5;

var DEBUG_OFF = 0;
var DEBUG_TIMING = 1;
var DEBUG_VERBOSE = 2;

var bc_debug_level = DEBUG_TIMING;

function debugBC(output)
{
	if (bc_debug_level > DEBUG_OFF)
	{
		console.log(output);
	}
}

function debugBC_V(output)
{
	if (bc_debug_level >= DEBUG_VERBOSE)
	{
		console.log(output);
	}
}

function initEndQuants(rows)
{
	for (var i = 0; i < rows.snapshotLength; i++)
	{
		var row = rows.snapshotItem(i);

		// end quant = start quant
		row.childNodes[END_QUANT_INDEX].firstChild.firstChild.nodeValue =
			row.childNodes[START_QUANT_INDEX].firstChild.firstChild.nodeValue;
	}
	debugBC_V("initEndQuants("+rows+") complete.");
}

function calcDamagePerUnit(power, shield, over)
{
	var damagePerUnit = 0;
	if (power > shield)
	{
		damagePerUnit = (power - shield) + (shield * over);
	}
	else
	{
		damagePerUnit = (power * over);
	}
	debugBC_V("calcDamagePerUnit("+power+", "+shield+", "+over+") returned "+damagePerUnit+", complete.");
	return damagePerUnit;
}

function attackOneWay(aRows, dRows)
{
	for (var i = 0; i < aRows.snapshotLength; i++)
	{
		var aRow = aRows.snapshotItem(i);
		var aUnits = aRow.childNodes[START_QUANT_INDEX].firstChild.firstChild.nodeValue - 0;
		var aPower = aRow.childNodes[POWER_INDEX].firstChild.nodeValue - 0;
		var aName = aRow.childNodes[NAME_INDEX].firstChild.nodeValue;

		//find power over shields
		var aOverShields = 0.01;
		if (aName == "Ion Bombers" || aName == "Ion Frigates")
		{
			aOverShields = 0.50;
		}

		// is this a turret structure?
		// this means use not so intelligent damage distribution, interesting...
		var aIsTurret = false;
		if (aName == "Barracks" ||
				aName == "Laser Turrets" ||
				aName == "Missle Turrets" ||
				aName == "Plasma Turrets" ||
				aName == "Ion Turrets" ||
				aName == "Photon Turrets" ||
				aName == "Disruptor Turrets" ||
				aName == "Deflection Shields" ||
				aName == "Planetary Shield" ||
				aName == "Planetary Ring")
		{
			aIsTurret = true;
		}

		debugBC_V("aRow = aRows.snapshotItem("+i+")\n"+
				"\taName = "+aName+"\n"+
				"\taUnits = "+aUnits+"\n"+
				"\taPower = "+aPower+"\n"+
				"\taOverShields = "+aOverShields+"\n"+
				"\taIsTurret = "+aIsTurret);

		while (aUnits > 0.0001) // prevent spinning
		{
			//find total defense size
			var dFleetTypeCount = 0;
			var totalDamagePerUnit = 0;
			for (var j = 0; j < dRows.snapshotLength; j++)
			{
				var dRow = dRows.snapshotItem(j);
				var dUnits = dRow.childNodes[END_QUANT_INDEX].firstChild.firstChild.nodeValue - 0;
				var dShield = dRow.childNodes[SHIELD_INDEX].firstChild.nodeValue - 0;
				if (dUnits > 0)
				{
					totalDamagePerUnit = totalDamagePerUnit +
						calcDamagePerUnit(aPower, dShield, aOverShields);
					dFleetTypeCount++;
				}
			}

			debugBC_V("dFleetTypeCount = "+dFleetTypeCount);
			if (dFleetTypeCount <= 0)
			{
				debugBC_V("All Fleet Destroyed!");
				break;
			}
			debugBC_V("totalDamagePerUnit = "+totalDamagePerUnit);

			var aUnitsUsed = 0;

			for (var j = 0; j < dRows.snapshotLength; j++)
			{
				var dRow = dRows.snapshotItem(j);
				var dName = dRow.childNodes[NAME_INDEX].firstChild.nodeValue;
				var dUnits = dRow.childNodes[END_QUANT_INDEX].firstChild.firstChild.nodeValue - 0;
				if (dUnits == 0)
				{
					debugBC_V(dName+" group is destroyed, skipping.");
					continue;
				}
				var dArmor = dRow.childNodes[ARMOR_INDEX].firstChild.nodeValue - 0;
				var dHp = dUnits * dArmor;
				var dShield = dRow.childNodes[SHIELD_INDEX].firstChild.nodeValue - 0;

				debugBC_V("dRow = dRows.snapshotItem("+j+")\n"+
						"\tdName = "+dName+"\n"+
						"\tdUnits = "+dUnits+"\n"+
						"\tdArmor = "+dArmor+"\n"+
						"\tdHp = "+dHp+"\n"+
						"\tdShield = "+dShield);

				var damagePerUnit = calcDamagePerUnit(aPower, dShield, aOverShields);
				//attackers for this defender group
				var attackingUnits = aUnits * damagePerUnit / totalDamagePerUnit;
				if (aIsTurret)
				{
					attackingUnits = aUnits / dFleetTypeCount;
				}
				var damage = attackingUnits * damagePerUnit; //max damage
				debugBC_V(aName+" attackingUnits("+attackingUnits+") * damagePerUnit("+damagePerUnit+") = damage("+damage+")");

				if (damage >= dHp)
				{
					dRow.childNodes[END_QUANT_INDEX].firstChild.firstChild.nodeValue = 0;
					aUnitsUsed = aUnitsUsed + dHp / damagePerUnit;
					debugBC_V(dName+" units destroyed!\n"+
							"\tdHp / damagePerUnit = "+(dHp/damagePerUnit)+"\n"+
							"\taUnitsUsed = "+aUnitsUsed);
				}
				else
				{
					dRow.childNodes[END_QUANT_INDEX].firstChild.firstChild.nodeValue =
						(dHp - damage) / dArmor;
					aUnitsUsed = aUnitsUsed + attackingUnits;
					debugBC_V(dName+" units remaining = "+((dHp-damage)/dArmor)+"\n"+
							"\taUnitsUsed = "+aUnitsUsed);
				}
			}
			aUnits = aUnits - aUnitsUsed;
			debugBC_V("aUnits remaining = "+aUnits);
		}
	}
	debugBC_V("attackOneWay("+aRows+", "+dRows+") complete.");
}

function findScale(name)
{
	var scale;

	if (name == "Fighters" ||
			name == "Bombers" ||
			name == "Heavy Bombers" ||
			name == "Ion Bombers" ||
			name == "Corvette" ||
			name == "Recycler" ||
			name == "Destroyer" ||
			name == "Frigate" ||
			name == "Ion Frigate" ||
			name == "Scout Ship" ||
			name == "Outpost Ship")
	{
		scale = 0;
	}
	else if (name == "Cruiser" ||
			name == "Carrier" ||
			name == "Heavy Cruiser")
	{
		scale = 1;
	}
	else
	{
		scale = 2;
	}

	debugBC_V("findScale("+name+") returned "+scale+", complete.");
	return scale;
}

function roundUp(value, scale)
{
	var mult = Math.pow(10,scale);
	var rounded = Math.ceil(value*mult) / mult;
	debugBC_V("roundUp("+value+", "+scale+") returned "+rounded+", complete.");
	return rounded;
}

function roundEndQuants(rows)
{
	for (var i = 0; i < rows.snapshotLength; i++)
	{
		var row = rows.snapshotItem(i);
		var scale = findScale(row.childNodes[NAME_INDEX].firstChild.nodeValue);
		var roundedValue = roundUp(row.childNodes[END_QUANT_INDEX].firstChild.firstChild.nodeValue, scale);
		row.childNodes[END_QUANT_INDEX].firstChild.firstChild.nodeValue = roundedValue;

		if (row.childNodes[END_QUANT_INDEX].firstChild.firstChild.nodeValue !=
				row.childNodes[START_QUANT_INDEX].firstChild.firstChild.nodeValue)
		{
			row.childNodes[END_QUANT_INDEX].style.color = "magenta";
		}
		else
		{
			row.childNodes[END_QUANT_INDEX].style.color = "lime";
		}

	}
	debugBC_V("roundEndQuants("+rows+") complete.");
}


function runBattleCalc()
{
	var startTime = new Date();

	var attackerRows = document.evaluate(
			"//table//th[contains(text(),'Attack Force') and @colspan='6']/../..//tr[@align='center']",
			document,
			null,
			XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
			null);
	var defenderRows = document.evaluate(
			"//table//th[contains(text(),'Defensive Force') and @colspan='6']/../..//tr[@align='center']",
			document,
			null,
			XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
			null);

	initEndQuants(attackerRows);
	initEndQuants(defenderRows);

	attackOneWay(attackerRows, defenderRows);
	attackOneWay(defenderRows, attackerRows);

	roundEndQuants(attackerRows);
	roundEndQuants(defenderRows);

	var endTime = new Date();
	var runSeconds = endTime.getTime() - startTime.getTime();

	debugBC("AE Battle Calc Completed Successfully!\n" +
			"\tCalc Duration: " + runSeconds / 1000 + " seconds\n" +
			"\tEnd Time: " + endTime.toString());
	debugBC_V("runBattleCalc() complete.");
}

function isConfirmPage()
{
	var temp = false;
	var confirmTitle = document.evaluate(
			"//center//b[contains(text(),'Confirm Attack')]",
			document,
			null,
			XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
			null);
	if (confirmTitle.snapshotLength >= 1)
	{
		temp = true;
	}
	debugBC_V("isConfirmPage() returned "+temp+", complete.");
	return temp;
}


//main
if (isConfirmPage())
{
	runBattleCalc();
}

//================================================================
//======================END BATTLE CALC===========================
//================================================================















//****************************************************************
//**********************Auto Launch Attempt***********************
//****************************************************************






























//****************************************************************
//**********************End Auto Launch Attempt***********************
//****************************************************************










//****************************************************************
//**********************Link to Player Faboo***********************
//****************************************************************



function playerFaboo(){
  UserID = document.body.innerHTML.match(/<b>Player:<.b> ([0-9]+)/)[1];
  document.getElementById("profile_show").insertRow(1);
  document.getElementById("profile_show").rows[1].insertCell(0);
  document.getElementById("profile_show").rows[1].cells[0].innerHTML = "<a href='http://faboo.org/eddie/"+ server +"/publicPlayer/playerid/" + UserID + "' target='_blank'>User's Faboo page</a>";
  document.getElementById("profile_show").rows[1].cells[0].align = "center";
}

if (document.body.innerHTML.match(/<b>Player:<.b> ([0-9]+)/)) {
	playerFaboo();
	playerBases();
    }




//****************************************************************
//**********************End Link to Player Faboo***********************
//****************************************************************



















//****************************************************************
//**********************Auto Scouting*****************************
//****************************************************************




function scoutReport(fleets, bases, astros, debris)
{
	// Stop scouting
	iframeDiv = document.getElementById('scoutDiv');
	document.body.removeChild(iframeDiv);
	GM_setValue(server + '_scouting', '');

	fleetDisplay = '';
	for(i = 0; i < fleets.length; i++)
	{
		fleet = fleets[i][0] + ' - ' + fleets[i][1] + ' - ' + fleets[i][2];
		fleetDisplay += fleet + '<br/>';
	}

	baseDisplay = '';
	for(i = 0; i < bases.length; i++)
	{
		base = bases[i][0] + ' - ' + bases[i][1];
		baseDisplay += base + '<br/>';
	}

	astroDisplay = '';
	for(i = 0; i < astros.length; i++)
	{
		astro = astros[i][0] + ' - ' + 'Position ' + astros[i][3] + ' ' + astros[i][2] + ' ' + astros[i][1];
		astroDisplay += astro + '<br/>';
	}

	debrisDisplay = '';
	for(i = 0; i < debris.length; i++)
	{
		debri = debris[i][0] + ' - ' + debris[i][1];
		debrisDisplay += debri + '<br/>';
	}

	GM_setValue(server + '_scout_fleet', fleetDisplay);
	GM_setValue(server + '_scout_base', baseDisplay);
	GM_setValue(server + '_scout_astro', astroDisplay);
	GM_setValue(server + '_scout_debris', debrisDisplay);

	checkScoutReport();
	link = document.createElement('input');
	link.title = 'fleet';
	displayScoutReport(link);
}

function scoutArea(scoutQueue, fleets, bases, astros, debris)
{
	iframe = document.getElementById('scoutFrame');

	// If document is not loaded yet need to wait until it is
	if(doc == iframe.contentDocument || !iframe.contentDocument.body)
	{
		window.setTimeout(
			function()
			{
				if(GM_getValue(server + '_scouting') != false)
				{
					scoutArea(scoutQueue, fleets, bases, astros, debris);
				}
				else
				{
					scoutReport(fleets, bases, astros, debris);
				}
			},
			200
		);
		return;
	}


	doc = iframe.contentDocument;
	area = scoutQueue.pop();



	if(area[0] == 'system')
	{
		elem = doc.body.lastChild.previousSibling.previousSibling;
		while(elem.nodeName != "TABLE")
		{
			elem = elem.previousSibling;
		}
		elem = elem.rows[0].cells[0].firstChild;
		elems = elem.getElementsByTagName('a');
		before = scoutQueue.length;
		for(i = elems.length - 1; i >= 0; i--)
		{
			// if not a fake astro or asteroid or gas giant then add to queue
			if(elems[i].parentNode == elem && elems[i].innerHTML.search('Asteroid Belt') == -1 && elems[i].innerHTML.search('Gas Giant') == -1)
			{
				url = elems[i].href;
				scoutQueue.push(['astro', url]);
			}
		}
		GM_setValue(server + '_scout_totalAstros', scoutQueue.length - before);
		GM_setValue(server + '_scout_currAstros', 1);
	}
	else if(area[0] == 'astro')
	{
		// Find fleet table
		tables = doc.body.getElementsByTagName('table');

		// Get location
		loc = area[1];
		if(loc.search('loc=') != -1)
		{
			position = loc.substr(loc.length - 2, 1);
			loc = '<a href="' + loc + '">' + loc.substr(loc.search('loc=') + 4) + '</a>';

			// Get astro info
			for(i = 0; i < tables.length; i++)
			{
				if(tables[i].className == 'astro')
				{
					table = tables[i];
					break;
				}
			}
			text = table.rows[0].cells[0].firstChild.innerHTML;
			pos = text.search('</b>');
			text = text.substr(pos + 5);
			pos = text.search('<br');
			type = text.substr(0, pos);

			pos = text.search('</b>');
			text = text.substr(pos + 5);
			pos = text.search('<br');
			size = text.substr(0, pos);

			astros.push([loc, type, size, position]);
		}
		else
		{
			// Look for table containing location
			for(i = 0; i < tables.length; i++)
			{
				if(tables[i].innerHTML.search('Location') != -1 || tables[i].innerHTML.search('Base Name') != -1)
				{
					// If you own base
					if(tables[i].innerHTML.search('Rename') != -1)
					{
						loc = tables[i].rows[1].cells[0].innerHTML;
					}
					else
					{
						loc = tables[i].rows[1].cells[1].innerHTML;
					}

					break;
				}
			}

			// Get base owner
			for(i = 0; i < tables.length; i++)
			{
				if(tables[i].className == 'base')
				{
					table = tables[i];
					break;
				}
			}
			table = table.rows[0].cells[2].firstChild.nextSibling;
			table = table.rows[1].cells[0].firstChild;
			owner = table.rows[7].cells[1].firstChild;
			owner = '<a href="' + owner.href + '">' + owner.innerHTML + '</a>';

			bases.push([loc, owner]);
		}

		table = null;
		for(i = 0; i < tables.length; i++)
		{
			if(tables[i].id == 'map_fleets' || tables[i].id == 'base_fleets')
			{
				table = tables[i];
				break;
			}
		}
		// If fleet table found
		if(table)
		{
			// If fleet summary there, skip over it
			if(table.rows[0].innerHTML.search('fleets summary') == -1)
			{
				table = table.rows[1].cells[0].firstChild;
			}
			else
			{
				table = table.rows[2].cells[0].firstChild;
			}

			// Go through each fleets
			for(i = table.rows.length - 1; i > 0; i--)
			{
				row = table.rows[i];
				name = row.cells[0].innerHTML;
				player = row.cells[1].innerHTML;
				arrival = row.cells[2].innerHTML;
				size = row.cells[3].innerHTML;
				fleets.push([loc, player, size, arrival]);
			}
		}

		// Get any possible debris
		centers = doc.body.getElementsByTagName('center');
		for(i = 0; i < centers.length; i++)
		{
			if(centers[i].innerHTML.search('credits in space debris') != -1)
			{
				firstSpace = centers[i].innerHTML.search(' ');
				debri = centers[i].innerHTML.substr(0, firstSpace) + ' Debris';
				debris.push([loc, debri]);
				break;
			}
		}

		currAstros = Number(GM_getValue(server + '_scout_currAstros'));
		GM_setValue(server + '_scout_currAstros', currAstros + 1);
	}

	// If done, remove the iframe div
	if(scoutQueue.length == 0)
	{
		scoutReport(fleets, bases, astros, debris);
	}
	// Otherwise set timer for the next check
	else
	{
		area = scoutQueue[scoutQueue.length - 1];

		// If next is a system, increase system counter
		if(area[0] == 'system')
		{
			systems = Number(GM_getValue(server + '_scout_currSystems'));
			GM_setValue(server + '_scout_currSystems', systems + 1);
			GM_setValue(server + '_scout_currAstros', 0);
		}

		iframe.src = area[1];

		time = 3513 + Math.floor(Math.random() * 4287);
		window.setTimeout(
			function()
			{
				if(GM_getValue(server + '_scouting') != false)
				{
					scoutArea(scoutQueue, fleets, bases, astros, debris);
				}
				else
				{
					scoutReport(fleets, bases, astros, debris);
				}
			},
			time
		);
	}
}

function startScouting()
{
	// Check for a scout
	if(SKIN == 'Dark Astros')
	{
		elem = document.getElementById('map-region_container');
		elems = elem.childNodes;
		elem = null;
		for(i = 0; i < elems.length; i++)
		{
			if(elems[i].nodeName == "TABLE")
			{
				elem = elems[i];
				break;
			}
		}
	}
	else if(SKIN == 'Deep Space')
	{
		elem = document.getElementById('map-region_content');
	}


	if(elem.innerHTML.search('text-decoration: underline') == -1 && elem.innerHTML.search('location-fleet-self') == -1)
	{
		alert('Error: Need to have a scout in the region');
		return;
	}

	scoutQueue = new Array();
	systems = elem.getElementsByTagName('div');
	for(i = systems.length - 1; i > 0; i--)
	{
		url = systems[i].firstChild.href;
		scoutQueue.push(['system', url]);
	}
	GM_setValue(server + '_scout_totalSystems', scoutQueue.length);
	GM_setValue(server + '_scout_currSystems', 0);
	GM_setValue(server + '_scout_totalAstros', 1);
	GM_setValue(server + '_scout_currAstros', 0);

	iframeDiv = document.createElement('div');
	iframeDiv.id = 'scoutDiv';
	iframeDiv.style.position = 'absolute';
	iframeDiv.style.top = '0';
	iframeDiv.style.left = '0';
	iframeDiv.style.height = '100%';
	iframeDiv.style.width = '100%';

	iframe = document.createElement('iframe');
	iframe.id = 'scoutFrame';
	iframe.width = '100%';
	iframe.height = '100%';

	iframeDiv.appendChild(iframe);
	document.body.appendChild(iframeDiv);

	area = scoutQueue[scoutQueue.length - 1];
	iframe.src = area[1];

	fleets = new Array();
	bases = new Array();
	astros = new Array();
	debris = new Array();

	GM_setValue(server + '_scouting', 'true');
	doc = null;
	time = 3587 + Math.floor(Math.random() * 4983);
	window.setTimeout(
		function()
		{
			scoutArea(scoutQueue, fleets, bases, astros, debris);
		},
		time
	);
}

function addScoutLink()
{
	elem = document.getElementById('map-region_container');
	elem = elem.firstChild;

	link = document.createElement('input');
	link.type = 'button';
	link.value = 'Scout';
	link.addEventListener('click',
		function()
		{
			startScouting();
		},
		false
	);
	link.className = 'input-button';

	elem.innerHTML += ' ';
	elem.appendChild(link);
}

function displayScoutReport(clickedLink)
{
	div = document.getElementById('scoutReport');
	div.innerHMTL = '';
	while(div.childNodes.length != 0)
	{
		div.removeChild(div.firstChild);
	}

	link = document.createElement('input');
	link.type = 'button';
	link.value = 'Hide Report';
	link.addEventListener('click',
		function()
		{
			removeScoutReport();
		},
		false
	);
	div.appendChild(link);
	div.appendChild(document.createElement('p'));

	table = document.createElement('table');
	row = table.insertRow(0);
	cell = row.insertCell(0);

	link = document.createElement('input');
	link.type = 'button';
	link.value = 'Fleets';
	link.title = 'fleet';
	link.addEventListener('click',
		function()
		{
			displayScoutReport(this);
		},
		false
	);
	cell.appendChild(link);

	link = document.createElement('input');
	link.type = 'button';
	link.title = 'base';
	link.value = 'Bases';
	link.addEventListener('click',
		function()
		{
			displayScoutReport(this);
		},
		false
	);
	cell.appendChild(link);

	link = document.createElement('input');
	link.type = 'button';
	link.title = 'astro';
	link.value = 'Astros';
	link.addEventListener('click',
		function()
		{
			displayScoutReport(this);
		},
		false
	);
	cell.appendChild(link);

	link = document.createElement('input');
	link.type = 'button';
	link.title = 'debris';
	link.value = 'Debris';
	link.addEventListener('click',
		function()
		{
			displayScoutReport(this);
		},
		false
	);
	cell.appendChild(link);

	row = table.insertRow(1);
	cell = row.insertCell(0);
	if(clickedLink.title == 'fleet')
	{
		display = GM_getValue(server + '_scout_fleet');
	}
	else if(clickedLink.title == 'base')
	{
		display = GM_getValue(server + '_scout_base');
	}
	else if(clickedLink.title == 'astro')
	{
		display = GM_getValue(server + '_scout_astro');
	}
	else if(clickedLink.title == 'debris')
	{
		display = GM_getValue(server + '_scout_debris');
	}
	cell.innerHTML = display;

	div.appendChild(table);
}

function removeScoutReport()
{
	div = document.getElementById('scoutReport');
	div.innerHTML = '';
	link = document.createElement('input');
	link.type = 'button';
	link.value = 'View Report';
	link.title = 'fleet';
	link.addEventListener('click',
		function()
		{
			displayScoutReport(this);
		},
		false
	);
	div.appendChild(link);
}

function checkScoutReport()
{
	if(typeof(GM_getValue) != 'function')
		return;

	// Check if a report has been
	fleetDisplay = GM_getValue(server + '_scout_fleet');
	if(fleetDisplay && fleetDisplay != '')
	{
		div = document.createElement('div');
		div.id = 'scoutReport';
		div.style.position = 'absolute';
		div.style.top = '0';
		div.style.left = '0';
		document.body.appendChild(div);

		removeScoutReport();
	}
}

function stopScouting()
{
	GM_setValue(server + '_scouting', false);
}

function checkScouting()
{
	if(typeof(GM_getValue) != 'function')
		return;

	// GM_setValue('scouting', '');
	scouting = GM_getValue(server + '_scouting');
	if(scouting)
	{
		div = document.createElement('div');
		div.id = 'scoutStatus';
		div.style.position = 'absolute';
		div.style.top = '0';
		div.style.left = '0';

		link = document.createElement('input');
		link.type = 'button';
		link.value = 'Stop Scouting';
		link.addEventListener('click',
			function()
			{
				stopScouting();
			},
			false
		);
		div.appendChild(link);
		div.appendChild(document.createElement('br'));

		/*link = document.createElement('input');
		link.type = 'button';
		link.value = 'Pause Scouting';
		div.appendChild(link);
		div.appendChild(document.createElement('br'));*/

		totalSystems = Number(GM_getValue(server + '_scout_totalSystems'));
		currSystems = Number(GM_getValue(server + '_scout_currSystems'));
		totalAstros = Number(GM_getValue(server + '_scout_totalAstros'));
		currAstros = Number(GM_getValue(server + '_scout_currAstros'));

		percent = 0;
		systemPerc = 100 / totalSystems;
		percent += currSystems * systemPerc;
		astroPerc = systemPerc / totalAstros;
		percent += currAstros * astroPerc;

		newDiv = document.createElement('div');
		newDiv.innerHTML = 'Status: ' + percent.toFixed(2) + '%';
		div.appendChild(newDiv);

		document.body.appendChild(div);
	}
}



//****************************************************************
//**********************Auto Scouting*****************************
//****************************************************************








//================================================================
//====================END ADDITIONAL FEATURES=====================
//================================================================

var VERSION = "1.6.5";
var BROWSER = "FF";

function checkToRun()
{
	if(typeof(GM_getValue) != 'function')
	{
		BROWSER = "Chrome";
		return;
	}
	else
	{
		BROWSER = "FF";
		servers = GM_getValue('excludeServers', '');
		if(servers.search(server) != -1)
		{
			exit(0);
		}
	}
}


function getServer()
{
	if(typeof(GM_xmlhttpRequest) != 'function')
		return;

	loc = window.location.href.substr(7);
	server = loc.substr(0, loc.search('astro') - 1);
}

function dateToString(time)
{
	month = time.getMonth() + 1;
	day = time.getDate();
	year = time.getFullYear();
	hours = time.getHours();
	min = time.getMinutes();
	sec = time.getSeconds();
	if(month < 10)
		month = '0' + month;
	if(day < 10)
		day = '0' + day;
	if(hours < 10)
		hours = '0' + hours;
	if(min < 10)
		min = '0' + min;
	if(sec < 10)
		sec = '0' + sec;
	return day + '-' + month + '-' + year + ' ' + hours + ':' + min + ':' + sec;
}

function timeToString(time, type)
{
	hours = time / 3600;
	mins = (time / 60) % 60;
	if(mins < 10)
		mins = '0' + parseInt(mins);
	else
		mins = parseInt(mins);
	secs = time % 60;
	if(secs < 10)
		secs = '0' + parseInt(secs);
	else
		secs = parseInt(secs);

	if(type == 'h')
		return parseInt(hours) + 'h ' + mins + 'm ' + secs + 's';
	else if(type == ':')
		return parseInt(hours) + ':' + mins + ':' + secs;
}

function stringToTime(time)
{
	parts = time.split(' ');
	if(time.search('h') != -1)
	{
		hours = parts[0].substr(0, parts[0].length - 1);
		mins = parts[1].substr(0, parts[1].length - 1);
		secs = parts[2].substr(0, parts[2].length - 1);
	}
	else if(time.search('m') != -1)
	{
		hours = 0;
		mins = parts[0].substr(0, parts[0].length - 1);
		secs = parts[1].substr(0, parts[1].length - 1);
	}
	else if(time.search('s') != -1)
	{
		hours = 0;
		mins = 0;
		secs = parts[0].substr(0, parts[0].length - 1);
	}
	else
	{
		parts = time.split(':');
		hours = parts[0];
		mins = parts[1];
		secs = parts[2];
	}

	secs = Number(secs);
	secs += Number(mins) * 60;
	secs += Number(hours) * 3600;

	return secs;
}

function setServerTime()
{
	element = document.getElementById('top-header_server-time');
	now = new Date();
	totalSeconds = Number(element.title);
	serverDate = new Date(totalSeconds * 1000 + now.getTime());
	element.innerHTML = 'Server Time: ' + dateToString(serverDate);
}

function setupServerTime()
{
	// Get the server time element
	elements = document.getElementsByTagName('small');
	element = null;
	for(i = 0; i < elements.length; i++)
	{
		if(elements[i].innerHTML.search('Server time:') != -1)
		{
			element = elements[i];
			element.id = 'top-header_server-time';
			break;
		}
	}

	// Deep Space
	if(element == null)
	{
		element = document.getElementById('top-header_server-time');
		SKIN = "Deep Space";
	}

	fullText = element.innerHTML;
	fullText = fullText.substr(	13);

	// Jan 20 2010,
	if(fullText.search(/[A-Z][A-Z][A-Z]/i) == 0)
	{
		serverDate = new Date(fullText);
	}
	// 20 Jan 2010,
	else if(fullText.search(/[0-9][0-9][ ]/i) == 0)
	{
		serverDate = new Date(fullText);
	}
	// 2010-01-20
	else
	{
		dateText = fullText.split(' ')[0];
		timeText = fullText.split(' ')[1];

		dateParts = dateText.split('-');
		serverDate = new Date(dateParts[1] + '/' + dateParts[2] + '/' + dateParts[0] + ' ' + timeText);
	}

	totalSeconds = serverDate.getTime() / 1000;
	now = new Date();
	totalSeconds = totalSeconds - (now.getTime() / 1000);

	element.title = '' + totalSeconds;
	setServerTime();
	setInterval(function() {setServerTime()}, 200);
}

function checkExcludes()
{
	currentServers = GM_getValue('excludeServers', '');
	currentServers = currentServers.replace(/,/gm, ' ');
	if(currentServers != '')
	{
		alert(currentServers);
	}
	else
	{
		alert('No servers excluded');
	}
}

function addExclude()
{
	answer = prompt('Add servers to exclude. Ex: beta ceti', '');
	if(answer == '')
		return;

	servers = answer.split(' ');

	currentServers = GM_getValue('excludeServers', '');
	if(currentServers == '')
	{
		currentServers = new Array();
	}
	else
	{
		currentServers = currentServers.split(',');
	}

	for(i = 0; i < servers.length; i++)
	{
		servers[i] = servers[i].toLowerCase();
		currentServers.push(servers[i]);
	}

	GM_setValue('excludeServers', currentServers.toString());
}
function removeExclude()
{
	answer = prompt('Add servers to exclude. Ex: beta ceti', '');
	if(answer == '')
		return;

	servers = answer.split(' ');

	currentServers = GM_getValue('excludeServers', '');
	if(currentServers == '')
	{
		return;
	}
	else
	{
		currentServers = currentServers.split(',');
	}

	for(i = 0; i < currentServers.length; i++)
	{
		for(j = 0; j < servers.length; j++)
		{
			if(currentServers[i] == servers[j].toLowerCase())
			{
				currentServers.splice(i, 1);
				i--;
				break;
			}
		}
	}

	GM_setValue('excludeServers', currentServers.toString());
}

function addOptions()
{
	if(typeof(GM_getValue) != 'function')
		return;

	GM_registerMenuCommand('Check Excluded Servers', checkExcludes, 'c', 'shift alt', 'c');
	GM_registerMenuCommand('Exclude Servers', addExclude, 'e', 'shift alt', 'e');
	GM_registerMenuCommand('Unexclude Servers', removeExclude, 'u', 'shift alt', 'u');
}


function showFleets(elem)
{
	name = elem.title;

	if(window.location.href.search('map.aspx') != -1)
		table = document.getElementById('map_fleets');
	else
		table = document.getElementById('base_fleets');
	if(SKIN == 'Dark Astros')
	{
		table = table.rows[2].cells[0].firstChild;
	}
	else if(SKIN == 'Deep Space')
	{
		table = table.rows[2].cells[0].firstChild;
		table = table.rows[0].cells[1].firstChild.firstChild.nextSibling;
	}

	// Look for all fleets belonging to this guild and hide them
	for(i = 1; i < table.rows.length; i++)
	{
		row = table.rows[i];
		if(row.cells[1].innerHTML.indexOf(name) != -1 ||
			(name == "unguilded" && row.cells[1].innerHTML.search(/\[(.*?)\]/i) == -1))
		{
			row.style.display = '';
		}
	}

	// change elem to hide fleets
	parent = elem.parentNode;
	link = document.createElement('a');
	link.title = elem.title;
	link.href = "javascript:void(0);";
	link.innerHTML = "Hide";
	link.addEventListener('click',
		function()
		{
			hideFleets(this);
		},
		false
	);
	parent.removeChild(elem);
	parent.appendChild(link);
}

function hideFleets(elem)
{
	name = elem.title;

	if(window.location.href.search('map.aspx') != -1)
		table = document.getElementById('map_fleets');
	else
		table = document.getElementById('base_fleets');
	if(SKIN == 'Dark Astros')
	{
		table = table.rows[2].cells[0].firstChild;
	}
	else if(SKIN == 'Deep Space')
	{
		table = table.rows[2].cells[0].firstChild;
		table = table.rows[0].cells[1].firstChild.firstChild.nextSibling;
	}

	// Look for all fleets belonging to this guild and hide them
	for(i = 1; i < table.rows.length; i++)
	{
		row = table.rows[i];
		if(row.cells[1].innerHTML.indexOf(name) != -1 ||
			(name == "unguilded" && row.cells[1].innerHTML.search(/\[(.*?)\]/i) == -1))
		{
			row.style.display = 'none';
		}
	}

	// change elem to show fleets
	parent = elem.parentNode;
	link = document.createElement('a');
	link.title = elem.title;
	link.href = "javascript:void(0);";
	link.innerHTML = "Show";
	link.addEventListener('click',
		function()
		{
			showFleets(this);
		},
		false
	);
	parent.removeChild(elem);
	parent.appendChild(link);
}

function moveFleetSummary()
{
	sumElem = document.getElementById('fleets_summary');
	if(!sumElem)
		return;

	sumElem.style.display = 'block';

	if(window.location.href.search('map.aspx') != -1)
		fleetsTable = document.getElementById('map_fleets');
	else
		fleetsTable = document.getElementById('base_fleets');

	sumElem.parentNode.removeChild(sumElem);
	fleetsTable.parentNode.insertBefore(sumElem, fleetsTable);

	rowHTML = fleetsTable.rows[2].innerHTML
	fleetsTable.deleteRow(2);
	fleetsTable.insertRow(0);
	fleetsTable.rows[0].innerHTML = rowHTML;

	document.getElementById('link_hide_fleets_summary').style.display = 'inline';
	document.getElementById('link_show_fleets_summary').style.display = 'none';

	// add hides for each guild if more than one guild displayed
	if(SKIN == 'Dark Astros')
	{
		sumElem = sumElem.firstChild.rows[1].cells[0].firstChild;
	}
	else if(SKIN == 'Deep Space')
	{
		sumElem = sumElem.firstChild.rows[1].cells[0].firstChild;
		sumElem = sumElem.rows[0].cells[1].firstChild.firstChild.nextSibling;
	}

	if(sumElem.innerHTML.search('<th>Total</th>') == -1)
		return;

	for(i = 1; i < sumElem.rows.length - 1; i++)
	{
		name = sumElem.rows[i].cells[0];
		if(name.firstChild.innerHTML == null)
		{
			name = name.innerHTML;
		}
		else
		{
			name = name.firstChild.innerHTML;
		}
		sumElem.rows[i].cells[0].innerHTML += ' - ';
		link = document.createElement('a');
		link.href = "javascript:void(0);";
		link.innerHTML = "Hide";
		link.title = name;
		link.addEventListener('click',
			function()
			{
				hideFleets(this);
			},
			true
		);
		sumElem.rows[i].cells[0].appendChild(link);
	}
}

function enhanceCapacities()
{
	mainTable = document.getElementById('empire_capacities');
	mainRow = mainTable.rows[1];
	mainCell = mainRow.cells[0];
	if(SKIN == 'Dark Astros')
	{
		realTable = mainCell.firstChild;
	}
	else if(SKIN == 'Deep Space')
	{
		fakeTable = mainCell.firstChild;
		realTable = fakeTable.rows[0].cells[1].firstChild.firstChild.nextSibling;
	}

	addConstr = 0;
	addProd = 0;
	for(i = 1; i < realTable.rows.length - 1; i++)
	{
		commanderCell = realTable.rows[i].cells[7];
		if(commanderCell.innerHTML != '')
		{
			commanderText = commanderCell.firstChild.innerHTML;
			commanderParts = commanderText.split(' ');
			effect = (100 - Number(commanderParts[1])) / 100;
		}

		var bonusCell = null;
		if(commanderCell.innerHTML.search('Construction') != -1)
		{
			bonusCell = realTable.rows[i].cells[4];
			baseText = bonusCell.innerHTML.replace(/[,]/g, '').replace(/[.]/g, '');
			oldValue = Number(baseText);
			newValue = Math.ceil(oldValue / effect);
			bonusCell.innerHTML += ' <font color="orange">(' + newValue + ')</font>';
			addConstr += newValue - oldValue;
		}
		else if(commanderCell.innerHTML.search('Production') != -1)
		{
			bonusCell = realTable.rows[i].cells[5];
			baseText = bonusCell.innerHTML.replace(',', '').replace('.', '');
			parts = baseText.split(' ');
			oldValue = Number(parts[0]);
			newValue = Math.ceil(oldValue / effect);
			bonusCell.innerHTML += ' <font color="orange">(' + newValue + ')</font>';
			addProd += newValue - oldValue;
		}
	}

	// for last row add the new totals
	lastRow = realTable.rows[realTable.rows.length - 1];
	constrCell = lastRow.cells[4];
	prodCell = lastRow.cells[5];

	constrElem = constrCell.firstChild;
	oldConstr = Number(constrElem.innerHTML.replace(',', '').replace('.', ''));
	newConstr = oldConstr + addConstr;
	constrElem.innerHTML += ' <font color="orange">(' + newConstr + ')</font>';

	prodElem = prodCell.firstChild;
	oldProd = Number(prodElem.innerHTML.replace(',', '').replace('.', ''));
	newProd = oldProd + addProd;
	prodElem.innerHTML += ' <font color="orange">(' + newProd + ')</font>';
}

function addBaseQueue(elem)
{
	if(window.location.href.search('view=research') == -1)
	{
		timeCell  = 5;
	}
	else
	{
		timeCell = 3;
	}

	row = elem.parentNode.parentNode;
	elem = row.cells[1].getElementsByTagName('font');
	// If item already has queue info
	if(elem.length != 0)
	{
		elem = elem[0];
		currentLv = Number(elem.innerHTML.substr(7, elem.innerHTML.length - 8));
		currentLv++;
		elem.innerHTML = '{Level ' + currentLv + '}';

		elem = row.cells[2].getElementsByTagName('font')[0];
		currentCost = Number(elem.innerHTML.substr(1, elem.innerHTML.length - 2));
		currentCost *= 1.5;
		elem.innerHTML = '{' + currentCost.toFixed(0) + '}';

		elem = row.cells[timeCell].getElementsByTagName('font')[0];
		currentTime = stringToTime(elem.innerHTML.substr(1, elem.innerHTML.length - 2));
		currentTime *= 1.5;
		elem.innerHTML = '{' + timeToString(currentTime, 'h') + '}';
	}
	else
	{
		elem = row.cells[1];
		pos = elem.innerHTML.search('Level');
		// If level 0
		if(pos == -1)
		{
			currentLv = 0;
		}
		// if level >= 1
		else
		{
			currentLv = Number(elem.innerHTML.substr(pos + 6, elem.innerHTML.length - pos - 7).replace(/[)]/ig, ''));
		}
		currentLv++;
		row.cells[1].innerHTML += ' <font color="orange">(Level ' + currentLv + ')</font>';

		currentCost = row.cells[2].innerHTML.replace(/[,]/g, '').replace(/[.]/g, '');
		currentCost *= 1.5;
		row.cells[2].innerHTML += '<br><font color="orange">(' + currentCost.toFixed(0) + ')</font>';

		currentTime = stringToTime(row.cells[timeCell].innerHTML);
		currentTime *= 1.5;
		row.cells[timeCell].innerHTML += '<br><font color="orange">(' + timeToString(currentTime, 'h') + ')</font>';
	}
}

function removeBaseQueue(structure)
{
	// Get the table of structures
	table = document.getElementById('base_structures');
	endCell = 6;
	timeCell = 5;
	if(!table)
	{
		table = document.getElementById('base_defenses');
	}
	if(!table)
	{
		table = document.getElementById('base_reseach');
		endCell = 4;
		timeCell = 3;

		// Check if the user can even view the research here
		if(table.rows[1].cells[0].innerHTML.search('The research of this base') != -1 || table.rows[1].cells[0].innerHTML.search('You must build Research Labs first') != -1)
		{
			return;
		}
	}

	if(SKIN == 'Dark Astros')
	{
		table = table.rows[1].cells[0].firstChild.nextSibling.nextSibling;
		deleteCell = 1;
	}
	else if(SKIN == 'Deep Space')
	{
		table = table.rows[1].cells[0].firstChild;
		table = table.rows[0].cells[1].firstChild.firstChild.nextSibling.nextSibling.nextSibling;
		deleteCell = 0;
	}

	// Go through each line
	for(i = 1; i < table.rows.length; i += 2)
	{
		if(table.rows[i].innerHTML.search(structure) != -1)
		{
			row = table.rows[i];
			break;
		}
	}

	elem = row.cells[1].getElementsByTagName('font')[0];
	currentLv = Number(elem.innerHTML.substr(7, elem.innerHTML.length - 8));
	currentLv--;
	// If at actual level remove all of these extra labels
	if(elem.parentNode.innerHTML.search('Level ' + currentLv) != -1 ||
		(elem.parentNode.innerHTML.search('Level') > elem.parentNode.innerHTML.search('<font') && currentLv == 0))
	{
		elems = row.getElementsByTagName('font');
		while(elems.length != 0)
		{
			elems[0].parentNode.innerHTML = elems[0].parentNode.innerHTML.replace(/<br>/ig, '');
			elems[0].parentNode.removeChild(elems[0]);
		}
	}
	else
	{
		elem.innerHTML = '{Level ' + currentLv + '}';

		elem = row.cells[2].getElementsByTagName('font')[0];
		currentCost = Number(elem.innerHTML.substr(1, elem.innerHTML.length - 2));
		currentCost /= 1.5;
		elem.innerHTML = '{' + currentCost.toFixed(0) + '}';

		elem = row.cells[timeCell].getElementsByTagName('font')[0];
		currentTime = stringToTime(elem.innerHTML.substr(1, elem.innerHTML.length - 2));
		currentTime /= 1.5;
		elem.innerHTML = '{' + timeToString(currentTime, 'h') + '}';
	}
}

function refreshQueueItems(listElem)
{
	// Wait until the list of queued Items actually changes
	if(listElem == document.getElementById('item'))
	{
		window.setTimeout(
			function()
			{
				refreshQueueItems(listElem);
			}, 200);
		return;
	}

	listElem = document.getElementById('item');
	if(listElem)
	{
		opt = new Array(listElem.options.length);
		for(i = 0; i < listElem.options.length; i++)
		{
			opt[i] = listElem.options[i].value;
		}
	}
	else
	{
		opt = new Array();
	}

	// Get the table of structures
	table = document.getElementById('base_structures');
	endCell = 6;
	timeCell = 5;
	if(!table)
	{
		table = document.getElementById('base_defenses');
	}
	if(!table)
	{
		table = document.getElementById('base_reseach');
		endCell = 4;
		timeCell = 3;

		// Check if the user can even view the research here
		if(table.rows[1].cells[0].innerHTML.search('The research of this base') != -1 || table.rows[1].cells[0].innerHTML.search('You must build Research Labs first') != -1)
		{
			return;
		}
	}

	if(SKIN == 'Dark Astros')
	{
		table = table.rows[1].cells[0].firstChild.nextSibling.nextSibling;
		deleteCell = 1;
	}
	else if(SKIN == 'Deep Space')
	{
		table = table.rows[1].cells[0].firstChild;
		table = table.rows[0].cells[1].firstChild.firstChild.nextSibling.nextSibling.nextSibling;
		deleteCell = 0;
	}

	// Go through each line
	for(i = 1; i < table.rows.length; i += 2)
	{
		row = table.rows[i];

		// Search if this structure is possible to queue
		queue = false;
		if(row.cells[endCell].innerHTML.search('Build') != -1 || row.cells[endCell].innerHTML.search('Research') != -1)
		{
			queue = false;
		}
		else
		{
			for(j = 0; j < opt.length; j++)
			{
				if(table.rows[i].cells[0].innerHTML.search('Research Labs linked') != -1)
				{
					break;
				}

				row = table.rows[i];
				name = row.cells[1].firstChild.firstChild.innerHTML;

				if(opt[j] == name)
				{
					queue = true;
					break;
				}
			}
		}

		if(queue == true && row.cells[endCell].innerHTML.search('Queue') == -1)
		{
			input = document.createElement('input');
			input.type = 'button';
			input.value = 'Queue';
			input.title = j;
			input.addEventListener('click', function (e)
				{
					e.stopPropagation();
					queueItem(this);
				}
				, false);
			input.className = 'input-button';

			// If this is what is building
			if(row.cells[endCell].id == 'time1')
			{
				span = document.createElement('span');
				span.id = 'time1';
				span.class = 'active';
				span.title = row.cells[endCell].title;

				blank = document.createElement('span');
				blank.innerHTML = '<br/>';

				row.cells[endCell].innerHTML = '';
				row.cells[endCell].id = '';
				row.cells[endCell].class = '';
				row.cells[endCell].title = '';

				row.cells[endCell].appendChild(input);
				row.cells[endCell].appendChild(blank);
				row.cells[endCell].appendChild(span);
			}
			else
			{
				row.cells[endCell].innerHTML = "";
				row.cells[endCell].appendChild(input);
			}
		}
		// Change the title of the queue item
		else if(queue == true)
		{
			input = row.cells[endCell].firstChild;
			input.title = j;
		}
		else if(queue == false && row.cells[endCell].innerHTML.search('Queue') != -1)
		{
			if(row.cells[endCell].innerHTML.search('time1') == -1)
			{
				row.cells[endCell].className = 'gray inactive';
				row.cells[endCell].align = 'center';
				row.cells[endCell].innerHTML = 'working';
			}
			else
			{
				span = row.cells[endCell].lastChild;
				row.cells[endCell].innerHTML = span.innerHTML;
				row.cells[endCell].id = 'time1';
				row.cells[endCell].title = span.title;
			}
		}
	}

	elems = document.getElementsByClassName('remove-queue');
	for(i = 0; i < elems.length; i++)
	{
		elems[i].addEventListener('click',
			function()
			{
				listElem = document.getElementById('item');
				refreshQueueItems(listElem);
				removeBaseQueue(this.parentNode.parentNode.cells[0].innerHTML);
			},
		false);
	}
}

function queueItem(elem)
{
	listElem = document.getElementById('item');
	listElem.selectedIndex = elem.title;

	listElem.parentNode.parentNode.cells[1].firstChild.click();
	addBaseQueue(elem);

	refreshQueueItems(listElem);
}

function enhanceBaseConstruction()
{
	// Get already queued up items
	queueList = new Array();
	table = document.getElementById('base-queue_content');
	table = table.firstChild.firstChild;

	// Get list of items queued up
	for(i = 0; i < table.rows.length; i++)
	{
		if(table.rows[i].cells[1].innerHTML.search('Add to Queue') != -1)
		{
			break;
		}

		item = table.rows[i].cells[0].innerHTML;
		if(queueList[item] == null)
		{
			queueList[item] = 1;
		}
		else
		{
			queueList[item] = queueList[item] + 1;
		}
	}

	// Get the table of structures
	table = document.getElementById('base_structures');
	endCell = 6;
	timeCell = 5;
	if(!table)
	{
		table = document.getElementById('base_defenses');
	}
	if(!table)
	{
		table = document.getElementById('base_reseach');
		endCell = 4;
		timeCell = 3;

		// Check if the user can even view the research here
		if(table.rows[1].cells[0].innerHTML.search('The research of this base') != -1 || table.rows[1].cells[0].innerHTML.search('You must build Research Labs first') != -1)
		{
			return;
		}
	}

	if(SKIN == 'Dark Astros')
	{
		table = table.rows[1].cells[0].firstChild.nextSibling.nextSibling;
		deleteCell = 1;
	}
	else if(SKIN == 'Deep Space')
	{
		table = table.rows[1].cells[0].firstChild;
		table = table.rows[0].cells[1].firstChild.firstChild.nextSibling.nextSibling.nextSibling;
		deleteCell = 0;
	}

	// Get list of what can be done
	listElem = document.getElementById('item');
	if(listElem)
	{
		opt = new Array(listElem.options.length);
		for(i = 0; i < listElem.options.length; i++)
		{
			opt[i] = listElem.options[i].value;
		}
	}
	else
	{
		opt = new Array();
	}

	// Add queue option
	for(i = 1; i < table.rows.length; i += 2)
	{
		if(table.rows[i].cells[0].innerHTML.search('Research Labs linked') != -1)
		{
			break;
		}

		row = table.rows[i];
		name = row.cells[1].firstChild.firstChild.innerHTML;

		// If nothing to queue, menu already setup for it
		if(row.cells[endCell].innerHTML.search('Build') == -1 && row.cells[endCell].innerHTML.search('Research') == -1)
		{
			// Check if this is whats building to add it to queueList
			if(row.cells[endCell].id == 'timer1')
			{
				if(queueList[name] == null)
				{
					queueList[name] = 1;
				}
				else
				{
					queueList[name] = queueList[name] + 1;
				}
			}

			// Search for if their is a option to queue this building
			for(j = 0; j < opt.length; j++)
			{
				if(opt[j] == name)
				{
					input = document.createElement('input');
					input.type = 'button';
					input.value = 'Queue';
					input.title = j;
					input.addEventListener('click', function (e)
						{
							e.stopPropagation();
							queueItem(this);
						}
						, false);
					input.className = 'input-button';

					// If this is what is building
					if(row.cells[endCell].id == 'timer1')
					{
						span = document.createElement('span');
						span.id = 'timer1';
						span.class = 'active';
						span.title = row.cells[endCell].title;

						blank = document.createElement('span');
						blank.innerHTML = '<br/>';

						row.cells[endCell].innerHTML = '';
						row.cells[endCell].id = '';
						row.cells[endCell].class = '';
						row.cells[endCell].title = '';

						row.cells[endCell].appendChild(input);
						row.cells[endCell].appendChild(blank);
						row.cells[endCell].appendChild(span);
					}
					else
					{
						row.cells[endCell].innerHTML = "";
						row.cells[endCell].appendChild(input);
					}

					break;
				}

			}

			// Search for if there is a item of this type queued
			if(queueList[name] != null)
			{
				currentCost = row.cells[2].innerHTML;
				currentCost = currentCost.replace(/[,]/g, '').replace(/[.]/g, '');

				currentTime = row.cells[timeCell].innerHTML;
				currentTime = stringToTime(currentTime);

				currentLv = row.cells[1].innerHTML;
				currentLv = currentLv.split('(');
				if(currentLv.length != 1)
				{
					currentLv = currentLv[1].split(')')[0];
					currentLv = Number(currentLv.substr(6));
				}
				else
				{
					currentLv = 0;
				}

				queued = Number(queueList[name]);
				for(j = 0; j < queued; j++)
				{
					currentCost *= 1.5;
					currentTime *= 1.5;
					currentLv++;
				}

				row.cells[2].innerHTML += '<br/><font color="orange">(' + currentCost.toFixed(0) + ')</font>';
				row.cells[timeCell].innerHTML += '<br/><font color="orange">(' + timeToString(currentTime, 'h') + ')</font>';
				row.cells[1].innerHTML += ' <font color="orange">(Level ' + currentLv + ')</font>';
			}
		}
		// row.cells[endCell].align = 'right';
	}

	elems = document.getElementsByClassName('remove-queue');
	for(i = 0; i < elems.length; i++)
	{
		elems[i].addEventListener('click',
			function()
			{
				listElem = document.getElementById('item');
				refreshQueueItems(listElem);
				removeBaseQueue(this.parentNode.parentNode.cells[0].innerHTML);
			},
		false);
	}
}

function resetRecallTime()
{
	elem = document.getElementById('recall_duration');
	recallTime = Number(elem.title);
	elem.title = recallTime + 1;

	recallTimeString = timeToString(recallTime, 'h');

	elem.value = 'Recall Fleet (' + recallTimeString + ')';
}

function addRecallTime()
{
	arrivalElem = document.getElementById('timer1');
	arrivalTime = arrivalElem.title;

	centerElems = document.getElementsByTagName('center');
	for(i = 0; i < centerElems.length; i++)
	{
		if(centerElems[i].innerHTML.search('Travel Duration:') != -1)
		{
			durationElem = centerElems[i];
			break;
		}
	}

	parts = durationElem.firstChild.innerHTML.split(": ");
	duration = parts[1];

	secs = stringToTime(duration);

	recallTime = secs - arrivalTime;

	elems = document.getElementsByTagName('input');
	for(i = 0; i < elems.length; i++)
	{
		if(elems[i].value == 'Recall Fleet')
		{
			elems[i].id = 'recall_duration';
			elems[i].title = recallTime;
			break;
		}
	}

	resetRecallTime();
	setInterval(function() {resetRecallTime()}, 1000);
}

function removeNonAttackable()
{
	table = document.getElementById('fleets_attack-list');
	if(SKIN == 'Dark Astros')
	{
		table = table.rows[1].cells[0].firstChild;
	}
	else if(SKIN == 'Deep Space')
	{
		table = table.rows[1].cells[0].firstChild;
		table = table.rows[0].cells[1].firstChild.firstChild.nextSibling
	}

	for(i = 1; i < table.rows.length; i++)
	{
		if(table.rows[i].cells[3].innerHTML == '')
		{
			table.deleteRow(i);
			i--;
		}
	}
}

function delayedMove()
{
	// Get current date/time
	timeElem = document.getElementById('server-time');
	timeDate = new Date(timeElem.innerHTML);

	// Get desired date/time
	launchElem = document.getElementById('launch');
	launchDate = new Date(launchElem.value);

	// check if time to launch
	if((timeDate.getTime() - launchDate.getTime()) > 0)
	{
		// Find move button
		elems = document.getElementsByTagName('input');
		for(i = 0; i < elems.length; i++)
		{
			if(elems[i].value == 'Move')
			{
				elems[i].click();
			}
		}
	}
}

function startDelayedMove()
{
	elem = document.getElementById('autoLaunch');

	if(elem.value == 'Enable Auto-Launch')
	{
		elem.value = 'Disable Auto-Launch';

		delayedInterval = setInterval(
			function()
			{
				delayedMove();
			},
			1000
		);
	}
	else
	{
		elem.value = 'Enable Auto-Launch';
		clearInterval(delayedInterval);
	}
}

function addDelayedMove()
{
	table = document.getElementById('fleet_move');
	if(SKIN == 'Dark Astros')
	{
		table = table.rows[1].cells[0].firstChild.firstChild;
	}
	else if(SKIN == 'Deep Space')
	{
		table = table.rows[1].cells[0].firstChild;
		table = table.rows[0].cells[1].firstChild.firstChild.nextSibling.firstChild;
	}

	// Find move row
	for(i = 0; i < table.rows.length; i++)
	{
		if(table.rows[i].innerHTML.search('value="Move"') != -1)
		{
			i++;
			break;
		}
	}

	// Get current date/time
	timeElem = document.getElementById('server-time');

	row = table.insertRow(i);
	cell = document.createElement('th');
	if(SKIN == 'Dark Astros')
	{
		cell.innerHTML = '<input type="text" id="launch" class="quant" value="' + timeElem.innerHTML + '" size="26">';
	}
	else if(SKIN == 'Deep Space')
	{
		cell.innerHTML = '<input type="text" id="launch" class="quant input-numeric" value="' + timeElem.innerHTML + '" size="26">';
	}
	cell.align = 'center';
	cell.colSpan = '7';
	row.appendChild(cell);
	i++;

	row = table.insertRow(i);
	cell = document.createElement('th');
	link = document.createElement('input');
	link.type = 'button';
	link.value = 'Enable Auto-Launch';
	link.id = 'autoLaunch';
	link.addEventListener('click',
		function()
		{
			startDelayedMove();
		},
	false);
	link.className = 'input-button';
	cell.appendChild(link);
	cell.align = 'center';
	cell.colSpan = '7';
	row.appendChild(cell);
}

function enhanceTradePage()
{
	table = document.getElementById('empire_trade_trade-routes');
	if(SKIN == 'Dark Astros')
	{
		table = table.rows[1].cells[0].firstChild;
	}
	else if(SKIN == 'Deep Space')
	{
		table = table.rows[1].cells[0].firstChild;
		table = table.rows[0].cells[1].firstChild.firstChild.nextSibling;
	}

	// Get list of players
	players = new Array();
	for(i = 1; i < table.rows.length - 1; i++)
	{
		row = table.rows[i];

		// Check for duplicates
		nameElem = row.cells[1].firstChild.nextSibling.nextSibling;
		name = nameElem.innerHTML;

		// Check if player already found
		if(players[name] == null)
		{
			players[name] = i;
		}
		else
		{
			nameElem.innerHTML += ' <font color="red">(duplicate)</font>';

			// Havent changed first occurance yet
			if(players[name] != 0)
			{
				nameElem = table.rows[players[name]].cells[1].firstChild.nextSibling.nextSibling;
				nameElem.innerHTML += ' <font color="red">(duplicate)</font>';
			}
		}

		// Put difference between bases
		base1 = Number(row.cells[2].firstChild.wholeText);
		base2 = Number(row.cells[3].firstChild.wholeText);
		diff = base2 - base1;
		if(diff < 0)
		{
			diff = ' <font color="red">(' + diff + ')</font>';
		}
		else
		{
			diff = ' <font color="orange">(+' + diff + ')</font>';
		}

		row.cells[3].innerHTML += diff;
	}
}



/////////////////////////////////////////////////////////////
/////////////////////// Main ////////////////////////////////
/////////////////////////////////////////////////////////////

start = new Date();

//// Do for all AE pages
// Check if allowed to run
//getServer();
//addOptions();
//checkToRun();


//// Specific page enhancements
// If base or astro page, move fleet summary up to top default on
if((window.location.href.search('map.aspx') != -1 && window.location.href.search(/[A-Z][0-9][0-9][:][0-9][0-9][:][0-9][0-9][:][0-9][0-9]/i) != -1) || window.location.href.search('base.aspx') != -1)
{
	moveFleetSummary();
}

// Add commander effects on capacity page
if(window.location.href.search('bases_capacities') != -1)
{
	enhanceCapacities();
}
// Add commander effects on base page
if(window.location.href.search('base.aspx') != -1)
{
	if(window.location.href.search('structures') != -1 || window.location.href.search('defenses') != -1 || window.location.href.search('research') != -1)
	{
		enhanceBaseConstruction();
	}
}
// Add recall time for in transit fleets
if(window.location.href.search('fleet.aspx?') != -1)
{
	if(document.getElementById('timer1') && window.location.href.search('recall') == -1)
	{
		addRecallTime();
	}
	else if(window.location.href.search('view=attack') != -1)
	{
		removeNonAttackable();
	}
	else if(window.location.href.search('view=move') != -1)
	{
		addDelayedMove();
	}
}

// Duplicates/difference in econ on trade page
if(window.location.href.search('view=trade') != -1)
{
	enhanceTradePage();
}


end = new Date();
// alert((end.getTime() - start.getTime()) / 1000);




//Scouting Section of Main//



// Check if a scout report exists
checkScoutReport();
// Check if currently scouting
checkScouting();


	addScoutLink();





