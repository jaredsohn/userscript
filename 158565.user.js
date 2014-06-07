// ==UserScript==
// @name        C&C Tiberium Alliances CustomFlunik Tools: AutoUpgrade
// @namespace   CustomFlunikAutoUpgrade
// @description Only uses the AutoUpgrade Feature For C&C Tiberium Alliances
// @include     http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @author      RobertT Flunik dbendure KRS_L
// @version     20130415a
// ==/UserScript==

/*
NOTE: If conditions match for items 7-15 then script will wait until there is enough resources to perform the upgrade 
	unless tiberium exceeds 80%. When tiberium exceeds 80% it will check the conditions in order until an upgrade is found.

NOTE: Calculations in #16 can be overridden by changing city name. 
	If name contains a dash "-" priority is cash.
	If name contains a period "." priority is power. 

NOTE: Cities may be blocked of all upgrades by including an "_" in their name.
	Selective blocking can be done using "_D", "_O" or "_B".
	A "_D" blocks defence upgrades.
	A "_O" blocks offence upgrades.
	A "_B" blocks building upgrades.
	You may combine them for example "Alpha_D_B" would upgrade only offence units.

Script does this (in this order): 
1. Upgrade lowest level offence unit if possible 
2. Upgrade lowest level defence unit if possible 
3. Gather information about your base 
4. Upgrade any production buildings < level 6
5. if crystal is more than 80% full and your offence is maxed out try to upgrade CC 
6. if #4 is true but you cant upgrade your CC (or you dont have one) and defence is maxed out try to upgrade DHQ 
7. if your CY < level 25 upgrade CY 
8. if City Repair time is > 11:45 hours upgrade the CY 
9. if your offence is maxed out upgrade CC 
10. if your DHQ is two levels below CC and defence is maxed upgrade DHQ 
11. if you have no CC and defence is maxed upgrade DHQ 
12. if DF < DHQ upgrade DF 
13. if Defensive support building < DHQ then upgrade support 
14. if repair time > 5:50 hours upgrade repair structure 
15. if repair time > 4 hours and repair structure level < CC and base level < 20 upgrade repair structure 
16. if lowest building level is below 0.66*base level and we have at least 20% tiberium upgrade lowest building
17. if lowest silo is below base level and we have at least 80% tiberium upgrade lowest silo
18. Priority calculations are made depending upon buildings existing. Lowest cost of those calculations is built if tiberium > 20%.
	A. If harvesters exist priority calculations are done for Crystal and Tiberium
	B. If #PP > #REF then base is power base and priority calculation is done for power
	C. If #PP < #REF then base is cash base and priority calculation is done for cash
19. if tiberium is > 95% and nothing was upgraded above then upgrade lowest level Silo/Harvester/Refinery/Power Plant/Accumulator


NEW feature - upgrade based on maelstrom tools upgrade priority overview 
Auto detection of base build for power (attack) or cash to determine which overview to use. 
   
Original Flunik tools would upgrade buildings randomly. I have tried to make the upgrading more
intelligent. 
*/


