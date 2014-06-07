// ==UserScript==
// @name           BvS RyoTools
// @namespace      Dorian
// @description    Computer allotted villager Science requests based on raids.  Modified from SirDuck36's KageTools script.
// @include        http://*animecubed.com/billy/bvs/village.*
// @include        http://*animecubed.com/billy/bvs/villagescience.*
// ==/UserScript==




////////////////////////////////////////////////////////////////////////
///////////                LIBRARY CODE                /////////////////
////////////////////////////////////////////////////////////////////////

/*
	DOM Storage wrapper class (credits: http://userscripts.org/users/dtkarlsson)
	Constructor:
		var store = new DOMStorage({"session"|"local"}, [<namespace>]);
	Set item:
		store.setItem(<key>, <value>);
	Get item:
		store.getItem(<key>[, <default value>]);
	Remove item:
		store.removeItem(<key>);
	Get all keys in namespace as array:
		var array = store.keys();
*/

function DOMStorage(type, namespace) {
	var my = this;

	if (typeof(type) != "string")
		type = "session";
	switch (type) {
		case "local": my.storage = localStorage; break;
		case "session": my.storage = sessionStorage; break;
		default: my.storage = sessionStorage;
	}

	if (!namespace || typeof(namespace) != "string")
		namespace = "Greasemonkey";

	my.ns = namespace + ".";
	my.setItem = function(key, val) {
		try {
			my.storage.setItem(escape(my.ns + key), val);
		}
		catch (e) {
			GM_log(e);
		}
	},
	my.getItem = function(key, def) {
		try {
			var val = my.storage.getItem(escape(my.ns + key));
			if (val)
				return val;
			else
				return def;
		}
		catch (e) {
			return def;
		}
	}
	// Kludge, avoid Firefox crash
	my.removeItem = function(key) {
		try {
			my.storage.setItem(escape(my.ns + key), null);
		}
		catch (e) {
			GM_log(e);
		}
	}
	// Return array of all keys in this namespace
	my.keys = function() {
		var arr = [];
		var i = 0;
		do {
			try {
				var key = unescape(my.storage.key(i));
				if (key.indexOf(my.ns) == 0 && my.storage.getItem(key))
					arr.push(key.slice(my.ns.length));
			}
			catch (e) {
				break;
			}
			i++;
		} while (true);
		return arr;
	}
}
// End DOM Storage Wrapper class

// UI (credits: http://userscripts.org/users/dtkarlsson)
function Window(id, storage)
{
	var my = this;
	my.id = id;
	my.offsetX = 0;
	my.offsetY = 0;
	my.moving = false;

	// Window dragging events
	my.drag = function(event) {
		if (my.moving) {
			my.element.style.left = (event.clientX - my.offsetX)+'px';
			my.element.style.top = (event.clientY - my.offsetY)+'px';
			event.preventDefault();
		}
	}
	my.stopDrag = function(event) {
		if (my.moving) {
			my.moving = false;
			var x = parseInt(my.element.style.left);
			var y = parseInt(my.element.style.top);
			if(x < 0) x = 0;
			if(y < 0) y = 0;
			storage.setItem(my.id + ".coord.x", x);
			storage.setItem(my.id + ".coord.y", y);
			my.element.style.opacity = 1;
			window.removeEventListener('mouseup', my.stopDrag, true);
			window.removeEventListener('mousemove', my.drag, true);
		}
	}
	my.startDrag = function(event) {
		if (event.button != 0) {
			my.moving = false;
			return;
		}
		my.offsetX = event.clientX - parseInt(my.element.style.left);
		my.offsetY = event.clientY - parseInt(my.element.style.top);
	       
                if (my.offsetY > 27)
    		    return;

		my.moving = true;
		my.element.style.opacity = 0.75;
		event.preventDefault();
		window.addEventListener('mouseup', my.stopDrag, true);
		window.addEventListener('mousemove', my.drag, true);
	}

    my.show = function()
    {
	this.element.style.visibility = 'visible';
    }

    my.hide = function()
    {
	this.element.style.visibility = 'hidden';
    }

    my.reset = function()
    {
      storage.setItem(my.id + ".coord.x", 6);
      storage.setItem(my.id + ".coord.y", 6);

      my.element.style.left = "6px";
      my.element.style.top = "6px";
    } 

	my.element = document.createElement("div");
	my.element.id = id;
	document.body.appendChild(my.element);
	my.element.addEventListener('mousedown', my.startDrag, true);

	if (storage.getItem(my.id + ".coord.x"))
		my.element.style.left = storage.getItem(my.id + ".coord.x") + "px";
	else
		my.element.style.left = "6px";
	if (storage.getItem(my.id + ".coord.y"))
		my.element.style.top = storage.getItem(my.id + ".coord.y") + "px";
	else
		my.element.style.top = "6px";
}
// End UI Window implementation






// Returns the time as milliseconds on a local time object in Billy time
function ConvertBillyTime(day) {
    var localTime = day.getTime();
    var localOffset = day.getTimezoneOffset() * 60000;
    var utcTime = localTime + localOffset;
    var billyOffset = -5;
    var billyTime = utcTime + 3600000 * billyOffset;
    var billyDay = new Date(billyTime);

    return billyDay;
}






////////////////////////////////////////////////////////////////////////
///////////             DATA STRUCTURES                /////////////////
////////////////////////////////////////////////////////////////////////



