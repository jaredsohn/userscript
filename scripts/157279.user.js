// ==UserScript==
// @name 		The Green Cross - Tiberium Alliances Combat Simulator
// @description 	Combat Simulator used to plan and strategize attack before going into battle. This script layout is based off of Topper42's EA API example script.
// @namespace      	http*://*.alliances.commandandconquer.com/*
// @include        	http*://*.alliances.commandandconquer.com/*
// @version 		3.2.1
// @downloadURL    	http://userscripts.org/scripts/source/154546.user.js
// @author 		Peluski17
// @grant 		none
// ==/UserScript==

/**
 *	Although I am the author of this script, I want to also give credit to other authors who's methods and ideas are or might appear in this script. 
 * 	Credits: Topper42, Eferz98, KRS_L, PythEch, MrHIDEn, Panavia2, Deyhak, CodeEcho, 
 *		 Matthias Fuchs, Enceladus, TheLuminary, Da Xue, Quor, WildKatana
 */ 

(function(){
	var injectFunction = function() 
	{
		function createClasses()
		{
			//This is the setup for a class. 
			/*qx.Class.define("EXAMPLE", 
			{
				type: "singleton",
				extend: qx.core.Object,
            
				construct: function()
				{
				},
				
				destruct: function()
				{
				},
				
				members: 
				{
				}
			});*/
			
			qx.Class.define("Simulator", 
			{
				type: "singleton",
				extend: qx.core.Object,
            
				construct: function()
				{
					//setup buttons
					try 
					{						
						armyBar = qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_ATTACKSETUP);
						//Simulator Button//
						simBtn = new qx.ui.form.Button("Simulate");
						simBtn.set
						({
							alignY: "middle", 
							width: 60,
							height: 28,
							toolTipText: "Opens Simulation Screen.",
							appearance: "button-text-small"
						});
						simBtn.addListener("click", this.__openSimulatorWindow, this);
						
						armyBar.add(simBtn,{
							left: null,
							right: 58,
							bottom: 119
						});
						
						//Simulator Options Button//
						optionBtn = new qx.ui.form.Button("Options");
						optionBtn.set
						({
							alignY: "middle", 
							width: 60,
							height: 28,
							toolTipText: "Opens Simulator Options",
							appearance: "button-text-small"
						});
						optionBtn.addListener("click", this.__openOptionWindow, this);
						
						armyBar.add(optionBtn,{
							left: null,
							right: 58,
							bottom: 43
						});
						
						//Simulator Stats Button//
						statBtn = new qx.ui.form.Button("Stats");
						statBtn.set
						({
							alignY: "middle", 
							width: 60,
							height: 28,
							toolTipText: "Opens Simulator Stats Window",
							appearance: "button-text-small"
						});
						statBtn.addListener("click", this.__openStatWindow, this);
						
						armyBar.add(statBtn,{
							left: null,
							right: 58,
							bottom: 81
						});
						
						//Simulator Layout Button//
						layoutBtn = new qx.ui.form.Button("Layout");
						layoutBtn.set
						({
							alignY: "middle", 
							width: 60,
							height: 28,
							toolTipText: "Save/Load/Delete Unit Formations for current city",
							appearance: "button-text-small"
						});
						layoutBtn.addListener("click", this.__openLayoutWindow, this);
						//layoutBtn.setEnabled(false);
						armyBar.add(layoutBtn,{
							left: null,
							right: 58,
							bottom: 5
						});
						
						//Simulator Unlock Combat Button//	
						unlockCmtBtn = new qx.ui.form.Button("Unlock");
						unlockCmtBtn.set
						({
							alignY: "middle",
							width: 50,
							height: 50,
							toolTipText: "Unlock Combat Button",
							appearance: "button-text-small"
						});
						unlockCmtBtn.setOpacity(0.7);
						armyBar.add(unlockCmtBtn,{
							left: null,
							right: 7,
							bottom: 5
						});
						unlockCmtBtn.addListener("click", this.timeoutCmtBtn, this);
						
						//Simulator Unlock Repair Time Button//
						unlockRTBtn = new qx.ui.form.Button("Unlock");
						unlockRTBtn.set
						({
							alignY: "middle",
							width: 50,
							height: 50,
							toolTipText: "Unlock Repair Button",
							appearance: "button-text-small"
						});
						unlockRTBtn.setOpacity(0.7);
						
						armyBar.add(unlockRTBtn,{
							left: null,
							right: 7,
							bottom: 97
						});
						unlockRTBtn.addListener("click", this.timeoutRTBtn, this);
						
						playArea = qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.OVL_PLAYAREA);
						//Formation Buttons//
						shiftUpBtn = new qx.ui.form.Button("↑");
						shiftUpBtn.set
						({
							alignY: "middle",
							width: 30,
							height: 20,
							toolTipText: "Shifts units one space up",
							appearance: "button-text-small"
						});
						playArea.add(shiftUpBtn,{
							left: null,
							right: 70,
							bottom: 110
						});
						shiftUpBtn.addListener("click", function(){this.shiftFormation("u");}, this);
						shiftUpBtn.hide();
						
						shiftDownBtn = new qx.ui.form.Button("↓");
						shiftDownBtn.set
						({
							alignY: "middle",
							width: 30,
							height: 20,
							toolTipText: "Shifts units one space down",
							appearance: "button-text-small"
						});
						
						playArea.add(shiftDownBtn,{
							left: null,
							right: 70,
							bottom: 70
						});
						shiftDownBtn.addListener("click", function(){this.shiftFormation("d");}, this);
						shiftDownBtn.hide();
						
						shiftLeftBtn = new qx.ui.form.Button("←");
						shiftLeftBtn.set
						({
							alignY: "middle",
							width: 30,
							height: 20,
							toolTipText: "Shifts units one space left",
							appearance: "button-text-small"
						});
						playArea.add(shiftLeftBtn,{
							left: null,
							right: 90,
							bottom: 90
						});
						shiftLeftBtn.addListener("click", function(){this.shiftFormation("l");}, this);
						shiftLeftBtn.hide();
						
						shiftRightBtn = new qx.ui.form.Button("→");
						shiftRightBtn.set
						({
							alignY: "middle",
							width: 30,
							height: 20,
							toolTipText: "Shifts units one space right",
							appearance: "button-text-small"
						});
						playArea.add(shiftRightBtn,{
							left: null,
							right: 50,
							bottom: 90
						});
						shiftRightBtn.addListener("click", function(){this.shiftFormation("r");}, this);
						shiftRightBtn.hide();
						
						mirrorBtn = new qx.ui.form.Button("M");
						mirrorBtn.set
						({
							alignY: "middle",
							width: 35,
							height: 35,
							toolTipText: "Mirrors current army formation layout",
							appearance: "button-text-small"
						});
						
						playArea.add(mirrorBtn,{
							left: null,
							right: 6,
							bottom: 160
						});
						mirrorBtn.addListener("click", function(){this.mirrorFormation();}, this);
						mirrorBtn.hide();
						
						//disableAllUnitsBtn = new qx.ui.form.Button("", "webfrontend/ui/common/icn_res_power.png");
						disableAllUnitsBtn = new qx.ui.form.Button("", "FactionUI/icons/icon_disable_unit.png");
						disableAllUnitsBtn.set
						({
							center: true,
							show: "icon",
							alignY: "middle",
							width: 35,
							height: 35,
							toolTipText: "Enables/Disables all units",
							appearance: "button-text-small"
						});
						playArea.add(disableAllUnitsBtn,{
							left: null,
							right: 6,
							bottom: 120
						});
						disableAllUnitsBtn.addListener("click", function(){this.shiftFormation("n");}, this);
						disableAllUnitsBtn.getChildControl("icon").set({ width : 20, height : 20, scale : true });
						disableAllUnitsBtn.hide();
						
						armyUndoBtn = new qx.ui.form.Button("", "FactionUI/icons/icon_refresh_funds.png");
						armyUndoBtn.set
						({
							center: true,
							show: "icon",
							alignY: "middle",
							width: 35,
							height: 35,
							toolTipText: "Undo's formation to previous saved formation. Save formations by hitting the Update or Simulate button.",
							appearance: "button-text-small"
						});
						
						playArea.add(armyUndoBtn,{
							left: null,
							right: 6,
							bottom: 200
						});
						armyUndoBtn.addListener("click", function(){this.undoCurrentFormation();}, this);
						armyUndoBtn.setEnabled(false);
						armyUndoBtn.hide();
						
						quickSaveBtn = new qx.ui.form.Button("QS");
						quickSaveBtn.set
						({
							alignY: "middle",
							width: 35,
							height: 35,
							toolTipText: "Saves the current layout without having to open the Formation Saver window. Does not make persistent.",
							appearance: "button-text-small"
						});
						
						playArea.add(quickSaveBtn,{
							left: null,
							right: 6,
							bottom: 240
						});
						quickSaveBtn.addListener("click", function(){Simulator.LayoutWindow.getInstance().saveNewLayout(true)}, this);
						quickSaveBtn.hide();
												
						//Simulator Back Button//
						replayBar = qx.core.Init.getApplication().getReportReplayOverlay();
						var backBtn = new qx.ui.form.Button("Back");
						backBtn.set
						({
							width: 50,
							height: 24,
							appearance: "button-text-small",
							toolTipText: "Return to Combat Setup"
						});
						backBtn.addListener("click", this.backToCombatSetup, this);
						replayBar.add(backBtn, {
							top: 37,
							left: 255
						});
						
						var replayStatBtn = new qx.ui.form.Button("Stats");
						replayStatBtn.set
						({
							width: 50,
							height: 24,
							appearance: "button-text-small",
							toolTipText: "Return to Combat Setup"
						});
						replayStatBtn.addListener("click", this.__openStatWindow, this);
						replayBar.add(replayStatBtn, {
							top: 7,
							left: 255
						});
						
						this.isSimButtonDisabled = false;
						this.isSimulation = false;
						this.armyTempFormations = new Array();
						this.armyTempIdx = 0;
						this.repairOneBtns = new Array();
					}
					catch(e)
					{
						console.log("Error setting up Simulator Constructor: " );
						console.log(e.toString());
					}
				},
				
				destruct: function()
				{
				},
				
				members: 
				{
					armyBar: null,
					playArea: null,
					replayBar: null,
					simBtn: null,
					optionBtn: null,
					statBtn: null,
					layoutBtn: null,
					unlockCmtBtn: null,
					unlockRTBtn: null,
					shiftUpBtn: null,
					shiftDownBtn: null,
					shiftLeftBtn: null,
					shiftRightBtn: null,
					backBtn: null,
					isSimButtonDisabled: null,
					disableAllUnitsBtn: null,
					armyTempFormations: null,
					armyTempIdx: null,
					armyUndoBtn: null,
					isSimulation: null,
					quickSaveBtn: null,
					
					/**
					 * This method initiates the visual simulation with no stats produced. If the player
					 * wants stats produced, then they should do it through the stats window.
					 */
					__openSimulatorWindow: function()
					{
						var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();
						if (city != null)
						{
							var ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
							
							this.isSimulation = true;
							this.saveTempFormation();
							
							localStorage.ta_sim_last_city = city.get_Id();
							
							ownCity.get_CityArmyFormationsManager().set_CurrentTargetBaseId(city.get_Id());
							ClientLib.API.Battleground.GetInstance().SimulateBattle();
							var app = qx.core.Init.getApplication();
							var battleground = ClientLib.Vis.VisMain.GetInstance().get_Battleground();
							
							app.getPlayArea().setView(ClientLib.Data.PlayerAreaViewMode.pavmCombatReplay, city.get_Id(), 0, 0);
							
							
							var autoSim = localStorage['autoSimulate'];
							
							if (typeof autoSim != 'undefined')
							{
								if (autoSim == "yes")
								{
									var speed = localStorage['simulateSpeed'];
									setTimeout(function() {
										battleground.RestartReplay();
										battleground.set_ReplaySpeed(parseInt(speed));
									}, 1000)
								}
							}
							
							if ( this.isSimButtonDisabled == false)
							{
								simBtn.setEnabled(false);
								var simTimer = 10000;
								this.disableSimulateButtonTimer(simTimer);
								
								if (typeof simStatBtn != "undefined")
								{
									simStatBtn.setEnabled(false);
									var simStatTimer = 10000;
									Simulator.StatWindow.getInstance().disableSimulateStatButtonTimer(simStatTimer);
								}
							}
							
							setTimeout(function() {
								var battleDuration = battleground.get_BattleDuration();
								battleDuration = Simulator.StatWindow.getInstance().formatBattleDurationTime(battleDuration);
								Simulator.StatWindow.getInstance().__labelMiscBattleDuration.setValue(battleDuration);
							}, 1000);
							
							if (simReplayBtn.getEnabled() == false)
							{
								simReplayBtn.setEnabled(true);
							}
						}	
					},
					
					__openOptionWindow: function()
					{
						try
						{
							if (Simulator.OptionWindow.getInstance().isVisible())
							{
								console.log("Closing Option Window");
								Simulator.OptionWindow.getInstance().close();
							}
							else
							{
								console.log("Opening Option Window");
								Simulator.OptionWindow.getInstance().open();
							}
						}
						catch(e)
						{
							console.log("Error Opening or Closing Option Window");
							console.log(e.toString());
						}
					},
					
					__openStatWindow: function()
					{
						try
						{
							if (Simulator.StatWindow.getInstance().isVisible())
							{
								console.log("Closing Stat Window");
								Simulator.StatWindow.getInstance().close();
							}
							else
							{
								console.log("Opening Stat Window");
								Simulator.StatWindow.getInstance().open();
                                Simulator.StatWindow.getInstance().calcResources();
							}
						}
						catch(e)
						{
							console.log("Error Opening or Closing Stat Window");
							console.log(e.toString());
						}
					},
					
					__openLayoutWindow: function()
					{
						try
						{
							if (Simulator.LayoutWindow.getInstance().isVisible())
							{
								console.log("Closing Layout Window");
								Simulator.LayoutWindow.getInstance().close();
							}
							else
							{
								console.log("Opening LayoutWindow");
								Simulator.LayoutWindow.getInstance().updateLayoutList();
								Simulator.LayoutWindow.getInstance().layoutTextBox.setValue("");
								Simulator.LayoutWindow.getInstance().persistentCheck.setValue(false);
								Simulator.LayoutWindow.getInstance().open();
							}
						}
						catch(e)
						{
							console.log("Error Opening or Closing Layout Window");
							console.log(e.toString());
						}
					},
					
					__openToolsWindow: function()
					{
						//Might need to be implemented later on.
					},
					
					attachNetEvent: function()
					{
						console.log("Need to assign correct function!");
					},
					
					formatNumbersCompact: function()
					{
						console.log("Need to assign correct function!");
					},
					
					GetUnitMaxHealth: function()
					{
						console.log("Need to assign correct function!");
						return -1;                
					},
					
					saveTempFormation: function()
					{
						try
						{
							if (this.armyTempFormations.length != 0)
							{
								var currForm = this.getCityPreArmyUnits().get_ArmyUnits().l;
								
								for (var i = 0; i < currForm.length; i++)
								{
									var lastForm = this.armyTempFormations[this.armyTempIdx][i];
									if ( (currForm[i].get_CoordX() != lastForm.x) || (currForm[i].get_CoordY() != lastForm.y))
									{
										break;
									}
									else if ((i + 1) == currForm.length )
									{
										return;
									}
								}
							}
							
							var formation = new Array();
							var unitList = this.getCityPreArmyUnits().get_ArmyUnits().l;
							
							for (var i = 0; i < unitList.length; i++)
							{
								var unit = unitList[i];
								var unitInfo = {};
								unitInfo.x = unit.get_CoordX();
								unitInfo.y = unit.get_CoordY();
								unitInfo.id = unit.get_Id();
								unitInfo.enabled = unit.get_Enabled();
								
								formation.push(unitInfo);
							}
							
							this.armyTempFormations.push(formation);
							this.armyTempIdx = this.armyTempFormations.length - 1;
							if (this.armyTempFormations.length > 1)
								armyUndoBtn.setEnabled(true);
						}
						catch(e)
						{
							console.log("Error Saving Temp Formation");
							console.log(e.toString());
						}
					},
					
					undoCurrentFormation: function()
					{
						try
						{
							this.restoreFormation(this.armyTempFormations[(this.armyTempIdx - 1)]);
							
							//get rid of last element now that we have undone it.
							this.armyTempFormations.splice(this.armyTempIdx, 1);
							this.armyTempIdx--;
							
							if (this.armyTempFormations.length == 1)
								armyUndoBtn.setEnabled(false);
						}
						catch(e)
						{
							console.log("Error undoing formation");
							console.log(e.toString());
						}
					},
					
					/*
					 * Mirrors across the X Axis (4 is axis on grid 0-9)
					 */
					mirrorFormation: function()
					{
						try
						{
							var units = this.getCityPreArmyUnits();
							var unitsList = this.getCityPreArmyUnits().get_ArmyUnits().l;
							var mirror = new Array();
							
							for (var i = 0; i < unitsList.length; i++)
							{
								var unit = unitsList[i];
								var armyUnit = {};
								
								//do the mirroring
								var x = unit.get_CoordX();
								var distanceX = x - 4; //from center (4)
								if (distanceX < 0)
								{
									x = (x - distanceX) + (-1 * distanceX);
								}
								else if (distanceX > 0)
								{
									x = (x - distanceX) - distanceX;
								}
								
								armyUnit.x = x;
								armyUnit.y = unit.get_CoordY();
								armyUnit.id = unit.get_Id();
								armyUnit.enabled = unit.get_Enabled();
								
								mirror.push(armyUnit);
							}
							
							this.restoreFormation(mirror);
						}
						catch(e)
						{
							console.log("Error Mirroring Formation");
							console.log(e);
						}
					},
					
					/**
					 * Code from one of the previous authors of an older simulator version. If anyone knows the true author please let me know.
					 */
					shiftFormation: function(direction)
					{
						try
						{							
							console.log("Shifting Unit Formation");
							var v_shift = 0;
							var h_shift = 0;
							
							//Determines shift direction 
							if (direction == "u") var v_shift = -1;
							if (direction == "d") var v_shift = 1;
							if (direction == "l") var h_shift = -1;
							if (direction == "r") var h_shift = 1;
							//No need to continue
							if (v_shift == 0 && h_shift == 0 && direction != "n")
								return;
								
							var units = this.getCityPreArmyUnits().get_ArmyUnits().l;
							
							var newLayout = [];
							for (var i = 0;	(i < units.length); i++) 
							{
								var unit = units[i];
								var armyUnit = {};
								var x = unit.get_CoordX() + h_shift;
								switch (x) {
									case 9:
									x = 0;
									break;
									case -1:
									x = 8;
									break;
								}
								var y = unit.get_CoordY() + v_shift;
								switch (y) {
									case 4:
									y = 0;
									break;
									case -1:
									y = 3;
									break;
								}
								armyUnit.x = x;
								armyUnit.y = y;
								armyUnit.id = unit.get_Id();
								
								//For enabling/disabling all units
								if (direction == "n")
								{
									if (typeof localStorage['allUnitsDisabled'] != 'undefined')
									{
										if (localStorage['allUnitsDisabled'] == "yes")
										{
											armyUnit.enabled = unit.set_Enabled(false);
										}
										else
										{
											armyUnit.enabled = unit.set_Enabled(true);
										}
									}
									else
									{
										armyUnit.enabled = unit.set_Enabled(false);
									}
								}
								armyUnit.enabled = unit.get_Enabled();
								newLayout.push(armyUnit);
							}
							//Change disable button to opposite 
							if (direction == "n")
							{
								if (localStorage['allUnitsDisabled'] == "yes")
									localStorage['allUnitsDisabled'] = "no";
								else
									localStorage['allUnitsDisabled'] = "yes";
							}
							this.restoreFormation(newLayout);
						}
						catch(e)
						{
							console.log("Error Shifting Units");
							console.log(e.toString());
						}
					},
					
					restoreFormation: function(layout)
					{
						try
						{
							var sUnits = layout;
							
							var units = this.getCityPreArmyUnits();
							var units_list = units.get_ArmyUnits().l;
							
							for (var idx = 0; idx < sUnits.length; idx++) 
							{
								var saved_unit = sUnits[idx];
								var uid = saved_unit.id;
								for (var i = 0; i < units_list.length; i++) 
								{
									if (units_list[i].get_Id() === uid) 
									{
										units_list[i].MoveBattleUnit(saved_unit.x, saved_unit.y);
										if (saved_unit.enabled === undefined) 
											units_list[i].set_Enabled(true);
										else 
											units_list[i].set_Enabled(saved_unit.enabled);
									}
								}
							}
							units.UpdateFormation(true);
						}
						catch(e)
						{
							console.log("Error Restoring Formation");
							console.log(e.toString());
						}
					},
					
					getCityPreArmyUnits: function()
					{
						var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();
						var ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
						var formationManager = ownCity.get_CityArmyFormationsManager();
						ownCity.get_CityArmyFormationsManager().set_CurrentTargetBaseId(city.get_Id());
						
						return formationManager.GetFormationByTargetBaseId(formationManager.get_CurrentTargetBaseId());
					},
					
					timeoutCmtBtn: function()
					{
						armyBar.remove(unlockCmtBtn);
						setTimeout(function() {
							armyBar.add(unlockCmtBtn,{
								left: null,
								right: 7,
								bottom: 5
							});
						}, 2000);
					},
					
					timeoutRTBtn: function()
					{
						armyBar.remove(unlockRTBtn);
						setTimeout(function() {
							armyBar.add(unlockRTBtn,{
								left: null,
								right: 7,
								bottom: 97
							});
						}, 2000);
					},
					
					backToCombatSetup: function()
					{
						var app = qx.core.Init.getApplication();
						var player_cities = ClientLib.Data.MainData.GetInstance().get_Cities();
						var current_city = player_cities.get_CurrentCity();
						try 
						{
							//This brings the player back to viewing the enemies defense setup PlayArea
							app.getPlayArea().setView(ClientLib.Data.PlayerAreaViewMode.pavmCombatSetupDefense, localStorage.ta_sim_last_city, 0, 0);
						} 
						catch (e) 
						{
							console.log("Error closing Simulation Window");
							console.log(e.toString());
						}	
					},
					
					disableSimulateButtonTimer: function(timer)
					{
						try
						{
							if ( timer >= 1000)
							{
								this.isSimButtonDisabled =true;
								simBtn.setLabel(Math.floor(timer/1000));
								timer -= 1000;
								setTimeout(function () {
									Simulator.getInstance().disableSimulateButtonTimer(timer);
								}, 1000)
							}
							else
							{
								setTimeout(function () {
									simBtn.setEnabled(true);
									if (Simulator.OptionWindow.getInstance()._buttonSizeCB.getValue())
										simBtn.setLabel("Simulate");
									else
										simBtn.setLabel("S");	
								}, timer)
								this.isSimButtonDisabled = false;
							}
						}
						catch(e)
						{
							console.log("Error disabling simulator button");
							console.log(e.toString());
						}
					}
				}
			});
			
			qx.Class.define("Simulator.StatWindow", 
			{
				type: "singleton",
				extend:	qx.ui.window.Window,
				construct: function()
				{
					this.base(arguments);
					this.setLayout(new qx.ui.layout.VBox());
					
					this.set({
						width: 220,
						caption: "Simulator Stats",
						padding: 2,
						allowMaximize: false,
						showMaximize: false,
						allowMinimize: false,
						showMinimize: false,
						
					});
					
					this.setResizable(false, true, false, true);
					if (typeof localStorage['statWindowPosLeft'] != 'undefined')
					{
						var left = parseInt(localStorage['statWindowPosLeft']);
						var top = parseInt(localStorage['statWindowPosTop']);
						this.moveTo(left, top);
					}
					else
					{
						this.moveTo(125,30);
					}

					//Enemy Health Section//
					var enemyHealthHeader = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({ decorator: "pane-light-opaque"});
					var enemyHealthTitle = new qx.ui.basic.Label("Enemy Base Health").set({ alignX: "center", alignY: "top", font: "font_size_14_bold"});
					enemyHealthHeader.add(enemyHealthTitle);
					this.add(enemyHealthHeader);
					
					var enemyHealth = new qx.ui.container.Composite(new qx.ui.layout.HBox(2));
					enemyHealth.setThemedFont("bold");
					var enemyHealthBox = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({ width: 70, padding: 5, decorator: "pane-light-opaque"});
					var eHLabelOverall = new qx.ui.basic.Label("Overall:");
					var eHLabelBase = new qx.ui.basic.Label("Base:");
					var eHLabelDefense = new qx.ui.basic.Label("Defense:");
					var eHLabelCY = new qx.ui.basic.Label("Con.Yard:");
					var eHLabelDF = new qx.ui.basic.Label("Def.Fac:");
					enemyHealthBox.add(eHLabelOverall);
					enemyHealthBox.add(eHLabelBase);
					enemyHealthBox.add(eHLabelDefense);
					enemyHealthBox.add(eHLabelCY);
					enemyHealthBox.add(eHLabelDF);
					enemyHealth.add(enemyHealthBox);
					
					this.__labelEnemyOverallHealth = new Array();
					this.__labelEnemyBaseHealth = new Array();
					this.__labelEnemyDefenseHealth = new Array();
					this.__labelEnemyCYHealth = new Array();
					this.__labelEnemyDFHealth = new Array();
					
					var enemyHealthValues = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({ alignX: "center", width: 90, padding: 5, decorator: "pane-light-opaque"});
					this.__labelEnemyOverallHealth = new qx.ui.basic.Label("-").set({ alignX: "right"});
					this.__labelEnemyBaseHealth = new qx.ui.basic.Label("-").set({ alignX: "right"});
					this.__labelEnemyDefenseHealth = new qx.ui.basic.Label("-").set({ alignX: "right"});
					this.__labelEnemyCYHealth = new qx.ui.basic.Label("-").set({ alignX: "right"});
					this.__labelEnemyDFHealth = new qx.ui.basic.Label("-").set({ alignX: "right"});
					enemyHealthValues.add(this.__labelEnemyOverallHealth);
					enemyHealthValues.add(this.__labelEnemyBaseHealth);
					enemyHealthValues.add(this.__labelEnemyDefenseHealth);
					enemyHealthValues.add(this.__labelEnemyCYHealth);
					enemyHealthValues.add(this.__labelEnemyDFHealth);
					enemyHealth.add(enemyHealthValues, { flex: 1 });
					this.add(enemyHealth);
					
					//Player Repair Section//
					var playerRepairHeader = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({ decorator: "pane-light-opaque"});
					var playerRepairTitle = new qx.ui.basic.Label("Repair Times").set({ alignX: "center", alignY: "top", font: "font_size_14_bold"});
					playerRepairHeader.add(playerRepairTitle);
					this.add(playerRepairHeader);
					
					var playerRepair = new qx.ui.container.Composite(new qx.ui.layout.HBox(2));
					playerRepair.setThemedFont("bold");
					var playerRepairBox = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({ width: 70, padding: 5, decorator: "pane-light-opaque"});
					var pRLabelStorage = new qx.ui.basic.Label("Storage:");
					var pRLabelOverall = new qx.ui.basic.Label("Overall:");
					var pRLabelInf = new qx.ui.basic.Label("Infantry:");
					var pRLabelVehi = new qx.ui.basic.Label("Vehicle:");
					var pRLabelAir = new qx.ui.basic.Label("Aircraft:");
					playerRepairBox.add(pRLabelStorage);
					playerRepairBox.add(pRLabelOverall);
					playerRepairBox.add(pRLabelInf);
					playerRepairBox.add(pRLabelVehi);
					playerRepairBox.add(pRLabelAir);
					playerRepair.add(playerRepairBox);
					
					var playerRepairValues = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({ alignX: "center", width: 90, padding: 5, decorator: "pane-light-opaque"});
					this.__labelRepairStorage = new qx.ui.basic.Label("-").set({ alignX: "right"});
					this.__labelRepairOverall = new qx.ui.basic.Label("-").set({ alignX: "right"});
					this.__labelRepairInf = new qx.ui.basic.Label("-").set({ alignX: "right"});
					this.__labelRepairVehi = new qx.ui.basic.Label("-").set({ alignX: "right"});
					this.__labelRepairAir = new qx.ui.basic.Label("-").set({ alignX: "right"});
					playerRepairValues.add(this.__labelRepairStorage);
					playerRepairValues.add(this.__labelRepairOverall);
					playerRepairValues.add(this.__labelRepairInf);
					playerRepairValues.add(this.__labelRepairVehi);
					playerRepairValues.add(this.__labelRepairAir);
					playerRepair.add(playerRepairValues, { flex: 1 });
					this.add(playerRepair);
					
					//MISC Section//
					var miscHeader = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({ decorator: "pane-light-opaque"});
					var miscTitle = new qx.ui.basic.Label("Misc").set({ alignX: "center", alignY: "top", font: "font_size_14_bold"});
					miscHeader.add(miscTitle);
					this.add(miscHeader);
					
					var misc = new qx.ui.container.Composite(new qx.ui.layout.HBox(2));
					misc.setThemedFont("bold");
					var miscBox = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({ width: 70, padding: 5, decorator: "pane-light-opaque"});
					var miscOutcome = new qx.ui.basic.Label("Outcome:");
					var miscBattleDuration = new qx.ui.basic.Label("Duration:");
					miscBox.add(miscOutcome);
					miscBox.add(miscBattleDuration);
					misc.add(miscBox);
					
					this.__labelMiscOutcome = new Array();
					this.__labelMiscBattleDuration = new Array();
					
					var miscValues = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({ alignX: "center", width: 90, padding: 5, decorator: "pane-light-opaque"});
					this.__labelMiscOutcome = new qx.ui.basic.Atom("Unknown", null).set({ allowGrowX: false, alignX: "right"});
					this.__labelMiscBattleDuration = new qx.ui.basic.Label("0:00").set({ alignX: "right"});
					miscValues.add(this.__labelMiscOutcome);
					miscValues.add(this.__labelMiscBattleDuration);
					misc.add(miscValues, { flex: 1 });
					this.add(misc);	
					
					//Battle Loot Section//
					var battleLootHeader = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({ decorator: "pane-light-opaque"});
					var battleLootTitle = new qx.ui.basic.Label("Loot from Battle").set({ alignX: "center", alignY: "top", font: "font_size_14_bold"});
					battleLootHeader.add(battleLootTitle);
					this.add(battleLootHeader);
					
					
					var battleLoot = new qx.ui.container.Composite(new qx.ui.layout.HBox(2));
					battleLoot.setThemedFont("bold");
					var battleLootBox = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({ width: 70, padding: 5, decorator: "pane-light-opaque"});
					var battleLootTib = new qx.ui.basic.Atom(null, "webfrontend/ui/common/icn_res_tiberium.png");
					var battleLootCry = new qx.ui.basic.Atom(null, "webfrontend/ui/common/icn_res_chrystal.png");
					var battleLootCred = new qx.ui.basic.Atom(null, "webfrontend/ui/common/icn_res_dollar.png");
					var battleLootRP = new qx.ui.basic.Atom(null, "webfrontend/ui/common/icn_res_research_mission.png");
					//var battleLootTotal = new qx.ui.basic.Atom(null, "webfrontend/ui/icons/icon_item.png");
					var battleLootTotal = new qx.ui.basic.Atom(null, "webfrontend/ui/common/icn_build_slots.png");
					battleLootTib.setToolTipText("Tiberium");
					battleLootCry.setToolTipText("Crystals");
					battleLootCred.setToolTipText("Credits");
					battleLootRP.setToolTipText("Research Points");
					battleLootTotal.setToolTipText("Total Loot");
					battleLootTib.getChildControl("icon").set({ width : 23, height : 23, scale : true }); 
					battleLootCry.getChildControl("icon").set({ width : 23, height : 23, scale : true }); 
					battleLootCred.getChildControl("icon").set({ width : 23, height : 23, scale : true }); 
					battleLootRP.getChildControl("icon").set({ width : 23, height : 23, scale : true }); 
					battleLootTotal.getChildControl("icon").set({ width : 23, height : 23, scale : true }); 
					battleLootBox.add(battleLootTib);
					battleLootBox.add(battleLootCry);
					battleLootBox.add(battleLootCred);
					battleLootBox.add(battleLootRP);
					battleLootBox.add(battleLootTotal);
					battleLoot.add(battleLootBox);
					
					this.__labelBattleLootTotal = new Array();
					this.__labelBattleLootTib = new Array();
					this.__labelBattleLootCry = new Array();
					this.__labelBattleLootCred = new Array();
					this.__labelBattleLootRP = new Array();
					
					var battleLootValues = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({ alignX: "center", width: 90, padding: 5, decorator: "pane-light-opaque"});
					this.__labelBattleLootTib = new qx.ui.basic.Label("-").set({ alignX: "right", padding: 3});
					this.__labelBattleLootCry = new qx.ui.basic.Label("-").set({ alignX: "right", padding: 3});
					this.__labelBattleLootCred = new qx.ui.basic.Label("-").set({ alignX: "right", padding: 3});
					this.__labelBattleLootRP = new qx.ui.basic.Label("-").set({ alignX: "right", padding: 3});
					this.__labelBattleLootTotal = new qx.ui.basic.Label("-").set({ alignX: "right", padding: 3});
					battleLootValues.add(this.__labelBattleLootTib);
					battleLootValues.add(this.__labelBattleLootCry);
					battleLootValues.add(this.__labelBattleLootCred);
					battleLootValues.add(this.__labelBattleLootRP);
					battleLootValues.add(this.__labelBattleLootTotal);
					battleLoot.add(battleLootValues, { flex: 1 });
					this.add(battleLoot);
					
					//Simulate Button//
					var simButton = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)).set({ padding: 5, decorator: "pane-light-opaque"});
					this.add(simButton);
					
					simStatBtn = new qx.ui.form.Button("Update").set({allowGrowX: false});
					simStatBtn.setToolTipText("Updates Simulation Stats");
					simStatBtn.addListener("click", this.simulateStats, this);
					
					simReplayBtn = new qx.ui.form.Button("Replay").set({allowGrowX: false});
					simReplayBtn.setToolTipText("Shows Replay of last simulation");
					simReplayBtn.addListener("click", this.doSimReplay, this);
					
					simReplayBtn.setEnabled(false);
					
					simButton.add(simStatBtn, {width: "50%"});
					simButton.add(simReplayBtn, {width: "50%"});
					
					//Add Header Events//
					enemyHealthHeader.addListener("click", function()
					{
						if (enemyHealth.isVisible())
							enemyHealth.exclude();
						else
							enemyHealth.show();
					}, this);
					
					playerRepairHeader.addListener("click", function()
					{
						if (playerRepair.isVisible())
							playerRepair.exclude();
						else
							playerRepair.show();
					}, this);
					
					miscHeader.addListener("click", function()
					{
						if (misc.isVisible())
							misc.exclude();
						else
							misc.show();
					}, this);
					
					battleLootHeader.addListener("click", function()
					{
						if (battleLoot.isVisible())
							battleLoot.exclude();
						else
							battleLoot.show();
					}, this);
					
					if (typeof localStorage['hideHealth'] != 'undefined')
					{
						if (localStorage['hideHealth'] == "yes")
							enemyHealth.exclude();
					}
					
					if (typeof localStorage['hideRepair'] != 'undefined')
					{
						if (localStorage['hideRepair'] == "yes")
							playerRepair.exclude();
					}
					
					if (typeof localStorage['hideMisc'] != 'undefined')
					{
						if (localStorage['hideMisc'] == "yes")
							misc.exclude();
					}
					
					if (typeof localStorage['hideLoot'] != 'undefined')
					{
						if (localStorage['hideLoot'] == "yes")
							battleLoot.exclude();
					}
					
					this.isSimStatButtonDisabled = false;
					
					Simulator.getInstance().attachNetEvent(ClientLib.API.Battleground.GetInstance(), "OnSimulateBattleFinished", ClientLib.API.OnSimulateBattleFinished, this, this.__OnSimulateBattleFinished);					
				},
				
				destruct: function()
				{
				},
				
				members: 
				{
					simStatBtn: null,
					simReplayBtn: null,
					__labelEnemyOverallHealth: null,
					__labelEnemyBaseHealth: null,
					__labelEnemyDefenseHealth: null,
					__labelEnemyCYHealth: null,
					__labelEnemyDFHealth: null,
					__labelRepairOverall: null,
					__labelRepairInf: null,
					__labelRepairVehi: null,
					__labelRepairAir: null,
					__labelBattleLootTotal: null,
					__labelBattleLootTib: null,
					__labelBattleLootCry: null,
					__labelBattleLootCred: null,
					__labelBattleLootRP: null,
					__labelMiscOutcome: null,
					__labelMiscBattleDuration: null,
					isSimStatButtonDisabled: null,
					__labelRepairStorage: null,
					
					simulateStats: function()
					{
						console.log("Simulating Stats");
						var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();
						if (city != null)
						{			
							Simulator.getInstance().isSimulation = true;						
							Simulator.getInstance().saveTempFormation();
							localStorage.ta_sim_last_city = city.get_Id();
							var ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
							ownCity.get_CityArmyFormationsManager().set_CurrentTargetBaseId(city.get_Id());
							ClientLib.API.Battleground.GetInstance().SimulateBattle();
							var battleground = ClientLib.Vis.VisMain.GetInstance().get_Battleground();
							
							//Disable Simulate Button
							if ( this.isSimStatButtonDisabled == false )
							{
								simStatBtn.setEnabled(false);
								var simStatTimer = 10000;
								var simStatTimeout = this.disableSimulateStatButtonTimer(simStatTimer);
								
								simBtn.setEnabled(false);
								var simTimer = 10000;
								Simulator.getInstance().disableSimulateButtonTimer(simTimer);
							}
							
							setTimeout(function() {
								var battleDuration = battleground.get_BattleDuration();
								battleDuration = Simulator.StatWindow.getInstance().formatBattleDurationTime(battleDuration);
								Simulator.StatWindow.getInstance().__labelMiscBattleDuration.setValue(battleDuration);
							}, 1000);
							
							if (simReplayBtn.getEnabled() == false)
								simReplayBtn.setEnabled(true);
						}
					},
					
					doSimReplay: function()
					{
						try
						{
							Simulator.getInstance().isSimulation = true;
							var battleground = ClientLib.Vis.VisMain.GetInstance().get_Battleground();
							var app = qx.core.Init.getApplication();
							app.getPlayArea().setView(ClientLib.Data.PlayerAreaViewMode.pavmCombatReplay, localStorage.ta_sim_last_city, 0, 0);
							
							var autoSim = localStorage['autoSimulate'];
							
							if (typeof autoSim != 'undefined')
							{
								if (autoSim == "yes")
								{
									var speed = localStorage['simulateSpeed'];
									setTimeout(function() {
										battleground.RestartReplay();
										battleground.set_ReplaySpeed(parseInt(speed));
									}, 1000)
								}
							}
						}
						catch(e)
						{
							console.log("Error attempting to show Simulation Replay");
							console.log(e.toString());
						}
					},
					
					__OnSimulateBattleFinished: function(data) 
					{
						this.getSimulationInfo(data);
					},
					
					formatBattleDurationTime: function(time)
					{
						var seconds = time / 1000;
						var minutes = seconds / 60;
						minutes = Math.round(minutes - 0.5);
						seconds = Math.round((seconds - 0.5) - (minutes * 60));
						
						if( seconds < 10)
						{
							seconds = "0" + seconds;
						}
						return minutes + ":" + seconds;
					},
					
					calculateRepairCosts: function(id, level, sHealth, eHealth, mHealth)
					{
						repairCosts = {"RT": 0, "C": 0};
						var dmgRatio = 1;
						if (sHealth != eHealth)
						{
							if (eHealth > 0)
							{
								dmgRatio = ((sHealth - eHealth) / 16) / mHealth;
							}
							else
							{
								dmgRatio = (sHealth / 16) / mHealth;
							}
							
							var costs = ClientLib.API.Util.GetUnitRepairCosts(level, id, dmgRatio);
							
							for (var idx = 0; idx < costs.length; idx++)
							{
								var uCosts = costs[idx];
								var cType = parseInt(uCosts.Type);
								switch (cType) 
								{
									case ClientLib.Base.EResourceType.Crystal:
										repairCosts["C"] += uCosts.Count;
										break;
									case ClientLib.Base.EResourceType.RepairChargeBase:
									case ClientLib.Base.EResourceType.RepairChargeInf:
									case ClientLib.Base.EResourceType.RepairChargeVeh:
									case ClientLib.Base.EResourceType.RepairChargeAir:
										repairCosts["RT"] += uCosts.Count;
										break;
								}
							}		
						}
						return repairCosts;
					},
					
					getSimulationInfo: function(data)
					{
						console.log("Getting Player Unit Damage");
						try
						{
							var crystals = 0, infCry = 0, vehiCry = 0, airCry = 0;
							var allSH = 0, allEH = 0, allMH = 0, allHP = 0;	
							var baseSH = 0, baseEH = 0, baseMH = 0, baseHP = 0;
							var defSH = 0, defEH = 0, defMH = 0, defHP = 0;
							var infSH = 0, infEH = 0, infMH = 0, infHP = 0;
							var vehiSH = 0, vehiEH = 0, vehiMH = 0, vehiHP = 0;
							var airSH = 0, airEH = 0, airMH = 0, airHP = 0;
							var infRT = 0, vehiRT = 0, airRT = 0;
							var cySH = 0, cyEH = 0, cyMH = 0, cyHP = 0;
							var dfSH = 0, dfEH = 0, dfMH = 0, dfHP = 0;
							var costs = {};
							var entities = []; //for calculating loot 
							var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();
							var defBonus = city.get_AllianceDefenseBonus();
							for (var idx = 0; idx < data.length; idx++)
							{
								var unitData = data[idx].Value;
								var uMDBID = unitData.t;
								var unit = ClientLib.Res.ResMain.GetInstance().GetUnit_Obj(uMDBID);
								var level = unitData.l;
								var sHealth = unitData.sh;
								var eHealth = unitData.h;
								var mHealth = Simulator.getInstance().GetUnitMaxHealth(level, unit);
								
								//for factoring in Player's durability boost from POI's
								if (city != null && unit.pt != ClientLib.Base.EPlacementType.Offense)
								{
									var cityType = city.get_CityFaction();
									switch(cityType)
									{
										case ClientLib.Base.EFactionType.GDIFaction:
										case ClientLib.Base.EFactionType.NODFaction:
											var mod = ClientLib.Vis.VisMain.GetInstance().get_Battleground().GetNerfAndBoostModifier(level, defBonus);			
											mHealth = Math.round(mHealth * (mod / 100));
											break;
									}
								}
								
								var pType = unit.pt;
								var mType = unit.mt;
								entities.push(unitData);
								switch(pType)
								{
									case ClientLib.Base.EPlacementType.Defense: 
										allMH += mHealth;
										allEH += eHealth;
										defMH += mHealth;
										defEH += eHealth;
										break;
									case ClientLib.Base.EPlacementType.Offense:
										switch(mType)
										{
											case ClientLib.Base.EUnitMovementType.Feet:
												infMH += mHealth;
												//infSH += sHealth;
												infEH += eHealth;
												costs = this.calculateRepairCosts(uMDBID, level, sHealth, eHealth, mHealth);
												infRT += costs["RT"];
												infCry += costs["C"];
												crystals += costs["C"];
												break;
											case ClientLib.Base.EUnitMovementType.Wheel:
											case ClientLib.Base.EUnitMovementType.Track:
												vehiMH += mHealth;
												//vehiSH += sHealth;
												vehiEH += eHealth;
												costs = this.calculateRepairCosts(uMDBID, level, sHealth, eHealth, mHealth);
												vehiRT += costs["RT"];
												vehiCry += costs["C"];
												crystals += costs["C"];
												break;
											case ClientLib.Base.EUnitMovementType.Air:
											case ClientLib.Base.EUnitMovementType.Air2:
												airMH += mHealth;
												//airSH += sHealth;
												airEH += eHealth;
												costs = this.calculateRepairCosts(uMDBID, level, sHealth, eHealth, mHealth);
												airRT += costs["RT"];
												airCry += costs["C"];
												crystals += costs["C"];
												break;
										}
										break;
									case ClientLib.Base.EPlacementType.Structure:
										allMH += mHealth;
										allEH += eHealth;
										baseMH += mHealth;
										baseEH += eHealth;
										switch(uMDBID)
										{
											case 151:
											case 112:
											case 177: //Construction Yard
												cyMH = mHealth;
												cyEH = eHealth;
												break;
											case 158:
											case 131:
											case 195: //Defense Facility
												dfMH = mHealth;
												dfEH = eHealth;
												break;
										}
										break;
								}
							}
							
							crystals = Simulator.getInstance().formatNumbersCompact(crystals);
							infCry = Simulator.getInstance().formatNumbersCompact(infCry);
							vehiCry = Simulator.getInstance().formatNumbersCompact(vehiCry);
							airCry = Simulator.getInstance().formatNumbersCompact(airCry);
							
							var allOffRTInSeconds = Math.max(infRT, vehiRT, airRT);
							var allOffRT = phe.cnc.Util.getTimespanString(ClientLib.Data.MainData.GetInstance().get_Time().GetTimeSpan(Math.max(infRT, vehiRT, airRT)));
							infRT = phe.cnc.Util.getTimespanString(ClientLib.Data.MainData.GetInstance().get_Time().GetTimeSpan(infRT));
							vehiRT = phe.cnc.Util.getTimespanString(ClientLib.Data.MainData.GetInstance().get_Time().GetTimeSpan(vehiRT));
							airRT = phe.cnc.Util.getTimespanString(ClientLib.Data.MainData.GetInstance().get_Time().GetTimeSpan(airRT));				
							
							allHP = (allMH == 0) ? 100 : (allEH / (allMH * 16)) * 100;
							baseHP = (baseMH == 0) ? 100 : (baseEH / (baseMH * 16)) * 100;	
							defHP = (defMH == 0) ? 100 : (defEH / (defMH * 16)) * 100;
							cyHP = (cyMH == 0) ? 100 : (cyEH / (cyMH * 16)) * 100;
							dfHP = (dfMH == 0) ? 100 : (dfEH / (dfMH * 16)) * 100;
							
							
                            infHP = (infMH == 0) ? 100 : (infEH / (infMH * 16)) * 100;
                   			vehiHP = (vehiMH == 0) ? 100 : (vehiEH / (vehiMH * 16)) * 100;
							airHP = (airMH == 0) ? 100 : (airEH / (airMH * 16)) * 100;
                            
							var allOffHP = ((infEH + vehiEH + airEH) / ((infMH + vehiMH + airMH) * 16)) * 100;
                            
							//Set MISC and Base Health Labels
							if (allOffHP == 0)
							{
								 this.__labelMiscOutcome.setLabel("Total Defeat");
								 this.__labelMiscOutcome.setIcon("FactionUI/icons/icon_reports_total_defeat.png");
								 this.__labelMiscOutcome.setTextColor("red");
							}
							else if (cyEH == 0)
							{	
								this.__labelMiscOutcome.setLabel("Total Victory");
								this.__labelMiscOutcome.setIcon("FactionUI/icons/icon_reports_total_victory.png");
								this.__labelMiscOutcome.setTextColor("darkgreen");
							}
							else
							{
								this.__labelMiscOutcome.setLabel("Victory");
								this.__labelMiscOutcome.setIcon("FactionUI/icons/icon_reports_victory.png");
								this.__labelMiscOutcome.setTextColor("darkgreen");
							}

							this.__labelEnemyOverallHealth.setValue(allHP.toFixed(2));
							this.setEHLabelColor(this.__labelEnemyOverallHealth, allHP.toFixed(2));
							
							this.__labelEnemyDefenseHealth.setValue(defHP.toFixed(2));
							this.setEHLabelColor(this.__labelEnemyDefenseHealth, defHP.toFixed(2));
							
							this.__labelEnemyBaseHealth.setValue(baseHP.toFixed(2));
							this.setEHLabelColor(this.__labelEnemyBaseHealth, baseHP.toFixed(2));
							
							this.__labelEnemyCYHealth.setValue(cyHP.toFixed(2));
							this.setEHLabelColor(this.__labelEnemyCYHealth, cyHP.toFixed(2));
							
							this.__labelEnemyDFHealth.setValue(dfHP.toFixed(2));
							this.setEHLabelColor(this.__labelEnemyDFHealth, dfHP.toFixed(2));
							
							var getRTSelection = localStorage['getRTSelection'];
							
							if (typeof localStorage['getDivider'] != 'undefined')
								var divider = " " + localStorage['getDivider'] + " ";	
							else
								var divider = " | "; //default
							
							
							if (typeof getRTSelection != 'undefined')
							{
								if (getRTSelection == "crt")
								{
									this.__labelRepairOverall.setValue(crystals + divider + allOffRT);
									this.__labelRepairInf.setValue(infCry + divider + infRT);
									this.__labelRepairVehi.setValue(vehiCry + divider + vehiRT);
									this.__labelRepairAir.setValue(airCry + divider + airRT);
								}
								else if (getRTSelection == "hprt")
								{
									this.__labelRepairOverall.setValue(allOffHP.toFixed(2) + divider + allOffRT);
									this.__labelRepairInf.setValue(infHP.toFixed(2) + divider + infRT);	
									this.__labelRepairVehi.setValue(vehiHP.toFixed(2) + divider + vehiRT);
									this.__labelRepairAir.setValue(airHP.toFixed(2) + divider + airRT);
									
								}
								else
								{
									this.__labelRepairOverall.setValue(allOffRT);
									this.__labelRepairInf.setValue(infRT);
									this.__labelRepairVehi.setValue(vehiRT);
									this.__labelRepairAir.setValue(airRT);	
								}	
							}
							else //default
							{
								this.__labelRepairOverall.setValue(allOffRT);
								this.__labelRepairInf.setValue(infRT);
								this.__labelRepairVehi.setValue(vehiRT);
								this.__labelRepairAir.setValue(airRT);
							}
							
							this.setRTLabelColor(this.__labelRepairOverall, allOffHP.toFixed(2));
							this.setRTLabelColor(this.__labelRepairInf, infHP.toFixed(2));
							this.setRTLabelColor(this.__labelRepairVehi, vehiHP.toFixed(2));
							this.setRTLabelColor(this.__labelRepairAir, airHP.toFixed(2));
							
							if (infRT === allOffRT && infHP < 100)
								this.__labelRepairInf.setTextColor("black");
							else if (vehiRT === allOffRT && vehiHP < 100)
								this.__labelRepairVehi.setTextColor("black");
							else if (airRT === allOffRT && airHP < 100)
								this.__labelRepairAir.setTextColor("black");
							
							var ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();

							var currRTStorage = Math.max(ownCity.GetResourceCount(8), ownCity.GetResourceCount(9), ownCity.GetResourceCount(10));
							this.__labelRepairStorage.setValue(phe.cnc.Util.getTimespanString(ClientLib.Data.MainData.GetInstance().get_Time().GetTimeSpan(currRTStorage)));
							
							if (currRTStorage > allOffRTInSeconds)
								this.__labelRepairStorage.setTextColor("darkgreen");
							else
								this.__labelRepairStorage.setTextColor("red");
                            
							//Calculates the possible resources gained from simulation
							this.calcResources(entities);
						}
						catch(e)
						{
							console.log("Error Getting Player Unit Damage");
							console.log(e.toString());
						}
					},
					
                    /**
                     * All credit for the main layout of this function goes to KRS_L. Thanks to Topper42 and Deyhak for talking about it in the forums!
                     */
					calcResources: function(entities)
					{
						try
						{
                            //So we can splice and reduce the amount of time looping later on
                            buildingEnts = entities;
                            defEnts = entities;
                            
							var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();
                            
                            //Pretty sure we just need the EResourceType
                            var lootArray = {1: 0, 2: 0, 3: 0, 6: 0}; //1: Tib, 2: Cry, 3: Gold(credits) 6: RP
							var lootArray2 = {1: 0, 2: 0, 3: 0, 6: 0}; 
							var mod = -1;
							var isFirstHarvester = false;
                            //Based on forums we need to cycle through the grid 
                            //Info needed is the building or structure information and the defensive units information
                            //Structure data can be retrieved by using get_City() and Defense data by get_DefenseSetup()
                            //See ClientLib.js.txt if you have it or can find it. These functions are under Type:ClientLib.Vis.VisMain
                            
                            //Let's do X coords as our outer loop there should be 0-8 or 9 slots.
                            for (var x = 0; x < 9; x++)
                            {
								
                                //Inner loop will be Y should be 8 slots or 0-7
                                for (var y = 0; y < 8; y++)
                                {
                                	var width =  ClientLib.Vis.VisMain.GetInstance().get_City().get_GridWidth();
                                	var height =  ClientLib.Vis.VisMain.GetInstance().get_City().get_GridHeight();
                                
                                	//Per the forums we should multiply x by the width and y by the height
                                    //Well GetObjectFromPosition doesn't work which is in the ClientLib.js.txt, but KRS_L has found the new function
                               		var cityEntity =  ClientLib.Vis.VisMain.GetInstance().get_City().GetCityObjectFromPosition(x * width, y * height);
                                    
                                    //Ok we have the city object or at least we hope we do. 
                                    //Forums says this can return empty fields so we need to check for that
                                    if (cityEntity != null && cityEntity.get_CityEntity() !== null)
                                    {
                                        //Now loop through the entities from the simulation until we find a match
                                        if (typeof entities != 'undefined')
                                        {
                                            for (var idx = 0; idx < buildingEnts.length; idx++)
                                            {
                                                var entity = buildingEnts[idx];
                                                var unit = ClientLib.Res.ResMain.GetInstance().GetUnit_Obj(entity.t);

                                                //We've got a match!
                                                if (unit.dn == cityEntity.get_BuildingName())
                                                {         											
													mHealth = Simulator.getInstance().GetUnitMaxHealth(entity.l, unit);
													mod = ((entity.sh  - entity.h) / 16) / mHealth;
													if (unit.dn == "Harvester") 
													{
														var mod2 = cityEntity.get_BuildingDetails().get_HitpointsPercent();
														if (Math.round(mod2 * 100) != Math.round(mod * 100))
														{
															mod = mod2;
														}
													}
                                                    var isSpliced = buildingEnts.splice(idx, 1);
                                                    break;
                                                }
                                                
                                            }
                                        } 
                                        
                                        var buildingDetails = cityEntity.get_BuildingDetails();
										
										if (mod == -1)
										{
											mod = buildingDetails.get_HitpointsPercent();
											if (cityEntity.get_BuildingName() == "Harvester") 
											{
												var mod2 = cityEntity.get_BuildingDetails().get_HitpointsPercent();
												if (Math.round(mod2 * 100) != Math.round(mod * 100))
												{
													mod = mod2;
												}
											}
										}
                                            
							
                                        var reqs = buildingDetails.get_UnitLevelRepairRequirements();
										
										for (var idx2 = 0; idx2 < reqs.length; idx2++)
										{
											var type = reqs[idx2].Type;
											var count = reqs[idx2].Count;
											lootArray[type] += Math.round((mod * count) - 0.5); //Rounding otherwise floating numbers
										}
                                        
                                        //reset mod
                                        mod = -1;
                                    }
                                    
                                    //Now do the same for defense units
                                    var defEntity = ClientLib.Vis.VisMain.GetInstance().get_DefenseSetup().GetDefenseObjectFromPosition(x * width, y * height);
                                    if (defEntity !== null && defEntity.get_CityEntity() !== null) 
                                    {
                                        if (typeof entities != 'undefined')
                                        {
                                            for (var idx = 0; idx < defEnts.length; idx++)
                                            {
                                                var entity = defEnts[idx];
                                                var unit = ClientLib.Res.ResMain.GetInstance().GetUnit_Obj(entity.t);
                                                
                                                //Got a match!
                                                if (unit.dn == defEntity.get_UnitName())
                                                {
                                                    mHealth = Simulator.getInstance().GetUnitMaxHealth(entity.l, unit);
													mod = ((entity.sh  - entity.h) / 16) / mHealth;
                                                    //mod = defEntity.get_UnitDetails().get_HitpointsPercent();
                                                    var isSpliced = defEnts.splice(idx, 1);
                                                    break;
                                                }
                                            }
                                        }
                                        
                                        
                                        var unitDetails = defEntity.get_UnitDetails();
										
										if (mod == -1)
                                            mod = unitDetails.get_HitpointsPercent();
											
                                        var reqs = unitDetails.get_UnitLevelRepairRequirements();
										
										for (var idx2 = 0; idx2 < reqs.length; idx2++)
										{
											var type = reqs[idx2].Type;
											var count = reqs[idx2].Count;
											lootArray[type] += Math.round((mod * count) - 0.5); //Rounding otherwise floating numbers
										}
                                        
                                        mod = -1;
                                    }
                                }
                            }
							
                            if (typeof entities == 'undefined')
                            {
                                var totalLoot = lootArray[1] + lootArray[2] + lootArray[3] + lootArray[6];
                            	this.__labelBattleLootTotal.setValue(Simulator.getInstance().formatNumbersCompact(totalLoot));
								this.__labelBattleLootTib.setValue(Simulator.getInstance().formatNumbersCompact(lootArray[1]));
								this.__labelBattleLootCry.setValue(Simulator.getInstance().formatNumbersCompact(lootArray[2]));
								this.__labelBattleLootCred.setValue(Simulator.getInstance().formatNumbersCompact(lootArray[3]));
								this.__labelBattleLootRP.setValue(Simulator.getInstance().formatNumbersCompact(lootArray[6]));
                            }
                            else
                            {
                                var totalLoot = lootArray[1] + lootArray[2] + lootArray[3] + lootArray[6];
								
								//If one has a "|", then they all have it.
								if (typeof localStorage['getDivider'] != 'undefined')
									var divider = localStorage['getDivider'];
								else
									var divider = "|";

                                var idxOf = this.__labelBattleLootTotal.getValue().indexOf(divider);
                                if ( idxOf != -1 )
                                {
                                    var subString = this.__labelBattleLootTotal.getValue().substring(idxOf - 1);
                                    this.__labelBattleLootTotal.setValue(Simulator.getInstance().formatNumbersCompact(totalLoot) + " " + subString);
									
									var subString = this.__labelBattleLootTib.getValue().substring(this.__labelBattleLootTib.getValue().indexOf(divider) - 1);
									this.__labelBattleLootTib.setValue(Simulator.getInstance().formatNumbersCompact(lootArray[1]) + " " + subString);
									
									var subString = this.__labelBattleLootCry.getValue().substring(this.__labelBattleLootCry.getValue().indexOf(divider) - 1);
									this.__labelBattleLootCry.setValue(Simulator.getInstance().formatNumbersCompact(lootArray[2]) + " " + subString);
									
									var subString = this.__labelBattleLootCred.getValue().substring(this.__labelBattleLootCred.getValue().indexOf(divider) - 1);
									this.__labelBattleLootCred.setValue(Simulator.getInstance().formatNumbersCompact(lootArray[3]) + " " + subString);
									
                                    var subString = this.__labelBattleLootRP.getValue().substring(this.__labelBattleLootRP.getValue().indexOf(divider) - 1);
									this.__labelBattleLootRP.setValue(Simulator.getInstance().formatNumbersCompact(lootArray[6]) + " " + subString);
                                }
                                else
                                {
                                    this.__labelBattleLootTotal.setValue(Simulator.getInstance().formatNumbersCompact(totalLoot) + " " + divider + " " + this.__labelBattleLootTotal.getValue());
									this.__labelBattleLootTib.setValue(Simulator.getInstance().formatNumbersCompact(lootArray[1]) + " " + divider + " " + this.__labelBattleLootTib.getValue());
									this.__labelBattleLootCry.setValue(Simulator.getInstance().formatNumbersCompact(lootArray[2]) + " " + divider + " " + this.__labelBattleLootCry.getValue());
									this.__labelBattleLootCred.setValue(Simulator.getInstance().formatNumbersCompact(lootArray[3]) + " " + divider + " " + this.__labelBattleLootCred.getValue());
									this.__labelBattleLootRP.setValue(Simulator.getInstance().formatNumbersCompact(lootArray[6]) + " " + divider + " " + this.__labelBattleLootRP.getValue());
                                }
                            }
						}
						catch(e)
						{
							console.log("Error Calculating Resources");
							console.log(e);
						}
							
					},
					
					setRTLabelColor: function(label, number)
					{
						if (number < 25)
							label.setTextColor("red");
						else if (number < 75)
							label.setTextColor("orangered");
						else
							label.setTextColor("darkgreen");
					},
					
					setEHLabelColor: function(label, number)
					{
						if (number < 25)
							label.setTextColor("darkgreen");
						else if (number < 75)
							label.setTextColor("orangered");
						else
							label.setTextColor("red");
					},
					
					disableSimulateStatButtonTimer: function(timer)
					{
						try
						{
							if ( timer >= 1000)
							{
								this.isSimStatButtonDisabled = true;
								simStatBtn.setLabel(Math.floor(timer/1000));
								timer -= 1000;
								setTimeout(function () {
									Simulator.StatWindow.getInstance().disableSimulateStatButtonTimer(timer);
								}, 1000)
							}
							else
							{
								setTimeout(function () {
									simStatBtn.setEnabled(true);
									simStatBtn.setLabel("Update");
								}, timer)
								this.isSimStatButtonDisabled = false;
							}
						}
						catch(e)
						{
							console.log("Error disabling simulator button");
							console.log(e.toString());
						}
					}
				}
			});
			
			qx.Class.define("Simulator.OptionWindow", 
			{
				type: "singleton",
				extend:	qx.ui.window.Window,
				
				construct: function()
				{
					this.base(arguments);
					this.setLayout(new qx.ui.layout.VBox(5));
					this.addListener("resize", function(){
						this.center();
					}, this);
					
					this.set({
						caption: "Simulator Options",
						width: 300,
						height: 300,
						allowMaximize: false,
						showMaximize: false,
						allowMinimize: false,
						showMinimize: false
					});
					var tabView = new qx.ui.tabview.TabView();
					tabView.set({height: 295, width: 295});
					var genPage = new qx.ui.tabview.Page("General");
					genLayout = new qx.ui.layout.VBox(5);
					genPage.setLayout(genLayout);
					
					
					//Add General Page Items
					var buttonsHeader = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
					buttonsHeader.setThemedFont("bold");
					var buttonsTitle = new qx.ui.basic.Label("Buttons:");
					buttonsHeader.add(buttonsTitle);
					genPage.add(buttonsHeader);
					
					var buttonsBox = new qx.ui.container.Composite(new qx.ui.layout.VBox(5));
					this._buttonLocCB = new qx.ui.form.CheckBox("Right Side");
					this._buttonSizeCB = new qx.ui.form.CheckBox("Normal Size");
					this._buttonLocCB.addListener("changeValue", this._onButtonLocChange, this);
					this._buttonSizeCB.addListener("changeValue", this._onButtonSizeChange, this);
					if (typeof localStorage['isBtnRight'] != 'undefined')
					{
						if (localStorage['isBtnRight'] == "yes")
							this._buttonLocCB.setValue(true);
						else
							this._buttonLocCB.setValue(false);
					}

					if (typeof localStorage['isBtnNorm'] != 'undefined')
					{
						if (localStorage['isBtnNorm'] == "yes")
							this._buttonSizeCB.setValue(true);
						else
							this._buttonSizeCB.setValue(false);
							
						//Need to do this
						this.setButtonSize();
					}
					
					
					
					this._disableRTBtnCB = new qx.ui.form.CheckBox("Disable Repair Button");
					this._disableRTBtnCB.addListener("changeValue", this._onDisableRTBtnChange, this);
					if (typeof localStorage['isRTBtnDisabled'] != 'undefined')
					{
						if (localStorage['isRTBtnDisabled'] == "yes")
							this._disableRTBtnCB.setValue(true);
						else
							this._disableRTBtnCB.setValue(false);
					}
					
					this._disableCmtBtnCB = new qx.ui.form.CheckBox("Disable Combat Button");
					this._disableCmtBtnCB.addListener("changeValue", this._onDisableCmtBtnChange, this);
					if (typeof localStorage['isCmtBtnDisabled'] != 'undefined')
					{
						if (localStorage['isCmtBtnDisabled'] == "yes")
							this._disableCmtBtnCB.setValue(true);
						else
							this._disableCmtBtnCB.setValue(false);
					}
					
					buttonsBox.add(this._buttonSizeCB);
					buttonsBox.add(this._buttonLocCB);
					buttonsBox.add(this._disableRTBtnCB);
					buttonsBox.add(this._disableCmtBtnCB);
					genPage.add(buttonsBox);
					
					var simulatorHeader = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)).set({marginTop: 10});
					simulatorHeader.setThemedFont("bold");
					var simulatorTitle = new qx.ui.basic.Label("Simulator:");
					simulatorHeader.add(simulatorTitle);
					genPage.add(simulatorHeader);
					
					var simulatorBox = new qx.ui.container.Composite(new qx.ui.layout.VBox(5));
					this._autoSimulateCB = new qx.ui.form.CheckBox("Auto Start Simulation");
					
					if (typeof localStorage['autoSimulate'] != 'undefined')
					{
						if (localStorage['autoSimulate'] == "yes")
							this._autoSimulateCB.setValue(true);
					}
					
					var simulatorBox2 = new qx.ui.container.Composite(new qx.ui.layout.Grid(5)).set({marginLeft: 20});
					var simSpeedOpt1 = new qx.ui.form.RadioButton("x1");
					var simSpeedOpt2 = new qx.ui.form.RadioButton("x2");
					var simSpeedOpt4 = new qx.ui.form.RadioButton("x4");
					this._simSpeedGroup = new qx.ui.form.RadioGroup(simSpeedOpt1, simSpeedOpt2, simSpeedOpt4);
					this._simSpeedGroup.addListener("changeSelection", this._onSimSpeedChange, this);
					this._autoSimulateCB.addListener("changeValue", this._onAutoSimulateChange, this);
					if (typeof localStorage['simulateSpeed'] != 'undefined')
					{
						var options = this._simSpeedGroup.getSelectables(false);
						
						if (localStorage['simulateSpeed'] == "2")
							options[1].setValue(true);
						else if (localStorage['simulateSpeed'] == "4")
							options[2].setValue(true);
						else
							options[0].setValue(true);
					}
					if (this._autoSimulateCB.getValue() == false) { this._simSpeedGroup.setEnabled(false); }
					
					simulatorBox2.add(simSpeedOpt1, {row:0, column: 0});
					simulatorBox2.add(simSpeedOpt2, {row:0, column: 1});
					simulatorBox2.add(simSpeedOpt4, {row:0, column: 2});
					simulatorBox.add(this._autoSimulateCB);
					simulatorBox.add(simulatorBox2);
					genPage.add(simulatorBox);
					
					var statsPage = new qx.ui.tabview.Page("Stats");
					statsLayout = new qx.ui.layout.VBox(5);
					statsPage.setLayout(statsLayout);
					
					var statWindowHeader = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
					statWindowHeader.setThemedFont("bold");
					var statWindowTitle = new qx.ui.basic.Label("Stat Window:");
					statWindowHeader.add(statWindowTitle);
					statsPage.add(statWindowHeader);
					
					var statWindowBox = new qx.ui.container.Composite(new qx.ui.layout.VBox(5));
					this._autoOpenCB = new qx.ui.form.CheckBox("Auto Open");
					this._autoOpenCB.addListener("changeValue", this._onAutoOpenStatsChange, this);
					if (typeof localStorage['autoOpenStat'] != 'undefined')
					{
						if (localStorage['autoOpenStat'] == "yes")
							this._autoOpenCB.setValue(true);
						else	
							this._autoOpenCB.setValue(false);
					}
					
					statWindowBox.add(this._autoOpenCB);
					statsPage.add(statWindowBox);
					
					var repairSecHeader = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)).set({marginTop: 10});
					repairSecHeader.setThemedFont("bold");
					var repairSecTitle = new qx.ui.basic.Label("Repair Time Display:");
					repairSecHeader.add(repairSecTitle);
					statsPage.add(repairSecHeader);
					
					var repairSecBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
					var repairDisplayOpt1 = new qx.ui.form.RadioButton("C/RT");
					var repairDisplayOpt2 = new qx.ui.form.RadioButton("HP/RT");
					var repairDisplayOpt3 = new qx.ui.form.RadioButton("RT Only");
					this._repairSecGroup = new qx.ui.form.RadioGroup(repairDisplayOpt1, repairDisplayOpt2, repairDisplayOpt3);
					this._repairSecGroup.addListener("changeSelection", this._onRepairSelectionChange, this);
					if (typeof localStorage['getRTSelection'] != 'undefined')
					{
						var options = this._repairSecGroup.getSelectables(false);

						if (localStorage['getRTSelection'] == "hprt")
							options[1].setValue(true);
						else if (localStorage['getRTSelection'] == "rt")
							options[2].setValue(true);
						else
							options[0].setValue(true);
					}
					repairSecBox.add(repairDisplayOpt1);
					repairSecBox.add(repairDisplayOpt2);
					repairSecBox.add(repairDisplayOpt3);
					statsPage.add(repairSecBox);
					
					var dividerHeader = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)).set({marginTop: 10});
					dividerHeader.setThemedFont("bold");
					var dividerTitle = new qx.ui.basic.Label("Divider:");
					dividerHeader.add(dividerTitle);
					statsPage.add(dividerHeader);
					
					var dividerBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(10));
					var dividerOpt1 = new qx.ui.form.RadioButton("|");
					var dividerOpt2 = new qx.ui.form.RadioButton("/");
					this._dividerGroup = new qx.ui.form.RadioGroup(dividerOpt1, dividerOpt2);
					this._dividerGroup.addListener("changeSelection", this._onDividerChange, this);
					if (typeof localStorage['getDivider'] != 'undefined')
					{
						var options = this._dividerGroup.getSelectables(false);

						if (localStorage['getDivider'] == "/")
							options[1].setValue(true);
						else
							options[0].setValue(true);
					}
					dividerBox.add(dividerOpt1);
					dividerBox.add(dividerOpt2);
					statsPage.add(dividerBox);
					
					var hideSecHeader = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)).set({marginTop: 10});
					hideSecHeader.setThemedFont("bold");
					var hideSecTitle = new qx.ui.basic.Label("Hide Sections (on Startup):");
					hideSecHeader.add(hideSecTitle);
					statsPage.add(hideSecHeader);
					
					var hideSecBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(10));
					this._hideHealthCB = new qx.ui.form.CheckBox("Health");
					this._hideRepairCB = new qx.ui.form.CheckBox("Repair");
					this._hideMiscCB = new qx.ui.form.CheckBox("Misc");
					this._hideLootCB = new qx.ui.form.CheckBox("Loot");
					this._hideHealthCB.addListener("changeValue", this._onHideEHChange, this);
					this._hideRepairCB.addListener("changeValue", this._onHideRTChange, this);
					this._hideMiscCB.addListener("changeValue", this._onHideMiscChange, this);
					this._hideLootCB.addListener("changeValue", this._onHideLootChange, this);
					if (typeof localStorage['hideHealth'] != 'undefined')
					{
						if (localStorage['hideHealth'] == "yes")
							this._hideHealthCB.setValue(true);
						else	
							this._hideHealthCB.setValue(false);
					}
					if (typeof localStorage['hideRepair'] != 'undefined')
					{
						if (localStorage['hideRepair'] == "yes")
							this._hideRepairCB.setValue(true);
						else	
							this._hideRepairCB.setValue(false);
					}
					if (typeof localStorage['hideMisc'] != 'undefined')
					{
						if (localStorage['hideMisc'] == "yes")
							this._hideMiscCB.setValue(true);
						else	
							this._hideMiscCB.setValue(false);
					}
					if (typeof localStorage['hideLoot'] != 'undefined')
					{
						if (localStorage['hideLoot'] == "yes")
							this._hideLootCB.setValue(true);
						else	
							this._hideLootCB.setValue(false);
					}
					hideSecBox.add(this._hideHealthCB);
					hideSecBox.add(this._hideRepairCB);
					hideSecBox.add(this._hideMiscCB);
					hideSecBox.add(this._hideLootCB);
					statsPage.add(hideSecBox);
					
					var statPosHeader = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)).set({marginTop: 10});
					//statPosHeader.setThemedFont("bold");
					var statPosTitle = new qx.ui.basic.Label("Set Stat Window Position:").set({alignY: "middle"});
					statPosTitle.setFont("bold");
					var statPosBtn = new qx.ui.form.Button("Set").set({allowGrowX: false, allowGrowY: false, height: 20});
					statPosBtn.addListener("click", this._onSetStatWindowPositionChange, this);
					statPosHeader.add(statPosTitle);
					statPosHeader.add(statPosBtn);
					statsPage.add(statPosHeader);
					
					tabView.add(genPage);
					tabView.add(statsPage);
					this.add(tabView);
				},
				
				destruct: function()
				{
				},
				
				members:
				{	
					_buttonSizeCB: null,
					_buttonLocCB: null,
					_disableRTBtnCB: null,
					_disableCmtBtnCB: null,
					_autoOpenCB: null,
					_autoSimulateCB: null,
					_simSpeedGroup: null,
					_repairSecGroup: null,
					_dividerGroup: null,
					_hideHealthCB: null,
					_hideRepairCB: null,
					_hideMiscCB: null,
					_hideLootCB: null,
					
					_onButtonSizeChange: function()
					{
						try
						{
							value = this._buttonSizeCB.getValue();
							
							if (value == true)
								localStorage['isBtnNorm'] = "yes";
							else	
								localStorage['isBtnNorm'] = "no";
								
							this.setButtonSize();	
						}
						catch(e)
						{
							console.log("Error Button Size Change: " + e.toString());
						}
					},
					
					_onButtonLocChange: function()
					{
						try
						{
							value = this._buttonLocCB.getValue();
								
							if (value == true)
								localStorage['isBtnRight'] = "yes";
							else	
								localStorage['isBtnRight'] = "no";
								
							this.setButtonLoc();	
						}
						catch(e)
						{
							console.log("Error Button Location Change: " + e.toString());
						}
					},
					
					_onDisableRTBtnChange: function()
					{
						try
						{
							value = this._disableRTBtnCB.getValue();
								
							if (value == true)
								localStorage['isRTBtnDisabled'] = "yes";
							else						
								localStorage['isRTBtnDisabled'] = "no";
								
							this.setRTBtn(value);	
						}
						catch(e)
						{
							console.log("Error Disable RT Button Change: " + e.toString());
						}
					},
					
					_onDisableCmtBtnChange: function()
					{
						try
						{
							value = this._disableCmtBtnCB.getValue();
								
							if (value == true)
								localStorage['isCmtBtnDisabled'] = "yes";
							else	
								localStorage['isCmtBtnDisabled'] = "no";
								
							this.setCmtBtn(value);	
						}
						catch(e)
						{
							console.log("Error Disable Cmt Button Change: " + e.toString());
						}
					},
					
					_onRepairSelectionChange: function(selection)
					{
						try
						{
							var option = selection.getData()[0];
							var label = option.getLabel();
							
							if (label == "C/RT")
								localStorage['getRTSelection'] = "crt";
							else if (label == "HP/RT")
								localStorage['getRTSelection'] = "hprt";
							else
								localStorage['getRTSelection'] = "rt";
						} 
						catch(e)
						{
							console.log("Error Repair Section Selection Change: " + e.toString());
						}
					},
					
					_onAutoOpenStatsChange: function()
					{
						try
						{
							var value = this._autoOpenCB.getValue();

							if (value == false)
								localStorage['autoOpenStat'] = "no";
							else
								localStorage['autoOpenStat'] = "yes";
						}
						catch(e)
						{
							console.log("Error Auto Open Stats Change: " + e.toString());
						}
					},
					
					_onAutoSimulateChange: function()
					{
						try
						{
							var value = this._autoSimulateCB.getValue();
							if (value == false)
							{
								this._simSpeedGroup.setEnabled(false);
								localStorage['autoSimulate'] = "no";
							}
							else
							{
								this._simSpeedGroup.setEnabled(true);
								localStorage['autoSimulate'] = "yes";
							}
						}
						catch(e)
						{
							console.log("Error Auto Simulate Change: " + e.toString());
						}
					},
					
					_onSimSpeedChange: function(selection)
					{
						try
						{
							var option = selection.getData()[0];
							var label = option.getLabel();
							
							if (label == "x1")
								localStorage['simulateSpeed'] = "1";
							else if (label == "x2")
								localStorage['simulateSpeed'] = "2";
							else
								localStorage['simulateSpeed'] = "4";
						}
						catch(e)
						{
							console.log("Error Sim Speed Change: " + e.toString());
						}
					},
					
					_onDividerChange: function(selection)
					{
						try
						{
							var option = selection.getData()[0];
							var label = option.getLabel();
						
							if (label == "/")
								localStorage['getDivider'] = "/";
							else
								localStorage['getDivider'] = "|";
							
							//Go ahead and recalculate loot so there is no issues
							Simulator.StatWindow.getInstance().calcResources();
						}
						catch(e)
						{
							console.log("Error Divider Change: " + e.toString());
						}
					},
					
					_onHideEHChange: function()
					{
						try
						{
							value = this._hideHealthCB.getValue();
								
							if (value == true)
								localStorage['hideHealth'] = "yes";
							else	
								localStorage['hideHealth'] = "no";
									
						}
						catch(e)
						{
							console.log("Error Hide Enemy Base Health Change: " + e.toString());
						}
					},
					
					_onHideRTChange: function()
					{
						try
						{
							value = this._hideRepairCB.getValue();
								
							if (value == true)
								localStorage['hideRepair'] = "yes";
							else	
								localStorage['hideRepair'] = "no";
									
						}
						catch(e)
						{
							console.log("Error Hide Repair Times Change: " + e.toString());
						}
					},
					
					_onHideMiscChange: function()
					{
						try
						{
							value = this._hideMiscCB.getValue();
								
							if (value == true)
								localStorage['hideMisc'] = "yes";
							else	
								localStorage['hideMisc'] = "no";
									
						}
						catch(e)
						{
							console.log("Error Hide Misc Change: " + e.toString());
						}
					},
					
					_onHideLootChange: function()
					{
						try
						{
							value = this._hideLootCB.getValue();
								
							if (value == true)
								localStorage['hideLoot'] = "yes";
							else	
								localStorage['hideLoot'] = "no";
									
						}
						catch(e)
						{
							console.log("Error Hide Loot Change: " + e.toString());
						}
					},
					
					_onSetStatWindowPositionChange: function()
					{
						try
						{
							var props = Simulator.StatWindow.getInstance().getLayoutProperties();
							localStorage['statWindowPosLeft'] = props["left"];
							localStorage['statWindowPosTop'] = props["top"];
						}
						catch(e)
						{
							console.log("Error Stat Window Position Change: " + e.toString());
						}
					},
					
					setRTBtn: function(value)
					{
						if (value == true)
							unlockRTBtn.hide();
						else
							unlockRTBtn.show();
					},
					
					setCmtBtn: function(value)
					{
						if (value == true)
							unlockCmtBtn.hide();
						else
							unlockCmtBtn.show();
					},
					
					setButtonLoc: function()
					{
						try
						{
							value = this._buttonLocCB.getValue();
							size = this._buttonSizeCB.getValue();

							if (value == true) //Right
							{
								var pLeft = null;
								if (size == true) //Right Normal
									var pRight = 58;
								else //Right Small
									var pRight = 70;
								
								armyBar.add(simBtn,{left: pLeft, right: pRight, bottom: 119});
								armyBar.add(statBtn,{left: pLeft, right: pRight, bottom: 81});
								armyBar.add(optionBtn,{left: pLeft, right: pRight, bottom: 43});
								armyBar.add(layoutBtn,{left: pLeft, right: pRight, bottom: 5});	

								playArea.add(shiftUpBtn,{left: pLeft, right: 70, bottom: 110});
								playArea.add(shiftDownBtn,{left: pLeft, right: 70, bottom: 70});
								playArea.add(shiftLeftBtn,{left: pLeft, right: 90, bottom: 90});
								playArea.add(shiftRightBtn,{left: pLeft, right: 50, bottom: 90});
								playArea.add(disableAllUnitsBtn,{left: pLeft, right: 6, bottom: 120});
								playArea.add(mirrorBtn,{left: pLeft, right: 6, bottom: 160});
								playArea.add(armyUndoBtn,{left: pLeft, right: 6, bottom: 200});	
								playArea.add(quickSaveBtn, {left: pLeft, right: 6, bottom: 240});
							}
							else //Left
							{
								var pRight = null;
								if (size == true) //Left Normal
									var pLeft = 13;
								else	
									var pLeft = 83;
									
								armyBar.add(simBtn,{left: pLeft, right: pRight, bottom: 120});
								armyBar.add(statBtn,{left: pLeft, right: pRight, bottom: 82});
								armyBar.add(optionBtn,{left: pLeft, right: pRight, bottom: 44});
								armyBar.add(layoutBtn,{left: pLeft, right: pRight, bottom: 6});
								
								playArea.add(shiftUpBtn,{left: 80, right: pRight, bottom: 110});
								playArea.add(shiftDownBtn,{left: 80, right: pRight, bottom: 70});
								playArea.add(shiftLeftBtn,{left: 60, right: pRight, bottom: 90});
								playArea.add(shiftRightBtn,{left: 100, right: pRight, bottom: 90});
								playArea.add(disableAllUnitsBtn,{left: 6, right: pRight, bottom: 120});
								playArea.add(mirrorBtn,{left: 6, right: pRight, bottom: 160});
								playArea.add(armyUndoBtn,{left: 6, right: pRight, bottom: 200});
								playArea.add(quickSaveBtn, {left: 6, right: pRight, bottom: 240});
							}
						}
						catch(e)
						{
							console.log("Error Setting Button Location: " + e.toString());
						}
					},
					
					setButtonSize: function()
					{
						try
						{
							value = this._buttonSizeCB.getValue();
							
							if (value == true)
							{
								simBtn.setLabel("Simulate");
								simBtn.setWidth(60);
								
								statBtn.setLabel("Stats");
								statBtn.setWidth(60);
								
								optionBtn.setLabel("Options");
								optionBtn.setWidth(60);
								
								layoutBtn.setLabel("Layout");
								layoutBtn.setWidth(60);
							}
							else
							{
								simBtn.setLabel("S");
								simBtn.setWidth(30);
								
								statBtn.setLabel("I");
								statBtn.setWidth(30);
								
								optionBtn.setLabel("O");
								optionBtn.setWidth(30);
								
								layoutBtn.setLabel("L");
								layoutBtn.setWidth(30);
							}
							
							this.setButtonLoc();							
						}
						catch(e)
						{
							console.log("Error Setting Button Size: " + e.toString());
						}
					}
				}
			});
			
			qx.Class.define("Simulator.LayoutWindow", 
			{
				type: "singleton",
				extend: webfrontend.gui.CustomWindow,
				
				construct: function()
				{
					this.base(arguments);
					this.setLayout(new qx.ui.layout.VBox());
					
					this.set({
						width: 200,
						caption: "Simulator Layouts",
						padding: 2,
						allowMaximize: false,
						showMaximize: false,
						allowMinimize: false,
						showMinimize: false
					});
					
					var layoutListHeader = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({ decorator: "pane-light-opaque"});
					var layoutListTitle = new qx.ui.basic.Label("Formation Saver").set({ alignX: "center", alignY: "top", font: "font_size_14_bold"});
					layoutListHeader.add(layoutListTitle);
					this.add(layoutListHeader);
					
					this.layoutList = new qx.ui.form.List();
					this.layoutList.set(
					{
							selectionMode : "one",
							height: 100,
							width: 150,
							margin: 5
					});
					this.add(this.layoutList);
					
					var listButtonBox = new qx.ui.container.Composite();
					var listButtonLayout = new qx.ui.layout.HBox(5, "center");
					listButtonBox.setLayout(listButtonLayout);
					var loadButton = new qx.ui.form.Button("Load");
					var deleteButton = new qx.ui.form.Button("Delete");
					loadButton.set({ height: 15, width: 70, alignX: "center" });
					loadButton.addListener("click", this.loadLayout, this);
					deleteButton.set({ height: 15, width: 70, alignX: "center" });
					deleteButton.addListener("click", this.deleteLayout, this);
					listButtonBox.add(loadButton);
					listButtonBox.add(deleteButton);
					this.add(listButtonBox);
					
					var saveLayoutBox = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({spacing: 10})).set({marginTop: 20, marginLeft: 5});
					this.layoutTextBox = new qx.ui.form.TextField("").set({width: 75, maxLength: 15});
					var saveButton = new qx.ui.form.Button("Save");
					saveButton.set({ height: 10, width: 70, alignX: "center" });
					saveButton.addListener("click", this.saveNewLayout, this);
					saveLayoutBox.add(this.layoutTextBox);
					saveLayoutBox.add(saveButton);
					this.add(saveLayoutBox);
					
					var checkBox = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({spacing: 10})).set({marginTop: 10, marginLeft: 5});
					this.persistentCheck = new qx.ui.form.CheckBox("Make Persistent");
					this.persistentCheck.setTextColor("white");
					this.persistentCheck.setFont("bold");
					this.persistentCheck.setToolTipText("If checked, formation will be saved and can be used by this city in any other city");
					checkBox.add(this.persistentCheck);
					this.add(checkBox);
					
					var noticeBox = new qx.ui.container.Composite(new qx.ui.layout.HBox()).set({marginTop: 5, marginLeft: 5});
					var noticeText = new qx.ui.basic.Label("").set({ alignX: "center", alignY: "top"});
					noticeText.setValue("<p align=\'justify\'><b>If formation does not change on load, try moving one unit first, then try again.</b></p>"); 
					noticeText.set({rich: true, wrap: true, width: 165, textColor: "white"});
					noticeBox.add(noticeText);
					this.add(noticeBox);
					
					var clearAllLayoutsBox = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({alignX: "center", marginTop: 5, marginLeft: 5, allowGrowX: false});
					var clearAllLayoutsBtn = new qx.ui.form.Button("Clear All").set({alignX: "center", width: 70});
					clearAllLayoutsBtn.addListener("click", this.clearAllLayouts, this);
					clearAllLayoutsBox.add(clearAllLayoutsBtn);
					this.add(clearAllLayoutsBox);
					
					this.layoutsArray = new Array();				
				},
				
				destruct: function()
				{
				},
				
				members:
				{
					layoutList: null,
					layoutTextBox: null,
					layoutsArray: null,
					persistentCheck: null,
					
					saveNewLayout: function(isQS)
					{		
						try
						{
						
							console.log("Saving Layout");
							//if (this.layoutTextBox.getValue() == "" && typeof isQS == 'undefined')
							//{
							//	alert("Need to apply a name to the layout");
							//	return;
							//}
							
							if ((typeof isQS != 'undefined' && isQS == true) || this.layoutTextBox.getValue() == "")
							{
								var date = new Date();
								var day = date.getDate();
								var month = date.getMonth() + 1;
								var hour = (date.getHours() < 10) ? "0" + date.getHours() : date.getHours();
								var minute = (date.getMinutes() < 10) ? "0" + date.getMinutes() : date.getMinutes();
								var second = (date.getSeconds() < 10) ? "0" + date.getSeconds() : date.getSeconds();
								var label = month + "/" + day + "@" + hour + ":" + minute + ":" + second;
							}
							else
							{
								var label = this.layoutTextBox.getValue();
							}
							
							var cityID = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId();
							var ownCityID = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCityId();
							var model = ownCityID + "." + cityID + "." + label;
							
							var children = this.layoutList.getChildren();
							//Check for same layout name if so do NOT save
							for (var item = 0; item < children.length; item++)
							{
								thisItem = children[item].getModel();
								if (thisItem == model)
								{
									alert("Save Failed: Duplicate Name");
									return;
								}
							}
							var units = Simulator.getInstance().getCityPreArmyUnits().get_ArmyUnits().l;
							units = this.prepareLayout(units);
							
							var layoutInformation = {};
							if (this.persistentCheck.getValue() == true)
							{
								layoutInformation = { id: model, label: label, formation: units, pers: "yes", };
							}
							else
							{
								layoutInformation = { id: model, label: label, formation: units, pers: "no", };
							}	
							this.layoutsArray.push(layoutInformation);
							this.layoutList.add(new qx.ui.form.ListItem(layoutInformation.label, null, layoutInformation.id));
							this.layoutTextBox.setValue("");
							quickSaveBtn.setLabel("✔");
							(function(quickSaveBtn) {
								setTimeout(function()
								{
									quickSaveBtn.setLabel("QS");
								}, 2000);
							}(quickSaveBtn));
							this.updateStorage();
						}
						catch(e)
						{
							console.log("Error Saving Layout");
							console.log(e);
						}
					},
					
					loadLayout: function()
					{
						try
						{
							console.log("Loading Layout");
							var ownCityID = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCityId();

							var layout = this.layoutList.getSelection()[0].getModel();
							for( var item in this.layoutsArray)
							{
								var thisLayout = this.layoutsArray[item].id;	
								
								if (thisLayout == layout)
								{
									Simulator.getInstance().restoreFormation(this.layoutsArray[item].formation);
									break;
								}
							}
						}
						catch(e)
						{
							console.log("Error Loading Layout");
							console.log(e);
						}
					},
					
					deleteLayout: function()
					{				
						try
						{
							console.log("Deleting Layout");
							//Remove from our array too
							var rUSure = confirm('Are you sure you want to delete this layout?');
							if(!rUSure)
							{
								return;
							}
							for (var item in this.layoutsArray)
							{
								if (this.layoutsArray[item].id == this.layoutList.getSelection()[0].getModel())
								{
									var isRemoved = this.layoutsArray.splice(item, 1);
									this.updateStorage();
								}
							}
							
							//The update will remove all and repopulate so no need to delete individual ones.
							this.updateLayoutList();
						}
						catch(e)
						{
							console.log("Error Deleting Layout");
							console.log(e);
						}
					},
					
					updateStorage: function()
					{
						try
						{
							console.log("Updating Storage");
							localStorage['savedFormations'] = JSON.stringify(this.layoutsArray);
						}
						catch(e)
						{
							console.log("Error updating localStorage");
							console.log(e);
						}
					},
					
					updateLayoutList: function()
					{
						try
						{
							console.log("Updating Layout List");
							var savedLayouts = localStorage['savedFormations'];
							if (typeof savedLayouts != 'undefined')
							{
								this.layoutsArray = JSON.parse(savedLayouts);
							}
							this.layoutList.removeAll(); //Clear List
							var cityID = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId();
							var ownCityID = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCityId();
							var model = ownCityID + "." + cityID;
							
							for (var item in this.layoutsArray)
							{
								var itemLabel = this.layoutsArray[item].label;
								var itemModel = model + "." + itemLabel;
								var pers = this.layoutsArray[item].pers;
								var match = this.layoutsArray[item].id.match(ownCityID.toString());

								if (itemModel == this.layoutsArray[item].id || ((typeof pers != 'undefined' && pers == "yes") && match != null))//Match!
								{
									this.layoutList.add(new qx.ui.form.ListItem(itemLabel, null, this.layoutsArray[item].id));
								}
							}
						}
						catch(e)
						{
							console.log("Error Updating Layout List");
							console.log(e);
						}
					},
					
					//Function from C&C Tiberium Alliances Combat Simulator script. Works well and does exactly what I need! 
					//For authors see: http://userscripts.org/scripts/show/145717
					prepareLayout: function (units) 
					{
						try
						{
							console.log("Preparing Layout for Saving");
							saved_units = [];
							for (var i = 0; i < units.length; i++) 
							{
								var unit = units[i];
								var armyUnit = {};
								armyUnit.x = unit.get_CoordX();
								armyUnit.y = unit.get_CoordY();
								armyUnit.id = unit.get_Id();
								armyUnit.enabled = unit.get_Enabled();
								saved_units.push(armyUnit);
							}
							return saved_units;
						}
						catch(e)
						{
							console.log("Error Preparing Unit Layout");
							console.log(e);
						}
					},
					
					clearAllLayouts: function()
					{
						try
						{
							console.log("Clearing All Layouts");
							var rUSure = confirm("Clicking OK will delete all of your saved layouts from every base!");
							
							if (rUSure)
							{
								localStorage.removeItem('savedFormations');
								this.layoutsArray = new Array();
								alert("All saved layouts have been deleted.");
								
								this.updateLayoutList();
							}
							else
							{
								alert("No layouts were deleted.");
							}
						}
						catch(e)
						{
							console.log("Error Clearing All Layouts");
							console.log(e);
						}
					}
				}
			});
		}
		
		function onViewChanged(oldMode, newMode)
		{
			setTimeout(function() 
			{
				try
				{
					console.log("View Changed");
					Simulator.OptionWindow.getInstance().close();
					Simulator.LayoutWindow.getInstance().close();
					if (newMode != ClientLib.Vis.Mode.CombatSetup && newMode != ClientLib.Vis.Mode.Battleground)
					{
						Simulator.StatWindow.getInstance().close();
						//Also reset temp formation array
						Simulator.getInstance().armyTempFormations = new Array();
						Simulator.getInstance().armyTempIdx = 0;
						armyUndoBtn.setEnabled(false);
						Simulator.getInstance().isSimulation = false;
					}
					else if (newMode == ClientLib.Vis.Mode.CombatSetup)
					{						
						var autoStatOpen = localStorage['autoOpenStat'];
						if (typeof autoStatOpen != 'undefined')
						{
							if (autoStatOpen == "yes")
							{
								//Why not auto-open the Stat window? Sounds like a good idea
								Simulator.StatWindow.getInstance().open();
							}
						}
						else
						{
							Simulator.StatWindow.getInstance().open();
						}
						
						if (Simulator.getInstance().isSimulation == false)
							setTimeout(function() { Simulator.StatWindow.getInstance().calcResources(); }, 2000);
						else
							Simulator.getInstance().isSimulation = false;
						
						if (oldMode != ClientLib.Vis.Mode.Battleground)
							Simulator.getInstance().saveTempFormation(); //Save the very first formation upon entering base.
					}
					
					if (ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity() != null)
					{
						var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity().get_Name();
						var ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity().get_Name();
						//Don't want shift formation buttons showing up during combat or in own player's cities
						if (newMode == ClientLib.Vis.Mode.Battleground || city == ownCity)
						{
							shiftUpBtn.hide();
							shiftDownBtn.hide();
							shiftLeftBtn.hide();
							shiftRightBtn.hide();
							disableAllUnitsBtn.hide();
							mirrorBtn.hide();
							armyUndoBtn.hide();
							quickSaveBtn.hide();
						}
						else if (city != ownCity) 
						{
							shiftUpBtn.show();
							shiftDownBtn.show();
							shiftLeftBtn.show();
							shiftRightBtn.show();
							disableAllUnitsBtn.show();
							mirrorBtn.show();
							armyUndoBtn.show();
							quickSaveBtn.show();
						}
					}
				}
				catch(e)
				{
					console.log("Error closing windows or hiding buttons on view change");
					console.log(e.toString());
				}
			}, 500);
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
							createClasses();
							
							console.log("Creating phe.cnc function wraps");
							
							//Current Server patch (World 52 - US East Coast) uses phe
							if (typeof phe.cnc.Util.attachNetEvent == 'undefined')
								Simulator.getInstance().attachNetEvent = webfrontend.gui.Util.attachNetEvent;
							else
								Simulator.getInstance().attachNetEvent = phe.cnc.Util.attachNetEvent;
                        
							//Current Server patch (World 52 - US East Coast) uses webfrontend
							if (typeof phe.cnc.gui.util == 'undefined')
								Simulator.getInstance().formatNumbersCompact = webfrontend.gui.Util.formatNumbersCompact;    
							else
								Simulator.getInstance().formatNumbersCompact = phe.cnc.gui.util.Numbers.formatNumbersCompact;   
							
							// Strange Hacks - provided by Topper42
							// don't try this at home ;)
							if (typeof ClientLib.API.Util.GetUnitMaxHealth == 'undefined')
								for (var key in ClientLib.Base.Util)
								{
									console.log("LOOPING");
									var strFunction = ClientLib.Base.Util[key].toString();
									console.log(strFunction + " HELLO");

									if ( strFunction.indexOf("*=1.1") > -1 || strFunction.indexOf("*= 1.1") > -1)
									{
										console.log("IN HERE!");
											Simulator.getInstance().GetUnitMaxHealth = ClientLib.Base.Util[key];
											break;
									}
								}
							else
								Simulator.getInstance().GetUnitMaxHealth = ClientLib.API.Util.GetUnitMaxHealth;    
								
							Simulator.getInstance();
							Simulator.StatWindow.getInstance();
							Simulator.OptionWindow.getInstance();
							Simulator.LayoutWindow.getInstance();
							Simulator.getInstance().attachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "ViewModeChange", ClientLib.Vis.ViewModeChange, this , onViewChanged);
						}
						catch(e)
						{
							console.log("Simulator initialization error:");
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