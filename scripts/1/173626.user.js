// ==UserScript==
// @name	NovaGama Comand
// @namespace	https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @include		https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @icon		http://img577.imageshack.us/img577/7893/j1vj.png
// @version	4
// @description	NovaGama Comand
// ==/UserScript==


//-------------------------------Manager-------------------------//




(function () 
{
	var injectFunction = function() 
	{
		function createClasses()
		{
			qx.Class.define("TGCTools", 
			{
				type: "singleton",
				extend: qx.core.Object,
            
				construct: function()
				{
					try
					{
						//Collect All Resources from other bases button
						/*var playArea = qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.OVL_PLAYAREA);
						
						var transAllResBtn = new qx.ui.form.Button("Transfer All");
						transAllResBtn.set
						({
							alignY: "middle",
							width: 75,
							height: 30,
							toolTipText: "Transfers all resources from the other bases to this one",
							appearance: "button-text-small"
						});
						transAllResBtn.addListener("click", this._transferAllResources, this);
						playArea.add(transAllResBtn, { top: 5, right: 300 });*/
						
						var app = qx.core.Init.getApplication()
						var bar = app.getOptionsBar();
						var cntButton = bar.getChildren()[2];
						this.managerBtn = new qx.ui.form.Button(" POI Manager").set({alignX: "center"});
						this.managerBtn.set
						({
							alignY: "middle",
							width: 75,
							height: 25,
							toolTipText: "Opens popup menu with buttons to management tools",
							appearance: "button-text-small"
						});
						this.managerBtn.addListener("click", this._popupManager, this);
						cntButton.removeAt(0);
						cntButton.addAt(this.managerBtn, 1);
						
/*						//var scanBtn = new qx.ui.form.Button("", "webfrontend/ui/icons/icon_mainui_base_button.png").set
						var scanBtn = new qx.ui.form.Button("", "FactionUI/icons/icon_attack_start_combat.png").set
						({
							center: true,
							show: "icon",
							alignY: "middle",
							width: 40,
							height: 40,
							toolTipText: "Opens up Base Scanner",
							appearance: "button-text-small"
						});
						scanBtn.addListener("click", this._openScanner, this);
*/						
						var poiBtn = new qx.ui.form.Button("", "webfrontend/battleview/neutral/gui/icn_mutants.png").set
						({
							center: true,
							show: "icon",
							alignY: "middle",
							width: 40,
							height: 40,
							toolTipText: "Opens POI Management Tool",
							appearance: "button-text-small"
						});
						poiBtn.addListener("click", this._openPOIWindow, this);
						
/*						var upgradeBtn = new qx.ui.form.Button("", "FactionUI/icons/icon_mode_upgrade.png").set
						({
							center: true,
							show: "icon",
							alignY: "middle",
							width: 40,
							height: 40,
							toolTipText: "Opens Upgrade Management Tool",
							appearance: "button-text-small"
						});
						upgradeBtn.addListener("click", this._openUpgradeWindow, this);
*/						
						this.managerPopup = new qx.ui.popup.Popup(new qx.ui.layout.Grid(5)).set({
							width: 65,
							height: 65,
							allowGrowY: false,
							allowGrowX: false,
							padding: 5,
							position: "top-right"
						});
						//this.managerPopup.add(scanBtn, {row: 0, column: 0});
						this.managerPopup.add(poiBtn, {row: 0, column: 1});
						//this.managerPopup.add(upgradeBtn, {row: 0, column: 2});
						this.managerPopup.setAutoHide(false);
						//this.add(this.managerPopup);
					}
					catch(e)
					{
						console.log("Error initializing TGCTools Class: " + e.toString());
					}
				},
				
				destruct: function()
				{
				},
				
				members: 
				{
					managerBtn: null,
					managerPopup: null,
					
					attachNetEvent: function()
					{
						console.log("Need to assign correct function!");
					},
					
					formatNumbersCompact: function()
					{
						console.log("Need to assign correct function!");
					},
					
					numberWithCommas: function(x)
					{
						var parts = x.toString().split(".");
						parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
						return parts.join(".");
					},
					
					/*_transferAllResources: function()
					{
						try
						{
							playerCities = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities();
							ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
							ownCityID = ownCity.get_Id();
							
							//playerCities.d contains the city ID's
							for (var cityID in playerCities.d)
							{
								transCity = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(cityID);
								console.log(transCity.get_Name());
								var transID = transCity.get_Id();
								console.log(transID);
								if (transID != ownCityID)
								{
									var tib = Math.round(transCity.GetResourceCount(1) - 0.5);
									console.log("Tiberium: " + tib);
									var cry = Math.round(transCity.GetResourceCount(2) - 0.5);
									console.log("Crystal: " + cry);
									ownCity.SelfTrade(transID, 1, tib); //1 is for tiberium
									ownCity.SelfTrade(transID, 2, cry);
								}
							}
							console.log("Transfer of All Resources Complete");
						}
						catch(e)
						{
							console.log("Error Transferring All Resources to City: " + e.toString());
						}
					},*/
					
/*					_openScanner: function()
					{
						if (TGCTools.BaseScanner.getInstance().isVisible())
							TGCTools.BaseScanner.getInstance().close();
						else
						{
							TGCTools.BaseScanner.getInstance().open();
							this.managerPopup.hide();
						}
					},
*/					
					_openPOIWindow: function()
					{
						if (TGCTools.POIWindow.getInstance().isVisible())
						{
							TGCTools.POIWindow.getInstance().close();
						}
						else
						{
							TGCTools.POIWindow.getInstance().open();
							this.managerPopup.hide();
						}
					},
					
/*					_openUpgradeWindow: function()
					{
						if (TGCTools.UpgradeWindow.getInstance().isVisible())
						{
							TGCTools.UpgradeWindow.getInstance().close();
						}
						else
						{
							TGCTools.UpgradeWindow.getInstance().open();
							this.managerPopup.hide();
						}
					},
*/					
					_popupManager: function()
					{
						if (this.managerPopup.isVisible())
						{
							this.managerPopup.hide();
						}
						else
						{
							this.managerPopup.placeToWidget(this.managerBtn, false);
							this.managerPopup.show();
						}
					}
				}
			});
			
/*			qx.Class.define("TGCTools.BaseScanner", 
			{
				type: "singleton",
				extend:	qx.ui.window.Window,
            
				construct: function()
				{
					try
					{
						this.base(arguments);
						this.setLayout(new qx.ui.layout.VBox());
					
						this.set({
							width: 700,
							caption: "Base Scanner",
							padding: 5,
							allowMaximize: false,
							showMaximize: false,
							allowMinimize: false,
							showMinimize: false,	
						});
						
						var scanBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(2));
						var scanBtn = new qx.ui.form.Button("Scan").set({
							allowGrowY: false,
							width: 60, 
							height: 20,
							toolTipText: "Scans all nearby bases within 20 spaces",
							appearance: "button-text-small"
						});
						
						scanBtn.addListener("click", function()
						{
							var ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
							var object = ClientLib.Vis.VisMain.GetInstance().get_SelectedObject();
							ClientLib.Vis.VisMain.GetInstance().set_SelectedObject(object);
							TGCTools.BaseScanner.getInstance()._waitForPlayerCity(ownCity);
						}, this);
						
						stopBtn = new qx.ui.form.Button("Stop").set({
							allowGrowY: false,
							width: 60, 
							height: 20,
							toolTipText: "Stops scan",
							appearance: "button-text-small"
						});
						this.stopScan = false;
						
						stopBtn.addListener("click", this.setStopScan, this);
						stopBtn.setEnabled(false);
						
						//var cityTypeLabel = new qx.ui.basic.Label("City Type:").set({marginLeft: 15, marginRight: 5});
						//cityTypeLabel.setTextColor("white");
						this.cityTypeSelectBox =  new qx.ui.form.SelectBox().set({width: 125, marginBottom: 10});
						this.cityTypeSelectBox.add(new qx.ui.form.ListItem("City Type (All)", null, "0"));
						this.cityTypeSelectBox.add(new qx.ui.form.ListItem("Camp/Outpost Only", null, "1"));
						this.cityTypeSelectBox.add(new qx.ui.form.ListItem("Camp/Outpost/NPC Base", null, "2"));
						this.cityTypeSelectBox.add(new qx.ui.form.ListItem("Camp/Outpost/Player", null, "3"));
						this.cityTypeSelectBox.add(new qx.ui.form.ListItem("NPC Base Only", null, "4"));
						this.cityTypeSelectBox.add(new qx.ui.form.ListItem("NPC Base/Player", null, "5"));
						this.cityTypeSelectBox.add(new qx.ui.form.ListItem("Player Only", null, "6"));
						
						var layoutBtn = new qx.ui.form.Button("Layouts").set({
							allowGrowY: false,
							width: 60, 
							height: 20,
							toolTipText: "Opens new window that displays the layouts of the cities found.",
							appearance: "button-text-small"
						});
						layoutBtn.addListener("click", this._openLayoutWindow, this);
						
						this.distanceSelectBox = new qx.ui.form.SelectBox().set({width: 125, marginBottom: 10});
						
						this.distanceSelectBox.add(new qx.ui.form.ListItem("Distance (All)", null, "0"));
						for (var i = 1; i <= 20; i++)
						{
							var distSelectItem = new qx.ui.form.ListItem("<= " + i + "", null, "" + i + "");
							this.distanceSelectBox.add(distSelectItem);
						}
						
						this.cpCostBox = new qx.ui.form.SelectBox().set({width: 125, marginBottom: 10});
						
						this.cpCostBox.add(new qx.ui.form.ListItem("CP Cost (All)", null, "0"));
						for (var i = 11; i <= 45; i += 2)
						{
							var cpCostItem = new qx.ui.form.ListItem("<= " + i + "", null, "" + i + "");
							this.cpCostBox.add(cpCostItem);
						}
						
						this.layoutSelectBox = new qx.ui.form.SelectBox().set({width: 125, marginBottom: 10});
						var allLayouts =  new qx.ui.form.ListItem("Layout Type (All)", null, "0");
						var moreTib = new qx.ui.form.ListItem("7 Tib / 5 Cry", null, "1");
						var equalTibCry = new qx.ui.form.ListItem("6 Tib / 6 Cry", null, "2");
						var moreCry = new qx.ui.form.ListItem("5 Tib / 7 Cry", null, "3");
						this.layoutSelectBox.add(allLayouts);
						this.layoutSelectBox.add(moreTib);
						this.layoutSelectBox.add(equalTibCry);
						this.layoutSelectBox.add(moreCry);

						scanBox.add(scanBtn);
						scanBox.add(stopBtn);
						scanBox.add(layoutBtn);
						scanBox.add(this.cityTypeSelectBox);
						scanBox.add(this.distanceSelectBox);
						scanBox.add(this.cpCostBox);
						scanBox.add(this.layoutSelectBox);
						
						this.add(scanBox);
						
						this.scanTableModel = new qx.ui.table.model.Simple();
						this.scanTableModel.setColumns(["ID", "Level", "Name", "Owner", "Coords", "Distance", "CP Cost", "Loot/CP", "Total Loot", "Tiberium", "Crystals", "Credits", "RP"]);
						this.scanTable = new qx.ui.table.Table(this.scanTableModel);
						this.scanTable.setColumnWidth(1, 45);
						this.scanTable.setColumnWidth(4, 60);
						this.scanTable.setColumnWidth(5, 65);
						this.scanTable.setColumnWidth(6, 60);
						this.scanTable.getSelectionModel().setSelectionMode(qx.ui.table.selection.Model.SINGLE_SELECTION);
						this.scanTable.addListener("cellDblclick", function(evt)
						{
							var row = evt.getRow();
							var id = parseInt(this.scanTableModel.getValueById("ID", row));
							//var city = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(id);

							ClientLib.Data.MainData.GetInstance().get_Cities().set_CurrentCityId(id);
							 
							//Set it to the right army layout
							setTimeout(function(){
								webfrontend.gui.UtilView.openVisModeInMainWindow(ClientLib.Data.PlayerAreaViewMode.pavmCombatSetupDefense, id, false);
								var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();
								var ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
								var formationManager = ownCity.get_CityArmyFormationsManager();
								ownCity.get_CityArmyFormationsManager().set_CurrentTargetBaseId(city.get_Id());
							}, 1000);
						}, this);
						this.add(this.scanTable);
						
						var scanStatusBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(2));
						this.scanStatus = new qx.ui.basic.Label("");
						this.scanStatus.setTextColor("white");
						scanStatusBox.add(this.scanStatus);
						
						this.add(scanStatusBox);

						this.resourceInfo = new Array();
						this.gotResources = false;
						this.scannedCities = new Array();
						this.tableData = new Array();
						this.loopCount = 0;
					}
					catch(e)
					{
						console.log("Error initializing TGCTools Class: " + e.toString());
					}
				},
				
				destruct: function()
				{
				},
				
				members: 
				{
					scanTable: null,
					scanTableModel: null,
					scannedCities: null,
					tableData: null,
					scanStatus: null,
					distanceSelectBox: null,
					cpCostBox: null,
					layoutSelectBox: null,
					gotResources: null,
					resourceInfo: null,
					loopCount: null,
					
					_openLayoutWindow:function()
					{
						if (TGCTools.BaseScanner.TerrainLayout.getInstance().isVisible())
						{
							TGCTools.BaseScanner.TerrainLayout.getInstance().close();
						}
						else
						{
							TGCTools.BaseScanner.TerrainLayout.getInstance().open();
							TGCTools.BaseScanner.TerrainLayout.getInstance().getLayouts();
						}
					},
					
					_waitForPlayerCity: function(ownCity)
					{
						stopBtn.setEnabled(true);
						if (ownCity.m_Level <= 0)
						{
							(function(ownCity)
							{
								setTimeout(function() 
								{
									TGCTools.BaseScanner.getInstance()._waitForPlayerCity(ownCity);
								}, 1000);
							}(ownCity));
						}
						else
						{
							this._scanBases(ownCity);
						}
					},
				
					_scanBases: function(ownCity)
					{
						if(this.stopScan == true)
						{
							this.stopScan = false;
							this._getNextScannedCity("stop");
							return;
						}
							
						var count = 0;
						if (this.scannedCities.length > 0)
						{
							this.scannedCities = new Array();
							this.tableData = new Array();
							var numRows = this.scanTableModel.getRowCount();
							
							this.scanTableModel.removeRows(0, numRows, true);
						}
							
						this.scanStatus.setValue("Scanning for Cities - found: " + count);
						//var ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
						var ownCoordsX = ownCity.get_PosX();
						var ownCoordsY = ownCity.get_PosY();
						var maxDist = this.distanceSelectBox.getSelection()[0].getModel();
						var maxCP = this.cpCostBox.getSelection()[0].getModel();
						var cityType = this.cityTypeSelectBox.getSelection()[0].getModel();
						
						if (maxDist == "0")
							maxDist = 20;
							
						if (maxCP == "0")
							maxCP = 45;
						
						for (var x = -maxDist; x <= maxDist; x++)
						{
							if(this.stopScan == true)
							{
								this.stopScan = false;
								this._getNextScannedCity("stop");
								return;
							}
							for (var y = -maxDist; y <= maxDist; y++)
							{
								if (x == 0 && y == 0) continue;
									
								var scanX = ownCoordsX + x;
								var scanY = ownCoordsY + y;
								var distance = ClientLib.Base.Util.CalculateDistance(ownCoordsX, ownCoordsY, scanX, scanY);
								if(distance > maxDist)
									continue;
								
								var cpCost = ownCity.CalculateAttackCommandPointCostToCoord(scanX, scanY);
								
								if (cpCost > maxCP)
									continue;
								
								var width = ClientLib.Vis.VisMain.GetInstance().get_Region().get_GridWidth();
								var height = ClientLib.Vis.VisMain.GetInstance().get_Region().get_GridHeight();
								
								var object = ClientLib.Vis.VisMain.GetInstance().get_Region().GetObjectFromPosition(scanX * width, scanY * height);
								//ClientLib.Vis.VisMain.GetInstance().get_Region().GetObjectFromPosition(245 * 128, 366 * 96);
								if (object != null)
								{
									cityAttr = {};
									cityAttr.type = object.get_VisObjectType();
									switch(cityAttr.type)
									{
										case ClientLib.Vis.VisObject.EObjectType.RegionNPCBase:
											cityAttr.name = "Base";
											cityAttr.owner = "Forgotten";
											break;
										case ClientLib.Vis.VisObject.EObjectType.RegionNPCCamp:
											cityAttr.name = "Camp/Outpost";
											cityAttr.owner = "Forgotten";
											break;
										case ClientLib.Vis.VisObject.EObjectType.RegionCityType:
											if (object.IsOwnBase())
												continue;
											cityAttr.name = object.get_Name();
											cityAttr.owner = object.get_PlayerName();
											break;

										default: continue; break;
									}
									
									//Is it a selected type
									if (cityType == 1 && (cityAttr.type == ClientLib.Vis.VisObject.EObjectType.RegionCityType || cityAttr.type == ClientLib.Vis.VisObject.EObjectType.RegionNPCBase))
										continue;
									else if (cityType == 2 && cityAttr.type == ClientLib.Vis.VisObject.EObjectType.RegionCityType)
										continue;
									else if (cityType == 3 && cityAttr.type == ClientLib.Vis.VisObject.EObjectType.RegionNPCBase)
										continue
									else if (cityType == 4 && (cityAttr.type == ClientLib.Vis.VisObject.EObjectType.RegionCityType || cityAttr.type == ClientLib.Vis.VisObject.EObjectType.RegionNPCCamp))
										continue;
									else if (cityType == 5 && cityAttr.type == ClientLib.Vis.VisObject.EObjectType.RegionNPCCamp)
										continue;
									else if (cityType == 6 && (cityAttr.type == ClientLib.Vis.VisObject.EObjectType.RegionNPCBase || cityAttr.type == ClientLib.Vis.VisObject.EObjectType.RegionNPCCamp))
										continue;
									
									if (object.get_ConditionDefense() == 0)
										continue;
									count++;
									this.scanStatus.setValue("Scanning for Cities - found: " + count);
									cityAttr.id = object.get_Id();
									
									cityAttr.level = object.get_BaseLevel();
									cityAttr.coords = scanX + ":" + scanY;
									cityAttr.distance = distance;
									cityAttr.cp = cpCost;
									this.scannedCities.push(cityAttr);
								}
							}
						}
						
						this.scanIdx = 0;
						this._getScannedCityData();
					},
					
					_getScannedCityData: function()
					{
						if (this.scannedCities.length == 0)
							return;
							
						if(this.stopScan == true)
						{
							this.stopScan = false;
							this._getNextScannedCity("stop");
							return;
						}	

						this.scanStatus.setValue("Retrieving City Information: (" + (this.scanIdx + 1) + " of " + this.scannedCities.length + ")");						
						var cityID = this.scannedCities[this.scanIdx].id;
					
						//Select Current Base
						ClientLib.Data.MainData.GetInstance().get_Cities().set_CurrentCityId(cityID);
						var thisCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();
						var thisVisCity =  ClientLib.Vis.VisMain.GetInstance().get_City();
						
						this.loopCount = 0;
						this._waitForCity(thisCity, thisVisCity);
					},
					
					_waitForCity: function(city, visCity)
					{
						if(this.stopScan == true)
						{
							this.stopScan = false;
							this._getNextScannedCity("stop");
							return;
						}
						
						if ((visCity.get_CurrentCityId() <= 0 || city.m_Level <= 0) && this.loopCount <= 10)
						{
							this.loopCount++;
							(function(city, visCity) 
							{
								setTimeout(function() 
								{
									TGCTools.BaseScanner.getInstance()._waitForCity(city, visCity);
								}, 1000);
							}(city, visCity));
						}
						else if (this.loopCount > 10)
						{
							this._getNextScannedCity();
							return;
						}
						else
						{
							this.resourceInfo = this.getCityResourcesAndLayout(city, visCity);
							this._waitForResources(city, visCity);
						}
					},
					
					_waitForResources: function(city, visCity)
					{
						if(this.stopScan == true)
						{
							this.stopScan = false;
							this._getNextScannedCity("stop");
							return;
						}
						
						if (this.gotResources == false)
						{
							(function(city, visCity) 
							{
								setTimeout(function() 
								{
									TGCTools.BaseScanner.getInstance()._waitForResources(city, visCity);
								}, 1000);
							}(city, visCity));
						}
						else
						{
							this.gotResources = false;
							this._scannedCityInfo(city, visCity);
						}
					},
					
					_scannedCityInfo: function(city, visCity)
					{
						if(this.stopScan == true)
						{
							this.stopScan = false;
							this._getNextScannedCity("stop");
							return;
						}
						
						var cityObj = this.scannedCities;
						idx = this.scanIdx;
						var info = this.resourceInfo;
						
						var layoutType = parseInt(this.layoutSelectBox.getSelection()[0].getModel());
						if (layoutType == 1 && (info.tibCount != 7 && info.cryCount != 5))
						{
							this._getNextScannedCity();
							return;
						}
						else if (layoutType == 2 && (info.tibCount != 6 || info.cryCount != 6))
						{
							this._getNextScannedCity();
							return;
						}
						else if (layoutType == 3 && (info.tibCount != 5 || info.cryCount != 7))
						{
							this._getNextScannedCity();
							return;
						}

						cityData = {};
						cityData.scanInfo = cityObj[idx];
						cityData.loot = info.loot;
						cityData.layout = info.layout;
						
						var totalLoot = info.loot[1] + info.loot[2] + info.loot[3] + info.loot[6];
						var lootPerCP = totalLoot / cityObj[idx].cp;
			
						this.tableData.push(cityData); //Important
						this.scanTableModel.addRows([[cityObj[idx].id.toString(), cityObj[idx].level, cityObj[idx].name, cityObj[idx].owner, cityObj[idx].coords, cityObj[idx].distance, cityObj[idx].cp, lootPerCP, totalLoot, info.loot[1], info.loot[2], info.loot[3], info.loot[6]]]);
						this._getNextScannedCity();
					},
					
					_getNextScannedCity: function(status)
					{
						this.scanIdx++;
						if (this.scanIdx != this.scannedCities.length && typeof status == 'undefined')
							this._getScannedCityData();
						else
						{
							this.scanStatus.setValue("Scan Complete: Showing " + this.tableData.length + " results.");	
							stopBtn.setEnabled(false);
						}
					},
					
					getCityResourcesAndLayout: function(city, visCity)
					{
						try
						{  
                            //Pretty sure we just need the EResourceType
                            var lootArray = {1: 0, 2: 0, 3: 0, 6: 0}; //1: Tib, 2: Cry, 3: Gold(credits) 6: RP
							var info = new Array();
							var layout = new Array();
							var tibCount = 0;
							var cryCount = 0;
                            var mod = 0;
                            for (var x = 0; x < 9; x++)
							{
								if(this.stopScan == true)
								{
									this.stopScan = false;
									this._getNextScannedCity("stop");
									return;
								}
                                for (var y = 0; y < 8; y++)
                                {
									
									var field = {};
									var fieldType = city.GetResourceType(x ,y);
									field.type = fieldType;
									field.x = x;
									field.y = y;
									
									layout.push(field);

									if (fieldType == ClientLib.Data.ECityTerrainType.CRYSTAL)
										cryCount++;
									else if (fieldType == ClientLib.Data.ECityTerrainType.TIBERIUM)
										tibCount++;

                                	var width =  visCity.get_GridWidth();
                                	var height =  visCity.get_GridHeight();
                                
                               		var cityEntity = visCity.GetCityObjectFromPosition(x * width, y * height);
                                    
                                    if (cityEntity != null && cityEntity.get_CityEntity() !== null)
                                    {
                                        var buildingDetails = cityEntity.get_BuildingDetails();		
										mod = buildingDetails.get_HitpointsPercent();
                                        var reqs = buildingDetails.get_UnitLevelRepairRequirements();
										
										for (var idx2 = 0; idx2 < reqs.length; idx2++)
										{
											var type = reqs[idx2].Type;
											var count = reqs[idx2].Count;
											lootArray[type] += Math.round((mod * count) - 0.5); //Rounding otherwise floating numbers
										}
                                    }							
                                    
                                    //Now do the same for defense units
                                    var defEntity = ClientLib.Vis.VisMain.GetInstance().get_DefenseSetup().GetDefenseObjectFromPosition(x * width, y * height);
                                    if (defEntity !== null && defEntity.get_CityEntity() !== null) 
                                    {
                                        var unitDetails = defEntity.get_UnitDetails();	
                                        mod = unitDetails.get_HitpointsPercent();	
                                        var reqs = unitDetails.get_UnitLevelRepairRequirements();
										
										for (var idx2 = 0; idx2 < reqs.length; idx2++)
										{
											var type = reqs[idx2].Type;
											var count = reqs[idx2].Count;
											lootArray[type] += Math.round((mod * count) - 0.5); //Rounding otherwise floating numbers
										}
                                    }
                                }
                            }
							
							var infoProps = {};
							info.loot = lootArray;
							info.layout = layout;

							info.tibCount = tibCount;
							info.cryCount = cryCount;
							info.push(infoProps);
							this.gotResources = true;
							return info;
						}
						catch(e)
						{
							console.log(e.toString());
						}
					},
					
					getTableData: function()
					{
						return this.tableData;
					},
					
					setStopScan: function()
					{
						this.stopScan = true;
					}
					
					//_getTableSelection: function()
					//{
					//	this.scanTable.getSelection()
					//}
				}
			});
			
			qx.Class.define("TGCTools.BaseScanner.TerrainLayout", 
			{
				type: "singleton",
				extend:	qx.ui.window.Window,
            
				construct: function()
				{
					try
					{
						this.base(arguments);
						this.setLayout(new qx.ui.layout.VBox());
					
						this.set({
							width: 600,
							caption: "City Layouts",
							padding: 5,
							allowMaximize: false,
							showMaximize: false,
							allowMinimize: false,
							showMinimize: false,	
						});
						
						this.resourceImages = new Array();
						this.resourceImages[0] = "webfrontend/ui/common/icn_res_tiberium.png";
						this.resourceImages[1] = "webfrontend/ui/common/icn_res_chrystal.png";
						
						this.scroll = new qx.ui.container.Scroll().set({
							width: 300,
							height: 240
						});
						
					}
					catch(e)
					{
						console.log(e.toString());
					}
				},
				
				destruct: function()
				{
				},
				
				members: 
				{
					resourceImages: null,
					scroll: null,
					
					getLayouts: function()
					{
						var tableData = TGCTools.BaseScanner.getInstance().getTableData();
						var layoutBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));

						for (var i = 0; i < tableData.length; i++)
						{	
							var cityGrid = new qx.ui.container.Composite();
							var cityGridLayout = new qx.ui.layout.Grid(5);
							cityGridLayout.setColumnMinWidth(0, 25);
							cityGridLayout.setColumnMinWidth(1, 25);
							cityGridLayout.setColumnMinWidth(2, 25);
							cityGridLayout.setColumnMinWidth(3, 25);
							cityGridLayout.setColumnMinWidth(4, 25);
							cityGridLayout.setColumnMinWidth(5, 25);
							cityGridLayout.setColumnMinWidth(6, 25);
							cityGridLayout.setColumnMinWidth(7, 25);
							cityGridLayout.setColumnMinWidth(8, 25);
							cityGridLayout.setRowMinHeight(0, 25);
							cityGridLayout.setRowMinHeight(1, 25);
							cityGridLayout.setRowMinHeight(2, 25);
							cityGridLayout.setRowMinHeight(3, 25);
							cityGridLayout.setRowMinHeight(4, 25);
							cityGridLayout.setRowMinHeight(5, 25);
							cityGridLayout.setRowMinHeight(6, 25);
							cityGridLayout.setRowMinHeight(7, 25);
							cityGrid.setLayout(cityGridLayout);
							var cityType = tableData[i].scanInfo.type;

							switch(cityType)
							{
								case ClientLib.Vis.VisObject.EObjectType.RegionNPCBase:
									cityGrid.setBackgroundColor("darkred");
									cityGrid.setOpacity(0.7);
									break;
								case ClientLib.Vis.VisObject.EObjectType.RegionNPCCamp:
									cityGrid.setBackgroundColor("darkblue");
									cityGrid.setOpacity(0.7);
									break;
								case ClientLib.Vis.VisObject.EObjectType.RegionCityType:
									cityGrid.setBackgroundColor("darkgreen");
									cityGrid.setOpacity(0.7);
									break;
							}
							
							cityGrid.setToolTipText("Level " + tableData[i].scanInfo.level + " " + tableData[i].scanInfo.name + " @ " + tableData[i].scanInfo.coords);
							//for (var x = 0; x < 9; x++)
							//{
								//for (var y = 0; y < 8; y++)
								//{
								for (var j = 0; j < tableData[i].layout.length; j++)
								{
									var fieldType = tableData[i].layout[j].type;
									var cell = new qx.ui.basic.Image();
									var x = tableData[i].layout[j].x;
									var y = tableData[i].layout[j].y;
									
									switch(fieldType)
									{
										case ClientLib.Data.ECityTerrainType.CRYSTAL:
											cell.setSource(this.resourceImages[1]);
											break;
										case ClientLib.Data.ECityTerrainType.TIBERIUM:
											cell.setSource(this.resourceImages[0]);
											break;	
									}
									cityGrid.add(cell, {row: y, column: x});
								}
							//}
							layoutBox.add(cityGrid);
						}
						this.scroll.add(layoutBox);
						this.add(this.scroll);
					}
				}
			});	
*/
			qx.Class.define("TGCTools.POIWindow", 
			{
				type: "singleton",
				extend:	qx.ui.window.Window,
            
				construct: function()
				{	
					try
					{
						this.base(arguments);
						this.setLayout(new qx.ui.layout.VBox(5));
					
						this.set({
							// Largeur de la fenêtre principale
							//width: 725,
							width: 500,
							caption: "POI Management Tool",
							padding: 5,
							allowMaximize: false,
							showMaximize: false,
							allowMinimize: false,
							showMinimize: false,	
						});
					
						//POI Struct
						this.poiData = 
						{
							labels:
							{
								total:
								{
									score: new qx.ui.basic.Label("Total Score: "),
									qty: new qx.ui.basic.Label("Total Quantity: "),
									bonus: new qx.ui.basic.Label("Total Bonus: "),
									nextTier: new qx.ui.basic.Label("To Next Tier: "),
									nextRank: new qx.ui.basic.Label("To Next Rank: "),
								},
								
								tier:
								{
									tier: new qx.ui.basic.Label("Tiers").set({textColor: "black"}),
									prev: new qx.ui.basic.Label("Previous:").set({textColor: "red"}),
									curr: new qx.ui.basic.Label("Current:").set({textColor: "blue"}),
									next: new qx.ui.basic.Label("Next:").set({textColor: "green"}),
									
									lower: new qx.ui.basic.Label("Lower").set({textColor: "black"}),
									upper: new qx.ui.basic.Label("Upper").set({textColor: "black"}),
									bonus: new qx.ui.basic.Label("Bonus").set({textColor: "black"}),
									diff:  new qx.ui.basic.Label("Diff +/-").set({textColor: "black"}),
								},
							
								rank:
								{
									rank: new qx.ui.basic.Label("Rankings").set({textColor: "black"}),
									prev: new qx.ui.basic.Label("Previous:").set({textColor: "red"}),
									curr: new qx.ui.basic.Label("Current:").set({textColor: "blue"}),
									next: new qx.ui.basic.Label("Next:").set({textColor: "green"}),
									
									alliance: new qx.ui.basic.Label("Alliance").set({textColor: "black"}),
									score: new qx.ui.basic.Label("Score").set({textColor: "black"}),
									multi: new qx.ui.basic.Label("Multiplier").set({textColor: "black"}),
									diff: new qx.ui.basic.Label("Diff +/-").set({textColor: "black"}),
								},
								
								simulation:
								{
									sim: new qx.ui.basic.Label("Simulation").set({textColor: "black"}),
									prev: new qx.ui.basic.Label("Previous:").set({textColor: "red"}),
									curr: new qx.ui.basic.Label("Current:").set({textColor: "blue"}),
									
									score: new qx.ui.basic.Label("Score").set({textColor: "black"}),
									bonus: new qx.ui.basic.Label("Bonus").set({textColor: "black"}),
									multi: new qx.ui.basic.Label("Multiplier").set({textColor: "black"}),
									totalBonus: new qx.ui.basic.Label("Total Bonus").set({textColor: "black"}),
								},
							},
							
							counts:
							{
								total:
								{
									score: new qx.ui.basic.Label("0"),
									qty: new qx.ui.basic.Label("0"),
									bonus: new qx.ui.basic.Label("0"),
									nextTier: new qx.ui.basic.Label("0"),
									nextRank: new qx.ui.basic.Label("0"),
								},
								
								tier:
								{
									prev:
									{
										lower: new qx.ui.basic.Label("0").set({textColor: "red"}),
										upper: new qx.ui.basic.Label("0").set({textColor: "red"}),
										bonus: new qx.ui.basic.Label("0").set({textColor: "red"}),
										diff: new qx.ui.basic.Label("0").set({textColor: "red"}),
									},
									
									curr:
									{
										lower: new qx.ui.basic.Label("0").set({textColor: "blue"}),
										upper: new qx.ui.basic.Label("0").set({textColor: "blue"}),
										bonus: new qx.ui.basic.Label("0").set({textColor: "blue"}),
										diff: new qx.ui.basic.Label("0").set({textColor: "blue"}),
									},
									
									next:
									{
										lower: new qx.ui.basic.Label("0").set({textColor: "darkgreen"}),
										upper: new qx.ui.basic.Label("0").set({textColor: "darkgreen"}),
										bonus: new qx.ui.basic.Label("0").set({textColor: "darkgreen"}),
										diff: new qx.ui.basic.Label("0").set({textColor: "darkgreen"}),
									},
								},
								
								rank:
								{
									prev:
									{
										alliance: new qx.ui.basic.Label("N/A").set({textColor: "red"}),
										score: new qx.ui.basic.Label("0").set({textColor: "red"}),
										multi: new qx.ui.basic.Label("0").set({textColor: "red"}),
										diff: new qx.ui.basic.Label("0").set({textColor: "red"}),
									},
									
									curr:
									{
										alliance: new qx.ui.basic.Label("N/A").set({textColor: "blue"}),
										score: new qx.ui.basic.Label("0").set({textColor: "blue"}),
										multi: new qx.ui.basic.Label("0").set({textColor: "blue"}),
										diff: new qx.ui.basic.Label("0").set({textColor: "blue"}),
									},
									
									next:
									{
										alliance: new qx.ui.basic.Label("N/A").set({textColor: "darkgreen"}),
										score: new qx.ui.basic.Label("0").set({textColor: "darkgreen"}),
										multi: new qx.ui.basic.Label("0").set({textColor: "darkgreen"}),
										diff: new qx.ui.basic.Label("0").set({textColor: "darkgreen"}),
									},
								},
								
								simulation:
								{
									prev:
									{
										score: new qx.ui.basic.Label("0").set({textColor: "red"}),
										bonus: new qx.ui.basic.Label("0").set({textColor: "red"}),
										multi: new qx.ui.basic.Label("0").set({textColor: "red"}),
										totalBonus: new qx.ui.basic.Label("0").set({textColor: "red"}),
									},
									
									curr:
									{
										score: new qx.ui.basic.Label("0").set({textColor: "blue"}),
										bonus: new qx.ui.basic.Label("0").set({textColor: "blue"}),
										multi: new qx.ui.basic.Label("0").set({textColor: "blue"}),
										totalBonus: new qx.ui.basic.Label("0").set({textColor: "blue"}),
									},
								},
							},
						};	

						//POI Table Box
						var tableBox = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({allowGrowY: false});
						this.tableModel = new qx.ui.table.model.Simple();	
						this.tableModel.setColumns(["Level", "Coords", "Score", "Loss", "Tier", "Rank"]);
						//this.table = new qx.ui.table.Table(this.tableModel).set({height: 300, allowGrowX: false, width: 625, alignX: "center"});
						// Largeur de la table des POI
						this.table = new qx.ui.table.Table(this.tableModel).set({height: 200, allowGrowX: false, width: 400, alignX: "center"});
						this.table.getSelectionModel().setSelectionMode(qx.ui.table.selection.Model.MULTIPLE_INTERVAL_SELECTION);
						this.table.setColumnVisibilityButtonVisible(false);
						
						// définition de la largeur des colonnes de la table des POI
						this.table.setColumnWidth(0,30);
						this.table.setColumnWidth(1,70);
						this.table.setColumnWidth(2,90);
						this.table.setColumnWidth(3,90);
						this.table.setColumnWidth(4,50);
						this.table.setColumnWidth(5,50);
						
						this.table.addListener("cellDblclick", function(evt) {this.showPOILocation(evt);}, this);
						this.table.setToolTipText("Displays POI Data for selected POI Type. To go to a POI Location, double-click the intended row."); 
						tableBox.add(this.table);						
						
						//POI Total Stats
						var totalStatsBox1 = new qx.ui.container.Composite(new qx.ui.layout.HBox(2)).set({alignX: "center", allowGrowX: false, allowGrowY: false});
						var totalStatsBox2 = new qx.ui.container.Composite(new qx.ui.layout.HBox(2)).set({alignX: "center", allowGrowX: false, allowGrowY: false});
						this.poiData["labels"]["total"].score.setThemedFont("bold");
						this.poiData["labels"]["total"].qty.setThemedFont("bold");
						this.poiData["labels"]["total"].bonus.setThemedFont("bold");
						this.poiData["labels"]["total"].nextTier.setThemedFont("bold");
						this.poiData["labels"]["total"].nextRank.setThemedFont("bold");
						totalStatsBox1.add(this.poiData["labels"]["total"].score);
						totalStatsBox1.add(this.poiData["counts"]["total"].score);
						totalStatsBox1.add(this.poiData["labels"]["total"].qty);
						totalStatsBox1.add(this.poiData["counts"]["total"].qty);
						totalStatsBox1.add(this.poiData["labels"]["total"].bonus);
						totalStatsBox1.add(this.poiData["counts"]["total"].bonus);
						totalStatsBox2.add(this.poiData["labels"]["total"].nextTier);
						totalStatsBox2.add(this.poiData["counts"]["total"].nextTier);
						totalStatsBox2.add(this.poiData["labels"]["total"].nextRank);
						totalStatsBox2.add(this.poiData["counts"]["total"].nextRank);
						
						//POI Current Stats
						var currStatsLayout = new qx.ui.layout.Grid(5).set({spacingX: 20, spacingY: 5});
						var currStatsBox = new qx.ui.container.Composite(currStatsLayout).set({allowGrowX: false, allowGrowY: false, alignX: "center"});
						this.poiData["labels"]["tier"].tier.setThemedFont("bold");
						this.poiData["labels"]["tier"].prev.setThemedFont("bold");
						this.poiData["labels"]["tier"].curr.setThemedFont("bold");
						this.poiData["labels"]["tier"].next.setThemedFont("bold");
						this.poiData["labels"]["tier"].lower.setThemedFont("bold");
						this.poiData["labels"]["tier"].upper.setThemedFont("bold");
						this.poiData["labels"]["tier"].bonus.setThemedFont("bold");
						this.poiData["labels"]["tier"].diff.setThemedFont("bold");
						
						this.poiData["labels"]["rank"].rank.setThemedFont("bold");
						this.poiData["labels"]["rank"].prev.setThemedFont("bold");
						this.poiData["labels"]["rank"].curr.setThemedFont("bold");
						this.poiData["labels"]["rank"].next.setThemedFont("bold");
						this.poiData["labels"]["rank"].alliance.setThemedFont("bold");
						this.poiData["labels"]["rank"].score.setThemedFont("bold");
						this.poiData["labels"]["rank"].multi.setThemedFont("bold");
						this.poiData["labels"]["rank"].diff.setThemedFont("bold");
						
						this.poiData["labels"]["simulation"].sim.setThemedFont("bold");
						this.poiData["labels"]["simulation"].prev.setThemedFont("bold");
						this.poiData["labels"]["simulation"].curr.setThemedFont("bold");
						this.poiData["labels"]["simulation"].score.setThemedFont("bold");
						this.poiData["labels"]["simulation"].bonus.setThemedFont("bold");
						this.poiData["labels"]["simulation"].multi.setThemedFont("bold");
						this.poiData["labels"]["simulation"].totalBonus.setThemedFont("bold");
						
						this.poiData["labels"]["tier"].tier.set({alignX: "center", font: "font_size_14_bold"});
						currStatsBox.add(this.poiData["labels"]["tier"].tier, {row: 0, column: 0, colSpan: 5});
						
						//Labels
						currStatsBox.add(this.poiData["labels"]["tier"].prev, {row: 2, column: 0});
						currStatsBox.add(this.poiData["labels"]["tier"].curr, {row: 3, column: 0});
						currStatsBox.add(this.poiData["labels"]["tier"].next, {row: 4, column: 0});
						currStatsBox.add(this.poiData["labels"]["tier"].lower, {row: 1, column: 1});
						currStatsBox.add(this.poiData["labels"]["tier"].upper, {row: 1, column: 2});
						currStatsBox.add(this.poiData["labels"]["tier"].bonus, {row: 1, column: 3});
						currStatsBox.add(this.poiData["labels"]["tier"].diff, {row: 1, column: 4});
						
						this.poiData["labels"]["rank"].rank.set({alignX: "center", font: "font_size_14_bold"});
						currStatsBox.add(this.poiData["labels"]["rank"].rank, {row: 5, column: 0, colSpan: 5});
						currStatsBox.add(this.poiData["labels"]["rank"].prev, {row: 7, column: 0});
						currStatsBox.add(this.poiData["labels"]["rank"].curr, {row: 8, column: 0});
						currStatsBox.add(this.poiData["labels"]["rank"].next, {row: 9, column: 0});
						currStatsBox.add(this.poiData["labels"]["rank"].alliance, {row: 6, column: 1});
						currStatsBox.add(this.poiData["labels"]["rank"].score, {row: 6, column: 2});
						currStatsBox.add(this.poiData["labels"]["rank"].multi, {row: 6, column: 3});
						currStatsBox.add(this.poiData["labels"]["rank"].diff, {row: 6, column: 4});
						
						this.poiData["labels"]["simulation"].sim.set({alignX: "center", font: "font_size_14_bold"});
						currStatsBox.add(this.poiData["labels"]["simulation"].sim, {row: 10, column: 0, colSpan: 5});
						currStatsBox.add(this.poiData["labels"]["simulation"].prev, {row: 12, column: 0});
						currStatsBox.add(this.poiData["labels"]["simulation"].curr, {row: 13, column: 0});
						currStatsBox.add(this.poiData["labels"]["simulation"].score, {row: 11, column: 1});
						currStatsBox.add(this.poiData["labels"]["simulation"].bonus, {row: 11, column: 2});
						currStatsBox.add(this.poiData["labels"]["simulation"].multi, {row: 11, column: 3});
						currStatsBox.add(this.poiData["labels"]["simulation"].totalBonus, {row: 11, column: 4});
						
						//Counts
						currStatsBox.add(this.poiData["counts"]["tier"]["prev"].lower, {row: 2, column: 1});
						currStatsBox.add(this.poiData["counts"]["tier"]["prev"].upper, {row: 2, column: 2});
						currStatsBox.add(this.poiData["counts"]["tier"]["prev"].bonus, {row: 2, column: 3});
						currStatsBox.add(this.poiData["counts"]["tier"]["prev"].diff, {row: 2, column: 4});
						currStatsBox.add(this.poiData["counts"]["tier"]["curr"].lower, {row: 3, column: 1});
						currStatsBox.add(this.poiData["counts"]["tier"]["curr"].upper, {row: 3, column: 2});
						currStatsBox.add(this.poiData["counts"]["tier"]["curr"].bonus, {row: 3, column: 3});
						currStatsBox.add(this.poiData["counts"]["tier"]["curr"].diff, {row: 3, column: 4});
						currStatsBox.add(this.poiData["counts"]["tier"]["next"].lower, {row: 4, column: 1});
						currStatsBox.add(this.poiData["counts"]["tier"]["next"].upper, {row: 4, column: 2});
						currStatsBox.add(this.poiData["counts"]["tier"]["next"].bonus, {row: 4, column: 3});
						currStatsBox.add(this.poiData["counts"]["tier"]["next"].diff, {row: 4, column: 4});
						
						currStatsBox.add(this.poiData["counts"]["rank"]["prev"].alliance, {row: 7, column: 1});
						currStatsBox.add(this.poiData["counts"]["rank"]["prev"].score, {row: 7, column: 2});
						currStatsBox.add(this.poiData["counts"]["rank"]["prev"].multi, {row: 7, column: 3});
						currStatsBox.add(this.poiData["counts"]["rank"]["prev"].diff, {row: 7, column: 4});
						currStatsBox.add(this.poiData["counts"]["rank"]["curr"].alliance, {row: 8, column: 1});
						currStatsBox.add(this.poiData["counts"]["rank"]["curr"].score, {row: 8, column: 2});
						currStatsBox.add(this.poiData["counts"]["rank"]["curr"].multi, {row: 8, column: 3});
						currStatsBox.add(this.poiData["counts"]["rank"]["curr"].diff, {row: 8, column: 4});
						currStatsBox.add(this.poiData["counts"]["rank"]["next"].alliance, {row: 9, column: 1});
						currStatsBox.add(this.poiData["counts"]["rank"]["next"].score, {row: 9, column: 2});
						currStatsBox.add(this.poiData["counts"]["rank"]["next"].multi, {row: 9, column: 3});
						currStatsBox.add(this.poiData["counts"]["rank"]["next"].diff, {row: 9, column: 4});
						
						currStatsBox.add(this.poiData["counts"]["simulation"]["prev"].score, {row: 12, column: 1});
						currStatsBox.add(this.poiData["counts"]["simulation"]["prev"].bonus, {row: 12, column: 2});
						currStatsBox.add(this.poiData["counts"]["simulation"]["prev"].multi, {row: 12, column: 3});
						currStatsBox.add(this.poiData["counts"]["simulation"]["prev"].totalBonus, {row: 12, column: 4});						
						currStatsBox.add(this.poiData["counts"]["simulation"]["curr"].score, {row: 13, column: 1});
						currStatsBox.add(this.poiData["counts"]["simulation"]["curr"].bonus, {row: 13, column: 2});
						currStatsBox.add(this.poiData["counts"]["simulation"]["curr"].multi, {row: 13, column: 3});
						currStatsBox.add(this.poiData["counts"]["simulation"]["curr"].totalBonus, {row: 13, column: 4});
						
						//Buttons
						var buttonBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(7)).set({allowGrowX: false, allowGrowY: false, alignX: "center"});
						this.selectBox = new qx.ui.form.SelectBox();
						this.selectBox.add(new qx.ui.form.ListItem("Tiberium", "webfrontend/ui/common/icn_res_tiberium.png", "4"));
						this.selectBox.add(new qx.ui.form.ListItem("Crystal", "webfrontend/ui/common/icn_res_chrystal.png", "5"));
						this.selectBox.add(new qx.ui.form.ListItem("Reactor", "webfrontend/ui/common/icn_res_power.png", "6"));
						this.selectBox.add(new qx.ui.form.ListItem("Tungsten", "FactionUI/icons/icon_alliance_bonus_inf.png", "7"));
						this.selectBox.add(new qx.ui.form.ListItem("Uranium", "FactionUI/icons/icon_alliance_bonus_tnk.png", "8"));
						this.selectBox.add(new qx.ui.form.ListItem("Aircraft", "FactionUI/icons/icon_alliance_bonus_air.png", "9"));
						this.selectBox.add(new qx.ui.form.ListItem("Resonator", "FactionUI/icons/icon_def_army_points.png", "10"));
						this.selectBox.setToolTipText("Choose a POI Type you want to view.");
						
						this.selectBox.addListener("changeSelection", function(e) {
							var numRows = TGCTools.POIWindow.getInstance().tableModel.getRowCount();
							TGCTools.POIWindow.getInstance().tableModel.removeRows(0, numRows, true);
						});
						
						var updateBtn = new qx.ui.form.Button("Update").set({height: 35, allowGrowX: false, allowGrowY: false, alignX: "center", rich: true});
						var simulateBtn = new qx.ui.form.Button("Simulate").set({height: 35, allowGrowX: false, allowGrowY: false, alignX: "center", rich: true});
						var listBtn = new qx.ui.form.Button("Add to List").set({height: 35, allowGrowX: false, allowGrowY: false, alignX: "center", rich: true});
						updateBtn.setToolTipText("Updates the table below with <br />POI's from selected POI type.");
						simulateBtn.setToolTipText("Simulates releasing selected POI's. <br /> To select multiple POI's hold ctrl and click on a row.");
						listBtn.setToolTipText("Add selected POIs to list for pasting into message. <br />For each POI you can copy the selected POIs. <br />" + 
						"Each time you click the button for the same POI, <br /> it rewrites the data for that POI type. <br /><br />To paste the message, hit Alt-L. <br /> To clear the list, hit Alt-C.");
						simulateBtn.addListener("click", function()
						{
							var selection = this.getPOISelection();
							this.currPOIType = selection - 2;

							this.isSimulation = true;
							this.getRankingData(selection);
							this.doSimulation();
						}, this);
						simulateBtn.setEnabled(false);
						
						updateBtn.addListener("click", function() 
						{
							var numRows = this.tableModel.getRowCount();
							this.tableModel.removeRows(0, numRows, true);
							var selection = this.getPOISelection();
							this.currPOIType = selection - 2;

							this.isSimulation = false;
							simulateBtn.setEnabled(true);
							this.getRankingData(selection);
						}, this);
						listBtn.addListener("click", this.addToList, this);
						
						//For copying POI List for messaging
						addEventListener("keyup", this.onKeyPress, false);
						
						buttonBox.add(this.selectBox);
						buttonBox.add(updateBtn);
						buttonBox.add(simulateBtn);
						buttonBox.add(listBtn);
						
						var poiContainer = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({allowGrowY: false, alignX: "center", decorator: "main", padding: 5});
						poiContainer.setBackgroundColor("lightgray");
						poiContainer.add(totalStatsBox1);
						poiContainer.add(totalStatsBox2);
						poiContainer.add(currStatsBox);
						poiContainer.add(buttonBox);
						poiContainer.add(tableBox);
						
						var scrollBox = new qx.ui.container.Scroll().set({
							width: 725,
							height: 600
						});
						scrollBox.add(poiContainer);
						this.add(scrollBox);
						
						this.rankingData = new Array();
						this.msgList = {4: "", 5: "", 6: "", 7: "", 8: "", 9: "", 10: ""};
						this.__ranking = new ClientLib.Data.Ranking.Ranking();
						phe.cnc.Util.attachNetEvent(this.__ranking, "FireReceivedCount", ClientLib.Data.Ranking.RankingReceivedCount, this, this.__onRankingReceivedCount);
						phe.cnc.Util.attachNetEvent(this.__ranking, "FireReceivedData", ClientLib.Data.Ranking.RankingReceivedData, this, this.__onRankingReceivedData);
					}
					catch(e)
					{
						console.log("Failed POIWindow Constructor: " + e.toString());
					}
				},
				
				destruct: function()
				{
				},
				
				members:
				{
					__ranking: null,
					rankingData: null,
					currPOIType: null,
					isSimulation: null,
					msgList: null,
					
					getPOISelection: function()
					{
						var selection = parseInt(this.selectBox.getSelection()[0].getModel());
						return selection;
					},
					
					updatePOIList: function()
					{
						if (this.isSimulation)
							return;
							
						var alliance = ClientLib.Data.MainData.GetInstance().get_Alliance();
						var allianceID = alliance.get_Id();
						var alliancePOIList = alliance.get_OwnedPOIs();
						var poiList = [];
						var totalScore = 0;
						var baseValue = 0;
						
						//Grab the POIs under the current selected type
						for (var idx in alliancePOIList)
						{
							if (alliancePOIList[idx].t == this.currPOIType)
							{
								poiList.push(alliancePOIList[idx]);
							}
						}
						
						poiList = this.sortPOIList(poiList);
						
						//Get Total Score
						totalScore = this.getTotalScore(allianceID);
						var rankData = this.getRankMultiplier(allianceID);
						baseValue = this.getBaseValue(totalScore);
						
						this.calculatePOIData(poiList, totalScore, rankData, baseValue);
						this.updatePOIStats(poiList, totalScore, rankData, baseValue);
					},
					
					updatePOIStats: function(poiList, totalScore, rankData, baseValue)
					{
						//Totals
						//totalScore passed in
						var totalQty = poiList.length;
						var totalBonus = baseValue * (1 + (rankData.multiplier / 100));
						var toNextTier = ClientLib.Base.PointOfInterestTypes.GetNextScore(totalScore) - totalScore;
						
						if (rankData.rank == 1)
							var toNextRank = "N/A";
						else
							var toNextRank = this.getRankScore(rankData.rank-1) - totalScore;
							
						//Tiers	
						var prevUpper = this.getTierLowerBound(totalScore) - 1;
						var prevLower = this.getTierLowerBound(prevUpper); //hack
						var prevBonus = this.getBaseValue(prevUpper); //upper or lower works
						
						var currLower = this.getTierLowerBound(totalScore);
						var currUpper = ClientLib.Base.PointOfInterestTypes.GetNextScore(totalScore) - 1;
						var currBonus = this.getBaseValue(totalScore);
						
						var nextLower = currUpper + 1;
						var nextUpper = ClientLib.Base.PointOfInterestTypes.GetNextScore(nextLower) - 1;
						var nextBonus = this.getBaseValue(nextLower);
						
						var prevDiff = currBonus - prevBonus;
						var currDiff = 0;
						var nextDiff = nextBonus - currBonus;
						
						//Ranks
						var prevAlliance = this.getAllianceName(rankData.rank+1);
						var prevScore = this.getRankScore(rankData.rank+1);
						var prevMulti =  ClientLib.Base.PointOfInterestTypes.GetBoostModifierByRank(rankData.rank+1);
						
						var currAlliance = this.getAllianceName(rankData.rank);
						var currScore = totalScore;
						var currMulti = rankData.multiplier;
						var currRankDiff = 0;
						if (rankData.rank == 1)
						{
							var nextAlliance = "N/A";
							var nextScore = "N/A";
							var nextMulti = "N/A";
							var nextRankDiff = "N/A";
						}
						else
						{
							var nextAlliance = this.getAllianceName(rankData.rank-1);
							var nextScore = this.getRankScore(rankData.rank-1);
							var nextMulti =  ClientLib.Base.PointOfInterestTypes.GetBoostModifierByRank(rankData.rank-1);
							var nextRankDiff = nextScore - currScore;
						}
						var prevRankDiff = currScore - prevScore;
						
						//Set Values
						//Total
						this.poiData["counts"]["total"].score.setValue(TGCTools.getInstance().numberWithCommas(totalScore));
						this.poiData["counts"]["total"].qty.setValue(TGCTools.getInstance().numberWithCommas(totalQty));
						if (this.currPOIType < 5)
							this.poiData["counts"]["total"].bonus.setValue(TGCTools.getInstance().numberWithCommas(totalBonus) + "/hr");
						else
							this.poiData["counts"]["total"].bonus.setValue(totalBonus + "%");
						this.poiData["counts"]["total"].nextTier.setValue(TGCTools.getInstance().numberWithCommas(toNextTier));
						if (rankData.rank != 1)
							this.poiData["counts"]["total"].nextRank.setValue(TGCTools.getInstance().numberWithCommas(toNextRank));
						else
							this.poiData["counts"]["total"].nextRank.setValue(toNextRank);
						
						//Tiers
						this.poiData["counts"]["tier"]["prev"].lower.setValue(TGCTools.getInstance().numberWithCommas(prevLower));
						this.poiData["counts"]["tier"]["prev"].upper.setValue(TGCTools.getInstance().numberWithCommas(prevUpper));
						this.poiData["counts"]["tier"]["curr"].lower.setValue(TGCTools.getInstance().numberWithCommas(currLower));
						this.poiData["counts"]["tier"]["curr"].upper.setValue(TGCTools.getInstance().numberWithCommas(currUpper));
						this.poiData["counts"]["tier"]["next"].lower.setValue(TGCTools.getInstance().numberWithCommas(nextLower));
						this.poiData["counts"]["tier"]["next"].upper.setValue(TGCTools.getInstance().numberWithCommas(nextUpper));
						
						if (this.currPOIType < 5)
						{
							this.poiData["counts"]["tier"]["prev"].bonus.setValue(TGCTools.getInstance().numberWithCommas(prevBonus) + "/hr");
							this.poiData["counts"]["tier"]["curr"].bonus.setValue(TGCTools.getInstance().numberWithCommas(currBonus) + "/hr");
							this.poiData["counts"]["tier"]["next"].bonus.setValue(TGCTools.getInstance().numberWithCommas(nextBonus) + "/hr");
						}
						else	
						{
							this.poiData["counts"]["tier"]["prev"].bonus.setValue(TGCTools.getInstance().numberWithCommas(prevBonus) + "%");
							this.poiData["counts"]["tier"]["curr"].bonus.setValue(TGCTools.getInstance().numberWithCommas(currBonus) + "%");
							this.poiData["counts"]["tier"]["next"].bonus.setValue(TGCTools.getInstance().numberWithCommas(nextBonus) + "%");
						}
						this.poiData["counts"]["tier"]["prev"].diff.setValue(TGCTools.getInstance().numberWithCommas(prevDiff));
						this.poiData["counts"]["tier"]["curr"].diff.setValue(TGCTools.getInstance().numberWithCommas(currDiff));
						this.poiData["counts"]["tier"]["next"].diff.setValue(TGCTools.getInstance().numberWithCommas(nextDiff));
						
						//Ranks
						this.poiData["counts"]["rank"]["prev"].alliance.setValue(prevAlliance);
						this.poiData["counts"]["rank"]["prev"].score.setValue(TGCTools.getInstance().numberWithCommas(prevScore));
						this.poiData["counts"]["rank"]["prev"].multi.setValue(TGCTools.getInstance().numberWithCommas(prevMulti) + "%");
						this.poiData["counts"]["rank"]["prev"].diff.setValue(TGCTools.getInstance().numberWithCommas(prevRankDiff));
						
						this.poiData["counts"]["rank"]["curr"].alliance.setValue(currAlliance);
						this.poiData["counts"]["rank"]["curr"].score.setValue(TGCTools.getInstance().numberWithCommas(currScore));
						this.poiData["counts"]["rank"]["curr"].multi.setValue(TGCTools.getInstance().numberWithCommas(currMulti) + "%");
						this.poiData["counts"]["rank"]["curr"].diff.setValue(TGCTools.getInstance().numberWithCommas(currRankDiff));
						
						this.poiData["counts"]["rank"]["next"].alliance.setValue(nextAlliance);
						
						if (rankData.rank != 1)
						{
							this.poiData["counts"]["rank"]["next"].score.setValue(TGCTools.getInstance().numberWithCommas(nextScore));
							this.poiData["counts"]["rank"]["next"].multi.setValue(TGCTools.getInstance().numberWithCommas(nextMulti) + "%");
							this.poiData["counts"]["rank"]["next"].diff.setValue(TGCTools.getInstance().numberWithCommas(nextRankDiff));
						}
						else
						{
							this.poiData["counts"]["rank"]["next"].score.setValue(nextScore);
							this.poiData["counts"]["rank"]["next"].multi.setValue(nextMulti);
							this.poiData["counts"]["rank"]["next"].diff.setValue(nextRankDiff);
						}
					},
					
					getAllianceName: function(rank)
					{
						if (typeof this.rankingData != 'undefined')
						{
							//find next rank score
							for (var idx in this.rankingData)
							{
								var info = this.rankingData[idx];
								
								if (info.poir == rank)
								{
									return info.an;
								}
							}
						}
					},
					
					calculatePOIData: function(poiList, totalScore, rankData, baseValue)
					{
						if (typeof poiList != 'undefined')
						{
							var tierBufferSum = 0;
							var rankBufferSum = 0;
							var currTierLowerBound = this.getTierLowerBound(totalScore);
							var currRankLowerBound = this.getRankLowerBound(rankData.rank);
							var poiInfo = {};
							var poiArray = [];
							for (var idx in poiList)
							{
								var poi = poiList[idx];
								
								var newTotalScore = totalScore - poi.score;
								var newBaseValue = this.getBaseValue(newTotalScore);
								var newRankMultiplier = this.calculateNewRankMultiplier(newTotalScore, rankData.rank);
								
								var isNeededForTier = "Hold";
								if (tierBufferSum >= currTierLowerBound)
									isNeededForTier = "Buffer";
								tierBufferSum += poi.score;
								
								var isNeededForRank = "Hold";
								if (rankBufferSum >= currRankLowerBound)
									isNeededForRank = "Buffer";
								rankBufferSum += poi.score;
								
								
								//Calculate Loss
								var totalBonus = baseValue * (1 + (rankData.multiplier / 100));
								var newTotalBonus = newBaseValue * (1 + (newRankMultiplier / 100));
								var loss = totalBonus - newTotalBonus;
								
								poiInfo = 
								{
									"type": poi.type,
									"score": poi.score,
									"coords": poi.x + ":" + poi.y,
									"level": poi.level,
									"loss": loss,
									"tier": isNeededForTier,
									"rank": isNeededForRank
								}
								poiArray.push(poiInfo);
							}
							
							this.displayPOIData(poiArray);
						}
					},
					
					displayPOIData: function(data)
					{
						if (data != undefined)
						{
							var displayData = [];
							for (var idx in data)
							{
								var poi = data[idx];
								this.tableModel.addRows([[poi.level, poi.coords, poi.score, poi.loss, poi.tier, poi.rank]]);
							}
						}
					},
					
					calculateNewRankMultiplier: function(score, rank)
					{
						if (typeof this.rankingData != 'undefined')
						{
							//find next rank score
							for (var idx in this.rankingData)
							{
								var info = this.rankingData[idx];
								
								if (info.poir == (rank + 1))
								{
									if (info.pois <= score)
										return ClientLib.Base.PointOfInterestTypes.GetBoostModifierByRank(rank);
									else
										return this.calculateNewRankMultiplier(score, (rank + 1));
								}
							}
						}
					},
					
					getRankScore: function(rank)
					{
						if (typeof this.rankingData != 'undefined')
						{
							for (var idx in this.rankingData)
							{
								var alliance = this.rankingData[idx];
								
								if (alliance.poir == rank)
								{
									return alliance.pois;
								}
							}
						}
					},
					
					getRankLowerBound: function(rank)
					{
						if (typeof this.rankingData != 'undefined')
						{
							for (var idx in this.rankingData)
							{
								var alliance = this.rankingData[idx];
								if (alliance.poir == (rank + 1))
								{
									return alliance.pois;
								}
							}
						}
					},
					
					//From an online source
					/*numberWithCommas: function(x)
					{
						var parts = x.toString().split(".");
						parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
						return parts.join(".");
					},*/
		
					getTierLowerBound: function(score)
					{
						var tiers = [];
						tiers.push(1);
						tiers.push(4);
						tiers.push(9);
						tiers.push(16);
						tiers.push(27);
						tiers.push(50);
						tiers.push(90);
						tiers.push(160);
						tiers.push(260);
						tiers.push(420);
						tiers.push(750);
						tiers.push(1300);
						tiers.push(2200);
						tiers.push(3600);
						tiers.push(5700);
						tiers.push(9700);
						tiers.push(16400);
						tiers.push(28000);
						tiers.push(44000);
						tiers.push(68000);
						tiers.push(115000);
						tiers.push(190000);
						tiers.push(330000);
						tiers.push(510000);
						tiers.push(800000);
						tiers.push(1350000);
						tiers.push(2200000);
						tiers.push(3600000);
						tiers.push(6000000);
						tiers.push(9000000);
						tiers.push(15000000);
						tiers.push(25000000);
						tiers.push(42000000);
						tiers.push(65000000);
						tiers.push(100000000);
						tiers.push(165000000);
						tiers.push(270000000);
						tiers.push(450000000);
						tiers.push(1000000000);
						
						for (var idx in tiers)
						{
							if (score <= tiers[idx])
							{
								if (idx == 0)
									return 0;
								else if (score < tiers[idx])
									return tiers[idx-1];
								else
									return tiers[idx];
							}
						}
					},
					
					getRankingData: function(poiType)
					{
						//4-10
						//ClientLib.Data.Ranking.ERankingType.BonusTiberium:
						//ClientLib.Data.Ranking.ERankingType.BonusCrystal:
						//ClientLib.Data.Ranking.ERankingType.BonusPower:
						//ClientLib.Data.Ranking.ERankingType.BonusInfantry:
						//ClientLib.Data.Ranking.ERankingType.BonusVehicles:
						//ClientLib.Data.Ranking.ERankingType.BonusAircraft:
						//ClientLib.Data.Ranking.ERankingType.BonusDefense:
						this.__ranking.RequestCount(ClientLib.Data.Ranking.EViewType.Alliance, poiType);
					},

					__onRankingReceivedCount: function(data)
					{
						if (data != undefined)
							this.__ranking.RequestData(0, data, ClientLib.Data.Ranking.ESortColumn.Rank, ClientLib.Data.Ranking.ESortDirection.Ascending);
					},

					__onRankingReceivedData: function(data)
					{
						if (data != undefined)
						{
							this.rankingData = data;
							this.updatePOIList();
						}
					},
					
					sortPOIList: function(obj)
					{
						var arr = [];
						for (var idx in obj) {
							arr.push({
								'type': obj[idx].t,
								'level': obj[idx].l,
								'x': obj[idx].x,
								'y': obj[idx].y,
								'score': ClientLib.Base.PointOfInterestTypes.GetScoreByLevel(obj[idx].l)
							});
						}
						arr.sort(function(a, b) { return b.level - a.level; });
						return arr; // returns array
					},
					
					getTotalScore: function(allianceID)
					{
						if (typeof this.rankingData != 'undefined')
						{	
							for (var idx in this.rankingData)
							{
								if (this.rankingData[idx].a == allianceID)
									return this.rankingData[idx].pois;
							}
						}
					},
					
					getRankMultiplier: function(allianceID)
					{
						if (typeof this.rankingData != 'undefined')
						{	
							for (var idx in this.rankingData)
							{
								if (this.rankingData[idx].a == allianceID)
								{
									var rankInfo = 
									{
										"rank" : this.rankingData[idx].poir,
										"multiplier" : ClientLib.Base.PointOfInterestTypes.GetBoostModifierByRank(this.rankingData[idx].poir)
									};
									return rankInfo;
								}
							}
						}
					},
					
					getBaseValue: function(totalScore)
					{
						return ClientLib.Base.PointOfInterestTypes.GetBonusByType(this.currPOIType, totalScore);
					},
					
					showPOILocation: function(evt)
					{
						var row = evt.getRow();
						var coords = "";
						
						coords = this.tableModel.getValueById("Coords", row);

						if (coords != "")
						{
						    if (coords.substring(4,5)==":")
							{
							    var x = parseInt(coords.substring(0, 4));
								var y = parseInt(coords.substring(5));
							}
							else
							{
							    var x = parseInt(coords.substring(0, 3));
								var y = parseInt(coords.substring(4));
							}
							var view = ClientLib.Vis.VisMain.GetInstance().GetActiveView();
							view.CenterGridPosition(x, y);
						}
					},
					
					doSimulation: function()
					{		
						//Grab Selection Data
						var selection = [];
						var tableModel = this.tableModel;
						var table = this.table;
						
						if (typeof table != undefined)
						{
							table.getSelectionModel().iterateSelection(function(index) {
								selection.push(tableModel.getRowData(index));
							});
						}
						else
						{
							return;
						}
						
						var alliance = ClientLib.Data.MainData.GetInstance().get_Alliance();
						var allianceID = alliance.get_Id();
						var alliancePOIList = alliance.get_OwnedPOIs();
						var poiList = [];
						var totalScore = 0;
						var baseValue = 0;
						
						//Grab the POIs under the current selected type
						for (var idx in alliancePOIList)
						{
							if (alliancePOIList[idx].t == this.currPOIType)
							{
								var isUnselected = true;
								//Check if it is selected
								for (var idx2 in selection)
								{
									if (selection[idx2][1] == (alliancePOIList[idx].x + ":" + alliancePOIList[idx].y))
									{
										isUnselected = false;
										break;
									}
								}
								if (isUnselected == true)
								{
									totalScore += ClientLib.Base.PointOfInterestTypes.GetScoreByLevel(alliancePOIList[idx].l)
									poiList.push(alliancePOIList[idx]);
								}
							}
						}
						
						poiList = this.sortPOIList(poiList);
						
						//Previous
						var prevScore = this.getTotalScore(allianceID);
						var prevBonus = this.getBaseValue(prevScore);
						var rankData = this.getRankMultiplier(allianceID);
						var prevMulti = rankData.multiplier;
						var prevTotalBonus = prevBonus * (1 + (prevMulti / 100));
						
						var currScore = totalScore;
						var currBonus =  this.getBaseValue(currScore);
						var currMulti = this.calculateNewRankMultiplier(currScore, rankData.rank);
						var currTotalBonus = currBonus * (1 + (currMulti / 100));
						
						//Update Simulation Data
						this.poiData["counts"]["simulation"]["prev"].score.setValue(TGCTools.getInstance().numberWithCommas(prevScore));
						this.poiData["counts"]["simulation"]["curr"].score.setValue(TGCTools.getInstance().numberWithCommas(currScore));
						if (this.currPOIType < 5)
						{
							this.poiData["counts"]["simulation"]["prev"].bonus.setValue(TGCTools.getInstance().numberWithCommas(prevBonus) + "/hr");
							this.poiData["counts"]["simulation"]["prev"].totalBonus.setValue(TGCTools.getInstance().numberWithCommas(prevTotalBonus) + "/hr");
							this.poiData["counts"]["simulation"]["curr"].bonus.setValue(TGCTools.getInstance().numberWithCommas(currBonus) + "/hr");
							this.poiData["counts"]["simulation"]["curr"].totalBonus.setValue(TGCTools.getInstance().numberWithCommas(currTotalBonus) + "/hr");
						}
						else
						{
							this.poiData["counts"]["simulation"]["prev"].bonus.setValue(prevBonus + "%");
							this.poiData["counts"]["simulation"]["prev"].totalBonus.setValue(prevTotalBonus + "%");
							this.poiData["counts"]["simulation"]["curr"].bonus.setValue(currBonus + "%");
							this.poiData["counts"]["simulation"]["curr"].totalBonus.setValue(currTotalBonus + "%");
						}
							
						this.poiData["counts"]["simulation"]["prev"].multi.setValue(prevMulti + "%");
						this.poiData["counts"]["simulation"]["curr"].multi.setValue(currMulti + "%");
					},
					
					addToList: function()
					{
						var selection = [];
						var tableModel = this.tableModel;
						var table = this.table;
						
						if (typeof table != undefined)
						{
							table.getSelectionModel().iterateSelection(function(index) {
								selection.push(tableModel.getRowData(index));
							});
						}
						else
						{
							return;
						}
						
						var poiType = this.getPOISelection();
						var poiMsg = "";

						if (selection.length != 0)
						{
							switch(poiType)
							{
								case 4:
									poiMsg += "[b][u]Tiberium[/u][/b] \r";
									break;
								case 5:
									poiMsg += "[b][u]Crystal[/u][/b] \r";
									break;
								case 6:
									poiMsg += "[b][u]Reactor[/u][/b] \r";
									break;
								case 7:
									poiMsg += "[b][u]Tungsten[/u][/b] \r";
									break;
								case 8:
									poiMsg += "[b][u]Uranium[/u][/b] \r";
									break;
								case 9:
									poiMsg += "[b][u]Aircraft[/u][/b] \r";
									break;
								case 10:
									poiMsg += "[b][u]Resonator[/u][/b] \r";
									break;
							}
							for (var idx in selection)
							{
								var level = parseInt(selection[idx][0]);
								var coords = selection[idx][1];
								var points = ClientLib.Base.PointOfInterestTypes.GetScoreByLevel(level);
								
								poiMsg += "L" + level + " [coords]" + coords + "[/coords] (" + points + ")\r"; 
							}
						}
						this.msgList[poiType] = poiMsg;
					},
					
					/**
						Want to thank this script (http://userscripts.org/scripts/show/158800) and its author for the idea
					*/
					onKeyPress: function(event)
					{
						var key = String.fromCharCode(event.keyCode);
						if (event.altKey && key == "L")
						{
							var inputField = document.querySelector('input:focus, textarea:focus');
							if (inputField != null)
							{
								var msg = "";
								var msgList = TGCTools.POIWindow.getInstance().getMsgList();
								if (typeof msgList != 'undefined')
								{
									for (var idx = 4; idx < 11; idx++)
									{
										if (msgList[idx] != "")
										{
											msg += msgList[idx] + "\r";
										}
									}
									inputField.value += msg;
								}
							}
						}
						else if (event.altKey && key == "C")
						{
							var msgList = TGCTools.POIWindow.getInstance().getMsgList();
							if (typeof msgList != 'undefined')
							{
								for (var idx = 4; idx < 11; idx++)
								{
									msgList[idx] = "";
								}
							}
						}
					},
					
					getMsgList: function()
					{
						return this.msgList;
					}
				}
			});
			
/*			qx.Class.define("TGCTools.UpgradeWindow", 
			{
				type: "singleton",
				extend:	qx.ui.window.Window,
            
				construct: function()
				{
					this.base(arguments);
					this.setLayout(new qx.ui.layout.VBox(5));
				
					this.set({
						width: 600,
						caption: "Upgrade Management Tool",
						padding: 5,
						allowMaximize: false,
						showMaximize: false,
						allowMinimize: false,
						showMinimize: false,	
					});
					
					var upgradeLevelBox = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({decorator: "pane-light-opaque", padding: 10});
					var upgradeBaseBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
					var baseLabel = new qx.ui.basic.Label("Base Level: ").set({allowGrowX: false, allowGrowY: false, font: "font_size_14_bold"});
					this.baseTextField = new qx.ui.form.TextField();
					this.baseTextField.setToolTipText("Enter desired level to upgrade to");
					var baseUpgradeBtn = new qx.ui.form.Button("","FactionUI/icons/icon_building_detail_upgrade.png");
					baseUpgradeBtn.setShow("icon");
					baseUpgradeBtn.setToolTipText("Upgrades all buildings to desired level if resources exist.");
					baseUpgradeBtn.addListener("click", this.baseUpgradeAllLevel, this);
					var baseUpgradeOneBtn = new qx.ui.form.Button("+1").set({allowGrowX: false, allowGrowY: false, height: 35, font: "font_size_14_bold"});
					baseUpgradeOneBtn.addListener("click", this.baseUpgradeOneLevel, this);
					baseUpgradeOneBtn.setToolTipText("Upgrades all buildings by one level if resources exist.");
					this.baseUpgradeMaximizeBtn = new qx.ui.form.Button("Maximize").set({allowGrowX: false, allowGrowY: false, height: 35});
					this.baseUpgradeMaximizeBtn.setToolTipText("Upgrades production buildings that maximize gain/costs based on selected resource type.");
					this.baseUpgradeMaximizeBtn.addListener("click", this.baseUpgradeMaximizeLevel, this);
					
					this.baseUpgradeMaximizeSelect = new qx.ui.form.SelectBox().set({allowGrowX: false, allowGrowY: false, height: 35});
					this.baseUpgradeMaximizeSelect.add(new qx.ui.form.ListItem("Tiberium", "webfrontend/ui/common/icn_res_tiberium.png", "1"));
					this.baseUpgradeMaximizeSelect.add(new qx.ui.form.ListItem("Crystal", "webfrontend/ui/common/icn_res_chrystal.png", "2"));
					this.baseUpgradeMaximizeSelect.add(new qx.ui.form.ListItem("Power", "webfrontend/ui/common/icn_res_power.png", "5"));
					this.baseUpgradeMaximizeSelect.add(new qx.ui.form.ListItem("Credits", "webfrontend/ui/common/icn_res_dollar.png", "3"));
					this.baseUpgradeMaximizeSelect.setToolTipText("Select desired resource to maximize by gain/cost.");
					upgradeBaseBox.add(baseLabel);
					upgradeBaseBox.add(this.baseTextField);
					upgradeBaseBox.add(baseUpgradeBtn);
					upgradeBaseBox.add(baseUpgradeOneBtn);
					upgradeBaseBox.add(this.baseUpgradeMaximizeBtn);
					upgradeBaseBox.add(this.baseUpgradeMaximizeSelect);
					upgradeLevelBox.add(upgradeBaseBox);
					
					
					this.add(upgradeLevelBox);
					
					this.numMaximizeSteps = 0;
				},
				
				destruct: function()
				{
				},
				
				members:
				{
					numMaximizeSteps: null,
					
					baseUpgradeAllLevel: function()
					{
						var newLevel = parseInt(this.baseTextField.getValue());
						
						if (isNaN(newLevel))
							return;
							
						if (newLevel > 51)
							newLevel = 51;
							
						if (newLevel < 0)
							newLevel = 0;

						//Based on Topper's Example
						if (PerforceChangelist <= 384441)
							newLevel--;
							
						ClientLib.API.City.GetInstance().UpgradeAllBuildingsToLevel(newLevel);
						this.baseTextField.setValue("");
					},
					
					baseUpgradeOneLevel: function()
					{
						var currOwnCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
						ClientLib.Data.MainData.GetInstance().get_Cities().set_CurrentCityId(currOwnCity.get_Id());
						var visCity =  ClientLib.Vis.VisMain.GetInstance().get_City();
						var width =  visCity.get_GridWidth();
						var height =  visCity.get_GridHeight();

						for (var x = 0; x < 9; x++)
						{
							for (var y = 0; y < 8; y++)
							{
								var cityEntity = visCity.GetCityObjectFromPosition(x * width, y * height);
								if (cityEntity != null)
								{
									if (cityEntity.get_VisObjectType() == ClientLib.Vis.VisObject.EObjectType.CityBuildingType)
									{
										ClientLib.API.City.GetInstance().UpgradeBuildingToLevel(cityEntity.get_BuildingDetails(), (cityEntity.get_BuildingLevel() + 1));
									}
								}
							}
						}
					},
					
					baseUpgradeMaximizeLevel: function()
					{
						this.baseUpgradeMaximizeBtn.setEnabled(false);
						this.baseUpgradeMaximizeSelect.setEnabled(false);
						var currOwnCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
						ClientLib.Data.MainData.GetInstance().get_Cities().set_CurrentCityId(currOwnCity.get_Id());
						var visCity =  ClientLib.Vis.VisMain.GetInstance().get_City();
						var width =  visCity.get_GridWidth();
						var height =  visCity.get_GridHeight();
						
						var buildingsData = currOwnCity.get_Buildings().d;
						var buildings = [];
						for (var idx in buildingsData)
						{
							var tName = buildingsData[idx].get_TechName();
							//If not a production type then skip
							switch(parseInt(tName))
							{
								case 1: 
								case 2: 
								case 10: 
								case 11: 
								case 15:
								case 16: 
									break;
								default: continue; break;
							}

							var objData = buildingsData[idx].get_TechGameData_Obj();
							var detailView = currOwnCity.GetBuildingDetailViewInfo(buildingsData[idx]);
							
							if (detailView == null)
								continue;
							
							var level = buildingsData[idx].get_CurrentLevel();
							if (level == 51)
								continue;
							
							var upgradeReqs = ClientLib.Base.Util.GetTechLevelResourceRequirements_Obj(level + 1, objData);
							
							//Gain per hour if upgraded from Maelstrom tools
							var upgradeGPH = {1: 0, 2: 0, 3: 0, 5: 0};
							var totalGPH = 0;
							for (var type in detailView.OwnProdModifiers.d)
							{
								switch (parseInt(type)) 
								{
									case ClientLib.Base.EModifierType.TiberiumPackageSize:
									case ClientLib.Base.EModifierType.CrystalPackageSize:
									case ClientLib.Base.EModifierType.PowerPackageSize:
									case ClientLib.Base.EModifierType.CreditsPackageSize:
										var ModOj = detailView.OwnProdModifiers.d[buildingsData[idx].get_MainModifierTypeId()];
										var Mod = (ModOj.TotalValue + ModOj.NewLvlDelta) / ClientLib.Data.MainData.GetInstance().get_Time().get_StepsPerHour();
										totalGPH += (detailView.OwnProdModifiers.d[type].NewLvlDelta / Mod);
										switch(parseInt(type))
										{
											case ClientLib.Base.EModifierType.TiberiumPackageSize:
												upgradeGPH[1] += (detailView.OwnProdModifiers.d[type].NewLvlDelta / Mod);
												break;
											case ClientLib.Base.EModifierType.CrystalPackageSize:
												upgradeGPH[2] += (detailView.OwnProdModifiers.d[type].NewLvlDelta / Mod);
												break;
											case ClientLib.Base.EModifierType.PowerPackageSize:
												upgradeGPH[5] += (detailView.OwnProdModifiers.d[type].NewLvlDelta / Mod);
												break;
											case ClientLib.Base.EModifierType.CreditsPackageSize:
												upgradeGPH[3] += (detailView.OwnProdModifiers.d[type].NewLvlDelta / Mod);
												break;
										}
										break;
									case ClientLib.Base.EModifierType.TiberiumProduction:
									case ClientLib.Base.EModifierType.CrystalProduction:
									case ClientLib.Base.EModifierType.PowerProduction:
									case ClientLib.Base.EModifierType.CreditsProduction:
										totalGPH += detailView.OwnProdModifiers.d[type].NewLvlDelta;
										switch(parseInt(type))
										{
											case ClientLib.Base.EModifierType.TiberiumProduction:
												upgradeGPH[1] += detailView.OwnProdModifiers.d[type].NewLvlDelta;
												break;
											case ClientLib.Base.EModifierType.CrystalProduction:
												upgradeGPH[2] += detailView.OwnProdModifiers.d[type].NewLvlDelta;
												break;
											case ClientLib.Base.EModifierType.PowerProduction:
												upgradeGPH[5] += detailView.OwnProdModifiers.d[type].NewLvlDelta;
												break;
											case ClientLib.Base.EModifierType.CreditsProduction:
												upgradeGPH[3] += detailView.OwnProdModifiers.d[type].NewLvlDelta;
												break;
										}
										break;
								}
							}
							
							//Check if building produces any gain for selecte resource. If not, continue
							var selection = parseInt(this.baseUpgradeMaximizeSelect.getSelection()[0].getModel());
							if (upgradeGPH[selection] == 0)
								continue;
							
							//Determine upgrade 
							var totalCosts = 0;
							
							for (var costs in upgradeReqs)
							{
								//don't need functions
								if (typeof upgradeReqs[costs] == 'function')
									continue;
									
								//don't need 0 costs
								if (upgradeReqs[costs].Type == 0)
									continue;
									
								totalCosts += upgradeReqs[costs].Count;	
							}
							var hasResources = currOwnCity.HasEnoughResources(upgradeReqs);

							if (!hasResources)
								continue;
								
							var gainPerCostRatio = (upgradeGPH[selection] / totalCosts) * 100;	
							
							var visBuilding = visCity.GetCityObjectFromPosition(buildingsData[idx].get_CoordX() * width, buildingsData[idx].get_CoordY() * height);
							
							var upgradeInfo = 
							{
								"nLevel": level + 1,
								"gpcr": gainPerCostRatio,
								"x": buildingsData[idx].get_CoordX(),
								"y": buildingsData[idx].get_CoordY(),
								"data": buildingsData[idx],
								"detail": visBuilding.get_BuildingDetails(),
								"tech": objData
							};
							
							buildings.push(upgradeInfo);
						}
						
						if (buildings.length == 0)
						{
							this.baseUpgradeMaximizeBtn.setEnabled(true);
							this.baseUpgradeMaximizeSelect.setEnabled(true);
							return;
						}
							
						//Sort by GCPR
						buildings = this.sortBuildingList(buildings);
						
						//Have list now time to maximize
						this.doMaximizeUpgrading(buildings, currOwnCity);
					},
					
					doMaximizeUpgrading: function(buildings, currOwnCity)
					{			
						if (buildings.length == 0)
						{
							this.baseUpgradeMaximizeBtn.setEnabled(true);
							this.baseUpgradeMaximizeSelect.setEnabled(true);
							return;
						}
							
						//Upgrade the first one
						ClientLib.API.City.GetInstance().UpgradeBuildingToLevel(buildings[0].detail, buildings[0].nLevel);
						
						//Now we need to recalculate the next gpcr
						if (buildings[0].nLevel == 51)
						{
							buildings = this.removeItemFromArray(buildings, 0, 1);
							this.waitToMaximizeAgain(buildings, currOwnCity);
							return;
						}
						else
						{
							buildings[0].nLevel = buildings[0].nLevel + 1;
						}

						var upgradeReqs =  ClientLib.Base.Util.GetTechLevelResourceRequirements_Obj(buildings[0].nLevel, buildings[0].tech);
						
						//Check to make sure player has enough to purchase upgrade
						if (!currOwnCity.HasEnoughResources(upgradeReqs))
						{
							buildings = this.removeItemFromArray(buildings, 0, 1);
							this.waitToMaximizeAgain(buildings, currOwnCity);
							return;
						}
						
						//Get Total Costs
						var totalCosts = 0;
						for (var costs in upgradeReqs)
						{
							//don't need functions
							if (typeof upgradeReqs[costs] == 'function')
								continue;
								
							//don't need 0 costs
							if (upgradeReqs[costs].Type == 0)
								continue;
								
							totalCosts += upgradeReqs[costs].Count;	
						}
						
						//Get GainsPerHour
						var upgradeGPH = {1: 0, 2: 0, 3: 0, 5: 0};
						var detailView = currOwnCity.GetBuildingDetailViewInfo(buildings[0].data);
							
						for (var type in detailView.OwnProdModifiers.d)
						{
							switch (parseInt(type)) 
							{
								case ClientLib.Base.EModifierType.TiberiumPackageSize:
								case ClientLib.Base.EModifierType.CrystalPackageSize:
								case ClientLib.Base.EModifierType.PowerPackageSize:
								case ClientLib.Base.EModifierType.CreditsPackageSize:
									var ModOj = detailView.OwnProdModifiers.d[buildings[0].data.get_MainModifierTypeId()];
									var Mod = (ModOj.TotalValue + ModOj.NewLvlDelta) / ClientLib.Data.MainData.GetInstance().get_Time().get_StepsPerHour();
									//totalGPH += (detailView.OwnProdModifiers.d[type].NewLvlDelta / Mod);
									switch(parseInt(type))
									{
										case ClientLib.Base.EModifierType.TiberiumPackageSize:
											upgradeGPH[1] += (detailView.OwnProdModifiers.d[type].NewLvlDelta / Mod);
											break;
										case ClientLib.Base.EModifierType.CrystalPackageSize:
											upgradeGPH[2] += (detailView.OwnProdModifiers.d[type].NewLvlDelta / Mod);
											break;
										case ClientLib.Base.EModifierType.PowerPackageSize:
											upgradeGPH[5] += (detailView.OwnProdModifiers.d[type].NewLvlDelta / Mod);
											break;
										case ClientLib.Base.EModifierType.CreditsPackageSize:
											upgradeGPH[3] += (detailView.OwnProdModifiers.d[type].NewLvlDelta / Mod);
											break;
									}
									break;
								case ClientLib.Base.EModifierType.TiberiumProduction:
								case ClientLib.Base.EModifierType.CrystalProduction:
								case ClientLib.Base.EModifierType.PowerProduction:
								case ClientLib.Base.EModifierType.CreditsProduction:
									//totalGPH += detailView.OwnProdModifiers.d[type].NewLvlDelta;
									switch(parseInt(type))
									{
										case ClientLib.Base.EModifierType.TiberiumProduction:
											upgradeGPH[1] += detailView.OwnProdModifiers.d[type].NewLvlDelta;
											break;
										case ClientLib.Base.EModifierType.CrystalProduction:
											upgradeGPH[2] += detailView.OwnProdModifiers.d[type].NewLvlDelta;
											break;
										case ClientLib.Base.EModifierType.PowerProduction:
											upgradeGPH[5] += detailView.OwnProdModifiers.d[type].NewLvlDelta;
											break;
										case ClientLib.Base.EModifierType.CreditsProduction:
											upgradeGPH[3] += detailView.OwnProdModifiers.d[type].NewLvlDelta;
											break;
									}
									break;
							}
						}
						
						//Make sure gains are present
						var selection = parseInt(this.baseUpgradeMaximizeSelect.getSelection()[0].getModel());
						if (upgradeGPH[selection] == 0)
						{
							buildings = this.removeItemFromArray(buildings, 0, 1);
							this.waitToMaximizeAgain(buildings, currOwnCity);
							return;
						}
						var gainPerCostRatio = (upgradeGPH[selection] / totalCosts) * 100;
						buildings[0].gpcr = gainPerCostRatio;

						//Sort again
						buildings = this.sortBuildingList(buildings);
						this.waitToMaximizeAgain(buildings, currOwnCity);
					},
					
					waitToMaximizeAgain: function(buildings, currOwnCity)
					{
						(function(buildings, currOwnCity)
						{
							setTimeout(function()
							{
								TGCTools.UpgradeWindow.getInstance().doMaximizeUpgrading(buildings, currOwnCity);
							}, 500);
						}(buildings, currOwnCity));
					},
					
					removeItemFromArray: function(array, index, howMany)
					{
						array.splice(index, howMany);
						return array;
					},
					
					sortBuildingList: function(obj)
					{
						var arr = [];
						for (var idx in obj) {
							arr.push({
								'nLevel': obj[idx].nLevel,
								'gpcr': obj[idx].gpcr,
								'x': obj[idx].x,
								'y': obj[idx].y,
								"data": obj[idx].data,
								"detail": obj[idx].detail,
								"tech": obj[idx].tech
							});
						}
						arr.sort(function(a, b) { return b.gpcr - a.gpcr; });
						return arr; // returns array
					}
				}
			});*/
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
								TGCTools.getInstance().attachNetEvent = webfrontend.gui.Util.attachNetEvent;
							else
								TGCTools.getInstance().attachNetEvent = phe.cnc.Util.attachNetEvent;
                        
							//Current Server patch (World 52 - US East Coast) uses webfrontend
							if (typeof phe.cnc.gui.util == 'undefined')
								TGCTools.getInstance().formatNumbersCompact = webfrontend.gui.Util.formatNumbersCompact;    
							else
								TGCTools.getInstance().formatNumbersCompact = phe.cnc.gui.util.Numbers.formatNumbersCompact;   
							
							TGCTools.BaseScanner.getInstance();
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
		}
		window.setTimeout(waitForGame, 1000);
	};
	
	var script = document.createElement("script");
    var txt = injectFunction.toString();
	script.innerHTML = "(" + txt + ")();";
	script.type = "text/javascript";
    
    document.getElementsByTagName("head")[0].appendChild(script);
})();

