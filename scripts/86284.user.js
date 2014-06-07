// ==UserScript==
// @name           BvS_KageTools_Poisson
// @namespace      Dorian
// @description    Compute RP point earnings for Poisson villagers, among other things.  Modified from SirDuck36's KageTools script.
// @include        http://*animecubed.com/billy/bvs/village.*
// @include        http://*animecubed.com/billy/bvs/villageresourcepoints.*
// ==/UserScript==




//  TODO, possibly
//     Additional ideas: Free snakeman game
//                       Nonja winding
//                       blood altar
//                       refresh applications
//                       reversing hourglass
//
//     Kaiju Kage Drop Tracker
//
//     Daily information about science
//     Daily Resource information




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
    this.rpOwed              = 0;  // RP owed to the player by kage
    this.rpAwardedTotal      = 0;  // Total RP awarded to the player via storehouse
    this.ryoRaid             = 0;  // Total vryo earned via invasions
    this.numRaid             = 0;  // Total number of raids
    this.resInvasionBasic    = 0;  // Basic resources acquired via invasion
    this.resInvasionAdvanced = 0;  // Advanced resources acquired via invasion
    this.numInvasion         = 0;  // Total number invasions
    this.numFullInvasion     = 0;  // Total number full-resource invasions
    this.resWheel            = 0;  // Basic resources earned from PH wheel
    this.resRobo             = 0;  // Basic resources earned from robo fighto tourney
    this.ryoContractTotal    = 0;  // Total vryo brought in via contracts
    this.resContractBasic    = 0;  // Total resources from contract milling
    this.resContractAdvanced = 0;  // Advanced resources from contract milling
    this.numTotalSpies       = 0;  // Total number of spies placed
    this.numSpyWins          = 0;  // Total number of weeks where player placed the most spies
    this.numKaijuFavors      = 0;  // Total number of favors used on kaiju
    this.numTotalDaysActive  = 0;  // Total number of days active in the village (did a village action)
    this.numFullWeeksActive  = 0;  // Total number of full weeks active in the village
    this.numUpkeepWeeks      = new Array(); // Total number of weeks at each upkeep level
    this.numUpkeepWeeks[0]   = 0;  // Total number of weeks at upkeep level 1
    this.numUpkeepWeeks[1]   = 0;  // Total number of weeks at upkeep level 2
    this.numUpkeepWeeks[2]   = 0;  // Total number of weeks at upkeep level 3
    this.numDaysLazy         = 0;  // Total number of days lazy in village
    this.rpStorehouseGift    = 0;  // Total rp value of items donated to storehouse
    this.rpStorehouseTake    = 0;  // Total rp value of items taken from storehouse
    this.rpBonus             = 0;  // Discretionary RP
    this.resSnakeOilBasic    = 0;  // Total Snake Oil basic resources
    this.resSnakeOilAdvanced = 0;  // Total Snake Oil advanced resources
    this.numZReward          = 0;  // Total ZReward donated to village

    this.saveData                        = new Object(); // List of attributes to save across information resets
    this.saveData.numCurrSpies           = 0;            // Total number of spies for current week
    this.saveData.numConsecDaysActive    = 0;            // Current number of consecutive days for a week
    this.saveData.numUpkeepDays          = new Array();  // Current number of days at each upkeep level
    this.saveData.numUpkeepDays[0]       = 0;            // Days at upkeep level 1
    this.saveData.numUpkeepDays[1]       = 0;            // Days at upkeep level 2
    this.saveData.numUpkeepDays[2]       = 0;            // Days at upkeep level 3
    this.saveData.cDonateRyoLeftover     = 0;            // Current amount of donated contract Ryo not yet used for RP
    this.saveData.cMillRyoLeftover       = 0;            // Current amount of milled contract Ryo not yet used for RP

    this.logText = ""; // Logging info, not stored for now but possibly displayed when script is run


    // Extract information from DOM Storage format, if strData not null
    if (strData)
    {
	var data = strData.split("|");
	this.dateInitialized              = parseInt(data[0],  10);
	this.rpOwed                       = parseInt(data[1],  10);
	this.rpAwardedTotal               = parseInt(data[2],  10);
      this.ryoRaid                      = parseInt(data[3],  10);
	this.numRaid                      = parseInt(data[4],  10);
	this.resInvasionBasic             = parseInt(data[5],  10);
	this.resInvasionAdvanced          = parseInt(data[6],  10);
	this.numInvasion                  = parseInt(data[7],  10);
      this.numFullInvasion              = parseInt(data[8],  10);
	this.resWheel                     = parseInt(data[9],  10);
	this.resRobo                      = parseInt(data[10],  10);
	this.ryoContractTotal             = parseInt(data[11], 10);
	this.resContractBasic             = parseInt(data[12], 10);
	this.resContractAdvanced          = parseInt(data[13], 10);
	this.numTotalSpies                  = parseInt(data[14], 10);
      this.numSpyWins                   = parseInt(data[15], 10);
	this.numKaijuFavors               = parseInt(data[16], 10);
	this.numTotalDaysActive           = parseInt(data[17], 10);
      this.numFullWeeksActive           = parseInt(data[18], 10);
      this.numUpkeepWeeks[0]            = parseInt(data[19], 10);
      this.numUpkeepWeeks[1]            = parseInt(data[20], 10);
      this.numUpkeepWeeks[2]            = parseInt(data[21], 10);
	this.numDaysLazy                  = parseInt(data[22], 10);
	this.rpStorehouseGift             = parseInt(data[23], 10);
	this.rpStorehouseTake             = parseInt(data[24], 10);
	this.rpBonus                      = parseInt(data[25], 10);
	this.resSnakeOilBasic             = parseInt(data[26], 10);
	this.resSnakeOilAdvanced          = parseInt(data[27], 10);
	this.numZReward                   = parseInt(data[28], 10);
      this.saveData.numCurrSpies        = parseInt(data[29], 10);
      this.saveData.numConsecDaysActive = parseInt(data[30], 10);
      this.saveData.numUpkeepDays[0]    = parseInt(data[31], 10);
      this.saveData.numUpkeepDays[1]    = parseInt(data[32], 10);
      this.saveData.numUpkeepDays[2]    = parseInt(data[33], 10);
      this.saveData.cDonateRyoLeftover = parseInt(data[34], 10);
      this.saveData.cMillRyoLeftover = parseInt(data[35], 10);
    }

    // Convert data to | delimited string format
    //    Used for DOM Storage
    this.toString = function()
    {
	var retArr = new Array(
	    this.dateInitialized              ,
	    this.rpOwed                       ,
	    this.rpAwardedTotal               ,
          this.ryoRaid                      ,
	    this.numRaid                      ,
	    this.resInvasionBasic             ,
	    this.resInvasionAdvanced          ,
	    this.numInvasion                  ,
          this.numFullInvasion              ,
	    this.resWheel                     ,
	    this.resRobo                      ,
	    this.ryoContractTotal             ,
	    this.resContractBasic             ,
	    this.resContractAdvanced          ,
	    this.numTotalSpies                  ,
          this.numSpyWins                   ,
	    this.numKaijuFavors               ,
	    this.numTotalDaysActive           ,
          this.numFullWeeksActive           ,
          this.numUpkeepWeeks[0]            ,
          this.numUpkeepWeeks[1]            ,
          this.numUpkeepWeeks[2]            ,
	    this.numDaysLazy                  ,
	    this.rpStorehouseGift             ,
	    this.rpStorehouseTake             ,
	    this.rpBonus                      ,  
	    this.resSnakeOilBasic             ,
	    this.resSnakeOilAdvanced          ,
	    this.numZReward                   ,
          this.saveData.numCurrSpies        ,
          this.saveData.numConsecDaysActive ,
          this.saveData.numUpkeepDays[0]    ,
          this.saveData.numUpkeepDays[1]    ,
          this.saveData.numUpkeepDays[2]    ,
          this.saveData.cDonateRyoLeftover     ,
          this.saveData.cMillRyoLeftover
	);

	return retArr.join("|");
    }

}  // End PlayerData Definition


// TODO: KaijuData()
//         this.dateDefeated    // date kaiju is defeated
//         this.nameKaiju       // name of kaiju
//         this.winnerT3        // T3 drop winner
//         this.winnerRNG       // RNG drop winner
//         this.winnerKage      // Kage drop winner or winners
//         this.kageDropGiven   // Did kage send the drop?