// Data structure for an individual player
//    Input: DOM storage data string (strData)
//        if null, default initialization data is used
//    Function toString: generate the player data string for DOM storage
function PlayerData(strData)
{
    // Set default values
    this.dateInitialized     = (new Date()).getTime();  // Beginning of recorded history
    this.totalRyo            = 2240000;                 // Total vryo banked
    this.spentRyo            = 0;                       // Total vryo spent
    this.ryoRaid             = 0;                       // Total vryo earned via raids
    this.ryoCDonate          = 0;                       // Total vryo earned via contract donations
    this.ryoCMill            = 0;                       // Total vryo earned via contract mills
    this.numUnleash          = 0;                       // Total number of Science unleashes
    this.numRaid             = 0;                       // Total number of raids

    this.logText = ""; // Logging info, not stored for now but possibly displayed when script is run


    // Extract information from DOM Storage format, if strData not null
    if (strData)
    {
	var data = strData.split("|");
	this.dateInitialized              = parseInt(data[0],  10);
        this.totalRyo                     = parseInt(data[1],  10);
        this.spentRyo                     = parseInt(data[2],  10);
        this.ryoRaid                      = parseInt(data[3],  10);
        this.ryoCDonate                   = parseInt(data[4],  10);
        this.ryoCMill                     = parseInt(data[5],  10);
	this.numUnleash                   = parseInt(data[6],  10);
	this.numRaid                      = parseInt(data[7],  10);
    }

    // Convert data to | delimited string format
    //    Used for DOM Storage
    this.toString = function()
    {
	var retArr = new Array(
	    this.dateInitialized              ,
            this.totalRyo                     ,
            this.spentRyo                     ,
            this.ryoRaid                      ,
            this.ryoCDonate                   ,
            this.ryoCMill                     ,
            this.numUnleash                   ,
	    this.numRaid
	);

	return retArr.join("|");
    }

}  // End PlayerData Definition



// Data structure for RyoTools Information
//     Input: DOM storage object
function RyoToolInfo(storage)
{
    // Storage object
    this.storage = storage;

    // Get User Name
    this.namePlayer = GetPlayerName();

    // Default values for script related storage
    this.prevVillageId      = 9605406;  // Most recent parsed village message id
    this.prevVillageTime    = 0;        // Timestamp of most recent village log parsing

    // Default Ryo value policy
    this.ryoValScience1    =   20000;  // Amount of Ryo needed to request Science 1
    this.ryoValScience2    =   40000;  // Amount of Ryo needed to request Science 2
    this.ryoValScience3    =   80000;  // Amount of Ryo needed to request Science 3
    this.ryoValScience4    =  640000;  // Amount of Ryo needed to request Science 4
    this.ryoValScience5    = 1600000;  // Amount of Ryo needed to request Science 5
    this.ryoValScience6    = 2800000;  // Amount of Ryo needed to request Science 6
    this.raidPackValue     =    1000;  // Amount of Ryo banked per thousand taken in raid
    this.cDonatePackValue  =    1000;  // Amount of Ryo banked per thousand donated in contracts
    this.cMillPackValue    =     500;  // Amount of Ryo banked per thousand milled in contracts

    // Array of all variable names and descriptions, used to build Preferences window
    this.arrInfoVars = [
	'ryoValScience1'  ,  'Ryo needed for Science 1 request',
	'ryoValScience2'  ,  'Ryo needed for Science 2 request',
	'ryoValScience3'  ,  'Ryo needed for Science 3 request',
	'ryoValScience4'  ,  'Ryo needed for Science 4 request',
	'ryoValScience5'  ,  'Ryo needed for Science 5 request',
	'ryoValScience6'  ,  'Ryo needed for Science 6 request',
        'raidPackValue'   ,  'Amount of Ryo banked per thousand taken in raid',
        'cDonatePackValue',  'Amount of Ryo banked per thousand donated in contracts',
        'cMillPackValue'  ,  'Amount of Ryo banked per thousand milled in contracts'
    ];


    // Function to clear information from DOM storage
    this.ClearInfo = function()
    {
	this.storage.removeItem(this.namePlayer + "_Ryo_Info");
    }

    // Function to load information from DOM storage
    this.LoadInfo = function()
    {
	var strData = this.storage.getItem(this.namePlayer + "_Ryo_Info", null);
	if (!strData)
	    return;

	var data = strData.split("|");
	var i = -1;

	if (++i < data.length)    this.prevVillageId             = parseInt(data[i],  10);
	if (++i < data.length)    this.prevVillageTime           = parseInt(data[i],  10);

	if (++i < data.length)    this.ryoValScience1            = parseInt(data[i],  10);
	if (++i < data.length)    this.ryoValScience2            = parseInt(data[i],  10);
	if (++i < data.length)    this.ryoValScience3            = parseInt(data[i],  10);
	if (++i < data.length)    this.ryoValScience4            = parseInt(data[i],  10);
	if (++i < data.length)    this.ryoValScience5            = parseInt(data[i],  10);
	if (++i < data.length)    this.ryoValScience6            = parseInt(data[i],  10);
	if (++i < data.length)    this.raidPackValue             = parseInt(data[i],  10);
	if (++i < data.length)    this.cDonatePackValue          = parseInt(data[i],  10);
	if (++i < data.length)    this.cMillPackValue            = parseInt(data[i],  10);
    }

    // Function to save information to DOM storage
    this.SaveInfo = function()
    {
	// Ensure quality of player data before saving
	//   In particular, don't update log markers or times if data was corrupted
	ryoTool.CheckPlayerData();

	var dataArr = new Array(
	    this.prevVillageId             ,
	    this.prevVillageTime           ,
	    this.ryoValScience1            ,
	    this.ryoValScience2            ,
	    this.ryoValScience3            ,
	    this.ryoValScience4            ,
	    this.ryoValScience5            ,
	    this.ryoValScience6            ,
            this.raidPackValue             ,
            this.cDonatePackValue          ,
            this.cMillPackValue
	);

	this.storage.setItem(this.namePlayer + "_Ryo_Info", dataArr.join("|"));

    }

}  // End RyoToolInfo Definition


