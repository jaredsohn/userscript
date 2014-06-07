// ==UserScript==
// @name           Emperor
// @description    Adds various functionalities to Lord of Ultima
// @namespace      Tharagor
// @include        http://prodgame*.lordofultima.com/*/index.aspx*
// @version        1.0.0
// ==/UserScript==
// $Header: /Home/Emperor/Wrapper.js,v 1.1 2012/09/29 01:30:16 Aare Exp $

(function()
{
	var EmperorMain = function()
	{
		function CreateEmperor()
		{
// $Header: /Home/Emperor/Data.js,v 1.6 2012/12/25 22:14:17 Aare Exp $

// Global data is in this file. File is processed first, right before global
// functions.

var EVENT_PRIORITY_DEFER_DELAY = 250;

var WOODCUTTER = 47, QUARRY = 48, IRONMINE = 49, FARM = 50;
var COTTAGE = 4, BARRACKS = 14, WAREHOUSE = 20, CASTLE = 21, ANY_PALACE = 51;
var CITYGUARDHOUSE = 15, TRAININGGROUND = 16, STABLE = 17, WORKSHOP = 18, SHIPYARD = 19;
var MOONGLOWTOWER = 36, TRINSICTEMPLE = 37;
var MARKETPLACE = 5, TOWNHOUSE = 13, HARBOR = 22, HIDEOUT = 9, TOWNHALL = 12, CITYWALL = 23;
var SAWMILL = 7, MILL = 8, STONEMASON = 10, FOUNDRY = 11;
var LOOKOUTTOWER = 38, BALLISTATOWER = 39, GUARDIANTOWER = 40, RANGERTOWER = 41;
var TEMPLARTOWER = 42, PITFALLTRAP = 43, BARRICADE = 44, ARCANETRAP = 45, CAMOUFLAGETRAP = 46;

// single clicking; correlates to UI organization
var CITY_BUILDING_IDS = [
// Town hall 1
WOODCUTTER, COTTAGE, WAREHOUSE,
// Town hall 2
QUARRY, HIDEOUT, LOOKOUTTOWER,
// Town hall 3
FARM, CITYGUARDHOUSE, RANGERTOWER,
// Town hall 4
IRONMINE, BARRACKS, TRAININGGROUND,
// Town hall 5
TOWNHOUSE, MARKETPLACE, PITFALLTRAP,
// Town hall 6
SAWMILL, STABLE, GUARDIANTOWER,
// Town hall 7
STONEMASON, MOONGLOWTOWER, BARRICADE,
// Town hall 8
MILL, CASTLE, TRINSICTEMPLE, TEMPLARTOWER, ARCANETRAP, ANY_PALACE,
// Town hall 9
FOUNDRY, WORKSHOP, BALLISTATOWER,
// Town hall 10
HARBOR, SHIPYARD, CAMOUFLAGETRAP];

var TOWN_HALL_BUILDING_ID = 12;
// id=57,getType()=23
var CITY_WALL_BUILDING_ID = 23;
var CASTLE_BUILDING_ID = 21;
var PALACE_BUILDING_ID = 21;

var BUILDING_COST =
{
};
BUILDING_COST.PRODUCER = [[50, 0], [200, 0], [400, 200], [1400, 600], [3500, 1500], [6000, 3000], [10000, 5000], [16000, 8000], [25000, 13000], [38000, 20000]];
BUILDING_COST.PROCESSOR = [[60, 60], [150, 150], [350, 350], [1100, 1100], [2700, 2700], [500, 5000], [8500, 8500], [13500, 13500], [21500, 21500], [33000, 33000]];
BUILDING_COST.STONE_TOWER = [[0, 100], [0, 200], [0, 400], [0, 1000], [0, 3000], [0, 7000], [0, 14000], [0, 24000], [0, 38000], [0, 58000]];
BUILDING_COST.WOOD_STONE_TOWER = [[30, 90], [60, 180], [110, 330], [280, 840], [830, 2490], [1930, 5790], [3850, 11550], [6600, 19800], [10500, 31500], [16000, 48000]];

BUILDING_COST[TOWNHALL] = [[0, 0], [200, 0], [500, 100], [1000, 300], [3000, 1500], [8000, 4000], [15000, 10000], [30000, 25000], [60000, 60000], [120000, 120000]];

BUILDING_COST[WOODCUTTER] = BUILDING_COST.PRODUCER;
BUILDING_COST[COTTAGE] = [[0, 50], [0, 200], [0, 600], [0, 1000], [0, 1500], [0, 2200], [0, 3500], [0, 4500], [0, 6000], [0, 8000]];
BUILDING_COST[WAREHOUSE] = [[60, 0], [150, 0], [250, 50], [500, 150], [1600, 400], [3000, 1000], [6000, 2000], [9600, 4800], [15000, 9000], [20000, 13000]];

BUILDING_COST[QUARRY] = BUILDING_COST.PRODUCER;
BUILDING_COST[HIDEOUT] = [[0, 50], [0, 200], [0, 600], [0, 1000], [0, 1500], [0, 2200], [0, 3500], [0, 4500], [0, 6000], [0, 8000]];
BUILDING_COST[LOOKOUTTOWER] = [[0, 200], [0, 400], [0, 600], [0, 1000], [0, 1500], [0, 2200], [0, 3500], [0, 5000], [0, 7000], [0, 10000]];

BUILDING_COST[FARM] = BUILDING_COST.PRODUCER;
BUILDING_COST[CITYGUARDHOUSE] = [[15, 30], [30, 60], [55, 110], [140, 280], [400, 800], [1000, 2000], [1900, 3800], [3200, 6400], [5100, 10200], [8000, 16000]];
BUILDING_COST[RANGERTOWER] = BUILDING_COST.STONE_TOWER;

BUILDING_COST[IRONMINE] = BUILDING_COST.PRODUCER;
BUILDING_COST[BARRACKS] = [[0, 50], [0, 150], [0, 300], [0, 600], [0, 120], [0, 2500], [0, 4000], [0, 7000], [0, 11500], [0, 17500]];
BUILDING_COST[TRAININGGROUND] = [[20, 40], [40, 80], [80, 160], [200, 400], [600, 1200], [1400, 2800], [2800, 5600], [4800, 9600], [7500, 15000], [11500, 23000]];

BUILDING_COST[TOWNHOUSE] = [[0, 100], [0, 300], [0, 600], [0, 2000], [1000, 4000], [2000, 7000], [3500, 11500], [7000, 17000], [14000, 24000], [29000, 29000]];
BUILDING_COST[MARKETPLACE] = [[40, 20], [80, 40], [160, 80], [400, 200], [1200, 600], [1800, 1400], [5600, 2800], [9600, 4800], [15200, 7600], [23200, 11600]];
BUILDING_COST[PITFALLTRAP] = BUILDING_COST.WOOD_STONE_TOWER;

BUILDING_COST[SAWMILL] = BUILDING_COST.PROCESSOR;
BUILDING_COST[STABLE] = [[25, 50], [55, 110], [110, 220], [275, 550], [800, 1600], [1900, 3800], [3750, 7500], [6500, 13000], [10200, 20400], [15500, 31000]];
BUILDING_COST[GUARDIANTOWER] = BUILDING_COST.STONE_TOWER;

BUILDING_COST[STONEMASON] = BUILDING_COST.PROCESSOR;
BUILDING_COST[MOONGLOWTOWER] = [[30, 60], [60, 120], [120, 240], [300, 600], [900, 1800], [2100, 4200], [4200, 8400], [7200, 14400], [11400, 22800], [17400, 34800]];
BUILDING_COST[BARRICADE] = [[30, 90], [60, 180], [110, 330], [280, 840], [830, 2490], [1930, 5790], [3850, 11550], [6600, 19800], [10500, 31500], [16000, 48000]];

BUILDING_COST[MILL] = BUILDING_COST.PROCESSOR;
BUILDING_COST[TRINSICTEMPLE] = [[35, 70], [70, 140], [135, 270], [335, 670], [1000, 2000], [2350, 4700], [4650, 9300], [8000, 16000], [12700, 25400], [19500, 39000]];

BUILDING_COST[TEMPLARTOWER] = BUILDING_COST.STONE_TOWER;
BUILDING_COST[ARCANETRAP] = BUILDING_COST.WOOD_STONE_TOWER;

BUILDING_COST[FOUNDRY] = BUILDING_COST.PROCESSOR;
BUILDING_COST[WORKSHOP] = [[40, 80], [75, 150], [150, 300], [370, 740], [1100, 2200], [2600, 5200], [5200, 10400], [8900, 17800], [14000, 28000], [21500, 43000]];
BUILDING_COST[BALLISTATOWER] = BUILDING_COST.STONE_TOWER;

BUILDING_COST[HARBOR] = [[80, 40], [160, 80], [320, 160], [800, 400], [2400, 1200], [5600, 2800], [11200, 5600], [19200, 96], [30400, 15200], [46400, 23200]];
BUILDING_COST[CAMOUFLAGETRAP] = BUILDING_COST.WOOD_STONE_TOWER;
BUILDING_COST[SHIPYARD] = [[50, 100], [100, 200], [200, 400], [500, 1000], [1500, 3000], [3500, 7000], [7000, 14000], [12000, 24000], [19000, 38000], [29000, 58000]];

var BUILDING_TYPE_BY_RES_TYPE = [28, 29, 27, 30];
// stone,wood,iron,lake

var CANNOT_DEMOLISH_BUILDINGS =
{
}
CANNOT_DEMOLISH_BUILDINGS[TOWN_HALL_BUILDING_ID] = 1;
CANNOT_DEMOLISH_BUILDINGS[CITY_WALL_BUILDING_ID] = 1;
CANNOT_DEMOLISH_BUILDINGS[CASTLE_BUILDING_ID] = 1;

var MAXLEV_TOWERS = 0;
var MAXLEV_MILITARY = 1;
var MAXLEV_RESOURCE = 2;
var MAXLEV_COTTAGE = 3;
var MAXLEV_BARRACKS = 4;
var MAXLEV_UTILITY = 5;
var MAXLEV_CASTLE = 6;

var CITYGUARD_UNIT_ID = "1";
var BALLISTA_UNIT_ID = "2";
var RANGER_UNIT_ID = "3";
var GUARDIAN_UNIT_ID = "4";
var TEMPLAR_UNIT_ID = "5";
var BERSERKER_UNIT_ID = "6";
var MAGE_UNIT_ID = "7";
var SCOUT_UNIT_ID = "8";
var CROSSBOW_UNIT_ID = "9";
var PALADIN_UNIT_ID = "10";
var KNIGHT_UNIT_ID = "11";
var WARLOCK_UNIT_ID = "12";
var RAM_UNIT_ID = "13";
var CATAPULT_UNIT_ID = "14";
var FRIGATE_UNIT_ID = "15";
var SLOOP_UNIT_ID = "16";
var GALLEON_UNIT_ID = "17";
var BARON_UNIT_ID = "19";

var BQ_UPGRADE = 1;
var BQ_DOWNGRADE = 2;
var BQ_DEMOLISH = 5;
var BQ_DESTROY_RES = 1;

var BUILDING_TYPE =
{
};
BUILDING_TYPE['2'] = WOODCUTTER;
BUILDING_TYPE['3'] = QUARRY;
BUILDING_TYPE['4'] = IRONMINE;
BUILDING_TYPE['1'] = FARM;
BUILDING_TYPE['C'] = COTTAGE;
BUILDING_TYPE['B'] = BARRACKS;
BUILDING_TYPE['S'] = WAREHOUSE;
BUILDING_TYPE['X'] = CASTLE;
BUILDING_TYPE['G'] = TRAININGGROUND;
BUILDING_TYPE['E'] = STABLE;
BUILDING_TYPE['Y'] = WORKSHOP;
BUILDING_TYPE['V'] = SHIPYARD;
BUILDING_TYPE['J'] = MOONGLOWTOWER;
BUILDING_TYPE['Z'] = TRINSICTEMPLE;
BUILDING_TYPE['P'] = MARKETPLACE;
BUILDING_TYPE['U'] = TOWNHOUSE;
BUILDING_TYPE['R'] = HARBOR;
BUILDING_TYPE['H'] = HIDEOUT;
BUILDING_TYPE['L'] = SAWMILL;
BUILDING_TYPE['M'] = MILL;
BUILDING_TYPE['A'] = STONEMASON;
BUILDING_TYPE['D'] = FOUNDRY;
RES_TYPE_WOOD = 1;
RES_TYPE_ROCK = 2;
RES_TYPE_IRON = 3;
RES_TYPE_FOOD = 4;
// $Header: /Home/Emperor/Globals.js,v 1.2 2012/10/20 23:24:21 Aare Exp $

// This file has some global convenience functions. File is processed after
// global data and before the rest.

EmpThSep = function(val)
{
	if(val == undefined)
		return "";
	return val.toString().replace(/\d(?=(\d{3})+(\D|$))/g, "$&" + ",");
}
EmpDebug = function(s)
{
	s = "Emperor: " + s;
	if( typeof console != 'undefined')
		console.log(s);
	else if(window.opera)
		opera.postError(s);
	else
		GM_log(s);
}
function defer(method, target, time, argsArray)
{
	return window.setTimeout(function()
	{
		try
		{
			method.apply(target, argsArray);
		}
		catch(ignore)
		{
		}
	}, time);
}

function new_Array(length, fill)
{
	var arr = new Array(length);
	while(length--)
	{
		arr[length] = fill;
	}
	return arr;
}

/**
 sprintf() for JavaScript 0.5

 Copyright (c) Alexandru Marasteanu <alexaholic [at) gmail (dot] com>
 All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:
 * Redistributions of source code must retain the above copyright
 notice, this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright
 notice, this list of conditions and the following disclaimer in the
 documentation and/or other materials provided with the distribution.
 * Neither the name of sprintf() for JavaScript nor the
 names of its contributors may be used to endorse or promote products
 derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 DISCLAIMED. IN NO EVENT SHALL Alexandru Marasteanu BE LIABLE FOR ANY
 DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

 Changelog:
 2007.04.03 - 0.1:
 - initial release
 2007.09.11 - 0.2:
 - feature: added argument swapping
 2007.09.17 - 0.3:
 - bug fix: no longer throws exception on empty paramenters (Hans Pufal)
 2007.10.21 - 0.4:
 - unit test and patch (David Baird)
 2010.05.09 - 0.5:
 - bug fix: 0 is now preceeded with a + sign
 - bug fix: the sign was not at the right position on padded results (Kamal Abdali)
 - switched from GPL to BSD license
 **/

function str_repeat(i, m)
{
	for(var o = []; m > 0; o[--m] = i);
	return (o.join(""));
}

function sprintf()
{
	var i = 0, a, f = arguments[i++], o = [], m, p, c, x, s = '';
	while(f)
	{
		if( m = /^[^\x25]+/.exec(f))
		{
			o.push(m[0]);
		}
		else if( m = /^\x25{2}/.exec(f))
		{
			o.push("%");
		}
		else if( m = /^\x25(?:(\d+)\$)?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(f))
		{
			if((( a = arguments[m[1] || i++]) == null) || (a == undefined))
			{
				throw ("Too few arguments.");
			}
			if(/[^s]/.test(m[7]) && ( typeof (a) != "number"))
			{
				throw ("Expecting number but found " + typeof (a));
			}
			switch (m[7])
			{
			case 'b':
				a = a.toString(2);
				break;
			case 'c':
				a = String.fromCharCode(a);
				break;
			case 'd':
				a = parseInt(a);
				break;
			case 'e':
				a = m[6] ? a.toExponential(m[6]) : a.toExponential();
				break;
			case 'f':
				a = m[6] ? parseFloat(a).toFixed(m[6]) : parseFloat(a);
				break;
			case 'o':
				a = a.toString(8);
				break;
			case 's':
				a = (( a = String(a)) && m[6] ? a.substring(0, m[6]) : a);
				break;
			case 'u':
				a = Math.abs(a);
				break;
			case 'x':
				a = a.toString(16);
				break;
			case 'X':
				a = a.toString(16).toUpperCase();
				break;
			}
			if(/[def]/.test(m[7]))
			{
				s = (a >= 0 ? (m[2] ? '+' : '') : '-');
				a = Math.abs(a);
			}
			c = m[3] ? m[3] == '0' ? '0' : m[3].charAt(1) : ' ';
			x = m[5] - String(a).length - s.length;
			p = m[5] ? str_repeat(c, x) : '';
			o.push(s + (m[4] ? a + p : p + a));
		}
		else
		{
			throw ("Huh ?!");
		}
		f = f.substring(m[0].length);
	}
	return o.join("");
}
// $Header: /Home/Emperor/Emperor.Main.js,v 1.35 2013/03/29 16:03:46 Aare Exp $

// File is processed right after globals and data.

var EmpVersion = "0.0.5";

var Emp =
{
};

qx.Class.define("Emperor.Main",
{
	type : "singleton",
	extend : qx.core.Object,
	members :
	{
		app : null,
		chat : null,
		serverBar : null,
		cityInfoView : null,
		cityDetailView : null,
		dungeonDetailView : null,
		newCityView : null,
		options : null,
		buildQueue : null,
		buildQueueHeader : null,
		city : null,
		cityId : null,
		cityInfoView : null,
		cityBar : null,
		cityTradeInfoView : null,
		serverTime : null,
		queueTimesLabel : null,
		buildingDetailView : null,
		buildingPlaceDetailView : null,
		moveBuildingDetailView : null,
		tradeButtonsListener : null,
		keyboard : null,
		zoomSlider : null,
		tooltipTweak : null,
		layoutWindow : null,
		worldExporter : null,
		ftButton : null,
		titleColumnIndex : 12,
		buttonX : 355,
		cityManager : null,
		// reportPage : null,
		// reportPageListener : null,
		// tradeMinisterWidget : null,
		// tradeMinisterWidgetUpdated : null,
		Initialize : function()
		{
			try
			{
				this.app = qx.core.Init.getApplication();
				this.chat = this.app.chat;
				this.cityInfoView = this.app.cityInfoView;
				this.cityDetailView = this.app.cityDetailView;
				this.dungeonDetailView = this.app.dungeonDetailView;
				this.newCityView = this.app.newCityView;
				this.serverBar = this.app.serverBar;
				this.buildQueue = this.cityInfoView.buildingQueue;
				this.buildQueueHeader = this.buildQueue.header;
				this.cityBar = this.app.cityBar;
				this.cityInfoView = this.app.cityInfoView;
				this.buildingDetailView = this.app.getBuildingDetailView();
				this.buildingPlaceDetailView = this.app.getBuildingPlaceDetailView();
				this.serverTime = webfrontend.data.ServerTime.getInstance().refTime;
				this.moveBuildingDetailView = this.app.getMoveBuildingDetailView();

				this.loadOptions();
				Emp.options = this.options;
				// reference time (server start date in milliseconds)
				Emp.srvTime = this.serverTime;
				Emp.main = this;
				Emp.a = this.app;

				this.initOptionsButton();
				this.initEmpireTree();
				this.initPurifyWindow();
				this.initIncomingTrade();
				this.initQueueTimesLabel();
				this.initCityBuildingCounts();
				this.initCitySingleClicks();
				this.initKeyboard();
				this.initAttackButtons();
				this.initCountUpgradeable();
				this.initTradeButtons();
				this.initTooltipTweak();
				this.initOverlayWindow();
				this.initWorldExporter();
				this.initCityExporter();
				this.initFortuneTeller();
				this.initBosSummary();
				this.initFanfare();
				this.initContextMenu();
				this.initAutoRaid();
				this.initBBInChatWindow();
				this.initSendArmyWindow();
				this.initCityManager();
				this.initLayoutShortcuts();

				this.initTestCode();

				// this.reportPageListener = this.app.getReportPage().reportBody.addListenerOnce("addChildWidget", this.tweakReport, this);
				// webfrontend.base.Timer.getInstance().addListener("uiTick", this.checkTradeMinisterWidget, this);
			}
			catch(e)
			{
				EmpDebug(e);
			}
		},
		initCityManager : function()
		{
			this.cityManager = new Emperor.CityManager();
			this.createServerBarButton("N", "Rename City", qx.lang.Function.bind(this.cityManager.renameCity, this.cityManager));
			this.createServerBarButton("T", "Towers", qx.lang.Function.bind(this.cityManager.addTowers, this.cityManager));
			this.createServerBarButton("C", "Completed", qx.lang.Function.bind(this.cityManager.completed, this.cityManager));
			this.createServerBarButton("P", "Palace", qx.lang.Function.bind(this.cityManager.setupPalace, this.cityManager));
			this.createServerBarButton("A", "Army", qx.lang.Function.bind(this.cityManager.setupArmyCastle, this.cityManager));
			this.createServerBarButton("PW", "Palace Resources (Wood)", qx.lang.Function.bind(this.cityManager.palaceResourcesWood, this.cityManager));
			this.createServerBarButton("PR", "Palace Resources (Rock)", qx.lang.Function.bind(this.cityManager.palaceResourcesRock, this.cityManager));
		},
		initAutoRaid : function()
		{
			this.createServerBarButton("R", "Raid", this.autoRaid);
		},
		autoRaid : function()
		{
			Emperor.NRG.AutoRaid.getInstance().autoRaid();
		},
		initContextMenu : function()
		{
			try
			{
				this.contextMenu = new Emperor.NRG.ContextMenu();
			}
			catch(e)
			{
				EmpDebug("InitContextMenu: " + e);
			}
		},
		initFanfare : function()
		{
			try
			{
				Emperor.Fanfare.getInstance().initialize();
			}
			catch(e)
			{
				EmpDebug("InitFanfare: " + e);
			}
		},
		// Fortune Teller countdown
		initFortuneTeller : function()
		{
			try
			{
				var container = this.app.title.reportButton.getLayoutParent();
				this.ftButton = new qx.ui.form.Button("Fortune").set(
				{
					marginLeft : 10,
					width : 90,
					height : 32,
					enabled : false,
					font : "font_size_14_bold",
					rich : true,
					toolTipText : "Click to show Fortune Teller when time is right"
				});
				container._add(this.ftButton,
				{
					row : 0,
					column : this.titleColumnIndex++
				});
				this.ftButton.addListener("execute", this.execFortuneTeller, this);
				webfrontend.base.Timer.getInstance().addListener("uiTick", this.tickFortuneTeller, this);
			}
			catch(e)
			{
				EmpDebug("InitFortuneTeller: " + e);
			}
		},
		tickFortuneTeller : function()
		{
			try
			{
				var nextFree = webfrontend.gui.FortuneTeller.Util.getStepsTillNextFreeToken();
				var title = webfrontend.data.Player.getInstance().getTitle();
				if(nextFree <= 0 && title > 5)
				{
					if(!this.ftButton.isEnabled())
						this.app.title.fortuneTellerButton.execute();
					this.ftButton.setLabel("Freebie!");
					this.ftButton.setEnabled(true);
				}
				else
				{
					this.ftButton.setEnabled(false);
					var serverTime = webfrontend.data.ServerTime.getInstance();
					var stepsPerSec = serverTime.getStepsPerSecond();
					var timeString = webfrontend.Util.getTimespanString(nextFree / stepsPerSec);
					this.ftButton.setLabel('<font color="white">' + timeString + '</font>');
				}
			}
			catch(e)
			{
				EmpDebug("TickFortuneTeller: " + e);
			}
		},
		execFortuneTeller : function()
		{
			try
			{
				this.app.title.fortuneTellerButton.execute();
			}
			catch(e)
			{
				EmpDebug("ExecFortuneTeller: " + e);
			}

		},
		initBosSummary : function()
		{
			try
			{
				var container = this.app.title.reportButton.getLayoutParent();
				var button = new qx.ui.form.Button("Summary").set(
				{
					marginLeft : 3,
					width : 78,
					height : 32,
					toolTipText : "Click to show BOS Summary window"
				});
				container._add(button,
				{
					row : 0,
					column : this.titleColumnIndex++
				});
				button.addListener("execute", function(event)
				{
					Emperor.BOS.SummaryWidget.getInstance().showSummary();
				}, this);
			}
			catch(e)
			{
				EmpDebug("InitBosSummary: " + e);
			}
		},
		createServerBarButton : function(label, tooltip, func)
		{
			var btn = new qx.ui.form.Button(label).set(
			{
				width : 30,
				appearance : "button-text-small",
				toolTipText : tooltip
			});
			btn.addListener("click", func, this);
			this.serverBar.add(btn,
			{
				top : 2,
				left : this.buttonX
			});
			this.buttonX += 35;
		},
		// Emperor options button
		initOptionsButton : function()
		{
			this.optionsPage = new window.Emperor.OptionsPage();
			this.createServerBarButton("O", "Click to show Emperor Options", this.showOptionsPage);
		},
		showOptionsPage : function()
		{
			this.app.switchOverlay(this.optionsPage);
		},
		initEmpireTree : function()
		{
			this.createServerBarButton("E", "Show empire city tree", this.showEmpireTree);
		},
		showEmpireTree : function()
		{
			try
			{
				Emperor.Tree.getInstance().showTree();
			}
			catch(e)
			{
				EmpDebug("Main.ShowTree: " + e);
			}
		},
		initCityExporter : function()
		{
			this.createServerBarButton("C", "Show city export data", this.showCityExporter);
		},
		showCityExporter : function()
		{
			try
			{
				Emperor.Cities.getInstance().showCities();
			}
			catch(e)
			{
				EmpDebug("Main.ShowCities: " + e);
			}
		},
		initTestCode : function()
		{
			this.createServerBarButton("?", "Show test code", this.showTestCode);
		},
		showTestCode : function()
		{
			try
			{
				EmpDebug("Showing test code");
				var layout = new Emperor.Tweak.LayoutWindow(true);
				layout.testCode();
				delete layout;
			}
			catch(e)
			{
				EmpDebug("Main.TestCode: " + e);
			}
		},
		// Purify resources window button
		initPurifyWindow : function()
		{
			this.createBuildQueueButton("P", "Open 'Purify resources' window", this.showPurifyWindow, 275);
		},
		createBuildQueueButton : function(label, tooltip, func, left)
		{
			var btn = new qx.ui.form.Button(label);
			btn.set(
			{
				width : 25,
				appearance : "button-text-small",
				toolTipText : tooltip
			});
			btn.addListener("click", func, this);
			this.buildQueueHeader.add(btn,
			{
				top : 33,
				left : left
			});
			return btn;
		},
		initLayoutShortcuts : function()
		{
			this.createBuildQueueButton("-", "Remove old buildings", this.remOldBuildings, 10);
			this.createBuildQueueButton("+", "Add new buildings", this.addNewBuildings, 40);
			this.createBuildQueueButton("Q", "Fill the queue", this.fillTheQueue, 70);
			this.createBuildQueueButton("R", "Remove resources", this.removeResources, 100);
			this.createServerBarButton("-", "Remove old buildings", qx.lang.Function.bind(this.remOldBuildings, this));
			this.createServerBarButton("+", "Add new buildings", qx.lang.Function.bind(this.addNewBuildings, this));
			this.createServerBarButton("Q", "Fill the queue", qx.lang.Function.bind(this.fillTheQueue, this));
			this.createServerBarButton("R", "Remove resources", qx.lang.Function.bind(this.removeResources, this));
		},
		nextCity : function()
		{
			try
			{
				Emp.main.cityBar.nextButton.execute();
			}
			catch(e)
			{
				EmpDebug("NextCity: " + e);
			}
		},
		fillTheQueue : function()
		{
			try
			{
				var queue = Emperor.Net.CommandQueue.getInstance();
				queue.push(
				{
					a : "BuildingQueueFill",
					p :
					{
						cityid : webfrontend.data.City.getInstance().getId(),
					}
				});
				queue.sendCommands();
			}
			catch(e)
			{
				EmpDebug("FillTheQueue: " + e);
			}
		},
		// TODO for some reason the client crashes before even sending the command
		payForQueue : function()
		{
			try
			{
				var queue = Emperor.Net.CommandQueue.getInstance();
				queue.push(
				{
					a : "BuildingQueuePayAll",
					p :
					{
						cityid : webfrontend.data.City.getInstance().getId(),
					}
				});
				queue.sendCommands();
			}
			catch(e)
			{
				EmpDebug("PayForQueue: " + e);
			}
		},
		removeResources : function()
		{
			try
			{
				var layout = new Emperor.Tweak.LayoutWindow(true);
				layout.removeResources();
				delete layout;
			}
			catch(e)
			{
				EmpDebug("RemoveRes: " + e);
			}
		},
		remOldBuildings : function()
		{
			try
			{
				var layout = new Emperor.Tweak.LayoutWindow(true);
				layout.remOldBuildings();
				delete layout;
			}
			catch(e)
			{
				EmpDebug("RemOld: " + e);
			}
		},
		addNewBuildings : function()
		{
			try
			{
				var layout = new Emperor.Tweak.LayoutWindow(true);
				layout.addNewBuildings(10);
				delete layout;
			}
			catch(e)
			{
				EmpDebug("AddNew: " + e);
			}
		},
		showPurifyWindow : function()
		{
			if(webfrontend.data.City.getInstance().getCanPurifyResources())
			{
				var g = this.app.getTradeWidget();
				g.setTab(5);
				this.app.switchOverlay(g);
			}
		},
		// Incoming trade view on top of build queue.
		initIncomingTrade : function()
		{
			var civ_ch = this.cityInfoView.container.getChildren();
			for( i = 0; i < civ_ch.length; i++)
			{
				if(civ_ch[i] instanceof webfrontend.gui.CityTradeInfoView)
					this.cityTradeInfoView = civ_ch[i];
			}
			var lab = new Emperor.Tweak.IncomingResourcesLabel();
			this.buildQueue.getLayoutParent().addBefore(lab.incResCont, this.buildQueue);
		},
		initQueueTimesLabel : function()
		{
			this.queueTimesLabel = new Emperor.Tweak.QueueTimesLabel();
			if(this.app.selectorBar.isMapSelectorBarAnchorToLeft())
			{
				this.app.desktop.add(this.queueTimesLabel.queueTimeCont,
				{
					left : 690,
					top : 65
				});
			}
			else
			{
				this.app.desktop.add(this.queueTimesLabel.queueTimeCont,
				{
					left : 405,
					top : 65
				});
			}
		},
		initCityBuildingCounts : function()
		{
			Emperor.TDK.CityBuildingCounts.getInstance().setEnable(Boolean(Emp.options.enableBuildingCounts));
		},
		initCitySingleClicks : function()
		{
			Emperor.TDK.CitySingleClickOperations.getInstance().setEnable(Boolean(Emp.options.enableCityDemoToggle));
			if(Emp.options.enableCityDemoToggle)
				Emperor.TDK.CitySingleClickOperations.getInstance().rebuildOptions(Emp.options.cityDemoOptions);
		},
		initKeyboard : function()
		{
			this.keyboard = new Emperor.Tweak.Keyboard();
			this.keyboard.init();
		},
		// Get city data array, length 441. [0] is building id, [1] is level, [2] is type
		getCity : function()
		{
			try
			{
				if(Emp.a.visMain.mapmode != "c")
					return;
				_cells = Emp.a.visMain.cells;
				if(!_cells[0])
				{
					window.setTimeout(function()
					{
						Emp.main.getCity()
					}, 250);
					return;
				}
				_cgi = webfrontend.data.City.getInstance();
				waterCity = _cgi.getOnWater();
				_se = new Array();
				for(var _c in _cells)
				{
					_cell = _cells[_c].entities;
					for(var d in _cell)
					{
						if(_cell[d].basename != "CityWallLevel" && _cell[d].basename != "CityObject")
						{
							if(_cell[d].selectNode2 != null && _cell[d].selectNode3 != null)
							{
								if(_cell[d].selectNode.getY() < 880)
								{
									_se.push([_cell[d], _cell[d].selectNode2.getY() * 256 + _cell[d].selectNode2.getX() + 1, _cell[d].visId]);
								}
								else
								{
									_se.push([_cell[d], _cell[d].selectNode3.getY() * 256 + _cell[d].selectNode3.getX() + 1, _cell[d].visId]);
								}
								_se.push([_cell[d], _cell[d].selectNode.getY() * 256 + _cell[d].selectNode.getX(), _cell[d].visId]);
								_se.push([_cell[d], _cell[d].selectNode.getY() * 256 + _cell[d].selectNode.getX() + 1, _cell[d].visId]);
								_se.push([_cell[d], _cell[d].selectNode2.getY() * 256 + _cell[d].selectNode2.getX(), _cell[d].visId]);
								_se.push([_cell[d], _cell[d].selectNode3.getY() * 256 + _cell[d].selectNode3.getX(), _cell[d].visId]);
							}
							else
							{
								if(_cell[d].getType)
								{
									if(_cell[d].getType() > 51 && _cell[d].getType() < 60)
									{
										_se.push([_cell[d], _cell[d].selectNode.getY() * 256 + _cell[d].selectNode.getX() + 1, _cell[d].visId]);
										_se.push([_cell[d], _cell[d].selectNode.getY() * 256 + _cell[d].selectNode.getX() + 2, _cell[d].visId]);
										_se.push([_cell[d], (_cell[d].selectNode.getY() + 80) * 256 + _cell[d].selectNode.getX(), _cell[d].visId]);
										_se.push([_cell[d], (_cell[d].selectNode.getY() + 80) * 256 + _cell[d].selectNode.getX() + 1, _cell[d].visId]);
										_se.push([_cell[d], (_cell[d].selectNode.getY() + 80) * 256 + _cell[d].selectNode.getX() + 2, _cell[d].visId]);
										_se.push([_cell[d], (_cell[d].selectNode.getY() + 160) * 256 + _cell[d].selectNode.getX(), _cell[d].visId]);
										_se.push([_cell[d], (_cell[d].selectNode.getY() + 160) * 256 + _cell[d].selectNode.getX() + 1, _cell[d].visId]);
										_se.push([_cell[d], (_cell[d].selectNode.getY() + 160) * 256 + _cell[d].selectNode.getX() + 2, _cell[d].visId]);
									}
								}
								_se.push([_cell[d], _cell[d].selectNode.getY() * 256 + _cell[d].selectNode.getX(), _cell[d].visId]);
							}
						}
					}
				}

				_se.sort(function(a, b)
				{
					return a[1] - b[1];
				});

				this.city = new Array(441);
				_empty = [0, 1, 19, 20, 21, 41, 399, 419, 420, 421, 439, 440];
				_water = [352, 353, 373, 374, 375, 395, 396, 397, 398, 417, 418, 438];

				for( i = 0; i < this.city.length; i++)
				{
					this.city[i] = null;
				}

				for( i = 0; i < _empty.length; i++)
				{
					this.city[_empty[i]] = [-1, -1, -1];
				}
				// [buildingID/placeID, buildingLvl, buildingType]

				if(waterCity)
				{
					for( i = 0; i < _water.length; i++)
					{
						this.city[_water[i]] = [-1, -1, -2];
					}
				}

				for( i = 0, c = 0; i < _se.length; i++)
				{
					while(this.city[c] != null)
					{
						c++;
					}
					if(_se[i][0].getResType != undefined)
						this.city[c] = [_se[i][0].getId(), 0, _se[i][0].getResType() + 900];
					// resource node
					else if(_se[i][0].getType != undefined)
					{
						if(_se[i][0].getLevel != undefined)// building
							this.city[c] = [_se[i][0].getId(), _se[i][0].getLevel() + Emp.main.checkBuilding(_se[i][0].getId()), _se[i][0].getType()];
						else
							this.city[c] = [_se[i][0].getId(), _cgi.getWallLevel() + Emp.main.checkBuilding("wall"), _se[i][0].getType()];
						// wall
					}
					else if(_se[i][0].getPlaceId != undefined)
					{
						if(_se[i][0].drawNode != null)
						{
							if(_se[i][0].drawNode.image != undefined)
							{
								if(_se[i][0].drawNode.image.indexOf("tower") != -1)
								{
									this.city[c] = [_se[i][0].getPlaceId(), 0, 99];
									// tower place
								}
								else
								{
									this.city[c] = [_se[i][0].getPlaceId(), 0, 98];
									// empty, can be corn field
								}
							}
							else if(_se[i][0].drawNode.basename == "EffectNode")
							{
								this.city[c] = [_se[i][0].getPlaceId(), 0, 99];
								// ??? bottom left tower in water city
							}
						}
						else
						{
							if(waterCity && /\b(331|332|351|354|372|376|394|416)\b/.test(c))
							{
								this.city[c] = [_se[i][0].getPlaceId(), 0, 97];
								// water building place
							}
							else
							{
								this.city[c] = [_se[i][0].getPlaceId(), 0, 98];
								// empty
							}
						}
					}
				}
				for( i = 0; i < this.city.length; i++)
				{
					if(this.city[i] == null)
					{
						this.city = new Array(441);
						window.setTimeout(function()
						{
							Emp.main.getCity()
						}, 1000);
						return;
					}
				}
				Emp.main.cityId = _cgi.getId();
				Emp.city = this.city;
				if(Emp.city.length >= 441)
				{
					var nc = new Array(441);
					for(var i = 0; i < 446; i++)
					{
						var entry = Emp.city[i];
						if(entry != undefined && entry[0] != -1)
						{
							var x = (entry[0] >> 0) & 0xFF;
							var y = (entry[0] >> 8) & 0xFF;
							nc[y * 21 + x - 22] = entry;
						}
					}
					nc[1 * 21 + 1 - 22] = Emp.city[0];
					nc[1 * 21 + 2 - 22] = Emp.city[0];
					nc[1 * 21 + 20 - 22] = Emp.city[0];
					nc[1 * 21 + 21 - 22] = Emp.city[0];
					nc[2 * 21 + 1 - 22] = Emp.city[0];
					nc[2 * 21 + 21 - 22] = Emp.city[0];
					nc[20 * 21 + 1 - 22] = Emp.city[0];
					nc[20 * 21 + 21 - 22] = Emp.city[0];
					nc[21 * 21 + 1 - 22] = Emp.city[0];
					nc[21 * 21 + 2 - 22] = Emp.city[0];
					nc[21 * 21 + 20 - 22] = Emp.city[0];
					nc[21 * 21 + 21 - 22] = Emp.city[0];
					nc[8 * 21 + 6 - 22] = nc[7 * 21 + 7 - 22];
					nc[8 * 21 + 7 - 22] = nc[7 * 21 + 7 - 22];
					nc[8 * 21 + 15 - 22] = nc[7 * 21 + 15 - 22];
					nc[8 * 21 + 16 - 22] = nc[7 * 21 + 15 - 22];
					nc[14 * 21 + 6 - 22] = nc[15 * 21 + 7 - 22];
					nc[14 * 21 + 16 - 22] = nc[15 * 21 + 15 - 22];
					nc[15 * 21 + 8 - 22] = nc[15 * 21 + 7 - 22];
					nc[16 * 21 + 8 - 22] = nc[15 * 21 + 7 - 22];
					// Corners, repeating entries
					nc[1 * 21 + 3 - 22] = nc[2 * 21 + 2 - 22];
					nc[1 * 21 + 19 - 22] = nc[2 * 21 + 20 - 22];
					nc[2 * 21 + 3 - 22] = nc[2 * 21 + 2 - 22];
					nc[2 * 21 + 19 - 22] = nc[2 * 21 + 20 - 22];
					nc[3 * 21 + 1 - 22] = nc[2 * 21 + 2 - 22];
					nc[3 * 21 + 2 - 22] = nc[2 * 21 + 2 - 22];
					nc[3 * 21 + 20 - 22] = nc[2 * 21 + 20 - 22];
					nc[3 * 21 + 21 - 22] = nc[2 * 21 + 20 - 22];
					nc[19 * 21 + 1 - 22] = nc[20 * 21 + 2 - 22];
					nc[19 * 21 + 2 - 22] = nc[20 * 21 + 2 - 22];
					nc[19 * 21 + 20 - 22] = nc[20 * 21 + 20 - 22];
					nc[19 * 21 + 21 - 22] = nc[20 * 21 + 20 - 22];
					nc[20 * 21 + 3 - 22] = nc[20 * 21 + 2 - 22];
					nc[20 * 21 + 19 - 22] = nc[20 * 21 + 20 - 22];
					nc[21 * 21 + 3 - 22] = nc[20 * 21 + 2 - 22];
					nc[21 * 21 + 19 - 22] = nc[20 * 21 + 20 - 22];
					for( i = 0; i < 441; i++)
					{
						if(nc[i] == undefined)
							nc[i] = [-1, -1, -1];
					}
					if(waterCity)
					{
						var entry = Emp.city[17 * 21 + 17 - 22];
						nc[17 * 21 + 17 - 22] = entry;
						nc[17 * 21 + 18 - 22] = entry;
						nc[18 * 21 + 17 - 22] = entry;
						nc[18 * 21 + 18 - 22] = entry;
						nc[18 * 21 + 19 - 22] = entry;
						nc[19 * 21 + 18 - 22] = entry;
						nc[19 * 21 + 19 - 22] = entry;
						nc[19 * 21 + 20 - 22] = entry;
						nc[19 * 21 + 21 - 22] = entry;
						nc[20 * 21 + 19 - 22] = entry;
						nc[20 * 21 + 20 - 22] = entry;
						nc[21 * 21 + 19 - 22] = entry;
					}
					Emp.city = nc;
				}
			}
			catch(e)
			{
				EmpDebug("getCity: " + e);
			}
		},
		checkBuilding : function(_buildingId)
		{
			try
			{
				var cBuildQueue = webfrontend.data.City.getInstance().getBuildQueue();
				var d = 0;
				if(cBuildQueue != null)
				{
					for(var j = 0; j < cBuildQueue.length; j++)
					{
						if(cBuildQueue[j].building == _buildingId && (cBuildQueue[j].state == 2 || cBuildQueue[j].state == 5))
							return -11;
						// single downgrade / full demolish
						if(cBuildQueue[j].building == _buildingId)
							d++;
						if(cBuildQueue[j].type == CITYWALL && _buildingId == "wall")
							d++;
						// is city wall on queue?
					}
				}
			}
			catch(e)
			{
				EmpDebug("checkBuilding: " + e);
			}
			return d;
		},
		initAttackButtons : function()
		{
			try
			{
				var instance = Emperor.TDK.CityAttackOptions.getInstance();
				instance.setEnable(true);
				if(instance.enabled)
					instance.positionInStack(1);
				instance = Emperor.TDK.CityAttackOptions2.getInstance();
				instance.setEnable(true);
				if(instance.enabled)
					instance.positionInStack(2);
			}
			catch(e)
			{
				EmpDebug("InitAttackButtons: " + e);
			}
		},
		initCountUpgradeable : function()
		{
			webfrontend.data.City.getInstance().addListener("changeVersion", this.countUpgradeable, this);
		},
		countUpgradeable : function()
		{
			try
			{
				if(this.app.visMain.getBuildings().length == 0)
				{
					window.setTimeout(function()
					{
						Emp.main.countUpgradeable()
					}, 1500);
					return;
				}
				this.getCity();
				_upCount = 0;
				_wallLvl = 0;
				_palaceLvl = 0;
				for( i = 0; i < this.city.length; i++)
				{
					if(this.city[i] == null)
					{
						this.getCity();
						window.setTimeout(function()
						{
							Emp.main.countUpgradeable()
						}, 250);
						return;
					}
					if(this.city[i][1] > -1 && this.city[i][1] < 10 && !/\b(-1|-2|23|27|28|29|30|60|61|62|63|900|901|902|903|904|905|906|907|97|98|99)\b/.test(this.city[i][2]) && !(this.city[i][2] > 52 && this.city[i][2] < 60))
						_upCount++;
					else if(this.city[i][2] == 23)
						_wallLvl = this.city[i][1];
					else if(this.city[i][2] > 51 && this.city[i][2] < 60)
						_palaceLvl = this.city[i][1];
				}
				if(_wallLvl < 10)
					_upCount++;
				if(_palaceLvl > 0 && _palaceLvl < 10)
					_upCount++;
				_cba = _cgi.getBuildingLimit() - _cgi.getBuildingCount();
				if(this.buildQueue.buildingSlotsTooltip.getLabel().indexOf("LT_cUp") == -1)
				{
					this.buildQueue.buildingSlotsValue.setValue(_cba + " (" + _upCount + ")");
					_ctxt = '</tr><tr><td id="LT_cUp">' + "Buildings available for upgrade:" + '</td><td>' + _upCount + '</td></tr></table>';
					_ttxt = Emp.main.buildQueue.buildingSlotsTooltip.getLabel().replace("</tr></table>", _ctxt);
					this.buildQueue.buildingSlotsTooltip.setLabel(_ttxt);
				}
			}
			catch(e)
			{
				EmpDebug("CountUpgradeable: " + e);
			}
		},
		initTradeButtons : function()
		{
			this.tradeButtonsListener = webfrontend.base.Timer.getInstance().addListener("uiTick", this.createTradeButtons, this);
		},
		createTradeButtons : function()
		{
			try
			{
				if(this.app.tradeWidget)
				{
					_pageSend = null;
					for(var o in Emp.a.tradeWidget)
					{
						if(Emp.a.tradeWidget[o] != null && /SendResourcesPage/.test(Emp.a.tradeWidget[o].basename))
							_pageSend = Emp.a.tradeWidget[o];
						if(Emp.a.tradeWidget[o] != null && /RequestResourcesPage/.test(Emp.a.tradeWidget[o].basename))
							_prr = Emp.a.tradeWidget[o];
					}
					if(_pageSend == null)
						return;
					_pageSendCont = _pageSend.aResValueSpinner[0].getLayoutParent();
					// spinners container
					_tbd = [["1k", 1], ["5k", 5], ["10k", 10], ["25k", 25], ["50k", 50], ["100k", 100], ["250k", 250], ["500k", 500]];
					_pageSendCont.getLayout().setSpacingX(5);
					for( i = 0; i < 4; i++)
					{
						for( j = 0; j < 8; j++)
						{
							tb = new qx.ui.form.Button(_tbd[j][0]).set(
							{
								appearance : "button-recruiting",
								font : "bold"
							});
							tb.addListener("click", this.increaseResAmount,
							{
								am : _tbd[j][1],
								r : i,
								p : _pageSend
							});
							_pageSendCont.add(tb,
							{
								column : j + 3,
								row : i + 1
							});
						}
					}

					// add listeners to spinners in request resources page
					_prrTable = null;
					_spObj = null;
					_prrSel = null;
					for(var p in _prr)
					{
						if(_prr[p] != null)
						{
							if(_prr[p].toString().indexOf("SpinnerInt") != -1 && _prr[p].toString().indexOf("9999999") != -1)
							{
								re = /([_a-zA-z]+)(?=\s*=\s*\(?new\s*\(?webfrontend\.g?ui\.SpinnerInt)/g;
								_spObj = _prr[p].toString().match(re);
							}
							if(_prr[p].toString().indexOf("SimpleColFormattingDataModel") != -1)
							{
								_prrTable = _prr[p];
							}
							if(_prr[p].toString().indexOf("SelectBox") != -1)
							{
								_prrSel = _prr[p];
							}
						}
					}
					cb = new qx.ui.form.CheckBox("Limit");
					if(Emp.options.resLimit)
						cb.setValue(true);
					cb.addListener("appear", function()
					{
						this.setValue(Emp.options.resLimit);
					}, cb);
					_prr[_spObj[0]].getLayoutParent().add(cb,
					{
						row : 2,
						column : 0
					});
					Emp.main.temp_limit = cb;
					_prrSel.addListener("changeSelection", function()
					{
						if(this.getSelectables()[1] == this.getSelection()[0])
						{
							Emp.main.temp_limit.setValue(false);
						}
						else
						{
							Emp.main.temp_limit.setValue(Emp.options.resLimit);
						}
					}, _prrSel);
					_prrSel.addListener("appear", function()
					{
						if(this.t.getData().length > 0 && this.t.getData()[0].originalData.resType > 2)
							this.s.setSelection([this.s.getChildren()[0]]);
						if(this.s.getSelectables()[1] == this.s.getSelection()[0])
						{
							Emp.main.temp_limit.setValue(false);
						}
						else
						{
							Emp.main.temp_limit.setValue(Emp.options.resLimit);
						}
					},
					{
						t : _prrTable,
						s : _prrSel
					});

					_prr[_spObj[0]].addListener("changeValue", this.limitResources,
					{
						t : _prrTable,
						s : _prr[_spObj[0]],
						b : 0
					});
					_prr[_spObj[1]].addListener("changeValue", this.limitResources,
					{
						t : _prrTable,
						s : _prr[_spObj[1]],
						b : 1
					});

					webfrontend.base.Timer.getInstance().removeListenerById(this.tradeButtonsListener);
				}
			}
			catch(e)
			{
				EmpDebug("CreateTradeButtons: " + e);
			}
		},
		increaseResAmount : function()
		{
			curVal = this.p.aResValueSpinner[this.r].getValue();
			this.p.aResValueSpinner[this.r].setValue(curVal + this.am * 1000);
		},
		limitResources : function()
		{
			try
			{
				if(!Emp.main.temp_limit.getValue())
					return;
				c = webfrontend.data.City.getInstance();
				_it = c.tradeIncoming;
				if(_it == null || _it == undefined)
					_it = [];
				_data = this.t.getData();
				for( i = 0; i < _data.length; i++)
				{
					if(_data[i][0] == true)
					{
						_res = _data[i].originalData.resType;
						// resource type
						_inc = 0;
						// incoming trade
						for( k = 0; k < _it.length; k++)
						{
							for( j = 0; j < _it[k].resources.length; j++)
							{
								if(_it[k].resources[j].type == _res)
									_inc += _it[k].resources[j].count;
							}
						}
						_timeSpan = (this.b == 0) ? _data[i].originalData.tl : _data[i].originalData.ts;
						if(_res == 4)
						{
							_fc = Math.round(c.getFoodConsumption() * 3600);
							_fcs = Math.round(c.getFoodConsumptionSupporter() * 3600);
							_ft = c.getResourceGrowPerHour(4) - _fc - _fcs;
						}
						curVal = c.getResourceCount(_res);
						curDel = c.resources[_res].delta;
						curMax = c.getResourceMaxStorage(_res);
						_val = Math.floor(curMax - (curVal + ((_res == 4) ? _ft * _timeSpan / 3600 : _timeSpan * curDel)) - _inc);
						if(_val < 0)
							_val = 0;

						if(this.s.getValue() > _val)
						{
							this.s.setValue(_val);
						}
					}
				}
			}
			catch(e)
			{
				EmpDebug("LimitResources: " + e);
			}
		},
		initZoomSlider : function()
		{
			this.zoomSlider = new Emperor.BOS.ZoomSlider();
		},
		initTooltipTweak : function()
		{
			this.tooltipTweak = new Emperor.TooltipTweak();
		},
		initOverlayWindow : function()
		{
			try
			{
				var btn = this.createBuildQueueButton("L", "Generate layout Sharestring for current city", function()
				{
					this.layoutWindow.generateSharestring();
					this.layoutWindow.open();
				}, 305);
				// make the button disabled if in region view
				this.app.visMain.addListener("changeMapLoaded", function()
				{
					this.setEnabled(Emp.a.visMain.mapmode == "c" ? true : false);
				}, btn);
				this.layoutWindow = new Emperor.Tweak.LayoutWindow();
				this.app.visMain.addListener("changeMapLoaded", function()
				{
					this.tabView.setSelection([this.tabView.getChildren()[0]]);
					// this.win.close();
					this.showOverlayLayout();
				}, this.layoutWindow);
			}
			catch(e)
			{
				EmpDebug("InitOverlayWindow: " + e);
			}
		},
		initWorldExporter : function()
		{
			this.worldExporter = new Emperor.SKS.WorldExporter();
			this.worldExporter.init(this.buttonX);
			this.buttonX += 35;
		},
		// checkTradeMinisterWidget : function()
		// {
		// var ministerInfoWidget = this.app.ministerInfoWidget;
		// if(ministerInfoWidget)
		// {
		// if(ministerInfoWidget.isActive())
		// {
		// if(!this.tradeMinisterWidgetUpdated)
		// {
		// this.tradeMinisterWidget = null;
		// var keys = Object.keys(ministerInfoWidget);
		// for(var key in keys)
		// {
		// if(ministerInfoWidget[keys[key]] instanceof webfrontend.gui.TradeMinisterOptionsPage)
		// {
		// this.tradeMinisterWidget = ministerInfoWidget[keys[key]];
		// break;
		// }
		// }
		// if(this.tradeMinisterWidget)
		// {
		// if(this.updateTradeMinisterWidget())
		// this.tradeMinisterWidgetUpdated = true;
		// }
		// }
		// }
		// else
		// this.tradeMinisterWidgetUpdated = false;
		// }
		// else
		// this.tradeMinisterWidgetUpdated = false;
		// },
		// updateTradeMinisterWidget : function()
		// {
		// EmpDebug(this.tradeMinisterWidget);
		// var keys = Object.keys(this.tradeMinisterWidget);
		// for(var key in keys)
		// {
		// var propName = keys[key];
		// var propValue = this.tradeMinisterWidget[keys[key]];
		// if( propValue instanceof qx.ui.basic.Label)
		// {
		// EmpDebug("Label: " + propValue.getValue());
		// if(!propValue.getValue())
		// return false;
		// }
		// }
		// for(var key in keys)
		// {
		// if( propValue instanceof Array)
		// {
		// EmpDebug(propName + ": " + propValue);
		// if(propValue[0] instanceof webfrontend.gui.CustomSelectBox)
		// {
		// EmpDebug("Is an array of combo boxes");
		// }
		// }
		// }
		// return true;
		// },
		// tweakReport : function()
		// {
		// },
		loadOptions : function()
		{
			forceSave = false;
			var str = localStorage.getItem("Emp_options");
			if(str)
			{
				this.options = qx.lang.Json.parse(str);
				if(this.options.EmpVersion != EmpVersion)
					forceSave = true;
			}
			else
				forceSave = true;
			if(forceSave)
			{
				this.options =
				{
					"cityTypes" :
					{
						"offense" :
						{
							"berserkers" : "Z",
							"mages" : "M",
							"warlocks" : "L",
							"knights" : "K",
							"galleons" : "G",
							"catrams" : "E"
						},
						"defense" :
						{
							"rangers" : "R",
							"templars" : "T",
							"paladins" : "P",
							"ballista" : "B",
							"sloops" : "S",
						},
						"hubs" :
						{
							"food" : "F",
							"cluster" : "C",
							"storage" : "G",
							"transport" : "H"
						},
					},
					"hotkeys" :
					{
						"build" :
						{
							"woodcutter" : "W",
							"quarry" : "Q",
							"farm" : "F",
							"cottage" : "C",
							"market" : "P",
							"ironmine" : "I",
							"sawmill" : "L",
							"mill" : "M",
							"hideout" : "H",
							"stonemason" : "A",
							"foundry" : "D",
							"townhouse" : "U",
							"barracks" : "B",
							"cityguardhouse" : "K",
							"trainingground" : "G",
							"stable" : "E",
							"workshop" : "Y",
							"shipyard" : "V",
							"warehouse" : "S",
							"castle" : "X",
							"harbor" : "R",
							"moonglowtower" : "J",
							"trinsictemple" : "Z",
							"lookouttower" : "1",
							"ballistatower" : "2",
							"guardiantower" : "3",
							"rangertower" : "4",
							"templartower" : "5",
							"pitfalltrap" : "6",
							"barricade" : "7",
							"arcanetrap" : "8",
							"camouflagetrap" : "9"
						},
						"upgrades" :
						{
							"upgrade" : "U",
							"downgrade" : "D",
							"minister" : "A"
						},
						"global" :
						{
							"prevcity" : "[",
							"nextcity" : "]"
						}
					},
					"lowestLevelUpgradeIDs" : [WOODCUTTER, QUARRY, FARM, COTTAGE, MARKETPLACE, IRONMINE, SAWMILL, MILL, HIDEOUT, STONEMASON, FOUNDRY, TOWNHOUSE, BARRACKS, CITYGUARDHOUSE, TRAININGGROUND, STABLE, WORKSHOP, SHIPYARD, WAREHOUSE, CASTLE, HARBOR, MOONGLOWTOWER, TRINSICTEMPLE, LOOKOUTTOWER, BALLISTATOWER, GUARDIANTOWER, RANGERTOWER, TEMPLARTOWER, PITFALLTRAP, BARRICADE, ARCANETRAP, CAMOUFLAGETRAP, TOWNHALL, CITYWALL],
					"lowestLevelMax" : [10, 10, 10, 10, 10, 10, 10],
					"showIncResCont" : 1,
					"tradeLabelsAmount" : 999,
					"resLimit" : true,
					"showQueueTimes" : true,
					"enableBuildingCounts" : true,
					"enableCityDemoToggle" : true,
					"cityDemoToggleAutoOff" : true,
					// filled array, 33 build types + 2 for demolish, upgrade
					"cityDemoOptions" : new_Array(35, true),
					"EmpVersion" : EmpVersion
				};
			}
			this.app.setUserData("Emp_options", this.options);
			if(forceSave)
			{
				str = qx.lang.Json.stringify(this.options);
				localStorage.setItem("Emp_options", str);
			}
		},
		initBBInChatWindow : function()
		{
			var cont = new qx.ui.container.Composite(new qx.ui.layout.Grid());
			var btns = [
			{
				lab : "City",
				func : this.parseCoords
			},
			{
				lab : "Player",
				func : function()
				{
					this.parseText("player")
				}
			},
			{
				lab : "Alliance",
				func : function()
				{
					this.parseText("alliance")
				}
			},
			{
				lab : "Link",
				func : function()
				{
					this.parseText("url")
				}
			}];
			for( i = 0; i < btns.length; i++)
			{
				btn = new qx.ui.form.Button(btns[i].lab).set(
				{
					appearance : "button-text-small",
					padding : [0, 3, 0, 3]
				});
				btn.addListener("click", btns[i].func, this);
				cont.add(btn,
				{
					row : Math.floor(i / 2),
					column : i % 2
				});
			}
			this.chat.add(cont,
			{
				top : 0,
				left : 275
			});
		},
		parseCoords : function()
		{
			try
			{
				var tag = "city";
				if(this.chat.chatLine.getValue() == null)
					this.chat.chatLine.setValue("");
				re = new RegExp("\\b(\\d{1,3}\\:\\d{1,3})(?!\\[\\\/" + tag + "\\])\\b", "g");
				if(this.chat.chatLine.getValue().match(re))
				{
					this.chat.chatLine.setValue(this.chat.chatLine.getValue().replace(re, "[" + tag + "]$1[/" + tag + "]"));
					this.chat.chatLine.focus();
				}
				else
				{
					var pos = this.chat.chatLine.getValue().length + tag.length + 3;
					this.chat.chatLine.setValue(this.chat.chatLine.getValue() + " " + "[" + tag + "][/" + tag + "]");
					this.chat.chatLine.focus();
					this.chat.chatLine.setTextSelection(pos, pos);
				}
			}
			catch(e)
			{
				EmpDebug("ParseCoord: " + e);
			}
		},
		parseText : function(txt)
		{
			try
			{
				if(this.chat.chatLine.getValue() == null)
					this.chat.chatLine.setValue("");
				var cs = this.chat.chatLine.getTextSelection();
				var ss = this.chat.chatLine.getTextSelectionStart();
				var se = this.chat.chatLine.getTextSelectionEnd();
				if(cs != "")
				{
					this.chat.chatLine.setValue(this.chat.chatLine.getValue().substring(0, ss) + "[" + txt + "]" + cs + "[/" + txt + "]" + this.chat.chatLine.getValue().substring(se));
					this.chat.chatLine.focus();
				}
				else
				{
					var pos = this.chat.chatLine.getValue().length + txt.length + 3;
					this.chat.chatLine.setValue(this.chat.chatLine.getValue() + " " + "[" + txt + "][/" + txt + "]");
					this.chat.chatLine.focus();
					this.chat.chatLine.setTextSelection(pos, pos);
				}
			}
			catch(e)
			{
				EmpDebug("ParseText: " + e);
			}
		},
		initSendArmyWindow : function()
		{
			try
			{
				if(this.app.sendArmyWidget == null)
				{
					this.app.sendArmyWidget = new webfrontend.gui.SendArmyWindow();
				}
				this.app.sendArmyWidget.addListener("appear", this.listenerAppearSendArmyWindow, this);
			}
			catch(e)
			{
				EmpDebug("InitSendArmyWindow: " + e);
			}
		},
		listenerAppearSendArmyWindow : function()
		{
			try
			{
			}
			catch(e)
			{
				EmpDebug("AppearSendArmyWindow: " + e);
			}
		},
	}
});
// $Header: /Home/Emperor/Emperor.OptionsPage.js,v 1.1 2012/09/29 01:30:17 Aare Exp $

// AmpliDude's LoU Tweak Options page, reworked for the Emperor.

qx.Class.define("Emperor.OptionsPage",
{
	extend : webfrontend.gui.OverlayWidget,
	construct : function()
	{
		webfrontend.gui.OverlayWidget.call(this);

		this.clientArea.setLayout(new qx.ui.layout.Canvas());
		this.setTitle("Emperor Options");
		this.initTabView();
		this.initPage1();
		this.initPage2();
		this.initPage3();
		{
			// ----- Save Button
			cont = new qx.ui.container.Composite(new qx.ui.layout.HBox());
			btn = new qx.ui.form.Button("Save").set(
			{
				width : 90,
				marginLeft : 30
			});
			btn.addListener("click", this.saveOptions, this);
			cont.add(btn);

			// ----- Add pages to tabview
			for( i = 0; i < this.tabPages.length; i++)
			{
				this.tabView.add(this.tabPages[i].page);
			}

			this.clientArea.add(this.tabView,
			{
				top : 0,
				right : 3,
				bottom : 30,
				left : 3
			});
			this.clientArea.add(cont,
			{
				right : 3,
				bottom : 3,
				left : 3
			});
		}
	},
	members :
	{
		tabView : null,
		tabPages : null,
		clrSel : null,
		initTabView : function()
		{
			this.tabView = new qx.ui.tabview.TabView().set(
			{
				contentPaddingLeft : 15,
				contentPaddingRight : 10,
				contentPaddingTop : 10,
				contentPaddingBottom : 10
			});
			this.tabPages = [
			{
				name : "General",
				page : null,
				vbox : null
			},
			{
				name : "City Types",
				page : null,
				vbox : null
			},
			{
				name : "Colors",
				page : null,
				vbox : null
			}];
			for( i = 0; i < this.tabPages.length; i++)
			{
				page = new qx.ui.tabview.Page(this.tabPages[i].name);
				page.setLayout(new qx.ui.layout.Canvas());
				vbox = new qx.ui.container.Composite(new qx.ui.layout.VBox(10));
				scroll = new qx.ui.container.Scroll(vbox);
				page.add(scroll,
				{
					top : 0,
					left : 0,
					right : 0,
					bottom : 0
				});
				this.tabPages[i].vbox = vbox;
				this.tabPages[i].page = page;
			}
		},
		initPage1 : function()
		{
		},
		initPage2 : function()
		{
			lab = new qx.ui.basic.Label("Click on one of the following buttons and then press a key to define the label");
			this.tabPages[1].vbox.add(lab);
			gr = new qx.ui.layout.Grid(5, 5);
			gr.setColumnMinWidth(0, 50);
			gr.setColumnMinWidth(1, 150);
			gr.setColumnMinWidth(2, 50);
			gr.setColumnMinWidth(3, 50);
			gr.setColumnMinWidth(4, 200);
			cont = new qx.ui.container.Composite(gr);
			var cityTypes = [];

			// City type keys (left side)
			var ct1 = [
			// Offense troop city keys
			["Offense Troops", -1, "offense"],
			// Berserkers
			["Berserkers (3s 304K)", "berserkers", "offense"],
			// Mages
			["Mages (5s 212K)", "mages", "offense"],
			// Warlocks
			["Warlocks (12s 112K)", "warlocks", "offense"],
			// Knights
			["Knights (4s 108K)", "knights", "offense"],
			// Galleons
			["War Galleons", "galleons", "offense"],
			// Cats/rams
			["Catapults/Rams (45s 25.6K)", "catrams", "offense"],
			// Defense city troop keys
			["Defense Troops", -1, "defense"],
			// Rangers
			["Rangers (3s 280K)", "rangers", "defense"],
			// Templars
			["Templars (4s 272K)", "templars", "defense"],
			// Paladins
			["Paladins (7s 122K)", "paladins", "defense"],
			// Ballistae
			["Ballistae (34s 23.2K)", "ballista", "defense"],
			// Sloops
			["Sloops", "sloops", "defense"]];
			this.CreateLabels(cityTypes, ct1, 0);
			var ct2 = [
			// // Raider city keys
			// ["Raider cities", -1, "raiders"],
			// // Berserkers
			// ["Berserkers (7s 340K)", "berserkers", "raiders"],
			// // Knights
			// ["Knights (10s 158K)", "knights", "raiders"],
			// // Mages
			// ["Mages (10s 304K)", "mages", "raiders"],
			// // Warlocks
			// ["Warlocks (20s 148K)", "warlocks", "raiders"],
			// Hubs of all kinds
			["Hubs (All Kinds)", -1, "hubs"],
			// Food
			["Food/Hub", "food", "hubs"],
			// Cluster
			["Cluster Hub", "cluster", "hubs"],
			// Storage
			["Storage Hub", "storage", "hubs"],
			// Transport
			["Transport Hub", "transport", "hubs"]];
			this.CreateLabels(cityTypes, ct2, 3);
			Emp.a.setUserData("cityTypes", cityTypes);
			this.tabPages[1].vbox.add(cont);
		},
		CreateLabels : function(cityTypes, ct, col)
		{
			for( i = 0; i < ct.length; i++)
			{
				if(ct[i][1] == -1)
				{
					var lab = new qx.ui.basic.Label(ct[i][0]).set(
					{
						font : "bold"
					});
					cont.add(lab,
					{
						column : col,
						row : i,
						colSpan : 2
					});
				}
				else
				{
					var name = ct[i][0];
					var hk = Emp.options.cityTypes[ct[i][2]][ct[i][1]];
					var lab = new qx.ui.basic.Label(name);
					cont.add(lab,
					{
						column : col + 1,
						row : i
					});
					var btn = new qx.ui.form.Button(hk).set(
					{
						appearance : "button-recruiting",
						font : "bold"
					});
					btn.addListener("click", function()
					{
						Emp.a.allowHotKey = false;
						this.o.btn.setLabel("...");
						Emp.a.mainContainer.addListenerOnce("keypress", function(e)
						{
							this.o.t.setKey(e, this.o);
						},
						{
							o : this.o
						});
					},
					{
						o :
						{
							btn : btn,
							t : this,
							prop : ct[i][1],
							group : ct[i][2]
						}
					});
					cityTypes.push(
					{
						"btn" : btn,
						"group" : ct[i][2],
						"prop" : ct[i][1],
						"hk" : hk
					});
					cont.add(btn,
					{
						column : col + 0,
						row : i
					});
				}
			}
		},
		initPage3 : function()
		{
		},
		setKey : function(e, o)
		{
			if(Emp.a.getCurrentOverlay() != o.t)
			{
				Emp.a.allowHotKey = true;
				return;
			}
			key = e.getKeyIdentifier();
			ch = null;
			cb = null;
			ba = Emp.a.getUserData("cityTypes");
			for( i = 0; i < ba.length; i++)
			{
				if(ba[i].group == o.group && ba[i].hk == key)
					ch = ba[i];
				if(ba[i].btn == o.btn)
					cb = ba[i];
			}

			if(!/,/.test(key))
			{
				if(key != "Delete")
				{
					if(o.group == "global" && /[BCMEUL]/.test(key))
					{
						// global hotkeys B,C,M,R,U,L,(S,X,[,]), E prior to asscession
						o.btn.setLabel(Emp.options.cityTypes[o.group][o.prop]);
						Emp.a.allowHotKey = true;
						return;
					}
					if(ch)
					{
						Emp.options.cityTypes[o.group][ch.prop] = "";
						ch.btn.setLabel("");
						ch.hk = "";
					}
					Emp.options.cityTypes[o.group][o.prop] = key;
					cb.btn.setLabel(key);
					cb.hk = key;
				}
				else
				{
					Emp.options.cityTypes[o.group][o.prop] = "";
					cb.btn.setLabel("");
					cb.hk = "";
				}
			}
			Emp.a.allowHotKey = true;
		},
		saveOptions : function()
		{
			str = qx.lang.Json.stringify(Emp.options);
			localStorage.setItem("Emp_options", str);
			Emp.a.switchOverlay(null);
		},
	}
});
// $Header: /Home/Emperor/Emperor.Net.CommandQueue.js,v 1.3 2012/12/25 22:14:17 Aare Exp $

// AmpliDude's Tweak command queue object, extracted from keyboard code

(function()
{
	var COMMAND_QUEUE_INTERVAL = 700;

	qx.Class.define("Emperor.Net.CommandQueue",
	{
		extend : qx.core.Object,
		type : "singleton",
		construct : function()
		{
			try
			{
				this.timer = qx.util.TimerManager.getInstance();
				this.lastSendCommand = 0;
				this.sendCommandBuffer = new Array();
				this.sendCommandBusy = false;
			}
			catch(e)
			{
				EmpDebug("CommandQueue.construct: " + e);
			}
		},
		members :
		{
			timer : null,
			lastSendCommand : 0,
			sendCommandBuffer : null,
			sendCommandBusy : false,
			push : function(command)
			{
				this.sendCommandBuffer.push(command);
			},
			sendCommands : function()
			{
				if(!this.sendcommandBusy)
				{
					this.sendCommandBusy = true;
					this.sendCmd();
				}
			},
			sendCmd : function()
			{
				if(this.sendCommandBuffer.length == 0)
				{
					this.sendCommandBusy = false;
					return;
				}
				currentTime = new Date().getTime();
				if(currentTime > this.lastSendCommand + COMMAND_QUEUE_INTERVAL)
				{
					cmd = this.sendCommandBuffer.shift();
					//Emp.debug(cmd.a + ", " + cmd.p);
					webfrontend.net.CommandManager.getInstance().sendCommand(cmd.a, cmd.p, this, function()
					{
					});
					this.lastSendCommand = currentTime;
				}
				this.timer.start(this.sendCmd, null, this, null, COMMAND_QUEUE_INTERVAL + Math.random() * 300);
			},
		},
	});
})();
// $Header: /Home/Emperor/Emperor.Tweak.IncomingResourcesLabel.js,v 1.1 2012/09/29 01:30:17 Aare Exp $

// AmpliDude's LoU Tweak Incoming Resources Label.

qx.Class.define("Emperor.Tweak.IncomingResourcesLabel",
{
	extend : qx.core.Object,
	construct : function()
	{
		try
		{
			m = webfrontend.res.Main.getInstance();
			this.incResCont = new qx.ui.container.Composite(new qx.ui.layout.Canvas());
			this.incResContBgr = new qx.ui.basic.Image("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAVIAAABFCAMAAAAvr55KAAABX1BMVEVtSytsSiubjXRpRytqSCtbVUdoTz/Bm36jfGOie2OifGOajHSajXSFe2VwZ1VtYlGlfWSYdV6KajJmRCuhk3mYinGYcFl2VSuunoJtU0J3XUqngWe+rY5+c2BdUkN+XkvAmn18ZVLOvJuomX5lVkammH3dyabGtJWvn4PZxqNjXU2gknjFtJSZi3J0UythPiuThWyXclqYc1uUhW2ShGyfeGDl0Kt3VitfPCuac1qcdl1eOyuShGtgPStjQSuhkXeUhm2ohmuAXytVMSt5WCvSv5yThGzEqYmed19vTSt9XCtwTiuXcVrl0ayWcFpyUStdOiuYiXCWcVp7Wiu7nH+wnoJxUCtrSSvBr5CXc1vm0azdyaWZc1uShWyBYSuThG3kz6qVhm6wj3Z8WyuhemJ1VCuadFxuTCvjzanJsJCSczygeWGajHOie2JkQiueeF9XMyuIaDBiPyuVh26XiHAEM5p5AAACG0lEQVR4XuzW1W0FQRiD0b+imWXey8zMzBBO+lfSQ/zoU8InWbIsvN3IfYcgd7TzFuK1q6ECobDa9uR2Dx8fIPQI7zdZ5g/FNxAqHvJLKUc9nYKQ7kVlma2QSZl0NZOxldEwlLHGkjU1EJlZ6ZspEJl9sVspELVscToaiDqOJNCk1EnEgA6fWgY+KZM6Aw1EA0cSaFIaJGJAfymZhhjzWKcgpOO5IWtLxV8gFCtrLZXLZhoEMQAFwXRzqcg2KhUyIFQoRVuxa/6wNCwA0F9Iv2bL3lX+sfEJQI2jr9y95J5dpc4NADor1X3m5PvUnHRBaNI8vcjP6/Var9eb/0a/7NnBbcQwDETRCU+S7IPtRcpIIapEF9L9H4OtIWNggfxXgA4DkYSoOedaFfqu9Tb/DOutdn+kRPrTlxF6KpuM0ELRvozQQnuTEVr4C59Io2SESsWQEcZmHk9ooXRHSqRbyYxeWjIj0i4j9Pz0Xsp4Qgtz4aOnP1IizZIRyj2e8Mi+lEiHjDA2bUNeRJolMx6kTR+P7zwmvozQwtxLUfnvJj5/T7yeYO+lqFR2GaHnE4XP2mR92WCNUB73lAnmfaTivF7TBK/rDP22AydXDIJAAEDniUlO4IXHvuOurdB/O2lijvNlVZohIVpVCWZxns0oCPNuMRB4yuWHgpSceIDWxWq/KIhdRW+wH1u8PyjIHbdjh3G95zOhIM/5XuMPR3QydajAz8UAAAAASUVORK5CYII=");
			this.incResContBgr.setWidth(338);
			this.incResContBgr.setHeight(69);
			this.incResCont.add(this.incResContBgr,
			{
				left : 0,
				top : 0
			});
			this.incResLab = new qx.ui.basic.Label("Incoming resources").set(
			{
				font : "bold",
				textColor : "#ffCC82"
			});
			this.incResCont.add(this.incResLab,
			{
				left : 8,
				top : 3
			});
			this.incResLabNext = new qx.ui.basic.Label("Next arrival in:").set(
			{
				font : "bold",
				width : 150,
				textAlign : "right",
				textColor : "#ffCC82"
			});
			this.incResCont.add(this.incResLabNext,
			{
				left : 180,
				top : 3
			});
			this.incResLabTr = new qx.ui.basic.Label("TR:").set(
			{
				font : "bold",
				textColor : "#ffCC82"
			});
			this.incResCont.add(this.incResLabTr,
			{
				left : 6,
				top : 38
			});
			this.incResLabFs = new qx.ui.basic.Label("FS:").set(
			{
				font : "bold",
				textColor : "#ffCC82"
			});
			this.incResCont.add(this.incResLabFs,
			{
				left : 7,
				top : 50
			});
			for( i = 0; i < 4; i++)
			{
				imgo = m.getFileInfo(m.resources[i + 1].i);
				incResImg = new qx.ui.basic.Image(webfrontend.config.Config.getInstance().getUIImagePath(imgo.url));
				incResImg.setHeight(22);
				incResImg.setWidth(20);
				incResImg.setScale(true);
				this.incResCont.add(incResImg,
				{
					top : 17,
					left : 5 + 83 * i
				});
				incResLab = new qx.ui.basic.Label("").set(
				{
					width : 62,
					textAlign : "center",
					font : "bold"
				});
				this.incResCont.setUserData("incResLab" + (i + 1), incResLab);
				this.incResCont.add(incResLab,
				{
					top : 21,
					left : 27 + 82 * i
				});
				incResLab = new qx.ui.basic.Label("").set(
				{
					width : 62,
					textAlign : "center",
					font : "bold"
				});
				this.incResCont.setUserData("incResLabTot" + (i + 1), incResLab);
				this.incResCont.add(incResLab,
				{
					top : 38,
					left : 27 + 82 * i
				});
				incResLab = new qx.ui.basic.Label("").set(
				{
					width : 62,
					textAlign : "center",
					font : "bold"
				});
				this.incResCont.setUserData("incResLabFree" + (i + 1), incResLab);
				this.incResCont.add(incResLab,
				{
					top : 50,
					left : 27 + 82 * i
				});
			}
			webfrontend.base.Timer.getInstance().addListener("uiTick", this.updateIncResCont, this);
		}
		catch(e)
		{
			EmpDebug("IncomingResLabel.construct: " + e);
		}
	},
	members :
	{
		incResCont : null,
		incResContBgr : null,
		incResLab : null,
		incResLabNext : null,
		incResLabTr : null,
		incResLabFs : null,
		updateIncResCont : function()
		{
			try
			{
				var c = webfrontend.data.City.getInstance();
				it = c.getTradeIncoming();
				ot = c.getTradeOrders();
				if(it == null || it == undefined)
				{
					if(Emp.options.showIncResCont == 2)
					{
						this.incResCont.setVisibility("excluded");
						return;
					}
					this.incResCont.setVisibility("visible");
					it = [];
				}
				this.incResCont.setVisibility("visible");
				var resVal = [0, 0, 0, 0, 0, -1];
				// 0 - last trader, 1-4 res, 5 - first trader
				for( i = 0; i < it.length; i++)
				{
					for( j = 0; j < it[i].resources.length; j++)
					{
						resVal[it[i].resources[j].type] += it[i].resources[j].count;
					}
					if(it[i].end > resVal[0])
						resVal[0] = it[i].end;
					if(resVal[5] == -1 || it[i].end < resVal[5])
						resVal[5] = it[i].end;
				}

				for( i = 1; i < 5; i++)
				{
					freeSpc = 0;
					curVal = c.getResourceCount(i);
					curDel = (c.resources[i] == undefined ? 0 : c.resources[i].delta);
					curMax = c.getResourceMaxStorage(i);
					dateNow = new Date().getTime();
					this.incResCont.getUserData("incResLab" + i).setTextColor("#FFCC82");
					this.incResCont.getUserData("incResLab" + i).setValue(EmpThSep(resVal[i]));
					ft = 0;
					if(i == 4)
					{
						fc = Math.round(c.getFoodConsumption() * 3600);
						fcs = Math.round(c.getFoodConsumptionSupporter() * 3600);
						ft = c.getResourceGrowPerHour(i) - fc - fcs;
					}
					if(it.length > 0)
					{
						timeSpan = resVal[0] - webfrontend.data.ServerTime.getInstance().getServerStep();
						resAtArrival = Math.floor(curVal + ((i == 4) ? ft * timeSpan / 3600 : timeSpan * curDel) + resVal[i]);

						if(curVal == curMax)
							freeSpc = -resVal[i];
						else
							freeSpc = curMax - resAtArrival;

						if(resAtArrival > curMax)
							resAtArrival = curMax;
					}
					else
					{
						resAtArrival = Math.floor(curVal);
						freeSpc = curMax - curVal;
					}
					this.incResCont.getUserData("incResLabTot" + i).setValue(EmpThSep(resAtArrival));
					this.incResCont.getUserData("incResLabFree" + i).setValue(EmpThSep(Math.floor(freeSpc)));

					if(freeSpc < 0)
					{
						clr = "#FF0000";
					}
					else
					{
						clr = "#FFCC82";
					}
					this.incResCont.getUserData("incResLabFree" + i).setTextColor(clr);
					r = resAtArrival / curMax;
					clr = "#40C849";
					if(r > 0)
					{
						if(r >= 1.0)
						{
							clr = "#FF0000";
						}
						else if(r >= 0.9)
						{
							clr = "#F7941D";
						}
						else if(r >= 0.75)
						{
							clr = "#FFE400";
						}
						else
						{
							clr = "#40C849";
						}
					}
					this.incResCont.getUserData("incResLabTot" + i).setTextColor(clr);
				}

				if(it.length > 0)
				{
					timeSpan = resVal[5] - webfrontend.data.ServerTime.getInstance().getServerStep();
					this.incResLabNext.setValue("Next arrival in: " + webfrontend.Util.getTimespanString(timeSpan));
				}
				else
					this.incResLabNext.setValue("");
			}
			catch(e)
			{
				EmpDebug("IncomingResLabel.updateIncResCont: " + e);
			}
		}
	}
});
// $Header: /Home/Emperor/Emperor.Tweak.QueueTimesLabel.js,v 1.1 2012/09/29 01:30:17 Aare Exp $

// AmpliDude's LoU Tweak Queue Times Label.

qx.Class.define("Emperor.Tweak.QueueTimesLabel",
{
	extend : qx.core.Object,
	construct : function()
	{
		try
		{
			this.queueTimeCont = new qx.ui.container.Composite(new qx.ui.layout.Canvas());
			this.queueTimeContBgr = new qx.ui.basic.Image("data:image/png;base64,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");
			this.queueTimeContBgr.setWidth(280);
			this.queueTimeContBgr.setHeight(50);
			this.queueTimeCont.add(this.queueTimeContBgr,
			{
				left : 0,
				top : 0
			});
			gr = new qx.ui.layout.Grid(3, 4);
			gr.setColumnMaxWidth(0, 20);
			gr.setColumnMinWidth(1, 200);
			gr.setColumnMaxWidth(2, 40);
			this.queueTimeGrid = new qx.ui.container.Composite(gr);
			this.queueTimeCont.add(this.queueTimeGrid,
			{
				left : 8,
				top : 8
			});
			this.queueTimeGrid.add(new qx.ui.basic.Label("BQ:").set(
			{
				textColor : "text-gold",
				font : "bold"
			}),
			{
				column : 0,
				row : 0
			});
			this.queueTimeGrid.add(new qx.ui.basic.Label("UQ:").set(
			{
				textColor : "text-gold",
				font : "bold"
			}),
			{
				column : 0,
				row : 1
			});
			this.buildQueueTimeLabel = new qx.ui.basic.Label("").set(
			{
				textColor : "text-gold",
				font : "bold"
			});
			this.buildQueueSlotsLabel = new qx.ui.basic.Label("").set(
			{
				textColor : "text-gold",
				font : "bold"
			});
			this.unitQueueTimeLabel = new qx.ui.basic.Label("").set(
			{
				textColor : "text-gold",
				font : "bold"
			});
			this.unitQueueSlotsLabel = new qx.ui.basic.Label("").set(
			{
				textColor : "text-gold",
				font : "bold"
			});
			this.queueTimeGrid.add(this.buildQueueTimeLabel,
			{
				column : 1,
				row : 0
			});
			this.queueTimeGrid.add(this.buildQueueSlotsLabel,
			{
				column : 2,
				row : 0
			});
			this.queueTimeGrid.add(this.unitQueueTimeLabel,
			{
				column : 1,
				row : 1
			});
			this.queueTimeGrid.add(this.unitQueueSlotsLabel,
			{
				column : 2,
				row : 1
			});

			webfrontend.base.Timer.getInstance().addListener("uiTick", this.updateQueueTimes, this);
		}
		catch(e)
		{
			EmpDebug("QTL:construct: " + e);
		}
	},
	members :
	{
		queueTimeCont : null,
		queueTimeContBgr : null,
		queueTimeGrid : null,
		buildQueueTimeLabel : null,
		buildQueueSlotsLabel : null,
		unitQueueTimeLabel : null,
		unitQueueSlotsLabel : null,
		updateQueueTimes : function()
		{
			try
			{
				if(Emp.options.showQueueTimes)
					this.queueTimeCont.setVisibility("visible");
				else
					this.queueTimeCont.setVisibility("excluded");

				if( typeof Emp.a.selectorBar.isMapSelectorBarAnchorToLeft != 'undefined')
				{
					if(Emp.a.selectorBar.isMapSelectorBarAnchorToLeft())
					{
						if(Emp.a.selectorBar.contNavigationRose.isVisible())
							this.queueTimeCont.setLayoutProperties(
							{
								left : 690,
								top : 65
							});
						else
							this.queueTimeCont.setLayoutProperties(
							{
								left : 405,
								top : 135
							});
					}
					else
					{
						this.queueTimeCont.setLayoutProperties(
						{
							left : 405,
							top : 65
						});
					}
				}
				var p = webfrontend.data.Player.getInstance();
				var b = webfrontend.data.City.getInstance().buildQueue;
				var u = webfrontend.data.City.getInstance().unitQueue;
				var st = webfrontend.data.ServerTime.getInstance();
				if(b != null)
				{
					timeSpan = b[b.length - 1].end - st.getServerStep();
					endTime = webfrontend.Util.getDateTimeString(st.getStepTime(b[b.length - 1].end));
					if(timeSpan < 0)
						this.buildQueueTimeLabel.setValue("0:00");
					else
						this.buildQueueTimeLabel.setValue(endTime + " (" + webfrontend.Util.getTimespanString(timeSpan) + ")");
					this.buildQueueSlotsLabel.setValue(b.length + " / " + p.getMaxBuildQueueSize());
				}
				else
				{
					this.buildQueueTimeLabel.setValue("0:00");
					this.buildQueueSlotsLabel.setValue("0" + " / " + p.getMaxBuildQueueSize());
				}
				if(u != null)
				{
					timeSpan = u[u.length - 1].end - st.getServerStep();
					endTime = webfrontend.Util.getDateTimeString(st.getStepTime(u[u.length - 1].end));
					if(timeSpan < 0)
						this.unitQueueTimeLabel.setValue("0:00");
					else
						this.unitQueueTimeLabel.setValue(endTime + " (" + webfrontend.Util.getTimespanString(timeSpan) + ")");
					this.unitQueueSlotsLabel.setValue(u.length + " / " + p.getMaxUnitQueueSize());
				}
				else
				{
					this.unitQueueTimeLabel.setValue("0:00");
					this.unitQueueSlotsLabel.setValue("0" + " / " + p.getMaxUnitQueueSize());
				}
			}
			catch(e)
			{
				EmpDebug("QTL:Update: " + e);
			}
		}
	}
});
// $Header: /Home/Emperor/Emperor.Tweak.Keyboard.js,v 1.2 2012/10/13 20:49:28 Aare Exp $

// AmpliDude's LoU Tweak Keyboard routines.

qx.Class.define("Emperor.Tweak.Keyboard",
{
	extend : qx.core.Object,
	construct : function()
	{
		try
		{
			this.app = Emp.main.app;
			this.main = Emp.main;
			this.buildingDetailView = Emp.main.buildingDetailView;
			this.buildingPlaceDetailView = Emp.main.buildingPlaceDetailView;
			this.moveBuildingDetailView = Emp.main.moveBuildingDetailView;
			this.cityBar = Emp.main.cityBar;
			this.options = Emp.main.options;
		}
		catch(e)
		{
			EmpDebug("Tweak.Keyboard.construct: " + e);
		}
	},
	statics :
	{
		lou_building_id :
		{
			"woodcutter" : WOODCUTTER,
			"quarry" : QUARRY,
			"farm" : FARM,
			"cottage" : COTTAGE,
			"market" : MARKETPLACE,
			"ironmine" : IRONMINE,
			"sawmill" : SAWMILL,
			"mill" : MILL,
			"hideout" : HIDEOUT,
			"stonemason" : STONEMASON,
			"foundry" : FOUNDRY,
			"townhouse" : TOWNHOUSE,
			"barracks" : BARRACKS,
			"cityguardhouse" : CITYGUARDHOUSE,
			"trainingground" : TRAININGGROUND,
			"stable" : STABLE,
			"workshop" : WORKSHOP,
			"shipyard" : SHIPYARD,
			"warehouse" : WAREHOUSE,
			"castle" : CASTLE,
			"harbor" : HARBOR,
			"moonglowtower" : MOONGLOWTOWER,
			"trinsictemple" : TRINSICTEMPLE,
			"lookouttower" : LOOKOUTTOWER,
			"ballistatower" : BALLISTATOWER,
			"guardiantower" : GUARDIANTOWER,
			"rangertower" : RANGERTOWER,
			"templartower" : TEMPLARTOWER,
			"pitfalltrap" : PITFALLTRAP,
			"barricade" : BARRICADE,
			"arcanetrap" : ARCANETRAP,
			"camouflagetrap" : CAMOUFLAGETRAP
		},
		bd :
		{
			/* woodcutter */
			"1" :
			{
				"w" : [50, 200, 400, 1400, 3500, 6000, 10000, 16000, 25000, 38000],
				"s" : [0, 0, 200, 600, 1500, 3000, 5000, 8000, 13000, 20000],
				"th" : 1
			},
			/* quarry */
			"2" :
			{
				"w" : [50, 200, 400, 1400, 3500, 6000, 10000, 16000, 25000, 38000],
				"s" : [0, 0, 200, 600, 1500, 3000, 5000, 8000, 13000, 20000],
				"th" : 2
			},
			/* farm */
			"3" :
			{
				"w" : [50, 200, 400, 1400, 3500, 6000, 10000, 16000, 25000, 38000],
				"s" : [0, 0, 200, 600, 1500, 3000, 5000, 8000, 13000, 20000],
				"th" : 3
			},
			/* cottage */
			"4" :
			{
				"w" : [0, 0, 0, 0, 200, 500, 1000, 2000, 5000, 12000],
				"s" : [50, 150, 300, 600, 1000, 2000, 4000, 7500, 14000, 17000],
				"th" : 1
			},
			/* marketplace */
			"5" :
			{
				"w" : [40, 80, 160, 400, 1200, 2800, 5600, 9600, 15200, 23200],
				"s" : [20, 40, 80, 200, 600, 1400, 2800, 4800, 7600, 11600],
				"th" : 5
			},
			/* iron mine */
			"6" :
			{
				"w" : [50, 200, 400, 1400, 3500, 6000, 10000, 16000, 25000, 38000],
				"s" : [0, 0, 200, 600, 1500, 3000, 5000, 8000, 13000, 20000],
				"th" : 4
			},
			/* sawmill */
			"7" :
			{
				"w" : [60, 150, 350, 1100, 2700, 5000, 8500, 13500, 21500, 33000],
				"s" : [60, 150, 350, 1100, 2700, 5000, 8500, 13500, 21500, 33000],
				"th" : 6
			},
			/* mill */
			"8" :
			{
				"w" : [60, 150, 350, 1100, 2700, 5000, 8500, 13500, 21500, 33000],
				"s" : [60, 150, 350, 1100, 2700, 5000, 8500, 13500, 21500, 33000],
				"th" : 8
			},
			/* hideout */
			"9" :
			{
				"w" : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				"s" : [50, 200, 600, 1000, 1500, 2200, 3500, 4500, 6000, 8000],
				"th" : 2
			},
			/* stonemason */
			"10" :
			{
				"w" : [60, 150, 350, 1100, 2700, 5000, 8500, 13500, 21500, 33000],
				"s" : [60, 150, 350, 1100, 2700, 5000, 7800, 13500, 21500, 33000],
				"th" : 7
			},
			/* foundry */
			"11" :
			{
				"w" : [60, 150, 350, 1100, 2700, 5000, 8500, 13500, 21500, 33000],
				"s" : [60, 150, 350, 1100, 2700, 5000, 8500, 13500, 21500, 33000],
				"th" : 9
			},
			/* town hall */
			"12" :
			{
				"w" : [0, 200, 500, 1000, 3000, 8000, 15000, 30000, 60000, 120000],
				"s" : [0, 0, 100, 300, 1500, 4000, 10000, 25000, 60000, 120000],
				"th" : 0
			},
			/* townhouse */
			"13" :
			{
				"w" : [0, 0, 0, 0, 1000, 2000, 3500, 7000, 14000, 29000],
				"s" : [100, 300, 600, 2000, 4000, 7000, 11500, 17000, 24000, 29000],
				"th" : 5
			},
			/* barracks */
			"14" :
			{
				"w" : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				"s" : [50, 150, 300, 600, 1200, 2500, 4000, 7000, 11500, 17500],
				"th" : 4
			},
			/* city guard house */
			"15" :
			{
				"w" : [15, 30, 55, 140, 400, 1000, 1900, 3200, 5100, 8000],
				"s" : [30, 60, 110, 280, 800, 2000, 3800, 6400, 10200, 16000],
				"th" : 3
			},
			/* training ground */
			"16" :
			{
				"w" : [20, 40, 80, 200, 600, 1400, 2800, 4800, 7500, 11500],
				"s" : [40, 80, 160, 400, 1200, 2800, 5600, 9600, 15000, 23000],
				"th" : 4
			},
			/* stable */
			"17" :
			{
				"w" : [25, 55, 110, 275, 800, 1900, 3750, 6500, 10200, 15500],
				"s" : [50, 110, 220, 550, 1600, 3800, 7500, 13000, 20400, 31000],
				"th" : 6
			},
			/* workshop */
			"18" :
			{
				"w" : [40, 75, 150, 370, 1100, 2600, 5200, 8900, 14000, 21500],
				"s" : [80, 150, 300, 740, 2200, 5200, 10400, 17800, 28000, 43000],
				"th" : 9
			},
			/* shipyard */
			"19" :
			{
				"w" : [50, 100, 200, 500, 1500, 3500, 7000, 12000, 19000, 29000],
				"s" : [100, 200, 400, 1000, 3000, 7000, 14000, 24000, 38000, 58000],
				"th" : 10
			},
			/* warehouse */
			"20" :
			{
				"w" : [60, 150, 250, 500, 1600, 3000, 6000, 9600, 15000, 20000],
				"s" : [0, 0, 50, 150, 400, 1000, 2000, 4800, 9000, 13000],
				"th" : 1
			},
			/* castle */
			"21" :
			{
				"w" : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				"s" : [20000, 25000, 30000, 40000, 55000, 75000, 100000, 130000, 160000, 200000],
				"th" : 8
			},
			/* harbor */
			"22" :
			{
				"w" : [80, 160, 320, 800, 2400, 5600, 11200, 19200, 30400, 46400],
				"s" : [40, 80, 160, 400, 1200, 2800, 5600, 9600, 15200, 23200],
				"th" : 10
			},
			/* wall */
			"23" :
			{
				"w" : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				"s" : [200, 2000, 8000, 20000, 30000, 45000, 70000, 100000, 140000, 200000],
				"th" : 2
			},
			/* moonglow tower */
			"36" :
			{
				"w" : [30, 60, 120, 300, 900, 2100, 4200, 7200, 11400, 17400],
				"s" : [60, 120, 240, 600, 1800, 4200, 8400, 14400, 22800, 34800],
				"th" : 7
			},
			/* trinsic temple */
			"37" :
			{
				"w" : [35, 70, 135, 335, 1000, 2350, 4650, 8000, 12700, 19500],
				"s" : [70, 140, 270, 670, 2000, 4700, 9300, 16000, 25400, 39000],
				"th" : 8
			},
			/* lookout tower */
			"38" :
			{
				"w" : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				"s" : [200, 400, 600, 1000, 1500, 2200, 3500, 5000, 7500, 10000],
				"th" : 2
			},
			/* ballista tower */
			"39" :
			{
				"w" : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				"s" : [100, 200, 400, 1000, 3000, 7000, 14000, 24000, 38000, 58000],
				"th" : 9
			},
			/* guardian tower */
			"40" :
			{
				"w" : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				"s" : [100, 200, 400, 1000, 3000, 7000, 14000, 24000, 38000, 58000],
				"th" : 6
			},
			/* ranger tower */
			"41" :
			{
				"w" : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				"s" : [100, 200, 400, 1000, 3000, 7000, 14000, 24000, 38000, 58000],
				"th" : 3
			},
			/* templar tower */
			"42" :
			{
				"w" : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				"s" : [100, 200, 400, 1000, 3000, 7000, 14000, 24000, 38000, 58000],
				"th" : 8
			},
			/* pitfall trap */
			"43" :
			{
				"w" : [30, 60, 110, 280, 830, 1930, 3850, 6600, 10500, 16000],
				"s" : [90, 180, 330, 840, 2490, 5790, 11550, 19800, 31500, 48000],
				"th" : 5
			},
			/* barricade */
			"44" :
			{
				"w" : [30, 60, 110, 280, 830, 1930, 3850, 6600, 10500, 16000],
				"s" : [90, 180, 330, 840, 2490, 5790, 11550, 19800, 31500, 48000],
				"th" : 7
			},
			/* arcane trap */
			"45" :
			{
				"w" : [30, 60, 110, 280, 830, 1930, 3850, 6600, 10500, 16000],
				"s" : [90, 180, 330, 840, 2490, 5790, 11550, 19800, 31500, 48000],
				"th" : 8
			},
			/* camouflage trap */
			"46" :
			{
				"w" : [30, 60, 110, 280, 830, 1930, 3850, 6600, 10500, 16000],
				"s" : [90, 180, 330, 840, 2490, 5790, 11550, 19800, 31500, 48000],
				"th" : 10
			},
			/* woodcutter */
			"47" :
			{
				"w" : [50, 200, 400, 1400, 3500, 6000, 10000, 16000, 25000, 38000],
				"s" : [0, 0, 200, 600, 1500, 3000, 5000, 8000, 13000, 20000],
				"th" : 1
			},
			/* quarry */
			"48" :
			{
				"w" : [50, 200, 400, 1400, 3500, 6000, 10000, 16000, 25000, 38000],
				"s" : [0, 0, 200, 600, 1500, 3000, 5000, 8000, 13000, 20000],
				"th" : 2
			},
			/* iron mine */
			"49" :
			{
				"w" : [50, 200, 400, 1400, 3500, 6000, 10000, 16000, 25000, 38000],
				"s" : [0, 0, 200, 600, 1500, 3000, 5000, 8000, 13000, 20000],
				"th" : 4
			},
			/* farm */
			"50" :
			{
				"w" : [50, 200, 400, 1400, 3500, 6000, 10000, 16000, 25000, 38000],
				"s" : [0, 0, 200, 600, 1500, 3000, 5000, 8000, 13000, 20000],
				"th" : 3
			},
		}
	},
	members :
	{
		app : null,
		main : null,
		buildingDetailView : null,
		buildingPlaceDetailView : null,
		moveBuildingDetailView : null,
		cityBar : null,
		options : null,
		init : function()
		{
			// app keyboard
			Emp.a.mainContainer.addListener("keypress", this.appPerformAction, this);
			// scene keyboard
			Emp.a.visMain.scene.getOutputWidget().addListener("keypress", this.scenePerformAction, this);
		},
		appPerformAction : function(e)
		{
			try
			{
				if(!this.app.allowHotKey || this.buildingDetailView.visBuilding != null || this.buildingPlaceDetailView.active || this.app.currentOverlay != null || this.app.cityBar.citiesSelect.getSelectables()[0].getLayoutParent().getLayoutParent().getLayoutParent().getLayoutParent().isVisible())
				{
					return;
				}
				key = e.getKeyIdentifier();
				if(key == "")
					return;
				shft = e.isShiftPressed();
				ctrl = e.isCtrlPressed();
				if(key == "[")
					this.cityBar.prevButton.execute();
				else if(key == "]")
					this.cityBar.nextButton.execute();
				if(this.app.visMain.mapmode != "c" || this.sendCommandBusy)
					return;
				switch (key)
				{
				case 'T':
					this.upgradeLowestLevelBuilding("T", shft);
					break;
				case 'N':
					this.upgradeLowestLevelBuilding("M", shft);
					break;
				case 'B':
					this.upgradeLowestLevelBuilding("B", shft);
					break;
				case 'C':
					this.upgradeLowestLevelBuilding("C", shft);
					break;
				case 'L':
					this.upgradeLowestLevelBuilding("A", shft);
					break;
				case 'E':
					this.upgradeLowestLevelBuilding("R", shft);
					break;
				case 'U':
					this.upgradeLowestLevelBuilding("U", shft);
					break;
				default:
					return;
				}
			}
			catch(e)
			{
				EmpDebug("Tweak.Keyboard.appAction: " + e);
			}
		},
		scenePerformAction : function(e)
		{
			try
			{
				if(this.app.visMain.mapmode != "c" || this.sendCommandBusy)
					return;
				key = e.getKeyIdentifier();
				shft = e.isShiftPressed();

				if(this.moveBuildingDetailView.active && this.moveBuildingDetailView.placeId != null)
				{
					this.moveBuildingDetailView._onMoveBuildingQuickUse();
					return;
				}
				if(!this.buildingDetailView.visBuilding)
				{
					if(this.buildingPlaceDetailView.active)
					{
						if(/\b(27|28|29|30|60|61|62|63)\b/.test(this.buildingPlaceDetailView.buildingType) && key == "D")
						{
							this.buildingPlaceDetailView.downgradeButton.execute();
							// destroy resource
							return;
						}
						else
						{
							for(var i in this.options.hotkeys.build)
							{
								if(this.options.hotkeys.build[i] == key)
								{
									_bid = this.self(arguments).lou_building_id[i];
									if(this.buildingPlaceDetailView.buildingInfo[_bid].canBuild)
									{
										this.cityObject("Build", this.buildingPlaceDetailView.placeId, _bid, 1, false);
										return;
									}
								}
							}
						}
					}
				}
				if(this.buildingDetailView.visBuilding)
				{
					_bid = this.buildingDetailView.visBuilding.getId();
					_ind = this.getIndex(_bid);
					if(_ind == -1)
						return;
					_btype = this.main.city[_ind][2];
					if(/\b(27|28|29|30|60|61|62|63)\b/.test(_btype))
						return;
					_blvl = this.main.city[_ind][1];
					if(_blvl < 0)
						return;
					if(/\b(1|2|3|4|5|6|7|8|9)\b/.test(key))
					{
						if(this.isAssignedToMinister(_bid))
							return;
						_ups = (RegExp.$1 == "1" ? 10 - _blvl : parseInt(RegExp.$1) - _blvl);
						if(_ups <= 0)
							return;
						au = this.availUpgrades(_btype, _blvl, _ups);
						this.cityObject("UpgradeBuilding", _bid, _btype, au, false);
						return;
					}
					au = 10;
					_ups = shft ? au - _blvl : 1;
					if(key != this.options.hotkeys.upgrades.minister)
					{
						if(this.isAssignedToMinister(_bid))
							return;
						au = this.availUpgrades(_btype, _blvl, _ups);
					}
					else
						au = _ups;
					switch (key)
					{
					case this.options.hotkeys.upgrades.upgrade:
						this.cityObject("UpgradeBuilding", _bid, _btype, au, false);
						break;
					case this.options.hotkeys.upgrades.downgrade:
						au = shft ? 10 : 1;
						this.cityObject("DowngradeBuilding", _bid, _btype, au, false);
						break;
					case this.options.hotkeys.upgrades.minister:
						this.cityObject("UpgradeBuilding", _bid, _btype, au, true);
						break;
					default:
						return;
					}
				}
			}
			catch(e)
			{
				EmpDebug("Tweak.Keyboard.sceneAction: " + e);
			}
		},
		availUpgrades : function(bt, bl, bu)
		{
			try
			{
				c = webfrontend.data.City.getInstance();
				th = c.getTownhallLevel();
				if(this.self(arguments).bd[bt].th > th)
					return 0;
				wood = c.getResourceCount(1);
				stone = c.getResourceCount(2);
				u = 0;
				while(bu > 0)
				{
					wn = this.self(arguments).bd[bt].w[bl];
					sn = this.self(arguments).bd[bt].s[bl];
					if(wn > wood || sn > stone)
						break;
					wood -= wn;
					stone -= sn;
					u++;
					bl++;
					bu--;
				}
				return u;
			}
			catch(e)
			{
				EmpDebug("Keyboard.AvailUpgrades: " + e);
			}
		},
		upgradeLowestLevelBuilding : function(_type, _minis)
		{
			try
			{
				if(this.app.visMain.mapmode != "c")
					return;
				c = webfrontend.data.City.getInstance();
				tw = parseInt(c.getResourceCount(1));
				ts = parseInt(c.getResourceCount(2));
				bqmax = webfrontend.data.Player.getInstance().getMaxBuildQueueSize();
				bqcur = c.buildQueue;
				bqcur = (bqcur != null) ? bqcur.length : 0;
				freeS = bqmax - bqcur;
				if(freeS == 0)
					return;
				buildingTypes =
				{
					"T" : "|38|39|40|41|42|43|44|45|46|",
					"M" : "|15|16|17|18|19|21|36|37|",
					"R" : "|1|2|3|6|47|48|49|50|",
					"C" : "|4|",
					"B" : "|14|",
					"U" : "|5|7|8|9|10|11|12|13|20|22|",
					"A" : "|" + this.options.lowestLevelUpgradeIDs.join("|") + "|"
				};
				maxLvls =
				{
					"T" : this.options.lowestLevelMax[0],
					"M" : this.options.lowestLevelMax[1],
					"R" : this.options.lowestLevelMax[2],
					"C" : this.options.lowestLevelMax[3],
					"B" : this.options.lowestLevelMax[4],
					"U" : this.options.lowestLevelMax[5]
				}
				if(_type != "F")
					freeS = 1;
				if(_type == "F")
					_type = "A";
				_bTable = this.getValidBuildings(buildingTypes[_type]);
				ud =
				{
					"wl" : tw,
					"sl" : ts,
					"a" : []
				};
				for( j = 0; j < freeS; j++)
				{
					_bTable.sort(function(a, b)
					{
						return a[1] - b[1];
					});
					_bType = "";
					for( i = 0; i < _bTable.length; i++)
					{
						if(_type == "A")
						{
							for(var b in buildingTypes)
							{
								if(b == "A")
									continue;
								if(buildingTypes[b].indexOf("|" + _bTable[i][2] + "|") != -1)
									_bType = b;
							}
							if(buildingTypes["A"].indexOf("|" + _bTable[i][2] + "|") != -1 && _bTable[i][1] >= maxLvls[_bType])
								continue;
							if(_bTable[i][2] == 23 && _bTable[i][1] >= 10)
								continue;
						}
						if(buildingTypes[_type].indexOf("|" + _bTable[i][2] + "|") != -1)
						{
							if(!_minis)
							{
								if(this.isAssignedToMinister(_bTable[i][0]))
									continue;
								wn = this.self(arguments).bd[_bTable[i][2]].w[_bTable[i][1]];
								sn = this.self(arguments).bd[_bTable[i][2]].s[_bTable[i][1]];
								if(wn > ud.wl || sn > ud.sl)
									continue;
								ud.wl -= wn;
								ud.sl -= sn;
							}
							ud.a.push([_bTable[i][0], _bTable[i][2], _minis]);
							_bTable[i][1] += 1;
							break;
						}
					}
				}
				for( i = 0; i < ud.a.length; i++)
				{
					this.cityObject("UpgradeBuilding", ud.a[i][0], ud.a[i][1], 1, ud.a[i][2]);
				}
			}
			catch(e)
			{
				EmpDebug("upgradeLowest: " + e);
			}
		},
		getIndex : function(_buildingId)
		{
			this.main.getCity();
			for( i = 0; i < this.main.city.length; i++)
			{
				if(this.main.city[i][0] == _buildingId)
					return i;
			}
			return -1;
		},
		getValidBuildings : function(_ids)
		{
			try
			{
				c = webfrontend.data.City.getInstance();
				th = c.getTownhallLevel();
				this.main.getCity();
				_arr = new Array();
				_wallIn = false;
				for( k = 0; k < this.main.city.length; k++)
				{
					if(_ids.indexOf("|" + this.main.city[k][2] + "|") != -1 && this.main.city[k][1] < 10 && this.main.city[k][1] > -1)
					{
						if((_wallIn && this.main.city[k][2] == CITYWALL) || this.self(arguments).bd[this.main.city[k][2]].th > th)
							continue;
						_arr.push(this.main.city[k]);
						if(this.main.city[k][2] == CITYWALL)
							_wallIn = true;
					}
				}
				return _arr;
			}
			catch(e)
			{
				EmpDebug("getValid: " + e);
			}
		},
		isAssignedToMinister : function(bid)
		{
			try
			{
				var cBuildQueue = webfrontend.data.City.getInstance().getBuildQueue();
				if(cBuildQueue != null)
				{
					for(var m = 0; m < cBuildQueue.length; m++)
					{
						if(cBuildQueue[m].building == bid && cBuildQueue[m].isPaid == false)
							return true;
					}
				}
				return false;
			}
			catch(e)
			{
				EmpDebug("isAssignedToMinister: " + e);
			}
		},
		cityObject : function(_action, _buildingId, _buildingType, _upgrades, _minister)
		{
			try
			{
				if(_upgrades <= 0)
					return;
				bqmax = webfrontend.data.Player.getInstance().getMaxBuildQueueSize();
				bqcur = webfrontend.data.City.getInstance().buildQueue;
				bqcur = (bqcur != null) ? bqcur.length : 0;
				freeSlots = bqmax - bqcur;
				if(freeSlots == 0)
					return;
				if(freeSlots < _upgrades && _action != "DowngradeBuilding")
					_upgrades = freeSlots;

				if(_action == "Build")
				{
					if(_buildingType == 21 && this.bPlaceDetView.active)
					{
						this.bPlaceDetView.buildingType = 21;
						this.bPlaceDetView._onClickBuild();
						return;
					}
					_action = "UpgradeBuilding";
				}

				if(_action == "DowngradeBuilding" && _upgrades == 10)
				{
					_action = "DemolishBuilding";
					_upgrades = 1;
				}
				_cid = webfrontend.data.City.getInstance().getId()
				for( o = 0; o < _upgrades; o++)
				{
					Emperor.Net.CommandQueue.getInstance().push(
					{
						a : _action,
						p :
						{
							cityid : _cid,
							buildingid : _buildingId,
							buildingType : _buildingType,
							isPaid : !_minister
						}
					});
				}
				Emperor.Net.CommandQueue.getInstance().sendCommands();
			}
			catch(e)
			{
				EmpDebug("cityObject: " + e);
			}
		},
	}
});
// $Header: /Home/Emperor/Emperor.Tweak.LayoutWindow.js,v 1.51 2013/04/29 18:52:46 Aare Exp $

// Amplidude's LoU Tweak City Layout Window

qx.Class.define("Emperor.Tweak.LayoutWindow",
{
	extend : qx.core.Object,
	statics :
	{
		node :
		{
			"28" : 0,
			"900" : 0,
			"29" : 1,
			"901" : 1,
			"27" : 2,
			"902" : 2,
			"30" : 3,
			"903" : 3,
			"23" : 4,
			"1" : 5,
			"2" : 6,
			"3" : 7,
			"4" : 8,
			"5" : 9,
			"6" : 10,
			"7" : 11,
			"8" : 12,
			"9" : 13,
			"10" : 14,
			"11" : 15,
			"12" : 16,
			"13" : 17,
			"14" : 18,
			"15" : 19,
			"16" : 20,
			"17" : 21,
			"18" : 22,
			"19" : 23,
			"20" : 24,
			"21" : 25,
			"22" : 26,
			"36" : 27,
			"37" : 28,
			"38" : 29,
			"39" : 30,
			"40" : 31,
			"41" : 32,
			"42" : 33,
			"43" : 34,
			"44" : 35,
			"45" : 36,
			"46" : 37,
			"98" : 38,
			"99" : 39,
			"-2" : 40,
			"-1" : 41,
			"97" : 46,
			"47" : 42,
			"48" : 43,
			"49" : 45,
			"50" : 44,
			"52" : 47,
			"53" : 47,
			"54" : 47,
			"55" : 47,
			"56" : 47,
			"57" : 47,
			"58" : 47,
			"59" : 47,
			"904" : 0,
			"61" : 0,
			"905" : 1,
			"62" : 1,
			"906" : 2,
			"60" : 2,
			"907" : 3,
			"63" : 3, //magic res
			"64" : 0,
			"65" : 0,
			"66" : 0,
			"67" : 0,
			"68" : 0,
			"69" : 0 // special buildings
		},
		louCityP : [":", ".", ",", ";", "#", "W", "Q", "F", "C", "P", "I", "L", "M", "H", "A", "D", "T", "U", "B", "K", "G", //20
		"E", "Y", "V", "S", "X", "R", "J", "Z", "#", "#", "#", "#", "#", "#", "#", "#", "#", "-", "#", "#", "#", //41
		"2", "3", "1", "4", "_", "@" //42-45, 46, 47 (palace)
		],
		louFCityP : ["B", "A", "C", "D", "", "F", "G", "I", "O", "J", "H", "K", "N", "1", "L", "M", "0", "E", "P", "S", "Q", "U", "V", "Y", "Z", "X", "T", "R", "W", "", "", "", "", "", "", "", "", "", "0", "", "0", "", "2", "3", "5", "4", "0"],
		fcpToSs :
		{
			"B" : ":",
			"A" : ".",
			"C" : ",",
			"D" : ";",
			"E" : "U",
			"F" : "W",
			"G" : "Q",
			"H" : "I",
			"I" : "F",
			"J" : "P",
			"K" : "L",
			"L" : "A",
			"M" : "D",
			"N" : "M",
			"O" : "C",
			"P" : "B",
			"Q" : "G",
			"R" : "J",
			"S" : "K",
			"T" : "R",
			"U" : "E",
			"V" : "Y",
			"W" : "Z",
			"X" : "X",
			"Y" : "V",
			"Z" : "S",
			"1" : "H",
			"0" : "-",
			"2" : "2",
			"3" : "3",
			"4" : "4",
			"5" : "1"
		},
		ssToId :
		{
			"2" : 47,
			"3" : 48,
			"1" : 50,
			"C" : 4,
			"P" : 5,
			"4" : 49,
			"L" : 7,
			"M" : 8,
			"H" : 9,
			"A" : 10,
			"D" : 11,
			"T" : 12,
			"U" : 13,
			"B" : 14,
			"K" : 15,
			"G" : 16,
			"E" : 17,
			"Y" : 18,
			"V" : 19,
			"S" : 20,
			"X" : 21,
			"R" : 22,
			"J" : 36,
			"Z" : 37
		},
		land : "########################-------#-------#####--------#--------###---------#---------##---------#---------##------#######------##-----##-----##-----##----##-------##----##----#---------#----##----#---------#----#######---------#######----#---------#----##----#---------#----##----##-------##----##-----##-----##-----##------#######------##---------#---------##---------#---------###--------#--------#####-------#-------########################",
		water : "########################-------#-------#####--------#--------###---------#---------##---------#---------##------#######------##-----##-----##-----##----##-------##----##----#---------#----##----#---------#----#######---------#######----#---------#----##----#---------#----##----##-------##----##-----##-----##-----##------#######--__--##---------#----_##_-##---------#----_###_###--------#-----_#######-------#------_########################",
		error :
		{
			"resource" : "invalid resource node position",
			"castle" : "invalid building position (Castle)",
			"water" : "invalid building position (Harbor/Shipyard)",
			"type" : "invalid Sharestring type (stype => ctype)",
			"hash" : "invalid Sharestring"
		},
	},
	construct : function(commandOnly)
	{
		try
		{
			if(!commandOnly)
			{
				this.win = new webfrontend.ui.CustomWindow("City layout");
				this.win.setLayout(new qx.ui.layout.Canvas());
				this.win.set(
				{
					showMaximize : false,
					showMinimize : false,
					allowMaximize : false
				});
				this.win.setWidth(500);
				this.win.setHeight(350);

				this.tabView = new qx.ui.tabview.TabView().set(
				{
					contentPadding : 5
				});
				page1 = new qx.ui.tabview.Page("Sharestring");
				page1.setLayout(new qx.ui.layout.VBox(5));
				page2 = new qx.ui.tabview.Page("Overlay layout");
				page2.setLayout(new qx.ui.layout.VBox(5));
				page3 = new qx.ui.tabview.Page("Layouts");
				page3.setLayout(new qx.ui.layout.VBox(5));

				// Page 1
				gr = new qx.ui.layout.Grid(5, 5);
				gr.setColumnAlign(0, "right", "middle");
				gr.setColumnWidth(1, 380);
				cont = new qx.ui.container.Composite(gr);
				this.ssTa1 = new qx.ui.form.TextArea("").set(
				{
					height : 100
				});
				this.ssTa1.addListener("click", function()
				{
					this.selectAllText();
				});
				cont.add(new qx.ui.basic.Label("Sharestring:"),
				{
					row : 0,
					column : 0
				});
				cont.add(this.ssTa1,
				{
					row : 0,
					column : 1
				});
				this.ssTa3 = new qx.ui.form.TextArea("").set(
				{
					height : 100
				});
				this.ssTa3.addListener("click", function()
				{
					this.selectAllText();
				});
				cont.add(new qx.ui.basic.Label("LoU Opt:"),
				{
					row : 2,
					column : 0
				});
				cont.add(this.ssTa3,
				{
					row : 2,
					column : 1
				});
				page1.add(cont);

				this.louFCPlink2 = new qx.ui.basic.Label("Open in LoU Optimizer").set(
				{
					textColor : "#105510",
					rich : true,
					appearance : "clickable-link",
					cursor : "pointer",
					marginLeft : 310
				});
				this.louFCPlink2.addListener("click", function()
				{
					Emp.a.showExternal(this.cityLayout.u2);
				}, this);
				page1.add(this.louFCPlink2);

				// Page 2
				this.olTa = new qx.ui.form.TextArea("").set(
				{
					height : 150
				});
				page2.add(this.olTa);
				cont = new qx.ui.container.Composite(new qx.ui.layout.HBox(10));
				btn = new qx.ui.form.Button("Apply layout").set(
				{
					maxWidth : 150,
					appearance : "button-text-small"
				});
				btn.addListener("click", this.applyLayout, this);
				cont.add(btn);
				btn = new qx.ui.form.Button("Remove layout").set(
				{
					maxWidth : 150,
					appearance : "button-text-small"
				});
				btn.addListener("click", this.removeLayout, this);
				cont.add(btn);

				this.errorLabel = new qx.ui.basic.Label("").set(
				{
					textColor : "#FF0000",
					marginLeft : 20,
					font : "bold"
				});
				cont.add(this.errorLabel);
				page2.add(cont);

				// Page 3
				gr = new qx.ui.layout.Grid(10, 10);
				cont = new qx.ui.container.Composite(gr);
				this.addButton(cont, "Berserker 3", 0, 0);
				this.addButton(cont, "Ranger 3", 1, 0);
				this.addButton(cont, "Templar 4", 2, 0);
				this.addButton(cont, "Paladin 7", 3, 0);
				this.addButton(cont, "Mage 5", 4, 0);
				this.addButton(cont, "Warlock 12", 5, 0);
				this.addButton(cont, "Knight 4", 0, 1);
				this.addButton(cont, "CatRam 45", 1, 1);
				this.addButton(cont, "Ballista 34", 2, 1);
				this.addButton(cont, "Berserker 2", 3, 1);
				this.addButton(cont, "Sloop", 4, 1);
				this.addButton(cont, "Berserker 1", 5, 1);
				this.addButton(cont, "Navy Berserker", 0, 2);
				this.addButton(cont, "Navy Ranger", 1, 2);
				this.addButton(cont, "Navy Templar", 2, 2);
				this.addButton(cont, "Navy Mage", 3, 2);
				this.addButton(cont, "Navy Knight", 4, 2);
				this.addButton(cont, "War Galleon", 5, 2);
				this.addButton(cont, "Cluster Hub", 0, 3);
				this.addButton(cont, "Storage Hub", 1, 3);
				this.addButton(cont, "Transport Hub", 2, 3);
				this.addButton(cont, "Baronator", 3, 3);
				this.addButton(cont, "Palace Hub", 4, 3);
				this.addButton(cont, "Palace", 5, 3);
				this.addButton(cont, "TH", 0, 4);
				this.addButton(cont, "+Cot", 1, 4);
				this.addButton(cont, "+Bld", 2, 4);
				this.addButton(cont, "-Bld", 3, 4);
				this.addButton(cont, "-Res", 4, 4);
				this.addButton(cont, "Move", 5, 4);
				this.addButton(cont, "-Bld 1", 0, 5);
				this.addButton(cont, "-Bld 2", 1, 5);
				this.addButton(cont, "-Bld 3", 2, 5);
				this.addButton(cont, "-Bld 4", 3, 5);
				this.addButton(cont, "-Bld 5", 4, 5);
				page3.add(cont);

				this.tabView.add(page1);
				this.tabView.add(page2);
				this.tabView.add(page3);
				this.win.add(this.tabView,
				{
					top : 0,
					right : 3,
					bottom : 30,
					left : 3
				});
				btn = new qx.ui.form.Button("OK").set(
				{
					width : 75
				});
				btn.addListener("click", function()
				{
					this.tabView.setSelection([this.tabView.getChildren()[0]]);
					this.win.close()
				}, this);
				this.win.add(btn,
				{
					bottom : 0,
					right : 20
				});

				Emp.a.getRoot().add(this.win,
				{
					left : 250,
					top : 200
				});
			}
			this.srvName = webfrontend.data.Server.getInstance().getName();
			this.loadCityLayouts();
		}
		catch(e)
		{
			EmpDebug("LayoutWindow.construct: " + e);
		}
	},
	members :
	{
		cityLayout : null,
		cityLayouts : null,
		olTa : null,
		ssTa1 : null,
		ssTa3 : null,
		louFCPlink2 : null,
		errorLabel : null,
		tabView : null,
		win : null,
		oObjs : null,
		srvName : null,
		shareString : "",
		open : function()
		{
			try
			{
				this.win.open();
				this.ssTa1.setValue(this.cityLayout.s);
				this.ssTa3.setValue(this.cityLayout.u2);
				if(this.cityLayouts[this.srvName].hasOwnProperty(webfrontend.data.City.getInstance().getId() + "o"))
					this.olTa.setValue(this.cityLayouts[this.srvName][webfrontend.data.City.getInstance().getId() + "o"]);
				else
					this.olTa.setValue("");
				this.errorLabel.setValue("");
			}
			catch(e)
			{
				EmpDebug("LayoutWindow.open: " + e);
			}
		},
		addButton : function(cont, title, r, c)
		{
			var btn = new qx.ui.form.Button(title);
			btn.addListener("execute", this.setupLayout, this);
			cont.add(btn,
			{
				row : r,
				column : c
			});
		},
		setupLayout : function(event)
		{
			try
			{
				var label = event.getCurrentTarget().getLabel();
				if(label == "Berserker 3")
					this.setupBerserker3();
				if(label == "Berserker 1")
					this.setupBerserker1();
				if(label == "Ranger 3")
					this.setupRanger3();
				if(label == "Templar 4")
					this.setupTemplar4();
				if(label == "Paladin 7")
					this.setupPaladin7();
				if(label == "Mage 5")
					this.setupMage5();
				if(label == "Warlock 12")
					this.setupWarlock12();
				if(label == "Knight 4")
					this.setupKnight4();
				if(label == "CatRam 45")
					this.setupCatRam45();
				if(label == "Ballista 34")
					this.setupBallista34();
				if(label == "Berserker 2")
					this.setupBerserker2();
				if(label == "Navy Berserker")
					this.setupNavyBerserker();
				if(label == "Navy Ranger")
					this.setupNavyRanger();
				if(label == "Navy Templar")
					this.setupNavyTemplar();
				if(label == "Navy Mage")
					this.setupNavyMage();
				if(label == "Navy Knight")
					this.setupNavyKnight();
				if(label == "War Galleon")
					this.setupWargalleon();
				if(label == "Sloop")
					this.setupSloop();
				if(label == "Sloop Food")
					this.setupSloopFood();
				if(label == "War Galleon")
					this.setupWargalleon();
				if(label == "Food/Hub")
					this.setupFoodHub();
				if(label == "Cluster Hub")
					this.setupClusterHub();
				if(label == "Storage Hub")
					this.setupStorageHub();
				if(label == "Transport Hub")
					this.setupTransportHub();
				if(label == "Baronator")
					this.setupBaronator();
				if(label == "Palace")
					this.setupPalace();
				if(label == "Palace Hub")
					this.setupPalaceHub();
				if(label == "TH")
					this.setupTownHallWallsStorage();
				if(label == "+Cot")
					this.addCottages();
				if(label == "+Bld")
					this.addNewBuildings(10);
				if(label == "-Bld")
					this.remOldBuildings();
				if(label == "-Bld 1")
					this.remOldBuildings(1);
				if(label == "-Bld 2")
					this.remOldBuildings(2);
				if(label == "-Bld 3")
					this.remOldBuildings(3);
				if(label == "-Bld 4")
					this.remOldBuildings(4);
				if(label == "-Bld 5")
					this.remOldBuildings(5);
				if(label == "-Res")
					this.removeResources();
				if(label == "Move")
					this.moveBuildings();
			}
			catch(e)
			{
				EmpDebug("SetupLayout: " + e);
			}
		},
		setupTownHallWallsStorage : function()
		{
			try
			{
				var queue = Emperor.Net.CommandQueue.getInstance();
				// First, set the food warning before we forget...
				queue.push(
				{
					a : "SetFoodWarning",
					p :
					{
						idCity : webfrontend.data.City.getInstance().getId(),
						foodWarning : 8
					}
				});
				// Get city data array, length 441. [0] is building id, [1] is level, [2] is type
				Emp.main.getCity();
				var c = Emp.city;
				var th = c[220];
				for(var i = th[1]; i < 4; i++)
				{
					queue.push(
					{
						a : "UpgradeBuilding",
						p :
						{
							cityid : webfrontend.data.City.getInstance().getId(),
							buildingid : th[0],
							buildingType : th[2],
							isPaid : false
						}
					});
				}
				var buildings = this.queueSpots("S", WAREHOUSE, 4);
				this.queueSpots("P", MARKETPLACE, 2);
				this.queueSpots("-", COTTAGE, 10 - buildings);
				queue.sendCommands();
			}
			catch(e)
			{
				EmpDebug("THWallsStorage: " + e);
			}
		},
		// Upgrade town hall to 10 assuming we have some space in build queue
		upgradeTownHall : function(space)
		{
			try
			{
				var queue = Emperor.Net.CommandQueue.getInstance();
				// Get city data array, length 441. [0] is building id, [1] is level, [2] is type
				Emp.main.getCity();
				var c = Emp.city;
				var th = c[220];
				for(var i = th[1]; i < 10; i++)
				{
					if(space-- <= 0)
						break;
					queue.push(
					{
						a : "UpgradeBuilding",
						p :
						{
							cityid : webfrontend.data.City.getInstance().getId(),
							buildingid : th[0],
							buildingType : th[2],
							isPaid : false
						}
					});
				}
				queue.sendCommands();
			}
			catch(e)
			{
				EmpDebug("UpgradeTownHall: " + e);
			}
		},
		queueSpots : function(find, type, count)
		{
			try
			{
				this.generateSharestring();
				cgi = webfrontend.data.City.getInstance();
				cId = cgi.getId();
				var queue = Emperor.Net.CommandQueue.getInstance();
				var c = Emp.city;
				var ss = null;
				if(this.cityLayouts[this.srvName].hasOwnProperty(cId))
					ss = this.cityLayouts[this.srvName][cId];
				var buildings = 0;
				if(ss)
				{
					for(var i = 0; i < 441; i++)
					{
						var b = ss.substr(i, 1);
						if(b == find)
						{
							if(this.cityLayout.s.substr(i + 18, 1) != '-')
								continue;
							var bdata = c[i];
							queue.push(
							{
								a : "UpgradeBuilding",
								p :
								{
									cityid : webfrontend.data.City.getInstance().getId(),
									buildingid : bdata[0],
									buildingType : type,
									isPaid : false
								}
							});
							buildings++;
							count--;
							if(count <= 0)
								break;
						}
					}
				}
				return buildings;
			}
			catch(e)
			{
				EmpDebug("QueueEmpty: " + e);
			}
		},
		addCottages : function()
		{
			try
			{
				var queue = Emperor.Net.CommandQueue.getInstance();
				Emp.main.getCity();
				this.queueSpots("-", COTTAGE, 10);
				queue.sendCommands();
			}
			catch(e)
			{
				EmpDebug("AddCottages: " + e);
			}
		},
		addNewBuildings : function(space)
		{
			try
			{
				var changes = this.evaluateLayout();
				changes.build.sort(function(a, b)
				{
					var priority = "CMJ1PADLRGEZYBS234WQIFUKV";
					if(priority.indexOf(a.type) == -1)
						EmpDebug("Building '" + a.type + "' has no defined priority");
					if(priority.indexOf(b.type) == -1)
						EmpDebug("Building '" + b.type + "' has no defined priority");
					if(priority.indexOf(a.type) == priority.indexOf(b.type))
						return b.coord - a.coord;
					return priority.indexOf(a.type) - priority.indexOf(b.type);
				});
				var city = webfrontend.data.City.getInstance();
				var newBuildings = this.countBuildingsAfterQueueIsDone();
				if(newBuildings > space)
					newBuildings = space;
				var queue = Emperor.Net.CommandQueue.getInstance();
				var c = Emp.city;
				if(newBuildings > 0)
				{
					for(var b in changes.build)
					{
						var i = changes.build[b].coord;
						var bdata = c[i];
						var type = BUILDING_TYPE[changes.build[b].type];
						queue.push(
						{
							a : "UpgradeBuilding",
							p :
							{
								cityid : city.getId(),
								buildingid : bdata[0],
								buildingType : type,
								isPaid : false
							}
						});
						if(--newBuildings == 0)
							break;
					}
					queue.sendCommands();
				}
			}
			catch(e)
			{
				EmpDebug("AddBuildings: " + e);
			}
		},
		// Count how many buildings are possible after everything queued for
		// demolishing is demolished.
		countBuildingsAfterQueueIsDone : function()
		{
			try
			{
				var city = webfrontend.data.City.getInstance();
				var result = city.getBuildingLimit() - city.getBuildingCount();
				if(city.buildQueue)
				{
					for(var i = 0; i < city.buildQueue.length; i++)
					{
						// 1 - upgrade, 2 - downgrade, 5 - demolish, 1 - destroy resource node
						if(city.buildQueue[i].state == BQ_DEMOLISH)
							result++;
					}
				}
				return result;
			}
			catch(e)
			{
				EmpDebug("countMoreBuildingsAfterQueueIsDone: " + e);
			}
		},
		remOldBuildings : function(limit)
		{
			try
			{
				var queue = Emperor.Net.CommandQueue.getInstance();
				var changes = this.evaluateLayout();
				var buildingsToRemove = 0;
				for(var rem in changes.clear)
				{
					if(":;.,".indexOf(changes.clear[rem].type) == -1)
					{
						buildingsToRemove++;
					}
				}
				if(buildingsToRemove > changes.build.length)
					buildingsToRemove = changes.build.length;
				var city = webfrontend.data.City.getInstance();
				var qSize = 16 - (city.buildQueue ? city.buildQueue.length : 0);
				qSize = Math.floor(qSize / 2);
				if(buildingsToRemove > qSize)
					buildingsToRemove = qSize;
				if(limit != undefined)
				{
					if(buildingsToRemove > limit)
						buildingsToRemove = limit;
				}
				changes.clear.sort(function(a, b)
				{
					// Higher index - more relevant to remove
					var priority = "CMJ1PADLRGEZYBS234WQIFUKV";
					if(priority.indexOf(a.type) == -1)
						EmpDebug("Building '" + a.type + "' has no defined priority");
					if(priority.indexOf(b.type) == -1)
						EmpDebug("Building '" + b.type + "' has no defined priority");
					return priority.indexOf(b.type) - priority.indexOf(a.type);
				});
				var c = Emp.city;
				for(var i = 0; i < buildingsToRemove; i++)
				{
					var bdata = c[changes.clear[i].coord];
					queue.push(
					{
						a : "DemolishBuilding",
						p :
						{
							cityid : city.getId(),
							buildingid : bdata[0]
						}
					});
				}
				queue.sendCommands();

			}
			catch(e)
			{
				EmpDebug("RemoveBuildings: " + e);
			}
		},
		moveBuildings : function()
		{
			try
			{
				var queue = Emperor.Net.CommandQueue.getInstance();
				var city = webfrontend.data.City.getInstance();
				var cId = city.getId();
				var ls = null;
				if(this.cityLayouts[this.srvName].hasOwnProperty(cId))
					ls = this.cityLayouts[this.srvName][cId];
				if(!ls)
					return;
				while(true)
				{
					this.generateSharestring();
					var ss = this.cityLayout.s.substr(18);
					var c = Emp.city;
					var moves = 0;
					for(var i = 0; i < 441; i++)
					{
						var ss1 = ss.substr(i, 1);
						var ls1 = ls.substr(i, 1);
						if(ss1 != ls1)
						{
							// Need to replace something with something
							if(ss1 == '-')
							{
								// Need to fill the empty space with something, we'll deal with it
								// elsewhere
								continue;
							}
							// We got something we don't need in that place
							// If it's a resource node, we don't need to deal with it here
							if(",.:;".indexOf(ss1) != -1)
								continue;
							// OK, so it's a building. It may be useless building or an useful one
							var index = this.findPlaceForBuilding(ss1, ss, ls);
							if(index == -1)
							{
								// If building is on empty spot for the final layout, leave it there
								if(ls1 == "-")
									continue;
								// Don't need the building, but it does not belong here, move it to empty spot
								for( index = 0; index < 441; index++)
								{
									if((ss.substr(index, 1) == '-') && (ls.substr(index, 1) == "-"))
										break;
								}
							}
							// OK, we finally found a better place for it. Move it
							queue.push(
							{
								a : "BuildingRelocate",
								p :
								{
									cityid : cId,
									id0 : Emp.city[i][0],
									id1 : Emp.city[index][0]
								}
							});
							moves++;
							// Do it once per evaluating the layout string
							break;
						}
					}
					// Stop when no more moves are possible
					// if(!moves)
					break;
				}
				queue.sendCommands();
			}
			catch(e)
			{
				EmpDebug("MoveBuildings: " + e);
			}
		},
		// Find a place for building in the city
		// building - building to place, function will be called only if it is in wrong place
		// ss - existing locations
		// ls - locations that may receive the building
		findPlaceForBuilding : function(building, ss, ls)
		{
			try
			{
				for(var i = 0; i < 441; i++)
				{
					// existing in the city
					var ss1 = ss.substr(i, 1);
					// desired from layout
					var ls1 = ls.substr(i, 1);
					// Building needs to go to the empty spot
					if(ls1 == building && ss1 == '-')
						return i;
				}
				return -1;
			}
			catch(e)
			{
				EmpDebug("FindPlace: " + e);
			}
		},
		evaluateLayout : function()
		{
			try
			{
				this.generateSharestring();
				var ss = this.cityLayout.s.substr(18);
				var cgi = webfrontend.data.City.getInstance();
				var cId = cgi.getId();
				var queue = Emperor.Net.CommandQueue.getInstance();
				var ls = null;
				if(this.cityLayouts[this.srvName].hasOwnProperty(cId))
					ls = this.cityLayouts[this.srvName][cId];
				var replace = new Array();
				var build = new Array();
				var clear = new Array();
				if(ls)
				{
					for(var i = 0; i < 441; i++)
					{
						if(ss.substr(i, 1) == ls.substr(i, 1))
							continue;
						var ss1 = ss.substr(i, 1);
						var ls1 = ls.substr(i, 1);
						if(ss1 == '-')
						{
							// Sharestring is empty, and layout is not since we're looking for
							// differences only. Need to build something on empty spot.
							// Only queue non-castles
							if(ls1 != 'X')
							{
								build.push(
								{
									coord : i,
									type : ls1
								});
							}
						}
						else if(ls1 == '-')
						{
							// Layout string is empty, need to remove the building that is
							// present in the city.
							clear.push(
							{
								coord : i,
								type : ss1
							});
						}
						else
						{
							// Both non-empty and different, need to replace one with another.
							if(ls1 != 'X')
							{
								replace.push(
								{
									coord : i,
									from : ss1,
									to : ls1
								});
							}
						}
					}
					// Arrays are all set
					if(false)
					{
						for(var cleared in clear)
						{
							EmpDebug("Remove " + clear[cleared].type + " at " + clear[cleared].coord);
						}
						for(var built in build)
						{
							EmpDebug("Build  " + build[built].type + " at " + build[built].coord);
						}
						for(var replaced in replace)
						{
							EmpDebug("Replace " + replace[replaced].from + " with " + replace[replaced].to + " at " + replace[replaced].coord)
						}
					}
					var ret =
					{
					};
					ret["clear"] = clear;
					ret["build"] = build;
					ret["replace"] = replace;
					return ret;
				}
				var ret =
				{
					clear : [],
					build : [],
					replace : []
				};
				return ret;
			}
			catch(e)
			{
				EmpDebug("Evaluate: " + e);
			}
		},
		removeResources : function()
		{
			try
			{
				var cgi = webfrontend.data.City.getInstance();
				var cId = cgi.getId();
				var queue = Emperor.Net.CommandQueue.getInstance();
				var c = Emp.city;
				var ss = null;
				if(this.cityLayouts[this.srvName].hasOwnProperty(cId))
					ss = this.cityLayouts[this.srvName][cId];
				if(ss)
				{
					this.generateSharestring();
					var current = this.cityLayout.s.substr(18);
					var busyRes = [];
					var emptyRes = [];
					for(var i = 0; i < 441; i++)
					{
						var c = current.substr(i, 1);
						var s = ss.substr(i, 1);
						if(c == ',' || c == '.' || c == ':' || c == ';')
						{
							if(s == '-')
							{
								emptyRes.push(i);
							}
							else if(s != c)
							{
								busyRes.push(i);
							}
						}
					}
					var nodes = 10;
					for( i = 0; i < busyRes.length; i++)
					{
						if(nodes == 0)
							break;
						var bdata = Emp.city[busyRes[i]];
						queue.push(
						{
							a : "UpgradeBuilding",
							p :
							{
								cityid : webfrontend.data.City.getInstance().getId(),
								buildingid : bdata[0],
								buildingType : BUILDING_TYPE_BY_RES_TYPE[bdata[2] - 900],
								isPaid : true
							}
						});
						nodes--;
					}
					for( i = 0; i < emptyRes.length; i++)
					{
						if(nodes == 0)
							break;
						var bdata = Emp.city[emptyRes[i]];
						queue.push(
						{
							a : "UpgradeBuilding",
							p :
							{
								cityid : webfrontend.data.City.getInstance().getId(),
								buildingid : bdata[0],
								buildingType : BUILDING_TYPE_BY_RES_TYPE[bdata[2] - 900],
								isPaid : true
							}
						});
						nodes--;
					}
					queue.sendCommands();
				}
			}
			catch(e)
			{
				EmpDebug("RemoveResources: " + e);
			}
		},
		setupBaronator : function()
		{
			try
			{
				this.generateSharestring();
				this.removeBuildings();
				this.setCenter("##?????###ZZZZZZZ#ZBZBZBZBZZZZZZZZZZZBZBTBZBZZZZZZZZZZZBZBZBZBZ#ZZZZZZZ###?????##");
				this.setEmptySpot(4, 4, "?SS?DALMSSSSDALM");
				this.sprinkleMultiple("P", 26);
				this.sprinkle("JX");
				this.setShareString();
			}
			catch(e)
			{
				EmpDebug("Setup Baronator: " + e);
			}
		},
		setupPalace : function()
		{
			try
			{
				this.generateSharestring();
				EmpDebug("SS: " + this.cityLayout.s);
				this.removeBuildings();
				this.setShareString();
				this.setEmptySpot(2, 2, "SSSM");
				this.sprinkle("PPXJP");
				this.sprinkleMultiple("C", 90);
				this.setShareString();
			}
			catch(e)
			{
				EmpDebug("Setup Palace: " + e);
			}
		},
		setupPalaceHub : function()
		{
			try
			{
				this.generateSharestring();
				this.removeBuildings();
				this.setShareString();
				this.setEmptySpot(7, 3, "?SLSAS?LSLSASA?SLSAS?");
				this.sprinkle("J");
				this.sprinkleMultiple("P", 82);
				this.setShareString();
			}
			catch(e)
			{
				EmpDebug("Setup Palace: " + e);
			}
		},
		setupBerserker1 : function()
		{
			try
			{
				this.generateSharestring();
				this.removeBuildings();
				this.setCenter("##BGBGB###GGGBGGG#BBBGBGBBBGGGGGGGGGBBBBTBBBBGGGGGGGGGBBBGBGBBB#GBGBGBG###BGBGB##");
				this.setupSpot(1, 11, 5, 7, "GGG??GBGB?GBGG?GBGB?GBGGGGBGB?GGG??");
				this.setEmptySpot(1, 2, "SM");
				this.sprinkle("PJX");
				this.setShareString();
				this.setTroopCounts([
				{
					t : BERSERKER_UNIT_ID,
					c : 160000
				}]);
			}
			catch(e)
			{
				EmpDebug("Setup Berserker1: " + e);
			}
		},
		setupSpot : function(x, y, dx, dy, buildings)
		{
			try
			{
				if(buildings.length != dx * dy)
					EmpDebug("Building string " + buildings + " - bad length " + building.length);
				var ss = this.shareString.substr(18);
				for(var j = 0; j < dy; j++)
				{
					for(var i = 0; i < dx; i++)
					{
						var b = buildings.substr(j * dx + i, 1);
						var pos = (j + y) * 21 + (i + x);
						var s = ss.substr(pos, 1);
						if(b != "?" && s == "#")
							EmpDebug("Hit the wall at " + (i + x) + "," + (j + y));
						if(b == "?")
							b = s;
						ss = ss.substr(0, pos) + b + ss.substr(pos + 1);
					}
				}
				this.shareString = this.shareString.substr(0, 18) + ss;
			}
			catch(e)
			{
				EmpDebug("SetupSpot: " + e);
			}
		},
		setupBerserker3 : function()
		{
			try
			{
				this.generateSharestring();
				this.removeBuildings();
				this.setCenter("##BBBBB###BGBGBGB#BBBBBBBBBBGBGBGBGBBBBBTBBBBBGBGBGBGBBBBBBBBBB#BGBGBGB###BBBBB##");
				this.setEmptySpot(7, 3, "BBBBBBBBGBGBGBBBBBBBB");
				this.addStorage("SSSM");
				this.sprinkle("PPXJP");
				this.setShareString();
				this.setTroopCounts([
				{
					t : BERSERKER_UNIT_ID,
					c : 288000
				}]);
			}
			catch(e)
			{
				EmpDebug("Setup Berserker3: " + e);
			}
		},
		setupRanger3 : function()
		{
			try
			{
				this.generateSharestring();
				this.removeBuildings();
				this.setCenter("##BBBBB###BGGGGGB#BBBBBBBBBBGGGGGGGBBBBBTBBBBBGGGGGGGBBBBBBBBBB#BGGGGGB###BBBBB##");
				this.addStorage("SSSM");
				this.sprinkle("PPXJP");
				this.sprinkleMultiple("B", 22);
				this.setShareString();
				this.setTroopCounts([
				{
					t : RANGER_UNIT_ID,
					c : 268000
				}]);
			}
			catch(e)
			{
				EmpDebug("Setup Ranger3: " + e);
			}
		},
		setupTemplar4 : function()
		{
			try
			{
				this.generateSharestring();
				this.removeBuildings();
				this.setCenter("##BBBBB###BZZZZZB#BBBBBBBBBBZZZZZZZBBBBBTBBBBBZZZZZZZBBBBBBBBBB#BZZZZZB###BBBBB##");
				this.setEmptySpot(5, 3, "BBBBBBZBZBBBBBB");
				this.addStorage("SSSM");
				this.sprinkle("PPXJP");
				this.sprinkleMultiple("B", 7);
				this.setShareString();
				this.setTroopCounts([
				{
					t : TEMPLAR_UNIT_ID,
					c : 260000
				}]);
			}
			catch(e)
			{
				EmpDebug("Setup Templar4: " + e);
			}
		},
		setupPaladin7 : function()
		{
			try
			{
				this.generateSharestring();
				this.removeBuildings();
				this.setCenter("##BBBBB###ZZZZZZZ#BBBBBBBBBBZZZZZZZBBBBBTBBBBBZZZZZZZBBBBBBBBBB#ZZZZZZZ###BBBBB##");
				this.setEmptySpot(6, 3, "BBBBBBBZZZZBBBBBBB");
				this.addStorage("SSSM");
				this.sprinkle("PPXJP");
				this.sprinkleMultiple("B", 4);
				this.setShareString();
				this.setTroopCounts([
				{
					t : PALADIN_UNIT_ID,
					c : 118000
				}]);
			}
			catch(e)
			{
				EmpDebug("Setup Paladin7: " + e);
			}
		},
		setupMage5 : function()
		{
			try
			{
				this.generateSharestring();
				this.removeBuildings();
				this.setCenter("##BBBBB###JJJJJJJ#BBBBBBBBBJJJJJJJJJBBBBTBBBBJJJJJJJJJBBBBBBBBB#JJJJJJJ###BBBBB##");
				this.setup5x5("BBBBBBJJJBBBBBBBJJJBBBBB?");
				this.addStorage("SSSM");
				this.sprinkle("PPX");
				this.setShareString();
				this.setTroopCounts([
				{
					t : MAGE_UNIT_ID,
					c : 216000
				}]);
			}
			catch(e)
			{
				EmpDebug("Setup Mage5: " + e);
			}
		},
		setupWarlock12 : function()
		{
			try
			{
				this.generateSharestring();
				this.removeBuildings();
				this.setCenter("##BBBBB###JJJJJJJ#BBBBBBBBBJJJJJJJJJBBBBTBBBBJJJJJJJJJBBBBBBBBB#BJJJJJB###BBBBB##");
				this.setup5x5("BBBBBBJJJBBBBBBBJJJBBBBB?");
				this.addStorage("SSSM");
				this.sprinkle("PPX");
				this.setShareString();
				this.setTroopCounts([
				{
					t : WARLOCK_UNIT_ID,
					c : 112000
				}]);
			}
			catch(e)
			{
				EmpDebug("Setup Warlock12: " + e);
			}
		},
		setupKnight4 : function()
		{
			try
			{
				this.generateSharestring();
				this.removeBuildings();
				this.setCenter("##BBBBB###EEEEEEE#BBBBBBBBBEEEEEEEEEBBBBTBBBBEEEEEEEEEBBBBBBBBB#EEEEEEE###BBBBB##");
				this.setup5x5("BBBBBEEEEBBBBBBBEEEBBBBB?");
				this.addStorage("SSSM");
				this.sprinkle("PPXJ");
				this.setShareString();
				this.setTroopCounts([
				{
					t : KNIGHT_UNIT_ID,
					c : 108000
				}]);
			}
			catch(e)
			{
				EmpDebug("Setup Knight4: " + e);
			}
		},
		setupCatRam45 : function()
		{
			try
			{
				this.generateSharestring();
				this.removeBuildings();
				this.setCenter("##BBBBB###BYYYYYB#BBBBBBBBBBYYYYYYYBBBBBTBBBBBYYYYYYYBBBBBBBBBB#BYYYYYB###BBBBB##");
				this.setup5x5("BBBBBBYYYBBBBBBBYYBBBBBB?");
				this.addStorage("SSSM");
				this.sprinkle("PPX");
				this.setShareString();
				this.setTroopCounts([
				{
					t : CATAPULT_UNIT_ID,
					c : 20000
				},
				{
					t : RAM_UNIT_ID,
					c : 5600
				}]);
			}
			catch(e)
			{
				EmpDebug("Setup CatRam45: " + e);
			}
		},
		setupBallista34 : function()
		{
			try
			{
				this.generateSharestring();
				this.removeBuildings();
				this.setCenter("##BBBBB###YYYYYYY#BBBBBBBBBYYYYYYYYYBBBBTBBBBYYYYYYYYYBBBBBBBBB#YYYYYYB###BBBBB##");
				this.setup5x5("BBBBBBYBYBBBBBBBYBYBBBBB?");
				this.addStorage("SSSM");
				this.sprinkle("PPX");
				this.setShareString();
				this.setTroopCounts([
				{
					t : BALLISTA_UNIT_ID,
					c : 23200
				}]);
			}
			catch(e)
			{
				EmpDebug("Setup Ballista34: " + e);
			}
		},
		setupBerserker2 : function()
		{
			try
			{
				this.generateSharestring();
				this.removeBuildings();
				this.setCenter("##BBBBB###BBGGGBB#BBBBBBBBBBGGGGGGGBBBBBTBBBBBGGGGGGGBBBBBBBBBB#BGGGGGB###BBBBB##");
				this.setup5x5("BBBBBBGBGBBBBBBBGBGBBBBB?");
				this.addStorage("SSSM");
				this.sprinkle("PPXJ");
				this.setShareString();
				this.setTroopCounts([
				{
					t : BERSERKER_UNIT_ID,
					c : 268000
				}]);
			}
			catch(e)
			{
				EmpDebug("Setup Berserker2: " + e);
			}
		},
		setupNavyRanger : function()
		{
			try
			{
				this.generateSharestring();
				this.removeBuildings();
				this.setCenter("##BBBBB###BGGGGGB#BBBBBBBBBBGGGGGGGBBBBBTBBBBBGGGGGGGBBBBBBBBBB#BGGGGGB###BBBBB##");
				this.addNavyRing();
				this.addStorage("SSSM");
				this.sprinkle("PPX");
				this.setShareString();
				this.setTroopCounts([
				{
					t : RANGER_UNIT_ID,
					c : 212500
				},
				{
					t : FRIGATE_UNIT_ID,
					c : 475
				}]);
			}
			catch(e)
			{
				EmpDebug("Setup NavyRanger: " + e);
			}
		},
		setupNavyTemplar : function()
		{
			try
			{
				this.generateSharestring();
				this.removeBuildings();
				this.setCenter("##BBBBB###ZZZZZZB#BBBBBBBBBBZZZZZZZBBBBBTBBBBBZZZZZZZBBBBBBBBBB#ZZZZZZZ###BBBBB##");
				this.addNavyRing();
				this.addStorage("SSSM");
				this.sprinkle("PPX");
				this.setShareString();
				this.setTroopCounts([
				{
					t : TEMPLAR_UNIT_ID,
					c : 183000
				},
				{
					t : FRIGATE_UNIT_ID,
					c : 410
				}]);
			}
			catch(e)
			{
				EmpDebug("Setup NavyTemplar: " + e);
			}
		},
		setupNavyMage : function()
		{
			try
			{
				this.generateSharestring();
				this.removeBuildings();
				this.setCenter("##BBBBB###JJJJJJJ#BBBBBBBBBJJJJJJJJJBBBBTBBBBJJJJJJJJJBBBBBBBBB#JJJJJJJ###BBBBB##");
				this.addNavyRing();
				this.setAt(14, 19, "J");
				this.addStorage("SSSM");
				this.sprinkle("PPX");
				this.setShareString();
				this.setTroopCounts([
				{
					t : MAGE_UNIT_ID,
					c : 166500
				},
				{
					t : FRIGATE_UNIT_ID,
					c : 375
				}]);
			}
			catch(e)
			{
				EmpDebug("Setup NavyMage: " + e);
			}
		},
		setupNavyKnight : function()
		{
			try
			{
				this.generateSharestring();
				this.removeBuildings();
				this.setCenter("##EEBEE###BBBBBBB#EEEEEEEEEBBBBBBBBBEEEETEEEEBBBBBBBBBEEEEEEEEE#BBBBBBB###EEBEB##");
				this.addNavyRing();
				this.addStorage("SSSM");
				this.sprinkle("PPX");
				this.setShareString();
				this.setTroopCounts([
				{
					t : KNIGHT_UNIT_ID,
					c : 81750
				},
				{
					t : FRIGATE_UNIT_ID,
					c : 365
				}]);
			}
			catch(e)
			{
				EmpDebug("Setup NavyKnight: " + e);
			}
		},
		setupSloop : function()
		{
			try
			{
				this.generateSharestring();
				this.removeBuildings();
				this.addNavyRing();
				this.addStorage("SSSM");
				this.sprinkle("PPX");
				this.sprinkleMultiple("B", 70);
				this.setShareString();
				this.setTroopCounts([
				{
					t : SLOOP_UNIT_ID,
					c : 3400
				}]);
			}
			catch(e)
			{
				EmpDebug("Setup Sloop: " + e);
			}
		},
		setupWargalleon : function()
		{
			try
			{
				this.generateSharestring();
				this.removeBuildings();
				this.addNavyRing();
				this.addStorage("SSSM");
				this.sprinkle("PPX");
				this.sprinkleMultiple("B", 70);
				this.setShareString();
				this.setTroopCounts([
				{
					t : GALLEON_UNIT_ID,
					c : 850
				}]);
			}
			catch(e)
			{
				EmpDebug("Setup War Galleon: " + e);
			}
		},
		setTroopCounts : function(troops)
		{
			var request =
			{
				cityid : Emp.main.cityId,
				units : troops
			};
			webfrontend.net.CommandManager.getInstance().sendCommand("SetTargetArmy", request, this, this.setTargetArmyResult);
		},
		setTargetArmyResult : function(r, cx)
		{
			if(!r)
			{
				EmpDebug("Set Target army failed - comm");
			}
			else
			{
				if(!cx)
				{
					EmpDebug("Set Target army failed - something else");
				}
				else
				{
					// EmpDebug("Target army is set");
				}
			}
		},
		setupSloopFood : function()
		{
			try
			{
			}
			catch(e)
			{
				EmpDebug("Setup SloopFood: " + e);
			}
		},
		setupFoodHub : function()
		{
			try
			{
			}
			catch(e)
			{
				EmpDebug("Setup Food Hub: " + e);
			}
		},
		setupClusterHub : function()
		{
			try
			{
				this.generateSharestring();
				this.removeBuildings();
				this.setCenter("##?????###AADADAA#SSSSSSSSSDDMDDDMDDSSSSTSSSSDDMDDDMDDSSSSSSSSS#LLDLDLL###?????##");
				this.sprinkleMultiple("P", 41);
				this.sprinkle("J");
				this.setShareString();
			}
			catch(e)
			{
				EmpDebug("Setup Cluster Hub: " + e);
			}
		},
		setupStorageHub : function()
		{
			try
			{
				this.generateSharestring();
				this.removeBuildings();
				this.setCenter("##SSSSS###LLLLLLL#SSSSSSSSSLLLLLLLLLSSSSTSSSSAAAAAAAAASSSSSSSSS#AAAAAAA###SSSSS##");
				this.setEmptySpot(5, 3, "?LSA?SLSAS?LSA?");
				this.sprinkleMultiple("P", 20);
				this.sprinkle("J");
				this.setShareString();
			}
			catch(e)
			{
				EmpDebug("Setup Storage Hub: " + e);
			}
		},
		setupTransportHub : function()
		{
			try
			{
				this.generateSharestring();
				this.removeBuildings();
				var empty = new Array();
				// Top
				empty.push([8, 6, this.countEmptyInCenter(8, 6, 12, 10, 1)]);
				// Left
				empty.push([6, 8, this.countEmptyInCenter(6, 8, 10, 12, 1)]);
				// Right
				empty.push([10, 8, this.countEmptyInCenter(10, 8, 14, 12, 1)]);
				// Bottom
				empty.push([8, 10, this.countEmptyInCenter(8, 10, 12, 14, 1)]);
				empty.sort(function(a, b)
				{
					return b[2] - a[2];
				});
				if(empty[0][0] == 6)// Left side
					this.setCenter("##?????###???????#SSSSS????LLMLL????SSSST????AADAA????SSSSS????#???????###?????##");
				if(empty[0][0] == 10)// Right side
					this.setCenter("##?????###???????#????SSSSS????LLMLL????TSSSS????AADAA????SSSSS#???????###?????##");
				if(empty[0][1] == 6)// Top side
					this.setCenter("##SASLS###?SASLS?#??SDSMS????SASLS????SATLS????????????????????#???????###?????##");
				if(empty[0][1] == 10)// Bottom side
					this.setCenter("##?????###???????#????????????????????SATLS????SASLS????SDSMS??#?SASLS?###SASLS##");
				this.sprinkleMultiple("P", 75);
				this.sprinkle("J");
				this.setShareString();
			}
			catch(e)
			{
				EmpDebug("Setup Transport Hub: " + e);
			}
		},
		printSharestring : function()
		{
			EmpDebug("SS: " + this.shareString);
			for(var i = 0; i < 21; i++)
			{
				EmpDebug("SS: " + this.shareString.substr(i * 21 + 18, 21));
			}
			EmpDebug("");
		},
		// Count empty spots in the center area, allow for few bricks
		//  and town hall is just another brick if we get into its range
		countEmptyInCenter : function(x1, y1, x2, y2, bricks)
		{
			var ss = this.shareString;
			var empty = 0;
			for(var y = y1; y <= y2; y++)
			{
				for(var x = x1; x <= x2; x++)
				{
					var index = y * 21 + x;
					var s = ss.charAt(index + 18);
					if(s == "T" || s == "#")
					{
						if(--bricks < 0)
							return -1;
						continue;
					}
					if(s != "." && s != "," && s != ":" && s != ";")
						empty++;
				}
			}
			return empty;
		},
		setupNavyBerserker : function()
		{
			try
			{
				this.generateSharestring();
				this.removeBuildings();
				this.setCenter("##BBBBB###BBGGGBB#BGBBBBBGBBBBGGGBBBBGBBTBBGBBBBGGGBBBBGBBBBBGB#BBGGGBB###BBBBB##");
				this.addNavyRing();
				this.addStorage("SSSM");
				this.sprinkle("PPX");
				this.setShareString();
				this.setTroopCounts([
				{
					t : BERSERKER_UNIT_ID,
					c : 212500
				},
				{
					t : FRIGATE_UNIT_ID,
					c : 475
				}]);
			}
			catch(e)
			{
				EmpDebug("Setup NavyBerserker: " + e);
			}
		},
		// Count empty spots in some area, inclusive of x2,y2. Sharestring should have no buildings.
		countEmpty : function(x1, y1, x2, y2)
		{
			var empty = 0;
			for(var y = y1; y <= y2; y++)
			{
				for(var x = x1; x < x2; x++)
				{
					var b = this.shareString.substr(18 + 21 * y + x, 1);
					if(b == "-")
						empty++;
				}
			}
			return empty;
		},
		setEmptySpot : function(dx, dy, buildings)
		{
			try
			{
				var empty = [0, 0, 0];
				for(var y = 1; y < 21 - dy; y++)
				{
					for(var x = 1; x < 21 - dx; x++)
					{
						// 0 empty spots so far, -1 = trying to hit the wall
						var result = 0;
						for(var y1 = 0; y1 < dy; y1++)
						{
							for(var x1 = 0; x1 < dx; x1++)
							{
								var s = this.shareString.charAt(18 + 21 * (y + y1) + (x + x1));
								var b = buildings.charAt(y1 * dx + x1);
								if(b == "?")
								{
									result++;
								}
								else if(s == "#" || s == "T")
								{
									result = -1;
									break;
								}
								else if(s == "-")
									result++;
							}
							if(result == -1)
								break;
						}
						// EmpDebug("(" + x + "," + y + ") = " + result);
						if(result > empty[2])
							empty = [x, y, result];
					}
				}
				// Found the empty spot, now settle it
				var s = this.shareString;
				for(var y1 = 0; y1 < dy; y1++)
				{
					var y = empty[1] + y1;
					for(var x1 = 0; x1 < dx; x1++)
					{
						var x = empty[0] + x1;
						var index = 18 + 21 * y + x;
						var b = buildings.charAt(y1 * dx + x1);
						if(b == "?")
							b = s.charAt(index);
						s = s.substr(0, index) + b + s.substr(index + 1);
					}
				}
				this.shareString = s;
			}
			catch(e)
			{
				EmpDebug("SetEmpty: " + e);
			}
		},
		addStorage : function(pattern)
		{
			this.setEmptySpot(2, 2, pattern);
		},
		// Set up 5x5 area. Layout string has ? in last spot (coordinates 44)
		setup5x5 : function(layout)
		{
			try
			{
				var spots = [
				// upper left options
				[1, 2, false, 00], [1, 3, false, 44], [2, 1, false, 00], [2, 2, false, 44], [3, 1, false, 44],
				// upper right options
				[13, 1, false, 04], [14, 1, false, 40], [14, 2, false, 04], [15, 2, false, 40], [15, 3, false, 04],
				// lower left options
				[1, 13, false, 40], [1, 14, false, 04], [2, 14, false, 40], [2, 15, false, 04], [3, 15, false, 40],
				// lower right options, skip for water city
				[15, 13, true, 00], [15, 14, true, 44], [14, 14, true, 00], [14, 15, true, 44], [13, 15, true, 00]];
				var sx = 0;
				var sy = 0;
				var se = 0;
				var tr = 0;
				var waterCity = webfrontend.data.City.getInstance().getOnWater();
				for(var i = 0; i < spots.length; i++)
				{
					if(spots[i][2] && waterCity)
						continue;
					// Go through each set of coordinates
					var empty = 0;
					var brick = 0;
					for(var y = 0; y < 5; y++)
					{
						for(var x = 0; x < 5; x++)
						{
							var index = 18 + (y + spots[i][1]) * 21 + (x + spots[i][0]);
							var b = this.shareString.substr(index, 1);
							if(b == '-')
								empty++;
							if(b == '#')
								brick++;
						}
					}
					if(brick != 1)
						EmpDebug("Wrong brick count " + brick + "at " + spots[i][0] + "," + spots[i][1])
					if(empty > se)
					{
						se = empty;
						sx = spots[i][0];
						sy = spots[i][1];
						tr = spots[i][3];
					}
				}
				// EmpDebug("Found 5x5 at " + sx + "," + sy + " with " + se + " empties, empty corner " + tr);
				// se, sx and sy are set, now need to transpose the string according to tr
				var newLayout = "";
				switch (tr)
				{
				case 00:
					// reverse the whole layout string
					newLayout = this.reverse(layout);
					break;
				case 04:
					// reverse each line
					for(var i = 0; i < 25; i += 5)
					{
						newLayout += this.reverse(layout.substr(i, 5));
					}
					break;
				case 40:
					// reverse full lines
					for(var i = 0; i < 25; i += 5)
					{
						newLayout += layout.substr(20 - i, 5);
					}
					break;
				case 44:
					// empty spot is in right place, do nothing
					newLayout = layout;
				}
				EmpDebug("Updated layout is " + newLayout);
				// new layout is properly arranged, now we can add it to the sharestring
				var s = this.shareString;
				for(var y = sy; y < sy + 5; y++)
				{
					for(var x = sx; x < sx + 5; x++)
					{
						var index = 18 + 21 * y + x;
						var b = newLayout.substr(0, 1);
						if(b == "?")
							b = s.substr(index, 1);
						s = s.substr(0, index) + b + s.substr(index + 1);
						newLayout = newLayout.substr(1);
					}
				}
				this.shareString = s;
			}
			catch(e)
			{
				EmpDebug("5x5: " + e);
			}
		},
		// set a specific building in specific place
		setAt : function(x, y, building)
		{
			var index = 18 + 21 * y + x;
			var s = this.shareString;
			s = s.substr(0, index) + building + s.substr(index + 1);
			this.shareString = s;
		},
		reverse : function(str)
		{
			var result = "";
			for(var i = 0; i < str.length; i++)
			{
				result = str.substr(i, 1) + result;
			}
			return result;
		},
		// Sprinkle multiple buildings of same type
		sprinkleMultiple : function(building, count)
		{
			for(var i = 0; i < count; i++)
			{
				this.sprinkle(building);
			}
		},
		// Sprinkle specified buildings wherever we can find an empty spot
		sprinkle : function(buildings)
		{
			try
			{
				var s = this.shareString;
				for(var index = 18; index < 18 + 21 * 21; index++)
				{
					var b = s.substr(index, 1);
					if(b == "-")
					{
						s = s.substr(0, index) + buildings.substr(0, 1) + s.substr(index + 1);
						buildings = buildings.substr(1);
						if(buildings.length == 0)
							break;
					}
				}
				this.shareString = s;
			}
			catch(e)
			{
				EmpDebug("Sprinkle: " + e);
			}
		},
		// Store generated sharestring into separate variable and remove all buildings
		removeBuildings : function()
		{
			try
			{
				var s = this.cityLayout.s;
				// no town hall
				var replace = "ABCDEFGHIJKLMNOPQRSUVWXYZ1234";
				// skip sharestring part
				for(var index = 18; index < 18 + 21 * 21; index++)
				{
					var b = s.substr(index, 1);
					if(replace.indexOf(b) != -1)
					{
						s = s.substr(0, index) + "-" + s.substr(index + 1);
					}
				}
				this.shareString = s;
			}
			catch(e)
			{
				EmpDebug("Remove: " + e);
			}
		},
		// Set center to specified buildings. ? leaves the original building untouched.
		setCenter : function(center)
		{
			try
			{
				if(center.length != 81)
					EmpDebug("Center string " + center + " - bad length " + center.length);
				var s = this.shareString;
				var ss = s.substr(0, 18 + 6 * 21);
				s = s.substr(18 + 6 * 21);
				for(var i = 0; i < 9; i++)
				{
					ss += s.substr(0, 6);
					for(var j = 0; j < 9; j++)
					{
						if(center.substr(j, 1) == "?")
							ss += s.substr(j + 6, 1);
						else
							ss += center.substr(j, 1);
					}
					ss += s.substr(15, 6);
					s = s.substr(21);
					center = center.substr(9);
				}
				ss += s;
				this.shareString = ss;
			}
			catch(e)
			{
				EmpDebug("Center: " + e);
			}
		},
		// Add shipyards and barracks around them
		addNavyRing : function()
		{
			try
			{
				this.addWaterBuildings("V");
				var ring = [309, 310, 311, 312, 329, 330, 333, 334, 350, 355, 371, 392, 393, 414, 415];
				this.addBuildings("B", ring);
			}
			catch(e)
			{
				EmpDebug("NavyRing: " + e);
			}
		},
		// Add same building at specified coordinates
		addBuildings : function(building, coords)
		{
			try
			{
				for(var i = 0; i < coords.length; i++)
				{
					var index = coords[i] + 18;
					this.shareString = this.shareString.substr(0, index) + building + this.shareString.substr(index + 1);
				}
			}
			catch(e)
			{
				EmpDebug("AddBuildings: " + e);
			}
		},
		addWaterBuildings : function(building)
		{
			var wbp = [331, 332, 351, 354, 372, 376, 394, 416];
			this.addBuildings(building, wbp);
		},
		loadCityLayouts : function()
		{
			try
			{
				_str = localStorage.getItem("Emp_cityLayouts");
				this.cityLayouts =
				{
				};
				this.cityLayouts[this.srvName] =
				{
				};
				if(_str)
				{
					_scl = qx.lang.Json.parse(_str);
					if(_scl.hasOwnProperty(this.srvName))
						this.cityLayouts[this.srvName] = _scl[this.srvName];
				}
			}
			catch(e)
			{
				EmpDebug("LayoutWindow.loadCityLayouts: " + e);
			}
		},
		saveCityLayouts : function()
		{
			try
			{
				_str = localStorage.getItem("Emp_cityLayouts");
				if(_str == null)
					_str = '{"' + this.srvName + '":{}}';
				_scl = qx.lang.Json.parse(_str);
				_scl[this.srvName] = this.cityLayouts[this.srvName];
				_str = qx.lang.Json.stringify(_scl);
				localStorage.setItem("Emp_cityLayouts", _str);
			}
			catch(e)
			{
				EmpDebug("LayoutWindow.saveCityLayouts: " + e);
			}
		},
		removeObjects : function()
		{
			try
			{
				if(this.oObjs != null)
				{
					for( i = 0; i < this.oObjs.length; i++)
					{
						this.oObjs[i].release();
					}
					this.oObjs = null;
				}
			}
			catch(e)
			{
				EmpDebug("LayoutWindow.removeObjects: " + e);
			}
		},
		showOverlayLayout : function(ss, or)
		{
			try
			{
				this.removeObjects();
				Emp.main.getCity();
				c = Emp.city;
				cgi = webfrontend.data.City.getInstance();
				if(c == null || c == undefined)
				{
					window.setTimeout(function()
					{
						Emp.main.layoutWindow.showOverlayLayout();
					}, 1000);
					return;
				}
				for( i = 0; i < c.length; i++)
				{
					if(c[i] == null)
					{
						window.setTimeout(function()
						{
							Emp.main.layoutWindow.showOverlayLayout();
						}, 1000);
						return;
					}
				}
				cId = cgi.getId();
				if(Emp.main.cityId != cId || qx.lang.Object.isEmpty(Emp.a.visMain.selectableEntities) || Emp.main.cityId != Emp.a.visMain.mapid)
				{
					window.setTimeout(function()
					{
						Emp.main.layoutWindow.showOverlayLayout();
					}, 2000);
					return;
				}

				if(this.cityLayouts[this.srvName].hasOwnProperty(cId))
					ss = this.cityLayouts[this.srvName][cId];
				if(ss == null || ss == undefined)
				{
					cnt = cgi.getText();
					ss = cnt.match(/\[LTS\](.+)\[\/LTS\]/);
					if(ss != null)
					{
						or = ss[1];
						ss = ss[1].replace(/\[[^\]]+\](\:|\;)?/g, "");
						if(ss.indexOf("map=") != -1)
						{
							ss = ss.substring(ss.indexOf("=") + 1);
							ss = this.convertToSharestring(ss);
						}
					}
				}
				if(ss == undefined || ss == null || Emp.a.visMain.mapmode != "c")
					return;

				if(!this.cityLayouts[this.srvName].hasOwnProperty(cId))
				{
					this.cityLayouts[this.srvName][cId] = ss;
					this.cityLayouts[this.srvName][cId + "o"] = or;
					this.saveCityLayouts();
				}

				this.oObjs = new Array();
				for( i = 0; i < ss.length; i++)
				{
					if(/T|#|W|Q|F|I/.test(ss.charAt(i)))
						continue;
					id = 0;
					if(!/\;|\:|\,|\.|\-|\_/.test(ss.charAt(i)))
					{
						id = this.self(arguments).ssToId[ss.charAt(i)];
						if(c[i][2] == id)
							continue;
						if(ss.charAt(i) == '@')
							continue;
					}
					else if(/\;|\:|\,|\./.test(ss.charAt(i)))
					{
						if(ss.charAt(i) == ";" && /30|903|63|907/.test(c[i][2]))
							continue;
						else if(ss.charAt(i) == ":" && /28|900|61|904/.test(c[i][2]))
							continue;
						else if(ss.charAt(i) == "," && /27|902|60|906/.test(c[i][2]))
							continue;
						else if(ss.charAt(i) == "." && /29|901|62|905/.test(c[i][2]))
							continue;
						else
							id = -1;
					}
					else if(/\-/.test(ss.charAt(i)))
					{
						if(c[i][2] == 98 || c[i][2] == -2 || (c[i][2] >= 52 && c[i][2] <= 60))
							continue;
					}
					else if(/\_/.test(ss.charAt(i)))
					{
						if(c[i][2] == 97)
							continue;
					}
					this.oObjs.push(new Emperor.Tweak.OverlayObject(Emp.a.visMain, 163 + 128 * (i % 21), 67 + 80 * Math.floor(i / 21), id));
				}
			}
			catch(e)
			{
				EmpDebug("LayoutWindow.showOverlayLayout: " + e);
			}
		},
		generateSharestring : function()
		{
			try
			{
				Emp.main.getCity();
				this.cityLayout =
				{
					"s" : "",
					"u" : "",
					"u2" : ""
				};
				waterCity = webfrontend.data.City.getInstance().getOnWater();
				c = Emp.city;
				var sharestring = "[ShareString.1.3]" + ((waterCity) ? ";" : ":");
				var url = "http://www.lou-fcp.co.uk/map.php?map=" + ((waterCity) ? "W" : "L");
				var ss0 = "";
				var ss1 = "";
				var ss2 = "";
				// EmpDebug("SS Length " + c.length);
				for( i = 0; i < c.length; i++)
				{
					if(c[i] != undefined)
					{
						sharestring += this.self(arguments).louCityP[this.self(arguments).node[c[i][2]]];
						url += this.self(arguments).louFCityP[this.self(arguments).node[c[i][2]]];
						ss0 += sprintf("%d ", c[i][0]);
						ss1 += sprintf("%d ", c[i][1]);
						ss2 += sprintf("%3d ", c[i][2]);
					}
					else
					{
						sharestring += '?';
						url += '?';
						ss0 += "? ";
						ss1 += "? ";
						ss2 += "??? ";
					}
				}
				// EmpDebug("SS0: " + ss0);
				// EmpDebug("SS1: " + ss1);
				// EmpDebug("SS2: " + ss2);
				if(waterCity)
					url = url.substring(0, 317) + url.substring(319, 333);
				sharestring += "[/ShareString]";
				this.cityLayout.s = sharestring;
				this.cityLayout.u = url;
				this.cityLayout.u2 = url.replace(/http\:\/\/www\.lou\-fcp\.co\.uk\/map\.php/, "http://city.louopt.com/");
			}
			catch(e)
			{
				EmpDebug("LayoutWindow.generateSharestring: " + e);
			}
		},
		applyLayout : function()
		{
			try
			{
				this.errorLabel.setValue("");
				txt = this.olTa.getValue().replace(/\s/g, "");
				o = txt;
				if(txt.indexOf("ShareString") != -1)
				{
					t = txt.match(/\](\:|\;){1}/)[1];
					txt = txt.replace(/\[[^\]]+\](\:|\;)?/g, "");
					if(txt.length != 441)
					{
						this.errorLabel.setValue(this.self(arguments).error.hash);
						return;
					}
					if(webfrontend.data.City.getInstance().getOnWater() && t == ":")
					{
						this.errorLabel.setValue(this.self(arguments).error.type.replace(/stype/, "Land").replace(/ctype/, "Water"));
						return;
					}
					else if(!webfrontend.data.City.getInstance().getOnWater() && t == ";")
					{
						this.errorLabel.setValue(this.self(arguments).error.type.replace(/stype/, "Water").replace(/ctype/, "Land"));
						return;
					}
					this.showOverlayLayout(txt, o);
				}
				else if(txt.indexOf("map=") != -1)
				{
					txt = txt.substring(txt.indexOf("=") + 1);
					if(txt.length != 294)
					{
						this.errorLabel.setValue(this.self(arguments).error.hash);
						return;
					}
					if(webfrontend.data.City.getInstance().getOnWater() && txt.charAt(0) == "L")
					{
						this.errorLabel.setValue(this.self(arguments).error.type.replace(/stype/, "Land").replace(/ctype/, "Water"));
						return;
					}
					else if(!webfrontend.data.City.getInstance().getOnWater() && txt.charAt(0) == "W")
					{
						this.errorLabel.setValue(this.self(arguments).error.type.replace(/stype/, "Water").replace(/ctype/, "Land"));
						return;
					}
					txt = this.convertToSharestring(txt);
					this.showOverlayLayout(txt, o);
				}
			}
			catch(e)
			{
				EmpDebug("LayoutWindow.applyLayout: " + e);
			}
		},
		setShareString : function()
		{
			this.removeLayout();
			this.olTa.setValue(this.shareString);
			this.applyLayout();
		},
		removeLayout : function()
		{
			try
			{
				cId = webfrontend.data.City.getInstance().getId();
				this.errorLabel.setValue("");
				this.removeObjects();
				delete this.cityLayouts[this.srvName][cId];
				delete this.cityLayouts[this.srvName][cId + "o"];
				this.olTa.setValue("");
				this.saveCityLayouts();
			}
			catch(e)
			{
				EmpDebug("LayoutWindow.removeLayout: " + e);
			}
		},
		convertToSharestring : function(u)
		{
			try
			{
				template = this.self(arguments).land;
				t = u.charAt(0);
				if(t == "W")
				{
					u = u.substring(0, 242) + u.substring(244, 260) + u.substring(263, 278) + u.substring(280);
					template = this.self(arguments).water;
				}
				u = u.substring(1);
				c = -1;
				u = template.replace(/\-|\_/g, function()
				{
					c++;
					return Emperor.Tweak.LayoutWindow.fcpToSs[u[c]];
				});
				u = u.substring(0, 220) + "T" + u.substring(221);
				if(t == "W")
				{
					wbp = [331, 332, 351, 354, 372, 376, 394, 416];
					u = u.split("");
					for( i = 0; i < wbp.length; i++)
					{
						if(u[wbp[i]] == "-")
							u[wbp[i]] = "_";
					}
					u = u.join("");
				}
				return u;
			}
			catch(e)
			{
				EmpDebug("LayoutWindow.convertToSharestring: " + e);
			}
		},
		validateSharestring : function(s)
		{
			try
			{
				if(s == undefined || s == null)
					return false;
				error = "";
				c = Emp.city;
				for( i = 0; i < c.length; i++)
				{
					if(/\;|\:|\,|\./.test(s.charAt(i)))
					{
						switch(s.charAt(i))
						{
						case ";":
							if(c[i][2] != 30 && c[i][2] != 903 && c[i][2] != 63 && c[i][2] != 907)
								error = "resource";
							break;
						case ":":
							if(c[i][2] != 28 && c[i][2] != 900 && c[i][2] != 61 && c[i][2] != 904)
								error = "resource";
							break;
						case ",":
							if(c[i][2] != 27 && c[i][2] != 902 && c[i][2] != 60 && c[i][2] != 906)
								error = "resource";
							break;
						case ".":
							if(c[i][2] != 29 && c[i][2] != 901 && c[i][2] != 62 && c[i][2] != 905)
								error = "resource";
							break;
						}
					}
					if(c[i][2] == 21 && s.charAt(i) != "X")
						error = "castle";
					if((/V|R|\_/.test(s.charAt(i)) && !/\b(19|22|97)\b/.test(c[i][2])) || (/\b(19|22|97)\b/.test(c[i][2]) && !/V|R|\_/.test(s.charAt(i))))
					{
						error = "water";
					}
				}
				if(s.replace(/[^X]/g, "").length > 1)
					error = "castle";
				if(error != "")
				{
					this.errorLabel.setValue(this.self(arguments).error[error]);
					return false;
				}
				else
				{
					return true;
				}
			}
			catch(e)
			{
				EmpDebug("LayoutWindow.validateSharestring: " + e);
			}
		},
		testCode : function()
		{
			try
			{
			}
			catch(e)
			{
				EmpDebug("LayoutWindow.TestCode: " + e);
			}
		},
	}
});
// $Header: /Home/Emperor/Emperor.Tweak.OverlayObject.js,v 1.1 2012/12/23 19:29:56 Aare Exp $

// Amplidude's LoU Tweak City Layout Window component

qx.Class.define("Emperor.Tweak.OverlayObject",
{
	extend : webfrontend.vis.Entity,
	statics :
	{
		img :
		{
			/* remove marker */
			"0" : "data:image/png;base64,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",
			/* woodcutter */
			"47" : "data:image/png;base64,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",
			/* quarry */
			"48" : "data:image/png;base64,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",
			/* farm */
			"50" : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR/mAAAACXBIWXMAAAsTAAALEwEAmpwYAAAOmElEQVR4Xu1ZWY8c13Wufe2uqu7qvXu6e3p2zsbhLpGSLNKSaCFakoAKbARJkCiLHeTBgP0H8pgYfgiCII8J8pY3OYZix44skVoomtsMR0PODGd6eqb3rbr2vSq3SUZ6cRIhsAHD4JmXrp5z6351znfO+W419OtmKIpAv2n21J7aU3tqT+2pPTWSwqfn4ifOZNOZxK8LJppFXntj7fvf+/O/+d53Lr7+EobBv6KNkC/rh0ALK+xf/8WLy4ViiJfubHU9y/ijt0vHn4nQNAL/suGhX8aJ54lvvLXw3Pxk7UF35MNsXLy7sen5fnRovfHq9FwlHgoSRWGODfteGP6qo1Wexk6doVZPct/6s6mcwXTkBs4QdCKfyRctQ/ZcHSR16+e6f2h9ffX4t944+c0/nr3y9eyLXxUyeQJFYTGBPv88X5kiohzyy4kWuOm553J/+KffzE+Ql2dnDrb1oaLQdHZldWZ9+9Bywt29AwE2Ha1rE0bowEPZtH2P9ZhwBJ8oTi4s8GKWfuMr03915Y3XXjyxtETGRRvDMFX3PBDO8P8LS0xg3/7ut2GzpT+s7tythwlveW5hoKrvvH+/3lRCU3n5VBkzG7I04EkyNhVx47TU8odN0woMz7ENxV8rl587fWbQbWuj4VSicGF54cJqqTzv89lA03xV8f93WL+Aq6C+zp2Lf+Py+e1bu2Q2yEUqboj/5PpOT8f8EEpy5MunCu36g4NaHSwHcRUSArty5T65hglxkQn9jQ+Ofvov85VMAAVLU+nShOjqMgrBrCAiBC0p/X25dvN+59Mb/VbTCvwvxy0hjr32avLtixc+/rBeLOYX82v1nv7ujbYOCRCMrE0JVy5k2kf3+/1hAHZiaWBoAEvrP46u/zN57e+t//zb+ua1ZEk49exSpZw9aCrvvvfZUVcPIMjUFW3YpwnmXPnsW2efefut+Tdfz5YqJILA/1u0EASameP+5M1LnUZj0FDPXVozFe/DrZbhErZtsYh5cS0duCCrR57nAo7YtmO7XiohtruS7UMgZmScQ3EI8pBXzp8uxSgnJIHbwWHv3ub+SNNOLeVifAxH0cCzo5xAUGSj2enavVvbB9dv9OpNy3UDnEBgGLEtD3uMiWLgS6+k56np+p1tl6MuXDxxfX2/1scgDIdd7ZUVnmM4SVYBWTkhpmsq5rmKZnIRttHTWj0tEUVoKEqZRiU5GcnxlWxSVyyCCGiGSkaxly6e2PpsZ3OnhyDdY1NpnmXlYY+kqI9v7ttB8OyxxUqyt9k/ODwILAM52JefUD43wf7ub0/M4XMh75Bk5PyFVWWkvn+nS1LEagH/g8tLBI4alhMXRVBNOIYp46qkEBS/t1N3HSefILPZrKZpDMOMFEyT1G6nRZKoabuBZyEYFmGoWIwv5XgYIja367u1bgh5rZ66sT8wDLPWHDabxvRJnGMjmhG0G6Bcg3ESL70qpilskiyaJPzC+eNJLr5fPQhCiyajMY7rDiUvCAEg3/c7nU4wtvD2xlazM4qSQUKMJRKiZdu+H+qGoYVRj0QhLzIRJwsiwTJkIS2QVEQQor3eIPRc3fY7jdrRMDgYMwXzEZLm6dVFiWICxcA2blqb623bdsfRSmeE0mRyqjCxv7dXzhUAWIKi/AAOYRARnKJpVVWBmyzLOI43Wv33PrzrOXo+zU2WS8VicTSSHcfRDU0zXIhik6lYTIjMnP2d6+vVg4MjDHZHI63X7afEmGGPSUMT6ObDXktBfXGSyk+i0Rg83PNhxLVx18UbRyPP88fcwhHqdGXR06xm3+kNpUmOg8MwlUxDcDjoDxAEAXEaDKS96mFnaHTa7WKWE+PZVCqVSCTq9SOe56q1hqQGPZfnSEdwDILi52emYeirOEn/w9/949kpIk6H1XpvtjIB4vcf13fqEmwlF4hEBiEw39R6bafT9iIpk41y8KPCHMOiIJwMoZDATh/Lr29sbN6vXnrhpKJpUOjrmqnrmm6YH9243+r1ORqdLsbERKpcLkZZttlqKbLa7st7Q0KmKpWJiNF8MOLw5dNzmzevSXqwsraME9DVO0fLqyuoq5gPqkjg1nu2ljuJcTxBoHDoO65FkTDkQSjCEAiJfg5LC5x7242vnD8euP6Dh/sd2XT8m2vLZUXWq7X69m4DhhyKQOdLYioZJykyl80psmaZJkGQe41RF5lwknwum6bdFhGFbcvdXj+qHrUhz85NFBDIT8XguZVFzcEO96qhIw0icDEZC3zPGA5keYiHIYbGqYieT0U1c0yqJ7BU2WmqWqszAAX1W197qXZ42Gr13r+6SWAgy/ZEmhKEDGAVSFk2nzM0HVAtHufv3L33oBlmTrym9wYkQ8Oua9kY6mOBgxum4TgWhWH7ewc05pbzZCpOpZlcvpAeDdSD65uYJUlD9bDWZGE7kxHisTSX8AjcbPVsGEGeNAjfh9LFmGGS5XRkYWEuk84sLi4KPJJJR4vgEaLi3Nwsz/MQBPd6w2Qi3usPb208PHDSQbKyG/C8o8NQiJsmjyAs6y1MplwnBBXjhAriBdGIgSDk1OIpyw4JHBsM5bPT0e++tWoe3bMcP58WJcWA4bDbcTJpwbG9Wk0yTecRNAxhGPTc5d/797vyv75zFZQhTROTpcrs1FI2WwH1OG5WGDpu7q7545/duXqnHU6/hAr5EMNSFBa4DmfqgVSHvU4pnQlsjwilSgo7OTMxVaByPD2ZTIzaLuI6o76apL1XjuE4ERazkTRrdAeSajgRjmdo3HBMnMAohngyE8GAFVM4gmJnLl5uUfPf/6ef3bizq5um5QCemAxFGbrh2A5wOOp7d3qUlZzbclg/RHzHygWq0e9Ivf1sjOE51oEwxYQLhbIYYx3DHDVbJAb1DXX34Q9uf/Jveveh1Oo6lin3mukEhYb+senM8aVZGtLWZtgYHtpmGPr/LWxeeT0/PR1XOsz2vdtwEFi48KNPdho9Q+o2UQwTOKY/kG9tHdyXuCGRxcUYjGK077OwT2lNpXsYY6GsyIGHBNxiWRyFXN/Qt7cPWn0NoaKz6YjhBUTgYgR8+bnjRd67evWm7pCIb9S6viBE/vL3z5Nup9vq0Sx+Y6PfG2ggiWNY5VKBxvIoGjnY2wfNiQyseqRSXjnDCmkZTjIs95P1nhkpBo4tNVuEEHd1I8sQw6NtAjemy5F8HOIInMTQ+ROnovHSzmc3wASLCvGF2bJjmtdv7cQSkSiBrS7Mn1oskFjQbjZ+fucBwiSqDeX0Sn5uOmtK7aPW0LNgnCOqtZFh2MhjLTrSDm1N1uzw8nPLgC3nyvHpqdIza4tT5Xxu7gwpJgIUZqwBAba3zDQSdHZvVYrc8WPF2Xk8keewBKwa6u333m/X7q4cW9w+HJZy8Y8/3Wj4CR1P7Gx3IRgupDkHFFfgZxIMSWD1RneougkxOux0EBiJ8+TDo34uhhIk+oRbrutjCLTbMUay0tL8amN4+0fvQNs3pKOqoLe83evPsiqB4gMwQ3oSrKuW2njm1Ny5s9NEOAAlqJkxBjFQHFs4MdNomzeqTj6Xuru5rwaUKsuKExZK+bhQifOUb5kw5Jq2g6OwbRngQ6ujPVi/CzQ3HIZBCFSQMz9beALL1KwoAwn45upJwg1pjONiInTr9gfB0db9T65+8sG1drXGhS5bXHr+ay9fOLs0neJpood7GEWSgwbqKF01nA5pcnNrT+TYYymo1ZHXHw5oAgoM+Vg2QiHUQFGQwFSkVr3eGQ5lCMFGqqtYZvWwbwVYfQS5CAtCGYZQGBBPKJ9IULGU6biBrhpH1a0iT8ZKtg+ZHCp26g3VdtuSZtnyysnTvFTj3EGC81GY3a0NaSJpKDWxOOPLewJDYxQqyYNqdxBlosUEN5HmXziz6BlKCFNTMxNRVKIY7mFd3a+POiNXd5FiItYY6ATJRhmh2mwHBEkyzP293mAgj2G5nu/ArmPDoAzTKTRENdzxQcHjGKOQWZ+IOEE4MrQ8LuVjIU1jpq15rsWxPs2LquopQxmJlnB/iPuuj8QjuFbKEdEYwZFMgAOuEIlJs3XkEBhW6w71vrNRHRgODHRGIcYxuClLqjoy25ptwB6bjGzda2mPZ1DghyiMOnbIRmAuCotsVBQBpqxNLP3wpx/JPnnp1TdN6SNJkUk6Go+gnDgBiIFSrK0NGNx2x6LEQ6FRiMdxT0rkcDcM3MAGNIIcjUvSQ9nTfV31hw8bg/6RDuGcGKEbvYGkeaYLS4bft22MJTI5ttdTd3e6tu2NYcEwiFUoSbZheDgJ82kYQRk2Koj5s0snlrPZ5Ls/+CFLEKkUkp8KLAtHPBMBWeR4kiCHusUwFIyhIzMK+7oVgNuhEBzASICSkI+6lm2gsIsjvuF6uum5oddUVEokUwUGYRGGJ5M5Js6zLEXKinvtWlXTbN8P4MewwjCEEZjjcE7Al1djM5M510WnZ67U93Z39/Z8PJISOuUMOl8Jrn+s5jNx33NV07NCJERdOCCHstVsmoOBphk2jGBJkZrIsYU8YDaEkn7gIyNJDXFEEGKNQ4OKYBwVygZ249O+ItsYjriOj2GoohqSZAAknuePYSEIIFX4GB9JYflC5MILeZ5nu02Li+UpEnVUOSMiDOF0e/aYggRsgAIBTII8EHDbd8IAdl14MHC6HbvRUAkcAw+5MCPSLAy4SBGYozuRCEyQsAtDPE3bDjqQvWpNBVnTdMvzwWMG4yDBYzBPtDyKIuEjA8DAH44h6Sw/OxdfWk7GWBqBwQrCcizd0Gwr0BQUQhzbcS2QEd+GUB9HYWB+GI6Gge8hiupLQ6vf18ENH98c7IFhSCYDhCMBttR113FD1/Ucx3ccAGkM6LHzoxghQfAIFkHgEBSCC98PAd7H6ABqnmd4nqYoxHHA9yGEQAgMj/VQ6A17lht4MYHEcAgngDtYD/leaFlgVy8IINNwfYB0fFcI2OdU+T/fQAC3x9z6Yg30fxkMPznxAucvLp/Yk+XgP7+x9l/4EAsrvf4WtQAAAABJRU5ErkJggg==",
			/* cottage */
			"4" : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR/mAAAACXBIWXMAAAsTAAALEwEAmpwYAAASM0lEQVR4Xu152Y8c13V31a19767eprtn6Vk4XIYjkhYl0pK1xDYiJFaQQDASBAlgw0CAvOQhD99Lvr8gLwGMBEEe4sRxFjuJA0dxbClhZIt2ZFkiJZIzI3KGwxnOxum9u6qra6+6lVM9HM5I8iYnyFNuD6qrq27V+d2z/s4d4iOM/xvk/7Y88rjE5DiAJEmOpv3PyTh6+884+Sc8S//3McHJB67D2z/qez7wCP1jJ/10QEfnCKHj15PROGYq+HxQH6O55I9bBvXzKunonARQJElRiKLo0Wl64fCEginw+bBq4RvuP/r5c8IiRwNkPTqnAAhC6XGEgxoNuKvrmTiOKZoaYUngBAY8cxzH6HgE9EBhHw0WeWwQh+s+0MYjYCOI6d0XX/x0Ril86pPPDLbXzmnoC0+d7ht2DyPABphA9gec8tH5zw7rCBAIfXSORoOGwdAsyyGUCqPoVCcg4cx09flPPms6nnB/5TOffq65V1/ZazkEzfL86CWwniPfheNxWR8NFggenaEDL0EULB0wjYAxqZo++/jsiYmyGg5/faFUqdU2jeHy968+e2ri3ffuLu+2qppIBWEgqfTIrHGcwEiteywIflYjHjccrA9UQadYaMBEpSPVFssyHMeVs/L/e+mTBSLICazRN9jevmp3Xnps6pUfLjdNS2JogSJrWXnHcKVcHgAkCX4YpwfHHzPoHx9lMI5CjWGYA8Wj0TjUF/dLizOh7/e9GIXe+dnqTsccq47/xatv2UHA0rSfkDgmIz/8mEYuD61MJnsIC44Yp288sOYHcx79E7LAASzQE8uycIQLCY5pAAiKSi1IZ3gy4/Tv3naoIOAk3uW4hbmpP//2GziOIxLxiBQQKnAUYmgjTKZ9a2eIMhmNII5w4RhwYbhyXPRPh5UqhGN5GAKfxBgMCpDApCQi8gr9+RMlRZFAgB9HmMSd9uDrV67nJNaNKZ0BWFRG4oVitdXuOsNuSRMykf/uMMlmMimMEbQwCYmYGLnajzMiSX6oeiRp8CMkioIoHCgsOV3KiTx7e2v3dxdnMhx1v95uGJ2PXXxy6/bqK++s6qoQI1KXQUV0ARGtMElcO6Pwu43QSBI7jKrY7ZOSqkqwsCiGAYcPYgLp6EcW7YMAhPgH3YgSz7O0Ios8R/EM/xvPXfjUXPn3nz17c23jm9dWWUmcnZ559eo7/3RtVRJ5nqHzGYkUeE0SbnZs+Pkrl86eG8+v5+aGYTRezT13dnw2NkVJUGRZlEQImoc573D8SN+C28moasAHRurgURj7ztAlsKgq45W8hhJClW++fWd+pqYrolqu/P3Xv7Xa6J7IS4hmQHaWxLYd7vjOU7UCxokTRtfv7c6Q9JlxnVaUjmdfPDfZWusFNM1zXOAHURSHIaCJjwcmdeRMo8PIu+mD5J2iIyCUMMsxY9WJYql2sQQZYA95XkXhBn4QxORXXn4N42BWYyiW6w6cAoeskKB5qlRQhkHS8/x2q00R8XxeGJ+s2HGUy8mbHuNzhTgKPc/HGEdRasyDOPigb8GlUdZEcArgRsoiMI5hYnGsBIEXx8EYZ358ouY7AmjeCqIZmv7il/8RnInGiYnpOV2laFCHatY7Opg9IX0cTNfKMcaWFzE8XR8YicB8525HmzwdxzYIg5h+WDDoKAjw8aSK3q8tkjqs/QlBMiydy+V8L+A45nxZ/8KlRXAzmuVs237w4MGf/fU3xvMKRxIBJujIG9pDimEEVZ2YmU2QeOd+y3DCd9Z3r6/t7e02+44dIebKu/vDIGZoPo4fKunAIOiovh1q6zjTGKmKpOhE1+UoTDI5XpEZRAkvnD/9mYmibfUH5uB2vXfl5pqc0X7x8un+7lZ9SEgsk4hKxHNiHJ+q6hQv/skrD0JaIr2AV4VJXRBkvu3F37m2r7AhS9EAKAxDWG0YBlEYYPCqkXhQRxQd+laqnGOkLMYwjfC9ECGKQQKOqN96+twFhXn5zeUrS2v/sLStLl6SmeG2K0QEBZ4EEW4GuIdJjiKSIJwYr3j28PUeoUdmWWXy+QxSJC+Or/W5Srlg9zuiqCYU59iu67me58U4DvwIP0z9R/yRBix4xCCBFLFcmsCjKNELYqGgBh6aUqX65t1Xt/b1mZNnnlwQWtHnP/e517/amnl84c3Xvp0vFnOBJ6nabrfv4mSyoG/e3wUZi1GnVFUpWJgmh47/+loLXKI34HKaGDHcYDCwnSEETBDGnuvjJGJYhL335XoEEMmHiYoC9Q4HjqzS+YIIV0SJtuhkJWZmz0xDimlvrz02TiSxB2qtzcxcOFl8fXvATs4z3nB2vKLRaOj79XqjN3SnyppPkMVy6cJM+d+WduV8kWbFsi7utFzLARP6qshCeEJimJyoQp0AW/EClDPqeIJI/f/AsYB1jEIQ+S4xNTk5MD3fTR+ermR+7///YeJ3//Sv/qPx3vczbJCr1Jrb60/8wotv3t68PD9e391PSEZgObWQQQzV6Lvz0xP7nc6VJh3BuxJCo+yl7T7ieJ5MCrrA8+AuSa1a6Pf7oBY+jaTUer4fPjTiISMD8MmhzlLlbW/vEZiamVchcBgEcYAwxmPlPF89XUfxra98aarAa9H2k8889Xf/+u1fm59yBt2h7fc8FMZxJa8EPPfKaidfRKAbkQjvDbmxiazZ6RHY6zRDhMjKWD4OvbMzJdBuuz/ca8TgaQiBs+LUiMdLIjXKVxxUGYqNImpiOt/vELsbfRZb3/jjP/AGbS9CoR/IyPvES7+DcrU/+uLX3nn1q9jev7nbzut5rZhjIq+oK42Q+Mvv3kE41LQMQ+JNX8xUxnN5DQzT6Biu52gC4ogwr0m6wj82M/aJj0/NzxVEgRvFYwoJoUOuBx/IT4UxKFaQ4ROGBgVSmQw1u6B6cTIxf3Hpzv7zZ6SLVV+MLUmUqgVN1lRl+kxYOvPqjdXlfeNEKbcwN7llhks9YBBhNquCO+6YIWJYwhvCmqHkq1kJagCkB1lgJYnRciwvIo6k87KSVXkKPeT7FBwAYEaT5k/Xkgg5lhsFiSjI4GgnT54oVTizi7sRu7JyR6P88swpkyw3ttZ0lRsYnRvrvalylsEBz1K7Aatj7+26fX3A8IEhS0KnbZoRlx/LBmZ/viKub9ZBqDW0SyJzopZTVZmB3A9ao5AbRJKseyE2TcfzfUCWOj/HUpLMONYwlxd9D5MIBnHyzLSeFxr1PstSY1Vtenphq2G9fX0t6t1XZPZe3e3Xm4uTnC4iqlhRGerU4oWv/ft3fU6Ju418Mb+7vTuUxqpgOIbI5dSO5Xk2WM+uKOhEJUuxFLi9pikcJwzDoGP4W7vtVr/jp4UyJMnDUo0xCetTVDoMY4blShNc7SRvmV6pqNNEVsvReb0SOJ5SGW947Np6gwuNybLcDLSYVtnemqTIpfHJ1Vs3QtfLasLq+nbAyZysigxDIgwWCAIbEcGEgmYqGqswIi/kcrrIi6LIm+DqbOR52LTtZsPAeEQ/D8IwlxPnTum+Q5QYQIc5gTXbCYPgNk/pUCOI7fu7KIkwJxc5nD8x/cTli1euXDX2li+dm2NztVvXb9ntpqqIkpp7e2nj5MKCj/3EHWQYcbcDKdMWqOh0SYAUDW/MKFlEMqIoCwyj6hmH9Lv3nG7HSfCIVRH4IQ0EbweOkrYzFBL4VMGJy+hSpZStQlwWpPGddTefy8+fmHtunKSk7KXLZ7/8pb+JfW/85Ol/+cHdq28sTVb1UrUY++6trS5RmKrVqrzIZUrFroMGpinR+GxV0XMixSCaoDmaKxYLPCdQNO+TQyT5EfYFmQFkKbmPMcZJWqoFgY3B3XqOJgFj5JUSjdy8M3DGymPW0MAUQyHE8lyr3Vq5/laj2efRBTIKL4/jNsE/9+yTAadtNOq33trrWohSFYagh45j9ge6onU77aJMLtSyekmJwxiHWFVUWVYh9EWBjzHZa7oEUngUGd1OrsATVNhqhIDroKXEk3OZcqWIErYwQffqUITohcWzEKUQtu9eX9GUxKPuy7J86ekXfMeTRLK+33r6fMWKaFGWPCHP2d1zi/Mtww1wMq3gVqtTzI5h2syKYVWkM7oUxZHAitmsLmtK320DZaJozrQDgZO6AytEDsnGmxudVsvCOE0QD3PX7oaxubzPsRHp02oGLZw62Wpu9Q2jlM8/cW6aCI2k6ze3N7718t+Wp/XTZ8/5nm8OnInpmWJef6rglmcmnn/uaZYD05MYseXK5IP6lr/XKCaoWNQty6Ywo2lZJw7vP3jAERmGlhzgy6SBUZApM6wUNfcNsCCRHGOnoK1snh+bUy0Dj02wE4WT67c3Z+cnkiBee+e7xaz4/LnFJMZxhG3d2li/t/rmtYunpzcb6PwpzWzXb7y9ZJkWn+AojEiak2Xt3sZqniNn8iov8gTNqEo+UygyafckFEsztj3sGZ6PDWCl4cDADGpvxUYvMPru+5rnUlnO6ILC5ubPZMiEzFAlSZZJMiirSJOFnmloqoqDBKTCCFwX8optuxDc++Fw7uzjJOZ+ePU/x8Zyr7+zOlEu3rqxPKZzkwWlmFertZkYKZKeNfYbjt1TVRX4DMszA8MQIQ0VdDZD39tq3Ly1c+3mtjl0OZ4EfvDQt2SFn57Lihyby7OBQ9YqMzv1TYHwRQroIqYR7bsBxCkY3bEdWVGAC0myxHGshKj99sat5aXaibnFxWmU0KvrywuT5dNzk9lcNleYMq1gdX1nenZh4967jAC5MimPTzqWxzKQonWCidsdf+V2Y+XuPiNSc6cy5y+V23XHtn1qxKvYoelXSgoZMJ5LAxfMs6ioyhk1E8UY9Af+ybKsa7sQjxjHMOBnnGBVU/mYURiFYMidVvut712bLKlnz83zsq7ny/UHD6CYgnpazVVFFhUOqm3W9AxVFzFtY4rglfGlO/fWtzqW7Z04o8oKs3VvsLdtwPspcjRqs3q5WiwVTnIkEQaNnMADTwWyjWCkewiMbduQisB8NKQbRAE2YG2wAJcMX/jVz967fUcSM4Ohff7CE02zETDOD964o+bKkFMYGrMkU6hIzY41iA3EorbT4OlZwyCvfv97d9eBOPYZHqo4fXupvbuVYkprIsi9/MzU5MRc4FCtvQclDZUU1Q3imCAhEiHNhKHv+wEkYIYFXbpgU1EQUgLEkATkXRzcWbttOe5+3QwTn5Ssc09NWINkv+5bQ7/VNh03FBQGU5yL/TihMees37burG7rNdsYOPsPrDBMBqa7t9O3h0D68QGjH7XaFNFr9HmczJR1lqJs18c4GZFGDhjuiPKMdvHgCRyD20ZhTBJYyEggcujyUnZqaeVuvdN7/PLFX37h89/857c27m+5jt9sdjtdq903+5a9u9eLk7jZsPfux62G4/ru3ffMrY0eSC+NaZ1OH6GkUJFdO8IxxgALZPIUNz2WL+lKghMviFLpGAOF5jkujPw4jsC7wXAwFfQUREEawCzTM4NhJG3tG1deu2pY7vTsPMtwnUZva2N3YEJlShwgq4bhB34YRrDKbsfa3zPGx6vAe+cXVaDjU3NKe9/d3m4GQdrt97vuATUFbdGyyFXymiryUZyAblJiz1GKyJMkCgKfJEiK4SKMIDOouhRHievaQcS4KIlZHmz09o337KGNyejG8rWxhoYYcdAPgsglaM+PPIYmQCIrULbtwPtplnrjB2+Bgd54zVY1pTp24jd/++lbK9dWlnbiCPd7HizgoG+ldE2qFDIcy/hhBIkXLkK1EsF+AhOGGJys2TVanX7MxViKoLeJSonZjUqF/F5je3333tC28hmJl9DetmlbXmRHA9PCSewPk9Q5EI5DSHhgGfiLbcvHGHMssCzumWcu9cw9YJert/c6reFwmO6RPNrqpVFKH0LLdiDx0xQFBAl8y/FDCGwSIT+IPMAbR1A3ODJLcomxRJY0cmV5wyE9lqDHK1mz71oDN6MqiMSlSZFla5sb91kWY4JptftgyoNtNTDQQYsFcIFWvPzyKzg+RDE6vH8jKSEdL4xBwxSKaGx5gCcC/7ZsH8qWIANUBPTSlfwWMrrbsdvubYp8s93qGTbiqH7ftKwA1KJK/MmFfKPb6zyo16amtve2u90hpJg0snDa58FxBIIwTPOn/NcKYPlB2LccgWMg5B0/sBw/jmK4EcWYokkvoCiSIhI0HNJrN7quE1h2yn7BA2DCo1XCFNcPb93cDyMMgnv99wAQTDiSEyfERxn/BUlHFZZ+00uOAAAAAElFTkSuQmCC",
			/* marketplace */
			"5" : "data:image/png;base64,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",
			/* iron mine */
			"49" : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR/mAAAACXBIWXMAAAsTAAALEwEAmpwYAAAR60lEQVR4Xu1ZWYwl51Wufbu13X3p9fYyPdNte2Y8Y4/xzNixnXhie2KcOEoIWIGHJAoICQnxwCPLEw8IkCIhBCgIGQkhBRKkEJI4IVFi4uA4Gc/Sc3vce/fd696qurXvnLrds08WEl6Q+Kfm9r1V/3/+s/3nfOcU8n9//P9A//cpordpJknyP1mYfsCS22xhGAbkHrjHrY2S8X8UPfxy+BRNv8dxdHs2ht0iFATBbTqHc8d/7xrpvZQBLOUp8NMlxI+TGGbA55hKkjIDV/othh/x+BEGF44dCAb34Nl43S0VpRQOpB2vP2BmTHesmMOFqTzo4ZzkUNq72IL5d/IEI47jn2CFlF4YkjRD4ESSRLDJwVxYdZO7+EAcbPyR8pAgURQeCDw2EQ6f6eMEGe92W4v4ISs3xy1ufka3iKOIIIgx1eRANnSsxUOyB5RTnR1KDua+QxFjsVGEJEmWZUG1URTB7repYzfHz+fj9/glMMrQNEVRNE0zDMPC4NjHzz8rSNKP82BYAjPhE37exRaO4+ma/6UBe9AMDWrgMpwoi1OzM7/x27/34U9++uSZs8DsT90Iv8kWCuOWh/3iA2wRhREMIMjz3NGVR1TdsV03CMPqZF3OyWh6TkOY9ZOoAFtw/Rzbg45/qolL5ezHf/1T51/88NMXP3rmmQ8+fOb8iXPvXzl99omnn2VZBjR6v/NgN4Ub++zPMLDUD1CWpfJ56cjS3EOPHBNF/icLnMsJJJ8Xs3nfcxEMF7NFOHucXJQTlaZoEIykKIIk4cst/oifhRWKpmZmpnlBLBXFQqE6suwAThHKuK7nud5zT+e/9o3/smzngarKyuLS8knXAZZ8NiNwGcEyDQyVQAeDZptnSc/3k9Ti4Z0Z4l7tsQwFPN9jpvpU8dwzH2CyE3qcu3SjqVhIhPFeEAVhFMYJxcknTiyR5L0SEgROUWRtojy5eNK2NQxLpFzR8z3LHDEclyGCkW4RsQeqCsPwVqR8AFtwev7i93/nDz7ziaW5KYYBmgRHg37xyA8zhEPQNIYEpeoEL8kgIkGCWzAsl/FxYW9zGyYvr8xNThXLlZwk8aKQkQQBjZNisRBi9NTsPMtLrm2BD0zMLuAki/gmS+EkkbAsf79v3eWwWUk6MVNhKZL2nOmJKp5ECEbEYfDcoysZNgiEBRIGRQErELeBOY7neVGkxdKRjHHx+Rc++5EPnZgsTovcbk81TMdxXBxLjh9/AuNlpd+F4GXoKpxNcKwgDKzdd0s5xnCCNBHQgmOZP5atarlwopplM/wHnj1blASt0zHD+GOvvDAjsXvt9fLy+3CCAEUD25AxWF6gWQ7cNZOtZhmn96MfXL58yQoSmiRYhjm2OOu4DoejH/vdP1R6XZCmWKl5rpOKQbNo4ruta+ABFIaCADTHg3P5nv9gtsBix/KZiYna1k7T0tUrm7sXzz0GwaW918zmcc3FxcljNMNlRFGWBCpxvGHT7m5GyrXAHHS7mh9j7zvz6PZe8zc/+xkO8YdDzXC969/9xuyR+ZASgWA2X4TzPlR6gd4edXfAT8DxY4rrD3XfC4Kx1z/gJEKOCnyHIVBLH/SVgetHttJSDEfVzNxk1etcN5ROt7ljat3AC2w3qJVESA3FHO+GWJbntQC5trra6fY//zefn19cqItkZWUJ3IbafosU6A62wFYmlX5HzpV0ZZXAMT+IZZ7pdgzTdHw/uC9u3Q7NYUTzjfUtpd9zvQDO63v73aGqq27QH5pTRYLxdo/XMysL5fbQc0L01RdPv/z8o6dOLMgsDaGCCOxup9PUbUHI9Dau5QXetozlxbnr693EdfrvfPF7//inVncH9hkpHbA+iNTRHDdGQVH3Rrt7QqXjB912s6NZAaQNJOl4CCYw5Vnhu5e2JVlYWqgtLdbKBYljiKV6DmaYtj8yvZbt7Q5HkP05QSRjd/fG9ZaiwfXLr7wslye4wJpdOnr89KNEZA7W3iS3/10d6jGKw4GyLRcPIAgmPwk0ryzOnp+rKMrg6IlTvutMZbl31q8/embesNxuZwARoT/QWJrWDUPM0PW52W6vN1AdiLFxFA90d3E6m2YLlDJUA/KhTGeoMLYCz7WR088e/9xf/tPjJ+e+/p0r1VrJ0IwETUALlhsqhtcd2j8pQBybquKWfuLxM0a/laUSBkcuXd22knh2djqXz6qGB5su1ou1aiWblXTDLpXy87OVgeZVCny1lBPFzPX3OrPTJZ6nsnmpWOFJkYBzG1ExhlFXr65ZXkAkUaGYg9gbIxhNIOBetp+Ayu8NxXdim6OL9SxDab2mrmsrE/VvrbY/cOGFr7351n++81UEjedmqj1FS6IoiCmajFs9fXNniCQp8LQtoIv5UUiT+NuXd4FUpQDRlLrw9HI+S2YYTMK0T7/2zJfeuNL2EcH1MRzMZ3EcK7O44jAIYjxYW5CMcrJ4aqoIqUZV+hkKo3ITH3vt17TO3pvfe/vJemW+Urn6XhMl8evramO9ZdqhollH5qpad1RfrNJB8uJjjxQZwrQdkqYAyezsaUiEf/v7a2EUIBhLYfFAHXFIcObk3NxMqaeMANY6ptM3fAyJVdN7sMtDojn96Mn2/u7ifB0ycTabPwmmHPS+8+3/kASukhVQkmIIDLKKIAnPvPDK9MxkfbJ45cqeGyVhEM4XJEAor7z0/MUnTuQIspjnF2RmMDJkgVtdH642mgKD5STOdALfD1k0lFlyZAWlSi4v0BmelaXMg40IELcyNUHJLIPGMk2ceuqZvcbljqICtsfRhKIZRVEB1jEMGVvU6saWKBUSXJ5aLgtYTCOeZRuG5fzzv/4bqCoN1rYNSJn3ooemanuWEbvRpiW/e32X88IjJGK4semGRYmGAw+H0bDMcjkHMcJ2/FtHEr/JFl4qZl944vTuzo7v+6PthjXSFFULXNf0AznDrnc03bDkghAR0vSRlbQKwVA/jBTHV0NcI8UemnH5kstkqeIELVexbI2kmd7eTm2mdGJ5skk+FDHy9hDZ7FiTfNhW9IEZZjkC8mZxek7VNQQB+bEwBLrJbW1BHFKam74yPWjtZtLyAEcp0u6rUVqaIgPdInH4EkGKEORcgmBBEIDybNsCXwyDAMdQcGED/CUMxrgbC3zPM/pc4Bcs59K7a7K0u96kF0+eufH2t2vVqh0iGzvXQg7wPjVQW2HoHRSSBIlFXnybLd8Ldd0h0IQGgJIWpgRGkLbrxwkKAVh3PUi6IIWi6AuLJd22aJrBCZymazhBAn5C0vI1Td7WSE/vjFQUvJWl1UE7dIoxyS8vlr70xldbG+8+drQ8sEqrG21B4vEogNQ+0BycQF3fj5EYRe92eRAQx3CISwxFAFsAPkgGfCMO4iSMUc10OAJyAKbq3uNPPjU7tyjIWXA4MDfNMjTLJzFC0nTgAchzaJouVielXMFzLFFgd1oKGjmjkQ05gGIFHsIxEu22VMe0EJISOTIrsJ4bAnFiXHrd5fJBmPhBBBAgwpnEt3CaBD79MPY8z3FDgMMTMg+rophc39zSh4OMIEJwKpSrQChfwjVlAKoCnjhBAsqmrgITrulMyiQYoSBXm12d5XM8LwECFUXuydOLq41dy7BQknQdNy1u4oggyDhKHCS4M24hGZY+Up+G0BJ4tml5HI039jrV+tJvfeqTy9NVACmq44sT9QsffQ3BSIbjAZwDHgTnM7UhUAQnDDxfysqZjJAtVUD3rcY7OY4GfGtHERZHhVrl7Lnzo+42TmCdrrrd0koFYaDaflpYxzjcxdEwjFwvus0WuJMksIs5EY8B8KPPXXyZY9mvvXVpJp/5+pe/rPU7uu3W85lLqw1FaW3daLS3rgpSYdBry9kcAGcOkKqQBXcC9J6ME21zYxXxdTBB/aFTZy9+fG9/D4uD3v5m5DnnH1t859o+qGdfRwK2TLIiFljjBkUCzuz70W0jgi0okgS39vyAICmEEX547Tu52vSHPvLqP7z+OrgRgSR9TWUo/MILF+Rcfmd7R+31CTfc+ME395odDvczuUqMEQhKTs7O4zRvjnQEcCuVTC/Mi7wwV5/e2NgKiZLlNH/U6JTLWWH5/adrFVsb/ujtd4ajPdCP74Mfx3f5VtobQtAMSw2GNp0Ef/vXfwVa/eiZlR9+5Qu2bUNCnS4IShQxKAKGazQaCwvz6mhECfzjT59/NpOxXc+17PZ+03BdgY0SEtCkgeKkZwe8nB0Oe5cuXT1y7Mj5l17Lirzthps3VgvV2ut/9/eW54L9qpV8FPnXN5QwuJuttJUDkhKAwzPGsC8wpCTww05TzBWCrZ7u+wtlzI1A02nbCvL/xsbG0aWlP/mjPzZGo2y5FrnWK5/4lWavf+zYYrFYhJDNCkLgmpodRgja3FjT9VGrN1q/sVYulxzbkfL5z/3Zn3thmFbVCIgqkjjueT2IhnexBQdnbrIEnjnotss82zQcGtFHqERxGCBWSPiWlzBgZCS5em0VfCfD80NNxTFidn4JwmdHU48eWei3mpVKxTBMOZ+HCQNzFFA8iqGxZ9IZwQnQTqcNYWCoqmAZP/AZhgX3SSvgILINFXDzA9Cp6RgOHMIo7FuODkk1RHoDjRgjHsvxdxTD8uOQofVhH7D32vXVbqsFmpByOVPrT0lou9nkBQEsDisgQ0JKGA2VGNaO1K2d/TBKcsVKhmVbe01tqFq2Q7FsFISubYNUKI4JADIw9AEwEDIlADMfTUrV4ihGNGMEwJ/0nZYb0gLLZJm5xUW5mM0QBkgWE7JpWDSJ2p3NR45OuUQewrzng1mCrY0dxzY331uv8Nj5X3p8SWZnc9lzDx29sbVLcILtOL1ul8tkWvv70TiuS3R0flkybWt7T73VpUTvbPRyDFWvyb/60tO+ZWckfmPzPYTl0QStz00NOgGcE5zHG/tgMavA2Ag/gXNyRuAbjQ0MJ+GQgq5FPnPusSNf+MrbSwV6rjbJseLcYv3Nr3xxEJDxoN1k85M1Gfc1h5u63tgqiYTrWZ+4eOqNN775vcuD/tACHiBb3wuawyg+vpSXxKIUhOub3VA12bIkSUTPREAxmq+t7TRVw5+pZHWssLG+ruxv7qxvRL69MD8zVy7MFyUSs3vK8Mba5pmTK8ePHms2rrSU4f7ufuI7cNi3u8rCsboRkFdWt/zAfeXFpzw/wiJte3fEULTjBkHaEruLrcPudKtnURlpoljctEcxjxWrVI7G/+UbDfCr3ghZbWybYAXVLFDa2TOzp5dnzp1eOvPw8kIVloiGaV26tg5hbKZWmJqa6qxebaytXbj4cr0+A7ZDCPq1D55v7bW3oaDwh0+dAMjPN9Y2XQ+Zq9H9oYpimOOEXhDeMuJhd/sgQAPELsjsqYdLEHAZIirVqq1uoJo+pAsoIuaK7Px8oZITojCJ/ARDIppiLzc2l+emvDAZmbYk8hIN1s3v7O1+660fvvrS8+re5lqzD+dDM20cCSvHazk60T1kbTe2zdHDs/m95nvKyHNsZL9r6oZ75+sCNBlHVAj1HEfDXYYmMhBTsBg0cXxlvhflMW90bLGmDzo0STe2OjnwRBwIKQxLR6EvioAAkIIkRxg52B66fdVOiKadXDhWiRNsaLmXt5sgORzUJ8+utNqtrmYRhAApqK+oXVWP4ghFCeDJsrw7onycgL5wCERkalZg0PFSqAfRbmD6N7Z7BK3mBLK9F/YVG4XnCUhCjIIgm8tDQF+clpyov9719/ojjhEkuaz71EgZfPjZswQStne3OprRtoNHTi4DbLp2o72z3x23az2GpqI0PjCu64ag//hB5euYMwB3RNpwSoDRhGUBzKVACG7mBIaC8AgSu/5sOQcZiSJQBAsTJEAxM0ADXfM8lMETtprNixKP4gRrhrZpQ3D6/m5/YnpCFpgbGzsD1UhdO073goQRjn08TPsiCfg8hKV7jHjY7AedgSkBZsRRfPBOBGhQFA4Rj6ZShcIUCFGmHRA4muWZGAMf89KOOomRGAWCZDgWzp1rhbViHqUJfWDv93XPcQgsMW0vAD5SL4YBCrv13iSGJcAtGPEmW/e8rAFWxtq6BVwP3xaht84GpPZD0qDIMdFUKGy8D5gEPkESuA7eFsVRSgOH9bA2PqSLPuiVVIIcdpb/GyHF+HMDaTmxAAAAAElFTkSuQmCC",
			/* sawmill */
			"7" : "data:image/png;base64,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",
			/* mill */
			"8" : "data:image/png;base64,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",
			/* hideout */
			"9" : "data:image/png;base64,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",
			/* stonemason */
			"10" : "data:image/png;base64,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",
			/* foundry */
			"11" : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR/mAAAACXBIWXMAAAsTAAALEwEAmpwYAAAU0klEQVR4Xu1515Mc13V359zTPXlmZ3Znc8DuYhEZQEICSVMkTZi2ipRdYrFksVx68Jsf/OR/wX75yk9+9AMlOpQtmoAYxWAABANAxMVi82ycnDrn9ukZEKRkq+xyfS9f1Xdnu7e7p/ve0+f+zu/8zh0ERVHk/+32/xv6v38SRR8eECjiBuHvvDUMw/97Zv1O2MFlGIdjKAlHJQKTMHwszv/LbjPojw67b/sOH5gUfmvZ/8h44ncZgT5oD/uNrKFwQmLIFE0IJDpM+TjBG55HUxSLYzxJWA8MeDAGdAdbGERXgjD4znfw+e5AD21CH1pG/CdTIgswLDqCfRDAaZAUuCSOzsQYJLRojPVCnyBRxSc01yERl0ZQHCXHY/x91YCHwiDyWvjwHTEECeAM/a03D8P+hj5wa/Cb3sIHt/atQPvHkTUMTJBAp2myxJNzSfZEQowT3tFCysf8bd1yEHQiIQZYhKdiXOQwel1TJwVuQ7Wgq35HAwsejAu7Qb8P9tFZOHBB/+Wx/wwmDNo3SEBpkkwz1JhMHeWxcxL27FDsaEqeTEge7tUcb6vT6RiuxJLFDBUg6KHucSiWwijLc09kUjzHDXMUjqHwh0FD4QAj8H4bnA8Giw4fOgF22LeAgQe/8WfURRAEsJ9LJ86PpttGZ62ljA/RqEMcaAiNhcMCv6fr86l41XfXqp0Cg2gh6vvIdCpJ0fRavRujKQTHw9DJMdIba3t+GD5wFQIY8P1o609rdP1bKEHrg6w/5w/jAkGj88Ekwim8kiywz5yYWanVDdPBMbzleaUYd3os1zGRru1jiHO30S2I9GxO2lfdYjrrOcF+T5tIx3Oy3NRt0g9pDOt5vhkikX9wdLCPvIPAp28rigxcNZjoYGDZIKygBQ/MQ781C8Msz0sQmOMHjx4bKkmCojqiwOuaW+l2T44VKqpiBmGepe43DYFiX5waa7o+FgLCkbV2dyQpjCTkhmUWeH7LsMEgHCdgH81nBDYMDmGDPVwc+AvMgQDtR99Da6LjAZ6i+yOz+k+cmpqSKC+07Jvl5mSSnc0Xa3ZI4MFhT2mY7tkhDqEZiuAKIvd1ve343uxQygoJHw0YDKt0VC5BDXPEfk+3UZwgIsvgg8EGO2gERuI42NT/oN9liUH8f5c6HhhPUyRJEizqPjaVSKUT7ZY2nMxf22+FZu/Pnpxcq5txhoOx7jftx8fTKMkYrj+eTZTbqh14R7MJDyEEyrdsa1PTHxlObPUchACbiKhTEmFYigAzUQLGBOsATp7vRaALvvXWbxFqdCs6sB4J4mkhUOhLd7cfnxkbHkpX1cZIuvjzm42e5b56Yv7T3cNz4/GtpqrozmReUkwnJzMcG/tq7yAjIkuZfMVUZwn86n4L5i4W46MxI+RQYJ1tWbbt4Tbi2I7fj7cIcRjmer7reUg4IJRv2RuHbcAf8HqLY7lYIlNK8DGBf+/62kw65tIiiRIpkbu6vqO4yEiCKev2S8fmym2jbQUplqh0ao+X0r7rX96trivW503D4wQHqIGkKBKBjeVojqMZlsMJCgzwYAsh9gEbkSds1wOkA5Ae4v7bnEhRBEPTY1O5kxl5fePw9UcXeihmWdZUJv7+zc35qUKg6Kptzw0lPtk4FDCc55i6bj41Gb+0Xd/oaFqA1nQbp2gY6PHjJxaGC4HaM21bx7C1ej3AASBot2e0mj3T1A3DtkzHcx2wwHFcw7J9H8xCIQp9OBpQ/yASRZEdncgGPpphyOVq77nHjt1c3RpLxG5uV89OZMVM+vL91Swv3DpszOdT6Sx7r1yuOf4nu607Te2w52wftAPfhU7//PWfLX91470LF68v31vd3ETU7omRkYh4YiPtToskKdsyXMeNCAyL+AnolaSp/pWIOMJBGxBEhHeaTA/FSuPFmZn88nZza6/+2tMny13LsaKJ/2Ll7vmFYZIgDhSt4WAXl/e7fMxj+U6tkeHJE6Nykg0cXZ2ZOUbx8bc/+MhiOIyLQS5XHG9zc+fZJ86s7O+goYV4ZoBQwBae60WpNgJ74EMLApKM8sEgbyKRXX1vuW7QbhqBh0sFBqjixfPny1/d6faaP3npbK1dB9BdO9Df36qVrbCsOSHNzU2PKj1tmA+PjGRoEtvRQk4QRmeWhoaGr3z5hSyJAscOp2K+F3Qs/9Sxow0b4hUx7cAwTdcNSZIFq3yg40hZgFVAO2TQTwOAOZqhXdfDBykTAjidFbEQ0zrBD5972iGxOIa8efnrG1Xli/3eRlPdrKkeBDcRMcrJpSPdTsfsdEQ51kXI7cO2IHC4H/zVX/6FF2L37i2rjUrP9CbmFn74g3P//Mt35PwQgZO6bhA4JM3Q82zXdXzfi+i0r1YIggbOADv6mSoCWWQWOJAXaJ6n4Oun5udmJseThdybH152abpRqZQkfC4voqGHGi0i0H2cP3f2kf39g53yvkfQcVmWBF613Ltbm9nAfvnsyeefffqF7z1+YnrM3938/KMPw3SWiYngJiTwYGJoEqcoSlM1yNGO5ZAUxCmfSCU5FmQbDh4zDAv4LDILrgDiKErMFWKu7y1OjuMcrRuaomio3pkpSKYbjhbznq07Pq5qynwx3e00Ol0Dp7laWwVq9FBcjMfvNe0v7m0uX7300Ye//vz6jZt7tTKenDl2utdqjZUyLOvA2CCNbEMjKB6oX4xzpfExy9AoIpQkiaKZAHFVzQS44QNyZVgGfEfhDMMJbOClMpmdvb1uT+k02xxDL8yNQarZaHmMKDUMmzLtpSPjh12b5TmQXEI8QTDiRKm4eOzEiafPb/fsMD/Z8EmIj8zw6EQBm50cVdQ2OCsMCQAWipJ+4MGwvIh02x1ZTqYzxUKx1G60VU21AX6eB/fh8AdhAcoXiCSTyX55f3NxYT4CHI7utcyF8aE7+0qrp3sIxmJhPplSJObrRndm8bjgdEiKQeMJP/CVjgaB5hha6DuW0jN11XUsimHq1bbj1FGbTsSztXrFCwwMXp4lIQWxbFqK0UPDM7dufLFb3gLiHRlLGNBMC+9TCOq5vmk6pmk4jpfM5VlP12yz2WhmGaxpI5AuepoFYYFS7NHpycVcdj4hDssMEbgIS9ggZhwE5A0AZXR2odduAGYrlSqkG5Jha+Vdo2Hy6fH9nW3X9ovjJ2rVJqQgHPOR0AsQu9ZYh3FTmRGlp+/v1hrNHmCLCIBk8dDzQW+ikK9UTWMZfN+rnZs/lfTcK51OIFG2GeKMOFdMTaQljggoHHVsV+22TMCCg3VN79S5F43dreWNLTozvL216fgIdA3Gqb1ezlPDXtDduA1JieSo9Xs3fIQyLdv1Q4r0IRg11TTNoN3aUrUOpM6+nh6UGOjgGHQE0BBCE2FhIvuLq+/vbKljsydllJRpJEVG1WAiIZR399Ic6odeW+nIPAXYzM+dHZua/7s333jl+Wc/X1/dP6ygOEkIsViIye29czPFf7yzg2AS1qw5sgxA1vQ2QQuNaoVhac93Iq4IQk2LJs/z/EFWxGCDywxDsxyXTEoT46OSXKjtJEh06PSxYwmW9M2OQGJB6IJS7ulap7JLYQJPyfWWStPZlsmljzzy7599NvLoUz//xRsneOeHk4knY/7zifDHRfx0Uf6HGzteLJ2eWVR9HEbSdQvYu9U4DAKYSc8G8em6luXoOmRRN/JxX0Sj0OQEB/k+xvNT46WZqcl0NtnuGDTuEZE0BB+Foe2jrsWLZKvSwGhKTGRW18qd9uGppeM7TaX02PMnl5b+9cJF2zQ+//V7Q3REOo2eUutq7QCXJDEWkyiGTWXznbufitkhXTEpTtSVDmh9oEPb9m0Xa7XbbhSCXthvWCQaSVIShKNHZkdLhUw2axk6R1pgE0hLnggZV0XglRzb1jpdVc/PHPNJwUWxP3ntp1XVbKsusPC7v/7oyMTo2e+fO//a68jkUiuW69ECLsfHx0ukbyuKEkZKBkfkgm+bHEO6lsYwRFwWi6PTrJAKIhkfVaRYX1VHCgIaSPKZUmGsOCQLPFA/hlgclxgqjEg4Wlu92tYRoObi6MjG2jYEKiqkrn117fjCdAhREqAr24dScbRXr5x67MzxY0t/8MzTs9OTn312BbqCGeF5QbNcGDMmy3u7OzyQkafhdKSel04+AbJCZOPZoRTgqdfrhd+KeQQnKQKezyTiuUwSkEbiKKCQpomDg71KrUPH4rjVEqUMjZv1pjZ1+lxCZNdWVn70o5cP9vZ2D9sShYHen5mZVjRIesZb774XYgTP0Jqmdro9gIsFwYVhEJLxZBLtVIUYa/uYIMZcD4lJqVwm3qq3SJwmaRTHAoqB5OhFNSZoQM8NJkfyRdEJMI4mCA7SruVAkMkxjkRJKnQMOwSzYApnH/n+ry5cOHb8aDoZ31jfuH7txsvnX3jz4gdTs0eAWURBzCQSF995p1k9yOULlYN9x3WlmAiEB0gHMI8gvaHJ8f1aV5KK1cP9w4MqglITE8OQLebnFwE2QBCdjgKhgFMkMVuM/968tFHRCqUSSwMFM4jv0ARuKQoZulaIHRyURQ5vmiF4oFatfu/cWXipL7++tXB8KVDVDIV+cnczlUqtrt7PZrMkRW6urbXbHS0Keh2Cv9Fuoa7zhBy4JE3wgtJugV7NpKUwsOcWlzqGzUKFfNBhBBmCNJKsuoqDHHPcgBCyZ2ZlxaVRDMCHCQyDh8GN23davcZ+pavF5yljx+eKna6mKZ3lmzdXVlYgkkeGcm99fPn1H/0RaysXL1/zMOzra9cqBwea0oO30+FezVQVRXK1Hy8OlVvqKz/706tXr3ECl06l4pI4Nz/vUInr129bjkcL0t7BoekhI6Olvc11HFiUidiBkeIJmTQRVmAorHzYAzWLighCkoKPHGwsIyhGcEmQWS+99Pvfe+Ix0OeGj1YOdu5u7a9sbE0Wcj95/ky3sqs0mw2QYpAZMdJpVcYE9A+nslNJYS9kfvDHL7/zzvtg6m7TKOXijz/xxNrapoVwrXpFkmVAFSgLQ9c5jt3ZXCWA4gM02Kk2fAR54WQBnCjlxxqdbS9sUligNnr1jp/LJtZ3KlOyCdrqVxcu9noqgaEgzChJgo5c0AKl8b9/672JVOzV01OiwIMk0kELFCe2m8oeyjzywov28s0rly4pqgqq1GdSN+6sCHF0YfH011uWnM5F4h7D0rm8aXlADBC5BESkAykApg5FVUK26vWOhWTj9pyYe/vj67LImpyXj/kfVHU+cTiSS05NTgE/Vju17MhQs14D/qvWqp9d+fjcc89kiyVIJe9ceKc0Pl44UmzsbD357Mza/fvXv7zkgYDudj1DE20bp83MeLFjk29fvELIuXajCdOKYHi7UQN5CHGGgFmR3gpCkSZLKQGMleafuXL1+vrtjRUOGy/ma+C3w0YpJU1OjhSKRcgNs0dmd/Z21pY3azu7th9wBHp0tNRp95bv3Lr62WUIJaBqjhxtHGw1qvvddu3O7eV2R3n00eP6SrNIoncCemG4iLmY4DJIDPV4CRwvxeOinLBMw3ZB9fVJFcyCoEhJwmiCNhDm1DMvGaZTqdYXhpOf3lg9e2R4p94tZLjNnYYgJw1Nazfrh/Uyx0iLoOi76t29rtesnB7Njc7MrW6UoyU7lpVEUVOVIEDK5d2u4ZEMl00nAcG7un/ikTNj+SwkumazLSdTZhA2m3VAQgeSj20cWcyQuLN86z7K0OTR4yXfCkZT4uPFzFduhhJTVz+8kMTNiaGkqluCIPjW4ee7QT4ZOzIzWizlYmL8oNIdn0xfuPDunY3e6FRqVKRfWliq9bpHzpz97Pqd1e0yxZCWae/sHbKiPDk2/MSTT4JIf/MX/3RscT5Gsz1NSw8PX7t8SdNMWpQtF5oToLaYxg/31PW7ZTSVFGfmhrAAmYvH0BChCHx5rwGpHGA7VcwEKPbc6cVffvJxyEhDk9OmooOo3treiHEZKqZsrHah5F+ayqYT8mFTdzX7zFRhIi3jUrKUz/yfN946fu7c+PS00tV/9fa/8VgwPVogCMpHcCDYrc0tPj/6xdXLQjybzmVu37qjdLqmbViOrSkmOjc/dP6Vx7pbjq5WXQ0DqYFHS08uRbJPLRTevVU+MZv+euWwoaoGEQdhnU7JqtKdGpuN5/wP3r1zZjibyyUDnMJZynHsioZCVqlVqkkaBP20IKVXbn7Bkt789BGzpxi4EFgaJcj1RhVU4q3bK1Iup9s9RTEnJlPbm22QpcvL9yEZojRNTk+PvPjKqVvXD3wL5CJutLtikiTtAEHcgCZKC/m1e618OiGCOsFY04VgbQUQuDg6NyJnSZFgeTcMdyt1OZ7wEN/SQK/2kjJFYJBCKNPsUTiDeJbreMCRjo/RHHd3ZWvxyeGPP11zA2x1eYei8ZmlQq1u1A9a7aYSQiSCim82u1c+ub9w5PT927fzQzlhJA/iHgGZDZEJ6cnlTy3JuE3ZugppnQiJZDbO4j7uI5gDSsxotTs6zjmm7REKGoRxksSoQAxtW1VWuv5wKmlZquM5MYpc3WsmedLSW5pr3L65Z6Nhp6c4vkcixM667tg6FhKDVTgcGorB1BTWVzekRFyIialMNrA8EDggoGNygsE5zKdrjTbqWxQWirxoQdrS9I5qlqutvXq33OhWoTLoagfNtmuZHu7LPHb7fqU0knt0TL54eSUMPXk8QQWBYXimbZVr3YOmWt5ptOvdeIJNpsSJiSUcw9rtLohBsCr6kCReKCWRELDOTEyMv/rqax999MGPX/vp3/7NX1NUAJoZQ0kw3VbacZDKJBl4fr3da3d7mh00Wh3LcaJqIQholh0vjcxODbtWR1X1iZTw1qX7pULusNGYWCyilssYVl3zDUevaU5PdwDXSIjICbbd0Iql0Vazqevaw585UFCnDEP6PkoQ2MlTpy2kzpDgtcLO1jokitQQ2agYQB9AeDxOuLbthF6j1jNtOPKMqD4AxODgWJ6DF6OW5hcO6/t6q22akblOv2ZwvYAhcDggSFxMCt0WJEZDlDnP7a+Pe4ELYfJfNpanRImBSRVE0PUEL7IUTTAsxfI0HEuSkErGeJaGDI0/XO/vC1w4hfsZloYhoR+Ro5MxLiXxCZHjaAr9pv/BIw9/v/lv238A2KPoDvlzpz8AAAAASUVORK5CYII=",
			/* town house */
			"13" : "data:image/png;base64,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",
			/* barracks */
			"14" : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR/mAAAACXBIWXMAAAsTAAALEwEAmpwYAAAUqklEQVR4Xu15WZAd91V+7/ved793dmmkmZE0kixZlux4T+IYE5ZKCgLGqRRJoKhAqqAoXnjIA0UV8Mb/gRceQsoECI6JHRdOHCeyZVu7bMmSZtHM3Nln7r707X3l9MiWQ8AFKXih6t9zZ6bv0r/f12f5znfORf7vH///QP+Xl0M/XDNJkv8tWLDoz7UYehcFeu8k/Y9hGKwSwyP9vbfez4cU/blAwMLo3oFhKJb+xXAcxeEPjpIEThA4ReLwOQDk+YHnhUEYxXGMIIA1ffHuUzj5eEt/YBfiv4kGTkgSS3GgGEOTDENhGACClcBWWILEBIYyFEXRZBxHgMR2vSRxktRCGEFgABpuIwhC2w0AMSCDZe+ZEH5/ykbpOf5fwuJ5GlZhGVLgmKwmZXRVUQsCg+gajyYoRqQrADwKbIWjNEXtIUDiMIJtgiiCrQAQnto1tSUBLkaQOL6LJIG34EK4W8D20z7GP9ae96InQQSWymtyMatxHJ2f+mJpbHZ5eR22S2KHwNItSRyjCZxnKZoiGIqAiwAbODyK9kyXgkj3DYII/qNw7NnkLra7rwCyn8aFw0v/Kaz0oyhKk4QgsAf2jeQyYhIRhcNfzRWnODqoVhcHHhPjGZxmJRYdLkkUSTM0JQk8y1AMQ6Cp87A4TtFEEPkxEn0QUwlghaX3vIXe9eA9fMjHwYKne6+kF0IMSQJ75PDU0888fWh2uos9LiiFwNngeYFihOGRcVnJEUzODATDQspZqpKXNU1kOUpXRIBI4RgYxA3CvUBP9lJkL0zvButHIQ4/P8sAOPqf+A4FF9zFJAnMUFHdPzn90qtv+5FOkzaBmO+89WPPx9vthjkYgPF1XRe1ipmUY0oHM2V4FN8DApY2TLdr2KbtwaZpqkJ8EQTYCI7Udui9HQHYz8DaO37KVBjEh8QzPMfKApfPqJyo0pxcXVqUM0Mih75/a54kxDh0SVrCsIjjOMdseyGB4tLAtPsuubBhjWYQgWEcx28bVr1t+EEI+aCIvCzxEIUEIANEkC53DZju/kGyox8e95z4QTBBuqmSoGuSropjBU1WMurU7w/aS/tnn7at1o33FyHeUAzBST4OTY6lIr9P8yW4PYaOccS2zO6U3pZ4jiAxmiFdP/LDiGPpYlaFR0aVeZ5PWQ4cQqSOggQlSEAJ4fURE32UiXcZEtgol1FKBSWjSOWMquWGuf2/A9cdmDp4/s2XN3Y9DCc5lkUwIg46HEPJkoBieJjQsBkaNndqnSl1Z2ayHCExCWmP4zRJ5VS5lNMqhWwxp2syn1F5VeU0FRIoTkkD7hCYObVZmrb3wHwAC0sphxRFbmQ0Q0rc6FipWCj5mWdJihop0a9+/5utLprJDsNt4QTtm5u8IEKYhiEQU0SSVOw3drbXBt3bp46OE2SEhCgYKQp8jiKA8GiS5riUjHkGgZsMA/AZqmoSS9M8UA5NwgNW8tLkiMBg92ILXI0xJFHOyiNZZWq0yHGlQH8WYiAj2a++8o8Dm4QcCkIPEtQxmwyvQJmJEZpmwFksRxPr64useR0VdJbEExwV8iiOM5ykQNgnUShrQuAnAy9ZC0+22pt5mc3lZAJPjS3Dr8iDlyFFXM93veADWCk54xhFkuWSNjRSKI5XHDzLlp+jyIBAe9vrt+8srdK0iKQupj27zYpFAouCwGfEMkAVBXFt9SZNdYaFuBvznBwCrPV1u2sAjUZRiHGCDL4yQrxN/6Ki6hcuXrpRNTsWls1KnIBDxogyC1kAhjItx3bcu66EjMVJEp8YL2R0ZaSSRclJdegLeR1fuvXGanX+zCeeunrlCk4SFC36npkvHQLvIElAEeAjS+CFuRs/Qp2qrmkynTQDCo1xtx+GIeI4dr1uDI9W8sXsVs1pYr9gW4amQRByvCAHEX1rubdZ8xzP4QVMEmnLSV04MCyomCksyBdJkqYPjpdyOsIdLO7/LBpsXLv0+szsGUUrQ9TdvHFBz5SjYECzuhdYkddhOT2OA03T78y/lacaROmgMHYwH9Q2+vGJkydWVlcxKAgEydDEs89+aXWrs9QaatXW8hmytvne0vKqZXugJ3Q9L6q5GC+0+1wQIqU8E4eB7wWO5wE+HKp+VpcLWSlhDh868cx7l19xXf+hx3/VMKwYoThWqG0vo4gPH0MJKfAMkSfiyFHV3NL82VwG1TCPk4Voa971w9HpI6sry7oCyYDDQ9Opza2t1147u7ay9tDDj26t315dq0P+Aa0yvG4O+p4bep7rOT3T49qmGsSMKgS2ZYH6gHIb0SSpF4+OTBy4cvHHldFD2UJlfn6u064rstzvmwrsitBBTARunZMKCSbCcePyi5i9KUDcMFz19jyaGS0ff7TV2kXjPpaAsiB4DmOlg5niaS0z/txXvnbh3Pe2dvrALBAwKEY59gDfSwosbuSK+1CcB/5CEmNiTB8pZUHAYZVK6VO/8kcdkwli8tSDjxSKpUNHZjW9qOr5/sAhiBioJUHpJIFbzCdBByr3yuJbBcETwZIH7pPIRJLFw9Mzi/NzrlnjGNZ3XZZDCHGcL3x+vY6ffvTXXn3pH5yAQ3EaTWKKkdDEo/CAEzOeXWekA14Q80zU2317Zj89sEIwdKrkWJY2HfyRJ55mOeBflqSFlZV1YLe1tU0ccWVV9q1ux/CACzg6YVn+1rs/yKjJMI+Ytk253X5A7pueXVheNBobIqsEXpJRWDl7tDL923Fkjg7zL73wvBtSJCUnkUNTSOC0SQhninPtNpQQyA4CdRdvvi6KfqmQ7/U7m5uteqOLR2FAoz2espaWlhQ1Y1u2bQ1c1xSkYhi6cZRwZNjqpxcrsnL98iu0s66PHZILhc7uLp4ZHh4f29jdrm+scLQAvK7KDKfNyiOfj4L+cIn81t/+VaZ4DAIZSXxRyTnGNsvLFMUGsCynRglOY87Sey+TmM1LKtBDp9VdXd0xbRcHJs2o4p//+Z/Rcf/cd//axuV8VuXFYruxViiN9/t9Cum0eh6Nu8t33tBJQxEFZXSc271pROzU0aPvXbvaWFuRRVVX4R2KUe8vzzwrcH5grf3Ld/6GESc8z0HQkCQZ22wzfAYjwJss0CRJJJLIry3/qKxASUhojkeRqN8zG80uaOtUy7MS/pOzb4yWc/uVJKKbjaX1usX6McuxWOiYMWUjUW917g1VRKXxGXz93ebCdV8vy2VibmHO7ncLuRLHMpqIU7mn8uOPcFTr8oU3ykMlhlNA8/uejyERlhjwlCD5KHRiv89LUoJg757/9uSoTtoWTTEgYX3XZnmiUOHWVvy0SoZxNDE+sm9sVFD0Z37pmS9/9StfeGpWj5f7tUWOY6EW3Ll9/pDqiQ//BhcNIMH14UlRzzXa7d3l5YyscwxdznFs+ZdHph5u7169dOH88NgBKBcUxSSRh+IkkAtOcCQl0gxLYZ6qZuPQqd54WUL6FsqVT38SB5VWKGGMyrO0JmkUSWD7DhRmZyfNgf3utasCx126cOn//eU3UJZ+4sGZqHFRppu72yu8iCsZGb36wnZ1dXRyGvX9m9ev1VfXMkqqQ4sZRhn7XGFo7PLbL1GMcvzECUEuxajA8hLF8DTFRggFRxQakVdnhWycRJsbF7NZVh8e3ze1z7x5DvgcNGOz1hwYkQx9Q1YkMJT68hf/hMRiz5Dmf2I0gpXTpcTeXmq265bjHZqaWFqpUgwtsdF2PR7aN7u8sStGnaDVgF0ZlhZZbPjoby0ubwxWNo6ffDCMgB/jndq2LLI4hiUo6doNQOnZHeApiiaDwLp9+btHDw3Fjhl2N+5c6CpDExlJvHrh4sx46cyDp//+he87UAaGRvkfnv3eT85fYpUsWZicnp4JYyAqNAojyN5Dh2eBlRmeBREkkkRr8X2zvXPyiWdIrQCaLp8vj5589uqNRT1XeeSxR0EXkaQEQS0KBPzlBXXQ2+R50TO3SDxU1SKBhxt3fjDC2zY/xE8cCRJsaOa4JAg3L10c1dnHP3H/8995OSE4XRHSdvfG9TdN/8L3fvgikSm79uDd5RZDixBSoIHu3FlE4QzD6sz+DIf96Zceo4G/Q8s2eqUMb8TFze3OqdOfKJQqV69c73Q7lu1YlgUWA5VB0wQv5l0458qMUHKdVqf1rkzF4NdKljFuXSyWykPl0sK1C/uL4uPHx2t3bgxC8jNH8vtnT+Hdpjc9PqGp8sDsHJ4+c/r0A5mJ6fWNrZn7Hjpy/CSU/c3d5qnjx3fqG+2trezEkXNvX9rt2gLtP3zq2JgO79YMw+B5Qc+NOkYLiqxt9QUpn0oUv9XpdhmhSFN0HA5uv/18lk+o4oSW9Kp1M3/gMKNlb75/jUTsx2cnXj6/uNkaPHNq/HaH2Fi6gfUN27D7VtuQQvbamy8+/81vdjqD+x48fvHW85vNnYETqbI8tzK/sLiSGYK9SzElgBh95rGHGALFYvIzT94fWyvX3vi23d9I5wFE6n3PNdqtbVktgIyARAfNXl34wb4sik6eyalcGMaT04eAD6rVFRJtYyzx+nyVUYlD+3IVme31l1WZTTWgBL2yJCocU8jqIwW221p+/dy/mqatF7dbNcYYuBs7t1G7k5Hks2dfe/LUgVPHDnBQ1YK4YVg4oz71mU/ne1e+9cI/o3EPBXXAwsY+TvBJ0G3WqnHors6/ktelihhzkbMwvzIxPt4LIttt+INtNJZBrKMJBCVHCNnlGrQn/JXrVfxuO1YZUbUxoddOexCB50eylYpeqNW996/fVPSS1bgzNTY5UiydmDmAJyGF427g9Txnx+w6TnD42Jnbb73y3Ne/cWCstLN0aWN9gZeyoMMLxfLi0jzTvcQVhsihSc3enjOI+x94cKNneVZr0KopcglKRhThIZYQFB4GIWSaafirUOEBFKjxjCYSDi4KiB0mtd4A5EdOkSaK5UIm17bR0/tzeU2icbTRaWiaYjr+4lo7JiIpg1NkfnR4pLVw4cZm1/Hsz37+14c0bufi39X9uNnqLd8+u6/EY6Lizl+qZITs/pNrmxsM0fNsM0GJEI1GymO9rpFgSWlUd217eXlnt94BgUpQFGDAtre6Ek3jTAKkjUZ+DNAjyDcXlD/LgpZBdhstksDLuczyRndtp/vAqcKAtHPa6ROzZzq9bgwKPEarF99sLVymilMsQ33q8ZPt2sbysiYJBGgeKjOcDE3Nzc3hiNXutjVdgzoD8mtlZ/XI0amcVHznymWo5wPTM00niROMYcjQj9td89bCLkJHNC55BukbUW2n5fpBfzBIKSzwt3dqAse+fnEFI4knHj6Iy1gQYXFEVtfXVE3vmeGR2eMcjY7mFUGQbMdTVEXRsyRwPIVJsjqkK8H2PNqoNje2RFFFUKJSHFE04cjUqKKIm7UNMe9kipggcUCTPuQzcDH8g0op6wyOpKZTZFxgyYymW45Vt6DSIG5vl+Xka3O1Jx+azsismbQbHdN0HSdcnJtfazQ7dHEqDu21WzdURSpMHtueu0wXJi2js17v2JaTSYwz4/xWs3dwtNC2PFZUFV6enTmyWl0OeR/4hcJY2wy6DYdmk07b8LwAB/OnQ5R0dMFWihWaTgSeIBO81W+xhWOl0r73blzf6KIgsT/5wLjAs0kSIyEodcX0O52Oa/Ra5qD+1BOfq1TKuKg1OwNJ1UD/slru8LGTb7xz/vjs7JOHc2cvLXI8U92uZcra2MiQIhH9QY1XcJGRNUWwbAtU8KA/WF1tDAa26wbY3iAH4TgqW8AbzS0LeqK+Q2Y9Tw4Pz8wenD7w9T/4w9/72ld8Tjx77no68kVxYG8NDcVAymmixhVEmfmLP/vjt869Mzy+/9SnP3trcSV33+OTB2fatfrvPvebF86d7QAtWvbWoIvy/IHhYSilLKSUrBSlwrBeCvoJi3Cu59q+4boumAog4TxPUmTKXqrA0wQ1MpTheExSyOpC1/NthgMFuf5PL5zvbS89duLA6mZNFVmaxJMgyPCcgPJUjAkhqstcr169dOnC2m61NNboNoNG3QAvv/jqq80GlPxWiHH3HR47MTtCIRhP03k9QzAMAXHsppMvkomcoLu00Oj3LAhoyDMctJDvRa4X4QQ+NqZ5doKhCZ7gLEYMOq1149rcwh270zi2b6hYyOY02UU4w0dlnrJdXwHxQiIoxdE0ryn60FCF592Nqtnuz6+v7GrlleWb6zJLjo2OHpkoK5ycIGKz2UdRD83bLbdtdpAoSUiK3631oIEYDAZA3WGYhhUex+AYZG86Hfd7LghWQNlvO2BAkaOLXAn4TOAoHqcGNuZ7e42dZXh+BFoIIpKgOTQO4nTcgXBY5JhBVhu2+hFNhEGfIXH04HBp38gwzzCKJPqeRXJxTKPtfmSZIVAozTDVla1Op7e0vLWz23G9dEZ+d5C0N5hLQx6VFM5yY7BcHEe1pmP7YRCAkONEgmQltFXrrK7tgv6JSbbdamkyPxhYFI5yPOQIJvEMyDJQ6TQaqpKUE8UoxCq5ksxzBBLTBOS7awysXi/kSDqJbaMeG8BRoUcI/pXLt1HCbXcsliEBVwpLVTnPCwkCojkd/WpZvtOxvDBsdoxu13TMHtyK7Xpr672LN6tz6zUyDjU5rqhiECKsrLt+aPf7OIqEXqrToHyEvk9h6YybZwgWi7o900JIPwo917+z1Xjxtau7rd52o79Tb29sNd57r7q2upPgkNWO60T+3igahDzR6zlgMIIApkgwHNnZ7rp22G7H6RSOxoM4INoDdreToMjWbieI4t1ed9SSurEpyVjkYihchlADKx3AE4SCoa2EDDyLAK5N6Ki2PugalhMNothTRLbTHog8s7RWNy2XpHDgdDAMhNJ/MurmOBIYFfzoeuFPfTWDwgmk591hf7GYNQ0DzIvC51lKhkjnKDhRVX5oTDCatsKqYxW1bzu9xN+uNVEPhzzse/ag4zVbJiwusLTEs6xMrqy1DcMG57gQ3ADoYw4U9hYFCuIJ0IAS+mAGnB6pMe99DgOESWrUdIieYoUDEQVak7kgTEYqSiErQgb1+s7mjhHGQbMNnvfBEvAimaqDGEoqZD5cBeuDiSF+kY8//g1eXc8drfQsegAAAABJRU5ErkJggg==",
			/* city guard house */
			"15" : "data:image/png;base64,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",
			/* training ground */
			"16" : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR/mAAAACXBIWXMAAAsTAAALEwEAmpwYAAAUGUlEQVR4Xs1ZaWxc13V++zZv3uwLyeHMUCRFUqQWWjS9yrJj2ZKczc3eNGgKGA3QAGnRFMiCtn+KFkWBogXSoj+KJv3RNgHiAE6cNE7jxIoVW5K17+RwEcXZOPubt+/v9Qy12VHcuAkK9HE4b5a7nHvud7/znTMIiiDo9oX831/vfRIsuP0C7v+fLlgBCtZh/+eegAbvfRYc+c1sQtHbj/dyQcP3uCkEjBgEg8dvcgXvAQUo+msv99fGPXp3qPfkP5qmC8ViKpN+t6OG3bfq++3+1YvGUBTHURS7dagR9M6o91t55LnnPvmZTz/7/iN/+Td//rd/99ePPnngj7/65bGdk7+Ire1N/J/cDs93XXl/Y/iEIOCbAD4Hi7Bty7bbbrd8Z5ed05Of+4MXrqytZDIZCnFRS114YJ6hfJQPr5fWXNu+N+ytuYPgXSB659UdZ75LY2h52ze3W/r+7R4Bertfdij7jW9+88UXv7W+doMObMRz+BD88RTNLDz17KsnTr789X/1XPc25LenDH7BOBS9Z8WdBmgAM4BT7jjgfqcGA3OC7ea3RxsYGtweZ3zH2Hd/8N3xHeOZoBOYIsfHGS7sOHZ8dNIyZMToQ+u3Y+t+Qr19NtG3uTR4Z5OJqb3zi88+c/TZoZHsvSW9rVFw+/leFwzDhrPZDz//4eyex+cXH/+tF75cWHx2x+yDE4uHNjtyT9TfQRBv99A2Ru7H9Tv9tn1/YPGpj3ziSOnKiQ997KN/9qWvwKi3rL/b9H4UtjudwAuuXb54ubQhpeITKHGjXNW6babzk7OnTtZqIuDSeztvvRti4Ku3gTe4a3EinYqmZs6dec3H6e/8y78VZj5M+K2li8cs09g+jIODeXc5OIb6/gBqm5s3NzbWIxH2+SPPwoenL5y9du3azPT0ufMXcBwzeu3Ac+8gEyHutwlF3/F6G1Uw7j3HPfLU712+cO7w4fzJU2/xPN2sVYrThz77hU+tXP3xhRPfQTEPxYJtTGEEgYHXbMszzQAn3FNvnuJ4GnEtluM8QCqOv3HiLVlVDMNGEZ1hMdsOBmvwgnsEAS/u3z4MR++AF70F4cxQcXrP00ND8Xw+tNXYajXbjstvbZy9eWN5fO6Ds/ufpwip3ayCyziW5HmsL7kIirMsxnLk5MR0t6/iONlsdcuVOvjJRRFFUoLBNKalajSDwyyOG2Bwe7dNxDCUwFGKQoGZbr2F6+GDH7m5dk2zBYHFOYZuVEVd63LRYYbPXDr5rfMnvj+z//Of+P1vxDML6TSlasjOndGIQOULXCpFMiwylh9+cGE3hviFkZGh3AiBYCP5UQ9FQyweFjDwk+8h4GPifwrj+GAngBdIcsCU8CKRGsWI+Nz+2Zsb7Z+f2Fxbqfo+FaIZiiT3P/J0uy2bhvTTl/8pmi7OzD8/vvPz9Rv/nIxV+yLfF10u5IdCmBAOA7TlvrSwf74qti++cXrHvn19SQGLcZ9BUduybN8NiPuDLsAB/gC8JHWLqwCzQN8Dv+59+AP16rqhihQ3rDpjNuKMz0w5PsML6c5WRYhl82NjMITt4EuXT4rdHfsP/FVt9dty65WhUQ8AHQqhPbHfbnV3Tk2A/6V2dzg3ovXbsGjL8HmeXL6mOg6AK8B/SeSGvSOQsEDCTodCOEliOEHgOB5L5cYmFidmHw8wIZbIupbie/gDDx3yA8533VA4ocltAoXTRNKcgBO07ZHrV37EhnIPP/MVPFjDUc3zZ0zNnpqYgNOw1a6LfZUgCNO0NdulQ15KkBrdgBFoFLsXqu8hDJzMcng4TID5YOHgwOCDZrPzz0mSYWodWaymM3HHpSamHztx7Ifl9atTs/s8z55beF+7IzMcZ2pdluMZls3m5xWD+9FL31jZeILmP8cwadAO3W43xPiw8YAQkiIA7pYfdEX0+qo2Nsels3goQuD3wxwnEIYhCBL3PMT3AIbgMDw7Wkxl56f3zLseEU0Va5srqqJOzMwFaMgypdLlY4qikkwECcxQrDBgaYwlcX8ASYKMxZOy2OgrCEqkarVefog+d2lps1wpb24BhRQLBUXsWdpNPmrxAiX1PFXxgSDuGcQwOM1gg13DscFbmqJpHCPAuGD34gu1an1kJL9VWR+fmV1dWTVtv1W9LMTSk9OTmq6G+GhnaxOsdE0NQ5RIPAGj4GTU0luKJDoe4dvtSJhdPv8DxU1jXr8wmo8nk5LYv7G62pPVALWgo+PgYndAcugduhoQAYBpgHQSxTE8GqNYcDSN6qo74Ahm+omjf9KoVz0fcy2535fT+b2N6kY8O+aodYIkRkanNjbKoih7toyTbOBJjqFR4RFBEBwH2dp4a8/+By8d+wfEl3WXnZ4/YinX+6qeSMQ1RTFQXJUqFN7yAtJxMEWywRpA9CBcEORA0wPVRmJkdohLpVmKQnTNQREf8KYolGlwY5Pvy05+pNeqOj7Rri1FEimajdU3N8LxEdzrgSIwAwhM+OZmSZP7lhMAqTIUSBjXsjoc66nlVw+97+CNunz8jdMPPP7JaETEUKB17PLqmqlV+XBPbCOWQyqSi3MhjGUHmOZDACY0neVGRigSlk+gpmHlC8zufYd3Th3NDu3eOTnlG83zb3wvEo+z4VHEV1UDk3vVVCqp6ZYi1zrtTr+zhVNMvjChyjJwO7Cx6/mW3s4Vxtprr6aSsYWDzy+f+wlLI1cvn4kNP41hMjilK6uuBdRl8BFWkXzbHMAZYziEJEAq4eMTIdtCVc3rdJxcLrVn/igffmJjTf7eS/9Zq26ul0oojj76yF6xcnF56dLY5LRleslMWjfB814onNZMZHbPnurNVVXc0rU+w4QcS/Jd3bFVV69L7aVPv/CHpbXVEKKyhAee2Fw7jbFzntOxEd/UJUdXcIro91xDtAHPqKUj8QT7zOFUMoURON3rConM/mxm5vRbZ86c+g9YLk0RYk9kKMo27UwspKTiM7uHXn7561xiyrFmPJ+cmJys1PooCBfXzY/N9ro9qdEkAJkMJ3a14uTsldf/sZgNr68sw6FDhJ1RV83vEf7rUlsUz2fSE+DngEwwVNsyAwah+q45iHcsS+SL3P6FWC6XSKYfAXRfPH/+0tkzhq5TFOG5fjwW43guk4wlo3w8Fl672ZrfVYhlsqd+fmp5rTo8dajTs3yE37V3YaW0lkylPNdoNgyS0BvNNo2pDGl0bv54/0OPe44Xx/s9xUB89+JaBwknhEQyxjM3Ko1wtkiJJ0I0Wq8a1Rq4jQJGgLDAHv3g4YmZz1y4WD1+7Gelq9dCHM2zJEng8EdRpG1o5ZtlxnEmcoXo+COnT5/mGdrSpeefPyI1ltaWzgwXC+WNGo4HkURxo3QhM5Rq1zdpOlwcy65e/K4QQuHM0vqmpupLN0UmnADi7sqG5yN9zSkUx7Zurhx5MMGQbrmm92UHB67iw9Ev/elf1BrYD7/3/WatDCc2KvCaqkQdX3d921N8wxiKcTMC/7tTi7ZLNDZvNp3goYPPLV05Z7tIu1l75pmD7crVTu1afnJfs1HhoiO8EHNQVmpf5miiWT75yNyoI7eurHdohskkBZ7Cai1JGBmPjIzyPFeuVHaEpHwMu3y9JxmWKNrAUOiR5w5evV66fP487FrgOplMKs75XyxOzxWnwySnk/5MPl0sZMdacocIW0I4ZhpXDMu2QCyhTHTYlOqLi/u7ne6Bx/YvXXhNlypCYrK+WdLl5tTs7svHv76rIKxWZJoNjY9EljZaLEWEaN9B2Fqj4WhdRm0Vw87UCCZqflf3FN2RJBtPZ+gHFiYrZRGcNLkjBwTWaZfNrcbDJlEazpGplC+2EFAcnnVxrVyMDrkDqvFePP5amGgyfNy0Cc8SyxubmaHshQuXQrg9lOGrV3+I4l40tUORNXHrjGygszuGKcJ980ql01MjLBUXmK4WcIg6k6bnCvxwkopl8QDUaQAz66riAHCQQ4eO7prdV6/Vw1FH729kYkkmRJgt2Y+nQKOsa53CMJkbiUzMjpxaLjUR6njpytHFHZ6D1urr9a2rmOdkcjlMb7y11g+jFv6xv0+OTXtrPw0QY23pLRzz8rmhvWPchVIjKbCNrhoN02Ge7kr2WDw8O5LKZ+PJlADrvlHrl1ZVlsm02j0sFokkk8Wr586a5oreq+6bHXp4PlSIUsEi++rpN145d7LVrVMM3pJ6st2Z2Z+cGNE/+6Fd48XhxancYxP5CB3JpeNSdfmlN1aawKaKLZz82uSuqWQ8euSpvR94Zh6Cm6YZqG+zDMGwTHZoGLb+RkOeKXITExBRhRDD2RrebTGoHvcdqlqrgNwjEinn9de/JvCF2ZkZxCeFTJdYVg4lDpzXzccObupIc8+e8eWSCPqqVjUpjJ2ZHmZcW+mYxCCQWikKpGa3qWGHnnw0SSgvHluTe1L7a18Y3Tlz4dx5UdJAQ6QSUcM0RFnPDsUffXiPrquZCPlAhCbDwJJoX9f0QB/LcrYdCLTQJkyScInSkqkqcnH8ummaiTRKNTOT1eDYcI/MZvsld2iRrDal60ticM0lcXR+H9uEzMkGVcGmBCbPsjSNnbxSBc1hN5df2jB0q4ESoceePuoPJAmIvD5JVDarzQxIpVBq8cChYj5rBjiO+GKlFJYaPovIsuM4hGQEINSicSHlin5A4hSNjIxiuXzQbHq4w3ebRKXTjA/H0LTbKotnS9XV61qvZ+EsCGfDcZ3kECnrAcUjPu7TNBWhmFw0RiJ+W9EcpP+JT0X2PKS9fvwKidup1Fi30293e8UijRLex377dyKxBDEgiEivsma0yojvEAGKI6QA4A8wx9VsiDi2ZpguxGhUU73NDTvExFWVrDUbXoYWlUZWSF3aWg2HsuM7DyDIRipNILgXS3Ery3qra0ua2ZNlSfYlOSBoYjhDx3libi6E0lp501I0+8r1amnlRjLrED6Zy6YYQfPkwHHsXn2jev1S2JKjDEH6DkPBysK2bXMERmKg4Uk2otW3dBzwZei+46KttuYj9uSUMD3H82mi21JnxrIgVW1VsW2PRmMoZXiuWynrCBo4pq8bfmGCp8Oki9u672K0j5Gu6Xh6l1/ZkHQtlkxxqEOPjdPNqsSh8XCAZNhgq91I+y4K/R078FACQ3zL9jBcdUAHwgui2e002qDYyIFlEGRwMkhnqEcej8fTSGAj7TpRqeqqZD/5YFGUbQCvJPm1im4YrqI4jhvQDIhxAjSq5XupHO6QekD6qmE1tkyfDHjWzSTJZISizdDU3sNXG1ghSbU1yVP1GGQrPB3l2BARUIGHY37ftums3bX7Lq73DbnRUAFbGCjjSBQUN7bwYFSIECTptTtap6+TGDWTzy1tVHqSznNsB9IAFDFN33UAtAREBMvCLQthOczoe5JmsXwANmnA/3rAcfTkyBDj8LZHNjaXKlsrExMz5fJqmuPiHIkHHkOjko8jPOtDeIoRom1ttXWEsGnOqlVhEwNk11xk975INE6DJ3DChE/4EI1hfqOp15o6Q5J9xeBopttXUAIxDRfCqBfgDMWjAdvtOvEkEk+6iuwG3kD0cTzJcNhW1aUxIhtP/fsrJyf2PElRkXqt8ezCUJhnHNL3eH61ripwHyY2VXXpZqcn6+EIabtiuaysr6g4hqFA9n3J5nhkaJhKJCjH8gCI7abTavpbDWfP9OiptbrY00A9M5wHl+8jBEGFWRa2Xtac1sC19uQEQ7OggNF+z1FlzHWcRNa7cLVTSLLZyUPnLi6PDnVp1hVxudRubEkdHXVj2WhHM90Av3ZNe+boxxE/JHWJlVJHUlQC5gA5iqBOKk3WKxpJcvE42mkaMMFIjn3h40dp31IN51qlofjqIC+yPJIkDd1Udcz2glSKG8kzDIN0toJElkwlMAKl6zW31SQadSUaohOj0Z/95NtRWo6msAooaeirGTiNcbRz4SraaDby4+TsfMF1kGg89+ablxBMMU0XvVUGZlh8Zo4fHaVArMLBRdGAD1OiSI6nxtpNUwGO1o1KrZNJg58dgoBw7nguNjYu5EZZlnM6bZelGdfFeEZQdQnF/NKKvLDIm4aXydLT8YXXz5Sb1gaEmfExvl42WRYVItTJ46pukHP7aILEHV3wAtVz9WbLWLqu3ssTTQvEI5pM0BRDRqOE66F90WvLiofawB1uYFOUp2oOzKSqvqW7giCM5GbPn62fOtG0DfTw4Y8uLa10RDnCJ3UNzY+bzS1X7Pk5YXy2sGt1Y7NWBthp7aa1WtIMNSr2FZpBcdwHTIR4zPUVUzM03eq0rU7LJm5VrXgez2YZjsXUvjcQMRR6Y830EUoQcMXUPcwNcUi34ugqYMYnKUKIRP7oi1+VWrWVa+sIgibTaGVjfbww6aH8yZPHBIF0XLowiS9dVc6Wril630bdsV22qhIba1a9FqxbdT6MPnYgyrA+NIZdg1jV2LI8323ULdcNCBRDolEqEgVe8E3dx1FE0TwgWNdFbcfsdcBKnKSCTsvSVBfWEIlREH2Tqcjp4yfW1y6TXO/97z/su/YrPz5x8OBsJg0b6hTz+5auL5c3VUW1ej3n8kUpGmcOHBRaTUTqBwRBOg54HaILFqC+qhi6gdD0IDi2W7ZpBgOzgA4U2ZElu1pBwWd8xCNxX5EHZm2XvZ1guw5g2y7HEeDXXtcmCeyJg+M3Vs5KViNXAGzWHE/jhOCnr21IUs9xgrPnLoXDYd3AgHiht2kisuSurpiVTccCpWfCCYMxkUrZALVoWz5EEeAXoCcwyPeCwQZCNEcA4X6A4RgJW3qrau0jvn+r8ny3eDm4BYNr8BqeKBraQwdoiUCwhg89L/BgXB/41ofGXIhyHA/ekiSG4TDmgIotC8YN4C2M7jhghw/bBR19ePj36pH/DeWqBVwxKdkLAAAAAElFTkSuQmCC",
			/* stable */
			"17" : "data:image/png;base64,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",
			/* workshop */
			"18" : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR/mAAAACXBIWXMAAAsTAAALEwEAmpwYAAAULElEQVR4XpVZaZBc11V++96v9332VRqNNNqtEVJsHCtybIgdijgxlQBOUiypAqogRfEDwg/4QRVF8StFKi5MCJCKkzirI2M7tkkkW5IlWbJkLbNvPb3v/faV8/rN9IyshCru6/f69n13Ofcs3znnNgoF+T+L38F1Xah0v3uND/bcqULPXgWGPFBcfw7XK14v//aboIKjXvlVy6C718MwFKp+2dXH/+wiy19mq+sWaff37xG83QLXLtp3lgGafylBvfZe4/30ow/ywK905+xxwW/befh88vv4o6DS69XjFvor+OR26zstPs/80ltw1/APV7Zl8qC04ca2+923W19j8AeEslO2l0QxDPtQ84Pi8zVhq4I8+Ao+9zHe1wifuN4+d+Z5QI161PQk0ltgh+c7IvGX74ngPnVGfhXP/DX8gXDBHO4unYEHvj0S2658mG0Y7vHKV4XepNCyrdf36YQvHX9cb4M95u0qbq/n7uV6NOAPCA7t8W63kW4N2hEcEOrzD93pcL+Z9fYFv7YI2BEr3L1ldinutiw9snqqs9uq/aoPCjiOPyBib6XuRP6LHfDY0UOfGm9+6NZr7cnRG7Eb4Hq0bpHVnQvbRiZ3N0d7etazLv/XNh/RHu3bMyK77AOI8Vv8Tn6v3UzzgctfEmo7N3Y/D/zltuGqJ46eHvurY54Ejx4eAbWD5UgCT6Wjnzh7vKuHON6lq/tAsO2NYFDv9t7mCFR8HYePX/Hu3roE3D0E9x1BDwy3gRHrCgMm2ILkyYHwJx/bT7Lhk3tiCErEkv3hgP3661fPzg5TDOu4NvRzEMRxEcO0W4qztLSuqNDgEYs4PlLseBx32/ygBxSvn0+Wv71dZozdj/C+oDD/J/QtVeU3f3778MHhK5fmQsnYUZp0DUbuyIZuO7SEITZLojiJcxRuONjo+JBRLy0ahgPjHcT1ocpj0o4gulePeQ50IXqI5y/cIw4qjuNvy3/rFxSKjRNVh+101Egy6jCULLUdim6Y+GrNJggHR70LRuFAoG186qG9RLBANcq27cCFOSjQ5zpQ77Jp+9Fjg1/ZbTa+EWFdoPLBHYEqSVI0TTM0zXqFgZvneRwnZ08c+qsvnj45HoX5gzz0gQ704ODIvv37Q8FgJBxKZ/pDoYgst0bGRnACY1iKYxkaLoYhKYrw1HArUNhNhCdHx92xG19PHceBNzgMAqvuajDUSZKE6ViWEgQhKIrBoPj0E6cefvhwW5bfn69gJEo5GkxJUVS73QDSU6m0wIuWCY343TursqpRsLfu7uLpyad+588xJsbyYd9nwyo+NuwyboToxRE+7UAB2NK+fftyG7lms4kTBMPQQC5B4ALPpzMZWZIoinzkcL8QwC/eWJwaDkiWYeqqa5ij2TBCBKuVEkiBpEgMp3yQUFXFM1AcczHikd/44urS7c994U9+9KNz8SHeVJvl9esgU8M0QK7OtvYRPWSHuWB5gWe+8pW/ef6Fb376M8++8srLiqLBJhHXmT154swTH+cE/vKlS3PXr9fzc9cL728WlbX1+uSQWLYQgSYCSnFRVhGaBlIsywS1tEwLRTkxGCKIIrA9Pf5oPreU7h+7u3jz6d/6xEsvvhiK9Y3uP7t29w0QjmGaqmoBDfh28cgiCAJqmVT86Ezfx86clTS5Vqs888ynGpXS5577PUtVf/z97zRyyywnpvsy9y5dcHWp0XBB5PEgiVOBoYHIwtyqQfAYxRI4TEYBo7o6QBiGbJjO6PRHWSE6ODKhaVoilllYmDs0M74wP0+ywWh6j6XkYXnDMGzb6krMwz/UtzJQDvjKplIoIr187qedWr3crBTzhXffvtgfEx97ZDYUFDZWlvcfn0X4ZO7O++VaDdT/zp11kXYJmrp2r4S5pmJhIZFFEQMEAlpomEogwDOB4YmZhzTdrpUL2f7hZq2cyfSvbxYOHpiYu3uXZIRgfNxWirZlqJpOAVldJsEHozxTYgIB4cyZ04Wq3Ki3NVVtt6VyuTE1OXT61DHYOhj5YF9yde6uamKTH/1kZ/lGMEzmypKqaqC4a6u1w9Nx2EokNQiWFhBgtyrHBxkhOvvoo6qK4DjN8QGCJAPBSLVWz2aG8uXqnvH+cjFP0MFAfMxV8poKiqPjviwJKDj28ccf/+MvfemD994dHU68e/NyrdbcNzH62U9/YnrfBFg1mCEvcM22xNBgknQgkswefXTzxts35ssj/ZFgiE9kxMJ6Z3Qo2LKDp07Nys1WSAixDOyVcBCGD9ACz6pSlSCppfk77dqmZiI8yyq2OTY2dOfmdS4QF6JjprTZarUIH9tc18OER09NNWqVjo6+8cr52akDyUdS9aYUi0WjsQi4hvxmPplOJZKJcql06drdXLG178D+63nnkalIJBuZn89nUtFTp0drtfK71xZPfeWvxYB4+93z8bSI0eJPv/cCFhh66rPPMXy0VS8eO/nID1/892MnH8+XKnbbvvKLN83mXMsoEeJAqP9oo9XGfWgguuiGmHI8Jj797OdkWY6ExHBYFD1J4D7AxGOR8+evqCZCcKGW3L5y5eL66nJtc2Usju09sGffocO/NjtVLRdfemsZxagzZ5+Ip7Ory0vApY2VlXhUCAt0MBpLpNIIhudzBV6MKWqLZ/BScVNonO9LgX62MaSFVz/YqMrEdtgJiEUQfObihYs0pu079vClN34GQgPJuaala0al3hSCKYQJcLz4/L9+zTEtVdY31vKdYrUQTUtXF2z73vpmvdQ0wjxl87EX//OFxbm5VDJM1cXJvdM3rl745FMfO/f6hYMPC9FkiiAFuimDu9hcXa1f/8bUeIp0VIG1y43ysklaltUNP7ohwm8+/vA//cPfjQz35avGhXPfe/a5z99ZLLTrrbZi3lwoIHjgwsVf/PerP/7hS98FWKxU6slMotNWhpP8SkmmSWKwP723LzCcEvMSibn2rZvvi5Fgu9memp5+67Vz2b6s46Ltduu7L3zVqK8zjJZOhVDU/OCd/xocSCOqfGtVui0FzNgYxXPAKRwKOAXwUU+ePW1J7XyhEAqGNZdeuPHm5METGBWsVEtLa0s33ru2urLC0dzK6kYqmw6FQslMyrLskb2H9+6bJvj4+wuFi3P1kuxmsrHjR48WCwXLUsA1h8PB9MBYo1bqy2SWN3LvXb+3fO9WpVJI9SVf+/Y3IuZ63SIKJhuKp4aH+nRdbTY71WrLQy2WYYJi4PjMnrl7y3/6l3/72is/CDC4TUURNX/+0uWVlaVKqehYjiAGMAKLJ1ORRLjdbDUbzUwq9elnP1OuNa5euSpp+sz0FCdQLIUvL60xLBkOhlMRYSAiiAxy7fqdqf0HGYqplMq66Tx2cvrShcs4uCWMTafT4WAADK9ULtuGBfAAduYFzSzH9KVTv//cH4JEX331O+22fO2dK8ePDLGh/vmFpXK+RPNMqVQmXGx8au9mfiMUCNquE4tHVufnL7/zzsL8vXAsyAXYTDozf++mIMYTIXGiPzU9nMgmEwxFO7YdTyRXcleu3ZrvNFqjg9nPPPM0irqWqRMkqsoKAmaHoQAHmiwfmJ5odRTCD2UePX0iEA688qMX0dJmdvogCR5KoyxjEdBodUl314pHktSG5aytrSWiIUEUFhcWbNM2VR3hsJlDezZym/m1OubW9oxMxEJigCcR2yYwjMQxeLI0x1IahWXwDB2ZHkv1j+Y21nmeWF5dFUVB03UXARKN/mymSuDFzaKmal5oQFO4wOPffP5r6eL8E0nFqpd02y2vzw/uPRGNJgmtdWREyCRYgeMODA/90e8+VS/XaYYF59WRlVarcffOLVEIHT84eXTsyIHh/oFEjCVgStK2wSt4oAiWhRB0OBjNJBOWi2WG96AYQRFcUAyCO6dIoj+V8IKNdiHudlC5RTiew0bSyfCefZOKY4RD9MCRSbBLHnWHpg7eu34pt76YSmeBwwJPAsStL6//41e/tZHP10rVVk3KpIOzR/dPZoeOjQ5NDQyIgoBQrO3Y4aDAMDSOIoMjfEeSLNNGTR1DXYdgWw3p7QsvpzJZ23IHUsmxvvhknEBb6zODgtSRyjXZMVXDtIh0hh3IIIYq7x0ZdRnnZy3UHiBKhavFzYU9h08ks8NQnv/7v9A8ZcQs3ZKwDuGoM6P96WgYzLFSKTOhoG1aju2wiX4tt5JK0p2WCc4KVOcHP36DQIRjMzO6bbfqDYDHYCCAYNpL3/8mgkYKueXTM1lHCF+4lF9bK3hBlhdnYw4AhKY6xyCBMZsDI2O3ip33795anFsJBCK5zWoyjIEvOvfmxVKxNn74kBhP37x1b2YsMTYYDwWiNE7IqgLK4SCI6bggK9ySDh6Ovv7GuwwNvMUty0mIrmq7pUrLxTxmQ59oJlRs1iEOWF5b/MhDk5aDZbLxpdXVtmpCH91wUQRfrki4KAKSkxStX/jFDcXU4tHksUOzAk8HGSqX3wxHk3eX1mLpaBm66p1TRybSsTDpsjTgL06SHAfq6YD62GYmgZtO55//5TVWiI8OpC1GaNZrG0vzTz45+5Nz/9NulDhOYDm205Rd3QkHhIHM0FA2IHLU+Xfu2LoVEBgUccCKapojGS6eSITG9yZbkimGsyce+nXENhncCDAEzxIRUZR1nRVrlEuNpEPhkEBQFDDYAoNm2HqnY3hGhDA0su/E8Z9crb78yuXTx6f70zEgEzEtliaW11ZMpfPbn33qhRd/HiI6KkgIp0maBHTACLy8WatIRbjrhto3xWooSYN2onilpnq4lUgM8mzk5EeevPjOy66tYQiBWAbppcB2NIbJNVIIMDwFUyGaC9rvyrKGWrasKPBjMMvRifH/eOmte9cupTPxwxOJgf5oLIyzlKGr9VRf4oNbS41G6+rt1SNT/Vdv5/kQL0QTzU7FNCXWyzmiLoGPT4zZGouhrGlImzm13dEA5PFQkI2EI6beCQYiBAm2q8uSBDsyTENVTFHkUDB0DAVZYbYFABiPco1qfmQgPNQX/OFPLi7kldzayh88c2J8MIjYer5Ue+3nt+4s1e4u11pN6fRHDq6vbQAMajZKOpZikymR4BlW5EOmaWqmzrFcUzGanVy92ilX9EZTU1XDwy3wPeEIpWl1iuENAzENjKQYE1EQ16FwpNLMG5phmyiNskAzT1Fzc2s3ri2s3J0r1jr5pnt6b2o4E731wRIj8D9944MjB4eLDZnnsEPTWTAIU+qYplFrmYiqhFi3Wm2Cz5YMGayE5sMgU0O1Uc1G9LCLkHyAxHDUdlyc5/g/+/KXNaV99MRH33r11Uw2Zeq6hTqBcKZeLREkYWgO+AYCIy3bBoeg6NbkYGB0T19mZOTbL11MpeJ9sehAMuY6yMx04u1ra9kQTTH0Uq7K8RR43Fqx2pD1kcNnW3RsqeYeyqK5isRzMVW12x1FNxAQhGVbkHIWStL6Rqsja7pho5lM5guff/LmezcHhzOOzRKgbAQgoqY26uB0MUBhWsAtw8ERlHARzNQtq1PvqFU9XzPGxmBQjCRIwAfVsFlcquLJ3Nr6WAKzcGJm70CQpwvl+te/e3NifKizOb9SM2DV4b7E6GBckW2cxKNxMpdrIyi3spbryFJLkpotxQT4DYe5Mx8bpUhGbmLpbCqeGrDNtlRZ1wEidQtggPEcARHKZNv5Ing4miBpikIRwrF1lMBJRiiWSnGRMwxr4tTT3/q3r7cUkL5L63WAIpZnbBTXTIwRwla9qBLMQF9oco+4vl6emDqzdPuyZVONZtkwsLZkdxS1WCzbtg0ojzI09dBsH0UQEJchiGjrNkuZIF6BwGXdYFnc1iya5xE23Kqtow4ZYIRu6gue1AECxXDCJumVpeU4T1zZsJjW8kZFkWwkJOIuiXKwAxIXWNrGURw3LEMjUE4IsJWSyrCkbRpiON3puIuLCxQb6O9PrqzcXFnpaKBEoRAbj4eOn+y3dbBXOxgcMFqVgezo6sIcgCaOYGw82WmVAOksC6NpE/RAlREHAzAl0umU6uCEtVasSgwWWCkBVKOI2wnyjBgVTENjWCRfUASG9s5+HJdibEUzDAUF/OEFtFzSTj92FgKkG9cuX774XrHcBh/mHxPhBIHxAklidjxJgktiWF1RMRNl2606gtkmYmpKw3Y1SVLaUsdAtYX1Rq2tRVOoSxmNZtPVNVunMNA7DItF8b4EgCjBC0FDA49k6SZlqxrLkzq4FccyDIdlEcfBZdkolxTDMNdW5xbmbyBuXQyCbbm6ifA86IOBm6Zjmm4mI0pt1bFxgNlGU2o165xgELzSViRZg9n0ZtsEMyyWZRANL9IkxTUqbc2QNdOWVcdCTcUAD+nFKbwYBcNyXExqKy6wzwXMsnTJcBCuUe9wTKjVdBLJoZXVNQd1mk29XtNzOcm2nXpDn9w7IbVBOTUP5cGrIAgmhsDrY6Wi5Lg2zQCcOyA1y0BhAdMk602z2gASgUa7lG+5COs4ZqOueokT5toWaZhYKjNsGLVysd3pOJaJgQdvdyzwT1JTGZycAv0TAtGRfYfazZVms1AsQsYOgGiZFhS31tAM0y4USqqqb51KUyQ5MBAigPkhlESJRIoDTWcoUEmn1TJxAgERYGiwWCpk0szGmlKrq8BjwCSaJqNRmuNox6RJgogluGazBhVVoYFJoCiq4h0hKZLiOrZq6LAkQCVotGmDCrkMyx04dPDG1auw2W7D/X9zANCzLJVKBcDI6zWV44hQiItEOBz33gdEGjbUbOjLS3XXG+2oqoXj3pZgJzRFgLFRJEERZPeQBYdtAL7BVNAV9gMKBBzWTZgDbN9TZ2f7EJdl6On9Yxzfvn6t1GobyK6y6+8Dz+u5/ll41w4oTYGpvEmQ7uU4vRPO3v9NW/9S4f7BpteIOojXwfGKNwSgeet09P9T/hd5AIA7FOHWyQAAAABJRU5ErkJggg==",
			/* shipyard */
			"19" : "data:image/png;base64,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",
			/* warehouse */
			"20" : "data:image/png;base64,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",
			/* castle */
			"21" : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR/mAAAACXBIWXMAAAsTAAALEwEAmpwYAAATDUlEQVR4Xu14aXRcd3n+3dfZ7uyaGWkkjbVYq2Vb3tcYcIJDYgezGhyTQllCSUOAhqScQCmcFg5by+GUtvwPBPibJMR1TzYnsZ3ExNiWHVu2JcuSJY2kmdGsmuXOzF3mbn3lnNNyUviQlBz6offDfJhz7+/3Ls/7vM/7In+K5/8eDMP+d1mzarDvUx8/9ImPHaJp8o917P/URZ/P+6X7H7BRiKnW3C4X8qd/UHRocHD3O3Z+7ctfvH3n2oPvfU80Evr8vZ/55te+QtP0n8wqj8fzzz/8wUfuuvXh++/94O1b33/bju/87Vce/NzHD+zd43G7Hnn4wVt3v+MtAw5/c2/j+I//8btj49fXrF79d199cOTsuVwuNT07TVBIa6tX16SqWEcw/GMH784vLiAWItalvXfclssVdENnaLqhaW8LtiiK2rRx3b2f/LMPv2/v0SNHFlPxZLZA0Ugo4F7Z0dXf1b52qKuvpzmZuOEP+D1u4d5PHNyydvXw6v6PHTxw555b3y7IO+yOwlLxwsWLTz7+y7okjk3NhAJcW0uwvbVFkhWadbAcFwhE1q/uDvrYUMAh12vZbDbo862Ihvp6um08/7aYJbiFxVTCQlBN065MTHXHPE67LdbazHE2X8B/Y3qapDmnnTZM1C0IQwPdw2v6LEtz2FiP4JqavO52Od4Ws3Ac03W9Xq9Nzyd8HrKhaoDpTL4UDAZRw1jR0VUt58WabOhqoVgyLFRXpR3bNu7Yvo5hOQdYx1Aoiv7xIW+32TZuGE7Mz8VisT233t43uGHTpls87sCrrx5HUNyydBSj7DbWQjCe54BCGroGV8zM5XRdTSQTieTiUkm0LOuPHK1EMtnWGj108MCHP/QBVdWVuljIp2fi84I3tpDKjE9MFQpLFO+LRrsikZgsS7paT6RyPo/jwrlzY+MTSsN8u3rU9/7+b771yANHf/Gjbz3yhW9/7cE9u7b98NtfvXT2xPaNg/v3bLzvnnefeO7J733zoe9/4wsP3Xf3qeePfvbgvvs/dXCor3v7hlUDfV0kSf4OH6N/KKfEmzXr8BNHDr7/zkAg8NSzxyqlclGsTMVTmnbi0MFDuVzu8GOHb9ldXUzcwFG0IMrPP/f0Yr6YzEw1BYXZREYUZYAmQRAMwyDIcipNw9R03TAM0zTfOrbgMS1EU9X/94vHE8lc0MN5m7sZipfFfCQUeOGF5zjO7nLZNKVKkvhcKnt9cqZcrTtd/EIyRxEkiuMcMIjfd8vObbe+65ZarT7Q3wstoVAowslg2Vtv1VqjcfeB/Qfe+25DU35zYTqfSc/PjCuqwrLsvn37Pv2JuzHEKolKvlCGlmAiKIJZhUK9LdJEELjX69uxa1ck7KlkZ0d/++LK9uC7dw5/+tD7Bwd6IX7A1W/dLIahMRRaTURumLzdpqpaqabnyo2Z2blwOASH53Lp5XNJptHQlsoVwe5rbw3XZVXTjYYij/72pXIul83mJbWRTs1fHr14Y+r6PQf2f/qTH3dBnG02qIm3gq0VbW1jk/Eb16/Z7I7WttZSqWK329LZ4isjY8+f+E0kHKjXq6IoupzOdKbYFomqWkOgXDaWhlLdvGvjmePPWijR1RYQXO7Ojg6705NOZ3Lp+W0btz397LFMRgf6kCTpTWBLcDqGVw+8b9+d79i2zuW0P3/8N6FQaOvWzYLgEcVKuVTpXNG2a9um0+cuVsSaAqEqiaqqdnfGxsbHCYoqVip6o9FQJaeN9gjOluYWCGkk0irJUkfXwK+ffCKeSEHsjZsP9gekFArMecftez6w/67mSFgQXOFw0+c++6lHHvrSC8eePXHylWx2EV4D2vzl/3/s+vWxNasHN27e4PMK7e3R9mhTpMnb3taEoWikyX/6zPloJIyglq7p9WLe7w8Mrd3Q0TU0M5fiba5UOsNQbCQS7uzu1zQD6AOSCKDEfq9M+Px998JNseagKVe3bd7w0Oc/99Uvf7Emit/4+tdr1WpbRwdF8yiGAU4HBwdRBJ+bS45eGjVNnaNw09ABIjRFARckktme7o6GZohiVZZk8LahaCG/v1ZXevuHtm2/pW9wzXQ8cfLlV1488RwYhN60iYDnv2vzB+77i1xqPuR1Xrx43u1kB9q7VUlcKBecLldPT+/Zs2ePPnVsoCcG31I0DaegluEP+Jwu5/T0zM9+fnj6xixJMwSJW4bl4DkwyFwGjGkYuiI3IPATU7MuG9fdMfyrxw6fv3gZp23jM3MkAXBCcbAMReHMN2IrEPB/5s/v+fmjj+K4sbKjCTQxiBYIbTIxY+mW0yMk5uYDwVChUJidT0HptLW1BoJhUDsQm1h75CMf2n/l2jXB5XQJ9oVklsBwELGKomRzOdTUNU2HUiAoorcrFo/PAFFNz6UIDKlWxHS2BFYhlgXs+nsqcaAfPmnr7G7nSXNo1TDD2mpyQ2+o2zZtGp+a++25EXCrVqvQFK4oso2zG7qWTicjkRYI/8LczNxsvFqtUSRBvO4+ijS0RqVSafIF5uemaYbN5gq5YpHCMYoigOqqVUmqSQRlcTZGkgz44PWMvTFaPSs7k/PxSHO0r2/VqVMna9VKvSZCmlSDWLt+48iF8/lcvi4DeTKyitQkOZFMoQgajbZA+yBxxCM4ro5dg5SZprVUqEBNsQxtc9iWlgqSqkebI16v5/bb3ul0OHGwxUKLpTyIWJQEpU2rynKyQclBHt8YrXK57Pev2b59u9MpXLh4IVNUtuzcU6vVXhsZeen0yFI2XS1XEaXucNBACoOD/aD+Egupf3/qGIGjW9YNtLaEGY4xNYPmadM04HpN18RqxURRKC6cJHiOhfYF4YCG43DyjYZBkbQoVXASIkyAN4Cr38Py49cmoy3N8Xj8B9//djZTGBwYPHP27L/85CfxTHEpn9ZNK1coGpbF2m0AT6lezaQzPE/t3Lm5paWF5/nFzNJSvoRiBGTHNBBNUyzLIEgShguoesAWSVFSXWJoQhAcYAdNww9CU5wkacAA+M0HBR9+d6qB1LAs+a8//SlD07l8fv1QT3JukqHxYqmYWZgsgV4oVsARjqYI1ISbapKSSS9yNON1C5pUgfCcOnUK1On+fXvvuv0OUVFABkI/BvzYwRCChMyK1RoEq6U5XC6kSyWRoVl4S5YkxGqAOoS3KKgvsOt1g+w2ri3qF1w2kiE2rNtCmfjzx18MuHkMJ1b29v3yV0eAUjh+2bmrVxdCIY8/IMTny21tLTt37gCbEvMz8/G5UFMA0u1w2L0ej1iTdBOZmJiILyTcNh5Ex0wi3dvX+w/f+caxF44//dQzFUCoXCMYnqVpj4evyKW6rCGGXWvosixDKjDBbfP5HPs/POj22eamS12xFVJdFlx8Nl+ANpLOpOt1CV4AF8Rqo6+3t1Qu46guKRaUEqRpy4a1L504nlxMsSy+Zqivv6dTEOxgH46gf3n/Z379xFFAjaKqt972rk3rhx//9dFsJl4UpYDfb1nKnXt2Q8lKqgS4UvQ6apIQQrEiYvAA0AQ3d/l8Jj5Vgrs5xj4Xj8di0RZQIxjWFAoA09Ak73M3vW/f3gMfuKu5OfrRj9wDJaY2GgCL7u6ucl2KRn3DqwY8gsAwfEWUvG4Xx7P/9OMfyXUJ+D0QisAQS+BGpZwRa3p7W6uNxUgKz+fzFAkp0eWa4rRDbYqVSgkaJwYI6+wOOAR2fDxTyIuQTYeD3b1rC2pa5Uqlo3OlWKlqoMFJ3m7n26LNJ0+e+uuH/iqVSj785Qc2r1+NWPrPHn20v39w/fDWK+Pj586ff/b5Y5NTkzpCvOeOO72BJkXTPYHAho1rBQdz+PEnA8FmQXASmNnQ4WngBIwhErCQaZkcj/B24DMMSnUZ9rKklQoKggDCHAFvALHQTKHq9TgRo8GydMPQS0VxYGi9KBkzc4tBn6ucnm1ujQHuMZxc1b88lN66+50roS+NjHIO190fPRSNxp544vGFxfTopfM07wRanbx2vS5XHQ43wJdlsHK1putSvrBkd3A4hUCI63KjUJA5jkRQE3gVv9mbSY4joEWCH+3R4NbNG3Rde/LoM4WlWqWmmiaWLxSuTUyocn3N8FoL5yoqlpiPc6TV09Pz2BNHtmxaC+355MmTiYVEd2d3Jpc88m9HNAPVGnK+uEgRjmDQBazb2toOZAsYkrWa3+tOJGZ3vmtjqZwrlQqlcglSCZXK2zjTRFXlplk0TQKigWbWDXd5BA/POZqb/KpU8rg4E6lZGHSPMkOTUKrZdBrmCMO0tu7YmS1rI2dPg3SZuhEH8XP5yuXhNT00aeZymStjQCsY9GZJknOZpWwuHwyGwqEAilm6LpM4OxOfXr2u9/Tpi/WawTAsjqEMixRzGoZgwDu5XI1AEfiLaOugigUG+INoUsEV8J4BPZmrOARHTdVxHFwH+9FNG1evWrXm5VfOPP6rw7FYh2TQA52ra8XFq9cmy5VqPrcIvVbVMFVVZJnIprMMx2MEHg6FwKtKJY8TiKljUNxDa3qvXDvj8bO5tAo6RlOopYLI2qxyTUFQTFEMqAJMlfVXX85J1YaqNwJNDhRkuKqahuX18pqukiiq6yYobIJA29tXfPf7P5ocPUejBoIYplZ9+eRxOBfHcF1r3IinR8dmU4vpSrlWLlcdXiqTL7s9Po5jSQr1eDlD0ySl0tPXfXZkhCBYS8c41sbb7AQB1jsrVdCAVlOTC3oPAUTf2x91uZG5GRH6RDa7YKF1N7d+dn7BbjeKJYmzeyxEg0pxuewzswlaLmzcumVsYlLKJ6OtXa0tfklSx6emO7tihtZwuRy5XN7uYlVN53h62WBE0TUcOmYxb8iq1BINnz03gqGkXKMthPQHPaCvOJvB2py6YSpKHWACIcD9fjfDYJpKvXfvB2VJEYSW+NxlRc22tHV3965qbmllWEM3KgCUcDBcrkiGmAuEwmKtXkinPKEWWMVIqrxr5/aF+dl8bskJBMhQk9M3wD6KRitFiSbBd9zUlbpa9QVsuaVUqYiRNBuEzDIcsNTqNb2GpU9NxiEnLa305DURIE/k8yWCNFqjtlOvvLR9x3boa5dfq+y9c2h6emR8vGR32aQ6hppcd1dQUaqVqlStSWJVJHFU4Ak3T1wZn2Q59uljLwZ9jhUrIjhu1cWqnXc2BbyL6TI4Y0HfxrSKJMFQNDG+6HA5giHXzdmaXjXUSpO2cyCWClmbnUZxLZWUVVW3EAtnGBqOWLtBmJsvr+zDF+LT69e3MIxpZ0LRyGoHF66LumWyloohGtLX7I02h0kcdEQWQk5QfL4s3bZ7u1RXzr82WlgSS+W62jCguyXSCW+Tlc/WwCdQHG7BnsmUBZBBgaDb4960ZS3DEJFwGPobgRNDa/thdkQs0+liZ6fzhmERoBJtTvLs6Rw04zOvJgQbL1XcyflJGxtOp2egdMP+QH+rnyEJRK0KHC8biJ0ho03Bqbm5smZWqyWpXt8wPIhZdQxHQa8vzM9Xa2l/gOWgO6max2tz+/BKWcHhJhyPrWiNtjZn0snBgZUQ+3KpmkoVS7UFmtJ4nj1/bnpgyDf6WpoAAQnKH+Yko6HaWbvTiaZSs36Hz4FRzb29JGoCg5hyDTUIhgKU6TxFmEbDyTPDQ301Wvcu1uqS4vcikFyOs6AywpFgIpcG2CoNxeXmoAZlmXe5nBAAp+BaXMxEmoMD/YPnRi5xHA3/I0ROVmjT0EYvpTiOm51eUhSdAKCFQ3ZdK3XEmqARMBYnuOlwwEPQnAxKgUANC+GhIfO8rqkohqGIJaoWEzIls5pMOuCPlX29+VTKMDTdVDmbHcJnIaAXtapogbJzOVtMxCIZTpIbEZ4PhPUTJ8/DDjYQcHV0xi6NTly9VGI4uqHVRVEEPVMqqZA3nKLJ5S2eQZIGxyK018EKNpsGYhaclWTNQnGQivCDoA3TUjBURrAaIdZU7NxICkGLhsKlshPRtsGrly+5BD6/lIWI3ZiZJ3DGI3hboh3Q10iaxoklKEhZ1SpiMpcrCy5XcnHxwvkr8J/TTZKUlZqXWlp5UVRLJQnAiNMMdBV3qSTTNAXZxUwMPhYVpFAs1lUdOMegDEeAuzyWLNVVnEWBXsU69eqrY52xWL1Wnp3PAvOx9sXWWA8oS7vTJvi8XZ3dS4V8ey9eEXFQLIB6hqcrJQz0o2XZwqGmRGqCZpH5eAFBa7MzSYA5DLrJhWJFhGAYywoCuJvjmGqlEQxRsNrUNbRarRaKSwqqTM1mJVSemk+cuXDDJDXeyWOsQbHsmdNXu3sZOC7cTgR8AoR24nqCc6ROnRq1ObSpyZkzZy+sWhedHKtpDQKoDgiIxJzRGPHMM2dz2aWl4hIwp2GoV68swI5JrCiAv/QiSD9caxhg1LJojnU4waaaaELhcCyklEQxVINWoi6PkQAsUIIYSdhsHER+aSnHsBiAL5+tQ+hxHN6lUUKrVXVNR71eWjOkXFZ2u3wY2RArEorQkqJCHVAULriYGzey1vKGTLMAN7oBkvM/t7vwz+sKHn7hwv8AOhMDA+9NgmgAAAAASUVORK5CYII=",
			/* harbor */
			"22" : "data:image/png;base64,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",
			/* moonglow tower */
			"36" : "data:image/png;base64,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",
			/* trinsic temple */
			"37" : "data:image/png;base64,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",
			/* background */
			"bg" : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA6CAYAAADhu0ooAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAfpJREFUaENjTE9X+8+ABGQFuRmk+DkZmJkYGVAkkBUNYvb3X38Ybr/6zPAVSKMAkEdBuLFM///Fpb7/v++JHhZ400RHsL9gmAHEaC43QPHcvAqr/7NKLf9PKTAbcnhLpxPcL7unuqJ69NIySEwurLb+z8LMCEqxQxo7GIrDPTu7xRLsWYbmCkRsDgdPwiIpxk0J7NnzC3wgHp3bbgUWACXXoR6TyO7n5mAB++vTzkiIRxd0WoMFQPlxOHkU5BdYwTrq0eESs6MxOlxiEuaP0RgdjdEh2lIaTbqjSXc06Q7uXs5oHh3No6N5dDSPDoq+7WhhNFoYjRZGo4XRaGFEz3JgtNSlZ2jTw67RGKVHKNPTjtEYpWdo08Ou0RilRyjT047RGKVnaNPDrtEYpUco09OO0RilZ2jTw67RGKVHKNPTjtEYpWdo08Ou0RilRyjT047RGKVnaNPDLpQYXdQ1QhY9Tm82B6+C3NDmMCgGnakV08rSvGB/Pd8YClnGWpSnBV/uCVq5TC2LBtqcCbmmkAjsdIB4FERsmYxYhx7rrvSfh5NlyHpYVYb3P8yTII/mJGggPAry7M5JLsNidwTyLo/ccIgn4TEK47QXGP0/MtXj/8ftEUPW04/WBP+fU275P9BV7n9ysgp2j4I8nJqq+j8+XnnIY+Q9LyA2AAW4vKIVZy2TAAAAAElFTkSuQmCC",
			/* exclam mark */
			"-1" : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR/mAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC5UlEQVRYhe3ZwYsbZRjH8c+bZJNld0VXFJQFBcGWHgoe9NJePHny7Nmjd/8L/w3BswdPgqdC0ZOgIq3agsRtt7FJ3U022SSTGQ/jO2TdLdh5Y1Zhf4chzCTvfOf5Pe/7PO+ES/3vFdJ/HyiecvVp5y+1UtU0sTLuKnuMGHJCzhY75HR5TF5r/FYi1kfcYEzOnJw2mwy4xacc0GSxNqxSN3nnvC/c404cvYYjNbEqDcjo0aBBQYMjvuEWT1DLx1SsnBadmFgFLZp02E4YPRVrjhgn8Rho0EwYNhVrFj+EMzl09sw/18qitaz0xT0Vq3LtbyhlntXmS8U616aCBfMLxGpFjgqojFxGdoFY7SWasDQfp0wvEGsbZ2pLxpTxs9ecSqlYpcp1vHJwxjEjsnh+TVjVnQ7IT5eXjDGHDCNWDaWW6hdOrw4hYg0ZLMVvTViVJnGURcSaMWbCCDRqZViqiXcZsskkNhHzZAfrY1X6hX3ejKxltPo8Pl2814S1HK19rtGKuT+hTz96dwFYgR/4LXZ/OTOOOEjo4pOwSjUY8SshZv2YEYf0UsZdSanuxqwvy/OY4zhD660OqVhl69Lle67HUA1iC5+iVCzc4Su2+Ikn3KefjLWCdxBNXuMac+Y8pMtxMlkq1rlPlrK/kB6tUm1epUPBkN8TWpoVYJUT7Tne5YMQXi+KBd/yObfJEmZifaDyuMsn9Jnu7BQhlJ3W13wYZ1Oim8+mv24WwscM9vaKK1eGGxt/MAhhRI/PuE6j7m4xqfhs8j67WdabTsfzuehazi5v8DMnS3vufxcrxHr3UlE8z+LRozmdErcomsyYs0mbkxo3SK+JaC7tVMvjIgZprZv9ql94QJe3YvBCvHrEA/rr7+VLZXzJVV5mRM6CQ7o85G5sWdfXy1fh+YIN3qNNgwk9fuQ2++R1l64VLKcv8javsM2EI+7zXVobuDIFtuisqpz9N7WCZwtLc1B09vJvlUv9CahvB6IA/IczAAAAAElFTkSuQmCC"
		}
	},
	construct : function(vis, x, y, img_id)
	{
		webfrontend.vis.Entity.call(this);
		this.drawNode = new webfrontend.draw.ImageNode.create(vis.scene, x + 4, y + 4, 50, 50, this.self(arguments).img[img_id]);
		this.drawNode.setSortOrder(100000);
		this.backgroundNode = new webfrontend.draw.BackgroundTextNode(vis.scene, x, y, 58, 58, this.self(arguments).img["bg"], "");
		this.backgroundNode.setSortOrder(99999);
	},
	destruct : function()
	{
		if(this.drawNode)
		{
			this.drawNode.release();
			this.drawNode = null;
		}
		this._disposeObjects("backgroundNode");
	},
	members :
	{
		drawNode : null,
		backgroundNode : null
	}
});
// $Header: /Home/Emperor/Emperor.TDK.CityBuildingCounts.js,v 1.1 2012/09/29 01:30:16 Aare Exp $

// Senocular's Defiant Extension City Building Counts

qx.Class.define("Emperor.TDK.CityBuildingCounts",
{
	type : "singleton",
	extend : qx.ui.container.Composite,
	statics :
	{
		INVALID_BUILDING_TYPES :
		{
			23 : 1, // wall
			27 : 1, // resources (4)
			28 : 1,
			29 : 1,
			30 : 1
		}
	},
	construct : function()
	{
		try
		{
			var layout = new qx.ui.layout.VBox();
			this.base(arguments, layout);
			this.buildUI();
		}
		catch(e)
		{
			EmpDebug("TDK.BuildingCounts.construct: " + e);
		}
	},
	members :
	{
		decor : null,
		cityEvents : null,
		visMainEvents : null,
		enabled : null,
		setEnable : function(enabled)
		{
			try
			{
				if(this.enabled == enabled)
					return;

				var parent;
				if(enabled)
				{
					var app = qx.core.Init.getApplication();
					this.cityEvents = webfrontend.data.City.getInstance();
					this.cityEvents.addListener("changeVersion", this.onCityChange, this);

					this.visMainEvents = app.visMain;
					this.visMainEvents.addListener("changeMapLoaded", this.onMapChange, this);

					var buildingQueue = app.cityInfoView.buildingQueue;
					parent = buildingQueue.getLayoutParent();
					if(parent)
						parent.addBefore(this, buildingQueue);
					this.refreshCounts();
				}
				else
				{
					parent = this.getLayoutParent();
					if(parent)
						parent.remove(this);
					if(this.cityEvents)
					{
						this.cityEvents.removeListener("changeVersion", this.onCityChange, this);
						this.cityEvents = null;
					}
					if(this.visMainEvents)
					{
						this.visMainEvents.removeListener("changeMapLoaded", this.onMapChange, this);
						this.visMainEvents = null;
					}
				}
				this.enabled = enabled;
			}
			catch(e)
			{
				EmpDebug("TDK.BuildingCounts.setEnable: " + e);
			}
		},
		buildUI : function()
		{
			try
			{
				this.set(
				{
					marginLeft : 1,
					marginRight : 8,
					marginTop : 5,
					marginBottom : 5
				});
				this.decor = new qx.ui.decoration.Single().set(
				{
					backgroundColor : "#E1D0B0",
					width : 1,
					color : "#7B5930"
				});
			}
			catch(e)
			{
				EmpDebug("TDK.BuildingCounts.buildUI: " + e);
			}
		},
		onCityChange : function()
		{
			try
			{
				// KLUDGE: though city version changes map to changes in the city buildings
				// this event seems to happen before actual data is set, so we delay the update
				defer(this.refreshCounts, this, EVENT_PRIORITY_DEFER_DELAY);
			}
			catch(e)
			{
				EmpDebug("TDK.BuildingCountsItem.onCityChange: " + e);
			}
		},
		onMapChange : function()
		{
			try
			{
				this.refreshCounts();
			}
			catch(e)
			{
				EmpDebug("TDK.BuildingCountsItem.onMapChange: " + e);
			}
		},
		refreshCounts : function()
		{
			try
			{
				this.removeAll();
				// no building details are shown when not in city view
				// some city details depend on city view
				if(qx.core.Init.getApplication().visMain.mapmode != "c")
				{
					return;
				}
				var content = new qx.ui.container.Composite(new qx.ui.layout.Flow(7)).set(
				{
					padding : 3,
					decorator : this.decor
				});
				this.add(content);

				var building, text;
				var buildings = this.getBuildingMap();
				if(buildings)
				{
					for(var b in buildings)
					{
						if(!this.self(arguments).INVALID_BUILDING_TYPES[b])
						{
							// !invalid
							building = buildings[b];
							text = building.level
							if(building.level == building.count * 10)
								text = "<b>" + text + "</b>";
							text += " (" + building.count + ")";

							content.add(new Emperor.TDK.CityBuildingCountsItem(building.img, text, building.name));
						}
					}
				}
			}
			catch(e)
			{
				EmpDebug("TDK.BuildingCountsItem.refresh: " + e);
			}
		},
		getBuildingMap : function()
		{
			try
			{
				var list =
				{
				};
				var found = false;
				var app = qx.core.Init.getApplication();

				var cell, entity, cityItem, itemInfo, type;
				var info = webfrontend.res.Main.getInstance();
				var cells = app.visMain.cells;

				for(cell in cells)
				{
					for(entity in cells[cell].entities)
					{

						try
						{
							cityItem = cells[cell].entities[entity];
							if(cityItem.getType)
							{
								type = cityItem.getType();
								itemInfo = info.buildings[type];
								if(list[type] == undefined)
								{
									list[type] =
									{
										name : itemInfo.dn,
										count : 1,
										level : cityItem.level || 0,
										img : info.imageFiles[itemInfo.mimg]
									}
								}
								else
								{
									list[type].count++;
									list[type].level += cityItem.level;
								}
							}
						}
						catch(ignore)
						{
						}
						found = true;
					}
				}
				return found ? list : null;
			}
			catch(e)
			{
				EmpDebug("TDK.BuildingCounts.getBuildingMap: " + e);
			}
		}
	}
});

qx.Class.define("Emperor.TDK.CityBuildingCountsItem",
{
	extend : qx.ui.container.Composite,
	construct : function(img, text, toolTipText)
	{
		try
		{
			var layout = new qx.ui.layout.VBox(2).set(
			{
				alignX : "center"
			});
			this.base(arguments, layout);
			if(img)
				this.img = img;
			this.text = text || "-";
			this.toolTipText = toolTipText + "<br />Level (Count)" || "Building<br />Level (Count)";
			this.buildUI();
		}
		catch(e)
		{
			EmpDebug("TDK.BuildingCountsItem.construct: " + e);
		}
	},
	members :
	{
		img : null,
		text : null,
		toolTipText : null,
		buildUI : function()
		{
			try
			{
				var imgPath = webfrontend.config.Config.getInstance().getImagePath(this.img);
				var buildingImage = new qx.ui.basic.Image(imgPath).set(
				{
					width : 38,
					height : 38,
					scale : true
				});
				buildingImage.setToolTipText(this.toolTipText);
				var buildingText = new qx.ui.basic.Label(this.text).set(
				{
					rich : true
				});
				buildingText.toolTipText = "Level (Count)";
				this.add(buildingImage);
				this.add(buildingText);
			}
			catch(e)
			{
				EmpDebug("TDK.BuildingCountsItem.buildUI: " + e);
			}
		}
	}
});
// $Header: /Home/Emperor/Emperor.TDK.CitySingleClick.js,v 1.1 2012/09/29 01:30:16 Aare Exp $

// Senocular's Defiant Extension City Single Click Operations

qx.Class.define("Emperor.TDK.CitySingleClickOperations",
{
	type : "singleton",
	extend : qx.ui.container.Composite,
	construct : function()
	{
		try
		{
			this.base(arguments, new qx.ui.layout.HBox(3));
			this.buildUI();
			this.commandQueue = new Emperor.TDK.CommandQueue();
			this.setState("off");
		}
		catch(e)
		{
			EmpDebug("SingleClick.construct: " + e);
		}
	},
	members :
	{
		enabled : null,
		state : null,
		flash : null,
		commandQueue : null,
		visMainEvents : null,
		operationSelect : null,
		toggleButton : null,
		// Enable/disable the feature
		setEnable : function(enabled)
		{
			try
			{
				if(this.enabled == enabled)
					return;
				var parent;
				if(enabled)
				{
					var buildingQueue = qx.core.Init.getApplication().cityInfoView.buildingQueue;
					parent = buildingQueue.getLayoutParent();
					if(parent)
						parent.addBefore(this, buildingQueue);
					this.visMainEvents = qx.core.Init.getApplication().visMain;
					this.visMainEvents.addListener("changeMapLoaded", this.onMapChange, this);
				}
				else
				{
					parent = this.getLayoutParent();
					if(parent)
						parent.remove(this);
					this.turnOff();
					if(this.visMainEvents)
					{
						this.visMainEvents.removeListener("changeMapLoaded", this.onMapChange, this);
						this.visMainEvents = null;
					}
				}
				this.enabled = enabled;
			}
			catch(e)
			{
				EmpDebug("SingleClick.setEnable: " + e);
			}
		},
		buildUI : function()
		{
			try
			{
				this.set(
				{
					marginLeft : 1,
					marginRight : 8,
					marginTop : 4,
					marginBottom : 6
				});
				var descLabel = new qx.ui.basic.Label("Single Click to: ").set(
				{
					alignY : "middle"
				});
				this.operationSelect = new qx.ui.form.SelectBox();
				this.operationSelect.addListener("changeSelection", this.operationSelected, this);
				// filled dynamically by rebuildOptions()
				this.toggleButton = new qx.ui.form.Button("Off");
				// would use ToggleButton but not skinned properly
				this.toggleButton.addListener("execute", this.toggleState, this);
				this.flash = new qx.ui.container.Composite();
				this.flash.setDecorator(new qx.ui.decoration.Single().set(
				{
					backgroundColor : "#9F2211"
				}));
				this.add(descLabel);
				this.add(this.operationSelect,
				{
					flex : 1
				});
				this.add(this.toggleButton);
			}
			catch(e)
			{
				EmpDebug("SingleClick.buildUI: " + e);
			}
		},
		rebuildOptions : function(prefOptions)
		{
			try
			{
				this.operationSelect.removeAll();
				var i, n = CITY_BUILDING_IDS.length;
				// "fake" indices at the end of the build ids list for demolish and upgrade
				// though in the list itself, these come first
				if(prefOptions[n])
					this.operationSelect.add(new qx.ui.form.ListItem("Demolish", null, "demolish"));
				if(prefOptions[n + 1])
					this.operationSelect.add(new qx.ui.form.ListItem("Upgrade", null, "upgrade"));
				var buildings = webfrontend.res.Main.getInstance().buildings;
				var id, name, item;
				for( i = 0; i < n; i++)
				{
					id = CITY_BUILDING_IDS[i];
					if(id == CASTLE_BUILDING_ID || id == PALACE_BUILDING_ID)
						continue;
					if(prefOptions[i])
					{
						name = buildings[id].dn;
						item = new qx.ui.form.ListItem(name, null, "build:" + id);
						this.operationSelect.add(item);
					}
				}
				this.turnOff();
			}
			catch(e)
			{
				EmpDebug("SingleClick.rebuild: " + e);
			}
		},
		toggleState : function()
		{
			this.setState((this.state == "off") ? "on" : "off");
		},
		setState : function(state)
		{
			try
			{
				if(this.state == state)
					return;
				switch(state)
				{
				case "on":
					this.toggleButton.set(
					{
						label : "On",
						icon : "resource/webfrontend/ui/icons/overviews/header_warnings.png",
						toolTipText : "ACTIVE. Click to turn off"
					});
					if(this.visMainEvents)
						this.visMainEvents.addListener("changeSelection", this.selectionClick, this);
					break;
				case "off":
					this.toggleButton.set(
					{
						label : "Off",
						icon : null,
						toolTipText : "Inactive. Click to turn on"
					});
					if(this.visMainEvents)
						this.visMainEvents.removeListener("changeSelection", this.selectionClick, this);
					break;
				default:
					// unsupported state
					return;
				}
				this.state = state;
			}
			catch(e)
			{
				EmpDebug("SingleClick.setState: " + e);
			}
		},
		operationSelected : function(evt)
		{
			this.setState("on");
		},
		selectionClick : function(evt)
		{
			try
			{
				if(this.state != "on")
					return;
				var buildQueueMax = webfrontend.data.Player.getInstance().getMaxBuildQueueSize();
				var buildQueue = webfrontend.data.City.getInstance().buildQueue;
				if(buildQueue && buildQueue.length >= buildQueueMax)
					return;
				var opSelection = this.operationSelect.getSelection();
				if(!opSelection || !opSelection.length)
					return;
				var selected = evt.getData();
				var command = null;
				var op = opSelection[0].getModel();
				var levelData = this.getBuildLevel(selected);
				if(this.canPayFor(op, selected, levelData))
				{
					this.performAction(op, selected, levelData.level, true);
				}
				else if(webfrontend.data.Player.getInstance().getMinisterBuildPresent())
				{
					this.performAction(op, selected, levelData.level, false);
				}
			}
			catch(e)
			{
				EmpDebug("SingleClick.selectionClick: " + e);
			}
		},
		canPayFor : function(op, selected, levelData)
		{
			try
			{
				if(op == "demolish")
					return true;
				var city = webfrontend.data.City.getInstance();
				var cost = null;
				if( selected instanceof webfrontend.vis.CityBuilding)
				{
					if(levelData.isPaid == false)
						return false;
					cost = BUILDING_COST[selected.getType() ][levelData.level];
				}
				else if( selected instanceof webfrontend.vis.CityBuildingPlace)
				{
					var opType = this.getBuildID(op);
					if(opType)
						cost = BUILDING_COST[ opType ][0];
				}
				if(cost && cost[0] <= city.getResourceCount(1) && cost[1] <= city.getResourceCount(2))
				{
					return true;
				}
				return false;
			}
			catch(e)
			{
				EmpDebug("SingleClick.canPayFor: " + e);
			}
		},
		getBuildLevel : function(selected)
		{
			try
			{
				var levelData =
				{
					level : 0,
					isPaid : true
				};
				if( selected instanceof webfrontend.vis.CityBuilding == false)
					return levelData;
				var selectedID = selected.getId();
				levelData.level = selected.getLevel();
				var buildQueue = webfrontend.data.City.getInstance().buildQueue;
				if(buildQueue)
				{
					var i = buildQueue.length;
					while(i--)
					{
						if(buildQueue[i].building == selectedID && buildQueue[i].level > levelData.level)
						{
							levelData.level = buildQueue[i].level;
							levelData.isPaid = buildQueue[i].isPaid;
						}
					}
				}
				return levelData;
			}
			catch(e)
			{
				EmpDebug("SingleClick.setState: " + e);
			}
		},
		performAction : function(op, selected, level, isPaid)
		{
			try
			{
				var city = webfrontend.data.City.getInstance();
				var command = null;
				switch(op)
				{
				case "demolish":
					command = this.getDemoCommand(selected);
					break;
				case "upgrade":
					command = this.getUpgradeCommand(selected, level, isPaid);
					break;
				default:
					command = this.getBuildCommand(op, selected, level, isPaid);
				}
				if(command)
				{
					this.commandQueue.addCommand(command.target, command.data);
					if(!this.commandQueue.isRunning)
						this.commandQueue.send();
				}
			}
			catch(e)
			{
				EmpDebug("SingleClick.performAction: " + e);
			}
		},
		getDemoCommand : function(selected)
		{
			try
			{
				if( selected instanceof webfrontend.vis.CityResField)
				{
					var ret =
					{
						target : "UpgradeBuilding", // resources upgrade to demolish
						data :
						{
							cityid : webfrontend.data.City.getInstance().getId(),
							buildingid : selected.visId,
							buildingtype : BUILDING_TYPE_BY_RES_TYPE[selected.getResType()],
							isPaid : true
						}
					};
					return ret;
				}
				else if( selected instanceof webfrontend.vis.CityBuilding)
				{

					if(CANNOT_DEMOLISH_BUILDINGS[selected.getType()])
						return null;
					var ret =
					{
						target : "DemolishBuilding",
						data :
						{
							cityid : webfrontend.data.City.getInstance().getId(),
							buildingid : selected.visId
						}
					};
					return ret;
				}
				return null;
			}
			catch(e)
			{
				EmpDebug("SingleClick.getDemoCmd: " + e);
			}
		},
		getUpgradeCommand : function(selected, level, isPaid)
		{
			try
			{
				if( selected instanceof webfrontend.vis.CityBuilding && level < 10)
				{
					var ret =
					{
						target : "UpgradeBuilding",
						data :
						{
							cityid : webfrontend.data.City.getInstance().getId(),
							buildingid : selected.visId,
							buildingType : selected.getType(),
							isPaid : isPaid
						}
					};
					return ret;
				}
				return null;
			}
			catch(e)
			{
				EmpDebug("SingleClick.getUpgradeCmd: " + e);
			}
		},
		getBuildCommand : function(op, selected, level, isPaid)
		{
			try
			{
				var opType = this.getBuildID(op);
				if(!opType)
					return;
				if( selected instanceof webfrontend.vis.CityBuildingPlace || ( selected instanceof webfrontend.vis.CityBuilding && level < 10 && String(selected.getType()) == opType))
				{
					// TODO: [future] more validation for building? (is plot valid for type?)
					// For now we'll assume the user won't try otherwise
					var ret =
					{
						target : "UpgradeBuilding",
						data :
						{
							cityid : webfrontend.data.City.getInstance().getId(),
							buildingid : selected.visId,
							buildingType : opType,
							isPaid : isPaid
						}
					};
					return ret;
				}
				return null;
			}
			catch(e)
			{
				EmpDebug("SingleClick.getBuildCmd: " + e);
			}
		},
		getBuildID : function(op)
		{
			try
			{
				var opParts = op.split(":");
				// expect "build:XX" where XX is building type
				if(opParts[0] != "build")
					return "";
				return opParts[1];
			}
			catch(e)
			{
				EmpDebug("SingleClick.getBuildID: " + e);
			}
		},
		onMapChange : function()
		{
			if(Emp.options.cityDemoToggleAutoOff)
				this.turnOff();
		},
		turnOff : function()
		{
			this.commandQueue.cancel();
			this.setState("off");
		}
	}
});
// $Header: /Home/Emperor/Emperor.TDK.CommandQueue.js,v 1.2 2012/12/25 22:14:17 Aare Exp $

// Senocular's Defiant Extension Command Queue

(function()
{
	var COMMAND_QUEUE_INTERVAL = 800;

	qx.Class.define("Emperor.TDK.CommandQueue",
	{
		extend : qx.core.Object,
		construct : function()
		{
			this.base(arguments);
			this.commands = [];
		},
		members :
		{
			commands : null,
			interval : COMMAND_QUEUE_INTERVAL,
			results : null,
			nextTimerID : -1,
			isRunning : false,
			lastRequestTime : 0,

			onCompleteTarget : null,
			onComplete : null,
			onUpdateTarget : null,
			onUpdate : null,

			addCommand : function(target, data)
			{
				this.commands.push([target, data]);
			},
			getCommandCount : function()
			{
				return this.commands.length;
			},
			send : function(onCompleteTarget, onComplete, onUpdateTarget, onUpdate)
			{
				try
				{
					this.onCompleteTarget = onCompleteTarget;
					this.onComplete = onComplete;
					this.onUpdateTarget = onUpdateTarget;
					this.onUpdate = onUpdate;

					this.clearTimer();
					this.isRunning = true;
					this.results = [];
					this.nextCommand();
				}
				catch(e)
				{
					EmpDebug("TDK.CommandQ.send: " + e);
				}
			},
			nextCommand : function()
			{
				try
				{
					if(this.commands.length)
					{
						this.lastRequestTime = new Date().getTime();
						var commandManager = webfrontend.net.CommandManager.getInstance();
						var args = this.commands.shift().concat(this, this.onCommandResponse);
						commandManager.sendCommand.apply(commandManager, args);
					}
					else
					{
						this.complete();
					}
				}
				catch(e)
				{
					EmpDebug("TDK.CommandQ.next: " + e);
				}
			},
			onCommandResponse : function(ok, response)
			{
				try
				{
					this.results.push(response);
					if(this.onUpdate != null)
					{
						if(this.onUpdateTarget)
						{
							this.onUpdate.call(this.onUpdateTarget);
						}
						else
						{
							this.onUpdate();
						}
					}
					if(this.commands.length)
					{
						var delay = this.interval - (new Date().getTime() - this.lastRequestTime);
						if(delay <= 0)
						{
							this.nextCommand();
						}
						else
						{
							var timer = qx.util.TimerManager.getInstance();
							this.nextTimerID = timer.start(this.nextCommand, 0, this, null, delay);
						}
					}
					else
					{
						this.complete();
					}
				}
				catch(e)
				{
					EmpDebug("TDK.CommandQ.onCommandResponse: " + e);
				}
			},
			complete : function()
			{
				try
				{
					this.clearTimer();
					this.isRunning = false;
					var callbackTarget = this.onCompleteTarget;
					var callback = this.onComplete;
					this.onCompleteTarget = null;
					this.onComplete = null;
					this.onUpdateTarget = null;
					this.onUpdate = null;

					if(callback != null)
					{
						if(callbackTarget)
						{
							callback.call(callbackTarget);
						}
						else
						{
							callback();
						}
					}
				}
				catch(e)
				{
					EmpDebug("TDK.CommandQ.complete: " + e);
				}
			},
			clear : function()
			{
				this.commands.length = 0;
			},
			clearTimer : function()
			{
				try
				{
					if(this.nextTimerID != -1)
					{
						var timer = qx.util.TimerManager.getInstance();
						timer.stop(this.nextTimerID);
						this.nextTimerID = -1;
					}
				}
				catch(e)
				{
					EmpDebug("TDK.CommandQ.clearTimer: " + e);
				}
			},
			cancel : function()
			{
				try
				{
					this.clearTimer();
					this.isRunning = false;
					this.onCompleteTarget = null;
					this.onComplete = null;
					this.clear();
				}
				catch(e)
				{
					EmpDebug("TDK.CommandQ.cancel: " + e);
				}
			}
		}
	});
})();
// $Header: /Home/Emperor/Emperor.TDK.ButtonGroupWithStatus.js,v 1.1 2012/09/29 01:30:16 Aare Exp $

// Senocular's Defiant Extension Button Group

qx.Class.define("Emperor.TDK.ButtonWithIDAndText",
{
	extend : qx.ui.form.Button,
	construct : function(label, buttonID, buttonText)
	{
		this.base(arguments, label);
		if(buttonID)
			this.buttonID = buttonID;
		if(buttonText)
			this.buttonText = buttonText
	},
	members :
	{
		buttonID : 0,
		buttonText : "attacking"
	}
});

qx.Class.define("Emperor.TDK.ButtonGroupWithStatus",
{
	type : "singleton",
	extend : qx.ui.container.Composite,
	construct : function(layout)
	{
		try
		{
			if(!layout)
			{
				layout = new qx.ui.layout.VBox(2).set(
				{
					alignX : "center"
				});
			}
			this.base(arguments, layout);
			this.buildUI();
			this.targetContainer = qx.core.Init.getApplication().getCityDetailView().actionArea;
		}
		catch(e)
		{
			EmpDebug("ButtonGroupWithStatus.Construct: " + e);
		}
	},
	statics :
	{
		STATUS_AUTOHIDE_DELAY : 3000,
	},
	members :
	{
		enabled : null,
		targetContainer : null,
		buttonRow : null,
		statusLabel : null,
		clicked : null,
		operationInProgress : false,
		setEnable : function(enabled)
		{
			try
			{
				if(this.enabled == enabled)
					return;
				if(enabled)
				{
					this.targetContainer.add(this);
				}
				else
				{
					var parent = this.getLayoutParent();
					if(parent)
						parent.remove(this);
				}
				this.enabled = enabled;
			}
			catch(e)
			{
				EmpDebug("ButtonGroupWithStatus.SetEnable: " + e);
			}
		},
		positionInStack : function(position)
		{
			try
			{
				var currPos = this.targetContainer.indexOf(this);
				var maxPos = this.targetContainer.getChildren().length;
				if(currPos != -1)
					maxPos--;
				var newPos = Math.min(position, maxPos);
				if(newPos != currPos)
					this.targetContainer.addAt(this, newPos);
			}
			catch(e)
			{
				EmpDebug("ButtonGroupWithStatus.PositionInStack: " + e);
			}
		},
		buildUI : function()
		{
			try
			{
				this.set(
				{
					marginRight : 14
				});

				// create elements
				var buttonLayout = new qx.ui.layout.HBox(3).set(
				{
					alignX : "center"
				});
				this.buttonRow = new qx.ui.container.Composite(buttonLayout).set(
				{
					maxWidth : 306
				});
				this.statusLabel = new qx.ui.basic.Label("");
				// add elements
				this.add(this.buttonRow);
			}
			catch(e)
			{
				EmpDebug("ButtonGroupWithStatus.BuildUI: " + e);
			}
		},
		completed : function(message)
		{
			try
			{
				this.clicked = null;
				if(message != undefined)
					this.setStatus(message);
				defer(this.setStatus, this, this.self(arguments).STATUS_AUTOHIDE_DELAY, [""]);
			}
			catch(e)
			{
				EmpDebug("ButtonGroupWithStatus.Completed: " + e);
			}
		},
		setStatus : function(status)
		{
			try
			{
				if(status)
				{
					this.statusLabel.setValue(status);
					if(this.indexOf(this.statusLabel) == -1)
					{
						this.add(this.statusLabel);
					}
				}
				else if(this.indexOf(this.statusLabel) != -1)
				{
					this.statusLabel.setValue("");
					this.remove(this.statusLabel);
				}
			}
			catch(e)
			{
				EmpDebug("ButtonGroupWithStatus.SetStatus: " + e);
			}
		}
	}
});
// $Header: /Home/Emperor/Emperor.TDK.CityAttackOptions.js,v 1.3 2012/10/28 03:55:40 Aare Exp $

// Senocular's Defiant Extension City Attack Options

qx.Class.define("Emperor.TDK.CityAttackOptionsBase",
{
	extend : Emperor.TDK.ButtonGroupWithStatus,
	construct : function(layout)
	{
		this.base(arguments, layout);
	},
	members :
	{
		SCOUT_ORDER_ID : 1,
		PLUNDER_ORDER_ID : 2,
		ATTACK_ORDER_ID : 3,
		SUPPORT_ORDER_ID : 4,
		SIEGE_ORDER_ID : 5,
		buildUI : function()
		{
			this.base(arguments);
		},
		idToString3x3 : function(id)
		{
			return this.positionToString3x3(this.idToPosition(id));
		},
		positionToString3x3 : function(point)
		{
			var x = Number(point[0]);
			var y = Number(point[1]);
			x = (isNaN(x)) ? "0" : String(x);
			y = (isNaN(y)) ? "0" : String(y);
			while(x.length < 3)
			x = "0" + x;
			while(y.length < 3)
			y = "0" + y;
			return x + ":" + y;
		},
		idToPosition : function(id, asString)
		{
			var x = id & 0xFFFF;
			var y = (id >> 16) & 0xFFFF;
			if(asString)
			{
				var xs = String(x);
				while(xs.length < 3)
				{
					xs = "0" + xs;
				}
				var ys = String(y);
				while(ys.length < 3)
				{
					ys = "0" + ys;
				}
				return [xs, ys];
			}
			return [x, y];
		},
		onTroopsSent : function(ok, errorCode)
		{
			try
			{
				if(this.clicked == null)
					return;
				if(errorCode.r0 == 0 && errorCode.r1 == 0)
				{
					this.completed("Troops are " + this.clicked.buttonText + "!...");
				}
				else if(errorCode.r0 == 1 && errorCode.r1 == 0)
				{
					this.completed("No suitable troops to send");
				}
				else if(errorCode.r0 == 64 && errorCode.r1 == 0)
				{
					this.completed("Command count reached");
				}
				else
				{
					this.completed("Error code r0 " + errorCode.r0 + " r1 " + errorCode.r1);
				}
			}
			catch(e)
			{
				EmpDebug("CityAttackOptionsBase.OnTroopsSent: " + e);
			}
		},
	},
});

qx.Class.define("Emperor.TDK.CityAttackOptions",
{
	type : "singleton",
	extend : Emperor.TDK.CityAttackOptionsBase,
	construct : function(layout)
	{
		this.base(arguments, layout);

		this.SCOUT_UNITS =
		{
		};
		this.SCOUT_UNITS[SCOUT_UNIT_ID] = 1;

		this.ATTACK_UNITS =
		{
		};
		this.ATTACK_UNITS[BERSERKER_UNIT_ID] = 1;
		this.ATTACK_UNITS[KNIGHT_UNIT_ID] = 1;
		this.ATTACK_UNITS[MAGE_UNIT_ID] = 1;
		this.ATTACK_UNITS[WARLOCK_UNIT_ID] = 1;
		this.SIEGE_UNITS =
		{
		};
		this.SIEGE_UNITS[CATAPULT_UNIT_ID] = 1;
		this.SIEGE_UNITS[RAM_UNIT_ID] = 1;
		this.SIEGE_UNITS[BERSERKER_UNIT_ID] = 1;
		this.SIEGE_UNITS[KNIGHT_UNIT_ID] = 1;
		this.SIEGE_UNITS[MAGE_UNIT_ID] = 1;
		this.SIEGE_UNITS[WARLOCK_UNIT_ID] = 1;
		this.WG_UNITS =
		{
		};
		this.WG_UNITS[GALLEON_UNIT_ID] = 1;
		this.PLUNDER_UNITS =
		{
		};
		this.PLUNDER_UNITS[RANGER_UNIT_ID] = 1;
		this.PLUNDER_UNITS[GUARDIAN_UNIT_ID] = 1;
		this.PLUNDER_UNITS[TEMPLAR_UNIT_ID] = 1;
		this.PLUNDER_UNITS[BERSERKER_UNIT_ID] = 1;
		this.PLUNDER_UNITS[MAGE_UNIT_ID] = 1;
		this.PLUNDER_UNITS[SCOUT_UNIT_ID] = 1;
		this.PLUNDER_UNITS[CROSSBOW_UNIT_ID] = 1;
		this.PLUNDER_UNITS[PALADIN_UNIT_ID] = 1;
		this.PLUNDER_UNITS[KNIGHT_UNIT_ID] = 1;
		this.PLUNDER_UNITS[WARLOCK_UNIT_ID] = 1;
		this.SUPPORT_UNITS =
		{
		};
		this.SUPPORT_UNITS[RANGER_UNIT_ID] = 1;
		this.SUPPORT_UNITS[GUARDIAN_UNIT_ID] = 1;
		this.SUPPORT_UNITS[TEMPLAR_UNIT_ID] = 1;
		this.SUPPORT_UNITS[CROSSBOW_UNIT_ID] = 1;
		this.SUPPORT_UNITS[PALADIN_UNIT_ID] = 1;
		this.SUPPORT_UNITS[BALLISTA_UNIT_ID] = 1;
	},
	members :
	{
		SCOUT_UNITS : null,
		ATTACK_UNITS : null,
		PLUNDER_UNITS : null,
		SIEGE_UNITS : null,
		SUPPORT_UNITS : null,
		WG_UNITS : null,
		buildUI : function()
		{
			try
			{
				this.base(arguments);

				// create elements
				var scoutButton = new Emperor.TDK.ButtonWithIDAndText("Sc", 1, "scouting");
				scoutButton.setToolTipText("Scout selected city with all available units");
				scoutButton.addListener("execute", this.dispatchTroops, this);

				var assaultButton = new Emperor.TDK.ButtonWithIDAndText("Att", 3, "assaulting");
				assaultButton.setToolTipText("Assault selected city with all available units");
				assaultButton.addListener("execute", this.dispatchTroops, this);

				var plunderButton = new Emperor.TDK.ButtonWithIDAndText("Pl", 2, "pludering");
				plunderButton.setToolTipText("Plunder selected city with all available units");
				plunderButton.addListener("execute", this.dispatchTroops, this);

				var siegeButton = new Emperor.TDK.ButtonWithIDAndText("CR", 5, "sieging");
				siegeButton.setToolTipText("Siege selected city with all available units");
				siegeButton.addListener("execute", this.dispatchTroops, this);

				var siegeButtonG = new Emperor.TDK.ButtonWithIDAndText("WG", 15, "sieging");
				siegeButtonG.setToolTipText("Siege selected city with war galleons");
				siegeButtonG.addListener("execute", this.dispatchTroops, this);

				var supportButton = new Emperor.TDK.ButtonWithIDAndText("Sup", 4, "supporting");
				supportButton.setToolTipText("Support selected city with all available units");
				supportButton.addListener("execute", this.dispatchTroops, this);

				// add elements
				this.buttonRow.add(scoutButton,
				{
					flex : 1
				});
				this.buttonRow.add(assaultButton,
				{
					flex : 1
				});
				this.buttonRow.add(plunderButton,
				{
					flex : 1
				});
				this.buttonRow.add(siegeButton,
				{
					flex : 1
				});
				this.buttonRow.add(siegeButtonG,
				{
					flex : 1
				});
				this.buttonRow.add(supportButton,
				{
					flex : 1
				});
			}
			catch(e)
			{
				EmpDebug("CityAttackOptions.BuildUI: " + e);
			}
		},
		dispatchTroops : function(event)
		{
			try
			{
				if(this.clicked != null)
					return;
				try
				{
					this.clicked = event.getCurrentTarget();

					var activeCity = webfrontend.data.City.getInstance();
					var selectedCity = qx.core.Init.getApplication().cityDetailView.city;

					// convert city unit list into order unit list
					var units = activeCity.units;
					var unitsOrdered = [];
					// {"t":"11","c":555}]
					for(var u in units)
					{
						var scout = ((this.clicked.buttonID == this.SCOUT_ORDER_ID) && this.SCOUT_UNITS[u]);
						var att = ((this.clicked.buttonID == this.ATTACK_ORDER_ID) && this.ATTACK_UNITS[u]);
						var pl = ((this.clicked.buttonID == this.PLUNDER_ORDER_ID) && this.PLUNDER_UNITS[u]);
						var cr = ((this.clicked.buttonID == this.SIEGE_ORDER_ID) && this.SIEGE_UNITS[u]);
						var sup = ((this.clicked.buttonID == this.SUPPORT_ORDER_ID) && this.SUPPORT_UNITS[u]);
						var wg = ((this.clicked.buttonID == (this.SIEGE_ORDER_ID + 10)) && this.WG_UNITS[u]);
						if(scout || att || pl || cr || sup || wg)
						{
							if(units[u].count > 0)
							{
								unitsOrdered.push(
								{
									t : u,
									c : units[u].count
								});
							}
						}
					}
					var request =
					{
						cityid : activeCity.getId(),
						units : unitsOrdered, // all units
						targetPlayer : selectedCity.get_PlayerName(), // player name
						targetCity : this.idToString3x3(selectedCity.get_Coordinates()), // city string coords
						order : this.clicked.buttonID % 10,
						transport : 1,
						timeReferenceType : 1,
						referenceTimeUTCMillis : 0,
						raidTimeReferenceType : 0,
						raidReferenceTimeUTCMillis : 0
					};
					this.setStatus("Dispatching troops...");
					var commandManager = webfrontend.net.CommandManager.getInstance();
					commandManager.sendCommand("OrderUnits", request, this, this.onTroopsSent);
				}
				catch(err)
				{
					this.clicked = null;
					this.completed("Attack: " + err);
					EmpDebug("CityAttackOptions.Attack: err: " + String(err));
				}
			}
			catch(e)
			{
				EmpDebug("CityAttackOptions.Attack: " + e);
			}
		},
	}
});

qx.Class.define("Emperor.TDK.CityAttackOptions2",
{
	type : "singleton",
	extend : Emperor.TDK.CityAttackOptionsBase,
	construct : function(layout)
	{
		this.base(arguments, layout);

		this.SCOUT_UNITS =
		{
		};
		this.SCOUT_UNITS[SCOUT_UNIT_ID] = 1;

		this.ATTACK_UNITS =
		{
		};
		this.ATTACK_UNITS[BERSERKER_UNIT_ID] = 1;
		this.ATTACK_UNITS[KNIGHT_UNIT_ID] = 1;
		this.ATTACK_UNITS[MAGE_UNIT_ID] = 1;
		this.ATTACK_UNITS[WARLOCK_UNIT_ID] = 1;
		this.ATTACK_UNITS[FRIGATE_UNIT_ID] = 1;
		this.PLUNDER_UNITS =
		{
		};
		this.PLUNDER_UNITS[RANGER_UNIT_ID] = 1;
		this.PLUNDER_UNITS[GUARDIAN_UNIT_ID] = 1;
		this.PLUNDER_UNITS[TEMPLAR_UNIT_ID] = 1;
		this.PLUNDER_UNITS[BERSERKER_UNIT_ID] = 1;
		this.PLUNDER_UNITS[MAGE_UNIT_ID] = 1;
		this.PLUNDER_UNITS[SCOUT_UNIT_ID] = 1;
		this.PLUNDER_UNITS[CROSSBOW_UNIT_ID] = 1;
		this.PLUNDER_UNITS[PALADIN_UNIT_ID] = 1;
		this.PLUNDER_UNITS[KNIGHT_UNIT_ID] = 1;
		this.PLUNDER_UNITS[WARLOCK_UNIT_ID] = 1;
		this.PLUNDER_UNITS[FRIGATE_UNIT_ID] = 1;
		this.PLUNDER_UNITS[SLOOP_UNIT_ID] = 1;
		this.SUPPORT_UNITS =
		{
		};
		this.SUPPORT_UNITS[RANGER_UNIT_ID] = 1;
		this.SUPPORT_UNITS[GUARDIAN_UNIT_ID] = 1;
		this.SUPPORT_UNITS[TEMPLAR_UNIT_ID] = 1;
		this.SUPPORT_UNITS[CROSSBOW_UNIT_ID] = 1;
		this.SUPPORT_UNITS[PALADIN_UNIT_ID] = 1;
		this.SUPPORT_UNITS[FRIGATE_UNIT_ID] = 1;
		this.PLUNDER_UNITS[SLOOP_UNIT_ID] = 1;
	},
	members :
	{
		SCOUT_UNITS : null,
		ATTACK_UNITS : null,
		PLUNDER_UNITS : null,
		SUPPORT_UNITS : null,
		buildUI : function()
		{
			try
			{
				this.base(arguments);

				// create elements
				var scoutButton = new Emperor.TDK.ButtonWithIDAndText("Sc 1", 1, "scouting");
				scoutButton.setToolTipText("Scout selected city with all available units");
				scoutButton.addListener("execute", this.dispatchTroops, this);

				var assaultButton = new Emperor.TDK.ButtonWithIDAndText("Navy Att", 3, "assaulting");
				assaultButton.setToolTipText("Assault selected city with all available units");
				assaultButton.addListener("execute", this.dispatchTroops, this);

				var plunderButton = new Emperor.TDK.ButtonWithIDAndText("Navy Pl", 2, "pludering");
				plunderButton.setToolTipText("Plunder selected city with all available units");
				plunderButton.addListener("execute", this.dispatchTroops, this);

				var supportButton = new Emperor.TDK.ButtonWithIDAndText("Navy Sup", 4, "supporting");
				supportButton.setToolTipText("Support selected city with all available units");
				supportButton.addListener("execute", this.dispatchTroops, this);

				// add elements
				this.buttonRow.add(scoutButton,
				{
					flex : 1
				});
				this.buttonRow.add(assaultButton,
				{
					flex : 1
				});
				this.buttonRow.add(plunderButton,
				{
					flex : 1
				});
				this.buttonRow.add(supportButton,
				{
					flex : 1
				});
			}
			catch(e)
			{
				EmpDebug("CityAttackOptions.BuildUI: " + e);
			}
		},
		dispatchTroops : function(event)
		{
			try
			{
				if(this.clicked != null)
					return;
				try
				{
					this.clicked = event.getCurrentTarget();

					var activeCity = webfrontend.data.City.getInstance();
					var selectedCity = qx.core.Init.getApplication().cityDetailView.city;

					// convert city unit list into order unit list
					var units = activeCity.units;
					var unitsOrdered = [];
					// {"t":"11","c":555}]
					for(var u in units)
					{
						var scout = ((this.clicked.buttonID == this.SCOUT_ORDER_ID) && this.SCOUT_UNITS[u]);
						var att = ((this.clicked.buttonID == this.ATTACK_ORDER_ID) && this.ATTACK_UNITS[u]);
						var pl = ((this.clicked.buttonID == this.PLUNDER_ORDER_ID) && this.PLUNDER_UNITS[u]);
						var sup = ((this.clicked.buttonID == this.SUPPORT_ORDER_ID) && this.SUPPORT_UNITS[u]);
						if(scout || att || pl || sup)
						{
							if(units[u].count > 0)
							{
								unitsOrdered.push(
								{
									t : u,
									c : scout ? 1 : units[u].count
								});
							}
						}
					}
					var request =
					{
						cityid : activeCity.getId(),
						units : unitsOrdered, // all units
						targetPlayer : selectedCity.get_PlayerName(), // player name
						targetCity : this.idToString3x3(selectedCity.get_Coordinates()), // city string coords
						order : this.clicked.buttonID % 10,
						transport : 1,
						timeReferenceType : 1,
						referenceTimeUTCMillis : 0,
						raidTimeReferenceType : 0,
						raidReferenceTimeUTCMillis : 0
					};
					this.setStatus("Dispatching troops...");
					var commandManager = webfrontend.net.CommandManager.getInstance();
					commandManager.sendCommand("OrderUnits", request, this, this.onTroopsSent);
				}
				catch(err)
				{
					this.clicked = null;
					this.completed("Attack2: " + err);
					EmpDebug("CityAttackOptions2.Attack: err: " + String(err));
				}
			}
			catch(e)
			{
				EmpDebug("CityAttackOptions2.Attack: " + e);
			}
		},
	}
});
// $Header: /Home/Emperor/Emperor.BOS.Const.js,v 1.1 2012/11/10 02:44:56 Aare Exp $

// Urthadar's LoU BOS Constants

qx.Class.define("Emperor.BOS.Const",
{
	statics :
	{
		TABLE_SUMMARY_ROW_BORDER : "2px solid #E8D3AE",
		TABLE_BORDER : "1px dotted rgb(77, 79, 70)",
		TABLE_DEFAULT_COLOR : "#F3D298",
		RESOURCE_GREEN : "#40C849",
		RESOURCE_YELLOW : "#FFE400",
		RESOURCE_RED : "#FF0000",
	}
});
// $Header: /Home/Emperor/Emperor.BOS.Table.js,v 1.1 2012/11/10 02:45:33 Aare Exp $

// Urthadar's LoU BOS Table and renderer objects (tweaked).

qx.Class.define("Emperor.BOS.Table",
{
	extend : qx.ui.table.Table,
	construct : function(tableModel, custom)
	{
		qx.ui.table.Table.call(this, tableModel, custom);
		this.setupTableLookAndFeel();
	},
	members :
	{
		setupTableLookAndFeel : function()
		{
			try
			{
				this.setStatusBarVisible(false)
				var focusedRowBGColor = "#555555";
				var rowBGColor = "#373930";
				this.setDataRowRenderer(new webfrontend.ui.RowRendererCustom(this, focusedRowBGColor, focusedRowBGColor, rowBGColor, rowBGColor, rowBGColor, rowBGColor, rowBGColor, rowBGColor, rowBGColor));
				this.setHeaderCellHeight(22);
				var tcm = this.getTableColumnModel();
				for(var col = 0; col < tcm.getOverallColumnCount(); col++)
				{
					tcm.setDataCellRenderer(col, new Emperor.BOS.Default());
				}
			}
			catch(e)
			{
				EmpDebug("SetupTableLookAndFeel: " + e);
			}
		},
	}
});
// $Header: /Home/Emperor/Emperor.BOS.Renderer.js,v 1.1 2012/11/10 02:45:15 Aare Exp $

// Urthadar's LoU BOS Table Renderers (tweaked).

qx.Class.define("Emperor.BOS.Default",
{
	extend : qx.ui.table.cellrenderer.Default,
	construct : function(align, color, style, weight)
	{
		try
		{
			this.base(arguments);
			this.__defaultTextAlign = align || "";
			this.__defaultColor = color || Emperor.BOS.Const.TABLE_DEFAULT_COLOR;
			this.__defaultFontStyle = style || "";
			this.__defaultFontWeight = weight || "";
		}
		catch(e)
		{
			EmpDebug("Default: " + e);
		}

	},
	members :
	{
		__defaultTextAlign : null,
		__defaultColor : null,
		__defaultFontStyle : null,
		__defaultFontWeight : null,
		_getCellStyle : function(cellInfo)
		{
			try
			{
				var tableModel = cellInfo.table.getTableModel();

				var style =
				{
					"text-align" : this.__defaultTextAlign,
					"color" : this.__defaultColor,
					"font-style" : this.__defaultFontStyle,
					"font-weight" : this.__defaultFontWeight,
					"border-top" : Emperor.BOS.Const.TABLE_BORDER
				};

				var id = tableModel.getValueById("id", cellInfo.row);
				if(id == "Total")
				{
					style["border-top"] = Emperor.BOS.Const.TABLE_SUMMARY_ROW_BORDER;
				}
				else if(qx.lang.Type.isNumber(id) && id < 0)
				{
					style["border-bottom"] = Emperor.BOS.Const.TABLE_SUMMARY_ROW_BORDER;
				}

				var styleString = [];
				for(var key in style)
				{
					if(style[key])
					{
						styleString.push(key, ":", style[key], ";");
					}
				}
				return styleString.join("");
			}
			catch(e)
			{
				EmpDebug("Default.GetCellStyle: " + e);
			}
		}
	}
});

qx.Class.define("Emperor.BOS.ClickableLook",
{
	extend : Emperor.BOS.Default,
	members :
	{
		_getContentHtml : function(cellInfo)
		{
			try
			{
				var value = cellInfo.value;
				if(value === null)
				{
					cellInfo.value = "";
				}
				else
				{
					cellInfo.value = this.clickableLook(cellInfo.value);
				}
				return this._formatValue(cellInfo);
			}
			catch(e)
			{
				EmpDebug("GetHTML: " + e);
			}
		},
		clickableLook : function(s)
		{
			return Emperor.BOS.Util.makeClickable(s, "#81adff");
		}
	}
});

qx.Class.define("Emperor.BOS.Resource",
{
	extend : qx.ui.table.cellrenderer.Default,
	construct : function(align, color, style, weight, maxColumn, freeColumn, warningLevel, errorLevel)
	{
		try
		{
			this.base(arguments);
			this.__defaultTextAlign = align || "";
			this.__defaultColor = color || Emperor.BOS.Const.RESOURCE_GREEN;
			this.__defaultFontStyle = style || "";
			this.__defaultFontWeight = weight || "";
			this._maxColumn = maxColumn;
			this._freeColumn = freeColumn;
			this._warningLevel = warningLevel;
			this._errorLevel = errorLevel;
		}
		catch(e)
		{
			EmpDebug("Resource: " + e);
		}
	},
	members :
	{
		__defaultTextAlign : null,
		__defaultColor : null,
		__defaultFontStyle : null,
		__defaultFontWeight : null,
		_maxColumn : null,
		_freeColumn : null,
		_warningLevel : null,
		_errorLevel : null,

		_getCellStyle : function(cellInfo)
		{
			try
			{
				var tableModel = cellInfo.table.getTableModel();

				var style =
				{
					"text-align" : this.__defaultTextAlign,
					"color" : this.__defaultColor,
					"font-style" : this.__defaultFontStyle,
					"font-weight" : this.__defaultFontWeight,
					"border-top" : Emperor.BOS.Const.TABLE_BORDER
				};

				var maxValue = tableModel.getValueById(this._maxColumn, cellInfo.row);
				var freeValue = tableModel.getValueById(this._freeColumn, cellInfo.row);

				if(freeValue != null && maxValue != null && maxValue > 0)
				{
					if(freeValue <= 0)
					{
						style["color"] = Emperor.BOS.Const.RESOURCE_RED;
					}
					else
					{
						var mod = freeValue / maxValue;
						if(mod < 0.2)
						{
							style["color"] = Emperor.BOS.Const.RESOURCE_YELLOW;
						}
					}
				}

				var id = tableModel.getValueById("id", cellInfo.row);
				if(id == "Total")
				{
					style["border-top"] = Emperor.BOS.Const.TABLE_SUMMARY_ROW_BORDER;
				}
				var styleString = [];
				for(var key in style)
				{
					if(style[key])
					{
						styleString.push(key, ":", style[key], ";");
					}
				}
				return styleString.join("");
			}
			catch(e)
			{
				EmpDebug("Resource.GetCellStyle: " + e);
			}
		}
	}
});
// $Header: /Home/Emperor/Emperor.BOS.ZoomSlider.js,v 1.2 2012/11/10 02:46:20 Aare Exp $

// Urthadar's LoU BOS Zoom Slider. (Unused, scroll wheel does the same thing)

qx.Class.define("Emperor.BOS.ZoomSlider",
{
	extend : qx.core.Object,
	construct : function()
	{
		try
		{
			var zoomSlider = new qx.ui.form.Slider().set(
			{
				minimum : 25,
				maximum : 200,
				singleStep : 5,
				pageStep : 1,
				value : 100,
				width : 200
			});
			zoomSlider.addListener("changeValue", function(e)
			{
				this.setZoom(zoomSlider.getValue() / 100.0);
			}, this);
			var btnZoomReset = new qx.ui.form.Button("R");
			btnZoomReset.addListener("execute", function(e)
			{
				this.setZoom(1);
				zoomSlider.setValue(100);
			}, this);
			var zoomBox = new qx.ui.container.Composite().set(
			{
				width : 250,
				height : 28
			});
			zoomBox.setLayout(new qx.ui.layout.HBox(0));
			zoomBox.add(zoomSlider);
			zoomBox.add(btnZoomReset);

			qx.core.Init.getApplication().getDesktop().add(zoomBox,
			{
				left : 400 + 300,
				top : 70,
				right : null
			});
		}
		catch(e)
		{
			EmpDebug("BOS.Zoom.construct: " + e);
		}
	},
	members :
	{
		setZoom : function(zoom)
		{
			try
			{
				// for region and world
				var visMain = ClientLib.Vis.VisMain.GetInstance();
				visMain.set_ZoomFactor(zoom);

				// for city view
				// I had to invert the condition for some reason?
				if(!qx.bom.client.Engine.GECKO)
				{
					Emp.a.visMain.scene.domRoot.style.MozTransform = "scale(" + zoom + ")";
					Emp.a.visMain.scene.domRoot.style["overflow"] = "hidden";
				}
				else
				{
					Emp.a.visMain.scene.domRoot.style["zoom"] = zoom;
				}
			}
			catch(e)
			{
				EmpDebug("BOS.Zoom.setZoom: " + e);
			}
		}
	}
});
// $Header: /Home/Emperor/Emperor.BOS.Util.js,v 1.2 2012/11/10 02:45:56 Aare Exp $

// Urthadar's LoU BOS Utility class (tweaked).

qx.Class.define("Emperor.BOS.Util",
{
	type : "singleton",
	extend : qx.core.Object,
	statics :
	{
		// Just create the box, populate() needs to be used
		createCitiesGroupsSelectBox : function()
		{
			var sb = new qx.ui.form.SelectBox().set(
			{
				width : 120,
				height : 28
			});
			sb.setToolTipText("Filter by: <b>city groups</b>");
			return sb;
		},
		// Create and populate city cluster select box
		createCitiesClustersSelectBox : function()
		{
			try
			{
				var sb = new qx.ui.form.SelectBox().set(
				{
					width : 60,
					height : 28
				});
				var cities = webfrontend.data.Player.getInstance().cities;
				sb.setToolTipText("Filter by: <b>clusters</b>");
				var clusters = [];
				for(var cityId in cities)
				{
					var city = cities[cityId];
					var name = city.name;
					if(name.charAt(0) == "C")
						name = name.substr(1);
					name = name.substr(0, 3);
					clusters["c" + name] = true;
				}
				var list = [];
				for(var key in clusters)
				{
					list.push(key.substr(1, 3));
				}
				list.sort();
				sb.add(new qx.ui.form.ListItem("All", null, "A"));
				for(var i = 0; i < list.length; i++)
				{
					sb.add(new qx.ui.form.ListItem(list[i], null, list[i]));
				}
				return sb;
			}
			catch(e)
			{
				EmpDebug("CreateCityClusterSB: " + e);
			}
		},
		// Create and populate the continent box
		createCitiesContinentsSelectBox : function()
		{
			try
			{
				var sb = new qx.ui.form.SelectBox().set(
				{
					width : 60,
					height : 28
				});
				var cities = webfrontend.data.Player.getInstance().cities;
				sb.setToolTipText("Filter by: <b>continents</b>");
				var continents = [];
				for(var cityId in cities)
				{
					var city = cities[cityId];
					var cont = webfrontend.data.Server.getInstance().getContinentFromCoords(city.xPos, city.yPos);
					continents["c" + cont] = true;
				}
				var list = [];
				for(var key in continents)
				{
					if(key.substring != undefined && qx.lang.Type.isString(key))
					{
						var cont = parseInt(key.substring(1), 10);
						if(!isNaN(cont))
						{
							list.push(cont);
						}
					}
				}
				list.sort();
				sb.add(new qx.ui.form.ListItem("All", null, "A"));
				for(var i = 0; i < list.length; i++)
				{
					var cont = list[i];
					sb.add(new qx.ui.form.ListItem(sprintf("C%02d", cont), null, cont));
				}
				return sb;
			}
			catch(e)
			{
				EmpDebug("CreateCityContinentSB: " + e);
			}
		},
		// Populate city group box. Special group - all cities.
		populateCitiesGroupsSelectBox : function(sb)
		{
			try
			{
				if(sb == null)
					return;
				sb.removeAll();
				sb.add(new qx.ui.form.ListItem("All cities", null, "cg"));
				if(webfrontend.data.Player.getInstance().citygroups != undefined)
				{
					var groups = webfrontend.data.Player.getInstance().citygroups;
					for(var i = 0, iCount = groups.length; i < iCount; i++)
					{
						var item = groups[i];
						sb.add(new qx.ui.form.ListItem(item.n, null, "cg" + item.i));
					}
				}
			}
			catch(e)
			{
				EmpDebug("PopCityGroupSB: " + e);
			}
		},
		makeClickable : function(msg, color)
		{
			return qx.lang.String.format("<div style=\"cursor:pointer;color:%1\">%2</div>", [color, msg]);
		},
	}
});
// $Header: /Home/Emperor/Emperor.BOS.SummaryWidget.js,v 1.3 2012/11/10 02:48:06 Aare Exp $

// Urthadar's LoU BOS Summary Window (tweaked).

qx.Class.define("Emperor.BOS.SummaryWidget",
{
	type : "singleton",
	extend : qx.ui.window.Window,
	// implement : [webfrontend.net.IUpdateConsumer],
	construct : function()
	{
		try
		{
			qx.ui.window.Window.call(this);
			this.setLayout(new qx.ui.layout.Dock());

			var maxWidth = qx.bom.Viewport.getWidth(window);
			var maxHeight = qx.bom.Viewport.getHeight(window);
			var pos =
			{
				left : 400,
				top : 150,
				width : Math.max(600, qx.bom.Viewport.getWidth(window) - 420),
				height : 500
			}
			this.set(
			{
				width : pos.width,
				minWidth : 200,
				maxWidth : parseInt(maxWidth * 0.9),
				height : pos.height,
				minHeight : 200,
				maxHeight : parseInt(qx.bom.Viewport.getWidth(window) * 0.9),
				allowMaximize : false,
				allowMinimize : false,
				showMaximize : false,
				showMinimize : false,
				showStatusbar : false,
				showClose : true,
				caption : ("Summary"),
				resizeSensitivity : 7,
				contentPadding : 0
			});
			this.moveTo(pos.left, pos.top);
			this.tabView = new qx.ui.tabview.TabView().set(
			{
				marginRight : 8,
				marginBottom : 6,
				marginLeft : 8,
				marginTop : 4,
				contentPadding : 5
			});
			this.tabView.setAppearance("tabview");

			this.resourcesTab = new Emperor.BOS.ResourceSummary();
			this.tabView.add(this.resourcesTab);

			// this.tabView.addListener("changeSelection", this.onChangeTab, this);

			this.add(this.tabView);
		}
		catch(e)
		{
			EmpDebug("SummaryWidget.construct: " + e);
		}
	},
	statics :
	{
		_defaultSortComparatorInsensitiveAscending : function(row1, row2)
		{
			// summary row always at the bottom
			if(row1[0] == "Total")
			{
				return 1;
			}

			if(row2[0] == "Total")
			{
				return -1;
			}

			var obj1 = null;
			if(row1[arguments.callee.columnIndex] != null)
				obj1 = (row1[arguments.callee.columnIndex].toLowerCase ? row1[arguments.callee.columnIndex].toLowerCase() : row1[arguments.callee.columnIndex]);

			var obj2 = null;
			if(row2[arguments.callee.columnIndex] != null)
				obj2 = (row2[arguments.callee.columnIndex].toLowerCase ? row2[arguments.callee.columnIndex].toLowerCase() : row2[arguments.callee.columnIndex]);

			var n1 = qx.lang.Type.isNumber(obj1);
			var n2 = qx.lang.Type.isNumber(obj2);
			if(n1 && n2)
			{
				var result = isNaN(obj1) ? isNaN(obj2) ? 0 : 1 : isNaN(obj2) ? -1 : null;
				if(result != null)
				{
					if(result == 0)
					{
						return row1[0] > row2[0] ? 1 : -1;
					}
					return result;
				}
			}

			if(n1 && !n2)
			{
				return -1;
			}

			if(!n1 && n2)
			{
				return 1;
			}

			if(obj1 > obj2)
			{
				return 1;
			}
			else if(obj1 < obj2)
			{
				return -1;
			}

			return row1[0] > row2[0] ? 1 : -1;
		},
		_defaultSortComparatorInsensitiveDescending : function(row1, row2)
		{
			// summary row always at the bottom
			if(row1[0] == "Total")
			{
				return 1;
			}
			if(row2[0] == "Total")
			{
				return -1;
			}

			var obj1 = null;
			if(row1[arguments.callee.columnIndex] != null)
				obj1 = (row1[arguments.callee.columnIndex].toLowerCase ? row1[arguments.callee.columnIndex].toLowerCase() : row1[arguments.callee.columnIndex]);

			var obj2 = null;
			if(row2[arguments.callee.columnIndex] != null)
				obj2 = (row2[arguments.callee.columnIndex].toLowerCase ? row2[arguments.callee.columnIndex].toLowerCase() : row2[arguments.callee.columnIndex]);

			var n1 = qx.lang.Type.isNumber(obj1);
			var n2 = qx.lang.Type.isNumber(obj2);
			if(n1 && n2)
			{
				var result = isNaN(obj1) ? isNaN(obj2) ? 0 : 1 : isNaN(obj2) ? -1 : null;
				if(result != null)
				{
					if(result == 0)
					{
						return row1[0] < row2[0] ? 1 : -1;
					}
				}
			}

			if(n1 && !n2)
			{
				return -1;
			}

			if(!n1 && n2)
			{
				return 1;
			}

			if(obj1 < obj2)
				return 1;
			if(obj1 > obj2)
				return -1;

			return row1[0] > row2[0] ? 1 : -1;
		}
	},
	members :
	{
		tabView : null,
		resourcesTab : null,
		showSummary : function()
		{
			try
			{
				if(this.isVisible())
				{
					this.close();
				}
				else
				{
					this.open();
					// this.updateView();
				}
			}
			catch(e)
			{
				EmpDebug("ShowSummary: " + e);
			}
		},
	}
});
// $Header: /Home/Emperor/Emperor.BOS.SummaryPage.js,v 1.2 2012/11/10 02:48:35 Aare Exp $

// Urthadar's LoU BOS City Summary Page base class (tweaked).

qx.Class.define("Emperor.BOS.SummaryPage",
{
	extend : qx.ui.tabview.Page,
	construct : function()
	{
		qx.ui.tabview.Page.call(this);
	},
	members :
	{
		_table : null,
		_tableModel : null,
		_addBlankValuesToRow : function(row, tableModel)
		{
			//it seems that case insensitive doesnt handle well null values so it's safer to populate row with empty values
			for(var col = 0; col < tableModel.getColumnCount(); col++)
			{
				row[tableModel.getColumnId(col)] = "";
			}
		},
		updateView : function()
		{
			try
			{
				if(!this.isSeeable())
				{
					//console.log("Some view is hidden, nothing to update");
					return;
				}

				if(this._tableModel == null)
				{
					return;
				}
				var prevSortColumnIndex = this._tableModel.getSortColumnIndex();
				var isSortAscending = this._tableModel.isSortAscending();
				this._tableModel.setDataAsMapArray(this.createRowData(), false);
				if(prevSortColumnIndex >= 0)
				{
					this._tableModel.sortByColumn(prevSortColumnIndex, isSortAscending);
				}
			}
			catch(e)
			{
				EmpDebug("UpdateView: " + e);
			}
		},
		_setupSorting : function(tableModel)
		{
			try
			{
				tableModel.setCaseSensitiveSorting(false);

				var compare =
				{
					ascending : Emperor.BOS.SummaryWidget._defaultSortComparatorInsensitiveAscending,
					descending : Emperor.BOS.SummaryWidget._defaultSortComparatorInsensitiveDescending
				};

				for(var col = 0; col < tableModel.getColumnCount(); col++)
				{
					tableModel.setSortMethods(col, compare);
				}
			}
			catch(e)
			{
				EmpDebug("SetupSorting: " + e);
			}
		}
	}
});
// $Header: /Home/Emperor/Emperor.BOS.ResourceSummary.js,v 1.6 2012/11/12 03:57:24 Aare Exp $

// Urthadar's LoU BOS City Summary Tab (tweaked).

qx.Class.define("Emperor.BOS.ResourceSummary",
{
	extend : Emperor.BOS.SummaryPage,
	implement : [webfrontend.net.IUpdateConsumer],
	construct : function()
	{
		try
		{
			Emperor.BOS.SummaryPage.call(this);
			this.addListener("appear", this.listenerAppear, this);
			this.addListener("disappear", this.listenerDisappear, this);
			this.setLabel("Resources");
			this.setLayout(new qx.ui.layout.VBox(10));
			this.add(this.createToolBar());
			this._tableModel = new qx.ui.table.model.Simple();

			this.columns = ["ID", "Name", "Reference",
			// Wood cells 70 50
			"Wood", "Wood/h",
			// Rock cells 70 50
			"Rock", "Rock/h",
			// Iron cells 70 50
			"Iron", "Iron/h",
			// Food cells 70 70
			"Food", "Food/h",
			// Gold 50
			"Gold/h",
			// Queues 40 40
			"Build", "Units",
			// Trade 70 70
			"Carts", "Ships"];
			this._tableModel.setColumns(this.columns);

			this._setupSorting(this._tableModel);
			this._tableModel.sortByColumn(1, true);

			this.table = new Emperor.BOS.Table(this._tableModel);
			this.table.setColumnVisibilityButtonVisible(false);
			this.table.addListener("cellClick", this.handleCellClick, this);

			var columnModel = this.table.getTableColumnModel();
			columnModel.setColumnVisible(0, false);
			// Name, reference
			columnModel.setColumnWidth(1, 55);
			columnModel.setColumnWidth(2, 65);
			// Wood
			columnModel.setColumnWidth(3, 70);
			columnModel.setColumnWidth(4, 55);
			// Rock
			columnModel.setColumnWidth(5, 70);
			columnModel.setColumnWidth(6, 50);
			// Iron
			columnModel.setColumnWidth(7, 70);
			columnModel.setColumnWidth(8, 50);
			// Food
			columnModel.setColumnWidth(9, 70);
			columnModel.setColumnWidth(10, 60);
			// Gold
			columnModel.setColumnWidth(11, 50);
			// Build, units
			columnModel.setColumnWidth(12, 60);
			columnModel.setColumnWidth(13, 60);
			// Carts, ships
			columnModel.setColumnWidth(14, 80);
			columnModel.setColumnWidth(15, 60);

			columnModel.setDataCellRenderer(1, new Emperor.BOS.ClickableLook());
			columnModel.setDataCellRenderer(2, new Emperor.BOS.ClickableLook());

			// var foodPerHourRenderer = new qx.ui.table.cellrenderer.Conditional("right", "", "", "");
			// foodPerHourRenderer.addNumericCondition("<", 0, null, bos.Const.RESOURCE_RED, null, null);
			// foodPerHourRenderer.addNumericCondition(">=", 0, null, bos.Const.RESOURCE_GREEN, null, null);
			// columnModel.setDataCellRenderer(columnsBeforeWood + (4 - 1) * columnsPerRes + 1, foodPerHourRenderer);

			this.add(this.table,
			{
				flex : 1
			});
		}
		catch(e)
		{
			EmpDebug("ResourceSummary.construct: " + e);
		}
	},
	members :
	{
		sbCityGroup : null,
		sbContinents : null,
		table : null,
		_tableModel : null,
		__first : false,
		__second : false,
		cities : null,
		columns : null,
		listenerAppear : function()
		{
			try
			{
				EmpDebug("Appear");
				this.cities =
				{
				};
				this.__first = true;
				this.__second = true;
				var player = webfrontend.data.Player.getInstance();
				player.addListener("changedCityGroups", this.listenerChangedCityGroups, this);
				player.addListener("changeVersion", this.listenerChangeVersion, this);
				this.listenerChangedCityGroups();
				this.listenerChangeVersion();
				webfrontend.base.Timer.getInstance().addListener("uiTick", this.onTick, this);
				webfrontend.net.UpdateManager.getInstance().addConsumer("RESO", this);
			}
			catch(e)
			{
				EmpDebug("ResourceSummary.appear: " + e);
			}
		},
		listenerDisappear : function()
		{
			try
			{
				EmpDebug("Disappear");
				var player = webfrontend.data.Player.getInstance();
				player.removeListener("changedCityGroups", this.listenerChangedCityGroups, this);
				player.removeListener("changeVersion", this.listenerChangeVersion, this);
				webfrontend.base.Timer.getInstance().removeListener("uiTick", this.onTick, this);
				webfrontend.net.UpdateManager.getInstance().removeConsumer("RESO", this);
			}
			catch(e)
			{
				EmpDebug("ResourceSummary.disappear: " + e);
			}
		},
		listenerChangedCityGroups : function()
		{
			try
			{
				EmpDebug("ResChangeGroups");
				// this.__gC = webfrontend.gui.Util.createUpdateCityGroupsBox(this.__gC);
				// this.__Cy();
			}
			catch(e)
			{
				EmpDebug("ResChangeGroups: " + e);
			}
		},
		listenerChangeVersion : function()
		{
			try
			{
				var player = webfrontend.data.Player.getInstance();
				// This is where lost cities are removed.
				if(player.cities != null && this.cities != null)
				{
					for(var fn in this.cities)
					{
						if(!player.cities.hasOwnProperty(fn))
						{
							delete this.cities[fn];
						}
					}
				}
			}
			catch(e)
			{
				EmpDebug("ResChangeVersion: " + e);
			}
		},
		getRequestDetails : function(dH)
		{
			try
			{
				if(this.__first)
				{
					this.__first = false;
					return "a";
				}
				else if(this.__second)
				{
					this.__second = false;
					return "b";
				}
				return "";
			}
			catch(e)
			{
				EmpDebug("ResGetDetails: " + e);
			}
		},
		dispatchResults : function(results)
		{
			try
			{
				if(results == null || results.length == 0)
					return;
				var serverTime = webfrontend.data.ServerTime.getInstance();
				var serverStep = serverTime.getServerStep();
				var player = webfrontend.data.Player.getInstance();
				// For each city:
				// i - city id
				// r - resource array
				// g - gold production
				// Resource array: 4 elements, each:
				// i - resource type
				// b - resources present
				// s - age of the value in server ticks, current amount
				//     needs to be compensated using this number
				// d - gain every second
				// m - max storage
				// t - trade incoming
				// o - trade offers
				// This is where found cities are added.
				for(var i = 0; i < results.length; i++)
				{
					var cityRes = results[i];
					if(player.cities.hasOwnProperty(cityRes.i))
					{
						var cityData =
						{
							id : cityRes.i,
							name : player.cities[cityRes.i].name,
							ref : player.cities[cityRes.i].reference,
							gold : cityRes.g,
							res : []
						};
						for(var j = 0; j < 4; j++)
						{
							var type = cityRes.r[j].i;
							cityData.res[type] = cityRes.r[j];
							var resData = cityData.res[type];
							var resStep = serverStep - resData.s;
							var resGain = resData.d;
							var resAmount = resStep * resGain + resData.b;
							resAmount = Math.max(0, Math.min(resAmount, resData.m));
							resData.b = resAmount;
						}
						this.cities[cityRes.i] = cityData;
					}
				}
				this.updateTableData();
			}
			catch(e)
			{
				EmpDebug("ResDispatch: " + e);
			}
		},
		updateTableData : function()
		{
			try
			{
				var tableData = new Array();
				var totalData =
				{
					ID : 0,
					Name : "Total",
					Reference : "",
					Wood : 0,
					"Wood/h" : 0,
					Rock : 0,
					"Rock/h" : 0,
					Iron : 0,
					"Iron/h" : 0,
					Food : 0,
					"Food/h" : 0,
					"Gold/h" : 0,
				};
				for(var i in this.cities)
				{
					var cityData = this.cities[i];
					tableData.push(
					{
						ID : cityData.id,
						Name : cityData.name,
						Reference : cityData.ref,
						Wood : Math.floor(cityData.res[RES_TYPE_WOOD].b),
						"Wood/h" : Math.floor(cityData.res[RES_TYPE_WOOD].d * 3600 + 0.01),
						Rock : Math.floor(cityData.res[RES_TYPE_ROCK].b),
						"Rock/h" : Math.floor(cityData.res[RES_TYPE_ROCK].d * 3600 + 0.01),
						Iron : Math.floor(cityData.res[RES_TYPE_IRON].b),
						"Iron/h" : Math.floor(cityData.res[RES_TYPE_IRON].d * 3600 + 0.01),
						Food : Math.floor(cityData.res[RES_TYPE_FOOD].b),
						"Food/h" : Math.floor(cityData.res[RES_TYPE_FOOD].d * 3600 + 0.01),
						"Gold/h" : Math.floor(cityData.gold * 3600 + 0.01),
					});
					totalData["Wood"] += Math.floor(cityData.res[RES_TYPE_WOOD].b);
					totalData["Wood/h"] += Math.floor(cityData.res[RES_TYPE_WOOD].d * 3600 + 0.01);
					totalData["Rock"] += Math.floor(cityData.res[RES_TYPE_ROCK].b);
					totalData["Rock/h"] += Math.floor(cityData.res[RES_TYPE_ROCK].d * 3600 + 0.01);
					totalData["Iron"] += Math.floor(cityData.res[RES_TYPE_IRON].b);
					totalData["Iron/h"] += Math.floor(cityData.res[RES_TYPE_IRON].d * 3600 + 0.01);
					totalData["Food"] += Math.floor(cityData.res[RES_TYPE_FOOD].b);
					totalData["Food/h"] += Math.floor(cityData.res[RES_TYPE_FOOD].d * 3600 + 0.01);
					totalData["Gold/h"] += Math.floor(cityData.gold * 3600 + 0.01);
				}
				var asc = this._tableModel.isSortAscending();
				var col = this._tableModel.getSortColumnIndex();
				this._tableModel.setDataAsMapArray(tableData, false, false);
				this._tableModel.sortByColumn(col, asc);
				// Sorted, now do the totals
				var allData = this._tableModel.getDataAsMapArray();
				allData.push(totalData);
				this._tableModel.setDataAsMapArray(allData, false, false);
			}
			catch(e)
			{
				EmpDebug("UpdateTableData: " + e);
			}
		},
		handleCellClick : function(e)
		{
			try
			{
				if(e.getColumn() <= 2)
				{
					var rowData = this._tableModel.getRowData(e.getRow());
					var cityid = rowData[0];
					var app = qx.core.Init.getApplication();
					var cities = webfrontend.data.Player.getInstance().cities;
					if(!cities.hasOwnProperty(cityid))
						return;
					var mapMode = app.visMain.getMapMode();
					switch(mapMode)
					{
					case 'w':
						webfrontend.data.City.getInstance().setRequestId(cityid);
						break;
					case 'r':
						webfrontend.data.City.getInstance().setRequestId(cityid);
						break;
					case 'c':
						webfrontend.gui.Util.showMapModeViewPos('c', cityid, -1, -1);
						break;
					};
				}
			}
			catch(e)
			{
				EmpDebug("CellClick: " + e);
			}
		},
		onTick : function()
		{
			try
			{
				for(row in this.cities)
				{
					var rowData = this.cities[row];
					rowData.res[1].b += rowData.res[1].d;
					rowData.res[2].b += rowData.res[2].d;
					rowData.res[3].b += rowData.res[3].d;
					rowData.res[4].b += rowData.res[4].d;
				}
				this.updateTableData();
			}
			catch(e)
			{
				EmpDebug("ResTick: " + e);
			}
		},
		createToolBar : function()
		{
			var toolBar = new qx.ui.groupbox.GroupBox();
			toolBar.setLayout(new qx.ui.layout.Flow(10, 10));

			this.sbCityGroup = Emperor.BOS.Util.createCitiesGroupsSelectBox();
			Emperor.BOS.Util.populateCitiesGroupsSelectBox(this.sbCityGroup);
			this.sbCityGroup.addListener("changeSelection", this.updateView, this);
			toolBar.add(this.sbCityGroup);

			this.sbContinents = Emperor.BOS.Util.createCitiesContinentsSelectBox();
			this.sbContinents.addListener("changeSelection", this.updateView, this);
			toolBar.add(this.sbContinents);

			this.sbClusters = Emperor.BOS.Util.createCitiesClustersSelectBox();
			this.sbClusters.addListener("changeSelection", this.updateView, this);
			toolBar.add(this.sbClusters);

			return toolBar;
		},
	}
});
// $Header: /Home/Emperor/Emperor.TooltipTweak.js,v 1.3 2012/09/30 01:00:10 Aare Exp $

// LoU Tooltip Tweak by Janko Radusinovic and OzGoober.

qx.Class.define("Emperor.TooltipTweak",
{
	extend : qx.core.Object,
	construct : function()
	{
		try
		{
			Emp.a.worldViewToolTip.addListener("appear", this.toolTipAppear, this);
			this.r = webfrontend.res.Main.getInstance();

			this.cavT = this.r.attackTypes["2"].dn;
			this.infT = this.r.attackTypes["1"].dn;
			this.magT = this.r.attackTypes["4"].dn;
			this.artT = this.r.attackTypes["3"].dn;

			this.dragC = this.r.dungeons["6"].dn.charAt(0);
			this.hydrC = this.r.dungeons["8"].dn.charAt(0);
			this.moloC = this.r.dungeons["7"].dn.charAt(0);
			this.octyC = this.r.dungeons["12"].dn.charAt(0);

			this.forstC = this.r.dungeons["5"].dn.charAt(0);
			this.mountC = this.r.dungeons["4"].dn.charAt(0);
			this.hillC = this.r.dungeons["3"].dn.charAt(0);
			this.seaC = this.r.dungeons["2"].dn.charAt(0);
		}
		catch(e)
		{
			EmpDebug("TooltipTweak.construct: " + e);
		}
	},
	members :
	{
		dungeons :
		{
			"M" :
			{
				"1" : [0, 0],
				"2" : [0, 0],
				"3" : [37, 2500],
				"4" : [0, 0],
				"5" : [0, 0],
				"6" : [0, 0],
				"7" : [0, 0],
				"8" : [0, 0],
				"9" : [3200, 320000],
				"10" : [3800, 460000]
			},
			"H" :
			{
				"1" : [0, 0],
				"2" : [0, 0],
				"3" : [0, 0],
				"4" : [32, 7200],
				"5" : [0, 0],
				"6" : [400, 48000],
				"7" : [0, 0],
				"8" : [1200, 160000],
				"9" : [2150, 280000],
				"10" : [0, 0]
			},
			"F" :
			{
				"1" : [0, 0],
				"2" : [0, 0],
				"3" : [0, 0],
				"4" : [0, 0],
				"5" : [0, 0],
				"6" : [0, 0],
				"7" : [0, 0],
				"8" : [0, 0],
				"9" : [2100, 280000],
				"10" : [2600, 400000]
			},
			"S" :
			{
				"1" : [0, 0],
				"2" : [0, 0],
				"3" : [0, 0],
				"4" : [0, 0],
				"5" : [0, 0],
				"6" : [0, 0],
				"7" : [0, 0],
				"8" : [0, 0],
				"9" : [1200, 280000],
				"10" : [0, 0]
			}
		},
		// zerk, ranger, knight, mage, warlock, paladin, sloop, galleon
		bosses :
		{
			"H" :
			{
				"1" : [34, 56, 28, 42, 36, 21, 0, 0],
				"2" : [200, 334, 167, 250, 215, 125, 0, 0],
				"3" : [1360, 2267, 1112, 1667, 1429, 834, 0, 0],
				"4" : [2640, 4400, 2223, 3334, 2858, 1667, 0, 0],
				"5" : [6640, 11067, 5556, 8334, 7143, 4167, 0, 0],
				"6" : [10000, 16667, 8334, 12500, 10715, 6250, 0, 0],
				"7" : [13600, 22667, 11112, 16667, 14286, 8334, 0, 0],
				"8" : [20000, 33334, 16667, 25000, 21429, 12500, 0, 0],
				"9" : [30000, 50000, 25000, 37500, 32143, 18750, 0, 0],
				"10" : [40000, 66667, 33334, 50000, 42858, 25000, 0, 0]
			},
			"M" :
			{
				"1" : [50, 84, 28, 42, 24, 14, 0, 0],
				"2" : [300, 500, 167, 250, 143, 84, 0, 0],
				"3" : [2000, 3334, 1112, 1667, 972, 567, 0, 0],
				"4" : [4000, 6667, 2223, 3334, 1886, 1100, 0, 0],
				"5" : [10000, 16667, 5556, 8334, 4743, 2767, 0, 0],
				"6" : [15000, 25000, 8334, 12500, 7143, 4167, 0, 0],
				"7" : [20000, 33334, 11112, 16667, 9715, 5667, 0, 0],
				"8" : [30000, 50000, 16667, 25000, 14286, 8334, 0, 0],
				"9" : [45000, 75000, 25000, 37500, 21429, 12500, 0, 0],
				"10" : [60000, 100000, 33334, 50000, 28572, 16667, 0, 0],
			},
			"D" :
			{
				"1" : [50, 84, 19, 28, 36, 21, 0, 0],
				"2" : [300, 500, 112, 167, 215, 125, 0, 0],
				"3" : [2000, 3334, 756, 1134, 1429, 834, 0, 0],
				"4" : [4000, 6667, 1467, 2200, 2858, 1667, 0, 0],
				"5" : [10000, 16667, 3689, 5534, 7143, 4167, 0, 0],
				"6" : [15000, 25000, 5556, 8334, 10715, 6250, 0, 0],
				"7" : [20000, 33334, 7556, 11334, 14286, 8334, 0, 0],
				"8" : [30000, 50000, 11112, 16667, 21429, 12500, 0, 0],
				"9" : [45000, 75000, 16667, 25000, 32143, 18750, 0, 0],
				"10" : [60000, 100000, 22223, 33334, 42858, 25000, 0, 0],
			},
			"O" :
			{
				"1" : [50, 84, 28, 42, 36, 21, 2, 1],
				"2" : [300, 500, 167, 250, 215, 125, 9, 1],
				"3" : [2000, 3334, 1112, 1667, 1429, 834, 57, 6],
				"4" : [4000, 6667, 2223, 3334, 2858, 1667, 110, 11],
				"5" : [10000, 16667, 5556, 8334, 7143, 4167, 277, 28],
				"6" : [15000, 25000, 8334, 12500, 10715, 6250, 417, 42],
				"7" : [20000, 33334, 11112, 16667, 14286, 8334, 567, 57],
				"8" : [30000, 50000, 16667, 25000, 21429, 12500, 834, 84],
				"9" : [45000, 75000, 25000, 37500, 32143, 18750, 1250, 125],
				"10" : [60000, 100000, 33334, 50000, 42858, 25000, 1667, 167],
			}
		},
		bossLoot : [500, 3000, 20000, 40000, 100000, 150000, 200000, 300000, 450000, 600000],
		dungeonKill : [32, 100, 200, 1500, 3000, 5685, 11728, 19821, 36000, 44138],
		cavT : null,
		infT : null,
		magT : null,
		artT : null,
		dragC : null,
		hydrC : null,
		moloC : null,
		octyC : null,
		forstC : null,
		mountC : null,
		hillC : null,
		seaC : null,
		r : null,
		toolTipAppear : function()
		{
			try
			{
				var tip = Emp.a.worldViewToolTip;
				var mode = tip.getMode();
				if(mode == 'c')
				{
					// City mode, do nothing for now
				}
				else
				{
					this.regionWorldTooltip(tip);
				}
			}
			catch(e)
			{
				EmpDebug("TooltipTweak.appear: " + e);
			}
		},
		regionWorldTooltip : function(tip)
		{
			try
			{
				var text = tip.getLabel();
				if(text)
				{
					if(this.check(text, "<table cellspacing=\"0\"><tr><td width=\"75\">Type:"))
					{
						this.dungeonTooltip(tip, text);
					}
					if(this.check(text, "<table cellspacing=\"0\"><tr><td width=\"75\">Name:"))
					{
						this.bossTooltip(tip, text);
					}
				}
			}
			catch(e)
			{
				EmpDebug("TooltipTweak.rwTooltip: " + e);
			}
		},
		check : function(string, start)
		{
			return string.substr(0, start.length) == start;
		},
		dungeonTooltip : function(tip, text)
		{
			try
			{
				var pos = text.indexOf("Type:") + 5 + 5 + 4;
				var dungeonType = text.charAt(pos);
				pos = text.indexOf("Level:") + 6 + 5 + 4;
				var level = text.charAt(pos);
				if(text.charAt(pos + 1) == '0')
					level = "10";
				pos = text.indexOf("Progress:") + 9 + 5 + 4;
				var progress = text.charAt(pos++);
				while(text.charAt(pos) != '%')
				{
					progress += text.charAt(pos++);
				}
				var multiplier = (1.00 + progress / 50.00);
				var mRec = multiplier + (3 - multiplier) / 4;

				var q10 = webfrontend.gui.Util.formatNumbers(Math.round(this.dungeonKill[parseInt(level) - 1] * multiplier));
				var q5 = webfrontend.gui.Util.formatNumbers(Math.round(this.dungeonKill[parseInt(level) - 1] * multiplier * 2));
				var q15 = webfrontend.gui.Util.formatNumbers(Math.round(this.dungeonKill[parseInt(level) - 1] * multiplier / 1.5));
				var q20 = webfrontend.gui.Util.formatNumbers(Math.round(this.dungeonKill[parseInt(level) - 1] * multiplier / 2));
				var q1000 = webfrontend.gui.Util.formatNumbers(Math.round(this.dungeonKill[parseInt(level) - 1] * multiplier / 100));
				var q1500 = webfrontend.gui.Util.formatNumbers(Math.round(this.dungeonKill[parseInt(level) - 1] * multiplier / 150));
				var q3000 = webfrontend.gui.Util.formatNumbers(Math.round(this.dungeonKill[parseInt(level) - 1] * multiplier / 300));

				var q10Max = webfrontend.gui.Util.formatNumbers(Math.round(this.dungeonKill[parseInt(level) - 1] * 3));
				var q5Max = webfrontend.gui.Util.formatNumbers(Math.round(this.dungeonKill[parseInt(level) - 1] * 3 * 2));
				var q15Max = webfrontend.gui.Util.formatNumbers(Math.round(this.dungeonKill[parseInt(level) - 1] * 3 / 1.5));
				var q20Max = webfrontend.gui.Util.formatNumbers(Math.round(this.dungeonKill[parseInt(level) - 1] * 3 / 2));
				var q1000Max = webfrontend.gui.Util.formatNumbers(Math.round(this.dungeonKill[parseInt(level) - 1] * 3 / 100));
				var q1500Max = webfrontend.gui.Util.formatNumbers(Math.round(this.dungeonKill[parseInt(level) - 1] * 3 / 150));
				var q3000Max = webfrontend.gui.Util.formatNumbers(Math.round(this.dungeonKill[parseInt(level) - 1] * 3 / 300));

				var q10Rec = webfrontend.gui.Util.formatNumbers(Math.round(this.dungeonKill[parseInt(level) - 1] * mRec));
				var q5Rec = webfrontend.gui.Util.formatNumbers(Math.round(this.dungeonKill[parseInt(level) - 1] * mRec * 2));
				var q15Rec = webfrontend.gui.Util.formatNumbers(Math.round(this.dungeonKill[parseInt(level) - 1] * mRec / 1.5));
				var q20Rec = webfrontend.gui.Util.formatNumbers(Math.round(this.dungeonKill[parseInt(level) - 1] * mRec / 2));
				var q1000Rec = webfrontend.gui.Util.formatNumbers(Math.round(this.dungeonKill[parseInt(level) - 1] * mRec / 100));
				var q1500Rec = webfrontend.gui.Util.formatNumbers(Math.round(this.dungeonKill[parseInt(level) - 1] * mRec / 150));
				var q3000Rec = webfrontend.gui.Util.formatNumbers(Math.round(this.dungeonKill[parseInt(level) - 1] * mRec / 300));

				var sHdr = '<table cellspacing="0"><tr><td width="75">';
				var sRow = "</td><td>";
				var pId = sHdr.length;
				var pRow = sRow.length;
				var pDName = pId + pRow + Emp.a.tr("tnf:type:").length;
				var weakT = 'Weakness:';

				var weak = this.getDungeonWeakness(text.charAt(pDName));
				var weakFB = '';
				var weakFE = '';
				if(text.charAt(pDName) == this.forstC)
				{
					weakFB = '<b>';
					weakFE = '</b>';
				}
				var weakMB = '';
				var weakME = '';
				if(text.charAt(pDName) == this.mountC)
				{
					weakMB = '<b>';
					weakME = '</b>';
				}
				var weakHB = '';
				var weakHE = '';
				if(text.charAt(pDName) == this.hillC)
				{
					weakHB = '<b>';
					weakHE = '</b>';
				}

				var lRanger = weakMB + this.r.units["3"].dn + weakME;
				var lBerseker = weakMB + this.r.units["6"].dn + weakME;
				var lMage = weakHB + this.r.units["7"].dn + weakHE;
				var lPaladin = weakFB + this.r.units["10"].dn + weakFE;
				var lKnight = weakFB + this.r.units["11"].dn + weakFE;
				var lWarlock = weakHB + this.r.units["12"].dn + weakHE;
				var lFrigate = this.r.units["15"].dn;
				var lSloop = this.r.units["16"].dn;
				var lWarGaleon = this.r.units["17"].dn;

				var Units5 = ('<NOBR>' + lMage + '</NOBR>').replace(" ", "&nbsp");
				var Units10 = ('<NOBR>' + lBerseker + ',' + lRanger + ',' + lWarlock + '</NOBR>').replace(" ", "&nbsp");
				var Units15 = ('<NOBR>' + lKnight + '</NOBR>').replace(" ", "&nbsp");
				var Units20 = ('<NOBR>' + lPaladin + '</NOBR>').replace(" ", "&nbsp");
				var Units1000 = ('<NOBR>' + lFrigate + '</NOBR>').replace(" ", "&nbsp");
				var Units1500 = ('<NOBR>' + lSloop + '</NOBR>').replace(" ", "&nbsp");
				var Units3000 = ('<NOBR>' + lWarGaleon + '</NOBR>').replace(" ", "&nbsp");

				var sb = new qx.util.StringBuilder(4048);
				if(text.charAt(pDName) == this.seaC)
				{
					sb.add(text, sHdr, weakT, weak, "</td></tr><tr><td><table border=0 color=red><tr><td aling=left>Units**:</td><td>Minimum</td><td>Recomended</td><td>&nbsp;&nbsp;&nbsp;Maximum</td></tr><tr><td>", Units1000, '</td><td align=right>', q1000, '</td><td align=right>', q1000Rec, '</td><td align=right>', q1000Max, '</td></tr><tr><td>', Units1500, '</td><td align=right>', q1500, '</td><td align=right>', q1500Rec, '</td><td align=right>', q1500Max, '</td></tr><tr><td>', Units3000, '</td><td align=right>', q3000, '</td><td align=right>', q3000Rec, '</td><td align=right>', q3000Max, '</td></tr></table>');
				}
				else
				{
					sb.add(text, sHdr, weakT, weak, "</td></tr><tr><td><table border=0 color=red><tr><td aling=left>Units*:</td><td>Minimum</td><td>Recomended</td><td>&nbsp;&nbsp;&nbsp;Maximum</td></tr><tr><td>", Units10, '</td><td align=right>', q10, '</td><td align=right>', q10Rec, '</td><td align=right>', q10Max, '</td></tr><tr><td>', Units15, '</td><td align=right>', q15, '</td><td align=right>', q15Rec, '</td><td align=right>', q15Max, '</td></tr><tr><td>', Units20, '</td><td align=right>', q20, '</td><td align=right>', q20Rec, '</td><td align=right>', q20Max, '</td></tr><tr><td>', Units5, '</td><td align=right>', q5, '</td><td align=right>', q5Rec, '</td><td align=right>', q5Max, '</td></tr></table></td></tr></table>');
				}
				tip.setLabel(sb.get());
			}
			catch(e)
			{
				EmpDebug("TooltipTweak.dungeonTooltip: " + e);
			}
		},
		getBossWeakness : function(name)
		{
			if(name == this.dragC)
				return this.cavT;
			else if(name == this.hydrC)
				return this.infT;
			else if(name == this.moloC)
				return this.magT;
			else if(name == this.octyC)
				return this.artT;
			else
				return "";
		},
		getDungeonWeakness : function(name)
		{
			if(name == this.forstC)
				return this.cavT;
			else if(name == this.mountC)
				return this.infT;
			else if(name == this.hillC)
				return this.magT;
			else if(name == this.seaC)
				return this.artT;
			else
				return "";
		},
		bossTooltip : function(tip, text)
		{
			try
			{
				var sHdr = '<table cellspacing="0"><tr><td width="75">';
				var sRow = "</td><td>";
				var sCenter = "</td><td align=\"center\">";
				var sRight = "</td><td align=\"right\">";
				var pId = sHdr.length;
				var pRow = sRow.length;
				var pBName = pId + pRow + Emp.a.tr("tnf:name:").length;
				var nextRow = "</td></tr><tr><td>";

				var pos = text.indexOf("Level:") + 6 + 5 + 4;
				var level = text.charAt(pos);
				if(text.charAt(pos + 1) == '0')
					level = "10";

				var weak = this.getBossWeakness(text.charAt(pBName));
				// var lPos = text.indexOf(levelT, pBName) + pLevel;
				// var zergs = webfrontend.gui.Util.formatNumbers(bossKill[parseInt(level) - 1]);
				var sb = new qx.util.StringBuilder(2048);
				// <table cellspacing="0"><tr><td width="75">Name:</td><td>Moloch</td></tr><tr><td>Since:</td><td>Yesterday 21:56:48</td></tr><tr><td>Level:</td><td>8</td></tr><tr><td>Coordinates:</td><td>233:220</td></tr><tr><td>Continent:</td><td>22</td></tr></table>
				sb.add(text, sHdr, "Weakness:", sRow, weak, nextRow);
				sb.add("Troops:", sCenter, "Kill", sCenter, "Loot", nextRow);

				sb.add(weak == "Infantry" ? "<b>" : "", "Berserker", weak == "Infantry" ? "</b>" : "");
				sb.add(sRight, webfrontend.gui.Util.formatNumbers(this.bosses[text.charAt(pBName)][level - 1][0]));
				sb.add(sRight, webfrontend.gui.Util.formatNumbers(this.bossLoot[level - 1] / 10), nextRow);

				sb.add(weak == "Infantry" ? "<b>" : "", "Ranger", weak == "Infantry" ? "</b>" : "");
				sb.add(sRight, webfrontend.gui.Util.formatNumbers(this.bosses[text.charAt(pBName)][level - 1][1]));
				sb.add(sRight, webfrontend.gui.Util.formatNumbers(this.bossLoot[level - 1] / 10), nextRow);

				sb.add(weak == "Cavalry" ? "<b>" : "", "Knight", weak == "Cavalry" ? "</b>" : "");
				sb.add(sRight, webfrontend.gui.Util.formatNumbers(this.bosses[text.charAt(pBName)][level - 1][2]));
				sb.add(sRight, webfrontend.gui.Util.formatNumbers(this.bossLoot[level - 1] / 15), nextRow);

				sb.add(weak == "Magic" ? "<b>" : "", "Mage", weak == "Magic" ? "</b>" : "");
				sb.add(sRight, webfrontend.gui.Util.formatNumbers(this.bosses[text.charAt(pBName)][level - 1][3]));
				sb.add(sRight, webfrontend.gui.Util.formatNumbers(this.bossLoot[level - 1] / 5), nextRow);

				sb.add(weak == "Magic" ? "<b>" : "", "Warlock", weak == "Magic" ? "</b>" : "");
				sb.add(sRight, webfrontend.gui.Util.formatNumbers(this.bosses[text.charAt(pBName)][level - 1][4]));
				sb.add(sRight, webfrontend.gui.Util.formatNumbers(this.bossLoot[level - 1] / 10), nextRow);

				sb.add(weak == "Cavalry" ? "<b>" : "", "Paladin", weak == "Cavalry" ? "</b>" : "");
				sb.add(sRight, webfrontend.gui.Util.formatNumbers(this.bosses[text.charAt(pBName)][level - 1][5]));
				sb.add(sRight, webfrontend.gui.Util.formatNumbers(this.bossLoot[level - 1] / 20), nextRow);

				if(this.bosses[text.charAt(pBName)][level - 1][6] != 0)
				{
					sb.add("<b>", "Sloop", "</b>");
					sb.add(sRight, webfrontend.gui.Util.formatNumbers(this.bosses[text.charAt(pBName)][level - 1][6]));
					sb.add(sRight, webfrontend.gui.Util.formatNumbers(this.bossLoot[level - 1] / 1500), nextRow);

					sb.add("<b>", "War Galleon", "</b>");
					sb.add(sRight, webfrontend.gui.Util.formatNumbers(this.bosses[text.charAt(pBName)][level - 1][7]));
					sb.add(sRight, webfrontend.gui.Util.formatNumbers(this.bossLoot[level - 1] / 3000), nextRow);
				}

				sb.add("</td></tr></table>");
				tip.setLabel(sb.get());
			}
			catch(e)
			{
				EmpDebug("TooltipTweak.bossTooltip: " + e);
			}
		},
	}
});
// $Header: /Home/Emperor/Emperor.Tree.js,v 1.24 2013/02/09 05:17:58 Aare Exp $

// This is the empire tree built of all cities.

qx.Class.define("Emperor.Tree",
{
	type : "singleton",
	extend : qx.core.Object,
	statics :
	{
		waitUntilCityIsSwitched : function()
		{
			try
			{
				if(webfrontend.data.City.getInstance().getName() != Emperor.Tree.getInstance().empireSelection.getLabel())
				{
					window.setTimeout(Emperor.Tree.waitUntilCityIsSwitched, 500);
					return;
				}
				Emperor.Tree.getInstance().timeoutFunction();
				Emperor.Tree.getInstance().timeoutFunction = null;
			}
			catch(e)
			{
				EmpDebug("WaitUntilSwitched: " + e);
			}
		},
	},
	members :
	{
		treeWindow : null,
		empireTree : null,
		cityTree : null,
		empireSelection : null,
		citySelection : null,
		insertButton : null,
		removeButton : null,
		postponed : null,
		timeoutFunction : null,
		CITY_TYPE_NONE : 0,
		CITY_TYPE_HUB : 1,
		CITY_TYPE_TROOP : 2,
		empireWidgetWidth : 500,
		cityWidgetWidth : 250,
		treeWidgetHeight : 625,
		showTree : function()
		{
			try
			{
				this.treeWindow = new webfrontend.ui.CustomWindow("Empire tree");
				this.treeWindow.setLayout(new qx.ui.layout.Basic);
				this.treeWindow.set(
				{
					showMaximize : false,
					showMinimize : false,
					allowMaximize : false,
					resizable : false,
					width : this.empireWidgetWidth + this.cityWidgetWidth + 25,
					height : this.treeWidgetHeight + 80,
				});

				this.empireTree = new qx.ui.tree.Tree().set(
				{
					height : this.treeWidgetHeight,
					width : this.empireWidgetWidth,
				});
				var root = this.configureTreeItem(new qx.ui.tree.TreeFolder(), "Empire", "webfrontend/ui/icons/icon_lou_public_other_world.png");
				root.setOpen(true);
				this.empireTree.setRoot(root);
				this.empireTree.addListener("changeSelection", this.empireChangeSelection, this);
				this.treeWindow.add(this.empireTree,
				{
					top : 0,
					left : 0
				});

				this.cityTree = new qx.ui.tree.Tree().set(
				{
					height : this.treeWidgetHeight,
					width : this.cityWidgetWidth,
				});
				root = this.configureTreeItem(new qx.ui.tree.TreeFolder(), "Cities", "webfrontend/ui/icons/icon_lou_public_other_world.png");
				this.cityTree.setRoot(root);
				root.setOpen(true);
				this.cityTree.addListener("changeSelection", this.cityChangeSelection, this);
				this.treeWindow.add(this.cityTree,
				{
					top : 0,
					left : this.empireWidgetWidth + 5,
				});
				this.insertButton = new qx.ui.form.Button("<").set(
				{
					width : 40,
					height : 20,
					toolTipText : "Click to put the city selected in the right into the empire hierarchy"
				});
				this.insertButton.addListener("execute", this.insertCity, this);
				this.treeWindow.add(this.insertButton,
				{
					top : this.treeWidgetHeight + 5,
					left : 200
				});
				this.removeButton = new qx.ui.form.Button(">").set(
				{
					width : 40,
					height : 20,
					toolTipText : "Click to remove the city selected in the left from the empire hierarchy"
				});
				this.removeButton.addListener("execute", this.removeCity, this);
				this.treeWindow.add(this.removeButton,
				{
					top : this.treeWidgetHeight + 5,
					left : 300
				});

				this.populateWidgets();
				this.validateButtons();
				this.treeWindow.center();
				this.treeWindow.open();
			}
			catch(e)
			{
				EmpDebug("ShowTree: " + e);
			}
		},
		addNode : function(parent, child)
		{
			var added = false;
			var children = parent.getChildren();
			for(var c in children)
			{
				if(children[c].getLabel() > child.getLabel())
				{
					parent.addBefore(child, children[c]);
					added = true;
					break;
				}
			}
			if(!added)
				parent.add(child);
			while(parent)
			{
				parent["_eat_"] += child["_eat_"];
				parent = parent.getParent();
			}
		},
		calcFoodConsumption : function(node)
		{
			return 0;
		},
		configureTreeItem : function(treeItem, label, icon)
		{
			try
			{
				treeItem.addSpacer();
				if( treeItem instanceof qx.ui.tree.TreeFolder)
					treeItem.addOpenButton();
				treeItem.addIcon();
				treeItem.setIcon(arguments.length >= 3 ? icon : "");
				treeItem.addLabel(label);
				treeItem.addWidget(new qx.ui.core.Spacer(),
				{
					flex : 1
				});
				var dist = new qx.ui.basic.Label("Distance");
				if(label != "Empire" && label != "Cities")
					dist.setValue("");
				dist.setWidth(50);
				dist.setTextAlign("right");
				treeItem.addWidget(dist);
				treeItem["_dist_"] = dist;
				var food = new qx.ui.basic.Label("Food/hr");
				var eat = 0;
				if(label != "Empire" && label != "Cities")
				{
					var data = this.getCityData(label);
					eat = Math.round((data.type == this.CITY_TYPE_TROOP) ? data.food / 10000 : 0);
					if(data.cat == "Food Hub")
						eat = -130;
					eat = -eat;
					food = new qx.ui.basic.Label(eat);
				}
				food.setWidth(50);
				food.setTextAlign("right");
				treeItem.addWidget(food);
				treeItem["_food_"] = food;
				treeItem["_eat_"] = eat;
				var space = new qx.ui.basic.Label(" ");
				space.setWidth(10);
				treeItem.addWidget(space);
				return treeItem;
			}
			catch(e)
			{
				EmpDebug("TreeItem: " + e);
			}
		},
		empireChangeSelection : function(e)
		{
			try
			{
				var selection = e.getData();
				if(selection[0])
				{
					this.empireSelection = selection[0];
					this.validateButtons();
					this.recalculateCityDistances();
				}
			}
			catch(e)
			{
				EmpDebug("EmpireChangeSelection: " + e);
			}
		},
		recalculateCityDistances : function()
		{
			try
			{
				var isRoot = this.empireSelection == this.empireTree.getRoot();
				var player = webfrontend.data.Player.getInstance();
				var empCity = player.getCity(this.getCityId(this.empireSelection.getLabel()));
				var ex = empCity.xPos;
				var ey = empCity.yPos;
				var groups = this.cityTree.getRoot().getChildren();
				for(var g in groups)
				{
					var group = groups[g];
					var cities = group.getChildren();
					for(var c in cities)
					{
						var cityNode = cities[c];
						if(isRoot)
						{
							cityNode["_dist_"].setValue("");
						}
						else
						{
							var thisCity = player.getCity(this.getCityId(cityNode.getLabel()));
							var cx = thisCity.xPos;
							var cy = thisCity.yPos;
							var dx = cx - ex;
							var dy = cy - ey;
							var dist = Math.sqrt(dx * dx + dy * dy);
							cityNode["_dist_"].setValue(dist.toFixed(2));
						}
					}
				}
			}
			catch(e)
			{
				EmpDebug("RecalcDist: " + e);
			}
		},
		cityChangeSelection : function(e)
		{
			try
			{
				var selection = e.getData();
				if(selection[0])
				{
					this.citySelection = selection[0];
					this.validateButtons();
					this.switchToCity(this.citySelection.getLabel());
				}
			}
			catch(e)
			{
				EmpDebug("CityChangeSelection: " + e);
			}
		},
		switchToCity : function(name)
		{
			try
			{
				var cityid = this.getCityId(name);
				if(cityid)
				{
					var mapMode = Emp.a.visMain.getMapMode();
					switch(mapMode)
					{
					case 'w':
						webfrontend.data.City.getInstance().setRequestId(cityid);
						break;
					case 'r':
						webfrontend.data.City.getInstance().setRequestId(cityid);
						break;
					case 'c':
						webfrontend.gui.Util.showMapModeViewPos('c', cityid, -1, -1);
						break;
					}
				}
			}
			catch(e)
			{
				EmpDebug("SwitchToCity: " + e);
			}
		},
		// Called when any selection changes. citySelection and empireSelection
		// have selected tree item labels, so we need to check if these labels
		// represent cities that can be added or removed.
		validateButtons : function()
		{
			try
			{
				// If empire selection city exists, we can always remove it
				if(this.empireSelection)
				{
					var name = this.empireSelection.getLabel();
					var id = this.getCityId(name);
					this.removeButton.setEnabled(id != 0);
				}
				else
				{
					this.removeButton.setEnabled(false);
					this.insertButton.setEnabled(false);
				}
				// City selection is a bit harder, if it does not exist we disable the button,
				// but if it exists we need to check city categories to see if insertion makes sense
				if(this.citySelection)
				{
					var cityName = this.citySelection.getLabel();
					id = this.getCityId(cityName);
					if(!id)
					{
						this.insertButton.setEnabled(false);
					}
					else
					{
						// City exists, need to check for valid insertion
						// First, empire selection must exist
						if(!this.empireSelection)
						{
							this.insertButton.setEnabled(false);
						}
						else
						{
							// For all non-hub cities selection must be a hub
							var cityType = this.getCityData(this.citySelection.getLabel()).type;
							var empType = this.getCityData(this.empireSelection.getLabel()).type;
							if(empType == this.CITY_TYPE_NONE && cityType == this.CITY_TYPE_HUB)
								this.insertButton.setEnabled(true);
							else if(empType == this.CITY_TYPE_HUB && cityType != this.CITY_TYPE_NONE)
								this.insertButton.setEnabled(true);
							else
								this.insertButton.setEnabled(false);
						}
					}
				}
				else
				{
					this.insertButton.setEnabled(false);
				}
			}
			catch(e)
			{
				EmpDebug("ValidateButtons: " + e);
			}
		},
		insertCity : function()
		{
			try
			{
				this.citySelection.getParent().remove(this.citySelection);
				this.addNode(this.empireSelection, this.citySelection);
				if(this.empireSelection.getParent())
					this.empireSelection.getParent().setOpen(true);
				this.empireSelection.setOpen(true);
				this.removeButton.setEnabled(false);
				this.insertButton.setEnabled(false);
				var queue = Emperor.Net.CommandQueue.getInstance();
				this.setupReference(queue, this.citySelection.getLabel(), this.empireSelection.getLabel());
				this.setupTradeMin(queue, this.citySelection.getLabel(), this.empireSelection.getLabel());
				queue.sendCommands();
				this.citySelection = null;
				this.populateWidgets();
			}
			catch(e)
			{
				EmpDebug("InsertCity: " + e);
			}
		},
		setupReference : function(queue, thisName, hubName)
		{
			try
			{
				var thisCity = webfrontend.data.Player.getInstance().getCity(this.getCityId(thisName));
				var refSplit = thisCity.reference.split(" ");
				var thisRef = refSplit[0];
				if(hubName)
				{
					var hubId = this.getCityId(hubName);
					var hubRef = hubId == 0 ? "Empire" : webfrontend.data.Player.getInstance().getCity(hubId).reference;
					thisRef += " " + hubRef.split(" ")[0];
				}
				queue.push(
				{
					a : "CityNoteSet",
					p :
					{
						cityid : webfrontend.data.City.getInstance().getId(),
						reference : thisRef,
						text : webfrontend.data.City.getInstance().getText()
					}
				});
				webfrontend.data.Player.getInstance().onCityReferenceChanged(webfrontend.data.City.getInstance().getId(), thisRef);
			}
			catch(e)
			{
				EmpDebug("SetupRef: " + e);
			}
		},
		setupTradeMin : function(queue, thisName, hubName)
		{
			try
			{
				var thisId = this.getCityId(thisName);
				var hubId = this.getCityId(hubName);
				var data = this.getCityData(thisName);
				if(data.type == this.CITY_TYPE_TROOP)
					data.food += 300000;
				var setup = this.setupTradeMinister(thisName, hubName, data.reserve, data.wood, data.rock, data.iron, data.food);
				queue.push(
				{
					a : "CityAutoTradeParamsSet",
					p :
					{
						cityid : webfrontend.data.City.getInstance().getId(),
						autoTradeParams : setup
					}
				});
			}
			catch(e)
			{
				EmpDebug("SetupTradeMin: " + e);
			}
		},
		removeCity : function()
		{
			try
			{
				this.switchToCity(this.empireSelection.getLabel());
				this.timeoutFunction = this.removeCityAfterItIsSelected;
				Emperor.Tree.waitUntilCityIsSwitched();
			}
			catch(e)
			{
				EmpDebug("RemoveCity: " + e);
			}
		},
		removeCityAfterItIsSelected : function()
		{
			try
			{
				this.empireSelection.getParent().remove(this.empireSelection);
				this.removeButton.setEnabled(false);
				this.insertButton.setEnabled(false);
				var queue = Emperor.Net.CommandQueue.getInstance();
				this.setupReference(queue, this.empireSelection.getLabel(), null);
				queue.sendCommands();
				this.empireSelection = null;
				this.populateWidgets();
			}
			catch(e)
			{
				EmpDebug("RemoveAfterSelected: " + e);
			}
		},
		getCityId : function(name)
		{
			var cities = webfrontend.data.Player.getInstance().getCities();
			for(var c in cities)
			{
				if(cities[c].name == name)
					return c;
			}
			return 0;
		},
		populateWidgets : function()
		{
			try
			{
				this.empireTree.getRoot().removeAll();
				this.cityTree.getRoot().removeAll();
				var cities = webfrontend.data.Player.getInstance().getCities();
				this.postponed = new Array();
				for(var c in cities)
				{
					var city = cities[c];
					var ref = city.reference.split(" ");
					if(ref.length == 1)
					{
						// No link to higher city in the reference
						// if(city.name.substr(0, 1) == 'C')
						// EmpDebug("City " + city.name + " - no parent, ref '" + city.reference + "'")
						this.addCityToCityWidget(city);
					}
					else if(ref[1] == "Empire")
					{
						this.addCityToTreeWidget(city, true);
						// if(city.name.substr(0, 1) == 'C')
						// EmpDebug("City " + city.name + " - add to root, ref '" + city.reference + "'")
					}
					else if(!this.getCityName(ref[1]))
					{
						// Link exists, city doesn't
						// if(city.name.substr(0, 1) == 'C')
						// EmpDebug("City " + city.name + " - no parent, ref '" + city.reference + "'")
						this.addCityToCityWidget(city);
					}
					else if(!this.isCityInEmpireWidget(ref[1]))
					{
						// Link exists, city exists, but top city is not in the tree yet
						this.postponed.push(city);
						// if(city.name.substr(0, 1) == 'C')
						// EmpDebug("City " + city.name + " - parent not in tree yet, ref '" + city.reference + "'")
					}
					else
					{
						// Link exists, city exists, now add to the tree
						this.addCityToTreeWidget(city, true);
						// if(city.name.substr(0, 1) == 'C')
						// EmpDebug("City " + city.name + " - add to tree, ref '" + city.reference + "'")
					}
				}
				// EmpDebug("Postponed " + this.postponed.length + " cities");
				// for(var p = 0; p < this.postponed.length; p++)
				// {
				// var post = this.postponed[p];
				// EmpDebug("Postponed " + post.name + " ref '" + post.reference + "'");
				// }
				var added = true;
				while(added && this.postponed.length > 0)
				{
					added = false;
					for(var p = 0; p < this.postponed.length; p++)
					{
						var post = this.postponed[p];
						if(post)
						{
							if(this.addCityToTreeWidget(post, false))
							{
								added = true;
								this.postponed[p] = null;
							}
						}
					}
				}
				for(var p = 0; p < this.postponed.length; p++)
				{
					var post = this.postponed[p];
					if(post)
					{
						// EmpDebug("Postponed and need to go to city widget " + post.name + " ref '" + post.reference + "'");
						this.addCityToCityWidget(post);
					}
				}
				this.updateEmpireFoodConsumption(this.empireTree.getRoot());
			}
			catch(e)
			{
				EmpDebug("PopulateWidgets: " + e);
			}
		},
		updateEmpireFoodConsumption : function(node)
		{
			var children = node.getChildren();
			for(var c in children)
			{
				var child = children[c];
				child["_food_"].setValue(child["_eat_"]);
				this.updateEmpireFoodConsumption(child);
			}
		},
		addCityToCityWidget : function(city)
		{
			try
			{
				var icon = this.getCityData(city.name).icon;
				var cat = this.getCityData(city.name).cat;
				var node = this.createCategory(cat);
				this.addNode(node, this.configureTreeItem(new qx.ui.tree.TreeFile(), city.name, icon));
			}
			catch(e)
			{
				EmpDebug("AddCityToList: " + e);
			}
		},
		setupTradeMinister : function(cityName, feedName, reserve, wood, rock, iron, food)
		{
			try
			{
				var setup =
				{
					dst : true, // same delivery target
					rst : true, // same request target
					dir : false, // disable incoming - false
					dor : false, // disable outgoing - false
					ptr : false, // protect target resources
					rcr : reserve, // reserve carts
					rsr : 0, // reserve ships
					r : new Array()
				};
				var feedId = this.getCityId(feedName);
				setup.r.push(
				{
					t : 1, // resource type
					s : feedId ? 2 : 0, // storage method - 0 store, 1 - purify, 2 - ship
					p : wood, // target resource amount
					r : feedId, // request from
					d : feedId // deliver to
				});
				setup.r.push(
				{
					t : 2, // resource type
					s : feedId ? 2 : 0, // storage method - 0 store, 1 - purify, 2 - ship
					p : rock, // target resource amount
					r : feedId, // request from
					d : feedId // deliver to
				});
				setup.r.push(
				{
					t : 3, // resource type
					s : feedId ? 2 : 0, // storage method - 0 store, 1 - purify, 2 - ship
					p : iron, // target resource amount
					r : feedId, // request from
					d : feedId // deliver to
				});
				setup.r.push(
				{
					t : 4, // resource type
					s : feedId ? 2 : 0, // storage method - 0 store, 1 - purify, 2 - ship
					p : food, // target resource amount
					r : feedId, // request from
					d : feedId // deliver to
				});
				return setup;
			}
			catch(e)
			{
				EmpDebug("SetupTradeMinister: " + e);
			}
		},
		// Reference has the second part of city reference, to be matched
		// with city references
		isCityInEmpireWidget : function(ref)
		{
			var name = this.getCityName(ref);
			return this.findEmpireNode(this.empireTree.getRoot(), name) != null;
		},
		findEmpireNode : function(root, name)
		{
			try
			{
				if(root.getLabel() == name)
				{
					return root;
				}
				if( root instanceof qx.ui.tree.TreeFolder)
				{
					var children = root.getChildren();
					if(children)
					{
						for(var c in children)
						{
							var child = children[c];
							if(child.getLabel() == name)
								return child;
							if(child.getChildren())
							{
								var node = this.findEmpireNode(child, name);
								if(node)
									return node;
							}
						}
					}
				}
				return null;
			}
			catch(e)
			{
				EmpDebug("FindEmpireNode: " + e);
			}
		},
		addCityToTreeWidget : function(city, addToPostponed)
		{
			try
			{
				var node = this.empireTree.getRoot();
				var name = null;
				if(city.reference.split(" ")[1] != "Empire")
				{
					var ref = city.reference.split(" ")[1];
					name = this.getCityName(ref);
					node = this.findEmpireNode(node, name);
				}
				if(node)
				{
					var data = this.getCityData(city.name);
					var newNode = data.type == this.CITY_TYPE_HUB ? new qx.ui.tree.TreeFolder() : new qx.ui.tree.TreeFile();
					this.configureTreeItem(newNode, city.name, data.icon);
					this.addNode(node, newNode);
					node.setOpen(true);
					if(node == this.empireTree.getRoot())
					{
						newNode["_dist_"].setValue("");
					}
					else
					{
						var thisId = this.getCityId(newNode.getLabel());
						var parentId = this.getCityId(node.getLabel());
						var thisCity = webfrontend.data.Player.getInstance().getCity(thisId);
						var parentCity = webfrontend.data.Player.getInstance().getCity(parentId);
						if(parentCity)
						{
							var dx = thisCity.xPos - parentCity.xPos;
							var dy = thisCity.yPos - parentCity.yPos;
							var dist = Math.sqrt(dx * dx + dy * dy);
							newNode["_dist_"].setValue(dist.toFixed(2));
						}
					}
					return true;
				}
				if(addToPostponed)
					this.postponed.push(city);
				return false;
			}
			catch(e)
			{
				EmpDebug("AddCityToTree: " + e);
			}
		},
		getCityName : function(ref)
		{
			var cities = webfrontend.data.Player.getInstance().getCities();
			for(var c in cities)
			{
				var reference = cities[c].reference.split(" ");
				if(reference[0] == ref)
				{
					return cities[c].name;
				}
			}
			return null;
		},
		getCityData : function(name)
		{
			try
			{
				var ret =
				{
					type : this.CITY_TYPE_NONE,
					icon : "",
					cat : "Unknown",
					wood : 0,
					rock : 0,
					iron : 0,
					food : 0,
					reserve : 0,
					wc : 0,
					rc : 0,
					ic : 0,
				}
				var cities = webfrontend.data.Player.getInstance().getCities();
				var city = null;
				for(var c in cities)
				{
					if(cities[c].name == name)
					{
						city = cities[c];
						break;
					}
				}
				if(!city)
					return ret;
				var ref = city.reference;
				if(!ref)
					return ret;
				var res = webfrontend.res.Main.getInstance();
				var s = ref.split(" ");
				if(s[0].length > 3)
				{
					var t = s[0].substr(3, 1);
					switch (t)
					{
					case 'Z':
						ret =
						{
							type : this.CITY_TYPE_TROOP,
							icon : res.imageFiles[res.units[BERSERKER_UNIT_ID].simg],
							cat : "Berserker",
							wood : 150000,
							rock : 250000,
							iron : 150000,
							food : 750000,
							reserve : 0,
							wc : 1,
							rc : 1,
							ic : -1,
						};
						break;
					case 'R':
						ret =
						{
							type : this.CITY_TYPE_TROOP,
							icon : res.imageFiles[res.units[RANGER_UNIT_ID].simg],
							cat : "Ranger",
							wood : 150000,
							rock : 250000,
							iron : 1000,
							food : 350000,
							reserve : 0,
							wc : -1,
							rc : 1,
							ic : 1,
						};
						break;
					case 'T':
						ret =
						{
							type : this.CITY_TYPE_TROOP,
							icon : res.imageFiles[res.units[TEMPLAR_UNIT_ID].simg],
							cat : "Templar",
							wood : 150000,
							rock : 250000,
							iron : 150000,
							food : 350000,
							reserve : 0,
							wc : 1,
							rc : 1,
							ic : -1,
						};
						break;
					case 'P':
						ret =
						{
							type : this.CITY_TYPE_TROOP,
							icon : res.imageFiles[res.units[PALADIN_UNIT_ID].simg],
							cat : "Paladin",
							wood : 150000,
							rock : 250000,
							iron : 150000,
							food : 750000,
							reserve : 0,
							wc : 1,
							rc : 1,
							ic : -1,
						};
						break;
					case 'M':
						ret =
						{
							type : this.CITY_TYPE_TROOP,
							icon : res.imageFiles[res.units[MAGE_UNIT_ID].simg],
							cat : "Mage",
							wood : 150000,
							rock : 250000,
							iron : 150000,
							food : 450000,
							reserve : 0,
							wc : 1,
							rc : 1,
							ic : -1,
						};
						break;
					case 'L':
						ret =
						{
							type : this.CITY_TYPE_TROOP,
							icon : res.imageFiles[res.units[WARLOCK_UNIT_ID].simg],
							cat : "Warlock",
							wood : 150000,
							rock : 250000,
							iron : 150000,
							food : 950000,
							reserve : 0,
							wc : 1,
							rc : 1,
							ic : -1,
						};
						break;
					case 'K':
						ret =
						{
							type : this.CITY_TYPE_TROOP,
							icon : res.imageFiles[res.units[KNIGHT_UNIT_ID].simg],
							cat : "Knight",
							wood : 150000,
							rock : 250000,
							iron : 150000,
							food : 1100000,
							reserve : 0,
							wc : 1,
							rc : 1,
							ic : -1,
						};
						break;
					case 'C':
						ret =
						{
							type : this.CITY_TYPE_TROOP,
							icon : res.imageFiles[res.units[CATAPULT_UNIT_ID].simg],
							cat : "Catram",
							wood : 150000,
							rock : 250000,
							iron : 150000,
							food : 550000,
							reserve : 0,
							wc : -1,
							rc : -1,
							ic : -1,
						};
						break;
					case 'B':
						ret =
						{
							type : this.CITY_TYPE_TROOP,
							icon : res.imageFiles[res.units[BALLISTA_UNIT_ID].simg],
							cat : "Ballista",
							wood : 150000,
							rock : 250000,
							iron : 150000,
							food : 240000,
							reserve : 0,
							wc : 1,
							rc : -1,
							ic : 1,
						};
						break;
					case '1':
						ret =
						{
							type : this.CITY_TYPE_TROOP,
							icon : res.imageFiles[res.units[BERSERKER_UNIT_ID].simg],
							cat : "Berserker (1s)",
							wood : 150000,
							rock : 250000,
							iron : 150000,
							food : 400000,
							reserve : 0,
							wc : 1,
							rc : 1,
							ic : -1,
						};
						break;
					case 'S':
						ret =
						{
							type : this.CITY_TYPE_TROOP,
							icon : res.imageFiles[res.units[SLOOP_UNIT_ID].simg],
							cat : "Sloop",
							wood : 150000,
							rock : 250000,
							iron : 150000,
							food : 430000,
							reserve : 0,
							wc : -1,
							rc : 1,
							ic : -1,
						};
						break;
					case 'W':
						ret =
						{
							type : this.CITY_TYPE_TROOP,
							icon : res.imageFiles[res.units[GALLEON_UNIT_ID].simg],
							cat : "War Galleon",
							wood : 150000,
							rock : 250000,
							iron : 150000,
							food : 890000,
							reserve : 0,
							wc : -1,
							rc : 1,
							ic : -1,
						};
						break;
					case 'F':
						ret =
						{
							type : this.CITY_TYPE_HUB,
							icon : "ui/icons_ressource_grain_16.png",
							cat : "Food City",
							wood : 150000,
							rock : 150000,
							iron : 1,
							food : 1,
							reserve : 0,
							wc : 1,
							rc : 1,
							ic : -1,
						};
						break;
					case 'H':
						ret =
						{
							type : this.CITY_TYPE_HUB,
							icon : "ui/icons_ressource_iron_16.png",
							cat : "Cluster Hub",
							wood : 5000000,
							rock : 5000000,
							iron : 20000000,
							food : 10000000,
							reserve : 0,
							wc : -1,
							rc : -1,
							ic : -1,
						};
						break;
					case 'G':
						ret =
						{
							type : this.CITY_TYPE_HUB,
							icon : "ui/icons_ressource_wood_16.png",
							cat : "Storage Hub",
							wood : 1000000,
							rock : 1000000,
							iron : 1000000,
							food : 1000000,
							reserve : 0,
							wc : 40000000,
							rc : 40000000,
							ic : -1,
						};
						break;
					case 'X':
						if(city.name.indexOf("14G") != -1)
							ret =
							{
								type : this.CITY_TYPE_HUB,
								icon : "ui/icons/icon_trade_cart_16.png",
								cat : "Transport Hub",
								wood : 7500000,
								rock : 7500000,
								iron : 1000000,
								food : 1000000,
								reserve : 0,
								wc : -1,
								rc : -1,
								ic : -1,
							};
						else
							ret =
							{
								type : this.CITY_TYPE_HUB,
								icon : "ui/icons/icon_trade_cart_16.png",
								cat : "Transport Hub",
								wood : 250000,
								rock : 250000,
								iron : 100000,
								food : 1000000,
								reserve : 0,
								wc : 1000000,
								rc : 1000000,
								ic : 1000000,
							};
						break;
					case 'E':
						ret =
						{
							type : this.CITY_TYPE_TROOP,
							icon : "ui/icons_ressource_all_16.png",
							cat : "Resources",
							wood : 150000,
							rock : 250000,
							iron : 1,
							food : 1,
							reserve : 0,
							wc : 1,
							rc : 1,
							ic : -1,
						};
						break;
					case 'g':
						ret =
						{
							type : this.CITY_TYPE_TROOP,
							icon : "ui/icons_ressource_gold_16.png",
							cat : "Gold City",
							wood : 150000,
							rock : 250000,
							iron : 1,
							food : 1,
							reserve : 0,
							wc : 1,
							rc : 1,
							ic : -1,
						};
						break;
					case 'A':
						ret =
						{
							type : this.CITY_TYPE_HUB,
							icon : res.imageFiles[res.units[BARON_UNIT_ID].simg],
							cat : "Baronator",
							wood : 1500000,
							rock : 1500000,
							iron : 1500000,
							food : 300000,
							reserve : 0,
							wc : -1,
							rc : -1,
							ic : -1,
						};
						break;
					}
				}
				if(ret.icon.length > 0)
					ret.icon = "webfrontend/" + ret.icon;
				if(city.name.charAt(0) == 'C')
				{
					if(ret.wc != -1)
						ret.wood = ret.wc;
					if(ret.rc != -1)
						ret.rock = ret.rc;
					if(ret.ic != -1)
						ret.iron = ret.ic;
				}
				return ret;
			}
			catch(e)
			{
				EmpDebug("GetCityData: " + e);
			}
		},
		getCityIcon : function(ref)
		{
			try
			{
				var res = webfrontend.res.Main.getInstance();
				var icon = "ui/icons/units/icon_units_cityguard_16.png";
				if(ref)
				{
					var s = ref.split(" ");
					if(s[0].length > 3)
					{
						var t = s[0].substr(3, 1);
						switch (t)
						{
						case 'Z':
							icon = res.imageFiles[res.units[BERSERKER_UNIT_ID].simg];
							break;
						case 'R':
							icon = res.imageFiles[res.units[RANGER_UNIT_ID].simg];
							break;
						case 'T':
							icon = res.imageFiles[res.units[TEMPLAR_UNIT_ID].simg];
							break;
						case 'P':
							icon = res.imageFiles[res.units[PALADIN_UNIT_ID].simg];
							break;
						case 'M':
							icon = res.imageFiles[res.units[MAGE_UNIT_ID].simg];
							break;
						case 'L':
							icon = res.imageFiles[res.units[WARLOCK_UNIT_ID].simg];
							break;
						case 'K':
							icon = res.imageFiles[res.units[KNIGHT_UNIT_ID].simg];
							break;
						case 'C':
							icon = res.imageFiles[res.units[CATAPULT_UNIT_ID].simg];
							break;
						case 'B':
							icon = res.imageFiles[res.units[BALLISTA_UNIT_ID].simg];
							break;
						case '1':
							icon = res.imageFiles[res.units[BERSERKER_UNIT_ID].simg];
							break;
						case 'S':
							icon = res.imageFiles[res.units[SLOOP_UNIT_ID].simg];
							break;
						case 'W':
							icon = res.imageFiles[res.units[GALLEON_UNIT_ID].simg];
							break;
						case 'F':
							icon = "ui/icons_ressource_grain_16.png";
							break;
						case 'H':
							icon = "ui/icons_ressource_iron_16.png";
							break;
						case 'G':
							icon = "ui/icons_ressource_wood_16.png";
							break;
						case 'X':
							icon = "ui/icons/icon_trade_cart_16.png";
							break;
						case 'E':
							icon = "ui/icons_ressource_all_16.png";
							break;
						case 'g':
							icon = "ui/icons_ressource_gold_16.png";
							break;
						case 'A':
							icon = res.imageFiles[res.units[BARON_UNIT_ID].simg];
							break;
						}
					}
				}
				if(icon.length > 0)
					icon = "webfrontend/" + icon;
				return icon;
			}
			catch(e)
			{
				EmpDebug("GetCityIcon: " + e);
			}
		},
		createCategory : function(category)
		{
			try
			{
				var root = this.cityTree.getRoot();
				var categories = root.getChildren();
				for(var i = 0; i < categories.length; i++)
				{
					var cat = categories[i];
					if(cat.getLabel() == category)
						return cat;
				}
				var node = this.configureTreeItem(new qx.ui.tree.TreeFolder(), category);
				this.addNode(root, node);
				node.setOpen(true);
				return node;
			}
			catch(e)
			{
				EmpDebug("CreateCategory: " + e);
			}
		},
	}
});
// $Header: /Home/Emperor/Emperor.Cities.js,v 1.1 2012/11/25 20:41:15 Aare Exp $

// City Data Exporter

qx.Class.define("Emperor.Cities",
{
	type : "singleton",
	extend : qx.core.Object,
	members :
	{
		cityWindow : null,
		widgetWidth : 550,
		widgetHeight : 625,
		showCities : function()
		{
			this.cityWindow = new webfrontend.ui.CustomWindow("City List");
			this.cityWindow.setLayout(new qx.ui.layout.Grow);
			this.cityWindow.set(
			{
				showMaximize : false,
				showMinimize : false,
				allowMaximize : false,
				width : this.widgetWidth + 20,
				height : this.widgetHeight + 40,
			});
			var text = this.createCityText();
			var ta = new qx.ui.form.TextArea(text);
			ta.addListener("click", function()
			{
				this.selectAllText();
			});
			this.cityWindow.add(ta,
			{
				left : 10,
				top : 10,
				bottom : 10,
				right : 10
			});
			this.cityWindow.center();
			this.cityWindow.open();
		},
		createCityText : function()
		{
			var text = "";
			var cities = webfrontend.data.Player.getInstance().getCities();
			for(var c in cities)
			{
				var city = cities[c];
				text += city.name + "," + city.xPos + "," + city.yPos + "," + city.reference.substr(3, 1) + "\n";
			}
			return text;
		},
	}
});
// $Header: /Home/Emperor/Emperor.Fanfare.js,v 1.1 2012/12/16 02:47:40 Aare Exp $

// Fanfare by Deniska

qx.Class.define("Emperor.Fanfare",
{
	extend : qx.core.Object,
	type : "singleton",
	members :
	{
		initialize : function()
		{
			try
			{
				var app = qx.core.Init.getApplication();
				var commandView = null;

				var children = app.cityInfoView.container.getChildren();
				for( i = 0; i < children.length; i++)
				{
					if(children[i].basename == "CityCommandInfoView")
					{
						commandView = children[i];
						break;
					}
				}
				if(commandView == null)
				{
					window.setTimeout(qx.lang.Function.bind(this.initialize, this), 1000);
					return;
				}
				var commands = commandView.commands;
				commands.addListener("addChildWidget", this.onAddChildWidget, this);
				for(var i = 0; i < commands.getChildren().length; i++)
				{
					var e = new qx.event.type.Data();
					e.init(commands.getChildren()[i], null, false);
					this.onAddChildWidget(e);
				}
			}
			catch(e)
			{
				EmpDebug("Fanfare.Init: " + e);
			}
		},
		onAddChildWidget : function(e)
		{
			try
			{
				var widget = e.getData();
				var optionsPanel = widget.getChildren()[4].getChildren()[1].getChildren()[2];
				if(!optionsPanel || optionsPanel.getChildren().length < 2)
					return;
				if(optionsPanel.getChildren()[1].classname == "webfrontend.ui.QuickUseButton")
					optionsPanel.remove(optionsPanel.getChildren()[1]);
			}
			catch(e)
			{
				EmpDebug("Fanfare.OnAdd: " + e);
			}
		},
	}
});
// $Header: /Home/Emperor/Emperor.CityManager.js,v 1.24 2013/05/27 13:56:25 Aare Exp $

// City Manager - names, references etc

(function()
{
	var node =
	{
		"28" : 0,
		"900" : 0,
		"29" : 1,
		"901" : 1,
		"27" : 2,
		"902" : 2,
		"30" : 3,
		"903" : 3,
		"23" : 4,
		"1" : 5,
		"2" : 6,
		"3" : 7,
		"4" : 8,
		"5" : 9,
		"6" : 10,
		"7" : 11,
		"8" : 12,
		"9" : 13,
		"10" : 14,
		"11" : 15,
		"12" : 16,
		"13" : 17,
		"14" : 18,
		"15" : 19,
		"16" : 20,
		"17" : 21,
		"18" : 22,
		"19" : 23,
		"20" : 24,
		"21" : 25,
		"22" : 26,
		"36" : 27,
		"37" : 28,
		"38" : 29,
		"39" : 30,
		"40" : 31,
		"41" : 32,
		"42" : 33,
		"43" : 34,
		"44" : 35,
		"45" : 36,
		"46" : 37,
		"98" : 38,
		"99" : 39,
		"-2" : 40,
		"-1" : 41,
		"97" : 46,
		"47" : 42,
		"48" : 43,
		"49" : 45,
		"50" : 44,
		"52" : 38,
		"53" : 38,
		"54" : 38,
		"55" : 38,
		"56" : 38,
		"57" : 38,
		"58" : 38,
		"59" : 38,
		"904" : 0,
		"61" : 0,
		"905" : 1,
		"62" : 1,
		"906" : 2,
		"60" : 2,
		"907" : 3,
		"63" : 3, //magic res
		"64" : 0,
		"65" : 0,
		"66" : 0,
		"67" : 0,
		"68" : 0,
		"69" : 0 // special buildings
	};

	var louCityP = [":", ".", ",", ";", "#", "W", "Q", "F", "C", "P", "I", "L", "M", "H", "A", "D", "T", "U", "B", "K", "G", //20
	"E", "Y", "V", "S", "X", "R", "J", "Z", "#", "#", "#", "#", "#", "#", "#", "#", "#", "-", "#", "#", "#", //41
	"2", "3", "1", "4", "_" //42-45, 46
	];

	qx.Class.define("Emperor.CityManager",
	{
		extend : qx.core.Object,
		members :
		{
			startingCityId : 0,
			currentCityId : 0,
			upgrading : false,
			raiding : false,
			prevCity : function()
			{
				try
				{
					Emp.main.cityBar.prevButton.execute();
				}
				catch(e)
				{
					EmpDebug("PrevCity: " + e);
				}
			},
			nextCity : function()
			{
				try
				{
					Emp.main.cityBar.nextButton.execute();
				}
				catch(e)
				{
					EmpDebug("NextCity: " + e);
				}
			},
			isAlpha : function(c)
			{
				return (c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z');
			},
			isDigit : function(c)
			{
				return (c >= '0' && c <= '9');
			},
			isPattern : function(str, pat)
			{
				for(var i = 0; i < pat.length; i++)
				{
					var s = str.substr(i, 1);
					var p = pat.substr(i, 1);
					switch(p)
					{
					case 'D':
						if(!this.isDigit(s))
							return false;
						break;
					case 'A':
						if(!this.isAlpha(s))
							return false;
						break;
					}
				}
				return true;
			},
			// Rename the city:
			// 1. If city is old-style 14xyy, rename it to 0Ixxxyyy using coordinates
			// 2. If city is old style C14xyy, rename it to 0Cxxxyyy using coordinates
			// 3. If city is 0Ixxxyyy, rename it to 14xyy using reference 14xy where x is cluster and y is type,
			//    and clean up the reference based on other cities in the same cluster
			// 4. If city is 0Cxxxyyy, rename it to C14xyy, same as 3
			renameCity : function()
			{
				try
				{
					var cityid = webfrontend.data.City.getInstance().getId();
					var city = webfrontend.data.Player.getInstance().getCity(cityid);
					var newName = "";
					if(this.isPattern(city.name, "ADDADD"))
						newName = "0C" + city.xPos + "" + city.yPos;
					else
						newName = "0I" + city.xPos + "" + city.yPos;
					var newRef = "";
					if(city.name.substr(0, 1) == "0")
					{
						newName = this.makeNewName();
						newRef = this.makeNewRef();
					}
					var queue = Emperor.Net.CommandQueue.getInstance();
					var command = false;
					if(newName != "")
					{
						queue.push(
						{
							a : "RenameCity",
							p :
							{
								cityid : webfrontend.data.City.getInstance().getId(),
								name : newName,
							}
						});
						command = true;
					}
					if(newRef != "")
					{
						queue.push(
						{
							a : "CityNoteSet",
							p :
							{
								cityid : webfrontend.data.City.getInstance().getId(),
								reference : newRef,
								text : webfrontend.data.City.getInstance().getText()
							}
						});
						command = true;
					}
					if(command)
						queue.sendCommands();
				}
				catch(e)
				{
					EmpDebug("RenameCity: " + e);
				}
			},
			// Make new name for the city
			makeNewName : function()
			{
				try
				{
					var cityid = webfrontend.data.City.getInstance().getId();
					var cities = webfrontend.data.Player.getInstance().getCities();
					var city = cities[cityid];
					var ref = city.reference.substr(0, 3);
					var index = 1;
					for(var i in cities)
					{
						if(cities[i].name.indexOf(ref) != -1)
							index++;
					}
					var newName = ref + (index < 10 ? "0" : "") + index;
					if(city.name.substr(0, 2) == "0C")
						newName = "C" + newName;
					return newName;
				}
				catch(e)
				{
					EmpDebug("MakeNewStr: " + e);
				}
			},
			makeNewRef : function()
			{
				try
				{
					var cityid = webfrontend.data.City.getInstance().getId();
					var cities = webfrontend.data.Player.getInstance().getCities();
					var city = cities[cityid];
					var ref = city.reference;
					var index = 1;
					for(var i in cities)
					{
						var c = cities[i];
						if(c.name.substr(0, 1) != "0")
						{
							// Only look at new cities
							if(c.reference.substr(0, 4) == ref.substr(0, 4))
								index++;
						}
					}
					return ref.substr(0, 4) + (index < 10 ? "0" : "") + index;
				}
				catch(e)
				{
					EmpDebug("MakeNewRef: " + e);
				}
			},
			deleteOldBuildings : function()
			{
				var city = webfrontend.data.City.getInstance();
				var b = city.buildQueue;
				var p = webfrontend.data.Player.getInstance();
				// this many can fit into the queue
				var nodes = this.getBuildQueueFreeSpace();
				var bc = city.getBuildingCount();
				var bl = city.getBuildingLimit();
				if(bc >= bl)
				{
					var layout = new Emperor.Tweak.LayoutWindow(true);
					layout.remOldBuildings();
					delete layout;
				}
			},
			upgradeTownHall : function()
			{
				var layout = new Emperor.Tweak.LayoutWindow(true);
				layout.upgradeTownHall(this.getBuildQueueFreeSpace());
				delete layout;
			},
			addNewBuildings : function()
			{
				var layout = new Emperor.Tweak.LayoutWindow(true);
				layout.addNewBuildings(this.getBuildQueueFreeSpace());
				delete layout;
			},
			fillBuildQueue : function()
			{
				var city = webfrontend.data.City.getInstance();
				var stone = city.getResourceCount(RES_TYPE_ROCK);
				if((stone > 20000) || (webfrontend.data.City.getInstance().getTownhallLevel() < 7))
				{
					var queue = Emperor.Net.CommandQueue.getInstance();
					queue.push(
					{
						a : "BuildingQueueFill",
						p :
						{
							cityid : city.getId(),
						}
					});
					queue.sendCommands();
				}
			},
			getBuildQueueFreeSpace : function()
			{
				var city = webfrontend.data.City.getInstance();
				var buildQueue = city.buildQueue;
				var player = webfrontend.data.Player.getInstance();
				var space = player.getMaxBuildQueueSize();
				if(buildQueue)
					space -= buildQueue.length;
				return space;
			},
			removeResources : function(queue)
			{
				var ss = this.getShareString();
				var ls = this.getLayoutString();
				var busyRes = [];
				for(var i = 0; i < 441; i++)
				{
					var l = ls.substr(i, 1);
					var s = ss.substr(i, 1);
					if(s == ',' || s == '.' || s == ':' || s == ';')
					{
						if(s != l)
						{
							busyRes.push(i);
						}
					}
				}
				var nodes = this.getBuildQueueFreeSpace();
				var queue = Emperor.Net.CommandQueue.getInstance();
				for( i = 0; i < busyRes.length; i++)
				{
					if(nodes == 0)
						break;
					var bdata = Emp.city[busyRes[i]];
					queue.push(
					{
						a : "UpgradeBuilding",
						p :
						{
							cityid : webfrontend.data.City.getInstance().getId(),
							buildingid : bdata[0],
							buildingType : BUILDING_TYPE_BY_RES_TYPE[bdata[2] - 900],
							isPaid : true
						}
					});
					nodes--;
				}
				queue.sendCommands();
			},
			getShareString : function()
			{
				Emp.main.getCity();
				var c = Emp.city;
				var ss = "";
				for( i = 0; i < c.length; i++)
				{
					ss += louCityP[node[c[i][2]]];
				}
				return ss;
			},
			// Go to the local storage and get the layout string, no header
			getLayoutString : function()
			{
				srvName = webfrontend.data.Server.getInstance().getName();
				var str = localStorage.getItem("Emp_cityLayouts");
				cl =
				{
				};
				cl[srvName] =
				{
				};
				if(str)
				{
					var scl = qx.lang.Json.parse(str);
					if(scl.hasOwnProperty(srvName))
						cl[srvName] = scl[srvName];
				}
				var cgi = webfrontend.data.City.getInstance();
				var cId = cgi.getId();
				var ls = null;
				if(cl[srvName].hasOwnProperty(cId))
					ls = cl[srvName][cId];
				return ls;
			},
			// Add traps and towers to the city, set defense minister to update the wall, remove city from No Towers group and add it to Incomplete group
			addTowers : function()
			{
				try
				{
					var buildings = [[1, 4, 46], [1, 8, 46], [1, 14, 46], [1, 18, 46], [4, 1, 46], [4, 21, 46], [8, 1, 46], [8, 21, 46], [14, 1, 46], [14, 21, 46], [18, 1, 46], [18, 21, 46], [21, 4, 46], [21, 8, 46], [21, 14, 46], [21, 18, 46], [6, 9, 39], [6, 13, 38], [9, 6, 39], [9, 16, 38], [13, 6, 39], [13, 16, 38], [16, 9, 39], [16, 13, 38]];
					var space = this.getBuildQueueFreeSpace();
					Emp.main.getCity();
					var city = Emp.city;
					var queue = Emperor.Net.CommandQueue.getInstance();

					// Rename the city so it is incomplete again
					var cid = webfrontend.data.City.getInstance().getId();
					var cityInstance = webfrontend.data.Player.getInstance().getCity(cid);
					var newName = cityInstance.name;
					if(cityInstance.name.substr(0, 3) == "C14" && cityInstance.name.length == 6)
					{
						newName = newName.substr(1);
						queue.push(
						{
							a : "RenameCity",
							p :
							{
								cityid : cid,
								name : newName,
							}
						});
					}
					// City groups
					var cgArray = this.makeNewCityGroupArray("+Incomplete,+No Towers");
					var cities = webfrontend.data.Player.getInstance().getCities();
					queue.push(
					{
						a : "SetCitysGroups",
						p :
						{
							_idCityCoord : (cities[cid].yPos << 16) + cities[cid].xPos,
							_arrNewGroups : cgArray,
						}
					});
					// Defense minister - both walls and towers
					queue.push(
					{
						a : "CityAutoBuildParamsSet",
						p :
						{
							cityid : cid,
							autoBuildOptionDefense : true,
							autoBuildOptionEconomy : true,
							autoBuildTypeFlags : webfrontend.data.City.getInstance().getAutoBuildTypeFlags() | 0xC0
						}
					});
					queue.push(
					{
						a : "SetDefenceMinisterOptions",
						p :
						{
							cityid : cid,
							keepOrder : false,
							AutoRecruitEnabled : true
						}
					});
					// Trade minister
					this.setupTradeMinister(queue);
					// Builds
					for(var bi = 0; bi < buildings.length; bi++)
					{
						var b = buildings[bi];
						var index = (b[1] - 1) * 21 + (b[0] - 1);

						// for(var y = 0; y < 21; y++)
						// {
						// var line = "";
						// for(var x = 0; x < 21; x++)
						// {
						// var index = y * 21 + x;
						// line += sprintf("%3d ", city[index][2]);
						// }
						// EmpDebug(line);
						// }
						// break;

						var c = city[index];
						if((c[2] == 99) && (space > 0))
						{
							queue.push(
							{
								a : "UpgradeBuilding",
								p :
								{
									cityid : cid,
									buildingid : (b[1] << 8) + b[0],
									buildingType : b[2],
									isPaid : false
								}
							});
							space--;
						}
					}
					queue.sendCommands();
				}
				catch(e)
				{
					EmpDebug("AddTowers: " + e);
				}
			},
			makeNewCityGroupArray : function(changes)
			{
				var cid = webfrontend.data.City.getInstance().getId();
				var player = webfrontend.data.Player.getInstance();
				var cg = player.citygroups;
				var ch = changes.split(",");
				var result = new Array();
				for(var i = 0; i < cg.length; ++i)
				{
					if(player.isCityInGroup(cid, cg[i].i))
					{
						// Remove if necessary
						var keep = true;
						for(var g = 0; g < ch.length; g++)
						{
							if(ch[g] == "-" + cg[i].n)
								keep = false;
						}
						if(keep)
							result.push(cg[i].i);
					}
					else
					{
						// Add if necessary
						var add = false;
						for(var g = 0; g < ch.length; g++)
						{
							if(ch[g] == "+" + cg[i].n)
								add = true;
						}
						if(add)
							result.push(cg[i].i);
					}
				}
				return result;
			},
			// When adding towers, we need to fix up trade minister for wood and rock
			setupTradeMinister : function(queue)
			{
				try
				{
					var thisCity = webfrontend.data.City.getInstance();
					var cityName = thisCity.getName();
					var tm = webfrontend.data.TradeMinister.getInstance();
					var tmres = tm.getResourceOptions();
					var wood = Math.max(150000, tmres[1].protectedAmount);
					var rock = Math.max(250000, tmres[2].protectedAmount);
					var iron = tmres[3].protectedAmount;
					var food = tmres[4].protectedAmount;
					var feedId = tmres[1].deliverCityId;
					var cities = webfrontend.data.Player.getInstance().getCities();
					var feedName = cities[feedId].name;
					var tree = Emperor.Tree.getInstance();
					var setup = tree.setupTradeMinister(cityName, feedName, 0, wood, rock, iron, food);
					// EmpDebug("TM: Feed " + feedName + " W " + wood + " R " + rock);
					queue.push(
					{
						a : "CityAutoTradeParamsSet",
						p :
						{
							cityid : thisCity.getId(),
							autoTradeParams : setup
						}
					});
				}
				catch(e)
				{
					EmpDebug("SetupTradeMinister: " + e);
				}
			},
			// Mark the city completed
			completed : function()
			{
				try
				{
					var queue = Emperor.Net.CommandQueue.getInstance();
					// Rename the city so it is finally complete
					var city = webfrontend.data.City.getInstance();
					var cid = city.getId();
					var cityName = city.getName();
					var canComplete = false;
					if(cityName.substr(0, 2) == "14" && cityName.length == 5)
						canComplete = true;
					if(cityName.substr(0, 2) == "24" && cityName.length == 5)
						canComplete = true;
					if(canComplete)
					{
						cityName = "C" + cityName;
						queue.push(
						{
							a : "RenameCity",
							p :
							{
								cityid : cid,
								name : cityName,
							}
						});
					}
					// City groups
					var cgArray = this.makeNewCityGroupArray("-Incomplete,-No Towers");
					var cities = webfrontend.data.Player.getInstance().getCities();
					queue.push(
					{
						a : "SetCitysGroups",
						p :
						{
							_idCityCoord : (cities[cid].yPos << 16) + cities[cid].xPos,
							_arrNewGroups : cgArray,
						}
					});
					// And the trade minister, to ship out everything except food
					var tree = Emperor.Tree.getInstance();
					var cityData = tree.getCityData(city.getName());
					if(cityData.wc != -1)
						cityData.wood = cityData.wc;
					if(cityData.rc != -1)
						cityData.rock = cityData.rc;
					if(cityData.ic != -1)
						cityData.iron = cityData.ic;
					var tm = webfrontend.data.TradeMinister.getInstance();
					var tmres = tm.getResourceOptions();
					var wood = cityData.wood;
					var rock = cityData.rock;
					var iron = cityData.iron;
					var food = cityData.food + (cityData.type != tree.CITY_TYPE_TROOP ? 0 : 300000);
					var feedId = tmres[1].deliverCityId;
					var cities = webfrontend.data.Player.getInstance().getCities();
					var feedName = cities[feedId].name;
					// EmpDebug("TM: W " + wood + " R " + rock + " I " + iron + " F " + food);
					var setup = tree.setupTradeMinister(cityName, feedName, 0, wood, rock, iron, food);
					queue.push(
					{
						a : "CityAutoTradeParamsSet",
						p :
						{
							cityid : cid,
							autoTradeParams : setup
						}
					});
					queue.sendCommands();
				}
				catch(e)
				{
					EmpDebug("Completed: " + e);
				}

			},
			// Set up city for palace building
			setupPalace : function()
			{
				try
				{
					var queue = Emperor.Net.CommandQueue.getInstance();
					// Rename the city so it is finally complete
					var city = webfrontend.data.City.getInstance();
					var cid = city.getId();
					var cityName = city.getName();
					if(cityName.substr(0, 3) == "C14" && cityName.length == 6)
					{
						cityName = cityName.substr(1, 5);
						queue.push(
						{
							a : "RenameCity",
							p :
							{
								cityid : cid,
								name : cityName,
							}
						});
					}
					// City groups
					var cgArray = this.makeNewCityGroupArray("+Incomplete,+Palace,-Defense,-Offense");
					var cities = webfrontend.data.Player.getInstance().getCities();
					queue.push(
					{
						a : "SetCitysGroups",
						p :
						{
							_idCityCoord : (cities[cid].yPos << 16) + cities[cid].xPos,
							_arrNewGroups : cgArray,
						}
					});
					// And the trade minister, to ship out everything except food
					var tree = Emperor.Tree.getInstance();
					var cityData = tree.getCityData(city.getName());
					var tm = webfrontend.data.TradeMinister.getInstance();
					var tmres = tm.getResourceOptions();
					var wood = cityData.wood;
					if(wood < 150000)
						wood = 150000;
					var rock = cityData.rock;
					if(rock < 150000)
						rock = 150000;
					var iron = cityData.iron;
					var food = cityData.food + (cityData.type != tree.CITY_TYPE_TROOP ? 0 : 300000);
					var feedId = tmres[1].deliverCityId;
					var cities = webfrontend.data.Player.getInstance().getCities();
					var feedName = cities[feedId].name;
					// EmpDebug("TM: W " + wood + " R " + rock + " I " + iron + " F " + food);
					var setup = tree.setupTradeMinister(cityName, feedName, 0, wood, rock, iron, food);
					queue.push(
					{
						a : "CityAutoTradeParamsSet",
						p :
						{
							cityid : cid,
							autoTradeParams : setup
						}
					});
					// Defense minister - both walls and towers
					queue.push(
					{
						a : "CityAutoBuildParamsSet",
						p :
						{
							cityid : cid,
							autoBuildOptionDefense : true,
							autoBuildOptionEconomy : true,
							autoBuildTypeFlags : 0xFF
						}
					});
					queue.sendCommands();
				}
				catch(e)
				{
					EmpDebug("Completed: " + e);
				}
			},
			palaceResourcesWood : function()
			{
				this.palaceResources(1);
			},
			palaceResourcesRock : function()
			{
				this.palaceResources(2);
			},
			palaceResType : 0,
			palaceResources : function(res)
			{
				try
				{
					this.palaceResType = res;
					webfrontend.net.CommandManager.getInstance().sendCommand("TradeSearchResources",
					{
						cityid : webfrontend.data.City.getInstance().getId(),
						resType : res,
						minResource : 0,
						maxTime : 356400,
					}, this, this.palaceResourcesReply);
				}
				catch(e)
				{
					EmpDebug("Palace Resources 1(" + res + "): " + e);
				}
			},
			palaceResourcesReply : function(flag, data)
			{
				try
				{
					var city = webfrontend.data.City.getInstance();
					// EmpDebug("Got response, flag " + flag);
					// EmpDebug(" data length " + data.length);
					// EmpDebug("Have " + city.getPalaceResourceCount(this.palaceResType));
					var pl = city.getPalaceLevel();
					// EmpDebug("Palace " + pl);
					var res = webfrontend.res.Main.getInstance().buildings[ANY_PALACE + 1].r;
					// EmpDebug("Need " + res[pl + 1].r[0].c);
					var incoming = city.getTradeIncoming() == null ? 0 : city.getTradeIncoming().length;
					// EmpDebug("Trade orders " + incoming);
					// EmpDebug("Incoming res " + this.getPalaceIncoming());
					var need = res[pl + 1].r[0].c - city.getPalaceResourceCount(this.palaceResType) - this.getPalaceIncoming();
					// EmpDebug("Need more " + need);
					// data elements:
					// i: city id
					// la: land resources on carts
					// lt: land transfer time
					// n: source city name
					// rc: total resources in city
					// sa: sea resources on ships
					// st: sea transfer time
					// sg: always false
					data.sort(function(a, b)
					{
						var aHub = (a.n.indexOf("14G") >= 0) || (a.n.indexOf("24G") >= 0);
						var bHub = (b.n.indexOf("14G") >= 0) || (b.n.indexOf("24G") >= 0);
						if(aHub && !bHub)
							return -1;
						if(!aHub && bHub)
							return 1;
						if(!aHub && !bHub)
							return 0;
						return b.la - a.la;
					});
					// Hopefully first now is the hub with most carts with res in it
					// EmpDebug("Best city " + data[0].n);
					// EmpDebug("Next city " + data[1].n);
					var index = 0;
					var playerCity = webfrontend.data.Player.getInstance().getCity(city.getId());
					var thisCity = sprintf("%03d:%03d", playerCity.xPos, playerCity.yPos);
					var hub = sprintf("%d%dG", playerCity.yPos / 100, playerCity.xPos / 100);
					// EmpDebug("Looking for hubs " + hub);
					var queue = Emperor.Net.CommandQueue.getInstance();
					while(need > 0 && index < data.length)
					{
						if(data[index].n.indexOf(hub) >= 0)
						{
							if(data[index].la > need)
								data[index].la = need;
							if(data[index].la > 0)
							{
								queue.push(
								{
									a : "TradeDirect",
									p :
									{
										cityid : data[index].i,
										res : [
										{
											t : this.palaceResType,
											c : data[index].la
										}],
										tradeTransportType : webfrontend.base.GameObjects.eTransportType.Land,
										targetPlayer : webfrontend.data.Player.getInstance().getName(),
										targetCity : thisCity,
										palaceSupport : true
									}
								});
								// EmpDebug("Requesting " + data[index].la + " from " + data[index].n)
							}
							need -= data[index].la;
						}
						index++;
					}
					queue.sendCommands();
				}
				catch(e)
				{
					EmpDebug("Palace Resources Reply: " + e);
				}
			},
			getPalaceIncoming : function()
			{
				try
				{
					var city = webfrontend.data.City.getInstance();
					var incoming = city.getTradeIncoming() == null ? 0 : city.getTradeIncoming().length;
					var amount = 0;
					for(var i = 0; i < incoming; i++)
					{
						var it = city.getTradeIncoming()[i];
						if(it.state == webfrontend.base.GameObjects.eTradeState.WorkingPalaceSupport)
						{
							for(var r = 0; r < it.resources.length; r++)
							{
								if(it.resources[r].type == this.palaceResType)
									amount += it.resources[r].count;
							}
						}
					}
					return amount;
				}
				catch(e)
				{
					EmpDebug("Palace Incoming: " + e);
				}
			},
			// Set up palace city for castle building
			setupArmyCastle : function()
			{
				try
				{
					var queue = Emperor.Net.CommandQueue.getInstance();
					// Rename the city so it is finally complete
					var city = webfrontend.data.City.getInstance();
					var cid = city.getId();
					var cityName = city.getName();
					if(cityName.substr(0, 3) == "C14" && cityName.length == 6)
					{
						cityName = cityName.substr(1, 5);
						queue.push(
						{
							a : "RenameCity",
							p :
							{
								cityid : cid,
								name : cityName,
							}
						});
					}
					// City groups
					var cgArray = this.makeNewCityGroupArray("+Incomplete,-Palace");
					var cities = webfrontend.data.Player.getInstance().getCities();
					queue.push(
					{
						a : "SetCitysGroups",
						p :
						{
							_idCityCoord : (cities[cid].yPos << 16) + cities[cid].xPos,
							_arrNewGroups : cgArray,
						}
					});
					// And the trade minister, to ship out everything except food
					var tree = Emperor.Tree.getInstance();
					var cityData = tree.getCityData(city.getName());
					var tm = webfrontend.data.TradeMinister.getInstance();
					EmpDebug("tm: " + tm);
					var tmres = tm.getResourceOptions();
					var wood = cityData.wood;
					if(wood < 150000)
						wood = 150000;
					var rock = cityData.rock;
					if(rock < 150000)
						rock = 150000;
					var iron = cityData.iron;
					var food = cityData.food + (cityData.type != tree.CITY_TYPE_TROOP ? 0 : 300000);
					var feedId = tmres[1].deliverCityId;
					var cities = webfrontend.data.Player.getInstance().getCities();
					var feedName = cities[feedId].name;
					// EmpDebug("TM: W " + wood + " R " + rock + " I " + iron + " F " + food);
					var setup = tree.setupTradeMinister(cityName, feedName, 0, wood, rock, iron, food);
					queue.push(
					{
						a : "CityAutoTradeParamsSet",
						p :
						{
							cityid : cid,
							autoTradeParams : setup
						}
					});
					// Defense minister - both walls and towers
					queue.push(
					{
						a : "CityAutoBuildParamsSet",
						p :
						{
							cityid : cid,
							autoBuildOptionDefense : true,
							autoBuildOptionEconomy : true,
							autoBuildTypeFlags : 0xFF
						}
					});
					queue.sendCommands();
				}
				catch(e)
				{
					EmpDebug("SetupArmy: " + e);
				}
			},
		}
	});
})();
// $Header: /Home/Emperor/Emperor.SKS.WorldExporter.js,v 1.5 2012/11/23 04:47:39 Aare Exp $

// SkraggleRock's World Data Exporter

qx.Class.define("Emperor.SKS.WorldExporter",
{
	extend : qx.core.Object,
	construct : function()
	{
		try
		{
			this.configMain = ClientLib.Config.Main.GetInstance();
			var worldDataRoot = webfrontend.net.UpdateManager.getInstance().requester["WORLD"].obj;
			for(var key in worldDataRoot )
			{
				if(worldDataRoot[key] instanceof Object)
				{
					if(worldDataRoot[key].hasOwnProperty("d") && worldDataRoot[key].hasOwnProperty("c"))
					{
						this.worldData = worldDataRoot[key];
						break;
					}
				}
			}
			this.region_object = ClientLib.Vis.VisMain.GetInstance().get_Region();
		}
		catch(e)
		{
			EmpDebug("WorldExporter.construct: " + e);
		}
	},
	members :
	{
		configMain : null,
		region_object : null,
		worldData : null,
		players : null,
		alliances : null,
		objData : "none",
		playerData : "none",
		allianceData : "none",
		shrineNames : ["Inactive", "Compassion", "Honesty", "Honor", "Humility", "Justice", "Sacrifice", "Spirituality", "Valor"],
		exportWin : null,
		init : function(buttonLeft)
		{
			var btn = new qx.ui.form.Button("W");
			btn.set(
			{
				width : 30,
				appearance : "button-text-small",
				toolTipText : "Click to open World Exporter"
			});
			btn.addListener("click", this.showWorldExporter, this);
			Emp.main.serverBar.add(btn,
			{
				top : 2,
				left : buttonLeft
			});
		},
		showWorldExporter : function()
		{
			try
			{
				this.getObfuscatedNames();
				var si = webfrontend.data.Server.getInstance();
				var contW = si.getContinentWidth();
				var contH = si.getContinentHeight();
				var contX = si.getContinentCountX();
				var contY = si.getContinentCountY();
				var clustersX = Math.ceil((contW * contX) / 32);
				var clustersY = Math.ceil((contH * contY) / 32);
				var totalClusters = clustersX * clustersY;
				var needAll = false;
				var haveClusters = 0;
				for(var cx = 0; cx < clustersX; cx++)
				{
					for(var cy = 0; cy < clustersY; cy++)
					{
						if(this.worldData.d.hasOwnProperty((cx + cy * 32)))
						{
							haveClusters++;
						}
					}
				}
				var dataString = "";
				if(haveClusters == totalClusters || !needAll)
					dataString = this.createWorldDataString();
				this.createOutputWindow("World data", dataString);
				EmpDebug("World string complete");
			}
			catch(e)
			{
				EmpDebug("ShowWorldExporter: " + e);
			}
		},
		createOutputWindow : function(title, text)
		{
			var win = new qx.ui.window.Window(title);
			win.setLayout(new qx.ui.layout.Grow);
			win.set(
			{
				showMaximize : false,
				showMinimize : false,
				allowMaximize : false
			});
			win.setWidth(550);
			win.setHeight(700);

			var ta = new qx.ui.form.TextArea(text);
			ta.addListener("click", function()
			{
				this.selectAllText();
			});
			win.add(ta,
			{
				left : 10,
				top : 10,
				bottom : 10,
				right : 10
			});
			win.center();
			win.open();
			this.exportWin = win;
		},
		createWorldDataString : function()
		{
			try
			{
				this.players = new Object();
				this.alliances = new Object();

				var U = webfrontend.data.ServerTime.getInstance();
				var W = U.getServerStep();
				var Y = U.getStepTime(W);
				Y = new Date(Y.getTime() + U.getServerOffset());

				var si = webfrontend.data.Server.getInstance();
				var contW = si.getContinentWidth();
				var contH = si.getContinentHeight();
				var contX = si.getContinentCountX();
				var contY = si.getContinentCountY();

				var dataString = "";
				dataString += "<exportversion>0x902</exportversion>\n";
				dataString += "<server>" + si.getName() + "</server>\n";
				dataString += "<time>" + this.leftPad(Y.getUTCMonth() + 1, 2, "0");
				dataString += this.leftPad(Y.getUTCDate(), 2, "0");
				dataString += this.leftPad(Y.getUTCFullYear(), 4, "0") + " ";
				dataString += this.leftPad(Y.getUTCHours(), 2, "0");
				dataString += this.leftPad(Y.getUTCMinutes(), 2, "0");
				dataString += this.leftPad(Y.getUTCSeconds(), 2, "0") + "</time>\n";
				dataString += "<contsize>" + contW + "," + contH + "</contsize>\n";
				dataString += "<contcount>" + contX + "," + contY + "</contcount>\n";
				for(var cluster in this.worldData.d)
				{
					dataString += this.createClusterDataString(cluster);
				}
				dataString += this.createAllianceDataString();
				dataString += this.createPlayerDataString();
				return dataString;
			}
			catch(e)
			{
				EmpDebug("CreateWorldDataString: " + e);
			}
		},
		createClusterDataString : function(cluster)
		{
			try
			{
				var dataString = "";
				var debugInfo = false;
				var seaData = this.worldData.d[cluster].get_Terrain().l;
				var details = this.worldData.d[cluster].get_TerrainDetails();
				var detailData = details == null ? null : details.l;
				if(seaData == null)
					EmpDebug("CreateClusterDataString: No sea data: Version update?");
				if(debugInfo)
					EmpDebug("Cluster " + cluster);
				var playerData = this.safeGetProperty(this.worldData.d[cluster][this.playerData], "d");
				var allianceData = this.safeGetProperty(this.worldData.d[cluster][this.allianceData], "d");
				var objectData = this.safeGetProperty(this.worldData.d[cluster][this.objData], "d");
				var riverData = this.worldData.d[cluster].get_Rivers().l;
				var resData = this.safeGetProperty(this.worldData.d[cluster][this.resData], "l");
				if(debugInfo)
					EmpDebug("GatherAlliances");
				if(allianceData)
				{
					for(var alliance in allianceData )
					{
						var id = allianceData[alliance].Id;
						this.alliances[id] = new Object();
						this.alliances[id].name = allianceData[alliance].Name;
						this.alliances[id].points = allianceData[alliance].Points;
					}
				}
				if(debugInfo)
					EmpDebug("GatherPlayers");
				if(playerData)
				{
					for(var player in playerData )
					{
						var pid = playerData[player].Id;
						this.players[pid] = new Object();
						this.players[pid].points = playerData[player].Points;
						this.players[pid].name = playerData[player].Name;
						var aindex = playerData[player].Alliance;
						if(aindex > 0)
							this.players[pid].alliance = allianceData[aindex].Id;
						else
							this.players[pid].alliance = 0;
					}
				}
				dataString += "<cluster id=\"" + cluster.toString() + "\">\n";
				if(debugInfo)
					EmpDebug("RiverData");
				if(riverData == null)
					EmpDebug("No riverdata");
				dataString += "<riverdata>";
				for(var d in riverData )
				{
					if(d != 0)
						dataString += ", ";
					dataString += riverData[d];
				}
				dataString += "</riverdata>\n";
				if(debugInfo)
					EmpDebug("SeaData");
				if(seaData == null)
					EmpDebug("No seadata");
				dataString += "<seadata>";
				for(var d in seaData )
				{
					if(d != 0)
						dataString += ", ";
					dataString += seaData[d];
				}
				dataString += "</seadata>\n";
				if(debugInfo)
					EmpDebug("Terrain details");
				if(detailData == null)
					EmpDebug("No detail data");
				dataString += "<details>";
				for(var d in detailData)
				{
					if(d != 0)
						dataString += ", ";
					dataString += detailData[d];
				}
				dataString += "</details>\n";
				if(debugInfo)
					EmpDebug("ResData");
				if(resData)
				{
					dataString += "<resdata>";
					for(var d in resData )
					{
						if(d != 0)
							dataString += ", ";
						dataString += resData[d];
					}
					dataString += "</resdata>\n";
				}
				if(debugInfo)
					EmpDebug("Objects");
				if(objectData)
				{
					for(var obj in objectData )
					{
						var coord = this.coordsFromCluster(cluster, obj);
						var x = coord & 0xffff;
						var y = coord >> 16;
						var o = objectData[obj];
						switch( o.Type )
						{
						case 1:
						// city
						{
							var pindex = o.Player;
							var pid = playerData[pindex].Id;
							dataString += "<c id=\"" + x + ":" + y + "\">" + pid + "," + o.Name + "," + o.Points + "," + o.Castle + "," + o.Water + "," + this.shrineNames[o.PalaceType] + "," + o.PalaceLevel + "," + o.PalaceUpgradeing + "," + o.Enlighted + "</c>\n";
							break;
						}
						case 2:
							// dungeon
							dataString += "<d id=\"" + x + ":" + y + "\">" + this.dungeonName(o.DungeonType) + "," + o.DungeonLevel + "," + o.Progress + "," + o.State + "," + o.StartStep + "</d>\n";
							break;
						case 3:
							// boss
							dataString += "<b id=\"" + x + ":" + y + "\">" + this.bossName(o.BossType) + "," + o.BossLevel + "," + o.State + "," + o.StartStep + "</b>\n";
							break;
						case 4:
							// moongate
							dataString += "<m id=\"" + x + ":" + y + "\">" + "</m>\n";
							break;
						case 5:
							// shrine
							dataString += "<s id=\"" + x + ":" + y + "\">" + this.shrineNames[o.ShrineType] + "</s>\n";
							break;
						case 6:
							// lawless
							dataString += "<l id=\"" + x + ":" + y + "\">" + o.Points + "," + o.Castle + "," + o.Water + "</l>\n";
							break;
						default:
							EmpDebug("Object " + o.Type);
						}
					}
				}
				if(debugInfo)
					EmpDebug("Done with cluster");
				dataString += "</cluster>\n";
				return dataString;
			}
			catch(e)
			{
				EmpDebug("CreateClusterDataString: " + e);
			}
		},
		bossName : function(bossType)
		{
			switch( bossType )
			{
			case 6:
				return "Dragon";
			case 7:
				return "Moloch";
			case 8:
				return "Hydra";
			case 12:
				return "Octopus";
			}
			return "Unknown";
		},
		dungeonName : function(dungType)
		{
			switch( dungType )
			{
			case 2:
				return "Sea";
			case 3:
				return "Hill";
			case 4:
				return "Mountain";
			case 5:
				return "Forest";
			}
			return "Unknown";
		},
		coordsFromCluster : function(clusterID, coordRef)
		{
			var clusterY = Math.floor(clusterID / 32);
			var clusterX = clusterID - (clusterY * 32);

			var x = clusterX * 32 + (coordRef & 0xffff);
			var y = clusterY * 32 + (coordRef >> 16);
			return x | (y << 16);
		},
		getObfuscatedNames : function()
		{
			try
			{
				if(this.objData == "none")
				{
					for(var cluster in this.worldData.d )
					{
						for(var key in this.worldData.d[cluster] )
						{
							var d = this.worldData.d[cluster][key];
							if(d.hasOwnProperty("d"))
							{
								for(var dkey in d.d )
								{
									if(d.d[dkey].hasOwnProperty("Type"))
										this.objData = key;
									else if(d.d[dkey].hasOwnProperty("Alliance"))
										this.playerData = key;
									else
										this.allianceData = key;
									break;
								}
							}
							if(this.objData != "none" && this.playerData != "none" && this.allianceData != "none")
								break;
						}
						break;
					}
				}
			}
			catch(e)
			{
				EmpDebug("GetObfuscatedNames: " + e);
			}
		},
		leftPad : function(num, minsize, padstring)
		{
			var str = num.toString();
			while(str.length < minsize)
			str = padstring + str;
			return str;
		},
		safeGetProperty : function(obj, prop)
		{
			if(obj && obj.hasOwnProperty(prop))
				return obj[prop];
			return null;
		},
		createAllianceDataString : function()
		{
			var dataString = "";
			for(var alliance in this.alliances )
			{
				var a = this.alliances[alliance];
				dataString += "<a id=\"" + alliance + "\">" + a.name + "," + a.points + "</a>\n";
			}
			return dataString;
		},
		createPlayerDataString : function()
		{
			var dataString = "";
			for(var player in this.players )
			{
				var p = this.players[player];
				dataString += "<p id=\"" + player + "\">" + p.name + "," + p.points + "," + p.alliance + "</p>\n";
			}
			return dataString;
		},
		testString : null,
		testCode : function()
		{
			try
			{
				this.testString = "";
				var cluster = 327;
				var b = this.worldData.d[cluster];
				var SCC = new Array();
				for( i = 0; i < 32; i++)
				{
					SCC[i] = new Array();
					for( j = 0; j < 32; j++)
					{
						SCC[i][j] = null;
					}
				}
				if(b)
				{
					this.EmpDebug("Test code - got cluster " + cluster);
					cy = Math.floor(cluster / 32);
					cx = cluster - cy * 32;
					sx = cx * 32;
					sy = cy * 32;
					this.EmpDebug("Cluster starts at " + sx + ":" + sy);
					var terrain = b.get_Terrain();
					var details = b.get_TerrainDetails();
					for(var e = 0; (e < 0x20); e++)
					{
						for(var f = 0; (f < 0x20); f++)
						{
							var g = b.GetObject(e, f);
							if(g == null)
							{
								var h = false;
								if(((terrain.l[f] >> (e & 0x1f)) & 1) != 0)
								{
									var i = ((f * 0x20) + e);
									var j = Math.floor(i / 6);
									var k = ((i % 6) * 5);
									h = (((details.l[j] >> (k & 0x1f)) & 0x1f) == 0);
									this.EmpDebug("Terrain at " + e + ":" + f + " i = " + i + ", j = " + j + ", k = " + k + ", details = " + ((details.l[j] >> (k & 0x1f)) & 0x1f));
								}
								else
								{
									this.EmpDebug("Sea at " + e + ":" + f);
								}
								if(!h)
								{
									this.EmpDebug("Disposing at " + e + ":" + f);
									// if(this.SCC[e][f] != null)
									// {
									// this.SCC[e][f].TE();
									// }
									// this.SCC[e][f] = null;
								}
								else if(SCC[e][f] == null)
								{
									this.EmpDebug("Trying to create an object at " + e + ":" + f);
									// this.SCC[e][f] = (new $I.BFC).SE(this.NCC, (this.OCC + e), (this.PCC + f));
								}
								// else if(SCC[e][f].UE() != $I.EGD.FreeSlot)
								// {
								// this.SCC[e][f].TE();
								// this.SCC[e][f] = (new $I.BFC).SE(this.NCC, (this.OCC + e), (this.PCC + f));
								// }
							}
							else
							{
								this.EmpDebug("Some object at " + e + ":" + f);
								// this.KCC(b, e, f, g);
							}
						}
					}
					this.createOutputWindow("Cluster Data", this.testString);
				}
				else
				{
					EmpDebug("Test code - no cluster 327");
				}
			}
			catch(e)
			{
				EmpDebug("Test code: " + e);
			}
		},
		EmpDebug : function(s)
		{
			this.testString += s + "\n";
		}
	}
});
// $Header: /Home/Emperor/Emperor.NRG.AutoRaid.js,v 1.13 2013/05/11 16:32:29 Aare Exp $

// Nessus auto-raider

qx.Class.define("Emperor.NRG.AutoRaid",
{
	type : "singleton",
	extend : qx.core.Object,
	construct : function()
	{
	},
	members :
	{
		dungeonLoot : [0, 200, 1000, 5000, 20000, 70000, 200000, 300000, 400000, 600000, 1000000],
		autoRaid : function()
		{
			try
			{
				var dungeons = this.createDungeonsArray();
				var orderLimit = this.getOrderLimit();
				var sentRaid = true;
				var city = webfrontend.data.City.getInstance();
				var res = webfrontend.res.Main.getInstance();
				var queue = Emperor.Net.CommandQueue.getInstance();
				while(sentRaid && (orderLimit > 0))
				{
					sentRaid = false;
					for(var i = 0; i < 13; i++)
					{
						// no units
						if(city.units[i] == null)
							continue;
						// no carry
						var carry = res.units[i].c;
						if(carry == 0)
							continue;
						var troopsLeft = city.units[i].count;
						for(var d = 0; d < dungeons.length && orderLimit > 0; d++)
						{
							var dungeonCoord = dungeons[d].coord;
							var level = dungeons[d].level;
							var loot = this.dungeonLoot[level];
							loot = Math.floor(loot * 0.75);
							var numUnitsPerRep = Math.floor(loot / carry);
							if((troopsLeft > 0.75 * numUnitsPerRep) && (troopsLeft < 1.5 * numUnitsPerRep))
								numUnitsPerRep = troopsLeft;
							if(troopsLeft >= numUnitsPerRep)
							{
								var unitsToSend = new Array();
								var unitString = "" + i;
								unitsToSend.push(
								{
									t : unitString,
									c : numUnitsPerRep
								});
								queue.push(
								{
									a : "OrderUnits",
									p :
									{
										cityid : city.getId(),
										units : unitsToSend,
										targetPlayer : "",
										targetCity : dungeonCoord,
										order : 8,
										transport : 1,
										iUnitOrderOptions : 0,
										timeReferenceType : 1,
										referenceTimeUTCMillis : 0,
										raidTimeReferenceType : 1,
										raidReferenceTimeUTCMillis : 0,
										createCity : ""
									}
								});
								sentRaid = true;
								orderLimit--;
								troopsLeft -= numUnitsPerRep;
							}
						}
					}
				}
				queue.sendCommands();
			}
			catch(e)
			{
				EmpDebug("AutoRaid: " + e);
			}
		},
		getOrderLimit : function()
		{
			var orderCount = 0;
			if(webfrontend.data.City.getInstance().getUnitOrders() != null)
			{
				orderCount = webfrontend.data.City.getInstance().getUnitOrders().length;
			}
			var orderLimit = webfrontend.data.City.getInstance().getOrderLimit() - orderCount;
			return orderLimit;
		},
		createDungeonsArray : function()
		{
			var dungeons = new Array();
			try
			{
				var dist = 3;
				while(dungeons.length < 20 && dist < 15)
				{
					dungeons = this.findClosestDungeon(4, dist);
					dist++;
				}
			}
			catch(e)
			{
				EmpDebug("CreateDungeons: " + e);
			}
			return dungeons;
		},
		convertIdToCoordinatesObject : function(id)
		{
			var o =
			{
				xPos : (id & 0xFFFF),
				yPos : (id >> 16),
			}
			o.cont = webfrontend.data.Server.getInstance().getContinentFromCoords(o.xPos, o.yPos);
			return o;
		},
		findClosestDungeon : function(minLevel, maxDist)
		{
			var dungeons = new Array();
			var visMain = Emp.a.worldViewToolTip.getVisMain();
			var coords = this.convertIdToCoordinatesObject(webfrontend.data.City.getInstance().getId());
			for(var xCoord = coords.xPos - maxDist; xCoord <= coords.xPos + maxDist; xCoord++)
			{
				for(var yCoord = coords.yPos - maxDist; yCoord <= coords.yPos + maxDist; yCoord++)
				{
					var xPos = visMain.ScreenPosFromWorldPosX(xCoord * 128 + 64);
					var yPos = visMain.ScreenPosFromWorldPosY(yCoord * 80 + 40);
					var tooltipText = visMain.GetTooltipText(xPos, yPos);
					var level = 0;
					if(tooltipText.match(/<td width="75">Type:<\/td><td>.+?<\/td>/))
					{
						if(tooltipText.match(/<td>Level:<\/td><td>(.+?)<\/td>/))
						{
							level = tooltipText.match(/<td>Level:<\/td><td>(.+?)<\/td>/)[1];
						}
					}
					if(level >= minLevel)
					{
						var diffX = Math.abs(coords.xPos - xCoord);
						var diffY = Math.abs(coords.yPos - yCoord);
						var dist = Math.sqrt(diffX * diffX + diffY * diffY);
						if(tooltipText.indexOf("Forest Dungeon") != -1)
							dist += 1;
						if(tooltipText.indexOf("Hill Dungeon") != -1)
							dist += 0;
						if(tooltipText.indexOf("Mountain Dungeon") != -1)
							dist += 3;
						dungeons.push(
						{
							coord : xCoord + ":" + yCoord,
							level : level,
							dist : dist
						});
					}
				}
			}
			dungeons.sort(this.dungeonSort);
			return dungeons;
		},
		dungeonSort : function(a, b)
		{
			if(a.level == (b.level - 1) && a.dist < (b.dist - 3))
				return -1;
			if(b.level == (a.level - 1) && b.dist < (a.dist - 3))
				return +1;
			if(a.level == b.level)
			{
				return a.dist - b.dist;
			}
			else
			{
				return b.level - a.level;
			}
		},
	},
});
// $Header: /Home/Emperor/Emperor.NRG.ContextMenu.js,v 1.5 2012/12/11 15:29:35 Aare Exp $

// Nessus River Guardian context menu for region and world views

qx.Class.define("Emperor.NRG.ContextMenu",
{
	type : "singleton",
	extend : qx.core.Object,
	construct : function()
	{
		try
		{
			this.worldContext = new qx.ui.menu.Menu();
			this.worldContext.setIconColumnWidth(0);
			this.copyMenu = new qx.ui.menu.Menu();
			this.copyMenu.setIconColumnWidth(0);
			this.infoMenu = new qx.ui.menu.Menu();
			this.infoMenu.setIconColumnWidth(0);
			this.selectCityBtn = new qx.ui.menu.Button("Switch to City");
			this.viewReportsBtn = new qx.ui.menu.Button("View Reports");
			this.killBossBtn = new qx.ui.menu.Button("Kill Boss");
			this.raidDungeonBtn = new qx.ui.menu.Button("Raid Max");
			this.raidDungeon1Btn = new qx.ui.menu.Button("Raid 1");
			this.raidDungeonAllBtn = new qx.ui.menu.Button("Raid all");
			this.sendArmyBtn = new qx.ui.menu.Button("Send Army");
			this.plunderBtn = new qx.ui.menu.Button("Plunder");
			this.scoutBtn = new qx.ui.menu.Button("Scout");
			this.copyBtn = new qx.ui.menu.Button("Copy to Chat");
			this.copyBtnSub = new qx.ui.menu.Button("Copy to Chat", null, null, this.copyMenu);
			this.copyCoordBtn = new qx.ui.menu.Button("Coordinates");
			this.copyPlayerBtn = new qx.ui.menu.Button("Player");
			this.copyAllianceBtn = new qx.ui.menu.Button("Alliance");
			this.copyToMailBtn = new qx.ui.menu.Button("Copy to Mail", null, null, this.copyMenu);
			this.sendResBtn = new qx.ui.menu.Button("Send Resources");
			this.infoBtn = new qx.ui.menu.Button("Info", null, null, this.infoMenu);
			this.infoPlayerBtn = new qx.ui.menu.Button("Player");
			this.infoAllianceBtn = new qx.ui.menu.Button("Alliance");
			this.whisperBtn = new qx.ui.menu.Button("Whisper");
			this.worldContext.add(this.selectCityBtn);
			this.worldContext.add(this.killBossBtn);
			this.worldContext.add(this.raidDungeonBtn);
			this.worldContext.add(this.raidDungeon1Btn);
			this.worldContext.add(this.raidDungeonAllBtn);
			this.worldContext.add(this.sendArmyBtn);
			this.worldContext.add(this.plunderBtn);
			this.worldContext.add(this.scoutBtn);
			this.worldContext.add(this.sendResBtn);
			this.worldContext.add(this.viewReportsBtn);
			this.worldContext.add(this.infoBtn);
			this.worldContext.add(this.whisperBtn);
			this.worldContext.add(this.copyBtn);
			this.worldContext.add(this.copyBtnSub);
			this.worldContext.add(this.copyToMailBtn);
			this.copyMenu.add(this.copyCoordBtn);
			this.copyMenu.add(this.copyPlayerBtn);
			this.copyMenu.add(this.copyAllianceBtn);
			this.infoMenu.add(this.infoPlayerBtn);
			this.infoMenu.add(this.infoAllianceBtn);

			Emp.a.worldView.setContextMenu(this.worldContext);
			Emp.a.worldView.addListener("beforeContextmenuOpen", function()
			{
				this.updateWorldViewContext();
			}, this);
			this.selectCityBtn.addListener("execute", this.selectCity, this);
			this.viewReportsBtn.addListener("execute", this.viewReports, this);
			this.killBossBtn.addListener("execute", this.killBoss, this);
			this.raidDungeonBtn.addListener("execute", this.raidDungeon, this);
			this.raidDungeon1Btn.addListener("execute", this.raidDungeonOne, this);
			this.raidDungeonAllBtn.addListener("execute", this.raidDungeonAll, this);
			this.sendArmyBtn.addListener("execute", this.sendArmy, this);
			this.plunderBtn.addListener("execute", this.plunder, this);
			this.scoutBtn.addListener("execute", this.scout, this);
			this.copyBtn.addListener("execute", this.copy, this);
			this.copyBtnSub.addListener("execute", this.copySub, this);
			this.copyCoordBtn.addListener("execute", this.copyCoord, this);
			this.copyPlayerBtn.addListener("execute", this.copyPlayer, this);
			this.copyAllianceBtn.addListener("execute", this.copyAlliance, this);
			this.copyToMailBtn.addListener("execute", this.copyToMail, this);
			this.sendResBtn.addListener("execute", this.sendResources, this);
			this.infoPlayerBtn.addListener("execute", this.playerInfo, this);
			this.infoAllianceBtn.addListener("execute", this.allianceInfo, this);
			this.whisperBtn.addListener("execute", this.whisper, this);
		}
		catch(e)
		{
			EmpDebug("NRG.ContextMenu: " + e);
		}
	},
	members :
	{
		worldViewCoord : null,
		worldContext : null,
		copyMenu : null,
		infoMenu : null,
		selectCityBtn : null,
		viewReportsBtn : null,
		killBossBtn : null,
		raidDungeonBtn : null,
		raidDungeon1Btn : null,
		raidDungeonAllBtn : null,
		sendArmyBtn : null,
		plunderBtn : null,
		scoutBtn : null,
		sendResBtn : null,
		copyBtn : null,
		copyBtnSub : null,
		copyCoordBtn : null,
		copyPlayerBtn : null,
		copyAllianceBtn : null,
		copyToMailBtn : null,
		infoBtn : null,
		infoPlayerBtn : null,
		infoAllianceBtn : null,
		whisperBtn : null,
		//Coord Types
		CITY : 1,
		LAWLESS : 2,
		BOSS : 4,
		DUNGEON : 8,
		SHRINE : 16,
		MOONGATE : 32,
		SETTLE : 64,
		EMPTY : 128,
		ATTACKABLE : 256,
		ANY : 512,
		updateWorldViewContext : function()
		{
			try
			{
				this.selectCityBtn.setVisibility("excluded");
				this.viewReportsBtn.setVisibility("excluded");
				this.killBossBtn.setVisibility("excluded");
				this.raidDungeonBtn.setVisibility("excluded");
				this.raidDungeon1Btn.setVisibility("excluded");
				this.raidDungeonAllBtn.setVisibility("excluded");
				this.sendArmyBtn.setVisibility("excluded");
				this.plunderBtn.setVisibility("excluded");
				this.scoutBtn.setVisibility("excluded");
				this.sendResBtn.setVisibility("excluded");
				this.copyBtn.setVisibility("excluded");
				this.copyBtnSub.setVisibility("excluded");
				this.copyToMailBtn.setVisibility("excluded");
				this.infoBtn.setVisibility("excluded");
				this.whisperBtn.setVisibility("excluded");
				if(Emp.a.visMain.mapmode == "r" || Emp.a.visMain.mapmode == "w")
				{
					var coord = this.updateWorldViewCoord();
					if(coord && this.checkCoordType(this.CITY) && coord.playerName == this.playerName && this.selectCity(
					{
						"cityX" : coord.xPos,
						"cityY" : coord.yPos,
						"cityIsMine" : true
					}))
					{
						this.selectCityBtn.setVisibility("visible");
						this.sendArmyBtn.setVisibility("visible");
						this.viewReportsBtn.setVisibility("visible");
						this.copyBtnSub.setVisibility("visible");
						this.sendResBtn.setVisibility("visible");
						this.infoBtn.setVisibility("visible");
						if(Emp.a.sendMail && Emp.a.sendMail.isSeeable())
						{
							this.copyToMailBtn.setVisibility("visible");
						}
					}
					else if(coord && this.checkCoordType(this.ATTACKABLE))
					{
						this.viewReportsBtn.setVisibility("visible");
						this.sendArmyBtn.setVisibility("visible");
						if(this.getBossLevel() > 0)
						{
							var tc = this.countTroopsToKillTheBoss();
							if(tc.c > 0)
								this.killBossBtn.setVisibility("visible");
						}
						if(this.getDungeonLevel() > 0)
						{
							this.raidDungeonBtn.setVisibility("visible");
							this.raidDungeon1Btn.setVisibility("visible");
							this.raidDungeonAllBtn.setVisibility("visible");
						}
						if(this.checkCoordType(this.CITY))
						{
							this.plunderBtn.setVisibility("visible");
							this.scoutBtn.setVisibility("visible");
							this.copyBtnSub.setVisibility("visible");
							this.sendResBtn.setVisibility("visible");
							this.infoBtn.setVisibility("visible");
							this.whisperBtn.setVisibility("visible");
							if(Emp.a.sendMail && Emp.a.sendMail.isSeeable())
							{
								this.copyToMailBtn.setVisibility("visible");
							}
						}
						else
						{
							this.copyBtn.setVisibility("visible");
						}
					}
					else if(coord && this.checkCoordType(this.ANY))
					{
						this.copyBtn.setVisibility("visible");
					}
				}
			}
			catch(e)
			{
				EmpDebug("UpdateContext: " + e);
			}
		},
		updateWorldViewCoord : function()
		{
			try
			{
				if(this.worldViewCoord == null)
				{
					this.worldViewCoord = new Object();
				}
				var worldViewToolTip = Emp.a.worldViewToolTip;
				var id = 0;
				var playerName = null;
				var allianceName = "";
				var type = null;
				var xPos = worldViewToolTip.x - worldViewToolTip.getWorldView().getContentLocation().left;
				var yPos = worldViewToolTip.y - worldViewToolTip.getWorldView().getContentLocation().top;
				var xCoord = worldViewToolTip.getVisMain().GetXCoordFromViewPosition(xPos);
				var yCoord = worldViewToolTip.getVisMain().GetYCoordFromViewPosition(yPos);
				var tooltipText = worldViewToolTip.getVisMain().GetTooltipText(xPos, yPos);
				var level = 0;
				var progress = 0;
				if(tooltipText.match(/<td>Player:<\/td><td>(.+?) <span dir="ltr">(.+?)<\/td>/))
				{
					playerName = tooltipText.match(/<td>Player:<\/td><td>(.+?) <span dir="ltr">(.+?)<\/td>/)[1];
					if(tooltipText.match(/<td>Alliance:<\/td><td>(.+?) <span dir="ltr">(.+?)<\/td>/))
					{
						allianceName = tooltipText.match(/<td>Alliance:<\/td><td>(.+?) <span dir="ltr">(.+?)<\/td>/)[1];
					}
					type = "City";
				}
				else if(tooltipText.match(/<td>Score:<\/td><td>.+?<\/td>/))
				{
					type = "LawlessCity";
				}
				else if(tooltipText.match(/<td width="75">Type:<\/td><td>.+?<\/td>/))
				{
					type = "Dungeon";
					if(tooltipText.match(/<td>Level:<\/td><td>(.+?)<\/td>/))
					{
						level = tooltipText.match(/<td>Level:<\/td><td>(.+?)<\/td>/)[1];
					}
					if(tooltipText.match(/<td>Progress:<\/td><td>(.+?)%<\/td>/))
					{
						progress = tooltipText.match(/<td>Progress:<\/td><td>(.+?)%<\/td>/)[1];
					}
				}
				else if(tooltipText.match(/<td width="75">Name:<\/td><td>.+?<\/td>/))
				{
					type = "Boss";
					if(tooltipText.match(/<td>Level:<\/td><td>(.+?)<\/td>/))
					{
						level = tooltipText.match(/<td>Level:<\/td><td>(.+?)<\/td>/)[1];
					}
					if(tooltipText.match(/<td width="75">Name:<\/td><td>(.+?)<\/td>/))
					{
						playerName = tooltipText.match(/<td width="75">Name:<\/td><td>(.+?)<\/td>/)[1];
					}
				}
				else
				{
					type = "FreeSlot";
				}
				this.worldViewCoord.id = (yCoord << 0x10) | xCoord;
				this.worldViewCoord.xPos = xCoord;
				this.worldViewCoord.yPos = yCoord;
				this.worldViewCoord.playerName = playerName;
				this.worldViewCoord.allianceName = allianceName;
				this.worldViewCoord.type = type;
				this.worldViewCoord.level = level;
				this.worldViewCoord.progress = progress;
				return this.worldViewCoord;
			}
			catch(e)
			{
				EmpDebug("UpdateWorldViewCoord: " + e);
			}
		},
		checkCoordType : function(types)
		{
			try
			{
				var coord = this.worldViewCoord;
				if(types & this.CITY && coord.type == "City")
				{
					return true;
				}
				else if(types & this.LAWLESS && coord.type == "LawlessCity")
				{
					return true;
				}
				else if(types & this.BOSS && coord.type == "Boss")
				{
					return true;
				}
				else if(types & this.DUNGEON && coord.type == "Dungeon")
				{
					return true;
				}
				else if(types & this.SHRINE && coord.type == "Shrine")
				{
					return true;
				}
				else if(types & this.MOONGATE && coord.type == "Moongate")
				{
					return true;
				}
				else if(types & this.SETTLE && coord.type == "Settle")
				{
					return true;
				}
				else if(types & this.EMPTY && coord.type == "FreeSlot")
				{
					return true;
				}
				else if(types & this.ATTACKABLE && (coord.type == "City" || coord.type == "Boss" || coord.type == "Dungeon" || coord.type == "LawlessCity"))
				{
					return true;
				}
				else if(types & this.ANY)
				{
					return true;
				}
				return false;
			}
			catch(e)
			{
				EmpDebug("CheckCoordType: " + e);
			}
		},
		getDungeonLevel : function()
		{
			var coord = this.worldViewCoord;
			if(coord.type == "Dungeon")
			{
				return coord.level;
			}
			return 0;
		},
		selectCity : function()
		{
			try
			{
				var coord = this.worldViewCoord;
				if(coord && this.checkCoordType(this.CITY) && coord.playerName == this.playerName)
				{
					this.selectCity(
					{
						"cityX" : coord.xPos,
						"cityY" : coord.yPos
					});
				}
			}
			catch(e)
			{
				EmpDebug("SelectCity: " + e);
			}
		},
		viewReports : function()
		{
			try
			{
				var coord = this.worldViewCoord;
				if(coord && this.checkCoordType(this.ATTACKABLE))
				{
					Emp.a.showInfoPage(Emp.a.getCityInfoPage(),
					{
						"id" : coord.id
					});
				}
			}
			catch(e)
			{
				EmpDebug("ViewReports: " + e);
			}
		},
		countTroopsToKillTheBoss : function()
		{
			try
			{
				var coord = this.worldViewCoord;
				if(coord && this.checkCoordType(this.ATTACKABLE))
				{
					var bossStrLike = [420, 2500, 17000, 33000, 83000, 125000, 187500, 250000, 375000];
					var bossStrUnlike = [625, 3750, 25000, 50000, 125000, 187500, 250000, 375000, 562500];
					var faithType = [0, 4, 4, 5, 5, 5, 2, 2, 2, 5, 5, 2, 2, 7, 7, 4, 4, 7];
					var modifiers = [0, 97, 110, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 112, 111, 113];
					var unitBossMatch = ["", "", "", "Hydra", "", "Hydra", "Hydra", "Moloch", "", "Dragon", "Dragon", "Dragon", "Moloch", "", "", "", "Octopus", "Octopus"];
					var bossLevel = this.getBossLevel();
					var res = webfrontend.res.Main.getInstance();
					if(bossLevel > 0)
					{
						var countNeeded = 0;
						var unitType = 0;
						for(var i = 0; i < 18; i++)
						{
							if(webfrontend.data.City.getInstance().units[i] != null)
							{
								var attackPower = res.units[i].av;
								var bonus = 0;
								var faith = webfrontend.data.Alliance.getInstance().getFaith();
								if(faith)
								{
									var add = faith[faithType[i]];
									if(add > 100)
										add = 100;
									bonus = add / 2;
								}
								var modifier = modifiers[i];
								bonus += this.getResearchBonus(modifier);
								attackPower *= 100 + bonus;
								attackPower /= 100;
								if(this.getBossName() == unitBossMatch[i])
								{
									countNeeded = bossStrLike[bossLevel - 1] * 4 / attackPower;
								}
								else
								{
									countNeeded = bossStrUnlike[bossLevel - 1] * 4 / attackPower;
								}
								if(countNeeded > 0 && countNeeded <= webfrontend.data.City.getInstance().units[i].count)
								{
									unitType = i;
									break;
								}
								else
								{
									countNeeded = 0;
								}
							}
						}
						var ret =
						{
							t : unitType,
							c : countNeeded
						};
						var bossCont = webfrontend.data.Server.getInstance().getContinentFromCoords(coord.xPos, coord.yPos);
						var cityid = webfrontend.data.City.getInstance().getId();
						var city = webfrontend.data.Player.getInstance().getCity(cityid);
						var cityCont = webfrontend.data.Server.getInstance().getContinentFromCoords(city.xPos, city.yPos);
						if(cityCont != bossCont)
						{
							ret.c = Math.floor(ret.c * 1.25);
						}
						return ret;
					}
				}
			}
			catch(e)
			{
				EmpDebug("CountTroops: " + e);
			}
			var ret =
			{
				t : 0,
				c : 0
			};
			return ret;
		},
		killBoss : function()
		{
			try
			{
				var coord = this.worldViewCoord;
				if(coord && this.checkCoordType(this.ATTACKABLE))
				{
					// unit types
					// 1 - cg
					// 2 - ballista
					// 3 - ranger
					// 4 - guardian
					// 5 - templar
					// 6 - zerk
					// 7 - mage
					// 8 - scout
					// 9 - xbow
					// 10 - paladin
					// 11 - knight
					// 12 - warlock
					// 13 - ram
					// 14 - cat
					// 15 - frigate
					// 16 - sloop
					// 17 - WG
					// 19 - baron
					var trans = 1;
					var bossLevel = this.getBossLevel();
					if(bossLevel > 0)
					{
						var tc = this.countTroopsToKillTheBoss();
						if(tc.c > 0)
						{
							var unitsToSend = new Array();
							unitsToSend.push(
							{
								t : tc.t,
								c : Math.floor(tc.c)
							});
							webfrontend.net.CommandManager.getInstance().sendCommand("OrderUnits",
							{
								cityid : webfrontend.data.City.getInstance().getId(),
								units : unitsToSend,
								targetPlayer : "",
								targetCity : coord.xPos + ":" + coord.yPos,
								order : 8,
								transport : tc.t > 14 ? 2 : 1,
								timeReferenceType : 1,
								referenceTimeUTCMillis : 0,
								raidTimeReferenceType : 0,
								raidReferenceTimeUTCMillis : 0
							}, this, this.onTroopsSent);
						}
						else
						{
							EmpDebug("Not enough units");
						}
					}
				}
			}
			catch(e)
			{
				EmpDebug("KillBoss: " + e);
			}
		},
		onTroopsSent : function(ok, errorCode)
		{
			try
			{
				if(errorCode.r0 != 0 || errorCode.r1 != 0)
				{
					EmpDebug("Troops won't go, error " + errorCode.r0 + ":" + errorCode.r1);
				}
			}
			catch (e)
			{
				EmpDebug("OnTroopsSent: " + e);
			}
		},
		getResearchBonus : function(modifier)
		{
			try
			{
				var tt = webfrontend.data.Player.getInstance().getTechTree();
				var res = webfrontend.res.Main.getInstance();
				for(var i = 0; i < tt.length; i++)
				{
					var tts = res.techTreeSteps[tt[i]];
					if(tts.m[0].m == modifier)
						return tts.m[0].v;
				}
				return 0;
			}
			catch(e)
			{
				EmpDebug("GetResearchBonus: " + e);
			}
		},
		getBossLevel : function()
		{
			var coord = this.worldViewCoord;
			if(coord.type == "Boss")
			{
				return coord.level;
			}
			return 0;
		},
		getBossName : function()
		{
			var coord = this.worldViewCoord;
			if(coord.type == "Boss")
			{
				return coord.playerName;
			}
			return "";
		},
		raidDungeon : function()
		{
			try
			{
				// var coord = this.worldViewCoord;
				// if(coord && this.checkCoordType(this.ATTACKABLE) && this.getDungeonLevel() > 0)
				// {
				// var level = this.getDungeonLevel();
				// var lootMin = NRG.options.DungeonLoot[level];
				// var lootMax = NRG.options.DungeonLootMax[level];
				// var loot = ((lootMax - lootMin) * coord.progress) / 100 + lootMin;
				// window.console.debug(coord.progress, lootMin, lootMax, loot);
				// var unitType = -1;
				// var orderCount = 0;
				// if(webfrontend.data.City.getInstance().getUnitOrders() != null)
				// {
				// orderCount = webfrontend.data.City.getInstance().getUnitOrders().length;
				// }
				// var orderLimit = webfrontend.data.City.getInstance().getOrderLimit() - orderCount;
				// for(var i = 0; i < 18 && orderLimit > 0; i++)
				// {
				// if(webfrontend.data.City.getInstance().units[i] != null)
				// {
				// if(NRG.options.RaidUnitCarry[i] > 0 && webfrontend.data.City.getInstance().units[i].count > 0)
				// {
				// var numUnitsPerRep = Math.floor(loot / NRG.options.RaidUnitCarry[i]);
				// var maxReps = Math.floor(webfrontend.data.City.getInstance().units[i].count / numUnitsPerRep);
				// for(var x = 0; x < maxReps && orderLimit > 0; x++)
				// {
				// var unitsToSend = new Array();
				// var unitString = "" + i;
				// var trans = 1;
				// if(i > 14)
				// {
				// trans = 2;
				// }
				// unitsToSend.push(
				// {
				// t : unitString,
				// c : numUnitsPerRep
				// });
				// webfrontend.net.CommandManager.getInstance().sendCommand("OrderUnits",
				// {
				// cityid : webfrontend.data.City.getInstance().getId(),
				// units : unitsToSend,
				// targetPlayer : "",
				// targetCity : coord.xPos + ":" + coord.yPos,
				// order : 8,
				// transport : trans,
				// iUnitOrderOptions : 0,
				// timeReferenceType : 1,
				// referenceTimeUTCMillis : 0,
				// raidTimeReferenceType : 1,
				// raidReferenceTimeUTCMillis : 0,
				// createCity : ""
				// }, this, this.onTroopsSent);
				// orderLimit = orderLimit - 1;
				// }
				// }
				// }
				// }
				// }
			}
			catch(e)
			{
				EmpDebug("RaidDungeon: " + e);
			}
		},
		raidDungeonOne : function()
		{
			try
			{
				// var coord = this.worldViewCoord;
				// if(coord && this.checkCoordType(this.ATTACKABLE) && this.getDungeonLevel() > 0)
				// {
				// var level = this.getDungeonLevel();
				// var lootMin = NRG.options.DungeonLoot[level];
				// var lootMax = NRG.options.DungeonLootMax[level];
				// var loot = ((lootMax - lootMin) * coord.progress) / 100 + lootMin;
				// window.console.debug(coord.progress, lootMin, lootMax, loot);
				// var unitType = -1;
				// var orderCount = 0;
				// if(webfrontend.data.City.getInstance().getUnitOrders() != null)
				// {
				// orderCount = webfrontend.data.City.getInstance().getUnitOrders().length;
				// }
				// var orderLimit = webfrontend.data.City.getInstance().getOrderLimit() - orderCount;
				// for(var i = 0; i < 18 && orderLimit > 0; i++)
				// {
				// if(webfrontend.data.City.getInstance().units[i] != null)
				// {
				// if(NRG.options.RaidUnitCarry[i] > 0 && webfrontend.data.City.getInstance().units[i].count > 0)
				// {
				// var numUnitsPerRep = Math.floor(loot / NRG.options.RaidUnitCarry[i]);
				// var maxReps = Math.floor(webfrontend.data.City.getInstance().units[i].count / numUnitsPerRep);
				// for(var x = 0; x < maxReps && orderLimit > 0; x++)
				// {
				// var unitsToSend = new Array();
				// var unitString = "" + i;
				// var trans = 1;
				// if(i > 14)
				// {
				// trans = 2;
				// }
				// unitsToSend.push(
				// {
				// t : unitString,
				// c : numUnitsPerRep
				// });
				// webfrontend.net.CommandManager.getInstance().sendCommand("OrderUnits",
				// {
				// cityid : webfrontend.data.City.getInstance().getId(),
				// units : unitsToSend,
				// targetPlayer : "",
				// targetCity : coord.xPos + ":" + coord.yPos,
				// order : 8,
				// transport : trans,
				// iUnitOrderOptions : 0,
				// timeReferenceType : 1,
				// referenceTimeUTCMillis : 0,
				// raidTimeReferenceType : 1,
				// raidReferenceTimeUTCMillis : 0,
				// createCity : ""
				// }, this, this.onTroopsSent);
				// orderLimit = 0;
				// }
				// }
				// }
				// }
				// }
			}
			catch(e)
			{
				EmpDebug("RaidDungeonOne: " + e);
			}
		},
		raidDungeonAll : function()
		{
			try
			{
				// var coord = this.worldViewCoord;
				// if(coord && this.checkCoordType(this.ATTACKABLE) && this.getDungeonLevel() > 0)
				// {
				// var unitType = -1;
				// var orderCount = 0;
				// if(webfrontend.data.City.getInstance().getUnitOrders() != null)
				// {
				// orderCount = webfrontend.data.City.getInstance().getUnitOrders().length;
				// }
				// var orderLimit = webfrontend.data.City.getInstance().getOrderLimit() - orderCount;
				// var unitsToSend = new Array();
				// var trans = 1;
				// for(var i = 0; i < 15; i++)
				// {
				// if(webfrontend.data.City.getInstance().units[i] != null)
				// {
				// if(NRG.options.RaidUnitCarry[i] > 0 && webfrontend.data.City.getInstance().units[i].count > 0)
				// {
				// var unitString = "" + i;
				// unitsToSend.push(
				// {
				// t : unitString,
				// c : webfrontend.data.City.getInstance().units[i].count
				// });
				// }
				// }
				// }
				// if(orderLimit > 0 && unitsToSend.length > 0)
				// {
				// webfrontend.net.CommandManager.getInstance().sendCommand("OrderUnits",
				// {
				// cityid : webfrontend.data.City.getInstance().getId(),
				// units : unitsToSend,
				// targetPlayer : "",
				// targetCity : coord.xPos + ":" + coord.yPos,
				// order : 8,
				// transport : trans,
				// iUnitOrderOptions : 0,
				// timeReferenceType : 1,
				// referenceTimeUTCMillis : 0,
				// raidTimeReferenceType : 1,
				// raidReferenceTimeUTCMillis : 0,
				// createCity : ""
				// }, this, this.onTroopsSent);
				// }
				// }
			}
			catch(e)
			{
				EmpDebug("RaidDungeonAll: " + e);
			}
		},
		sendArmy : function()
		{
			try
			{
				var coord = this.worldViewCoord;
				if(coord && this.checkCoordType(this.ATTACKABLE))
				{
					Emp.a.showSendArmy(coord.xPos, coord.yPos);
				}
			}
			catch(e)
			{
				EmpDebug("SendArmy: " + e);
			}
		},
		plunder : function()
		{
			try
			{
				var coord = this.worldViewCoord;
				if(coord && this.checkCoordType(this.CITY))
				{
					var unitsToSend = new Array();
					for(var i = 0; i < 13; i++)
					{
						if(webfrontend.data.City.getInstance().units[i] != null)
						{
							if(webfrontend.data.City.getInstance().units[i].count > 0)
							{
								var unitString = "" + i;
								unitsToSend.push(
								{
									t : unitString,
									c : webfrontend.data.City.getInstance().units[i].count
								});
							}
						}
					}
					webfrontend.net.CommandManager.getInstance().sendCommand("OrderUnits",
					{
						cityid : webfrontend.data.City.getInstance().getId(),
						units : unitsToSend,
						targetPlayer : coord.playerName,
						targetCity : coord.xPos + ":" + coord.yPos,
						order : 2,
						transport : 1,
						iUnitOrderOptions : 0,
						timeReferenceType : 1,
						referenceTimeUTCMillis : 0,
						raidTimeReferenceType : 0,
						raidReferenceTimeUTCMillis : 0,
						createCity : ""
					}, this, this.onTroopsSent);
				}
			}
			catch(e)
			{
				EmpDebug("Plunder: " + e);
			}
		},
		scout : function()
		{
			try
			{
				var coord = this.worldViewCoord;
				if(coord && this.checkCoordType(this.CITY))
				{
					var unitsToSend = new Array();
					if(webfrontend.data.City.getInstance().units[8] != null)
					{
						if(webfrontend.data.City.getInstance().units[8].count >= 1500)
						{
							unitsToSend.push(
							{
								t : 8,
								c : 1500
							});
						}
					}
					webfrontend.net.CommandManager.getInstance().sendCommand("OrderUnits",
					{
						cityid : webfrontend.data.City.getInstance().getId(),
						units : unitsToSend,
						targetPlayer : coord.playerName,
						targetCity : coord.xPos + ":" + coord.yPos,
						order : 1,
						transport : 1,
						iUnitOrderOptions : 0,
						timeReferenceType : 1,
						referenceTimeUTCMillis : 0,
						raidTimeReferenceType : 0,
						raidReferenceTimeUTCMillis : 0,
						createCity : ""
					}, this, this.onTroopsSent);
				}
			}
			catch(e)
			{
				EmpDebug("Scout: " + e);
			}
		},
		copy : function()
		{
			try
			{
				var coord = this.worldViewCoord;
				if(coord && this.checkCoordType(this.ANY))
				{
					this.sendToChat("[city]" + webfrontend.gui.Util.formatCoordinates(coord.xPos, coord.yPos) + "[/city]");
				}
			}
			catch(e)
			{
				EmpDebug("Copy: " + e);
			}
		},
		sendToChat : function(msg, overWrite)
		{
			try
			{
				var str = "";
				if(!overWrite && Emp.a.chat && Emp.a.chat.chatLine.getValue())
				{
					str = Emp.a.chat.chatLine.getValue();
					str = str.substr(0, Emp.a.chat.chatLine.getTextSelectionStart()) + msg + str.substr(Emp.a.chat.chatLine.getTextSelectionEnd());
					msg = "";
				}
				Emp.a.chat.chatLine.setValue(str + msg);
			}
			catch(e)
			{
				EmpDebug("SendToChat: " + e);
			}
		},
		sendToMail : function(msg, overWrite)
		{
			try
			{
				var str = "";
				if(!overWrite && Emp.a.sendMail && Emp.a.sendMail.message.getValue())
				{
					str = Emp.a.sendMail.message.getValue();
					str = str.substr(0, Emp.a.sendMail.message.getTextSelectionStart()) + msg + str.substr(Emp.a.sendMail.message.getTextSelectionEnd());
					msg = "";
				}
				Emp.a.sendMail.message.setValue(str + msg);
			}
			catch(e)
			{
				EmpDebug("SendToMail: " + e);
			}
		},
		copySub : function()
		{
			try
			{
				var coord = Emp.a.worldViewCoord;
				if(coord && Emp.a.checkCoordType(this.ANY))
				{
					this.sendToChat("[city]" + webfrontend.gui.Util.formatCoordinates(coord.xPos, coord.yPos) + "[/city]");
				}
			}
			catch(e)
			{
				EmpDebug("CopySub: " + e);
			}
		},
		copyCoord : function()
		{
			try
			{
				var coord = this.worldViewCoord;
				if(coord && this.checkCoordType(this.ANY))
				{
					if(this.copyMenu.getOpener() == this.copyToMail)
					{
						this.sendToMail("[city]" + webfrontend.gui.Util.formatCoordinates(coord.xPos, coord.yPos) + "[/city]");
					}
					else
					{
						this.sendToChat("[city]" + webfrontend.gui.Util.formatCoordinates(coord.xPos, coord.yPos) + "[/city]");
					}
				}
			}
			catch(e)
			{
				EmpDebug("CopyCoord: " + e);
			}
		},
		copyPlayer : function()
		{
			try
			{
				var coord = this.worldViewCoord;
				if(coord && this.checkCoordType(this.CITY | this.LAWLESS))
				{
					if(this.copyMenu.getOpener() == this.copyToMail)
					{
						this.sendToMail("[player]" + coord.playerName + "[/player]");
					}
					else
					{
						this.sendToChat("[player]" + coord.playerName + "[/player]");
					}
				}
			}
			catch(e)
			{
				EmpDebug("CopyPlayer: " + e);
			}
		},
		copyAlliance : function()
		{
			try
			{
				var coord = this.worldViewCoord;
				if(coord && this.checkCoordType(this.CITY))
				{
					if(this.copyMenu.getOpener() == this.copyToMail)
					{
						this.sendToMail("[alliance]" + coord.allianceName + "[/alliance]");
					}
					else
					{
						this.sendToChat("[alliance]" + coord.allianceName + "[/alliance]");
					}
				}
			}
			catch(e)
			{
				EmpDebug("CopyAlliance: " + e);
			}
		},
		copyToMail : function()
		{
			try
			{
				var coord = this.worldViewCoord;
				if(coord && this.checkCoordType(this.ANY))
				{
					this.sendToMail("[city]" + webfrontend.gui.Util.formatCoordinates(coord.xPos, coord.yPos) + "[/city]");
				}
			}
			catch(e)
			{
				EmpDebug("CopyToMail: " + e);
			}
		},
		sendResources : function()
		{
			try
			{
				var coord = this.worldViewCoord;
				if(coord && this.checkCoordType(this.CITY))
				{
					Emp.a.showTrade(coord.xPos, coord.yPos);
				}
			}
			catch(e)
			{
				EmpDebug("SendResources: " + e);
			}
		},
		playerInfo : function()
		{
			try
			{
				var coord = this.worldViewCoord;
				if(coord && this.checkCoordType(this.CITY))
				{
					Emp.a.showInfoPage(Emp.a.getPlayerInfoPage(),
					{
						"name" : coord.playerName
					});
				}
			}
			catch(e)
			{
				EmpDebug("PlayerInfo: " + e);
			}
		},
		allianceInfo : function()
		{
			try
			{
				var coord = this.worldViewCoord;
				if(coord && this.checkCoordType(this.CITY))
				{
					EmpDebug("Show " + coord.allianceName);
					Emp.a.showInfoPage(Emp.a.getAllianceInfoPage(),
					{
						"name" : coord.allianceName
					});
				}
			}
			catch(e)
			{
				EmpDebug("AllianceInfo: " + e);
			}
		},
		whisper : function()
		{
			try
			{
				var coord = this.worldViewCoord;
				if(coord && this.checkCoordType(this.CITY))
				{
					this.sendToChat("/whisper " + coord.playerName + " ", true);
				}
			}
			catch(e)
			{
				EmpDebug("Whisper: " + e);
			}
		},
	}
});
			EmpDebug("Creating the Emperor");
		}

		function CheckIfEmperorLoaded()
		{
			try
			{
				if( typeof qx != 'undefined')
				{
					a = qx.core.Init.getApplication();
					// application
					c = a.cityInfoView;
					ch = a.chat;
					wdst = webfrontend.data.ServerTime.getInstance().refTime;
					if(a && c && ch && wdst)
					{
						CreateEmperor();
						Emperor.Main.getInstance().Initialize();
					}
					else
						window.setTimeout(CheckIfEmperorLoaded, 1000);
				}
				else
				{
					window.setTimeout(CheckIfEmperorLoaded, 1000);
				}
			}
			catch (e)
			{
				if( typeof console != 'undefined')
					console.log(e);
				else if(window.opera)
					opera.postError(e);
				else
					GM_log(e);
			}
		}

		if(/lordofultima\.com/i.test(document.domain))
			window.setTimeout(CheckIfEmperorLoaded, 1000);

	}
	// injecting, because there seem to be problems when creating game interface with unsafeWindow
	var EmperorScript = document.createElement("script");
	txt = EmperorMain.toString();
	if(window.opera != undefined)
		txt = txt.replace(/</g, "&lt;");
	// rofl Opera
	EmperorScript.innerHTML = "(" + txt + ")();";
	EmperorScript.type = "text/javascript";
	if(/lordofultima\.com/i.test(document.domain))
		document.getElementsByTagName("head")[0].appendChild(EmperorScript);
})();