//------------------------------------Mapa-------------------------//


(function(){

	function create_ccta_map_class()
	{
		qx.Class.define("ccta_map", 
		{
			type: "singleton",
			extend: qx.core.Object,
			
			construct: function()
			{
				try
				{				
					var root = this;
							
					var mapButton = new qx.ui.form.Button('Mapa').set({ enabled: false });
					var app = qx.core.Init.getApplication();
					var optionsBar = app.getOptionsBar().getLayoutParent();
					this.__mapButton = mapButton;
                    ({
							
							width: 25,
							height: 10,
							
						});
					
					optionsBar.getChildren()[0].getChildren()[2].addAt(mapButton,1);
					
					var onReady = function()
					{
						console.log('checking if data is ready');
						var alliance = ClientLib.Data.MainData.GetInstance().get_Alliance().get_Relationships;
						var world = ClientLib.Data.MainData.GetInstance().get_World();
						var endGame = ClientLib.Data.MainData.GetInstance().get_EndGame().get_Hubs().d;
						var command = ClientLib.Net.CommunicationManager.GetInstance().SendSimpleCommand;
						var delegate = phe.cnc.Util.createEventDelegate;
						
						if(!!alliance && !!world && !!command && !!delegate && !!endGame)
						{
							var worldWidth = world.get_WorldWidth();
							if(!worldWidth) return;
							
							var factor = 500 / worldWidth;
							var hubs = [], fortress = [];
							
							for (var index in endGame)
							{
								var currentHub = endGame[index];
								if (currentHub.get_Type() == 1) hubs.push([(currentHub.get_X() + 2) * factor, (currentHub.get_Y() + 2) * factor]);
								if (currentHub.get_Type() == 3) fortress = [(currentHub.get_X() + 2) * factor, (currentHub.get_Y() + 2) * factor];
							}
							
							if (hubs.length > 0)
							{
								timer.stop();
								root.__factor = factor;
								root.__endGame['hubs'] = hubs;
								root.__endGame['fortress'] = fortress;
								root.__init();
							}
							console.log(hubs);
						}
						console.log(!!alliance, !!world, !!command, !!delegate, !!endGame);
					};
					
					var timer = new qx.event.Timer(1000);
					timer.addListener('interval', onReady, this);
					timer.start();
				}
				catch(e)
				{
					console.log(e.toString());
				}
				console.log('ccta_map initialization completed');
			},
			destruct: function(){},
			members: 
			{
				__mapButton: null,
				__allianceExist: null,
				__allianceName: null,
				__allianceId: null,
				__allianceHasRelations: false,
				__defaultAlliances: null,
				__selectedAlliances: null,
				__data: null,
				__totalProcesses: null,
				__completedProcesses: 0,
				__endGame: {},
				__isLoading: false,
				__factor: null,
				
				__init: function()
				{
					try
					{
						var root = this;
						var data = ClientLib.Data.MainData.GetInstance();
						var alliance_data = data.get_Alliance();
						var alliance_exists = alliance_data.get_Exists();
												
						if(alliance_exists)
						{
							var alliance_name = alliance_data.get_Name();
							var alliance_id = alliance_data.get_Id();
							var alliance_relations = alliance_data.get_Relationships();
							
							this.__allianceExist = true;
							this.__allianceId = alliance_id;
							this.__allianceName = alliance_name;
							
							var selectedAlliancesList = [];
							selectedAlliancesList[0] = [alliance_id, 'alliance', alliance_name, 0];
											
							if (alliance_relations != null)
							{
								this.__allianceHasRelations = true;
								alliance_relations.map(function(x)
								{
									var type = x.Relationship, id = x.OtherAllianceId, name = x.OtherAllianceName;
									if ((type == 3) && (selectedAlliancesList.length < 9)) selectedAlliancesList.push([id, 'enemy', name, 0]);
								});
							}
							this.__defaultAlliances = selectedAlliancesList;
						}
						else
						{
							this.__allianceExist = false;
						}
						
						if (typeof(Storage) !== 'undefined' && typeof(localStorage.ccta_map_settings) !== 'undefined')
						{
							this.__selectedAlliances = JSON.parse(localStorage.ccta_map_settings);
						}
						
						this.__mapButton.setEnabled(true);
						this.__mapButton.addListener('execute', function()
						{
							root.getData();
							ccta_map.container.getInstance().open(1);
						}, this);
					}
					catch(e)
					{
						console.log(e.toString());
					}
				},
				
				getData: function()
				{
					if (this.__isLoading === true) return;
					this.__isLoading = true;
					var arr = (this.__selectedAlliances == null) ? this.__defaultAlliances : this.__selectedAlliances;
					
					if(arr != null)
					{
						this.__data = [];
						this.__totalProcesses = arr.length;
						for(var i = 0; i < arr.length; i++)
						{
							this.__getAlliance(arr[i][0], arr[i][1], arr[i][3]);
						}
					}
				},
				
				__getAlliance: function(aid, type, color)
				{
					try
					{
						var alliance = {}, root = this, factor = this.__factor;
						alliance.id = aid;
						alliance.players = {};
						var totalProcesses = this.__totalProcesses;
						
						var getBases = function(pid, pn, p, tp)
						{
							ClientLib.Net.CommunicationManager.GetInstance().SendSimpleCommand("GetPublicPlayerInfo", { id: pid }, 
							phe.cnc.Util.createEventDelegate(ClientLib.Net.CommandResult, this, function(context, data)
							{
								if (data.c != null)
								{
									var totalBases = data.c.length;
									var player = {};
									var bases = [];
									
									for (var b = 0; b < data.c.length; b++)
									{
										var id   = data.c[b].i;
										var name = data.c[b].n;
										var x    = data.c[b].x * factor;
										var y    = data.c[b].y * factor;
										bases.push([x, y, name, id]);
										if((p == tp - 1) && (b == totalBases - 1))
										{
											root.__completedProcesses++;
											var loader = ccta_map.container.getInstance().loader;
											loader.setValue('Loading: ' + root.__completedProcesses + "/" + totalProcesses);
										}
										if(root.__completedProcesses == totalProcesses) root.__onProcessComplete();
									}
									player.id = pid;
									player.name = pn;
									player.bases = bases;
									alliance.players[pn] = player;
								}
							}), null);
						};
						
						ClientLib.Net.CommunicationManager.GetInstance().SendSimpleCommand("GetPublicAllianceInfo", { id: aid }, 
						phe.cnc.Util.createEventDelegate(ClientLib.Net.CommandResult, this, function(context, data)
						{
							if (data == null) return;
							if (data.opois != null)
							{
								var pois = [];
								data.opois.map(function(poi)
								{
									pois.push({'i': poi.i, 'l': poi.l, 't': poi.t, 'x': poi.x * factor, 'y': poi.y * factor});
								});
								alliance.pois = pois;
							}
							if (data.n != null) alliance.name = data.n;
							if (data.m != null)
							{
								
								for (var p = 0; p < data.m.length; p++)
								{
									var playerName = data.m[p].n;
									var playerId   = data.m[p].i;
									getBases(playerId, playerName, p, data.m.length);								
								}
								root.__data.push([alliance, type, color]);
							}
						}), null);
					}
					catch(e)
					{
						console.log(e.toString());
					}
				},
				
				__onProcessComplete: function()
				{
					console.log('process completed - alliances data has been generated', this.__data);
					this.__isLoading = false;
					var win = ccta_map.container.getInstance();
					win.receivedData = this.__data;
					win.__updateList();
					win.drawCanvas();
					win.loader.setValue('Completed');
					this.__totalProcess = null;
					this.__completedProcesses = 0;
					setTimeout(function(){
						win.loader.setValue('');
					}, 3000);
				}
				
			}
			
		});
		
		qx.Class.define("ccta_map.container",
		{
			type: "singleton",
			extend: qx.ui.container.Composite,
			
			construct: function()
			{
				try
				{
					this.base(arguments);
					var layout = new qx.ui.layout.Canvas();
					this._setLayout(layout);
					
					var worldWidth = ClientLib.Data.MainData.GetInstance().get_World().get_WorldWidth();
					var factor = 500 / worldWidth;
					this.__factor = factor;
					
					var zoomIn = new qx.ui.form.Button('+').set({ width: 30 });
					var zoomOut = new qx.ui.form.Button('-').set({ width: 30, enabled: false });
					var zoomReset = new qx.ui.form.Button('R').set({ width: 30, enabled: false });
					var grid = new qx.ui.container.Composite(new qx.ui.layout.Grid(3,1));
					var info = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({ minHeight: 300, padding: 10 });
					var canvasContainer = new qx.ui.container.Composite(new qx.ui.layout.VBox());
					var rightBar = new qx.ui.container.Composite(new qx.ui.layout.VBox(10));
					var leftBar = new qx.ui.container.Composite(new qx.ui.layout.VBox(10));
					var widget = new qx.ui.core.Widget().set({ width: 500, height: 500 });
					var div = new qx.html.Element('div', null, {id: 'canvasContainer'});
					
					
					var li1 = new qx.ui.form.ListItem('Tudo', null, "all");
					var li2 = new qx.ui.form.ListItem('Bases', null, "bases");
					var li3 = new qx.ui.form.ListItem('Aliança', null, "alliance");
					var li4 = new qx.ui.form.ListItem('Selecionar', null, "selected");
					var displayMode = new qx.ui.form.SelectBox().set({ height: 28 });
						displayMode.add(li1);
						displayMode.add(li2);
						displayMode.add(li3);
						displayMode.add(li4);
					
					var zoomBar = new qx.ui.container.Composite(new qx.ui.layout.HBox(15));
					
					var bothOpt = new qx.ui.form.RadioButton('Ambos').set({ model: "both" });
					var basesOpt = new qx.ui.form.RadioButton('Base').set({ model: "bases" });;
					var poisOpt = new qx.ui.form.RadioButton('Poi').set({ model: "pois" });
					var displayOptions = new qx.ui.form.RadioButtonGroup().set({ layout: new qx.ui.layout.HBox(), font :'font_size_11' });
						displayOptions.add(bothOpt);
						displayOptions.add(basesOpt);
						displayOptions.add(poisOpt);
						
					var allianceList = new qx.ui.form.List().set({ font :'font_size_11', height: 215 });
					var editAlliance = new qx.ui.form.Button('Editar Alianças');
					var label = new qx.ui.basic.Label('Transparencia');
					var slider = new qx.ui.form.Slider().set({ minimum: 30, maximum: 100, value: 100 });
					var coordsField = new qx.ui.form.TextField().set({maxWidth: 100, textAlign: 'center', readOnly: 'true', alignX: 'center'});
					var loader = new qx.ui.basic.Label().set({ marginTop: 100 });
					
					grid.set({ minWidth: 780, backgroundColor: '#8e979b', minHeight: 524, margin: 3, paddingTop: 10 });
					rightBar.set({ maxWidth: 130, minWidth: 130, paddingTop: 30, paddingRight: 10 });
					leftBar.set({ maxWidth: 130, minWidth: 130, paddingTop: 30, paddingLeft: 10 });
                    
					var hints = [[zoomIn,'Zoom in'], [zoomOut,'Zoom out'], [zoomReset,'Restet zoom'], [basesOpt,'Mostrar Bases'] , [poisOpt,'Mostrar POIs '], [bothOpt,'Mostrar bases e POIs']]
					for(var i = 0; i < hints.length; i++)
					{
						var tooltip = new qx.ui.tooltip.ToolTip(hints[i][1]);
						hints[i][0].setToolTip(tooltip);
					}
					
					zoomBar.add(zoomIn);
					zoomBar.add(zoomOut);
					zoomBar.add(zoomReset);
					
					rightBar.add(zoomBar);
					rightBar.add(displayMode);
					rightBar.add(displayOptions);
					rightBar.add(allianceList);
					rightBar.add(editAlliance);
					rightBar.add(label);
					rightBar.add(slider);
					
					leftBar.add(coordsField);
					leftBar.add(info);
					leftBar.add(loader);
					
					canvasContainer.add(widget);
					widget.getContentElement().add(div);
					grid.add(leftBar, {row: 1, column: 1});
					grid.add(rightBar, {row: 1, column: 3});
					grid.add(canvasContainer, {row: 1, column: 2});
					
					this.info = info;
					this.coordsField = coordsField;
					this.allianceList = allianceList;
					this.panel = [zoomOut, zoomReset, zoomIn, displayOptions, displayMode, allianceList, editAlliance];
					this.loader = loader;
					this.zoomIn = zoomIn;
					this.zoomOut = zoomOut;
					this.zoomReset = zoomReset;
					
					//canvas
					var cont = document.createElement('div'),
						mask = document.createElement('div'),
						canvas = document.createElement('canvas'),
						ctx = canvas.getContext("2d"),
						root = this;
									
					cont.style.width = '500px';
					cont.style.height = '500px';
					cont.style.position = 'absolute';
					cont.style.overflow = 'hidden';
					cont.style.backgroundColor = '#0b2833';
					
					canvas.style.position = 'absolute';
					canvas.style.backgroundColor = '#0b2833';
					
					mask.style.position = 'absolute';
					mask.style.width = '500px';
					mask.style.height = '500px';
					mask.style.background = 'url("http://archeikhmeri.co.uk/images/map_mask.png") center center no-repeat';
					
					this.canvas = canvas;
					this.mask = mask;
					this.ctx = ctx;				
					
					var __zoomIn = function(){ if (root.scale < 12) root.__scaleMap('up') };
					var __zoomOut = function(){if (root.scale > 1) root.__scaleMap('down') };
					var __zoomReset = function()
					{
						canvas.width = 500;
						canvas.height = 500;
						canvas.style.left = 0;
						canvas.style.top = 0;
						root.scale = 1;
						root.drawCanvas();
						zoomIn.setEnabled(true);
						zoomOut.setEnabled(false);
						zoomReset.setEnabled(false);
					};
					
					cont.appendChild(canvas);
					cont.appendChild(mask);				
					root.__draggable(mask);
					root.resetMap();
					
					slider.addListener('changeValue', function(e)
					{
						if (e.getData())
						{
							var val = e.getData() / 100;
							this.setOpacity(val);
							slider.setToolTipText(" " + val * 100 + "% ");
						}
					}, this);
					
					allianceList.addListener('changeSelection', function(e)
					{
						if ((root.__displayM == "bases") || (root.__displayM == "alliance") || !e.getData()[0]) return;
						var aid = e.getData()[0].getModel();
						root.__selectedA = aid;
						root.drawCanvas();
					}, this);
									
					displayMode.addListener('changeSelection', function(e)
					{
						var dm = e.getData()[0].getModel();
						root.__displayM = dm;
						root.__updateList();
						
						if(dm == "bases")
						{
							displayOptions.setSelection([basesOpt]);
							poisOpt.setEnabled(false);
							bothOpt.setEnabled(false);
							root.__displayO = "bases";
						}
						else
						{
							if(!poisOpt.isEnabled()) poisOpt.setEnabled(true);
							if(!bothOpt.isEnabled()) bothOpt.setEnabled(true);
							displayOptions.setSelection([bothOpt]);
							root.__displayO = "both";
						}
						root.drawCanvas();
					}, this);
					
					displayOptions.addListener('changeSelection', function(e)
					{
						if (!e.getData()[0]) return;
						var dop = e.getData()[0].getModel();
						root.__displayO = dop;
						root.drawCanvas();
					}, this);
					
					editAlliance.addListener('execute', function()
					{
						ccta_map.options.getInstance().open();
					}, this);
					
					var desktop = qx.core.Init.getApplication().getDesktop();
					desktop.addListener('resize', this._onResize, this);
					
					zoomIn.addListener('execute', __zoomIn, this);
					zoomOut.addListener('execute', __zoomOut, this);
					zoomReset.addListener('execute', __zoomReset, this);
					
					this.add(grid);
			
					this.wdgAnchor = new qx.ui.basic.Image("webfrontend/ui/common/frame_basewin/frame_basewindow_tl1.png").set({ width: 3, height: 32 });
					this.__imgTopRightCorner = new qx.ui.basic.Image("webfrontend/ui/common/frame_basewin/frame_basewindow_tr.png").set({ width: 34, height: 35 });				
					this._add(this.__imgTopRightCorner, { right: 0, top: 0, bottom: 28 });
					this._add(new qx.ui.basic.Image("webfrontend/ui/common/frame_basewin/frame_basewindow_r.png").set({ width: 3, height: 1, allowGrowY: true, scale: true }), { right: 0, top: 35, bottom: 29 });
					this._add(new qx.ui.basic.Image("webfrontend/ui/common/frame_basewin/frame_basewindow_br.png").set({ width: 5, height: 28, allowGrowY: true, scale: true }), { right: 0, bottom: 0 });
					this._add(new qx.ui.basic.Image("webfrontend/ui/common/frame_basewin/frame_basewindow_b.png").set({ width: 1, height: 3, allowGrowX: true, scale: true }), { right: 5, bottom: 0, left: 5 });
					this._add(new qx.ui.basic.Image("webfrontend/ui/common/frame_basewin/frame_basewindow_bl.png").set({ width: 5, height: 29 }), { left: 0, bottom: 0 });
					this._add(new qx.ui.basic.Image("webfrontend/ui/common/frame_basewin/frame_basewindow_l.png").set({ width: 3, height: 1, allowGrowY: true, scale: true }), { left: 0, bottom: 29, top: 32 });
					this._add(this.wdgAnchor, { left: 0, top: 0 });
					this._add(new qx.ui.basic.Image("webfrontend/ui/common/frame_basewin/frame_basewindow_tl2.png").set({ width: 25, height: 5 }), { left: 3, top: 0 });
					this._add(new qx.ui.basic.Image("webfrontend/ui/common/frame_basewin/frame_basewindow_t.png").set({ width: 1, height: 3, allowGrowX: true, scale: true }), { left: 28, right: 34, top: 0 });
			
					this.__btnClose = new webfrontend.ui.SoundButton(null, "FactionUI/icons/icon_close_button.png").set({ appearance: "button-close", width: 23, height: 23, toolTipText: this.tr("tnf:close base view") });
					this.__btnClose.addListener("execute", this._onClose, this);
					this._add(this.__btnClose, { top: 6, right: 5 });
					
					var onLoaded = function()
					{
						var counter = 0;
						var check = function()
						{
							if(counter > 60) return;
							var htmlDiv = document.getElementById('canvasContainer');
							(htmlDiv) ? htmlDiv.appendChild(cont) : setTimeout(check, 1000);
							console.log('retrying check for canvasContainer is loaded');
							counter++;
						};
						check();
					};
					onLoaded();
					
				}
				catch(e)
				{
					console.log(e.toString());
				}
				console.log('container creation completed');
			},
			destruct: function(){},
			members:
			{
				info: null,
				coordsField: null,
				panel: null,
				loader: null,
				canvas: null,
				mask: null,
				ctx: null,
				receivedData: null,
				allianceList: null,
				circles: [53, 85, 113, 145, 242],
				scale: 1,
				selectedBase: false,
				elements: [],
				locations: [],
				inProgress: false,
				isRadarVisible: false,
				__interval: null,
				__pointerX: null,
				__pointerY: null,
				__selectedA: null,
				__selectedB: null,
				__displayM: "all",
				__displayO: "both",
				__factor: null,
		
				__setInfo: function(base)
				{
					try
					{
		//				console.log(base);
						var info = this.info;
						info.removeAll();
						if(!base) return;
						for ( var i = 0; i < base.length; i++)
						{
							var title = new qx.ui.basic.Label(base[i][0]).set({font: 'font_size_13_bold', textColor: '#375773'});
							var value = new qx.ui.basic.Label(base[i][1]).set({font: 'font_size_11', textColor: '#333333', marginBottom: 5});
							info.add(title);
							info.add(value);
						}
					}
					catch(e)
					{
						console.log(e.toString());
					}
				},
				
				__createLayout: function()
				{
					var s = this.scale, circles = this.circles, ctx = this.ctx;
					for (var i = 0; i < circles.length; i++) {
						var r = circles[i];
						ctx.beginPath();
						ctx.arc(250, 250, r, 0, Math.PI * 2, true);
						ctx.lineWidth = (i == 4) ? 1/s : 0.3/s;
						ctx.strokeStyle = '#8ce9ef';
						ctx.stroke();
						ctx.closePath();
					}
					
					for(var i = 0; i < 8; i++){
						var r = circles[4], a = (Math.PI * i / 4) - Math.PI / 8;
						ctx.beginPath();
						ctx.moveTo(250,250);
						ctx.lineTo((r * Math.cos(a)) + 250, (r * Math.sin(a)) + 250);
						ctx.lineWidth = 0.3/s;
						ctx.strokeStyle = '#8ce9ef';
						ctx.stroke();
						ctx.closePath();
					}
					
					var endGame = ccta_map.getInstance().__endGame, hubs = endGame.hubs, fortress = endGame.fortress;
					var fortressX = fortress[0];
					var fortressY = fortress[1];
					
					var grd = ctx.createLinearGradient(fortressX, fortressY - 0.5, fortressX, fortressY + 0.5);
						grd.addColorStop(0, 'rgba(200, 228, 228, 0.5)');
						grd.addColorStop(1, 'rgba(170, 214, 118, 0.5)');
					ctx.beginPath();
					ctx.arc(fortressX - 0.2, fortressY - 0.2, 1, 0, Math.PI * 2, true);
					ctx.fillStyle = grd;
					ctx.lineWidth = 0.1;
					ctx.strokeStyle = '#a5fe6a';
					ctx.fill();
					ctx.stroke();	
					ctx.closePath();
						
					for(var i = 0; i < hubs.length; i++)
					{
						var c = 'rgba(200, 228, 228, 0.5)', d = 'rgba(170, 214, 118, 0.5)', l = 1.3, b = 0.1;
						var x = hubs[i][0];
						var y = hubs[i][1];
						var grd = ctx.createLinearGradient(x, y, x, y+l);
							grd.addColorStop(0, c);
							grd.addColorStop(1, d);
						ctx.beginPath();
						ctx.rect(x-b, y-b, l, l);
						ctx.fillStyle = grd;
						ctx.fill();
						ctx.strokeStyle = '#a5fe6a';
						ctx.lineWidth = b;
						ctx.stroke();
						ctx.closePath();
					}
					
				},
				
				__createAlliance: function(name, data, type, color)
				{
					try
					{
						this.inProgress = true;
						var colors = {
							"bases": {"alliance":[["#86d3fb","#75b7d9"]], "owner":[["#ffc48b","#d5a677"]], "enemy":[["#ff8e8b","#dc7a78"],['#e25050','#cc2d2d'],['#93b7f8','#527ef2'],['#d389aa','#b14e69']], "nap":[["#ffffff","#cccccc"]], "selected":[["#ffe50e", "#d7c109"]], "ally":[["#6ce272", "#5fc664"],['#d4e17e','#b3ca47'],['#92f8f2','#52f2e8'],['#1cba1c','#108510']]},
							"pois": [["#add2a8","#6db064"], ["#75b9da","#4282bd"], ["#abd2d6","#6bafb7"], ["#e2e0b7","#ccc880"], ["#e5c998","#d09e53"], ["#d4a297","#b35a54"], ["#afa3b1","#755f79"]]
						};
						
						var owner = ClientLib.Data.MainData.GetInstance().get_Player().name, ctx = this.ctx, factor = this.__factor;
						var dop = this.__displayO, dmd = this.__displayM, root = this, s = this.scale;
						
						var r = (s < 3) ? 0.65 : (s > 3) ? 0.35 : 0.5;
						
						var createBase = function (x, y, bt, clr) 
						{
							var c = colors.bases[bt][clr][0], d = colors.bases[bt][clr][1];
							var grd=ctx.createLinearGradient(x, y-r, x, y+r);
								grd.addColorStop(0, c);
								grd.addColorStop(1, d);
							ctx.beginPath();
							ctx.arc(x, y, r, 0, Math.PI * 2, true);
							ctx.closePath();
							ctx.fillStyle = grd;
							ctx.fill();
							ctx.lineWidth = 0.1;
							ctx.strokeStyle = '#000000';
							ctx.stroke();
							ctx.closePath();
						};
						
						var createPoi = function(x, y, t) 
						{
							var c = colors.pois[t][0], d = colors.pois[t][1];
							var grd = ctx.createLinearGradient(x, y-r, x, y+r);
								grd.addColorStop(0, c);
								grd.addColorStop(1, d);
							ctx.beginPath();
							ctx.rect(x-r, y-r, r*2, r*2);
							ctx.fillStyle = grd;
							ctx.fill();
							ctx.strokeStyle = "#000000";
							ctx.lineWidth = 0.1;
							ctx.stroke();
							ctx.closePath();
						};
						
						if (dop != "pois")
						{
							for (var player in data.players) {
								for (var i = 0; i < data.players[player].bases.length; i++){
									var b = data.players[player].bases[i], pid = data.players[player].id;
									if(dmd == "bases")
									{
										if (player == owner)
										{
											this.elements.push({"x":b[0],"y":b[1],"an":name,"pn":player,"bn":b[2],"bi":b[3],"ai":data.id,"pi":pid,"type":"base"});
											this.locations.push([b[0]/factor, b[1]/factor]);
											createBase(b[0], b[1], 'owner', 0);
										}
									}
									else
									{
										this.elements.push({"x":b[0],"y":b[1],"an":name,"pn":player,"bn":b[2],"bi":b[3],"ai":data.id,"pi":pid,"type":"base"});
										this.locations.push([b[0]/factor, b[1]/factor]);
										(player == owner) ? createBase(b[0], b[1], 'owner', 0) : createBase(b[0], b[1], type, color);
									}
								}
							}
						}
						
						if (dop != "bases")
						{
							for (var i = 0; i < data.pois.length; i++){
								var x = data.pois[i].x, y = data.pois[i].y, t = data.pois[i].t, l = data.pois[i].l;
								createPoi(x, y, t - 2);
								this.elements.push({"x": x, "y": y, "an": name, "ai": data.id, "t": t, "l": l});
								this.locations.push([x/factor, y/factor]);
							}
						}
						this.inProgress = false;
					}
					catch(e)
					{
						console.log(e.toString());
					}
				},
				
				__draggable: function(mask)
				{
					try
					{
						var start, end, initCoords = [], selectedBase = false, root = this, canvas = this.canvas, c = 0;
						var factor = root.__factor;				
						
						var displayBaseInfo = function()
						{
							try
							{
								if (!selectedBase || root.inProgress) return;
								var base = [];
								var pois = ['Tiberium', 'Crystal', 'Reactor', 'Tungenio', 'Uranio', 'Aeronaves', 'Resonator'];
								for ( var i in selectedBase)
								{
									var txt = "", val = "";
									switch(i)
									{
										case "an": txt = "Aliança: "; val = selectedBase[i]; break;
										case "bn": txt = "Base   : "; val = selectedBase[i]; break;
										case "pn": txt = "Jogador : "; val = selectedBase[i]; break;
										case "l" : txt = "Nível   : "; val = selectedBase[i]; break;
										case "t" : txt = "Tipo    : "; val = pois[selectedBase[i] - 2]; break;
										default  : txt = false;
									}
									if(txt)
									{
										base.push([txt, val]);
									}
									root.__setInfo(base);
								}
							}
							catch(e)
							{
								console.log(e.toString());
							}
						};
						
						var onMapHover = function(event)
						{
							var loc = root.locations, elements = root.elements, coordsField = root.coordsField;
							var getCoords = function()
							{
								var canvasRect = canvas.getBoundingClientRect();
								var x = (event.pageX - canvasRect.left), y = (event.pageY - canvasRect.top);
								return [x, y];
							};
							
							var coords = getCoords();
							var x = coords[0] + canvas.offsetLeft, y = coords[1] + canvas.offsetTop;
		
							if(Math.sqrt(Math.pow(x - 250, 2) + Math.pow(y - 250, 2)) > 242)
							{
								coordsField.setValue("");
								return;
							}
							
							x = Math.round(coords[0] / (root.scale * factor)); root.__pointerX = x;
							y = Math.round(coords[1] / (root.scale * factor)); root.__pointerY = y;
							
							coordsField.setValue(x + ":" + y);
							
							if (root.scale < 2 || root.inProgress) return;
		
							for(var i = 0; i < loc.length; i++)
							{
								var elmX = loc[i][0], elmY = loc[i][1];
								if ((x == elmX) && (y == elmY)) 
								{
									selectedBase = elements[i];
									displayBaseInfo();
									break;
								}
								else
								{
									selectedBase = false;
									root.__setInfo(false);
								}
							}
						};
						
						var onMapDrag = function(event)
						{
							if (root.scale == 1 || root.inProgress) return;
							var cx = canvas.offsetLeft, cy = canvas.offsetTop, mx = event.pageX, my = event.pageY;
							var newX = cx + mx - initCoords[0], newY = cy + my - initCoords[1];
							initCoords[0] = mx;
							initCoords[1] = my;
							canvas.style.top = newY + 'px';
							canvas.style.left = newX + 'px';
						};
						
						var onMapWheel = function(event)
						{
							if (root.inProgress) return;
							var delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
							if((delta < 0 && root.scale <= 1) || (delta > 0 && root.scale >= 12)) return;
							c += delta;
							var str = ( Math.abs(c) % 3 == 0 ) ? ((delta < 0) ? 'down' : 'up') : false;
							if(str) root.__scaleMap(str);
						};
						
						var onMapDown = function(event){
							var x = event.pageX, y = event.pageY, t = new Date();
							initCoords = [x,y];
							start = t.getTime();
							mask.removeEventListener('mousemove', onMapHover, false);
							mask.addEventListener('mousemove', onMapDrag, false);
						};
						
						var onMapUp = function(event){
							var x = event.pageX, y = event.pageY, t = new Date();
							end = t.getTime();
							initCoords = [x,y];
							mask.removeEventListener('mousemove', onMapDrag, false);
							mask.addEventListener('mousemove', onMapHover, false); 
							if (end - start < 150) webfrontend.gui.UtilView.centerCoordinatesOnRegionViewWindow(root.__pointerX, root.__pointerY);
						};
						
						var onMapOut = function(event){
							mask.removeEventListener('mousemove', onMapDrag, false);
							mask.addEventListener('mousemove', onMapHover, false); 
						};
						
						mask.addEventListener('mouseup', onMapUp, false);
						mask.addEventListener('mousedown', onMapDown, false);
						mask.addEventListener('mousemove', onMapHover, false); 
						mask.addEventListener('mouseout', onMapOut, false);
						mask.addEventListener('mousewheel', onMapWheel, false);
						mask.addEventListener('DOMMouseScroll', onMapWheel, false);
					}
					catch(e)
					{
						console.log(e.toString());
					}
				},
				
				__startRadarScan: function()
				{
					this.isRadarVisible = true;
					var FRAMES_PER_CYCLE = 20, FRAMERATE = 20, RINGS = 6;
					var canvas = this.canvas, ctx = this.ctx, canvassize = 400, animationframe = 0, root = this;
					var ringsize = canvassize / (2 * RINGS + 1);
					var radiusmax = ringsize / 2 + ringsize + (RINGS - 1) * ringsize;
				
					function animateRadarFrame() {
						ctx.clearRect(0, 0, canvas.width, canvas.height);
						root.__createLayout();
						var radius, alpha;
						for (var ringno = 0; ringno < RINGS; ringno++)
						{
							radius = ringsize / 2 + (animationframe / FRAMES_PER_CYCLE) * ringsize + ringno * ringsize;
							alpha = (radiusmax - radius) / radiusmax;
							ctx.beginPath();
							ctx.fillStyle = "rgba(92,178,112," + alpha + ")";
							ctx.arc(250, 250, radius, 0, 2 * Math.PI, false);
							ctx.fill();
							ctx.closePath();
						}
				
						ctx.beginPath();
						ctx.fillStyle = "rgb(100,194,122)";
						ctx.arc(250, 250, ringsize / 2, 0, 2 * Math.PI, false);
						ctx.fill();
						ctx.closePath();
				
						animationframe = (animationframe >= (FRAMES_PER_CYCLE - 1)) ?  0 :  animationframe + 1;
					}
					this.__interval = setInterval(animateRadarFrame, 1000 / FRAMERATE);
				},
				
				__stopRadarScan: function()
				{
					if(!this.isRadarVisible) return;
					clearInterval(this.__interval);
					this.isRadarVisible = false;
					this.__enablePanel();
				},
				
				__disablePanel: function()
				{
					this.inProgress = true;
					for (var i = 0; i < this.panel.length; i++) this.panel[i].setEnabled(false);
				},
				
				__enablePanel: function()
				{
					for (var i = 0; i < this.panel.length; i++) if(i>1) this.panel[i].setEnabled(true);
				},
				
				__createIcon: function(color, width, height)
				{
					var canvas = document.createElement("canvas");
					canvas.width = width;
					canvas.height = height;
				
					var ctx = canvas.getContext("2d");
					ctx.beginPath();
					ctx.rect(0, 0, width, height);
					ctx.fillStyle = color;
					ctx.fill();
					ctx.closePath();
				
					var data = canvas.toDataURL("image/png");
					return data;
				},
				
				__updateList: function()
				{
					var dm = this.__displayM;
					this.__selectedA = null;
					this.allianceList.removeAll();
					var d = this.receivedData, root = this;
					var colors = {"enemy":["#ff807d", "#a93939", "#739bf5", "#c26b89"], "ally": ["#3bbe5d", "#c4d663", "#73f5ed", "#169f16"], "nap": ["#ffffff"], "selected": ["#ffe50e"], "alliance": ["#75b7d9"], "owner": ["#ffc48b"]};
					for (var i = 0; i < d.length; i++)
					{
						var name = d[i][0].name, type = d[i][1], aid = d[i][0].id, clr = d[i][2];
						if((dm == "all") || (dm == "selected"))
						{
							var color = colors[type][clr];
							var li = new qx.ui.form.ListItem(name, root.__createIcon(color, 10, 10), aid);
							var tooltip = new qx.ui.tooltip.ToolTip(name + " - " + type, root.__createIcon(color, 15, 15));
							li.setToolTip(tooltip);
							this.allianceList.add(li);
						}
						else
						{
							if(type == "alliance")
							{
								var li = new qx.ui.form.ListItem(name, null, aid);
								var tooltip = new qx.ui.tooltip.ToolTip(name + " - " + type, root.__createIcon(color, 15, 15));
								li.setToolTip(tooltip);
								this.allianceList.add(li);
								break;
							}
						}
					}
				},
				
				drawCanvas: function()
				{
					var dmd = this.__displayM, b = this.receivedData, list = this.allianceList;
					var selected = (this.__selectedA != null && typeof this.__selectedA == 'number') ? this.__selectedA : false;
					var mask = this.mask, n = this.scale, canvas = this.canvas, ctx = this.ctx;
					
					this.elements = [];
					this.locations = [];
					this.__stopRadarScan();
					canvas.width = n * 500;
					canvas.height = n * 500;
					ctx = canvas.getContext("2d");
					ctx.scale(n, n);
					
					this.__createLayout();
					
					for (var i = 0; i < b.length; i++)
					{
						var name = b[i][0].name, data = b[i][0], type = b[i][1], aid = b[i][0].id, color = b[i][2];
						if(((dmd == "alliance") || (dmd == "bases")) && (type == "alliance"))
						{
							this.__createAlliance(name, data, type, 0);
							break;
						}
						if(dmd == "all")
						{
							if(selected && (aid == selected))
							{
								type = 'selected';
								color = 0;
							}
							this.__createAlliance(name, data, type, color);
						}
						if((dmd == "selected") && selected && (aid == selected))
						{
								this.__createAlliance(name, data, type, color);
								break;
						}
					}
				},
					
				__scaleMap: function(str)
				{
					try
					{
						var newScale = (str == 'up') ? this.scale + 2 : this.scale - 2;
						if (newScale > 12 || newScale < 1 || this.inProgress) return;
						var canvas = this.canvas, ctx = this.ctx;
						var x = ((canvas.offsetLeft - 250) * newScale/this.scale) + 250,
							y = ((canvas.offsetTop - 250) * newScale/this.scale) + 250;
							
						this.scale = newScale;
						switch (this.scale)
						{
							case 1: this.zoomOut.setEnabled(false); this.zoomReset.setEnabled(false); this.zoomIn.setEnabled(true); break
							case 11: this.zoomOut.setEnabled(true); this.zoomReset.setEnabled(true); this.zoomIn.setEnabled(false); break
							default: this.zoomOut.setEnabled(true); this.zoomReset.setEnabled(true); this.zoomIn.setEnabled(true); break
						}
						ctx.clearRect(0, 0, canvas.width, canvas.height);
						this.drawCanvas();
						canvas.style.left = newScale == 1 ? 0 : x + 'px';
						canvas.style.top = newScale == 1 ? 0 : y + 'px';
					}
					catch(e)
					{
						console.log(e.toString());
					}
				},
				
				resetMap: function()
				{
					var canvas = this.canvas, ctx = this.ctx;
					this.scale = 1;
					canvas.width = 500; canvas.height = 500; canvas.style.left = 0; canvas.style.top = 0;
					ctx.clearRect(0, 0, canvas.width, canvas.height);
					this.__disablePanel();
					this.__startRadarScan();
				},
				
				open: function(faction)
				{
					
					var app = qx.core.Init.getApplication();
					var mainOverlay = app.getMainOverlay();
				   
					this.setWidth(mainOverlay.getWidth());
					this.setMaxWidth(mainOverlay.getMaxWidth());
					this.setHeight(mainOverlay.getHeight());
					this.setMaxHeight(mainOverlay.getMaxHeight());
					
					app.getDesktop().add(this, { left: mainOverlay.getBounds().left, top: mainOverlay.getBounds().top });
				},
				
				_onClose: function()
				{
					var opt = ccta_map.options.getInstance();
					var app = qx.core.Init.getApplication();
					app.getDesktop().remove(this);
					if(opt.isSeeable()) opt.close();
				},
				
				_onResize: function()
				{
					var windowWidth = window.innerWidth - 10;
					var width = this.getWidth();
					var offsetLeft = (windowWidth - width) / 2;
					
					this.setDomLeft(offsetLeft);
					
					var opt = ccta_map.options.getInstance();
					if (opt.isSeeable()) opt.setDomLeft(offsetLeft + width + 5);
				}
				
			}
		});
			
		qx.Class.define('ccta_map.options',
		{
			type: 'singleton',
			extend: webfrontend.gui.CustomWindow,
			
			construct: function()
			{
				try
				{
					this.base(arguments);
					this.setLayout(new qx.ui.layout.VBox(10));
					this.set({
						width: 200,
						height: 500,
						showMinimize: false,
						showMaximize: false,
						alwaysOnTop: true,
						caption: 'Editar Alianças'
					});
					
					this.__getAlliances();
					
					var root = this;
									
					var searchBox = new qx.ui.form.TextField().set({ placeholder: 'Search...'});
					var list = new qx.ui.form.List().set({ height: 80 });
					var editList = new qx.ui.form.List().set({ height: 160, selectionMode: 'additive' });
						
					var radioButtons = [['Enemigo', 'enemy'],['Aliado', 'ally'],['PNA', 'nap']];
					var radioGroup = new qx.ui.form.RadioButtonGroup().set({ layout: new qx.ui.layout.HBox(10), textColor: '#aaaaaa' });
						for (var i = 0; i < radioButtons.length; i++)
						{
							var radioButton = new qx.ui.form.RadioButton(radioButtons[i][0]);
								radioButton.setModel(radioButtons[i][1]);
							radioGroup.add(radioButton);
						}
					
					var colors = root.__colors;
					var colorSelectBox = new qx.ui.form.SelectBox().set({ height: 28 });
					var addColors = function(type)
					{
						colorSelectBox.removeAll();
						for (var i = 0; i < colors[type].length; i++)
						{
							var src = root.__createIcon(colors[type][i], 60, 15);
							var listItem = new qx.ui.form.ListItem(null, src, i);
							colorSelectBox.add(listItem);
						}
					};
					addColors('enemy');
						
					var addButton = new qx.ui.form.Button('Adicionar').set({ enabled: false, width: 85, toolTipText: 'Maximum allowed number of alliances is 8.' });;
					var removeButton = new qx.ui.form.Button('Remover').set({ enabled: false, width: 85 });;
					var applyButton = new qx.ui.form.Button('Aplicar').set({ enabled: false });;
					var defaultsButton = new qx.ui.form.Button('Defeito').set({ enabled: false, width: 85 });;
					var saveButton = new qx.ui.form.Button('Salvar').set({ enabled: false, width: 85 });;
					
					var hbox1 = new qx.ui.container.Composite(new qx.ui.layout.HBox(10))
					var hbox2 = new qx.ui.container.Composite(new qx.ui.layout.HBox(10))
					
					hbox1.add(addButton);
					hbox1.add(removeButton);
					
					hbox2.add(saveButton);
					hbox2.add(defaultsButton);
						
					this.searchBox      = searchBox;
					this.list           = list;
					this.editList       = editList;
					this.radioGroup     = radioGroup;
					this.colorSelectBox = colorSelectBox;
					this.addButton      = addButton;
					this.removeButton   = removeButton;
					this.saveButton     = saveButton;
					this.defaultsButton = defaultsButton;
					this.applyButton    = applyButton;
					
					this.add(searchBox);
					this.add(list);
					this.add(editList);
					this.add(radioGroup);
					this.add(colorSelectBox);
					this.add(hbox1);
					this.add(hbox2);
					this.add(applyButton);
					
					this.addListener('appear', function()
					{
						var cont = ccta_map.container.getInstance()
						var bounds = cont.getBounds(), left = bounds.left, top = bounds.top, width = bounds.width, height = bounds.height;
						searchBox.setValue('');
						list.removeAll();
						addButton.setEnabled(false);
						removeButton.setEnabled(false);
						applyButton.setEnabled(false);
						radioGroup.setSelection([ radioGroup.getSelectables()[0] ]);
						colorSelectBox.setSelection([ colorSelectBox.getSelectables()[0] ]);
						this.__updateList();
						this.__checkDefaults();
						this.__checkSavedSettings();
						this.setUserBounds(left + width + 5, top, 200, height);
					}, this);
					
					searchBox.addListener('keyup', this.__searchAlliances, this);
					
					radioGroup.addListener('changeSelection', function(e)
					{
						if(e.getData()[0]) addColors(e.getData()[0].getModel());
					}, this);
					
					list.addListener('changeSelection', function(e)
					{
						if (!e.getData()[0]) return;
						var items = this.__items, aid = e.getData()[0].getModel();
						(((items != null) && (items.indexOf(aid) > -1)) || (items.length > 8)) ? addButton.setEnabled(false) : addButton.setEnabled(true);
					}, this);
					
					editList.addListener('changeSelection', function(e)
					{
						(e.getData()[0]) ? removeButton.setEnabled(true) : removeButton.setEnabled(false);
					}, this);
					
					addButton.addListener('execute', function()
					{
						var aid = list.getSelection()[0].getModel(), 
							name = list.getSelection()[0].getLabel(),
							type = radioGroup.getSelection()[0].getModel(), 
							color = colorSelectBox.getSelection()[0].getModel();
						
						var li = new qx.ui.form.ListItem(name + " - " + type, root.__createIcon(colors[type][color], 15, 15), {'aid': aid, 'type': type, 'name': name, 'color': color});
						editList.add(li);
						list.resetSelection();
						addButton.setEnabled(false);
						root.__updateItems();
					}, this);
					
					removeButton.addListener('execute', function()
					{
						var selection = (editList.isSelectionEmpty()) ? null : editList.getSelection();
						var ownAlliance = ccta_map.getInstance().__allianceName;
						if(selection != null)
						{
							for(var i = selection.length - 1; i > -1; i--) if(selection[i].getModel().name != ownAlliance) editList.remove(selection[i]);
							root.__updateItems();
							editList.resetSelection();
						}
					}, this);
					
					applyButton.addListener('execute', this.__applyChanges, this);
					defaultsButton.addListener('execute', this.__setDefaults, this);
					saveButton.addListener('execute', this.__saveSettings, this);
		
				}
				catch(e)
				{
					console.log(e.toString());
				}
				console.log('Options Panel creation completed');
			},
			destruct: function()
			{
				
			},
			members:
			{
				__data: null,
				searchBox: null,
				list: null,
				editList: null,
				radioGroup: null,
				colorSelectBox: null,
				addButton: null,
				removeButton: null,
				saveButton: null,
				applyButton: null,
				defaultsButton: null,
				__items: null,
				__colors: {"enemy":["#ff807d", "#a93939", "#739bf5", "#c26b89"], "ally": ["#3bbe5d", "#c4d663", "#73f5ed", "#169f16"], "nap": ["#ffffff"], "selected": ["#ffe50e"], "alliance": ["#75b7d9"], "owner": ["#ffc48b"]},
		
				
				__getAlliances: function()
				{
					var root = this;
					ClientLib.Net.CommunicationManager.GetInstance().SendSimpleCommand("RankingGetData", 
					{firstIndex: 0, lastIndex: 3000, ascending: true, view: 1, rankingType: 0, sortColumn: 2}, 
					phe.cnc.Util.createEventDelegate(ClientLib.Net.CommandResult, this, function(context, data)
					{
						if(data.a != null)
						{
							var arr = [];
							for( var i = 0; i < data.a.length; i++) arr[i] = [data.a[i].an, data.a[i].a];
							root.__data = arr;
						}
						
					}), null);
				},
				
				__createIcon: function(color, width, height)
				{
					var canvas = document.createElement("canvas");
					canvas.width = width;
					canvas.height = height;
				
					var ctx = canvas.getContext("2d");
					ctx.beginPath();
					ctx.rect(0,0,width,height);
					ctx.fillStyle = color;
					ctx.fill();
					ctx.closePath();
				
					var data = canvas.toDataURL("image/png");
					return data;
				},
				
				__updateList: function()
				{
					var map = ccta_map.getInstance();
					var selectedItems = [], list = this.editList, root = this;
					var alliancesList = (map.__selectedAlliances == null) ? map.__defaultAlliances : map.__selectedAlliances;
					var colors = this.__colors;
					list.removeAll();
					
					alliancesList.map(function(a)
					{
						var aid = a[0], at = a[1], an  = a[2], c = a[3];
						var li = new qx.ui.form.ListItem(an + " - " + at, root.__createIcon(colors[at][c], 15, 15), {'aid': aid, 'type': at, 'name': an, 'color': c});
						list.add(li);
						selectedItems.push(aid);
					});
					this.__items = selectedItems;
				},
				
				__setDefaults: function()
				{
					var map = ccta_map.getInstance();
					var selectedItems = [], list = this.editList, root = this, colors = this.__colors;
					var alliancesList = map.__defaultAlliances;
					list.removeAll();
					
					alliancesList.map(function(a)
					{
						var aid = a[0], at = a[1], an  = a[2], c = a[3];
						var li = new qx.ui.form.ListItem(an + " - " + at, root.__createIcon(colors[at][c], 15, 15), {'aid': aid, 'type': at, 'name': an, 'color': c});
						list.add(li);
						selectedItems.push(aid);
					});
					this.__items = selectedItems;
					this.__currentListModified();
					this.defaultsButton.setEnabled(false);
				},
				
				__searchAlliances: function()
				{
					var str = this.searchBox.getValue(), data = this.__data, list = this.list;
					list.removeAll();
					if (!data || (str == '')) return;
					
					data.map(function(x)
					{
						var patt = new RegExp("^" + str + ".+$", "i");
						var test = patt.test(x[0]);
						
						if(test)
						{
							var listItem = new qx.ui.form.ListItem(x[0], null, x[1]);
							list.add(listItem);
						}
					});
				},
				
				__updateItems: function()
				{
					var items = [], listItems = this.editList.getSelectables();
					for (var i = 0; i < listItems.length; i++) items.push(listItems[i].getModel().aid);
					this.__items = items;
					this.__checkSavedSettings();
					this.__currentListModified();
				},
				
				__applyChanges: function()
				{
					var selectedAlliances = [], listItems = this.editList.getSelectables();
					for(var i = 0; i < listItems.length; i++)
					{
						var model = listItems[i].getModel(), aid = model.aid, type = model.type, name = model.name, color = model.color;
						selectedAlliances.push([aid, type, name, color]);
					}
					ccta_map.getInstance().__selectedAlliances = selectedAlliances;
					ccta_map.container.getInstance().resetMap();
					ccta_map.getInstance().getData();
					this.close();
				},
				
				__saveSettings: function()
				{
					if(typeof(Storage) === 'undefined') return;
					
					var selectedAlliances = [], listItems = this.editList.getSelectables();
					for(var i = 0; i < listItems.length; i++)
					{
						var model = listItems[i].getModel(), aid = model.aid, type = model.type, name = model.name, color = model.color;
						selectedAlliances.push([aid, type, name, color]);
					}
					
					(!localStorage.ccta_map_settings) ? localStorage['ccta_map_settings'] = JSON.stringify(selectedAlliances) : localStorage.ccta_map_settings = JSON.stringify(selectedAlliances);
					this.saveButton.setEnabled(false);
		//			console.log(localStorage.ccta_map_settings);
				},
				
				__checkSavedSettings: function()
				{
					if(typeof(Storage) === 'undefined') return;
					var original = (localStorage.ccta_map_settings) ? JSON.parse(localStorage.ccta_map_settings) : null;
					var items = this.__items;
					var changed = false;
					
					if ((items != null) && (original != null) && (items.length != original.length)) changed = true;
					if ((items != null) && (original != null) && (items.length == original.length))
					{
						original.map(function(x)
						{
							if (items.indexOf(x[0]) < 0) changed = true;
						});
					}
					((items.length > 0) && ((original === null) || changed)) ? this.saveButton.setEnabled(true) : this.saveButton.setEnabled(false);
				},
				
				__checkDefaults: function()
				{
					var defaults = ccta_map.getInstance().__defaultAlliances, items = this.__items, changed = false;
					if(!defaults) return;
					if ((items != null) && (defaults != null) && (items.length != defaults.length)) changed = true;
					if ((items != null) && (defaults != null) && (items.length == defaults.length))
					{
						defaults.map(function(x)
						{
							if (items.indexOf(x[0]) < 0) changed = true;
						});
					}
					(changed) ? this.defaultsButton.setEnabled(true) : this.defaultsButton.setEnabled(false);
				},
				
				__currentListModified: function()
				{
					var map = ccta_map.getInstance(), current = (map.__selectedAlliances == null) ? map.__defaultAlliances : map.__selectedAlliances;
					var items = this.__items, changed = false;
					
					current.map(function(x)
					{
						if(items.indexOf(x[0]) < 0) changed = true;
					});
					((items.length > 0) && ((items.length != current.length) || (changed == true))) ? this.applyButton.setEnabled(true) : this.applyButton.setEnabled(false);
				}
				
			}
		});
	}
	
	var cctaMapLoader = function()
	{
		
		
		if ((typeof ClientLib == 'undefined') || (typeof qx == 'undefined') || (qx.core.Init.getApplication().initDone == false))
		{
			setTimeout(cctaMapLoader, 1000);
			console.log('retrying....');
		}
		else
		{
			create_ccta_map_class();
			ccta_map.getInstance();
		}
	};
	window.setTimeout(cctaMapLoader, 10000);

})();
//-------------------------------Ranking-----------------------------//

