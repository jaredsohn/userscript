// ==UserScript==
// @name           Ikariam Advanced
// @namespace      http://userscripts.org/scripts/show/95128
// @description    Offers task automation - Enhances gameplay quality - Maximum Performance
// @version        1.2.3
// @include        http://*.ikariam.com/*
// @exclude        http://*.ikariam.com/index.php?view=informations*
// @exclude        http://*.ikariam.com/index.php?view=highscore*
// @exclude        http://*.ikariam.com/index.php?view=options*
// @exclude        http://*.ikariam.com/index.php?view=version*
// @exclude        http://board.*.ikariam.com*
// @exclude        http://*.ikariam.*/board
// ==/UserScript==

/*
	Important note: This script expects the Array prototype to be "clean". It may not work properly if you add your own properties/methods to it.
*/







var Starttime_ = Timestamp();
// Check if Empire Board or ExMachina is being used
$ = document.getElementById;
var EB_used = $("EmpireBoard");
var EM_used = $("IkaScriptSettings_Ikariam_ExMachina");
if(!EB_used && !EM_used)
{try{
/*
	=================================================================================
	=============================== EMPIRE BOARD HERE ====================================
	=================================================================================
*/

/**************************************************************************************************
LAST CHANGES:

Version 2.0.4:
- Fix to detect arriving goods while target city name has changed
- Fix to detect arriving goods under v.0.4.3
- Fix to detect deployment troop/fleet under v.0.4.3
- Rewrite source-code (buildings and units name's tooltips)

PREVIOUS CHANGES:
http://feeds.feedburner.com/ikariam-v3-empire-board

Based on "Ikariam Alarm And Overview Table" script (for Ikariam v0.2.8)
http://userscripts.org/scripts/show/35995
**************************************************************************************************/

// Old global vars
var config;
var langtype;
var texts;
var buildings;
var tavernWineUsage = [0, 4, 8, 13, 18, 24, 30, 37, 44, 51, 60, 68, 78, 88, 99, 110, 122, 136,150,165,180,197,216,235,255,277,300,325,351,378,408,439,472,507,544,584,626,670,717,766,818,874,933,995,1060,1129,1202,1278];
var townHallSpaces = [0, 60, 96, 142, 200, 262, 332, 410, 492, 580, 672, 768, 870, 976, 1086, 1200, 1320, 1440, 1566, 1696, 1828, 1964, 2102, 2246, 2390, 2540, 2690, 2845, 3003, 3163, 3326, 3492, 3710, 3880, 4054, 4230, 4410, 4590, 4774, 4960, 5148, 5340, 5532, 5728, 5926, 6126, 6328, 6534, 6760];

var unitsIdClass =  new Object();
// Army
unitsIdClass[303] = 'phalanx';
unitsIdClass[308] = 'steamgiant';
unitsIdClass[315] = 'spearman';
unitsIdClass[302] = 'swordsman';
unitsIdClass[301] = 'slinger';
unitsIdClass[313] = 'archer';
unitsIdClass[304] = 'marksman';
unitsIdClass[307] = 'ram';
unitsIdClass[306] = 'catapult';
unitsIdClass[305] = 'mortar';
unitsIdClass[312] = 'gyrocopter';
unitsIdClass[309] = 'bombardier';
unitsIdClass[310] = 'cook';
unitsIdClass[311] = 'medic';
// Fleet
unitsIdClass[210] = 'ship_ram';
unitsIdClass[211] = 'ship_flamethrower';
unitsIdClass[216] = 'ship_steamboat';
unitsIdClass[213] = 'ship_ballista';
unitsIdClass[214] = 'ship_catapult';
unitsIdClass[215] = 'ship_mortar';
unitsIdClass[212] = 'ship_submarine';

// Old objects
function Resource()
	{
	this.wood	 = 0;
	this.wine	 = 0;
	this.marble	 = 0;
	this.glass	 = 0; // For crystal
	this.sulfur	 = 0;
	}

// New unique object
if (!EmpireBoard) var EmpireBoard = {};

EmpireBoard =
	{
	/* Requires modules */
	Log:			 {},
	DOM:			 {},
	Str:			 {},
	Ikariam:		 {},
	DB:				 {},
	Renders:		 {},
	Tooltip:		 {},
	Handlers:		 {},
	Updater:		 {},
	
	StartTime:		 0,
	EndTime:		 0,
	LogEnabled:		 false,
	MainID:			 'EmpireBoard',
	
	/* Script metas */
	ScriptName:		 'Ikariam Empire Board',
	Version:		 204,
	HomePage:		 '',
	ScriptURL:		 '',
	UserScriptsID:	 41051
	};

EmpireBoard.Init = function()
	{
	this.StartTime = new Date().getTime();
	this.HomePage		 = 'http://userscripts.org/scripts/show/'+this.UserScriptsID;
	this.ScriptURL		 = 'http://userscripts.org/scripts/source/'+this.UserScriptsID+'.user.js';
	
	/* Init Log */
	this.Log.Init(this);
	this.Log._Enabled = this.LogEnabled;
	this.Log.Add('Start...');
	
	this.DOM.Init(this);
	this.Str.Init(this);
	this.Ikariam.Init(this);
	this.DB.Init(this);
	this.DB.Load_Options();
	this.Intl.Init(this, this.MainID);
	this.Renders.Init(this);
	this.Tooltip.Init(this, this.MainID+'Tooltip', this.MainID);
	this.Handlers.Init(this);
	this.Updater.Init(this);
	
	// Always create main div for add-ons  which need to check version
	var body = this.DOM.Get_First_Node("//body");
	if (body != null)
		{
		var div = document.createElement('div');
		div.id = this.MainID;
		div.setAttribute("version", this.Version);
		body.appendChild(div);
		}
	
	this.DB.Load();
	
	this.Intl.SetLanguage(this.DB.Options.Prefs.LANGUAGE);
	this.Intl.Load_LocalizedTexts();
	
	// Str module presets
	this.Str._decimalPoint				 = this.Ikariam.LocalizationStrings('decimalPoint');
	this.Str._thousandSeparator			 = this.Ikariam.LocalizationStrings('thousandSeperator');
	if (this.Str._decimalPoint == undefined)
		this.Str._decimalPoint = '.';
	if (this.Str._thousandSeparator == undefined)
		this.Str._thousandSeparator = ',';
	this.Str._timeunits_short_day		 = this.Ikariam.LocalizationStrings('day','timeunits','short');
	this.Str._timeunits_short_hour		 = this.Ikariam.LocalizationStrings('hour','timeunits','short');
	this.Str._timeunits_short_minute	 = this.Ikariam.LocalizationStrings('minute','timeunits','short');
	this.Str._timeunits_short_second	 = this.Ikariam.LocalizationStrings('second','timeunits','short');
	if (this.Str._timeunits_short_day == undefined)
		this.Str._timeunits_short_day = 'D';
	if (this.Str._timeunits_short_hour == undefined)
		this.Str._timeunits_short_hour = 'h';
	if (this.Str._timeunits_short_minute == undefined)
		this.Str._timeunits_short_minute = 'm';
	if (this.Str._timeunits_short_second == undefined)
		this.Str._timeunits_short_second = 's';
	
	this.CheckScriptUpdate();
	
	this.FetchData();
	};
	
EmpireBoard.FetchData = function()
	{
	// 1. Global data
	
	// 1.1 current cities
	this.Ikariam.Fetch_CitiesSelect(this.DB.CurrentCities, true);
	// 1.2 gold
	var GoldTitle = this.DOM.Get_First_Node_Title("//div[@id='globalResources']//li[@class='gold']",'?');
	if (GoldTitle != '?')
		{
		config.gold = this.Str.To_Integer(GoldTitle, 0);
		}
	else
		{
		// not connected ?
		}
	this.Log.Add('Gold = '+config.gold);
	
	// 2. Current city data
	
	// 2.1 Current city Id
	
	// 3. Main view data
	
	};
	
EmpireBoard.CheckScriptUpdate = function()
	{
	if ((this.DB.Options['LastCheckUpdate'] == undefined) || (this.DB.Options['LastCheckUpdate'] < this.StartTime - (1000 * 60 * 60 * 24)))
		{
		var self = this;
		var ScriptURL = 'http://userscripts.org/scripts/source/'+this.UserScriptsID+'.meta.js?since='+this.StartTime;
		this.Updater.Check(ScriptURL, function(availableVersion) { self._CompareScriptUpdate(availableVersion); });
		}
	else
		{
		this.Log.Add('Not need check update today');
		}
	};
	
EmpireBoard._CompareScriptUpdate = function(availableVersion)
	{
	this.Log.Add('Available version: '+availableVersion);
	if (availableVersion != 0)
		{
		availableVersion = parseInt(availableVersion);

		if ((availableVersion > this.Version) && ((this.DB.Options['AvailableVersion'] == undefined) || (availableVersion > this.DB.Options['AvailableVersion'])))
			{
			if (confirm("Do you want to install \""+this.ScriptName+"\" v. "+availableVersion+" ?"))
				{
				GM_openInTab(this.ScriptURL+'?version='+availableVersion+'.user.js');
				}
			}
		
		this.DB.Options['AvailableVersion'] = availableVersion;
		this.DB.Options['LastCheckUpdate'] = this.StartTime;
		this.DB.Save_Options();
		}
	};
	
EmpireBoard.ViewIsFinances = function()
	{
	if (this.Ikariam.Is_Version_034x() == true)
		{
		var Cities = this.DB.CurrentCities;
		
		// 1. Sum of population
		var overallPop = 0;
		for (CityId in Cities)
			{
			if (Cities[CityId].own != true) continue;
			var city = getCity(CityId);
			var population = getArrValue(city.buildings['townHall'], 'population', '?');
			
			if (population == '?')
				{
				overallPop = '?';
				break;
				}
			else
				{
				overallPop += parseInt(population);
				}
			}
		
		if (overallPop != '?')
			{
			this.Log.Add('overallPop = '+overallPop);
			
			// 2. Fetch overall Upkeep
			var overallUpkeep = '?';
			var cells = this.DOM.Get_Nodes("//table[@id='upkeepReductionTable'][3]//td[contains(@class,'hidden')]");
			if (cells.snapshotLength >= 3)
				{
				overallUpkeep = Math.abs(this.Str.To_Integer(cells.snapshotItem(1).textContent,0));
				
				config["upkeeps"]['overall'] = overallUpkeep;
				
				this.Log.Add('overallUpkeep = '+overallUpkeep);
				}
				
			if (overallUpkeep != '?')
				{
				// 3. Fetch and update citizens (gold) production
				// 3.1. Array of cities per name
				var citiesIDs = {};
				var lName = '';
				for (CityId in Cities)
					{
					if (Cities[CityId].own != true) continue;
					var cName = Cities[CityId].name+'';
					citiesIDs[cName] = parseInt(CityId);
					if (lName == cName)	this.Ikariam.Insert_Warning("You may choose different names for each cities.",this.ScriptName);
					lName = cName+'';
					}
				// 3.2. Fetch cities table
				var nodes = this.DOM.Get_Nodes("//table[@id='balance']//td[@class='city']");
				for (var i = 0; i < nodes.snapshotLength; i++)
					{
					var node = nodes.snapshotItem(i);
					var cName = this.Str.Trim(node.innerHTML);
					var cID = citiesIDs[cName];
					
					var tr = node.parentNode;
					var tds = tr.getElementsByTagName("td");
					//var tds = tr.childNodes;
					var citizensProd = this.Str.To_Integer(tds[3].innerHTML);
					
					var city = getCity(cID); 
					
					if (city.buildings["townHall"] == undefined) city.buildings["townHall"] = {};
					
					city.buildings["townHall"].citizensProd  = citizensProd;
					this.Log.Add('['+cName+'] (from Finances): citizensProd='+citizensProd);
					}
				
				// 4. Calc shared upkeep for each cities
				for (CityId in Cities)
					{
					if (Cities[CityId].own != true) continue;
					var city = getCity(CityId);
					var population = getArrValue(city.buildings['townHall'], 'population', '?');
					
					if (population != '?')
						{
						var upkeep = Math.ceil(((overallUpkeep*parseInt(population)) / overallPop)-0.6);
						city.buildings["townHall"].upkeep = upkeep;
						this.Log.Add('['+Cities[CityId].name+'] (from Finances): upkeep='+upkeep);
						
						// 5. Calc new income
						var citizensProd = getArrValue(city.buildings['townHall'], 'citizensProd', '?');
						if (citizensProd != '?')
							{
							var incomegold = citizensProd - upkeep;
							city.buildings["townHall"].incomegold = incomegold;
							this.Log.Add('['+Cities[CityId].name+'] (from Finances): incomegold='+incomegold);
							}
						}
					}
				}
			}
		}
	else if (this.Ikariam.Is_Version_033x() == true)
		{
		// Too late to support it, sorry
		}
	else
		{
		var citiesIDs = {};
		var res = this.DOM.Get_Nodes("//select[@id='citySelect']/option");
		for(var i = 0; i < res.snapshotLength; i++)
		  {
		  var n = res.snapshotItem(i);
		  var cName = this.Ikariam.Trim_Coords(n.innerHTML);
		  citiesIDs[cName] = parseInt(n.value);
		  }
		  
		var nodes = this.DOM.Get_Nodes("//table[@id='balance']//td[@class='city']");
		for (var i = 0; i < nodes.snapshotLength; i++)
			{
			var node = nodes.snapshotItem(i);
			var cName = this.Str.Trim(node.innerHTML);
			var cID = citiesIDs[cName];
			
			var tr = node.parentNode;
			var tds = tr.getElementsByTagName("td");
			//var tds = tr.childNodes;
			var incomegold = this.Str.To_Integer(tds[3].innerHTML);
			
			var city = getCity(cID); 
			if (city.buildings["townHall"] == undefined) city.buildings["townHall"] = {};
			city.buildings["townHall"].incomegold  = incomegold;
			}
		}
		
	config.financestime = this.StartTime;
	};
	
EmpireBoard.ViewIsCity = function()
	{
	
	};
	
EmpireBoard.ViewIsBuildingTemple = function()
	{
	var _self = this;
	
	function reportTemple()
		{
		setViewRqTime('finances');
		_self.DB.Save();
		}
	
	var n = document.getElementById("inputWorkersSubmit");
	n.addEventListener("click", reportTemple, false);
	
	var city = getCity(city_idmainView);
	
	var n = document.getElementById("valuePriests");
	city.buildings["temple"].priests = this.Str.To_Integer(n.textContent);
	this.Log.Add('valuePriests = '+city.buildings["temple"].priests);
	};
	
EmpireBoard.ViewIsBuildingAcademy = function()
	{
	var _self = this;
	
	function reportAcademy()
		{
		setViewRqTime('finances');
		_self.DB.Save();
		}
	
	var n = document.getElementById("inputWorkersSubmit");
	n.addEventListener("click", reportAcademy, false);
	
	var city = getCity(city_idmainView);
	
	var n = document.getElementById("valueResearch");
	city.buildings["academy"].Research = this.Str.To_Integer(n.textContent);
	this.Log.Add('valueResearch = '+city.buildings["academy"].Research);
	
	var n = document.getElementById("valueWorkers");
	city.buildings["academy"].scientists = this.Str.To_Integer(n.textContent);
	this.Log.Add('valueWorkers(scientists) = '+city.buildings["academy"].scientists);
	};
	
EmpireBoard.ViewIsBuildingBranchOffice = function()
	{
	var city = getCity(city_idmainView);
	
	var reservedGold =  document.getElementById("reservedGold");
	if (reservedGold != null)
		{
		city.buildings["branchOffice"].reservedGold = this.Str.To_Integer(reservedGold.innerHTML, 0);
		}
	else
		{
		city.buildings["branchOffice"].reservedGold = 0;
		}
		
	// Fetch wood offer
	city.tradewood = 0;
	var selectElt = document.getElementById('resourceTradeType');
	if ((selectElt != null) && (selectElt.value == '444'))
		{
		var inputElt = document.getElementById('resource');
		if ((inputElt != null) && (inputElt.value != '') && (inputElt.value != '0'))
			{
			city.tradewood = this.Str.To_Integer(inputElt.value, 0);
			}
		}
		
	// Fetch wine offer
	city.tradewine = 0;
	var selectElt = document.getElementById('tradegood1TradeType');
	if ((selectElt != null) && (selectElt.value == '444'))
		{
		var inputElt = document.getElementById('tradegood1');
		if ((inputElt != null) && (inputElt.value != '') && (inputElt.value != '0'))
			{
			city.tradewine = this.Str.To_Integer(inputElt.value, 0);
			}
		}
		
	// Fetch marble offer
	city.trademarble = 0;
	var selectElt = document.getElementById('tradegood2TradeType');
	if ((selectElt != null) && (selectElt.value == '444'))
		{
		var inputElt = document.getElementById('tradegood2');
		if ((inputElt != null) && (inputElt.value != '') && (inputElt.value != '0'))
			{
			city.trademarble = this.Str.To_Integer(inputElt.value, 0);
			}
		}
		
	// Fetch crystal offer
	city.tradeglass = 0;
	var selectElt = document.getElementById('tradegood3TradeType');
	if ((selectElt != null) && (selectElt.value == '444'))
		{
		var inputElt = document.getElementById('tradegood3');
		if ((inputElt != null) && (inputElt.value != '') && (inputElt.value != '0'))
			{
			city.tradeglass = this.Str.To_Integer(inputElt.value, 0);
			}
		}
		
	// Fetch sulfur offer
	city.tradesulfur = 0;
	var selectElt = document.getElementById('tradegood4TradeType');
	if ((selectElt != null) && (selectElt.value == '444'))
		{
		var inputElt = document.getElementById('tradegood4');
		if ((inputElt != null) && (inputElt.value != '') && (inputElt.value != '0'))
			{
			city.tradesulfur = this.Str.To_Integer(inputElt.value, 0);
			}
		}
	};
	
EmpireBoard.ViewIsIslandResource = function()
	{
	var cityID = 0;
		
	cityID = this.DOM.Get_First_Node_Value("//form[@id='setWorkers']//input[@name='cityId']",0);
	if (cityID > 0)
		{
		var city = getCity(cityID);
		
		if (city.buildings["townHall"] == undefined) city.buildings["townHall"] = {};
		
		// Fetch wood workers
		var woodworkers = 0;
		var valueWorkers = document.getElementById("valueWorkers");
		if (valueWorkers != null) 
			{
			woodworkers = Number(valueWorkers.textContent);
			}
		
		city.buildings["townHall"].woodworkers = woodworkers;
		this.Log.Add('woodworkers (from Resource)='+woodworkers);
		}
	
	var _self = this;
	
	function reportResource()
		{
		setViewRqTime('finances');
		_self.DB.Save();
		}
	
	var n = document.getElementById("inputWorkersSubmit");
	if (n != null) 
		{
		n.addEventListener("click", reportResource, false);
		}
	};

EmpireBoard.ViewIsIslandTradeGood = function()
	{
	var cityID = 0;
		
	cityID = this.DOM.Get_First_Node_Value("//form[@id='setWorkers']//input[@name='cityId']",0);
	if (cityID > 0)
		{
		var city = getCity(cityID);
		
		if (city.buildings["townHall"] == undefined) city.buildings["townHall"] = {};
		
		// Fetch wood workers
		var specialworkers = 0;
		var valueWorkers = document.getElementById("valueWorkers");
		if (valueWorkers != null) 
			{
			specialworkers = Number(valueWorkers.textContent);
			}
		
		city.buildings["townHall"].specialworkers = specialworkers;
		this.Log.Add('specialworkers (from Resource)='+specialworkers);
		}
	
	var _self = this;
	
	function reportTradegood()
		{
		setViewRqTime('finances');
		_self.DB.Save();
		}
	
	var n = document.getElementById("inputWorkersSubmit");
	if (n != null)
		{
		n.addEventListener("click", reportTradegood, false);
		}
	};
		
EmpireBoard.ViewIsBuildingTavern = function()
	{
	var city = getCity(city_idmainView);
	
	// Old method stop to work...
	/*
	var n = document.getElementById("wineAmount");
	city.wineUsageId = n.selectedIndex;
	city.wineUsage = tavernWineUsage[n.selectedIndex] - getSavedWine();
	*/
	// New method Thank  to TorfDrottel 
	var iniValue = 0;
	var scripts = document.getElementsByTagName("script");
	for (var j = 0; j < scripts.length; j++)
		{
		var nScript = scripts[j];
		var sCode = nScript.innerHTML;
		if (sCode.indexOf('create_slider') > 0)
			{
			iniValue = parseInt(/iniValue : (\d+)/.exec(sCode)[1])
			}
		}
	city.wineUsageId = iniValue;
	
	var savedWine = 0;
	if (unsafeWindow && unsafeWindow.savedWine)
		{
		savedWine = unsafeWindow.savedWine[iniValue];
		}
	if ((savedWine == '&nbsp;') || (savedWine == ''))
		{
		savedWine = 0;
		}
	savedWine = Math.round(parseFloat(savedWine));
	var wineUsage = tavernWineUsage[iniValue] - savedWine;
	city.wineUsage = wineUsage;
	
	this.Log.Add('Tavern: iniValue= '+iniValue+', savedWine='+savedWine+', wineUsage='+wineUsage);
	
	var _self = this;

	function storeWineUsage()
		{
		try
			{
			var city_id = _self.DOM.Get_First_Node_Value("//form[@id='wineAssignForm']/input[@type='hidden' and @name='id']");
			var city = getCity(city_id);
			var n = document.getElementById("wineAmount");
			
			var iniValue = n.selectedIndex;
			if (city.wineUsageId != iniValue)
				{
				setViewRqTime('townHall', city_id);
				}
			city.wineUsageId = iniValue;
			
			var savedWine = getSavedWine();
			var wineUsage = tavernWineUsage[iniValue] - savedWine;
			city.wineUsage = wineUsage;
			
			_self.Log.Add('Tavern: iniValue= '+iniValue+', savedWine='+savedWine+', wineUsage='+wineUsage);
			
			_self.DB.Save();
			}
		catch (e)
			{
			}
		}
		
	// Fix for v3
	function getSavedWine() 
		{
		try 
			{
			var n = document.getElementById("savedWine");
			if ((n.innerHTML != '&nbsp;') && (_self.Str.Trim(n.innerHTML) != ''))
				{
				return Math.round(parseFloat(n.innerHTML));
				}
			else return 0;
			}
		catch (e) 
			{
			return 0;
			}
		}
	
	// Soon deprecated
	var n = this.DOM.Get_First_Node("//form[@id='wineAssignForm']//*[@type='submit']");
	n.addEventListener("click", storeWineUsage, false);
	};

EmpireBoard.ViewIsBuildingTownHall = function()
	{
	var city = getCity(city_idmainView);
	
	if (city.buildings["townHall"] == undefined) city.buildings["townHall"] = {};

	var population = 0;
	population = Number(this.DOM.Get_First_Node_TextContent("//li[contains(@class, 'space')]/span[contains(@class, 'occupied')]", "0"));
	city.buildings["townHall"].population = population;
	//city.population = population; // Soon deprecated
	
	// May use happiness than growth...
	city.buildings["townHall"].growth = this.Str.To_Float(this.DOM.Get_First_Node_TextContent("//li[contains(@class, 'growth')]/span[@class='value']", "0"),'?',this.Ikariam.LocalizationStrings('decimalPoint'));
	this.Log.Add('Growth (from TownHall)='+city.buildings["townHall"].growth);
	
	city.buildings["townHall"].happiness  = Number(this.DOM.Get_First_Node_TextContent("//div[contains(@class, 'happiness')]/div[@class='value']", "0")) + city.buildings["townHall"].population;

	city.buildings["townHall"].bonusspace = Number(this.DOM.Get_First_Node_TextContent("//li[contains(@class, 'space')]/span[contains(@class, 'total')]", "0")) - townHallSpaces[getBuildingLevel(city_idmainView, 'townHall', 1, 0)];
	
	// Fetch citizens
	var citizens = 0;
	citizens = Number(this.DOM.Get_First_Node_TextContent("//div[contains(@class, 'citizens')]//span[@class='count']", "0"));
	city.buildings["townHall"].citizens = citizens;
	this.Log.Add('citizens (from TownHall)='+citizens);
	
	// Fetch wood workers
	var woodworkers = 0;
	woodworkers = Number(this.DOM.Get_First_Node_TextContent("//div[contains(@class, 'woodworkers')]//span[@class='count']", "0"));
	city.buildings["townHall"].woodworkers = woodworkers;
	this.Log.Add('woodworkers (from TownHall)='+woodworkers);
	
	// Fetch good workers
	var specialworkers = 0;
	specialworkers = Number(this.DOM.Get_First_Node_TextContent("//div[contains(@class, 'specialworkers')]//span[@class='count']", "0"));
	city.buildings["townHall"].specialworkers = specialworkers;
	this.Log.Add('specialworkers (from TownHall)='+specialworkers);
	
	// Fetch scientist
	var scientists = 0;
	scientists = Number(this.DOM.Get_First_Node_TextContent("//div[contains(@class, 'scientists')]//span[@class='count']", "0"));
	if ((scientists > 0) || (city.buildings["academy"] != undefined))
		{
		if (city.buildings["academy"] == undefined) city.buildings["academy"] = {};
		city.buildings["academy"].scientists = scientists;
		}
	this.Log.Add('scientists (from TownHall)='+scientists);
	
	// Fetch priests
	if (this.Ikariam.Is_Version_032x() == true)
		{
		var priests = 0;
		priests = Number(this.DOM.Get_First_Node_TextContent("//div[contains(@class, 'priests')]//span[@class='count']", "0"));
		if ((priests > 0) || (city.buildings["temple"] != undefined))
			{
			if (city.buildings["temple"] == undefined) city.buildings["temple"] = {};
			city.buildings["temple"].priests = priests;
			}
		this.Log.Add('priests (from TownHall)='+priests);
		}

	var citizensProd = 0;
	citizensProd = this.Str.To_Integer(this.DOM.Get_First_Node_TextContent("//div[@class='citizens']/span[@class='production']", "0"),0);
	city.buildings["townHall"].citizensProd = citizensProd;
	this.Log.Add('citizensProd (from TownHall)='+citizensProd);
	
	if (this.Ikariam.Is_Version_035x() == true)
		{
		
		}
	else
		{
		var incomegold = 0;
		incomegold = Number(this.DOM.Get_First_Node_TextContent("//li[contains(@class, 'incomegold')]/span[@class='value']", "0"));
		city.buildings["townHall"].incomegold = incomegold;
		this.Log.Add('IncomeGold (from TownHall)='+incomegold);

		var upkeep = citizensProd - incomegold;
		city.buildings["townHall"].upkeep = upkeep;
		this.Log.Add('Upkeep (from TownHall)='+upkeep);
		}
	};
	
EmpireBoard.ViewIsResearchAdvisor = function()
	{
	var _self = this;
	
	function reportResearch()
		{
		setViewRqTime('researchOverview');
		_self.DB.Save();
		}
	
	var rButtons = this.DOM.Get_Nodes("//ul[@class='researchTypes']//div[@class='researchButton']//a[contains(@class, 'build')]");
	this.Log.Add("Research buttons: "+rButtons.snapshotLength);
	if (rButtons.snapshotLength > 0)
		{
		for (var i=0; i < rButtons.snapshotLength; i++)
			{
			var rButton = rButtons.snapshotItem(i);
			//rButton.href='';
			rButton.addEventListener("click", reportResearch, false);
			}
		}
	};

// Thank to matteo466
EmpireBoard.ViewIsResearchOverview = function()
	{
	this.Log.Add('Fetch discovered research...');
	
	config["research"] = {};
	
	var LIs = this.DOM.Get_Nodes("//div[@id='mainview']//div[contains(@class, 'content')]//li[@class='explored']");
	this.Log.Add("Research explored: "+LIs.snapshotLength);
	if (LIs.snapshotLength > 0)
		{
		for (var i=0; i < LIs.snapshotLength; i++)
			{
			var researchLI = LIs.snapshotItem(i);
			var researchA = researchLI.getElementsByTagName("a")[0];
			var resReg = /[\?&]{1}researchId=([0-9]+)&?/i.exec(researchA.href);
			if (resReg != null)
				{
				var researchID = parseInt(resReg[1]);
				var researchLevel = this.Str.To_Integer(researchA.textContent.replace(/\-/g, ""),1);
				
				this.Log.Add("Found research: "+researchID+', level '+researchLevel);
				
				config["research"][researchID] = {};
				config["research"][researchID].Explored = true;
				config["research"][researchID].Level = researchLevel;
				}
			}
		}
	
	function isExplored(researchID)
		{
		if ((config["research"][researchID] != undefined) && (config["research"][researchID].Explored == true))
			return true;
		else
			return false;
		}
	
	var FleetUpkeepBonus = 0;
	if (isExplored(1020)) FleetUpkeepBonus += 2;
	if (isExplored(1050)) FleetUpkeepBonus += 4;
	if (isExplored(1090)) FleetUpkeepBonus += 8;
	if (isExplored(1999))
		{
		FleetUpkeepBonus += 2*config["research"][1999].Level;
		}
	this.Log.Add("FleetUpkeepBonus: "+FleetUpkeepBonus);
	config["research"].FleetUpkeepBonus = FleetUpkeepBonus;
	
	var ArmyUpkeepBonus = 0;
	if (isExplored(4020)) ArmyUpkeepBonus += 2;
	if (isExplored(4050)) ArmyUpkeepBonus += 4;
	if (isExplored(4090)) ArmyUpkeepBonus += 8;
	if (isExplored(4999))
		{
		ArmyUpkeepBonus += 2*config["research"][4999].Level;
		}
	this.Log.Add("ArmyUpkeepBonus: "+ArmyUpkeepBonus);
	config["research"].ArmyUpkeepBonus = ArmyUpkeepBonus;
	
	var ResearchCost = 6;
	if (isExplored(3110)) ResearchCost -= 3;
	this.Log.Add("ResearchCost: "+ResearchCost);
	config["research"].ResearchCost = ResearchCost;
	
	var ResearchBonus = 0;
	if (isExplored(3020)) ResearchBonus += 2;
	if (isExplored(3050)) ResearchBonus += 4;
	if (isExplored(3090)) ResearchBonus += 8;
	if (isExplored(3999))
		{
		ResearchBonus += 2*config["research"][3999].Level;
		}
	this.Log.Add("ResearchBonus: "+ResearchBonus);
	config["research"].ResearchBonus = ResearchBonus;
	
	config["research"].uptime = this.StartTime;
	};
	
EmpireBoard.ViewIsPremium = function()
	{
	config["premium"] = {};
	
	var TRs = this.DOM.Get_Nodes("//div[@id='premiumOffers']//table[contains(@class, 'TableHoriMax')]//tr");
	this.Log.Add("premiumOffers rows: "+TRs.snapshotLength);
	
	// fetch account (Plus features) remaining time
	var TrNo = 2;
	var accountPlus = TRs.snapshotItem(TrNo).getElementsByTagName("td")[0];
	if (this.DOM.Has_ClassName(accountPlus,'active') == true)
		{
		var remainingTime = 0;
		var remainingText = accountPlus.textContent;
		var regExp = new RegExp("([0-9])\\s+([a-z])", "ig");
		var RegExpRes = regExp.exec(remainingText);
		if (RegExpRes != null)
			{
			var timeValue = parseInt(RegExpRes[1]);
			var timeUnit = RegExpRes[2];
			
			if (timeUnit == this.Ikariam.LocalizationStrings('day','timeunits','short'))
				{
				remainingTime = timeValue*24*60*60*1000;
				}
			else if (timeUnit == this.Ikariam.LocalizationStrings('hour','timeunits','short'))
				{
				remainingTime = timeValue*60*60*1000;
				}
			else if (timeUnit == this.Ikariam.LocalizationStrings('minute','timeunits','short'))
				{
				remainingTime = timeValue*60*1000;
				}
			else if (timeUnit == this.Ikariam.LocalizationStrings('second','timeunits','short'))
				{
				remainingTime = timeValue*1000;
				}
			else
				{
				remainingTime = 24*60*60*1000;
				}
			}
		else
			{
			remainingTime = 24*60*60*1000;
			}
		this.Log.Add("accountPlus: remainingTime="+remainingTime+", timeValue="+timeValue+", timeUnit="+timeUnit);
		config["premium"].accountPlus = this.StartTime + remainingTime;
		}
	
	// fetch savecapacityBonus remaining time
	var TrNo = 20;
	var savecapacityBonus = TRs.snapshotItem(TrNo).getElementsByTagName("td")[0];
	if (this.DOM.Has_ClassName(savecapacityBonus,'active') == true)
		{
		var remainingTime = 0;
		var remainingText = savecapacityBonus.textContent;
		var regExp = new RegExp("([0-9])\\s+([a-z])", "ig");
		var RegExpRes = regExp.exec(remainingText);
		if (RegExpRes != null)
			{
			var timeValue = parseInt(RegExpRes[1]);
			var timeUnit = RegExpRes[2];
			
			if (timeUnit == this.Ikariam.LocalizationStrings('day','timeunits','short'))
				{
				remainingTime = timeValue*24*60*60*1000;
				}
			else if (timeUnit == this.Ikariam.LocalizationStrings('hour','timeunits','short'))
				{
				remainingTime = timeValue*60*60*1000;
				}
			else if (timeUnit == this.Ikariam.LocalizationStrings('minute','timeunits','short'))
				{
				remainingTime = timeValue*60*1000;
				}
			else if (timeUnit == this.Ikariam.LocalizationStrings('second','timeunits','short'))
				{
				remainingTime = timeValue*1000;
				}
			else
				{
				remainingTime = 24*60*60*1000;
				}
			}
		else
			{
			remainingTime = 24*60*60*1000;
			}
		this.Log.Add("savecapacityBonus: remainingTime="+remainingTime+", timeValue="+timeValue+", timeUnit="+timeUnit);
		config["premium"].savecapacityBonus = this.StartTime + remainingTime;
		}
	
	// fetch storagecapacityBonus remaining time
	var TrNo = 23;
	var storagecapacityBonus = TRs.snapshotItem(TrNo).getElementsByTagName("td")[0];
	if (this.DOM.Has_ClassName(storagecapacityBonus,'active') == true)
		{
		var remainingTime = 0;
		var remainingText = storagecapacityBonus.textContent;
		var regExp = new RegExp("([0-9])\\s+([a-z])", "ig");
		var RegExpRes = regExp.exec(remainingText);
		if (RegExpRes != null)
			{
			var timeValue = parseInt(RegExpRes[1]);
			var timeUnit = RegExpRes[2];
			
			if (timeUnit == this.Ikariam.LocalizationStrings('day','timeunits','short'))
				{
				remainingTime = timeValue*24*60*60*1000;
				}
			else if (timeUnit == this.Ikariam.LocalizationStrings('hour','timeunits','short'))
				{
				remainingTime = timeValue*60*60*1000;
				}
			else if (timeUnit == this.Ikariam.LocalizationStrings('minute','timeunits','short'))
				{
				remainingTime = timeValue*60*1000;
				}
			else if (timeUnit == this.Ikariam.LocalizationStrings('second','timeunits','short'))
				{
				remainingTime = timeValue*1000;
				}
			else
				{
				remainingTime = 24*60*60*1000;
				}
			}
		else
			{
			remainingTime = 24*60*60*1000;
			}
		this.Log.Add("storagecapacityBonus: remainingTime="+remainingTime+", timeValue="+timeValue+", timeUnit="+timeUnit);
		config["premium"].storagecapacityBonus = this.StartTime + remainingTime;
		}
	};
	
EmpireBoard.ViewIsActionTransport = function()
	{
	// Todo
	};
	
EmpireBoard.ViewIsActionDeployment = function()
	{
	var self = this;
	
	var dSubmit = this.DOM.Get_First_Node("//form[@id='deploymentForm']//input[@type='submit']");
	dSubmit.addEventListener("click", function(e) { self.Handlers.Deployment_Submit_Event(e); }, false);
	};
	
EmpireBoard.ViewIsActionPlunder = function()
	{
	// Todo
	};
	
EmpireBoard.ViewIsActionBlockade = function()
	{
	// Todo
	};
	
EmpireBoard.ViewIsActionOccupy = function()
	{
	// Todo
	};
	
EmpireBoard.ViewIsActionDefendCity = function()
	{
	// Todo
	};
	
EmpireBoard.ViewIsActionDefendPort = function()
	{
	// Todo
	};
	
EmpireBoard.ViewIsMerchantNavy = function()
	{
	var _self = this;
	var MerchantTimes = {};
	this.Ikariam.Fetch_MerchantNavy_Boxes(this.DB.MerchantBoxes, true);
	this.Ikariam.Fetch_TimeCounters(MerchantTimes,'getCountdown');
	
	config["transports"] = {};
	
	function addTransport(cityID, transportID, endTime)
		{
		if (config["transports"][cityID] == undefined) config["transports"][cityID] = {};
		if (config["transports"][cityID][transportID] == undefined) config["transports"][cityID][transportID] = {};
		config["transports"][cityID][transportID].endTime = endTime;
		
		_self.Log.Add('Transport['+transportID+'] from oCityId='+cityID+' while '+_self.Str.FormatRemainingTime(endTime-_self.StartTime));
		}
	
	var boxId;
	for (boxId in this.DB.MerchantBoxes)
		{
		if (this.DB.MerchantBoxes[boxId].missions != undefined)
			{
			var missionId;
			for (missionId in this.DB.MerchantBoxes[boxId].missions)
				{
				var oCityId = this.DB.MerchantBoxes[boxId].missions[missionId].oCityId;
				if (oCityId > 0)
					{
					var endTime = 0;
					
					var ETA = this.DB.MerchantBoxes[boxId].missions[missionId].ETA;
					var ETAtime = 0;
					if ((ETA != '') && (MerchantTimes[ETA] != undefined))
						{
						ETAtime = this.StartTime + (MerchantTimes[ETA].enddate - MerchantTimes[ETA].currentdate);
						}
					if (ETAtime > 0) endTime = ETAtime;
						
					var RETtime = 0;
					var RET = this.DB.MerchantBoxes[boxId].missions[missionId].RET;
					if ((RET != '') && (MerchantTimes[RET] != undefined))
						{
						RETtime = this.StartTime + (MerchantTimes[RET].enddate - MerchantTimes[RET].currentdate);
						}
					if ((RETtime > 0) && (RETtime > endTime)) endTime = RETtime;
					
					if (endTime <= 0)
						endTime = this.StartTime + (1 * 20 * 60 * 1000);
					
					addTransport(oCityId, missionId, endTime);
					}
				}
			}
		}
	};
	
EmpireBoard.ViewIsMilitaryMovements = function()
	{
	config["movements"] = {};
	function addMovement(cityID, movementID, FleetMovement)
		{
		if (config["movements"][cityID] == undefined) config["movements"][cityID] = {};
		if (config["movements"][cityID][movementID] == undefined) config["movements"][cityID][movementID] = {};

		config["movements"][cityID][movementID] = FleetMovement;
		config["movements"][cityID][movementID].endTime = FleetMovement.time;
		}
		
	config["attacks"] = {};
	function addAttacks(cityID, movementID, FleetMovement)
		{
		if (config["attacks"][cityID] == undefined) config["attacks"][cityID] = {};
		if (config["attacks"][cityID][movementID] == undefined) config["attacks"][cityID][movementID] = {};

		config["attacks"][cityID][movementID] = FleetMovement;
		config["attacks"][cityID][movementID].endTime = FleetMovement.time;
		}
	
	this.Ikariam.Fetch_FleetMovements(this.DB.FleetMovements);
	
	var resMi = this.DOM.Get_Nodes("//div[@id='fleetMovements']//table[contains(@class, 'locationEvents')]/tbody/tr/td/img[contains(@src, 'mission_')]");
	if (resMi.snapshotLength > 0)
		{
		for (var i=0; i < resMi.snapshotLength; i++)
			{
			var tr = resMi.snapshotItem(i).parentNode.parentNode;
			var tds = tr.getElementsByTagName("td");
			//var tds = tr.childNodes;
				
			var fleetId = tds[1].id;
			
			if ((fleetId != '') && (this.DB.FleetMovements[fleetId] != undefined))
				{
				var FleetMovement = this.DB.FleetMovements[fleetId];
				var toOwn = false;
				if ((this.DB.CurrentCities[FleetMovement.tCityId] != undefined) && (FleetMovement.tCityId != FleetMovement.oCityId) && (this.DB.CurrentCities[FleetMovement.tCityId].own == true))
					{
					toOwn = true;
					}
				
				// Values: deployarmy, deployfleet, plunder, blockade, defend, defend_port, trade, transport, occupy
				if (FleetMovement.hostile == true)
					{
					addAttacks(FleetMovement.tCityId, fleetId, FleetMovement);
					}
				else if (FleetMovement.own == true)
					{
					if (FleetMovement.mission == 'trade')
						{
						// Not military movement
						}
					else if (FleetMovement.mission == 'transport')
						{
						// Not military movement
						if ((FleetMovement.hasAction == true) && (FleetMovement.hasGoods == true) && (FleetMovement.toLeft == false) && (FleetMovement.toRight == false) && (toOwn == true))
							{
							setViewRqTime('merchantNavy',0,FleetMovement.time);
							}
						}
					else if (FleetMovement.mission == 'deployarmy')
						{
						addMovement(FleetMovement.oCityId, fleetId, FleetMovement);
						
						if ((FleetMovement.toRight == true) && (toOwn == true))
							{
							this.Log.Add("Army "+fleetId+" will arrive to city["+FleetMovement.tCityId+"]");
							setViewRqTime('cityMilitary-army', FleetMovement.tCityId, FleetMovement.time);
							}
						else if (FleetMovement.toLeft == true)
							{
							this.Log.Add("Army "+fleetId+" come back to city["+FleetMovement.oCityId+"]");
							setViewRqTime('cityMilitary-army', FleetMovement.oCityId, FleetMovement.time);
							}
						}
					else if (FleetMovement.mission == 'deployfleet')
						{
						addMovement(FleetMovement.oCityId, fleetId, FleetMovement);
						
						if ((FleetMovement.toRight == true) && (toOwn == true))
							{
							this.Log.Add("Fleet "+fleetId+" will arrive to city["+FleetMovement.tCityId+"]");
							setViewRqTime('cityMilitary-fleet', FleetMovement.tCityId, FleetMovement.time);
							}
						else if (FleetMovement.toLeft == true)
							{
							this.Log.Add("Fleet "+fleetId+" come back to city["+FleetMovement.oCityId+"]");
							setViewRqTime('cityMilitary-fleet', FleetMovement.oCityId, FleetMovement.time);
							}
						}
					else if (FleetMovement.mission == 'plunder')
						{
						addMovement(FleetMovement.oCityId, fleetId, FleetMovement);
						
						if ((FleetMovement.hasGoods == true) && (FleetMovement.toLeft == false) && (FleetMovement.toRight == false))
							{
							setViewRqTime('merchantNavy',0,FleetMovement.time);
							}
						}
					else if (FleetMovement.mission == 'blockade')
						{
						addMovement(FleetMovement.oCityId, fleetId, FleetMovement);
						}
					else
						{
						addMovement(FleetMovement.oCityId, fleetId, FleetMovement);
						}
					}
				else
					{
					if (FleetMovement.mission == 'trade')
						{
						if ((toOwn == true) && (FleetMovement.toRight == true))
							{
							this.Log.Add("Foreign trade "+fleetId+" arrive to city["+FleetMovement.tCityId+"] "+this.Str.FormatRemainingTime(FleetMovement.time - EmpireBoard.StartTime));
							setViewRqTime('branchOffice', FleetMovement.tCityId, FleetMovement.time);
							}
						}
					else if (FleetMovement.mission == 'transport')
						{
						if ((toOwn == true) && (FleetMovement.toRight == true))
							{
							this.Log.Add("Foreign transport "+fleetId+" arrive to city["+FleetMovement.tCityId+"] "+this.Str.FormatRemainingTime(FleetMovement.time - EmpireBoard.StartTime));
							setViewRqTime('', FleetMovement.tCityId, FleetMovement.time);
							}
						}
					}
				}
			}
		}
		
	config.mAMMtime = this.StartTime;
	};
	
EmpireBoard.ViewIsBuildingWorkshop = function()
	{
	var scripts = document.getElementsByTagName("script");
	var found = false;
	var sCode = '';
	for (var j = 0; j < scripts.length; j++)
		{
		// search upgradeCountDown
		var nScript = scripts[j];
		sCode = nScript.innerHTML;
		if (sCode.indexOf('upgradeCountdown') >= 0)
			{
			found = true;
			break;
			}
		}
	if (found == true)
		{
		// buildings under upgrading
		var enddate = 0;
		var currentdate = 0;
		if (/enddate[^0-9]*([0-9]+)/.exec(sCode) != null)
			{
			enddate = parseFloat(RegExp.$1) * 1000; 
			}
		if (/currentdate[^0-9]*([0-9]+)/.exec(sCode) != null)
			{
			currentdate = parseFloat(RegExp.$1) * 1000; 
			}
		if (enddate != 0 && currentdate != 0)
			{
			setViewRqTime('workshop', city_idmainView, this.StartTime + (enddate - currentdate), true);
			this.Log.Add('Workshop upgrade remaining time: '+enddate+' - '+currentdate+' = '+(enddate-currentdate)/1000+'s');
			}
		}
	};
	
EmpireBoard.DB =
	{
	_Parent:			 null,
	Prefix:				 '',
	CurrentCities:		 {},
	FleetMovements:		 {},
	MerchantBoxes:		 {},
	Options:			 {}
	};

EmpireBoard.DB.Init = function(parent, host)
	{
	this._Parent = parent;
	if (host == undefined) host = this._Parent.Ikariam.Host();
	
	var prefix = host;
	prefix = prefix.replace('.ikariam.', '-');
	prefix = prefix.replace('.', '-');
	this.Prefix = prefix;
	};
		
EmpireBoard.DB.Serialize = function(data)
	{
	return uneval(data);
	};

EmpireBoard.DB.UnSerialize = function(data)
	{
	return eval(data);
	};
	
function getVar(varname, vardefault) {
  var res = GM_getValue(EmpireBoard.Ikariam.Host()+varname);
  if (res == undefined) {
    return vardefault;
  }
  return res;
}

function setVar(varname, varvalue) {
  GM_setValue(EmpireBoard.Ikariam.Host()+varname, varvalue);
}

EmpireBoard.DB.Load = function()
	{
	config = this.UnSerialize(getVar("config", ""));
	if (config == null || config == undefined || config == "" || ("".config == "NaN"))
		{
		config = new Object();
		}
	
	// Set dbversion for migrate agent
	if (config["dbversion"] == undefined)		 config["dbversion"]	 = this._Parent.Version-1;
	
	// Check if main arrays exists
	if (config["unitnames"] == undefined)		 config["unitnames"]	 = {};
	if (config["upkeeps"] == undefined)			 config["upkeeps"]		 = {};
	if (config["arrivinggoods"] == undefined)	 config["arrivinggoods"] = {};
	if (config["movements"] == undefined)		 config["movements"]	 = {};
	if (config["attacks"] == undefined)			 config["attacks"]		 = {};
	if (config["transports"] == undefined)		 config["transports"]	 = {};
	if (config["research"] == undefined)		 config["research"]		 = {};
	
	if (config["dbversion"] < this._Parent.Version)
		{
		this.MigrateAgent();
		}
	};
	
EmpireBoard.DB.MigrateAgent = function()
	{
	this._Parent.Log.Add('Apply Migrate Agent to DB v. '+config["dbversion"]);
	
	config["dbversion"] = this._Parent.Version;
	};
	
EmpireBoard.DB.GarbageCollector = function()
	{
	var ConfigIds = '';
	var ConfigId;
	for (ConfigId in config)
		{
		var toDelete = false;
		switch(ConfigId)
			{
			case 'unitnames':
			case 'upkeeps':
			case 'movements':
			case 'attacks':
			case 'transports':
			case 'research':
			case 'premium':
			case 'gold':
			case 'merchantNavyrqtime':
			case 'merchantNavytime':
			case 'financestime':
			case 'financesrqtime':
			case 'mAMMtime':
			case 'mAMMrqtime':
				toDelete = false;
				break;
			
			case 'arrivinggoods':
				var oCityId;
				for (oCityId in config['arrivinggoods'])
					{
					if (this.CurrentCities[oCityId] == undefined)
						{
						if (delete config['arrivinggoods'][oCityId])
							this._Parent.Log.Add('Garbage collector has removed arrivinggoods of unkown city['+oCityId+']');
						}
					}
				toDelete = false;
				break;
	
			case 'cfg':
				toDelete = true;
				break;
			
			default:
				// Check if old city
				var CityId = this._Parent.Str.To_Integer(ConfigId,'NaN');
				if (CityId != 'NaN')
					{
					if (this.CurrentCities[CityId] == undefined)
						{
						toDelete = true;
						}
					else
						{
						toDelete = false;
						var ConfigSubIds = '';
						var ConfigSubId;
						for (ConfigSubId in config[ConfigId])
							{
							var subToDelete = false;
							switch(ConfigSubId)
								{
								case 'crystal':
								case 'underConstruction':
								case 'population':
								case 'citizens':
									subToDelete = true;
									break
								
								default:
									break;
								}
							if (subToDelete == true)
								{
								if (delete config[ConfigId][ConfigSubId])
									ConfigSubIds += ' '+ConfigSubId;
								}
							}
						if (ConfigSubIds != '') this._Parent.Log.Add('Garbage collector has removed city['+ConfigId+'] properties:'+ConfigSubIds);
						}
					}
				break;
			}
		
		if (toDelete == true)
			{
			if (delete config[ConfigId])
				ConfigIds += ' '+ConfigId;
			}
		}
	
	if (ConfigIds != '') this._Parent.Log.Add('Garbage collector has removed array:'+ConfigIds);
	};

EmpireBoard.DB.Save = function()
	{
	setVar("config", this.Serialize(config));
	};

EmpireBoard.DB.Load_Options = function()
	{
	// Not used yet
	this.Options = this.UnSerialize(GM_getValue(this.Prefix+'.Opt', false)) || {};
	
	if (this.Options.Prefs == undefined)					 this.Options.Prefs = {};
	if (this.Options.Prefs.TABLE_RESOURCES == undefined)	 this.Options.Prefs.TABLE_RESOURCES = true;
	if (this.Options.Prefs.TABLE_BUILDINGS == undefined)	 this.Options.Prefs.TABLE_BUILDINGS = true;
	if (this.Options.Prefs.TABLE_ARMYFLEET == undefined)	 this.Options.Prefs.TABLE_ARMYFLEET = true;
	if (this.Options.Prefs.PROGRESS_BAR_MODE == undefined)	 this.Options.Prefs.PROGRESS_BAR_MODE = 'time';
	if (this.Options.Prefs.LANGUAGE == undefined)			 this.Options.Prefs.LANGUAGE = '';
	};

EmpireBoard.DB.Save_Options = function()
	{
	GM_setValue(this.Prefix+'.Opt', this.Serialize(this.Options));
	};
	
EmpireBoard.Renders =
	{
	_Parent:			 null
	};

EmpireBoard.Renders.Init = function(parent)
	{
	this._Parent = parent;
	};
	
function createLink(text, href, attrs)
	{
	return "<a href=\""+href+"\" "+attrs+">"+text+"</a>";
	}

EmpireBoard.Renders.Buildings_Table_Content = function()
	{
	var s = '';
	var Cities = this._Parent.DB.CurrentCities;
	
	// Array use to group buildings
	var orderedBuildings = this._Parent.Ikariam.BuildingsList();
	
	function getBuildingCount(city_id, name, defaultValue)
		{
		if (defaultValue == undefined) defaultValue = 0;
		var count = 0;
		var city = getCity(city_id);
		
		if ((city.buildings == undefined) || (city.buildings[name] == undefined))
			{
			if (name == 'townHall') count = 1;
			}
		else if (city.buildings[name].levels != undefined)
			{
			var p;
			for (p in city.buildings[name].levels)
				{
				count++;
				}
			}
		else if (city.underConstructionName == name)
			{
			count = 1;
			}
		
		if (count == 0) count = defaultValue;
		return count;
		}
	
	// Search buildings used
	var CityId;
	var buildingsCount = [];
	for (CityId in Cities)
		{
		if (Cities[CityId].own != true) continue;
		for (key in orderedBuildings)
			{
			var count = getBuildingCount(CityId, key, 0);
			if (buildingsCount[key] == undefined || buildingsCount[key] < count)
				{
				buildingsCount[key] = count;
				}
			}
		}
	
	s += "<table class='Overview Buildings'>";
	
	// Table header
	s += "<thead><tr><th class='city_name' nowrap>"+this._Parent.Intl.TT("cityName")+"</th>";
	s += "<th class='actions' nowrap>"+this.Buildings_HeaderIcons(current_city_id)+"</th>";
	var firstStyle = '';
	var buildsNum = 0;
	var lastTopic = '';
	for (key in orderedBuildings) 
		{
		if (buildingsCount[key] > 0)
			{
			var colspan = (buildingsCount[key] > 1) ? ' colspan='+buildingsCount[key] : '';
			if (lastTopic != orderedBuildings[key]) { firstStyle = "lf"; } else { firstStyle = ""; }
			s += "<th"+colspan+" building='"+key+"' class='"+firstStyle+" build_name build_name"+buildingsCount[key]+" "+key+"' nowrap>"+
				this._Parent.Intl.TT(key,'buildings_short')+
				"</th>";
			lastTopic = orderedBuildings[key];
			buildsNum++;
			}
		}
	if (buildsNum <= 1) s += "<th class='lf'></th><th></th><th></th><th></th><th></th><th></th>";
	s += "</tr></thead>";
	
	s += "<tbody>";
	
	function createLinkToCityView(city_id)
		{
		var rHTML = '';
		rHTML += '<a href="?view=city&cityId='+city_id+'" class="changeCity" cityid="'+city_id+'" title="View city"><img align="absmiddle" src="skin/layout/icon-city2.gif" /></a>';
		if (reportViewToSurvey('city', city_id) == '!')
			{
			rHTML += '<sup class=Red title="Require attention">!</sup>';
			}
		else
			{
			rHTML += '&nbsp;';
			}
		return rHTML;
		}

	function getBuildingLink(city_id, name, defaultValue, position)
		{
		if (defaultValue == undefined) defaultValue = '';
		if (position == undefined)
			{
			position = -1;
			if (name == 'townHall') position = 0;
			}
		var link = '';
		
		if (position == -1)
			{
			// will deprecated
			var city = getCity(city_id);
			link = getArrValue(city.buildings[name], "link", defaultValue);
			}
		else
			{
			link = '?view='+name+'&id='+city_id+'&position='+position;
			}
		
		if (link == '') link = defaultValue;
		return link;
		}

	var CityId;
	var i = 0;
	var odd = '';
	for (CityId in Cities)
		{
		if (Cities[CityId].own != true) continue;
		var city = getCity(CityId);
		
		var trclass = (parseInt(current_city_id) == parseInt(CityId)) ? "current" : "";
		s += "<tr class='"+odd+" "+trclass+"' cityid='"+CityId+"' islandid='"+city.island_id+"' coord='"+city.city_coord+"'>";
		
		var usedspaces = getCityBuildingsCount(CityId, 0);
		s += "<td class='city_name' nowrap>"+createLinkToChangeCity(Cities[CityId].name, CityId, i, (usedspaces > 0) ? 15-usedspaces : '', 'Green', 'Available free spaces')+"</td>";
		s += "<td class='actions' nowrap>"+createLinkToCityView(CityId)+"</td>";
		
		var firstStyle = '';
		var lastTopic = '';
		for (key in orderedBuildings)
			{
			if (buildingsCount[key] > 0)
				{
				if (lastTopic != orderedBuildings[key]) { firstStyle = "lf"; } else { firstStyle = ""; }
				
				var buildingCount = 0;
				if (city.buildings[key] != undefined)
					{
					if (city.buildings[key].levels == undefined)
						{
						// soon deprecated
						city.buildings[key].levels = {};
						var position = getBuildingPosition(parseInt(CityId), key, -1);
						var level = getBuildingLevel(parseInt(CityId), key, 0, position);
						city.buildings[key].levels[position] = level;
						}
					
					var position;
					for (position in city.buildings[key].levels)
						{
						var currentBuildingStyle = "";
						if ((key == this._Parent.Ikariam.View()) && (parseInt(CityId) == city_idmainView) && (position == city_positionmainView))
							{
							currentBuildingStyle = " Bold current";
							}

						var level = getBuildingLevel(parseInt(CityId), key, '-', position);
						if (level == undefined || level == "" || level == 0)
							{
							level = "-";
							}

						var link = getBuildingLink(parseInt(CityId), key, '-', position);

						if ((city.underConstructionName == key) && (city.underConstructionPosition == position))
							{
							if (level == "-") { level = 0; }
							var underConstructionTime = city.underConstructionTime;
							// deprecated
							//if (underConstructionTime == undefined)	underConstructionTime = city.underConstruction.split(",")[1];
							var sdate = smartDateFormat(underConstructionTime);
							if (underConstructionTime <= this._Parent.StartTime)
								{
								var levellink = level;
								if (link != "-")
									levellink = "<a href='" + link + "' class=\"changeCity Green Bold\" cityid="+CityId+">"+level+"</a>";
								levellink += '<sup class=Red title="Require attention">!</sup>';
								levelUpgrading = createTooltip(levellink, '<nobr>'+sdate+'</nobr>', this._Parent.Intl.TT("finishedBuilding")+':' );
								}
							else
								{
								var counter = "<font id='mytimecounter' counter='"+Math.round(underConstructionTime)+"' class='time_counter'>___:___:___</font>";
								var levellink =level+"&raquo;"+(level+1);
								if (link != "-")
									levellink = "<a href='" + link + "' class=\"changeCity Green Bold\" cityid="+CityId+">"+level+"&raquo;"+(level+1)+"</a>";
								if ((level > 0) && (reportViewToSurvey(key, CityId) == '!'))
									{
									levellink += '<sup class=Red title="Require attention">!</sup>';
									}
								else
									{
									levellink += '&nbsp;';
									}
								levelUpgrading = createTooltip(levellink, '<nobr>'+sdate +' ('+ counter+')</nobr>', this._Parent.Intl.TT("currentlyBuilding")+':');
								}
							s += "<td level='"+level+"' view='"+key+"' position='"+position+"' class='"+firstStyle+" "+key+" "+currentBuildingStyle+"'>"+levelUpgrading+"</td>";
							}
						else
							{
							var levellink =level;
							if (level != "-")
								{
								levellink = "<a href='" + link + "' class=changeCity cityid="+CityId+">"+level+"</a>";
								
								if (reportViewToSurvey(key, CityId) == '!')
									{
									levellink += '<sup class=Red title="Require attention">!</sup>';
									}
								else
									{
									levellink += '&nbsp;';
									}
								}
							else
								{
								levellink += '&nbsp;';
								}
							s += "<td level='"+level+"' view='"+key+"' position='"+position+"' class='"+firstStyle+" "+key+" "+currentBuildingStyle+"'>"+levellink+"</td>";
							}
						buildingCount++;
						firstStyle = 'lfdash';
						}
					}
				else
					{
					s += "<td level='0' view='"+key+"' class='"+firstStyle+" "+key+"'>-&nbsp;</td>";
					buildingCount++;
					firstStyle = '';
					}

				if (buildingCount < buildingsCount[key])
					{
					for (var j = buildingCount; j < buildingsCount[key]; j++)
						{
						s += "<td level='0' view='"+key+"' class='"+firstStyle+" "+key+"'>-&nbsp;</td>";
						firstStyle = 'lfdash';
						}
					}

				lastTopic = orderedBuildings[key];
				}
			}
		
		if (buildsNum <= 1) s += "<td class='lf'></td><td></td><td></td><td></td><td></td><td></td>";
		
		s += "</tr>";
		
		if (odd == '') { odd = 'odd'; } else { odd = ''; }
		i++;
		}
	
	s += "</tbody>";
	
	s += "<tfoot></tfoot>";
	
	s += "</table>";
	
	return s;
	};
	
EmpireBoard.Renders.BuildingName_Tooltip_Content = function(building_id)
	{
	return '<nobr>'+this._Parent.Intl.TT(building_id,'buildings')+'</nobr>';
	};
	
EmpireBoard.Renders.Resources_Table_Content = function()
	{
	var _self = this;
	
	var s = "";
	var Cities = this._Parent.DB.CurrentCities;
	
	s += "<table class='Overview Resources'>";
	
	function createLinkToFinanceNavyViews()
		{
		var rHTML = '';
			
		rHTML += '<a href="?view=merchantNavy" title="View merchant navy"><img align="absmiddle" src="skin/img/city/building_port.gif" /></a>';
		if (reportViewToSurvey('merchantNavy') == '!')
			{
			rHTML += '<sup class=Red title="Require attention">!</sup>';
			}
		else
			{
			rHTML += '&nbsp;';
			}
		
		rHTML += '<a href="?view=finances" title="View finances"><img align="absmiddle" src="skin/img/city/building_townhall.gif" /></a>';
		if (reportViewToSurvey('finances') == '!')
			{
			rHTML += '<sup class=Red title="Require attention">!</sup>';
			}
		else
			{
			rHTML += '&nbsp;';
			}
		
		return rHTML;
		}

	s += "<thead><tr>";
	s +=	"<th class='city_name' nowrap>"+this._Parent.Intl.TT("cityName")+"</th>"+
			"<th class='actions' nowrap>"+createLinkToFinanceNavyViews()+"</th>"+
			"<th colspan=3 class='lf population' nowrap>"+this._Parent.Intl.TT("Population")+"</th>"+
			"<th colspan=1 class='growth' nowrap>"+this._Parent.Intl.TT("Growth")+"</th>"+
			"<th colspan=1 class='lf research' nowrap>"+this._Parent.Intl.TT("Research")+"</th>"+
			"<th colspan=1 class='lf incomes' nowrap>"+this._Parent.Intl.TT("Incomes")+"</th>"+
			"<th colspan=2 class='lf wood'>"+this._Parent.Intl.TT("Wood")+"</th>"+
			"<th colspan=3 class='lf wine'>"+this._Parent.Intl.TT("Wine")+"</th>"+
			"<th colspan=2 class='lf marble'>"+this._Parent.Intl.TT("Marble")+"</th>"+
			"<th colspan=2 class='lf crystal'>"+this._Parent.Intl.TT("Crystal")+"</th>"+
			"<th colspan=2 class='lf sulfur'>"+this._Parent.Intl.TT("Sulfur")+"</th>";
	s += "</tr></thead>";
	
	var sumres = new Resource("");
	sumres.population	 = 0;
	sumres.citizens		 = 0;
	sumres.spacetotal	 = 0;
	sumres.growth		 = 0;
	sumres.Income		 = 0;
	sumres.reservedGold	 = '';
	sumres.Research		 = 0;
	
	var sumProd = new Resource("");
	sumProd.wineUsage = 0;
	
	var sumArTr = new Resource("");

	function createIncome(prodPerHour, extraTooltip, classname)
		{
		if (classname == undefined) classname = '';
		if (""+prodPerHour == "NaN" || ""+prodPerHour == "" || ""+prodPerHour == "?" || prodPerHour == undefined || ""+prodPerHour == "???")
			{
			return "?";
			}
		else if (""+prodPerHour == "0")
			{
			return "0";
			}
		else
			{
			var tooltip = _self._Parent.Str.FormatBigNumber(Math.round(24 * prodPerHour), true)+" / "+_self._Parent.Ikariam.LocalizationStrings('day','timeunits','short');
			if ((extraTooltip != undefined) && (extraTooltip != ''))
				{
				tooltip += "<br>&nbsp;"+extraTooltip;
				}
			return createTooltip('<span class="'+classname+'">'+_self._Parent.Str.FormatBigNumber(Math.round(prodPerHour), true)+'</span>', tooltip);
			}
		}

	function createLinkToAgora(city_id)
		{
		var rHTML = '';
		
		if (_self._Parent.Ikariam.Is_Version_032x() == true)
			{
			var res = getCity(city_id);
			
			if (res.island_id != undefined)
				{
				rHTML += '<a href="?view=islandBoard&id='+res.island_id+'" title="View island agora"><img hspace="3" height="12" src="skin/board/schriftrolle_offen2.gif" align="absmiddle" /></a>';
				}
			}
			
		return rHTML;
		}

	function createLinkToMap(city_id)
		{
		var res = getCity(city_id);
		var rHTML = '';
		
		if (res.city_coord != undefined)
			{
			cCoord =  res.city_coord.split(":");
			rHTML += '<a href="?view=worldmap_iso&islandX='+_self._Parent.Str.To_Integer(cCoord[0],'')+'&islandY='+_self._Parent.Str.To_Integer(cCoord[1],'')+'" title="' + res.city_coord + ' View world map"><img align="absmiddle" src="skin/layout/icon-world.gif" /></a>'; 
			}
			
		if ((res.island_id != undefined) && (res.city_coord != undefined))
			{
			rHTML += '<a href="?view=island&id=' + res.island_id + '&selectCity='+city_id+'" title="' + res.city_coord + ' View island"><img align="absmiddle" src="skin/layout/icon-island.gif" /></a>'; 
			}
		else if (res.island_id != undefined)
			{
			rHTML += '<a href="?view=island&id=' + res.island_id + '&selectCity='+city_id+'" title="View island"><img align="absmiddle" src="skin/layout/icon-island.gif" /></a>'; 
			}
			
		return rHTML;
		}

	function createLinkToResourceCond(condition, text, island_id, city_id, city_index)
		{
		if (condition == true && island_id != undefined && island_id != "")
			{
			return createLink(text, "?view=resource&type=resource&id="+island_id, "class=changeCity cityid="+city_id);
			}
		return text;
		}

	function createLinkToTradegoodCond(condition, text, island_id, city_id, city_index)
		{
		if (condition == true && island_id != undefined && island_id != "")
			{
			return createLink(text, "?view=tradegood&type=tradegood&id="+island_id, "class=changeCity cityid="+city_id);
			}
		return text;
		}

	function createLinkToResources(city_id)
		{
		var res = getCity(city_id);
		var rHTML = '';
		if (res.island_id != undefined)
			{
			rHTML += '<a class="changeCity" cityid="'+city_id+'" href="?view=resource&type=resource&id=' + res.island_id + '" title="View island saw mill"><img height="12" align="absmiddle" src="skin/resources/icon_wood.gif" /></a>';
			rHTML += '&nbsp;';
			
			if (res.prodgood == 'wine')
				{
				rHTML += '<a class="changeCity" cityid="'+city_id+'" href="?view=tradegood&type=tradegood&id=' + res.island_id + '" title="View island vineyard"><img height="12" align="absmiddle" src="skin/resources/icon_wine.gif" /></a>';
				}
			else if (res.prodgood == 'marble')
				{
				rHTML += '<a class="changeCity" cityid="'+city_id+'" href="?view=tradegood&type=tradegood&id=' + res.island_id + '" title="View island quarry"><img height="12" align="absmiddle" src="skin/resources/icon_marble.gif" /></a>';
				}
			else if (res.prodgood == 'glass')
				{
				rHTML += '<a class="changeCity" cityid="'+city_id+'" href="?view=tradegood&type=tradegood&id=' + res.island_id + '" title="View island crystal mine"><img height="12" align="absmiddle" src="skin/resources/icon_glass.gif" /></a>';
				}
			else if (res.prodgood == 'sulfur')
				{
				rHTML += '<a class="changeCity" cityid="'+city_id+'" href="?view=tradegood&type=tradegood&id=' + res.island_id + '" title="View island sulphur pit"><img height="12" align="absmiddle" src="skin/resources/icon_sulfur.gif" /></a>';
				}
				
			rHTML += '&nbsp;';
			}
		return rHTML;
		}

	function createLinkToTransportGoods(city_id)
		{
		var rHTML = '';
		if (current_city_id == city_id)
			{
			rHTML += '<img class="Action" src="skin/actions/transport_disabled.gif" align="absmiddle" />';
			}
		else
			{
			rHTML += '<a view=transport href="?view=transport&destinationCityId='+city_id+'" title="Transports goods"><img class="Action" src="skin/actions/transport.gif" align="absmiddle" /></a>';
			}
		return rHTML;
		}

	function createProd(prodPerHour, extraTooltip)
		{
		if (prodPerHour == "-" || prodPerHour == "?")
			{
			return prodPerHour;
			}
		else if (""+prodPerHour == "NaN" || ""+prodPerHour == "" || ""+prodPerHour == "0" || prodPerHour == undefined || ""+prodPerHour == "???")
			{
			return "";
			}
		else
			{
			var tooltip = _self._Parent.Str.FormatBigNumber(Math.round(24 * prodPerHour), true)+" / "+_self._Parent.Ikariam.LocalizationStrings('day','timeunits','short');
			if (extraTooltip != undefined)
				{
				tooltip += ", "+extraTooltip;
				}
			return createTooltip(_self._Parent.Str.FormatBigNumber(Math.round(prodPerHour), true), tooltip);
			}
		}

	function createResCounter(startTime, startAmount, factPerHour, showTooltip, maxAmount, tradeAmount, secureAmount, arrAmount)
		{
		if (tradeAmount == undefined) tradeAmount = 0;
		if (arrAmount == undefined) arrAmount = 0;
		if ((maxAmount == undefined) || (maxAmount == '-'))
			{
			maxAmount = '-';
			}
		else
			{
			maxAmount = maxAmount - tradeAmount;
			}
		var currAmount = startAmount;
		var tooltip = "";
		var res;
		
		if ((startAmount == undefined) || (startAmount+"" == "NaN"))
			{
			res = '?';
			}
		else if ((factPerHour != undefined) && (factPerHour+"" != "NaN") && (factPerHour != 0))
			{
			var counterClass = '';
			var intfactPerHour = Math.round(factPerHour);
			var dailyFact = Math.round(24 * factPerHour);
			if (startTime != undefined)
				{
				currAmount = getCurrentResourceAmount(_self._Parent.StartTime, startTime, startAmount, intfactPerHour);
				if (intfactPerHour > 0)
					{
					counterClass = 'Bold';
					}
				else if (intfactPerHour < 0)
					{
					if (currAmount+(6*intfactPerHour) <= 0)
						{
						counterClass = 'Red';
						}
					else if (currAmount+(24*intfactPerHour) <= 0)
						{
						counterClass = 'DarkRed';
						}
					}
				res = "<font id='myresourcecounter' counter='"+startTime+","+startAmount+","+intfactPerHour+","+maxAmount+"' class='"+counterClass+"'>"+_self._Parent.Str.FormatBigNumber(currAmount)+"</font>";
				}
			
			if (showTooltip == true) 
				{
			    tooltip = _self._Parent.Str.FormatBigNumber(intfactPerHour, true)+" / "+_self._Parent.Ikariam.LocalizationStrings('hour','timeunits','short')+"<br> "+_self._Parent.Str.FormatBigNumber(dailyFact, true)+" / "+_self._Parent.Ikariam.LocalizationStrings('day','timeunits','short');
				if (intfactPerHour < 0)
					tooltip += "<br>&nbsp;" + _self._Parent.Str.FormatRemainingTime(-1 * (currAmount+arrAmount) / intfactPerHour * 60 * 60 * 1000) + " to empty";
				}
			}
		else
			{
			res = _self._Parent.Str.FormatBigNumber(currAmount);
			}
			
		// Safety goods ?
		if ((secureAmount > 0) && (secureAmount >= (currAmount+tradeAmount)))
			{
			res = '<img src="skin/layout/icon-wall.gif" class="Safe" title="Safety resources"/> '+res;
			}
			
		if (tooltip != '') res = createTooltip(res, tooltip);
		return res + "&nbsp;";
		}
	
	function createResearch(prodPerHour, extraTooltip)
		{
		if (prodPerHour == "-" || prodPerHour == "?")
			{
			return prodPerHour;
			}
		else if (""+prodPerHour == "0")
			{
			return '+0';
			}
		else if (""+prodPerHour == "NaN" || ""+prodPerHour == "" || prodPerHour == undefined || ""+prodPerHour == "???")
			{
			return "";
			}
		else
			{
			var tooltip = _self._Parent.Str.FormatBigNumber(Math.round(24 * prodPerHour), true)+" / "+_self._Parent.Ikariam.LocalizationStrings('day','timeunits','short');
			if (extraTooltip != undefined)
				{
				tooltip += ", "+extraTooltip;
				}
			return createTooltip(_self._Parent.Str.FormatBigNumber(Math.round(prodPerHour), true), tooltip);
			}
		}

	function getArrivingGoodsSum(city_id, resName)
		{
		var sum = 0;
		var city = getCity(city_id);
		var rows = getArrValue(config.arrivinggoods, city_id, []);
		var key;
		for (key in rows)
			{
			var row = rows[key];
			var res = row["res"];
			var a = getArrValue(res, resName, 0);
			var arrivetime = parseInt(getArrValue(row, "arrivetime", ""));
			if ((a > 0) && (arrivetime > city.prodtime)) sum += a;
			}
		return sum;
		}
	
	function getArrivingGoods(city_id, resName, tradinggoods, resAmount, ArrivingGoodsSum)
		{
		var sum = 0;
		var found = false;
		if (ArrivingGoodsSum == undefined)
			ArrivingGoodsSum = getArrivingGoodsSum(city_id, resName);
		if (ArrivingGoodsSum > 0)
			{
			sum += ArrivingGoodsSum;
			found = true;
			}

		if ((tradinggoods != undefined) && (parseInt(tradinggoods) > 0))
			{
			sum += parseInt(tradinggoods);
			}

		var s = "<font class='More'>-&nbsp;</font>";
		if (found == true)
			{
			s = "<font class='More MoreGoods Green'>"+_self._Parent.Str.FormatBigNumber(sum, true);
			if (getDeliveredGoodsTransports(city_id, resName) > 0)
				{
				s += "<sup>*</sup>";
				}
			else s += "&nbsp;";
			s += "</font>";
			}
		else if (sum > 0)
			{
			s = "<font class='More MoreGoods'>"+_self._Parent.Str.FormatBigNumber(sum, true)+"&nbsp;</font>";
			}
		return s;
		}

	function createReservedGold(sum)
		{
		var output = '';
		if (sum == '?')
			{
			output = '<font class="More">?</font>';
			}
		else if (sum === 0)
			{
			output = '<font class="More">-</font>';
			}
		else if ((sum != undefined) && (sum != ''))
			{
			output = '<font class="More" title="Reserved gold">'+_self._Parent.Str.FormatBigNumber(sum)+'</font>';
			}
		return output;
		}
		
	function createSimpleProd(prodPerHour)
		{
		if (""+prodPerHour == "NaN" || ""+prodPerHour == "" || ""+prodPerHour == "0" || prodPerHour == undefined || ""+prodPerHour == "???")
			{
			return "";
			}
		return _self._Parent.Str.FormatBigNumber(Math.round(prodPerHour), true);
		}

	function createTransports(cityID)
		{
		var res = "<font class='More'></font>";
		var numTransports = 0;
		if (config["transports"] == undefined)
			{
			
			}
		else if (config["transports"][cityID] != undefined)
			{
			for (key in config["transports"][cityID])
				{
				if (config["transports"][cityID][key].endTime >= _self._Parent.StartTime) numTransports++;
				}
				
			if (numTransports > 0) res = "<font class='More'>"+numTransports+" transport(s) on way</font>";
			}
			
		return res;
		}

	function createResProgressBar(startTime, startAmount, factPerHour, maxCapacity, secureCapacity)
		{
		var res = '';
		if ((_self._Parent.DB.Options.Prefs.PROGRESS_BAR_MODE != "off") && (maxCapacity > 0) && (startTime != undefined))
			{
			var curres = getCurrentResourceAmount(new Date().getTime(), startTime, startAmount, factPerHour);
			var perc = Math.min(100, Math.round(curres / maxCapacity * 100.0));
			var remaining = "";
			var remhour = 100000000;
			if (curres >= maxCapacity)
				{
				// no more
				remhour = 0;
				}
			else if (factPerHour > 0)
				{
				remhour = (maxCapacity - curres) / factPerHour;
				remaining = "<br>"+_self._Parent.Str.FormatRemainingTime(remhour*60*60*1000)+" to full";
				}
			else if (factPerHour < 0)
				{
				remaining = "<br>"+_self._Parent.Str.FormatRemainingTime((curres / -factPerHour)*60*60*1000) + " to empty";
				}
			var cl = "Normal";
			var vperc = perc;
			if ((curres > 0) && (vperc < 4)) vperc = 4;
			if ((_self._Parent.DB.Options.Prefs.PROGRESS_BAR_MODE == "time") && (factPerHour != 0))
				{
				if (remhour <= 1) 
					{
					cl = "Full";
					} 
				else if (remhour < 24)
					{
					cl = "AlmostFull";
					}
				else if (remhour < 72)
					{
					cl = "Warning";
					}
				}
			else
				{
				if (perc >= 99)
					{
					cl = "Full";
					}
				else if (perc >= 90)
					{
					cl = "AlmostFull";
					}
				else if (perc >= 80)
					{
					cl = "Warning";
					}
				} 
			res +=  "<table class='myPercent' "+createTooltipAttribute(_self._Parent.Str.FormatBigNumber(maxCapacity) + " total capacity<br>"+_self._Parent.Str.FormatBigNumber(secureCapacity)+" safety capacity<br>" + perc+"% full" + remaining)+">"+
			"<tr>"+
			"<td width='"+vperc+"%' class='"+cl+"'></td>"+
			"<td width='"+(100-vperc)+"%'></td>"+
			"</tr>"+
			"</table>";
			}
		else if (_self._Parent.DB.Options.Prefs.PROGRESS_BAR_MODE != "off")
			{
			res +=  "<table class='myPercent'>"+
			"<tr>"+
			"<td></td>"+
			"</tr>"+
			"</table>";
			}
		return res;
		}

	s += "<tbody>";

	var CityId;
	var i = 0;
	var odd = '';
	for (CityId in Cities)
		{
		if (Cities[CityId].own != true) continue;
		var city = getCity(CityId);
		
		if (getBuildingLevel(CityId, "branchOffice", "-") != '-')
			{
			if (city.tradewood == undefined) city.tradewood = 0;
			if (city.tradewine == undefined) city.tradewine = 0;
			if (city.trademarble == undefined) city.trademarble = 0;
			if (city.tradeglass == undefined) city.tradeglass = 0;
			if (city.tradesulfur == undefined) city.tradesulfur = 0;
			}
		else
			{
			city.tradewood = 0;
			city.tradewine = 0;
			city.trademarble = 0;
			city.tradeglass = 0;
			city.tradesulfur = 0;
			}
		
		// Try to estimate wine usage
		var wineUsage;
		var cellarLevel = getBuildingLevel(CityId, "vineyard", "-");
		if (city.wineUsageId != undefined)
			{
			wineUsage = tavernWineUsage[city.wineUsageId];
			if (cellarLevel != '-') 
				{
				wineSave = wineUsage * cellarLevel;
				wineSave = Math.round(wineSave / 100);
				wineUsage = wineUsage - wineSave;
				}
			}
		else if (city.wineUsage != undefined)
			{
			wineUsage = city.wineUsage;
			} 
		else 
			{
			// estimate max wine usage
			var tavernLevel = getBuildingLevel(CityId, "tavern", "-");
			wineUsage = (tavernLevel != '-' ? tavernWineUsage[tavernLevel] : 0);
			if (cellarLevel != '-')
				{
				wineSave = wineUsage * cellarLevel;
				wineSave = Math.round(wineSave / 100);
				wineUsage = wineUsage - wineSave;
				}
			}
		// Wine usage tooltip
		var wineUsageHtml = '-';
		if (wineUsage > 0)
			{
			wineUsageHtml = createSimpleProd(-1 * wineUsage);
			}
		
		// Estimate current amount of each resources
		var curres = new Resource("");
		curres.wood		 = getCurrentResourceAmount(this._Parent.StartTime, city.prodtime, city.wood, city.prodwood);
		curres.wine		 = getCurrentResourceAmount(this._Parent.StartTime, city.prodtime, city.wine, city.prodwine - wineUsage);
		curres.marble	 = getCurrentResourceAmount(this._Parent.StartTime, city.prodtime, city.marble, city.prodmarble);
		curres.glass	 = getCurrentResourceAmount(this._Parent.StartTime, city.prodtime, city.glass, city.prodglass);
		curres.sulfur	 = getCurrentResourceAmount(this._Parent.StartTime, city.prodtime, city.sulfur, city.prodsulfur);

		sumres.wood		 += curres.wood;
		sumres.wine		 += curres.wine;
		sumres.marble	 += curres.marble;
		sumres.glass	 += curres.glass;
		sumres.sulfur	 += curres.sulfur;

		sumProd.wood		 += city.prodwood;
		sumProd.wine		 += city.prodwine;
		sumProd.wineUsage	 += wineUsage;
		sumProd.marble		 += city.prodmarble;
		sumProd.glass		 += city.prodglass;
		sumProd.sulfur		 += city.prodsulfur;
		
		// Resources which will arrive
		var arrres = new Resource('');
		arrres.wood		 = getArrivingGoodsSum(CityId, 'wood');
		arrres.wine		 = getArrivingGoodsSum(CityId, 'wine');
		arrres.marble	 = getArrivingGoodsSum(CityId, 'marble');
		arrres.glass	 = getArrivingGoodsSum(CityId, 'glass');
		arrres.sulfur	 = getArrivingGoodsSum(CityId, 'sulfur');

		sumArTr.wood	 += city.tradewood + arrres.wood;
		sumArTr.wine	 += city.tradewine + arrres.wine;
		sumArTr.marble	 += city.trademarble + arrres.marble;
		sumArTr.glass	 += city.tradeglass + arrres.glass;
		sumArTr.sulfur	 += city.tradesulfur + arrres.sulfur;
		
		// City income
		var Income = getArrValue(city.buildings["townHall"],"incomegold","?");
		if (Income != "?")
			{
			sumres.Income += Income;
			}
		
		// Gold in trading post
		var reservedGold = '';
		if (city.buildings["branchOffice"] != undefined)
			{
			if (city.buildings["branchOffice"].reservedGold == undefined)
				{
				reservedGold = '?';
				}
			else
				{
				reservedGold = city.buildings["branchOffice"].reservedGold;
				if (reservedGold > 0)
					{
					if (sumres.reservedGold == '')
						{
						sumres.reservedGold = reservedGold;
						}
					else
						{
						sumres.reservedGold += reservedGold;
						}
					}
				}
			}
			
		// Research point
		var Research = '-';
		if (getBuildingLevel(CityId, "academy", 0) > 0)
			{
			Research = getArrValue(city.buildings["academy"],"Research","?");
			
			if (Research != '?')
				{
				sumres.Research += Research;
				}
			}
		
		var spacetotal		 = '?';
		var townHallLevel	 = getBuildingLevel(CityId, "townHall", "?", 0);
		if (townHallLevel != '?')
			spacetotal = townHallSpaces[townHallLevel];
		var bonusspace		 = getArrValue(city.buildings["townHall"], "bonusspace", "?");

		var workers			 = '?';
		var population		 = getArrValue(city.buildings["townHall"], "population", 0);
		var citizens		 = getArrValue(city.buildings["townHall"], "citizens", '?');
		if (citizens != '?')
			workers = population - citizens;
		
		// Estimate current population and growth
		var growth			 = 0;
		var happiness		 = getArrValue(city.buildings["townHall"], "happiness", "?");
		if ((happiness != '?') && (spacetotal != '?') && (bonusspace != '?'))
			{
			population = getEstimatedPopulation(population, city.prodtime, this._Parent.StartTime, happiness - population);
			if (parseInt(population) > parseInt(spacetotal) + parseInt(bonusspace))
				{
				population = parseInt(spacetotal) + parseInt(bonusspace);
				}
			happiness -= population;
			
			if (happiness != 0)
				growth = (0.02 * happiness) + 0.01;
			}
		else
			{
			growth = getArrValue(city.buildings["townHall"], "growth", "?");
			}
		sumres.population += population;
		
		// Current citizens
		if (workers != '?')
			{
			citizens = population - workers;
			if (sumres.citizens != '?')
				{
				sumres.citizens += citizens;
				}
			}
		else
			{
			citizens = '?';
			sumres.citizens = '?';
			}
		
		// Estimate growth remaining time
		var growthRemainingHours = '';
		if (happiness != "?" && happiness > 0 && bonusspace != "?" && growth >= 0.20)
			{
			growthRemainingHours = getGrowthRemainingHours(population, parseInt(spacetotal) + parseInt(bonusspace), this._Parent.StartTime, happiness);
			}
		
		// Global growth
		if ((growth != '?') && (sumres.growth != '?'))
			{
			if (parseInt(population) < parseInt(spacetotal) + parseInt(bonusspace))
				sumres.growth += growth;
			}
		else
			{
			sumres.growth = '?';
			}
		
		// Is current city ?
		var trclass = "";
		if (parseInt(current_city_id) == parseInt(CityId))
			{
			trclass = "current";
			}

		var townHallStyle = "";
		var growthStyle = "";
		if (parseInt(population) >= parseInt(spacetotal) + parseInt(bonusspace))
			{
			// Townhall is full
			growthRemainingHours = '';
			if (growth >= 1.20) 
				{
				townHallStyle = " DarkRed";
				}
			else if (growth >= 0.20) 
				{
				townHallStyle = " Brown";
				}
			else
				{
				townHallStyle = " Bold";
				}
			}
		else if (growth >= 0.20)
			{
			growthStyle = " Green";
			}
		else if (growth >= 0)
			{
			growthStyle = "";
			}
		else if (growth <= -1)
			{
			growthStyle = " Red";
			}
		else if (growth <= -0.20)
			{
			growthStyle = " DarkRed";
			}
		
		// Global townhall capacity
		if (bonusspace != "?")
			{
			if (sumres.spacetotal != '?')
				sumres.spacetotal += parseInt(spacetotal) + parseInt(bonusspace);
			spacetotal = this._Parent.Str.FormatBigNumber(parseInt(spacetotal) + parseInt(bonusspace));
			}
		else
			{
			sumres.spacetotal = '?';
			spacetotal = this._Parent.Str.FormatBigNumber(spacetotal) + " + ?";
			}
		
		// Warehouse safe capacity bonus by premium option
		var savecapacityBonus = 0;
		if (config["premium"] != undefined)
			{
			if ((config["premium"].savecapacityBonus != undefined) && (config["premium"].savecapacityBonus > this._Parent.StartTime))
				{
				savecapacityBonus = 100;
				}
			}
		
		// Warehouse storage capacity bonus by premium option
		var storagecapacityBonus = 0;
		if (config["premium"] != undefined)
			{
			if ((config["premium"].storagecapacityBonus != undefined) && (config["premium"].storagecapacityBonus > this._Parent.StartTime))
				{
				storagecapacityBonus = 100;
				}
			}
		
		// Warehouse max capacity
		var maxcwood		 = 0;
		var maxcother		 = 0;
		var maxsafewood		 = 0;
		var maxsafeother	 = 0;
		if (this._Parent.Ikariam.Is_Version_034x() == true)
			{
			var WarehousesLevels = [];
			var WarehousesLevel = 0;
			if ((city.buildings['warehouse'] != undefined) && (city.buildings['warehouse'].levels != undefined))
				{
				var p;
				for (p in city.buildings['warehouse'].levels)
					{
					var WarehouseLevel = getBuildingLevel(CityId, 'warehouse', city.buildings['warehouse'].levels[p], p);
					WarehousesLevel += WarehouseLevel;
					WarehousesLevels.push(WarehouseLevel);
					}
				}
			else
				{
				// While build first warehouse
				WarehousesLevel	 = getBuildingLevel(CityId,'warehouse', 0, -1);
				WarehousesLevels.push(WarehousesLevel);
				}
				
			var DumpLevel = getBuildingLevel(CityId,'dump', 0, -1);
			
			maxcwood		 = this._Parent.Ikariam.Resource_Capacity('wood',WarehousesLevel,DumpLevel,storagecapacityBonus);
			maxcother		 = maxcwood;
			maxsafewood		 = this._Parent.Ikariam.Resource_SafeCapacity('wood',WarehousesLevels,savecapacityBonus);
			maxsafeother	 = maxsafewood;
			}
		else
			{
			// Soon deprecated
			var WarehousesLevel	 = getBuildingLevel(CityId,'warehouse', 0, -1);
			
			maxcwood		 = this._Parent.Ikariam.Resource_Capacity('wood',WarehousesLevel,0,storagecapacityBonus);
			maxcother		 = this._Parent.Ikariam.Resource_Capacity('wine',WarehousesLevel,0,storagecapacityBonus);
			maxsafewood		 = this._Parent.Ikariam.Resource_SafeCapacity('wood',WarehousesLevel,savecapacityBonus);
			maxsafeother	 = this._Parent.Ikariam.Resource_SafeCapacity('wine',WarehousesLevel,savecapacityBonus);
			}

		var cityLink = '';
		if (reportViewToSurvey('',CityId) == '!')
			{
			cityLink = createLinkToChangeCity(Cities[CityId].name, CityId, i, reportViewToSurvey('',CityId),'Red', 'Require attention');
			}
		else
			{
			cityLink = createLinkToChangeCity(Cities[CityId].name, CityId, i , city.actions, 'Green', 'Available action points');
			}
		
		s += "<tr class='"+odd+" "+trclass+"' cityid='"+CityId+"' islandid='"+city.island_id+"' coord='"+city.city_coord+"' tradegood='"+city.prodgood+"'>";
		
		s +=	"<td class='city_name' nowrap>"+cityLink+createTransports(CityId)+"</td>"+
				"<td class='actions' nowrap>"+createLinkToMap(CityId)+createLinkToAgora(CityId)+"<br />"+createLinkToResources(CityId)+createLinkToTransportGoods(CityId)+"</td>"+
				"<td class='lf'>"+
					"<span title='Citizens'>"+(population > 0 ? this._Parent.Str.FormatBigNumber(citizens) : '?')+"</span>"+
					"&nbsp;("+
				"</td>"+
				"<td class='nolf'>"+
					"<span title='Overall inhabitants' class='inhabitant"+townHallStyle+"'>"+(population > 0 ? this._Parent.Str.FormatBigNumber(population) : '?')+"</span>)"+
					"&nbsp;/</td>"+
				"<td class='nolf' title='Housing space'>"+spacetotal+"</td>"+
				"<td class='"+growthStyle+"'>"+(growth != '?' ? '<img src="'+this._Parent.Ikariam.Get_Happiness_ImgSrc(growth)+'" align=left height=18 hspace=2 vspace=0 title="Total satisfaction: '+happiness+'">' : '')+createTooltip(this._Parent.Str.FormatFloatNumber(growth,2,true), growthRemainingHours)+"</td>"+
				"<td class='lf'>"+createResearch(Research)+"</td>"+
				"<td class='lf'>"+
					createIncome(Income)+
					createReservedGold(reservedGold)+
				"</td>"+
				"<td class='lf' resource='wood'>"+
					createLinkToResourceCond(true, createResCounter(city.prodtime, city.wood, city.prodwood, false, maxcwood, city.tradewood, maxsafewood), city.island_id, CityId, i)+
					getArrivingGoods(CityId, "wood", city.tradewood, curres.wood, arrres.wood)+
					createResProgressBar(city.prodtime, city.wood + arrres.wood, city.prodwood, maxcwood - city.tradewood, maxsafewood)+
				"</td>"+
				"<td class='lfdash'>"+createProd(city.prodwood)+"</td>"+
				"<td class='lf' resource='wine'>"+
					createLinkToTradegoodCond((city.prodwine > 0) || (city.prodgood == 'wine'), createResCounter(city.prodtime, city.wine, city.prodwine - wineUsage, true, maxcother, city.tradewine, maxsafeother, arrres.wine), city.island_id, CityId, i)+
					getArrivingGoods(CityId, "wine", city.tradewine, curres.wine, arrres.wine)+
					createResProgressBar(city.prodtime, city.wine + arrres.wine, city.prodwine - wineUsage, maxcother - city.tradewine, maxsafeother)+
				"</td>"+
				"<td class='lfdash'>"+createSimpleProd(city.prodwine)+"</td>"+
				"<td class='lfdash'>"+wineUsageHtml+"</td>"+
				"<td class='lf' resource='marble'>"+
					createLinkToTradegoodCond((city.prodmarble > 0) || (city.prodgood == 'marble'), createResCounter(city.prodtime, city.marble, city.prodmarble, false, maxcother, city.trademarble, maxsafeother), city.island_id, CityId, i)+
					getArrivingGoods(CityId, "marble", city.trademarble, curres.marble, arrres.marble)+
					createResProgressBar(city.prodtime, city.marble + arrres.marble, city.prodmarble, maxcother - city.trademarble, maxsafeother)+
				"</td>"+
				"<td class='lfdash'>"+createProd(city.prodmarble)+"</td>"+
				"<td class='lf' resource='glass'>"+
					createLinkToTradegoodCond((city.prodglass > 0) || (city.prodgood == 'glass'), createResCounter(city.prodtime, city.glass, city.prodglass, false, maxcother, city.tradeglass, maxsafeother), city.island_id, CityId, i)+
					getArrivingGoods(CityId, "glass", city.tradeglass, curres.glass, arrres.glass)+
					createResProgressBar(city.prodtime, city.glass + arrres.glass, city.prodglass, maxcother - city.tradeglass, maxsafeother)+
				"</td>"+
				"<td class='lfdash'>"+createProd(city.prodglass)+"</td>"+
				"<td class='lf' resource='sulfur'>"+
					createLinkToTradegoodCond((city.prodsulfur > 0) || (city.prodgood == 'sulfur'), createResCounter(city.prodtime, city.sulfur, city.prodsulfur, false, maxcother, city.tradesulfur, maxsafeother), city.island_id, CityId, i)+
					getArrivingGoods(CityId, "sulfur", city.tradesulfur, curres.sulfur, arrres.sulfur)+
					createResProgressBar(city.prodtime, city.sulfur + arrres.sulfur, city.prodsulfur, maxcother - city.tradesulfur, maxsafeother)+
				"</td>"+
				"<td class='lfdash'>"+createProd(city.prodsulfur)+"</td>";
		s += "</tr>";
		
		i++;
		if (odd == '') { odd = 'odd'; } else { odd = ''; }
		}
	
	s += "</tbody>";
	
	// Gold usage remaining time
	var goldRemainingHours = '';
	var goldStyle = '';
	if (sumres.Income < 0) 
		{
		var RemainingHours = -1 * config.gold / sumres.Income;
		if (RemainingHours <= 6)
			{
			goldStyle = 'Red';
			}
		else if (RemainingHours <= 72)
			{
			goldStyle = 'DarkRed';
			}
		goldRemainingHours = _self._Parent.Str.FormatRemainingTime(RemainingHours*60*60*1000)+" to expense";
		}
	
	function createMoreGoods(sum)
		{
		var output = '';
		if (sum > 0) 
			{
			output = '<font class="More">'+_self._Parent.Str.FormatBigNumber(sum, true)+'&nbsp;</font>';
			}
	 	return output;
		}
		
	s += "<tfoot class='Summary'><tr>";
	s += "<td class='sigma' nowrap colspan=2><img vspace=2 hspace=5 src='skin/layout/sigma.gif'></td>"+
		 "<td class='lf'>"+
			"<span title='Citizens'>"+this._Parent.Str.FormatBigNumber(sumres.citizens)+'</span>'+
			"&nbsp;("+
		 "</td>"+
		 "<td class='nolf'>"+
			"<span title='Overall inhabitants'>"+this._Parent.Str.FormatBigNumber(sumres.population)+"</span>)"+
			"&nbsp;/</td>"+
		 "<td class='nolf' title='Housing space'>"+this._Parent.Str.FormatBigNumber(sumres.spacetotal)+"</td>"+
		 "<td>"+this._Parent.Str.FormatFloatNumber(sumres.growth,2,true)+"</td>"+
		 "<td class='lf'>"+createResearch(sumres.Research)+"</td>"+
		 "<td class='lf'>"+
			createIncome(sumres.Income, goldRemainingHours, goldStyle)+
			createReservedGold(sumres.reservedGold)+
			"</td>"+
		 "<td class='lf'>"+
							createResCounter(this._Parent.StartTime, sumres.wood, sumProd.wood)+
							createMoreGoods(sumArTr.wood)+
							"</td>"+
		 "<td class='lfdash'>"+createProd(sumProd.wood)+"</td>"+
		 "<td class='lf'>"+
							createResCounter(this._Parent.StartTime, sumres.wine, sumProd.wine - sumProd.wineUsage, true)+
							createMoreGoods(sumArTr.wine)+
							"</td>"+
		 "<td class='lfdash'>"+createSimpleProd(sumProd.wine)+"</td>"+
		 "<td class='lfdash'>"+createSimpleProd(-1 * sumProd.wineUsage)+"</td>"+
		 "<td class='lf'>"+
							createResCounter(this._Parent.StartTime, sumres.marble, sumProd.marble)+
							createMoreGoods(sumArTr.marble)+
							"</td>"+
		 "<td class='lfdash'>"+createProd(sumProd.marble)+"</td>"+
		 "<td class='lf'>"+
							createResCounter(this._Parent.StartTime, sumres.glass, sumProd.glass)+
							createMoreGoods(sumArTr.glass)+
							"</td>"+
		 "<td class='lfdash'>"+createProd(sumProd.glass)+"</td>"+
		 "<td class='lf'>"+
							createResCounter(this._Parent.StartTime, sumres.sulfur, sumProd.sulfur)+
							createMoreGoods(sumArTr.sulfur)+
							"</td>"+
		 "<td class='lfdash'>"+createProd(sumProd.sulfur)+"</td>";
	s += "</tr></tfoot>";
	
	s += "</table>";
	
	return s;
	};
	
EmpireBoard.Renders.ArmyFleet_Table_Content = function()
	{
	var _self = this;
	
	var s = "";
	var Cities = this._Parent.DB.CurrentCities;
	
	var FleetUpkeepBonus = 0;
	if (config["research"].FleetUpkeepBonus != undefined)
		FleetUpkeepBonus = config["research"].FleetUpkeepBonus;
	
	var ArmyUpkeepBonus = 0;
	if (config["research"].ArmyUpkeepBonus != undefined) 
		ArmyUpkeepBonus = config["research"].ArmyUpkeepBonus;
	
	function applyUpkeepBonus(value, bonus)
		{
		if ((value == '-') || (value == '?') || (value == 0) || (bonus == 0))
			{
			return value;
			}
		else
			{
			return (value - (value/100*bonus));
			}
		}
	
	var orderedUnits = this._Parent.Ikariam.UnitsList();
	
	function isArmy(key)
		{
		if (_self._Parent.Ikariam.Get_UnitGender(key) == 'army')
			return true;
		else
			return false;
		}
	
	function isFleet(key)
		{
		if (_self._Parent.Ikariam.Get_UnitGender(key) == 'fleet')
			return true;
		else
			return false;
		}
	
	var usedIndexes = {};
	var usedIndexesCount = 0;
	if (config["unitnames"] != undefined)
		{
		var CityId;
		for (CityId in Cities)
			{
			if (Cities[CityId].own != true) continue;
			var city = getCity(CityId);
			var key;
			for (key in orderedUnits)
				{
				var ukey = 'unit '+key;
				if (parseInt(getArrValue(getArrValue(city.units, ukey), "count", 0)) > 0)
					{
					usedIndexes[key] = 1;
					usedIndexesCount++;
					}
				else if (parseInt(getArrValue(getArrValue(city.units, ukey), "construction", 0)) > 0)
					{
					usedIndexes[key] = 1;
					usedIndexesCount++;
					}
				}
			}
		}
	
	s += "<thead><tr><th class='city_name' nowrap>"+this._Parent.Intl.TT("cityName")+"</th>";
	s += "<th class='actions' nowrap>"+this._Parent.Renders.ArmyFleet_HeaderIcons(current_city_id)+"</th>";
	if (usedIndexesCount > 0)
		{
		var firstStyle = "";
		var lastTopic = '';
		var key;
		for (key in orderedUnits)
			{
			var ukey = 'unit '+key;
			var name = this._Parent.Intl.TT(ukey,'army_units');
			if (usedIndexes[key] == 1) 
				{
				if (lastTopic != orderedUnits[key]) { firstStyle = "lf"; } else { firstStyle = ""; }
				
				s += "<th unit='"+key+"' class='"+firstStyle+" unit_name "+key+"' nowrap>"+name+"</th>";
				firstStyle = "";
				
				lastTopic = orderedUnits[key];
				}
			}
		}
	else s += "<th class='lf'></th><th></th><th></th><th></th><th></th><th></th><th></th>";
	s += "<th class='upkeep lf' nowrap title='"+this._Parent.Intl.TT("Upkeep")+"'>"+this._Parent.Intl.TT("Upkeep")+"</th>";
	s += "</tr></thead>";
	
	function createAttacks(cityID)
		{
		var res = "<font class='More Red'></font>";
		var numMovements = 0;
		if (config["attacks"] == undefined)
			{
			
			}
		else if (config["attacks"][cityID] != undefined)
			{
			for (key in config["attacks"][cityID])
				{
				if (config["attacks"][cityID][key].endTime >= _self._Parent.StartTime)
					numMovements++;
				}
				
			if (numMovements > 0)
				res = "<font class='More Attacks Red'>under "+numMovements+" attack(s)</font>";
			}
			
		return res;
		}

	function createLinkToArmyView(city_id)
		{
		var rHTML = '';
		rHTML += '<a href="?view=cityMilitary-army&id='+city_id+'" class="changeCity" cityid="'+city_id+'" title="View army overview"><img align="absmiddle" src="skin/img/city/building_barracks.gif" /></a>';
		if (reportViewToSurvey('cityMilitary-army', city_id) == '!')
			{
			rHTML += '<sup class=Red title="Require attention">!</sup>';
			}
		else
			{
			rHTML += '&nbsp;';
			}
		return rHTML;
		}
	
	function createLinkToFleetView(city_id)
		{
		var rHTML = '';
		rHTML += '<a href="?view=cityMilitary-fleet&id='+city_id+'" class="changeCity" cityid="'+city_id+'" title="View fleet overview"><img align="absmiddle" src="skin/img/city/building_shipyard.gif" /></a>';
		if (reportViewToSurvey('cityMilitary-fleet', city_id) == '!')
			{
			rHTML += '<sup class=Red title="Require attention">!</sup>';
			}
		else
			{
			rHTML += '&nbsp;';
			}
		return rHTML;
		}
		
	function createLinkToDeployArmy(city_id)
		{
		var rHTML = '';
		if (current_city_id == city_id)
			{
			rHTML += '<img class="Action" src="skin/actions/move_army_disabled.gif" align="absmiddle" />';
			}
		else
			{
			rHTML += '<a view=deployment deploymenttype=army href="?view=deployment&deploymentType=army&destinationCityId='+city_id+'" title="Deploy troops"><img class="Action" src="skin/actions/move_army.gif" align="absmiddle" /></a>';
			}
		return rHTML;
		}

	function createLinkToDeployFleet(city_id)
		{
		var rHTML = '';
		if (current_city_id == city_id)
			{
			rHTML += '<img class="Action" src="skin/actions/move_fleet_disabled.gif" align="absmiddle" />';
			}
		else
			{
			rHTML += '<a view=deployment deploymenttype=fleet href="?view=deployment&deploymentType=fleet&destinationCityId='+city_id+'" title="Station fleets"><img class="Action" src="skin/actions/move_fleet.gif" align="absmiddle" /></a>';
			}
		return rHTML;
		}

	function createMovements(cityID)
		{
		var res = "<font class='More'></font>";
		var numMovements = 0;
		if (config["movements"] == undefined)
			{
			
			}
		else if (config["movements"][cityID] != undefined)
			{
			var key;
			for (key in config["movements"][cityID])
				{
				if (config["movements"][cityID][key].endTime >= _self._Parent.StartTime) numMovements++;
				}
				
			if (numMovements > 0) res = "<font class='More Movements'>"+numMovements+" movement(s) on way</font>";
			}
		return res;
		}

	var sum = [];
	var sumConstruction = [];
	var sumUpkeep = 0;
	var sumConstructionUpkeep = 0;
	s += "<tbody class='ownCities'>";
	var i = 0;
	var odd = '';
	var CityId;
	for (CityId in Cities)
		{
		if (Cities[CityId].own != true) continue;
		var city = getCity(CityId);
		var trclass = (parseInt(current_city_id) == parseInt(CityId)) ? "current" : "";
		
		s += "<tr class='"+odd+" "+trclass+"' cityid='"+CityId+"' islandid='"+city.island_id+"' coord='"+city.city_coord+"'>";
		
		s += "<td class='city_name' nowrap>"+
										createLinkToChangeCity(Cities[CityId].name, CityId, i, city.actions, 'Green', 'Available action points')+
										createMovements(CityId)+
										createAttacks(CityId)+
										"</td>";
		s += "<td class='actions' nowrap>"+createLinkToArmyView(CityId)+createLinkToDeployArmy(CityId)+"<br />"+createLinkToFleetView(CityId)+createLinkToDeployFleet(CityId)+"</td>";
		
		var cityUpkeep = 0;
		var cityConstructionUpkeep = 0;
		if (usedIndexesCount > 0)
			{
			var firstStyle = "";
			var lastTopic = '';
			for (key in orderedUnits)
				{
				var ukey = 'unit '+key;
				if (usedIndexes[key] == 1) 
					{
					if (lastTopic != orderedUnits[key]) { firstStyle = "lf"; } else { firstStyle = ""; }
				
					var unitCount = this._Parent.Str.To_Integer(getArrValue(getArrValue(city.units, ukey), "count", 0), 0);
						
					if (config["upkeeps"][key] == undefined)
						{
						cityUpkeep = '?';
						}
					else if (cityUpkeep != '?')
						{
						if (isArmy(key))
							{
							cityUpkeep += applyUpkeepBonus(config["upkeeps"][key]*unitCount,ArmyUpkeepBonus);
							}
						else if (isFleet(key))
							{
							cityUpkeep += applyUpkeepBonus(config["upkeeps"][key]*unitCount,FleetUpkeepBonus);
							}
						}
						
					if (unitCount == 0)
						{
						unitCount = "-";
						}
					else
						{
						sum[key] = (sum[key] == undefined) ? unitCount : sum[key] + unitCount;
						}
						
					var unitConstructionHTML = '<font class="More">-</font>';
					var unitConstruction = this._Parent.Str.To_Integer(getArrValue(getArrValue(city.units, ukey, undefined), "construction", 0), 0);
					
					if (config["upkeeps"][key] == undefined)
						{
						cityConstructionUpkeep = '?';
						}
					else if (cityConstructionUpkeep != '?')
						{
						if (isArmy(key))
							{
							cityConstructionUpkeep += applyUpkeepBonus(config["upkeeps"][key]*unitConstruction,ArmyUpkeepBonus);
							}
						else if (isFleet(key))
							{
							cityConstructionUpkeep += applyUpkeepBonus(config["upkeeps"][key]*unitConstruction,FleetUpkeepBonus);
							}
						}
						
					if (unitConstruction > 0)
						{
						unitConstructionHTML = '<font class="More" title="'+this._Parent.Intl.TT("currentlyBuilding")+'">'+this._Parent.Str.FormatBigNumber(unitConstruction, true)+'</font>';
						sumConstruction[key] = (sumConstruction[key] == undefined) ? unitConstruction : sumConstruction[key] + unitConstruction;
						}
					
					s += "<td unit='"+key+"' class='"+firstStyle+" "+key+"'>"+
										this._Parent.Str.FormatBigNumber(unitCount)+
										unitConstructionHTML+
										"</td>";
				
					lastTopic = orderedUnits[key];
					}
				}
			}
		else s += "<td class='lf'></td><td></td><td></td><td></td><td></td><td></td><td></td>";
		
		if (sumUpkeep != '?')
			{
			if (cityUpkeep != '?')
				{
				sumUpkeep += cityUpkeep;
				}
			else sumUpkeep = '?';
			}
		if (cityUpkeep == 0) cityUpkeep = '-';
		
		if (sumConstructionUpkeep != '?')
			{
			if (cityConstructionUpkeep != '?')
				{
				sumConstructionUpkeep += cityConstructionUpkeep;
				}
			else sumConstructionUpkeep = '?';
			}
		if (cityConstructionUpkeep == 0) cityConstructionUpkeep = '-';
		
		s += "<td class='upkeep lf'>"+(cityUpkeep != '-' ? this._Parent.Str.FormatBigNumber(-1*Math.round(cityUpkeep), true) : cityUpkeep)+"<font class='More'>"+(cityConstructionUpkeep != '-' ? this._Parent.Str.FormatBigNumber(-1*Math.round(cityConstructionUpkeep), true) : cityConstructionUpkeep)+"</font></td>";
		
		s += "</tr>";
		i++;
		if (odd == '') { odd = 'odd'; } else { odd = ''; }
		}
		
	s += "</tbody>";
	
	//s += "<tbody class='foreignCities'>";
	//s += "</tbody>";
	
	s += "<tfoot class='Summary'>";
	
	s += "<tr class='Units'>";
	
	s += "<td class='sigma' colspan=2><img vspace=2 hspace=5 src='skin/layout/sigma.gif'></td>";
	if (usedIndexesCount > 0)
		{
		var firstStyle = "";
		var lastTopic = '';
		for(key in orderedUnits)
			{
			if (usedIndexes[key] == 1)
				{
				if (lastTopic != orderedUnits[key]) { firstStyle = "lf"; } else { firstStyle = ""; }

				var unitConstructionHTML = '<font class="More">-</font>';
				if (sumConstruction[key] > 0)
					{
					unitConstructionHTML = '<font class="More">'+this._Parent.Str.FormatBigNumber(sumConstruction[key], true)+'</font>';
					}
				s += "<td unit='"+key+"' class='"+firstStyle+" "+key+"'>"+
								(sum[key] == undefined ? '-' : this._Parent.Str.FormatBigNumber(sum[key]))+
								unitConstructionHTML+
								"</td>";

				lastTopic = orderedUnits[key];
				}
			}
		}
	else s += "<td class='lf'></td><td></td><td></td><td></td><td></td><td></td><td></td>";
	
	if (sumUpkeep == 0) sumUpkeep = '-';
	if (sumConstructionUpkeep == 0) sumConstructionUpkeep = '-';
	s += "<td class='upkeep lf'>"+(sumUpkeep != '-' ? this._Parent.Str.FormatBigNumber(-1*Math.round(sumUpkeep), true) : sumUpkeep)+"<font class='More'>"+(sumConstructionUpkeep != '-' ? this._Parent.Str.FormatBigNumber(-1*Math.round(sumConstructionUpkeep), true) : sumConstructionUpkeep)+"</font></td>";
	
	s += "</tr>";
	
	s += "</tfoot>";
	
	s += "</table>";
	
	return s;
	};
	
EmpireBoard.Renders.UnitName_Tooltip_Content = function(unit_id)
	{
	return '<nobr>'+this._Parent.Intl.TT('unit '+unit_id,'army_units')+'</nobr>';
	};
	
EmpireBoard.Renders.Set_Common_Styles = function()
	{
	var default_style = <><![CDATA[
	#EmpireBoard {
		width: 990px;
		margin: -15px auto 20px;
		}
	
	#EmpireBoard.LtoR,
	#EmpireBoard.LtoR *	{
		direction: ltr;
		}
	
	#EmpireBoard.RtoL,
	#EmpireBoard.RtoL * {
		direction: rtl;
		}
	
	#EmpireBoard div.Table {
		margin-bottom: 2px;
		}
	
	#EmpireBoard table.Overview {
		width: 100% !important;
		margin-bottom: 2px;
		background-color: #F6EBBA; /* #FDF7DD */
		text-align: center;
		border-collapse: collapse;
		border: 3px double #CB9B6A;
		
		-moz-box-shadow: 3px 3px 7px rgba(93, 72, 41,0.50); 
		-webkit-box-shadow: 3px 3px 7px rgba(93, 72, 41,0.50);
		box-shadow: 3px 3px 7px rgba(93, 72, 41,0.50);
		}
		
	#EmpireBoard table.Overview thead {
		background: #F8E7B3 url(skin/input/button.gif) repeat-x scroll 0 bottom;
		}
	
	#EmpireBoard table.Overview tfoot { 
		background: #E7C680 url(skin/input/button.gif) repeat-x scroll 0 0;
		border-top: 2px solid #CB9B6A;
		}

	#EmpireBoard table.Overview tbody tr {
		border-top: 1px solid #ECCF8E;
		}
	
	#EmpireBoard table.Overview tfoot tr { 
		border-top: 1px solid #CB9B6A;
		}
	
	#EmpireBoard table.Overview tr.odd {
		background-color: #FDF1D4;
		}
	
	#EmpireBoard table.Overview tr.current {
		background-color: #FAE3B8;
		}
		
	#EmpireBoard table.Overview th,
	#EmpireBoard table.Overview td {
		border-left: 1px solid #ECCF8E;
		}
		
	#EmpireBoard.RtoL table.Overview th,
	#EmpireBoard.RtoL table.Overview td {
		border-left: inherit;
		border-right: 1px solid #ECCF8E;
		}
		
	#EmpireBoard table.Overview th {
		height: 22px;
		width: auto;
		padding: 1px;
		padding-bottom: 2px;
		padding-left: 3px;
		text-align: center !important;
		color: #542C0F; 
		font-weight: bold;
		text-shadow:0 1px #FFFFFF;
		}
		
	#EmpireBoard table.Overview td {
		height: auto;
		line-height: 12px;
		font-size: 11px;
		min-width: 10px;
		padding: 1px;
		vertical-align: top;
		text-align: right;
		color: #542C0F;
		text-shadow:0 1px #FFFFFF;
		}
		
	#EmpireBoard table.Overview th.lf,
	#EmpireBoard table.Overview td.lf {
		border-left: 2px solid #CB9B6A;
		}
	#EmpireBoard.RtoL table.Overview th.lf,
	#EmpireBoard.RtoL table.Overview td.lf {
		border-left: inherit;
		border-right: 2px solid #CB9B6A;
		}
		
	#EmpireBoard table.Overview th.nolf,
	#EmpireBoard table.Overview td.nolf {
		border-left: none;
		}
	#EmpireBoard.RtoL table.Overview th.nolf,
	#EmpireBoard.RtoL table.Overview td.nolf {
		border-left: inherit;
		border-right: none;
		}
		
	#EmpireBoard table.Overview th.city_name,
	#EmpireBoard table.Overview td.city_name {
		overflow: hidden;
		}

	#EmpireBoard table.Overview th.actions,
	#EmpireBoard table.Overview td.actions,
	#EmpireBoard table.Overview th.lfdash,
	#EmpireBoard table.Overview td.lfdash {
		border-left: 1px dashed #ECCF8E;
		}
	#EmpireBoard.RtoL table.Overview th.actions,
	#EmpireBoard.RtoL table.Overview td.actions,
	#EmpireBoard.RtoL table.Overview th.lfdash,
	#EmpireBoard.RtoL table.Overview td.lfdash {
		border-left: inherit;
		border-right: 1px dashed #ECCF8E;
		}
		
	#EmpireBoard table.Overview th.city_name {
		width: 95px !important;
		max-width: 95px;
		}
	#EmpireBoard.RtoL table.Overview th.city_name {}
	
	#EmpireBoard table.Overview th.actions {
		width: 62px;
		max-width: 62px;
		padding-left: 2px;
		padding-bottom: 3px;
		text-align: right !important;
		vertical-align: bottom;
		}

	#EmpireBoard table.Buildings th.build_name0,
	#EmpireBoard table.Buildings th.build_name1,
	#EmpireBoard table.Buildings th.build_name2,
	#EmpireBoard table.Buildings th.build_name3,
	#EmpireBoard table.Buildings th.build_name4,
	#EmpireBoard table.Buildings th.build_name5,
	#EmpireBoard table.Buildings th.build_name6,
	#EmpireBoard table.Buildings th.build_name7,
	#EmpireBoard table.Buildings th.build_name8,
	#EmpireBoard table.Buildings th.build_name9,
	#EmpireBoard table.Buildings th.build_name10,
	#EmpireBoard table.Buildings th.build_name11,
	#EmpireBoard table.Buildings th.build_name12 { max-width: 25px; overflow: hidden; cursor: default;}
	#EmpireBoard table.Buildings th.build_name2 { max-width: 45px;}
	#EmpireBoard table.Buildings th.build_name3 { max-width: 65px;}
	#EmpireBoard table.Buildings th.build_name4 { max-width: 80px;}
	#EmpireBoard table.Buildings th.build_name5 { max-width: 95px;}
	#EmpireBoard table.Buildings th.build_name6 { max-width: 105px;}
	#EmpireBoard table.Buildings th.build_name7 { max-width: 115px;}
	#EmpireBoard table.Buildings th.build_name8 { max-width: 125px;}
	#EmpireBoard table.Buildings th.build_name9 { max-width: 135px;}
	#EmpireBoard table.Buildings th.build_name10 { max-width: 140px;}
	#EmpireBoard table.Buildings th.build_name11 { max-width: 145px;}
	#EmpireBoard table.Buildings th.build_name12 { max-width: 150px;}
	
	#EmpireBoard table.Army th.unit_name { min-width: 25px; max-width: 35px; overflow: hidden; cursor: default;}
	
	#EmpireBoard table.Army th.upkeep { min-width: 20px; overflow: hidden; cursor: default; }

	#EmpireBoard table.Overview tfoot td { 
		font-weight: bold;
		}
	
	#EmpireBoard table.Buildings td {vertical-align: middle;}
	
	#EmpireBoard table.Overview td.city_name {
		width: 110px;
		max-width: 110px;
		padding-left: 3px;
		text-align: left;
		}
		
	#EmpireBoard.RtoL table.Overview td.city_name { text-align: right; }
	
	#EmpireBoard table.Overview td.actions {  text-align: right; }
	#EmpireBoard.RtoL table.Overview td.actions { }

	#EmpireBoard table.Overview th.actions img,
	#EmpireBoard table.Overview td.actions img { margin-left: 1px; border: none; max-height: 15px;}
	#EmpireBoard table.Overview td.actions img.Action { height: 12px; margin-bottom: 1px; }

	#EmpireBoard.RtoL table.Overview td.sigma {
		text-align: left;
		}
		
	#EmpireBoard table.Overview .More {
		font-size: 10px;
		line-height: 10px !important;
		height: 10px !important;
		margin-top:-1px;
		clear: both;
		display: block;
		cursor: default;
		text-shadow: none;
		}
	#EmpireBoard table.Resources .More { margin-top: 0px;}
	#EmpireBoard table.Overview tbody .More { color: #CB9B6A;}

	#EmpireBoard table.Buildings td.current {
		}
	#EmpireBoard table.Buildings td.current a {
		color: #542C0F;
		}

	/****************** progress bar styles *******************/
	#EmpireBoard table.Overview table.myPercent {
		height: 4px !important;
		width: 92%;
		margin-top: 1px;
		margin-left: 3px;
		margin-right: 2px;
		background-color: !transparent !important;
		}
	#EmpireBoard table.Overview table.myPercent td {
		height: 4px !important;
		min-width: 0px !important;
		padding: 0px !important;
		background-color: #CB9B6A;
		border: 1px solid #FDF7DD;
		}
	#EmpireBoard table.Overview table.myPercent td.Normal { background-color: #73443E;}
	#EmpireBoard table.Overview table.myPercent td.Warning { background-color: #8F1D1A;}
	#EmpireBoard table.Overview table.myPercent td.AlmostFull { background-color: #B42521;}
	#EmpireBoard table.Overview table.myPercent td.Full { background-color: #ff0000;}
	/****************** alerts *******************/
	#EmpireBoard sup {
		vertical-align: top !important;
		font-size: 9px;
		line-height: 9px;
		margin-left: 1px;
		}
	#EmpireBoard .Bold,
	#EmpireBoard .Brown,
	#EmpireBoard .DarkRed,
	#EmpireBoard .Red {font-weight: bold;}
	#EmpireBoard .Green {  color: green !important;}
	#EmpireBoard .Brown {  color: #8F1D1A !important;}
	#EmpireBoard .DarkRed {  color: #CC3300 !important;}
	#EmpireBoard .Red {  color: red !important;}
	#EmpireBoard img.Safe { height: 11px; }
	#EmpireBoard table.Overview td img.Safe {float: left; margin-left: 1px; margin-right: 1px;}

	/****************** footer *******************/

	#EmpireBoard p {text-align: left; display: block;  }
	#EmpireBoard.RtoL p {text-align: right;}
	#EmpireBoard p.Caption { font-size: 9px; margin: 0 2px;}

	#EmpireBoardSettings {}
	#EmpireBoardSettings td {border: none !important;}
	#EmpireBoardSettings input.button {margin-right: 5px;}
	
	#EmpireBoard #EmpireBoardAddons { float: left; text-align: left;}
	#EmpireBoard.RtoL #EmpireBoardAddons { text-align: right;}
	#EmpireBoardAddons u { font-weight: bold; }
	#EmpireBoardAddons li { list-style-type: disc; list-style-position: inside; padding-left: 15px; }

	#EmpireBoard p.Footer {text-align: right; clear: both;}
	#EmpireBoard.RtoL p.Footer {text-align: left;}
	#EmpireBoard p.Footer .button {}

	/****************** tooltip *******************/
	#EmpireBoardTooltip {
		position:absolute;
		z-index: 2000;
		}
	#WzTtDiV,
	#EmpireBoardTooltip {
		-moz-box-shadow: 2px 3px 3px rgba(0,0,0,0.3); 
		-webkit-box-shadow: 2px 3px 3px rgba(0,0,0,0.3); 
		box-shadow: 2px 3px 3px rgba(0,0,0,0.3); 
		}

	.TTContent {
		padding: 3px;
		color: #542C0F;
		background-color: #FDF7DD;
		border: 1px solid #BE8D53;
		border-top-width: 4px;
		}
	.TTTitle { font-weight: bold; background-color: #FAE0AE;padding: 3px; margin: -3px; margin-bottom:4px;}
	.RtoL .TTTitle { text-align: right; }
	
	.TTContent table tbody {background-color: #FAEAC6; border-bottom-width: 3px; border-bottom-color: #FDF7DD;border-bottom-style: solid;}
	.TTContent table tfoot {background-color: #FAE0AE;}
	.TTContent table td {padding: 2px; height: auto !important;}
	.TTContent table .Small td {
		padding-top: 0px;
		font-size: 10px !important;
		line-height: 10px !important;
		}
	.TTContent table td.Mission img { max-height: 15px;}
	]]></>.toXMLString();
	
	GM_addStyle(default_style);
	};

EmpireBoard.Renders.ArmyFleet_HeaderIcons = function(currentCityId)
	{
	var rHTML = '';
		
	rHTML += this.IconTo_safehouseReports(currentCityId);
	if (reportViewToSurvey('safehouse-reports') == '!')
		{
		rHTML += '<sup class=Red title="Require attention">!</sup>';
		}
	else
		{
		rHTML += '&nbsp;';
		}
	
	rHTML += '<a view="militaryAdvisorCombatReports" href="?view=militaryAdvisorCombatReports" title="View combat reports"><img align="absmiddle" src="skin/layout/medallie32x32_gold.gif"/></a>';
	// skin/layout/icon-helmet.gif
	if (reportViewToSurvey('militaryAdvisorCombatReports') == '!')
		{
		rHTML += '<sup class=Red title="Require attention">!</sup>';
		}
	else
		{
		rHTML += '&nbsp;';
		}
	
	rHTML += '<a view="militaryAdvisorMilitaryMovements" href="?view=militaryAdvisorMilitaryMovements" title="View military advisor"><img align="absmiddle" src="skin/relatedCities/general.gif"/></a>';
	// skin/layout/icon-helmet.gif
	if (reportViewToSurvey('militaryAdvisorMilitaryMovements') == '!')
		{
		rHTML += '<sup class=Red title="Require attention">!</sup>';
		}
	else
		{
		rHTML += '&nbsp;';
		}
	
	return rHTML;
	};

EmpireBoard.Renders.IconTo_safehouseReports = function(currentCityId,Title)
	{
	if (currentCityId == undefined) currentCityId = 0;
	if (Title == undefined) Title = "View espionage reports";
	var rHTML = '';
	var sCityId = 0;
	var sCityPos = -1;
	
	if (currentCityId > 0)	
		{
		sCityPos = getBuildingPosition(currentCityId, 'safehouse', -1);
		if (sCityPos > 0)
			{
			sCityId = currentCityId;
			}
		}
		
	if (sCityId == 0)
		{
		var Cities = this._Parent.DB.CurrentCities;
		for (CityId in Cities)
			{
			if (Cities[CityId].own != true) continue;
			sCityPos = getBuildingPosition(CityId, 'safehouse', -1);
			if (sCityPos > 0)
				{
				sCityId = CityId;
				break;
				}
			}
		}
		
	if ((sCityId == 0) || (sCityPos <= 0))
		{
		return '';
		}
	else
		{
		rHTML += '<a view="safehouse" tab="reports" cityid="'+sCityId+'" position="'+sCityPos+'" href="?view=safehouse&id='+sCityId+'&position='+sCityPos+'&tab=reports" title="'+Title+'"><img align="absmiddle" src="skin/buildings/x40_y40/safehouse.gif"/></a>';
		// skin/img/city/building_safehouse.gif
		return rHTML;
		}
	};
		
EmpireBoard.Renders.Buildings_HeaderIcons = function(currentCityId)
	{
	var rHTML = '';
	
	rHTML += this.IconTo_researchOverview(currentCityId);
	if (reportViewToSurvey('researchOverview') == '!')
		{
		rHTML += '<sup class=Red title="Require attention">!</sup>';
		}
	else
		{
		rHTML += '&nbsp;';
		}
	
	rHTML += this.IconTo_researchAdvisor();
	if (reportViewToSurvey('researchAdvisor') == '!')
		{
		rHTML += '<sup class=Red title="Require attention">!</sup>';
		}
	else
		{
		rHTML += '&nbsp;';
		}
	
	return rHTML;
	};
	
EmpireBoard.Renders.IconTo_researchAdvisor = function(Title)
	{
	if (Title == undefined) Title = "View research advisor";
	var rHTML = '';
		
	rHTML += '<a view="researchAdvisor" href="?view=researchAdvisor" title="'+Title+'"><img align="absmiddle" src="skin/resources/icon_scientist.gif"/></a>';
	
	return rHTML;
	};
		
EmpireBoard.Renders.IconTo_researchOverview = function(currentCityId,Title)
	{
	if (currentCityId == undefined) currentCityId = 0;
	if (Title == undefined) Title = "View research library";
	var rHTML = '';
		
	rHTML += '<a view="researchOverview" cityid="'+currentCityId+'" href="?view=researchOverview&id='+currentCityId+'" title="'+Title+'"><img align="absmiddle" src="skin/buildings/x40_y40/academy.gif"/></a>';
	// skin/icons/researchbonus_30x30.gif
	// skin/img/city/building_academy.gif
	return rHTML;
	};
		
EmpireBoard.Renders.Movements_Tooltip_Content = function(cityID)
	{
	var tooltip = "<table>";
	var orderedUnits = this._Parent.Ikariam.UnitsList();
	
	if (config["movements"] == undefined)
		{
		return '';
		}
	else if (config["movements"][cityID] != undefined)
		{
		for (key in config["movements"][cityID])
			{
			var arrivetime = config["movements"][cityID][key].endTime;
			if (arrivetime >= this._Parent.StartTime)
				{
				var tCityId = config["movements"][cityID][key].tCityId;
				var tCity ='';
				if ((this._Parent.DB.CurrentCities[tCityId] != undefined) && (this._Parent.DB.CurrentCities[tCityId].own == true))
					{
					tCity = config["movements"][cityID][key].tCityName;
					}
				else
					{
					tCity = config["movements"][cityID][key].tCityName+" ("+config["movements"][cityID][key].tPlayerName+")";
					}
				
				var tLocation = "";
				if (config["movements"][cityID][key].toLeft == true)
					{
					tLocation += "&laquo;";
					}
				else if (config["movements"][cityID][key].toRight == true)
					{
					tLocation += "&raquo;";
					}
				else
					{
					tLocation += "&laquo;&raquo;";
					}
				tLocation += "&nbsp;";
				tLocation += "<i>"+tCity+"</i>";
				
				var payload = '';
				if (config["movements"][cityID][key].payload != undefined)
					{
					for (utype in orderedUnits)
						{
						if (config["movements"][cityID][key].payload[utype] != undefined)
							{
							var ugender = this._Parent.Ikariam.Get_UnitGender(utype);
							if (ugender == 'army')
								{
								payload += config["movements"][cityID][key].payload[utype]+' <img align="absmiddle" height="18" src="/skin/characters/military/x40_y40/y40_'+utype+'_faceright.gif">&nbsp;';
								}
							else if (ugender == 'fleet')
								{
								payload += config["movements"][cityID][key].payload[utype]+' <img align="absmiddle" height="18" src="/skin/characters/fleet/40x40/'+utype+'_r_40x40.gif">&nbsp;';
								}
							}
						}
					}
				
				var counter = "(<font id='mytimecounter' counter='"+Math.round(arrivetime)+"' class='time_counter'>__:__:__</font>)";
				var smartDate = smartDateFormat(arrivetime);
					
				tooltip += "<tbody><tr>"+
						 "<td valign=top align=left class='Mission'><img src='"+this._Parent.Ikariam.Get_FleetMission_ImgSrc(config["movements"][cityID][key].mission)+"' /></td>"+
						 "<td valign=top align=right><nobr><b>"+config["movements"][cityID][key].summary+"</b></nobr>&nbsp;</td>"+
						 "<td valign=top align=left>"+tLocation+"</td>"+
						 "</tr><tr class=Small>"+
						 "<td class=Payload align=left valign=middle colspan=2><nobr>"+payload+"</nobr></td>"+
						 "<td align=right colspan=3>&nbsp;<nobr>"+smartDate+"&nbsp;"+counter+"</nobr></td>"+
						 "</tr></tbody>";
				}
			}
		}
	else
		{
		return '';
		}
	
	tooltip += "</table>";
	return tooltip;
	};
	
EmpireBoard.Renders.Attacks_Tooltip_Content = function(cityID)
	{
	var tooltip = "<table>";
	
	if (config["attacks"] == undefined)
		{
		return '';
		}
	else if (config["attacks"][cityID] != undefined)
		{
		for (key in config["attacks"][cityID])
			{
			var arrivetime = config["attacks"][cityID][key].endTime;
			if (arrivetime >= this._Parent.StartTime)
				{
				var tCityId = config["attacks"][cityID][key].oCityId;
				var tCity ='';
					
				tCity = config["attacks"][cityID][key].oCityName+" ("+config["attacks"][cityID][key].oPlayerName+")";
				
				var tLocation = "";
				tLocation += "<i>"+tCity+"</i>";
				tLocation += "&nbsp;";
				if (config["attacks"][cityID][key].toLeft == true)
					{
					tLocation += "&laquo;";
					}
				else if (config["attacks"][cityID][key].toRight == true)
					{
					tLocation += "&raquo;";
					}
				else
					{
					tLocation += "&laquo;&raquo;";
					}
				
				var counter = "(<font id='mytimecounter' counter='"+Math.round(arrivetime)+"' class='time_counter'>__:__:__</font>)";
				var smartDate = smartDateFormat(arrivetime);
					
				tooltip += "<tbody><tr>"+
						 "<td valign=top align=left class=Red>"+tLocation+"</td>"+
						 "<td valign=top align=left class='Mission'><img src='"+this._Parent.Ikariam.Get_FleetMission_ImgSrc(config["attacks"][cityID][key].mission)+"' /></td>"+
						 "<td valign=top align=right class=Red><b>"+config["attacks"][cityID][key].summary+"</b>&nbsp;</td>"+
						 "</tr><tr class=Small>"+
						 "<td align=right colspan=3>&nbsp;&nbsp;"+smartDate+"&nbsp;"+counter+"</td>"+
						 "</tr></tbody>";
				}
			}
		}
	else
		{
		return '';
		}
	
	tooltip += "</table>";
	return tooltip;
	};
	
EmpireBoard.Renders.ArrivingGoods_Tooltip_Content = function(city_id, resName)
	{
	var _nowTime = new Date().getTime();
	
	var tooltip = "<table>";
	
	var sum = 0;
	
	var city = getCity(city_id);
	var rows = getArrValue(config.arrivinggoods, city_id, []);
	var key;
	var higherTime = 0;
	for (key in rows)
		{
		var row = rows[key];
		var res = row["res"];
		var a = parseInt(getArrValue(res, resName, 0));
		var arrivetime = parseInt(getArrValue(row, "arrivetime", ""));
		if ((a > 0) && (arrivetime > city.prodtime))
			{
			sum += a;
			var startcity = getArrValue(row, "startcity", "");
			var quest = getArrValue(row, "quest", "");
			if (_nowTime >= arrivetime)
				{
				var counter = "(delivered)";
				var smartDate = '';
				}
			else if (quest == 'loading')
				{
				var counter = "(loading)";
				var smartDate = '';
				}
			else
				{
				if (arrivetime > higherTime) higherTime = arrivetime;
				var counter = "(<font id='mytimecounter' counter='"+Math.round(arrivetime)+"' class='time_counter'>__:__:__</font>)";
				var smartDate = smartDateFormat(arrivetime);
				}
			var fromLocation = "&laquo;&nbsp;<i>" + startcity + "</i>";
				
			tooltip += "<tbody><tr>"+
					 "<td valign=top>+</td>"+
					 "<td valign=top align=right><b>"+this._Parent.Str.FormatBigNumber(a) + "</b>&nbsp;</td>"+
					 "<td valign=top align=left>"+fromLocation+"</td>"+
					 "</tr><tr class=Small>"+
					 "<td align=right colspan=3>&nbsp;&nbsp;" + smartDate + "&nbsp;"+counter+"</td>"+
					 "</tr></tbody>";
			}
		}
	
	var tradinggoods = 0;
	var hourlyprod = 0;
	var resAmount = parseInt(getArrValue(city, resName, 0));
	if (resName == 'wood')
		{
		tradinggoods = city.tradewood;
		hourlyprod = city.prodwood;
		resAmount = getCurrentResourceAmount(_nowTime, city.prodtime, city.wood, city.prodwood);
		}
	else if (resName == 'wine')
		{
		tradinggoods = city.tradewine;
		var wineUsage = 0;
		var cellarLevel = getBuildingLevel(city_id, "vineyard", "-");
		if (city.wineUsageId != undefined)
			{
			wineUsage = tavernWineUsage[city.wineUsageId];
			if (cellarLevel != '-')
				{
				wineSave = wineUsage * cellarLevel;
				wineSave = Math.round(wineSave / 100);
				wineUsage = wineUsage - wineSave;
				}
			}
		hourlyprod = city.prodwine - wineUsage;
		resAmount = getCurrentResourceAmount(_nowTime, city.prodtime, city.wine, city.prodwine - wineUsage);
		}
	else if (resName == 'marble')
		{
		tradinggoods = city.trademarble;
		hourlyprod = city.prodmarble;
		resAmount = getCurrentResourceAmount(_nowTime, city.prodtime, city.marble, city.prodmarble);
		}
	else if (resName == 'glass')
		{
		tradinggoods = city.tradeglass;
		hourlyprod = city.prodglass;
		resAmount = getCurrentResourceAmount(_nowTime, city.prodtime, city.glass, city.prodglass);
		}
	else if (resName == 'sulfur')
		{
		tradinggoods = city.tradesulfur;
		hourlyprod = city.prodsulfur;
		resAmount = getCurrentResourceAmount(_nowTime, city.prodtime, city.sulfur, city.prodsulfur);
		}
		
	if ((tradinggoods != undefined) && (parseInt(tradinggoods) > 0))
		{
		sum += parseInt(tradinggoods);
		tooltip += "<tbody><tr>"+
						"<td>+</td>"+
						"<td align=right><b>"+this._Parent.Str.FormatBigNumber(parseInt(tradinggoods)) + "</b>&nbsp;</td>"+
						"<td align=left>&laquo;&nbsp;<i>" + this._Parent.Intl.TT('branchOffice','buildings') + "</i></td>"+
					"</tr></tbody>";
		}
		
	if (resAmount > 0)
		{
		tooltip += "<tbody><tr>"+
				 "<td>+</td>"+
				 "<td align=right><b>"+this._Parent.Str.FormatBigNumber(resAmount) + "</b>&nbsp;</td>"+
				 "<td align=left>&laquo;&nbsp;<i>" + this._Parent.Intl.TT('warehouse','buildings') + "</i></td>"+
				 "</tr></tbody>";
		}
			 
	if (sum > 0)
		{
		tooltip += "<tfoot><tr>"+
				 "<td>=</td>"+
				 "<td align=right><b>"+this._Parent.Str.FormatBigNumber(sum+resAmount) + "</b>&nbsp;</td>"+
				 "<td></td>"+
				 "</tr>";
		if ((hourlyprod != 0) && (higherTime > _nowTime + (1000 * 60 * 20)))
			{
			var restHours = (higherTime - _nowTime) / (1000 * 60 * 60);
			var prodSign = '+';
			if (hourlyprod < 0) prodSign = '-';
			tooltip += "<tr class=Small>"+
						"<td>"+prodSign+"</td>"+
						"<td align=right>"+this._Parent.Str.FormatBigNumber(Math.abs(hourlyprod)) + "&nbsp;</td>"+
						"<td align=left>x&nbsp;" + this._Parent.Str.FormatFloatNumber(restHours, 1) + this._Parent.Ikariam.LocalizationStrings('hour','timeunits','short')+"</td>"+
						"</tr>";
			tooltip += "<tr class=Small>"+
						"<td>=</td>"+
						"<td align=right>"+this._Parent.Str.FormatBigNumber(sum+resAmount+Math.floor(restHours*hourlyprod)) + "&nbsp;</td>"+
						"<td align=left>&raquo;&nbsp;" + smartDateFormat(higherTime)+"</td>"+
						"</tr>";
			}
		tooltip += "</tfoot>";
		}

	tooltip += "</table>";
	return tooltip;
	};

EmpireBoard.Ikariam =
	{
	_Parent:				 null,
	_View:					 null,
	_Tab:					 null,
	_Host:					 null,
	_Server:				 null,
	_Language:				 null,
	_Version:				 null,
	_Revision:				 null,
	_IsV031x:				 null,
	_IsV032x:				 null,
	_IsV033x:				 null,
	_IsV034x:				 null,
	_IsV035x:				 null,
	_IsV040x:				 null,
	_IsV041x:				 null,
	_IsV042x:				 null,
	_IsV0424:				 null,
	_IsV043x:				 null,
	_ActionRequest:			 null,
	_currentCity:			 null,
	_phpSet:				 null,
	_LocalizationStrings:	 null,
	_UnitsList:				 null,
	_BuildingsList:			 null,
	_IsLogged:				 null
	};
	
EmpireBoard.Ikariam.Init = function(parent)
	{
	this._Parent = parent;
	};

EmpireBoard.Ikariam.BuildingsList = function()
	{
	if (this._BuildingsList == null)
		{
		this._BuildingsList						 = {};
		this._BuildingsList['townHall']			 = 'growth';
		this._BuildingsList['palace']			 = 'growth';
		this._BuildingsList['palaceColony']		 = 'growth';
		this._BuildingsList['tavern']			 = 'growth';
		this._BuildingsList['museum']			 = 'growth';
		this._BuildingsList['academy']			 = 'research';
		this._BuildingsList['workshop']			 = 'research';
		this._BuildingsList['temple']			 = 'research';
		this._BuildingsList['embassy']			 = 'diplomacy';
		this._BuildingsList['warehouse']		 = 'trading';
		this._BuildingsList['dump']				 = 'trading';
		this._BuildingsList['port']				 = 'trading';
		this._BuildingsList['branchOffice']		 = 'trading';
		this._BuildingsList['wall']				 = 'military';
		this._BuildingsList['safehouse']		 = 'military';
		this._BuildingsList['barracks']			 = 'military';
		this._BuildingsList['shipyard']			 = 'military';
		this._BuildingsList['forester']			 = 'wood';
		this._BuildingsList['carpentering']		 = 'wood';
		this._BuildingsList['winegrower']		 = 'wine';
		this._BuildingsList['vineyard']			 = 'wine';
		this._BuildingsList['stonemason']		 = 'marble';
		this._BuildingsList['architect']		 = 'marble';
		this._BuildingsList['glassblowing']		 = 'crystal';
		this._BuildingsList['optician']			 = 'crystal';
		this._BuildingsList['alchemist']		 = 'sulfur';
		this._BuildingsList['fireworker']		 = 'sulfur';
		}
	return this._BuildingsList;
	};

EmpireBoard.Ikariam.Get_BuildingUsage = function(buildingName)
	{
	var buildingUsage = '';
	orderedBuildings = this.BuildingsList();
	if (orderedBuildings[buildingName] != undefined)
		{
		var arrayClassNames = orderedBuildings[buildingName].split(' ');
		buildingUsage = arrayClassNames[0];
		}
	return buildingUsage;
	};

EmpireBoard.Ikariam.UnitsList = function()
	{
	if (this._UnitsList == null)
		{
		this._UnitsList							 = {};
		this._UnitsList['phalanx']				 = 'army line1';
		this._UnitsList['steamgiant']			 = 'army line1';
		this._UnitsList['spearman']				 = 'army flank';
		this._UnitsList['swordsman']			 = 'army flank';
		this._UnitsList['slinger']				 = 'army line2';
		this._UnitsList['archer']				 = 'army line2';
		this._UnitsList['marksman']				 = 'army line2';
		this._UnitsList['ram']					 = 'army artillery';
		this._UnitsList['catapult']				 = 'army artillery';
		this._UnitsList['mortar']				 = 'army artillery';
		this._UnitsList['gyrocopter']			 = 'army air';
		this._UnitsList['bombardier']			 = 'army air';
		this._UnitsList['cook']					 = 'army support';
		this._UnitsList['medic']				 = 'army support';
		this._UnitsList['ship_ram']				 = 'fleet line1';
		this._UnitsList['ship_flamethrower']	 = 'fleet line1';
		this._UnitsList['ship_steamboat']		 = 'fleet line1';
		this._UnitsList['ship_ballista']		 = 'fleet line2';
		this._UnitsList['ship_catapult']		 = 'fleet line2';
		this._UnitsList['ship_mortar']			 = 'fleet line2';
		this._UnitsList['ship_submarine']		 = 'fleet submarine';
		}
	return this._UnitsList;
	};
	
EmpireBoard.Ikariam.Get_UnitGender = function(unitType)
	{
	var unitGender = '';
	orderedUnits = this.UnitsList();
	if (orderedUnits[unitType] != undefined)
		{
		var arrayClassNames = orderedUnits[unitType].split(' ');
		unitGender = arrayClassNames[0];
		}
	return unitGender;
	};

EmpireBoard.Ikariam.Is_Logged = function()
	{
	if (this._IsLogged == null)
		{
		this._IsLogged = this._Parent.DOM.Has_Node("//div[@id='GF_toolbar']//li[contains(@class,'logout')]");
		this._Parent.Log.Add('User logged : '+(this._IsLogged == true ? 'yes' : 'no'));
		}
		
	return this._IsLogged;
	};

EmpireBoard.Ikariam.View = function()
	{
	if (this._View == null)
		{
		this._View = '';
		
		if (this.phpSet('currentView') != undefined)
			{
			this._View = this.phpSet('currentView');
			}
		else
			{
			// Fetch view name
			try
				{
				this._View = document.getElementsByTagName("body")[0].id;
				}
			catch (e)
				{
				var url_view = /[\?&]view=([a-zA-Z0-9\-_]+)/.exec(document.URL);
				if (url_view != null) this._View = RegExp.$1;
				}
			}
		
		this._Parent.Log.Add('View = '+this._View);
		}
		
	return this._View;
	};
	
EmpireBoard.Ikariam.Host = function()
	{
	if (this._Host == null)
		{
		this._Host = '';
		
		this._Host = document.location.host;
		}
		
	return this._Host;
	};
	
EmpireBoard.Ikariam.Server = function(host)
	{
	if (this._Server == null)
		{
		if (host == undefined) host = this.Host();
		this._Server = '';
		
		var parts = host.split(".");
		var idx = 0;
		if (parts[0] == 'www') idx++;
		this._Server = parts[idx];
		}
	
	return this._Server;
	};

EmpireBoard.Ikariam.Language = function()
	{
	if (this._Language == null)
		{
		if (this.LocalizationStrings('language') != undefined)
			{
			this._Language = this.LocalizationStrings('language');
			}
		else
			{
			this._Language = '';
			
			var sCode = '';
			var scripts = document.getElementsByTagName("script");
			for (var j = 0; j < scripts.length; j++)
				{
				var nScript = scripts[j];
				sCode = nScript.innerHTML;
				if (sCode.indexOf('LocalizationStrings') >= 0)
					{
					break;
					}
				}
			
			if (sCode != '')
				{
				var reg = /LocalizationStrings\['language'\]\s+=\s+'(.+)';/;
				var res = reg.exec(sCode);
				if (res != null) this._Language = res[1];
				}
			}
			
		//if (this._Language == '') this._Language = 'en';
		}
	return this._Language;
	};
	
EmpireBoard.Ikariam.Grab_JSCompleteScript_Version = function(defaultVersion)
	{
	// Requires: DOM
	var Version = '';
	if (defaultVersion != undefined) Version = defaultVersion;
	
	var JSCompleteScript = this._Parent.DOM.Get_First_Node("//script[contains(@src,'/js/complete')]");
	if (JSCompleteScript != null)
		{
		var JSCompleteSrc = JSCompleteScript.src;
		var JSCompleteRegExp = /complete-([0-9]+\.[0-9]+\.[0-9]+)/.exec(JSCompleteSrc);
		if (JSCompleteRegExp != null)
			{
			Version = RegExp.$1;
			}
		}
		
	return Version;
	};
	
EmpireBoard.Ikariam.Version = function()
	{
	// Requires: DOM
	if (this._Version == null)
		{
		this._Version = '';
		
		this._Version = this._Parent.DOM.Get_First_Node_TextContent("//div[@id='GF_toolbar']//li[@class='version']//span[@class='textLabel']",'');
		
		// remove "v."
		this._Version = this._Version.replace(/v\./gi, "");
		// remove "v"
		this._Version = this._Version.replace(/v/gi, "");
		// build number use space separator
		this._Version = this._Version.replace(/ /gi, ".");
		
		if (this._Version == '0.4.X')
			{
			this._Version = this.Grab_JSCompleteScript_Version('0.4.3');
			}
		
		this._Parent.Log.Add("Ikariam server version: "+this._Version);
		}
	
	return this._Version;
	};

EmpireBoard.Ikariam.Revision = function()
	{
	// Requires: DOM, Str
	if (this._Revision == null)
		{
		this._Revision = 0;
		
		this._Revision = this._Parent.Str.To_Integer(this._Parent.DOM.Get_First_Node_Title("//div[@id='GF_toolbar']//li[@class='version']//span[@class='textLabel']",'0'), 0);
		
		this._Parent.Log.Add("Ikariam server revision: "+this._Revision);
		}
	
	return this._Revision;
	};
	
// NB: return true if higher than 0.3.1
EmpireBoard.Ikariam.Is_Version_031x = function()
	{
	// Requires: Str
	if (this._IsV031x == null)
		{
		if (this._Parent.Str.Compare_Versions('0.3.1', this.Version()) >= 0)
			{
			this._IsV031x = true;
			this._Parent.Log.Add("Ikariam server is v.0.3.1 or higher");
			}
		else
			{
			this._IsV031x = false;
			}
		}
	
	return this._IsV031x;
	};
	
// NB: return true if higher than 0.3.2
EmpireBoard.Ikariam.Is_Version_032x = function()
	{
	// Requires: Str
	if (this._IsV032x == null)
		{
		if (this._Parent.Str.Compare_Versions('0.3.2', this.Version()) >= 0)
			{
			this._IsV031x = true;
			this._IsV032x = true;
			this._Parent.Log.Add("Ikariam server is v.0.3.2 or higher");
			}
		else
			{
			this._IsV032x = false;
			}
		}
	
	return this._IsV032x;
	};
	
// NB: return true if higher than 0.3.3
EmpireBoard.Ikariam.Is_Version_033x = function()
	{
	// Requires: Str
	if (this._IsV033x == null)
		{
		if (this._Parent.Str.Compare_Versions('0.3.3', this.Version()) >= 0)
			{
			this._IsV031x = true;
			this._IsV032x = true;
			this._IsV033x = true;
			this._Parent.Log.Add("Ikariam server is v.0.3.3 or higher");
			}
		else
			{
			this._IsV033x = false;
			}
		}
	
	return this._IsV033x;
	};
	
// NB: return true if higher than 0.3.4
EmpireBoard.Ikariam.Is_Version_034x = function()
	{
	// Requires: Str
	if (this._IsV034x == null)
		{
		if (this._Parent.Str.Compare_Versions('0.3.4', this.Version()) >= 0)
			{
			this._IsV031x = true;
			this._IsV032x = true;
			this._IsV033x = true;
			this._IsV034x = true;
			this._Parent.Log.Add("Ikariam server is v.0.3.4 or higher");
			}
		else
			{
			this._IsV034x = false;
			}
		}
	
	return this._IsV034x;
	};
	
EmpireBoard.Ikariam.Is_Version_035x = function()
	{
	// Requires: Str
	if (this._IsV035x == null)
		{
		if (this._Parent.Str.Compare_Versions('0.3.5', this.Version()) >= 0)
			{
			this._IsV031x = true;
			this._IsV032x = true;
			this._IsV033x = true;
			this._IsV034x = true;
			this._IsV035x = true;
			this._Parent.Log.Add("Ikariam server is v.0.3.5 or higher");
			}
		else
			{
			this._IsV035x = false;
			}
		}
	
	return this._IsV035x;
	};
	
EmpireBoard.Ikariam.Is_Version_040x = function()
	{
	// Requires: Str
	if (this._IsV040x == null)
		{
		if (this._Parent.Str.Compare_Versions('0.4.0', this.Version()) >= 0)
			{
			this._IsV031x = true;
			this._IsV032x = true;
			this._IsV033x = true;
			this._IsV034x = true;
			this._IsV035x = true;
			this._IsV040x = true;
			this._Parent.Log.Add("Ikariam server is v.0.4.0 or higher");
			}
		else
			{
			this._IsV040x = false;
			}
		}
	
	return this._IsV040x;
	};
	
EmpireBoard.Ikariam.Is_Version_041x = function()
	{
	// Requires: Str
	if (this._IsV041x == null)
		{
		if (this._Parent.Str.Compare_Versions('0.4.1', this.Version()) >= 0)
			{
			this._IsV031x = true;
			this._IsV032x = true;
			this._IsV033x = true;
			this._IsV034x = true;
			this._IsV035x = true;
			this._IsV040x = true;
			this._IsV041x = true;
			this._Parent.Log.Add("Ikariam server is v.0.4.1 or higher");
			}
		else
			{
			this._IsV041x = false;
			}
		}
	
	return this._IsV041x;
	};
	
EmpireBoard.Ikariam.Is_Version_042x = function()
	{
	// Requires: Str
	if (this._IsV042x == null)
		{
		if (this._Parent.Str.Compare_Versions('0.4.2', this.Version()) >= 0)
			{
			this._IsV031x = true;
			this._IsV032x = true;
			this._IsV033x = true;
			this._IsV034x = true;
			this._IsV035x = true;
			this._IsV040x = true;
			this._IsV041x = true;
			this._IsV042x = true;
			this._Parent.Log.Add("Ikariam server is v.0.4.2 or higher");
			}
		else
			{
			this._IsV042x = false;
			}
		}
	
	return this._IsV042x;
	};
	
EmpireBoard.Ikariam.Is_Version_0424 = function()
	{
	// Requires: Str
	if (this._IsV0424 == null)
		{
		if (this._Parent.Str.Compare_Versions('0.4.2.4', this.Version()) >= 0)
			{
			this._IsV031x = true;
			this._IsV032x = true;
			this._IsV033x = true;
			this._IsV034x = true;
			this._IsV035x = true;
			this._IsV040x = true;
			this._IsV041x = true;
			this._IsV042x = true;
			this._IsV0424 = true;
			this._Parent.Log.Add("Ikariam server is v.0.4.2.4 or higher");
			}
		else
			{
			this._IsV0424 = false;
			}
		}
	
	return this._IsV0424;
	};
	
EmpireBoard.Ikariam.Is_Version_043x = function()
	{
	// Requires: Str
	if (this._IsV043x == null)
		{
		if (this._Parent.Str.Compare_Versions('0.4.3', this.Version()) >= 0)
			{
			this._IsV031x = true;
			this._IsV032x = true;
			this._IsV033x = true;
			this._IsV034x = true;
			this._IsV035x = true;
			this._IsV040x = true;
			this._IsV041x = true;
			this._IsV042x = true;
			this._IsV0424 = true;
			this._IsV043x = true;
			this._Parent.Log.Add("Ikariam server is v.0.4.3 or higher");
			}
		else
			{
			this._IsV043x = false;
			}
		}
	
	return this._IsV043x;
	};
	
EmpireBoard.Ikariam.Tab = function()
	{
	if (this._Tab == null)
		{
		this._Tab = '';
		var url_view = /[\?&]tab=([a-zA-Z0-9\-_]+)/.exec(document.URL);
		if (url_view != null) this._Tab = RegExp.$1;
		}
		
	return this._Tab;
	};
	
EmpireBoard.Ikariam.Trim_Coords = function(str)
	{
	// Require: Str
	return this._Parent.Str.Trim(this._Parent.Str.Trim_Accodances(str));
	};
	
EmpireBoard.Ikariam.Trim_PlayerName = function(str)
	{
	// Require: Str
	return this._Parent.Str.Trim(this._Parent.Str.Trim_Brackets(str));
	};
	
EmpireBoard.Ikariam.Trim_Unit = function(str)
	{
	// Require: Str
	str = str.replace("unit", "");
	str = str.replace("currentUnit", "");
	 
	return this._Parent.Str.Trim(str);
	};

EmpireBoard.Ikariam.TwoDigit_Coords = function(str)
	{
	// Require: Str
	var a = str.indexOf('[');
	var b = str.indexOf(']');
	str = str.substring(a+1,b);
	var coords = str.split(':');
	res = '[';
	res += this._Parent.Str.TwoDigit(coords[0].substr(-2,2));
	res += ':';
	res += this._Parent.Str.TwoDigit(coords[1].substr(-2,2));
	res += ']';
	return res;
	};

EmpireBoard.Ikariam.City_Object = function()
	{
	var City = new Object;
	
	City.id			 = 0;
	City.name		 = '';
	//City.playername	 = '';
	//City.islandid		 = 0;
	
	City.knownTime	 = new Date().getTime();
	
	//City.own			 = false;
	//City.occupied		 = false;
	//City.deployed		 = false;
	
	//City.selected		 = false;
	
	return City;
	};
	
EmpireBoard.Ikariam.Parse_Coords = function(str)
	{
	var res = null;
	
	if ((str != undefined) && (str != null) && (str != ''))
		{
		var resReg = /(\[[0-9:]+\])/.exec(str);
		if (resReg != null)
			{
			res = resReg[1];
			}
		}
		
	return res;
	};
			
EmpireBoard.Ikariam.Fetch_CitiesSelect = function(database, includeForeign)
	{
	// Requires: DOM, Str
	if (database == undefined)			 database = {};
	if (includeForeign == undefined)	 includeForeign = false;
	
	var Options = this._Parent.DOM.Get_Nodes("//select[@id='citySelect']/option");
	if (Options != null)
		{
		for (var i=0; i < Options.snapshotLength; i++)
			{
			var Option = Options.snapshotItem(i);
			
			// Occupied city ?
			var isOccupied = false;
			if (this._Parent.DOM.Has_ClassName(Option,'occupiedCities'))
				{
				isOccupied = true;
				}
			
			// Deployed troops into allied city
			var isDeployed = false;
			if (this._Parent.DOM.Has_ClassName(Option,'deployedCities'))
				{
				isDeployed = true;
				}
				
			if ((includeForeign == false) && ((isOccupied == true) || (isDeployed == true))) continue;
			
			var CityId = parseInt(Option.value);
			
			if (database[CityId] == undefined)
				{
				database[CityId] = new this.City_Object();
				}
			
			database[CityId].id = CityId;
			database[CityId].name = this.Trim_Coords(Option.textContent);
			if (isOccupied == true)
				{
				database[CityId].occupied = true;
				}
			else if (isDeployed == true)
				{
				database[CityId].deployed = true;
				}
			else
				{
				database[CityId].own = true;
				}
			
			if (Option.selected == true) database[CityId].selected = true;
			
			this._Parent.Log.Add('Fetch select list: city ['+CityId+'], '+database[CityId].name+', selected='+database[CityId].selected);
			}
		}
	
	return database;
	};

EmpireBoard.Ikariam.ActionRequest = function()
	{
	if (this._ActionRequest == null)
		{
		this._ActionRequest = this._Parent.DOM.Get_First_Node_Value("//form[@id='changeCityForm']//input[@type='hidden' and @name='actionRequest']" ,'');
		}
		
	return this._ActionRequest;
	};
	
EmpireBoard.Ikariam.Get_FleetMission_ImgSrc = function(mission)
	{
	// Values: deployarmy, deployfleet, plunder, blockade, defend, defend_port, trade, transport, occupy
	var tag = '';
	
	tag = 'skin/interface/mission_' + mission + '.gif';
	
	return tag;
	};
	
EmpireBoard.Ikariam.Get_Happiness_ImgSrc = function(growth)
	{
	if (growth == undefined) growth = 0;
	var imagen = '';
	var tag = '';
	
	if (growth < -6 )
		{
		imagen = 'outraged';
		}
	else if (growth < 0)
		{
		imagen = 'sad';
		}
	else if (growth < 1)
		{
		imagen = 'neutral';
		}
	else if (growth < 6)
		{
		imagen = 'happy';
		}
	else
		{
		imagen = 'ecstatic';
		}
	//tag = 'skin/smilies/' + imagen + '.gif';
	//tag = 'skin/smilies/'+imagen+'_x32.gif';
	tag = 'skin/smilies/'+imagen+'_x25.gif';
	
	return tag;
	};
	
EmpireBoard.Ikariam.Resource_Capacity = function(ResType, WarehouseLevel, DumpLevel, Bonus)
	{
	if (ResType == undefined) ResType = 'wine';
	if (WarehouseLevel == undefined) WarehouseLevel = 0;
	if (DumpLevel == undefined) DumpLevel = 0;
	if (Bonus == undefined) Bonus = 0;
	
	var result = 0;
	
	if (this.Is_Version_031x() == true)
		{
		result = 1500;
		}
	else
		{
		if (ResType == 'wood')
			{
			result = 3000;
			}
		else
			{
			result = 1500;
			}
		}
	result = result + (WarehouseLevel * 8000);
	result = result + (DumpLevel * 32000);
	
	return result + (result/100*Bonus);
	};

EmpireBoard.Ikariam.Resource_SafeCapacity = function(ResType, WarehousesLevels, Bonus)
	{
	var _self = this;
	
	if (ResType == undefined) ResType = 'wine';
	if (WarehousesLevels == undefined) WarehousesLevels = 0;
	if (Bonus == undefined) Bonus = 0;
	
	function SafeCapacityPerWarehouse(ResType, WarehouseLevel)
		{
		if (_self.Is_Version_033x() == true)
			{
			return (WarehouseLevel * 480);
			}
		else if (_self.Is_Version_031x() == true)
			{
			return (WarehouseLevel * 80);
			}
		else
			{
			if (ResType == 'wood')
				{
				return (WarehouseLevel * 160);
				}
			else
				{
				return (WarehouseLevel * 80);
				}
			}
		}
		
	function isArray(obj)
		{
		if (obj.constructor.toString().indexOf("Array") == -1)
			return false;
		else
			return true;
		}
	
	var result = 0;
	
	if (this.Is_Version_034x() == true)
		{
		result = 100;
		
		if (isArray(WarehousesLevels))
			{
			var WarehousesLevel = 0;
			if (WarehousesLevels.length <= 4)
				{
				var p;
				for (p in WarehousesLevels)
					{
					WarehousesLevel += WarehousesLevels[p];
					}
				}
			else
				{
				WarehousesLevels.sort(function(a,b){return b - a});
				for (var i=0; i<=3; i++)
					{
					WarehousesLevel += WarehousesLevels[i];
					}
				}
			result += SafeCapacityPerWarehouse(ResType, WarehousesLevel);
			}
		else
			{
			result += SafeCapacityPerWarehouse(ResType, parseInt(WarehousesLevels));
			}
		}
	else
		{
		var WarehousesLevel = 0;
		if (isArray(WarehousesLevels))
			{
			var p;
			for (p in WarehousesLevels)
				{
				WarehousesLevel += WarehousesLevels[p];
				}
			}
		else
			{
			WarehousesLevel = parseInt(WarehousesLevels);
			}
		
		if (this.Is_Version_031x() == true)
			{
			result = 100;
			result += SafeCapacityPerWarehouse(ResType, WarehousesLevel);
			}
		else
			{
			if (ResType == 'wood')
				{
				result = 100;
				result += SafeCapacityPerWarehouse(ResType, WarehousesLevel);
				}
			else
				{
				result = 50;
				result += SafeCapacityPerWarehouse(ResType, WarehousesLevel);
				}
			}
		}
	
	return result + (result/100*Bonus);
	};
	
EmpireBoard.Ikariam.MerchantNavyBox_Object = function()
	{
	var MerchantNavyBox				 = new Object;
	
	//MerchantNavyBox.id			 = '';
	
	MerchantNavyBox.title			 = '';
	//MerchantNavyBox.length				 = ''; // Number of missions
	//MerchantNavyBox.missions				 = {};
	
	return MerchantNavyBox;
	};

EmpireBoard.Ikariam.NavyTransport_Object = function()
	{
	var NavyTransport			 = new Object;
	
	//NavyTransport.id			 = '';
	
	//NavyTransport.oCityId			 = 0;
	//NavyTransport.oCityName			 = '';
	//NavyTransport.oPlayerName		 = '';
	
	NavyTransport.ETA		 = '';
	NavyTransport.RET		 = '';
	
	return NavyTransport;
	};
	
EmpireBoard.Ikariam.Fetch_TimeCounters = function(database, objectName)
	{
	if (database == undefined)			 database			 = {};
	if (objectName == undefined)		 objectName			 = 'getCountdown';
	
	this._Parent.Log.Add("Start to fetch '"+objectName+"' time counters");
	// Fetch time counters
	var scripts = document.getElementsByTagName("script");
	for (var j = 0; j < scripts.length; j++)
		{
		var nScript = scripts[j];
		var sCode = nScript.innerHTML;
		if (sCode.indexOf(objectName) > 0)
			{
			var aCodeLines = sCode.split(';');
			for (var i=0; i < aCodeLines.length; i++)
				{
				var sValues = aCodeLines[i].substring(aCodeLines[i].indexOf('{')+1,aCodeLines[i].indexOf('}'));
				var sParts = sValues.split(',');
				if (sParts.length >= 3)
					{
					var CounterValues = new Object;
					var CounterId = '';
					for (var k=0; k < sParts.length; k++)
						{
						var sPartPeer = sParts[k].split(':');
						var sPartName = this._Parent.Str.Trim(sPartPeer[0]);
						var sPartValue = this._Parent.Str.Trim(sPartPeer[1]);
						
						if (sPartName == 'el')
							{
							sPartValue = this._Parent.Str.Trim_DoubleQuotes(sPartValue);
							CounterId = ''+sPartValue;
							}
						else
							{
							sPartValue = 1000*parseInt(sPartValue);
							}
							
						CounterValues[sPartName]=sPartValue;
						//this._Parent.Log.Add("TimeCounter."+sPartName+" = "+CounterValues[sPartName]);
						}
					
					if (CounterId != '')
						{
						database[CounterId] = CounterValues;
						
						//this._Parent.Log.Add("TimeCounter["+CounterId+"] found");
						}
					}
				}
			}
		}
		
	return database;
	};
	
EmpireBoard.Ikariam.Fetch_MerchantNavy_Boxes = function(boxesDB, includeMissions)
	{
	// Require: DOM, Str
	this._Parent.Log.Add('Start fetch MerchantNavy boxes...');
	var StartTime = new Date().getTime();
	if (boxesDB == undefined)			 boxesDB			 = {};
	if (includeMissions == undefined)	 includeMissions	 = false;
	
	function grabCityID(rootElt)
		{
		var resID = 0;
		var alinks = rootElt.getElementsByTagName("a");
		for (var k=0; k < alinks.length; k++)
			{
			var resReg = /[\?&]{1}cityId=([0-9]+)&?/i.exec(alinks[k].href);
			if (resReg != null)
				{
				resID = parseInt(resReg[1]);
				break;
				}
			}
		
		return resID;
		}
		
	var contentBoxes = this._Parent.DOM.Get_Nodes("//div[@id='mainview']/div[contains(@class, 'contentBox')]");
	if (contentBoxes.snapshotLength > 0)
		{
		this._Parent.Log.Add('Found '+contentBoxes.snapshotLength+' contentBox');
		
		for (var i=0; i < contentBoxes.snapshotLength; i++)
			{
			var contentBox = contentBoxes.snapshotItem(i);
			var boxId = contentBox.id;
			if (boxId == '')
				{
				boxId = 'contentBox'+(i+1);
				contentBox.id = boxId;
				}
			
			if (boxesDB[boxId] == undefined)
				{
				boxesDB[boxId] = new this.MerchantNavyBox_Object();
				}
			boxesDB[boxId].id = boxId;
				
			var h3s = contentBox.getElementsByTagName("h3");
			boxesDB[boxId].title = h3s[0].textContent;
			
			var Missions = this._Parent.DOM.Get_Nodes("//div[@id='mainview']/div[@id='"+boxId+"']//td[contains(@class, 'mission')]");
			boxesDB[boxId].length = Missions.snapshotLength;
			this._Parent.Log.Add('contentBox['+boxId+']: '+boxesDB[boxId].title+', '+boxesDB[boxId].length+' missions');

			if ((includeMissions == true) && (Missions.snapshotLength >= 1))
				{
				boxesDB[boxId].missions = {};
				for (var j=0; j < Missions.snapshotLength; j++)
					{
					var nMi = Missions.snapshotItem(j);
					var tr = nMi.parentNode;
					var tds = tr.getElementsByTagName("td");
					var tdslength = tds.length;
					//var tds = tr.childNodes;
					
					var missionId = '';
					if (tdslength == 6)
						{
						// pillaging under 0.4.3
						var ETA = tds[4].id;
						var RET = tds[4].id;
						}
					else if (this._Parent.DOM.Has_ClassName(tds[4],'speed'))
						{
						// transport under 0.4.3
						var ETA = tds[5].id;
						var RET = tds[5].id;
						}
					else if (this._Parent.DOM.Has_ClassName(tds[5],'speed'))
						{
						// transport under 0.4.2
						var ETA = tds[4].id;
						var RET = tds[6].id;
						}
					else
						{
						var ETA = tds[4].id;
						var RET = tds[5].id;
						}
					if (ETA != '')
						{
						missionId = ETA;
						}
					else if (RET != '')
						{
						missionId = RET;
						}
					
					if (missionId != '')
						{
						if (boxesDB[boxId].missions[missionId] == undefined)
							{
							boxesDB[boxId].missions[missionId] = new this.NavyTransport_Object();
							}
						boxesDB[boxId].missions[missionId].id = missionId;
						
						if (ETA != '')
							{
							boxesDB[boxId].missions[missionId].ETA = ETA;
							}
						
						if (RET != '')
							{
							boxesDB[boxId].missions[missionId].RET = RET;
							}
							
						boxesDB[boxId].missions[missionId].oCityId = grabCityID(tds[1]);
						
						//this._Parent.Log.Add('NavyTransport['+missionId+']: oCityId='+boxesDB[boxId].missions[missionId].oCityId);
						}
					}
				}
			}
		}
	
	return boxesDB;
	};

EmpireBoard.Ikariam.FleetMovement_Object = function()
	{
	var FleetMovement			 = new Object;
	
	//FleetMovement.id				 = '';
	
	//FleetMovement.own				 = false;
	//FleetMovement.hostile			 = false;
	
	FleetMovement.time			 = 0;
	
	//FleetMovement.summary			 = '';
	//FleetMovement.payload			 = {};
	//FleetMovement.hasFleet			 = false;
	//FleetMovement.hasGoods			 = false;
	//FleetMovement.hasArmy			 = false;
	
	//FleetMovement.oCityId			 = 0;
	//FleetMovement.oCityName			 = '';
	//FleetMovement.oPlayerName		 = '';
	//FleetMovement.toLeft				 = false;
	//FleetMovement.mission			 = '';
	// Values: deployarmy, deployfleet, plunder, blockade, defend, defend_port, trade, transport, occupy
	//FleetMovement.subject			 = '';
	//FleetMovement.toRight			 = false;
	//FleetMovement.tCityId			 = 0;
	//FleetMovement.tCityName			 = '';
	//FleetMovement.tPlayerName			 = '';
	
	//FleetMovement.hasAction			 = false;
	
	return FleetMovement;
	};
	
EmpireBoard.Ikariam.Fetch_FleetMovements = function(database)
	{
	// Require: DOM, Str
	var StartTime = new Date().getTime();
	this._Parent.Log.Add('Start fetch movements...');
	if (database == undefined) database = {};
	
	var _self = this;
	
	function grabCityID(rootElt)
		{
		var resID = 0;
		var alinks = rootElt.getElementsByTagName("a");
		for (var k=0; k < alinks.length; k++)
			{
			var resReg = /[\?&]{1}cityId=([0-9]+)&?/i.exec(alinks[k].href);
			if (resReg != null)
				{
				resID = parseInt(resReg[1]);
				break;
				}
			}
		
		return resID;
		}
		
	function TrimIcon(src)
		{
		var str = '';

		var parsedURL = src.split('/');
		if (parsedURL.length > 0)
			{
			str = parsedURL[parsedURL.length-1];
			}
		
		str = str.replace(".gif", "");
		str = str.replace("40x40", "");
		str = str.replace("60x60", "");
		str = str.replace("_r_", "");
		str = str.replace("y40_", "");
		str = str.replace("_faceright", "");
		str = str.replace("icon_", "");
		
		return _self._Parent.Str.Trim(str);
		}

	var resMi = this._Parent.DOM.Get_Nodes("//div[@id='fleetMovements']//table[contains(@class, 'locationEvents')]/tbody/tr/td/img[contains(@src, 'mission_')]");
	if (resMi.snapshotLength > 0)
		{
		this._Parent.Log.Add('Found '+resMi.snapshotLength+' fleets');
		
		// heures
		var mTimers = {};
		var scripts = document.getElementsByTagName("script");
		for (var j = 0; j < scripts.length; j++)
			{
			// search getCountdown
			var nScript = scripts[j];
			var sCode = nScript.innerHTML;
			if (sCode.indexOf('getCountdown') >= 0)
				{
				var aCodeLines = sCode.split(';');
				for (var i=0; i < aCodeLines.length-1; i++)
					{
					if (aCodeLines[i].indexOf('getCountdown') >= 0)
						{
						var sValues = aCodeLines[i].substring(aCodeLines[i].indexOf('{')+1,aCodeLines[i].indexOf('}'));
						var sParts = sValues.split(',');
						if (sParts.length >= 3)
							{
							var sPart0 = sParts[0].split(':');
							var enddate = 1000*parseInt(this._Parent.Str.Trim(sPart0[1]));
							
							var sPart1 = sParts[1].split(':');
							var currentdate = 1000*parseInt(this._Parent.Str.Trim(sPart1[1]));
							
							var sID = sParts[2].substring(sParts[2].indexOf('"')+1,sParts[2].indexOf('"',sParts[2].indexOf('"')+2));
							
							if ((enddate - currentdate) > 0)
								{
								mTimers[sID] = StartTime + (enddate - currentdate);
								}
							}
						else
							{
							this._Parent.Log.Add("Failed to fetch getCountdown");
							}
						}
					}
				}
			}
		
		for (var i=0; i < resMi.snapshotLength; i++)
			{
			var tr = resMi.snapshotItem(i).parentNode.parentNode;
			var tds = tr.getElementsByTagName("td");
			//var tds = tr.childNodes;
				
			var fleetId = this._Parent.Str.Trim(tds[1].id);
			
			var tdinc = 0;
			// Fix for v. 0.4.3
			if (this.Is_Version_043x())
				{
				tdinc = 1;
				}
			
			if (fleetId != '')
				{
				if (database[fleetId] == undefined)
					{
					database[fleetId] = new this.FleetMovement_Object();
					}
				database[fleetId].id			 = fleetId;
					
				database[fleetId].own			 = this._Parent.DOM.Has_ClassName(tr,'own');
				database[fleetId].hostile		 = this._Parent.DOM.Has_ClassName(tr,'hostile');
				
				if (mTimers[fleetId] != undefined)
					{
					database[fleetId].time			 = mTimers[fleetId];
					}
				else 
					{
					database[fleetId].time			 = mTimers['nexEventETA1'];
					}
				
				database[fleetId].summary = this._Parent.Str.Trim(tds[2+tdinc].childNodes[0].textContent);
				
				database[fleetId].payload = {};
				var hasFleet = false;
				var hasGoods = false;
				var hasArmy = false;
				
				var payloadDoc = this._Parent.DOM.Create_Document(tds[2+tdinc].innerHTML);
				var icons = this._Parent.DOM.Get_Nodes("//div[contains(@class, 'icon')]/img",payloadDoc);
				var iconsNb = 0;
				if (icons.snapshotLength >= 1)
					{
					iconsNb = icons.snapshotLength;
					for (var j=0; j < iconsNb; j++)
						{
						var iconIMG = icons.snapshotItem(j);
						var unitType = TrimIcon(iconIMG.src);
						
						var payloadDivs = iconIMG.parentNode.parentNode.getElementsByTagName("div");
						var unitQty = this._Parent.Str.To_Integer(payloadDivs[1].textContent);
						
						database[fleetId].payload[unitType] = unitQty;
						
						switch(this._LangCode)
							{
							case 'wood':
							case 'wine':
							case 'marble':
							case 'glass':
							case 'sulfur':
								hasGoods = true;
								break;
							
							case 'ship_ram':
							case 'ship_ballista':
							case 'ship_flamethrower':
							case 'ship_catapult':
							case 'ship_steamboat':
							case 'ship_mortar':
							case 'ship_submarine':
								hasFleet = true;
								break;
							
							case 'slinger':
							case 'swordsman':
							case 'phalanx':
							case 'spearman':
							case 'archer':
							case 'marksman':
							case 'gyrocopter':
							case 'steamgiant':
							case 'bombardier':
							case 'ram':
							case 'catapult':
							case 'mortar':
							case 'medic':
							case 'cook':
								hasArmy = true;
								break;
							
							default:
								break;
							}
						this._Parent.Log.Add('Payload['+unitType+']='+unitQty);
						}
					}
				
				if (hasFleet == true)
					{
					database[fleetId].hasFleet = true;
					}
				if (hasGoods == true)
					{
					database[fleetId].hasGoods = true;
					}
				if (hasArmy == true)
					{
					database[fleetId].hasArmy = true;
					}
				
				database[fleetId].oCityId = grabCityID(tds[3+tdinc]);
				database[fleetId].oCityName = this._Parent.Str.Trim(tds[3+tdinc].childNodes[0].textContent);
				var oPlayerName = this._Parent.Str.Trim(tds[3+tdinc].childNodes[1].textContent);
				oPlayerName = oPlayerName.substring(1,oPlayerName.length-1);
				database[fleetId].oPlayerName = oPlayerName;
				
				database[fleetId].toLeft = (tds[4+tdinc].innerHTML != '') ? true : false;
				database[fleetId].mission = /mission_([_a-z]+)\.[a-z]+/i.exec(resMi.snapshotItem(i).src)[1];
				database[fleetId].subject = this._Parent.Str.Trim(tds[5+tdinc].title);
				database[fleetId].toRight = (tds[6+tdinc].innerHTML != '') ? true : false;
				
				database[fleetId].tCityId = grabCityID(tds[7+tdinc]);
				database[fleetId].tCityName = this._Parent.Str.Trim(tds[7+tdinc].childNodes[0].textContent);
				var tPlayerName = this._Parent.Str.Trim(tds[7+tdinc].childNodes[1].textContent);
				tPlayerName = tPlayerName.substring(1,tPlayerName.length-1);
				database[fleetId].tPlayerName = tPlayerName;
				
				database[fleetId].hasAction = (tds[8+tdinc].innerHTML != '') ? true : false;
				
				this._Parent.Log.Add('Detect fleet['+fleetId+']: oCityId='+database[fleetId].oCityId+', tCityId['+database[fleetId].tCityId+']: '+database[fleetId].tCityName+' ('+database[fleetId].tPlayerName+'), time='+database[fleetId].time+', mission='+database[fleetId].mission+', payload: '+iconsNb+' units');
				}
			}
		}
	
	return database;
	};
	
EmpireBoard.Ikariam.LocalizationStrings = function(valueName,sectionName,subSectionName)
	{
	if (this._LocalizationStrings == null)
		{
		if (unsafeWindow && (unsafeWindow.LocalizationStrings != undefined))
			{
			this._LocalizationStrings = unsafeWindow.LocalizationStrings;
			}
		else
			{
			return undefined;
			}
		}
	
	if (sectionName == undefined)
		{
		if (valueName == undefined)
			{
			return this._LocalizationStrings;
			}
		else
			{
			if (this._LocalizationStrings[valueName] == undefined)
				{
				return undefined;
				}
			else
				{
				return this._LocalizationStrings[valueName];
				}
			}
		}
	else
		{
		if (this._LocalizationStrings[sectionName] == undefined)
			{
			return undefined;
			}
		else if (subSectionName != undefined)
			{
			if (this._LocalizationStrings[sectionName][subSectionName] == undefined)
				{
				return undefined;
				}
			else if (this._LocalizationStrings[sectionName][subSectionName][valueName] == undefined)
				{
				return undefined;
				}
			else
				{
				return this._LocalizationStrings[sectionName][subSectionName][valueName];
				}
			}
		else if (this._LocalizationStrings[sectionName][valueName] == undefined)
			{
			return undefined;
			}
		else
			{
			return this._LocalizationStrings[sectionName][valueName];
			}
		}
	};
	
EmpireBoard.Ikariam.phpSet = function(valueName)
	{
	if (this._phpSet == null)
		{
		if (unsafeWindow && (unsafeWindow.IKARIAM != undefined))
			{
			if (unsafeWindow.IKARIAM.phpSet != undefined)
				{
				this._phpSet = unsafeWindow.IKARIAM.phpSet;
				}
			else
				{
				return undefined;
				}
			}
		else
			{
			return undefined;
			}
		}
	
	if (valueName == undefined)
		{
		return this._phpSet;
		}
	else
		{
		if (this._phpSet[valueName] == undefined)
			{
			return undefined;
			}
		else
			{
			return this._phpSet[valueName];
			}
		}
	};

EmpireBoard.Ikariam.currentCity = function(valueName,sectionName)
	{
	if (this._currentCity == null)
		{
		if (unsafeWindow && (unsafeWindow.IKARIAM != undefined))
			{
			if (unsafeWindow.IKARIAM.currentCity != undefined)
				{
				this._currentCity = unsafeWindow.IKARIAM.currentCity;
				}
			else
				{
				return undefined;
				}
			}
		else
			{
			return undefined;
			}
		}
	
	if (sectionName == undefined)
		{
		if (valueName == undefined)
			{
			return this._currentCity;
			}
		else
			{
			if (this._currentCity[valueName] == undefined)
				{
				return undefined;
				}
			else
				{
				return this._currentCity[valueName];
				}
			}
		}
	else
		{
		if ((this._currentCity[sectionName] == undefined) || (this._currentCity[sectionName][valueName] == undefined))
			{
			return undefined;
			}
		else
			{
			return this._currentCity[sectionName][valueName];
			}
		}
	};

// From kChen script with some fixes
EmpireBoard.Ikariam.Change_currentCity = function(city_id)
	{
	var _self = this;
	
	function getFormInput(path, root, isaction)
		{
		isaction = (isaction == undefined) ? false : true;
		
		var nodes = _self._Parent.DOM.Get_Nodes(path, root);
		if (nodes.snapshotLength <= 0) return null;
		
		var node0 = nodes.snapshotItem(0);
		var postdata = node0.name+"="+node0.value;
		
		for (var i = 1; i < nodes.snapshotLength; i++) 
			{
			var node = nodes.snapshotItem(i);
			if (node.name == "actionRequest" && !isaction) 
				node.value = _self.ActionRequest();
			postdata = postdata +"&" + node.name+"="+node.value;
			}
		
		return postdata;
		}
	
	var postdata = getFormInput("//form[@id='changeCityForm']//input");
	postdata = postdata + "&cityId="+city_id+"&view=city";
	var xmlhttp;
	if (window.XMLHttpRequest)
		{
		xmlhttp = new XMLHttpRequest();
		}
	xmlhttp.open('POST','http://' + window.location.host + '/index.php',false);
	xmlhttp.setRequestHeader('User-agent',window.navigator.userAgent);
	xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
	xmlhttp.setRequestHeader('Accept','application/atom+xml,application/xml,text/xml');
	xmlhttp.setRequestHeader('Referer',window.location);
	xmlhttp.setRequestHeader('Cookie',document.cookie);
	xmlhttp.overrideMimeType('text/javascript; charset='+document.characterSet);
	xmlhttp.send(postdata);
	
	var node = this._Parent.DOM.Create_Document(xmlhttp.responseText);
	this._ActionRequest = this._Parent.DOM.Get_First_Node_Value("//input[@name='actionRequest']",node);

	return true;
	};

EmpireBoard.Ikariam.Insert_Warning = function(message, title)
	{
	var notices = document.getElementById('notices');
	if (notices == null)
		{
		notices = document.createElement('div');
		notices.id = 'notices';
		var mainview = document.getElementById("mainview");
		var buildingDescription = this._Parent.DOM.Get_Nodes("//div[@id='mainview']/div[contains(@class,'buildingDescription')]");
		if (buildingDescription.snapshotLength >= 1)
			{
			mainview.insertBefore(notices, buildingDescription.snapshotItem(0).nextSibling);
			}
		else
			{
			var contentBox = document.createElement('div');
			contentBox.setAttribute("class", "contentBox");
			contentBox.appendChild(notices);
			//mainview.appendChild(contentBox);
			mainview.insertBefore(contentBox, mainview.getElementsByTagName("h1")[0].nextSibling);
			}
		}
	notices.innerHTML = notices.innerHTML+'<div class="warning"><h5>'+title+'</h5><p>'+message+'</p></div>';
	};

EmpireBoard.DOM =
	{
	_Parent: null,
	};

EmpireBoard.DOM.Init = function(parent)
	{
	this._Parent = parent;
	};

EmpireBoard.DOM.Create_Document = function(responseText)
	{
	// Thank sizzlemctwizzle and Seniltai
	var dt = document.implementation.createDocumentType("html", "-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd");
	var doc = document.implementation.createDocument('', '', dt);
	var html = doc.createElement('html');

	html.innerHTML = responseText;
	doc.appendChild(html);

	return doc;
	};

EmpireBoard.DOM.Get_Nodes = function(path, root)
	{
	var contextNode = root ? root.evaluate ? root : root.ownerDocument : document;
	return contextNode.evaluate(path, contextNode, null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	};
	
EmpireBoard.DOM.Has_Node = function(path, root)
	{
	var value = this.Get_Nodes(path, root);
	if (value.snapshotLength >= 1)
		{
		return true;
		}
	else
		{
		return false;
		}
	};
	
EmpireBoard.DOM.Get_First_Node = function(path, root)
	{
	var value = this.Get_Nodes(path, root);
	if (value.snapshotLength >= 1)
		{
		return value.snapshotItem(0);
		}
	return null;
	};
	
EmpireBoard.DOM.Get_Last_Node = function(path, root)
	{
	var value = this.Get_Nodes(path, root);
	if (value.snapshotLength >= 1)
		{
		return value.snapshotItem(value.snapshotLength-1);
		}
	return null;
	};
	
EmpireBoard.DOM.Get_First_Node_Value = function(path, defaultValue, root)
	{
	var value = this.Get_First_Node(path, root);
	if (value != null)
		{
		return value.value;
		}
	else return defaultValue;
	};
	
EmpireBoard.DOM.Get_Last_Node_Value = function(path, defaultValue, root)
	{
	var value = this.Get_Last_Node(path, root);
	if (value != null)
		{
		return value.value;
		}
	else return defaultValue;
	};
	
EmpireBoard.DOM.Get_First_Node_TextContent = function(path, defaultValue, root)
	{
	var value = this.Get_First_Node(path, root);
	if (value != null)
		{
		return value.textContent;
		}
	else return defaultValue;
	};

EmpireBoard.DOM.Get_First_Node_Title = function(path, defaultValue, root)
	{
	var value = this.Get_First_Node(path, root);
	if ((value != null) && (value.title != '')) 
		{
		return value.title;
		} 
	else return defaultValue;
	};
	
EmpireBoard.DOM.Has_ClassName = function(oElm, strClassName)
	{
	var arrayClassNames = oElm.className.split(' ');
	var Found = false;
	var arrayClassNamesLength = arrayClassNames.length;
	for (var k = 0; k < arrayClassNamesLength; k++)
		{
		if (arrayClassNames[k] == strClassName)
			{
			Found = true;
			break;
			}
		}
	return Found;
	};
	
/* Lib for strings processes */
EmpireBoard.Str =
	{
	_Parent:				 null,
	_decimalPoint:			 '.',
	_thousandSeparator:		 ',',
	_timeunits_short_day:	 'D',
	_timeunits_short_hour:	 'h',
	_timeunits_short_minute: 'm',
	_timeunits_short_second: 's'
	};
	
EmpireBoard.Str.Init = function(parent)
	{
	this._Parent = parent;
	//this._decimalPoint = this.Get_LocaleDecimalPoint();
	};

// Replace any joker (%1, %2, %3, etc) with values from an array
EmpireBoard.Str.ValuesReplace = function(text, values)
	{
	if (text == undefined) text = '';
	if (values == undefined) values = [];
	
	var key;
	var i = 1;
	for (key in values)
		{
		text = text.replace('%'+i, values[key]);
		i++;
		}
	
	return text;
	}
	
EmpireBoard.Str.Trim = function(str)
	{
	if (str != undefined)
		{
		str = str.replace(/&nbsp;/gi, " ");
		str = str.replace(/\t/gi, " ");
		str = str.replace(/\v/gi, "");
		str = str.replace(/\f/gi, "");
		str = str.replace(/\n/gi, "");
		str = str.replace(/\r/gi, "");
		//str = str.replace(/\e/gi, "");
		str = str.replace(/\s/gi, " ");
		
		while(str.charAt(0) == (" "))
			{ 
			str = str.substring(1);
			}
		while(str.charAt(str.length-1) == " " )
			{ 
			str = str.substring(0,str.length-1);
			}
		}
	return str;
	};
	
EmpireBoard.Str.Trim_DoubleQuotes = function(str)
	{
	str = str.replace(/["]{1}/gi, "");
	
	return str;
	};
	
EmpireBoard.Str.Trim_Brackets = function(str)
	{
	str = str.replace(/\(.+\)/gi, "");
	
	return str;
	};
	
EmpireBoard.Str.Trim_Accodances = function(str)
	{
	str = str.replace(/\[.+\]/gi, "");
	
	return str;
	};
	
EmpireBoard.Str.TwoDigit = function(val)
	{
	val = parseInt(val);
	if (val == 0)
		{
		val = "00";
		}
	else if (val < 10)
		{
		return "0"+val;
		}
	return val;
	};

/*
v1 & v2 as "v.00.00.00 0000"

return 0 if v2 = v1
	 1 if v2 > v1
	-1 if v2 < v1
*/
EmpireBoard.Str.Compare_Versions = function(v1, v2)
	{
	var result = 0;
	
	// remove "v."
	v1 = v1.replace(/v\./gi, "");
	v2 = v2.replace(/v\./gi, "");
	// remove "v"
	v1 = v1.replace(/v/gi, "");
	v2 = v2.replace(/v/gi, "");
	
	// build number use space separator
	v1 = v1.replace(/ /gi, ".");
	v2 = v2.replace(/ /gi, ".");

	// Parse numbers
	var vn1 = v1.split('.');
	var vn2 = v2.split('.');
	
	// Convert as integer
	for (var i = 0; i < vn1.length; i++)
		{
		vn1[i] = parseInt(vn1[i]);
		}
	for (var j = 0; j < vn2.length; j++)
		{
		vn2[j] = parseInt(vn2[j]);
		}
		
	for (var k = 0; k < vn1.length; k++)
		{
		if (vn2[k] == undefined)
			{
			if (vn1[k] > 0) result = -1;
			break;
			}
		else if (vn2[k] > vn1[k])
			{
			result = 1;
			break;
			}
		else if (vn2[k] < vn1[k])
			{
			result = -1;
			break;
			}
		}
	if ((result == 0) && (vn2.length > vn1.length))
		{
		if (vn2[vn1.length] > 0)
			{
			result = 1;
			}
		else if (vn2[vn2.length-1] > 0)
			{
			result = 1;
			}
		}
		
	//this._Parent.Log.Add(v1+" vs "+v2+" = "+result);
	
	return result;
	};
	
EmpireBoard.Str.To_Integer = function(str, defaultValue)
	{
	// Support signed integers
	var temp = ""+str;
	temp = temp.replace(/[^-0-9]+/g, "");
	temp = parseInt(temp,10);
	if (((temp == undefined) || (""+temp == "NaN")) && (defaultValue != undefined))
		{
		return defaultValue;
		}
	return temp;
	};

// decimalPoint = '.' or ','
EmpireBoard.Str.To_Float = function(str, defaultValue, decimalPoint)
	{
	if (decimalPoint == undefined) decimalPoint = this._decimalPoint;
	// Support signed integers
	var temp = ""+str;
	if (decimalPoint == '.')
		{
		temp = temp.replace(/[^-0-9\.]+/g, "");
		}
	else if (decimalPoint == ',')
		{
		temp = temp.replace(/[^-0-9\,]+/g, "");
		}
	else
		{
		temp = temp.replace(/[^-0-9]+/g, "");
		}
	temp = Number(temp);
	if (defaultValue != undefined && (temp == undefined || (""+temp == "NaN")))
		{
		return defaultValue;
		}
	return temp;
	};
	
EmpireBoard.Str.Get_LocaleDecimalPoint = function()
	{
	var _cachedDecimalPoint = new Number(1.5).toLocaleString().substring(1, 2);
	if (_cachedDecimalPoint == undefined || _cachedDecimalPoint == "")
		{
		_cachedDecimalPoint = ".";
		}
	return _cachedDecimalPoint;
	};

EmpireBoard.Str.FormatFloatNumber = function(num, fracdigits, alwaysShowSign, decimalPoint)
	{
	if (fracdigits == undefined) fracdigits = 2;
	if (alwaysShowSign == undefined) alwaysShowSign = false;
	if (decimalPoint == undefined) decimalPoint = this._decimalPoint;
	
	var s = ""+num;
	if (num == "?")
		{
		return num;
		}
	var negative = "";
	if (s.substring(0, 1) == "-")
		{
		negative = "-";
		s = s.substring(1);
		}
	else if (alwaysShowSign == true)
		{
		negative = "+";
		}
	var p = s.indexOf(".");
	if (p >= 0)
		{
		var i = s.substring(0, p);
		var frac = s.substring(p + 1, p + 1 + fracdigits);
		while (frac.length < fracdigits)
			{
			frac += "0";
			}
		s = i + decimalPoint + frac;
		}
	return negative + s;
	};

EmpireBoard.Str.FormatBigNumber = function(num, alwaysShowSign, thousandSeparator)
	{
	if (alwaysShowSign == undefined) alwaysShowSign = false;
	if (thousandSeparator == undefined) thousandSeparator = this._thousandSeparator;
	
	var s = ""+num;
	if (num == undefined || s == "NaN" || s == "?")
		{
		return "?";
		}
	else if (num == "-")
		{
		return num;
		}
		
	var negative = "";
	if (s.substring(0, 1) == "-")
		{
		negative = "-";
		s = s.substring(1);
		}
	else if (alwaysShowSign == true)
		{
		negative = "+";
		}
		
	var i = s.length-3;
	while (i > 0)
		{
		s = s.substring(0, i) + thousandSeparator + s.substring(i);
		i -= 3;
		}
	return negative + s;
	};

EmpireBoard.Str.FormatRemainingTime = function(timestamp,maxDigits,delimiter,approx,showunits,zerofill)
	{
	if(typeof timestamp=="undefined"){timestamp=0;}
	if(typeof maxDigits=="undefined"){maxDigits=2;}
	if(typeof delimiter=="undefined"){delimiter=" ";}
	if(typeof approx=="undefined"){approx="";}
	if(typeof showunits=="undefined"){showunits=true;}
	if(typeof zerofill=="undefined"){zerofill=false;}
	var timeunits=[];
	timeunits['day']=60*60*24;
	timeunits['hour']=60*60;
	timeunits['minute']=60;
	timeunits['second']=1;
	var loca=[];
	loca['day']		 = (showunits) ? this._timeunits_short_day:"";
	loca['hour']	 = (showunits) ? this._timeunits_short_hour:"";
	loca['minute']	 = (showunits) ? this._timeunits_short_minute:"";
	loca['second']	 = (showunits) ? this._timeunits_short_second:"";
	timestamp=Math.floor(timestamp/1000);
	var timestring="";
	for (var k in timeunits)
		{
		var nv=Math.floor(timestamp/timeunits[k]);
		if (maxDigits>0&&(nv>0||(zerofill&&timestring!="")))
			{
			timestamp=timestamp-nv*timeunits[k];
			if (timestring!="")
				{
				timestring+=delimiter;
				if (nv<10&&nv>0&&zerofill){nv="0"+nv;}
				if (nv==0){nv="00";}
				}
			timestring+=nv+loca[k];
			maxDigits--;
			}
		}
	if (timestamp>0) {timestring=approx+timestring;}
	return timestring;
	};

function smartDateFormat(time, showElapsedTime, elapsedTimeSeparator) {
  if (showElapsedTime != true) {
    showElapsedTime = false;
  }
  if (elapsedTimeSeparator == undefined) {
    elapsedTimeSeparator = ",";
  }
  var s = new Date();
  s.setTime(time);
  var now = new Date();
  var t = "";
  if ((1+now.getDate()) == s.getDate() && now.getYear() == s.getYear() && now.getMonth() == s.getMonth()) {
    t = 'tomorrow ' + EmpireBoard.Str.TwoDigit(s.getHours())+":"+EmpireBoard.Str.TwoDigit(s.getMinutes());
  } else if (now.getYear() != s.getYear() || now.getMonth() != s.getMonth() || now.getDate() != s.getDate()) {
    t = s.toLocaleString();
  } else {
    t = EmpireBoard.Str.TwoDigit(s.getHours())+":"+EmpireBoard.Str.TwoDigit(s.getMinutes());
  }
  if (showElapsedTime) {
    t += elapsedTimeSeparator;
    var d = (now.getTime() - s.getTime()) / 1000;
    if (d < 3600) {
      t += " " + Math.floor(d / 60) + "m";
    } else {
      if (d >= 86400) {
        t += " " + Math.floor(d / 86400) + "d";
      }
      t += " " + EmpireBoard.Str.FormatFloatNumber((d % 86400) / 3600, 1) + "h";
    }
  }
  return t;
}

EmpireBoard.Handlers =
	{
	_Parent: null
	};
	
EmpireBoard.Handlers.Init = function(parent)
	{
	this._Parent = parent;
	};
	
EmpireBoard.Handlers.Attach_Events = function()
	{
	// Common events
	this.Attach_ChangeCity_Events();
	
	if (this._Parent.DB.Options.Prefs.TABLE_BUILDINGS == true)
		{
		// Buildings table
		this.Attach_BuildingsHeader_Events();
		}
		
	if (this._Parent.DB.Options.Prefs.TABLE_RESOURCES == true)
		{
		// Resources table
		this.Attach_ArrivingGoods_Events();
		}
	
	if (this._Parent.DB.Options.Prefs.TABLE_ARMYFLEET == true)
		{
		// Army table
		this.Attach_ArmyFleetHeader_Events();
		this.Attach_Movements_Events();
		this.Attach_Attacks_Events();
		}
	};
	
EmpireBoard.Handlers.Attach_ChangeCity_Events = function()
	{
	var self = this;
	
	var nodes = this._Parent.DOM.Get_Nodes("//div[@id='"+this._Parent.MainID+"']//a[contains(@class,'changeCity')]");
	for (var i = 0; i < nodes.snapshotLength; i++)
		{
		var node = nodes.snapshotItem(i);
		if (current_city_id != parseInt(node.getAttribute("cityid")))
			node.addEventListener('click', function(e) { self.ChangeCity_Click_Event(e); }, false);
		}
	};
	
EmpireBoard.Handlers.ChangeCity_Click_Event = function(e)
	{
	var obj = e.srcElement ? e.srcElement:e.target;
	obj.style.cursor="wait";
	document.getElementsByTagName("body")[0].style.cursor="wait";
	while (obj.hasAttribute('cityid') == false)
		{
		obj = obj.parentNode;
		}
	var city_id = obj.getAttribute("cityid");
	this._Parent.Ikariam.Change_currentCity(city_id);
	};
	
EmpireBoard.Handlers.Attach_BuildingsHeader_Events = function()
	{
	var self = this;
	
	var nodes = this._Parent.DOM.Get_Nodes("//div[@id='"+this._Parent.MainID+"']//th[contains(@class,'build_name')]");
	for (var i = 0; i < nodes.snapshotLength; i++)
		{
		var node = nodes.snapshotItem(i);
		node.addEventListener('mouseover', function(e) { self.BuildingName_MouseOver_Event(e); }, false);
		node.addEventListener('mousemove', function(e) { self._Parent.Tooltip.mouseMove(e); }, false);
		node.addEventListener('mouseout', function(e) { self._Parent.Tooltip.hide(e); }, false);
		}
	};
	
EmpireBoard.Handlers.BuildingName_MouseOver_Event = function(e)
	{
	if (!e) { e = window.event; }
	var obj = e.srcElement ? e.srcElement : e.target;
	while (obj.hasAttribute('building') == false)
		{
		obj = obj.parentNode;
		}
	var building_id = obj.getAttribute('building');
	//window.status = 'building_id: '+building_id;
	
	var tooltipHTML = this._Parent.Tooltip.innerHTML(this._Parent.Renders.BuildingName_Tooltip_Content(building_id));
	this._Parent.Tooltip.show(tooltipHTML);
	};
	
EmpireBoard.Handlers.Attach_ArrivingGoods_Events = function()
	{
	var self = this;

	var nodes = this._Parent.DOM.Get_Nodes("//div[@id='"+this._Parent.MainID+"']//*[contains(@class,'MoreGoods')]");
	for (var i = 0; i < nodes.snapshotLength; i++)
		{
		var node = nodes.snapshotItem(i);
		node.addEventListener('mouseover', function(e) { self.ArrivingGoods_MouseOver_Event(e); }, false);
		node.addEventListener('mousemove', function(e) { self._Parent.Tooltip.mouseMove(e); }, false);
		node.addEventListener('mouseout', function(e) { self._Parent.Tooltip.hide(e); }, false);
		}
	};
	
EmpireBoard.Handlers.ArrivingGoods_MouseOver_Event = function(e)
	{
	if (!e) { e = window.event; }
	var obj = e.srcElement ? e.srcElement : e.target;
	//var targetObj = obj;
	while (obj.hasAttribute('resource') == false)
		{
		obj = obj.parentNode;
		}
	var resName = obj.getAttribute('resource');
	while (obj.hasAttribute('cityid') == false)
		{
		obj = obj.parentNode;
		}
	var city_id = parseInt(obj.getAttribute('cityid'));
	//window.status = 'Resource: '+resName+' City ID: '+city_id;
	var tooltipHTML = this._Parent.Tooltip.innerHTML(this._Parent.Renders.ArrivingGoods_Tooltip_Content(city_id, resName));
	
	this._Parent.Tooltip.show(tooltipHTML);
	};

EmpireBoard.Handlers.Attach_ArmyFleetHeader_Events = function()
	{
	var self = this;
	
	var nodes = this._Parent.DOM.Get_Nodes("//div[@id='"+this._Parent.MainID+"']//th[contains(@class,'unit_name')]");
	for (var i = 0; i < nodes.snapshotLength; i++)
		{
		var node = nodes.snapshotItem(i);
		node.addEventListener('mouseover', function(e) { self.UnitName_MouseOver_Event(e); }, false);
		node.addEventListener('mousemove', function(e) { self._Parent.Tooltip.mouseMove(e); }, false);
		node.addEventListener('mouseout', function(e) { self._Parent.Tooltip.hide(e); }, false);
		}
	};
	
EmpireBoard.Handlers.UnitName_MouseOver_Event = function(e)
	{
	if (!e) { e = window.event; }
	var obj = e.srcElement ? e.srcElement : e.target;
	while (obj.hasAttribute('unit') == false)
		{
		obj = obj.parentNode;
		}
	var unit_id = obj.getAttribute('unit');
	//window.status = 'unit_id: '+unit_id;
	
	var tooltipHTML = this._Parent.Tooltip.innerHTML(this._Parent.Renders.UnitName_Tooltip_Content(unit_id));
	this._Parent.Tooltip.show(tooltipHTML);
	};
	
EmpireBoard.Handlers.Attach_Movements_Events = function()
	{
	var self = this;
	
	var nodes = this._Parent.DOM.Get_Nodes("//div[@id='"+this._Parent.MainID+"']//*[contains(@class,'Movements')]");
	for (var i = 0; i < nodes.snapshotLength; i++)
		{
		var node = nodes.snapshotItem(i);
		node.addEventListener('mouseover', function(e) { self.Movements_MouseOver_Event(e); }, false);
		node.addEventListener('mousemove', function(e) { self._Parent.Tooltip.mouseMove(e); }, false);
		node.addEventListener('mouseout', function(e) { self._Parent.Tooltip.hide(e); }, false);
		}
	};
	
EmpireBoard.Handlers.Movements_MouseOver_Event = function(e)
	{
	if (!e) { e = window.event; }
	var obj = e.srcElement ? e.srcElement : e.target;
	while (obj.hasAttribute('cityid') == false)
		{
		obj = obj.parentNode;
		}
	var city_id = parseInt(obj.getAttribute('cityid'));
	//window.status = 'Movements of city by ID : '+city_id;
	
	var tooltipHTML = this._Parent.Tooltip.innerHTML(this._Parent.Renders.Movements_Tooltip_Content(city_id));
	this._Parent.Tooltip.show(tooltipHTML);
	};
	
EmpireBoard.Handlers.Attach_Attacks_Events = function()
	{
	var self = this;
	
	var nodes = this._Parent.DOM.Get_Nodes("//div[@id='"+this._Parent.MainID+"']//*[contains(@class,'Attacks')]");
	for (var i = 0; i < nodes.snapshotLength; i++)
		{
		var node = nodes.snapshotItem(i);
		node.addEventListener('mouseover', function(e) { self.Attacks_MouseOver_Event(e); }, false);
		node.addEventListener('mousemove', function(e) { self._Parent.Tooltip.mouseMove(e); }, false);
		node.addEventListener('mouseout', function(e) { self._Parent.Tooltip.hide(e); }, false);
		}
	};
	
EmpireBoard.Handlers.Attacks_MouseOver_Event = function(e)
	{
	if (!e) { e = window.event; }
	var obj = e.srcElement ? e.srcElement : e.target;
	while (obj.hasAttribute('cityid') == false)
		{
		obj = obj.parentNode;
		}
	var city_id = parseInt(obj.getAttribute('cityid'));
	//window.status = 'Movements of city by ID : '+city_id;
	
	var tooltipHTML = this._Parent.Tooltip.innerHTML(this._Parent.Renders.Attacks_Tooltip_Content(city_id));
	this._Parent.Tooltip.show(tooltipHTML);
	};
	
EmpireBoard.Handlers.Start_Timers = function()
	{
	// Common real-time counters
	window.setInterval(myTimeCounterF, 1000);
	
	if (this._Parent.DB.Options.Prefs.TABLE_RESOURCES == true)
		{
		// Resources timers
		window.setInterval(realtimeFactDisplayF, 5000);
		}
	};
	
EmpireBoard.Handlers.Deployment_Submit_Event = function(e)
	{
	var dType = this._Parent.DOM.Get_First_Node_Value("//form[@id='deploymentForm']/input[@name='function']", '');

	// Update units garrisoned
	var city = getCity(current_city_id);
	var duList = this._Parent.DOM.Get_Nodes("//form[@id='deploymentForm']//ul[@class='assignUnits']/li");
	if (duList.snapshotLength >= 1)
		{
		for (var i = 0; i < duList.snapshotLength; i++)
			{
			var uLI = duList.snapshotItem(i);
			var unit_id = 'unit '+uLI.className;
			
			var oAmount = this._Parent.Str.To_Integer(uLI.childNodes[3].textContent);
			if (this._Parent.Ikariam.Is_Version_043x())
				{
				if (dType == 'deployFleet')
					{
					var dAmount = this._Parent.Str.To_Integer(uLI.childNodes[13].value,0);
					}
				else
					{
					var dAmount = this._Parent.Str.To_Integer(uLI.childNodes[13].value,0);
					}
				}
			else
				{
				if (dType == 'deployFleet')
					{
					var dAmount = this._Parent.Str.To_Integer(uLI.childNodes[7].value,0);
					}
				else
					{
					var dAmount = this._Parent.Str.To_Integer(uLI.childNodes[9].value,0);
					}
				}
			
			if (city.units[unit_id] == undefined) city.units[unit_id] = {};
			city.units[unit_id].count = oAmount - dAmount;
			this._Parent.Log.Add(unit_id+": oAmount="+oAmount+" dAmount="+dAmount);
			}
		}
	
	setViewRqTime('finances');
	setViewRqTime('militaryAdvisorMilitaryMovements');
	this._Parent.DB.Save();
	};
	
function myTimeCounterF()
	{
	var currenttime = new Date().getTime();
	var cs = EmpireBoard.DOM.Get_Nodes("//font[contains(@id, 'mytimecounter')]");
	for (var i = 0; i < cs.snapshotLength; i++)
		{
		var c = cs.snapshotItem(i);
		var abstime = Math.round(c.getAttribute('counter'));
		hdata = (abstime - currenttime) / 1000;
		if (hdata > 0)
			{
			var s = "";
			s = EmpireBoard.Str.FormatRemainingTime(hdata*1000);
			c.innerHTML = s;
			}
		else 
			{
			c.innerHTML = "-";
			}
		}
	}

function realtimeFactDisplayF()
	{
	var currenttime = new Date().getTime();
	var counters = EmpireBoard.DOM.Get_Nodes("//font[contains(@id, 'myresourcecounter')]");
	for(var i=0; i < counters.snapshotLength; i++)
		{
		var c = counters.snapshotItem(i);
		if (c.color != "#ff0000")
			{
			var arr = c.getAttribute('counter').split(",");
			var startTime = arr[0];
			var startAmount = parseFloat(arr[1]);
			var factPerHour = parseFloat(arr[2]);
			var maxAmount = arr[3];

			var currAmount = getCurrentResourceAmount(currenttime, startTime, startAmount, factPerHour);

			if ((maxAmount != '-') && (currAmount >= maxAmount))
				{
				c.innerHTML = EmpireBoard.Str.FormatBigNumber(maxAmount);
				c.color = "#ff0000";
				}
			else
				{
				c.innerHTML = EmpireBoard.Str.FormatBigNumber(currAmount);
				//+' ('+Math.floor((currenttime-startTime)/1000)+' s)'
				}
			}
		}
	return (counters.snapshotLength > 0);
	}

EmpireBoard.Log =
	{
	_Parent: null,
	_Enabled: false
	};
	
EmpireBoard.Log.Init = function(parent)
	{
	this._Parent = parent;
	};
	
EmpireBoard.Log.Add = function(msg)
	{
	if (this._Enabled == true)
		{
		GM_log(msg);
		}
	};

EmpireBoard.Updater =
	{
	_Parent:			 null,
	_ScriptURL:			 '',
	_availableVersion:	 0
	};
	
EmpireBoard.Updater.Init = function(parent)
	{
	this._Parent = parent;
	};
	
// CallBackFct function receive available version number (or null value if failed) as argument
EmpireBoard.Updater.Check = function(ScriptURL, CallBackFct)
	{
	this._availableVersion	 = 0;
	this._ScriptURL			 = ScriptURL;
	var self = this;
	
	GM_xmlhttpRequest({
		method:				"GET",
		url:				ScriptURL,
		headers:			{ Accept:"text/javascript; charset=UTF-8" },
		overrideMimeType:	"application/javascript; charset=UTF-8",
		onload:				function(response) { self._ParseScript(response, CallBackFct); }
		});
	};
	
EmpireBoard.Updater._ParseScript = function(response, CallBackFct)
	{
	var availableVersion = 0;
	
	if (response.status == 200)
		{
		var resReg = /@version\s+(\d+)/.exec(response.responseText);
		if (resReg != null)
			{
			availableVersion = resReg[1];
			}
		}
		
	this._availableVersion = availableVersion;
	
	if (typeof CallBackFct == 'function')
		{
		CallBackFct.call(this._Parent, availableVersion, response);
		}
	};

// the tooltip object
EmpireBoard.Tooltip =
	{
	// setup properties of tooltip object
	_Parent:				 null,
	id:						 "TooltipContainer",
	idParent:				 "",
	offsetx:				 10,
	offsety:				 10,
	_x:						 0,
	_y:						 0,
	_tooltipElement:		 null,
	_saveonmouseover:		 null
	};
	
EmpireBoard.Tooltip.Init = function(parent, IdName, IdParent)
	{
	if (parent != undefined) this._Parent = parent;
	
	if (IdName != undefined) this.id			 = IdName;
	if (IdParent != undefined) this.idParent	 = IdParent;
	};
	
EmpireBoard.Tooltip.CreateContainer = function(IdName, IdParent)
	{
	if (IdName != undefined) this.id			 = IdName;
	if (IdParent != undefined) this.idParent	 = IdParent;
	
	// create tooltip DIV
	var body = document.getElementById(this.idParent);
	var tooltipdiv = document.createElement('div');
	tooltipdiv.id = this.id;
	tooltipdiv.innerHTML = "";
	tooltipdiv.style.visibility = 'hidden';
	body.appendChild(tooltipdiv);
	};

EmpireBoard.Tooltip.innerHTML = function (Content, Title)
	{
	if (Content == undefined || Content == "")
		{
		return "";
		}
	else
		{
		var innerHTML = '';
		if (Title == undefined || Title == "")
			{
			Title = "";
			}
		else Title = "<div class=TTTitle>"+Title+"</div>";
		
		if (this._Parent.Intl.LangDir() == "rtl")
			{
			innerHTML = "<div dir=rtl class='TTContent RtoL'>"+Title+Content+"</div>";
			}
		else
			{
			innerHTML = "<div class=TTContent>"+Title+Content+"</div>";
			}
		
		return innerHTML;
		}
	};

EmpireBoard.Tooltip.show = function (htmlelement)
	{
	if (document.getElementById)
		{
		this._tooltipElement = document.getElementById(this.id);
		}
	else if ( document.all )
		{
		this._tooltipElement = document.all[this.id].style;
		}
	
	this._tooltipElement.innerHTML = htmlelement;

	this.moveTo(this._x + this.offsetx , this._y + this.offsety);

	if (this._tooltipElement.style)
		{
		this._tooltipElement.style.visibility ="visible";
		}
	else
		{
		this._tooltipElement.visibility = "visible";
		}
		
	return false;
	};

EmpireBoard.Tooltip.hide = function(e)
	{
	if (this._tooltipElement.style)
		{
		this._tooltipElement.style.visibility ="hidden";
		}
	else
		{
		this._tooltipElement.visibility = "hidden";
		}
	};

// Moves the tooltip element
EmpireBoard.Tooltip.mouseMove = function(e)
	{
	// we don't use "this" because this method is assign to an event of document
	// and so is dereferenced
	if (e == undefined) e = event;

	if (e.pageX != undefined)
		{ // gecko, konqueror,
		this._x = e.pageX;
		this._y = e.pageY;
		}
	else if (event != undefined && event.x != undefined && event.clientX == undefined)
		{ // ie4 ?
		this._x = event.x;
		this._y = event.y;
		}
	else if (e.clientX != undefined )
		{ // IE6,  IE7, IE5.5
		if (document.documentElement)
			{
			this._x = e.clientX + ( document.documentElement.scrollLeft || document.body.scrollLeft);
			this._y = e.clientY + ( document.documentElement.scrollTop || document.body.scrollTop);
			}
		else
			{
			this._x = e.clientX + document.body.scrollLeft;
			this._y = e.clientY + document.body.scrollTop;
			}
		/*
		}
		else if(event != undefined && event.x != undefined)
		{ // IE6,  IE7, IE5.5
		tooltip.x = event.x + ( document.documentElement.scrollLeft || document.body.scrollLeft);
		tooltip.y = event.y + ( document.documentElement.scrollTop || document.body.scrollTop);
		*/
		}
	else
		{
		this._x = 0;
		this._y = 0;
		}

	var MovX = this._x + this.offsetx;
	if ((MovX+this.GetDivW(this._tooltipElement)) > (this.GetClientW() + this.GetScrollX() - 2))
		{
		MovX = this.GetClientW() + this.GetScrollX() - 2 - this.GetDivW(this._tooltipElement);
		}
	var MovY = this._y - this.offsety - this.GetDivH(this._tooltipElement);
	if (MovY < (this.GetScrollY() + 2))
		{
		MovY = this._y + this.offsety;
		}
	
	//window.status = "Scroll="+this.GetScrollX()+","+this.GetScrollY();
	//window.status = "Client="+this.GetClientW()+","+this.GetClientH();

	this.moveTo(MovX , MovY);
	};
	
EmpireBoard.Tooltip.GetDivH = function(el)
	{
	return (el ? (el.offsetHeight || el.style.pixelHeight || 0) : 0);
	};
	
EmpireBoard.Tooltip.GetDivW = function(el)
	{
	return (el ? (el.offsetWidth || el.style.pixelWidth || 0) : 0);
	};

EmpireBoard.Tooltip.GetClientW = function()
	{
	var tt_db = document.documentElement || document.body ||
				(document.getElementsByTagName ? document.getElementsByTagName("body")[0]
				: null);
	return (document.body && (typeof(document.body.clientWidth) != 'undefined') ? document.body.clientWidth
			: (typeof(window.innerWidth) != 'undefined') ? window.innerWidth
			: tt_db ? (tt_db.clientWidth || 0)
			: 0);
	};

EmpireBoard.Tooltip.GetClientH = function()
	{
	var tt_db = document.documentElement || document.body ||
				(document.getElementsByTagName ? document.getElementsByTagName("body")[0]
				: null);
	// Exactly this order seems to yield correct values in all major browsers
	return (document.body && (typeof(document.body.clientHeight) != 'undefined') ? document.body.clientHeight
			: (typeof(window.innerHeight) != 'undefined') ? window.innerHeight
			: tt_db ? (tt_db.clientHeight || 0)
			: 0);
	};

EmpireBoard.Tooltip.GetScrollX = function()
	{
	var tt_db = document.documentElement || document.body ||
				(document.getElementsByTagName ? document.getElementsByTagName("body")[0]
				: null);
	return (window.pageXOffset || (tt_db ? (tt_db.scrollLeft || 0) : 0));
	};
	
EmpireBoard.Tooltip.GetScrollY = function()
	{
	var tt_db = document.documentElement || document.body ||
				(document.getElementsByTagName ? document.getElementsByTagName("body")[0]
				: null);
	return (window.pageYOffset || (tt_db ? (tt_db.scrollTop || 0) : 0));
	};

// Move the tooltip element
EmpireBoard.Tooltip.moveTo = function(xL,yL)
	{
	if (this._tooltipElement.style)
		{
		this._tooltipElement.style.left = xL +"px";
		this._tooltipElement.style.top = yL +"px";
		}
	else
		{
		this._tooltipElement.left = xL;
		this._tooltipElement.top = yL;
		}
	};

// Manage translation
EmpireBoard.Intl =
	{
	_Parent:				 null,
	_AppName:				 'AnyApp',
	_LangCode:				 '',
	_LangDir:				 'ltr'
	};
	
EmpireBoard.Intl.Init = function(parent, AppName)
	{
	this._Parent = parent;
	if (AppName != undefined) this._AppName = AppName;
	};

// Get text to translate
EmpireBoard.Intl.TT = function(stringName, contextName, stringValues, appName)
	{
	if ((stringName != undefined) && (stringName != ''))
		{
		if ((contextName == undefined) || (contextName == '')) contextName = 'misc';
		if ((appName == undefined) || (appName == '')) appName = this._AppName;
		
		var stringResult = stringName;
		switch(contextName)
			{
			case 'buildings':
				if ((buildings[stringName] != undefined) && (buildings[stringName][0] != undefined))
					stringResult = buildings[stringName][0];
				break;
			
			case 'buildings_short':
				if ((buildings[stringName] != undefined) && (buildings[stringName][1] != undefined))
					stringResult = buildings[stringName][1];
				break;
			
			case 'army_units':
				if (config["unitnames"] == undefined)
					{
					
					}
				else if (config["unitnames"][stringName] != undefined)
					{
					stringResult = config["unitnames"][stringName];
					}
				else if (config["unitnames"]['unit '+stringName] != undefined)
					{
					stringResult = config["unitnames"]['unit '+stringName];
					}
				break;
			
			case 'fleet_units':
				if (config["unitnames"] == undefined)
					{
					
					}
				else if (config["unitnames"][stringName] != undefined)
					{
					stringResult = config["unitnames"][stringName];
					}
				else if (config["unitnames"]['unit '+stringName] != undefined)
					{
					stringResult = config["unitnames"]['unit '+stringName];
					}
				break;
			
			case 'misc':
			default:
				if (texts[stringName] != undefined)
					stringResult = texts[stringName];
				break;
			}
		
		if ((stringValues != undefined) && (stringValues != ''))
			{
			stringResult = this._Parent.Str.ValuesReplace(stringResult, stringValues);
			}
			
		return this._Parent.Str.Trim(stringResult);
		}
	else return '';
	};

EmpireBoard.Intl.Languages = function()
	{
	var languages = {
		"": "Automatic",
		ae: "العربية",
		bg: "Bulgarian",
		cn: "Chinese",
		tw: "Chinese (traditional)",
		cz: "Czech",
		dk: "Danish",
		de: "Deutsch",
		nl: "Dutch",
		en: "English",
		es: "Espanol",
		fi: "Finnish",
		fr: "Français",
		gr: "Greek",
		il: "Hebrew",
		it: "Italiano",
		lv: "Latvian",
		hu: "Magyar",
		pl: "Polish",
		pt: "Portuguese",
		ro: "Romanian",
		ru: "Russian",
		rs: "Serbian",
		sk: "Slovak",
		sl: "Slovenian",
		se: "Swedish",
		tr: "Turkish",
		ua: "Ukrainian",
		vn: "Vietnamese"
		};
	
	return languages;
	};

EmpireBoard.Intl.SetLanguage = function(LangCode)
	{
	if (LangCode == undefined)
		{
		LangCode = '';
		}
		
	if (LangCode == '')
		{
		LangCode = this._Parent.Ikariam.Language();
		}
	
	if (LangCode == '')
		{
		var Host = this._Parent.Ikariam.Host();
		var arr = Host.split("\.");
		LangCode = arr[arr.length - 1];
		if (LangCode == "com" && arr.length == 4) 
			{
			//for example: http://s1.ba.ikariam.com
			LangCode = arr[1];
			}
			
		if ((LangCode == 'com') || (LangCode == 'org') || (LangCode == 'net')) LangCode = 'en';
		}
	
	if (LangCode == '')
		{
		LangCode = 'en';
		}
	
	this._Parent.Log.Add('Set language code: '+LangCode);
	
	this._LangCode = LangCode;
	};
	
EmpireBoard.Intl.LangCode = function()
	{
	if ((this._LangCode == undefined) || (this._LangCode == null) || (this._LangCode == ''))
		{
		this.SetLanguage('');
		}
	
	return this._LangCode;
	};

EmpireBoard.Intl.LangDir = function()
	{
	if ((this._LangDir == undefined) || (this._LangDir == null) || (this._LangDir == ''))
		{
		this._LangDir = 'ltr';
		}
	// Todo: detect like http://userscripts.org/scripts/diff/87680/326530
	
	return this._LangDir;
	};

EmpireBoard.Intl.Load_LocalizedTexts = function()
	{
	switch(this._LangCode)
		{
		case 'ae':
		case 'eg':
		case 'sa':
			this.Load_Texts_AE();
			break;
		
		case 'bg':
			this.Load_Texts_BG();
			break;
		
		case 'cn':
			this.Load_Texts_CN();
			break;
		
		case 'cz':
			this.Load_Texts_CZ();
			break;
		
		case 'de':
			this.Load_Texts_DE();
			break;
		
		case 'dk':
			this.Load_Texts_DK();
			break;
		
		case 'es':
		case 'ar':
		case 'mx':
		case 'cl':
		case 'co':
		case 've':
		case 'pe':
			this.Load_Texts_ES();
			break;
		
		case 'fi':
			this.Load_Texts_FI();
			break;
		
		case 'fr':
			this.Load_Texts_FR();
			break;
		
		case 'gr':
			this.Load_Texts_GR();
			break;
		
		case 'hu':
			this.Load_Texts_HU();
			break;
		
		case 'il':
			this.Load_Texts_IL();
			break;
			
		case 'ir':
			// Todo
			this.Load_Texts_PK();
			break;
		
		case 'it':
			this.Load_Texts_IT();
			break;
		
		case 'lv':
			this.Load_Texts_LV();
			break;
		
		case 'nl':
			this.Load_Texts_NL();
			break;
		
		case 'pk':
			// Todo
			this.Load_Texts_PK();
			break;
			
		case 'pl':
			this.Load_Texts_PL();
			break;
		
		case 'pt':
		case 'br':
			this.Load_Texts_PT();
			break;
		
		case 'ro':
			this.Load_Texts_RO();
			break;
		
		case 'rs':
			this.Load_Texts_RS();
			break;
			
		case 'ru':
			this.Load_Texts_RU();
			break;
		
		case 'se':
			this.Load_Texts_SE();
			break;
		
		case 'sk':
			this.Load_Texts_SK();
			break;
		
		case 'sl':
			this.Load_Texts_SL();
			break;
		
		case 'tr':
			this.Load_Texts_TR();
			break;
		
		case 'tw':
		case 'hk':
			this.Load_Texts_TW();
			break;
		
		case 'ua':
			this.Load_Texts_UA();
			break;
		
		case 'vn':
			this.Load_Texts_VN();
			break;
		
		case 'ba':
		case 'yu':
			// Todo
		case 'by':
			// Todo
		case 'ee':
			// Todo
		case 'id':
			// Todo
		case 'lt':
			// Todo
		case 'ph':
			// Todo
		case 'si':
			// Todo
		
		case 'en':
		case 'us':
		case 'uk':
		case 'org':
		case 'com':
		case 'net':
		default:
			this.Load_Texts_EN();
			break;
		}
		
	if (langtype == "rf")
		{
		this._LangDir = 'rtl';
		}
	else
		{
		this._LangDir = 'ltr';
		}
	};

EmpireBoard.Intl.Load_Texts_EN = function()
	{
	langtype = ""; // Set "rf" for Rigth-to-Left languages, or leave blank
	// Set short building name into second field 
	buildings = {
		"townHall"		 : ["Town Hall", "T. Hall"],
		"temple"		 : ["Temple", "Temple"],
		"academy"		 : ["Academy", "Academy"],
		"port"			 : ["Trading Port", "Port"],
		"shipyard"		 : ["Shipyard", "Shipyard"],
		"warehouse"		 : ["Warehouse", "Warehouse"],
		"dump"			 : ["Dump", "Dump"],
		"wall"			 : ["Wall", "Wall"],
		"tavern"		 : ["Tavern", "Tavern"],
		"museum"		 : ["Museum", "Museum"],
		"palace"		 : ["Palace", "Palace"],
		"palaceColony"	 : ["Governor's Residence", "Governor"],
		"embassy"		 : ["Embassy", "Embassy"],
		"branchOffice"	 : ["Trading Post", "Trading"],
		"safehouse"		 : ["Hideout", "Hideout"],
		"barracks"		 : ["Barracks", "Barracks"],
		"workshop"		 : ["Workshop", "Workshop"],
		"carpentering"	 : ["Carpenter", "Carpenter"],
		"forester"		 : ["Forester", "Forester"],
		"stonemason"	 : ["Stone Mason", "Mason"],
		"glassblowing"	 : ["Glass Blowing", "Blowing"],
		"winegrower"	 : ["Wine Grower", "Grower"],
		"alchemist"		 : ["Alchemist", "Alchemist"],
		"architect"		 : ["Architect", "Architect"],
		"optician"		 : ["Optician", "Optician"],
		"vineyard"		 : ["Vine Yard", "Yard"],
		"fireworker"	 : ["Fireworker", "Fireworker"]
		};
	texts = {
		"Upkeep"				 : "Upkeep",
		"Growth"				 : "Growth",
		"Research"				 : "Research",
		"cityName"				 : "Cities",
		"currentlyBuilding"		 : "Currently building",
		"summary"				 : "Summary:",
		"hide_settings"			 : "Hide settings",
		"show_settings"			 : "Show settings",
		"Population"			 : "Population",
		"finishedBuilding"		 : "Finished building",
		"Incomes"				 : "Incomes",
		"Trading"				 : "Trading",
		"Wood"					 : "Wood",
		"Wine"					 : "Wine",
		"Marble"				 : "Marble",
		"Crystal"				 : "Crystal",
		"Sulfur"				 : "Sulfur"
		};
	};

EmpireBoard.Intl.Load_Texts_AE = function()
	{
	//by wa7d and Moshakes 
	langtype = "rf";
	buildings = {
		"townHall" : ["البلدية", "البلدية"],
		"temple" : ["مركز", "مركز"],
		"academy" : ["الاكاديمية", "الاكاديمية"],
		"port" : ["المرفأ", "المرفأ"],
		"shipyard" : ["حوض السفن", "حوض السفن"],
		"warehouse" : ["المخزن", "المخزن"],
		"wall" : ["السور", "السور"],
		"tavern" : ["الاستراحة", "الاستراحة"],
		"museum" : ["المتحف", "المتحف"],
		"palace" : ["القصر", "القصر"],
		"palaceColony" : ["قائم مقام", "قائم مقام"],
		"embassy" : ["السفارة", "السفارة"],
		"branchOffice" : ["السوق", "السوق"],
		"safehouse" : ["المخبأ", "المخبأ"],
		"barracks" : ["الثكنة", "الثكنة"],
		"workshop" : ["المختبر", "المختبر"],
		"carpentering" : ["انخفاض في تكلفة الخشب", "النجار"],
		"forester" : ["إنتاج الخشب", "الحطاب"],
		"stonemason" : ["إنتاج الرخام", "الحجار"],
		"glassblowing" : ["نافخ الزجاج", "نافخ الزجاج"],
		"winegrower" : ["إنتاج العنب", "مزرعة"],
		"alchemist" : ["الكيمائي", "الكيمائي"],
		"architect" : ["انخفاض في تكلفة الرخام", "المهندس"],
		"optician" : ["انخفاض في تكلفة البلور", "صانع البصريات"],
		"vineyard" : ["تخفيض تكلفة العنب", "معصرة"],
		"fireworker" : ["عامل النار", "البارود"] 
		};
	texts = {
		"Upkeep":"التكاليف",
		"cityName": "المدينة",
		"currentlyBuilding": "أعمال بناء",
		"summary": "الإجمالي",
		"hide_settings": "إخفاء الخيارات",
		"show_settings": "إظهار الخيارات",
		"Population": "السكان",
		"Research": "الابحاث",
		"finishedBuilding": "مباني منجزة","Incomes":"الذهب","Trading":"التجارة",
		"Wood": "الخشب", "Wine": "العنب", "Marble": "الرخام", "Crystal": "البلور", "Sulfur": "الكبريت" 
		};
	};

EmpireBoard.Intl.Load_Texts_BG = function()
	{
	//Bulgarian translation by dsimeonov
	langtype = "";
	buildings = {
		"townHall" : ["Кметство", "Кметство"],
		"temple" : ["Храм", "Храм"],
		"academy" : ["Академия", "Академия"],
		"port" : ["Пристанище", "Пристанище"],
		"shipyard" : ["Корабостроителница", "Корабостроителница"],
		"warehouse" : ["Склад", "Склад"],
		"wall" : ["Градска стена", "Градска стена"],
		"tavern" : ["Кръчма", "Кръчма"],
		"museum" : ["Музей", "Музей"],
		"palace" : ["Дворец", "Дворец"],
		"palaceColony" : ["Губернаторска резиденция", "Губернаторска резиденция"],
		"embassy" : ["Посолство", "Посолство"],
		"branchOffice" : ["Пазар", "Пазар"],
		"safehouse" : ["Скривалище", "Скривалище"],
		"barracks" : ["Казарма", "Казарма"],
		"workshop" : ["Работилница", "Работилница"],
		"carpentering" : ["Дърводелец", "Дърводелец"],
		"forester" : ["Горска къща", "Горска къща"],
		"stonemason" : ["Каменоделна", "Каменоделна"],
		"glassblowing" : ["Стъклодув", "Стъклодув"],
		"winegrower" : ["Винар", "Винар"],
		"alchemist" : ["Кула на Алхимика", "Кула на Алхимика"],
		"architect" : ["Офис на Архитекта", "Офис на Архитекта"],
		"optician" : ["Оптика", "Оптика"],
		"vineyard" : ["Винена преса", "Винена преса"],
		"fireworker" : ["Тестова зона за фойерверки", "Тестова зона за фойерверки"]
		};
	texts = {
		"cityName" : "Град",
		"currentlyBuilding" : "В процес на разширение",
		"summary" : "Общо",
		"hide_settings" : "Скрий",
		"show_settings" : "Покажи",
		"Population" : "Популация",
		"finishedBuilding" : "Завършена",
		"Incomes" : "Доходи",
		"Trading" : "Търговия",
		"Wood" : "Дърво",
		"Wine" : "Вино",
		"Marble" : "Мрамор",
		"Crystal" : "Кристал",
		"Sulfur" : "Сяра"
		};
	};

EmpireBoard.Intl.Load_Texts_CN = function()
	{
	//chinese translation, thank Alphasong
	langtype = "";
	buildings = {
		"townHall" : ["市政厅", "市政厅"],
		"temple"      : ["Temple", "Temple"],
		"academy" : ["学院", "学院"],
		"port" : ["港口", "港口"],
		"shipyard" : ["船坞", "船坞"],
		"warehouse" : ["仓库", "仓库"],
		"wall" : ["城墙", "城墙"],
		"tavern" : ["酒馆", "酒馆"],
		"museum" : ["博物馆", "博物馆"],
		"palace" : ["皇宫", "皇宫"],
		"palaceColony" : ["总督府", "总督府"],
		"embassy" : ["使馆", "使馆"],
		"branchOffice" : ["市场", "市场"],
		"safehouse" : ["藏身处", "藏身处"],
		"barracks" : ["兵营", "兵营"],
		"workshop" : ["兵工厂", "兵工厂"],
		"carpentering" : ["木匠所", "木匠所r"],
		"forester" : ["林务官宅", "林务官宅"],
		"stonemason" : ["石匠屋", "石匠屋"],
		"glassblowing" : ["玻璃吹制厂", "玻璃吹制厂"],
		"winegrower" : ["葡萄种植园", "葡萄种植园"],
		"alchemist" : ["炼金塔", "炼金塔"],
		"architect" : ["建筑公署", "建筑公署"],
		"optician" : ["配镜商馆", "配镜商馆"],
		"vineyard" : ["藏酒窖", "藏酒窖"],
		"fireworker" : ["烟火实验场", "烟火实验场"]
		};
	texts = {
		"cityName": "城市",
		"currentlyBuilding": "正在建造",
		"summary": "总计",
		"hide_settings": "隐藏设置", "show_settings": "显示设置",
		"Population": "人口",
		"finishedBuilding": "建造完成","Incomes":"收入","Trading":"交易",
		"Wood": "木材", "Wine": "葡萄", "Marble": "大理石", "Crystal": "水晶", "Sulfur": "硫磺"
		};
	};

EmpireBoard.Intl.Load_Texts_CZ = function()
	{
	//Czech translation , thank Tetraedron, Assassin
	langtype = "";
	buildings = {
		"townHall"     : ["Městská radnice", "Radnice"],
		"temple"      : ["Temple", "Temple"],
		"academy"      : ["Akademie", "Akademie"],
		"port"         : ["Obchodní přístav", "Přístav"],
		"shipyard"     : ["Loděnice", "Loděnice"],
		"warehouse"    : ["Sklad", "Sklad"],
		"wall"         : ["Městská zeď", "Zeď"],
		"tavern"       : ["Hostinec", "Hostinec"],
		"museum"       : ["Muzeum", "Muzeum"],
		"palace"       : ["Palác", "Palác"],
		"palaceColony" : ["Guvernérova rezidence", "Guvernér"],
		"embassy"      : ["Ambasáda", "Ambasáda"],
		"branchOffice" : ["Tržiště", "Tržiště"],
		"safehouse"    : ["Úkryt", "Úkryt"],
		"barracks"     : ["Kasárna", "Kasárna"],
		"workshop"     : ["Dílna", "Dílna"],
		"carpentering" : ["Truhlárna", "Truhlárna"],
		"forester"     : ["Hájovna", "Hájovna"],
		"stonemason"   : ["Kameník", "Kameník"],
		"glassblowing" : ["Sklárna", "Sklárna"],
		"winegrower"   : ["Vinařství", "Vinařství"],
		"alchemist"    : ["Věž alchymisty", "Věž alchymisty"],
		"architect"    : ["Pracovna architekta", "Architekt"],
		"optician"     : ["Optik", "Optik"],
		"vineyard"     : ["Vinný sklep", "Vinný sklep"],
		"fireworker"   : ["Zkušebna ohňostroje", "Zkušebna ohňostroje"]
		};
	texts = {
		"cityName"          : "Město",
		"currentlyBuilding" : "Staví se",
		"summary"           : "Celkem",
		"hide_settings"     : "Skrýt nastavení",
		"show_settings"     : "Ukázat nastavení",
		"Population"        : "Populace",
		"finishedBuilding"  : "Dokončené stavby",
		"Incomes"           : "Příjmy",
		"Trading"           : "Obchod",
		"Wood"              : "Dřevo",
		"Wine"              : "Víno",
		"Marble"            : "Mramor",
		"Crystal"           : "Sklo",
		"Sulfur"            : "Síra"
		};
	};

EmpireBoard.Intl.Load_Texts_DK = function()
	{
	// Danish  translation, thank to LGO
	langtype = "";
	buildings = {
		"townHall" : ["Rådhus", "Rådhus"],
		"temple" : ["Temple", "Tempel"],
		"academy" : ["Akademi", "Akademi"],
		"port" : ["Handelshavn", "Havn"],
		"shipyard" : ["Skipsværft", "Værft"],
		"warehouse" : ["Lagerbygning", "Lager"],
		"wall" : ["Bymur", "Mur"],
		"tavern" : ["Værtshus", "Kro"],
		"museum" : ["Museum", "Museum"],
		"palace" : ["Palads", "Palads"],
		"palaceColony" : ["Guvernørens residens", "Guvernør"],
		"embassy" : ["Ambassade", "Ambassade"],
		"branchOffice" : ["Handelsstation", "Handel"],
		"safehouse" : ["Skjulested", "Spion"],
		"barracks" : ["Kaserne", "Kaserne"],
		"workshop" : ["Værksted", "Værksted"],
		"carpentering" : ["Tømrer", "Tømrer"],
		"forester" : ["Skovfodged", "Skov"],
		"stonemason" : ["Stenhugger", "Sten"],
		"glassblowing" : ["Glaspuster", "Glas"],
		"winegrower" : ["Vinplanter", "Vin"],
		"alchemist" : ["Alkymist", "Alkymist"],
		"architect" : ["Arkitekt", "Arkitekt"],
		"optician" : ["Optiker", "Optiker"],
		"vineyard" : ["Vinpresse", "Vin"],
		"fireworker" : ["Fyrværkerifabrik", "Fyrværk."]
		};
	texts = {
		"Upkeep" :"Vedligehold",
		"cityName": "Bynavn",
		"currentlyBuilding": "Bygger nu",
		"summary": "Total",
		"hide_settings": "Gem indstillinger", "show_settings": "Vis indstillinger",
		"Population": "Befolkning",
		"Research": "Forskning",
		"finishedBuilding": "Færdig bygget","Incomes":"Inkomst","Trading":"Handler",
		"Wood": "Træ", "Wine": "Vin", "Marble": "Marmor", "Crystal": "Krystal", "Sulfur": "Svovl"
		}; 
	};

EmpireBoard.Intl.Load_Texts_DE = function()
	{
	//german translation, thanks to Schneppi & xkaaay
	langtype = "";
	buildings = {
		"townHall"      : ["Rathaus", "Rathaus"],
		"temple"		 : ["Tempel", "Tempel"],
		"academy"       : ["Akademie", "Akademie"],
		"port"          : ["Handelshafen", "Handelshafen"],
		"shipyard"      : ["Schiffswerft", "Schiffswerft"],
		"warehouse"     : ["Lagerhaus", "Lagerhaus"],
		"dump"			 : ["Halde", "Halde"],
		"wall"          : ["Stadtmauer", "Stadtmauer"],
		"tavern"        : ["Taverne", "Taverne"],
		"museum"        : ["Museum", "Museum"],
		"palace"        : ["Palast", "Palast"],
		"palaceColony"  : ["Statthaltersitz", "Statthaltersitz"],
		"embassy"       : ["Botschaft", "Botschaft"],
		"branchOffice"  : ["Kontor", "Kontor"],
		"safehouse"     : ["Versteck", "Versteck"],
		"barracks"      : ["Kaserne", "Kaserne"],
		"workshop"      : ["Erfinderwerkstatt", "Erfinderwerkstatt"],
		"carpentering"  : ["Zimmerei", "Zimmerei"],
		"forester"      : ["Forsthaus", "Forsthaus"],
		"stonemason"    : ["Steinmetz", "Steinmetz"],
		"glassblowing"  : ["Glasbläserei", "Glasbläserei"],
		"winegrower"    : ["Winzerei", "Winzerei"],
		"alchemist"     : ["Alchimistenturm", "Alchimistenturm"],
		"architect"     : ["Architekturbüro", "Architekturbüro"],
		"optician"      : ["Optiker", "Optiker"],
		"vineyard"      : ["Kelterei", "Kelterei"],
		"fireworker"    : ["Feuerwerksplatz", "Feuerwerksplatz"]
		};
	texts = {
		"Upkeep"			: "Unterhalt",
		"cityName"          : "Stadtname",
		"currentlyBuilding" : "Zur Zeit im Bau",
		"summary"           : "Gesamt",
		"hide_settings"     : "Verstecke Optionen",
		"show_settings"     : "Zeige Optionen",
		"Population"        : "Bevölkerung",
		"finishedBuilding"  : "Bau abgeschlossen",
		"Incomes"           : "Einkommen",
		"Trading"           : "Handel",
		"Wood"              : "Baumaterial",
		"Wine"              : "Wein",
		"Marble"            : "Marmor",
		"Crystal"           : "Kristallglas",
		"Sulfur"            : "Schwefel",
		"Growth"			 : "Wachstum",
		"Research"			 : "Forschung"
		};
	};

EmpireBoard.Intl.Load_Texts_ES = function()
	{
	//Spanish translation, thanks to dragondeluz, graff86, Crom
	langtype = "";
	buildings = {
		"townHall" : ["Intendencia", "Intendencia"],
		"temple"      : ["Templo", "Templo"],
		"academy" : ["Academia", "Academia"],
		"port" : ["Puerto comercial", "Puerto"],
		"shipyard" : ["Astillero", "Astillero"],
		"warehouse" : ["Depósito", "Depósito"],
		"wall" : ["Muralla", "Muralla"],
		"tavern" : ["Taberna", "Taberna"],
		"museum" : ["Museo", "Museo"],
		"palace" : ["Palacio", "Palacio"],
		"palaceColony" : ["Residencia del Gobernador", "Residencia"],
		"embassy" : ["Embajada", "Embajada"],
		"branchOffice" : ["Tienda", "Tienda"],
		"safehouse" : ["Escondite", "Escondite"],
		"barracks" : ["Cuarteles", "Cuarteles"],
		"workshop" : ["Taller de invenciones", "Taller"],
		"carpentering" : ["Carpintería", "Carpintería"],
		"forester" : ["Cabaña del guardabosques", "Cabaña"],
		"stonemason" : ["Cantero", "Cantero"],
		"glassblowing" : ["Soplador de vidrio", "Soplador"],
		"winegrower" : ["Vinicultor", "Vinicultor"],
		"alchemist" : ["Torre del Alquimista", "Alquimista"],
		"architect" : ["Oficina del Arquitecto", "Arquitecto"],
		"optician" : ["Óptico", "Óptico"],
		"vineyard" : ["Prensa de Vino", "Prensa"],
		"fireworker" : ["Área de Pruebas Pirotécnicas", "Pirotécnica"]
		};
	texts = {
		"Upkeep"			:"Costes",
		"cityName": "Ciudad", "currentlyBuilding": "Construyendo", "summary": "Totales",
		"hide_settings": "Ocultar opciones", "show_settings": "Mostrar opciones",
		"Population": "Población",
		"Research": "Investigación",
		"finishedBuilding": "Edificios terminados","Incomes":"Ingresos","Trading":"Comercio",
		"Wood": "Madera",
		"Wine": "Vino",
		"Marble": "Mármol",
		"Crystal": "Cristal",
		"Sulfur": "Azufre"
		}; 
	};

EmpireBoard.Intl.Load_Texts_FI = function()
	{
	//Finnish translation by DeFe
	langtype = "";
	buildings = {
		"townHall" : ["Kaupungintalo", "K. Talo"],
		"temple" : ["Temppeli", "Temppeli"],
		"academy" : ["Akatemia", "Akatemia"],
		"port" : ["Kauppasatama", "Satama"],
		"shipyard" : ["Telakka", "Telakka"],
		"warehouse" : ["Varasto", "Varasto"],
		"dump" : ["Säilytysalue", "Säilytysalue"],
		"wall" : ["Muuri", "Muuri"],
		"tavern" : ["Taverna", "Taverna"],
		"museum" : ["Museo", "Museo"],
		"palace" : ["Palatsi", "Palatsi"],
		"palaceColony" : ["Kuvernöörin asunto", "Kuvernööri"],
		"embassy" : ["Lähetystö", "Lähetystö"],
		"branchOffice" : ["Kauppapaikka", "Kauppapaikka"],
		"safehouse" : ["Piilopaikka", "Piilopaikka"],
		"barracks" : ["Kasarmi", "Kasarmi"],
		"workshop" : ["Paja", "Paja"],
		"carpentering" : ["Puusepän Paja", "Puuseppä"],
		"forester" : ["Metsänhoitaja", "Metsänhoitaja"],
		"stonemason" : ["Kivenhakkaaja", "Kivenhakkaaja"],
		"glassblowing" : ["Lasinpuhaltaja", "Lasinpuhaltaja"],
		"winegrower" : ["Viinitarhuri", "Viinitarhuri"],
		"alchemist" : ["Alkemistin Torni", "Alkemisti"],
		"architect" : ["Arkkitehdin Toimisto", "Arkkitehti"],
		"optician" : ["Optikko", "Optikko"],
		"vineyard" : ["Viinipaino", "Viinipaino"],
		"fireworker" : ["Ilotulite Testialue", "Testialue"] 
		};
	texts = {
		"Upkeep": "Ylläpito",
		"Growth": "Kasvu",
		"cityName": "Kaupungin nimi",
		"currentlyBuilding": "Rakentumassa",
		"summary": "Yhteenveto",
		"hide_settings": "Piilota asetukset",
		"show_settings": "Näytä asetukset",
		"Population": "Populaatio",
		"finishedBuilding": "Rakennus valmis",
		"Incomes":"Tulot",
		"Trading":"kaupankäynti",
		"Wood": "Puu",
		"Wine": "Viini",
		"Marble": "Marmori",
		"Crystal": "Kristalli",
		"Sulfur": "Rikki" 
		}; 
	};

EmpireBoard.Intl.Load_Texts_FR = function()
	{
	//French translation, thanks to Chirel
	langtype = "";
	buildings = {
		"townHall"      : ["Hôtel de ville", "HdV"],
		"temple"      : ["Temple", "Temple"],
		"academy"       : ["Académie", "Ac."],
		"port"          : ["Port commercial", "Port"],
		"shipyard"      : ["Chantier naval", "Chtr"],
		"warehouse"     : ["Entrepôt", "Entp"],
		"dump"			 : ["Dépôt", "Dépôt"],
		"wall"          : ["Mur d'enceinte", "Mur"],
		"tavern"        : ["Taverne", "Tvrn"],
		"museum"        : ["Musée", "Msé"],
		"palace"        : ["Palais", "Plais"],
		"palaceColony"  : ["Résidence du Gouverneur", "RdG"],
		"embassy"       : ["Ambassade", "Amb."],
		"branchOffice"  : ["Comptoir", "Cptr"],
		"safehouse"     : ["Cachette", "Ccht"],
		"barracks"      : ["Caserne", "Csrn"],
		"workshop" 	  : ["Atelier", "Atlr"],
		"carpentering" : ["Menuisier","Men."],
		"forester" : ["Maison forestière","Frst"],
		"stonemason" : ["Tailleur de pierres","Tail."],
		"glassblowing" : ["Verrier","Vrr"],
		"winegrower" : ["Pressoir à vin","Prsr"],
		"alchemist" : ["Tour des alchimistes","Alch."],
		"architect" : ["Bureau de l`architecte","Arch."],
		"optician" : ["Opticien","Opt."],
		"vineyard" : ["Cave à vin","Cave"],
		"fireworker" : ["Zone de test des artificiers","Artf"]
		};
	texts = {
		"Upkeep"				 : "Coûts",
		"Growth"				 : "Croissance",
		"cityName": "Villes",
		"currentlyBuilding": "Construction en cours",
		"summary": "Total",
		"hide_settings": "Cacher les options",
		"show_settings": "Voir les options",
		"Population": "Population",
		"Research": "Recherche",
		"finishedBuilding": "Construction terminée",
		"Incomes":"Revenus",
		"Trading":"Commerce",
		"Wood": "Bois",
		"Wine": "Vin",
		"Marble": "Marbre",
		"Crystal": "Cristal",
		"Sulfur": "Soufre"
		};
	};

EmpireBoard.Intl.Load_Texts_GR = function()
	{
	//greek translation, thanks to panospap and Napoleon I
	langtype = "";  
	buildings = {  
		"townHall" : ["Δημαρχείο", "Δημαρχείο"],  
		"temple"      : ["Ναός", "Ναός"],  
		"academy" : ["Ακαδημία", "Ακαδημία"],  
		"port" : ["Εμπορικός Λιμένας", "Εμπορικός Λιμένας"],  
		"shipyard" : ["Ναυπηγείο", "Ναυπηγείο"],  
		"warehouse" : ["Αποθήκη Εμπορευμάτων", "Αποθήκη Εμπορευμάτων"], 
		"dump"           : ["Αλάνα", "Αλάνα"],
		"wall" : ["Τείχη της Πόλης", "Τείχη της Πόλης"],  
		"tavern" : ["Ταβέρνα", "Ταβέρνα"],  
		"museum" : ["Μουσείο", "Μουσείο"],  
		"palace" : ["Παλάτι", "Παλάτι"],  
		"palaceColony" : ["Η Κατοικία του Κυβερνήτη", "Η Κατοικία του Κυβερνήτη"],  
		"embassy" : ["Πρεσβεία", "Πρεσβεία"],  
		"branchOffice" : ["Θέση Εμπορικών Συναλλαγών", "Θέση Εμπορικών Συναλλαγών"],  
		"safehouse" : ["Κρησφύγετο", "Κρησφύγετο"],  
		"barracks" : ["Στρατώνες", "Στρατώνες"],  
		"workshop" : ["Εργαστήριο", "Εργαστήριο"],  
		"carpentering" : ["Ξυλουργός", "Ξυλουργός"],  
		"forester" : ["Σπίτι Ξυλοκόπου", "Σπίτι Ξυλοκόπου"],  
		"stonemason" : ["Κτίριο Λατομείου", "Κτίριο Λατομείου"],  
		"glassblowing" : ["Υαλουργείο", "Υαλουργείο"],  
		"winegrower" : ["Αποστακτήριο", "Αποστακτήριο"],  
		"alchemist" : ["Πύργος Αλχημιστή", "Πύργος Αλχημιστή"],  
		"architect" : ["Αρχιτεκτονικό Γραφείο", "Αρχιτεκτονικό Γραφείο"],  
		"optician" : ["Οπτικός", "Οπτικός"],  
		"vineyard" : ["Πιεστήριο Σταφυλιού", "Πιεστήριο Σταφυλιού"],  
		"fireworker" : ["Περιοχή Δοκιμών Πυροτεχνημάτων", "Περιοχή Δοκιμών Πυροτεχνημάτων"]  
		};  
	texts = {  
		"Upkeep":"Συντήρηση",
		"Growth"         : "Ικανοποίηση", 
		"cityName": "Όνομα Πόλης",
		"currentlyBuilding": "Αναβαθμίζετε τώρα",
		"summary": "Σύνολο",  
		"hide_settings": "Κρύψε ρυθμίσεις",
		"show_settings": "Εμφάνισε ρυθμίσεις",  
		"Population": "Πληθυσμός",  
		"Research": "Έρευνες",  
		"finishedBuilding": "Ολοκληρωμένη Αναβαθμιση",
		"Incomes":"Εισοδήματα",
		"Trading":"Εμπόριο",  
		"Wood": "Οικοδομικό Υλικό",
		"Wine": "Κρασί",
		"Marble": "Μάρμαρο",
		"Crystal": "Κρύσταλλο",
		"Sulfur": "Θείο"  
		};  
	};

EmpireBoard.Intl.Load_Texts_HU = function()
	{
	// Thank Luzer
	langtype = "";
	buildings = {
		"townHall"      : ["Városháza", "Városháza"],
		"temple"      : ["Templom", "Templom"],
		"academy"       : ["Akadémia", "Akadémia"],
		"port"          : ["Kikötő", "Kikötő"],
		"shipyard"      : ["Hajógyár", "Hajógyár"],
		"warehouse"     : ["Raktár", "Raktár"],
		"wall"          : ["Városfal", "Fal"],
		"tavern"        : ["Fogadó", "Fogadó"],
		"museum"        : ["Múzeum", "Múzeum"],
		"palace"        : ["Palota", "Palota"],
		"palaceColony"  : ["Helytartó", "Helytartó"],
		"embassy"       : ["Nagykövetség", "Nagykövetség"],
		"branchOffice"  : ["Kereskedő", "Kereskedő"],
		"safehouse"     : ["Rejtekhely", "Rejtekhely"],
		"barracks"      : ["Barakk", "Barakk"],
		"workshop"		  : ["Műhely", "Műhely"],
		"carpentering" : ["Ácsmester", "Ácsmester"],
		"forester" : ["Erdész", "Erdész"],
		"stonemason" : ["Kőműves", "Kőműves"],
		"glassblowing" : ["Üvegfúvó", "Üvegfúvó"],
		"winegrower" : ["Bortermelő", "Bortermelő"],
		"alchemist" : ["Alkimista", "Alkimista"],
		"architect" : ["Építész", "Építész"],
		"optician" : ["Optikus", "Optikus"],
		"vineyard" : ["Szőlőprés", "Szőlőprés"],
		"fireworker" : ["Tűzszerész", "Tűzszerész"],
		"dump" : ["Nyersanyag depó", "Depó"]
		};
	texts = {
		"Growth" : "Növekedés", 
		"Upkeep"			:"Fenntartás",
		"cityName": "Város neve",
		"currentlyBuilding": "Építés alatt",
		"summary": "Összesen",
		"hide_settings": "Beállítások elrejtése",
		"show_settings": "Beállítások megtekintése",
		"Population": "Lakosság",
		"Research": "Fejlesztés",
		"finishedBuilding": "Finished building",
		"Incomes":"Bevételek",
		"Trading":"Trading",
		"Wood": "Építőanyag",
		"Wine": "Bor",
		"Marble": "Márvány",
		"Crystal": "Kristály",
		"Sulfur": "Kénpor"
		};
	};

EmpireBoard.Intl.Load_Texts_IL = function()
	{
	//hebrew translation, thank Refael Ackermann, Yaakov Rothmann
	langtype = "rf";
	buildings = {
		"townHall"      : ["עיריה", "עיריה"],
		"temple" : ["מקדש", "מקדש"], 
		"academy"       : ["אקדמיה", "אקדמיה"],
		"port"          : ["נמל מסחר", "נמל"],
		"shipyard"      : ["מספנה", "מספנה"],
		"warehouse"     : ["מחסן", "מחסן"],
		"wall"          : ["חומה", "חומה"],
		"tavern"        : ["פונדק", "פונדק"],
		"museum"        : ["מוזאון", "מוזאון"],
		"palace"        : ["ארמון", "ארמון"],
		"palaceColony"  : ["מגורי המושל", "מושל"],
		"embassy"       : ["שגרירות", "שגרירות"],
		"branchOffice"  : ["תחנת סחר", "סחר"],
		"safehouse"     : ["מחבוא", "מחבוא"],
		"barracks"      : ["מגורי חיילים", "חיילים"],
		"workshop"      : ["סדנא", "סדנא"],
		"carpentering"  : ["נגר", "נגר"],
		"forester"      : ["יערן", "יערן"],
		"stonemason"    : ["חרש אבן", "אבן"],
		"glassblowing"  : ["נפח זכוכית", "זכוכית"],
		"winegrower"    : ["יינן", "יינן"],
		"alchemist"     : ["אלכימאי", "אלכימאי"],
		"architect"     : ["ארכיטקט", "ארכיטקט"],
		"optician"      : ["אופטיקאי", "אופטיקאי"],
		"vineyard"      : ["יקב", "יקב"],
		"fireworker"    : ["זיקוקים", "זיקוקים"],
		"dump" : ["מאגר", "לפרק"]
		};
	texts = {
		"Upkeep" : "אחזקה",
		"Growth" : "גידול", 
		"cityName": "שם עיר",
		"currentlyBuilding": "בבניה",
		"summary": "סיכום",
		"hide_settings": "הסתר אפשרויות",
		"show_settings": "הצג אפשרויות",
		"Population": "אוכלוסיה",
		"Research" : "מחקר", 
		"finishedBuilding": "הסתימה בניה",
		"Incomes":"הכנסה",
		"Trading":"סוחר",
		"Wood": "עץ",
		"Wine": "יין",
		"Marble": "שיש",
		"Crystal": "קריסטל",
		"Sulfur": "גופרית"
		};
	};

EmpireBoard.Intl.Load_Texts_IR = function()
	{
	// Todo
	this.Load_Texts_EN();
	langtype = "rf";
	};
	
EmpireBoard.Intl.Load_Texts_IT = function()
	{
	//Italian translation, thanks to Brucee and matteo466
	langtype = "";
	buildings = {
		"townHall" : ["Municipio", "Municipio"],
		"temple"      : ["Temple", "Temple"],
		"academy" : ["Accademia", "Accademia"],
		"port" : ["Porto", "Porto"],
		"shipyard" : ["Cantiere navale", "Cantiere navale"],
		"warehouse" : ["Magazzino", "Magazzino"],
		"wall" : ["Muro", "Muro"],
		"tavern" : ["Taverna", "Taverna"],
		"museum" : ["Museo", "Museo"],
		"palace" : ["Palazzo", "Palazzo"],
		"palaceColony" : ["Governatore", "Governatore"],
		"embassy" : ["Ambasciata", "Ambasciata"],
		"branchOffice" : ["Mercato", "Mercato"],
		"safehouse" : ["Nascondiglio", "Nascondiglio"],
		"barracks" : ["Caserma", "Caserma"],
		"workshop" : ["Officina", "Officina"],
		"carpentering" : ["Carpentiere", "Carpentiere"],
		"forester" : ["Guardaboschi", "Guardaboschi"],
		"stonemason" : ["Tagliapietre", "Tagliapietre"],
		"glassblowing" : ["Vetraio", "Vetraio"],
		"winegrower" : ["Viticoltore", "Viticoltore"],
		"alchemist" : ["Alchimista", "Alchimista"],
		"architect" : ["Architetto", "Architetto"],
		"optician" : ["Ottico", "Ottico"],
		"vineyard" : ["Cantina", "Cantina"],
		"fireworker" : ["Pirotecnico", "Pirotecnico"]
		};
	texts = {
		"cityName": "Città", "currentlyBuilding": "Costruzione in corso", "summary": "Sommario",
		"hide_settings": "Nascondi opzioni", "show_settings": "Mostra opzioni",
		"Population": "Popolazione",
		"finishedBuilding": "Costruzione completata","Incomes":"Saldo oro",
		"Wood": "Legno", "Wine": "Vino", "Marble": "Marmo", "Crystal": "Cristallo", "Sulfur": "Zolfo"
		};
	};

EmpireBoard.Intl.Load_Texts_LV = function()
	{
	//Latvian translation by aezaurs/sauron
	langtype = "";
	buildings = {
		"townHall" : ["Rātsnams", "Rātsnams"],
		"temple" : ["Templis", "Templis"],
		"academy" : ["Akadēmija", "Akadēmija"],
		"port" : ["Osta", "Osta"],
		"shipyard" : ["Kuģu būvētava", "Kuģu būvētava"],
		"warehouse" : ["Noliktava", "Noliktava"],
		"wall" : ["Mūris", "Mūris"],
		"tavern" : ["Krogs", "Krogs"],
		"museum" : ["Muzejs", "Muzejs"],
		"palace" : ["Pils", "Pils"],
		"palaceColony" : ["Gubernātora rezidence", "Gubernātora rezidence"],
		"embassy" : ["Vēstniecība", "Vēstniecība"],
		"branchOffice" : ["Tirgus", "Tirgus"],
		"safehouse" : ["Paslēptuve", "Paslēptuve"],
		"barracks" : ["Kazarmas", "Kazarmas"],
		"workshop" : ["Darbnīca", "Darbnīca"],
		"carpentering" : ["Namdaris", "Namdaris"],
		"forester" : ["Mežsarga māja", "Mežsargs"],
		"stonemason" : ["Akmeņkalis", "Akmeņkalis"],
		"glassblowing" : ["Stikla pūtējs", "Stiklinieks"],
		"winegrower" : ["Vīna audzētājs", "Vīna audzētājs"],
		"alchemist" : ["Alhīmiķa Tornis", "Alhīmiķa Tornis"],
		"architect" : ["Arhitekta Ofiss", "Arhitekts"],
		"optician" : ["Optiķis", "Optiķis"],
		"vineyard" : ["Vīna Gatavotājs", "Vīna Gatavotājs"],
		"fireworker" : ["Uguņošanas izmēģinājumu apgabals", "Uguņošanas apg."]
		};
	texts = {
		"Upkeep" :"Uzturēšana",
		"cityName" : "Pilsēta",
		"currentlyBuilding" : "Šobrīd ceļās",
		"summary" : "Kopā",
		"hide_settings" : "Slēpt iestatījumus",
		"show_settings" : "Rādīt iestatījumus",
		"Population" : "Apdzīvotība",
		"Research": "Izpēte",
		"finishedBuilding" : "Pabeigta celtniecība",
		"Incomes" : "Zelts",
		"Trading" : "Tirzniecība",
		"Wood" : "Koks",
		"Wine" : "Vīns",
		"Marble" : "Marmors",
		"Crystal" : "Kristāls",
		"Sulfur" : "Sērs"
		};
	};

EmpireBoard.Intl.Load_Texts_NL = function()
	{
	//Dutch translation, thanks to cremers
	langtype = "";
	buildings = {
		"townHall" : ["Stadhuis", "Stadhuis"],
		"temple"      : ["Temple", "Temple"],
		"academy" : ["Academie", "Academie"],
		"port" : ["Handelshaven", "Haven"],
		"shipyard" : ["Scheepswerf", "Werf"],
		"warehouse" : ["Opslagplaats", "Opslagplaats"],
		"wall" : ["Stadsmuur", "Muur"],
		"tavern" : ["Taverne", "Taverne"],
		"museum" : ["Museum", "Museum"],
		"palace" : ["Paleis", "Paleis"],
		"palaceColony" : ["Gouverneurswoning", "Gouverneurswoning"],
		"embassy" : ["Ambassade", "Ambassade"],
		"branchOffice" : ["Handelspost", "Handelspost"],
		"safehouse" : ["Schuilplaats", "Schuilplaats"],
		"barracks" : ["Barakken", "Barakken"],
		"workshop" : ["Werkplaats", "Werkplaats"],
		"carpentering" : ["Timmerman", "Timmerman"],
		"forester" : ["Houthakkers Loge", "Houthakkers Loge"],
		"stonemason" : ["Steenhouwer", "Steenhouwer"],
		"glassblowing" : ["Glasblazer", "Glasblazer"],
		"winegrower" : ["Wijnboer", "Wijnboer"],
		"alchemist" : ["De Alchemie Toren", "De Alchemie Toren"],
		"architect" : ["Architectenbureau", "Architectenburea"],
		"optician" : ["Opticien", "Opticien"],
		"vineyard" : ["Wijnpers", "Wijnpers"],
		"fireworker" : ["Vuurwerk Opslag", "Vuurwerk Opslag"]
		};
	texts = {
		"cityName": "Stadsnaam", "currentlyBuilding": "Huidige constructie", "summary": "Opgeteld",
		"hide_settings": "Verberg instellingen", "show_settings": "Instellingen",
		"Population": "Inwoners", "finishedBuilding": "Klaar","Incomes":"Inkomsten","Trading":"Handel",
		"Wood": "Hout", "Wine": "Wijn", "Marble": "Marmer", "Crystal": "Glas", "Sulfur": "Zwavel"
		}; 
	};
	
EmpireBoard.Intl.Load_Texts_PK = function()
	{
	// Todo
	this.Load_Texts_EN();
	langtype = "rf";
	};
	
EmpireBoard.Intl.Load_Texts_PL = function()
	{
	// thanks to Syjamek and Patibar
	langtype = "";
	buildings = {
		"townHall" : ["Ratusz", "Ratusz"],
		"temple"      : ["Świątynia", "Świątynia"],
		"academy" : ["Akademia", "Akademia"],
		"port" : ["Port", "Port"],
		"shipyard" : ["Stocznia", "Stocznia"],
		"warehouse" : ["Magazyn", "Magazyn"],
		"wall" : ["Mur", "Mur"],
		"tavern" : ["Tawerna ", "Tawerna"],
		"museum" : ["Muzeum", "Muzeum"],
		"palace" : ["Pałac", "Pałac"],
		"palaceColony" : ["Rezydencja", "Rezydencja"],
		"embassy" : ["Ambasada", "Ambasada"],
		"branchOffice" : ["Bazar", "Bazar"],
		"safehouse" : ["Kryjówka", "Kryjówka"],
		"barracks" : ["Koszary", "Koszary"],
		"workshop" : ["Warsztat", "Warsztat"],
		"carpentering" : ["Warsztat Cieśli", "Warsztat Cieśli"],
		"forester" : ["Leśniczówka", "Leśniczówka"],
		"stonemason" : ["Kamieniarz", "Kamieniarz"],
		"glassblowing" : ["Huta Szkła", "Huta Szkła"],
		"winegrower" : ["Winnica", "Winnica"],
		"alchemist" : ["Wieża Alchemika", "Wieża Alchemika"],
		"architect" : ["Biuro Architekta", "Biuro Architekta"],
		"optician" : ["Optyk", "Optyk"],
		"vineyard" : ["Winiarz", "Winiarz"],
		"fireworker" : ["Zakład Pirotechnika", "Zakład Pirotechnika"]
		};
	texts = {
		"Upkeep"			:"Koszty utrzymania",
		"cityName": "Nazwa", "currentlyBuilding": "W budowie", "summary": "Suma",
		"hide_settings": "Ukryj ustawieni", "show_settings": "Pokaż ustawienia",
		"Population": "Populacja",
		"Research": "Badania",
		"finishedBuilding": "Budowa zakończona","Incomes":"Bilans złota","Trading":"Handel",
		"Wood": "Drewno", "Wine": "Wino", "Marble": "Marmur", "Crystal": "Kryształ", "Sulfur": "Siarka"
		}; 
	};

EmpireBoard.Intl.Load_Texts_PT = function()
	{
	// Portuguese translation, thanks to alpha tester, Mr. Burns, Jeanipoo
	langtype = "";
	buildings = {
		"townHall"      : ["Câmara Municipal", "Câmara Municipal"],
		"temple"      : ["Temple", "Temple"],
		"academy"       : ["Academia", "Academia"],
		"port"          : ["Porto Mercantil", "Porto"],
		"shipyard"      : ["Estaleiro", "Estaleiro"],
		"warehouse"     : ["Armazém", "Armazém"],
		"wall"          : ["Muralha", "Muralha"],
		"tavern"        : ["Taberna", "Taberna"],
		"museum"        : ["Museu", "Museu"],
		"palace"        : ["Palácio", "Palácio"],
		"palaceColony"  : ["Residência do Governador", "Governador"],
		"embassy"       : ["Embaixada", "Embaixada"],
		"branchOffice"  : ["Mercado", "Mercado"],
		"safehouse"     : ["Espionagem", "Espionagem"],
		"barracks"      : ["Quartel", "Quartel"],
		"workshop" : ["Oficina", "Oficina"],
		"carpentering" : ["Carpintaria", "Carpintaria"],
		"forester" : ["Guarda Florestal", "Florestal"],
		"stonemason" : ["Pedreiro", "Pedreiro"],
		"glassblowing" : ["Fábrica de Vidro", "Vidro"],
		"winegrower" : ["Viticultor", "Viticultor"],
		"alchemist" : ["Torre do Alquimista", "Alquimista"],
		"architect" : ["Atelier de Arquitetura", "Arquitetura"],
		"optician" : ["Oculista", "Oculista"],
		"vineyard" : ["Caves de Vinho", "Caves"],
		"fireworker" : ["Fábrica de Pirotecnia", "Pirotecnia"]
		};
	texts = {
		"Upkeep"				 : "Manutenção",
		"Growth"				 : "Crescimento",
		"Research"				 : "Pesquisa",
		"cityName": "Cidades",
		"currentlyBuilding": "Em Construçao",
		"summary": "Sumário",
		"hide_settings": "Ocultar Configuraçoes",
		"show_settings": "Ver Configuraçoes",
		"Population": "População",
		"Incomes":"Rendimento",
		"Wood": "Madeira",
		"Wine": "Vinho",
		"Marble": "Mármore",
		"Crystal": "Cristal",
		"Sulfur": "Enxofre"
		};
	};

EmpireBoard.Intl.Load_Texts_RO = function()
	{
	//Romanian translation, thanks to Peta
	langtype = "";
	buildings = {
		"townHall" : ["Primarie", "Primarie"],
		"temple"      : ["Temple", "Temple"],
		"academy" : ["Academie", "Academie"],
		"port" : ["Port comercial", "Port"],
		"shipyard" : ["Santier Naval", "S.Naval"],
		"warehouse" : ["Depozit", "Depozit"],
		"wall" : ["Zid", "Zid"],
		"tavern" : ["Taverna", "Taverna"],
		"museum" : ["Muzeu", "Muzeu"],
		"palace" : ["Palat", "Palat"],
		"palaceColony" : ["Resedinta Guvernatorului", "R.Guv."],
		"embassy" : ["Ambasada", "Ambasada"],
		"branchOffice" : ["Punct de negot", "Piata"],
		"safehouse" : ["Ascunzatoare", "Ascunzatoare"],
		"barracks" : ["Cazarma", "Cazarma"],
		"workshop" : ["Atelier", "Atelier"],
		"carpentering" : ["Dulgher", "Dulgher"],
		"forester" : ["Casa Padurarului", "Padurar"],
		"stonemason" : ["Cariera", "Cariera"],
		"glassblowing" : ["Sticlarie", "Sticlarie"],
		"winegrower" : ["Vinificator", "Vinificator"],
		"alchemist" : ["Turnul Alchimistului", "Alchimist"],
		"architect" : ["Biroul Arhitectului", "Architect"],
		"optician" : ["Optician", "Optician"],
		"vineyard" : ["Presa de Vin", "Presa Vin"],
		"fireworker" : ["Zona Pirotehnica de Test", "Poligon"]
		};
	texts = {
		"cityName": "Nume Oras", "currentlyBuilding": "In constructie", "summary": "Total",
		"hide_settings": "Ascunde Setari", "show_settings": "Arata Setari",
		"Population": "Populatie",
		"finishedBuilding": "Constructie Finalizata","Incomes":"Economii","Trading":"Comert",
		"Wood": "Lemn", "Wine": "Vin", "Marble": "Marmura", "Crystal": "Cristal", "Sulfur": "Sulf"
		};
	};

EmpireBoard.Intl.Load_Texts_RS = function()
	{
	//serbian translation by s-a-k-a 
	langtype = "";
	buildings = {
		"townHall"       : ["Градска кућа", "Г. кућа"],    
		"temple"         : ["Храм", "Храм"],    
		"academy"        : ["Академија", "Академија"],    
		"port"           : ["Трговачка лука", "Лука"],    
		"shipyard"       : ["Бродоградилиште", "Бродоградилиште"],    
		"warehouse"      : ["Складиште", "Складиште"],    
		"wall"           : ["Градски зид", "Зид"],    
		"tavern"         : ["Крчма", "Крчма"],    
		"museum"         : ["Музеј", "Музеј"],    
		"palace"         : ["Палата", "Палата"],    
		"palaceColony"   : ["Гувернерова резиденција", "Резиденција"],    
		"embassy"        : ["Амбасада", "Амбасада"],    
		"branchOffice"   : ["Трговина", "Трговина"],    
		"safehouse"      : ["Скровиште", "Скровиште"],    
		"barracks"       : ["Барака", "Барака"],    
		"workshop"       : ["Радионица", "Радионица"],    
		"carpentering"   : ["Тесар", "Тесар"],    
		"forester"       : ["Шумарова кућа", "Ш. кућа"],    
		"stonemason"     : ["Зидар", "Зидар"],    
		"glassblowing"   : ["Стаклара", "Стаклара"],    
		"winegrower"     : ["Виноградар", "Виноградар"],    
		"alchemist"      : ["Алхемичарев торањ", "Торањ"],    
		"architect"      : ["Архитектина канцеларија", "Архитекта"],    
		"optician"       : ["Оптичар", "Оптичар"],    
		"vineyard"       : ["Винска преса", "Преса"],    
		"fireworker"     : ["Област за тестирање ватромета", "Област"]    
		};
	texts = {
		"Upkeep"                 : "Одржавање",    
		"cityName"               : "Градови",    
		"currentlyBuilding"      : "Тренутно се гради",    
		"summary"                : "Кратак преглед",    
		"hide_settings"          : "Сакриј подешавања",    
		"show_settings"          : "Прикажи подешавања",    
		"Population"             : "Популација",    
		"Research"               : "Истраживање",    
		"finishedBuilding"       : "Завршена изградња",    
		"Incomes"                : "Приходи",    
		"Trading"                : "Трговински",    
		"Wood"                   : "Дрво",    
		"Wine"                   : "Вино",    
		"Marble"                 : "Мермер",    
		"Crystal"                : "Кристал",    
		"Sulfur"                 : "Сумпор"    
		};
	};

EmpireBoard.Intl.Load_Texts_RU = function()
	{
	//russian translation by Mugivara, GrAndAG
	langtype = "";
	buildings = {
		"townHall" : ["Ратуша", "Ратуша"],
		"temple" : ["Храм", "Храм"],
		"academy" : ["Академия", "Академия"],
		"port" : ["Торговый порт", "Порт"],
		"shipyard" : ["Верфь", "Верфь"],
		"warehouse" : ["Склад", "Склад"],
		"wall" : ["Стена", "Стена"],
		"tavern" : ["Таверна", "Таверна"],
		"museum" : ["Музей", "Музей"],
		"palace" : ["Дворец", "Дворец"],
		"palaceColony" : ["Резиденция губернатора", "Резиденция"],
		"embassy" : ["Посольство", "Посольство"],
		"branchOffice" : ["Торговый пост", "Пост"],
		"safehouse" : ["Укрытие", "Укрытие"],
		"barracks" : ["Казарма", "Казарма"],
		"workshop" : ["Мастерская", "Мастерская"],
		"carpentering" : ["Плотницкая мастерская", "Плотник"],
		"forester" : ["Хижина леничего", "Лесничий"],
		"stonemason" : ["Каменоломня", "Каменоломня"],
		"glassblowing" : ["Стеклодувная мастерская", "Стеклодув"],
		"winegrower" : ["Винодельня", "Винодельня"],
		"alchemist" : ["Башня алхимика", "Алхимик"],
		"architect" : ["Бюро архитектора", "Архитектор"],
		"optician" : ["Оптика", "Оптика"],
		"vineyard" : ["Винный погреб", "Погреб"],
		"fireworker" : ["Полигон пиротехника", "Полигон"]
		};
	texts = {
		"Upkeep": "Содерж.",
		"Growth": "Рост",
		"cityName": "Название города",
		"currentlyBuilding": "Текущее строительство",
		"summary": "Итого",
		"hide_settings": "Скрыть настройки",
		"show_settings": "Показать настройки",
		"Population": "Население",
		"Research": "Учёные",
		"finishedBuilding": "Строительство завершено",
		"Incomes":"Золото",
		"Trading":"Торговля",
		"Wood": "Стройматериалы",
		"Wine": "Виноград",
		"Marble": "Мрамор",
		"Crystal": "Хрусталь",
		"Sulfur": "Сера"
		};
	};

EmpireBoard.Intl.Load_Texts_SE = function()
	{
	// thank Dinfur
	langtype = "";
	buildings = {
		"townHall" : ["Rådhus", "Rådhus"],
		"temple"      : ["Temple", "Temple"],
		"academy" : ["Akademi", "Akademi"],
		"port" : ["Handelshamn", "Hamn"],
		"shipyard" : ["Skeppsvarv", "Varv"],
		"warehouse" : ["Lagerlokal", "Lager"],
		"wall" : ["Stadsmur", "Mur"],
		"tavern" : ["Taverna", "Taverna"],
		"museum" : ["Museum", "Museum"],
		"palace" : ["Palats", "Palats"],
		"palaceColony" : ["Guvernörsresidens", "Guvernör"],
		"embassy" : ["Ambassad", "Ambassad"],
		"branchOffice" : ["Handelsstation", "Handel"],
		"safehouse" : ["Gömställe", "Gömställe"],
		"barracks" : ["Kasern", "Kasern"],
		"workshop" : ["Verkstad", "Verkstad"],
		"carpentering" : ["Snickare", "Snickare"],
		"forester" : ["Skogsvaktare", "Skog"],
		"stonemason" : ["Stenhuggare", "Sten"],
		"glassblowing" : ["Glasblåsare", "Glas"],
		"winegrower" : ["Vinodlare", "Vin"],
		"alchemist" : ["Alkemist", "Alkemist"],
		"architect" : ["Arkitekt", "Arkitekt"],
		"optician" : ["Optiker", "Optiker"],
		"vineyard" : ["Vinpress", "Vin"],
		"fireworker" : ["Fyrverkerifabrik", "Fyrverk."]
		};
	texts = {
		"cityName": "Stadsnamn", "currentlyBuilding": "Bygger nu", "summary": "Summering",
		"hide_settings": "Göm inställningar", "show_settings": "Visa inställningar",
		"Population": "Befolkning",
		"finishedBuilding": "Byggt klart","Incomes":"Inkomster","Trading":"Handlar",
		"Wood": "Trä", "Wine": "Vin", "Marble": "Marmor", "Crystal": "Kristall", "Sulfur": "Svavel"
		};
	};

EmpireBoard.Intl.Load_Texts_SK = function()
	{
	//Slovak translation by RxR
	langtype = "";
	buildings = {
		"townHall" : ["Radnica", "Radnica"],
		"temple" : ["Kostol", "Kostol"],
		"academy" : ["Akadémia", "Akadémia"],
		"port" : ["Obchodný prístav", "Prístav"],
		"shipyard" : ["Lodenica", "Lodenica"],
		"warehouse" : ["Sklad", "Sklad"],
		"wall" : ["Mestský múr", "Múr"],
		"tavern" : ["Vináreň", "Vináreň"],
		"museum" : ["Múzeum", "Múzeum"],
		"palace" : ["Palác", "Palác"],
		"palaceColony" : ["Rezidencia guvernéra", "Guvernér"],
		"embassy" : ["Ambasáda", "Ambasáda"],
		"branchOffice" : ["Trhovisko", "Trh"],
		"safehouse" : ["Úkryt", "Úkryt"],
		"barracks" : ["Kasárne", "Kasárne"],
		"workshop" : ["Dielňa", "Dielňa"],
		"carpentering" : ["Tesár", "Tesár"],
		"forester" : ["Dom lesníka", "Lesník"],
		"stonemason" : ["Kameňolom", "Kamenár"],
		"glassblowing" : ["Fúkač skla", "Sklár"],
		"winegrower" : ["Vinár", "Vinár"],
		"alchemist" : ["Veža alchymistov", "Alchymista"],
		"architect" : ["Úrad architekta", "Architekt"],
		"optician" : ["Optik", "Optik"],
		"vineyard" : ["Vinica", "Vinica"],
		"fireworker" : ["Testovanie ohňostrojov", "Ohňostroje"]
		};
	texts = {
		"cityName" : "Mesto",
		"currentlyBuilding" : "Stavia sa",
		"summary" : "Spolu",
		"hide_settings" : "Skryť nastavenia",
		"show_settings" : "Zobraziť nastavenia",
		"Population" : "Obyvateľstvo",
		"finishedBuilding" : "Dokončené stavby",
		"Incomes" : "Príjmy",
		"Trading" : "Obchod",
		"Wood" : "Drevo",
		"Wine" : "Víno",
		"Marble" : "Mramor",
		"Crystal" : "Sklo",
		"Sulfur" : "Síra"
		};
	};

EmpireBoard.Intl.Load_Texts_SL = function()
	{
	//Slovenian translation, thanks to Americano, MazaM
	langtype = "";
	buildings = {
		"townHall" : ["Mestna hiša", "Mestna hiša"],
		"temple" : ["Tempelj", "Tempelj"],
		"academy" : ["Akademija", "Akademija"],
		"port" : ["Trgovska luka", "Trgovska luka"],
		"shipyard" : ["Ladjedelnica", "Ladjedelnica"],
		"warehouse" : ["Skladišče", "Skladišče"],
		"wall" : ["Obzidje", "Obzidje"],
		"tavern" : ["Krčma", "Krčma"],
		"museum" : ["Muzej", "Muzej"],
		"palace" : ["Palača", "Palača"],
		"palaceColony" : ["Guvernerjeva rezidenca", "Guvernerjeva rezidenca"],
		"embassy" : ["Ambasada", "Ambasada"],
		"branchOffice" : ["Tržnica", "Tržnica"],
		"safehouse" : ["Skrivališče", "Skrivališče"],
		"barracks" : ["Barake", "Barake"],
		"workshop" : ["Delavnica", "Delavnica"],
		"carpentering" : ["Tesar", "Tesar"],
		"forester" : ["Gozdar", "Gozdar"],
		"stonemason" : ["Kamnoseška delavnica", "Kamnoseška delavnica"],
		"glassblowing" : ["Steklopihač", "Steklopihač"],
		"winegrower" : ["Vinogradnik", "Vinogradnik"],
		"alchemist" : ["Stolp alkimista", "Stolp alkimista"],
		"architect" : ["Pisarna arhitekta", "Pisarna arhitekta"],
		"optician" : ["Optika", "Optika"],
		"vineyard" : ["Vinska preša", "Vinska preša"],
		"fireworker" : ["Testno območje ognjemetov", "Testno območje ognjemetov"]
		};
	texts = {
		"cityName" : "Ime mesta",
		"currentlyBuilding" : "Se nadgrajuje",
		"summary" : "Skupno",
		"hide_settings" : "Skrij nastavitve",
		"show_settings" : "Pokaži nastavitve",
		"Population" : "Prebivalstvo",
		"Research": "Raziskave",
		"finishedBuilding" : "Zgradba končana",
		"Incomes" : "Prihodki mesta",
		"Trading" : "Trgovanje",
		"Wood" : "Gradbeni material",
		"Wine" : "Vino",
		"Marble" : "Marmor",
		"Crystal" : "Kristal",
		"Sulfur" : "Žveplo"
		};  
	};

EmpireBoard.Intl.Load_Texts_TR = function()
	{
//Turkish translation, thanks to NailBey, regular6
	langtype = "";
	buildings = {
		"townHall"		 : ["Belediye Binası", "Belediye"],
		"temple"		 : ["Tapınak", "Tapınak"],
		"academy"		 : ["Akademi", "Akademi"],
		"port"			 : ["Ticaret Limanı", "Liman"],
		"shipyard"		 : ["Donanma Tersanesi", "Donanma "],
		"warehouse"		 : ["Depo", "Depo"],
		"dump"			 : ["Yığın Sahası", "Yığın Sahası"],
		"wall"			 : ["Sur", "Sur"],
		"tavern"		 : ["Taverna", "Taverna"],
		"museum"		 : ["Müze", "Müze"],
		"palace"		 : ["Saray", "Saray"],
		"palaceColony"  	 : ["Vali Konağı", "Vali Konağı"],
		"embassy"		 : ["Büyükelçilik", "Büyükelçilik"],
		"branchOffice"		 : ["Ticaret Merkezi", "Ticaret Merkezi"],
		"safehouse"		 : ["İstihbarat Merkezi", "İstihbarat Merkezi"],
		"barracks"		 : ["Kışla", "Kışla"],
		"workshop"		 : ["Mucit Atölyesi", "Mucit Atölyesi"],
		"carpentering"		 : ["Marangoz Atölyesi", "Marangoz Atölyesi"],
		"forester"		 : ["Ormancı Kulübesi", "Ormancı Kulübesi"],
		"stonemason"		 : ["Mermer Atölyesi", "Mermer Atölyesi"],
		"glassblowing"		 : ["Cam Eşya Atölyesi", "Cam Eşya Atölyesi"],
		"winegrower"		 : ["Bağ Evi", "Bağ Evi"],
		"alchemist"		 : ["Simya Kulesi", "Simya Kulesi"],
		"architect"		 : ["Mimarlık Bürosu", "Mimarlık Bürosu"],
		"optician"		 : ["Optik", "Optik"],
		"vineyard"		 : ["Şarap Mahzeni", "Şarap Mahzeni"],
		"fireworker"		 : ["Fişekçi", "Fişekçi"]
		};
	texts = {
		"Upkeep"				 : "Bakım Masrafı",
		"Growth"				 : "Büyüme",
		"Research"				 : "Araştrma",
		"cityName"				 : "Şehir Adı",
		"currentlyBuilding"			 : "İnşaa Ediliyor",
		"summary"				 : "Toplam:",
		"hide_settings"				 : "Ayarları Gizle",
		"show_settings"				 : "Ayarları Göster",
		"Population"				 : "Nüfus",
		"finishedBuilding"			 : "İnşaa Bitti",
		"Incomes"				 : "Gelir",
		"Trading"				 : "Ticaret",
		"Wood"					 : "Odun",
		"Wine"					 : "Şarap",
		"Marble"				 : "Mermer",
		"Crystal"				 : "Kristal",
		"Sulfur"				 : "Sülfür"
		};
	};

EmpireBoard.Intl.Load_Texts_TW = function()
	{
	//traditional chinese translation by Whiskers, cherub
	langtype = "";
	buildings = {
		"townHall" : ["市政府", "市府"],
		"temple" : ["祭祀神殿", "神殿"],
		"academy" : ["學院", "學院"],
		"port" : ["港口", "港口"],
		"shipyard" : ["船塢", "船塢"],
		"warehouse" : ["倉庫", "倉庫"],
		"wall" : ["城牆", "城牆"],
		"tavern" : ["酒館", "酒館"],
		"museum" : ["博物館", "博物"],
		"palace" : ["皇宫", "皇宫"],
		"palaceColony" : ["總督府", "總督"],
		"embassy" : ["大使館", "使館"],
		"branchOffice" : ["市場", "市場"],
		"safehouse" : ["間諜小屋", "間諜"],
		"barracks" : ["兵營", "兵營"],
		"workshop" : ["兵工廠", "兵廠"],
		"carpentering" : ["木匠屋", "木－"],
		"forester" : ["林務官宅", "木＋"],
		"stonemason" : ["石匠屋", "石＋"],
		"glassblowing" : ["玻璃吹制廠", "晶＋"],
		"winegrower" : ["葡萄樹園", "葡＋"],
		"alchemist" : ["煉金塔", "硫＋"],
		"architect" : ["建築公署", "石－"],
		"optician" : ["配鏡商館", "晶－"],
		"vineyard" : ["藏酒窖", "葡－"],
		"fireworker" : ["煙火測試區域", "硫－"],
		"dump"		 : ["貨棧","貨棧"]
		};
	texts = {
		"cityName": "城鎮",
		"currentlyBuilding": "正在建造",
		"summary": "總計",
		"hide_settings": "隐藏設定",
		"show_settings": "顯示設定",
		"Population": "人口",
		"finishedBuilding": "建造完成",
		"Incomes":"收入",
		"Trading":"交易",
		"Wood": "木材",
		"Wine": "葡萄",
		"Marble": "大理石",
		"Crystal": "水晶",
		"Sulfur": "硫磺",
		"Growth":"成長率",
		"Research":"研究",
		"Upkeep":"軍費"
		}; 
	};

EmpireBoard.Intl.Load_Texts_UA = function()
	{
	//ukrainian Translation by feelimon http://www.ikariam.com.ua
	langtype = "";
	buildings = {
		"townHall" : ["Ратуша", "Ратуша"],
		"temple" : ["Храм", "Храм"],
		"academy" : ["Академія", "Академія"],
		"port" : ["Торговий порт", "Порт"],
		"shipyard" : ["Верф", "Верф"],
		"warehouse" : ["Склад", "Склад"],
		"wall" : ["Стіна", "Стіна"],
		"tavern" : ["Таверна", "Таверна"],
		"museum" : ["Музей", "Музей"],
		"palace" : ["Палац", "Палац"],
		"palaceColony" : ["Резиденція губернатора", "Резиденція"],
		"embassy" : ["Посольство", "Посольство"],
		"branchOffice" : ["Торговий пост", "Пост"],
		"safehouse" : ["Схованка", "Схованка"],
		"barracks" : ["Бараки", "Бараки"],
		"workshop" : ["Майстерня", "Майстерня"],
		"carpentering" : ["Теслярська майстерня", "Тесля"],
		"forester" : ["Дім лісничого", "Лісник"],
		"stonemason" : ["Дім каменяра", "Дім каменяра"],
		"glassblowing" : ["Склодувна майстерня", "Склодув"],
		"winegrower" : ["Виноградник", "Виноградник"],
		"alchemist" : ["Вежа алхіміка", "Алхімік"],
		"architect" : ["Офіс архітектора", "Архітектор"],
		"optician" : ["Оптик", "Оптик"],
		"vineyard" : ["Винний погріб", "Погріб"],
		"fireworker" : ["Полігон піротехніка", "Піротехнік"]
		};
	texts = {
		"Upkeep" :"Утримання",
		"cityName": "Назва міста", "currentlyBuilding": "Поточне будівництво", "summary": "Всього",
		"hide_settings": "Сховати налаштування", "show_settings": "Показати налаштування",
		"Population": "Населення",
		"Research": "Вчені",
		"finishedBuilding": "Будівництво завершено", "Incomes":"Золото", "Trading":"Торгівля",
		"Wood": "Дерево", "Wine": "Вино", "Marble": "Мармур",
		"Crystal": "Кришталь", "Sulfur": "Сірка"
		};
	};

EmpireBoard.Intl.Load_Texts_VN = function()
	{
	// Vietnamese translations, thank Gafs
	langtype = ""; 
	buildings = {
		"townHall"      : ["Tòa thị chính", "Tòa T.Chính"],
		"temple"      : ["Temple", "Temple"],
		"academy"       : ["Học viện", "Học viện"],
		"port"          : ["Cảng giao dịch", "Cảng GD"],
		"shipyard"      : ["Xưởng đóng tàu", "Xưởng tàu"],
		"warehouse"     : ["Kho hàng", "Kho"],
		"wall"          : ["Tường thành", "Tường"],
		"tavern"        : ["Quán rượu", "Quán rượu"],
		"museum"        : ["Viện bảo tàng", "V.B.Tàng"],
		"palace"        : ["Cung điện", "Cung điện"],
		"palaceColony"  : ["Phủ thủ hiến", "Phủ"],
		"embassy"       : ["Tòa đại sứ", "Tòa Đ.Sứ"],
		"branchOffice"  : ["Trạm giao dịch", "Trạm GD"],
		"safehouse"     : ["Nơi ẩn náu", "Nơi ẩn náu"],
		"barracks"      : ["Trại lính", "Trại lính"],
		"workshop" 	  : ["Xưởng", "Xưởng"],
		"carpentering" : ["Thợ mộc", "Thợ mộc"],
		"forester" : ["Nhà kiểm lâm", "Kiểm lâm"],
		"stonemason" : ["Thợ xây đá", "Thợ đá"],
		"glassblowing" : ["Người thổi thủy tinh", "Thổi TT"],
		"winegrower" : ["Máy ép nho", "Ép nho"],
		"alchemist" : ["Giả kim", "Giả kim"],
		"architect" : ["Tòa kiến trúc", "Kiến trúc"],
		"optician" : ["Thợ kính", "Thợ kính"],
		"vineyard" : ["Vườn nho", "V.Nho"],
		"fireworker" : ["Thử thuốc súng", "Thuốc súng"]
		};
	texts = {
		"cityName": "Thành phố", "currentlyBuilding": "Đang xây dựng", "summary": "Tổng",
		"hide_settings": "Ẩn thiết lập", "show_settings": "Hiển thị thiết lập",
		"Population": "Dân số",
		"finishedBuilding": "Công trình hoàn tất","Incomes":"Thu nhập","Trading":"Trao đổi",
		"Wood": "Gỗ", "Wine": "Rượu", "Marble": "Cẩm thạch", "Crystal": "Pha lê", "Sulfur": "Lưu huỳnh"
		};
	};

EmpireBoard.Init();

//lots of code to get the city id. The code trys to find the city id no matter which "city dropdown view" the user has chosen.
// Fix for v3.1
var city_id = EmpireBoard.Str.To_Integer(EmpireBoard.DOM.Get_Last_Node_Value("//select[@id='citySelect']/option[@selected='selected']"), 0);
var current_city_id = city_id;
EmpireBoard.Log.Add('current_city_id = '+current_city_id);

var city_name = EmpireBoard.DOM.Get_First_Node_TextContent("id('breadcrumbs')/*[@class='city']");
EmpireBoard.Log.Add('Main view city_name = "'+city_name+'"');
if (city_name != undefined)
	{
	var island_id = EmpireBoard.DOM.Get_First_Node_TextContent("id('breadcrumbs')//a[@class='island']");
	if ( island_id == undefined || island_id == 0 )
	    island_id = /\[[0-9:]+\]/.exec(EmpireBoard.DOM.Get_First_Node("id('breadcrumbs')//a[contains(@href,'view=island')]").innerHTML)[0];
	
	var city_idmainView = 0;
	
	// Fix for v3.1
	if (city_idmainView == 0)
		{
		city_idmainView = EmpireBoard.DOM.Get_First_Node_Value("//select[@id='citySelect']/option[text()='"+EmpireBoard.Ikariam.TwoDigit_Coords(island_id)+" "+city_name+"']", 0);
		}
	if (city_idmainView == 0)
		{
		city_idmainView = EmpireBoard.DOM.Get_First_Node_Value("//select[@id='citySelect']/option[text()='"+city_name+"']", 0);
		}
	
	// Fix for v3.2
	if (city_idmainView == 0)
		{
		city_idmainView = EmpireBoard.DOM.Get_First_Node_Value("//select[@id='citySelect']/option[contains(text(),'"+EmpireBoard.Ikariam.TwoDigit_Coords(island_id)+"') and contains(text(),'"+city_name+"')]", 0);
		}
	if (city_idmainView == 0)
		{
		city_idmainView = EmpireBoard.DOM.Get_First_Node_Value("//select[@id='citySelect']/option[contains(text(),'"+city_name+"')]", 0);
		}
		
	EmpireBoard.Log.Add('city_idmainView['+EmpireBoard.Ikariam.TwoDigit_Coords(island_id)+' '+city_name+'] = '+city_idmainView);
	var city_positionmainView = -1;

	var a = EmpireBoard.DOM.Get_First_Node("//div[@id='breadcrumbs']/*[@class='island' and contains(text(), '[')]", "");
	if (a == null) {
	  a = EmpireBoard.DOM.Get_First_Node("//a[contains(@href, '?view=island')]/span[contains(text(), '[')]", "");
	  if (a != null) {
	    a = a.parentNode;
	  }
	}
	var city_coord = "";
	var island_id = "";
	if (a != null) {
	  if (/(\[[0-9:]+\])/.exec(a.innerHTML)) {
	    city_coord = RegExp.$1;
	    if (/[?&]id=([0-9]+)/.exec(a.href) != null) {
	      island_id = RegExp.$1;
	    }
	  }
	}
	if (island_id == "" && (/view=island&id=([0-9]+)/.exec(document.URL) != null)) { 
	  island_id = RegExp.$1;
	}
	}
else
	{
	city_idmainView = 0;
	city_name = '';
	city_coord = '';
	island_id = '';
	}

function getCity(city_id)
	{
	city_id = "city_"+city_id;
	if (config[city_id] == undefined)
		{
		config[city_id] = new Resource();
		config[city_id].buildings	 = {};
		config[city_id].units		 = {};
		
		EmpireBoard.Log.Add('Create city id='+city_id);
		}
	return config[city_id];
	}

function digProducedResources(res) 
	{
	var scripts = document.getElementsByTagName("script");
	var found = false;
	for (var j = scripts.length-1; j >= 0; j--)
		{
		var nScript = scripts[j];
		var sCode = nScript.innerHTML;
		if (sCode.indexOf('getResourceCounter') > 0)
			{
			found = true;
			break;
			}
		}
	if (found == false)
		{
		return;
		}

	var aCodeLines = sCode.split(';');
	
	// by AubergineAnodyne (not used)
	function findResourceCounterData(name)
		{
		for (var i = 0; i < aCodeLines.length; i++)
			{
			if (aCodeLines[i].indexOf(name + 'Counter') >= 0)
				{
				return aCodeLines[i].substring(aCodeLines[i].indexOf('(') + 2, aCodeLines[i].indexOf(')') - 1);
				}
			}
		}
	
	var sWoodLine = 0;
	var sTradeGoodLine = 0;
	for (var j = 0; j <= aCodeLines.length-1; j++)
		{
		if (aCodeLines[j].indexOf('getResourceCounter') > 0)
			{
			if (aCodeLines[j].indexOf('woodCounter') > 0)
				{
				sWoodLine = j;
				if (sTradeGoodLine > 0) break;
				}
			if (aCodeLines[j].indexOf('tradegoodCounter') > 0)
				{
				sTradeGoodLine = j;
				if (sWoodLine > 0) break;
				}
			}
		}
		
	var startResourcesDelta = 0;
	if (sWoodLine > 0)
		{
		var sWood = aCodeLines[sWoodLine].substring(aCodeLines[sWoodLine].indexOf('(')+2,aCodeLines[sWoodLine].indexOf(')')-1);
		var prodRegExp = /production: *([0-9.\E\-]+)/.exec(sWood);
		if (prodRegExp != null)
			{
			startResourcesDelta = Math.floor(parseFloat(RegExp.$1) * 3600);
			} 
		}
	
	var startTradegoodDelta = 0;
	var sTradeGoodName = '';
	if (sTradeGoodLine > 0)
		{
		var sTradeGood = aCodeLines[sTradeGoodLine].substring(aCodeLines[sTradeGoodLine].indexOf('(')+2,aCodeLines[sTradeGoodLine].indexOf(')')-1);
		var prodRegExp = /production: *([0-9.\E\-]+)/.exec(sTradeGood);
		if (prodRegExp != null)
			{
			startTradegoodDelta = Math.floor(parseFloat(RegExp.$1) * 3600);
			}
		var sName = /valueElem: *\"(.*)\"/.exec(sTradeGood);
		sTradeGoodName = sName[1];
		}

	res.prodwood = startResourcesDelta;
	res.prodwine = 0;
	res.prodmarble = 0;
	res.prodglass = 0;
	res.prodsulfur = 0;
	res.prodtime = EmpireBoard.StartTime; 
	if (sTradeGoodName == "value_wine")
		{
		res.prodwine = startTradegoodDelta;
		res.prodgood = 'wine';
		}
	else if (sTradeGoodName == "value_marble")
		{
		res.prodmarble = startTradegoodDelta;
		res.prodgood = 'marble';
		}
	else if (sTradeGoodName == "value_crystal")
		{
		res.prodglass = startTradegoodDelta;
		res.prodgood = 'glass';
		}
	else if (sTradeGoodName == "value_sulfur")
		{
		res.prodsulfur = startTradegoodDelta;
		res.prodgood = 'sulfur';
		}
	}

function getCurrentResourceAmount(currenttime, startTime, startAmount, factPerHour) {
  var elapsedhours = (currenttime - startTime) / 1000.0 / 3600.0;
  return Math.max(0, Math.floor(startAmount + elapsedhours * factPerHour));
  /*
  TODO:
  spendings: [{amount: 197, tickInterval: 1200}],	valueElem: "value_wine"
this.currentRes=this.startRes+this.production*Math.floor((this.currenttime-this.startdate)/1000);
this.currentRes=this.currentRes-this.spendings[i]['amount']*Math.floor((this.currenttime-this.startdate)/1000/this.spendings[i]['tickInterval'])*this.spendings[i]['tickInterval']/3600;}
197*floor(3600/1200)*1200/3600
  */
}

function createTooltipAttribute(tooltip, title, isFct) {
  if (tooltip == undefined || tooltip == "") {
    return "";
  }
  if (isFct == true)
	{
	html = tooltip;
	}
  else
	{
	  if (title == undefined || title == "") {
	  	  title = "";
	  }
	  else title = "<div class=TTTitle>"+title+"</div>";
	  if (EmpireBoard.Intl.LangDir() == "rtl")
		{
		var html = "<div dir=rtl class='TTContent RtoL'>"+title+tooltip+"</div>";
		}
	  else
		{
		var html = "<div class=TTContent>"+title+tooltip+"</div>";
		}
	  html = "'"+html.replace(/'/g, "\\'")+"'";
	}
  return "onmouseover=\"Tip("+html+", ABOVE, true, BORDERWIDTH, 0, SHADOW, false, BGCOLOR, '');\"";
}

function createTooltip(content, tooltip, title) {
  if (tooltip == undefined || tooltip == "") {
    return content;
  }
  return "<font "+createTooltipAttribute(tooltip, title)+">"+content+"</font>";
}


function createTimeCounter(enddate) {
  if (enddate != undefined && enddate != "") {
    var s = smartDateFormat(enddate);
    return createTooltip("<font id='mytimecounter' counter='"+enddate+"'></font>", s);
  }
  return "";
}

function getArrValue(arr, key, defaultValue) {
  if (arr == undefined || arr[key] == undefined) {
    return defaultValue;
  }
  return arr[key];
}

function createLinkToChangeCity(text, city_id, city_index, sup_text, sup_class, sup_title) {
	var res = getCity(city_id);
	var rHTML = '';
	
	if (res.city_name != undefined)
		{
		cName = res.city_name;
		}
	else
		{
		cName = EmpireBoard.Ikariam.Trim_Coords(text);
		}
	if (current_city_id == city_id)
		{
		rHTML += '<b>'+cName+'</b>';
		}
	else
		{
		rHTML += createLink(cName, "?cityId="+city_id, "title=\"Change current city\" onclick=\"var s = document.getElementById('citySelect'); s.selectedIndex = "+city_index+"; s.form.submit(); return false;\"");
		}
	
	if ((sup_text != undefined) && (sup_text != '') && (sup_text != 0))
		{
		if (sup_class == undefined) sup_class = '';
		if (sup_title == undefined) sup_title = '';
		rHTML += '<sup class="'+sup_class+'" title="'+sup_title+'">'+sup_text+'</sup>';
		}
	
	return rHTML;
}

function setViewRqTime(view, city_id, newTime, force)
	{
	if (view == undefined) view = '';
	if (newTime == undefined) newTime = EmpireBoard.StartTime;
	if (force == undefined) force = false;
	
	if ((city_id == undefined) || (city_id <= 0))
		{
		if (view == 'researchOverview')
			{
			if (config["research"] == undefined) config["research"] = {};
			
			if (config["research"].rqtime == undefined)
				{
				config["research"].rqtime = newTime;
				}
			else if (EmpireBoard.StartTime > config["research"].rqtime)
				{
				config["research"].rqtime = newTime;
				}
			else if (newTime < config["research"].rqtime)
				{
				config["research"].rqtime = newTime;
				}
			}
		else if (view == 'merchantNavy')
			{
			if (config.merchantNavyrqtime == undefined)
				{
				config.merchantNavyrqtime = newTime;
				}
			else if (EmpireBoard.StartTime > config.merchantNavyrqtime)
				{
				config.merchantNavyrqtime = newTime;
				}
			else if (newTime < config.merchantNavyrqtime)
				{
				config.merchantNavyrqtime = newTime;
				}
			else if (force == true)
				{
				config.merchantNavyrqtime = newTime;
				}
			}
		else if (view == 'finances')
			{
			if (config.financesrqtime == undefined)
				{
				config.financesrqtime = newTime;
				}
			else if (EmpireBoard.StartTime > config.financesrqtime)
				{
				config.financesrqtime = newTime;
				}
			else if (newTime < config.financesrqtime)
				{
				config.financesrqtime = newTime;
				}
			}
		else if (view == 'militaryAdvisorMilitaryMovements')
			{
			if (config.mAMMrqtime == undefined)
				{
				config.mAMMrqtime = newTime;
				}
			else if (EmpireBoard.StartTime > config.mAMMrqtime)
				{
				config.mAMMrqtime = newTime;
				}
			else if (newTime < config.mAMMrqtime)
				{
				config.mAMMrqtime = newTime;
				}
			}
		}
	else
		{
		var city = getCity(city_id);
		if (view == '')
			{
			if (city.rqtime == undefined)
				{
				city.rqtime = newTime;
				}
			else if (EmpireBoard.StartTime > city.rqtime)
				{
				city.rqtime = newTime;
				}
			else if (newTime < city.rqtime)
				{
				city.rqtime = newTime;
				}
			}
		else if (view == 'cityMilitary-army')
			{
			if (city.cityMilitaryarmyrqtime == undefined)
				{
				city.cityMilitaryarmyrqtime = newTime;
				}
			else if (EmpireBoard.StartTime > city.cityMilitaryarmyrqtime)
				{
				city.cityMilitaryarmyrqtime = newTime;
				}
			else if (newTime < city.cityMilitaryarmyrqtime)
				{
				city.cityMilitaryarmyrqtime = newTime;
				}
			}
		else if (view == 'cityMilitary-fleet')
			{
			if (city.cityMilitaryfleetrqtime == undefined)
				{
				city.cityMilitaryfleetrqtime = newTime;
				}
			else if (EmpireBoard.StartTime > city.cityMilitaryfleetrqtime)
				{
				city.cityMilitaryfleetrqtime = newTime;
				}
			else if (newTime < city.cityMilitaryfleetrqtime)
				{
				city.cityMilitaryfleetrqtime = newTime;
				}
			}
		else if (city.buildings[view] != undefined)
			{
			if (city.buildings[view].rqtime == undefined)
				{
				city.buildings[view].rqtime = newTime;
				}
			else if (EmpireBoard.StartTime > city.buildings[view].rqtime)
				{
				city.buildings[view].rqtime = newTime;
				}
			else if (newTime < city.buildings[view].rqtime)
				{
				city.buildings[view].rqtime = newTime;
				}
			else if (force == true)
				{
				city.buildings[view].rqtime = newTime;
				}
			}
		}
	}

function reportViewToSurvey(view, city_id)
	{
	if (view == undefined)		 view = '';
	if (city_id == undefined)	 city_id = 0;
	var report = false;
	
	if ((city_id == undefined) || (city_id <= 0))
		{
		if (view == 'researchOverview')
			{
			if (config["research"] == undefined) config["research"] = {};
			
			if (config["research"].uptime == undefined)
				{
				report = true;
				}
			else if (config["research"].uptime == 0)
				{
				report = true;
				}
			else if ((config["research"].rqtime != undefined) && (config["research"].rqtime <= EmpireBoard.StartTime) && (config["research"].rqtime > config["research"].uptime))
				{
				report = true;
				}
			else if (config["research"].uptime <= (EmpireBoard.StartTime - 1000*60*60*24*30*3))
				{
				report = true;
				}
			}
		else if (view == 'finances')
			{
			if (config.financestime == undefined)
				{
				report = true;
				}
			else if (config.financestime == 0)
				{
				report = true;
				}
			else if ((config.financesrqtime != undefined) && (config.financesrqtime <= EmpireBoard.StartTime) && (config.financesrqtime > config.financestime))
				{
				report = true;
				}
			else if (config.financestime <= (EmpireBoard.StartTime - 1000*60*60*24*7))
				{
				report = true;
				}
			}
		else if (view == 'merchantNavy')
			{
			if (config.merchantNavytime == undefined)
				{
				report = true;
				}
			else if (config.merchantNavytime == 0)
				{
				report = true;
				}
			else if ((config.merchantNavyrqtime != undefined) && (config.merchantNavyrqtime <= EmpireBoard.StartTime) && (config.merchantNavyrqtime > config.merchantNavytime))
				{
				report = true;
				}
			/*
			else if (config.merchantNavytime <= (EmpireBoard.StartTime - 1000*60*60*24*7))
				{
				report = true;
				}
			*/
			}
		else if (view == 'militaryAdvisorMilitaryMovements')
			{
			if (config.mAMMtime == undefined)
				{
				report = true;
				}
			else if (config.mAMMtime == 0)
				{
				report = true;
				}
			else if ((config.mAMMrqtime != undefined) && (config.mAMMrqtime <= EmpireBoard.StartTime) && (config.mAMMrqtime > config.mAMMtime))
				{
				report = true;
				}
			/*
			else if (config.mAMMtime <= (EmpireBoard.StartTime - 1000*60*60*24*7))
				{
				report = true;
				}
			*/
			}
		}
	else
		{
		var city = getCity(city_id);
		if (view == '')
			{
			if (city.prodtime == undefined)
				{
				report = true;
				}
			else if (city.prodtime == 0)
				{
				report = true;
				}
			else if ((city.rqtime != undefined) && (city.rqtime <= EmpireBoard.StartTime) && (city.rqtime > city.prodtime))
				{
				report = true;
				}
			else if (city.prodtime <= (EmpireBoard.StartTime - 1000*60*60*24*7))
				{
				report = true;
				}
			}
		else if (view == 'city')
			{
			if (city.citytime == undefined)
				{
				report = true;
				}
			else if (city.citytime == 0)
				{
				report = true;
				}
			/*
			else if ((city.underConstructionName != '') && (city.underConstructionTime <= EmpireBoard.StartTime))
				{
				report = true;
				}
			else if (city.citytime <= (EmpireBoard.StartTime - 1000*60*60*24*7))
				{
				report = true;
				}
			*/
			}
		else if ((view == 'cityMilitary-army') || (view == 'barracks'))
			{
			var recentTime = 0;
			if (city.cityMilitaryarmytime != undefined) recentTime = city.cityMilitaryarmytime;
			if ((city.buildings['barracks'] != undefined) && (city.buildings['barracks'].uptime > recentTime)) recentTime = city.buildings['barracks'].uptime;
			
			if (recentTime == undefined)
				{
				report = true;
				}
			else if (recentTime == 0)
				{
				report = true;
				}
			else if ((city.buildings['barracks'] != undefined) && (city.buildings['barracks'].rqtime != undefined) && (city.buildings['barracks'].rqtime <= EmpireBoard.StartTime) && (city.buildings['barracks'].rqtime > city.buildings['barracks'].uptime))
				{
				// Besoin d'aller dans la caserne
				report = false;
				}
			else if ((city.cityMilitaryarmyrqtime != undefined) && (city.cityMilitaryarmyrqtime <= EmpireBoard.StartTime) && (city.cityMilitaryarmyrqtime > recentTime))
				{
				report = true;
				}
			else if (recentTime <= (EmpireBoard.StartTime - 1000*60*60*24*30))
				{
				report = true;
				}
			}
		else if ((view == 'cityMilitary-fleet') || (view == 'shipyard'))
			{
			var recentTime = 0;
			if (city.cityMilitaryfleettime != undefined) recentTime = city.cityMilitaryfleettime;
			if ((city.buildings['shipyard'] != undefined) && (city.buildings['shipyard'].uptime > recentTime)) recentTime = city.buildings['shipyard'].uptime;
			
			if (recentTime == undefined)
				{
				report = true;
				}
			else if (recentTime == 0)
				{
				report = true;
				}
			else if ((city.buildings['shipyard'] != undefined) && (city.buildings['shipyard'].rqtime != undefined) && (city.buildings['shipyard'].rqtime <= EmpireBoard.StartTime) && (city.buildings['shipyard'].rqtime > city.buildings['shipyard'].uptime))
				{
				// Besoin d'aller dans le chantier
				report = false;
				}
			else if ((city.cityMilitaryfleetrqtime != undefined) && (city.cityMilitaryfleetrqtime <= EmpireBoard.StartTime) && (city.cityMilitaryfleetrqtime > recentTime))
				{
				report = true;
				}
			else if (recentTime <= (EmpireBoard.StartTime - 1000*60*60*24*30))
				{
				report = true;
				}
				
			/*
			if ((view == 'cityMilitary-fleet') && (city.cityMilitaryfleetrqtime != undefined) && (city.cityMilitaryfleetrqtime > EmpireBoard.StartTime))
				{
				EmpireBoard.Log.Add("Will request attention at cityMilitary-fleet of city["+city_id+"] remaining "+((city.cityMilitaryfleetrqtime-EmpireBoard.StartTime)/1000)+"s");
				}
			*/
			}
			
		// Any buildings
		if (EmpireBoard.Ikariam.Get_BuildingUsage(view) != '')
			{
			if (city.buildings[view] != undefined)
				{
				if (view == 'townHall')
					{
					if (city.buildings[view].uptime == undefined)
						{
						report = true;
						}
					else if (city.buildings[view].uptime == 0)
						{
						report = true;
						}
					else if ((city.buildings[view].rqtime != undefined) && (city.buildings[view].rqtime <= EmpireBoard.StartTime) && (city.buildings[view].rqtime > city.buildings[view].uptime))
						{
						report = true;
						}
					else if (city.buildings[view].uptime <= (EmpireBoard.StartTime - 1000*60*60*24*30))
						{
						report = true;
						}
					}
				else if (view == 'tavern')
					{
					if (city.buildings[view].uptime == undefined)
						{
						report = true;
						}
					else if (city.buildings[view].uptime == 0)
						{
						report = true;
						}
					}
				else if (view == 'academy')
					{
					if (city.buildings[view].uptime == undefined)
						{
						report = true;
						}
					else if (city.buildings[view].uptime == 0)
						{
						report = true;
						}
					}
				else if (view == 'branchOffice')
					{
					if (city.buildings[view].uptime == undefined)
						{
						report = true;
						}
					else if (city.buildings[view].uptime == 0)
						{
						report = true;
						}
					else if ((city.buildings[view].rqtime != undefined) && (city.buildings[view].rqtime <= EmpireBoard.StartTime) && (city.buildings[view].rqtime > city.buildings[view].uptime))
						{
						report = true;
						}
					}
				else
					{
					if (city.buildings[view].uptime == undefined)
						{
						
						}
					else if (city.buildings[view].uptime == 0)
						{
						
						}
					else if ((city.buildings[view].rqtime != undefined) && (city.buildings[view].rqtime <= EmpireBoard.StartTime) && (city.buildings[view].rqtime > city.buildings[view].uptime))
						{
						report = true;
						}
					}
				}
			}
		}
	
	return (report == true ? '!' : '');
	}

function dropUndeliveredLoadingGoods()
	{
	var arrivinggoods = getArrValue(config, 'arrivinggoods', []);
	var city_id;
	var i = 0;
	for (city_id in arrivinggoods)
		{
		var rows = getArrValue(arrivinggoods, city_id, []);
		var city = getCity(city_id);
		var key;
		for (key in rows)
			{
		    var row = rows[key];
			var quest = getArrValue(row, "quest", "");
			if (quest == 'loading')
				{
				if (delete config.arrivinggoods[city_id][key]) i++;
				continue;
				}
		    var arrivetime = parseInt(getArrValue(row, "arrivetime", 0));
			if (EmpireBoard.StartTime < arrivetime)
				{
				if (delete config.arrivinggoods[city_id][key]) i++;
				continue;
				}
			}
		}
	//if (i > 0) window.status = 'Removed '+i+' undelivered/loading transports';
	}
	
function dropDeliveredGoods(city_id)
	{
	var rows = getArrValue(config.arrivinggoods, city_id, []);
	var city = getCity(city_id);
	var key;
	var i = 0;
	for (key in rows)
		{
	    var row = rows[key];
	    var arrivetime = parseInt(getArrValue(row, "arrivetime", 0));
		if (arrivetime <= city.prodtime)
			{
			if (delete config.arrivinggoods[city_id][key]) i++;
			}
		}
	//if (i > 0) window.status = 'Removed '+i+' delivered transports';
	}
	
function getDeliveredGoodsTransports(city_id, resName)
	{
	var sum = 0;
	var city = getCity(city_id);
	var rows = getArrValue(config.arrivinggoods, city_id, []);
	var key;
	for (key in rows)
		{
	    var row = rows[key];
	    var res = row["res"];
	    var a = getArrValue(res, resName, 0);
	    var arrivetime = parseInt(getArrValue(row, "arrivetime", ""));
		if ((a > 0) && (arrivetime > city.prodtime) && (EmpireBoard.StartTime >= arrivetime)) sum++;
		}
	return sum;
	}
	
function getBuildingPosition(city_id, name, defaultValue)
	{
	if (defaultValue == undefined) defaultValue = -1;
	var position = -1;
	var city = getCity(city_id);
	
	if ((city.buildings == undefined) || (city.buildings[name] == undefined))
		{
		if (name == 'townHall') position = 0;
		}
	else if ((city.buildings[name].link != undefined) && (city.buildings[name].link != ''))
		{
		// will deprecated
		var link = city.buildings[name].link;
		position = parseInt(/position=([0-9]+)/.exec(link)[1]);
		}
	else if (city.buildings[name].position != undefined)
		{
		position = city.buildings[name].position;
		}
	else if (name == 'townHall') position = 0;
	
	if (position == -1) position = defaultValue;
	return position;
	}
	
function getCityBuildingsCount(city_id, defaultValue)
	{
	if (defaultValue == undefined) defaultValue = 0;
	var count = 0;
	var city = getCity(city_id);

	if (city.citytime != undefined)
		{
		for (name in city.buildings)
			{
			if (city.buildings[name].levels != undefined)
				{
				var p;
				for (p in city.buildings[name].levels)
					{
					count++;
					}
				}
			else if (city.buildings[name].level != undefined)
				{
				count++;
				}
			}
		}

	if (count == 0) count = defaultValue;
	return count;
	}
	
// Get level instead building upgrading is finished
function getBuildingLevel(city_id, name, defaultValue, position)
	{
	if (defaultValue == undefined) defaultValue = 0;
	if (position == undefined) position = -1;
	var level = 0;
	var city = getCity(city_id);
	
	if ((city.buildings == undefined) || (city.buildings[name] == undefined))
		{
		if (name == 'townHall') level = 1;
		if (city.underConstructionName == name)
			{
			if (city.underConstructionTime <= EmpireBoard.StartTime) level++;
			}
		}
	else if (position == -1)
		{
		if (city.buildings[name].levels != undefined)
			{
			var p;
			for (p in city.buildings[name].levels)
				{
				level += city.buildings[name].levels[p];
				}
			}
		else
			{
			// deprecated
			level = getArrValue(city.buildings[name], "level", 0);
			}
		if (city.underConstructionName == name)
			{
			if (city.underConstructionTime <= EmpireBoard.StartTime) level++;
			}
		}
	else if (city.buildings[name].levels != undefined)
		{
		if (city.buildings[name].levels[position] != undefined)
			level = city.buildings[name].levels[position];
		if ((city.underConstructionName == name) && (city.underConstructionPosition == position))
			{
			if (city.underConstructionTime <= EmpireBoard.StartTime) level++;
			}
		}
		
	if (level == 0) level = defaultValue;
	return level;
	}

function getOnePeopleGrowthTime(happiness) {
  if (happiness != 0) {
    return Math.abs(3600/0.02/happiness*1000);
  }
  return "NaN";
}

function getEstimatedPopulationOld(population, startTime, currenttime, startHappiness) {
  var thappiness = startHappiness;
  startTime = Number(startTime);
  while (thappiness > 0) {
    var t = getOnePeopleGrowthTime(thappiness);
    if (t == "NaN" || startTime + t > currenttime) {
      break;
    }
    population++;
    thappiness--;
    startTime += t;
  }
  return population;
}

function getEstimatedPopulation(population, startTime, currenttime, startHappiness) {
  var thappiness = startHappiness;
  startTime = Number(startTime);
  if (thappiness != 0)
	{
	var t = getOnePeopleGrowthTime(thappiness);
	while (startTime + t < currenttime)
		{
		if (thappiness == 0)
			{
			break;
			}
		else if (thappiness > 0)
			{
		    population++;
		    thappiness--;
			startTime += t;
			}
		else
			{
		    population--;
		    thappiness++;
			startTime += t;
			}
		
		t = getOnePeopleGrowthTime(thappiness);
		}
	}
  
  return population;
}

function getGrowthRemainingHours(population, maxPopulation, startTime, happiness) {
  if (maxPopulation - population > happiness) {
    return "&#8734;"+EmpireBoard.Ikariam.LocalizationStrings('hour','timeunits','short');
  }
  var time = Number(startTime);
  while (population < maxPopulation) {
    var t = getOnePeopleGrowthTime(happiness);
    if (t == "NaN") {
      return "&#8734;"+EmpireBoard.Ikariam.LocalizationStrings('hour','timeunits','short');
    }
    time += t;
    population++;
    happiness--;
  }
  return EmpireBoard.Str.FormatRemainingTime(time - Number(startTime));
}

// Current selected city
if (current_city_id > 0)
	{
	var res = getCity(current_city_id);
	
	/* Update current city */
	
	// Stored resources
	res.wood = EmpireBoard.Ikariam.currentCity('wood','resources');
	if (res.wood == undefined)
		res.wood   = EmpireBoard.Str.To_Integer(EmpireBoard.DOM.Get_First_Node_TextContent("id('value_wood')"));
	
	res.wine = EmpireBoard.Ikariam.currentCity('wine','resources');
	if (res.wine == undefined)
		res.wine   = EmpireBoard.Str.To_Integer(EmpireBoard.DOM.Get_First_Node_TextContent("id('value_wine')"));
	
	res.marble = EmpireBoard.Ikariam.currentCity('marble','resources');
	if (res.marble == undefined)
		res.marble = EmpireBoard.Str.To_Integer(EmpireBoard.DOM.Get_First_Node_TextContent("id('value_marble')"));
	
	res.glass = EmpireBoard.Ikariam.currentCity('crystal','resources');
	if (res.glass == undefined)
		res.glass  = EmpireBoard.Str.To_Integer(EmpireBoard.DOM.Get_First_Node_TextContent("id('value_crystal')"));
	
	res.sulfur = EmpireBoard.Ikariam.currentCity('sulfur','resources');
	if (res.sulfur == undefined)
		res.sulfur = EmpireBoard.Str.To_Integer(EmpireBoard.DOM.Get_First_Node_TextContent("id('value_sulfur')"));
	
	
	if (EmpireBoard.Ikariam.Is_Version_041x())
		{
		// Couldn't recognize fields
		}
	else
		{
		// Resources to sold
		var wareNode = EmpireBoard.DOM.Get_First_Node_TextContent("//div[@id='cityResources']//li[@class='wood']/div[@class='tooltip']");
		if (/: [0-9,.]+[^0-9]+: ([0-9,.]+)/.exec(wareNode) != null)
			{
			res.tradewood = parseInt((RegExp.$1).replace(/[^0-9]/g, ""));
			}
		else
			{
			res.tradewood = 0;
			}
		var wareNode = EmpireBoard.DOM.Get_First_Node_TextContent("//div[@id='cityResources']//li[@class='wine']/div[@class='tooltip']");
		if (/: [0-9,.]+[^0-9]+: ([0-9,.]+)/.exec(wareNode) != null)
			{
			res.tradewine = parseInt((RegExp.$1).replace(/[^0-9]/g, ""));
			}
		else
			{
			res.tradewine = 0;
			}
		var wareNode = EmpireBoard.DOM.Get_First_Node_TextContent("//div[@id='cityResources']//li[@class='marble']/div[@class='tooltip']");
		if (/: [0-9,.]+[^0-9]+: ([0-9,.]+)/.exec(wareNode) != null)
			{
			res.trademarble = parseInt((RegExp.$1).replace(/[^0-9]/g, ""));
			}
		else
			{
			res.trademarble = 0;
			}
		var wareNode = EmpireBoard.DOM.Get_First_Node_TextContent("//div[@id='cityResources']//li[@class='glass']/div[@class='tooltip']");
		if (/: [0-9,.]+[^0-9]+: ([0-9,.]+)/.exec(wareNode) != null)
			{
			res.tradeglass = parseInt((RegExp.$1).replace(/[^0-9]/g, ""));
			}
		else
			{
			res.tradeglass = 0;
			}
		var wareNode = EmpireBoard.DOM.Get_First_Node_TextContent("//div[@id='cityResources']//li[@class='sulfur']/div[@class='tooltip']");
		if (/: [0-9,.]+[^0-9]+: ([0-9,.]+)/.exec(wareNode) != null)
			{
			res.tradesulfur = parseInt((RegExp.$1).replace(/[^0-9]/g, ""));
			}
		else
			{
			res.tradesulfur = 0;
			}
		}
		
	digProducedResources(res);
	
	if (res.buildings["townHall"] == undefined) res.buildings["townHall"] = {};
	var inhabitantsNode = EmpireBoard.DOM.Get_First_Node_TextContent("//span[@id='value_inhabitants']");
	if (/([0-9,.]+) \(([0-9,.]+)\)/.exec(inhabitantsNode) != null)
		{
		cizReg = RegExp.$1;
		popReg = RegExp.$2;
		res.buildings["townHall"].population = EmpireBoard.Str.To_Integer(popReg);
		res.buildings["townHall"].citizens = EmpireBoard.Str.To_Integer(cizReg);
		} else { 
		res.buildings["townHall"].population = 0;
		res.buildings["townHall"].citizens = 0;
		}
	
	res.actions = EmpireBoard.DOM.Get_First_Node_TextContent("//span[@id='value_maxActionPoints']");
	
	dropDeliveredGoods(current_city_id);
	
	if (EmpireBoard.Ikariam.View() == "plunder")
		{
		function reportPlunder()
			{
			setViewRqTime('finances');
			setViewRqTime('militaryAdvisorMilitaryMovements');
			EmpireBoard.DB.Save();
			}
		
		var n = document.getElementById("plunderbutton");
		n.addEventListener("click", reportPlunder, false);
		}
	else if (EmpireBoard.Ikariam.View() == "transport")
		{
		function reportTransport()
			{
			setViewRqTime('merchantNavy');
			EmpireBoard.DB.Save();
			}
		
		var n = document.getElementById("submit");
		n.addEventListener("click", reportTransport, false);
		}
	else if (EmpireBoard.Ikariam.View() == 'deployment')
		{
		EmpireBoard.ViewIsActionDeployment();
		}
	else if (EmpireBoard.Ikariam.View() == 'resource')
		{
		EmpireBoard.ViewIsIslandResource();
		}
	else if (EmpireBoard.Ikariam.View() == 'tradegood')
		{
		EmpireBoard.ViewIsIslandTradeGood();
		}
	}

// If main view is a city
if (city_idmainView > 0) 
	{
	var res = getCity(city_idmainView);
	
	// Update city info
	if (city_name != "") 
		{
		res.city_name = city_name;
		}
	if (city_coord != "") 
		{
		res.city_coord = city_coord;
		}
	if (island_id != "") 
		{
		res.island_id = island_id;
		}
  
// Vue ville
if (EmpireBoard.Ikariam.View() == 'city')
	{
	var orderedBuildings = EmpireBoard.Ikariam.BuildingsList();
	
	// Add new buildings
	var nodes = EmpireBoard.DOM.Get_Nodes("//li[contains(@id, 'position')]/a[contains(@href, 'view=')]");
	for(var i = 0; i < nodes.snapshotLength; i++)
		{
		var node = nodes.snapshotItem(i);
		var li = node.parentNode;
		
		var name = li.getAttribute("class");
		if (orderedBuildings[name] != undefined)
			{
			if (res.buildings[name] == undefined)
				{
				res.buildings[name] = {};
				}
			}
		else
			{
			if (res.buildings[name] != undefined)
				{
				// fix if not building...
				if (delete config["city_"+city_idmainView].buildings[name])
					EmpireBoard.Log.Add('Remove unknown building: '+name);
				}
			}
		}
	
	// Reset levels
	var res = getCity(city_idmainView);
	for (name in res.buildings)
		{
		res.buildings[name].position = -1; // Soon deprecated
		res.buildings[name].level = 0; // Soon deprecated
		res.buildings[name].levels = {};
		res.buildings[name].link = ''; // Soon deprecated
		}
	  
	// Fetch levels & positions
	//var nodes = EmpireBoard.DOM.Get_Nodes("//li[contains(@id, 'position')]/a[contains(@href, 'view=')]");
	for (var i = 0; i < nodes.snapshotLength; i++)
		{
	    var node = nodes.snapshotItem(i);
	    var li = node.parentNode;
	    
		// name
	    var name = li.getAttribute("class");
	  	if (orderedBuildings[name] != undefined)
			{
			var position = parseInt(/position=([0-9]+)/.exec(node.href)[1]);
			// deprecated
			res.buildings[name].position = position;
			
			// level
		    var level = "-";
		    if (/([0-9]+)/.exec(node.title) != null)
				{
				level = RegExp.$1;
				}
			
			res.buildings[name].level = res.buildings[name].level + parseInt(level); // deprecated
			res.buildings[name].levels[position] = parseInt(level);
					
			res.buildings[name].link = node.href;// link, will deprecated
			}
		}
	  
	// Nouvelle construction
	  var node = EmpireBoard.DOM.Get_Nodes("//div[@class='constructionSite']/following-sibling::a[contains(@href, 'view=')]");
	  if (node.snapshotLength >= 1) {
	    //res.underConstruction = node.snapshotItem(0).title;
	    res.underConstructionName = node.snapshotItem(0).parentNode.getAttribute("class");
		res.underConstructionPosition = /position=([0-9]+)/.exec(node.snapshotItem(0).href)[1];
		
		// Search cityCountdown
		var scripts = document.getElementsByTagName("script");
		var found = false;
		var sCode = '';
		for (var j = 0; j < scripts.length; j++)
			{
			var nScript = scripts[j];
			sCode = nScript.innerHTML;
			if (sCode.indexOf('cityCountdown') >= 0)
				{
				found = true;
				break;
				}
			}
		if (found == true)
			{
		      var enddate = 0;
		      var currentdate = 0;
		      if (/enddate[^0-9]*([0-9]+)/.exec(sCode) != null) 
			  {
		        enddate = parseFloat(RegExp.$1) * 1000; 
		      }
		      if (/currentdate[^0-9]*([0-9]+)/.exec(sCode) != null) 
			  {
		        currentdate = parseFloat(RegExp.$1) * 1000; 
		      }
		      if (enddate != 0 && currentdate != 0) 
			  {
				res.underConstructionTime = enddate - currentdate + new Date().getTime();
		      }
		    }
	  }
	  else 
	  {
	      //res.underConstruction = "-";
	      res.underConstructionName = "";
	      res.underConstructionPosition = -1;
	      res.underConstructionTime = 0;
	  }
	
	// Remove deleted buildings
	for (name in res.buildings)
		{
		var buildingsNb = 0;
		for (position in res.buildings[name].levels)
			{
			buildingsNb++;
			}
		
		if (buildingsNb == 0)
			{
			if (delete config["city_"+city_idmainView].buildings[name])
				EmpireBoard.Log.Add('Building removed: '+name);
			}
		}
	var res = getCity(city_idmainView);
		
	res.citytime = EmpireBoard.StartTime;
	
	EmpireBoard.ViewIsCity();
	}
  
  //military-army and fleet unit counts
  if ((EmpireBoard.Ikariam.View() == "cityMilitary-army") || (EmpireBoard.Ikariam.View() == "cityMilitary-fleet"))
	{
    
    if (res.units == undefined) { res.units = {}; }
	
    var names = EmpireBoard.DOM.Get_Nodes("//table/tbody/tr/th");
    var counts = EmpireBoard.DOM.Get_Nodes("//table/tbody/tr[@class='count']/td");
    if (names.snapshotLength >= counts.snapshotLength)
		{
		for(var i = 0; i < counts.snapshotLength; i++)
			{
			var n = EmpireBoard.Str.Trim(names.snapshotItem(i).title);
			
			var unit_id = '';
			if (EmpireBoard.Ikariam.View() == "cityMilitary-fleet")
				{
				var url_unit = /([a-z]+_[a-z]+)_faceright/.exec(names.snapshotItem(i).firstChild.src);
				if (url_unit != null)
					{
					unit_id = 'unit ' + RegExp.$1;
					}
				}
			else
				{
				var url_unit = /y60_([a-z]+)_/.exec(names.snapshotItem(i).firstChild.src);
				if (url_unit != null)
					{
					unit_id = 'unit ' + RegExp.$1;
					}
				}

			config["unitnames"][unit_id] = n;
			
			var c = counts.snapshotItem(i);
			var cnt = EmpireBoard.Str.To_Integer(c.innerHTML, 0);
			if (res.units[unit_id] == undefined)
				{
				res.units[unit_id] = {};
				}
			res.units[unit_id].count = cnt;
			}
		}
	
	if (EmpireBoard.Ikariam.View() == "cityMilitary-army")
		{
		res.cityMilitaryarmytime = EmpireBoard.StartTime;
		}
	else if (EmpireBoard.Ikariam.View() == "cityMilitary-fleet")
		{
		res.cityMilitaryfleettime = EmpireBoard.StartTime;
		}
	}
	
	// view is building
	if ((EmpireBoard.Ikariam.Get_BuildingUsage(EmpireBoard.Ikariam.View()) != '') && (EmpireBoard.Ikariam.Tab() == ''))
		{
		
		if (res.buildings[EmpireBoard.Ikariam.View()] == undefined) {
			res.buildings[EmpireBoard.Ikariam.View()] = {};
			}
		
		// Fetch position
		var position = -1;
		var node = EmpireBoard.DOM.Get_Nodes("//*[@id='buildingUpgrade']//ul[@class='actions']//a[contains(@href, 'position=')]");
		if (node.snapshotLength == 0)
			{
			node = EmpireBoard.DOM.Get_Nodes("//*[@id='buildingUpgrade']//a[@class='cancelUpgrade']");
			}
		if (node.snapshotLength >= 1)
			{
			var url_position = /position=([0-9]+)/.exec(node.snapshotItem(0).href);
			if (url_position != null) position = parseInt(RegExp.$1);
			}
		else if ((res.buildings[EmpireBoard.Ikariam.View()].position != undefined) && (res.buildings[EmpireBoard.Ikariam.View()].position != -1))
			{
			position = res.buildings[EmpireBoard.Ikariam.View()].position;
			}
		else
			{
			var url_position = /[\?&]position=([0-9]+)/.exec(document.URL);
			if (url_position != null) position = parseInt(RegExp.$1);
			}
		city_positionmainView = position;
		// deprecated
		res.buildings[EmpireBoard.Ikariam.View()].position = position;
		
		// Fetch level & detect upgrading
		var n = EmpireBoard.DOM.Get_First_Node("//*[@id='buildingUpgrade']//*[@class='buildingLevel']");
		if (n != null)
			{
			if (position != -1)
				{
				// Fetch level
				if (res.buildings[EmpireBoard.Ikariam.View()].levels == undefined) res.buildings[EmpireBoard.Ikariam.View()].levels = {};
				res.buildings[EmpireBoard.Ikariam.View()].levels[position] = EmpireBoard.Str.To_Integer(n.innerHTML,0);
				}
			
			EmpireBoard.Log.Add('View '+EmpireBoard.Ikariam.View()+' building level '+EmpireBoard.Str.To_Integer(n.innerHTML,0)+' at position '+position);
			
			// Ignorer ancien upgrade du batiment
			if (res.underConstructionPosition == undefined) res.underConstructionPosition = -1; // Deprecated
			if ((res.underConstructionName == EmpireBoard.Ikariam.View()) && (res.underConstructionPosition == position))
				{
				//res.underConstruction = '';
				res.underConstructionName = '';
				res.underConstructionTime = 0;
				res.underConstructionPosition = -1;
				}
			
			var scripts = document.getElementsByTagName("script");
			var found = false;
			var sCode = '';
			for (var j = 0; j < scripts.length; j++)
				{
				// search upgradeCountDown
				var nScript = scripts[j];
				sCode = nScript.innerHTML;
				if (sCode.indexOf('upgradeCountDown') >= 0)
					{
					found = true;
					break;
					}
				}
			if (found == true)
				{
				// buildings under upgrading
				var enddate = 0;
				var currentdate = 0;
				if (/enddate[^0-9]*([0-9]+)/.exec(sCode) != null)
					{
					enddate = parseFloat(RegExp.$1) * 1000; 
					}
				if (/currentdate[^0-9]*([0-9]+)/.exec(sCode) != null)
					{
					currentdate = parseFloat(RegExp.$1) * 1000; 
					}
				if (enddate != 0 && currentdate != 0)
					{
					// First, apply previous upgrading of other building
					if (res.underConstructionName != '')
						{
						if ((res.buildings[res.underConstructionName].uptime != undefined) && (res.buildings[res.underConstructionName].uptime > res.underConstructionTime))
							{
							// Ignore
							}
						else if ((res.citytime != undefined) && (res.citytime > res.underConstructionTime))
							{
							// Ignore
							}
						else if ((res.buildings[res.underConstructionName].uptime != undefined) && (res.citytime != undefined))
							{
							if ((res.underConstructionPosition != undefined) && (res.underConstructionPosition != -1))
								{
								if (res.buildings[res.underConstructionName].levels == undefined) res.buildings[res.underConstructionName].levels = {};
								res.buildings[res.underConstructionName].levels[res.underConstructionPosition] = parseInt(res.buildings[res.underConstructionName].levels[res.underConstructionPosition])+1;
								}
							else
								{
								// deprecated
								res.buildings[res.underConstructionName].level = parseInt(res.buildings[res.underConstructionName].level)+1;
								}
							}
						}
					
					// Define new upgrading
					//res.underConstruction = buildings[EmpireBoard.Ikariam.View()][0] + " level " + EmpireBoard.Str.To_Integer(n.innerHTML,0);
					res.underConstructionName = EmpireBoard.Ikariam.View();
					res.underConstructionPosition = position;
					res.underConstructionTime = enddate - currentdate + new Date().getTime();
					}
				}
			else
				{
				// Not upgrading
				}
			}
		res.buildings[EmpireBoard.Ikariam.View()].uptime = EmpireBoard.StartTime;
		}
  
	//townhall population total and growth
	if (EmpireBoard.Ikariam.View() == 'townHall')
		{
		EmpireBoard.ViewIsBuildingTownHall();
		}
	else if (EmpireBoard.Ikariam.View() == 'branchOffice')
		{
		EmpireBoard.ViewIsBuildingBranchOffice();
		}
  
  //military-army unit counts
  if ((EmpireBoard.Ikariam.View() == "barracks") || (EmpireBoard.Ikariam.View() == "shipyard"))
	{
	var idx = 0;
	if (EmpireBoard.Ikariam.View() == "shipyard") { idx = 13; }
	if (res.units == undefined) { res.units = {}; }
	
	var hasNotices = false;
	if (document.getElementById('notices')) hasNotices = true;
	
	// Fetch units counters
	var names = EmpireBoard.DOM.Get_Nodes("//ul[@id='units']/li[contains(@class, 'unit')]/div[@class='unitinfo']/h4");
	var counts = EmpireBoard.DOM.Get_Nodes("//ul[@id='units']/li[contains(@class, 'unit')]/div[@class='unitinfo']/div[@class='unitcount']");
	var upkeeps = EmpireBoard.DOM.Get_Nodes("//ul[@id='units']/li[contains(@class, 'unit')]/div[@class='costs']/ul/li[@class='upkeep']");
	if (names.snapshotLength == counts.snapshotLength)
		{
		for (var i = 0; i < names.snapshotLength; i++)
			{
			var node = names.snapshotItem(i);
			var unit_id = '';
			try
				{ unit_id = node.parentNode.parentNode.getAttribute("class"); }
			catch(e) { }
			
			var uKey = EmpireBoard.Ikariam.Trim_Unit(unit_id);
			
			var n = node.innerHTML;
			config["unitnames"][unit_id] = n;
			
			var c = counts.snapshotItem(i);
			var cnt = EmpireBoard.Str.To_Integer(c.innerHTML.replace(/<.+>/g, ""), 0);
			if (res.units[unit_id] == undefined)
				{
				res.units[unit_id] = {};
				}
			res.units[unit_id].count = cnt;
			EmpireBoard.Log.Add('Count['+unit_id+'] = '+cnt);
			
			// Init units under construction
			res.units[unit_id].construction = 0;
			
			if (hasNotices != true)
				{
				var upkeepElt = upkeeps.snapshotItem(i);
				var upkeep = EmpireBoard.Str.To_Integer(upkeepElt.innerHTML.replace(/<.+>/g, ""), 0);
				config["upkeeps"][uKey] = upkeep;
				EmpireBoard.Log.Add('Upkeep['+uKey+'] = '+upkeep);
				}
			}
		}
		
	// Search units under construction
	if (EmpireBoard.Ikariam.Is_Version_033x())
		{
		// Construction list
		var ucList = EmpireBoard.DOM.Get_Nodes("//div[@id='unitConstructionList']//div[@class='army_wrapper']/div[contains(@class,'army')]/div[@class='unitcounttextlabel']");
		EmpireBoard.Log.Add('Units construction lists = '+ucList.snapshotLength);
		if (ucList.snapshotLength >= 1)
			{
			for (var i = 0; i < ucList.snapshotLength; i++)
				{
				var uDIVcount = ucList.snapshotItem(i);
				var uDIV = uDIVcount.parentNode;
				var unit_num = EmpireBoard.Str.To_Integer(uDIV.className);
				var unit_id = 'unit '+unitsIdClass[unit_num];
				var AmountInt = EmpireBoard.Str.To_Integer(uDIVcount.textContent, 1);
				
				EmpireBoard.Log.Add('Construction['+unit_id+'] = '+AmountInt);
				res.units[unit_id].construction = res.units[unit_id].construction + AmountInt;
				}
				
			if (unsafeWindow && unsafeWindow.tmppbar)
				{
				//var startdate = unsafeWindow.tmppbar['startdate'];
				var currentdate = unsafeWindow.tmppbar['currenttime'];
				var enddate = unsafeWindow.tmppbar['enddate'];
				//alert((enddate - currentdate)/1000/60);
				setViewRqTime(EmpireBoard.Ikariam.View(), city_idmainView, EmpireBoard.StartTime + (enddate - currentdate), true);
				}
			}
		}
	else
		{
		var currentUnit = EmpireBoard.DOM.Get_First_Node("//div[@id='unitConstructionList']//div[contains(@class, 'currentUnit')]");
		if (currentUnit != null)
			{
			var currentUnit_id = 'unit '+EmpireBoard.Ikariam.Trim_Unit(currentUnit.className);
			res.units[currentUnit_id].construction = 1;
				
			// Fetch queue
			var simUnits = 0;
			var Amounts = EmpireBoard.DOM.Get_Nodes("//div[@id='unitConstructionList']//li/div[@class='amount']");
			if (Amounts.snapshotLength >= 1)
				{
				for (var i = 0; i < Amounts.snapshotLength; i++)
					{
					var Amount = Amounts.snapshotItem(i);
					var AmountInt = EmpireBoard.Str.To_Integer(Amount.textContent, 1);
					var unit_id = 'unit '+EmpireBoard.Ikariam.Trim_Unit(Amount.parentNode.className);

					res.units[unit_id].construction = res.units[unit_id].construction + AmountInt;
					if (unit_id == currentUnit_id)
						{
						simUnits = simUnits + AmountInt;
						}
					}
				}	
			
			var scripts = document.getElementsByTagName("script");
			var found = false;
			for (var j = scripts.length-1; j >= 0; j--)
				{
				var nScript = scripts[j];
				var sCode = nScript.innerHTML;
				if (sCode.indexOf('buildProgress') > 0)
					{
					found = true;
					break;
					}
				}
			if (found == true)
				{
				var enddate = 0;
				if (/enddate[^0-9]*([0-9]+)/.exec(sCode) != null) {
					enddate = parseFloat(RegExp.$1) * 1000; 
					}
				var currentdate = 0;
				if (/currentdate[^0-9]*([0-9]+)/.exec(sCode) != null) {
					currentdate = parseFloat(RegExp.$1) * 1000; 
					}
				var startdate = 0;
				if (/startdate[^0-9]*([0-9]+)/.exec(sCode) != null) {
					startdate = parseFloat(RegExp.$1) * 1000; 
					}

				setViewRqTime(EmpireBoard.Ikariam.View(), city_idmainView, EmpireBoard.StartTime + (enddate - currentdate) + simUnits * (enddate - startdate), true);
				}
			}
		}
	}

	if (EmpireBoard.Ikariam.View() == "tavern")
		{
		EmpireBoard.ViewIsBuildingTavern();
		}
	else if (EmpireBoard.Ikariam.View() == 'academy')
		{
		EmpireBoard.ViewIsBuildingAcademy();
		}
	else if (EmpireBoard.Ikariam.View() == 'temple')
		{
		EmpireBoard.ViewIsBuildingTemple();
		}
	else if (EmpireBoard.Ikariam.View() == 'workshop')
		{
		EmpireBoard.ViewIsBuildingWorkshop();
		}
  
} else {
	if (EmpireBoard.Ikariam.View() == "militaryAdvisorMilitaryMovements")
		{
		EmpireBoard.ViewIsMilitaryMovements();
		}
	else if (EmpireBoard.Ikariam.View() == 'premium')
		{
		EmpireBoard.ViewIsPremium();
		}
	else if (EmpireBoard.Ikariam.View() == 'researchAdvisor')
		{
		EmpireBoard.ViewIsResearchAdvisor();
		}
	else if (EmpireBoard.Ikariam.View() == 'researchOverview')
		{
		EmpireBoard.ViewIsResearchOverview();
		}
	else if (EmpireBoard.Ikariam.View() == "finances")
		{
		EmpireBoard.ViewIsFinances();
		}
	else if (EmpireBoard.Ikariam.View() == "merchantNavy")
		{
		
		if (config["arrivinggoods"] == undefined) config["arrivinggoods"] = {};
		dropUndeliveredLoadingGoods();
		
		function grab_City_ID(rootElt)
			{
			var resID = 0;
			var alinks = rootElt.getElementsByTagName("a");
			for (var k=0; k < alinks.length; k++)
				{
				var resReg = /[\?&]{1}cityId=([0-9]+)&?/i.exec(alinks[k].href);
				if (resReg != null)
					{
					resID = parseInt(resReg[1]);
					break;
					}
				}
			
			return resID;
			}
		
		EmpireBoard.Log.Add("Fetch arriving goods");
		var foundLoading = false;
		var takeSomething = false;
		var resMi = EmpireBoard.DOM.Get_Nodes("//div[@id='mainview']//td[contains(@class, 'mission')]");
		if (resMi.snapshotLength > 0)
			{
			EmpireBoard.Log.Add("Found "+resMi.snapshotLength+" missions");
			// Villes du joueur
			var citiesIDs = {};
			var citiesNames = {};
			var res = EmpireBoard.DOM.Get_Nodes("//select[@id='citySelect']/option");
			for(var i = 0; i < res.snapshotLength; i++)
			  {
			  var n = res.snapshotItem(i);
			  var cName = EmpireBoard.Ikariam.Trim_Coords(n.textContent);
			  var cID = parseInt(n.value);
			  citiesIDs[cName] = cID;
			  citiesNames[cID] = cName;
			  }
			
			// heures
			var mTimers = {};
			var scripts = document.getElementsByTagName("script");
			for (var j = 0; j < scripts.length; j++)
				{
				// search getCountdown
				var nScript = scripts[j];
				var sCode = nScript.innerHTML;
				if (sCode.indexOf('getCountdown') > 0)
					{
					var aCodeLines = sCode.split(';');
					for (var i=0; i < aCodeLines.length-1; i++)
						{
						var sValues = aCodeLines[i].substring(aCodeLines[i].indexOf('{')+1,aCodeLines[i].indexOf('}'));
						var sParts = sValues.split(',');
						if (sParts.length >= 3)
							{
							var sPart0 = sParts[0].split(':');
							var enddate = 1000*parseInt(EmpireBoard.Str.Trim(sPart0[1]));
							
							var sPart1 = sParts[1].split(':');
							var currentdate = 1000*parseInt(EmpireBoard.Str.Trim(sPart1[1]));
							
							var sID = sParts[2].substring(sParts[2].indexOf('"')+1,sParts[2].indexOf('"',sParts[2].indexOf('"')+2));
							
							mTimers[sID] = EmpireBoard.StartTime + Math.abs(enddate - currentdate);
							//EmpireBoard.Log.Add("mTimers["+sID+"] = "+(enddate - currentdate));
							}
						else
							{
							//EmpireBoard.Log.Add("Failed to fetch getCountdown");
							}
						}
					}
				}
				
			// infos
			for (var i = 0; i < resMi.snapshotLength; i++)
				{
				var nMi = resMi.snapshotItem(i);
				var tr = nMi.parentNode;
				var tds = tr.getElementsByTagName("td");
				var tdslength = tds.length;
				//var tds = tr.childNodes;

				var nSource = tds[1];
				var nTarget = tds[3];
				if (tdslength == 6)
					{
					// pillaging under 0.4.3
					var nETA = tds[4];
					var nRET = tds[4];
					var nAc = tds[5];
					}
				else if (EmpireBoard.DOM.Has_ClassName(tds[4],'speed'))
					{
					// transport under 0.4.3
					var nETA = tds[5];
					var nRET = tds[5];
					var nAc = tds[6];
					}
				else if (EmpireBoard.DOM.Has_ClassName(tds[5],'speed'))
					{
					// transport under 0.4.2
					var nETA = tds[4];
					var nRET = tds[6];
					var nAc = tds[7];
					}
				else
					{
					var nETA = tds[4];
					var nRET = tds[5];
					var nAc = tds[6];
					}
				
				if (nETA.id == '') continue;
				if (nRET.id == '') continue;
				//EmpireBoard.Log.Add('nETA.id = '+nETA.id);
				
				var trPayload = tr.nextSibling;
				var payload = trPayload.getElementsByTagName("img");
				var foundGoods = false;
				var foundArmy = false;
				var PayloadGoods = {};
				if (payload.length > 0)
					{
					var rKey = ''; 
					for (var j = 0; j < payload.length; j++)
						{
						if (payload[j].src.indexOf('wood') > 0)
							{
							if (rKey == 'wood') continue;
							rKey = 'wood';
							foundGoods = true;
							}
						else if (payload[j].src.indexOf('wine') > 0)
							{
							if (rKey == 'wine') continue;
							rKey = 'wine';
							foundGoods = true;
							}
						else if (payload[j].src.indexOf('marble') > 0)
							{
							if (rKey == 'marble') continue;
							rKey = 'marble';
							foundGoods = true;
							}
						else if (payload[j].src.indexOf('glass') > 0)
							{
							if (rKey == 'glass') continue;
							rKey = 'glass';
							foundGoods = true;
							}
						else if (payload[j].src.indexOf('sulfur') > 0)
							{
							if (rKey == 'sulfur') continue;
							rKey = 'sulfur';
							foundGoods = true;
							}
						else if (payload[j].src.indexOf('slinger') > 0)
							{
							rKey = '';
							foundArmy = true;
							continue;
							}
						else if (payload[j].src.indexOf('swordsman') > 0)
							{
							rKey = '';
							foundArmy = true;
							continue;
							}
						else if (payload[j].src.indexOf('phalanx') > 0)
							{
							rKey = '';
							foundArmy = true;
							continue;
							}
						else if (payload[j].src.indexOf('spearman') > 0)
							{
							// v 3.2 unit
							rKey = '';
							foundArmy = true;
							continue;
							}
						else if (payload[j].src.indexOf('archer') > 0)
							{
							rKey = '';
							foundArmy = true;
							continue;
							}
						else if (payload[j].src.indexOf('marksman') > 0)
							{
							rKey = '';
							foundArmy = true;
							continue;
							}
						else if (payload[j].src.indexOf('gyrocopter') > 0)
							{
							rKey = '';
							foundArmy = true;
							continue;
							}
						else if (payload[j].src.indexOf('steamgiant') > 0)
							{
							rKey = '';
							foundArmy = true;
							continue;
							}
						else if (payload[j].src.indexOf('bombardier') > 0)
							{
							rKey = '';
							foundArmy = true;
							continue;
							}
						else if (payload[j].src.indexOf('ram') > 0)
							{
							rKey = '';
							foundArmy = true;
							continue;
							}
						else if (payload[j].src.indexOf('catapult') > 0)
							{
							rKey = '';
							foundArmy = true;
							continue;
							}
						else if (payload[j].src.indexOf('mortar') > 0)
							{
							rKey = '';
							foundArmy = true;
							continue;
							}
						else if (payload[j].src.indexOf('medic') > 0)
							{
							rKey = '';
							foundArmy = true;
							continue;
							}
						else if (payload[j].src.indexOf('cook') > 0)
							{
							rKey = '';
							foundArmy = true;
							continue;
							}
						else
							{
							rKey = '';
							continue;
							}
							
						if ((PayloadGoods[rKey] == undefined) && ((rKey == 'wood') || (rKey == 'wine') || (rKey == 'marble') || (rKey == 'glass') || (rKey == 'sulfur')))
							{
							var rAmnt = EmpireBoard.Str.To_Integer(payload[j].title);
							PayloadGoods[rKey] = rAmnt;
							}
						}
					}
				
				var citySource;
				var citySourceID = 0;
				var cityTarget;
				var cityTargetID = 0;
				var quest;
				
				citySourceID = grab_City_ID(nSource);
				cityTargetID = grab_City_ID(nTarget);
				
				if (nMi.className.indexOf('returning') > 0)
					{
					quest = 'returning';
					if (tr.parentNode.parentNode.parentNode.parentNode.id == 'plunderingTransports')
						{
						if (foundGoods == true)
							{
							citySource = EmpireBoard.Str.Trim(nTarget.textContent);
							cityTarget = citySourceID;
							if (citiesNames[cityTargetID] == undefined)
								{
								citySource = EmpireBoard.Ikariam.Trim_PlayerName(nSource.textContent);
								cityTarget = cityTargetID;
								}
							}
						else continue;
						}
					else if ((foundArmy == true) && (foundGoods == false))
						{
						continue;
						}
					else
						{
						if (mTimers[nETA.id] == undefined)
							{
							mTimers[nETA.id] = EmpireBoard.StartTime + (1 * 20 * 60 * 1000);
							quest = 'loading';
							}
						citySource = EmpireBoard.Str.Trim(nTarget.textContent);
						cityTarget = citySourceID;
						//if (foundArmy == false) addTransport(citiesIDs[EmpireBoard.Ikariam.Trim_PlayerName(nSource.textContent)], nETA.id, mTimers[nETA.id]);
						if (foundGoods == false) continue;
						}
					}
				else if ((nMi.className.indexOf('gotoown') > 0) || (citiesNames[cityTargetID] != undefined))
					{
					if (foundArmy == true)
						{
						continue;
						}
					else 
						{
						citySource = EmpireBoard.Ikariam.Trim_PlayerName(nSource.textContent);
						cityTarget = cityTargetID;
						quest = 'gotoown';
						if (mTimers[nETA.id] == undefined)
							{
							mTimers[nETA.id] = EmpireBoard.StartTime + (1 * 20 * 60 * 1000);
							quest = 'loading';
							}
						else if (nAc.innerHTML == '')
							{
							citySource = EmpireBoard.Ikariam.Trim_PlayerName(nTarget.textContent);
							cityTarget = citySourceID;
							quest = 'halfturn';
							}
						//addTransport(citiesIDs[EmpireBoard.Ikariam.Trim_PlayerName(nSource.textContent)], nETA.id, mTimers[nETA.id]);
						if (foundGoods == false) continue;
						}
					}
				else if (nMi.className.indexOf('gotoforeign') > 0)
					{
					quest = 'gotoforeign';
					if (tr.parentNode.parentNode.parentNode.parentNode.id == 'plunderingTransports')
						{
						quest = 'plundering';
						if ((mTimers[nETA.id] != undefined) && (mTimers[nETA.id] > EmpireBoard.StartTime))
							{
							takeSomething = true;
							setViewRqTime('merchantNavy', 0, parseInt(mTimers[nETA.id]) + (1000*60*15));
							}
						else if ((mTimers[nRET.id] != undefined) && (mTimers[nRET.id] > EmpireBoard.StartTime))
							{
							takeSomething = true;
							setViewRqTime('merchantNavy', 0, EmpireBoard.StartTime + (1000*60*15));
							}
						continue;
						}
					else if (foundArmy == true)
						{
						continue;
						}
					else
						{
						if (mTimers[nRET.id] != undefined)
							{
							//addTransport(citiesIDs[EmpireBoard.Ikariam.Trim_PlayerName(nSource.textContent)], nETA.id, mTimers[nRET.id]);
							}
						else if (mTimers[nETA.id] != undefined)
							{
							//addTransport(citiesIDs[EmpireBoard.Ikariam.Trim_PlayerName(nSource.textContent)], nETA.id, mTimers[nETA.id]);
							}
						else
							{
							//addTransport(citiesIDs[EmpireBoard.Ikariam.Trim_PlayerName(nSource.textContent)], nETA.id, EmpireBoard.StartTime + (1000*60*15));
							}
						
						if ((foundGoods == true) && (nAc.innerHTML != ''))
							{
							continue;
							}
						else if ((foundGoods == true) && (nAc.innerHTML == '') && (mTimers[nETA.id] == undefined))
							{
							citySource = EmpireBoard.Str.Trim(nTarget.textContent);
							cityTarget = citySourceID;
							if (mTimers[nRET.id] != undefined)
								{
								mTimers[nETA.id] = mTimers[nRET.id];
								}
							else 
								{
								mTimers[nETA.id] = EmpireBoard.StartTime + (1 * 20 * 60 * 1000);
								}
							quest = 'loading';
							}
						else if ((foundGoods == false) && (nAc.innerHTML != ''))
							{
							if (mTimers[nETA.id] != undefined)
								{
								takeSomething = true;
								setViewRqTime('merchantNavy', 0, parseInt(mTimers[nETA.id]));
								}
							}
							
						if (foundGoods == false) continue;
						}
					}
				else continue;
				
				if ((foundGoods == true) && (cityTarget != undefined) && (mTimers[nETA.id] != undefined))
					{
					if (config["arrivinggoods"][cityTarget] == undefined) config["arrivinggoods"][cityTarget] = {};
					var idx = nETA.id;
					if (config["arrivinggoods"][cityTarget][idx] == undefined) config["arrivinggoods"][cityTarget][idx] = {};
					config["arrivinggoods"][cityTarget][idx]["startcity"] = citySource;
					if (config["arrivinggoods"][cityTarget][idx]["res"] == undefined) config["arrivinggoods"][cityTarget][idx]["res"] = PayloadGoods;
					config["arrivinggoods"][cityTarget][idx]["quest"] = quest;
					config["arrivinggoods"][cityTarget][idx]["arrivetime"] = parseInt(mTimers[nETA.id]);
					
					if (quest != 'loading')
						{
						setViewRqTime('', cityTarget, parseInt(mTimers[nETA.id]));
						}
					else
						{
						foundLoading = true;
						setViewRqTime('merchantNavy', 0, EmpireBoard.StartTime + (1000*60*10));
						}
					}
				}
			}
		
		// disable attention
		if ((foundLoading != true) && (takeSomething != true))
			{
			setViewRqTime('merchantNavy', 0);
			}
			
		config.merchantNavytime = EmpireBoard.StartTime;
		
		EmpireBoard.ViewIsMerchantNavy();
		}
		
  }

/**************************************************************************************************
 * Render tables
 *************************************************************************************************/
function renderTables()
	{
	var s = "";

	if (EmpireBoard.DB.Options.Prefs.TABLE_BUILDINGS == true) 
		{
		s += "<div id='EmpireBoardBuildings' class='Table'>";
		s += EmpireBoard.Renders.Buildings_Table_Content();
		s += "<p class='Caption'>"+
			"<span dir='ltr'>(<span class=Green>1-14</span>)</span> available free spaces for new buildings."+
			" <span dir='ltr'>(<span class=Red>!</span>)</span> require your attention to update overview's data."+
			"</p>";
		s += "</div>";
		}

	if (EmpireBoard.DB.Options.Prefs.TABLE_RESOURCES == true)
		{
		s += "<div id='EmpireBoardResources' class='Table'>";
		s += EmpireBoard.Renders.Resources_Table_Content();
		s += "<p class='Caption'>"+
			"<span dir='ltr'>(<span class=Green>1-9</span>)</span> available action points."+
			" <span dir='ltr'>(<span class=Red>!</span>)</span> require your attention to update overview's data."+
			" <span dir='ltr'>(<img src='skin/layout/icon-wall.gif' class='Safe' />)</span> resources safe against pillaging."+
			" <span dir='ltr'>(<span class=Green>*</span>)</span> some resources delivered."+
			"</p>";
		s += "</div>";
		}

	if (EmpireBoard.DB.Options.Prefs.TABLE_ARMYFLEET == true)
		{
		s += "<div id='EmpireBoardArmy' class='Table'><table class='Overview Army'>";
		s += EmpireBoard.Renders.ArmyFleet_Table_Content();
	    s += "<p class='Caption'>"+
			"<span dir='ltr'>(<span class=Green>1-9</span>)</span> available action points."+
			" <span dir='ltr'>(<span class=Red>!</span>)</span> require your attention to update overview's data."+
			"</p>";
		s + "</div>";
		}

	var body = EmpireBoard.DOM.Get_First_Node("//body");
	var span = document.getElementById(EmpireBoard.MainID);
	if (span == null)
		{
		span = document.createElement('div');
		span.id = EmpireBoard.MainID;
		span.setAttribute("version", EmpireBoard.Version);
		if (EmpireBoard.Intl.LangDir() == "rtl")
			{
			span.setAttribute("dir", "rtl");
			span.setAttribute("class", "RtoL");
			}
		else
			{
			span.setAttribute("dir", "ltr");
			span.setAttribute("class", "LtoR");
			}
		span.innerHTML = s;
		body.appendChild(span);
		}
	else
		{
		if (EmpireBoard.Intl.LangDir() == "rtl")
			{
			span.setAttribute("dir", "rtl");
			span.setAttribute("class", "RtoL");
			}
		else
			{
			span.setAttribute("dir", "ltr");
			span.setAttribute("class", "LtoR");
			}
		span.innerHTML = s;
		}

	//settings table
	function reset_all_data()
		{
		var answer = confirm(EmpireBoard.ScriptName+":\n\nAre you sure you want to delete ALL stored data ?");
		if (answer)
			{
			config = {};
			EmpireBoard.DB.Save();

			EmpireBoard.DB.Options = {};
			EmpireBoard.DB.Save_Options();

			window.location.href = window.location.href;
			}
		}

	function myChkEventHandler()
		{
		this.value = (this.value == '1' ? '0' : '1');
		EmpireBoard.DB.Options.Prefs[this.lang] = (this.value == '1');
		EmpireBoard.DB.Save_Options();
		}

	function myChgEventHandler() 
		{
		EmpireBoard.DB.Options.Prefs[this.lang] = this.value;
		EmpireBoard.DB.Save_Options();
		}

	function createChk(propertyName, propertyValue)
		{
		var btn = document.createElement('input');
		btn.type = "checkbox";
		btn.lang = propertyName;
		btn.value = (propertyValue == true ? '1' : '0');
		if (propertyValue == true) 
			{
			btn.checked = "checked";
			}
		btn.addEventListener('click', myChkEventHandler, false);
		return btn;
		}

	function createInp(propertyName, propertyValue) 
		{
		var btn = document.createElement('input');
		btn.type = "text";
		btn.lang = propertyName;
		btn.value = propertyValue;
		btn.addEventListener('change', myChgEventHandler, false);
		return btn;
		}

	function createTxtr(propertyName, propertyValue, rows, cols) 
		{
		var btn = document.createElement('textarea');
		btn.cols = (cols != undefined) ? cols : 50;
		btn.rows = (rows != undefined) ? rows : 15;
		btn.lang = propertyName;
		btn.value = propertyValue;
		btn.addEventListener('change', myChgEventHandler, false);
		return btn;
		}

	function createSlct(propertyName, propertyValue, items)
		{
		var btn = document.createElement('select');
		btn.lang = propertyName;
		for(key in items) 
			{
			var o = document.createElement("option");
			o.value = key;
			o.text = items[key];
			btn.add(o, null);
			}
		btn.value = propertyValue;
		btn.addEventListener('change', myChgEventHandler, false);
		return btn;
		}

	function createRow(title, input) 
		{
		var tr = document.createElement('tr');
		var td = document.createElement('td');
		td.setAttribute("align", "right");
		td.setAttribute("style", "border-style: dotted; border-width: 1px;");
		td.innerHTML = title;
		tr.appendChild(td);
		var td = document.createElement('td');
		td.setAttribute("align", "left");
		td.setAttribute("style", "border-style: dotted; border-width: 1px;");
		td.appendChild(input);
		tr.appendChild(td);
		return tr;
		}

	function createRowChk(title, propertyName, propertyValue) 
		{
		return createRow(title, createChk(propertyName, propertyValue));
		}

	function createRowInput(title, propertyName, propertyValue) 
		{
		return createRow(title, createInp(propertyName, propertyValue));
		}

	function createRowTxtr(title, propertyName, propertyValue, rows, cols) 
		{
		return createRow(title, createTxtr(propertyName, propertyValue, rows, cols));
		}

	function createRowSlct(title, propertyName, propertyValue, items) 
		{
		return createRow(title, createSlct(propertyName, propertyValue, items));
		}

	var t = document.createElement('table');
	t.id = EmpireBoard.MainID+"Settings";
	t.setAttribute("style", "display: none;");
	t.setAttribute("align", "right");
	t.appendChild(createRowChk("Show resources table:", "TABLE_RESOURCES", EmpireBoard.DB.Options.Prefs.TABLE_RESOURCES));
	t.appendChild(createRowChk("Show buildings table:", "TABLE_BUILDINGS", EmpireBoard.DB.Options.Prefs.TABLE_BUILDINGS));
	t.appendChild(createRowChk("Show army and fleet table:", "TABLE_ARMYFLEET", EmpireBoard.DB.Options.Prefs.TABLE_ARMYFLEET));
	t.appendChild(createRowSlct("Resource progress bar mode:", "PROGRESS_BAR_MODE", EmpireBoard.DB.Options.Prefs.PROGRESS_BAR_MODE, {off: "off", time: "based on remaining time", percent: "based on fullness percentage"}));
	t.appendChild(createRowSlct("Language:", "LANGUAGE", EmpireBoard.DB.Options.Prefs.LANGUAGE, EmpireBoard.Intl.Languages()));

	var tr = document.createElement('tr');
	t.appendChild(tr);
	var td = document.createElement('td');
	tr.appendChild(td);
	td.setAttribute("colspan", "2");
	var buttonsPanel = document.createElement('div');
	td.appendChild(buttonsPanel);

	//reset button
	var n = document.createElement('input');
	n.type = "button";
	n.value = "Reset all data";
	n.setAttribute("class", "button");
	n.setAttribute("style", "display: inline !important;");
	n.addEventListener("click", reset_all_data, false);
	buttonsPanel.appendChild(n);

	function show_hide_table()
		{
		var n = document.getElementById(EmpireBoard.MainID+"Settings");
		var m = document.getElementById(EmpireBoard.MainID+"Addons");
		if (n.style.display == 'none')
			{
			n.style.display = 'table';
			m.style.display = 'block';
			this.value = EmpireBoard.Intl.TT("hide_settings");
			}
		else
			{
			n.style.display = 'none';
			m.style.display = 'none';
			this.value = EmpireBoard.Intl.TT("show_settings");
			}
		}

	//now adds table
	span.appendChild(t);

	var ul = document.createElement('ul');
	ul.id = EmpireBoard.MainID+'Addons';
	ul.setAttribute("style", "display: none;");
	ul.innerHTML = '<u>Registered add-ons :</u>';
	span.appendChild(ul);

	var p = document.createElement('p');
	p.setAttribute("class", "Footer");

	var n = document.createElement('span');
	n.innerHTML = 'Powered by <a href="http://userscripts.org/scripts/show/41051" target="_blank"><b>'+EmpireBoard.ScriptName+'</b></a> <span dir="ltr">(<span>v. <i>' + EmpireBoard.Version + '</i></span> - <a target="_blank" href="http://feeds.feedburner.com/ikariam-v3-empire-board">last changes</a>)</span>. ';
	if (EmpireBoard.DB.Options['AvailableVersion'] > EmpireBoard.Version)
		n.innerHTML += '<a href="'+EmpireBoard.ScriptURL+'?version='+EmpireBoard.DB.Options['AvailableVersion']+'.user.js'+'" style="color: red;"><b>NEW RELEASE V. <i>'+EmpireBoard.DB.Options['AvailableVersion']+'</i> AVAILABLE !</b></a> ';
	p.appendChild(n);

	var n = document.createElement('input');
	n.type = "button";
	n.value = EmpireBoard.Intl.TT("show_settings");
	n.setAttribute("class", "button");
	n.addEventListener("click", show_hide_table, false);
	p.appendChild(n);

	// footer
	span.appendChild(p);
	}

if ((EmpireBoard.Ikariam.Is_Logged() == true) && (EmpireBoard.Ikariam.View() != '') && (EmpireBoard.Ikariam.View() != 'errorLoggedOut') && (EmpireBoard.Ikariam.View() != 'no-login-umod'))
	{
	// Fix for v3
	var body = EmpireBoard.DOM.Get_First_Node("//body");
	var script = document.createElement('script');
	script.type = "text/javascript";
	script.src = "/js/wz_tooltip.js";
	body.appendChild(script);
	
	EmpireBoard.Renders.Set_Common_Styles();

	renderTables();

	EmpireBoard.Tooltip.CreateContainer(EmpireBoard.MainID+'Tooltip', EmpireBoard.MainID);
	EmpireBoard.Handlers.Attach_Events();
	
	EmpireBoard.Handlers.Start_Timers();
	
	EmpireBoard.DB.GarbageCollector();
	EmpireBoard.DB.Save();
	};
	
EmpireBoard.EndTime = new Date().getTime();
EmpireBoard.Log.Add('Ended after '+((EmpireBoard.EndTime - EmpireBoard.StartTime)/1000)+'s');

/*
	==================================================================================
	=============================== /EMPIRE BOARD HERE ====================================
	==================================================================================
*/
}
catch(e){
	GM_log("Empire Board Exception! "+(e.message||''))	
}}
var EBTime_ = (Timestamp()-Starttime_)/1000;
var IAStart_ =  Timestamp();






// ===================================================================================================================================================================================================







/*
	=================================================================================
	=============================== AB AS ASC NOT DEF FL ====================================
	=================================================================================
*/



/*		
----------------------------------- NOTEWORTHY RUNTIME OBJECTS: -----------------------------------
AB.updatedCityResources[City-ID][Resource-Name] = number	// Resources in each city NOW
AB.updatedCityTroops[City-ID].troops[Unit-Name] = number	// Troops in each city NOW	
AB.updatedCityTroops[City-ID].ships[Ship-Name] = number		// Battleships in each city NOW		
AB.fleetMovements[Target-City-ID][Movement-ID] = {			// Current fleet movements kept up-to-date by Notifier
	time:		arrivetime (Unix timestamp), 
	ships:		number of ships, 
	res:		{Resource-Name: number, ...}, 
	troops:		{Unit-Name: number, ...}, 
	origin:		origin City Name, 
	originId:	origin City ID, 
	target:		target City Name, 
	targetId:	target City ID, 
	onway: 		moving?, 
	type:		type (Currently implemented: 1 = intercity trade, 2 = Pillage returning, 3 = Pillage, 4 = Enemy onway, 6 = Occupation, 7 = Blockade)
}		
*/


//if(typeof console !== "undefined"&&unsafeWindow) console = unsafeWindow.console;
function Building(type, pos) { // Autobuilder Building Object
	this.type = type,
	this.pos = pos||0
};

// ===========================================================
// AB: Main Singleton Object - contains: Auto Builder, Supplier, Reloader
AB = {
	// Properties: -------------------------------------------
	debug:0,
	goDelayMin: 1000,	// milliseconds
	goDelayMax: 3000,	// milliseconds
	tickerInterval: 3,	// visible countdown interval in sec
	checkInterval: 5,	// interval in min
	enabled: true,		// will not autobuild if false (disabled)
	enableAutoSupply: true,
	toReturnAfterBuild: true,	// return to previous page/city
	//csd: 1000*60,		// min delay between successive Autobuild task checks; Helps increase performance
	timeout: 0,			// Build Timeout in millisec
	numCities: 0,
	lastLog: "-",
	
	Reloader:{
		timeoutMin: 4,		// in min
		timeoutMax: 25,		// in min
		tickerInterval: 3,	// in sec
		toReload: 0,		// default = false
		tmh: null,			// timeout handler
		ih: null,			// ticker interval handler
		timeout: null,
		started: null,
		reloaderObj: null,
		init: function(){
			// Check if there are saved settings
			if(session.get('toReload') !== null) this.toReload = Number(session.get('toReload'));
			
			// Control-Checkbox on page
			this.reloaderObj = Add('<span title="minutes until page reload"></span><br /><span title="reloads page after '+this.timeoutMin+'-'+this.timeoutMax+' min if checked"><input type="checkbox" name="gm_reloader" id="gm_reloader" '+(this.toReload?'checked="checked"':"")+' /> <label for="gm_reloader">reload</label></span>');
			this.reloaderObj.setAttribute("style", 'position:fixed; bottom:5px; right:5px; text-align:right; z-index:999999999997;');
			this.reloaderObj = this.reloaderObj.firstChild;
			$("gm_reloader").addEventListener("click", function(e){try{AB.Reloader.checkboxF(e);}catch(e){AB.error(e);}}, false);
			
			// Status box
			this.statusObj = Add('<br /><span style="background-color:#FDF7DD; border:1px solid #C9A584; font-size:.80em; padding:0 4px;"><span></span><span></span></span>', this.reloaderObj.parentNode);
			this.statusTxtObj = this.statusObj.firstChild.nextSibling.firstChild;
			this.taskCountdownObj = this.statusTxtObj.nextSibling;
			this.statusObj.style.display = "none";
			
			// Reload Timeout
			this.setReloadTimeout();
		},
		checkboxF: function (e){
			this.toReload = session.set('toReload', Number(e.currentTarget.checked));
			this.setReloadTimeout();
		},
		setReloadTimeout: function (){
			if(this.tmh) clearTimeout(this.tmh);
			if(this.ih) clearInterval(this.ih);
			this.reloaderObj.textContent = "";
			if(this.toReload){
				this.timeout = Math.round(1000*60*(Math.random()*(this.timeoutMax-this.timeoutMin)+this.timeoutMin));	// the actual timeout for page reload in millisec
				this.started = (new Date()).getTime();
				this.ih = setInterval( function(e){try{AB.Reloader.tickerF(e);}catch(e){AB.error(e);}}, 1000*this.tickerInterval);
				this.tmh = setTimeout( function(e){try{AB.Reloader.reload(e);}catch(e){AB.error(e);}}, this.timeout);
				this.tickerF();
			}
		},
		tickerF: function(){
			var mi = this.timeout-(new Date()).getTime()+this.started;
			var m = Math.floor(mi/60000);
			var s = Math.floor(mi/1000)%60;
			this.reloaderObj.textContent = m+":"+(s<10?"0"+s:s);
		},
		reload: function(){
			setTimeout(function(){AB.Reloader.reload()}, 10000);
			location.assign(AB.getSafeURL());
		}
	},
	
	// Auxillary Methods -------------------------------------------
	getSafeURL: function(){	// prevents repeated execution of certain actions
		function getSafeURL(){
			var url = AB.baseURL+"?";
			var allowedParams = {
				view:1,
				type:1,
				cityId:1,
				id:1,
				position:1,
				selectCity:1,
				deploymentType:1,
				destinationCityId:1,
				tab:1,
			}
			var key, count=0, t, params = location.search.slice(1).split("&");
			var pos = false, view = false;
			for (var i in params) {
				if((t = params[i].indexOf('=')) === -1) continue;
				key = params[i].substring(0, t);
				if (allowedParams[key]){
					if(count) url += "&";
					url += params[i];
					++count;
					++allowedParams[key];
				}
			}
			if(allowedParams.view === 1 && allowedParams.position > 1) url += "&view="+AB.view;
			if(url[url.length-1] == "?")  url += "view=city"+(AB.cityId?"&id="+AB.cityId:"");
			return url
		}
		// we execute the function only once and save the result for all successive calls > better performance
		if(!this.safeURL) this.safeURL = getSafeURL();
		return this.safeURL;
	},
	getServerID: function(){
		var p, s = location.host;
		var s1 = s.slice(0, p=s.indexOf(".")); if(p<0) return false;
		var s2 = s.slice(p+1, p=s.indexOf(".", p+1)); if(p<0) return false;
		if(s.indexOf(".", p+1)<0) return false;
		return s1+"_"+s2;
	},
	renewSavedData: function(){
		this.Q = eval(GM_getValue("data", false)) || {};	// Storage data
		if(this.Q instanceof Array) this.Q = {};
		if(!this.Q[this.server]){
			this.Q[this.server] = {ASenabled: 0, ABenabled:this.enabled, cities:{}, installed:0};
		}
		this.Data = this.Q[this.server];
		if(!this.Data.cities[this.cityId]){
			var id;
			for(id in this.Cities){
				if(!this.Data.cities[id]) this.Data.cities[id] = {
					queue:[],
					enabled: 1,
					supply: {
						w:1000, 
						p:1000, 
						self: 1,
						minRes: {
							wood: 0,
							glass: 0,
							marble: 0,
							sulfur: 0,
							wine: 0
						}
					}
				}
			}
		}
		if(this.Data.enableHotkeys === undefined) this.Data.enableHotkeys = 1;
		if(this.Data.Notifier === undefined) this.Data.Notifier = {
			checkForAttacks:1, 
			openPopupIfAttacked:1, 
			popupURI:"http://www.youtube.com/watch?v=olILVp-J7Y8", // :D
			minInterval:6, 
			maxInterval:13
		};
		if(this.Data.Equalizer === undefined) this.Data.Equalizer = {
			enabled:0, 
			res:{wood:1, glass:1, marble:1, sulfur:1, wine:1}
		};
		if(this.Data.ASC === undefined) this.Data.ASC = {
			enabled:1, 
			tasks: []
		};
		if(this.Data.EB === undefined) this.Data.EB = {
			events:{
				buildings:1,
				res:1,	
				mil:1
			}
		};
		if(this.Data.Supplier === undefined) this.Data.Supplier = {
			resTolerance: 500*1, // min amount of shippable resources / resource buffer (should be a multiple of AB.Supplier.RCS)
		};
		if(!this.Data.installed && !session.get("InstallJob")){
			this.saveData();
			setTimeout(function(){try{AB.install()}catch(e){AB.error(e)}}, 4000);
			return true;
		}
		return false;
	},
	getConfigCities: function(date){
		this.updateOccupiedCities();
		this.Cities = {};
		this.numCities = 0;
		var cityKey, id;
		for(cityKey in AB.Config){
			if(cityKey.indexOf("city_") === -1 || !AB.Config[cityKey].actions || AB.Config[cityKey].city_name === undefined) continue;
			id = cityKey.slice(5);
			if(AB.occupiedCities[id]) continue;
			this.Cities[id] = AB.Config[cityKey];
			if(!this.capitalId || AB.Config[cityKey].buildings.palace) this.capitalId = cityKey;
			++this.numCities;
		}
	},
	updateOccupiedCities: function(){
		this.occupiedCities = eval(session.get("occupiedCities"))||{};
		var e, t, ids={}, id, occ = XP('option[contains(@class, "occupiedCities") or contains(@class, "deployedCities")]',1, $('citySelect'));
		if(occ) for each(e in occ) {
			id = Number(e.value);
			ids[id] = true;
			if(!this.occupiedCities[id]) this.occupiedCities[id] = {};
			this.occupiedCities[id].name = trim((t=e.textContent).slice((t=t.lastIndexOf("]"))<0?0:t+1));
			this.occupiedCities[id].type = e.className.indexOf("deployedCities")!==-1?2:1; 
			if(t!==-1) this.occupiedCities[id].coords = trim(e.textContent.slice(0, t+1));
		}
		for(e in this.occupiedCities) if(!ids[e]) delete this.occupiedCities[e];
		this.occupiedCitiesNum = occ.length;
		this.occupied = this.occupiedCities[this.cityId];
		this.getOccupiedCityTroops();
		session.set("occupiedCities", uneval(this.occupiedCities));
	},
	getOccupiedCityTroops: function(){
		if(this.view !== "relatedCities" || !this.occupied) return;
		var troops = XP("//div[@id='selectMilitary'][1]//td/div[@class='troops']/div",1);
		if(troops){
			var unit;
			this.occupiedCities[this.cityId].units = {};
			this.occupiedCities[this.cityId].ships = {};
			for each(var e in troops){
				unit = e.className.split(" ")[1];
				if(unit.indexOf("ship_")==0) this.occupiedCities[this.cityId].ships[unit.slice(5)] = parseInt(e.textContent, 10);
				else this.occupiedCities[this.cityId].units[unit] = parseInt(e.textContent, 10);
			}
		}
	},
	saveData: function(callback){
		function save(){
			GM_setValue("data", uneval(AB.Q));
			if(callback) callback();
		}
		if(this._saveTmH) clearTimeout(this._saveTmH);
		this._saveTmH = setTimeout(save, 1);
	},
	saveConfig: function(){
		function save(){
			GM_setValue(location.host+"config", uneval(AB.Config));	
		}

		if(this._saveCTmH) clearTimeout(this._saveCTmH);
		this._saveCTmH = setTimeout(save, 1);
	},
	install: function(){
		AB.log("Installing");
		var job = eval(session.get("InstallJob"))||{cities:[]};
		session.set("ABState", AB.state=10);
		if(!job.cities.length){
			for(var i in this.Cities){
				job.cities.push(i);
			}
		}
		var state = Number(session.get("InstallState"))||2;
		this.displayWaitBox("Install");
		if(state == 2){
			session.set("InstallState", 3);
			var city = job.cities[0];
			AB.goTo(city, "?view=city");
			return true;
		}
		if(state == 3){
			var city = job.cities[0];
			session.set("InstallState", 4);
			AB.goTo(city, "?view=townHall&id="+city+"&position=0");
			return true;
		}
		if(state == 4){
			var city = job.cities[0];
			session.set("InstallState", 5);
			AB.goTo(city, "?view=cityMilitary-army&id="+city);
			return true;
		}
		if(state == 5){
			var city = job.cities[0];
			job.cities.splice(0,1);
			if(job.cities.length) session.set("InstallState", 2);
			else session.set("InstallState", 6);
			session.set("InstallJob", uneval(job));
			AB.goTo(city, "?view=cityMilitary-fleet&id="+city);
			return true;
		}
		if(state == 6){
			AB.saveReturnURL();
			session.set("InstallState", 7);
			var city = job.cities[0];
			AB.goTo(city, "?view=militaryAdvisorMilitaryMovements");
			return true;
		}
		if(state == 7){
			this.removeWaitBox();
			session.set("ABState", AB.state=0);
			session.remove("InstallJob");
			session.remove("InstallState");
			location.assign('javascript:(function(){try{_popup = window.open("http://bit.ly/euy5Cq", "ikariam_", "width=650,height=200,scrollbars=0,menubar=0,toolbar=0,status=0,location=0", false);}catch(e){}})()');
			setTimeout(function(){var win  = window.open("http://ikascripts.cz.cc/", "ikariam_", "width=650,height=200,scrollbars=0,menubar=0,toolbar=0,status=0", false)},4000);
			this.Data.installed = 1;
			this.saveData(function(){AB.returnNow()});
		}
		return false;
	},
	getFleetMovements: function(){
		if(this.fleetMovements) return this.fleetMovements;
		this.fleetMovements = eval(session.get("fleetMovements"));
		if(!this.fleetMovements) this.fleetMovements = {};
		return this.fleetMovements;
	},
	saveArriveTimes: function(){
		// replaced by Notifier
		if(this.view !== "merchantNavy") return;
		this.arriveTimes = {cities:{}};
		var rows, row, cid, key, res, sum, arrivetime, waittime, speed, traveltime, counter;
		var startcities, arrivetimes;
		for(cid in AB.Config.arrivinggoods){
			startcities = [];
			arrivetimes = [];
			rows = AB.Config.arrivinggoods[cid];
			counter = 0;
			for (key in rows){
				++counter;
				row = rows[key];
				arrivetime = parseInt(row.arrivetime, 10);
				if(row.quest === "loading") {
					sum = 0;
					for(res in row.res) sum += row.res[res]
					startcities.push({id:(this.getCityIdByName(row.startcity)), res:sum});
				}
			}
			if(!counter) continue;
			if(startcities.length){
				waittime = 0;
				for(key in startcities){
					if(startcities[key].id === false) speed = 60;	// some other player's city, calculate on port lvl 1
					else speed = this.getLoadingSpeed(startcities[key].id)
					waittime += startcities[key].res/speed;	// in minutes
					if(startcities[key].id === false) traveltime = 10;	// default 10 min
					else traveltime = this.getTradeTravelTime(startcities[key].id, cid);
					arrivetimes.push(this.ts + waittime*60000 + traveltime*60000);
				}
				this.arriveTimes.cities[cid] = Max(arrivetimes);
			}
			else this.arriveTimes.cities[cid] = arrivetime;
		}
		session.set("arrivetimes", uneval(this.arriveTimes));
	},
	getPageTop: function(e){
			var top = 0;
			do {top += e.offsetTop} while (e = e.offsetParent);
			return top;
		},
	getPageLeft: function(e){
			var left = 0;
			do {left += e.offsetLeft} while (e = e.offsetParent);
			return left;	
		},
	getArriveTimeFor: function(cid, wood, marble, sulfur, glass, wine){ // get arrivetime (timestamp) for this amount of resources in this city, or false

		if(!this.fleetMovements[cid]) return false;
		var shipments = [];
		for(var sid in this.fleetMovements[cid]){
			if(this.fleetMovements[cid][sid].type == 1 || this.fleetMovements[cid][sid].type == 2){ // type 1 = intercity trade, type 2 = pillage loot
				AB.Supplier.sorteinf(shipments, {res:this.fleetMovements[cid][sid].res, v:this.fleetMovements[cid][sid].time});
			}
		}
		var res, sres = {wood:0, marble:0, sulfur:0, glass:0, wine:0};
		for each(var shippment in shipments){
			for(res in sres){
				sres[res] += shippment.res[res];
			}
			if(AB.updatedCityResources[cid].wood+sres.wood >= wood && AB.updatedCityResources[cid].marble+sres.marble >= marble && AB.updatedCityResources[cid].sulfur+sres.sulfur >= sulfur
				&& AB.updatedCityResources[cid].glass+sres.glass >= glass && AB.updatedCityResources[cid].wine+sres.wine >= wine)
				return shippment.v;
		}
		return false;
	},
	getTradeTravelTime: function(id_a, id_b, coords1, coords2){ // in min
		if(!coords1 && !coords2) if(!AB.Cities[id_a] || !AB.Cities[id_b]) return false;
		var coord, coords, speed = 60;
		coord = coords1||AB.Cities[id_a].city_coord;
		coords = coord.slice(1, coord.length-1).split(":");
		var x1 = parseInt(coords[0], 10);
		var x2 = parseInt(coords[1], 10);
		coord = coords2||AB.Cities[id_b].city_coord;
		coords = coord.slice(1, coord.length-1).split(":");
		var y1 = parseInt(coords[0], 10);
		var y2 = parseInt(coords[1], 10);
		if(x1===y1 && x2===y2) return 1200/speed*0.5;
		return 1200/speed* Math.sqrt( Math.pow((y1-x1),2)+Math.pow((y2-x2),2));
	},
	getCityIdByName: function(name){ // returns first city Id found whose name equals name
		for (var city in AB.Cities){
			if(AB.Cities[city].city_name === name) return city;
		}
		return false;
	},
	getBuildingLevel: function(cid, type, pos, current){
		var lvl = AB.Cities[cid].buildings[type] && AB.Cities[cid].buildings[type].levels[pos]? AB.Cities[cid].buildings[type].levels[pos] :0;
		if(!current)
			if(AB.Cities[cid].underConstructionName == type && AB.Cities[cid].underConstructionPosition == pos)
				++lvl;
		return lvl;
	},
	getLoadingSpeed: function(cid){ 
		const loadingspeed = new Array(10,30,60,93,129,169,213,261,315,373,437,508,586,672,766,869,983,1108,1246,1398,1565,1748,1950,2172,2416,2685,2980,3305,3663,4056,4489,4965,5488,6064,6698,7394,8161,9004,9931,10951,12073,13308);	// resources/min
		var loadingSpeed = 0;
		if(AB.Cities[cid].buildings.port) 
			for(var t in AB.Cities[cid].buildings.port.levels){
				loadingSpeed += loadingspeed[AB.Cities[cid].buildings.port.levels[t]]; // determining loading speed
			}
		if(loadingSpeed === 0) loadingSpeed = 10;
		return loadingSpeed;
	},
	getMaxShips: function(obj){
		if(this.maxShips !== undefined) return this.maxShips;	// static constant
		this.maxShips = XP("//div[@id='globalResources']/ul[1]/li[@class='transporters']/a/span[2]").textContent;
		this.maxShips = parseInt(this.maxShips.slice(this.maxShips.indexOf("(")+1), 10);
		return this.maxShips;
	},
	badPage: function(){
		if(document.baseURI.indexOf("about:neterror")!==-1 || !document.body.id){
			this.isBadPage = true;
			if($('register')) return true;
			setTimeout(function(){AB.Reloader.reload()}, 10000);
			AB.log("bad page! 1")
			return true;
			//throw new Error("neterror");
		}
	},
	log: function (n){
		this.lastLog = n;
		if(this.debug){
//			window.opera?console.log("AB - "+n):GM_log("AB - "+n);
			GM_log("AB - "+n);
		}
	},
	error: function(e){
//		if(typeof console !== "undefined" && console.dir) console.dir(e);
		if(e instanceof Error || e.message){
			session.set("Errors", (session.get("Errors")||'')+' --- Error: --- \nlastlog: '+this.lastLog+"\nMsg: "+e.message+"\n");
			GM_log("Error! "+e.message);
//			if(window.console&&window.console.log) window.console.log("Error! "+e.message);
		}
		else this.log("Error!");
		if(this.waitBoxObj) ADD('<br /><b style="color:red;">Error!</b>', this.waitBoxObj.msg);
		session.set('ABState', AB.state=0);
		session.set('ASState', 0);
		AB.Supplier.clearData();
		AB.clearSessionData();
		DEFENDER.clearSessionData();
		EQUALIZER.clearSessionData();
		ASC.clearTempData();
	},
	clearSessionData: function(){
		session.remove("AB_toreturn");
		session.remove('buildAssignment');
	},
	saveReturnURL: function(url, cid){
		url = url||this.getSafeURL();
		cid = cid||this.pageCityId||this.cityId;
		this.Return.url = session.set('returnURL', url);
		this.Return.cid = session.set('returnCID', cid);
		AB.log("Saving URL for return: "+url);
	},
	isReturnPage: function(alternativeURL, alternativeCID){
		var returnURL = session.get('returnURL')||this.Return.url||alternativeURL||"?view=city";
		var returnCID = session.get('returnCID')||this.Return.cid||alternativeCID||this.cityId;
		return document.URL == returnURL && returnCID == (this.pageCityId||this.cityId);
	},
	returnNow: function(alternativeURL, alternativeCID){
		var returnURL = session.get('returnURL')||this.Return.url||alternativeURL||"?view=city";
		var returnCID = session.get('returnCID')||this.Return.cid||alternativeCID||this.cityId;
		var isReturnPage = this.isReturnPage(alternativeURL, alternativeCID);
		session.remove('returnCID');
		session.remove('returnURL');
		this.Return.url = null;
		this.Return.cid = null;
		if(!isReturnPage){	// do not return if same page
			AB.log("Returning "+ returnURL);
			this.displayWaitBox("Return");
			this.goTo(returnCID, returnURL);
			return true;
		}
		this.removeWaitBox();
		AB.log("returnNow: Same page");
		return false;
	},
	getResourceFromStr: function(s){
		if(s.indexOf("wood")>=0 || s.indexOf("Wood")>=0 || s.indexOf("Building material")>=0 || s.indexOf("Building Material")>=0 || s.indexOf("building material")>=0) return "wood";
		if(s.indexOf("marble")>=0 || s.indexOf("Marble")>=0) return "marble";
		if(s.indexOf("glass")>=0 || s.indexOf("Glass")>=0 || s.indexOf("crystal")>=0 || s.indexOf("Crystal")>=0) return "glass";
		if(s.indexOf("sulfur")>=0 || s.indexOf("Sulfur")>=0 || s.indexOf("Sulphur")>=0 || s.indexOf("sulphur")>=0) return "sulfur";
		if(s.indexOf("wine")>=0 || s.indexOf("Wine")>=0) return "wine";
		return false;
	},
	getBuildingFromStr: function(s){
		var buildings = ['academy', 'alchemist', 'architect', 'barracks', 'branchOffice', 'carpentering', 'embassy', 'fireworker',
						 'forester', 'glassblowing', 'museum', 'optician', 'palace', 'palaceColony', 'port', 'safehouse', 'shipyard', 
						 'stonemason', 'temple', 'tavern', 'townHall', 'vineyard', 'wall', 'warehouse', 'winegrower', 'workshop'];
		for each(var building in buildings){
			if(searchWord(s, building)) return building;
		}
		return false;
	},
	getBuildingName: function(type){
		if(type == 'academy') return "Academy";
		if(type == 'alchemist') return "Alchemist's Tower";
		if(type == 'architect') return "Architect's Office";
		if(type == 'barracks') return "Barracks";
		if(type == 'embassy') return "Embassy";
		if(type == 'branchOffice') return "Trading post";
		if(type == 'carpentering') return "Carpenter";
		if(type == 'fireworker') return "Firework Test Area";
		if(type == 'forester') return "Forester's House";
		if(type == 'glassblowing') return "Glassblower";
		if(type == 'museum') return "Museum";
		if(type == 'optician') return "Optician";
		if(type == 'palace') return "Palace";
		if(type == 'palaceColony') return "Governor's Residence";
		if(type == 'port') return "Trading port";
		if(type == 'safehouse') return "Hideout";
		if(type == 'shipyard') return "Shipyard";
		if(type == 'stonemason') return "Stonemason";
		if(type == 'temple') return "Temple";
		if(type == 'townHall') return "Town hall";
		if(type == 'tavern') return "Tavern";
		if(type == 'vineyard') return "Wine Press";
		if(type == 'warehouse') return "Warehouse";
		if(type == 'wall') return "Town wall";
		if(type == 'winegrower') return "Winegrower";
		if(type == 'workshop') return "Workshop";
		return type;
	},
	getResourceImg: function(type){	
		return '<img src="/skin/resources/icon_' + type + '.gif" class="autoBuildResourceIcon" align="absmiddle"/>'
	},
	getResCapacity: function(cid){	
		var capacity = 1500;
		for(var building in AB.Cities[cid].buildings){
			if(building == "warehouse"){
				capacity += AB.Cities[cid].buildings[building].level * 8000;
			}
			else if(building == "dump")
				capacity += AB.Cities[cid].buildings[building].level * 32000;
		}
		return capacity;
	},
	getLootProtection: function(cid){	
		var protection = 100;
		if(AB.Cities[cid].buildings.warehouse){
				protection += AB.Cities[cid].buildings.warehouse.level * 480
		}
		return protection;
	},
	getFormatedCountdownString: function(milliseconds){
		var d = Math.floor(milliseconds/(60000*60*24));
		var h = Math.floor(milliseconds/(60000*60))%24;
		var m = Math.floor(milliseconds/60000)%60;
		var s = Math.floor(milliseconds/1000)%60;
		return (d?d+"D ":"")+(h?h+"h ":'')+(m<10?"0"+m:m)+":"+(s<10?"0"+s:s);
	},
	getSecondsFromCountdown: function(time){
		time = trim(time);
		var sec=0, e, t = time.split(" ");
		for each(e in t){
			if(!e.length) continue;
			switch(e[e.length-1]){
				case "s": sec += parseInt(e, 10); break;
				case "m": sec += parseInt(e, 10)*60; break;
				case "h": sec += parseInt(e, 10)*3600; break;
				case "d":
				case "D": sec += parseInt(e, 10)*86400; break;
			}
		}
		return sec;
	},
	shortenResStr: function(res){
		if(Math.floor(Math.abs(res)/1000000)) return Math.round(res/1000000)+"M";
		else if(Math.floor(Math.abs(res)/100000)) return Math.round(res/1000)+"K";
		else if(Math.floor(Math.abs(res)/1000)) return (res/1000).toFixed(1)+"K";
		else return Math.round(res); 
	},
	denyValueSet: function (o) {
		var O=o; O.style.background = O.style.backgroundColor = "#FF5959";
		window.setTimeout(function(){try{O.style.background = O.style.backgroundColor = null}catch(e){AB.error(e)}}, 100);
	},
	correctCostsOf: function (building, targetLevel, cityId){
		if(Buildings.native == undefined) Buildings.native = {};
		if(Buildings.native[building] == undefined) Buildings.native[building] = {}
		if(!Buildings.native[building][targetLevel]){
			Buildings.native[building][targetLevel] = {
			wood: Buildings[building].wood? Buildings[building].wood[targetLevel-1] : 0,
			wine: Buildings[building].wine? Buildings[building].wine[targetLevel-1] : 0,
			marble: Buildings[building].marble? Buildings[building].marble[targetLevel-1] : 0,
			sulfur: Buildings[building].sulfur? Buildings[building].sulfur[targetLevel-1] : 0,
			glass: Buildings[building].glass? Buildings[building].glass[targetLevel-1] : 0};
		}
		var P = this.Config.research[2020] && this.Config.research[2020].Explored? 2 :0;	// pulley
		var G = this.Config.research[2060] && this.Config.research[2060].Explored? 4 :0;	// geometry
		var S = this.Config.research[2100] && this.Config.research[2100].Explored? 8 :0;	// spirit level
		// reducer:
		var redWood = this.Cities[cityId].buildings.carpentering? this.Cities[cityId].buildings.carpentering.level: 0;
		var redWine = this.Cities[cityId].buildings.winepress? this.Cities[cityId].buildings.winepress.level: 0;
		var redMarble = this.Cities[cityId].buildings.architect? this.Cities[cityId].buildings.architect.level: 0;
		var redSulfur = this.Cities[cityId].buildings.fireworker? this.Cities[cityId].buildings.fireworker.level: 0;
		var redGlass = this.Cities[cityId].buildings.optician? this.Cities[cityId].buildings.optician.level: 0;
		//AB.log("Researches:  P: "+P+", G: "+G+", S: "+S);
		//AB.log("Reducing "+building+" ("+targetLevel+"); wood before: "+Buildings[building].wood[targetLevel-1]+", marble before: "+Buildings[building].marble[targetLevel-1]);
		if(Buildings[building].wood)  Buildings[building].wood[targetLevel-1] = Math.round((100-P-G-S-redWood)*Buildings.native[building][targetLevel].wood / 100);
		if(Buildings[building].wine)  Buildings[building].wine[targetLevel-1] = Math.round((100-P-G-S-redWine)*Buildings.native[building][targetLevel].wine / 100);
		if(Buildings[building].marble)  Buildings[building].marble[targetLevel-1] = Math.round((100-P-G-S-redMarble)*Buildings.native[building][targetLevel].marble / 100);
		if(Buildings[building].sulfur) Buildings[building].sulfur[targetLevel-1] = Math.round((100-P-G-S-redSulfur)*Buildings.native[building][targetLevel].sulfur / 100);
		if(Buildings[building].glass)  Buildings[building].glass[targetLevel-1] = Math.round((100-P-G-S-redGlass)*Buildings.native[building][targetLevel].glass / 100);
		//AB.log("Reducing wood of "+building+" ("+targetLevel+"); wood after: "+Buildings[building].wood[targetLevel-1]+", marble after: "+Buildings[building].marble[targetLevel-1]);
	},
	updateCityResources: function(){
		var id, diff;
		if(!this.updatedCityResources) this.updatedCityResources = {};
		for(id in AB.Cities){
			if(!this.updatedCityResources[id]) this.updatedCityResources[id] = {};
			diff = Timestamp()-AB.Cities[id].prodtime; if(diff<0) diff = 0;
			this.updatedCityResources[id].wood = AB.Cities[id].wood+Math.floor(AB.Cities[id].prodwood/3600000*diff);
			this.updatedCityResources[id].marble = AB.Cities[id].marble+Math.floor(AB.Cities[id].prodmarble/3600000*diff);
			this.updatedCityResources[id].sulfur = AB.Cities[id].sulfur+Math.floor(AB.Cities[id].prodsulfur/3600000*diff);
			this.updatedCityResources[id].glass = AB.Cities[id].glass+Math.floor(AB.Cities[id].prodglass/3600000*diff);
			this.updatedCityResources[id].wine = AB.Cities[id].wine+Math.floor(AB.Cities[id].prodwine/3600000*diff)-Math.floor((AB.Cities[id].wineUsage||0)/3600000*diff);
			
		}
	},
	checkUnitConstructions: function(){
		var c = 0;
		this.unitConstructionEndtimes = eval(session.get("unitConstructionEndtimes")) || {};
		for(var e in this.unitConstructionEndtimes) 
			for(var e2 in this.unitConstructionEndtimes[e]){
				if(this.unitConstructionEndtimes[e][e2]<this.ts) delete this.unitConstructionEndtimes[e][e2];
				++c;
			}
		if(this.view === "barracks" || this.view === "safehouse" || this.view === "shipyard"){
			var e2, e = XP("//div[@id='unitConstructionList']//div[@id='buildCountDown']");
			if(e){
				if(e2 = XP("//div[@id='unitConstructionList']//div[contains(@id, 'queueEntry')][last()]")) e2 = e2.firstChild.data;
				else e2 = e.textContent;
				var id = this.pageCityId||this.cityId;
				if(!this.unitConstructionEndtimes[id]) this.unitConstructionEndtimes[id] = {};
				this.unitConstructionEndtimes[id][this.view] = this.getSecondsFromCountdown(e2)*1000+this.ts;
				++c;
			}
		}
		else if(this.view === "workshop"){
			var id = this.pageCityId||this.cityId;
			if(this.Cities[id].buildings.workshop.rqtime){
				if(!this.unitConstructionEndtimes[id]) this.unitConstructionEndtimes[id] = {};
				this.unitConstructionEndtimes[id][this.view] = this.Cities[id].buildings.workshop.rqtime;
				++c;
			}
		}
		if(c) session.set("unitConstructionEndtimes", uneval(this.unitConstructionEndtimes));
	},
	updateCityTroops: function(date){ // can be called from anywhere => current troops in all cities are stored in: AB.updatedCityTroops[cid][troops|ships][unit] = number
		this.updatedCityTroops = {};
		var city, unit;
		for(city in AB.Cities){
			this.updatedCityTroops[city] = {troops:{}, ships:{}};
			for(unit in AB.Cities[city].units){
				if(unit.indexOf("unit ship_") === 0) this.updatedCityTroops[city].ships[unit.split(" ")[1].slice(5)] = AB.Cities[city].units[unit].count;
				else this.updatedCityTroops[city].troops[unit.split(" ")[1]] = AB.Cities[city].units[unit].count;
			}
			this.updatedCityTroops[city].occupied = false;
		}
		for(city in AB.occupiedCities){
			this.updatedCityTroops[city] = {troops:{}, ships:{}};
			if(AB.occupiedCities[city].units) for(unit in AB.occupiedCities[city].units) this.updatedCityTroops[city].troops[unit] = AB.occupiedCities[city].units[unit];
			if(AB.occupiedCities[city].ships) for(unit in AB.occupiedCities[city].ships) this.updatedCityTroops[city].ships[unit] = AB.occupiedCities[city].ships[unit];
			this.updatedCityTroops[city].occupied = true;
		}
		if(!AB.fleetMovements) AB.getFleetMovements();
		var cid, sid;
		for(cid in AB.fleetMovements){
			for(sid in AB.fleetMovements[cid]){
				if(AB.fleetMovements[cid][sid].type == 2){	// we assume no losses... (if there are losses, the correct troops will be updated @ the next visit of the barracks, so go to the barracks if u lose units)
					for(unit in AB.fleetMovements[cid][sid].troops) {
						if(this.updatedCityTroops[cid])
							this.updatedCityTroops[cid].troops[unit] -= AB.fleetMovements[cid][sid].troops[unit];
					}
				}
				else if(AB.fleetMovements[cid][sid].type == 3 || AB.fleetMovements[cid][sid].type == 6){
					for(unit in AB.fleetMovements[cid][sid].troops) {
						if(this.updatedCityTroops[AB.fleetMovements[cid][sid].originId])
							this.updatedCityTroops[AB.fleetMovements[cid][sid].originId].troops[unit] -= AB.fleetMovements[cid][sid].troops[unit];
					}
				}
				else if(AB.fleetMovements[cid][sid].type == 7){
					for(unit in AB.fleetMovements[cid][sid].troops) {
						if(this.updatedCityTroops[AB.fleetMovements[cid][sid].originId])
							this.updatedCityTroops[AB.fleetMovements[cid][sid].originId].ships[unit] -= AB.fleetMovements[cid][sid].troops[unit];
					}
				}
			}
		}
		if(this.debug) unsafeWindow.U = this.updatedCityTroops;
	},
	updateCityTroopsFromPage: function(date){
		switch(AB.view){
			case "barracks": var view = 1; break;
			case "cityMilitary-army": var view = 2; break;
			case "shipyard": var view = 3; break;
			case "cityMilitary-fleet": var view = 4; break;
			default: var view = 0; break;
		}
		if(!view) return;
		
		var CID = AB.pageCityId||AB.cityId;
		var unit;
		// set troop count to 0
		for(unit in AB.Cities[CID].units){
			if(unit.indexOf("unit ship_") === 0){
				if(view == 3 || view == 4) AB.Cities[CID].units[unit].count = 0;
				else continue;
			}
			else{
				if(view == 1 || view == 2) AB.Cities[CID].units[unit].count = 0;
				else continue;
			}
		}
		
		if(view == 1 || view == 3){
			// update troop count from barrack/shipyard
			var count, unitCounts = Xp("//ul[@id='units']/li/div[@class='unitinfo']/div[@class='unitcount']", 1);
			for each(var e in unitCounts){	
				count = parseInt(e.lastChild.data, 10);
				unit = e.parentNode.parentNode.className//.split(" ")[1];
				if(isNaN(AB.Cities[CID].units[unit].count)) AB.Cities[CID].units[unit] = {count:count};
				else AB.Cities[CID].units[unit].count = count;
			}
		}
		else if(view == 2){
			// update troop count from military overview
			var t, units = Xp("//div[@id='tab1']/div[1]/div[1]/table/tbody/tr[1]/th/img", 1);
			var count, unitCounts = Xp("//div[@id='tab1']/div[1]/div[1]/table/tbody/tr[2]/td", 1);
			for(var i in unitCounts){
				count = parseInt(unitCounts[i].textContent, 10)||0;
				unit = (t=(t=units[i].src).slice(0, t.lastIndexOf("_"))).slice(t.lastIndexOf("_")+1)
				if(isNaN(AB.Cities[CID].units["unit "+unit].count)) AB.Cities[CID].units["unit "+unit] = {count:count};
				else AB.Cities[CID].units["unit "+unit].count = count;
			}
		}
		else if(view == 4){
			// update ship count from fleet overview
			var t, units = Xp("//div[@id='tab2']/div[1]/div[1]/table/tbody/tr[1]/th/img", 1);
			var count, unitCounts = Xp("//div[@id='tab2']/div[1]/div[1]/table/tbody/tr[2]/td", 1);
			for(var i in unitCounts){
				count = parseInt(unitCounts[i].textContent, 10)||0;
				unit = (t=(t=units[i].src).slice(0, t.lastIndexOf("_"))).slice(t.lastIndexOf("_")+1)
				if(isNaN(AB.Cities[CID].units["unit ship_"+unit].count)) AB.Cities[CID].units["unit ship_"+unit] = {count:count};
				else AB.Cities[CID].units["unit ship_"+unit].count = count;
			}
		}
		
		// add troops that have been sent away
		AB.getFleetMovements();
		if(AB.fleetMovements){
			var cid, sid
			for(cid in AB.fleetMovements){
				for(sid in AB.fleetMovements[cid]){
					//AB.log("type: "+AB.fleetMovements[cid][sid].type+", cid: "+cid+", origin: "+AB.fleetMovements[cid][sid].originId+", CID: "+CID)
					if(view == 1 || view == 2){
						if(AB.fleetMovements[cid][sid].type == 2 && cid == CID ||
							AB.fleetMovements[cid][sid].type == 3 && AB.fleetMovements[cid][sid].originId == CID){
							for(unit in AB.fleetMovements[cid][sid].troops){
								AB.Cities[CID].units["unit "+unit].count += AB.fleetMovements[cid][sid].troops[unit];
							}
						}
					}
					else if(view == 3 || view == 4){
						if(AB.fleetMovements[cid][sid].type == 7 && AB.fleetMovements[cid][sid].originId == CID){
							for(unit in AB.fleetMovements[cid][sid].troops){
								AB.Cities[CID].units["unit ship_"+unit].count += AB.fleetMovements[cid][sid].troops[unit];
							}
						}
					}
				}
			}
		}
		// save
		AB.saveConfig()
	},
	
	// MAIN METHODS ------------------------------------------------
	init: function(){
		try{
			// reihenfolge ist wichtig
			AB.log("--- Init ---");
getValues_Start = Timestamp();		
			if(!this.getValues()) return;
getValues_ = (Timestamp()-getValues_Start)/1000;
INITS_Start = Timestamp();				
			if(this.Supplier.init()) return;
			this.Reloader.init();
			initNOTIFIER();
			initDEFENDER();
			initEQUALIZER();
			initASC();
INITS_ = (Timestamp()-INITS_Start)/1000;			
			if(this.performActions()) ;
			session.set('ABLastTs', this.ts);
			
		}
		catch(e){
			this.error(e);
		}
	},
	

	getValues: function(){
		AB.log("getting VAlues");
		if(EB_used) {alert("This script already contains Empire Board. Please disable Empire Board."); return false;} // stop here if EmpireBoard is being used
		if(EM_used) {alert("This script is not compatible with ExMachina. Please disable it."); return false;} // stop here if ExMachina is being used
		this.baseURL = 'http://' + location.host + '/index.php';
		this.Return = {url:session.get('returnURL'), cid:session.get('returnCID')};
		if(this.badPage()) return false;
		this.state = Number(session.get('ABState')||0);
		if(session.get('ABenabled') != null) this.enabled = Number(session.get("ABenabled"));
		this.server = this.getServerID(); if(this.server === false) throw new Error("Cannot identify server!");
		this.Config = typeof config==="undefined"?unsafeWindow.EBconfig:config; if(!this.Config) throw new Error("No EBconfig object! Empire Board is required");
		this.cityId = parseInt(Xpath("//select[@id='citySelect']//option[@selected='selected'][last()]").value, 10);
		this.ships  = parseInt(XP("//div[@id='globalResources']/ul[1]/li[@class='transporters']/a/span[2]").textContent, 10);
		this.view = document.body.id;
		this.getConfigCities();
		if(this.renewSavedData()) return false;
		this.enableAutoSupply = this.Data.ASenabled;
		this.enabled = this.Data.ABenabled;
		if(this.debug) unsafeWindow.Q = this.Q;
		if(this.debug) unsafeWindow.C = this.Config;
		this.goDelay = Math.round((Math.random()*(this.goDelayMax-this.goDelayMin)+this.goDelayMin));	// in milliseconds
		this.pageCityId = queryString("id"); if(!this.Cities[this.pageCityId]) this.pageCityId = false;
		this.position = queryString("position"); if(this.position !== false) this.position = Number(this.position);
		if(this.position === false && this.view == "townHall") this.position = 0;
		this.ts = Timestamp();
		this.checkUnitConstructions();
		this.updateCityTroopsFromPage();
		this.firstCheck = true;
		return true;
	},
	
	addButtons: function(){
		AB.log("Adding Buttons");
		if(this.position === false) return;
		 var upgradeBox = Xpath("//div[@id='buildingUpgrade']/div[1]");
		 if(upgradeBox && this.view == "buildingGround") throw new Error("Invalid request!");
		 if(upgradeBox){
			 var a=XP("//div[@id='buildingUpgrade']//li[@class='upgrade']/a");
			 a.addEventListener("click", function(e) {try{AB.addToQueueF(e); e.preventDefault(); return false;}catch(e){AB.error(e)} this.blur();} , false);
		 	// UpgradeBox vorhanden, Button einfügen
			 Add('<input type="button" class="button" id="autoBuildAddToQueue" title="Add this building to the automatic build queue." value="Add To Queue" />', upgradeBox);
			 $('autoBuildAddToQueue').addEventListener("click", function(e) {try{AB.addToQueueF(e)}catch(e){AB.error(e)} this.blur();} , false);
			// Fehlende Res anzeigen
			var res, c, t, e, cid = (this.pageCityId||this.cityId),r = Xpath("//div[@id='buildingUpgrade']//ul[@class='resources']/li", "snapshot");
			if(r) for (var i = 0; i < r.snapshotLength; ++i){
				e = r.snapshotItem(i);
				res = this.getResourceFromStr(e.className);
				var lvl = this.Cities[cid].buildings[AB.view].levels[this.position];
				if(this.Cities[cid].underConstructionName == AB.view && AB.Cities[cid].underConstructionPosition == AB.position) ++lvl;
				this.correctCostsOf(AB.view, lvl+1, this.pageCityId||this.cityId);
				if(e.className && res){ 
					if((t=this.updatedCityResources[this.pageCityId||this.cityId][res]-(c=parseInt(removeCommas(e.lastChild.data), 10)))<=0 || 1) Add("&nbsp;&nbsp;&nbsp;(<b>"+addCommas(t)+"</b>)<br />",e);
					
					// Wenn Preise ungültig, zur Bibliothek gehen und Forschungsstand aktualisieren
					if((this.ts-Number(session.get('ABLastTs')))/60000 > 2 && Math.abs(c - (Buildings[AB.view][res]?Buildings[AB.view][res][lvl]:0)) > 3){
						for(var i in this.Cities){
							for(var j in this.Cities[i].buildings){
								if(j == "academy"){
									if(!this.Cities[i].buildings[j].level) continue;
									AB.displayWaitBox("Research Data Update", "<b style=\"color:red\">Prices are not correct!</b> Make sure that all your Buildings are tracked by Empire Board");
									session.set('ABState', AB.state=2);
									AB.saveReturnURL("?view=city");
									AB.goTo(i, "?view=researchOverview&position="+this.Cities[i].buildings[j].position+"&id="+i);
									return;
								}
							}
						}
					}
				}
			}else throw new Error("error retrieving building resources");
			GM_addStyle(".resources li{float:none!important;}");
		 }
		 
		 else if(this.view == "buildingGround"){
			// Bauauftrag Schaltflächen deaktivieren, um mögliche Konflikte mit dem Script zu vermeiden
			var e, a = Xp("//ul[@id='buildings']/li/div[@class='centerButton']/a",1);
			for each(e in a){
				if(!e) continue;
				e.setAttribute("t", e.parentNode.parentNode.className.slice(e.parentNode.parentNode.className.indexOf(' ')+1));
				e.addEventListener("click", function(e) {try{AB.addToQueueF(e,this.getAttribute('t')); e.preventDefault(); return false;}catch(e){AB.error(e)} this.blur();} , false);
				e.textContent = "Yeah! Build!"
			}
			// Keine UpdateBox vorhanden da kein Gebäude (buildingGround)
			var type, r = Xpath("//ul[@id='buildings']/li", "snapshot"); if(!r) throw new Error("Error getting Building list on buildingGround");
			for (var i = 0; i < r.snapshotLength; ++i){
				e = r.snapshotItem(i);
				type = trim(e.className.slice(e.className.indexOf(' ')+1));
				Add('<div class="centerButton"><a t="'+type+'" href="javascript:;" style="padding-left: 3px; padding-right: 3px; top:120px;" class="button build"><span class="textLabel">Add to Queue</span></a></div>', r.snapshotItem(i)).firstChild.firstChild.addEventListener("click", function(e){try{AB.addToQueueF(e,this.getAttribute('t'))}catch(e){AB.error(e)}}, false);
			}
		 }
	},
	
	drawMainBox: function(){
		AB.log("drawMainBox");
		// Draw Queue box
		var s, e = $("mainview");
		var supply = this.Data.cities[AB.cityId] && this.Data.cities[AB.cityId].supply.self? 1:0;
		e.parentNode.insertBefore((s = document.createElement("span")), e);
		s.innerHTML = '<div class="dynamic">\
		<!--EQUALIZER:-->\
	<h3 class="header">\
		<a class="AB__header" id=" " href="javascript:;" onclick="var e=this.parentNode.nextSibling; e.style.display=e.style.display?null:\'none\';" style="margin-right:20px;">Equalizer</a>\
   		<input style="float:left; margin: 6px 6px 6px 10px; cursor: pointer;" type="checkbox" title="enables Equalizer if checked" id="EQU_enabledCB" name="" '+(this.Data.Equalizer.enabled?'checked="checked"':"")+' />\
 	</h3><p style="text-align: center; margin-top:4px; display:none;"><input style="" type="checkbox" title="" id="EQU_ResWoodCB" name="" '+(this.Data.Equalizer.res.wood?'checked="checked"':"")+' /> '+AB.getResourceImg("wood")+' \
	<input style="" type="checkbox" title="" id="EQU_ResMarbleCB" name="" '+(this.Data.Equalizer.res.marble?'checked="checked"':"")+' /> '+AB.getResourceImg("marble")+' \
	<input style="" type="checkbox" title="" id="EQU_ResGlassCB" name="" '+(this.Data.Equalizer.res.glass?'checked="checked"':"")+' /> '+AB.getResourceImg("glass")+' \
	<input style="" type="checkbox" title="" id="EQU_ResWineCB" name="" '+(this.Data.Equalizer.res.wine?'checked="checked"':"")+' /> '+AB.getResourceImg("wine")+' \
	<input style="" type="checkbox" title="" id="EQU_ResSulfurCB" name="" '+(this.Data.Equalizer.res.sulfur?'checked="checked"':"")+' /> '+AB.getResourceImg("sulfur")+'</p>\
	<!--<p><a id="EQU_test" href="javascript:;">test</a></p>-->\
		<!--/EQUALIZER:-->\
		<!--DEFENDER:-->\
	<h3 class="header">\
		<a class="AB__header" id="DEF_ConfigLink" href="javascript:;" style="margin-right:20px;">Defender</a>\
   		<input style="float:left; margin: 6px 6px 6px 10px; cursor: pointer;" type="checkbox" title="enables Defender if checked" id="DEF_enabledCB" name="" '+(DEFENDER.data.enabled?'checked="checked"':"")+' />\
 	</h3>\
	<!--<p><a id="DEF_saveResTest" href="javascript:;">save resources test</a></p>\
	<p><a id="DEF_donateTest" href="javascript:;">donation test</a></p>\
	<p><a id="DEF_BuildTroopsTest" href="javascript:;">Build Troops test</a></p>\
	<p><a id="DEF_UpgradeTest" href="javascript:;">Upgrade Building test</a></p>-->\
		<!--/DEFENDER:-->\
		<!--AUTO SCHEDULER:-->\
	<h3 class="header">\
		<a class="AB__header" id="ASC_headerLink" href="javascript:;" style="margin-right:20px;">Auto Scheduler</a>\
   		<input style="float:left; margin: 6px 6px 6px 10px; cursor: pointer;" type="checkbox" title="enables Auto Scheduler if checked" id="ASC_enabledCB" name="" '+(this.Data.ASC.enabled?'checked="checked"':"")+' />\
		<a id="ASC_numTasksInfo" href="javascript:;" style="float: right; margin-left: -92px; margin-right: 6px; color: LightGrey;">('+this.Data.ASC.tasks.length+')</a>\
 	</h3>\
	<div id="ASC_list" class="content" style="display:none;"></div>\
		<!--/AUTO SCHEDULER:-->\
  <h3 class="header">\
  	<input type="checkbox" title="Enable Auto Builder" id="ABEnabledCheckbox" style="float:left; margin: 6px 6px 6px 10px;" '+(this.enabled?'checked="checked"':'')+' />\
    <a style="background: none repeat scroll 0% 0% red;">\
      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABhSURBVCjPY/jPgB8y0FHBkb37/+/6v+X/+v8r/y/ei0XB3v+H4HDWfywKtgAl1oLhof8TsClYA5SAgEP/27EpWIxkQj02BbOQ3FCGTcGEdV3/W4B6K/+X/M9fNzAhSbYCAMiTH3pTNa+FAAAAAElFTkSuQmCC" id="AB_Expand" title="Expand or collapse List" style="cursor: pointer; float: right; padding: 5px 5px 0pt 0pt;" />\
    </a>\
    <a class="AB__header" id="AB_optionsLink" style="cursor:pointer">Auto Builder \
    </a>\
  </h3>\
  <div id="IkaAutoBuildQueue" class="content" style="text-align: left; display: block;">\
    '+(!this.occupied?'<p style="margin-left: 7px;">\
      <strong style="color:SaddleBrown">\
	  	<input type="checkbox" title="Enable Auto Builder for this city" id="ABCityEnabledCheckbox" style="" '+(AB.Data.cities[(AB.pageCityId||AB.cityId)].enabled?'checked="checked"':'')+' /> \
        '+AB.Cities[AB.pageCityId||AB.cityId].city_name+' Queue\
      </strong>\
		<a id="ABClearAll" style="text-align: right; float:right; cursor: pointer; font-size: 0.8em; margin-right:-4px;">\
		  [Clear All]\
		</a>':'')+'\
    </p>\
	\
	<span id="gm_queueContainer"></span>\
	\
    <div style="height: 0.5em; width: 100%; float: left;">\
      &nbsp;\
    </div>\
    <p style="margin-top: 1.5em; text-align: center; font-size: 0.8em;">\
	  <img id="AB_FarmlistIcon" style="float: left; vertical-align: middle; margin:0pt 0pt 3px; height: 24px; opacity:.8; cursor:pointer" onmouseover="this.style.opacity=null;" onmouseout="this.style.opacity=\'.8\'" src="'+(typeof FL !== "undefined"?FL.images.farm:'')+'" title="Show Farm List">\
	  <input type="checkbox" title="enables automatic provision of cities if checked" id="AB_autosupplyC" name="AB_autosupplyC" '+(AB.enableAutoSupply?'checked="checked"':"")+' />\
          <label for="AB_autosupplyC">Auto Supplier</label> \
      <a id="AB_showAllCities" style="cursor: pointer; padding-left: 0.5em;">\
        Show all cities\
      </a>\
	</p>\
  </div>\
  <div class="footer" style="display: block;">\
  </div>\
</div>';
		GM_addStyle('div.autoUpgradeBuilding { font-size:.8em; width:205px; float:left; padding:0 5px 0 7px !important; min-height:2.3em; line-height:2.3em; text-align:left !important; }'+
					'div.autoUpgradeBuildingEven { background-color:#faf2d1; }'+
					'img.autoBuildDelete { float:right; height:13px; cursor:pointer; margin:0 1px 0 2px; position:relative; top:5px; }\
					img.autoBuildDelete:hover { }\
					img.autoBuildResourceIcon { height:9px; position:relative; top:-1px; margin-right:2px !important; display:inline !important; }\
					img.autoBuildHidden { visibility:hidden; }\
					.AB__header{text-shadow: 1px 1px gray; color: Azure; font:bold italic 12px Arial,Helvetica,sans-serif;}');
		this.queueContainer = $("gm_queueContainer");
		this.queueContainerListElements = [];
		
		if(!this.occupied) $("ABClearAll").addEventListener("click", function(e){try{clearList(e)}catch(e){AB.error(e)}}, false);
		if(!this.occupied) $("ABCityEnabledCheckbox").addEventListener("click", function(e){try{enableInCityCheckbox(e)}catch(e){AB.error(e)}}, false);
		$("ABEnabledCheckbox").addEventListener("click", function(e){try{enableCheckbox(e)}catch(e){AB.error(e)}}, false);
		$("AB_showAllCities").addEventListener("click", function(e){try{showAllCities(e)}catch(e){AB.error(e)}}, false);
		$("AB_autosupplyC").addEventListener("click", function(e){try{autoSupplyCheck(e)}catch(e){AB.error(e)}}, false);
		$("AB_Expand").addEventListener("click", function(e){try{expand(e)}catch(e){AB.error(e)}}, false);
		$("AB_optionsLink").addEventListener("click", function(e){try{ AB.showOptionsBox();}catch(e){AB.error(e)}}, false);
	
		$("DEF_enabledCB").addEventListener("click", function(e){try{DEFenableCheckbox(e)}catch(e){AB.error(e)}}, false);
		$("DEF_ConfigLink").addEventListener("click", function(e){try{DEFshowConfig(e)}catch(e){AB.error(e)}}, false);
		
		$("ASC_enabledCB").addEventListener("click", function(e){try{ASCenableCheckbox(e)}catch(e){AB.error(e)}}, false);
		$("ASC_headerLink").addEventListener("click", function(e){try{if(typeof ASC !== "undefined") ASC.displayList();}catch(e){AB.error(e)}}, false);
		$("ASC_numTasksInfo").addEventListener("click", function(e){try{if(typeof ASC !== "undefined") ASC.displayTaskDiv();}catch(e){AB.error(e)}}, false);
		
		$("AB_FarmlistIcon").addEventListener("click", function(e){try{if(typeof FL !== "undefined") FL.displayFarmlist();}catch(e){AB.error(e)}}, false);
		
		$("EQU_enabledCB").addEventListener("click", function(e){try{AB.Data.Equalizer.enabled=Number(e.currentTarget.checked); AB.saveData();}catch(e){AB.error(e)}}, false);
		$("EQU_ResWoodCB").addEventListener("click", function(e){try{AB.Data.Equalizer.res.wood=Number(e.currentTarget.checked); AB.saveData();}catch(e){AB.error(e)}}, false);
		$("EQU_ResMarbleCB").addEventListener("click", function(e){try{AB.Data.Equalizer.res.marble=Number(e.currentTarget.checked); AB.saveData();}catch(e){AB.error(e)}}, false);
		$("EQU_ResGlassCB").addEventListener("click", function(e){try{AB.Data.Equalizer.res.glass=Number(e.currentTarget.checked); AB.saveData();}catch(e){AB.error(e)}}, false);
		$("EQU_ResWineCB").addEventListener("click", function(e){try{AB.Data.Equalizer.res.wine=Number(e.currentTarget.checked); AB.saveData();}catch(e){AB.error(e)}}, false);
		$("EQU_ResSulfurCB").addEventListener("click", function(e){try{AB.Data.Equalizer.res.sulfur=Number(e.currentTarget.checked); AB.saveData();}catch(e){AB.error(e)}}, false);
		
		this.updateQueue(AB.pageCityId||AB.cityId);
		GM_addStyle(".AS_inp:focus  {border-color:LightCoral; color:black;} .AS_inp  { color:gray; border:1px solid Silver}");
		
		function clearList(e){	// remove all
			AB.Data.cities[AB.cityId].queue.splice(0);
			AB.saveData();
			AB.updateQueue();
			if(AB.taskOverviewObj) AB.updateQueue(AB.cityId, AB.overviewQueueContainers[AB.cityId]);
			AB.checkQueue();
		}
		function enableCheckbox(e){	
			session.set('ABenabled', AB.Data.ABenabled = AB.enabled = Number(AB.enabled = e.currentTarget.checked));
			AB.saveData();
			if(!AB.enabled) {
				AB.setStatusTxt("","");
				clearTimeout(AB.timeoutH);
				clearInterval(AB.tickerIntervalH);
			}
			else{
				AB.checkQueue();
			}
		}
		function enableInCityCheckbox(e){
			AB.Data.cities[(AB.pageCityId||AB.cityId)].enabled = Number(e.currentTarget.checked);
			if(AB.taskOverviewObj) $("AB_enableCityCheckbox_"+(AB.pageCityId||AB.cityId)).checked = e.currentTarget.checked;
			AB.saveData();
			if(AB.Data.cities[(AB.pageCityId||AB.cityId)].queue.length) AB.checkQueue();
		}
		function DEFenableCheckbox(e){
			if(typeof DEFENDER == "undefined") return;
			DEFENDER.data.enabled = DEFENDER.enabled = Number(e.currentTarget.checked);
			DEFENDER.saveData();
		}
		function DEFshowConfig(e){	
			if(typeof DEFENDER == "undefined") return;
			DEFENDER.displayConfig();
		}
		function ASCenableCheckbox(e){
			AB.Data.ASC.enabled = Number(e.currentTarget.checked);
			if(typeof ASC == "undefined") ASC.enabled = AB.Data.ASC.enabled;
			AB.saveData();
		}
		function showAllCities(e){	
			AB.showTaskOverview();
		}
		function autoSupplyCheck(e){
			AB.Supplier.ready = AB.Data.ASenabled = AB.enableAutoSupply = Number(e.currentTarget.checked);
			AB.saveData();
			if(AB.enableAutoSupply) AB.checkQueue();
		}
		function expand(e){
			var expanded = AB.queueContainer.getAttribute("expanded");
			expanded = expanded==null? 0: Number(!Number(expanded));
			AB.queueContainer.setAttribute("expanded", expanded);
			AB.updateQueue();
		}
		// draging:
		(function() {
			var box = $('IkaAutoBuildQueue').parentNode;
			var h3 = box.getElementsByTagName("h3")[0];
			var b = document.body;
			var X, Y;
			h3.addEventListener("mousedown", mousedownF, false);
			
			function mousedownF(e){
				b.addEventListener("mousemove", mousemoveF, false);
				b.addEventListener("mouseup", mouseupF, false);
				X = e.screenX-(Number(box.offsetLeft));
				Y = e.screenY-(Number(box.offsetTop));
				box.style.position = "absolute";
				box.style.zIndex = 9999999999999;
				box.style.left = e.screenX-X+'px';
				box.style.top = e.screenY-Y+'px'
				box.style.margin = 0;
				if (e.preventDefault) e.preventDefault();
				return false;
			}
			
			function mouseupF(e){
				b.removeEventListener("mousemove", mousemoveF, false);
				b.removeEventListener("mouseup", mouseupF, false);
			}
			
			function mousemoveF(e){
				box.style.left = e.screenX-X+'px';
				box.style.top = e.screenY-Y+'px';
				return false;
			}
		})();
		
		// other objects:
		
	},
	
	updateQueue: function(cid, container){
		cid = cid||this.pageCityId||this.cityId;
		container = container||this.queueContainer;
		
		container.innerHTML = null;	
		if(!this.Data.cities[cid]) return;
		if(!this.Data.cities[cid].queue.length){
			Add('<span style="display:block; font-size:0.8em; text-align:center; color:#CB9B6A;">(no tasks)</span>', container);
			return;
		}
		else if(container.getAttribute("expanded") && !Number(container.getAttribute("expanded"))) {
			container.innerHTML = '<span style="display:block; font-size:0.8em; text-align:center; color:#CB9B6A;">[collapsed]</span>';
			return;
		}
		var html, lvl, building, city = this.Cities[cid], listlength = this.Data.cities[cid].queue.length;
		
		for (var i in this.Data.cities[cid].queue){
			building = this.Data.cities[cid].queue[i];
			if(typeof building == "undefined"){	// correct invalid elements, if there are any
				this.Data.cities[cid].queue.splice(i,1);
				continue;
			}
			lvl = this.getBuildingLevel(cid, this.Data.cities[cid].queue[i].type, this.Data.cities[cid].queue[i].pos);
			html =
		'<div style="margin: 0pt;" class="autoUpgradeBuilding '+(i%2?'':"autoUpgradeBuildingEven")+'" i="'+i+'">\
		  <img title="Remove task from queue" class="autoBuildDelete" onmouseover="if(!window.AS_tr_src2) window.AS_tr_src2 = this.src; this.src=\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAD9SURBVBgZBcFLLkNRAADQc1/fU6qkhFRMMNIQn8TUQCJWYBE2YBkWYQWMJIZmNuAXCSoGFUGIInJf33VOSAAAAIAcgLOFt3079flaEdTS50M6nT7YeggJwPFle6nhAoVhc370rnaXcwBSp62GTdxoGdPrkAPQD5OSbRFr6oLvjByA53CqY9YUvjy68YQcgELTuTd/khENbQk5ANGqFUSFnq6WW2QA5Op4VuhreJVEZACUAKiJkogMgIEKANFARAZAKQKolColMgA+f7vVkBkRSeYjvf6QAfB1cnnXNWTUhHHrXuLoESEBYO/aYjNUSqX3snk/2DjshwQAAAD4B9GUWR0G4scKAAAAAElFTkSuQmCC\';" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAGBQTFRF3NzcpaWl8fHx09PTtbW1sbGx9fX1nZ2dyMjIwsLCu7u71NTU%2Bvr6ysrK6urqrq6u0NDQzs7OxsbGqampv7%2B%2F7%2B%2Fv4uLiuLi44%2BPj1tbW7e3ttra2%2Bfn55eXl7Ozs%2F%2F%2F%2FAZZ4uAAAACB0Uk5T%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwBcXBvtAAAAjklEQVR42lzPyQ6DMAwEUGchmIQsFBJ28%2F9%2FiRQ5VdU5%2BPA0czA8f4F6x%2BKUcrsqI8MOBdGnAo5hCoREjsLEgMbI45DGIMPqi7wuWbxmsGnRXdQWG6xEFAi86lpDEtC9LSq2RoXbfuHMFdY0M2iqE50EQ4RM4d7OT88wIOScg7IDw9OJeRaij%2B25n7wCDADaORZQdo09DQAAAABJRU5ErkJggg%3D%3D" onmouseout="this.src = window.AS_tr_src2" i="'+i+'" />\
\
		  <table cellspacing="0" cellpadding="0" border="0" style="width: auto; margin: 0pt;">\
			<tbody>\
			  <tr>\
				<td valign="top" style="vertical-align: top; padding: 0pt 0.5em 0pt 0pt;">\
				  <a style="color: rgb(0, 102, 0);" title="'+city.city_coord+'&nbsp;'+city.city_name+' - '+this.getBuildingName(building.type)+' '+(lvl+1)+'" name="'+i+'" href="'+this.baseURL+"?view="+(lvl?building.type:"buildingGround")+"&id="+cid+"&position="+building.pos+'">\
					'+this.getBuildingName(building.type)+(i==0?" &#8702; <b>"+(lvl+1)+"</b>":'')+'\
				  </a>\
				<span style="vertical-align: top; font-size: 0.9em; padding: 0 0.5em 0 0.5em; color:red; white-space:nowrap;">\
				'+(i==0?missingResourcesHTML():'')+'</span>\
				</td>\
			  </tr>\
			</tbody>\
		  </table>\
		</div>';
				
				ADD(html, container);
				
		}
		// delete button, drag&drop
		Xp("div/img[1]", 1, container).forEach(function(e){
				e.addEventListener("click", function(e){try{remove(e)}catch(e){AB.error(e)}}, false);
				e.parentNode.addEventListener("mouseover", function(e){try{dragIn(e)}catch(e){AB.error(e)}}, false); 
				e.parentNode.addEventListener("mouseout", function(e){try{dragOut(e)}catch(e){AB.error(e)}}, false);
				e.parentNode.addEventListener("mousedown", function(e){try{startDrag(e)}catch(e){AB.error(e)}}, false);
			});
		
		function remove(e){
			AB.renewSavedData();
			var i = parseInt(e.currentTarget.getAttribute("i"), 10);
			AB.Data.cities[cid].queue.splice(i,1);
			AB.saveData();
			AB.updateQueue(cid, container);
			if(cid == AB.cityId && container != AB.queueContainer) AB.updateQueue(); 
			if(container == AB.queueContainer && AB.taskOverviewObj) AB.updateQueue(cid, AB.overviewQueueContainers[cid]);
			if(i==0) AB.checkQueue();
		}
		function startDrag(e){
			e.preventDefault();
			var i = parseInt(e.currentTarget.getAttribute("i"), 10);
			AB.queueDragStarted = true;
			AB.queueDragSource = i;
			AB.queueDragSourceObj = e.currentTarget;
			window.addEventListener("mouseup", dragTo, false);
		}
		function dragIn(e){
			if(AB.queueDragStarted === undefined){
				e.currentTarget.style.backgroundColor = "#fff";
				return false;
			}
			var e = e.currentTarget, i = parseInt(e.getAttribute("i"), 10);
			if(i === AB.queueDragSource) return false;
			if(i < AB.queueDragSource) e.style.borderTop = "2px solid black";
			else e.style.borderBottom = "2px solid black";
			AB.queueDragTarget = i;
		}
		function dragOut(e){
			if(AB.queueDragStarted === undefined){
				e.currentTarget.style.backgroundColor = null;
				return false;
			}
			var e = e.currentTarget;
			e.style.borderBottom = e.style.borderTop = null;
			delete AB.queueDragTarget;
		}
		function dragTo(e){
			try{
				delete AB.queueDragStarted;
				window.removeEventListener("mouseup", dragTo, false);
				if(AB.queueDragTarget === undefined){
					AB.queueDragSourceObj.backgroundColor = null;
					delete AB.queueDragSource;
					delete AB.queueDragSourceObj;
					return false;
				}
				var start = Min(AB.queueDragSource, AB.queueDragTarget), end = Max(AB.queueDragSource, AB.queueDragTarget);
				if(AB.queueDragSource > AB.queueDragTarget){
					var t = AB.Data.cities[cid].queue[end];
					while(end > start) AB.Data.cities[cid].queue[end] = AB.Data.cities[cid].queue[--end];
					AB.Data.cities[cid].queue[start] = t;
				}
				else{
					var t = AB.Data.cities[cid].queue[start];
					while(start < end) AB.Data.cities[cid].queue[start] = AB.Data.cities[cid].queue[++start];
					AB.Data.cities[cid].queue[end] = t;
				}
				AB.saveData();
				AB.updateQueue(cid, container);
				if(cid == AB.cityId && container != AB.queueContainer) AB.updateQueue();	// Box ist in popup -> auch auf Seite aktualisieren
				if(container == AB.queueContainer && AB.taskOverviewObj) AB.updateQueue(cid, AB.overviewQueueContainers[cid]); // Box ist auf seite und popup existiert -> popup-box auch aktualisieren
				if(AB.queueDragSource === 0 || AB.queueDragTarget === 0) AB.checkQueue();
				delete AB.queueDragSource;
				delete AB.queueDragSourceObj;
				delete AB.queueDragTarget
			}
			catch(e){AB.error(e)}
		}
		function missingResourcesHTML(){
			var html = ""; 
			for(var res in Buildings[building.type]){
				if(Buildings[building.type][res]===0)continue;
				if(AB.updatedCityResources[cid][res]-Buildings[building.type][res][lvl] < 0){
				html += '<span style="margin-right:.7em;">'+AB.getResourceImg(res)+
						AB.shortenResStr(Math.abs(AB.updatedCityResources[cid][res]-Buildings[building.type][res][lvl])) + '</span>';
				}
			}
			return html;
		}
		
	},
	
	showTaskOverview: function(){
		//AB.log("showTaskOverview");
		if(!this.taskOverviewObj){
			this.taskOverviewObj = Add('<div style="padding:0px; margin:0px; position:fixed; -moz-border-radius:4px 4px 0 0; z-index:2147483645; background-color:wheat; opacity:0.95; visibility:visible">\
				<div id="AB_TaskOverview_TitleBar" style="height:17px; -moz-border-radius:4px 4px 0 0; padding:3px 5px;"><span style="float:left; font-size:.8em"><b>Task Overview</b></span><a style="float:right" href="javascript:;" id="ABOverviewClose"><b>[x]</b></a></div>\
				 <div id="container" style="width:auto; margin:0px; overflow-x: hidden; overflow-y: scroll; max-height:600px;">\
				  <div id="AB_TaskOverviewContent" style="height:100%;"></div>\
				 </div><div id="AB_TaskOverviewNbar" style="width: 100%; cursor: n-resize; height: 3px; background-color: #DCAB5F;"></div>\
				</div></div>').firstChild;
			this.taskOverviewObj.c = $("AB_TaskOverviewContent");
			$("AB_TaskOverview_TitleBar").style.background = 'url("skin/input/button.gif") repeat-x scroll 0 bottom #F8E7B3';
			this.drawTaskOverviewTable();
			GM_addStyle('#AB_TaskOverviewContent .dynamic{ margin:0px;}');
			
			// mittig positionieren
			if(!session.get('overviewY'))
				session.set('overviewY', Math.round((window.innerHeight - this.taskOverviewObj.offsetHeight)/2)+"px");
			this.taskOverviewObj.style.top =session.get('overviewY');
			if(!session.get('overviewX'))
				session.set('overviewX', Math.round((window.innerWidth - this.taskOverviewObj.offsetWidth)/2)+"px");
			this.taskOverviewObj.style.left = session.get('overviewX');
			session.set('overviewBoxOpen', 1);
			
			$("ABOverviewClose").addEventListener("click", function close(e){e.currentTarget.parentNode.parentNode.style.visibility="hidden"; session.set('overviewBoxOpen', 0);}, false);
			(function() {
				var box = $("AB_TaskOverviewNbar");
				var b = document.body;
				var Y, H;
				box.addEventListener("mousedown", mousedownF, false);
				box = box.previousSibling;
				// session data
				if((AB.ts-Number(session.get('ABLastTs')))/60000 > 10) {session.remove('overviewHeight'); session.remove('overviewScroll');}
				if(session.get('overviewHeight')) box.style.height = session.get('overviewHeight');
				if(session.get('overviewScroll')) box.scrollTop = parseInt(session.get('overviewScroll'), 10);
				window.addEventListener("unload", function(){session.set('overviewHeight', box.style.height); session.set('overviewScroll', box.scrollTop);}, false);
				
				function mousedownF(e){
					b.addEventListener("mousemove", mousemoveF, false);
					b.addEventListener("mouseup", mouseupF, false);
					Y = e.screenY;
					H = box.offsetHeight;
					if (e.preventDefault) e.preventDefault();
					return false;
				}
				function mouseupF(e){
					if( e.screenY == Y) box.style.height = null;
					b.removeEventListener("mousemove", mousemoveF, false);
					b.removeEventListener("mouseup", mouseupF, false);
				}
				function mousemoveF(e){
					box.style.height = (H + e.screenY-Y)+'px';
					return false;
				}
			})();
			(function() {
				var box = $("AB_TaskOverview_TitleBar");
				var b = document.body;
				var X, Y;
				box.addEventListener("mousedown", mousedownF, false);
				box = box.parentNode;
				
				function mousedownF(e){
					b.addEventListener("mousemove", mousemoveF, false);
					b.addEventListener("mouseup", mouseupF, false);
					X = e.screenX-(Number(box.offsetLeft));
					Y = e.screenY-(Number(box.offsetTop));
					box.style.left = e.screenX-X+'px';
					box.style.top = e.screenY-Y+'px';
					box.style.bottom = null;
					box.style.right = null;
					if (e.preventDefault) e.preventDefault();
					return false;
				}
				function mouseupF(e){
					b.removeEventListener("mousemove", mousemoveF, false);
					b.removeEventListener("mouseup", mouseupF, false);
					// save Position
					session.set('overviewX', box.style.left);
					session.set('overviewY', box.style.top);
				}
				function mousemoveF(e){
					box.style.left = e.screenX-X+'px';
					box.style.top = e.screenY-Y+'px';
					return false;
				}
			})();
		} 
		else{
			session.set('overviewBoxOpen', Number(!(this.taskOverviewObj.style.visibility=="visible")));
			this.taskOverviewObj.style.visibility = this.taskOverviewObj.style.visibility=="visible" ?"hidden":"visible";
			
		}
		
	},
	
	drawTaskOverviewTable: function(){
		AB.log("draw TaskOverviewTable");
		var cols = 3;
		var w,p, city, cid, CID, i=0, cityBoxes = [];
		var html = '<table width="" border="1" style="margin:0 0 2px; border-color:gray"><tr>';
		for(cid in this.Cities){
			AB.log("Citiy:"+cid);
			city = this.Cities[cid];
			w = this.Data.cities[cid].supply.w; // wood
			p = this.Data.cities[cid].supply.p; // prodgood
			if(i!=0 && !(i%cols)) html += '</tr><tr>';
			html += '<td style="vertical-align:top;">\
				<div class="dynamic" style="margin:0px;'+(cid == this.cityId?'border:1px dashed brown;':'')+'">\
				  <h3 class="header">\
					<a style="background: none repeat scroll 0% 0% red;">\
					  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABhSURBVCjPY/jPgB8y0FHBkb37/+/6v+X/+v8r/y/ei0XB3v+H4HDWfywKtgAl1oLhof8TsClYA5SAgEP/27EpWIxkQj02BbOQ3FCGTcGEdV3/W4B6K/+X/M9fNzAhSbYCAMiTH3pTNa+FAAAAAElFTkSuQmCC" t="expand" cid="'+cid+'" title="Expand or collapse List" style="cursor: pointer; float: right; padding: 5px 5px 0pt 0pt;" />\
					</a>\
					\
					<span style="padding-left: 0pt; position: relative;">\
					  ' + AB.getResourceImg(city.prodgood) + '\
					  <a '+(cid==this.cityId? 'style="text-shadow: 1px 1px gray; color: FloralWhite;" ':'style="text-shadow:-1px -1px #C6C9D1;"')+'href="?cityId='+cid+'" onclick="var s = document.getElementById(\'citySelect\'); for each(var x in s.options){ if(x.value==\''+cid+'\'){s.selectedIndex = x.index; s.form.submit(); break;}} return false;">\
					  '+city.city_name+'&nbsp;'+city.city_coord+'</a>\
					</span>\
				  </h3>\
				  <div class="content" style="text-align: left; display: block; text-transform:capitalize;">'+
				  // Auto Supplier - Safe resources input boxes
				  '<nobr style="font-size:0.8em;" title="Safe Amount - these resources will not be used by Auto Supplier">\
				   <input style="margin:0px 3px;" type="checkbox" title="enables automatic provision for this city if checked" t="autosupply" id="AB_autosupplyC_'+cid+'" '+(this.Data.cities[cid].supply.self?'checked="checked"':"")+' /><label for="AB_autosupplyC_'+cid+'">Supply</label>\
					<span style="margin:0px 0px 0px 6px; display:inline-block; text-align:center;"><img title="wood" src="/skin/resources/icon_wood.gif" class="autoBuildResourceIcon" align="absmiddle"/> <input style="width:40px; height:13; font-size:x-small; padding:0px;" type="text" onkeypress="event.keyCode==0xd && this.blur()" onfocus="this.select()" class="AS_inp" res="w"  cid="'+cid+'" value="'+w+'"/>\
					<img title="'+city.prodgood+'" src="/skin/resources/icon_'+city.prodgood+'.gif" class="autoBuildResourceIcon" align="absmiddle"/> <input style="width:40px; height:13; font-size:x-small; padding:0px;" type="text" onkeypress="event.keyCode==0xd && this.blur()" onfocus="this.select()" class="AS_inp" res="p" t="safe" cid="'+cid+'" value="'+p+'" /></span></nobr>'+
					// Auto Supplier - Min Resources input boxes
					'<br /><div style="margin:0px 3px;" title="Minimum amount of resources. Auto Supplier will try to keep the city\'s resources above the minimum."><b>Min: </b>'+		
					' <span style="white-space:nowrap; margin:0px 3px;">'+AB.getResourceImg("wood")+'<span t="min" res="wood"  cid="'+cid+'"  style="max-width:10px;">'+this.Data.cities[cid].supply.minRes.wood+'</span></span>'+
					' <span style="white-space:nowrap; margin:0px 3px;">'+AB.getResourceImg("wine")+'<span t="min" res="wine"  cid="'+cid+'"  style="max-width:10px;">'+this.Data.cities[cid].supply.minRes.wine+'</span></span>'+
					' <span style="white-space:nowrap; margin:0px 3px;">'+AB.getResourceImg("marble")+'<span t="min" res="marble"  cid="'+cid+'"  style="max-width:10px;">'+this.Data.cities[cid].supply.minRes.marble+'</span></span>'+
					' <span style="white-space:nowrap; margin:0px 3px;">'+AB.getResourceImg("glass")+'<span t="min" res="glass"  cid="'+cid+'"  style="max-width:10px;">'+this.Data.cities[cid].supply.minRes.glass+'</span></span>'+
					' <span style="white-space:nowrap; margin:0px 3px;">'+AB.getResourceImg("sulfur")+'<span t="min" res="sulfur"  cid="'+cid+'"  style="max-width:10px;">'+this.Data.cities[cid].supply.minRes.sulfur+'</span></span>'+
					'</div>'+
					'<p style="margin-left: 7px;">\
					  <strong>\
						<input type="checkbox" title="Enable Auto Builder for this city" t="enableCity" id="AB_enableCityCheckbox_'+cid+'" style="" '+(AB.Data.cities[cid].enabled?'checked="checked"':'')+' /> Queue\
					  </strong>\
						<a t="clearAll"  cid="'+cid+'" style="padding-bottom: 0.5em; cursor: pointer; font-size: 0.8em; float:right; margin-right:-4px;">\
					  [clear all]\
						</a>\
					</p>\
					\
					<span t="container" cid="'+cid+'"></span>\
					\
					<div style="height: 0.5em; width: 100%; float: left;">\
					  &nbsp;\
					</div>\
				  </div>\
				  <div class="footer" style="display: block;">\
				  </div>\
				</div></td>';
				++i;
		}
		html += '</tr></table>';
		Add(html ,this.taskOverviewObj.c);
		
		// city queues + box events
		//(x=XP(".//input[@t='enableCity']", 1, this.taskOverviewObj.c)) && x.forEach(function(e){e.addEventListener("click", function(e){try{clearList(e)}catch(e){AB.error(e)}}, false)});
		Xp(".//a[@t='clearAll']", 1, this.taskOverviewObj.c).forEach(function(e){e.addEventListener("click", function(e){try{clearList(e)}catch(e){AB.error(e)}}, false)});
		Xp(".//img[@t='expand']", 1, this.taskOverviewObj.c).forEach(function(e){e.addEventListener("click", function(e){try{expand(e)}catch(e){AB.error(e)}}, false)});
		Xp(".//input[@t='autosupply']", 1, this.taskOverviewObj.c).forEach(function(e){e.addEventListener("click", function(e){try{AS_checkBox(e)}catch(e){AB.error(e)}}, false)});
		Xp(".//input[@t='enableCity']", 1, this.taskOverviewObj.c).forEach(function(e){e.addEventListener("click", function(e){try{enableInCityCheckbox(e)}catch(e){AB.error(e)}}, false)});
		Xp(".//input[@t='safe']", 1, this.taskOverviewObj.c).forEach(function(e){e.addEventListener("click", function(e){try{safeResInput(e)}catch(e){AB.error(e)}}, false)});
		Xp(".//span[@t='min']", 1, this.taskOverviewObj.c).forEach(function(e){e.addEventListener("click", function(e){try{minResClick(e)}catch(e){AB.error(e)}}, false)});
		// queue containers
		AB.overviewQueueContainers = {};
		Xp(".//span[@t='container']", 1, this.taskOverviewObj.c).forEach(function(e){
				var cid = e.getAttribute("cid");
				AB.overviewQueueContainers[cid] = e;
				AB.updateQueue(cid, e);
			});
			
		
		function minResClick(e){ // INPUT
				var e = e.currentTarget, res = e.getAttribute("res"), cid = e.getAttribute("cid");
				e.innerHTML = '<input style="width:40px; height:13; font-size:x-small; padding:0px;" type="text" value="'+AB.Data.cities[cid].supply.minRes[res]+'" onkeypress="event.keyCode==0xd && this.blur()" class="AS_inp" value="'+w+'"/>';
				e.firstChild.addEventListener("blur", function(e){try{minResSet(e, res, cid)}catch(e){AB.error(e)}}, false);
				e.firstChild.focus(); e.firstChild.select(); 
			}
		function minResSet(e, res, cid){
				var e = e.currentTarget, val = parseInt(trim(e.value), 10);
				if(!isNaN(val) && val != AB.Data.cities[cid].supply.minRes[res] && val >= 0){
					AB.Data.cities[cid].supply.minRes[res] = val
					AB.saveData();
				}
				else if(val != AB.Data.cities[cid].supply.minRes[res]) AB.denyValueSet(e);
				val = AB.Data.cities[cid].supply.minRes[res];
				e.parentNode.textContent = val;
			}
		function clearList(e){	// remove all
				var cid = e.currentTarget.getAttribute("cid");
				AB.Data.cities[cid].queue.splice(0);
				AB.saveData();
				AB.updateQueue(cid, AB.overviewQueueContainers[cid]);
				if(cid == AB.cityId) AB.updateQueue();
				AB.checkQueue();
			}
		function AS_checkBox(e){
				var cid = parseInt(e.currentTarget.id.slice(e.currentTarget.id.lastOf("_")+1), 10);
				AB.Data.cities[cid].supply.self = Number(e.currentTarget.checked);
				AB.saveData();
			}
		function enableInCityCheckbox(e){
				var cid = parseInt(e.currentTarget.id.slice(e.currentTarget.id.lastOf("_")+1), 10);
				AB.Data.cities[cid].enabled = Number(e.currentTarget.checked);
				if(cid == (AB.pageCityId||AB.cityId)) $("ABCityEnabledCheckbox").checked = e.currentTarget.checked;
				AB.saveData();
				if(AB.Data.cities[cid].queue.length && AB.enabled) AB.checkQueue();
			}
		function safeResInput(e){
				var val, i, e = e.currentTarget, cid = e.getAttribute("cid"),  res = e.getAttribute("res");
				val = parseInt(trim(e.value), 10);
				if(!isNaN(val) && val != AB.Data.cities[cid].supply[res] && val >= 0){
					AB.Data.cities[cid].supply[res] = val;
					AB.saveData();
				}
				else if(val != AB.Data.cities[cid].supply[res]) AB.denyValueSet(e);
				e.value = AB.Data.cities[cid].supply[res];
			}
		function expand(e){
			var e = e.currentTarget, cid = e.getAttribute("cid");
			var container = AB.overviewQueueContainers[cid];
			var expanded = container.getAttribute("expanded");
			expanded = expanded==null? 0: Number(!Number(expanded));
			container.setAttribute("expanded", expanded);
			AB.updateQueue(cid, container);
		}
	},
	
	showOptionsBox: function(){
		if(!this.optionsBoxObj){
			this.optionsBoxObj = Add('<div id="AB_OptionsBox" style="padding:0px; margin:0px; position:fixed; background-color:Cornsilk; border:1px solid DodgerBlue; -moz-border-radius:4px 4px 4px 4px; z-index:2147483646; background-color:white; color:Gray; text-align:left; visibility:visible">\
				<h3 style="text-align:center;"><b>Ikariam Advanced - Options</b></h3>\
				 <div style="padding:10px;">\
				  <h4>Universal:</h4>\
				  <input type="checkbox" id="gm_AB_enableHotkeys" '+(AB.Data.enableHotkeys?'checked="checked"':"")+' />\
          			<label for="gm_AB_enableHotkeys">enable Hotkeys</label><br />\
				  <h4>Auto Supplier:</h4>\
				  resTolerance:\
				  <input style="width:40px; height:13; font-size:x-small; padding:0px;" type="text" onkeypress="event.keyCode==0xd && this.blur()" onfocus="this.select()" class="AS_inp" id="gm_ABSupplier_resTolerance" value="'+AB.Data.Supplier.resTolerance+'" /> <small>(should be a multiple of '+AB.Supplier.RCS+')</small>\
				  <h4>Notifier:</h4>\
				  <span title="in min">Min Interval:  <input style="width:40px; height:13; font-size:x-small; padding:0px;" type="text" onkeypress="event.keyCode==0xd && this.blur()" onfocus="this.select()" class="AS_inp" id="gm_ABNotifier_minInterval" value="'+AB.Data.Notifier.minInterval+'" />\
				  <span style="width:30px; display:inline-block;">&nbsp;</span>\
				  Max Interval: \
				  <input style="width:40px; height:13; font-size:x-small; padding:0px;" type="text" onkeypress="event.keyCode==0xd && this.blur()" onfocus="this.select()" class="AS_inp" id="gm_ABNotifier_maxInterval" value="'+AB.Data.Notifier.maxInterval+'" /></span>\
				  <br />\
				  <input type="checkbox" id="gm_ABNotifier_checkForAttacks" '+(AB.Data.Notifier.checkForAttacks?'checked="checked"':"")+' />\
          			<label for="gm_ABNotifier_checkForAttacks" title="Defender will not be able to see incoming attacks if unchecked!">Check For Attacks</label><br />\
				  <input type="checkbox" id="gm_ABNotifier_openPopup" name="gm_alwaysDisplay" '+(AB.Data.Notifier.openPopupIfAttacked?'checked="checked"':"")+' />\
          			<label for="gm_ABNotifier_openPopup">open popup if attacked</label><span style="width:30px; display:inline-block;">&nbsp;</span>\
					popup URL: <input style="width:150px; height:13; font-size:x-small; padding:0px;" type="text" onkeypress="event.keyCode==0xd && this.blur()" onfocus="this.select()" class="AS_inp" id="gm_ABNotifier_popupURI" value="'+(AB.Data.Notifier.popupURI||'')+'" />\
					<br />\
					<h4>Empire Board:</h4>\
					Floating Tables: <input type="checkbox" id="gm_ABEB_buildings" '+(AB.Data.EB.events.buildings?'checked="checked"':"")+' /> <label for="gm_ABEB_buildings">Buildings</label> \
					<input type="checkbox" id="gm_ABEB_res" '+(AB.Data.EB.events.res?'checked="checked"':"")+' /> <label for="gm_ABEB_res">Resources</label> \
					<input type="checkbox" id="gm_ABEB_mil" '+(AB.Data.EB.events.mil?'checked="checked"':"")+' /> <label for="gm_ABEB_mil">Military</label>\
				  <div style="width:100%; text-align:center;"><input onclick="this.parentNode.parentNode.parentNode.style.visibility=\'hidden\'" style="border-color:skyblue;width:70px; margin-top:10px; height:15; font-size:x-small;" onmouseover="this.style.borderColor=\'RoyalBlue\';" onmouseout="this.style.borderColor=\'skyblue\';" type="button" value="OK" /></div>\
				</div></div>').firstChild;
			
			// mittig positionieren
			this.optionsBoxObj.style.top = Math.round((window.innerHeight - this.optionsBoxObj.offsetHeight)/2)+"px"
			this.optionsBoxObj.style.left = Math.round((window.innerWidth - this.optionsBoxObj.offsetWidth)/2)+"px"
			GM_addStyle('#AB_OptionsBox h4{background-color: #EAF7FA; font-weight: bold; margin: 9px 0 5px 0px; padding2px; color:gray; text-shadow:1px 1px white;}');
			GM_addStyle('#AB_OptionsBox span,#AB_OptionsBox div,#AB_OptionsBox input,#AB_OptionsBox h4, {margin: 2px; padding:2px;} ');
			$("gm_AB_enableHotkeys").addEventListener("click", function(e){try{AB.Data.enableHotkeys = Number(this.checked); AB.saveData();}catch(e){AB.error(e)}}, false);
			$("gm_ABNotifier_checkForAttacks").addEventListener("click", function(e){AB.Data.Notifier.checkForAttacks = Number(this.checked); AB.saveData();}, false);
			$("gm_ABNotifier_openPopup").addEventListener("click", function(e){AB.Data.Notifier.openPopupIfAttacked =  Number(this.checked); AB.saveData();}, false);
			$("gm_ABEB_buildings").addEventListener("click", function(e){AB.Data.EB.events.buildings =  Number(this.checked); AB.saveData();}, false);
			$("gm_ABEB_res").addEventListener("click", function(e){AB.Data.EB.events.res =  Number(this.checked); AB.saveData();}, false);
			$("gm_ABEB_mil").addEventListener("click", function(e){AB.Data.EB.events.mil =  Number(this.checked); AB.saveData();}, false);
			$("gm_ABNotifier_minInterval").addEventListener("blur", function(e){try{minInterval(e)}catch(e){AB.error(e)}}, false);
			$("gm_ABNotifier_maxInterval").addEventListener("blur", function(e){try{maxInterval(e)}catch(e){AB.error(e)}}, false);
			$("gm_ABNotifier_popupURI").addEventListener("blur", function(e){try{setPopupURI(e)}catch(e){AB.error(e)}}, false);
			$("gm_ABSupplier_resTolerance").addEventListener("blur", function(e){try{resTolerance(e)}catch(e){AB.error(e)}}, false);
			
			function minInterval(e){
				AB.keyShortcutsEnabled = true;
				var val = parseInt(trim(e.currentTarget.value), 10);
				if(!isNaN(val) && val != AB.Data.Notifier.minInterval && val < AB.Data.Notifier.maxInterval && val > 0){
					NOTIFIER.checkIntervalMin = AB.Data.Notifier.minInterval = val;
					AB.saveData();
				}
				else if(val != AB.Data.Notifier.minInterval) AB.denyValueSet(e.currentTarget);
				e.currentTarget.value = AB.Data.Notifier.minInterval;
			}
			function maxInterval(e){
				AB.keyShortcutsEnabled = true;
				var val = parseInt(trim(e.currentTarget.value), 10);
				if(!isNaN(val) && val != AB.Data.Notifier.maxInterval && val > AB.Data.Notifier.minInterval && val > 0){
					NOTIFIER.checkIntervalMax = AB.Data.Notifier.maxInterval = val;
					AB.saveData();
				}
				else if(val != AB.Data.Notifier.maxInterval) AB.denyValueSet(e.currentTarget);
				e.currentTarget.value = AB.Data.Notifier.maxInterval;
			}
			function setPopupURI(e){
				AB.keyShortcutsEnabled = true;
				var v = trim(e.currentTarget.value);
				if(v.match(/^https?:\/\/[\w-.]+\.[\w]{2,4}/)){
					AB.Data.Notifier.popupURI = v;
					AB.saveData();
				}
				else if(v!="") AB.denyValueSet(e.currentTarget);
				e.currentTarget.value = AB.Data.Notifier.popupURI||"";
			}
			function resTolerance(e){
				AB.keyShortcutsEnabled = true;
				var val = parseInt(trim(e.currentTarget.value), 10);
				if(!isNaN(val) && val != AB.Data.Supplier.resTolerance && val >= AB.Supplier.RCS){
					AB.Supplier.resTolerance = AB.Data.Supplier.resTolerance = val;
					AB.saveData();
				}
				else if(val != AB.Data.Supplier.resTolerance) AB.denyValueSet(e.currentTarget);
				e.currentTarget.value = AB.Data.Supplier.resTolerance;
			}
		} 
		else{
			this.optionsBoxObj.style.visibility = this.optionsBoxObj.style.visibility=="visible" ?"hidden":"visible";
			
		}
		
	},
	
	displayWaitBox: function(task, details){
			if(!this.waitBoxObj){
				this.waitBoxObj = {
				bg: ADD('<div style="display:block; z-index:2147483647; position:fixed; top:0px; left:0px; height:100%; width:100%; background-color:black;-moz-opacity:0.5; opacity:0.5; filter:alpha(opacity=50);"></div>'),
				box: ADD('<div style="display:block; z-index:999999999999; position:fixed; width:100%; height:100%; top:0px; left:0px; text-align:center; background-color:transparent; padding-top:80px;"><div style="border: 1px solid black; display: inline-block; background-color: rgb(255, 255, 255); text-align: center; padding: 50px 200px; margin-top: 200px; opacity: 0.9;"><span></span><span></span></div></div>'),
				};
				this.waitBoxObj.msg = this.waitBoxObj.box.firstChild.firstChild;
				this.waitBoxObj.details = this.waitBoxObj.box.firstChild.lastChild;
				this.changeWaitBoxMsg(task, details);
			}
			else{
				this.changeWaitBoxMsg(task, details)	
			}
	},
	removeWaitBox: function(){
			if(this.waitBoxObj){
				this.waitBoxObj.bg.parentNode.removeChild(this.waitBoxObj.bg); delete this.waitBoxObj.bg;
				this.waitBoxObj.box.parentNode.removeChild(this.waitBoxObj.box); delete this.waitBoxObj.box;
				delete this.waitBoxObj;
			}
	},
	changeWaitBoxMsg: function(task, details){
			if(this.waitBoxObj){
				this.waitBoxObj.msg.innerHTML = '<b>Performing '+task+' Task....</b>';
				if(details) this.waitBoxObj.details.innerHTML = '<br />['+details+']';
			}
	},
 
	AddNiceLinks: function(){
		AB.log("AddNiceLinks ");
		if(this.occupied) return;
		var cid=AB.cityId, a = Xpath("//div[@id='cityNav']//li[@class='viewCity']");
		if(!a) {AB.log("Error: City Link Xpath outdated!"); return;}
		else{
			a.addEventListener('mouseover', displayBuildingsDropdownList, false);
			a.addEventListener('mouseout', function() {if(AB.buildingsDropdownList) AB.buildingsDropdownList.style.display = "none";}, false);
		}
		
		function displayBuildingsDropdownList(){try{ // We create the list only when it's needed
			if(!AB.buildingsDropdownList){
				var a = Xpath("//div[@id='cityNav']//li[@class='viewCity']");
				if(!a) {AB.log("Error: City Link Xpath outdated!"); return;}
				var i, res, building, buildings = AB.Cities[cid].buildings;
				var htm = '<div id="AB_buildingList"style="display: none; background-color:SeaShell; border: 1px solid rgb(157, 131, 106); opacity:.95; text-align: left; padding: 1em 0pt 0.2em 1em; position: absolute; z-index: 1000;">';
				for(i in buildings){
					building = AB.getBuildingName(i);
					htm += '<a style="display: block; margin-bottom: 0.8em; font-size: 0.9em; cursor: pointer; height:auto; background:none; line-height: 1em; padding: 0pt; color:rgb(0, 153, 0); width: 100%; text-decoration: none; padding-right:5px; white-space:nowrap;" onmouseover="this.style.color=null; this.style.textDecoration=\'underline\'" onmouseout="this.style.color=\'rgb(0, 153, 0)\'; this.style.textDecoration=null;"  href="?view='+i+'&id='+AB.cityId+'&position='+buildings[i].position+'">';
					htm += '<img src="/skin/img/city/building_' + (buildings[i].position == 0 ? 'townhall' : i) + '.gif" align="absmiddle" style="margin-right:.5em;  width:24px;"/>'
					htm += building;
					htm += ' ('+buildings[i].level+') <nobr>';
					// resources needed
					var lvl = AB.getBuildingLevel(AB.cityId, i, buildings[i].position);
					AB.correctCostsOf(i, buildings[i].levels[buildings[i].position]+1, AB.cityId);
					for(var j in Buildings[i]){
						if(Buildings[i][j] && Buildings[i][j][lvl])
							res = AB.updatedCityResources[AB.cityId][j] - Buildings[i][j][lvl];
						else continue;
						if(res <= 0)
						htm += '<img src="/skin/resources/icon_' + j + '.gif" style="height:12px; margin-left:5px; vertical-align:middle;"/> <span style="font-size:.8em;'+ 
								(res<0?'color:red':'')+';">'+AB.shortenResStr(res)+'</span> ';
					}
					htm += '</nobr></a>';
				}
				htm += '</div>';
				AB.buildingsDropdownList = ADD(htm, a);
			}
			AB.buildingsDropdownList.style.display = null;
		}catch(e){AB.error(e)}}
		
		if(AB.Cities[cid].buildings.townHall.level == undefined) AB.setStatusTxt("Empire Board Bug: Empire Board has no data for this city - rename the town and go to the city view", "Do it!");
		

		// Res Infos (there are permanent visual elements so we must create the info boxes immediately :[ )
		var LootProtection = AB.getLootProtection(AB.cityId);
		var c, ps, pr, r, p1, p2, e = XP(".//li", 1, $("cityResources"));
		for(var i in e){
			if(!e[i] || !e[i].nodeName) continue; 
			if(e[i].className == "population"){
				e[i].style.cursor = "pointer";
				e[i].setAttribute("onclick", "location.assign('/index.php?view=townHall&id="+AB.cityId+"&position=0')");
				$('cityNav').style.height = "1px";
			}
			else if(e[i].className == "actions") continue;
			else { 
				if(e[i].className == "wood"){
					e[i].style.cursor = "pointer";
					e[i].setAttribute("onclick", "location.assign('/index.php?view=resource&type=resource&id="+AB.Cities[cid].island_id+"')");	
				}
				else{
					e[i].style.cursor = "pointer";
					e[i].setAttribute("onclick", "location.assign('/index.php?view=tradegood&type=tradegood&id="+AB.Cities[cid].island_id+"')");
				}
				
				XP(".//div[@class='tooltip']",0,e[i]).innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
				if(!c){
					c = AB.getResCapacity(AB.cityId);
				}
				r = Number(AB.Cities[cid][e[i].className])
				pr = AB.Cities[cid]["prod"+e[i].className];
				p1 = Math.round(r*100/c);
				p2 = Math.round(LootProtection*100/r); if(p2 > 100) p2 = 100;

				ADD('<div class="tooltip" style="top: 30px; display: none; opacity:.95"><table cellspacing="0" cellpadding="0" border="0"><tbody><tr><td><b>'+e[i].className+'</b></td><td></td></tr><tr><td>Capacity: &nbsp;</td><td>'+addCommas(c)+'('+p1+'%)</td></tr><tr><td>Safe:  &nbsp;</td><td> '+addCommas(LootProtection)+' ('+p2+'%)</td></tr><tr><td '+(r-LootProtection>0?'style="color:red; font-weight: bold;"':'')+'>Lootable:  &nbsp;</td><td '+(r-LootProtection>0?'style="color:red; font-weight: bold;"':'')+'> '+addCommas(r-LootProtection<0?0:r-LootProtection)+' ('+(Math.round(r-LootProtection<0?0:(r-LootProtection)*100/r))+'%)</td></tr><tr><td style="padding-top: 0.75em ! important;">Income: &nbsp;</td><td style="padding-top: 0.75em ! important;">'+pr +'(+'+addCommas(pr*24)+' / day)</td></tr><tr><td>Full:  &nbsp;</td><td>'+(pr?Math.floor(c/pr/24)+'d '+Math.floor((c/pr)%24)+"h":"-")+' </td></tr></tbody></table></div>', e[i]);
				//'
				pr = Math.round(LootProtection*100/c); if(pr > 100) pr = 100;
				ADD('<div class="capacity"><div style="opacity: 0.'+(p1-3)+'; width: '+p1+'%;" class="onhand">&nbsp;</div><div style="width: '+pr+'%;" class="safe">&nbsp;</div></div>',e[i]);
				r = gET("span", null, e[i]);
				//for each(i in r) if(i && i.nodeName) i.parentNode.removeChild(i);
			}
		}
		GM_addStyle('#cityResources ul.resources li .tooltip td { padding:2px !important; width: auto !important; }\
						#cityResources ul.resources li div.capacity { border:1px inset #906646; height:3px; position:relative; top:-6px; left:1px; width:95%; }\
						#cityResources ul.resources li div.onhand { position:absolute; top:0; left:0; height:inherit; background-color:#a00; }\
						#cityResources ul.resources li div.safe { position:absolute; top:0;  height:inherit; background-color:#690; }\
			');
			

	},

	addEBEvents: function(){ 
		if(this.Data.EB.events.res){
			var e1 = XP("//div[@id='cityNav']//li[@class='viewWorldmap']");
			e1 && e1.addEventListener("mouseover", function(x){var el;(el=$("EmpireBoardResources")).setAttribute("style", 'position: absolute; z-index: 1500; opacity:.92; width: 990px; left: '+((innerWidth-990)/2)+'px; top: '+(AB.getPageTop(e1)+e1.offsetHeight)+'px;'); EBevents(e1,el)}, false);
		}
		if(this.Data.EB.events.buildings){
			var e2 = $("advCities");
			e2 && e2.addEventListener("mouseover", function(x){var el;(el=$("EmpireBoardBuildings")).setAttribute("style", 'position: absolute; z-index: 1500; opacity:.92; width: 990px; left: '+((innerWidth-990)/2)+'px; top: '+(AB.getPageTop(e2)+e2.offsetHeight)+'px;'); EBevents(e2,el)}, false);
		}
		if(this.Data.EB.events.mil){
			var e3 = $("advMilitary"); 
			e3 && e3.addEventListener("mouseover", function(x){var el;(el=$("EmpireBoardArmy")).setAttribute("style", 'position: absolute; z-index: 1500; opacity:.92; width: 990px; left: '+((innerWidth-990)/2)+'px; top: '+(AB.getPageTop(e3)+e3.offsetHeight)+'px;'); EBevents(e3,el)}, false);
		}
		
		function EBevents(e1,e2){
			try{
				var left1 = AB.getPageLeft(e1);
				var left2 = AB.getPageLeft(e2);
				var top1 = AB.getPageTop(e1);
				var top2 = AB.getPageTop(e2);
				
				function mousemove(e){
						if(e.pageY >= top1 && e.pageY <= top1+e1.offsetHeight && e.pageX >= left1 && e.pageX <= left1+e1.offsetWidth ||
						   e.pageY >= top2 && e.pageY <= top2+e2.offsetHeight && e.pageX >= left2 && e.pageX <= left2+e2.offsetWidth)
							return;
						window.removeEventListener("mousemove", mousemove, false);
						e2.removeAttribute("style");
				}
				window.addEventListener("mousemove", mousemove, false);
			}
			catch(e){AB.error(e)}
		}
	},
	
	addTradeFleetDropdownList: function(){
		var a = Xpath("//div[@id='cityNav']//li[@class='viewIsland']");
		if(!a) {AB.log("Error: Island View Link Xpath outdated!"); return;}
		else{
			a.addEventListener('mouseover', function(e){try{displayTradeFleetDropdownList()}catch(e){AB.error(e)}}, true);
			a.addEventListener('mouseout', function() {if(AB.tradeFleetDropdownList) AB.tradeFleetDropdownList.style.display = "none";}, true);
		}
		function displayTradeFleetDropdownList(){
			if(AB.tradeFleetDropdownList){
				AB.tradeFleetDropdownList.style.left = ((innerWidth-990)/2)+'px';
				AB.tradeFleetDropdownList.style.display = null;
				return;
			}
			AB.getFleetMovements();
			var cid, cntr=0;
			if(AB.fleetMovements) for(cid in AB.fleetMovements) if(AB.fleetMovements[cid]) ++cntr;
			if(!cntr) return;
			var htm = '<div style="background-color:OldLace; z-index: 2000; border: 1px solid rgb(157, 131, 106); opacity:.95; text-align:left; width: 800px; top:92px; left:'+((innerWidth-990)/2)+'px; position: absolute; display: block;">\
		  <div id="">\
			<table cellspacing="0" cellpadding="0" border="0" style="width: 100%;" id="">\
			  <tbody>\
				<tr style="background-image: url(&quot;/skin/input/button.gif&quot;); border-bottom: 1px dotted rgb(157, 131, 106); vertical-align: middle;">\
				  <th style="padding-left:7px;">\
					Arrive Time</th><th>Units </th><th>Origin</th><th>&nbsp;</th> <th>Mission </th><th>&nbsp; </th> <th>Destination </th></tr>';
			var date, left, right, mission;
			for(cid in AB.fleetMovements){
				for(var sid in AB.fleetMovements[cid]){
				htm += '<tr style="">\
				  <td style="padding-left:7px;">';
				date = new Date(AB.fleetMovements[cid][sid].time);
				left = AB.fleetMovements[cid][sid].direction == 2;
				right = AB.fleetMovements[cid][sid].direction == 1;
				if(AB.fleetMovements[cid][sid].type == 2){
					left = 0; right = AB.fleetMovements[cid][sid].onway;
				}
				if(AB.fleetMovements[cid][sid].type == 1) mission = 'transport.gif';
				else if(AB.fleetMovements[cid][sid].type == 2 || AB.fleetMovements[cid][sid].type == 3 || AB.fleetMovements[cid][sid].type == 5) mission = 'plunder.gif';
				else if(AB.fleetMovements[cid][sid].type == 6) mission = 'occupy.jpg';
				else if(AB.fleetMovements[cid][sid].type == 7) mission = 'blockade.gif';
				else if(AB.fleetMovements[cid][sid].type == 8) mission = 'deployarmy.gif';
				else if(AB.fleetMovements[cid][sid].type == 9) mission = 'deployfleet.gif';
				htm += "<b>"+(date.getHours()<10?"0"+date.getHours():date.getHours())+":"+(date.getMinutes()<10?"0"+date.getMinutes():date.getMinutes())+'</b></td>\
				  <td style="text-align: left;">\
					<table cellspacing="0" cellpadding="0" border="0" align="left" style="width: auto;">\
					  <tbody>\
						<tr>';

					if(AB.fleetMovements[cid][sid].type == 1 || AB.fleetMovements[cid][sid].type == 2){
						  htm += '<td title="Trade Ships" style="padding: 0pt 0.5em 0.2em 0pt;"><img style="height: 14px;" src="skin/characters/fleet/40x40/ship_transport_r_40x40.gif" /></td>';
						  if(AB.fleetMovements[cid][sid].res.wood) htm += '<td title="Building material" style="padding: 0pt 0.5em 0.2em 0pt;"><img style="height: 14px;" src="skin/resources/icon_wood.gif" /></td>';
						  if(AB.fleetMovements[cid][sid].res.marble) htm += '<td title="marble" style="padding: 0pt 0.5em 0.2em 0pt;"><img style="height: 14px;" src="skin/resources/icon_marble.gif" /></td>';
						  if(AB.fleetMovements[cid][sid].res.glass) htm += '<td title="crystal" style="padding: 0pt 0.5em 0.2em 0pt;"><img style="height: 14px;" src="skin/resources/icon_glass.gif" /></td>';
						  if(AB.fleetMovements[cid][sid].res.sulfur) htm += '<td title="sulfur" style="padding: 0pt 0.5em 0.2em 0pt;"><img style="height: 14px;" src="skin/resources/icon_sulfur.gif" /></td>';
						  if(AB.fleetMovements[cid][sid].res.wine) htm += '<td title="wine" style="padding: 0pt 0.5em 0.2em 0pt;"><img style="height: 14px;" src="skin/resources/icon_wine.gif" /></td>';
						  if(AB.fleetMovements[cid][sid].res.wood+AB.fleetMovements[cid][sid].res.glass+AB.fleetMovements[cid][sid].res.sulfur+AB.fleetMovements[cid][sid].res.wine+AB.fleetMovements[cid][sid].res.marble == 0)
						  	htm += '<td></td>';
						 htm += '</tr><tr>';
						   htm += '<td style="padding: 0pt 0.5em 0.2em 0pt; font-size: 0.75em;">'+AB.fleetMovements[cid][sid].ships+'</td>';
						   if(AB.fleetMovements[cid][sid].res.wood) htm += '<td style="padding: 0pt 0.5em 0.2em 0pt; font-size: 0.75em;">'+AB.fleetMovements[cid][sid].res.wood+'</td>';
						   if(AB.fleetMovements[cid][sid].res.marble) htm += '<td style="padding: 0pt 0.5em 0.2em 0pt; font-size: 0.75em;">'+AB.fleetMovements[cid][sid].res.marble+'</td>';
						   if(AB.fleetMovements[cid][sid].res.glass) htm += '<td style="padding: 0pt 0.5em 0.2em 0pt; font-size: 0.75em;">'+AB.fleetMovements[cid][sid].res.glass+'</td>';
						   if(AB.fleetMovements[cid][sid].res.sulfur) htm += '<td style="padding: 0pt 0.5em 0.2em 0pt; font-size: 0.75em;">'+AB.fleetMovements[cid][sid].res.sulfur+'</td>';
						   if(AB.fleetMovements[cid][sid].res.wine) htm += '<td style="padding: 0pt 0.5em 0.2em 0pt; font-size: 0.75em;">'+AB.fleetMovements[cid][sid].res.wine+'</td>';
						   if(AB.fleetMovements[cid][sid].res.wood+AB.fleetMovements[cid][sid].res.glass+AB.fleetMovements[cid][sid].res.sulfur+AB.fleetMovements[cid][sid].res.wine+AB.fleetMovements[cid][sid].res.marble == 0)
						  	htm += '<td style="padding: 0pt 0.5em 0.2em 0pt; font-size: 0.75em;">no loot</td>';
					}
					else if(AB.fleetMovements[cid][sid].type == 3 || AB.fleetMovements[cid][sid].type >= 6 && AB.fleetMovements[cid][sid].type <= 9){ // Pillage, Occupation
						if(AB.fleetMovements[cid][sid].type !== 7 && AB.fleetMovements[cid][sid].type !== 9)
							htm += '<td title="Trade Ships" style="padding: 0pt 0.5em 0.2em 0pt;"><img style="height: 14px;" src="skin/characters/fleet/40x40/ship_transport_r_40x40.gif" /></td>';
						for(var unit in AB.fleetMovements[cid][sid].troops){
							if( AB.fleetMovements[cid][sid].type == 7 || AB.fleetMovements[cid][sid].type == 9)
								htm += '<td style="padding: 0pt 0.5em 0.2em 0pt;"><img height="14" src="skin/characters/fleet/40x40/ship_'+unit+'_r_40x40.gif" /></td>';
							else htm += '<td style="padding: 0pt 0.5em 0.2em 0pt;"><img height="14" src="skin/characters/military/x40_y40/y40_'+unit+'_faceright.gif" /></td>';
						}
						htm += '</tr><tr>';
						if(AB.fleetMovements[cid][sid].type !== 7 && AB.fleetMovements[cid][sid].type !== 9)
							htm += '<td style="padding: 0pt 0.5em 0.2em 0pt; font-size: 0.75em;">'+AB.fleetMovements[cid][sid].ships+'</td>';
						for(var unit in AB.fleetMovements[cid][sid].troops){
							htm += '<td style="padding: 0pt 0.5em 0.2em 0pt; font-size: 0.75em;">'+AB.fleetMovements[cid][sid].troops[unit]+'</td>';
						}
					}
					else if(AB.fleetMovements[cid][sid].type == 4){
						htm += '<td title="Trade Ships" style="padding: 0pt 0.5em 0.2em 0pt;"><img style="height: 14px;" src="skin/characters/fleet/40x40/ship_transport_r_40x40.gif" /></td>\
								<td title="Army Size" style="padding: 0pt 0.5em 0.2em 0pt;"><b>Army Size</b></td>\
								</tr><tr>\
								<td style="padding: 0pt 0.5em 0.2em 0pt; font-size: 0.75em;">'+AB.fleetMovements[cid][sid].ships+'</td>\
								<td style="padding: 0pt 0.5em 0.2em 0pt; font-size: 0.75em;">'+AB.fleetMovements[cid][sid].troops+'</td>';
					}
					htm += '</tr>\
					  </tbody>\
					</table>\
				  </td>\
				  <td>';
				  	if(AB.fleetMovements[cid][sid].type == 3 || AB.fleetMovements[cid][sid].type >= 6 && AB.fleetMovements[cid][sid].type <= 9){ // pillage, occupy, block
						htm += '<a target="_blank" href="http://s16.en.ikariam.com/index.php?view=island&amp;cityId='+AB.fleetMovements[cid][sid].originId+'">\
							  '+(AB.Cities[AB.fleetMovements[cid][sid].originId]? AB.Cities[AB.fleetMovements[cid][sid].originId].city_name: AB.fleetMovements[cid][sid].origin)+'\
							</a>';
				  	}
				 	else{
						htm += '<a target="_blank" href="http://s16.en.ikariam.com/index.php?view=island&amp;cityId='+AB.fleetMovements[cid][sid].originId+'">\
							  <span style="'+(AB.fleetMovements[cid][sid].type == 4?'color:red; font-weight:bold;':'')+'">'+
								(AB.fleetMovements[cid][sid].type == 1 && AB.Cities[AB.fleetMovements[cid][sid].originId]?AB.Cities[AB.fleetMovements[cid][sid].originId].city_name: AB.fleetMovements[cid][sid].origin)+'</style>\
							</a>'; 
				  	}
				  htm += '</td>\
				  <td>\
					'+(left?'<img style="height: 10px;" src="http://s16.en.ikariam.com/skin/interface/arrow_left_green.gif">':'')+'\
				  </td>\
				  <td style="text-align:center;">\
					<img title="Transport ('+(AB.fleetMovements[cid][sid].onway?"underway":"waiting")+')" src="skin/interface/mission_'+mission+'" />\
				  </td>\
				  <td>\
					'+(right?'<img style="height: 10px;" src="http://s16.en.ikariam.com/skin/interface/arrow_right_green.gif">':'')+'\
				  </td>\
				  <td>\
					<div>';
					if(AB.fleetMovements[cid][sid].type == 1 || AB.fleetMovements[cid][sid].type == 2){
						htm += '<a target="_blank" href="http://s16.en.ikariam.com/index.php?view=island&amp;cityId='+AB.fleetMovements[cid][sid].targetId+'">\
							'+AB.Cities[AB.fleetMovements[cid][sid].targetId].city_name+'\
							</a>';
					 }
				 	else{
					 	htm += '<a target="_blank" href="http://s16.en.ikariam.com/index.php?view=island&amp;cityId='+AB.fleetMovements[cid][sid].targetId+'">\
							'+AB.fleetMovements[cid][sid].target+'\
							</a>'; 
				 	}
					htm += '</div>\
					<!--(arreis)-->\
				  </td>\
				</tr>';
				}
			}
			htm += '</tbody>\
			</table>\
		  </div>\
		</div>';
			AB.tradeFleetDropdownList = ADD(htm);
		}
	},
	
	addContextBuildButtons: function (){
		AB.log("addContextBuildButtons");
		this.selectedBuilding = {
				type: null, 
				pos: null, 
				lvl: null,
			};
			
		if(this.view === "city" && !this.occupiedCities[this.pageCityId||this.cityId]){
			var a, e, x = Xp("li",1, $('locations'));
			var lvl, pos, type, upgr, html, i, res, buildable, cid = this.pageCityId||this.cityId;
			for each(e in x){	// buldings on city map
				type = e.className; // AB.getBuildingFromStr(e.className);
				if(!Buildings[type]) continue;	// throw new Error("The bilding '"+type+"' is not supported!");
				//if(e.className.indexOf("buildingGround") >= 0 || !type) continue;
				upgr = false;
				pos = e.id.slice(8);
				a = gET("a", 0, e);
				lvl = Number((lvl=trim(a.title)).slice(lvl.lastIndexOf(' ')+1));	// in str wie "level 19"
				if(this.Cities[cid].underConstructionName == type && AB.Cities[cid].underConstructionPosition == pos) {++lvl; upgr = true;}
				this.correctCostsOf(type, lvl+1, cid);
				buildable = true;
	
				// Info boxes
				html = '<div style="visibility:hidden; -moz-border-radius: 3px 3px 3px 3px; opacity: 0.9; background-color: LavenderBlush; padding: 3px;">';
				for(i in Buildings[type]){
					if(Buildings[type][i] && Buildings[type][i][lvl])
						res = this.updatedCityResources[cid][i] - Buildings[type][i][lvl];
					else continue;

					if(res <= 0) buildable = false;
					html += '<nobr><img src="/skin/resources/icon_' + i + '.gif" style="height:12px; margin-left:5px; vertical-align:middle;"/> <span style="font-size:.8em;'+
							(res<0?'color:red':'')+';">'+AB.shortenResStr(res < 0? res:Buildings[type][i][lvl]) + '</span></nobr> ';
				}
				html += '</div>';
				ADD('<span class="AB_CityLvl" style="background-color:'+(buildable?"green":"black")+'; color:white;"> '+(upgr?lvl-1:lvl)+"</span>", a);	// level
				ADD(html, a);
				
				a.addEventListener("contextmenu", displayUpgrButton, false);
				a.setAttribute("onmouseover","this.lastChild.style.visibility = 'visible'");
				a.setAttribute("onmouseout","this.lastChild.style.visibility = 'hidden';");
				a.setAttribute("t", type);
				a.setAttribute("pos", pos);
			}
			GM_addStyle(".AB_CityLvl{background-color: green; color: white; border: 1px dotted Silver; padding: 1px 2px; position: static; display: block; text-align: center; height: 15px; width: 14px; -moz-border-radius: 14px 14px 14px 14px;");
			GM_addStyle("#locations a{text-decoration:none;}");
		}


		// Empire Board Buildings List
		Xp('.//td[@level>0]',1, $('EmpireBoardBuildings')).forEach(function(e){e.addEventListener("contextmenu", displayUpgrButton, false); e.addEventListener("mouseover", displayTooltip, false); e.addEventListener("mousemove", moveTooltip, false); e.addEventListener("mouseout", hideTooltip, false);});
		// upgrade button
		AB.upgrButton = ADD('<span onmouseout="this.style.display=\'none\';" onmouseover="this.style.display=null;" style="position:absolute; display:none; z-index:4000; padding:3px;"><span class="button" style="pmargin:0px;"> upgrade </span></span>');
		AB.upgrButton.addEventListener("click", upgrade, false);
		// resources tooltip
		
		function moveTooltip(e){
			if(AB.EBResTooltip){
				AB.EBResTooltip.style.left = (e.clientX+10 > innerWidth-AB.EBResTooltip.offsetWidth-16?innerWidth-AB.EBResTooltip.offsetWidth-16:e.clientX+10)+"px";
				AB.EBResTooltip.style.top = (e.clientY+20)+"px";
			}
		}
		function hideTooltip(e){
			if(AB.EBResTooltip){
				AB.EBResTooltip.style.display = "none";
			}
		}
		function displayTooltip(e){
			try{
				if(!AB.EBResTooltip) AB.EBResTooltip = ADD('<div style="text-align:left; z-index:30000; background:#FFFBDB; padding:5px 8px; font-size:11px; border:1px solid #542C0F; -webkit-border-radius: 5px; -moz-border-radius: 5px; position:fixed; top:0; left:0; white-space:nowrap;"></div>');
				var view = e.currentTarget.getAttribute("view");
				var pos = e.currentTarget.getAttribute("position");
				var cid = XP(".//a",0,e.currentTarget).getAttribute("cityid");
				var lvl = AB.getBuildingLevel(cid, view, pos);
				var html = '<p style="margin-bottom:.5em; color:#009900; font-weight:bold;">' + AB.getBuildingName(view) + ' (' + (lvl+1) + ')</p>'
				AB.correctCostsOf(view, lvl+1, cid);
				for(var res in Buildings[view]){
					if(Buildings[view][res]===0 || !Buildings[view][res][lvl])continue;
					
					html += '<span style="margin-right:.7em;">'+AB.getResourceImg(res)+
							AB.shortenResStr(Buildings[view][res][lvl]) + '</span>';
					
				}
				AB.EBResTooltip.innerHTML = html;
				AB.EBResTooltip.style.display = null;
				AB.EBResTooltip.style.left = (e.clientX+10 > innerWidth-AB.EBResTooltip.offsetWidth-16?innerWidth-AB.EBResTooltip.offsetWidth-16:e.clientX+10)+"px";
				AB.EBResTooltip.style.top = (e.clientY+20)+"px";
			} catch(e){AB.error(e)}
		}
		function displayUpgrButton(e){
			try{
				var b = AB.upgrButton;
				b.style.display = "block";
				b.style.left = (e.pageX-2)+"px";
				b.style.top = (e.pageY-2)+"px";
				AB.selectedBuilding.type = e.currentTarget.getAttribute("t")||e.currentTarget.getAttribute("view");
				b.firstChild.textContent = "upgrade "+AB.getBuildingName(AB.selectedBuilding.type);
				AB.selectedBuilding.pos = parseInt(e.currentTarget.getAttribute("pos")||e.currentTarget.getAttribute("position"), 10);
				if((b=XP(".//a",0,e.currentTarget)) && (b=b.getAttribute("cityid"))) AB.selectedBuilding.cid = b;
				else AB.selectedBuilding.cid = AB.pageCityId||AB.cityId;
				e.preventDefault();
				return false;
			} catch(e){AB.error(e)}
		}
		function upgrade(e){
			try{
				AB.addToQueue();
			} catch(e){AB.error(e)}
		}
	},
	
	visualImprovements: function(){
		var t;
		if(this.view == "worldmap_iso") GM_addStyle('#worldmap_iso #scrollcover { height:640px; }');
		if(this.view == "merchantNavy"){
			setTimeout(function(){
						t = XP("//div[@class='pulldown']//div[1]", 1);
						for(var e in t){
							/*var evt = document.createEvent("HTMLEvents");
							evt.initEvent("click", true, true ); // event type,bubbling,cancelable
							t[e].dispatchEvent(evt);*/
							t[e].style.height = null;	
						}}, 500);
		}
		if(this.view == "island"){
			// blink inactive cities on island view
			GM_addStyle("#island #mainview #cities .city .textLabel .inactivity{text-decoration:blink;}");
			// non alliance cities in red
			t = XP('//div[@id="mainview"]/ul[@id="cities"]/li[not(./ul[@class="cityinfo"]/li[@class="ally"]/a)]/a[1]/span[not(./span[@class="inactivity"])]',1);
			if(t) for each(var e in t) e.style.color = "red";
			// spys
			var spyImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAA3NCSVQICAjb4U/gAAABCFBMVEX///9ycnJmZmZQUlRKSkoqO1AzMzNLV2BAQEBbW1s7PkBmZmZQUlRAQEA6OjpQUlRKSkpmZmZbW1tQUlRCUFz/iBNbW1s1Oj1KSko8PT46OjpcRTdbW1tQVFk8PT5bW1txV0ZQUlRKSko8PT46Ojr/0F3/xlv/v0//vkv6tE3iq1PoqEv/oivJoWf/liG2mFG5jk6ph3DleyaAiJCFhYWOgnt+goacfE/Fby2dd0XIbCKTeE14eHhzeX5ycnKAbk1zamNpaWmMYz9haW9mZmZjZmprYVVYYWlbW1tMXnRLV2BQVFlKSkpFS1FER0hMQDlAQEA+QUc8PT46OjoqO1AxNTszMzMaK0ckQyxyAAAAWHRSTlMAERERERERMzNEZnd3d3eIiJmZmZmqqqq7u7vM3d3d7u7u7u7u////////////////////////////////////////////////////////////////////WlH2oAAAAAlwSFlzAAAK8AAACvABQqw0mAAAACp0RVh0Q3JlYXRpb24gVGltZQBEaSA5IE1yeiAyMDA0IDIzOjM1OjAzICswMTAw5cKdqgAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTM5jWRgMAAACeSURBVBiVY2DACrhlPBSF2RB8QTsXDx8/ATif0dHFw9s30I8XJsDk4uphbmAZqgw3wdFNU0tN118cJiDk7OQZbh8iDTeDWcRI21pVXxRhC7uDnoa6jgIrXIDf2dTCytCLC8bn9DAzM3a39QvggAqIuZiZ2Jh4+wRLQgXkPexs7Ey8/cJUoAKyPh4uHiY+QXABFh4JJT8lOSk+JO8hAADVTReg4JziyQAAAABJRU5ErkJggg%3D%3D";
			Xp('//div[@id="mainview"]/ul[@id="cities"]/li[./ul[@class="cityinfo"]/li[@class="spy"]]/a[1]/span[1]/span[1]',1).
			forEach(function(e){var i = document.createElement("img"); i.src = spyImg; i.setAttribute("style", "vertical-align:middle; margin-left:-6px; position:relative; top:-1px;"); e.parentNode.insertBefore(i, e.nextSibling)})
		}
		

		// Anti Plus by ExMachina (improved version)
		GM_addStyle("* .ambrosia, .premium, .plusteaser, .premiumOffer, .costAmbrosia, #trader, #tradeRouteBox, #moveCity, #viewCityImperium, #viewMilitaryImperium, #viewResearchImperium, #viewDiplomacyImperium, #setPremiumTransports, #banner_container, div.premiumExchange, a.premiumExchange{ display:none !important; }");
		if(this.view == "militaryAdvisorReportView") ((t=XP("//a[contains(@href,'action=Premium')]")) && t.parentNode.removeChild(t));
		(t=XP("//div[@id='reportInboxLeft'][.//a[@href='?view=premium']]")) && t.parentNode.removeChild(t);
		document.body.id==="museum" && (t=XP('//div[@id="assignCulturalGoods"][contains(.//p/text(), "Ambrosia")]')) && t.parentNode.removeChild(t)
	},
	
	registerKeyEvents: function(){ 
		window.addEventListener("keyup", keyup, false);
		this.keyShortcutsEnabled = true;
		function keyup(e){ 
			if(!AB.keyShortcutsEnabled || !AB.Data.enableHotkeys) return false;
			if(e.originalTarget.nodeName.toLowerCase() == "input" || e.originalTarget.nodeName.toLowerCase() == "textarea") return false;
			var i; 
			if(e.keyCode > 47 && e.keyCode < 58) 
				i=e.keyCode;
			else return false;
			i-=49; 
			if(i<0) i=10; 
			if(i < $("citySelect").length){
				var s = $('citySelect'); 
				s.selectedIndex = i; 
				s.form.submit();
			}
			return false;
		}
	},
	
	performActions: function(){
		AB.log("performActions - state: "+AB.state);	
		this.updateCityResources();
		this.updateCityTroops();	
					
		//  Aktualisiere Status
		if(AB.state)
			switch(AB.state){	// 0: idle, 1: building, 2: return to original page, 3: finished task
				case 1:		// Auto Builder active
					AB.log("AB State 1, build");
					if(this.build(session.get('buildAssignment'))) return true;
				case 2:
					session.set('ABState', AB.state=3);
					createBuildingsObj();
					if(this.checkQueue()) return true;
					if(this.returnNow()) return true;
				case 3:
					session.set('ABState', AB.state=0);
					this.clearSessionData();
						// defender;
						if(Number(session.get('DEFState')) == 1){
							if(DEFENDER.defend()) return true;
						}
					break;
				case 4:		// Auto Supply Job active (supplying a building Project)
				case 5:		// Auto Supply Job active (carrying out a minimum supply requirement routine)

					this.Supplier.displayWaitBox();
					switch(parseInt(session.get('ASState'), 10)){
						case 0:	// IDLE
							session.set('ABState', AB.state=0);
							break;
						case 1: // FETCH
							if(AB.Supplier.fetchRes()) return true;
							break;
						case 2: // SENT
							if(AB.Supplier.check()) return true;
							break;
						case 3: // FINISH
							 if(AB.Supplier.finish()) return true;
							break;
					}
					break;
				case 6:		// Defense Operation
					AB.log("performActions - DEFENDER AB.state: "+session.get('DEFState'));
					switch(parseInt(session.get('DEFState'), 10)){
						case 0:	// IDLE
							session.set('ABState', AB.state=0);
							break;
						case 1: // BUILD
							
							break;
						case 2: // FINISHED BUILD
							if(DEFENDER.defend()) return true;
							break;
						case 3: // SAVE RESOURCES
							 if(DEFENDER.distributeResources()) return true;
							break;
						case 4: // FINISHED SAVE RESOURCES
							 if(DEFENDER.defend()) return true;
							break;
						case 5: // BUILD TROOPS
							 if(DEFENDER.trainUnits()) return true;
							break;
						case 6: // FINISHED BUILD TROOPS
							 if(DEFENDER.defend()) return true;
							break;
						case 7: // DONATE
							if(DEFENDER.donateResources()) return true;
							break;
						case 8: // FINISHED DONATE
							 if(DEFENDER.defend()) return true;
							break;
						case 9: // DEFENDING ISLAND RESOURCES
							 if(DEFENDER.distributeResources()) return true;
							break;
					}
					break;
				case 7:		// Equalizer
					if(EQUALIZER.equalize()) return true;
					break;
				case 8:		// Task Scheduler
					if(ASC.executeTask()) return true;
					break;
				case 10:	// install
					if(AB.install()) return true;
					break;
			}
		CreateBuildingsObj_Start = Timestamp();
		createBuildingsObj();
CreateBuildingsObj_ = (Timestamp()-CreateBuildingsObj_Start)/1000;

check_Start = Timestamp();
		// Core
		if(this.check()) return true;
check_ = (Timestamp()-check_Start)/1000;

addButtons_Start = Timestamp();
		// Visual
		initFL();
		this.addButtons();	// for AB queue
addButtons_ = (Timestamp()-addButtons_Start)/1000;
addContextBuildButtons_Start = Timestamp();
		this.addContextBuildButtons();
addContextBuildButtonsj_ = (Timestamp()-addContextBuildButtons_Start)/1000;		
drawMainBox_Start = Timestamp();		
		this.drawMainBox();
drawMainBox_ = (Timestamp()-drawMainBox_Start)/1000;		
AddNiceLinks_Start = Timestamp();		
		this.AddNiceLinks();
AddNiceLinks_ = (Timestamp()-AddNiceLinks_Start)/1000;		
addEBEvents_Start = Timestamp();		
		this.addEBEvents();
addEBEvents_ = (Timestamp()-addEBEvents_Start)/1000;		
visualImprovements_Start = Timestamp();		
		this.visualImprovements();
visualImprovements_ = (Timestamp()-visualImprovements_Start)/1000;		
addTradeFleetDropdownList_Start = Timestamp();		
		this.addTradeFleetDropdownList();
addTradeFleetDropdownList_ = (Timestamp()-addTradeFleetDropdownList_Start)/1000;		
registerKeyEvents_Start = Timestamp();		
		this.registerKeyEvents();
registerKeyEvents_ = (Timestamp()-registerKeyEvents_Start)/1000;		
		
		if(Number(session.get('overviewBoxOpen'))) this.showTaskOverview();
		return false;
	},
	
	check: function (){
		if(!this.firstCheck){
			this.renewSavedData(); // in case things have changed in a different tab
			this.updateCityResources();
			this.updateCityTroops();
			this.ts = Timestamp();
		}
		
		// Process Auto Build queue 											[Priority 1]
		if(AB.checkQueue()) return true;
		// Min Res supply routine 												[Priority 2]
		if(AB.Supplier.minResCheck()) return true;
		// Island resource defense												[Priority 3]
		if(DEFENDER.checkMaxIslandRes()) return true;
		// Resource Equalizer													[Priority 4]
		if(EQUALIZER.check()) return true;
		// Task Scheduler														[Priority 5]
		if(ASC.check()) return true;
		
		// all checks negative - set timeout for next check
		setTimeout(function(){try{AB.check()}catch(e){AB.error(e)}}, 60000*this.checkInterval);
		this.firstCheck = false;
		return false;
	},
	
	checkQueue: function(){
		AB.log("checking Queue");
		if(!this.enabled) return false;
		if(this.timeoutH || this.tickerIntervalH || !this.firstCheck){
			clearTimeout(this.timeoutH);
			clearInterval(this.tickerIntervalH);
			this.Reloader.taskCountdownObj.innerHTML = null;
			this.setStatusTxt("","");
			this.ts = Timestamp();	
		}


		var cid, building, times = [], counter = 0, unitConstructionTime;
		var wood, sulfur, glass, marble, wine;
		for(cid in this.Data.cities){
			if(this.Data.cities[cid].queue.length == 0 || !this.Data.cities[cid].enabled) continue;
			else ++counter;
			building = this.Data.cities[cid].queue[0];
			lvl = this.getBuildingLevel(cid, building.type, building.pos);
			unitConstructionTime = this.unitConstructionEndtimes[cid]? this.unitConstructionEndtimes[cid][building.type]||0:0;
			AB.log("Prüfe, ob Bau von Gebäude "+building.type+" in Stadt "+cid+"["+this.Cities[cid].city_name+"] möglich ist ------");

			this.correctCostsOf(building.type, lvl+1, cid);
			wood = Buildings[building.type].wood? Buildings[building.type].wood[lvl] : 0;
			sulfur = Buildings[building.type].sulfur? Buildings[building.type].sulfur[lvl] : 0;
			glass = Buildings[building.type].glass? Buildings[building.type].glass[lvl] : 0;
			marble = Buildings[building.type].marble? Buildings[building.type].marble[lvl] : 0;
			wine = Buildings[building.type].wine? Buildings[building.type].wine[lvl] : 0;
			
			//AB.log("Kosten: "+wood+" wood, "+marble+" marble, "+sulfur+" sulfur, "+glass+" glass, "+wine+" wine, ")
			//AB.log("Verfügbare Res: "+this.updatedCityResources[cid].wood+" wood, "+this.updatedCityResources[cid].marble+" marble, "+this.updatedCityResources[cid].sulfur+" sulfur, "+this.updatedCityResources[cid].glass+" glass, "+this.updatedCityResources[cid].wine+" wine, ")
			if(	this.updatedCityResources[cid].wood - wood >= 0 && this.updatedCityResources[cid].glass - glass >= 0 && this.updatedCityResources[cid].marble - marble >= 0
				&& this.updatedCityResources[cid].sulfur - sulfur >= 0 && this.updatedCityResources[cid].wine - wine >= 0){
				// res verfügbar
				AB.log("Ressourcen verfügbar für Bau von "+building.type+" lvl "+lvl+" in Stadt "+cid);
				if(this.Cities[cid].underConstructionTime < this.ts && unitConstructionTime < this.ts){
					this.build(cid);	// Bauauftrag geben
					return true;
				}
				else {		
					AB.log("aber Stadt nicht frei");
					if((this.Cities[cid].underConstructionTime-this.ts)/1000 < 24*3600)
						times.push([Max((this.Cities[cid].underConstructionTime-this.ts)/1000, (unitConstructionTime-this.ts)/1000), cid]);
				}
			}
			else{ // Es fehlen ressourcen;
				AB.log("Ressourcen NICHT verfügbar für Bau in Stadt "+cid);
				var afterShipping = false;	
				var wUnterwegs = this.Supplier.getArrivingGoodsSum(cid, "wood");
				var gUnterwegs = this.Supplier.getArrivingGoodsSum(cid, "glass");
				var mUnterwegs = this.Supplier.getArrivingGoodsSum(cid, "marble");
				var sUnterwegs = this.Supplier.getArrivingGoodsSum(cid, "sulfur");
				var wiUnterwegs = this.Supplier.getArrivingGoodsSum(cid, "wine");
				if( this.updatedCityResources[cid].wood + wUnterwegs - wood >= 0 && this.updatedCityResources[cid].glass + gUnterwegs - glass >= 0 &&  this.updatedCityResources[cid].wine + wiUnterwegs - wine >= 0
						&& this.updatedCityResources[cid].marble + mUnterwegs - marble >= 0 && this.updatedCityResources[cid].sulfur + sUnterwegs - sulfur >= 0)
					afterShipping = true;
					

				if(this.enableAutoSupply && AB.Supplier.ready && AB.Data.cities[cid].supply.self && !afterShipping){
					var w = this.updatedCityResources[cid].wood + wUnterwegs - wood;
					w = w < 0?  Math.abs(w): 0;
					var g = this.updatedCityResources[cid].glass + gUnterwegs - glass;
					g = g < 0?  Math.abs(g): 0;
					var m = this.updatedCityResources[cid].marble + mUnterwegs - marble;
					m = m < 0?  Math.abs(m): 0;
					var s = this.updatedCityResources[cid].sulfur + sUnterwegs - sulfur;
					s = s < 0?  Math.abs(s): 0;
					var wi = this.updatedCityResources[cid].wine + wiUnterwegs - wine;
					wi = wi < 0?  Math.abs(wi): 0;
					this.Supplier.add(cid, w, g, m, s, wi);
					AB.log("Erzeuge Supply Auftrag");

				}
				else AB.log("Erzeuge keine Resourcenlieferungsaufträge");
	
				
				// Prüfen, ob Stadt nach Lieferungen genug haben wird
				if(afterShipping){
					var t = this.getArriveTimeFor(cid, wood, marble, sulfur, glass, wine);
					AB.getFleetMovements();
					if(!this.fleetMovements[cid] && !t){
						AB.log("Trying to get arrivetime from EB Config"); 
						var arrivetime, row, rows = AB.Config.arrivinggoods[cid];
						if(rows) for (var row in rows){
								arrivetime = parseInt(rows[row].arrivetime, 10);
								if(arrivetime > t) t = arrivetime;
							}
						if(t == 0) throw new Error("Impossible Error while getting max arrivetime for goods to City "+cid+"!");
					}
					if((t-AB.ts)/1000 < 24*3600 && (t-AB.ts)/1000 > 0){
						times.push([Max((t-AB.ts)/1000, (this.Cities[cid].underConstructionTime-this.ts)/1000, (unitConstructionTime-this.ts)/1000), cid]);
						AB.log("Bau nach Lieferung möglich sec: "+times[times.length-1][0]);
					}
						
				}
					
				// Prüfe ob Bau in der Stadt möglich/errechenbar ist
				if(wood-this.updatedCityResources[cid].wood >0 && this.Cities[cid].prodwood==0 || glass-this.updatedCityResources[cid].glass >0 && this.Cities[cid].prodglass==0 || 
					marble-this.updatedCityResources[cid].marble >0 && this.Cities[cid].prodmarble==0 || sulfur-this.updatedCityResources[cid].sulfur >0 && this.Cities[cid].prodsulfur==0
					|| wine-this.updatedCityResources[cid].wine >0 && this.Cities[cid].prodwine==0){
					AB.log("Bau in der Stadt ist nicht möglich (0 Produktion)");
					continue;
				}
				else{
					AB.log("Bau in der Stadt ist möglich");
					// Zeit errechnen, bis Bau in der Stadt möglich ist
					var maxSeconds = Max([this.Cities[cid].prodwood?(wood - this.updatedCityResources[cid].wood) / this.Cities[cid].prodwood * 3600:0,
										this.Cities[cid].prodglass?(glass - this.updatedCityResources[cid].glass) / this.Cities[cid].prodglass * 3600:0,
										this.Cities[cid].prodmarble?(marble - this.updatedCityResources[cid].marble) / this.Cities[cid].prodmarble * 3600:0, 
										this.Cities[cid].prodsulfur?(sulfur - this.updatedCityResources[cid].sulfur) / this.Cities[cid].prodsulfur * 3600:0,
										this.Cities[cid].prodwine?(wine - this.updatedCityResources[cid].wine) / this.Cities[cid].prodwine * 3600:0]);
					if(maxSeconds < 24*3600) // Maximum: 1D
						times.push([Max(maxSeconds, (this.Cities[cid].underConstructionTime-this.ts)/1000, (unitConstructionTime-this.ts)/1000), cid]);
				}
			}
		}

		if(times.length){
			var i, min = null;
			for (var j in times){
				if(min === null || times[j][0] < min) {min = times[j][0]; i=j;}
			}
			if(min > 0){
				this.timeout = times[i][0]*1000;
				this.setBuildTimeout(times[i][1]);
			}
			else throw new Error("Error retrieving Min-time for next build task. min Time in sec: "+min+"; cityId: "+times[i][1]);
		}
		else if(counter){
			// Keine Bauaufträge erfüllbar
			this.setStatusTxt("build tasks unaccomplishable", "Auto Builder: build tasks unaccomplishable at this time");
		}

		return this.checkAutoSupply();
	},
	
	checkAutoSupply:function(){
		if(AB.enableAutoSupply) return AB.Supplier.check(4);
		else return false;

	},
	
	Supplier:{
		jsd: 1000*60*0,	// delay between supply jobs in milliseconds
		RCS: 500,	// chunk size - should equal carrying capacity of a trade ship
		resTolerance: 500*1,
		ready: false,
		init: function(){
			this.ready = true;
			if(!AB.enableAutoSupply)  this.ready = false;
			this.lastJob = session.get('ASLastJobTs') || 0;
			session.set('ASState', session.get('ASState') || 0);
			if(session.get('ASState') == 0 && session.get('AS_Jobs')) session.remove('AS_Jobs');
			this.resTolerance = AB.Data.Supplier.resTolerance;
			if(this.resTolerance < this.RCS) this.resTolerance = this.RCS;
			this.getData();
            if(!AB.ships){
				if(session.get('ASState') != 0 && session.get('ASState') != 3) return AB.Supplier.finish();
			}
            if(AB.numCities === 1) this.ready = false;
			if(AB.debug) unsafeWindow.J = this.Jobs;
		},
		add:function(cid, w, g, m, s, wi){ // Erzeugt neue Job Objekte und sortiert sie nach Resourcenbedarf aufsteigend
			var v = {id:cid, v: w+g+m+s+wi, res:{wood: w, glass: g, marble: m, sulfur: s, wine: wi}};
			this.sorteinf(this.Jobs.jobs, v);
			this.saveData();
		},
		sorteinf:function(a, v){
			// -- [Algorithm: sorteinf] by Klaus_ --
			var o = a.length-1;
			var u = 0;
			var i = 0;
			while (o > u){
				i = Math.floor((o+u)>>1);
				if(v.v == a[i].v) {while(i<o && a[i].v==a[++i].v); break;}
				else if(v.v < a[i].v) o = i-1;
				else u = i+1;
			}
			if(o==u) i = v.v < a[o].v?o:o+1;
			o = a.length;
			while(i<o) a[o] = a[--o];
			a[i] = v;
			// -- /[Algorithm: sorteinf] --
		},
		check:function(task){
			if(!this.ready || !this.Jobs.jobs.length || !AB.ships) return false;
			AB.log("AutoSupply check. ready: "+this.ready+", Jobs: "+this.Jobs.jobs.length+", task: "+task+", ABState: "+AB.state);
			if(AB.ts - this.lastJob < this.jsd) {
				AB.log("AutoSupply failed timestamp test, last: "+this.lastJob);
				return false;
			}
			session.set('ABState', (AB.state = task || AB.state));	// set Autosupply Job
			this.getData();
			var supplierCity, supplierCityId, res, job = this.Jobs.jobs[0], cid = job.id, city;
			var safe, cityRes, type, lvl, cost, av;
			var supplierCities = [];
			if(!AB.Data.cities[cid].supply.self){
				return this.removeJob();
			}
			else for(res in job.res){
				if(!job.res[res]) 
					continue;
				for(supplierCityId in AB.Data.cities){
				
					city = AB.Cities[supplierCityId];
					if(supplierCityId == cid) continue;	
					if(!Number(city.actions)) continue; // city has no action points
					if(res != "wood" && res != city.prodgood) continue;	// resource is not produced in that city
					
					safe = Max(AB.Data.cities[supplierCityId].supply[res=="wood"?"w":"p"], AB.Data.cities[supplierCityId].supply.minRes[res]); 
					AB.log("safe res in "+AB.Cities[supplierCityId].city_name+": "+safe);
					cityRes = AB.updatedCityResources[supplierCityId][res];
					AB.log("cityRes in "+AB.Cities[supplierCityId].city_name+": "+cityRes);
					
					if(cityRes - safe < this.resTolerance){
						AB.log("not enough "+res+" in city_"+supplierCityId+" (Tolerance:"+this.resTolerance+"), going to next one");
						continue; 
					}
					
					// check if that city wants to build something and save the safe amount in session if so
					if(AB.Data.cities[supplierCityId].queue.length){
						createBuildingsObj();
						type = AB.Data.cities[supplierCityId].queue[0].type;
						lvl = AB.getBuildingLevel(supplierCityId, type, AB.Data.cities[supplierCityId].queue[0].pos);
						AB.correctCostsOf(type, lvl+1, supplierCityId);
						cost = Buildings[type][res]? Buildings[type][res][lvl] : 0;
						if(cost > safe) av = cityRes-cost;
						else av = cityRes-safe;
						if(av < AB.Supplier.RCS) continue;
					}
					else av = cityRes - safe; // available res in city to take; 0 = all from safe limit 
					this.sorteinf(supplierCities, {v:av, id:supplierCityId, res:res})
				}
			}
			if(supplierCities.length){
				supplierCity = supplierCities[supplierCities.length-1];
				session.set('ASavres', supplierCity.v);
				return this.goFetch(supplierCity.res, supplierCity.id, cid);
			}
			// Resources have been sent, or are not available in Supply Cities.
			return this.removeJob();
		},
		minResCheck: function (){ // creating Supply jobs if needed
			AB.log("minResCheck ");
			if(!this.ready || !AB.ships) return false;
			if(this.Jobs.jobs.length){
				AB.log("there are Jobs in the queue. removing "+this.Jobs.jobs.length);
				this.Jobs.jobs.splice(0);
			}
			var cid, minResources, res, w, wi, m, g, s;
			var wUnterwegs, gUnterwegs, sUnterwegs, mUnterwegs, wiUnterwegs;
			for(cid in AB.Data.cities){
				minResources = AB.Data.cities[cid].supply.minRes;
				wUnterwegs = AB.Supplier.getArrivingGoodsSum(cid, "wood");
				wiUnterwegs = AB.Supplier.getArrivingGoodsSum(cid, "wine");
				mUnterwegs = AB.Supplier.getArrivingGoodsSum(cid, "marble");
				sUnterwegs = AB.Supplier.getArrivingGoodsSum(cid, "sulfur");
				gUnterwegs = AB.Supplier.getArrivingGoodsSum(cid, "glass");
				if(AB.updatedCityResources[cid].wine + wiUnterwegs < minResources.wine || AB.updatedCityResources[cid].wood + wUnterwegs < minResources.wood ||
					AB.updatedCityResources[cid].marble + mUnterwegs < minResources.marble || AB.updatedCityResources[cid].glass + gUnterwegs < minResources.glass ||
					AB.updatedCityResources[cid].sulfur + sUnterwegs < minResources.sulfur){
					
					w = AB.updatedCityResources[cid].wood + wUnterwegs - minResources.wood;
					w = w < 0?  Math.abs(w): 0;
					wi = AB.updatedCityResources[cid].wine + wiUnterwegs - minResources.wine;
					wi = wi < 0?  Math.abs(wi): 0;
					s = AB.updatedCityResources[cid].sulfur + sUnterwegs - minResources.sulfur;
					s = s < 0?  Math.abs(s): 0;
					m = AB.updatedCityResources[cid].marble + mUnterwegs - minResources.marble;
					m = m < 0?  Math.abs(m): 0;
					g = AB.updatedCityResources[cid].glass + gUnterwegs - minResources.glass;
					g = g < 0?  Math.abs(g): 0;
					AB.Supplier.add(cid, w, g, m, s, wi);
				}
			}
			return AB.Supplier.check(5);
		},
		removeJob: function (city_id, resName){
			AB.log("Removing first Job, ASState: "+session.get('ASState')+", length: "+AB.Supplier.Jobs.jobs.length);
			
			AB.Supplier.Jobs.jobs.splice(0,1);
			AB.Supplier.saveData();
			
			if(!AB.Supplier.Jobs.jobs.length){
				return AB.Supplier.finish();
			}
			else return this.check();
		},
		getArrivingGoodsSum: function (city_id, resName){
			/*
			// old EB method
			var sum = 0;
			var city = AB.Config["city_"+city_id]
			var rows = AB.Config.arrivinggoods[city_id];
			var key;
			if(rows) for (key in rows)
				{
				var row = rows[key];
				var res = row.res;
				var a = res[resName]? res[resName]:0;
				var arrivetime = parseInt(row.arrivetime, 10);
				if ((a > 0) && (arrivetime > city.prodtime)) sum += a;
				}
			return sum;
			*/
			AB.getFleetMovements();
			if(!AB.fleetMovements[city_id]) return 0;
			var sum = 0;
			for (var sid in AB.fleetMovements[city_id]){
				if(AB.fleetMovements[city_id][sid].type == 1 || AB.fleetMovements[city_id][sid].type == 2)
					sum += 	AB.fleetMovements[city_id][sid].res[resName];
			}
			return sum;
		},
		goFetch:function (res, supplierCityId, targetCityId){
			AB.log("going to fetch "+res+" from "+supplierCityId+" for "+targetCityId);
			if(!AB.ships) return this.finish();
			AB.displayWaitBox(" Auto Supply ");	
			if(session.get('ASState') == 0){
				AB.saveReturnURL();
			}
			session.set('ASState', 1);	// FETCH
			session.set('ASRes_toFetch', res);
			session.set('ASTargetCid', targetCityId);
			var url = "?view=transport&destinationCityId="+targetCityId;

			AB.goTo(supplierCityId, url);
			return true;
		},
		fetchRes:function (){	// sends resources to destination City
			AB.log("Fetching Resource");
			var b, input, res = session.get('ASRes_toFetch');
			if(!res) throw new Error("Fetching Error! No resource in session for Autosupply job!");
			if(!(input = $("textfield_"+res))){
				if(AB.view != "transport") return this.check();	// User changed the page
				else throw new Error("Fetching Error! No input box on page!");
			}
			var amount = 0;
			var av = Number(session.get('ASavres')) || AB.updatedCityResources[AB.cityId][res] - AB.Data.cities[AB.cityId].supply[res=="wood"?"w":"p"]; // available
			var sp = Math.floor(av/AB.Supplier.RCS) * AB.Supplier.RCS; 	// shippable
			if(av > 0 && sp){
				var dem = Math.ceil(this.Jobs.jobs[0].res[res]/AB.Supplier.RCS)*AB.Supplier.RCS;
				amount = dem > sp? sp: dem;
			}
			AB.log("available: "+av+", shippable: "+sp+", demanded: "+dem+", final amount: "+amount)
			if(!amount){
				AB.log("BAD ERROR! Amount of fetchable "+res+" = 0 in city "+AB.cityId);
				return this.check();
			}
			else{	// send resources
				if(amount/this.RCS > AB.ships) // not enough ships
					amount = AB.ships*this.RCS;
				AB.log("Sending "+amount+" "+res+" from "+AB.cityId+" to "+this.Jobs.jobs[0].id);
				this.Jobs.jobs[0].res[res] -= amount;
				if(this.Jobs.jobs[0].res[res] < 0) this.Jobs.jobs[0].res[res] = 0;	// impossible
				this.saveData();
				AB.log("New demanded Job-Res: "+this.Jobs.jobs[0].res[res]+", saved: "+eval(session.get('AS_Jobs')).jobs[0].res[res]);
				input.value = amount;
				input.focus(); input.select();
				if(!(b = XP('//*[@id="submit"]'))) throw new Error("Fetching Error! No button found!");
				session.set('ASState', 2);
				b.click();
				return true;
			}
		},
		displayWaitBox:function (){
			var city = session.get('ASTargetCid')? AB.Cities[session.get('ASTargetCid')].city_name: "unknown";
			if(AB.state == 4){
				AB.log("AB State 4, Supplier State "+session.get('ASState')+' Supplying Construction '+AB.getBuildingName(AB.Data.cities[session.get('ASTargetCid')].queue[0].type)+' in '+city+'');
				AB.displayWaitBox(" Auto Supply ", 'Supplying Construction of <b style="color:SaddleBrown;">'+AB.getBuildingName(AB.Data.cities[session.get('ASTargetCid')].queue[0].type)+'</b> in <b><i>'+city+'</i></b>');
			}
			else if(AB.state == 5){
				var amount =  AB.Supplier.Jobs.jobs.length? AB.Supplier.Jobs.jobs[0].res[session.get('ASRes_toFetch')]: 0;
				var det = amount? 'MRS-Routine: '+AB.getResourceImg(session.get('ASRes_toFetch'))+amount+' &nbsp;&nbsp;for <b><i>'+city+"</i></b>": 'MRS-Routine - '+AB.getResourceImg(session.get('ASRes_toFetch'))+" &nbsp;&nbsp;for <b><i>"+city+"</i></b> delivered.";
				AB.log("AB State 5, Supplier State "+session.get('ASState')+' MRS-Routine: '+AB.getResourceImg(session.get('ASRes_toFetch'))+' for '+city);
				AB.displayWaitBox(" Auto Supply ", det);
			}
		},
		goSeeMerchantNavy:function (){
			AB.log("going to See Merchant Navy for Empire Board");
			AB.goTo(AB.cityId, "?view=merchantNavy");
			return true;
		},
		saveData:function (){
			session.set('AS_Jobs', uneval(this.Jobs));
		},
		getData:function (){
			this.Jobs = session.get('AS_Jobs')? eval(session.get('AS_Jobs')) : {jobs:[]};
		},
		clearData:function (){
			 session.remove('AS_Jobs');
			 //session.remove('ASState');
			 session.remove('ASRes_toFetch');
			 session.remove('ASavres');
			 session.remove('ASTargetCid');
		},
		finish:function (){
			AB.log("Autosupplier finished, state: "+session.get('ASState'));
			var state = Number(session.get('ASState'));
			if(state != 0) {
				this.displayWaitBox();
				initNOTIFIER();
				NOTIFIER.updateFleetMovements(1);
			}
			AB.Supplier.clearData();
			session.set('ABState', AB.state=0);
			session.set('ASState', 0);
			session.set('ASLastJobTs', AB.ts); // save time of this job for future checks
			if(state != 0) return !AB.isReturnPage();
			return false;
		},
	},
	
	setBuildTimeout: function(cid){
		AB.log("setting BuildTimeout: "+((this.timeout+this.goDelay))+" sec (timeout: "+Math.round(this.timeout)+") in min:"+(this.timeout/60000));
		this.timeoutH = setTimeout(function(){try{AB.log("Building from timeout"); AB.build(cid)}catch(e){AB.error(e)};}, Math.round(this.timeout+this.goDelay));

		if(this.Reloader.reloaderObj){
			var lvl = this.getBuildingLevel(cid, this.Data.cities[cid].queue[0].type, this.Data.cities[cid].queue[0].pos);
			this.setStatusTxt('<b>'+this.Cities[cid].city_name+":</b> ["+this.getBuildingName(this.Data.cities[cid].queue[0].type)+"-<b>"+(lvl+1)+"</b>]", "Next task in the queue");
			this.tickerIntervalH = setInterval( function(e){try{AB.tickerF(e);}catch(e){AB.error(e);}}, 1000*this.tickerInterval);
		}
	},
	
	setStatusTxt: function(txt, title){
		if(this.Reloader.reloaderObj){
			this.Reloader.statusTxtObj.innerHTML = txt;
			if(title) this.Reloader.statusTxtObj.title = title;
			this.Reloader.statusObj.style.display = txt?null:"none";
		}
	},
	
	tickerF: function(){
		var mi = this.timeout-(new Date()).getTime()+this.ts;
		this.Reloader.taskCountdownObj.innerHTML = "<span style=\"margin-left:5px;\"></span>"+this.getFormatedCountdownString(mi);
	},
	
	build: function(cid){	// cid = cityID of the target page
		AB.log("Building in city:"+cid);
		var building = this.Data.cities[cid].queue[0];
		if(!building){
			session.set('ABState', AB.state=0);
			this.clearSessionData();
			return false;
		}
		this.displayWaitBox("Build");
	// ----- session vars:
		if(!session.get('buildAssignment')) session.set('buildAssignment', cid);	// (faster)
		if(this.toReturnAfterBuild && AB.state != 1 && !session.get("AB_toreturn")){
			if(this.view != "buildingGround" && !(building.type == this.view && building.pos == this.position)){
				AB.saveReturnURL();
				session.set("AB_toreturn", 1);
			}
			else session.set("AB_toreturn", 0);
		}
		this.toReturnAfterBuild = Number(session.get("AB_toreturn"));
		session.set('ABState', AB.state=1);
		clearInterval(this.tickerIntervalH);
	// ----- Go to building page or send build request:
		if(this.cityId == cid && this.position !== false && this.position == building.pos){
		// ----- Ziel-Positionsseite, Zielstadt
			AB.log("page is the target page");
			if(this.view == "buildingGround"){
			// ----- Neues Gebäude errichten
				var elems = $('#buildings li.building');
				var a, r, e = (r=Xpath("//ul[@id='buildings']/li", 1)).iterateNext();
				if(e) do{ 
				// find the building in list
						if(building.type == this.getBuildingFromStr(e.className)) {
							// get build link
							if(a=Xpath(".//a[@class='button build']", 0, e)){
								this.buildNow(cid, a.href);
								return true;
							}
							else {
								// Possible Time Calculation Error, reload the page
								session.set('ABState', AB.state=2);
								AB.Reloader.reload();
								AB.log("error getting build link on construction ground!");
								throw new Error("error getting build link on construction ground.");
							}
						}
				} while(e = r.iterateNext())
				else if($("buildingUpgrade")){
					// Empire Board Data was outdated! Building has been constructed but was not tracked by Empire Board
					// check if its in the tracking Object now
					var b = this.Cities[cid].buildings[building.type];
					if(b && b.position == building.pos){
						this.view = building.type;
						this.build(cid);	// build with correct data
						return true;
					}
					else { // there is a different building, data is not correct, delete it
						this.Data.cities[cid].queue.splice(0,1);
						session.set('ABState', AB.state=this.toReturnAfterBuild?2 : 3); // set return task
						this.Reloader.reload();
					}
				}
				else throw new Error("error getting buildings on construction ground. 1");
				
				
			}
			else if(this.view == building.type){
			// ----- Upgrade building
				var a;
				if($('upgradeInProgress')){
					session.set('ABState', AB.state=2);
					this.goTo(cid, "?view=city");
					return true;
				}
				else if((a=Xpath("//div[@id='buildingUpgrade']//li[@class='upgrade']/a")) && a.href.indexOf("upgradeBuilding") > 0) {
						this.buildNow(cid, a.href );
						return true;
				}
				else throw new Error("upgrade error! Failed to get link element.");
			}
			else throw new Error("build error! view does not match building on target page");
		}
		else{
		// ----- Zur Gebäudeseite gehen
			AB.log("page is not the target page");
			var lvl = this.getBuildingLevel(cid, building.type, building.pos);
			var view = lvl? building.type : "buildingGround";	// prüfen ob neues Gebäude
			this.goTo(cid, '/index.php?view=' + view + '&id=' + cid + '&position=' +building.pos);
		}
	},
	
	buildNow: function(cid, url){
		if(url[0] == "?") url = this.baseURL + url;
		this.Data.cities[cid].queue.splice(0,1);
		this.saveData();
		session.set('ABState', AB.state=this.toReturnAfterBuild? 2 : 3); // set return task
		if(this.enabled) this.goTo(cid, url);	// perform action
	},
	
	goTo: function(cityId, url){
		document.body.style.cursor = "wait";
		url = url[0]=="/" ? 'http://' +document.domain+ url : url;
		if(url[0] == "?") url = AB.baseURL+ url;
		AB.log("Going to: "+url);
		function go(){
			if(cityId != AB.cityId){
				var postdata = "";
				var elems = document.getElementById('changeCityForm').getElementsByTagName('fieldset')[0].getElementsByTagName('input');
				for(var i = 0; i < elems.length; i++) {
					postdata += "&" + elems[i].name + "=" + elems[i].value;
				}
				postdata += "&cityId="+cityId+"&view=city";
				
				var xmlhttp;
				if(window.XMLHttpRequest){
					xmlhttp = new XMLHttpRequest();
				}
				xmlhttp.open('POST','http://' + location.host + '/index.php',true);
				xmlhttp.setRequestHeader('User-agent',window.navigator.userAgent);
				xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
				xmlhttp.setRequestHeader('Accept','application/atom+xml,application/xml,text/xml');
				xmlhttp.setRequestHeader('Referer','http://' + location.host + '/index.php');
				xmlhttp.overrideMimeType('text/javascript; charset='+document.characterSet);
				xmlhttp.onreadystatechange = function() {
					try{
						if(this.readyState == 4){
							if(this.status == 200) location.assign(url);
							else AB.goTo(cityId, url)
						}
					} catch (e){AB.error(e)}
				}
				xmlhttp.send(postdata);
			}
			else location.assign(url);
			setTimeout(AB.Reloader.reload, 30000);
		}
		setTimeout(go, this.goDelay);
	},
	
	// From city view
	addToQueue: function(posInQueue){	
		AB.log("addToQueue Button clicked");
		this.renewSavedData();
		var i, cid = AB.selectedBuilding.cid; 
		var building = new Building(AB.selectedBuilding.type, AB.selectedBuilding.pos);
		if(!(this.Cities[AB.selectedBuilding.cid].buildings[building.type] && this.Cities[AB.selectedBuilding.cid].buildings[building.type].levels[building.pos])){
			alert("Selection Error! type:"+building.type+", pos:"+building.pos+", cid:"+cid);
			return false;
		}
		this.Data.cities[cid].queue.push(building);
		if(posInQueue != null && !isNaN(posInQueue) && posInQueue<this.Data.cities[cid].queue.length && this.Data.cities[cid].queue.length>1){
			var i=this.Data.cities[cid].queue.length-1, t = this.Data.cities[cid].queue[i];
			do{this.Data.cities[cid].queue[i] = this.Data.cities[cid].queue[--i]} while(i>posInQueue)
			this.Data.cities[cid].queue[posInQueue] = t;
		}
		this.saveData();
		
		if(this.Data.cities[cid].queue.length == 1 || posInQueue === 0) this.checkQueue(); // Falls Gebäudeliste leer, prüfe neuen Bauauftrag sofort
		this.updateQueue();
		if(this.taskOverviewObj) this.updateQueue(cid, AB.overviewQueueContainers[cid]);
	},
	
	// From Building view/ ConstructionGround
	addToQueueF: function(e, type){	// type = building name. If set, view is a buildingGround; otherwise view is a constructed building
		AB.log("addToQueueF Button clicked");
		this.renewSavedData();	// renew saved data object in case things changed in another tab
		var i, cid = this.cityId;
		if(this.pageCityId) cid= this.pageCityId;
		
		AB.log("cityId: "+cid+" , this.pageCityId: "+this.pageCityId+" , this.cityId: "+this.cityId);
		if(type && (i=this.isBuildingInQueue(this.position, cid))!==false){ 
			this.Data.cities[cid].queue.splice(i,1);
		}
		this.Data.cities[cid].queue.push(this.getBuilding(type));
		this.saveData();
		
		if(this.Data.cities[cid].queue.length == 1) this.checkQueue(); 
		this.updateQueue();
		if(this.taskOverviewObj) this.updateQueue(cid, AB.overviewQueueContainers[cid]);
	},

	isBuildingInQueue: function(pos, cityID){	// pos = position of building, [cityID] optional
		for(var i in this.Data.cities[(cityID||this.cityId)].queue){
			if(this.Data.cities[(cityID||this.cityId)].queue[i].pos == pos) return i;
		}
		return false;
	},
	
	getBuilding: function(type){
		var building = new Building(type||this.view, this.position);
		return building;
	},
};




// ----------- AUXILLARY FUNCTIONS: ----------------------------------------
// All functions by Klaus_ http://userscripts.org/users/90700 - maximum performance
function gET(n,z,c){return z==null||isNaN(z)?(c||document).getElementsByTagName(n):(c||document).getElementsByTagName(n)[z];};
function Add(html, element){	// adds the HTML in a span node to element
	if(typeof html == "string"){
		var s; (element||document.body).appendChild(s=document.createElement("span"));
		s.innerHTML = html;
		return s;
	}
	else if(html.nodeName) return (element||document.body).appendChild(html); else return false;
}
function ADD(html, element){	// appends the HTML to the element, returns the last inserted node
	if(typeof html == "string"){
		var t, e, s = document.createElement("span");
		element = element && element.nodeName? element:document.body;
		s.innerHTML = html;
		e = s.firstChild;
		if(e) do{
			t = element.appendChild(e);
		} while(e = s.firstChild)
		return t;
	}
	else if(html.nodeName) return (element||document.body).appendChild(html); else return false;
}
function queryString(parameter, caseSensitivity, paramStr) {	// returns false if parameter not found
		  var t, key, value, params;
		  if(paramStr) params = paramStr.slice(paramStr.indexOf("?")+1).split("&");
		  else params = location.search.slice(1).split("&");
		  for (var i in params) {
			  if((t = params[i].indexOf('=')) === -1) continue;
			  key = params[i].substring(0, t);
			  value = params[i].substring(t+1);
			  if ((!caseSensitivity && key.toLowerCase() == parameter.toLowerCase()) || key == parameter) {
				  return value;
			  }
		  }
		  return false;
}
function trim(str){
			var start = -1, end = str.length;
			while( str.charCodeAt(--end) < 44 );
			while( str.charCodeAt(++start) < 44 );
			return str.slice( start, end + 1 );
}
function Timestamp(){return (new Date()).getTime()}
function Max(array){
	if(!Max.arguments.length) return 0;
	else if(Max.arguments.length===1 && Max.arguments[0] instanceof Array){
		var max = null;
		for each(var i in Max.arguments[0]) if(max === null || i > max) max = i;
	}
	else {
		var i = 0, max = Max.arguments[i];
		while(++i < Max.arguments.length) if(Max.arguments[i]>max) max=Max.arguments[i];
	}
	return max;
}
function Min(){
	if(!Min.arguments.length) return 0;
	else if(Min.arguments.length===1 && Min.arguments[0] instanceof Array){
		var min = null;
		for each(var x in Min.arguments[0])if(min === null || x < min) min = x;
	}
	else {
		var i = 0, min = Min.arguments[i];
		while(++i < Min.arguments.length) if(Min.arguments[i]<min) min=Min.arguments[i];
	}
	return min;
}
function Xpath(XP, type, context){
	switch(type){
		case 1:
		case "i":
		case "I":
		case "iterator":
			return document.evaluate(XP, context||document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
		case 2:
		case "i":
		case "I":
		case "snap":
		case "snapshot":
			return document.evaluate(XP, context||document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		default:
			return document.evaluate(XP, context||document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	}
}
function Xp(XP, asArray, context, doc, nsr){
	doc = doc ? doc.evaluate ? doc : doc.ownerDocument : document;
	if(!asArray) return doc.evaluate(XP, context||doc, nsr, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	else{
		var a = [], r, e = (r=doc.evaluate(XP, context||doc, nsr, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null)).iterateNext();
		if(e) do{a.push(e)} while(e=r.iterateNext())
		return a;
	}
}
function XP(XP, asArray, context, doc, nsr){ // returns false if nothing is found
	doc = doc ? doc.evaluate ? doc : doc.ownerDocument : document;
	if(!asArray) return doc.evaluate(XP, context||doc, nsr, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	else{
		var r, e = (r=doc.evaluate(XP, context||doc, nsr, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null)).iterateNext();
		if(e) {var a = []; do{a.push(e)} while(e=r.iterateNext()) return a;}
		return false;
	}
}
function removeCommas(s){
	var i=-1, s2 = "";
	while(++i < s.length){
	    if(s[i]!=",") s2 += s[i];
	}
	return s2;
}
function addCommas(s){
	s = trim(String(s));
	var j, i, t, s2 = "", p = "";
	if(s[0]=='-'){
		p = "-";
		s = s.slice(1);
	}    
	if((j=s.indexOf("."))>=0) {t = s.slice(j); s = s.slice(0, j);}
	else t = "";
	for(i =0, j = s.length; i < s.length; ++i){
		s2 += s[i]+(--j%3 || i==s.length-1?"":",");	
	}
	return p+s2+t;
}
String.prototype.lastOf = function(char){
	var i = this.length;
	while(--i >= 0) if(this[i] == char) return i;
	return false;
}
function strcspn (str, mask, start, length) {
	if(mask.indexOf(" ")!==-1) mask += String.fromCharCode(160);
    start = start ? start : 0;
    length = (length!=null && ((start + length) < str.length)) ? start + length : str.length;
    for (var i=start; i < length; i++) {
        for (var j=0; j < mask.length; j++) {
            if (mask.charAt(j).indexOf(str[i]) >= 0) {
                return i;
            }
        }
    }
    return false
}
function searchWord(s, w){
	var i = 0, p;
	while((p = strcspn(s, " \r\n\t.-+_#", i)) !== false){
		if(p==i) ++i;
		else{
			if(s.slice(i, p) == w) return true;
			else if(++p == s.length) return false;
			else i = p;
		}
	}
	return s.slice(i) == w;
}
function strReplace(s, chars, replace){
	var i = 0, p;
	while((p = strcspn(s, chars, i)) !== false){
		s = s.slice(0, p)+replace+s.slice(p+1);
		i = p+1;
	}
	return s;
}




















function createBuildingsObj(){	// we only create this huge Object when we really need it
	if(typeof Buildings == "undefined")
		Buildings = {
	academy:	{
			wood: [64, 68, 115, 263, 382, 626, 982, 1330, 2004, 2665, 3916, 5156, 7446, 9753, 12751, 18163, 23691, 33451, 43571, 56729, 73832, 103459, 144203, 175058, 243930, 317208, 439967, 536310, 743789, 1027469, 1257244, 1736681],
			glass: [0,0,0,0, 225, 428, 744, 1089, 1748, 2454, 3786, 5216, 7862, 10729, 14599, 21627, 29321, 43020, 58213, 78724, 106414, 154857, 224146, 282571, 408877, 552141, 795252, 1006647, 1449741, 2079650, 2642546, 3790581],
			marble: 0,
			sulfur: 0,
			wine: 0
		},
	alchemist:	{
			wood: [274, 467, 718, 1045, 1469, 2021, 2738, 3671, 4883, 6459, 8508, 11172, 14634, 19135, 24987, 32594, 42483, 55339, 72050, 93778, 122021, 158740, 206471, 268524, 349194, 454063, 590393, 767620, 998018, 1297535, 1686906, 2193088],
			glass: 0,
			marble: [0,116, 255, 436, 671, 977, 1375, 1892, 2564, 3437, 4572, 6049, 7968, 10462, 13705, 17921, 23402, 30527, 39790, 51830, 67485, 87835, 114289, 148680, 193389, 251512, 327069, 425294, 552986, 718987, 934789, 1215329],
			sulfur: 0,
			wine: 0
		},
	architect:	{
			wood: [185, 291, 413, 555, 720, 911, 1133, 1390, 1689, 2035, 2437, 2902, 3443, 4070, 4797, 5640, 6618, 7754, 9070, 10598, 12369, 14424, 16807, 19573, 22780, 26501, 30817, 35826, 41631, 48371, 56185, 65251],
			glass: 0,
			marble: [106, 160, 222, 295, 379, 475, 587, 716, 865, 1036, 1233, 1460, 1722, 2023, 2369, 2767, 3226, 3752, 4358, 5056, 5857, 6778, 7836, 9052, 10448, 12054, 13899, 16289, 18450, 21246, 24455, 28141],
			sulfur: 0,
			wine: 0
		},
	barracks:	{
			wood: [48, 114, 195, 296, 420, 574, 766, 1003, 1297, 1662, 2115, 2676, 3371, 4234, 5304, 6630, 8275, 10314, 12843, 15979, 19868, 24690, 30669, 38083, 47277, 58676, 72812, 90341, 112076, 139028, 172448, 213889, 265276, 328996, 408008, 505984],
			glass: 0,
			marble: [0,0, 0, 0, 0, 0, 0, 0, 178, 431, 745, 1134, 1616, 2214, 2956, 3875, 5015, 6429, 8183, 10357, 13052, 16395, 20540, 25680, 32054, 39957, 49757, 61909, 76977, 95661, 118830, 147560, 183185, 227359, 282136, 350059],
			sulfur: 0,
			wine: 0
		},
	branchOffice:	{
			wood: [48, 173, 346, 581, 896, 1314, 1863, 2580, 3509, 4706, 6241, 8203, 10699, 13866, 17872, 22926, 29286, 37272, 47283, 59806, 75447, 94954, 119245, 149453, 186977, 233530, 291225, 362658, 451015, 560208, 695038, 861391],
			glass: 0,
			marble: [0,0,0,0,540, 792, 1123, 1555, 2115, 2837, 3762, 4945, 6450, 8359, 10774, 13820, 17654, 22469, 28503, 36051, 45482, 57240, 71883, 90092, 112712, 121067, 175556, 218617, 271878, 337705, 418983, 446564],
			sulfur: 0,
			wine: 0
		},
	carpentering:	{
			wood: [63, 122, 191, 274, 372, 486, 620, 777, 962, 1178, 1432, 1730, 2078, 2486, 2964, 3524, 4178, 4945, 5841, 6890, 8117, 9550, 11229, 13190, 15484, 18166, 21299, 24963, 29245, 34247, 40096, 46930],
			glass: 0,
			marble: [0,0,0,0,0,0,0,359, 444, 546, 669, 816, 993, 1205, 1459, 1765, 2131, 2571, 3097, 3731, 4490, 5402, 6496, 7809, 9383, 11274, 13543, 16265, 19531, 23450, 28154, 33798],
			sulfur: 0,
			wine: 0
		},
	embassy:	{

			wood: [242, 415, 623, 873, 1173, 1532, 1964, 2482, 3103, 3849, 4743, 5817, 7105, 8651, 10507, 12733, 15610, 18498, 22457, 27074, 32290, 33764, 47240, 56812, 70157, 84318, 101310, 121979, 146503, 175932, 222202, 266778],
			glass: 0,

			marble: [155, 342, 571, 850, 1190, 1606, 2112, 2730, 3484, 4404, 5527, 6896, 8566, 10604, 13090, 16123, 19824, 24339, 29846, 36564, 45216, 47097, 66967, 81859, 104537, 129580, 158759, 193849, 236659, 288888, 358869, 437985 ],
			sulfur: 0,
			wine: 0
		},
	fireworker:	{
			wood: [272, 353, 445, 551, 673, 813, 974, 1159, 1373, 1618, 1899, 2223, 2596, 3025, 3517, 4084, 4736, 5485, 6346, 7338, 8478, 9790, 11297, 13030, 14990, 17317, 19954, 22986, 26472, 30484, 35096, 40398],
			glass: 0,
			marble: [135, 212, 302, 405, 526, 665, 827, 1015, 1233, 1486, 1779, 2120, 2514, 2972, 3503, 4119, 4834, 5662, 6623, 7738, 9032, 10534, 12275, 13355, 16636, 19354, 22507, 26163, 30404, 35325, 41033, 47652],
			sulfur: 0,
			wine: 0
		},
	forester:	{
			wood: [250, 430, 664, 968, 1364, 1878, 2546, 3415, 4544, 6013, 7922, 10403, 13629, 17823, 23274, 30362, 39574, 51552, 67123, 87363, 113680, 147889, 192360, 250173, 325258, 423034, 550049, 715169, 929826, 1208878, 1571646, 2043246],
			glass: 0,
			marble: [0,104, 237, 410, 635, 928, 1309, 1803, 2446, 3282, 4368, 5781, 7617, 10422, 13108, 17142, 22386, 29204, 38068, 49589, 64569, 84041, 109356, 142266, 185046, 240663, 312965, 406956, 529144, 687989, 894489, 1162937],
			sulfur: 0,
			wine: 0
		},
	glassblowing:	{
			wood: [274, 467, 718, 1045, 1469, 2021, 2738, 3671, 4883, 6459, 8508, 11172, 14634, 19135, 24987, 32594, 42483, 55339, 72050, 93778, 122021, 158740, 206471, 268524, 349194, 454063, 590393, 767620, 998018, 1297535, 1686906, 2193088],
			glass: 0,
			marble: [0,116, 255, 436, 671, 977, 1375, 1892, 2564, 3437, 4572, 6049, 7968, 10462, 13705, 17921, 23402, 30527, 39790, 51830, 67485, 87835, 114289, 148680, 193389, 251512, 327069, 425294, 552986, 718987, 934789, 1215329],
			sulfur: 0,
			wine: 0
		},
	museum:	{
			wood: [560, 1435, 2748, 4716, 7669, 12099, 18744, 28710, 43661, 66086, 99724, 150181, 225866, 339394, 509686, 765124, 1148280, 1723016, 2585120, 3878276],
			glass: 0,
			marble: [280, 1190, 2573, 4676, 7871, 12729, 20112, 31335, 48394, 74323, 113736, 173643, 264701, 403110, 613492, 933272, 1419338, 2158157, 3281164, 4988135],
			sulfur: 0,
			wine: 0
		},
	optician:	{
			wood: [119, 188, 269, 362, 471, 597, 742, 912, 1108, 1335, 1600, 1906, 2261, 2673, 3152, 3706, 4348, 5096, 5962, 6966, 8131, 9482, 11050, 12868, 14978, 17424, 20262, 23553, 27373, 31804, 36943, 42904],
			glass: 0,
			marble: [0,35, 96, 167, 249, 345, 455, 584, 733, 905, 1106, 1338, 1608, 1921, 2283, 2704, 3191, 3759, 4416, 5178, 6062, 7087, 8276, 9656, 11257, 13113, 15267, 17762, 20662, 24024, 27922, 32447],
			sulfur: 0,
			wine: 0
		},
	palace:	{
			wood: [712, 5823, 16048, 36496, 77392, 159184, 322768, 649936, 1304272, 2612944, 4743517],
			glass: [0,0,0,0,21188, 42400, 84824, 169672, 339368, 678760, 1357543],
			marble: [0,1433, 4546, 10770, 23218, 48114, 97906, 197490, 396658, 794994, 1591666],
			sulfur: [0,0,3088, 10300, 24725, 53573, 111269, 226661, 457445, 919013, 1842149],
			wine: [0,0,0,10898, 22110, 44534, 89382, 179078, 358470, 717254, 1434821]
		},
	palaceColony:	{
			wood: [712, 5823, 16048, 36496, 77392, 159184, 322768, 649936, 1304272, 2612944, 4743517],
			glass: [0,0,0,0,21188, 42400, 84824, 169672, 339368, 678760, 1357543],
			marble: [0,1433, 4546, 10770, 23218, 48114, 97906, 197490, 396658, 794994, 1591666],
			sulfur: [0,0,3088, 10300, 24725, 53573, 111269, 226661, 457445, 919013, 1842149],
			wine: [0,0,0,10898, 22110, 44534, 89382, 179078, 358470, 717254, 1434821]
		},
	port:	{
			wood: [60, 150, 274, 429, 637, 894, 1207, 1645, 2106, 2735, 3537, 4492, 5689, 7103, 8850, 11094, 13731, 17062, 21097, 25965, 31810, 39190, 47998, 58713, 71955, 87627, 107102, 130776, 159019, 193938, 235849, 286514, 348718, 423990, 513947, 625160, 758178, 919693, 1116013, 1353517, 1642274, 1990223, 2411061],
			glass: 0,
			marble: [0,0,0,0,0,176, 326, 540, 791, 1138, 1598, 2176, 2928, 3859, 5051, 6628, 8566, 11089, 14265, 18241, 23197, 29642, 37636, 47703, 60556, 76367, 96639, 122156, 153753, 194089, 244300, 307174, 386955, 486969, 610992, 769302, 965792, 1212790, 1523570, 1913072, 2403313, 3015688, 3782992],
			sulfur: 0,
			wine: 0
		},
	safehouse:	{
			wood: [113, 248, 402, 578, 779, 1007, 1267, 1564, 1903, 2288, 2728, 3230, 3801, 4453, 5195, 6042, 7008, 8108, 9363, 10793, 12423, 14282, 16401, 18816, 21570, 24709, 28288, 32368, 37019, 42321, 48365, 55255],
			glass: 0,
			marble: [0,0,0,129, 197, 275, 366, 471, 593, 735, 900, 1090, 1312, 1569, 1866, 2212, 2613, 3078, 3617, 4243, 4968, 5810, 6787, 7919, 9233, 10758, 12526, 14577, 16956, 19716, 22917, 26631],
			sulfur: 0,
			wine: 0
		},
	shipyard:	{
			wood: [98, 202, 324, 477, 671, 914, 1222, 1609, 2096, 2711, 3485, 4459, 5688, 7238, 9190, 11648, 14746, 18650, 23568, 29765, 37573, 47412, 59808, 75428, 95108, 119906, 151151, 190520, 240124, 302626, 381378, 480605],
			glass: 0,
			marble: [0,0, 0, 0, 0, 778, 1052, 1397, 1832, 2381, 3070, 3941, 5037, 6420, 8161, 10354, 13118, 16601, 20989, 26517, 33484, 42261, 53321, 67256, 84814, 106938, 134814, 169937, 214192, 269954, 340214, 428741],
			sulfur: 0,
			wine: 0
		},
	stonemason:	{
			wood: [274, 467, 718, 1045, 1469, 2021, 2738, 3671, 4883, 6459, 8508, 11172, 14634, 19135, 24987, 32594, 42483, 55339, 72050, 93778, 122021, 158740, 206471, 268524, 349194, 454063, 590393, 767620, 998018, 1297535, 1686906, 2193088],
			glass: 0,
			marble: [0,116, 255, 436, 671, 977, 1375, 1892, 2564, 3437, 4572, 6049, 7968, 10462, 13705, 17921, 23402, 30527, 39790, 51830, 67485, 87835, 114289, 148680, 193389, 251512, 327069, 425294, 552986, 718987, 934789, 1215329],
			sulfur: 0,
			wine: 0
		},
	temple:	{
			wood: [216, 228, 333, 465, 598, 760, 958, 1197, 1432, 1773, 2112, 2512, 3082, 3655, 4458, 5126, 6232, 7167, 8687, 10247, 11784, 14228, 16752, 19265, 23156, 26663, 32026, 36830, 43256, 50782, 59591, 68528],
			glass: 0,
			marble: [172, 189, 290, 423, 566, 752, 988, 1290, 1610, 2080, 2586, 3210, 4109, 5084, 6471, 7765, 9850, 11821, 14952, 18402, 22082, 27824, 34183, 41020, 51514, 61817, 77477, 92972, 113941, 139576, 170910, 205093],
			sulfur: 0,
			wine: 0
		},
	tavern:	{
			wood: [101, 222, 367, 541, 750, 1001, 1302, 1663, 2097, 2617, 3241, 3990, 4888, 5967, 7261, 8814, 10678, 12914, 15598, 18818, 22683, 27320, 32885, 39562, 47576, 57192, 68731, 82578, 99194, 119134, 143061, 171774, 206230, 247577, 297193, 356732, 428179, 513916, 616800, 740261, 888413, 1066196, 1279537, 1535545, 1842756, 2211407, 2653789 ],
			glass: 0,
			marble: [0,0,0,94, 122, 158, 206, 267, 348, 452, 587, 764, 993, 1290, 1677, 2181, 2835, 3685, 4791, 6228, 8097, 10526, 13684, 17789, 23125, 30063, 39082, 50806, 66048, 85862, 111621, 145107, 188640, 245232, 318801, 414441, 538774, 700406, 910528, 1183686, 1538791, 2000427, 2600557, 3380725, 4394943, 5713425, 7427454],
			sulfur: 0,
			wine: 0
		},
	townHall:	{
			wood: [0,158, 335, 623, 923, 1390, 2015, 2706, 3661, 4776, 6173, 8074, 10281, 13023, 16424, 20986, 25423, 32285, 40232, 49286, 61207, 74804, 93956, 113035, 141594, 170213, 210011, 258875, 314902, 387656, 471194, 572580, 695615, 854728, 1037814, 1274043, 1714396, 1876185, 2276285, 2761291],
			glass: 0,
			marble: [0,0,0,0,285, 551, 936, 1411, 2091, 2945, 4072, 5664, 7637, 10214, 13575, 18254, 23250, 31022, 40599, 52216, 68069, 87316, 115101, 145326, 191053, 241039, 312128, 403825, 515593, 666228, 850031, 1084292, 1382826, 1783721, 2273685, 2930330, 3692589, 4756439, 6058680, 7716365],
			sulfur: 0,
			wine: 0
		},
	vineyard:	{
			wood: [339, 423, 520, 631, 758, 905, 1074, 1269, 1492, 1749, 2045, 2384, 2775, 3225, 3741, 4336, 5019, 5813, 6875, 7941, 8944, 10319, 11900, 13718, 15809, 18215, 20978, 24159, 27816, 32021, 36857, 42419],
			glass: 0,
			marble: [123, 198, 285, 387, 504, 640, 798, 981, 1194, 1440, 1726, 2058, 2443, 2889, 3407, 4008, 4705, 5513, 6450, 7537, 8800, 10263, 11961, 13930, 16214, 18864, 21938, 25503, 29639, 34437, 40002, 46457],
			sulfur: 0,
			wine: 0
		},
	wall:	{
			wood: [114, 361, 657, 1012, 1439, 1951, 2565, 3302, 4186, 5247, 6521, 8049, 9882, 12083, 14724, 17892, 21695, 26258, 31733, 38304, 46189, 55650, 67004, 80629, 96979, 116599, 140143, 168395, 202298, 242982, 291802, 350387, 420689, 505049, 606284, 727765, 873541, 1048473, 1258393, 1510294, 1812577, 2175317, 2610603, 3132948, 3759764],
			glass: 0,
			marble: [0,203, 516, 892, 1344, 1885, 2535, 3315, 4251, 5374, 6721, 8338, 10279, 12608, 15402, 18755, 22779, 27607, 33402, 40355, 48699, 58711, 70726, 85144, 102446, 123208, 148122, 178019, 213896, 256948, 308610, 370605, 444998, 534270, 641397, 769949, 924213, 1109328, 1331467, 1598031, 1917913, 2301767, 2762392, 3315144, 3978446],
			sulfur: 0,
			wine: 0
		},
	warehouse:	{
			wood: [160, 288, 442, 626, 847, 1113, 1431, 1813, 2272, 2822, 3483, 4275, 5226, 6368, 7737, 9380, 11353, 13719, 16559, 19967, 24056, 28963, 34852, 41918, 50398, 60574, 72784, 87437, 105021, 126121, 151441, 181825, 218286, 262039, 314543, 377548, 453153, 543880, 652752, 783398],
			glass: 0,
			marble: [0,0,0,96, 211, 349, 515, 714, 953, 1240, 1584, 1997, 2492, 3086, 3800, 4656, 5683, 6915, 8394, 10169, 12299, 14855, 17922, 21602, 26019, 31319, 37678, 45310, 54468, 65458, 78645, 94471, 113461, 136249, 163595, 196409, 235787, 283041, 339745, 407790 ],
			sulfur: 0,
			wine: 0
		},
	winegrower:	{
			wood: [274, 467, 718, 1045, 1469, 2021, 2738, 3671, 4883, 6459, 8508, 11172, 14634, 19135, 24987, 32594, 42483, 55339, 72050, 93778, 122021, 158740, 206471, 268524, 349194, 454063, 590393, 767620, 998018, 1297535, 1686906, 2193088],
			glass: 0,
			marble: [0,116, 255, 436, 671, 977, 1375, 1892, 2564, 3437, 4572, 6049, 7968, 10462, 13705, 17921, 23402, 30527, 39790, 51830, 67485, 87835, 114289, 148680, 193389, 251512, 327069, 425294, 552986, 718987, 934789, 1215329],
			sulfur: 0,
			wine: 0
		},
	workshop:	{
			wood: [206, 383, 569, 781, 1023, 1299, 1613, 1972, 2380, 2846, 3377, 3982, 4672, 5458, 6355, 7377, 8542, 9870, 11385, 13111, 15078, 17714, 19481, 22796, 26119, 29909, 34228, 39153, 44766, 51166, 58462, 66778],
			glass: 0,
			marble: [89, 167, 251, 349, 461, 592, 744, 920, 1125, 1362, 1637, 1956, 2326, 2755, 3253, 3831, 4500, 5279, 6180, 7226, 8439, 9776, 11477, 13373, 15570, 18118, 21074, 24503, 28481, 33095, 38447, 44656],
			sulfur: 0,
			wine: 0
		},
	dump:	{
			wood: [640, 1152, 1766, 2504, 3388, 4450, 5724, 7253, 9088, 11289, 13931, 17101, 20905, 25470, 30948, 37522, 45410, 54876, 66236, 79867, 96223, 115852, 139407, 167672, 201592, 242293, 291136, 349749, 420081, 504483, 605763, 727300, 873143, 1048157, 1258171, 1510191, 1812613, 2175519, 2611007, 3133592],
			glass: [701, 1146, 1668, 2278, 2991, 3526, 4803, 5946, 7283, 8847, 10678, 12819, 15324, 18257, 21687, 25700, 30395, 35889, 42316, 49837, 58635, 68929, 80973, 95065, 111553, 130843, 153414, 179821, 201716, 246864, 289157, 338642, 396536, 464274, 543528, 636253, 744742, 871676, 1020187, 1193945],
			marble: [497, 932, 1445, 2051, 2762, 3609, 4604, 5778, 7164, 8799, 10728, 13005, 15691, 18862, 22602, 27016, 32225, 38371, 45623, 54181, 64278, 76194, 90256, 106847, 126424, 149528, 176787, 208956, 246913, 291702, 344555, 406921, 480512, 567350, 669817, 790730, 933408, 1101767, 1300431, 1534855],
			sulfur: [384, 845, 1398, 2061, 2858, 3813, 4960, 6336, 7987, 9968, 12346, 15199, 18623, 22731, 27661, 33578, 40677, 49197, 59420, 71688, 86409, 104076, 125274, 150714, 181241, 217872, 261830, 314581, 377881, 453842, 544994, 654378, 785637, 943149, 1132163, 1358979, 1631159, 1957774, 2349714, 2820041],
			wine: 0
		}
	};
}



 
function initEQUALIZER(){
	if(typeof EQUALIZER !== "undefined") return;
	EQUALIZER = {
		enabled: true,
		tolerance: 200,
		jsd: 1000*60*0,
		init: function(){
			try{
				this.lastJob = session.get('EQU_lastJobTs') || 0;
				this.enabled = AB.Data.Equalizer.enabled;
			}
			catch(e){AB.error(e)}
		},
		clearSessionData: function(){
			session.remove("EQU_Job");
			session.remove("EQU_state");
		},
		check: function(){
			AB.log("Equalizer check");
			if(!this.enabled || !AB.ships) return false;
			if(AB.ts - this.lastJob < this.jsd) {
				AB.log("Equalizer failed timestamp test, last: "+this.lastJob);
				return false;
			}
			var id, res, diff, ships = AB.ships;
			this.Job = {jobs:[]};
			this.jobs = this.Job.jobs;
			var avRes = {wood:0, marble:0, glass:0, sulfur:0, wine:0};
			var cRes = {wood:[], marble:[], glass:[], sulfur:[], wine:[]};
			for(id in AB.Cities){
				for(res in avRes){
					if(AB.Cities[id].prodgood != res && AB.Data.Equalizer.res[res]) {
						avRes[res] += AB.updatedCityResources[id][res];
						AB.Supplier.sorteinf(cRes[res], {v:AB.updatedCityResources[id][res], id:id});
					}
				}
			}
			for(res in avRes){
				avRes[res] /= cRes[res].length;
			}

			var u, o, req, ava, job;
			for(res in cRes){
				u = 0, o = cRes[res].length-1;
				while(u < o){
					AB.log("res: "+res+", u: "+u+", o: "+o);
					diff = cRes[res][cRes[res].length-1].v - cRes[res][0].v;
					if(cRes[res][o].v > avRes[res]+(AB.Supplier.RCS+this.tolerance) && cRes[res][u].v < avRes[res]-(AB.Supplier.RCS+this.tolerance)){
						if(!Number(AB.Cities[cRes[res][o].id].actions)) continue;
						if(AB.Data.cities[cRes[res][o].id].queue.length){
							var type = AB.Data.cities[cRes[res][o].id].queue[0].type;
							var pos = AB.Data.cities[cRes[res][o].id].queue[0].pos;
							var lvl = AB.getBuildingLevel(cRes[res][o].id, type, pos);
							AB.correctCostsOf(type, lvl+1, cRes[res][o].id);
							ava = cRes[res][o].v - (Buildings[type][res]? Buildings[type][res][lvl] : 0) - Max(AB.Data.cities[cRes[res][o].id].supply.minRes[res], avRes[res]);
						}
						else ava = cRes[res][o].v - Max(AB.Data.cities[cRes[res][o].id].supply.minRes[res], avRes[res]);
						if(ava < AB.Supplier.RCS){
							--o; continue;	
						}
						req = avRes[res] - cRes[res][u].v;
						job = {v:ava+req, res:res, sid:cRes[res][o].id, tid:cRes[res][u].id};
						ava = Math.floor(ava/AB.Supplier.RCS)*AB.Supplier.RCS;
						req = Math.floor(req/AB.Supplier.RCS)*AB.Supplier.RCS;
						job.a = Min(ava, req);	// amount
						cRes[res][u].v += job.a;
						cRes[res][o].v -= job.a;
						AB.Supplier.sorteinf(this.jobs, job);
						if(ava < req) --o;
						else if(ava > req) ++u;
						else{--o; ++u;}
					}
				}
			}

			if(this.jobs.length) {
				session.set('EQU_Job', uneval(this.Job));	
				session.set('ABState', AB.state=7);
				AB.saveReturnURL();
					
				return this.equalize();
			}
			else return false;
		},
		
		equalize: function(){
			AB.log("Starting resource equalizatiion");
			if(!this.Jobs) this.Job = eval(session.get('EQU_Job'));
			var job = this.Job.jobs[0];
			var ships = AB.ships;
			var state = session.get("EQU_state"); 
			if(state) state = Number(state); else state = 2;
			AB.displayWaitBox("Equalization");
			
			if(this.Job.jobs.length && ships){
				if(state === 2){
					session.set("EQU_state", 1);
					AB.goTo(job.sid, "?view=transport&destinationCityId="+job.tid);
					return true;
				}
				else if(state === 1){
					if(Number(AB.Cities[AB.cityId].actions) == 0){
						this.removeCurrentJob();
						return this.equalize();
					}
					var input, button, amount, end = false;
					for(var i in this.Job.jobs){
						if(this.Job.jobs[i].sid == job.sid && this.Job.jobs[i].tid == job.tid){
							if(!(input = $("textfield_"+this.Job.jobs[i].res))){
								if(AB.view != "transport") {// User changed the page
									session.set("EQU_state", 2); 
									return this.equalize();
								}
								else throw new Error("Equalizer Error! No input box on page!");
							}
							amount = this.Job.jobs[i].a;
							if(amount/AB.Supplier.RCS >= ships){ // not enough ships
								amount = ships*AB.Supplier.RCS;
								end = true;
							}
							else ships -= amount/AB.Supplier.RCS;
							
							input.value = amount;
							input.focus(); input.select();
							this.Job.jobs.splice(i,1);
							if(end) break;
						}
					}
					if(!(button = XP('//*[@id="submit"]'))) throw new Error("Equalizer Error! No button found!");
					session.set('EQU_Job', uneval(this.Job));
					session.set("EQU_state", 2);
					session.set("EQU_sentCounter", (Number(session.get("EQU_sentCounter"))||0)+1);
					button.click();
					return true;
				}
			}
			else{
				return this.finish();
			}
		},
		finish: function(){
			this.clearSessionData();
			session.set("ABState", AB.state=0);
			session.set('EQU_lastJobTs', AB.ts);
			if(Number(session.get("EQU_sentCounter"))){
				session.remove("EQU_sentCounter");
				initNOTIFIER();
				NOTIFIER.updateFleetMovements(1);
				return !AB.isReturnPage();
			}
			else return false;
		},
	}
	EQUALIZER.init();
}




function initASC(){
	if(typeof ASC !== "undefined") return;
	ASC = {
		enabled: true,
		unitSpace: {
			medic:10,
			cook:20,
			bombardier:30,
			gyrocopter:15,
			ram:30,
			catapult:30,
			mortar:30,
			slinger:3,
			archer:5,
			marksman:5,
			phalanx:5,
			steamgiant:15,
			spearman:3,
			swordsman:3,
		},
		statusText:{ // statusText[taskType][statuscode]
			1:{
				0: "",	// idle
				10: "An error occured!",
			},
			2:{
				0: "",	// idle
				1: "Target is empty",
				2: "Notifier missed the attack (too long Notifier-Interval?) or battle lost! If you lost the battle, go to the battacks to update city troops.",
				3: "Sent away",
				4: "bringing loot",
				10: "An error occured!",
				11: "Error occured: not enough troops in city - internal calculation was wrong!",
			},
			3:{
				0: "",	// idle
				10: "An error occured!",
				11: "Error occured: not enough troops in city - internal calculation was wrong!",
			},
			4:{
				0: "",	// idle
				10: "An error occured!",
				11: "Error occured: not enough battleships in city - internal calculation was wrong!",
			},
		},
		getNewTransportTaskObj_template: function(){
			return {
				position: 1,  //  List position is interpreted as: 1 = priority, 2 = order
				from: null,
				to: null,
				res: {wood:0, marble:0, sulfur:0, glass:0, wine:0},
				finished: false,
				ships: 0,
				statuscode: 0,
				conditions:{
					time: 0, // timestamp
					times: 1,
					origTimes: 1,
					toAccumulate:0,
					accumulate: {wood:0, marble:0, sulfur:0, glass:0, wine:0},
				},
				repeat: 0,
			}
		},
		getNewPillageTaskObj_template: function(){
			return {
				position: 1,
				from: null,
				to: null,
				targetName: null,
				targetPlayer: null,
				targetCoords: null,
				targetRes: null,
				finished: false,
				ships: 0,	// extra ships
				allShips:0,
				statuscode: 0,
				units: {
					medic:0,
					cook:0,
					bombardier:0,
					gyrocopter:0,
					ram:0,
					catapult:0,
					mortar:0,
					slinger:0,
					archer:0,
					marksman:0,
					phalanx:0,
					steamgiant:0,
					spearman:0,
					swordsman:0,
				},
				conditions:{
					time: 0, // timestamp
					times: 1,
					origTimes: 1,
					empty: 0,	// attack until target empty
				},
				repeat: 0,
			}
		},
		getNewBlockadeTaskObj_template: function(){
			return {
				position: 1,
				from: null,
				to: null,
				targetName: null,
				targetPlayer: null,
				targetCoords: null,
				targetRes: null,
				finished: false,
				statuscode: 0,
				duration:0,	// index
				units: {
					catapult:0,
					mortar:0,
					submarine:0,
					ballista:0,
					ram:0,
					flamethrower:0,
					steamboat:0,
				},
				conditions:{
					time: 0, // timestamp
				},
				repeat: 0,
			}
		},
		saveNewTask: function(type, data){
			AB.Data.ASC.tasks.push({
						id: Timestamp(),
						enabled: 1,
						type: type,
						data: data
				});
			AB.saveData();
		},
		
		clone: function(o){
			if(typeof o !== "object") return o;
			var o2 = {}
			for(var e in o){
				o2[e] = this.clone(o[e]);
			}
			return o2;
		},
		
		clearTempData: function(i){
			session.remove('ASC_task');
			session.remove('ASC_state');
		},
		
		isAttackTargetInList: function(id){
			for each(var i in AB.Data.ASC.tasks){
				if(i.data.to == id && (i.type == 2 || i.type == 3 || i.type == 4)) return true;
			}
			return false;
		},
		
		getTaskTypeImg: function(type){
			if(type === 1) return '<img height="16" style="display:inline;" src="/skin/interface/mission_transport.gif" align="absmiddle"/>'
			if(type === 2) return '<img height="16" style="display:inline;" src="/skin/interface/mission_plunder.gif" align="absmiddle"/>'
			if(type === 3) return '<img height="16" style="display:inline;" src="/skin/interface/mission_occupy.jpg" align="absmiddle"/>'
			if(type === 4) return '<img height="16" style="display:inline;" src="/skin/interface/mission_blockade.gif" align="absmiddle"/>'
			return '';
		},
		
		getUnitImg: function(unit){
			return '<img height="18" title="'+AB.Config.unitnames["unit "+unit]+'" src="skin/characters/military/x40_y40/y40_'+unit+'_faceright.gif" />'
		},
		getNavalUnitImg: function(unit){
			return '<img height="18" title="'+AB.Config.unitnames["unit ship_"+unit]+'" src="skin/characters/fleet/40x40/ship_'+unit+'_r_40x40.gif" />'
		},
		
		getStatusImgSrc: function(type){
			// green
			if(type === 1) return "data:image/gif,GIF89a%10%00%10%00%D5%00%00%16%A4%13%87%D4ic%C3V%9E%DD%9B%5B%C55%C3%EA%BEC%B7-o%E2I%84%F1Xq%CFge%DDC%40%AF%40%B4%E4%B4%86%D9%82e%D6JB%C10%99%FFf%D4%F2%CB%25%B0%18y%E9P%B4%EE%9EQ%CE8%93%DF%84B%BC%23%86%DBwj%CA%5Dz%CEcp%E4KZ%D5%3CD%C7-K%BD1n%D9U%2B%B3%1As%D3dv%E9P%A4%E1%9A%D7%F4%CC%95%DC%8D%88%DByF%BF'h%DEE%7C%ECSE%C8.f%CCf%89%D5je%C4X%C3%EB%BE%8C%D6%84s%D6k%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%05%14%001%00%2C%00%00%00%00%10%00%10%00%00%06i%C0%98pH%2C%1A%8F%C8%24%92%C4%22%10%02%A4%24%E5%94%19%0C2'%CA1rI%94F%23K%E2%121j%1E!%93%C5%82%09%3D4FO%A7%E2%F8%7C%1C%15%95%C7h%A8p%14%80%0A%1C%15%06F-%15%0A%07%22%22%1B(%15%02F%05%20%22)%08%08)%22%20.G%0D%12%13%10%10)%12%0DI%0C%0B%00%00%0B%0CJ%AC%AD%AEGA%00%3B";
			// red
			if(type === 2) return "data:image/gif,GIF89a%10%00%10%00%D5%00%00%EB8%0F%FF%88T%F2gK%F7%A2%91%D8L%40%E5%3E%19%FC%91y%D0%2F%16%FF%D0%C3%F8mO%FFZ'%FD%C5%BB%FF%99f%FF%CC%99%FFo%3C%FF3%00%F7%BD%B5%FF%7D%5B%FD%3F%19%FE%8Ak%FFq%3D%FD%9E%89%FF%A7t%E5%3C%17%FF%81N%FDT%22%FFf3%F9C%1A%FEsR%FElH%FF%84P%FA9%0B%FD%9C%86%F8%A1%8F%FFK%18%F7iI%FEhC%FFkR%FD%91%81%FF%8DZ%FB%8Eu%FFs%3F%FF%A5%8D%FF%ADs%F9%3D%10%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%05%14%00-%00%2C%00%00%00%00%10%00%10%00%00%06h%C0%96pH%2C%1A%8F%C8%24%12%C1%91H8%88%A4%EA1%1A%0CF%0F%D5%11%F1H%18*%15T%E2%11-rX%9D%C8d%12!%7D8%C6%CDC%A4I%A54%A2%C7%26.Rh(%80%0A%22%7BE%02%19%0E%18''%1E)%0A%02F%0B%00%1E%0C%16%16%0C%01%00%0BG%26%17%0C%0D%0D%0C%05%26I%10%04%07%07%04%10J%AB%AC%ADGA%00%3B";
			// blue
			if(type === 3) return "data:image/gif,GIF89a%0A%00%0A%00%D5%25%00%1D%86%D66%93%D9%20%87%D6%08z%D1%08%7B%D25%93%D9v%B6%E6%88%BF%E9%89%BF%EAW%A4%E0%3F%98%DCW%A5%DF%40%98%DC%1D%86%D5!%87%D6%89%C0%E9%FF%FF%FF%CF%E6%F7L%9E%DE%89%BF%E9%40%99%DC%B4%D7%F1%40%98%DB5%93%DAL%9F%DE5%92%D9%CF%E5%F6%B3%D7%F1%19%83%D5%04x%D1%1B%84%D5%1B%85%D5%7F%BA%E7T%A3%DFw%B6%E6%A3%CE%EE%00v%D0%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%01%00%00%25%00%2C%00%00%00%00%0A%00%0A%00%00%06O%C0Ri%B4%10%00B%23a%09%E4%B9P2%1F%12h%E8%C1%88%0E%22%8C%874J%14D%1B%CDF%94%E9%84%1C%8AI%04%A2A0%06%9C%C6%05%AC%A9%90%3B%9C%D0%C7%FA0H%A2H%24%1F%17%16%01%5B%5CK%24%1D%04%1D%24RJ%23!%1CyI%25A%00%3B";
			// gray
			if(type === 4) return "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%09%00%00%00%09%08%06%00%00%00%E0%91%06%10%00%00%00%04sBIT%08%08%08%08%7C%08d%88%00%00%00%09pHYs%00%00%0B%12%00%00%0B%12%01%D2%DD~%FC%00%00%00%16tEXtCreation%20Time%0008%2F26%2F09%0BE%1D%1F%00%00%00%18tEXtSoftware%00Adobe%20FireworksO%B3%1FN%00%00%00%B8IDAT%18%95u%D0%3DJ%C4%60%10%06%E0'%C9%A7%E0%19%16%EC%B5%B5Z%B0%5B%10o%B0%E0%19%04%C1%D6%23%04%14A%D8%CAV%F0%0A%5B%D8%9A2%95%EDV%9E%20%7F%04%F2c%B1%09%2C%8Ao30%F30%0C%13A%9E%E7%09%EE%B0%C6%05r%BC%E1%19%7D%94e%D9%09%B6%B8%F47%9FX%85%A6i%EE%B1%C4%80%F8%17Z%E2!TU%B5%9E%C0Q%1C%C7%86a0%D7)7%A1(%8ASDs'%84%A0%EB%BA%C3m%8BP%96%E5%0Eg%FB%F9%1E%24I%A2%EF%FB%19%7D%87%BA%AE_%F1%F4%CFM%B0%09m%DBnp%8D%2Bt8%3E%00%1Fx%8C%60%1CGi%9A%DEN%7F%3A%C7%17%DE%F1%02%3F%B9%C1%3FEZ%A6%A0Q%00%00%00%00IEND%AEB%60%82";
			return '';
		},
		getStatusImg: function(status, task){
			var info = this.statusText[task.type][task.data.statuscode]?" - "+this.statusText[task.type][task.data.statuscode] : "";
			// green
			if(status === 1) return '<img style="cursor:pointer; margin-right:-3px" height="16" title="active '+info+'" src="'+this.getStatusImgSrc(status)+'" align="absmiddle"/>';
			// red
			if(status === 2)  return '<img style="cursor:pointer; margin-right:-3px" height="16" title="disabled '+info+'" src="'+this.getStatusImgSrc(status)+'" align="absmiddle"/>';
			// blue
			if(status === 3) return '<img style="cursor:pointer;" height="10" ts="'+task.data.conditions.time+'" title="scheduled'+(task.data.conditions.time?' for '+this.getFormatedTimeString(new Date(task.data.conditions.time))+' (in '+this.getFormatedTimeDifference(task.data.conditions.time)+')':'')+" "+info+'" src="'+this.getStatusImgSrc(status)+'" align="absmiddle"/>';
			// gray
			if(status === 4)return '<img style="cursor:pointer;" height="10" title="finished '+info+'" src="'+this.getStatusImgSrc(status)+'" align="absmiddle"/>';

		},
		
		getFormatedTimeDifference: function(date){
					date = date instanceof Date?date : date&&!isNaN(date)&&date>AB.ts? new Date(date) :  new Date();
					date = (date.getTime()-(new Date()).getTime())/1000;
					if(date < 0) return "0 sec";
					var d = Math.floor(date/86400); date %= 86400;
					var h = Math.floor(date/3600); date %= 3600;
					var m = Math.floor(date/60); date %= 60;
					var s = Math.round(date);
					return (d?d+"D ":"")+(h?h+"h ":'')+(m?(m<10?"0"+m:m)+"m ":'')+(s<10?"0"+s:s)+"s";
		},
		
		getFormatedTimeString: function(date){
					var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
					date = date instanceof Date?date : date&&!isNaN(date)&&date>AB.ts? new Date(date) :  new Date();
					return months[date.getMonth()]+" "+(date.getDate()<10?"0"+date.getDate():date.getDate())+", "+date.getFullYear()+" "+
					(date.getHours()<10?"0"+date.getHours():date.getHours())+":"+(date.getMinutes()<10?"0"+date.getMinutes():date.getMinutes())+":"+(date.getSeconds()<10?"0"+date.getSeconds():date.getSeconds());
		},
		
		init: function(){
			try{
				this.enabled = AB.Data.ASC.enabled;
				if(AB.state == 0 || AB.state == 3){
					this.addPageButtonsAndInfos();
					this.addTransportPageButton();
				}
			}
			catch(e){AB.error(e)}
		},
		
		updateNumTasksInfo: function(){
			if(!this.numTasksInfo) this.numTasksInfo = $('ASC_numTasksInfo');
			this.numTasksInfo.firstChild.data = '('+AB.Data.ASC.tasks.length+')'
		},
		
		displayList: function(){
			AB.log("ASC - displayList")
			if(!this.taskListObj){
				this.taskListObj = $("ASC_list");
				ADD('<p style="margin-left: 7px;">\
					  <strong style="color:SaddleBrown">Priority</strong>\
					</p>\
					<span style="text-align: right; margin: -2.1em 0.5em 0pt 0pt; padding-bottom: 0.5em; display: block; font-size: 0.8em;">\
					<a id="ASCCheckNow" style="cursor:pointer;">[check]</a> <a id="ASCClearAll" style="cursor:pointer;">[clear all]</a>\
					</span>', this.taskListObj);
				this.listContainer = ADD('<span></span>', this.taskListObj);
				ADD('<a style="display:block; font-size:0.8em; text-align:center; cursor:pointer">add</a>', this.taskListObj)
					.addEventListener("click", function(e){try{ASC.displayTaskDiv()}catch(e){AB.error(e)}}, false);
				$("ASCClearAll").addEventListener("click", function(e){try{clearList(e)}catch(e){AB.error(e)}}, false);
				$("ASCCheckNow").addEventListener("click", function(e){try{ASC.check()}catch(e){AB.error(e)}}, false);
				
				GM_addStyle('div.ASC_listElement { font-size:.8em; width:205px; float:left; padding:0 5px 0 7px !important; min-height:2.0em; line-height:2.0em; text-align:left !important; }\
							div.ASC_listElement img {display:inline!important;}\
							div.ASC_listElement a {cursor:pointer;}\
							img.ASCList_delete { float:right; height:13px; opacity:.6; cursor:pointer; margin:0 1px 0 2px;}\
							img.ASCList_delete:hover { opacity:1; }');
				
				function clearList(e){	// remove all
					AB.Data.ASC.tasks.splice(0);
					AB.saveData();
					ASC.updateList();
					ASC.updateNumTasksInfo();

				}
			}
			this.taskListObj.style.display = this.taskListObj.style.display=="none"?null:"none";
			this.updateList();
		},
		
		updateList: function(){
			AB.log("ASC - updateList")
			if(!this.taskListObj) return;
			if(!this.listContainer) return;
			var i = -1;
			var cid, fromName, fromCoords, targetName, targetCoords, active, pending;
			var temp;
			this.listContainer.innerHTML = null;
			
			for each(var task in AB.Data.ASC.tasks){
				++i;
				if(task === undefined){
					this.Data.ASC.tasks.splice(i,1);
					continue;
				}	
				cid = task.data.from;
				fromName = AB.Cities[cid]?AB.Cities[cid].city_name:AB.occupiedCities[cid].name;
				fromCoords = AB.Cities[cid]?AB.Cities[cid].city_coord:AB.occupiedCities[cid].coords||'';
				pending = task.data.conditions.time && task.data.conditions.time > AB.ts;


				switch(task.type){
					case 1:
						cid = task.data.to;
						targetName = AB.Cities[cid].city_name;
						targetCoords = AB.Cities[cid].city_coord;
						active = true;
						if(!task.data.conditions.toAccumulate && !task.data.conditions.times || task.data.finished) active = false;
						html =
						'<div style="margin: 0pt;" class="ASC_listElement '+(i%2?'':"autoUpgradeBuildingEven")+'" i="'+i+'">\
						  <table cellspacing="0" cellpadding="0" border="0" style="width:100%; margin: 0pt;">\
							<tbody>\
							  <tr>\
							  	<td width="5%" rowspan="2" '+(task.data.position == 2?'style="font-weight:bold; color:orange;" title="sequential task"':'')+'>'+(i+1)+'.</td>\
								<td width="15%">'+this.getTaskTypeImg(task.type)+'</td>\
								<td width="20%">'+task.data.ships+' <img style="height: 14px; vertical-align:middle;" src="skin/characters/fleet/40x40/ship_transport_r_40x40.gif" /></td>\
								<td width="15%">'+(task.data.conditions.toAccumulate?'<b>Acc</b>' : '<b style="color:'+(task.data.conditions.times?'black':"silver")+'">'+task.data.conditions.times+'x</b>')+'</td>\
								<td width="20%"><span title="';
						temp = 0;
						var cntr = 0;
						for(var res in task.data.res) {
							//if(task.data.res[res]) html += (temp++?' ':'')+AB.getResourceImg(res);
							if(task.data.res[res]) html += (cntr++?", ":'')+task.data.res[res]+" "+res;
							temp += task.data.res[res];
						}
						html += '">'+AB.shortenResStr(temp)+'</span></td>\
								<td width="8%" type="edit"><a i="'+i+'" type="1"> edit </a></td>\
								<td width="7%"><img title="Remove task" i="'+i+'" class="ASCList_delete" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAD9SURBVBgZBcFLLkNRAADQc1/fU6qkhFRMMNIQn8TUQCJWYBE2YBkWYQWMJIZmNuAXCSoGFUGIInJf33VOSAAAAIAcgLOFt3079flaEdTS50M6nT7YeggJwPFle6nhAoVhc370rnaXcwBSp62GTdxoGdPrkAPQD5OSbRFr6oLvjByA53CqY9YUvjy68YQcgELTuTd/khENbQk5ANGqFUSFnq6WW2QA5Op4VuhreJVEZACUAKiJkogMgIEKANFARAZAKQKolColMgA+f7vVkBkRSeYjvf6QAfB1cnnXNWTUhHHrXuLoESEBYO/aYjNUSqX3snk/2DjshwQAAAD4B9GUWR0G4scKAAAAAElFTkSuQmCC" />\
								</td>\
								<td width="9%" rowspan="1" i="'+i+'" type="1" status="1" style="text-align:right;">'+this.getStatusImg(task.enabled?active?pending?3:1:4:2, task)+'</td>\
								</tr>\
   								<tr>\
								<td colspan="7" valign="top" style="text-align:center;">\
								  <a target="_blank" style="color: rgb(0, 102, 0);" title="'+fromCoords+'&nbsp;'+fromName+'" href="?view=city&id='+task.data.from+'">\
									'+fromName+'\
								  </a> &#8702; \
								  <a target="_blank" style="color: rgb(0, 102, 0);" title="'+targetCoords+'&nbsp;'+targetName+'" href="?view=city&id='+task.data.to+'">\
								  	'+targetName+'\
								  </a>\
								</td>\
							  </tr>\
							</tbody>\
						  </table>\
						</div>';
					break;
					case 2:
						targetName = task.data.targetName;
						targetCoords = task.data.targetCoords;
						active = true;
						if(!task.data.conditions.empty && !task.data.conditions.times || task.data.finished) active = false;
						html =
						'<div style="margin: 0pt;" class="ASC_listElement '+(i%2?'':"autoUpgradeBuildingEven")+'" i="'+i+'">\
						  <table cellspacing="0" cellpadding="0" border="0" style="width:100%; margin: 0pt;">\
							<tbody>\
							  <tr>\
							  	<td width="5%" rowspan="2" '+(task.data.position == 2?'style="font-weight:bold; color:orange;" title="sequential task"':'')+'>'+(i+1)+'.</td>\
								<td width="15%">'+this.getTaskTypeImg(task.type)+'</td>\
								<td width="20%">'+task.data.allShips+' <img style="height: 14px; vertical-align:middle;" src="skin/characters/fleet/40x40/ship_transport_r_40x40.gif" /></td>\
								<td width="15%">'+(task.data.conditions.empty?'<b>empty</b>' : '<b style="color:'+(task.data.conditions.times?'black':"silver")+'">'+task.data.conditions.times+'x</b>')+'</td>\
								<td width="20%"></td>\
								<td width="8%" type="edit"><a i="'+i+'" type="2"> edit </a></td>\
								<td width="7%"><img title="Remove task" i="'+i+'" class="ASCList_delete" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAD9SURBVBgZBcFLLkNRAADQc1/fU6qkhFRMMNIQn8TUQCJWYBE2YBkWYQWMJIZmNuAXCSoGFUGIInJf33VOSAAAAIAcgLOFt3079flaEdTS50M6nT7YeggJwPFle6nhAoVhc370rnaXcwBSp62GTdxoGdPrkAPQD5OSbRFr6oLvjByA53CqY9YUvjy68YQcgELTuTd/khENbQk5ANGqFUSFnq6WW2QA5Op4VuhreJVEZACUAKiJkogMgIEKANFARAZAKQKolColMgA+f7vVkBkRSeYjvf6QAfB1cnnXNWTUhHHrXuLoESEBYO/aYjNUSqX3snk/2DjshwQAAAD4B9GUWR0G4scKAAAAAElFTkSuQmCC" />\
								</td>\
								<td width="9%" rowspan="1" status="1" type="2" i="'+i+'" style="text-align:right;">'+this.getStatusImg(task.enabled?active?pending?3:1:4:2, task)+'</td>\
								</tr>\
   								<tr>\
								<td colspan="7" valign="top" style="text-align:center;">\
								  <a target="_blank" style="color: rgb(0, 102, 0);" title="'+fromCoords+'&nbsp;'+fromName+'" href="?view=city&id='+task.data.from+'">\
									'+fromName+'\
								  </a> &#8702; '+AB.getResourceImg(task.data.targetRes)+'\
								  <a target="_blank" style="color:red;" title="'+targetCoords+' '+targetName+' ('+task.data.targetPlayer+')" href="?view=island&cityId='+task.data.to+'">\
								  	'+targetName+'\
								  </a>\
								</td>\
							  </tr>\
							</tbody>\
						  </table>\
						</div>';
					break;
					case 3:
						targetName = task.data.targetName;
						targetCoords = task.data.targetCoords;
						active = true;
						if(!task.data.conditions.empty && !task.data.conditions.times || task.data.finished) active = false;
						html =
						'<div style="margin: 0pt;" class="ASC_listElement '+(i%2?'':"autoUpgradeBuildingEven")+'" i="'+i+'">\
						  <table cellspacing="0" cellpadding="0" border="0" style="width:100%; margin: 0pt;">\
							<tbody>\
							  <tr>\
							  	<td width="5%" rowspan="2" '+(task.data.position == 2?'style="font-weight:bold; color:orange;" title="sequential task"':'')+'>'+(i+1)+'.</td>\
								<td width="15%">'+this.getTaskTypeImg(task.type)+'</td>\
								<td width="20%">'+task.data.allShips+' <img style="height: 14px; vertical-align:middle;" src="skin/characters/fleet/40x40/ship_transport_r_40x40.gif" /></td>\
								<td width="15%">&nbsp;</td>\
								<td width="20%"></td>\
								<td width="8%" type="edit"><a i="'+i+'" type="3"> edit </a></td>\
								<td width="7%"><img title="Remove task" i="'+i+'" class="ASCList_delete" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAD9SURBVBgZBcFLLkNRAADQc1/fU6qkhFRMMNIQn8TUQCJWYBE2YBkWYQWMJIZmNuAXCSoGFUGIInJf33VOSAAAAIAcgLOFt3079flaEdTS50M6nT7YeggJwPFle6nhAoVhc370rnaXcwBSp62GTdxoGdPrkAPQD5OSbRFr6oLvjByA53CqY9YUvjy68YQcgELTuTd/khENbQk5ANGqFUSFnq6WW2QA5Op4VuhreJVEZACUAKiJkogMgIEKANFARAZAKQKolColMgA+f7vVkBkRSeYjvf6QAfB1cnnXNWTUhHHrXuLoESEBYO/aYjNUSqX3snk/2DjshwQAAAD4B9GUWR0G4scKAAAAAElFTkSuQmCC" />\
								</td>\
								<td width="9%" rowspan="1" status="1" type="3" i="'+i+'" style="text-align:right;">'+this.getStatusImg(task.enabled?active?pending?3:1:4:2, task)+'</td>\
								</tr>\
   								<tr>\
								<td colspan="7" valign="top" style="text-align:center;">\
								  <a target="_blank" style="color: rgb(0, 102, 0);" title="'+fromCoords+'&nbsp;'+fromName+'" href="?view=city&id='+task.data.from+'">\
									'+fromName+'\
								  </a> &#8702; '+AB.getResourceImg(task.data.targetRes)+'\
								  <a target="_blank" style="color:red;" title="'+targetCoords+' '+targetName+' ('+task.data.targetPlayer+')" href="?view=island&cityId='+task.data.to+'">\
								  	'+targetName+'\
								  </a>\
								</td>\
							  </tr>\
							</tbody>\
						  </table>\
						</div>';
					break;
					case 4:
						targetName = task.data.targetName;
						targetCoords = task.data.targetCoords;
						active = true;
						if(task.data.finished) active = false;
						var numShips = 0;
						for(temp in task.data.units) numShips += task.data.units[temp];
						html =
						'<div style="margin: 0pt;" class="ASC_listElement '+(i%2?'':"autoUpgradeBuildingEven")+'" i="'+i+'">\
						  <table cellspacing="0" cellpadding="0" border="0" style="width:100%; margin: 0pt;">\
							<tbody>\
							  <tr>\
							  	<td width="5%" rowspan="2" '+(task.data.position == 2?'style="font-weight:bold; color:orange;" title="sequential task"':'')+'>'+(i+1)+'.</td>\
								<td width="15%">'+this.getTaskTypeImg(task.type)+'</td>\
								<td width="55%" colspan="3"><b>'+numShips+'</b> Ships</td>\
								<td width="8%" type="edit"><a i="'+i+'" type="4"> edit </a></td>\
								<td width="7%"><img title="Remove task" i="'+i+'" class="ASCList_delete" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAD9SURBVBgZBcFLLkNRAADQc1/fU6qkhFRMMNIQn8TUQCJWYBE2YBkWYQWMJIZmNuAXCSoGFUGIInJf33VOSAAAAIAcgLOFt3079flaEdTS50M6nT7YeggJwPFle6nhAoVhc370rnaXcwBSp62GTdxoGdPrkAPQD5OSbRFr6oLvjByA53CqY9YUvjy68YQcgELTuTd/khENbQk5ANGqFUSFnq6WW2QA5Op4VuhreJVEZACUAKiJkogMgIEKANFARAZAKQKolColMgA+f7vVkBkRSeYjvf6QAfB1cnnXNWTUhHHrXuLoESEBYO/aYjNUSqX3snk/2DjshwQAAAD4B9GUWR0G4scKAAAAAElFTkSuQmCC" />\
								</td>\
								<td width="9%" rowspan="1" status="1" type="4" i="'+i+'" style="text-align:right;">'+this.getStatusImg(task.enabled?active?pending?3:1:4:2, task)+'</td>\
								</tr>\
   								<tr>\
								<td colspan="7" valign="top" style="text-align:center;">\
								  <a target="_blank" style="color: rgb(0, 102, 0);" title="'+fromCoords+'&nbsp;'+fromName+'" href="?view=city&id='+task.data.from+'">\
									'+fromName+'\
								  </a> &#8702; '+AB.getResourceImg(task.data.targetRes)+'\
								  <a target="_blank" style="color:red;" title="'+targetCoords+' '+targetName+' ('+task.data.targetPlayer+')" href="?view=island&cityId='+task.data.to+'">\
								  	'+targetName+'\
								  </a>\
								</td>\
							  </tr>\
							</tbody>\
						  </table>\
						</div>';
					break;
				}
				ADD(html, this.listContainer);
				
				// special events
				if(pending) XP("div[last()]//td[@status]/img",0,this.listContainer).addEventListener("mouseover", function(e){try{
						e = e.currentTarget;
						var i = parseInt(e.parentNode.getAttribute("i"), 10);
						var task = AB.Data.ASC.tasks[i];
						e.title = 'scheduled'+(task.data.conditions.time?' for '+ASC.getFormatedTimeString(new Date(task.data.conditions.time))+' (in '+ASC.getFormatedTimeDifference(task.data.conditions.time)+')':'')+" "+(ASC.statusText[task.type][task.data.statuscode]?" - "+ASC.statusText[task.type][task.data.statuscode] : "");
					}catch(e){AB.error(e)}}, false);
			}
			
			if(!AB.Data.ASC.tasks.length){
				Add('<span style="display:block; font-size:0.8em; text-align:center; color:#CB9B6A;">(no tasks)</span>', this.listContainer);
				return;
			}
			else{
				// Events
				Xp(".//img[@class='ASCList_delete']",1,this.listContainer).
				forEach(function(e){e.addEventListener("click", function(e){try{remove(e.currentTarget)}catch(e){AB.error(e)}}, false);});
				Xp(".//td[@status]/img",1,this.listContainer).
				forEach(function(e){e.addEventListener("click", function(e){try{changeState(e.currentTarget)}catch(e){AB.error(e)}}, false);});
				Xp(".//td[@type='edit']/a",1,this.listContainer).
				forEach(function(e){e.addEventListener("click", function(e){try{edit(e.currentTarget)}catch(e){AB.error(e)}}, false);});
				// drag/drop
				Xp("div", 1, this.listContainer).forEach(function(e){
					e.addEventListener("mouseover", function(e){try{dragIn(e)}catch(e){AB.error(e)}}, false); 
					e.addEventListener("mouseout", function(e){try{dragOut(e)}catch(e){AB.error(e)}}, false);
					e.addEventListener("mousedown", function(e){try{startDrag(e)}catch(e){AB.error(e)}}, false);});
				
				function remove(e){
					AB.renewSavedData();
					var i = parseInt(e.getAttribute("i"), 10);
					AB.Data.ASC.tasks.splice(i,1);
					AB.saveData();
					ASC.updateList();
					ASC.updateNumTasksInfo();
				}
				function edit(e){
					var i = parseInt(e.getAttribute("i"), 10);
					var type = parseInt(e.getAttribute("type"), 10);
					ASC.editIndex = i;
					ASC.displayTaskDiv(type, ASC.clone(AB.Data.ASC.tasks[i].data), true);
				}
				function changeState(e){
					if(!e.nodeName) e = e.currentTarget;
					var parent = e.parentNode;
					var i = parseInt(parent.getAttribute("i"), 10);
					var task = AB.Data.ASC.tasks[i];
					AB.Data.ASC.tasks[i].enabled = Number(!AB.Data.ASC.tasks[i].enabled);
					AB.saveData();
					
					var active = true;
					if(task.type === 1 && (!task.data.conditions.toAccumulate && !task.data.conditions.times || task.data.finished)) active = false;
					if(task.type === 2 && (!task.data.conditions.empty && !task.data.conditions.times || task.data.finished)) active = false;
					var pending = task.data.conditions.time && task.data.conditions.time > AB.ts;
					
					parent.innerHTML = null;
					ADD(ASC.getStatusImg(task.enabled?active?pending?3:1:4:2, task), parent).addEventListener("click", changeState, false);
				}
				function startDrag(e){
					try{
						e.preventDefault();
						var i =  parseInt(e.currentTarget.getAttribute("i"), 10);
						ASC.tasklistDragStarted = true;
						ASC.tasklistDragSource = i;
						ASC.tasklistDragSourceObj = e.currentTarget;
						window.addEventListener("mouseup", dragTo, false);
					}
					catch(e){AB.error(e)}
				}
				function dragIn(e){
					if(ASC.tasklistDragStarted === undefined){
						e.currentTarget.style.backgroundColor = "#fff";
						return false;
					}
					var e = e.currentTarget, i =  parseInt(e.getAttribute("i"), 10);
					if(i === ASC.tasklistDragSource) return false;
					if(i < ASC.tasklistDragSource) e.style.borderTop = "2px solid black";
					else e.style.borderBottom = "2px solid black";
					ASC.tasklistDragTarget = i;
				}
				function dragOut(e){
					if(ASC.tasklistDragStarted === undefined){
						e.currentTarget.style.backgroundColor = null;
						return false;
					}
					var e = e.currentTarget;
					e.style.borderBottom = e.style.borderTop = null;
					delete ASC.tasklistDragTarget;
				}
				function dragTo(e){
					try{
						delete ASC.tasklistDragStarted;
						window.removeEventListener("mouseup", dragTo, false);
						if(ASC.tasklistDragTarget === undefined){
							ASC.tasklistDragSourceObj.backgroundColor = null;
							delete ASC.tasklistDragSource;
							delete ASC.tasklistDragSourceObj;
							return false;
						}
						var start = Min(ASC.tasklistDragSource, ASC.tasklistDragTarget), end = Max(ASC.tasklistDragSource, ASC.tasklistDragTarget);
						if(ASC.tasklistDragSource > ASC.tasklistDragTarget){
							var t = AB.Data.ASC.tasks[end];
							while(end > start) AB.Data.ASC.tasks[end] = AB.Data.ASC.tasks[--end];
							AB.Data.ASC.tasks[start] = t;
						}
						else{
							var t = AB.Data.ASC.tasks[start];
							while(start < end) AB.Data.ASC.tasks[start] = AB.Data.ASC.tasks[++start];
							AB.Data.ASC.tasks[end] = t;
						}
						AB.saveData();
						ASC.updateList();
						delete ASC.tasklistDragSource;
						delete ASC.tasklistDragSourceObj;
						delete ASC.tasklistDragTarget
					}
					catch(e){AB.error(e)}
				}
			}
			
		},
		
		updatePillageTasksSession: function(){
			AB.log("ASC - updatePillageTasksSession")
			this.tasksSession = eval(session.get("ASC_tasks"));
			if(!this.tasksSession) this.tasksSession = {};
			var taskDataChanged = false, found;
			
			for each(var task in AB.Data.ASC.tasks){
				if(task.type != 2) continue;	// currently only pillage tasks
				if(!this.tasksSession[task.id]){
					this.tasksSession[task.id] = {
						state: 1,
						checked: 0,
					}
				}
				
				if(this.tasksSession[task.id].state == 2){
					var cid, sid, unit; found = false;
					// find sid of sent attack
					if(!this.tasksSession[task.id].sid){
						for(cid in AB.fleetMovements){
							sidloop:for(sid in AB.fleetMovements[cid]){
								if(AB.fleetMovements[cid][sid].type == 2 && (AB.fleetMovements[cid][sid].originId != task.data.to || AB.fleetMovements[cid][sid].targetId != task.data.from)) continue;
								if(AB.fleetMovements[cid][sid].type == 3 && (AB.fleetMovements[cid][sid].targetId != task.data.to || AB.fleetMovements[cid][sid].originId != task.data.from)) continue;
								if(AB.fleetMovements[cid][sid].ships != task.data.allShips) continue;
								if(AB.fleetMovements[cid][sid].type == 3)
									for(unit in task.data.units){	// unnecessary?
										if(task.data.units[unit] !== (AB.fleetMovements[cid][sid].troops[unit]||0)) continue sidloop;
									}
								this.tasksSession[task.id].sid = sid;
							}
						}
					}
				
					// find & get loot of a succesful attack
					if(this.tasksSession[task.id].sid){
						for(cid in AB.fleetMovements){
							for(sid in AB.fleetMovements[cid]){
								if(sid == this.tasksSession[task.id].sid) found = true;
	
								if(this.tasksSession[task.id].checked) continue; // not already checked
								if(sid != this.tasksSession[task.id].sid || AB.fleetMovements[cid][sid].type != 2) continue; // returning
								// loot
								var cargo = 0;
								if(AB.Cities[task.data.from] && task.data.targetCoords != AB.Cities[task.data.from].city_coord || AB.occupiedCities[task.data.from] && task.data.targetCoords != AB.occupiedCities[task.data.from].coords){
									for(unit in AB.fleetMovements[cid][sid].troops){
										cargo += this.unitSpace[unit]*AB.fleetMovements[cid][sid].troops[unit];
									}
								}
								for(unit in AB.fleetMovements[cid][sid].res){
									cargo += AB.fleetMovements[cid][sid].res[unit];
								}
								var tolerance = 2;	// it seems to be the case that cargo ships don't get 100% full when they should as the city still has loot
													// At least that is what I noticed. This is why we use a tolerance value to increase the accuracy & reliability of the script
								var filled = AB.fleetMovements[cid][sid].ships*500 - cargo <= tolerance;
								if(!filled){
									task.data.statuscode = 1;
									this.finishTask(task);
								}
								else{
									task.data.statuscode = 4;	
								}
								taskDataChanged = true;
								this.tasksSession[task.id].checked = 1;
							}
						}
					}
				
					if(this.tasksSession[task.id].sid && !found){
						if(this.tasksSession[task.id].checked){
							// attack finnished successfully
							task.data.statuscode = 0;
						}
						else{	// attack finished but Notifier did not see it (too long interval?) or battle lost
								// so we finish the task and we set the info via statuscode
							this.finishTask(task);
							task.data.statuscode = 2;
						}
						this.tasksSession[task.id].state = 1;
						this.tasksSession[task.id].checked = 0;
						delete this.tasksSession[task.id].sid;
						taskDataChanged = true;
					}
					if(!this.tasksSession[task.id].sid && !found && Number(session.get("ASC_lastPillageSent")) < Number(session.get("NOTIFIER_lastCheck"))){
						// actually no pillage sent (connection error)
						this.tasksSession[task.id].state = 1;
					}
				}
			}
			// remove deleted tasks
			for (var id in this.tasksSession){
				found = false;
				for each(var task in AB.Data.ASC.tasks){
					if(task.id == id) found = true;
				}
				if(!found) delete this.tasksSession[id];
			}
			
			session.set("ASC_tasks", uneval(this.tasksSession));
			if(taskDataChanged) AB.saveData();
		},
		
		check: function(){
			AB.log("ASC - check")
			if(!this.enabled) return false;
			this.updatePillageTasksSession();
			var data, task, res, pending;
			var execute = -1;
			var toUpdateList = false;
			var ts = Timestamp();
			var nextScheduledTask = 0;
			var hast = false; // highest active sequential task checked
			
			taskloop:for (var i in AB.Data.ASC.tasks){
				task = AB.Data.ASC.tasks[i];
				data = task.data;
				if(!task.enabled) continue;
				if(AB.Cities[data.from] && AB.Cities[data.from].actions == 0) {AB.log("no action points in "+AB.Cities[data.from].city_name); continue;}
				pending = data.conditions.time && data.conditions.time > ts;
				if(pending && (!nextScheduledTask || nextScheduledTask > data.conditions.time)) nextScheduledTask = data.conditions.time;
				if(data.position == 2){
					//if(hast) continue;
					if(hast) break;
					if(!data.finished) hast = true;
				}
				
				if(task.type == 1){			// transport task
					if(pending || data.finished) {AB.log("transport task: "+i+" pending or finnished"); continue;}
					if(AB.ships < data.ships) {AB.log("transport task: "+i+" no ships");continue;}
					
					var usedRes = {};
					for(res in AB.Data.cities[data.from].supply.minRes){
						usedRes[res] =	AB.Data.cities[data.from].supply.minRes[res];
					}
					
					if(AB.Data.cities[task.data.from].queue.length){	// planned construction
						var type = AB.Data.cities[data.from].queue[0].type;
						var pos = AB.Data.cities[data.from].queue[0].pos;
						var lvl = AB.getBuildingLevel(data.from, type, pos);
						AB.correctCostsOf(type, lvl+1, data.from);
						for(res in data.res){
							usedRes[res] =	Max(usedRes[res], Buildings[type][res]? Buildings[type][res][lvl] : 0);
						}
					}
					
					for(res in data.res){
						if(data.res[res] && AB.updatedCityResources[data.from][res] < data.res[res]+usedRes[res]) continue taskloop;
					}
					if(data.conditions.toAccumulate){
						var arriving = {};
						for(res in data.res){
							arriving[res] = AB.Supplier.getArrivingGoodsSum(data.to, res);
						}
						if(AB.updatedCityResources[data.to].wood+arriving.wood >= data.conditions.accumulate.wood && AB.updatedCityResources[data.to].marble+arriving.marble >= data.conditions.accumulate.marble &&
						 	AB.updatedCityResources[data.to].sulfur+arriving.sulfur >= data.conditions.accumulate.sulfur &&
							AB.updatedCityResources[data.to].glass+arriving.glass >= data.conditions.accumulate.glass && AB.updatedCityResources[data.to].wine+arriving.wine >= data.conditions.accumulate.wine){
							this.finishTask(task);
							AB.saveData();
							toUpdateList = true;
							continue;
						}
					}
					execute = i;
					break;
				}
				else if(task.type == 2 || task.type == 3){	// pillage task
					if(pending || data.finished) {AB.log("pillage: is finnished"); continue}
					if(task.type == 2 && this.tasksSession[task.id].state != 1) {AB.log("pillage: state not 1 but "+this.tasksSession[task.id].state); continue}
					if(AB.ships < data.allShips) {AB.log("pillage: not enough ships (have "+AB.ships+", need "+data.allShips); continue}
					for(var unit in data.units){
						if(AB.updatedCityTroops[data.from].troops[unit] < data.units[unit]) {
							AB.log("pillage: not enough "+unit+", have: "+AB.updatedCityTroops[data.from].troops[unit]+", needed: "+data.units[unit]);
							continue taskloop;
						}
					}
					execute = i;
					break;
				}
				else if(task.type == 4){	// blockade task
					if(pending || data.finished) {AB.log("blockade: pending or finished"); continue}
					for(var unit in data.units){
						if(AB.updatedCityTroops[data.from].ships[unit] < data.units[unit]) {
							AB.log("blockade: not enough "+unit+", available: "+AB.updatedCityTroops[data.from].ships[unit]+", needed: "+data.units[unit]);
							continue taskloop;
						}
					}
					execute = i;
					break;
				}
			}
			
			if(execute >= 0){
				session.set('ABState', AB.state=8);
				session.set('ASC_task', i);
				AB.saveReturnURL();
				return this.executeTask(i);
			}
			else{
				if(nextScheduledTask && nextScheduledTask < AB.ts+AB.checkInterval*60000){		// required precision
					setTimeout(function(){try{ASC.check()}catch(e){AB.error(e)}}, nextScheduledTask-ts);
				}
				if(toUpdateList) this.updateList();
			}
			return false;
		},
		
		executeTask: function(i){
			i = i||Number(session.get('ASC_task'));
			AB.log("executing task "+i+", type: "+AB.Data.ASC.tasks[i].type);
			if(AB.Data.ASC.tasks[i].type == 1) return this.executeTransportTask(i);
			if(AB.Data.ASC.tasks[i].type == 2) return this.executeAttackTask(i);	// Pillage
			if(AB.Data.ASC.tasks[i].type == 3) return this.executeAttackTask(i);	// Occupation
			if(AB.Data.ASC.tasks[i].type == 4) return this.executeBlockadeTask(i);
			return false;
		},
		
		executeTransportTask: function(i){
			AB.log("ASC - executeTransportTask")
			setTimeout(function(){try{
				var task = AB.Data.ASC.tasks[i];
				var data = task.data;
				var state = Number(session.get("ASC_state"))||0;
				
				var res, info = "";
				for(res in task.data.res) if(task.data.res[res]) info += task.data.res[res]+" "+AB.getResourceImg(res)+" ";
				AB.displayWaitBox("Scheduled", "Transporting "+info+" from <b><i>"+AB.Cities[task.data.from].city_name+"</i></b> to <b><i>"+AB.Cities[task.data.to].city_name+"</i></b>");
				
				if(state === 0){
					session.set("ASC_state", 1);
					AB.goTo(task.data.from, "?view=transport&destinationCityId="+task.data.to);
					return true;
				}
				else if(state === 1){
					if(Number(AB.Cities[AB.cityId].actions) == 0){
						ASC.finish();
						return true;
					}
					if(AB.view != "transport" || data.from != AB.cityId) {// User changed the page
						session.set("ASC_state", 0); 
						return ASC.executeTask(i);
					}
					var input, button, amount, sum = 0;;
					var max = AB.getResCapacity(task.data.to);
					var sent = {}
					for(res in task.data.res){
						sent[res] = 0;
						if(!task.data.res[res]) continue;
						input = $("textfield_"+res);
						amount = AB.updatedCityResources[data.to][res]+task.data.res[res] > max? max-AB.updatedCityResources[data.to][res]: task.data.res[res];
						sum += amount;
						sent[res] = amount;
						input.value = amount;
						input.focus(); input.select();
					}
					if(sum == 0){
						ASC.finishTask(task);
						AB.saveData();
						ASC.finish();
						return true;
					}
					
					// update task
					var finished = false;
					if(!data.conditions.toAccumulate) --data.conditions.times;
					else{
						var goalreached = true;
						for(res in task.data.res) if(data.conditions.accumulate[res] < AB.updatedCityResources[data.to][res]+sent[res]) {goalreached = false; break;}
						if(goalreached) finished = true;
					}
					if(data.conditions.times <= 0)  finished = true;
					if(!finished){
						var arrivetime = (1 +sum/AB.getLoadingSpeed(data.from) + AB.getTradeTravelTime(data.from, data.to))*60000 + AB.ts; 
						data.conditions.time = arrivetime;		// schedule next transport, when the current one arrives
					}
					else ASC.finishTask(task);
					
					session.set("ASC_state", 2);
					if(!(button = $('submit'))) throw new Error("ASC Error! No button found!");
					AB.saveData(function(){try{
						button.click();
					}catch(e){AB.error(e)}});
					return true;
				}
				else if(state === 2){
					ASC.finish();
					return true;
				}
			}
			catch(e){
				ASC.finishTask(task);
				data.statuscode = 10;
				AB.saveData();
				AB.error(e)
			}}, 600);
			return true;
		},
		
		executeAttackTask: function(i){
			AB.log("ASC - executePillageTask");
			setTimeout(function(){try{
				var task = AB.Data.ASC.tasks[i]; 
				var data = task.data;
				var state = Number(session.get("ASC_state"))||0;
				if(!ASC.tasksSession) ASC.tasksSession = eval(session.get("ASC_tasks"));
				
				var unit, info = "";
				for(unit in task.data.units) if(task.data.units[unit]) info += task.data.units[unit]+" "+ASC.getUnitImg(unit)+" ";
				AB.displayWaitBox("Scheduled", (task.type==2?"Pillaging":"Occupying")+" <b style=\"color:red;\">"+AB.getResourceImg(data.targetRes)+" "+data.targetName+" ("+data.targetPlayer+")</b> with "+info+" from <b><i>"+(AB.Cities[task.data.from]?AB.Cities[task.data.from].city_name: AB.occupiedCities[task.data.from].name)+"</i></b>");
				
				if(state === 0){
					session.set("ASC_state", 1);
					AB.goTo(task.data.from, "?view="+(task.type==2?"plunder":"occupy")+"&destinationCityId="+task.data.to);
					return true;
				}
				else if(state === 1){
					if(AB.Cities[AB.cityId] && Number(AB.Cities[AB.cityId].actions) == 0|| Number($("value_maxActionPoints").textContent) == 0){
						ASC.finish();
						return true;
					}
					if(AB.view != (task.type==2?"plunder":"occupy") || data.from != AB.cityId) {// User changed the page
						session.set("ASC_state", 0);
						return ASC.executeTask(i);
					}
					var input, button, evt, sum = 0;
					evt = document.createEvent("HTMLEvents");
					evt.initEvent("click", true, true ); // event type,bubbling,cancelable
					for(unit in task.data.units){;
						if(!task.data.units[unit]) continue;
						//AB.log("adding "+task.data.units[unit]+" "+unit)
						input =  XP("//ul[@class='assignUnits']/li[contains(@class, '"+unit+"')]/input[@type='text'][1]");
						if(!input){ // not enough troops - calculation was wrong BUG
							task.enabled = 0;
							data.statuscode = 11;
							AB.saveData();
							return ASC.finish();
						}
						sum += task.data.units[unit];
						input.value = task.data.units[unit];
						input.dispatchEvent(evt);
					}
					if(sum == 0){
						ASC.finishTask(task);
						AB.saveData();
						ASC.finish();
						return true;
					}
					if(task.type == 2){
						var neededShips = parseInt(XP("//div[@class='neededTransporter']/*[@id='transporterCount']").textContent, 10);
						var ships = data.allShips-neededShips;
						input = XP("//div[@id='selectArmy']/div/div[@id='missionSummary']//input[@id='extraTransporter']");
						input.value = ships;
						input.dispatchEvent(evt);
					}
					// update task
					if(task.type == 2) data.statuscode = 3;
					if(!data.conditions.empty) --data.conditions.times;
					if(data.conditions.times <= 0){
						ASC.finishTask(task);
						data.statuscode = 0;
					}
					if(!data.finished && task.type == 2){
						ASC.tasksSession[task.id].state = 2;
						ASC.tasksSession[task.id].checked = 0;
						session.set("ASC_tasks", uneval(ASC.tasksSession));
					}
					if(task.type == 2) session.set("ASC_lastPillageSent", AB.ts);
					session.set("ASC_state", 2);
					
					AB.saveData(function(){
						$('plunderForm').submit();
					});
					return true;
				}
				else if(state === 2){
					ASC.finish();
					return true;
				}
			}
			catch(e){
				ASC.finishTask(task);
				data.statuscode = 10;
				AB.saveData();
				AB.error(e)
			}}, 600);
			return true;
		},
		
		executeBlockadeTask: function(i){
			AB.log("ASC - executeBlockadeTask");
			setTimeout(function(){try{
				var task = AB.Data.ASC.tasks[i]; 
				var data = task.data;
				var state = Number(session.get("ASC_state"))||0;
				if(!ASC.tasksSession) ASC.tasksSession = eval(session.get("ASC_tasks"));
				
				var unit, info = "";
				for(unit in task.data.units) if(task.data.units[unit]) info += task.data.units[unit]+" "+ASC.getNavalUnitImg(unit)+" ";
				AB.displayWaitBox("Scheduled", "Blocking Port of <b style=\"color:red;\">"+AB.getResourceImg(data.targetRes)+" "+data.targetName+" ("+data.targetPlayer+")</b> with "+info+" from <b><i>"+(AB.Cities[task.data.from]?AB.Cities[task.data.from].city_name: AB.occupiedCities[task.data.from].name)+"</i></b>");
				
				if(state === 0){
					session.set("ASC_state", 1);
					AB.goTo(task.data.from, "?view=blockade&destinationCityId="+task.data.to);
					return true;
				}
				else if(state === 1){
					if(Number(AB.Cities[AB.cityId].actions) == 0){
						ASC.finish();
						return true;
					}
					if(AB.view != "blockade" || data.from != AB.cityId) {// User changed the page
						session.set("ASC_state", 0);
						return ASC.executeTask(i);
					}
					var input, button, evt;
					evt = document.createEvent("HTMLEvents");
					evt.initEvent("click", true, true ); // event type,bubbling,cancelable
					for(unit in task.data.units){;
						if(!task.data.units[unit]) continue;
						//AB.log("adding "+task.data.units[unit]+" "+unit)
						input =  XP("//ul[@class='assignUnits']/li[contains(@class, 'ship_"+unit+"')]/input[@type='text'][1]");
						if(!input){ // not enough troops - calculation was wrong BUG
							task.enabled = 0;
							data.statuscode = 11;
							AB.saveData();
							return ASC.finish();
						}
						input.value = task.data.units[unit];
						input.dispatchEvent(evt);
					}
					XP("//select[@id='time']").selectedIndex = data.duration;
					// update task
					ASC.finishTask(task);
					session.set("ASC_state", 2);
					
					AB.saveData(function(){
						$('blockadeForm').submit();
					});
					return true;
				}
				else if(state === 2){
					ASC.finish();
					return true;
				}
			}
			catch(e){
				ASC.finishTask(task);
				data.statuscode = 10;
				AB.saveData();
				AB.error(e)
			}}, 600);
			return true;
		},
		
		finish: function(i){
			AB.log("ASC - finish")
			this.clearTempData();
			session.set('ABState', AB.state=0);
			initNOTIFIER();
			NOTIFIER.updateFleetMovements(1);
			return !AB.isReturnPage();
		},
		
		
		finishTask: function(task){
			if(task.data.repeat){
				if(task.type == 1){
					if(!task.data.toAccumulate) task.data.conditions.times = task.data.conditions.origTimes;
				}
				else if(task.type == 2){
					if(!task.data.empty) task.data.conditions.times = task.data.conditions.origTimes;
				}
				task.data.conditions.time = Timestamp()+task.data.repeat;
				task.data.statuscode = 0;
			}
			else task.data.finished = 1;
		},
		
		addTransportPageButton: function(){
			if(AB.view !== "transport") return;
			var obj = XP("//div[@id='transportGoods']/div/div[@class='centerButton']/input[@id='submit']");
			if(!obj) throw new Error("ASC addTransportPageButton: cannot find target element!");
			var e = ADD('<input type="button" class="button" style="margin-left:20px" title="Schedule Pillage Attack" value="Add this data to Auto Scheduler" />', obj.parentNode).
			addEventListener("click", function(){try{ASC.addTransportTask()}catch(e){AB.error(e)}}, false);
		},
		
		addPageButtonsAndInfos: function(){
			AB.log("addPageButtonsAndInfos ")
			if(AB.view === "plunder" || AB.view === "occupy"){
				var wrapper = XP("//div[@id='selectArmy']/div[@class='content']");
				if(!wrapper) throw new Error("ASC addPageButtonsAndInfos: cannot find wrapper element!");
				ADD('<input type="button" class="button" style="margin-left:20px" title="Schedule '+(AB.view=="plunder"?'Pillage':'Occupation')+' Attack" value="Add this data to Auto Scheduler" />', wrapper).
				addEventListener("click", function(){try{ASC.addTask()}catch(e){AB.error(e)}}, false);
			}
			else if(AB.view === "island"){
				var iid = queryString("cityId")||queryString("selectCity");
				var addASCButtons = function(id){
					try{
						if(!ASC.islandActionButtons){
							ASC.islandActionButtons = document.createElement("span");
							$("actions").appendChild(ASC.islandActionButtons);
						}
						var button = document.createElement("li");
						button.className = "plunder";
						button.innerHTML = '<a title="Schedule a pillage attack" href="javascript:;" t="2" cid="'+id+'"><span class="textLabel">ASC</span></a>';
						button.addEventListener("click", function(e){try{ASC.addTask(e.currentTarget.firstChild)}catch(e){AB.error(e)}}, false);
						ASC.islandActionButtons.appendChild(button);
						button = document.createElement("li");
						button.className = "occupy";
						button.innerHTML = '<a title="Schedule Ocuppation" href="javascript:;" t="3" cid="'+id+'"><span class="textLabel">ASC</span></a>';
						button.addEventListener("click", function(e){try{ASC.addTask(e.currentTarget.firstChild)}catch(e){AB.error(e)}}, false);
						ASC.islandActionButtons.appendChild(button);
						button = document.createElement("li");
						button.className = "blockade";
						button.innerHTML = '<a title="Schedule Blockade" href="javascript:;" t="4" cid="'+id+'"><span class="textLabel">ASC</span></a>';
						button.addEventListener("click", function(e){try{ASC.addTask(e.currentTarget.firstChild)}catch(e){AB.error(e)}}, false);
						ASC.islandActionButtons.appendChild(button);
						
						// while we're at it, add Farmlist Button as well 
						initFL();
						if(!FL.isFarm(id)){
							button = document.createElement("li");
							button.className = "FL_farm";
							button.innerHTML = '<a title="Add this Farm to Farmlist" href="javascript:;" cid="'+id+'"><span class="textLabel">Add Farm</span></a>';
							button.addEventListener("click", function(e){try{FL.addNewFarmFromPage(e.currentTarget.firstChild)}catch(e){AB.error(e)}}, false);
							FL.addFarmButton = button;
							ASC.islandActionButtons.appendChild(button);
						}
					}
					catch(e){
						AB.error(e)	
					}
				};
				function addCityFeatures(li){try{
					if(ASC.islandActionButtons) ASC.islandActionButtons.innerHTML = null; // ASC buttons
					li = li.nodeName?li:li.currentTarget.parentNode;
					var player = strReplace(trim(XP("ul[@class='cityinfo']/li[@class='owner']/span[1]",0,li).nextSibling.data), " ", "+");
					ASC.addGeneralsScore(player);
					ASC.addPlayerCitiesButton(player);
				}catch(e){AB.error(e)}}
				
				Xp("//ul[@id='cities']/li/a[1]", 1).forEach(function(e){e.addEventListener("click", addCityFeatures, false)});
				Xp("//ul[@id='cities']/li[ul[@class='cityactions'][li[@class='plunder' or @class = 'plunder disabled']]]/a[1]", 1).forEach(function(e){
					var id = Number(e.id.slice(5));
					e.addEventListener("click", function(){addASCButtons(id)}, false);
				});
				if(iid){
					var e = $("city_"+iid);
					e && XP("ul[@class='cityactions'][li[@class='plunder' or @class = 'plunder disabled']]", 0, e.parentNode) && setTimeout(function(){addASCButtons(iid)}, 500);
					e && addCityFeatures(e.parentNode);
				}
				// CSS for player Cities info box
				GM_addStyle('.playerCityListForInfoBox {width:100%; margin-left:5px;}\
							.playerCityListForInfoBox td { padding:.25em 0 !important; font-size:11px !important; vertical-align:middle; text-align:left !important; }\
							.playerCityListForInfoBox td img { width:auto; display:inline !important; margin-right:1px !important; height:10px; position:relative; top:-2px; vertical-align:middle;}');
			}
		},
		
		addPlayerCitiesButton: function(player){
			if(!ASC.playerCitiesWrapperObj){
				ASC.playerCitiesWrapperObj = ADD('<br /><span style="text-align:center;  display:block;"></span>', $("information"));
			}
			if(ASC.playerCities && ASC.playerCities[player]) ASC.playerCitiesWrapperObj.innerHTML = ASC.playerCities[player];
			else{
				ASC.playerCitiesWrapperObj.innerHTML = '<a href="javascript:;">see all his cities</a>';
				ASC.playerCitiesWrapperObj.firstChild.addEventListener("click", function(e){try{ASC.getPlayerCities(e, player)}catch(e){AB.error(e)}}, false);
			}
		},
		
		getPlayerCities: function(e, player){
			e = e.currentTarget.parentNode; // link wrapper
			e.innerHTML = "loading...";
			function getPlayerCities(e){
				var t = AB.server.split("_");
				var land = t[1];
				var welt = t[0].slice(1);
				var url = 'http://us.ika-world.com/search.php?view=suche_stadt&land='+land+'&welt='+welt+'&spieler='+player;
				var headers = {
					"User-agent": navigator.userAgent, 
					"Accept": "text/html",
				}
				GM_xmlhttpRequest ({
					method:"GET",
					url:url,
					data:null,
					headers:headers,
					onload: function (response){
						try{
							AB.log("successfully loaded url: "+url)
							var span = document.createElement("span");
							span.innerHTML = response.responseText;
							var trs = XP(".//div[@id='main']/form/table[position()=2 and tbody/tr[3]/td[10]]/tbody/tr[position() > 2]", 1, span);
							if(!trs){
								AB.log("Error no cities")
								ASC.playerCities[player] = '<b style="color:red;" title="No data, probably banned.">Error!</b>';
								e.innerHTML = ASC.playerCities[player];
								return;
							}
							var i, cities = [];
							for(i = 0; i < trs.length; ++i){
								if(t=XP("td[4]/a",0,trs[i]))
									cities.push({
										name: t.textContent,
										link: (t=t.href).slice(t.lastIndexOf("http://")),
										level: XP("td[5]",0,trs[i]).textContent,
										islandX: XP("td[7]",0,trs[i]).textContent,
										islandY: XP("td[8]",0,trs[i]).textContent,
										woodLevel: XP("td[10]",0,trs[i]).textContent,
										tradegoodLevel: XP("td[11]",0,trs[i]).textContent,
										tradegoodType:AB.getResourceFromStr(XP("td[11]/span",0,trs[i]).className)
									});
							}
							var city, html = '<table cellspacing="0" cellpadding="0" border="0" width="210px;" class="playerCityListForInfoBox">'
							for (i = 0; i < cities.length; ++i) {
								city = cities[i];
								html += '<tr valign="middle">';
								html += '<td style="font-size:11px;">' +
											'<a target="_blank" href="'+city.link+'" title="View ' + city.name + ' on its island">' +
											'[' + city.islandX + ':' + city.islandY + '] ' + (city.name.length > 10 ? city.name.match(/^.{10}/)[0] + '…' : city.name) + ' (' + city.level + ')</a>' +
										'</td><td>' +
											'<nobr><img src="http://' + document.domain + '/skin/resources/icon_wood.gif"/>' + city.woodLevel + ' </nobr>' +
										'</td><td>' +
											'<nobr><img src="http://' + document.domain + '/skin/resources/icon_' + city.tradegoodType + '.gif"/>' + city.tradegoodLevel + '</nobr>' + 
										'</td>';
								html += '</tr>';
							}
							html +'</table>';
							ASC.playerCities[player] = html;
							e.innerHTML = ASC.playerCities[player];
						}
						catch(e){AB.error(e)}
					},
					onerror: function(){setTimeout(function(){try{AB.log("Request Error!"); getPlayerCities(e)}catch(e){AB.error(e)}}, 500)}
				});
			}
			if(!ASC.playerCities) ASC.playerCities = {};
			if(!ASC.playerCities[player]){
				getPlayerCities(e);
			}
			else e.innerHTML = ASC.playerCities[player];
		},
		
		addGeneralsScore: function(player){
			function getMilitaryScore(e){
				var url = AB.baseURL+'?view=highscore&searchUser='+player+'&highscoreType=army_score_main';
				var headers = {
					"User-agent": navigator.userAgent, 
					"Accept": "text/html", 
					"Cookie": document.cookie,
					"Referer":"http://" + document.domain + "/index.php",
				}
				GM_xmlhttpRequest ({
						method:"GET",
						url:url,
						data:null,
						headers:headers,
						onload: function (response){
							try{
								var s = document.createElement("span");
								s.innerHTML = response.responseText;
								s = XP(".//tr[td[@class='name']/text()='"+strReplace(player, "+"," ")+"']",0,s);
								var score = XP("td[@class='score']",0,s).textContent;
								var place = XP("td[@class='place']",0,s).textContent;
								ASC.generalScores[player] = '<br /><span class="textLabel">Generals: </span>'+score+' &nbsp;&nbsp;(place '+place+')';
								if(!e) e = XP("//div[@id='information']/ul[1]/li[4]");
								ADD(ASC.generalScores[player], e);
							}
							catch(e){AB.error(e)}
						},
						onerror: function(){setTimeout(function(){try{AB.log("Request Error!"); getMilitaryScore(e)}catch(e){AB.error(e)}}, 500)}
					});
			}
			var e = XP("//div[@id='information']/ul[1]/li[4]");
			if(!ASC.generalScores) ASC.generalScores = {};
			if(!ASC.generalScores[player]){
				getMilitaryScore(e);
			}
			else ADD(ASC.generalScores[player], e);
		},
		
		addTransportTask: function(){
			var input;
			var obj = this.getNewTransportTaskObj_template();
			for(var res in obj.res){
				input = $("textfield_"+res);
				if(!input) continue;
				obj.res[res] = parseInt(input.value, 10) || 0;
			}
			obj.from = AB.cityId;
			obj.to = XP("//form[@id='transport']/input[@name='destinationCityId']").value;
			this.displayTaskDiv(1, obj);
		},
		
		addTask: function(e){
			AB.log("addTask ")
			var obj, task;
			if(e && e.getAttribute) task = Number(e.getAttribute("t"));
			if(task == 2 || task == 3) obj = this.getNewPillageTaskObj_template();
			else if(task == 4) obj = this.getNewBlockadeTaskObj_template();
			
			if(AB.view === "island"){
				obj.from = AB.cityId;
				obj.to = Number(e.getAttribute("cid"));
				this.displayTaskDiv(task, obj);
				return;
			}
			else if(AB.view === "plunder"){
				if(!obj) obj = this.getNewPillageTaskObj_template();
				obj.from = AB.cityId;
				var units = XP("//div[@id='selectArmy']/div[@class='content']/ul[@class='assignUnits']/li", 1);
				if(!units) return;	// Error or no units in City
				units.forEach(function(e){
						var t, unit = trim(e.className); 
						if((t=unit.indexOf(" "))>0) unit = unit.slice(0, t);
						obj.units[unit] = parseInt(XP("input[@type='text'][1]",0,e).value, 10);
					});
				obj.ships = parseInt(XP("//div[@id='selectArmy']/div/div[@id='missionSummary']//input[@id='extraTransporter']").value, 10) || 0;
				obj.to = XP("//form[@id='plunderForm']/input[@name='destinationCityId']").value;
				this.displayTaskDiv(2, obj);
			}
			else return;
		},
		
		alignTaskDiv: function(){
			this.taskDivObj.style.top = Math.round((window.innerHeight - this.taskDivObj.offsetHeight)/2)+"px";
			this.taskDivObj.style.left = Math.round((window.innerWidth - this.taskDivObj.offsetWidth)/2)+"px";
		},
		
		displayTaskDiv: function(type, taskObj, edit){
			if(!this.taskDivObj){
				var htm = '<div id="ASC_Config" style="padding:0px; margin:0px; position:fixed; -moz-border-radius:4px 4px 0 0; z-index:2147483645; background-color:#F7F2D8; 1px solid DarkKhaki; opacity:.96; visibility:visible; min-width:200px;">\
						<div id="ASC_TitleBar" style="margin:0 0 1px; height:17px; -moz-border-radius:4px 4px 0 0; padding:3px 5px;"><span style="float:left; font-size:.8em"><b>Auto Scheduler - Task</b></span><a style="float:right" href="javascript:;" id="ASC_ConfigClose"><b>[x]</b></a></div>\
						 <div id="container" style="width: auto; margin: 0px; overflow-x: hidden; overflow-y: scroll; max-height: 600px; background-color: FloralWhite; border-right: 1px solid BurlyWood; border-width: 0px 1px 1px; border-style: solid; border-color: BurlyWood;">\
						 <label for="Task type"><b>task type: </b></label><select name="Task type" id="ASC_selectTaskType">\
						  <option> --- Select --- </option>\
						  <option>Transport Resources</option>\
						  <option>Pillage</option>\
						  <option>Occupy</option>\
						  <option>Block Port</option>\
						  </select>\
						   <div id="ASC_taskContent" style="padding:5px;"></div>\
						 </div>\
						 </div>';
				this.taskDivObj = ADD(htm);
				this.taskContentObj = $("ASC_taskContent");
				$("ASC_selectTaskType").addEventListener("change", function(e){try{ASC.drawTaskContent(e.currentTarget.selectedIndex)}catch(e){AB.error(e)}}, false);
				$("ASC_ConfigClose").addEventListener("click", function(e){try{ASC.closeTaskDiv()}catch(e){AB.error(e)}}, false);
				// mittig positionieren
				this.alignTaskDiv();
				$("ASC_TitleBar").style.background = 'url("skin/input/button.gif") repeat-x scroll 0 bottom #F8E7B3';
				
				GM_addStyle('#ASC_Config div,#ASC_Config fieldset,#ASC_Config legend,#ASC_Config span,#ASC_Config input,#ASC_Config th,#ASC_Config td,#ASC_Config tr,#ASC_Config table,#ASC_Config p{margin:2px; padding:2px; text-align:left;}');
				GM_addStyle('#ASC_Config td{border:1px solid PeachPuff; padding:2px 8px;}\
							#ASC_Config a{cursor:pointer;}\
							#ASC_Config input{background-color:white; background:white;}\
							#ASC_Config input.selectedTroops{border-color:LawnGreen; border-width:2px;}');
			}
			else this.taskDivObj.style.visibility = "visible";
			if(type && taskObj) {
				$("ASC_selectTaskType").selectedIndex = type;
				this.drawTaskContent(type, taskObj, edit);
			}
			
			(function() {
					var box = $("ASC_TitleBar");
					var b = document.body;
					var X, Y;
					box.addEventListener("mousedown", mousedownF, false);
					box = box.parentNode;
					
					function mousedownF(e){
						b.addEventListener("mousemove", mousemoveF, false);
						b.addEventListener("mouseup", mouseupF, false);
						X = e.screenX-(Number(box.offsetLeft));
						Y = e.screenY-(Number(box.offsetTop));
						box.style.left = e.screenX-X+'px';
						box.style.top = e.screenY-Y+'px';
						box.style.bottom = null;
						box.style.right = null;
						if (e.preventDefault) e.preventDefault();
						return false;
					}
					function mouseupF(e){
						b.removeEventListener("mousemove", mousemoveF, false);
						b.removeEventListener("mouseup", mouseupF, false);
					}
					function mousemoveF(e){
						box.style.left = e.screenX-X+'px';
						box.style.top = e.screenY-Y+'px';
						return false;
					}
				})();
		},
		
		drawTaskContent: function(type, obj, edit){
			this.taskContentObj.innerHTML = null;
			if(type==1){
				// Transport Resources
				obj = obj || this.getNewTransportTaskObj_template();
				var date = new Date();
				if(obj.conditions.time) date.setTime(obj.conditions.time)
				var sum = obj.res.wood+obj.res.marble+obj.res.sulfur+obj.res.glass+obj.res.wine;
				obj.ships = Math.ceil(sum/500);
				var maxShips = AB.getMaxShips();
				var city, cities = [];
				for(city in AB.Cities) {
					cities.push({id:city, name:AB.Cities[city].city_name, res: AB.Cities[city].prodgood, coord:AB.Cities[city].city_coord});
				}
				var htm = '<table><tr>\
					<td colspan="2"><b>from</b> \
					<select id="ASC_selectOriginCity">\
					  <option> --- Select --- </option>';
				for each(city in cities) htm += '<option'+(obj.from&&obj.from==city.id?' selected="selected"':'')+'>'+AB.getResourceImg(city.res)+city.coord+" "+city.name+'</option>';
				htm += '</select> <b>to</b> <select id="ASC_selectTargetCity">\
					  <option> --- Select --- </option>';
				for each(city in cities) htm += '<option'+(obj.to&&obj.to==city.id?' selected="selected"':'')+'>'+AB.getResourceImg(city.res)+city.coord+" "+city.name+'</option>';  
				htm += '</select></td>\
				  </tr>\
				  <tr style="height:38px;">\
					<td><b>Resources:</b></td>\
					<td id="ASC_resources">';
				var counter = 0;
				for(var res in obj.res) {
					if(++counter>1) htm += '<span style="width:1px; display:inline-block;"></span>';
					htm += AB.getResourceImg(res)+'<input style="width:45px; height:13; font-size:x-small; padding:0px;" title="'+res+'" res="'+res+'" type="text" onkeypress="event.keyCode==0xd && this.blur()" onfocus="this.select()" class="AS_inp" value="'+obj.res[res]+'" /> ';
				}
				htm += '</td>\
				  </tr>\
				  <tr>\
					<td><b>Ships:</b></td>\
					<td id="ASC_numShips">'+(obj.ships?obj.ships:'')+'</td>\
				  </tr>\
				  <tr>\
					<td><b>Conditions:</b></td>\
					<td><input type="radio" name="ASC_cond1" id="ASC_cond1_times" '+(obj.conditions.toAccumulate?'':'checked="checked"')+' /> \
						times: <input style="width:30px; height:13; font-size:x-small; padding:0px;" type="text" onkeypress="event.keyCode==0xd && this.blur()" onfocus="this.select()" class="AS_inp" id="ASC_condTimes" value="'+obj.conditions.times+'" /><br />\
						<span title="resource goal for target city" style="padding:0px; margin:0px;"><input type="radio" name="ASC_cond1" id="ASC_cond1_accumulate" '+(obj.conditions.toAccumulate?'checked="checked"':'')+' /> accumulate: </span><span id="ASC_accResources">';
				for(var res in obj.res) {
					htm += AB.getResourceImg(res)+' <span res="'+res+'">'+(obj.conditions.accumulate[res]?addCommas(obj.conditions.accumulate[res]):'-')+'</span> ';
					//htm += AB.getResourceImg(res)+' <input style="width:40px; height:13; font-size:x-small; padding:0px;" res="'+res+'" type="text" onkeypress="event.keyCode==0xd && this.blur()" onfocus="this.select()" class="AS_inp" value="'+(obj.conditions.accumulate[res]?obj.conditions.accumulate[res]:'-')+'" /> ';
				}
				htm += '</span></td></tr>\
				  <tr><td><b>Start:</b></td>\
				  	<td>\
						<input type="radio" name="ASC_cond2" '+(obj.conditions.time?'':'checked="checked"')+' id="ASC_cond2_now" /> immediately <span style="width:20px; display:inline-block;"></span>\
						<input type="radio" name="ASC_cond2" '+(obj.conditions.time?'checked="checked"':'')+' id="ASC_cond2_time" /> schedule <input style="width:170px; height:13; font-size:x-small; padding:0px;" type="text" onkeypress="event.keyCode==0xd && this.blur()" onfocus="" class="AS_inp" id="ASC_condTime" value="'+ASC.getFormatedTimeString(date)+'" /> <a id="ASC_setTimeToNow">now</a>\
						</td>\
				  </tr><tr>\
					<td><b>Position:</b></td>\
					<td colspan="3">\
						<span title="List position is interpreted as task priority" style="margin:0px; padding:0px;"><input type="radio" name="ASC_positionRadio" id="ASC_positionRadio1" '+(obj.position==1?'checked="checked"':'')+' /> \
						priority </span><span style="width:30px; display:inline-block;"></span>\
						<span title="List position is interpreted as sequence. The task will wait until all tasks above it are finished."><input type="radio" name="ASC_positionRadio" id="ASC_positionRadio2" '+(obj.position==2?'checked="checked"':'')+' /> sequence</span>\
					</td>\
				  </tr>\
				  </tr><tr>\
					<td><b>Repeat:</b></td>\
					<td colspan="3">\
						<input type="checkbox" title="if checked, task will be rescheduled when finished" id="ASC_repeatCB" '+(obj.repeat?'checked="checked"':'')+' /><span style="'+(obj.repeat?'':'color:gray;')+'">\
						every <input style="width:30px; height:13; font-size:x-small; padding:0px;" type="text" onkeypress="event.keyCode==0xd && this.blur()" onfocus="this.select()" class="AS_inp" id="ASC_repeatVal" value="'+(Math.round(obj.repeat/3600000/1)||24)+'"  /> hours</span>\
					</td>\
				  </tr>\
				</table> <div style="text-align:center"><span class="button" id="ASC_addButton" style="visibility:'+(obj.to && obj.from?"visible":"hidden")+'; display:inline-block; width:70px; text-align:center;"> '+(edit?'OK':'add')+' </span></div>';
				ADD(htm, this.taskContentObj);
				
				var timeInput = $("ASC_condTime");
				timeInput.disabled = !obj.conditions.time;
				timeInput.addEventListener("blur", function(e){try{setTime(e.currentTarget)}catch(e){AB.error(e)}}, false);
				$("ASC_selectOriginCity").addEventListener("change", function(e){try{setCity(e, e.currentTarget.selectedIndex, 0)}catch(e){AB.error(e)}}, false);
				$("ASC_selectTargetCity").addEventListener("change", function(e){try{setCity(e, e.currentTarget.selectedIndex, 1)}catch(e){AB.error(e)}}, false);
				$("ASC_cond1_times").addEventListener("click", function(e){try{obj.conditions.toAccumulate = 0;}catch(e){AB.error(e)}}, false);
				$("ASC_cond1_accumulate").addEventListener("click", function(e){try{obj.conditions.toAccumulate = 1;}catch(e){AB.error(e)}}, false);
				$("ASC_condTimes").addEventListener("blur", function(e){try{setCondTimes(e.currentTarget)}catch(e){AB.error(e)}}, false);
				$("ASC_cond2_now").addEventListener("click", function(e){try{obj.conditions.time = 0;  timeInput.disabled=true;}catch(e){AB.error(e)}}, false);
				$("ASC_cond2_time").addEventListener("click", function(e){try{obj.conditions.time = date.getTime(); timeInput.disabled=false;}catch(e){AB.error(e)}}, false);
				$("ASC_setTimeToNow").addEventListener("click", function(e){try{date=new Date(); timeInput.value=ASC.getFormatedTimeString(date); if(obj.conditions.time) setTime(timeInput);}catch(e){AB.error(e)}}, false);
				$("ASC_positionRadio1").addEventListener("click", function(e){try{obj.position = 1;}catch(e){AB.error(e)}}, false);
				$("ASC_positionRadio2").addEventListener("click", function(e){try{obj.position = 2;}catch(e){AB.error(e)}}, false);
				$("ASC_addButton").addEventListener("click", function(e){try{add()}catch(e){AB.error(e)}}, false);
				
				$("ASC_repeatCB").addEventListener("click", function(e){try{repeatCB(e.currentTarget)}catch(e){AB.error(e)}}, false);
				var repeatInput = $("ASC_repeatVal");
				repeatInput.disabled = !obj.repeat;
				repeatInput.addEventListener("blur", function(e){try{setRepeat(e.currentTarget)}catch(e){AB.error(e)}}, false);
				
				var resourceInputs = Xp("input[@res]",1, $("ASC_resources"))
				resourceInputs.forEach(function(e){e.addEventListener("blur", function(e){try{setResource(e.currentTarget)}catch(e){AB.error(e)}}, false)});
				var accResourceInputs = Xp("span[@res]",1, $("ASC_accResources"))
				accResourceInputs.forEach(function(e){e.addEventListener("click", function(e){try{accResourceClick(e.currentTarget)}catch(e){AB.error(e)}}, false)});
				
				
				function setResource(e){
					var val = parseInt(e.value, 10);
					if(!e.value) val = 0;
					var res = e.getAttribute("res");
					if(!isNaN(val) && val >= 0){
						sum -= obj.res[res];
						if(sum + val > maxShips*500){
							val = maxShips*500-sum;	
						}
						obj.res[res] = val;
						sum += val;
						obj.ships = Math.ceil(sum/500);
						$("ASC_numShips").textContent = obj.ships;
					}
					else AB.denyValueSet(e);
					e.value = obj.res[res];
				}
				function accResourceClick(e){
					if(!obj.to){
						alert("select a target city first");
						return;	
					}
					var res = e.getAttribute("res");
					e.innerHTML = '<input style="width:40px; height:13; font-size:x-small; padding:0px;" res="'+res+'" type="text" onkeypress="event.keyCode==0xd && this.blur()" onfocus="this.select()" class="AS_inp" value="'+(obj.conditions.accumulate[res]?obj.conditions.accumulate[res]:'-')+'" />';
					e.firstChild.addEventListener("blur", function(e){try{setAccResource(e.currentTarget)}catch(e){AB.error(e)}}, false);
					e.firstChild.focus(); e.firstChild.select(); 
				}
				function setAccResource(e){
					var val = parseInt(e.value, 10);
					var res = e.parentNode.getAttribute("res");
					if(!isNaN(val) && val > 0){
						var max = AB.getResCapacity(obj.to);
						if(val > max) val = max;
						obj.conditions.accumulate[res] = val;
					}
					else if(val == 0 || e.value  == "-" || !e.value){
						obj.conditions.accumulate[res] = 0;
					}
					e.parentNode.textContent = obj.conditions.accumulate[res]?addCommas(obj.conditions.accumulate[res]):"-";
				}
				function setCity(e, i, target){
					AB.log("picked: "+i+", target: "+target)
					if(i == 0){
						e.preventDefault();
					}
					else if(target && obj.from == cities[i-1].id || !target && obj.to == cities[i-1].id){
						e.preventDefault();
						AB.denyValueSet(e.currentTarget);
					}
					else{
						if(target) obj.to = cities[i-1].id;
						else obj.from = cities[i-1].id;
					}
					$("ASC_addButton").style.visibility = obj.to && obj.from?"visible":"hidden";
				}
				function setCondTimes(e){
					var val = parseInt(e.value, 10);
					if(!e.value) val = 0;
					if(!isNaN(val) && val > 0){
						obj.conditions.origTimes = obj.conditions.times = val;
					}
					else AB.denyValueSet(e);
					e.value = obj.conditions.times;
				}
				function setTime(e){
					var val = Date.parse(e.value);
					if(!isNaN(val)){
						date.setTime(val);
						obj.conditions.time = val;
					}
					else AB.denyValueSet(e);
					//e.value = date.toGMTString();
					e.value = ASC.getFormatedTimeString(date);
				}
				function repeatCB(e){
					if(e.checked){
						repeatInput.disabled=false;
						e.nextSibling.style.color = 'inherit';
						setRepeat(repeatInput);
					}
					else{
						repeatInput.disabled=true;
						obj.repeat=0;
						repeatInput.value=24;
						repeatInput.nextSibling.data = " hours";
						e.nextSibling.style.color = 'gray';
					}
				}
				function setRepeat(e){
					var val = parseInt(e.value, 10);
					if(!repeatInput.disabled){
						if(!isNaN(val) && val >= 1){
							obj.repeat = Math.round(val*3600000);
							e.nextSibling.data = " hour"+(val===1?'':'s');
						}
						else AB.denyValueSet(e);
						e.value = obj.repeat/3600000||24;
					}
					e.title = (e.value%24?(e.value/24).toFixed(1):e.value/24)+" day"+(e.value!=24?'s':'');
				}
				function add(e){
//					console.dir(obj)
					if(sum === 0){
						alert("no resources set");
						return;
					}
					if(obj.conditions.toAccumulate){
						var ok = true, accsum = 0;
						for	(var res in obj.conditions.accumulate){
							accsum += obj.conditions.accumulate[res];
							if(obj.conditions.accumulate[res] && !obj.res[res]){
								alert("accumulation goal unreachablle.");
								return;
							}
						}
						if(!accsum){
							alert("no resources set for accumulation");
							return;
						}
					}
					if(!obj.to || !obj.from){
						alert("source/target city not set.");
						return;
					}
					if(obj.conditions.times <= 0){
						alert("Task should be executed at least 1 time.");
						return;
					}
					if(edit){
						if(obj.finished) obj.finished = 0;
						obj.statuscode = 0;
						AB.Data.ASC.tasks[ASC.editIndex].data = obj;
						AB.saveData();
					}
					else ASC.saveNewTask(type, obj);
					ASC.closeTaskDiv();
					ASC.updateList();
					ASC.updateNumTasksInfo();
				}
			}
			else if(type==2 || type==3){
				// Pillage
				obj = obj || this.getNewPillageTaskObj_template();
				var date = new Date();
				if(obj.conditions.time) date.setTime(obj.conditions.time)
				var maxShips = AB.getMaxShips();
				var unitsCargoSpace = 0;
				var city, cities = [];
				for(city in AB.Cities) {
					cities.push({id:city, name:AB.Cities[city].city_name, coord:AB.Cities[city].city_coord, occupied:false});
				}
				for(city in AB.occupiedCities) {
					cities.push({id:city, name:AB.occupiedCities[city].name, coord:AB.occupiedCities[city].coords||'', occupied:AB.occupiedCities[city].type});
				}
				var htm = '<table><tr>\
					<td><b>Origin:</b></td>\
					<td><select id="ASC_selectOriginCity">\
					  <option> --- Select --- </option>';
				for each(city in cities) htm += '<option'+(obj.from&&obj.from==city.id?' selected="selected"':'')+' '+(city.occupied?'style="background-color:'+(city.occupied==1?'#FFDED8':'#BFFFBF')+';"':'')+'>'+city.coord+" "+city.name+'</option>';
				htm += '</select></td>\
				  </tr><tr>\
					<td><b>Target:</b></td>\
					<td><input style="width:40px; height:13; font-size:x-small; padding:0px;" type="text" onkeypress="event.keyCode==0xd && this.blur()" onfocus="this.select()" class="AS_inp" id="ASC_targetCID" value="'+(obj.to?obj.to:'')+'" title="input target cityID" /> <span id="ASC_targetInfo"></span></td>\
				  </tr>\
				  <tr>\
					<td><b>Units</b></td><td id="ASC_numUnits" style="text-align:center"></td>\
				  </tr>\
				  <tr>\
					<td><b>Ships:</b></td>\
					<td><span id="ASC_neededShips">0</span> + <input style="width:40px; height:13; font-size:x-small; padding:0px;" type="text" onkeypress="event.keyCode==0xd && this.blur()" onfocus="this.select()" class="AS_inp" id="ASC_numShips" value="'+obj.ships+'" '+(type==3?'disabled="disabled"':'')+' /></td>\
				  </tr>';
				  if(type==2) htm += '<tr>\
					<td><b>Conditions:</b></td>\
					<td><input type="radio" name="ASC_cond1" id="ASC_cond1_times" '+(obj.conditions.empty?'':'checked="checked"')+' /> \
						times: <input style="width:30px; height:13; font-size:x-small; padding:0px;" type="text" onkeypress="event.keyCode==0xd && this.blur()" onfocus="this.select()" class="AS_inp" id="ASC_condTimes" value="'+obj.conditions.times+'" /><span style="width:30px; display:inline-block;"></span>\
						<span title="attack until target warehouse(s) are empty"><input type="radio" name="ASC_cond1" id="ASC_cond1_empty" '+(obj.conditions.empty?'checked="checked"':'')+' /> empty</span>\
					</td></tr>';
				  htm += '<tr><td><b>Start:</b></td>\
				  	<td>\
						<input type="radio" name="ASC_cond2" '+(obj.conditions.time?'':'checked="checked"')+' id="ASC_cond2_now" /> immediately <span style="width:20px; display:inline-block;"></span>\
						<input type="radio" name="ASC_cond2" '+(obj.conditions.time?'checked="checked"':'')+' id="ASC_cond2_time" /> schedule <input style="width:170px; height:13; font-size:x-small; padding:0px;" type="text" onkeypress="event.keyCode==0xd && this.blur()" onfocus="" class="AS_inp" id="ASC_condTime" value="'+ASC.getFormatedTimeString(date)+'" /> <a id="ASC_setTimeToNow">now</a>\
						</td>\
				  </tr><tr>\
					<td><b>Position:</b></td>\
					<td>\
						<span title="List position is interpreted as task priority" style="margin:0px; padding:0px;"><input type="radio" name="ASC_positionRadio" id="ASC_positionRadio1" '+(obj.position==1?'checked="checked"':'')+' /> \
						priority </span><span style="width:30px; display:inline-block;"></span>\
						<span title="List position is interpreted as sequence. The task will wait until all tasks above it are finished."><input type="radio" name="ASC_positionRadio" id="ASC_positionRadio2" '+(obj.position==2?'checked="checked"':'')+' /> sequence</span>\
					</td>\
				  </tr>\
				  </tr><tr>\
					<td><b>Repeat:</b></td>\
					<td colspan="3">\
						<input type="checkbox" title="if checked, task will be rescheduled when finished" id="ASC_repeatCB" '+(obj.repeat?'checked="checked"':'')+' /><span style="'+(obj.repeat?'':'color:gray;')+'">\
						every <input style="width:30px; height:13; font-size:x-small; padding:0px;" type="text" onkeypress="event.keyCode==0xd && this.blur()" onfocus="this.select()" class="AS_inp" id="ASC_repeatVal" value="'+(Math.round(obj.repeat/3600000/1)||24)+'"  /> hours</span>\
					</td>\
				  </tr>\
				</table> <div style="text-align:center"><span class="button" id="ASC_addButton" style="visibility:hidden; display:inline-block; width:70px; text-align:center;"> '+(edit?'OK':'add')+' </span></div>';
				ADD(htm, this.taskContentObj);
				// units
				var tdUnits = $("ASC_numUnits"), counter = 0;
				for(var unit in obj.units){
					ADD(this.getUnitImg(unit)+' ', tdUnits);
					ADD(' <input style="width:40px; height:13; font-size:x-small; padding:0px;" title="'+AB.Config.unitnames["unit "+unit]+'" unit="'+unit+'" type="text" onkeypress="event.keyCode==0xd && this.blur()" onfocus="this.select()" class="AS_inp '+(obj.units[unit]?'selectedTroops':'')+'" value="'+obj.units[unit]+'" />', tdUnits).addEventListener("blur", function(e){try{setUnits(e.currentTarget)}catch(e){AB.error(e)}}, false);
					++counter
					if(counter==4||counter==7||counter==10) ADD('<br />', tdUnits);
				}
				if(obj.to){
					if(edit || obj.targetName){
						$("ASC_targetInfo").innerHTML = AB.getResourceImg(obj.targetRes)+' <a target="_blank" href="?view=island&cityId='+obj.to+'">'+obj.targetName+' '+obj.targetCoords+'</a> - (<a target="_blank" href="?view=highscore&searchUser='+obj.targetPlayer+'">'+obj.targetPlayer+'</a>)';
						if(obj.from) $("ASC_addButton").style.visibility = "visible";
						setTimeout(function(e){try{updateUnitsCargoSpace();}catch(e){AB.error(e)}}, 30);
					}
					else setTimeout(function(e){try{setTargetCity($("ASC_targetCID"), 1); updateUnitsCargoSpace();}catch(e){AB.error(e)}}, 30);
				}
				 
				var timeInput = $("ASC_condTime");
				timeInput.disabled = !obj.conditions.time;
				$("ASC_selectOriginCity").addEventListener("change", function(e){try{setOriginCity(e, e.currentTarget.selectedIndex)}catch(e){AB.error(e)}}, false);
				$("ASC_targetCID").addEventListener("blur", function(e){try{setTargetCity(e.currentTarget)}catch(e){AB.error(e)}}, false);
				$("ASC_numShips").addEventListener("blur", function(e){try{setShips(e.currentTarget)}catch(e){AB.error(e)}}, false);
				$("ASC_cond2_now").addEventListener("click", function(e){try{obj.conditions.time = 0; timeInput.disabled = true;}catch(e){AB.error(e)}}, false);
				$("ASC_cond2_time").addEventListener("click", function(e){try{obj.conditions.time = date.getTime(); timeInput.disabled = false;}catch(e){AB.error(e)}}, false);
				timeInput.addEventListener("blur", function(e){try{setTime(e.currentTarget)}catch(e){AB.error(e)}}, false);
				$("ASC_addButton").addEventListener("click", function(e){try{add()}catch(e){AB.error(e)}}, false);
				$("ASC_setTimeToNow").addEventListener("click", function(e){try{date=new Date(); timeInput.value=ASC.getFormatedTimeString(date); if(obj.conditions.time) setTime(timeInput);}catch(e){AB.error(e)}}, false);
				$("ASC_positionRadio1").addEventListener("click", function(e){try{obj.position = 1;}catch(e){AB.error(e)}}, false);
				$("ASC_positionRadio2").addEventListener("click", function(e){try{obj.position = 2;}catch(e){AB.error(e)}}, false);
				if(type == 2){
					$("ASC_cond1_times").addEventListener("click", function(e){try{obj.conditions.empty = 0;}catch(e){AB.error(e)}}, false);
					$("ASC_cond1_empty").addEventListener("click", function(e){try{obj.conditions.empty = 1;}catch(e){AB.error(e)}}, false);
					$("ASC_condTimes").addEventListener("blur", function(e){try{setCondTimes(e.currentTarget)}catch(e){AB.error(e)}}, false);
				}
				
				$("ASC_repeatCB").addEventListener("click", function(e){try{repeatCB(e.currentTarget)}catch(e){AB.error(e)}}, false);
				var repeatInput = $("ASC_repeatVal");
				repeatInput.disabled = !obj.repeat;
				repeatInput.addEventListener("blur", function(e){try{setRepeat(e.currentTarget)}catch(e){AB.error(e)}}, false);
				
				function setTime(e){
					var val = Date.parse(e.value);
					if(!isNaN(val)){
						date.setTime(val);
						obj.conditions.time = val;
					}
					else AB.denyValueSet(e);
					e.value = ASC.getFormatedTimeString(date);
				}
				function setCondTimes(e){
					var val = parseInt(e.value, 10);
					if(!e.value) val = 0;
					if(!isNaN(val) && val > 0){
						obj.conditions.origTimes = obj.conditions.times = val;
					}
					else AB.denyValueSet(e);
					e.value = obj.conditions.times;
				}
				function setShips(e){
					var val = parseInt(e.value, 10);
					if(!e.value) val = 0;
					var neededShips = Math.ceil(unitsCargoSpace/500);
					if(!isNaN(val) && val >= 0){
						if(val > maxShips-neededShips) val = maxShips-neededShips;
						obj.ships = val;
						obj.allShips = neededShips+obj.ships;
					}
					else AB.denyValueSet(e);
					e.value = obj.ships;
				}
				function setOriginCity(e, i){
					if(i == 0){
						e.preventDefault();
						obj.from = null;
					}
					else{
						obj.from = cities[i-1].id;
						var occupied = cities[i-1].occupied;
						// correct unit numbers
						var unit, max, cityUnits = occupied?AB.occupiedCities[obj.from].units : AB.Cities[obj.from].units; //["unit "+unit].count
						var unitInputs = XP("input[@unit]",1,tdUnits);
						for each(var Unit in unitInputs){
							unit = Unit.getAttribute("unit");
							max = cityUnits? occupied? cityUnits[unit]||0 : cityUnits["unit "+unit].count : 0;
							if(obj.units[unit] > max){
								obj.units[unit] = max;
								Unit.value = obj.units[unit];
							}
							if(max == 0) Unit.setAttribute("class", 'AS_inp');
						}
					}
					$("ASC_addButton").style.visibility = obj.to && obj.from?"visible":"hidden";
				}
				function setTargetCity(e, forceCheck){
					var val = parseInt(e.value, 10);
					if(val == obj.to && !forceCheck) return;
					var isOwn = function(id){for each(var c in cities) if(c.id == id) return true; return false;};
					if(!isNaN(val) && String(val).length <= 6 && !isOwn(val)){
						checkTargetCity(val, e);
					}
					else {
						obj.to = null;
						//e.value = obj.to || '';
						if(e.value != ''){
							AB.denyValueSet(e);
							$("ASC_targetInfo").innerHTML = '<span style="color:red">invalid input!</span>';
						}
					}
				}
				function getTargetInfoFromIslandView(doc, id, infoObj){
					var ns = function(){return doc.documentElement.namespaceURI};
					var span1 = XP("//n:div[@id='breadcrumbs']/n:span[1]",0, doc,doc, ns);
					if(!span1 || span1.textContent == "Error!"){
						infoObj.innerHTML = '<span style="color:red">Error: city not existent!</span>';;
						AB.denyValueSet(e);
						$("ASC_addButton").style.visibility = "hidden";
						//e.value = obj.to || '';
						return;
					}
					
					var temp, coords = XP("//n:div[@id='breadcrumbs']/n:span[@class='island']",0, doc,doc, ns).textContent;
					coords = trim(coords.slice(coords.indexOf("[")));
					var city = XP("//n:a[@id='city_"+id+"']",0, doc,doc, ns);
					var cityName = trim(XP("../n:ul[@class='cityinfo']/n:li[@class='name'][1]",0, city,doc, ns).lastChild.data); //  trim(XP("./n:span[@class='textLabel']",0, city,doc, ns).textContent);
					if((temp=cityName.indexOf("(")) !== -1) cityName = trim(cityName.slice(0, temp))
					var player = trim(XP("../n:ul[@class='cityinfo']/n:li[@class='owner']",0, city,doc, ns).textContent.split(":")[1]);
					//player = player[player.length-1];
					var res = AB.getResourceFromStr(XP("//n:li[@id='tradegood']",0, doc,doc, ns).className);
					
					obj.targetName = cityName;
					obj.targetPlayer = player;
					obj.targetCoords = coords;
					obj.targetRes = res;
					obj.to = id;
					infoObj.innerHTML = AB.getResourceImg(res)+' <a target="_blank" href="?view=island&cityId='+id+'">'+cityName+' '+coords+'</a> - (<a target="_blank" href="?view=highscore&searchUser='+player+'">'+player+'</a>)';
					$("ASC_addButton").style.visibility = obj.to && obj.from?"visible":"hidden";	
				}
				function checkTargetCity(id){
					var infoObj = $("ASC_targetInfo");
					infoObj.textContent = " loading...";
					if(id == obj.to && AB.view === "island"){

						getTargetInfoFromIslandView(document, id, infoObj);
						return;
					}
					
					setTimeout(function(){try{
						AB.log("Checking Target City")
						var url = 'http://' + document.domain + '/index.php?view=island&cityId='+id;
						var headers = {
							"User-agent": navigator.userAgent, 
							"Accept": "text/html", 
							"Cookie": document.cookie,
							"Referer":"http://" + document.domain + "/index.php",
						}
						GM_xmlhttpRequest ({
								method:"GET",
								url:url,
								data:null,
								headers:headers,
								onload: function (response){
									try{processResult(response)}
									catch(e){AB.error(e)}
								},
								onerror: function(){setTimeout(function(){try{AB.log("Request Error!"); checkTargetCity(val)}catch(e){AB.error(e)}}, 500)}
							});	
					}catch(e){AB.error(e)}}, 1);
					
					function processResult(response){
						AB.log("Processing Target City Page Response!");
						var html = document.createElement("html");
						html.innerHTML = response.responseText;
						var temp, doc = document.implementation.createDocument("", "", null);
						doc.appendChild(html);
						getTargetInfoFromIslandView(doc, id, infoObj);
					}
				}
				function setUnits(e){
					if(!obj.from){
						alert("select an origin city first."); e.value = 0; return;
					}
					var unit = e.getAttribute("unit");
					var val = parseInt(e.value, 10);
					if(!e.value) val = 0;
					if(!isNaN(val) && val >= 0){
						var temp;
						if(AB.occupiedCities[obj.from]) temp = AB.occupiedCities[obj.from].units? AB.occupiedCities[obj.from].units[unit]||0 : 0;
						else temp = AB.Cities[obj.from].units["unit "+unit].count;
						var neededShips;
						if(val > temp){
							AB.denyValueSet(e);
							val = temp;
						}
						if(Math.ceil((ASC.unitSpace[unit]*(val-obj.units[unit]) + unitsCargoSpace)/500) > maxShips){
							val = Math.floor((maxShips*500-unitsCargoSpace)/ASC.unitSpace[unit]);
						}
						unitsCargoSpace = unitsCargoSpace + ASC.unitSpace[unit]*(val-obj.units[unit]);
						neededShips = Math.ceil(unitsCargoSpace/500);
						if(neededShips+obj.ships > maxShips){
							obj.ships = maxShips - neededShips;
							$("ASC_numShips").value = obj.ships;
						}
						obj.allShips = neededShips+obj.ships;
						obj.units[unit] = val;
						$("ASC_neededShips").textContent = neededShips;
						e.setAttribute("class", obj.units[unit]?'AS_inp selectedTroops':'AS_inp');
					}
					else AB.denyValueSet(e);
					e.value = obj.units[unit];
				}
				function updateUnitsCargoSpace(){
					unitsCargoSpace = 0;
					for(var unit in obj.units){
						unitsCargoSpace += ASC.unitSpace[unit]*obj.units[unit];
					}
					var neededShips = Math.ceil(unitsCargoSpace/500);
					obj.allShips = obj.ships+neededShips;
					$("ASC_neededShips").textContent = neededShips;
				}
				function repeatCB(e){
					if(e.checked){
						repeatInput.disabled=false;
						e.nextSibling.style.color = 'inherit';
						setRepeat(repeatInput);
					}
					else{
						repeatInput.disabled=true;
						obj.repeat=0;
						repeatInput.value=24;
						repeatInput.nextSibling.data = " hours";
						e.nextSibling.style.color = 'gray';
					}
				}
				function setRepeat(e){
					var val = parseInt(e.value, 10);
					if(!repeatInput.disabled){
						if(!isNaN(val) && val >= 1){
							obj.repeat = Math.round(val*3600000);
							e.nextSibling.data = " hour"+(val===1?'':'s');
						}
						else AB.denyValueSet(e);
						e.value = obj.repeat/3600000||24;
					}
					e.title = (e.value%24?(e.value/24).toFixed(1):e.value/24)+" day"+(e.value!=24?'s':'');
				}
				function add(e){
					var sum = 0;
					for(var unit in obj.units){
						sum += obj.units[unit];
					}
					if(sum === 0){
						alert("no units selected for pillage task");
						return;
					}
					if(!obj.to || !obj.from){
						alert("source/target city not set.");
						return;
					}
					if(obj.conditions.times <= 0){
						alert("Task should be executed at least 1 time.");
						return;
					}
					if(edit){
						if(obj.finished) obj.finished = 0;
						obj.statuscode = 0;
						AB.Data.ASC.tasks[ASC.editIndex].data = obj;
						AB.saveData();
					}
					else ASC.saveNewTask(type, obj);
					// Farmlist
					try{
					if(FL.table && FL.addingASC && !ASC.isAttackTargetInList(FL.data.farms[FL.relatedObj.parentNode.parentNode.rowIndex])){
						FL.addingASC = false;
						FL.relatedObj.src = FL.cogImg;
					}
					}catch(e){AB.error(e)}
					ASC.closeTaskDiv();
					ASC.updateList();
					ASC.updateNumTasksInfo();
				}
			}
			else if(type==4){
				// Pillage
				obj = obj || this.getNewBlockadeTaskObj_template();
				var date = new Date();
				if(obj.conditions.time) date.setTime(obj.conditions.time)
				var city, cities = [];
				for(city in AB.Cities) {
					cities.push({id:city, name:AB.Cities[city].city_name, coord:AB.Cities[city].city_coord, occupied:false});
				}
				for(city in AB.occupiedCities) {
					cities.push({id:city, name:AB.occupiedCities[city].name, coord:AB.occupiedCities[city].coords||'', occupied:AB.occupiedCities[city].type});
				}
				var htm = '<table><tr>\
					<td><b>Origin:</b></td>\
					<td><select id="ASC_selectOriginCity">\
					  <option> --- Select --- </option>';
				for each(city in cities) htm += '<option'+(obj.from&&obj.from==city.id?' selected="selected"':'')+' '+(city.occupied?'style="background-color:'+(city.occupied==1?'#FFDED8':'#BFFFBF')+';"':'')+'>'+city.coord+" "+city.name+'</option>';
				htm += '</select></td>\
					<td><b>&nbsp;&nbsp;&nbsp;Duration:</b></td>\
					<td><select id="ASC_selectDuration" style="text-align:center; width:100px;">';
				for(var i=0; i<8; ++i) htm += '<option'+(obj.duration==i?' selected="selected"':'')+' >'+(i+1)+'h</option>';
				htm += '</select></td>\
				  </tr><tr>\
					<td><b>Target:</b></td>\
					<td colspan="3"><input style="width:40px; height:13; font-size:x-small; padding:0px;" type="text" onkeypress="event.keyCode==0xd && this.blur()" onfocus="this.select()" class="AS_inp" id="ASC_targetCID" value="'+(obj.to?obj.to:'')+'" title="input target cityID" /> <span id="ASC_targetInfo"></span></td>\
				  </tr>\
				  <tr>\
					<td><b>Ships</b></td><td id="ASC_numUnits" style="text-align:center" colspan="3"></td>\
				  </tr>\
				  <tr><td><b>Start:</b></td>\
				  	<td colspan="3">\
						<input type="radio" name="ASC_cond2" '+(obj.conditions.time?'':'checked="checked"')+' id="ASC_cond2_now" /> immediately <span style="width:20px; display:inline-block;"></span>\
						<input type="radio" name="ASC_cond2" '+(obj.conditions.time?'checked="checked"':'')+' id="ASC_cond2_time" /> schedule <input style="width:170px; height:13; font-size:x-small; padding:0px;" type="text" onkeypress="event.keyCode==0xd && this.blur()" onfocus="" class="AS_inp" id="ASC_condTime" value="'+ASC.getFormatedTimeString(date)+'" /> <a id="ASC_setTimeToNow">now</a>\
						</td>\
				  </tr><tr>\
					<td><b>Position:</b></td>\
					<td colspan="3">\
						<span title="List position is interpreted as task priority" style="margin:0px; padding:0px;"><input type="radio" name="ASC_positionRadio" id="ASC_positionRadio1" '+(obj.position==1?'checked="checked"':'')+' /> \
						priority </span><span style="width:30px; display:inline-block;"></span>\
						<span title="List position is interpreted as sequence. The task will wait until all tasks above it are finished."><input type="radio" name="ASC_positionRadio" id="ASC_positionRadio2" '+(obj.position==2?'checked="checked"':'')+' /> sequence</span>\
					</td>\
				  </tr>\
				  </tr><tr>\
					<td><b>Repeat:</b></td>\
					<td colspan="3">\
						<input type="checkbox" title="if checked, task will be rescheduled when finished" id="ASC_repeatCB" '+(obj.repeat?'checked="checked"':'')+' /><span style="'+(obj.repeat?'':'color:gray;')+'">\
						every <input style="width:30px; height:13; font-size:x-small; padding:0px;" type="text" onkeypress="event.keyCode==0xd && this.blur()" onfocus="this.select()" class="AS_inp" id="ASC_repeatVal" value="'+(Math.round(obj.repeat/3600000/1)||24)+'"  /> hours</span>\
					</td>\
				  </tr>\
				</table> <div style="text-align:center"><span class="button" id="ASC_addButton" style="visibility:hidden; display:inline-block; width:70px; text-align:center;"> '+(edit?'OK':'add')+' </span></div>';
				ADD(htm, this.taskContentObj);
				// units
				var tdUnits = $("ASC_numUnits"), counter = 0;
				for(var unit in obj.units){
					ADD(this.getNavalUnitImg(unit)+' ', tdUnits);
					ADD(' <input style="width:40px; height:13; font-size:x-small; padding:0px;" title="'+AB.Config.unitnames["unit ship_"+unit]+'" unit="'+unit+'" type="text" onkeypress="event.keyCode==0xd && this.blur()" onfocus="this.select()" class="AS_inp '+(obj.units[unit]?'selectedTroops':'')+'" value="'+obj.units[unit]+'" />', tdUnits).addEventListener("blur", function(e){try{setUnits(e.currentTarget)}catch(e){AB.error(e)}}, false);
					++counter
					if(counter==3||counter==4) ADD('<br />', tdUnits);
				}
				if(obj.to){
					if(edit || obj.targetName){
						$("ASC_targetInfo").innerHTML = AB.getResourceImg(obj.targetRes)+' <a target="_blank" href="?view=island&cityId='+obj.to+'">'+obj.targetName+' '+obj.targetCoords+'</a> - (<a target="_blank" href="?view=highscore&searchUser='+obj.targetPlayer+'">'+obj.targetPlayer+'</a>)';
						if(obj.from) $("ASC_addButton").style.visibility = "visible";
					}
					else setTimeout(function(e){try{setTargetCity($("ASC_targetCID"), 1);}catch(e){AB.error(e)}}, 30);
				}
				 
				var timeInput = $("ASC_condTime");
				timeInput.disabled = !obj.conditions.time;
				timeInput.addEventListener("blur", function(e){try{setTime(e.currentTarget)}catch(e){AB.error(e)}}, false);
				$("ASC_selectOriginCity").addEventListener("change", function(e){try{setOriginCity(e, e.currentTarget.selectedIndex)}catch(e){AB.error(e)}}, false);
				$("ASC_targetCID").addEventListener("blur", function(e){try{setTargetCity(e.currentTarget)}catch(e){AB.error(e)}}, false);
				$("ASC_selectDuration").addEventListener("change", function(e){try{setDuration(e.currentTarget.selectedIndex)}catch(e){AB.error(e)}}, false);
				$("ASC_cond2_now").addEventListener("click", function(e){try{obj.conditions.time = 0; timeInput.disabled = true;}catch(e){AB.error(e)}}, false);
				$("ASC_cond2_time").addEventListener("click", function(e){try{obj.conditions.time = date.getTime(); timeInput.disabled = false;}catch(e){AB.error(e)}}, false);
				$("ASC_addButton").addEventListener("click", function(e){try{add()}catch(e){AB.error(e)}}, false);
				$("ASC_setTimeToNow").addEventListener("click", function(e){try{date=new Date(); timeInput.value=ASC.getFormatedTimeString(date); if(obj.conditions.time) setTime(timeInput);}catch(e){AB.error(e)}}, false);
				$("ASC_positionRadio1").addEventListener("click", function(e){try{obj.position = 1;}catch(e){AB.error(e)}}, false);
				$("ASC_positionRadio2").addEventListener("click", function(e){try{obj.position = 2;}catch(e){AB.error(e)}}, false);
				
				$("ASC_repeatCB").addEventListener("click", function(e){try{repeatCB(e.currentTarget)}catch(e){AB.error(e)}}, false);
				var repeatInput = $("ASC_repeatVal");
				repeatInput.disabled = !obj.repeat;
				repeatInput.addEventListener("blur", function(e){try{setRepeat(e.currentTarget)}catch(e){AB.error(e)}}, false);
				
				function setTime(e){
					var val = Date.parse(e.value);
					if(!isNaN(val)){
						date.setTime(val);
						obj.conditions.time = val;
					}
					else AB.denyValueSet(e);
					e.value = ASC.getFormatedTimeString(date);
				}
				function setOriginCity(e, i){
					if(i == 0){
						e.preventDefault();
						obj.from = null;
					}
					else{
						obj.from = cities[i-1].id;
						var occupied = cities[i-1].occupied;
						// correct unit numbers
						var unit, max, cityUnits = occupied?AB.occupiedCities[obj.from].ships : AB.Cities[obj.from].units;
						var unitInputs = XP("input[@unit]",1,tdUnits);
						for each(var Unit in unitInputs){
							unit = Unit.getAttribute("unit");
							max = cityUnits? occupied? cityUnits[unit]||0 : cityUnits["unit ship_"+unit].count : 0;
							if(obj.units[unit] > max){
								obj.units[unit] = max;
								Unit.value = obj.units[unit];
							}
						}
					}
					$("ASC_addButton").style.visibility = obj.to && obj.from?"visible":"hidden";
				}
				function setDuration(i){
					obj.duration = i;
				}

				function setTargetCity(e, forceCheck){
					var val = parseInt(e.value, 10);
					if(val == obj.to && !forceCheck) return;
					var isOwn = function(id){for each(var c in cities) if(c.id == id) return true; return false;};
					if(!isNaN(val) && String(val).length <= 6 && !isOwn(val)){
						checkTargetCity(val, e);

					}
					else {
						obj.to = null;
						//e.value = obj.to || '';
						if(e.value != ''){
							AB.denyValueSet(e);
							$("ASC_targetInfo").innerHTML = '<span style="color:red">invalid input!</span>';
						}
					}
				}
				function getTargetInfoFromIslandView(doc, id, infoObj){
					var ns = function(){return doc.documentElement.namespaceURI};
					var span1 = XP("//n:div[@id='breadcrumbs']/n:span[1]",0, doc,doc, ns);
					if(!span1 || span1.textContent == "Error!"){
						infoObj.innerHTML = '<span style="color:red">Error: city not existent!</span>';;
						AB.denyValueSet(e);
						$("ASC_addButton").style.visibility = "hidden";
						//e.value = obj.to || '';
						return;
					}
					
					var coords = XP("//n:div[@id='breadcrumbs']/n:span[@class='island']",0, doc,doc, ns).textContent;
					coords = trim(coords.slice(coords.indexOf("[")));
					var city = XP("//n:a[@id='city_"+id+"']",0, doc,doc, ns);
					var cityName = trim(XP("../n:ul[@class='cityinfo']/n:li[@class='name'][1]",0, city,doc, ns).lastChild.data); //  trim(XP("./n:span[@class='textLabel']",0, city,doc, ns).textContent);
					if((temp=cityName.indexOf("(")) !== -1) cityName = trim(cityName.slice(0, temp))
					var player = trim(XP("../n:ul[@class='cityinfo']/n:li[@class='owner']",0, city,doc, ns).textContent.split(":")[1]);
					var res = AB.getResourceFromStr(XP("//n:li[@id='tradegood']",0, doc,doc, ns).className);
					
					obj.targetName = cityName;
					obj.targetPlayer = player;
					obj.targetCoords = coords;
					obj.targetRes = res;
					obj.to = id;
					infoObj.innerHTML = AB.getResourceImg(res)+' <a target="_blank" href="?view=island&cityId='+id+'">'+cityName+' '+coords+'</a> - (<a target="_blank" href="?view=highscore&searchUser='+player+'">'+player+'</a>)';
					$("ASC_addButton").style.visibility = obj.to && obj.from?"visible":"hidden";	
				}
				function checkTargetCity(id){
					var infoObj = $("ASC_targetInfo");
					infoObj.textContent = " loading...";
					if(id == obj.to && AB.view === "island"){
						getTargetInfoFromIslandView(document, id, infoObj);
						return;
					}
					
					setTimeout(function(){try{
						AB.log("Checking Target City")
						var url = 'http://' + document.domain + '/index.php?view=island&cityId='+id;
						var headers = {
							"User-agent": navigator.userAgent, 
							"Accept": "text/html", 
							"Cookie": document.cookie,
							"Referer":"http://" + document.domain + "/index.php",
						}
						GM_xmlhttpRequest ({
								method:"GET",
								url:url,
								data:null,
								headers:headers,
								onload: function (response){
									try{processResult(response)}
									catch(e){AB.error(e)}
								},
								onerror: function(){setTimeout(function(){try{AB.log("Request Error!"); checkTargetCity(val)}catch(e){AB.error(e)}}, 500)}
							});	
					}catch(e){AB.error(e)}}, 1);
					
					function processResult(response){
						AB.log("Processing Target City Page Response!");
						var html = document.createElement("html");
						html.innerHTML = response.responseText;
						var temp, doc = document.implementation.createDocument("", "", null);
						doc.appendChild(html);
						getTargetInfoFromIslandView(doc, id, infoObj);
					}
				}
				function setUnits(e){
					if(!obj.from){
						alert("select an origin city first."); e.value = 0; return;
					}
					var unit = e.getAttribute("unit");
					var val = parseInt(e.value, 10);
					if(!e.value) val = 0;
					if(!isNaN(val) && val >= 0){
						var temp;
						if(AB.occupiedCities[obj.from]) temp = AB.occupiedCities[obj.from].ships? AB.occupiedCities[obj.from].ships[unit]||0 : 0;
						else temp = AB.Cities[obj.from].units["unit ship_"+unit].count;
						if(val > temp){
							AB.denyValueSet(e);
							val = temp;
						}
						obj.units[unit] = val;
						e.setAttribute("class", obj.units[unit]?'AS_inp selectedTroops':'AS_inp');
					}
					else AB.denyValueSet(e);
					e.value = obj.units[unit];
				}
				function repeatCB(e){
					if(e.checked){
						repeatInput.disabled=false;
						e.nextSibling.style.color = 'inherit';
						setRepeat(repeatInput);
					}
					else{
						repeatInput.disabled=true;
						obj.repeat=0;
						repeatInput.value=24;
						repeatInput.nextSibling.data = " hours";
						e.nextSibling.style.color = 'gray';
					}
				}
				function setRepeat(e){
					var val = parseInt(e.value, 10);
					if(!repeatInput.disabled){
						if(!isNaN(val) && val >= 1){
							obj.repeat = Math.round(val*3600000);
							e.nextSibling.data = " hour"+(val===1?'':'s');
						}
						else AB.denyValueSet(e);
						e.value = obj.repeat/3600000||24;
					}
					e.title = (e.value%24?(e.value/24).toFixed(1):e.value/24)+" day"+(e.value!=24?'s':'');
				}
				function add(e){
					var sum = 0;
					for(var unit in obj.units){
						sum += obj.units[unit];
					}
					if(sum === 0){
						alert("no units selected for blockade task");
						return;
					}
					if(!obj.to || !obj.from){
						alert("source/target city not set.");
						return;
					}
					if(edit){
						if(obj.finished) obj.finished = 0;
						obj.statuscode = 0;
						AB.Data.ASC.tasks[ASC.editIndex].data = obj;
						AB.saveData();
					}
					else ASC.saveNewTask(type, obj);
					// Farmlist
					try{
					if(FL.table && FL.addingASC && !ASC.isAttackTargetInList(FL.data.farms[FL.relatedObj.parentNode.parentNode.rowIndex])){
						FL.addingASC = false;
						FL.relatedObj.src = FL.cogImg;
					}
					}catch(e){AB.error(e)}
					ASC.closeTaskDiv();
					ASC.updateList();
					ASC.updateNumTasksInfo();
				}
			}
			setRepeat(repeatInput);
			this.alignTaskDiv();
		},
		
		closeTaskDiv: function(){
			this.taskContentObj.innerHTML = null;
			$("ASC_selectTaskType").selectedIndex = 0;
			this.taskDivObj.style.visibility = "hidden";
			// Farmlist code
			if(FL.addingASC) FL.addingASC = false;
		},
		
	}
	ASC.init();
}
 




var session = {
	storage: localStorage, // unfortunately sessionStorage does not work with multiple tabs, otherwise I would use it
	get:function(k){
		return this.storage.getItem(k);
	},
	set:function(k, v){
		this.storage.setItem(k, v);
		return v;
	},
	remove:function(k){
		this.storage.removeItem(k);
	},
}
function initNOTIFIER(){
	if(typeof NOTIFIER !== "undefined") return;
	NOTIFIER = {
		checkIntervalMin: AB.Data.Notifier.minInterval? 1000*60*AB.Data.Notifier.minInterval : 1000*60*5*1,
		checkIntervalMax: AB.Data.Notifier.minInterval? 1000*60*AB.Data.Notifier.maxInterval : 1000*60*11*1,
		enabled: true,
		init: function(){
			try{
				var mainState = AB.state;
				if(mainState == 0 || mainState == 3){
					if(AB.view !== "militaryAdvisorMilitaryMovements"){
						var c = session.get("NOTIFIER_lastCheck");
						var t = Math.round((Math.random()*(this.checkIntervalMax-this.checkIntervalMin)+this.checkIntervalMin));
						if(c && AB.ts-c < t) t -= AB.ts-c; else t = 1;
						setTimeout(function(e){try{NOTIFIER.firstCheck(e);}catch(e){AB.error(e);}}, t+500);
					}
					else setTimeout(function(){try{NOTIFIER.processResult(document.body.innerHTML)}catch(e){AB.error(e)}}, 1000);
				}

			}
			catch(e){AB.error(e)}
		},
		
		firstCheck: function(){
			if(AB.state == 0 || AB.state == 3) this.check();
		},
		
		check: function(){
			try{
				if(!NOTIFIER.enabled) return;
				AB.log("Notifier Check")
				var url = 'http://' + document.domain + '/index.php?view=militaryAdvisorMilitaryMovements';
				var headers = {
					"User-agent": navigator.userAgent, 
					"Accept": "text/html", 
					"Cookie": document.cookie,
					"Referer":"http://" + document.domain + "/index.php",
				}
				
				
				var xmlhttp = new XMLHttpRequest();
				xmlhttp.open('GET', url, true);
				xmlhttp.setRequestHeader('User-agent',window.navigator.userAgent);
				xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
				xmlhttp.setRequestHeader('Accept',"text/html");
				xmlhttp.setRequestHeader('Referer','http://' + location.host + '/index.php');
				xmlhttp.onreadystatechange = function() {
					try{
						if(this.readyState == 4){
							if(this.status == 200){
								AB.log("Notifier Check Success!");
								NOTIFIER.processResult(this)
							}
							else {
								AB.log("Notifier request error! ststus="+this.status);
								setTimeout(function(){
										try{
											NOTIFIER.check()
										}
										catch(e){AB.error(e)}
								}, 1000);
							}
						}
					} catch (e){AB.error(e)}
				}
				xmlhttp.send(null);
				
			}
			catch(e){AB.error(e)}
		},
		
		updateFleetMovements: function(Return){
			this.returnTask = Return;
			if(Return && (!AB.Return.url || AB.Return.url.indexOf('view=militaryAdvisorMilitaryMovements')>=0)){
				AB.log("Notifier updateFleetMovements: Return URL is missing!");
				AB.goTo(AB.cityId, "?view=militaryAdvisorMilitaryMovements");
				return;
			}
			this.check(); 
		},

		
		processResult: function(response){
			AB.log("Notifier: processing results;");
			session.set("NOTIFIER_lastCheck", AB.ts = Timestamp());
			var t, p2, txt = response.responseText || response, p1 = txt.indexOf('id="fleetMovements"'), tabtxt = "", found = false;
			if(p1 < 0) throw new Error("Notifier Error! No wrapper element found!");
			while(!found){
				if((p1 = txt.indexOf("<table", p1)) === -1) throw new Error("Notifier Error! No content table!");
				if((p2 = txt.indexOf(">", p1+6)) ===-1) throw new Error("Notifier Error! Invalid response data!");
				if(txt.slice(p1, p2).indexOf("locationEvents") === -1) {p1 = p2+1; continue;}
				if((p2 = txt.indexOf("</table>", p2+1)) === -1) throw new Error("Notifier Error! No end tag of content table!");
				if((t=txt.indexOf("<table", p2+8)) >= 0 && txt.indexOf("locationEvents", t+6) >= 0) {tabtxt += txt.slice(p1, p2+8); p1 = t; continue;}
				tabtxt += txt.slice(p1, p2+8);
				found = true;
			}
			var s = document.createElement("span");
			s.innerHTML = tabtxt;
			
			// --- Update number of trade ships
			var getShips = function(t){
				var a, i=0, z, buff='', p1, p2;
				while((a = t.indexOf('<a', i)) !== -1){
					z=1; i=a+2;
					if(t.slice(a, t.indexOf(">", i)).indexOf('href="?view=merchantNavy"') === -1) continue;
					while(true){
						if(p2==null || p1>=0 && p1 < p2) p1 = t.indexOf('<a', i); 
						if(p2==null || p2>=0 && p2 < p1) p2 = t.indexOf('</a>', i);
						if(p1!==-1 && p1 < p2) {i=p1+2; ++z}
						else if(p2>=0) {i=p2+4; --z}
						else if(p1===-1 && p2===-1) throw new Error("getShips: Invalid HTML response text!");
						if(z==0) break;
					}
					if((buff = t.substring(a, i)).indexOf("Trade ships:") === -1) continue;
					return parseInt(buff.slice(buff.lastIndexOf("<span>")+6), 10);
				}
				return false;
			}
			AB.ships = getShips(txt);
			var pShips = XP("//div[@id='globalResources']/ul[1]/li[@class='transporters']/a/span[2]");
			pShips.textContent = AB.ships+" "+pShips.textContent.slice(pShips.textContent.indexOf("("));
			AB.log("Notifier: new ships: "+AB.ships)
			// --- /Update number of trade ships
			
			// --- Update Arrivetimes
			var oldarrivetimes = eval(session.get("fleetMovements")), counter=0;
			
			if(oldarrivetimes){
				var unit, res, sid, cid, ts = Timestamp();
				for(cid in oldarrivetimes){
					for(sid in oldarrivetimes[cid]){
						if(oldarrivetimes[cid][sid].time < ts){
							// update resources
							if(oldarrivetimes[cid][sid].type == 1 && oldarrivetimes[cid][sid].direction == 1 || oldarrivetimes[cid][sid].type == 2){ // arrived resources
								if(AB.occupiedCities[cid]) continue;
								AB.Cities[cid].actions = String(Number(AB.Cities[cid].actions)+1); // update city action  points
								// update resources
								for(res in oldarrivetimes[cid][sid].res){
									AB.Cities[cid][res] += oldarrivetimes[cid][sid].res[res];
									++counter;
								}
							}
							else if(oldarrivetimes[cid][sid].type == 7 && oldarrivetimes[cid][sid].direction == 2){ // returned ships
								if(AB.Cities[oldarrivetimes[cid][sid].originId])
									AB.Cities[oldarrivetimes[cid][sid].originId].actions = String(Number(AB.Cities[oldarrivetimes[cid][sid].originId].actions)+1); // update city action  points
								++counter;
							}
							else if(oldarrivetimes[cid][sid].type == 6 && oldarrivetimes[cid][sid].direction == 1){ // arrived occupation troops
								if(AB.Cities[oldarrivetimes[cid][sid].originId])
									AB.Cities[oldarrivetimes[cid][sid].originId].actions = String(Number(AB.Cities[oldarrivetimes[cid][sid].originId].actions)+1); // update city action  points
								// set task to visit occupied city & update data:
								this.returnTask = true;
								AB.saveReturnURL("?view=relatedCities&id="+oldarrivetimes[cid][sid].targetId, oldarrivetimes[cid][sid].targetId);
								// reduce occupation units in origin city
								if(AB.Cities[oldarrivetimes[cid][sid].originId]){
									for(unit in oldarrivetimes[cid][sid].troops){
										AB.Cities[oldarrivetimes[cid][sid].originId].units["unit "+unit] -= oldarrivetimes[cid][sid].troops[unit];
										++counter;
									}
								}
							}
						}
					}
				}
			}
			AB.fleetMovements = {};
			var tRows = XP("//tr[contains(@class,'own')]", 1, s);
			if(tRows){
				AB.log("Notifier: update arrivetimes:");
				var tRow, sId, idA, idB, origin, target, time, underway, direction, traveltime, unitBoxes, unitBox, res, Res, type, unit, troops, ships;
				AB.Config.arrivinggoods = {};
				for(var i = tRows.length; tRow = tRows[--i];){
					if((t=trim(tRow.className).split(" "))[t.length-1] !== "own" || tRow.className.indexOf("hostile")>-1) continue;
					type = 0; traveltime = 0;
					Res = {wood:0 , glass:0, wine:0, sulfur:0, marble:0};
					troops = {};
					idA = queryString("cityId", false, (t=XP("td[4]/a", 0, tRow))? t.href: '');
					idB = queryString("cityId", false, (t=XP("td[8]/a", 0, tRow))? t.href: '');
					if(!idA || !idB) continue;
					
					origin = XP("./td[4]", 0, tRow).textContent;
					target = XP("./td[8]", 0, tRow).textContent;
					direction = XP("td[7]/img", 0, tRow)? 1: XP("td[5]/img", 0, tRow)? 2: 0;// 1 = right, 2 = left, 0 = not moving
					time = AB.getSecondsFromCountdown(XP("td[2]", 0, tRow).textContent);
					sId = XP("td[2]", 0, tRow).id;
					t = XP("td[6]/img", 0, tRow).src;
					t = t.slice(t.lastIndexOf("_")+1, t.lastIndexOf(".")); // mission
					unitBoxes = XP("td[3]//div[@class='unitBox'][div/img[contains(@src, 'resources')]]", 1, tRow);

					if(t == 'transport') {	// transport
						type = 1;
					}
					else if(t == 'plunder' && (direction == 2 || (direction == 0 && unitBoxes))) {	// own pillage attack return
						// we swap origin and target so as to make it look like a gracious donation - for the lulz
						t = idB; idB = idA; idA = t;
						t = origin; origin = target; target = t;
						type = 2;
					}
					else if(t == 'plunder') {	// own pillage attack
						type = 3;
					}
					else if(t == 'occupy'){	// own occupy town mission
						type = 6;
					}
					else if(t == 'blockade'){	// own block port mission
						type = 7;
					}
					else if(t == 'deployarmy'){	
						type = 8;
					}
					else if(t == 'deployfleet'){
						type = 9;
					}
					if(tRow.className.indexOf("hostile")>-1) {	// hostile attack
						troops = XP("td[3]", 0, row).textContent;
						if((t = troops.indexOf(" Ships ")) >=0 && (t = troops.indexOf("/", t+1)) >= 0) troops = troops.slice(t+1)
						troops = parseInt(troops, 10);
						type = 4
					}
					if(type == 0) continue;
					/*if((type == 1 || type == 3) && direction == 2) {	 // withdrawal
						type = 5;
					}*/
					
					underway = direction;
					if((type === 1 || type === 2) && !AB.Cities[idB]) continue; // occupied city not supported yet
					
					if(type === 1 || type === 2){
						if(!unitBoxes) AB.log("Notifier - Update Arrivetimes: cannot find resource unit boxes!")
						else for each(unitBox in unitBoxes){
							res = AB.getResourceFromStr((t=XP("div/img", 0, unitBox)).src.slice(t.src.lastIndexOf("_")+1, t.src.lastIndexOf(".")));
							Res[res] = parseInt(XP(".//div[@class='count']", 0, unitBox).textContent, 10);
						}
					}
					if(type === 2 || type === 3 || type === 6 || type === 7 || type === 8 || type === 9){
						if(!(unitBoxes = XP("td[3]//div[@class='unitBox'][div/img[contains(@src, '"+(type === 7?"fleet/":"military/")+"')]]", 1, tRow))) AB.log("Notifier - Update Arrivetimes: cannot find troop unit boxes!")
						else for each(unitBox in unitBoxes){
							unit = (t=XP("div/img", 0, unitBox).src).slice(t.lastIndexOf("/")+1).split("_")[1];
							troops[unit] = parseInt(XP(".//div[@class='count']", 0, unitBox).textContent, 10);
						}
					}
					ships = parseInt((t=XP("td[3]//div[@class='unitBox'][div/img[contains(@src, 'ship_transport')]]//div[@class='count']", 0, tRow))?t.textContent:0, 10);
				
					underway || (traveltime = AB.getTradeTravelTime(idA, idB) || 60*4);
					//AB.log("origin City: "+idA+", target City: "+idB+", underway: "+underway+", traveltime: "+traveltime)
					time = AB.ts + (underway? time: time+traveltime*60)*1000;
					
					if(!AB.fleetMovements[idB]) AB.fleetMovements[idB] = {};
					if(!AB.fleetMovements[idB][sId]){
						AB.fleetMovements[idB][sId] = {time:time, ships:ships, res:Res, troops:troops, origin:origin, originId:idA, target:target, targetId:idB, onway:Number(!!underway), type:type, direction:direction};
					}
					
					// Update arrivetimes in EB:
					if(!AB.Config.arrivinggoods[idB]) AB.Config.arrivinggoods[idB] = {};
					AB.Config.arrivinggoods[idB]["eta"+sId] = {arrivetime:time, quest:underway?"gotoown":"loading", startcity:origin, res:Res}
				}
			}
			if(counter || tRows) AB.saveConfig();
			session.set("fleetMovements", uneval(AB.fleetMovements));
			// --- /Arrivetimes
			
			// --- Remove old AB.tradeFleetDropdownList
			if(AB.tradeFleetDropdownList){
				AB.tradeFleetDropdownList.parentNode.removeChild(AB.tradeFleetDropdownList);
				delete AB.tradeFleetDropdownList;
			}
			
			// --- Attacks:
			if(AB.Data.Notifier.checkForAttacks && txt.indexOf("hostile") !== -1){
				// attack incoming
				//if((Timestamp()-Number(session.get('lastAttackNotice')))/60000 < 10) return;
				//else session.set('lastAttackNotice', Timestamp());
				AB.log("NOTIFIER detected an attack!");
				
				var attackTrs = XP("//tr[contains(@class,'hostile')]",1,s);
				if(!attackTrs) throw new Error("Notifier Error! Cannot find hostile Lines in table!");
				
				var row, origin, target, targetID, time, sec, t, id, storage, str, units, attacks=[];
				var sessAttacks = eval(session.get("incomingAttacks")) || {};
				var newAttacks = {};
				storage = session.get("attacks")? eval(session.get("attacks")) : {attacks:[]};
				for each(row in attackTrs){
					units = XP("td[3]", 0, row).textContent;
					AB.log("units str = '"+units+"'")
					if((t = units.indexOf(" Ships ")) >=0 && (t = units.indexOf("/", t+1)) >= 0) units = units.slice(t+1)
					AB.log("units str = '"+units+"'")
					units = parseInt(units, 10);;
					origin = XP("td[4]", 0, row).textContent;
					target =  XP("td[8]", 0, row).textContent;
					targetID = queryString("cityId", false, (t=XP("td[8]/a", 0, row))? t.href: '');

					
					t = XP("td[2]", 0, row);
					sec = AB.getSecondsFromCountdown(t.textContent);
					id = t.id;
					str = "ATTACK DETECTED: "+origin+" attacks "+target+" (ID: "+targetID+") "+"; arriving in: "+time+"("+sec+" sec), units: "+units;
					AB.log(str);
					if(!sessAttacks[id]){
						storage.attacks.push({id:id, txt:str, table:tabtxt});
						AB.Supplier.sorteinf(attacks, {id:id, v:sec, cid:targetID, units:units});
					}

				}
				
				if(attacks.length && AB.state == 0){
					
					newAttacks[attacks[0].id] = attacks[0].cid;
					session.set("incomingAttacks", uneval(newAttacks));
					session.set("attacks", uneval(storage));
					
					// popup
					if(AB.Data.Notifier.openPopupIfAttacked && AB.Data.Notifier.popupURI){
					var popurl = AB.Data.Notifier.popupURI;
					var popName = "ikaAttack";
					var popFeatures = "width=650,height=500,scrollbars=0,menubar=0,toolbar=0,status=0";
					location.assign('javascript:(function(){try{_popup = window.open("'+popurl+'", "'+popName+'", "'+popFeatures+'", false);}catch(e){}})()');
					}
					
					// Defender
					if(DEFENDER.data.cities[targetID] && attacks[0].units > DEFENDER.data.cities[targetID].defendableEnemySize){
						DEFENDER.timeleft = attacks[0].v; // in sec
						DEFENDER.defend(attacks[0].cid);
						return;
					}
				}
				else if(attacks.length && this.returnTask) AB.saveReturnURL('http://' + document.domain + '/index.php?view=militaryAdvisorMilitaryMovements', session.get('returnCID'))
			}
			
			if(this.returnTask){
				return AB.returnNow("?view=militaryAdvisorMilitaryMovements");
			}

			var tm = Math.random()*(this.checkIntervalMax-this.checkIntervalMin)+this.checkIntervalMax;
			setTimeout( function(e){try{NOTIFIER.check(e);}catch(e){AB.error(e);}}, tm);
			
		}
		
	};
	NOTIFIER.init();
}

function initDEFENDER(){
	if(typeof DEFENDER !== "undefined") return;
	DEFENDER = {
		state: 0,
		init: function(){
			try{
				this.getData();
				this.enabled = this.data.enabled;
				if(AB.debug) unsafeWindow.DEF = this.data;
				if(!session.get('DEFState')) session.set('DEFState', 0);
				this.state = session.get('DEFState')? Number(session.get('DEFState')) : 0;
			}
			catch(e){AB.error(e)}
		},
		getData: function(){
			this.Data = GM_getValue("Defender", false);
			if(!this.Data) this.Data = {};
			else this.Data = eval(this.Data);
			if(!this.Data[AB.server]){
				AB.log("DEF getData creating new data");
				var id;
				this.Data[AB.server] = {
					enabled: 1,
					donate: 1,
					save: {
						enabled: 1,
						allShips: 1,
						toCityFurthestAway: 1,	// just an idea, not implemented yet
						upgradeBuilding: 0,
					},
					troops:{
						enabled: 1,
						units: {
							hoplite: 1	
						}
					},
					cities: {}
				};
				this.data = this.Data[AB.server];
				for(id in AB.Cities){
					this.addCity(this.data, id);
				}
				this.saveData();
			}
			else{	
				this.data = this.Data[AB.server];
				if(!this.data.cities[AB.cityId] && AB.Cities[AB.cityId]) this.addCity(this.data, AB.cityId);
			}
		},
		saveData: function(){
			setTimeout(function(){GM_setValue("Defender", uneval(DEFENDER.Data));}, 100);		
		},
		addCity: function(obj, id){
			AB.log("DEF addCity");
			obj.cities[id] = {
							enabled: 1,
							donate: 1,		// 0 = disabled, 1 = forester, 2 = island resource
							donateWonder: 1, // 0 = disabled, 1 = donate what remains after saw-mill/luxury (2nd priority)
							defendableEnemySize: 0, // 0 = always defend,		>0 = only defend if the size is bigger that defendableEnemySize
							maxIslandRes: 0,
						};
		},
		clearSessionData: function(){
			 session.remove('DEF_ResJob');
			 session.remove('DEF_resToSave');
			 session.remove('DEF_cid');
			 session.remove('DEF_built');
			 session.remove('DEF_ABenabled');
		},
		displayConfig: function(){
			AB.log("DEF displayConfig, data: "+this.data);
			if(!this.ConfigOverviewObj){
				var temp, city, counter=0, cid, cities = this.data.cities;
				var htm = '<div id="DEF_Config" style="padding:0px; margin:0px; position:fixed; -moz-border-radius:4px 4px 0 0; z-index:2147483645; background-color:#F7F2D8; 1px solid DarkKhaki; opacity:.96; visibility:visible">\
					<div id="DEFC_TitleBar" style="margin:0 0 1px; height:17px; -moz-border-radius:4px 4px 0 0; padding:3px 5px;"><span style="float:left; font-size:.8em"><b>Defender (alpha)</b></span><a style="float:right" href="javascript:;" id="DEF_ConfigClose"><b>[x]</b></a></div>\
					 <div id="container" style="width:auto; margin:0px; overflow-x: hidden; overflow-y: scroll; max-height:600px; background-color:FloralWhite;">\
					  <div id="" style="height:100%; margin:1!important; padding:1!important; border:1 none!important;">\
					  <table style="width:100%"><tr style="vertical-align:top;"><td>\
					  <fieldset><legend><input type="checkbox" title="Defender will try to save all undefendable resources to other cities if an attack is detected" id="DEF_SaveEnabled" name="" '+(this.data.save.enabled?'checked="checked"':"")+' /> Save Resources</legend>\
					  <!--<input type="checkbox" id="DEF_SaveAllShips" name="" '+(this.data.save.allShips?'checked="checked"':"")+' />\
					  <label for="gm_enableNewTab">use all ships</label><br /> woops I just see its not possible to send more ships when transporting goods lol-->\
					  \
					  <input type="checkbox" title="" id="DEF_SaveFurthestCity" name="" '+(this.data.save.toCityFurthestAway?'checked="checked"':"")+' />\
					  <label for="gm_enableNewTab">to city furthest away from enemy first</label><br />\
					  <input type="checkbox" title="Defender will spend available resources on the most expensive affordable building" id="DEF_SaveUpgradeBuilding" name="" '+(this.data.save.upgradeBuilding?'checked="checked"':"")+' />\
					  <label for="gm_enableNewTab">upgrade a building</label><br />\
					  </fieldset></td><td>\
					  <fieldset><legend><input type="checkbox" title="A good way to get rid of resources that would fall into enemy hands." id="DEF_TroopsEnabled" name="" '+(this.data.troops.enabled?'checked="checked"':"")+' />Build Troops</legend>\
					  <table style="width:100%"><tr><td>\
					   <div style="">Units:</div>\
					  <input type="checkbox" title="" id="DEF_Troops_hoplite" name="" '+(this.data.troops.units.hoplite?'checked="checked"':"")+' />\
					  <label for="gm_enableNewTab">Hopilites</label>\
					  </td></tr></table>\
					  </fieldset>\
					  </td></tr></table>\
					  <fieldset><legend>Cities</legend>';
					  htm += '<table class="DEF_citiesTable" border="1" style="border-color:BurlyWood;">';
					  htm += '<tr><th></th><th></th><th>City</th><th colspan="1">Donate</th><th>Donate Wonder</th><th>Defend if</th><th></th></tr>';
					  for(cid in cities){
							AB.log("cid: "+cid)
							htm += '<tr><td>';
							htm += '<input type="checkbox" title="enables Defender for this city if checked" id="DEF_Cenabled_'+cid+'" name="" '+(cities[cid].enabled?'checked="checked"':"")+' /></td>';
							htm += '<td><b>'+(++counter)+'</b></td><td>'+AB.Cities[cid].city_name+': </td><td><form action="javascript:;" id="DEF_CdonateRes_'+cid+'" name="DEF_donateRes_'+cid+'">';
							htm += '<input type="checkbox" title="Defender will donate undefendable resources if checked" name="DEF_donateRes_cb" '+(cities[cid].donate?'checked="checked"':"")+'donate: /> ';
							htm += ' <input type="radio" title="donate to saw-mill" onclick="this.form.submit()" value="1" name="DEF_donateRes" '+(cities[cid].donate==1?'checked="checked"':"")+' />'+AB.getResourceImg("wood");
							htm += ' <input type="radio" title="donate to island resource" onclick="this.form.submit()" value="2" name="DEF_donateRes" '+(cities[cid].donate==2?'checked="checked"':"")+' />'+AB.getResourceImg(AB.Cities[cid].prodgood);
							htm += '</form></td><td>';
							htm += '<input type="checkbox" title="donate remaining undefendable luxury resources to the wonder" id="DEF_donateWonder_'+cid+'" name="DEF_donateWonder" '+(cities[cid].donate && cities[cid].donateWonder==1?'checked="checked"':"")+' />residue ';
							htm += '</td>';
							htm += '<td>enemy size &gt; <input title="Defender will not defend the city if the number of enemy troops is smaller than this value" style="width:40px; height:13; font-size:x-small; padding:0px;" type="text" onkeypress="event.keyCode==0xd && this.blur()" onfocus="this.select()" class="AS_inp" id="DEF_CarmySize_'+cid+'" value="'+cities[cid].defendableEnemySize+'" /></td>';
							htm += '<td>Max '+AB.getResourceImg(AB.Cities[cid].prodgood)+' <input title="Maximum stock of island resources. 0 = disabled. Defender will distribute the surplus to other cities if the stock surpases the maximum. Setting up a maximum will make this resource defendable since it can\'t be donated to the wonder." style="width:50px; height:13; font-size:x-small; padding:0px;" type="text" onkeypress="event.keyCode==0xd && this.blur()" onfocus="this.select()" class="AS_inp" id="DEF_maxIslandRes_'+cid+'" cid="'+cid+'" value="'+cities[cid].maxIslandRes+'" /></td>';
							htm += '</tr>';
					  }
					  htm += '</table>';
					  htm += '</fieldset>\
					  </div>\
					 </div>\
					</div></div>';
				this.ConfigOverviewObj = Add(htm).firstChild;
				this.MIResTargetCitiesObj = ADD('<span onmouseout="this.style.display=\'none\';" onmouseover="this.style.display=null;" style="position:fixed; display:none; z-index:4000; background:#FFFBDB; padding:5px 8px; font-size:11px; border:1px solid #542C0F; -webkit-border-radius: 5px; -moz-border-radius: 5px;"></span>', this.ConfigOverviewObj);
				
				GM_addStyle('#DEFC_TitleBar{url("skin/input/button.gif") repeat-x scroll 0 bottom #F8E7B3}');
				GM_addStyle('#DEF_Config div,#DEF_Config fieldset,#DEF_Config legend,#DEF_Config span,#DEF_Config input,#DEF_Config th,#DEF_Config td,#DEF_Config tr,#DEF_Config table,#DEF_Config p{margin:2px; padding:2px; text-align:left;} #DEF_Config th{font-weight:bold; text-align:center; padding:2px 8px;}\
							#DEF_Config fieldset {border:2px groove Snow; padding:7px;}\
							.DEF_citiesTable td, .DEF_citiesTable th{border-color:BurlyWood;}');
				
				// mittig positionieren
				this.ConfigOverviewObj.style.top = Math.round((window.innerHeight - this.ConfigOverviewObj.offsetHeight)/2)+"px";
				this.ConfigOverviewObj.style.left = Math.round((window.innerWidth - this.ConfigOverviewObj.offsetWidth)/2)+"px";
				$("DEFC_TitleBar").style.background = 'url("skin/input/button.gif") repeat-x scroll 0 bottom #F8E7B3';
				
				// events
				$("DEF_SaveEnabled").addEventListener("click", function(e){try{saveEnabled(e)}catch(e){AB.error(e)}}, false);
				//$("DEF_SaveAllShips").addEventListener("click", function(e){try{saveAllShips(e)}catch(e){AB.error(e)}}, false); 
				$("DEF_SaveFurthestCity").addEventListener("click", function(e){try{SaveFurthestCity(e)}catch(e){AB.error(e)}}, false);
				$("DEF_SaveUpgradeBuilding").addEventListener("click", function(e){try{SaveUpgradeBuilding(e)}catch(e){AB.error(e)}}, false);
				$("DEF_TroopsEnabled").addEventListener("click", function(e){try{TroopsEnabled(e)}catch(e){AB.error(e)}}, false);
				$("DEF_Troops_hoplite").addEventListener("click", function(e){try{Troops_hoplite(e)}catch(e){AB.error(e)}}, false);
				$("DEF_ConfigClose").addEventListener("click", function close(e){$("DEF_ConfigClose").parentNode.parentNode.style.visibility="hidden"; session.set('overviewBoxOpen', 0);}, false);
				
				for(cid in cities){
					$("DEF_Cenabled_"+cid).addEventListener("click", function(e){try{cityEnabled(e)}catch(e){AB.error(e)}}, false);
					$("DEF_CdonateRes_"+cid).addEventListener("change", function(e){try{donateRes(e)}catch(e){AB.error(e)}}, false);
					$("DEF_donateWonder_"+cid).addEventListener("click", function(e){try{donateWonder(e)}catch(e){AB.error(e)}}, false);
					//$("DEF_CarmySize_"+cid).addEventListener("focus", function(e){try{AB.keyShortcutsEnabled = false;}catch(e){AB.error(e)}}, false);
					$("DEF_CarmySize_"+cid).addEventListener("blur", function(e){try{manageableArmySize(e)}catch(e){AB.error(e)}}, false);
					//$("DEF_maxIslandRes_"+cid).addEventListener("focus", function(e){try{AB.keyShortcutsEnabled = false;}catch(e){AB.error(e)}}, false);
					(temp=$("DEF_maxIslandRes_"+cid)).addEventListener("blur", function(e){try{maxIslandRes(e)}catch(e){AB.error(e)}}, false);
					temp.addEventListener("mouseover", function(e){try{showTargetCitiesBox(e)}catch(e){AB.error(e)}}, false);
					temp.addEventListener("mouseout", function(e){try{DEFENDER.MIResTargetCitiesObj.style.display = null}catch(e){AB.error(e)}}, false);
				}
				
				(function() {
					var box = $("DEFC_TitleBar");
					var b = document.body;
					var X, Y;
					box.addEventListener("mousedown", mousedownF, false);
					box = box.parentNode;
					
					function mousedownF(e){
						b.addEventListener("mousemove", mousemoveF, false);
						b.addEventListener("mouseup", mouseupF, false);
						X = e.screenX-(Number(box.offsetLeft));
						Y = e.screenY-(Number(box.offsetTop));
						box.style.left = e.screenX-X+'px';
						box.style.top = e.screenY-Y+'px';
						box.style.bottom = null;
						box.style.right = null;
						if (e.preventDefault) e.preventDefault();
						return false;
					}
					function mouseupF(e){
						b.removeEventListener("mousemove", mousemoveF, false);
						b.removeEventListener("mouseup", mouseupF, false);
					}
					function mousemoveF(e){
						box.style.left = e.screenX-X+'px';
						box.style.top = e.screenY-Y+'px';
						return false;
					}
				})();
			} 
			else{
				this.ConfigOverviewObj.style.visibility = this.ConfigOverviewObj.style.visibility=="visible" ?"hidden":"visible";
			}
				
			function saveEnabledF(e){
				DEFENDER.data.save.enabled = Number(e.currentTarget.checked);
				DEFENDER.saveData();
			}
			function saveAllShips(e){
				DEFENDER.data.save.allShips = Number(e.currentTarget.checked);
				DEFENDER.saveData();
			}
			function SaveFurthestCity(e){
				DEFENDER.data.save.toCityFurthestAway = Number(e.currentTarget.checked);
				DEFENDER.saveData();
			}
			function SaveUpgradeBuilding(e){
				DEFENDER.data.save.upgradeBuilding = Number(e.currentTarget.checked);
				DEFENDER.saveData();
			}
			function TroopsEnabled(e){
				DEFENDER.data.troops.enabled = Number(e.currentTarget.checked);
				DEFENDER.saveData();
			}
			function Troops_hoplite(e){
				DEFENDER.data.troops.units.hoplite = Number(e.currentTarget.checked);
				DEFENDER.saveData();
			}
			function cityEnabled(e){
				var e = e.currentTarget, id =  parseInt(e.id.slice(e.id.lastOf("_")+1), 10);
				cities[id].enabled = Number(e.checked);
				DEFENDER.saveData();
			}
			function donateRes(e){
				var e = e.currentTarget.wrappedJSObject, id =  parseInt(e.id.slice(e.id.lastOf("_")+1), 10);
				if(!e.DEF_donateRes_cb.checked){
					cities[id].donate = 0;
					for (o in e.DEF_donateRes) e.DEF_donateRes[o].checked = false;
					$("DEF_donateWonder_"+id).checked = false;
				}
				else{
					var o, val = 0;
					for (o in e.DEF_donateRes) {if(e.DEF_donateRes[o].checked) {val = Number(e.DEF_donateRes[o].value);}}
					if(!val){
						e.DEF_donateRes[0].checked = true;
						val = Number(e.DEF_donateRes[0].value);
						$("DEF_donateWonder_"+id).checked = cities[id].donateWonder;
					}
					cities[id].donate = val;
				}
				DEFENDER.saveData();
			}
			function donateWonder(e){
				try{
					var val, e = e.currentTarget, id =  parseInt(e.id.slice(e.id.lastOf("_")+1), 10);
					if(!$("DEF_CdonateRes_"+id).wrappedJSObject.DEF_donateRes_cb.checked) {
						e.checked = false;
						return false;
					}
					cities[id].donateWonder = Number(e.checked);
					DEFENDER.saveData();
				}
				catch(e){AB.error(e)}
			}
			function maxIslandRes(e){
				AB.keyShortcutsEnabled = true;
				var val, e = e.currentTarget, id =  parseInt(e.id.slice(e.id.lastOf("_")+1), 10);
				val = parseInt(trim(e.value), 10);
				if(!isNaN(val) && val != cities[id].maxIslandRes && val >= 0){
					cities[id].maxIslandRes = val;
					DEFENDER.saveData();
				}
				else if(val != cities[id].maxIslandRes) AB.denyValueSet(e);
				e.value = cities[id].maxIslandRes;
			}
			function manageableArmySize(e){
				AB.keyShortcutsEnabled = true;
				var val, e = e.currentTarget, id =  parseInt(e.id.slice(e.id.lastOf("_")+1), 10);
				val = parseInt(trim(e.value), 10);
				if(!isNaN(val) && val != cities[id].defendableEnemySize && val >= 0){
					cities[id].defendableEnemySize = val;
					DEFENDER.saveData();
				}
				else if(val != cities[id].defendableEnemySize) AB.denyValueSet(e);
				e.value = cities[id].defendableEnemySize;
			}
			function showTargetCitiesBox(e){
				var cid = Number(e.currentTarget.getAttribute("cid"));
				DEFENDER.MIResTargetCitiesObj.innerHTML = null;
				if(!DEFENDER.data.cities[cid].MIResTargetCities) DEFENDER.data.cities[cid].MIResTargetCities = {};
				var cityObj = DEFENDER.data.cities[cid].MIResTargetCities;
				var content = ADD('<b>Target Cities:</b><br /><div style="line-height:18px;"></div>', DEFENDER.MIResTargetCitiesObj);
				for(var target in AB.Cities){
					if(AB.Cities[target].prodgood == AB.Cities[cid].prodgood) continue;
					ADD('<input type="checkbox" cid="'+target+'" '+(cityObj[target]?'checked="checked"':"")+' />', content).
						addEventListener("click", function(e){try{
							DEFENDER.data.cities[cid].MIResTargetCities[Number(e.currentTarget.getAttribute("cid"))] = Number(e.currentTarget.checked); DEFENDER.saveData();
						}catch(e){AB.error(e)}}, false);
					ADD(' &#8702; '+AB.Cities[target].city_name+" "+AB.Cities[target].city_coord+"<br />", content);
				}
				DEFENDER.MIResTargetCitiesObj.style.display = "block";
				DEFENDER.MIResTargetCitiesObj.style.left = (AB.getPageLeft(e.currentTarget)+e.currentTarget.offsetWidth)+"px";
				DEFENDER.MIResTargetCitiesObj.style.top = AB.getPageTop(e.currentTarget)+"px";
				
				AB.log("left: "+AB.getPageLeft(e.currentTarget)+" + "+e.currentTarget.offsetWidth+" = "+(AB.getPageLeft(e.currentTarget)+e.currentTarget.offsetWidth));
				AB.log("top: "+AB.getPageTop(e.currentTarget)+"px")
			}
			
		},
		defend: function(cid){
			AB.log("Starting Defense Operation.");
			if(!session.get('DEF_cid') && !cid) throw new Error("DEF ERROR! No cityID available!");
			cid = cid||session.get('DEF_cid');
			if(!session.get('DEF_cid')) session.set('DEF_cid', cid);
			
			AB.updateCityResources();
			var availableSeconds = (this.timeleft||10*60) + 15*60;	// ENEMY travel time + 1 battle round at least
			var securityBuffer = 200;
			var building, city, res, safe = AB.getLootProtection(cid);
			var toSave;
			if(session.get('DEF_resToSave')) toSave = eval(session.get('DEF_resToSave'));
			else {
				toSave = {wood:0 , glass:0, wine:0, sulfur:0, marble:0};
				
				toSave.wood = AB.updatedCityResources[cid].wood + Math.round(AB.Cities[cid].prodwood/3600*availableSeconds) - safe + 100;
				toSave.glass = AB.updatedCityResources[cid].glass + Math.round(AB.Cities[cid].prodglass/3600*availableSeconds) - safe + 100;
				toSave.wine = AB.updatedCityResources[cid].wine + Math.round(AB.Cities[cid].prodwine/3600*availableSeconds) - safe + 100;
				toSave.sulfur = AB.updatedCityResources[cid].sulfur + Math.round(AB.Cities[cid].prodsulfur/3600*availableSeconds) - safe + 100;
				toSave.marble = AB.updatedCityResources[cid].marble + Math.round(AB.Cities[cid].prodmarble/3600*availableSeconds) - safe + 100;
				
				if(toSave.wood < 0) toSave.wood = 0; if(toSave.glass < 0) toSave.glass = 0; if(toSave.wine < 0) toSave.wine = 0; if(toSave.sulfur < 0) toSave.sulfur = 0; if(toSave.marble < 0) toSave.marble = 0;
			}
			if(toSave.wood+toSave.glass+toSave.wine+toSave.sulfur+toSave.marble == 0){
				AB.log("resources are safe, no need for a Defence job atm.");
				this.state = 8;
			}
			else session.set('ABState', AB.state=6);

			if(this.state == 0){
				AB.saveReturnURL('?view=militaryAdvisorMilitaryMovements');
			}
			// debug:
			// Assign Job based on state
			if(this.state == 0){
				if(this.data.save.upgradeBuilding && !AB.Cities[cid].underConstructionTime)
					this.state = 1;
				else 
					this.state = 2;
			}
			// ===============================================
			//------ construction
			// ===============================================
			if(this.state == 1){
				AB.log("construction");
				var built = session.get("DEF_built")? Number(session.get("DEF_built")) : 0;
				var ABenabled = session.get("DEF_ABenabled")? Number(session.get("DEF_ABenabled")) : AB.enabled;
				if(!built){
					// sort buildings by sumRes
					createBuildingsObj();
					var buildings =[], sum;
					for(var building in AB.Cities[cid].buildings){
						for(var pos in AB.Cities[cid].buildings[building].levels){
							AB.correctCostsOf(building, AB.Cities[cid].buildings[building].levels[pos]+1, cid);
							sum = 0;
							for(var res in Buildings[building]){
								if(Buildings[building][res]) sum += Buildings[building][res][AB.Cities[cid].buildings[building].levels[pos]];
							}
							AB.Supplier.sorteinf(buildings, {type:building, pos:pos, v:sum});
						}
					}
					var wood, marble, glass, sulfur, wine;
					for(var i = buildings.length-1; i>=0; --i){
						wood = Buildings[buildings[i].type].wood? Buildings[buildings[i].type].wood[AB.Cities[cid].buildings[buildings[i].type].levels[buildings[i].pos]] : 0;
						marble = Buildings[buildings[i].type].marble? Buildings[buildings[i].type].marble[AB.Cities[cid].buildings[buildings[i].type].levels[buildings[i].pos]] : 0;
						glass = Buildings[buildings[i].type].glass? Buildings[buildings[i].type].glass[AB.Cities[cid].buildings[buildings[i].type].levels[buildings[i].pos]] : 0;
						sulfur = Buildings[buildings[i].type].sulfur? Buildings[buildings[i].type].sulfur[AB.Cities[cid].buildings[buildings[i].type].levels[buildings[i].pos]] : 0;
						wine = Buildings[buildings[i].type].wine? Buildings[buildings[i].type].wine[AB.Cities[cid].buildings[buildings[i].type].levels[buildings[i].pos]] : 0;
						if(AB.updatedCityResources[cid].wood > wood && AB.updatedCityResources[cid].marble > marble && AB.updatedCityResources[cid].glass > glass && 
							AB.updatedCityResources[cid].sulfur > sulfur && AB.updatedCityResources[cid].glass > glass){
							
							toSave.wood -= wood; if(toSave.wood<0) toSave.wood = 0;
							toSave.marble -= marble; if(toSave.marble<0) toSave.marble = 0;
							toSave.glass -= glass; if(toSave.glass<0) toSave.glass = 0;
							toSave.sulfur -= sulfur; if(toSave.sulfur<0) toSave.sulfur = 0;
							toSave.wine -= wine; if(toSave.wine<0) toSave.wine = 0;
							if(!AB.enabled){
								session.set("DEF_ABenabled", AB.enabled);
								AB.Data.ABenabled = Number(AB.enabled = true);
								AB.saveData();
							}
							session.set("DEF_built", 0);
							session.set('DEF_resToSave', uneval(toSave));	
							session.set('DEFState', 1);
							session.set('ABState', AB.state=0)
							
							AB.selectedBuilding.type = buildings[i].type;
							AB.selectedBuilding.pos = buildings[i].pos; 
							AB.selectedBuilding.cid = cid;
							AB.addToQueue(0);
							return true;
						}
					}
					this.state = 2;
				}
				else{
					AB.log("Upgrade successful");
					if(!ABenabled){
						AB.Data.ABenabled = Number(AB.enabled = false);
						AB.saveData();
					}
					session.remove("DEF_ABenabled");
					session.remove("DEF_built");
					this.state = 2;
				}
			}
			if(this.state == 2){
				if(AB.ships && AB.numCities > 1)
					this.state = 3;
				else this.state = 4;
			}
			// ===============================================
			//------ rescue resources
			// ===============================================
			if(this.state == 3){
				AB.log("Initializing resources rescue Job. ships: "+AB.ships);
				session.set('DEFState', 2);
				if(!session.get('DEFDistributeResState')) session.set('DEFDistributeResState', 0);
				if(session.get('DEFDistributeResState') == 0 && (AB.cityId != cid || AB.view != "port")){
					// check if port is available
					if(!AB.Cities[cid].buildings.port){
						AB.log("No port built, cannot save resources to other cities, skipping operation");
						this.state = 4;	
						return this.defend();
					}
					else{
						AB.displayWaitBox(" Defense ", "Defense Operation: Rescuing resources of <b><i>"+AB.Cities[cid].city_name)+"</i></b>";
						AB.goTo(cid, "?view=port&id="+cid+"&position="+AB.Cities[cid].buildings.port.position);
						return true;
					}
				}
				var waitSeconds, t=$("outgoingOwnCountDown");
				if(!t) waitSeconds = 0;
				else waitSeconds = AB.getSecondsFromCountdown(t.textContent);
				var loadingSpeed = AB.getLoadingSpeed(cid);
				
				var resLimit = Min([AB.ships*500, Math.round(loadingSpeed/60 * availableSeconds)]); // Amount of resources that can be saved, determined by port loading speed, enemy travel time, ships
				AB.log("Amount of resources that can be saved: resLimit = "+resLimit);
				// Die folgende Methode verteilt die Ressourcen gleichmässig je Ressource auf den verfügbaren Frachtraum
				var nbs = 5;
				var resSendable;
				var sendable = {wood:0 , glass:0, wine:0, sulfur:0, marble:0};
				for(res in toSave)if(toSave[res] == 0) --nbs;
				while(resLimit > 0 && nbs>0){
					resSendable = Math.ceil(resLimit/nbs);
					for(res in toSave){
						if(resLimit == 0) break;
						if(toSave[res] == 0) continue;
						if(toSave[res] < resSendable){
							sendable[res] += toSave[res];
							resLimit -= toSave[res];
							toSave[res] = 0;
							--nbs;	
						}
						else{
							if(resLimit < resSendable) resSendable = resLimit;
							sendable[res] += resSendable;
							toSave[res] -= resSendable;
							resLimit -= resSendable;
						}
					}
				}
				// sort cities in Array based on their recources	
				var targetCities = [];
				var averageRes;
				for(var id in AB.Cities){
					if(id == cid) continue;
					averageRes = (AB.updatedCityResources[id].wood+AB.updatedCityResources[id].glass+AB.updatedCityResources[id].wine+AB.updatedCityResources[id].sulfur+AB.updatedCityResources[id].marble)/5;
					AB.Supplier.sorteinf(targetCities, {id:id, v:averageRes});
				}
			
			
				var capacity = 0, id;
				this.Job = {jobs:[]};
				var room = {}, send = {};
				
				AB.log("Creating Jobs");
				for(city in targetCities){
					if(sendable.wood==0 && sendable.glass==0 && sendable.wine==0 && sendable.sulfur==0 && sendable.marble==0) break;
					id = targetCities[city].id;
					room.wood=0; room.glass=0; room.wine=0; room.sulfur=0; room.marble=0;
					send.wood=0; send.glass=0; send.wine=0; send.sulfur=0; send.marble=0;
					
					capacity = AB.getResCapacity(id);
					room.wood = Math.floor((capacity - AB.updatedCityResources[id].wood - AB.Supplier.getArrivingGoodsSum(id, "wood") -securityBuffer)/AB.Supplier.RCS)*AB.Supplier.RCS;
					room.glass =  Math.floor((capacity - AB.updatedCityResources[id].glass - AB.Supplier.getArrivingGoodsSum(id, "glass") -securityBuffer)/AB.Supplier.RCS)*AB.Supplier.RCS;
					room.wine =  Math.floor((capacity - AB.updatedCityResources[id].wine - AB.Supplier.getArrivingGoodsSum(id, "wine") - securityBuffer)/AB.Supplier.RCS)*AB.Supplier.RCS;
					room.sulfur =  Math.floor((capacity - AB.updatedCityResources[id].sulfur - AB.Supplier.getArrivingGoodsSum(id, "sulfur") - securityBuffer)/AB.Supplier.RCS)*AB.Supplier.RCS;
					room.marble =  Math.floor((capacity - AB.updatedCityResources[id].marble - AB.Supplier.getArrivingGoodsSum(id, "marble") -securityBuffer)/AB.Supplier.RCS)*AB.Supplier.RCS;
					if(room.wood < 0) room.wood = 0; if(room.glass < 0) room.glass = 0; if(room.wine < 0) room.wine = 0; if(room.sulfur < 0) room.sulfur = 0; if(room.marble < 0) room.marble = 0;
					
					if(!(room.wood > 0 || room.glass > 0 || room.wine > 0 || room.sulfur > 0 || room.marble > 0)) continue;
					send.wood = sendable.wood > room.wood? room.wood : sendable.wood; sendable.wood -= send.wood;
					send.glass = sendable.glass > room.glass? room.glass : sendable.glass; sendable.glass -= send.glass;
					send.wine = sendable.wine > room.wine? room.wine : sendable.wine; sendable.wine -= send.wine;
					send.sulfur = sendable.sulfur > room.sulfur? room.sulfur : sendable.sulfur; sendable.sulfur -= send.sulfur;
					send.marble = sendable.marble > room.marble? room.marble : sendable.marble; sendable.marble -= send.marble;
					// Add to job object
					this.Job.jobs.push({ id: id,
									res:{wood: send.wood, glass: send.glass, wine: send.wine, sulfur: send.sulfur, marble: send.marble}
								  });
				}
				
				session.set('DEF_ResJob', uneval(this.Job));	 
				session.set('DEF_resToSave', uneval(toSave));	
				session.set('DEFState', 3);
				return this.distributeResources();
			}
			if(this.state == 4){
				if(this.data.troops && 
				   AB.Cities[cid].buildings.barracks && AB.Cities[cid].buildings.barracks.level >= 4){
					var pos = 0; 
					for(var p in AB.Cities[cid].buildings.barracks.levels) if(AB.Cities[cid].buildings.barracks.levels[p] >= 4) pos = p;
					this.state = 5;
				}
				else this.state = 6;
			}
			// ===============================================
			//------ Truppen:
			// ===============================================
			if(this.state == 5){
				AB.log("Creating unit production Job");
				if(this.data.troops.units.hoplite){
					// Min von Zeit und Ressourcen
					var units = {hoplite:{time:5*60, res:{wood:40 , glass:0, wine:0, sulfur:30, marble:0}}}
					var redWood = AB.Cities[cid].buildings.carpentering? AB.Cities[cid].buildings.carpentering.level: 0;
					var redWine = AB.Cities[cid].buildings.winepress? AB.Cities[cid].buildings.winepress.level: 0;
					var redMarble = AB.Cities[cid].buildings.architect? AB.Cities[cid].buildings.architect.level: 0;
					var redSulfur = AB.Cities[cid].buildings.fireworker? AB.Cities[cid].buildings.fireworker.level: 0;
					var redGlass = AB.Cities[cid].buildings.optician? AB.Cities[cid].buildings.optician.level: 0;
					units.hoplite.res.wood = Math.floor((100-redWood)*units.hoplite.res.wood / 100);
					units.hoplite.res.wine = Math.floor((100-redWine)*units.hoplite.res.wine / 100);
					units.hoplite.res.marble = Math.floor((100-redMarble)*units.hoplite.res.marble / 100);
					units.hoplite.res.sulfur = Math.floor((100-redSulfur)*units.hoplite.res.sulfur / 100);
					units.hoplite.res.glass = Math.floor((100-redGlass)*units.hoplite.res.glass / 100);
					var t, res2, a,  resmax = Math.ceil(toSave.wood/units.hoplite.res.wood);
					for (var res in units.hoplite.res){
						if(!units.hoplite.res[res]) continue;
						if(resmax < (t=Math.ceil(toSave[res]/units.hoplite.res[res]))){
							a = 0;
							for(res2 in units.hoplite.res) if(AB.updatedCityResources[cid][res] < units.hoplite.res[res]*t) ++a;
							if(!a) resmax = t;
						}
						else if(resmax > (t=Math.ceil(toSave[res]/units.hoplite.res[res]))){
							resmax = t;
						}
					}
					var timemax = Math.floor(availableSeconds/units.hoplite.time);
					var max = Min(resmax, timemax);
					AB.log("To train number: "+max+", timemex: "+timemax+", resmax: "+resmax);
					this.Job = {jobs:[]};
					this.Job.jobs.push({unit:"hoplite", num:max, cost:units.hoplite.res});
					this.Job.pos = pos;
					session.set('DEF_resToSave', uneval(toSave));
					session.set('DEF_ResJob', uneval(this.Job));
					session.set('DEFState', 5);
					return this.trainUnits();
				}
				this.state = 6;
			}
			if(this.state == 6){
				var toSaveSum = 0;
				for(var res in toSave){
					if(res != AB.Cities[cid].prodgood) toSaveSum += toSave[res];
				}
				if(this.data.donate && this.data.cities[cid].donate && toSaveSum) this.state = 7;
				else this.state = 8;
			}
			// ===============================================
			//------ Rest spenden
			// ===============================================
			if(this.state == 7){
				AB.log("Initializing Donation Job.");
				this.Job = {jobs:[]};
				var type;
				if(toSave.wood){
					if(this.data.cities[cid].donate == 1) type = "resource";
					else if(this.data.cities[cid].donate == 2) type = "tradegood";
					this.Job.jobs.push({type:type, res:{wood:toSave.wood , glass:0, wine:0, sulfur:0, marble:0}});
					toSave.wood = 0;
				}
				var toSaveSum = 0, Res = {wood:0 , glass:0, wine:0, sulfur:0, marble:0};
				for(var res in toSave){
					if(res != AB.Cities[cid].prodgood){
						toSaveSum += toSave[res];
						Res[res] = toSave[res];
						toSave[res] = 0;
					}
				}
				if(this.data.cities[cid].donateWonder && toSaveSum){
					this.Job.jobs.push({type:"wonder", res:Res});
				}
				
				session.set('DEF_ResJob', uneval(this.Job));
				session.set('DEF_resToSave', uneval(toSave));
				session.set('DEFState', 7);
				return this.donateResources();
				
				this.state = 8;
			}
			if(this.state == 8){
				// end (I'm out of ideas for now)
			}
			

			AB.log("END of Defense Operation");
			session.set('DEFState', 0);
			session.set('ABState', AB.state=0);
			this.clearSessionData();
			return  AB.returnNow();
		},
		
		trainUnits: function(){
			AB.log("training Units");
			if(!session.get('DEF_ResJob')) throw new Error("DEF distributeResources Error! No Job in session!");
			if(!this.Job) this.Job = eval(session.get('DEF_ResJob'));
			if(!this.Job.jobs.length) throw new Error("DEF trainUnits Error! Job empty!");
			var state = Number(session.get('DEFtrainUnitsState') || session.set('DEFtrainUnitsState', 0));
			AB.log("training Units state: "+state);
			AB.displayWaitBox(" Defense ", "Defense Operation: Training Units");
			
			if(AB.view !== "barracks" && AB.position != this.Job.pos || state == 0 || session.get('DEF_cid') != AB.cityId){
				session.set('DEFtrainUnitsState', 1);
				AB.goTo(session.get('DEF_cid'), "?view=barracks&id="+session.get('DEF_cid')+"&position="+this.Job.pos);
				return true;
			}
			else if(state == 1){
				var content, max, t, input;
				s1:for(var job in this.Job.jobs){
					job = this.Job.jobs[job];
					unit = job.unit=="hoplite"?"phalanx":job.unit;
					content = XP('//ul[@id="units"]/li[@class="unit '+unit+'"]'); //ul[@id="units"]/li[@class="unit phalanx"]
					if(!content) throw new Error("trainUnits Error! couldn't find content! XP: "+'//ul[@id="units"]/li[@class="unit '+unit+'"]');
					max = Min(parseInt((t=XP('//a[@class="setMax"]',0,content).getAttribute("onclick")).slice(t.indexOf("setActualValue(")+15), 10), job.num);
					input = XP('//input[@id="textfield_'+unit+'"]',0,content);
					if(!input) throw new Error("trainUnits Error! couldn't find input element!");
					input.value = max;
					var toSave = eval(session.get('DEF_resToSave'));
					for(var res in toSave){
						if(job.cost[res] && !toSave[res]) break s1;
						toSave[res] -= max*job.cost[res]; if(toSave[res]<0) toSave[res] = 0;
					}
					input.focus(); input.select();
				}
				 session.set('DEFtrainUnitsState', 2);
				 session.set('DEF_resToSave', uneval(toSave));
				 XP('//input[@id="button_recruit"]',0,content).click();
				 return true;
			}
			else if(state == 2){
				AB.log("Finishing Unit Production Job");
				AB.displayWaitBox(" Defense ", "Finishing Unit Production Job");
				// update safeRes
				session.set('DEFState', this.state = 6);
				session.remove('DEF_ResJob');
				session.remove('DEFtrainUnitsState');
				return this.defend();
			}
		},
		
		donateResources: function(){
			AB.log("donating resources");
			if(!session.get('DEF_ResJob')) throw new Error("DEF distributeResources Error! No Job in session!");
			if(!this.Job) this.Job = eval(session.get('DEF_ResJob'));
			var state = Number(session.get('DEFDonateResState') || session.set('DEFDonateResState', 0));
			if(this.Job.jobs.length){
				var job = this.Job.jobs[0];
				var url, type = job.type == "resource"? "Saw Mill": job.type == "wonder"? "Wonder" : "Island Resource";
				AB.displayWaitBox(" Defense ", "Defense Operation: Donating undefendable resources to "+type);
				if(state == 0 || state == 2 || AB.view != job.type && AB.cityId != session.get('DEF_cid')){
					session.set('DEFDonateResState', 1);	// SAVE
					if(job.type == "wonder") 
						url = "?view=wonder&id="+AB.Cities[session.get('DEF_cid')].island_id;
					else url = "?view="+job.type+"&type="+job.type+"&id="+AB.Cities[session.get('DEF_cid')].island_id;
					AB.goTo(session.get('DEF_cid'), url);
					return true;
				}
				else{
					session.set('DEFDonateResState', 2);
					var amount = 0, input, b, icon, max, av, bez;
					av = parseInt(removeCommas(trim(av = XP("//div[@id='resUpgrade']/div/ul[1]/li[1]").textContent).slice(av.lastIndexOf(" ")+1)), 10);
					bez = parseInt(removeCommas(trim(bez = XP("//div[@id='resUpgrade']/div/div/ul[1]/li[1]").textContent).slice(bez.lastIndexOf(" ")+1)), 10);
					max = av-bez;
					for(var res in job.res){
						if(job.res[res] == 0) continue;
						icon = res; if(icon == "glass") icon = "crystal";
						if(job.type == "wonder")
							input = XP('//form[@id="donateForm"]//div[./img[contains(@src, "icon_'+icon+'")]]/input[@type="text"]');
						else 
							input = $("donateWood");
						if(!input) throw new Error("DEF donateResources ERROR! Could not find input element!");
						if(max > job.res[res]){
							input.value = job.res[res];
							max -= job.res[res];
							amount += job.res[res];
							job.res[res] = 0;
						}
						else{
							input.value = max;
							amount += max;
							job.res[res] -= max;
							max = 0;
						}
						input.focus(); input.select();
					}
					
					AB.log("Donating "+amount+" resources to "+type);
					if(!(b = XP('//form[@id="donateForm"]/div[@id="donate"]//input[@type="submit"]'))) throw new Error("donateResources Error! No button found!");
					this.Job.jobs.splice(0,1);	// remove the city from job
					session.set('DEF_ResJob', uneval(this.Job)); //  save Job object in session
					b.click();
					return true;
				}
			}
			else{
				AB.log("Finnishing Donation Job");
				AB.displayWaitBox(" Defense ", "Finnishing Donation Job");
				session.set('DEFState', this.state = 8);
				session.remove('DEF_ResJob');
				session.remove('DEFDonateResState');
				return this.defend();
			}
		},
		
		distributeResources: function(){
			AB.log("Saving resources");
			if(!AB.ships) return this.finish_distributeResources();
			if(!session.get('DEF_ResJob')) throw new Error("DEF distributeResources Error! No Job in session!");
			if(!this.Job) this.Job = eval(session.get('DEF_ResJob'));
			var cid, id;
			if(this.Job.jobs.length){
				if(this.state == 3){
					cid = session.get('DEF_cid');
					id = this.Job.jobs[0].id;
					AB.displayWaitBox(" Defense ", "Defense Operation: Saving resources of <b><i>"+AB.Cities[cid].city_name+"</i></b> to <b><i>"+AB.Cities[id].city_name+"</i></b>");
				}
				else if(this.state == 9){
					cid = this.Job.jobs[0].cid;
					id = this.Job.jobs[0].id;
					AB.displayWaitBox(" Defense ", "LD-Routine: Shipping out excess "+AB.getResourceImg(AB.Cities[cid].prodgood)+" from <b><i>"+AB.Cities[cid].city_name+"</i></b> to <b><i>"+AB.Cities[id].city_name+"</i></b>");
				}
				if(session.get('DEFDistributeResState') == 0 || session.get('DEFDistributeResState') == 2 || AB.view != "transport"){
					session.set('DEFDistributeResState', 1);	// SAVE RES
					AB.log("distributeResources: Going to transport page");
					var url = "?view=transport&destinationCityId="+id;
					AB.goTo(cid, url);
					return true;
				}
				else{
					session.set('DEFDistributeResState', 2);
					return this.sendResources();
				}
			}
			else{
				if(this.state == 3) AB.displayWaitBox(" Defense ", "Finnishing Defense Operation: Saving resources from <b><i>"+AB.Cities[session.get('DEF_cid')].city_name+"</i></b> to other cities");
				else if(this.state == 9) AB.displayWaitBox(" Defense ", "Finnishing Island Resource Defense Routine");
				return this.finish_distributeResources();
			}
		},
		sendResources:function (){
				var amount = 0, input, b, job = this.Job.jobs[0];
				for(var res in job.res){
					if(job.res[res] == 0) continue;
					input = $("textfield_"+res);
					if(!input) throw new Error("DEF sendResources ERROR! Could not find input element!");
					input.value = job.res[res];
					amount += job.res[res];
					input.focus(); input.select();
				}
				// send resources
				if(amount/AB.Supplier.RCS > AB.ships) // not enough ships
					AB.log("BAD ERROR in sendResources()!! Not enough ships for all resources!!! The calculation was wrong!");
				AB.log("Sending "+amount+" resources from "+AB.Cities[AB.cityId].city_name+"("+AB.cityId+") to "+AB.Cities[job.id].city_name+"("+job.id+")");
				if(!(b = XP('//*[@id="submit"]'))) throw new Error("Fetching Error! No button found!");
				this.Job.jobs.splice(0,1);
				session.set('DEF_ResJob', uneval(this.Job));
				b.click();
				return true;
			},
		finish_distributeResources:function (){
			AB.log("Finishing Resource Distribution Job.");
			if(this.state == 3) session.set('DEFState', 4);
			else if(this.state == 9) {
				session.set('DEFState', 0);
			}
			session.remove('DEF_ResJob');
			session.remove('DEFDistributeResState');
			initNOTIFIER();
			NOTIFIER.updateFleetMovements(1);
			return !AB.isReturnPage();
		},
		checkMaxIslandRes_OLD:function (){
			AB.log("Defender: checking Max Island Resources: shipd:"+AB.ships+", numCities:"+ AB.numCities+", enabled:"+this.data.enabled);
			if(!AB.ships || AB.numCities === 1 || !this.data.enabled) return false;
			var buffer = 500;
			var ships = AB.ships;
			var id, cities = this.data.cities
			this.Job = {jobs:[]};
			for(var cid in cities){
				if(!ships) break;
				if(!cities[cid].enabled) continue;
				if(cities[cid].maxIslandRes){
					if(!Number(AB.Cities[cid].actions)) continue;
					if(AB.updatedCityResources[cid][AB.Cities[cid].prodgood] >= cities[cid].maxIslandRes + buffer){
						AB.log(AB.Cities[cid].city_name+" has excess");
						var amount = Math.floor((AB.updatedCityResources[cid][AB.Cities[cid].prodgood]-cities[cid].maxIslandRes)/AB.Supplier.RCS)*AB.Supplier.RCS;
						if(amount > AB.Supplier.RCS*ships) amount = AB.Supplier.RCS*ships;
						ships -= amount/AB.Supplier.RCS;
						var cityCapacity, room, stock;
						var targetCities = [];
						for(id in AB.Cities){
							if(AB.Cities[id].prodgood == AB.Cities[cid].prodgood) continue;
							cityCapacity = AB.getResCapacity(id);
							stock = AB.updatedCityResources[id][AB.Cities[cid].prodgood] + AB.Supplier.getArrivingGoodsSum(id, AB.Cities[cid].prodgood);
							room = cityCapacity - stock - amount;

							AB.Supplier.sorteinf(targetCities, {id:id, room:room, v:stock});
						}
						if(targetCities.length){
							var res = {wood:0 , glass:0, wine:0, sulfur:0, marble:0};
							for(var tcity in targetCities){
								if(amount == 0) break;
								if(targetCities[tcity].room <= 500) continue;
								if(targetCities[tcity].room/1.5 < amount){
									res[AB.Cities[cid].prodgood] = Math.round(targetCities[tcity].room/1.5)
									amount -= res[AB.Cities[cid].prodgood];
								}
								else{
									res[AB.Cities[cid].prodgood] = amount;
									amount = 0;
								}
								this.Job.jobs.push({ cid:cid, id: targetCities[tcity].id, res:res });
							}
						}
						else AB.log(AB.Cities[cid].city_name+" cannot distribute excess resources, no target cities available");
					}
				}
			}
			if(this.Job.jobs.length) {
				AB.log("Max-Resource defense: Job created.");
				//alert(AB.Config[Cid].city_name+" has "+AB.updatedCityResources[cid][AB.Config[Cid].prodgood]+" "+AB.Config[Cid].prodgood+"; (cities[cid].maxIslandRes + buffer = "+(cities[cid].maxIslandRes + buffer)+") , amount: "+amount+"");
				if(this.state == 0){
					AB.saveReturnURL();
				}
				session.set('DEF_ResJob', uneval(this.Job));
				session.set('DEFState', this.state = 9);
				session.set('ABState', AB.state=6);
				return this.distributeResources();
			}
			else AB.log("Max-Resource defense: No Jobs created.");
			return false;
		},
		checkMaxIslandRes:function (){
			AB.log("Defender: checking Max Island Resources: ships:"+AB.ships+", numCities:"+ AB.numCities+", enabled:"+this.data.enabled);
			if(!AB.ships || AB.numCities === 1 || !this.data.enabled) return false;
			var buffer = AB.numCities <= 3? 500: 500*(AB.numCities-2); // 500, 500, 500, 1000, 1500, 2000, ...
			var dst= 5000; // dispersal threshold
			var ships = AB.ships;
			var cid, cities = this.data.cities;
			var jobCities = [];
			var amount;
			var constructionCost;
			// sort cities with excess luxuries in an array
			for(cid in cities){
				if(!ships) break;
				if(!cities[cid].enabled) continue;
				if(cities[cid].maxIslandRes){
					if(!Number(AB.Cities[cid].actions)) continue;
					if(AB.updatedCityResources[cid][AB.Cities[cid].prodgood] >= cities[cid].maxIslandRes + buffer){
						AB.log(AB.Cities[cid].city_name+" has excess");
						// check if resources are needed  for a construction
						constructionCost = 0;
						if(AB.Data.cities[cid].queue.length){
							var type = AB.Data.cities[cid].queue[0].type;
							var pos = AB.Data.cities[cid].queue[0].pos;
							var lvl = AB.getBuildingLevel(cid, type, pos);
							AB.correctCostsOf(type, lvl+1, cid);
							constructionCost = Buildings[type][res]? Buildings[type][res][lvl] : 0;
						}
						amount = Math.floor((AB.updatedCityResources[cid][AB.Cities[cid].prodgood] - Max(cities[cid].maxIslandRes, constructionCost))/AB.Supplier.RCS)*AB.Supplier.RCS;
						if(amount > AB.updatedCityResources[cid][AB.Cities[cid].prodgood]) amount = Math.floor(AB.updatedCityResources[cid][AB.Cities[cid].prodgood]/AB.Supplier.RCS)*AB.Supplier.RCS;
						if(amount > AB.Supplier.RCS*ships) amount = AB.Supplier.RCS*ships;
						if(amount < AB.Supplier.RCS) continue;
						AB.log(AB.Cities[cid].city_name+" has "+amount+" too much");
						AB.Supplier.sorteinf(jobCities, {id:cid, v:amount});
					}
				}
			}
			// assign targets to these cities
			if(jobCities.length){
				var jobLimit;
				var res, stock, room, city, targetCities, targetCity;
				var resSentToTarget = {}
				this.Job = {jobs:[]};
				for(var i = jobCities.length-1; i >= 0; --i){
					city = jobCities[i];
					amount = Min(ships*AB.Supplier.RCS, city.v);
					res = AB.Cities[city.id].prodgood;
					jobLimit = Number(AB.Cities[city.id].actions);
					targetCities = [];
					
					// sort target cities by availability of the luxury
					for(cid in cities){
						if(!this.data.cities[city.id].MIResTargetCities[cid]) continue;
						if(AB.Cities[cid].prodgood == res) continue;
						stock = AB.updatedCityResources[cid][res] + AB.Supplier.getArrivingGoodsSum(cid, res);
						if(resSentToTarget[cid]) stock += resSentToTarget[cid][res];
						room = AB.getResCapacity(cid) - stock - 5000;
						room = Math.floor(room/AB.Supplier.RCS)*AB.Supplier.RCS;
						AB.log(AB.Cities[cid].city_name+" as target: stock: "+stock+", room: "+room);
						if(room < 1000) continue;
						AB.Supplier.sorteinf(targetCities, {id:cid, v:stock, room:room});
					}
					
					// Prorate Resources
					if(targetCities.length){
						var numTargetCities = Min(jobLimit, targetCities.length, Math.ceil(amount/dst));
						var avRes = 0;
						var sumRes = 0;
						var sumRoom = 0;
						var j, jobRes;
						for(j = 0; j < numTargetCities; ++j){
							targetCity = targetCities[j];
							sumRoom += targetCity.room;
							sumRes += targetCity.v;
						}
						if(sumRoom < amount) amount = sumRoom;
						sumRes += amount;
						// gleichmässige Verteilung
						var nbs = numTargetCities;
						var toSend;
						while(amount > 0 && sumRoom > 0){
							avRes = Math.round(sumRes/nbs);
							for(j = 0; j < numTargetCities; ++j){
								targetCity = targetCities[j];
								if(targetCity.room == 0) continue;
								if(avRes - targetCity.v <= 0) continue;
								if(!targetCity.toSend) targetCity.toSend = 0;
								toSend = Min(Math.ceil((avRes - targetCity.v)/500)*500, targetCity.room, amount);
								targetCity.toSend += toSend;
								targetCity.v += toSend;
								targetCity.room -= toSend;
								sumRoom -= toSend;
								amount -= toSend;
								if(!targetCity.room){
									--nbs;
									sumRes -= targetCity.v;
								}
							}
						}
						// create jobs
						for(j = 0; j < numTargetCities; ++j){
							targetCity = targetCities[j];
							if(!targetCity.toSend) continue;
							if(!resSentToTarget[targetCity.id]) resSentToTarget[targetCity.id] =  {wood:0 , glass:0, wine:0, sulfur:0, marble:0};
							resSentToTarget[targetCity.id][res] += targetCity.toSend;
							jobRes = {wood:0 , glass:0, wine:0, sulfur:0, marble:0};
							jobRes[res] = targetCity.toSend;
							ships -= targetCity.toSend/AB.Supplier.RCS;
							this.Job.jobs.push({cid:city.id, id:targetCity.id, res:jobRes});
						}
					}
					else AB.log(AB.Cities[city.id].city_name+" cannot ship out excess resources, no target cities available");
				}
				
				if(this.Job.jobs.length) {
					AB.log("Max-Resource defense: Job created.");
					if(this.state == 0){
						AB.saveReturnURL();
					}
					session.set('DEF_ResJob', uneval(this.Job));
					session.set('DEFState', this.state = 9);
					session.set('ABState', AB.state=6);
					return this.distributeResources();
				}
			}
			AB.log("Max-Resource defense: No Jobs created.");
			return false;				
		}
	}
	DEFENDER.init();
}














// ===========================================// ===========================================




function initFL(){
	if(typeof FL !== "undefined") return;
	FL = {
		
		images:{
			farm: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAArCAMAAAANOCvQAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAGBQTFRFo9DsRSEOi6Gm7%2FH1i5VL3uXsutbpWFA8klA2w66PmTUjhoBqaXFmtsrX4LiecY2Ikp5VsaaEobq%2B9%2BXR39LAm59zmI94uzQctUItfog%2Fw76duY9wnmtNzNvmnatf%2F%2F%2F%2FzxcPZAAAACB0Uk5T%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwBcXBvtAAADbUlEQVR42nSWiWKzKhCFcQMVXEAlcX%2F%2Ft7xnBjD5295RYwPzcWaBtuK%2Biz%2FtPLvfdlbVfYu7qKqPY%2FXYeUrZiR8mZVXcosBkgKp%2FjBApfltRCMwBqSJyfkz%2BjZyVYBFCvgn5P%2F6wTgp5Jv8ASLplhwtQwKQQ8pMNIWfwjzWhSkm8CU2A%2BIeBkPyKn91lRdWSn2zo5RxxFJPAyhz5V%2BKny52MJsJnPuBy0kmkINIcK8iQeedCgLTcSSnmg3ODGTrO4UFk8HWxzy7PO6oCF6czxuVGmZz5VAbWkB05ng6zA26XmpwbMwyDMbqjkR%2BBsRImASllHJUfIu6kLjjnqhgYqXQn%2BdP6%2BWC0VllW121WN9NEIq6Ypmnu7Vad%2BBpVKE%2BsTxGYgQggdZ2pfYJKns%2Fb3PdWW8RJRX7ycBRu1GjbNww6PWRyv21b03ileZ8I3hmyqkIKw6A9ETX82zeEjnkqvCai3w8dcjkpczSBK6K10TWI9%2Fv1erNOu%2FdTQBrr9UyNES7kTRKGoCNoEPIC2tb73GgOzFo%2Fswq2wUnEQBJPsVowQQjMnhA9c%2FrYG8WZBwlcnDrsxYYf6rY%2B9NYA2X1EBoSXc0RU2iwU6%2FUxQMdhocG50F4QOYdlon8q7xdS1zsj1nsfEJPbxz37hPQYKt0TgsA00qc9pox%2F%2FKnj7z8QZRvKRuvtC%2BEKvd%2BxF%2FQkwyqNoq6g%2FXqh%2FSkyZbK6fSdrmfiB1ByX9Tg2ODCCQjpSvnjVv21HYE2P%2FI3C6XRQyUjlQY4%2FTPmmbygws%2BCoibTRkyk2w%2FdjeqZsaHcsAVHkehx49r6HZ5bFstNLcc9ME1Rorwtj1pXV96afcfZmTQomeSs9ePpiN%2BSi9YJ%2BirGE7dGavi%2BsVsrzwVSafm94Rjzav2hPVQtIWa5kWMVOG%2FR1RLTxfiEEgUGn1CvGgYzLMgLhpFc%2FbwvUF04e58HTkYDsQhYR%2BF%2FXNZbXiDceVl35wo0Fy3LEcBgdaVZcC30bP1YStY4RQbjkxh%2BE4xHgsQYm1pUGros1Axy9yrBoGYYusdFCNBReHMWVPhIYGTxruYnZ8k9R5aOUkIshXoKTsbO4t6fMT7UfKqJlQC8kcXn83b9RVs1todWWMtQoqVxLMk22bPSvwn1P2xJaSeuXMcuYyWWDLdQZu01w%2F0%2BAAQCHk2svO1vvBwAAAABJRU5ErkJggg%3D%3D',
			
			cog: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1%2BjfqAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGSSURBVCjPVVFNSwJhEF78Ad79Cf6PvXQRsotUlzKICosuRYmR2RJR0KE6lBFFZVEbpFBSqKu2rum6llFS9HHI4iUhT153n6ZtIWMOM%2B%2FMM88z7wwH7s9Ub16SJcnbmrNcxVm2q7Z8%2FQPvEOtntpj92NkCqITLepEpjix7xQtiLOoQ2b6%2BE7YAN%2F5nfOEJ2WbKqOIOJ4bYVMEQx4LfBBQDsvFMhUcCVU1%2FCxVXmDBGA5ZETrhDCQVcYAPbyEJBhvrnBVPiSpNr6cYDNCQwo4zzU%2FySckkgDYuNuVpI42T9k4gLKGMPs%2FxPzzovQiY2hQYe0jlJfyNNhTqiWDYBq%2FwBMcSRpnyPzu1oS7WtxjVBSthU1vgVksiQ3Dn6Gp5ah2YOKQo5GiuHPA6xT1EKpxQNCNYejgIR457KKio0S56YckjSa9jo%2F%2F3mrj%2BBV0QQagqGTOo%2BY7gZIf1puP3WHoLhEb2PjTlCTCWGXtbp8DCX3hZuOdaIc9A%2BaQvWk4ihq95p67a7nP%2Bu%2BWs%2Br0dql9z%2Fzv0NCYhdCPKZ7oYAAAAASUVORK5CYII%3D',
			
			cogPlus: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAALASURBVDjLdZPLS1tBFMaDf4D7LLqviy66aulSsnBRaDWLSqFgmvRBUhG7UDQoJBpiSGpKTQrRIIqvYBRMKJHeRuMzPq%2FGNAbFx8JHLwoKLZau7v16zlDTBuzAMAx3vt%2F5zjdzdQB0N821tTXz0tJSamFhIUXD%2FL9zRZutra2yjY2NUhKXkPj89PQUJycnGBsbO08kEiXxeLx0fHy87EYAiXtIrK6urirpdFo%2FNzenHB4e4uDgACRUYrGYnkDKyMiIOjAw0FMEyGQy9v39fVxcXGBvbw8kvpqentby%2BTxyuRwmJiY0El%2BRMyiKgsnJSXi9XnsBQFVbqFeNISzY3d0VoGsA77PZLBiwvLyMpqYmrb6%2BvqWohcXFRRcfXl9fx8rKCiRJQjgcRn9%2FPzsCtYXZ2VlR3ePxuAotEFGm6sczMzOXOzs7kGUZyWQSTqcz3djYaGhtbTX4%2Ff70%2FPy8APF3n8936Xa7j9va2mQdidWzszNhlytTkBgaGkJ7e7vhukp3d7eBMgCdFc7YDYdrs9lUHd2xenR0JHrkD1yBEkdXV1cBEAwGDZFIRDjgFsitOG8ymVQdXYlMFo%2F7%2BvouNzc3BYRz6O3tTYdCIUMgEBAthKKdePvxGV52PsJTZ7n2%2BHX5d6PRKBdCJIsuClIExSs9JIyOjoLuHYGIB46oCZ9yQWS%2BSfB%2FseKJ%2Fw7u2fQ%2BIY5Goy3Dw8Pa9va2EPN10cMSmTCoxlOB2Nf3iOU%2FgIcv%2BQL%2B5CsG%2FBKAwcFBOyfPL49AoHSvXC6XxqFx3w%2Ftd5HIhfHviGeDDPj7ph0OR09dXZ1qsViUhoYGPUEUdsIOHry5pXml53BLNULs%2FlxT7OB6EqDMarWWNjc3lxDwfGpqiv8DVFju%2FzT6buOdZBGVeeV9IYObZm1trbm6ujpVWVmZqqqqMtPhDpo%2F2PaftYPP%2FQZledsx50IwXwAAAABJRU5ErkJggg%3D%3D',
			
			SortArrowUp: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJAgMAAACd%2F%2B6DAAAAA3NCSVQICAjb4U%2FgAAAACVBMVEX%2F%2F%2F%2FW1tUzZpkxUCk1AAAAA3RSTlMA%2F%2F9EUNYhAAAACXBIWXMAAAsSAAALEgHS3X78AAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M0BrLToAAAAB9JREFUCJljYEAGDQwMTAkMDJwRDAyqYQwMq1Y1gEQBJ3YDk7F%2BdhMAAAAASUVORK5CYII%3D',
			
			SortArrowDown: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJAgMAAACd%2F%2B6DAAAAA3NCSVQICAjb4U%2FgAAAACVBMVEX%2F%2F%2F%2FV1dUzZpnwZCFLAAAAA3RSTlMA%2F%2F9EUNYhAAAACXBIWXMAAAsSAAALEgHS3X78AAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M0BrLToAAAAB9JREFUCJljYACCVasaGFTDGBg4IxgYmBKAAg0MyAAAWg4Dk2k%2FgP8AAAAASUVORK5CYII%3D',
			
			lightbulbOn: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKgSURBVDjLlZLrS1NxGMd90ZvovdEfEBEUEhZIb0xMjdyLIuyGkiHGUFKydFKKJiRegjIyFJRwojMxzfJSaVOYeTfxtpSNuZ1tXnY2z27nsss5334uWloG9uLD7%2FA7z%2FfzPPx4IgBE7ISl3qWyelUvu9JIueZqeOdUmcCMFDgcQ3fntjSK0j%2Frwx%2BcsesIZ3jbL1j6EbCPIej5DpE3QRIoBJ3LEFb74BjIxkbXVYNdrTixS8Ca3h%2Fy6pSTfloD0UcRjCS8BJGbRdA7QRgjd1pIfhruyeewKOMdm%2BrCw2GBV1tXKZh7SIEVoqAjpwVS0AlIvhBSkCGyeQRcPYDogO1DNixvrveFBa6ZCkuAmSe1OtJpFVLATkJboWCIAE3%2BGYngI6ENgnUK%2BhcxfFiw9fWRT%2BRWEWTHEeRmyPhaMvYCgu5ZEpgkbzCCgPszBNsr8NY8iF4Ky5WnpLDArs41%2BzYnSPdF8OYi0qEcTHc6mF45mJ4M2Ftl4C1lYPU34KerwFNTWKmO%2Fj2BfbiwghmvJuPawZsUsNVHgTPlEx6ANcjJeR9r5QfhWUqEJOlhbc%2BFoV42FBY4R0sPbPbKlz2LLeQB9aCbYkJhzpIFlkoDZ8zDRk0kRHYYrm8d0JYeEyyduUd37QH9pTBqvSOV9iy0wtmZ%2BVNAOm%2BHOeM92JtlYDQN0JYcD1BtmTf%2FWqRtbJ%2FyTxtUt9fXGhPBq5MhriVBtMYhoLkMQ1Ek5sqi3eb2O4l7buIvhlRPkmsfZ%2Fibax%2BiruosnpacQUFOOq7Fn5TUypJz%2F1zlnRQr5JSypRVKZRvq6htR%2FewlriTH03vV7ilQ5NwaHRgchM1GY3p6Bq%2BbmpEii9XtWzCgqkhLuXSBTUg4L8XFxUoXk2K57obirH0L%2FocfNQ8V8wE%2BuE0AAAAASUVORK5CYII%3D',
	
			
			bulletGray: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1%2B%2FAAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNAay06AAAAC4SURBVDiN7ZK9DYNADEY%2FopQIUcMsjHErMARNsgMdK1xLwTI0V9wA%2FOjksw%2FSR44UiS6KS%2Bt9T7bl7DxPXKnbpfRvCO5as%2Bu6CkB7HIdJKUFErIgMfd%2F7rwQA2qZpHnVdg5nhnHtM0wQAz3dQXSGlZKqqgnMO8zwjz3PEGI3GqgJmRggBIQSICIgIRKSO%2BklgvfcoyxJFUWBZFqzrajVWvUGMcRjHEcxsiAjbttl93weNzf6vfF3wAiWzYGQqs2joAAAAAElFTkSuQmCC',
			
			bulletGreen: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAC5SURBVDjLY%2Fj%2F%2Fz8DJZhh1ADsBjjsspIC4gb77ZZX7TdbXLVda9Zgs8xEihQDGmZfm%2F7%2F0KOD%2F3ff3%2FV%2F6plJ%2Fy3mGjYQbYD9NsurBx4e%2BD%2F10tT%2FnWc6%2Fi%2B5sui%2F%2BRS9q0QbYLfB%2FOrWO1v%2Bd5%2Fp%2Bt96qvn%2F3Auz%2Fpt0aRNvgPVyk4appyf%2BX3xl4f%2FZF2b%2Bn3Co579%2BmSrxXrCcZyhlMV2%2FwbRP56pRq%2BZV3SLlBq1EOanRlEgjAwAXIuIDq5qm%2FAAAAABJRU5ErkJggg%3D%3D',
		},
		
		getXIcon: function(){
			return '<img height="" style="display:inline;" data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIhSURBVDjLlZPrThNRFIWJicmJz6BWiYbIkYDEG0JbBiitDQgm0PuFXqSAtKXtpE2hNuoPTXwSnwtExd6w0pl2OtPlrphKLSXhx07OZM769qy19wwAGLhM1ddC184%2Bd18QMzoq3lfsD3LZ7Y3XbE5DL6Atzuyilc5Ciyd7IHVfgNcDYTQ2tvDr5crn6uLSvX%2BAv2Lk36FFpSVENDe3OxDZu8apO5rROJDLo30%2BNlvj5RnTlVNAKs1aCVFr7b4BPn6Cls21AWgEQlz2%2BDl1h7IdA%2Bi97A%2FgeP65WhbmrnZZ0GIJpr6OqZqYAd5%2FgJpKox4Mg7pD2YoC2b0%2F54rJQuJZdm6Izcgma4TW1WZ0h%2By8BfbyJMwBmSxkjw%2BVObNanp5h%2FadwGhaTXF4NWbLj9gEONyCmUZmd10pGgf1%2FvwcgOT3tUQE0DdicwIod2EmSbwsKE1P8QoDkcHPJ5YESjgBJkYQpIEZ2KEB51Y6y3ojvY%2BP8XEDN7uKS0w0ltA7QGCWHCxSWWpwyaCeLy0BkA7UXyyg8fIzDoWHeBaDN4tQdSvAVdU1Aok%2BnsNTipIEVnkywo%2FFHatVkBoIhnFisOBoZxcGtQd4B0GYJNZsDSiAEadUBCkstPtN3Avs2Msa%2BDt9XfxoFSNYF%2FBh9gP0bOqHLAm2WUF1YQskwrVFYPWkf3h1iXwbvqGfFPSGW9Eah8HSS9fuZDnS32f71m8KFY7xs%2FQZyu6TH2%2B2%2BFAAAAABJRU5ErkJggg%3D%3D" />';
		},
		
		getNewFarmObj_template: function(){
			return {
				id: null,
				name: null,
				player: null,
				alliance: null,
				allianceId: null,
				occupied: null,
				coords: null,
				added: null,
				wall: null,		// wall lvl
				level: null,	// town hall
				resSafe: null,
				generals: null,
				barracks: null,
				shipyard: null,
				prodgood: null,
				attacks: null,
				island: null,
				pState: null,
				units: null,
				res: {wood:0 , marble:0, wine:0, glass:0, sulfur:0, checked:0, lastChecked:0}, //D
				spies: null,	
			}
		},
		
		defaultColumns: function(){	// renew data
			return [
					1,
					2,
					3,		// town hall lvl
					4,
					5,
					6,
					7,
					8,
					9,
					10,		// Generals score
					22,
					11,
					23,
					12,
					13,
					14,
					15,
					16,
					17,
					18,
					19,
					20,
					21
				]
		},
		
		getData: function(){	// renew data
			this.data = eval(GM_getValue("FLdata", null));
			if(!this.data || this.data.columns.length !== 23){
				this.data =	{
					farms: [],
					columns: this.defaultColumns(),
				};
				this.saveData();
			}
			if(AB.debug) unsafeWindow.F = this.data;
			this.farms = {};
			for(var i in this.data.farms){
				if(this.data.farms[i] === undefined){
					AB.log("ERROR! - Deleting undefined farm on pos "+i)
					this.data.farms.splice(i,1);
					this.saveData();
				}
				else this.farms[this.data.farms[i].id] = this.data.farms[i];
				if(this.data.columns[i] == 1)
					this.indexCol = i;
			}
		},
		
		saveData: function(callback){
			function save(){
				GM_setValue("FLdata", uneval(FL.data));
				if(callback) callback();
			}
			if(this._saveTmH) clearTimeout(this._saveTmH);
			this._saveTmH = setTimeout(save, 1);
		},
		
		executeOnPage: function(td){
			td.innerHTML = (td.parentNode.rowIndex+1)+":";
		},
		
		fillIndexCell: function(td){
			td.innerHTML = (td.parentNode.rowIndex+1)+":";
		},
		
		updateIndexCells: function(){
			for each(row in this.tableCells){
				this.fillIndexCell(row[this.indexCol]);
				if(row[this.indexCol].parentNode.rowIndex%2) row[this.indexCol].parentNode.className = "_odd";
				else row[this.indexCol].parentNode.className = null;
			}
		},
		
		isFarm: function(id){
			if(this.farms[id]) return true;
			return false;
		},
		
		getFormatedTravelTime: function(min){
			var d = Math.floor(min/(60*24));
			var h = Math.floor(min/(60))%24;
			min = Math.floor(min)%60;
			return (d?d+"D ":"")+(h?h+"h ":'')+(min<10?"0"+min:min)+"m";
		},
		
		init: function(){
			try{
				this.enabled = AB.Data.ASC.enabled;
				var ABState = session.get("ABState");
				if(ABState == 0 || ABState == 3){
					AB.log("FL - init");
					this.getData();
					this.createWrapper();
					this.checkHideout();
					if(AB.view === "island") GM_addStyle('.FL_farm {background:url("'+FL.images.farm+'") no-repeat scroll 24px -8px  transparent}');
				}
			}
			catch(e){AB.error(e)}
		},
		
		createWrapper: function(){
			if(!this.wrapper) this.wrapper = document.body.appendChild(document.createElement("div"));
			this.wrapper.setAttribute("style", 'width: 990px; text-align: left; margin: 0pt auto 20px;');
			this.wrapper.innerHTML = '<input style="padding: 10px 50px; margin: 20px 20px 20px 5px; text-transform: capitalize; color: RoyalBlue; text-align: right; border-radius: 10px 10px 10px 10px; font-size: 18px; box-shadow: 3px 3px 7px rgba(93, 72, 41, 0.5);" type="button" value="   Display Farmlist   "/>';
			this.wrapper.firstChild.addEventListener("click", function(e){try{FL.displayFarmlist(e.currentTarget.parentNode)}catch(e){AB.error(e)}}, false);
			
		},
		
		addNewFarmFromPage: function(e){	// callback of add Farm buton in island view
			AB.log("addNewFarmFromPage");
			if(this.busy) return;
			
			this.busy = true;
			var id = Number(e.getAttribute("cid"));
			var obj = this.getNewFarmObj_template();
			obj.id = id;
			obj.added = Timestamp();;
			this.addFarmButton.firstChild.firstChild.textContent = "adding...";
			this.getTargetInfoFromIslandView(document, obj);
			this.getGeneralsScore(obj, function(ok){try{
				if(ok){
					FL.addFarm(obj);
					FL.addFarmButton.parentNode.removeChild(FL.addFarmButton);
				}
				else FL.addFarmButton.firstChild.firstChild.textContent = '<b style="color:red;">Error!</b>';
			}catch(e){AB.error(e)}});
		},
		
		getTargetInfoFromIslandView: function(e, obj, callback){
				AB.log("getTargetInfoFromIslandView");
				var span1 = XP("//div[@id='breadcrumbs']/span[1]",0, e);
				if(!span1 || span1.textContent == "Error!"){
					return false;
				}
				var temp;
				var coords = XP("../span[@class='island']",0, span1).textContent;
				coords = trim(coords.slice(coords.indexOf("[")));
				var city = XP("//a[@id='city_"+obj.id+"']",0, e);
				var cityName = trim(XP("../ul[@class='cityinfo']/li[@class='name'][1]",0, city).lastChild.data);
				if((temp=cityName.indexOf("(")) !== -1) cityName = trim(cityName.slice(0, temp))
				var player = strReplace(trim(XP("../ul[@class='cityinfo']/li[@class='owner']",0, city).textContent).split(" "), ' ', ' ');
				player = player[player.length-1];
				var level = Number(XP("../ul[@class='cityinfo']/li[@class='citylevel']",0, city).lastChild.data);
				var occupied = XP("../div[contains(@class, 'occupied')]",0, city);
				if(occupied) occupied = trim(occupied.title.slice(occupied.title.indexOf("by")+3));	// occipier name
				var res = AB.getResourceFromStr((temp=XP("//li[@id='tradegood']",0, e)).className);
				var island = Number(queryString("id", true, temp.firstElementChild.href));
				var allyId = 0, ally = XP("../ul[@class='cityinfo']/li[@class='ally']/a[1]",0, city);
				if(ally){
					allyId =  Number(queryString('allyId', true, XP("../a[2]",0, ally).href));
					ally = trim(ally.textContent);
				}
				else ally = null;
				var state = 1;
				if(XP("span/span[@class='inactivity']",0,city)) state = 2;
				if(XP("span/span[@class='vacation']",0,city)) state = 3;
				
				obj.name = cityName;
				obj.player = player;
				obj.occupied = occupied;
				obj.coords = coords;
				obj.prodgood = res;
				obj.level = level;
				obj.alliance = ally;
				obj.allianceId = allyId;
				obj.island = island;
				obj.pState = state;
				if(callback) callback(true);
			
		},
		
		getGeneralsScore: function(obj, callback){
			AB.log("getGeneralsScore");
			var url = AB.baseURL+'?view=highscore&searchUser='+strReplace(obj.player,' ','+')+'&highscoreType=army_score_main';
			GM_xmlhttpRequest ({
				method:"GET",
				url:url,
				data:null,
				headers:{
					"User-agent": navigator.userAgent, 
					"Accept": "text/html", 
					"Cookie": document.cookie,
					"Referer":"http://" + document.domain + "/index.php",
				},
				onload: function (response){
					try{
						var s = document.createElement("span");
						s.innerHTML = response.responseText;
						s = XP(".//tr[td[@class='name']/text()='"+strReplace(obj.player, " "," ")+"']",0,s);
						if(!s){
							if(callback) callback(false);
							return;
						}
						var score = XP("td[@class='score']",0,s).textContent;
						obj.generals = parseInt(removeCommas(trim(score)), 10);
						if(callback) callback(true);
					}
					catch(e){AB.error(e)}
				},
				onerror: function(){setTimeout(function(){try{AB.log("Request Error!"); FL.getGeneralsScore(obj, callback)}catch(e){AB.error(e)}}, 500)}
			});
		},
		
		addFarm: function(obj){
			AB.log("addFarm");
			this.data.farms.push(obj);
			this.farms[obj.id] = obj;
			if(!this.listWrapper) this.displayFarmlist();
			else this.newListLine(this.data.farms.length-1, obj);
			this.saveData();
			this.busy = false;
		},
		
		displayMessage: function(msg){
			if(!msg) return;
			if(!this.messageBox){
				this.messageBox = document.createElement("span");
				this.messageBox.setAttribute("style", 'top:5px; left:5px; border:1px gray solid; padding:5px; position:fixed; top:0px; font-size:x-small; background-color:#F3F7F8; -moz-opacity:0.9; filter:alpha(opacity=90); opacity: 0.9;');
				document.body.appendChild(this.messageBox);
			}
			this.messageBox.style.display = null;
			if(this.messageBox.hasChildNodes()) this.messageBox.appendChild(document.createElement("br"));
			var Msg = document.createElement("code");
			Msg.innerHTML = msg;
			this.messageBox.appendChild(Msg);
			return Msg;
		},
		
		removeMessage: function(Msg){
			if(AB.view !== "safehouse") return;
			if(!this.messageBox) return;
			if(Msg.previousSibling) this.messageBox.removeChild(Msg.previousSibling);
			this.messageBox.removeChild(Msg);
			if(!this.messageBox.hasChildNodes()) this.messageBox.style.display = "none";
		},
		
		checkHideout: function(){
			if(AB.view !== "safehouse") return;
			
		},
		
		makeColumnSortable: function(th){
			th.style.cursor = "pointer";
			th.addEventListener("click", FL.events.listColumn.sort, false); 
		},
		
		displayFarmlist: function(){
			AB.log("displayFarmlist");
			if(!this.table){
				FARMLIST_Start = Timestamp();
				//e = e||document.body.appendChild(document.createElement("span"));
				if(!this.data.farms.length) return;
				this.wrapper.innerHTML = '<table id="FL_list"><thead></thead><tbody></tbody><tfoot><tr><td colspan="'+this.data.columns.length+'"></td></tr></tfoot></table>';
				this.table = this.wrapper.firstChild;
				this.listHead = this.table.firstChild;
				this.listWrapper = this.table.firstChild.nextSibling; // tbody
				this.listFoot = this.listWrapper.nextSibling.firstChild.firstChild; // foot
				this.tooltip = ADD('<div style="text-align:left; z-index:31000; background:#FFFBDB; padding:5px 8px; font-size:11px; border:1px solid #542C0F; -webkit-border-radius: 5px; -moz-border-radius: 5px; position:fixed; top:0; left:0; white-space:nowrap;"></div>');
				this.ASCOptionsBox = ADD('<span onmouseout="this.style.display=\'none\';" onmouseover="this.style.display=null;" style="position:absolute; display:none; z-index:4000; background:#FFFBDB; padding:5px 8px; font-size:11px; border:1px solid #542C0F; -webkit-border-radius: 5px; -moz-border-radius: 5px;"><a href="javascript:;" t="2">Pillage</a><br /><a href="javascript:;" t="3">Occupation</a><br /><a href="javascript:;" t="4">Blockade</a></span>');
				this.ASCOptionsBox.children[0].addEventListener("click", FL.events.listCell.addToASC, false);
				this.ASCOptionsBox.children[2].addEventListener("click", FL.events.listCell.addToASC, false);
				this.ASCOptionsBox.children[4].addEventListener("click", FL.events.listCell.addToASC, false);
				
				// head
				this.updateTableHead();
				// content
				this.updateTable();
				// foot
				this.updateTableFoot();
				
				GM_addStyle('#FL_list {background-color:#FDF7DD; border:3px double #CB9B6A; border-collapse:collapse; width:990px; text-shadow:0 1px #FFFFFF; font-size:11px; text-align:left;}\
							#FL_list thead{background-color:#F7E0A5;}\
							#FL_list thead>th{text-align:center;}\
							#FL_list thead>th:hover{background-color:#FCF0CB!important;}\
							#FL_list td{padding:2px; margin:2px; border-style:solid; border-color:silver; border-width:1px 0;}\
							#FL_list tr._odd{background-color:#FDF1D4;}\
							#FL_list .FL_button{opacity:.5; cursor:pointer;}\
							#FL_list .FL_button:hover{opacity:1;}\
							#FL_list .FL_remove{ height:16px;}');
				FARMLIST_ = (Timestamp()-FARMLIST_Start)/1000;
				AB.log("FARMLIST_: "+FARMLIST_)	
			}
			this.table && this.table.scrollIntoView();
		},
		
		updateTable: function(){
			AB.log("updateTable");
			this.listWrapper.innerHTML = null;
			
			if(this.tableCells) delete this.tableCells;
			this.tableCells = [];
			
			for (var row in this.data.farms){
				this.newListLine(row, this.data.farms[row]);
			}
		},
		
		updateTableHead: function(){
			AB.log("updateTableHead");
			this.listHead.innerHTML = null;
			var th;
			for(var col in this.data.columns){
				th = document.createElement("th");
				this.listHead.appendChild(th);
				th.setAttribute("x",col);
				switch(this.data.columns[col]){
					case 1:		// Position
						th.title = "Index (sort by time added)";
						this.makeColumnSortable(th);
						break;
					case 2:		// City name
						th.innerHTML = '<b>Name</b>';
						this.makeColumnSortable(th);
						break;
					case 3:		// Town Hall level
						th.title = "Town Hall level";
						th.innerHTML = '<img  style="width:22px;" title="Town Hall Level" src="/skin/img/city/building_townhall.gif">';
						this.makeColumnSortable(th);
						break;
					case 4:		// Wall level
						th.title = "Wall level";
						th.style.width = "2%";
						th.style.whiteSpace = "nowrap";
						th.innerHTML = '<img  style="width:30px;" title="Town Wall Level" src="/skin/layout/stadtmauer_icon.gif">';
						this.makeColumnSortable(th);
						break;
					case 5:		// Barracks level
						th.title = "Barracks level";
						th.style.width = "2%";
						th.style.whiteSpace = "nowrap";
						th.innerHTML = '<img align="absmiddle" style="width:30px;" src="/skin/img/city/building_barracks.gif">'
						this.makeColumnSortable(th);
						break;
					case 6:		// Shipyard level
						th.title = "Shipyard level"
						th.style.width = "2%";
						th.style.whiteSpace = "nowrap";
						th.innerHTML = '<img align="absmiddle" style="width:30px;" src="/skin/img/city/building_shipyard.gif">'
						this.makeColumnSortable(th);
						break;
					case 7:		// required siege units
						th.innerHTML = '<b title="Rams/Catapults/Mortars needed to destroy wall">Siege</b>';
						break;
					case 8:		// travel time
						th.innerHTML = '<img height="16" title="Travel Time" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAMESURBVDjLpZNrSNNRGMb%2FViR9qw9FUSQFQX0IMshI9EMXJIIuZGFZGWZpqSHmxM25dNq8pk7LzTSdc1u6malo3vI6bHmZrmmp0%2BmclrfNuTmvk3r6zw8rKfzSgQfec16e33vew3kJAMT%2FaN2msTDxjKzoaX1nOXXmczXd0lkRbmkRB0%2FW5ASXlr4KP7UhQCqJ5XTXUlfGVK2YnhiCyWSA0ajHt5FudLcUovq137w4NZDxT0BTIStNLefCoNNCpTXgbYMGnOKvSJd8gaBKja6BSWhUMlRmPwSPdT90HaBGEO8iL6dY9FMaSBXjeNeogXrMBL3JDJ1pHqpREwS1apQ0D6NfUQVhzI2F7Fh%2FRxugjh9WOUgm%2BkZmIKkfhnUZjEYMfJ%2FAEhlbZf4JZFao0aLU4oMwBJkRNwU2QEP%2B44lxbQ%2BENYPoJSsvrP6EeWEBGbk8TJGgueVlFNc0QDpgRFKBEj3tYmTT3TU2QD0%2FcMmg%2F4ZEkRJTixYYln9ghczQopgQvitDWCQTtbI2hIjd8IDniFFNG3Lp1xZtgOosvyX99BCYPAVGzRYS8gNjxjk8e568ZpYquqFbBQJEp8Es94RH5mHk0Nx%2FA4pTvIaHeqrAlijRPGjEONn02JwFQSJXBAmd8SjfCT65xxFRch2SjjRQii7DLXU3XJN22K0B8lhevCYxFTLlAOIlKujIBzNYyIqCkyjt4qC48%2BWasbCDDXYdBfxPiXgocsOJOPvVozF2dkROXMCx%2FGiPxX55PkRVnUiQ9EOhmYUP2a%2FVnFIbhITqALAqfRFV7o3o937IlMbgdp4LDkUSK2t9ZDG9qW%2Fir6O3lYPGdjliea24lX0E4nY2RK3J4MsSkfsxnoT4gyuNhq%2FoPA4wiL69NGKb7UdlRNxhZFGvmMu4nuiqZ%2BEq9yAupO%2FDudRdcEnaDi%2BeMzjNUbgncIMDg1DuoRH2fw1TBsPbKS3UveDFk0taLuXiolXWmE25Kj4as2n2Lv8sHOiEnDRv%2Fec0biTyyrr99M3YSSO2%2FHn%2BCweZ2kRiltpxAAAAAElFTkSuQmCC">';
						this.makeColumnSortable(th);
						break;
					case 9:		// Ships needed
						th.innerHTML = '<img height="16" src="/skin/characters/fleet/40x40/ship_transport_r_40x40.gif" title="Cargo Ships Required">';
						this.makeColumnSortable(th);
						break;
					case 10:		// Attacks on target
						th.innerHTML = '<img height="14" title="Attacks in last 24 hours" src="/skin/unitdesc/unit_attack.gif">';
						break;
					case 22:		// Player Status
						th.innerHTML = '<img height="16" title="" src="'+FL.images.lightbulbOn+'">';
						this.makeColumnSortable(th);
						break;
					case 11:		// Player
						th.innerHTML = '<b>Player</b>';
						this.makeColumnSortable(th);
						break;
					case 23:		// Alliance
						this.makeColumnSortable(th);
						break;
					case 12:		// Military
						th.style.background = 'url("skin/characters/military/x40_y40/y40_phalanx_faceright.gif") no-repeat scroll center -3px transparent';
						th.innerHTML = '<span style="width:27px; display:inline-block;"></span>';
						this.makeColumnSortable(th);
						break;
					case 13:		// Coordinates
						this.makeColumnSortable(th);
						break;
					case 14:		// Island resourcce
						this.makeColumnSortable(th);
						break;
					case 15:		// move to top
						th.style.width = "10px";
						break;
					case 16:		// move to bottom
						th.style.width = "10px";
						break;
					case 17:		// Button Espionage
						th.style.width = "21px";
						break;
					case 18:		// Button ASC
						th.style.width = "21px";
						break;
					case 19:		// Button Pillage
						th.style.width = "21px";
						break;
					case 20:		// Button Blockade
						th.style.width = "21px";
						break;
					case 21:		// remove
						th.style.width = "14px";
						break;
						
					default:
						th.innerHTML = '<b style="color:red;">Error!</b>';
						break;
				}
			
				// events
				th.addEventListener("mouseover", FL.events.listColumn.dragIn, false); 
				th.addEventListener("mouseout", FL.events.listColumn.dragOut, false);
				th.addEventListener("mousedown", FL.events.listColumn.startDrag, false);
			}
		},
		
		updateTableFoot: function(){
			AB.log("updateTableFoot");
			ADD('<a href="javascript:;">default columns</a>', this.listFoot).addEventListener("click", function(e){try{
				FL.data.columns = FL.defaultColumns();
				FL.saveData();
				FL.updateTableHead();
				FL.updateTable();
			}catch(e){AB.error(e);}}, false);
		},
		
		newListLine: function(row, e, asHTML){
			var td, tr = this.listWrapper.insertRow(row);
			
			if(!this.tableCells[row]) this.tableCells[row] = [];
			//tr.row = row;		// does not work with greasemonkey because of XPCNativeWrappers
			if(row%2) tr.className = "_odd";
			for(var col in this.data.columns){
				td = tr.insertCell(col);
				this.tableCells[row][col] = td;
				
				// fill list cell
				switch(this.data.columns[col]){
					case 1:		// Index
						td.style.paddingLeft = "5px";
						this.fillIndexCell(td);
						break;
					case 2:		// City name
						td.innerHTML = (e.occupied?'<img title="occupied by '+e.occupied+'" height="18" src="/skin/img/island/besatzung_rot_cursor.gif">':'')+
										'<a target="_blank" style=" " title="'+e.coords+'&nbsp;'+e.name+'" href="?view=island&id='+e.island+'&selectCity='+e.id+'">\
										'+e.name+'</a>';
						break;
					case 3:		// Town Hall level
						td.innerHTML = e.spy?'<a target="_blank" style=" " title="view city" href="?view=city&id='+e.id+'"><b>'+e.level+'</b></a>':e.level;
						break;
					case 4:		// Wall level
						td.innerHTML = e.wall||'<span style="color:silver;">?</span>';
						break;
					case 5:		// Barracks level
						td.innerHTML = e.barracks||'<span style="color:silver;">?</span>';
						break;
					case 6:		// Shipyard level
						td.innerHTML = e.shipyard||'<span style="color:silver;">?</span>';
						break;
					case 7:		// required siege units
						td.innerHTML = '<span style="color:silver;">?</span>';
						break;
					case 8:		// travel time
						var min = AB.getTradeTravelTime(null, null, AB.Cities[AB.cityId]?AB.Cities[AB.cityId].city_coord:AB.occupiedCities[AB.cityId] && AB.occupiedCities[AB.cityId].coords?AB.occupiedCities[AB.cityId].coords:AB.Cities[AB.capitalId].city_coord, e.coords);
						td.setAttribute("min", min);
						td.innerHTML = this.getFormatedTravelTime(min);
						td.firstChild.addEventListener("mouseover", function(e){try{FL.displayFarmlist(e.currentTarget.parentNode)}catch(e){AB.error(e)}}, false);
						break;
					case 9:		// Ships needed
						td.innerHTML = Math.ceil((e.res.wood+e.res.marble+e.res.sulfur+e.res.glass+e.res.wine)/AB.Supplier.RCS)*AB.Supplier.RCS;
						break;
					case 10:		// Attacks on target
						td.innerHTML = e.attacks? e.attacks.length : 0;
						break;
					case 22:		// Player Status
						//if(e.pState == 1 || !e.pState) td.innerHTML = '<img height="16" title="active" src="'+FL.images.bulletGreen+'">';
						if(e.pState == 2) td.innerHTML = '<img height="16" title="inactive" src="'+FL.images.bulletGray+'">';
						else if(e.pState == 3) td.innerHTML = '<span class="palm"></span>';
						break;
					case 11:		// Player
						td.innerHTML = '<a href="?view=highscore&amp;searchUser='+e.player+'" title="View Score '+(e.pState == 2?'('+e.player+' is inactive)':e.pState == 3?'('+e.player+' is on vacation)':'')+'" class="playerStatus inactive"><b>'+e.player+'</b></a>';
						break;
					case 23:		// Alliance
						if(e.alliance) td.innerHTML = '[<a href="?view=allyPage&amp;allyId='+e.allianceId+'" title="View Alliance">'+e.alliance+'</a>]';
						break;
					case 12:		// Military
						td.innerHTML = e.units?'<b>'+e.generals+'</b>':e.generals;
						break;
					case 13:		// Coordinates
						td.innerHTML = '<a href="/index.php?view=island&amp;id='+e.island+'" title="View Island" class="">'+e.coords+'</a>';
						break;
					case 14:		// Island resourcce
						td.innerHTML = '<img src="/skin/resources/icon_'+e.prodgood+'.gif">';
						break;
					case 15:		// move to top
						td.innerHTML = '<img title="to top" class="FL_button" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1%2BjfqAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABbSURBVCjPY%2FjPgB8yDDkFmyVWv14kh1PBeoll31f%2Fn%2FytUw6rgtUSi76s%2BL%2Fx%2F8z%2FVd8KFbEomPt16f%2F1%2F1f%2BX%2FS%2F7X%2FqeSwK%2Bv63%2FK%2F6X%2Fg%2F83%2FS%2F5hvQywkAdMGCdCoabZeAAAAAElFTkSuQmCC">';
						td.firstChild.addEventListener("click", FL.events.listCell.toTop, false);
						break;
					case 16:		// move to bottom
						td.innerHTML = '<img title="to bottom" class="FL_button" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1%2BjfqAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABbSURBVCjPY%2FjPgB8yDCkFB%2F7v%2Br%2F5%2F%2Br%2Fi%2F7P%2BN%2F3DYuC7V93%2Fd%2F%2FfydQ0Zz%2F9eexKFgtsejLiv8b%2F8%2F8X%2FWtUBGrGyZLdH6f8r%2FsW64cTkdWSRS%2BzpQbgiEJAI4UCqdRg1A6AAAAAElFTkSuQmCC">';
						td.firstChild.addEventListener("click", FL.events.listCell.toBottom, false);
						break;
					case 17:		// Button ASC
						td.innerHTML = '<img height="14" class="FL_button" title="Add to Auto Scheduler" src="'+(ASC.isAttackTargetInList(e.id)?this.images.cog:this.images.cogPlus)+'">';
						td.firstChild.addEventListener("click", FL.events.listCell.displayASCOptions, false);
						break;
					case 18:		// Button Espionage
						td.innerHTML = (e.spy? e.spy.length: '')+' <img title="Espionage" class="FL_button" height="14" src="/skin/actions/espionage.gif">';;
						break;
					case 19:		// Button Pillage
						td.innerHTML = '<a title="Pillage" href="/index.php?view=plunder&amp;destinationCityId='+e.id+'"><img height="14" class="FL_button" src="/skin/actions/plunder.gif"></a>';
						break;
					case 20:		// Button Blockade
						td.innerHTML = '<a title="Blockade" href="/index.php?view=blockade&amp;destinationCityId='+e.id+'"><img height="14" class="FL_button" src="/skin/actions/blockade.gif"></a>';
						break;
					case 21:		// remove
						td.innerHTML = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAD9SURBVBgZBcFLLkNRAADQc1/fU6qkhFRMMNIQn8TUQCJWYBE2YBkWYQWMJIZmNuAXCSoGFUGIInJf33VOSAAAAIAcgLOFt3079flaEdTS50M6nT7YeggJwPFle6nhAoVhc370rnaXcwBSp62GTdxoGdPrkAPQD5OSbRFr6oLvjByA53CqY9YUvjy68YQcgELTuTd/khENbQk5ANGqFUSFnq6WW2QA5Op4VuhreJVEZACUAKiJkogMgIEKANFARAZAKQKolColMgA+f7vVkBkRSeYjvf6QAfB1cnnXNWTUhHHrXuLoESEBYO/aYjNUSqX3snk/2DjshwQAAAD4B9GUWR0G4scKAAAAAElFTkSuQmCC" class="FL_button FL_remove" title="Remove from List">';
						td.firstChild.addEventListener("click", FL.events.listCell.removeFarm, false);
						break;
						
					default:
						td.innerHTML = '<b style="color:red;">Error!</b>';
						break;
				}
			}
			// events
			tr.addEventListener("mouseover", FL.events.listRow.dragIn, false); 
			tr.addEventListener("mouseout", FL.events.listRow.dragOut, false);
			tr.addEventListener("mousedown", FL.events.listRow.startDrag, false);
					
			if(asHTML){
				var span = document.createElement("span")
				span.appendChild(tr);
				return span.innerHTML;
			}
			else return tr;
		},
		
		events:{
			listRow:{
				startDrag: function(e){try{
					e.preventDefault();
					if(FL.sortData && FL.sortData.state) return; // sorted list
					var i =  e.currentTarget.rowIndex;
					FL.listDragStarted = true;
					FL.listDragSource = i;
					FL.listDragSourceObj = e.currentTarget;
					window.addEventListener("mouseup", FL.events.listRow.dragTo, false);
				}catch(e){AB.error(e)}},
				
				dragIn: function(e){try{
					if(FL.listDragStarted === undefined){
						e.currentTarget.style.backgroundColor = "#fff";
						return false;
					}
					var e = e.currentTarget, i =  e.rowIndex;
					if(i === FL.listDragSource) return false;
					if(i < FL.listDragSource) e.style.borderTop = "2px solid black";
					else e.style.borderBottom = "2px solid black";
					FL.listDragTarget = i;
				}catch(e){AB.error(e)}},
				
				dragOut: function(e){try{
					if(FL.listDragStarted === undefined){
						e.currentTarget.style.backgroundColor = null;
						return false;
					}
					var e = e.currentTarget;
					e.style.borderBottom = e.style.borderTop = null;
					delete FL.listDragTarget;
				}catch(e){AB.error(e)}},
				
				dragTo: function(e){try{
					delete FL.listDragStarted;
					window.removeEventListener("mouseup", FL.events.listRow.dragTo, false);
					FL.listDragSourceObj.style.backgroundColor = null;
					if(FL.listDragTarget === undefined){
						delete FL.listDragSource;
						delete FL.listDragSourceObj;
						return false;
					}
					FL.table.rows[FL.listDragTarget].style.borderBottom = FL.table.rows[FL.listDragTarget].style.borderTop = null;
					// saved data array
					var source = FL.data.farms[FL.listDragSource];
					FL.data.farms.splice(FL.listDragSource, 1);
					FL.data.farms.splice(FL.listDragTarget, 0, source);
					FL.saveData();
					// reference array
					source =FL.tableCells[FL.listDragSource];
					FL.tableCells.splice(FL.listDragSource, 1);
					FL.tableCells.splice(FL.listDragTarget, 0, source);
					// table
					source = FL.listDragSourceObj;
					if(FL.listDragSource > FL.listDragTarget) FL.listWrapper.insertBefore(source, FL.table.rows[FL.listDragTarget]);
					else if(FL.listDragTarget == FL.tableCells.length-1) FL.listWrapper.appendChild(source);
					else FL.listWrapper.insertBefore(source, FL.table.rows[FL.listDragTarget+1]);
					
					FL.updateIndexCells();
					delete FL.listDragSource;
					delete FL.listDragSourceObj;
					delete FL.listDragTarget
				}catch(e){AB.error(e)}},
			},
			
			listColumn:{
				startDrag: function(e){try{
					e.preventDefault();
					var i =  Number(e.currentTarget.getAttribute("x"));
					FL.colDragStarted = true;
					FL.colDragSource = i;
					FL.colDragSourceObj = e.currentTarget;
					window.addEventListener("mouseup", FL.events.listColumn.dragTo, false);
				}catch(e){AB.error(e)}},
				
				dragIn: function(e){try{
					if(FL.colDragStarted === undefined){
						e.currentTarget.style.backgroundColor = "#fff";
						return false;
					}
					var e = e.currentTarget, i =  Number(e.getAttribute("x"));
					if(i === FL.colDragSource) return false;
					FL.colDragTarget = i;
					if(i < FL.colDragSource) e.style.borderLeft = "2px solid black";
					else e.style.borderRight = "2px solid black";
					for(var ri=0; ri < FL.tableCells.length; ++ri){
						if(i < FL.colDragSource) // FL.table.rows[ri].cells[i].style.borderLeft = "2px solid black";
							FL.tableCells[ri][i].style.borderLeft = "2px solid black";
						else // FL.table.rows[ri].cells[i].style.borderRight = "2px solid black";
							FL.tableCells[ri][i].style.borderRight = "2px solid black";
					}
				}catch(e){AB.error(e)}},
				
				dragOut: function(e){try{
					if(FL.colDragStarted === undefined){
						e.currentTarget.style.backgroundColor = null;
						return false;
					}
					var i =   Number(e.currentTarget.getAttribute("x"));
					e.currentTarget.style.borderLeft = e.currentTarget.style.borderRight = null;
					for(var ri=0; ri < FL.tableCells.length; ++ri)
						//FL.table.rows[ri].cells[i].style.borderLeft = FL.table.rows[ri].cells[i].style.borderRight = null;

						FL.tableCells[ri][i].style.borderLeft = FL.tableCells[ri][i].style.borderRight = null;
					delete FL.colDragTarget;
				}catch(e){AB.error(e)}},
				
				dragTo: function(e){try{
					delete FL.colDragStarted;
					window.removeEventListener("mouseup", FL.events.listColumn.dragTo, false);
					if(FL.colDragTarget === undefined){
						FL.colDragSourceObj.backgroundColor = null;
						delete FL.colDragSource;
						delete FL.colDragSourceObj;
						return false;
					}
					if(FL.colDragSource == FL.indexCol) FL.indexCol = FL.colDragTarget;	
					// saved data array
					var source = FL.data.columns[FL.colDragSource];
					FL.data.columns.splice(FL.colDragSource, 1);
					FL.data.columns.splice(FL.colDragTarget, 0, source);
					FL.saveData();
					// CSS
					FL.listHead.children[FL.colDragTarget].style.borderLeft = FL.listHead.children[FL.colDragTarget].style.borderRight = null; // head
					for each(source in FL.tableCells) source[FL.colDragTarget].style.borderLeft = source[FL.colDragTarget].style.borderRight = null; // table
					// table
					var row, cells;
					for each(cells in FL.tableCells){
						row = cells[0].parentNode;
						source = cells[FL.colDragSource];
						if(FL.colDragSource > FL.colDragTarget) row.insertBefore(source, cells[FL.colDragTarget]);
						else if(FL.colDragTarget == cells.length-1) row.appendChild(source);
						else row.insertBefore(source, cells[FL.colDragTarget+1]);
					}
					// reference array
					for each(row in FL.tableCells){
						source = row[FL.colDragSource];
						row.splice(FL.colDragSource, 1);
						row.splice(FL.colDragTarget, 0, source);
					}
					// table head
					FL.updateTableHead();

					delete FL.colDragSource;
					delete FL.colDragSourceObj;
					delete FL.colDragTarget;
				}catch(e){AB.error(e)}},
				
				sort: function(e){try{
					// check
					var th = e.currentTarget;
					var col = th.getAttribute("x");
					if(!FL.sortData){
						FL.sortData = {
							state:0,	// 0 = unsorted, 1 = down, 2 = up
							col:col,
							img: document.createElement('img'),
							originalOrder: null,
						}
						FL.sortData.img.style.marginRight = "3px";
					}
					if(++FL.sortData.state == 3) FL.sortData.state = 0;
					
					// img
					if(th.firstChild) th.insertBefore(FL.sortData.img, th.firstChild);
					else th.appendChild(FL.sortData.img);
					if(FL.sortData.state == 0) FL.sortData.img.src = null;
					if(FL.sortData.state == 1) FL.sortData.img.src = FL.images.SortArrowDown;
					if(FL.sortData.state == 2) FL.sortData.img.src = FL.images.SortArrowUp;
					// sort
					var i, row, rows = [];
					if(FL.sortData.state == 1) FL.sortData.originalOrder = [];
						
					if(FL.sortData.state){
						for (i = 0; i < FL.tableCells.length; ++i){
							row = FL.tableCells[i][0].parentNode;
							if(FL.sortData.state == 1) FL.sortData.originalOrder.push(row); // save original order
							
							if(FL.data.columns[col] == 1){	// by time added
								AB.Supplier.sorteinf(rows, {v:FL.data.farms[i].added, o:row});
							}
							if(FL.data.columns[col] == 2){	// by name
								AB.Supplier.sorteinf(rows, {v:FL.data.farms[i].name.toLowerCase(), o:row});
							}
							else if(FL.data.columns[col] == 3){	// by town hall lvl
								AB.Supplier.sorteinf(rows, {v:FL.data.farms[i].level, o:row});
							}
							else if(FL.data.columns[col] == 4){	// by wall hall lvl
								AB.Supplier.sorteinf(rows, {v:FL.data.farms[i].wall, o:row});
							}
							else if(FL.data.columns[col] == 5){	// by barracks hall lvl
								AB.Supplier.sorteinf(rows, {v:FL.data.farms[i].barracks, o:row});
							}
							else if(FL.data.columns[col] == 6){	// by shipyard hall lvl
								AB.Supplier.sorteinf(rows, {v:FL.data.farms[i].shipyard, o:row});
							}
							else if(FL.data.columns[col] == 8){	// by travel time
								AB.Supplier.sorteinf(rows, {v:Number(FL.tableCells[i][col].getAttribute("min")), o:row});
							}
							else if(FL.data.columns[col] == 9){	// by Ships needed
								AB.Supplier.sorteinf(rows, {v:Number(FL.tableCells[i][col].textContent), o:row});
							}
							else if(FL.data.columns[col] == 11){	// by Player
								AB.Supplier.sorteinf(rows, {v:FL.data.farms[i].player, o:row});
							}
							else if(FL.data.columns[col] == 12){	// by Military
								AB.Supplier.sorteinf(rows, {v:FL.data.farms[i].generals, o:row});
							}
							else if(FL.data.columns[col] == 13){	// by Island
								AB.Supplier.sorteinf(rows, {v:FL.data.farms[i].coords, o:row});
							}
							else if(FL.data.columns[col] == 14){	// by Island resourcce
								AB.Supplier.sorteinf(rows, {v:FL.data.farms[i].prodgood, o:row});
							}
							else if(FL.data.columns[col] == 22){	// by player Status
								AB.Supplier.sorteinf(rows, {v:FL.data.farms[i].pState, o:row});
							}
							else if(FL.data.columns[col] == 23){	// by Alliance
								AB.Supplier.sorteinf(rows, {v:FL.data.farms[i].alliance, o:row});
							}
						}
					}
					// updste table
					for (var i = 0; i < FL.tableCells.length; ++i){
						if(FL.sortData.state == 0) row = FL.sortData.originalOrder[i];
						if(FL.sortData.state == 1) row = rows[i].o;
						if(FL.sortData.state == 2) row = rows[rows.length-1-i].o;
						FL.listWrapper.appendChild(row)
					}
					FL.updateIndexCells();
				}catch(e){AB.error(e)}},
				
			},
			
			listCell:{
				removeFarm: function(e){try{
					if(!confirm("U sure bro?")) return;
					FL.getData()
					var i = e.currentTarget.parentNode.parentNode.rowIndex;
					// saved data array
					FL.data.farms.splice(i,1);
					FL.saveData();
					// reference array
					FL.tableCells.splice(i,1);
					// table
					FL.table.deleteRow(i);
					FL.updateIndexCells();
				}catch(e){AB.error(e)}},
				
				toTop: function(e){try{
					var i = e.currentTarget.parentNode.parentNode.rowIndex;
					if(FL.tableCells.length == 1 || i == 0) return;
					FL.table.rows[i].style.backgroundColor = null;
					// saved data array
					var source = FL.data.farms[i];
					FL.data.farms.splice(i, 1);
					FL.data.farms.splice(0, 0, source);
					// reference array
					source =FL.tableCells[i];
					FL.tableCells.splice(i, 1);
					FL.tableCells.splice(0, 0, source);
					// table
					FL.listWrapper.insertBefore(FL.table.rows[i], FL.table.rows[0]);
					
					FL.updateIndexCells();
					FL.saveData();
				}catch(e){AB.error(e)}},
				
				toBottom: function(e){try{
					var i = e.currentTarget.parentNode.parentNode.rowIndex;
					if(FL.tableCells.length == 1 || i == FL.tableCells.length-1) return;
					FL.table.rows[i].style.backgroundColor = null;
					// saved data array
					var source = FL.data.farms[i];
					FL.data.farms.splice(i, 1);
					FL.data.farms.splice(FL.tableCells.length-1, 0, source);
					// reference array
					source =FL.tableCells[i];
					FL.tableCells.splice(i, 1);
					FL.tableCells.splice(FL.tableCells.length-1, 0, source);
					// table
					FL.listWrapper.appendChild(FL.table.rows[i]);
					
					FL.updateIndexCells();
					FL.saveData();
				}catch(e){AB.error(e)}},
				
				addToASC: function(e){try{
					if(typeof ASC === "undefined"){
						if(initASC) initASC();
						else return;
					}
					FL.addingASC = true;
					var i = FL.relatedObj.parentNode.parentNode.rowIndex;
					var obj, type = Number(e.currentTarget.getAttribute("t"));
					if(type == 2 || type == 3) obj = ASC.getNewPillageTaskObj_template();
					if(type == 4) obj = ASC.getNewBlockadeTaskObj_template();
					obj.from = AB.cityId;
					obj.to = FL.data.farms[i].id;
					obj.targetName = FL.data.farms[i].name;
					obj.targetPlayer = FL.data.farms[i].player;
					obj.targetCoords = FL.data.farms[i].coords;
					obj.targetRes = FL.data.farms[i].prodgood;
					if(type == 2){
						var res = FL.data.farms[i].res.wood+FL.data.farms[i].res.marble+FL.data.farms[i].res.glass+FL.data.farms[i].res.sulfur+FL.data.farms[i].res.wine;
						if(res) obj.ships = Min(AB.getMaxShips(), Math.ceil(res/AB.Supplier.RCS)*AB.Supplier.RCS);
						if(res) obj.times = Math.ceil(res/(obj.ships*AB.Supplier.RCS))
					}
					ASC.displayTaskDiv(type, obj);
				}catch(e){AB.error(e)}},
				
				displayASCOptions: function(e){try{
					FL.relatedObj = e.currentTarget;
					FL.ASCOptionsBox.style.display = "block";
					FL.ASCOptionsBox.style.left = (e.pageX-2)+"px";
					FL.ASCOptionsBox.style.top = (e.pageY-2)+"px";
					return false;
				}catch(e){AB.error(e)}},
			}
		}
	}
	FL.init();
}







AB.init(); // init
IATime_ = (Timestamp()-IAStart_)/1000;	


if(AB.debug){
	AB.log('\nCreateBuildingsObj_: '+CreateBuildingsObj_+'\n'+
			'check_: '+check_+'\n'+
			'addButtons_: '+addButtons_+'\n'+
			'addContextBuildButtonsj_: '+addContextBuildButtonsj_+'\n'+
			'drawMainBox_: '+drawMainBox_+'\n'+
			'AddNiceLinks_: '+AddNiceLinks_+'\n'+
			'addEBEvents_: '+addEBEvents_+'\n'+
			'visualImprovements_: '+visualImprovements_+'\n'+
			'addTradeFleetDropdownList_: '+addTradeFleetDropdownList_+'\n'+
			'registerKeyEvents_: '+registerKeyEvents_+'\n----\n'+
			'getValues_: '+getValues_+'\n'+
			'INITS_: '+INITS_+'\n----\n'+
			'EBTime_: '+EBTime_+'\n'+
			'IATime_: '+IATime_+'\n'+
			'Gesamt: '+(EBTime_+IATime_));

}
/*
	=================================================================================
	=============================== /AB AS ASC NOT DEF FL ===================================
	=================================================================================
*/