// Data structure for KageTools Information
//     Input: DOM storage object
function KageToolInfo(storage)
{
    // Storage object
    this.storage = storage;

    // Get User Name
    this.namePlayer = GetPlayerName();

    // Default values for script related storage
    this.prevVillageId      = 8367318;  // Most recent parsed village message id
    this.prevVillageTime    = 0;        // Timestamp of most recent village log parsing
    this.prevStorehouseId   = 0;        // Most recent parsed storehouse message id
    this.prevStorehouseTime = 0;        // Timestamp of most recent storehouse log parsing
    this.prevWeek           =           // Date of the most recent recorded weekday used to mark changing weeks
         ConvertBillyTime(new Date(2010, 8, 6));

    // Default RP value policy
    this.rpvalSpySet               = 5;           // RP for each successful set of spies placed
    this.spySetSize                = 3;           // Size of a standard set of spies
    this.rpvalSpyWin               = 20;          // RP for placing the most spies in a week
    this.spyWinMin                 = 30;          // Spies needed to award RP for most spies planted
    this.rpvalResWheel             = 12;          // RP value for each wheel resource win
    this.rpvalResInvasionBasic     = 10;          // RP value for each basic resource from invasion
    this.rpvalResInvasionAdvanced  = 20;          // RP value for each advanced resource from invasion
    this.rpvalResInvasionFull      = 10;          // RP value for invasion with all resources
    this.rpvalRaidBase             = 0;           // Base and Incremental RP for successful raid
    this.rpvalRaidIncrement        = 0;           // DEPRECATED
    this.rpvalContractRyoIncrement = 0;           // DEPRECATED
    this.rpvalContractResBasic     = 10;          // RP value for each milled basic resource
    this.rpvalContractResAdvanced  = 20;          // RP value for each milled advanced resource
    this.rpvalKaijuFavor           = 0;           // RP value for a kaiju favor
    this.rpvalSnakeOilBasic        = 15;          // RP value for basic res from snake oil
    this.rpvalSnakeOilAdvanced     = 40;          // RP value for advanced res from snake oil
    this.rpvalRoboResBasic         = 45;          // RP value for each basic resource from ROBO FIGHTO
    this.rpvalZReward              = 2;           // RP value for each ZR donated
    this.rpvalDayActive            = 1;           // RP value for each village action performed
    this.rpvalFullWeekActive       = 3;           // RP value for performing a straight week of actions
    this.rpvalUpkeepWeek           = new Array(); // RP value for a week at each upkeep level
    this.rpvalUpkeepWeek[0]        = 10;          // RP value for week at upkeep level 1
    this.rpvalUpkeepWeek[1]        = 20;          // RP value for week at upkeep level 2
    this.rpvalUpkeepWeek[2]        = 35;          // RP value for week at upkeep level 3
    this.rpvalDayLazy              = 0;           // RP (penalty) for each day ninja is lazy
    this.rpvalContractPackMajor    = 0;           // RP value for pack of major contracts
    this.sizeContractPackMajor     = 100;         // size of a pack of major contracts
    this.rpvalContractPackMinor    = 0;           // RP value for a pack of minor contracts
    this.sizeContractPackMinor     = 100;         // size of a pack of minor contracts
    this.rpvalCDonateRyoPack       = 1;           // RP value for a pack of donated contract ryo
    this.sizeCDonateRyoPack        = 13334;       // size of a pack of donated contract ryo
    this.rpvalCMillRyoPack         = 1;           // RP value for a pack of milled contract ryo
    this.sizeCMillRyoPack          = 13334;       // size of a pack of milled contract ryo
    this.rpvalRaidRyoPack          = 0;           // RP value for a pack of raid ryo
    this.sizeRaidRyoPack           = 250000;      // size of a pack of raid ryo

    // Array of all variable names and descriptions, used to build Preferences window
    this.arrInfoVars = [
	'rpvalDayActive'            , 'RP for village action (any kind)',
	'rpvalDayLazy'              , 'RP penalty for lazy ninja',
      'rpvalFullWeekActive'       , 'RP for straight week of actions',

      'rpvalUpkeepWeek[0]'        , 'RP for week of upkeep at level 1',
      'rpvalUpkeepWeek[1]'        , 'RP for week of upkeep at level 2',
      'rpvalUpkeepWeek[2]'        , 'RP for week of upkeep at level 3',

	'rpvalResWheel'             , 'RP for PH wheel resource won',
	'rpvalRoboResBasic'         , 'RP for each ROBO FIGHTO resource won',
	'rpvalZReward'              , 'RP for each Z-Reward donated',
	'rpvalKaijuFavor'           , 'RP for each Kaiju Favor',

	'rpvalSnakeOilBasic'        , 'RP for each SNAKE OIL basic resource',
	'rpvalSnakeOilAdvanced'     , 'RP for each SNAKE OIL advanced resource',

	'rpvalContractPackMajor'    , 'RP for each pack of major contracts',
	'sizeContractPackMajor'     , 'Number of major contracts in a pack',

	'rpvalContractPackMinor'    , 'RP for each pack of minor contracts',
	'sizeContractPackMinor'     , 'Number of minor contracts in a pack',

      'rpvalCDonateRyoPack'       , 'RP for each pack of ryo from donated contracts',
      'sizeCDonateRyoPack'        , 'Amount of contract ryo in each donated pack',

      'rpvalCMillRyoPack'       , 'RP for each pack of ryo from milled contracts',
      'sizeCMillRyoPack'        , 'Amount of contract ryo in each milled pack',

	'rpvalContractResBasic'     , 'RP for each Contract Mill basic resource',
	'rpvalContractResAdvanced'  , 'RP for each Contract Mill advanced resource',

	'rpvalSpySet'               , 'RP for each successful set of spies placed',
      'spySetSize'                , 'Size of a standard set of spies',
      'rpvalSpyWin'               , 'RP for placing the most spies in a week',
      'spyWinMin'                 , 'Spies needed to award RP for most spies planted',

	'rpvalResInvasionBasic'     , 'RP for each Invasion basic resource',
	'rpvalResInvasionAdvanced'  , 'RP for each Invasion advanced resource',
      'rpvalResInvasionFull'      , 'RP for Invasion with all resources',

	'rpvalRaidBase'             , 'RP base value for each raid',
	'rpvalRaidRyoPack'          , 'RP value for each pack of raid ryo',
	'sizeRaidRyoPack'           , 'Amount of raid ryo in each pack'     

    ];


    // Function to clear information from DOM storage
    this.ClearInfo = function()
    {
	this.storage.removeItem(this.namePlayer + "_Info");
    }

    // Function to load information from DOM storage
    this.LoadInfo = function()
    {
	var strData = this.storage.getItem(this.namePlayer + "_Info", null);
	if (!strData)
	    return;

	var data = strData.split("|");
	var i = -1;

	if (++i < data.length)    this.prevVillageId             = parseInt(data[i],  10);
	if (++i < data.length)    this.prevVillageTime           = parseInt(data[i],  10);
	if (++i < data.length)    this.prevStorehouseId          = parseInt(data[i],  10);
	if (++i < data.length)    this.prevStorehouseTime        = parseInt(data[i],  10);
      if (++i < data.length)    this.prevWeek                  = new Date(Date.parse(data[i]));

	if (++i < data.length)    this.rpvalSpySet               = parseInt(data[i],  10);
	if (++i < data.length)    this.spySetSize                = parseInt(data[i],  10);
	if (++i < data.length)    this.rpvalSpyWin               = parseInt(data[i],  10);
	if (++i < data.length)    this.spyWinMin                 = parseInt(data[i],  10);
	if (++i < data.length)    this.rpvalResWheel             = parseInt(data[i],  10);
	if (++i < data.length)    this.rpvalResInvasionBasic     = parseInt(data[i],  10);
	if (++i < data.length)    this.rpvalResInvasionAdvanced  = parseInt(data[i],  10);
	if (++i < data.length)    this.rpvalResInvasionFull      = parseInt(data[i],  10);
	if (++i < data.length)    this.rpvalRaidBase             = parseInt(data[i],  10);
	if (++i < data.length)    this.rpvalRaidIncrement        = parseInt(data[i],  10);
	if (++i < data.length)    this.rpvalContractRyoIncrement = parseInt(data[i],  10);
	if (++i < data.length)    this.rpvalContractResBasic     = parseInt(data[i],  10);
	if (++i < data.length)    this.rpvalContractResAdvanced  = parseInt(data[i],  10);
	if (++i < data.length)    this.rpvalKaijuFavor           = parseInt(data[i],  10);
	if (++i < data.length)    this.rpvalSnakeOilBasic        = parseInt(data[i],  10);
	if (++i < data.length)    this.rpvalSnakeOilAdvanced     = parseInt(data[i],  10);
	if (++i < data.length)    this.rpvalRoboResBasic         = parseInt(data[i],  10);
	if (++i < data.length)    this.rpvalZReward              = parseInt(data[i],  10);
	if (++i < data.length)    this.rpvalDayActive            = parseInt(data[i],  10);
	if (++i < data.length)    this.rpvalDayLazy              = parseInt(data[i],  10);
	if (++i < data.length)    this.rpvalFullWeekActive       = parseInt(data[i],  10);
	if (++i < data.length)    this.rpvalUpkeepWeek[0]        = parseInt(data[i],  10);
	if (++i < data.length)    this.rpvalUpkeepWeek[1]        = parseInt(data[i],  10);
	if (++i < data.length)    this.rpvalUpkeepWeek[2]        = parseInt(data[i],  10);
	if (++i < data.length)    this.rpvalContractPackMajor    = parseInt(data[i],  10);
	if (++i < data.length)    this.sizeContractPackMajor     = parseInt(data[i],  10);
	if (++i < data.length)    this.rpvalContractPackMinor    = parseInt(data[i],  10);
	if (++i < data.length)    this.sizeContractPackMinor     = parseInt(data[i],  10);
	if (++i < data.length)    this.rpvalCDonateRyoPack      = parseInt(data[i],  10);
	if (++i < data.length)    this.sizeCDonateRyoPack       = parseInt(data[i],  10);
	if (++i < data.length)    this.rpvalCMillRyoPack      = parseInt(data[i],  10);
	if (++i < data.length)    this.sizeCMillRyoPack       = parseInt(data[i],  10);
	if (++i < data.length)    this.rpvalRaidRyoPack          = parseInt(data[i],  10);
	if (++i < data.length)    this.sizeRaidRyoPack           = parseInt(data[i],  10); 

    }

    // Function to save information to DOM storage
    this.SaveInfo = function()
    {
	// Ensure quality of player data before saving
	//   In particular, don't update log markers or times if data was corrupted
	kageTool.CheckPlayerData();

	var dataArr = new Array(
	    this.prevVillageId             ,
	    this.prevVillageTime           ,
	    this.prevStorehouseId          ,
	    this.prevStorehouseTime        ,
          this.prevWeek                  ,
	    this.rpvalSpySet               ,
	    this.spySetSize                ,
          this.rpvalSpyWin               ,
          this.spyWinMin                 ,
	    this.rpvalResWheel             ,
	    this.rpvalResInvasionBasic     ,
	    this.rpvalResInvasionAdvanced  ,
	    this.rpvalResInvasionFull      ,
	    this.rpvalRaidBase             ,
	    this.rpvalRaidIncrement        ,
	    this.rpvalContractRyoIncrement ,
	    this.rpvalContractResBasic     ,
	    this.rpvalContractResAdvanced  ,
	    this.rpvalKaijuFavor           ,
	    this.rpvalSnakeOilBasic        ,
	    this.rpvalSnakeOilAdvanced     ,
	    this.rpvalRoboResBasic         ,
	    this.rpvalZReward              ,
	    this.rpvalDayActive            ,
	    this.rpvalDayLazy              ,
          this.rpvalFullWeekActive       ,
          this.rpvalUpkeepWeek[0]        ,
          this.rpvalUpkeepWeek[1]        ,
          this.rpvalUpkeepWeek[2]        ,
	    this.rpvalContractPackMajor    ,
	    this.sizeContractPackMajor     ,
	    this.rpvalContractPackMinor    ,
	    this.sizeContractPackMinor     ,
          this.rpvalCDonateRyoPack      ,
          this.sizeCDonateRyoPack       ,
          this.rpvalCMillRyoPack      ,
          this.sizeCMillRyoPack       ,
	    this.rpvalRaidRyoPack          ,
	    this.sizeRaidRyoPack           

	);

	this.storage.setItem(this.namePlayer + "_Info", dataArr.join("|"));

    }

    // Helper function for extracting values by field name
    this.GetValue = function(name) {
        var value;

        switch(name) {
          case "rpvalUpkeepWeek[0]":
            value = kageTool.info.rpvalUpkeepWeek[0];
            break;
          case "rpvalUpkeepWeek[1]":
            value = kageTool.info.rpvalUpkeepWeek[1];
            break;
          case "rpvalUpkeepWeek[2]":
            value = kageTool.info.rpvalUpkeepWeek[2];
            break;
          default:
            value = kageTool.info[name];
            break;
        }

        return value;
    };

    // Helper function for setting values by field name
    this.SetValue = function(name, value) {
        switch(name) {
          case "rpvalUpkeepWeek[0]":
            kageTool.info.rpvalUpkeepWeek[0] = parseInt(value, 10);
            break;
          case "rpvalUpkeepWeek[1]":
	      kageTool.info.rpvalUpkeepWeek[1] = parseInt(value, 10);
            break;
          case "rpvalUpkeepWeek[2]":
	      kageTool.info.rpvalUpkeepWeek[2] = parseInt(value, 10);
            break;
          default:
	      kageTool.info[name] = parseInt(value, 10);
            break;
        }
    };

}  // End KageToolInfo Definition