(function () {
    var PvpRankMod_main = function () {
        var allianceId = null;
        var allianceName = null;
        var button = null;
        var general = null;
        var memberCount = null;
        var playerInfoWindow = null;
        var playerName = null;
        var pvpHighScoreLabel = null;
        var rowData = null;
        var tabView = null;
        var dataTable = null;

        function CreateMod() {
            try {
                console.log('PvP/PvE Ranking Mod.');
                var tr = qx.locale.Manager.tr;
                playerInfoWindow = webfrontend.gui.info.PlayerInfoWindow.getInstance();
                general = playerInfoWindow.getChildren()[0].getChildren()[0].getChildren()[0].getChildren()[0].getChildren()[0].getChildren()[1].getChildren()[0];
                tabView = playerInfoWindow.getChildren()[0];
                playerName = general.getChildren()[1];

                // Add button to score tab-page to redirect to score history graph of the player.
                // ( For my own alliance only ; since only our member scores are logged external.
                allianceName = ClientLib.Data.MainData.GetInstance().get_Alliance().get_Name();
                if (allianceName == 'Oldskool') {
                    button = new qx.ui.form.Button("Score graph");
                    button.addListener("execute", function () {

                        var link = "http://pixaqu.nl/test/tibscoreos.php?user=";
                        link += playerName.getValue();
                        window.open(link, "_blank");
                    });
                    general.add(button, {
                        row: 3,
                        column: 1
                    });
                }

                // New PvP Ranking Tab-page
                var pvpRankingTab = new qx.ui.tabview.Page("Ranking");
                pvpRankingTab.setLayout(new qx.ui.layout.Canvas());
                pvpRankingTab.setPaddingTop(6);
                pvpRankingTab.setPaddingLeft(8);
                pvpRankingTab.setPaddingRight(10);
                pvpRankingTab.setPaddingBottom(8);

                // Label PvP Ranking
                pvpHighScoreLabel = new qx.ui.basic.Label("PvP and PvE for alliance: ").set({
                    textColor: "text-value",
                    font: "font_size_13_bold"
                });
                pvpRankingTab.add(pvpHighScoreLabel);

                // Table to show the PvP Scores of each player
                dataTable = new webfrontend.data.SimpleColFormattingDataModel().set({
                    caseSensitiveSorting: false
                });
                dataTable.setColumns(["Name", "PvP", "PvE" ], ["name", "pve", "pvp" ]);
                var pvpTable = new webfrontend.gui.widgets.CustomTable(dataTable);
                var columnModel = pvpTable.getTableColumnModel();
                columnModel.setColumnWidth(0, 200);
                columnModel.setColumnWidth(1, 80);
                columnModel.setColumnWidth(2, 80);
                pvpTable.setStatusBarVisible(false);
                pvpTable.setColumnVisibilityButtonVisible(false);
                pvpRankingTab.add(pvpTable, {
                    left: 0,
                    top: 25,
                    right: 0,
                    bottom: 0
                });

                // Add Tab page to the PlayerInfoWindow
                tabView.add(pvpRankingTab);

                // Hook up callback when another user has been selected
                playerInfoWindow.addListener("close", onPlayerInfoWindowClose, this);
                playerName.addListener("changeValue", onPlayerChanged, this);

            } catch (e) {
                console.log("CreateMod: ", e);
            }
        }


        // Callback GetPublicPlayerInfoByName
        // [bde] => Forgotten Bases Destroyed
        // [d] => Player Bases Destroyed
        // [n] => Player Name
        function onPlayerInfoReceived(context, data) {
            try {
                var memberName = data.n
                var pvp = data.d;
                var pve = data.bde;
               
                // Add player with its PvP/PvE score.
                rowData.push([memberName, pvp, pve]);

                if (rowData.length == memberCount) {
                    // Show Alliance name in label.
                    pvpHighScoreLabel.setValue("PvP and PvE for alliance: " + data.an);

                    dataTable.setData(rowData);
                    dataTable.sortByColumn(1, false);
                }

            } catch (e) {
                console.log("onPlayerInfoReceived: ", e);
            }
        }


        // GetPublicAllianceInfo Callback
        // [m] => Member Array
        // (
        //    [0] => Array
        //            [n] => Name
        // )
        // [mc]  => Member Count
        function onAllianceInfoReceived(context, data) {
            try {
                // Crear 
                rowData = [];
                dataTable.setData(rowData);

                var members = data.m;
                memberCount = data.mc;

                for (var i in members) {
                    var member = members[i];

                    // For Each member (player); Get the PvP/PvE Score
                    if (member.n.length > 0) {
                        ClientLib.Net.CommunicationManager.GetInstance().SendSimpleCommand("GetPublicPlayerInfoByName", {
                            name: member.n
                        }, phe.cnc.Util.createEventDelegate(ClientLib.Net.CommandResult, this, onPlayerInfoReceived), null);
                    }
                }
            } catch (e) {
                console.log("onAllianceInfoReceived: ", e);
            }
        }

        // Callback GetPublicPlayerInfoByName
        // [a] => Alliance ID
        // [an] => Alliance Name
        function onPlayerAllianceIdReceived(context, data) {
            try {
                // No need to recreate the RankingPage when player is member of same alliance
                if (data.a != allianceId) {
                    allianceId = data.a;

                    // Show Alliance name in label.
                    pvpHighScoreLabel.setValue("PvP and PvE for alliance: " + data.an + "     (loading plz wait)");

                    // Get Alliance MembersList
                    ClientLib.Net.CommunicationManager.GetInstance().SendSimpleCommand("GetPublicAllianceInfo", {
                        id: allianceId
                    }, phe.cnc.Util.createEventDelegate(ClientLib.Net.CommandResult, this, onAllianceInfoReceived), null);
                }
            } catch (e) {
                console.log("onPlayerInfoReceived: ", e);
            }
        }


        function onPlayerChanged() {
            try {
                // Get Players AllianceId 
                if (playerName.getValue().length > 0) {
                    ClientLib.Net.CommunicationManager.GetInstance().SendSimpleCommand("GetPublicPlayerInfoByName", {
                        name: playerName.getValue()
                    }, phe.cnc.Util.createEventDelegate(ClientLib.Net.CommandResult, this, onPlayerAllianceIdReceived), null);
                }
            } catch (e) {
                console.log("onPlayerChanged: ", e);
            }
        }



        function onPlayerInfoWindowClose() {
            try {
                //dataTable.setData([]);
            } catch (e) {
                console.log("onPlayerInfoWindowClose: ", e);
            }
        }

        function PvpRankMod_checkIfLoaded() {
            try {
                if (typeof qx !== 'undefined' && typeof qx.locale !== 'undefined' && typeof qx.locale.Manager !== 'undefined') {
                    if (ClientLib.Data.MainData.GetInstance().get_Alliance().get_FirstLeaders() !== null && ClientLib.Data.MainData.GetInstance().get_Alliance().get_FirstLeaders().l.length != 0) {
                        CreateMod();
                    } else {
                        window.setTimeout(PvpRankMod_checkIfLoaded, 1000);
                    }
                } else {
                    window.setTimeout(PvpRankMod_checkIfLoaded, 1000);
                }
            } catch (e) {
                console.log("PvpRankMod_checkIfLoaded: ", e);
            }
        }

        if (/commandandconquer\.com/i.test(document.domain)) {
            window.setTimeout(PvpRankMod_checkIfLoaded, 1000);
        }
    }

    try {
        var PvpRankMod = document.createElement("script");
       PvpRankMod.innerHTML = "(" + PvpRankMod_main.toString() + ")();";
        PvpRankMod.type = "text/javascript";
        if (/commandandconquer\.com/i.test(document.domain)) {
            document.getElementsByTagName("head")[0].appendChild(PvpRankMod);
        }
    } catch (e) {
        console.log("PvpRankMod: init error: ", e);
    }
})();

