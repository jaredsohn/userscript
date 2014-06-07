// ==UserScript==
// @name EA Command and Conquer: Tiberium Alliances API Example Script
// @description EA Command and Conquer: Tiberium Alliances API Example Script
// @namespace      http*://*.alliances.commandandconquer.com/*
// @include        http*://*.alliances.commandandconquer.com/*
// @version 1.5
// @author Topper42
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
							
                    var armySetupAttackBar = app.getArmySetupAttackBar();
					var btnOpenCombatWindow = new qx.ui.form.Button("Sim");
					btnOpenCombatWindow.set({ alignY: "middle", width: 60, maxHeight: 25, toolTipText: "open combat window" });
					btnOpenCombatWindow.addListener("execute",this.__openCombatWindow, this);
					var container = armySetupAttackBar.getChildren()[1];
					var cntWave = container.getChildren()[4]; 
					cntWave.removeAll();
					cntWave.setLayout(new qx.ui.layout.HBox());
					cntWave.add(new qx.ui.core.Spacer(), { flex: 1});
					cntWave.add(btnOpenCombatWindow);
					cntWave.add(new qx.ui.core.Spacer(), { flex: 1});
                    
                    var cntRepairOverlay = container.getChildren()[1].getChildren()[0]; 
                    cntRepairOverlay.addAt(EA_CNCTA_Example.SingleUnitRepairOverlay.getInstance(), 0, { top: 7, bottom: 0 });
                    
                    var btnSingleUnitRepair = new qx.ui.form.Button("Repair");
					btnSingleUnitRepair.set({ alignY: "middle", width: 60, maxHeight: 25, toolTipText: "show single unt repair overlay" });
					btnSingleUnitRepair.addListener("execute",this.__toggleSingleUnitRepair, this);
					cntWave = container.getChildren()[5]; 
					cntWave.removeAll();
					cntWave.setLayout(new qx.ui.layout.HBox());
					cntWave.add(new qx.ui.core.Spacer(), { flex: 1});
					cntWave.add(btnSingleUnitRepair);
					cntWave.add(new qx.ui.core.Spacer(), { flex: 1});
                    
					// hook into game script menu
					var subMenu = new qx.ui.menu.Menu();
                    var btnCombatWindow = new qx.ui.menu.Button("Open Combat Window", null, null);
					btnCombatWindow.addListener("execute", this.__openCombatWindow);
                    subMenu.add(btnCombatWindow);
					var btnUpgradeWindow  = new qx.ui.menu.Button("Open Upgrade Window", null, null);
					btnUpgradeWindow.addListener("execute", this.__openUpgradeWindow);
					subMenu.add(btnUpgradeWindow);
					
					var scriptMenu = app.getMenuBar().getScriptsButton();
					scriptMenu.Add("EA API ExampleScript", null, subMenu);
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
                __openCombatWindow: function()
				{
					EA_CNCTA_Example.CombatWindow.getInstance().open();
				},
                
                __openUpgradeWindow: function()
                {
                	EA_CNCTA_Example.UpgradeWindow.getInstance().open();
            	},
                
                __toggleSingleUnitRepair: function()
                {
                	EA_CNCTA_Example.SingleUnitRepairOverlay.getInstance().toggle();
            	}
			}
		});
		
		qx.Class.define("EA_CNCTA_Example.UpgradeWindow", 
		{
			type: "singleton",
			extend: webfrontend.gui.CustomWindow,
			
			construct: function()
			{
				this.base(arguments);
				this.setLayout(new qx.ui.layout.Canvas());
				
				this.set({
					width: 200,
					caption: "UpgradeWindow",
					padding: 2,
					allowMaximize: false,
					showMaximize: false,
					allowMinimize: false,
					showMinimize: false,
				});
				
				this.__cntBlocker = new qx.ui.container.Composite(new qx.ui.layout.Canvas()).set({ visibility: "excluded"});
				var bkgBlocker = new qx.ui.container.Composite(new qx.ui.layout.HBox()).set({ backgroundColor: "black", opacity: 0.8});
				var cntBlockerLabel = new qx.ui.container.Composite(new qx.ui.layout.VBox().set({ alignX: "center"}));
				cntBlockerLabel.add(new qx.ui.core.Spacer(), { flex: 1});
				cntBlockerLabel.add(new qx.ui.basic.Label("Works only in own cities.").set({ textColor: "red", alignY: "middle", alignX: "center", font: "font_size_14_bold"}));
				cntBlockerLabel.add(new qx.ui.core.Spacer(), { flex: 1});
				this.__cntBlocker.add(bkgBlocker, { left: 0, right: 0, top: 0, bottom: 0});
				this.__cntBlocker.add(cntBlockerLabel, { left: 0, right: 0, top: 0, bottom: 0});
				
				var cntElements = new qx.ui.container.Composite(new qx.ui.layout.VBox(2));
				this.add(cntElements, { left: 0, right: 0, top: 0, bottom: 0});
				this.add(this.__cntBlocker, { left: 0, right: 0, top: 0, bottom: 0});

				var cntTitle = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({ padding: 5, decorator: "pane-light-opaque"});
				
				this.__lblTitle = new qx.ui.basic.Label("Upgrade all").set({ alignX: "center", font: "font_size_14_bold"});
				cntTitle.add(this.__lblTitle);
				
				cntElements.add(cntTitle);
				
				var cntUpgradeAll = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({ padding: 5, decorator: "pane-light-opaque"});
				
				var lblTitleAll = new qx.ui.basic.Label("Upgrade all").set({ alignX: "center", font: "font_size_14_bold"});
				cntUpgradeAll.add(lblTitleAll);
				
				var cntUpgradeAllHBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
				var lblPreLevelAll = new qx.ui.basic.Label("New Level:").set({ alignY: "middle"});
				this.__txtNewLevelAll = new qx.ui.form.TextField().set({ width: 100});
				this.__txtNewLevelAll.addListener("input", this.__updateAllCosts, this);
				this.__btnUpgradeAll = new qx.ui.form.Button("Upgrade", "FactionUI/icons/icon_building_detail_upgrade.png");
				this.__btnUpgradeAll.addListener("execute", this.__upgradeAll, this);

				cntUpgradeAllHBox.add(lblPreLevelAll);
				cntUpgradeAllHBox.add(this.__txtNewLevelAll);
				cntUpgradeAllHBox.add(this.__btnUpgradeAll);
				cntUpgradeAll.add(cntUpgradeAllHBox);
				
				var cntUpgradeAllCostsHBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
				var lblPreCostsAll = new qx.ui.basic.Label("Costs:").set({ alignY: "middle"});
				this.__cntUpgradeAllCostsHBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
				cntUpgradeAllCostsHBox.add(lblPreCostsAll);
				cntUpgradeAllCostsHBox.add(this.__cntUpgradeAllCostsHBox);
				cntUpgradeAll.add(cntUpgradeAllCostsHBox);
				
				cntElements.add(cntUpgradeAll);
				
				var cntUpgradeCurrent = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({ padding: 5, decorator: "pane-light-opaque"});
				
				var lblTitleCurrent = new qx.ui.basic.Label("Upgrade current").set({ alignX: "center", font: "font_size_14_bold"});
				cntUpgradeCurrent.add(lblTitleCurrent);
				
				this.__lblCurrentSelected = new qx.ui.basic.Label("Selected: -");
				cntUpgradeCurrent.add(this.__lblCurrentSelected);
				
				var cntUpgradeCurrentHBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
				var lblPreLevelCurrent = new qx.ui.basic.Label("New Level:").set({ alignY: "middle"});
				this.__txtNewLevelCurrent = new qx.ui.form.TextField().set({ width: 100});
				this.__txtNewLevelCurrent.addListener("input", this.__updateCurrentCosts, this);
				this.__btnUpgradeBuilding = new qx.ui.form.Button("Upgrade", "FactionUI/icons/icon_building_detail_upgrade.png");
				this.__btnUpgradeBuilding.addListener("execute", this.__upgradeCurrent, this);
				
				cntUpgradeCurrentHBox.add(lblPreLevelCurrent);
				cntUpgradeCurrentHBox.add(this.__txtNewLevelCurrent);
				cntUpgradeCurrentHBox.add(this.__btnUpgradeBuilding);
				cntUpgradeCurrent.add(cntUpgradeCurrentHBox);
				
				var cntUpgradeCurrentCostsHBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
				var lblPreCostsCurrent = new qx.ui.basic.Label("Costs:").set({ alignY: "middle"});
				this.__cntUpgradeCurrentCostsHBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
				cntUpgradeCurrentCostsHBox.add(lblPreCostsCurrent);
				cntUpgradeCurrentCostsHBox.add(this.__cntUpgradeCurrentCostsHBox);
				cntUpgradeCurrent.add(cntUpgradeCurrentCostsHBox);
				
				cntElements.add(cntUpgradeCurrent);
				
				this.onViewModeChange("",ClientLib.Vis.VisMain.GetInstance().get_Mode());
				this.__onCurrentCityChange("",ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId());
				
				EA_CNCTA_Example.getInstance().attachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "SelectionChange", ClientLib.Vis.SelectionChange, this, this.__onSelectionChange);
				EA_CNCTA_Example.getInstance().attachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "ViewModeChange", ClientLib.Vis.ViewModeChange, this, this.onViewModeChange);
				EA_CNCTA_Example.getInstance().attachNetEvent(ClientLib.Data.MainData.GetInstance().get_Cities(), "CurrentChange", ClientLib.Data.CurrentCityChange, this, this.__onCurrentCityChange);
			},
			
			destruct: function()
			{
				
			},
						
			members: 
			{	
				__lblTitle: null,
				
				__txtNewLevelAll: null,
				__btnUpgradeAll: null,
				
				__currentSelectedBuilding: null,
				__lblCurrentSelected: null,
				__btnUpgradeBuilding: null,
				__txtNewLevelCurrent: null,
				
				__cntUpgradeAllCostsHBox: null,
				__cntUpgradeCurrentCostsHBox: null,
				
				__cntBlocker: null,
				
				__upgradeAll: function()
				{
					var newLevel = parseInt(this.__txtNewLevelAll.getValue());
					if (newLevel > 0)
					{
						switch (ClientLib.Vis.VisMain.GetInstance().get_Mode())
						{
							case ClientLib.Vis.Mode.City:
								if (PerforceChangelist <= 384441)
									newLevel--;
								
								ClientLib.API.City.GetInstance().UpgradeAllBuildingsToLevel(newLevel);
								break;
							case ClientLib.Vis.Mode.DefenseSetup:
								ClientLib.API.Defense.GetInstance().UpgradeAllUnitsToLevel(newLevel);
								break;							
							case ClientLib.Vis.Mode.ArmySetup:
								ClientLib.API.Army.GetInstance().UpgradeAllUnitsToLevel(newLevel);
								break;
						}
					}
					
					this.__txtNewLevelAll.setValue("");
				},
				
				__updateAllCosts: function()
				{
					this.__cntUpgradeAllCostsHBox.removeAll();
					
					var newLevel = parseInt(this.__txtNewLevelAll.getValue());
					if (newLevel > 0)
					{
						var costs = null;
						switch (ClientLib.Vis.VisMain.GetInstance().get_Mode())
						{
							case ClientLib.Vis.Mode.City:
								costs = ClientLib.API.City.GetInstance().GetUpgradeCostsForAllBuildingsToLevel(newLevel);
								break;
							case ClientLib.Vis.Mode.DefenseSetup:
								costs = ClientLib.API.Defense.GetInstance().GetUpgradeCostsForAllUnitsToLevel(newLevel);
								break;							
							case ClientLib.Vis.Mode.ArmySetup:
								costs = ClientLib.API.Army.GetInstance().GetUpgradeCostsForAllUnitsToLevel(newLevel);
								break;
						}
						
						this.__generateCostsHBox(this.__cntUpgradeAllCostsHBox, ClientLib.Base.Util.FilterResourceCosts(costs, false));
					}
				},
				
				__upgradeCurrent: function()
				{
					var newLevel = parseInt(this.__txtNewLevelCurrent.getValue());
					if (newLevel > 0)
					{
						var obj = this.__currentSelectedBuilding;
						if (obj != null)
						{
							switch (ClientLib.Vis.VisMain.GetInstance().get_Mode())
							{
								case ClientLib.Vis.Mode.City:
									if (PerforceChangelist <= 384441)
										newLevel--;
									
									if (obj.get_VisObjectType() == ClientLib.Vis.VisObject.EObjectType.CityBuildingType)
										ClientLib.API.City.GetInstance().UpgradeBuildingToLevel(obj.get_BuildingDetails(), newLevel);
									break;
								case ClientLib.Vis.Mode.DefenseSetup:
									if (obj.get_VisObjectType() == ClientLib.Vis.VisObject.EObjectType.DefenseUnitType)
										ClientLib.API.Defense.GetInstance().UpgradeUnitToLevel(obj.get_UnitDetails(), newLevel);
									break;							
								case ClientLib.Vis.Mode.ArmySetup:
									if (obj.get_VisObjectType() == ClientLib.Vis.VisObject.EObjectType.ArmyUnitType)
										ClientLib.API.Army.GetInstance().UpgradeUnitToLevel(obj.get_UnitDetails(), newLevel);
									break;
							}
						}
					}
					this.__txtNewLevelCurrent.setValue("");
				},
				
				__updateCurrentCosts: function()
				{
					this.__cntUpgradeCurrentCostsHBox.removeAll();
					
					var newLevel = parseInt(this.__txtNewLevelCurrent.getValue());
					if (newLevel > 0)
					{
						var obj = this.__currentSelectedBuilding;
						if (obj != null)
						{
							var costs = null;
							switch (ClientLib.Vis.VisMain.GetInstance().get_Mode())
							{
								case ClientLib.Vis.Mode.City:
									if (obj.get_VisObjectType() == ClientLib.Vis.VisObject.EObjectType.CityBuildingType)
										costs = ClientLib.API.City.GetInstance().GetUpgradeCostsForAllBuildingsToLevel(obj.get_BuildingDetails(), newLevel);
									break;
								case ClientLib.Vis.Mode.DefenseSetup:
									if (obj.get_VisObjectType() == ClientLib.Vis.VisObject.EObjectType.DefenseUnitType)
										costs = ClientLib.API.Defense.GetInstance().GetUpgradeCostsForUnitToLevel(obj.get_UnitDetails(), newLevel);
									break;							
								case ClientLib.Vis.Mode.ArmySetup:
									if (obj.get_VisObjectType() == ClientLib.Vis.VisObject.EObjectType.ArmyUnitType)
										costs = ClientLib.API.Army.GetInstance().GetUpgradeCostsForUnitToLevel(obj.get_UnitDetails(), newLevel);
									break;
							}
						
							this.__generateCostsHBox(this.__cntUpgradeCurrentCostsHBox, ClientLib.Base.Util.FilterResourceCosts(costs, false));
						}
					}
				},
				
				__onCurrentCityChange: function(oldId, newId)
				{
					var isOwnBase = false;
					var city = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(newId);
					if (city != null && city.IsOwnBase())
						isOwnBase = true;
					
					this.__cntBlocker.setVisibility(isOwnBase ? "excluded" : "visible");
				},
				
				__onSelectionChange: function(oldObj, newObj)
				{
					if (newObj != null)
					{
						var preText = "Selected: ";
						var name = "";
						var level = "";
						this.__currentSelectedBuilding = newObj;
						switch (newObj.get_VisObjectType())
						{
							case ClientLib.Vis.VisObject.EObjectType.CityBuildingType:
								name = newObj.get_BuildingName();
								level = "(" + newObj.get_BuildingLevel().toString()  + ")";
								break;
							case ClientLib.Vis.VisObject.EObjectType.DefenseUnitType:
								name = newObj.get_UnitName();
								level = "(" + newObj.get_UnitLevel().toString()  + ")";
								break;
							case ClientLib.Vis.VisObject.EObjectType.ArmyUnitType:
								name = newObj.get_UnitName();
								level = "(" + newObj.get_UnitLevel().toString()  + ")";
								break;
							default:
								preText = "Nothing selected";
								this.__currentSelectedBuilding = null;
						}
						
						this.__lblCurrentSelected.setValue(preText + name +  level);
					}
				},
				
				onViewModeChange: function(oldMode, newMode)
				{
					switch (newMode)
					{
						case ClientLib.Vis.Mode.City:
							this.__lblTitle.setValue("City");
							break;
						case ClientLib.Vis.Mode.DefenseSetup:
							this.__lblTitle.setValue("Defense");
							break;							
						case ClientLib.Vis.Mode.ArmySetup:
							this.__lblTitle.setValue("Army");
							break;
					}		
				},
				
				__generateCostsHBox: function(cnt, costs)
				{
					if (costs == null)
						return;		
					
					var ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
					
					for (var i = 0; i < costs.length; i++)
					{
						var type = costs[i].Type;
						var count = costs[i].Count;
						
						var cntResource = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
						cntResource.add(new qx.ui.basic.Image(ClientLib.Res.ResMain.GetInstance().GetResourceIconPath(type)));
						
						var lblCosts = new qx.ui.basic.Label(EA_CNCTA_Example.getInstance().formatNumbersCompact(count)).set({ alignY: "middle" });
						
						if (ownCity.GetResourceCount(type) < count)
							lblCosts.setTextColor("red");
						
						cntResource.add(lblCosts);
						cnt.add(cntResource);
					}
				}
			}
		});
		
		qx.Class.define("EA_CNCTA_Example.SingleUnitRepairOverlay", 
		{
			type: "singleton",
			extend: qx.ui.container.Composite,
			
			construct: function()
			{
				this.base(arguments);
				
				this.setLayout(new qx.ui.layout.Canvas());
				this.exclude();
				
				var cntBackground = new qx.ui.container.Composite(new qx.ui.layout.Canvas()).set({ backgroundColor: "black", opacity: 0.5 });
				this.add(cntBackground, { left: 0, top: 0, right: 0, bottom: 0});
				
				var cntButtons = new qx.ui.container.Composite(new qx.ui.layout.VBox());
				var cntButtonsHBox = new qx.ui.container.Composite(new qx.ui.layout.HBox());
				cntButtonsHBox.add(new qx.ui.core.Spacer(), { flex: 1 });
				cntButtonsHBox.add(cntButtons);
				cntButtonsHBox.add(new qx.ui.core.Spacer(), { flex: 1 });
				
				this.add(cntButtonsHBox, { left: 0, top: 0, right: 0, bottom: 0 });
				cntButtons.add(new qx.ui.core.Spacer(), { flex: 1 });
				this.__Buttons = new Array();
				for (var i = 0; i < 4; i++)
				{
					var cntRow = new qx.ui.container.Composite(new qx.ui.layout.HBox());
					var buttons = new Array();
					for ( var j = 0; j < 9; j++)
					{
						var btn = new qx.ui.form.Button(null, "FactionUI/icons/icon_repair_all_button_setup.png");
						btn.addListener("click", this.__onRepair, { frm: this, x: j, y: i});
						var cntButton = new qx.ui.container.Composite(new qx.ui.layout.HBox()).set({ width: 110 });
						cntButton.add(new qx.ui.core.Spacer(), { flex: 1 });
						cntButton.add(btn);
						cntButton.add(new qx.ui.core.Spacer(), { flex: 1 });
						cntRow.add(cntButton);
						buttons.push(btn);
					}
					cntButtons.add(cntRow);
					cntButtons.add(new qx.ui.core.Spacer(), { flex: 1 });
					this.__Buttons.push(buttons);
				}
			},
			
			destruct: function()
			{
				
			},
						
			members: 
			{
				__Buttons: null,
				
				toggle: function()
				{
					if (!this.isVisible())
					{
						EA_CNCTA_Example.getInstance().attachNetEvent(ClientLib.Data.MainData.GetInstance().get_Cities(), "CurrentOwnChange", ClientLib.Data.CurrentOwnCityChange, this, this.__onCurrentOwnCityChange);
						this.__filterButtons();
						this.show();
					}
					else
					{
						EA_CNCTA_Example.getInstance().detachNetEvent(ClientLib.Data.MainData.GetInstance().get_Cities(), "CurrentOwnChange", ClientLib.Data.CurrentOwnCityChange, this, this.__onCurrentOwnCityChange);
						this.exclude();
					}
				},

				__onCurrentOwnCityChange: function()
				{
					this.__filterButtons();
				},
				
				__filterButtons: function()
				{
					var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();
					if (city != null)
					{
						var ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
						var formation = ownCity.get_CityArmyFormationsManager().GetFormationByTargetBaseId(city.get_Id());
						
						for (var i = 0; i < 4; i++)
							for ( var j = 0; j < 9; j++)
							{
								var unit = formation.GetUnitByCoord(j, i);
								var needsRepair = (unit != null && unit.get_Health() > 0 && unit.get_Health() != unit.get_MaxHealth());
								this.__Buttons[i][j].setVisibility(needsRepair ? "visible" : "hidden");
							}
					}
				},
				
				__onRepair: function(e)
				{
					var visMain =  ClientLib.Vis.VisMain.GetInstance();
					
					var oldViewMode = visMain.get_Mode();
					var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();
					if (city != null)
					{
						var ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
						var formation = ownCity.get_CityArmyFormationsManager().GetFormationByTargetBaseId(city.get_Id());
						var preUnit = formation.GetUnitByCoord(this.x, this.y);
						if (preUnit != null)
						{
							var unit = preUnit.GetCityUnit();
							
							visMain.set_Mode(ClientLib.Vis.Mode.ArmySetup);
							
							var armySetup = visMain.get_ArmySetup();
							
							var x = armySetup.GetLeftStartPosForColumn(unit.get_CoordX());
							var y = armySetup.GetTopStartPosForRow(unit.get_CoordY());
							
                            ClientLib.Data.MainData.GetInstance().get_Cities().set_CurrentCityId(ownCity.get_Id());
                            
							var obj = armySetup.GetObjectFromPosition(x, y);
							if (obj != null && obj.get_VisObjectType() == ClientLib.Vis.VisObject.EObjectType.ArmyUnitType)
							{
								obj.ExecuteCommand(ClientLib.Vis.Commands.RepairUnit);
                                this.frm.__Buttons[this.y][this.x].hide();
							}
							
							ClientLib.Data.MainData.GetInstance().get_Cities().set_CurrentCityId(city.get_Id());
							visMain.set_Mode(oldViewMode);
						}
					}
					
					e.preventDefault();
					e.stopPropagation();
				}
			}
		});			
		
		qx.Class.define("EA_CNCTA_Example.CombatWindow", 
		{
			type: "singleton",
			extend: webfrontend.gui.CustomWindow,
			
			construct: function()
			{
				this.base(arguments);
				this.setLayout(new qx.ui.layout.VBox());
				
				this.set({
					width: 200,
					caption: "CombatWindow",
					padding: 2,
					allowMaximize: false,
					showMaximize: false,
					allowMinimize: false,
					showMinimize: false,
					
				});
				
				this.setResizable(false, true, false, true);
				
				// Health
				
				var cntHealthTitle = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({ decorator: "pane-light-opaque"});
				var lblTitel = new qx.ui.basic.Label("Health").set({ alignX: "center", font: "font_size_14_bold"});
				cntHealthTitle.add(lblTitel);
				this.add(cntHealthTitle);
				
				var cntHealth = new qx.ui.container.Composite(new qx.ui.layout.HBox(2));
				var cntPreText = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({ padding: 5, decorator: "pane-light-opaque"});
				var lblOffenseInf = new qx.ui.basic.Label("Infantry:");
				var lblOffenseVeh = new qx.ui.basic.Label("Vehicle:");
				var lblOffenseAir = new qx.ui.basic.Label("Air:");
				var lblDefense = new qx.ui.basic.Label("Defense:");
				cntPreText.add(lblOffenseInf);
				cntPreText.add(lblOffenseVeh);
				cntPreText.add(lblOffenseAir);
				cntPreText.add(lblDefense);
				cntHealth.add(cntPreText);

				var cntValues = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({ alignX: "center", width: 50, padding: 5, decorator: "pane-light-opaque"});
				this.__lblUnitsHealthOffenseInf = new qx.ui.basic.Label("-");
				this.__lblUnitsHealthOffenseVeh = new qx.ui.basic.Label("-");
				this.__lblUnitsHealthOffenseAir = new qx.ui.basic.Label("-");
				this.__lblUnitsHealthDefense = new qx.ui.basic.Label("-");
				cntValues.add(this.__lblUnitsHealthOffenseInf);
				cntValues.add(this.__lblUnitsHealthOffenseVeh);
				cntValues.add(this.__lblUnitsHealthOffenseAir);
				cntValues.add(this.__lblUnitsHealthDefense);
				cntHealth.add(cntValues, { flex: 1 });			
				this.add(cntHealth);
				
				// Repair
				
				var cntRepairTitle = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({ decorator: "pane-light-opaque"});
				var lblTitel = new qx.ui.basic.Label("Repair").set({ alignX: "center", font: "font_size_14_bold"});
				cntRepairTitle.add(lblTitel);
				this.add(cntRepairTitle);
				
				var cntRepair = new qx.ui.container.Composite(new qx.ui.layout.HBox(2));
				var cntRepairPreText = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({ padding: 5, decorator: "pane-light-opaque"});
				var lblRepairOffenseInf = new qx.ui.basic.Label("Infantry:");
				var lblRepairOffenseVeh = new qx.ui.basic.Label("Vehicle:");
				var lblRepairOffenseAir = new qx.ui.basic.Label("Air:");
				cntRepairPreText.add(lblRepairOffenseInf);
				cntRepairPreText.add(lblRepairOffenseVeh);
				cntRepairPreText.add(lblRepairOffenseAir);
				cntRepair.add(cntRepairPreText);

				var cntRepairValues = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({ width: 50, padding: 5, decorator: "pane-light-opaque"});
				this.__lblUnitsRepairOffenseInf = new qx.ui.basic.Label("-");
				this.__lblUnitsRepairOffenseVeh = new qx.ui.basic.Label("-");
				this.__lblUnitsRepairOffenseAir = new qx.ui.basic.Label("-");
				cntRepairValues.add(this.__lblUnitsRepairOffenseInf);
				cntRepairValues.add(this.__lblUnitsRepairOffenseVeh);
				cntRepairValues.add(this.__lblUnitsRepairOffenseAir);
				cntRepair.add(cntRepairValues, { flex: 1 });			
				this.add(cntRepair);
				
				// Loot
				
				var cntLootTitle = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({ decorator: "pane-light-opaque"});
				var lblTitel = new qx.ui.basic.Label("Full Loot").set({ alignX: "center", font: "font_size_14_bold"});
				cntLootTitle.add(lblTitel);
				this.add(cntLootTitle);
				
				var cntLoot = new qx.ui.container.Composite(new qx.ui.layout.HBox(2));
				var cntLootPreText = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({ padding: 5, decorator: "pane-light-opaque"});
				var imgTiberium = new qx.ui.basic.Image("webfrontend/ui/menues/reports/icn_reports_reward_tiberium.png").set({ alignX: "center" });
				var imgCrystal = new qx.ui.basic.Image("webfrontend/ui/menues/reports/icn_reports_reward_crystal.png").set({ alignX: "center" });
				var imgCredits = new qx.ui.basic.Image("webfrontend/ui/menues/reports/icn_reports_reward_cash.png").set({ alignX: "center" });
				var imgResearchPoints = new qx.ui.basic.Image("webfrontend/ui/menues/reports/icn_reports_reward_research.png").set({ alignX: "center" });
				cntLootPreText.add(imgTiberium);
				cntLootPreText.add(imgCrystal);
				cntLootPreText.add(imgCredits);
				cntLootPreText.add(imgResearchPoints);
				cntLoot.add(cntLootPreText);

				var cntLootValues = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({ width: 50, padding: 5, decorator: "pane-light-opaque"});
				this.__lblLootTiberium = new qx.ui.basic.Label("-").set({ height: 20 });
				this.__lblLootCrystal = new qx.ui.basic.Label("-").set({ height: 20 });
				this.__lblLootCredits = new qx.ui.basic.Label("-").set({ height: 20 });
				this.__lblLootResearchPoints = new qx.ui.basic.Label("-").set({ height: 20 });
				cntLootValues.add(this.__lblLootTiberium);
				cntLootValues.add(this.__lblLootCrystal);
				cntLootValues.add(this.__lblLootCredits);
				cntLootValues.add(this.__lblLootResearchPoints);
				cntLoot.add(cntLootValues, { flex: 1 });			
				this.add(cntLoot);
				
				// Buttons
				
				var cntButtons = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({ padding: 5, decorator: "pane-light-opaque"});
				this.add(cntButtons);
				
				var btnSimulate = new qx.ui.form.Button("Simulate");
				btnSimulate.addListener("execute", this._SimulateWithPreview, this);
				cntButtons.add(btnSimulate);
		
				var btnSimulateStats = new qx.ui.form.Button("Simulate & Stats");
				btnSimulateStats.addListener("execute", this._SimulateWithPreviewAndStats, this);
				cntButtons.add(btnSimulateStats);		
				
				var btnStats = new qx.ui.form.Button("Stats");
				btnStats.addListener("execute", this._SimulateStats, this);
				cntButtons.add(btnStats);
				
				var btnLoot = new qx.ui.form.Button("Loot");
				btnLoot.addListener("execute", this._GetLoot, this);
				cntButtons.add(btnLoot);
				
				EA_CNCTA_Example.getInstance().attachNetEvent(ClientLib.API.Battleground.GetInstance(), "OnSimulateBattleFinished", ClientLib.API.OnSimulateBattleFinished, this, this.__OnSimulateBattleFinished);
			},
			
			destruct: function()
			{
				
			},
						
			members: 
			{	
				__lblUnitsHealthOffenseInf: null,
				__lblUnitsHealthOffenseVeh: null,
				__lblUnitsHealthOffenseAir: null,
				__lblUnitsHealthDefense: null,
				
				__lblUnitsRepairOffenseInf: null,
				__lblUnitsRepairOffenseVeh: null,
				__lblUnitsRepairOffenseAir: null,

				__lblLootTiberium: null,
				__lblLootCrystal: null,
				__lblLootCredits: null,
				__lblLootResearchPoints: null,
				
				__withoutStats: false,

				_GetLoot: function()
				{
					this.__lblLootTiberium.setValue("-");
					this.__lblLootCrystal.setValue("-");
					this.__lblLootCredits.setValue("-");
					this.__lblLootResearchPoints.setValue("-");
					
					var loot = ClientLib.API.Battleground.GetInstance().GetLootFromCurrentCity();
					if (loot != null)
					{
						for (var i = 0; i < loot.length; i++)
						{
							var type = parseInt(loot[i].Type);
							switch (type)
							{
								case ClientLib.Base.EResourceType.Tiberium:
									this.__lblLootTiberium.setValue(EA_CNCTA_Example.getInstance().formatNumbersCompact(loot[i].Count));
									break;
								case ClientLib.Base.EResourceType.Crystal:
									this.__lblLootCrystal.setValue(EA_CNCTA_Example.getInstance().formatNumbersCompact(loot[i].Count));
									break;
								case ClientLib.Base.EResourceType.Gold:
									this.__lblLootCredits.setValue(EA_CNCTA_Example.getInstance().formatNumbersCompact(loot[i].Count));
									break;
								case ClientLib.Base.EResourceType.ResearchPoints:
									this.__lblLootResearchPoints.setValue(EA_CNCTA_Example.getInstance().formatNumbersCompact(loot[i].Count));
									break;
							}
						}
					}
				},
				
				_SimulateWithPreview: function()
				{
					this.__withoutStats = true;
					
					var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();
					if (city != null)
					{
						var ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
						ownCity.get_CityArmyFormationsManager().set_CurrentTargetBaseId(city.get_Id());
						ClientLib.API.Battleground.GetInstance().SimulateBattle();
						var app = qx.core.Init.getApplication();
						app.getPlayArea().setView(ClientLib.Data.PlayerAreaViewMode.pavmCombatReplay, city.get_Id(), 0, 0);
					}
				},
				
				_SimulateWithPreviewAndStats: function()
				{
					this.__withoutStats = false;
					
					var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();
					if (city != null)
					{
						var ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
						ownCity.get_CityArmyFormationsManager().set_CurrentTargetBaseId(city.get_Id());
						ClientLib.API.Battleground.GetInstance().SimulateBattle();
						var app = qx.core.Init.getApplication();
						app.getPlayArea().setView(ClientLib.Data.PlayerAreaViewMode.pavmCombatReplay, city.get_Id(), 0, 0);
					}
				},
				
				_SimulateStats: function()
				{
					this.__withoutStats = false;
					
					var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();
					if (city != null)
					{
						var ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
						ownCity.get_CityArmyFormationsManager().set_CurrentTargetBaseId(city.get_Id());
						ClientLib.API.Battleground.GetInstance().GetSimulateBattleEndInfos();
					}
				},
				
				__OnSimulateBattleFinished: function(data)
				{			
					if (data == null || this.__withoutStats)
						return;
						
					var defenseHealthBefore = 0;
					var defenseHealthAfter = 0;
					
					var offenseHealthBefore = new Array(0,0,0);
					var offenseHealthAfter = new Array(0,0,0);
					
					var offenseRepairCrystalCosts = new Array(0,0,0);
					var offenseRepairTimeCosts = new Array(0,0,0);
					
                    var currCityId = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId();
                    
					var ownCityId = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity().get_Id();
					
                    ClientLib.Data.MainData.GetInstance().get_Cities().set_CurrentCityId(ownCityId);
                    
					for (var i = 0; i < data.length; i++)
					{
						var combatId = data[i].Key;
					   	var unitData = data[i].Value;
					  
					   	var unitMDBID = unitData.t;
					   	var unitLevel = unitData.l;
					   	var unitStartHealth = unitData.sh;
					   	var unitEndHealth = unitData.h;
					  
					  	var unit = ClientLib.Res.ResMain.GetInstance().GetUnit_Obj(unitMDBID);
						var placementType = unit.pt;
						var movementType = unit.mt;
						
						var unitMaxHealth = ClientLib.API.Util.GetUnitMaxHealthByLevel(unitLevel, unit, false);
											
						switch (placementType)
						{
							case ClientLib.Base.EPlacementType.Defense:
								defenseHealthBefore += unitStartHealth;
								defenseHealthAfter += unitEndHealth;
								break;
							case ClientLib.Base.EPlacementType.Offense:
								var index = -1;
								switch (movementType)
								{
									case ClientLib.Base.EUnitMovementType.Feet:
										index = 0;
										break;
									case ClientLib.Base.EUnitMovementType.Wheel:
									case ClientLib.Base.EUnitMovementType.Track:
										index = 1;
										break;
									case ClientLib.Base.EUnitMovementType.Air:
									case ClientLib.Base.EUnitMovementType.Air2:
										index = 2;
										break;
								}
								if (index > -1)
								{
									offenseHealthBefore[index] += unitStartHealth;
									offenseHealthAfter[index] += unitEndHealth;
									
									if (unitStartHealth != unitEndHealth) // check if unit got damage
									{	
										var damageRatio = 1;
										if (unitEndHealth > 0) // if unit is still alive calculate damage ratio
										{
											if (unitMaxHealth != -1)
											{
												damageRatio = (unitMaxHealth - (unitEndHealth/16)) / unitMaxHealth;
											}
										}
									
										var repairCosts = ClientLib.API.Util.GetUnitRepairCosts(unitLevel, unitMDBID, damageRatio);
										var crystal = 0;
										var repairTime = 0;
										for (var j = 0; j < repairCosts.length; j++)
										{
											var c = repairCosts[j];
											var type = parseInt(c.Type);
											switch (type)
											{
												case ClientLib.Base.EResourceType.Crystal:
													crystal += c.Count;
													break;
												case ClientLib.Base.EResourceType.RepairChargeBase:
												case ClientLib.Base.EResourceType.RepairChargeInf:
												case ClientLib.Base.EResourceType.RepairChargeVeh:
												case ClientLib.Base.EResourceType.RepairChargeAir:
													repairTime += c.Count;
													break;
											}
										}
										offenseRepairCrystalCosts[index] += crystal;
										offenseRepairTimeCosts[index] += repairTime;
									}
								}
								break;
							case ClientLib.Base.EPlacementType.Structure:
								defenseHealthBefore += unitStartHealth;
								defenseHealthAfter += unitEndHealth;						
								break;
						}
					}
					
					this.__setHealthLabel(this.__lblUnitsHealthOffenseInf, offenseHealthBefore[0], offenseHealthAfter[0]);
					this.__setHealthLabel(this.__lblUnitsHealthOffenseVeh, offenseHealthBefore[1], offenseHealthAfter[1]);
					this.__setHealthLabel(this.__lblUnitsHealthOffenseAir, offenseHealthBefore[2], offenseHealthAfter[2]);
					this.__setHealthLabel(this.__lblUnitsHealthDefense, defenseHealthBefore, defenseHealthAfter);

					this.__setRepairLabel(this.__lblUnitsRepairOffenseInf, offenseRepairCrystalCosts[0], offenseRepairTimeCosts[0]);
					this.__setRepairLabel(this.__lblUnitsRepairOffenseVeh, offenseRepairCrystalCosts[1], offenseRepairTimeCosts[1]);
					this.__setRepairLabel(this.__lblUnitsRepairOffenseAir, offenseRepairCrystalCosts[2], offenseRepairTimeCosts[2]);
                    
                    ClientLib.Data.MainData.GetInstance().get_Cities().set_CurrentCityId(currCityId);
				},
				
				__setHealthLabel: function(lbl, before, after)
				{
					if (before > 0)
					{
						var percent = Math.floor(((after * 100 )/ before));
						lbl.setValue(percent.toString() + "%");
						lbl.setToolTipText(before.toString() + " / " + after.toString());
					}
					else
					{
						lbl.setValue("-");	
					}
				},
				
				__setRepairLabel: function(lbl, crystal, repairTime)
				{
					var formattedRepairTime = "-";
					if (repairTime == Number.POSITIVE_INFINITY)
						formattedRepairTime = "inf";
					else if (repairTime > 0)
						formattedRepairTime = phe.cnc.Util.getTimespanString(ClientLib.Data.MainData.GetInstance().get_Time().GetTimeSpan(repairTime));
						
					var formattedCrystal = "-";
					if (crystal == Number.POSITIVE_INFINITY)
						formattedCrystal = "inf";
					else if (crystal > 0)
						formattedCrystal = EA_CNCTA_Example.getInstance().formatNumbersCompact(crystal);

					lbl.setValue(formattedCrystal + " / " + formattedRepairTime);
				}
				
			},
		});
	}
	
	function waitForGame() 
	{
		try 
		{
			if (typeof qx != 'undefined' && typeof qx.core != 'undfined' && typeof qx.core.Init != 'undefined' && qx.core.Init.getApplication() != null) 
			{
				var app = qx.core.Init.getApplication();
				if (app.initDone == true) 
				{
					try
					{					
						createClass();
						
						console.log("Creating phe.cnc function wraps");
						
						if (typeof phe.cnc.Util.attachNetEvent == 'undefined')
						{
							EA_CNCTA_Example.getInstance().attachNetEvent = webfrontend.gui.Util.attachNetEvent;
							EA_CNCTA_Example.getInstance().detachNetEvent = webfrontend.gui.Util.detachNetEvent;
						}
						else
						{
							EA_CNCTA_Example.getInstance().attachNetEvent = phe.cnc.Util.attachNetEvent;
							EA_CNCTA_Example.getInstance().detachNetEvent = phe.cnc.Util.detachNetEvent;
						}
						
						if (typeof phe.cnc.gui.util == 'undefined')
							EA_CNCTA_Example.getInstance().formatNumbersCompact = webfrontend.gui.Util.formatNumbersCompact;	
						else
							EA_CNCTA_Example.getInstance().formatNumbersCompact = phe.cnc.gui.util.Numbers.formatNumbersCompact;		
						
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
