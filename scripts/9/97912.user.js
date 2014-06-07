// ==UserScript==
// @name           Clear Sight Helper
// @namespace      http://www.kamikazegames.com/dominion
// @description    Estimates spies and wizards from a Clear Sight.
// @include        http://www.kamikazegames.com/dominion/magic.asp
// @include        http://www.kamikazegames.com/dominion/opcenter.asp*
// ==/UserScript==


try
{
	var rulerNodes = document.evaluate(
		"//font[text()='Ruler:']",
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null);

	for (var i = 0; i < rulerNodes.snapshotLength; i++)
	{
		updateClearSight(rulerNodes.snapshotItem(i));
	}
}
catch (e)
{
	alert("Error: " + e);
}


// Do the update to a clear sight
function updateClearSight(rulerNode)
{
	// Parse the clear sight
	//
	var data = {};
	var mainTable = rulerNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
	var subtables = mainTable.getElementsByTagName("table");

	var s = trim(mainTable.rows[0].textContent);
	var iEnd = s.lastIndexOf("(") - 1;
	data.dominion = s.substring(16, iEnd);

	var temp = subtables[0].getElementsByTagName("td");
	data.race = trim(temp[4].textContent);
	data.land = toInt(temp[6].textContent);
	data.networth = toInt(temp[12].textContent);

	temp = subtables[2].getElementsByTagName("td");
	data.ospecs = toInt(temp[6].textContent);
	data.dspecs = toInt(temp[8].textContent);
	data.elite1 = toInt(temp[10].textContent);
	data.elite2 = toInt(temp[12].textContent);

	// Calculate the shown networth
	//
	var nwData = getNetworthData();
	var nw =
		25 * data.land +
		5 * (data.ospecs + data.dspecs) +
		nwData[data.race].elite1 * data.elite1 +
		nwData[data.race].elite2 * data.elite2;

	// Estimate spies + wizards + archmages
	//
	nw = Math.ceil(nw); 
	var estimate = Math.ceil((data.networth - nw) / 5);

	// Add an indicator for unverified races
	//
	if (!nwData[data.race].verified)
	{
		estimate += "*";
	}

	// Insert the info
	//
	temp[13].childNodes[1].textContent = "Spies +";
	temp[14].childNodes[1].textContent = "";
	temp[15].childNodes[1].textContent = "Wizards +";
	temp[16].childNodes[1].textContent = "";
	temp[18].childNodes[1].textContent = estimate;
	temp[18].childNodes[1].style.color = "#00ff00";

	// Function to revert the clear sight (necessary to paste it into Talium's attack calculator)
	//
	var fnRevert = function()
	{
		temp[13].childNodes[1].textContent = "Spies:";
		temp[14].childNodes[1].textContent = "?";
		temp[15].childNodes[1].textContent = "Wizards:";
		temp[16].childNodes[1].textContent = "?";
		temp[18].childNodes[1].textContent = "?";
		temp[18].childNodes[1].style.color = "";
	};

	// Generate the op center link
	//
	var url = "http://www.kamikazegames.com/dominion/opcenter.asp?optype=1&dom=" + data.dominion.replace(" ", "+");
	var newLink = document.createElement("a");
	newLink.href = url;
	newLink.textContent = "Op Center";
	newLink.style.marginLeft = "20px";
	newLink.style.textDecoration = "none";
	newLink.style.fontSize = "11px";

	var td = mainTable.getElementsByTagName("td")[0];
	td.appendChild(newLink);
	
	// Insert the "revert" link
	//
	newLink = document.createElement("a");
	newLink.textContent = "Revert";
	newLink.href = "#";
	newLink.style.marginLeft = "20px";
	newLink.style.fontSize = "11px";
	newLink.style.textDecoration = "none";
	newLink.addEventListener("click", fnRevert, true);
	td.appendChild(newLink);
}

// Convert a string with commas to an int
function toInt(s)
{
	s = s.replace(/,/g,"");
	return parseInt(s);
}

// Trim whitespace from a string
function trim(s)
{
	return s.replace(/^\s*/, "").replace(/\s*$/, "");
}

// Dump an object
function dump(o)
{
	var s = "";
	
	for (var key in o)
	{
		s += key + ": >" + o[key].toString() + "<\n";
	}
	
	alert(s);
}

// Networth data for elites
function getNetworthData()
{
	return {
		"Human" : {
			verified : true, // Round 66
			elite1 : 11,
			elite2 : 12.15
		},

		"Spirit" : {
			verified : true, // Round 66
			elite1 : 8,
			elite2 : 8
		},

		"Dwarf" : {
			verified : true, // Round 66
			elite1 : 8.55,
			elite2 : 11.9
		},

		"Wood Elf" : {
			verified : true, // Round 66
			elite1 : 12,
			elite2 : 13
		},

		"Halfling" : {
			verified : true, // Round 66
			elite1 : 10.35,
			elite2 : 8.1
		},

		// Status: UNVERIFIED
		"Gnome" : {
			elite1 : 11.7, // wiki=11.7
			elite2 : 10.35 // wiki=11
		},

		"Merfolk" : {
			verified : true, // Round 66
			elite1 : 8.1, // verified to 1 digit
			elite2 : 11.25
		},

		// Status: UNVERIFIED
		"Sylvan" : {
			elite1 : 9.9, // wiki=9.5
			elite2 : 9.9 // wiki=10.5
		},

		"Firewalker" : {
			verified : true, // Round 66
			elite1 : 8,
			elite2 : 10
		},

		"Nomad" : {
			verified : true, // Round 66
			elite1 : 11,
			elite2 : 12.15
		},

		"Undead" : {
			verified : true, // Round 66
			elite1 : 8,
			elite2 : 8
		},

		"Goblin" : {
			verified : true, // Round 66
			elite1 : 10.35,
			elite2 : 11.7
		},

		"Troll" : {
			verified : true, // Round 66
			elite1 : 9.9,
			elite2 : 13.9
		},

		"Dark Elf" : {
			verified : true, // Round 66
			elite1 : 11.7,
			elite2 : 10.8
		},

		// Status: UNVERIFIED
		"Lycanthrope" : {
			elite1 : 8.55, // wiki=8
			elite2 : 10.8 // wiki=10.8
		},

		// Status: UNVERIFIED
		"Kobold" : {
			elite1 : 7.2,
			elite2 : 8.1
		},

		"Lizardfolk" : {
			verified : true, // Round 66
			elite1 : 9,
			elite2 : 11
		},

		"Icekin" : {
			verified : true, // Round 66
			elite1 : 10.35,
			elite2 : 11.7
		},

		// Status: UNVERIFIED
		"Orc" : {
			elite1 : 5.4, // wiki=9
			elite2 : 11.9 // wiki=11.9
		},

		// Status: UNVERIFIED
		"Nox" : {
			elite1 : 3.6, // wiki=9
			elite2 : 8.1 // wiki=9.9
		}
	};
}