//---------------------------------------POI Analizer------------------//


// ==UserScript==
// @name        Command & Conquer TA POIs Analyser
// @description Display alliance's POIs scores and next tier requirements.
// @namespace   https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @include     https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version     1.5.3
// @grant none
// @author zdoom
// @updateURL https://userscripts.org/scripts/source/171353.meta.js
// @downloadURL https://userscripts.org/scripts/source/171353.user.js
// ==/UserScript==

(function(){
	
	var injectScript = function()
	{
		function create_ccta_pa_class()
		{
			qx.Class.define('ccta_pa',
			{
				type: 'singleton',
				extend: qx.ui.tabview.Page,
				
				construct: function()
				{
					try
					{
						this.base(arguments);
						this.setLayout(new qx.ui.layout.Grow());
						this.set({label: "POIs", padding: 10});
						
						var root = this;
						
						var label = new qx.ui.basic.Label("Made by dark_atticus.");
							label.set({
										textColor: "text-value",
										font: "font_size_13",
										padding: 10
									 });
										
						var src = "";
						
						var abr = new qx.ui.basic.Label().set({ alignX: 'center', marginTop: 30, font: 'font_size_14', textColor: 'Black' });
						
						var manager = qx.theme.manager.Font.getInstance();
						var defaultFont = manager.resolve(abr.getFont());
						var newFont = defaultFont.clone();
							newFont.setSize(32);
						
						abr.setFont(newFont);
						
						var deco = new qx.ui.decoration.Background();
							deco.setBackgroundImage(src);
						
						var imgCont = new qx.ui.container.Composite(new qx.ui.layout.VBox());
							imgCont.set({
								minWidth: 0,
								minHeight: 0,
								maxWidth: 0,
								maxHeight: 0,
								decorator:deco,
								alignX: 'center'
							});
						
						var scrl = new qx.ui.container.Scroll();
						
						var cont = new qx.ui.container.Composite(new qx.ui.layout.VBox());
							cont.set({allowGrowY: true, padding: 10});
						
						var gb = new qx.ui.groupbox.GroupBox("Estatisticas");
							gb.setLayout(new qx.ui.layout.VBox());
							gb.setMarginLeft(2);
					
						var lgb = new webfrontend.gui.GroupBoxLarge('POIs NovaGama');
							lgb.setLayout(new qx.ui.layout.Canvas());
							
						var lgbc = new qx.ui.container.Composite(new qx.ui.layout.VBox());
							lgbc.setPadding(60,10,40,10);
							
						var widget = new qx.ui.core.Widget();
							widget.setMinWidth(628);
							widget.setMinHeight(335);
							
						var html = new qx.html.Element('div', null, {id: "graph"});
						
						var info = new qx.ui.groupbox.GroupBox("Informação");
							info.setLayout(new qx.ui.layout.VBox());
							info.setMarginTop(10);
							
						var grid = new qx.ui.container.Composite(new qx.ui.layout.Grid(2,1));
						
						var buttonCont = new qx.ui.container.Composite(new qx.ui.layout.VBox());
							buttonCont.setMarginTop(10);
							
						var tableCont = new qx.ui.container.Composite(new qx.ui.layout.VBox());
							tableCont.setMinWidth(500);
							
						grid.add(buttonCont, {row: 1, column: 1});
						grid.add(tableCont, {row: 1, column: 2});
						
						var noAllianceLabel = new qx.ui.basic.Label('Loading data, please wait....');
						
						var createTable = function(){
							var score = root.__score, multiplier = root.__multiplier, bonus = root.__bonus;
							var scoreData = function(){
								var arr = [];
								for(var x in score){
									arr.push([x, score[x]]);
								};
								return arr;
							};
							var multiplierData = function(){
								var arr = [];
								for(var x in multiplier){
									if(x != 0) arr.push([parseInt(x), multiplier[x] + "%"]);
								};
								return arr;
							};
							var bonusData = function(){
								var arr = [];
								bonus.map(function(key){
									arr.push([key[4], key[0], key[2], key[3] + "%"]);
								});
								return arr;
							};
							
							var columns = [["POI Level", "Score"], ["Tier", "Score Required", "Bonus", "Percentage"], ["Rank", "Multiplier"]];
							var rows = [scoreData(), bonusData(), multiplierData()];
							
							var make = function(n){
								var model = new qx.ui.table.model.Simple();
									model.setColumns(columns[n]);
									model.setData(rows[n]);
								var table = new qx.ui.table.Table(model);
									table.setColumnVisibilityButtonVisible(false);
									table.setHeaderCellHeight(25);
									table.setMarginTop(20);
									table.setMinWidth(500);
								var renderer = new qx.ui.table.cellrenderer.Default();
									renderer.setUseAutoAlign(false);
								for (i = 0; i < columns[n].length; i++){
									table.getTableColumnModel().setDataCellRenderer(i, renderer);
								}
								return table;
							};
							
							this.score = make(0);
							this.bonus = make(1);
							this.multiplier = make(2);
						};
						var tables = new createTable();
						
						[['Scores', 'score'], ['Muliplier', 'multiplier'], ['Tiers', 'bonus']].map(function(key){
							var table = tables[key[1]];
								table.setColumnVisibilityButtonVisible(false);
								table.setHeaderCellHeight(25);
								table.setMarginTop(20);
								table.setMinWidth(500);
								
							var button = new qx.ui.form.Button(key[0]);
								button.setWidth(100);
								button.setMargin(10, 10, 0, 10);
								button.addListener('execute', function(){
									tableCont.removeAll();
									tableCont.add(table);
								}, this);
								
							buttonCont.add(button);
						});
						
						tableCont.add(tables.score);
						info.add(grid);
						
						var coordsButton = new qx.ui.form.Button('Coordenadas');
							coordsButton.setWidth(100);
							coordsButton.setMargin(10, 10, 0, 10);
							buttonCont.add(coordsButton);
						
							coordsButton.addListener('execute', function()
							{
								tableCont.removeAll();
								if(root.__tabview !== null) tableCont.add(root.__tabview);
							}, this);
						
						Element.prototype.css = function(arr){
							for(var prop in arr){
								this.style[prop] = arr[prop];
							}
						};
						
						Element.prototype.prop = function(arr){
							for(var prop in arr){
								this[prop] = arr[prop];
							}
						};
							
						Number.prototype.format = function(){
							var f = "", n = this.toString();
							if(n.length < 3) return this;
							for(i = 0; i < n.length; i++){
								(((n.length - i) % 3 === 0) && (i !== 0)) ? f += "," + n[i] : f += n[i];
							}
							return f;
						};
						
						this.add(scrl);
						scrl.add(cont);
						imgCont.add(abr);
						cont.add(imgCont);
						cont.add(lgb);
						cont.add(label);
						lgb.add(lgbc);
						lgbc.add(gb);
						lgbc.add(info);
						widget.getContentElement().add(html);
						gb.add(noAllianceLabel);
						
						this.__allianceLabel = abr;
						this.__coordsButton = coordsButton;
						this.__tableCont = tableCont;
						this.__timer = new qx.event.Timer(1000);
						this.__groupBox = gb;
						this.__widget = widget;
						this.__label = noAllianceLabel;
						this.addListener('appear', this.__updateGraph, this);
						this.__timer.addListener('interval', this.__updateGraph, this);
						
						var tabview = webfrontend.gui.alliance.AllianceOverlay.getInstance().__Rd ||
									  webfrontend.gui.alliance.AllianceOverlay.getInstance().getChildren()[12].getChildren()[0];
							tabview.addAt(this, 0);
							tabview.setSelection(this);
					}
					catch(e)
					{
						console.log(e.toString());
					}
				},
				destruct: function(){},
				members:
				{
					__widget: null,
					__groupBox: null,
					__label: null,
					__loaded: false,
					__timer: null,
					__coordsButton: null,
					__tableCont: null,
					__tabview: null,
					__allianceName: null,
					__allianceAbbr: null,
					__allianceLabel: null,
					__pois: null,
					__multiplier: {1:100, 2:90, 3:85, 4:80, 5:76, 6:72, 7:68, 8:64, 9:60, 10:57, 11:54, 12:51, 13:48, 14:45, 15:42, 16:39, 17:36, 18:33, 19:30, 20:28, 21:26, 22:24, 23:22, 24:20, 25:18, 26:16, 27:14, 28:13, 29:12, 30:11, 31:10, 32:9, 33:8, 34:7, 35:6, 36:5, 37:4, 38:3, 39:2, 40:1, 0:0},
					__score: {12:1, 13:3, 14:6, 15:10, 16:15, 17:25, 18:40, 19:65, 20:100, 21:150, 22:250, 23:400, 24:650, 25:1000, 26:1500, 27:2500, 28:4000, 29:6500, 30:10000, 31:15000, 32:25000, 33:40000, 34:65000, 35:100000, 36:150000, 37:250000, 38:400000, 39:650000, 40:1000000, 41:1500000, 42:2500000, 43:4000000, 44:6500000, 45:10000000},
					__bonus: [[1,3,1200,5,1],[4,8,2000,10,2],[9,15,3000,14,3],[16,26,4000,17,4],[27,49,5500,20,5],[50,89,7000,23,6],[90,159,8500,26,7],[160,259,10000,29,8],[260,419,12000,32,9],[420,749,15000,35,10],[750,1299,18000,38,11],[1300,2199,22000,41,12],[2200,3599,26000,44,13],[3600,5699,30000,47,14],[5700,9699,36000,50,15],[9700,16399,45000,53,16],[16400,27999,60000,56,17],[28000,43999,80000,58,18],[44000,67999,105000,60,19],[68000,114999,135000,62,20],[115000,189999,170000,64,21],[190000,329999,215000,66,22],[330000,509999,270000,68,23],[510000,799999,330000,70,24],[800000,1349999,400000,72,25],[1350000,2199999,480000,74,26],[2200000,3599999,580000,76,27],[3600000,5999999,700000,78,28],[6000000,8999999,830000,80,29],[9000000,14999999,1000000,82,30],[15000000,24999999,1200000,84,31],[25000000,41999999,1450000,86,32],[42000000,64999999,1770000,88,33],[65000000,99999999,2200200,90,34],[100000000,164999999,2700000,92,35],[165000000,269999999,3300000,94,36],[270000000,449999999,4000000,96,37],[450000000,900000000,4800000,98,38]],
					__style: {
						"table": {"margin": "5px", "borderTop": "1px solid #333", "borderBottom": "1px solid #333", "fontFamily": "Verdana, Geneva, sans-serif"},
						"graph": {
							"td": {"width": "68px", "verticalAlign": "bottom", "textAlign": "center"},
							"div": {"width": "24px", "margin": "0 auto -1px auto", "border": "3px solid #333", "borderBottom": "none"}
						},
						"icon": {
							"ul": {"listStyleType": "none", "margin": 0, "padding": 0},
							"div": {"padding": "6px", "marginRight": "6px", "display": "inline-block", "border": "1px solid #000"},
							"p": {"display": "inline", "fontSize": "10px", "color": "#555"},
							"li": {"height": "15px", "padding": "2px", "marginLeft": "10px"}
						},
						"cell": {
							"data": {"width": "68px", "textAlign": "center", "color": "#555", "padding": "3px 2px"},
							"header": {"color": "#416d96", "padding": "3px 2px"}
						},
						"rows": {
							"graph": {"borderBottom": "3px solid #333", "height": "200px"},
							"tr": {"fontSize": "11px", "borderBottom": "1px solid #333",  "backgroundColor": "#d6dde1"}
						}      
					},
					
					__updateGraph: function()
					{
						try
						{
							this.__timer.stop();
							var alliance = ClientLib.Data.MainData.GetInstance().get_Alliance();
							var allianceName = alliance.get_Name();
							var allianceAbbr = alliance.get_Abbreviation();
							var opois = alliance.get_OwnedPOIs();
							var ranks = alliance.get_POIRankScore();
							var exists = alliance.get_Exists();
							var root = this;
							var gb = root.__groupBox, widget = root.__widget, noAllianceLabel = root.__label;
							
							if(!gb || !widget || !noAllianceLabel || exists === 'undefined')
							{
								this.__timer.start();
								console.log('retrying check if alliance exists');
								console.log(gb, widget, noAllianceLabel, exists);
							}
							else
							{
								if(exists === false)
								{
									noAllianceLabel.setValue('No Alliance found, please create or join an alliance.');
									if(gb.hasChildren()) gb.removeAll();
									gb.add(noAllianceLabel);
									console.log('No alliance found');
								}
								else if(exists === true)
								{
									if(root.__loaded === false)
									{
										noAllianceLabel.setValue('Loading data, please wait....')
										if(gb.hasChildren()) gb.removeAll();
										gb.add(noAllianceLabel);
										gb.add(widget);
										root.__loaded = true;
									}
									
									var div = document.getElementById('graph');
									if(!div)
									{
										this.__timer.start();
										console.log('Waiting for div dom element to be loaded');
									}
									if(div)
									{
										console.log('Reloading graph');
										div.innerHTML = "";
										if(noAllianceLabel.isSeeable()) gb.remove(noAllianceLabel);
										root.__getData(allianceName, ranks, opois, allianceAbbr);
									}
								}
							}
						}
						catch(e)
						{
							console.log(e.toString())
						}
					},
					
					__getData: function(n,r,o,a)
					{
						try
						{
							var bonus = this.__bonus, scores = this.__score, allianceName = n, ranks = r, opois = o, abbr = a, root = this;
							var faction = ClientLib.Base.Util.GetFactionGuiPatchText();
							var fileManager = ClientLib.File.FileManager.GetInstance();
							
							this.__allianceLabel.setValue(abbr);
							
							var range = function(val)
							{
								if(val == 0) return [0,0,0,0];
								var i;
								bonus.map(function(key)
								{
									if(val > key[0] && val < key[1]) i = key;
								});
								return i;
							};
							
							var	poisConstructor = function()
							{
								this.tib = {"scr": ranks[0].s, "color": "#8dc186", "range": range(ranks[0].s), "type": 1, "rank": ranks[0].r, "name": "Tiberium"};
								this.crs = {"scr": ranks[1].s, "color": "#5b9dcb", "range": range(ranks[1].s), "type": 1, "rank": ranks[1].r, "name": "Crystal"};
								this.pwr = {"scr": ranks[2].s, "color": "#8cc1c7", "range": range(ranks[2].s), "type": 1, "rank": ranks[2].r, "name": "Reactor"};
								this.tun = {"scr": ranks[3].s, "color": "#d7d49c", "range": range(ranks[3].s), "type": 2, "rank": ranks[3].r, "name": "Tungénio"};
								this.urn = {"scr": ranks[4].s, "color": "#dbb476", "range": range(ranks[4].s), "type": 2, "rank": ranks[4].r, "name": "Urânio"};
								this.air = {"scr": ranks[5].s, "color": "#c47f76", "range": range(ranks[5].s), "type": 2, "rank": ranks[5].r, "name": "Aeronaves"};
								this.res = {"scr": ranks[6].s, "color": "#928195", "range": range(ranks[6].s), "type": 2, "rank": ranks[6].r, "name": "Resonator"};
							};
							
							var pois = new poisConstructor();
							
							var tabview = new qx.ui.tabview.TabView();
								tabview.setMarginTop(20);
								tabview.setMaxWidth(500);
							var poisPages = ['Tib', 'Crs', 'Pwr', 'Tun', 'Urn', 'Air', 'Res'];
							var res = [
											"ui/common/icn_res_tiberium.png",
											"ui/common/icn_res_chrystal.png",
											"ui/common/icn_res_power.png",
											"ui/" + faction + "/icons/icon_arsnl_off_squad.png",
											"ui/" + faction + "/icons/icon_arsnl_off_vehicle.png",
											"ui/" + faction + "/icons/icon_arsnl_off_plane.png",
											"ui/" + faction + "/icons/icon_def_army_points.png"
										 ];
							var columns = ['Coords', 'Level', 'score'];
							
							for(var i = 0; i < poisPages.length; i++)
							{
								var page = new qx.ui.tabview.Page();
									page.setLayout(new qx.ui.layout.VBox());
								var rows = [];
								opois.map(function(poi)
								{
									if(poi.t - 2 === i)
									{
										var a  = "<a onClick='webfrontend.gui.UtilView.centerCoordinatesOnRegionViewWindow(" + poi.x + ", " + poi.y + ")' >";
											a += poi.x + ":" + poi.y + "</a>";
										rows.push([a, poi.l, scores[poi.l]]);
									}
								});
								var icon = fileManager.GetPhysicalPath(res[i]);
								page.setLabel(rows.length);
								page.setIcon(icon);
								var model = new qx.ui.table.model.Simple();
									model.setColumns(columns);
									model.setData(rows);
								var table = new qx.ui.table.Table(model);
									table.setShowCellFocusIndicator(false);
									table.setColumnVisibilityButtonVisible(false);
									table.setHeaderCellHeight(25);
									table.setMarginTop(10);
									table.setMinWidth(470);
								var renderer = new qx.ui.table.cellrenderer.Default();
									renderer.setUseAutoAlign(false);
								for (var n = 0; n < columns.length; n++){
									if(n == 0) renderer = new qx.ui.table.cellrenderer.Html();
									table.getTableColumnModel().setDataCellRenderer(n, renderer);
								}
								page.add(table);
								tabview.add(page);
							}
							
							if ((this.__tabview !== null) && (this.__tabview.isSeeable() === true))
							{
								this.__tableCont.removeAll();
								this.__tableCont.add(tabview);
								console.log('updating pois list');
							}
							
							this.__tabview = tabview;							
							this.__allianceName = allianceName;
							this.__pois = pois;
							
							console.log('data ready')
							this.__graph();
						}
						catch(e)
						{
							console.log(e.toString());
						}
					},
					
					__graph: function()
					{
						console.log('creating graph');
						var root = this, pois = this.__pois, style = this.__style, bonus = this.__bonus, multiplier = this.__multiplier;
						
						var addRow = function(title, arr, table, selected)
						{
							var row = document.createElement('tr'), header = document.createElement('td');
							row.css(style.rows.tr);
							row.onclick = function()
							{
								var tr = table.getElementsByTagName('tr');
								for (i = 1; i < tr.length; i++)
								{
									tr[i].style.backgroundColor = '#d6dde1';
								}
								this.style.backgroundColor = '#ecf6fc';
							};
							if(selected == 1) row.style.backgroundColor = '#ecf6fc';
							header.css(style.cell.header);
							header.appendChild(document.createTextNode(title));
							row.appendChild(header);
							for(var key in arr)
							{
								var td = document.createElement('td');
								td.css(style.cell.data);
								td.appendChild(document.createTextNode(arr[key]));
								row.appendChild(td);
							}
							table.appendChild(row); 
						};
					
						var table = document.createElement('table'),
							gc    = document.createElement('tr'),
							gh    = document.createElement('td'),
							ul    = document.createElement('ul');
						
						table.prop({"id": "data", "cell-spacing": 0, "cell-padding": 0, "rules": "groups", "width": "100%"});
						table.css(style.table);
						gc.css(style.rows.graph);
						ul.css(style.icon.ul);
						gh.appendChild(ul);
						gc.appendChild(gh);
						table.appendChild(gc);
						
						var score = [], tier = [], nextTier = [], bns = [], nextBns = [], poiRank = [], m = 0;
						
						for(var key in pois)
						{
							var min   = pois[key].range[0],
								max   = pois[key].range[1],
								rank  = (pois[key].rank > 40) ? 0 : pois[key].rank,
								color = pois[key].color,
								name  = pois[key].name,
								scr   = pois[key].scr,
								td    = document.createElement('td'),
								div   = document.createElement('div'),
								li    = document.createElement('li'),
								icon  = document.createElement('div'),
								p     = document.createElement('p');
								
								bns[m]      = (pois[key].type == 1) ? Math.round(pois[key].range[2] * (1 + multiplier[rank]/100)).format() :
												   Math.round(pois[key].range[3] * (1 + multiplier[rank]/100)) + "%";
								poiRank[m]  = pois[key].rank + " (" + multiplier[rank] + "%)";
								score[m]    = (pois[key].scr).format();
								tier[m]     = (max == 0) ? 0 : pois[key].range[4];
								nextTier[m] = (max == 0) ? 1 : (max - scr + 1).format();
								nextBns[m]  = (pois[key].type == 1) ? Math.round(bonus[tier[m]][2] * (1 + multiplier[rank]/100)).format() :
												   Math.round(bonus[tier[m]][3] * (1 + multiplier[rank]/100)) + "%";
							
							var h = (scr == 0) ? 0 : Math.round((scr - min)/(max - min) * 100);
					
							div.css(style.graph.div);
							div.style.backgroundColor = color;
							div.style.height = h * 2 - 3 + 'px';
							td.css(style.graph.td);
							td.appendChild(div);
							gc.appendChild(td);
							icon.css(style.icon.div);
							icon.style.backgroundColor = color;
							p.appendChild(document.createTextNode(name));
							p.css(style.icon.p);
							li.css(style.icon.li);
							li.appendChild(icon);
							li.appendChild(p);
							ul.appendChild(li);
							m++;
						}
						
						addRow('Nível', tier, table, 0);
						addRow('Classificação Aliança', poiRank, table, 0);		
						addRow('Pontuação', score, table);
						addRow('Próxima Pontuação', nextTier, table, 0);
						addRow('Bónus', bns, table, 1);
						addRow('Próximo Bónus', nextBns, table, 0);
						document.getElementById('graph').appendChild(table);
					}		
					
				}
			});
		}
		
		var onGameLoaded = function()
		{
			
			
			if ((typeof ClientLib == 'undefined') || (typeof qx == 'undefined') || (qx.core.Init.getApplication().initDone == false))
			{
				setTimeout(onGameLoaded, 10000);
				console.log('retrying....');
			}
			else
			{
				try
				{
					var alliance = ClientLib.Data.MainData.GetInstance().get_Alliance();
					if(typeof alliance != 'undefined')
					{
						create_ccta_pa_class();
						ccta_pa.getInstance();
					}
				}
				catch(e)
				{
					setTimeout(onGameLoaded, 10000);
					console.log(e.toString());
					console.log('retrying....');
				}
			}
		};
		
		window.setTimeout(onGameLoaded, 1000);
	};
	
	function inject()
	{
		var script = document.createElement("script");
			script.innerHTML = "(" + injectScript.toString() + ")();";
			script.type = "text/javascript";
			if (/commandandconquer\.com/i.test(document.domain)) {
				document.getElementsByTagName("head")[0].appendChild(script);
				console.log('injected');
			}
	};
	
	inject();
	
})();