// KageTools master data structure
function KageTool()
{
    // Save the storage object
    this.storage = new DOMStorage("local", "BvSKageTools");

    // KageTools Preferences and RP policy
    this.info = new KageToolInfo(this.storage);
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
	this.storage.removeItem(this.info.namePlayer + "_Players");	
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
		    attrib == 'name'     ||
                attrib == 'saveData' ||
                attrib == 'numUpkeepWeeks')
		    continue;

		// Always trust functions
		if (typeof(this.playerList[name][attrib]) == 'function')
		    continue;

		CheckNum(this.playerList[name][attrib], 
			 name + "." + attrib,
			 "KageTool.CheckPlayerData");
	    }
	}

	// Loop over all info attributes
	for (attrib in this.info)
	{
	    if (attrib == 'storage' ||
		attrib == 'namePlayer' ||
		attrib == 'arrInfoVars' ||
            attrib == 'rpvalUpkeepWeek')
		continue;

	    // Always trust functions
	    if (typeof(this.info[attrib]) == 'function')
		    continue;

	    CheckNum(this.info[attrib],
		     attrib,
		     "KageTool.CheckPlayerData");
	}
    }

    // Load player data from DOM storage into kageTool.playerList
    this.LoadPlayerData = function()
    {
	// Load data maximum one time per page
	if (this.playerListIsLoaded)
	    return;
	else
	    this.playerListIsLoaded = true;

	var strData = this.storage.getItem(this.info.namePlayer + "_Players", null);
	if (strData)
	{
	    arrData = strData.split("\n");
	    for (var i=0; i<arrData.length; i++)
		this.playerList[arrData[i].split(":")[0]] = new PlayerData(arrData[i].split(":")[1]);
	}
    }
    
    // Save player data from kageTool.playerList to DOM Storage
    this.SavePlayerData = function()
    {
	// Ensure quality of data before saving
	this.CheckPlayerData();

	var strData = new Array();
	for (name in this.playerList)
	    strData.push(name + ":" + this.playerList[name].toString() );
	strData = strData.join("\n");

	// Write the DOM storage
	this.storage.setItem(this.info.namePlayer + "_Players", strData);	
    }

}  

// End KageTools Definition






////////////////////////////////////////////////////////////////////////
///////////              FLOATING WINDOWS                ///////////////
////////////////////////////////////////////////////////////////////////


function FloatingReport() 
{

    this.window = new Window("floatingReport", kageTool.storage);
    
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
        // and accumulate all owed RP
	var arrPlayerList = new Array();
	var i = 0;
        var totalRPOwed = 0;
	for (name in kageTool.playerList)
	{
	    arrPlayerList[i] = kageTool.playerList[name];
	    arrPlayerList[i].name = name;
            totalRPOwed += (kageTool.playerList[name].rpOwed > 0) ? kageTool.playerList[name].rpOwed : 0;
	    i++;
	}

	// Sort the playerlist based on rpOwed in descending order
	arrPlayerList = arrPlayerList.sort(function(a,b) {return b.rpOwed - a.rpOwed});

	// Helper array to build the HTML
	var arr = new Array();

	// Player Table
	arr.push('<table style="color: black" width=255><tbody>',
		 '<tr class="head"><td><b>Player</b></td><td width=100><b>RP Earned</b></td></tr>');

	var cl = "odd";
	for (i=0; i<arrPlayerList.length; i++)
	{
	    var cl = (i % 2 ? "odd" : "even"); 
	    arr.push('<tr class="' + cl + '"><td>' + arrPlayerList[i].name + '</td><td>' + 
		     arrPlayerList[i].rpOwed + '</td></tr>');
	}

	arr.push('</tbody></table><br>');
      arr.push('<b>Total RP owed:</b> ' + totalRPOwed + '<br><br>');

	// LogText messages
	arr.push('<b>New RP Events:</b><br>');
	
	for (name in kageTool.playerList)
	    if (kageTool.playerList[name].logText)
		arr.push('<br><b>' + name + ':</b><br>' + kageTool.playerList[name].logText.replace(/\n/g,"<br>"));

	// Concatenate everything in the array to form the html
	this.window.element.innerHTML = arr.join("");

	// Show the window
	this.window.show();
    }

}


