// ==UserScript==
// @name		Ikariam Manager
// @namespace	general.ikariam
// @description	Display population, resources, trading, transports, incomes, buildings, and army or fleet units overviews for each cities.
// @version		3.0.3
// @icon		http://s3.amazonaws.com/uso_ss/icon/76873/large.png
// @author		bluesman
// @author		oliezekat (until 1.9.2)
// @include		http://s*.ikariam.*/*
// @include		http://s*.*.ikariam.*/*
// @exclude		http://support.ikariam.*/*
// @exclude		http://*.ikariam.*/pillory.php*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

/**************************************************************************************************
History
Version 3.0.3	- fixed thumnail for steam ram
Version 3.0.2	- small bug fixes
Version 3.0.1	- Changes for ikariam v 0.4.5 (navy units)
Version 3.0		- lot of changes and new settings
Version 2.2.2	- few fixes and optmizations
Version 2.2.1	- few minor fixes and cosmetics
Version 2.2		- army/fleet movement, "select all units", units listing in deoployed or occupied cities, options to quickly show/hide tables
Version 2.1.1	- army/fleet generals count + upkeep fixes
Version 2.1.0	- army/fleet upkeep in the view
Version 2.0.5	- few fixes and skin support
Version 2.0.4	- calculates number of generals in the details view, separate army and navy
Version 2.0.1	- calculates number of generals in the city
Version 1.9.9	- fixed problem with new Ikariam version 0.4.1
Version 1.9.8	- few more changes and fixes, now displays occupied and deployed cities
Version 1.9.7	- Added dump into building list
				- Calculates dump capacity into total storage capacaity
Version 1.9.6	- Changed name to Ikariam Board++ on oliezekat's request
Version 1.9.5	- few bug fixes
Version 1.9.3:	- fe bug fixes (crystal / glass problem)
				- Add serbian translation
				- change table layout
				- add icons in overview
				- some code fixes
**************************************************************************************************/

const WEEK 	 = 604800; // 60 * 60 * 24 * 7;
const DAY 	 = 86400; // 60 * 60 * 24;
const HOUR	 = 3600; // 60 * 60;
const MINUTE = 60;
const SECOND = 1;

const WOOD = 'wood';
const WINE = 'wine';
const MARBLE = 'marble';
const CRYSTAL = 'crystal';
const SULFUR = 'sulfur';

var config;
var language;
var langtype;
var texts;
var buildings;
var tavernWineUsage	= [0, 4, 8, 13, 18, 24, 30, 37, 44, 51, 60, 68, 78, 88, 99, 110, 122, 136, 150, 165, 180, 197, 216, 235, 255, 277, 300, 325, 351, 378, 408, 439, 472, 507, 544, 584, 626, 670, 717, 766, 818];
var townHallSpaces	= [0, 60, 96, 142, 200, 262, 332, 410, 492, 580, 672, 768, 870, 976, 1086, 1200, 1320, 1440, 1566, 1696, 1828, 1964, 2102, 2246, 2390, 2540, 2690, 2845, 3003, 3163, 3326, 3492, 3710, 3880, 4054, 4230, 4410, 4590, 4774, 4960, 5148, 5340, 5532, 5728, 5926, 6126, 6328, 6534, 6760];

var unitsIds =
{
	'303' : 'phalanx', '308' : 'steamgiant', '315' : 'spearman', '302' : 'swordsman', '301' : 'slinger', '313' : 'archer', '304' : 'marksman', '307' : 'ram', '306' : 'catapult', '305' : 'mortar', '312' : 'gyrocopter', '309' : 'bombardier', '310' : 'cook', '311' : 'medic',
	'210' : 'ship_ram', '211' : 'ship_flamethrower', '212' : 'ship_submarine', '213' : 'ship_ballista', '214' : 'ship_catapult', '215' : 'ship_mortar', '216' : 'ship_steamboat', '217' : 'ship_rocketship', '218' : 'ship_paddlespeedship', '219' : 'ship_ballooncarrier', '220' : 'ship_tender'
};

var military_units =
{
	// generals formula: (wood + res) * 0.02
//	unit name				   wood,  res, pop, gold, score
	'unit phalanx' 			: [  40,   30, 1,   3,  1.4],
	'unit steamgiant'		: [ 130,  180, 2,  12,  6.2],
	'unit spearman'			: [  30,    0, 1,   1,  0.6],
	'unit swordsman'		: [  30,   30, 1,   4,  1.2],
	'unit slinger'			: [  20,    0, 1,   2,  0.4],
	'unit archer'			: [  30,   25, 1,   4,  1.1],
	'unit marksman'			: [  50,  150, 1,   3,  4.0],
	'unit ram'				: [ 220,    0, 5,  15,  4.4],
	'unit catapult'			: [ 260,  300, 5,  25, 11.2],
	'unit mortar'			: [ 300, 1250, 5,  30, 31.0],
	'unit gyrocopter'		: [  25,  100, 3,  15,  2.5],
	'unit bombardier'		: [  40,  250, 5,  45,  5.8],
	'unit cook'				: [  50,  150, 1,  10,  4.0],
	'unit medic'			: [  50,  450, 1,  20, 10.0],

	'unit ship_ram'			: [ 220,    0, 3,  15,  5.0],
	'unit ship_flamethrower': [  80,  230, 4,  25,  5.6],
	'unit ship_steamboat'	: [ 400,  800, 2,  45, 24.0],
	'unit ship_ballista'	: [ 180,  160, 6,  20,  6.8],
	'unit ship_catapult'	: [ 180,  140, 5,  35,  6.4],
	'unit ship_mortar'		: [ 220,  900, 5,  50, 22.4],
	'unit ship_submarine'	: [ 160,  750, 6,  50, 20.2],
	'unit ship_tender'			: [ 300,  500, 7, 100, 16.0],
	'unit ship_ballooncarrier'	: [ 700,  700, 8, 100, 28.0],
	'unit ship_rocketship'		: [ 200, 1200, 2,  55, 28.0],
	'unit ship_paddlespeedship'	: [ 40,   280, 1,   5, 6.4],
};

var wonders = { 1 : "Hephaistos` Forge", 2 : "Hades` Holy Grove", 3 : "Demeter`s gardens", 4 : "Temple of Athene", 5 : "Temple of Hermes", 6 : "Ares` Stronghold", 7 : "Temple of Poseidon", 8 : "Colossus" };

// Old objects
function Resource ()
{
	this.wood = 0;
	this.wine = 0;
	this.marble = 0;
	this.crystal = 0;
	this.sulfur = 0;
	this.underConstruction = "-";
	this.population = 0;
	this.scientist = 0;
	this.priests = 0;
	this.spies = 0;
	this.buildings = {};
	this.units = {};
}

function _t (n)		{ return (typeof texts[n] == 'undefined') ? n : texts[n];  }
function _b (n, k) 	{ if (typeof k == 'undefined') { k = 0; } return (typeof buildings[n][k] == 'undefined') ? n : buildings[n][k];  }

/**
 * --------------------------------------------------------------------------
 *
 * IKM object
 *
 * --------------------------------------------------------------------------
 */
var IKM =
{
	show_custom_buildings	: true, 		// Show other buildings images
	icon_require_attention	: '!',			// display for "require attention"
	icon_upgrading 			: " &uarr; ",	// display when upgrading building
	upgrading_prefix		: "<sup>",
	upgrading_sufix			: "</sup>",

	icon_res_size			: 16,			// the heigh of resource icon

	icon_army				: '/skin/img/city/building_barracks.gif',
	icon_fleet				: '/skin/img/city/building_shipyard.gif',
	icon_move_army			: '/skin/actions/move_army.gif',
	icon_move_fleet			: '/skin/actions/move_fleet.gif',

	icon_move_army_disabled	: '/skin/actions/move_army_disabled.gif',
	icon_move_fleet_disabled: '/skin/actions/move_fleet_disabled.gif',
	icon_transport			: '/skin/actions/transport.gif',

//	icon_transport			: '<img src="/skin/characters/fleet/40x40/ship_transport_r_40x40.gif" align="absmiddle" alt="ship" height="20" />', // '<img class="Action medium" src="/skin/actions/transport.gif" align="absmiddle" />',
	icon_transport_disabled	: '<img src="/skin/actions/transport_disabled.gif" align="absmiddle" width="20" vspace="5" />',

	icon_safe_res			: '/skin/layout/icon-wall.gif',
	hours_to_empty_warn_red	: 6,
	hours_to_empty_warn		: 24,

	no_units				: '·',
	no_number				: '·',
	no_building				: '·',
	uknown					: '?',
	attention				: '!',
	none					: '-',
	NaN						: 'NaN',

	report_transports		: true, // report transports on the way
	show_safe_res_icon		: false, // show small icon if resources are under safety capacity
	show_all_units			: false, // show all units no matter if they exist
	move_friends			: true,	// move list of friends to the right

	font_family				: 'Arial, sans-serif',
	font_size				: '10px',

	version					: '3.0.3'
};

// New unique object
if (!IM)
{
	var IM = {};
}

function get_var (varname, vardefault)
{
	var res = GM_getValue (IM.Ika.host() + varname);
	return (res == undefined) ? vardefault : res;
}

function set_var (varname, varvalue)
{
	GM_setValue(IM.Ika.host() + varname, varvalue);
}

function cfg_get (key, defaultValue)
{
	return ((config.cfg != undefined && config.cfg[key] != undefined) ? config.cfg[key] : defaultValue);
}

function cfg_get_non_empty (key, defaultValue)
{
	return ((config.cfg != undefined && config.cfg[key] != undefined && config.cfg[key] != '') ? config.cfg[key] : defaultValue);
}

/**
 * --------------------------------------------------------------------------
 *
 * IM (Ikariam Manager) object
 *
 * --------------------------------------------------------------------------
 */
IM =
{
	start_time:		0,
	end_time:		0,
	log_enabled:	false,
	main_id:		'IkariamManager',

	/* Script metas */
	script_name:	'Ikariam Manager³',
	version:		303,
	home_page:		'',
	script_url:		'',
	userscripts_id:	76873,

	Init : function()
	{
		this.start_time	= new Date().getTime();
		this.home_page	= 'http://userscripts.org/scripts/show/' + this.userscripts_id;
		this.script_url	= 'http://userscripts.org/scripts/source/' + this.userscripts_id + '.user.js';

		/* Init Log */
		this.Log.Init(this);
		this.Log._Enabled = this.log_enabled;

		this.DOM.Init(this);
		this.Str.Init(this);
		this.Str._decimalPoint		 = unsafeWindow.LocalizationStrings['decimalPoint'];
		this.Str._thousandSeparator	 = unsafeWindow.LocalizationStrings['thousandSeperator'];

		this.Ika.init(this);
		this.DB.Init(this);
		this.DB.load_options();
		this.Renders.Init(this);
		this.Tooltip.Init(this, this.main_id + 'Tooltip', this.main_id);
		this.Handlers.Init(this);
		this.Updater.Init(this);

		// Always create main div for add-ons which need to check version
		var body = IM.DOM.Get_First_Node("//body");
		var span = document.createElement('div');
		span.id = "IkariamManager";
		span.setAttribute("version", this.version);
		body.appendChild(span);

		this.DB.Load();

		this.Ika.Fetch_CitiesSelect (this.DB.OwnCities, true);

		setLanguage();
//		getLocalizedTexts();
	},

	preference : function (key, default_value)	{ return this.DB.get_option (key, default_value); },
	set_preference : function (key, value)		{ this.DB.set_option (key, value); },

	View :
	{
		is : function (name)
		{
			if (typeof name == 'object')
			{
				for (i in name)
				{
					if (IM.View.is (name[i]))
					{
						return true;
					}
				}
			}
			else if (typeof name == 'string')
			{
				return IM.Ika.view() == name;
			}
			return false;
		},

		is_finances : function()
		{
			var citiesIDs = {};
			var res = IM.DOM.Get_Nodes("//select[@id='citySelect']/option");
			for(var i = 0; i < res.snapshotLength; i++)
			{
				var n = res.snapshotItem(i);
				var cName = IM.Ika.trim_coordinates(n.innerHTML);
				citiesIDs[cName] = parseInt(n.value);
			}

			var nodes = IM.DOM.Get_Nodes("//table[@id='balance']//td[@class='city']");
			for (var i = 0; i < nodes.snapshotLength; i++)
			{
				var node = nodes.snapshotItem(i);
				var cName = IM.Str.trim(node.innerHTML);
				var cID = citiesIDs[cName];

				var tr = node.parentNode;
				var tds = tr.getElementsByTagName("td");
				var incomegold = IM.Str.to_integer(tds[3].innerHTML);

				var city = get_city (cID);
				if (city.buildings['townHall'] == undefined)
				{
					city.buildings['townHall'] = {};
				}
				city.buildings['townHall'].incomegold = incomegold;
			}

			config.financestime = this.start_time;
		},

		building_is_tavern: function()	{ },

		// Thank to matteo466
		is_research_overview: function()
		{
			config['research'] = {};

			var LIs = IM.DOM.Get_Nodes("//div[@id='mainview']//div[contains(@class, 'content')]//li[@class='explored']");
			IM.Log.Add("Research explored: " + LIs.snapshotLength);
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
						var researchLevel = IM.Str.to_integer(researchA.textContent.replace(/\-/g, ''),1);

						IM.Log.Add("Found research: " + researchID + ', level ' + researchLevel);

						config['research'][researchID] = {};
						config['research'][researchID].Explored = true;
						config['research'][researchID].Level = researchLevel;
					}
				}
			}

			function isExplored(researchID)
			{
				return config['research'][researchID] != undefined && config['research'][researchID].Explored == true;
			}

			var FleetUpkeepBonus = 0;
			if (isExplored(1020)) { FleetUpkeepBonus += 2; }
			if (isExplored(1050)) { FleetUpkeepBonus += 4; }
			if (isExplored(1090)) { FleetUpkeepBonus += 8; }
			if (isExplored(1999)) { FleetUpkeepBonus += 2 * config['research'][1999].Level; }

			IM.Log.Add("FleetUpkeepBonus: " + FleetUpkeepBonus);
			config['research'].FleetUpkeepBonus = FleetUpkeepBonus;

			var ArmyUpkeepBonus = 0;
			if (isExplored(4020)) { ArmyUpkeepBonus += 2; }
			if (isExplored(4050)) { ArmyUpkeepBonus += 4; }
			if (isExplored(4090)) { ArmyUpkeepBonus += 8; }
			if (isExplored(4999)) { ArmyUpkeepBonus += 2 * config['research'][1999].Level; }

			IM.Log.Add("ArmyUpkeepBonus: " + ArmyUpkeepBonus);
			config['research'].ArmyUpkeepBonus = ArmyUpkeepBonus;
		},

		is_premium: function()
		{
			config['premium'] = { safe_capacity_bonus : 0, storage_capacity_bonus : 0};
			var premiumOfferClasses = ['account', 'dummySmallBonus', 'woodbonus', 'marblebonus', 'sulfurbonus', 'crystalbonus', 'winebonus', 'savecapacityBonus', 'storagecapacityBonus', 'extendPremiumTraderoutes'];
			var premiumCapacityClasses = ['savecapacityBonus', 'storagecapacityBonus'];

			for (i in premiumCapacityClasses)
			{
				var v = $('#premiumOffers TABLE.TableHoriMax TR.' + premiumCapacityClasses[i]);
				var a = $(v).next();
				if ($('TD', a).hasClass('active'))
				{
					var remainingText = $('TD', a).text().trim();
					var regExp = new RegExp("([0-9]) (.+)", "ig");
					var RegExpRes = regExp.exec(remainingText);

					var remaining_time = DAY * 1000;
					if (RegExpRes != null)
					{
						var time_value = parseInt(RegExpRes[1]);
						var time_unit = RegExpRes[2].substring(0,1);

						if 		(time_unit == unsafeWindow.LocalizationStrings['timeunits']['short']['day'])	{ remaining_time = time_value * DAY * 1000; }
						else if (time_unit == unsafeWindow.LocalizationStrings['timeunits']['short']['hour'])	{ remaining_time = time_value * HOUR * 1000; }
						else if (time_unit == unsafeWindow.LocalizationStrings['timeunits']['short']['minute'])	{ remaining_time = time_value * MINUTE * 1000; }
						else if (time_unit == unsafeWindow.LocalizationStrings['timeunits']['short']['second'])	{ remaining_time = time_value * 1000; }
						else																					{ remaining_time = DAY * 1000; }
					}

					if (premiumCapacityClasses[i] == 'savecapacityBonus')
					{
						config['premium'].safe_capacity_bonus = IM.start_time + remaining_time;
					}
					if (premiumCapacityClasses[i] == 'storagecapacityBonus')
					{
						config['premium'].storage_capacity_bonus = IM.start_time + remaining_time;
					}
				}
			}

		},

		is_military_movements: function()
		{
			config['movements'] = {};
			function add_movement (cityID, movementID, FleetMovement)
			{
				if (config['movements'][cityID] == undefined) 				{ config['movements'][cityID] = {}; }
				if (config['movements'][cityID][movementID] == undefined) 	{ config['movements'][cityID][movementID] = {}; }

				config['movements'][cityID][movementID] = FleetMovement;
				config['movements'][cityID][movementID].endTime = FleetMovement.time;
			}

			config['attacks'] = {};
			function add_attacks (cityID, movementID, FleetMovement)
			{
				if (config['attacks'][cityID] == undefined) 				{ config['attacks'][cityID] = {}; }
				if (config['attacks'][cityID][movementID] == undefined) 	{ config['attacks'][cityID][movementID] = {}; }

				config['attacks'][cityID][movementID] = FleetMovement;
				config['attacks'][cityID][movementID].endTime = FleetMovement.time;
			}

			IM.Ika.fetch_fleet_movements (IM.DB.FleetMovements);

			var resMi = IM.DOM.Get_Nodes("//div[@id='fleetMovements']//table[contains(@class, 'locationEvents')]/tbody/tr/td/img[contains(@src, 'mission_')]");
			if (resMi.snapshotLength > 0)
			{
				for (var i=0; i < resMi.snapshotLength; i++)
				{
					var tr = resMi.snapshotItem(i).parentNode.parentNode;
					var tds = tr.getElementsByTagName("td");

					var fleetId = tds[1].id;

					if ((fleetId != '') && (IM.DB.FleetMovements[fleetId] != undefined))
					{
						var FleetMovement = IM.DB.FleetMovements[fleetId];
						var toOwn = false;
						if ((IM.DB.OwnCities[FleetMovement.tCityId] != undefined)
							&& (FleetMovement.tCityId != FleetMovement.oCityId)
							&& (IM.DB.OwnCities[FleetMovement.tCityId].own == true))
						{
							toOwn = true;
						}

						// Values: deployarmy, deployfleet, plunder, blockade, defend, defend_port, trade, transport, occupy
						if (FleetMovement.hostile == true)
						{
							add_attacks (FleetMovement.tCityId, fleetId, FleetMovement);
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
									Tools.View.rq_time ('merchantNavy', 0, FleetMovement.time);
								}
							}
							else if (FleetMovement.mission == 'deployarmy')
							{
								add_movement (FleetMovement.oCityId, fleetId, FleetMovement);

								if ((FleetMovement.toRight == true) && (toOwn == true))
								{
//									IM.Log.Add("Army " + fleetId + ' will arrive to city[' + FleetMovement.tCityId + ']');
									Tools.View.rq_time ('cityMilitary-army', FleetMovement.tCityId, FleetMovement.time);
								}
								else if (FleetMovement.toLeft == true)
								{
//									IM.Log.Add("Army " + fleetId + ' come back to city[' + FleetMovement.oCityId + ']');
									Tools.View.rq_time ('cityMilitary-army', FleetMovement.oCityId, FleetMovement.time);
								}
							}
							else if (FleetMovement.mission == 'deployfleet')
							{
								add_movement (FleetMovement.oCityId, fleetId, FleetMovement);

								if ((FleetMovement.toRight == true) && (toOwn == true))
								{
//									IM.Log.Add("Fleet " + fleetId + ' will arrive to city[' + FleetMovement.tCityId + ']');
									Tools.View.rq_time ('cityMilitary-fleet', FleetMovement.tCityId, FleetMovement.time);
								}
								else if (FleetMovement.toLeft == true)
								{
//									IM.Log.Add("Fleet " + fleetId + ' come back to city[' + FleetMovement.oCityId + ']');
									Tools.View.rq_time ('cityMilitary-fleet', FleetMovement.oCityId, FleetMovement.time);
								}
							}
							else if (FleetMovement.mission == 'plunder')
							{
								add_movement (FleetMovement.oCityId, fleetId, FleetMovement);

								if ((FleetMovement.hasGoods == true) && (FleetMovement.toLeft == false) && (FleetMovement.toRight == false))
								{
									Tools.View.rq_time ('merchantNavy', 0, FleetMovement.time);
								}
							}
							else if (FleetMovement.mission == 'blockade')
							{
								add_movement (FleetMovement.oCityId, fleetId, FleetMovement);
							}
							else
							{
								add_movement (FleetMovement.oCityId, fleetId, FleetMovement);
							}
						}
						else
						{
							if (FleetMovement.mission == 'trade')
							{
								if ((toOwn == true) && (FleetMovement.toRight == true))
								{
//									IM.Log.Add("Foreign transport " + fleetId + ' arrive to city[' + FleetMovement.tCityId + ']');
									Tools.View.rq_time ('branchOffice', FleetMovement.tCityId, FleetMovement.time);
								}
							}
							else if (FleetMovement.mission == 'transport')
							{
								if ((toOwn == true) && (FleetMovement.toRight == true))
								{
//									IM.Log.Add ("Foreign transport " + fleetId + ' arrive to city[' + FleetMovement.tCityId + ']');
									Tools.View.rq_time ('', FleetMovement.tCityId, FleetMovement.time);
								}
							}
						}
					}
				}
			}

			config.mAMMtime = this.start_time;
		},

		IsBuildingWorkshop: function()
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
				if (/enddate[^0-9]*([0-9]+)/.exec(sCode) != null)		{ enddate = parseFloat(RegExp.$1) * 1000; }
				if (/currentdate[^0-9]*([0-9]+)/.exec(sCode) != null)	{ currentdate = parseFloat(RegExp.$1) * 1000; }
				if (enddate != 0 && currentdate != 0)
				{
					Tools.View.rq_time ('workshop', current_city.main_id, this.start_time + (enddate - currentdate), true);
					IM.Log.Add('Workshop upgrade remaining time: ' + enddate + ' - ' + currentdate + ' = ' + (enddate-currentdate)/1000 + 's');
				}
			}
		},
	},

/**
* IM log object
*/
	Log :
	{
		_Parent: null,
		_Enabled: false,

		Init: function(parent)	{ this._Parent = parent; },

		Add: function(msg)
		{
			if (this._Enabled == true) { GM_log (msg); }
		}
	},

/**
* IM.Updater object
*/
	Updater :
	{
		_Parent:			null,
		_script_url:		'',
		_version_available:	0,

		Init: function(parent) { this._Parent = parent; },

		// CallBackFct function receive available version number (or null value if failed) as argument
		Check: function(ScriptURL, CallBackFct)
		{
			this._version_available	 = 0;
			this._ScriptURL			 = ScriptURL;
			var self = this;

			GM_xmlhttpRequest({
				method:				"GET",
				url:				ScriptURL,
				headers:			{ Accept : "text/javascript; charset=UTF-8" },
				overrideMimeType:	"application/javascript; charset=UTF-8",
				onload:				function(response) { self._ParseScript(response, CallBackFct); }
			});
		},

		_ParseScript: function(response, CallBackFct)
		{
			var version_available = 0;

			if (response.status == 200)
			{
				var resReg = /@version\s+(\d+)/.exec(response.responseText);
				if (resReg != null)
				{
					version_available = resReg[1];
				}
			}

			this._version_available = version_available;

			if (typeof CallBackFct == 'function')
			{
				CallBackFct.call (this._Parent, version_available, response);
			}
		}
	},

/**
* IM DB object
*/
	DB :
	{
		_Parent:			 null,
		Prefix:				 '',
		OwnCities:			 {},
		FleetMovements:		 {},
		Options:			 {},

		Init : function(parent, host)
		{
			this._Parent = parent;
			if (host == undefined) host = this._Parent.Ika.host();

			this.Prefix = host;
			this.Prefix = this.Prefix.replace('.ikariam.', '-');
			this.Prefix = this.Prefix.replace('.', '-');
		},

		Load : function()
		{
			config = this.unserialize (get_var("config", ''));
			if (config == null || config == undefined || config == '' || ('' . config == IKM.NaN))
			{
				config = new Object();
			}

			// Check if main arrays exists
			if (config.cfg == undefined) 				{ config.cfg = new Object(); }
			if (config['mycities'] == undefined) 		{ config['mycities'] = {}; }
			if (config['unitnames'] == undefined) 		{ config['unitnames'] = {}; }
			if (config['upkeeps'] == undefined) 		{ config['upkeeps'] = {}; }
			if (config['arrivinggoods'] == undefined)	{ config['arrivinggoods'] = {}; }
			if (config['movements'] == undefined) 		{ config['movements'] = {}; }
			if (config['attacks'] == undefined) 		{ config['attacks'] = {}; }
			if (config['transports'] == undefined)		{ config['transports'] = {}; }
			if (config['research'] == undefined)		{ config['research'] = {}; }
		},

		Save : function()								{ set_var ("config", this.serialize(config)); },
		serialize : function(data)						{ return uneval(data); },
		unserialize : function(data)					{ return eval(data); },
		get_option : function (key, default_value)		{ return (this.Options.Prefs[key] == undefined ? default_value : this.Options.Prefs[key]); },
		set_option : function (key, value)				{ this.Options.Prefs[key] = value; },

		load_options : function()
		{
			// Not used yet
			this.Options = this.unserialize (GM_getValue(this.Prefix + '.Opt', false)) || {};

			if (this.Options.Prefs == undefined)					{ this.Options.Prefs = {}; }
			if (this.Options.Prefs.TABLE_RESOURCES == undefined)	{ this.Options.Prefs.TABLE_RESOURCES = true; }
			if (this.Options.Prefs.TABLE_BUILDINGS == undefined)	{ this.Options.Prefs.TABLE_BUILDINGS = true; }
			if (this.Options.Prefs.TABLE_ARMYFLEET == undefined)	{ this.Options.Prefs.TABLE_ARMYFLEET = true; }
			if (this.Options.Prefs.PROGRESS_BAR_MODE == undefined)	{ this.Options.Prefs.PROGRESS_BAR_MODE = 'time'; }
			if (this.Options.Prefs.LANGUAGE 	== undefined)		{ this.Options.Prefs.LANGUAGE = ''; }
			// show buldings table details
			if (this.Options.Prefs.Buildings 	== undefined)		{ this.Options.Prefs.Buildings = true; }
			// show resources table details
			if (this.Options.Prefs.Resources 	== undefined)		{ this.Options.Prefs.Resources = true; }
			// show army table details
			if (this.Options.Prefs.Army 		== undefined)		{ this.Options.Prefs.Army = true; }
			// show list of other cities details
			if (this.Options.Prefs.OtherCities	== undefined)		{ this.Options.Prefs.OtherCities = true; }
			// show large army icons in the header
			if (this.Options.Prefs.LargeIcons	== undefined)		{ this.Options.Prefs.LargeIcons = false; }
			// show resource production on the left or right
			if (this.Options.Prefs.resProductionAlt	== undefined)	{ this.Options.Prefs.resProductionAlt = true; }
			// show tables in fixed or flexible width
			if (this.Options.Prefs.fixedWidth == undefined)			{ this.Options.Prefs.fixedWidth = false; }
			// show advanced mode (more details)
			if (this.Options.Prefs.advancedMode == undefined)		{ this.Options.Prefs.advancedMode = true; }
			// show buidling image in tooltip
			if (this.Options.Prefs.buildingTooltip == undefined)	{ this.Options.Prefs.buildingTooltip = false; }
			// table orders
			if (this.Options.Prefs.tableOrder == undefined)			{ this.Options.Prefs.tableOrder = 'Buildings,Resources,Army'; }
			// table orders
			if (this.Options.Prefs.showCityAndServer == undefined)	{ this.Options.Prefs.showCityAndServer = true; }
		},

		save_options : function()
		{
			GM_setValue (this.Prefix + '.Opt', this.serialize(this.Options));
		}

	},

/**
* IkariamManager.Renders object
*/
	Renders :
	{
		_Parent: null,

		Init : function(parent)	{ this._Parent = parent; },

		army_header_icons : function(currentCityId)	{ return ''; },

		icon_to_safehouse_reports : function(currentCityId,Title)
		{
			if (currentCityId == undefined)	{ currentCityId = 0; }
			if (Title == undefined) 		{ Title = "View espionage reports"; }

			var sCityId = 0;
			var sCityPos = -1;

			if (currentCityId > 0)
			{
				sCityPos = Tools.Building.position(currentCityId, 'safehouse', -1);

				if (sCityPos > 0) 	{ sCityId = currentCityId; }
			}

			if (sCityId == 0)
			{
				var Cities = this._Parent.DB.OwnCities;
				for (CityId in Cities)
				{
					sCityPos = Tools.Building.position(CityId, 'safehouse', -1);
					if (sCityPos > 0)
					{
						sCityId = CityId;
						break;
					}
				}
			}

			if ((sCityId == 0) || (sCityPos <= 0))		{ return ''; }

			// skin/img/city/building_safehouse.gif
			return '<a view="safehouse" tab="reports" cityid="' + sCityId + '" position="' + sCityPos + '" href="?view=safehouse&id=' + sCityId + '&position=' + sCityPos + '&tab=reports" title="' + Title + '"><img align="absmiddle" src="skin/buildings/x40_y40/safehouse.gif"/></a>';
		},

		buildings_header_icons : function (currentCityId)
		{
			var rHTML = this.icon_to_research_overview(currentCityId);

			rHTML += (Tools.View.report_to_survey ('researchOverview') == IKM.attention) ? '<sup class=Red title="' + _t('requireAtt') + '">' + IKM.icon_require_attention + '</sup>' : '&nbsp;';

			rHTML += this.icon_to_research_advisor();
			rHTML += (Tools.View.report_to_survey ('researchAdvisor') == IKM.attention) ? '<sup class=Red title="' + _t('requireAtt') + '">' + IKM.icon_require_attention + '</sup>' : '&nbsp;';

			return rHTML;
		},

		icon_to_research_advisor : function(Title)
		{
			if (Title == undefined) { Title = "View research advisor"; }

			return '<a view="researchAdvisor" href="?view=researchAdvisor" title="' + Title + '"><img align="absmiddle" src="skin/resources/icon_scientist.gif"/></a>';
		},

		icon_to_research_overview : function(currentCityId,Title)
		{
			if (currentCityId == undefined)	{ currentCityId = 0; }
			if (Title == undefined) 		{ Title = "View research library"; }

			// skin/icons/researchbonus_30x30.gif
			// skin/img/city/building_academy.gif
			return '<a view="researchOverview" cityid="' + currentCityId + '" href="?view=researchOverview&id=' + currentCityId + '" title="' + Title + '"><img align="absmiddle" src="skin/buildings/x40_y40/academy.gif"/></a>';
		},

		movements_tooltip_content : function(cityID)
		{
			var tooltip = "<table>";

			if (config["movements"] == undefined)
			{
				return '';
			}
			else if (config["movements"][cityID] != undefined)
			{
				for (key in config["movements"][cityID])
				{
					var arrivetime = config["movements"][cityID][key].endTime;
					if (arrivetime >= this._Parent.start_time)
					{
						var tCityId = config["movements"][cityID][key].tCityId;
						var tCity = '';
						if ((this._Parent.DB.OwnCities[tCityId] != undefined) && (this._Parent.DB.OwnCities[tCityId].own != false))
						{
							tCity = config["movements"][cityID][key].tCityName;
						}
						else
						{
							tCity = config["movements"][cityID][key].tCityName + " (" + config["movements"][cityID][key].tPlayerName + ")";
						}

						var tLocation = '';
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
						tLocation += "<i>" + tCity + "</i>";

						var counter = "(<font id='mytimecounter' counter='" + Math.round(arrivetime) + "' class='time_counter'>__:__:__</font>)";
						var smartDate = smartDateFormat(arrivetime);

						tooltip += "<tbody><tr>" +
						"<td valign='top' align='left' class='Mission'><img src='" + this._Parent.Ika.Get_FleetMission_ImgSrc(config["movements"][cityID][key].mission) + "' /></td>" +
						"<td valign='top' align='right'><b>" + config["movements"][cityID][key].summary + "</b>&nbsp;</td>" +
						"<td valign='top' align='left'>" + tLocation + "</td>" +
						"</tr><tr class='Small'>" +
						"<td align='right' colspan='3'>&nbsp;&nbsp;" + smartDate + "&nbsp;" + counter + "</td>" +
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
		},

		attacks_tooltip_content : function(cityID)
		{
			var tooltip = "<table>";

			if (config["attacks"] == undefined)	{ return ''; }
			else if (config["attacks"][cityID] != undefined)
			{
				for (key in config["attacks"][cityID])
				{
					var arrivetime = config["attacks"][cityID][key].endTime;
					if (arrivetime >= this._Parent.start_time)
					{
						var tCityId = config["attacks"][cityID][key].oCityId;
						var tCity ='';

						tCity = config["attacks"][cityID][key].oCityName + " (" + config["attacks"][cityID][key].oPlayerName + ")";

						var tLocation = "<i>" + tCity + "</i>&nbsp;";

						if (config["attacks"][cityID][key].toLeft == true)			{ tLocation += "&laquo;"; }
						else if (config["attacks"][cityID][key].toRight == true)	{ tLocation += "&raquo;"; }
						else 														{ tLocation += "&laquo;&raquo;"; }

						var counter = "(<font id='mytimecounter' counter='" + Math.round(arrivetime) + "' class='time_counter'>__:__:__</font>)";
						var smartDate = smartDateFormat(arrivetime);

						tooltip += "<tbody><tr>" +
						"<td valign='top' align='left' class='Red'>" + tLocation + "</td>" +
						"<td valign='top' align='left' class='Mission'><img src='" + this._Parent.Ika.Get_FleetMission_ImgSrc(config["attacks"][cityID][key].mission) + "' /></td>" +
						"<td valign='top' align='right' class='Red'><b>" + config["attacks"][cityID][key].summary + "</b>&nbsp;</td>" +
						"</tr><tr class='Small'>" +
						"<td align='right' colspan='3'>&nbsp;&nbsp;" + smartDate + "&nbsp;" + counter + "</td>" +
						"</tr></tbody>";
					}
				}
			}
			else
			{
				return '';
			}

			return tooltip + "</table>";
		},

		arriving_goods_tooltip_content : function(city_id, res_name)
		{
			var _nowTime = new Date().getTime();

			var tooltip = "<table>";

			var sum = 0;

			var city = get_city (city_id);
			var rows = Tools.Array.value (config.arrivinggoods, city_id, []);
			var key;
			var higherTime = 0;
			for (key in rows)
			{
				var row = rows[key];
				var res = row["res"];
				var a = parseInt(Tools.Array.value (res, res_name, 0));
				var arrivetime = parseInt(Tools.Array.value (row, "arrivetime", ''));
				if ((a > 0) && (arrivetime > city.prodtime))
				{
					sum += a;
					var startcity = Tools.Array.value (row, "startcity", '');
					var quest = Tools.Array.value (row, "quest", '');

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
						var counter = "(<font id='mytimecounter' counter='" + Math.round(arrivetime) + "' class='time_counter'>__:__:__</font>)";
						var smartDate = smartDateFormat(arrivetime);
					}
					var fromLocation = "&laquo;&nbsp;<i>" + startcity + "</i>";

					tooltip += "<tbody><tr>" +
					"<td valign='top'>+</td>" +
					"<td valign='top' align='right'><b>" + this._Parent.Str.number_format(a) + "</b>&nbsp;</td>" +
					"<td valign='top' align='left'>" + fromLocation + "</td>" +
					"</tr><tr class='Small'>" +
					"<td align='right' colspan='3'>&nbsp;&nbsp;" + smartDate + "&nbsp;" + counter + "</td>" +
					"</tr></tbody>";
				}
			}

			var trading_goods = 0;
			var production_per_hour = 0;
			var res_qty = parseInt(Tools.Array.value (city, res_name, 0));
			if (res_name == 'wood')
			{
				trading_goods = city.trade_wood;
				production_per_hour = city.prod_wood;
				res_qty = Economy.Res.current_qty (_nowTime, city.prodtime, city.wood, city.prod_wood);
			}
			else if (res_name == 'wine')
			{
				trading_goods = city.trade_wine;
				var wineUsage = 0;
				var cellarLevel = Tools.Building.level (city_id, "vineyard", IKM.none);
				if (city.wineUsageId != undefined)
				{
					wineUsage = tavernWineUsage[city.wineUsageId];
					if (cellarLevel != IKM.none)
					{
						wineSave = wineUsage * cellarLevel;
						wineSave = Math.round(wineSave / 100);
						wineUsage = wineUsage - wineSave;
					}
				}
				production_per_hour = city.prod_wine - wineUsage;
				res_qty = Economy.Res.current_qty (_nowTime, city.prodtime, city.wine, city.prod_wine - wineUsage);
			}
			else if (res_name == 'marble')
			{
				trading_goods = city.trade_marble;
				production_per_hour = city.prod_marble;
				res_qty = Economy.Res.current_qty (_nowTime, city.prodtime, city.marble, city.prod_marble);
			}
			else if (res_name == 'crystal')
			{
				trading_goods = city.trade_crystal;
				production_per_hour = city.prod_crystal;
				res_qty = Economy.Res.current_qty (_nowTime, city.prodtime, city.crystal, city.prod_crystal);
			}
			else if (res_name == 'sulfur')
			{
				trading_goods = city.trade_sulfur;
				production_per_hour = city.prod_sulfur;
				res_qty = Economy.Res.current_qty (_nowTime, city.prodtime, city.sulfur, city.prod_sulfur);
			}

			if ((trading_goods != undefined) && (parseInt(trading_goods) > 0))
			{
				sum += parseInt(trading_goods);
				tooltip += "<tbody><tr><td>+</td><td align=right><b>"
					+ this._Parent.Str.number_format(parseInt(trading_goods))
					+ "</b>&nbsp;</td>"
					+ "<td align=left>&laquo;&nbsp;<i>" + buildings['branchOffice'][0] + "</i></td></tr></tbody>";
			}

			if (res_qty > 0)
			{
				tooltip += "<tbody><tr><td>+</td><td align=right><b>"
					+ this._Parent.Str.number_format(res_qty)
					+ "</b>&nbsp;</td>"
					+ "<td align=left>&laquo;&nbsp;<i>" + buildings['warehouse'][0] + "</i></td></tr></tbody>";
			}

			if (sum > 0)
			{
				tooltip += "<tfoot><tr><td>=</td><td align=right><b>" + this._Parent.Str.number_format(sum + res_qty) + "</b>&nbsp;</td><td></td></tr>";

				if ((production_per_hour != 0) && (higherTime > _nowTime + (1000 * MINUTE * 20)))
				{
					var rest_hours = (higherTime - _nowTime) / (1000 * HOUR);
					var prodSign = ' + ';
					if (production_per_hour < 0) { prodSign = '-' } ;
					tooltip += "<tr class='Small'>" +
					"<td>" + prodSign + "</td>" +
					"<td align='right'>" + this._Parent.Str.number_format (Math.abs (production_per_hour)) + "&nbsp;</td>" +
					"<td align='left'>x&nbsp;" + this._Parent.Str.float_format(rest_hours, 1) + unsafeWindow.LocalizationStrings['timeunits']['short']['hour'] + "</td>" +
					"</tr>";
					tooltip += "<tr class='Small'>" +
					"<td>=</td>" +
					"<td align='right'>" + this._Parent.Str.number_format (sum + res_qty + Math.floor(rest_hours * production_per_hour)) + "&nbsp;</td>" +
					"<td align='left'>&raquo;&nbsp;" + smartDateFormat(higherTime) + "</td>" +
					"</tr>";
				}
				tooltip += "</tfoot>";
			}

			tooltip += "</table>";
			return tooltip;
		},

		set_common_styles : function()
		{
			var default_style = <><![CDATA[

#IkariamManagerBuildings.abs,
	#IkariamManagerArmy.abs,
	#IkariamManagerResources.abs,
	#IkariamManagerOtherCities.abs { position: absolute; z-index:50; top:148px; width:97%; margin:0 auto; padding:0; text-align:center; }
#IkariamManagerBuildings.abs TABLE.Overview,
	#IkariamManagerArmy.abs TABLE.Overview,
	#IkariamManagerResources.abs TABLE.Overview { width:980px; margin:0 auto; box-shadow: 0 0 20px rgba(0,0,0,0.8);}
#IkariamManagerOtherCities.abs #OtherCities { width:960px; margin:0 auto; background:#EADAB6; padding:10px; box-shadow: 0 0 20px rgba(0,0,0,0.8);}

#IkariamManager { width: auto; margin: 0 20px; font-family: Arial,Tahoma, sans-serif; }
#IkariamManager TABLE.Overview { margin:10px auto; margin-top:0; text-align: center; border:1px solid #fff; background-color:#fDf1d4; width: 98%; box-shadow: 0 0 10px rgba(0,0,0,0.4);}
#IkariamManager.fixedWidth TABLE.Overview,
	#IkariamManager.fixedWidth #OtherCities { width: 980px; }
#IkariamManager TABLE.Overview thead { background: #E7C680 url(skin/input/button.gif) repeat-x scroll 0 0; }
#IkariamManager TABLE.Overview TH { width: auto; padding: 5px 1px; color: #542C0F; text-align: center; font-weight: normal; font-size: 0.9em; }
#IkariamManager TABLE.Overview TD { padding:1px 2px; border-bottom: 1px solid #F5DFA8 ; border-top: 0px solid #fff; vertical-align: middle; white-space:nowrap; }

#IkariamManager TABLE.Overview.Buildings TD { padding:0; }
#IkariamManager TABLE.Overview.Resources TD { text-align: right; padding-right:5px; padding-left:0; white-space:nowrap; }
#IkariamManager TABLE.Overview TR.current TD { background-color: #fff; color:#000; border-bottom: 2px solid #db9; border-top: 2px solid #db9; }
#IkariamManager TABLE.Overview.Army TR.current TD { padding:4px 2px; white-space:nowrap; }
#IkariamManager TABLE.Overview.Resources TR.current TD { padding:2px; padding-right:5px; padding-left:0; }
#IkariamManager TABLE.Overview.Buildings TR.TD { padding:0; }

#IkariamManager TABLE.Overview TH.city_name,
	#IkariamManager TABLE.Overview TD.city_name { width:140px; text-align: left; vertical-align: middle; padding:1px; border-right: 2px solid #CB9B6A; }
#IkariamManager TABLE.Overview TD.city_name { background:#EADAB6; }
#IkariamManager TABLE.Overview TH.city_name { background:#E7C680; }
#IkariamManager TABLE.Overview.Buildings TD.city_name,
	#IkariamManager TABLE.Overview.Army TD.city_name  { padding:2px 1px; }
#IkariamManager TABLE.Overview.Buildings TR.current TD.city_name,
	#IkariamManager TABLE.Overview.Army TR.current TD.city_name { padding:7px 1px; }
#IkariamManager TABLE.Overview.Army TD.city_name { padding:5px 1px; }
#IkariamManager TABLE.Overview TR.underOccupation TD.city_name { background: #FCDDD2 url(skin/icons/occupation_warning.gif) top right no-repeat;}

#IkariamManager TABLE.Overview TH.actions { vertical-align: middle; }
#IkariamManager TABLE.Overview TD.actions { vertical-align: middle; }
#IkariamManager TABLE.Overview TH.actions img,
	#IkariamManager TABLE.Overview TD.actions img { margin-left: 1px; border: none; max-height: 24px; }
#IkariamManager TABLE.Overview td img.Action { height: 12px; margin-bottom: 1px; }
#IkariamManager TABLE.Overview td img.Action.medium { height:auto; max-height: 20px; max-width:28px; }

#IkariamManager TABLE.Overview TD.details { text-align:center; padding:0; }
#IkariamManager TABLE.Overview TD.details A { display: block; width:100%; padding:5px 0;}
#IkariamManager TABLE.Overview TD.details A:hover { background:#fff; }

#IkariamManager TABLE.Overview TH.lf,
	#IkariamManager TABLE.Overview TD.lf { border-left: 1px solid #CB9B6A; }
#IkariamManager TABLE.Overview TFOOT { background-color: #EADAB6; }

#IkariamManager TABLE.Buildings TH.build_name0,
	#IkariamManager TABLE.Buildings TH.build_name1,
	#IkariamManager TABLE.Buildings TH.build_name2,
	#IkariamManager TABLE.Buildings TH.build_name3,
	#IkariamManager TABLE.Buildings TH.build_name4,
	#IkariamManager TABLE.Buildings TH.build_name5,
	#IkariamManager TABLE.Buildings TH.build_name6 { max-width: 30px; overflow: hidden; cursor: default; padding:0;}
#IkariamManager TABLE.Buildings TH.build_name2 { max-width: 50px; }
#IkariamManager TABLE.Buildings TH.build_name3 { max-width: 65px; }
#IkariamManager TABLE.Buildings TH.build_name4 { max-width: 80px; }
#IkariamManager TABLE.Buildings TH.build_name5 { max-width: 95px; }
#IkariamManager TABLE.Buildings TH.build_name6 { max-width: 110px; }
#IkariamManager TABLE.Buildings TH.build_name7 { max-width: 125px; }
#IkariamManager TABLE.Army TH.unit_name { min-width: 16px; overflow: hidden; cursor: default; text-align:center !important; padding:2px 0; }
#IkariamManager TABLE.Army TH.unit_name A { width:auto; margin:0; padding:0; display: block; text-align:center; }
#IkariamManager TABLE.Army TH.upkeep { min-width: 20px; overflow: hidden; cursor: default; }
#IkariamManager TABLE.Army TD.details { text-align:center; padding:4px 0px; }
#IkariamManager TABLE.Army TD.details .count { color:#552205; padding:1px 0; font-size:13px; }
#IkariamManager TABLE.Army TD.details.no_units { }
#IkariamManager TABLE.Army TR.current TD.details.no_units { }

/* Ovo su neke glupe klase to bi trebalo promeniti */
#IkariamManager .More { font-size: 10px; line-height: 10px !important; margin:1px 0; clear: both; display: block; cursor: default; }
#IkariamManager .More { margin-top: 1px;}
#IkariamManager TBODY .More { color: #ab7b4a;}
#IkariamManager .extraInfo { color: #aB7B4A; font-size:10px; line-height:10px; }

/****************** progress bar styles *******************/
#IkariamManager TABLE.Overview TABLE.myPercent { height: 5px !important; width: 100%; background-color: transparent !important; margin:0; padding:0; border:0; }
#IkariamManager TABLE.Overview TABLE.myPercent td { height: 5px !important; border: 0; min-width: 0px !important; padding: 0 !important; background-color: #fff; /*EDE1C4*/ /* border:1px solid #EDE1C4; */ }
#IkariamManager TABLE.Overview TABLE.myPercent TD.Normal { background-color: #73443E;}
#IkariamManager TABLE.Overview TABLE.myPercent TD.Safe { background-color: #90C090; }
#IkariamManager TABLE.Overview TABLE.myPercent TD.Warning { background-color: #8F1D1A;}
#IkariamManager TABLE.Overview TABLE.myPercent TD.AlmostFull { background-color: #B42521;}
#IkariamManager TABLE.Overview TABLE.myPercent TD.Full { background-color: #ff0000;}

#IkariamManager p {text-align: left; display: block; width: 100% !important; }
#IkariamManager p.Caption { font-size: 0.9em; padding:0.5em 0; margin:0; }

/****************** alerts *******************/
#IkariamManager sup { vertical-align: top !important; font-size: 10px; line-height: 10px; height: 10px; }
#IkariamManager sup.attention { padding:0 2px; background:#ffff00;}
#IkariamManager .Selected { background:#ffee00; color:#000 !important; font-size:1.2em;}
#IkariamManager .Bold,
	#IkariamManager .Brown,
	#IkariamManager .DarkRed,
	#IkariamManager .Red { font-weight: bold; }
#IkariamManager .requireAttention { background:#ffcc00; padding:1px; border:1px solid #cc9900; }
#IkariamManager .Green { color: green !important;}
#IkariamManager .Brown { color: #8F1D1A !important;}
#IkariamManager .DarkRed { color: #CC3300 !important;}
#IkariamManager .Red { color: red !important; font-weight: bold; }
#IkariamManager .wonder_activated { background:#FFC0C0; }
#IkariamManager .wonder_cooldown { background:#b0d0ff; }

#IkariamManagerSettings {}
#IkariamManagerSettings td {border: none !important; }
#IkariamManagerSettings input.button {margin-right: 5px;}

#IkariamManagerAddons { float: left; text-align: left;}
#IkariamManagerAddons u { font-weight: bold; }
#IkariamManagerAddons li { list-style-type: disc; list-style-position: inside; padding-left: 15px; }

#IkariamManager p.Footer {text-align: right; clear: both;}
#IkariamManager p.Footer .button {}

#IkariamManager.RtoL p.Footer {text-align: left;}
#IkariamManager.RtoL TABLE.Overview TD.city_name { text-align: right; }
#IkariamManager.RtoL TABLE.Overview TH.lf,
	#IkariamManager.RtoL TABLE.Overview TD.lf { border-left: 0; }
#IkariamManager.RtoL p {text-align: right;}

div#IkariamManagerTooltip { position:absolute; z-index: 2000; }
div#WzTtDiV, div#IkariamManagerTooltip { box-shadow: 0 0 10px rgba(0,0,0,0.3); -webkit-box-shadow: 0 0 10px rgba(0,0,0,0.3); }

.TTContent {padding: 10px; background-color: #FDF7DD; border-color: #BE8D53; border-width: 1px; border-top-width: 4px; border-style: solid; color: #542C0F;}
.TTTitle { font-weight: bold; border-bottom: 1px solid #BE8D53; padding: 3px; margin: -3px; margin-bottom:4px;}
.TTContent table tbody { border-bottom-width: 3px; border-bottom-color: #FDF7DD;border-bottom-style: solid;}
.TTContent table tfoot { }
.TTContent table td {padding: 2px; height: auto !important;}
.TTContent table .Small td { padding-top: 0px; font-size: 10px !important; line-height: 10px !important; }
.TTContent table TD.Mission img { max-height: 15px;}

#IkariamManager #OtherCities { text-align:left !important; display:block; padding:5px 10px; margin:5px auto; width:97%; text-align: left; display: block; }
#IkariamManager H1 { font-size:1.2em; font-weight: bold; color:#784528; padding:0; text-align: left; display: block; }
#IkariamManager .otherCity { margin:5px; display:block; float:left; border:1px solid #a0a0a0; background:#fDf1d4; min-width:280px; box-shadow: 0 0 5px rgba(0,0,0,0.3);}
#IkariamManager .otherCity.hidden { display:none; }
#IkariamManager .otherCity .cityTitle { background:#fff; display: block; padding:5px; }
#IkariamManager .otherCity .cityTitle A { font-weight: bold; }
#IkariamManager .otherCity .deployedUnits { display: block; margin:5px 0; padding:0 5px; min-height:40px;}
#IkariamManager .otherCity IMG { max-height:16px; }
#IkariamManager .otherCity.Occupied { border:1px solid #faa; background:#FFe6e6; }
#IkariamManager .otherCity.Deployed { border:1px solid #fff; }
#IkariamManager .otherCity.Occupied .cityTitle { background:#ffe0e0; }
#IkariamManager .otherCity.Deployed .cityTitle { background:#ddffdd; }

#IkariamManager .upgradeInProgress { background:#EDE1C4; font-weight:bold; }
#IkariamManager .unitThumb		{ max-width: 40px; max-height: 40px; }
#IkariamManager .buildingName	{ padding:5px 0; display: block; width:100%; overflow: hidden; }
#IkariamManager .goldUpkeep		{ background: #eCe9aB; color:#7C760B; padding:0px 4px; }
#IkariamManager .linkToMap		{ display: inline-block; width:36px; text-align: center; font-family: arial,sans-serif; }
#IkariamManager .linkToResource	{ display: inline-block; width:22px; height:16px; overflow:hidden; text-align: right; margin:0 2px; vertical-align: middle; }
#IkariamManager .linkToResource	IMG { border:0; }

#IkariamManager .linkToTransportGoods	{ display: inline-block; width:28px; vertical-align: middle; text-align: center; margin-right:5px; }
#IkariamManager .linkToTransportGoods IMG { max-width:22px; max-height:16px; }
#IkariamManager .linkToView				{ display: inline-block; width:22px; vertical-align: middle; text-align: center; margin-right:5px; }
#IkariamManager .linkToView IMG			{ max-width:24px; max-height:24px; }
#IkariamManager .linkToDeploy			{ display: inline-block; width:35px; vertical-align: middle; text-align: center; margin-right:5px; }
#IkariamManager .linkToDeploy IMG		{ max-width:22px; max-height:16px; }
#IkariamManager .theCityName			{ display:inline-block; padding:0 3px; }
#IkariamManager .actionPoints			{ font-family: consolas, monospace; border-left:1px solid #a0a0a0; padding:0 3px; }
#IkariamManager .cityFreeSpace			{ font-family: consolas, monospace; border-left:1px solid #a0a0a0; padding:0 3px; }
#IkariamManager A.iconTrim		{ vertical-align: middle; }
#IkariamManager TABLE.Overview td A.iconTrim IMG	{ align:center; vertical-align:middle; max-width:24px; max-height:24px; }

#IkariamManager .moveIcon { display:inline-block; width:35px; height:33px; overflow:hidden; border-radius:5px; border:1px solid #C6B095; }
#IkariamManager .moveIcon.army { background:url(skin/actions/move_army.gif) center center no-repeat;}
#IkariamManager .moveIcon.fleet { background:url(skin/actions/move_fleet.gif) center center no-repeat;}

.unitIcon { display:inline-block; width:35px; height:35px; }
.unitIcon.Navy { background:url(skin/characters/fleet/unitfleets_x34_y34.gif) 0 0 no-repeat; }
.unitIcon.Army { background:url(skin/characters/military/unitsprites_x34_y35.gif) 0 0 no-repeat; }
.unitIcon.Army.phalanx { background-position:-72px 0; }
.unitIcon.Army.steamgiant { background-position:-252px 0; }
.unitIcon.Army.spearman { background-position:-541px 0; }
.unitIcon.Army.swordsman { background-position:-36px 0; }
.unitIcon.Army.slinger { background-position:0 0; }
.unitIcon.Army.archer { background-position:-108px 0; }
.unitIcon.Army.marksman { background-position:-144px 0; }
.unitIcon.Army.ram { background-position:-431px 0; }
.unitIcon.Army.catapult { background-position:-360px 0; }
.unitIcon.Army.mortar { background-position:-396px 0; }
.unitIcon.Army.gyrocopter { background-position:-288px 0; }
.unitIcon.Army.bombardier { background-position:-325px 0; }
.unitIcon.Army.cook { background-position:-216px 0; }
.unitIcon.Army.medic { background-position:-181px 0; }
.unitIcon.Army.wall { background-position:-468px 0; }
.unitIcon.Army.barbarian { background-position:-504px 0; }
.unitIcon.Army.spy { background-position:-577px 0; }

.unitIcon.Navy { background:url(skin/characters/fleet/unitfleets_x34_y34.gif) 0 0 no-repeat; }
.unitIcon.Navy.ship { background-position:0 0; }
.unitIcon.Navy.ship_ram { background-position:-36px 0; }
.unitIcon.Navy.ship_flamethrower { background-position:-108px 0; }
.unitIcon.Navy.ship_steamboat { background-position:-180px 0; }
.unitIcon.Navy.ship_ballista { background-position:-72px 0; }
.unitIcon.Navy.ship_catapult { background-position:-144px 0; }
.unitIcon.Navy.ship_mortar { background-position:-216px 0; }
.unitIcon.Navy.ship_submarine { background-position:-252px 0; }
.unitIcon.Navy.ship_tender { background-position:-288px 0; }
.unitIcon.Navy.ship_ballooncarrier { background-position:-324px 0; }
.unitIcon.Navy.ship_rocketship { background-position:-396px 0; }
.unitIcon.Navy.ship_paddlespeedship { background-position:-360px 0; }

.unitIcon.Army.Large { width:48px; height:48px; background:url(skin/characters/military/buttons_sprite.gif) 0 0 no-repeat; border-radius:7px; }
.unitIcon.Army.Large.phalanx { background-position:-100px 0; }
.unitIcon.Army.Large.steamgiant { background-position:-350px 0; }
.unitIcon.Army.Large.spearman { background-position:-750px 0; }
.unitIcon.Army.Large.swordsman { background-position:-50px 0; }
.unitIcon.Army.Large.slinger { background-position:0 0; }
.unitIcon.Army.Large.archer { background-position:-150px 0; }
.unitIcon.Army.Large.marksman { background-position:-200px 0; }
.unitIcon.Army.Large.ram { background-position:-600px 0; }
.unitIcon.Army.Large.catapult { background-position:-500px 0; }
.unitIcon.Army.Large.mortar { background-position:-550px 0; }
.unitIcon.Army.Large.gyrocopter { background-position:-400px 0; }
.unitIcon.Army.Large.bombardier { background-position:-450px 0; }
.unitIcon.Army.Large.cook { background-position:-300px 0; }
.unitIcon.Army.Large.medic { background-position:-250px 0; }

.unitIcon.Army.Large.wall { background-position:-650px 0; }
.unitIcon.Army.Large.barbarian { background-position:-700px 0; }
.unitIcon.Army.Large.spy { background-position:-800px 0; }

.unitIcon.Navy.Large { width:48px; height:48px; background:url(skin/characters/fleet/buttons_sprite.gif) 0 0 no-repeat; border-radius:7px; }
.unitIcon.Navy.Large.ship_ram { background-position:-50px 0; }
.unitIcon.Navy.Large.ship_flamethrower { background-position:-150px 0; }
.unitIcon.Navy.Large.ship_steamboat { background-position:-250px 0; }
.unitIcon.Navy.Large.ship_ballista { background-position:-100px 0; }
.unitIcon.Navy.Large.ship_catapult { background-position:-200px 0; }
.unitIcon.Navy.Large.ship_mortar { background-position:-300px 0; }
.unitIcon.Navy.Large.ship_submarine { background-position:-350px 0; }
.unitIcon.Navy.Large.ship_tender { background-position:-400px 0; }
.unitIcon.Navy.Large.ship_ballooncarrier { background-position:-450px 0; }
.unitIcon.Navy.Large.ship_rocketship { background-position:-550px 0; }
.unitIcon.Navy.Large.ship_paddlespeedship { background-position:-500px 0; }

#IkariamManager .dimmed { opacity:0.8; }
#IkariamManager .dimmed7 { opacity:0.7; }
#IkariamManager .dimmed5 { opacity:0.5; }
#IkariamManager .clickable { cursor: pointer; }
#IkariamManager .pad { padding:5px; }
#IkariamManager .pad2 { padding:10px; }
#IkariamManager .cright { clear:right; }
#IkariamManager .cleft { clear:left; }
#IkariamManager .cboth { clear:both; }
#IkariamManager .aright { text-align:right; }
#IkariamManager .aleft { text-align:left;}
#IkariamManager .fright { float:right; padding:0 5px; display: inline-block; }
#IkariamManager .fleft { float:left; padding:0 5px; display: inline-block; }

#IkariamManager .resProduction { float:left; font-size:0.9em; padding:2px 0; padding-right: 2px; display: inline-block; width:45px; text-align:right; }
#IkariamManager .resProduction.alt { float:right; border:0; }
#IkariamManager .safeRes,
	#IkariamManager .notSafeRes  { padding-right:4px; }

#IkariamManager TBODY TD .safeRes { border-right: 4px solid #90C090; }
#IkariamManager TBODY TD .notSafeRes { border-right: 4px solid #C09090; }
#IkariamManager TBODY TD .closeEmpty { color: #ff0000 !important; font-weight: bold; border-right: 4px solid #CC3300; }
#IkariamManager TBODY TD .almostEmpty { color: #ff0000 !important; font-weight: bold; border-right: 4px solid #FF0000; }
#IkariamManager TBODY TD .closeFull { border-right: 4px solid #CC3300; }
#IkariamManager TBODY TD .almostFull { border-right: 4px solid #FF0000; }

#IkariamManager TD .outerInfo { display: none; position:absolute; z-index:11; padding:0; margin-left:120px; margin-top:-14px; background:#FDF7DD; border:1px solid #BE8D53; box-shadow:0 0 10px rgba(0,0,0,0.5); }
#IkariamManager TD .myttip { visibility:hidden; position:absolute; z-index:11; padding:0; margin-left:0; margin-top:30px; background:#FDF7DD; padding:10px; border:1px solid #BE8D53; box-shadow:0 0 10px rgba(0,0,0,0.5); }
#IkariamManager TD .myttip H6 { font-weight:bold; border-bottom:1px solid #BE8D53; color:#4D290C; padding-bottom:5px; margin-bottom:5px; }
#IkariamManager TD:hover .myttip { visibility:visible; }

#IkariamManager TABLE.Overview.Buildings TD .outerInfo,
	#IkariamManager TABLE.Overview.Army TD .outerInfo { margin-top:-8px;  }
#IkariamManager TD .outerInfo .theCityName { margin-right:5px; font-size:15px; font-weight:normal; color:#532C0F; }
#IkariamManager TD .outerInfo .cityFreeSpace { margin-right:5px;  }
#IkariamManager TABLE.Overview TD.city_name:hover { background:#FDF7DD; }
#IkariamManager TABLE.Overview TD.city_name:hover .outerInfo { display: block; }
#IkariamManager TD .outerInfo UL { list-style-type: none; margin:0; padding:0; }
#IkariamManager TD .outerInfo UL LI { margin:0; padding:5px; vertical-align: middle; }
#IkariamManager TD .outerInfo UL LI:first-child { background:#FAEAC6; border-bottom:1px solid #BE8D53; font-size:13px; }
#IkariamManager TD .outerInfo CITE { display: inline-block; width:40px; }
#IkariamManager TD .outerInfo .linkToMap { width:auto; color:auto; font-size:1em; padding:0 5px; }

#IkariamManager TABLE.Army TH.unit_name .linkToView { margin:0; padding:0; min-width:auto; width:auto; display:block; }
#IkariamManager TD .linksToDeploy .linkToView		{ width:32px; }
#IkariamManager TD .linksToDeploy .linkToView IMG	{ max-width:32px; max-height:32px; margin-right:5px; }
#IkariamManager TD .linksToDeploy .linkToTransportGoods	{ width:36px; }
#IkariamManager TD .linksToDeploy .linkToTransportGoods IMG { max-width:36px; max-height:36px; margin-right:5px; }

#IkariamManager TD .outerInfo .unitIcon 			{ vertical-align:top; }
#IkariamManager TD .outerInfo .linkToView			{ width:35px; margin-right:10px; vertical-align:top; }
#IkariamManager TD .outerInfo .linkToView IMG		{ max-width:35px; max-height:35px; }
#IkariamManager TD .outerInfo .linkToDeploy			{ width:35px; height:35px; margin-right:10px; vertical-align:top; }
#IkariamManager TD .outerInfo .linkToDeploy	.moveIcon	{ width:35px; height:33px; }
#IkariamManager TD .outerInfo .linkToTransportGoods		{ width:35px; height:35px; margin:0; margin-right:7px; vertical-align:top; }
#IkariamManager TD .outerInfo .linkToTransportGoods	IMG	{ max-width:35px; max-height:35px; }
#IkariamManager TD .outerInfo .linkToResource { width:23px; height:18px; }
#IkariamManager TD .outerInfo .linkToResource IMG	{ width:23px; height:18px; }

#IkariamManager TR.current TD.Selected A.changeCity {background:#784528; color:#fff; }
.IkariamManagerToggle { display: inline-block; padding:1px 5px; }

.unitIcon.Army ABBR,
	.unitIcon.Navy ABBR,
	.unitIcon.Army.Large ABBR,
	.navyUnitButtons ABBR { padding:0 2px; font-weight: bold; color:#000; float:right; display:inline-block; background:#fff; opacity:0.7; }

#IMCityId 	{ position:fixed; z-index:99; top:0; left:0; margin:0; padding:5px; font-size:24px; color:#fff; line-height:100%; text-shadow:0 0 3px #000; opacity:0.6;}
#IMCityId.related	{ color:#000; text-shadow:0 0 3px #fff; }
#IMServerId { position:fixed; z-index:99; top:0; right:0; margin:0; padding:0; font-size:32px; color:#fff; line-height:100%; text-shadow:0 0 3px #000; opacity:0.6;}
#IMServerId SPAN { font-size:12px; opacity:0.3; display:inline-block; padding:2px 3px; vertical-align:middle; }

#IMSettings { position: fixed; top: 180px; width: 100%; margin:0 auto; text-align: center; z-index:99; /*display:none; */}
#IMSettings .container { width: 500px; margin:0 auto; text-align:left; background:#FDF7DD; border:1px solid #BE8D53; box-shadow:0 0 10px rgba(0,0,0,0.5); }
#IMSettings .container .closeButton { float:right; padding:10px; color:#fff; }
#IMSettings .container H4 { text-align:center; background: #BE8D53; color:#fff; font-size:1.4em; padding:10px; }
#IMSettings .container P { text-align:center; padding:10px; }
#IMSettings .container UL { list-style-type: none; margin:0; padding:10px; clear:both; }
#IMSettings .container UL LI { margin:0; padding:7px 5px; border-bottom: 1px solid #BE8D53; }
#IMSettings .container UL LI.title { text-align:center;}
#IMSettings .container UL LI A { font-weight: bold; display: inline-block; }
#IMSettings .container UL LI SPAN { display:inline-block; width:200px; text-align:right; margin-right:5px; }

]]></>.toXMLString();

			GM_addStyle(default_style);
		},

		/**
		* Additional styles for buildings
		*/
		set_extra_styles : function()
		{
			if (IKM.move_friends)
			{
//				GM_addStyle("#friends { position: fixed; top:50px; left:auto; right:5px; }");
				if (!IM.preference ('advancedMode', true))
				{
					GM_addStyle (".advanced { display: none; }");
				}
				GM_addStyle("#friends { top:200px; margin-left:40px; }");
			}
		}
	},

/* End of IM.DB object */

	Text :
	{
		load : function ()
		{
			if (language == "rs") // serbian translation, by bluesman
			{
				langtype = '';
				buildings =
				{
					"townHall"		: ["Градска кућа",	"Град"],
					"temple"		: ["Храм", 			"Храм"],
					"academy"		: ["Академија",		"Академија"],
					"port"			: ["Трговачка Лука","Лука"],
					"shipyard"		: ["Бродоградилиште","Бродоградилиште"],
					"warehouse"		: ["Складиште", 	"Складиште"],
					"dump"			: ["Депо", 			"Депо"],
					"wall"			: ["Градски зид", 	"Зид"],
					"tavern"		: ["Крчма", 		"Крчма"],
					"museum"		: ["Музеј", 		"Музеј"],
					"palace"		: ["Палата", 		"Палата"],
					"palaceColony"	: ["Гувернерова резиденција", "Резиденција"],
					"embassy"		: ["Амбасада", 		"Амбасада"],
					"branchOffice"	: ["Трговина", 		"Трговина"],
					"safehouse"		: ["Скровиште", 	"Скровиште"],
					"barracks"		: ["Касарна", 		"Касарна"],
					"workshop"		: ["Радионица", 	"Радионица"],
					"carpentering"	: ["Тесар", 		"Тесар"],
					"forester"		: ["Шумар", 		"Шумар"],
					"stonemason"	: ["Зидар", 		"Зидар"],
					"glassblowing"	: ["Стаклара",		"Стаклар"],
					"winegrower"	: ["Виноградар",	"Винар"],
					"alchemist"		: ["Алхемичар",		"Алхемичар"],
					"architect"		: ["Архитекта",		"Архитекта"],
					"optician"		: ["Оптичар",		"Оптичар"],
					"vineyard"		: ["Винска Преса",	"Преса"],
					"fireworker"	: ["Пиротехничар",	"Пиротехничар"]
				};

				texts =
				{
					'cfg' : {
						'fixedWidth' : 'Фиксна ширина табела',
						'advancedMode' : 'Напредни преглед (више детаља)',
						'militaryIcons' : 'Војне иконице',
						'otherCities': 'Остали градови',
						'occupied'	 : 'окупирано',
						'deployed'	 : 'размештај',
						'resources'	 : 'ресурси',
						'production' : 'производња',
						'reset' 	 : 'Ресет',
						'reset_data' : 'Ресетовање свих података',
						'left'		 : 'лево',
						'right'		 : 'десно',
						'icons'		 : 'иконице',
						'large'		 : 'велике',
						'small'		 : 'мале',
						'toggle'	 : 'склони/прикажи',
						'show'		 : 'прикажи',
						'hide'		 : 'склони',
						'on'		 : 'укључено',
						'off'		 : 'искључено',
						'city'	 	 : 'град',
						'from'	 	 : ' из ',
						'to'	 	 : ' у ',

						'transport_goods'  	: 'Пребаците ресурсе ',
						'deploy_army'  		: 'Преместите војску ',
						'deploy_fleet'  	: 'Преместите флоту ',
						'transport_from'	: 'Транспортујте ресурсе из [from] у [to]',
						'transports' 		: '0 транспорт(а) на путу',
						'movements'	 		: '0 покрет(а) јединица',
						'under_attacks'	 	: '0 напад(a) у току',
					},

					'army'				: 'војска',
					'navy'				: 'флота',
					'units'				: 'јединица',
					'generals'			: 'генерали',
					'storage'			: ' Складиште',
					'total_capacity'	: ' укупан капацитет',
					'safe_capacity'		: ' заштићено од крађе',
					'not_safe'			: ' незаштићено од крађе',
					'filled'			: ' попуњено',
					'toFull'			: ' до максимума',
					'toEmpty'			: ' до краја залиха',
					'availAP'			: ' слободни акциони поени',
					'availFS'			: ' слободна места за изградњу',
					'requireAtt'		: ' захтева да отворите преглед због ажурирање података',
					'resDelivered'		: ' неки ресурси испоручени',
					'resSafe'			: ' ресурси безбедни од пљачке',
					'transport'			: ' транспорт(a) на путу',

					'setShotRes'		: 'Ресурси',
					'setShowBuilding'	: 'Зграде',
					'setShowArmy'		: 'Војска и бродови',
					'setProggress'		: 'Прикажи прогрес:',
					'setProgressOff'	: 'не приказуј',
					'setProgressTime'	: 'преостало време',
					'setProgressPercent': 'проценат завршено',
					'setLanguage' 		: 'Језик:',
					'setLanguageAuto' 	: 'Аутоматски',

					'Upkeep'			: 'Одржавање',
					'cityName' 			: 'Име града',
					'currentlyBuilding' : 'Надограђује се',
					'summary' 			: 'Укупно:',
					'hide_settings' 	: 'Склони подешавања',
					'show_settings' 	: 'Подешавања',
					'Population' 		: 'Популација',
					'Research'			: 'Истраживање',
					'finishedBuilding'	: 'Завршена зграда',
					'Incomes' 			: 'Приходи',
					'Trading' 			: 'Трговина',
					'wood' 				: 'Дрво',
					'wine' 				: 'Вино',
					'marble' 			: 'Мермер',
					'crystal' 			: 'Кристал',
					'sulfur' 			: 'Сумпор'
				};
			}
			else if (language == "de") //german translation, thanks to Schneppi & xkaaay
			{
				langtype = '';
				buildings = { "townHall" : ["Rathaus", "Rathaus"], "temple" : ["Temple", "Temple"], "academy" : ["Academie", "Academie"], "port" : ["Handelshafen", "Handelshafen"], "shipyard" : ["Schiffswerft", "Schiffswerft"], "warehouse" : ["Lagerhaus", "Lagerhaus"], "dump" : ["Dump", "Dump"], "wall" : ["Stadtmauer", "Stadtmauer"], "tavern" : ["Taverne", "Taverne"], "museum" : ["Museum", "Museum"], "palace" : ["Palast", "Palast"], "palaceColony" : ["Statthaltersitz", "Statthaltersitz"], "embassy" : ["Botschaft", "Botschaft"], "branchOffice" : ["Kontor", "Kontor"], "safehouse" : ["Versteck", "Versteck"], "barracks" : ["Kaserne", "Kaserne"], "workshop" : ["Erfinderwerkstatt", "Erfinderwerkstatt"], "carpentering" : ["Zimmerei", "Zimmerei"], "forester" : ["Forsthaus", "Forsthaus"], "stonemason" : ["Steinmetz", "Steinmetz"], "glassblowing" : ["Glasbläserei", "Glasbläserei"], "winegrower" : ["Winzerei", "Winzerei"], "alchemist" : ["Alchimistenturm", "Alchimistenturm"], "architect" : ["Architekturbüro", "Architekturbüro"], "optician" : ["Optiker", "Optiker"], "vineyard" : ["Kelterei", "Kelterei"], "fireworker" : ["Feuerwerksplatz", "Feuerwerksplatz"] };
				texts = { "Upkeep" : "Upkeep", "cityName" : "Stadtname", "currentlyBuilding" : "Zur Zeit im Bau", "summary" : "Gesamt:", "hide_settings" : "Verstecke Optionen", "show_settings" : "Zeige Optionen", "Population" : "Bevölkerung", "Research": "Research", "finishedBuilding" : "Bau abgeschlossen", "Incomes" : "Einkommen", "Trading" : "Handel", 'wood' : "Baumaterial", 'wine' : "Wein", 'marble' : "Marmor", 'crystal' : "Kristallglas", 'sulfur' : "Schwefel" };
			}
			else if (language == 'sl') //Slovenian translation, thanks to Americano, MazaM
			{
				langtype = '';
				buildings = { 'townHall' : ['Mestna hiša', 'Mestna hiša'], 'temple' : ['Tempelj', 'Tempelj'], 'academy' : ['Akademija', 'Akademija'], 'port' : ['Trgovska luka', 'Trgovska luka'], 'shipyard' : ['Ladjedelnica', 'Ladjedelnica'], 'warehouse' : ['Skladišče', 'Skladišče'], 'dump' : ['Dump', 'Dump'], 'wall' : ['Obzidje', 'Obzidje'], 'tavern' : ['Krčma', 'Krčma'], 'museum' : ['Muzej', 'Muzej'], 'palace' : ['Palača', 'Palača'], 'palaceColony' : ['Guvernerjeva rezidenca', 'Guvernerjeva rezidenca'], 'embassy' : ['Ambasada', 'Ambasada'], 'branchOffice' : ['Tržnica', 'Tržnica'], 'safehouse' : ['Skrivališče', 'Skrivališče'], 'barracks' : ['Barake', 'Barake'], 'workshop' : ['Delavnica', 'Delavnica'], 'carpentering' : ['Tesar', 'Tesar'], 'forester' : ['Gozdar', 'Gozdar'], 'stonemason' : ['Kamnoseška delavnica', 'Kamnoseška delavnica'], 'glassblowing' : ['Steklopihač', 'Steklopihač'], 'winegrower' : ['Vinogradnik', 'Vinogradnik'], 'alchemist' : ['Stolp alkimista', 'Stolp alkimista'], 'architect' : ['Pisarna arhitekta', 'Pisarna arhitekta'], 'optician' : ['Optika', 'Optika'], 'vineyard' : ['Vinska preša', 'Vinska preša'], 'fireworker' : ['Testno območje ognjemetov', 'Testno območje ognjemetov'] };
				texts = { 'Upkeep' :'Upkeep', 'cityName' : 'Ime mesta', 'currentlyBuilding' : 'Se nadgrajuje', 'summary' : 'Skupno:', 'hide_settings' : 'Skrij nastavitve', 'show_settings' : 'Pokaži nastavitve', 'Population' : 'Prebivalstvo', 'Research': 'Raziskave', 'finishedBuilding' : 'Zgradba končana', 'Incomes' : 'Prihodki mesta', 'Trading' : 'Trgovanje', 'wood' : 'Gradbeni material', 'wine' : 'Vino', 'marble' : 'Marmor', 'crystal' : 'Kristal', 'sulfur' : 'Žveplo' };
			}
			else if (language == 'se') // thank Dinfur
			{
				langtype = ''; // Set 'lf' for Rigth-to-Left languages, or leave blank
				buildings = { 'townHall' : ['Rådhus', 'Rådhus'], 'temple' : ['Temple', 'Temple'], 'academy' : ['Akademi', 'Akademi'], 'port' : ['Handelshamn', 'Hamn'], 'shipyard' : ['Skeppsvarv', 'Varv'], 'warehouse' : ['Lagerlokal', 'Lager'], 'dump' : ['Dump', 'Dump'], 'wall' : ['Stadsmur', 'Mur'], 'tavern' : ['Taverna', 'Taverna'], 'museum' : ['Museum', 'Museum'], 'palace' : ['Palats', 'Palats'], 'palaceColony' : ['Guvernörsresidens', 'Guvernör'], 'embassy' : ['Ambassad', 'Ambassad'], 'branchOffice' : ['Handelsstation', 'Handel'], 'safehouse' : ['Gömställe', 'Gömställe'], 'barracks' : ['Kasern', 'Kasern'], 'workshop' : ['Verkstad', 'Verkstad'], 'carpentering' : ['Snickare', 'Snickare'], 'forester' : ['Skogsvaktare', 'Skog'], 'stonemason' : ['Stenhuggare', 'Sten'], 'glassblowing' : ['Glasblåsare', 'Glas'], 'winegrower' : ['Vinodlare', 'Vin'], 'alchemist' : ['Alkemist', 'Alkemist'], 'architect' : ['Arkitekt', 'Arkitekt'], 'optician' : ['Optiker', 'Optiker'], 'vineyard' : ['Vinpress', 'Vin'], 'fireworker' : ['Fyrverkerifabrik', 'Fyrverk.'] };
				texts = { 'Upkeep' :'Upkeep', 'cityName': 'Stadsnamn', 'currentlyBuilding': 'Bygger nu', 'summary': 'Summering:', 'hide_settings': 'Göm inställningar', 'show_settings': 'Visa inställningar', 'Population': 'Befolkning', 'Research': 'Research', 'finishedBuilding': 'Byggt klart','Incomes':'Inkomster','Trading':'Handlar', 'wood': 'Trä', 'wine': 'Vin', 'marble': 'Marmor', 'crystal': 'Kristall', 'sulfur': 'Svavel' };
			}
			else if (language == 'fi') //Finnish translation by DeFe
			{
				langtype = '';
				buildings = { 'townHall' : ['Kaupungintalo', 'K. Talo'], 'temple' : ['Temple', 'Temple'], 'academy' : ['Akatemia', 'Akatemia'], 'port' : ['Kauppasatama', 'Satama'], 'shipyard' : ['Telakka', 'Telakka'], 'warehouse' : ['Varasto', 'Varasto'], 'dump' : ['Dump', 'Dump'], 'wall' : ['Muuri', 'Muuri'], 'tavern' : ['Taverna', 'Taverna'], 'museum' : ['Museo', 'Museo'], 'palace' : ['Palatsi', 'Palatsi'], 'palaceColony' : ['Kuvernöörin asunto', 'Kuvernööri'], 'embassy' : ['Lähetystö', 'Lähetystö'], 'branchOffice' : ['Kauppapaikka', 'Kauppapaikka'], 'safehouse' : ['Piilopaikka', 'Piilopaikka'], 'barracks' : ['Kasarmi', 'Kasarmi'], 'workshop' : ['Paja', 'Paja'], 'carpentering' : ['Puusepän Paja', 'Puuseppä'], 'forester' : ['Metsänhoitaja', 'Metsänhoitaja'], 'stonemason' : ['Kivenhakkaaja', 'Kivenhakkaaja'], 'glassblowing' : ['Lasinpuhaltaja', 'Lasinpuhaltaja'], 'winegrower' : ['Viinitarhuri', 'Viinitarhuri'], 'alchemist' : ['Alkemistin Torni', 'Alkemisti'], 'architect' : ['Arkkitehdin Toimisto', 'Arkkitehti'], 'optician' : ['Optikko', 'Optikko'], 'vineyard' : ['Viinipaino', 'Viinipaino'], 'fireworker' : ['Ilotulite Testialue', 'Testialue'] };
				texts = { 'Upkeep' :'Upkeep', 'cityName': 'Kaupungin nimi', 'currentlyBuilding': 'Rakentumassa', 'summary': 'Yhteenveto:', 'hide_settings': 'Piilota asetukset', 'show_settings': 'Näytä asetukset', 'Population': 'Populaatio', 'Research': 'Research', 'finishedBuilding': 'Rakennus valmis','Incomes':'Tulot','Trading':'kaupankäynti', 'wood': 'Puu', 'wine': 'Viini', 'marble': 'Marmori', 'crystal': 'Kristalli', 'sulfur': 'Rikki' };
			}
			else if (language == 'tw') //traditional chinese translation by Whiskers
			{
				langtype = '';
				buildings = { "townHall" : ["市政府", "市府"], "temple" : ["祭祀神殿", "神殿"], "academy" : ["學院", "學院"], "port" : ["港口", "港口"], "shipyard" : ["船塢", "船塢"], "warehouse" : ["倉庫", "倉庫"], "dump": ["Dump", "Dump"], "wall" : ["城牆", "城牆"], "tavern" : ["酒館", "酒館"], "museum" : ["博物館", "博物"], "palace" : ["皇宫", "皇宫"], "palaceColony" : ["總督府", "總督"], "embassy" : ["大使館", "使館"], "branchOffice" : ["市場", "市場"], "safehouse" : ["間諜小屋", "間諜"], "barracks" : ["兵營", "兵營"], "workshop" : ["兵工廠", "兵廠"], "carpentering" : ["木匠屋", "木－"], "forester" : ["林務官宅", "木＋"], "stonemason" : ["石匠屋", "石＋"], "glassblowing" : ["玻璃吹制廠", "晶＋"], "winegrower" : ["葡萄樹園", "葡＋"], "alchemist" : ["煉金塔", "硫＋"], "architect" : ["建築公署", "石－"], "optician" : ["配鏡商館", "晶－"], "vineyard" : ["藏酒窖", "葡－"], "fireworker" : ["煙火測試區域", "硫－"] };
				texts = { "Upkeep":"Upkeep", "cityName": "城鎮", "currentlyBuilding": "正在建造", "summary": "總計:", "hide_settings": "隐藏設定", "show_settings": "顯示設定", "Population": "人口", "Research": "Research", "finishedBuilding": "建造完成","Incomes":"收入","Trading":"交易", 'wood': "木材", 'wine': "葡萄", 'marble': "大理石", 'crystal': "水晶", 'sulfur': "硫磺" };
			}
			else if (language == "cn") //chinese translation, thank Alphasong
			{
				langtype = '';
				buildings = { "townHall" : ["市政厅", "市政厅"], "temple" : ["Temple", "Temple"], "academy" : ["学院", "学院"], "port" : ["港口", "港口"], "shipyard" : ["船坞", "船坞"], "warehouse" : ["仓库", "仓库"], "dump" : ["Dump", "Dump"], "wall" : ["城墙", "城墙"], "tavern" : ["酒馆", "酒馆"], "museum" : ["博物馆", "博物馆"], "palace" : ["皇宫", "皇宫"], "palaceColony" : ["总督府", "总督府"], "embassy" : ["使馆", "使馆"], "branchOffice" : ["市场", "市场"], "safehouse" : ["藏身处", "藏身处"], "barracks" : ["兵营", "兵营"], "workshop" : ["兵工厂", "兵工厂"], "carpentering" : ["木匠所", "木匠所r"], "forester" : ["林务官宅", "林务官宅"], "stonemason" : ["石匠屋", "石匠屋"], "glassblowing" : ["玻璃吹制厂", "玻璃吹制厂"], "winegrower" : ["葡萄种植园", "葡萄种植园"], "alchemist" : ["炼金塔", "炼金塔"], "architect" : ["建筑公署", "建筑公署"], "optician" : ["配镜商馆", "配镜商馆"], "vineyard" : ["藏酒窖", "藏酒窖"], "fireworker" : ["烟火实验场", "烟火实验场"] };
				texts = { "Upkeep" :"Upkeep", "cityName": "城市", "currentlyBuilding": "正在建造", "summary": "总计:", "hide_settings": "隐藏设置", "show_settings": "显示设置", "Population": "人口", "Research": "Research", "finishedBuilding": "建造完成","Incomes":"收入","Trading":"交易", 'wood': "木材", 'wine': "葡萄", 'marble': "大理石", 'crystal': "水晶", 'sulfur': "硫磺" };
			}
			else if (language == "tr") //Turkish translation, thanks to NailBey
			{
				langtype = '';
				buildings = { "townHall" : ["Belediye Binasi", "Belediye Binasi"], "temple" : ["Temple", "Temple"], "academy" : ["Akademi", "Akademi"], "port" : ["Ticaret Limani", "Ticaret Limani"], "shipyard" : ["Donanma Tershanesi", "Donanma Tershanesi"], "warehouse" : ["Depo", "Depo"], "dump" : ["Dump", "Dump"], "wall" : ["Sur", "Sur"], "tavern" : ["Taverna", "Taverna"], "museum" : ["Muze", "Muze"], "palace" : ["Saray", "Saray"], "palaceColony" : ["Vali Konagi", "Vali Konagi"], "embassy" : ["Buyukelcilik", "Buyukelcilik"], "branchOffice" : ["Ticaret Merkezi", "Ticaret Merkezi"], "safehouse" : ["Istihbarat Merkezi", "Istihbarat Merkezi"], "barracks" : ["Kisla", "Kisla"], "workshop" : ["Mucit Atolyesi", "Mucit Atolyesi"], "carpentering" : ["Marangoz Atolyesi", "Marangoz Atolyesi"], "forester" : ["Ormanci Kulubesi", "Ormanci Kulubesi"], "stonemason" : ["Mermer Atolyesi", "Mermer Atolyesi"], "glassblowing" : ["Cam Esya Atolyesi", "Cam Esya Atolyesi"], "winegrower" : ["Bag Evi", "Bag Evi"], "alchemist" : ["Simya Kulesi", "Simya Kulesi"], "architect" : ["Mimarlik Burosu", "Mimarlik Burosu"], "optician" : ["Optik", "Optik"], "vineyard" : ["Sarap Mahzeni", "Sarap Mahzeni"], "fireworker" : ["Fisekci", "Fisekci"] };
				texts = { "Upkeep" :"Upkeep", "cityName": "Sehir Adi", "currentlyBuilding": "Insaa Ediliyor", "summary": "Toplam:", "hide_settings": "Ayarlari Gizle", "show_settings": "Ayarlari Goster", "Research": "Research", "Population": "Nufus","finishedBuilding": "İnsaa Bitti","Incomes":"Gelir","Trading":"Ticaret", 'wood': "Odun", 'wine': "Sarap", 'marble': "Mermer", 'crystal': "Kristal", 'sulfur': 'sulfur' };
			}
			else if (language == "vn") // Vietnamese translations, thank Gafs
			{
				langtype = ''; // Set "lf" for Rigth-to-Left languages, or leave blank
				buildings = { "townHall" : ["Tòa thị chính", "Tòa T.Chính"], "temple" : ["Temple", "Temple"], "academy" : ["Học viện", "Học viện"], "port" : ["Cảng giao dịch", "Cảng GD"], "shipyard" : ["Xưởng đóng tàu", "Xưởng tàu"], "warehouse" : ["Kho hàng", "Kho"], "dump" : ["Dump", "Dump"], "wall" : ["Tường thành", "Tường"], "tavern" : ["Quán rượu", "Quán rượu"], "museum" : ["Viện bảo tàng", "V.B.Tàng"], "palace" : ["Cung điện", "Cung điện"], "palaceColony" : ["Phủ thủ hiến", "Phủ"], "embassy" : ["Tòa đại sứ", "Tòa Đ.Sứ"], "branchOffice" : ["Trạm giao dịch", "Trạm GD"], "safehouse" : ["Nơi ẩn náu", "Nơi ẩn náu"], "barracks" : ["Trại lính", "Trại lính"], "workshop" : ["Xưởng", "Xưởng"], "carpentering" : ["Thợ mộc", "Thợ mộc"], "forester" : ["Nhà kiểm lâm", "Kiểm lâm"], "stonemason" : ["Thợ xây đá", "Thợ đá"], "glassblowing" : ["Người thổi thủy tinh", "Thổi TT"], "winegrower" : ["Máy ép nho", "Ép nho"], "alchemist" : ["Giả kim", "Giả kim"], "architect" : ["Tòa kiến trúc", "Kiến trúc"], "optician" : ["Thợ kính", "Thợ kính"], "vineyard" : ["Vườn nho", "V.Nho"], "fireworker" : ["Thử thuốc súng", "Thuốc súng"]
			};
				texts = { "Upkeep" :"Upkeep", "cityName": "Thành phố", "currentlyBuilding": "Đang xây dựng", "summary": "Tổng:", "hide_settings": "Ẩn thiết lập", "show_settings": "Hiển thị thiết lập", "Population": "Dân số", "Research": "Research", "finishedBuilding": "Công trình hoàn tất","Incomes":"Thu nhập","Trading":"Trao đổi", 'wood': "Gỗ", 'wine': "Rượu", 'marble': "Cẩm thạch", 'crystal': "Pha lê", 'sulfur': "Lưu huỳnh"
			};
			}
			else if (language == "es") //Spanish translation, thanks to dragondeluz, graff86, Crom
			{
				langtype = '';
				buildings = { "townHall" : ["Intendencia", "Intendencia"], "temple" : ["Temple", "Temple"], "academy" : ["Academia", "Academia"], "port" : ["Puerto comercial", "Puerto"], "shipyard" : ["Astillero", "Astillero"], "warehouse" : ["Depósito", "Depósito"], "dump" : ["Dump", "Dump"], "wall" : ["Muralla", "Muralla"], "tavern" : ["Taberna", "Taberna"], "museum" : ["Museo", "Museo"], "palace" : ["Palacio", "Palacio"], "palaceColony" : ["Residencia del Gobernador", "Residencia"], "embassy" : ["Embajada", "Embajada"], "branchOffice" : ["Tienda", "Tienda"], "safehouse" : ["Escondite", "Escondite"], "barracks" : ["Cuarteles", "Cuarteles"], "workshop" : ["Taller de invenciones", "Taller"], "carpentering" : ["Carpintería", "Carpintería"], "forester" : ["Cabaña del guardabosques", "Cabaña"], "stonemason" : ["Cantero", "Cantero"], "glassblowing" : ["Soplador de vidrio", "Soplador"], "winegrower" : ["Vinicultor", "Vinicultor"], "alchemist" : ["Torre del Alquimista", "Alquimista"], "architect" : ["Oficina del Arquitecto", "Arquitecto"], "optician" : ["Óptico", "Óptico"], "vineyard" : ["Prensa de Vino", "Prensa"], "fireworker" : ["Área de Pruebas Pirotécnicas", "Pirotécnica"] };
				texts = { "Upkeep" :"Upkeep", "cityName": "Nombre de la ciudad", "currentlyBuilding": "Construyendo", "summary": "Totales", "hide_settings": "Ocultar opciones", "show_settings": "Mostrar opciones", "Population": "Población", "Research": "Research", "finishedBuilding": "Edificios terminados","Incomes":"Ingresos","Trading":"Comercio", 'wood': "Madera", 'wine': "Vino", 'marble': "Mármol", 'crystal': "Cristal", 'sulfur': "Azufre" };
			}
			else if (language == "pl") // thanks to Syjamek and Patibar
			{
				langtype = '';
				buildings = { "townHall" : ["Ratusz", "Ratusz"], "temple" : ["Świątynia", "Świątynia"], "academy" : ["Akademia", "Akademia"], "port" : ["Port", "Port"], "shipyard" : ["Stocznia", "Stocznia"], "warehouse" : ["Magazyn", "Magazyn"], "dump" : ["Dump", "Dump"], "wall" : ["Mur", "Mur"], "tavern" : ["Tawerna ", "Tawerna"], "museum" : ["Muzeum", "Muzeum"], "palace" : ["Pałac", "Pałac"], "palaceColony" : ["Rezydencja", "Rezydencja"], "embassy" : ["Ambasada", "Ambasada"], "branchOffice" : ["Bazar", "Bazar"], "safehouse" : ["Kryjówka", "Kryjówka"], "barracks" : ["Koszary", "Koszary"], "workshop" : ["Warsztat", "Warsztat"], "carpentering" : ["Warsztat Cieśli", "Warsztat Cieśli"], "forester" : ["Leśniczówka", "Leśniczówka"], "stonemason" : ["Kamieniarz", "Kamieniarz"], "glassblowing" : ["Huta Szkła", "Huta Szkła"], "winegrower" : ["Winnica", "Winnica"], "alchemist" : ["Wieża Alchemika", "Wieża Alchemika"], "architect" : ["Biuro Architekta", "Biuro Architekta"], "optician" : ["Optyk", "Optyk"], "vineyard" : ["Winiarz", "Winiarz"], "fireworker" : ["Zakład Pirotechnika", "Zakład Pirotechnika"] };
				texts = { "Upkeep": "Koszty utrzymania", "cityName": "Nazwa", "currentlyBuilding": "W budowie", "summary": "Suma:", "hide_settings": "Ukryj ustawieni", "show_settings": "Pokaż ustawienia", "Population": "Populacja", "Research": "Badania", "finishedBuilding": "Budowa zakończona","Incomes":"Bilans złota","Trading":"Handel", 'wood': "Drewno", 'wine': "Wino", 'marble': "Marmur", 'crystal': "Kryształ", 'sulfur': "Siarka" };
			}
			else if (language == "it") //Italian translation, thanks to Brucee and matteo466
			{
				langtype = '';
				buildings = { "townHall" : ["Municipio", "Municipio"], "temple" : ["Temple", "Temple"], "academy" : ["Accademia", "Accademia"], "port" : ["Porto", "Porto"], "shipyard" : ["Cantiere navale", "Cantiere navale"], "warehouse" : ["Magazzino", "Magazzino"], "dump" : ["Dump", "Dump"], "wall" : ["Muro", "Muro"], "tavern" : ["Taverna", "Taverna"], "museum" : ["Museo", "Museo"], "palace" : ["Palazzo", "Palazzo"], "palaceColony" : ["Governatore", "Governatore"], "embassy" : ["Ambasciata", "Ambasciata"], "branchOffice" : ["Mercato", "Mercato"], "safehouse" : ["Nascondiglio", "Nascondiglio"], "barracks" : ["Caserma", "Caserma"], "workshop" : ["Officina", "Officina"], "carpentering" : ["Carpentiere", "Carpentiere"], "forester" : ["Guardaboschi", "Guardaboschi"], "stonemason" : ["Tagliapietre", "Tagliapietre"], "glassblowing" : ["Vetraio", "Vetraio"], "winegrower" : ["Viticoltore", "Viticoltore"], "alchemist" : ["Alchimista", "Alchimista"], "architect" : ["Architetto", "Architetto"], "optician" : ["Ottico", "Ottico"], "vineyard" : ["Cantina", "Cantina"], "fireworker" : ["Pirotecnico", "Pirotecnico"] };
				texts = { "Upkeep" :"Upkeep", "cityName": "Città", "currentlyBuilding": "Costruzione in corso", "summary": "Sommario:", "hide_settings": "Nascondi opzioni", "show_settings": "Mostra opzioni", "Population": "Popolazione", "Research": "Research", "finishedBuilding": "Costruzione completata","Incomes":"Saldo oro","Trading":"Trading", 'wood': "Legno", 'wine': "Vino", 'marble': "Marmo", 'crystal': "Cristallo", 'sulfur': "Zolfo"
			};
			}
			else if (language == "pt") //Portuguese translation, thanks to alpha tester & Mr. Burns
			{
				langtype = '';
				buildings = { "townHall" : ["Câmara Municipal", "Câmara Municipal"], "temple" : ["Temple", "Temple"], "academy" : ["Academia", "Academia"], "port" : ["Porto Mercantil", "Porto"], "shipyard" : ["Estaleiro", "Estaleiro"], "warehouse" : ["Armazém", "Armazém"], "dump" : ["Dump", "Dump"], "wall" : ["Muralha", "Muralha"], "tavern" : ["Taberna", "Taberna"], "museum" : ["Museu", "Museu"], "palace" : ["Palácio", "Palácio"], "palaceColony" : ["Residencia do Governador", "Governador"], "embassy" : ["Embaixada", "Embaixada"], "branchOffice" : ["Mercado", "Mercado"], "safehouse" : ["Espionagem", "Espionagem"], "barracks" : ["Quartel", "Quartel"], "workshop" : ["Oficina", "Oficina"], "carpentering" : ["Carpintaria", "Carpintaria"], "forester" : ["Guarda Florestal", "Florestal"], "stonemason" : ["Pedreiro", "Pedreiro"], "glassblowing" : ["Fábrica de Vidro", "Vidro"], "winegrower" : ["Viticultor", "Viticultor"], "alchemist" : ["Torre do Alquimista", "Alquimista"], "architect" : ["Atelier de Arquitectura", "Arquitectura"], "optician" : ["Oculista", "Oculista"], "vineyard" : ["Caves de Vinho", "Caves"], "fireworker" : ["Fábrica de Pirotecnia", "Pirotecnia"] };
				texts = { "Upkeep" :"Upkeep", "cityName": "Cidades", "currentlyBuilding": "Em Construçao", "summary": "Sumário:", "hide_settings": "Ocultar Configuraçoes", "show_settings": "Ver Configuraçoes", "Population": "População", "Research": "Research", "finishedBuilding": "Finished building","Incomes":"Rendimento","Trading":"Trading", 'wood': "Madeira", 'wine': "Vinho", 'marble': "Mármore", 'crystal': "Cristal", 'sulfur': "Enxofre"
			};
			}
			else if (language == "fr") //French translation, thanks to Chirel
			{
				langtype = '';
				buildings = { "townHall" : ["Hôtel de ville", "HdV"], "temple" : ["Temple", "Temple"], "academy" : ["Académie", "Ac."], "port" : ["Port commercial", "Port"], "shipyard" : ["Chantier naval", "Chtr"], "warehouse" : ["Entrepôt", "Entp"], "dump" : ["Dump", "Dump"], "wall" : ["Mur d'enceinte", "Mur"], "tavern" : ["Taverne", "Tvrn"], "museum" : ["Musée", "Msé"], "palace" : ["Palais", "Plais"], "palaceColony" : ["Résidence du Gouverneur", "RdG"], "embassy" : ["Ambassade", "Amb."], "branchOffice" : ["Comptoir", "Cptr"], "safehouse" : ["Cachette", "Ccht"], "barracks" : ["Caserne", "Csrn"], "workshop" : ["Atelier", "Atlr"], "carpentering" : ["Menuisier","Men."], "forester" : ["Maison forestière","Frst"], "stonemason" : ["Tailleur de pierres","Tail."], "glassblowing" : ["Verrier","Vrr"], "winegrower" : ["Pressoir à vin","Prsr"], "alchemist" : ["Tour des alchimistes","Alch."], "architect" : ["Bureau de l`architecte","Arch."], "optician" : ["Opticien","Opt."], "vineyard" : ["Cave à vin","Cave"], "fireworker" : ["Zone de test des artificiers","Artf"] };
				texts = { "Upkeep" :"Coûts", "cityName": "Villes", "currentlyBuilding": "Construction en cours", "summary": "Total:", "hide_settings": "Cacher les options", "show_settings": "Voir les options", "Population": "Population", "Research": "Recherche", "finishedBuilding": "Construction terminée","Incomes":"Revenus","Trading":"Commerce", 'wood': "Bois", 'wine': "Vin", 'marble': "Marbre", 'crystal': "Cristal", 'sulfur': "Soufre"
			};
			}
			else if (language == "il") //hebrew translation, thank Refael Ackermann
			{
				langtype = "rf";
				buildings = { "townHall" : ["עיריה", "עיריה"], "temple" : ["Temple", "Temple"], "academy" : ["אקדמיה", "אקדמיה"], "port" : ["נמל מסחר", "נמל"], "shipyard" : ["מספנה", "מספנה"], "warehouse" : ["מחסן", "מחסן"], "dump" : ["Dump", "Dump"], "wall" : ["חומה", "חומה"], "tavern" : ["פונדק", "פונדק"], "museum" : ["מוזאון", "מוזאון"], "palace" : ["ארמון", "ארמון"], "palaceColony" : ["מגורי המושל", "מושל"], "embassy" : ["שגרירות", "שגרירות"], "branchOffice" : ["תחנת סחר", "סחר"], "safehouse" : ["מחבוא", "מחבוא"], "barracks" : ["מגורי חיילים", "חיילים"], "workshop" : ["סדנא", "סדנא"], "carpentering" : ["נגר", "נגר"], "forester" : ["יערן", "יערן"], "stonemason" : ["חרש אבן", "אבן"], "glassblowing" : ["נפח זכוכית", "זכוכית"], "winegrower" : ["יינן", "יינן"], "alchemist" : ["אלכימאי", "אלכימאי"], "architect" : ["ארכיטקט", "ארכיטקט"], "optician" : ["אופטיקאי", "אופטיקאי"], "vineyard" : ["יקב", "יקב"], "fireworker" : ["זיקוקים", "זיקוקים"] };
				texts = { "Upkeep" :"Upkeep", "cityName": "שם עיר", "currentlyBuilding": "בבניה", "summary": "סיכום:", "hide_settings": "הסתר אפשרויות", "show_settings": "הצג אפשרויות", "Population": "אוכלוסיה", "Research": "Research", "finishedBuilding": "הסתימה בניה","Incomes":"הכנסה","Trading":"סוחר", 'wood': "עץ", 'wine': "יין", 'marble': "שיש", 'crystal': "קריסטל", 'sulfur': "גופרית"
			};
			}
			else if ((language == "ae") || (language == "eg") || (language == "sa")) //by wa7d and Moshakes
			{
				langtype = "rf";
				buildings = { "townHall" : ["البلدية", "البلدية"], "temple" : ["Temple", "Temple"], "academy" : ["الاكاديمية", "الاكاديمية"], "port" : ["المرفأ", "المرفأ"], "shipyard" : ["حوض السفن", "حوض السفن"], "warehouse" : ["المخزن", "المخزن"], "dump" : ["Dump", "Dump"], "wall" : ["السور", "السور"], "tavern" : ["الاستراحة", "الاستراحة"], "museum" : ["المتحف", "المتحف"], "palace" : ["القصر", "القصر"], "palaceColony" : ["قائم مقام", "قائم مقام"], "embassy" : ["السفارة", "السفارة"], "branchOffice" : ["السوق", "السوق"], "safehouse" : ["المخبأ", "المخبأ"], "barracks" : ["الثكنة", "الثكنة"], "workshop" : ["المختبر", "المختبر"], "carpentering" : ["الحطاب", "الحطاب"], "forester" : ["حارس الغابات", "حارس الغابات"], "stonemason" : ["الحجار", "الحجار"], "glassblowing" : ["نافخ الزجاج", "نافخ الزجاج"], "winegrower" : ["مزارع العنب", "مزارع العنب"], "alchemist" : ["الكيمائي", "الكيمائي"], "architect" : ["المعماري", "المعماري"], "optician" : ["صانع العدسات", "صانع العدسات"], "vineyard" : ["مزرعة العنب", "مزرعة العنب"], "fireworker" : ["عامل النار", "عامل النار"] };
				texts = { "Upkeep":"التكاليف", "cityName": "المدينة", "currentlyBuilding": "أعمال بناء", "summary": "الإجمالي:", "hide_settings": "إخفاء الخيارات", "show_settings": "إظهار الخيارات", "Population": "السكان", "Research": "الابحاث", "finishedBuilding": "مباني منجزة","Incomes":"الذهب","Trading":"التجارة", 'wood': "الخشب", 'wine': "العنب", 'marble': "الرخام", 'crystal': "البلور", 'sulfur': "الكبريت" };
			}
			else if (language == 'hu') // Thank Luzer
			{
				langtype = ''; // Set "lf" for Rigth-to-Left languages, or leave blank
				buildings = { "townHall" : ["Városháza", "Városháza"], "temple" : ["Temple", "Temple"], "academy" : ["Akadémia", "Akadémia"], "port" : ["Kikötő", "Kikötő"], "shipyard" : ["Hajógyár", "Hajógyár"], "warehouse" : ["Raktár", "Raktár"], "dump" : ["Dump", "Dump"], "wall" : ["Városfal", "Fal"], "tavern" : ["Fogadó", "Fogadó"], "museum" : ["Múzeum", "Múzeum"], "palace" : ["Palota", "Palota"], "palaceColony" : ["Helytartó", "Helytartó"], "embassy" : ["Nagykövetség", "Nagykövetség"], "branchOffice" : ["Kereskedő", "Kereskedő"], "safehouse" : ["Rejtekhely", "Rejtekhely"], "barracks" : ["Barakk", "Barakk"], "workshop" : ["Műhely", "Műhely"], "carpentering" : ["Ácsmester", "Ácsmester"], "forester" : ["Erdész", "Erdész"], "stonemason" : ["Kőműves", "Kőműves"], "glassblowing" : ["Üvegfúvó", "Üvegfúvó"], "winegrower" : ["Bortermelő", "Bortermelő"], "alchemist" : ["Alkimista", "Alkimista"], "architect" : ["Építész", "Építész"], "optician" : ["Optikus", "Optikus"], "vineyard" : ["Szőlőprés", "Szőlőprés"], "fireworker" : ["Tűzszerész", "Tűzszerész"] };
				texts = { "Upkeep" :"Fenntartás", "cityName": "Város neve", "currentlyBuilding": "Építés alatt", "summary": "Összesen:", "hide_settings": "Beállítások elrejtése", "show_settings": "Beállítások megtekintése", "Population": "Lakosság", "Research": "Fejlesztés", "finishedBuilding": "Finished building","Incomes":"Bevételek","Trading":"Trading", 'wood': "Építőanyag", 'wine': "Bor", 'marble': "Márvány", 'crystal': "Kristály", 'sulfur': "Kénpor" };
			}
			else if (language == "ro") //Romanian translation, thanks to Peta
			{
				langtype = '';
				buildings = { "townHall" : ["Primarie", "Primarie"], "temple" : ["Temple", "Temple"], "academy" : ["Academie", "Academie"], "port" : ["Port comercial", "Port"], "shipyard" : ["Santier Naval", "S.Naval"], "warehouse" : ["Depozit", "Depozit"], "dump" : ["Dump", "Dump"], "wall" : ["Zid", "Zid"], "tavern" : ["Taverna", "Taverna"], "museum" : ["Muzeu", "Muzeu"], "palace" : ["Palat", "Palat"], "palaceColony" : ["Resedinta Guvernatorului", "R.Guv."], "embassy" : ["Ambasada", "Ambasada"], "branchOffice" : ["Punct de negot", "Piata"], "safehouse" : ["Ascunzatoare", "Ascunzatoare"], "barracks" : ["Cazarma", "Cazarma"], "workshop" : ["Atelier", "Atelier"], "carpentering" : ["Dulgher", "Dulgher"], "forester" : ["Casa Padurarului", "Padurar"], "stonemason" : ["Cariera", "Cariera"], "glassblowing" : ["Sticlarie", "Sticlarie"], "winegrower" : ["Vinificator", "Vinificator"], "alchemist" : ["Turnul Alchimistului", "Alchimist"], "architect" : ["Biroul Arhitectului", "Architect"], "optician" : ["Optician", "Optician"], "vineyard" : ["Presa de Vin", "Presa Vin"], "fireworker" : ["Zona Pirotehnica de Test", "Poligon"] };
				texts = { "Upkeep" :"Upkeep", "cityName": "Nume Oras", "currentlyBuilding": "In constructie", "summary": "Total:", "hide_settings": "Ascunde Setari", "show_settings": "Arata Setari", "Population": "Populatie", "Research": "Research", "finishedBuilding": "Constructie Finalizata","Incomes":"Economii","Trading":"Comert", 'wood': "Lemn", 'wine': "Vin", 'marble': "Marmura", 'crystal': "Cristal", 'sulfur': "Sulf" };
			}
			else if (language == "cz") //Czech translation , thank Tetraedron, Assassin
			{
				langtype = '';
				buildings = { "townHall" : ["Městská radnice", "Radnice"], "temple" : ["Temple", "Temple"], "academy" : ["Akademie", "Akademie"], "port" : ["Obchodní přístav", "Přístav"], "shipyard" : ["Loděnice", "Loděnice"], "warehouse" : ["Sklad", "Sklad"], "dump" : ["Dump", "Dump"], "wall" : ["Městská zeď", "Zeď"], "tavern" : ["Hostinec", "Hostinec"], "museum" : ["Muzeum", "Muzeum"], "palace" : ["Palác", "Palác"], "palaceColony" : ["Guvernérova rezidence", "Guvernér"], "embassy" : ["Ambasáda", "Ambasáda"], "branchOffice" : ["Tržiště", "Tržiště"], "safehouse" : ["Úkryt", "Úkryt"], "barracks" : ["Kasárna", "Kasárna"], "workshop" : ["Dílna", "Dílna"], "carpentering" : ["Truhlárna", "Truhlárna"], "forester" : ["Hájovna", "Hájovna"], "stonemason" : ["Kameník", "Kameník"], "glassblowing" : ["Sklárna", "Sklárna"], "winegrower" : ["Vinařství", "Vinařství"], "alchemist" : ["Věž alchymisty", "Věž alchymisty"], "architect" : ["Pracovna architekta", "Architekt"], "optician" : ["Optik", "Optik"], "vineyard" : ["Vinný sklep", "Vinný sklep"], "fireworker" : ["Zkušebna ohňostroje", "Zkušebna ohňostroje"] };
				texts = { "Upkeep" :"Upkeep", "cityName" : "Město", "currentlyBuilding" : "Staví se", "summary" : "Celkem:", "hide_settings" : "Skrýt nastavení", "show_settings" : "Ukázat nastavení", "Population" : "Populace", "Research": "Research", "finishedBuilding" : "Dokončené stavby", "Incomes" : "Příjmy", "Trading" : "Obchod", 'wood' : "Dřevo", 'wine' : "Víno", 'marble' : "Mramor", 'crystal' : "Sklo", 'sulfur' : "Síra" };
			}
			else if (language == "ru") //russian translation by Mugivara, GrAndAG
			{
				langtype = '';
				buildings = { "townHall" : ["Ратуша", "Ратуша"], "temple" : ["Храм", "Храм"], "academy" : ["Академия", "Академия"] ,"port" : ["Торговый порт", "Порт"], "shipyard" : ["Верфь", "Верфь"], "warehouse" : ["Склад", "Склад"], "dump" : ["Dump", "Dump"], "wall" : ["Стена", "Стена"], "tavern" : ["Таверна", "Таверна"], "museum" : ["Музей", "Музей"], "palace" : ["Дворец", "Дворец"], "palaceColony" : ["Резиденция губернатора", "Резиденция"], "embassy" : ["Посольство", "Посольство"], "branchOffice" : ["Торговый пост", "Пост"], "safehouse" : ["Укрытие", "Укрытие"], "barracks" : ["Казарма", "Казарма"], "workshop" : ["Мастерская", "Мастерская"], "carpentering" : ["Плотницкая мастерская", "Плотник"], "forester" : ["Хижина леничего", "Лесничий"], "stonemason" : ["Каменоломня", "Каменоломня"], "glassblowing" : ["Стеклодувная мастерская", "Стеклодув"], "winegrower" : ["Винодельня", "Винодельня"], "alchemist" : ["Башня алхимика", "Алхимик"], "architect" : ["Бюро архитектора", "Архитектор"], "optician" : ["Оптика", "Оптика"], "vineyard" : ["Винный погреб", "Погреб"], "fireworker" : ["Полигон пиротехника", "Полигон"] };
				texts = { "Upkeep" :"Upkeep", "cityName": "Название города", "currentlyBuilding": "Текущее строительство", "summary": "Итого:", "hide_settings": "Скрыть настройки", "show_settings": "Показать настройки", "Population": "Население", "Research": "Учёные", "finishedBuilding": "Строительство завершено", "Incomes":"Золото", "Trading":"Торговля", 'wood': "Стройматериалы", 'wine': "Виноград", 'marble': "Мрамор", 'crystal': "Хрусталь", 'sulfur': "Сера" };
			}
			else if (language == "nl") //Dutch translation, thanks to cremers
			{
				langtype = '';
				buildings = { "townHall" : ["Stadhuis", "Stadhuis"], "temple" : ["Temple", "Temple"], "academy" : ["Academie", "Academie"], "port" : ["Handelshaven", "Haven"], "shipyard" : ["Scheepswerf", "Werf"], "warehouse" : ["Opslagplaats", "Opslagplaats"], "dump" : ["Dump", "Dump"], "wall" : ["Stadsmuur", "Muur"], "tavern" : ["Taverne", "Taverne"], "museum" : ["Museum", "Museum"], "palace" : ["Paleis", "Paleis"], "palaceColony" : ["Gouverneurswoning", "Gouverneurswoning"], "embassy" : ["Ambassade", "Ambassade"], "branchOffice" : ["Handelspost", "Handelspost"], "safehouse" : ["Schuilplaats", "Schuilplaats"], "barracks" : ["Barakken", "Barakken"], "workshop" : ["Werkplaats", "Werkplaats"], "carpentering" : ["Timmerman", "Timmerman"], "forester" : ["Houthakkers Loge", "Houthakkers Loge"], "stonemason" : ["Steenhouwer", "Steenhouwer"], "glassblowing" : ["Glasblazer", "Glasblazer"], "winegrower" : ["Wijnboer", "Wijnboer"], "alchemist" : ["De Alchemie Toren", "De Alchemie Toren"], "architect" : ["Architectenbureau", "Architectenburea"], "optician" : ["Opticien", "Opticien"], "vineyard" : ["Wijnpers", "Wijnpers"], "fireworker" : ["Vuurwerk Opslag", "Vuurwerk Opslag"] };
				texts = { "Upkeep" :"Upkeep", "cityName": "Stadsnaam", "currentlyBuilding": "Huidige constructie", "summary": "Opgeteld:", "hide_settings": "Verberg instellingen", "show_settings": "Instellingen", "Research": "Research", "Population": "Inwoners", "finishedBuilding": "Klaar","Incomes":"Inkomsten","Trading":"Handel", 'wood': "Hout", 'wine': "Wijn", 'marble': "Marmer", 'crystal': "Glas", 'sulfur': "Zwavel" };
			}
			else if (language == "gr") //greek translation, thanks to panospap and Napoleon I
			{
				langtype = '';
				buildings = { "townHall" : ["Δημαρχείο", "Δημαρχείο"], "temple" : ["Ναός", "Ναός"], "academy" : ["Ακαδημία", "Ακαδημία"], "port" : ["Εμπορικός Λιμένας", "Εμπορικός Λιμένας"], "shipyard" : ["Ναυπηγείο", "Ναυπηγείο"], "warehouse" : ["Αποθήκη Εμπορευμάτων", "Αποθήκη Εμπορευμάτων"], "dump" : ["Dump", "Dump"], "wall" : ["Τείχη της Πόλης", "Τείχη της Πόλης"], "tavern" : ["Ταβέρνα", "Ταβέρνα"], "museum" : ["Μουσείο", "Μουσείο"] , "palace" : ["Παλάτι", "Παλάτι"], "palaceColony" : ["Η Κατοικία του Κυβερνήτη", "Η Κατοικία του Κυβερνήτη"], "embassy" : ["Πρεσβεία", "Πρεσβεία"], "branchOffice" : ["Θέση Εμπορικών Συναλλαγών", "Θέση Εμπορικών Συναλλαγών"], "safehouse" : ["Κρησφύγετο", "Κρησφύγετο"], "barracks" : ["Στρατώνες", "Στρατώνες"], "workshop" : ["Εργαστήριο", "Εργαστήριο"], "carpentering" : ["Ξυλουργός", "Ξυλουργός"], "forester" : ["Σπίτι Ξυλοκόπου", "Σπίτι Ξυλοκόπου"], "stonemason" : ["Κτίριο Λατομείου", "Κτίριο Λατομείου"], "glassblowing" : ["Υαλουργείο", "Υαλουργείο"], "winegrower" : ["Αποστακτήριο", "Αποστακτήριο"], "alchemist" : ["Πύργος Αλχημιστή", "Πύργος Αλχημιστή"], "architect" : ["Αρχιτεκτονικό Γραφείο", "Αρχιτεκτονικό Γραφείο"], "optician" : ["Οπτικός", "Οπτικός"], "vineyard" : ["Πιεστήριο Σταφυλιού", "Πιεστήριο Σταφυλιού"], "fireworker" : ["Περιοχή Δοκιμών Πυροτεχνημάτων", "Περιοχή Δοκιμών Πυροτεχνημάτων"] };
				texts = { "Upkeep":"Συντήρηση", "cityName": "Όνομα Πόλης", "currentlyBuilding": "Αναβαθμίζετε τώρα", "summary": "Σύνολο:", "hide_settings": "Κρύψε ρυθμίσεις", "show_settings": "Εμφάνισε ρυθμίσεις", "Population": "Πληθυσμός", "Research": "Έρευνες", "finishedBuilding": "Ολοκληρωμένη Αναβαθμιση","Incomes":"Εισοδήματα","Trading":"Εμπόριο", 'wood': "Οικοδομικό Υλικό", 'wine': "Κρασί", 'marble': "Μάρμαρο", 'crystal': "Κρύσταλλο", 'sulfur': "Θείο" };
			}
			else if (language == "sk") //Slovak translation by RxR
			{
				langtype = '';
				buildings = { "townHall" : ["Radnica", "Radnica"], "temple" : ["Kostol", "Kostol"], "academy" : ["Akadémia", "Akadémia"], "port" : ["Obchodný prístav", "Prístav"], "shipyard" : ["Lodenica", "Lodenica"], "warehouse" : ["Sklad", "Sklad"], "dump" : ["Dump", "Dump"], "wall" : ["Mestský múr", "Múr"], "tavern" : ["Vináreň", "Vináreň"], "museum" : ["Múzeum", "Múzeum"], "palace" : ["Palác", "Palác"], "palaceColony" : ["Rezidencia guvernéra", "Guvernér"], "embassy" : ["Ambasáda", "Ambasáda"], "branchOffice" : ["Trhovisko", "Trh"], "safehouse" : ["Úkryt", "Úkryt"], "barracks" : ["Kasárne", "Kasárne"], "workshop" : ["Dielňa", "Dielňa"], "carpentering" : ["Tesár", "Tesár"], "forester" : ["Dom lesníka", "Lesník"], "stonemason" : ["Kameňolom", "Kamenár"], "glassblowing" : ["Fúkač skla", "Sklár"], "winegrower" : ["Vinár", "Vinár"], "alchemist" : ["Veža alchymistov", "Alchymista"], "architect" : ["Úrad architekta", "Architekt"], "optician" : ["Optik", "Optik"], "vineyard" : ["Vinica", "Vinica"], "fireworker" : ["Testovanie ohňostrojov", "Ohňostroje"] };
				texts = { "Upkeep" :"Upkeep", "cityName" : "Mesto", "currentlyBuilding" : "Stavia sa", "summary" : "Spolu:", "hide_settings" : "Skryť nastavenia", "show_settings" : "Zobraziť nastavenia", "Population" : "Obyvateľstvo", "Research": "Research", "finishedBuilding" : "Dokončené stavby", "Incomes" : "Príjmy", "Trading" : "Obchod", 'wood' : "Drevo", 'wine' : "Víno", 'marble' : "Mramor", 'crystal' : "Sklo", 'sulfur' : "Síra" };
			}
			else if (language == "bg") //Bulgarian translation by dsimeonov
			{
				langtype = '';
				buildings = { "townHall" : ["Кметство", "Кметство"], "temple" : ["Храм", "Храм"], "academy" : ["Академия", "Академия"], "port" : ["Пристанище", "Пристанище"], "shipyard" : ["Корабостроителница", "Корабостроителница"], "warehouse" : ["Склад", "Склад"], "dump" : ["Dump", "Dump"], "wall" : ["Градска стена", "Градска стена"], "tavern" : ["Кръчма", "Кръчма"], "museum" : ["Музей", "Музей"], "palace" : ["Дворец", "Дворец"], "palaceColony" : ["Губернаторска резиденция", "Губернаторска резиденция"], "embassy" : ["Посолство", "Посолство"], "branchOffice" : ["Пазар", "Пазар"], "safehouse" : ["Скривалище", "Скривалище"], "barracks" : ["Казарма", "Казарма"], "workshop" : ["Работилница", "Работилница"], "carpentering" : ["Дърводелец", "Дърводелец"], "forester" : ["Горска къща", "Горска къща"], "stonemason" : ["Каменоделна", "Каменоделна"], "glassblowing" : ["Стъклодув", "Стъклодув"], "winegrower" : ["Винар", "Винар"], "alchemist" : ["Кула на Алхимика", "Кула на Алхимика"], "architect" : ["Офис на Архитекта", "Офис на Архитекта"], "optician" : ["Оптика", "Оптика"], "vineyard" : ["Винена преса", "Винена преса"], "fireworker" : ["Тестова зона за фойерверки", "Тестова зона за фойерверки"] };
				texts = { "Upkeep" :"Upkeep", "cityName" : "Град", "currentlyBuilding" : "В процес на разширение", "summary" : "Общо:", "hide_settings" : "Скрий", "show_settings" : "Покажи", "Population" : "Популация", "Research": "Research", "finishedBuilding" : "Завършена", "Incomes" : "Доходи", "Trading" : "Търговия", 'wood' : "Дърво", 'wine' : "Вино", 'marble' : "Мрамор", 'crystal' : "Кристал", 'sulfur' : "Сяра" };
			}
			else if (language == "lv") //Latvian translation by aezaurs/sauron
			{
				langtype = '';
				buildings = { "townHall" : ["Rātsnams", "Rātsnams"], "temple" : ["Templis", "Templis"], "academy" : ["Akadēmija", "Akadēmija"], "port" : ["Osta", "Osta"], "shipyard" : ["Kuģu būvētava", "Kuģu būvētava"], "warehouse" : ["Noliktava", "Noliktava"], "dump" : ["Dump", "Dump"], "wall" : ["Mūris", "Mūris"], "tavern" : ["Krogs", "Krogs"], "museum" : ["Muzejs", "Muzejs"], "palace" : ["Pils", "Pils"], "palaceColony" : ["Gubernātora rezidence", "Gubernātora rezidence"], "embassy" : ["Vēstniecība", "Vēstniecība"], "branchOffice" : ["Tirgus", "Tirgus"], "safehouse" : ["Paslēptuve", "Paslēptuve"], "barracks" : ["Kazarmas", "Kazarmas"], "workshop" : ["Darbnīca", "Darbnīca"], "carpentering" : ["Namdaris", "Namdaris"], "forester" : ["Mežsarga māja", "Mežsargs"], "stonemason" : ["Akmeņkalis", "Akmeņkalis"], "glassblowing" : ["Stikla pūtējs", "Stiklinieks"], "winegrower" : ["Vīna audzētājs", "Vīna audzētājs"], "alchemist" : ["Alhīmiķa Tornis", "Alhīmiķa Tornis"], "architect" : ["Arhitekta Ofiss", "Arhitekts"], "optician" : ["Optiķis", "Optiķis"], "vineyard" : ["Vīna Gatavotājs", "Vīna Gatavotājs"], "fireworker" : ["Uguņošanas izmēģinājumu apgabals", "Uguņošanas apg."] };
				texts = { "Upkeep" :"Uzturēšana", "cityName" : "Pilsēta", "currentlyBuilding" : "Šobrīd ceļās", "summary" : "Kopā:", "hide_settings" : "Slēpt iestatījumus", "show_settings" : "Rādīt iestatījumus", "Population" : "Apdzīvotība", "Research": "Izpēte", "finishedBuilding" : "Pabeigta celtniecība", "Incomes" : "Zelts", "Trading" : "Tirzniecība", 'wood' : "Koks", 'wine' : "Vīns", 'marble' : "Marmors", 'crystal' : "Kristāls", 'sulfur' : "Sērs" };
			}
			else if (language == "uk") //ukrainian Translation by feelimon http://www.ikariam.com.ua
			{
				langtype = '';
				buildings = { "townHall" : ["Ратуша", "Ратуша"], "temple" : ["Храм", "Храм"], "academy" : ["Академія", "Академія"], "port" : ["Торговий порт", "Порт"], "shipyard" : ["Верф", "Верф"], "warehouse" : ["Склад", "Склад"], "dump" : ["Dump", "Dump"], "wall" : ["Стіна", "Стіна"], "tavern" : ["Таверна", "Таверна"], "museum" : ["Музей", "Музей"], "palace" : ["Палац", "Палац"], "palaceColony" : ["Резиденція губернатора", "Резиденція"], "embassy" : ["Посольство", "Посольство"], "branchOffice" : ["Торговий пост", "Пост"], "safehouse" : ["Схованка", "Схованка"], "barracks" : ["Бараки", "Бараки"], "workshop" : ["Майстерня", "Майстерня"], "carpentering" : ["Теслярська майстерня", "Тесля"], "forester" : ["Дім лісничого", "Лісник"], "stonemason" : ["Дім каменяра", "Дім каменяра"], "glassblowing" : ["Склодувна майстерня", "Склодув"], "winegrower" : ["Виноградник", "Виноградник"], "alchemist" : ["Вежа алхіміка", "Алхімік"], "architect" : ["Офіс архітектора", "Архітектор"], "optician" : ["Оптик", "Оптик"], "vineyard" : ["Винний погріб", "Погріб"], "fireworker" : ["Полігон піротехніка", "Піротехнік"] };
				texts = { "Upkeep" :"Утримання", "cityName": "Назва міста", "currentlyBuilding": "Поточне будівництво", "summary": "Всього:", "hide_settings": "Сховати налаштування", "show_settings": "Показати налаштування", "Population": "Населення", "Research": "Вчені", "finishedBuilding": "Будівництво завершено", "Incomes":"Золото", "Trading":"Торгівля", 'wood': "Дерево", 'wine': "Вино", 'marble': "Мармур", 'crystal': "Кришталь", 'sulfur': "Сірка" };
			}
			else // default: english
			{
				this.load_default ();
			}

			if (! (language == "rs" || language == "us" || language == "uk"))
			{
				this.more_text();
			}

		},

		load_default : function ()
		{
			buildings = {
				"townHall"		: ["Town Hall", "T. Hall"],
				"temple"		: ["Temple", "Temple"],
				"academy"		: ["Academy", "Academy"],
				"port"			: ["Trading Port", "Port"],
				"shipyard"		: ["Shipyard", "Shipyard"],
				"warehouse"		: ["Warehouse", "Warehouse"],
				"dump"			: ["Dump", "Dump"],
				"wall"			: ["Wall", "Wall"],
				"tavern"		: ["Tavern", "Tavern"],
				"museum"		: ["Museum", "Museum"],
				"palace"		: ["Palace", "Palace"],
				"palaceColony"	: ["Governor's Residence", "Governor"],
				"embassy"		: ["Embassy", "Embassy"],
				"branchOffice"	: ["Trading Post", "Trading"],
				"safehouse"		: ["Hideout", "Hideout"],
				"barracks"		: ["Barracks", "Barracks"],
				"workshop"		: ["Workshop", "Workshop"],
				"carpentering"	: ["Carpenter", "Carpenter"],
				"forester"		: ["Forester", "Forester"],
				"stonemason"	: ["Stone Mason", "Mason"],
				"glassblowing"	: ["Glass Blowing", "Blowing"],
				"winegrower"	: ["Wine Grower", "Grower"],
				"alchemist"		: ["Alchemist", "Alchemist"],
				"architect"		: ["Architect", "Architect"],
				"optician"		: ["Optician", "Optician"],
				"vineyard"		: ["Vine Yard", "Yard"],
				"fireworker"	: ["Fireworker", "Fireworker"]
			};
			texts = {
				'cfg' : {
					'fixedWidth' : 'Fixed table width',
					'advancedMode' : 'Advanced mode (more details)',
					'militaryIcons' : 'Military icons',
					'otherCities': 'Other cities',
					'occupied'	 : 'occupied',
					'deployed'	 : 'deployed',
					'resources'	 : 'resources',
					'production' : 'production',
					'reset' 	 : 'Reset',
					'reset_data' : 'Reset All Data',
					'left'		 : 'left',
					'right'		 : 'right',
					'icons'		 : 'icons',
					'large'		 : 'large',
					'small'		 : 'small',
					'toggle'	 : 'toggle',
					'show'		 : 'show',
					'hide'		 : 'hide',
					'on'		 : 'on',
					'off'		 : 'off',
					'city'	 	 : 'city',
					'from'	 	 : ' from ',
					'to'	 	 : ' to ',
					'transport_goods': 'Transports goods ',
					'deploy_army'  	 : 'Deploy army ',
					'deploy_fleet'   : 'Deploy fleet ',
					'transport_from' : 'Transports goods from [from] to [to] ',
					'transports' 	 : '0 transport(s) on way',
					'movements'	 	 : '0 movement(s) on way',
					'under_attacks'	 : 'Under 0 attack(s)',
				},
				'army'				: 'army',
				'navy'				: 'navy',
				'units'				: 'units',
				'generals'			: 'generals',
				'storage'			: 'Storage',
				'total_capacity'	: ' total capacity',
				'safe_capacity'		: ' safety capacity',
				'not_safe'			: ' not safe',
				'transport' 		: ' transport(s) on way',
				'generals'			: 'generals',
				'filled'			: ' full',
				'toFull'			: ' to full',
				'toEmpty'			: ' to empty',
				'availAP'			: 'Available action points',
				'availFS'			: 'available free spaces for new buildings',
				'requireAtt'		: 'require your attention to update overview\'s data',
				'resDelivered'		: 'some resources delivered',
				'resSafe'			: 'resources safe against pillaging',
				'setShotRes'		: 'Resources',
				'setShowBuilding'	: 'Buildings',
				'setShowArmy'		: 'Army and fleet',
				'setProggress'		: 'Resource progress bar mode:',
				'setProgressOff'	: 'off',
				'setProgressTime'	: 'remaining time',
				'setProgressPercent': 'fullness percentage',
				'setLanguage' 		: 'Language:',
				'setLanguageAuto' 	: 'Automatic from server name',
				"Upkeep"			: "Upkeep",
				"cityName"			: "Cities",
				"currentlyBuilding"	: "Currently building",
				"summary"			: "Summary:",
				"hide_settings"		: "Hide settings",
				"show_settings"		: "Show settings",
				"Population"		: "Population",
				"Research"			: "Research",
				"finishedBuilding"	: "Finished building",
				"Incomes"			: "Incomes",
				"Trading"			: "Trading",
				'wood': 'wood', 'wine': 'wine', 'marble': 'marble', 'crystal': "Crystal", 'sulfur': 'Sulfur'
			};

		},

		more_text : function ()
		{
			texts['cfg'] = {
				'fixedWidth' : 'Fixed table width',
				'advancedMode' : 'Advanced mode (more details)',
				'militaryIcons' : 'Military icons',
				'otherCities': 'Other cities',
				'occupied'	 : 'occupied',
				'deployed'	 : 'deployed',
				'resources'	 : 'resources',
				'production' : 'production',
				'reset' 	 : 'Reset',
				'reset_data' : 'Reset All Data',
				'left'		 : 'left',
				'right'		 : 'right',
				'icons'		 : 'icons',
				'large'		 : 'large',
				'small'		 : 'small',
				'toggle'	 : 'toggle',
				'show'		 : 'show',
				'hide'		 : 'hide',
				'on'		 : 'on',
				'off'		 : 'off',
				'city'	 	 : 'city',
				'from'	 	 : ' from ',
				'to'	 	 : ' to ',
				'transport_goods' : 'Transports goods ',
				'deploy_army' : 'Deploy army ',
				'deploy_fleet' : 'Deploy fleet ',
				'transport_from' : 'Transports goods from [from] to [to] ',
				'transports' : '0 transport(s) on way',
				'movements'	: '0 movement(s) on way',
				'under_attacks'	: 'Under 0 attack(s)',
			};
			texts['army']			= 'army';
			texts['navy']			= 'navy';
			texts['units']			= 'units';
			texts['generals']		= 'generals';
			texts['storage']		= 'Storage';
			texts['total_capacity']	= ' total capacity';
			texts['safe_capacity']	= ' safety capacity';
			texts['not_safe']		= ' not safe';
			texts['toFull'] 		= ' to full';
			texts['filled'] 		= ' full';
			texts['toEmpty'] 		= ' to empty';
			texts['availAP'] 		= 'Available action points';
			texts['availFS'] 		= 'available free spaces for new buildings';
			texts['requireAtt'] 	= 'require your attention to update overview\'s data';
			texts['resDelivered'] 	= 'some resources delivered';
			texts['resSafe'] 		= 'resources safe against pillaging';
			texts['transport'] 		= ' transport(s) on way';
			texts['setShotRes'] 		= 'Show resources table:';
			texts['setShowBuilding']	= 'Show buildings table:';
			texts['setShowArmy'] 		= 'Show army and fleet table:';
			texts['setProggress'] 		= 'Resource progress bar mode:';
			texts['setProgressOff'] 	= 'off';
			texts['setProgressTime'] 	= 'based on remaining time';
			texts['setProgressPercent']	= 'based on fullness percentage';
			texts['setLanguage'] 		= 'Language:';
			texts['setLanguageAuto']	= 'Automatic from server name';
		}

	},

/**
* IM.Ika object
*/
	Ika :
	{
		_Parent:				 null,
		_View:					 null,
		_Tab:					 null,
		_Host:					 null,
		_Server:				 null,
		_Language:				 null,
		_version:				 null,
		_ActionRequest:			 null,
		_currentCity:			 null,
		_LocalizationStrings:	 null,

		server_names : '?αβγδεζηθικλμνξοπρςστυφχψω',

		init : function(parent)
		{
			this._Parent = parent;
		},

		view : function()
		{
			if (this._View == null)
			{
				this._View = '';

				// Fetch view name
				try	{ this._View = document.getElementsByTagName("body")[0].id;
				} catch (e) {
					var url_view = /[\?&]view=([a-zA-Z0-9\-_]+)/.exec(document.URL);
					if (url_view != null) { this._View = RegExp.$1; }
				}
			}
			return this._View;
		},

		host : function()
		{
			if (this._Host == null) { this._Host = document.location.host; }
			return this._Host;
		},

		server : function(host)
		{
			if (this._Server == null)
			{
				if (host == undefined) { host = this.host(); }
				this._Server = '';

				var parts = host.split(".");
				var idx = 0;
				if (parts[0] == 'www') { idx++; }
				this._Server = parts[idx];
			}

			return this._Server;
		},

		server_name : function (server)
		{
			if (server == undefined)
			{
				server = this.server();
			}
			server = parseInt(server.substring(1,3));
			var server_name = this.server_names.charAt(server);
			if (server_name == undefined)
			{
				return server;
			}
			return server_name;

		},

		language : function()
		{
			if (this._Language == null)
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

			return this._Language;
		},

		version : function()
		{
			// Requires: DOM
			if (this._version == null)
			{
				this._version = this._Parent.DOM.Get_First_Node_TextContent("//div[@id='GF_toolbar']//li[@class='version']//span[@class='textLabel']",'');
			}

			return this._version;
		},

		Tab : function()
		{
			if (this._Tab == null)
			{
				this._Tab = '';
				var url_view = /[\?&]tab=([a-zA-Z0-9\-_]+)/.exec(document.URL);
				if (url_view != null)	{ this._Tab = RegExp.$1; }
			}

			return this._Tab;
		},

		trim_coordinates : function(str)	{ return this._Parent.Str.trim(this._Parent.Str.trim_accodances(str)); },
		trim_player_name : function(str)	{ return this._Parent.Str.trim(this._Parent.Str.trim_brackets(str)); },

		trim_unit : function(str)
		{
			str = str.replace("unit", '');
			str = str.replace("currentUnit", '');

			return this._Parent.Str.trim(str);
		},

		two_digit_coordinates : function(str)
		{
			if (typeof str == 'undefined')
			{
				return '';
			}
			var a = str.indexOf('[');
			var b = str.indexOf(']');
			str = str.substring(a+1,b);
			var coords = str.split(':');
			return '[' + this._Parent.Str.two_digit(coords[0].substr(-2,2)) + ':' + this._Parent.Str.two_digit(coords[1].substr(-2,2)) + ']';
		},

		parse_island_coordinates : function (str)
		{
		},

		City_Object : function()
		{
			var City = new Object;

			City.id			 = 0;
			City.name		 = '';
			City.knownTime	 = new Date().getTime();

			return City;
		},

		Parse_Coords : function(str)
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
		},

		Fetch_CitiesSelect : function(database, includeForeign)
		{
			// Requires: DOM, Str
			if (database == undefined)			 { database = {}; }
			if (includeForeign == undefined)	 { includeForeign = false; }

			var Options = this._Parent.DOM.Get_Nodes("//select[@id='citySelect']/option");

			if (Options != null)
			{
				for (var i=0; i < Options.snapshotLength; i++)
				{
					var Option = Options.snapshotItem(i);

					// Occupied city ?
					var isOccupied = false;
					if (this._Parent.DOM.Has_ClassName (Option, 'occupiedCities'))
					{
						isOccupied = true;
					}

					// Deployed troops into allied city
					var isDeployed = false;
					if (this._Parent.DOM.Has_ClassName (Option, 'deployedCities'))
					{
						isDeployed = true;
					}

					if ((includeForeign == false) && ((isOccupied == true) || (isDeployed == true))) { continue; }

					var CityId = parseInt(Option.value);

					if (database[CityId] == undefined)
					{
						database[CityId] = new this.City_Object();
					}

					database[CityId].id 	= CityId;
					database[CityId].name 	= this.trim_coordinates (Option.textContent);
					database[CityId].own	= false;

					if (isOccupied == true)			{ database[CityId].occupied = true; }
					else if (isDeployed == true) 	{ database[CityId].deployed = true; }
					else 							{ database[CityId].own = true; }

					database[CityId].selected = Option.selected;

					if (!isOccupied && !isDeployed)
					{
						config['mycities'][CityId] = database[CityId];
					}
				}
			}

			return database;
		},

		ActionRequest : function()
		{
			if (this._ActionRequest == null)
			{
				this._ActionRequest = this._Parent.DOM.Get_First_Node_Value("//form[@id='changeCityForm']//input[@type='hidden' and @name='actionRequest']" ,'');
			}

			return this._ActionRequest;
		},

		Get_FleetMission_ImgSrc : function(mission)
		{
			// Values: deployarmy, deployfleet, plunder, blockade, defend, defend_port, trade, transport, occupy
			return 'skin/interface/mission_' + mission + '.gif';
		},

		Get_Happiness_ImgSrc : function(growth)
		{
			if (growth == undefined) { growth = 0; }
			var imagen = '';

			if (growth < -6 )		{ imagen = 'outraged'; }
			else if (growth < 0)	{ imagen = 'sad'; }
			else if (growth < 1)	{ imagen = 'neutral'; }
			else if (growth < 6) 	{ imagen = 'happy'; }
			else					{ imagen = 'ecstatic'; }

			//tag = 'skin/smilies/' + imagen + '.gif';
			//tag = 'skin/smilies/' + imagen + '_x32.gif';
			return '/skin/smilies/' + imagen + '_x32.gif';
		},

		resource_capacity : function (warehouse_level, capacity_bonus)
		{
			if (warehouse_level == undefined)	{ warehouse_level = 0; }
			if (capacity_bonus == undefined)	{ capacity_bonus = 1; }

			return 1500 + (warehouse_level * 8000 * capacity_bonus);
		},

		resource_safe : function (warehouse_level, capacity_bonus)
		{
			if (warehouse_level == undefined)	{ warehouse_level = 0; }
			if (capacity_bonus == undefined)	{ capacity_bonus = 1; }

			return (100 + warehouse_level * 480) * capacity_bonus;
		},

		dump_capacity : function (dump_level, capacity_bonus)
		{
			if (dump_level == undefined)		{ dump_level = 0; }
			if (capacity_bonus == undefined)	{ capacity_bonus = 1; }

			return dump_level * 32000 * capacity_bonus;
		},

		dump_safe : function (dump_level, capacity_bonus)
		{
			return 0;
		},

		fleet_movement_object : function()
		{
			var FleetMovement			= new Object;

			FleetMovement.time			= 0;
			return FleetMovement;
		},

		fetch_fleet_movements : function(database)
		{
			// Require: DOM, Str
			var start_time = new Date().getTime();
			this._Parent.Log.Add('Start fetch movements...');
			if (database == undefined) 	{ database = {}; }


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

			var resMi = this._Parent.DOM.Get_Nodes("//div[@id='fleetMovements']//table[contains(@class, 'locationEvents')]/tbody/tr/td/img[contains(@src, 'mission_')]");
			if (resMi.snapshotLength > 0)
			{
				this._Parent.Log.Add('Found ' + resMi.snapshotLength + ' fleets');

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

								var sPart0 = sParts[0].split(':');
								var enddate = 1000*parseInt(this._Parent.Str.trim(sPart0[1]));

								var sPart1 = sParts[1].split(':');
								var currentdate = 1000*parseInt(this._Parent.Str.trim(sPart1[1]));

								var sID = sParts[2].substring(sParts[2].indexOf('"')+1,sParts[2].indexOf('"',sParts[2].indexOf('"')+2));

								mTimers[sID] = start_time + (enddate - currentdate);
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
							database[fleetId] = new this.fleet_movement_object();
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

						database[fleetId].summary = this._Parent.Str.trim(tds[3].childNodes[0].textContent);
						var payload = tds[3].innerHTML;

						// Has fleet ?
						var hasFleet = false;
						if (payload.indexOf('ship_ram') > 0) 				{ hasFleet = true; }
						else if (payload.indexOf('ship_ballista') > 0)		{ hasFleet = true; }
						else if (payload.indexOf('ship_flamethrower') > 0)	{ hasFleet = true; }
						else if (payload.indexOf('ship_catapult') > 0)		{ hasFleet = true; }
						else if (payload.indexOf('ship_steamboat') > 0)		{ hasFleet = true; }
						else if (payload.indexOf('ship_mortar') > 0)		{ hasFleet = true; }
						else if (payload.indexOf('ship_submarine') > 0)		{ hasFleet = true; }

						if (hasFleet == true)		{ database[fleetId].hasFleet = true; }

						// Has Goods ?
						var hasGoods = false;
						if (hasFleet == true)					{ /*Impossible*/ }
						else if (payload.indexOf('wood') > 0) 	{ hasGoods = true; }
						else if (payload.indexOf('wine') > 0) 	{ hasGoods = true; }
						else if (payload.indexOf('marble') > 0)	{ hasGoods = true; }
						else if (payload.indexOf('glass') > 0){ hasGoods = true; }
						else if (payload.indexOf('sulfur') > 0)	{ hasGoods = true; }
						if (hasGoods == true)					{ database[fleetId].hasGoods = true; }

						// Has Army ?
						var hasArmy = false;
						if (hasFleet == true)						{ /*Impossible*/ }
						else if (payload.indexOf('slinger') > 0)	{ hasArmy = true; }
						else if (payload.indexOf('swordsman') > 0)	{ hasArmy = true; }
						else if (payload.indexOf('phalanx') > 0)	{ hasArmy = true; }
						else if (payload.indexOf('spearman') > 0)	{ hasArmy = true; }
						else if (payload.indexOf('archer') > 0)		{ hasArmy = true; }
						else if (payload.indexOf('marksman') > 0)	{ hasArmy = true; }
						else if (payload.indexOf('gyrocopter') > 0)	{ hasArmy = true; }
						else if (payload.indexOf('steamgiant') > 0)	{ hasArmy = true; }
						else if (payload.indexOf('bombardier') > 0)	{ hasArmy = true; }
						else if (payload.indexOf('ram') > 0)		{ hasArmy = true; }
						else if (payload.indexOf('catapult') > 0)	{ hasArmy = true; }
						else if (payload.indexOf('mortar') > 0)		{ hasArmy = true; }
						else if (payload.indexOf('medic') > 0)		{ hasArmy = true; }
						else if (payload.indexOf('cook') > 0)		{ hasArmy = true; }

						if (hasArmy == true)
						{
							database[fleetId].hasArmy = true;
						}

						database[fleetId].oCityId 		= grabCityID(tds[4]);
						if (tds[4].childNodes[0] && tds[4].childNodes[1])
						{
							database[fleetId].oCityName 	= this._Parent.Str.trim(tds[4].childNodes[0].textContent);
							var oPlayerName 				= this._Parent.Str.trim(tds[4].childNodes[1].textContent);
							oPlayerName 					= oPlayerName.substring(1, oPlayerName.length - 1);
							database[fleetId].oPlayerName 	= oPlayerName;
						}

						database[fleetId].tPlayerName 	= tPlayerName;
						database[fleetId].toLeft 		= (tds[5].innerHTML != '') ? true : false;
						database[fleetId].mission 		= /mission_([_a-z]+)\.[a-z]+/i.exec(resMi.snapshotItem(i).src)[1];
						database[fleetId].toRight 		= (tds[7].innerHTML != '') ? true : false;

						database[fleetId].tCityId 		= grabCityID(tds[8]);
						if (tds[8].childNodes[0] && tds[8].childNodes[1])
						{
							database[fleetId].tCityName 	= this._Parent.Str.trim(tds[8].childNodes[0].textContent);
							var tPlayerName 				= this._Parent.Str.trim(tds[8].childNodes[1].textContent);
							tPlayerName 					= tPlayerName.substring(1, tPlayerName.length - 1);
							database[fleetId].tPlayerName 	= tPlayerName;
						}

						database[fleetId].hasAction 	= (tds[8].innerHTML != '') ? true : false;

//						this._Parent.Log.Add('Detect fleet[' + fleetId + ']: oCityId=' + database[fleetId].oCityId + ', tCityId[' + database[fleetId].tCityId + ']: ' + database[fleetId].tCityName + ' (' + database[fleetId].tPlayerName + '), time=' + database[fleetId].time + ', mission=' + database[fleetId].mission);
					}
				}
			}

			return database;
		},

		currentCity : function (valueName, sectionName)
		{
			if (this._currentCity == null)
			{
				if (unsafeWindow.IKARIAM != undefined)
				{
					if (unsafeWindow.IKARIAM.currentCity != undefined)
					{
						this._currentCity = unsafeWindow.IKARIAM.currentCity;
					}
				}
			}

			if (sectionName == undefined)
			{
				if (valueName == undefined)
				{
					return this._currentCity;
				}

				return this._currentCity[valueName] == undefined ? 0 : this._currentCity[valueName];
			}

			if ((this._currentCity[sectionName] == undefined) || (this._currentCity[sectionName][valueName] == undefined))
			{
				return 0;
			}

			return this._currentCity[sectionName][valueName];
		},

		related_city_deployment : function ()
		{
			if ((IM.Ika.view() == 'relatedCities'))
			{
				var city = get_city (current_city.id);

				var self = $("#mainview .contentBox01h").eq(0);
				var content = $('.content .army .troops', self);

				for (unit_id in military_units)
				{
					city.units[unit_id] = { count : 0 };
				}

				$('.armybutton', content).each (function (k, v) {
					var unit_name = $(this).attr('class').replace('armybutton ','');
					var unit_count = '' + parseInt ($(this).text().trim());
					var unit_id = 'unit ' + unit_name;

					city.units[unit_id] = { count : unit_count };
				});

				$('.fleetbutton', content).each (function (k, v) {
					var unit_name = $(this).attr('class').replace('fleetbutton ','');
					var unit_count = '' + parseInt ($(this).text().trim());
					var unit_id = 'unit ' + unit_name;

					city.units[unit_id] = { count : unit_count };
				});

				IM.DB.Save();
			}
		},


	},

/* End of IM.Ika */

/**
* IM.DOM object
*/
	DOM :
	{
		_Parent: null,

		Init : function(parent)
		{
			this._Parent = parent;
		},

		Get_Nodes : function(query)
		{
			//return document.evaluate(query, document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			return document.evaluate(query, document, null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		},

		Get_First_Node : function(path)
		{
			var value = this.Get_Nodes(path);
			return value.snapshotLength >= 1 ? value.snapshotItem(0) : null;
		},

		Get_Last_Node : function(path)
		{
			var value = this.Get_Nodes(path);
			return value.snapshotLength >= 1 ? value.snapshotItem(value.snapshotLength-1) : null ;
		},

		Get_First_Node_Value : function(path, defaultValue)
		{
			var value = this.Get_First_Node(path);
			return value != null ? value.value : defaultValue;
		},

		Get_Last_Node_Value : function(path, defaultValue)
		{
			var value = this.Get_Last_Node(path);
			return value != null ? value.value : defaultValue;
		},

		Get_First_Node_TextContent : function(path, defaultValue)
		{
			var value = this.Get_First_Node(path);
			return value != null ? value.textContent : defaultValue;
		},

		Has_ClassName : function(oElm, strClassName)
		{
			var arrayClassNames = oElm.className.split(' ');
			var Found = false;
			var arrayClassNamesLength = arrayClassNames.length;
			for (var k=0; k<arrayClassNamesLength; k++)
			{
				if (arrayClassNames[k] == strClassName)
				{
					Found = true;
					break;
				}
			}
			return Found;
		}


	},
/* End of IM.DOM object */


/**
 * Lib for strings processes
 */
	Str:
	{
		_Parent:			 null,
		_decimalPoint:		 '.',
		_thousandSeparator:	 ',',

		Init : function(parent)
		{
			this._Parent = parent;
			//this._decimalPoint = this.Get_LocaleDecimalPoint();
		},

		trim : function(str)
		{
			if (str != undefined)
			{
				str = str.replace(/&nbsp;/gi, ' ');
				str = str.replace(/\t/gi, ' ');
				str = str.replace(/\v/gi, '');
				str = str.replace(/\f/gi, '');
				str = str.replace(/\n/gi, '');
				str = str.replace(/\r/gi, '');
				//str = str.replace(/\e/gi, '');
				str = str.replace(/\s/gi, ' ');

				while(str.charAt(0) == (' ')) 			{ str = str.substring(1); }
				while(str.charAt(str.length-1) == ' ' )	{ str = str.substring(0, str.length - 1); }
			}
			return str;
		},

		trim_brackets : function(str)		{ return str.replace(/\(.+\)/gi, ''); },

		trim_accodances : function(str)		{ return str.replace(/\[.+\]/gi, ''); },

		two_digit : function(val)
		{
			val = parseInt(val);

			if (val == 0)			{ val = "00"; }
			else if (val < 10) 		{ return "0" + val;}
			return val;
		},

		/*
		v1 & v2 as "v.00.00.00 0000"

		return 0 if v2 = v1
		1 if v2 > v1
		-1 if v2 < v1
		*/
		Compare_versions : function(v1, v2)
		{
			var result = 0;

			// remove "v."
			v1 = v1.replace(/v\./gi, '');
			v2 = v2.replace(/v\./gi, '');

			// build number use space separator
			v1 = v1.replace(/ /gi, ".");
			v2 = v2.replace(/ /gi, ".");

			// Parse numbers
			var vn1 = v1.split('.');
			var vn2 = v2.split('.');

			// Convert as integer
			for (var i = 0; i < vn1.length; i++)	{ vn1[i] = parseInt(vn1[i]); }
			for (var j = 0; j < vn2.length; j++)	{ vn2[j] = parseInt(vn2[j]); }
			for (var k = 0; k < vn1.length; k++)
			{
				if (vn2[k] == undefined)	{ if (vn1[k] > 0) { result = -1; } break; }
				else if (vn2[k] > vn1[k])	{ result = 1; break; }
				else if (vn2[k] < vn1[k])	{ result = -1; break; }
			}

			if ((result == 0) && (vn2.length > vn1.length))
			{
				if (vn2[vn1.length] > 0)			{ result = 1; }
				else if (vn2[vn2.length-1] > 0)		{ result = 1; }
			}

			//this._Parent.Log.Add(v1 + " vs " + v2 + " = " + result);

			return result;
		},

		to_integer : function(str, defaultValue)
		{
			// Support signed integers
			var temp = '' + str;
			temp = temp.replace(/[^-0-9]+/g, '');
			temp = parseInt(temp);

			if (defaultValue != undefined && (temp == undefined || ('' + temp == IKM.NaN)))
			{
				return defaultValue;
			}
			return temp;
		},

		to_float : function(str, defaultValue, decimalPoint)
		{
			if (decimalPoint == undefined) decimalPoint = this._decimalPoint;
			// Support signed integers
			var temp = '' + str;

			if (decimalPoint == '.')		{ temp = temp.replace(/[^-0-9\.]+/g, ''); }
			else if (decimalPoint == ',')	{ temp = temp.replace(/[^-0-9\,]+/g, ''); }
			else							{ temp = temp.replace(/[^-0-9]+/g, ''); }

			temp = Number(temp);

			if (defaultValue != undefined && (temp == undefined || ('' + temp == IKM.NaN)))
			{
				return defaultValue;
			}
			return temp;
		},

		get_locale_decimal_point : function()
		{
			var _cachedDecimalPoint = new Number(1.5).toLocaleString().substring(1, 2);
			if (_cachedDecimalPoint == undefined || _cachedDecimalPoint == '')
			{
				_cachedDecimalPoint = ".";
			}
			return _cachedDecimalPoint;
		},

		float_format : function(num, fracdigits, alwaysShowSign, decimalPoint)
		{
			if (fracdigits == undefined) 		{ fracdigits = 2; }
			if (alwaysShowSign == undefined) 	{ alwaysShowSign = false; }
			if (decimalPoint == undefined) 		{ decimalPoint = this._decimalPoint; }

			var s = '' + num;
			if (num == IKM.uknown)
			{
				return num;
			}
			var sign = '';
			if (s.substring(0, 1) == '-')
			{
				sign = '-';
				s = s.substring(1);
			}
			else if (alwaysShowSign == true)
			{
				sign = '+';
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

			return sign + s;
		},

		number_format : function(num, alwaysShowSign, thousandSeparator)
		{
			if (alwaysShowSign == undefined) 	{ alwaysShowSign = false; }
			if (thousandSeparator == undefined) { thousandSeparator = this._thousandSeparator; }

			var s = '' + num;
			if (num == undefined || s == IKM.NaN || s == IKM.none)	{ return IKM.no_number; }
			else if (num == IKM.uknown)								{ return num; }

			var sign = '';
			if (s.substring(0, 1) == '-')
			{
				sign = '-';
				s = s.substring(1);
			}
			else if (alwaysShowSign == true)
			{
				sign = '+';
			}

			var i = s.length-3;
			while (i > 0)
			{
				s = s.substring(0, i) + thousandSeparator + s.substring(i);
				i -= 3;
			}
			return sign + s;
		}

	},
/* End of IM.Str */


/**
* IM Event Handlers
*
*/
	Handlers :
	{
		_Parent: null,

		Init: function(parent)
		{
			this._Parent = parent;
		},

		Attach_Events: function()
		{
			this.Attach_ChangeCity_Events();
			// Tooltips
			this.Attach_ArrivingGoods_Events();
			this.Attach_Movements_Events();
			this.Attach_Attacks_Events();
		},

		Attach_ChangeCity_Events: function()
		{
			var self = this;

			var nodes = $x("//table//a[contains(@class,'changeCity')]");
			for(var i=0; i < nodes.length; i++)
			{
				if (current_city.id != nodes[i].getAttribute("cityid"))
				{
					nodes[i].addEventListener('click', function(e) { self.ChangeCity_Click_Event(e); }, false);
				}
			}
		},

		ChangeCity_Click_Event: function(e)
		{
			var obj = e.srcElement ? e.srcElement:e.target;
			obj.style.cursor = "wait";
			document.getElementsByTagName("body")[0].style.cursor="wait";
			while (obj.tagName != 'A')
			{
				obj = obj.parentNode;
			}
			var city_id = obj.getAttribute("cityid");
			this._Parent.Ika._ActionRequest = change_city (city_id);
		},

		Attach_ArrivingGoods_Events: function()
		{
			var self = this;
			var nodes = $x("//div[@id='IkariamManager']//*[contains(@class,'MoreGoods')]");

			for(var i=0; i<nodes.length; i++)
			{
				nodes[i].addEventListener('mouseover', function(e)	{ self.ArrivingGoods_MouseOver_Event(e); }, false);
				nodes[i].addEventListener('mousemove', function(e)	{ self._Parent.Tooltip.mouseMove(e); }, false);
				nodes[i].addEventListener('mouseout', function(e)	{ self._Parent.Tooltip.hide(e); }, false);
			}
		},

		ArrivingGoods_MouseOver_Event: function(e)
		{
			if (!e) { e = window.event; }
			var obj = e.srcElement ? e.srcElement : e.target;
			//var targetObj = obj;
			while (obj.hasAttribute('resource') == false)	{ obj = obj.parentNode; }

			var res_name = obj.getAttribute('resource');

			while (obj.hasAttribute('cityid') == false)		{ obj = obj.parentNode; }
			var city_id = parseInt(obj.getAttribute('cityid'));

			var tooltipHTML = this._Parent.Tooltip.innerHTML(this._Parent.Renders.arriving_goods_tooltip_content (city_id, res_name));
			this._Parent.Tooltip.show(tooltipHTML);
		},

		Attach_Movements_Events: function()
		{
			var self = this;

			var nodes = $x("//div[@id='IkariamManager']//*[contains(@class,'Movements')]");
			for(var i=0; i<nodes.length; i++)
			{
				nodes[i].addEventListener('mouseover', function(e) 	{ self.Movements_MouseOver_Event(e); }, false);
				nodes[i].addEventListener('mousemove', function(e) 	{ self._Parent.Tooltip.mouseMove(e); }, false);
				nodes[i].addEventListener('mouseout', function(e) 	{ self._Parent.Tooltip.hide(e); }, false);
			}
		},

		Movements_MouseOver_Event: function(e)
		{
			if (!e) { e = window.event; }
			var obj = e.srcElement ? e.srcElement : e.target;
			while (obj.hasAttribute('cityid') == false)
			{
				obj = obj.parentNode;
			}
			var city_id = parseInt(obj.getAttribute('cityid'));

			var tooltipHTML = this._Parent.Tooltip.innerHTML(this._Parent.Renders.movements_tooltip_content (city_id));
			this._Parent.Tooltip.show(tooltipHTML);
		},

		Attach_Attacks_Events: function()
		{
			var self = this;

			var nodes = $x("//div[@id='IkariamManager']//*[contains(@class,'Attacks')]");
			for(var i=0; i<nodes.length; i++)
			{
				nodes[i].addEventListener('mouseover', function(e) 	{ self.Attacks_MouseOver_Event(e); }, false);
				nodes[i].addEventListener('mousemove', function(e) 	{ self._Parent.Tooltip.mouseMove(e); }, false);
				nodes[i].addEventListener('mouseout', function(e) 	{ self._Parent.Tooltip.hide(e); }, false);
			}
		},

		Attacks_MouseOver_Event: function(e)
		{
			if (!e) { e = window.event; }
			var obj = e.srcElement ? e.srcElement : e.target;
			while (obj.hasAttribute('cityid') == false)
			{
				obj = obj.parentNode;
			}
			var city_id = parseInt(obj.getAttribute('cityid'));
			//window.status = 'Movements of city by ID : ' + city_id;

			var tooltipHTML = this._Parent.Tooltip.innerHTML(this._Parent.Renders.attacks_tooltip_content(city_id));
			this._Parent.Tooltip.show(tooltipHTML);
		},

		Start_Timers: function()
		{
			// Real-time counters
			window.setInterval(timer_mytime_counter, 1000);
			window.setInterval(timer_realtime_resources, 5000);
		}

	},

/**
* the tooltip object
*/
	Tooltip :
	{
		// setup properties of tooltip object
		_Parent:				 null,
		id:						 "TooltipContainer",
		idParent:				 '',
		offsetx:				 10,
		offsety:				 10,
		_x:						 0,
		_y:						 0,
		_tooltipElement:		 null,
		_saveonmouseover:		 null,

		Init: function(parent, IdName, IdParent)
		{
			if (parent != undefined) 	{ this._Parent = parent; }
			if (IdName != undefined) 	{ this.id		= IdName; }
			if (IdParent != undefined) 	{ this.idParent	= IdParent; }
		},

		CreateContainer: function(IdName, IdParent)
		{
			if (IdName != undefined) 	{ this.id		= IdName; }
			if (IdParent != undefined) 	{ this.idParent	= IdParent; }

			// create tooltip DIV
			var body = document.getElementById(this.idParent);
			var tooltipdiv = document.createElement('div');
			tooltipdiv.id = this.id;
			tooltipdiv.innerHTML = '';
			tooltipdiv.style.visibility = 'hidden';
			body.appendChild(tooltipdiv);
		},

		innerHTML: function (Content, Title)
		{
			if (Content == undefined || Content == '')
			{
				return '';
			}
			else
			{
				var innerHTML = '';
				if (Title == undefined || Title == '')	{ Title = ''; }
				else { Title = "<div class='TTTitle'>" + Title + "</div>"; }

				if (langtype == "rf")	{ innerHTML = "<div dir=rtl class='TTContent RtoL'>" + Title+Content + "</div>"; }
				else					{ innerHTML = "<div class='TTContent'>" + Title+Content + "</div>"; }

				return innerHTML;
			}
		},

		show: function (htmlelement)
		{
			if (document.getElementById)	{ this._tooltipElement = document.getElementById(this.id); }
			else if ( document.all )		{ this._tooltipElement = document.all[this.id].style; }

			this._tooltipElement.innerHTML = htmlelement;

			this.moveTo(this._x + this.offsetx , this._y + this.offsety);

			if (this._tooltipElement.style)	{ this._tooltipElement.style.visibility ="visible"; }
			else							{ this._tooltipElement.visibility = "visible"; }

			return false;
		},

		hide: function(e)
		{
			if (this._tooltipElement.style)	{ this._tooltipElement.style.visibility ="hidden"; }
			else							{ this._tooltipElement.visibility = "hidden"; }
		},

		// Moves the tooltip element
		mouseMove: function(e)
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
			{ // IE6, IE7, IE5.5
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
			}
			else
			{
				this._x = 0;
				this._y = 0;
			}

			var MovX = this._x + this.offsetx;
			if ((MovX+this.GetDivW (this._tooltipElement)) > (this.GetClientW() + this.GetScrollX() - 2))
			{
				MovX = this.GetClientW() + this.GetScrollX() - 2 - this.GetDivW(this._tooltipElement);
			}
			var MovY = this._y - this.offsety - this.GetDivH(this._tooltipElement);
			if (MovY < (this.GetScrollY () + 2))
			{
				MovY = this._y + this.offsety;
			}

			this.moveTo(MovX , MovY);
		},

		GetDivH: function(el)
		{
			return (el ? (el.offsetHeight || el.style.pixelHeight || 0) : 0);
		},

		GetDivW: function(el)
		{
			return (el ? (el.offsetWidth || el.style.pixelWidth || 0) : 0);
		},

		GetClientW: function()
		{
			var tt_db = document.documentElement || document.body || (document.getElementsByTagName ? document.getElementsByTagName("body")[0] : null);
			return (document.body && (typeof(document.body.clientWidth) != 'undefined')
				? document.body.clientWidth
				: (typeof(window.innerWidth) != 'undefined') ? window.innerWidth : tt_db ? (tt_db.clientWidth || 0) : 0);
		},

		GetClientH: function()
		{
			var tt_db = document.documentElement || document.body || (document.getElementsByTagName ? document.getElementsByTagName("body")[0] : null);
			// Exactly this order seems to yield correct values in all major browsers
			return (document.body && (typeof(document.body.clientHeight) != 'undefined')
				? document.body.clientHeight
				: (typeof(window.innerHeight) != 'undefined') ? window.innerHeight : tt_db ? (tt_db.clientHeight || 0) : 0);
		},

		GetScrollX: function()
		{
			var tt_db = document.documentElement || document.body || (document.getElementsByTagName ? document.getElementsByTagName("body")[0] : null);
			return (window.pageXOffset || (tt_db ? (tt_db.scrollLeft || 0) : 0));
		},

		GetScrollY: function()
		{
			var tt_db = document.documentElement || document.body || (document.getElementsByTagName ? document.getElementsByTagName("body")[0] : null);
			return (window.pageYOffset || (tt_db ? (tt_db.scrollTop || 0) : 0));
		},

		// Move the tooltip element
		moveTo: function(xL,yL)
		{
			if (this._tooltipElement.style)
			{
				this._tooltipElement.style.left = xL + "px";
				this._tooltipElement.style.top = yL + "px";
			}
			else
			{
				this._tooltipElement.left = xL;
				this._tooltipElement.top = yL;
			}
		}

	},

	shutdown: function ()
	{
		// do nothing
	}

};

/**
* Link object
*/
var Link =
{
	create : function (text, href, attrs)
	{
		return '<a href="' + href + '" ' + attrs + '>' + text + '</a>';
	},

	resource_conditional : function (condition, text, island_id, city_id, city_index)
	{
		if (condition == true && island_id != undefined && island_id != '')
		{
			return Link.create (text, "?view=resource&type=resource&id=" + island_id, "class=changeCity cityid=" + city_id);
		}
		return text;
	},

	tradegood_conditional : function (condition, text, island_id, city_id, city_index)
	{
		if (condition == true && island_id != undefined && island_id != '')
		{
			return Link.create (text, "?view=tradegood&type=tradegood&id=" + island_id, "class=changeCity cityid=" + city_id);
		}
		return text;
	},

	finance_navy_views : function()
	{
		var rHTML = '';

		rHTML += '<a href="?view=merchantNavy" title="View merchant navy"><img align="absmiddle" src="skin/img/city/building_port.gif" /></a>';
		rHTML += (Tools.View.report_to_survey ('merchantNavy') == IKM.icon_require_attention) ? Tools.require_attention () : '&nbsp;';
		rHTML += '<a href="?view=finances" title="View finances"><img align="absmiddle" src="skin/img/city/building_townhall.gif" /></a>';
		rHTML += (Tools.View.report_to_survey ('finances') == IKM.icon_require_attention) ? Tools.require_attention() : '&nbsp;';

		return rHTML;
	},

	agora : function(city_id)
	{
		var res = get_city (city_id);

		if (res.island_id != undefined)
		{
			return '<a href="?view=islandBoard&id=' + res.island_id + '" title="View island agora"><img hspace="3" height="12" src="skin/board/schriftrolle_offen2.gif" align="absmiddle" /></a>';
		}
		return '';
	},

	city_view : function(city_id)
	{
		var rHTML = '<a href="?view=city&cityId=' + city_id + '" class="changeCity" cityid="' + city_id + '" title="View city"><img align="absmiddle" src="skin/layout/icon-city2.gif" /></a>';

		if (Tools.View.report_to_survey ('city', city_id) == IKM.attention)
		{
			return '<span class="attention" title="' + _t('requireAtt') + '">' + rHTML + '</span>';
		}
		return rHTML + ' ';
	},

	fleet_view : function (city_id)
	{
//		var text = '<img align="absmiddle" src="' + IKM.icon_fleet + '" />';
		var text = '<span class="unitIcon Navy ship_ram"></span>';
		if (Tools.View.report_to_survey ('cityMilitary-fleet', city_id) == IKM.attention)
		{
			text = '<span class="attention" title="' + _t('requireAtt') + '">' + text + '</span>';
		}
		return Link._fleet_view(city_id, text);
	},

	_fleet_view : function (city_id, text)
	{
		return '<a class="linkToView" href="?view=cityMilitary-fleet&id=' + city_id + '" class="iconTrim changeCity" cityid="' + city_id + '" title="View fleet overview">' + text + '</a>';
	},

	army_view : function (city_id)
	{
//		var text = '<img align="absmiddle" src="' + IKM.icon_army + '" />';
		var text = '<span class="unitIcon Army phalanx"></span>';
		if (Tools.View.report_to_survey ('cityMilitary-army', city_id) == IKM.attention)
		{
			text = '<span class="attention" title="' + _t('requireAtt') + '">' + text + '</span>';
		}
		return Link._army_view(city_id, text);
	},


	_army_view : function (city_id, text)
	{
		return '<a class="linkToView" href="?view=cityMilitary-army&id=' + city_id + '" class="iconTrim changeCity" cityid="' + city_id + '" title="View army overview">' + text + '</a>';
	},

	deploy_army : function (city_id, large)
	{
		var res = get_city (city_id);

		var img = (typeof large == 'undefined')
			? '<img class="Action medium" src="' + IKM.icon_move_army + '" align="absmiddle" />'
			: '<span class="moveIcon army"></span>';

		if (current_city.id == city_id)
		{
			return '<img class="Action medium" src="' + IKM.icon_move_army_disabled + '" align="absmiddle" />';
		}

		return '<a class="linkToDeploy" view="deployment" deploymenttype="army" href="?view=deployment&deploymentType=army&destinationCityId=' + city_id + '" title="' + _t('cfg').deploy_army + '">' + img + '</a>';
	},

	deploy_fleet : function (city_id, large)
	{
		var res = get_city (city_id);

		var img = (typeof large == 'undefined')
			? '<img class="Action medium" src="' + IKM.icon_move_fleet + '" align="absmiddle" />'
			: '<span class="moveIcon fleet"></span>';

		if (current_city.id == city_id)
		{
			return '<img class="Action medium" src="' + IKM.icon_move_fleet_disabled + '" align="absmiddle" />';
		}
		return '<a class="linkToDeploy" view="deployment" deploymenttype="fleet" href="?view=deployment&deploymentType=fleet&destinationCityId=' + city_id + '" title="' + _t('cfg').deploy_fleet + '">' + img + '</a>';
	},

	map : function (city_id)
	{
		var res = get_city (city_id);
		var rHTML = '';

		if ((res.island_id != undefined))
		{
			if ((res.city_coord != undefined))
			{
				coordinates = res.city_coord.replace(/(\[|\])?/g, '');
				rHTML += '<a class="linkToMap" href="?view=island&id=' + res.island_id + '&selectCity=' + city_id + '" title="' + res.city_coord + ' View island">' + coordinates + '</a>';
			}
			else
			{
				rHTML += '<a class="linkToMap" href="?view=island&id=' + res.island_id + '&selectCity=' + city_id + '" title="View island"><img align="absmiddle" src="skin/layout/icon-island.gif" /></a>';
			}
		}

		return rHTML;
	},

	transport_goods : function (city_id)
	{
		var res = get_city (city_id);

		var img = '<img class="Action medium" src="' + IKM.icon_transport + '" align="absmiddle" />';
		var img = '<span class="unitIcon Navy ship"></span>';
		if (current_city.id == city_id)
		{
			return '';
		}
		return '<a class="linkToTransportGoods" view="transport" href="?view=transport&destinationCityId=' + city_id + '" title="' + _t('cfg').transport_goods + '">' + img + '</a>';
	},

	resources : function (city_id, prodgood)
	{
		var res = get_city (city_id);

		if (res.island_id == undefined)	{ return ''; }

		var rHTML = '';
		if (prodgood != 1)	{ rHTML += '<a class="linkToResource changeCity" cityid="' + city_id + '" href="?view=resource&type=resource&id=' + res.island_id + '" title="' + _t('wood') + '"><img height="' + IKM.icon_res_size + '" align="absmiddle" src="skin/resources/icon_wood.gif" alt="' + _t('wood') + '" /></a>&nbsp;'; }
		if (prodgood != 0)	{ rHTML += '<a class="linkToResource changeCity" cityid="' + city_id + '" href="?view=tradegood&type=tradegood&id=' + res.island_id + '" title="' + _t(res.prodgood) + '"><img height="' + IKM.icon_res_size + '" align="absmiddle" src="skin/resources/icon_' + res.prodgood + '.gif" alt="' + _t(res.prodgood) + '" /></a>&nbsp;'; }
		return rHTML;
	},

	change_city : function (text, city_id, city_index, sup_text, sup_class, sup_title, extra_params)
	{
		var res = get_city (city_id);
		var rHTML = '';

		if (extra_params == undefined)		{ extra_params = ''; }
		if (res.city_name != undefined)		{ cName = res.city_name; }
		else								{ cName = IM.Ika.trim_coordinates(text); }
		if (current_city.id == city_id)		{ rHTML += '<b class="theCityName">' + cName + '</b>'; }
		else
		{
			rHTML += Link.create (cName, "?cityId=" + city_id + extra_params, "class=\"theCityName\" title=\"Change current city\" onclick=\"var s = document.getElementById('citySelect'); s.selectedIndex=" + city_index + "; s.form.submit(); return false;\"");
		}

		if ((sup_text != undefined) && (sup_text != '') && (sup_text != 0))
		{
			if (sup_class == undefined) 	{ sup_class = ''; }
			if (sup_title == undefined)		{ sup_title = ''; }

//			if (!IM.preference('advancedMode') || sup_text == IKM.attention )
			{
				rHTML += '<span class="' + sup_class + '" title="' + sup_title + '">' + sup_text + '</span>';
			}
		}

		return rHTML;
	},

	townHall : function (text, city_id)
	{
		return '<a href="/?view=townHall&id=' + city_id + '&position=0">' + text + '</a>';
	},


	outer_info : function (city_id, city_link, selected_city, extras)
	{
		if (IM.preference('advancedMode'))
		{
			return this.outer_info_advanced (city_id, city_link, selected_city, extras);
		}

		var from_to = '' + (current_city.name == '' ? '' : _t('cfg').from + current_city.name) + _t('cfg').to + '<b>' + selected_city + '</b>';
		var s = '<span class="outerInfo">'
			+ '<ul>'
			+ '<li><cite>' + this.map (city_id) + '</cite>' + city_link + this.resources (city_id, 1) + this.resources (city_id, 0) + '</li>';
		if (current_city.id != city_id)
		{
			s  += '<li><cite>' + this.transport_goods (city_id) + '</cite> <em class="transportDescription">' + _t('cfg').transport_goods + from_to + '</li>'
				+ '<li><cite>' + this.deploy_army(city_id) + '</cite> <em class="transportDescription">' + _t('cfg').deploy_army + from_to + '</em></li>'
				+ '<li><cite>' + this.deploy_fleet(city_id) + '</cite> <em class="transportDescription">' + _t('cfg').deploy_fleet + from_to + '</li>'
		}

		if (typeof extras != 'undefined')
		{
			s += '<li>'
				+ this.army_view (city_id)
				+ this.fleet_view (city_id)
				+ '</li>';
		}
		s += '</ul></span>';
		return s;
	},

	outer_info_advanced : function (city_id, city_link, selected_city, extras)
	{
		var s = '<span class="outerInfo">'
			+ '<ul>'
			+ '<li><cite>' + this.map (city_id) + '</cite>' + city_link + this.resources (city_id, 1) + this.resources (city_id, 0) + '</li>'
			+ '<li><div class="pad">';
			if (current_city.id != city_id)
			{
				s  += this.transport_goods (city_id, 1)
					+ this.deploy_army(city_id, 1)
					+ this.deploy_fleet(city_id, 1)
			}
			if (typeof extras != 'undefined')
			{
				s += this.army_view (city_id, 1) + this.fleet_view (city_id, 1);
			}

		s += '</div><span class="cboth"></span></li></ul></span>';
		return s;
	},


};

/**
*  Tooltip functions
*/

var Tooltip =
{
	// createTooltipAttribute
	create_attribute : function (tooltip, title, isFct)
	{
		if (tooltip == undefined || tooltip == '')	{ return ''; }
		if (isFct == true) 							{ html = tooltip; }
		else
		{
			if (title == undefined || title == '')	{ title = ''; }
			else 									{ title = "<div class='TTTitle'>" + title + "</div>"; }

			if (langtype == "rf")	{ var html = "<div dir='rtl' class='TTContent RtoL'>" + title+tooltip + "</div>"; }
			else					{ var html = "<div class='TTContent'>" + title+tooltip + "</div>"; }

			html = "'" + html.replace(/'/g, "\\'") + "'";
		}
		return "onmouseover=\"Tip(" + html + ", ABOVE, true, BORDERWIDTH, 0, SHADOW, false, BGCOLOR, '');\"";
	},

	// createTooltip
	create : function(content, tooltip, title)
	{
		if (tooltip == undefined || tooltip == '') { return content; }

		return "<font " + Tooltip.create_attribute (tooltip, title) + ">" + content + "</font>";
	}
};

/**
* Economy
*/
var Economy =
{

	Res : {
		// getCurrentResourceAmount
		current_qty : function(current_time, start_time, start_qty, production_per_hour)
		{
			var elapsed_hours = (current_time - start_time) / 1000.0 / HOUR;
			return Math.max (0, Math.floor(start_qty + elapsed_hours * production_per_hour));
		},

		// createResCounter
		counter : function (start_time, start_qty, production_per_hour, showTooltip, max_capacity, trade_qty, secure_qty, arriving_qty)
		{
			if (trade_qty == undefined) 		{ trade_qty = 0; }
			if (arriving_qty == undefined) 		{ arriving_qty = 0; }
			if ((max_capacity == undefined)
				|| (max_capacity == IKM.none)) 	{ max_capacity = IKM.none; }
			else								{ max_capacity = parseInt(max_capacity) - parseInt(trade_qty); }

			var current_qty = start_qty;
			var tooltip = '';
			var html = '';

			var className = '';
			// Safety goods ?
			if ((start_qty == undefined) || (start_qty + '' == IKM.NaN))
			{
				html = IKM.uknown;
			}
			else if ((production_per_hour != undefined) && (production_per_hour + '' != IKM.NaN) && (production_per_hour != 0))
			{
				production_per_hour = Math.round(production_per_hour);
				var dailyFact = Math.round(24 * production_per_hour);

				if (start_time != undefined)
				{
					current_qty = Economy.Res.current_qty (IM.start_time, start_time, start_qty, production_per_hour);
					if (production_per_hour > 0)
					{
						className += 'Bold';
					}
					else if (production_per_hour <= 0)
					{
						if (current_qty + (IKM.hours_to_empty_warn_red * production_per_hour) <= 0)
						{
							className = 'almostEmpty';
						}
						else if (current_qty + (IKM.hours_to_empty_warn * production_per_hour) <= 0)
						{
							className = 'closeEmpty';
						}
					}

					// Safety goods ?
					if ((secure_qty > 0) && (secure_qty >= (current_qty + trade_qty)))
					{
						className += ' safeRes';
					}
					else { className += ' notSafeRes'; }

					html = "<font id='myresourcecounter' counter='" + start_time + "," + start_qty + "," + production_per_hour + "," + max_capacity + "' class='" + className + "'>" + IM.Str.number_format(current_qty) + "</font>";
				}

				if (showTooltip == true)
				{
					tooltip = 'Hour: ' + IM.Str.number_format(production_per_hour, true) // + " / " + unsafeWindow.LocalizationStrings['timeunits']['short']['hour']
						+ "<br />"
						+ 'Day: ' + IM.Str.number_format(dailyFact, true) // + " / " + unsafeWindow.LocalizationStrings['timeunits']['short']['day'];

					if (production_per_hour < 0)
					{
						tooltip += "<br>" + _t('toEmpty') + ': ' + getTimestring(-1 * (current_qty + arriving_qty) / production_per_hour * HOUR * 1000);
					}
				}
			}
			else
			{
				if ((secure_qty > 0) && (secure_qty >= (current_qty + trade_qty))) { className += 'safeRes'; }
				else { className += ' notSafeRes';}

				html = '<span class="' + className + '">' + IM.Str.number_format(current_qty) + '</span>';
			}

			if (IKM.show_safe_res_icon)
			{
				if ((secure_qty > 0) && (secure_qty >= (current_qty + trade_qty)))
				{
					html = '<img src="' + IKM.icon_safe_res + '" class="Safe" title="Safe Resources" /> ' + html;
				}
			}

			if (tooltip != '')
			{
				html = Tooltip.create (html, tooltip);
			}
			return html + " ";
		},

		// createResProgressBar
		progress_bar : function (start_time, start_qty, production_per_hour, max_capacity, safe_capacity)
		{
			var res = '';

			if ((IM.preference ('PROGRESS_BAR_MODE') != "off") && (max_capacity > 0) && (start_time != undefined))
			{
				var cur_res = Economy.Res.current_qty (new Date().getTime(), start_time, start_qty, production_per_hour);
				var perc = Math.min(100, Math.round(cur_res / max_capacity * 100.0));
				var remaining = '';
				var remhour = 100000000;
				if (cur_res >= max_capacity)
				{
					// no more
					remhour = 0;
				}
				else if (production_per_hour > 0)
				{
					remhour = (max_capacity - cur_res) / production_per_hour;
					//remaining = "<br>" + IM.Str.float_format(remhour, 1) + "h to full";
					remaining = "<td>" + _t('toFull') + "</td><td><b>" + getTimestring (remhour * HOUR * 1000) + "</b></td>";
				}
				else if (production_per_hour < 0)
				{
					//remaining = "<br>" + IM.Str.float_format(cur_res / -production_per_hour, 1) + "h to empty";
					remaining = "<td>" + _t('toEmpty') + "</td><td><b>" + getTimestring((cur_res / -production_per_hour) * HOUR * 1000) + "</b></td>";
				}

				var cl = "Normal";
				var vperc = perc;
				if ((cur_res > 0) && (vperc < 1)) 	{ vperc = 1; }
				if ((IM.preference ('PROGRESS_BAR_MODE') == "time") && (production_per_hour != 0))
				{
					if (remhour <= 1)		{ cl = "Full"; }
					else if (remhour < 24)	{ cl = "AlmostFull"; }
					else if (remhour < 72)	{ cl = "Warning"; }
				}
				else
				{
					if (perc >= 99)			{ cl = "Full"; }
					else if (perc >= 90)	{ cl = "AlmostFull"; }
					else if (perc >= 80)	{ cl = "Warning"; }
				}

				if (safe_capacity == undefined || safe_capacity < 1)
				{
					safe_capacity = 1;
				}
				var safe_percent 	= Math.round ((cur_res / safe_capacity) * 100)
				var not_safe 		= (safe_percent > 100) ? cur_res - safe_capacity : 0;
				safe_percent = not_safe > 0 ? 100-safe_percent : 100;
				safe_percent = Math.abs (safe_percent);

				if (safe_capacity < cur_res) 		{ var sperc = Math.round(safe_capacity / max_capacity * 100.0); }
				else								{ var sperc = Math.round(cur_res / max_capacity * 100.0); }
				if ((cur_res > 0) && (sperc < 1)) 	{ sperc = 1; }
				vperc = vperc - sperc;

				res += "<table class='myPercent' " + Tooltip.create_attribute ("<table>"
							+ "<tr><td>" + _t('total_capacity') + ":</td><td><b>" + IM.Str.number_format(max_capacity) + "</b></td></tr>"
							+ "<tr><td>" + _t('filled') + ":</td><td><b>" + perc + "%</b></td></tr>"
							+ "<tr><td>" + _t('safe_capacity') + ":</td><td><b>" + IM.Str.number_format(safe_capacity) + "</b></td></tr>"
							+ (not_safe > 0 ? "<tr><td>" + _t('not_safe') + ":</td><td><b>" + IM.Str.number_format(not_safe) + "</b></td></tr>" : '')
							+ "<tr>" + remaining + "</tr></table>")
					+ ">"
					+ "<tr>"
					+ "<td width='" + sperc + "%' class='Safe' title='" + sperc + "%'></td>"
					+ "<td width='" + vperc + "%' class='" + cl + "'></td>"
					+ "<td width='" + (100 - vperc) + "%'></td>"
					+ "</tr>"
					+ "</table>";
			}
			else if (IM.preference ('PROGRESS_BAR_MODE') != "off")
			{
				res += "<table class='myPercent'><tr><td></td></tr></table>";
			}
			return res;
		},

		// createProd
		production : function (prodPerHour, extraTooltip)
		{
			if (prodPerHour == IKM.none || prodPerHour == IKM.uknown)
			{
				return prodPerHour;
			}
			if ('' + prodPerHour == IKM.NaN || '' + prodPerHour == '' || '' + prodPerHour == "0" || prodPerHour == undefined || '' + prodPerHour == "???")
			{
				return IKM.no_number;
			}
			var tooltip = IM.Str.number_format(Math.round(24 * prodPerHour), true) + " / " + unsafeWindow.LocalizationStrings['timeunits']['short']['day'];
			if (extraTooltip != undefined)
			{
				tooltip += ", " + extraTooltip;
			}
			return Tooltip.create (IM.Str.number_format(Math.round(prodPerHour), true), tooltip);
		},

		// createSimpleProd
		production_simple : function (prodPerHour)
		{
			if ('' + prodPerHour == IKM.NaN || '' + prodPerHour == '' || '' + prodPerHour == "0" || prodPerHour == undefined || '' + prodPerHour == "???")
			{
				return IKM.no_number;
			}
			return IM.Str.number_format(Math.round(prodPerHour), true);
		},

		// createMoreGoods
		incoming : function (sum)
		{
			return (sum > 0) ? '<font class="More">' + IM.Str.number_format(sum, true) + '&nbsp;</font>' : '';
		},

		// dropUndeliveredLoadingGoods
		drop_undelivered_loading : function()
		{
			var arrivinggoods = Tools.Array.value (config, 'arrivinggoods', []);
			var city_id;
			var i = 0;
			for (city_id in arrivinggoods)
			{
				var rows = Tools.Array.value (arrivinggoods, city_id, []);
				var city = get_city (city_id);
				var key;
				for (key in rows)
				{
					var row = rows[key];
					var quest = Tools.Array.value (row, "quest", '');
					if (quest == 'loading')
					{
						if (delete config.arrivinggoods[city_id][key]) i++;
						continue;
					}
					var arrivetime = parseInt(Tools.Array.value (row, "arrivetime", 0));
					if (IM.start_time < arrivetime)
					{
						if (delete config.arrivinggoods[city_id][key]) i++;
						continue;
					}
				}
			}
			//if (i > 0) window.status = 'Removed ' + i + ' undelivered/loading transports';
		},

		// dropDeliveredGoods
		drop_delivered : function (city_id)
		{
			var rows = Tools.Array.value (config.arrivinggoods, city_id, []);
			var city = get_city (city_id);
			var key;
			var i = 0;
			for (key in rows)
			{
				var row = rows[key];
				var arrivetime = parseInt(Tools.Array.value (row, "arrivetime", 0));
				if (arrivetime <= city.prodtime)
				{
					if (delete config.arrivinggoods[city_id][key]) i++;
				}
			}
			//if (i > 0) window.status = 'Removed ' + i + ' delivered transports';
		},

		// getArrivingGoodsSum
		arriving_sum : function (city_id, res_name)
		{
			var sum = 0;
			var city = get_city (city_id);
			var rows = Tools.Array.value (config.arrivinggoods, city_id, []);
			var key;
			for (key in rows)
			{
				var row = rows[key];
				var res = row["res"];
				var a = Tools.Array.value (res, res_name, 0);
				var arrivetime = parseInt(Tools.Array.value (row, "arrivetime", ''));
				if ((a > 0) && (arrivetime > city.prodtime)) sum += a;
			}
			return sum;
		},

		// getDeliveredGoodsTransports
		delivered_transports : function (city_id, res_name)
		{
			var sum = 0;
			var city = get_city (city_id);
			var rows = Tools.Array.value (config.arrivinggoods, city_id, []);
			var key;
			for (key in rows)
			{
				var row = rows[key];
				var res = row["res"];
				var a = Tools.Array.value (res, res_name, 0);
				var arrivetime = parseInt(Tools.Array.value (row, "arrivetime", ''));
				if ((a > 0) && (arrivetime > city.prodtime) && (IM.start_time >= arrivetime)) sum++;
			}
			return sum;
		},

		// getArrivingGoods
		arriving : function(city_id, res_name, trading_goods, res_qty, ArrivingGoodsSum)
		{
			var sum = 0;
			var found = false;
			if (ArrivingGoodsSum == undefined)
			{
				ArrivingGoodsSum = Economy.Res.arriving_sum (city_id, res_name);
			}
			if (ArrivingGoodsSum > 0)
			{
				sum += ArrivingGoodsSum;
				found = true;
			}

			if ((trading_goods != undefined) && (parseInt(trading_goods) > 0))
			{
				sum += parseInt(trading_goods);
			}

			var s = "<font class='More'>-&nbsp;</font>";
			if (found == true)
			{
				//s = "<font class='More Green' " + Tooltip.create_attribute (tooltip) + ">" + IM.Str.number_format(sum, true) + "</font>";
				s = "<font class='More MoreGoods Green'>" + IM.Str.number_format(sum, true);
				s += (Economy.Res.delivered_transports (city_id, res_name) > 0 ) ? "<sup>*</sup>" : '';
				s += "</font>";
			}
			else if (sum > 0)
			{
				//s = "<font class='More' " + Tooltip.create_attribute (tooltip) + ">" + IM.Str.number_format(sum, true) + "</font>";
				s = "<font class='More MoreGoods'>" + IM.Str.number_format(sum, true) + "&nbsp;</font>";
			}
			return s;
		},

		// digProducedResources
		dig_produced : function (res)
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

			if (found == false)  { return; }

			var aCodeLines = sCode.split(';');
			if (aCodeLines.length < 27) { return; }

			var sWood = aCodeLines[26].substring(aCodeLines[26].indexOf('(')+2,aCodeLines[26].indexOf(')')-1);
			var startResourcesDelta = /production: *([0-9.]+)/.exec(sWood);
			if (startResourcesDelta != null)	{ startResourcesDelta = Math.floor(parseFloat(RegExp.$1) * HOUR); }
			else 								{ startResourcesDelta = 0; }

			var sTradeGood = aCodeLines[29].substring(aCodeLines[29].indexOf('(')+2,aCodeLines[29].indexOf(')')-1);
			var startTradegoodDelta = /production: *([0-9.]+)/.exec(sTradeGood);
			if (startTradegoodDelta != null)	{ startTradegoodDelta = Math.floor(parseFloat(RegExp.$1) * HOUR); }
			else 								{ startTradegoodDelta = 0; }

			var sName = /valueElem: *\"(.*)\"/.exec(sTradeGood);
			var sTradeGoodName = (sName != null) ? sName[1] : '';

			res.prod_wood	= startResourcesDelta;
			res.prod_wine	= 0;
			res.prod_marble	= 0;
			res.prod_crystal	= 0;
			res.prod_sulfur	= 0;
			res.prodtime	= IM.start_time;

			if (sTradeGoodName == "value_wine")			{ res.prod_wine	 = startTradegoodDelta; res.prodgood = 'wine'; }
			else if (sTradeGoodName == "value_marble")	{ res.prod_marble = startTradegoodDelta; res.prodgood = 'marble'; }
			else if (sTradeGoodName == "value_crystal")	{ res.prod_crystal= startTradegoodDelta; res.prodgood = 'crystal'; }
			else if (sTradeGoodName == "value_sulfur")	{ res.prod_sulfur = startTradegoodDelta; res.prodgood = 'sulfur'; }
		}



	},


/**
* Research
*/
	Research :
	{
		// createResearch
		create : function (prodPerHour, extraTooltip)
		{
			if (prodPerHour == IKM.none || prodPerHour == IKM.uknown)
			{
				return prodPerHour;
			}
			if ('' + prodPerHour == "0")
			{
				return '+0';
			}
			if ('' + prodPerHour == IKM.NaN || '' + prodPerHour == '' || prodPerHour == undefined || '' + prodPerHour == "???")
			{
				return '';
			}
			var tooltip = IM.Str.number_format(Math.round(24 * prodPerHour), true) + " / " + unsafeWindow.LocalizationStrings['timeunits']['short']['day'];
			if (extraTooltip != undefined)
			{
				tooltip += ", " + extraTooltip;
			}
			return Tooltip.create (IM.Str.number_format(Math.round(prodPerHour), true), tooltip);
		}

	},


	Income :
	{

		// createIncome
		create : function (prodPerHour, extraTooltip, classname)
		{
			if (classname == undefined) classname = '';
			if ('' + prodPerHour == IKM.NaN || '' + prodPerHour == '' || '' + prodPerHour == IKM.uknown || prodPerHour == undefined || '' + prodPerHour == "???")
			{
				return IKM.uknown;
			}
			else if ('' + prodPerHour == "0")
			{
				return "0";
			}
			else
			{
				var tooltip = "<img src='/skin/resources/icon_gold.gif' align='absmiddle' title='" + _t('Upkeep') + "' /> &nbsp; "
					+ IM.Str.number_format (Math.round(24 * prodPerHour), true) + " / " + unsafeWindow.LocalizationStrings['timeunits']['short']['day'];

				if ((extraTooltip != undefined) && (extraTooltip != ''))
				{
					tooltip += "<br />&nbsp;" + extraTooltip;
				}
				return Tooltip.create ('<span class="' + classname + '">' + IM.Str.number_format(Math.round(prodPerHour), true) + '</span>', tooltip);
			}
		},

		// createReservedGold
		gold_reserved : function(sum)
		{
			if (sum == IKM.uknown)	{ return '<font class="More">' + IKM.uknown + '</font>'; }
			else if (sum === 0)		{ return '<font class="More">' + IKM.no_number + '</font>'; }
			else if ((sum != undefined) && (sum != ''))
			{
				return '<font class="More" title="Reserved gold">' + IM.Str.number_format(sum) + '</font>';
			}
			return '';
		}

	}



};


/**
* Tools object
*/
var Tools =
{
	get_document : function (responseText)
	{
		var html = document.createElement("html");
		html.innerHTML = responseText;
		var response = document.implementation.createDocument('', '', null);
		response.appendChild(html);
		return response;
	},


	City :
	{
		time : function (city_id)
		{
			var city = get_city (city_id);

			if (city.prodtime == undefined) { return 0; }
			else { return city.prodtime; }
		},
	},

	// requireAttention
	require_attention : function  ()
	{
		return '<sup class="attention Red" title="' + _t('requireAtt') + '">' + IKM.icon_require_attention + '</sup>';
	},

	// getFormInput
	form_input : function (path, root, isaction)
	{
		isaction = (isaction == undefined) ? false : true;
		var nodes = $x(path, root);
		if (nodes.length<=0) return null;
		var postdata = nodes[0].name + "=" + nodes[0].value;
		for(var i = 1; i < nodes.length; i++)
		{
			if (nodes[i].name == "actionRequest" && !isaction) nodes[i].value = IM.Ika.ActionRequest();
			postdata = postdata + "&" + nodes[i].name + "=" + nodes[i].value;
		}
		return postdata;
	},


	Array : {

		// getArrValue
		value : function(arr, key, defaultValue)
		{
			return (arr == undefined || arr[key] == undefined) ? defaultValue : arr[key];
		}
	},


	View : {

		// setViewRqTime
		rq_time : function (view, city_id, newTime, force)
		{
			if (view == undefined) 		{ view = ''; }
			if (newTime == undefined) 	{ newTime = IM.start_time; }
			if (force == undefined) 	{ force = false; }

			if ((city_id == undefined) || (city_id <= 0))
			{
				if (view == 'merchantNavy')
				{
					if (config.merchantNavyrqtime == undefined) 		{ config.merchantNavyrqtime = newTime; }
					else if (IM.start_time > config.merchantNavyrqtime)	{ config.merchantNavyrqtime = newTime; }
					else if (newTime < config.merchantNavyrqtime)		{ config.merchantNavyrqtime = newTime; }
					else if (force == true)								{ config.merchantNavyrqtime = newTime; }
				}
				else if (view == 'finances')
				{
					if (config.financesrqtime == undefined)				{ config.financesrqtime = newTime; }
					else if (IM.start_time > config.financesrqtime)		{ config.financesrqtime = newTime; }
					else if (newTime < config.financesrqtime)			{ config.financesrqtime = newTime; }
				}
				else if (view == 'militaryAdvisorMilitaryMovements')
				{
					if (config.mAMMrqtime == undefined)			{ config.mAMMrqtime = newTime; }
					else if (IM.start_time > config.mAMMrqtime)	{ config.mAMMrqtime = newTime; }
					else if (newTime < config.mAMMrqtime)		{ config.mAMMrqtime = newTime; }
				}
			}
			else
				{
				var city = get_city (city_id);
				if (view == '')
				{
					if (city.rqtime == undefined)			{ city.rqtime = newTime; }
					else if (IM.start_time > city.rqtime)	{ city.rqtime = newTime; }
					else if (newTime < city.rqtime)			{ city.rqtime = newTime; }
				}
				else if (view == 'cityMilitary-army')
				{
					if (city.cityMilitaryarmyrqtime == undefined)			{ city.cityMilitaryarmyrqtime = newTime; }
					else if (IM.start_time > city.cityMilitaryarmyrqtime)	{ city.cityMilitaryarmyrqtime = newTime; }
					else if (newTime < city.cityMilitaryarmyrqtime)			{ city.cityMilitaryarmyrqtime = newTime; }
				}
				else if (view == 'cityMilitary-fleet')
				{
					if (city.cityMilitaryfleetrqtime == undefined)			{ city.cityMilitaryfleetrqtime = newTime; }
					else if (IM.start_time > city.cityMilitaryfleetrqtime)	{ city.cityMilitaryfleetrqtime = newTime; }
					else if (newTime < city.cityMilitaryfleetrqtime)		{ city.cityMilitaryfleetrqtime = newTime; }
				}
				else if (city.buildings[view] != undefined)
				{
					if (city.buildings[view].rqtime == undefined)			{ city.buildings[view].rqtime = newTime; }
					else if (IM.start_time > city.buildings[view].rqtime)	{ city.buildings[view].rqtime = newTime; }
					else if (newTime < city.buildings[view].rqtime)			{ city.buildings[view].rqtime = newTime; }
					else if (force == true)									{ city.buildings[view].rqtime = newTime; }
				}
			}
		},

		// reportViewToSurvey
		report_to_survey : function(view, city_id)
		{
			if (view == undefined)		 view = '';
			if (city_id == undefined)	 city_id = 0;
			var report = false;

			if ((city_id == undefined) || (city_id <= 0))
			{
				if (view == 'finances')
				{
					if (config.financestime == undefined)	{ report = true; }
					else if (config.financestime == 0)		{ report = true; }
					else if ((config.financesrqtime != undefined)
						&& (config.financesrqtime <= IM.start_time)
						&& (config.financesrqtime > config.financestime))				{ report = true; }
					else if (config.financestime <= (IM.start_time - 1000 * WEEK))	{ report = true; }
				}
				else if (view == 'merchantNavy')
				{
					if (config.merchantNavytime == undefined)			{ report = true; }
					else if (config.merchantNavytime == 0)				{ report = true; }
					else if ((config.merchantNavyrqtime != undefined) && (config.merchantNavyrqtime <= IM.start_time) && (config.merchantNavyrqtime > config.merchantNavytime))
																		{ report = true; }
					else if (config.merchantNavytime <= (IM.start_time - 1000 * WEEK))	{ report = true; }
				}
				else if (view == 'militaryAdvisorMilitaryMovements')
				{
					if (config.mAMMtime == undefined)					{ report = true; }
					else if (config.mAMMtime == 0)						{ report = true; }
					else if ((config.mAMMrqtime != undefined) && (config.mAMMrqtime <= IM.start_time) && (config.mAMMrqtime > config.mAMMtime))
																		{ report = true; }
					else if (config.mAMMtime <= (IM.start_time - 1000 * WEEK))		{ report = true; }
				}
			}
			else
				{
				var city = get_city (city_id);
				if (view == '')
				{
					if (city.prodtime == undefined)		{ report = true; }
					else if (city.prodtime == 0)		{ report = true; }
					else if ((city.rqtime != undefined) && (city.rqtime <= IM.start_time) && (city.rqtime > city.prodtime))
														{ report = true; }
					else if (city.prodtime <= (IM.start_time - 1000 * WEEK)) 	{ report = true; }
				}
				else if (view == 'city')
				{
					if (city.citytime == undefined) { report = true; }
					else if (city.citytime == 0)	{ report = true; }
				}
				else if ((view == 'cityMilitary-army') || (view == 'barracks'))
				{
					var recentTime = 0;
					if (city.cityMilitaryarmytime != undefined) 	{ recentTime = city.cityMilitaryarmytime; }
					if ((city.buildings['barracks'] != undefined) && (city.buildings['barracks'].uptime > recentTime))
																	{ recentTime = city.buildings['barracks'].uptime; }

					if (recentTime == undefined) 	{ report = true; }
					else if (recentTime == 0)		{ report = true; }
					else if ((city.buildings['barracks'] != undefined) && (city.buildings['barracks'].rqtime != undefined) && (city.buildings['barracks'].rqtime <= IM.start_time) && (city.buildings['barracks'].rqtime > city.buildings['barracks'].uptime))
													{ report = false; }
					else if ((city.cityMilitaryarmyrqtime != undefined) && (city.cityMilitaryarmyrqtime <= IM.start_time) && (city.cityMilitaryarmyrqtime > recentTime))
													{ report = true; }
					else if (recentTime <= (IM.start_time - 1000 * WEEK))
													{ report = true; }
				}

				else if ((view == 'cityMilitary-fleet') || (view == 'shipyard'))
				{
					var recentTime = 0;
					if (city.cityMilitaryfleettime != undefined) recentTime = city.cityMilitaryfleettime;
					if ((city.buildings['shipyard'] != undefined) && (city.buildings['shipyard'].uptime > recentTime)) { recentTime = city.buildings['shipyard'].uptime; }

					if (recentTime == undefined)	{ report = true; }
					else if (recentTime == 0)		{ report = true; }
					else if ((city.buildings['shipyard'] != undefined) && (city.buildings['shipyard'].rqtime != undefined) && (city.buildings['shipyard'].rqtime <= IM.start_time) && (city.buildings['shipyard'].rqtime > city.buildings['shipyard'].uptime))
													{ report = false; }
					else if ((city.cityMilitaryfleetrqtime != undefined) && (city.cityMilitaryfleetrqtime <= IM.start_time) && (city.cityMilitaryfleetrqtime > recentTime))
													{ report = true; }
					else if (recentTime <= (IM.start_time - 1000 * WEEK))
													{ report = true; }
				}

				// Any buildings
				if (buildings[view] != undefined)
				{
					if (city.buildings[view] != undefined)
					{
						if (view == 'townHall')
						{
							if (city.buildings[view].uptime == undefined) 	{ report = true; }
							else if (city.buildings[view].uptime == 0)		{ report = true; }
							else if ((city.buildings[view].rqtime != undefined) && (city.buildings[view].rqtime <= IM.start_time) && (city.buildings[view].rqtime > city.buildings[view].uptime))
																			{ report = true; }
							else if (city.buildings[view].uptime <= (IM.start_time - 1000 * WEEK))	{ report = true; }
						}
						else if (view == 'tavern')
						{
							if (city.buildings[view].uptime == undefined)	{ report = true; }
							else if (city.buildings[view].uptime == 0)		{ report = true; }
						}
						else if (view == 'branchOffice')
						{
							if (city.buildings[view].uptime == undefined)	{ report = true; }
							else if (city.buildings[view].uptime == 0)		{ report = true; }
							else if ((city.buildings[view].rqtime != undefined) && (city.buildings[view].rqtime <= IM.start_time) && (city.buildings[view].rqtime > city.buildings[view].uptime))
																			{ report = true; }
						}
						else
						{
							if (city.buildings[view].uptime == undefined) 	{ }
							else if (city.buildings[view].uptime == 0) 		{ }
							else if ((city.buildings[view].rqtime != undefined) && (city.buildings[view].rqtime <= IM.start_time) && (city.buildings[view].rqtime > city.buildings[view].uptime))
																			{ report = true; }
						}
					}
				}
			}

			return (report == true ? IKM.attention : '');
		},

	},


	Movement :
	{
		movements : function (city_id)
		{
			var res = '';
			var numMovements = 0;
			if (config["movements"] == undefined) 	{ return ''; }
			if (config["movements"][city_id] != undefined)
			{
				for (key in config["movements"][city_id])
				{
					if (config["movements"][city_id][key].endTime >= IM.start_time) { numMovements++; }
				}

				if (numMovements > 0)
				{
					res = '<font class="More Movements">' + _t('cfg').movements.replace('0', numMovements) + '</font>';
				}
			}

			return res;
		},

		movements_simple : function (city_id)
		{
			var res = '';
			var numMovements = 0;
			if (config["movements"] == undefined) 	{ return ''; }
			if (config["movements"][city_id] != undefined)
			{
				for (key in config["movements"][city_id])
				{
					if (config["movements"][city_id][key].endTime >= IM.start_time) { numMovements++; }
				}

				if (numMovements > 0)
				{
					res = '<span class="Movements">' + _t('cfg').movements.replace('0', numMovements) + '</span>';
				}
			}

			return res;
		},

		attacks : function (city_id)
		{
			var res = '';
			var numMovements = 0;
			if (config['attacks'] == undefined) { return ''; }
			if (config['attacks'][city_id] != undefined)
			{
				for (key in config['attacks'][city_id])
				{
					if (config['attacks'][city_id][key].endTime >= IM.start_time) { numMovements++; }
				}

				if (numMovements > 0)
				{
					res = '<font class="More Attacks Red">' + _t('cfg').under_attacks.replace('0', numMovements) + ' </font>';
				}
			}

			return res;
		},

		transports : function (city_id)
		{
			var res = ''; // "<font class='More'></font>";
			var numTransports = 0;

			if (config['transports'] == undefined) { return ''; }
			if (config['transports'][city_id] != undefined)
			{

				for (key in config['transports'][city_id])
				{
					if (config['transports'][city_id][key].endTime >= IM.start_time) { numTransports++; }
				}

				if (numTransports > 0)
				{
					res = '<font class="More">' + _t('cfg').transports.replace('0', numTransports) + '</font>';
				}
			}
			return res;
		}


	},

	City :
	{
		buildings_count : function(city_id, defaultValue)
		{
			if (defaultValue == undefined) defaultValue = 0;
			var count = 0;
			var city = get_city (city_id);

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

			if (count == 0)	{ count = defaultValue; }
			return count;
		}

	},


	Building :
	{
		link : function (city_id, name, defaultValue, position)
		{
			if (defaultValue == undefined) 	{ defaultValue = ''; }
			if (position == undefined)
			{
				position = -1;
				if (name == 'townHall') { position = 0; }
			}
			var link = '';

			if (position == -1)
			{
				// will deprecated
				var city = get_city (city_id);
				link = Tools.Array.value (city.buildings[name], "link", defaultValue);
			}
			else
			{
				link = '?view=' + name + '&id=' + city_id + '&position=' + position;
			}

			if (link == '') 	{ link = defaultValue; }
			return link;
		},

		// Get level instead building upgrading is finished
		level : function (city_id, name, defaultValue, position)
		{
			if (defaultValue == undefined) defaultValue = 0;
			if (position == undefined) position = -1;
			var level = 0;
			var city = get_city (city_id);

			if ((city.buildings == undefined) || (city.buildings[name] == undefined))
			{
				if (name == 'townHall') { level = 1; }
				if (city.underConstructionName == name)
				{
					if (city.underConstructionTime <= IM.start_time) { level++; }
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
					level = Tools.Array.value (city.buildings[name], "level", 0);
				}
				if (city.underConstructionName == name)
				{
					if (city.underConstructionTime <= IM.start_time) level++;
				}
			}
			else if (city.buildings[name].levels != undefined)
			{
				level = city.buildings[name].levels[position];
				// deprecated
				if (level == undefined) level = Tools.Array.value (city.buildings[name], "level", 0);
				if ((city.underConstructionName == name) && (city.underConstructionPosition == position))
				{
					if (city.underConstructionTime <= IM.start_time) level++;
				}
			}

			if (level == 0) level = defaultValue;
			return level;
		},

		count : function(city_id, name, defaultValue)
		{
			if (defaultValue == undefined) defaultValue = 0;
			var count = 0;
			var city = get_city (city_id);

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

			if (count == 0) { count = defaultValue; }
			return count;
		},

		position : function(city_id, name, defaultValue)
		{
			if (defaultValue == undefined) defaultValue = -1;
			var position = -1;
			var city = get_city (city_id);

			if ((city.buildings == undefined) || (city.buildings[name] == undefined))
			{
				if (name == 'townHall') { position = 0; }
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
			else if (name == 'townHall')
			{
				position = 0;
			}

			if (position == -1)
			{
				position = defaultValue;
			}
			return position;
		}

	},



	Population :
	{
		getOnePeopleGrowthTime : function (happiness)
		{
			return (happiness != 0) ? Math.abs (HOUR / 0.02 / happiness * 1000) :  IKM.NaN;
		},

		getEstimate : function (population, start_time, current_time, startHappiness)
		{
			var thappiness = startHappiness;
			start_time = Number(start_time);

			if (thappiness != 0)
			{
				var t = Tools.Population.getOnePeopleGrowthTime(thappiness);
				while (start_time + t < current_time)
				{
					if (thappiness == 0) 		{ break; }
					else if (thappiness > 0)	{ population++; thappiness--; start_time += t; }
					else						{ population--; thappiness++; start_time += t; }

					t = Tools.Population.getOnePeopleGrowthTime(thappiness);
				}
			}

			return population;
		},

		getGrowthRemainingHours : function (population, maxPopulation, start_time, happiness)
		{
			if (maxPopulation - population > happiness)
			{
				return "&#8734;" + unsafeWindow.LocalizationStrings['timeunits']['short']['hour'];
			}
			var time = Number(start_time);
			while (population < maxPopulation)
			{
				var t = Tools.Population.getOnePeopleGrowthTime(happiness);

				if (t == IKM.NaN)
				{
					return "&#8734;" + unsafeWindow.LocalizationStrings['timeunits']['short']['hour'];
				}

				time += t;
				population++;
				happiness--;
			}
			//return IM.Str.float_format((time - Number(start_time)) / 1000 / HOUR, 1) + "h";
			return getTimestring(time - Number(start_time));
		},

		init: function() {}
	},


	init: function() {}

};


function $x( xpath, root )
{
	var doc = root ? root.evaluate ? root : root.ownerDocument : document, next;
	var got = doc.evaluate( xpath, root||doc, null, 0, null ), result = [];

	switch (got.resultType)
	{
		case got.STRING_TYPE:			return got.stringValue;
		case got.NUMBER_TYPE:			return got.numberValue;
		case got.BOOLEAN_TYPE:			return got.booleanValue;
		default:
			while (next = got.iterateNext())
			{
				result.push( next );
			}
			return result;
	}
}

//get node's title attribute

function smartDateFormat(time, showElapsedTime, elapsedTimeSeparator)
{
	if (showElapsedTime != true)			{ showElapsedTime = false; }
	if (elapsedTimeSeparator == undefined)	{ elapsedTimeSeparator = ","; }

	var s = new Date();
	s.setTime(time);
	var now = new Date();
	var t = '';
	if ((1+now.getDate()) == s.getDate() && now.getYear() == s.getYear() && now.getMonth() == s.getMonth())
	{
		t = 'tomorrow ' + IM.Str.two_digit(s.getHours()) + ":" + IM.Str.two_digit(s.getMinutes());
	}
	else if (now.getYear() != s.getYear() || now.getMonth() != s.getMonth() || now.getDate() != s.getDate())
	{
		t = s.toLocaleString();
	}
	else
	{
		t = IM.Str.two_digit(s.getHours()) + ":" + IM.Str.two_digit(s.getMinutes());
	}
	if (showElapsedTime)
	{
		t += elapsedTimeSeparator;
		var d = (now.getTime() - s.getTime()) / 1000;
		if (d < HOUR)
		{
			t += ' ' + Math.floor(d / MINUTE) + "m";
		}
		else
		{
			if (d >= DAY)
			{
				t += ' ' + Math.floor(d / DAY) + "d";
			}
			t += ' ' + IM.Str.float_format((d % DAY) / HOUR, 1) + "h";
		}
	}
	return t;
}

function getTimestring (timestamp,maxDigits,delimiter,approx,showunits,zerofill)
{
	if (typeof timestamp == "undefined")	{ timestamp	= 0; }
	if (typeof maxDigits == "undefined")	{ maxDigits	= 2; }
	if (typeof delimiter == "undefined")	{ delimiter	= ' '; }
	if (typeof approx	 == "undefined")	{ approx	= ''; }
	if (typeof showunits == "undefined")	{ showunits	= true; }
	if( typeof zerofill	 == "undefined")	{ zerofill	= false; }

	var timeunits = [];
	timeunits['day']	= DAY;
	timeunits['hour']	= HOUR;
	timeunits['minute']	= MINUTE;
	timeunits['second']	= SECOND;

	var local =[];
	local['day']	= (showunits) ? unsafeWindow.LocalizationStrings['timeunits']['short']['day']		: '';
	local['hour']	= (showunits) ? unsafeWindow.LocalizationStrings['timeunits']['short']['hour']		: '';
	local['minute']	= (showunits) ? unsafeWindow.LocalizationStrings['timeunits']['short']['minute']	: '';
	local['second']	= (showunits) ? unsafeWindow.LocalizationStrings['timeunits']['short']['second']	: '';

	timestamp = Math.floor(timestamp / 1000);
	var timestring = '';

	for(var k in timeunits)
	{
		var nv=Math.floor(timestamp/timeunits[k]);
		if(maxDigits > 0 && (nv > 0 || (zerofill && timestring != '')))
		{
			timestamp=timestamp-nv*timeunits[k];
			if(timestring != '')
			{
				timestring+=delimiter;
				if (nv < 10 && nv > 0 && zerofill) { nv = "0" + nv; }
				if (nv == 0) { nv = "00"; }
			}
			timestring += nv + local[k];
			maxDigits--;
		}
	}
	if (timestamp > 0)		{ timestring = approx + timestring; }
	return timestring;
}


/**
* Timers
*/
function timer_mytime_counter ()
{
	var current_time = new Date().getTime();
	var cs = IM.DOM.Get_Nodes("//font[contains(@id, 'mytimecounter')]");
	for (var i = 0; i < cs.snapshotLength; i++)
	{
		var c = cs.snapshotItem(i);
		var abstime = Math.round(c.getAttribute('counter'));
		hdata = (abstime - current_time) / 1000;
		if (hdata > 0)
		{
			var s = '';
			s = getTimestring (hdata*1000);
			c.innerHTML = s;
		}
		else
		{
			c.innerHTML = IKM.none;
		}
	}
}

function timer_realtime_resources ()
{
	var current_time = new Date().getTime();
	var counters = IM.DOM.Get_Nodes("//font[contains(@id, 'myresourcecounter')]");
	for(var i=0; i < counters.snapshotLength; i++)
	{
		var c = counters.snapshotItem(i);
		if (c.color != "#ff0000")
		{
			var arr = c.getAttribute('counter').split(",");
			var start_time = arr[0];
			var start_qty = parseFloat(arr[1]);
			var production_per_hour = parseFloat(arr[2]);
			var max_qty = arr[3];

			var current_qty = Economy.Res.current_qty (current_time, start_time, start_qty, production_per_hour);

			if ((max_qty != IKM.none) && (current_qty >= max_qty))
			{
				c.innerHTML = IM.Str.number_format (max_qty);
				c.color = "#ff0000";
			}
			else
			{
				c.innerHTML = IM.Str.number_format(current_qty);
				// + ' (' + Math.floor((current_time-start_time)/1000) + ' s)'
			}
		}
	}
	return (counters.snapshotLength > 0);
}



/**
* Initialize
*/
IM.Init();


/**
* Language settings
*/
function setLanguage()
{
	var Host = IM.Ika.host();
	var arr = Host.split("\.");
	language = arr[arr.length - 1];

	//for example: http://s1.ba.ikariam.com
	if (language == "com" && arr.length == 4) {  language = arr[1]; }

	var l = cfg_get_non_empty ("LANGUAGE", language);
	if (l != undefined) { language = l; }

	IM.Text.load ();
}

/** Get Current city and main view city id */
{
	// lots of code to get the city id. The code trys to find the city id no matter which "city dropdown view" the user has chosen.
	// Fix for v3.1
	var city_id = IM.Str.to_integer(IM.DOM.Get_Last_Node_Value("//select[@id='citySelect']/option[@selected='selected']"), 0);
	var current_city_id = city_id;

	var city_name = IM.DOM.Get_First_Node_TextContent("id('breadcrumbs')/*[@class='city']");
	var city_coord = '';
	var island_id = '';
	var main_view_city_id = 0;

	if (city_name == undefined)
	{
		city_name = '';
	}
	else
	{
		var island_id = IM.DOM.Get_First_Node_TextContent("id('breadcrumbs')//a[@class='island']");
		if ( island_id == undefined || island_id == 0 )	{ island_id = /\[[0-9:]+\]/.exec(IM.DOM.Get_First_Node("id('breadcrumbs')//a[contains(@href,'view=island')]").innerHTML)[0]; }

		if (main_view_city_id == 0) { main_view_city_id = IM.DOM.Get_First_Node_Value("//select[@id='citySelect']/option[contains(text(),'" + IM.Ika.two_digit_coordinates(island_id) + "') and contains(text(),'" + city_name + "')]", 0); }
		if (main_view_city_id == 0) { main_view_city_id = IM.DOM.Get_First_Node_Value("//select[@id='citySelect']/option[contains(text(),'" + city_name + "')]", 0); }

		var main_view_position = -1;

		var a = IM.DOM.Get_First_Node("//div[@id='breadcrumbs']/*[@class='island' and contains(text(), '[')]", '');
		if (a == null)
		{
			a = IM.DOM.Get_First_Node("//a[contains(@href, '?view=island')]/span[contains(text(), '[')]", '');
			if (a != null)
			{
				a = a.parentNode;
			}
		}

		city_coord = '';
		island_id = '';

		if (a != null)
		{
			if (/(\[[0-9:]+\])/.exec(a.innerHTML))
			{
				city_coord = RegExp.$1;
				if (/[?&]id=([0-9]+)/.exec(a.href) != null) { island_id = RegExp.$1; }
			}
		}

		if (island_id == '' && (/view=island&id=([0-9]+)/.exec(document.URL) != null))
		{
			island_id = RegExp.$1;
		}
	}

	main_view_city_id = parseInt (main_view_city_id);

	// selected city object
	var current_city =
	{
		id 		 : city_id,
		name 	 : city_name,
		position : main_view_position,
		own 	 : false,
		main_id	 : main_view_city_id,
		island 	 :
		{
			id 	 : island_id,
			cord : city_coord,
			x 	 : '',
			y 	 : '',
		},
	}
	current_city.own = (current_city.main_id > 0);

	if (current_city.island.cord)
	{
		current_city.island.x = current_city.island.cord.replace('[', '').replace(']','');
		current_city.island.x = current_city.island.x.split(':');
		if (typeof current_city.island.x[1] == 'undefined')
		{
			current_city.island.x = '';
		}
		else
		{
			current_city.island.y = current_city.island.x[1];
			current_city.island.x = current_city.island.x[0];
		}
	}

	// console.log ('Current City (' + current_city.own + ') MAIN ID: ' + current_city.main_id + ' ID: ' + current_city.id + ' NAME: ' + current_city.name + ' coord: ' + current_city.island.cord + ' X: ' + current_city.island.x + ' Y: ' + current_city.island.y + ' island id: ' + current_city.island.id);
} /** End of get Current city and main view city id */


get_city = function (city_id)
{
	city_id = "city_" + city_id;
	if (config[city_id] == undefined)
	{
		config[city_id] = new Resource();
	}
	return config[city_id];
};

// changeCity
change_city = function ( city_id )
{
	var postdata = Tools.form_input ("//form[@id='changeCityForm']//input");
	postdata = postdata + "&cityId=" + city_id + "&view=city";
	var xmlhttp;
	if(window.XMLHttpRequest) { xmlhttp = new XMLHttpRequest(); }

	xmlhttp.open('POST', 'http://' + location.host + '/index.php', false);
	xmlhttp.setRequestHeader('User-agent', 	 window.navigator.userAgent);
	xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
	xmlhttp.setRequestHeader('Accept', 		'application/atom+xml,application/xml,text/xml');
	xmlhttp.setRequestHeader('Referer', 	'http://' + location.host + '/index.php');
	xmlhttp.setRequestHeader('Cookie', 		document.cookie);
	xmlhttp.overrideMimeType('text/javascript; charset=' + document.characterSet);
	xmlhttp.send(postdata);
	var node = Tools.get_document (xmlhttp.responseText);
	return node.getElementsByTagName("input")[2].value;
}


function getNodeTitle(path, defaultValue)
{
	var value = IM.DOM.Get_First_Node(path);
	// Fix for v3
	if ((value != null) && (value.title != ''))
	{
		return value.title;
	}
	return defaultValue;
}

// Fetch gold
var GoldTitle = getNodeTitle ("//div[@id='globalResources']//li[@class='gold']", IKM.uknown);
if (GoldTitle != IKM.uknown)
{
	config.gold = IM.Str.to_integer (GoldTitle, undefined);
}


// Current selected city
if (current_city.id > 0)
{
	var res = get_city (current_city.id);

	res.wood 	= IM.Ika.currentCity ('wood',	'resources');
	res.wine 	= IM.Ika.currentCity ('wine',	'resources');
	res.marble 	= IM.Ika.currentCity ('marble',	'resources');
	res.crystal = IM.Ika.currentCity ('crystal','resources');
	res.sulfur 	= IM.Ika.currentCity ('sulfur',	'resources');

	// Resources to sell
	res.trade_wood = 0;
	var wareNode = IM.DOM.Get_First_Node_TextContent("//div[@id='cityResources']//li[@class='wood']/div[@class='tooltip']");
	if (/: [0-9,.]+[^0-9]+: ([0-9,.]+)/.exec(wareNode) != null)		{ res.trade_wood = parseInt((RegExp.$1).replace(/[^0-9]/g, '')); }

	res.trade_wine = 0;
	var wareNode = IM.DOM.Get_First_Node_TextContent("//div[@id='cityResources']//li[@class='wine']/div[@class='tooltip']");
	if (/: [0-9,.]+[^0-9]+: ([0-9,.]+)/.exec(wareNode) != null)		{ res.trade_wine = parseInt((RegExp.$1).replace(/[^0-9]/g, '')); }

	res.trade_marble = 0;
	var wareNode = IM.DOM.Get_First_Node_TextContent("//div[@id='cityResources']//li[@class='marble']/div[@class='tooltip']");
	if (/: [0-9,.]+[^0-9]+: ([0-9,.]+)/.exec(wareNode) != null)		{ res.trade_marble = parseInt((RegExp.$1).replace(/[^0-9]/g, '')); }

	res.trade_crystal = 0;
	var wareNode = IM.DOM.Get_First_Node_TextContent("//div[@id='cityResources']//li[@class='crystal']/div[@class='tooltip']");
	if (/: [0-9,.]+[^0-9]+: ([0-9,.]+)/.exec(wareNode) != null) 	{ res.trade_crystal = parseInt((RegExp.$1).replace(/[^0-9]/g, '')); }

	res.trade_sulfur = 0;
	var wareNode = IM.DOM.Get_First_Node_TextContent("//div[@id='cityResources']//li[@class='sulfur']/div[@class='tooltip']");
	if (/: [0-9,.]+[^0-9]+: ([0-9,.]+)/.exec(wareNode) != null)		{ res.trade_sulfur = parseInt((RegExp.$1).replace(/[^0-9]/g, '')); }

	Economy.Res.dig_produced (res);

	res.population = 0;
	res.citizens = 0;
	var inhabitantsNode = IM.DOM.Get_First_Node_TextContent("//span[@id='value_inhabitants']");

	if (/([0-9,.]+) \(([0-9,.]+)\)/.exec(inhabitantsNode) != null)
	{
		cizReg = RegExp.$1;
		popReg = RegExp.$2;
		res.population	= IM.Str.to_integer(popReg);
		res.citizens 	= IM.Str.to_integer(cizReg);
	}

	res.actions = IM.DOM.Get_First_Node_TextContent("//span[@id='value_maxActionPoints']");

	Economy.Res.drop_delivered (current_city.id);

	if (IM.View.is('plunder'))
	{
		function reportPlunder()
		{
			//Tools.View.rq_time ('merchantNavy');
			Tools.View.rq_time ('finances');
			Tools.View.rq_time ('militaryAdvisorMilitaryMovements');
			IM.DB.Save();
		}

		var n = document.getElementById("plunderbutton");
		n.addEventListener("click", reportPlunder, false);
	}

	if (IM.View.is('transport'))
	{
		function reportTransport()
		{
			Tools.View.rq_time ('merchantNavy');
			IM.DB.Save();
		}

		var n = document.getElementById("submit");
		n.addEventListener("click", reportTransport, false);
	}

	if (IM.View.is('deployment'))
	{
		var type = 'army';

		if (/deploymentType=(army|fleet)/.exec (document.location.search) != null)
		{
			type = RegExp.$1;
		}

		var self = type == 'army' ? $('#selectArmy') : $('#selectFleet');

		$('.content P', self).eq(0).append ('<div style="text-align:right;"><a href="javascript:;" class="button" id="moveAll">Select all units</a></div>');

		// add button for "Select all units"
		$(document).ready(function() {
			$("#moveAll").click( function(e) {
				$('.content UL.assignUnits LI', self).each( function(k, v)
				{
		//			$('.sliderinput A.setMax', this).trigger('click');
					$('.amount SPAN', this).remove();
					var cnt = $('.amount', this).text().trim();
					$('.textfield', this).val(cnt);

				});
			} );
		});

		function reportDeployment()
		{
			var dType = $("FORM#deploymentForm INPUT[name=function]").val();
			var destinationCityId = $("FORM#deploymentForm INPUT[name=destinationCityId]").val();

			var destinationCity = get_city (destinationCityId);

			// Update units garrisoned
			var city = get_city (current_city.id);

			$('UL.assignUnits LI').each( function (k, v)
			{
				var unit_id = 'unit ' + $(this).attr('class');
				var currentAmount = $('div.amount', this);
				$("SPAN", currentAmount).remove();
				currentAmount = IM.Str.to_integer ($(currentAmount).text(), 0);
				var moveAmount = IM.Str.to_integer ($('INPUT[type=text]', this).val(), 0);

				city.units[unit_id] = { count : (currentAmount - moveAmount) };
			});

			Tools.View.rq_time ('finances');
			Tools.View.rq_time ('militaryAdvisorMilitaryMovements');
			IM.DB.Save();
		}

		var dSubmit = IM.DOM.Get_First_Node("//form[@id='deploymentForm']//input[@type='submit']");
		dSubmit.addEventListener("click", reportDeployment, false);
	}

	if (IM.View.is('resource'))
	{
		function reportResource()
		{
			Tools.View.rq_time ('finances');
			IM.DB.Save();
		}

		var n = document.getElementById("inputWorkersSubmit");
		if (n)
		{
			n.addEventListener("click", reportResource, false);
		}
	}

	if (IM.View.is('tradegood'))
	{
		function reportTradegood()
		{
			Tools.View.rq_time ('finances');
			IM.DB.Save();
		}

		var n = document.getElementById("inputWorkersSubmit");
		n.addEventListener("click", reportTradegood, false);
	}

	if (IM.View.is('city'))
	{
		// check if the city is occupied
		if (config['mycities'][current_city.id] != undefined)
		{
			var occupation_warning = $('.occupation_warning').text().trim();
			config['mycities'][current_city.id].occupation = (occupation_warning != null && occupation_warning != '') ? true : false;
			IM.DB.OwnCities[current_city.id].occupation 	= config['mycities'][current_city.id].occupation;
			IM.DB.Save();
		}
	}

}



// if main view is a city
if (current_city.main_id > 0)
{
	var res = get_city (current_city.main_id);

	if (current_city.name 			!= '')	{ res.city_name = current_city.name; }
	if (current_city.island.cord	!= '')	{ res.city_coord= current_city.island.cord; }
	if (current_city.island.id 		!= '')	{ res.island_id = current_city.island.id; }

	if (IM.View.is('city'))
	{
		// Add new buildings
		var nodes = IM.DOM.Get_Nodes("//li[contains(@id, 'position')]/a[contains(@href, 'view=')]");
		for(var i = 0; i < nodes.snapshotLength; i++)
		{
			var node = nodes.snapshotItem(i);
			var li = node.parentNode;

			var name = li.getAttribute("class");
			if (buildings[name] != undefined)
			{
				if (res.buildings[name] == undefined)
				{
					res.buildings[name] = {};
				}
			}
			else
			{
				if (res.buildings[name] != undefined)
				{ // fix if not building
					try { delete config[current_city.main_id].buildings[name]; }
					catch (e) { }
				}
			}
		}

		var res = get_city (current_city.main_id);

		// Reset levels, links, and positions
		for (name in res.buildings)
		{
			try { delete config[current_city.main_id].buildings[name].levels; }
			catch (e) { }
		}

		var res = get_city (current_city.main_id);
		for (name in res.buildings)
		{
			res.buildings[name].position = -1;
			res.buildings[name].level = 0;
			res.buildings[name].levels = {};
			res.buildings[name].link = '';
		}

		// Fetch levels & positions
		var nodes = IM.DOM.Get_Nodes("//li[contains(@id, 'position')]/a[contains(@href, 'view=')]");
		for(var i = 0; i < nodes.snapshotLength; i++)
		{
			var node = nodes.snapshotItem(i);
			var li = node.parentNode;

			// name
			var name = li.getAttribute("class");
			if (buildings[name] != undefined)
			{
				var position = parseInt(/position=([0-9]+)/.exec(node.href)[1]);
				// deprecated
				res.buildings[name].position = position;

				// level
				var level = IKM.none;
				if (/([0-9]+)/.exec(node.title) != null) {
					level = RegExp.$1;
				}
				// deprecated
				res.buildings[name].level = res.buildings[name].level + parseInt(level);
				res.buildings[name].levels[position] = parseInt(level);

				// link, will deprecated
				res.buildings[name].link = node.href;
			}
		}

		// Nouvelle construction
		var node = IM.DOM.Get_Nodes("//div[@class='constructionSite']/following-sibling::a[contains(@href, 'view=')]");
		if (node.snapshotLength >= 1)
		{
			res.underConstruction = node.snapshotItem(0).title;
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
		} else {
			res.underConstruction = IKM.none;
			res.underConstructionName = '';
			res.underConstructionPosition = -1;
			res.underConstructionTime = 0;
		}

		res.citytime = IM.start_time;
	}

	//military-army and fleet unit counts
	else if (IM.View.is (['cityMilitary-army', 'cityMilitary-fleet']))
	{
		var generals_in_the_city = 0;
		var has_cooks = false;
		var indestructible_units = 0; // cooks + medics

		if (config["unitnames"] == undefined)	{ config["unitnames"] = {}; }
		if (res.units == undefined) 			{ res.units = {}; }

		var names = IM.DOM.Get_Nodes("//table/tbody/tr/th");
		var counts = IM.DOM.Get_Nodes("//table/tbody/tr[@class='count']/td");
		if (names.snapshotLength >= counts.snapshotLength)
		{
			for(var i = 0; i < counts.snapshotLength; i++)
			{
				var n = names.snapshotItem(i).title;

				var unit_id = '';
				//unit_id = unitsAndShipsIndexesR[i + idx];
				if (IM.Ika.view() == "cityMilitary-fleet")
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
				var cnt = IM.Str.to_integer(c.innerHTML, 0);
				if (unit_id == 'unit cook' && cnt > 0)
				{
					has_cooks = cnt;
				}
				if (res.units[unit_id] == undefined)
				{
					res.units[unit_id] = {};
				}
				res.units[unit_id].count = cnt;
				res.units[unit_id].gens = Math.round (cnt * military_units[unit_id][4]);

				if (unit_id == 'unit cook' || unit_id == 'unit medic' || unit_id == 'unit ship_tender')
				{
					indestructible_units += Math.round (cnt * military_units[unit_id][4]);
				}

				generals_in_the_city += res.units[unit_id].gens;
			}
		}

		generals_in_the_city 		= Math.round(generals_in_the_city) - indestructible_units;
		generals_in_the_city_text	= IM.Ika.view() == "cityMilitary-army" ? _t('army') : _t('navy');
		generals_in_the_city_limit	= generals_in_the_city_text == _t('army') ? 4000 : 2000;
		generals_in_the_city_color	= generals_in_the_city > generals_in_the_city_limit ? 'red' : '#008000';

		var generals_string = '<b>' + generals_in_the_city + '</b>';

		if (IM.Ika.view() == "cityMilitary-army")
		{
			generals_string += ' <span title="Cooks and medics">(' + indestructible_units + ')</span>';
			if (has_cooks)
			{
				$('#mainview .buildingDescription').append ('<p style="font-size:32px; color:red;"><img src="/skin/characters/military/x60_y60/y60_cook_faceright.gif" align="absmiddle"> ' + has_cooks + '</p>');
			}
		}

		$('#mainview .buildingDescription').append ('<p style="font-size:larger; color:' + generals_in_the_city_color + ';">' + _t('generals') + ' (' + generals_in_the_city_text + '): ' + generals_string + '</p>');

		if (IM.Ika.view() == "cityMilitary-army")
		{
			res.cityMilitaryarmytime = IM.start_time;
		}
		else if (IM.Ika.view() == "cityMilitary-fleet")
		{
			res.cityMilitaryfleettime = IM.start_time;
		}
	}

	// view is building
	else if (IM.View.is('safehouse') && IM.Ika.Tab() == 'reports')
	{
		$('TABLE.reportTable').each ( function (k, v)
		{
			var generals_in_the_city = [];
			var upkeep_in_the_city = [];
			var djidji = 0;

			var r1 = $('TR', this).eq(0);
			$('TH', r1).each (function (key, value)
			{
				var unit_id = '';
				if ($('img', this).attr('src'))
				{
					var url_unit = $('img', this).attr('src').replace(/(.+)\/y[0-9]+_(.+)_faceright.gif/gi, '$2');

					// it's not unit, it's a ship :D
					if (url_unit.indexOf('/') > -1)
					{
						url_unit = $('img', this).attr('src').replace(/(.+)\/ship_(.+)_r_40x40.gif/gi, 'ship_$2');
					}

					if (url_unit != null)
					{
						unit_id = 'unit ' + url_unit;
					}

					if (url_unit == 'cook' || url_unit == 'medic' || typeof military_units[unit_id] == 'undefined')
					{
						generals_in_the_city[key] = 0;
					}
					else
					{
						generals_in_the_city[key] 	= military_units[unit_id][4];
						upkeep_in_the_city[key] 	= military_units[unit_id][3];
					}
				}

			});

			var r2 = $('TR', this).eq(1);
			$('TD', r2).each (function (key, value)
			{
				var cnt = $(this).text();
				if (cnt == IKM.none)
				{
					generals_in_the_city[key] = NaN;
				}
				else
				{
					generals_in_the_city[key] = Math.round(cnt * generals_in_the_city[key]);
				}
				if (!isNaN(generals_in_the_city[key]))
				{
					$(this).append('<br><span style="color:red;">' + generals_in_the_city[key] + '</span>');
					djidji = djidji + generals_in_the_city[key];
				}

			});

			$(this).append ('<tr><td colspan="50">Total: <span class="djidji" style="color:red;">' + djidji + '</span></td></tr>');
		});
	}

	// view is building
	else if ((buildings[IM.Ika.view()] != undefined) && (IM.Ika.Tab() == ''))
	{

		if (res.buildings[IM.Ika.view()] == undefined)
		{
			res.buildings[IM.Ika.view()] = {};
		}

		// Fetch position
		var position = -1;
		var node = IM.DOM.Get_Nodes("//*[@id='buildingUpgrade']//ul[@class='actions']//a[contains(@href, 'position=')]");
		if (node.snapshotLength == 0)
		{
			node = IM.DOM.Get_Nodes("//*[@id='buildingUpgrade']//a[@class='cancelUpgrade']");
		}
		if (node.snapshotLength >= 1)
		{
			var url_position = /position=([0-9]+)/.exec(node.snapshotItem(0).href);
			if (url_position != null)	{ position = parseInt(RegExp.$1); }
		}
		else if ((res.buildings[IM.Ika.view()].position != undefined) && (res.buildings[IM.Ika.view()].position != -1))
		{
			position = res.buildings[IM.Ika.view()].position;
		}
		else
		{
			position = /[\?&]position=([0-9]+)/.exec(document.URL);
			position = url_position != null ? position = parseInt(RegExp.$1) : -1;
		}

		main_view_position = position;

		// deprecated
		res.buildings[IM.Ika.view()].position = position;

		// Fetch level & detect upgrading
		var n = IM.DOM.Get_First_Node("//*[@id='buildingUpgrade']//*[@class='buildingLevel']");
		if (n != null)
		{
			if (position != -1)
			{
				// Fetch level
				if (res.buildings[IM.Ika.view()].levels == undefined) res.buildings[IM.Ika.view()].levels = {};
				res.buildings[IM.Ika.view()].levels[position] = IM.Str.to_integer(n.innerHTML,0);
			}

			IM.Log.Add('View ' + IM.Ika.view() + ' building level ' + IM.Str.to_integer(n.innerHTML,0) + ' at position ' + position);


			if (res.underConstructionPosition == undefined) { res.underConstructionPosition = -1; }
			if ((res.underConstructionName == IM.Ika.view()) && (res.underConstructionPosition == position))
			{
				res.underConstruction = '';
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
				if (/enddate[^0-9]*([0-9]+)/.exec(sCode) != null)		{ enddate 	  = parseFloat(RegExp.$1) * 1000; }
				if (/currentdate[^0-9]*([0-9]+)/.exec(sCode) != null)	{ currentdate = parseFloat(RegExp.$1) * 1000; }
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
					res.underConstruction = buildings[IM.Ika.view()][0] + " level " + IM.Str.to_integer(n.innerHTML,0);

					res.underConstructionName 		= IM.Ika.view();
					res.underConstructionPosition 	= position;
					res.underConstructionTime 		= enddate - currentdate + new Date().getTime();
				}
			}
		}

		res.buildings[IM.Ika.view()].uptime = IM.start_time;
	}

	//townhall population total and growth
	if (IM.View.is('townHall'))
	{
		res.buildings['townHall'].population = Number(IM.DOM.Get_First_Node_TextContent("//li[contains(@class, 'space')]/span[contains(@class, 'occupied')]", "0"));
		res.population = res.buildings['townHall'].population;
		res.buildings['townHall'].growth = IM.Str.to_float(IM.DOM.Get_First_Node_TextContent("//li[contains(@class, 'growth')]/span[@class='value']", "0"), IKM.uknown,unsafeWindow.LocalizationStrings['decimalPoint']);
		//IM.Log.Add('Growth (from TownHall)=' + res.buildings['townHall'].growth);
		res.buildings['townHall'].bonusspace = Number(IM.DOM.Get_First_Node_TextContent("//li[contains(@class, 'space')]/span[contains(@class, 'total')]", "0")) - townHallSpaces[Tools.Building.level(current_city.main_id, 'townHall', 1, 0)];
		res.buildings['townHall'].happiness	 = Number(IM.DOM.Get_First_Node_TextContent("//div[contains(@class, 'happiness')]/div[@class='value']", "0")) + res.buildings['townHall'].population;
		res.buildings['townHall'].incomegold = Number(IM.DOM.Get_First_Node_TextContent("//li[contains(@class, 'incomegold')]/span[@class='value']", "0"));
		//var raw_income = IM.Str.to_integer(IM.DOM.Get_First_Node_TextContent("//div[@class='citizens']/span[@class='production']", "0"),0);
	}

	else if (IM.View.is('branchOffice'))
	{
		var reservedGold = document.getElementById("reservedGold");
		res.buildings["branchOffice"].reservedGold = reservedGold != null ? IM.Str.to_integer(reservedGold.innerHTML, 0) : 0 ;
	}

	//military-army unit counts
	else if (IM.View.is(['barracks', 'shipyard']))
	{
		var idx = 0;
		if (IM.View.is('shipyard'))				{ idx = 13; }
		if (config["unitnames"] == undefined) 	{ config["unitnames"] = {}; }
		if (config["upkeeps"] == undefined) 	{ config["upkeeps"] = {}; }
		if (res.units == undefined) 			{ res.units = {}; }

		var hasNotices = document.getElementById('notices') ? true : false;

		// Fetch units counters
		var names = IM.DOM.Get_Nodes("//ul[@id='units']/li[contains(@class, 'unit')]/div[@class='unitinfo']/h4");
		var counts = IM.DOM.Get_Nodes("//ul[@id='units']/li[contains(@class, 'unit')]/div[@class='unitinfo']/div[@class='unitcount']");
		var upkeeps = IM.DOM.Get_Nodes("//ul[@id='units']/li[contains(@class, 'unit')]/div[@class='costs']/ul/li[@class='upkeep']");
		if (names.snapshotLength == counts.snapshotLength)
		{
			for (var i = 0; i < names.snapshotLength; i++)
			{
				var node = names.snapshotItem(i);
				var unit_id = '';
				try { unit_id = node.parentNode.parentNode.getAttribute("class"); }
				catch(e) { }

				var uKey = IM.Ika.trim_unit(unit_id);

				var n = node.innerHTML;
				config["unitnames"][unit_id] = n;

				var c = counts.snapshotItem(i);
				var cnt = IM.Str.to_integer(c.innerHTML.replace(/<.+>/g, ''), 0);
				if (res.units[unit_id] == undefined)
				{
					res.units[unit_id] = {};
				}
				res.units[unit_id].count = cnt;

				// Init units under construction
				res.units[unit_id].construction = 0;

				if (hasNotices != true)
				{
					var upkeepElt = upkeeps.snapshotItem(i);
					var upkeep = IM.Str.to_integer(upkeepElt.innerHTML.replace(/<.+>/g, ''), 0);
					config["upkeeps"][uKey] = upkeep;
				}
			}
		}

		// Construction list
		var ucList = IM.DOM.Get_Nodes("//div[@id='unitConstructionList']//div[@class='army_wrapper']/div[contains(@class,'army')]");
		if (ucList.snapshotLength >= 1)
		{
			for (var i = 0; i < ucList.snapshotLength; i++)
			{
				var uDIV = ucList.snapshotItem(i);
				var unit_num = IM.Str.to_integer(uDIV.className);
				var unit_id = 'unit ' + unitsIds[unit_num];
				var AmountInt = Math.abs(IM.Str.to_integer(uDIV.textContent, 1));
				res.units[unit_id].construction = res.units[unit_id].construction + AmountInt;

			}

			var currentdate = unsafeWindow.tmppbar['current_time'];
			var enddate = unsafeWindow.tmppbar['enddate'];
			Tools.View.rq_time (IM.Ika.view(), current_city.main_id, IM.start_time + (enddate - currentdate), true);
		}
	}

	else if (IM.View.is('tavern'))
	{
		function storeWineUsage()
		{
			try
			{
				var city_id = IM.DOM.Get_First_Node_Value("//form[@id='wineAssignForm']/input[@type='hidden' and @name='id']");
				var city = get_city (city_id);
				var n = document.getElementById("wineAmount");
				if (city.wineUsageId != n.selectedIndex)
				{
					Tools.View.rq_time ('townHall', city_id);
				}
				city.wineUsageId = n.selectedIndex;
				city.wineUsage = tavernWineUsage[n.selectedIndex] - getSavedWine();
				IM.DB.Save();
			}
			catch (e)
			{
			}
		}

		// Fix for v3
		function getSavedWine()
		{
			try {
				var n = document.getElementById("savedWine");
				if ((n.innerHTML != '&nbsp;') && (IM.Str.trim(n.innerHTML) != ''))
				{
					return Math.round(parseFloat(n.innerHTML));
				}
				else return 0;
			} catch (e) {
				return 0;
			}
		}
		var n = IM.DOM.Get_First_Node("//form[@id='wineAssignForm']//*[@type='submit']");
		n.addEventListener("click", storeWineUsage, false);

		// New method Thank to TorfDrottel
		var iniValue = 0;
		var savedWine = 0;
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
		res.wineUsageId = iniValue;

		savedWine = unsafeWindow.savedWine[iniValue];
		if ((savedWine == '&nbsp;') || (savedWine == ''))
		{
			savedWine = 0;
		}
		savedWine = Math.round(parseFloat(savedWine));
		res.wineUsage = tavernWineUsage[iniValue] - savedWine;

		IM.Log.Add('Tavern: iniValue= ' + iniValue + ', savedWine=' + savedWine + ', wineUsage=' + res.wineUsage);
	}

	else if (IM.View.is('academy'))
	{
		function listener_report_academy()
		{
			Tools.View.rq_time ('finances');
			IM.DB.Save();
		}

		var n = document.getElementById("inputWorkersSubmit");
		n.addEventListener("click", listener_report_academy, false);

		var n = document.getElementById("valueResearch");
		res.buildings["academy"].Research = IM.Str.to_integer(n.textContent);
	}

	else if (IM.View.is('temple'))
	{
		wonder = {
			id : 0,
			level : 0,
			belief : 0,
			conversion : 0,
			activated : 0,
			cooldown : 0,
		};

		function get_temple_values ()
		{
			var cnt = $('#inputPriests').val();
			wonder.level 		= parseInt ($('.wonder_level_display').text().trim());
			wonder.conversion 	= parseFloat ($('#ownConversion').text().trim());
			wonder.belief 		= $('.wonder_belief_info > div').text().trim();
			wonder.belief 		= wonder.belief.replace(/[^0-9]/g, '');

			var i = $('#setPriests').next();
			wonder.id 			= $('.content', i).attr('class').replace('content wonder','');
			wonder.cooldown 	= $('#cooldown', i).not('.countdown').is(':visible');
			wonder.activated 	= $('#cooldown.countdown', i).is(':visible');

			res.buildings["temple"].priests = parseInt(cnt);
			res.buildings["temple"].wonder = wonder;
		}

		function listener_report_temple ()
		{
			get_temple_values ();

			Tools.View.rq_time ('finances');
			IM.DB.Save();
		}

/*		get_temple_values ();
		IM.DB.Save();

*/		var n = document.getElementById("inputWorkersSubmit");
		n.addEventListener ("click", listener_report_temple, false);
	}

	else if (IM.View.is('workshop'))	{ IM.View.IsBuildingWorkshop(); }

} // end of if main view is a city (current_city.main_id > 0)
else
{
	if (IM.View.is('militaryAdvisorMilitaryMovements')) { IM.View.is_military_movements(); }
	else if (IM.View.is('premium')) 					{ IM.View.is_premium(); }
	else if (IM.View.is('researchOverview')) 			{ IM.View.is_research_overview(); }
	else if (IM.View.is('finances'))					{ IM.View.is_finances(); }
	else if (IM.View.is('merchantNavy'))
	{
		if (config['arrivinggoods'] == undefined) 	{ config['arrivinggoods'] = {}; }

		Economy.Res.drop_undelivered_loading ();
		config['transports'] = {};

		function addTransport (cityID, transportID, endTime, subject, tCityName)
		{
			if (IKM.report_transports)
			{
				if (config['transports'][cityID] == undefined) 					{ config['transports'][cityID] = {}; }
				if (config['transports'][cityID][transportID] == undefined) 	{ config['transports'][cityID][transportID] = {}; }

				config['transports'][cityID][transportID].endTime = endTime;
			}
		}

		function grab_city_id (rootElt)
		{
			var resID = 0;
			var alinks = rootElt.getElementsByTagName('a');
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

		var foundLoading = false;
		var takeSomething = false;
		var resMi = IM.DOM.Get_Nodes ("//div[@id='mainview']//td[contains(@class, 'mission')]");

		if (resMi.snapshotLength > 0)
		{
			var citiesIDs = {};
			var citiesNames = {};
			var res = IM.DOM.Get_Nodes("//select[@id='citySelect']/option");

			for (var i = 0; i < res.snapshotLength; i++)
			{
				var n = res.snapshotItem(i);
				var cName = IM.Ika.trim_coordinates(n.textContent);
				var cID = parseInt(n.value);
				citiesIDs[cName] = cID;
				citiesNames[cID] = cName;
			}

			// heures
			var mTimers = {};
			var scripts = document.getElementsByTagName('script');
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

						var sPart0 = sParts[0].split(':');
						var enddate = 1000*parseInt(IM.Str.trim(sPart0[1]));

						var sPart1 = sParts[1].split(':');
						var currentdate = 1000*parseInt(IM.Str.trim(sPart1[1]));

						var sID = sParts[2].substring(sParts[2].indexOf('"')+1,sParts[2].indexOf('"',sParts[2].indexOf('"')+2));

						mTimers[sID] = IM.start_time + Math.abs(enddate - currentdate);
						IM.Log.Add("mTimers[" + sID + "] = " + (enddate - currentdate));
					}
				}
			}

			// Cargo and mission
			for (var i = 0; i < resMi.snapshotLength; i++)
			{
				var nMi	= resMi.snapshotItem(i);
				var tr	= nMi.parentNode;
				var tds = tr.getElementsByTagName("td");

				var nSource = tds[1];
				var nTarget = tds[3];
				// pillaging
				if (tds.length == 6)							{ var nETA = tds[4]; var nRET = tds[4]; var nAc = tds[5]; }
				// transport
				else if (IM.DOM.Has_ClassName(tds[4],'speed')) 	{ var nETA = tds[5]; var nRET = tds[5]; var nAc = tds[6]; }
				// transport under 0.4.2
				else if (IM.DOM.Has_ClassName(tds[5],'speed'))	{ var nETA = tds[4]; var nRET = tds[6]; var nAc = tds[7]; }
				else											{ var nETA = tds[4]; var nRET = tds[5]; var nAc = tds[6]; }

				if (nETA.id == '') { continue; }
				if (nRET.id == '') { continue; }

				var payload		= tr.nextSibling.getElementsByTagName("img");
				var foundGoods	= false;
				var foundArmy	= false;
				var PayloadGoods = {};

				// Cargo content
				if (payload.length > 0)
				{
					var res_key = '';
					for (var j = 0; j < payload.length; j++)
					{
						if (payload[j].src.indexOf('resources/') > 0)
						{
							var this_resource_name = '';
							if (/icon_(wood|wine|marble|glass|sulfur)\.gif/.exec(payload[j].src) != null)
							{
								this_resource_name = RegExp.$1 == 'glass' ? 'crystal' : RegExp.$1;
							}

							if (res_key == this_resource_name) { continue; }
							res_key = this_resource_name;
							foundGoods = true;
						}
						else if (payload[j].src.indexOf('military/') > 0)	{ res_key = ''; foundArmy = true; continue; }
						else												{ res_key = ''; continue; }

						if ((PayloadGoods[res_key] == undefined) && ((res_key == 'wood') || (res_key == 'wine') || (res_key == 'marble') || (res_key == 'crystal') || (res_key == 'sulfur')))
						{
							var rAmnt = IM.Str.to_integer(payload[j].title);
							PayloadGoods[res_key] = rAmnt;
						}
					}
				}

				var citySource, cityTarget, quest;
				var citySourceID = grab_city_id (nSource);
				var cityTargetID = grab_city_id (nTarget);

				if (nMi.className.indexOf('returning') > 0)
				{
					quest = 'returning';
					if (tr.parentNode.parentNode.parentNode.parentNode.id == 'plunderingTransports')
					{
						if (foundGoods == true)
						{
							citySource = IM.Str.trim(nTarget.textContent);
							cityTarget = citySourceID;
							if (citiesNames[cityTargetID] == undefined)
							{
								citySource = IM.Ika.trim_player_name (nSource.textContent);
								cityTarget = cityTargetID;
							}
						}
						else { continue; }
					}
					else if ((foundArmy == true) && (foundGoods == false)) { continue; }
					else
					{
						if (mTimers[nETA.id] == undefined)
						{
							mTimers[nETA.id] = IM.start_time + (1 * 20 * MINUTE * 1000);
							quest = 'loading';
						}
						citySource = IM.Str.trim(nTarget.textContent);
						cityTarget = citySourceID;
						if (foundArmy == false)	 { addTransport(citiesIDs[IM.Ika.trim_player_name (nSource.textContent)], nETA.id, mTimers[nETA.id]); }
						if (foundGoods == false) { continue; }
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
						citySource = IM.Ika.trim_player_name (nSource.textContent);
						cityTarget = cityTargetID;
						quest = 'gotoown';

						if (mTimers[nETA.id] == undefined)
						{
							mTimers[nETA.id] = IM.start_time + (1 * 20 * MINUTE * 1000);
							quest = 'loading';
						}
						else if (nAc.innerHTML == '')
						{
							citySource = IM.Ika.trim_player_name (nTarget.textContent);
							cityTarget = citySourceID;
							quest = 'halfturn';
						}

						addTransport (citiesIDs[IM.Ika.trim_player_name (nSource.textContent)], nETA.id, mTimers[nETA.id]);

						if (foundGoods == false) { continue; }
					}
				}
				else if (nMi.className.indexOf('gotoforeign') > 0)
				{
					quest = 'gotoforeign';

					if (tr.parentNode.parentNode.parentNode.parentNode.id == 'plunderingTransports')
					{
						quest = 'plundering';

						if ((mTimers[nETA.id] != undefined) && (mTimers[nETA.id] > IM.start_time))
						{
							takeSomething = true;
							Tools.View.rq_time ('merchantNavy', 0, parseInt(mTimers[nETA.id]) + (1000 * MINUTE * 15));
						}
						else if ((mTimers[nRET.id] != undefined) && (mTimers[nRET.id] > IM.start_time))
						{
							takeSomething = true;
							Tools.View.rq_time ('merchantNavy', 0, IM.start_time + (1000 * MINUTE * 15));
						}
						continue;
					}
					else if (foundArmy == true) { continue; }
					else
					{
						if (mTimers[nRET.id] != undefined)		{ addTransport(citiesIDs[IM.Ika.trim_player_name (nSource.textContent)], nETA.id, mTimers[nRET.id]); }
						else if (mTimers[nETA.id] != undefined) { addTransport(citiesIDs[IM.Ika.trim_player_name (nSource.textContent)], nETA.id, mTimers[nETA.id]); }
						else { addTransport(citiesIDs[IM.Ika.trim_player_name (nSource.textContent)], nETA.id, IM.start_time + (1000 * MINUTE * 15)); }

						if ((foundGoods == true) && (nAc.innerHTML != '')) { continue; }

						else if ((foundGoods == true) && (nAc.innerHTML == '') && (mTimers[nETA.id] == undefined))
						{
							citySource = IM.Str.trim(nTarget.textContent);
							cityTarget = citySourceID;
							mTimers[nETA.id] = (mTimers[nRET.id] != undefined) ? mTimers[nRET.id] : IM.start_time + (1 * 20 * MINUTE * 1000);
							quest = 'loading';
						}
						else if ((foundGoods == false) && (nAc.innerHTML != ''))
						{
							if (mTimers[nETA.id] != undefined)
							{
								takeSomething = true;
								Tools.View.rq_time ('merchantNavy', 0, parseInt(mTimers[nETA.id]));
							}
						}

						if (foundGoods == false) { continue; }
					}
				}
				else { continue; }

				if ((foundGoods == true) && (cityTarget != undefined) && (mTimers[nETA.id] != undefined))
				{
					if (config["arrivinggoods"][cityTarget] == undefined) 		{ config["arrivinggoods"][cityTarget] = {};	}

					var idx = nETA.id;
					if (config["arrivinggoods"][cityTarget][idx] == undefined) 	{ config["arrivinggoods"][cityTarget][idx] = {}; }

					config["arrivinggoods"][cityTarget][idx]["startcity"] = citySource;
					if (config["arrivinggoods"][cityTarget][idx]["res"] == undefined)	{ config["arrivinggoods"][cityTarget][idx]["res"] = PayloadGoods; }

					config["arrivinggoods"][cityTarget][idx]["quest"] = quest;
					config["arrivinggoods"][cityTarget][idx]["arrivetime"] = parseInt(mTimers[nETA.id]);

					if (quest != 'loading')
					{
						Tools.View.rq_time ('', cityTarget, parseInt(mTimers[nETA.id]));
					}
					else
					{
						foundLoading = true;
						Tools.View.rq_time ('merchantNavy', 0, IM.start_time + (1000 * MINUTE * 10));
					}
				}
			}
		}

		// disable attention
		if ((foundLoading != true) && (takeSomething != true))
		{
			Tools.View.rq_time ('merchantNavy', 0);
		}

		config.merchantNavytime = IM.start_time;
	}

} // end of else [ main view is a city (current_city.main_id > 0) ]

/**************************************************************************************************
* Render tables
*************************************************************************************************/
function renderTables()
{
	var Cities = IM.DB.OwnCities;

	var s = '';

	var output = {
		BUILDINGS	: '',
		RESOURCES	: '',
		ARMY		: ''
	};

	if (IM.preference ('TABLE_BUILDINGS', true))
	{
		var orderedBuildings =
		{
			townHall 	: 'population',
			tavern		: 'population',
			museum		: 'research',
			academy		: 'research',
			workshop	: 'research',
			temple		: 'research',
			warehouse 	: 'resources',
			dump 		: 'resources',
			branchOffice: 'resources',
			port 		: 'defence',
			wall		: 'defence',
			safehouse	: 'defence',
			barracks	: 'defence',
			shipyard	: 'defence',
			palace		: 'empire',
			palaceColony: 'empire',
			embassy		: 'empire',
			carpentering: 'economy',
			vineyard 	: 'economy',
			architect 	: 'economy',
			optician 	: 'economy',
			fireworker 	: 'economy',
			forester	: 'production',
			winegrower 	: 'production',
			stonemason 	: 'production',
			glassblowing: 'production',
			alchemist 	: 'production',
		};

		var CityId;
		var buildingsCount = [];
		var i = 0;
		for (CityId in Cities)
		{
			for (key in buildings)
			{
				var count = Tools.Building.count (CityId, key, 0);
				if (buildingsCount[key] == undefined || buildingsCount[key] < count)
				{
					buildingsCount[key] = count;
				}
			}
			i++;
		}

		s += "<div id='IkariamManagerBuildings' class='Table'><table class='Overview Buildings' >"
			+ "<thead><tr><th class='city_name' nowrap>"
			+ "<a href='javascript:;' class='IkariamManagerToggle'>" + (IM.preference ('Buildings', true) ? _t('cfg').hide : _t('cfg').show) + "</a>"
			+ "</th>";

		var firstStyle = '';
		var buildsNum = 0;
		var lastTopic = '';

		for (key in orderedBuildings)
		{
			if (buildingsCount[key] > 0)
			{
				// Fix for v3
				var colspan = (buildingsCount[key] > 1) ? ' colspan=' + buildingsCount[key] : '';
				firstStyle = (lastTopic != orderedBuildings[key]) ? "lf" : '';

				var img = "<p align='center' class='pad2'><img src='/skin/img/city/building_" + (key == 'townHall' ? 'townhall' : key) + ".gif' class='buildingImage' style='max-width:60px;'></p>";

				s += "<th" + colspan + " building='" + key + "' class='" + firstStyle + " build_name" + buildingsCount[key] + ' ' + key + "' nowrap " + Tooltip.create_attribute (img, buildings[key][0]) + ">"
					+ "<span class='buildingThumb' id='building_header_" + key + "' ></span>"
					+ "<span class='buildingName'>" + buildings[key][1] + "</span>"
					+ "</th>";

				lastTopic = orderedBuildings[key];
				buildsNum++;
			}
		}

		if (buildsNum <= 1)	{ s += "<th class='lf'></th><th></th><th></th><th></th><th></th><th></th>"; }

		s += "</tr></thead><tbody ";
		if (!IM.preference ('Buildings')) { s += " style='display:none;'"; }
		s += ">";

		var CityId;
		var i = 0;
		for (CityId in Cities)
		{
			var res = get_city (CityId);

			if (Cities[CityId].own)
			{
				var trclass = (parseInt(current_city.id) == parseInt(CityId)) ? "current" : '';
				var city_link = Link.change_city (Cities[CityId].name, CityId, i, (usedspaces > 0) ? 15-usedspaces : '', 'cityFreeSpace', _t('availFS'));
				var usedspaces = Tools.City.buildings_count (CityId, 0);

				if (config['mycities'][CityId].occupation)
				{
					trclass += ' underOccupation';
				}

				s += "<tr class='" + trclass + "' cityid='" + CityId + "' islandid='" + res.island_id + "' coord='" + res.city_coord + "'>";
				s += '<td class="city_name" nowrap>' + Link.outer_info (CityId, city_link, Cities[CityId].name) + Link.resources (CityId, 1) + city_link + "</td>";

				var firstStyle = '';
				var lastTopic = '';

				for (key in orderedBuildings)
				{
					if (buildingsCount[key] > 0)
					{
						firstStyle = (lastTopic != orderedBuildings[key]) ? "lf" : '';

						var buildingCount = 0;

						if (res.buildings[key] != undefined)
						{
							if (res.buildings[key].levels == undefined)
							{
								res.buildings[key].levels = {};
								// deprecated
								var position = Tools.Building.position (parseInt(CityId), key, -1);
								var level	 = Tools.Building.level (parseInt(CityId), key, 0, position);
								res.buildings[key].levels[position] = level;
							}

							var position;
							for (position in res.buildings[key].levels)
							{
								//var position = Tools.Array.value (res.buildings[key], "position", -1);
								//var position = Tools.Building.position (parseInt(CityId), key, -1);

								var building_text = '';

								var currentBuildingStyle = '';
								if ((key == IM.Ika.view()) && (parseInt(CityId) == current_city.main_id) && (position == main_view_position))
								{
									currentBuildingStyle = ' Selected Bold';
								}

								var level = Tools.Building.level (parseInt(CityId), key, IKM.no_building, position);
								if (level == undefined || level == '' || level == 0)
								{
									level = IKM.no_building;
								}

								var link = Tools.Building.link (parseInt(CityId), key, IKM.no_building, position);

								if ((res.underConstructionName == key) && (res.underConstructionPosition == position))
								{
									if (level == IKM.no_building) { level = 0; }
									var underConstructionTime = res.underConstructionTime;
									// deprecated
									if (underConstructionTime == undefined)
									{
										underConstructionTime = res.underConstruction.split(",")[1];
									}
									var sdate = smartDateFormat (underConstructionTime);

									if (underConstructionTime <= IM.start_time)
									{
										building_text = level;
										if (link != IKM.no_building)
										{
											building_text = "<a href='" + link + "' class=\"changeCity Green Bold\" cityid=" + CityId + "><span>" + level + Tools.require_attention () + "</span></a>";
										}

										building_text = Tooltip.create (building_text, sdate, _t('finishedBuilding') + ':' );
									}
									else
									{
										var counter = "<font id='mytimecounter' counter='" + Math.round(underConstructionTime) + "' class='time_counter'>__:__:__</font>";
										building_text = level + IKM.icon_upgrading + IKM.upgrading_prefix + (level+1) + IKM.upgrading_sufix;
										if (link != IKM.no_building)
										{
											building_text = "<a href='" + link + "' class=\"changeCity upgradeInProgress \" cityid=" + CityId + "><span>" + building_text;
											if ((level > 0) && (Tools.View.report_to_survey (key, CityId) == IKM.attention))
											{
												building_text += Tools.require_attention ();
											}
											building_text += "</span></a>";
										}

										building_text = Tooltip.create (building_text, sdate + ' (' + counter + ')', _t('currentlyBuilding') + ':');
									}
								}
								else
								{
									building_text = level;
									if (level != IKM.no_building)
									{
										building_text = "<a href='" + link + "' class=changeCity cityid=" + CityId + "><span>" + level;
										if (Tools.View.report_to_survey (key, CityId) == IKM.attention)
										{
											building_text += Tools.require_attention ();
										}

										building_text += "</span></a>";
									}
								}

								var img = IM.preference ('buildingTooltip')
									? "<span class='myttip'><h6>" + buildings[key][0] + " [" + level + "]</h6><span class='acenter'><img src='/skin/img/city/building_" + (key == 'townHall' ? 'townhall' : key) + ".gif' class='buildingImage' style='max-width:100px;'></span></span>"
									: '';

								s += "<td level='" + level + "' view='" + key + "' position='" + position + "' class='details " + firstStyle + ' ' + key + ' ' + currentBuildingStyle + "'><span>" +  img + building_text + "</span></td>";

								buildingCount++;
								firstStyle = '';
							}
						}
						else
						{
							s += "<td level='0' view='" + key + "' class='details no_building " + firstStyle + ' ' + key + "'>" + IKM.no_building + "</td>";
							buildingCount++;
							firstStyle = '';
						}

						if (buildingCount < buildingsCount[key])
						{
							for (var j = buildingCount; j < buildingsCount[key]; j++)
							{
								s += "<td level='0' view='" + key + "' class='details no_building " + firstStyle + ' ' + key + "'>" + IKM.no_building + "</td>";
								firstStyle = '';
							}
						}

						lastTopic = orderedBuildings[key];
					}
				}

				if (buildsNum <= 1)	{ s += "<td class='lf'></td><td></td><td></td><td></td><td></td><td></td>"; }
			}

			s += "</tr>";
			i++;
		}

		s += "</tbody>";

		s += "<tfoot></tfoot></table>";
		s += "</div>";
//		s += "<p class='Caption'>(<span class=Green>1-14</span>) " + _t('availFS') + ". (<span class=Red>" + IKM.icon_require_attention + "</span>) " + _t('requireAtt') + ".</p>";

		output.BUILDINGS = s;
	}

	if (IM.preference ('TABLE_RESOURCES', true))
	{
		s = "<div id='IkariamManagerResources' class='Table'><table class='Overview Resources'>";
		s += "<thead><tr>";
		s += "<th class='city_name' nowrap>"
			+ "<a href='javascript:;' class='IkariamManagerToggle'>" + (IM.preference ('Resources', true) ? _t('cfg').hide : _t('cfg').show) + "</a> | "
			+ _t('cfg').resources + ": <a href='javascript:;' id='resProductionToggle'>" + (IM.preference ('resProductionAlt', true) ? _t('cfg').right : _t('cfg').left) + "</a> "
			+ "</th>"
			+ "<th colspan='3' class='lf population'><a href=''><img src='/skin/characters/40h/citizen_r.gif' alt='" + _t('Population') + "' /></a></th>"
			+ "<th class='lf research'><a href='?view=researchAdvisor'><img src='/skin/characters/40h/scientist_r.gif' alt='" + _t('Research') + "' /></a></th>"
			+ "<th class='research'><img src='/skin/characters/40h/templer_r.gif' alt='' /></th>"
			+ "<th class='lf incomes'><img src='skin/resources/icon_gold.gif' alt='" + _t('Incomes') + "' /><br />" + _t('Incomes') + "</th>"
			+ "<th colspan='2' class='lf wood' title='" + _t('wood') + "'><img src='skin/resources/icon_wood.gif' alt='" + _t('wood') + "' /><br />" + _t('wood') + "</th>"
			+ "<th colspan='3' class='lf wine' title='" + _t('wine') + "'><img src='skin/resources/icon_wine.gif' alt='" + _t('wine') + "' /><br />" + _t('wine') + "</th>"
			+ "<th colspan='2' class='lf marble' title='" + _t('marble') + "'><img src='skin/resources/icon_marble.gif' alt='" + _t('marble') + "' /><br />" + _t('marble') + "</th>"
			+ "<th colspan='2' class='lf crystal' title='" + _t('crystal') + "'><img src='skin/resources/icon_glass.gif' alt='" + _t('crystal') + "' /><br />" + _t('crystal') + "</th>"
			+ "<th colspan='2' class='lf sulfur' title='" + _t('sulfur') + "'><img src='skin/resources/icon_sulfur.gif' alt='" + _t('sulfur') + "' /><br />" + _t('sulfur') + "</th>"
			+ '';
		s += "</tr></thead>";

		s += "<tbody "
		if (!IM.preference ('Resources', true))
		{
			s += " style='display:none;'";
		}
		s += ">";

		var sum_res = new Resource();
		sum_res.spacetotal = 0;
		sum_res.growth = 0;
		sum_res.Income = 0;
		sum_res.reservedGold = '';
		sum_res.Research = 0;
		sum_res.priests = 0;

		var sum_production = new Resource();
		sum_production.wineUsage = 0;

		var sumArTr = new Resource();

		var CityId;
		var i = 0;

		for (CityId in Cities)
		{
			if (Cities[CityId].own != true)
			{
				continue;
			}
			var res = get_city (CityId);

			var cur_res 	 = new Resource();
			var arriving_res = new Resource();

			var wineUsage;
			var cellarLevel = Tools.Building.level(CityId, 'vineyard', IKM.none);
			if (res.wineUsageId != undefined)
			{
				wineUsage = tavernWineUsage[res.wineUsageId];
				if (cellarLevel != IKM.none)
				{
					wineSave = wineUsage * cellarLevel;
					wineSave = Math.round(wineSave / 100);
					wineUsage = wineUsage - wineSave;
					//res.wineUsage = wineUsage ;
				}
			}
			else if (res.wineUsage != undefined)
			{
				wineUsage = res.wineUsage;
			}
			else
			{
				// on devrait laisser vide, à verifier...
				var tavernLevel = Tools.Building.level(CityId, "tavern", IKM.none);
				wineUsage = (tavernLevel != IKM.none ? tavernWineUsage[tavernLevel] : 0);
				if (cellarLevel != IKM.none)
				{
					wineSave = wineUsage * cellarLevel;
					wineSave = Math.round(wineSave / 100);
					wineUsage = wineUsage - wineSave;
					//res.wineUsage = wineUsage ;
				}
			}

			cur_res.wood 	= Economy.Res.current_qty (IM.start_time, res.prodtime, res.wood, res.prod_wood);
			cur_res.wine 	= Economy.Res.current_qty (IM.start_time, res.prodtime, res.wine, res.prod_wine - wineUsage);
			cur_res.marble 	= Economy.Res.current_qty (IM.start_time, res.prodtime, res.marble, res.prod_marble);
			cur_res.crystal = Economy.Res.current_qty (IM.start_time, res.prodtime, res.crystal, res.prod_crystal);
			cur_res.sulfur 	= Economy.Res.current_qty (IM.start_time, res.prodtime, res.sulfur, res.prod_sulfur);

			if (res.trade_wood == undefined) 	{ res.trade_wood = 0; }
			if (res.trade_wine == undefined) 	{ res.trade_wine = 0; }
			if (res.trade_marble == undefined) 	{ res.trade_marble = 0; }
			if (res.trade_crystal == undefined) { res.trade_crystal = 0; }
			if (res.trade_sulfur == undefined) 	{ res.trade_sulfur = 0; }

			arriving_res.wood 	= Economy.Res.arriving_sum (CityId, 'wood');
			arriving_res.wine 	= Economy.Res.arriving_sum (CityId, 'wine');
			arriving_res.marble	= Economy.Res.arriving_sum (CityId, 'marble');
			arriving_res.crystal= Economy.Res.arriving_sum (CityId, 'crystal');
			arriving_res.sulfur	= Economy.Res.arriving_sum (CityId, 'sulfur');

			sum_res.wood 	+= cur_res.wood;
			sum_res.wine 	+= cur_res.wine;
			sum_res.marble 	+= cur_res.marble;
			sum_res.crystal += cur_res.crystal;
			sum_res.sulfur 	+= cur_res.sulfur;

			sum_production.wood 	+= res.prod_wood;
			sum_production.wine 	+= res.prod_wine;
			sum_production.wineUsage+= wineUsage;
			sum_production.marble 	+= res.prod_marble;
			sum_production.crystal	+= res.prod_crystal;
			sum_production.sulfur	+= res.prod_sulfur;

			sumArTr.wood 	+= res.trade_wood 	+ arriving_res.wood;
			sumArTr.wine 	+= res.trade_wine 	+ arriving_res.wine;
			sumArTr.marble	+= res.trade_marble	+ arriving_res.marble;
			sumArTr.crystal	+= res.trade_crystal 	+ arriving_res.crystal;
			sumArTr.sulfur	+= res.trade_sulfur	+ arriving_res.sulfur;

			var Income = Tools.Array.value (res.buildings['townHall'], "incomegold", IKM.uknown);
			if (Income != IKM.uknown)
			{
				sum_res.Income += Income;
			}

			var reservedGold = '';
			if (res.buildings["branchOffice"] != undefined)
			{
				if (res.buildings["branchOffice"].reservedGold == undefined)
				{
					reservedGold = IKM.uknown;
				}
				else
				{
					reservedGold = res.buildings["branchOffice"].reservedGold;
					if (reservedGold > 0)
					{
						if (sum_res.reservedGold == '') { sum_res.reservedGold = reservedGold; }
						else							{ sum_res.reservedGold += reservedGold; }
					}
				}
			}

			var Research = IKM.none;
			if (Tools.Building.level(CityId, 'academy', 0) > 0)
			{
				Research = Tools.Array.value (res.buildings['academy'], 'Research', IKM.uknown);

				if (Research != IKM.uknown)
				{
					sum_res.Research += Research;
					Research = Economy.Research.create (Research);
					Research = "<a href='" + Tools.Building.link (parseInt(CityId), 'academy', priests, res.buildings['academy'].position) + "'>" + Research + "</a>";
				}
				else
				{
					Research = Economy.Research.create (Research);
				}
			}

			var priests = IKM.none;
			var priests_string = IKM.none;
			var priests_class = IKM.none;

			if (Tools.Building.level(CityId, "temple", 0) > 0)
			{
				priests = Tools.Array.value (res.buildings["temple"], "priests", IKM.uknown);

				if (priests != IKM.uknown)
				{
					sum_res.priests += priests;
					if (res.buildings["temple"].wonder.activated)		{ priests_class = 'wonder_activated'; }
					else if (res.buildings["temple"].wonder.cooldown) 	{ priests_class = 'wonder_cooldown'; }

					var link = Tools.Building.link (parseInt(CityId), 'temple', priests, res.buildings["temple"].position);
					priests_string = Tooltip.create ('<a href=\'' + link + '\'>' + priests + '</a>' + '<font class="More">' + Tools.Array.value (res.buildings["temple"].wonder, "belief", IKM.uknown) + '%</font>',
						'<table><tr>'
						+ '<td nowrap><img src=\'/skin/wonder2/wonder' + Tools.Array.value (res.buildings["temple"].wonder, "id", IKM.uknown) + '.gif\' height=\'80\' hspace=10 /></td>'
						+ '<td nowrap><table><tr><td>Activated</td><td>' + (Tools.Array.value (res.buildings["temple"].wonder, "activated", false) ? "<span class='wonder_activated'>Yes</span>" : 'No') + '</td></tr>'
						+ '<tr><td>Cooldown</td><td>' + (Tools.Array.value (res.buildings["temple"].wonder, "cooldown", false)  ? "<span class='wonder_cooldown'>Yes</span>" : 'No') + '</td></tr>'
						+ '<tr><td>Level</td><td>' + Tools.Array.value (res.buildings["temple"].wonder, "level", IKM.uknown) + '</td></tr>'
						+ '<tr><td>Belief</td><td>' + Tools.Array.value (res.buildings["temple"].wonder, "belief", IKM.uknown) + '%</td></tr>'
						+ '<tr><td>Conversion</td><td>' + Tools.Array.value (res.buildings["temple"].wonder, "conversion", IKM.uknown) + '%</td></tr>'
						+ '</td></tr></table>'
						, 'Temple')
				}
			}

			//var wineRemainingHours = undefined;
			var wine_usage_html = '' + wineUsage;
			if (wineUsage > 0)
			{
				//wineRemainingHours = IM.Str.float_format(cur_res.wine / wineUsage, 1) + " h";
				wine_usage_html = Economy.Res.production_simple (-1 * wineUsage);
			}

			var townHallLevel = Tools.Building.level(CityId, 'townHall', IKM.uknown, 0);
			var happiness	= Tools.Array.value (res.buildings['townHall'], 'happiness', IKM.uknown);
			var population 	= res.population;
			var bonusspace	= Tools.Array.value (res.buildings['townHall'], 'bonusspace', IKM.uknown);
			var spacetotal 	= townHallSpaces[townHallLevel];
			var growth 		= 0;

			//IM.Log.Add('Happy[' + CityId + ']=' + happiness);

			if (happiness != IKM.uknown)
			{
				//IM.Log.Add('Pop[' + CityId + ']=' + population);
				population = Tools.Population.getEstimate (population, res.prodtime, IM.start_time, happiness - population);
				//IM.Log.Add('Estimate pop[' + CityId + ']=' + population);
				if (parseInt(population) > parseInt(spacetotal) + parseInt(bonusspace))
				{
					population = parseInt(spacetotal) + parseInt(bonusspace);
				}
				happiness -= population;

				if (happiness != 0) { growth = (0.02 * happiness) + 0.01; }
			}
			else
			{
				growth = Tools.Array.value (res.buildings['townHall'], 'growth', IKM.uknown);
			}
			//IM.Log.Add('Growth[' + CityId + ']=' + growth);
			sum_res.population += population;

			var growthRemainingHours = IKM.uknown;
			if (happiness != IKM.uknown && happiness > 0 && bonusspace != IKM.uknown && growth >= 0.20)
			{
				growthRemainingHours = Tools.Population.getGrowthRemainingHours (population, parseInt(spacetotal) + parseInt(bonusspace), IM.start_time, happiness);
			}
			if ((growth != IKM.uknown) && (sum_res.growth != IKM.uknown))
			{
				if (parseInt(population) < parseInt(spacetotal) + parseInt(bonusspace)) { sum_res.growth += growth; }
			}
			else
			{
				sum_res.growth = IKM.uknown;
			}

			var trclass = '';
			if (parseInt(current_city.id) == parseInt(CityId))
			{
				trclass = "current";
			}

			var townHallStyle = '';
			var growthStyle = '';
			var missing_population = parseInt(population) -	(parseInt(spacetotal) + parseInt(bonusspace));
			if (parseInt(population) >= parseInt(spacetotal) + parseInt(bonusspace))
			{
				growthRemainingHours = '';
				if (growth >= 1.20) 		{ townHallStyle = " DarkRed"; }
				else if (growth >= 0.20) 	{ townHallStyle = " Brown"; }
				else						{ townHallStyle = " Bold"; }
			}
			else if (growth >= 0.20)		{ growthStyle = " Green"; }
			else if (growth >= 0)			{ growthStyle = ''; }
			else if (growth <= -1)			{ growthStyle = " Red"; }
			else if (growth <= -0.20)		{ growthStyle = " DarkRed"; }

			if (bonusspace != IKM.uknown)
			{
				if (sum_res.spacetotal != IKM.uknown) { sum_res.spacetotal += parseInt(spacetotal) + parseInt(bonusspace); }
				//spacetotal = Tooltip.create (IM.Str.number_format(parseInt(spacetotal) + parseInt(bonusspace)), IM.Str.number_format(spacetotal) + " + " + IM.Str.number_format(bonusspace));
				spacetotal = IM.Str.number_format(parseInt(spacetotal) + parseInt(bonusspace));
			}
			else
			{
				sum_res.spacetotal = IKM.uknown;
				spacetotal = IM.Str.number_format(spacetotal) + " + ?";
			}

			var safe_capacity_bonus = 1;
			var storage_capacity_bonus = 1;
			if (config["premium"] != undefined)
			{
				if ((config["premium"].safe_capacity_bonus != undefined) && (config["premium"].safe_capacity_bonus > IM.start_time))
				{
					safe_capacity_bonus = 2;
				}

				if ((config["premium"].storage_capacity_bonus != undefined) && (config["premium"].storage_capacity_bonus > IM.start_time))
				{
					storage_capacity_bonus = 2;
				}
			}

			var warehouse_level 	= Tools.Building.level (CityId, 'warehouse', 0, -1);
			var dump_level 			= Tools.Building.level (CityId, 'dump', 0, -1);

			var max_capacity_wood 	= IM.Ika.resource_capacity (warehouse_level, storage_capacity_bonus)+ IM.Ika.dump_capacity (dump_level, storage_capacity_bonus) ;
			var max_capacity_other 	= IM.Ika.resource_capacity (warehouse_level, storage_capacity_bonus)+ IM.Ika.dump_capacity (dump_level, storage_capacity_bonus);
			var max_safe_wood 		= IM.Ika.resource_safe (warehouse_level, safe_capacity_bonus) 		+ IM.Ika.dump_safe (dump_level, safe_capacity_bonus);
			var max_safe_other 		= IM.Ika.resource_safe (warehouse_level, safe_capacity_bonus) 		+ IM.Ika.dump_safe (dump_level, safe_capacity_bonus);

			var resProductionClass = 'resProduction';
			if (IM.preference ('resProductionAlt', true))
			{
				resProductionClass += ' alt';
			}

			if (Tools.View.report_to_survey ('', CityId) == IKM.attention)
			{
				var city_link = Link.change_city (Cities[CityId].name, CityId, i, Tools.View.report_to_survey ('', CityId), 'Red', _t('requireAtt'));
			}
			else
			{
				var city_link = Link.change_city (Cities[CityId].name, CityId, i , res.actions, 'actionPoints', _t('availAP'));
			}

//			var city_linkP = Link.townHall ((population > 0 ? IM.Str.number_format(population) : IKM.uknown), CityId);
			var city_linkP = population > 0 ? IM.Str.number_format(population) : IKM.uknown;

			s += "<tr class='" + trclass + "' cityid='" + CityId + "' islandid='" + res.island_id + "' coord='" + res.city_coord + "' tradegood='" + res.prodgood + "'>"
				+ "<td class='city_name'>"
					+ Link.outer_info (CityId, city_link, Cities[CityId].name)
					+ Link.resources (CityId,1) + city_link + Tools.Movement.transports (CityId)
				+ "</td>"
			+ "<td class='lf" + townHallStyle + "'>" + city_linkP + "</td>"
			 + "<td><small>" + spacetotal + "<br /><span title='missing' class='advanced'>" + missing_population + "</span></small></td>"
			 +  "<td class='" + growthStyle + "'>"
				+ (growth != IKM.uknown ? '<img src="' + IM.Ika.Get_Happiness_ImgSrc(growth) + '" align="left" height="25" hspace="2" vspace="0">' : '')
				+ IM.Str.float_format(growth, 2, true)
				+ '<span class="extraInfo advanced"><br />' + growthRemainingHours + '</span>'
				+ "</td>"
			+ "<td class='lf'>" + Research + "</td>"
			+ "<td class='" + priests_class + "'>" + priests_string + "</td>"
			+  "<td class='lf'>"
				+ Economy.Income.create (Income) + Economy.Income.gold_reserved (reservedGold)
			+  "</td>"
			+  "<td class='lf' resource='wood' colspan='2'>"
			+ "<span class='" + resProductionClass + "'>" + Economy.Res.production (res.prod_wood) + '</span>'
				+ Link.resource_conditional (true, Economy.Res.counter (res.prodtime, res.wood, res.prod_wood, false, max_capacity_wood, res.trade_wood, max_safe_wood), res.island_id, CityId, i)
				+ Economy.Res.progress_bar (res.prodtime, res.wood + arriving_res.wood, res.prod_wood, max_capacity_wood - res.trade_wood, max_safe_wood)
				+ Economy.Res.arriving (CityId, 'wood', res.trade_wood, cur_res.wood, arriving_res.wood)
			+ "</td>"
			+  "<td class='lf' resource='wine' colspan='2'>"
				+  "<em class='" + resProductionClass + "'>" + Economy.Res.production_simple (res.prod_wine) + '</em>'
				+ Link.tradegood_conditional ((res.prod_wine > 0) || (res.prodgood == 'wine'), Economy.Res.counter (res.prodtime, res.wine, res.prod_wine - wineUsage, true, max_capacity_other, res.trade_wine, max_safe_other, arriving_res.wine), res.island_id, CityId, i)
				+ Economy.Res.progress_bar (res.prodtime, res.wine + arriving_res.wine, res.prod_wine - wineUsage, max_capacity_other - res.trade_wine, max_safe_other)
				+ Economy.Res.arriving (CityId, 'wine', res.trade_wine, cur_res.wine, arriving_res.wine)
			+ "</td>"
			+ "<td>" + wine_usage_html + "<div class='More'><span class='advanced'>" + (res.prod_wine > 0 ? Economy.Res.production_simple (res.prod_wine - wineUsage) : '') + "</span></div></td>"
			+ "<td class='lf' resource='marble' colspan='2'>"
				+ "<span class='" + resProductionClass + "'>" + Economy.Res.production (res.prod_marble) + '</span>'
				+ Link.tradegood_conditional ((res.prod_marble > 0) || (res.prodgood == 'marble'), Economy.Res.counter (res.prodtime, res.marble, res.prod_marble, false, max_capacity_other, res.trade_marble, max_safe_other), res.island_id, CityId, i)
				+ Economy.Res.progress_bar (res.prodtime, res.marble + arriving_res.marble, res.prod_marble, max_capacity_other - res.trade_marble, max_safe_other)
				+ Economy.Res.arriving (CityId, 'marble', res.trade_marble, cur_res.marble, arriving_res.marble)
			+ "</td>"
			+ "<td class='lf' resource='crystal' colspan='2'>"
			+ "<span class='" + resProductionClass + "'>" + Economy.Res.production (res.prod_crystal) + '</span>'
				+ Link.tradegood_conditional ((res.prod_crystal > 0) || (res.prodgood == 'crystal'), Economy.Res.counter (res.prodtime, res.crystal, res.prod_crystal, false, max_capacity_other, res.trade_crystal, max_safe_other), res.island_id, CityId, i)
				+ Economy.Res.progress_bar (res.prodtime, res.crystal + arriving_res.crystal, res.prod_crystal, max_capacity_other - res.trade_crystal, max_safe_other)
				+ Economy.Res.arriving (CityId, 'crystal', res.trade_crystal, cur_res.crystal, arriving_res.crystal)
			+ "</td>"
			+  "<td class='lf' resource='sulfur' colspan='2'>"
				+ "<span class='" + resProductionClass + "'>" + Economy.Res.production (res.prod_sulfur) + '</span>'
				+ Link.tradegood_conditional ((res.prod_sulfur > 0) || (res.prodgood == 'sulfur'), Economy.Res.counter (res.prodtime, res.sulfur, res.prod_sulfur, false, max_capacity_other, res.trade_sulfur, max_safe_other), res.island_id, CityId, i)
				+ Economy.Res.progress_bar (res.prodtime, res.sulfur + arriving_res.sulfur, res.prod_sulfur, max_capacity_other - res.trade_sulfur, max_safe_other)
				+ Economy.Res.arriving (CityId, 'sulfur', res.trade_sulfur, cur_res.sulfur, arriving_res.sulfur)
			+ "</td>"
			+ "</tr>";
			i++;
		}

		s += "</tbody>";

		var goldRemainingHours = '';
		var goldStyle = '';
		if (sum_res.Income < 0)
		{
			var RemainingHours = -1 * config.gold / sum_res.Income;
			if (RemainingHours <= 6)			{ goldStyle = 'Red'; }
			else if (RemainingHours <= 72) 		{ goldStyle = 'DarkRed'; }

			//goldRemainingHours = IM.Str.float_format(RemainingHours, 1) + " h";
			goldRemainingHours = getTimestring (RemainingHours * DAY * 1000) + " to expense";
		}

		s += "<tfoot class='Summary'><tr>";
		s += "<td class='city_name'><img class='fright' vspace='2' hspace='5' src='skin/layout/sigma.gif'></td>"
			+ "<td class='lf'>"		+ IM.Str.number_format(sum_res.population) + "</td>"
			+ "<td>" 				+ IM.Str.number_format(sum_res.spacetotal) + "</td>"
			+ "<td>" 				+ IM.Str.float_format(sum_res.growth,2,true) + "</td>"
			+ "<td class='lf'>"		+ Economy.Research.create (sum_res.Research) + "</td>"
			+ "<td>"				+ sum_res.priests + "</td>"
			+ "<td class='lf'>" 	+ Economy.Income.create (sum_res.Income, goldRemainingHours, goldStyle)
									+ Economy.Income.gold_reserved (sum_res.reservedGold) + "</td>"
			+ "<td class='lf' colspan='2'>"
									+ "<span class='" + resProductionClass + "'>" + Economy.Res.production (sum_production.wood) + "</span>"
									+ Economy.Res.counter (IM.start_time, sum_res.wood, sum_production.wood)
									+ Economy.Res.incoming (sumArTr.wood) + "</td>"
			+ "<td class='lf' colspan='2'>"
									+ "<span class='" + resProductionClass + "'>" + Economy.Res.production (sum_production.wine) + "</span>"
									+ Economy.Res.counter (IM.start_time, sum_res.wine, sum_production.wine - sum_production.wineUsage, true)
									+ Economy.Res.incoming (sumArTr.wine) + "</td>"
			+ "<td>" 				+ Economy.Res.production_simple (-1 * sum_production.wineUsage) + "</td>"
			+ "<td class='lf' colspan='2'>"
									+ "<span class='" + resProductionClass + "'>" + Economy.Res.production (sum_production.marble) + "</span>"
									+ Economy.Res.counter (IM.start_time, sum_res.marble, sum_production.marble)
									+ Economy.Res.incoming (sumArTr.marble) + "</td>"
			+ "<td class='lf' colspan='2'>"
									+ "<span class='" + resProductionClass + "'>" + Economy.Res.production (sum_production.crystal) + "</span>"
									+ Economy.Res.counter (IM.start_time, sum_res.crystal, sum_production.crystal)
									+ Economy.Res.incoming (sumArTr.crystal) + "</td>"
			+ "<td class='lf' colspan='2'>"
									+ "<span class='" + resProductionClass + "'>" + Economy.Res.production (sum_production.sulfur) + "</span>"
									+ Economy.Res.counter (IM.start_time, sum_res.sulfur, sum_production.sulfur)
									+ Economy.Res.incoming (sumArTr.sulfur) + "</td>"
		s += "</tr></tfoot></table>";
		s += "</div>";

		output.RESOURCES = s;
	}

	if (IM.preference ('TABLE_ARMYFLEET'))
	{
		s = '';

		var FleetUpkeepBonus = 0;
		if (config["research"].FleetUpkeepBonus != undefined) 	{ FleetUpkeepBonus = config["research"].FleetUpkeepBonus; }

		var ArmyUpkeepBonus = 0;
		if (config["research"].ArmyUpkeepBonus != undefined) 	{ ArmyUpkeepBonus = config["research"].ArmyUpkeepBonus; }

		function applyUpkeepBonus(value, bonus)
		{
			if ((value == IKM.no_number) || (value == IKM.uknown) || (value == 0) || (bonus == 0))
			{
				return value;
			}
			else
			{
				return (value - (value / 100 * bonus));
			}
		}

		function isArmy(key)
		{
			var temp = unit_types[key].split(' ');
			return temp[0] == 'military';
		}

		var unit_types = {}; // And type value
		unit_types['unit phalanx']			= 'military line1';
		unit_types['unit steamgiant']		= 'military line1';
		unit_types['unit spearman']			= 'military flank';
		unit_types['unit swordsman']		= 'military flank';
		unit_types['unit slinger']			= 'military line2';
		unit_types['unit archer']			= 'military line2';
		unit_types['unit marksman']			= 'military line2';
		unit_types['unit ram']				= 'military artillery';
		unit_types['unit catapult']			= 'military artillery';
		unit_types['unit mortar']			= 'military artillery';
		unit_types['unit gyrocopter']		= 'military air';
		unit_types['unit bombardier']		= 'military air';
		unit_types['unit cook']				= 'military support';
		unit_types['unit medic']			= 'military support';
		unit_types['unit ship_flamethrower']= 'fleet line1';
		unit_types['unit ship_steamboat']	= 'fleet line1';
		unit_types['unit ship_ram']			= 'fleet flank';
		unit_types['unit ship_ballista']	= 'fleet line2';
		unit_types['unit ship_catapult']	= 'fleet line2';
		unit_types['unit ship_mortar']		= 'fleet line2';
		unit_types['unit ship_submarine']	= 'fleet FirstStrike';
		unit_types['unit ship_rocketship']		= 'fleet FirstStrike';
		unit_types['unit ship_ballooncarrier']	= 'fleet carrier';
		unit_types['unit ship_paddlespeedship']	= 'fleet carrier';
		unit_types['unit ship_tender']			= 'fleet support';

		var usedIndexes = [];
		var usedIndexesCount = 0;
		if (config["unitnames"] != undefined)
		{
			var names = config["unitnames"];

			var CityId;
			var i = 0;
			for (CityId in Cities)
			{
				var res = get_city (CityId);

				for(key in unit_types)
				{
					if (parseInt(Tools.Array.value (Tools.Array.value (res.units, key), "count", 0)) > 0)
					{
						usedIndexes[key] = 1;
						usedIndexesCount++;
					}
					else if (parseInt(Tools.Array.value (Tools.Array.value (res.units, key), "construction", 0)) > 0)
					{
						usedIndexes[key] = 1;
						usedIndexesCount++;
					}
				}
				i++;
			}
		}

		s += "<div id='IkariamManagerArmy' class='Table'><table class='Overview Army'>";
		s += "<thead><tr><th class='city_name aleft' nowrap>"
			+ "<a href='javascript:;' class='IkariamManagerToggle'>" + (IM.preference ('Army', true) ? _t('cfg').hide : _t('cfg').show) + "</a>"
			+ "</th>";
//		s += "<th class='actions' nowrap>" + IM.Renders.army_header_icons(current_city.id) + "</th>";

		if (IKM.show_all_units || usedIndexesCount > 0)
		{
			var firstStyle = '';
			var lastTopic = '';

			for (key in unit_types)
			{
				var name = names[key];
				var type = unit_types[key].split (' ');
				var type = type[0];

				if (IKM.show_all_units || usedIndexes[key] == 1)
				{
					firstStyle = (lastTopic != unit_types[key]) ? "lf" : '';

					var un = IM.Ika.trim_unit(key);
					var img = (type == 'military')
						? 'skin/characters/military/x60_y60/y60_' + un + '_faceright.gif'
						: 'skin/characters/fleet/60x60/' + un + '_faceright.gif';
					var className = 'unitIcon ';
					if (IM.preference ('LargeIcons'))
					{
						className += 'Large ';
					}
					className += (type == 'military') ? 'Army' : 'Navy';

					s += "<th unit='" + un + "' class='" + firstStyle + " unit_name " + un + "' nowrap " + Tooltip.create_attribute (name) + ">";
					if (type == 'military')
					{
						s += Link._army_view (current_city.id, '<span class="' + className + ' ' + un + '" title="' + IM.Str.trim(name) + '" ></span>')
					}
					else
					{
						s += Link._fleet_view (current_city.id, '<span class="' + className + ' ' + un + '" title="' + IM.Str.trim(name) + '" ></span>')
					}
					s += "</th>";
					firstStyle = '';

					lastTopic = unit_types[key];
				}
			}
		}
		else
		{
			s += "<th class='lf' colspan='7'>0 " + _t('units') + "</th></th>";
		}
//		s += "<th class='upkeep lf' nowrap title='" + _t("Upkeep") + "'>" + _t("Upkeep") + "</th>";
		s += "<th class='upkeep lf advanced' nowrap colspan='2' title='" + _t('generals') + "'>" + _t('generals') + "</th>";
		s += "</tr></thead><tbody "
		if (!IM.preference ('Army', true))
		{
			s += " style='display:none;'";
		}
		s += ">";

		var sum = [];
		var sumConstruction = [];
		var sumUpkeep = 0;
		var sumConstructionUpkeep = 0;
		var CityId;
		var i = 0;
		var OtherCities = '';

		var sumGenerals = [];
		var sumGeneralsUpkeep = [];
		var sumGeneralsTotal = 0;
		var sumGeneralsTotalUpkeep = 0;
		var sumGeneralsConstruction = 0;
		var sumFleetTotal = 0;
		var sumFleetTotalUpkeep = 0;
		var sumFleetConstruction = 0;

		for (CityId in Cities)
		{
			var res = get_city (CityId);
			var theCity = Cities[CityId];
			if (theCity.deployed || theCity.occupied)
			{
				var foreignCity = theCity.occupied == true ? 'Occupied' : 'Deployed';
				if (!IM.preference ('OtherCities', true))
				{
					foreignCity += ' hidden';
				}

				OtherCities += '<span cityid="' + CityId + '" class="otherCity ' + foreignCity + '">'
					+ '<span class="cityTitle">'
						+ '<span style="float:right;">' + Link.deploy_army(CityId) + Link.deploy_fleet(CityId) + '</span>'
						+ Link.change_city (theCity.name, CityId, i, res.actions, 'actionPoints', _t('availAP'), '&view=relatedCities')
						+ ' [' + foreignCity + '] '
					+ '</span>';

					OtherCities += '<span class="deployedUnits">';
					for (key in unit_types)
					{
						var unitCount = IM.Str.to_integer(Tools.Array.value (Tools.Array.value (res.units, key), "count", "0"), 0);
						if (unitCount > 0)
						{
							var className = isArmy(key) ? 'unitIcon Army ' : 'unitIcon Navy ';
							OtherCities += ' <span class="' + className + key + '"><abbr>' + unitCount + '</abbr></span> ';
						}
					}
					OtherCities += '</span>';
				OtherCities += "</span>";

			}

			else if (theCity.own == true)
			{
				var an = {
					army : 0,					// number of generals for the army
					indestructible : 0,			// number of generals for indestructible units (cooks + medics)
					navy : 0,					// number of generals for the fleet
					navy_indestructible : 0,			// number of generals for indestructible units (tenders)
					units : 0,					// number of army units in the city
					ships : 0,					// number of ships in the citu
					upkeep : 0,					// total upkeep in the city
					upkeep_army : 0,			// total army upkeep
					upkeep_indestructible : 0,	// total army upkeep for indestructible units (cooks + medics)
					upkeep_navy : 0,			// total navy upkeep
					upkeep_navy_indestructible : 0,	// total army upkeep for indestructible units (tenders)
					upkeep_construction : 0			// total upkeep for units in construction
				};

				var trclass = (parseInt(current_city.id) == parseInt(CityId)) ? "current" : '';
				var city_link = Link.change_city (theCity.name, CityId, i, res.actions, 'actionPoints', _t('availAP'));

				s += "<tr class='" + trclass + "' cityid='" + CityId + "' islandid='" + res.island_id + "' coord='" + res.city_coord + "'>";
				s += "<td class='city_name'>"
					+ Link.outer_info (CityId, city_link, Cities[CityId].name, 1)
					+ Link.resources (CityId,1) + city_link
					+ Tools.Movement.movements (CityId)
					+ Tools.Movement.attacks (CityId)
					+ "</td>";

				if (IKM.show_all_units || usedIndexesCount > 0)
				{
					var firstStyle = '';
					var lastTopic = '';

					for(key in unit_types)
					{
						var uKey = IM.Ika.trim_unit(key);
						if (IKM.show_all_units || usedIndexes[key] == 1)
						{
							firstStyle = (lastTopic != unit_types[key]) ? "lf" : '';

							var unitCount = IM.Str.to_integer(Tools.Array.value (Tools.Array.value (res.units, key), "count", "0"), 0);

							if (config["upkeeps"][uKey] == undefined)
							{
								an.upkeep = IKM.uknown;
							}
							else if (an.upkeep != IKM.uknown)
							{
								an.upkeep += isArmy(key)
									? applyUpkeepBonus(config["upkeeps"][uKey] * unitCount, ArmyUpkeepBonus)
									: applyUpkeepBonus(config["upkeeps"][uKey] * unitCount, FleetUpkeepBonus);
							}

							var ggg = Math.round(unitCount * military_units[key][4]);
							var uuu = Math.round(unitCount * military_units[key][3]);
							var className = "unitIcon";

							if (!isArmy(key))
							{
								if (key == 'unit ship_tender')
								{
									an.navy_indestructible 		 += ggg;
									an.upkeep_navy_indestructible += uuu;
								}
								else
								{
									an.navy 		+= ggg;
								}
								an.upkeep_navy 	+= uuu;
								an.ships 		+= unitCount;
								className 		+= " Navy";
							}
							else
							{
								if (key == 'unit cook' || key == 'unit medic')
								{
									an.indestructible 		 += ggg;
									an.upkeep_indestructible += uuu;
								}
								else
								{
									an.army += ggg;
								}

								className 		+= " Army";
								an.upkeep_army 	+= uuu;
								an.units 		+= unitCount;
							}

							if (unitCount == 0)
							{
								unitCount = IKM.no_units;
							}
							else
							{
								sum[key] = (sum[key] == undefined) ? unitCount : sum[key] + unitCount;
							}

							var unitConstructionHTML = ''; // '<font class="More">' + IKM.no_units + '</font>';
							var unitConstruction 	 = IM.Str.to_integer(Tools.Array.value (Tools.Array.value (res.units, key), "construction", "0"), 0);

							if (config["upkeeps"][uKey] == undefined)
							{
								an.upkeep_construction = IKM.uknown;
							}
							else if (an.upkeep_construction != IKM.uknown)
							{
								an.upkeep_construction += isArmy(key)
									? applyUpkeepBonus(config["upkeeps"][uKey] * unitConstruction, ArmyUpkeepBonus)
									: applyUpkeepBonus(config["upkeeps"][uKey] * unitConstruction, FleetUpkeepBonus);
							}

							if (unitConstruction > 0)
							{
								unitConstructionHTML = '<font class="More" title="' + _t("currentlyBuilding") + '">' + IM.Str.number_format(unitConstruction, true) + '</font>';
								sumConstruction[key] = (sumConstruction[key] == undefined) ? unitConstruction : sumConstruction[key] + unitConstruction;
							}

							if (unitCount == IKM.no_units)
							{
								firstStyle += " no_units ";
							}


							s += "<td unit='" + uKey + "' class='details " + firstStyle + ' ' + unit_types[key] + ' ' + uKey + "'";
							if (ggg > 0)
							{
								s += Tooltip.create_attribute (
									"<img src='/skin/relatedCities/general.gif' align='absmiddle' title='" + _t('generals') + "' /> &nbsp; " + ggg + '<br />' +
									"<img src='/skin/resources/icon_upkeep.gif' align='absmiddle' title='" + _t('Upkeep') + "' /> &nbsp; " + uuu
									);
							}
							s += '><span class="count">' + IM.Str.number_format(unitCount) + '</span>' + unitConstructionHTML + '</td>';

							lastTopic = unit_types[key];
						}
					}
				}
				else
				{
					s += "<td class='lf'></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>";
				}

				if (sumUpkeep != IKM.uknown)	{ sumUpkeep += (an.upkeep != IKM.uknown) ? an.upkeep : IKM.uknown; }
				if (an.upkeep == 0) 			{ an.upkeep = IKM.no_units; }

				if (sumConstructionUpkeep != IKM.uknown)
				{
					if (an.upkeep_construction != IKM.uknown)	{ sumConstructionUpkeep += an.upkeep_construction; }
					else 										{ sumConstructionUpkeep = IKM.uknown; }
				}
				if (an.upkeep_construction == 0) 		{ an.upkeep_construction = IKM.no_units; }

				// check if there are no units or ships in the city
				an.army = '<sup title="cooks and medics" class="fright advanced">+' + an.indestructible + '</sup>' + Math.round(an.army);
				an.navy = '<sup title="cooks and medics" class="fright advanced">+' + an.navy_indestructible + '</sup>' + Math.round(an.navy);

				if (an.units == 0)	{ an.army = '<span style="color:red;">' + an.army + '</span>'; }
				if (an.ships == 0)	{ an.navy = '<span style="color:red;">' + an.navy + '</span>'; }

				s += "<td class='details lf advanced'><b " + Tooltip.create_attribute (an.units + ' ' + _t('units') + " <img src='/skin/resources/icon_upkeep.gif' align='absmiddle' title='" + _t('Upkeep') + "' /> &nbsp; " + IM.Str.number_format(an.upkeep_army) + " (" + an.upkeep_indestructible + ")") + ">"
					+ an.army + "</b>"
					"</td>";
				s += "<td class='details lf advanced'>"
					+ "<b " + Tooltip.create_attribute (an.ships + ' ' + _t('units') + " <img src='/skin/resources/icon_upkeep.gif' align='absmiddle' title='" + _t('Upkeep') + "' /> &nbsp; " + IM.Str.number_format(an.upkeep_navy) + " (" + an.upkeep_navy_indestructible + ")") + ">"
					+ an.navy + "</b>"
					"</td>";
				s += "</tr>";
			}

			i++;
		}

		s += "</tbody><tfoot class='Summary'><tr class='aright'><td class='city_name'><img class='fright' vspace=2 hspace=5 src='skin/layout/sigma.gif'></td>";

		if (IKM.show_all_units || usedIndexesCount > 0)
		{
			var firstStyle = '';
			var lastTopic = '';
			for(key in unit_types)
			{
				if (IKM.show_all_units || usedIndexes[key] == 1)
				{
					firstStyle = lastTopic != unit_types[key] ? "lf" : '';

					var unitConstructionHTML = ''; // '<font class="More">-</font>';
					if (sumConstruction[key] > 0)
					{
						unitConstructionHTML = '<font class="More">' + IM.Str.number_format(sumConstruction[key], true) + '</font>';
					}
					s += "<td unit='" + IM.Ika.trim_unit(key) + "' class='details " + firstStyle + ' ' + IM.Ika.trim_unit(key) + "'>" +
						IM.Str.number_format(sum[key]) + unitConstructionHTML + "</td>";

					lastTopic = unit_types[key];
				}
			}
		}
		else
		{
			s += "<td class='lf'></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>";
		}

		if (sumUpkeep == 0) 			{ sumUpkeep = IKM.no_units; }
		if (sumConstructionUpkeep == 0)	{ sumConstructionUpkeep = IKM.no_units; }
//		s += "<td class='details upkeep lf'>" + IM.Str.number_format(-1 * Math.round(sumUpkeep), true) + "<font class='More'>" + IM.Str.number_format(-1 * Math.round(sumConstructionUpkeep), true) + "</font></td>";
		s += "<td class='details upkeep lf advanced'>" + _t('army') + "</td>";
		s += "<td class='details upkeep lf advanced'>" + _t('navy') + "</td>";
		s += "</tr>";


		s += "<tr class='Units'>";
		s += "<td class='city_name'><span class='fright'><img vspace=2 hspace=5 src='/skin/relatedCities/general.gif' alt='generals score'><span class='advanced'><br /><img vspace=2 hspace=5 src='/skin/resources/icon_upkeep.gif' alt='upkeep'></span></span></td>";

		if (IKM.show_all_units || usedIndexesCount > 0)
		{
			var firstStyle = '';
			var lastTopic = '';
			for(key in unit_types)
			{
				if (IKM.show_all_units || usedIndexes[key] == 1)
				{
					firstStyle = lastTopic != unit_types[key] ? "lf" : '';

					var unitsum = sum[key] == undefined ? 0 : parseInt(sum[key]);

					sumGenerals[key] = Math.round (military_units[key][4] * unitsum);
					sumGeneralsUpkeep[key] = Math.round (military_units[key][3] * unitsum);

					if (isArmy(key))
					{
						sumGeneralsTotal += sumGenerals[key];
						sumGeneralsTotalUpkeep += sumGeneralsUpkeep[key];
					}
					else
					{
						sumFleetTotal += sumGenerals[key];
						sumFleetTotalUpkeep += sumGeneralsUpkeep[key];
					}

					var unitConstructionHTML = '<font class="More">-</font>';
					if (sumConstruction[key] > 0)
					{
						var ttt = Math.round(sumConstruction[key] * military_units[key][4]);
						unitConstructionHTML = '<font class="More"> + ' + IM.Str.number_format(ttt) + '</font>';
						sumGeneralsConstruction += ttt;
					}
					s += "<td unit='" + IM.Ika.trim_unit(key) + "' class='details " + firstStyle + ' ' + IM.Ika.trim_unit(key) + "'>"
						+ IM.Str.number_format(Math.round(sumGenerals[key]))
						+ unitConstructionHTML
						+ '<small class="goldUpkeep advanced">' + IM.Str.number_format(Math.round(sumGeneralsUpkeep[key])) + '</small>' +
						"</td>";

					lastTopic = unit_types[key];
				}
			}
		}
		else
		{
			s += "<td class='lf'></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>";
		}

		if (sumGeneralsConstruction == 0)		{ sumGeneralsConstruction = IKM.no_units; }

		s += "<td class='details upkeep lf advanced'><b>" + IM.Str.number_format(Math.round(sumGeneralsTotal)) + "</b><br /><br /><small class='goldUpkeep advanced'>" + IM.Str.number_format(Math.round(sumGeneralsTotalUpkeep)) + "</small>";
		if (sumGeneralsConstruction)
		{
			+ "<font class='More'> + " + Math.round(sumGeneralsConstruction) + "</font>";
		}
		s += "</td>"
			+ "<td class='details upkeep lf advanced'><b>" + IM.Str.number_format(Math.round(sumFleetTotal))
			+ "</b><br /><br /><small class='goldUpkeep advanced'>"
			+ IM.Str.number_format(Math.round(sumFleetTotalUpkeep)) + "</small></td>"
			+ "</tr></tfoot></table>"
			+ "</div>";

		if (OtherCities)
		{
			s += '<div id="IkariamManagerOtherCities"><div id="OtherCities">'
				+ '<h1>' + _t('cfg').otherCities + '</h1>'
				+ OtherCities + '<div style="clear:left;"></div></div></div>';
		}

		output.ARMY = s;
	}

	//	 table display orderr
	var tableOrder = IM.preference ('tableOrder').toUpperCase().split(',');
	if (tableOrder == '' || tableOrder.length != 3) { tableOrder = 'BUILDINGS,RESOURCES,ARMY'; }

	s = output[tableOrder[0]] + output[tableOrder[1]] + output[tableOrder[2]];
	//	s = output.BUILDINGS + output.RESOURCES + output.ARMY;

	var body = IM.DOM.Get_First_Node("//body");
	var table_mode = "new_table";
	var IMElement = document.getElementById("IkariamManager");

	if (IMElement == null)
	{
		IMElement = document.createElement('div');
		IMElement.id = "IkariamManager";
		IMElement.setAttribute("version", IM.version);
		if (langtype == "rf")
		{
			IMElement.setAttribute("dir",	"rtl");
			IMElement.setAttribute("class",	"RtoL");
		}

		IMElement.innerHTML = s;
		body.appendChild(IMElement);
	}
	else
	{
		if (langtype == "rf")
		{
			IMElement.setAttribute("dir",	"rtl");
			IMElement.setAttribute("class",	"RtoL");
		}

		IMElement.innerHTML = s;
	}
	if (IM.preference ('fixedWidth'))
	{
		IMElement.setAttribute("class", 'fixedWidth');
	}

}

IM.IMSettings = function ()
{
	var IMSettings = '<div id="IMSettings"><div class="container">'
		+ '<span class="closeButton hideIMSettings">X</span>'
		+ '<h4>' + IM.script_name + ' Settings</h4>'
		+ '<ul>'
		+ '<li class="title"><b>' + IM.script_name + ' <a target="_blank" href="' + IM.home_page + '">v' + IKM.version + '</a></b></li>'
		+ '<li><span>' + _t('cfg').fixedWidth + ':</span> <a href="javascript:;" id="toggleFixedWidth">' + (IM.preference('fixedWidth') ? _t('cfg').on : _t('cfg').off) + '</a></li>'
		+ '<li><span>' + _t('cfg').militaryIcons + ":</span> <a href='javascript:;' id='IkariamManagerIcons'>" + (IM.preference ('LargeIcons', false) ? _t('cfg').large : _t('cfg').small) + "</a></li>"
		+ '<li><span>' + _t('cfg').advancedMode + ':</span> <a href="javascript:;" id="toggleAdvancedMode">' + (IM.preference('advancedMode') ? _t('cfg').on : _t('cfg').off) + '</a></li>'
		+ '<li><span>' + _t('cfg').otherCities + ':</span> <a href="javascript:;" id="OtherCitiesToggle">' + (!IM.preference('OtherCities') ? _t('cfg').show : _t('cfg').hide) + '</a></li>'
		+ '<li><span>' + _t('setProggress') + ':</span> <select name="PROGRESS_BAR_MODE">'
			+ '<option value="off" ' 	 + (IM.preference ('PROGRESS_BAR_MODE') == 'off'	 ? 'selected' : '') + '>' + _t('setProgressOff') + '</option>'
			+ '<option value="time" ' 	 + (IM.preference ('PROGRESS_BAR_MODE') == 'time' 	 ? 'selected' : '') + '>' + _t('setProgressTime') + '</option>'
			+ '<option value="percent" ' + (IM.preference ('PROGRESS_BAR_MODE') == 'percent' ? 'selected' : '') + '>' + _t('setProgressPercent') + '</option>'
			+ '</select></li>'
		+ '<li><span>' + _t('setLanguage') + ':</span> <select name="LANGUAGE">';

	var available_languages = {'': _t('setLanguageAuto'), en: "English", rs: 'Српски', rsl: 'Srpski (latinica)', hu: "Magyar", de: "Deutsch", cz: "Czech", tr: "Turkish", es: "Espanol", ba: "Bosnian", it: "Italiano", pt: "Portuguese", fr: "Français", pl: "Polish", ro: "Romanian", gr: "Greek", cn: "Chinese", nl: "Dutch", cz: "Czech", vn: "Vietnamese", tw: "Chinese (traditional)", fi: "Finnish", se: "Swedish", il: "Hebrew", sk: "Slovak", bg: "Bulgarian", sl: "Slovenian", ae: "العربية", lv: "Latvian"};
	for (i in available_languages)
	{
		IMSettings += '<option value="' + i +'" ' + (IM.preference ('LANGUAGE') == i ? 'selected' : '') + '>' + available_languages[i] + '</option>';
	}
	IMSettings += '</select></li>'
		+ '<li><span>Display Order:</span> <select name="tableOrder">';
	var tableOrder = [ "Buildings,Resources,Army", "Buildings,Army,Resources", "Resources,Buildings,Army", "Resources,Army,Buildings", "Army,Resources,Buildings", "Army,Buildings,Resources" ];
	for (i in tableOrder)
	{
		IMSettings += '<option value="' + tableOrder[i] +'" ' + (IM.preference ('tableOrder') == tableOrder[i] ? 'selected' : '') + '>' + tableOrder[i] + '</option>';
	}
	IMSettings += '</select></li>'
		+ '<li><span>' + _t('cfg').show + ': </span><label><input type="checkbox" name="buildingTooltip" value="1" ' + ( IM.preference ('buildingTooltip') ? 'checked' : '') + ' /> Building image in tooltip</label></li>'
		+ '<li><span>' + _t('cfg').show + ': </span><label><input type="checkbox" name="showCityAndServer" value="1" ' + ( IM.preference ('showCityAndServer') ? 'checked' : '') + ' /> Current city name and server</label></li>'
		+ '<li><span>' + _t('cfg').show + ': </span>'
			+ '<label><input type="checkbox" name="TABLE_RESOURCES" value="1" ' + ( IM.preference ('TABLE_RESOURCES') ? 'checked' : '') + ' /> ' + _t('setShotRes') + '</label> '
			+ '<label><input type="checkbox" name="TABLE_BUILDINGS" value="1" ' + ( IM.preference ('TABLE_BUILDINGS') ? 'checked' : '') + ' /> ' + _t('setShowBuilding') + '</label> '
			+ '<label><input type="checkbox" name="TABLE_ARMYFLEET" value="1" ' + ( IM.preference ('TABLE_ARMYFLEET') ? 'checked' : '') + ' /> ' + _t('setShowArmy') + '</label> '
		+ '</li>'
		+ '</ul>'
		+ '<p><a class="button" href="javascript:;" id="IMSettingsSave">Save Settings</a>  <a class="button hideIMSettings" href="javascript:;">Cancel</a></p>'
		+ '<ul><li class="title"><a href="javascript:;" id="resetAllData">' + _t('cfg').reset_data + '</a></li></ul>';
		+ '</div></div>';

	$(IMSettings).appendTo ('body');
	$('.hideIMSettings').click ( function (evt) { IM.IMSettingsHide(); });
	$('#IMSettingsSave').click ( function (evt) {
		IM.set_preference ('PROGRESS_BAR_MODE', $('#IMSettings SELECT[name=PROGRESS_BAR_MODE]').val());
		IM.set_preference ('TABLE_RESOURCES', $('#IMSettings  INPUT[name=TABLE_RESOURCES]').is(':checked'));
		IM.set_preference ('TABLE_BUILDINGS', $('#IMSettings INPUT[name=TABLE_BUILDINGS]').is(':checked'));
		IM.set_preference ('TABLE_ARMYFLEET', $('#IMSettings INPUT[name=TABLE_ARMYFLEET]').is(':checked'));
		IM.set_preference ('LANGUAGE', $('#IMSettings SELECT[name=LANGUAGE]').val());
		IM.set_preference ('buildingTooltip', $('#IMSettings INPUT[name=buildingTooltip]').is(':checked'));
		IM.set_preference ('showCityAndServer', $('#IMSettings INPUT[name=showCityAndServer]').is(':checked'));
		IM.set_preference ('tableOrder', $('#IMSettings SELECT[name=tableOrder]').val());
		IM.DB.save_options();
		$('#IMSettings .container').html('<p><b>Settings saved successfully</b>.<br />Some changes will be visible on next page load.</p>').fadeOut (5000, function()
		{
			$('#IMSettings').remove();
		});
	});

	$('#toggleFixedWidth').click ( function (evt) {
		$("#IkariamManager").toggleClass('fixedWidth');

		IM.set_preference ('fixedWidth', $("#IkariamManager").hasClass('fixedWidth'));
		$(this).text(IM.preference ('fixedWidth') ? _t('cfg').on : _t('cfg').off);
		IM.DB.save_options();
	});

	$('#toggleAdvancedMode').click ( function (evt) {
		IM.set_preference ('advancedMode', !IM.preference ('advancedMode'));
		$(this).text(IM.preference ('advancedMode') ? _t('cfg').on : _t('cfg').off);
		IM.DB.save_options();
	});

	$('#IkariamManagerIcons').click ( function (evt) {
		$("#IkariamManagerArmy .unitIcon").toggleClass('Large');

		IM.set_preference ('LargeIcons', $("#IkariamManagerArmy .unitIcon").eq(0).hasClass('Large'));
		$(this).text(IM.preference ('LargeIcons') ? _t('cfg').large : _t('cfg').small);
		IM.DB.save_options();
	});

	$('#OtherCitiesToggle').click ( function (evt) {
		if ($('#IkariamManagerOtherCities').is(':visible'))
		{
			$('#IkariamManagerOtherCities').hide();
			IM.set_preference ('OtherCities', false);
		}
		else
		{
			$('#IkariamManagerOtherCities').show();
			IM.set_preference ('OtherCities', true);
		}

		$(this).text(IM.preference ('OtherCities') ? _t('cfg').hide : _t('cfg').show);
		IM.DB.save_options();
	});
	$('#resetAllData').click ( function (evt) {
		if (confirm("Are you sure you want to delete ALL stored data ?"))
		{
			config = {};
			IM.DB.Save();
			IM.DB.Options = {};
			IM.DB.save_options();
			window.location.href = window.location.href;
		}
	});


}

IM.IMSettingsHide = function ()
{
	$('#IMSettings').remove();
}

$(document).ready(function()
{
	IM.Ika.related_city_deployment ();

	var bgm_scripts = $('#bgm_scripts').html();
	if (bgm_scripts != null)
	{
		$('<li><a href="javascript:;" id="showIMSettings">' + IM.script_name + '</a></li>').appendTo('#bgm_scripts UL');
	}
	else
	{
		var s = '<div class="dynamic">'
			+ '<h3 class="header"><a href="javascript:;" id="IMToggle">' + IM.script_name + '</a></h3>'
			+ '<div class="content">'
			+ '<ul id="IMSettingsDynamic" style="display:none; margin:0 10px;">'
			+ '<li><a href="javascript:;" id="showIMSettings">' + _t('show_settings') + '</a></li>'
			+ '</ul></div><div class="footer"></div></div>';

		$(s).insertBefore('#mainview');
	}

	$('#IMToggle').click ( function (evt) { $("#IMSettingsDynamic").toggle(); });
	$('#showIMSettings').click ( function (evt) { IM.IMSettings(); });

	if(IM.preference ('showCityAndServer'))
	{
		$('<div id="IMServerId"><span>' + IM.Ika.language().toUpperCase() + '</span>'
			+ IM.Ika.server_name ()
			+ '<span>' + IM.Ika.server() + '</span></div>'
			+ '<div id="IMCityId"' + (current_city.own > 0 ? '' : ' class="related"') +'>' + current_city.name + '</div>'
		).appendTo('body');
	}

	$('.IkariamManagerToggle').click ( function (evt) {
		var t = $(this).parent().parent().parent().parent();
		$('TBODY', t).toggle();
		if ($(t).hasClass('Army'))		{ IM.set_preference ('Army', 		$('TBODY', t).is(':visible')); }
		if ($(t).hasClass('Resources'))	{ IM.set_preference ('Resources',	$('TBODY', t).is(':visible'));  }
		if ($(t).hasClass('Buildings'))	{ IM.set_preference ('Buildings',	$('TBODY', t).is(':visible'));  }

		$(this).text($('TBODY', t).is(':visible') ? _t('cfg').hide: _t('cfg').show);
		IM.DB.save_options();
	});

	$('#resProductionToggle').click ( function (evt) {
		$("#IkariamManager .resProduction").toggleClass('alt');

		IM.set_preference ('resProductionAlt', $("#IkariamManager .resProduction").hasClass('alt'));
		$(this).text(IM.preference ('resProductionAlt') ? _t('cfg').right : _t('cfg').left);
		IM.DB.save_options();
	});

	$('#advisors #advCities SPAN').click 	(function()	{ resetTablesAbs (); $('#IkariamManagerBuildings').addClass('abs'); return false; });
	$('#advisors #advMilitary SPAN').click 	(function()	{ resetTablesAbs (); $('#IkariamManagerArmy').addClass('abs'); return false; });
	$('#advisors #advResearch SPAN').click 	(function()	{ resetTablesAbs (); $('#IkariamManagerResources').addClass('abs'); return false; });
	$('#advisors #advDiplomacy SPAN').click	(function()	{ resetTablesAbs (); $('#IkariamManagerOtherCities').addClass('abs'); return false; });

	function resetTablesAbs ()
	{
		$("#IkariamManagerBuildings").removeClass('abs');
		$("#IkariamManagerArmy").removeClass('abs');
		$("#IkariamManagerResources").removeClass('abs');
		$("#IkariamManagerOtherCities").removeClass('abs');
	}

	$(document).click ( function() { resetTablesAbs(); });


});

if (IM.Ika.view() != '' && !(IM.View.is(['errorLoggedOut', 'no-login-umod'])))
{
	// Fix for v3
	var body = IM.DOM.Get_First_Node("//body");
	var script = document.createElement('script');
	script.type = "text/javascript";
	script.src = "/js/wz_tooltip.js";
	body.appendChild(script);

	IM.Renders.set_common_styles();
	IM.Renders.set_extra_styles();

	renderTables();
	IM.DB.Save();

	IM.Tooltip.CreateContainer(IM.main_id + 'Tooltip', IM.main_id);
	IM.Handlers.Attach_Events();
	IM.Handlers.Start_Timers();
};

IM.end_time = new Date().getTime();
IM.Log.Add('Ended after ' + ((IM.end_time - IM.start_time)/1000) + 's');

/* end of script */