(function () {
	var FlunikTools_main = function () {
		try {
			function CCTAWrapperIsInstalled() {
				return (typeof (CCTAWrapper_IsInstalled) != 'undefined' && CCTAWrapper_IsInstalled);
			}

			function createFlunikTools() {
				console.log('Custom FLUNIKTOLS createFlunikTools');

				qx.Class.define("FlunikTools.Main", {
					type: "singleton",
					extend: qx.core.Object,
					members: {
						AutoUpdateButton: null,
						autoUpdateHandle: null,
						_this: null,

						initialize: function () {

							console.log('Custom FLUNIKTOLS initialize');
							AutoUpdateButton = new qx.ui.form.Button("Flunik", null).set({
								toolTipText: "Flunik",
								appearance: ("button-text-small"), //"button-standard-"+factionText), button-playarea-mode-red-frame
								center: true
							});
//							width: 100,
//							height: 40,
//							maxWidth: 100,
//							maxHeight: 40,
//							appearance: ("button-playarea-mode-frame"), //"button-standard-"+factionText), button-playarea-mode-red-frame

							AutoUpdateButton.addListener("click", function (e) {
								if (window.FlunikTools.Main.getInstance().autoUpdateHandle != null) {
									window.FlunikTools.Main.getInstance().stopAutoUpdate();
									AutoUpdateButton.setLabel("Flunik OFF");
									//alert("Stopped auto-update");
								} else {
									//window.FlunikTools.Main.getInstance().startAutoUpdate("Silo,Command Center");
									window.FlunikTools.Main.getInstance().startAutoUpdate();
									AutoUpdateButton.setLabel("Flunik ON");
									//alert("Started auto-update");
								}
							}, this);

							var app = qx.core.Init.getApplication();

//							right: 120,
//							bottom: 80
							app.getDesktop().add(AutoUpdateButton, {
								right: 0,
								bottom: 55
							});

						},

						
						
						print_r: function (arr,level) {
							var dumped_text = "";
							if(!level) level = 0;

							//The padding given at the beginning of the line.
							var level_padding = "";
							for(var j=0;j<level+1;j++) level_padding += "    ";

							if(typeof(arr) == 'object') { //Array/Hashes/Objects 
								for(var item in arr) {
									var value = arr[item];

									if(typeof(value) == 'object') { //If it is an array,
										dumped_text += level_padding + "'" + item + "' ...\n";
										dumped_text += FlunikTools.Main.prototype.print_r(value,level+1);
									} else {
										dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
									}
								}
							} else { //Stings/Chars/Numbers etc.
								dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
							}
							return dumped_text;
						},
						

						logger: function (infolineHeader, infolineUnits, infolineSkipped, infolinemessage) {
							if (infolineSkipped != "") {
								console.debug(infolineHeader+infolineUnits+" - Skipped: "+infolineSkipped+" - Upg: "+infolinemessage);
							} else {
								console.debug(infolineHeader+infolineUnits+" - Upg: "+infolinemessage);
							} 
						},	

						CanRepairAll: function (ncity, viewMode) {
							try {

								var repairData = ncity.get_CityRepairData();
								var myRepair = repairData.CanRepair(0, viewMode);
								repairData.UpdateCachedFullRepairAllCost(viewMode);
								return ((myRepair != null) && (!ncity.get_IsLocked() || (viewMode != ClientLib.Vis.Mode.ArmySetup)));

								return false;
							} catch (e) {
								console.log("FlunikTools.CanRepairAll: ", e);
								return false;
							}
						},

						canUpgradeUnit: function (unit, city) {
							if (unit.get_IsDamaged() || city.get_IsLocked()) return false;

							var nextLevel = unit.get_CurrentLevel() + 1;
							var gameDataTech = unit.get_UnitGameData_Obj();
							var hasEnoughResources = city.HasEnoughResources(ClientLib.Base.Util.GetTechLevelResourceRequirements_Obj(nextLevel, gameDataTech));
							if (gameDataTech == null || !hasEnoughResources) return false;

							var placementType = gameDataTech.pt;
							if (placementType == ClientLib.Base.EPlacementType.Offense) {
								var techName = ClientLib.Base.ETechName.Command_Center;
							} else {
								var techName = ClientLib.Base.ETechName.Defense_HQ;
							}

							var building = city.get_CityBuildingsData().GetUniqueBuildingByTechName(techName);
							if (building == null || building.get_CurrentDamage() > 0 || nextLevel > building.get_CurrentLevel()) return false;

							return true;
						},
						
						// Add the below function to your code and then use
						// this.canUpgradeBuilding(building, city)
						// instead of
						// building.CanUpgrade()

						canUpgradeBuilding: function (building, city) {
							var nextLevel = (building.get_CurrentLevel() + 1);
							var gameDataTech = building.get_TechGameData_Obj();
							var hasEnoughResources = city.HasEnoughResources(ClientLib.Base.Util.GetTechLevelResourceRequirements_Obj(nextLevel, gameDataTech));
							return (!building.get_IsDamaged() && !city.get_IsLocked() && hasEnoughResources);
						},
						
						get_IsFull: function (city, type) {
							if (city.GetResourceCount(type) < (city.GetResourceMaxStorage(type)*0.80)) {
								return false;
							} else {
								return true;
							}
						},

						startAutoUpdate: function () {
							
							var _this = FlunikTools.Main.getInstance();
							// and now you can just use - Thx KRS_L
							//var tiberiumisfull = _this.get_IsFull(city, ClientLib.Base.EResourceType.Tiberium);
							console.debug("FLUNIK: Activated");

							this.autoUpgrade();
							this.autoUpdateHandle = window.setInterval(this.autoUpgrade, 60000);
						},
						
						stopAutoUpdate: function () {
							console.debug("FLUNIK: STOPPED");
							window.clearInterval(this.autoUpdateHandle);
							this.autoUpdateHandle = null;
						},

						autoUpgrade: function () {
							var _this = FlunikTools.Main.getInstance();
						
							for (var nCity in ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d) {
								var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d[nCity];
								var cityname = city.get_Name();
								var baselvl = city.get_LvlBase();
								//var player = city.get_PlayerName();
								var buildings = city.get_Buildings();
								var lowestbuildinglevel = 999;
								var lowestsilolevel = 999;
								var lowestdefencelevel = 999;
								var lowestoffencelevel = 999;
								var lowestupgdefencelevel = 999;
								var lowestupgoffencelevel = 999;
								//console.debug("FLUNIK: ----------- Analyzing city %d with level %d", city.get_Name(), baselvl);

								// get_IsFull(city, ClientLib.Base.EResourceType.Crystal);
								// or
// broken on 2nd pass?			var tiberiumisfull = this.get_IsFull(city, ClientLib.Base.EResourceType.Tiberium);
//								var tiberiumisfull = FlunikTools.Main.prototype.get_IsFull(city, ClientLib.Base.EResourceType.Tiberium);
//								var crystalisfull = FlunikTools.Main.prototype.get_IsFull(city, ClientLib.Base.EResourceType.Crystal);
								
								var blockdef=blockoff=blockbuild=false;

								if (cityname.indexOf('_D') !== -1 || cityname.indexOf('_O') !== -1 || cityname.indexOf('_B') !== -1) {
									if (cityname.indexOf('_D') !== -1) {
										var blockdef = true;
									}
									if (cityname.indexOf('_O') !== -1) {
										var blockoff = true;
									}
									if (cityname.indexOf('_B') !== -1) {
										var blockbuild = true;
									}
								} else {
									if (cityname.indexOf('_') !== -1) {
										continue;
									}
								}

								//var CityRT = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity().get_CityBuildingsData().GetFullRepairTime();
								var CityRT = city.get_CityBuildingsData().GetFullRepairTime();
								
//								console.debug("FLUNIK: Tiberium current %d max %d",city.GetResourceCount(ClientLib.Base.EResourceType.Tiberium),city.GetResourceMaxStorage(ClientLib.Base.EResourceType.Tiberium));
//								console.debug("FLUNIK: Crystal current %d max %d",city.GetResourceCount(ClientLib.Base.EResourceType.Crystal),city.GetResourceMaxStorage(ClientLib.Base.EResourceType.Crystal));

								var currenttibpct = Math.round(10000*city.GetResourceCount(ClientLib.Base.EResourceType.Tiberium)/city.GetResourceMaxStorage(ClientLib.Base.EResourceType.Tiberium))/100 ;
								var currentcrypct = Math.round(10000*city.GetResourceCount(ClientLib.Base.EResourceType.Crystal)/city.GetResourceMaxStorage(ClientLib.Base.EResourceType.Crystal))/100 ;
								var currentpowpct = Math.round(10000*city.GetResourceCount(ClientLib.Base.EResourceType.Power)/city.GetResourceMaxStorage(ClientLib.Base.EResourceType.Power))/100 ;
								//console.debug("FLUNIK: Crystal is %d",currentcrypct);
								//console.debug("FLUNIK: Tiberium is %d",currenttibpct);
								

								
								var d = new Date();
								var infolineHeader = d.toLocaleTimeString()+" FLUNIK: "+cityname+" - T:"+currenttibpct+" C:"+currentcrypct+" P:"+currentpowpct;
								var infolineUnits = "";
								var infolineSkipped = "";
								
								// MaelstromTools.Base.checkRepairAllUnits
//								if (!MaelstromTools.Base.prototype.checkRepairAllUnits()) {
//								if (!MaelstromTools.Wrapper.prototype.CanRepairAll(city,ClientLib.Vis.Mode.ArmySetup)) {
								//   MaelstromTools.Wrapper           CanRepairAll
//								if (!FlunikTools.Main.prototype.CanRepairAll(city,ClientLib.Vis.Mode.ArmySetup)) {
								var units = city.get_CityUnitsData();
								var offenceUnits = units.get_OffenseUnits();
								for (var nUnit in offenceUnits.d) {
									var unit = offenceUnits.d[nUnit];
									var unitlvl = unit.get_CurrentLevel();
									var unit_obj = {
											cityid: city.get_Id(),
											unitId: unit.get_Id()
									};

									if (unitlvl == 1) {
										continue;
									}
									if (unitlvl<lowestoffencelevel) {
										var lowestoffencelevel=unitlvl;
									}

									if (unitlvl<lowestupgoffencelevel && _this.canUpgradeUnit(unit,city)) {
										var lowestupgoffencelevel=unitlvl;
										var lowestupgoffenceunit_obj=unit_obj;
										var unitname = unit.get_UnitGameData_Obj().dn;
									};
									//console.debug("FLUNIK: OFFENCE - unitlvl: %d lowest: %d lowestupg: %d", unitlvl,lowestoffencelevel,lowestupgoffencelevel);
								};
								if (lowestupgoffencelevel<999) {
									if (!FlunikTools.Main.prototype.CanRepairAll(city,ClientLib.Vis.Mode.ArmySetup) && !blockoff) {
										var infolineUnits = infolineUnits+" - O: "+unitname+" "+lowestupgoffencelevel;
										//			var upgradeinfo = "FLUNIK: %d Upgrading %d offence unit from level of: %d",cityname, unitname, lowestupgoffencelevel);
										ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UnitUpgrade", lowestupgoffenceunit_obj, null, null, true);
										//		} else {
										//			console.debug("FLUNIK: No offence units are upgradable - lowest level: %d", lowestoffencelevel);
									} else {
										var infolineUnits = infolineUnits+" - O: SKIPPING "+unitname+" "+lowestupgoffencelevel;
									}
								}

								var defenceUnits = units.get_DefenseUnits();
								for (var nUnit in defenceUnits.d) {
									var unit = defenceUnits.d[nUnit];
									var unitlvl = unit.get_CurrentLevel();
									var unit_obj = {
											cityid: city.get_Id(),
											unitId: unit.get_Id()
									};

									if (unitlvl<lowestdefencelevel) {
										var lowestdefencelevel=unitlvl;
									}

									if (unitlvl < lowestupgdefencelevel && _this.canUpgradeUnit(unit,city)) {
										var lowestupgdefencelevel=unitlvl;
										var lowestupgdefenceunit_obj=unit_obj;
										var unitname = unit.get_UnitGameData_Obj().dn;
									};
									//console.debug("FLUNIK: DEFENCE - unitlvl: %d lowest: %d lowestupg: %d", unitlvl,lowestdefencelevel,lowestupgdefencelevel);

								};
								if (lowestupgdefencelevel<999) {
									if (!FlunikTools.Main.prototype.CanRepairAll(city,ClientLib.Vis.Mode.ArmySetup) && !blockdef) {
										var infolineUnits = infolineUnits+" - D: "+unitname+" "+lowestupgdefencelevel;
										//			console.debug("FLUNIK: %d Upgrading %d defence unit from level of: %d",cityname, unitname, lowestupgdefencelevel);
										ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UnitUpgrade", lowestupgdefenceunit_obj, null, null, true);
										//		} else {
										//			console.debug("FLUNIK: No defence units are upgradable - lowest level: %d", lowestdefencelevel);
									} else {
										var infolineUnits = infolineUnits+" - D: SKIPPING "+unitname+" "+lowestupgdefencelevel;
									}
								}

								//if (lowestupgoffencelevel<999 || lowestupgdefencelevel<999) {
							//		console.debug(upgradeinfo);
								//}
								
								if (blockbuild) {
									continue;
								}
								
								var CY=CC=DHQ=DF=SUPPORT=INF=VEH=AIR=lowestbuilding=lowestsilo=null;
								var infRT=vehRT=airRT=numPOW=numREF=numHAR=0;
								
								for (var nBuildings in buildings.d) {
									var building = buildings.d[nBuildings];
									var name = building.get_UnitGameData_Obj().dn;
//									var tech = parseInt(building.get_TechName(), 10);
									var tech = building.get_TechName();
									var buildinglvl = building.get_CurrentLevel();
									var building_obj = {
											cityid: city.get_Id(),
											buildingid: building.get_Id(),
											posX: building.get_CoordX(),
											posY: building.get_CoordY(),
											isPaid: true
									};
									
									if (tech == ClientLib.Base.ETechName.Harvester_Crystal) {
										console.debug(infolineHeader+"Not sure what it is but Found a Harvester_Crystal!");
									} 		
									if 	(tech == ClientLib.Base.ETechName.Construction_Yard) {
										var CY=building;
										continue;
									};            
									if 	(tech == ClientLib.Base.ETechName.Barracks) {
										var INF=building;
										var infRT = city.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Infantry, false);
										continue;
									};            
									if 	(tech == ClientLib.Base.ETechName.Factory) {
										var VEH=building;
										var vehRT = city.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Vehicle, false);
										continue;
									};            
									if 	(tech == ClientLib.Base.ETechName.Airport) {
										var AIR=building;
										var airRT = city.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Aircraft, false);
										continue;
									}; 
									if 	(tech == ClientLib.Base.ETechName.Command_Center) {
										var CC=building;
										continue;
									};            
									if 	(tech == ClientLib.Base.ETechName.Defense_HQ) {
										var DHQ=building;
										continue;
									};            
									if 	(tech == ClientLib.Base.ETechName.Defense_Facility) {
										var DF=building;
										continue;
									};            
									if (tech == ClientLib.Base.ETechName.Support_Air || tech == ClientLib.Base.ETechName.Support_Ion || tech == ClientLib.Base.ETechName.Support_Art) {
										var SUPPORT=building;
										continue;
									};       
									if (currentpowpct>80) {
										// skip these on default upgrade if power is full
										if (tech == ClientLib.Base.ETechName.PowerPlant) {
											var numPOW=numPOW+1;
											continue;
										}; 
										if (tech == ClientLib.Base.ETechName.Accumulator) {
											continue;
										}; 
									}
									// Buildings above this will never be a default upgrade
									//console.debug("The %d building has a level of: %d", name, buildinglvl);
									
									if	(buildinglvl < lowestbuildinglevel && _this.canUpgradeBuilding(building, city) )	{
										var lowestbuildinglevel=buildinglvl;
										var lowestbuilding=building;
										var lowestbuildingname=name;
									};
									if (tech == ClientLib.Base.ETechName.Refinery) {
										var numREF=numREF+1;
										continue;
									}; 
									if (tech == ClientLib.Base.ETechName.Silo) {
										if (buildinglvl<lowestsilolevel) {
											var lowestsilolevel=buildinglvl;
											var lowestsilo=building;
										}
										continue;
									}; 
									if (tech == ClientLib.Base.ETechName.Harvester) {
										var numHAR=numHAR+1;
										continue;
									}; 
									if (tech == ClientLib.Base.ETechName.PowerPlant) {
										var numPOW=numPOW+1;
										continue;
									}; 
									if (tech == ClientLib.Base.ETechName.Accumulator) {
										continue;
									}; 
									
									console.debug("FLUNIK: You should NEVER see this - If you do the name of the building is: %d and is level: %d", name, buildinglvl);
								}; // for buildings 

								
								
//								FLUNIK: The Harvester building has a level of: 15 (program):234
//								FLUNIK: The Power Plant building has a level of: 15 (program):234
//								FLUNIK: The Silo building has a level of: 15 (program):234
								
								var maxRT = Math.max(airRT,vehRT,infRT);
								switch (maxRT) {
								case airRT:
									// Air has highest RT
									var REPAIR=AIR;
									var repairname="airport";
									break;
								case vehRT:
									// Vehicle has highest RT
									var REPAIR=VEH;
									var repairname="vehicle";
									break;
								case infRT:
									// Infantry has highest RT
									var REPAIR=INF;
									var repairname="infantry";
									break;
								};
								//console.debug("FLUNIK: %d The %d level is %d has repair time of %d",cityname,repairname, REPAIR.get_CurrentLevel(), maxRT);
								//console.debug("FLUNIK: %d Repair info in seconds: Max %d AIR %d VEH %d INF %d",cityname, maxRT, airRT, vehRT, infRT);

								if (currentcrypct>80) {
									//			console.debug("FLUNIK: Crystal is full - checking if CC or DHQ upgrades is required");
									var tryDHQ=true;
									if (CC != null) {
										var tryDHQ=false;
										if (CC.get_CurrentLevel() == lowestoffencelevel) {
											if (_this.canUpgradeBuilding(CC, city)) {
												console.debug(infolineHeader+infolineUnits+" - Crystal is full - Upgrading CC since offencelevel is maximum");
												CC.Upgrade();
												return;
											} else {
												var tryDHQ=true;
											}
										}
									};

									// tryDHQ will only be true if CC exists, offence level is maxed and CC unable to upgrade
									if (DHQ != null && tryDHQ) { 
										if (DHQ.get_CurrentLevel() == lowestdefencelevel && _this.canUpgradeBuilding(DHQ, city)) {
											console.debug(infolineHeader+infolineUnits+" - Crystal is full - Upgrading DHQ since defencelevel is maximum");
											DHQ.Upgrade();
											return;
										}
									};
								};
 
								if (CY != null) { 
									if (CY.get_CurrentLevel() < 25) {
										if (_this.canUpgradeBuilding(CY, city)) {
											//console.debug("FLUNIK: %d The CY building level %d is lower than 25 - Upgrading",cityname, CY.get_CurrentLevel());
											console.debug(infolineHeader+infolineUnits+" - Skipped: "+infolineSkipped+" - Upg: CY<25");
											CY.Upgrade();
											return;
										} else {
											var infolineSkipped=infolineSkipped+"CY<25,";
											//console.debug("FLUNIK: %d The CY building level %d is lower than 25 but cant upgrade - skipping to next",cityname, CY.get_CurrentLevel());
											if (currenttibpct<80) { 
												console.debug(infolineHeader+infolineUnits+" - Skipped: "+infolineSkipped);
												continue; 
											}
										};
									}
								};

								//CityRT
								if (CY != null) { 
									if (CityRT > 85500) {
										if (_this.canUpgradeBuilding(CY, city)) {
											//console.debug("FLUNIK: %d The CY building level %d is lower than 25 - Upgrading",cityname, CY.get_CurrentLevel());
											console.debug(infolineHeader+infolineUnits+" - Skipped: "+infolineSkipped+" - Upg: CityRT>11:45");
											CY.Upgrade();
											return;
										} else {
											var infolineSkipped=infolineSkipped+"CityRT>11:45,";
											//console.debug("FLUNIK: %d The CY building level %d is lower than 25 but cant upgrade - skipping to next",cityname, CY.get_CurrentLevel());
											if (currenttibpct<80) { 
												console.debug(infolineHeader+infolineUnits+" - Skipped: "+infolineSkipped);
												continue; 
											}
										};
									}
								};

								if (CC != null) { 
									if (CC.get_CurrentLevel() == lowestoffencelevel) {
										if (_this.canUpgradeBuilding(CC, city)) {
											//console.debug("FLUNIK: %d The CC building level %d matches lowest offence level %d - Upgrading",cityname, CC.get_CurrentLevel(), lowestoffencelevel);
											console.debug(infolineHeader+infolineUnits+" - Skipped: "+infolineSkipped+" - Upg: CC=army "+CC.get_CurrentLevel());
											CC.Upgrade();
											return;
										} else {
											var infolineSkipped=infolineSkipped+"CC=army,";
											//console.debug("FLUNIK: %d The CC building level %d matches lowest offence level %d but cant upgrade - skipping to next",cityname, CC.get_CurrentLevel(), lowestoffencelevel);
											if (currenttibpct<80) { 
												console.debug(infolineHeader+infolineUnits+" - Skipped: "+infolineSkipped);
												continue; 
											}
										};
									}
								};

								if (DHQ != null) {
									// Upgrade DHQ if it is lower level than the CC and defence level is maxed
									var tryDHQ=true;
									if (CC != null) {
										var tryDHQ=false;
										if (CC.get_CurrentLevel()>(DHQ.get_CurrentLevel()+2)) {
											var tryDHQ=true;
										}
									}

									if (DHQ.get_CurrentLevel() == lowestdefencelevel && tryDHQ) {
										if (_this.canUpgradeBuilding(DHQ, city)) {
											//console.debug("FLUNIK: %d The DHQ building level %d matches lowest defence level %d - Upgrading",cityname, DHQ.get_CurrentLevel(), lowestdefencelevel);
											console.debug(infolineHeader+infolineUnits+" - Skipped: "+infolineSkipped+" - Upg: DHQ=def "+DHQ.get_CurrentLevel());
											DHQ.Upgrade();
											return;
										} else {
											var infolineSkipped=infolineSkipped+"DHQ=def,";
											//console.debug("FLUNIK: %d The DHQ building level %d matches lowest defence level %d but cant upgrade - skipping to next",cityname, DHQ.get_CurrentLevel(), lowestoffencelevel);
											if (currenttibpct<80) { 
												console.debug(infolineHeader+infolineUnits+" - Skipped: "+infolineSkipped);
												continue; 
											}
										};
									}
								};

								if (DF != null && DHQ != null) { 
									if (DF.get_CurrentLevel() < DHQ.get_CurrentLevel()) {
										if (_this.canUpgradeBuilding(DF, city)) {
											//console.debug("FLUNIK: %d The DF building level %d is lower than DHQ level %d - Upgrading",cityname, DF.get_CurrentLevel(), DHQ.get_CurrentLevel());
											console.debug(infolineHeader+infolineUnits+" - Skipped: "+infolineSkipped+" - Upg: DF<DHQ "+DF.get_CurrentLevel());
											DF.Upgrade();
											return;
										} else {
											var infolineSkipped=infolineSkipped+"DF<DHQ,";
											//console.debug("FLUNIK: %d The DF building level %d is lower than DHQ level %d but cant upgrade - skipping to next",cityname, DF.get_CurrentLevel(), DHQ.get_CurrentLevel());
											if (currenttibpct<80) { 
												console.debug(infolineHeader+infolineUnits+" - Skipped: "+infolineSkipped);
												continue; 
											}
										};
									}
								};

								if (SUPPORT != null && DHQ != null) { 
									if (SUPPORT.get_CurrentLevel() < DHQ.get_CurrentLevel()) {
										if (_this.canUpgradeBuilding(SUPPORT, city)) {
											//console.debug("FLUNIK: %d The SUPPORT building level %d is lower than DHQ level %d - Upgrading",cityname, SUPPORT.get_CurrentLevel(), DHQ.get_CurrentLevel());
											console.debug(infolineHeader+infolineUnits+" - Skipped: "+infolineSkipped+" - Upg: SUPPORT<DHQ "+SUPPORT.get_CurrentLevel());
											SUPPORT.Upgrade();
											return;
										} else {
											var infolineSkipped=infolineSkipped+"SUPPORT<DHQ,";
											//console.debug("FLUNIK: %d The SUPPORT building level %d is lower than DHQ level %d but cant upgrade - skipping to next",cityname, SUPPORT.get_CurrentLevel(), DHQ.get_CurrentLevel());
											if (currenttibpct<80) { 
												console.debug(infolineHeader+infolineUnits+" - Skipped: "+infolineSkipped);
												continue; 
											}
										};
									}
								};

								if (REPAIR != null) {
									if (maxRT>21000) { // Always try to get time below 5:50 hours (21000 seconds)
										//console.debug("FLUNIK: %d Repair info in seconds: Max %d AIR %d VEH %d INF %d",cityname, maxRT, airRT, vehRT, infRT);
										if (_this.canUpgradeBuilding(REPAIR, city)) {
											//console.debug("FLUNIK: %d The %d level %d has repair time of %d - Upgrading",cityname,repairname, REPAIR.get_CurrentLevel(), maxRT);
											console.debug(infolineHeader+infolineUnits+" - Skipped: "+infolineSkipped+" - Upg: "+repairname+" "+maxRT+">21000 "+REPAIR.get_CurrentLevel());
											REPAIR.Upgrade();
											return;
										} else {
											var infolineSkipped=infolineSkipped+repairname+" "+maxRT+">21000,";
											//console.debug("FLUNIK: %d The %d level %d has repair time %d but cant upgrade - skipping to next",cityname,repairname, REPAIR.get_CurrentLevel(), maxRT);
											if (currenttibpct<80) { 
												console.debug(infolineHeader+infolineUnits+" - Skipped: "+infolineSkipped);
												continue; 
											}
										};
									};
								};
								
								if (REPAIR != null && CC != null) {
									if (maxRT>14400 && REPAIR.get_CurrentLevel()<CC.get_CurrentLevel() && baselvl<20) { // No point upgrading unless RT > 4 hours (14400 seconds)
										//console.debug("FLUNIK: %d Repair info in seconds: Max %d AIR %d VEH %d INF %d",cityname, maxRT, airRT, vehRT, infRT);
										if (_this.canUpgradeBuilding(REPAIR, city)) {
											//console.debug("FLUNIK: %d The %d level %d has repair time of %d - Upgrading",cityname,repairname, REPAIR.get_CurrentLevel(), maxRT);
											console.debug(infolineHeader+infolineUnits+" - Skipped: "+infolineSkipped+" - Upg: "+repairname+" "+maxRT+">14400&REPAIR<CC "+REPAIR.get_CurrentLevel());
											REPAIR.Upgrade();
											return;
										} else {
											var infolineSkipped=infolineSkipped+repairname+" "+maxRT+">14400&REPAIR<CC,";
											//console.debug("FLUNIK: %d The %d level %d has repair time %d but cant upgrade - skipping to next",cityname,repairname, REPAIR.get_CurrentLevel(), maxRT);
											if (currenttibpct<80) { 
												console.debug(infolineHeader+infolineUnits+" - Skipped: "+infolineSkipped);
												continue; 
											}
										};
									};
								};

								if (lowestbuilding != null) { 
									if (lowestbuildinglevel<0.66*baselvl && currenttibpct>2) {
										//console.debug("FLUNIK: %d Default upgrade - lowest building is %d level %d",cityname, lowestbuildingname, lowestbuildinglevel);
										console.debug(infolineHeader+infolineUnits+" - Skipped: "+infolineSkipped+" - Upg: lowest<0.66*baselvl "+lowestbuildingname+" lvl: "+lowestbuildinglevel);
										lowestbuilding.Upgrade();
										return;
									}
								}

								if (lowestsilo != null) { 
									if (lowestsilolevel<baselvl && currenttibpct>80) {
										//console.debug("FLUNIK: %d Default upgrade - lowest building is %d level %d",cityname, lowestbuildingname, lowestbuildinglevel);
										console.debug(infolineHeader+infolineUnits+" - Skipped: "+infolineSkipped+" - Upg: lowestsilo<baselvl&tib>80 lvl: "+lowestsilolevel);
										lowestsilo.Upgrade();
										return;
									}
								}

								
//this.Cache[ClientLib.Base.EResourceType.Tiberium][cname] = this.getPrioList(city, [ClientLib.Base.ETechName.Harvester, ClientLib.Base.ETechName.Silo], ClientLib.Base.EModifierType.TiberiumPackageSize, ClientLib.Base.EModifierType.TiberiumProduction, bOnlyTopBuildings, bOnlyAffordableBuildings);
//this.Cache[ClientLib.Base.EResourceType.Crystal][cname] = this.getPrioList(city, [ClientLib.Base.ETechName.Harvester, ClientLib.Base.ETechName.Silo], ClientLib.Base.EModifierType.CrystalPackageSize, ClientLib.Base.EModifierType.CrystalProduction, bOnlyTopBuildings, bOnlyAffordableBuildings);
//this.Cache[ClientLib.Base.EResourceType.Power][cname] = this.getPrioList(city, [ClientLib.Base.ETechName.PowerPlant, ClientLib.Base.ETechName.Accumulator], ClientLib.Base.EModifierType.PowerPackageSize, ClientLib.Base.EModifierType.PowerProduction, bOnlyTopBuildings, bOnlyAffordableBuildings);
//this.Cache[ClientLib.Base.EResourceType.Gold][cname] = this.getPrioList(city, [ClientLib.Base.ETechName.Refinery, ClientLib.Base.ETechName.PowerPlant], ClientLib.Base.EModifierType.CreditsPackageSize, ClientLib.Base.EModifierType.CreditsProduction, bOnlyTopBuildings, bOnlyAffordableBuildings);

								if (currenttibpct>20){
									var mlist = new Array();
									var tlist = new Array();
									var minTick=99999;
									if (cityname.indexOf('.') !== -1 || cityname.indexOf('-') !== -1) {
										if (cityname.indexOf('.') !== -1) {
											var tprio="forced power "+numPOW+"PP>"+numREF+"RF ";
											var mlist = HuffyTools.UpgradePriority.prototype.getPrioList(city,[ClientLib.Base.ETechName.PowerPlant, ClientLib.Base.ETechName.Accumulator], ClientLib.Base.EModifierType.PowerPackageSize, ClientLib.Base.EModifierType.PowerProduction, true, true);
										} else {
											var tprio="forced cash "+numPOW+"PP<"+numREF+"RF ";
											var mlist = HuffyTools.UpgradePriority.prototype.getPrioList(city,[ClientLib.Base.ETechName.Refinery, ClientLib.Base.ETechName.PowerPlant], ClientLib.Base.EModifierType.CreditsPackageSize, ClientLib.Base.EModifierType.CreditsProduction, true, true);
										}
									} else {
										if (numPOW>numREF) {
											var tprio="power "+numPOW+"PP>"+numREF+"RF ";
											var tlist = HuffyTools.UpgradePriority.prototype.getPrioList(city,[ClientLib.Base.ETechName.PowerPlant, ClientLib.Base.ETechName.Accumulator], ClientLib.Base.EModifierType.PowerPackageSize, ClientLib.Base.EModifierType.PowerProduction, true, true);
										} else {
											var tprio="cash "+numPOW+"PP<"+numREF+"RF ";
											var tlist = HuffyTools.UpgradePriority.prototype.getPrioList(city,[ClientLib.Base.ETechName.Refinery, ClientLib.Base.ETechName.PowerPlant], ClientLib.Base.EModifierType.CreditsPackageSize, ClientLib.Base.EModifierType.CreditsProduction, true, true);
										}
										if (typeof(tlist[0])=='object') {
											if (tlist[0]['Ticks']<minTick) {
												var minTick=tlist[0]['Ticks'];
												var mlist=tlist;
											}
										}
										if (numHAR>0) {
											var tlist = HuffyTools.UpgradePriority.prototype.getPrioList(city,[ClientLib.Base.ETechName.Harvester, ClientLib.Base.ETechName.Silo], ClientLib.Base.EModifierType.CrystalPackageSize, ClientLib.Base.EModifierType.CrystalProduction, true, true);
											if (typeof(tlist[0])=='object') {
												if (tlist[0]['Ticks']<minTick) {
													var tprio="Crystal ";
													var minTick=tlist[0]['Ticks'];
													var mlist=tlist;
												}
											}
											var tlist = HuffyTools.UpgradePriority.prototype.getPrioList(city,[ClientLib.Base.ETechName.Harvester, ClientLib.Base.ETechName.Silo], ClientLib.Base.EModifierType.TiberiumPackageSize, ClientLib.Base.EModifierType.TiberiumProduction, true, true);
											if (typeof(tlist[0])=='object') {
												if (tlist[0]['Ticks']<minTick) {
													var tprio="Tiberium ";
													var minTick=tlist[0]['Ticks'];
													var mlist=tlist;
												}
											}
										}
									}
									if (typeof(mlist[0])=='object') {
										console.debug(infolineHeader+infolineUnits+" - Skipped: "+infolineSkipped+" - Priority "+tprio+" Upg: "+mlist[0]['Type']+" lvl: "+mlist[0]['Level']);
										ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", mlist[0]['Building'], null, null, true);
//										console.debug(FlunikTools.Main.prototype.print_r(mlist));  
										return;
									}
								}

								if (lowestbuilding != null) { 
									if (_this.canUpgradeBuilding(lowestbuilding, city) && currenttibpct>95) {
										//console.debug("FLUNIK: %d Default upgrade - lowest building is %d level %d",cityname, lowestbuildingname, lowestbuildinglevel);;
										console.debug(infolineHeader+infolineUnits+" - Skipped: "+infolineSkipped+" - Default Upg: "+lowestbuildingname+" lvl: "+lowestbuildinglevel);
										lowestbuilding.Upgrade();
										return;
									}
								}
								if (infolineSkipped != "" || infolineUnits != "" ){
									console.debug(infolineHeader+infolineUnits+" - Skipped: "+infolineSkipped);
								}

							}; // for city
						} // function autoupgrade
					} // members
				}); // class define
			} // create fluniktools
		} catch (e) {
			console.log("createFlunikTools: ", e);
		} // end try catch

		function FlunikTools_checkIfLoaded() {
			try {
				if (typeof qx != 'undefined' && qx.core.Init.getApplication() && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION) && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION).isVisible()) {
					createFlunikTools();

					for (var key in ClientLib.Data.CityBuilding.prototype) { //KRS_L
						if (ClientLib.Data.CityBuilding.prototype[key] !== null) {
							var strFunction = ClientLib.Data.CityBuilding.prototype[key].toString();
							//if (typeof ClientLib.Data.CityBuilding.prototype[key] === 'function' & strFunction.indexOf("true).l.length==0)){return true;}}return false") > -1) {
							if (typeof ClientLib.Data.CityBuilding.prototype[key] === 'function' & strFunction.indexOf("true).l.length==0))") > -1) {
								ClientLib.Data.CityBuilding.prototype.CanUpgrade = ClientLib.Data.CityBuilding.prototype[key];
								break;
							}
						}
					}

					for (var key in ClientLib.Data.CityUnit.prototype) { //KRS_L
						if (ClientLib.Data.CityUnit.prototype[key] !== null) {
							var strFunction = ClientLib.Data.CityUnit.prototype[key].toString();
							if (typeof ClientLib.Data.CityUnit.prototype[key] === 'function' & strFunction.indexOf(".l.length>0)){return false;}") > -1) {
								ClientLib.Data.CityUnit.prototype.CanUpgrade = ClientLib.Data.CityUnit.prototype[key];
								break;
							}
						}
					}

					for (var key in ClientLib.Data.CityBuilding.prototype) {
						if (typeof ClientLib.Data.CityBuilding.prototype[key] === 'function') {
							var strFunction = ClientLib.Data.CityBuilding.prototype[key].toString();
							if (strFunction.indexOf("()+1);this.") > -1) {
								ClientLib.Data.CityBuilding.prototype.Upgrade = ClientLib.Data.CityBuilding.prototype[key];
								break;
							}
						}
					}



					window.FlunikTools.Main.getInstance().initialize();
				} else {
					window.setTimeout(FlunikTools_checkIfLoaded, 1000);
				}
			} catch (e) {
				console.log("FlunikTools_checkIfLoaded: ", e);
			}
		}
		if (/commandandconquer\.com/i.test(document.domain)) {
			window.setTimeout(FlunikTools_checkIfLoaded, 1000);
		}
	}; // FlunikTools_main function

	try {
		var FlunikScript = document.createElement("script");
		FlunikScript.innerHTML = "(" + FlunikTools_main.toString() + ")();";
		FlunikScript.type = "text/javascript";
		if (/commandandconquer\.com/i.test(document.domain)) {
			document.getElementsByTagName("head")[0].appendChild(FlunikScript);
		}
	} catch (e) {
		console.log("FlunikTools: init error: ", e);
	}
})();