function FloatingPreferences() 
{

    this.window = new Window("floatingPreferences", kageTool.storage);
    
    // Add css style for report window
    GM_addStyle("#floatingPreferences {border: 2px solid #FFFFFF; position: fixed; z-index: 100; " +
                "color: #FFFFFF; background-color: #222222; padding: 4px; text-align: center; " +
                "width: 420; height:500; overflow-y:auto; overflow-x:hidden;}"); 
    GM_addStyle("#floatingPreferences tr.odd {padding: 1px; background-color: #AAAAAA}");
    GM_addStyle("#floatingPreferences input.odd {background-color: #AAAAAA}");
    GM_addStyle("#floatingPreferences tr.even {padding: 1px; background-color: #EEEEEE}");
    GM_addStyle("#floatingPreferences input.even {background-color: #EEEEEE}");
    GM_addStyle("#floatingPreferences tr.head {padding: 2px; color: #FFFFFF; background-color: #222222; cursor: move}");

    GM_addStyle("#floatingPreferences p.rpbonus {color: #FFFFFF; text-align: left; font-size: 14px}");
    GM_addStyle("#floatingPreferences input.rpbonus {background-color: #888888}; color: #FFFFFF");
    
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
		 '<tr class="head"><td><b>RP Policy Editor</b></td><td width=85><b></b></td></tr>');

	for (var i=0; i<kageTool.info.arrInfoVars.length; i+=2)
	{
	    var name = kageTool.info.arrInfoVars[i];
	    var description = kageTool.info.arrInfoVars[i+1];
	    var value = kageTool.info.GetValue(name);
	    
	    var cl = (i%4 ? 'even' : 'odd');

	    arr.push('<tr class="' + cl + '"><td>' + description + '</td><td>',
		     '<input id="pref_' + name + '" class="' + cl + '" ',
		     'type=text size=10>');
	}

	arr.push('</tbody></table><br>');
	
	// Save RP Policy Button
	arr.push('<p style="margin: 0pt; text-align: right;">',
		 '<a href="javascript:void(0)" id="PreferencesSaveRPPolicyButton">',
		 'Save RP Policy &gt;</a></p><br>');


	// Mechanism to award RP Bonuses
	arr.push('<p class="rpbonus">',
		 'Give RP to Player: ',
		 '<input id="nameBonus", class="rpbonus", type="text", size=10>',
		 '&nbsp&nbsp&nbsp&nbsp RP: ',
		 '<input id="rpBonus", class="rpbonus", type="text", size=4>',
		 '&nbsp&nbsp&nbsp&nbsp <a href="javascript:void(0)"',
		 'id="PreferencesBonusRPButton">Give RP &gt;</a>',
		 '</p>');

	// Mechanism to clear player data
	arr.push('<p class="rpbonus">',
		 'Clear Data for Player: ',
		 '<input id="nameClearPlayer", class="rpbonus", type="text", size=10>',
		 '&nbsp&nbsp&nbsp&nbsp <a href="javascript:void(0)"',
		 'id="PreferencesClearPlayerButton">Clear Player Data &gt;</a>',
		 '</p><br>');

	// General data reset buttons
	arr.push('<p style="margin: 0pt; text-align: left;">',
		 '<a href="javascript:void(0)" id="PreferencesResetLogMarkersButton">',
		 '&lt; Reset Log Markers</a></p>');

	arr.push('<p style="margin: 0pt; text-align: left;">',
		 '<a href="javascript:void(0)" id="PreferencesDefaultRPPolicyButton">',
		 '&lt; Reset Default RP Policy</a></p>');

	arr.push('<p style="margin: 0pt; text-align: left;">',
		 '<a href="javascript:void(0)" id="PreferencesResetAllPlayerDataButton">',
		 '&lt; Reset All Player Data</a></p>');

	arr.push('<p style="margin: 0pt; text-align: left;">',
		 '<a href="javascript:void(0)" id="PreferencesRollAllPlayerDataButton">',
		 '&lt; Reset All Awarded Player Data</a></p>');

	// Concatenate everything in the array to form the html
	this.window.element.innerHTML = arr.join("");

	// Set event callback functions
	document.getElementById("PreferencesSaveRPPolicyButton").addEventListener("click", this.SaveRPPolicy, true);
	document.getElementById("PreferencesBonusRPButton").addEventListener("click", this.GiveBonusRP, true);
	document.getElementById("PreferencesClearPlayerButton").addEventListener("click", this.ClearPlayerData, true);
	document.getElementById("PreferencesResetLogMarkersButton").addEventListener("click", this.ResetLogMarkers, true);
	document.getElementById("PreferencesDefaultRPPolicyButton").addEventListener("click", this.DefaultRPPolicy, true);
	document.getElementById("PreferencesResetAllPlayerDataButton").addEventListener("click", this.ResetAllPlayerData, true);
	document.getElementById("PreferencesRollAllPlayerDataButton").addEventListener("click", this.RollAllPlayerData, true);

	this.initialized = 1;
    }

    // Draw the window, or hide if already visible
    this.Draw = function()
    {
	// Load Player Data
	kageTool.LoadPlayerData();

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
	for (var i=0; i<kageTool.info.arrInfoVars.length; i+=2)
	{
	    var name = kageTool.info.arrInfoVars[i];
          var value = kageTool.info.GetValue(name);
	    
	    var elem = document.getElementById('pref_' + name);
	    elem.value = value;
	}

	// Show the window
	this.window.show();
    }

    // Save the preferences from the input boxes
    this.SaveRPPolicy = function()
    {
	// Load information back into information structure
	for (var i=0; i<kageTool.info.arrInfoVars.length; i+=2)
	{
	    var name = kageTool.info.arrInfoVars[i];
	    var elem = document.getElementById('pref_' + name);
          kageTool.info.SetValue(name, elem.value);
	}

	// Save the information object
	kageTool.info.SaveInfo();

	// Edit the innerHTML of save button to show that something actually happened
	document.getElementById("PreferencesSaveRPPolicyButton").innerHTML = '<font color="yellow">RP Policy Saved &gt;</font>';
	setTimeout(function(){document.getElementById("PreferencesSaveRPPolicyButton").innerHTML = "Save RP Policy &gt;";}, 3000);
    }

    // Give Bonus RP to player
    this.GiveBonusRP = function()
    {
	var name = document.getElementById("nameBonus").value;
	var rp   = document.getElementById("rpBonus").value;

	// Early return if no name or RP given
	if (name == "" || rp == "")
	{
	    alert("Please enter both name and RP amount");
	    return;
	}

	// Input validation
	rp = parseInt(rp);
	CheckNum(rp, "RP", "floatingPreferences.GiveBonusRP");
	kageTool.CheckPlayer(name);

	// Add bonuses
	kageTool.playerList[name].rpOwed += rp;
	kageTool.playerList[name].rpAwardedTotal += rp;

	// Write logText
	kageTool.playerList[name].logText += rp + " Bonus RP Awarded\n";

	// Edit the innerHTML of button to show that something actually happened
	document.getElementById("PreferencesBonusRPButton").innerHTML = '<font color="yellow">RP Given &gt;</font>';
	setTimeout(function(){document.getElementById("PreferencesBonusRPButton").innerHTML = "Give RP &gt;";}, 3000);

	// Refresh the report window, if shown
	if (floatingReport.window.element.style.visibility == 'visible')
	{
	    floatingReport.Draw(); // hides the window
	    floatingReport.Draw(); // re-draws the window
	}

	// Reset the text fields (avoid double RP given)
	document.getElementById("nameBonus").value = "";
	document.getElementById("rpBonus").value = "";

	// Save the new player data
	kageTool.SavePlayerData();
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
	if (kageTool.playerList[name]) {
	    delete kageTool.playerList[name];
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
	kageTool.SavePlayerData();
    }

    // Reset the log marker locations
    this.ResetLogMarkers = function()
    {
	// Confirm that the user really wants to do this
	if (!confirm("Really reset village/storehouse log markers?\n\nWarning: RP giving events will be duplicated if player data is not also cleared!"))
	    return;

	// Reset the log markers
	kageTool.info.prevVillageId      = 8367318;
	kageTool.info.prevVillageTime    = 0;
	kageTool.info.prevStorehouseId   = 0;
	kageTool.info.prevStorehouseTime = 0;
      kageTool.info.prevWeek           = ConvertBillyTime(new Date(2010, 8, 6));

	// Edit the innerHTML of button to show that something actually happened
	document.getElementById("PreferencesResetLogMarkersButton").innerHTML = '<font color="yellow">&lt; Log Markers Reset</font>';
	setTimeout(function(){document.getElementById("PreferencesResetLogMarkersButton").innerHTML = "&lt; Reset Log Markers";}, 3000);

	// Save the new info
	kageTool.info.SaveInfo();
    }


    // Restore the default preferences
    this.DefaultRPPolicy = function()
    {
	// Confirm that the user really wants to do this
	if (!confirm("Really reset default values for RP Policy?"))
	    return;

	// Reset the RP policy (do not change log markers or update times)
	var oldInfo = kageTool.info;
	kageTool.info = new KageToolInfo(kageTool.storage);
	
	kageTool.info.prevVillageId      = oldInfo.prevVillageId;
	kageTool.info.prevVillageTime    = oldInfo.prevVillageTime;
	kageTool.info.prevStorehouseId   = oldInfo.prevStorehouseId;
	kageTool.info.prevStorehouseTime = oldInfo.prevStorehouseTime;
      kageTool.info.prevWeek           = oldInfo.prevWeek;

	// Populate cells with current values
	for (var i=0; i<kageTool.info.arrInfoVars.length; i+=2)
	{
	    var name = kageTool.info.arrInfoVars[i];
	    var value = kageTool.info.GetValue(name);
	    
	    var elem = document.getElementById('pref_' + name);
	    elem.value = value;
	}

	// Edit the innerHTML of button to show that something actually happened
	document.getElementById("PreferencesDefaultRPPolicyButton").innerHTML = '<font color="yellow">&lt; Default RP Policy Reset</font>';
	setTimeout(function(){document.getElementById("PreferencesDefaultRPPolicyButton").innerHTML = "&lt; Reset Default RP Policy";}, 3000);

	// Save the information object
	kageTool.info.SaveInfo();
    }

    // Reset all player data
    this.ResetAllPlayerData = function()
    {
	// Confirm that the user really wants to do this
	if (!confirm("Really delete ALL player data?"))
	    return;

	kageTool.playerList = new Object();
	kageTool.ClearPlayerData();

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

    // Rolls player data to next period; keeps unawarded data
    this.RollAllPlayerData = function()
    {
	// Confirm that the user really wants to do this
	if (!confirm("Really delete all non-rolling player data?"))
	    return;

      // Store the data to be saved across the roll
      var saveDataList = new Object();
      for (name in kageTool.playerList) {
          saveDataList[name] = kageTool.playerList[name].saveData;
      }

      // Clear data
	kageTool.playerList = new Object();
	kageTool.ClearPlayerData();

      // Replace rolling data
      for (name in saveData) {
          kageTool.playerList[name] = new PlayerData(null);
          kageTool.playerList[name].saveData = saveDataList[name];
      }

      // Save the player data
      kageTool.SavePlayerData();

	// Edit the innerHTML of button to show that something actually happened
	document.getElementById("PreferencesRollAllPlayerDataButton").innerHTML = '<font color="yellow">&lt; All Player Data Rolled</font>';
	setTimeout(function(){document.getElementById("PreferencesRollAllPlayerDataButton").innerHTML = "&lt; Roll All Player Data";}, 3000);

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

// Check RP values before use (Prevent NaN and infinity values from corrupting data)
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

// Put a KageTools button in the village actions menu
function InsertKageToolsButton()
{
    // Table which houses everything in left column below the village message log
    var leftTable = document.evaluate("//form[@name='emess']/font/font/table/tbody/tr/td", document, null,
				      XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

    var msgText;
    var msgReportButton;
    var funReportCallback;

    var msgStorehouseButton = "Update Storehouse &gt;";
    var funStorehouseCallback = function() {unsafeWindow.document.respoints.submit();};

    var msgPreferencesButton = "RP Policy / Admin &gt;";
    var funPreferencesCallback = function() {floatingPreferences.Draw();};

    var hrsVillageElapsed = Math.floor( ( (new Date()).getTime() - kageTool.info.prevVillageTime ) / (1000 * 60 * 60) );
    var hrsStorehouseElapsed = Math.floor( ( (new Date()).getTime() - kageTool.info.prevStorehouseTime ) / (1000 * 60 * 60) )

    // Build the message strings for button
    if (VillageAllMessagesShown())
    {
	msgText   = 
	    "Use your KageTools!<br>" +
	    "(" + hrsVillageElapsed + "h since last village update)<br>" +
	    "(" + hrsStorehouseElapsed + "h since last storehouse update)" +
          "(last week: " + kageTool.info.prevWeek.toDateString() + ")";	    
	msgReportButton = "KageTools Report &gt;";
	funReportCallback = ParseVillageLogs;
    }
    else
    {
	msgText = "Show all messages to use KageTools<br>" +
	    "(" + hrsVillageElapsed + "h since last village update)<br>" +
	    "(" + hrsStorehouseElapsed + "h since last storehouse update)<br>" +
          "(last week: " + kageTool.info.prevWeek.toDateString() + ")";	    
	msgReportButton = "Show All Messages &gt;";
	funReportCallback = function(){unsafeWindow.document.refreshmes.submit()};
    }

    // Build the new div element

    var divElem = document.createElement("div");
    divElem.id = "KageToolDiv";

    divElem.innerHTML = 
	'<table style="border: 2px solid rgb(0, 0, 0); background-color: rgb(0,0,192); color: rgb(255, 255, 255); font-family: arial; font-size: 12px;" width="255"><tbody><tr><td>\n' +
	msgText + '<br>\n' +
	'<p style="margin: 0pt; text-align: right;"><a href="javascript:void(0)" id="KageToolsReportButton" style="color: rgb(255, 255, 255); font-size: 14px;"><b>' + msgReportButton + '</b></a></p>\n' +
	'<p style="margin: 0pt; text-align: right;"><a href="javascript:void(0)" id="KageToolsStorehouseButton" style="color: rgb(255, 255, 255); font-size: 14px;"><b>' + msgStorehouseButton + '</b></a></p>\n' +
	'<p style="margin: 0pt; text-align: right;"><a href="javascript:void(0)" id="KageToolsPreferencesButton" style="color: rgb(255, 255, 255); font-size: 14px;"><b>' + msgPreferencesButton + '</b></a></p>\n' +
	'</td></tr></tbody></table>\n';

    // Figure out where to put in the div element
    leftTable.insertBefore(divElem, leftTable.firstChild);

    // Add event listener for greassmonkey callback
    document.getElementById("KageToolsReportButton").addEventListener("click", funReportCallback, true);
    document.getElementById("KageToolsStorehouseButton").addEventListener("click", funStorehouseCallback, true);
    document.getElementById("KageToolsPreferencesButton").addEventListener("click", funPreferencesCallback, true);
}








////////////////////////////////////////////////////////////////////////
///////////             VILLAGE LOG PARSING              ///////////////
////////////////////////////////////////////////////////////////////////


// Handler for Daily Collection Log Message
//     We don't actually care about the contents of the message
//     This handler parses once a day stuff for active / lazy ninja
function HandlerDailyCollection(msg)
{
    // Helper function for active ninja
    function doActive(arr, action)
    {
	for(var i=0; i<arr.length; i++)
	{
	    name = arr[i];
	    if (!name)
		continue;

	    if (name == "None")
		continue;

	    // Add bonuses
	    kageTool.CheckPlayer(name);
	    kageTool.playerList[name].saveData.numConsecDaysActive++;
          kageTool.playerList[name].numTotalDaysActive++;
	    kageTool.playerList[name].rpOwed += kageTool.info.rpvalDayActive;

	    // Write logText
	    kageTool.playerList[name].logText += kageTool.info.rpvalDayActive + " RP for " + action + " action\n";

          // Check for and award full active weeks
          if (kageTool.playerList[name].saveData.numConsecDaysActive == 7) {
              kageTool.playerList[name].saveData.numConsecDaysActive = 0;
              kageTool.playerList[name].numFullWeeksActive++;

              // Award RP
              kageTool.playerList[name].rpOwed += kageTool.info.rpvalFullWeekActive;

              // Write logText
              kageTool.playerList[name].logText += kageTool.info.rpvalFullWeekActive + " RP for full active week\n";
          }
	}
    }

    // Helper function for Overwhelming Efficiency
    function doUpkeep(arr) {
      for (var i=0; i < arr.length; i++) {
          if (!arr[i])
            continue;

          // Get the name of player and the upkeep level
          var result = /(.+) Lvl. (\d)/.exec(arr[i]);
          var name     = result[1];
          var level    = result[2];

          if (++kageTool.playerList[name].saveData.numUpkeepDays[level-1] == 7) {
              kageTool.playerList[name].saveData.numUpkeepDays[level-1] = 0;
              kageTool.playerList[name].numUpkeepWeeks[level-1]++;

              // Award RP
              kageTool.playerList[name].rpOwed += kageTool.info.rpvalUpkeepWeek[level-1];

              // Write logText
              kageTool.playerList[name].logText += kageTool.info.rpvalUpkeepWeek[level-1] + " RP for level " + level + " upkeep week\n";
          }
      }
    }

    // Helper function for lazy ninja
    function doLazy(arr)
    {
	for(var i=0; i<arr.length; i++)
	{
	    if (!arr[i])
		continue;

	    name = /^(.+?)($| \()/.exec(arr[i])[1];

	    if (name == "None")
		continue;

	    // Add bonuses
	    kageTool.CheckPlayer(name);
	    kageTool.playerList[name].numDaysLazy++;
	    kageTool.playerList[name].rpOwed += kageTool.info.rpvalDayLazy;

          // Break consecutive days
          kageTool.playerList[name].saveData.numConsecDaysActive = 0;

	    // Write logText
	    kageTool.playerList[name].logText += kageTool.info.rpvalDayLazy + " RP for being lazy\n";
	}
    }

    // Drill down to the text we are looking for
    var result = /<b>Contributions:<\/b>(.+?)<b>Collectors:<\/b>(.+?)<b>Patrollers:<\/b>(.+?)<b>Repairers:<\/b>(.+?)<b>Paper-pushers:<\/b>(.+?)<b>Resuppliers:<\/b>(.+?)<b>Sappers:<\/b>(.+?)<b>Awesome Upkeep:<\/b>(.+?)<b>Lazy Ninja:<\/b>(.+?)<\/div>/.exec(document.body.innerHTML);

    // Special case code if village has no awesome upkeep
    if (!result)
    {
        var result = /<b>Contributions:<\/b>(.+?)<b>Collectors:<\/b>(.+?)<b>Patrollers:<\/b>(.+?)<b>Repairers:<\/b>(.+?)<b>Paper-pushers:<\/b>(.+?)<b>Resuppliers:<\/b>(.+?)<b>Sappers:<\/b>(.+?)<b>Lazy Ninja:<\/b>(.+?)<\/div>/.exec(document.body.innerHTML);
        result[9] = result[8];
        result[8] = "None";
    }

    var contributions = result[1].split("<br>");
    var collect       = result[2].split("<br>");
    var patrol        = result[3].split("<br>");
    var repair        = result[4].split("<br>");
    var paperwork     = result[5].split("<br>");
    var resupply      = result[6].split("<br>");
    var sapper        = result[7].split("<br>");
    var upkeep        = result[8].split("<br>");
    var lazy          = result[9].split("<br>");

    // Call the helper scripts for each of the different categories
    doActive(collect, "collect");
    doActive(patrol, "patrol");
    doActive(repair, "repair");
    doActive(paperwork, "paperwork");
    doActive(resupply, "resupply");
    doActive(sapper, "sapper");

    doUpkeep(upkeep);

    doLazy(lazy);
}

// Handler for PH Wheel Resource winnings
function HandlerResWheel(msg)
{
    // Example msg.text
    // &nbsp;&nbsp;<b>Party House Win:</b> Yamakaziku has won a Basic Resource for the Village!

    // Extract player name
    var name = /<\/b> (.+) has won a Basic Resource for the Village!/.exec(msg.text)[1];
    kageTool.CheckPlayer(name);

    // Add bonuses
    kageTool.playerList[name].resWheel++;
    kageTool.playerList[name].rpOwed += kageTool.info.rpvalResWheel;

    // Write logText
    kageTool.playerList[name].logText += kageTool.info.rpvalResWheel + " RP for wheel resource\n";    
}

// Handler for ROBO FIGHTO resource tourney winnings
function HandlerResRobo(msg)
{
    // Example msg.text
    // <input id="message-8118301" name="message-8118301" value="1" type="checkbox"><b><b>ROBO FIGHTO</b>:</b> Simular has won one of each Basic Resource for your village!

    // Extract player name
    var name = /<\/b> (.+) has won one of each Basic Resource for your village!/.exec(msg.text)[1];
    kageTool.CheckPlayer(name);

    // Add bonuses
    kageTool.playerList[name].resRobo += 3;
    kageTool.playerList[name].rpOwed += 3 * kageTool.info.rpvalRoboResBasic;

    // Write logText
    kageTool.playerList[name].logText += 3* kageTool.info.rpvalRoboResBasic + " RP for ROBO FIGHTO win\n";    
}

// Handler for Kaiju favors
function HandlerKaijuFavor(msg)
{
    // Example msg.text
    // &nbsp;&nbsp;<b>The Flash!:</b> Sabrac asks The Flash for a favor, and he does a whirlwind of damage to the Kaiju!

    // Extract player name
    var name = /<\/b> (.+) asks The Flash for a favor, and he does a whirlwind of damage to the Kaiju!/.exec(msg.text)[1];
    kageTool.CheckPlayer(name);
    
    // Add bonuses
    kageTool.playerList[name].numKaijuFavors++;
    kageTool.playerList[name].rpOwed += kageTool.info.rpvalKaijuFavor;

    // Write logText
    kageTool.playerList[name].logText += kageTool.info.rpvalKaijuFavor + 
	" RP for Kaiju Favor\n";
}

// Handler for Z-Reward donations
function HandlerZRewards(msg)
{
    // Example msg.text
    // &nbsp;&nbsp;<b>Z-Rewards 8/18 (Wed - 7:29):</b> quastle gave 15 Z-Rewards to the village.

    // Extract player Name
    var result = /<\/b> (.+) gave (\d+) Z-Rewards to the village./.exec(msg.text);
    var name  = result[1];
    var numZReward = parseInt(result[2], 10);
    kageTool.CheckPlayer(name);
    
    // Add Bonuses
    var rpOwed = numZReward * kageTool.info.rpvalZReward;
    
    kageTool.playerList[name].numZReward += numZReward;
    kageTool.playerList[name].rpOwed += rpOwed;

    // Write logText
    kageTool.playerList[name].logText += rpOwed + " RP for " + numZReward + " Z-Rewards\n";
}

// Handler for Snake Oil and snake oil lite
function HandlerSnakeOil(msg)
{
    // Example msg.text
    // &nbsp;&nbsp;<b>SNAKE Oil:</b> Kuwaii drank SNAKE Oil, and resources popped out all over! One of each Resource Granted!
    // &nbsp;&nbsp;<b>SNAKE Oil:</b> Sabrac drank SNAKE Oil Lite, and resources popped out all over! Resources Granted - Precious Metals, Brilliant Crystals, Precious Metals
    
    var result = /<\/b> (.+) drank (SNAKE Oil|SNAKE Oil Lite), and resources popped out all over!/.exec(msg.text);
    var name = result[1];
    var type = result[2];
    kageTool.CheckPlayer(name);

    var resBasic = 0;
    var resAdvanced = 0;
    if (type == "SNAKE Oil Lite")
    {
	var resTypes = /Resources Granted - (\w+ \w+), (\w+ \w+), (\w+ \w+)/.exec(msg.text);
	for (var i=1; i<=3; i++)
	{
	    if (resTypes[i] == "Brilliant Crystals" ||
		resTypes[i] == "Medicinal Water" ||
		resTypes[i] == "Precious Metals")
		resBasic++;
	    if (resTypes[i] == "Solid Fire" ||
		resTypes[i] == "Unmelting Ice")
		resAdvanced++;
	}
    }	
    else  // SNAKE OIL
    {
	resBasic = 3;
	resAdvanced = 2;
    }

    // Add bonuses
    kageTool.playerList[name].resSnakeOilBasic += resBasic;
    kageTool.playerList[name].resSnakeOilAdvanced += resAdvanced;

    var rpOwed = resBasic * kageTool.info.rpvalSnakeOilBasic + resAdvanced * kageTool.info.rpvalSnakeOilAdvanced;
    kageTool.playerList[name].rpOwed += rpOwed;

    // Write logText
    kageTool.playerList[name].logText += rpOwed + " RP for " + type + " -- " + resBasic + " basic, " + resAdvanced + " advanced\n";
}

// Debugging function simulating spy awards
function fakeMove() {
    alert("Doing move");
    var mostSpies = 0;
    var bestSpiers = new Array();
    // Award RP for the week's spies and determine who infiltrated the most.
    for (name in kageTool.playerList) {
        var spies = kageTool.playerList[name].saveData.numCurrSpies;

        if (spies > mostSpies) {
            mostSpies = kageTool.playerList[name].saveData.numCurrSpies;
            bestSpiers = new Array();
            bestSpiers.push(name);
        } else if (spies == mostSpies) {
            bestSpiers.push(name);
        }
        kageTool.playerList[name].saveData.numCurrSpies = 0;
    }

    // Award RP for the most spy infiltrations.
    if (mostSpies >= kageTool.info.spyWinMin) {
        for (var i = 0; i < bestSpiers.length; i++) {
            var name = bestSpiers[i];

            kageTool.playerList[name].numSpyWins++;
            kageTool.playerList[name].rpOwed += kageTool.info.rpvalSpyWin;
            kageTool.playerList[name].logText += kageTool.info.rpvalSpyWin + " RP for spy win (" + mostSpies + " spies)\n";
        }
    }
}

// Check whether a spy message takes place in the same 
function CheckNewSpyWeek(msg) {
    var today = ConvertBillyTime(new Date());
    var spyDate;
    var spyDay = /Spy Success (\d+)\/(\d+)/.exec(msg.text);

    // Pull the date of the current spy from the message.
    if (spyDay[1] > today.getMonth() + 1) {
        spyDate = new Date(today.getFullYear() - 1, spyDay[1] - 1, spyDay[2]);
    } else {
        spyDate = new Date(today.getFullYear(), spyDay[1] - 1, spyDay[2]);
    }

    if (spyDate.getTime() - kageTool.info.prevWeek.getTime() < 1000*60*60*24*7) {
        return false;
    } else {
        return true;
    }
}

// Function for awarding RP if a full week of spying is completed.
function ChangeSpyWeek() {
    var newDate = ConvertBillyTime(new Date());

    // If the day is still within the previous week, do nothing.
    if (newDate.getTime() - kageTool.info.prevWeek.getTime() < 1000*60*60*24*7) {
        return;
    }

    var bestSpiers = new Array();
    var mostSpies = 0;

    // Award RP for the week's spies and determine who infiltrated the most.
    for (name in kageTool.playerList) {
        var spies = kageTool.playerList[name].saveData.numCurrSpies;

        if (spies > mostSpies) {
            mostSpies = kageTool.playerList[name].saveData.numCurrSpies;
            bestSpiers = new Array();
            bestSpiers.push(name);
        } else if (spies == mostSpies) {
            bestSpiers.push(name);
        }
        kageTool.playerList[name].saveData.numCurrSpies = 0;
    }

    // Award RP for the most spy infiltrations.
    if (mostSpies >= kageTool.info.spyWinMin) {
        for (var i = 0; i < bestSpiers.length; i++) {
            var name = bestSpiers[i];

            kageTool.playerList[name].numSpyWins++;
            kageTool.playerList[name].rpOwed +=
                kageTool.info.rpvalSpyWin;
            kageTool.playerList[name].logText += kageTool.info.rpvalSpyWin + " RP for spy win (" + mostSpies + " spies)\n";
        }
    }

    // Move forward to the week of the current date.
    while (newDate.getTime() - kageTool.info.prevWeek.getTime() >= 1000*60*60*24*7) {
        kageTool.info.prevWeek = new Date(kageTool.info.prevWeek.getTime() + 1000*60*60*24*7);
    }
}

// Handler for Spy Success log messages
function HandlerSpy(msg)
{
    // Example msg.text
    // &nbsp;&nbsp;<b>Spy Success 8/16 (Mon - 21:31):</b> Tony6785 has infiltrated a spy into TFF II Village!

    // Extract Player name
    var name = /<\/b> (.+) has infiltrated a spy into /.exec(msg.text)[1];
    kageTool.CheckPlayer(name);

    // Store spies
    kageTool.playerList[name].numTotalSpies++;
    kageTool.playerList[name].saveData.numCurrSpies++;

    kageTool.playerList[name].logText += "Spy infiltrated ";

    // Award RP when the player infiltrates a new spy set
    if (kageTool.playerList[name].numTotalSpies % kageTool.info.spySetSize == 0) {
        kageTool.playerList[name].rpOwed += kageTool.info.rpvalSpySet;
        kageTool.playerList[name].logText += "(" + kageTool.info.rpvalSpySet + " RP for " + " spy set) ";
    }

    kageTool.playerList[name].logText += "(week total: "
                                          + kageTool.playerList[name].saveData.numCurrSpies + ")\n";
}

// Handler for Invasion Success log messages
function HandlerInvasion(msg)
{
    // Example msg.text
    // &nbsp;&nbsp;<b>Invasion Success 8/15 (Sun - 21:42):</b> Kazeodori attempted to attack Jidai Village and succeeded! They took 1 Brilliant Crystals, 1 Medicinal Water, 1 Precious Metals, 1 Unmelting Ice!

    // Extract player name
    var name = /<\/b> (.+) attempted to attack/.exec(msg.text)[1];
    kageTool.CheckPlayer(name);

    // Number of resources acquired
    var numBasic = 
	(msg.text.indexOf("Brilliant Crystals") >= 0 ? 1 : 0) +
	(msg.text.indexOf("Medicinal Water")    >= 0 ? 1 : 0) +
	(msg.text.indexOf("Precious Metals")    >= 0 ? 1 : 0);	

    var numAdvanced = 
	(msg.text.indexOf("Solid Fire")         >= 0 ? 1 : 0) +
	(msg.text.indexOf("Unmelting Ice")      >= 0 ? 1 : 0);

    var full = 0;
    if (numBasic + numAdvanced == 5) {
        full = 1;
    }

    // Add bonuses
    kageTool.playerList[name].numInvasion++;
    kageTool.playerList[name].numFullInvasion += full;
    kageTool.playerList[name].resInvasionBasic    += numBasic;
    kageTool.playerList[name].resInvasionAdvanced += numAdvanced;

    var rpOwed = numBasic * kageTool.info.rpvalResInvasionBasic +
	         numAdvanced * kageTool.info.rpvalResInvasionAdvanced +
               full * kageTool.info.rpvalResInvasionFull;
    kageTool.playerList[name].rpOwed += rpOwed;

    // Write logText
    kageTool.playerList[name].logText += rpOwed + " RP for invasion -- " +
	numBasic + " basic, " + numAdvanced + " advanced\n";
}

// Handler for Raid Success log messages
function HandlerRaid(msg)
{
    // Example msg.text
    // &nbsp;&nbsp;<b>Raid Success 8/16 (Mon - 9:11):</b> SirDuck36 attempted to attack Manetheren Village and succeeded! They got 1303660 Ryo!

    // Extract player name
    var name = /<\/b> (.+) attempted to attack/.exec(msg.text)[1];
    kageTool.CheckPlayer(name);

    // Extract ryo amount and remove commas if present
    var strRyo = /Village and succeeded! They got ([\d,]+) Ryo!/.exec(msg.text)[1];
    var ryo = parseInt(strRyo.replace(/,/gi, ""), 10);

    // RP Earned = Base + floor(ryo/increment)
    var rpBase = kageTool.info.rpvalRaidBase;
    var rpBonus = Math.floor(ryo/kageTool.info.sizeRaidRyoPack) * kageTool.info.rpvalRaidRyoPack;

    // Add bonuses
    kageTool.playerList[name].numRaid++;
    kageTool.playerList[name].ryoRaid += ryo;
    kageTool.playerList[name].rpOwed  += rpBase + rpBonus;

    // Write logText
    kageTool.playerList[name].logText += rpBase + "+" + rpBonus + 
	" RP for " + strRyo + " ryo raid (base+bonus)\n";
}

// Handler for Contract Donation/Milling
function HandlerContracts(msg)
{
    // Example msg.text
    // &nbsp;&nbsp;<b>Contracts 8/16 (Mon - 0:32):</b> SirDuck36 milled 1 Major Village Contract for Nothing!
    // &nbsp;&nbsp;<b>Contracts 8/16 (Mon - 14:50):</b> Blasfeemy has submitted 3 Minor Village Contracts for 3000 Ryo!
    // &nbsp;&nbsp;<b>Contracts 8/16 (Mon - 10:43):</b> Freeg milled 5 Major Village Contracts for 5000 Ryo, 1 Brilliant Crystals!
    // &nbsp;&nbsp;<b>Contracts 9/2 (Thu - 11:34):</b> Tony6785 milled 1 Major Village Contract for 1 Solid Fire!

    // Early return if contracts were milled for nothing
    if (msg.text.indexOf("for Nothing!") >= 0)
	return;

    // Extract player name
    var name = /<\/b> (.+) (has submitted |milled )/.exec(msg.text)[1];
    kageTool.CheckPlayer(name);

    // Determine if contracts milled or donated
    var milled = false;
    if (/<\/b> (.+) (has submitted |milled )/.exec(msg.text)[2] == "milled ") {
        milled = true;
    }

    var strRyo;
    var ryo;

    // Ryo/Resources acquired
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

    var temp;

    var numContracts;
    var typeContracts;

    // Extract number of major and minor contracts
    temp = /(milled|has submitted) ([\d]+) (Major|Minor) Village Contract/.exec(msg.text);

    numContracts = parseInt(temp[2].replace(/,/gi,""), 10);
    typeContracts = temp[3];

    var resBasic = 0;
    var resAdvanced = 0;

    // Extract Basics
    temp = / (\d+) Brilliant Crystals/.exec(msg.text); 
    if (temp) resBasic += parseInt(temp[1].replace(/,/gi,""), 10);
    temp = / (\d+) Medicinal Water/.exec(msg.text); 
    if (temp) resBasic += parseInt(temp[1].replace(/,/gi,""), 10);
    temp = / (\d+) Precious Metals/.exec(msg.text); 
    if (temp) resBasic += parseInt(temp[1].replace(/,/gi,""), 10);

    // Extract Advanceds
    temp = / (\d+) Solid Fire/.exec(msg.text); 
    if (temp) resAdvanced += parseInt(temp[1].replace(/,/gi,""), 10);
    temp = / (\d+) Unmelting Ice/.exec(msg.text); 
    if (temp) resAdvanced += parseInt(temp[1].replace(/,/gi,""), 10);

    // Award bonuses
    var rpPacks;
    if (typeContracts == "Major")
	rpPacks = Math.floor(numContracts/kageTool.info.sizeContractPackMajor)*kageTool.info.rpvalContractPackMajor;
    if (typeContracts == "Minor");
	rpPacks = Math.floor(numContracts/kageTool.info.sizeContractPackMinor)*kageTool.info.rpvalContractPackMinor;

    if (!milled) {
        var rpRyoPacks  = Math.floor((ryo+kageTool.playerList[name].saveData.cDonateRyoLeftover)/kageTool.info.sizeCDonateRyoPack)
                          *kageTool.info.rpvalCDonateRyoPack;
    } else {
        var rpRyoPacks  = Math.floor((ryo+kageTool.playerList[name].saveData.cMillRyoLeftover)/kageTool.info.sizeCMillRyoPack)
                          *kageTool.info.rpvalCMillRyoPack;
    }

    var rpBasic    = resBasic * kageTool.info.rpvalContractResBasic;
    var rpAdvanced = resAdvanced * kageTool.info.rpvalContractResAdvanced;


    kageTool.playerList[name].ryoContractTotal             += ryo;
    if (!milled) {
        kageTool.playerList[name].saveData.cDonateRyoLeftover = (ryo+kageTool.playerList[name].saveData.cDonateRyoLeftover)
                                                                    % kageTool.info.sizeCDonateRyoPack;
    } else {
        kageTool.playerList[name].saveData.cMillRyoLeftover = (ryo+kageTool.playerList[name].saveData.cMillRyoLeftover)
                                                                    % kageTool.info.sizeCMillRyoPack;
    }
    kageTool.playerList[name].resContractBasic             += resBasic;
    kageTool.playerList[name].resContractAdvanced          += resAdvanced;

    kageTool.playerList[name].rpOwed += rpPacks + rpRyoPacks + rpBasic + rpAdvanced;

    // Write logText
    kageTool.playerList[name].logText += rpPacks + "+" + rpRyoPacks + "+" + rpBasic + "+" + rpAdvanced + " RP for ";
    if (milled) {
        kageTool.playerList[name].logText += "milled";
    } else {
        kageTool.playerList[name].logText += "donated";
    }
    kageTool.playerList[name].logText += " contracts\n&nbsp;&nbsp;&nbsp;-- "
	+ numContracts + " " + typeContracts + ", " + ryo + " ryo, " + resBasic + " basic, " + resAdvanced + " advanced\n";

}

// Outer loop for Village Log Parsing
//     Each specific event type is passed to the Handlers above
function ParseVillageLogs()
{
    // Early return if user needs to press the Show all messages button
    if (!VillageAllMessagesShown())
    {
	alert("KageTools: Please show all village messages before running script");
	return;
    }

    // Load KageTools data from DOM Storage (possibly expensive operation)
    kageTool.LoadPlayerData();

    // Flag to prevent village actions from being parsed more than once per day
    var flagDaily = false;

    // Get the current date in Billy time
    var today = ConvertBillyTime(new Date());

    // Check whether a new weekly marker day has been passed
    var newWeek = false;
    if (today.getTime() - kageTool.info.prevWeek.getTime() >= 1000*60*60*24*7) {
        newWeek = true;
    }

    // Get a snapshot for each message in the village chat
    var snapMessageList = document.evaluate("//ul[@id='messageul']//li/label", document, null,
					 XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

    // Examine each message for potential tasty info
    var i;
    var newSpyMsgs = new Array();
    for (i=0; i<snapMessageList.snapshotLength; i++)
    {
	var snap = snapMessageList.snapshotItem(i);

	var msg = new Object();

	// Extract the message id number and test against previous update
	msg.id = parseInt(snap.htmlFor.split('-')[1],10);
	if (msg.id <= kageTool.info.prevVillageId)
	    break;

	msg.text = snap.innerHTML;

	try
	{

	    // Daily collection
	    if (msg.text.indexOf("<b>Daily Collection:</b>") >= 0 && !flagDaily)
	    {
		flagDaily = true;
		HandlerDailyCollection(msg);
	    }
	    
	    // Party house wheel resource win
	    if (msg.text.indexOf("<b>Party House Win:</b>") >= 0)
		HandlerResWheel(msg);
	    
	    // Daily resource tourney from robofighto
	    if (msg.text.indexOf("<b>ROBO FIGHTO</b>:") >= 0)
		HandlerResRobo(msg);
	    
	    // Kaiju Favor
	    if (msg.text.indexOf("<b>The Flash!:</b>") >= 0 &&
                msg.text.indexOf("and he does a whirlwind of damage to the Kaiju!") >= 0)
		HandlerKaijuFavor(msg);
	    
	    // Z-Reward Donation
	    if (msg.text.indexOf("<b>Z-Rewards ") >= 0)
		HandlerZRewards(msg);
	    
	    // SNAKE OIL and SNAKE OIL lite
	    if (msg.text.indexOf("<b>SNAKE Oil:</b>") >= 0)
		HandlerSnakeOil(msg);
	    
	    // Spy Success
	    if (msg.text.indexOf("<b>Spy Success ") >= 0) {
                if (newWeek) {
                    // Postpone reading spies if they come from next week
                    if (newWeek = CheckNewSpyWeek(msg)) {
                        newSpyMsgs.push(msg);
                    }
                }

                if (!newWeek) {
	            HandlerSpy(msg, newWeek);
                }
            }
	    
	    // Invasion Success
	    if (msg.text.indexOf("<b>Invasion Success ") >= 0)
		HandlerInvasion(msg);
	    
	    // Raid Success
	    if (msg.text.indexOf("<b>Raid Success ") >= 0)
		HandlerRaid(msg);

	    // Contracts donated
	    if (msg.text.indexOf("<b>Contracts") >= 0)
		HandlerContracts(msg);

	}
	catch (err)
	{
	    // Display error and ask the user whether they wish to continue
	    var text = "Error: " + err.message + "\n\noccured parsing village message:\n" + msg.text + "\n\n"
		+ "Press OK to skip this log entry or press CANCEL to halt script execution without save."
		+ "\n\n NOTE: RP for this village message must be added manually if you choose to continue.";

	    if (!confirm(text))
		throw(err);
	}	
    }

    // Ensure that last weeks spies are awarded even if none were planted this week.
    ChangeSpyWeek();

    // Handle all spies from the new week
    for (i=0; i<newSpyMsgs.length; i++) {
        HandlerSpy(newSpyMsgs[i]);
    }
        
    
    // Update the last message log id
    kageTool.info.prevVillageId = parseInt(snapMessageList.snapshotItem(0).htmlFor.split('-')[1],10);
    
    // Update the last update time
    kageTool.info.prevVillageTime = (new Date()).getTime();

    // Populate and show the floatingReport window
    floatingReport.Draw();

    // Save the Player data
    kageTool.SavePlayerData();

    // Save the information object
    kageTool.info.SaveInfo();

}











////////////////////////////////////////////////////////////////////////
///////////            STOREHOUSE LOG PARSING              /////////////
////////////////////////////////////////////////////////////////////////


// Handler for RP Awarded in storehouse log
function HandlerRPAward(msg)
{
    // Example msg.text
    // 8/19 (Thu - 0:51): SirDuck36 gave 3 RP to SirDuck36!
    // 8/19 (Thu - 0:50): SirDuck36 gave 2 RP to SirDuck36! Reason: Awesomeness

    // Parse log string
    var result = / gave (\d+) RP to (.+?)!( Reason: )?(.+)?/.exec(msg.text);
    var rpAwarded = parseInt(result[1]);
    var name = result[2];
    var reason = "none";
    if (result[4]) {
        reason = result[4];
    }
    kageTool.CheckPlayer(name);

    // Update Player object
    kageTool.playerList[name].rpAwardedTotal += rpAwarded;
    // If given for a non-script-related reason, do not reduce owed RP
    var goodReasonExp = /(kaiju|item)/i;
    if (!goodReasonExp.test(reason)) {
        kageTool.playerList[name].rpOwed -= rpAwarded;
    }

    // Write logText
    kageTool.playerList[name].logText += rpAwarded + "RP Given\n";
}

// Populates the "Amount to give" text field with the amount owed
// to the name selected by the given select tag.
function GetSelectedRP(nameDrop)
{
    var name = nameDrop.item(nameDrop.selectedIndex).text;
    var rpOwed = kageTool.playerList[name].rpOwed;
    if (rpOwed != null) {
        document.getElementsByName('giveqty')[0].value = rpOwed;
    }
}

function SelectNextOwedPlayer(nameDrop)
{
    for (var i = 0; i < nameDrop.length; i++) {
        var name = nameDrop.item(i).text;
        var rpOwed = kageTool.playerList[name].rpOwed;
        if (rpOwed != null && rpOwed > 0) {
            nameDrop.selectedIndex = i;
            break;
        }
    }
}


// Outer loop for Storehouse Log Parsing
//     Each specific event type is passed to the Handlers above
function ParseStorehouseLogs()
{
    // Load KageTools data from DOM Storage (possibly expensive operation)
    kageTool.LoadPlayerData();



    // Get a snapshot for each message in the village chat
    var snapMessageList = document.evaluate("//div[@id='slog']//label", document, null,
					 XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

    // Examine each message for potential tasty info
    var i;
    for (i=0; i<snapMessageList.snapshotLength; i++)
    {
	var snap = snapMessageList.snapshotItem(i);

	var msg = new Object();

	// Extract the message id number and test against previous update
	msg.id = parseInt(snap.htmlFor.split('-')[1],10);
	if (msg.id <= kageTool.info.prevStorehouseId)
	    break;

	msg.text = snap.innerHTML;

	try
	{

	    // Handlers here
	    if (msg.text.indexOf(" RP to ") >= 0)
		HandlerRPAward(msg);
	    
	}
	catch (err)
	{
	    // Display error and ask the user whether they wish to continue
	    var text = "Error: " + err.message + "\n\noccured parsing village message:\n" + msg.text + "\n\n"
		+ "Press OK to skip this log entry or press CANCEL to halt script execution without save."
		+ "\n\n NOTE: RP for this village message must be added manually if you choose to continue.";

	    if (!confirm(text))
		throw(err);
	}	

    }

    // Update the last message log id
    kageTool.info.prevStorehouseId = parseInt(snapMessageList.snapshotItem(0).htmlFor.split('-')[1],10);

    // Update the last update time
    kageTool.info.prevStorehouseTime = (new Date()).getTime();
  

    // Populate and show the floatingReport window
    floatingReport.Draw();

    // Save the Player data
    kageTool.SavePlayerData();

    // Save the information object
    kageTool.info.SaveInfo();

    var nameDrop = document.getElementsByName('givename')[0];
    SelectNextOwedPlayer(nameDrop);
    GetSelectedRP(nameDrop);
    nameDrop.addEventListener("change", function(){GetSelectedRP(nameDrop)}, true);
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

// Hotkeys for awarding RP to players
function RPPageKeyCheck(event)
{
    if (document.activeElement.type != "text") {
        var KeyID = event.keyCode;

        if (KeyID == 71) // "g" key
        {
            // Give RP to the player
            document.forms.namedItem("resgive").submit();
        }
        else if (document.forms.namedItem("resgive2") && KeyID == 67) // "c" key on the confirm page
        {
            // Confirm giving RP
            document.forms.namedItem("resgive2").submit();
        }
    }
}







////////////////////////////////////////////////////////////////////////
///////////             PAGE LOAD RUNTIME                ///////////////
////////////////////////////////////////////////////////////////////////


// Create global instance of KageTool object
var kageTool = new KageTool();
kageTool.info.SaveInfo();

// Create the floating window objects
var floatingReport      = new FloatingReport();
var floatingPreferences = new FloatingPreferences();


// What page are we on?
if (/billy.bvs.village\./.test(location.href))
{
    // Main Village Page

    // Insert the KageTools Button
    InsertKageToolsButton();
}
else if(/billy.bvs.villageresourcepoints\./.test(location.href))
{
    // Resource Points Page

    // Add resource page hotkeys
    window.addEventListener("keyup", RPPageKeyCheck, false);

    // Parse the Storehouse Logs
    ParseStorehouseLogs();
}

/*
function MillDataSetup() {
    kageTool.LoadPlayerData();
    for (name in kageTool.playerList) {
        kageTool.playerList[name].saveData.cMillRyoLeftover = 0;
    }
    kageTool.info.rpvalCMillRyoPack = 1;
    kageTool.info.sizeCMillRyoPack = 13334;
}
*/

