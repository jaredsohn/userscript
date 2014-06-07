// ==UserScript==
// @name        C&C Tiberium Alliances Flunik Tools
// @namespace   FlunikTools
// @description Upgrades Offense or Defense or Buildings. 
// @version     Awesome 1.2.6
// @author      dbendure
// @include     http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @updateURL   https://userscripts.org/scripts/source/166833.meta.js
// @downloadURL https://userscripts.org/scripts/source/166833.user.js
//@grant none
// ==/UserScript==

(function (){
	var FlunikTools_main =  function() {
		try {
			/*function CCTAWrapperIsInstalled() {
				return (typeof (CCTAWrapper_IsInstalled) != 'undefined' && CCTAWrapper_IsInstalled);
			}*/
			
			function createFlunikTools() {
				console.log('FLUNIKTOOLS createFlunikTools');
				
				qx.Class.define("FlunikTools.Main", {
					type: "singleton",
					extend: qx.core.Object,
					members: {
						button : null,
						popup : null,
						AutoUpdateButton : null,
						BuildingsButton : null,
						DefenseButton : null,
						OffenseButton : null,
						autoUpdateHandle : null,

						
						initialize: function() {
						
							console.log('FLUNIKTOOLS initialize');
							/*AutoUpdateButton = new qx.ui.form.Button("All", null).set({
								toolTipText: "Only Upgrades Everything, even if you turn it off... stupid all button!",
								width: 60,
								height: 30,
								maxWidth: 60,
								maxHeight: 30,
								appearance: ("button-text-small"), //"button-standard-"+factionText), button-playarea-mode-red-frame
								center: true
							});*/
							BuildingsButton = new qx.ui.form.Button("Building", null).set({
								toolTipText: "Only Upgrades Buildings",
								width: 60,
								height: 30,
								maxWidth: 60,
								maxHeight: 30,
								appearance: ("button-text-small"), //"button-standard-"+factionText), button-playarea-mode-red-frame
								center: true
							});
							DefenseButton = new qx.ui.form.Button("Defence", null).set({
								toolTipText: "Only Upgrades Defence",
								width: 60,
								height: 30,
								maxWidth: 60,
								maxHeight: 30,
								appearance: ("button-text-small"), //"button-standard-"+factionText), button-playarea-mode-red-frame
								center: true
							});
							OffenseButton = new qx.ui.form.Button("Offence", null).set({
								toolTipText: "Only Upgrades Offence",
								width: 60,
								height: 30,
								maxWidth: 60,
								maxHeight: 30,
								appearance: ("button-text-small"), //"button-standard-"+factionText), button-playarea-mode-red-frame
								center: true
							});
							button = new qx.ui.form.Button("DB.aUp");
							popup = new qx.ui.popup.Popup(new qx.ui.layout.Grid(5)).set({
								  width: 60,
								  height: 30,
							      allowGrowY: false,
							      allowGrowX: false,
							      padding: 5,
							      position: "top-right",
								  //appearance: ("button-text-small")
								  
								});

								

								
							
							
							
							BuildingsButton.addListener("click", function (e) {
								if (window.FlunikTools.Main.getInstance().autoUpdateHandle != null) {
									window.FlunikTools.Main.getInstance().BstopAutoUpdate();
									BuildingsButton.setLabel("B.OFF");
									//alert("Stopped auto-update");
								} else {
									window.FlunikTools.Main.getInstance().BuildingstartAutoUpdate();
									BuildingsButton.setLabel("B.ON");
								}
							}, this);
							DefenseButton.addListener("click", function (e) {
								if (window.FlunikTools.Main.getInstance().autoUpdateHandle != null) {
									window.FlunikTools.Main.getInstance().DstopAutoUpdate();
									DefenseButton.setLabel("D.OFF");
									//alert("Stopped auto-update");
								} else {
									window.FlunikTools.Main.getInstance().DefensestartAutoUpdate();
									DefenseButton.setLabel("D.ON");
								}
							}, this);
							OffenseButton.addListener("click", function (e) {
								if (window.FlunikTools.Main.getInstance().autoUpdateHandle != null) {
									window.FlunikTools.Main.getInstance().OstopAutoUpdate();
									OffenseButton.setLabel("O.OFF");
									//alert("Stopped auto-update");
								} else {
									window.FlunikTools.Main.getInstance().OffensestartAutoUpdate();
									OffenseButton.setLabel("O.ON");
								}
							}, this);
							
							/*AutoUpdateButton.addListener("click", function (e) {
								if (window.FlunikTools.Main.getInstance().autoUpdateHandle != null) {
									
									AutoUpdateButton.setLabel("F.OFF");
									//window.FlunikTools.Main.getInstance().stopAutoUpdate();
									BuildingsButton.setLabel("F.OFF");
									window.FlunikTools.Main.getInstance().BstopAutoUpdate();
									DefenseButton.setLabel("F.OFF");
									window.FlunikTools.Main.getInstance().DstopAutoUpdate();
									OffenseButton.setLabel("F.OFF");
									window.FlunikTools.Main.getInstance().OstopAutoUpdate();
									//alert("Stopped auto-update");
								} else {
									//window.FlunikTools.Main.getInstance().startAutoUpdate("Construction Yard, Command Center, Defense HQ, Defense Facility, Barracks, Factory, Airfield, Accumulator, Silo, Refinery, Power Plant, Harvester, Blade of Kane, Eye of Kane, Fist of Kane, Falcon Support, Ion Cannon Support, Skystrike Support, War Factory, Hand of Nod, Airport");
									AutoUpdateButton.setLabel("F.ON");
									
									window.FlunikTools.Main.getInstance().BuildingstartAutoUpdate();
									BuildingsButton.setLabel("F.ON");
									
									window.FlunikTools.Main.getInstance().DefensestartAutoUpdate();
									DefenseButton.setLabel("F.ON");
									
									window.FlunikTools.Main.getInstance().OffensestartAutoUpdate();
									OffenseButton.setLabel("F.ON");
								}
							}, this);*/
							
							//popup.add(new qx.ui.basic.Atom(null, null));//new qx.ui.basic.Atom("Hello World #1", "button-text-small")
							
							//popup.add(AutoUpdateButton, {row: 0, column: 0});
							popup.add( BuildingsButton, {row: 0, column: 1});
							popup.add(DefenseButton, {row: 0, column: 2});
							popup.add(OffenseButton, {row: 0, column: 3});
							
						button.addListener("click", function(e)
								{
								  popup.placeToMouse(e);
									popup.show();
								}, this);
							
						
						
							var app = qx.core.Init.getApplication();

							/*app.getDesktop().add(BuildingsButton, {
								left : 0
							});
							app.getDesktop().add(DefenseButton, {
								left : 60
							});
							app.getDesktop().add(OffenseButton, {
								left : 120
							});
							app.getDesktop().add(AutoUpdateButton, {
								left : 180
							});	*/						
							app.getDesktop().add(button, {
								right: 128,
								top: 3
							});					
							
						
						
						},
                        
                        
                        // Use
						// this.canUpgradeUnit(unit, city)
						// instead of
						// unit.CanUpgrade()
						//Thanks to KRS_L
						canUpgradeUnit: function (unit, city) {
							var _this = FlunikTools.Main.getInstance();
							var nextLevel = unit.get_CurrentLevel() + 1;
							var gameDataTech = unit.get_UnitGameData_Obj();
							var hasEnoughResources = city.HasEnoughResources(ClientLib.Base.Util.GetTechLevelResourceRequirements_Obj(nextLevel, gameDataTech));
						    if (gameDataTech == null || unit.get_IsDamaged() || city.get_IsLocked() || !hasEnoughResources) {
						        return false;
						    }
						    var id = _this.getMainProductionBuildingMdbId(gameDataTech.pt, gameDataTech.f);
						    var building = city.get_CityBuildingsData().GetBuildingByMDBId(id);
						    if ((building == null) || (building.get_CurrentDamage() > 0)) {
						        return false;
						    }
						    var levelReq = ClientLib.Base.Util.GetUnitLevelRequirements_Obj(nextLevel, gameDataTech);
							var reqTechIndexes = _this.getMissingTechIndexesFromTechLevelRequirement(levelReq, true, city);
						    if ((reqTechIndexes != null) && (reqTechIndexes.length > 0)) {
						        return false;
						    }
						    return true;
						},

						getMainProductionBuildingMdbId: function (placementType, faction) {
							var mdbId = -1;
							var techNameId = -1;
							if (placementType == 2) {
								techNameId = 3;
							} else {
								techNameId = 4;
							}
							if (techNameId > 0) {
								mdbId = ClientLib.Base.Tech.GetTechIdFromTechNameAndFaction(techNameId, faction);
							}
							return mdbId;
						},

						getMissingTechIndexesFromTechLevelRequirement: function (levelRequirements, breakAtFirst, city) {
							var reqTechIndexes = [];
							if (levelRequirements != null && levelRequirements.length > 0) {
								for (var lvlIndex=0; (lvlIndex < levelRequirements.length); lvlIndex++) {
									var lvlReq = levelRequirements[lvlIndex];
									var requirementsMet = false;
									var amountCounter = lvlReq.Amount;
									for (var buildingIndex in city.get_Buildings().d) {
										if (city.get_Buildings().d[buildingIndex].get_MdbBuildingId() == lvlReq.RequiredTechId && city.get_Buildings().d[buildingIndex].get_CurrentLevel() >= lvlReq.Level) {
											amountCounter--;
											if (amountCounter <= 0) {
												requirementsMet=true;
												break;
											}
										}
									}
									if (!requirementsMet) {
										requirementsMet = ClientLib.Data.MainData.GetInstance().get_Player().get_PlayerResearch().IsResearchMinLevelAvailable(lvlReq.RequiredTechId, lvlReq.Level);
									}
									if (!requirementsMet) {
										reqTechIndexes.push(lvlIndex);
										if (breakAtFirst) {
											return reqTechIndexes;
										}
									}
								}
							}
							return reqTechIndexes;
						},
						
						// Add the below function to your code and then use
						// this.canUpgradeBuilding(building, city)
						// instead of
						// building.CanUpgrade()
						//Thanks to KRS_L

						canUpgradeBuilding: function (building, city) {
							var nextLevel = (building.get_CurrentLevel() + 1);
							var gameDataTech = building.get_TechGameData_Obj();
							var hasEnoughResources = city.HasEnoughResources(ClientLib.Base.Util.GetTechLevelResourceRequirements_Obj(nextLevel, gameDataTech));
							return (!building.get_IsDamaged() && !city.get_IsLocked() && hasEnoughResources);
						},
                        
						
						
						
						BuildingstartAutoUpdate: function () {
							
							//this.buildingsToUpdate = _buildingsToUpdate;
							this.BuildingautoUpgrade();
							this.autoUpdateHandle = window.setInterval(this.BuildingautoUpgrade, 2000);
						},
						
						OffensestartAutoUpdate: function () {
							
							//this.buildingsToUpdate = _buildingsToUpdate;
							this.OffenseautoUpgrade();
							this.autoUpdateHandle = window.setInterval(this.OffenseautoUpgrade, 2000);
						},
						
						DefensestartAutoUpdate: function () {
							
							//this.buildingsToUpdate = _buildingsToUpdate;
							this.DefenseautoUpgrade();
							this.autoUpdateHandle = window.setInterval(this.DefenseautoUpgrade, 2000);
						},
						
						BstopAutoUpdate : function() {
							window.clearInterval(this.autoUpdateHandle);
							this.autoUpdateHandle = null;
						},
						
						DstopAutoUpdate : function() {
							window.clearInterval(this.autoUpdateHandle);
							this.autoUpdateHandle = null;
						},
						
						OstopAutoUpdate : function() {
							window.clearInterval(this.autoUpdateHandle);
							this.autoUpdateHandle = null;
						},
                        
						
						totalRepairTime: function ( airRT, vehRT, infRT) {
						
						
						if ((airRT > 0) && (vehRT > 0) && (infRT > 0)){
							if((airRT > vehRT) && (airRT > infRT) ){
								var maxRT = airRT;
								
								return (maxRT);
								}
							if((vehRT > airRT) && (vehRT > infRT) ){
								var maxRT = vehRT;
								
								return (maxRT);
								}
							if((infRT > vehRT) && (infRT > airRT) ){
								var maxRT = infRT;
								
								return (maxRT);
								}
						
						
						}
						
						if ((airRT < 1 )&& (vehRT > 0) && (infRT > 0)){
						
							if((vehRT > infRT) ){
								var maxRT = vehRT;
								
								return (maxRT);
								}
							if((infRT > vehRT)){
								var maxRT = infRT;
								
								return (maxRT);
								}
						}
						
						if ((airRT > 0) && (vehRT < 1 )&& (infRT > 0)){
							if((airRT > infRT) ){
								var maxRT = airRT;
								
								return (maxRT);
								}
							
							if((infRT > airRT) ){
								var maxRT = infRT;
								
								return (maxRT);
								}
						}
						
						if ((airRT > 0) && (vehRT > 0 )&& (infRT < 1)){
							if((airRT > vehRT)){
									var maxRT = airRT;
									
									return (maxRT);
									}
								if((vehRT > airRT)){
									var maxRT = vehRT;
									
									return (maxRT);
									}
							
						}
						
						if ((airRT < 1) && (vehRT < 1 )&& (infRT < 1)){
						var totalNoRT = 0
						return (totalNoRT);
						}
						
						
						},



						
/*The Defense Function*/DefenseautoUpgrade : function() {
                           var _this = window.FlunikTools.Main.getInstance();
                            var basenum = 0;
							for (var nCity in ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d)
							{basenum++;
								var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d[nCity];
								var buildings = city.get_Buildings();
                                 var baseName = city.m_SupportDedicatedBaseName;
                             
                           
                             
                            var baselvl = city.get_LvlBase();
                             var blvlLow = baselvl + 3;
                                
                             	
                             	
                                var defarr = new Array();
							    var defnum = 0;
                               
								var units = city.get_CityUnitsData();
								

								var defenceUnits = units.get_DefenseUnits();
								for (var nUnit in defenceUnits.d ) 
								{defnum++
									var unit = defenceUnits.d[nUnit];
									//console.log(_this.GetUnitMaxHealth(unit.get_CurrentLevel(), unit.get_MdbUnitId (), false));
									var HQ = new Array ();
									for(var nBuildings in buildings.d){
									var building = buildings.d[nBuildings];
									var tech = building.get_TechName();
									if(tech == ClientLib.Base.ETechName.Defense_HQ){
									var HQlevel = building.get_CurrentLevel();
									HQ[0] = HQlevel;
									}
									}
									
									
                                    if(!_this.canUpgradeUnit(unit, city))continue;
                                    var unitlvlup1 = unit.get_CurrentLevel() + 1;
                                    var name  = unit.get_UnitGameData_Obj().dn;
									//console.log(HQ[0]);
									
								  if(unit.get_CurrentLevel() > 3){
									var unitHealthperCost = _this.GetUnitMaxHealth(unit.get_CurrentLevel(), ClientLib.Res.ResMain.GetInstance().GetUnit_Obj(unit.get_MdbUnitId()), false)/(ClientLib.Base.Util.GetUnitLevelResourceRequirements_Obj(unitlvlup1, unit.get_UnitGameData_Obj())[1].Count);
									}
									if(unit.get_CurrentLevel() <= 3){
									var unitHealthperCost = Math.pow( (_this.GetUnitMaxHealth(unit.get_CurrentLevel(), ClientLib.Res.ResMain.GetInstance().GetUnit_Obj(unit.get_MdbUnitId()), false)/(ClientLib.Base.Util.GetUnitLevelResourceRequirements_Obj(unitlvlup1, unit.get_UnitGameData_Obj())[0].Count)), -1);
									}
									defarr[defnum] =  unitHealthperCost;
								    defarr.sort(function(a,b){return b-a});
									//console.log(defarr[0], defarr[1]);
									
									if((defarr[0] >= defarr[1]) && ((unit.get_CurrentLevel() > 3)&&( unit.get_CurrentLevel() <= 4) ) && (defarr[1] != undefined)  ){
									
									//console.log(defarr[0], defarr[1]);
									defarr.shift();
									}
									if((defarr[0] >= defarr[1]) && (unit.get_CurrentLevel() > 4) && (defarr[1] != undefined)  ){
									defarr.sort(function(a,b){return a-b});
									//console.log(defarr[0], defarr[1]);
									defarr.shift();
									}
									
									if((defarr[0] >= defarr[1]) && (unit.get_CurrentLevel() <= 3) && (defarr[1] != undefined)){
									defarr.shift();
									}
									
									
									if(unitHealthperCost == defarr[0] ){
									var defunit_obj = {
										cityid: city.get_Id(),
										basename: city.m_SupportDedicatedBaseName,
										Ratio: unitHealthperCost,
										unitname: unit.get_UnitGameData_Obj().dn,
										level: unit.get_CurrentLevel(),
										type: "Defense",
										unitId: unit.get_Id()
									}
									}
									/*if(_this.GetUnitMaxHealth(unit.get_CurrentLevel(), ClientLib.Res.ResMain.GetInstance().GetUnit_Obj(unit.get_MdbUnitId()), false).toString() !== "NaN"){
									console.log(_this.GetUnitMaxHealth(unit.get_CurrentLevel(), ClientLib.Res.ResMain.GetInstance().GetUnit_Obj(unit.get_MdbUnitId()), false));
									}*/
								}
								if ( (defunit_obj != undefined)&&(defunit_obj.Ratio == defarr[0]) && (defunit_obj.level <= (HQ[0]-1) )) {
										//console.log(units);
										console.log(defunit_obj, defarr);
										ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UnitUpgrade", defunit_obj, null, null, true);
										defarr = [];
										HQ = [];
										break;
								}
                               
							}
                             
						},
						
						
/*The Offense Function*/OffenseautoUpgrade : function() {
                           var _this = window.FlunikTools.Main.getInstance();
                            var basenum = 0;
							for (var nCity in ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d)
							{basenum++;
								var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d[nCity];
								var buildings = city.get_Buildings();
                                 var baseName = city.m_SupportDedicatedBaseName;
                             
                           
                             
                            var baselvl = city.get_LvlBase();
                             var blvlLow = baselvl + 3;
                                
                             	
                             	
                               var offarr = new Array();
							   var offnum = 0;
                               
								var units = city.get_CityUnitsData();
								

								var offenceUnits = units.get_OffenseUnits();
								for (var nUnit in offenceUnits.d) 
								{offnum++
									var unit = offenceUnits.d[nUnit];
                                    
									if(!_this.canUpgradeUnit(unit, city))continue;
                                    var unitlvlup1 = unit.get_CurrentLevel() + 1;
                                    var name  = unit.get_UnitGameData_Obj().dn;
									if(unit.get_CurrentLevel() > 2){
									var unitHealthperCost = _this.GetUnitMaxHealth(unit.get_CurrentLevel(), ClientLib.Res.ResMain.GetInstance().GetUnit_Obj(unit.get_MdbUnitId()), false)/(ClientLib.Base.Util.GetUnitLevelResourceRequirements_Obj(unitlvlup1, unit.get_UnitGameData_Obj())[1].Count);
									}
									if(unit.get_CurrentLevel() <= 2){
									var unitHealthperCost = Math.pow( (_this.GetUnitMaxHealth(unit.get_CurrentLevel(), ClientLib.Res.ResMain.GetInstance().GetUnit_Obj(unit.get_MdbUnitId()), false)/(ClientLib.Base.Util.GetUnitLevelResourceRequirements_Obj(unitlvlup1, unit.get_UnitGameData_Obj())[0].Count)), -1);
									}
									offarr[offnum] =  unitHealthperCost;
									//What this does is sort the array from highest to lowest, then it dumps the first ratio with the .shift(), and upgrades the next best thing. 
									
								   offarr.sort(function(a,b){return b-a});
								   //console.log(offarr[0], offarr[1]);
									
									if(offarr[0] >= offarr[1] && ((unit.get_CurrentLevel() > 2)&&( unit.get_CurrentLevel() <= 3) ) && (offarr[1] != undefined)  ){
									
									offarr.shift();
									
									}
									if(offarr[0] >= offarr[1] &&( unit.get_CurrentLevel() > 3)  && (offarr[1] != undefined)  ){
									offarr.sort(function(a,b){return a-b});
									offarr.shift();
									
									}
									if(offarr[0] >= offarr[1] &&( unit.get_CurrentLevel() <= 2)  && (offarr[1] != undefined)  ){
									
									offarr.shift();
									
									}
									if(unitHealthperCost == offarr[0]){
									var offunit_obj = {
										cityid: city.get_Id(),
										basename: city.m_SupportDedicatedBaseName,
										unitname: unit.get_UnitGameData_Obj().dn,
										Ratio: unitHealthperCost,
										level: unit.get_CurrentLevel(),
										type: "Offense",
										unitId: unit.get_Id()
									}
									}
									
									
								  
									
								  
									
										
									}
									
									//console.log(offarr[1].toString());
									
									if ( (offunit_obj != undefined)&&(offunit_obj.Ratio == offarr[0]) && (offunit_obj.level <= (city.get_CommandCenterLevel() - 1)) ) {
										//console.log(units);
										
										console.log(offunit_obj, offarr);
										ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UnitUpgrade", offunit_obj, null, null, true);
										offarr = [];
										break;
								}
                               
							}
                             
						},
						
						
/*The Building Function*/BuildingautoUpgrade : function() {
                           var _this = window.FlunikTools.Main.getInstance();
                            var basenum = 0;
							for (var nCity in ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d)
							{basenum++;
								var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d[nCity];
								var buildings = city.get_Buildings();
                                 var baseName = city.m_SupportDedicatedBaseName;
                             
                             var airRT = city.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Aircraft, false);
								var vehRT = city.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Vehicle, false);
								var infRT = city.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Infantry, false);
                             
                            var baselvl = city.get_LvlBase();
                             var blvlLow = baselvl + 3;
                                //var offensehealth = city.get_CityUnitsData().GetTotalOffenseUnitHealth();
                             	
                                    var cryMax = city.GetResourceMaxStorage(ClientLib.Base.EResourceType.Crystal);
									var tibMax = city.GetResourceMaxStorage(ClientLib.Base.EResourceType.Tiberium);
									var powMax = city.GetResourceMaxStorage(ClientLib.Base.EResourceType.Power);
									
                             	//console.log(baseName, airRT, vehRT, infRT, _this.totalRepairTime(airRT, vehRT, infRT));
                                
                                var refarr = new Array();
								var refnum = 0;
                             	var powarr = new Array();
                             	var pownum = 0;
                             	var hararr = new Array();
                             	var hararr1 = new Array();
                             	var harnum = 0;
                             	var harnum1 = 0;
                             	var accarr = new Array();
                             	var accnum = 0;
                             	var silarr = new Array();
                             	var silnum = 0;
								var maxarr = [];
                             	
                             for (var nBuildings in buildings.d) {
                                   
									var building = buildings.d[nBuildings];
                                    if(!_this.canUpgradeBuilding(building, city))continue;
									var name = building.get_UnitGameData_Obj().dn;
									var buildinglvlup1 = building.get_CurrentLevel() + 1;
                                    var bulid = building.get_Id();
                                 var tech = building.get_TechName();
								 //var buildTibCost = ClientLib.Base.Util.GetUnitLevelResourceRequirements_Obj(buildinglvlup1, building.get_UnitGameData_Obj())[0].Count;
								  //var buildPowCost = ClientLib.Base.Util.GetUnitLevelResourceRequirements_Obj(buildinglvlup1, building.get_UnitGameData_Obj())[1].Count;
									//if (name == "Silo" || name == "Accumulator" || name == "Command Center" || name == "Defence HQ" ) {
/*						  
**************************************************************************************************************************************************************************************************************************************************************************************************************************************
Upgrade RT CC CY DHQ DFac and low level resource building Defining
**************************************************************************************************************************************************************************************************************************************************************************************************************************************							  
	*/                                 
								 
								 
								 if(	(tech == ClientLib.Base.ETechName.Factory)	&& (_this.totalRepairTime(airRT, vehRT, infRT) == vehRT)){
										  
										  var offRT_obj = {
											cityid: city.get_Id(),
											buildingid: building.get_Id(),
											basename: city.m_SupportDedicatedBaseName,
											building: building.get_UnitGameData_Obj().dn,
											buildTibCost: ClientLib.Base.Util.GetUnitLevelResourceRequirements_Obj(buildinglvlup1, building.get_UnitGameData_Obj())[0].Count,
											buildPowCost: ClientLib.Base.Util.GetUnitLevelResourceRequirements_Obj(buildinglvlup1, building.get_UnitGameData_Obj())[1].Count,
											specal: vehRT,
											posX: building.get_CoordX(),
											posY: building.get_CoordY(),
											isPaid: true
											};
                                 
										  //console.log(offRT_obj);
										  //ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", offRT_obj, null, null, true); 
                                 }
                                 
                                 if(	(tech == ClientLib.Base.ETechName.Barracks) &&	(_this.totalRepairTime(airRT, vehRT, infRT) == infRT) ){
										  
										  var offRT_obj = {
											cityid: city.get_Id(),
											buildingid: building.get_Id(),
											basename: city.m_SupportDedicatedBaseName,
											building: building.get_UnitGameData_Obj().dn,
											buildTibCost: ClientLib.Base.Util.GetUnitLevelResourceRequirements_Obj(buildinglvlup1, building.get_UnitGameData_Obj())[0].Count,
											buildPowCost: ClientLib.Base.Util.GetUnitLevelResourceRequirements_Obj(buildinglvlup1, building.get_UnitGameData_Obj())[1].Count,
											specal:  infRT,
											posX: building.get_CoordX(),
											posY: building.get_CoordY(),
											isPaid: true
											};
										  //console.log(offRT_obj);
										  //ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding",offRT_obj, null, null, true);
                                 }
                                 
                                 if(	(tech == ClientLib.Base.ETechName.Airport) && (_this.totalRepairTime(airRT, vehRT, infRT) == airRT)	)	{
										 
										 var offRT_obj = {
											cityid: city.get_Id(),
											buildingid: building.get_Id(),
											basename: city.m_SupportDedicatedBaseName,
											building: building.get_UnitGameData_Obj().dn,
											buildTibCost: ClientLib.Base.Util.GetUnitLevelResourceRequirements_Obj(buildinglvlup1, building.get_UnitGameData_Obj())[0].Count,
											buildPowCost: ClientLib.Base.Util.GetUnitLevelResourceRequirements_Obj(buildinglvlup1, building.get_UnitGameData_Obj())[1].Count,
											specal:  airRT,
											posX: building.get_CoordX(),
											posY: building.get_CoordY(),
											isPaid: true
											};
											//console.log(offRT_obj );
											//ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", offRT_obj, null, null, true);
                                 }
                                 
                                 if (	(tech == ClientLib.Base.ETechName.Construction_Yard|| tech ==ClientLib.Base.ETechName.Command_Center || tech ==ClientLib.Base.ETechName.Defense_HQ ) && (building.get_CurrentLevel() < baselvl)	){
										  
										  var building_obj = {
											cityid: city.get_Id(),
											buildingid: building.get_Id(),
											basename: city.m_SupportDedicatedBaseName,
											buildinglevel: building.get_CurrentLevel(),
											building: building.get_UnitGameData_Obj().dn,
											posX: building.get_CoordX(),
											posY: building.get_CoordY(),
											isPaid: true
											};
										  //console.log(building_obj);
										 // ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", building_obj, null, null, true); 
                                 }
                                 
								  if (	(tech == ClientLib.Base.ETechName.Defense_Facility) &&  (building.get_CurrentLevel() < baselvl + 6)	){
										  
										  var building_obj = {
											cityid: city.get_Id(),
											buildingid: building.get_Id(),
											basename: city.m_SupportDedicatedBaseName,
											buildinglevel: building.get_CurrentLevel(),
											building: building.get_UnitGameData_Obj().dn,
											posX: building.get_CoordX(),
											posY: building.get_CoordY(),
											isPaid: true
											};
										  //console.log(building_obj);
										 // ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", building_obj, null, null, true); 
                                 }
								 
                                 if ((tech ==ClientLib.Base.ETechName.Support_Air)||(tech == ClientLib.Base.ETechName.Support_Ion)||(tech == ClientLib.Base.ETechName.Support_Art) && ( _this.totalRepairTime(airRT, vehRT, infRT) < 14400)){
										  
										  var support_obj = {
											cityid: city.get_Id(),
											buildingid: building.get_Id(),
											basename: city.m_SupportDedicatedBaseName,
											building: building.get_UnitGameData_Obj().dn,
											buildinglevel: building.get_CurrentLevel(),
											posX: building.get_CoordX(),
											posY: building.get_CoordY(),
											isPaid: true
											};
										  
										  //ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", support_obj, null, null, true); 
                                 } 
								 
								 
                                 if (
								 (
								 (tech == ClientLib.Base.ETechName.Harvester && building.get_CurrentLevel() <= 2) || 
								 (tech == ClientLib.Base.ETechName.Refinery && building.get_CurrentLevel() <= 2) ||
								 (tech == ClientLib.Base.ETechName.PowerPlant && building.get_CurrentLevel() <= 2) ||
								 ( (tech == ClientLib.Base.ETechName.Accumulator && building.get_CurrentLevel() <= 2)) ||
								 ((tech == ClientLib.Base.ETechName.Silo && building.get_CurrentLevel() <= 2) )
								 )
								 
								 
								 

								 ){
								 var LowResbuilding_obj = {
											cityid: city.get_Id(),
											buildingid: building.get_Id(),
											type: "LowResbuilding",
											basename: city.m_SupportDedicatedBaseName,
											building: building.get_UnitGameData_Obj().dn,
											buildinglevel: building.get_CurrentLevel(),
											posX: building.get_CoordX(),
											posY: building.get_CoordY(),
											isPaid: true
											};
								 //ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", building_obj, null, null, true);
								 
								 }
                             /*if (name == "Refinery"  || name == "Power Plant" || name == "Harvester" || name == "Accumulator" || name == "Silo") {
									//if (name == "Silo") {
										var building_obj = {
											cityid: city.get_Id(),
											posX: building.get_CoordX(),
											posY: building.get_CoordY(),
											isPaid: true
										}*/
                                        
/*						  
**************************************************************************************************************************************************************************************************************************************************************************************************************************************
Upgrade Resource Defining 
**************************************************************************************************************************************************************************************************************************************************************************************************************************************							  
	*/                                        
                                        
                                        if (tech == ClientLib.Base.ETechName.Refinery && building.get_CurrentLevel() > 2){
                                            refnum++;
                                             //var refObj = Object();CreditsBonusTimeToComplete
                              				//if(refnum = 0)break;
                                            //console.log(city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[30].ConnectedLinkTypes.d[36].ProvidingToValue, city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[30].ConnectedLinkTypes.d[37].ProvidingToValue );
                               //OwnProdModifiers.d[30].ConnectedLinkTypes.d[36].Value         OwnProdModifiers.d[30].ConnectedLinkTypes.d[37].Value   
                                            
                                            var refPro = city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.CreditsProduction].TotalValue;
											//var refLinkTypes = (city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.CreditsProduction].ConnectedLinkTypes.d[ClientLib.Base.ELinkType.PowerplantCreditBonus].Value) + (city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.CreditsProduction].ConnectedLinkTypes.d[ClientLib.Base.ELinkType.TiberiumCreditProduction].Value);
                                            var refPac = city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.CreditsPackageSize].TotalValue;
                                            var refPacperH = city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.CreditsBonusTimeToComplete].TotalValue;
                                            var refCost = ClientLib.Base.Util.GetUnitLevelResourceRequirements_Obj(buildinglvlup1, building.get_UnitGameData_Obj())[1].Count;
                                            var refLinkTypes0 = 0;
											var refLinkTypes1 = 0;
											if(city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.CreditsProduction].ConnectedLinkTypes.d[36] != undefined){
											 refLinkTypes0 = (city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.CreditsProduction].ConnectedLinkTypes.d[ClientLib.Base.ELinkType.PowerplantCreditBonus].Value);
											var refTotalPro = refPro + (refPac/(refPacperH/3600)) +  refLinkTypes0 ;
											}
											
											if(city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.CreditsProduction].ConnectedLinkTypes.d[37] != undefined){
											refLinkTypes1 = (city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.CreditsProduction].ConnectedLinkTypes.d[ClientLib.Base.ELinkType.TiberiumCreditProduction].Value);
											var refTotalPro = refPro + (refPac/(refPacperH/3600)) +  refLinkTypes0 +  refLinkTypes1  ;
                                           }

   										    var refTotalProOfLevel12 = 605 + (7260/6) + 484 + 605; 
                                            var refProRatio = Math.pow( ((refTotalProOfLevel12/31608)*100)/((refTotalPro/refCost)*100), -1);
                                           	refarr[refnum] = refProRatio;
                                           // refarr[refid] = Ref;
                                            if ((refProRatio > 0) ){/* Math.floor((Math.random()*10)+1)){*/
                                            //console.log(((refTotalProOfLevel12/96000)*100)/((refTotalPro/refCost)*100) );
                                            refarr.sort(function(a,b){return b-a});
                                                
                                            
                                            }
                                            if((Math.max(refProRatio) == refarr[0])){
                                 var Ref_obj = {
											cityid: city.get_Id(),
                                     		basename: city.m_SupportDedicatedBaseName,
											building: building.get_UnitGameData_Obj().dn,
											buildinglevel: building.get_CurrentLevel(),
											posX: building.get_CoordX(),
											posY: building.get_CoordY(),
											isPaid: true
										}
                                 //ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", Ref_obj, null, null, true);
                           
                             }
                                            
                                            }
                                        if (tech == ClientLib.Base.ETechName.PowerPlant && building.get_CurrentLevel() > 2){
                                            pownum++;
                                             //var refObj = Object();CreditsBonusTimeToComplete
                              				
                                            //OwnProdModifiers.d[6].ConnectedLinkTypes.d[29].Value - OwnProdModifiers.d[6].ConnectedLinkTypes.d[38].Value - OwnProdModifiers.d[30].ConnectedLinkTypes.d[42].Value
                                            
                                            var powPro = city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.PowerProduction].TotalValue;
											var powPac = city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.PowerPackageSize].TotalValue;
                                            var powPacperH = city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.PowerBonusTimeToComplete].TotalValue;
                                            var powCost = ClientLib.Base.Util.GetUnitLevelResourceRequirements_Obj(buildinglvlup1, building.get_UnitGameData_Obj())[1].Count;
                                            var powLinkTypes0 = 0;
											var powLinkTypes1 = 0;
											var powLinkTypes2 = 0;
											
                                            
											
											if(city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.PowerProduction].ConnectedLinkTypes.d[29] != undefined ){
											 powLinkTypes0 = city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.PowerProduction].ConnectedLinkTypes.d[ClientLib.Base.ELinkType.AccumulatorPowerBonus].Value ;											var powLinkTypes1 = city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.PowerProduction].ConnectedLinkTypes.d[ClientLib.Base.ELinkType.CrystalCreditProduction].Value ;
                                            var powTotalPro = powPro + (powPac/(powPacperH/3600)) + powLinkTypes0 +  powLinkTypes1 + powLinkTypes2 ;
											var powTotalProOfLevel12 = 605 + (7260/6) + 570 + 456 + 484; 
											//console.log(powLinkTypes0);
											}
											
											if( city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.PowerProduction].ConnectedLinkTypes.d[38] != undefined ){
											 powLinkTypes1 = city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.PowerProduction].ConnectedLinkTypes.d[ClientLib.Base.ELinkType.CrystalCreditProduction].Value ;
                                            var powTotalPro = powPro + (powPac/(powPacperH/3600)) + powLinkTypes0 +  powLinkTypes1 + powLinkTypes2 ;
											var powTotalProOfLevel12 = 605 + (7260/6) + 570 + 456 + 484; 
											//console.log(powLinkTypes1);
											}
											
											if(city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.PowerProduction].ConnectedLinkTypes.d[42] != undefined){
											 powLinkTypes2 = city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.PowerProduction].ConnectedLinkTypes.d[ClientLib.Base.ELinkType.RefineryPowerBonus].Value;
											var powTotalPro = powPro + (powPac/(powPacperH/3600)) + powLinkTypes0 +  powLinkTypes1 + powLinkTypes2 ;
											var powTotalProOfLevel12 = 605 + (7260/6) + 570 + 456 + 484; 
											//console.log(powLinkTypes2);
											}
											
											
											
											
                                            //var powTotalProOfLevel12 = 605 + (7260/6) + 570 + 456 + 484; 
											var powProRatio = Math.pow( ((powTotalProOfLevel12/15840)*100)/((powTotalPro/powCost)*100), -1);
                                           	powarr[pownum] = powProRatio;
                                            
                                            if ((powProRatio > 0) ){/* Math.floor((Math.random()*10)+1)){*/
                                           // console.log(((powTotalProOfLevel12/96000)*100)/((powTotalPro/refCost)*100) );
                                            powarr.sort(function(a,b){return b-a});
                                                
                                            
                                            }
                                            if((Math.max(powProRatio) == powarr[0])){
                                 var Pow_obj = {
											cityid: city.get_Id(),
                                     		basename: city.m_SupportDedicatedBaseName,
											building: building.get_UnitGameData_Obj().dn,
											buildinglevel: building.get_CurrentLevel(),
											posX: building.get_CoordX(),
											posY: building.get_CoordY(),
											isPaid: true
										}
                                 //ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", Pow_obj, null, null, true);
                           
                             }
                                            
                                        }
                                        if (tech == ClientLib.Base.ETechName.Harvester && building.get_CurrentLevel() > 2){
                                            harnum++;   harnum1++;
                                            
                                             var hartibLinkTypes = 0;
											 var harcryLinkTypes = 0;
											 //OwnProdModifiers.d[1].ConnectedLinkTypes.d[ClientLib.Base.ELinkType.SiloTiberiumProduction].Value - 
                              				
                                            if((city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[1,25,33])  
                                              ){//console.log(city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[1,25,33]);
                                            
                                            var hartibPro = city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.TiberiumProduction].TotalValue;
											//var hartibLinkTypes = city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.TiberiumProduction].ConnectedLinkTypes.d[ClientLib.Base.ELinkType.SiloTiberiumProduction].Value;
                                            var hartibPac = city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.TiberiumPackageSize].TotalValue;
                                            var hartibPacperH = city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.TiberiumBonusTimeToComplete].TotalValue;
                                            
											if(city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.TiberiumProduction].ConnectedLinkTypes.d[ClientLib.Base.ELinkType.SiloTiberiumProduction] != undefined){
											hartibLinkTypes = city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.TiberiumProduction].ConnectedLinkTypes.d[ClientLib.Base.ELinkType.SiloTiberiumProduction].Value;
											var harTibTotalPro = hartibPro + (hartibPac/(hartibPacperH/3600)) + hartibLinkTypes;
											}
                                            
                                           
                                            var harCost = ClientLib.Base.Util.GetUnitLevelResourceRequirements_Obj(buildinglvlup1, building.get_UnitGameData_Obj())[1].Count;
                                            
                                            //var harTibTotalPro = hartibPro + (hartibPac/(hartibPacperH/3600)) ;
                                            var harTibTotalProOfLevel12 = 570 + (7260/6) + 380; 
                                            var harTibProRatio = Math.pow( ((harTibTotalProOfLevel12/47520)*100)/((harTibTotalPro/harCost)*100), -1);
                                            
                                            
                                           	
                                            hararr[harnum] = harTibProRatio;
                                            
                                            
                                            if ((harTibProRatio > 0) ){/* Math.floor((Math.random()*10)+1)){*/
                                           // console.log(((harTibTotalProOfLevel12/72000)*100)/((harTibTotalPro/refCost)*100) );
                                            hararr.sort(function(a,b){return b-a});
                                            }
                                                
                                            
                                            
                                            if((Math.max(harTibProRatio) == hararr[0])){
                                 var Har_obj = {
											cityid: city.get_Id(),
                                     		basename: city.m_SupportDedicatedBaseName,
											building: building.get_UnitGameData_Obj().dn,
											buildinglevel: building.get_CurrentLevel(),
											type: "Tiberium",
											posX: building.get_CoordX(),
											posY: building.get_CoordY(),
											isPaid: true
										}
                                 //ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", Har_obj, null, null, true);
                           
                             }
                                            }
                                            if(city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[4,26,34] ){
                                            //console.log(city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[4,26,34]);
                                          
                                             //var refObj = Object();CreditsBonusTimeToComplete
                              				
                                            
                                            
                                           
                                            
                                            var harcryPro = city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.CrystalProduction].TotalValue;
											//var harcryLinkTypes =  city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.CrystalProduction].ConnectedLinkTypes.d[ClientLib.Base.ELinkType.SiloCrystalProduction].Value;
                                            var harcryPac = city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.CrystalPackageSize].TotalValue;
                                            var harcryPacperH = city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.CrystalBonusTimeToComplete].TotalValue;
                                           
                                            var harCryCost = ClientLib.Base.Util.GetUnitLevelResourceRequirements_Obj(buildinglvlup1, building.get_UnitGameData_Obj())[1].Count;
                                            
                                            if(city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.CrystalProduction].ConnectedLinkTypes.d[ClientLib.Base.ELinkType.SiloCrystalProduction] != undefined){
											harcryLinkTypes = city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.CrystalProduction].ConnectedLinkTypes.d[ClientLib.Base.ELinkType.SiloCrystalProduction].Value;
											var harCryTotalPro = harcryPro + (harcryPac/(harcryPacperH/3600)) + harcryLinkTypes;
											}
                                            
                                            //var harCryTotalPro = harcryPro + (harcryPac/(harcryPacperH/3600));
                                            var harCryTotalProOfLevel12 = 570 + (7260/6) + 380; 
                                            var harCryProRatio = Math.pow( ((harCryTotalProOfLevel12/47520)*100)/((harCryTotalPro/harCryCost)*100), -1);
                                           	
                                           
                                            hararr1[harnum1] = harCryProRatio;
                                            
                                            if ( harCryProRatio > 0 ){// Math.floor((Math.random()*10)+1)){
                                            //console.log(((harCryTotalProOfLevel12/96000)*100)/((harCryTotalPro/harCryCost)*100) );
                                          
                                            hararr1.sort(function(a,b){return b-a});
                                                
                                            
                                            }
                                            if((Math.max(harCryProRatio) == hararr1[0])){
                                 var Har1_obj = {
											cityid: city.get_Id(),
                                     		basename: city.m_SupportDedicatedBaseName,
											building: building.get_UnitGameData_Obj().dn,
											buildinglevel: building.get_CurrentLevel(),
											type: "Crystal",
											posX: building.get_CoordX(),
											posY: building.get_CoordY(),
											isPaid: true
										}
                                 //ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", Har1_obj, null, null, true);
                          
                             }
                                            
                                            }
                                            
                                        }
                                        if(tech == ClientLib.Base.ETechName.Accumulator && building.get_CurrentLevel() > 2){
                                           accnum++;
                                             //var refObj = Object();CreditsBonusTimeToComplete
                              				
                                            var accLinkTypes = 0;
											//OwnProdModifiers.d[6].ConnectedLinkTypes.d[41].Value
                                            
                                            var accPro = city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.PowerProduction].TotalValue;
											//var accLinkTypes = city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.PowerProduction].ConnectedLinkTypes.d[ClientLib.Base.ELinkType.PowerPlantAccumulatorBonus].Value;
                                            var accSto = city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.PowerStorage].TotalValue;
                                            var accCost = ClientLib.Base.Util.GetUnitLevelResourceRequirements_Obj(buildinglvlup1, building.get_UnitGameData_Obj())[1].Count;
                                            //var accTotalPro = accPro ;
                                             
                                            if(city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.PowerProduction].ConnectedLinkTypes.d[ClientLib.Base.ELinkType.PowerPlantAccumulatorBonus] != undefined){
											var accLinkTypes = city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.PowerProduction].ConnectedLinkTypes.d[ClientLib.Base.ELinkType.PowerPlantAccumulatorBonus].Value;
											var accTotalPro = accPro +  accLinkTypes;
											}
											
											var accTotalProOfLevel12 = 456 ;
											var accProRatio = Math.pow( ((accTotalProOfLevel12/15840)*100)/((accTotalPro/accCost)*100), -1);
                                           	accarr[accnum] = accProRatio;
                                          
                                            if ((accProRatio > 0) ){/* Math.floor((Math.random()*10)+1)){*/
                                            //console.log(((accTotalProOfLevel12/36360)*100)/((accTotalPro/accCost)*100) );
                                            accarr.sort(function(a,b){return b-a});
                                                
                                            
                                            }
                                            if((Math.max(accProRatio) == accarr[0])){
                                 var Acc_obj = {
											cityid: city.get_Id(),
                                     		basename: city.m_SupportDedicatedBaseName,
											building: building.get_UnitGameData_Obj().dn,
											buildinglevel: building.get_CurrentLevel(),
											posX: building.get_CoordX(),
											posY: building.get_CoordY(),
											isPaid: true
										}
                                 //ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", Acc_obj, null, null, true);
                           
                             				} 
                                        }
                                        if(tech == ClientLib.Base.ETechName.Silo && building.get_CurrentLevel() > 2){
                                        silnum++;
                                            // console.log(city.GetBuildingCache(bulid).DetailViewInfo);
											 //OwnProdModifiers.d[1].ConnectedLinkTypes.d[39].Value - OwnProdModifiers.d[4].ConnectedLinkTypes.d[40].Value
                              				//console.log(city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d);
                                            var silCryLinkType = 0;
                                            var silTibLinkType = 0;
                                            var silCryPro = city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.CrystalProduction].TotalValue;
											//var silCryLinkType = city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.CrystalProduction].ConnectedLinkTypes.d[ClientLib.Base.ELinkType.HarvesterCrystalProduction].Value;
                                            var silTibPro = city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.TiberiumProduction].TotalValue;
											//var silTibLinkType = city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.CrystalProduction].ConnectedLinkTypes.d[ClientLib.Base.ELinkType.HarvesterTiberiumProduction].Value;
                                            var silCrySto = city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.CrystalStorage].TotalValue;
                                            var silTibSto = city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.TiberiumStorage].TotalValue;
                                            var silCost = ClientLib.Base.Util.GetUnitLevelResourceRequirements_Obj(buildinglvlup1, building.get_UnitGameData_Obj())[1].Count;
                                            
											if(city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.CrystalProduction].ConnectedLinkTypes.d[ClientLib.Base.ELinkType.HarvesterCrystalProduction] != undefined){
											silCryLinkType = city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.CrystalProduction].ConnectedLinkTypes.d[ClientLib.Base.ELinkType.HarvesterCrystalProduction].Value;
											 var silTotalPro = silCryPro + silTibPro + silCryLinkType;
											}
											
											if(city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.TiberiumProduction].ConnectedLinkTypes.d[ClientLib.Base.ELinkType.HarvesterTiberiumProduction] != undefined){
											silTibLinkType = city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.TiberiumProduction].ConnectedLinkTypes.d[ClientLib.Base.ELinkType.HarvesterTiberiumProduction].Value;
											var silTotalPro = silCryPro + silTibPro + silCryLinkType + silTibLinkType;
											}
											
											
                                           
                                            var silTotalProOfLevel12 = 380 + 380 ; 
                                            var silProRatio = Math.pow( ((silTotalProOfLevel12/15840)*100)/((silTotalPro/silCost)*100), -1);
                                            
                                            
                                            silarr[silnum] = silProRatio;
                                            
                                            if ((silProRatio >= 0) ){// Math.floor((Math.random()*10)+1)){
                                            //console.log(((accTotalProOfLevel12/36360)*100)/((accTotalPro/accCost)*100) );
                                            silarr.sort(function(a,b){return b-a});
                                                
                                            
                                            }
                                            if((Math.max(silProRatio) == silarr[0])){
                                 var Sil_obj = {
											cityid: city.get_Id(),
                                     		basename: city.m_SupportDedicatedBaseName,
											building: building.get_UnitGameData_Obj().dn,
											buildinglevel: building.get_CurrentLevel(),
											posX: building.get_CoordX(),
											posY: building.get_CoordY(),
											isPaid: true
										}
                                 //ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", Sil_obj, null, null, true);
                           
                             				}
                                        }
                                 //if((Ref_obj.toString() != "undefined" || Pow_obj.toString() != "undefined" || Har_obj.toString() != "undefined" || Har1_obj.toString() != "undefined" || Acc_obj.toString() != "undefined" || Sil_obj.toString() != "undefined")&&
                                  // (refarr.toString() != "[]" || powarr.toString() != "[]" || hararr.toString() != "[]" || hararr1.toString() != "[]" || accarr.toString() != "[]" || silarr.toString() != "[]")){
                                       
                                    
                                // }   
                                 //}
                                      
                                   
								}
                     
					 /* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
					 if( (Ref_obj != undefined) || (Pow_obj != undefined) || (Har_obj != undefined) || (Har1_obj != undefined) || (Acc_obj != undefined) || (Sil_obj != undefined)){
                       console.log(Ref_obj, refarr);console.log(Pow_obj, powarr);console.log(Har_obj, hararr); console.log(Har1_obj, hararr1);console.log(Acc_obj, accarr);console.log(Sil_obj, silarr);
                           
                             ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", Sil_obj, null, null, true);
                              ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", Acc_obj, null, null, true);
                             ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", Har1_obj, null, null, true);
                             ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", Har_obj, null, null, true);
                             ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", Pow_obj, null, null, true);
                              ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", Ref_obj, null, null, true);
							  }
						/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	  
							  */
	/*						  
**************************************************************************************************************************************************************************************************************************************************************************************************************************************
Upgrade decisions
**************************************************************************************************************************************************************************************************************************************************************************************************************************************							  
	*/						 
							  maxarr = [refarr[0], powarr[0], hararr[0], hararr1[0], accarr[0], silarr[0]];
							  maxarr.sort(function(a,b){return b-a});
							  
							   if((offRT_obj != undefined)){
							  
							  if((powMax >= offRT_obj.buildPowCost) ){
							  console.log(offRT_obj);
							  ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", offRT_obj, null, null, true);
							  offRT_obj = {};
							  break;
							  }else{continue;}
							  //Choose to use this is up to you. it will upgrade silos or accs if you cant put enought in them to upgrade OffRT. 
							/*
							  else{
								  if( (tibMax < offRT_obj.buildTibCost)){
										  if((Sil_obj != undefined)&& (silarr.toString() != "") && (maxarr[0] == silarr[0])  ){
											console.log(Sil_obj, silarr);
											ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", Sil_obj, null, null, true);
											Sil_obj = {};
											silarr = [];
										  break;
										  }
									  }
								  if( (powMax < offRT_obj.buildPowCost) ){
									  if( (Acc_obj != undefined)&& (accarr.toString() != "") && (maxarr[0] == accarr[0]) ){
										console.log(Acc_obj, accarr);
										ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", Acc_obj, null, null, true);
										Acc_obj = {};
										accarr = [];
									break;
									  }
								  }
								  
								}
							*/
							  
							 
							  }
							  
							  if((building_obj != undefined) && ((_this.totalRepairTime(airRT, vehRT, infRT) < 14400)&&(building_obj.buildinglevel < baselvl))){
							  console.log(building_obj);
							  ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", building_obj, null, null, true);
							  building_obj = {};
							  break;
							  }
							  
							  if((LowResbuilding_obj != undefined) ){
							  console.log(LowResbuilding_obj);
							  ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", LowResbuilding_obj, null, null, true);
							  LowResbuilding_obj = {};
							  break;
							  }
							  
							 if((support_obj != undefined) && ((_this.totalRepairTime(airRT, vehRT, infRT) < 14400)&&(support_obj.buildinglevel < baselvl))){
							  console.log(support_obj);
							  ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", support_obj, null, null, true);
							  support_obj = {};
							  
							  break;}
							  
							  if( (Ref_obj != undefined) && (refarr.toString() != "") && (maxarr[0] == refarr[0])&& ((_this.totalRepairTime(airRT, vehRT, infRT) < 14400)||(Ref_obj.buildinglevel < (baselvl + 3)))){
								console.log(Ref_obj, refarr);
								ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", Ref_obj, null, null, true);
								Ref_obj = {};
								refarr = [];
								maxarr = [];
							 break; }
							  
							  if(  (Pow_obj != undefined)&& (powarr.toString() != "") && (maxarr[0] == powarr[0]) && ((_this.totalRepairTime(airRT, vehRT, infRT) < 14400)||(Pow_obj.buildinglevel < (baselvl + 3)))){
								console.log(Pow_obj, powarr);
								ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", Pow_obj, null, null, true);
								Pow_obj = {};
								powarr = [];
								maxarr = [];
                             break;
							  }
							  
							  if( (Har_obj != undefined)&& (hararr.toString()!= "") && (maxarr[0] == hararr[0])&& ((_this.totalRepairTime(airRT, vehRT, infRT) < 14400)||(Har_obj.buildinglevel < (baselvl - 3)))){
								console.log(Har_obj, hararr);
								ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", Har_obj, null, null, true);
								Har_obj = {};
								hararr = [];
								maxarr = [];
                             break;
							  }
							  
							  if( (Har1_obj != undefined)&& (hararr1.toString() != "") && (maxarr[0] == hararr1[0])&& ((_this.totalRepairTime(airRT, vehRT, infRT) < 14400)||(Har1_obj.buildinglevel < (baselvl - 3)))){
								console.log(Har1_obj, hararr1);
								ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", Har1_obj, null, null, true);
								Har1_obj = {};
								hararr1 = [];
								maxarr = [];
                             break;
							  }
							  
							  if( (Acc_obj != undefined)&& (accarr.toString() != "") && (maxarr[0] == accarr[0]) &&   ((_this.totalRepairTime(airRT, vehRT, infRT) < 14400)||(Acc_obj.buildinglevel < (baselvl + 100)))    ){
								console.log(Acc_obj, accarr);
								ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", Acc_obj, null, null, true);
								Acc_obj = {};
								accarr = [];
								maxarr = [];
                            break;
							  }
							  
							  if((Sil_obj != undefined)&& (silarr.toString() != "") && (maxarr[0] == silarr[0])&& ((_this.totalRepairTime(airRT, vehRT, infRT) < 14400)||(Sil_obj.buildinglevel < (baselvl + 100)))  ){
								console.log(Sil_obj, silarr);
								ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", Sil_obj, null, null, true);
								Sil_obj = {};
								silarr = [];
								maxarr = [];
                              break;
							  }