// RyoTools master data structure
function RyoTool()
{
    // Save the storage object
    this.storage = new DOMStorage("local", "BvSRyoTools");

    // RyoTools Preferences
    this.info = new RyoToolInfo(this.storage);
    this.info.LoadInfo();

    // Associative array of PlayerData objects -- indexed by player name
    this.playerList = new Object();
    this.playerListIsLoaded = false;

    // Check whether a player is already in the player array, and create new player data if not
    this.CheckPlayer = function(name)
    {
	if (!this.playerList[name])
	    this.playerList[name] = new PlayerData(null);
    }

    // Clear player data from DOM storage
    this.ClearPlayerData = function()
    {
	this.storage.removeItem(this.info.namePlayer + "_Ryo_Players");	
    }

    // Test for Nan or +/- infinity values in player data
    this.CheckPlayerData = function()
    {
	if (!this.playerListIsLoaded)
	    return;

	// Loop over all players
	for (name in this.playerList)
	{
	    // Loop over all attributes of player data object
	    for (attrib in this.playerList[name])
	    {
		// Skip known nonnumeric entries
		if (attrib == 'logText'  ||
		    attrib == 'name')
		    continue;

		// Always trust functions
		if (typeof(this.playerList[name][attrib]) == 'function')
		    continue;

		CheckNum(this.playerList[name][attrib], 
			 name + "." + attrib,
			 "RyoTool.CheckPlayerData");
	    }
	}

	// Loop over all info attributes
	for (attrib in this.info)
	{
	    if (attrib == 'storage' ||
		attrib == 'namePlayer' ||
		attrib == 'arrInfoVars')
		continue;

	    // Always trust functions
	    if (typeof(this.info[attrib]) == 'function')
		    continue;

	    CheckNum(this.info[attrib],
		     attrib,
		     "RyoTool.CheckPlayerData");
	}
    }

    // Load player data from DOM storage into ryoTool.playerList
    this.LoadPlayerData = function()
    {
	// Load data maximum one time per page
	if (this.playerListIsLoaded)
	    return;
	else
	    this.playerListIsLoaded = true;

	var strData = this.storage.getItem(this.info.namePlayer + "_Ryo_Players", null);
	if (strData)
	{
	    arrData = strData.split("\n");
	    for (var i=0; i<arrData.length; i++)
		this.playerList[arrData[i].split(":")[0]] = new PlayerData(arrData[i].split(":")[1]);
	}
    }
    
    // Save player data from ryoTool.playerList to DOM Storage
    this.SavePlayerData = function()
    {
	// Ensure quality of data before saving
	this.CheckPlayerData();

	var strData = new Array();
	for (name in this.playerList)
	    strData.push(name + ":" + this.playerList[name].toString() );
	strData = strData.join("\n");

	// Write the DOM storage
	this.storage.setItem(this.info.namePlayer + "_Ryo_Players", strData);	
    }

}  

// End RyoTools Definition






////////////////////////////////////////////////////////////////////////
///////////              FLOATING WINDOWS                ///////////////
////////////////////////////////////////////////////////////////////////


function FloatingReport() 
{

    this.window = new Window("floatingReport", ryoTool.storage);
    
    // Add css style for report window
    GM_addStyle("#floatingReport {border: 2px solid #000000; position: fixed; z-index: 100; " +
		"color: #000000; background-color: #FFFFFF; padding: 0; text-align: left; " +
		"overflow-y: auto; overflow-x: hidden; width: 270; height: 500; " +
		"background: none repeat scroll 0% 0% rgb(216, 216, 255);}");
    GM_addStyle("#floatingReport tr.odd {background-color: #8888FF}");
    GM_addStyle("#floatingReport tr.even {background-color: #BBBBFF}");
    GM_addStyle("#floatingReport tr.head {padding: 2; color: #FFFFFF; background-color: #0000FF; cursor: move}");

    // Hide the window for now
    this.window.hide();

    // Draw the window, or hide if already visible
    this.Draw = function()
    {
	if (this.window.element.style.visibility == 'visible')
	{
	    // Hide the window and return
	    this.window.hide();
	    return;
	}

	// Extract the playerlist into an array
	var arrPlayerList = new Array();
	var i = 0;
	for (name in ryoTool.playerList)
	{
	    arrPlayerList[i] = ryoTool.playerList[name];
	    arrPlayerList[i].name = name;
	    i++;
	}

	// Sort the playerlist based on ryo in descending order
	arrPlayerList = arrPlayerList.sort(function(a,b) {return b.totalRyo - a.totalRyo});

	// Helper array to build the HTML
	var arr = new Array();

	// Player Table
	arr.push('<table style="color: black" width=255><tbody>',
		 '<tr class="head"><td><b>Player</b></td><td width=100><b>Ryo Earned</b></td></tr>');

	var cl = "odd";
	for (i=0; i<arrPlayerList.length; i++)
	{
	    var cl = (i % 2 ? "odd" : "even"); 
	    arr.push('<tr class="' + cl + '"><td>' + arrPlayerList[i].name + '</td><td>' + 
		     arrPlayerList[i].totalRyo + '</td></tr>');
	}

	arr.push('</tbody></table><br>');

	// LogText messages
	arr.push('<b>New Ryo Events:</b><br>');
	
	for (name in ryoTool.playerList)
	    if (ryoTool.playerList[name].logText)
		arr.push('<br><b>' + name + ':</b><br>' + ryoTool.playerList[name].logText.replace(/\n/g,"<br>"));

	// Concatenate everything in the array to form the html
	this.window.element.innerHTML = arr.join("");

	// Show the window
	this.window.show();
    }

}


