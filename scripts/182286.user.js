// ==UserScript==
// @name 			The Green Cross - Tiberium Alliances Tools
// @description 	Tools to help the player manage their gameplay more efficiently and effectively. A non-wrapper take of Maelstrom tools with some original touch.
// @namespace      	http*://*.alliances.commandandconquer.com/*
// @include        	http*://*.alliances.commandandconquer.com/*
// @version 		0.5.1 Modified Tiers at line 1600
// @author 			Peluski17
// @grant 			none
// ==/UserScript==

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
						this.managerBtn = new qx.ui.form.Button("Manager").set({alignX: "center"});
						this.managerBtn.set
						({
							alignY: "middle",
							width: 75,
							height: 30,
							toolTipText: "Opens popup menu with buttons to management tools",
							appearance: "button-text-small"
						});
						this.managerBtn.addListener("click", this._popupManager, this);
						cntButton.removeAt(0);
						cntButton.addAt(this.managerBtn, 1);
						
						//var scanBtn = new qx.ui.form.Button("", "webfrontend/ui/icons/icon_mainui_base_button.png").set
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
						
						var upgradeBtn = new qx.ui.form.Button("", "FactionUI/icons/icon_mode_upgrade.png").set
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
						
						this.managerPopup = new qx.ui.popup.Popup(new qx.ui.layout.Grid(5)).set({
							width: 150,
							height: 150,
							allowGrowY: false,
							allowGrowX: false,
							padding: 5,
							position: "top-right"
						});
						this.managerPopup.add(scanBtn, {row: 0, column: 0});
						this.managerPopup.add(poiBtn, {row: 0, column: 1});
						this.managerPopup.add(upgradeBtn, {row: 0, column: 2});
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
					
					_openScanner: function()
					{
						if (TGCTools.BaseScanner.getInstance().isVisible())
							TGCTools.BaseScanner.getInstance().close();
						else
						{
							TGCTools.BaseScanner.getInstance().open();
							this.managerPopup.hide();
						}
					},
					
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
					
					_openUpgradeWindow: function()
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
			
			qx.Class.define("TGCTools.BaseScanner", 
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
							width: 725,
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
						this.table = new qx.ui.table.Table(this.tableModel).set({height: 300, allowGrowX: false, width: 625, alignX: "center"});
						this.table.getSelectionModel().setSelectionMode(qx.ui.table.selection.Model.MULTIPLE_INTERVAL_SELECTION);
						this.table.setColumnVisibilityButtonVisible(false);
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
						var buttonBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)).set({allowGrowX: false, allowGrowY: false, alignX: "center"});
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
					
					//From an online source. after 140.000.000 only filler numbers
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
						tiers.push(5);
						tiers.push(15);
						tiers.push(50);
						tiers.push(150);
						tiers.push(500);
						tiers.push(1200);
						tiers.push(2500);
						tiers.push(4000);
						tiers.push(7000);
						tiers.push(11000);
						tiers.push(18000);
						tiers.push(27000);
						tiers.push(42000);
						tiers.push(70000);
						tiers.push(120000);
						tiers.push(190000);
						tiers.push(300000);
						tiers.push(450000);
						tiers.push(750000);
						tiers.push(1200000);
						tiers.push(2000000);
						tiers.push(3000000);
						tiers.push(4500000);
						tiers.push(7000000);
						tiers.push(11000000);
						tiers.push(17000000);
						tiers.push(25000000);
						tiers.push(35000000);
						tiers.push(47000000);
						tiers.push(70000000);
						tiers.push(140000000);
						tiers.push(150000000);
						tiers.push(160000000);
						tiers.push(170000000);
						tiers.push(180000000);
						tiers.push(190000000);
						tiers.push(200000000);
						tiers.push(210000000);
						
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
							var x = parseInt(coords.substring(0, 3));
							var y = parseInt(coords.substring(4));
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
			
			qx.Class.define("TGCTools.UpgradeWindow", 
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