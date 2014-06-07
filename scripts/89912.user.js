// coding: utf-8
// ==UserScript==
// @name		Atithasos Empire Board
// @namespace	empire-board.ikariam
// @version	204
// @author		Atithasos
// @description	Display population, resources, trading, transports, incomes, buildings, and army or fleet units overviews for each cities. Support Ikariam v.0.4.x server game. Support any countries/languages.
// @require	http://www.atithasos.org/scripts/Empire_Board/60774.user.js
// @include	http://s*.ikariam.*/*
// @include	http://s*.*.ikariam.*/*
// @exclude	http://support.ikariam.*/*
// @exclude	http://board.*.ikariam.*/*
// ==/UserScript==

/**************************************************************************************************

LAST CHANGES:

Version 2.0.4:
- Fix Update Manager Add-On - Update

Version 2.0.0:
- Fix Graphic Add-On

Version 1.9.9:
- Rewrited for my friends

Version 1.9.8:
- Fix to delete data from removed building.
- Support Dump building under v.0.4.0
- Rewrite source-code.

PREVIOUS CHANGES:


Based on "Ikariam Alarm And Overview Table" script (for Ikariam v0.2.8)
http://userscripts.org/scripts/show/35995

**************************************************************************************************/

// Old global vars
var config;
var langtype;
var texts;
var buildings;
var tavernWineUsage = [0, 4, 8, 13, 18, 24, 30, 37, 44, 51, 60, 68, 78, 88, 99, 110, 122, 136,150,165,180,197,216,235,255,277,300,325,351,378,408,439,472,507,544,584,626,670,717,766,818,874,933,995];
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
	ScriptName:		 'Atithasos Empire Board',
	Version:		 204,
	HomePage:		 'http://userscripts.org/scripts/show/89912',
	ScriptURL:		 'http://userscripts.org/scripts/source/89912',
	UserScriptsID:	 89912
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
	this.Str._decimalPoint		 = this.Ikariam.LocalizationStrings('decimalPoint');
	if (this.Str._decimalPoint == undefined) this.Str._decimalPoint = '.';
	this.Str._thousandSeparator	 = this.Ikariam.LocalizationStrings('thousandSeperator');
	if (this.Str._thousandSeparator == undefined) this.Str._thousandSeparator = ',';
	this.DB.Init(this);
	this.DB.Load_Options();
	this.Intl.Init(this, this.MainID);
	this.Renders.Init(this);
	this.Tooltip.Init(this, this.MainID+'Tooltip', this.MainID);
	this.Handlers.Init(this);
	this.Updater.Init(this);
	
	// Always create main div for add-ons  which need to check version
	var body = EmpireBoard.DOM.Get_First_Node("//body");
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
			var cells = this.DOM.Get_Nodes("//table[@id='upkeepReductionTable'][3]//td[@class='hidden']");
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
		// search getCountdown
		var nScript = scripts[j];
		var sCode = nScript.innerHTML;
		if (sCode.indexOf('create_slider') > 0)
			{
			iniValue = parseInt(/iniValue : (\d+)/.exec(sCode)[1])
			}
		}
	city.wineUsageId = iniValue;
	
	var savedWine = 0;
	savedWine = unsafeWindow.savedWine[iniValue];
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
	
	var savecapacityBonus = TRs.snapshotItem(20).getElementsByTagName("td")[0];
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
	};
	
EmpireBoard.ViewIsActionTransport = function()
	{
	// Todo
	};
	