function FloatingPreferences() 
{

    this.window = new Window("floatingPreferences", ryoTool.storage);
    
    // Add css style for report window
    GM_addStyle("#floatingPreferences {border: 2px solid #FFFFFF; position: fixed; z-index: 100; " +
                "color: #FFFFFF; background-color: #222222; padding: 4px; text-align: center; " +
                "width: 405; height:500; overflow-y:auto; overflow-x:hidden;}"); 
    GM_addStyle("#floatingPreferences tr.odd {padding: 1px; background-color: #AAAAAA}");
    GM_addStyle("#floatingPreferences input.odd {background-color: #AAAAAA}");
    GM_addStyle("#floatingPreferences tr.even {padding: 1px; background-color: #EEEEEE}");
    GM_addStyle("#floatingPreferences input.even {background-color: #EEEEEE}");
    GM_addStyle("#floatingPreferences tr.head {padding: 2px; color: #FFFFFF; background-color: #222222; cursor: move}");

    GM_addStyle("#floatingPreferences p.ryobonus {color: #FFFFFF; text-align: left; font-size: 14px}");
    GM_addStyle("#floatingPreferences input.ryobonus {background-color: #888888}; color: #FFFFFF");
    
    GM_addStyle("#floatingPreferences a {color: rgb(255, 255, 255); font-size: 14px; font-weight: bold}");

    // Ininitialization flag
    this.initialized = 0;
    
    // Hide the window for now
    this.window.hide();

    // Initialize the window html and set callbacks
    this.Init = function()
    {
	// Helper array to build the HTML
	var arr = new Array();

	// Build the window
	arr.push('<table style="color: black" width=400><tbody>',
		 '<tr class="head"><td><b>VRyo Policy Editor</b></td><td width=85><b></b></td></tr>');

	for (var i=0; i<ryoTool.info.arrInfoVars.length; i+=2)
	{
	    var name = ryoTool.info.arrInfoVars[i];
	    var description = ryoTool.info.arrInfoVars[i+1];
	    var value = ryoTool.info[name];
	    
	    var cl = (i%4 ? 'even' : 'odd');

	    arr.push('<tr class="' + cl + '"><td>' + description + '</td><td>',
		     '<input id="pref_' + name + '" class="' + cl + '" ',
		     'type=text size=10>');
	}

	arr.push('</tbody></table><br>');
	
	// Save Ryo Policy Button
	arr.push('<p style="margin: 0pt; text-align: right;">',
		 '<a href="javascript:void(0)" id="PreferencesSaveRyoPolicyButton">',
		 'Save Ryo Policy &gt;</a></p><br>');


	// Mechanism to award Ryo Bonuses
	arr.push('<p class="ryobonus">',
		 'Give Ryo to Player: ',
		 '<input id="nameBonus", class="ryobonus", type="text", size=10>',
		 '&nbsp Ryo: ',
		 '<input id="ryoBonus", class="ryobonus", type="text", size=6>',
		 '&nbsp <a href="javascript:void(0)"',
		 'id="PreferencesBonusRyoButton">Give Ryo &gt;</a>',
		 '</p>');

	// Mechanism to clear player data
	arr.push('<p class="ryobonus">',
		 'Clear Data for Player: ',
		 '<input id="nameClearPlayer", class="ryobonus", type="text", size=10>',
		 '&nbsp <a href="javascript:void(0)"',
		 'id="PreferencesClearPlayerButton">Clear Player Data &gt;</a>',
		 '</p><br>');

	// General data reset buttons
	arr.push('<p style="margin: 0pt; text-align: left;">',
		 '<a href="javascript:void(0)" id="PreferencesResetLogMarkersButton">',
		 '&lt; Reset Log Markers</a></p>');

	arr.push('<p style="margin: 0pt; text-align: left;">',
		 '<a href="javascript:void(0)" id="PreferencesDefaultRyoPolicyButton">',
		 '&lt; Reset Default Ryo Policy</a></p>');

	arr.push('<p style="margin: 0pt; text-align: left;">',
		 '<a href="javascript:void(0)" id="PreferencesResetAllPlayerDataButton">',
		 '&lt; Reset All Player Data</a></p>');

	// Concatenate everything in the array to form the html
	this.window.element.innerHTML = arr.join("");

	// Set event callback functions
	document.getElementById("PreferencesSaveRyoPolicyButton").addEventListener("click", this.SaveRyoPolicy, true);
	document.getElementById("PreferencesBonusRyoButton").addEventListener("click", this.GiveBonusRyo, true);
	document.getElementById("PreferencesClearPlayerButton").addEventListener("click", this.ClearPlayerData, true);
	document.getElementById("PreferencesResetLogMarkersButton").addEventListener("click", this.ResetLogMarkers, true);
	document.getElementById("PreferencesDefaultRyoPolicyButton").addEventListener("click", this.DefaultRyoPolicy, true);
	document.getElementById("PreferencesResetAllPlayerDataButton").addEventListener("click", this.ResetAllPlayerData, true);
	this.initialized = 1;
    }

    // Draw the window, or hide if already visible
    this.Draw = function()
    {
	// Load Player Data
	ryoTool.LoadPlayerData();

	if (this.window.element.style.visibility == 'visible')
	{
	    // hide window and return
	    this.window.hide();
	    return;
	}

	// Initialize the window if needed
	if (!this.initialize)
	    this.Init();

	// Populate cells with current values
	for (var i=0; i<ryoTool.info.arrInfoVars.length; i+=2)
	{
	    var name = ryoTool.info.arrInfoVars[i];
          var value = ryoTool.info[name];
	    
	    var elem = document.getElementById('pref_' + name);
	    elem.value = value;
	}

	// Show the window
	this.window.show();
    }

    // Save the preferences from the input boxes
    this.SaveRyoPolicy = function()
    {
	// Load information back into information structure
	for (var i=0; i<ryoTool.info.arrInfoVars.length; i+=2)
	{
	    var name = ryoTool.info.arrInfoVars[i];
	    var elem = document.getElementById('pref_' + name);
            ryoTool.info[name] = parseInt(elem.value);
	}

	// Save the information object
	ryoTool.info.SaveInfo();

	// Edit the innerHTML of save button to show that something actually happened
	document.getElementById("PreferencesSaveRyoPolicyButton").innerHTML = '<font color="yellow">Ryo Policy Saved &gt;</font>';
	setTimeout(function(){document.getElementById("PreferencesSaveRyoPolicyButton").innerHTML = "Save Ryo Policy &gt;";}, 3000);
    }

    // Give Bonus Ryo to player
    this.GiveBonusRyo = function()
    {
	var name = document.getElementById("nameBonus").value;
	var ryo  = document.getElementById("ryoBonus").value;

	// Early return if no name or Ryo given
	if (name == "" || ryo == "")
	{
	    alert("Please enter both name and Ryo amount");
	    return;
	}

	// Input validation
	ryo = parseInt(ryo);
	CheckNum(ryo, "Ryo", "floatingPreferences.GiveBonusRyo");
	ryoTool.CheckPlayer(name);

	// Add bonuses
	ryoTool.playerList[name].totalRyo += ryo;

	// Write logText
	ryoTool.playerList[name].logText += ryo + " Bonus Ryo Awarded\n";

	// Edit the innerHTML of button to show that something actually happened
	document.getElementById("PreferencesBonusRyoButton").innerHTML = '<font color="yellow">Ryo Given &gt;</font>';
	setTimeout(function(){document.getElementById("PreferencesBonusRyoButton").innerHTML = "Give Ryo &gt;";}, 3000);

	// Refresh the report window, if shown
	if (floatingReport.window.element.style.visibility == 'visible')
	{
	    floatingReport.Draw(); // hides the window
	    floatingReport.Draw(); // re-draws the window
	}

	// Reset the text fields (avoid double Ryo given)
	document.getElementById("nameBonus").value = "";
	document.getElementById("ryoBonus").value = "";

	// Save the new player data
	ryoTool.SavePlayerData();
    }

    // Clear Data for Player
    this.ClearPlayerData = function()
    {
	var name = document.getElementById("nameClearPlayer").value;
	
	if (name == "")
	    return;

	// Confirm that the user really wants to do this
	if (!confirm("Really clear all player data for player " + name + "?"))
	    return;

	// Clear the player
	if (ryoTool.playerList[name]) {
	    delete ryoTool.playerList[name];
        }

	// Edit the innerHTML of button to show that something actually happened
	document.getElementById("PreferencesClearPlayerButton").innerHTML = '<font color="yellow">Player Data Cleared &gt;</font>';
	setTimeout(function(){document.getElementById("PreferencesClearPlayerButton").innerHTML = "Clear Player Data &gt;";}, 3000);

	// Refresh the report window, if shown
	if (floatingReport.window.element.style.visibility == 'visible')
	{
	    floatingReport.Draw(); // hides the window
	    floatingReport.Draw(); // re-draws the window
	}

	// Reset the text fields
	document.getElementById("nameClearPlayer").value = "";

	// Save the player data
	ryoTool.SavePlayerData();
    }

    // Reset the log marker locations
    this.ResetLogMarkers = function()
    {
	// Confirm that the user really wants to do this
	if (!confirm("Really reset village log markers?\n\nWarning: Ryo-giving events will be duplicated if player data is not also cleared!"))
	    return;

	// Reset the log markers
	ryoTool.info.prevVillageId      = 9605406;
	ryoTool.info.prevVillageTime    = 0;

	// Edit the innerHTML of button to show that something actually happened
	document.getElementById("PreferencesResetLogMarkersButton").innerHTML = '<font color="yellow">&lt; Log Markers Reset</font>';
	setTimeout(function(){document.getElementById("PreferencesResetLogMarkersButton").innerHTML = "&lt; Reset Log Markers";}, 3000);

	// Save the new info
	ryoTool.info.SaveInfo();
    }


    // Restore the default preferences
    this.DefaultRyoPolicy = function()
    {
	// Confirm that the user really wants to do this
	if (!confirm("Really reset default values for Ryo Policy?"))
	    return;

	// Reset the Ryo policy (do not change log markers or update times)
	var oldInfo = ryoTool.info;
	ryoTool.info = new RyoToolInfo(ryoTool.storage);
	
	ryoTool.info.prevVillageId      = oldInfo.prevVillageId;
	ryoTool.info.prevVillageTime    = oldInfo.prevVillageTime;

	// Populate cells with current values
	for (var i=0; i<ryoTool.info.arrInfoVars.length; i+=2)
	{
	    var name = ryoTool.info.arrInfoVars[i];
	    var value = ryoTool.info[name];
	    
	    var elem = document.getElementById('pref_' + name);
	    elem.value = value;
	}

	// Edit the innerHTML of button to show that something actually happened
	document.getElementById("PreferencesDefaultRyoPolicyButton").innerHTML = '<font color="yellow">&lt; Default Ryo Policy Reset</font>';
	setTimeout(function(){document.getElementById("PreferencesDefaultRyoPolicyButton").innerHTML = "&lt; Reset Default Ryo Policy";}, 3000);

	// Save the information object
	ryoTool.info.SaveInfo();
    }

    // Reset all player data
    this.ResetAllPlayerData = function()
    {
	// Confirm that the user really wants to do this
	if (!confirm("Really delete ALL player data?"))
	    return;

	ryoTool.playerList = new Object();
	ryoTool.ClearPlayerData();

	// Edit the innerHTML of button to show that something actually happened
	document.getElementById("PreferencesResetAllPlayerDataButton").innerHTML = '<font color="yellow">&lt; All Player Data Reset</font>';
	setTimeout(function(){document.getElementById("PreferencesResetAllPlayerDataButton").innerHTML = "&lt; Reset All Player Data";}, 3000);

	// Refresh the report window, if shown
	if (floatingReport.window.element.style.visibility == 'visible')
	{
	    floatingReport.Draw(); // hides the window
	    floatingReport.Draw(); // re-draws the window
	}

    }

}