//-----------------------------------------------On/off Membros------------------------//
(function(){
	var AllianceMemberOnline0 = function()
	{
		// create the main class
		function createClass()
		{
		      qx.Class.define("CustomRenderer", 
		      {
                extend : qx.ui.table.rowrenderer.Default,
                members : {

                // overridden
                updateDataRowElement : function(rowInfo, rowElem)
                {
                    this.base(arguments, rowInfo, rowElem);
                    var style = rowElem.style;

                    var rowElement = rowInfo.Data;
                    if(rowElement[2] == 1)
                        style.backgroundColor = "#00FF00";
                 //   if (!(rowInfo.focusedRow && this.getHighlightFocusRow()) && !rowInfo.selected) {
                 //       style.backgroundColor = (rowInfo.rowData[1] > 5000) ? this.__colors.bgcolEven : this.__colors.bgcolOdd;
                 //   }
                },

                // overridden
                createRowStyle : function(rowInfo)
                {
                    var rowStyle = [];
                    rowStyle.push(";");
                    rowStyle.push(this.__fontStyleString);
                    rowStyle.push("background-color:");

                    if (rowInfo.focusedRow && this.getHighlightFocusRow())
                    {
                            rowStyle.push(rowInfo.selected ? this.__colors.bgcolFocusedSelected : this.__colors.bgcolFocused);
                    }
                    else
                    {
                    if (rowInfo.selected)
                    {
                        rowStyle.push(this.__colors.bgcolSelected);
                    }
                    else
                    {
                    // here is the second magic
                        rowStyle.push((rowInfo.rowData[1] > 5000) ? this.__colors.bgcolEven : this.__colors.bgcolOdd);
                    }
                }

                rowStyle.push(';color:');
                rowStyle.push(rowInfo.selected ? this.__colors.colSelected : this.__colors.colNormal);

                rowStyle.push(';border-bottom: 1px solid ', this.__colors.horLine);

                return rowStyle.join("");
                },    
            }
            });
		
			console.log("Starting creation of classes");
			// define the memberoverview class
			qx.Class.define("AllianceMemberOnline.Main",
			{
				type: "singleton",
				extend: qx.core.Object,
				
				// constructor of the class
				construct: function()
				{
					try
					{				
						console.log("Initializing AllianceMemberOnlineButton Button");
						var AllianceMemberOnlineButton = new qx.ui.form.Button("Membros Online");
						AllianceMemberOnlineButton.set(
						{			
							alignY: "middle",							
							width : 120,							
							toolTipText : "open AllianceMemberOnline window",
							appearance: "button-text-small"
						});
												
						AllianceMemberOnlineButton.addListener("execute", this.__openAllianceMemberOnlineWindow, this);
		
						console.log("Adding AllianceMemberOnlineButton to view");
						var app = qx.core.Init.getApplication();
						app.getDesktop().add(AllianceMemberOnlineButton, 
						{
							bottom: 0, 
							right: 120
						});
						
					//	var AllianceMemberOnlineWindow = AllianceMemberOnline.Window.getInstance();
					//	AllianceMemberOnlineWindow.open();
					}
					catch(e)
					{
						console.log("Failed to initialize AllianceMemberOnline: ", e);
					}
					console.log("AllianceMemberOnline loaded");
				},
				
				// destructor of the class
				destruct: function()
				{
				},
				
				members:
				{				
					// Method to show the window
					__openAllianceMemberOnlineWindow: function()
					{
						var AllianceMemberOnlineWindow = AllianceMemberOnline.Window.getInstance();
						
						if(AllianceMemberOnlineWindow.isVisible())
						{
							console.log("closing AllianceMemberOnlineWindow");
							AllianceMemberOnlineWindow.close();
						}
						else
						{
							console.log("opening AllianceMemberOnlineWindow");
							AllianceMemberOnlineWindow.open();
						}
					}
				}
			});		
			
			qx.Class.define("AllianceMemberOnline.Window",
			{
				type: "singleton",
				extend: qx.ui.window.Window,
				
				// constructor of the class
				construct: function()
				{
					try
					{				
						console.log("Creating AllianceMemberOnline.Window");
						this.base(arguments);
						this.setLayout(new qx.ui.layout.Canvas());
						
						this.set(
						{				
							width: 150,
							caption: "Online Members",
							allowMaximize: false,
							showMaximize: false,
							allowMinimize: false,
							showMinimize: false,
							resizable: true
						});		
						
						this.model = new qx.ui.table.model.Simple();
						this.model.setColumns(["Role", "Name", "OnlineState"]);
						this.model.sortByColumn(1, true);						
						this.list = new qx.ui.table.Table(this.model);
						this.list.setColumnVisibilityButtonVisible(false);
						this.list.setColumnWidth(0, 0);
						this.list.setColumnWidth(1, 0);					
						this.list.setColumnWidth(1, 130);
						this.list.set({ width: 130, minHeight: 250 });
						var tModel = this.list.getTableColumnModel();
						tModel.setColumnVisible(0, false);
						tModel.setColumnVisible(2, false);
						this.list.setStatusBarVisible(false);
						this.add(this.list, {
							bottom: 0, 
							left: 0
						});
						
						try
						{
							var timer = qx.util.TimerManager.getInstance();
						}
						catch(e)
						{
							console.log("Failed to get timer");
							throw e;
						}
						timer.start(function()
						{
										console.log("Timer function running");
										// example getting player title icon
										// console.log(ClientLib.Data.MainData.GetInstance().get_Player().get_TitleIcon());
										console.log("Getting Members and members count");
										var alliance = ClientLib.Data.MainData.GetInstance().get_Alliance();
										alliance.RefreshMemberData();
										var members = alliance.get_MemberDataAsArray();
						
										console.log("Creating model");
										var rowArr=[];									
									
										var iCounter = 0;
										for(i = 0; i < alliance.get_NumMembers(); i++)
										{
											var member = members[i];
											var name = member.Name;
											if(member.OnlineState == ClientLib.Data.EMemberOnlineState.Away)
											     name=">>" + name;
											if(member.OnlineState == ClientLib.Data.EMemberOnlineState.Online || member.OnlineState == ClientLib.Data.EMemberOnlineState.Away)
											{	
											 
											 //   var name = member.Name;
												rowArr.push([member.Role, name, member.OnlineState]);
												console.log(member.Role + " - " + member.Name);
												console.log("AllianceMemberOnlineView: " + member.Name + " - " + member.OnlineState);
												iCounter++;
											}
										}
						
										this.model.removeRows(0, this.model.getRowCount(), true)
										this.model.setData(rowArr);
										this.model.sortByColumn(0, true);
						},
						1000,
						this,
						null,
						1000); 
					}
					catch(e)
					{
						console.log("Failed to initialize AllianceMemberOnline.Window");
						console.log(e);
					}
					console.log("AllianceMemberOnline loaded");
				},
				
				// destructor of the class
				destruct: function()
				{
				},
				
				members:
				{			
					model: null,
					list: null,
				
					createNewImage: function (name, path, fileManager)
					{
						try 
						{
							if (!this.images)
							{
								this.images = new Object();
							}
							if (!fileManager) 
							{
								return;
							}

							this.images[name] = fileManager.GetPhysicalPath(path);
						} 
						catch (e)
						{
							console.log("AllianceMemberOnline.Window.createNewImage: ", e);
						}
					}				
				}
			});
		}	
		
		
		// **************************************************************
		// Main Initialization
		function AllianceMemberOnline_checkIfLoaded() 
		{
			try 
			{
				if (typeof qx != 'undefined' && qx.core.Init.getApplication() && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION) && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION).isVisible())
				{
					createClass();
					window.AllianceMemberOnline.Main.getInstance();			
				} else 
				{
					window.setTimeout(AllianceMemberOnline_checkIfLoaded, 1000);
				}
			} catch (e) 
			{
				console.log("AllianceMemberOnline_checkIfLoaded: ", e);
			}
		}
		
		if (/commandandconquer\.com/i.test(document.domain)) {
			window.setTimeout(AllianceMemberOnline_checkIfLoaded, 1000);
		}
	};	
	
	try 
	{
		var script = document.createElement("script");
		script.innerHTML = "(" + AllianceMemberOnline0.toString() + ")();";
		script.type = "text/javascript";
		if (/commandandconquer\.com/i.test(document.domain)) {
			document.getElementsByTagName("head")[0].appendChild(script);
		}
	} 
	catch (e) 
	{
		console.log("AllianceMemberOnline init error: ", e);
	}
})();