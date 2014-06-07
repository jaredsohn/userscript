// ==UserScript==
// @name           AstroEmpiresPillageBonus
// @namespace      gimmethegepgun@yahoo.com
// @description    Displays Pillage Bonus on Player bases
// @include        http://*.astroempires.com/base.aspx?*
// @exclude        http://*.astroempires.com/base.aspx
// @exclude        http://*.astroempires.com/base.aspx?*&view=*
// ==/UserScript==

var MAX_ECON_INDEX = 6;
var CURRENT_ECON_INDEX = 7;
var ECON_NODE_INDEX = 1;
var OWNER_NAME_INDEX = 9;
var PILLAGE_ECON_REDUCTION = 0.3;
var NUMBER_SPACER = ',';
var DEFAULT_TABLE_SETTINGS = 'align="center" colspan="3"';
var baseTable = document.getElementsByClassName('base');

function getMaxEcon()
{
	var maxEcon = baseTable[0].firstChild.firstChild.lastChild.firstChild.firstChild.childNodes[MAX_ECON_INDEX].childNodes[ECON_NODE_INDEX].firstChild.nodeValue;
	
	return maxEcon;
}

function getCurrentEcon()
{
	var currentEcon = baseTable[0].firstChild.firstChild.lastChild.firstChild.firstChild.childNodes[CURRENT_ECON_INDEX].childNodes[ECON_NODE_INDEX].firstChild.nodeValue;
	
	return currentEcon;
}

function calcEndEcon()
{
	var endEcon = getMaxEcon() - Math.floor(getMaxEcon() * PILLAGE_ECON_REDUCTION);

	return endEcon;
}

function calcEconDifference()
{
	var econDifference = getCurrentEcon() - calcEndEcon();

	return econDifference;
}

function calcPillageBonus()
{
	var pillageBonus = Math.floor(Math.pow(calcEconDifference(), 2) * 6);

	return pillageBonus;
}

function addCommas(number)
{
	var actualStore = "";
	var tempStore1 = 0;
	var tempStore2 = 0;
	var processed = false;

	while(number > 999)
	{
		tempStore1 = number - (Math.floor(number / 1000) * 1000);
		if(tempStore1 == 0)
		{
			tempStore2 = "000";
		}
		else if(tempStore1 < 10)
		{
			tempStore2 = "00" + tempStore1;
		}
		else if(tempStore1 < 100)
		{
			tempStore2 = "0" + tempStore1;
		}
		else
		{
			tempStore2 = tempStore1;
		}
		if(actualStore != "")
		{
			actualStore = NUMBER_SPACER + tempStore2 + actualStore;
		}
		else
		{
			actualStore = NUMBER_SPACER + tempStore2;
		}
		number = Math.floor(number / 1000);
		processed = true;
	}

	if(processed)
	{
		actualStore = number + actualStore;
		return actualStore;
	}
	else
	{
		return number;
	}
}

function createPillageRow()
{
	var pillageRow = document.createElement("tr");
	var pillageBonus = calcPillageBonus();
	var commas = addCommas(pillageBonus);
	var pillageText = document.createTextNode("Pillage Bonus: " + commas + " credits.");
	
	baseTable[0].firstChild.appendChild(pillageRow);
	pillageRow.innerHTML = '<td ' + DEFAULT_TABLE_SETTINGS + '></td>';
	var pillageDown = pillageRow.firstChild;
	pillageDown.appendChild(pillageText);
}

function getPlayerName()
{
	var ownerName = baseTable[0].firstChild.firstChild.lastChild.firstChild.firstChild.childNodes[OWNER_NAME_INDEX].lastChild.textContent;
	if(ownerName != 'United Colonies' && ownerName != 'Drekons')
	{
		createPillageRow();
	}
}

function checkSelfBase()
{
	structuresTab = document.getElementById('structures');
	if(structuresTab == null)
	{
		getPlayerName();
	}
}
checkSelfBase();