////////////////////////////////////////////////////////////////////////
///////////          GENERAL UTILITY FUNCTIONS           ///////////////
////////////////////////////////////////////////////////////////////////

// Get the Players Name
function GetPlayerName() 
{
    return document.evaluate("//input[@name='player' and @type='hidden']", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue.value;
}

// Check Ryo values before use (Prevent NaN and infinity values from corrupting data)
//      type: type of number for error reporting
//      funStr: name of calling function for error reporting
function CheckNum(num, type, funStr)
{
    if (isFinite(num))
	return;

    // Otherwise die and terminate further execution
    alert("Bad " + type + " value: " + num + "\nError in function: " + funStr);
    throw("Bad " + type + " value: " + num + "\nError in function: " + funStr);
}

// Check if all village log messages are shown and available for parsing
//       returns true if ready, false if not
function VillageAllMessagesShown()
{
    var textRefresh = document.evaluate("//form[@name='refreshmes']/p/a/b", document, null, 
					XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue.innerHTML;
    if (textRefresh == "Refresh Messages")
	return true;
    else  // textRefresh == "Refresh Messages / Show All"
	return false;
}

// Put a RyoTools button in the village actions menu
function InsertRyoToolsButton()
{
    // Table which houses everything in left column below the village message log
    // Firefox XPath: //form[@name='emess']/font/font/table/tbody/tr/td
    var leftTable = document.evaluate("//form[@name='emess']//table[2]/tbody/tr/td", document, null,
				      XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

    var msgText;
    var msgReportButton;
    var funReportCallback;
    var hrefRefreshPage = "";

    var msgScienceButton = "Run SCIENCE! &gt;";

    var msgPreferencesButton = "VRyo Policy / Admin &gt;";
    var funPreferencesCallback = function() {floatingPreferences.Draw();};

    var hrsVillageElapsed = Math.floor( ( (new Date()).getTime() - ryoTool.info.prevVillageTime ) / (1000 * 60 * 60) );
    var hrsStorehouseElapsed = Math.floor( ( (new Date()).getTime() - ryoTool.info.prevStorehouseTime ) / (1000 * 60 * 60) )

    // Build the message strings for button
    if (VillageAllMessagesShown())
    {
	msgText   = 
	    "Use your RyoTools!<br>" +
	    "(" + hrsVillageElapsed + "h since last village update)<br>";	    
	msgReportButton = "RyoTools Report &gt;";
	funReportCallback = ParseVillageLogs;
    }
    else
    {
	msgText = "Show all messages to use RyoTools<br>" +
	    "(" + hrsVillageElapsed + "h since last village update)";	    
	msgReportButton = "Show All Messages &gt;";
        hrefRefreshPage = "document.refreshmes.submit();";
    }

    // Build the new div element

    var divElem = document.createElement("div");
    divElem.id = "RyoToolDiv";

    divElem.innerHTML = 
	'<table style="border: 2px solid rgb(0, 0, 0); background-color: rgb(155,0,0); color: rgb(255, 255, 255); font-family: arial; font-size: 12px;" width="255"><tbody><tr><td>\n' +
	msgText + '<br>\n' +
	'<p style="margin: 0pt; text-align: right;"><a href="javascript:' + hrefRefreshPage + '" id="RyoToolsReportButton" style="color: rgb(255, 255, 255); font-size: 14px;"><b>' + msgReportButton + '</b></a></p>\n' +
	'<p style="margin: 0pt; text-align: right;"><a href="javascript:document.science.submit();" id="RyoToolsScienceButton" style="color: rgb(255, 255, 255); font-size: 14px;"><b>' + msgScienceButton + '</b></a></p>\n' +
	'<p style="margin: 0pt; text-align: right;"><a href="javascript:void(0)" id="RyoToolsPreferencesButton" style="color: rgb(255, 255, 255); font-size: 14px;"><b>' + msgPreferencesButton + '</b></a></p>\n' +
	'</td></tr></tbody></table>\n';

    // Figure out where to put in the div element
    leftTable.insertBefore(divElem, leftTable.firstChild);

    // Add event listener for greassmonkey callback
    document.getElementById("RyoToolsPreferencesButton").addEventListener("click", funPreferencesCallback, true);
    if (funReportCallback != null) {
        document.getElementById("RyoToolsReportButton").addEventListener("click", funReportCallback, true);
    }
}








////////////////////////////////////////////////////////////////////////
///////////             VILLAGE LOG PARSING              ///////////////
////////////////////////////////////////////////////////////////////////

// Handler for Raid Success log messages
function HandlerRaid(msg)
{
    // Example msg.text
    // &nbsp;&nbsp;<b>Raid Success 8/16 (Mon - 9:11):</b> SirDuck36 attempted to attack Manetheren Village and succeeded! They got 1303660 Ryo!

    // Extract player name
    var name = /<\/b> (.+) attempted to attack/.exec(msg.text)[1];
    ryoTool.CheckPlayer(name);

    // Extract ryo amount and remove commas if present
    var strRyo = /Village and succeeded! They got ([\d,]+) Ryo!/.exec(msg.text)[1];
    var ryo = parseInt(strRyo.replace(/,/gi, ""), 10);
    var awardRyo = Math.ceil(ryo * ryoTool.info.raidPackValue / 1000);

    // Add bonuses
    ryoTool.playerList[name].numRaid++;
    ryoTool.playerList[name].ryoRaid += ryo;
    ryoTool.playerList[name].totalRyo  += awardRyo;

    // Write logText
    ryoTool.playerList[name].logText += strRyo + " ryo raid (" + awardRyo + " ryo awarded!)\n";
}

// Handler for Contract Donation
function HandlerContractDonation(msg)
{
    // Example msg.text
    // &nbsp;&nbsp;<b>Contracts 8/16 (Mon - 14:50):</b> Blasfeemy has submitted 3 Minor Village Contracts for 3000 Ryo!

    // Extract player name
    var name = /<\/b> (.+) has submitted /.exec(msg.text)[1];
    ryoTool.CheckPlayer(name);

    var strRyo;
    var ryo;

    // Ryo acquired
    if (msg.text.indexOf("Ryo") >= 0)
    {
	strRyo = /Village Contracts? for ([\d,]+) Ryo/.exec(msg.text)[1];
	ryo = parseInt(strRyo.replace(/,/gi,""), 10);
    }
    else
    {
	strRyo = "0";
	ryo = 0;
    }

    // Calculate ryo to be awarded
    var awardRyo = Math.ceil(ryo * ryoTool.info.cDonatePackValue / 1000);

    // Award ryo to player
    ryoTool.playerList[name].ryoCDonate  += ryo;
    ryoTool.playerList[name].totalRyo += awardRyo;

    // Write logText
    ryoTool.playerList[name].logText += strRyo + " ryo from contract donation (" + awardRyo + " ryo awarded!)\n";

}

// Handler for Contract Milling
function HandlerContractMilling(msg)
{
    // Example msg.text
    // &nbsp;&nbsp;<b>Contracts 8/16 (Mon - 0:32):</b> SirDuck36 milled 1 Major Village Contract for Nothing!
    // &nbsp;&nbsp;<b>Contracts 8/16 (Mon - 14:50):</b> Blasfeemy has submitted 3 Minor Village Contracts for 3000 Ryo!
    // &nbsp;&nbsp;<b>Contracts 9/2 (Thu - 11:34):</b> Tony6785 milled 1 Major Village Contract for 1 Solid Fire!

    // Early return if contracts were milled for nothing
    if (msg.text.indexOf("for Nothing!") >= 0)
	return;

    // Extract player name
    var name = /<\/b> (.+) milled /.exec(msg.text)[1];
    ryoTool.CheckPlayer(name);

    var strRyo;
    var ryo;

    // Ryo acquired
    if (msg.text.indexOf("Ryo") >= 0)
    {
	strRyo = /Village Contracts? for ([\d,]+) Ryo/.exec(msg.text)[1];
	ryo = parseInt(strRyo.replace(/,/gi,""), 10);
    }
    else
    {
	strRyo = "0";
	ryo = 0;
    }

    // Calculate ryo to be awarded
    var awardRyo = Math.ceil(ryo * ryoTool.info.cMillPackValue / 1000);

    // Award ryo to player
    ryoTool.playerList[name].ryoCMill  += ryo;
    ryoTool.playerList[name].totalRyo += awardRyo;

    // Write logText
    ryoTool.playerList[name].logText += strRyo + " ryo from contract milling (" + awardRyo + " ryo awarded!)\n";

}

// Outer loop for Village Log Parsing
//     Each specific event type is passed to the Handlers above
function ParseVillageLogs()
{
    // Early return if user needs to press the Show all messages button
    if (!VillageAllMessagesShown())
    {
	alert("RyoTools: Please show all village messages before running script");
	return;
    }

    // Load RyoTools data from DOM Storage (possibly expensive operation)
    ryoTool.LoadPlayerData();

    // Get a snapshot for each message in the village chat
    var snapMessageList = document.evaluate("//ul[@id='messageul']//li/label", document, null,
					 XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

    // Examine each message for potential tasty info
    var i;
    for (i=0; i<snapMessageList.snapshotLength; i++)
    {
	var snap = snapMessageList.snapshotItem(i);

	var msg = new Object();

	// Extract the message id number and test against previous update
	msg.id = parseInt(snap.htmlFor.split('-')[1],10);
	if (msg.id <= ryoTool.info.prevVillageId)
	    break;

	msg.text = snap.innerHTML;

	try
	{
	    // Raid Success
	    if (msg.text.indexOf("<b>Raid Success ") >= 0)
		HandlerRaid(msg);

	    // Contract submissions
	    if (msg.text.indexOf("<b>Contracts") >= 0)
                if (/<\/b> (.+) milled /.test(msg.text))
		    HandlerContractMilling(msg);
                else if (/<\/b> (.+) has submitted /.test(msg.text))
                    HandlerContractDonation(msg);

	}
	catch (err)
	{
	    // Display error and ask the user whether they wish to continue
	    var text = "Error: " + err.message + "\n\noccured parsing village message:\n" + msg.text + "\n\n"
		+ "Press OK to skip this log entry or press CANCEL to halt script execution without save."
		+ "\n\n NOTE: Ryo for this village message must be added manually if you choose to continue.";

	    if (!confirm(text))
		throw(err);
	}	
    }
    
    // Update the last message log id
    ryoTool.info.prevVillageId = parseInt(snapMessageList.snapshotItem(0).htmlFor.split('-')[1],10);
    
    // Update the last update time
    ryoTool.info.prevVillageTime = (new Date()).getTime();

    // Populate and show the floatingReport window
    floatingReport.Draw();

    // Save the Player data
    ryoTool.SavePlayerData();

    // Save the information object
    ryoTool.info.SaveInfo();

}








////////////////////////////////////////////////////////////////////////
///////////                SCIENCE! INPUTS                 /////////////
////////////////////////////////////////////////////////////////////////

// Inserts buttons to display floating windows
function InsertScienceWindowButtons(scienceTable)
{
    // Set button names and callback methods to display windows
    var msgReportButton = "RyoTools Report";
    var funReportCallback = function() {floatingReport.Draw();};
    var msgPreferencesButton = "VRyo Policy / Admin";
    var funPreferencesCallback = function() {floatingPreferences.Draw();};

    // Build the new div element
    var divElem = document.createElement("div");
    divElem.id = "RyoToolDiv";
    divElem.innerHTML =
	'<br><p style="margin: 0pt; text-align: center;"><a href="javascript:void(0)" id="RyoToolsReportButton" style="color: rgb(255, 255, 255); font-size: 14px;"><b>' + msgReportButton + '</b></a>' +
        '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
        '<a href="javascript:void(0)" id="RyoToolsPreferencesButton" style="color: rgb(255, 255, 255); font-size: 14px;"><b>' + msgPreferencesButton + '</b></a></p>\n';

    // Figure out where to put in the div element
    scienceTable.appendChild(divElem);

    // Add event listener for greassmonkey callback
    document.getElementById("RyoToolsReportButton").addEventListener("click", funReportCallback, true);
    document.getElementById("RyoToolsPreferencesButton").addEventListener("click", funPreferencesCallback, true);
}

// Inserts the dropdown of player names
function InsertPlayerListDropdown(scienceTable)
{
    // Create the dropdown element
    var selectElem = document.createElement("select");
    selectElem.id = "RyoToolChargeDrop";

    // Input player names as options
    var playerIndex = 1;
    selectElem.innerHTML += '<option value="' + playerIndex + '">&#60;none&#62;</option>';

    // Build a sorted array of names
    var nameList = new Array();
    var i = 0;
    for (name in ryoTool.playerList)
    {
        nameList[i] = name;
        i++;
    }
    nameList.sort();

    while (playerIndex <= nameList.length)
    {
        playerIndex++;
        selectElem.innerHTML += '<option value="' + playerIndex + '">' + nameList[playerIndex - 2] + '</option>';
    }

    // Build the descriptive message above the dropdown
    var divElem = document.createElement("div");
    divElem.style.color = "white";
    divElem.innerHTML = '<br>Player to Charge:<br>';

    // Build the element to center the previous ones
    var centerElem = document.createElement("center");
    centerElem.appendChild(divElem);
    centerElem.appendChild(selectElem);

    // Place the dropdown at the bottom of the screen.
    scienceTable.appendChild(centerElem);
}

// Callback used to charge players for Science unleashes
function ChargePlayerCallback(e)
{
    // Values to pull from various parts of the page
    var sciNum;
    var sciCost;
    var vRyo;
    var playerName;


    //// Grab the name of the selected player to charge

    var playerDropdown = document.getElementById("RyoToolChargeDrop");
    playerName = playerDropdown.options[playerDropdown.selectedIndex].textContent;


    //// Grab the relevant info on the selected machine ////

    // Get the tables representing the distinct Science machines
    var machineCells = document.evaluate("//table[@class='stats']", document, null,
				         XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);

    // Locate the selected machine, assuming there is one
    var currMachine = machineCells.iterateNext();
    var currInputs;
    while (currMachine) {
        currInputs = currMachine.getElementsByTagName("input");
        if (currInputs[0] && "radio" == currInputs[0].type && currInputs[0].checked) {
            sciNum = parseInt(currInputs[0].value, 10);
            break;
        }
        currMachine = machineCells.iterateNext();
    }

    if (currMachine) {
        // Get the cost of the current machine
        var sciCostRegEx = /Tinker\/Unleash: <b>([\d]+)/;
        sciCost = parseInt(sciCostRegEx.exec(currMachine.innerHTML)[1], 10);
    }


    //// Grab the current amount of VRyo ////

    var docText = new XMLSerializer().serializeToString(document);
    var vRyoRegEx = /Village Ryo: <b>([\d,]+)/;
    vRyo = parseInt(vRyoRegEx.exec(docText)[1].replace(/,/gi, ""), 10);


    //// Failure cases ////

    // No attempt to charge a player
    if (playerDropdown.selectedIndex == 0) return;

    // Ensure that the operation is to unleash
    var unleashRadio = document.evaluate("//input[@type='radio' and @name='science' and @value='unleash']",
                                         document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
                                         null).singleNodeValue;
    GM_log("RyoTools user error data:"
           + "\nMachine number: " + sciNum
           + "\nUnleash?: " + unleashRadio.checked
           + "\nScience Cost: " + sciCost
           + "\nVRyo: " + vRyo
           + "\nEnough Ryo?: " + (sciCost <= vRyo));
    if (currMachine == null || !unleashRadio.checked || sciCost > vRyo) {
        alert("Invalid inputs for SCIENCE! unleash.");
        e.preventDefault();
        return;
    }

    // The player doesn't actually have enough banked Ryo to pay
    // for action.  Prompt user to confirm; might be valid.
    eval("var charge = ryoTool.info.ryoValScience" + sciNum + ";");
    if (charge > ryoTool.playerList[playerName].totalRyo) {
        if (!confirm("This action will put the player in debt.\n" +
                     "Are you sure you want to charge?")) {
            e.preventDefault();
            return;
        }
    }


    //// Success case ////

    // Charge player
    ryoTool.playerList[playerName].totalRyo -= charge;
    ryoTool.playerList[playerName].spentRyo += charge;
    ryoTool.playerList[playerName].numUnleash++;

    // Refresh the report window, if shown
    if (floatingReport.window.element.style.visibility == 'visible')
    {
        floatingReport.Draw(); // hides the window
        floatingReport.Draw(); // re-draws the window
    }

    // Save the new player data
    ryoTool.SavePlayerData();
}


// Inserts RyoTools input elements to the SCIENCE! page
function InsertScienceInputs()
{
    ryoTool.LoadPlayerData();

    // Table which houses everything in left column below the village message log
    var scienceTable = document.evaluate("//form[@name='science']/table", document, null,
				         XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

    InsertPlayerListDropdown(scienceTable);
    InsertScienceWindowButtons(scienceTable);

    var scienceButton = document.evaluate("//a[@href='javascript:document.science.submit();']", document,
                                          null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    scienceButton.addEventListener("click", ChargePlayerCallback, true);
}








////////////////////////////////////////////////////////////////////////
///////////                  HOTKEY CODE                   /////////////
////////////////////////////////////////////////////////////////////////

var keyCheckRecentEscape = false;

function KeyCheck(event) 
{
    var KeyID = event.keyCode;
    
    if (KeyID == 27) // escape key
    {
	// Close both windows if not already
	floatingReport.window.hide();
	floatingPreferences.window.hide();

      // If escape is pressed twice in succession, reset the window positions
      if (keyCheckRecentEscape)
      {
          floatingReport.window.reset();
          floatingPreferences.window.reset();
      }
      else
      {
          keyCheckRecentEscape = true;
          setTimeout(function(){keyCheckRecentEscape = false;}, 1000);
      } 
    }
}

document.documentElement.addEventListener("keyup", KeyCheck, true);







////////////////////////////////////////////////////////////////////////
///////////             PAGE LOAD RUNTIME                ///////////////
////////////////////////////////////////////////////////////////////////


// Create global instance of RyoTool object
var ryoTool = new RyoTool();

// Create the floating window objects
var floatingReport      = new FloatingReport();
var floatingPreferences = new FloatingPreferences();


// What page are we on?
if (/billy.bvs.village\./.test(location.href))
{
    // Main Village Page

    // Insert the RyoTools Button
    InsertRyoToolsButton();
}
else if(/billy.bvs.villagescience\./.test(location.href))
{
    InsertScienceInputs();
}