/*						  
**************************************************************************************************************************************************************************************************************************************************************************************************************************************
Upgrade decisions end
**************************************************************************************************************************************************************************************************************************************************************************************************************************************							  
	*/								
                               
							}
                             
						}
						
						
					}
				});
			}
		} catch (e) {
			console.log("createFlunikTools: ", e);
		}
		
		function FlunikTools_checkIfLoaded() {
			try {
			if (typeof qx != 'undefined' && qx.core.Init.getApplication() && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION) && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION).isVisible()) {
					createFlunikTools();
					if (typeof ClientLib.API.Util.GetUnitMaxHealth == 'undefined'){
							for (var key in ClientLib.Base.Util)
							{
								var strFunction = ClientLib.Base.Util[key].toString();
								if ((strFunction.indexOf("function (a,b,c)") == 0 || strFunction.indexOf("function (a,b)") == 0) &&
									 strFunction.indexOf("*=1.1") > -1)
								{
										FlunikTools.Main.getInstance().GetUnitMaxHealth = ClientLib.Base.Util[key];
										console.log("FlunikTools.Main.getInstance().GetUnitMaxHealth = ClientLib.Base.Util["+key+"]");
										break;
								}
							}
						}else{
							FlunikTools.Main.getInstance().GetUnitMaxHealth = ClientLib.API.Util.GetUnitMaxHealth;	
							

						
					}
					                // ClientLib.Data.CityUnits.prototype.get_OffenseUnits
                strFunction = ClientLib.Data.CityUnits.prototype.HasUnitMdbId.toString();
                var searchString = "for (var b in {d:this.";
                var startPos = strFunction.indexOf(searchString) + searchString.length;
                var fn_name = strFunction.slice(startPos, startPos + 6);
                strFunction = "var $createHelper;return this." + fn_name + ";";
                var fn = Function('', strFunction);
                ClientLib.Data.CityUnits.prototype.get_OffenseUnits = fn;
                console.log("ClientLib.Data.CityUnits.prototype.get_OffenseUnits = function(){var $createHelper;return this." + fn_name + ";}");

                // ClientLib.Data.CityUnits.prototype.get_DefenseUnits
                strFunction = ClientLib.Data.CityUnits.prototype.HasUnitMdbId.toString();
                searchString = "for (var c in {d:this.";
                startPos = strFunction.indexOf(searchString) + searchString.length;
                fn_name = strFunction.slice(startPos, startPos + 6);
                strFunction = "var $createHelper;return this." + fn_name + ";";
                fn = Function('', strFunction);
                ClientLib.Data.CityUnits.prototype.get_DefenseUnits = fn;
                console.log("ClientLib.Data.CityUnits.prototype.get_DefenseUnits = function(){var $createHelper;return this." + fn_name + ";}");


					FlunikTools.Main.getInstance();
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
	}
		
	try
	{
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