EmpireBoard.ViewIsActionDeployment = function()
	{
	// Todo
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
	// Todo
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
							this.Log.Add("Foreign transport "+fleetId+" arrive to city["+FleetMovement.tCityId+"]");
							setViewRqTime('branchOffice', FleetMovement.tCityId, FleetMovement.time);
							}
						}
					else if (FleetMovement.mission == 'transport')
						{
						if ((toOwn == true) && (FleetMovement.toRight == true))
							{
							this.Log.Add("Foreign transport "+fleetId+" arrive to city["+FleetMovement.tCityId+"]");
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
	// Search getCountdown()
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
	
	// Check if main arrays exists
	if (config["unitnames"] == undefined) { config["unitnames"] = {}; }
	if (config["upkeeps"] == undefined) { config["upkeeps"] = {}; }
	if (config["arrivinggoods"] == undefined) config["arrivinggoods"] = {};
	if (config["movements"] == undefined) config["movements"] = {};
	if (config["attacks"] == undefined) config["attacks"] = {};
	if (config["transports"] == undefined) config["transports"] = {};
	if (config["research"] == undefined) config["research"] = {};
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
			case 'arrivinggoods':
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
			s += "<th"+colspan+" building='"+key+"' class='"+firstStyle+" build_name"+buildingsCount[key]+" "+key+"' nowrap "+createTooltipAttribute(this._Parent.Intl.TT(key,'buildings'))+">"+
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
					tooltip += "<br>&nbsp;" + getTimestring(-1 * (currAmount+arrAmount) / intfactPerHour * 60 * 60 * 1000) + " to empty";
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
				//remaining = "<br>"+EmpireBoard.Str.FormatFloatNumber(remhour, 1) + "h to full";
				remaining = "<br>"+getTimestring(remhour*60*60*1000)+" to full";
				}
			else if (factPerHour < 0)
				{
				//remaining = "<br>"+EmpireBoard.Str.FormatFloatNumber(curres / -factPerHour, 1) + "h to empty";
				remaining = "<br>"+getTimestring((curres / -factPerHour)*60*60*1000) + " to empty";
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
		if (city.tradewood == undefined) city.tradewood = 0;
		if (city.tradewine == undefined) city.tradewine = 0;
		if (city.trademarble == undefined) city.trademarble = 0;
		if (city.tradeglass == undefined) city.tradeglass = 0;
		if (city.tradesulfur == undefined) city.tradesulfur = 0;
		
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
			
			maxcwood		 = this._Parent.Ikariam.Resource_Capacity('wood',WarehousesLevel,DumpLevel);
			maxcother		 = maxcwood;
			maxsafewood		 = this._Parent.Ikariam.Resource_SafeCapacity('wood',WarehousesLevels,savecapacityBonus);
			maxsafeother	 = maxsafewood;
			}
		else
			{
			// Soon deprecated
			var WarehousesLevel	 = getBuildingLevel(CityId,'warehouse', 0, -1);
			
			maxcwood		 = this._Parent.Ikariam.Resource_Capacity('wood',WarehousesLevel);
			maxcother		 = this._Parent.Ikariam.Resource_Capacity('wine',WarehousesLevel);
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
		goldRemainingHours = getTimestring(RemainingHours*60*60*1000)+" to expense";
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
				
				s += "<th unit='"+key+"' class='"+firstStyle+" unit_name "+key+"' nowrap "+createTooltipAttribute(name)+">"+name+"</th>";
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
	
EmpireBoard.Renders.Set_Common_Styles = function()
	{
	var default_style = <><![CDATA[
	#EmpireBoard {
		width: 990px;
		margin: -15px auto 20px;
		}
	
	#EmpireBoard div.Table {
		margin-bottom: 2px;
		}
	
	#EmpireBoard table.Overview {
		width: 100% !important;
		margin-bottom: 2px;
		background-color: #FDF7DD;
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
	_IsV031x:				 null,
	_IsV032x:				 null,
	_IsV033x:				 null,
	_IsV034x:				 null,
	_IsV035x:				 null,
	_IsV040x:				 null,
	_ActionRequest:			 null,
	_currentCity:			 null,
	_phpSet:				 null,
	_LocalizationStrings:	 null,
	_UnitsList:				 null,
	_BuildingsList:				 null,
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
		
		this._Parent.Log.Add("Ikariam server version: "+this._Version);
		}
	
	return this._Version;
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
	
EmpireBoard.Ikariam.Resource_Capacity = function(ResType, WarehouseLevel, DumpLevel)
	{
	if (ResType == undefined) ResType = 'wine';
	if (WarehouseLevel == undefined) WarehouseLevel = 0;
	if (DumpLevel == undefined) DumpLevel = 0;
	
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
	return result;
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
	
EmpireBoard.Ikariam.FleetMovement_Object = function()
	{
	var FleetMovement			 = new Object;
	
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
							
							mTimers[sID] = StartTime + (enddate - currentdate);
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
				
			var fleetId = tds[1].id;
			
			if (fleetId != '')
				{
				if (database[fleetId] == undefined)
					{
					database[fleetId] = new this.FleetMovement_Object();
					}
					
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
				
				database[fleetId].summary = this._Parent.Str.Trim(tds[2].childNodes[0].textContent);
				
				database[fleetId].payload = {};
				var hasFleet = false;
				var hasGoods = false;
				var hasArmy = false;
				
				var payloadDoc = this._Parent.DOM.Create_Document(tds[2].innerHTML);
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
				
				database[fleetId].oCityId = grabCityID(tds[3]);
				database[fleetId].oCityName = this._Parent.Str.Trim(tds[3].childNodes[0].textContent);
				var oPlayerName = this._Parent.Str.Trim(tds[3].childNodes[1].textContent);
				oPlayerName = oPlayerName.substring(1,oPlayerName.length-1);
				database[fleetId].oPlayerName = oPlayerName;
				
				database[fleetId].tPlayerName = tPlayerName;
				database[fleetId].toLeft = (tds[4].innerHTML != '') ? true : false;
				database[fleetId].mission = /mission_([_a-z]+)\.[a-z]+/i.exec(resMi.snapshotItem(i).src)[1];
				database[fleetId].subject = this._Parent.Str.Trim(tds[5].title);
				database[fleetId].toRight = (tds[6].innerHTML != '') ? true : false;
				
				database[fleetId].tCityId = grabCityID(tds[7]);
				database[fleetId].tCityName = this._Parent.Str.Trim(tds[7].childNodes[0].textContent);
				var tPlayerName = this._Parent.Str.Trim(tds[7].childNodes[1].textContent);
				tPlayerName = tPlayerName.substring(1,tPlayerName.length-1);
				database[fleetId].tPlayerName = tPlayerName;
				
				database[fleetId].hasAction = (tds[8].innerHTML != '') ? true : false;
				
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
		if (unsafeWindow.LocalizationStrings != undefined)
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
		if (unsafeWindow.IKARIAM != undefined)
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
		if (unsafeWindow.IKARIAM != undefined)
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
	_Parent:			 null,
	_decimalPoint:		 '.',
	_thousandSeparator:	 ','
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

function getTimestring(timestamp,maxDigits,delimiter,approx,showunits,zerofill)
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
	loca['day']		 = (showunits) ? EmpireBoard.Ikariam.LocalizationStrings('day','timeunits','short'):"";
	loca['hour']	 = (showunits) ? EmpireBoard.Ikariam.LocalizationStrings('hour','timeunits','short'):"";
	loca['minute']	 = (showunits) ? EmpireBoard.Ikariam.LocalizationStrings('minute','timeunits','short'):"";
	loca['second']	 = (showunits) ? EmpireBoard.Ikariam.LocalizationStrings('second','timeunits','short'):"";
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
	
	if (this._Parent.DB.Options.Prefs.TABLE_RESOURCES == true)
		{
		// Resources table
		this.Attach_ArrivingGoods_Events();
		}
	
	// Army table
	this.Attach_Movements_Events();
	this.Attach_Attacks_Events();
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
			s = getTimestring(hdata*1000);
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
		"cityName"				 : "Cities",
		"currentlyBuilding"		 : "Currently building",
		"summary"				 : "Summary:",
		"hide_settings"			 : "Hide settings",
		"show_settings"			 : "Show settings",
		"Population"			 : "Population",
		"Research"				 : "Research",
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
		"temple"      : ["Temple", "Temple"],
		"academy"       : ["Academie", "Academie"],
		"port"          : ["Handelshafen", "Handelshafen"],
		"shipyard"      : ["Schiffswerft", "Schiffswerft"],
		"warehouse"     : ["Lagerhaus", "Lagerhaus"],
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
		"Upkeep"			:"Unterhalt",
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
		"Sulfur"            : "Schwefel"
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
		"temple"      : ["Temple", "Temple"],
		"academy" : ["Akatemia", "Akatemia"],
		"port" : ["Kauppasatama", "Satama"],
		"shipyard" : ["Telakka", "Telakka"],
		"warehouse" : ["Varasto", "Varasto"],
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
		"cityName": "Όνομα Πόλης", "currentlyBuilding": "Αναβαθμίζετε τώρα", "summary": "Σύνολο",  
		"hide_settings": "Κρύψε ρυθμίσεις", "show_settings": "Εμφάνισε ρυθμίσεις",  
		"Population": "Πληθυσμός",  
		"Research": "Έρευνες",  
		"finishedBuilding": "Ολοκληρωμένη Αναβαθμιση","Incomes":"Εισοδήματα","Trading":"Εμπόριο",  
		"Wood": "Οικοδομικό Υλικό", "Wine": "Κρασί", "Marble": "Μάρμαρο", "Crystal": "Κρύσταλλο", "Sulfur": "Θείο"  
		};  
	};

EmpireBoard.Intl.Load_Texts_HU = function()
	{
	// Thank Luzer
	langtype = "";
	buildings = {
		"townHall"      : ["Városháza", "Városháza"],
		"temple"      : ["Temple", "Temple"],
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
		"fireworker" : ["Tűzszerész", "Tűzszerész"]
		};
	texts = {
		"Upkeep"			:"Fenntartás",
		"cityName": "Város neve", "currentlyBuilding": "Építés alatt", "summary": "Összesen",
		"hide_settings": "Beállítások elrejtése", "show_settings": "Beállítások megtekintése",
		"Population": "Lakosság",
		"Research": "Fejlesztés",
		"finishedBuilding": "Finished building","Incomes":"Bevételek","Trading":"Trading",
		"Wood": "Építőanyag", "Wine": "Bor", "Marble": "Márvány", "Crystal": "Kristály", "Sulfur": "Kénpor"
		};
	};

EmpireBoard.Intl.Load_Texts_IL = function()
	{
	//hebrew translation, thank Refael Ackermann
	langtype = "rf";
	buildings = {
		"townHall"      : ["עיריה", "עיריה"],
		"temple"      : ["Temple", "Temple"],
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
		"fireworker"    : ["זיקוקים", "זיקוקים"]
		};
	texts = {
		"cityName": "שם עיר", "currentlyBuilding": "בבניה", "summary": "סיכום",
		"hide_settings": "הסתר אפשרויות", "show_settings": "הצג אפשרויות",
		"Population": "אוכלוסיה",
		"finishedBuilding": "הסתימה בניה","Incomes":"הכנסה","Trading":"סוחר",
		"Wood": "עץ", "Wine": "יין", "Marble": "שיש", "Crystal": "קריסטל", "Sulfur": "גופרית"
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
	//Portuguese translation, thanks to alpha tester & Mr. Burns
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
		"palaceColony"  : ["Residencia do Governador", "Governador"],
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
		"architect" : ["Atelier de Arquitectura", "Arquitectura"],
		"optician" : ["Oculista", "Oculista"],
		"vineyard" : ["Caves de Vinho", "Caves"],
		"fireworker" : ["Fábrica de Pirotecnia", "Pirotecnia"]
		};
	texts = {
		"cityName": "Cidades", "currentlyBuilding": "Em Construçao", "summary": "Sumário",
		"hide_settings": "Ocultar Configuraçoes", "show_settings": "Ver Configuraçoes",
		"Population": "População",
		"finishedBuilding": "Finished building","Incomes":"Rendimento","Trading":"Trading",
		"Wood": "Madeira", "Wine": "Vinho", "Marble": "Mármore", "Crystal": "Cristal", "Sulfur": "Enxofre"
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
	//Turkish translation, thanks to NailBey
	langtype = "";
	buildings = {
		"townHall" : ["Belediye Binasi", "Belediye Binasi"],
		"temple"      : ["Temple", "Temple"],
		"academy" : ["Akademi", "Akademi"],
		"port" : ["Ticaret Limani", "Ticaret Limani"],
		"shipyard" : ["Donanma Tershanesi", "Donanma Tershanesi"],
		"warehouse" : ["Depo", "Depo"],
		"wall" : ["Sur", "Sur"],
		"tavern" : ["Taverna", "Taverna"],
		"museum" : ["Muze", "Muze"],
		"palace" : ["Saray", "Saray"],
		"palaceColony" : ["Vali Konagi", "Vali Konagi"],
		"embassy" : ["Buyukelcilik", "Buyukelcilik"],
		"branchOffice" : ["Ticaret Merkezi", "Ticaret Merkezi"],
		"safehouse" : ["Istihbarat Merkezi", "Istihbarat Merkezi"],
		"barracks" : ["Kisla", "Kisla"],
		"workshop" : ["Mucit Atolyesi", "Mucit Atolyesi"],
		"carpentering" : ["Marangoz Atolyesi", "Marangoz Atolyesi"],
		"forester" : ["Ormanci Kulubesi", "Ormanci Kulubesi"],
		"stonemason" : ["Mermer Atolyesi", "Mermer Atolyesi"],
		"glassblowing" : ["Cam Esya Atolyesi", "Cam Esya Atolyesi"],
		"winegrower" : ["Bag Evi", "Bag Evi"],
		"alchemist" : ["Simya Kulesi", "Simya Kulesi"],
		"architect" : ["Mimarlik Burosu", "Mimarlik Burosu"],
		"optician" : ["Optik", "Optik"],
		"vineyard" : ["Sarap Mahzeni", "Sarap Mahzeni"],
		"fireworker" : ["Fisekci", "Fisekci"]
		};
	texts = {
		"cityName": "Sehir Adi", "currentlyBuilding": "Insaa Ediliyor", "summary": "Toplam",
		"hide_settings": "Ayarlari Gizle", "show_settings": "Ayarlari Goster",
		"Population": "Nufus","finishedBuilding": "İnsaa Bitti","Incomes":"Gelir","Trading":"Ticaret",
		"Wood": "Odun", "Wine": "Sarap", "Marble": "Mermer", "Crystal": "Kristal", "Sulfur": "Sulfur"  
		};
	};

EmpireBoard.Intl.Load_Texts_TW = function()
	{
	//traditional chinese translation by Whiskers
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
		"fireworker" : ["煙火測試區域", "硫－"]
		};
	texts = {
		"cityName": "城鎮", "currentlyBuilding": "正在建造", "summary": "總計",
		"hide_settings": "隐藏設定", "show_settings": "顯示設定",
		"Population": "人口",
		"finishedBuilding": "建造完成","Incomes":"收入","Trading":"交易",
		"Wood": "木材", "Wine": "葡萄", "Marble": "大理石", "Crystal": "水晶", "Sulfur": "硫磺"
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
        if (aCodeLines.length < 24)
			{
			return;
			}
			
        var sWood = aCodeLines[24].substring(aCodeLines[24].indexOf('(')+2,aCodeLines[24].indexOf(')')-1);
        var startResourcesDelta = /production: *([0-9.\E\-]+)/.exec(sWood);
        if (startResourcesDelta != null) {
          startResourcesDelta = Math.floor(parseFloat(RegExp.$1) * 3600);
        } else {
          startResourcesDelta = 0;
        }
		
        var sTradeGood = aCodeLines[27].substring(aCodeLines[27].indexOf('(')+2,aCodeLines[27].indexOf(')')-1);
        var startTradegoodDelta = /production: *([0-9.\E\-]+)/.exec(sTradeGood);
        if (startTradegoodDelta != null) {
          startTradegoodDelta = Math.floor(parseFloat(RegExp.$1) * 3600);
        } else {
          startTradegoodDelta = 0;
        }
      
        var sName = /valueElem: *\"(.*)\"/.exec(sTradeGood);
        var sTradeGoodName = sName[1];
      
        res.prodwood = startResourcesDelta;
        res.prodwine = 0;
        res.prodmarble = 0;
        res.prodglass = 0;
        res.prodsulfur = 0;
        res.prodtime = EmpireBoard.StartTime; 
        if (sTradeGoodName == "value_wine") {
          res.prodwine = startTradegoodDelta;
		  res.prodgood = 'wine';
        } else if (sTradeGoodName == "value_marble") {
          res.prodmarble = startTradegoodDelta;
		  res.prodgood = 'marble';
        } else if (sTradeGoodName == "value_crystal") {
          res.prodglass = startTradegoodDelta;
		  res.prodgood = 'glass';
        } else if (sTradeGoodName == "value_sulfur") {
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
  return getTimestring(time - Number(startTime));
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
		function reportDeployment()
			{
			var dType = EmpireBoard.DOM.Get_First_Node_Value("//form[@id='deploymentForm']/input[@name='function']", '');

			// Update units garrisoned
			var city = getCity(current_city_id);
			var duList = EmpireBoard.DOM.Get_Nodes("//form[@id='deploymentForm']//ul[@class='assignUnits']/li");
			if (duList.snapshotLength >= 1)
				{
				for (var i = 0; i < duList.snapshotLength; i++)
					{
					var uLI = duList.snapshotItem(i);
					var unit_id = 'unit '+uLI.className;
					
					// Todo: use getElementByTag
					var oAmount = EmpireBoard.Str.To_Integer(uLI.childNodes[3].textContent);
					if (dType == 'deployFleet')
						{
						var dAmount = EmpireBoard.Str.To_Integer(uLI.childNodes[7].value,0);
						}
					else
						{
						var dAmount = EmpireBoard.Str.To_Integer(uLI.childNodes[9].value,0);
						}
					
					if (city.units[unit_id] == undefined) city.units[unit_id] = {};
					city.units[unit_id].count = oAmount - dAmount;
					}
				}
			
			setViewRqTime('finances');
			setViewRqTime('militaryAdvisorMilitaryMovements');
			EmpireBoard.DB.Save();
			}
			
		var dSubmit = EmpireBoard.DOM.Get_First_Node("//form[@id='deploymentForm']//input[@type='submit']");
		dSubmit.addEventListener("click", reportDeployment, false);
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
			
			// Search getCountdown()
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
				
			//var startdate = unsafeWindow.tmppbar['startdate'];
			var currentdate = unsafeWindow.tmppbar['currenttime'];
			var enddate = unsafeWindow.tmppbar['enddate'];
			//alert((enddate - currentdate)/1000/60);
			setViewRqTime(EmpireBoard.Ikariam.View(), city_idmainView, EmpireBoard.StartTime + (enddate - currentdate), true);
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
				// search getCountdown
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
		
		config["transports"] = {};
		function addTransport(cityID, transportID, endTime, subject, tCityName)
			{
			if (config["transports"][cityID] == undefined) config["transports"][cityID] = {};
			if (config["transports"][cityID][transportID] == undefined) config["transports"][cityID][transportID] = {};
			config["transports"][cityID][transportID].endTime = endTime;
			}

		var foundLoading = false;
		var takeSomething = false;
		var resMi = EmpireBoard.DOM.Get_Nodes("//div[@id='mainview']//td[contains(@class, 'mission')]");
		if (resMi.snapshotLength > 0)
			{
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
							EmpireBoard.Log.Add("mTimers["+sID+"] = "+(enddate - currentdate));
							}
						else
							{
							EmpireBoard.Log.Add("Failed to fetch getCountdown");
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
				var nSource = tds[1];
				var nTarget = tds[3];
				var nETA = tds[4];
				var nRET = tds[5];
				var nAc = tds[6];
				
				if (nETA.id == '') continue;
				if (nRET.id == '') continue;
				EmpireBoard.Log.Add('nETA.id = '+nETA.id);
				
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
				var cityTarget;
				var quest;
				if (nMi.className.indexOf('gotoown') > 0)
					{
					if (foundArmy == true)
						{
						continue;
						}
					else 
						{
						citySource = EmpireBoard.Ikariam.Trim_PlayerName(nSource.textContent);
						cityTarget = citiesIDs[EmpireBoard.Ikariam.Trim_PlayerName(nTarget.textContent)];
						quest = 'gotoown';
						if (mTimers[nETA.id] == undefined)
							{
							mTimers[nETA.id] = EmpireBoard.StartTime + (1 * 20 * 60 * 1000);
							quest = 'loading';
							}
						else if (nAc.innerHTML == '')
							{
							citySource = EmpireBoard.Ikariam.Trim_PlayerName(nTarget.textContent);
							cityTarget = citiesIDs[EmpireBoard.Ikariam.Trim_PlayerName(nSource.textContent)];
							quest = 'halfturn';
							}
						addTransport(citiesIDs[EmpireBoard.Ikariam.Trim_PlayerName(nSource.textContent)], nETA.id, mTimers[nETA.id]);
						if (foundGoods == false) continue;
						}
					}
				else if (nMi.className.indexOf('returning') > 0)
					{
					quest = 'returning';
					if (tr.parentNode.parentNode.parentNode.parentNode.id == 'plunderingTransports')
						{
						if (foundGoods == true)
							{
							citySource = EmpireBoard.Str.Trim(nTarget.textContent);
							cityTarget = citiesIDs[EmpireBoard.Ikariam.Trim_PlayerName(nSource.textContent)];
							if (cityTarget == undefined)
								{
								citySource = EmpireBoard.Ikariam.Trim_PlayerName(nSource.textContent);
								cityTarget = citiesIDs[EmpireBoard.Ikariam.Trim_PlayerName(nTarget.textContent)];
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
						cityTarget = citiesIDs[EmpireBoard.Ikariam.Trim_PlayerName(nSource.textContent)];
						if (foundArmy == false) addTransport(citiesIDs[EmpireBoard.Ikariam.Trim_PlayerName(nSource.textContent)], nETA.id, mTimers[nETA.id]);
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
							addTransport(citiesIDs[EmpireBoard.Ikariam.Trim_PlayerName(nSource.textContent)], nETA.id, mTimers[nRET.id]);
							}
						else if (mTimers[nETA.id] != undefined)
							{
							addTransport(citiesIDs[EmpireBoard.Ikariam.Trim_PlayerName(nSource.textContent)], nETA.id, mTimers[nETA.id]);
							}
						else
							{
							addTransport(citiesIDs[EmpireBoard.Ikariam.Trim_PlayerName(nSource.textContent)], nETA.id, EmpireBoard.StartTime + (1000*60*15));
							}
						
						if ((foundGoods == true) && (nAc.innerHTML != ''))
							{
							continue;
							}
						else if ((foundGoods == true) && (nAc.innerHTML == '') && (mTimers[nETA.id] == undefined))
							{
							citySource = EmpireBoard.Str.Trim(nTarget.textContent);
							cityTarget = citiesIDs[EmpireBoard.Ikariam.Trim_PlayerName(nSource.textContent)];
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
		EmpireBoard.Log.Add("Registered merchant transports");
		
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
		//span.align = "center";
		if (EmpireBoard.Intl.LangDir() == "rtl")
			{
			span.setAttribute("dir", "rtl");
			span.setAttribute("class", "RtoL");
			}
		span.innerHTML = s;
		body.appendChild(span);
		}
	else
		{
		//span.align = "center";
		if (EmpireBoard.Intl.LangDir() == "rtl")
			{
			span.setAttribute("dir", "rtl");
			span.setAttribute("class", "RtoL");
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
	n.innerHTML = 'Powered by <a href="http://userscripts.org/scripts/show/89912" target="_blank"><b>'+EmpireBoard.ScriptName+'</b></a> <span dir="ltr">(<span>v. <i>' + EmpireBoard.Version + '</i></span>. ';
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
	
	EmpireBoard.CheckScriptUpdate();
	};
	
EmpireBoard.EndTime = new Date().getTime();
EmpireBoard.Log.Add('Ended after '+((EmpireBoard.EndTime - EmpireBoard.StartTime)/1000)+'s');
