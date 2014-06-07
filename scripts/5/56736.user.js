// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  It was written using
// Greasemonkey 0.8 and FireFox 3.0.13
// To install Greasemonkey go to http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "New Equipment Tracker", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           New Equipment Tracker
// @namespace      http://www.mythicwars.com/norron/g_spyMissions.asp
// @description    Adds the text "(new)" next to pieces of equipment that were not on the page the last time the user visited
// @include        http://www.mythicwars.com/norron/g_equipment.asp
// ==/UserScript==


// Object to keep track of equipment stats.  Really just here so that I could practice using objects but also may add readability.
function Equipment()
{
	this.name = "";
	this.cost = 0;
	this.power  = 0;
	this.strength = 0;
	this.vitality = 0;
	this.knowledge = 0;
	this.fourthAttribute = 0;
	this.toString = function()
	{
		return this.name+this.cost+this.power+this.strength+this.vitality+this.knowledge+this.fourthAttribute;
	}
}

// Function used to get previously seen equipment
function getSavedValues()
{
	return GM_listValues().map(GM_getValue);
}

// Function used to save all the pieces of equipment.
function saveValues(list)
{
	var ID = 1;
	for each(var eq in list) {
		GM_setValue(ID, eq.toString());
		ID++;
	}
}

// Deletes all saved values for this script.  Had to implement this because of the fact that equipment just disappears through
// the game mechanics.  That useless values would just accumulate throughout the age without this.
function deleteSavedValues()
{
	for each(var val in GM_listValues()) {
		GM_deleteValue(val);
	}
}

// Prints saved equipment. Used for debugging.
function printSavedValues()
{
	var vals = GM_listValues().map(GM_getValue);
	GM_log(vals);
}

// Initialize our lists.  Only one will be used depending on if this is the first time you've run this script or not.
var listOfEquipment = new Array();
var listOfSeenEquipment = getSavedValues();

window.setTimeout( function() 
{
	// Get the table which displays the equipment. Hard coded number chosen through trial and error.
	var equipmentTable = document.getElementsByTagName('table')[29];

	// The equipment data starts at the third row past the header stuff and ends 4th from the last. Trial and error once again.
	for(var i=3; i<=equipmentTable.rows.length-4; i++)
	{
		// Initialize a new piece of equipment
		var eq = new Equipment();

		// The second column of the table contains the name and the cost
		var col2 = equipmentTable.rows[i].cells[1];
		eq.name = col2.getElementsByTagName('b')[0].innerHTML;
		var trimming = col2.getElementsByTagName('i')[0].innerHTML;
		eq.cost = trimming.substring(trimming.indexOf(' '), trimming.lastIndexOf(' '));

		// The third column contains the stats
		var col3 = equipmentTable.rows[i].cells[2];
		var statsText = col3.innerHTML;
		statsText = statsText.substr(statsText.indexOf(';')+1);
		var stats = statsText.split(',');

		// Power is the term used for Offence or Deffence
		eq.power = stats[0];

		// If the equipment has stat boosts then parse them and record the value.
		if(stats.length > 1)
		{
			for(var j=1; j<stats.length; j++)
			{
				if(stats[j].search(/Strength/) != -1)
					eq.strength = stats[j].substr(stats[j].indexOf('+')+1);
				if(stats[j].search(/Vitality/) != -1)
					eq.vitality = stats[j].substr(stats[j].indexOf('+')+1);
				if(stats[j].search(/Knowledge/) != -1)
					eq.knowledge = stats[j].substr(stats[j].indexOf('+')+1);
				if(stats[j].search(/Economics/) != -1)
					eq.fourthAttribute = stats[j].substr(stats[j].indexOf('+')+1);
				if(stats[j].search(/Thievery/) != -1)
					eq.fourthAttribute = stats[j].substr(stats[j].indexOf('+')+1);
				if(stats[j].search(/Wielding/) != -1)
					eq.fourthAttribute = stats[j].substr(stats[j].indexOf('+')+1);
				if(stats[j].search(/Wisdom/) != -1)
					eq.fourthAttribute = stats[j].substr(stats[j].indexOf('+')+1);
			}
		}
		
		// If there are saved values (not the first time running) then test this piece of equipment
		// against the ones seen before.  If this is a new piece of equipment then add it to the list
		// of seen equipment and place "(new)" after the name. Otherwise put "(new)" at the end of 
		// every piece and add it to the other list.
		if(listOfSeenEquipment != "")
		{
			var isNew = true;
			for each(var equip in listOfSeenEquipment)
			{
				if(equip == eq) {
					isNew = false;
					listOfEquipment.push(eq);
					break;
				}
			}
			if(isNew) {
				listOfEquipment.push(eq);
				col2.getElementsByTagName('b')[0].innerHTML += '<font color=green>(new)</font>';
			}
		}
		else {
			col2.getElementsByTagName('b')[0].innerHTML += '<font color=green>(new)</font>';
			listOfEquipment.push(eq);
		}

	}

	// Saving the lists of equipment.  See function calls above for explanation.
	deleteSavedValues();
	saveValues(listOfEquipment);

}, 100);