//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Base Uploader - Battle Calc
// @description   Simulation Battle Calculator
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
