// ==UserScript==
// @name Upgrade Tool Script
// @description Upgrades Buildings and Units
// @namespace      http*://*.alliances.commandandconquer.com/*
// @include        http*://*.alliances.commandandconquer.com/*
// @version 1.0
// @author Topper42, Flunik, Modified by garwein
// @grant none
// ==/UserScript==
(function(){
var injectFunction = function() 
{
	function createClass() 
	{
		qx.Class.define("EA_CNCTA_Example", 
		{
			type: "singleton",
			extend: qx.core.Object,
			
			construct: function()
			{
				try
				{
					var app = qx.core.Init.getApplication();
				
	
					// get options bar
					var bar = app.getOptionsBar();
					var cntButton = bar.getChildren()[2];
					
					this.__btnOpenMenu = new qx.ui.form.Button("Upgrade Tool").set({ width: 115 });
					this.__btnOpenMenu.addListener("click", this.__openCityWindow, this);
					
					cntButton.removeAt(0);
					cntButton.addAt(this.__btnOpenMenu, 1);


				}
				catch (e)
				{
					console.log("Something is terribly wrong with this script. :(");
					console.log(e.toString());
				}
				console.log("EA API Example script: Initialising finshed");
			},
			
			destruct: function()
			{
				
			},
						
			members: 
			{
					
				__openCityWindow: function()
				{
					EA_CNCTA_Example.CityWindow.getInstance().open();
				},
				
				attachNetEvent: function()
				{
					console.log("Need to assign correct function!");
				},
				
				formatNumbersCompact: function()
				{
					console.log("Need to assign correct function!");
				},
				
				
			}
		});
		
	
		qx.Class.define("EA_CNCTA_Example.CityWindow", 
		{
			type: "singleton",
			extend: webfrontend.gui.CustomWindow,
			
			construct: function()
			{
				this.base(arguments);
				this.setLayout(new qx.ui.layout.VBox(2));
				
				this.set({
					width: 180,
					caption: "Upgrade Toolbox",
					padding: 1,
					allowMaximize: false,
					showMaximize: false,
					allowMinimize: false,
					showMinimize: false,
				});
				
				var cntUpgradeAll = new qx.ui.container.Composite(new qx.ui.layout.VBox(3)).set({ padding: 4, decorator: "pane-light-opaque"});
				
				var lblTitleAll = new qx.ui.basic.Label("Upgrade All Buildings In Selected City").set({ alignX: "center", font: "bold"});
				cntUpgradeAll.add(lblTitleAll);
				
				var cntUpgradeAllHBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
				var lblPreLevelAll = new qx.ui.basic.Label("New Level:").set({ alignY: "middle"});
				this.__txtNewLevelAll = new qx.ui.form.TextField().set({ width: 100});
				this.__btnUpgradeAll = new qx.ui.form.Button("Upgrade", "FactionUI/icons/icon_building_detail_upgrade.png");
				this.__btnUpgradeAll.addListener("execute", this.__upgradeAllBuildings, this);
				
				cntUpgradeAllHBox.add(lblPreLevelAll);
				cntUpgradeAllHBox.add(this.__txtNewLevelAll);
				cntUpgradeAllHBox.add(this.__btnUpgradeAll);
				cntUpgradeAll.add(cntUpgradeAllHBox);
				
				this.add(cntUpgradeAll);
				
				var cntUpgradeCurrent = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({ padding: 4, decorator: "pane-light-opaque"});
				
				var lblTitleCurrent = new qx.ui.basic.Label("Upgrade Currently Selected Building").set({ alignX: "center", font: "bold"});
				cntUpgradeCurrent.add(lblTitleCurrent);
				
				this.__lblCurrentSelected = new qx.ui.basic.Label("Selected building: -");
				cntUpgradeCurrent.add(this.__lblCurrentSelected);
				
				var cntUpgradeCurrentHBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
				var lblPreLevelCurrent = new qx.ui.basic.Label("New Level:").set({ alignY: "middle"});
				this.__txtNewLevelCurrent = new qx.ui.form.TextField().set({ width: 100});
				this.__btnUpgradeBuilding = new qx.ui.form.Button("Upgrade", "FactionUI/icons/icon_building_detail_upgrade.png");
				this.__btnUpgradeBuilding.addListener("execute", this.__upgradeBuilding, this);
				
				cntUpgradeCurrentHBox.add(lblPreLevelCurrent);
				cntUpgradeCurrentHBox.add(this.__txtNewLevelCurrent);
				cntUpgradeCurrentHBox.add(this.__btnUpgradeBuilding);
				cntUpgradeCurrent.add(cntUpgradeCurrentHBox);
				
				this.add(cntUpgradeCurrent);
				
				//upgrade offense box
				var cntUpgradeAllOff = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({ padding: 4, decorator: "pane-light-opaque"});
				
				var lblTitleAllOff = new qx.ui.basic.Label("Offense").set({ alignX: "center",  font: "bold"});
				cntUpgradeAllOff.add(lblTitleAllOff);
				
				var cntUpgradeAllOffHBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
				//var lblPreLevelOff = new qx.ui.basic.Label("New Level:").set({ alignY: "middle"});
				//this.__txtNewLevelOff = new qx.ui.form.TextField().set({ width: 100});
				this.__btnUpgradeAllOff = new qx.ui.form.Button("Upgrade All Offense Units In Selected City +1", "FactionUI/icons/icon_building_detail_upgrade.png");
				this.__btnUpgradeAllOff.addListener("execute", this.__upgradeAllOff, this);
				
				//cntUpgradeAllOffHBox.add(lblPreLevelOff);
				//cntUpgradeAllOffHBox.add(this.__txtNewLevelOff);
				cntUpgradeAllOffHBox.add(this.__btnUpgradeAllOff);
				cntUpgradeAllOff.add(cntUpgradeAllOffHBox);
				
				this.add(cntUpgradeAllOff);
				
				//upgrade defense box
				var cntUpgradeAllDef = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({ padding: 4, decorator: "pane-light-opaque"});
				
				var lblTitleAllDef = new qx.ui.basic.Label("Defense").set({ alignX: "center", font: "bold"});
				cntUpgradeAllDef.add(lblTitleAllDef);
				
				var cntUpgradeAllDefHBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
				//var lblPreLevelDef = new qx.ui.basic.Label("New Level:").set({ alignY: "middle"});
				//this.__txtNewLevelDef = new qx.ui.form.TextField().set({ width: 100});
				this.__btnUpgradeAllDef = new qx.ui.form.Button("Upgrade All Defense Units In Selected City +1", "FactionUI/icons/icon_building_detail_upgrade.png");
				this.__btnUpgradeAllDef.addListener("execute", this.__upgradeAllDef, this);
				
				//cntUpgradeAllDefHBox.add(lblPreLevelDef);
				//cntUpgradeAllDefHBox.add(this.__txtNewLevelDef);
				cntUpgradeAllDefHBox.add(this.__btnUpgradeAllDef);
				cntUpgradeAllDef.add(cntUpgradeAllDefHBox);
				
				this.add(cntUpgradeAllDef);
				
				
				EA_CNCTA_Example.getInstance().attachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "SelectionChange", ClientLib.Vis.SelectionChange, this, this.__onSelectionChange);
			},
			
			destruct: function()
			{
				
			},
						
			members: 
			{	
				__txtNewLevelAll: null,
				__btnUpgradeAll: null,
				
				__currentSelectedBuilding: null,
				__lblCurrentSelected: null,
				__btnUpgradeBuilding: null,
				__txtNewLevelCurrent: null,
				
				//__txtNewLevelOff: null,
				__btnUpgradeAllOff: null,				
				
				//__txtNewLevelDef: null,
				__btnUpgradeAllDef: null,				
				
				
				__upgradeAllBuildings: function()
				{
					var newLevel = parseInt(this.__txtNewLevelAll.getValue());
					if (newLevel > 0)
					{
						if (PerforceChangelist <= 384441)
							newLevel--;
							
						ClientLib.API.City.GetInstance().UpgradeAllBuildingsToLevel(newLevel);
					}
					
					this.__txtNewLevelAll.setValue("");
				},
				
				__upgradeBuilding: function()
				{
					var newLevel = parseInt(this.__txtNewLevelCurrent.getValue());
					if (newLevel > 0)
					{
						if (PerforceChangelist <= 384441)
							newLevel--;
							
						var obj = this.__currentSelectedBuilding;
						if (obj != null && obj.get_VisObjectType() == ClientLib.Vis.VisObject.EObjectType.CityBuildingType)
							ClientLib.API.City.GetInstance().UpgradeBuildingToLevel(obj.get_BuildingDetails(), newLevel);
					}
					this.__txtNewLevelCurrent.setValue("");
				},
				

				
				__upgradeAllOff: function() 
				{
					/*
					var newLevel = parseInt(this.__txtNewLevelOff.getValue());
					if (newLevel > 0)
					
					{
						if (PerforceChangelist <= 384441)
							newLevel--;
							
						ClientLib.API.City.GetInstance().UpgradeAllOffenseToLevel(newLevel);
					}
					*/
						try
						{
							var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
							var units = city.get_CityUnitsData();
							var offenceUnits = units.get_OffenseUnits();
							for (var nUnit in offenceUnits.d) 
							{
								var unit = offenceUnits.d[nUnit];
								var unit_obj = {
									cityid: city.get_Id(),
									unitId: unit.get_Id()
								}
										  
									ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UnitUpgrade", unit_obj, null, null, true);
									console.log(unit);
							}
						}
								catch (e) {
									console.log("Failed to upgrade all offences. " + e);
	//								alert("Failed :(")
								}
							

					//this.__txtNewLevelOff.setValue("");		
				},
				
				__upgradeAllDef: function() 
				{
					/*
					var newLevel = parseInt(this.__txtNewLevelOff.getValue());
					if (newLevel > 0)
					
					{
						if (PerforceChangelist <= 384441)
							newLevel--;
							
						ClientLib.API.City.GetInstance().UpgradeAllOffenseToLevel(newLevel);
					}
					*/
						try
						{
							var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
							var units = city.get_CityUnitsData();
							var defenseUnits = units.get_DefenseUnits();
							for (var nUnit in defenseUnits.d) 
							{
								var unit = defenseUnits.d[nUnit];
								var unit_obj = {
									cityid: city.get_Id(),
									unitId: unit.get_Id()
								}
										  
									ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UnitUpgrade", unit_obj, null, null, true);
									console.log(unit);
							}
						}
								catch (e) {
									console.log("Failed to upgrade all defense. " + e);
	//								alert("Failed :(")
								}
							

					//this.__txtNewLevelDef.setValue("");		
				},
				
				
				__onSelectionChange: function(oldObj, newObj)
				{
					if (newObj != null && newObj.get_VisObjectType() == ClientLib.Vis.VisObject.EObjectType.CityBuildingType)
					{
						this.__currentSelectedBuilding = newObj;
						var name = newObj.get_BuildingName();
						var level = newObj.get_BuildingLevel();
						
						this.__lblCurrentSelected.setValue("Selected building: " + name + "(" + level.toString() + ")");
					}
				}				
				
				
			}
		});

	}
	
	function waitForGame() 
	{
		try 
		{
			if (typeof qx != 'undefined' && typeof qx.core != 'undfined' && typeof qx.core.Init != 'undefined') 
			{
				var app = qx.core.Init.getApplication();
				if (app.initDone == true) 
				{
					try
					{
						createClass();
						
						console.log("Creating phe.cnc function wraps");
						
						if (typeof phe.cnc.Util.attachNetEvent == 'undefined')
							EA_CNCTA_Example.getInstance().attachNetEvent = webfrontend.gui.Util.attachNetEvent;
						else
							EA_CNCTA_Example.getInstance().attachNetEvent = phe.cnc.Util.attachNetEvent;
						
						if (typeof phe.cnc.gui.util == 'undefined')
							EA_CNCTA_Example.getInstance().formatNumbersCompact = webfrontend.gui.Util.formatNumbersCompact;	
						else
							EA_CNCTA_Example.getInstance().formatNumbersCompact = phe.cnc.gui.util.Numbers.formatNumbersCompact;		
						
						
						// Strange Hacks
						// don't try this at home ;)
						if (typeof ClientLib.API.Util.GetUnitMaxHealth == 'undefined')
							for (var key in ClientLib.Base.Util)
							{
								var strFunction = ClientLib.Base.Util[key].toString();
								if ((strFunction.indexOf("function (a,b,c)") == 0 || strFunction.indexOf("function (a,b)") == 0) &&
									 strFunction.indexOf("*=1.1") > -1)
								{
										EA_CNCTA_Example.getInstance().GetUnitMaxHealth = ClientLib.Base.Util[key];
										break;
								}
							}
						else
							EA_CNCTA_Example.getInstance().GetUnitMaxHealth = ClientLib.API.Util.GetUnitMaxHealth;	
						
						EA_CNCTA_Example.getInstance();
					}
					catch(e)
					{
						console.log("EA API Eaxmple script init error:");
						console.log(e);
					}
				} 
				else
					window.setTimeout(waitForGame, 1000);
			} 
			else 
			{
				window.setTimeout(waitForGame, 1000);
			}
		} 
		catch (e) 
		{
			if (typeof console != 'undefined') console.log(e);
			else if (window.opera) opera.postError(e);
			else GM_log(e);
		}
	};
	
	window.setTimeout(waitForGame, 1000);	
}

	var script = document.createElement("script");
	var txt = injectFunction.toString();
		script.innerHTML = "(" + txt + ")();";
		script.type = "text/javascript";
	
	document.getElementsByTagName("head")[0].appendChild(script);
})();
