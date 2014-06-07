// ==UserScript==
// @name        Bullet Pack 1.2a
// @namespace   https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @include     https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
/* @description Packing all more used script for C&C Tiberium Alliance Web Game.

Pack list : 

- Infernal Wrapper (API needed)
- Chat Helper Enhanced
- Tiberium Zoomer (KOMMANDO)
- Tiberium Coords 500:500
- Maelstorm Tools
- Formation Saver
- CENTER DRIVEN CDSIM Combat Simulator
- CnCOpt
- MT Basescan
- Tiberium Alliances - New Resource Trade Window
- WarChiefs - Tiberium Alliances Sector HUD
- Tiberium Alliances Info
- Coords Button - All
- Base Info
- The Green Cross - Tiberium Alliances Tools
- Tiberium Alliances Info Sticker
- Formation saver
- Tiberium Alliances Upgrade Base/Defense/Army
- POI Analyser
- Map
- PvP/PvE Player Info Mod
- Loot Summary
- C&C: Tiberium Alliances Title Mod
- Tiberium Alliances Supplies Mod
- Command & Conquer TA World Map 1.0.0 
- Multi Session
- Chat Syncer
- C&C:TA IHSoftTools
. Alliance Dashboard



*/
// @version     1.2a
// @updateURL   http://userscripts.org/scripts/review/187055
// @downloadURL http://userscripts.org/scripts/show/187055
// @grant       none
// ==/UserScript==

// type: /chelp in any text box and hit <enter> for a list of commands


/***************************************************************************************************
***************************************************************************************************/


// ==UserScript==
// @name infernal wrapper
// @description Supplies some wrapper functions for public use 
// @namespace infernal_wrapper
// @include https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version 0.390737.5
// @author infernal_me, KRS_L, krisan
// ==/UserScript==
(function () {
    var CCTAWrapper_main = function () {
        try {
            _log = function () {
                if (typeof console != 'undefined') console.log(arguments);
                else if (window.opera) opera.postError(arguments);
                else GM_log(arguments);
            }

            function createCCTAWrapper() {
                console.log('CCTAWrapper loaded');
                _log('wrapper loading' + PerforceChangelist);
                System = $I;
                SharedLib = $I;
                var strFunction;
                
                // SharedLib.Combat.CbtSimulation.prototype.DoStep
                for (var x in $I) {
                    for (var key in $I[x].prototype) {
                        if ($I[x].prototype.hasOwnProperty(key) && typeof($I[x].prototype[key]) === 'function') {  // reduced iterations from 20K to 12K
                            strFunction = $I[x].prototype[key].toString();
                            if (strFunction.indexOf("().l;var b;for (var d = 0 ; d < c.length ; d++){b = c[d];if((b.") > -1) {
                                $I[x].prototype.DoStep = $I[x].prototype[key];
                                console.log("SharedLib.Combat.CbtSimulation.prototype.DoStep = $I." + x + ".prototype." + key);
                                break;
                            }
                        }
                    }
                }

                // ClientLib.Data.CityRepair.prototype.CanRepair
                for (var key in ClientLib.Data.CityRepair.prototype) {
                    if (typeof ClientLib.Data.CityRepair.prototype[key] === 'function') {
                        strFunction = ClientLib.Data.CityRepair.prototype[key].toString();
                        if (strFunction.indexOf("DefenseSetup") > -1 && strFunction.indexOf("DamagedEntity") > -1) {  // order important to reduce iterations
                            ClientLib.Data.CityRepair.prototype.CanRepair = ClientLib.Data.CityRepair.prototype[key];
                            console.log("ClientLib.Data.CityRepair.prototype.CanRepair = ClientLib.Data.CityRepair.prototype." + key);
                            break;
                        }
                    }
                }

                // ClientLib.Data.CityRepair.prototype.UpdateCachedFullRepairAllCost
                for (var key in ClientLib.Data.CityRepair.prototype) {
                    if (typeof ClientLib.Data.CityRepair.prototype[key] === 'function') {
                        strFunction = ClientLib.Data.CityRepair.prototype[key].toString();
                        if (strFunction.indexOf("Type==7") > -1 && strFunction.indexOf("var a=0;if") > -1) {  // order important to reduce iterations
                            ClientLib.Data.CityRepair.prototype.UpdateCachedFullRepairAllCost = ClientLib.Data.CityRepair.prototype[key];
                            console.log("ClientLib.Data.CityRepair.prototype.UpdateCachedFullRepairAllCost = ClientLib.Data.CityRepair.prototype." + key);
                            break;
                        }
                    }
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

                // ClientLib.Vis.Battleground.Battleground.prototype.get_Simulation
                strFunction = ClientLib.Vis.Battleground.Battleground.prototype.StartBattle.toString();
                searchString = "=0;for(var a=0; (a<9); a++){this.";
                startPos = strFunction.indexOf(searchString) + searchString.length;
                fn_name = strFunction.slice(startPos, startPos + 6);
                strFunction = "return this." + fn_name + ";";
                fn = Function('', strFunction);
                ClientLib.Vis.Battleground.Battleground.prototype.get_Simulation = fn;
                console.log("ClientLib.Vis.Battleground.Battleground.prototype.get_Simulation = function(){return this." + fn_name + ";}");

                // GetNerfBoostModifier
                if (typeof ClientLib.Vis.Battleground.Battleground.prototype.GetNerfAndBoostModifier == 'undefined') ClientLib.Vis.Battleground.Battleground.prototype.GetNerfAndBoostModifier = ClientLib.Base.Util.GetNerfAndBoostModifier;

                _log('wrapper loaded');
            }
        } catch (e) {
            console.log("createCCTAWrapper: ", e);
        }

        function CCTAWrapper_checkIfLoaded() {
            try {
                if (typeof qx !== 'undefined') {
                    createCCTAWrapper();
                } else {
                    window.setTimeout(CCTAWrapper_checkIfLoaded, 1000);
                }
            } catch (e) {
                CCTAWrapper_IsInstalled = false;
                console.log("CCTAWrapper_checkIfLoaded: ", e);
            }
        }

        if (/commandandconquer\.com/i.test(document.domain)) {
            window.setTimeout(CCTAWrapper_checkIfLoaded, 1000);
        }
    }

    try {
        var CCTAWrapper = document.createElement("script");
        CCTAWrapper.innerHTML = "var CCTAWrapper_IsInstalled = true; (" + CCTAWrapper_main.toString() + ")();";
        CCTAWrapper.type = "text/javascript";
        if (/commandandconquer\.com/i.test(document.domain)) {
            document.getElementsByTagName("head")[0].appendChild(CCTAWrapper);
        }
    } catch (e) {
        console.log("CCTAWrapper: init error: ", e);
    }
})();


// ==UserScript==
// @name        C&C:Tiberium Alliances Coords Button - All
// @namespace   CNCTACoordsButtonAll
// @description Copy & Paste selected world object coords to chat message
// @include https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version     2.0.1
// @author Bruce Doan, Chiantii
// @updateURL   https://userscripts.org/scripts/source/167957.meta.js
// @downloadURL https://userscripts.org/scripts/source/167957.user.js
// ==/UserScript==
(function () {
  var CNCTACoordsButtonAll_main = function () {
    try {
      function createCoordsButton() {
        console.log('C&C:Tiberium Alliances Coords Button All loaded.');
 
        /*
        $a = qx.core.Init.getApplication(); // Application
        $c = $a.getChat(); // ChatWindow
        $w = $c.getChatWidget(); // ChatWidget
        $i = $cw.getEditable(); // Input
        $d = $i.getContentElement().getDomElement(); // Input DOM Element
        */
 
        var coordsButton = {
          selectedBase: null,
          pasteCoords: function(){
            var $i = qx.core.Init.getApplication().getChat().getChatWidget().getEditable(); // Input
            var $d = $i.getContentElement().getDomElement(); // Input DOM Element
 
            var result = new Array();
            result.push($d.value.substring(0,$d.selectionStart)); // start
 
            result.push('[coords]' + coordsButton.selectedBase.get_RawX() + ':' + coordsButton.selectedBase.get_RawY() + '[/coords]');
 
            result.push($d.value.substring($d.selectionEnd, $d.value.length)); // end
 
            $i.setValue(result.join(' '));
          }
        };
 
        if (!webfrontend.gui.region.RegionCityMenu.prototype.__coordsButton_showMenu) {
          webfrontend.gui.region.RegionCityMenu.prototype.__coordsButton_showMenu = webfrontend.gui.region.RegionCityMenu.prototype.showMenu;
       
          webfrontend.gui.region.RegionCityMenu.prototype.showMenu = function (selectedVisObject) {
            coordsButton.selectedBase = selectedVisObject;
            if (this.__coordsButton_initialized != 1) {
              this.__coordsButton_initialized = 1;
              this.__newComposite = new qx.ui.container.Composite(new qx.ui.layout.VBox(0)).set({
                padding: 2
              });
              for(i in this) {
                if(this[i] && this[i].basename == "Composite") {
                  var button = new qx.ui.form.Button("Paste Coords");
                  button.addListener("execute", function () {
                    coordsButton.pasteCoords();
                  });            
                  this[i].add(button);
                }
              }
            }
            this.__coordsButton_showMenu(selectedVisObject);
            switch (selectedVisObject.get_VisObjectType()) {
              case ClientLib.Vis.VisObject.EObjectType.RegionPointOfInterest:
              case ClientLib.Vis.VisObject.EObjectType.RegionRuin:
              case ClientLib.Vis.VisObject.EObjectType.RegionHubControl:
              case ClientLib.Vis.VisObject.EObjectType.RegionHubServer:
                this.add(this.__newComposite);
                break;
            }
          }
        }
      }    
    } catch (e) {
      console.log("createCoordsButton: ", e);
    }
 
    function CNCTACoordsButtonAll_checkIfLoaded() {
      try {
        if (typeof qx !== 'undefined') {
          createCoordsButton();
        } else {
          window.setTimeout(CNCTACoordsButtonAll_checkIfLoaded, 1000);
        }
      } catch (e) {
        console.log("CNCTACoordsButtonAll_checkIfLoaded: ", e);
      }
    }
  window.setTimeout(CNCTACoordsButtonAll_checkIfLoaded, 1000);
  };
  try {
    var CNCTACoordsButtonAll = document.createElement("script");
    CNCTACoordsButtonAll.innerHTML = "(" + CNCTACoordsButtonAll_main.toString() + ")();";
    CNCTACoordsButtonAll.type = "text/javascript";
    document.getElementsByTagName("head")[0].appendChild(CNCTACoordsButtonAll);
  } catch (e) {
    console.log("CNCTACoordsButtonAll: init error: ", e);
  }
})();


// ==UserScript==
// @name 			The Green Cross - Tiberium Alliances Tools
// @description 	Tools to help the player manage their gameplay more efficiently and effectively. A non-wrapper take of Maelstrom tools with some original touch.
// @namespace      	http*://*.alliances.commandandconquer.com/*
// @include        	http*://*.alliances.commandandconquer.com/*
// @version 		0.5 / 0.51.b
// @author 			Peluski17
// @Modifié par		Christian_FR
// Modification de la présentation de la partie gestion des POI.
// Adaptation pour les coordonnées supérieures à 999:999 (mondes ayant des coordonnées en 1600:1600)
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


// ==UserScript==
// @name           BaseInfo
// @author         Dooki
// @description    Basis Informationen zur Auswertung und Übergabe an die Allianz Befehlshaber. Rechts oberhalb des Spielfensters befindet sich ein neuer Button der das Script aufruft.
// @include        http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @require        http://www.php-gfx.net/Wrapper/update/144825
// @updateURL      http://www.php-gfx.net/Wrapper/update/144825
// @downloadURL    http://www.php-gfx.net/Wrapper/144825.user.js
// @version        2.6.0
// @icon           data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QEEEAcmURyr/AAACJBJREFUWMPVll2MXVUVx3/rnHPvPffOR2cKlCnt1OmUpnbaYqsIpUFbSSkVrFD6YIgmfsRoCEWRJzU8GGMioj4QNelDTZAEAyHS0BICrQrhwXZsC8UwkEhJh/nqfHS+7rnnnnPPOXsvH+4ZmH4g6ps3Wdn73rv3/v/2XmuvteH/8ZMkyRV/f/XVV//rtbz/ZNDAwAAbNmwAYGho6HNzc3Ofn5mZWee6bjsgxpgoy7LBOI5P7Nmz54UjR45kAEePHmXXrl3/+06Hh4cX2o6xsbHvTU9PZ0EQaBiGWq/Xbb1e19xsGIZaq9V0dnZWR0ZGDg4ODl63sM6JEyc+UkM+DmJ0dPS7lUrlUc/zOhzHQcRRcQpibQOhDliUEuK0gKqqzUTVkmVZEgTBc93d3ff9u/U/EuDAgQOyd+/eZ0ul0j7P8xC3iMbv4cQncfU8jtNAJJ+uBmsshg6suw7at4M6aq2RMAwHx8fHd2zevPn9jwVQVUSE559/XrZu3XrW9/1e13VBU3T0cSr2fZyu20G0aRfNBcGBcJBo5K/YdY8jxR6MMcRxzPj4+Nobbrjh7BtvvMGWLVuuDHDu3DlWr17N+Pj4c77v73XdgmoyIsVT36DYewfSvgLFNLUX9BXA5lCC4iBJgjn7DLVl+/DW7FeTRFKv1yeXL19+7ce6YHh4+IFyufzbYrGIbZzHO3YPLZv2oq1LESwYgQwwuWUJFDvAX4JmU+DGiOOBcbDHH2Pukw9R6NuPyTKq1erxY8eObdu4cSNbt269GGBwcBAR6SgWi4PlcnkJGJxnv0TbkgjW78kTABALNJp9TTNwO2DXDxDXw9bnkNOPIW0e6oBceJf01IsEX/kThaW3aBzX5cKFC5/p6+t7fUHXWej09PQAfLtQKCzBLVA/dYCWkTfRtjVQq8FMDSYDmKjCVBVmq8jMLCpXoY6LtRZ1fexYBONVZLYGxW4KFtzffZM0mRbP8yiXy88uPnHnIn+I/FJESOrnqfzhFzi4SFaE2QAuVGE6gGoAYQD1AE1CdOQtbK2KbcTUTr2CTE3AVK05fi5AtZUl8zXS48+AOFoqlXrPnDlzS39//4eZMI5jRkdHb2vec9Hk5MtyjXEgMTA7C56BKHeBAlZRkyJhHWdmCPvIfWhHhTY/wvErTeAIKBeQuQYkIC8/DTvuF9d1qVQq+zZv3nz8AwDf9zl79ux213WxOKKnX4EUiFwYG4L2nuZ3A6iFeoAsXY/e+XVYfzNSKGD+8BO8kdegoU3IBjDfgLkGRB7FgTdJGmOIdKrrulsuc4GIrAXUCriD7zTDs64wOdWMgShEGwHUJtFVtzBz+8NE167GOEKWJsS9N0I4A0kIcQi1EAbfbW4iUZZ4DnNv/Q0FEZGeywCstR2AGJvh1WfRIiACUQLn34MkRBqz2J6bmendRtuv7qZgYowxqCpm5B9QisGGYOswNw61KliBoiAVB8aHAUFV268E4FlrsdYgLkghd5DjQBZCOAJuwPzSa2g5dj/O2mVoVy+qioqLd/4otGZQCiGZgGgcHIECUFQoODiqqFqstc5l5dhaG6iqYh0xS9rQtI54Ao4FV6AQgRfR8f5vkKtC4jsfRUyGKoQTg7S7/WilA6k2moKtTjMQLc3k5VnMVVdjrWKtrV8GkGXZcJqmUnCLJCuuR4YmmvSeQEGhFWgHKjHGW0Z63U1I0gCnSPTafq5eEYMJm7CONHOcA6QKCdRdxV/7WYzJyLJs/DIXGGP+nqYpmFSTtTc307ynUFIoC1SAVkUqMenqexCbICKk4STXtP4FlnpoewPaFNpoti35XM8h7FmNW16FyTKyLHv7IgBVpaur64UoirDWiFn/BeKkGQuUBHyFEmixWQXT7q99kLzM7OuUyhmNdU8SJAZ8Cz5QBsqClpsVq37jHkiNxnFMkiQvXQQgInR1dVWttU+naUqxs5ehW++F1KCFZhTjgliDyVrJOm8iyzJUCuj5lzBrHmdq8DTtZQMqzStcVPCb3VAd0k/fizGpRFFk+vr6nrliKvY878dhGCZiUtVtDzPnL0cS/XBUaon9WzFpjIigpkFxy2MMDpzmuulfo0kFGg6ooo4DCia2DN/9I7zWbo3jGGPM/paWFntFgI0bN56r1+uHoyiSUrmdsTt+TjAvEIIaAeviT71GOPFPamHMdP/vsYc2sSZ6EidrRSKvWaozaYJPpwz1fpHimr2YtEEQBBccx3lCVT/yPSCA9vf3n+vs7Oxx3IJGoyfkE3/+IW3+LHQIFGJs1CDJwO8A/BIqJcQKGNBEkBCyaWVo1V1kt/0M16rOz89JEATbduzYcXyxoLtI2M1PxNu+fftLLS0tD5SKBSl1dDO9ZjfR8Nt0TI6BFqFQouD7gA+ZhzQEjUECQWahOlfi3G0/RTZ9CxfRIAhkamrqOzt37nwx15DFAE6eDzygBPiHDh0Kly1bdmTlypVfLhQKlVK5XeO1d8nE0k1EsaJT0ziTVdyqQeYzshlDVCsxU+nj/PVfZXb7I5Su3qzWGObn52VgYOChffv2/TFff/Gmm/G6SLyUX6AS4LuuWzp06NDBlStXbqhUKuI4rhqLpJqh6SR2bhRMhlQ6cNq6cZ1WPAcVVOI4Znp6ev6pp576/sGDB8/k9bFBMz8u9DNZJFjJrTW3FqAsIv7u3bvXPvjgg/uXL1++rFAo4HmeijiXvKgt1lrSNKVarWaHDx9+8sCBA68EQRAAMRACtdzquTUkFyrlbVtu7TlEJQcsAnbnzp3rd+3a9alVq1at6Ozs7PR93xcRSZIkCYKgOjY2NnHy5Ml3nnjiidP58yXLd1zPhatAkFu4AFDmw9y1APHBCeT/FWlWBjc3ueQGLX6kL7yX04VnbA6xcAIL4hEQe/ng5JIF4nxwKRdeLO4sApBF8xbMXgKR5v6OF8HEuab5F8JUZQbxrSgeAAAAAElFTkSuQmCC
// ==/UserScript==

function Ini() {
	console.log("BaseInfo initialisiert...");
};
Ini();
(function () {
	var BaseInfoMain = function () {
		function BaseInfoCreate()
			{
				try
					{
						qx.Class.define("BaseInfo", {
							type: "singleton",
							extend: qx.core.Object,
							construct: function () {
								window.addEventListener("click", this.onClick, false);
								window.addEventListener("keyup", this.onKey, false);
								window.addEventListener("mouseover", this.onMouseOver, false);
								console.log("BaseInfo geladen...");
								VERSION = '2.6.0';
								AUTHOR = 'Dooki';
								CLASS = 'BaseInfo';
							},
							members: {
								BasenwerteFenster: null,
								BasenwerteTab: null,
								BasenwertePage: null,
								BasenwerteVBox: null,
								AusgabeTab: null,
								AusgabePage: null,
								AusgabeVBox: null,
								BasenwerteButton: null,
								app: null,
								initialize: function () {
									this.BasenwerteFenster = new qx.ui.window.Window(CLASS + " " + VERSION,"http://ccta.php-gfx.net/images/info.png").set({
										padding: 5,
										paddingRight: 0,
										showMaximize:false,
										showMinimize:false,
										showClose:true,
										allowClose:true,
										resizable:false
									});
									this.BasenwerteFenster.setTextColor('black');
									this.BasenwerteFenster.setLayout(new qx.ui.layout.HBox); 
									this.BasenwerteFenster.moveTo(280, 60);
									
									// Tab Reihe
									this.BasenwerteTab = (new qx.ui.tabview.TabView).set({
										contentPaddingTop: 3,
										contentPaddingBottom: 6,
										contentPaddingRight: 7,
										contentPaddingLeft: 3
									});
									this.BasenwerteFenster.add(this.BasenwerteTab);
									
									// Tab 1
									this.BasenwertePage = new qx.ui.tabview.Page("Basenwerte");
									this.BasenwertePage.setLayout(new qx.ui.layout.VBox(5));
									this.BasenwerteTab.add(this.BasenwertePage);
									this.BasenwerteVBox = new qx.ui.container.Composite();
									this.BasenwerteVBox.setLayout(new qx.ui.layout.VBox(5));
									this.BasenwerteVBox.setThemedPadding(2);
									this.BasenwerteVBox.setThemedBackgroundColor("#eef");
									this.BasenwertePage.add(this.BasenwerteVBox);

									// Tab 2
									this.MembersPage = new qx.ui.tabview.Page("Mitglieder");
									this.MembersPage.setLayout(new qx.ui.layout.VBox(5));
									this.BasenwerteTab.add(this.MembersPage);
									this.MembersVBox = new qx.ui.container.Composite();
									this.MembersVBox.setLayout(new qx.ui.layout.VBox(5));
									this.MembersVBox.setThemedPadding(2);
									this.MembersVBox.setThemedBackgroundColor("#eef");
									this.MembersPage.add(this.MembersVBox);

									// Tab 3
									this.AboutPage = new qx.ui.tabview.Page("ScriptInfo");
									this.AboutPage.setLayout(new qx.ui.layout.VBox(5));
									this.BasenwerteTab.add(this.AboutPage);
									this.AboutVBox = new qx.ui.container.Composite();
									this.AboutVBox.setLayout(new qx.ui.layout.VBox(5));
									this.AboutVBox.setThemedPadding(2);
									this.AboutVBox.setThemedBackgroundColor("#eef");
									this.AboutPage.add(this.AboutVBox);

									this.BasenwerteButton = new qx.ui.form.Button(null, "http://ccta.php-gfx.net/images/info_small.png").set({
										toolTipText: CLASS + " " + VERSION + " anzeigen",
										width: 32,
										height: 32,
										maxWidth: 32,
										maxHeight: 32,
										appearance: ("button-playarea-mode-frame"),
										center: true
									});
									this.BasenwerteButton.addListener("click", function (e) {
										this.BasenwerteVBox.removeAll();
										this.AboutVBox.removeAll();
										this.MembersVBox.removeAll();
										this.showBasenwerte();
										this.BasenwerteFenster.show();
									}, this);
									this.app = qx.core.Init.getApplication();
									this.app.getDesktop().add(this.BasenwerteButton, {
										right: 125,
										top: 0
									});
								},
								showBasenwerte: function (ev) {
									var instance = ClientLib.Data.MainData.GetInstance();
									var alliance = instance.get_Alliance();
									var serverName = instance.get_Server().get_Name();
									var player = instance.get_Player();
									var faction1 = player.get_Faction();
									var playerRank = player.get_OverallRank();
									var aktuellesDatum = new Date();
									var Stunde = aktuellesDatum.getHours();
									var Minute = aktuellesDatum.getMinutes();
									var Monat = aktuellesDatum.getMonth()+1 ;
									var Tag = aktuellesDatum.getDate();
									var Jahr = aktuellesDatum.getFullYear();
									if(Stunde<10) Stunde = "0" + Stunde;
									if(Minute<10) Minute = "0" + Minute;
									if(Tag<10) Tag = "0" + Tag;
									if(Monat<10) Monat = "0" + Monat;
									var Datum = Tag + "." + Monat + "." + Jahr;
									var Uhrzeit = Stunde + ":" + Minute;
									var player_basen = 0;
									var support_gebaeude = 0;
									var v = 0;
									var offbasen = 0;
									var base1 = '';
									var base2 = '';
									var VE_durchschnitt = null;
									var VE_lvl = null;
									var support = 0;
									var supportlvl = null;
									var def_durchschnitt = null;
									var credit_durchschnitt = null;
									var repairMaxTime = null;
									var creditPerHour = 0;
									var creditsPerHour = 0;
									var TiberiumPerHour = 0;
									var TiberiumsPerHour = 0;
									var TiberiumProduction = 0;
									var TiberiumsProduction = 0;
									var CrystalPerHour = 0;
									var CrystalsPerHour = 0;
									var CrystalProduction = 0;
									var CrystalsProduction = 0;
									var credit_basen = '';
									var first_rep_flug = 0;
									var first_rep_fahr = 0;
									var first_rep_fuss = 0;
									var second_rep_flug = 0;
									var second_rep_fahr = 0;
									var second_rep_fuss = 0;
									var firstBaseName = '';
									var firstBaselvl = 0;
									var firstOfflvl = 0;
									var firstDeflvl = 0;
									var firstPowerProduction = 0;
									var firstRepairAir = null;
									var firstRepairVehicle = null;
									var firstRepairInfantry = null;
									var secondBaseName = '';
									var secondBaselvl = 0;
									var secondOfflvl = 0;
									var secondDeflvl = 0;
									var secondPowerProduction = 0;
									var secondRepairAir = null;
									var secondRepairVehicle = null;
									var secondRepairInfantry = null;
									var factionArt = new Array();
									factionArt[0] = "";
									factionArt[1] = "GDI";
									factionArt[2] = "NOD";
									var newAusgabe = new Array();
									var apc = instance.get_Cities();
									var PlayerName = apc.get_CurrentOwnCity().get_PlayerName();
									var PlayerID = apc.get_CurrentOwnCity().get_PlayerId();
									var AllianzName = apc.get_CurrentOwnCity().get_AllianceName();
									var AllianzID = apc.get_CurrentOwnCity().get_AllianceId();
									var apcl = apc.get_AllCities().d;
									var members = alliance.get_MemberData().d, member;
									var leaders = alliance.get_FirstLeaders();
									keys = Object.keys(members);
									len = keys.length;
									var AllianzRolle = new Array();
									var AllianzSpieler = new Array();
									var sd;
									var baseidforWorldmap = null;
									var coordsforWorldmap = '';
									var worldidforWorldmap = document.URL.split("/");
									while (len--)
										{
											member = members[keys[len]];
											AllianzRolle[member.Id] = member.RoleName;
											AllianzSpieler[member.Id] = member.Name;
										}
									var allBases = '';
									var aB_basename,aB_baselvl,aB_offlvl,aB_deflvl,aB_velvl,aB_vzlvl,aB_cclvl,aB_supportlvl,aB_credits,aB_strom,aB_tiberium,aB_crystal;
									for (var key in apcl)
										{
											player_basen++;
											var c = apcl[key];
											try
												{
													sd = c.get_SupportData();
													if(sd !== null)
														{
															support_gebaeude++;
															support = sd.get_Level();
															supportlvl = supportlvl+support;
															
														}
													else
														{
															support = 0;
														}
													unitData = c.get_CityBuildingsData();
													ve = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Defense_Facility);
													vz = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Defense_HQ);
													creditPerHour = ClientLib.Base.Resource.GetResourceGrowPerHour(c.get_CityCreditsProduction(), false) + ClientLib.Base.Resource.GetResourceBonusGrowPerHour(c.get_CityCreditsProduction(), false);
													repairMaxTime = c.GetResourceMaxStorage(ClientLib.Base.EResourceType.RepairChargeInf);
													commandpointsMaxStorage = c.GetResourceMaxStorage(ClientLib.Base.EResourceType.CommandPoints);
													TiberiumPerHour = c.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Tiberium, false, false) + c.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Tiberium) + alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Tiberium);
													TiberiumProduction = c.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Tiberium, false, false) + c.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Tiberium);
													CrystalPerHour = c.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Crystal, false, false) + c.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Crystal) + alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Crystal);
													CrystalProduction = c.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Crystal, false, false) + c.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Crystal);
													creditsPerHour = creditsPerHour + creditPerHour;
													TiberiumsPerHour = TiberiumsPerHour + TiberiumPerHour;
													CrystalsPerHour = CrystalsPerHour + CrystalPerHour;
													TiberiumsProduction = TiberiumsProduction + TiberiumProduction;
													CrystalsProduction = CrystalsProduction + CrystalProduction;
													
													if(c.get_CommandCenterLevel() > 0)
														{
															if(firstOfflvl < c.get_LvlOffense())
																{
																	secondBaseName = firstBaseName;
																	secondBaselvl = firstBaselvl;
																	secondOfflvl = firstOfflvl;
																	secondDeflvl = firstDeflvl;
																	secondPowerProduction = firstPowerProduction;
																	secondRepairInfantry = firstRepairInfantry;
																	secondRepairVehicle = firstRepairVehicle;
																	secondRepairAir = firstRepairAir;
																	
																	firstBaseName = c.get_Name();
																	firstBaselvl = c.get_LvlBase();
																	firstOfflvl = c.get_LvlOffense();
																	firstDeflvl = c.get_LvlDefense();
																	firstPowerProduction = c.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Power, false, false) + c.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Power) + alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Power);
																	firstRepairInfantry = c.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Infantry, false);
																	firstRepairVehicle = c.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Vehicle, false);
																	firstRepairAir = c.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Aircraft, false);
																}
															else if(c.get_LvlOffense() > secondOfflvl)
																{
																	secondBaseName = c.get_Name();
																	secondBaselvl = c.get_LvlBase();
																	secondOfflvl = c.get_LvlOffense();
																	secondDeflvl = c.get_LvlDefense();
																	secondPowerProduction = c.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Power, false, false) + c.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Power) + alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Power);
																	secondRepairInfantry = c.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Infantry, false);
																	secondRepairVehicle = c.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Vehicle, false);
																	secondRepairAir = c.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Aircraft, false);
																}
														}
													if(c.get_CommandCenterLevel() > 0 && c.get_LvlOffense() > 0)
														{
															offbasen++;
														}
													if(ve !== null)
														{
															v++;
															VE_lvl = VE_lvl+ve.get_CurrentLevel();
														}
													if(c.get_LvlDefense())
														{
															def_durchschnitt = def_durchschnitt + c.get_LvlDefense();
														}
													if(allBases != "")
														{
															allBases += ' |||| ';
														}
													if(ve !== null) { aB_velvl = ve.get_CurrentLevel().toString(); } else { aB_velvl = 0;}
													if(vz !== null) { aB_vzlvl = vz.get_CurrentLevel().toString(); } else { aB_vzlvl = 0;}
													if(c.get_CommandCenterLevel)  { aB_cclvl =  c.get_CommandCenterLevel().toString(); } else { aB_cclvl = 0;}
													allBases += '' + c.get_Name().toString() + ' | ' + c.get_LvlBase().toFixed(2).toString() + ' | ' + c.get_LvlOffense().toFixed(2).toString() + ' | ' + c.get_LvlDefense().toFixed(2).toString() + ' | ' + aB_velvl + ' | ' + aB_vzlvl + ' | ' + aB_cclvl + ' | ' + support.toFixed(2).toString() + ' | ' + parseInt(creditPerHour) + ' | ' + parseInt(c.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Power, false, false) + c.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Power) + alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Power)) + ' | ' + parseInt(c.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Tiberium, false, false) + c.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Tiberium) + alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Tiberium)) + ' | ' + parseInt(c.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Crystal, false, false) + c.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Crystal) + alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Crystal)) + ' | ' + key + '';
													if(baseidforWorldmap == null)
														{
															baseidforWorldmap = key;
															coordsforWorldmap = c.get_PosX() + ':' + c.get_PosY();
														}
												}
											catch (e)
												{
													console.warn("BaseInfo pro Base: ", e); 
												}
										}

									def_durchschnitt = def_durchschnitt / player_basen;
									newAusgabe["off_basen"] = offbasen;
									if(player_basen>0)
										{
											newAusgabe["def_durchschnitt"] = "" + def_durchschnitt.toFixed(2).toString() + "";
										}
									else
										{
											newAusgabe["def_durchschnitt"] = 0;
										}
									newAusgabe["support_basen"] = support_gebaeude;
									if(support_gebaeude>0)
										{
											supportlvl = supportlvl / support_gebaeude;
											newAusgabe["support_lvl"] = "" + supportlvl.toFixed(2).toString() + "";
										}
									else
										{
											newAusgabe["support_lvl"] = 0;
										}
									VE_durchschnitt = VE_lvl / v;
									if(v>0)
										{
											newAusgabe["ve"] = "" + VE_durchschnitt.toFixed(2).toString() + "";
										}
									else
										{
											newAusgabe["ve"] = 0;
										}
									first_rep_flug = ClientLib.Vis.VisMain.FormatTimespan(firstRepairAir);
									first_rep_fahr = ClientLib.Vis.VisMain.FormatTimespan(firstRepairVehicle);
									first_rep_fuss = ClientLib.Vis.VisMain.FormatTimespan(firstRepairInfantry);
									if(first_rep_flug.split(":").length < 3)
										{
											first_rep_flug = "0:" + first_rep_flug;
										}
									if(first_rep_flug.split(":").length < 4)
										{
											first_rep_flug = "0:" + first_rep_flug;
										}
									if(first_rep_fahr.split(":").length < 3)
										{
											first_rep_fahr = "0:" + first_rep_fahr;
										}
									if(first_rep_fahr.split(":").length < 4)
										{
											first_rep_fahr = "0:" + first_rep_fahr;
										}
									if(first_rep_fuss.split(":").length < 3)
										{
											first_rep_fuss = "0:" + first_rep_fuss;
										}
									if(first_rep_fuss.split(":").length < 4)
										{
											first_rep_fuss = "0:" + first_rep_fuss;
										}
									second_rep_flug = ClientLib.Vis.VisMain.FormatTimespan(secondRepairAir);
									second_rep_fahr = ClientLib.Vis.VisMain.FormatTimespan(secondRepairVehicle);
									second_rep_fuss = ClientLib.Vis.VisMain.FormatTimespan(secondRepairInfantry);
									if(second_rep_flug.split(":").length < 3)
										{
											second_rep_flug = "0:" + second_rep_flug;
										}
									if(second_rep_flug.split(":").length < 4)
										{
											second_rep_flug = "0:" + second_rep_flug;
										}
									if(second_rep_fahr.split(":").length < 3)
										{
											second_rep_fahr = "0:" + second_rep_fahr;
										}
									if(second_rep_fahr.split(":").length < 4)
										{
											second_rep_fahr = "0:" + second_rep_fahr;
										}
									if(second_rep_fuss.split(":").length < 3)
										{
											second_rep_fuss = "0:" + second_rep_fuss;
										}
									if(second_rep_fuss.split(":").length < 4)
										{
											second_rep_fuss = "0:" + second_rep_fuss;
										}
									
									newAusgabe["AllianzID"] = AllianzID;
									newAusgabe["AllianzName"] = AllianzName.toString();
									newAusgabe["AllianzRolle"] = AllianzRolle[PlayerID].toString();
									newAusgabe["ServerName"] = serverName.toString();
									newAusgabe["SpielerID"] = PlayerID;
									newAusgabe["Spieler"] = PlayerName;
									newAusgabe["Klasse"] = factionArt[faction1];
									newAusgabe["Datum"] = Datum;
									newAusgabe["Uhrzeit"] = Uhrzeit;
									newAusgabe["Rang"] = playerRank;
									newAusgabe["maxKP"] = commandpointsMaxStorage;
									newAusgabe["repZeit"] = repairMaxTime / 60 / 60;
									newAusgabe["Basen"] = player_basen;
									newAusgabe["Creditproduktion"] = parseInt(creditsPerHour);
									newAusgabe["Tiberiumproduktion"] = parseInt(TiberiumsPerHour);
									newAusgabe["Kristallproduktion"] = parseInt(CrystalsPerHour);
									newAusgabe["1st_Base"] = firstBaselvl.toFixed(2).toString();
									newAusgabe["1st_Def"] = firstDeflvl.toFixed(2).toString();
									newAusgabe["1st_Off"] = firstOfflvl.toFixed(2).toString();
									newAusgabe["1st_Stromproduktion"] = parseInt(firstPowerProduction);
									newAusgabe["1st_Flugzeuge"] = first_rep_flug;
									newAusgabe["1st_Fahrzeuge"] = first_rep_fahr;
									newAusgabe["1st_Fusstruppen"] = first_rep_fuss;
									newAusgabe["2nd_Base"] = secondBaselvl.toFixed(2).toString();
									newAusgabe["2nd_Def"] = secondDeflvl.toFixed(2).toString();
									newAusgabe["2nd_Off"] = secondOfflvl.toFixed(2).toString();
									newAusgabe["2nd_Stromproduktion"] = parseInt(secondPowerProduction);
									newAusgabe["2nd_Flugzeuge"] = second_rep_flug;
									newAusgabe["2nd_Fahrzeuge"] = second_rep_fahr;
									newAusgabe["2nd_Fusstruppen"] = second_rep_fuss;
									newAusgabe["Leaders"] = leaders.l[leaders.l.indexOf(PlayerID)];
									newAusgabe["WorldID"] = worldidforWorldmap[3];
									newAusgabe["CoordsforWorldmap"] = coordsforWorldmap;
									newAusgabe["ShowonWorldmap"] = baseidforWorldmap;
									newAusgabe["Version"] = VERSION;

									var usersubmit = '';
									for(var werte in newAusgabe)
										{
											usersubmit += "[" + werte + "] == " + newAusgabe[werte] + "\n";
										}

									// Tab 1 Basenwerte
									this.BasenwerteVBox.add(new qx.ui.basic.Label("<table cellspacing='1' cellpadding='10'><tr><td><big><b><u>Allgemeine Informationen</u></b></big><br><b>Allianz Rolle:</b> " + newAusgabe["AllianzRolle"] + "<br><b>Spielername:</b> " + newAusgabe["Spieler"] + "<br><b>Spielerklasse:</b> " + newAusgabe["Klasse"] + "<br><b>Aktuelle Uhrzeit:</b> " + newAusgabe["Uhrzeit"] + "Uhr - " + newAusgabe["Datum"] + "<br><b>Rang:</b> " + newAusgabe["Rang"] + "<br><b>Maximale KP:</b> " + newAusgabe["maxKP"] + "<br><b>Maximale Repzeit:</b> " + newAusgabe["repZeit"] + " Stunden<br><b>Basenanzahl:</b> " + newAusgabe["Basen"] + "<br><b>Offensiv Basen Anzahl:</b> " + newAusgabe["off_basen"] + "<br><b>Creditproduktion:</b> " + newAusgabe["Creditproduktion"] + "<b>/h</b><br><b>Tiberiumproduktion:</b> " + newAusgabe["Tiberiumproduktion"] + "<b>/h</b> (Ohne Bonus: " + parseInt(TiberiumsProduction) + "/h)<br><b>Kristallproduktion:</b> " + newAusgabe["Kristallproduktion"] + "<b>/h</b> (Ohne Bonus: " + parseInt(CrystalsProduction) + "/h)<br><b>Defensive Ø:</b> " + newAusgabe["def_durchschnitt"] + "<br><b>Supportgebäude Anzahl:</b> " + newAusgabe["support_basen"] + "<br><b>Supportgebäude Level Ø:</b> " + newAusgabe["support_lvl"] + "<br><b>VE Ø aller Basen:</b> " + newAusgabe["ve"] + "</td></tr></table>").set({rich: true}));
									// 1. und 2. Offensive
									this.BasenwerteVBox.add(new qx.ui.basic.Label("<table cellspacing='1' cellpadding='10'><tr><td><big><b><u>1. Offensiv Basis</u></b></big><br><b>Basis Name:</b> " + firstBaseName + "<br><b>Basis Level:</b> " + newAusgabe["1st_Base"] + "<br><b>Offensive:</b> " + newAusgabe["1st_Off"] + "<br><b>Defensive:</b> " + newAusgabe["1st_Def"] + "<br><b>Stromproduktion:</b> " + newAusgabe["1st_Stromproduktion"] + "<br><b>Rep. Flugzeuge:</b> " + newAusgabe["1st_Flugzeuge"] + "<br><b>Rep. Fahrzeuge:</b> " + newAusgabe["1st_Fahrzeuge"] + "<br><b>Rep. Fußtruppen:</b> " + newAusgabe["1st_Fusstruppen"] + "</td><td><big><b><u>2. Offensiv Basis</u></b></big><br><b>Basis Name:</b> " + secondBaseName + "<br><b>Basis Level:</b> " + newAusgabe["2nd_Base"] + "<br><b>Offensive:</b> " + newAusgabe["2nd_Off"] + "<br><b>Defensive:</b> " + newAusgabe["2nd_Def"] + "<br><b>Stromproduktion:</b> " + newAusgabe["2nd_Stromproduktion"] + "<br><b>Rep. Flugzeuge:</b> " + newAusgabe["2nd_Flugzeuge"] + "<br><b>Rep. Fahrzeuge:</b> " + newAusgabe["2nd_Fahrzeuge"] + "<br><b>Rep. Fußtruppen:</b> " + newAusgabe["2nd_Fusstruppen"] + "</td></tr></table>").set({rich: true}));
									// Werte übertragen + Worldmap Link
									this.BasenwerteVBox.add(new qx.ui.basic.Label("<table cellspacing='1' cellpadding='10'><tr><td><a href='http://ccta.php-gfx.net/baseinfo/index.php?usersubmit=" + escape(usersubmit) + "&amp;allBases=" + escape(allBases) + "' target='_blank'><button><b>&nbsp;&nbsp;Werte übertragen&nbsp;&nbsp;</b></button></a></td><td><a href='http://map.tiberium-alliances.com/map/"+worldidforWorldmap[3]+"#"+coordsforWorldmap+"|3|"+baseidforWorldmap+"|~' target='_blank'><button><b>&nbsp;&nbsp;Worldmap&nbsp;&nbsp;</b></button></a></td></tr></table>").set({rich: true}));
									
									// Tab 2 Mitglieder
									var keys = Object.keys(AllianzSpieler);
									var anzahl = keys.length;
									var len = keys.length;
									var member='',userreplace='',i=0;
									userreplace += newAusgabe["AllianzID"] + ',' + newAusgabe["AllianzName"] + ',' + newAusgabe["AllianzRolle"] + ',' + newAusgabe["ServerName"] + ',';
									while (len--)
										{
											i++;
											if(member != '')
												{
													if(i == 5)
														{
															member += ',<br>';
															i = 0;
														}
													else
														{
															member += ', ';
														}
													userreplace += ',';
												}
											member += AllianzSpieler[keys[len]];
											userreplace += AllianzSpieler[keys[len]];
										}
									this.MembersVBox.add(new qx.ui.basic.Label("<table cellspacing='1' cellpadding='10'><tr><td><big><b><u>Mitglieder Auflistung (" + anzahl + ")</u></b></big><br><br>" + member + "</td></tr></table>").set({rich: true}));
									if(leaders.l.indexOf(PlayerID) != "-1")
										{
											this.MembersVBox.add(new qx.ui.basic.Label("<table cellspacing='1' cellpadding='10'><tr><td><span style='color: #bb0000;'><u>Nur für OBH's sichtbar:</u></span></td></tr></table>").set({rich: true}));
											this.MembersVBox.add(new qx.ui.basic.Label("<table cellspacing='1' cellpadding='10'><tr><td><big><b><u>Mitglieder Anpassung</u></b></big><br>Mit diesem Button kannste du deine Mitglieder auf<br>der BaseInfo Seite anpassen, sollten ehemalige Mitglieder,<br>die z.Z. einer anderen Allianz angehören,<br>noch in der Auflistung angezeigt werden.</td></tr></table>").set({rich: true}));
											this.MembersVBox.add(new qx.ui.basic.Label("<table cellspacing='1' cellpadding='10'><tr><td><a href='http://ccta.php-gfx.net/baseinfo/index.php?userreplace=" + escape(userreplace) + "' target='_blank'><button><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Mitglieder abgleichen&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></button></a><br><span style='color: #bb0000;'><i>Du musst auf der " + CLASS + "-Seite eingeloggt sein</i></span></td></tr></table>").set({rich: true}));
										}

									// Tab 3 ScriptInfo
									this.AboutVBox.add(new qx.ui.basic.Label("<table cellspacing='1' cellpadding='10'><tr><td><big><b><u>Script Informationen</u></b></big><br><b>Name:</b> " + CLASS + "<br><b>Version:</b> " + VERSION + "<br><b>Ersteller:</b> " + AUTHOR + "<br><b>Homepage:</b> <a href='http://ccta.php-gfx.net/baseinfo' target='_blank'>ccta.php-gfx.net/baseinfo</a><br><br><big><b><u>Warum entstand dieses Script?</u></b></big><br>Es gibt ein paar Hauptgründe warum dieses Script entstand. Zum einen wollten Befehlshaber einen Überblick haben, über die einzelnen Werte ihrer Mitglieder, zum anderen sollten die Mitglieder selber sehen, wie ihre Werte sind.<br><br><big><b><u>Was bewirkt \"Werte übertragen\"?</u></b></big><br>Mit dem Button \"Werte übertragen\" können eure Basenwerte an eine Homepage übermittelt werden, wo sich OBH's anmelden können und ihre Allianz auswerten können. Die OBH's bekommen mit dem erstmaligen Übertragen ihrer eigenen Werte einen \"Befehlshaber Login\" angezeigt, welcher nur EINMAL sichtbar ist. Danach können sich Zugriffsberechtigte (diese Zugangsdaten sollten von diesem OBH an berechtigte Personen weitergegeben werden) ihre Allianz einsehen und diverse Einstellungen tätigen. Mitglieder bekommen mit dem übertragen ihrer Werte einen permanenten Link angezeigt welchen sie für ihre eigenen Werte nutzen können. Sie sehen dann ihre letzten 5 Einträge wo sie selbst auswerten können wo sie sich verbessert haben.</td></tr></table>").set({rich: true, width: 350}));
								}
							}
						});          
					}
				catch (e)
					{
						console.warn("qx.Class.define(BaseInfo: ", e);      
					}
				BaseInfo.getInstance();
			}
		function LoadExtension()
			{
				try
					{
						if (typeof(qx)!='undefined')
							{
								if (!!qx.core.Init.getApplication().getMenuBar())
									{
										BaseInfoCreate();
										BaseInfo.getInstance().initialize();
										return;
									}
							}
					}
				catch (e)
					{
						if (console !== undefined) console.log(e);
						else if (window.opera) opera.postError(e);
						else GM_log(e);
					}
				window.setTimeout(LoadExtension, 1000);
			}
		LoadExtension();
	}
	function Inject()
		{
			if (window.location.pathname != ("/login/auth"))
				{
					var Script = document.createElement("script");
					Script.innerHTML = "(" + BaseInfoMain.toString() + ")();";
					Script.type = "text/javascript";        
					document.getElementsByTagName("head")[0].appendChild(Script);
				}
		}
	Inject();
})();

// ==UserScript==
// @name           CnC: Tiberium Alliances Info
// @author         TheStriker
// @description    Alt+Y - Insert to message/chat/post all your bases/cities info
// @description    Alt+N - Insert to message/chat/post ally support info
// @namespace      https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @include        https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version        1.0.3
// ==/UserScript==
(function () {
  var TAI_main = function () {
    function createInstance() {
      qx.Class.define("TAI", { //TAS.main
        type : "singleton",
        extend : qx.core.Object,
        members : {
          initialize : function () {
            addEventListener("keyup", this.onKey, false);
            console.log("TA Info loaded.");
          },
          onKey : function (ev) {
            var s = String.fromCharCode(ev.keyCode);
            var inputField = document.querySelector('input:focus, textarea:focus');
            if (inputField != null) {
              // ALT+
              if (ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.shiftKey && s == "Y") {
                // player bases info to share with others

                var apc = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d;//all player cities
                var txt = "", c, unitData, bh, supp, type, df;
                for (var key in apc) {
                  c = apc[key];
                  txt += "[u][b]" + c.get_Name() + "[/b][/u] [coords]" + c.get_PosX() + ":" + c.get_PosY() + "[/coords]: ";
                  txt += "[u]Def:[/u] [b]" + ('0' + c.get_LvlDefense().toFixed(2)).slice(-5) + "[/b]";
                  txt += " [u]Off:[/u] [b]" + ('0' + c.get_LvlOffense().toFixed(2)).slice(-5) + "[/b] ";
                  unitData = c.get_CityBuildingsData();
                  bh = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Construction_Yard);
                  df = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Defense_Facility);
                  supp = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Support_Ion);
                  if (supp === null)
                    supp = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Support_Art);
                  if (supp === null)
                    supp = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Support_Air);
                  if (bh !== null) {
                    txt += "[u]" + bh.get_TechGameData_Obj().dn + ":[/u] [b]" + bh.get_CurrentLevel() + "[/b] ";
                    //txt += "[u]BaseRep:[/u] [b]" + (c.get_CityBuildingsData().GetFullRepairTime() / 3600).toFixed(2) + "h[/b] ";
                    //txt += "[u]DefRep:[/u] [b]" + (c.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Defense) / 3600).toFixed(2) + "h[/b] ";
                  }
                  if (df !== null) {
                    txt += "[u]" + df.get_TechGameData_Obj().dn + ":[/u] [b]" + df.get_CurrentLevel() + "[/b] ";
                  }
                  if (supp !== null) {
                    txt += "[u]" + supp.get_TechGameData_Obj().dn.slice(0, 3) + ":[/u] [b]" + supp.get_CurrentLevel() + "[/b] ";
                  }
                  txt += "[hr]";
                }
                inputField.value += txt;
              } else if (ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.shiftKey && s == "N") {
                var bases = ClientLib.Data.MainData.GetInstance().get_AllianceSupportState().get_Bases().d;
                var base, keys = Object.keys(bases), len = keys.length, info = {}, avg = 0, high = 0, supBaseCount = len;
                while (len--) {
                  base = bases[keys[len]];
                  if (!info.hasOwnProperty(base.get_Type())) {
                    info[base.get_Type()] = 0;
                  }
                  info[base.get_Type()]++;
                  if (base.get_Level() >= 30)
                    high++;
                  avg += base.get_Level();
                }
                avg /= supBaseCount;
                var members = ClientLib.Data.MainData.GetInstance().get_Alliance().get_MemberData().d, member, baseCount = 0;
                keys = Object.keys(members);
                len = keys.length;
                while (len--) {
                  member = members[keys[len]];
                  baseCount += member.Bases;
                }
                inputField.value += "Bases: " + baseCount + " SupCount: " + supBaseCount + "(" + (supBaseCount / baseCount * 100).toFixed(0) + "%) Avg: " + avg.toFixed(2) + " 30+: " + high + "(" + (high / baseCount * 100).toFixed(0) + "%)";
                //for (var i in info)
                //  console.log("Type: " + i + " Count: " + info[i]);
              }
            }
          }
        } // members
      });
    }

    // Loading
    function TAI_checkIfLoaded() {
      try {
        if (typeof qx != 'undefined') {
          if (qx.core.Init.getApplication().getMenuBar() !== null) {
            createInstance();
            TAI.getInstance().initialize();
          } else setTimeout(TAI_checkIfLoaded, 1000);
        } else {
          setTimeout(TAI_checkIfLoaded, 1000);
        }
      } catch (e) {
        if (typeof console != 'undefined') {
          console.log(e);
        } else if (window.opera) {
          opera.postError(e);
        } else {
          GM_log(e);
        }
      }
    }

    if (/commandandconquer\.com/i.test(document.domain)) {
      setTimeout(TAI_checkIfLoaded, 1000);
    }
  };
  // injecting, because there seem to be problems when creating game interface with unsafeWindow
  var TAIScript = document.createElement("script");
  var txt = TAI_main.toString();
  TAIScript.innerHTML = "(" + txt + ")();";
  TAIScript.type = "text/javascript";
  if (/commandandconquer\.com/i.test(document.domain)) {
    document.getElementsByTagName("head")[0].appendChild(TAIScript);

  }
})();


// ==UserScript==
// @name        MaelstromTools Dev
// @namespace   MaelstromTools
// @description Just a set of statistics & summaries about repair time and base resources. Mainly for internal use, but you are free to test and comment it.
// @version     0.1.3.2
// @author      Maelstrom, HuffyLuf, KRS_L and Krisan
// @include     http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// ==/UserScript==
//var offense_units = own_city.get_CityArmyFormationsManager().GetFormationByTargetBaseId(current_city.get_Id()).get_ArmyUnits().l;
//System.Int64 GetForumIdByType (ClientLib.Data.Forum.EForumType eForumType)
//static ClientLib.Data.Forum.EForumType NormalForum
//System.Collections.Generic.List$1 get_ForumsAlliance ()
//System.Void CreateThread (System.Int64 forumId ,System.String threadTitle ,System.String threadPost ,System.Boolean autoSubscribe)
//System.Void CreatePost (System.Int64 forumId ,System.Int64 threadId ,System.String postMessage)
//System.Void StartGetForumThreadData (System.Int64 forumId ,System.Int32 skip ,System.Int32 take)
//System.Void OnForumThreadDataReceived (System.Object context ,System.Object result)
//System.Void add_ThreadsFetched (ClientLib.Data.ForumThreadsFetched value)
//System.Void MarkThreadsAsRead (System.Int64 forumId ,System.Int64[] threadIds)
//
//var score = ClientLib.Base.PointOfInterestTypes.GetScoreByLevel(lvl);
//var scoreNext = ClientLib.Base.PointOfInterestTypes.GetNextScore(score);
//var resBonus = ClientLib.Base.PointOfInterestTypes.GetBonusByType(ClientLib.Base.EPOIType.TiberiumBonus, score);
//var unitBonus = ClientLib.Base.PointOfInterestTypes.GetBonusByType(ClientLib.Base.EPOIType.InfanteryBonus, score);
//console.log("POI lvl" + lvl + "gives " + score + "points, next lvl at " + scoreNext + " points. Resource bonus: " + resBonus + " Unit bonus: " + unitBonus + "%");
/*
 ClientLib.Data.Player
 get_ResearchPoints
 GetCreditsCount
 GetCreditsGrowth
ClientLib.Data.PlayerResearch get_PlayerResearch ()
ClientLib.Data.PlayerResearchItem GetResearchItemFomMdbId (System.Int32 _mdbId)
ClientLib.Data.PlayerResearchItem.System.Object get_NextLevelInfo_Obj ()

var cw=ClientLib.Data.MainData.GetInstance().get_Player().get_Faction();
var cj=ClientLib.Base.Tech.GetTechIdFromTechNameAndFaction(ClientLib.Base.ETechName.Research_BaseFound,cw);
var cd=cr.GetResearchItemFomMdbId(cj);
 */
(function () {
  var MaelstromTools_main = function () {
    try {
      function CCTAWrapperIsInstalled() {
        return (typeof (CCTAWrapper_IsInstalled) != 'undefined' && CCTAWrapper_IsInstalled);
      }

      function createMaelstromTools() {
        console.log('MaelstromTools loaded');

        qx.Class.define("MaelstromTools.Language", {
          type: "singleton",
          extend: qx.core.Object,
          construct: function (language) {
            this.Languages = ['de', 'pt', 'fr', 'tr']; // en is default, not needed in here!
            if (language != null) {
              this.MyLanguage = language;
            }
          },
          members: {
            MyLanguage: "en",
            Languages: null,
            Data: null,

            loadData: function (language) {
              var l = this.Languages.indexOf(language);

              if (l < 0) {
                this.Data = null;
                return;
              }

              this.Data = new Object();
              this.Data["Collect all packages"] = ["Alle Pakete einsammeln", "Recolher todos os pacotes", "Récupérez tous les paquets", "Tüm paketleri topla"][l];
              this.Data["Overall production"] = ["Produktionsübersicht", "Produção global", "La production globale", "Genel üretim"][l];
              this.Data["Army overview"] = ["Truppenübersicht", "Vista Geral de Exército", "Armée aperçu", "Ordu önizlemesi"][l];
              this.Data["Base resources"] = ["Basis Ressourcen", "Recursos base", "ressources de base", "Üs önizlemesi"][l];
              this.Data["Main menu"] = ["Hauptmenü", "Menu Principal", "menu principal", "Ana menü"][l];
              this.Data["Repair all units"] = ["Alle Einheiten reparieren", "Reparar todas as unidades", "Réparer toutes les unités", "Tüm üniteleri onar"][l];
              this.Data["Repair all defense buildings"] = ["Alle Verteidigungsgebäude reparieren", "Reparar todos os edifícios de defesa", "Réparer tous les bâtiments de défense", "Tüm savunma binalarini onar"][l];
              this.Data["Repair all buildings"] = ["Alle Gebäurde reparieren", "Reparar todos os edifícios", "Réparer tous les bâtiments", "Tüm binalari onar"][l];
              this.Data["Base status overview"] = ["Basisübersicht", "Estado geral da base", "aperçu de l'état de base", "Üs durumu önizlemesi"][l];
              this.Data["Upgrade priority overview"] = ["Upgrade Übersicht", "Prioridade de upgrades", "aperçu des priorités de mise à niveau", "Yükseltme önceligi önizlemesi"][l];
              this.Data["MaelstromTools Preferences"] = ["MaelstromTools Einstellungen", "Preferências de MaelstromTools", "Préférences MaelstromTools", "MaelstromTools Ayarlari"][l];
              this.Data["Options"] = ["Einstellungen", "Opções", "Options", "Seçenekler"][l];
              this.Data["Target out of range, no resource calculation possible"] = ["Ziel nicht in Reichweite, kann die plünderbaren Ressourcen nicht berechnen", "Alvo fora do alcance, não é possivel calcular os recursos", "Cible hors de portée, pas de calcul de ressources possible",
			  "Hedef menzil disinda, kaynak hesaplamasi olanaksiz"][l];
              this.Data["Lootable resources"] = ["Plünderbare Ressourcen", "Recursos roubáveis", "Ressources à piller", "Yagmalanabilir kaynaklar"][l];
              this.Data["per CP"] = ["pro KP", "por PC", "par PC", "KP basina"][l];
              this.Data["Calculating resources..."] = ["Berechne plünderbare Ressourcen...", "A calcular recursos...", "calcul de ressources ...", "Kaynaklar hesaplaniyor..."][l];
              this.Data["Next MCV"] = ["MBF", "MCV", "VCM"][l];
              this.Data["Show time to next MCV"] = ["Zeige Zeit bis zum nächsten MBF", "Mostrar tempo restante até ao próximo MCV", "Afficher l'heure pour le prochain VCM ", "Sirdaki MCV için gereken süreyi göster"][l];
              this.Data["Show lootable resources (restart required)"] = ["Zeige plünderbare Ressourcen (Neustart nötig)", "Mostrar recursos roubáveis (é necessário reiniciar)", "Afficher les ressources fouiller (redémarrage nécessaire)", "Yagmalanabilir kaynaklari göster (yeniden baslatma gerekli)"][l];
              this.Data["Use dedicated Main Menu (restart required)"] = ["Verwende extra Hauptmenü (Neustart nötig)", "Usar botão para o Menu Principal (é necessário reiniciar)", "Utiliser dédiée du menu principal (redémarrage nécessaire)", "Ana menü tusunu kullan (yeniden baslatma gerekli)"][l];
              this.Data["Autocollect packages"] = ["Sammle Pakete automatisch", "Auto recolher pacotes", "paquets autocollecté", "Paketleri otomatik topla"][l];
              this.Data["Autorepair units"] = ["Repariere Einheiten automatisch", "Auto reparar o exército", "unités autoréparé", "Üniteleri otomatik onar"][l];
              this.Data["Autorepair defense (higher prio than buildings)"] = ["Repariere Verteidigung automatisch (höhere Prio als Gebäude)", "Auto reparar defesa (maior prioridade do que os edifícios)", "réparation automatique la défense (priorité plus élevé que les bâtiments) ", "Savunmayi otomatik onar (binalardan daha yüksek öncelikli olarak)"][l];
              this.Data["Autorepair buildings"] = ["Repariere Gebäude automatisch", "Auto reparar edifícios", "bâtiments autoréparé", "Binalari otomatik onar"][l];
              this.Data["Automatic interval in minutes"] = ["Auto-Intervall in Minuten", "Intervalo de tempo automático (em minutos)", "intervalle automatique en quelques minutes", "Otomatik toplama araligi (dk)"][l];
              this.Data["Apply changes"] = ["Speichern", "Confirmar", "Appliquer changements", "Uygula"][l];
              this.Data["Discard changes"] = ["Abbrechen", "Cancelar", "Annuler changements", "Iptal"][l];
              this.Data["Reset to default"] = ["Auf Standard zurücksetzen", "Definições padrão", "Réinitialiser", "Sifirla"][l];
              this.Data["Continuous"] = ["Kontinuierlich", "Contínua", "continue", "Sürekli"][l];
              this.Data["Bonus"] = ["Pakete", "Bónus", "Bonus", "Bonus"][l];
              this.Data["POI"] = ["POI", "POI", "POI", "POI"][l];
              this.Data["Total / h"] = ["Gesamt / h", "Total / h", "Total / h", "Toplam / sa."][l];
              this.Data["Repaircharges"] = ["Reparaturzeiten", "Custo de reparação", "frais de réparation", "Onarim maliyeti"][l];
              this.Data["Repairtime"] = ["Max. verfügbar", "Tempo de reparação", "Temps de réparation", "Onarim süresi"][l];
              this.Data["Attacks"] = ["Angriffe", "Ataques", "Attaques", "Saldirilar"][l];
              this.Data[MaelstromTools.Statics.Infantry] = ["Infanterie", "Infantaria", "Infanterie", "Piyade"][l];
              this.Data[MaelstromTools.Statics.Vehicle] = ["Fahrzeuge", "Veículos", "Vehicule", "Motorlu B."][l];
              this.Data[MaelstromTools.Statics.Aircraft] = ["Flugzeuge", "Aeronaves", "Aviation", "Hava A."][l];
              this.Data[MaelstromTools.Statics.Tiberium] = ["Tiberium", "Tibério", "Tiberium", "Tiberium"][l];
              this.Data[MaelstromTools.Statics.Crystal] = ["Kristalle", "Cristal", "Cristal", "Kristal"][l];
              this.Data[MaelstromTools.Statics.Power] = ["Strom", "Potência", "Energie", "Güç"][l];
              this.Data[MaelstromTools.Statics.Dollar] = ["Credits", "Créditos", "Crédit", "Kredi"][l];
              this.Data[MaelstromTools.Statics.Research] = ["Forschung", "Investigação", "Recherche", "Arastirma"][l];
              this.Data["Base"] = ["Basis", "Base", "Base", "Üs"][l];
              this.Data["Defense"] = ["Verteidigung", "Defesa", "Défense", "Savunma"][l];
              this.Data["Army"] = ["Armee", "Exército", "Armée", "Ordu"][l];
              this.Data["Level"] = ["Stufe", "Nível", "Niveau", "Seviye"][l];
              this.Data["Buildings"] = ["Gebäude", "Edifícios", "Bâtiments", "Binalar"][l];
              this.Data["Health"] = ["Leben", "Vida", "Santé", "Saglik"][l];
              this.Data["Units"] = ["Einheiten", "Unidades", "Unités", "Üniteler"][l];
              this.Data["Hide Mission Tracker"] = ["Missionsfenster ausblenden", "Esconder janela das Missões", "Cacher la fenêtre de mission", "Görev Izleyicisini Gizle"][l];
              this.Data["none"] = ["keine", "nenhum", "aucun", "hiçbiri"][l];
              this.Data["Cooldown"] = ["Cooldown", "Relocalização", "Recharge", "Cooldown"][l];
              this.Data["Protection"] = ["Geschützt bis", "Protecção", "Protection", "Koruma"][l];
              this.Data["Available weapon"] = ["Verfügbare Artillerie", "Apoio disponível", "arme disponible", "Mevcut silah"][l];
              this.Data["Calibrated on"] = ["Kalibriert auf", "Calibrado em", "Calibré sur ", "Kalibreli"][l];
              this.Data["Total resources"] = ["Gesamt", "Total de recursos", "Ressources totales", "Toplam kaynaklar"][l];
              this.Data["Max. storage"] = ["Max. Kapazität", "Armazenamento Máx.", "Max. de stockage", "Maks. Depo"][l];
              this.Data["Storage full!"] = ["Lager voll!", "Armazenamento cheio!", "Stockage plein", "Depo dolu!"][l];
              this.Data["Storage"] = ["Lagerstand", "Armazenamento", "Stockage", "Depo"][l];
              this.Data["display only top buildings"] = ["Nur Top-Gebäude anzeigen", "Mostrar apenas melhores edifícios", "afficher uniquement les bâtiments principaux", "yalnizca en iyi binalari göster"][l];
              this.Data["display only affordable buildings"] = ["Nur einsetzbare Gebäude anzeigen", "Mostrar apenas edíficios acessíveis", "afficher uniquement les bâtiments abordables", "yalnizca satin alinabilir binalari göster"][l];
              this.Data["City"] = ["Stadt", "Base", "Base", "Sehir"][l];
              this.Data["Type (coord)"] = ["Typ (Koord.)", "Escrever (coord)", "Type (coord)", "Tip (koord.)"][l];
              this.Data["to Level"] = ["Auf Stufe", "para nível", "à Niveau ", "Seviye için"][l];
              this.Data["Gain/h"] = ["Zuwachs/h", "Melhoria/h", "Gain / h", "Kazanç / sa."][l];
              this.Data["Factor"] = ["Faktor", "Factor", "Facteur", "Faktör"][l];
              this.Data["Tib/gain"] = ["Tib./Zuwachs", "Tib/melhoria", "Tib / gain", "Tib/Kazanç"][l];
              this.Data["Pow/gain"] = ["Strom/Zuwachs", "Potencia/melhoria", "Puissance / Gain", "Güç/Kazanç"][l];
              this.Data["ETA"] = ["Verfügbar in", "Tempo restante", "Temps restant", "Kalan Zaman"][l];
              this.Data["Upgrade"] = ["Aufrüsten", "Upgrade", "Upgrade", "Yükselt"][l];
              this.Data["Powerplant"] = ["Kratfwerk", "Central de Energia", "Centrale", "Güç Santrali"][l];
              this.Data["Refinery"] = ["Raffinerie", "Refinaria", "Raffinerie", "Rafineri"][l];
              this.Data["Harvester"] = ["Sammler", "Harvester", "Collecteur", "Biçerdöver"][l];
              this.Data["Silo"] = ["Silo", "Silo", "Silo", "Silo"][l];
              this.Data["Accumulator"] = ["Akkumulator", "Acumulador", "Accumulateur", "Akümülatör"][l];
              this.Data["Calibrate support"] = ["Artillerie kalibrieren", "Calibrar apoio", "Calibrer soutien", "Takviyeyi kalibre et"][l];
              this.Data["Access"] = ["Öffne", "Aceder", "Accès ", "Aç"][l];
              this.Data["Focus on"] = ["Zentriere auf", "Concentrar em", "Centré sur", "Odaklan"][l];
              this.Data["Possible attacks from this base (available CP)"] = ["Mögliche Angriffe (verfügbare KP)", "Possible attacks from this base (available CP)","Possible attacks from this base (available CP)", "Bu üsten yapilmasi mümkün olan saldirilar (mevcut KP)"][l];
              //this.Data[""] = [""][l];
            },
            get: function (ident) {
              return this.gt(ident);
            },
            gt: function (ident) {
              if (!this.Data || !this.Data[ident]) {
                /*if(!parseInt(ident.substr(0, 1), 10) && ident != "0") {
                  console.log("missing language data: " + ident);
                }*/
                return ident;
              }
              return this.Data[ident];
            }
          }
        }),

        // define Base
        qx.Class.define("MaelstromTools.Base", {
          type: "singleton",
          extend: qx.core.Object,
          members: {
            /* Desktop */
            timerInterval: 1500,
            mainTimerInterval: 5000,
            lootStatusInfoInterval: null,
            images: null,
            mWindows: null,
            mainMenuWindow: null,

            itemsOnDesktop: null,
            itemsOnDesktopCount: null,
            itemsInMainMenu: null,
            itemsInMainMenuCount: null,
            buttonCollectAllResources: null,
            buttonRepairAllUnits: null,
            buttonRepairAllBuildings: null,

            lootWidget: null,

            initialize: function () {
              try {
                //console.log(qx.locale.Manager.getInstance().getLocale());
                Lang.loadData(qx.locale.Manager.getInstance().getLocale());
                //console.log("Client version: " + MaelstromTools.Wrapper.GetClientVersion());
                this.itemsOnDesktopCount = new Array();
                this.itemsOnDesktop = new Object();
                this.itemsInMainMenuCount = new Array();
                this.itemsInMainMenu = new Object();

                var fileManager = ClientLib.File.FileManager.GetInstance();
                //ui/icons/icon_mainui_defense_button
                //ui/icons/icon_mainui_base_button
                //ui/icons/icon_army_points
                //icon_def_army_points
                var factionText = ClientLib.Base.Util.GetFactionGuiPatchText();
                this.createNewImage(MaelstromTools.Statics.Tiberium, "ui/common/icn_res_tiberium.png", fileManager);
                this.createNewImage(MaelstromTools.Statics.Crystal, "ui/common/icn_res_chrystal.png", fileManager);
                this.createNewImage(MaelstromTools.Statics.Power, "ui/common/icn_res_power.png", fileManager);
                this.createNewImage(MaelstromTools.Statics.Dollar, "ui/common/icn_res_dollar.png", fileManager);
                this.createNewImage(MaelstromTools.Statics.Research, "ui/common/icn_res_research.png", fileManager);
                this.createNewImage("Sum", "ui/common/icn_build_slots.png", fileManager);
                this.createNewImage("AccessBase", "ui/" + factionText + "/icons/icon_mainui_enterbase.png", fileManager);
                this.createNewImage("FocusBase", "ui/" + factionText + "/icons/icon_mainui_focusbase.png", fileManager);
                this.createNewImage("Packages", "ui/" + factionText + "/icons/icon_collect_packages.png", fileManager);
                this.createNewImage("RepairAllUnits", "ui/" + factionText + "/icons/icon_army_points.png", fileManager);
                this.createNewImage("RepairAllBuildings", "ui/" + factionText + "/icons/icn_build_slots.png", fileManager);
                this.createNewImage("ResourceOverviewMenu", "ui/common/icn_res_chrystal.png", fileManager);
                this.createNewImage("ProductionMenu", "ui/" + factionText + "/icons/icn_build_slots.png", fileManager);
                this.createNewImage("RepairTimeMenu", "ui/" + factionText + "/icons/icon_repair_all_button.png", fileManager);
                this.createNewImage("Crosshair", "ui/icons/icon_support_tnk_white.png", fileManager);
                this.createNewImage("UpgradeBuilding", "ui/" + factionText + "/icons/icon_building_detail_upgrade.png", fileManager);

                this.createNewWindow("MainMenu", "R", 125, 140, 120, 100, "B");
                this.createNewWindow("Production", "L", 120, 60, 340, 140);
                this.createNewWindow("RepairTime", "L", 120, 60, 340, 140);
                this.createNewWindow("ResourceOverview", "L", 120, 60, 340, 140);
                this.createNewWindow("BaseStatusOverview", "L", 120, 60, 340, 140);
                this.createNewWindow("Preferences", "L", 120, 60, 440, 140);
                this.createNewWindow("UpgradePriority", "L", 120, 60, 870, 400);

                if (!this.mainMenuWindow) {
                  this.mainMenuWindow = new qx.ui.popup.Popup(new qx.ui.layout.Canvas()).set({
                    //backgroundColor: "#303030",
                    padding: 5,
                    paddingRight: 0
                  });
                  if (MT_Preferences.Settings.useDedicatedMainMenu) {
                    this.mainMenuWindow.setPlaceMethod("mouse");
                    this.mainMenuWindow.setPosition("top-left");
                  } else {
                    this.mainMenuWindow.setPlaceMethod("widget");
                    this.mainMenuWindow.setPosition("bottom-right");
                    this.mainMenuWindow.setAutoHide(false);
                    this.mainMenuWindow.setBackgroundColor("transparent");
                    this.mainMenuWindow.setShadow(null);
                    this.mainMenuWindow.setDecorator(new qx.ui.decoration.Background());
                  }
                }

                var desktopPositionModifier = 0;

                this.buttonCollectAllResources = this.createDesktopButton(Lang.gt("Collect all packages"), "Packages", true, this.desktopPosition(desktopPositionModifier));
                this.buttonCollectAllResources.addListener("execute", this.collectAllPackages, this);

                var openProductionWindowButton = this.createDesktopButton(Lang.gt("Overall production"), "ProductionMenu", false, this.desktopPosition(desktopPositionModifier));
                openProductionWindowButton.addListener("execute", function () {
                  window.MaelstromTools.Production.getInstance().openWindow("Production", Lang.gt("Overall production"));
                }, this);

                var openResourceOverviewWindowButton = this.createDesktopButton(Lang.gt("Base resources"), "ResourceOverviewMenu", false, this.desktopPosition(desktopPositionModifier));
                openResourceOverviewWindowButton.addListener("execute", function () {
                  window.MaelstromTools.ResourceOverview.getInstance().openWindow("ResourceOverview", Lang.gt("Base resources"));
                }, this);

                desktopPositionModifier++;
                var openMainMenuButton = this.createDesktopButton(Lang.gt("Main menu"), "ProductionMenu", false, this.desktopPosition(desktopPositionModifier));
                openMainMenuButton.addListener("click", function (e) {
                  this.mainMenuWindow.placeToMouse(e);
                  this.mainMenuWindow.show();
                }, this);

                this.buttonRepairAllUnits = this.createDesktopButton(Lang.gt("Repair all units"), "RepairAllUnits", true, this.desktopPosition(desktopPositionModifier));
                this.buttonRepairAllUnits.addListener("execute", this.repairAllUnits, this);

                this.buttonRepairAllBuildings = this.createDesktopButton(Lang.gt("Repair all buildings"), "RepairAllBuildings", true, this.desktopPosition(desktopPositionModifier));
                this.buttonRepairAllBuildings.addListener("execute", this.repairAllBuildings, this);

                var openRepairTimeWindowButton = this.createDesktopButton(Lang.gt("Army overview"), "RepairTimeMenu", false, this.desktopPosition(desktopPositionModifier));
                openRepairTimeWindowButton.addListener("execute", function () {
                  window.MaelstromTools.RepairTime.getInstance().openWindow("RepairTime", Lang.gt("Army overview"));
                }, this);

                var openBaseStatusOverview = this.createDesktopButton(Lang.gt("Base status overview"), "Crosshair", false, this.desktopPosition(desktopPositionModifier));
                openBaseStatusOverview.addListener("execute", function () {
                  window.MaelstromTools.BaseStatus.getInstance().openWindow("BaseStatusOverview", Lang.gt("Base status overview"));
                }, this);

                desktopPositionModifier++;
                var openHuffyUpgradeOverview = this.createDesktopButton(Lang.gt("Upgrade priority overview"), "UpgradeBuilding", false, this.desktopPosition(desktopPositionModifier));
                openHuffyUpgradeOverview.addListener("execute", function () {
                  window.HuffyTools.UpgradePriorityGUI.getInstance().openWindow("UpgradePriority", Lang.gt("Upgrade priority overview"));
                }, this);

                desktopPositionModifier++;
                var preferencesButton = new qx.ui.form.Button(Lang.gt("Options")).set({
                  appearance: "button-text-small",
                  width: 100,
                  minWidth: 100,
                  maxWidth: 100
                });
                preferencesButton.setUserData("desktopPosition", this.desktopPosition(desktopPositionModifier));
                preferencesButton.addListener("execute", function () {
                  window.MaelstromTools.Preferences.getInstance().openWindow("Preferences", Lang.gt("MaelstromTools Preferences"), true);
                }, this);

                if (MT_Preferences.Settings.useDedicatedMainMenu) {
                  this.addToDesktop("MainMenu", openMainMenuButton);
                }
                this.addToMainMenu("ResourceOverviewMenu", openResourceOverviewWindowButton);
                this.addToMainMenu("ProductionMenu", openProductionWindowButton);
                this.addToMainMenu("BaseStatusMenu", openBaseStatusOverview);
                this.addToMainMenu("RepairTimeMenu", openRepairTimeWindowButton);
                this.addToMainMenu("UpgradeBuilding", openHuffyUpgradeOverview);

                this.addToMainMenu("PreferencesMenu", preferencesButton);

                if (!MT_Preferences.Settings.useDedicatedMainMenu) {
                  this.mainMenuWindow.show();
                  var target = qx.core.Init.getApplication().getOptionsBar(); //getServerBar(); //qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_APPOINTMENTS);
                  this.mainMenuWindow.placeToWidget(target, true);
                }

                webfrontend.gui.chat.ChatWidget.recvbufsize = MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.CHATHISTORYLENGTH, 64);
                this.runSecondlyTimer();
                this.runMainTimer();
                this.runAutoCollectTimer();
              } catch (e) {
                console.log("MaelstromTools.initialize: ", e);
              }
            },

            desktopPosition: function (modifier) {
              if (!modifier) modifier = 0;
              return modifier;
            },

            createDesktopButton: function (title, imageName, isNotification, desktopPosition) {
              try {
                if (!isNotification) {
                  isNotification = false;
                }
                if (!desktopPosition) {
                  desktopPosition = this.desktopPosition();
                }
                var desktopButton = new qx.ui.form.Button(null, this.images[imageName]).set({
                  toolTipText: title,
                  width: 50,
                  height: 40,
                  maxWidth: 50,
                  maxHeight: 40,
                  appearance: (isNotification ? "button-standard-nod" : "button-playarea-mode-frame"), //"button-standard-"+factionText), button-playarea-mode-red-frame
                  center: true
                });

                desktopButton.setUserData("isNotification", isNotification);
                desktopButton.setUserData("desktopPosition", desktopPosition);
                return desktopButton;
              } catch (e) {
                console.log("MaelstromTools.createDesktopButton: ", e);
              }
            },

            createNewImage: function (name, path, fileManager) {
              try {
                if (!this.images) {
                  this.images = new Object();
                }
                if (!fileManager) {
                  return;
                }

                this.images[name] = fileManager.GetPhysicalPath(path);
              } catch (e) {
                console.log("MaelstromTools.createNewImage: ", e);
              }
            },

            createNewWindow: function (name, align, x, y, w, h, alignV) {
              try {
                if (!this.mWindows) {
                  this.mWindows = new Object();
                }
                this.mWindows[name] = new Object();
                this.mWindows[name]["Align"] = align;
                this.mWindows[name]["AlignV"] = alignV;
                this.mWindows[name]["x"] = x;
                this.mWindows[name]["y"] = y;
                this.mWindows[name]["w"] = w;
                this.mWindows[name]["h"] = h;
              } catch (e) {
                console.log("MaelstromTools.createNewWindow: ", e);
              }
            },

            addToMainMenu: function (name, button) {
              try {
                /*if(!this.useDedicatedMainMenu) {
                  return;
                }*/
                if (this.itemsInMainMenu[name] != null) {
                  return;
                }
                var desktopPosition = button.getUserData("desktopPosition");
                var isNotification = button.getUserData("isNotification");
                if (!desktopPosition) {
                  desktopPosition = this.desktopPosition();
                }
                if (!isNotification) {
                  isNotification = false;
                }

                if (isNotification && MT_Preferences.Settings.useDedicatedMainMenu) {
                  this.addToDesktop(name, button);
                } else {
                  if (!this.itemsInMainMenuCount[desktopPosition]) {
                    this.itemsInMainMenuCount[desktopPosition] = 0;
                  }
                  this.mainMenuWindow.add(button, {
                    right: 5 + (52 * this.itemsInMainMenuCount[desktopPosition]),
                    top: 0 + (42 * (desktopPosition)) //bottom: 0 - (42 * (desktopPosition - 1))
                  });

                  this.itemsInMainMenu[name] = button;
                  this.itemsInMainMenuCount[desktopPosition]++;
                }
              } catch (e) {
                console.log("MaelstromTools.addToMainMenu: ", e);
              }
            },

            removeFromMainMenu: function (name, rearrange) {
              try {
                if (rearrange == null) {
                  rearrange = true;
                }
                if (this.itemsOnDesktop[name] != null) {
                  var isNotification = this.itemsOnDesktop[name].getUserData("isNotification");
                  if (!isNotification) {
                    isNotification = false;
                  }
                  if (isNotification && MT_Preferences.Settings.useDedicatedMainMenu) {
                    this.removeFromDesktop(name, rearrange);
                  }
                } else if (this.itemsInMainMenu[name] != null) {
                  var desktopPosition = this.itemsInMainMenu[name].getUserData("desktopPosition");
                  var isNotification = this.itemsInMainMenu[name].getUserData("isNotification");
                  if (!desktopPosition) {
                    desktopPosition = this.desktopPosition();
                  }
                  if (!isNotification) {
                    isNotification = false;
                  }

                  this.mainMenuWindow.remove(this.itemsInMainMenu[name]);
                  this.itemsInMainMenu[name] = null;
                  this.itemsInMainMenuCount[desktopPosition]--;

                  if (rearrange && this.itemsInMainMenu[desktopPosition] > 1) {
                    var tmpItems = new Object();
                    // remove notifications 
                    for (var itemName in this.itemsOnDesktop) {
                      if (this.itemsInMainMenu[itemName] == null) {
                        continue;
                      }
                      if (!isNotification) {
                        continue;
                      }
                      tmpItems[itemName] = this.itemsInMainMenu[itemName];
                      this.removeFromMainMenu(itemName, false);
                    }
                    // rearrange notifications
                    for (var itemName2 in tmpItems) {
                      var tmp = tmpItems[itemName2];
                      if (tmp == null) {
                        continue;
                      }
                      this.addToMainMenu(itemName2, tmp);
                    }
                  }
                }
              } catch (e) {
                console.log("MaelstromTools.removeFromDesktop: ", e);
              }
            },

            addToDesktop: function (name, button) {
              try {
                if (this.itemsOnDesktop[name] != null) {
                  return;
                }
                var desktopPosition = button.getUserData("desktopPosition");
                if (!desktopPosition) {
                  desktopPosition = this.desktopPosition();
                }

                if (!this.itemsOnDesktopCount[desktopPosition]) {
                  this.itemsOnDesktopCount[desktopPosition] = 0;
                }

                var app = qx.core.Init.getApplication();
                //var navBar = app.getNavigationBar();

                // console.log("add to Desktop at pos: " + this.itemsOnDesktopCount);
                app.getDesktop().add(button, {
                  //right: navBar.getBounds().width + (52 * this.itemsOnDesktopCount[desktopPosition]),
                  //top: 42 * (desktopPosition - 1)
                  right: 5 + (52 * this.itemsOnDesktopCount[desktopPosition]),
                  //top: this.initialAppointmentBarHeight + 125 + (42 * (desktopPosition - 1))
                  bottom: 200 - (42 * (desktopPosition - 1))
                });

                this.itemsOnDesktop[name] = button;
                this.itemsOnDesktopCount[desktopPosition]++;
              } catch (e) {
                console.log("MaelstromTools.addToDesktop: ", e);
              }
            },

            removeFromDesktop: function (name, rearrange) {
              try {
                if (rearrange == null) {
                  rearrange = true;
                }
                var app = qx.core.Init.getApplication();

                if (this.itemsOnDesktop[name] != null) {
                  var desktopPosition = this.itemsOnDesktop[name].getUserData("desktopPosition");
                  var isNotification = this.itemsOnDesktop[name].getUserData("isNotification");
                  if (!desktopPosition) {
                    desktopPosition = this.desktopPosition();
                  }
                  if (!isNotification) {
                    isNotification = false;
                  }

                  app.getDesktop().remove(this.itemsOnDesktop[name]);
                  this.itemsOnDesktop[name] = null;
                  this.itemsOnDesktopCount[desktopPosition]--;

                  if (rearrange && this.itemsOnDesktopCount[desktopPosition] > 1) {
                    var tmpItems = new Object();
                    // remove notifications 
                    for (var itemName in this.itemsOnDesktop) {
                      if (this.itemsOnDesktop[itemName] == null) {
                        continue;
                      }
                      if (!this.itemsOnDesktop[itemName].getUserData("isNotification")) {
                        continue;
                      }
                      tmpItems[itemName] = this.itemsOnDesktop[itemName];
                      this.removeFromDesktop(itemName, false);
                    }
                    // rearrange notifications
                    for (var itemName2 in tmpItems) {
                      var tmp = tmpItems[itemName2];
                      if (tmp == null) {
                        continue;
                      }
                      this.addToMainMenu(itemName2, tmp);
                    }
                  }
                }
              } catch (e) {
                console.log("MaelstromTools.removeFromDesktop: ", e);
              }
            },

            runSecondlyTimer: function () {
              try {
                this.calculateCostsForNextMCV();

                var self = this;
                window.setTimeout(function () {
                  self.runSecondlyTimer();
                }, 1000);
              } catch (e) {
                console.log("MaelstromTools.runSecondlyTimer: ", e);
              }
            },

            runMainTimer: function () {
              try {
                this.checkForPackages();
                if (CCTAWrapperIsInstalled()) {
                  this.checkRepairAllUnits();
                  this.checkRepairAllBuildings();
                }

                var missionTracker = typeof (qx.core.Init.getApplication().getMissionsBar) === 'function' ? qx.core.Init.getApplication().getMissionsBar() : qx.core.Init.getApplication().getMissionTracker(); //fix for PerforceChangelist>=376877
                if (MT_Preferences.Settings.autoHideMissionTracker) {
                  if (missionTracker.isVisible()) {
                    missionTracker.hide();
                  }
                  if (typeof (qx.core.Init.getApplication().getMissionsBar) === 'function') {
                    if (qx.core.Init.getApplication().getMissionsBar().getSizeHint().height != 0) {
                      qx.core.Init.getApplication().getMissionsBar().getSizeHint().height = 0;
                      qx.core.Init.getApplication().triggerDesktopResize();
                    }
                  }
                } else {
                  if (!missionTracker.isVisible()) {
                    missionTracker.show();
                    if (typeof (qx.core.Init.getApplication().getMissionsBar) === 'function') {
                      qx.core.Init.getApplication().getMissionsBar().initHeight();
                      qx.core.Init.getApplication().triggerDesktopResize();
                    }
                  }
                }
                
                var self = this;
                window.setTimeout(function () {
                  self.runMainTimer();
                }, this.mainTimerInterval);
              } catch (e) {
                console.log("MaelstromTools.runMainTimer: ", e);
              }
            },

            runAutoCollectTimer: function () {
              try {
                //console.log("runAutoCollectTimer ", MT_Preferences.Settings.AutoCollectTimer);
                if (!CCTAWrapperIsInstalled()) return; // run timer only then wrapper is running
                if (this.checkForPackages() && MT_Preferences.Settings.autoCollectPackages) {
                  this.collectAllPackages();
                }
                if (this.checkRepairAllUnits() && MT_Preferences.Settings.autoRepairUnits) {
                  this.repairAllUnits();
                }
                if (this.checkRepairAllBuildings() && MT_Preferences.Settings.autoRepairBuildings) {
                  this.repairAllBuildings();
                }

                var self = this;
                window.setTimeout(function () {
                  self.runAutoCollectTimer();
                }, MT_Preferences.Settings.AutoCollectTimer * 60000);
              } catch (e) {
                console.log("MaelstromTools.runMainTimer: ", e);
              }
            },

            openWindow: function (windowObj, windowName, skipMoveWindow) {
              try {
                if (!windowObj.isVisible()) {
                  if (windowName == "MainMenu") {
                    windowObj.show();
                  } else {
                    if (!skipMoveWindow) {
                      this.moveWindow(windowObj, windowName);
                    }
                    windowObj.open();
                  }
                }
              } catch (e) {
                console.log("MaelstromTools.openWindow: ", e);
              }
            },

            moveWindow: function (windowObj, windowName) {
              try {
                var x = this.mWindows[windowName]["x"];
                var y = this.mWindows[windowName]["y"];
                if (this.mWindows[windowName]["Align"] == "R") {
                  x = qx.bom.Viewport.getWidth(window) - this.mWindows[windowName]["x"];
                }
                if (this.mWindows[windowName]["AlignV"] == "B") {
                  y = qx.bom.Viewport.getHeight(window) - this.mWindows[windowName]["y"] - windowObj.height;
                }
                windowObj.moveTo(x, y);
                if (windowName != "MainMenu") {
                  windowObj.setHeight(this.mWindows[windowName]["h"]);
                  windowObj.setWidth(this.mWindows[windowName]["w"]);
                }
              } catch (e) {
                console.log("MaelstromTools.moveWindow: ", e);
              }
            },

            checkForPackages: function () {
              try {
                MT_Cache.updateCityCache();

                for (var cname in MT_Cache.Cities) {
                  var ncity = MT_Cache.Cities[cname].Object;
                  if (ncity.get_CityBuildingsData().get_HasCollectableBuildings()) {
                    this.addToMainMenu("CollectAllResources", this.buttonCollectAllResources);
                    return true;
                  }
                }
                this.removeFromMainMenu("CollectAllResources");
                return false;
              } catch (e) {
                console.log("MaelstromTools.checkForPackages: ", e);
                return false;
              }
            },

            collectAllPackages: function () {
              try {
                MT_Cache.updateCityCache();
                for (var cname in MT_Cache.Cities) {
                  var ncity = MT_Cache.Cities[cname].Object;
                  if (ncity.get_CityBuildingsData().get_HasCollectableBuildings()) {
                    if (MT_Cache.CityCount <= 1) {
                      var buildings = ncity.get_Buildings().d;
                      for (var x in buildings) {
                        var building = buildings[x];
                        if (building.get_ProducesPackages() && building.get_ReadyToCollect()) {
                          ClientLib.Net.CommunicationManager.GetInstance().SendCommand("CollectResource",{cityid:ncity.get_Id(), posX:building.get_CoordX(),posY:building.get_CoordY()}, null, null, true);
                        }
                      }
                    } else {
                      ncity.CollectAllResources();
                    }
                  }
                }
                this.removeFromMainMenu("CollectAllResources");
              } catch (e) {
                console.log("MaelstromTools.collectAllPackages: ", e);
              }
            },

            checkRepairAll: function (visMode, buttonName, button) {
              try {
                MT_Cache.updateCityCache();

                for (var cname in MT_Cache.Cities) {
                  var ncity = MT_Cache.Cities[cname].Object;
                  if (MaelstromTools.Wrapper.CanRepairAll(ncity, visMode)) {
                    this.addToMainMenu(buttonName, button);
                    return true;
                  }
                }

                this.removeFromMainMenu(buttonName);
                return false;
              } catch (e) {
                console.log("MaelstromTools.checkRepairAll: ", e);
                return false;
              }
            },

            checkRepairAllUnits: function () {
              return this.checkRepairAll(ClientLib.Vis.Mode.ArmySetup, "RepairAllUnits", this.buttonRepairAllUnits);
            },

            checkRepairAllBuildings: function () {
              return this.checkRepairAll(ClientLib.Vis.Mode.City, "RepairAllBuildings", this.buttonRepairAllBuildings);
            },

            repairAll: function (visMode, buttonName) {
              try {
                MT_Cache.updateCityCache();

                for (var cname in MT_Cache.Cities) {
                  var ncity = MT_Cache.Cities[cname].Object;
                  if (MaelstromTools.Wrapper.CanRepairAll(ncity, visMode)) {
                    MaelstromTools.Wrapper.RepairAll(ncity, visMode);
                  }

                }
                this.removeFromMainMenu(buttonName);
              } catch (e) {
                console.log("MaelstromTools.repairAll: ", e);
              }
            },

            //ClientLib.Data.City.prototype.get_CityRepairData
            //ClientLib.Data.CityRepair.prototype.CanRepairAll
            //ClientLib.Data.CityRepair.prototype.RepairAll
            repairAllUnits: function () {
              try {
                this.repairAll(ClientLib.Vis.Mode.ArmySetup, "RepairAllUnits");
              } catch (e) {
                console.log("MaelstromTools.repairAllUnits: ", e);
              }
            },

            repairAllBuildings: function () {
              try {
                this.repairAll(ClientLib.Vis.Mode.City, "RepairAllBuildings");
              } catch (e) {
                console.log("MaelstromTools.repairAllBuildings: ", e);
              }
            },

            updateLoot: function (ident, visCity, widget) {
              try {
                clearInterval(this.lootStatusInfoInterval);
                if (!MT_Preferences.Settings.showLoot) {
                  if (this.lootWidget[ident]) {
                    this.lootWidget[ident].removeAll();
                  }
                  return;
                }

                var baseLoadState = MT_Cache.updateLoot(visCity);
                if (baseLoadState == -2) { // base already cached and base not changed
                  return;
                }

                if (!this.lootWidget) {
                  this.lootWidget = new Object();
                }
                if (!this.lootWidget[ident]) {
                  this.lootWidget[ident] = new qx.ui.container.Composite(new qx.ui.layout.Grid(5, 5));
                  this.lootWidget[ident].setTextColor("white");
                  widget.add(this.lootWidget[ident]);
                }
                var lootWidget = this.lootWidget[ident];

                var rowIdx = 1;
                var colIdx = 1;
                lootWidget.removeAll();
                switch (baseLoadState) {
                  case -1:
                    {
                      MaelstromTools.Util.addLabel(lootWidget, rowIdx, colIdx++, "Ziel nicht in Reichweite", null, null, 'bold', null);
                      break;
                    }
                  case 1:
                    {
                      var Resources = MT_Cache.SelectedBaseResources;
                      this.createResourceLabels(lootWidget, ++rowIdx, "Mögliche Angriffe", Resources, - 1);
                      this.createResourceLabels(lootWidget, ++rowIdx, "Plünderbare Ressourcen", Resources, 1);
                      break;
                    }
                  default:
                    {
                      MaelstromTools.Util.addLabel(lootWidget, rowIdx, colIdx++, "Scanne...", null, null, 'bold', null);
                      this.lootStatusInfoInterval = setInterval(function () {
                        MaelstromTools.Base.getInstance().updateLoot(ident, visCity, widget);
                      }, 100);
                      break;
                    }
                }
              } catch (e) {
                console.log("MaelstromTools.updateLoot: ", e);
              }
            },

            createResourceLabels: function (lootWidget, rowIdx, Label, Resources, Modifier) {
              var colIdx = 1;
              var font = (Modifier > 1 ? null : 'bold');

              if (Modifier == -1 && Resources.CPNeeded > 0) {
                Label = Lang.gt(Label) + ": " + Math.floor(ClientLib.Data.MainData.GetInstance().get_Player().GetCommandPointCount() / Resources.CPNeeded);
                MaelstromTools.Util.addLabel(lootWidget, rowIdx, colIdx++, Label, null, 'left', font, null, 9);
                return;
              }
              colIdx = 1;
              if (Modifier > 0) {
                MaelstromTools.Util.addLabel(lootWidget, rowIdx, colIdx++, Lang.gt(Label) + ":", null, null, font);
                MaelstromTools.Util.addImage(lootWidget, rowIdx, colIdx++, MaelstromTools.Util.getImage(MaelstromTools.Statics.Research));
                MaelstromTools.Util.addLabel(lootWidget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Resources[MaelstromTools.Statics.Research] / Modifier), 50, 'right', font);
                MaelstromTools.Util.addImage(lootWidget, rowIdx, colIdx++, MaelstromTools.Util.getImage(MaelstromTools.Statics.Tiberium));
                MaelstromTools.Util.addLabel(lootWidget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Resources[MaelstromTools.Statics.Tiberium] / Modifier), 50, 'right', font);
                MaelstromTools.Util.addImage(lootWidget, rowIdx, colIdx++, MaelstromTools.Util.getImage(MaelstromTools.Statics.Crystal));
                MaelstromTools.Util.addLabel(lootWidget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Resources[MaelstromTools.Statics.Crystal] / Modifier), 50, 'right', font);
                MaelstromTools.Util.addImage(lootWidget, rowIdx, colIdx++, MaelstromTools.Util.getImage(MaelstromTools.Statics.Dollar));
                MaelstromTools.Util.addLabel(lootWidget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Resources[MaelstromTools.Statics.Dollar] / Modifier), 50, 'right', font);
                MaelstromTools.Util.addImage(lootWidget, rowIdx, colIdx++, MaelstromTools.Util.getImage("Sum"));
                MaelstromTools.Util.addLabel(lootWidget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Resources["Total"] / Modifier), 50, 'right', font);
              }
            },

            mcvPopup: null,
            mcvPopupX : 0,
            mcvPopupY : 0,
            mcvTimerLabel: null,
            calculateCostsForNextMCV: function () {
              try {
                if (!MT_Preferences.Settings.showCostsForNextMCV) {
                  if (this.mcvPopup) {
                    this.mcvPopup.close();
                  }
                  return;
                }
                var player = ClientLib.Data.MainData.GetInstance().get_Player();
                var cw = player.get_Faction();
                var cj = ClientLib.Base.Tech.GetTechIdFromTechNameAndFaction(ClientLib.Base.ETechName.Research_BaseFound, cw);
                var cr = player.get_PlayerResearch();
                var cd = cr.GetResearchItemFomMdbId(cj);
                if (cd == null) {
                  if (this.mcvPopup) {
                    this.mcvPopup.close();
                  }
                  return;
                }

                if (!this.mcvPopup) {
                  this.mcvPopup = new qx.ui.window.Window("").set({
                    contentPadding : 0,
                    showMinimize : false,
                    showMaximize : false,
                    showClose : false,
                    resizable : false
                  });
                  this.mcvPopup.setLayout(new qx.ui.layout.VBox());
                  this.mcvPopup.addListener("move", function (e) {
                    var base = MaelstromTools.Base.getInstance();
                    var size = qx.core.Init.getApplication().getRoot().getBounds();
                    var value = size.width - e.getData().left;
                    base.mcvPopupX = value < 0 ? 150 : value;
                    value = size.height - e.getData().top;
                    base.mcvPopupY = value < 0 ? 70 : value;
                    MaelstromTools.LocalStorage.set("mcvPopup", {
                      x : base.mcvPopupX,
                      y : base.mcvPopupY
                    });
                  });
                  var font = qx.bom.Font.fromString('bold').set({
                    size: 20
                  });

                  this.mcvTimerLabel = new qx.ui.basic.Label().set({
                    font: font,
                    textColor: 'red',
                    width: 155,
                    textAlign: 'center',
                    marginBottom : 5
                  });
                  this.mcvPopup.add(this.mcvTimerLabel);
                  var serverBar = qx.core.Init.getApplication().getServerBar().getBounds();
                  var pos = MaelstromTools.LocalStorage.get("mcvPopup", {
                      x : serverBar.width + 150,
                      y : 70
                    });
                  this.mcvPopupX = pos.x;
                  this.mcvPopupY = pos.y;
                  this.mcvPopup.open();
                }
                var size = qx.core.Init.getApplication().getRoot().getBounds();
                this.mcvPopup.moveTo(size.width - this.mcvPopupX, size.height - this.mcvPopupY);

                var nextLevelInfo = cd.get_NextLevelInfo_Obj();
                var resourcesNeeded = new Array();
                for (var i in nextLevelInfo.rr) {
                  if (nextLevelInfo.rr[i].t > 0) {
                    resourcesNeeded[nextLevelInfo.rr[i].t] = nextLevelInfo.rr[i].c;
                  }
                }
                //var researchNeeded = resourcesNeeded[ClientLib.Base.EResourceType.ResearchPoints];
                //var currentResearchPoints = player.get_ResearchPoints();

                var creditsNeeded = resourcesNeeded[ClientLib.Base.EResourceType.Gold];
                var creditsResourceData = player.get_Credits();
                var creditGrowthPerHour = (creditsResourceData.Delta + creditsResourceData.ExtraBonusDelta) * ClientLib.Data.MainData.GetInstance().get_Time().get_StepsPerHour();
                var creditTimeLeftInHours = (creditsNeeded - player.GetCreditsCount()) / creditGrowthPerHour;

                if (creditGrowthPerHour == 0 || creditTimeLeftInHours <= 0) {
                  if (this.mcvPopup) {
                    this.mcvPopup.close();
                  }
                  return;
                }

                this.mcvPopup.setCaption(Lang.gt("Next MCV") + " ($ " + MaelstromTools.Wrapper.FormatNumbersCompact(creditsNeeded) + ")");
                this.mcvTimerLabel.setValue(MaelstromTools.Wrapper.FormatTimespan(creditTimeLeftInHours * 60 * 60));

                if (!this.mcvPopup.isVisible()) {
                  this.mcvPopup.open();
                }
              } catch (e) {
                console.log("calculateCostsForNextMCV", e);
              }
            }
          }
        });

        // define Preferences
        qx.Class.define("MaelstromTools.Preferences", {
          type: "singleton",
          extend: qx.core.Object,

          statics: {
            USEDEDICATEDMAINMENU: "useDedicatedMainMenu",
            AUTOCOLLECTPACKAGES: "autoCollectPackages",
            AUTOREPAIRUNITS: "autoRepairUnits",
            AUTOREPAIRBUILDINGS: "autoRepairBuildings",
            AUTOHIDEMISSIONTRACKER: "autoHideMissionTracker",
            AUTOCOLLECTTIMER: "AutoCollectTimer",
            SHOWLOOT: "showLoot",
            SHOWCOSTSFORNEXTMCV: "showCostsForNextMCV",
            CHATHISTORYLENGTH: "ChatHistoryLength"
          },

          members: {
            Window: null,
            Widget: null,
            Settings: null,
            FormElements: null,

            readOptions: function () {
              try {
                if (!this.Settings) {
                  this.Settings = new Object();
                }

                /*
                if(MaelstromTools.LocalStorage.get("useDedicatedMainMenu") == null) {
                  if(qx.bom.Viewport.getWidth(window) > 1800) {
                    this.Settings["useDedicatedMainMenu"] = false;
                  }
                } else {
                  this.Settings["useDedicatedMainMenu"] = (MaelstromTools.LocalStorage.get("useDedicatedMainMenu", 1) == 1);
                }*/
                this.Settings[MaelstromTools.Preferences.USEDEDICATEDMAINMENU] = (MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.USEDEDICATEDMAINMENU, 1) == 1);
                this.Settings[MaelstromTools.Preferences.AUTOCOLLECTPACKAGES] = (MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.AUTOCOLLECTPACKAGES, 1) == 1);
                this.Settings[MaelstromTools.Preferences.AUTOREPAIRUNITS] = (MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.AUTOREPAIRUNITS, 1) == 1);
                this.Settings[MaelstromTools.Preferences.AUTOREPAIRBUILDINGS] = (MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.AUTOREPAIRBUILDINGS, 1) == 1);
                this.Settings[MaelstromTools.Preferences.AUTOHIDEMISSIONTRACKER] = (MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.AUTOHIDEMISSIONTRACKER, 0) == 1);
                this.Settings[MaelstromTools.Preferences.AUTOCOLLECTTIMER] = MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.AUTOCOLLECTTIMER, 60);
                this.Settings[MaelstromTools.Preferences.SHOWLOOT] = (MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.SHOWLOOT, 1) == 1);
                this.Settings[MaelstromTools.Preferences.SHOWCOSTSFORNEXTMCV] = (MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.SHOWCOSTSFORNEXTMCV, 0) == 1);
                this.Settings[MaelstromTools.Preferences.CHATHISTORYLENGTH] = MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.CHATHISTORYLENGTH, 128);

                if (!CCTAWrapperIsInstalled()) {
                  this.Settings[MaelstromTools.Preferences.AUTOREPAIRUNITS] = false;
                  this.Settings[MaelstromTools.Preferences.AUTOREPAIRBUILDINGS] = false;
                  //this.Settings[MaelstromTools.Preferences.SHOWLOOT] = false;
                }
                //console.log(this.Settings);

              } catch (e) {
                console.log("MaelstromTools.Preferences.readOptions: ", e);
              }
            },

            openWindow: function (WindowName, WindowTitle) {
              try {
                if (!this.Window) {
                  //this.Window = new qx.ui.window.Window(WindowTitle).set({
                  this.Window = new webfrontend.gui.OverlayWindow().set({
                    autoHide: false,
                    title: WindowTitle,
                    minHeight: 350

                    //resizable: false,
                    //showMaximize:false,
                    //showMinimize:false,
                    //allowMaximize:false,
                    //allowMinimize:false,
                    //showStatusbar: false
                  });
                  this.Window.clientArea.setPadding(10);
                  this.Window.clientArea.setLayout(new qx.ui.layout.VBox(3));

                  this.Widget = new qx.ui.container.Composite(new qx.ui.layout.Grid().set({
                    spacingX: 5,
                    spacingY: 5
                  }));

                  //this.Widget.setTextColor("white");

                  this.Window.clientArea.add(this.Widget);
                }

                if (this.Window.isVisible()) {
                  this.Window.close();
                } else {
                  MT_Base.openWindow(this.Window, WindowName);
                  this.setWidgetLabels();
                }
              } catch (e) {
                console.log("MaelstromTools.Preferences.openWindow: ", e);
              }
            },

            addFormElement: function (name, element) {
              this.FormElements[name] = element;
            },

            setWidgetLabels: function () {
              try {
                this.readOptions();

                this.FormElements = new Object();
                this.Widget.removeAll();
                var rowIdx = 1;
                var colIdx = 1;

                var chkAutoHideMissionTracker = new qx.ui.form.CheckBox(Lang.gt("Hide Mission Tracker")).set({
                  value: this.Settings[MaelstromTools.Preferences.AUTOHIDEMISSIONTRACKER] == 1
                });
                var chkUseDedicatedMainMenu = new qx.ui.form.CheckBox(Lang.gt("Use dedicated Main Menu (restart required)")).set({
                  value: this.Settings[MaelstromTools.Preferences.USEDEDICATEDMAINMENU] == 1
                });
                var chkShowLoot = new qx.ui.form.CheckBox(Lang.gt("Show lootable resources (restart required)")).set({
                  value: this.Settings[MaelstromTools.Preferences.SHOWLOOT] == 1/*,
                  enabled: CCTAWrapperIsInstalled()*/
                });
                var chkCostsNextMCV = new qx.ui.form.CheckBox(Lang.gt("Show time to next MCV")).set({
                  value: this.Settings[MaelstromTools.Preferences.SHOWCOSTSFORNEXTMCV] == 1
                });
                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx, chkAutoHideMissionTracker, 2);
                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx, chkUseDedicatedMainMenu, 2);
                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx, chkShowLoot, 2);
                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx, chkCostsNextMCV, 2);

                var chkAutoCollectPackages = new qx.ui.form.CheckBox(Lang.gt("Autocollect packages")).set({
                  value: this.Settings[MaelstromTools.Preferences.AUTOCOLLECTPACKAGES] == 1
                });
                var chkAutoRepairUnits = new qx.ui.form.CheckBox(Lang.gt("Autorepair units")).set({
                  value: this.Settings[MaelstromTools.Preferences.AUTOREPAIRUNITS] == 1,
                  enabled: CCTAWrapperIsInstalled()
                });
                var chkAutoRepairBuildings = new qx.ui.form.CheckBox(Lang.gt("Autorepair buildings")).set({
                  value: this.Settings[MaelstromTools.Preferences.AUTOREPAIRBUILDINGS] == 1,
                  enabled: CCTAWrapperIsInstalled()
                });

                var spinnerChatHistoryLength = new qx.ui.form.Spinner().set({
                  minimum: 64,
                  maximum: 512,
                  value: this.Settings[MaelstromTools.Preferences.CHATHISTORYLENGTH]
                });

                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx, Lang.gt("Chat history length") + " (" + spinnerChatHistoryLength.getMinimum() + " - " + spinnerChatHistoryLength.getMaximum() + ")");
                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx + 1, spinnerChatHistoryLength);

                var spinnerAutoCollectTimer = new qx.ui.form.Spinner().set({
                  minimum: 5,
                  maximum: 60 * 6,
                  value: this.Settings[MaelstromTools.Preferences.AUTOCOLLECTTIMER]
                });

                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx, Lang.gt("Automatic interval in minutes") + " (" + spinnerAutoCollectTimer.getMinimum() + " - " + spinnerAutoCollectTimer.getMaximum() + ")");
                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx + 1, spinnerAutoCollectTimer);
                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx, chkAutoCollectPackages, 2);
                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx, chkAutoRepairUnits, 2);
                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx, chkAutoRepairBuildings, 2);

                var applyButton = new qx.ui.form.Button(Lang.gt("Apply changes")).set({
                  appearance: "button-detailview-small",
                  width: 120,
                  minWidth: 120,
                  maxWidth: 120
                });
                applyButton.addListener("execute", this.applyChanges, this);

                var cancelButton = new qx.ui.form.Button(Lang.gt("Discard changes")).set({
                  appearance: "button-detailview-small",
                  width: 120,
                  minWidth: 120,
                  maxWidth: 120
                });
                cancelButton.addListener("execute", function () {
                  this.Window.close();
                }, this);

                var resetButton = new qx.ui.form.Button(Lang.gt("Reset to default")).set({
                  appearance: "button-detailview-small",
                  width: 120,
                  minWidth: 120,
                  maxWidth: 120
                });
                resetButton.addListener("execute", this.resetToDefault, this);

                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx, resetButton);
                colIdx = 1;
                MaelstromTools.Util.addElement(this.Widget, rowIdx, colIdx++, cancelButton);
                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx, applyButton);

                this.addFormElement(MaelstromTools.Preferences.AUTOHIDEMISSIONTRACKER, chkAutoHideMissionTracker);
                this.addFormElement(MaelstromTools.Preferences.USEDEDICATEDMAINMENU, chkUseDedicatedMainMenu);
                this.addFormElement(MaelstromTools.Preferences.SHOWLOOT, chkShowLoot);
                this.addFormElement(MaelstromTools.Preferences.SHOWCOSTSFORNEXTMCV, chkCostsNextMCV);
                this.addFormElement(MaelstromTools.Preferences.AUTOCOLLECTPACKAGES, chkAutoCollectPackages);
                this.addFormElement(MaelstromTools.Preferences.AUTOREPAIRUNITS, chkAutoRepairUnits);
                this.addFormElement(MaelstromTools.Preferences.AUTOREPAIRBUILDINGS, chkAutoRepairBuildings);
                this.addFormElement(MaelstromTools.Preferences.AUTOCOLLECTTIMER, spinnerAutoCollectTimer);
                this.addFormElement(MaelstromTools.Preferences.CHATHISTORYLENGTH, spinnerChatHistoryLength);
              } catch (e) {
                console.log("MaelstromTools.Preferences.setWidgetLabels: ", e);
              }
            },

            applyChanges: function () {
              try {
                var autoRunNeeded = false;
                for (var idx in this.FormElements) {
                  var element = this.FormElements[idx];
                  if (idx == MaelstromTools.Preferences.AUTOCOLLECTTIMER) {
                    autoRunNeeded = (MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.AUTOCOLLECTTIMER, 0) != element.getValue());
                  }
                  if (idx == MaelstromTools.Preferences.CHATHISTORYLENGTH) {
                    webfrontend.gui.chat.ChatWidget.recvbufsize = element.getValue();
                  }
                  MaelstromTools.LocalStorage.set(idx, element.getValue());
                }
                this.readOptions();
                if (autoRunNeeded) {
                  MT_Base.runAutoCollectTimer();
                }
                this.Window.close();
              } catch (e) {
                console.log("MaelstromTools.Preferences.applyChanges: ", e);
              }
            },

            resetToDefault: function () {
              try {
                MaelstromTools.LocalStorage.clearAll();
                this.setWidgetLabels();
              } catch (e) {
                console.log("MaelstromTools.Preferences.resetToDefault: ", e);
              }
            }
          }
        });

        // define DefaultObject
        qx.Class.define("MaelstromTools.DefaultObject", {
          type: "abstract",
          extend: qx.core.Object,
          members: {
            Window: null,
            Widget: null,
            Cache: {}, //k null
            IsTimerEnabled: true,

            calc: function () {
              try {
                if (this.Window.isVisible()) {
                  this.updateCache();
                  this.setWidgetLabels();
                  if (this.IsTimerEnabled) {
                    var self = this;
                    window.setTimeout(function () {
                      self.calc();
                    }, MT_Base.timerInterval);
                  }
                }
              } catch (e) {
                console.log("MaelstromTools.DefaultObject.calc: ", e);
              }
            },

            openWindow: function (WindowName, WindowTitle) {
              try {
                if (!this.Window) {
                  this.Window = new qx.ui.window.Window(WindowTitle).set({
                    resizable: false,
                    showMaximize: false,
                    showMinimize: false,
                    allowMaximize: false,
                    allowMinimize: false,
                    showStatusbar: false
                  });
                  this.Window.setPadding(10);
                  this.Window.setLayout(new qx.ui.layout.VBox(3));

                  this.Widget = new qx.ui.container.Composite(new qx.ui.layout.Grid());
                  this.Widget.setTextColor("white");

                  this.Window.add(this.Widget);
                }

                if (this.Window.isVisible()) {
                  this.Window.close();
                } else {
                  MT_Base.openWindow(this.Window, WindowName);
                  this.calc();
                }
              } catch (e) {
                console.log("MaelstromTools.DefaultObject.openWindow: ", e);
              }
            }
          }
        });

        // define Production
        qx.Class.define("MaelstromTools.Production", {
          type: "singleton",
          extend: MaelstromTools.DefaultObject,
          members: {
            updateCache: function (onlyForCity) {
              try {
                MT_Cache.updateCityCache();
                var alliance = ClientLib.Data.MainData.GetInstance().get_Alliance();
                //this.Cache = Object();

                for (var cname in MT_Cache.Cities) {
                  if (onlyForCity != null && onlyForCity != cname) {
                    continue;
                  }
                  var ncity = MT_Cache.Cities[cname].Object;
                  if (typeof (this.Cache[cname]) !== 'object') this.Cache[cname] = {};
                  if (typeof (this.Cache[cname][MaelstromTools.Statics.Tiberium]) !== 'object') this.Cache[cname][MaelstromTools.Statics.Tiberium] = {}; // all have to be checked, 
                  if (typeof (this.Cache[cname][MaelstromTools.Statics.Crystal]) !== 'object') this.Cache[cname][MaelstromTools.Statics.Crystal] = {}; // this.Cache[cname] can be created inside different namespaces
                  if (typeof (this.Cache[cname][MaelstromTools.Statics.Power]) !== 'object') this.Cache[cname][MaelstromTools.Statics.Power] = {}; // like the RepairTime etc... without those objs
                  if (typeof (this.Cache[cname][MaelstromTools.Statics.Dollar]) !== 'object') this.Cache[cname][MaelstromTools.Statics.Dollar] = {};

                  this.Cache[cname]["ProductionStopped"] = ncity.get_IsGhostMode();
                  this.Cache[cname]["PackagesStopped"] = (ncity.get_hasCooldown() || ncity.get_IsGhostMode());
                  this.Cache[cname][MaelstromTools.Statics.Tiberium]["Delta"] = ncity.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Tiberium, false, false); // (production.d[ClientLib.Base.EResourceType.Tiberium]['Delta'] * serverTime.get_StepsPerHour());
                  this.Cache[cname][MaelstromTools.Statics.Tiberium]["ExtraBonusDelta"] = ncity.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Tiberium); //(production.d[ClientLib.Base.EResourceType.Tiberium]['ExtraBonusDelta'] * serverTime.get_StepsPerHour());
                  this.Cache[cname][MaelstromTools.Statics.Tiberium]["POI"] = alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Tiberium);
                  this.Cache[cname][MaelstromTools.Statics.Crystal]["Delta"] = ncity.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Crystal, false, false); //(production.d[ClientLib.Base.EResourceType.Crystal]['Delta'] * serverTime.get_StepsPerHour());
                  this.Cache[cname][MaelstromTools.Statics.Crystal]["ExtraBonusDelta"] = ncity.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Crystal); //(production.d[ClientLib.Base.EResourceType.Crystal]['ExtraBonusDelta'] * serverTime.get_StepsPerHour());
                  this.Cache[cname][MaelstromTools.Statics.Crystal]["POI"] = alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Crystal);
                  this.Cache[cname][MaelstromTools.Statics.Power]["Delta"] = ncity.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Power, false, false); //(production.d[ClientLib.Base.EResourceType.Power]['Delta'] * serverTime.get_StepsPerHour());
                  this.Cache[cname][MaelstromTools.Statics.Power]["ExtraBonusDelta"] = ncity.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Power); // (production.d[ClientLib.Base.EResourceType.Power]['ExtraBonusDelta'] * serverTime.get_StepsPerHour());
                  this.Cache[cname][MaelstromTools.Statics.Power]["POI"] = alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Power);
                  this.Cache[cname][MaelstromTools.Statics.Dollar]["Delta"] = ClientLib.Base.Resource.GetResourceGrowPerHour(ncity.get_CityCreditsProduction(), false); // (ncity.get_CityCreditsProduction()['Delta'] * serverTime.get_StepsPerHour());
                  this.Cache[cname][MaelstromTools.Statics.Dollar]["ExtraBonusDelta"] = ClientLib.Base.Resource.GetResourceBonusGrowPerHour(ncity.get_CityCreditsProduction(), false); // (ncity.get_CityCreditsProduction()['ExtraBonusDelta'] * serverTime.get_StepsPerHour());
                  this.Cache[cname][MaelstromTools.Statics.Dollar]["POI"] = 0;
                  this.Cache[cname]["BaseLevel"] = MaelstromTools.Wrapper.GetBaseLevel(ncity);
                  if (onlyForCity != null && onlyForCity == cname) return this.Cache[cname];
                }
              } catch (e) {
                console.log("MaelstromTools.Production.updateCache: ", e);
              }
            },

            createProductionLabels2: function (rowIdx, colIdx, cityName, resourceType) {
              try {
                if (cityName == "-Total-") {
                  var Totals = Object();
                  Totals["Delta"] = 0;
                  Totals["ExtraBonusDelta"] = 0;
                  Totals["POI"] = 0;
                  Totals["Total"] = 0;

                  for (var cname in this.Cache) {
                    Totals["Delta"] += this.Cache[cname][resourceType]['Delta'];
                    Totals["ExtraBonusDelta"] += this.Cache[cname][resourceType]['ExtraBonusDelta'];
                    Totals["POI"] += this.Cache[cname][resourceType]['POI'];
                  }
                  Totals["Total"] = Totals['Delta'] + Totals['ExtraBonusDelta'] + Totals['POI'];

                  rowIdx++;

                  MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, MaelstromTools.Wrapper.FormatNumbersCompact(Totals['Delta']), 80, 'right', 'bold');
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, MaelstromTools.Wrapper.FormatNumbersCompact(Totals['ExtraBonusDelta']), 80, 'right', 'bold');
                  if (resourceType != MaelstromTools.Statics.Dollar) {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, MaelstromTools.Wrapper.FormatNumbersCompact(Totals['POI']), 80, 'right', 'bold');
                  } else {
                    rowIdx++;
                  }
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, MaelstromTools.Wrapper.FormatNumbersCompact(Totals['Total']), 80, 'right', 'bold');
                } else if (cityName == "-Labels-") {
                  MaelstromTools.Util.addImage(this.Widget, rowIdx++, colIdx, MaelstromTools.Util.getImage(resourceType));
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, "Continuous", 100, 'left');
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, "Bonus", 100, 'left');
                  if (resourceType != MaelstromTools.Statics.Dollar) {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, "POI", 100, 'left');
                  } else {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, "Total / BaseLevel", 100, 'left');
                  }
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, "Total / h", 100, 'left');
                } else {
                  var cityCache = this.Cache[cityName];
                  if (rowIdx > 2) {
                    rowIdx++;
                  }
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[resourceType]['Delta']), 80, 'right', null, ((cityCache["ProductionStopped"] || cityCache[resourceType]['Delta'] == 0) ? "red" : "white"));
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[resourceType]['ExtraBonusDelta']), 80, 'right', null, ((cityCache["PackagesStopped"] || cityCache[resourceType]['ExtraBonusDelta'] == 0) ? "red" : "white"));
                  if (resourceType != MaelstromTools.Statics.Dollar) {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[resourceType]['POI']), 80, 'right', null, (cityCache[resourceType]['POI'] == 0 ? "red" : "white"));
                  } else {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, MaelstromTools.Wrapper.FormatNumbersCompact((cityCache[resourceType]['Delta'] + cityCache[resourceType]['ExtraBonusDelta'] + cityCache[resourceType]['POI']) / cityCache["BaseLevel"]), 80, 'right');
                  }
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[resourceType]['Delta'] + cityCache[resourceType]['ExtraBonusDelta'] + cityCache[resourceType]['POI']), 80, 'right', 'bold');
                }
                return rowIdx;
              } catch (e) {
                console.log("MaelstromTools.Production.createProductionLabels2: ", e);
              }
            },

            setWidgetLabels: function () {
              try {
                this.Widget.removeAll();

                var rowIdx = 1;
                var colIdx = 1;

                rowIdx = this.createProductionLabels2(rowIdx, colIdx, "-Labels-", MaelstromTools.Statics.Tiberium);
                rowIdx = this.createProductionLabels2(rowIdx, colIdx, "-Labels-", MaelstromTools.Statics.Crystal);
                rowIdx = this.createProductionLabels2(rowIdx, colIdx, "-Labels-", MaelstromTools.Statics.Power);
                rowIdx = this.createProductionLabels2(rowIdx, colIdx, "-Labels-", MaelstromTools.Statics.Dollar);

                colIdx++;
                for (var cityName in this.Cache) {
                  rowIdx = 1;
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, cityName, 80, 'right');

                  rowIdx = this.createProductionLabels2(rowIdx, colIdx, cityName, MaelstromTools.Statics.Tiberium);
                  rowIdx = this.createProductionLabels2(rowIdx, colIdx, cityName, MaelstromTools.Statics.Crystal);
                  rowIdx = this.createProductionLabels2(rowIdx, colIdx, cityName, MaelstromTools.Statics.Power);
                  rowIdx = this.createProductionLabels2(rowIdx, colIdx, cityName, MaelstromTools.Statics.Dollar);

                  MaelstromTools.Util.addElement(this.Widget, rowIdx, colIdx++, MaelstromTools.Util.getAccessBaseButton(cityName));
                }

                rowIdx = 1;
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx, "Total / h", 80, 'right', 'bold');

                rowIdx = this.createProductionLabels2(rowIdx, colIdx, "-Total-", MaelstromTools.Statics.Tiberium);
                rowIdx = this.createProductionLabels2(rowIdx, colIdx, "-Total-", MaelstromTools.Statics.Crystal);
                rowIdx = this.createProductionLabels2(rowIdx, colIdx, "-Total-", MaelstromTools.Statics.Power);
                rowIdx = this.createProductionLabels2(rowIdx, colIdx, "-Total-", MaelstromTools.Statics.Dollar);
              } catch (e) {
                console.log("MaelstromTools.Production.setWidgetLabels: ", e);
              }
            }
          }
        });

        // define RepairTime
        qx.Class.define("MaelstromTools.RepairTime", {
          type: "singleton",
          extend: MaelstromTools.DefaultObject,
          members: {

            updateCache: function () {
              try {
                MT_Cache.updateCityCache();
                this.Cache = Object();

                for (var cname in MT_Cache.Cities) {
                  var ncity = MT_Cache.Cities[cname].Object;
                  var RepLargest = '';

                  this.Cache[cname] = Object();
                  this.Cache[cname]["RepairTime"] = Object();
                  this.Cache[cname]["Repaircharge"] = Object();
                  this.Cache[cname]["Repaircharge"]["Smallest"] = 999999999;
                  this.Cache[cname]["RepairTime"]["Largest"] = 0;

                  this.Cache[cname]["RepairTime"][MaelstromTools.Statics.Infantry] = ncity.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Infantry, false);
                  this.Cache[cname]["RepairTime"][MaelstromTools.Statics.Vehicle] = ncity.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Vehicle, false);
                  this.Cache[cname]["RepairTime"][MaelstromTools.Statics.Aircraft] = ncity.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Aircraft, false);
                  this.Cache[cname]["RepairTime"]["Maximum"] = ncity.GetResourceMaxStorage(ClientLib.Base.EResourceType.RepairChargeInf);
                  this.Cache[cname]["Repaircharge"][MaelstromTools.Statics.Infantry] = ncity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeInf);
                  this.Cache[cname]["Repaircharge"][MaelstromTools.Statics.Vehicle] = ncity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeVeh);
                  this.Cache[cname]["Repaircharge"][MaelstromTools.Statics.Aircraft] = ncity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeAir);

                  if (this.Cache[cname]["Repaircharge"][MaelstromTools.Statics.Infantry] < this.Cache[cname]["Repaircharge"]["Smallest"]) {
                    this.Cache[cname]["Repaircharge"]["Smallest"] = this.Cache[cname]["Repaircharge"][MaelstromTools.Statics.Infantry];
                  }
                  if (this.Cache[cname]["Repaircharge"][MaelstromTools.Statics.Vehicle] < this.Cache[cname]["Repaircharge"]["Smallest"]) {
                    this.Cache[cname]["Repaircharge"]["Smallest"] = this.Cache[cname]["Repaircharge"][MaelstromTools.Statics.Vehicle];
                  }
                  if (this.Cache[cname]["Repaircharge"][MaelstromTools.Statics.Aircraft] < this.Cache[cname]["Repaircharge"]["Smallest"]) {
                    this.Cache[cname]["Repaircharge"]["Smallest"] = this.Cache[cname]["Repaircharge"][MaelstromTools.Statics.Aircraft];
                  }

                  if (this.Cache[cname]["RepairTime"][MaelstromTools.Statics.Infantry] > this.Cache[cname]["RepairTime"]["Largest"]) {
                    this.Cache[cname]["RepairTime"]["Largest"] = this.Cache[cname]["RepairTime"][MaelstromTools.Statics.Infantry];
                    RepLargest = "Infantry";
                  }
                  if (this.Cache[cname]["RepairTime"][MaelstromTools.Statics.Vehicle] > this.Cache[cname]["RepairTime"]["Largest"]) {
                    this.Cache[cname]["RepairTime"]["Largest"] = this.Cache[cname]["RepairTime"][MaelstromTools.Statics.Vehicle];
                    RepLargest = "Vehicle";
                  }
                  if (this.Cache[cname]["RepairTime"][MaelstromTools.Statics.Aircraft] > this.Cache[cname]["RepairTime"]["Largest"]) {
                    this.Cache[cname]["RepairTime"]["Largest"] = this.Cache[cname]["RepairTime"][MaelstromTools.Statics.Aircraft];
                    RepLargest = "Aircraft";
                  }

                  //PossibleAttacks and MaxAttacks fixes
                  var offHealth = ncity.GetOffenseConditionInPercent();
                  if (RepLargest !== '') {
                    this.Cache[cname]["RepairTime"]["LargestDiv"] = this.Cache[cname]["RepairTime"][RepLargest];
                    var i = Math.ceil(this.Cache[cname]["Repaircharge"].Smallest / this.Cache[cname]["RepairTime"].LargestDiv); //fix
                    var j = this.Cache[cname]["Repaircharge"].Smallest / this.Cache[cname]["RepairTime"].LargestDiv;
                    if (offHealth !== 100) { i--; i += '*';} // Decrease number of attacks by 1 when unit unhealthy. Additional visual info: asterisk when units aren't healthy
                    this.Cache[cname]["RepairTime"]["PossibleAttacks"] = i;
                    var k = this.Cache[cname]["RepairTime"].Maximum / this.Cache[cname]["RepairTime"].LargestDiv;
                    this.Cache[cname]["RepairTime"]["MaxAttacks"] = Math.ceil(k); //fix
                  } else {
                    this.Cache[cname]["RepairTime"]["LargestDiv"] = 0;
                    this.Cache[cname]["RepairTime"]["PossibleAttacks"] = 0;
                    this.Cache[cname]["RepairTime"]["MaxAttacks"] = 0;
                  }

                  var unitsData = ncity.get_CityUnitsData();
                  this.Cache[cname]["Base"] = Object();
                  this.Cache[cname]["Base"]["Level"] = MaelstromTools.Wrapper.GetBaseLevel(ncity);
                  this.Cache[cname]["Base"]["UnitLimit"] = ncity.GetBuildingSlotLimit(); //ncity.GetNumBuildings();
                  this.Cache[cname]["Base"]["TotalHeadCount"] = ncity.GetBuildingSlotCount();
                  this.Cache[cname]["Base"]["FreeHeadCount"] = this.Cache[cname]["Base"]["UnitLimit"] - this.Cache[cname]["Base"]["TotalHeadCount"];
                  this.Cache[cname]["Base"]["HealthInPercent"] = ncity.GetBuildingsConditionInPercent();

                  this.Cache[cname]["Offense"] = Object();
                  this.Cache[cname]["Offense"]["Level"] = (Math.floor(ncity.get_LvlOffense() * 100) / 100).toFixed(2);
                  this.Cache[cname]["Offense"]["UnitLimit"] = unitsData.get_UnitLimitOffense();
                  this.Cache[cname]["Offense"]["TotalHeadCount"] = unitsData.get_TotalOffenseHeadCount();
                  this.Cache[cname]["Offense"]["FreeHeadCount"] = unitsData.get_FreeOffenseHeadCount();
                  this.Cache[cname]["Offense"]["HealthInPercent"] = offHealth > 0 ? offHealth : 0;

                  this.Cache[cname]["Defense"] = Object();
                  this.Cache[cname]["Defense"]["Level"] = (Math.floor(ncity.get_LvlDefense() * 100) / 100).toFixed(2);
                  this.Cache[cname]["Defense"]["UnitLimit"] = unitsData.get_UnitLimitDefense();
                  this.Cache[cname]["Defense"]["TotalHeadCount"] = unitsData.get_TotalDefenseHeadCount();
                  this.Cache[cname]["Defense"]["FreeHeadCount"] = unitsData.get_FreeDefenseHeadCount();
                  this.Cache[cname]["Defense"]["HealthInPercent"] = ncity.GetDefenseConditionInPercent() > 0 ? ncity.GetDefenseConditionInPercent() : 0;

                  //console.log(ncity.get_CityUnitsData().get_UnitLimitOffense() + " / " + ncity.get_CityUnitsData().get_TotalOffenseHeadCount() + " = " + ncity.get_CityUnitsData().get_FreeOffenseHeadCount());
                  //console.log(ncity.get_CityUnitsData().get_UnitLimitDefense() + " / " + ncity.get_CityUnitsData().get_TotalDefenseHeadCount() + " = " + ncity.get_CityUnitsData().get_FreeDefenseHeadCount());
                }
              } catch (e) {
                console.log("MaelstromTools.RepairTime.updateCache: ", e);
              }
            },

            setWidgetLabels: function () {
              try {
                this.Widget.removeAll();
                var rowIdx = 1;

                rowIdx = this.createOverviewLabels(rowIdx);
                rowIdx = this.createRepairchargeLabels(rowIdx);
              } catch (e) {
                console.log("MaelstromTools.RepairTime.setWidgetLabels: ", e);
              }
            },

            createRepairchargeLabels: function (rowIdx) {
              try {
                var colIdx = 2;
                MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx++, "Repaircharges", null, 'left', null, null, 3);
                colIdx = 2;

                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Statics.Infantry, 60, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Statics.Vehicle, 60, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Statics.Aircraft, 60, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Repairtime", 80, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Attacks", 60, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Next at", 80, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Max+1 at", 80, 'right');

                rowIdx++;
                for (var cityName in this.Cache) {
                  var cityCache = this.Cache[cityName];
                  if (cityCache.Offense.UnitLimit == 0) {
                    continue;
                  }
                  colIdx = 1;
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityName, 80, 'left');

                  // Skip bases with no armies
                  if (cityCache.Offense.UnitLimit > 0) {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatTimespan(cityCache.RepairTime.Infantry), 60, 'right', null, (cityCache.RepairTime.Infantry == cityCache.RepairTime.LargestDiv ? "yellow" : "white"));
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatTimespan(cityCache.RepairTime.Vehicle), 60, 'right', null, (cityCache.RepairTime.Vehicle == cityCache.RepairTime.LargestDiv ? "yellow" : "white"));
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatTimespan(cityCache.RepairTime.Aircraft), 60, 'right', null, (cityCache.RepairTime.Aircraft == cityCache.RepairTime.LargestDiv ? "yellow" : "white"));
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatTimespan(cityCache.Repaircharge.Smallest), 80, 'right');
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.RepairTime.PossibleAttacks + " / " + cityCache.RepairTime.MaxAttacks, 60, 'right', null, (cityCache.Offense.HealthInPercent !== 100 ? 'red' : null)); // mark red when unhealthy
                    var i = cityCache.RepairTime.LargestDiv * cityCache.RepairTime.PossibleAttacks;
                    var j = cityCache.RepairTime.LargestDiv * cityCache.RepairTime.MaxAttacks;
                    (i>0) ? MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatTimespan(i), 80, 'right', null, (i > cityCache.RepairTime.Maximum ? "yellow" : "white")) : colIdx++; /// yellow if more than Maximum RT
                    (j>0) ? MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatTimespan(j), 80, 'right') : colIdx++;
                  } else {
                    colIdx += 7;
                  }

                  colIdx += 4;
                  MaelstromTools.Util.addElement(this.Widget, rowIdx, colIdx++, MaelstromTools.Util.getAccessBaseButton(cityName, PerforceChangelist >= 376877 ? ClientLib.Data.PlayerAreaViewMode.pavmPlayerOffense : webfrontend.gui.PlayArea.PlayArea.modes.EMode_PlayerOffense));
                  rowIdx += 2;
                }

                return rowIdx;
              } catch (e) {
                console.log("MaelstromTools.RepairTime.createRepairchargeLabels: ", e);
              }
            },

            createOverviewLabels: function (rowIdx) {
              try {
                var colIdx = 2;

                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx, "Base", 60, 'right');
                colIdx += 3;
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx, "Defense", 60, 'right');
                colIdx += 3;
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx, "Army", 60, 'right');

                rowIdx++;
                colIdx = 2;

                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Level", 60, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Buildings", 60, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Health", 60, 'right');

                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Level", 60, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Buildings", 60, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Health", 60, 'right');

                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Level", 60, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Units", 60, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Health", 60, 'right');

                rowIdx++;
                for (var cityName in this.Cache) {
                  var cityCache = this.Cache[cityName];
                  colIdx = 1;

                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityName, 80, 'left');

                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.Base.Level, 60, 'right');
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.Base.TotalHeadCount + " / " + cityCache.Base.UnitLimit, 60, 'right', null, (cityCache.Base.FreeHeadCount >= 1 ? "red" : "white"));
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.Base.HealthInPercent + "%", 60, 'right', null, (cityCache.Base.HealthInPercent < 25 ? "red" : (cityCache.Base.HealthInPercent < 100 ? "yellow" : "white")));

                  if (cityCache.Defense.UnitLimit > 0) {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.Defense.Level, 60, 'right');
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.Defense.TotalHeadCount + " / " + cityCache.Defense.UnitLimit, 60, 'right', null, (cityCache.Defense.FreeHeadCount >= 5 ? "red" : (cityCache.Defense.FreeHeadCount >= 3 ? "yellow" : "white")));
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.Defense.HealthInPercent + "%", 60, 'right', null, (cityCache.Defense.HealthInPercent < 25 ? "red" : (cityCache.Defense.HealthInPercent < 100 ? "yellow" : "white")));
                  } else {
                    colIdx += 3;
                  }

                  // Skip bases with no armies
                  if (cityCache.Offense.UnitLimit > 0) {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.Offense.Level, 60, 'right');
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.Offense.TotalHeadCount + " / " + cityCache.Offense.UnitLimit, 60, 'right', null, (cityCache.Offense.FreeHeadCount >= 10 ? "red" : (cityCache.Offense.FreeHeadCount >= 5 ? "yellow" : "white")));
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.Offense.HealthInPercent + "%", 60, 'right', null, (cityCache.Offense.HealthInPercent < 25 ? "red" : (cityCache.Offense.HealthInPercent < 100 ? "yellow" : "white")));
                  } else {
                    colIdx += 3;
                  }

                  MaelstromTools.Util.addElement(this.Widget, rowIdx, colIdx++, MaelstromTools.Util.getAccessBaseButton(cityName));
                  rowIdx += 2;
                }
                return rowIdx;
              } catch (e) {
                console.log("MaelstromTools.RepairTime.createOverviewLabels: ", e);
              }
            }

          }
        });

        // define ResourceOverview
        qx.Class.define("MaelstromTools.ResourceOverview", {
          type: "singleton",
          extend: MaelstromTools.DefaultObject,
          members: {
            Table: null,
            Model: null,

            updateCache: function () {
              try {
                MT_Cache.updateCityCache();
                this.Cache = Object();

                for (var cname in MT_Cache.Cities) {
                  var ncity = MT_Cache.Cities[cname].Object;
                  var mtime = ClientLib.Data.MainData.GetInstance().get_Time();

                  this.Cache[cname] = Object();
                  this.Cache[cname][MaelstromTools.Statics.Tiberium] = ncity.GetResourceCount(ClientLib.Base.EResourceType.Tiberium);
                  this.Cache[cname][MaelstromTools.Statics.Tiberium + "Max"] = ncity.GetResourceMaxStorage(ClientLib.Base.EResourceType.Tiberium);
                  this.Cache[cname][MaelstromTools.Statics.Tiberium + "Full"] = mtime.GetJSStepTime(ncity.GetResourceStorageFullStep(ClientLib.Base.EResourceType.Tiberium));
                  this.Cache[cname][MaelstromTools.Statics.Crystal] = ncity.GetResourceCount(ClientLib.Base.EResourceType.Crystal);
                  this.Cache[cname][MaelstromTools.Statics.Crystal + "Max"] = ncity.GetResourceMaxStorage(ClientLib.Base.EResourceType.Crystal);
                  this.Cache[cname][MaelstromTools.Statics.Crystal + "Full"] = mtime.GetJSStepTime(ncity.GetResourceStorageFullStep(ClientLib.Base.EResourceType.Crystal));
                  this.Cache[cname][MaelstromTools.Statics.Power] = ncity.GetResourceCount(ClientLib.Base.EResourceType.Power);
                  this.Cache[cname][MaelstromTools.Statics.Power + "Max"] = ncity.GetResourceMaxStorage(ClientLib.Base.EResourceType.Power);
                  this.Cache[cname][MaelstromTools.Statics.Power + "Full"] = mtime.GetJSStepTime(ncity.GetResourceStorageFullStep(ClientLib.Base.EResourceType.Power));
                }

              } catch (e) {
                console.log("MaelstromTools.ResourceOverview.updateCache: ", e);
              }
            },
/*
            setWidgetLabelsTable: function () {
              try {
                if (!this.Table) {
                  this.Widget.setLayout(new qx.ui.layout.HBox());

                  this.Model = new qx.ui.table.model.Simple();
                  this.Model.setColumns(["City", "Tib. Storage", "Tiberium", "Full", "Crystal", "Full", "Power", "Storage", "Full"]);
                  this.Table = new qx.ui.table.Table(this.Model);
                  this.Widget.add(this.Table, {
                    flex: 1
                  });
                }

                var Totals = Object();
                Totals[MaelstromTools.Statics.Tiberium] = 0;
                Totals[MaelstromTools.Statics.Crystal] = 0;
                Totals[MaelstromTools.Statics.Power] = 0;
                Totals[MaelstromTools.Statics.Tiberium + "Max"] = 0;
                Totals[MaelstromTools.Statics.Power + "Max"] = 0;

                var rowData = [];

                for (var cityName in this.Cache) {
                  var cityCache = this.Cache[cityName];

                  Totals[MaelstromTools.Statics.Tiberium] += cityCache[MaelstromTools.Statics.Tiberium];
                  Totals[MaelstromTools.Statics.Crystal] += cityCache[MaelstromTools.Statics.Crystal];
                  Totals[MaelstromTools.Statics.Power] += cityCache[MaelstromTools.Statics.Power];
                  Totals[MaelstromTools.Statics.Tiberium + "Max"] += cityCache[MaelstromTools.Statics.Tiberium + 'Max'];
                  Totals[MaelstromTools.Statics.Power + "Max"] += cityCache[MaelstromTools.Statics.Power + 'Max'];

                  rowData.push([
                    cityName,
                    MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Tiberium + 'Max']),
                    MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Tiberium]),
                    MaelstromTools.Wrapper.GetDateTimeString(cityCache[MaelstromTools.Statics.Tiberium + 'Full']),
                    MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Crystal]),
                    MaelstromTools.Wrapper.GetDateTimeString(cityCache[MaelstromTools.Statics.Crystal + 'Full']),
                    MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Power]),
                    MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Power + 'Max']),
                    MaelstromTools.Wrapper.GetDateTimeString(cityCache[MaelstromTools.Statics.Power + 'Full'])
                    ]);
                }
                rowData.push([
                  'Total resources',
                  MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Tiberium + 'Max']),
                  MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Tiberium]),
                  '',
                  MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Crystal]),
                  '',
                  MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Power]),
                  MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Power + 'Max']),
                  ''
                  ]);

                this.Model.setData(rowData);
              } catch (e) {
                console.log("MaelstromTools.ResourceOverview.setWidgetLabels: ", e);
              }
            },

            */
            setWidgetLabels: function () {
              try {
                this.Widget.removeAll();

                var first = true;
                var rowIdx = 2;
                var Totals = Object();
                var colIdx = 1;
                Totals[MaelstromTools.Statics.Tiberium] = 0;
                Totals[MaelstromTools.Statics.Crystal] = 0;
                Totals[MaelstromTools.Statics.Power] = 0;
                Totals[MaelstromTools.Statics.Tiberium + "Max"] = 0;
                Totals[MaelstromTools.Statics.Power + "Max"] = 0;

                for (var cityName in this.Cache) {
                  var cityCache = this.Cache[cityName];
                  Totals[MaelstromTools.Statics.Tiberium] += cityCache[MaelstromTools.Statics.Tiberium];
                  Totals[MaelstromTools.Statics.Crystal] += cityCache[MaelstromTools.Statics.Crystal];
                  Totals[MaelstromTools.Statics.Power] += cityCache[MaelstromTools.Statics.Power];
                  Totals[MaelstromTools.Statics.Tiberium + "Max"] += cityCache[MaelstromTools.Statics.Tiberium + 'Max'];
                  Totals[MaelstromTools.Statics.Power + "Max"] += cityCache[MaelstromTools.Statics.Power + 'Max'];

                  colIdx = 1;

                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityName, 100, 'left');
                  if (first) {
                    MaelstromTools.Util.addLabel(this.Widget, 1, colIdx, 'Max. storage', 80, 'left');
                  }
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Tiberium + 'Max']), 80, 'right');

                  if (first) {
                    MaelstromTools.Util.addImage(this.Widget, 1, colIdx, MaelstromTools.Util.getImage(MaelstromTools.Statics.Tiberium));
                  }
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Tiberium]), 60, 'right', null, (cityCache[MaelstromTools.Statics.Tiberium] >= cityCache[MaelstromTools.Statics.Tiberium + 'Max'] ? "red" : (cityCache[MaelstromTools.Statics.Tiberium] >= (0.75 * cityCache[MaelstromTools.Statics.Tiberium + 'Max']) ? "yellow" : "white")));

                  if (cityCache[MaelstromTools.Statics.Tiberium] < cityCache[MaelstromTools.Statics.Tiberium + 'Max']) {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.GetDateTimeString(cityCache[MaelstromTools.Statics.Tiberium + 'Full']), 100, 'right', null, (cityCache[MaelstromTools.Statics.Tiberium] >= (0.75 * cityCache[MaelstromTools.Statics.Tiberium + 'Max']) ? "yellow" : "white"));
                  } else {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Storage full!", 100, 'right', null, "red");
                  }
                  if (first) {
                    MaelstromTools.Util.addImage(this.Widget, 1, colIdx, MaelstromTools.Util.getImage(MaelstromTools.Statics.Crystal));
                  }
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Crystal]), 60, 'right', null, (cityCache[MaelstromTools.Statics.Crystal] >= cityCache[MaelstromTools.Statics.Crystal + 'Max'] ? "red" : (cityCache[MaelstromTools.Statics.Crystal] >= (0.75 * cityCache[MaelstromTools.Statics.Crystal + 'Max']) ? "yellow" : "white")));

                  if (cityCache[MaelstromTools.Statics.Crystal] < cityCache[MaelstromTools.Statics.Crystal + 'Max']) {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.GetDateTimeString(cityCache[MaelstromTools.Statics.Crystal + 'Full']), 100, 'right', null, (cityCache[MaelstromTools.Statics.Crystal] >= (0.75 * cityCache[MaelstromTools.Statics.Crystal + 'Max']) ? "yellow" : "white"));
                  } else {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Storage full!", 100, 'right', null, "red");
                  }

                  if (first) {
                    MaelstromTools.Util.addImage(this.Widget, 1, colIdx, MaelstromTools.Util.getImage(MaelstromTools.Statics.Power));
                  }
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Power]), 60, 'right', null, (cityCache[MaelstromTools.Statics.Power] >= cityCache[MaelstromTools.Statics.Power + 'Max'] ? "red" : (cityCache[MaelstromTools.Statics.Power] >= (0.75 * cityCache[MaelstromTools.Statics.Power + 'Max']) ? "yellow" : "white")));

                  if (first) {
                    MaelstromTools.Util.addLabel(this.Widget, 1, colIdx, 'Storage', 80, 'left');
                  }
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Power + 'Max']), 80, 'right');

                  if (cityCache[MaelstromTools.Statics.Power] < cityCache[MaelstromTools.Statics.Power + 'Max']) {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.GetDateTimeString(cityCache[MaelstromTools.Statics.Power + 'Full']), 100, 'right', null, (cityCache[MaelstromTools.Statics.Power] >= (0.75 * cityCache[MaelstromTools.Statics.Power + 'Max']) ? "yellow" : "white"));
                  } else {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Storage full!", 100, 'right', null, "red");
                  }


                  MaelstromTools.Util.addElement(this.Widget, rowIdx, colIdx++, MaelstromTools.Util.getAccessBaseButton(cityName));
                  rowIdx++;
                  first = false;
                }

                colIdx = 1;
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Total resources", 100, 'left', 'bold');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Tiberium + 'Max']), 80, 'right', 'bold');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Tiberium]), 60, 'right', 'bold');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, Math.round(Totals[MaelstromTools.Statics.Tiberium] / Totals[MaelstromTools.Statics.Tiberium + 'Max'] * 100) + '%', 100, 'center', 'bold');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Crystal]), 60, 'right', 'bold');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, Math.round(Totals[MaelstromTools.Statics.Crystal] / Totals[MaelstromTools.Statics.Tiberium + 'Max'] * 100) + '%', 100, 'center', 'bold');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Power]), 60, 'right', 'bold');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Power + 'Max']), 80, 'right', 'bold');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, Math.round(Totals[MaelstromTools.Statics.Power] / Totals[MaelstromTools.Statics.Power + 'Max'] * 100) + '%', 100, 'center', 'bold');
              } catch (e) {
                console.log("MaelstromTools.ResourceOverview.setWidgetLabels: ", e);
              }
            }
          }
        });

        // define BaseStatus
        qx.Class.define("MaelstromTools.BaseStatus", {
          type: "singleton",
          extend: MaelstromTools.DefaultObject,
          members: {
            CityMenuButtons: null,

            //City.SetDedicatedSupport
            //City.RecallDedicatedSupport
            //City.get_SupportDedicatedBaseId
            //System.String get_SupportDedicatedBaseName ()
            updateCache: function () {
              try {
                MT_Cache.updateCityCache();
                this.Cache = Object();

                for (var cname in MT_Cache.Cities) {
                  var ncity = MT_Cache.Cities[cname].Object;
                  var player = ClientLib.Data.MainData.GetInstance().get_Player();
                  var supportData = ncity.get_SupportData();
                  //System.String get_PlayerName ()
                  this.Cache[cname] = Object();
                  // Movement lock
                  this.Cache[cname]["HasCooldown"] = ncity.get_hasCooldown();
                  this.Cache[cname]["CooldownEnd"] = Math.max(ncity.get_MoveCooldownEndStep(), ncity.get_MoveRestictionEndStep());
                  this.Cache[cname]["MoveCooldownEnd"] = ncity.get_MoveCooldownEndStep();
                  this.Cache[cname]["MoveLockdownEnd"] = ncity.get_MoveRestictionEndStep();
                  this.Cache[cname]["IsProtected"] = ncity.get_isProtected();
                  this.Cache[cname]["ProtectionEnd"] = ncity.get_ProtectionEndStep();
                  this.Cache[cname]["IsProtected"] = ncity.get_ProtectionEndStep();
                  this.Cache[cname]["IsAlerted"] = ncity.get_isAlerted();

                  // Supportweapon
                  if (supportData == null) {
                    this.Cache[cname]["HasSupportWeapon"] = false;
                  } else {
                    this.Cache[cname]["HasSupportWeapon"] = true;
                    if (ncity.get_SupportDedicatedBaseId() > 0) {
                      this.Cache[cname]["SupportedCityId"] = ncity.get_SupportDedicatedBaseId();
                      this.Cache[cname]["SupportedCityName"] = ncity.get_SupportDedicatedBaseName();
                      var coordId = ncity.get_SupportDedicatedBaseCoordId();
                      this.Cache[cname]["SupportedCityX"] = (coordId & 0xffff);
                      this.Cache[cname]["SupportedCityY"] = ((coordId >> 0x10) & 0xffff);
                      /*
                      var cityX = ncity.get_PosX();
                      var cityY = ncity.get_PosY();
                      
                      var mainData = ClientLib.Data.MainData.GetInstance();
                      var visRegion = ClientLib.Vis.VisMain.GetInstance().get_Region();

                      var gridW = visRegion.get_GridWidth();
                      var gridH = visRegion.get_GridHeight();
                      //console.log(cname);
                      //console.log("x: " + cityX + " y: " + cityY);

                      var worldObj = visRegion.GetObjectFromPosition((this.Cache[cname]["SupportedCityX"]*gridW), (this.Cache[cname]["SupportedCityY"]*gridH));
                      
                      //ClientLib.Vis.Region.RegionCity
                      if (worldObj == null) {
                        this.Cache[cname]["SupportTime"] = "";
                      } else {
                        console.log(cname);
                        //console.log(worldObj.CalibrationSupportDuration());
                        var weaponState = worldObj.get_SupportWeaponStatus();
                        
                        //console.log(this.calcDuration(ncity, worldObj));
                        var cities = ClientLib.Data.MainData.GetInstance().get_Cities();
                        cities.set_CurrentOwnCityId(ncity.get_Id());
                        var status = worldObj.get_SupportWeaponStatus();
                        var server = mainData.get_Server();
                        //console.log(worldObj.CalculateSupportCalibrationEndStep(worldObj.get_SupportData(), worldObj.get_SupportWeapon()));
                        console.log(status);
                        console.log(currStep);
                        this.Cache[cname]["SupportTime"] = mainData.get_Time().GetTimespanString(worldObj.CalculateSupportCalibrationEndStep(worldObj.get_SupportData(), worldObj.get_SupportWeapon()), currStep);
                        //status.Status&ClientLib.Vis.Region.ESupportWeaponStatus.Calibrating)==ClientLib.Vis.Region.ESupportWeaponStatus.Calibrating
                        var currStep = ClientLib.Data.MainData.GetInstance().get_Time().GetServerStep();
                        //this.Cache[cname]["SupportTime"] = webfrontend.Util.getTimespanString(ClientLib.Data.MainData.GetInstance().get_Time().GetTimeSpan(Math.max(0, status.CalibrationEndStep) - currStep), false);
                        //this.Cache[cname]["SupportTime"] = ClientLib.Data.MainData.GetInstance().get_Time().GetTimespanString(weaponState.CalibrationEndStep, currStep);
                        //this.Cache[cname]["SupportTime"] = webfrontend.Util.getTimespanString(ClientLib.Data.MainData.GetInstance().get_Time().GetTimeSpan(Math.max(0, worldObj.CalculateSupportCalibrationEndStep(worldObj.get_SupportData(), worldObj.get_SupportWeapon()) - currStep)), false);
                      //console.log(this.Cache[cname]["SupportTime"]);
                      }
                       */
                    } else { // prevent reference to undefined property ReferenceError
                      this.Cache[cname]["SupportedCityId"] = null;
                      this.Cache[cname]["SupportedCityName"] = null;
                      this.Cache[cname]["SupportedCityX"] = null;
                      this.Cache[cname]["SupportedCityY"] = null;
                    }
                    this.Cache[cname]["SupportRange"] = MaelstromTools.Wrapper.GetSupportWeaponRange(ncity.get_SupportWeapon());
                    var techName = ClientLib.Base.Tech.GetTechNameFromTechId(supportData.get_Type(), player.get_Faction());
                    this.Cache[cname]["SupportName"] = ClientLib.Base.Tech.GetProductionBuildingNameFromFaction(techName, player.get_Faction());
                    this.Cache[cname]["SupportLevel"] = supportData.get_Level();
                    //this.Cache[cname]["SupportBuilding"] = ncity.get_CityBuildingsData().GetUniqueBuildingByTechName(techName);
                    //console.log(this.Cache[cname]["SupportBuilding"]);
                  }
                }
              } catch (e) {
                console.log("MaelstromTools.BaseStatus.updateCache: ", e);
              }
            },
            /*
            calcDuration: function(currOwnCity, regionCity) {
              var targetCity = MaelstromTools.Wrapper.GetCity(regionCity.get_Id());
              
              var supportBase=regionCity.get_SupportData();
              if(supportBase == null)
              {
                return -1;
              }
              var weapon=regionCity.get_SupportWeapon();
              if(weapon == null)
              {
                return -1;
              }
              if(currOwnCity.get_Id() == regionCity.get_Id())
              {
                if(supportBase.get_Magnitude() == 0) {
                  return -1;
                }
                return 0;
              }
              var dx=(currOwnCity.get_X() - targetCity.get_PosX());
              var dy=(currOwnCity.get_Y() - targetCity.get_PosY());
              var distance=((dx * dx) + (dy * dy));
              return Math.floor((weapon.pt + (weapon.tpf * Math.floor((Math.sqrt(distance) + 0.5)))));
            },*/

            setWidgetLabels: function () {
              try {
                this.Widget.removeAll();
                var rowIdx = 1;
                var colIdx = 2;

                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Cooldown", 85, 'left');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Protection", 85, 'left');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Available weapon", 140, 'left');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Calibrated on", 140, 'left');

                //colIdx++;
                var rowIdxRecall = rowIdx;
                var colIdxRecall = 0;
                var supportWeaponCount = 0;

                rowIdx++;
                for (var cityName in this.Cache) {
                  var cityCache = this.Cache[cityName];
                  colIdx = 1;

                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityName, 100, 'left', null, (cityCache.IsAlerted ? 'red' : null));

                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.GetStepTime(cityCache.CooldownEnd), 70, 'right');
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.GetStepTime(cityCache.ProtectionEnd), 70, 'right');

                  if (!cityCache.HasSupportWeapon) {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "none", 140, 'left');
                    colIdx += 2;
                  } else {
                    supportWeaponCount++;
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.SupportName + " (" + cityCache.SupportLevel + ")", 140, 'left');

                    if (cityCache.SupportedCityId > 0) {
                      MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.SupportedCityName, 140, 'left');
                      colIdxRecall = colIdx;
                      MaelstromTools.Util.addElement(this.Widget, rowIdx, colIdx++, this.getRecallButton(cityName));
                    } else {
                      colIdx += 2;
                    }
                  }

                  MaelstromTools.Util.addElement(this.Widget, rowIdx, colIdx++, MaelstromTools.Util.getAccessBaseButton(cityName));
                  MaelstromTools.Util.addElement(this.Widget, rowIdx, colIdx++, MaelstromTools.Util.getFocusBaseButton(cityName));

                  rowIdx++;
                }

                if (supportWeaponCount > 0 && colIdxRecall > 0) {
                  MaelstromTools.Util.addElement(this.Widget, rowIdxRecall, colIdxRecall, this.getRecallAllButton());
                }
              } catch (e) {
                console.log("MaelstromTools.BaseStatus.setWidgetLabels: ", e);
              }
            },

            getRecallAllButton: function () {
              var button = new qx.ui.form.Button("Recall all").set({
                appearance: "button-text-small",
                toolTipText: "Recall all support weapons",
                width: 100,
                height: 20
              });
              button.addListener("execute", function (e) {
                MaelstromTools.Util.recallAllSupport();
              }, this);
              return button;
            },

            getRecallButton: function (cityName) {
              var button = new qx.ui.form.Button("Recall").set({
                appearance: "button-text-small",
                toolTipText: "Recall support to " + cityName,
                width: 100,
                height: 20
              });
              button.addListener("execute", function (e) {
                MaelstromTools.Util.recallSupport(cityName);
              }, this);
              return button;
            }
            /*
            getCalibrateAllOnSelectedBaseButton: function() {
              var button = new qx.ui.form.Button("Calibrate all weapons on selected base").set({
                appearance: "button-text-small",
                toolTipText: "Calibrate all weapons",
                width: 100,
                height: 20
              });
              button.addListener("execute", function(e){
                Util.calibrateWholeSupport(ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId());
              }, this);
              return button;
            }*/


          }
        });

        // define Statics
        qx.Class.define("MaelstromTools.Statics", {
          type: "static",
          statics: {
            Tiberium: 'Tiberium',
            Crystal: 'Crystal',
            Power: 'Power',
            Dollar: 'Dollar',
            Research: 'Research',
            Vehicle: "Vehicle",
            Aircraft: "Aircraft",
            Infantry: "Infantry",

            LootTypeName: function (ltype) {
              switch (ltype) {
                case ClientLib.Base.EResourceType.Tiberium:
                  return MaelstromTools.Statics.Tiberium;
                  break;
                case ClientLib.Base.EResourceType.Crystal:
                  return MaelstromTools.Statics.Crystal;
                  break;
                case ClientLib.Base.EResourceType.Power:
                  return MaelstromTools.Statics.Power;
                  break;
                case ClientLib.Base.EResourceType.Gold:
                  return MaelstromTools.Statics.Dollar;
                  break;
                default:
                  return "";
                  break;
              }
            }
          }
        });

        // define Util
        //ClientLib.Data.Cities.prototype.GetCityByCoord
        //ClientLib.Data.City.prototype.get_HasIncommingAttack
        qx.Class.define("MaelstromTools.Util", {
          type: "static",
          statics: {
            ArrayUnique: function (array) {
              var o = {};
              var l = array.length;
              r = [];
              for (var i = 0; i < l; i++) o[array[i]] = array[i];
              for (var i in o) r.push(o[i]);
              return r;
            },

            ArraySize: function (array) {
              var size = 0;
              for (var key in array)
              if (array.hasOwnProperty(key)) size++;
              return size;
            },

            addLabel: function (widget, rowIdx, colIdx, value, width, textAlign, font, color, colSpan) {
              try {
                var label = new qx.ui.basic.Label().set({
                  value: Lang.gt(value)
                });
                if (width) {
                  label.setWidth(width);
                }
                if (textAlign) {
                  label.setTextAlign(textAlign);
                }
                if (color) {
                  label.setTextColor(color);
                }
                if (font) {
                  label.setFont(font);
                }
                if (!colSpan || colSpan == 0) {
                  colSpan = 1;
                }

                widget.add(label, {
                  row: rowIdx,
                  column: colIdx,
                  colSpan: colSpan
                });
              } catch (e) {
                console.log("MaelstromTools.Util.addLabel: ", e);
              }
            },

            addElement: function (widget, rowIdx, colIdx, element, colSpan) {
              try {
                if (!colSpan || colSpan == 0) {
                  colSpan = 1;
                }
                widget.add(element, {
                  row: rowIdx,
                  column: colIdx,
                  colSpan: colSpan
                });
              } catch (e) {
                console.log("MaelstromTools.Util.addElement: ", e);
              }
            },

            addImage: function (widget, rowIdx, colIdx, image) {
              try {
                widget.add(image, {
                  row: rowIdx,
                  column: colIdx
                });
              } catch (e) {
                console.log("MaelstromTools.Util.addImage: ", e);
              }
            },

            getImage: function (name) {
              var image = new qx.ui.basic.Image(MT_Base.images[name]);
              image.setScale(true);
              image.setWidth(20);
              image.setHeight(20);
              return image;
            },

            getAccessBaseButton: function (cityName, viewMode) {
              try {
                var cityButton = new qx.ui.form.Button(null, MT_Base.images["AccessBase"]).set({
                  appearance: "button-detailview-small",
                  toolTipText: Lang.gt("Access") + " " + cityName,
                  width: 20,
                  height: 20,
                  marginLeft: 5
                });
                cityButton.setUserData("cityId", MT_Cache.Cities[cityName].ID);
                cityButton.setUserData("viewMode", viewMode);
                cityButton.addListener("execute", function (e) {
                  MaelstromTools.Util.accessBase(e.getTarget().getUserData("cityId"), e.getTarget().getUserData("viewMode"));
                }, this);
                return cityButton;
              } catch (e) {
                console.log("MaelstromTools.Util.getAccessBaseButton: ", e);
              }
            },

            getFocusBaseButton: function (cityName) {
              try {
                var cityButton = new qx.ui.form.Button(null, MT_Base.images["FocusBase"]).set({
                  appearance: "button-detailview-small",
                  toolTipText: Lang.gt("Focus on") + " " + cityName,
                  width: 20,
                  height: 20,
                  marginLeft: 5
                });
                cityButton.setUserData("cityId", MT_Cache.Cities[cityName].ID);
                cityButton.addListener("execute", function (e) {
                  MaelstromTools.Util.focusBase(e.getTarget().getUserData("cityId"));
                }, this);
                return cityButton;
              } catch (e) {
                console.log("MaelstromTools.Util.getFocusBaseButton: ", e);
              }
            },

            accessBase: function (cityId, viewMode) {
              try {
                if (cityId > 0) {
                  var ncity = MaelstromTools.Wrapper.GetCity(cityId);

                  if (ncity != null && !ncity.get_IsGhostMode()) {
                    if (viewMode) {
                      webfrontend.gui.UtilView.openVisModeInMainWindow(viewMode, cityId, false);
                    } else {
                      webfrontend.gui.UtilView.openCityInMainWindow(cityId);
                    }
                  }
                }
              } catch (e) {
                console.log("MaelstromTools.Util.accessBase: ", e);
              }
            },
            focusBase: function (cityId) {
              try {
                if (cityId > 0) {
                  var ncity = MaelstromTools.Wrapper.GetCity(cityId);

                  if (ncity != null && !ncity.get_IsGhostMode()) {
                    webfrontend.gui.UtilView.centerCityOnRegionViewWindow(cityId);
                  }
                }
              } catch (e) {
                console.log("MaelstromTools.Util.focusBase: ", e);
              }
            },

            recallSupport: function (cityName) {
              try {
                var ncity = MT_Cache.Cities[cityName]["Object"];
                ncity.RecallDedicatedSupport();
              } catch (e) {
                console.log("MaelstromTools.Util.recallSupport: ", e);
              }
            },

            recallAllSupport: function () {
              try {
                MT_Cache.updateCityCache();
                for (var cityName in MT_Cache.Cities) {
                  var ncity = MT_Cache.Cities[cityName]["Object"];
                  ncity.RecallDedicatedSupport();
                }
              } catch (e) {
                console.log("MaelstromTools.Util.recallAllSupport: ", e);
              }
            },

            checkIfSupportIsAllowed: function (selectedBase) {
              try {
                if (selectedBase.get_VisObjectType() != ClientLib.Vis.VisObject.EObjectType.RegionCityType) {
                  return false;
                }
                if (selectedBase.get_Type() != ClientLib.Vis.Region.RegionCity.ERegionCityType.Own && selectedBase.get_Type() != ClientLib.Vis.Region.RegionCity.ERegionCityType.Alliance) {
                  return false;
                }
                return true;
              } catch (e) {
                console.log("MaelstromTools.Util.checkIfSupportIsAllowed: ", e);
                return false;
              }
            },

            calibrateWholeSupportOnSelectedBase: function () {
              if (this.checkIfSupportIsAllowed(MT_Cache.SelectedBaseForMenu)) {
                this.calibrateWholeSupport(MT_Cache.SelectedBaseForMenu);
              }
            },

            calibrateWholeSupport: function (targetRegionCity) {
              try {
                MT_Cache.updateCityCache();
                for (var cityName in MT_Cache.Cities) {
                  var ncity = MT_Cache.Cities[cityName]["Object"];
                  //var targetCity = MaelstromTools.Wrapper.GetCity(targetCityId);
                  var weapon = ncity.get_SupportWeapon();

                  //console.log("checking support weapon for " + ncity.get_Name() + " calibrating on " + targetRegionCity.get_Name());

                  if (targetRegionCity != null && weapon != null) {
                    //console.log("city at " + ncity.get_X() + " / " + ncity.get_Y());
                    //console.log("targetRegionCity at " + targetRegionCity.get_RawX() + " / " + targetRegionCity.get_RawY());
                    //var distance = ClientLib.Base.Util.CalculateDistance(ncity.get_X(), ncity.get_Y(), targetRegionCity.get_RawX(), targetRegionCity.get_RawY());
                    var dx = (ncity.get_X() - targetRegionCity.get_RawX());
                    var dy = (ncity.get_Y() - targetRegionCity.get_RawY());
                    var distance = ((dx * dx) + (dy * dy));
                    var range = MaelstromTools.Wrapper.GetSupportWeaponRange(weapon);
                    //console.log("distance is " + distance);
                    //console.log("range isy " + range*range);
                    if (distance <= (range * range)) {
                      ncity.SetDedicatedSupport(targetRegionCity.get_Id());
                    }
                  }
                }
              } catch (e) {
                console.log("MaelstromTools.Util.calibrateWholeSupport: ", e);
              }
            },

            // visCity : ClientLib.Vis.Region.RegionObject
            getResources: function (visCity) { // to verifier against PerforceChangelist>=376877
              try {
                var loot = new Object();
                if (visCity.get_X() < 0 || visCity.get_Y() < 0) {
                  loot["LoadState"] = 0;
                  return loot;
                }
                var currentOwnCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();

                var distance = ClientLib.Base.Util.CalculateDistance(currentOwnCity.get_X(), currentOwnCity.get_Y(), visCity.get_RawX(), visCity.get_RawY());
                var maxAttackDistance = ClientLib.Data.MainData.GetInstance().get_Server().get_MaxAttackDistance();
                if (distance > maxAttackDistance) {
                  loot["LoadState"] = -1;
                  return loot;
                }

                var ncity = MaelstromTools.Wrapper.GetCity(visCity.get_Id());
                /* ClientLib.Data.CityBuildings */
                //var cityBuildings = ncity.get_CityBuildingsData();
                var cityUnits = ncity.get_CityUnitsData();

                //var buildings = MaelstromTools.Wrapper.GetBuildings(cityBuildings);
                var buildings = ncity.get_Buildings().d;
                var defenseUnits = MaelstromTools.Wrapper.GetDefenseUnits(cityUnits);
                //var defenseUnits = MaelstromTools.Wrapper.GetDefenseUnits();

                /*for(var u in buildings) {
              console.log(buildings[u].get_MdbBuildingId());
              console.log("----------------");
            }*/

                var buildingLoot = MaelstromTools.Util.getResourcesPart(buildings);
                //var buildingLoot2 = MaelstromTools.Util.getResourcesPart(this.collectBuildings(ncity));

                var unitLoot = MaelstromTools.Util.getResourcesPart(defenseUnits);

                loot[MaelstromTools.Statics.Tiberium] = buildingLoot[ClientLib.Base.EResourceType.Tiberium] + unitLoot[ClientLib.Base.EResourceType.Tiberium];
                loot[MaelstromTools.Statics.Crystal] = buildingLoot[ClientLib.Base.EResourceType.Crystal] + unitLoot[ClientLib.Base.EResourceType.Crystal];
                loot[MaelstromTools.Statics.Dollar] = buildingLoot[ClientLib.Base.EResourceType.Gold] + unitLoot[ClientLib.Base.EResourceType.Gold];
                loot[MaelstromTools.Statics.Research] = buildingLoot[ClientLib.Base.EResourceType.ResearchPoints] + unitLoot[ClientLib.Base.EResourceType.ResearchPoints];
                loot["Factor"] = loot[MaelstromTools.Statics.Tiberium] + loot[MaelstromTools.Statics.Crystal] + loot[MaelstromTools.Statics.Dollar] + loot[MaelstromTools.Statics.Research];
                loot["CPNeeded"] = currentOwnCity.CalculateAttackCommandPointCostToCoord(ncity.get_X(), ncity.get_Y());
                loot["LoadState"] = (loot["Factor"] > 0 ? 1 : 0);
                loot["Total"] = loot[MaelstromTools.Statics.Research] + loot[MaelstromTools.Statics.Tiberium] + loot[MaelstromTools.Statics.Crystal] + loot[MaelstromTools.Statics.Dollar];

                /*console.log("Building loot");
                console.log( buildingLoot[ClientLib.Base.EResourceType.Tiberium] + " vs " +  buildingLoot2[ClientLib.Base.EResourceType.Tiberium]);
                console.log( buildingLoot[ClientLib.Base.EResourceType.Crystal] + " vs " +  buildingLoot2[ClientLib.Base.EResourceType.Crystal]);
                console.log( buildingLoot[ClientLib.Base.EResourceType.Gold] + " vs " +  buildingLoot2[ClientLib.Base.EResourceType.Gold]);
                console.log( buildingLoot[ClientLib.Base.EResourceType.ResearchPoints] + " vs " +  buildingLoot2[ClientLib.Base.EResourceType.ResearchPoints]);
                console.log("-------------");*/
                return loot;
              } catch (e) {
                console.log("MaelstromTools.Util.getResources", e);
              }
            },
            /*
            collectBuildings: function(ncity) {
              var cityBuildings = ncity.get_CityBuildingsData();
              var buildings = new Array();
              var count = 0;
              // ncity.GetNumBuildings()
              for(var i = 0; i < 100000; i++) {
                var building = cityBuildings.GetBuildingByMDBId(i);
                if(!building) {
                  continue;
                }
                
                //console.log(building.get_TechName() + " - " + ncity.get_CityFaction() + " - " + ClientLib.Base.Tech.GetTechIdFromTechNameAndFaction(building.get_TechName(), ncity.get_CityFaction()) + " at lvl " + building.get_CurrentLevel());
                buildings.push(building);
              //buildings[count++] = building;
              }
              return buildings; //MaelstromTools.Util.ArrayUnique(buildings);
            },*/

            getResourcesPart: function (cityEntities) {
              try {
                var loot = [0, 0, 0, 0, 0, 0, 0, 0];
                if (cityEntities == null) {
                  return loot;
                }

                var objcityEntities = [];
                if (PerforceChangelist >= 376877) { //new
                  for (var o in cityEntities) objcityEntities.push(cityEntities[o]);
                } else { //old
                  for (var i = 0; i < cityEntities.length; i++) objcityEntities.push(cityEntities[i]);
                }

                for (var i = 0; i < objcityEntities.length; i++) {
                  var cityEntity = objcityEntities[i];
                  var unitLevelRequirements = MaelstromTools.Wrapper.GetUnitLevelRequirements(cityEntity);

                  for (var x = 0; x < unitLevelRequirements.length; x++) {
                    loot[unitLevelRequirements[x].Type] += unitLevelRequirements[x].Count * cityEntity.get_HitpointsPercent();
                    if (cityEntity.get_HitpointsPercent() < 1.0) {
                      // destroyed

                    }
                  }
                }

                return loot;
              } catch (e) {
                console.log("MaelstromTools.Util.getResourcesPart", e);
              }
            }

            /*
            findBuildings: function(city) {
              for (var k in city) {
                if ((typeof(city[k]) == "object") && city[k] && city[k] && 0 in city[k]) {
                  if ((typeof(city[k][0]) == "object")  && city[k][0] && "BuildingDBId" in city[k][0]) {
                    return city[k];
                  }
                }
              }
              return [];
            }*/
          }
        });

        // define Wrapper
        qx.Class.define("MaelstromTools.Wrapper", {
          type: "static",
          statics: {
            GetStepTime: function (step, defaultString) {
              if (!defaultString) {
                defaultString = "";
              }
              var endTime = ClientLib.Data.MainData.GetInstance().get_Time().GetTimespanString(step, ClientLib.Data.MainData.GetInstance().get_Time().GetServerStep());
              if (endTime == "00:00") {
                return defaultString;
              }
              return endTime;
            },

            FormatNumbersCompact: function (value) {
              if (PerforceChangelist >= 387751) { //new
                return phe.cnc.gui.util.Numbers.formatNumbersCompact(value);
              } else { //old
                return webfrontend.gui.Util.formatNumbersCompact(value);
              }
            },

            GetDateTimeString: function (value) {
                return phe.cnc.Util.getDateTimeString(value);
            },

            FormatTimespan: function (value) {
              return ClientLib.Vis.VisMain.FormatTimespan(value);
            },

            GetSupportWeaponRange: function (weapon) {
              return weapon.r;
            },

            GetCity: function (cityId) {
              return ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(cityId);
            },

            RepairAll: function (ncity, visMode) {
              var oldMode = ClientLib.Vis.VisMain.GetInstance().get_Mode();
              ClientLib.Vis.VisMain.GetInstance().set_Mode(visMode);
              ncity.RepairAll();
              ClientLib.Vis.VisMain.GetInstance().set_Mode(oldMode);
            },

            CanRepairAll: function (ncity, viewMode) {
              try {
                /*var oldMode = ClientLib.Vis.VisMain.GetInstance().get_Mode();
                ClientLib.Vis.VisMain.GetInstance().set_Mode(visMode);
                var retVal = ncity.CanRepairAll();
                ClientLib.Vis.VisMain.GetInstance().set_Mode(oldMode);
                return retVal;*/

                var repairData = ncity.get_CityRepairData();
                var myRepair = repairData.CanRepair(0, viewMode);
                repairData.UpdateCachedFullRepairAllCost(viewMode);
                return ((myRepair != null) && (!ncity.get_IsLocked() || (viewMode != ClientLib.Vis.Mode.ArmySetup)));

                return false;
              } catch (e) {
                console.log("MaelstromTools.Wrapper.CanRepairAll: ", e);
                return false;
              }
            },
            /*GetBuildings: function (cityBuildings) {
              if (PerforceChangelist >= 376877) { //new
                return (cityBuildings.get_Buildings() != null ? cityBuildings.get_Buildings().d : null);
              } else { //old
                return (cityBuildings.get_Buildings() != null ? cityBuildings.get_Buildings().l : null);
              }
            },*/
            GetDefenseUnits: function (cityUnits) {
            //GetDefenseUnits: function () {
              if (PerforceChangelist >= 392583) { //endgame patch
                return (cityUnits.get_DefenseUnits() != null ? cityUnits.get_DefenseUnits().d : null);
              } else { //old
                var defenseObjects = [];
                for (var x = 0; x < 9; x++) {
                  for (var y = 0; y < 8; y++) {
                    var defenseObject = ClientLib.Vis.VisMain.GetInstance().get_DefenseSetup().GetDefenseObjectFromPosition((x * ClientLib.Vis.VisMain.GetInstance().get_City().get_GridWidth()),(y * ClientLib.Vis.VisMain.GetInstance().get_City().get_GridHeight()));
                    if (defenseObject !== null && defenseObject.get_CityEntity() !== null) {
                      defenseObjects.push(defenseObject.get_UnitDetails());
                    }
                  }
                }
                return defenseObjects;
              }
            },
            GetUnitLevelRequirements: function (cityEntity) {
              if (PerforceChangelist >= 376877) { //new
                return (cityEntity.get_UnitLevelRepairRequirements() != null ? cityEntity.get_UnitLevelRepairRequirements() : null);
              } else { //old
                return (cityEntity.get_UnitLevelRequirements() != null ? cityEntity.get_UnitLevelRequirements() : null);
              }
            },

            GetBaseLevel: function (ncity) {
              return (Math.floor(ncity.get_LvlBase() * 100) / 100).toFixed(2);
            }
            /*,
            
            GetPointsByLevelWithThresholds: function (_levelThresholds,_levelFactors,_iLevel) {
              var result=0;
              var lastLevel=_iLevel;
              if(_levelThresholds.length != _levelFactors.length) {
                return 0;
              }
              for (var i=(_levelThresholds.length - 1); (i >= 0); i--) {
                var threshold=(_levelThresholds[i] - 1);
                if(lastLevel >= threshold) {
                  result += ((lastLevel - threshold) * _levelFactors[i]);
                  lastLevel=threshold;
                }
              }
              return result;
            },
            GetArmyPoints: function(_iLevel) {
              var server = ClientLib.Data.MainData.GetInstance().get_Server();
              var m_iArmyPointsPerLevelThresholds = server.get_ArmyPointsPerLevelThresholds();
              var m_fArmyPointsPerLevel = server.get_ArmyPointsPerLevel();
              _iLevel += 4;
              var armyPoints = MaelstromTools.Wrapper.GetPointsByLevelWithThresholds(m_iArmyPointsPerLevelThresholds, m_fArmyPointsPerLevel, _iLevel);
              return Math.min(armyPoints, server.get_MaxArmyPoints());
            },
            
            GetBuilding: function(ncity, techName) {
              return ncity.get_CityBuildingsData().GetUniqueBuildingByTechName(techName)
            },
            
            GetCommandCenter: function(ncity) {
              //var techName = ClientLib.Base.Tech.GetTechIdFromTechNameAndFaction(ClientLib.Base.ETechName.Command_Center, ClientLib.Data.MainData.GetInstance().get_Player().get_Faction());

              return MaelstromTools.Wrapper.GetBuilding(ncity, ClientLib.Base.ETechName.Command_Center);
            // conyard return this.GetBuildingCondition$0(ClientLib.Base.Tech.GetTechIdFromTechNameAndFaction$0(0, ClientLib.Data.MainData.GetInstance$9().get_Player$2().get_Faction$2()));
            // ClientLib.Data.City.prototype.GetOffenseConditionInPercent=ClientLib.Data.City.prototype.GetOffenseConditionInPercent$0;
            }*/
          }
        });

        // define LocalStorage
        qx.Class.define("MaelstromTools.LocalStorage", {
          type: "static",
          statics: {
            isSupported: function () {
              return typeof (Storage) !== "undefined";
            },
            set: function (key, value) {
              try {
                if (MaelstromTools.LocalStorage.isSupported()) {
                  localStorage["CCTA_MaelstromTools_" + key] = JSON.stringify(value);
                }
              } catch (e) {
                console.log("MaelstromTools.LocalStorage.set: ", e);
              }
            },
            get: function (key, defaultValueIfNotSet) {
              try {
                if (MaelstromTools.LocalStorage.isSupported()) {
                  if (localStorage["CCTA_MaelstromTools_" + key] != null && localStorage["CCTA_MaelstromTools_" + key] != 'undefined') {
                    return JSON.parse(localStorage["CCTA_MaelstromTools_" + key]);
                  }
                }
              } catch (e) {
                console.log("MaelstromTools.LocalStorage.get: ", e);
              }
              return defaultValueIfNotSet;
            },
            clearAll: function () {
              try {
                if (!MaelstromTools.LocalStorage.isSupported()) {
                  return;
                }
                for (var key in localStorage) {
                  if (key.indexOf("CCTA_MaelstromTools_") == 0) {
                    localStorage.removeItem(key);
                  }
                }
              } catch (e) {
                console.log("MaelstromTools.LocalStorage.clearAll: ", e);
              }
            }
          }
        });

        // define Cache
        qx.Class.define("MaelstromTools.Cache", {
          type: "singleton",
          extend: qx.core.Object,
          members: {
            CityCount: 0,
            Cities: null,
            SelectedBaseForMenu: null,
            SelectedBaseResources: null,
            SelectedBaseForLoot: null,

            updateCityCache: function () {
              try {
                this.CityCount = 0;
                this.Cities = Object();

                var cities = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities();
                for (var cindex in cities.d) {
                  this.CityCount++;
                  var ncity = MaelstromTools.Wrapper.GetCity(cindex);
                  var ncityName = ncity.get_Name();
                  this.Cities[ncityName] = Object();
                  this.Cities[ncityName]["ID"] = cindex;
                  this.Cities[ncityName]["Object"] = ncity;
                }
              } catch (e) {
                console.log("MaelstromTools.Cache.updateCityCache: ", e);
              }
            },

            updateLoot: function (visCity) {
              var cityId = visCity.get_Id();

              if (this.SelectedBaseForLoot != null && cityId == this.SelectedBaseForLoot.get_Id() && this.SelectedBaseResources != null && this.SelectedBaseResources["LoadState"] > 0) {
                return -2;
              }
              this.SelectedBaseForLoot = visCity;
              this.SelectedBaseResources = MaelstromTools.Util.getResources(visCity);
              return this.SelectedBaseResources["LoadState"];
            }
          }
        });

        // define HuffyTools.ImageRender
        qx.Class.define("HuffyTools.ImageRender", {
          extend: qx.ui.table.cellrenderer.AbstractImage,
          construct: function (width, height) {
            this.base(arguments);
            if (width) {
              this.__imageWidth = width;
            }
            if (height) {
              this.__imageHeight = height;
            }
            this.__am = qx.util.AliasManager.getInstance();
          },
          members: {
            __am: null,
            __imageHeight: 16,
            __imageWidth: 16,
            // overridden
            _identifyImage: function (cellInfo) {
              var imageHints = {
                imageWidth: this.__imageWidth,
                imageHeight: this.__imageHeight
              };
              if (cellInfo.value == "") {
                imageHints.url = null;
              } else {
                imageHints.url = this.__am.resolve(cellInfo.value);
              }
              imageHints.tooltip = cellInfo.tooltip;
              return imageHints;
            }
          },
          destruct: function () {
            this.__am = null;
          }
        });

        // define HuffyTools.ReplaceRender
        qx.Class.define("HuffyTools.ReplaceRender", {
          extend: qx.ui.table.cellrenderer.Default,
          properties: {
            replaceFunction: {
              check: "Function",
              nullable: true,
              init: null
            }
          },
          members: {
            // overridden
            _getContentHtml: function (cellInfo) {
              var value = cellInfo.value;
              var replaceFunc = this.getReplaceFunction();
              // use function
              if (replaceFunc) {
                cellInfo.value = replaceFunc(value);
              }
              return qx.bom.String.escape(this._formatValue(cellInfo));
            }
          }
        });

        qx.Class.define("HuffyTools.CityCheckBox", {
          extend: qx.ui.form.CheckBox,
          members: {
            HT_CityID: null
          }
        });

        // define HuffyTools.UpgradePriorityGUI
        qx.Class.define("HuffyTools.UpgradePriorityGUI", {
          type: "singleton",
          extend: MaelstromTools.DefaultObject,
          members: {
            HT_TabView: null,
            HT_Options: null,
            HT_ShowOnlyTopBuildings: null,
            HT_ShowOnlyAffordableBuildings: null,
            HT_CityBuildings: null,
            HT_Pages: null,
            HT_Tables: null,
            HT_Models: null,
            HT_SelectedResourceType: null,
            BuildingList: null,
            upgradeInProgress: null,
            init: function () {
              /*
              Done:
              - Added cost per gain to the lists
              - Added building coordinates to the lists
              - Only display the top affordable and not affordable building
              - Persistent filter by city, top and affordable per resource type
              - Reload onTabChange for speed optimization
              - Estimated time until upgrade is affordable
              
              ToDo:
              - let the user decide to sort by colums he like i.e. timefactor or cost/gain and save it in the configuration
              - integrate buttons to transfer resources ?

               */
              try {
                this.HT_SelectedResourceType = -1;
                this.IsTimerEnabled = false;
                this.upgradeInProgress = false;

                this.HT_TabView = new qx.ui.tabview.TabView();
                this.HT_TabView.set({
                  contentPadding: 0,
                  appearance: "tabview",
                  margin: 5,
                  barPosition: 'left'
                });
                this.Widget = new qx.ui.tabview.Page("UpgradePriority");
                this.Widget.setPadding(0);
                this.Widget.setMargin(0);
                this.Widget.setBackgroundColor("#BEC8CF");
                this.Widget.setLayout(new qx.ui.layout.VBox(2));
                //this.Widget.add(this.HT_Options);
                this.Widget.add(this.HT_TabView, {
                  flex: 1
                });
                this.Window.setPadding(0);
                this.Window.set({
                  resizable: true
                });

                this.Window.removeAll();
                this.Window.add(this.Widget);

                this.BuildingList = new Array;
                this.HT_Models = new Array;
                this.HT_Tables = new Array;
                this.HT_Pages = new Array;

                this.createTabPage(ClientLib.Base.EResourceType.Tiberium);
                this.createTable(ClientLib.Base.EResourceType.Tiberium);
                this.HT_Tables[ClientLib.Base.EResourceType.Tiberium].addListener("cellClick", function (e) {
                  this.upgradeBuilding(e, ClientLib.Base.EResourceType.Tiberium);
                }, this);


                this.createTabPage(ClientLib.Base.EResourceType.Crystal);
                this.createTable(ClientLib.Base.EResourceType.Crystal);
                this.HT_Tables[ClientLib.Base.EResourceType.Crystal].addListener("cellClick", function (e) {
                  this.upgradeBuilding(e, ClientLib.Base.EResourceType.Crystal);
                }, this);

                this.createTabPage(ClientLib.Base.EResourceType.Power);
                this.createTable(ClientLib.Base.EResourceType.Power);
                this.HT_Tables[ClientLib.Base.EResourceType.Power].addListener("cellClick", function (e) {
                  this.upgradeBuilding(e, ClientLib.Base.EResourceType.Power);
                }, this);

                this.createTabPage(ClientLib.Base.EResourceType.Gold);
                this.createTable(ClientLib.Base.EResourceType.Gold);
                this.HT_Tables[ClientLib.Base.EResourceType.Gold].addListener("cellClick", function (e) {
                  this.upgradeBuilding(e, ClientLib.Base.EResourceType.Gold);
                }, this);


                MT_Cache.updateCityCache();
                this.HT_Options = new Array();
                this.HT_ShowOnlyTopBuildings = new Array();
                this.HT_ShowOnlyAffordableBuildings = new Array();
                this.HT_CityBuildings = new Array();
                for (var mPage in this.HT_Pages) {
                  this.createOptions(mPage);
                  this.HT_Pages[mPage].add(this.HT_Options[mPage]);
                  this.HT_Pages[mPage].add(this.HT_Tables[mPage], {
                    flex: 1
                  });
                  this.HT_TabView.add(this.HT_Pages[mPage]);
                }

                // Zeigen wir Dollars an !
                this.HT_TabView.setSelection([this.HT_TabView.getChildren()[2]]);
                this.HT_SelectedResourceType = ClientLib.Base.EResourceType.Gold;
              } catch (e) {
                console.log("HuffyTools.UpgradePriority.init: ", e);
              }
            },
            createOptions: function (eType) {
              var oBox = new qx.ui.layout.Flow();
              var oOptions = new qx.ui.container.Composite(oBox);
              oOptions.setMargin(5);
              this.HT_ShowOnlyTopBuildings[eType] = new qx.ui.form.CheckBox(Lang.gt("display only top buildings"));
              this.HT_ShowOnlyTopBuildings[eType].setMargin(5);
              this.HT_ShowOnlyTopBuildings[eType].setValue(MaelstromTools.LocalStorage.get("UGL_TOPBUILDINGS_" + eType, true));
              this.HT_ShowOnlyTopBuildings[eType].addListener("execute", this.CBChanged, this);
              oOptions.add(this.HT_ShowOnlyTopBuildings[eType], {
                left: 10,
                top: 10
              });
              this.HT_ShowOnlyAffordableBuildings[eType] = new qx.ui.form.CheckBox(Lang.gt("display only affordable buildings"));
              this.HT_ShowOnlyAffordableBuildings[eType].setMargin(5);
              this.HT_ShowOnlyAffordableBuildings[eType].setValue(MaelstromTools.LocalStorage.get("UGL_AFFORDABLE_" + eType, true));
              this.HT_ShowOnlyAffordableBuildings[eType].addListener("execute", this.CBChanged, this);
              oOptions.add(this.HT_ShowOnlyAffordableBuildings[eType], {
                left: 10,
                top: 10,
                lineBreak: true
              });
              this.HT_CityBuildings[eType] = new Array();
              for (var cname in MT_Cache.Cities) {
                var oCity = MT_Cache.Cities[cname].Object;
                var oCityBuildings = new HuffyTools.CityCheckBox(cname);
                oCityBuildings.HT_CityID = oCity.get_Id();
                oCityBuildings.setMargin(5);
                oCityBuildings.setValue(MaelstromTools.LocalStorage.get("UGL_CITYFILTER_" + eType + "_" + oCity.get_Id(), true));
                oCityBuildings.addListener("execute", this.CBChanged, this);
                oOptions.add(oCityBuildings, {
                  left: 10,
                  top: 10
                });
                this.HT_CityBuildings[eType][cname] = oCityBuildings;
              }
              this.HT_Options[eType] = oOptions;
            },
            createTable: function (eType) {
              try {
                this.HT_Models[eType] = new qx.ui.table.model.Simple();
                this.HT_Models[eType].setColumns(["ID", Lang.gt("City"), Lang.gt("Type (coord)"), Lang.gt("to Level"), Lang.gt("Gain/h"), Lang.gt("Factor"), Lang.gt("Tiberium"), Lang.gt("Power"), Lang.gt("Tib/gain"), Lang.gt("Pow/gain"), Lang.gt("ETA"), Lang.gt("Upgrade"), "State"]);
                this.HT_Tables[eType] = new qx.ui.table.Table(this.HT_Models[eType]);
                this.HT_Tables[eType].setColumnVisibilityButtonVisible(false);
                this.HT_Tables[eType].setColumnWidth(0, 0);
                this.HT_Tables[eType].setColumnWidth(1, 90);
                this.HT_Tables[eType].setColumnWidth(2, 120);
                this.HT_Tables[eType].setColumnWidth(3, 55);
                this.HT_Tables[eType].setColumnWidth(4, 70);
                this.HT_Tables[eType].setColumnWidth(5, 60);
                this.HT_Tables[eType].setColumnWidth(6, 70);
                this.HT_Tables[eType].setColumnWidth(7, 70);
                this.HT_Tables[eType].setColumnWidth(8, 70);
                this.HT_Tables[eType].setColumnWidth(9, 70);
                this.HT_Tables[eType].setColumnWidth(10, 70);
                this.HT_Tables[eType].setColumnWidth(11, 40);
                this.HT_Tables[eType].setColumnWidth(12, 0);
                var tcm = this.HT_Tables[eType].getTableColumnModel();
                tcm.setColumnVisible(0, false);
                tcm.setColumnVisible(12, false);
                tcm.setDataCellRenderer(4, new qx.ui.table.cellrenderer.Number().set({
                  numberFormat: new qx.util.format.NumberFormat().set({
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2
                  })
                }));
                tcm.setDataCellRenderer(5, new qx.ui.table.cellrenderer.Number().set({
                  numberFormat: new qx.util.format.NumberFormat().set({
                    maximumFractionDigits: 5,
                    minimumFractionDigits: 5
                  })
                }));
                tcm.setDataCellRenderer(6, new HuffyTools.ReplaceRender().set({
                  ReplaceFunction: this.formatTiberiumAndPower
                }));
                tcm.setDataCellRenderer(7, new HuffyTools.ReplaceRender().set({
                  ReplaceFunction: this.formatTiberiumAndPower
                }));
                tcm.setDataCellRenderer(11, new HuffyTools.ImageRender(40, 20));
              } catch (e) {
                console.log("HuffyTools.UpgradePriority.createTable: ", e);
              }
            },
            createTabPage: function (resource_type) {
              try {
                var sName = MaelstromTools.Statics.LootTypeName(resource_type);
                var oRes = new qx.ui.tabview.Page(Lang.gt(sName), MT_Base.images[sName]);
                oRes.setLayout(new qx.ui.layout.VBox(2));
                oRes.setPadding(5);
                var btnTab = oRes.getChildControl("button");
                btnTab.resetWidth();
                btnTab.resetHeight();
                btnTab.set({
                  show: "icon",
                  margin: 0,
                  padding: 0,
                  toolTipText: sName
                });
                btnTab.addListener("execute", this.TabChanged, [this, resource_type]);
                this.HT_Pages[resource_type] = oRes;
                return oRes;
              } catch (e) {
                console.log("HuffyTools.UpgradePriority.createTabPage: ", e);
              }
            },

            TabChanged: function (e) {
              try {
                this[0].HT_SelectedResourceType = this[1];
                this[0].UpgradeCompleted(null, null);
              } catch (e) {
                console.log("HuffyTools.UpgradePriority.TabChanged: ", e);
              }
            },

            upgradeBuilding: function (e, eResourceType) {
              if (this.upgradeInProgress == true) {
                console.log("upgradeBuilding:", "upgrade in progress !");
                return;
              }
              try {
                if (e.getColumn() == 11) {
                  var buildingID = this.HT_Models[eResourceType].getValue(0, e.getRow());
                  var iState = parseInt(this.HT_Models[eResourceType].getValue(12, e.getRow()));
                  if (iState != 1) {
                    return;
                  }
                  if (buildingID in this.BuildingList) {
                    this.upgradeInProgress = true;
                    if (PerforceChangelist >= 382917) { //new
                      ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", this.BuildingList[buildingID], phe.cnc.Util.createEventDelegate(ClientLib.Net.CommandResult, this, this.UpgradeCompleted), null, true);
                    } else { //old
                      ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", this.BuildingList[buildingID], webfrontend.Util.createEventDelegate(ClientLib.Net.CommandResult, this, this.UpgradeCompleted), null, true);
                    }
                  }
                }
              } catch (e) {
                console.log("HuffyTools.UpgradePriority.upgradeBuilding: ", e);
              }
            },
            UpgradeCompleted: function (context, result) {
              var self = this;
              window.setTimeout(function () {
                self.calc();
              }, 1000);
              this.upgradeInProgress = false;
            },
            CBChanged: function (e) {
              this.UpgradeCompleted(null, null);
            },
            formatTiberiumAndPower: function (oValue) {
              if (PerforceChangelist >= 387751) { //new
                return phe.cnc.gui.util.Numbers.formatNumbersCompact(oValue);
              } else { //old
                return webfrontend.gui.Util.formatNumbersCompact(oValue);
              }
            },
            updateCache: function () {
              try {
                if (!this.HT_TabView) {
                  this.init();
                }
                var eType = this.HT_SelectedResourceType;
                var bTop = this.HT_ShowOnlyTopBuildings[eType].getValue();
                MaelstromTools.LocalStorage.set("UGL_TOPBUILDINGS_" + eType, bTop);
                var bAffordable = this.HT_ShowOnlyAffordableBuildings[eType].getValue();
                MaelstromTools.LocalStorage.set("UGL_AFFORDABLE_" + eType, bAffordable);
                var oCityFilter = new Array();
                for (var cname in this.HT_CityBuildings[eType]) {
                  var oCityBuildings = this.HT_CityBuildings[eType][cname];
                  var bFilterBuilding = oCityBuildings.getValue();
                  MaelstromTools.LocalStorage.set("UGL_CITYFILTER_" + eType + "_" + oCityBuildings.HT_CityID, bFilterBuilding);
                  oCityFilter[cname] = bFilterBuilding;
                }
                window.HuffyTools.UpgradePriority.getInstance().collectData(bTop, bAffordable, oCityFilter, eType);
              } catch (e) {
                console.log("HuffyTools.UpgradePriority.updateCache: ", e);
              }
            },
            setWidgetLabels: function () {
              try {
                var HuffyCalc = window.HuffyTools.UpgradePriority.getInstance();
                var UpgradeList = HuffyCalc.Cache;

                for (var eResourceType in UpgradeList) {
                  //var eResourceType = MaelstromTools.Statics.LootTypeName(eResourceName);
                  var rowData = [];

                  this.HT_Models[eResourceType].setData([]);

                  for (var mCity in UpgradeList[eResourceType]) {
                    for (var mBuilding in UpgradeList[eResourceType][mCity]) {
                      var UpItem = UpgradeList[eResourceType][mCity][mBuilding];
                      if (typeof (UpItem.Type) == "undefined") {
                        continue;
                      }
                      if (!(mBuilding in this.BuildingList)) {
                        this.BuildingList[UpItem.ID] = UpItem.Building;
                      }
                      var iTiberiumCosts = 0;
                      if (ClientLib.Base.EResourceType.Tiberium in UpItem.Costs) {
                        iTiberiumCosts = UpItem.Costs[ClientLib.Base.EResourceType.Tiberium];
                      }
                      var iTiberiumPerGain = 0;
                      if (ClientLib.Base.EResourceType.Tiberium in UpItem.Costs) {
                        iTiberiumPerGain = UpItem.Costs[ClientLib.Base.EResourceType.Tiberium] / UpItem.GainPerHour;
                      }
                      var iPowerCosts = 0;
                      if (ClientLib.Base.EResourceType.Power in UpItem.Costs) {
                        iPowerCosts = UpItem.Costs[ClientLib.Base.EResourceType.Power];
                      }
                      var iPowerPerGain = 0;
                      if (ClientLib.Base.EResourceType.Power in UpItem.Costs) {
                        iPowerPerGain = UpItem.Costs[ClientLib.Base.EResourceType.Power] / UpItem.GainPerHour;
                      }
                      var img = MT_Base.images["UpgradeBuilding"];
                      if (UpItem.Affordable == false) {
                        img = "";
                      }
                      var sType = UpItem.Type;
                      sType = sType + "(" + UpItem.PosX + ":" + UpItem.PosY + ")";
                      var iETA = 0;
                      if (UpItem.TimeTillUpgradable[ClientLib.Base.EResourceType.Tiberium] > 0) {
                        iETA = UpItem.TimeTillUpgradable[ClientLib.Base.EResourceType.Tiberium];
                      }
                      if (UpItem.TimeTillUpgradable[ClientLib.Base.EResourceType.Power] > iETA) {
                        iETA = UpItem.TimeTillUpgradable[ClientLib.Base.EResourceType.Power];
                      }
                      var sETA = "";
                      if (iETA > 0) {
                        sETA = ClientLib.Vis.VisMain.FormatTimespan(iETA);
                      }
                      var iState = 0;
                      if (UpItem.Affordable == true) {
                        iState = 1;
                      } else if (UpItem.AffordableByTransfer == true) {
                        iState = 2;
                      } else {
                        iState = 3;
                      }
                      rowData.push([UpItem.ID, mCity, sType, UpItem.Level, UpItem.GainPerHour, UpItem.Ticks, iTiberiumCosts, iPowerCosts, iTiberiumPerGain, iPowerPerGain, sETA, img, iState]);
                    }
                  }
                  this.HT_Models[eResourceType].setData(rowData);
                }
              } catch (e) {
                console.log("HuffyTools.UpgradePriority.setWidgetLabels: ", e);
              }
            }
          }
        });

        // define HuffyTools.UpgradePriority
        qx.Class.define("HuffyTools.UpgradePriority", {
          type: "singleton",
          extend: qx.core.Object,
          members: {
            list_units: null,
            list_buildings: null,

            comparePrio: function (elem1, elem2) {
              if (elem1.Ticks < elem2.Ticks) return -1;
              if (elem1.Ticks > elem2.Ticks) return 1;
              return 0;
            },
            getPrioList: function (city, arTechtypes, eModPackageSize, eModProduction, bOnlyTopBuildings, bOnlyAffordableBuildings) {
              try {
                var RSI = window.MaelstromTools.ResourceOverview.getInstance();
                RSI.updateCache();
                var TotalTiberium = 0;

                for (var cityName in this.Cache) {
                  var cityCache = this.Cache[cityName];
                  var i = cityCache[MaelstromTools.Statics.Tiberium];
                  if (typeof (i) !== 'undefined') {
                    TotalTiberium += i;
                    //but never goes here during test.... // to optimize - to do
                  }
                }
                var resAll = new Array();
                var prod = MaelstromTools.Production.getInstance().updateCache(city.get_Name());
                //var buildings = MaelstromTools.Wrapper.GetBuildings(city.get_CityBuildingsData());
                var buildings = city.get_Buildings().d;

                // 376877 & old fixes 
                var objbuildings = [];
                if (PerforceChangelist >= 376877) { //new
                  for (var o in buildings) objbuildings.push(buildings[o]);
                } else { //old
                  for (var i = 0; i < buildings.length; i++) objbuildings.push(buildings[i]);
                }


                for (var i = 0; i < objbuildings.length; i++) {
                  var city_building = objbuildings[i];

                  // TODO: check for destroyed building

                  var iTechType = city_building.get_TechName();
                  var bSkip = true;
                  for (var iTypeKey in arTechtypes) {
                    if (arTechtypes[iTypeKey] == iTechType) {
                      bSkip = false;
                      break;
                    }
                  }
                  if (bSkip == true) {
                    continue;
                  }
                  var city_buildingdetailview = city.GetBuildingDetailViewInfo(city_building);
                  if (city_buildingdetailview == null) {
                    continue;
                  }
                  var bindex = city_building.get_Id();
                  var resbuilding = new Array();
                  resbuilding["ID"] = bindex;
                  resbuilding["Type"] = this.TechTypeName(parseInt(iTechType, 10));
                  resbuilding["PosX"] = city_building.get_CoordX();
                  resbuilding["PosY"] = city_building.get_CoordY();

                  resbuilding["Building"] = {
                    cityid: city.get_Id(),
                    posX: resbuilding["PosX"],
                    posY: resbuilding["PosY"],
                    isPaid: true
                  };

                  resbuilding["GainPerHour"] = 0;
                  resbuilding["Level"] = city_building.get_CurrentLevel() + 1;
                  for (var ModifierType in city_buildingdetailview.OwnProdModifiers.d) {
                    switch (parseInt(ModifierType, 10)) {
                      case eModPackageSize:
                        {
                          var ModOj = city_buildingdetailview.OwnProdModifiers.d[city_building.get_MainModifierTypeId()];
                          var Mod = (ModOj.TotalValue + ModOj.NewLvlDelta) / ClientLib.Data.MainData.GetInstance().get_Time().get_StepsPerHour();
                          resbuilding["GainPerHour"] += (city_buildingdetailview.OwnProdModifiers.d[ModifierType].NewLvlDelta / Mod);
                          break;
                        }
                      case eModProduction:
                        {
                          resbuilding["GainPerHour"] += city_buildingdetailview.OwnProdModifiers.d[ModifierType].NewLvlDelta;
                          break;
                        }
                    }
                  }
                  // Nutzen ins VerhÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¤ltnis zu den Kosten setzten
                  var TechLevelData = ClientLib.Base.Util.GetTechLevelResourceRequirements_Obj(city_building.get_CurrentLevel() + 1, city_building.get_TechGameData_Obj());
                  var RatioPerCostType = new Object();
                  var sRatio = "";
                  var sCosts = "";
                  var lTicks = 0;
                  var bHasPower = true;
                  var bHasTiberium = true;
                  var bAffordableByTransfer = true;
                  var oCosts = new Array();
                  var oTimes = new Array();
                  for (var costtype in TechLevelData) {
                    if (typeof (TechLevelData[costtype]) == "function") {
                      continue;
                    }
                    if (TechLevelData[costtype].Type == "0") {
                      continue;
                    }

                    oCosts[TechLevelData[costtype].Type] = TechLevelData[costtype].Count;
                    if (parseInt(TechLevelData[costtype].Count) <= 0) {
                      continue;
                    }
                    RatioPerCostType[costtype] = TechLevelData[costtype].Count / resbuilding["GainPerHour"];
                    if (sCosts.length > 0) {
                      sCosts = sCosts + ", ";
                    }
                    sCosts = sCosts + MaelstromTools.Wrapper.FormatNumbersCompact(TechLevelData[costtype].Count) + " " + MaelstromTools.Statics.LootTypeName(TechLevelData[costtype].Type);
                    if (sRatio.length > 0) {
                      sRatio = sRatio + ", ";
                    }
                    // Upgrade affordable ?
                    if (city.GetResourceCount(TechLevelData[costtype].Type) < TechLevelData[costtype].Count) {
                      switch (TechLevelData[costtype].Type) {
                        case ClientLib.Base.EResourceType.Tiberium:
                          {
                            bHasTiberium = false;
                            if (TotalTiberium < TechLevelData[costtype].Count) {
                              bAffordableByTransfer = false;
                            }
                          }
                          break;
                        case ClientLib.Base.EResourceType.Power:
                          {
                            bHasPower = false;
                          }
                          break;
                      }
                    }
                    sRatio = sRatio + MaelstromTools.Wrapper.FormatNumbersCompact(RatioPerCostType[costtype]);

                    var techlevelData = MaelstromTools.Statics.LootTypeName(TechLevelData[costtype].Type);

                    var dCityProduction = prod[techlevelData].Delta + prod[techlevelData].ExtraBonusDelta + prod[techlevelData].POI;
                    if (dCityProduction > 0) {
                      if (lTicks < (3600 * RatioPerCostType[costtype] / dCityProduction)) {
                        lTicks = (3600 * RatioPerCostType[costtype] / dCityProduction);
                      }
                    }
                    oTimes[TechLevelData[costtype].Type] = 0;
                    if (oCosts[TechLevelData[costtype].Type] > city.GetResourceCount(TechLevelData[costtype].Type)) {
                      oTimes[TechLevelData[costtype].Type] = (3600 * (oCosts[TechLevelData[costtype].Type] - city.GetResourceCount(TechLevelData[costtype].Type))) / dCityProduction;
                    }
                  }
                  resbuilding["Ticks"] = lTicks;
                  resbuilding["Time"] = ClientLib.Vis.VisMain.FormatTimespan(lTicks);
                  resbuilding["Costtext"] = sCosts;
                  resbuilding["Costs"] = oCosts;
                  resbuilding["TimeTillUpgradable"] = oTimes;
                  resbuilding["Ratio"] = sRatio;
                  resbuilding["Affordable"] = bHasTiberium && bHasPower;
                  resbuilding["AffordableByTransfer"] = bHasPower && bAffordableByTransfer;
                  if (resbuilding["GainPerHour"] > 0 && (bOnlyAffordableBuildings == false || resbuilding["Affordable"] == true)) {
                    resAll[bindex] = resbuilding;
                  }
                }


                resAll = resAll.sort(this.comparePrio);
                if (!bOnlyTopBuildings) {
                  return resAll;
                }
                var res2 = new Array();
                if (MaelstromTools.Util.ArraySize(resAll) > 0) {
                  var iTopNotAffordable = -1;
                  var iTopAffordable = -1;
                  var iNextNotAffordable = -1;
                  var iLastIndex = -1;
                  for (var iNewIndex in resAll) {
                    if (resAll[iNewIndex].Affordable == true) {
                      if (iTopAffordable == -1) {
                        iTopAffordable = iNewIndex;
                        iNextNotAffordable = iLastIndex;
                      }
                    } else {
                      if (iTopNotAffordable == -1) {
                        iTopNotAffordable = iNewIndex;
                      }
                    }
                    iLastIndex = iNewIndex;
                  }
                  if (iTopAffordable == -1) {
                    iNextNotAffordable = iLastIndex;
                  }
                  var iIndex = 0;
                  if (iTopNotAffordable != -1) {
                    res2[iIndex++] = resAll[iTopNotAffordable];
                  }
                  if (iNextNotAffordable != -1) {
                    res2[iIndex++] = resAll[iNextNotAffordable];
                  }
                  if (iTopAffordable != -1) {
                    res2[iIndex++] = resAll[iTopAffordable];
                  }
                }
                res2 = res2.sort(this.comparePrio);
                return res2;
              } catch (e) {
                console.log("HuffyTools.getPrioList: ", e);
              }
            },
            TechTypeName: function (iTechType) {
              switch (iTechType) {
                case ClientLib.Base.ETechName.PowerPlant:
                  {
                    return Lang.gt("Powerplant");
                    break;
                  }
                case ClientLib.Base.ETechName.Refinery:
                  {
                    return Lang.gt("Refinery");
                    break;
                  }
                case ClientLib.Base.ETechName.Harvester_Crystal:
                  {
                    return Lang.gt("Harvester");
                    break;
                  }
                case ClientLib.Base.ETechName.Harvester:
                  {
                    return Lang.gt("Harvester");
                    break;
                  }
                case ClientLib.Base.ETechName.Silo:
                  {
                    return Lang.gt("Silo");
                    break;
                  }
                case ClientLib.Base.ETechName.Accumulator:
                  {
                    return Lang.gt("Accumulator");
                    break;
                  }
              }
              return "?";
            },
            collectData: function (bOnlyTopBuildings, bOnlyAffordableBuildings, oCityFilter, eSelectedResourceType) {
              try {
                MT_Cache.updateCityCache();
                this.Cache = new Object();
                if (eSelectedResourceType == ClientLib.Base.EResourceType.Tiberium) {
                  this.Cache[ClientLib.Base.EResourceType.Tiberium] = new Object();
                }
                if (eSelectedResourceType == ClientLib.Base.EResourceType.Crystal) {
                  this.Cache[ClientLib.Base.EResourceType.Crystal] = new Object();
                }
                if (eSelectedResourceType == ClientLib.Base.EResourceType.Power) {
                  this.Cache[ClientLib.Base.EResourceType.Power] = new Object();
                }
                if (eSelectedResourceType == ClientLib.Base.EResourceType.Gold) {
                  this.Cache[ClientLib.Base.EResourceType.Gold] = new Object();
                }
                for (var cname in MT_Cache.Cities) {
                  var city = MT_Cache.Cities[cname].Object;
                  if (oCityFilter[cname] == false) {
                    continue;
                  }
                  if (eSelectedResourceType == ClientLib.Base.EResourceType.Tiberium) {
                    this.Cache[ClientLib.Base.EResourceType.Tiberium][cname] = this.getPrioList(city, [ClientLib.Base.ETechName.Harvester, ClientLib.Base.ETechName.Silo], ClientLib.Base.EModifierType.TiberiumPackageSize, ClientLib.Base.EModifierType.TiberiumProduction, bOnlyTopBuildings, bOnlyAffordableBuildings);
                  }
                  if (eSelectedResourceType == ClientLib.Base.EResourceType.Crystal) {
                    this.Cache[ClientLib.Base.EResourceType.Crystal][cname] = this.getPrioList(city, [ClientLib.Base.ETechName.Harvester, ClientLib.Base.ETechName.Silo], ClientLib.Base.EModifierType.CrystalPackageSize, ClientLib.Base.EModifierType.CrystalProduction, bOnlyTopBuildings, bOnlyAffordableBuildings);
                  }
                  if (eSelectedResourceType == ClientLib.Base.EResourceType.Power) {
                    this.Cache[ClientLib.Base.EResourceType.Power][cname] = this.getPrioList(city, [ClientLib.Base.ETechName.PowerPlant, ClientLib.Base.ETechName.Accumulator], ClientLib.Base.EModifierType.PowerPackageSize, ClientLib.Base.EModifierType.PowerProduction, bOnlyTopBuildings, bOnlyAffordableBuildings);
                  }
                  if (eSelectedResourceType == ClientLib.Base.EResourceType.Gold) {
                    this.Cache[ClientLib.Base.EResourceType.Gold][cname] = this.getPrioList(city, [ClientLib.Base.ETechName.Refinery, ClientLib.Base.ETechName.PowerPlant], ClientLib.Base.EModifierType.CreditsPackageSize, ClientLib.Base.EModifierType.CreditsProduction, bOnlyTopBuildings, bOnlyAffordableBuildings);
                  }
                }
              } catch (e) {
                console.log("HuffyTools.UpgradePriority.collectData: ", e);
              }
            }
          }
        });

        var __MTCity_initialized = false; //k undeclared

        var Lang = window.MaelstromTools.Language.getInstance();
        var MT_Cache = window.MaelstromTools.Cache.getInstance();
        var MT_Base = window.MaelstromTools.Base.getInstance();
        var MT_Preferences = window.MaelstromTools.Preferences.getInstance();
        MT_Preferences.readOptions();

        if (!webfrontend.gui.region.RegionCityMenu.prototype.__MTCity_showMenu) {
          webfrontend.gui.region.RegionCityMenu.prototype.__MTCity_showMenu = webfrontend.gui.region.RegionCityMenu.prototype.showMenu;
        }
        webfrontend.gui.region.RegionCityMenu.prototype.showMenu = function (selectedVisObject) {

          MT_Cache.SelectedBaseForMenu = selectedVisObject;
          var baseStatusOverview = window.MaelstromTools.BaseStatus.getInstance();

          if (__MTCity_initialized == false) {
            //console.log(selectedBase.get_Name());
            __MTCity_initialized = true;
            baseStatusOverview.CityMenuButtons = new Array();

            for (var k in this) {
              try {
                if (this.hasOwnProperty(k)) {
                  if (this[k] && this[k].basename == "Composite") {
                    var button = new qx.ui.form.Button(Lang.gt("Calibrate support"));
                    button.addListener("execute", function (e) {
                      MaelstromTools.Util.calibrateWholeSupportOnSelectedBase();
                    }, this);

                    this[k].add(button);
                    baseStatusOverview.CityMenuButtons.push(button);
                  }
                }
              } catch (e) {
                console.log("webfrontend.gui.region.RegionCityMenu.prototype.showMenu: ", e);
              }
            }
          }

          var isAllowed = MaelstromTools.Util.checkIfSupportIsAllowed(MT_Cache.SelectedBaseForMenu);

          for (var x = 0; x < baseStatusOverview.CityMenuButtons.length; ++x) {
            baseStatusOverview.CityMenuButtons[x].setVisibility(isAllowed ? 'visible' : 'excluded');
          }
          this.__MTCity_showMenu(selectedVisObject);
        };

        if (MT_Preferences.Settings.showLoot) {
          // Wrap onCitiesChange method
          if (!webfrontend.gui.region.RegionNPCCampStatusInfo.prototype.__MTCity_NPCCamp) {
            webfrontend.gui.region.RegionNPCCampStatusInfo.prototype.__MTCity_NPCCamp = webfrontend.gui.region.RegionNPCCampStatusInfo.prototype.onCitiesChange;
          }
          webfrontend.gui.region.RegionNPCCampStatusInfo.prototype.onCitiesChange = function () {
            MT_Base.updateLoot(1, ClientLib.Vis.VisMain.GetInstance().get_SelectedObject(), webfrontend.gui.region.RegionNPCCampStatusInfo.getInstance());
            return this.__MTCity_NPCCamp();
          };

          if (!webfrontend.gui.region.RegionNPCBaseStatusInfo.prototype.__MTCity_NPCBase) {
            webfrontend.gui.region.RegionNPCBaseStatusInfo.prototype.__MTCity_NPCBase = webfrontend.gui.region.RegionNPCBaseStatusInfo.prototype.onCitiesChange;
          }
          webfrontend.gui.region.RegionNPCBaseStatusInfo.prototype.onCitiesChange = function () {
            MT_Base.updateLoot(2, ClientLib.Vis.VisMain.GetInstance().get_SelectedObject(), webfrontend.gui.region.RegionNPCBaseStatusInfo.getInstance());
            //MT_Base.updateLoot(2, ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity(), webfrontend.gui.region.RegionNPCBaseStatusInfo.getInstance());
            return this.__MTCity_NPCBase();
          };

          if (!webfrontend.gui.region.RegionCityStatusInfoEnemy.prototype.__MTCity_City) {
            webfrontend.gui.region.RegionCityStatusInfoEnemy.prototype.__MTCity_City = webfrontend.gui.region.RegionCityStatusInfoEnemy.prototype.onCitiesChange;
          }
          webfrontend.gui.region.RegionCityStatusInfoEnemy.prototype.onCitiesChange = function () {
            MT_Base.updateLoot(3, ClientLib.Vis.VisMain.GetInstance().get_SelectedObject(), webfrontend.gui.region.RegionCityStatusInfoEnemy.getInstance());
            //MT_Base.updateLoot(3, ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity(), webfrontend.gui.region.RegionCityStatusInfoEnemy.getInstance());
            return this.__MTCity_City();
          };
        }

      }
    } catch (e) {
      console.log("createMaelstromTools: ", e);
    }

    function MaelstromTools_checkIfLoaded() {
      try {
        if (typeof qx != 'undefined' && qx.core.Init.getApplication() && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION) && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION).isVisible()) {
          createMaelstromTools();
          window.MaelstromTools.Base.getInstance().initialize();
        } else {
          window.setTimeout(MaelstromTools_checkIfLoaded, 1000);
        }
      } catch (e) {
        console.log("MaelstromTools_checkIfLoaded: ", e);
      }
    }

    if (/commandandconquer\.com/i.test(document.domain)) {
      window.setTimeout(MaelstromTools_checkIfLoaded, 1000);
    }
  };

  try {
    var MaelstromScript = document.createElement("script");
    MaelstromScript.innerHTML = "(" + MaelstromTools_main.toString() + ")();";
    MaelstromScript.type = "text/javascript";
    if (/commandandconquer\.com/i.test(document.domain)) {
      document.getElementsByTagName("head")[0].appendChild(MaelstromScript);
    }
  } catch (e) {
    console.log("MaelstromTools: init error: ", e);
  }
})();


// ==UserScript==
// @name        Maelstrom ADDON Basescanner
// @namespace   http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @description Maelstrom ADDON Basescanner
// @include     http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version     1.8.4
// @author      BlinDManX
// @grant       none
// @copyright   2012+, Claus Neumann
// @license     CC BY-NC-ND 3.0 - http://creativecommons.org/licenses/by-nc-nd/3.0/
// @updateURL   https://userscripts.org/scripts/source/145168.meta.js
// @downloadURL https://userscripts.org/scripts/source/145168.user.js
// ==/UserScript==
(function(){
var b=function(){var e=["__msbs_version","1.8.4","Addons.BaseScannerGUI","singleton","Window","window","ui","base","Addons.BaseScannerGUI ","info","T","getInstance","Language","setWidth","setHeight","setContentPadding","setShowMinimize","setShowMaximize","setShowClose","setResizable","setAllowMaximize","setAllowMinimize","setAllowClose","setShowStatusbar","setDecorator","setPadding","layout","setLayout","src","stats","http://goo.gl/DrJ2x","ZE","removeAll","add","setData","ZL","Addons.BaseScannerGUI.construct: ","debug","img","createElement","setCaption","isVisible","close","updateCityCache","Cache","MaelstromTools","ZC","Cities","form","Basescanner_LastCityID","getserver","LocalStorage","get_Id","Object","setSelection","open","moveTo","MaelstromTools.DefaultObject.openWindow: ","log","model","table","ID","LoadState","City","get","Location","Level","Tiberium","Crystal","Dollar","Research","Crystalfields","Tiberiumfields","Building state","Defense state","CP","Def.HP/Off.HP","Sum Tib+Cry+Cre","(Tib+Cry+Cre)/CP","CY","DF","base set up at","setColumns","YY","get_Player","MainData","Data","ZN","setColumnVisibilityButtonVisible","setColumnWidth","Basescanner_ColWidth_2","Basescanner_ColWidth_3","Basescanner_ColWidth_4","Basescanner_ColWidth_5","Basescanner_ColWidth_6","Basescanner_ColWidth_7","Basescanner_ColWidth_8","Basescanner_ColWidth_9","Basescanner_ColWidth_10","Basescanner_ColWidth_11","Basescanner_ColWidth_12","Basescanner_ColWidth_13","Basescanner_ColWidth_14","Basescanner_ColWidth_15","Basescanner_ColWidth_16","Basescanner_ColWidth_17","Basescanner_ColWidth_18","Basescanner_ColWidth_19","getTableColumnModel","getColumnCount","Basescanner_Column_","setColumnVisible","Statics","images","headerrenderer","setHeaderCellRenderer","FA","set","cellrenderer","setDataCellRenderer","cellDblclick","BaseScannerGUI","addListener","widthChanged","col","getData","newWidth","Basescanner_ColWidth_","setserver","Addons.BaseScannerGUI.FI: ","getRow","length",":","split","VisMain","Vis","getValue","ZK","getApplication","Init","core","closeCityInfo","getBackgroundArea","pavmCombatSetupDefense","PlayerAreaViewMode","setView","getPlayArea","get_CurrentOwnCity","get_Cities","set_CurrentTargetBaseId","get_CityArmyFormationsManager","Addons.BaseScannerGUI FB error: ","Scan","setLabel","ZG","ZH","format","util","setGroupingUsed","setMaximumFractionDigits","abs","floor","k","M","G","container","setMargin","changeSelection","CP Limit","white","basic","ZQ","Basescanner_Cplimiter","","min Level","Basescanner_minLevel","1","ZY","Player","setTextColor","Basescanner_Show0","setValue","changeValue","Bases","Basescanner_Show1","Outpost","Basescanner_Show2","Camp","Basescanner_Show3","execute","solid","blue","decoration","ZV","red","ZU","green","ZX","center","YZ","clear Cache","ZZ","Only center on World","ZJ","7 "," 5 ","6 "," 6 ","5 "," 7 ","ZD","Get Layouts","BaseScannerLayout","Addons","BaseScanner Layout","openWindow","setEnabled","ZB","Loader","gui","ZR","getColumnName","isColumnVisible","index","ZO","+","ZI","addAfter","-","remove","right","setAlignX","ZF","Addons.BaseScannerGUI.createOptions: ","\x3Ca href=\x22https://sites.google.com/site/blindmanxdonate\x22 target=\x22_blank\x22\x3ESupport Development of BlinDManX Addons\x3C/a\x3E","ZP","getModel","getSelection","get_PosX","get_PosY","set_CurrentCityId","ZT","prototype","WorldObjectCity","WorldSector","$ctor","ClientLib.Data.WorldSector.WorldObjectCity","getLevel","Error - ClientLib.Data.WorldSector.WorldObjectCity.Level undefined","error","getID","Error - ClientLib.Data.WorldSector.WorldObjectCity.ID undefined","WorldObjectNPCBase","ClientLib.Data.WorldSector.WorldObjectNPCBase","Error - ClientLib.Data.WorldSector.WorldObjectNPCBase.Level undefined","Error - ClientLib.Data.WorldSector.WorldObjectNPCBase.ID undefined","WorldObjectNPCCamp","ClientLib.Data.WorldSector.WorldObjectNPCCamp","Error - ClientLib.Data.WorldSector.WorldObjectNPCCamp.Level undefined","getCampType","Error - ClientLib.Data.WorldSector.WorldObjectNPCCamp.CampType undefined","Error - ClientLib.Data.WorldSector.WorldObjectNPCCamp.ID undefined","Pause","window.Addons.BaseScannerGUI.getInstance().FJ()","setTimeout","window.Addons.BaseScannerGUI.getInstance().FG()","/","ZM","get_World","Scanning from: ","get_Name","get_MaxAttackDistance","get_Server","sqrt","Type","function","push","sortByColumn","name","DR01D","Maelstrom_Basescanner FJ error: ","data null: ","warn","data[i] null: ","get_PlayerId","get_AllianceId","get_IsGhostMode","get_CityUnitsData","d","get_Buildings","get_DefenseUnits","get_OffenseUnits","EResourceType","Base","Gold","ResearchPoints","ZA","get_Health","get_MdbUnitId","get_CoordY","HPRecord"," finish","countlastidchecked"," on "," removed (GetBuildingsConditionInPercent == 0)","splice"," removed (IsGhostMode)","lastid"," removed (found no data)","MaelstromTools_Basescanner getResources","ZS","define","Class","Addons.BaseScannerLayout","Addons.BaseScannerLayout ","ZW","Addons.BaseScannerLayout.construct: ","Addons.BaseScannerLayout.openWindow: ","ZE null: ","\x3Ctable border=\x222\x22 cellspacing=\x220\x22 cellpadding=\x220\x22\x3E"," - ","\x3Ctr\x3E\x3Ctd colspan=\x229\x22\x3E\x3Cfont color=\x22#FFF\x22\x3E","\x3C/font\x3E\x3C/td\x3E\x3C/tr\x3E","\x3Ctr\x3E","\x3Cimg width=\x2214\x22 height=\x2214\x22 src=\x22","\x22\x3E","Emptypixels","\x3Ctd\x3E","\x3C/td\x3E","\x3C/tr\x3E","\x3C/table\x3E","#303030","cid","click","setReturnValue","Addons.LocalStorage","static","undefined","isSupported","stringify","Addons.LocalStorage.setglobal: ","isdefined","parse","Addons.LocalStorage.getglobal: ","object","LocalStorage data from server not null, but not object","LocalStorage data from server not null, but parsererror","Addons.LocalStorage.setserver: ","isdefineddata","Addons.LocalStorage.getserver: ","Addons.Language","main","hasOwnProperty","Translate Added ","Addons.Language.addtranslateobj main not define","getLocale","Manager","locale","_","Addons.Language.get "," not translate for locale ","qx.ui.table.cellrenderer.Replace","Default","Function","value","getReplaceMap","getReplaceFunction","escape","String","bom","Maelstrom_Basescanner initalisiert","Point","Position","addtranslateobj","BaseScanner Overview","Basescanner Übersicht","Visão geral do scanner de base","Aperçu du scanner de base","Scannen","Esquadrinhar","Balayer","Lage","localização","Emplacement","Spieler","Jogador","Joueur","Camp,Outpost","Lager,Vorposten","Camp,posto avançado","Camp,avant-poste","Lager","Vorposten","posto avançado","avant-poste","Layout da Base de Dados de Scanner","Mise scanner de base","Show Layouts","Layouts anzeigen","Mostrar Layouts","Voir Layouts","Gebäudezustand","construção do Estado","construction de l\x27État","Verteidigungszustand","de Defesa do Estado","défense de l\x27Etat","KP","KP begrenzen","CP limitar","CP limiter","min. Level","nível mínimo","niveau minimum","Cache leeren","limpar cache","vider le cache","Nur auf Welt zentrieren","Único centro no Mundial","Seul centre sur World","Basis errichtbar","base de configurar a","mis en place à la base","Infantry","Infanterie","Infantaria","Vehicle","Fahrzeuge","Veículos","Vehicule","Aircraft","Flugzeuge","Aeronaves","Aviation","Tibério","Kristalle","Cristal","Power","Strom","Potência","Energie","Credits","Créditos","Crédit","Forschung","Investigação","Recherche","-----","--","FileManager","File","BaseScanner","ui/icons/icon_item.png","createNewImage","ui/menues/main_menu/misc_empty_pixel.png","version ","desktopPosition","createDesktopButton"," version ","addToMainMenu","AddonMainMenu","Basescanner","ALT+B","Wrapper","Count","get_HitpointsPercent","MaelstromTools_Basescanner getResourcesPart","replace","match","Error - ","not found","MaelstromTools_Basescanner_checkIfLoaded: ","domain","test"];window[e[0]]=e[1];function j(){qx[e[312]][e[311]](e[2],{type:e[3],extend:qx[e[6]][e[5]][e[4]],construct:function(){try{this[e[7]](arguments);console[e[9]](e[8]+window[e[0]]);this[e[10]]=Addons[e[12]][e[11]]();this[e[13]](820);this[e[14]](400);this[e[15]](10);this[e[16]](true);this[e[17]](true);this[e[18]](true);this[e[19]](true);this[e[20]](true);this[e[21]](true);this[e[22]](true);this[e[23]](false);this[e[24]](null);this[e[25]](5);this[e[27]](new qx[e[6]][e[26]].VBox(3));this[e[29]][e[28]]=e[30];this.FI();this.FH();this.FD();if(this[e[31]]==null){this[e[31]]=[];}this[e[25]](0);this[e[32]]();this[e[33]](this.ZF);this[e[33]](this.ZN);this[e[33]](this.ZP);this[e[35]][e[34]](this.ZE);}catch(t){console[e[37]](e[36],t);}},members:{stats:document[e[39]](e[38]),T:null,ZA:0,ZB:null,ZC:null,ZD:null,ZE:null,ZF:null,ZG:null,ZH:false,ZI:true,ZJ:null,ZK:null,ZL:null,ZM:null,ZN:null,ZO:null,ZP:null,ZQ:null,ZR:[],ZT:true,ZU:null,ZV:null,ZX:null,ZY:null,ZZ:[],ZS:{},YZ:null,YY:null,openWindow:function(w){try{this[e[40]](w);if(this[e[41]]()){this[e[42]]();}else{q[e[43]]();q=window[e[45]][e[44]][e[11]]();var v;this[e[46]][e[32]]();for(v in q[e[47]]){var u=new qx[e[6]][e[48]].ListItem(v,null,q[e[47]][v].Object);this[e[46]][e[33]](u);if(Addons[e[51]][e[50]](e[49])==q[e[47]][v][e[53]][e[52]]()){this[e[46]][e[54]]([u]);}}this[e[55]]();this[e[56]](100,100);}}catch(t){console[e[58]](e[57],t);}},FI:function(){try{this[e[35]]=new qx[e[6]][e[60]][e[59]].Simple();this[e[35]][e[82]]([e[61],e[62],this[e[10]][e[64]](e[63]),this[e[10]][e[64]](e[65]),this[e[10]][e[64]](e[66]),this[e[10]][e[64]](e[67]),this[e[10]][e[64]](e[68]),this[e[10]][e[64]](e[69]),this[e[10]][e[64]](e[70]),e[71],e[72],this[e[10]][e[64]](e[73]),this[e[10]][e[64]](e[74]),this[e[10]][e[64]](e[75]),e[76],e[77],e[78],e[79],e[80],this[e[10]][e[64]](e[81])]);this[e[83]]=ClientLib[e[86]][e[85]].GetInstance()[e[84]]();this[e[87]]=new qx[e[6]][e[60]].Table(this.ZL);this[e[87]][e[88]](false);this[e[87]][e[89]](0,0);this[e[87]][e[89]](1,0);this[e[87]][e[89]](2,Addons[e[51]][e[50]](e[90],120));this[e[87]][e[89]](3,Addons[e[51]][e[50]](e[91],60));this[e[87]][e[89]](4,Addons[e[51]][e[50]](e[92],50));this[e[87]][e[89]](5,Addons[e[51]][e[50]](e[93],60));this[e[87]][e[89]](6,Addons[e[51]][e[50]](e[94],60));this[e[87]][e[89]](7,Addons[e[51]][e[50]](e[95],60));this[e[87]][e[89]](8,Addons[e[51]][e[50]](e[96],60));this[e[87]][e[89]](9,Addons[e[51]][e[50]](e[97],30));this[e[87]][e[89]](10,Addons[e[51]][e[50]](e[98],30));this[e[87]][e[89]](11,Addons[e[51]][e[50]](e[99],50));this[e[87]][e[89]](12,Addons[e[51]][e[50]](e[100],50));this[e[87]][e[89]](13,Addons[e[51]][e[50]](e[101],30));this[e[87]][e[89]](14,Addons[e[51]][e[50]](e[102],60));this[e[87]][e[89]](15,Addons[e[51]][e[50]](e[103],60));this[e[87]][e[89]](16,Addons[e[51]][e[50]](e[104],60));this[e[87]][e[89]](17,Addons[e[51]][e[50]](e[105],50));this[e[87]][e[89]](18,Addons[e[51]][e[50]](e[106],50));this[e[87]][e[89]](19,Addons[e[51]][e[50]](e[107],40));var u=0;var t=this[e[87]][e[108]]();for(u=0;u<this[e[35]][e[109]]();u++){if(u==0||u==1||u==11||u==12){t[e[111]](u,Addons[e[51]][e[50]](e[110]+u,false));}else{t[e[111]](u,Addons[e[51]][e[50]](e[110]+u,true));}}t[e[111]](1,false);t[e[115]](9,new qx[e[6]][e[60]][e[114]].Icon(p[e[113]][MaelstromTools[e[112]][e[68]]]),e[71]);t[e[115]](10,new qx[e[6]][e[60]][e[114]].Icon(p[e[113]][MaelstromTools[e[112]][e[67]]],e[72]));t[e[119]](5,new qx[e[6]][e[60]][e[118]].Replace()[e[117]]({ReplaceFunction:this[e[116]]}));t[e[119]](6,new qx[e[6]][e[60]][e[118]].Replace()[e[117]]({ReplaceFunction:this[e[116]]}));t[e[119]](7,new qx[e[6]][e[60]][e[118]].Replace()[e[117]]({ReplaceFunction:this[e[116]]}));t[e[119]](8,new qx[e[6]][e[60]][e[118]].Replace()[e[117]]({ReplaceFunction:this[e[116]]}));t[e[119]](15,new qx[e[6]][e[60]][e[118]].Replace()[e[117]]({ReplaceFunction:this[e[116]]}));t[e[119]](16,new qx[e[6]][e[60]][e[118]].Replace()[e[117]]({ReplaceFunction:this[e[116]]}));t[e[119]](19,new qx[e[6]][e[60]][e[118]].Boolean());this[e[87]][e[122]](e[120],function(w){Addons[e[121]][e[11]]().FB(w);},this);t[e[122]](e[123],function(y){var x=y[e[125]]()[e[124]];var w=y[e[125]]()[e[126]];Addons[e[51]][e[128]](e[127]+x,w);},t);}catch(v){console[e[37]](e[129],v);}},FB:function(y){try{var A=this[e[31]][y[e[130]]()][0];var z=this[e[31]][y[e[130]]()][3];if(z!=null&&z[e[133]](e[132])[e[131]]==2){var x=parseInt(z[e[133]](e[132])[0]);var w=parseInt(z[e[133]](e[132])[1]);ClientLib[e[135]][e[134]].GetInstance().CenterGridPosition(x,w);}if(A&&!(this[e[137]][4][e[136]]())){var u=qx[e[140]][e[139]][e[138]]();u[e[142]]()[e[141]]();u[e[146]]()[e[145]](ClientLib[e[86]][e[144]][e[143]],A,0,0);}var t=ClientLib[e[86]][e[85]].GetInstance()[e[148]]()[e[147]]();if(t!=null){t[e[150]]()[e[149]](A);}}catch(v){console[e[37]](e[151],v);}},FN:function(t){this[e[154]][e[153]](this[e[10]][e[64]](e[152]));this[e[155]]=false;},CBChanged:function(t){this[e[155]]=false;},FA:function(t){var u=new qx[e[157]][e[156]].NumberFormat();u[e[158]](true);u[e[159]](3);if(!isNaN(t)){if(Math[e[160]](t)<100000){t=u[e[156]](Math[e[161]](t));}else{if(Math[e[160]](t)>=100000&&Math[e[160]](t)<1000000){t=u[e[156]](Math[e[161]](t/100)/10)+e[162];}else{if(Math[e[160]](t)>=1000000&&Math[e[160]](t)<10000000){t=u[e[156]](Math[e[161]](t/1000)/1000)+e[163];}else{if(Math[e[160]](t)>=10000000&&Math[e[160]](t)<100000000){t=u[e[156]](Math[e[161]](t/10000)/100)+e[163];}else{if(Math[e[160]](t)>=100000000&&Math[e[160]](t)<1000000000){t=u[e[156]](Math[e[161]](t/100000)/10)+e[163];}else{if(Math[e[160]](t)>=1000000000&&Math[e[160]](t)<10000000000){t=u[e[156]](Math[e[161]](t/1000000)/1000)+e[164];}else{if(Math[e[160]](t)>=10000000000&&Math[e[160]](t)<100000000000){t=u[e[156]](Math[e[161]](t/10000000)/100)+e[164];}else{if(Math[e[160]](t)>=100000000000&&Math[e[160]](t)<1000000000000){t=u[e[156]](Math[e[161]](t/100000000)/10)+e[164];}else{if(Math[e[160]](t)>=1000000000000&&Math[e[160]](t)<10000000000000){t=u[e[156]](Math[e[161]](t/1000000000)/1000)+e[10];}else{if(Math[e[160]](t)>=10000000000000&&Math[e[160]](t)<100000000000000){t=u[e[156]](Math[e[161]](t/10000000000)/100)+e[10];}else{if(Math[e[160]](t)>=100000000000000&&Math[e[160]](t)<1000000000000000){t=u[e[156]](Math[e[161]](t/100000000000)/10)+e[10];}else{if(Math[e[160]](t)>=1000000000000000){t=u[e[156]](Math[e[161]](t/1000000000000))+e[10];}}}}}}}}}}}}}return t.toString();},FH:function(){try{var D=new qx[e[6]][e[26]].Flow();var C=new qx[e[6]][e[165]].Composite(D);this[e[46]]=new qx[e[6]][e[48]].SelectBox();this[e[46]][e[14]](25);this[e[46]][e[166]](5);q[e[43]]();q=window[e[45]][e[44]][e[11]]();var G;for(G in q[e[47]]){var F=new qx[e[6]][e[48]].ListItem(G,null,q[e[47]][G].Object);this[e[46]][e[33]](F);if(Addons[e[51]][e[50]](e[49])==q[e[47]][G][e[53]][e[52]]()){this[e[46]][e[54]]([F]);}}this[e[46]][e[122]](e[167],function(H){this.FP(0,1,200);this[e[155]]=false;this[e[154]][e[153]](this[e[10]][e[64]](e[152]));},this);C[e[33]](this.ZC);var B=new qx[e[6]][e[170]].Label()[e[117]]({value:this[e[10]][e[64]](e[168]),textColor:e[169],margin:5});C[e[33]](B);this[e[171]]=new qx[e[6]][e[48]].SelectBox();this[e[171]][e[13]](50);this[e[171]][e[14]](25);this[e[171]][e[166]](5);var z=Addons[e[51]][e[50]](e[172],25);for(var x=11;x<41;x+=1){F=new qx[e[6]][e[48]].ListItem(e[173]+x,null,x);this[e[171]][e[33]](F);if(z==x){this[e[171]][e[54]]([F]);}}this[e[171]][e[122]](e[167],function(H){this[e[31]]=[];this.FP(0,1,200);this[e[155]]=false;this[e[154]][e[153]](this[e[10]][e[64]](e[152]));},this);C[e[33]](this.ZQ);var v=new qx[e[6]][e[170]].Label()[e[117]]({value:this[e[10]][e[64]](e[174]),textColor:e[169],margin:5});C[e[33]](v);var u=Addons[e[51]][e[50]](e[175],e[176]);this[e[177]]=new qx[e[6]][e[48]].TextField(u)[e[117]]({width:50});C[e[33]](this.ZY);this[e[137]]=[];this[e[137]][0]=new qx[e[6]][e[48]].CheckBox(this[e[10]][e[64]](e[178]));this[e[137]][0][e[166]](5);this[e[137]][0][e[179]](e[169]);this[e[137]][0][e[181]](Addons[e[51]][e[50]](e[180],false));this[e[137]][0][e[122]](e[182],function(H){this[e[31]]=[];this.FP(0,1,200);this[e[155]]=false;this[e[154]][e[153]](this[e[10]][e[64]](e[152]));},this);C[e[33]](this[e[137]][0]);this[e[137]][1]=new qx[e[6]][e[48]].CheckBox(this[e[10]][e[64]](e[183]));this[e[137]][1][e[166]](5);this[e[137]][1][e[179]](e[169]);this[e[137]][1][e[181]](Addons[e[51]][e[50]](e[184],false));this[e[137]][1][e[122]](e[182],function(H){this[e[31]]=[];this.FP(0,1,200);this[e[155]]=false;this[e[154]][e[153]](this[e[10]][e[64]](e[152]));},this);C[e[33]](this[e[137]][1]);this[e[137]][2]=new qx[e[6]][e[48]].CheckBox(this[e[10]][e[64]](e[185]));this[e[137]][2][e[166]](5);this[e[137]][2][e[179]](e[169]);this[e[137]][2][e[181]](Addons[e[51]][e[50]](e[186],false));this[e[137]][2][e[122]](e[182],function(H){this[e[31]]=[];this.FP(0,1,200);this[e[155]]=false;this[e[154]][e[153]](this[e[10]][e[64]](e[152]));},this);C[e[33]](this[e[137]][2]);this[e[137]][3]=new qx[e[6]][e[48]].CheckBox(this[e[10]][e[64]](e[187]));this[e[137]][3][e[166]](5);this[e[137]][3][e[179]](e[169]);this[e[137]][3][e[181]](Addons[e[51]][e[50]](e[188],true));this[e[137]][3][e[122]](e[182],function(H){this[e[31]]=[];this.FP(0,1,200);this[e[155]]=false;this[e[154]][e[153]](this[e[10]][e[64]](e[152]));},this);C[e[33]](this[e[137]][3],{lineBreak:true});this[e[154]]=new qx[e[6]][e[48]].Button(this[e[10]][e[64]](e[152]))[e[117]]({width:100,minWidth:100,maxWidth:100,height:25,margin:5});this[e[154]][e[122]](e[189],function(){this.FE();},this);C[e[33]](this.ZG);var t=new qx[e[6]][e[192]].Single(2,e[190],e[191]);this[e[193]]=new qx[e[6]][e[165]].Composite(new qx[e[6]][e[26]].Basic())[e[117]]({decorator:t,backgroundColor:e[194],allowGrowX:false,height:20,width:200});this[e[195]]=new qx[e[6]][e[140]].Widget()[e[117]]({decorator:null,backgroundColor:e[196],width:0});this[e[193]][e[33]](this.ZU);this[e[197]]=new qx[e[6]][e[170]].Label(e[173])[e[117]]({decorator:null,textAlign:e[198],width:200});this[e[193]][e[33]](this.ZX,{left:0,top:-3});C[e[33]](this.ZV);this[e[199]]=new qx[e[6]][e[48]].Button(this[e[10]][e[64]](e[200]))[e[117]]({minWidth:100,height:25,margin:5});this[e[199]][e[122]](e[189],function(){this[e[201]]=[];},this);C[e[33]](this.YZ);this[e[137]][4]=new qx[e[6]][e[48]].CheckBox(this[e[10]][e[64]](e[202]));this[e[137]][4][e[166]](5);this[e[137]][4][e[179]](e[169]);C[e[33]](this[e[137]][4],{lineBreak:true});this[e[203]]=new qx[e[6]][e[48]].SelectBox();this[e[203]][e[13]](150);this[e[203]][e[14]](25);this[e[203]][e[166]](5);var F=new qx[e[6]][e[48]].ListItem(e[204]+this[e[10]][e[64]](MaelstromTools[e[112]].Tiberium)+e[205]+this[e[10]][e[64]](MaelstromTools[e[112]].Crystal),null,7);this[e[203]][e[33]](F);F=new qx[e[6]][e[48]].ListItem(e[206]+this[e[10]][e[64]](MaelstromTools[e[112]].Tiberium)+e[207]+this[e[10]][e[64]](MaelstromTools[e[112]].Crystal),null,6);this[e[203]][e[33]](F);F=new qx[e[6]][e[48]].ListItem(e[208]+this[e[10]][e[64]](MaelstromTools[e[112]].Tiberium)+e[209]+this[e[10]][e[64]](MaelstromTools[e[112]].Crystal),null,5);this[e[203]][e[33]](F);C[e[33]](this.ZJ);this[e[210]]=new qx[e[6]][e[48]].Button(this[e[10]][e[64]](e[211]))[e[117]]({width:120,minWidth:120,maxWidth:120,height:25,margin:5});this[e[210]][e[122]](e[189],function(){var H=window[e[213]][e[212]][e[11]]();H[e[215]](this[e[10]][e[64]](e[214]));},this);this[e[210]][e[216]](false);C[e[33]](this.ZD);this[e[217]]=new qx[e[6]][e[165]].Composite();this[e[217]][e[27]](new qx[e[6]][e[26]].Flow());this[e[217]][e[13]](750);var A=webfrontend[e[219]][e[26]][e[218]][e[11]]();var y=2;for(y=2;y<this[e[35]][e[109]]();y++){var w=y-2;this[e[220]][w]=new qx[e[6]][e[48]].CheckBox(this[e[35]][e[221]](y));this[e[220]][w][e[181]](this[e[87]][e[108]]()[e[222]](y));this[e[220]][w][e[179]](e[169]);this[e[220]][w][e[223]]=y;this[e[220]][w][e[60]]=this[e[87]];this[e[220]][w][e[122]](e[182],function(H){var I=this[e[60]][e[108]]();I[e[111]](this[e[223]],H[e[125]]());Addons[e[51]][e[128]](e[110]+this[e[223]],H[e[125]]());});this[e[217]][e[33]](this[e[220]][w]);}this[e[224]]=new qx[e[6]][e[48]].Button(e[225])[e[117]]({margin:5});this[e[224]][e[122]](e[189],function(){if(this[e[226]]){C[e[227]](this.ZB,this.ZO);this[e[224]][e[153]](e[228]);}else{C[e[229]](this.ZB);this[e[224]][e[153]](e[225]);}this[e[226]]=!this[e[226]];},this);this[e[224]][e[231]](e[230]);C[e[33]](this.ZO,{lineBreak:true});this[e[232]]=C;}catch(E){console[e[37]](e[233],E);}},FD:function(){var v=ClientLib[e[86]][e[85]].GetInstance()[e[148]]();var t=v[e[147]]();var u=e[234];var w=new qx[e[6]][e[170]].Label()[e[117]]({value:u,rich:true,width:800});this[e[235]]=w;},FE:function(){var u=this[e[46]][e[237]]()[0][e[236]]();ClientLib[e[135]][e[134]].GetInstance().CenterGridPosition(u[e[238]](),u[e[239]]());ClientLib[e[135]][e[134]].GetInstance().Update();ClientLib[e[135]][e[134]].GetInstance().ViewUpdate();ClientLib[e[86]][e[85]].GetInstance()[e[148]]()[e[240]](u[e[52]]());if(this[e[241]]){var t=ClientLib[e[86]][e[244]][e[243]][e[242]];var y=g(t[e[245]],/this\.(.{6})=\(?\(?g>>8\)?\&.*d\+=f;this\.(.{6})=\(/,e[246],2);if(y!=null&&y[1][e[131]]==6){t[e[247]]=function(){return this[y[1]];};}else{console[e[249]](e[248]);}if(y!=null&&y[2][e[131]]==6){t[e[250]]=function(){return this[y[2]];};}else{console[e[249]](e[251]);}t=ClientLib[e[86]][e[244]][e[252]][e[242]];var x=g(t[e[245]],/100\){0,1};this\.(.{6})=Math.floor.*d\+=f;this\.(.{6})=\(/,e[253],2);if(x!=null&&x[1][e[131]]==6){t[e[247]]=function(){return this[x[1]];};}else{console[e[249]](e[254]);}if(x!=null&&x[2][e[131]]==6){t[e[250]]=function(){return this[x[2]];};}else{console[e[249]](e[255]);}t=ClientLib[e[86]][e[244]][e[256]][e[242]];var w=g(t[e[245]],/100\){0,1};this\.(.{6})=Math.floor.*this\.(.{6})=\(*g\>\>(22|0x16)\)*\&.*=-1;\}this\.(.{6})=\(/,e[257],4);if(w!=null&&w[1][e[131]]==6){t[e[247]]=function(){return this[w[1]];};}else{console[e[249]](e[258]);}if(w!=null&&w[2][e[131]]==6){t[e[259]]=function(){return this[w[2]];};}else{console[e[249]](e[260]);}if(w!=null&&w[4][e[131]]==6){t[e[250]]=function(){return this[w[4]];};}else{console[e[249]](e[261]);}this[e[241]]=false;}if(this[e[31]]==null){this[e[155]]=false;this[e[154]][e[153]](e[262]);this[e[210]][e[216]](false);window[e[264]](e[263],1000);return;}var v=0;for(i=0;i<this[e[31]][e[131]];i++){if(this[e[31]][i][1]==-1){v++;}}if(!this[e[155]]){this[e[154]][e[153]](e[262]);this[e[210]][e[216]](false);if(v>0){this[e[155]]=true;window[e[264]](e[265],1000);return;}else{this[e[155]]=false;window[e[264]](e[263],1000);}}else{this[e[155]]=false;this[e[154]][e[153]](this[e[10]][e[64]](e[152]));}},FP:function(v,u,t){if(this[e[195]]!=null&&this[e[197]]!=null){this[e[195]][e[13]](parseInt(v/u*t,10));this[e[197]][e[181]](v+e[266]+u);}},FJ:function(){try{this[e[267]]={};this[e[31]]=[];var N=this[e[46]][e[237]]()[0][e[236]]();Addons[e[51]][e[128]](e[49],N[e[52]]());var G=this[e[171]][e[237]]()[0][e[236]]();Addons[e[51]][e[128]](e[172],G);Addons[e[51]][e[128]](e[175],this[e[177]][e[136]]());var M=this[e[137]][0][e[136]]();var L=this[e[137]][1][e[136]]();var K=this[e[137]][2][e[136]]();var J=this[e[137]][3][e[136]]();var I=parseInt(this[e[177]][e[136]](),10);Addons[e[51]][e[128]](e[180],M);Addons[e[51]][e[128]](e[184],L);Addons[e[51]][e[128]](e[186],K);Addons[e[51]][e[128]](e[188],J);var F=N[e[238]]();var E=N[e[239]]();var H=0;var C=0;var B=ClientLib[e[86]][e[85]].GetInstance()[e[268]]();console[e[9]](e[269]+N[e[270]]());var A=true;var y=true;var w=true;var u=ClientLib[e[86]][e[85]].GetInstance()[e[272]]()[e[271]]();for(C=E-Math[e[161]](u+1);C<=E+Math[e[161]](u+1);C++){for(H=F-Math[e[161]](u+1);H<=F+Math[e[161]](u+1);H++){var t=Math[e[160]](F-H);var R=Math[e[160]](E-C);var Q=Math[e[273]]((t*t)+(R*R));if(Q<=u){var P=B.GetObjectFromPosition(H,C);var z={};if(P){if(P[e[274]]==1&&A){}if(P[e[274]]==2&&y){}if(P[e[274]]==3&&w){}if(P[e[274]]==3){if(I<=parseInt(P[e[247]](),10)){}}var x=N.CalculateAttackCommandPointCostToCoord(H,C);if(x<=G&&typeof P[e[247]]==e[275]){if(I<=parseInt(P[e[247]](),10)){var v=this.FL(P[e[250]](),0);var D=this.FL(P[e[250]](),1);if(D!=null){this[e[267]][P[e[250]]()]=D;}if(P[e[274]]==1&&M){if(v!=null){this[e[31]][e[276]](v);}else{this[e[31]][e[276]]([P[e[250]](),-1,this[e[10]][e[64]](e[178]),H+e[132]+C,P[e[247]](),0,0,0,0,0,0,0,0,x,0,0,0,0]);}}if(P[e[274]]==2&&L){if(v!=null){this[e[31]][e[276]](v);}else{this[e[31]][e[276]]([P[e[250]](),-1,this[e[10]][e[64]](e[183]),H+e[132]+C,P[e[247]](),0,0,0,0,0,0,0,0,x,0,0,0,0]);}}if(P[e[274]]==3&&(K||J)){if(v!=null){if(P[e[259]]()==2&&J){this[e[31]][e[276]](v);}if(P[e[259]]()==3&&K){this[e[31]][e[276]](v);}}else{if(P[e[259]]()==2&&J){this[e[31]][e[276]]([P[e[250]](),-1,this[e[10]][e[64]](e[187]),H+e[132]+C,P[e[247]](),0,0,0,0,0,0,0,0,x,0,0,0,0]);}if(P[e[259]]()==3&&K){this[e[31]][e[276]]([P[e[250]](),-1,this[e[10]][e[64]](e[185]),H+e[132]+C,P[e[247]](),0,0,0,0,0,0,0,0,x,0,0,0,0]);}}}}}}}}}this[e[155]]=true;this[e[35]][e[34]](this.ZE);this.FP(0,this[e[31]][e[131]],200);this[e[35]][e[277]](4,false);if(this[e[83]][e[278]]!=e[279]){window[e[264]](e[265],50);}}catch(O){console[e[37]](e[280],O);}},FG:function(){try{var u=false;var t=0;var X=10;var y=0;var R=150;while(!u){var Q=null;var O=0;var M=0;if(this[e[31]]==null){console[e[282]](e[281]);this[e[155]]=false;break;}for(y=0;y<this[e[31]][e[131]];y++){if(this[e[31]][y][1]==-1){break;}}if(y==this[e[31]][e[131]]){this[e[155]]=false;}this.FP(y,this[e[31]][e[131]],200);if(this[e[31]][y]==null){console[e[282]](e[283]);this[e[155]]=false;this[e[154]][e[153]](this[e[10]][e[64]](e[152]));this[e[210]][e[216]](true);break;}posData=this[e[31]][y][3];if(posData!=null&&posData[e[133]](e[132])[e[131]]==2){posX=parseInt(posData[e[133]](e[132])[0]);posY=parseInt(posData[e[133]](e[132])[1]);var K=ClientLib[e[86]][e[85]].GetInstance()[e[148]]()[e[147]]();var v=ClientLib[e[86]][e[85]].GetInstance()[e[268]]();var I=v.CheckFoundBase(posX,posY,K[e[284]](),K[e[285]]());this[e[31]][y][19]=(I==0)?true:false;M=this[e[31]][y][0];ClientLib[e[86]][e[85]].GetInstance()[e[148]]()[e[240]](M);Q=ClientLib[e[86]][e[85]].GetInstance()[e[148]]().GetCity(M);if(Q!=null){if(!Q[e[286]]()){var E=Q[e[287]]();if(E!=null){var T=this[e[46]][e[237]]()[0][e[236]]();var C=Q[e[289]]()[e[288]];var z=E[e[290]]()[e[288]];var w=T[e[287]]()[e[291]]()[e[288]];if(C!=null){var P=d(C);var L=d(z);this[e[31]][y][2]=Q[e[270]]();this[e[31]][y][5]=P[ClientLib[e[293]][e[292]][e[67]]]+L[ClientLib[e[293]][e[292]][e[67]]];this[e[31]][y][6]=P[ClientLib[e[293]][e[292]][e[68]]]+L[ClientLib[e[293]][e[292]][e[68]]];this[e[31]][y][7]=P[ClientLib[e[293]][e[292]][e[294]]]+L[ClientLib[e[293]][e[292]][e[294]]];this[e[31]][y][8]=P[ClientLib[e[293]][e[292]][e[295]]]+L[ClientLib[e[293]][e[292]][e[295]]];if(Q.GetBuildingsConditionInPercent()!=0){this[e[296]]=0;if(this[e[31]][y][5]!=0){var S=0;var J=0;var B=0;var H=0;var G=0;this[e[267]][M]=new Array(9);for(B=0;B<9;B++){this[e[267]][M][B]=new Array(8);}for(H=0;H<9;H++){for(G=0;G<8;G++){switch(Q.GetResourceType(H,G)){case 1:this[e[267]][M][H][G]=1;S++;break;case 2:this[e[267]][M][H][G]=2;J++;break;default:break;}}}this[e[31]][y][9]=S;this[e[31]][y][10]=J;this[e[31]][y][11]=Q.GetBuildingsConditionInPercent();this[e[31]][y][12]=Q.GetDefenseConditionInPercent();try{var F=w;var D=0;var A=0;for(var V in F){D+=F[V][e[297]]();}F=z;for(var V in F){A+=F[V][e[297]]();}F=C;for(var V in F){var U=F[V][e[298]]();if(U==158||U==131||U==195){this[e[31]][y][18]=8-F[V][e[299]]();}if(U==112||U==151||U==177){this[e[31]][y][17]=8-F[V][e[299]]();}}}catch(N){console[e[37]](e[300],N);}this[e[31]][y][14]=(A/D);this[e[31]][y][15]=this[e[31]][y][5]+this[e[31]][y][6]+this[e[31]][y][7];this[e[31]][y][16]=this[e[31]][y][15]/this[e[31]][y][13];this[e[31]][y][1]=0;u=true;console[e[9]](Q[e[270]](),e[301]);this[e[296]]=0;this[e[302]]=0;this.FK(this[e[31]][y],this[e[267]][M],M);this[e[35]][e[34]](this.ZE);}}else{if(this[e[296]]>250){console[e[9]](this[e[31]][y][2],e[303],posX,posY,e[304]);this[e[31]][e[305]](y,1);this[e[296]]=0;this[e[302]]=0;break;}this[e[296]]++;}}}}else{console[e[9]](this[e[31]][y][2],e[303],posX,posY,e[306]);this[e[31]][e[305]](y,1);break;}}}t++;if(t>=X){u=true;break;}}if(this[e[307]]!=y){this[e[307]]=y;this[e[302]]=0;this[e[296]]=0;}else{if(this[e[302]]>16){console[e[9]](this[e[31]][y][2],e[303],posX,posY,e[308]);this[e[31]][e[305]](y,1);this[e[302]]=0;}else{if(this[e[302]]>10){R=500;}else{if(this[e[302]]>4){R=250;}}}this[e[302]]++;}if(this[e[155]]&&Addons[e[121]][e[11]]()[e[41]]()){window[e[264]](e[265],R);}else{this[e[154]][e[153]](this[e[10]][e[64]](e[152]));this[e[155]]=false;}}catch(W){console[e[37]](e[309],W);}},FK:function(v,u,t){this[e[201]][e[276]](v);this[e[310]][t]=u;},FL:function(u,v){if(v==0){for(var t=0;t<this[e[201]][e[131]];t++){if(this[e[201]][t][0]==u){return this[e[201]][t];}}}else{if(this[e[310]][u]){return this[e[310]][u];}}return null;}}});qx[e[312]][e[311]](e[313],{type:e[3],extend:qx[e[6]][e[5]][e[4]],construct:function(){try{this[e[7]](arguments);console[e[9]](e[314]+window[e[0]]);this[e[13]](820);this[e[14]](400);this[e[15]](10);this[e[16]](false);this[e[17]](true);this[e[18]](true);this[e[19]](true);this[e[20]](true);this[e[21]](false);this[e[22]](true);this[e[23]](false);this[e[24]](null);this[e[25]](10);this[e[27]](new qx[e[6]][e[26]].Grow());this[e[315]]=[];this[e[32]]();this[e[201]]=new qx[e[6]][e[165]].Scroll();this[e[177]]=new qx[e[6]][e[165]].Composite(new qx[e[6]][e[26]].Flow());this[e[33]](this.ZZ,{flex:3});this[e[201]][e[33]](this.ZY);}catch(t){console[e[37]](e[316],t);}},members:{ZW:null,ZZ:null,ZY:null,ZX:null,openWindow:function(u){try{this[e[40]](u);if(this[e[41]]()){this[e[42]]();}else{this[e[55]]();this[e[56]](100,100);this.FO();}}catch(t){console[e[58]](e[317],t);}},FO:function(){var H=window[e[213]][e[121]][e[11]]()[e[267]];var F=window[e[213]][e[121]][e[11]]()[e[31]];this[e[197]]=[];var D=window[e[213]][e[121]][e[11]]()[e[203]][e[237]]()[0][e[236]]();var B=null;if(F==null){console[e[9]](e[318]);return;}this[e[315]]=[];var w;var u;var z;var y;var I;for(w in H){for(u=0;u<F[e[131]];u++){if(F[u][0]==w){B=F[u];}}if(B==null){continue;}if(D>4&&D<8){if(D!=B[10]){continue;}}else{continue;}posData=B[3];if(posData!=null&&posData[e[133]](e[132])[e[131]]==2){posX=parseInt(posData[e[133]](e[132])[0]);posY=parseInt(posData[e[133]](e[132])[1]);}var t=e[319];var G=B[2]+e[320]+B[3];t=t+e[321]+G+e[322];for(y=0;y<8;y++){t=t+e[323];for(z=0;z<9;z++){var E=e[173];var C=H[w][z][y];switch(C==undefined?0:C){case 2:E=e[324]+p[e[113]][MaelstromTools[e[112]][e[67]]]+e[325];break;case 1:E=e[324]+p[e[113]][MaelstromTools[e[112]][e[68]]]+e[325];break;default:E=e[324]+p[e[113]][e[326]]+e[325];break;}t=t+e[327]+E+e[328];}t=t+e[329];}t=t+e[330];var v=new qx[e[6]][e[170]].Label()[e[117]]({backgroundColor:e[331],value:t,rich:true});v[e[332]]=w;this[e[197]][e[276]](w);v[e[122]](e[333],function(L){var K=qx[e[140]][e[139]][e[138]]();K[e[142]]()[e[141]]();K[e[146]]()[e[145]](ClientLib[e[86]][e[144]][e[143]],this[e[332]],0,0);var J=ClientLib[e[86]][e[85]].GetInstance()[e[148]]()[e[147]]();if(J!=null){J[e[150]]()[e[149]](this[e[332]]);}});v[e[334]]=w;this[e[315]][e[276]](v);}this[e[177]][e[32]]();var A=0;var x=0;for(I=0;I<this[e[315]][e[131]];I++){this[e[177]][e[33]](this[e[315]][I],{row:A,column:x});x++;if(x>4){x=0;A++;}}}}});qx[e[312]][e[311]](e[335],{type:e[336],extend:qx[e[140]][e[53]],statics:{isSupported:function(){return typeof(localStorage)!==e[337];},isdefined:function(t){return(localStorage[t]!==e[337]&&localStorage[t]!=null);},isdefineddata:function(u,t){return(u[t]!==e[337]&&u[t]!=null);},setglobal:function(v,t){try{if(Addons[e[51]][e[338]]()){localStorage[v]=JSON[e[339]](t);}}catch(u){console[e[37]](e[340],u);}},getglobal:function(v,u){try{if(Addons[e[51]][e[338]]()){if(Addons[e[51]][e[341]](v)){return JSON[e[342]](localStorage[v]);}}}catch(t){console[e[58]](e[343],t);}return u;},setserver:function(w,t){try{if(Addons[e[51]][e[338]]()){var v=ClientLib[e[86]][e[85]].GetInstance()[e[272]]()[e[270]]();var x;if(Addons[e[51]][e[341]](v)){try{x=JSON[e[342]](localStorage[v]);if(!(typeof x===e[344])){x={};console[e[37]](e[345]);}}catch(u){console[e[37]](e[346],u);x={};}}else{x={};}x[w]=t;localStorage[v]=JSON[e[339]](x);}}catch(u){console[e[37]](e[347],u);}},getserver:function(w,v){try{if(Addons[e[51]][e[338]]()){var u=ClientLib[e[86]][e[85]].GetInstance()[e[272]]()[e[270]]();if(Addons[e[51]][e[341]](u)){var x=JSON[e[342]](localStorage[u]);if(Addons[e[51]][e[348]](x,w)){return x[w];}}}}catch(t){console[e[58]](e[349],t);}return v;}}});if(typeof Addons[e[12]]===e[337]){qx[e[312]][e[311]](e[350],{type:e[3],extend:qx[e[140]][e[53]],members:{d:{},debug:false,addtranslateobj:function(t){if(t[e[352]](e[351])){this[e[288]][t[e[351]].toString()]=t;if(this[e[37]]){console[e[58]](e[353],t[e[351]].toString());}delete t[e[351]];}else{console[e[37]](e[354]);}},get:function(v){var u=qx[e[357]][e[356]][e[11]]()[e[355]]();var t=u[e[133]](e[358])[0];if(this[e[288]][e[352]](v)){if(this[e[288]][v][e[352]](t)){return this[e[288]][v][t];}}if(this[e[37]]){console[e[37]](e[359],v,e[360],t);}return v;}}});}qx[e[312]][e[311]](e[361],{extend:qx[e[6]][e[60]][e[118]][e[362]],properties:{replaceMap:{check:e[53],nullable:true,init:null},replaceFunction:{check:e[363],nullable:true,init:null}},members:{_getContentHtml:function(w){var x=w[e[364]];var v=this[e[365]]();var u=this[e[366]]();var t;if(v){t=v[x];if(typeof t!=e[337]){w[e[364]]=t;return qx[e[369]][e[368]][e[367]](this._formatValue(w));}}if(u){w[e[364]]=u(x);}return qx[e[369]][e[368]][e[367]](this._formatValue(w));},addReversedReplaceMap:function(){var t=this[e[365]]();for(var v in t){var u=t[v];t[u]=v;}return true;}}});console[e[9]](e[370]);var s=Addons[e[12]][e[11]]();s[e[37]]=false;s[e[373]]({main:e[371],de:e[372],pt:e[372],fr:e[372]});s[e[373]]({main:e[374],de:e[375],pt:e[376],fr:e[377]});s[e[373]]({main:e[152],de:e[378],pt:e[379],fr:e[380]});s[e[373]]({main:e[65],de:e[381],pt:e[382],fr:e[383]});s[e[373]]({main:e[178],de:e[384],pt:e[385],fr:e[386]});s[e[373]]({main:e[183],de:e[183],pt:e[183],fr:e[183]});s[e[373]]({main:e[387],de:e[388],pt:e[389],fr:e[390]});s[e[373]]({main:e[187],de:e[391],pt:e[187],fr:e[187]});s[e[373]]({main:e[185],de:e[392],pt:e[393],fr:e[394]});s[e[373]]({main:e[214],de:e[214],pt:e[395],fr:e[396]});s[e[373]]({main:e[397],de:e[398],pt:e[399],fr:e[400]});s[e[373]]({main:e[73],de:e[401],pt:e[402],fr:e[403]});s[e[373]]({main:e[74],de:e[404],pt:e[405],fr:e[406]});s[e[373]]({main:e[75],de:e[407],pt:e[75],fr:e[75]});s[e[373]]({main:e[168],de:e[408],pt:e[409],fr:e[410]});s[e[373]]({main:e[174],de:e[411],pt:e[412],fr:e[413]});s[e[373]]({main:e[200],de:e[414],pt:e[415],fr:e[416]});s[e[373]]({main:e[202],de:e[417],pt:e[418],fr:e[419]});s[e[373]]({main:e[81],de:e[420],pt:e[421],fr:e[422]});s[e[373]]({main:e[423],de:e[424],pt:e[425],fr:e[424]});s[e[373]]({main:e[426],de:e[427],pt:e[428],fr:e[429]});s[e[373]]({main:e[430],de:e[431],pt:e[432],fr:e[433]});s[e[373]]({main:e[67],de:e[67],pt:e[434],fr:e[67]});s[e[373]]({main:e[68],de:e[435],pt:e[436],fr:e[436]});s[e[373]]({main:e[437],de:e[438],pt:e[439],fr:e[440]});s[e[373]]({main:e[69],de:e[441],pt:e[442],fr:e[443]});s[e[373]]({main:e[70],de:e[444],pt:e[445],fr:e[446]});s[e[373]]({main:e[447],de:e[448],pt:e[448],fr:e[448]});var r=null;var q=null;var p=null;var o=null;var n=0;var m=0;o=ClientLib[e[450]][e[449]].GetInstance();r=window[e[45]][e[12]][e[11]]();q=window[e[45]][e[44]][e[11]]();p=window[e[45]][e[293]][e[11]]();p[e[453]](e[451],e[452],o);p[e[453]](e[326],e[454],o);var l=p[e[457]](s[e[64]](e[374])+e[455]+window[e[0]],e[451],false,p[e[456]](2));l[e[122]](e[189],function(){Addons[e[121]][e[11]]()[e[215]](s[e[64]](e[374])+e[458]+window[e[0]]);},this);Addons[e[121]][e[11]]()[e[122]](e[42],Addons[e[121]][e[11]]().FN,Addons[e[121]][e[11]]());p[e[459]](e[451],l);if(typeof Addons[e[460]]!==e[337]){var k=Addons[e[460]][e[11]]();k.AddMainMenu(e[461],function(){Addons[e[121]][e[11]]()[e[215]](s[e[64]](e[374])+e[458]+window[e[0]]);},e[462]);}}function d(o){try{var q=[0,0,0,0,0,0,0,0];if(o==null){return q;}for(var l in o){var n=o[l];var m=MaelstromTools[e[463]].GetUnitLevelRequirements(n);for(var k=0;k<m[e[131]];k++){q[m[k][e[274]]]+=m[k][e[464]]*n[e[465]]();if(n[e[465]]()<1){}}}return q;}catch(p){console[e[37]](e[466],p);}}function f(k){var m;for(m in k){if(typeof(k[m])==e[275]){var l=k[m].toString();console[e[37]](m,l);}}}function g(k,r,q,m){var p=[];var o=k.toString();var n=o[e[467]](/\s/gim,e[173]);p=n[e[468]](r);var l;for(l=1;l<(m+1);l++){if(p!=null&&p[l][e[131]]==6){console[e[37]](q,l,p[l]);}else{if(p!=null&&p[l][e[131]]>0){console[e[282]](q,l,p[l]);}else{console[e[249]](e[469],q,l,e[470]);console[e[282]](q,n);}}}return p;}function h(){try{if(typeof qx!=e[337]&&typeof MaelstromTools!=e[337]){j();}else{window[e[264]](h,1000);}}catch(k){console[e[37]](e[471],k);}}if(/commandandconquer\.com/i[e[473]](document[e[472]])){window[e[264]](h,10000);}};try{var a=document.createElement("script");a.innerHTML="("+b.toString()+")();";a.type="text/javascript";if(/commandandconquer\.com/i.test(document.domain)){document.getElementsByTagName("head")[0].appendChild(a);}}catch(c){console.debug("MaelstromTools_Basescanner: init error: ",c);}}
)();

/***********************************************************************************
CCTA Zoom (KOMMANDO)
***********************************************************************************/

(function (){
  var tazoom_main = function() {
    function initialize() {
      console.log("Zoom Loaded");
      
      var zoomMin = 2.0;	// Larger number means able to zoom in closer.
      var zoomMax = 0.1;	// Smaller number means able to zoom out further.
      var zoomInc = 0.08;	// Larger number for faster zooming, Smaller number for slower zooming.
      
      webfrontend.gui.BackgroundArea.prototype.onHotKeyPress = function(be) {
        if(!this.active || be.getTarget() != this.mapContainer)
          return;
        var bh = be.getKeyIdentifier();
        var bf = ClientLib.Vis.VisMain.GetInstance();
        switch(bh) {
          case "+":
            var bg = bf.get_Region().get_ZoomFactor() + zoomInc;
            bf.get_Region().set_ZoomFactor(Math.min(zoomMin, Math.max(zoomMax, bg)));
            break;
          case "-":
            var bg = bf.get_Region().get_ZoomFactor() - zoomInc;
            bf.get_Region().set_ZoomFactor(Math.min(zoomMin, Math.max(zoomMax, bg)));
            break;
        }
        this.closeCityInfo();
        this.closeCityList();
      }

      var backgroundArea = qx.core.Init.getApplication().getBackgroundArea();
      qx.bom.Element.removeListener(backgroundArea.mapContainer, "mousewheel", backgroundArea._onMouseWheel, backgroundArea);
      qx.bom.Element.removeListener(backgroundArea.mapBlocker, "mousewheel", backgroundArea._onMouseWheel, backgroundArea);
      webfrontend.gui.BackgroundArea.prototype._onMouseWheel = function(e) {
        if(this.activeSceneView == null)
          return;
        var bz = e.getWheelDelta();
        var by = this.activeSceneView.get_ZoomFactor();
        by += bz > 0 ? -zoomInc : zoomInc;
        by = Math.min(zoomMin, Math.max(zoomMax, by));
        this.activeSceneView.set_ZoomFactor(by);
        e.stop();
      }
      qx.bom.Element.addListener(backgroundArea.mapContainer, "mousewheel", backgroundArea._onMouseWheel, backgroundArea);
      qx.bom.Element.addListener(backgroundArea.mapBlocker, "mousewheel", backgroundArea._onMouseWheel, backgroundArea); 
    }
 
    function tazoom_checkIfLoaded() {
      try {
        if (typeof qx != 'undefined') {
          a = qx.core.Init.getApplication(); // application
          mb = qx.core.Init.getApplication().getMenuBar();
          if (a && mb) {
            initialize();
          } else
            window.setTimeout(tazoom_checkIfLoaded, 1000);
        } else {
          window.setTimeout(tazoom_checkIfLoaded, 1000);
        }
      } catch (e) {
        if (typeof console != 'undefined') console.log(e);
        else if (window.opera) opera.postError(e);
        else GM_log(e);
      }
    }
    
    if (/commandandconquer\.com/i.test(document.domain)) {
      window.setTimeout(tazoom_checkIfLoaded, 1000);
    }
  }

  // injecting, because there seem to be problems when creating game interface with unsafeWindow
  var tazoomScript = document.createElement("script");
  tazoomScript.innerHTML = "(" + tazoom_main.toString() + ")();";
  tazoomScript.type = "text/javascript";
  if (/commandandconquer\.com/i.test(document.domain)) {
    document.getElementsByTagName("head")[0].appendChild(tazoomScript);
  }
})();


// ==UserScript==
// @name           CENTER DRIVEN CDSIM Combat Simulator for Command and Conquer Tiberium Alliances
// @description     CENTER DRIVEN's Combat Simulator and Combat Stats
// @author          XDAAST.XDaast.daltondaast.KingCrimson
// @version         5.0
// @namespace      https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @include         https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @icon            http://i.imgur.com/qSgClQp.png
// @updateURL       https://userscripts.org/scripts/source/173566.meta.js
// @downloadURL     https://userscripts.org/scripts/source/173566.user.js
// @grant           GM_getValue
// @grant           GM_log
// @grant           GM_openInTab
// @grant           GM_registerMenuCommand
// @grant           GM_setValue
// @grant           GM_xmlhttpRequest
// ==/UserScript==
(function(){var r=document.createElement("script");r.innerHTML="("+function(){function r(){qx.Class.define("Simulator",{type:"singleton",extend:qx.core.Object,construct:function(){try{this.armyBar=qx.core.Init.getApplication().getArmySetupAttackBar();this.playArea=qx.core.Init.getApplication().getMainOverlay();this.replayBar=qx.core.Init.getApplication().getReportReplayOverlay();this.isSimButtonDisabled=!1;this.armyTempFormations=[];this.armyTempIdx=0;this.isSimulation=!1;this.hideArmyTooltips();
var b;this.simBtn=(new qx.ui.form.Button("","http://i.imgur.com/P7hf5CG.png")).set({toolTipText:"<center>SIMULTE BATTLE!</center><br>Note: update loot table with 'Update' button in stats window.",width:72,height:56,alignY:"middle",appearance:"button-text-small"});this.simBtn.addListener("click",function(){this.__openSimulatorWindow()},this);this.simBtn.getChildControl("icon").set({width:45,height:45,scale:!0});this.simBtn.hide();this.playArea.add(this.simBtn,{left:null,right:3,bottom:161});this.statBtn=
(new qx.ui.form.Button("","http://icons.iconarchive.com/icons/kyo-tux/phuzion/16/Misc-Stats-icon.png")).set({toolTipText:"STATS MENU OF GLORY",width:25,height:25,alignY:"middle",appearance:"button-text-small"});this.statBtn.getChildControl("icon").set({width:15,height:15,scale:!0});this.statBtn.addListener("click",function(){this.__openStatWindow()},this);this.statBtn.hide();this.playArea.add(this.statBtn,{left:null,right:34,bottom:412});this.optionBtn=(new qx.ui.form.Button("","http://files.softicons.com/download/folder-icons/classy-folder-icons-by-gurato/png/48/Black%20Grey%20Options.png")).set({toolTipText:"THE OPTIONS BRO",
width:45,height:45,alignY:"middle",appearance:"button-text-small"});this.optionBtn.addListener("click",function(){this.__openOptionWindow()},this);this.optionBtn.getChildControl("icon").set({width:45,height:45,scale:!0});this.optionBtn.hide();this.playArea.add(this.optionBtn,{left:null,right:3,bottom:365});this.layoutBtn=(new qx.ui.form.Button("","http://www.bridge4events.com/img/icon_save_small.png")).set({toolTipText:"YOUR PRETTY LAYOUTS, GET 'em SAVED",width:25,height:25,alignY:"middle",appearance:"button-text-small"});
this.layoutBtn.getChildControl("icon").set({width:15,height:15,scale:!0});this.layoutBtn.addListener("click",function(){this.__openLayoutWindow()},this);this.layoutBtn.hide();this.playArea.add(this.layoutBtn,{left:null,right:3,bottom:412});this.unlockCmtBtn=(new qx.ui.form.Button("Unlock")).set({toolTipText:"UNLOCK MOFO!",width:50,height:50,opacity:0.7,alignY:"middle",appearance:"button-text-small"});this.unlockCmtBtn.addListener("click",function(){this.timeoutCmtBtn()},this);this.armyBar.add(this.unlockCmtBtn,
{left:null,right:7,bottom:5});this.unlockRTBtn=(new qx.ui.form.Button("Unlock")).set({toolTipText:"REPAIR YOUR SH!T",width:50,height:50,opacity:0.7,alignY:"middle",appearance:"button-text-small"});this.unlockRTBtn.addListener("click",function(){this.timeoutRTBtn()},this);this.armyBar.add(this.unlockRTBtn,{left:null,right:7,bottom:97});this.shiftUpBtn=(new qx.ui.form.Button("","http://i.imgur.com/szCZWiX.png")).set({toolTipText:"Shifts all units one space up",width:20,height:20,alignY:"middle",appearance:"button-text-small",
gap:0,iconPosition:"top",show:"icon"});this.shiftUpBtn.addListener("click",function(){this.shiftFormation("u",0)},this);this.shiftUpBtn.hide();this.playArea.add(this.shiftUpBtn,{left:null,right:19.5,bottom:244.5});this.shiftDownBtn=(new qx.ui.form.Button("","http://i.imgur.com/l8QEk8v.png")).set({toolTipText:"Shifts all units one space down",width:20,height:20,alignY:"middle",appearance:"button-text-small",gap:0,iconPosition:"top",show:"icon"});this.shiftDownBtn.addListener("click",function(){this.shiftFormation("d",
0)},this);this.shiftDownBtn.hide();this.playArea.add(this.shiftDownBtn,{left:null,right:19.5,bottom:217});this.shiftLeftBtn=(new qx.ui.form.Button("","http://i.imgur.com/M8WP7gO.png")).set({toolTipText:"Shifts all units one space left",width:20,height:20,alignY:"middle",appearance:"button-text-small",gap:0,iconPosition:"top",show:"icon"});this.shiftLeftBtn.addListener("click",function(){this.shiftFormation("l",0)},this);this.shiftLeftBtn.hide();this.playArea.add(this.shiftLeftBtn,{left:null,right:40,
bottom:231});this.shiftRightBtn=(new qx.ui.form.Button("","http://i.imgur.com/tWbWFx5.png")).set({toolTipText:"Shifts all units one space right",width:20,height:20,alignY:"middle",appearance:"button-text-small",gap:0,iconPosition:"top",show:"icon"});this.shiftRightBtn.addListener("click",function(){this.shiftFormation("r",0)},this);this.shiftRightBtn.hide();this.playArea.add(this.shiftRightBtn,{left:null,right:3,bottom:231});for(b=0;b<ClientLib.Base.Util.get_ArmyMaxSlotCountY();b++){var a=(new qx.ui.form.Button(b+
1,"http://i.imgur.com/M8WP7gO.png")).set({toolTipText:"Shifts units one space left",width:25,maxHeight:25,alignY:"middle",show:"icon",iconPosition:"top"});a.addListener("click",function(a){this.shiftFormation("l",parseInt(a.getTarget().getLabel(),10))},this);var c=(new qx.ui.form.Button(b+1,"http://i.imgur.com/tWbWFx5.png")).set({toolTipText:"Shifts units one space right",width:30,maxHeight:25,alignY:"middle",show:"icon",iconPosition:"top"});c.addListener("click",function(a){this.shiftFormation("r",
parseInt(a.getTarget().getLabel(),10))},this);var e=this.armyBar.getChildren()[1].getChildren()[b+4];e.removeAll();e.setLayout(new qx.ui.layout.HBox);e.add(new qx.ui.core.Spacer,{flex:1});e.add(a);e.add(c);e.add(new qx.ui.core.Spacer,{flex:1})}this.mirrorBtnH=(new qx.ui.form.Button("","http://i.imgur.com/C4lkEXo.png")).set({toolTipText:"FLIP",show:"icon",width:25,height:25,center:!0,alignY:"middle",appearance:"button-text-small"});this.mirrorBtnH.getChildControl("icon").set({width:15,height:15,scale:!0});
this.mirrorBtnH.addListener("click",function(){this.mirrorFormation("h")},this);this.mirrorBtnH.hide();this.playArea.add(this.mirrorBtnH,{left:null,right:3,bottom:314.5});this.mirrorBtnV=(new qx.ui.form.Button("","http://i.imgur.com/BVv4yNC.png")).set({toolTipText:"MIRROR",show:"icon",width:25,height:25,center:!0,alignY:"middle",appearance:"button-text-small"});this.mirrorBtnV.getChildControl("icon").set({width:15,height:15,scale:!0});this.mirrorBtnV.addListener("click",function(){this.mirrorFormation("v")},
this);this.mirrorBtnV.hide();this.playArea.add(this.mirrorBtnV,{left:null,right:30,bottom:314.5});this.mirrorBtnC=(new qx.ui.form.Button("3-4","http://i.imgur.com/RnZ5xAV.png")).set({toolTipText:"F*CKIN FLIPS LINES 3&4",show:"icon",width:25,height:25,center:!0,alignY:"middle",appearance:"button-text-small"});this.mirrorBtnC.getChildControl("icon").set({width:20,height:20,scale:!0});this.mirrorBtnC.addListener("click",function(){this.mirrorFormation("c")},this);this.mirrorBtnC.hide();this.playArea.add(this.mirrorBtnC,
{left:null,right:3,bottom:264.5});this.mirrorBtnK=(new qx.ui.form.Button("1-2","http://i.imgur.com/4I26GXE.png")).set({toolTipText:"F*CKIN FLIPS LINES 1&2  ",show:"icon",width:25,height:25,center:!0,alignY:"middle",appearance:"button-text-small"});this.mirrorBtnK.getChildControl("icon").set({width:20,height:20,scale:!0});this.mirrorBtnK.addListener("click",function(){this.swapFormation("k")},this);this.mirrorBtnK.hide();this.playArea.add(this.mirrorBtnK,{left:null,right:18.5,bottom:289.5});this.mirrorBtnU=
(new qx.ui.form.Button("2-3","http://i.imgur.com/HsvpgzJ.png")).set({toolTipText:"F*CKIN FLIPS LINES 2&3  ",show:"icon",width:25,height:25,center:!0,alignY:"middle",appearance:"button-text-small"});this.mirrorBtnU.getChildControl("icon").set({width:20,height:20,scale:!0});this.mirrorBtnU.addListener("click",function(){this.swapFormationz("z")},this);this.mirrorBtnU.hide();this.playArea.add(this.mirrorBtnU,{left:null,right:35,bottom:264.5});this.disableAllUnitsBtn=(new qx.ui.form.Button("","http://i.imgur.com/wx8hitZ.png")).set({toolTipText:"ENABLE/DISABLE ALL",
show:"icon",width:25,height:25,center:!0,alignY:"middle",appearance:"button-text-small"});this.disableAllUnitsBtn.getChildControl("icon").set({width:15,height:15,scale:!0});this.disableAllUnitsBtn.addListener("click",function(){this.shiftFormation("n",0)},this);this.disableAllUnitsBtn.hide();this.playArea.add(this.disableAllUnitsBtn,{left:null,right:30,bottom:339.5});this.armyUndoBtn=(new qx.ui.form.Button("","FactionUI/icons/icon_refresh_funds.png")).set({toolTipText:"Undo's formation to previous saved formation.<br>Save formations by hitting<br>the Update or Simulate button.",
show:"icon",width:25,height:25,center:!0,alignY:"middle",appearance:"button-text-small"});this.armyUndoBtn.getChildControl("icon").set({width:15,height:15,scale:!0});this.armyUndoBtn.addListener("click",function(){this.undoCurrentFormation()},this);this.armyUndoBtn.setEnabled(!1);this.armyUndoBtn.hide();this.playArea.add(this.armyUndoBtn,{left:null,right:3,bottom:339.5});this.quickSaveBtn=(new qx.ui.form.Button("","http://www.iconattitude.com/icons/open_icon_library/actions/png/16/document-save-3.png")).set({toolTipText:"Saves the current layout<br>without having to open<br>the Formation Saver window.<br>Does not make persistent.",
width:15,height:25,alignY:"middle",appearance:"button-text-small"});this.quickSaveBtn.getChildControl("icon").set({width:15,height:15,scale:!0});this.quickSaveBtn.addListener("click",function(){Simulator.LayoutWindow.getInstance().saveNewLayout(!0)},this);this.quickSaveBtn.hide();this.playArea.add(this.quickSaveBtn,{left:null,right:3,bottom:136});this.backBtn=(new qx.ui.form.Button("Back")).set({toolTipText:"Return to Combat Setup",width:50,height:24,appearance:"button-text-small"});this.backBtn.addListener("click",
function(){this.backToCombatSetup()},this);this.replayBar.add(this.backBtn,{top:37,left:255});this.replayStatBtn=(new qx.ui.form.Button("Stats")).set({toolTipText:"Return to Combat Setup",width:50,height:24,appearance:"button-text-small"});this.replayStatBtn.addListener("click",function(){this.__openStatWindow()},this);this.replayBar.add(this.replayStatBtn,{top:7,left:255})}catch(d){console.log("Error setting up Simulator Constructor: "),console.log(d.toString())}},destruct:function(){},members:{armyBar:null,
playArea:null,replayBar:null,isSimButtonDisabled:null,armyTempFormations:null,armyTempIdx:null,isSimulation:null,simBtn:null,optionBtn:null,statBtn:null,layoutBtn:null,unlockCmtBtn:null,unlockRTBtn:null,shiftUpBtn:null,shiftDownBtn:null,shiftLeftBtn:null,shiftRightBtn:null,disableAllUnitsBtn:null,armyUndoBtn:null,quickSaveBtn:null,backBtn:null,replayStatBtn:null,__openSimulatorWindow:function(){var b=ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();if(null!=b){var a=ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
this.isSimulation=!0;this.saveTempFormation();localStorage.ta_sim_last_city=b.get_Id();a.get_CityArmyFormationsManager().set_CurrentTargetBaseId(b.get_Id());ClientLib.API.Battleground.GetInstance().SimulateBattle();qx.core.Init.getApplication().getPlayArea().setView(ClientLib.Data.PlayerAreaViewMode.pavmCombatReplay,b.get_Id(),0,0);b=localStorage.autoSimulate;if(void 0!==b&&"yes"==b){var c=localStorage.simulateSpeed;setTimeout(function(){var a=ClientLib.Vis.VisMain.GetInstance().get_Battleground();
a.RestartReplay();a.set_ReplaySpeed(parseInt(c,10))},1E3)}!1==this.isSimButtonDisabled&&(this.disableSimulateButtonTimer(1E4),"function"===typeof Simulator.StatWindow.getInstance().disableSimulateStatButtonTimer&&Simulator.StatWindow.getInstance().disableSimulateStatButtonTimer(1E4));setTimeout(function(){var a=ClientLib.Vis.VisMain.GetInstance().get_Battleground().get_BattleDuration(),a=phe.cnc.Util.getTimespanString(a);Simulator.StatWindow.getInstance().sim[Simulator.StatWindow.getInstance().simSelected].Label.Battle.Duration.setValue(a)},
10);!1==Simulator.StatWindow.getInstance().simReplayBtn.getEnabled()&&Simulator.StatWindow.getInstance().simReplayBtn.setEnabled(!0)}},__openOptionWindow:function(){try{Simulator.OptionWindow.getInstance().isVisible()?(console.log("Closing Option Window"),Simulator.OptionWindow.getInstance().close()):(console.log("Opening Option Window"),Simulator.OptionWindow.getInstance().open())}catch(b){console.log("Error Opening or Closing Option Window"),console.log(b.toString())}},__openStatWindow:function(){try{Simulator.StatWindow.getInstance().isVisible()?
(console.log("Closing Stat Window"),Simulator.StatWindow.getInstance().close()):(console.log("Opening Stat Window"),Simulator.StatWindow.getInstance().open(),Simulator.StatWindow.getInstance().calcResources())}catch(b){console.log("Error Opening or Closing Stat Window"),console.log(b.toString())}},__openLayoutWindow:function(){try{Simulator.LayoutWindow.getInstance().isVisible()?(console.log("Closing Layout Window"),Simulator.LayoutWindow.getInstance().close()):(console.log("Opening LayoutWindow"),
Simulator.LayoutWindow.getInstance().updateLayoutList(),Simulator.LayoutWindow.getInstance().layoutTextBox.setValue(""),Simulator.LayoutWindow.getInstance().persistentCheck.setValue(!1),Simulator.LayoutWindow.getInstance().open())}catch(b){console.log("Error Opening or Closing Layout Window"),console.log(b.toString())}},saveTempFormation:function(){try{var b=this.getCityPreArmyUnits().get_ArmyUnits().l;if(0!=this.armyTempFormations.length)for(var a=0;a<b.length;a++){var c=this.armyTempFormations[this.armyTempIdx][a];
if(b[a].get_CoordX()!=c.x||b[a].get_CoordY()!=c.y)break;else if(a+1==b.length)return}c=[];for(a=0;a<b.length;a++){var e=b[a],d={};d.x=e.get_CoordX();d.y=e.get_CoordY();d.id=e.get_Id();d.enabled=e.get_Enabled();c.push(d)}this.armyTempFormations.push(c);this.armyTempIdx=this.armyTempFormations.length-1;1<this.armyTempFormations.length&&this.armyUndoBtn.setEnabled(!0)}catch(g){console.log("Error Saving Temp Formation"),console.log(g.toString())}},undoCurrentFormation:function(){try{this.restoreFormation(this.armyTempFormations[this.armyTempIdx-
1]),this.armyTempFormations.splice(this.armyTempIdx,1),this.armyTempIdx--,1==this.armyTempFormations.length&&this.armyUndoBtn.setEnabled(!1)}catch(b){console.log("Error undoing formation"),console.log(b.toString())}},mirrorFormation:function(b){try{console.log("Shifting Unit Formation");for(var a=this.getCityPreArmyUnits().get_ArmyUnits().l,c=[],e=0;e<a.length;e++){var d=a[e],g={},k=d.get_CoordX(),f=d.get_CoordY();"h"==b&&(k=Math.abs(k-8));"v"==b&&(f=Math.abs(f-3));"c"==b&&(f=Math.abs(f-5));g.x=k;
g.y=f;g.id=d.get_Id();g.enabled=d.get_Enabled();c.push(g)}this.restoreFormation(c)}catch(h){console.log("Error Mirroring Formation"),console.log(h.toString())}},swapFormation:function(b,a){try{console.log("Swaping Unit Formation: direction:"+b+", sel:"+a);var c=0,e=0;"z"==b&&(c=2);"k"==b&&(c=1);"l"==b&&(e=-1);"r"==b&&(e=1);if(0!=c||0!=e||"n"==b){for(var d=this.getCityPreArmyUnits().get_ArmyUnits().l,g=[],k=0;k<d.length;k++){var f=d[k],h={},n=f.get_CoordX()+e;switch(n){case 9:n=0;break;case -1:n=8}var l=
f.get_CoordY()+c;switch(l){case 2:l=0;break;case 3:l=2;break;case -1:l=3}0==a||f.get_CoordX()==a-1||"u"!=b&&"d"!=b?h.y=l:h.y=f.get_CoordY();0==a||f.get_CoordY()==a-1||"l"!=b&&"r"!=b?h.x=n:h.x=f.get_CoordX();h.id=f.get_Id();"n"==b&&(h.enabled=void 0!==localStorage.allUnitsDisabled?"yes"==localStorage.allUnitsDisabled?f.set_Enabled(!0):f.set_Enabled(!1):f.set_Enabled(!1));h.enabled=f.get_Enabled();g.push(h)}"n"==b&&(localStorage.allUnitsDisabled="yes"==localStorage.allUnitsDisabled?"no":"yes");this.restoreFormation(g)}}catch(m){console.log("Error Swapping Units"),
console.log(m.toString())}},swapFormationz:function(b,a){try{console.log("Swaping Unit Formation: direction:"+b+", sel:"+a);var c=0,e=0;"z"==b&&(c=2);"k"==b&&(c=1);"l"==b&&(e=-1);"r"==b&&(e=1);if(0!=c||0!=e||"n"==b){for(var d=this.getCityPreArmyUnits().get_ArmyUnits().l,g=[],k=0;k<d.length;k++){var f=d[k],h={},n=f.get_CoordX()+e;switch(n){case 9:n=0;break;case -1:n=8}var l=f.get_CoordY()+c;switch(l){case 2:l=0;break;case 3:l=2;break;case 4:l=1;break;case -1:l=3}0==a||f.get_CoordX()==a-1||"u"!=b&&
"d"!=b?h.y=l:h.y=f.get_CoordY();0==a||f.get_CoordY()==a-1||"l"!=b&&"r"!=b?h.x=n:h.x=f.get_CoordX();h.id=f.get_Id();"n"==b&&(h.enabled=void 0!==localStorage.allUnitsDisabled?"yes"==localStorage.allUnitsDisabled?f.set_Enabled(!0):f.set_Enabled(!1):f.set_Enabled(!1));h.enabled=f.get_Enabled();g.push(h)}"n"==b&&(localStorage.allUnitsDisabled="yes"==localStorage.allUnitsDisabled?"no":"yes");this.restoreFormation(g)}}catch(m){console.log("Error Swapping Units"),console.log(m.toString())}},shiftFormation:function(b,
a){try{console.log("Shifting Unit Formation: direction:"+b+", sel:"+a);var c=0,e=0;"u"==b&&(c=-1);"d"==b&&(c=1);"l"==b&&(e=-1);"r"==b&&(e=1);if(0!=c||0!=e||"n"==b){for(var d=this.getCityPreArmyUnits().get_ArmyUnits().l,g=[],k=0;k<d.length;k++){var f=d[k],h={},n=f.get_CoordX()+e;switch(n){case 9:n=0;break;case -1:n=8}var l=f.get_CoordY()+c;switch(l){case 4:l=0;break;case -1:l=3}0==a||f.get_CoordX()==a-1||"u"!=b&&"d"!=b?h.y=l:h.y=f.get_CoordY();0==a||f.get_CoordY()==a-1||"l"!=b&&"r"!=b?h.x=n:h.x=f.get_CoordX();
h.id=f.get_Id();"n"==b&&(h.enabled=void 0!==localStorage.allUnitsDisabled?"yes"==localStorage.allUnitsDisabled?f.set_Enabled(!0):f.set_Enabled(!1):f.set_Enabled(!1));h.enabled=f.get_Enabled();g.push(h)}"n"==b&&(localStorage.allUnitsDisabled="yes"==localStorage.allUnitsDisabled?"no":"yes");this.restoreFormation(g)}}catch(m){console.log("Error Shifting Units"),console.log(m.toString())}},restoreFormation:function(b){try{for(var a=this.getCityPreArmyUnits(),c=a.get_ArmyUnits().l,e=0;e<b.length;e++)for(var d=
b[e],g=d.id,k=0;k<c.length;k++)c[k].get_Id()===g&&(c[k].MoveBattleUnit(d.x,d.y),void 0===d.enabled?c[k].set_Enabled(!0):c[k].set_Enabled(d.enabled));a.UpdateFormation(!0)}catch(f){console.log("Error Restoring Formation"),console.log(f.toString())}},getCityPreArmyUnits:function(){var b=ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity(),a=ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity(),c=a.get_CityArmyFormationsManager();a.get_CityArmyFormationsManager().set_CurrentTargetBaseId(b.get_Id());
return c.GetFormationByTargetBaseId(c.get_CurrentTargetBaseId())},timeoutCmtBtn:function(){this.armyBar.remove(this.unlockCmtBtn);setTimeout(function(){Simulator.getInstance().armyBar.add(Simulator.getInstance().unlockCmtBtn,{left:null,right:7,bottom:5})},2E3)},timeoutRTBtn:function(){this.armyBar.remove(this.unlockRTBtn);setTimeout(function(){Simulator.getInstance().armyBar.add(Simulator.getInstance().unlockRTBtn,{left:null,right:7,bottom:97})},2E3)},backToCombatSetup:function(){try{var b=ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();
null!=b&&qx.core.Init.getApplication().getPlayArea().setView(ClientLib.Data.PlayerAreaViewMode.pavmCombatSetupDefense,b.get_Id(),0,0)}catch(a){console.log("Error closing Simulation Window"),console.log(a.toString())}},disableSimulateButtonTimer:function(b){try{1E3<=b?(this.isSimButtonDisabled=!0,this.simBtn.setEnabled(!1),this.simBtn.setLabel(Math.floor(b/1E3)),b-=1E3,setTimeout(function(){Simulator.getInstance().disableSimulateButtonTimer(b)},1E3)):(setTimeout(function(){Simulator.getInstance().simBtn.setEnabled(!0);
Simulator.OptionWindow.getInstance()._buttonSizeCB.getValue()?Simulator.getInstance().simBtn.setLabel("Simulate"):Simulator.getInstance().simBtn.setLabel("S")},b),this.isSimButtonDisabled=!1)}catch(a){console.log("Error disabling simulator button"),console.log(a.toString())}},hideArmyTooltips:function(){try{void 0===localStorage.ArmyUnitTooltipDisabled&&(localStorage.ArmyUnitTooltipDisabled="yes");for(var b in ClientLib.Vis.BaseView.BaseView.prototype)if("function"===typeof ClientLib.Vis.BaseView.BaseView.prototype[b]&&
-1<ClientLib.Vis.BaseView.BaseView.prototype[b].toString().indexOf(ClientLib.Vis.BaseView.BaseView.prototype.ShowToolTip.toString())){Function("","ClientLib.Vis.BaseView.BaseView.prototype.ShowToolTip_Original = ClientLib.Vis.BaseView.BaseView.prototype."+b)();Function("","ClientLib.Vis.BaseView.BaseView.prototype."+b+" = function (a) { if(ClientLib.Vis.VisMain.GetInstance().get_Mode()==7 && localStorage['ArmyUnitTooltipDisabled']=='yes') { return; } else { this.ShowToolTip_Original(a); } };")();
break}qx.core.Init.getApplication().getArmyUnitTooltipOverlay().setVisibility_Original=qx.core.Init.getApplication().getArmyUnitTooltipOverlay().setVisibility;qx.core.Init.getApplication().getArmyUnitTooltipOverlay().setVisibility=function(a){"yes"==localStorage.ArmyUnitTooltipDisabled?qx.core.Init.getApplication().getArmyUnitTooltipOverlay().setVisibility_Original(!1):qx.core.Init.getApplication().getArmyUnitTooltipOverlay().setVisibility_Original(a)}}catch(a){console.log("Error hideArmyUnitTooltips()"),
console.log(a.toString())}}}});qx.Class.define("Simulator.StatWindow",{type:"singleton",extend:qx.ui.window.Window,construct:function(){try{this.base(arguments);this.set({layout:(new qx.ui.layout.VBox).set({spacing:0}),caption:"Simulator Stats",icon:"FactionUI/icons/icon_res_plinfo_command_points.png",contentPadding:5,contentPaddingTop:0,allowMaximize:!1,showMaximize:!1,allowMinimize:!1,showMinimize:!1,resizable:!0,resizableTop:!1,resizableBottom:!1});this.getChildControl("icon").set({width:18,height:18,
scale:!0,alignY:"middle"});if(void 0!==localStorage.statWindowPosLeft){var b=parseInt(localStorage.statWindowPosLeft,10),a=parseInt(localStorage.statWindowPosTop,10);this.moveTo(b,a)}else this.moveTo(124,31);this.simViews=void 0!==localStorage.simViews?parseInt(localStorage.simViews,10):2;var c=qx.core.Init.getApplication();this.isSimStatButtonDisabled=!1;this.Battle=(new qx.ui.container.Composite(new qx.ui.layout.HBox(-3))).set({decorator:"pane-light-plain",allowGrowX:!0,marginLeft:0,marginRight:0});
var e=(new qx.ui.container.Composite(new qx.ui.layout.VBox)).set({width:29,padding:5,allowGrowX:!0,marginLeft:0,marginRight:0}),d=(new qx.ui.basic.Label("O")).set({toolTipText:c.tr("tnf:combat report"),alignX:"center",alignY:"middle"}),g=(new qx.ui.basic.Label("D")).set({toolTipText:c.tr("tnf:combat timer npc: %1",""),alignX:"center",alignY:"middle"}),k=(new qx.ui.basic.Label("B")).set({toolTipText:c.tr("tnf:base"),alignX:"center",alignY:"middle"});e.add(d);e.add(g);e.add(k);this.Battle.add(e);this.add(this.Battle);
var f=(new qx.ui.container.Composite(new qx.ui.layout.VBox(5))).set({decorator:"pane-light-opaque"});f.add((new qx.ui.basic.Label(c.tr("tnf:combat target"))).set({alignX:"center",alignY:"middle",paddingBottom:5,font:"font_size_13_bold"}));this.add(f);this.EnemyHealth=(new qx.ui.container.Composite(new qx.ui.layout.HBox(-3))).set({decorator:"pane-light-plain",allowGrowX:!0,marginLeft:0,marginRight:0});var h=(new qx.ui.container.Composite(new qx.ui.layout.VBox)).set({width:29,padding:5,allowGrowX:!0,
marginLeft:0,marginRight:0}),n=(new qx.ui.basic.Atom(null,"FactionUI/icons/icon_arsnl_show_all.png")).set({toolTipText:c.tr("tnf:total"),toolTipIcon:"FactionUI/icons/icon_arsnl_show_all.png",alignX:"center",alignY:"middle",gap:0,iconPosition:"top"}),l=(new qx.ui.basic.Atom(null,"FactionUI/icons/icon_arsnl_base_buildings.png")).set({toolTipText:c.tr("tnf:base"),toolTipIcon:"FactionUI/icons/icon_arsnl_base_buildings.png",alignX:"center",alignY:"middle",gap:0,iconPosition:"top"}),m=(new qx.ui.basic.Atom(null,
"FactionUI/icons/icon_def_army_points.png")).set({toolTipText:c.tr("tnf:defense"),toolTipIcon:"FactionUI/icons/icon_def_army_points.png",alignX:"center",alignY:"middle",gap:0,iconPosition:"top"}),p=(new qx.ui.basic.Label("CY")).set({toolTipText:GAMEDATA.Tech[1].dn,alignX:"center",alignY:"middle"}),q=(new qx.ui.basic.Label("DF")).set({toolTipText:GAMEDATA.Tech[42].dn,alignX:"center",alignY:"middle"}),t=(new qx.ui.basic.Label("CC")).set({toolTipText:GAMEDATA.Tech[24].dn,alignX:"center",alignY:"middle"});
n.getChildControl("icon").set({width:18,height:18,scale:!0,alignY:"middle"});l.getChildControl("icon").set({width:18,height:18,scale:!0,alignY:"middle"});m.getChildControl("icon").set({width:18,height:18,scale:!0,alignY:"middle"});h.add(n);h.add(l);h.add(m);h.add(p);h.add(q);h.add(t);this.EnemyHealth.add(h);this.add(this.EnemyHealth);var x=(new qx.ui.container.Composite(new qx.ui.layout.VBox(5))).set({decorator:"pane-light-opaque"});x.add((new qx.ui.basic.Label(c.tr("tnf:own repair cost"))).set({alignX:"center",
alignY:"middle",paddingBottom:5,font:"font_size_13_bold"}));this.add(x);this.Repair=(new qx.ui.container.Composite(new qx.ui.layout.HBox(-3))).set({decorator:"pane-light-plain",allowGrowX:!0,marginLeft:0,marginRight:0});var s=(new qx.ui.container.Composite(new qx.ui.layout.VBox)).set({width:29,padding:5,allowGrowX:!0,marginLeft:0,marginRight:0}),E=(new qx.ui.basic.Atom(null,"webfrontend/ui/icons/icn_repair_points.png")).set({toolTipText:c.tr("tnf:offense repair time"),toolTipIcon:"webfrontend/ui/icons/icn_repair_points.png",
alignX:"center",alignY:"middle",gap:0,iconPosition:"top"}),u=(new qx.ui.basic.Atom(null,"webfrontend/ui/icons/icn_repair_off_points.png")).set({toolTipText:c.tr("tnf:repair points"),toolTipIcon:"webfrontend/ui/icons/icn_repair_off_points.png",alignX:"center",alignY:"middle",gap:0,iconPosition:"top"}),y=(new qx.ui.basic.Atom(null,"webfrontend/ui/icons/icon_res_repair_inf.png")).set({toolTipText:c.tr("tnf:infantry repair title"),toolTipIcon:"webfrontend/ui/icons/icon_res_repair_inf.png",alignX:"center",
alignY:"middle",gap:0,iconPosition:"top"}),F=(new qx.ui.basic.Atom(null,"webfrontend/ui/icons/icon_res_repair_tnk.png")).set({toolTipText:c.tr("tnf:vehicle repair title"),toolTipIcon:"webfrontend/ui/icons/icon_res_repair_tnk.png",alignX:"center",alignY:"middle",gap:0,iconPosition:"top"}),z=(new qx.ui.basic.Atom(null,"webfrontend/ui/icons/icon_res_repair_air.png")).set({toolTipText:c.tr("tnf:aircraft repair title"),toolTipIcon:"webfrontend/ui/icons/icon_res_repair_air.png",alignX:"center",alignY:"middle",
gap:0,iconPosition:"top"});E.getChildControl("icon").set({width:18,height:18,scale:!0,alignY:"middle"});u.getChildControl("icon").set({width:18,height:18,scale:!0,alignY:"middle"});y.getChildControl("icon").set({width:18,height:18,scale:!0,alignY:"middle"});F.getChildControl("icon").set({width:18,height:18,scale:!0,alignY:"middle"});z.getChildControl("icon").set({width:18,height:18,scale:!0,alignY:"middle"});s.add(E);s.add(u);s.add(y);s.add(F);s.add(z);this.Repair.add(s);this.add(this.Repair);var A=
(new qx.ui.container.Composite(new qx.ui.layout.VBox(5))).set({decorator:"pane-light-opaque"});A.add((new qx.ui.basic.Label(c.tr("tnf:lootable resources:"))).set({alignX:"center",alignY:"middle",paddingBottom:5,font:"font_size_13_bold"}));this.add(A);this.Loot=(new qx.ui.container.Composite(new qx.ui.layout.HBox(-3))).set({decorator:"pane-light-plain",allowGrowX:!0,marginLeft:0,marginRight:0});var v=(new qx.ui.container.Composite(new qx.ui.layout.VBox)).set({width:29,padding:5,allowGrowX:!0,marginLeft:0,
marginRight:0}),r=(new qx.ui.basic.Atom(null,"webfrontend/ui/common/icn_res_tiberium.png")).set({toolTipText:c.tr("tnf:tiberium"),toolTipIcon:"webfrontend/ui/common/icn_res_tiberium.png",alignX:"center",alignY:"middle",gap:0,iconPosition:"top"}),B=(new qx.ui.basic.Atom(null,"webfrontend/ui/common/icn_res_chrystal.png")).set({toolTipText:c.tr("tnf:crystals"),toolTipIcon:"webfrontend/ui/common/icn_res_chrystal.png",alignX:"center",alignY:"middle",gap:0,iconPosition:"top"}),w=(new qx.ui.basic.Atom(null,
"webfrontend/ui/common/icn_res_dollar.png")).set({toolTipText:c.tr("tnf:credits"),toolTipIcon:"webfrontend/ui/common/icn_res_dollar.png",alignX:"center",alignY:"middle",gap:0,iconPosition:"top"}),G=(new qx.ui.basic.Atom(null,"webfrontend/ui/common/icn_res_research_mission.png")).set({toolTipText:c.tr("tnf:research points"),toolTipIcon:"webfrontend/ui/common/icn_res_research_mission.png",alignX:"center",alignY:"middle",gap:0,iconPosition:"top"}),H=(new qx.ui.basic.Atom(null,"FactionUI/icons/icon_transfer_resource.png")).set({toolTipText:c.tr("tnf:total")+
" "+c.tr("tnf:loot"),toolTipIcon:"FactionUI/icons/icon_transfer_resource.png",alignX:"center",alignY:"middle",gap:0,iconPosition:"top"});r.getChildControl("icon").set({width:18,height:18,scale:!0,alignY:"middle"});B.getChildControl("icon").set({width:18,height:18,scale:!0,alignY:"middle"});w.getChildControl("icon").set({width:18,height:18,scale:!0,alignY:"middle"});G.getChildControl("icon").set({width:18,height:18,scale:!0,alignY:"middle"});H.getChildControl("icon").set({width:18,height:18,scale:!0,
alignY:"middle"});v.add(r);v.add(B);v.add(w);v.add(G);v.add(H);this.Loot.add(v);this.add(this.Loot);var D=(new qx.ui.container.Composite(new qx.ui.layout.HBox(5))).set({decorator:"pane-light-opaque",allowGrowX:!0,marginLeft:0,marginRight:0,padding:5});this.add(D);this.simStatBtn=(new qx.ui.form.Button(c.tr("tnf:update"))).set({allowGrowX:!1});this.simStatBtn.setToolTipText("Updates Simulation Stats + LOOT");this.simStatBtn.addListener("click",this.simulateStats,this);this.simReplayBtn=(new qx.ui.form.Button(c.tr("tnf:show combat"))).set({allowGrowX:!1});
this.simReplayBtn.setToolTipText(c.tr("tnf:show battle replay"));this.simReplayBtn.addListener("click",this.doSimReplay,this);this.simReplayBtn.setEnabled(!1);D.add(this.simStatBtn,{width:"50%"});D.add(this.simReplayBtn,{width:"50%"});f.addListener("click",function(){this.EnemyHealth.isVisible()?this.EnemyHealth.exclude():this.EnemyHealth.show()},this);x.addListener("click",function(){this.Repair.isVisible()?this.Repair.exclude():this.Repair.show()},this);A.addListener("click",function(){this.Loot.isVisible()?
this.Loot.exclude():this.Loot.show()},this);void 0!==localStorage.hideHealth&&"yes"==localStorage.hideHealth&&this.EnemyHealth.exclude();void 0!==localStorage.hideRepair&&"yes"==localStorage.hideRepair&&this.Repair.exclude();void 0!==localStorage.hideLoot&&"yes"==localStorage.hideLoot&&this.Loot.exclude();for(b=0;b<this.simViews;b++)this.sim[b]=new this.Simulation(b),this.sim[b].Select(this.simSelected),this.Battle.add(this.sim[b].Label.Battle.container,{flex:1}),this.EnemyHealth.add(this.sim[b].Label.EnemyHealth.container,
{flex:1}),this.Repair.add(this.sim[b].Label.Repair.container,{flex:1}),this.Loot.add(this.sim[b].Label.Loot.container,{flex:1});phe.cnc.Util.attachNetEvent(ClientLib.API.Battleground.GetInstance(),"OnSimulateBattleFinished",ClientLib.API.OnSimulateBattleFinished,this,this.__OnSimulateBattleFinished);phe.cnc.base.Timer.getInstance().addListener("uiTick",this._onTick,this)}catch(C){console.log("Error setting up Simulator.StatWindow Constructor: "),console.log(C.toString())}},destruct:function(){},members:{Battle:null,
EnemyHealth:null,Repair:null,Loot:null,simStatBtn:null,simReplayBtn:null,isSimStatButtonDisabled:null,simSelected:0,simViews:3,sim:[],Simulation:function(b){try{var a=!1,c=this.OwnCity=this.TargetCity=null,e=null;this.Label={Battle:{container:(new qx.ui.container.Composite(new qx.ui.layout.VBox)).set({width:65,padding:5,allowGrowX:!0,marginLeft:0,marginRight:0,decorator:"pane-light-opaque"}),Outcome:(new qx.ui.basic.Atom("-",null)).set({alignX:"center",alignY:"middle",gap:0,iconPosition:"top",show:"label"}),
Duration:(new qx.ui.basic.Label("-:--")).set({alignX:"center",alignY:"middle"}),OwnCity:(new qx.ui.basic.Label("-")).set({alignX:"center",alignY:"middle"})},EnemyHealth:{container:(new qx.ui.container.Composite(new qx.ui.layout.VBox)).set({width:65,padding:5,allowGrowX:!0,marginLeft:0,marginRight:0,decorator:"pane-light-opaque"}),Overall:(new qx.ui.basic.Label("-")).set({alignX:"right",alignY:"middle"}),Base:(new qx.ui.basic.Label("-")).set({alignX:"right",alignY:"middle"}),Defense:(new qx.ui.basic.Label("-")).set({alignX:"right",
alignY:"middle"}),CY:(new qx.ui.basic.Label("-")).set({alignX:"right",alignY:"middle"}),DF:(new qx.ui.basic.Label("-")).set({alignX:"right",alignY:"middle"}),CC:(new qx.ui.basic.Label("-")).set({alignX:"right",alignY:"middle"})},Repair:{container:(new qx.ui.container.Composite(new qx.ui.layout.VBox)).set({width:65,padding:5,allowGrowX:!0,marginLeft:0,marginRight:0,decorator:"pane-light-opaque"}),Storage:(new qx.ui.basic.Label("-")).set({alignX:"right",alignY:"middle"}),Overall:(new qx.ui.basic.Label("-")).set({alignX:"right",
alignY:"middle"}),Inf:(new qx.ui.basic.Label("-")).set({alignX:"right",alignY:"middle"}),Vehi:(new qx.ui.basic.Label("-")).set({alignX:"right",alignY:"middle"}),Air:(new qx.ui.basic.Label("-")).set({alignX:"right",alignY:"middle"})},Loot:{container:(new qx.ui.container.Composite(new qx.ui.layout.VBox)).set({width:65,padding:5,allowGrowX:!0,marginLeft:0,marginRight:0,decorator:"pane-light-opaque"}),Tib:(new qx.ui.basic.Label("-")).set({alignX:"right",alignY:"middle"}),Cry:(new qx.ui.basic.Label("-")).set({alignX:"right",
alignY:"middle"}),Cred:(new qx.ui.basic.Label("-")).set({alignX:"right",alignY:"middle"}),RP:(new qx.ui.basic.Label("-")).set({alignX:"right",alignY:"middle"}),Overall:(new qx.ui.basic.Label("-")).set({alignX:"right",alignY:"middle"})}};var d=function(){this.RT=this.Cry=this.Tib=this.MaxHealth=this.EndHealth=this.StartHealth=0;this.getHP=function(){return 0==this.EndHealth&&0==this.StartHealth?0:0==this.MaxHealth?100:this.EndHealth/this.MaxHealth*100};this.getHPrel=function(){return 0==this.StartHealth?
0:0==this.MaxHealth?-100:(this.StartHealth-this.EndHealth)/this.MaxHealth*-100}},g=function(){this.Battle=this.Base=0};this.Stats={Battle:{Outcome:0,Duration:0,OwnCity:""},EnemyHealth:{Overall:new d,Base:new d,Defense:new d,CY:new d,DF:new d,CC:new d},Repair:{Storage:0,Overall:new d,Inf:new d,Vehi:new d,Air:new d},Loot:{Tib:new g,Cry:new g,Cred:new g,RP:new g,Overall:new g}};this.setSimulation=function(b){a=!0;this.TargetCity=ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();this.OwnCity=
ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();this.Stats.Battle.OwnCity=this.OwnCity.get_Name();this.saveFormation();e=[];for(var c=0;c<b.length;c++)e.push(b[c].Value)};this.UpdateLabels=function(){var b=qx.core.Init.getApplication(),c=function(a){return phe.cnc.Util.getTimespanString(a)},d=function(a,b){25>b?a.setTextColor("red"):75>b?a.setTextColor("orangered"):a.setTextColor("darkgreen")},e=function(a,b){25>b?a.setTextColor("darkgreen"):75>b?a.setTextColor("orangered"):
a.setTextColor("red")};if(a){switch(this.Stats.Battle.Outcome){case 1:this.Label.Battle.Outcome.resetLabel();this.Label.Battle.Outcome.set({show:"icon"});this.Label.Battle.Outcome.setIcon("FactionUI/icons/icon_reports_total_defeat.png");this.Label.Battle.Outcome.setToolTipIcon("FactionUI/icons/icon_reports_total_defeat.png");this.Label.Battle.Outcome.setToolTipText(b.tr("tnf:total defeat"));break;case 2:this.Label.Battle.Outcome.resetLabel();this.Label.Battle.Outcome.set({show:"icon"});this.Label.Battle.Outcome.setIcon("FactionUI/icons/icon_reports_victory.png");
this.Label.Battle.Outcome.setToolTipIcon("FactionUI/icons/icon_reports_victory.png");this.Label.Battle.Outcome.setToolTipText(b.tr("tnf:victory"));break;case 3:this.Label.Battle.Outcome.resetLabel(),this.Label.Battle.Outcome.set({show:"icon"}),this.Label.Battle.Outcome.setIcon("FactionUI/icons/icon_reports_total_victory.png"),this.Label.Battle.Outcome.setToolTipIcon("FactionUI/icons/icon_reports_total_victory.png"),this.Label.Battle.Outcome.setToolTipText(b.tr("tnf:total victory"))}this.Label.Battle.Duration.setValue(c(this.Stats.Battle.Duration/
1E3));null!=this.OwnCity&&(this.Stats.Battle.OwnCity=this.OwnCity.get_Name());this.Label.Battle.OwnCity.setValue(this.Stats.Battle.OwnCity);switch(localStorage.getEHSelection){case "hp rel":this.Label.EnemyHealth.Overall.setValue(this.Stats.EnemyHealth.Overall.getHPrel().toFixed(2)+"%");this.Label.EnemyHealth.Overall.setToolTipText(b.tr("tnf:repair points")+": "+c(this.Stats.EnemyHealth.Overall.RT)+"<br>"+b.tr("tnf:tiberium")+": "+phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.Overall.Tib)+
"<br>"+b.tr("tnf:crystals")+": "+phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.Overall.Cry));this.Label.EnemyHealth.Base.setValue(this.Stats.EnemyHealth.Base.getHPrel().toFixed(2)+"%");this.Label.EnemyHealth.Base.setToolTipText(b.tr("tnf:repair points")+": "+c(this.Stats.EnemyHealth.Base.RT)+"<br>"+b.tr("tnf:tiberium")+": "+phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.Base.Tib));this.Label.EnemyHealth.Defense.setValue(this.Stats.EnemyHealth.Defense.getHPrel().toFixed(2)+
"%");this.Label.EnemyHealth.Defense.setToolTipText(b.tr("tnf:tiberium")+": "+phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.Defense.Tib)+"<br>"+b.tr("tnf:crystals")+": "+phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.Defense.Cry));this.Label.EnemyHealth.CY.setValue(this.Stats.EnemyHealth.CY.getHPrel().toFixed(2)+"%");this.Label.EnemyHealth.CY.setToolTipText(b.tr("tnf:repair points")+": "+c(this.Stats.EnemyHealth.CY.RT)+"<br>"+b.tr("tnf:tiberium")+": "+phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.CY.Tib));
this.Label.EnemyHealth.DF.setValue(this.Stats.EnemyHealth.DF.getHPrel().toFixed(2)+"%");this.Label.EnemyHealth.DF.setToolTipText(b.tr("tnf:repair points")+": "+c(this.Stats.EnemyHealth.DF.RT)+"<br>"+b.tr("tnf:tiberium")+": "+phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.DF.Tib));this.Label.EnemyHealth.CC.setValue(this.Stats.EnemyHealth.CC.getHPrel().toFixed(2)+"%");this.Label.EnemyHealth.CC.setToolTipText(b.tr("tnf:repair points")+": "+c(this.Stats.EnemyHealth.CC.RT)+"<br>"+
b.tr("tnf:tiberium")+": "+phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.CC.Tib));break;default:this.Label.EnemyHealth.Overall.setValue(this.Stats.EnemyHealth.Overall.getHP().toFixed(2)+"%"),this.Label.EnemyHealth.Overall.setToolTipText(b.tr("tnf:repair points")+": "+c(this.Stats.EnemyHealth.Overall.RT)+"<br>"+b.tr("tnf:tiberium")+": "+phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.Overall.Tib)+"<br>"+b.tr("tnf:crystals")+": "+phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.Overall.Cry)),
this.Label.EnemyHealth.Base.setValue(this.Stats.EnemyHealth.Base.getHP().toFixed(2)+"%"),this.Label.EnemyHealth.Base.setToolTipText(b.tr("tnf:repair points")+": "+c(this.Stats.EnemyHealth.Base.RT)+"<br>"+b.tr("tnf:tiberium")+": "+phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.Base.Tib)),this.Label.EnemyHealth.Defense.setValue(this.Stats.EnemyHealth.Defense.getHP().toFixed(2)+"%"),this.Label.EnemyHealth.Defense.setToolTipText(b.tr("tnf:tiberium")+": "+phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.Defense.Tib)+
"<br>"+b.tr("tnf:crystals")+": "+phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.Defense.Cry)),this.Label.EnemyHealth.CY.setValue(this.Stats.EnemyHealth.CY.getHP().toFixed(2)+"%"),this.Label.EnemyHealth.CY.setToolTipText(b.tr("tnf:repair points")+": "+c(this.Stats.EnemyHealth.CY.RT)+"<br>"+b.tr("tnf:tiberium")+": "+phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.CY.Tib)),this.Label.EnemyHealth.DF.setValue(this.Stats.EnemyHealth.DF.getHP().toFixed(2)+"%"),
this.Label.EnemyHealth.DF.setToolTipText(b.tr("tnf:repair points")+": "+c(this.Stats.EnemyHealth.DF.RT)+"<br>"+b.tr("tnf:tiberium")+": "+phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.DF.Tib)),this.Label.EnemyHealth.CC.setValue(this.Stats.EnemyHealth.CC.getHP().toFixed(2)+"%"),this.Label.EnemyHealth.CC.setToolTipText(b.tr("tnf:repair points")+": "+c(this.Stats.EnemyHealth.CC.RT)+"<br>"+b.tr("tnf:tiberium")+": "+phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.CC.Tib))}e(this.Label.EnemyHealth.Overall,
this.Stats.EnemyHealth.Overall.getHP());e(this.Label.EnemyHealth.Base,this.Stats.EnemyHealth.Base.getHP());e(this.Label.EnemyHealth.Defense,this.Stats.EnemyHealth.Defense.getHP());e(this.Label.EnemyHealth.CY,this.Stats.EnemyHealth.CY.getHP());e(this.Label.EnemyHealth.DF,this.Stats.EnemyHealth.DF.getHP());e(this.Label.EnemyHealth.CC,this.Stats.EnemyHealth.CC.getHP());null!=this.OwnCity&&(this.Stats.Repair.Storage=Math.min(this.OwnCity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeInf),
this.OwnCity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeVeh),this.OwnCity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeAir)));this.Label.Repair.Storage.setValue(phe.cnc.Util.getTimespanString(ClientLib.Data.MainData.GetInstance().get_Time().GetTimeSpan(this.Stats.Repair.Storage)));this.Label.Repair.Storage.setTextColor(this.Stats.Repair.Storage>this.Stats.Repair.Overall.RT?"darkgreen":"red");switch(localStorage.getRTSelection){case "cry":this.Label.Repair.Overall.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Overall.Cry));
this.Label.Repair.Overall.setToolTipText(b.tr("tnf:repair points")+": "+c(this.Stats.Repair.Overall.RT)+"</br>"+b.tr("tnf:health")+": "+this.Stats.Repair.Overall.getHP().toFixed(2)+"%");this.Label.Repair.Inf.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Inf.Cry));this.Label.Repair.Inf.setToolTipText(b.tr("tnf:repair points")+": "+c(this.Stats.Repair.Inf.RT)+"</br>"+b.tr("tnf:health")+": "+this.Stats.Repair.Inf.getHP().toFixed(2)+"%");this.Label.Repair.Vehi.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Vehi.Cry));
this.Label.Repair.Vehi.setToolTipText(b.tr("tnf:repair points")+": "+c(this.Stats.Repair.Vehi.RT)+"</br>"+b.tr("tnf:health")+": "+this.Stats.Repair.Vehi.getHP().toFixed(2)+"%");this.Label.Repair.Air.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Air.Cry));this.Label.Repair.Air.setToolTipText(b.tr("tnf:repair points")+": "+c(this.Stats.Repair.Air.RT)+"</br>"+b.tr("tnf:health")+": "+this.Stats.Repair.Air.getHP().toFixed(2)+"%");break;case "hp":this.Label.Repair.Overall.setValue(this.Stats.Repair.Overall.getHP().toFixed(2)+
"%");this.Label.Repair.Overall.setToolTipText(b.tr("tnf:repair points")+": "+c(this.Stats.Repair.Overall.RT)+"</br>"+b.tr("tnf:crystals")+": "+phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Overall.Cry));this.Label.Repair.Inf.setValue(this.Stats.Repair.Inf.getHP().toFixed(2)+"%");this.Label.Repair.Inf.setToolTipText(b.tr("tnf:repair points")+": "+c(this.Stats.Repair.Inf.RT)+"</br>"+b.tr("tnf:crystals")+": "+phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Inf.Cry));
this.Label.Repair.Vehi.setValue(this.Stats.Repair.Vehi.getHP().toFixed(2)+"%");this.Label.Repair.Vehi.setToolTipText(b.tr("tnf:repair points")+": "+c(this.Stats.Repair.Vehi.RT)+"</br>"+b.tr("tnf:crystals")+": "+phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Vehi.Cry));this.Label.Repair.Air.setValue(this.Stats.Repair.Air.getHP().toFixed(2)+"%");this.Label.Repair.Air.setToolTipText(b.tr("tnf:repair points")+": "+c(this.Stats.Repair.Air.RT)+"</br>"+b.tr("tnf:crystals")+": "+phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Air.Cry));
break;case "hp rel":this.Label.Repair.Overall.setValue(this.Stats.Repair.Overall.getHPrel().toFixed(2)+"%");this.Label.Repair.Overall.setToolTipText(b.tr("tnf:repair points")+": "+c(this.Stats.Repair.Overall.RT)+"</br>"+b.tr("tnf:crystals")+": "+phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Overall.Cry));this.Label.Repair.Inf.setValue(this.Stats.Repair.Inf.getHPrel().toFixed(2)+"%");this.Label.Repair.Inf.setToolTipText(b.tr("tnf:repair points")+": "+c(this.Stats.Repair.Inf.RT)+"</br>"+
b.tr("tnf:crystals")+": "+phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Inf.Cry));this.Label.Repair.Vehi.setValue(this.Stats.Repair.Vehi.getHPrel().toFixed(2)+"%");this.Label.Repair.Vehi.setToolTipText(b.tr("tnf:repair points")+": "+c(this.Stats.Repair.Vehi.RT)+"</br>"+b.tr("tnf:crystals")+": "+phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Vehi.Cry));this.Label.Repair.Air.setValue(this.Stats.Repair.Air.getHPrel().toFixed(2)+"%");this.Label.Repair.Air.setToolTipText(b.tr("tnf:repair points")+
": "+c(this.Stats.Repair.Air.RT)+"</br>"+b.tr("tnf:crystals")+": "+phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Air.Cry));break;default:this.Label.Repair.Overall.setValue(c(this.Stats.Repair.Overall.RT)),this.Label.Repair.Overall.setToolTipText(b.tr("tnf:crystals")+": "+phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Overall.Cry)+"</br>"+b.tr("tnf:health")+": "+this.Stats.Repair.Overall.getHP().toFixed(2)+"%"),this.Label.Repair.Inf.setValue(c(this.Stats.Repair.Inf.RT)),
this.Label.Repair.Inf.setToolTipText(b.tr("tnf:crystals")+": "+phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Inf.Cry)+"</br>"+b.tr("tnf:health")+": "+this.Stats.Repair.Inf.getHP().toFixed(2)+"%"),this.Label.Repair.Vehi.setValue(c(this.Stats.Repair.Vehi.RT)),this.Label.Repair.Vehi.setToolTipText(b.tr("tnf:crystals")+": "+phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Vehi.Cry)+"</br>"+b.tr("tnf:health")+": "+this.Stats.Repair.Vehi.getHP().toFixed(2)+"%"),this.Label.Repair.Air.setValue(c(this.Stats.Repair.Air.RT)),
this.Label.Repair.Air.setToolTipText(b.tr("tnf:crystals")+": "+phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Air.Cry)+"</br>"+b.tr("tnf:health")+": "+this.Stats.Repair.Air.getHP().toFixed(2)+"%")}d(this.Label.Repair.Overall,this.Stats.Repair.Overall.getHP());d(this.Label.Repair.Inf,this.Stats.Repair.Inf.getHP());this.Stats.Repair.Inf.RT===this.Stats.Repair.Overall.RT&&100>this.Stats.Repair.Inf.getHP()&&this.Label.Repair.Inf.setTextColor("black");d(this.Label.Repair.Vehi,this.Stats.Repair.Vehi.getHP());
this.Stats.Repair.Vehi.RT===this.Stats.Repair.Overall.RT&&100>this.Stats.Repair.Vehi.getHP()&&this.Label.Repair.Vehi.setTextColor("black");d(this.Label.Repair.Air,this.Stats.Repair.Air.getHP());this.Stats.Repair.Air.RT===this.Stats.Repair.Overall.RT&&100>this.Stats.Repair.Air.getHP()&&this.Label.Repair.Air.setTextColor("black");this.Label.Loot.Tib.setToolTipText((this.Stats.Loot.Tib.Battle/this.Stats.Loot.Tib.Base*100).toFixed(2)+"%<br>"+b.tr("tnf:base")+": "+phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.Tib.Base));
this.Label.Loot.Tib.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.Tib.Battle));this.Label.Loot.Cry.setToolTipText((this.Stats.Loot.Cry.Battle/this.Stats.Loot.Cry.Base*100).toFixed(2)+"%<br>"+b.tr("tnf:base")+": "+phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.Cry.Base));this.Label.Loot.Cry.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.Cry.Battle));this.Label.Loot.Cred.setToolTipText((this.Stats.Loot.Cred.Battle/this.Stats.Loot.Cred.Base*
100).toFixed(2)+"%<br>"+b.tr("tnf:base")+": "+phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.Cred.Base));this.Label.Loot.Cred.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.Cred.Battle));this.Label.Loot.RP.setToolTipText((this.Stats.Loot.RP.Battle/this.Stats.Loot.RP.Base*100).toFixed(2)+"%<br>"+b.tr("tnf:base")+": "+phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.RP.Base));this.Label.Loot.RP.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.RP.Battle));
this.Label.Loot.Overall.setToolTipText((this.Stats.Loot.Overall.Battle/this.Stats.Loot.Overall.Base*100).toFixed(2)+"%<br>"+b.tr("tnf:base")+": "+phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.Overall.Base));this.Label.Loot.Overall.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.Overall.Battle))}else if(0<this.Stats.Loot.Tib.Base||0<this.Stats.Loot.Cry.Base||0<this.Stats.Loot.Cred.Base||0<this.Stats.Loot.RP.Base||0<this.Stats.Loot.Overall.Base)this.Label.Loot.Tib.resetToolTipText(),
this.Label.Loot.Tib.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.Tib.Base)),this.Label.Loot.Cry.resetToolTipText(),this.Label.Loot.Cry.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.Cry.Base)),this.Label.Loot.Cred.resetToolTipText(),this.Label.Loot.Cred.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.Cred.Base)),this.Label.Loot.RP.resetToolTipText(),this.Label.Loot.RP.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.RP.Base)),
this.Label.Loot.Overall.resetToolTipText(),this.Label.Loot.Overall.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.Overall.Base))};this.ResetStats=function(){this.Stats.Battle.Outcome=0;this.Stats.Battle.Duration=0;this.Stats.Battle.OwnCity="";this.Stats.EnemyHealth.Overall=new d;this.Stats.EnemyHealth.Base=new d;this.Stats.EnemyHealth.Defense=new d;this.Stats.EnemyHealth.CY=new d;this.Stats.EnemyHealth.DF=new d;this.Stats.EnemyHealth.CC=new d;this.Stats.Repair.Storage=0;this.Stats.Repair.Overall=
new d;this.Stats.Repair.Inf=new d;this.Stats.Repair.Vehi=new d;this.Stats.Repair.Air=new d;this.Stats.Loot.Tib.Battle=0;this.Stats.Loot.Cry.Battle=0;this.Stats.Loot.Cred.Battle=0;this.Stats.Loot.RP.Battle=0;this.Stats.Loot.Overall.Battle=0};this.ResetLabels=function(){this.Label.Battle.Outcome.resetIcon();this.Label.Battle.Outcome.resetToolTipIcon();this.Label.Battle.Outcome.resetToolTipText();this.Label.Battle.Outcome.setShow("label");this.Label.Battle.Outcome.setLabel("-");this.Label.Battle.Duration.setValue("-:--");
this.Label.Battle.OwnCity.setValue("-");this.Label.EnemyHealth.Overall.setValue("-");this.Label.EnemyHealth.Overall.resetToolTipText();this.Label.EnemyHealth.Overall.resetTextColor();this.Label.EnemyHealth.Base.setValue("-");this.Label.EnemyHealth.Base.resetToolTipText();this.Label.EnemyHealth.Base.resetTextColor();this.Label.EnemyHealth.Defense.setValue("-");this.Label.EnemyHealth.Defense.resetToolTipText();this.Label.EnemyHealth.Defense.resetTextColor();this.Label.EnemyHealth.CY.setValue("-");this.Label.EnemyHealth.CY.resetToolTipText();
this.Label.EnemyHealth.CY.resetTextColor();this.Label.EnemyHealth.DF.setValue("-");this.Label.EnemyHealth.DF.resetToolTipText();this.Label.EnemyHealth.DF.resetTextColor();this.Label.EnemyHealth.CC.setValue("-");this.Label.EnemyHealth.CC.resetToolTipText();this.Label.EnemyHealth.CC.resetTextColor();this.Label.Repair.Storage.setValue("-");this.Label.Repair.Storage.resetToolTipText();this.Label.Repair.Storage.resetTextColor();this.Label.Repair.Overall.setValue("-");this.Label.Repair.Overall.resetToolTipText();
this.Label.Repair.Overall.resetTextColor();this.Label.Repair.Inf.setValue("-");this.Label.Repair.Inf.resetToolTipText();this.Label.Repair.Inf.resetTextColor();this.Label.Repair.Vehi.setValue("-");this.Label.Repair.Vehi.resetToolTipText();this.Label.Repair.Vehi.resetTextColor();this.Label.Repair.Air.setValue("-");this.Label.Repair.Air.resetToolTipText();this.Label.Repair.Air.resetTextColor();this.Label.Loot.Tib.setValue("-");this.Label.Loot.Tib.resetToolTipText();this.Label.Loot.Tib.resetTextColor();
this.Label.Loot.Cry.setValue("-");this.Label.Loot.Cry.resetToolTipText();this.Label.Loot.Cry.resetTextColor();this.Label.Loot.Cred.setValue("-");this.Label.Loot.Cred.resetToolTipText();this.Label.Loot.Cred.resetTextColor();this.Label.Loot.RP.setValue("-");this.Label.Loot.RP.resetToolTipText();this.Label.Loot.RP.resetTextColor();this.Label.Loot.Overall.setValue("-");this.Label.Loot.Overall.resetToolTipText();this.Label.Loot.Overall.resetTextColor()};this.Reset=function(){var b=ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
if(null===this.TargetCity||b.get_CityArmyFormationsManager().get_CurrentTargetBaseId()!=this.TargetCity.get_Id())a=!1,this.OwnCity=this.TargetCity=null,this.ResetStats(),this.Stats.Loot.Tib.Base=0,this.Stats.Loot.Cry.Base=0,this.Stats.Loot.Cred.Base=0,this.Stats.Loot.RP.Base=0,this.Stats.Loot.Overall.Base=0,this.ResetLabels()};this.Select=function(a){if(a==b){a="pane-light-opaque";var c=1}else a="pane-light-plain",c=0.6;this.Label.Battle.container.set({decorator:a,opacity:c});this.Label.EnemyHealth.container.set({decorator:a,
opacity:c});this.Label.Repair.container.set({decorator:a,opacity:c});this.Label.Loot.container.set({decorator:a,opacity:c})};this.saveFormation=function(){try{c=[];for(var a=Simulator.getInstance().getCityPreArmyUnits().get_ArmyUnits().l,b=0;b<a.length;b++){var d=a[b],e={};e.x=d.get_CoordX();e.y=d.get_CoordY();e.id=d.get_Id();e.enabled=d.get_Enabled();c.push(e)}}catch(g){console.log("Error Saving Stat Formation"),console.log(g.toString())}};this.loadFormation=function(){try{ClientLib.Data.MainData.GetInstance().get_Cities().set_CurrentOwnCityId(this.OwnCity.get_Id()),
Simulator.getInstance().restoreFormation(c)}catch(a){console.log("Error loading Stat Formation"),console.log(a.toString())}};this.Label.Battle.Outcome.getChildControl("icon").set({width:18,height:18,scale:!0,alignY:"middle"});this.Label.Battle.container.add(this.Label.Battle.Outcome);this.Label.Battle.container.add(this.Label.Battle.Duration);this.Label.Battle.container.add(this.Label.Battle.OwnCity);this.Label.EnemyHealth.container.add(this.Label.EnemyHealth.Overall);this.Label.EnemyHealth.container.add(this.Label.EnemyHealth.Base);
this.Label.EnemyHealth.container.add(this.Label.EnemyHealth.Defense);this.Label.EnemyHealth.container.add(this.Label.EnemyHealth.CY);this.Label.EnemyHealth.container.add(this.Label.EnemyHealth.DF);this.Label.EnemyHealth.container.add(this.Label.EnemyHealth.CC);this.Label.Repair.container.add(this.Label.Repair.Storage);this.Label.Repair.container.add(this.Label.Repair.Overall);this.Label.Repair.container.add(this.Label.Repair.Inf);this.Label.Repair.container.add(this.Label.Repair.Vehi);this.Label.Repair.container.add(this.Label.Repair.Air);
this.Label.Loot.container.add(this.Label.Loot.Tib);this.Label.Loot.container.add(this.Label.Loot.Cry);this.Label.Loot.container.add(this.Label.Loot.Cred);this.Label.Loot.container.add(this.Label.Loot.RP);this.Label.Loot.container.add(this.Label.Loot.Overall);this.Label.Battle.container.addListener("click",function(){Simulator.StatWindow.getInstance().simSelected=b;for(var a=0;a<Simulator.StatWindow.getInstance().sim.length;a++)Simulator.StatWindow.getInstance().sim[a].Select(b)},this);this.Label.EnemyHealth.container.addListener("click",
function(){Simulator.StatWindow.getInstance().simSelected=b;for(var a=0;a<Simulator.StatWindow.getInstance().sim.length;a++)Simulator.StatWindow.getInstance().sim[a].Select(b)},this);this.Label.Repair.container.addListener("click",function(){Simulator.StatWindow.getInstance().simSelected=b;for(var a=0;a<Simulator.StatWindow.getInstance().sim.length;a++)Simulator.StatWindow.getInstance().sim[a].Select(b)},this);this.Label.Loot.container.addListener("click",function(){Simulator.StatWindow.getInstance().simSelected=
b;for(var a=0;a<Simulator.StatWindow.getInstance().sim.length;a++)Simulator.StatWindow.getInstance().sim[a].Select(b)},this);this.Label.Battle.container.addListener("dblclick",function(){this.loadFormation()},this);this.Label.EnemyHealth.container.addListener("dblclick",function(){this.loadFormation()},this);this.Label.Repair.container.addListener("dblclick",function(){this.loadFormation()},this);this.Label.Loot.container.addListener("dblclick",function(){this.loadFormation()},this);this.Label.EnemyHealth.container.addListener("contextmenu",
function(){localStorage.getEHSelection="hp rel"==localStorage.getEHSelection?"hp":"hp rel"},this);this.Label.Repair.container.addListener("contextmenu",function(){localStorage.getRTSelection="cry"==localStorage.getRTSelection?"rt":"hp"==localStorage.getRTSelection?"hp rel":"hp rel"==localStorage.getRTSelection?"cry":"hp"},this)}catch(k){console.log("Error init Simulation"),console.log(k.toString())}},simulateStats:function(){console.log("Simulating Stats");var b=ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();
null!=b&&(Simulator.getInstance().isSimulation=!0,Simulator.getInstance().saveTempFormation(),localStorage.ta_sim_last_city=b.get_Id(),ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity().get_CityArmyFormationsManager().set_CurrentTargetBaseId(b.get_Id()),ClientLib.API.Battleground.GetInstance().SimulateBattle())},doSimReplay:function(){try{if(Simulator.getInstance().isSimulation=!0,qx.core.Init.getApplication().getPlayArea().setView(ClientLib.Data.PlayerAreaViewMode.pavmCombatReplay,
localStorage.ta_sim_last_city,0,0),void 0!==localStorage.autoSimulate&&"yes"==localStorage.autoSimulate){var b=localStorage.simulateSpeed;setTimeout(function(){var a=ClientLib.Vis.VisMain.GetInstance().get_Battleground();a.RestartReplay();a.set_ReplaySpeed(parseInt(b,10))},1E3)}}catch(a){console.log("Error attempting to show Simulation Replay"),console.log(a.toString())}},calculateRepairCosts:function(b,a,c,e,d){var g={RT:0,Cry:0,Tib:0};if(c!=e)for(b=ClientLib.API.Util.GetUnitRepairCosts(a,b,(c-e)/
d),a=0;a<b.length;a++)switch(c=b[a],parseInt(c.Type,10)){case ClientLib.Base.EResourceType.Tiberium:g.Tib+=c.Count;break;case ClientLib.Base.EResourceType.Crystal:g.Cry+=c.Count;break;case ClientLib.Base.EResourceType.RepairChargeBase:case ClientLib.Base.EResourceType.RepairChargeInf:case ClientLib.Base.EResourceType.RepairChargeVeh:case ClientLib.Base.EResourceType.RepairChargeAir:g.RT+=c.Count}return g},_onTick:function(){for(var b=0;b<this.sim.length;b++)this.sim[b].UpdateLabels()},__OnSimulateBattleFinished:function(b){!1==
this.isSimStatButtonDisabled&&(this.disableSimulateStatButtonTimer(1E4),"function"===typeof Simulator.getInstance().disableSimulateButtonTimer&&Simulator.getInstance().disableSimulateButtonTimer(1E4));!1==this.simReplayBtn.getEnabled()&&this.simReplayBtn.setEnabled(!0);this.getSimulationInfo(b,this.sim[this.simSelected]);this.sim[this.simSelected].setSimulation(b)},getSimulationInfo:function(b,a){console.log("Getting Player Unit Damage");try{a.ResetStats();for(var c={},e=[],d=ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity(),
g=ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity(),k=d.get_CityFaction(),d=0;d<b.length;d++){var f=b[d].Value,h=f.t,n=ClientLib.Res.ResMain.GetInstance().GetUnit_Obj(h),l=f.l,m=Math.floor(f.sh),p=Math.floor(f.h),q=Math.floor(16*ClientLib.API.Util.GetUnitMaxHealthByLevel(l,n,!1)),t=n.pt,x=n.mt;e.push(f);switch(k){case ClientLib.Base.EFactionType.GDIFaction:case ClientLib.Base.EFactionType.NODFaction:switch(t){case ClientLib.Base.EPlacementType.Defense:case ClientLib.Base.EPlacementType.Structure:q=
Math.floor(16*ClientLib.API.Util.GetUnitMaxHealthByLevel(l,n,!0))}}c=this.calculateRepairCosts(h,l,m,p,q);switch(t){case ClientLib.Base.EPlacementType.Defense:a.Stats.EnemyHealth.Overall.StartHealth+=m;a.Stats.EnemyHealth.Overall.EndHealth+=p;a.Stats.EnemyHealth.Overall.MaxHealth+=q;a.Stats.EnemyHealth.Overall.Tib+=c.Tib;a.Stats.EnemyHealth.Overall.Cry+=c.Cry;a.Stats.EnemyHealth.Defense.StartHealth+=m;a.Stats.EnemyHealth.Defense.EndHealth+=p;a.Stats.EnemyHealth.Defense.MaxHealth+=q;a.Stats.EnemyHealth.Defense.Tib+=
c.Tib;a.Stats.EnemyHealth.Defense.Cry+=c.Cry;break;case ClientLib.Base.EPlacementType.Offense:a.Stats.Repair.Overall.StartHealth+=m;a.Stats.Repair.Overall.EndHealth+=p;a.Stats.Repair.Overall.MaxHealth+=q;a.Stats.Repair.Overall.Tib+=c.Tib;a.Stats.Repair.Overall.Cry+=c.Cry;switch(x){case ClientLib.Base.EUnitMovementType.Feet:a.Stats.Repair.Inf.StartHealth+=m;a.Stats.Repair.Inf.EndHealth+=p;a.Stats.Repair.Inf.MaxHealth+=q;a.Stats.Repair.Inf.RT+=c.RT;a.Stats.Repair.Inf.Tib+=c.Tib;a.Stats.Repair.Inf.Cry+=
c.Cry;break;case ClientLib.Base.EUnitMovementType.Wheel:case ClientLib.Base.EUnitMovementType.Track:a.Stats.Repair.Vehi.StartHealth+=m;a.Stats.Repair.Vehi.EndHealth+=p;a.Stats.Repair.Vehi.MaxHealth+=q;a.Stats.Repair.Vehi.RT+=c.RT;a.Stats.Repair.Vehi.Tib+=c.Tib;a.Stats.Repair.Vehi.Cry+=c.Cry;break;case ClientLib.Base.EUnitMovementType.Air:case ClientLib.Base.EUnitMovementType.Air2:a.Stats.Repair.Air.StartHealth+=m,a.Stats.Repair.Air.EndHealth+=p,a.Stats.Repair.Air.MaxHealth+=q,a.Stats.Repair.Air.RT+=
c.RT,a.Stats.Repair.Air.Tib+=c.Tib,a.Stats.Repair.Air.Cry+=c.Cry}break;case ClientLib.Base.EPlacementType.Structure:switch(a.Stats.EnemyHealth.Overall.StartHealth+=m,a.Stats.EnemyHealth.Overall.EndHealth+=p,a.Stats.EnemyHealth.Overall.MaxHealth+=q,a.Stats.EnemyHealth.Overall.RT+=c.RT,a.Stats.EnemyHealth.Overall.Tib+=c.Tib,a.Stats.EnemyHealth.Overall.Cry+=c.Cry,a.Stats.EnemyHealth.Base.StartHealth+=m,a.Stats.EnemyHealth.Base.EndHealth+=p,a.Stats.EnemyHealth.Base.MaxHealth+=q,a.Stats.EnemyHealth.Base.RT+=
c.RT,a.Stats.EnemyHealth.Base.Tib+=c.Tib,a.Stats.EnemyHealth.Base.Cry+=c.Cry,h){case 112:case 151:case 177:case 233:a.Stats.EnemyHealth.CY.StartHealth+=m;a.Stats.EnemyHealth.CY.EndHealth+=p;a.Stats.EnemyHealth.CY.MaxHealth+=q;a.Stats.EnemyHealth.CY.RT+=c.RT;a.Stats.EnemyHealth.CY.Tib+=c.Tib;a.Stats.EnemyHealth.CY.Cry+=c.Cry;break;case 131:case 158:case 195:a.Stats.EnemyHealth.DF.StartHealth+=m;a.Stats.EnemyHealth.DF.EndHealth+=p;a.Stats.EnemyHealth.DF.MaxHealth+=q;a.Stats.EnemyHealth.DF.RT+=c.RT;
a.Stats.EnemyHealth.DF.Tib+=c.Tib;a.Stats.EnemyHealth.DF.Cry+=c.Cry;break;case 111:case 196:case 159:a.Stats.EnemyHealth.CC.StartHealth+=m,a.Stats.EnemyHealth.CC.EndHealth+=p,a.Stats.EnemyHealth.CC.MaxHealth+=q,a.Stats.EnemyHealth.CC.RT+=c.RT,a.Stats.EnemyHealth.CC.Tib+=c.Tib,a.Stats.EnemyHealth.CC.Cry+=c.Cry}}}a.Stats.Repair.Overall.RT=Math.max(a.Stats.Repair.Inf.RT,a.Stats.Repair.Vehi.RT,a.Stats.Repair.Air.RT);a.Stats.Battle.Outcome=0===a.Stats.Repair.Overall.EndHealth?1:0===a.Stats.EnemyHealth.CY.EndHealth?
3:2;a.Stats.Repair.Storage=Math.min(g.GetResourceCount(8),g.GetResourceCount(9),g.GetResourceCount(10));this.calcResources(e,a);setTimeout(function(){var a=ClientLib.Vis.VisMain.GetInstance().get_Battleground();Simulator.StatWindow.getInstance().sim[Simulator.StatWindow.getInstance().simSelected].Stats.Battle.Duration=a.get_BattleDuration()},1)}catch(s){console.log("Error Getting Player Unit Damage"),console.log(s.toString())}},calcResources:function(b,a){try{var c=ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity().get_CityFaction(),
e={1:0,2:0,3:0,6:0},d,g,k,f=-1,h=-1;for(g=0;9>g;g++)for(k=0;8>k;k++){var n=ClientLib.Vis.VisMain.GetInstance().get_City().get_GridWidth(),l=ClientLib.Vis.VisMain.GetInstance().get_City().get_GridHeight(),m=ClientLib.Vis.VisMain.GetInstance().GetObjectFromPosition(g*n,k*l);if(null!==m&&"function"===typeof m.get_BuildingName){try{if(void 0!==b)for(d=0;d<b.length;d++){var p=b[d],q=ClientLib.Res.ResMain.GetInstance().GetUnit_Obj(p.t);if(q.dn==m.get_BuildingName()){var t=Math.floor(16*ClientLib.API.Util.GetUnitMaxHealthByLevel(p.l,
q,!1));switch(c){case ClientLib.Base.EFactionType.GDIFaction:case ClientLib.Base.EFactionType.NODFaction:switch(q.pt){case ClientLib.Base.EPlacementType.Defense:case ClientLib.Base.EPlacementType.Structure:t=Math.floor(16*ClientLib.API.Util.GetUnitMaxHealthByLevel(p.l,q,!0))}}f=(p.sh-p.h)/t;"Harvester"==q.dn&&(h=m.get_BuildingDetails().get_HitpointsPercent(),Math.round(100*h)!=Math.round(100*f)&&(f=h));b.splice(d,1);break}}}catch(x){console.log("Error Calculating Resources 2"),console.log(x),console.log(x.name+
" "+x.message)}try{var s=m.get_BuildingDetails();-1==f&&(f=s.get_HitpointsPercent(),"Harvester"==m.get_BuildingName()&&(h=m.get_BuildingDetails().get_HitpointsPercent(),Math.round(100*h)!=Math.round(100*f)&&(f=h)))}catch(r){console.log("Error Calculating Resources 3"),console.log(r),console.log(r.name+" "+r.message)}var u=s.get_UnitLevelRepairRequirements();for(d=0;d<u.length;d++){var y=u[d].Type,w=u[d].Count;e[y]+=Math.round(f*w-0.5)}f=-1}}for(g=0;9>g;g++)for(k=8;16>k;k++)try{n=ClientLib.Vis.VisMain.GetInstance().get_DefenseSetup().get_GridWidth();
l=ClientLib.Vis.VisMain.GetInstance().get_DefenseSetup().get_GridHeight();8==k&&(n+=1,l+=1);var z=ClientLib.Vis.VisMain.GetInstance().GetObjectFromPosition(g*n,k*l);if(null!==z&&z.get_VisObjectType()!=ClientLib.Vis.VisObject.EObjectType.CityBuildingType&&"function"===typeof z.get_UnitDetails){if(void 0!==b)for(d=0;d<b.length;d++)if(p=b[d],q=ClientLib.Res.ResMain.GetInstance().GetUnit_Obj(p.t),q.dn==z.get_UnitName()){t=Math.floor(16*ClientLib.API.Util.GetUnitMaxHealthByLevel(p.l,q,!1));switch(c){case ClientLib.Base.EFactionType.GDIFaction:case ClientLib.Base.EFactionType.NODFaction:switch(q.pt){case ClientLib.Base.EPlacementType.Defense:case ClientLib.Base.EPlacementType.Structure:t=
Math.floor(16*ClientLib.API.Util.GetUnitMaxHealthByLevel(p.l,q,!0))}}f=(p.sh-p.h)/t;b.splice(d,1);break}var A=z.get_UnitDetails();-1==f&&(f=A.get_HitpointsPercent());u=A.get_UnitLevelRepairRequirements();for(d=0;d<u.length;d++)y=u[d].Type,w=u[d].Count,e[y]+=Math.round(f*w-0.5);f=-1}}catch(v){console.log("Error Calculating Resources 4"),console.log(v),console.log(v.name+" "+v.message)}var C=e[1]+e[2]+e[3]+e[6];if(void 0===b)for(d=0;d<this.sim.length;d++)this.sim[d].Reset(),this.sim[d].Stats.Loot.Overall.Base=
C,this.sim[d].Stats.Loot.Tib.Base=e[1],this.sim[d].Stats.Loot.Cry.Base=e[2],this.sim[d].Stats.Loot.Cred.Base=e[3],this.sim[d].Stats.Loot.RP.Base=e[6];else 3===a.Stats.Battle.Outcome?(a.Stats.Loot.Overall.Battle=a.Stats.Loot.Overall.Base,a.Stats.Loot.Tib.Battle=a.Stats.Loot.Tib.Base,a.Stats.Loot.Cry.Battle=a.Stats.Loot.Cry.Base,a.Stats.Loot.Cred.Battle=a.Stats.Loot.Cred.Base,a.Stats.Loot.RP.Battle=a.Stats.Loot.RP.Base):(a.Stats.Loot.Overall.Battle=C,a.Stats.Loot.Tib.Battle=e[1],a.Stats.Loot.Cry.Battle=
e[2],a.Stats.Loot.Cred.Battle=e[3],a.Stats.Loot.RP.Battle=e[6])}catch(B){console.log("Error Calculating Resources"),console.log(B),console.log(B.name+" "+B.message)}},disableSimulateStatButtonTimer:function(b){try{1E3<=b?(this.isSimStatButtonDisabled=!0,this.simStatBtn.setEnabled(!1),this.simStatBtn.setLabel(Math.floor(b/1E3)),b-=1E3,setTimeout(function(){Simulator.StatWindow.getInstance().disableSimulateStatButtonTimer(b)},1E3)):(setTimeout(function(){Simulator.StatWindow.getInstance().simStatBtn.setEnabled(!0);
Simulator.StatWindow.getInstance().simStatBtn.setLabel("Update")},b),this.isSimStatButtonDisabled=!1)}catch(a){console.log("Error disabling simulator button"),console.log(a.toString())}}}});qx.Class.define("Simulator.OptionWindow",{type:"singleton",extend:qx.ui.window.Window,construct:function(){this.base(arguments);this.setLayout(new qx.ui.layout.VBox(5));this.addListener("resize",function(){this.center()},this);this.set({caption:"Simulator Options",allowMaximize:!1,showMaximize:!1,allowMinimize:!1,
showMinimize:!1});var b=qx.core.Init.getApplication(),a=new qx.ui.tabview.TabView,c=new qx.ui.tabview.Page("General");genLayout=new qx.ui.layout.VBox(5);c.setLayout(genLayout);var e=new qx.ui.container.Composite(new qx.ui.layout.HBox(5));e.setThemedFont("bold");var d=new qx.ui.basic.Label("Buttons:");e.add(d);c.add(e);e=new qx.ui.container.Composite(new qx.ui.layout.VBox(5));this._buttonLocCB=new qx.ui.form.CheckBox("Right/Left Play Area");this._buttonLoc2CB=new qx.ui.form.CheckBox("Play Area/CombatBar Right Side");
this._buttonSizeCB=new qx.ui.form.CheckBox("Change SimBtn Size");this._buttonLocCB.addListener("changeValue",this._onButtonLocChange,this);this._buttonLoc2CB.addListener("changeValue",this._onButtonLocChange2,this);this._buttonSizeCB.addListener("changeValue",this._onButtonSizeChange,this);void 0!==localStorage.isBtnRight&&("yes"==localStorage.isBtnRight?this._buttonLocCB.setValue(!0):this._buttonLocCB.setValue(!1));void 0!==localStorage.isBtnCmd&&("yes"==localStorage.isBtnCmd?this._buttonLoc2CB.setValue(!0):
this._buttonLoc2CB.setValue(!1));void 0!==localStorage.isBtnNorm&&("yes"==localStorage.isBtnNorm?this._buttonSizeCB.setValue(!0):this._buttonSizeCB.setValue(!1),this.setButtonSize());this._disableRTBtnCB=new qx.ui.form.CheckBox("Disable Repair Button");this._disableRTBtnCB.addListener("changeValue",this._onDisableRTBtnChange,this);void 0!==localStorage.isRTBtnDisabled&&("yes"==localStorage.isRTBtnDisabled?this._disableRTBtnCB.setValue(!0):this._disableRTBtnCB.setValue(!1));this._disableCmtBtnCB=new qx.ui.form.CheckBox("Disable Combat Button");
this._disableCmtBtnCB.addListener("changeValue",this._onDisableCmtBtnChange,this);void 0!==localStorage.isCmtBtnDisabled&&("yes"==localStorage.isCmtBtnDisabled?this._disableCmtBtnCB.setValue(!0):this._disableCmtBtnCB.setValue(!1));this._ArmyUnitTooltip=new qx.ui.form.CheckBox("Disable Army Unit Tooltip");this._ArmyUnitTooltip.addListener("changeValue",this._onArmyUnitTooltipChange,this);void 0!==localStorage.ArmyUnitTooltipDisabled&&("yes"==localStorage.ArmyUnitTooltipDisabled?this._ArmyUnitTooltip.setValue(!0):
this._ArmyUnitTooltip.setValue(!1));e.add(this._buttonSizeCB);e.add(this._buttonLocCB);e.add(this._buttonLoc2CB);e.add(this._disableRTBtnCB);e.add(this._disableCmtBtnCB);e.add(this._ArmyUnitTooltip);c.add(e);e=(new qx.ui.container.Composite(new qx.ui.layout.HBox(5))).set({marginTop:10});e.setThemedFont("bold");d=new qx.ui.basic.Label("Simulator:");e.add(d);c.add(e);e=new qx.ui.container.Composite(new qx.ui.layout.VBox(5));this._autoSimulateCB=new qx.ui.form.CheckBox("Auto Start Simulation");void 0!==
localStorage.autoSimulate&&"yes"==localStorage.autoSimulate&&this._autoSimulateCB.setValue(!0);var g=(new qx.ui.container.Composite(new qx.ui.layout.Grid(5))).set({marginLeft:20}),k=new qx.ui.form.RadioButton("x1"),f=new qx.ui.form.RadioButton("x2"),h=new qx.ui.form.RadioButton("x4");this._simSpeedGroup=new qx.ui.form.RadioGroup(k,f,h);this._simSpeedGroup.addListener("changeSelection",this._onSimSpeedChange,this);this._autoSimulateCB.addListener("changeValue",this._onAutoSimulateChange,this);void 0!==
localStorage.simulateSpeed&&(d=this._simSpeedGroup.getSelectables(!1),"2"==localStorage.simulateSpeed?d[1].setValue(!0):"4"==localStorage.simulateSpeed?d[2].setValue(!0):d[0].setValue(!0));!1==this._autoSimulateCB.getValue()&&this._simSpeedGroup.setEnabled(!1);g.add(k,{row:0,column:0});g.add(f,{row:0,column:1});g.add(h,{row:0,column:2});e.add(this._autoSimulateCB);e.add(g);c.add(e);e=new qx.ui.tabview.Page("Stats");statsLayout=new qx.ui.layout.VBox(5);e.setLayout(statsLayout);d=new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
d.setThemedFont("bold");g=new qx.ui.basic.Label("Stat Window:");d.add(g);e.add(d);d=new qx.ui.container.Composite(new qx.ui.layout.VBox(5));this._autoOpenCB=new qx.ui.form.CheckBox("Auto Open");this._autoOpenCB.addListener("changeValue",this._onAutoOpenStatsChange,this);void 0!==localStorage.autoOpenStat&&("yes"==localStorage.autoOpenStat?this._autoOpenCB.setValue(!0):this._autoOpenCB.setValue(!1));d.add(this._autoOpenCB);e.add(d);d=(new qx.ui.container.Composite(new qx.ui.layout.HBox(5))).set({marginTop:10});
d.setThemedFont("bold");g=new qx.ui.basic.Label(b.tr("tnf:combat target"));d.add(g);e.add(d);g=new qx.ui.container.Composite(new qx.ui.layout.HBox(5));k=new qx.ui.form.RadioButton("HP abs");f=new qx.ui.form.RadioButton("HP rel");this._EnemyHealthSecGroup=new qx.ui.form.RadioGroup(k,f);this._EnemyHealthSecGroup.addListener("changeSelection",this._onEnemyHealthSelectionChange,this);void 0!==localStorage.getEHSelection&&(d=this._EnemyHealthSecGroup.getSelectables(!1),"hp"==localStorage.getEHSelection?
d[0].setValue(!0):"hp rel"==localStorage.getEHSelection?d[1].setValue(!0):d[0].setValue(!0));g.add(k);g.add(f);e.add(g);d=(new qx.ui.container.Composite(new qx.ui.layout.HBox(5))).set({marginTop:10});d.setThemedFont("bold");b=new qx.ui.basic.Label(b.tr("tnf:own repair cost"));d.add(b);e.add(d);b=new qx.ui.container.Composite(new qx.ui.layout.HBox(5));g=new qx.ui.form.RadioButton("RT");k=new qx.ui.form.RadioButton("C");f=new qx.ui.form.RadioButton("HP abs");h=new qx.ui.form.RadioButton("HP rel");this._repairSecGroup=
new qx.ui.form.RadioGroup(g,k,f,h);this._repairSecGroup.addListener("changeSelection",this._onRepairSelectionChange,this);void 0!==localStorage.getRTSelection&&(d=this._repairSecGroup.getSelectables(!1),"rt"==localStorage.getRTSelection?d[0].setValue(!0):"cry"==localStorage.getRTSelection?d[1].setValue(!0):"hp"==localStorage.getRTSelection?d[2].setValue(!0):"hp rel"==localStorage.getRTSelection?d[3].setValue(!0):d[0].setValue(!0));b.add(g);b.add(k);b.add(f);b.add(h);e.add(b);b=(new qx.ui.container.Composite(new qx.ui.layout.HBox(5))).set({marginTop:10});
b.setThemedFont("bold");d=new qx.ui.basic.Label("Simulations shown");b.add(d);e.add(b);b=new qx.ui.container.Composite(new qx.ui.layout.HBox(10));this._simViews=(new qx.ui.form.Spinner).set({minimum:2});void 0!==localStorage.simViews&&(isNaN(parseInt(localStorage.simViews,10))?this._simViews.setValue(Simulator.StatWindow.getInstance().simViews):this._simViews.setValue(parseInt(localStorage.simViews,10)));this._simViews.addListener("changeValue",this._onSimViewsChanged,this);b.add(this._simViews);
e.add(b);b=(new qx.ui.container.Composite(new qx.ui.layout.HBox(5))).set({marginTop:10});b.setThemedFont("bold");d=new qx.ui.basic.Label("Hide Sections (on Startup):");b.add(d);e.add(b);b=new qx.ui.container.Composite(new qx.ui.layout.HBox(10));this._hideHealthCB=new qx.ui.form.CheckBox("Health");this._hideRepairCB=new qx.ui.form.CheckBox("Repair");this._hideLootCB=new qx.ui.form.CheckBox("Loot");this._hideHealthCB.addListener("changeValue",this._onHideEHChange,this);this._hideRepairCB.addListener("changeValue",
this._onHideRTChange,this);this._hideLootCB.addListener("changeValue",this._onHideLootChange,this);void 0!==localStorage.hideHealth&&("yes"==localStorage.hideHealth?this._hideHealthCB.setValue(!0):this._hideHealthCB.setValue(!1));void 0!==localStorage.hideRepair&&("yes"==localStorage.hideRepair?this._hideRepairCB.setValue(!0):this._hideRepairCB.setValue(!1));void 0!==localStorage.hideLoot&&("yes"==localStorage.hideLoot?this._hideLootCB.setValue(!0):this._hideLootCB.setValue(!1));b.add(this._hideHealthCB);
b.add(this._hideRepairCB);b.add(this._hideLootCB);e.add(b);b=(new qx.ui.container.Composite(new qx.ui.layout.HBox(5))).set({marginTop:10});d=(new qx.ui.basic.Label("Set Stat Window Position:")).set({alignY:"middle"});d.setFont("bold");g=(new qx.ui.form.Button("Set")).set({allowGrowX:!1,allowGrowY:!1,height:20});g.addListener("click",this._onSetStatWindowPositionChange,this);b.add(d);b.add(g);e.add(b);a.add(c);a.add(e);this.add(a)},destruct:function(){},members:{_buttonSizeCB:null,_buttonLocCB:null,
_buttonLoc2CB:null,_disableRTBtnCB:null,_disableCmtBtnCB:null,_autoOpenCB:null,_autoSimulateCB:null,_simSpeedGroup:null,_repairSecGroup:null,_EnemyHealthSecGroup:null,_simViews:null,_hideHealthCB:null,_hideRepairCB:null,_hideLootCB:null,_ArmyUnitTooltip:null,_onButtonSizeChange:function(){try{!0==this._buttonSizeCB.getValue()?localStorage.isBtnNorm="yes":localStorage.isBtnNorm="no",this.setButtonSize()}catch(b){console.log("Error Button Size Change: "+b.toString())}},_onButtonLocChange:function(){try{!0==
this._buttonLocCB.getValue()?localStorage.isBtnRight="yes":localStorage.isBtnRight="no",this.setButtonLoc()}catch(b){console.log("Error Button Location Change: "+b.toString())}},_onButtonLocChange2:function(){try{!0==this._buttonLoc2CB.getValue()?localStorage.isBtnCmd="yes":localStorage.isBtnCmd="no",this.setButtonLoc2()}catch(b){console.log("Error Button Location Change: "+b.toString())}},_onDisableRTBtnChange:function(){try{var b=this._disableRTBtnCB.getValue();localStorage.isRTBtnDisabled=!0==
b?"yes":"no";this.setRTBtn(b)}catch(a){console.log("Error Disable RT Button Change: "+a.toString())}},_onDisableCmtBtnChange:function(){try{var b=this._disableCmtBtnCB.getValue();localStorage.isCmtBtnDisabled=!0==b?"yes":"no";this.setCmtBtn(b)}catch(a){console.log("Error Disable Cmt Button Change: "+a.toString())}},_onEnemyHealthSelectionChange:function(b){try{var a=b.getData()[0].getLabel();localStorage.getEHSelection="HP abs"==a?"hp":"HP rel"==a?"hp rel":"hp"}catch(c){console.log("Error Enemy Health Section Selection Change: "+
c.toString())}},_onRepairSelectionChange:function(b){try{var a=b.getData()[0].getLabel();localStorage.getRTSelection="RT"==a?"rt":"HP abs"==a?"hp":"HP rel"==a?"hp rel":"C"==a?"cry":"rt"}catch(c){console.log("Error Repair Section Selection Change: "+c.toString())}},_onAutoOpenStatsChange:function(){try{!1==this._autoOpenCB.getValue()?localStorage.autoOpenStat="no":localStorage.autoOpenStat="yes"}catch(b){console.log("Error Auto Open Stats Change: "+b.toString())}},_onArmyUnitTooltipChange:function(){try{!1==
this._ArmyUnitTooltip.getValue()?localStorage.ArmyUnitTooltipDisabled="no":localStorage.ArmyUnitTooltipDisabled="yes"}catch(b){console.log("Error Army Unit Tooltip Change: "+b.toString())}},_onAutoSimulateChange:function(){try{!1==this._autoSimulateCB.getValue()?(this._simSpeedGroup.setEnabled(!1),localStorage.autoSimulate="no"):(this._simSpeedGroup.setEnabled(!0),localStorage.autoSimulate="yes")}catch(b){console.log("Error Auto Simulate Change: "+b.toString())}},_onSimSpeedChange:function(b){try{var a=
b.getData()[0].getLabel();localStorage.simulateSpeed="x1"==a?"1":"x2"==a?"2":"4"}catch(c){console.log("Error Sim Speed Change: "+c.toString())}},_onSimViewsChanged:function(){try{var b=parseInt(this._simViews.getValue(),10);if(!isNaN(b)&&0<b){localStorage.simViews=b.toString();Simulator.StatWindow.getInstance().simViews=b;for(var a=Simulator.StatWindow.getInstance().sim.length-1;0<=a;a--)a>b-1&&(Simulator.StatWindow.getInstance().Battle.remove(Simulator.StatWindow.getInstance().sim[a].Label.Battle.container),
Simulator.StatWindow.getInstance().EnemyHealth.remove(Simulator.StatWindow.getInstance().sim[a].Label.EnemyHealth.container),Simulator.StatWindow.getInstance().Repair.remove(Simulator.StatWindow.getInstance().sim[a].Label.Repair.container),Simulator.StatWindow.getInstance().Loot.remove(Simulator.StatWindow.getInstance().sim[a].Label.Loot.container),Simulator.StatWindow.getInstance().sim.pop());for(a=0;a<b;a++)a==Simulator.StatWindow.getInstance().sim.length&&(Simulator.StatWindow.getInstance().sim.push(new (Simulator.StatWindow.getInstance().Simulation)(a)),
Simulator.StatWindow.getInstance().Battle.add(Simulator.StatWindow.getInstance().sim[a].Label.Battle.container,{flex:1}),Simulator.StatWindow.getInstance().EnemyHealth.add(Simulator.StatWindow.getInstance().sim[a].Label.EnemyHealth.container,{flex:1}),Simulator.StatWindow.getInstance().Repair.add(Simulator.StatWindow.getInstance().sim[a].Label.Repair.container,{flex:1}),Simulator.StatWindow.getInstance().Loot.add(Simulator.StatWindow.getInstance().sim[a].Label.Loot.container,{flex:1}),Simulator.StatWindow.getInstance().sim[a].Select(Simulator.StatWindow.getInstance().simSelected));
if(b-1<Simulator.StatWindow.getInstance().simSelected)for(a=Simulator.StatWindow.getInstance().simSelected=0;a<Simulator.StatWindow.getInstance().sim.length;a++)Simulator.StatWindow.getInstance().sim[a].Select(0)}}catch(c){console.log("Error Simulation Views Change: "+c.toString())}},_onHideEHChange:function(){try{!0==this._hideHealthCB.getValue()?localStorage.hideHealth="yes":localStorage.hideHealth="no"}catch(b){console.log("Error Hide Enemy Base Health Change: "+b.toString())}},_onHideRTChange:function(){try{!0==
this._hideRepairCB.getValue()?localStorage.hideRepair="yes":localStorage.hideRepair="no"}catch(b){console.log("Error Hide Repair Times Change: "+b.toString())}},_onHideLootChange:function(){try{!0==this._hideLootCB.getValue()?localStorage.hideLoot="yes":localStorage.hideLoot="no"}catch(b){console.log("Error Hide Loot Change: "+b.toString())}},_onSetStatWindowPositionChange:function(){try{var b=Simulator.StatWindow.getInstance().getLayoutProperties();localStorage.statWindowPosLeft=b.left;localStorage.statWindowPosTop=
b.top}catch(a){console.log("Error Stat Window Position Change: "+a.toString())}},setRTBtn:function(b){!0==b?Simulator.getInstance().unlockRTBtn.hide():Simulator.getInstance().unlockRTBtn.show()},setCmtBtn:function(b){!0==b?Simulator.getInstance().unlockCmtBtn.hide():Simulator.getInstance().unlockCmtBtn.show()},setButtonLoc:function(){try{var b=this._buttonLocCB.getValue(),a=this._buttonSizeCB.getValue();if(!0==b){if(!0==a)var c=70;Simulator.getInstance().playArea.add(Simulator.getInstance().simBtn,
{left:null,right:3,bottom:161});Simulator.getInstance().playArea.add(Simulator.getInstance().statBtn,{left:null,right:34,bottom:412});Simulator.getInstance().playArea.add(Simulator.getInstance().optionBtn,{left:null,right:3,bottom:365});Simulator.getInstance().playArea.add(Simulator.getInstance().layoutBtn,{left:null,right:3,bottom:412});Simulator.getInstance().playArea.add(Simulator.getInstance().shiftUpBtn,{left:null,right:19.5,bottom:244.5});Simulator.getInstance().playArea.add(Simulator.getInstance().shiftDownBtn,
{left:null,right:19.5,bottom:217});Simulator.getInstance().playArea.add(Simulator.getInstance().shiftLeftBtn,{left:null,right:40,bottom:231});Simulator.getInstance().playArea.add(Simulator.getInstance().shiftRightBtn,{left:null,right:3,bottom:231});Simulator.getInstance().playArea.add(Simulator.getInstance().disableAllUnitsBtn,{left:null,right:30,bottom:339.5});Simulator.getInstance().playArea.add(Simulator.getInstance().mirrorBtnH,{left:null,right:3,bottom:314.5});Simulator.getInstance().playArea.add(Simulator.getInstance().mirrorBtnV,
{left:null,right:30,bottom:314.5});Simulator.getInstance().playArea.add(Simulator.getInstance().armyUndoBtn,{left:null,right:3,bottom:339.5});Simulator.getInstance().playArea.add(Simulator.getInstance().quickSaveBtn,{left:null,right:3,bottom:136});Simulator.getInstance().playArea.add(Simulator.getInstance().mirrorBtnC,{left:null,right:3,bottom:264.5});Simulator.getInstance().playArea.add(Simulator.getInstance().mirrorBtnK,{left:null,right:18.5,bottom:289.5});Simulator.getInstance().playArea.add(Simulator.getInstance().mirrorBtnU,
{left:null,right:35,bottom:264.5})}else c=null,Simulator.getInstance().playArea.add(Simulator.getInstance().simBtn,{right:c,left:3,bottom:161}),Simulator.getInstance().playArea.add(Simulator.getInstance().statBtn,{right:c,left:34,bottom:412}),Simulator.getInstance().playArea.add(Simulator.getInstance().optionBtn,{right:c,left:3,bottom:365}),Simulator.getInstance().playArea.add(Simulator.getInstance().layoutBtn,{right:c,left:3,bottom:412}),Simulator.getInstance().playArea.add(Simulator.getInstance().shiftUpBtn,
{right:c,left:19.5,bottom:244.5}),Simulator.getInstance().playArea.add(Simulator.getInstance().shiftDownBtn,{right:c,left:19.5,bottom:217}),Simulator.getInstance().playArea.add(Simulator.getInstance().shiftLeftBtn,{right:c,left:3,bottom:231}),Simulator.getInstance().playArea.add(Simulator.getInstance().shiftRightBtn,{right:c,left:40,bottom:231}),Simulator.getInstance().playArea.add(Simulator.getInstance().disableAllUnitsBtn,{right:c,left:30,bottom:339.5}),Simulator.getInstance().playArea.add(Simulator.getInstance().mirrorBtnH,
{right:c,left:3,bottom:314.5}),Simulator.getInstance().playArea.add(Simulator.getInstance().mirrorBtnV,{right:c,left:30,bottom:314.5}),Simulator.getInstance().playArea.add(Simulator.getInstance().armyUndoBtn,{right:c,left:3,bottom:339.5}),Simulator.getInstance().playArea.add(Simulator.getInstance().quickSaveBtn,{right:c,left:3,bottom:136}),Simulator.getInstance().playArea.add(Simulator.getInstance().mirrorBtnC,{right:c,left:3,bottom:264.5}),Simulator.getInstance().playArea.add(Simulator.getInstance().mirrorBtnK,
{right:c,left:18.5,bottom:289.5}),Simulator.getInstance().playArea.add(Simulator.getInstance().mirrorBtnU,{right:c,left:35,bottom:264.5})}catch(e){console.log("Error Setting Button Location: "+e.toString())}},setButtonLoc2:function(){try{var b=this._buttonLoc2CB.getValue();this._buttonSizeCB.getValue();if(!0==b){var a=null;Simulator.getInstance().playArea.add(Simulator.getInstance().simBtn,{left:a,right:3,bottom:161});Simulator.getInstance().playArea.add(Simulator.getInstance().statBtn,{left:a,right:34,
bottom:412});Simulator.getInstance().playArea.add(Simulator.getInstance().optionBtn,{left:a,right:3,bottom:365});Simulator.getInstance().playArea.add(Simulator.getInstance().layoutBtn,{left:a,right:3,bottom:412});Simulator.getInstance().playArea.add(Simulator.getInstance().shiftUpBtn,{left:a,right:19.5,bottom:244.5});Simulator.getInstance().playArea.add(Simulator.getInstance().shiftDownBtn,{left:a,right:19.5,bottom:217});Simulator.getInstance().playArea.add(Simulator.getInstance().shiftLeftBtn,{left:a,
right:40.2,bottom:231});Simulator.getInstance().playArea.add(Simulator.getInstance().shiftRightBtn,{left:a,right:3,bottom:231});Simulator.getInstance().playArea.add(Simulator.getInstance().disableAllUnitsBtn,{left:a,right:30,bottom:339.5});Simulator.getInstance().playArea.add(Simulator.getInstance().mirrorBtnH,{left:a,right:3,bottom:314.5});Simulator.getInstance().playArea.add(Simulator.getInstance().mirrorBtnV,{left:a,right:30,bottom:314.5});Simulator.getInstance().playArea.add(Simulator.getInstance().armyUndoBtn,
{left:a,right:3,bottom:339.5});Simulator.getInstance().playArea.add(Simulator.getInstance().quickSaveBtn,{left:a,right:3,bottom:136});Simulator.getInstance().playArea.add(Simulator.getInstance().mirrorBtnC,{left:a,right:3,bottom:264.5});Simulator.getInstance().playArea.add(Simulator.getInstance().mirrorBtnK,{left:a,right:18.5,bottom:289.5});Simulator.getInstance().playArea.add(Simulator.getInstance().mirrorBtnU,{left:a,right:35,bottom:264.5})}else a=null,Simulator.getInstance().armyBar.add(Simulator.getInstance().simBtn,
{left:a,right:60,bottom:13}),Simulator.getInstance().playArea.add(Simulator.getInstance().statBtn,{left:a,right:34,bottom:412}),Simulator.getInstance().playArea.add(Simulator.getInstance().armyUndoBtn,{left:a,right:3,bottom:339.5}),Simulator.getInstance().playArea.add(Simulator.getInstance().disableAllUnitsBtn,{left:a,right:30,bottom:339.5}),Simulator.getInstance().playArea.add(Simulator.getInstance().optionBtn,{left:a,right:3,bottom:365}),Simulator.getInstance().playArea.add(Simulator.getInstance().layoutBtn,
{left:a,right:3,bottom:412}),Simulator.getInstance().armyBar.add(Simulator.getInstance().shiftUpBtn,{left:a,right:80,bottom:135}),Simulator.getInstance().armyBar.add(Simulator.getInstance().shiftDownBtn,{left:a,right:80,bottom:109}),Simulator.getInstance().armyBar.add(Simulator.getInstance().shiftLeftBtn,{left:a,right:100,bottom:122}),Simulator.getInstance().armyBar.add(Simulator.getInstance().shiftRightBtn,{left:a,right:63,bottom:122}),Simulator.getInstance().armyBar.add(Simulator.getInstance().mirrorBtnH,
{left:a,right:63,bottom:83}),Simulator.getInstance().armyBar.add(Simulator.getInstance().mirrorBtnV,{left:a,right:90,bottom:83}),Simulator.getInstance().playArea.add(Simulator.getInstance().quickSaveBtn,{left:a,right:3,bottom:136})}catch(c){console.log("Error Setting Button Location: "+c.toString())}},setButtonSize:function(){try{value=this._buttonSizeCB.getValue(),!0==value?(Simulator.getInstance().simBtn.setLabel("S","http://i.imgur.com/P7hf5CG.png"),Simulator.getInstance().simBtn.getChildControl("icon").set({width:45,
height:45,scale:!0}),Simulator.getInstance().simBtn.setWidth(45)):(Simulator.getInstance().simBtn.setLabel("S","http://i.imgur.com/P7hf5CG.png"),Simulator.getInstance().simBtn.getChildControl("icon").set({width:72,height:46,scale:!0}),Simulator.getInstance().simBtn.setWidth(72)),Simulator.getInstance().statBtn.setLabel("","http://icons.iconarchive.com/icons/kyo-tux/phuzion/16/Misc-Stats-icon.png"),Simulator.getInstance().statBtn.setWidth(25),Simulator.getInstance().statBtn.setHeight(25),Simulator.getInstance().optionBtn.setLabel("Options"),
Simulator.getInstance().optionBtn.setWidth(45),Simulator.getInstance().layoutBtn.setLabel(""),Simulator.getInstance().layoutBtn.setWidth(25),Simulator.getInstance().layoutBtn.setHeight(25),this.setButtonLoc(),this.setButtonLoc2()}catch(b){console.log("Error Setting Button Size: "+b.toString())}}}});qx.Class.define("Simulator.LayoutWindow",{type:"singleton",extend:webfrontend.gui.CustomWindow,construct:function(){this.base(arguments);this.setLayout(new qx.ui.layout.VBox);this.set({width:200,caption:"Simulator Layouts",
padding:2,allowMaximize:!1,showMaximize:!1,allowMinimize:!1,showMinimize:!1});var b=(new qx.ui.container.Composite(new qx.ui.layout.VBox(5))).set({decorator:"pane-light-opaque"}),a=(new qx.ui.basic.Label("Formation Saver")).set({alignX:"center",alignY:"top",font:"font_size_14_bold"});b.add(a);this.add(b);this.layoutList=new qx.ui.form.List;this.layoutList.set({selectionMode:"one",height:100,width:150,margin:5});this.add(this.layoutList);b=new qx.ui.container.Composite;a=new qx.ui.layout.HBox(5,"center");
b.setLayout(a);var a=new qx.ui.form.Button("Load"),c=new qx.ui.form.Button("Delete");a.set({height:15,width:70,alignX:"center"});a.addListener("click",this.loadLayout,this);c.set({height:15,width:70,alignX:"center"});c.addListener("click",this.deleteLayout,this);b.add(a);b.add(c);this.add(b);b=(new qx.ui.container.Composite((new qx.ui.layout.HBox).set({spacing:10}))).set({marginTop:20,marginLeft:5});this.layoutTextBox=(new qx.ui.form.TextField("")).set({width:75,maxLength:15});a=new qx.ui.form.Button("Save");
a.set({height:10,width:70,alignX:"center"});a.addListener("click",this.saveNewLayout,this);b.add(this.layoutTextBox);b.add(a);this.add(b);b=(new qx.ui.container.Composite((new qx.ui.layout.HBox).set({spacing:10}))).set({marginTop:10,marginLeft:5});this.persistentCheck=new qx.ui.form.CheckBox("Make Persistent");this.persistentCheck.setTextColor("white");this.persistentCheck.setFont("bold");this.persistentCheck.setToolTipText("If checked, formation will be saved and can be used by this city in any other city");
b.add(this.persistentCheck);this.add(b);b=(new qx.ui.container.Composite(new qx.ui.layout.HBox)).set({marginTop:5,marginLeft:5});a=(new qx.ui.basic.Label("")).set({alignX:"center",alignY:"top"});a.setValue(" <align='justify'><b>If formation does not change on load, try moving one unit first, then try again.</b></p>");a.set({rich:!0,wrap:!0,width:165,textColor:"white"});b.add(a);this.add(b);b=(new qx.ui.container.Composite(new qx.ui.layout.VBox)).set({alignX:"center",marginTop:5,marginLeft:5,allowGrowX:!1});
a=(new qx.ui.form.Button("Clear All")).set({alignX:"center",width:70});a.addListener("click",this.clearAllLayouts,this);b.add(a);this.add(b);this.layoutsArray=[]},destruct:function(){},members:{layoutList:null,layoutTextBox:null,layoutsArray:null,persistentCheck:null,saveNewLayout:function(b){try{console.log("Saving Layout");if(void 0!==b&&!0==b||""==this.layoutTextBox.getValue())var a=new Date,c=a.getDate(),e=a.getMonth()+1,d=10>a.getHours()?"0"+a.getHours():a.getHours(),g=10>a.getMinutes()?"0"+
a.getMinutes():a.getMinutes(),k=10>a.getSeconds()?"0"+a.getSeconds():a.getSeconds(),f=e+"/"+c+"@"+d+":"+g+":"+k;else f=this.layoutTextBox.getValue();var h=ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId(),n=ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCityId()+"."+h+"."+f,l=this.layoutList.getChildren();for(b=0;b<l.length;b++)if(thisItem=l[b].getModel(),thisItem==n){alert("Save Failed: Duplicate Name");return}var m=Simulator.getInstance().getCityPreArmyUnits().get_ArmyUnits().l,
m=this.prepareLayout(m),l={},l=!0==this.persistentCheck.getValue()?{id:n,label:f,formation:m,pers:"yes"}:{id:n,label:f,formation:m,pers:"no"};this.layoutsArray.push(l);this.layoutList.add(new qx.ui.form.ListItem(l.label,null,l.id));this.layoutTextBox.setValue("");Simulator.getInstance().quickSaveBtn.setLabel("?");setTimeout(function(){Simulator.getInstance().quickSaveBtn.setLabel("QS")},2E3);this.updateStorage()}catch(p){console.log("Error Saving Layout"),console.log(p)}},loadLayout:function(){try{console.log("Loading Layout");
ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCityId();var b=this.layoutList.getSelection()[0].getModel(),a;for(a in this.layoutsArray)if(this.layoutsArray[a].id==b){Simulator.getInstance().restoreFormation(this.layoutsArray[a].formation);break}}catch(c){console.log("Error Loading Layout"),console.log(c)}},deleteLayout:function(){try{if(console.log("Deleting Layout"),confirm("Are you sure you want to delete this layout?")){for(var b in this.layoutsArray)this.layoutsArray[b].id==
this.layoutList.getSelection()[0].getModel()&&(this.layoutsArray.splice(b,1),this.updateStorage());this.updateLayoutList()}}catch(a){console.log("Error Deleting Layout"),console.log(a)}},updateStorage:function(){try{console.log("Updating Storage"),localStorage.savedFormations=JSON.stringify(this.layoutsArray)}catch(b){console.log("Error updating localStorage"),console.log(b)}},updateLayoutList:function(){try{console.log("Updating Layout List");var b=localStorage.savedFormations;void 0!==b&&(this.layoutsArray=
JSON.parse(b));this.layoutList.removeAll();var a=ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId(),c=ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCityId(),b=c+"."+a,e;for(e in this.layoutsArray){var d=this.layoutsArray[e].label,a=b+"."+d,g=this.layoutsArray[e].pers,k=this.layoutsArray[e].id.match(c.toString());(a==this.layoutsArray[e].id||void 0!==g&&"yes"==g&&null!=k)&&this.layoutList.add(new qx.ui.form.ListItem(d,null,this.layoutsArray[e].id))}}catch(f){console.log("Error Updating Layout List"),
console.log(f)}},prepareLayout:function(b){try{console.log("Preparing Layout for Saving");saved_units=[];for(var a=0;a<b.length;a++){var c=b[a],e={};e.x=c.get_CoordX();e.y=c.get_CoordY();e.id=c.get_Id();e.enabled=c.get_Enabled();saved_units.push(e)}return saved_units}catch(d){console.log("Error Preparing Unit Layout"),console.log(d)}},clearAllLayouts:function(){try{console.log("Clearing All Layouts"),confirm("Clicking OK will delete all of your saved layouts from every base!")?(localStorage.removeItem("savedFormations"),
this.layoutsArray=[],alert("All saved layouts have been deleted."),this.updateLayoutList()):alert("No layouts were deleted.")}catch(b){console.log("Error Clearing All Layouts"),console.log(b)}}}})}function C(b,a){setTimeout(function(){try{if(console.log("View Changed"),Simulator.OptionWindow.getInstance().close(),Simulator.LayoutWindow.getInstance().close(),a!=ClientLib.Vis.Mode.CombatSetup&&a!=ClientLib.Vis.Mode.Battleground?(Simulator.StatWindow.getInstance().close(),Simulator.getInstance().armyTempFormations=
[],Simulator.getInstance().armyTempIdx=0,Simulator.getInstance().armyUndoBtn.setEnabled(!1),Simulator.getInstance().isSimulation=!1):a==ClientLib.Vis.Mode.CombatSetup&&(void 0!==localStorage.autoOpenStat?"yes"==localStorage.autoOpenStat?Simulator.StatWindow.getInstance().open():Simulator.StatWindow.getInstance().close():(Simulator.StatWindow.getInstance().open(),localStorage.autoOpenStat="yes"),localStorage.allUnitsDisabled="no",!1==Simulator.getInstance().isSimulation?setTimeout(function(){Simulator.StatWindow.getInstance().calcResources()},
2E3):Simulator.getInstance().isSimulation=!1,b!=ClientLib.Vis.Mode.Battleground&&Simulator.getInstance().saveTempFormation()),null!=ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity()){var c=ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity().get_Name(),e=ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity().get_Name();a==ClientLib.Vis.Mode.Battleground||c==e?(Simulator.getInstance().simBtn.hide(),Simulator.getInstance().shiftUpBtn.hide(),Simulator.getInstance().shiftDownBtn.hide(),
Simulator.getInstance().shiftLeftBtn.hide(),Simulator.getInstance().shiftRightBtn.hide(),Simulator.getInstance().disableAllUnitsBtn.hide(),Simulator.getInstance().mirrorBtnH.hide(),Simulator.getInstance().mirrorBtnV.hide(),Simulator.getInstance().mirrorBtnC.hide(),Simulator.getInstance().mirrorBtnK.hide(),Simulator.getInstance().mirrorBtnU.hide(),Simulator.getInstance().armyUndoBtn.hide(),Simulator.getInstance().layoutBtn.hide(),Simulator.getInstance().optionBtn.hide(),Simulator.getInstance().statBtn.hide(),
Simulator.getInstance().quickSaveBtn.hide()):c!=e&&(Simulator.getInstance().simBtn.show(),Simulator.getInstance().shiftUpBtn.show(),Simulator.getInstance().shiftDownBtn.show(),Simulator.getInstance().shiftLeftBtn.show(),Simulator.getInstance().shiftRightBtn.show(),Simulator.getInstance().disableAllUnitsBtn.show(),Simulator.getInstance().mirrorBtnH.show(),Simulator.getInstance().mirrorBtnV.show(),Simulator.getInstance().mirrorBtnC.show(),Simulator.getInstance().mirrorBtnK.show(),Simulator.getInstance().mirrorBtnU.show(),
Simulator.getInstance().armyUndoBtn.show(),Simulator.getInstance().layoutBtn.show(),Simulator.getInstance().optionBtn.show(),Simulator.getInstance().statBtn.show(),Simulator.getInstance().quickSaveBtn.show())}}catch(d){console.log("Error closing windows or hiding buttons on view change"),console.log(d.toString())}},500)}function w(){try{if("undefined"!==typeof qx&&"undefined"!==typeof qx.core&&"undefined"!==typeof qx.core.Init&&"undefined"!==typeof ClientLib&&"undefined"!==typeof phe)if(!0==qx.core.Init.getApplication().initDone)try{console.log("CENTER DRIVEN - Tiberium Alliances Combat Simulator: Loading");
r();if(392583<=PerforceChangelist){var b=""+ClientLib.Data.Cities.prototype.get_CurrentCity,a;for(a in ClientLib.Data.Cities.prototype)if(ClientLib.Data.Cities.prototype.hasOwnProperty(a)&&"function"==typeof ClientLib.Data.Cities.prototype[a]&&-1<(""+ClientLib.Data.Cities.prototype[a]).indexOf(b)&&6==a.length){b=a;break}var c=""+ClientLib.Data.Cities.prototype.get_CurrentOwnCity,e;for(e in ClientLib.Data.Cities.prototype)if(ClientLib.Data.Cities.prototype.hasOwnProperty(e)&&"function"==typeof ClientLib.Data.Cities.prototype[e]&&
-1<(""+ClientLib.Data.Cities.prototype[e]).indexOf(c)&&6==e.length){c=e;break}var d=""+ClientLib.API.Util.GetUnitRepairCosts,d=d.replace(b,c),g=d.substring(d.indexOf("{")+1,d.lastIndexOf("}")),k=Function("a,b,c",g);ClientLib.API.Util.GetUnitRepairCosts=k}Simulator.getInstance();Simulator.StatWindow.getInstance();Simulator.OptionWindow.getInstance();Simulator.LayoutWindow.getInstance();phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance(),"ViewModeChange",ClientLib.Vis.ViewModeChange,this,
C);console.log("CENTER DRIVEN - Tiberium Alliances Combat Simulator: Loaded")}catch(f){console.log("CENTER DRIVEN - Tiberium Alliances Combat Simulator initialization error:"),console.log(f)}else window.setTimeout(w,1E3);else window.setTimeout(w,1E3)}catch(h){console.log(h)}}window.setTimeout(w,1E3)}.toString()+")();";r.type="text/javascript";document.getElementsByTagName("head")[0].appendChild(r)})();



// ==UserScript==
// @name Tiberium Alliances - New Resource Trade Window
// @description Implements a new TradeOverlay class, allowing you to select individual, multiple or all bases to transfer resources from
// @namespace NewTradeOverlay
// @include https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version 1.4.7
// @author Chiantii
// @updateURL https://userscripts.org/scripts/source/168297.meta.js
// @downloadURL https://userscripts.org/scripts/source/168297.user.js
// ==/UserScript==
(function () {
	var NewTradeOverlay_main = function () {
		console.log('NewTradeOverlay loaded');
		function CreateNewTradeOverlay() {
			qx.Class.undefine("webfrontend.gui.trade.TradeOverlay");
			qx.Class.define("webfrontend.gui.trade.TradeOverlay", {
				type : "singleton",
				extend : webfrontend.gui.OverlayWindow,
				construct : function () {
					webfrontend.gui.OverlayWindow.call(this);
					this.set({
						autoHide : false
					});
					this.clientArea.setLayout(new qx.ui.layout.HBox());
					this.clientArea.setMargin(0);
					this.clientArea.setWidth(464);
					this.setTitle(qx.locale.Manager.tr("tnf:trade window title"));
					this.clientArea.add(new qx.ui.core.Spacer(), {
						flex : 1
					});
					this.clientArea.add(this.tradeWindow());
					this.clientArea.add(new qx.ui.core.Spacer(), {
						flex : 1
					});
					this.tradeConfirmationWidget = new webfrontend.gui.widgets.confirmationWidgets.TradeConfirmationWidget();
				},
				members : {
					activated : false,
					transferWindowTableSelectedRows : null,
					modifier : null,
					tradeWindowTable : null,
					tableColumnModel : null,
					resourceTransferType : null,
					transferAmountTextField : null,
					largeTiberiumImage : null,
					costToTradeLabel : null,
					transferFromBaseLabel : null,
					totalResourceAmount : null,
					selectedRowData : null,
					selectedRow : null,
					tradeButton : null,
					tenPercentButton : null,
					twentyFivePercentButton : null,
					fiftyPercentButton : null,
					seventyFivePercentButton : null,
					oneHundredPercentButton : null,
					resourceSelectionRadioButtons : null,
					selectAllNoneButton : null,
					userDefinedMinimumAmount : -1,
					userDefinedMaxDistance : -1,
					tradeConfirmationWidget : null,
					activate : function () {
						if (!this.activated) {
							ClientLib.Vis.VisMain.GetInstance().PlayUISound("audio/ui/OpenWindow");
							phe.cnc.base.Timer.getInstance().addListener("uiTick", this._onTick, this);
							this.selectedRowData = null;
							this.selectedRow = null;
							this.transferWindowTableSelectedRows = [];
							this.transferAmountTextField.setValue("");
							this.costToTradeLabel.setValue("0");
							this.userDefinedMinimumAmount = -1;
							this.userDefinedMaxDistance = -1;
							this.resourceTransferType = ClientLib.Base.EResourceType.Tiberium;
							this.tradeWindowTable.resetCellFocus();
							this.tradeWindowTable.resetSelection();
							this.transferFromBaseLabel.setValue(qx.locale.Manager.tr("tnf:select base for transfer"));
							this.resourceSelectionRadioButtons.resetSelection();
							this.largeTiberiumImage.setSource("webfrontend/ui/common/icon_res_large_tiberium.png");
							this.TableRowFilter();
							this.tableColumnModel.sortByColumn(2, true);
							qx.locale.Manager.getInstance().addTranslation("en_US", {
								"tnf:select all" : "Select All"
							});
							qx.locale.Manager.getInstance().addTranslation("en_US", {
								"tnf:select none" : "Select None"
							});
							qx.locale.Manager.getInstance().addTranslation("en_US", {
								"tnf:cannot manually modify" : "Cannot be modified with multiple rows selected"
							});
							qx.locale.Manager.getInstance().addTranslation("en_US", {
								"tnf:trading with multiple bases" : "Trading with multiple bases"
							});
							qx.locale.Manager.getInstance().addTranslation("en_US", {
								"tnf:percent buttons" : "Please use one of the Percent buttons"
							});
							this.activated = true;
						}
					},
					deactivate : function () {
						if (this.activated) {
							phe.cnc.base.Timer.getInstance().removeListener("uiTick", this._onTick, this);
							this.tradeWindowTable.resetSelection();
							this.tradeWindowTable.resetCellFocus();
							this.transferAmountTextField.setValue("");
							this.transferWindowTableSelectedRows = [];
							this.costToTradeLabel.setValue("");
							this.selectedRow = null;
							this.selectedRowData = null;
							this.modifier = 1;
							this.activated = false;
						}
					},
					getFilterMinimimAmount : function () {
						return this.userDefinedMinimumAmount;
					},
					getFilterDistanceLimit : function () {
						return this.userDefinedMaxDistance;
					},
					tradeWindow : function () {
						var tradeWindowContainer = new qx.ui.container.Composite(new qx.ui.layout.VBox(2)).set({
							marginTop : 10,
							marginBottom : 10,
							marginLeft : 4
						});

						tradeWindowContainer.add(new qx.ui.core.Spacer(), {
							flex : 1
						});

						var selectResourcesLabel = new qx.ui.basic.Label(qx.locale.Manager.tr("tnf:select resources:")).set({
							textColor : "text-label",
							alignY : "middle",
							font : "font_size_13"
						});
						var resourceSelectionContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)).set({
							height : 26
						});
						var tiberiumToggleButton = new qx.ui.form.ToggleButton(null, "webfrontend/ui/common/icon_res_large_tiberium.png").set({
							appearance : "button-toggle",
							width : 84
						});
						tiberiumToggleButton.setUserData("key", ClientLib.Base.EResourceType.Tiberium);
						var tiberiumImage = new qx.ui.basic.Image("webfrontend/ui/common/icn_res_tiberium.png").set({
							width : 24,
							height : 24,
							scale : true
						});
						var crystalToggleButton = new qx.ui.form.ToggleButton(null, "webfrontend/ui/common/icon_res_large_crystal.png").set({
							appearance : "button-toggle",
							width : 84
						});
						crystalToggleButton.setUserData("key", ClientLib.Base.EResourceType.Crystal);
						var crystalImage = new qx.ui.basic.Image("webfrontend/ui/common/icn_res_chrystal.png").set({
							width : 24,
							height : 24,
							scale : true
						});
						resourceSelectionContainer.add(new qx.ui.core.Spacer(), {
							flex : 1
						});
						resourceSelectionContainer.add(selectResourcesLabel);
						resourceSelectionContainer.add(tiberiumToggleButton);
						resourceSelectionContainer.add(new qx.ui.core.Spacer().set({
							width : 2
						}));
						resourceSelectionContainer.add(crystalToggleButton);
						resourceSelectionContainer.add(new qx.ui.core.Spacer(), {
							flex : 1
						});
						this.resourceSelectionRadioButtons = new qx.ui.form.RadioGroup(tiberiumToggleButton, crystalToggleButton);
						this.resourceSelectionRadioButtons.addListener("changeSelection", this.ChangeResourceType, this);

						tradeWindowContainer.add(resourceSelectionContainer);

						var currentServer = ClientLib.Data.MainData.GetInstance().get_Server();
						var tradeCostToolTip = qx.locale.Manager.tr("tnf:trade costs %1 (+%2 per field)", currentServer.get_TradeCostMinimum(), currentServer.get_TradeCostPerField());
						var searchContainer = new qx.ui.container.Composite(new qx.ui.layout.VBox(2));
						var searchBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
						var minimumAmountLabel = new qx.ui.basic.Label(qx.locale.Manager.tr("tnf:minimum amount:")).set({
							textColor : "text-label",
							alignY : "middle",
							font : "font_size_13"
						});
						this.minimumAmountTextField = new qx.ui.form.TextField("").set({
							toolTipText : qx.locale.Manager.tr("tnf:only numbers allowed")
						});
						this.minimumAmountTextField.setFilter(/[0-9]/);
						this.minimumAmountTextField.setMaxLength(12);
						var maxDistanceLabel = new qx.ui.basic.Label(qx.locale.Manager.tr("tnf:distance limit:")).set({
							textColor : "text-label",
							alignY : "middle",
							font : "font_size_13",
							toolTipText : tradeCostToolTip
						});
						this.maxDistanceTextField = new qx.ui.form.TextField("").set({
							toolTipText : qx.locale.Manager.tr("tnf:only numbers allowed")
						});
						this.maxDistanceTextField.setFilter(/[0-9]/);
						this.maxDistanceTextField.setMaxLength(3);
						searchBox.add(minimumAmountLabel);
						searchBox.add(this.minimumAmountTextField);
						searchBox.add(new qx.ui.core.Spacer(), {
							flex : 1
						});
						searchBox.add(maxDistanceLabel);
						searchBox.add(this.maxDistanceTextField);
						searchBox.add(new qx.ui.core.Spacer(), {
							flex : 2
						});

						searchContainer.add(searchBox);

						var searchButton = new webfrontend.ui.SoundButton(qx.locale.Manager.tr("tnf:search")).set({
							width : 300,
							maxWidth : 300,
							marginBottom : 8,
							marginTop : 4,
							alignX : "center"
						});
						searchButton.addListener("execute", this.TableRowFilter, this);
						searchContainer.add(searchButton);

						//tradeWindowContainer.add(searchContainer);

						this.selectAllNoneButton = new webfrontend.ui.SoundButton(qx.locale.Manager.tr("tnf:select all")).set({
							enabled : true,
							//appearance: "button-forum-light",
							//textColor: "text-label",
							width : 160
						});

						this.selectAllNoneButton.addListener("click", this.SelectAllRows, this);

						tradeWindowContainer.add(this.selectAllNoneButton);

						this.tableColumnModel = new webfrontend.data.SimpleColFormattingDataModel();
						this.tableColumnModel.setColumns([qx.locale.Manager.tr("tnf:base"), qx.locale.Manager.tr("tnf:distance"), qx.locale.Manager.tr("tnf:$ / 1000"), qx.locale.Manager.tr("tnf:amount"), "Amount", "Max", "ID"], ["Base", "Distance", "Credits", "AmountDesc", "Amount", "Max", "ID"]);
						this.tableColumnModel.setColumnSortable(0, true);
						this.tableColumnModel.setColumnSortable(1, true);
						this.tableColumnModel.setColumnSortable(2, true);
						this.tableColumnModel.setColumnSortable(3, true);
						this.tableColumnModel.setSortMethods(3, this.AmountSort);
						this.tradeWindowTable = new webfrontend.gui.trade.TradeBaseTable(this.tableColumnModel).set({
							statusBarVisible : false,
							columnVisibilityButtonVisible : false,
							maxHeight : 300
						});
						this.tradeWindowTable.addListener("cellClick", this.TradeWindowTableCellClick, this);
						this.tradeWindowTable.getSelectionModel().setSelectionMode(qx.ui.table.selection.Model.MULTIPLE_INTERVAL_SELECTION);
						this.tradeWindowTable.setDataRowRenderer(new webfrontend.gui.trade.TradeBaseTableRowRenderer(this.tradeWindowTable));
						this.tradeWindowTable.showCellToolTip = true;
						var tradeWindowTableColumnModel = this.tradeWindowTable.getTableColumnModel();
						tradeWindowTableColumnModel.setDataCellRenderer(0, new qx.ui.table.cellrenderer.String());
						tradeWindowTableColumnModel.setDataCellRenderer(1, new qx.ui.table.cellrenderer.Number());
						tradeWindowTableColumnModel.setDataCellRenderer(2, new qx.ui.table.cellrenderer.Number());
						tradeWindowTableColumnModel.setHeaderCellRenderer(2, new qx.ui.table.headerrenderer.Default());
						tradeWindowTableColumnModel.getHeaderCellRenderer(2).setToolTip(tradeCostToolTip);
						tradeWindowTableColumnModel.setDataCellRenderer(3, new webfrontend.gui.trade.TradeBaseTableCellRenderer());
						tradeWindowTableColumnModel.setColumnWidth(0, 160);
						tradeWindowTableColumnModel.setColumnWidth(1, 60);
						tradeWindowTableColumnModel.setColumnWidth(2, 100);
						tradeWindowTableColumnModel.setColumnVisible(4, false);
						tradeWindowTableColumnModel.setColumnVisible(5, false);
						tradeWindowTableColumnModel.setColumnVisible(6, false);
						tradeWindowContainer.add(this.tradeWindowTable);

						var transferAmountContainer = new qx.ui.container.Composite(new qx.ui.layout.VBox());
						var transferAmountBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(2)).set({
							minHeight : 36
						});
						this.largeTiberiumImage = new qx.ui.basic.Image("webfrontend/ui/common/icon_res_large_tiberium.png").set({
							alignY : "middle",
							width : 22,
							height : 20,
							scale : true
						});
						this.transferFromBaseLabel = new qx.ui.basic.Label(qx.locale.Manager.tr("tnf:select base for transfer")).set({
							rich : true,
							textColor : "text-label",
							marginBottom : 2,
							alignY : "middle",
							maxWidth : 182
						});
						this.transferAmountTextField = new qx.ui.form.TextField("").set({
							toolTipText : qx.locale.Manager.tr("tnf:only numbers allowed"),
							enabled : false,
							width : 208,
							marginRight : 1
						});
						this.transferAmountTextField.setFilter(/[0-9]/);
						this.transferAmountTextField.setMaxLength(20);
						this.transferAmountTextField.addListener("input", this.ResourceAmountChanged, this);
						transferAmountBox.add(this.largeTiberiumImage);
						transferAmountBox.add(this.transferFromBaseLabel);
						var percentButtonsBox = new qx.ui.container.Composite(new qx.ui.layout.HBox()).set({
							marginTop : 2
						});
						this.tenPercentButton = new webfrontend.ui.SoundButton("10%").set({
							enabled : false,
							appearance : "button-forum-light",
							textColor : "text-label",
							width : 42
						});
						this.tenPercentButton.addListener("execute", this.TenPercent, this);
						this.twentyFivePercentButton = new webfrontend.ui.SoundButton("25%").set({
							enabled : false,
							appearance : "button-forum-light",
							textColor : "text-label",
							width : 42
						});
						this.twentyFivePercentButton.addListener("execute", this.TwentyFivePercent, this);
						this.fiftyPercentButton = new webfrontend.ui.SoundButton("50%").set({
							enabled : false,
							appearance : "button-forum-light",
							textColor : "text-label",
							width : 42
						});
						this.fiftyPercentButton.addListener("execute", this.FiftyPercent, this);
						this.seventyFivePercentButton = new webfrontend.ui.SoundButton("75%").set({
							enabled : false,
							appearance : "button-forum-light",
							textColor : "text-label",
							width : 42
						});
						this.seventyFivePercentButton.addListener("execute", this.SeventyFivePercent, this);
						this.oneHundredPercentButton = new webfrontend.ui.SoundButton("100%").set({
							enabled : false,
							appearance : "button-forum-light",
							textColor : "text-label",
							width : 42
						});
						this.oneHundredPercentButton.addListener("execute", this.OneHundredPercent, this);
						percentButtonsBox.add(this.tenPercentButton);
						percentButtonsBox.add(this.twentyFivePercentButton);
						percentButtonsBox.add(this.fiftyPercentButton);
						percentButtonsBox.add(this.seventyFivePercentButton);
						percentButtonsBox.add(this.oneHundredPercentButton);
						transferAmountContainer.add(transferAmountBox);
						transferAmountContainer.add(this.transferAmountTextField);
						transferAmountContainer.add(percentButtonsBox);
						var tradeCostContainer = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({
							alignX : "center",
							maxWidth : 148
						});
						var tradeCostLabel = new qx.ui.basic.Label(qx.locale.Manager.tr("tnf:costs:")).set({
							textColor : "text-label",
							marginBottom : 2,
							font : "font_size_13_bold",
							width : 148,
							textAlign : "center"
						});
						var tradeCostBox = new qx.ui.container.Composite(new qx.ui.layout.HBox()).set({
							alignX : "center",
							allowGrowX : true,
							marginTop : 10
						});
						this.costToTradeLabel = new qx.ui.basic.Label().set({
							textColor : "text-value",
							alignY : "middle",
							font : "font_size_14_bold",
							marginLeft : 3
						});
						var dollarImage = new qx.ui.basic.Image("webfrontend/ui/common/icon_res_large_credits.png").set({
							width : 18,
							height : 20,
							scale : true,
							AutoFlipH : false
						});
						tradeCostBox.add(new qx.ui.core.Spacer(), {
							flex : 1
						});
						tradeCostBox.add(dollarImage);
						tradeCostBox.add(this.costToTradeLabel);
						tradeCostBox.add(new qx.ui.core.Spacer(), {
							flex : 1
						});
						this.tradeButton = new webfrontend.ui.SoundButton(qx.locale.Manager.tr("tnf:trade")).set({
							width : 196,
							enabled : false
						});
						this.tradeButton.addListener("execute", this.TradeWithBases, this);
						tradeCostContainer.add(tradeCostLabel);
						tradeCostContainer.add(tradeCostBox);
						tradeCostContainer.add(this.tradeButton);
						var tradeWindowCanvas = new qx.ui.container.Composite(new qx.ui.layout.Canvas()).set({
							decorator : new qx.ui.decoration.Background().set({
								backgroundRepeat : 'no-repeat',
								backgroundImage : "webfrontend/ui/menues/resource_transfer/bgr_restransfer_summary.png"
							})
						});
						tradeWindowCanvas.add(transferAmountContainer, {
							left : 50,
							top : 5
						});
						tradeWindowCanvas.add(tradeCostContainer, {
							left : 285,
							top : 18
						});
						tradeWindowCanvas.add(this.tradeButton, {
							left : 134,
							top : 100
						});
						tradeWindowContainer.add(tradeWindowCanvas);
						return tradeWindowContainer;
					},
					TableRowFilter : function () {
						var tableArray = [];
						var currentCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
						if (currentCity != null) {
							this.userDefinedMaxDistance = this.maxDistanceTextField.getValue() == "" ? -1 : parseInt(this.maxDistanceTextField.getValue(), 10);
							this.userDefinedMinimumAmount = this.minimumAmountTextField.getValue() == "" ? -1 : parseInt(this.minimumAmountTextField.getValue(), 10);
							var allCities = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities();
							for (var currentBase in allCities.d) {
								if (currentCity.get_Id() != currentBase && allCities.d[currentBase].IsOwnBase()) {
									var otherCity = allCities.d[currentBase];
									var currentBaseID = currentBase;
									var otherCityName = otherCity.get_Name();
									var distance = ClientLib.Base.Util.CalculateDistance(currentCity.get_X(), currentCity.get_Y(), otherCity.get_X(), otherCity.get_Y());
									var costToTrade = currentCity.CalculateTradeCostToCoord(otherCity.get_X(), otherCity.get_Y(), 1000);
									var resourceAmount = Math.floor(otherCity.GetResourceCount(this.resourceTransferType));
									var maxResources = Math.floor(otherCity.GetResourceMaxStorage(this.resourceTransferType));
									var disqualifyDistance = false;
									var disqualifyAmount = false;
									if (this.userDefinedMaxDistance != -1 && this.userDefinedMaxDistance < distance)
										disqualifyDistance = true;
									if (this.userDefinedMinimumAmount != -1 && this.userDefinedMinimumAmount > resourceAmount)
										disqualifyAmount = true;
									if (!disqualifyDistance && !disqualifyAmount) {
										var formattedAmount = phe.cnc.gui.util.Numbers.formatNumbers(resourceAmount);
										tableArray.push({
											Base : otherCityName,
											Distance : distance,
											Credits : costToTrade,
											AmountDesc : formattedAmount,
											Amount : resourceAmount,
											Max : maxResources.toString(),
											ID : currentBaseID
										});
									}
								}
							}
							this.tableColumnModel.setDataAsMapArray(tableArray, true);
							this.selectedRow = null;
							this.selectedRowData = null;
							this.tradeWindowTable.resetCellFocus();
							this.MaintainTradeWindow();
						}
					},
					SelectAllRows : function () {
						if (this.tradeWindowTable.getSelectionModel().getSelectedCount() != this.tableColumnModel.getRowCount()) {
							this.tradeWindowTable.getSelectionModel().setSelectionInterval(0, this.tableColumnModel.getRowCount() - 1);
							this.transferAmountTextField.setValue("");
							this.totalResourceAmount = 0;
							this.costToTradeLabel.setValue("0");
							this.selectAllNoneButton.setLabel(qx.locale.Manager.tr("tnf:select none"));
							this.transferFromBaseLabel.setValue(qx.locale.Manager.tr("tnf:trading with multiple bases"));
							this.UpdateSelectedRows(this.tableColumnModel.getRowData(0));
							this.selectedRowData = this.tableColumnModel.getRowData(0);
						} else {
							this.tradeWindowTable.resetSelection();
							this.tradeWindowTable.resetCellFocus();
							this.transferAmountTextField.setValue("");
							this.transferWindowTableSelectedRows = [];
							this.SetCostLabel();
							this.transferAmountTextField.setToolTipText(qx.locale.Manager.tr("tnf:only numbers allowed"));
							this.transferFromBaseLabel.setValue(qx.locale.Manager.tr("tnf:select base for transfer"));
							this.selectAllNoneButton.setLabel(qx.locale.Manager.tr("tnf:select all"));
						}
					},
					AmountSort : function (bI, bJ) {
						if (bI[4] < bJ[4])
							return -1;
						if (bI[4] > bJ[4])
							return 1;
						return 0;
					},
					UpdateSelectedRows : function (rowData) {
						this.transferWindowTableSelectedRows = [];

						var localRows = [];
						var colModel = this.tableColumnModel;

						this.tradeWindowTable.getSelectionModel().iterateSelection(function (index) {
							var city = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(colModel.getRowData(index).ID);
							if (city != null && city.CanTrade() == ClientLib.Data.ETradeError.None)
								localRows.push(colModel.getRowData(index));
						});
						this.transferWindowTableSelectedRows = localRows;

					},
					TradeWindowTableCellClick : function (e) {

						var rowData = this.tableColumnModel.getRowData(e.getRow());
						var city = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(rowData.ID);

						this.modifier = 0;
						this.transferAmountTextField.setValue("");
						this.SetCostLabel();

						if (city != null && city.CanTrade() == ClientLib.Data.ETradeError.None) {
							this.selectedRow = e.getRow();
							this.selectedRowData = rowData;

							this.UpdateSelectedRows();

							if (this.transferWindowTableSelectedRows.length == 1)
								this.transferFromBaseLabel.setValue(qx.locale.Manager.tr("tnf:trade with %1", "<b>" + rowData.Base + "</b>"));
							if (this.transferWindowTableSelectedRows.length > 1)
								this.transferFromBaseLabel.setValue(qx.locale.Manager.tr("tnf:trading with multiple bases"));

						}

						this.MaintainTradeWindow();

					},
					ChangeResourceType : function (e) {
						var userObject = e.getData()[0];
						this.transferAmountTextField.setValue("");
						this.transferWindowTableSelectedRows = [];
						this.SetCostLabel();
						this.tradeWindowTable.resetSelection();
						this.tradeWindowTable.resetCellFocus();
						this.resourceTransferType = userObject.getUserData("key");
						if (this.resourceTransferType == ClientLib.Base.EResourceType.Tiberium) {
							this.largeTiberiumImage.setSource("webfrontend/ui/common/icon_res_large_tiberium.png");
						} else {
							this.largeTiberiumImage.setSource("webfrontend/ui/common/icon_res_large_crystal.png");
						}
						this.selectAllNoneButton.setLabel(qx.locale.Manager.tr("tnf:select all"));
						this.MaintainTradeWindow();
					},
					ResourceAmountChanged : function () {
						this.modifier = 1;
						this.SetCostLabel();
					},
					CalculateTradeCost : function () {
						this.totalTransferAmount = 0;

						if (this.transferWindowTableSelectedRows.length > 0) {

							var cities = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d;
							var selectedCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();

							if (this.transferWindowTableSelectedRows.length > 1) {
								for (var base in this.transferWindowTableSelectedRows) {
									this.totalTransferAmount += cities[this.transferWindowTableSelectedRows[base].ID].CalculateTradeCostToCoord(selectedCity.get_PosX(), selectedCity.get_PosY(), this.transferWindowTableSelectedRows[base].Amount * this.modifier);
								}
							} else {
								this.totalTransferAmount += cities[this.selectedRowData.ID].CalculateTradeCostToCoord(selectedCity.get_PosX(), selectedCity.get_PosY(), parseInt(this.transferAmountTextField.getValue().replace(/[^0-9]/g, '')));
							}
							return this.totalTransferAmount;
						}
						return 0;
					},
					ModifyResourceAmount : function (modifier) {
						this.totalResourceAmount = 0;

						this.UpdateSelectedRows(this.selectedRowData);

						if (this.transferWindowTableSelectedRows.length > 0) {
							for (var base in this.transferWindowTableSelectedRows) {
								this.totalResourceAmount += Math.floor(this.transferWindowTableSelectedRows[base].Amount * modifier);
							}
							return this.totalResourceAmount;
						}
						return 0;
					},
					SetCostLabel : function () {
						var tradeCost = this.CalculateTradeCost();
						if (this.transferAmountTextField.getValue() == "")
							tradeCost = 0;
						this.costToTradeLabel.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompactAfterMillion(tradeCost).toString());
						this.costToTradeLabel.setToolTipText(phe.cnc.gui.util.Numbers.formatNumbers(tradeCost).toString());
						//this.MaintainTradeWindow();
					},
					TenPercent : function () {
						this.modifier = 0.1;
						var resourceAmount = this.ModifyResourceAmount(0.1);
						this.transferAmountTextField.setValue(phe.cnc.gui.util.Numbers.formatNumbers(resourceAmount));
						this.SetCostLabel();
					},
					TwentyFivePercent : function () {
						this.modifier = 0.25;
						var resourceAmount = this.ModifyResourceAmount(0.25);
						this.transferAmountTextField.setValue(phe.cnc.gui.util.Numbers.formatNumbers(resourceAmount));
						this.SetCostLabel();
					},
					FiftyPercent : function () {
						this.modifier = 0.5;
						var resourceAmount = this.ModifyResourceAmount(0.5);
						this.transferAmountTextField.setValue(phe.cnc.gui.util.Numbers.formatNumbers(resourceAmount));
						this.SetCostLabel();
					},
					SeventyFivePercent : function () {
						this.modifier = 0.75;
						var resourceAmount = this.ModifyResourceAmount(0.75);
						this.transferAmountTextField.setValue(phe.cnc.gui.util.Numbers.formatNumbers(resourceAmount));
						this.SetCostLabel();
					},
					OneHundredPercent : function () {
						this.modifier = 1;
						var resourceAmount = this.ModifyResourceAmount(1);
						this.transferAmountTextField.setValue(phe.cnc.gui.util.Numbers.formatNumbers(resourceAmount));
						this.SetCostLabel();
					},
					TradeWithBases : function () {
						var transferAmount = 0;
						var currentCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
						if (this.transferWindowTableSelectedRows.length > 0) {
							if (currentCity != null && this.transferAmountTextField.getValue() != "") {
								for (var base in this.transferWindowTableSelectedRows) {
									var currentBase = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(this.transferWindowTableSelectedRows[base].ID);
									if (currentBase != null && currentBase.CanTrade() == ClientLib.Data.ETradeError.None && currentCity.CanTrade() == ClientLib.Data.ETradeError.None) {
										this.tradeButton.setEnabled(false);
										if (this.transferWindowTableSelectedRows.length == 1) {
											transferAmount = parseInt(this.transferAmountTextField.getValue().replace(/[^0-9]/g, ''));
										} else {
											transferAmount = parseInt(this.transferWindowTableSelectedRows[base].Amount * this.modifier, 10);
										}
										ClientLib.Data.MainData.GetInstance().get_Player().AddCredits(-currentCity.CalculateTradeCostToCoord(currentBase.get_X(), currentBase.get_Y(), transferAmount));
										currentCity.AddResources(this.resourceTransferType, transferAmount);
										currentBase.AddResources(this.resourceTransferType, -transferAmount);
										ClientLib.Net.CommunicationManager.GetInstance().SendCommand("SelfTrade", {
											targetCityId : currentCity.get_Id(),
											sourceCityId : currentBase.get_Id(),
											resourceType : this.resourceTransferType,
											amount : transferAmount
										}, phe.cnc.Util.createEventDelegate(ClientLib.Net.CommandResult, this, this.TradeResult), null);
									}
								}

								this.tradeWindowTable.resetSelection();
								this.tradeWindowTable.resetCellFocus();
								this.transferWindowTableSelectedRows = [];
								this.transferAmountTextField.setValue("");
								this.selectAllNoneButton.setLabel(qx.locale.Manager.tr("tnf:select all"));
								this.SetCostLabel();
							}
						}
					},
					TradeResult : function (ce, result) {
						if (result != ClientLib.Base.EErrorCode.Success) {
							var city = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(this.selectedRowData.ID);
							this.tradeConfirmationWidget.showTradeError(this, null, city.get_Name());
						} else {
							this.SetCostLabel();
						}
						this.tradeButton.setEnabled(true);
					},
					UpdateTradeTableData : function () {
						var updatedResourceCount = [];
						var otherCity = null;
						var currentCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
						if (currentCity != null) {
							var transferWindowsTableData = this.tableColumnModel.getDataAsMapArray();
							for (var row in transferWindowsTableData) {
								otherCity = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(transferWindowsTableData[row].ID);
								if (otherCity != null && currentCity.get_Id() != otherCity.get_Id() && otherCity.IsOwnBase()) {
									var otherCityID = otherCity.get_Id();
									var otherCityName = otherCity.get_Name();
									var otherCityDistance = ClientLib.Base.Util.CalculateDistance(currentCity.get_X(), currentCity.get_Y(), otherCity.get_X(), otherCity.get_Y());
									var otherCityTradeCost = currentCity.CalculateTradeCostToCoord(otherCity.get_X(), otherCity.get_Y(), 1000);
									var otherCityResourceCount = Math.floor(otherCity.GetResourceCount(this.resourceTransferType));
									var otherCityMaxStorage = Math.floor(otherCity.GetResourceMaxStorage(this.resourceTransferType));
									var otherCityResourceCountFormatted = phe.cnc.gui.util.Numbers.formatNumbers(otherCityResourceCount);
									updatedResourceCount.push({
										Base : otherCityName,
										Distance : otherCityDistance,
										Credits : otherCityTradeCost,
										AmountDesc : otherCityResourceCountFormatted,
										Amount : otherCityResourceCount,
										Max : otherCityMaxStorage.toString(),
										ID : otherCityID
									});
								} else {
									updatedResourceCount.push(transferWindowsTableData[row]);
								}
							}
							this.tableColumnModel.setDataAsMapArray(updatedResourceCount, true, false);
							if (this.selectedRow != null) {
								var selectedRowData = this.tableColumnModel.getRowData(this.selectedRow);
								otherCity = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(selectedRowData.ID);
								if (otherCity != null && currentCity.get_Id() != otherCity.get_Id() && otherCity.IsOwnBase() && otherCity.CanTrade() != ClientLib.Data.ETradeError.None) {
									this.selectedRowData = null;
									this.selectedRow = null;
									this.tradeWindowTable.resetCellFocus();
								} else {
									this.selectedRowData = selectedRowData;
								}
							}
						}
					},
					MaintainTradeWindow : function () {

						var hasEnoughtCredits = false;
						var validResourceAmount = true;

						if (this.transferWindowTableSelectedRows.length > 0) {

							var resourcesInTextField = parseInt(this.transferAmountTextField.getValue().replace(/[^0-9]/g, ''));
							var tradeCost = this.CalculateTradeCost();
							var playerCreditCount = ClientLib.Data.MainData.GetInstance().get_Player().GetCreditsCount();

							if (playerCreditCount < tradeCost) {
								this.costToTradeLabel.setTextColor("text-error");
							} else {
								this.costToTradeLabel.resetTextColor();
							}

							var selectedBaseResourceAmount = parseInt(this.selectedRowData.Amount, 10);

							if (this.transferAmountTextField.getValue() != "" && this.transferWindowTableSelectedRows.length > 1) {
								//Automatically update the text field with the new resource amount each tick
								var resourceAmount = this.ModifyResourceAmount(this.modifier);
								this.transferAmountTextField.setValue(phe.cnc.gui.util.Numbers.formatNumbers(resourceAmount));
								this.SetCostLabel();
							}

							if (this.transferWindowTableSelectedRows.length == 1) {
								if (resourcesInTextField == 0 || selectedBaseResourceAmount < resourcesInTextField) {
									this.transferAmountTextField.setTextColor("text-error");
								} else {
									this.transferAmountTextField.resetTextColor();
								}
								validResourceAmount = resourcesInTextField > 0 && resourcesInTextField <= selectedBaseResourceAmount;
							}

							hasEnoughtCredits = playerCreditCount >= tradeCost;

						}

						this.tradeButton.setEnabled(this.transferWindowTableSelectedRows.length > 0 && hasEnoughtCredits && validResourceAmount && this.transferAmountTextField.getValue() != "");
						this.transferAmountTextField.setEnabled(this.transferWindowTableSelectedRows.length > 0);
						this.tenPercentButton.setEnabled(this.transferWindowTableSelectedRows.length > 0);
						this.twentyFivePercentButton.setEnabled(this.transferWindowTableSelectedRows.length > 0);
						this.fiftyPercentButton.setEnabled(this.transferWindowTableSelectedRows.length > 0);
						this.seventyFivePercentButton.setEnabled(this.transferWindowTableSelectedRows.length > 0);
						this.oneHundredPercentButton.setEnabled(this.transferWindowTableSelectedRows.length > 0);

						this.transferAmountTextField.setReadOnly(this.transferWindowTableSelectedRows.length > 1);

						if (this.tradeWindowTable.getSelectionModel().getSelectedCount() > 1) {
							this.transferAmountTextField.setToolTipText(qx.locale.Manager.tr("tnf:percent buttons"));
						} else {
							this.transferAmountTextField.setToolTipText(qx.locale.Manager.tr("tnf:only numbers allowed"));
						}

					},
					_onTick : function () {
						var currentCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
						if (currentCity != null && currentCity.get_HasIncommingAttack()) {
							this.onBtnClose();
						}
						this.UpdateTradeTableData();
						this.MaintainTradeWindow();
					}
				}
			});
		}

		function NewTradeOverlay_checkIfLoaded() {
			try {
				if (typeof qx !== 'undefined' && typeof qx.locale !== 'undefined' && typeof qx.locale.Manager !== 'undefined' && typeof webfrontend.gui.trade.TradeOverlay !== 'undefined') {
					qx.Class.undefine("webfrontend.gui.trade.TradeOverlay");
					CreateNewTradeOverlay();
				} else {
					window.setTimeout(NewTradeOverlay_checkIfLoaded, 1000);
				}
			} catch (e) {
				console.log("NewTradeOverlay_checkIfLoaded: ", e);
			}
		}

		if (/commandandconquer\.com/i.test(document.domain)) {
			window.setTimeout(NewTradeOverlay_checkIfLoaded, 1000);
		}
	};

	try {
		var NewTradeOverlay = document.createElement("script");
		NewTradeOverlay.innerHTML = "(" + NewTradeOverlay_main.toString() + ")();";
		NewTradeOverlay.type = "text/javascript";
		if (/commandandconquer\.com/i.test(document.domain)) {
			document.getElementsByTagName("head")[0].appendChild(NewTradeOverlay);
		}
	} catch (e) {
		console.log("NewTradeOverlay: init error: ", e);
	}

})();



/***********************************************************************************
Chat Helper Enhanced
***********************************************************************************/

(function () {
	var CNCTAChatHelper_main = function () {
		try {
			// Caret functions from: http://userscripts.org/scripts/show/151099
			function createChatHelper() {
				window.__ChatHelper_ch_debug = false;
				window.__ChatHelper_suppressBrowserAltKeys = true;
				window.__ChatHelper_version = "3.0.0";
				window.__ChatHelper_fullname = "C&C: Tiberium Alliances Chat Helper Enhanced";
				console.log(window.__ChatHelper_fullname + ' v' + window.__ChatHelper_version + ': loading.');
				
				function getCaretPos(obj) {
					obj.focus();
					
					if (obj.selectionStart)
						return obj.selectionStart; //Gecko
					else if (document.selection) //IE
					{
						var sel = document.selection.createRange();
						var clone = sel.duplicate();
						sel.collapse(true);
						clone.moveToElementText(obj);
						clone.setEndPoint('EndToEnd', sel);
						return clone.text.length;
					}
					
					return 0;
				}
				
				function moveCaret(inputObject, pos) {
					if (inputObject.selectionStart) {
						inputObject.setSelectionRange(pos, pos);
						inputObject.focus();
					}
				}
				
				function getCursorWordPos(inputField) {
					var pos = getCaretPos(inputField);
					var inText = inputField.value;
					var lc = inText.charAt(pos - 1);
					if (lc.match(/\w/) !== null) {
						var sPos = pos;
						var ePos = pos;
						var t = inputField.value;
						while (sPos >= 0 && t.charAt(sPos - 1).match(/\w/) !== null) {
							sPos--;
						}
						while (ePos <= t.length && t.charAt(ePos).match(/\w/) !== null) {
							ePos++;
						}
						//inputField.setSelectionRange(sPos,ePos);
						return [sPos, ePos];
					}
				}
				
				function tagWith(tag, inputField) {
					var eTag = tag.replace('[', '[/');
					var tagLen = tag.length;
					var eTagLen = eTag.length;
					if (inputField !== null) {
						var pos = getCaretPos(inputField);
						var inText = inputField.value;
						if (inputField.type === 'textarea')
							var st = inputField.scrollTop;
						if (inputField.selectionStart !== inputField.selectionEnd) {
							var a = inText.slice(0, inputField.selectionStart);
							var b = inText.slice(inputField.selectionStart, inputField.selectionEnd);
							var c = inText.slice(inputField.selectionEnd, inText.length);
							inputField.value = a + tag + b + eTag + c;
							moveCaret(inputField, pos + tagLen + eTagLen + b.length);
						} else if ((inText === "" || inText.charAt(pos - 1) === " ") && (inText.charAt(pos) !== '[')) {
							inputField.value = inText.substr(0, pos) + tag + eTag + inText.substr(pos, inText.length);
							moveCaret(inputField, pos + tagLen);
						} else if (inText.slice(pos - 1, pos).match(/\w/) !== null) {
							var arr = getCursorWordPos(inputField);
							var s = arr[0];
							var e = arr[1];
							inputField.value = inText.slice(0, s) + tag + inText.slice(s, e) + eTag + inText.slice(e, inText.length);
							moveCaret(inputField, e + tagLen + eTagLen);
						}
						if (inputField.type === 'textarea')
							inputField.scrollTop = st;
					}
				}
				
				function showHelp() {
					alert("Type /chelp in any text box to show this message.\n\nEnter key in chat:\tsearches your chat string for Urls and Coords and wraps them before submission.\n\nAlt + 1\t:\tsearches for Urls and Coords in a message or forum post and tags accordingly. Cursor is moved to the beginning.\nAlt + 2\t:\tManual URL insertion popup window\nAlt + 0\t:\tclears all tags\n\nWord wraps: tags a selected word -or- tags the word where the cursor is (if chat is empty or you hit <space> empty tags are inserted).\nAttempts to preserve cursor and scroll position.\n|\tAlt + P or Alt + 3\t:\tplayer tags\n|\tAlt + A or Alt + 4\t:\talliance tags\n|\tAlt + B\t\t\t:\tbold tags\n|\tAlt + I\t\t\t:\titalic tags\n|\tAlt + U\t\t\t:\tunderline tags\n|\tAlt + T\t\t\t:\tstrikethrough tags\n|\tAlt + X\t\t\t:\tPaste last coords hovered with mouse\n");
				}
				
				var isWhisp = false;
				var contacts = [];
				
				if (!localStorage.myContacts) {
					console.log("Chat Helper: No contacts saved");
					//localStorage.myContacts = [];
				} else {
					contacts = localStorage.myContacts.split(',');
					//console.log("Contacts: " + contacts);
				}
				
				function saveContact(fr) {
					//console.log("Number of contacts: "+contacts.length);
					contacts.push(fr);
					console.log(fr + " added to contacts list.");
					localStorage.myContacts = contacts.join(',');
				}
				
				function caseInsensitiveSort(a, b) {
					a = a.toLowerCase();
					b = b.toLowerCase();
					if (a > b)
						return 1;
					if (a < b)
						return -1;
					return 0;
				}
				
				function listContacts() {
					if (contacts.length > 0) {
						var a = contacts.sort(caseInsensitiveSort);
						//console.log(contacts);
						alert(contacts.length + " Contacts:\n\n" + a.join("\n") + "\n")
					} else {
						var p = prompt("Your contacts list is empty.\n\nWould you like to add a contact?\n", "");
						if (p) {
							saveContact(p);
						}
					}
				}
				
				function deleteContact(fr) {
					if (fr === "all") {
						localStorage.myContacts = "";
						contacts = new Array();
						console.log("All contacts deleted");
					} else {
						var ind = contacts.indexOf(fr);
						if (ind > -1) {
							contacts.splice(ind, 1);
							localStorage.myContacts = contacts.join(',');
						}
						console.log(fr + " deleted from contacts list.");
					}
				}
				var timer;
				function keyUpTimer(kEv){
					kEv = kEv || window.event;
					if (kEv.target.type === "text" && kEv.target.value != '') {
						var inputField = kEv.target;
						var inText = inputField.value;
						var len = inText.length;
						var sub;
						var kc = kEv.keyCode;
						if (len >= 10 && inText.match(/^(\/whisper)/) != null) {
							isWhisp = true;
						}
						if (isWhisp && len >= 10 && !kEv.altGraphKey && !kEv.ctrlKey && !kEv.altKey && kc > 47 && kc < 91) {
							//console.log(kEv.keyCode);
							sub = inText.substr(9);
							if (!sub.match(/\s/)) {
								//console.log("2:"+inText.substr(9));
								for (var i = 0; i < contacts.length; i++) {
									var slen = sub.length;
									if (contacts[i][slen - 1] === sub[slen - 1] && contacts[i].substr(0, slen) == sub) {
										inputField.value = "/whisper " + contacts[i] + " ";
										inputField.setSelectionRange(10 + slen - 1, 10 + contacts[i].length, "forward");
									}
								}
							} else {
								isWhisp = false;
							}
						} else {
							isWhisp = false;
						}
					}
				}
				
				document.onkeyup = function (kEv) {
					clearTimeout(timer);
					timer = setTimeout(function () {
						keyUpTimer(kEv);
					}, 100);
				}
				
				var _sub;
				function delayedConfirm(){
					if (confirm("Add " + _sub + " to your contacts list?\n\nYou can see a list of your contacts by typing /list")) {
						saveContact(_sub);
						//continue without return false to allow whisper message to go through
					}
				}
				
				document.onkeydown = function (kEv) {
					kEv = kEv || window.event;
					
					/* Tab key
					if (kEv.keyCode == 9){
						var input = qx.core.Init.getApplication().getChat().getChatWidget().getEditable(); // Input
						kEv.preventDefault();
						kEv.stopPropagation();
					}
					*/
					if (!kEv.shiftKey && kEv.keyCode === 13 && (kEv.target.type === "text" || kEv.target.type === "textarea")) {
						var inputField = kEv.target;
						var inText = inputField.value;
						var add = inText.match(/^(\/add)/);
						var del = inText.match(/^(\/del)/);
						var showContacts = inText.match(/^((\/contacts)|(\/list))/);
						var sub;
						var cf;
						//add contact dialog
						if (inText.match(/^(\/whisper)/) != null || add != null) {
							if (add != null) {
								sub = inText.substr(5);
							} else {
								sub = inText.substr(9);
							}
							if (sub.match(/^(\w*)\s/)) {
								//if space after player name (is a whisper or a typo)
								var arr = sub.match(/^(\w*)/);
								sub = arr[0].replace(/\s$/, "");
								if (contacts.indexOf(sub) == -1) {
									//not in contacts list
									_sub = sub;
									setTimeout(delayedConfirm,1000);
								}
							} else if (contacts.indexOf(sub) == -1) {
								//not in contacts, promt to add, clear input
								inputField.focus();
								inputField.value = "";
								if (confirm("Add " + sub + " to your contacts list?\n\nYou can see a list of your contacts by typing /list")) {
									saveContact(sub);
									return false;
								}
							} else if (sub && contacts.indexOf(sub) > -1) {
								//not a whisper, reject duplicate contact
								alert(sub + " is already in your contacts list.");
							}
						}
						//remove contact(s)
						if (del) {
							sub = inText.substr(5);
							inputField.value = "";
							if ((contacts.indexOf(sub) > -1 || sub == "all") && confirm("Really delete " + sub + " from your contacts?\n\n Type \"/del all\" to delete all of your contacts")) {
								deleteContact(sub);
							} else {
								alert(sub + " is not in your contacts list.");
							}
							return false;
						}
						// show contacts list
						if (showContacts) {
							inputField.value = "";
							listContacts();
							return false;
							
						}
						// /chelp dialog
						if (inText.length === 6 && inText.match(/^(\/chelp)/) != null) {
							inputField.value = "";
							showHelp();
							return false;
						}
						
						if (inputField !== null && inputField.type === "text") {
							if (window.__ChatHelper_ch_debug)
								console.log("Chat Helper: onEnter auto-tagging");
							//this code is from Bruce Doan: http://userscripts.org/scripts/show/151965
							inText = inText.replace(/(\[coords\])*([0-9]{3})[:|.]([0-9]{3})([:|.]\w+)?(\[\/coords\])*/gi, function () {
									var result = new Array();
									result.push('[coords]');
									result.push(arguments[2]);
									result.push(':');
									result.push(arguments[3]);
									if (arguments[4] !== undefined) {
										result.push(arguments[4].replace('.', ':'));
									}
									result.push('[/coords]');
									return result.join('');
								});
							// auto url
							inText = inText.replace(/(\[url\])*(https?:\/\/)([\da-z\.-]+)(\.[a-z]{2,6})([\/\w\.\-\=\?\&\%\|#]*)*\/?(\[\/url\])*/gi, function () {
									var result = new Array();
									result.push('[url]');
									result.push(arguments[2]); // http[s]://
									result.push(arguments[3]); // domain
									result.push(arguments[4]); // ext
									result.push(arguments[5]); // query string
									result.push('[/url]');
									return result.join('');
									
								});
							// shorthand for player
							inText = inText.replace(/\[p\]([a-z0-9_\-\s]+)\[\/p\]/gi, '[player]$1[/player]');
							// shorthand for alliance
							inText = inText.replace(/\[a\]([a-z0-9_\-\s]+)\[\/a\]/gi, '[alliance]$1[/alliance]');
							if (inText !== "" || inText !== inputField.value) {
								inputField.value = inText;
							}
						}
					}
					
					if (kEv.altKey && !kEv.shiftKey && !kEv.altGraphKey && !kEv.ctrlKey && kEv.target != null && (kEv.target.type === "textarea" || kEv.target.type === "text")) {
						var inputField = kEv.target;
						var inText = inputField.value;
						// Alt key, not Ctrl or AltGr
						if (kEv.altKey && !kEv.altGraphKey && !kEv.ctrlKey) {
							var cc = kEv.charCode;
							var kc = kEv.keyCode;
							if (window.__ChatHelper_ch_debug) {
								console.log(cc);
								console.log(kc);
							}
							/* Alt+1 for auto Coordinates/Urls in message body */
							if (inputField.type === "textarea" && (cc === 49 || kc === 49)) {
								var pos = getCaretPos(inputField);
								if (window.__ChatHelper_ch_debug)
									console.log("Chat Helper: attempting Alt+1 message auto-tag");
								if (inputField != null) {
									var st = inputField.scrollTop;
									inText = inText.replace(/(\[coords\])*([0-9]{3})[:|.]([0-9]{3})([:|.]\w+)?(\[\/coords\])*/gi, function () {
											var result = new Array();
											result.push('[coords]');
											result.push(arguments[2]);
											result.push(':');
											result.push(arguments[3]);
											if (arguments[4] !== undefined) {
												result.push(arguments[4].replace('.', ':'));
											}
											result.push('[/coords]');
											return result.join('');
										});
									// auto url
									inText = inText.replace(/(\[url\])*(https?:\/\/)([\da-z\.-]+)(\.[a-z]{2,6})([\/\w\.\-\=\?\&\%\|#]*)*\/?(\[\/url\])*/gi, function () {
											var result = new Array();
											result.push('[url]');
											result.push(arguments[2]); // http[s]://
											result.push(arguments[3]); // domain
											result.push(arguments[4]); // ext
											result.push(arguments[5]); // query string
											result.push('[/url]');
											return result.join('');
											
										});
									inText = inText.replace(/\[a\]([a-z0-9_\-\s]+)\[\/a\]/gi, '[alliance]$1[/alliance]');
									inText = inText.replace(/\[p\]([a-z0-9_\-\s]+)\[\/p\]/gi, '[player]$1[/player]');
									if (inText !== "" || inText !== inputField.value) {
										inputField.value = inText;
										inputField.scrollTop = st;
										moveCaret(inputField, 0);
									}
								}
							}
							/* Alt+2 for URLs fallback */
							if (cc === 50 || kc === 50) {
								if (inputField !== null) {
									var url = prompt("Website (Syntax: google.com or www.google.com)", "");
									if (url !== null) {
										inputField.value += '[url]' + url + '[/url]';
									}
								}
							}
							/* Alt+3 or Alt+p for players */
							if ((cc === 112 || kc === 80) || (cc === 51 || kc === 51)) {
								tagWith('[player]', inputField);
								if (window.__ChatHelper_suppressBrowserAltKeys)
									return false;
							}
							/* Alt+4 or Alt+a for alliances */
							if ((cc === 97 || kc === 65) || (cc === 52 || kc === 52)) {
								tagWith('[alliance]', inputField);
								if (window.__ChatHelper_suppressBrowserAltKeys)
									return false;
							}
							/* Alt+0 to clear tags */
							if (cc === 48 || kc === 48) {
								if (inputField.type === 'textarea')
									var st = inputField.scrollTop;
								if (inputField !== null) {
									inText = inText.replace(/\[\/?coords\]/gi, '');
									inText = inText.replace(/\[\/?url\]/gi, '');
									inText = inText.replace(/\[\/?player\]/gi, '');
									inText = inText.replace(/\[\/?alliance\]/gi, '');
									inText = inText.replace(/\[\/?b\]/gi, '');
									inText = inText.replace(/\[\/?i\]/gi, '');
									inText = inText.replace(/\[\/?u\]/gi, '');
									inText = inText.replace(/\[\/?s\]/gi, '');
									inputField.value = inText;
								}
								if (inputField.type === 'textarea')
									inputField.scrollTop = st;
							}
							/* Alt+b for bold */
							if (cc === 98 || kc === 66) {
								tagWith('[b]', inputField);
								if (window.__ChatHelper_suppressBrowserAltKeys)
									return false;
							}
							/* Alt+i for italics */
							if (cc === 105 || kc === 73) {
								tagWith('[i]', inputField);
								if (window.__ChatHelper_suppressBrowserAltKeys)
									return false;
							}
							/* Alt+u for underline */
							if (cc === 117 || kc === 85) {
								tagWith('[u]', inputField);
								if (window.__ChatHelper_suppressBrowserAltKeys)
									return false;
							}
							/* Alt+T for strikethrough (CHANGED for compatibility, initial Alt+S) )*/
							if (cc === 116 || kc === 84) {
								tagWith('[s]', inputField);
								if (window.__ChatHelper_suppressBrowserAltKeys)
									return false;
							}
						}
					}
				}
			}
		} catch (err) {
			console.log("createChatHelper: ", err);
		}
		
		function CNCTAChatHelper_checkIfLoaded() {
			try {
				if (typeof qx !== 'undefined') {
					createChatHelper();
				} else {
					window.setTimeout(CNCTAChatHelper_checkIfLoaded, 1000);
				}
			} catch (err) {
				console.log("CNCTAChatHelper_checkIfLoaded: ", err);
			}
		}
		window.setTimeout(CNCTAChatHelper_checkIfLoaded, 1000);
	};
	try {
		var CNCTAChatHelper = document.createElement("script");
		CNCTAChatHelper.innerHTML = "(" + CNCTAChatHelper_main.toString() + ")();";
		CNCTAChatHelper.type = "text/javascript";
		document.getElementsByTagName("head")[0].appendChild(CNCTAChatHelper);
	} catch (err) {
		console.log("CNCTAChatHelper: init error: ", err);
	}
})();


/***********************************************************************************
CCTA Coords 500:500
***********************************************************************************/
function Ini() {
	m = "CnC: Tiberium Alliances COORDS has been loaded";
	if (typeof console != 'undefined') console.log(m);
	else if (window.opera) opera.postError(m);
	else GM_log(m);
};

(function () {
	var TACoordsMain = function () {
			var IsDEBUG = false;
			function log(m) {
				if (IsDEBUG) {
					if (typeof console != 'undefined') console.log(m);
					else if (window.opera) opera.postError(m);
					else GM_log(m);
				}
			};
			log("IsDEBUG = true");
			function createInstance() {
				var MrHIDE = {};
				qx.Class.define("MrHIDE.main", {
					type: "singleton",
					extend: qx.core.Object,
					members: {
						Coords: "First, just move mouse cursor over some map coordinates numbers ex. 0:0",
						initialize: function () {
							window.addEventListener("keyup", this.onKey, false);
							window.addEventListener("mouseover", this.onMouseOver, false);
						},
						GetCaretPosition: function (ctrl) {
							var CaretPos = 0; // IE Support
							if (document.selection) {
								ctrl.focus();
								var Sel = document.selection.createRange();
								Sel.moveStart('character', -ctrl.value.length);
								CaretPos = Sel.text.length;
							}
							// Firefox support
							else if (ctrl.selectionStart || ctrl.selectionStart == '0') CaretPos = ctrl.selectionStart;
							return (CaretPos);
						},
						SetCaretPosition: function (ctrl, pos) {
							if (ctrl.setSelectionRange) {
								ctrl.focus();
								ctrl.setSelectionRange(pos, pos);
							} else if (ctrl.createTextRange) {
								var range = ctrl.createTextRange();
								range.collapse(true);
								range.moveEnd('character', pos);
								range.moveStart('character', pos);
								range.select();
							}
						},
						onKey: function (ev) {
							var s = String.fromCharCode(ev.keyCode);
							var MRH = window.MrHIDE.main.getInstance();

							// ALT+
							if (ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.shiftKey) {
								// log("Alt+" + s);

								switch (s) {
								case "Z":
									// coords by popup window
									var inputField = document.querySelector('input:focus, textarea:focus');
									if (inputField != null) {
										this.Coords = prompt("Place coordinates. Ex. 800:800", "");
										if (Coords != null) {
											var position = MRH.GetCaretPosition(inputField);
											var txt = inputField.value;
											var insert = "[coords]" + this.Coords + "[/coords]";
											inputField.value = txt.substring(0, position) + insert + txt.substring(position, txt.length);
											MRH.SetCaretPosition(inputField, position + insert.length);
										}
									}
									break;
								case "X":
									// coords by moving mouse OVER map coordinates
									var inputField = document.querySelector('input:focus, textarea:focus');
									if (inputField != null) {
										if (this.Coords != null) {
											var position = MRH.GetCaretPosition(inputField);
											var txt = inputField.value;
											var insert = "[coords]" + this.Coords + "[/coords]";
											inputField.value = txt.substring(0, position) + insert + txt.substring(position, txt.length);
											MRH.SetCaretPosition(inputField, position + insert.length);
										}
									}
									break;
								case "S":
									// coords by inserting [coords][/coords]
									var inputField = document.querySelector('input:focus, textarea:focus');
									if (inputField != null) {
										var position = MRH.GetCaretPosition(inputField);
										var txt = inputField.value;
										var insert = "[coords][/coords]";
										inputField.value = txt.substring(0, position) + insert + txt.substring(position, txt.length);
										MRH.SetCaretPosition(inputField, position + ("[coords]").length);
									}
									break;
								default:
									// Other letters
									log("Other letter (" + s + ")");
								}
							}
						},
						onMouseOver: function (ev) {					
							var tag = ev.target.tagName;
							if (tag == "B" || tag == "DIV" || tag == "A") {
								var s = ev.target.textContent;
								var semicolon = s.indexOf(":");
								if (semicolon > 0) {
									var n1 = s.substring(0, semicolon);
									var n2 = s.substring(semicolon + 1, s.lenght);
									if (isFinite(n1) && isFinite(n2)) {
                                                                                if(s.length==5 && s[0]=="0") return;
										Coords = s;
										ClientLib.Vis.VisMain.GetInstance().PlayUISound('sounds/CollectTiberium');
									}
								}
							}
						},
					} // members
				});
			}

			// Loading
			function TACoords_checkIfLoaded() {
				try {
					if (typeof qx != 'undefined') {
						ap = qx.core.Init.getApplication();
						mb = qx.core.Init.getApplication().getMenuBar();
						if (ap && mb) {
							createInstance();
							window.MrHIDE.main.getInstance().initialize();
						} else window.setTimeout(TACoords_checkIfLoaded, 1000);
					} else {
						window.setTimeout(TACoords_checkIfLoaded, 1000);
					}
				} catch (e) {
					if (typeof console != 'undefined') console.log(e);
					else if (window.opera) opera.postError(e);
					else GM_log(e);
				}
			}
			if (/commandandconquer\.com/i.test(document.domain)) {
				window.setTimeout(TACoords_checkIfLoaded, 1000);
			}
		}
		// Injecting
	if (window.location.pathname != ("/login/auth")) {
		var TACScript = document.createElement("script");
		TACScript.innerHTML = "(" + TACoordsMain.toString() + ")();";
		TACScript.type = "text/javascript";
		if (/commandandconquer\.com/i.test(document.domain)) {
			document.getElementsByTagName("head")[0].appendChild(TACScript);
		}
	}
})();Ini();


/***********************************************************************************
CNCOpt
***********************************************************************************/

    var scity = null;
    var tcity = null;
    var tbase = null;
    try {
      unsafeWindow.__cncopt_version = "1.7.5";
      (function () {
        var cncopt_main = function () {
     
          var defense_unit_map = {
            /* GDI Defense Units */"GDI_Wall": "w",
            "GDI_Cannon": "c",
            "GDI_Antitank Barrier": "t",
            "GDI_Barbwire": "b",
            "GDI_Turret": "m",
            "GDI_Flak": "f",
            "GDI_Art Inf": "r",
            "GDI_Art Air": "e",
            "GDI_Art Tank": "a",
            "GDI_Def_APC Guardian": "g",
            "GDI_Def_Missile Squad": "q",
            "GDI_Def_Pitbull": "p",
            "GDI_Def_Predator": "d",
            "GDI_Def_Sniper": "s",
            "GDI_Def_Zone Trooper": "z",
            /* Nod Defense Units */"NOD_Def_Antitank Barrier": "t",
            "NOD_Def_Art Air": "e",
            "NOD_Def_Art Inf": "r",
            "NOD_Def_Art Tank": "a",
            "NOD_Def_Attack Bike": "p",
            "NOD_Def_Barbwire": "b",
            "NOD_Def_Black Hand": "z",
            "NOD_Def_Cannon": "c",
            "NOD_Def_Confessor": "s",
            "NOD_Def_Flak": "f",
            "NOD_Def_MG Nest": "m",
            "NOD_Def_Militant Rocket Soldiers": "q",
            "NOD_Def_Reckoner": "g",
            "NOD_Def_Scorpion Tank": "d",
            "NOD_Def_Wall": "w",
     
            /* Forgotten Defense Units */"FOR_Wall": "w",
            "FOR_Barbwire_VS_Inf": "b",
            "FOR_Barrier_VS_Veh": "t",
            "FOR_Inf_VS_Inf": "g",
            "FOR_Inf_VS_Veh": "r",
            "FOR_Inf_VS_Air": "q",
            "FOR_Sniper": "n",
            "FOR_Mammoth": "y",
            "FOR_Veh_VS_Inf": "o",
            "FOR_Veh_VS_Veh": "s",
            "FOR_Veh_VS_Air": "u",
            "FOR_Turret_VS_Inf": "m",
            "FOR_Turret_VS_Inf_ranged": "a",
            "FOR_Turret_VS_Veh": "v",
            "FOR_Turret_VS_Veh_ranged": "d",
            "FOR_Turret_VS_Air": "f",
            "FOR_Turret_VS_Air_ranged": "e",
            "": ""
          };
     
          var offense_unit_map = {
            /* GDI Offense Units */"GDI_APC Guardian": "g",
            "GDI_Commando": "c",
            "GDI_Firehawk": "f",
            "GDI_Juggernaut": "j",
            "GDI_Kodiak": "k",
            "GDI_Mammoth": "m",
            "GDI_Missile Squad": "q",
            "GDI_Orca": "o",
            "GDI_Paladin": "a",
            "GDI_Pitbull": "p",
            "GDI_Predator": "d",
            "GDI_Riflemen": "r",
            "GDI_Sniper Team": "s",
            "GDI_Zone Trooper": "z",
     
            /* Nod Offense Units */"NOD_Attack Bike": "b",
            "NOD_Avatar": "a",
            "NOD_Black Hand": "z",
            "NOD_Cobra": "r",
            "NOD_Commando": "c",
            "NOD_Confessor": "s",
            "NOD_Militant Rocket Soldiers": "q",
            "NOD_Militants": "m",
            "NOD_Reckoner": "k",
            "NOD_Salamander": "l",
            "NOD_Scorpion Tank": "o",
            "NOD_Specter Artilery": "p",
            "NOD_Venom": "v",
            "NOD_Vertigo": "t",
            "": ""
          };
     
     
          function findTechLayout(city) {
            for (var k in city) {
              //console.log(typeof(city[k]), "1.city[", k, "]", city[k])
              if ((typeof (city[k]) == "object") && city[k] && 0 in city[k] && 8 in city[k]) {
                if ((typeof (city[k][0]) == "object") && city[k][0] && city[k][0] && 0 in city[k][0] && 15 in city[k][0]) {
                  if ((typeof (city[k][0][0]) == "object") && city[k][0][0] && "BuildingIndex" in city[k][0][0]) {
                    return city[k];
                  }
                }
              }
            }
            return null;
          }
     
          function findBuildings(city) {
            var cityBuildings = city.get_CityBuildingsData();
            for (var k in cityBuildings) {
              if (PerforceChangelist >= 376877) {
                if ((typeof (cityBuildings[k]) === "object") && cityBuildings[k] && "d" in cityBuildings[k] && "c" in cityBuildings[k] && cityBuildings[k].c > 0) {
                  return cityBuildings[k].d;
                }
              } else {
                if ((typeof (cityBuildings[k]) === "object") && cityBuildings[k] && "l" in cityBuildings[k]) {
                  return cityBuildings[k].l;
                }
              }
            }
          }
     
          function isOffenseUnit(unit) {
            return (unit.get_UnitGameData_Obj().n in offense_unit_map);
          }
     
          function isDefenseUnit(unit) {
            return (unit.get_UnitGameData_Obj().n in defense_unit_map);
          }
     
          function getUnitArrays(city) {
            var ret = [];
            for (var k in city) {
              if ((typeof (city[k]) == "object") && city[k]) {
                for (var k2 in city[k]) {
                  if (PerforceChangelist >= 376877) {
                    if ((typeof (city[k][k2]) == "object") && city[k][k2] && "d" in city[k][k2]) {
                      var lst = city[k][k2].d;
                      if ((typeof (lst) == "object") && lst) {
                        for (var i in lst) {
                          if (typeof (lst[i]) == "object" && lst[i] && "get_CurrentLevel" in lst[i]) {
                            ret.push(lst);
                          }
                        }
                      }
                    }
                  } else {
                    if ((typeof (city[k][k2]) == "object") && city[k][k2] && "l" in city[k][k2]) {
                      var lst = city[k][k2].l;
                      if ((typeof (lst) == "object") && lst) {
                        for (var i in lst) {
                          if (typeof (lst[i]) == "object" && lst[i] && "get_CurrentLevel" in lst[i]) {
                            ret.push(lst);
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
            return ret;
          }
     
          function getDefenseUnits(city) {
            var arr = getUnitArrays(city);
            for (var i = 0; i < arr.length; ++i) {
              for (var j in arr[i]) {
                if (isDefenseUnit(arr[i][j])) {
                  return arr[i];
                }
              }
            }
            return [];
          }
     
          function getOffenseUnits(city) {
            var arr = getUnitArrays(city);
            for (var i = 0; i < arr.length; ++i) {
              for (var j in arr[i]) {
                if (isOffenseUnit(arr[i][j])) {
                  return arr[i];
                }
              }
            }
            return [];
          }
     
     
          function cncopt_create() {
            console.log("CNCOpt Link Button v" + window.__cncopt_version + " loaded");
            var cncopt = {
              selected_base: null,
              keymap: {
                /* GDI Buildings */"GDI_Accumulator": "a",
                "GDI_Refinery": "r",
                "GDI_Trade Center": "u",
                "GDI_Silo": "s",
                "GDI_Power Plant": "p",
                "GDI_Construction Yard": "y",
                "GDI_Airport": "d",
                "GDI_Barracks": "b",
                "GDI_Factory": "f",
                "GDI_Defense HQ": "q",
                "GDI_Defense Facility": "w",
                "GDI_Command Center": "e",
                "GDI_Support_Art": "z",
                "GDI_Support_Air": "x",
                "GDI_Support_Ion": "i",
                /* Forgotten Buildings */"FOR_Silo": "s",
                "FOR_Refinery": "r",
                "FOR_Tiberium Booster": "b",
                "FOR_Crystal Booster": "v",
                "FOR_Trade Center": "u",
                "FOR_Defense Facility": "w",
                "FOR_Construction Yard": "y",
                "FOR_Harvester_Tiberium": "h",
                "FOR_Defense HQ": "q",
                "FOR_Harvester_Crystal": "n",
                /* Nod Buildings */"NOD_Refinery": "r",
                "NOD_Power Plant": "p",
                "NOD_Harvester": "h",
                "NOD_Construction Yard": "y",
                "NOD_Airport": "d",
                "NOD_Trade Center": "u",
                "NOD_Defense HQ": "q",
                "NOD_Barracks": "b",
                "NOD_Silo": "s",
                "NOD_Factory": "f",
                "NOD_Harvester_Crystal": "n",
                "NOD_Command Post": "e",
                "NOD_Support_Art": "z",
                "NOD_Support_Ion": "i",
                "NOD_Accumulator": "a",
                "NOD_Support_Air": "x",
                "NOD_Defense Facility": "w",
                //"NOD_Tech Lab": "",
                //"NOD_Recruitment Hub": "X",
                //"NOD_Temple of Nod": "X",
     
                /* GDI Defense Units */"GDI_Wall": "w",
                "GDI_Cannon": "c",
                "GDI_Antitank Barrier": "t",
                "GDI_Barbwire": "b",
                "GDI_Turret": "m",
                "GDI_Flak": "f",
                "GDI_Art Inf": "r",
                "GDI_Art Air": "e",
                "GDI_Art Tank": "a",
                "GDI_Def_APC Guardian": "g",
                "GDI_Def_Missile Squad": "q",
                "GDI_Def_Pitbull": "p",
                "GDI_Def_Predator": "d",
                "GDI_Def_Sniper": "s",
                "GDI_Def_Zone Trooper": "z",
                /* Nod Defense Units */"NOD_Def_Antitank Barrier": "t",
                "NOD_Def_Art Air": "e",
                "NOD_Def_Art Inf": "r",
                "NOD_Def_Art Tank": "a",
                "NOD_Def_Attack Bike": "p",
                "NOD_Def_Barbwire": "b",
                "NOD_Def_Black Hand": "z",
                "NOD_Def_Cannon": "c",
                "NOD_Def_Confessor": "s",
                "NOD_Def_Flak": "f",
                "NOD_Def_MG Nest": "m",
                "NOD_Def_Militant Rocket Soldiers": "q",
                "NOD_Def_Reckoner": "g",
                "NOD_Def_Scorpion Tank": "d",
                "NOD_Def_Wall": "w",
     
                /* Forgotten Defense Units */"FOR_Wall": "w",
                "FOR_Barbwire_VS_Inf": "b",
                "FOR_Barrier_VS_Veh": "t",
                "FOR_Inf_VS_Inf": "g",
                "FOR_Inf_VS_Veh": "r",
                "FOR_Inf_VS_Air": "q",
                "FOR_Sniper": "n",
                "FOR_Mammoth": "y",
                "FOR_Veh_VS_Inf": "o",
                "FOR_Veh_VS_Veh": "s",
                "FOR_Veh_VS_Air": "u",
                "FOR_Turret_VS_Inf": "m",
                "FOR_Turret_VS_Inf_ranged": "a",
                "FOR_Turret_VS_Veh": "v",
                "FOR_Turret_VS_Veh_ranged": "d",
                "FOR_Turret_VS_Air": "f",
                "FOR_Turret_VS_Air_ranged": "e",
     
                /* GDI Offense Units */"GDI_APC Guardian": "g",
                "GDI_Commando": "c",
                "GDI_Firehawk": "f",
                "GDI_Juggernaut": "j",
                "GDI_Kodiak": "k",
                "GDI_Mammoth": "m",
                "GDI_Missile Squad": "q",
                "GDI_Orca": "o",
                "GDI_Paladin": "a",
                "GDI_Pitbull": "p",
                "GDI_Predator": "d",
                "GDI_Riflemen": "r",
                "GDI_Sniper Team": "s",
                "GDI_Zone Trooper": "z",
     
                /* Nod Offense Units */"NOD_Attack Bike": "b",
                "NOD_Avatar": "a",
                "NOD_Black Hand": "z",
                "NOD_Cobra": "r",
                "NOD_Commando": "c",
                "NOD_Confessor": "s",
                "NOD_Militant Rocket Soldiers": "q",
                "NOD_Militants": "m",
                "NOD_Reckoner": "k",
                "NOD_Salamander": "l",
                "NOD_Scorpion Tank": "o",
                "NOD_Specter Artilery": "p",
                "NOD_Venom": "v",
                "NOD_Vertigo": "t",
     
                "<last>": "."
              },
              make_sharelink: function () {
                try {
                  var selected_base = cncopt.selected_base;
                  var city_id = selected_base.get_Id();
                  var city = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(city_id);
                  var own_city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
                  var alliance = ClientLib.Data.MainData.GetInstance().get_Alliance();
                  tbase = selected_base;
                  tcity = city;
                  scity = own_city;
                  //console.log("Target City: ", city);
                  //console.log("Own City: ", own_city);
                  var link = "http://cncopt.com/?map=";
                  link += "3|"; /* link version */
                  switch (city.get_CityFaction()) {
                    case 1:
                      /* GDI */
                      link += "G|";
                      break;
                    case 2:
                      /* NOD */
                      link += "N|";
                      break;
                    case 3:
                      /* FOR faction - unseen, but in GAMEDATA */
                    case 4:
                      /* Forgotten Bases */
                    case 5:
                      /* Forgotten Camps */
                    case 6:
                      /* Forgotten Outposts */
                      link += "F|";
                      break;
                    default:
                      console.log("cncopt: Unknown faction: " + city.get_CityFaction());
                      link += "E|";
                      break;
                  }
                  switch (own_city.get_CityFaction()) {
                    case 1:
                      /* GDI */
                      link += "G|";
                      break;
                    case 2:
                      /* NOD */
                      link += "N|";
                      break;
                    case 3:
                      /* FOR faction - unseen, but in GAMEDATA */
                    case 4:
                      /* Forgotten Bases */
                    case 5:
                      /* Forgotten Camps */
                    case 6:
                      /* Forgotten Outposts */
                      link += "F|";
                      break;
                    default:
                      console.log("cncopt: Unknown faction: " + own_city.get_CityFaction());
                      link += "E|";
                      break;
                  }
                  link += city.get_Name() + "|";
                  defense_units = []
                  for (var i = 0; i < 20; ++i) {
                    var col = [];
                    for (var j = 0; j < 9; ++j) {
                      col.push(null);
                    }
                    defense_units.push(col)
                  }
                  var defense_unit_list = getDefenseUnits(city);
                  if (PerforceChangelist >= 376877) {
                    for (var i in defense_unit_list) {
                      var unit = defense_unit_list[i];
                      defense_units[unit.get_CoordX()][unit.get_CoordY() + 8] = unit;
                    }
                  } else {
                    for (var i = 0; i < defense_unit_list.length; ++i) {
                      var unit = defense_unit_list[i];
                      defense_units[unit.get_CoordX()][unit.get_CoordY() + 8] = unit;
                    }
                  }
     
                  offense_units = []
                  for (var i = 0; i < 20; ++i) {
                    var col = [];
                    for (var j = 0; j < 9; ++j) {
                      col.push(null);
                    }
                    offense_units.push(col)
                  }
     
                  var offense_unit_list = getOffenseUnits(city);
                  if (PerforceChangelist >= 376877) {
                    for (var i in offense_unit_list) {
                      var unit = offense_unit_list[i];
                      offense_units[unit.get_CoordX()][unit.get_CoordY() + 16] = unit;
                    }
                  } else {
                    for (var i = 0; i < offense_unit_list.length; ++i) {
                      var unit = offense_unit_list[i];
                      offense_units[unit.get_CoordX()][unit.get_CoordY() + 16] = unit;
                    }
                  }
     
                  var techLayout = findTechLayout(city);
                  var buildings = findBuildings(city);
                  for (var i = 0; i < 20; ++i) {
                    row = [];
                    for (var j = 0; j < 9; ++j) {
                      var spot = i > 16 ? null : techLayout[j][i];
                      var level = 0;
                      var building = null;
                      if (spot && spot.BuildingIndex >= 0) {
                        building = buildings[spot.BuildingIndex];
                        level = building.get_CurrentLevel();
                      }
                      var defense_unit = defense_units[j][i];
                      if (defense_unit) {
                        level = defense_unit.get_CurrentLevel();
                      }
                      var offense_unit = offense_units[j][i];
                      if (offense_unit) {
                        level = offense_unit.get_CurrentLevel();
                      }
                      if (level > 1) {
                        link += level;
                      }
     
                      switch (i > 16 ? 0 : city.GetResourceType(j, i)) {
                        case 0:
                          if (building) {
                            var techId = building.get_MdbBuildingId();
                            if (GAMEDATA.Tech[techId].n in cncopt.keymap) {
                              link += cncopt.keymap[GAMEDATA.Tech[techId].n];
                            } else {
                              console.log("cncopt [5]: Unhandled building: " + techId, building);
                              link += ".";
                            }
                          } else if (defense_unit) {
                            if (defense_unit.get_UnitGameData_Obj().n in cncopt.keymap) {
                              link += cncopt.keymap[defense_unit.get_UnitGameData_Obj().n];
                            } else {
                              console.log("cncopt [5]: Unhandled unit: " + defense_unit.get_UnitGameData_Obj().n);
                              link += ".";
                            }
                          } else if (offense_unit) {
                            if (offense_unit.get_UnitGameData_Obj().n in cncopt.keymap) {
                              link += cncopt.keymap[offense_unit.get_UnitGameData_Obj().n];
                            } else {
                              console.log("cncopt [5]: Unhandled unit: " + offense_unit.get_UnitGameData_Obj().n);
                              link += ".";
                            }
                          } else {
                            link += ".";
                          }
                          break;
                        case 1:
                          /* Crystal */
                          if (spot.BuildingIndex < 0) link += "c";
                          else link += "n";
                          break;
                        case 2:
                          /* Tiberium */
                          if (spot.BuildingIndex < 0) link += "t";
                          else link += "h";
                          break;
                        case 4:
                          /* Woods */
                          link += "j";
                          break;
                        case 5:
                          /* Scrub */
                          link += "h";
                          break;
                        case 6:
                          /* Oil */
                          link += "l";
                          break;
                        case 7:
                          /* Swamp */
                          link += "k";
                          break;
                        default:
                          console.log("cncopt [4]: Unhandled resource type: " + city.GetResourceType(j, i));
                          link += ".";
                          break;
                      }
                    }
                  }
                  /* Tack on our alliance bonuses */
                  if (alliance && scity.get_AllianceId() == tcity.get_AllianceId()) {
                    link += "|" + alliance.get_POITiberiumBonus();
                    link += "|" + alliance.get_POICrystalBonus();
                    link += "|" + alliance.get_POIPowerBonus();
                    link += "|" + alliance.get_POIInfantryBonus();
                    link += "|" + alliance.get_POIVehicleBonus();
                    link += "|" + alliance.get_POIAirBonus();
                    link += "|" + alliance.get_POIDefenseBonus();
                  }
     
                  //console.log(link);
                  window.open(link, "_blank");
                } catch (e) {
                  console.log("cncopt [1]: ", e);
                }
              }
            };
            if (!webfrontend.gui.region.RegionCityMenu.prototype.__cncopt_real_showMenu) {
              webfrontend.gui.region.RegionCityMenu.prototype.__cncopt_real_showMenu = webfrontend.gui.region.RegionCityMenu.prototype.showMenu;
            }
     
            var check_ct = 0;
            var check_timer = null;
            var button_enabled = 123456;
            /* Wrap showMenu so we can inject our Sharelink at the end of menus and
             * sync Base object to our cncopt.selected_base variable  */
            webfrontend.gui.region.RegionCityMenu.prototype.showMenu = function (selected_base) {
              try {
                var self = this;
                //console.log(selected_base);
                cncopt.selected_base = selected_base;
                if (this.__cncopt_initialized != 1) {
                  this.__cncopt_initialized = 1;
                  this.__cncopt_links = [];
                  for (var i in this) {
                    try {
                      if (this[i] && this[i].basename == "Composite") {
                        var link = new qx.ui.form.Button("CNCOpt", "http://cncopt.com/favicon.ico");
                        link.addListener("execute", function () {
                          var bt = qx.core.Init.getApplication();
                          bt.getBackgroundArea().closeCityInfo();
                          cncopt.make_sharelink();
                        });
                        this[i].add(link);
                        this.__cncopt_links.push(link)
                      }
                    } catch (e) {
                      console.log("cncopt [2]: ", e);
                    }
                  }
                }
                var tf = false;
                switch (selected_base.get_VisObjectType()) {
                  case ClientLib.Vis.VisObject.EObjectType.RegionCityType:
                    switch (selected_base.get_Type()) {
                      case ClientLib.Vis.Region.RegionCity.ERegionCityType.Own:
                        tf = true;
                        break;
                      case ClientLib.Vis.Region.RegionCity.ERegionCityType.Alliance:
                      case ClientLib.Vis.Region.RegionCity.ERegionCityType.Enemy:
                        tf = true;
                        break;
                    }
                    break;
                  case ClientLib.Vis.VisObject.EObjectType.RegionGhostCity:
                    tf = false;
                    console.log("cncopt: Ghost City selected.. ignoring because we don't know what to do here");
                    break;
                  case ClientLib.Vis.VisObject.EObjectType.RegionNPCBase:
                    tf = true;
                    break;
                  case ClientLib.Vis.VisObject.EObjectType.RegionNPCCamp:
                    tf = true;
                    break;
                }
     
                var orig_tf = tf;
     
                function check_if_button_should_be_enabled() {
                  try {
                    tf = orig_tf;
                    var selected_base = cncopt.selected_base;
                    var still_loading = false;
                    if (check_timer != null) {
                      clearTimeout(check_timer);
                    }
     
                    /* When a city is selected, the data for the city is loaded in the background.. once the
                     * data arrives, this method is called again with these fields set, but until it does
                     * we can't actually generate the link.. so this section of the code grays out the button
                     * until the data is ready, then it'll light up. */
                    if (selected_base && selected_base.get_Id) {
                      var city_id = selected_base.get_Id();
                      var city = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(city_id);
                      //if (!city || !city.m_CityUnits || !city.m_CityUnits.m_DefenseUnits) {
                      //console.log("City", city);
                      //console.log("get_OwnerId", city.get_OwnerId());
                      if (!city || city.get_OwnerId() == 0) {
                        still_loading = true;
                        tf = false;
                      }
                    } else {
                      tf = false;
                    }
                    if (tf != button_enabled) {
                      button_enabled = tf;
                      for (var i = 0; i < self.__cncopt_links.length; ++i) {
                        self.__cncopt_links[i].setEnabled(tf);
                      }
                    }
                    if (!still_loading) {
                      check_ct = 0;
                    } else {
                      if (check_ct > 0) {
                        check_ct--;
                        check_timer = setTimeout(check_if_button_should_be_enabled, 100);
                      } else {
                        check_timer = null;
                      }
                    }
                  } catch (e) {
                    console.log("cncopt [3]: ", e);
                    tf = false;
                  }
                }
     
                check_ct = 50;
                check_if_button_should_be_enabled();
              } catch (e) {
                console.log("cncopt [3]: ", e);
              }
              this.__cncopt_real_showMenu(selected_base);
            }
          }
     
     
          /* Nice load check (ripped from AmpliDude's LoU Tweak script) */
          function cnc_check_if_loaded() {
            try {
              if (typeof qx != 'undefined') {
                a = qx.core.Init.getApplication(); // application
                if (a) {
                  cncopt_create();
                } else {
                  window.setTimeout(cnc_check_if_loaded, 1000);
                }
              } else {
                window.setTimeout(cnc_check_if_loaded, 1000);
              }
            } catch (e) {
              if (typeof console != 'undefined') console.log(e);
              else if (window.opera) opera.postError(e);
              else GM_log(e);
            }
          }
          if (/commandandconquer\.com/i.test(document.domain)) window.setTimeout(cnc_check_if_loaded, 1000);
        }
     
        // injecting because we can't seem to hook into the game interface via unsafeWindow
        //   (Ripped from AmpliDude's LoU Tweak script)
        var script_block = document.createElement("script");
        txt = cncopt_main.toString();
        script_block.innerHTML = "(" + txt + ")();";
        script_block.type = "text/javascript";
        if (/commandandconquer\.com/i.test(document.domain)) document.getElementsByTagName("head")[0].appendChild(script_block);
      })();
    } catch (e) {
      GM_log(e);
    }
    

// ==UserScript==
// @name            WarChiefs - Tiberium Alliances Sector HUD
// @description     Displays a tiny HUD with the Sector you are viewing.
// @author          Eistee
// @version         13.09.11
// @namespace       http*://*.alliances.commandandconquer.com/*
// @include         http*://*.alliances.commandandconquer.com/*
// @require         http://usocheckup.redirectme.net/172683.js
// @icon            http://s3.amazonaws.com/uso_ss/icon/172683/large.png
// @grant           GM_getValue
// @grant           GM_log
// @grant           GM_openInTab
// @grant           GM_registerMenuCommand
// @grant           GM_setValue
// @grant           GM_xmlhttpRequest
// ==/UserScript==
/**
 *  License: CC-BY-NC-SA 3.0
 */
(function () {
	var injectFunction = function () {
		function createClasses() {
			qx.Class.define("SectorHUD", {
				type: "singleton",
				extend: qx.core.Object,
				construct: function () {
					this.SectorText = new qx.ui.basic.Label("").set({
						textColor : "#FFFFFF",
						font : "font_size_11"
					});
					var HUD = new qx.ui.container.Composite(new qx.ui.layout.HBox()).set({
						decorator : new qx.ui.decoration.Background().set({
							backgroundRepeat : "no-repeat",
							backgroundImage : "webfrontend/ui/menues/notifications/bgr_ticker_container.png",
							backgroundPositionX : "center"
						}),
						padding : 2,
						opacity: 0.8
					});
					HUD.add(this.SectorText);
					HUD.addListener("click", function (e) {
						if (e.getButton() == "left") this.paste_Coords();
						if (e.getButton() == "right") this.jump_Coords();
					}, this);
					qx.core.Init.getApplication().getDesktop().add(HUD, {left: 128, top: 0});
					phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance().get_Region(), "PositionChange", ClientLib.Vis.PositionChange, this, this._update);
				},
				destruct: function () {},
				members: {
					SectorText: null,
					get_SectorText: function (i) {
						var qxApp = qx.core.Init.getApplication();
						switch (i) {
						case 0:
							return qxApp.tr("tnf:south abbr");
						case 1:
							return qxApp.tr("tnf:southwest abbr");
						case 2:
							return qxApp.tr("tnf:west abbr");
						case 3:
							return qxApp.tr("tnf:northwest abbr");
						case 4:
							return qxApp.tr("tnf:north abbr");
						case 5:
							return qxApp.tr("tnf:northeast abbr");
						case 6:
							return qxApp.tr("tnf:east abbr");
						case 7:
							return qxApp.tr("tnf:southeast abbr");
						}
					},
					get_SectorNo: function (x, y) {
						var WorldX2 = Math.floor(ClientLib.Data.MainData.GetInstance().get_Server().get_WorldWidth() / 2);
						var WorldY2 = Math.floor(ClientLib.Data.MainData.GetInstance().get_Server().get_WorldHeight() / 2);
						var SectorCount = ClientLib.Data.MainData.GetInstance().get_Server().get_SectorCount();
						var WorldCX = (WorldX2 - x);
						var WorldCY = (y - WorldY2);
						var WorldCa = ((Math.atan2(WorldCX, WorldCY) * SectorCount) / 6.2831853071795862);
						WorldCa += (SectorCount + 0.5);
						return (Math.floor(WorldCa) % SectorCount);
					},
					get_Coords: function () {
						var Region = ClientLib.Vis.VisMain.GetInstance().get_Region();
						var GridWidth = Region.get_GridWidth();
						var GridHeight = Region.get_GridHeight();
						var RegionPosX = Region.get_PosX();
						var RegionPosY = Region.get_PosY();
						var ViewWidth = Region.get_ViewWidth();
						var ViewHeight = Region.get_ViewHeight();
						var ZoomFactor = Region.get_ZoomFactor();
						var ViewCoordX = Math.floor((RegionPosX + ViewWidth / 2 / ZoomFactor) / GridWidth - 0.5);
						var ViewCoordY = Math.floor((RegionPosY + ViewHeight / 2 / ZoomFactor) / GridHeight - 0.5);
						return {X: ViewCoordX, Y: ViewCoordY};
					},
					paste_Coords: function(){
						var Coords = this.get_Coords();
						var input = qx.core.Init.getApplication().getChat().getChatWidget().getEditable();
						var inputDOM = input.getContentElement().getDomElement();
						var text = [];
						text.push(inputDOM.value.substring(0, inputDOM.selectionStart));
						text.push("[coords]" + Coords.X + ':' + Coords.Y + "[/coords]");
						text.push(inputDOM.value.substring(inputDOM.selectionEnd, inputDOM.value.length));
						input.setValue(text.join(' '));
					},
					jump_Coords: function(){
						var coords = prompt("Jump to Coords:");
						if (coords) {
							var xy = coords.replace(/(\[coords\])?([#])?(\d{1,4})\D(\d{1,4})(\D\w+)?(\[\/coords\])?/gi, function () {
								if (arguments.length >= 5) {
									ClientLib.Vis.VisMain.GetInstance().get_Region().CenterGridPosition(parseInt(arguments[3], 10), parseInt(arguments[4], 10));
								}
							});
						}
					},
					_update: function () {
						var Coords = this.get_Coords();
						this.SectorText.setValue(Coords.X + ":" + Coords.Y + " [" + this.get_SectorText(this.get_SectorNo(Coords.X, Coords.Y)) + "]");
					}
				}
			});
		}
		function waitForGame() {
			try {
				if (typeof qx !== "undefined" && typeof qx.core !== "undefined" && typeof qx.core.Init !== "undefined" && typeof ClientLib !== "undefined" && typeof phe !== "undefined") {
					var app = qx.core.Init.getApplication();
					if (app.initDone == true) {
						try {
							console.log("WarChiefs - Sector HUD: Loading");
							createClasses();
							SectorHUD.getInstance();
							console.log("WarChiefs - Sector HUD: Loaded");
						} catch (e) {
							console.log("WarChiefs - Sector HUD: initialization error:");
							console.log(e);
						}
					} else
						window.setTimeout(waitForGame, 1000);
				} else {
					window.setTimeout(waitForGame, 1000);
				}
			} catch (e) {
				console.log(e);
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




/***********************************************************************************
Tiberium Alliances Info Sticker
***********************************************************************************/
                                    

(function () {
    var InfoSticker_main = function () {
        try {
            function createInfoSticker() {
                console.log('InfoSticker loaded');
                // define Base
                qx.Class.define("InfoSticker.Base", {
                    type: "singleton",
                    extend: qx.core.Object,
                    members: {
                        /* Desktop */
                        dataTimerInterval: 1000,
                        positionInterval: 500,
                        tibIcon: null,
                        cryIcon: null,
                        powIcon: null,
                        creditIcon: null,
                        repairIcon: null,
                        hasStorage: false,

                        initialize: function () {
                            try {
                                this.hasStorage = 'localStorage' in window && window['localStorage'] !== null;
                            } catch (se) {}
                            try {
                                var fileManager = ClientLib.File.FileManager.GetInstance();
                                this.tibIcon = fileManager.GetPhysicalPath("ui/common/icn_res_tiberium.png");
                                this.cryIcon = fileManager.GetPhysicalPath("ui/common/icn_res_chrystal.png");
                                this.powIcon = fileManager.GetPhysicalPath("ui/common/icn_res_power.png");
                                this.creditIcon = fileManager.GetPhysicalPath("ui/common/icn_res_dollar.png");
								this.repairIcon = fileManager.GetPhysicalPath("ui/icons/icn_repair_off_points.png");
                                
								if (typeof phe.cnc.Util.attachNetEvent == 'undefined')
									this.attachEvent = webfrontend.gui.Util.attachNetEvent;
								else
									this.attachEvent = phe.cnc.Util.attachNetEvent;
                                
                                this.runMainTimer();
                            } catch (e) {
                                console.log("InfoSticker.initialize: ", e.toString());
                            }
                        },
                        runMainTimer: function () {
                            try {
                                var self = this;
                                this.calculateInfoData();
                                window.setTimeout(function () {
                                    self.runMainTimer();
                                }, this.dataTimerInterval);
                            } catch (e) {
                                console.log("InfoSticker.runMainTimer: ", e.toString());
                            }
                        },
                        runPositionTimer: function () {
                            try {
                                var self = this;
                                this.repositionSticker();
                                window.setTimeout(function () {
                                    self.runPositionTimer();
                                }, this.positionInterval);
                            } catch (e) {
                                console.log("InfoSticker.runPositionTimer: ", e.toString());
                            }
                        },
                        infoSticker: null,
                        mcvPopup: null,
                        mcvTimerLabel: null,
                        mcvInfoLabel: null,
                        mcvPane: null,
                        
                        repairPopup: null,
                        repairTimerLabel: null,

                        resourcePane: null,
                        resourceHidden: false,
                        resourceTitleLabel: null,
                        resourceHideButton: null,
                        resourceLabel1: null,
                        resourceLabel2: null,
                        resourceLabel3: null,

                        resourceLabel1per: null,
                        resourceLabel2per: null,
                        resourceLabel3per: null,

                        productionTitleLabel: null,
                        productionLabelPower: null,
                        productionLabelCredit: null,

                        repairInfoLabel: null,

                        lastButton: null,

                        top_image: null,
                        bot_image: null,

                        toFlipH: [],

                        pinButton: null,
                        pinned: false,

                        pinTop: 130,
                        pinButtonDecoration: null,
                        pinPane: null,

                        pinIconFix: false,
                        
                        lockButton: null,
                        locked: false,

                        lockButtonDecoration: null,
                        lockPane: null,

                        lockIconFix: false,
                        
                        mcvHide: false,
                        repairHide: false,
                        resourceHide: false,
                        productionHide: false,
						contProductionHide: false,
						costHide: false,
						DEFcostHide: false,
                        stickerBackground: null,
                        
                        mcvPane: null,
                        
                        pinLockPos: 0,
                        
                        attachEvent: function() {},
                        
                        isNull: function(e) {
                            return typeof e == "undefined" || e == null;
                        },
                        
                        getApp: function() {
                            return qx.core.Init.getApplication();
                        },
                        
                        getBaseListBar: function() {
                            var app = this.getApp();
                            var b;
                            if(!this.isNull(app)) {
                                b = app.getBaseNavigationBar();
                                if(!this.isNull(b)) {
                                    if(b.getChildren().length > 0) {
                                        b = b.getChildren()[0];
                                        if(b.getChildren().length > 0) {
                                            b = b.getChildren()[0];
                                            return b;
                                        }
                                    }
                                }
                            }
                            return null;
                        },
                        
                        repositionSticker: function () {
                            try {
                            	var i;
                                
                                if (this.infoSticker && !this.mcvInfoLabel.isDisposed() && !this.mcvPopup.isDisposed()) {
                                    var dele;

                                    try {
                                        if (this.top_image != null) {
                                            dele = this.top_image.getContentElement().getDomElement();
                                            if (dele != null) {
                                                dele.style["-moz-transform"] = "scaleY(-1)";
                                                dele.style["-o-transform"] = "scaleY(-1)";
                                                dele.style["-webkit-transform"] = "scaleY(-1)";
                                                dele.style.transform = "scaleY(-1)";
                                                dele.style.filter = "FlipV";
                                                dele.style["-ms-filter"] = "FlipV";
                                                this.top_image = null;
                                            }
                                        }
                                        for (i = this.toFlipH.length - 1; i >= 0; i--) {
                                            var e = this.toFlipH[i];
                                            if(e.isDisposed()) this.toFlipH.splice(i, 1);
                                            else {
                                                dele = e.getDecoratorElement().getDomElement();
                                                if (dele != null) {
                                                    dele.style["-moz-transform"] = "scaleX(-1)";
                                                    dele.style["-o-transform"] = "scaleX(-1)";
                                                    dele.style["-webkit-transform"] = "scaleX(-1)";
                                                    dele.style.transform = "scaleX(-1)";
                                                    dele.style.filter = "FlipH";
                                                    dele.style["-ms-filter"] = "FlipH";
                                                    this.toFlipH.splice(i, 1);
                                                }
                                            }
                                        }
                                    } catch (e2) {
                                        console.log("Error flipping images.", e2.toString());
                                    }
                                    var baseListBar = this.getBaseListBar();
                                    if(baseListBar!=null) {
                                        var baseCont = baseListBar.getChildren();
                                        for (i = 0; i < baseCont.length; i++) {
                                            var baseButton = baseCont[i];
                                            if(typeof baseButton.getBaseId === 'function') {
                                                if(baseButton.getBaseId() == ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity().get_Id()
                                                    && baseButton.getBounds() != null && baseButton.getBounds().top!=null) {
                                            //var baseButtonDecorator = baseButton.getDecorator();
                                            //if (baseButton!=this.mcvPopup && baseButtonDecorator != null && typeof baseButtonDecorator === "string" && baseButton.getBounds() != null && baseButton.getBounds().top!=null) {
                                                //if (baseButtonDecorator.indexOf("focused") >= 0 || baseButtonDecorator.indexOf("pressed") >= 0) {
                                                    if(this.locked) {
                                                        if(!this.pinned) {
                                                            if(baseListBar.indexOf(this.mcvPopup)>=0) {
                                                                baseListBar.remove(this.mcvPopup);
                                                            }
                                                            this.pinLockPos = baseListBar.indexOf(baseButton)+1;
                                                            baseListBar.addAt(this.mcvPopup, this.pinLockPos);
                                                        } else if(baseListBar.indexOf(this.mcvPopup)<0) {
                                                            baseListBar.addAt(this.mcvPopup, Math.max(0, Math.min(this.pinLockPos, baseCont.length)));
                                                        }
                                                    } else {
                                                        if(baseListBar.indexOf(this.mcvPopup)>=0) {
                                                            baseListBar.remove(this.mcvPopup);
                                                        }
                                                        if (!this.pinned) {
                                                            var top = baseButton.getBounds().top;
                                                            var infoTop;
                                                            try {
                                                                var stickerHeight = this.infoSticker.getContentElement().getDomElement().style.height;
                                                                stickerHeight = stickerHeight.substring(0, stickerHeight.indexOf("px"));
                                                                infoTop = Math.min(130 + top, Math.max(660, window.innerHeight) - parseInt(stickerHeight, 10) - 130);
                                                            } catch (heighterror) {
                                                                infoTop = 130 + top;
                                                            }
                                                            if(this.infoSticker.getContentElement().getDomElement()!=null)
                                                                this.infoSticker.setDomTop(infoTop);
                                                            
                                                            this.pinTop = infoTop;
                                                        }
                                                    }
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                    
                                }
                            } catch (ex) {
                                console.log("InfoSticker.repositionSticker: ", ex.toString());
                            }
                        },
                        toLock: function (e) {
                            try {
                                this.locked = !this.locked;
                                if(!this.locked) {
                                    this.infoSticker.show();
                                    this.stickerBackground.add(this.mcvPopup);
                                }
                                else this.infoSticker.hide();
                                this.lockButton.setIcon(this.locked ? "FactionUI/icons/icn_thread_locked_active.png" : "FactionUI/icons/icn_thread_locked_inactive.png");
                                this.updateLockButtonDecoration();
                                if (this.hasStorage) {
                                    if (this.locked) {
                                        localStorage["infoSticker-locked"] = "true";
                                        if(this.pinned) localStorage["infoSticker-pinLock"] = this.pinLockPos.toString();
                                    } else {
                                        localStorage["infoSticker-locked"] = "false";
                                    }
                                }
                                if(this.locked && this.pinned) {
                                    this.menuUpButton.setEnabled(true);
                                    this.menuDownButton.setEnabled(true);
                                } else {
                                    this.menuUpButton.setEnabled(false);
                                    this.menuDownButton.setEnabled(false);
                                }
                                this.repositionSticker();
                            } catch(e) {
                                console.log("InfoSticker.toLock: ", e.toString());
                            }
                        },
                        updateLockButtonDecoration: function () {
                            var light = "#CDD9DF";
                            var mid = "#9CA4A8";
                            var dark = "#8C9499";
                            this.lockPane.setDecorator(null);
                            this.lockButtonDecoration = new qx.ui.decoration.Background();
                            this.lockButtonDecoration.setBackgroundColor(this.locked ? dark : light);
                            this.lockPane.setDecorator(this.lockButtonDecoration);
                        },
                        toPin: function (e) {
                            try {
                                this.pinned = !this.pinned;
                                this.pinButton.setIcon(this.pinned ? "FactionUI/icons/icn_thread_pin_active.png" : "FactionUI/icons/icn_thread_pin_inactive.png");
                                this.updatePinButtonDecoration();
                                if (this.hasStorage) {
                                    if (this.pinned) {
                                        localStorage["infoSticker-pinned"] = "true";
                                        localStorage["infoSticker-top"] = this.pinTop.toString();
                                        if(this.locked) {
                                            localStorage["infoSticker-pinLock"] = this.pinLockPos.toString();
                                        }
                                    } else {
                                        localStorage["infoSticker-pinned"] = "false";
                                    }
                                }
                                if(this.locked && this.pinned) {
                                    this.menuUpButton.setEnabled(true);
                                    this.menuDownButton.setEnabled(true);
                                } else {
                                    this.menuUpButton.setEnabled(false);
                                    this.menuDownButton.setEnabled(false);
                                }
                            } catch(e) {
                                console.log("InfoSticker.toPin: ", e.toString());
                            }
                        },
                        updatePinButtonDecoration: function () {
                            var light = "#CDD9DF";
                            var mid = "#9CA4A8";
                            var dark = "#8C9499";
                            this.pinPane.setDecorator(null);
                            this.pinButtonDecoration = new qx.ui.decoration.Background().set({
                                //innerOpacity: 0.5
                            });
                            //this.pinButtonDecoration.setInnerColor(this.pinned ? mid : light);
                            //this.pinButtonDecoration.setOuterColor(this.pinned ? light : mid);
                            this.pinButtonDecoration.setBackgroundColor(this.pinned ? dark : light);
                            this.pinPane.setDecorator(this.pinButtonDecoration);
                        },
                        hideResource: function () {
                            try {
                                //if(this.resourceHidden) 
                                if (this.resourcePane.isVisible()) {
                                    //this.resourcePane.hide();
                                    this.resourcePane.exclude();
                                    this.resourceHideButton.setLabel("+");
                                } else {
                                    this.resourcePane.show();
                                    this.resourceHideButton.setLabel("-");
                                }
                            } catch(e) {
                                console.log("InfoSticker.hideResource: ", e.toString());
                            }
                        },
                        lastPane: null,
                        createSection: function (parent, titleLabel, visible, visibilityStorageName) {
							try {
								var pane = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({
									padding: [5, 0, 5, 5],
									width: 124,
									decorator: new qx.ui.decoration.Background().set({
										backgroundImage: "decoration/pane_messaging_item/messaging_items_pane.png",
										backgroundRepeat: "scale",
									}),
									alignX: "right"
								});
								
								var labelStyle = {
									font: qx.bom.Font.fromString('bold').set({
										size: 12
									}),
									textColor: '#595969'
								};
								titleLabel.set(labelStyle);
								
								var hidePane = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({
									width: 124,
                                    alignX: "right"
								});
								
								var hideButton = new qx.ui.form.Button("-").set({
									//decorator: new qx.ui.decoration.Single(1, "solid", "black"),
									maxWidth: 15,
									maxHeight: 10,
									//textColor: "black"
								});
                                var self = this;
								//resourceHideButton.addListener("execute", this.hideResource, this);
								hideButton.addListener("execute", function () {
									if (hidePane.isVisible()) {
										hidePane.exclude();
										hideButton.setLabel("+");
									} else {
										hidePane.show();
										hideButton.setLabel("-");
									}
									if(self.hasStorage)
										localStorage["infoSticker-"+visibilityStorageName] = !hidePane.isVisible();
								});

								var titleBar = new qx.ui.container.Composite(new qx.ui.layout.HBox(0));
								titleBar.add(hideButton);
								titleBar.add(titleLabel);
								pane.add(titleBar);
								pane.add(hidePane);
								
                                if(!visible) hidePane.exclude();
                                
								this.toFlipH.push(pane);

                                this.lastPane = pane;
								parent.add(pane);
								
								return hidePane;
							} catch(e) {
								console.log("InfoSticker.createSection: ", e.toString());
								throw e;
							}
                        },
						createHBox: function (ele1, ele2, ele3) {
							var cnt;
							cnt = new qx.ui.container.Composite();
							cnt.setLayout(new qx.ui.layout.HBox(0));
							if (ele1 != null) {
								cnt.add(ele1);
								ele1.setAlignY("middle");
							}
							if (ele2 != null) {
								cnt.add(ele2);
								ele2.setAlignY("bottom");
							}
							if (ele3 != null) {
								cnt.add(ele3);
								ele3.setAlignY("bottom");
							}

							return cnt;
						},
                        
                        formatCompactTime: function (time) {
                            var comps = time.split(":");
                            
                            var i = 0;
                            var value = Math.round(parseInt(comps[i], 10)).toString();
                            var len = comps.length;
                            while(value==0) {
                                value = Math.round(parseInt(comps[++i], 10)).toString();
                                len--;
                            }
                            var unit;
                            switch(len) {
                                case 1: unit = "s"; break;
                                case 2: unit = "m"; break;
                                case 3: unit = "h"; break;
                                case 4: unit = "d"; break;
                            }
                            return value+unit;
                        },
                        createImage: function(icon) {
                            var image = new qx.ui.basic.Image(icon);
                            image.setScale(true);
                            image.setWidth(20);
                            image.setHeight(20);
                            return image;
                        },

                        createMCVPane: function() {
                            try {
                                this.mcvInfoLabel = new qx.ui.basic.Label();
                                this.mcvTimerLabel = new qx.ui.basic.Label().set({
                                    font: qx.bom.Font.fromString('bold').set({
                                            size: 18
                                        }),
                                    textColor: '#282828',
                                    height: 20,
                                    width: 114,
                                    textAlign: 'center'
                                });
                                this.mcvTimerCreditProdLabel = new qx.ui.basic.Label().set({
                                    font: qx.bom.Font.fromString('normal').set({
                                        size: 12
                                    }),
                                    textColor: '#282828',
                                    height: 20,
                                    width: 114,
                                    textAlign: 'center',
                                    marginTop: 4,
                                    marginBottom: -4
                                });
                                var app = qx.core.Init.getApplication();
                                var b3 = app.getBaseNavigationBar().getChildren()[0].getChildren()[0];
                                
                                
                                var pane = this.createSection(b3, this.mcvInfoLabel, !this.mcvHide, "mcvHide");
                                pane.add(this.mcvTimerLabel);
                                pane.add(this.mcvTimerCreditProdLabel);
                                this.mcvPane = this.lastPane;
                                this.lastPane.setMarginLeft(7);
                                
                            } catch(e) {
                                console.log("InfoSticker.createMCVPopup", e.toString());
                            }
                        },
                        moveStickerUp: function() {
                            try {
                                var baseListBar = this.getBaseListBar();
                                this.pinLockPos=Math.max(0, this.pinLockPos-1);
                                if(baseListBar.indexOf(this.mcvPopup)>=0) {
                                    baseListBar.remove(this.mcvPopup);
                                }
                                if (this.hasStorage) {
                                    localStorage["infoSticker-pinLock"] = this.pinLockPos.toString();
                                }
                            } catch(e) {
                                console.log("InfoSticker.moveStickerUp", e.toString());
                            }
                        },
                        moveStickerDown: function() {
                            try {
                                var baseListBar = this.getBaseListBar();
                                this.pinLockPos=Math.min(baseListBar.getChildren().length, this.pinLockPos+1);
                                if(baseListBar.indexOf(this.mcvPopup)>=0) {
                                    baseListBar.remove(this.mcvPopup);
                                }
                                if (this.hasStorage) {
                                    localStorage["infoSticker-pinLock"] = this.pinLockPos.toString();
                                }
                            } catch(e) {
                                console.log("InfoSticker.moveStickerDown", e.toString());
                            }
                        },
                        menuUpButton: null,
                        menuDownButton: null,
                        createMCVPopup: function() {
                            try {
                                var self = this;
                                this.mcvPopup = new qx.ui.container.Composite(new qx.ui.layout.VBox().set({
                                    spacing: 3})).set({
                                    paddingLeft: 5,
                                    width: 105,
                                    decorator: new qx.ui.decoration.Background()
                                });
                                
                                var menu = new qx.ui.menu.Menu();
                                var menuPinButton = new qx.ui.menu.Button("Pin", "FactionUI/icons/icn_thread_pin_inactive.png");
                                menuPinButton.addListener("execute", this.toPin, this);
                                menu.add(menuPinButton);
                                var menuLockButton = new qx.ui.menu.Button("Lock", "FactionUI/icons/icn_thread_locked_inactive.png");
                                menuLockButton.addListener("execute", this.toLock, this);
                                menu.add(menuLockButton);
                                var fileManager = ClientLib.File.FileManager.GetInstance();
                                this.menuUpButton = new qx.ui.menu.Button("Move up", fileManager.GetPhysicalPath("ui/icons/icon_tracker_arrow_up.png"));
                                //ui/icons/icon_tracker_arrow_up.png ui/gdi/icons/cht_opt_arrow_down.png
                                this.menuUpButton.addListener("execute", this.moveStickerUp, this);
                                menu.add(this.menuUpButton);
                                this.menuDownButton = new qx.ui.menu.Button("Move down", fileManager.GetPhysicalPath("ui/icons/icon_tracker_arrow_down.png"));
                                this.menuDownButton.addListener("execute", this.moveStickerDown, this);
                                menu.add(this.menuDownButton);
                                this.mcvPopup.setContextMenu(menu);
                                if(!this.locked) {
                                    this.stickerBackground.add(this.mcvPopup);
                                }
    
    ////////////////////////////----------------------------------------------------------
                                this.pinButton = new webfrontend.ui.SoundButton().set({
                                    decorator: "button-forum-light",
                                    icon: this.pinned ? "FactionUI/icons/icn_thread_pin_active.png" : "FactionUI/icons/icn_thread_pin_inactive.png",
                                    iconPosition: "top",
                                    show: "icon",
                                    cursor: "pointer",
                                    height: 23,
                                    width: 50,
                                    //maxHeight: 25,
                                    maxWidth: 33,
                                    maxHeight: 19,
                                    alignX: "center"
                                });
                                this.pinButton.addListener("execute", this.toPin, this);
                                
                                this.pinPane = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({
                                    //width: 50,
                                    maxWidth: 37,
                                });
                                
                                this.updatePinButtonDecoration();
                                
                                this.pinPane.setDecorator(this.pinButtonDecoration);
                                this.pinPane.add(this.pinButton);
                                //this.mcvPopup.add(this.pinPane);
                                //this.toFlipH.push(this.pinPane);
                                
                                var icon = this.pinButton.getChildControl("icon");
                                icon.setWidth(15);
                                icon.setHeight(15);
                                icon.setScale(true);
    ////////////////////////////----------------------------------------------------------
                                this.lockButton = new webfrontend.ui.SoundButton().set({
                                    decorator: "button-forum-light",
                                    icon: this.pinned ? "FactionUI/icons/icn_thread_locked_active.png" : "FactionUI/icons/icn_thread_locked_inactive.png",
                                    iconPosition: "top",
                                    show: "icon",
                                    cursor: "pointer",
                                    height: 23,
                                    width: 50,
                                    //maxHeight: 25,
                                    maxWidth: 33,
                                    maxHeight: 19,
                                    alignX: "center"
                                });
                                this.lockButton.addListener("execute", this.toLock, this);
                                
                                this.lockPane = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({
                                    //width: 50,
                                    maxWidth: 37,
                                });
                                
                                this.updateLockButtonDecoration();
                                
                                this.lockPane.setDecorator(this.lockButtonDecoration);
                                this.lockPane.add(this.lockButton);
                                //this.mcvPopup.add(this.pinPane);
                                //this.toFlipH.push(this.pinPane);
                                
                                icon = this.lockButton.getChildControl("icon");
                                icon.setWidth(15);
                                icon.setHeight(15);
                                icon.setScale(true);
    ////////////////////////////----------------------------------------------------------
                                this.resourceTitleLabel = new qx.ui.basic.Label();
                                this.resourceTitleLabel.setValue("Base");
                                var resStyle = {
                                    font: qx.bom.Font.fromString('bold').set({
                                            size: 14
                                        }),
                                    textColor: '#282828',
                                    height: 20,
                                    width: 65,
                                    marginLeft: -10,
                                    textAlign: 'right'
                                };
                                
                                this.resourceLabel1 = new qx.ui.basic.Label().set(resStyle);
                                this.resourceLabel2 = new qx.ui.basic.Label().set(resStyle);
                                this.resourceLabel3 = new qx.ui.basic.Label().set(resStyle);
                                
                                var perStyle = {
                                    font: qx.bom.Font.fromString('bold').set({
                                        size: 9
                                    }),
                                    textColor: '#282828',
                                    height: 18,
                                    width: 33,
                                    textAlign: 'right'
                                };
                                this.resourceLabel1per = new qx.ui.basic.Label().set(perStyle);
                                this.resourceLabel2per = new qx.ui.basic.Label().set(perStyle);
                                this.resourceLabel3per = new qx.ui.basic.Label().set(perStyle);
                                
                                
                                var pane3 = this.createSection(this.mcvPopup, this.resourceTitleLabel, !this.resourceHide, "resourceHide");
                                
                                
                                this.repairTimerLabel = new qx.ui.basic.Label().set({
                                    font: qx.bom.Font.fromString('bold').set({
                                        size: 16
                                    }),
                                    textColor: '#282828',
                                    height: 20,
                                    width: 85,
                                    marginLeft: 0,
                                    textAlign: 'center'
                                });
                                pane3.add(this.createHBox(this.createImage(this.repairIcon), this.repairTimerLabel));
                                
                                pane3.add(this.createHBox(this.createImage(this.tibIcon), this.resourceLabel1, this.resourceLabel1per));
                                pane3.add(this.createHBox(this.createImage(this.cryIcon), this.resourceLabel2, this.resourceLabel2per));
                                pane3.add(this.createHBox(this.createImage(this.powIcon), this.resourceLabel3, this.resourceLabel3per));
                                
                                var mcvC = this.mcvPopup.getChildren();
                                mcvC[mcvC.length-1].getChildren()[0].add(this.pinPane);
                                mcvC[mcvC.length-1].getChildren()[0].add(this.lockPane);
    ////////////////////////////----------------------------------------------------------
    
                                this.productionTitleLabel = new qx.ui.basic.Label();
                                this.productionTitleLabel.setValue("db.Produce");
                                
                                var productionStyle = {
                                    font: qx.bom.Font.fromString('bold').set({
                                        size: 13
                                    }),
                                    textColor: '#282828',
                                    height: 20,
                                    width: 85,
                                    textAlign: 'right',
                                    marginTop: 2,
                                    marginBottom: -2
                                };
								this.productionLabelTiberium = new qx.ui.basic.Label().set(productionStyle);
								this.productionLabelCrystal = new qx.ui.basic.Label().set(productionStyle);
                                
								this.productionLabelPower1 = new qx.ui.basic.Label().set(productionStyle);
                                this.productionLabelCredit = new qx.ui.basic.Label().set(productionStyle);
                                
                                var pane4 = this.createSection(this.mcvPopup, this.productionTitleLabel, !this.productionHide, "productionHide");
                                pane4.add(this.createHBox(this.createImage(this.tibIcon), this.productionLabelTiberium));
                                pane4.add(this.createHBox(this.createImage(this.cryIcon), this.productionLabelCrystal));
								
								pane4.add(this.createHBox(this.createImage(this.powIcon), this.productionLabelPower1));
                                pane4.add(this.createHBox(this.createImage(this.creditIcon), this.productionLabelCredit));
    ////////////////////////////----------------------------------------------------------
	
								this.contProductionTitleLabel = new qx.ui.basic.Label();
                                this.contProductionTitleLabel.setValue("Cont'+Ally");
                                
                                var contProductionStyle = {
                                    font: qx.bom.Font.fromString('bold').set({
                                        size: 13
                                    }),
                                    textColor: '#282828',
                                    height: 20,
                                    width: 85,
                                    textAlign: 'right',
                                    marginTop: 2,
                                    marginBottom: -2
                                };
								this.contProductionLabelTiberium = new qx.ui.basic.Label().set(contProductionStyle);
								this.contProductionLabelCrystal = new qx.ui.basic.Label().set(contProductionStyle);
                                this.contProductionLabelPower = new qx.ui.basic.Label().set(contProductionStyle);
								
                                this.contProductionLabelCredit = new qx.ui.basic.Label().set(contProductionStyle);
                                
                                var pane5 = this.createSection(this.mcvPopup, this.contProductionTitleLabel, !this.contProductionHide, "contProductionHide");
                                pane5.add(this.createHBox(this.createImage(this.tibIcon), this.contProductionLabelTiberium));
                                pane5.add(this.createHBox(this.createImage(this.cryIcon), this.contProductionLabelCrystal));
								pane5.add(this.createHBox(this.createImage(this.powIcon), this.contProductionLabelPower));
                                pane5.add(this.createHBox(this.createImage(this.creditIcon), this.contProductionLabelCredit));
////////////////////////////----------------------------------------------------------								
								 this.repairTimeTitleLabel = new qx.ui.basic.Label();
                                 this.repairTimeTitleLabel.setValue("RepairTimes");
                                
                                this.repairTimeStyle = {
                                    font: qx.bom.Font.fromString('bold').set({
                                        size: 13
                                    }),
                                    textColor: '#282828',
                                    height: 20,
                                    width: 85,
                                    textAlign: 'center',
                                    marginTop: 2,
                                    marginBottom: -2
                                };
								
								this.repairTimeLabel0 = new qx.ui.basic.Label().set(this.repairTimeStyle);
								this.repairTimeLabel1 = new qx.ui.basic.Label().set(this.repairTimeStyle);
                                this.repairTimeLabel2 = new qx.ui.basic.Label().set(this.repairTimeStyle);
                                
                                var pane6 = this.createSection(this.mcvPopup, this.repairTimeTitleLabel.set(this.repairTimeStyle), !this.rtHide, "repairHide");
                                pane6.add(this.createHBox(this.createImage(this.repairIcon), this.repairTimeLabel0));
                                pane6.add(this.createHBox(this.createImage(this.repairIcon), this.repairTimeLabel1));
								pane6.add(this.createHBox(this.createImage(this.repairIcon), this.repairTimeLabel2));
                                //pane6.add(this.createHBox(this.createImage(this.creditIcon), this.productionLabelCredit));
    ////////////////////////////----------------------------------------------------------
								 
								this.UnitCostTitleLabel = new qx.ui.basic.Label();
                                 this.UnitCostTitleLabel.setValue("OffUnitCost");
                                this.UnitCostStyle = {
                                    font: qx.bom.Font.fromString('bold').set({
                                        size: 13
                                    }),
                                    textColor: '#282828',
                                    height: 20,
                                    width: 85,
                                    textAlign: 'center',
                                    marginTop: 2,
                                    marginBottom: -2
                                };
                               
								
								this.UnitCostLabel0 = new qx.ui.basic.Label().set(this.UnitCostStyle);
								this.UnitCostLabel1 = new qx.ui.basic.Label().set(this.UnitCostStyle);
                                //this.UnitCostLabel2 = new qx.ui.basic.Label().set(this.UnitCostStyle);
                                
                                var pane7 = this.createSection(this.mcvPopup, this.UnitCostTitleLabel.set(this.UnitCostStyle), !this.costHide, "costHide");
                                pane7.add(this.createHBox(this.createImage(this.cryIcon), this.UnitCostLabel0));
                                pane7.add(this.createHBox(this.createImage(this.powIcon), this.UnitCostLabel1));
								//pane7.add(this.createHBox(this.createImage(this.repairIcon), this.UnitCostLabel2));
                                //pane6.add(this.createHBox(this.createImage(this.creditIcon), this.productionLabelCredit));
    ////////////////////////////----------------------------------------------------------
								this.DEFUnitCostTitleLabel = new qx.ui.basic.Label();
                                 this.DEFUnitCostTitleLabel.setValue("DefUnitCost");
                                
                                this.DEFUnitCostStyle = {
                                    font: qx.bom.Font.fromString('bold').set({
                                        size: 13
                                    }),
                                    textColor: '#282828',
                                    height: 20,
                                    width: 85,
                                    textAlign: 'center',
                                    marginTop: 2,
                                    marginBottom: -2
                                };
								
								this.DEFUnitCostLabel0 = new qx.ui.basic.Label().set(this.DEFUnitCostStyle);
								this.DEFUnitCostLabel1 = new qx.ui.basic.Label().set(this.DEFUnitCostStyle);
                                this.DEFUnitCostLabel2 = new qx.ui.basic.Label().set(this.DEFUnitCostStyle);
                                
                                var pane8 = this.createSection(this.mcvPopup, this.DEFUnitCostTitleLabel.set(this.DEFUnitCostStyle), !this.DEFcostHide, "DEFcostHide");
                                pane8.add(this.createHBox(this.createImage(this.tibIcon), this.DEFUnitCostLabel0));
                                pane8.add(this.createHBox(this.createImage(this.cryIcon), this.DEFUnitCostLabel1));
								pane8.add(this.createHBox(this.createImage(this.powIcon), this.DEFUnitCostLabel2));
								//pane7.add(this.createHBox(this.createImage(this.repairIcon), this.UnitCostLabel2));
                                //pane6.add(this.createHBox(this.createImage(this.creditIcon), this.productionLabelCredit));
    ////////////////////////////----------------------------------------------------------



							} catch(e) {
                                console.log("InfoSticker: createMCVPopup", e.toString());
                            }
                        },
                        currentCityChange: function() {
                            this.calculateInfoData();
                            this.repositionSticker();
                        },
                        disposeRecover: function() {
                            
                            try {
                                if(this.mcvPane.isDisposed()) {
                                    this.createMCVPane();
                                }
                                
                                if(this.mcvPopup.isDisposed()) {
                                    this.createMCVPopup();
                                    
                                    this.repositionSticker();
                                }
                                this.waitingRecovery = false;
                            } catch(e) {
                                console.log("InfoSticker: disposeRecover", e.toString());
                            }
                            
                        },
                        waitingRecovery: false,
                        citiesChange: function() {
                            try {
                                var self = this;
                                var baseListBar = this.getBaseListBar();
                                this.disposeRecover();
                                
                                if(baseListBar.indexOf(this.mcvPopup)>=0) {
                                    baseListBar.remove(this.mcvPopup);
                                    this.mcvPopup.dispose();
                                }
                                
                                if(baseListBar.indexOf(this.mcvPane)>=0) {
                                    baseListBar.remove(this.mcvPane);
                                    this.mcvPane.dispose();
                                }
                                if(!this.waitingRecovery) {
                                    this.waitingRecovery = true;
                                    window.setTimeout(function () {
                                        self.disposeRecover();
                                    }, 10);
                                }
                            } catch(e) {
                                console.log("InfoSticker: citiesChange", e.toString());
                            }
                        },
                        calculateInfoData: function () {
                            try {
                                var self = this;
                                var player = ClientLib.Data.MainData.GetInstance().get_Player();
                                var cw = player.get_Faction();
                                var cj = ClientLib.Base.Tech.GetTechIdFromTechNameAndFaction(ClientLib.Base.ETechName.Research_BaseFound, cw);
                                var cr = player.get_PlayerResearch();
                                var cd = cr.GetResearchItemFomMdbId(cj);
                                
                                var app = qx.core.Init.getApplication();
                                var b3 = app.getBaseNavigationBar().getChildren()[0].getChildren()[0];
                                if(b3.getChildren().length==0) return;
                                if (!this.infoSticker) {
                                    this.infoSticker = new qx.ui.container.Composite(new qx.ui.layout.VBox().set({
                                        alignX: "right"
                                    })).set({
                                        width: 105,
                                    });

                                    var top = 130;
                                    if (this.hasStorage) {
                                        var l = localStorage["infoSticker-locked"] == "true";
                                        if (l != null) {
                                            this.locked = l;
                                            var pl = localStorage["infoSticker-pinLock"];
                                            if(pl!=null) {
                                                try {
                                                	this.pinLockPos = parseInt(pl, 10);
                                                } catch(etm) {}
                                            }
                                        }
                                        
                                        var p = localStorage["infoSticker-pinned"];
                                        var t = localStorage["infoSticker-top"];
                                        if (p != null && t != null) {
                                            var tn;
                                            try {
                                                this.pinned = p == "true";
                                                if (this.pinned) {
                                                    tn = parseInt(t, 10);
                                                    top = tn;
                                                }
                                            } catch (etn) {}
                                        }
                                        this.mcvHide = localStorage["infoSticker-mcvHide"] == "true";
                                        this.repairHide = localStorage["infoSticker-repairHide"] == "true";
										this.rtHide = localStorage["infoSticker-repairHide"] == "true";
										this.costHide = localStorage["infoSticker-costHide"] == "true";
										this.DEFcostHide = localStorage["infoSticker-DEFcostHide"] == "true";
                                        this.resourceHide = localStorage["infoSticker-resourceHide"] == "true";
                                        this.productionHide = localStorage["infoSticker-productionHide"] == "true";
										this.contProductionHide = localStorage["infoSticker-contProductionHide"] == "true";
                                    }
                                    
                                    
                                    app.getDesktop().add(this.infoSticker, {
                                        right: 124,
                                        top: top
                                    });
                                    if(this.locked) {
                                        this.infoSticker.hide();
                                    }

                                    this.stickerBackground = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({
                                        //paddingLeft: 5,
                                        width: 105,
                                        decorator: new qx.ui.decoration.Background().set({
                                            backgroundImage: "webfrontend/ui/common/bgr_region_world_select_scaler.png",
                                            backgroundRepeat: "scale",
                                        })
                                    });
                                    
                                    this.createMCVPane();
                                    this.createMCVPopup();
									
                                    if(this.locked && this.pinned) {
                                        this.menuUpButton.setEnabled(true);
                                        this.menuDownButton.setEnabled(true);
                                    } else {
                                        this.menuUpButton.setEnabled(false);
                                        this.menuDownButton.setEnabled(false);
                                    }
                                    
                                    this.top_image = new qx.ui.basic.Image("webfrontend/ui/common/bgr_region_world_select_end.png");
                                    this.infoSticker.add(this.top_image);

                                    this.infoSticker.add(this.stickerBackground);
                                    //this.infoSticker.add(this.mcvPopup);

                                    this.bot_image = new qx.ui.basic.Image("webfrontend/ui/common/bgr_region_world_select_end.png");
                                    this.infoSticker.add(this.bot_image);

                                    this.runPositionTimer();

                                    try {
                                        this.attachEvent(ClientLib.Data.MainData.GetInstance().get_Cities(), "CurrentOwnChange", ClientLib.Data.CurrentOwnCityChange, this, this.currentCityChange);
                                        this.attachEvent(ClientLib.Data.MainData.GetInstance().get_Cities(), "Change", ClientLib.Data.CitiesChange, this, this.citiesChange);
                                    } catch(eventError) {
                                        console.log("InfoSticker.EventAttach:", eventError);
                                        console.log("The script will continue to run, but with slower response speed.");
                                    }
                                }
                                this.disposeRecover();
                                
                                if (cd == null) {
                                    if (this.mcvPopup) {
                                        //this.mcvInfoLabel.setValue("MCV ($???)");
                                        this.mcvInfoLabel.setValue("MCV<br>$???");
                                        this.mcvTimerLabel.setValue("Loading");
                                    }
                                } else {
                                    var nextLevelInfo = cd.get_NextLevelInfo_Obj();
                                    var resourcesNeeded = [];
                                    for (var i in nextLevelInfo.rr) {
                                        if (nextLevelInfo.rr[i].t > 0) {
                                            resourcesNeeded[nextLevelInfo.rr[i].t] = nextLevelInfo.rr[i].c;
                                        }
                                    }
                                    //var researchNeeded = resourcesNeeded[ClientLib.Base.EResourceType.ResearchPoints];
                                    //var currentResearchPoints = player.get_ResearchPoints();
                                    var creditsNeeded = resourcesNeeded[ClientLib.Base.EResourceType.Gold];
                                    var creditsResourceData = player.get_Credits();
                                    var creditGrowthPerHour = (creditsResourceData.Delta + creditsResourceData.ExtraBonusDelta) * ClientLib.Data.MainData.GetInstance().get_Time().get_StepsPerHour();
                                    var creditTimeLeftInHours = (creditsNeeded - player.GetCreditsCount()) / creditGrowthPerHour;
                                    this.mcvInfoLabel.setValue("MCV ($ " + this.formatNumbersCompact(creditsNeeded) + ")");
                                    //this.mcvInfoLabel.setValue("MCV<br>$" + this.formatNumbersCompact(creditsNeeded));
                                    this.mcvTimerCreditProdLabel.setValue("at " + this.formatNumbersCompact(creditGrowthPerHour*24) + "/1d");
                                    if (creditTimeLeftInHours <= 0) {
                                        this.mcvTimerLabel.setValue("Ready");
                                    } else if (creditGrowthPerHour == 0) {
                                        this.mcvTimerLabel.setValue("Never");
                                    } else {
                                        if(creditTimeLeftInHours >= 24 * 100) {
                                            this.mcvTimerLabel.setValue("> 99 days");
                                        } else {
                                            this.mcvTimerLabel.setValue(this.FormatTimespan(creditTimeLeftInHours * 60 * 60));
                                        }
                                    }
                                }

                                var ncity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
                                if (ncity == null) {
                                    if (this.mcvPopup) {
                                        this.repairTimerLabel.setValue("Select a base"); 
										this.repairTimeLabel0.setValue("Select a base");
                                        this.repairTimeLabel1.setValue("Select a base");
										this.repairTimeLabel2.setValue("Select a base");
										this.resourceLabel1.setValue("N/A");
										this.resourceLabel2.setValue("N/A");
                                        this.resourceLabel3.setValue("N/A");
										this.UnitCostLabel0.setValue("N/A");
										this.UnitCostLabel1.setValue("N/A");
                                        //this.UnitCostLabel2.setValue("N/A");
                                    }
                                } else {
								//console.log(ncity.get_CommandCenterLevel());
									
									//var HQ = ncity.GetBuildingTypeMaxLvlByTechName(ClientLib.Base.ETechName.Defense_HQ);
									//console.log(ClientLib.API.Defense.GetInstance().GetUpgradeCostsForAllUnitsToLevel(ncity.GetBuildingTypeMaxLvlByTechName(ClientLib.Base.ETechName.Defense_HQ))[0].Type, ClientLib.Base.EResourceType.Tiberium, ClientLib.Base.EResourceType.Crystal, ClientLib.Base.EResourceType.Power );
									var DEFtibCost = 0;
									var DEFcryCost = 0;
									var DEFpowCost = 0;
									var cryCost = 0;
									var powCost = 0;
									var cost = ClientLib.API.Defense.GetInstance().GetUpgradeCostsForAllUnitsToLevel(ncity.GetBuildingTypeMaxLvlByTechName(ClientLib.Base.ETechName.Defense_HQ));
									if(cost != null ){
									//console.log(ClientLib.API.Defense.GetInstance().GetUpgradeCostsForAllUnitsToLevel(ncity.GetBuildingTypeMaxLvlByTechName(ClientLib.Base.ETechName.Defense_HQ))[0].Type, ClientLib.Base.EResourceType.Tiberium, ClientLib.Base.EResourceType.Crystal, ClientLib.Base.EResourceType.Power );
										
										
										if(cost[0].Type == ClientLib.Base.EResourceType.Crystal){
										DEFcryCost = cost[0].Count;
										//DEFpowCost = cost[1].Count;
										}else if(cost[0].Type == ClientLib.Base.EResourceType.Tiberium){
										DEFtibCost = cost[0].Count;
										DEFcryCost = cost[1].Count;
										
										}
										
										if(cost[1].Type == ClientLib.Base.EResourceType.Power){
										DEFpowCost = cost[1].Count;
										}
										else if(cost[2] !== undefined && cost[2].Type == ClientLib.Base.EResourceType.Power){
										DEFpowCost = cost[2].Count;
										}
									//console.log(HQ, ClientLib.API.Defense.GetInstance().GetUpgradeCostsForAllUnitsToLevel(ncity.GetBuildingTypeMaxLvlByTechName(ClientLib.Base.ETechName.Defense_HQ)), DEFpowCost);
									this.DEFUnitCostLabel0.setValue(this.formatNumbersCompact(DEFtibCost));
									this.DEFUnitCostLabel1.setValue(this.formatNumbersCompact(DEFcryCost));
									this.DEFUnitCostLabel2.setValue(this.formatNumbersCompact(DEFpowCost));
									}else{
									this.DEFUnitCostLabel0.setValue("Upgrade");
									this.DEFUnitCostLabel1.setValue("DEF");
									this.DEFUnitCostLabel2.setValue("HQ");
									}
									if(ClientLib.API.Army.GetInstance().GetUpgradeCostsForAllUnitsToLevel(ncity.get_CommandCenterLevel()) != null){
									cryCost = ClientLib.API.Army.GetInstance().GetUpgradeCostsForAllUnitsToLevel(ncity.get_CommandCenterLevel())[0].Count;
									powCost = ClientLib.API.Army.GetInstance().GetUpgradeCostsForAllUnitsToLevel(ncity.get_CommandCenterLevel())[1].Count;
									this.UnitCostLabel0.setValue(this.formatNumbersCompact(cryCost));
									this.UnitCostLabel1.setValue(this.formatNumbersCompact(powCost));
									}else{
									this.UnitCostLabel0.setValue("Upgrade");
									this.UnitCostLabel1.setValue("CC");
									}
									
									
									
                                    var rt = Math.min(ncity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeInf),
                                    ncity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeVeh),
                                    ncity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeAir));
                                    if (ncity.get_CityUnitsData().get_UnitLimitOffense() == 0) {
                                        this.repairTimerLabel.setValue("No army");
                                    } else {
                                        this.repairTimerLabel.setValue(this.FormatTimespan(rt));
                                    }
									
									var airRT = ncity.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Aircraft, false);
									if (ncity.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Aircraft, false) == 0) {
										this.repairTimeLabel0.setValue("No birds");
                                    } else {
                                        this.repairTimeLabel0.setValue(this.FormatTimespan(airRT) + " AIR");
                                    }
									
									var vehRT = ncity.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Vehicle, false);
									if (ncity.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Vehicle, false) == 0) {
										this.repairTimeLabel1.setValue("No cars");
                                    } else {
                                        this.repairTimeLabel1.setValue(this.FormatTimespan(vehRT) + " VEH");
                                    }
									var infRT = ncity.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Infantry, false);
									if (ncity.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Infantry, false) == 0) {
										this.repairTimeLabel2.setValue("No dudes");
                                    } else {
                                        this.repairTimeLabel2.setValue(this.FormatTimespan(infRT) + " INF");
                                    }
									//this.repairTimerLabel0.setValue(this.FormatTimespan(airRT));
									//this.repairTimerLabel1.setValue(this.FormatTimespan(vehRT));
									//this.repairTimerLabel2.setValue(this.FormatTimespan(infRT));

                                    var tib = ncity.GetResourceCount(ClientLib.Base.EResourceType.Tiberium);
                                    var tibMax = ncity.GetResourceMaxStorage(ClientLib.Base.EResourceType.Tiberium);
                                    var tibRatio = tib / tibMax;
                                    this.resourceLabel1.setTextColor(this.formatNumberColor(tib, tibMax));
                                    this.resourceLabel1.setValue(this.formatNumbersCompact(tib));
                                    this.resourceLabel1per.setValue(this.formatPercent(tibRatio));

                                    var cry = ncity.GetResourceCount(ClientLib.Base.EResourceType.Crystal);
                                    var cryMax = ncity.GetResourceMaxStorage(ClientLib.Base.EResourceType.Crystal);
                                    var cryRatio = cry / cryMax;
                                    this.resourceLabel2.setTextColor(this.formatNumberColor(cry, cryMax));
                                    this.resourceLabel2.setValue(this.formatNumbersCompact(cry));
                                    this.resourceLabel2per.setValue(this.formatPercent(cryRatio));

                                    var power = ncity.GetResourceCount(ClientLib.Base.EResourceType.Power);
                                    var powerMax = ncity.GetResourceMaxStorage(ClientLib.Base.EResourceType.Power);
                                    var powerRatio = power / powerMax;
                                    this.resourceLabel3.setTextColor(this.formatNumberColor(power, powerMax));
                                    this.resourceLabel3.setValue(this.formatNumbersCompact(power));
                                    this.resourceLabel3per.setValue(this.formatPercent(powerRatio));

                                    
									var powerCont = ncity.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Power, false, false);
                                    var powerBonus = ncity.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Power);
                                    var alliance = ClientLib.Data.MainData.GetInstance().get_Alliance();
                                    var powerAlly = alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Power);
                                    var powerProd = (powerCont + powerAlly);
									var powerPac = (powerCont + powerAlly + powerBonus)*6;
									if(powerRatio >= 1){
									powerProd = 0;
									powerPac = (powerBonus)*6;
									
									}
									
									
									var tiberiumCont = ncity.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Tiberium, false, false);
                                    var tiberiumBonus = ncity.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Tiberium);
                                    //var alliance = ClientLib.Data.MainData.GetInstance().get_Alliance();
                                    var tiberiumAlly = alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Tiberium);
									var tiberiumPac = (tiberiumCont + tiberiumAlly + tiberiumBonus)*6;
									var tiberiumProd = (tiberiumCont + tiberiumAlly);
									if(tibRatio >= 1){
									tiberiumProd = 0;
									tiberiumPac = (tiberiumBonus)*6;
									
									}
									
									var crystalCont = ncity.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Crystal, false, false);
                                    var crystalBonus = ncity.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Crystal);
                                    //var alliance = ClientLib.Data.MainData.GetInstance().get_Alliance();
                                    var crystalAlly = alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Crystal);
									var crystalPac = (crystalCont + crystalAlly + crystalBonus)*6;
									var crystalProd = (crystalCont + crystalAlly);
									
									if(cryRatio >= 1){
									crystalProd = 0;
									crystalPac = (crystalBonus)*6;
									
									}
									

                                    var creditCont = ClientLib.Base.Resource.GetResourceGrowPerHour(ncity.get_CityCreditsProduction(), false);
                                    var creditBonus = ClientLib.Base.Resource.GetResourceBonusGrowPerHour(ncity.get_CityCreditsProduction(), false);
                                    var creditProd = (creditCont + creditBonus)*6;
									
									if( ncity.get_hasCooldown() == true){
									
									powerPac = (powerCont + powerAlly)*6 ;
									creditProd = (creditCont)*6;
									crystalPac = (crystalCont + crystalAlly )*6;
									tiberiumPac = (tiberiumCont + tiberiumAlly)*6;
									}

									this.productionLabelTiberium.setValue(this.formatNumbersCompact(tiberiumPac) + "/6h");
									this.productionLabelCrystal.setValue(this.formatNumbersCompact(crystalPac) + "/6h");
                                    this.productionLabelPower1.setValue(this.formatNumbersCompact(powerPac) + "/6h");
									this.productionLabelCredit.setValue(this.formatNumbersCompact(creditProd) + "/6h");
									
									this.contProductionLabelTiberium.setValue(this.formatNumbersCompact(tiberiumProd) + "/h");
									this.contProductionLabelCrystal.setValue(this.formatNumbersCompact(crystalProd) + "/h");
                                    this.contProductionLabelPower.setValue(this.formatNumbersCompact(powerProd) + "/h");
									this.contProductionLabelCredit.setValue(this.formatNumbersCompact(creditCont) + "/h");
									
									
                                }
                            } catch (e) {
                                console.log("InfoSticker.calculateInfoData", e.toString());
                            }
                        },
                        formatPercent: function (value) {
                            return value > 999 / 100 ? ">999%" : this.formatNumbersCompact(value * 100, 0) + "%";
                            //return this.formatNumbersCompact(value*100, 0) + "%";
                        },
                        formatNumberColor: function (value, max) {
                            var ratio = value / max;

                            var color;
                            var black = [40, 180, 40];
                            var yellow = [181, 181, 0];
                            var red = [187, 43, 43];

                            if (ratio < 0.5) color = black;
                            else if (ratio < 0.75) color = this.interpolateColor(black, yellow, (ratio - 0.5) / 0.25);
                            else if (ratio < 1) color = this.interpolateColor(yellow, red, (ratio - 0.75) / 0.25);
                            else color = red;

                            //console.log(qx.util.ColorUtil.rgbToHexString(color));
                            return qx.util.ColorUtil.rgbToHexString(color);
                        },
                        interpolateColor: function (color1, color2, s) {
                            //console.log("interp "+s+ " " + color1[1]+" " +color2[1]+" " +(color1[1]+s*(color2[1]-color1[1])));
                            return [Math.floor(color1[0] + s * (color2[0] - color1[0])),
                            Math.floor(color1[1] + s * (color2[1] - color1[1])),
                            Math.floor(color1[2] + s * (color2[2] - color1[2]))];
                        },
                        formatNumbersCompact: function (value, decimals) {
                            if (decimals == undefined) decimals = 2;
                            var valueStr;
                            var unit = "";
                            if (value < 1000) valueStr = value.toString();
                            else if (value < 1000 * 1000) {
                                valueStr = (value / 1000).toString();
                                unit = "k";
                            } else if (value < 1000 * 1000 * 1000) {
                                valueStr = (value / 1000000).toString();
                                unit = "M";
                            } else {
                                valueStr = (value / 1000000000).toString();
                                unit = "G";
                            }
                            if (valueStr.indexOf(".") >= 0) {
                                var whole = valueStr.substring(0, valueStr.indexOf("."));
                                if (decimals === 0) {
                                    valueStr = whole;
                                } else {
                                    var fraction = valueStr.substring(valueStr.indexOf(".") + 1);
                                    if (fraction.length > decimals) fraction = fraction.substring(0, decimals);
                                    valueStr = whole + "." + fraction;
                                }
                            }

                            valueStr = valueStr + unit;
                            return valueStr;
                        },
                        FormatTimespan: function (value) {
                            var i;
                            var t = ClientLib.Vis.VisMain.FormatTimespan(value);
                            var colonCount = 0;
                            for (i = 0; i < t.length; i++) {
                                if (t.charAt(i) == ':') colonCount++;
                            }
                            var r = "";
                            for (i = 0; i < t.length; i++) {
                                if (t.charAt(i) == ':') {
                                    if (colonCount > 2) {
                                        r += "d ";
                                    } else {
                                        r += t.charAt(i);
                                    }
                                    colonCount--;
                                } else {
                                    r += t.charAt(i);
                                }
                            }
                            return r;
                        }
                    }
                });
            }
        } catch (e) {
            console.log("InfoSticker: createInfoSticker: ", e.toString());
        }

        function InfoSticker_checkIfLoaded() {
            try {
                if (typeof qx != 'undefined' && qx.core.Init.getApplication() && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION) && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION).isVisible()) {
                    createInfoSticker();
                    window.InfoSticker.Base.getInstance().initialize();
                } else {
                    window.setTimeout(InfoSticker_checkIfLoaded, 1000);
                }
            } catch (e) {
                console.log("InfoSticker_checkIfLoaded: ", e.toString());
            }
        }
        if (/commandandconquer\.com/i.test(document.domain)) {
            window.setTimeout(InfoSticker_checkIfLoaded, 1000);
        }
    }
    try {
        var InfoStickerScript = document.createElement("script");
        InfoStickerScript.innerHTML = "(" + InfoSticker_main.toString() + ")();";
        InfoStickerScript.type = "text/javascript";
        if (/commandandconquer\.com/i.test(document.domain)) {
            document.getElementsByTagName("head")[0].appendChild(InfoStickerScript);
        }
    } catch (e) {
        console.log("InfoSticker: init error: ", e.toString());
    }
})();

/***********************************************************************************
Tiberium Alliances Formation Saver
***********************************************************************************/

// ==UserScript==
// @name           Tiberium Alliances Formation Saver
// @description    Allows you to save attack formations
// @namespace      https://prodgame*.alliances.commandandconquer.com/*/index.aspx* 
// @include        https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version        2.1.9
// @author         Panavia
// ==/UserScript==

(function (){
  var tafs_main = function() {
    var windowSaver;
      
    function initialize() {
      console.log("Formation Saver Loaded");

      qx.Class.define("webfrontend.gui.PlayArea.FormationSaver", {
        extend: qx.ui.container.Composite,

        construct:function() {
          qx.ui.container.Composite.call(this);
          this.setLayout(new qx.ui.layout.Canvas());
          this.add(this.init());
        },

        statics: {
          SaverCollapsedHeight: 32,
          SaverExpandedHeight: 245,
        },

        properties: {
          expanded: {init: true, apply: "expand"},
        },

        members: {
          buttonResize: null,
          containerContence: null,
          containerSaves: null,
          containerMain: null,
          buttonSave: null,

          init: function() {          
            var Y = 6;
            this.buttonResize = new webfrontend.ui.SoundButton(null, "FactionUI/icons/icon_tracker_minimise.png").set({width: 20, height: 20, appearance: "button-notif-cat", center: true, allowGrowX: false});
            this.buttonResize.addListener("click",function(e) {
              this.setExpanded(!this.getExpanded());
            }, this);
            var ba = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({alignY:"middle"})).set({margin:Y,marginRight:Y+3});
            ba.add(this.buttonResize);
            var labelTitle = new qx.ui.basic.Label("<b>Saver</b>");
            labelTitle.set({marginLeft: 4, rich: true});
            labelTitle.setTextColor("#FFFFFF");
            ba.add(labelTitle);
            this.containerContence = new qx.ui.container.Composite(new qx.ui.layout.VBox().set({alignX:"center"})).set({allowGrowX:true,marginTop:0,marginBottom:5});

            containerSaves = new qx.ui.container.Composite(new qx.ui.layout.Grid(10, 2)).set({allowGrowX: true , marginLeft: 0, marginBottom: 5});
            this.containerContence.add(containerSaves);

            buttonSave = new qx.ui.form.Button("Save");
            buttonSave.set({width: 50, appearance: "button-text-small", toolTipText: "Save attack formation", allowGrowX:false});
            buttonSave.addListener("click", this.save, this); 
            this.containerContence.add(buttonSave);

            this.containerMain=new qx.ui.container.Composite(new qx.ui.layout.VBox().set({alignX:"right"})).set({maxHeight:webfrontend.gui.PlayArea.FormationSaver.SaverExpandedHeight,width:75,minHeight:32,allowShrinkY:true,decorator:new qx.ui.decoration.VBox().set({baseImage:"webfrontend/ui/common/bgr_mission_tracker.png"})});
            this.containerMain.add(ba);
            this.containerMain.add(this.containerContence,{flex:1});

            return this.containerMain;
          },

          expand: function(bs) {
            if(!bs) {
              this.buttonResize.setIcon("FactionUI/icons/icon_tracker_maximise.png");
              this.containerMain.setMaxHeight(webfrontend.gui.PlayArea.FormationSaver.SaverCollapsedHeight);
            } else {
              this.buttonResize.setIcon("FactionUI/icons/icon_tracker_minimise.png");
              this.containerMain.setMaxHeight(webfrontend.gui.PlayArea.FormationSaver.SaverExpandedHeight);
            }
          },

          update: function() {
            containerSaves.removeAll();

            var playerCities = ClientLib.Data.MainData.GetInstance().get_Cities(); 
            var currentOwnCity = playerCities.get_CurrentOwnCity();
            var cityID = playerCities.get_CurrentCity().get_Id();
            var ownCityID = currentOwnCity.get_Id();

            var formations = this.loadFormations();
            if(!formations) {
              return;
            }
            if(!formations[cityID]) {
              return;
            }
            if(!formations[cityID][ownCityID]) {
              return;
            }

            var i = 0;
            for(var id in formations[cityID][ownCityID]) {
              if(id != 0) {
                i++;
                var formation = formations[cityID][ownCityID][id];
                var date = new Date(Number(formation.t));
                var toolTipText = "<div><span style='float: left'><b>" + formation.n + "</b></span><span style='float: right'>&nbsp;&nbsp;&nbsp;&nbsp;" + date.getHours() + ":" + (date.getMinutes() <= 9 ? "0" : "") + date.getMinutes() + " " + date.getDate() + "/" + (date.getMonth() + 1) + "</span></div><div style='clear: both;'></div>";
                if(formation.cy != null) {
                  toolTipText += formation.cy + "% Construction Yard</br>" + formation.df + "% Defense Facility</br>" + formation.ts + "% Troop Strength</br>" + this.formatSecondsAsTime(formation.r) + " Repair Time";
                }

                var labelLoad = new qx.ui.basic.Label(formation.n);
                labelLoad.set({width: 40, allowGrowX: false, toolTipText: toolTipText});
                labelLoad.setTextColor("#FFFFFF");
                labelLoad.addListener("click", this.clickLoad(formation), this);
                labelLoad.addListener("mouseover", this.mouseover(labelLoad, "#BBBBBB"), this);
                labelLoad.addListener("mouseout", this.mouseout(labelLoad, "#FFFFFF"), this);
                containerSaves.add(labelLoad, {row: i, column: 1});

                var labelDelete = new qx.ui.basic.Label("<b>X</b>");
                labelDelete.set({width: 10, allowGrowX:false, rich: true, toolTipText: "Delete " + formation.n});
                labelDelete.setTextColor("#881717");
                labelDelete.addListener("click", this.clickDeleteF(cityID, ownCityID, id), this);
                labelDelete.addListener("mouseover", this.mouseover(labelDelete, "#550909"), this);
                labelDelete.addListener("mouseout", this.mouseover(labelDelete, "#881717"), this);
                containerSaves.add(labelDelete, {row: i, column: 2});
              }
            }
          },

          mouseover: function(label, color) {
            return function() {
              label.setTextColor(color);
            }
          },

          mouseout: function(label, color) {
            return function() {
              label.setTextColor(color);
            }
          },

          save: function() {
            try {
              var playerCities = ClientLib.Data.MainData.GetInstance().get_Cities(); 
              var currentOwnCity = playerCities.get_CurrentOwnCity();
              var cityID = playerCities.get_CurrentCity().get_Id();
              var ownCityID = currentOwnCity.get_Id();
 
              var newFormation = new Object();
              newFormation.t = new Date().getTime().toString();
              newFormation.n = "";
              newFormation.l = new Array();

              var formation = currentOwnCity.get_CityArmyFormationsManager().GetFormationByTargetBaseId(cityID);
              var armyUnits = formation.get_ArmyUnits();
              if(armyUnits == null) {
                console.log("tafs Error: You must move a unit befor saving!");
                return;
              }
              armyUnits = armyUnits.l;
              for(var i in armyUnits)
              {
                var unit = armyUnits[i];
                newFormation.l[i] = new Object();
                newFormation.l[i].x = unit.get_CoordX();
                newFormation.l[i].y = unit.get_CoordY();
                newFormation.l[i].e = unit.get_Enabled();
              }

              var formations = this.loadFormations();
              if(!formations) {
                formations = new Object();
              }
              if(!formations[cityID]) {
                formations[cityID] = new Object();
              }
              if(!formations[cityID][ownCityID]) {
                formations[cityID][ownCityID] = new Array();
                formations[cityID][ownCityID][0] = 0;
              }
              formations[cityID][ownCityID][0]++;
              newFormation.n = "Save " + formations[cityID][ownCityID][0];
              
              formations[cityID][ownCityID].push(newFormation);
              this.saveFormations(formations);

              windowSaver.update();
            } catch(e) {
              console.log(e);
            }
          },

          clickLoad: function(newFormation) {
            return function() {
              this.load(newFormation);
            }
          },

          load: function(newFormation) {
            try {
              var playerCities = ClientLib.Data.MainData.GetInstance().get_Cities();
              var currentOwnCity = playerCities.get_CurrentOwnCity();
              var cityID = playerCities.get_CurrentCity().get_Id();
              
              var formation = currentOwnCity.get_CityArmyFormationsManager().GetFormationByTargetBaseId(cityID);
              var armyUnits = formation.get_ArmyUnits();
              if(armyUnits == null) {
                console.log("tafs Error: You must move a unit befor loading!");
                return;
              }
              armyUnits = armyUnits.l;

              for(var i in newFormation.l)
              {
                var unitData = newFormation.l[i];
                armyUnits[i].MoveBattleUnit(unitData.x, unitData.y);
                if(unitData.e != null) {
                  if(armyUnits[i].set_Enabled_Original) {
                    armyUnits[i].set_Enabled_Original(unitData.e);
                  } else {
                    armyUnits[i].set_Enabled(unitData.e);
                  }
                }
              }

              //formation.set_CurrentTargetBaseId(cityID);
            } catch(e) {
              console.log(e);
            }
          },

          clickDeleteF: function(cityID, ownCityID, id) {
            return function() {
              this.deleteF(cityID, ownCityID, id);
            }
          },

          deleteF: function(cityID, ownCityID, id) {
            var formations = this.loadFormations();
            if(!formations || !formations[cityID] || !formations[cityID][ownCityID])
              return;

            formations[cityID][ownCityID].splice(id, 1);
            if(formations[cityID][ownCityID].length <= 1) {
              delete formations[cityID][ownCityID];
            }
            var i
            for(i in formations[cityID]) {
              if(formations[cityID].hasOwnProperty(i)) {
                break;
              }
            }
            if(!i)
              delete formations[cityID];

            this.saveFormations(formations);

            windowSaver.update();
          },

          saveFormations: function(formations) {
            var data = JSON.stringify(formations);
            localStorage.formations = data;
          },

          loadFormations: function() {
            var formations = localStorage.formations;
            return formations && JSON.parse(formations);
          },
          
          formatSecondsAsTime: function(secs, format) {
            var hr = Math.floor(secs / 3600);
            var min = Math.floor((secs - (hr * 3600)) / 60);
            var sec = Math.floor(secs - (hr * 3600) - (min * 60));

            if(hr < 10) {
              hr = "0" + hr;
            }
            if(min < 10) {
              min = "0" + min;
            }
            if(sec < 10) {
              sec = "0" + sec;
            }
            
            return hr + ':' + min + ':' + sec;
          },
        }
      })
      
      windowSaver = new webfrontend.gui.PlayArea.FormationSaver();
      windowSaver.hide();
      qx.core.Init.getApplication().getPlayArea().add(windowSaver, {top: 55, right: -2});
      
      if(!ClientLib.Data.MainData.GetInstance().get_Cities().__tafs__set_CurrentOwnCityId) {
        ClientLib.Data.MainData.GetInstance().get_Cities().__tafs__set_CurrentOwnCityId = ClientLib.Data.MainData.GetInstance().get_Cities().set_CurrentOwnCityId;
      }
      ClientLib.Data.MainData.GetInstance().get_Cities().set_CurrentOwnCityId = function(a) {
        this.__tafs__set_CurrentOwnCityId(a); 
        updateView();
      }
      
      if(!ClientLib.Data.MainData.GetInstance().get_Cities().__tafs__set_CurrentCityId) {
        ClientLib.Data.MainData.GetInstance().get_Cities().__tafs__set_CurrentCityId = ClientLib.Data.MainData.GetInstance().get_Cities().set_CurrentCityId;
      }
      ClientLib.Data.MainData.GetInstance().get_Cities().set_CurrentCityId = function(a) {
        this.__tafs__set_CurrentCityId(a); 
        updateView();
      }
      
      function updateView() {
        if (PerforceChangelist >= 376877) {
          switch(qx.core.Init.getApplication().getPlayArea().getViewMode()) {
            case ClientLib.Data.PlayerAreaViewMode.pavmCombatSetupDefense:
            case ClientLib.Data.PlayerAreaViewMode.pavmCombatSetupBase:
              windowSaver.update();
              windowSaver.show();
              break;
            default:
              windowSaver.hide();
          }          
        } else {
          switch(qx.core.Init.getApplication().getPlayArea().getViewMode()) {
            case webfrontend.gui.PlayArea.PlayArea.modes.EMode_CombatSetupDefense:
            case webfrontend.gui.PlayArea.PlayArea.modes.EMode_CombatSetupBase:
              windowSaver.update();
              windowSaver.show();
              break;
            default:
              windowSaver.hide();
          }
        }
      }
    }

    function tafs_checkIfLoaded() {
      try {
        if (typeof qx != 'undefined') {
          a = qx.core.Init.getApplication(); // application
          mb = qx.core.Init.getApplication().getMenuBar();
          if (a && mb) {
            initialize();
          } else
            window.setTimeout(tafs_checkIfLoaded, 1000);
        } else {
          window.setTimeout(tafs_checkIfLoaded, 1000);
        }
      } catch (e) {
        if (typeof console != 'undefined') console.log(e);
        else if (window.opera) opera.postError(e);
        else GM_log(e);
      }
    }
    
    if (/commandandconquer\.com/i.test(document.domain)) {
      window.setTimeout(tafs_checkIfLoaded, 1000);
    }
  }

  // injecting, because there seem to be problems when creating game interface with unsafeWindow
  var tafsScript = document.createElement("script");
  tafsScript.innerHTML = "(" + tafs_main.toString() + ")();";
  tafsScript.type = "text/javascript";
  if (/commandandconquer\.com/i.test(document.domain)) {
    document.getElementsByTagName("head")[0].appendChild(tafsScript);
  }
})();


// ==UserScript==
// @name            WarChiefs - Tiberium Alliances Upgrade Base/Defense/Army
// @description     Upgrade your Base,Defense Army to a specific Level.
// @author          Eistee
// @version         13.07.20
// @namespace       http*://*.alliances.commandandconquer.com/*
// @include         http*://*.alliances.commandandconquer.com/*
// @require         http://usocheckup.redirectme.net/167564.js
// @icon            http://s3.amazonaws.com/uso_ss/icon/167564/large.png
// @updateURL       https://userscripts.org/scripts/source/167564.meta.js
// @downloadURL     https://userscripts.org/scripts/source/167564.user.js
// @grant           GM_getValue
// @grant           GM_log
// @grant           GM_openInTab
// @grant           GM_registerMenuCommand
// @grant           GM_setValue
// @grant           GM_xmlhttpRequest
// ==/UserScript==
(function () {
    var injectFunction = function () {
        function createClasses() {
            qx.Class.define("Upgrade", {
                type: "singleton",
                extend: qx.core.Object,
                construct: function () {
                    try {
                        var qxApp = qx.core.Init.getApplication();

                        var btnUpgrade = new qx.ui.form.Button(qxApp.tr("tnf:toggle upgrade mode"), "FactionUI/icons/icon_building_detail_upgrade.png").set({
                            toolTipText: qxApp.tr("tnf:toggle upgrade mode"),
                            alignY: "middle",
                            show: "icon",
                            width : 60,
                            allowGrowX : false,
                            allowGrowY : false,
                            appearance : "button"
                        });
                        btnUpgrade.addListener("click", this.toggleWindow, this);

                        var btnTrade = qx.core.Init.getApplication().getPlayArea().getHUD().getUIItem(ClientLib.Data.Missions.PATH.WDG_TRADE);
                        btnTrade.getLayoutParent().addAfter(btnUpgrade, btnTrade);
                    } catch (e) {
                        console.log("Error setting up Upgrade Constructor: ");
                        console.log(e.toString());
                    }
                },
                destruct: function () {},
                members: {
                    toggleWindow: function () {
                        if (Upgrade.Window.getInstance().isVisible()) Upgrade.Window.getInstance().close();
                        else Upgrade.Window.getInstance().open();
                    }
                }
            });
            qx.Class.define("Upgrade.Window", {
                type: "singleton",
                extend: qx.ui.window.Window,
                construct: function () {
                    try {
                        var qxApp = qx.core.Init.getApplication();
                        this.base(arguments);
                        this.set({
                            layout: new qx.ui.layout.VBox().set({ spacing: 0 }),
                            contentPadding: 5,
                            contentPaddingTop: 0,
                            allowMaximize: false,
                            showMaximize: false,
                            allowMinimize: false,
                            showMinimize: false,
                            resizable: false
                        });
                        this.moveTo(124, 31);
                        this.getChildControl("icon").set({ width : 18, height : 18, scale : true, alignY : "middle" });

                        var cntCurrent = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({ padding: 5, decorator: "pane-light-opaque" });
                        cntCurrent.add(this.titCurrent = new qx.ui.basic.Label("").set({ alignX: "center", font: "font_size_14_bold" }));
                        cntCurrent.add(this.selCurrent = new qx.ui.basic.Label("").set({ alignX: "center" }));
                        var cntCurrentHBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(5))
                        cntCurrentHBox.add(new qx.ui.basic.Label(qxApp.tr("tnf:level:")).set({ alignY: "middle" }));
                        cntCurrentHBox.add(this.txtCurrent = new qx.ui.form.Spinner(1).set({ maximum: 150, minimum: 1 }));
                        cntCurrentHBox.add(this.btnCurrent = new qx.ui.form.Button(qxApp.tr("tnf:toggle upgrade mode"), "FactionUI/icons/icon_building_detail_upgrade.png"));
                        this.txtCurrent.addListener("changeValue", this.onInputCurrent, this);
                        this.btnCurrent.addListener("execute", this.onUpgradeCurrent, this);
                        cntCurrent.add(cntCurrentHBox);
                        var cntCurrentRes = new qx.ui.container.Composite(new qx.ui.layout.HBox(5))
                        cntCurrentRes.add(new qx.ui.basic.Label(qxApp.tr("tnf:requires:")));
                        cntCurrentRes.add(this.tibCurrent = new qx.ui.basic.Atom("-", "webfrontend/ui/common/icn_res_tiberium.png"));
                        cntCurrentRes.add(this.cryCurrent = new qx.ui.basic.Atom("-", "webfrontend/ui/common/icn_res_chrystal.png"));
                        cntCurrentRes.add(this.powCurrent = new qx.ui.basic.Atom("-", "webfrontend/ui/common/icn_res_power.png"));
                        this.tibCurrent.setToolTipIcon("webfrontend/ui/common/icn_res_tiberium.png");
                        this.cryCurrent.setToolTipIcon("webfrontend/ui/common/icn_res_chrystal.png");
                        this.powCurrent.setToolTipIcon("webfrontend/ui/common/icn_res_power.png");
                        this.tibCurrent.getChildControl("icon").set({ width: 18, height: 18, scale: true, alignY: "middle" });
                        this.cryCurrent.getChildControl("icon").set({ width: 18, height: 18, scale: true, alignY: "middle" });
                        this.powCurrent.getChildControl("icon").set({ width: 18, height: 18, scale: true, alignY: "middle" });
                        cntCurrent.add(cntCurrentRes);
                        this.add(cntCurrent);

                        var cntAll = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({ padding: 5, decorator: "pane-light-opaque" });
                        cntAll.add(this.titAll = new qx.ui.basic.Label("").set({ alignX: "center", font: "font_size_14_bold" }));
                        var cntAllHBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(5))
                        cntAllHBox.add(new qx.ui.basic.Label(qxApp.tr("tnf:level:")).set({ alignY: "middle" }));
                        cntAllHBox.add(this.txtAll = new qx.ui.form.Spinner(1).set({ maximum: 150, minimum: 1 }));
                        cntAllHBox.add(this.btnAll = new qx.ui.form.Button(qxApp.tr("tnf:toggle upgrade mode"), "FactionUI/icons/icon_building_detail_upgrade.png"));
                        this.txtAll.addListener("changeValue", this.onInputAll, this);
                        this.btnAll.addListener("execute", this.onUpgradeAll, this);
                        cntAll.add(cntAllHBox);
                        var cntAllRes = new qx.ui.container.Composite(new qx.ui.layout.HBox(5))
                        cntAllRes.add(new qx.ui.basic.Label(qxApp.tr("tnf:requires:")));
                        cntAllRes.add(this.tibAll = new qx.ui.basic.Atom("-", "webfrontend/ui/common/icn_res_tiberium.png"));
                        cntAllRes.add(this.cryAll = new qx.ui.basic.Atom("-", "webfrontend/ui/common/icn_res_chrystal.png"));
                        cntAllRes.add(this.powAll = new qx.ui.basic.Atom("-", "webfrontend/ui/common/icn_res_power.png"));
                        this.tibAll.setToolTipIcon("webfrontend/ui/common/icn_res_tiberium.png");
                        this.cryAll.setToolTipIcon("webfrontend/ui/common/icn_res_chrystal.png");
                        this.powAll.setToolTipIcon("webfrontend/ui/common/icn_res_power.png");
                        this.tibAll.getChildControl("icon").set({ width: 18, height: 18, scale: true, alignY: "middle" });
                        this.cryAll.getChildControl("icon").set({ width: 18, height: 18, scale: true, alignY: "middle" });
                        this.powAll.getChildControl("icon").set({ width: 18, height: 18, scale: true, alignY: "middle" });
                        cntAll.add(cntAllRes);
                        this.add(cntAll);

                        this.addListener("appear", this.onOpen, this);
                        this.addListener("close", this.onClose, this);
                    } catch (e) {
                        console.log("Error setting up Upgrade.Window Constructor: ");
                        console.log(e.toString());
                    }
                },
                destruct: function () {},
                members: {
                    Current: null,
                    titCurrent: null,
                    selCurrent: null,
                    txtCurrent: null,
                    btnCurrent: null,
                    tibCurrent: null,
                    cryCurrent: null,
                    powCurrent: null,
                    titAll: null,
                    txtAll: null,
                    btnAll: null,
                    tibAll: null,
                    cryAll: null,
                    powAll: null,
                    onOpen: function () {
                        phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "ViewModeChange", ClientLib.Vis.ViewModeChange, this, this.onViewModeChanged);
                        phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "SelectionChange", ClientLib.Vis.SelectionChange, this, this.onSelectionChange);
                        phe.cnc.Util.attachNetEvent(ClientLib.Data.MainData.GetInstance().get_Cities(), "CurrentOwnChange", ClientLib.Data.CurrentOwnCityChange, this, this.onCurrentCityChange);
                        phe.cnc.Util.attachNetEvent(ClientLib.Data.MainData.GetInstance().get_Cities(), "CurrentChange", ClientLib.Data.CurrentCityChange, this, this.onCurrentCityChange);
                        this.onViewModeChanged(null, ClientLib.Vis.VisMain.GetInstance().get_Mode());
                    },
                    onClose: function () {
                        phe.cnc.Util.detachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "ViewModeChange", ClientLib.Vis.ViewModeChange, this, this.onViewModeChanged);
                        phe.cnc.Util.detachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "SelectionChange", ClientLib.Vis.SelectionChange, this, this.onSelectionChange);
                        phe.cnc.Util.detachNetEvent(ClientLib.Data.MainData.GetInstance().get_Cities(), "CurrentOwnChange", ClientLib.Data.CurrentOwnCityChange, this, this.onCurrentCityChange);
                        phe.cnc.Util.detachNetEvent(ClientLib.Data.MainData.GetInstance().get_Cities(), "CurrentChange", ClientLib.Data.CurrentCityChange, this, this.onCurrentCityChange);
                    },
                    onViewModeChanged: function (oldMode, newMode) {
                        if (oldMode !== newMode) {
                            var qxApp = qx.core.Init.getApplication();
                            switch (newMode) {
                            case ClientLib.Vis.Mode.City:
                                this.setCaption(qxApp.tr("tnf:toggle upgrade mode") + ": " + qxApp.tr("tnf:base"));
                                this.setIcon("FactionUI/icons/icon_arsnl_base_buildings.png");
                                this.titCurrent.setValue(qxApp.tr("Selected building"));
                                this.titAll.setValue(qxApp.tr("All buildings"));
                                this.resetAll();
                                this.resetCurrent();
                                break;
                            case ClientLib.Vis.Mode.DefenseSetup:
                                this.setCaption(qxApp.tr("tnf:toggle upgrade mode") + ": " + qxApp.tr("tnf:defense"));
                                this.setIcon("FactionUI/icons/icon_def_army_points.png");
                                this.titCurrent.setValue(qxApp.tr("Selected defense unit"));
                                this.titAll.setValue(qxApp.tr("All defense units"));
                                this.resetAll();
                                this.resetCurrent();
                                break;
                            case ClientLib.Vis.Mode.ArmySetup:
                                this.setCaption(qxApp.tr("tnf:toggle upgrade mode") + ": " + qxApp.tr("tnf:offense"));
                                this.setIcon("FactionUI/icons/icon_army_points.png");
                                this.titCurrent.setValue(qxApp.tr("Selected army unit"));
                                this.titAll.setValue(qxApp.tr("All army units"));
                                this.resetAll();
                                this.resetCurrent();
                                break;
                            default:
                                this.close();
                                break;
                            }
                        }
                    },
                    onSelectionChange: function (oldObj, newObj) {
                        if (newObj != null) {
                            switch (newObj.get_VisObjectType()) {
                            case ClientLib.Vis.VisObject.EObjectType.CityBuildingType:
                                this.Current = newObj;
                                var name = newObj.get_BuildingName();
                                var level = newObj.get_BuildingLevel();
                                this.selCurrent.setValue(name + " (" + level + ")");
                                this.txtCurrent.setMinimum(level + 1);
                                this.txtCurrent.setMaximum(level + 51);
                                this.txtCurrent.setValue(level + 1);
                                this.txtCurrent.setEnabled(true);
                                this.btnCurrent.setEnabled(true);
                                this.onInputCurrent();
                                break;
                            case ClientLib.Vis.VisObject.EObjectType.DefenseUnitType:
                            case ClientLib.Vis.VisObject.EObjectType.ArmyUnitType:
                                this.Current = newObj;
                                var name = newObj.get_UnitName();
                                var level = newObj.get_UnitLevel();
                                this.selCurrent.setValue(name + " (" + level + ")");
                                this.txtCurrent.setMinimum(level + 1);
                                this.txtCurrent.setMaximum(level + 51);
                                this.txtCurrent.setValue(level + 1);
                                this.txtCurrent.setEnabled(true);
                                this.btnCurrent.setEnabled(true);
                                this.onInputCurrent();
                                break;
                            }
                        }
                    },
                    onCurrentCityChange: function (oldObj, newObj) {
                        if (oldObj !== newObj) {
                            this.resetAll();
                            this.resetCurrent();
                        }
                    },
                    GetCurrentUpgradeCostsToLevel: function (Current, newLevel) {
                        var costs = null;
                        if (Current !== null && newLevel > 0) {
                            switch (Current.get_VisObjectType()) {
                            case ClientLib.Vis.VisObject.EObjectType.CityBuildingType:
                                if (newLevel > Current.get_BuildingLevel())
                                    costs = ClientLib.API.City.GetInstance().GetUpgradeCostsForBuildingToLevel(Current.get_BuildingDetails(), newLevel);
                                break;
                            case ClientLib.Vis.VisObject.EObjectType.DefenseUnitType:
                                if (newLevel > Current.get_UnitLevel())
                                    costs = ClientLib.API.Defense.GetInstance().GetUpgradeCostsForUnitToLevel(Current.get_UnitDetails(), newLevel);
                                break;
                            case ClientLib.Vis.VisObject.EObjectType.ArmyUnitType:
                                if (newLevel > Current.get_UnitLevel())
                                    costs = ClientLib.API.Army.GetInstance().GetUpgradeCostsForUnitToLevel(Current.get_UnitDetails(), newLevel);
                                break;
                            }
                        }
                        return costs;
                    },
                    resetCurrent: function () {
                        this.Current = null;
                        this.selCurrent.setValue("-");
                        this.txtCurrent.setMinimum(0);
                        this.txtCurrent.setMaximum(0);
                        this.txtCurrent.resetValue();
                        this.txtCurrent.setEnabled(false);
                        this.btnCurrent.setEnabled(false);
                        this.onInputCurrent();
                    },
                    onInputCurrent: function () {
                        var costs = this.GetCurrentUpgradeCostsToLevel(this.Current, parseInt(this.txtCurrent.getValue(), 10));
                        if (costs !== null) {
                            for (var i = 0, Tib = 0, Cry = 0, Pow = 0; i < costs.length; i++) {
                                var uCosts = costs[i];
                                var cType = parseInt(uCosts.Type, 10);
                                switch (cType) {
                                case ClientLib.Base.EResourceType.Tiberium:
                                    Tib += uCosts.Count;
                                    break;
                                case ClientLib.Base.EResourceType.Crystal:
                                    Cry += uCosts.Count;
                                    break;
                                case ClientLib.Base.EResourceType.Power:
                                    Pow += uCosts.Count;
                                    break;
                                }
                            }
                            this.tibCurrent.setLabel(phe.cnc.gui.util.Numbers.formatNumbersCompact(Tib));
                            this.tibCurrent.setToolTipText(phe.cnc.gui.util.Numbers.formatNumbers(Tib));
                            if (Tib === 0) this.tibCurrent.exclude();
                            else this.tibCurrent.show();
                            this.cryCurrent.setLabel(phe.cnc.gui.util.Numbers.formatNumbersCompact(Cry));
                            this.cryCurrent.setToolTipText(phe.cnc.gui.util.Numbers.formatNumbers(Cry));
                            if (Cry === 0) this.cryCurrent.exclude();
                            else this.cryCurrent.show();
                            this.powCurrent.setLabel(phe.cnc.gui.util.Numbers.formatNumbersCompact(Pow));
                            this.powCurrent.setToolTipText(phe.cnc.gui.util.Numbers.formatNumbers(Pow));
                            if (Pow === 0) this.powCurrent.exclude();
                            else this.powCurrent.show();
                        } else {
                            this.tibCurrent.setLabel("-");
                            this.tibCurrent.resetToolTipText();
                            this.tibCurrent.show();
                            this.cryCurrent.setLabel("-");
                            this.cryCurrent.resetToolTipText();
                            this.cryCurrent.show();
                            this.powCurrent.setLabel("-");
                            this.powCurrent.resetToolTipText();
                            this.powCurrent.show();
                        }
                    },
                    onUpgradeCurrent: function() {
                        var newLevel = parseInt(this.txtCurrent.getValue(), 10);
                        if (newLevel > 0 && this.Current !== null) {
                            switch (this.Current.get_VisObjectType()) {
                            case ClientLib.Vis.VisObject.EObjectType.CityBuildingType:
                                if (newLevel > this.Current.get_BuildingLevel()) {
                                    ClientLib.API.City.GetInstance().UpgradeBuildingToLevel(this.Current.get_BuildingDetails(), newLevel);
                                    this.onSelectionChange(null, this.Current);
                                }
                                break;
                            case ClientLib.Vis.VisObject.EObjectType.DefenseUnitType:
                                if (newLevel > this.Current.get_UnitLevel()) {
                                    ClientLib.API.Defense.GetInstance().UpgradeUnitToLevel(this.Current.get_UnitDetails(), newLevel);
                                    this.onSelectionChange(null, this.Current);
                                }
                                break;
                            case ClientLib.Vis.VisObject.EObjectType.ArmyUnitType:
                                if (newLevel > this.Current.get_UnitLevel()) {
                                    ClientLib.API.Army.GetInstance().UpgradeUnitToLevel(this.Current.get_UnitDetails(), newLevel);
                                    this.onSelectionChange(null, this.Current);
                                }
                                break;
                            }
                        }
                    },
                    GetAllUpgradeCostsToLevel: function (newLevel) {
                        if (newLevel > 0) {
                            switch (ClientLib.Vis.VisMain.GetInstance().get_Mode()) {
                            case ClientLib.Vis.Mode.City:
                                return ClientLib.API.City.GetInstance().GetUpgradeCostsForAllBuildingsToLevel(newLevel);
                            case ClientLib.Vis.Mode.DefenseSetup:
                                return ClientLib.API.Defense.GetInstance().GetUpgradeCostsForAllUnitsToLevel(newLevel);
                            case ClientLib.Vis.Mode.ArmySetup:
                                return ClientLib.API.Army.GetInstance().GetUpgradeCostsForAllUnitsToLevel(newLevel);
                            }
                        }
                        return null;
                    },
                    calcAllLowLevel: function () {
                        for (var newLevel = 1, Tib = 0, Cry = 0, Pow = 0; Tib === 0 && Cry === 0 && Pow === 0 && newLevel < 1000; newLevel++) {
                            var costs = this.GetAllUpgradeCostsToLevel(newLevel);
                            if (costs !== null) {
                                for (var i = 0; i < costs.length; i++) {
                                    var uCosts = costs[i];
                                    var cType = parseInt(uCosts.Type, 10);
                                    switch (cType) {
                                    case ClientLib.Base.EResourceType.Tiberium:
                                        Tib += uCosts.Count;
                                        break;
                                    case ClientLib.Base.EResourceType.Crystal:
                                        Cry += uCosts.Count;
                                        break;
                                    case ClientLib.Base.EResourceType.Power:
                                        Pow += uCosts.Count;
                                        break;
                                    }
                                }
                            }
                        }
                        return (newLevel === 1000?0:(newLevel - 1));
                    },
                    resetAll: function () {
                        var allLowLevel = this.calcAllLowLevel();
                        if (allLowLevel > 0) {
                            this.txtAll.setMinimum(allLowLevel);
                            this.txtAll.setMaximum(allLowLevel + 50);
                            this.txtAll.setValue(allLowLevel);
                            this.txtAll.setEnabled(true);
                            this.btnAll.setEnabled(true);
                        } else {
                            this.txtAll.setMinimum(0);
                            this.txtAll.setMaximum(0);
                            this.txtAll.resetValue();
                            this.txtAll.setEnabled(false);
                            this.btnAll.setEnabled(false);
                        }
                        this.onInputAll();
                    },
                    onInputAll: function () {
                        var newLevel = parseInt(this.txtAll.getValue(), 10);
                        var costs = this.GetAllUpgradeCostsToLevel(newLevel);
                        if (newLevel > 0 && costs !== null) {
                            for (var i = 0, Tib = 0, Cry = 0, Pow = 0; i < costs.length; i++) {
                                var uCosts = costs[i];
                                switch (parseInt(uCosts.Type, 10)) {
                                case ClientLib.Base.EResourceType.Tiberium:
                                    Tib += uCosts.Count;
                                    break;
                                case ClientLib.Base.EResourceType.Crystal:
                                    Cry += uCosts.Count;
                                    break;
                                case ClientLib.Base.EResourceType.Power:
                                    Pow += uCosts.Count;
                                    break;
                                }
                            }
                            this.tibAll.setLabel(phe.cnc.gui.util.Numbers.formatNumbersCompact(Tib));
                            this.tibAll.setToolTipText(phe.cnc.gui.util.Numbers.formatNumbers(Tib));
                            if (Tib === 0) this.tibAll.exclude();
                            else this.tibAll.show();
                            this.cryAll.setLabel(phe.cnc.gui.util.Numbers.formatNumbersCompact(Cry));
                            this.cryAll.setToolTipText(phe.cnc.gui.util.Numbers.formatNumbers(Cry));
                            if (Cry === 0) this.cryAll.exclude();
                            else this.cryAll.show();
                            this.powAll.setLabel(phe.cnc.gui.util.Numbers.formatNumbersCompact(Pow));
                            this.powAll.setToolTipText(phe.cnc.gui.util.Numbers.formatNumbers(Pow));
                            if (Pow === 0) this.powAll.exclude();
                            else this.powAll.show();
                        } else {
                            this.tibAll.setLabel("-");
                            this.tibAll.resetToolTipText();
                            this.tibAll.show();
                            this.cryAll.setLabel("-");
                            this.cryAll.resetToolTipText();
                            this.cryAll.show();
                            this.powAll.setLabel("-");
                            this.powAll.resetToolTipText();
                            this.powAll.show();
                        }
                    },
                    onUpgradeAll: function () {
                        var newLevel = parseInt(this.txtAll.getValue(), 10);
                        if (newLevel > 0) {
                            switch (ClientLib.Vis.VisMain.GetInstance().get_Mode()) {
                            case ClientLib.Vis.Mode.City:
                                ClientLib.API.City.GetInstance().UpgradeAllBuildingsToLevel(newLevel);
                                this.resetAll()
                                break;
                            case ClientLib.Vis.Mode.DefenseSetup:
                                ClientLib.API.Defense.GetInstance().UpgradeAllUnitsToLevel(newLevel);
                                this.resetAll()
                                break;
                            case ClientLib.Vis.Mode.ArmySetup:
                                ClientLib.API.Army.GetInstance().UpgradeAllUnitsToLevel(newLevel);
                                this.resetAll()
                                break;
                            }
                        }
                    }
                }
            });
        }
        function translation() {
            var localeManager = qx.locale.Manager.getInstance();

            // Default language is english (en)
            // Available Languages are: ar,ce,cs,da,de,en,es,fi,fr,hu,id,it,nb,nl,pl,pt,ro,ru,sk,sv,ta,tr,uk
            // You can send me translations so i can include them in the Script.

            // German
            localeManager.addTranslation("de", {
                "Selected building": "Markiertes Gebäude",
                "All buildings": "Alle Gebäude",
                "Selected defense unit": "Markierte Abwehrstellung",
                "All defense units": "Alle Abwehrstellungen",
                "Selected army unit": "Markierte Armee-Einheit",
                "All army units": "Alle Armee-Einheiten"
            });
        }
        function waitForGame() {
            try {
                if (typeof qx != 'undefined' && typeof qx.core != 'undfined' && typeof qx.core.Init != 'undefined') {
                    var app = qx.core.Init.getApplication();
                    if (app.initDone == true) {
                        try {
                            console.log("WarChiefs - Tiberium Alliances Upgrade Base/Defense/Army: Loading");
                            translation();
                            createClasses();
                            Upgrade.getInstance();
                            Upgrade.Base.getInstance();
                            Upgrade.Defense.getInstance();
                            Upgrade.Army.getInstance();
                            console.log("WarChiefs - Tiberium Alliances Upgrade Base/Defense/Army: Loaded");
                        } catch (e) {
                            console.log(e);
                        }
                    } else {
                        window.setTimeout(waitForGame, 1000);
                    }
                } else {
                    window.setTimeout(waitForGame, 1000);
                }
            } catch (e) {
                console.log(e);
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


// ==UserScript==
// @name Command & Conquer TA POIs Analyser
// @description Display alliance's POIs scores and next tier requirements.
// @namespace https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @include https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version 1.5.1
// @grant none
// @author zdoom
// @updateURL rem https://userscripts.org/scripts/source/171353.meta.js
// @downloadURL rem https://userscripts.org/scripts/source/171353.user.js
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
						this.set({label: "Alliance POIs", padding: 10});
						
						var root = this;
						
						var label = new qx.ui.basic.Label("Made by zdoom.");
							label.set({
										textColor: "text-value",
										font: "font_size_13",
										padding: 10
									 });
										
						var src = "http://archeikhmeri.co.uk/images/fop2.png";
						
						var abr = new qx.ui.basic.Label().set({ alignX: 'center', marginTop: 30, font: 'font_size_14', textColor: 'black' });
						
						var manager = qx.theme.manager.Font.getInstance();
						var defaultFont = manager.resolve(abr.getFont());
						var newFont = defaultFont.clone();
							newFont.setSize(32);
						
						abr.setFont(newFont);
						
						var deco = new qx.ui.decoration.Background();
							deco.setBackgroundImage(src);
						
						var imgCont = new qx.ui.container.Composite(new qx.ui.layout.VBox());
							imgCont.set({
								minWidth: 363,
								minHeight: 356,
								maxWidth: 363,
								maxHeight: 356,
								decorator: deco,
								alignX: 'center'
							});
						
						var scrl = new qx.ui.container.Scroll();
						
						var cont = new qx.ui.container.Composite(new qx.ui.layout.VBox());
							cont.set({allowGrowY: true, padding: 10});
						
						var gb = new qx.ui.groupbox.GroupBox("Statistics");
							gb.setLayout(new qx.ui.layout.VBox());
							gb.setMarginLeft(2);
					
						var lgb = new webfrontend.gui.GroupBoxLarge('POIs');
							lgb.setLayout(new qx.ui.layout.Canvas());
							
						var lgbc = new qx.ui.container.Composite(new qx.ui.layout.VBox());
							lgbc.setPadding(60,10,40,10);
							
						var widget = new qx.ui.core.Widget();
							widget.setMinWidth(628);
							widget.setMinHeight(335);
							
						var html = new qx.html.Element('div', null, {id: "graph"});
						
						var info = new qx.ui.groupbox.GroupBox("Additional Information");
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
						
						var coordsButton = new qx.ui.form.Button('Coords');
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
								this.pwr = {"scr": ranks[2].s, "color": "#8cc1c7", "range": range(ranks[2].s), "type": 1, "rank": ranks[2].r, "name": "Power"};
								this.tun = {"scr": ranks[3].s, "color": "#d7d49c", "range": range(ranks[3].s), "type": 2, "rank": ranks[3].r, "name": "Infantry"};
								this.urn = {"scr": ranks[4].s, "color": "#dbb476", "range": range(ranks[4].s), "type": 2, "rank": ranks[4].r, "name": "Uranium"};
								this.air = {"scr": ranks[5].s, "color": "#c47f76", "range": range(ranks[5].s), "type": 2, "rank": ranks[5].r, "name": "Aircraft"};
								this.res = {"scr": ranks[6].s, "color": "#928195", "range": range(ranks[6].s), "type": 2, "rank": ranks[6].r, "name": "Defence"};
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
						
						addRow('Tier', tier, table, 0);
						addRow('Alliance Rank', poiRank, table, 0);		
						addRow('Score', score, table);
						addRow('Next Tier Requires', nextTier, table, 0);
						addRow('Bonus', bns, table, 1);
						addRow('Next Tier Bonus', nextBns, table, 0);
						document.getElementById('graph').appendChild(table);
					}		
					
				}
			});
		}
		
		var onGameLoaded = function()
		{
			var qx = window["qx"];
			var ClientLib = window["ClientLib"];
			var webfrontend = window["webfrontend"];
			
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

// ==UserScript==
// @name        Command & Conquer TA World Map
// @description Creates a detailed map of bases and pois of the alliance and enemies.
// @namespace   https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @include     https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version     1.0.0
// @grant none
// @author zdoom
// @updateURL https://userscripts.org/scripts/source/173330.meta.js
// @downloadURL https://userscripts.org/scripts/source/173330.user.js
// ==/UserScript==

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
							
					var mapButton = new qx.ui.form.Button('Map').set({ enabled: false });
					var app = qx.core.Init.getApplication();
					var optionsBar = app.getOptionsBar().getLayoutParent();
					this.__mapButton = mapButton;
					
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
					
					
					var li1 = new qx.ui.form.ListItem('All', null, "all");
					var li2 = new qx.ui.form.ListItem('My Bases', null, "bases");
					var li3 = new qx.ui.form.ListItem('My Alliance', null, "alliance");
					var li4 = new qx.ui.form.ListItem('Selected', null, "selected");
					var displayMode = new qx.ui.form.SelectBox().set({ height: 28 });
						displayMode.add(li1);
						displayMode.add(li2);
						displayMode.add(li3);
						displayMode.add(li4);
					
					var zoomBar = new qx.ui.container.Composite(new qx.ui.layout.HBox(15));
					
					var bothOpt = new qx.ui.form.RadioButton('Both').set({ model: "both" });
					var basesOpt = new qx.ui.form.RadioButton('Base').set({ model: "bases" });;
					var poisOpt = new qx.ui.form.RadioButton('Poi').set({ model: "pois" });
					var displayOptions = new qx.ui.form.RadioButtonGroup().set({ layout: new qx.ui.layout.HBox(), font :'font_size_11' });
						displayOptions.add(bothOpt);
						displayOptions.add(basesOpt);
						displayOptions.add(poisOpt);
						
					var allianceList = new qx.ui.form.List().set({ font :'font_size_11', height: 215 });
					var editAlliance = new qx.ui.form.Button('Edit Alliances');
					var label = new qx.ui.basic.Label('Transparency');
					var slider = new qx.ui.form.Slider().set({ minimum: 30, maximum: 100, value: 100 });
					var coordsField = new qx.ui.form.TextField().set({maxWidth: 100, textAlign: 'center', readOnly: 'true', alignX: 'center'});
					var loader = new qx.ui.basic.Label().set({ marginTop: 100 });
					
					grid.set({ minWidth: 780, backgroundColor: '#8e979b', minHeight: 524, margin: 3, paddingTop: 10 });
					rightBar.set({ maxWidth: 130, minWidth: 130, paddingTop: 30, paddingRight: 10 });
					leftBar.set({ maxWidth: 130, minWidth: 130, paddingTop: 30, paddingLeft: 10 });
					
					var hints = [[zoomIn,'Zoom in'], [zoomOut,'Zoom out'], [zoomReset,'Restet zoom'], [basesOpt,'Show bases only'] , [poisOpt,'Show POIs only'], [bothOpt,'Show bases and POIs']]
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
								var pois = ['Tiberium', 'Crystal', 'Reactor', 'Tungesten', 'Uranium', 'Aircraft Guidance', 'Resonater'];
								for ( var i in selectedBase)
								{
									var txt = "", val = "";
									switch(i)
									{
										case "an": txt = "Alliance: "; val = selectedBase[i]; break;
										case "bn": txt = "Base    : "; val = selectedBase[i]; break;
										case "pn": txt = "Player  : "; val = selectedBase[i]; break;
										case "l" : txt = "Level   : "; val = selectedBase[i]; break;
										case "t" : txt = "Type    : "; val = pois[selectedBase[i] - 2]; break;
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
						caption: 'Edit Alliances'
					});
					
					this.__getAlliances();
					
					var root = this;
									
					var searchBox = new qx.ui.form.TextField().set({ placeholder: 'Search...'});
					var list = new qx.ui.form.List().set({ height: 80 });
					var editList = new qx.ui.form.List().set({ height: 160, selectionMode: 'additive' });
						
					var radioButtons = [['Enemy', 'enemy'],['Ally', 'ally'],['NAP', 'nap']];
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
						
					var addButton = new qx.ui.form.Button('Add').set({ enabled: false, width: 85, toolTipText: 'Maximum allowed number of alliances is 8.' });;
					var removeButton = new qx.ui.form.Button('Remove').set({ enabled: false, width: 85 });;
					var applyButton = new qx.ui.form.Button('Apply').set({ enabled: false });;
					var defaultsButton = new qx.ui.form.Button('Defaults').set({ enabled: false, width: 85 });;
					var saveButton = new qx.ui.form.Button('Save').set({ enabled: false, width: 85 });;
					
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
		var qx = window["qx"];
		var ClientLib = window["ClientLib"];
		var webfrontend = window["webfrontend"];
		
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
// ==UserScript==
// @name Tiberium Alliances PvP/PvE Player Info Mod
// @description Separates the number of bases destroyed into PvP and PvE in the Player Info window. Now also includes a tab showing all the POI the player is holding.
// @namespace player_info_mod
// @include https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version 1.2
// @author KRS_L
// ==/UserScript==
(function () {
	var PlayerInfoMod_main = function () {
		var playerInfoWindow = null;
		var general = null;
		var pvpScoreLabel = null;
		var pveScoreLabel = null;
		var playerName = null;
		var tabView = null;
		var tableModel = null;
		var baseCoords = null;
		var rowData = null;

		function createPlayerInfoMod() {
			try {
				console.log('Player Info Mod loaded');
				var tr = qx.locale.Manager.tr;
				playerInfoWindow = webfrontend.gui.info.PlayerInfoWindow.getInstance();
				general = playerInfoWindow.getChildren()[0].getChildren()[0].getChildren()[0].getChildren()[0].getChildren()[0].getChildren()[1].getChildren()[0];
				tabView = playerInfoWindow.getChildren()[0];
				playerName = general.getChildren()[1];

				var pvpLabel = new qx.ui.basic.Label("- PvP:");
				pvpScoreLabel = new qx.ui.basic.Label("").set({
					textColor: "text-value",
					font: "font_size_13_bold"
				});
				general.add(pvpLabel, {
					row: 3,
					column: 3
				});
				general.add(pvpScoreLabel, {
					row: 3,
					column: 4
				});

				var pveLabel = new qx.ui.basic.Label("- PvE:");
				pveScoreLabel = new qx.ui.basic.Label("").set({
					textColor: "text-value",
					font: "font_size_13_bold"
				});
				general.add(pveLabel, {
					row: 4,
					column: 3
				});
				general.add(pveScoreLabel, {
					row: 4,
					column: 4
				});

				var poiTab = new qx.ui.tabview.Page("POI");
				poiTab.setLayout(new qx.ui.layout.Canvas());
				poiTab.setPaddingTop(6);
				poiTab.setPaddingLeft(8);
				poiTab.setPaddingRight(10);
				poiTab.setPaddingBottom(8);

				tableModel = new webfrontend.data.SimpleColFormattingDataModel().set({
					caseSensitiveSorting: false
				});

				tableModel.setColumns([tr("tnf:name"), tr("tnf:lvl"), tr("tnf:points"), tr("tnf:coordinates")], ["t", "l", "s", "c"]);
				tableModel.setColFormat(3, "<div style=\"cursor:pointer;color:" + webfrontend.gui.util.BBCode.clrLink + "\">", "</div>");
				var poiTable = new webfrontend.gui.widgets.CustomTable(tableModel);
				poiTable.addListener("cellClick", centerCoords, this);

				var columnModel = poiTable.getTableColumnModel();
				columnModel.setColumnWidth(0, 250);
				columnModel.setColumnWidth(1, 80);
				columnModel.setColumnWidth(2, 120);
				columnModel.setColumnWidth(3, 120);
				columnModel.setDataCellRenderer(3, new qx.ui.table.cellrenderer.Html());
				columnModel.getDataCellRenderer(2).setUseAutoAlign(false);
				poiTable.setStatusBarVisible(false);
				poiTable.setColumnVisibilityButtonVisible(false);
				poiTab.add(poiTable, {
					left: 0,
					top: 0,
					right: 0,
					bottom: 0
				});
				tabView.add(poiTab);

				playerInfoWindow.addListener("close", onPlayerInfoWindowClose, this);
				playerName.addListener("changeValue", onPlayerChanged, this);

			} catch (e) {
				console.log("createPlayerInfoMod: ", e);
			}
		}

		function centerCoords(e) {
			try {
				var poiCoord = tableModel.getRowData(e.getRow())[3].split(":");
				if (e.getColumn() == 3) webfrontend.gui.UtilView.centerCoordinatesOnRegionViewWindow(Number(poiCoord[0]), Number(poiCoord[1]));
			} catch (e) {
				console.log("centerCoords: ", e);
			}
		}

		function onPlayerInfo(context, data) {
			try {
				pvpScoreLabel.setValue((data.bd - data.bde).toString());
				pveScoreLabel.setValue(data.bde.toString());
				var bases = data.c;
				baseCoords = new Object;
				for (var i in bases) {
					var base = bases[i];
					baseCoords[i] = new Object();
					baseCoords[i]["x"] = base.x;
					baseCoords[i]["y"] = base.y;
				}
				ClientLib.Net.CommunicationManager.GetInstance().SendSimpleCommand("GetPublicAllianceInfo", {
					id: data.a
				}, phe.cnc.Util.createEventDelegate(ClientLib.Net.CommandResult, this, onAllianceInfo), null);
			} catch (e) {
				console.log("onPlayerInfo: ", e);
			}
		}

		function onAllianceInfo(context, data) {
			try {
				rowData = [];
				var pois = data.opois;
				for (var i in pois) {
					var poi = pois[i];
					for (var j in baseCoords) {
						var distanceX = Math.abs(baseCoords[j].x - poi.x);
						var distanceY = Math.abs(baseCoords[j].y - poi.y);
						if (distanceX > 2 || distanceY > 2) continue;
						if (distanceX == 2 && distanceY == 2) continue;
						var name = phe.cnc.gui.util.Text.getPoiInfosByType(poi.t).name;
						var level = poi.l;
						var score = ClientLib.Base.PointOfInterestTypes.GetScoreByLevel(poi.l);
						var coords = phe.cnc.gui.util.Numbers.formatCoordinates(poi.x, poi.y);
						rowData.push([name, level, score, coords]);
						break;
					}
				}
				tableModel.setData(rowData);
				tableModel.sortByColumn(0, true);
			} catch (e) {
				console.log("onAllianceInfo: ", e);
			}
		}

		function onPlayerChanged() {
			try {
				if (playerName.getValue().length > 0) {
					ClientLib.Net.CommunicationManager.GetInstance().SendSimpleCommand("GetPublicPlayerInfoByName", {
						name: playerName.getValue()
					}, phe.cnc.Util.createEventDelegate(ClientLib.Net.CommandResult, this, onPlayerInfo), null);
				}
			} catch (e) {
				console.log("onPlayerChanged: ", e);
			}
		}

		function onPlayerInfoWindowClose() {
			try {
				pvpScoreLabel.setValue("");
				pveScoreLabel.setValue("");
				tableModel.setData([]);
			} catch (e) {
				console.log("onPlayerInfoWindowClose: ", e);
			}
		}

		function PlayerInfoMod_checkIfLoaded() {
			try {
				if (typeof qx !== 'undefined' && typeof qx.locale !== 'undefined' && typeof qx.locale.Manager !== 'undefined') {
					if (ClientLib.Data.MainData.GetInstance().get_Alliance().get_FirstLeaders() !== null && ClientLib.Data.MainData.GetInstance().get_Alliance().get_FirstLeaders().l.length != 0) {
						createPlayerInfoMod();
					} else {
						window.setTimeout(PlayerInfoMod_checkIfLoaded, 1000);
					}
				} else {
					window.setTimeout(PlayerInfoMod_checkIfLoaded, 1000);
				}
			} catch (e) {
				console.log("PlayerInfoMod_checkIfLoaded: ", e);
			}
		}

		if (/commandandconquer\.com/i.test(document.domain)) {
			window.setTimeout(PlayerInfoMod_checkIfLoaded, 1000);
		}
	}

	try {
		var PlayerInfoMod = document.createElement("script");
		PlayerInfoMod.innerHTML = "(" + PlayerInfoMod_main.toString() + ")();";
		PlayerInfoMod.type = "text/javascript";
		if (/commandandconquer\.com/i.test(document.domain)) {
			document.getElementsByTagName("head")[0].appendChild(PlayerInfoMod);
		}
	} catch (e) {
		console.log("PlayerInfoMod: init error: ", e);
	}
})();
// ==UserScript==
// @name          CnC: Tiberium Alliances Available Loot Summary + Info Ver 2.0
// @description   CROSS SERVERS Loot & troops & bases & distance info.
// @version       2.04
// @author        MrHIDEn (in game: PEEU) based on Yaeger & Panavia code.
// @namespace     MHTools.Loot
// @include       http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @grant         none
// @downloadURL   https://userscripts.org/scripts/source/160800.user.js
// @updateURL     https://userscripts.org/scripts/source/160800.meta.js
// ==/UserScript==
(function () {
  var MHLootMain = function () {    
    function MHToolsLootCreate() {        
      //console.log('MHToolsLootCreate');
      // Classes
      //=======================================================      
      //Extending webfrontend.gui.options.OptionsPage with new ManagementOptionsPage
      function OptionsPage() {
        try {
          qx.Class.define("MHTools.OptionsPage", {
            type: 'singleton',
            extend: webfrontend.gui.options.OptionsPage,
            construct: function() {
              console.log('Create MHTools.OptionsPage at Loot+Info');
              this.base(arguments);
              this.setLabel('MHTools');
              
              this.extendOptionsWindow();
              
              //Add Content
              var container = this.getContentContainer(); 
              this.tabView = new qx.ui.tabview.TabView();
              container.add(this.tabView);//, {left:40, top:40});
              
              this.removeButtons();
              this.addPageAbout();
              console.log('MHTools: OptionsPage loaded.'); 
            },
            statics: {
              VERSION: '1.0.0',
              AUTHOR: 'MrHIDEn',
              CLASS: 'OptionsPage'
            },
            members: {
              pageCreated: null,
              tabView: null,
              getTabView: function() {
                return this.tabView;
              },
              addPage: function(name) {
                var c = this.tabView.getChildren();
                this.tabView.remove(c[c.length-1]);//remove PageAbout
                var page = new qx.ui.tabview.Page(name);
                page.set({height:220});
                this.tabView.add(page);
                this.addPageAbout();
                return page;
              },
              addPageAbout: function() {
                var page = new qx.ui.tabview.Page("About");
                page.set({height:220});
                this.tabView.add(page);
                page.setLayout(new qx.ui.layout.VBox());
                page.add(new qx.ui.basic.Label("<b>MHTools</b>").set({rich: true}));//, textColor: red
                page.add(new qx.ui.basic.Label("Created: <span style='color:blue'>2012</span>").set({rich: true,marginLeft:10}));
                page.add(new qx.ui.basic.Label("Author: <span style='color:blue'><b>MrHIDEn</b></span>").set({rich: true,marginLeft:10}));
                page.add(new qx.ui.basic.Label("Email: <a href='mailto:mrhiden@outlook.com'>mrhiden@outlook.com</a>").set({rich: true,marginLeft:10}));
                page.add(new qx.ui.basic.Label("Public: <a href='https://userscripts.org/users/471241'>userscripts.org - MrHIDEn</a></br> ").set({rich: true,marginLeft:10}));
                page.add(new qx.ui.basic.Label("<b>Scripts:</b>").set({rich: true,marginTop:5}));
                page.add(new qx.ui.basic.Label("<a href='https://userscripts.org/scripts/show/137978'>Aviable Loot +Info</a>").set({rich: true,marginLeft:10}));
                page.add(new qx.ui.basic.Label("<a href='https://userscripts.org/scripts/show/135806'>Shortcuts +Coords</a>").set({rich: true,marginLeft:10}));
                page.add(new qx.ui.basic.Label("<b>Shorten Scripts:</b>").set({rich: true,marginTop:5}));
                page.add(new qx.ui.basic.Label("<a href='https://userscripts.org/scripts/show/136743'>Coords 500:500</a>").set({rich: true,marginLeft:10}));
                page.add(new qx.ui.basic.Label("<a href='https://userscripts.org/scripts/show/145657'>Pure Loot summary</a>").set({rich: true,marginLeft:10}));
                page.add(new qx.ui.basic.Label("<a href='https://userscripts.org/scripts/show/137955'>Login x9 + Logout</a>").set({rich: true,marginLeft:10}));
              },
              removeButtons: function() {
                this.getChildren()[2].removeAll();
              },
              getContentContainer: function() {
                  if(!this.contentCnt) {
                      this.contentCnt = this.getChildren()[0].getChildren()[0];
                  }
                  return this.contentCnt;
              },
              extendOptionsWindow: function() {
                var self = this;
                if(!webfrontend.gui.options.OptionsWidget.prototype.baseShow) {
                  webfrontend.gui.options.OptionsWidget.prototype.baseShow = webfrontend.gui.options.OptionsWidget.prototype.show;
                }
                webfrontend.gui.options.OptionsWidget.prototype.show = function() {
                  try {
                    var tabView = this.clientArea.getChildren()[0];
                    tabView.add(self);
                    webfrontend.gui.options.OptionsWidget.prototype.show = webfrontend.gui.options.OptionsWidget.prototype.baseShow;
                    self.pageCreated = true;
                    this.show();
                  } catch (e) {            
                    console.warn("MHTools.OptionsPage.extendOptionsWindow: ", e);
                  }
                };
              }
            }
          });
        } catch (e) {
          console.warn("qx.Class.define(MHTools.OptionsPage: ", e);      
        }
      }
      //=======================================================  
      try {
        qx.Class.define("MHTools.Loot", {
          type: 'singleton',
          extend: qx.core.Object,
          construct: function() {         
            //console.log('Create MHTools.Loot');
            this.stats.src = 'http://goo.gl/IDap9';//2.0.x
            var version = MHTools.Loot.VERSION.toString();
            //this.base(arguments);
            for(var k in this.resPaths) {
              this.resImages.push(new qx.ui.basic.Image("webfrontend/ui/common/"+this.resPaths[k]).set({Scale:true,Width:16,Height:16}));
            }
            for(var k in this.troopPaths) {
              this.troopImages.push(new qx.ui.basic.Image("https://eaassets-a.akamaihd.net/cncalliancesgame/cdn/data/"+this.troopPaths[k]).set({Scale:true,Width:16,Height:16}));
            }
            // reload bases stored in browser
            //this.lootList.reloadList();
            function Types(o) {
              var a = [];
              for(var k in o) a[o[k]] = k;
              return a;
            }             
            this.LObjectType = Types(ClientLib.Vis.VisObject.EObjectType);
            this.LViewMode = Types(ClientLib.Vis.Mode);
            
            // window
            this.Self = this;
            var backColor = '#eef';
            var region = ClientLib.Vis.VisMain.GetInstance().get_Region();
            var viewW = region.get_ViewWidth();
            this.win = (new qx.ui.window.Window("Loot "+version));
            this.win.set({
              width:350,
              showMinimize:false,
              showMaximize:false,
              showClose:true,
              contentPadding: 6,
              allowClose:true,
              resizable:false,                  
              toolTipText: "MrHIDEn tool - Loot "+version
            });
            //http://demo.qooxdoo.org/2.0.2/apiviewer/#qx.ui.mobile.core.Widget~dblclick!event
            //mouseover
            //qx.event.Timer.once(fun,obj,time)
            /*NOTE
            MHTools.Loot.getInstance().win.toggleActive();
            MHTools.Loot.getInstance().win.setUseMoveFrame(1)
            MHTools.Loot.getInstance().win.moveTo(100,100);
            MHTools.Loot.getInstance().win.setLayoutProperties({left:200,top:100});
            lp=MHTools.Loot.getInstance().win.getLayoutProperties();
            //Object { left=586, top=112}
            */
            this.win.addListener("mouseover",function(e) {
                //this.extTimer.stop();
                //this.win.close(); 
            },this);
            this.win.addListener("move", function(e) {
              console.log('win MOVE');
              var pos = {left:e.getData().left, top:e.getData().top};
              if(pos!==null) {
                var S = ClientLib.Base.LocalStorage;
                if (S.get_IsSupported()) S.SetItem(this.classname+".winpos", pos);
              }
            }, this);
            this.win.addListener("click",function(e) {
                //webfrontend.gui.UtilView.centerCoordinatesOnRegionViewWindow(this.Data.Selected.X,this.Data.Selected.Y);
            },this);
            this.win.addListener("dblclick",function(e) {
                this.extTimer.stop();
                this.win.close(); 
            },this);
            this.win.addListener("close",function(e) {
                this.extTimer.stop();
                //this.win.close(); 
            },this);
            this.win.addListener("minimize",function(e) {
              if(this.extMinimized) {
                this.extMinimized = false;
                this.extPrint();
              }
              else {
                this.extMinimized = true;                
                this.win.removeAll();
              }
              this.win.restore();//trick
            },this);
            var pos = {left:(viewW-10-this.win.getWidth()), top:35};
            var S = ClientLib.Base.LocalStorage;
            if (S.get_IsSupported()) {
              var posSaved = S.GetItem(this.classname+".winpos");
              if(posSaved!==null) {
                pos = posSaved;
              }
            }
            this.win.moveTo(pos.left, pos.top);
            var winLayout = new qx.ui.layout.Grid(5,5);
            this.win.setLayout(winLayout);
            this.win.setTextColor('yellow');   
            
            //this.extTimer = new qx.event.Timer.once(this.extOnTimer,this,500);
            this.extTimer = new qx.event.Timer(1000);
            this.extTimer.addListener("interval",this.extOnTimer,this);
            
            this.extendSelectionChange();
            this.extendViewModeChange();
            //options
            this.addLootPage();
            //bypass
            this.loadBypass();
            //rdy
            console.log('MHTools: Loot+Info '+version+' loaded.');
          },
          statics : {
            VERSION: 2.04,
            AUTHOR: 'MrHIDEn',
            CLASS: 'Loot',
            DATA: this.Data,
            LOOTLIST: this.lootList
          },
          members : {
            Self: null,
            win: null,
            extStoreName: this.classname,
            extItems: [],
            extMinimized: false,
            extTimer: null,
            extAdd: function(l,p) {
              this.extItems.push(l,p);
            },
            extPrint: function(type) {            
              this.win.removeAll();
              if(!this.extMinimized) {
                for(var i=0;i<this.extItems.length;i+=2) {
                  this.win.add(this.extItems[i],this.extItems[i+1]);
                }
              }
              this.win.open();
            },
            extOnTimer: function() {
              //console.log('extOnTimer');
              this.onSelectionChange('Timer');
              this.extPrint();
            },
            // setttings
            settings: {
              showLoot:                {v:true,  d:true,  l:'Shows Loot resources info'},
              showTroops:              {v:false, d:false, l:'Shows overall Hitpoints for Troops'},
              showTroopsExtra:         {v:false, d:false, l:'Shows Troops Hitpoints for Vehicles/Aircrafts/Infantry'},
              showInfo:                {v:true,  d:true,  l:'Shows HP/HC/DF/CY info'},
              showColumnCondition:     {v:false, d:false, l:'Shows your progress against DF/CY'},
              showRepairTime:          {v:true,  d:true,  l:'Shows Repair Times info for Enemy Base/Camp/Outpost'},
              showAllyRepairTimeInfo:  {v:true,  d:true,  l:'Shows Ally/Your Repair Times info'},
              showLevels:              {v:true,  d:true,  l:'Shows Levels of Base/Defence/Offence info'},
              showColumnLetter:        {v:false, d:false, l:'Shows columns letters for DF/CY position Ex A-1 or E-4. If \'false\' shows only 1 or 4'},
              showDistance:            {v:true,  d:true,  l:'Shows distance from selected base to the selected object'}
              //,showMeasure:             {v:true,  d:true,  l:'Shows distance from locked object to the selected object'}
            },
            // pictures
            stats: document.createElement('img'),
            resPaths: [
              "icn_res_research_mission.png",
              "icn_res_tiberium.png",
              "icn_res_chrystal.png",
              "icn_res_dollar.png"
            ],
            resImages: [],
            troopPaths: [
              "d8d4e71d9de051135a7f5baf1f799d77.png",//inf
              "af8d7527e441e1721ee8953d73287e9e.png",//veh
              "5f889719f06aad76f06d51863f8eb524.png",//stu
              "6962b667bd797fc2e9e74267e1b3e7c3.png" //air
            ],
            troopImages: [],
            // store v3
            lootList: {
              storeName: 'MHToolsLootList3',
              list: {
                d: {},
                c: 0
              },
              exist: function(xy) {
                return typeof(this.list.d[xy])=="object";
              },
              save: function(xy,d) {//in use
                //console.info("lootList.save");
                try {
                  if(xy<0) return;
                  //id could be not actual after some patch
                  var fprint = false;
                  var id = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId();
                  if(!this.exist(xy)) {//new item
                    this.list.c++;
                    fprint = true;
                  }
                  this.list.d[xy] = {id:id, Data:d, xy:xy};
                  //if(fprint) console.dir(this.list.d);
                  // JSON - disabled
                  //var S = ClientLib.Base.LocalStorage;
                  //if (S.get_IsSupported()) S.SetItem(this.storeName, this.list);  
                } catch (e) {
                  console.warn("lootList.save: ", e);
                }
              },
              load: function(xy) {//in use
                //console.info("lootList.load");
                try {
                  if(xy<0) return {id:id,Data:{}};
                  var id = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId();
                  if(this.exist(xy)) return this.list.d[xy];
                  return {id:id,Data:{}};     
                } catch (e) {
                  console.warn("lootList.load: ", e);
                }
              },
              store: function(xy, k, d) {//in use
                //console.info("lootList.store key:",k);
                try {
                  var mem = this.load(xy).Data;
                  mem[k] = d;
                  this.save(xy,mem);        
                } catch (e) {
                  console.warn("lootList.store: ", e);
                }
              },
              restore: function(xy,k) {//?? NOT in use
                //console.info("lootList.restore");
                try {
                  var mem = this.load(xy).Data;
                  if(typeof(mem[k])=='undefined') return 'undefined';
                  return mem[k];    
                } catch (e) {
                  console.warn("lootList.restore: ", e);
                }
              }              
            },            
            // bases
            Data: {
              lastSelectedBaseId: -1,
              selectedBaseId: -1
            },
            // display containers
            lootWindowPlayer: null,
            lootWindowBase: null,
            lootWindowCamp: null,
            lootWindowOwn: null,
            lootWindowAlly: null,
            lootWindowPOI: null,
            lootWindowRUIN: null,
            lootWindowHUBServer: null,          
            waiting: [1,'0','_','1','_','2','_','3','_','4','_','5','_','6','_','7','_','8','_','9','_'],          
            Display: {
              troopsArray: [],
              lootArray: [],
              iconArrays: [],
              infoArrays: [],
              twoLineInfoArrays: [],
              distanceArray: []
            },
            LObjectType: [],
            LViewMode: [],
            viewMode: 0,//"None"
            // HELPERS
            kMG: function(v) {
              var t = [ '', 'k', 'M', 'G', 'T', 'P' ];
              var i = 0;
              while (v > 1000 && i < t.length) {
                v = (v / 1000).toFixed(1);
                i++;
              }
              return v.toString().replace('.',',') + t[i];
            },
            numberFormat: function(val,fixed) {
              return val.toFixed(fixed).replace('.',',');
            },
            hms: function(s) {
              var h = Math.floor(s/3600); s%=3600;
              var m = Math.floor(s/60); s%=60;
              var r = (h<10?"0"+h.toString():h.toString()) + ":";
              r += (m<10?"0"+m.toString():m.toString()) + ":";
              s = s.toFixed(0);
              r += (s<10?"0"+s.toString():s.toString());
              return r;
            },
            dhms: function(s) {
              var d = Math.floor(s/86400); s%=86400;
              var h = Math.floor(s/3600); s%=3600;
              var m = Math.floor(s/60); s%=60;
              var r = (d<1?"":d.toString() + ":");
              r += (h<10?"0"+h.toString():h.toString()) + ":";
              r += (m<10?"0"+m.toString():m.toString()) + ":";
              s = s.toFixed(0);
              r += (s<10?"0"+s.toString():s.toString());
              return r;
            },
            dhms2: function(s) {
              var d = Math.floor(s/86400); s%=86400;
              var h = Math.floor(s/3600); s%=3600;
              var m = Math.floor(s/60); s%=60;
              var r = (d<1?"":d.toString() + "d ");//  3:01:23:45
              r += (h<10?"0"+h.toString():h.toString()) + ":";
              r += (m<10?"0"+m.toString():m.toString()) + ":";
              s = s.toFixed(0);
              r += (s<10?"0"+s.toString():s.toString()) + "";
              return r;
            },
            hmsRT: function(city, type) {
              var nextLevelFlag = false;
              var s = city.get_CityUnitsData().GetRepairTimeFromEUnitGroup(type, nextLevelFlag);
              var h = Math.floor(s/3600); s%=3600;
              var m = Math.floor(s/60); s%=60;
              var r = (h<10?"0"+h.toString():h.toString()) + ":";
              r += (m<10?"0"+m.toString():m.toString()) + ":";
              r += (s<10?"0"+s.toString():s.toString());
              return r;
            },
            // BYPASS
            getBypass: function(c,d) {
              try {
                function getKeys(obj, d) {
                  for (var k in obj) {
                    var o = obj[k];
                    if (o === null) continue;
                    if (typeof(o.c) == 'undefined') continue;//count
                    if (o.c === 0) continue;//empty
                    if (typeof(o.d) == 'undefined') continue;//data {}
                    var ks = Object.keys(o.d);
                    if (ks.length != o.c) continue;
                    var u = o.d[ks[0]];
                    if(typeof(u) != 'object') continue;                  
                    if(typeof(u.get_UnitLevelRepairRequirements) != 'function') continue;
                    if(typeof(u.GetUnitGroupType) ==  'undefined') {
                      // buildings
                      d.Keys.Buildings = k;
                      //c.GetNumBuildings.toString()==return this.XUQAIB.YYZSYN().c; //YYZSYN()==return this.GBZDQJ; //==this.XUQAIB.GBZDQJ.c
                    } else {
                      // units 3-attack
                      if(u.GetUnitGroupType()) {
                        d.Keys.Offences = k;
                      } else {
                        // units 0-defend
                        d.Keys.Defences = k;
                      }
                    }
                  }
                  if(typeof(d.Keys.Buildings)!='undefined') {
                    ClientLib.Data.City.prototype.kBuildings = d.Keys.Buildings;
                    ClientLib.Data.City.prototype.get_Buildings = function(){return this.get_CityBuildingsData()[this.kBuildings];};
                  }
                  if(typeof(d.Keys.Offences)!='undefined') {
                    ClientLib.Data.City.prototype.kOffenseUnits = d.Keys.Offences;
                    ClientLib.Data.City.prototype.get_OffenseUnits = function(){return this.get_CityUnitsData()[this.kOffenseUnits];};
                  }
                  if(typeof(d.Keys.Defences)!='undefined') {
                    ClientLib.Data.City.prototype.kDefenseUnits = d.Keys.Defences;
                    ClientLib.Data.City.prototype.get_DefenseUnits = function(){return this.get_CityUnitsData()[this.kDefenseUnits];};
                  }
                }
                if(typeof(d.Keys)=='undefined') d.Keys={};
                getKeys(c.get_CityBuildingsData(), d);
                getKeys(c.get_CityUnitsData(), d);
                var cnt=Object.keys(d.Keys).length;
                if(cnt==3) {
                  console.log('MHTools.Loot Helpers are ready:');
                  console.log(d.Keys);
                  delete d.Keys;
                  this.getBypass = function(){return true;};
                  return true;
                }
                else console.log('#Keys(!=3): ',cnt);
              } catch (e) {
                console.warn("MHTools.Loot.",arguments.callee.name,': ', e);
              }
              //return d.Bypass.Rdy;
              return false;
            },
            loadBypass: function(self) {
              try {                
                if(typeof(self)=='undefined') self = this;
                var ac=ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d;
                if(Object.keys(ac).length<1) {
                  window.setTimeout(self.loadBypass, 5000, self); // check again
                  return;
                }
                for(k in ac) if(self.getBypass(ac[k],self.Data)) break;
              } catch (e) {
                console.warn("MHTools.Loot.",arguments.callee.name,': ', e);
              }
            },
            getData: function(city) {
              try {   
                var l = {};  
                if(!this.getBypass(city,this.Data)) return l;
                
                l.Buildings = city.get_Buildings();
                l.Defences = city.get_DefenseUnits();
                l.Offences = city.get_OffenseUnits();
                
                l.rdy = true;              
              } catch (e) {
                console.warn("MHTools.Loot.",arguments.callee.name,': ', e);
              }               
              return l;
            },
            loadBase: function() { 
              try {
                //if (typeof(this.Data.lastSelectedBaseId)=='undefined') this.Data.lastSelectedBaseId = -1;//, Bypass: {}};
                
                var d = this.Data;    
                //console.info("loot.loadBase.lastID:",d.lastSelectedBaseId);      
                            
                d.selectedBaseId = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId();
                d.selectedOwnBaseId = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCityId();
                
                if (d.lastSelectedBaseId !== d.selectedBaseId) d.loaded = false;
                
                d.IsOwnBase = d.selectedBaseId === d.selectedOwnBaseId;
                            
                d.cc = ClientLib.Data.MainData.GetInstance().get_Cities();
                
                //d.ec = d.cc.GetCity(d.selectedBaseId);// this is very nice function
                d.ec = d.cc.get_CurrentCity();
                if(d.ec === null) return false;
                if(d.ec.get_CityBuildingsData() === null) return false;         
                if(d.ec.get_CityUnitsData() === null) return false;         
                
                d.oc = d.cc.get_CurrentOwnCity();            
                if(d.oc === null) return false;
                if(d.oc.get_CityBuildingsData() === null) return false;
                if(d.oc.get_CityUnitsData() === null) return false;
                
                d.ol = this.getData(d.oc);
                d.el = this.getData(d.ec);// Buildings Defence Offence               
                if(typeof(d.ol)=='undefined') return false;
                if(typeof(d.el)=='undefined') return false;

                if(d.el.Buildings.c === 0) return false;
                if(d.ol.Buildings.c === 0) return false;                 
                 
                //console.info("loot.loadBase.ID:",d.selectedBaseId); 
                d.lastSelectedBaseId = d.selectedBaseId; 
                d.loaded = true;
                return true;
              } catch (e) {
                console.warn("MHTools.Loot.",arguments.callee.name,': ', e);
                console.dir("MHTools.Loot.Data: ",this.Data);
                return false;
              }
            },
            getImportants: function(list) {         
              list.Support = {Condition: '-',Row: '-',Column: '-'};
              list.CY = {Condition: '-',Row: '-',Column: '-'};
              list.DF = {Condition: '-',Row: '-',Column: '-'};
              if(!this.settings.showInfo.v) return;
              for (var j in list.Buildings.d) {
                var building = list.Buildings.d[j];
                var mod = building.get_HitpointsPercent();
                var id = building.get_MdbUnitId();
                if(id >= 200 && id <= 205) {
                  list.Support.Condition = 100*mod;
                  list.Support.Row = 8-parseInt(building.get_CoordY());
                  list.Support.Column = building.get_CoordX();
                } 
                else {
                  switch (id) {
                    case 112: // CONSTRUCTION YARD
                    case 151:
                    case 177:
                      list.CY.Condition = 100*mod;
                      list.CY.Row = 8-parseInt(building.get_CoordY());
                      list.CY.Column = building.get_CoordX();
                      break;
                    case 158: // DEFENSE FACILITY
                    case 131:
                    case 195:
                      list.DF.Condition = 100*mod;
                      list.DF.Row = 8-parseInt(building.get_CoordY());
                      list.DF.Column = building.get_CoordX();
                      break;
                    default:
                      break;
                  }
                }
              }
            },
            getLoots: function (ul,r) { 
              if(typeof(r)=='undefined') r={}; 
              //console.log('r',r);
              var t={1:'T',2:'C',3:'G',6:'RP',7:'RCB',8:'RCA',9:'RCI',10:'RCV'};//translate, ClientLib.Base.EResourceType.XXX
              for (var j in ul.d) {
                var u = ul.d[j];// unit/building
                //here are key infos about units ranges and behavior and more 
                //console.log(u.get_UnitGameData_Obj().n,u.get_UnitGameData_Obj());// unit/building
                var p = u.get_HitpointsPercent();// 0-1 , 1 means 100%               
                var cl = u.get_UnitLevelRepairRequirements();// EA API Resources/Repair Costs                
                for (var i in cl) {
                  var c = cl[i];//Requirement/Cost
                  if(typeof(c)!='object') continue;                
                  var k = (typeof(t[c.Type])=='undefined')?c.Type:t[c.Type];//translate if possible
                  if(typeof(r[k])=='undefined') r[k] = 0;//add branch
                  r[k] += p * c.Count;                 
                }
              }
              return r;
            },
            //NEW API for LOOTS
            getLoots2: function (r) {
              r = r || {};
              var t={1:'T',2:'C',3:'G',6:'RP',7:'RCB',8:'RCA',9:'RCI',10:'RCV'};
              var l=ClientLib.API.Battleground.GetInstance().GetLootFromCurrentCity();     
              for (var i in l) {
                var c = l[i];//Requirement/Cost
                if(typeof(c)!='object') continue;                
                var k = (typeof(t[c.Type])=='undefined')?c.Type:t[c.Type];//translate if possible
                if(typeof(r[k])=='undefined') r[k] = 0;//add branch
                r[k] += c.Count;                 
              }
              return r;
            },
            calcResources: function (xy) {
              //console.info("loot.calcResources"); 
              try {          
                if (!this.settings.showLoot.v) return;

                //console.log('Test getLoots2',this.getLoots2());
                if (!this.Data.loaded) return;
                //console.log('this.Data.loaded');
                
                this.Display.lootArray = [];            
                
                var el = this.Data.el;
                var ec = this.Data.ec;
                
                // NEW
                // ClientLib.API.Battleground.GetInstance().GetLootFromCurrentCity()
                var loots2 = this.getLoots2();              
                
                var loots = {RP:0, T:0, C:0, G:0};//for getLoots                
                
                this.getLoots(el.Buildings,loots);
                this.getLoots(el.Defences,loots);
                
                if(el.Offences.c>0) {
                  var off = this.getLoots(el.Offences);                  
                  //console.log('Offences: ',off);
                }
                
                this.Display.lootArray[0] = loots.RP;
                this.Display.lootArray[1] = loots.T;
                this.Display.lootArray[2] = loots.C;
                this.Display.lootArray[3] = loots.G;
                            
                this.lootList.store(xy,'lootArray',this.Display.lootArray);
              } catch (e) {
                console.warn("MHTools.Loot.calcResources: ", e);
                console.dir("MHTools.Loot.~.Data:",this.Data);
              }
            },
            calcTroops: function (xy) {
              //console.info("loot.calcTroops"); 
              try {
                if (!this.settings.showTroops.v) return;            

                if (!this.Data.loaded) return;            
                
                var troops = [0, 0, 0, 0, 0]; 
                
                var el = this.Data.el; 
                  
                // enemy defence units
                for (var j in el.Defences.d) {
                  var unit = el.Defences.d[j];
                  var h = unit.get_Health();//EA API
                  troops[0] += h;
                  if (this.settings.showTroopsExtra.v) {
                    switch (unit.get_UnitGameData_Obj().mt) {//keyTroop // TODO check .mt
                      case ClientLib.Base.EUnitMovementType.Feet:
                        troops[1] += h;
                        break;
                      case ClientLib.Base.EUnitMovementType.Track:
                      case ClientLib.Base.EUnitMovementType.Wheel:
                        troops[2] += h;
                        break;
                      case ClientLib.Base.EUnitMovementType.Structure:
                        troops[3] += h;
                        break;
                      case ClientLib.Base.EUnitMovementType.Air:
                      case ClientLib.Base.EUnitMovementType.Air2:
                        troops[4] += h;
                        break;
                    }
                  }
                }
                this.Display.troopsArray = troops;
                this.lootList.store(xy,'troopsArray',this.Display.troopsArray);
              } catch (e) {
                console.warn("MHTools.Loot.calcTroops: ", e);
                console.dir("MHTools.Loot.~.Data:",this.Data);
              }
            },
            calcInfo: function (xy) { 
              //console.info("loot.calcInfo"); 
              this.Display.infoArrays = [];
              this.Display.twoLineInfoArrays = [];
              
              if (!this.Data.loaded) return;
              
              var hp;
              var t;         
              
              //var cc = this.Data.cc;
              var oc = this.Data.oc;
              var ec = this.Data.ec; 
              
              var ol = this.Data.ol;
              var el = this.Data.el; 
              
              if(this.settings.showInfo.v) { 
                try {                   
                  var ohp=0, dhp=0;
                  for (var k in ol.Offences.d) ohp += ol.Offences.d[k].get_Health();//own of units
                  for (var k in el.Defences.d) dhp += el.Defences.d[k].get_Health();//ene df units
                                  
                  // find CY & DF row/line
                  this.getImportants(el);
                  
                  hp = {};
                  hp.name = '<b>Info</b> (HP,HC - D/O ratio. Row.)';
                  hp.lbs = ['HP:','HC:','DF:','CY:'];
                  t = [];
                  t.push(this.numberFormat(dhp/ohp, 2));
                  t.push(this.numberFormat(ec.get_TotalDefenseHeadCount()/oc.get_TotalOffenseHeadCount(), 2));
                  var abc = "ABCDEFGHI";//abc[column]
                  if(this.settings.showColumnLetter.v) {
                    if(el.DF !== undefined) {t.push(abc[el.DF.Column]+ '-' + el.DF.Row);} else { t.push('??');}  
                    if(el.CY !== undefined) {t.push(abc[el.CY.Column]+ '-' + el.CY.Row);} else { t.push('??');}  
                  } else {
                    if(el.DF !== undefined) {t.push(el.DF.Row);} else { t.push('??');}  
                    if(el.CY !== undefined) {t.push(el.CY.Row);} else { t.push('??');}   
                  }                
                  hp.val = t;
                  this.Display.infoArrays.push(hp);
                  // store
                  this.lootList.store(xy,'infoArrays',this.Display.infoArrays);                           
                } catch (e) {
                  console.log("MHTools.Loot.calcInfo 1: ", e);
                }
              }            
              if(this.settings.showColumnCondition.v) { 
                try {   
                  var bl = el.Buildings.d;
                  var dl = el.Defences.d;
                  
                  for(var k in bl) {
                    var b = bl[k];
                    if(b.get_TechName() == ClientLib.Base.ETechName.Defense_Facility) df = b;
                    if(b.get_TechName() == ClientLib.Base.ETechName.Construction_Yard) cy = b;
                  }

                  var tb;
                  var tbhp;
                  var cnt;
                  var mi;
                  var ma;
                  var dc;
                  
                  // CY
                  tb = cy;
                  cnt = 0;
                  tbhp = 0;
                  dc = 1;
                  mi = tb.get_CoordX() - dc;
                  ma = tb.get_CoordX() + dc;
                  // scan
                  for(var k in bl) {
                    var o = bl[k];  
                    if(o.get_CoordX() >= mi && o.get_CoordX() <= ma) {
                      if(o.get_CoordY() >= tb.get_CoordY()) {
                        cnt++;
                        tbhp += o.get_HitpointsPercent();
                      }
                    }
                  }
                  for(var k in dl) {
                    var o = dl[k];  
                    //if(o.get_CoordX() == tb.get_CoordX()) {
                    if(o.get_CoordX() >= mi && o.get_CoordX() <= ma) {
                      if(o.get_CoordY() >= tb.get_CoordY()) {
                        cnt++;
                        tbhp += o.get_HitpointsPercent();
                      }
                    }
                  }
                  tbhp = 100 * tbhp / cnt;
                  var cyhp = tbhp;

                  // DF
                  tb = df;
                  cnt = 0;
                  tbhp = 0;
                  dc = 1;
                  mi = tb.get_CoordX() - dc;
                  ma = tb.get_CoordX() + dc;
                  for(var k in bl) {
                    var o = bl[k];  
                    if(o.get_CoordX() >= mi && o.get_CoordX() <= ma) {
                      if(o.get_CoordY() >= tb.get_CoordY()) {
                        cnt++;
                        tbhp += o.get_HitpointsPercent();
                      }
                    }
                  }
                  for(var k in dl) {
                    var o = dl[k];  
                    if(o.get_CoordX() >= mi && o.get_CoordX() <= ma) {
                      if(o.get_CoordY() >= tb.get_CoordY()) {
                        cnt++;
                        tbhp += o.get_HitpointsPercent();
                      }
                    }
                  }
                  tbhp = 100 * tbhp / cnt;
                  var dfhp = tbhp;               
                  
                  hp = {};
                  hp.name = '<b>CY & DF column HP [%]</b>';
                  hp.lbs = ['CY:','DF:'];
                  t = [];
                  t.push(this.numberFormat(cyhp, 0));
                  t.push(this.numberFormat(dfhp, 0));        
                  hp.val = t;
                  this.Display.infoArrays.push(hp);
                  //this.Display.twoLineInfoArrays.push(hp);
                  // store
                  this.lootList.store(xy,'infoArrays',this.Display.infoArrays);                       
                } catch (e) {
                  console.log("MHTools.Loot.calcInfo 2: ", e);
                }
              }
              if(this.settings.showRepairTime.v) { 
                try {                 
                  var a = oc.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Aircraft, false);//false // RT Defense
                  var v = oc.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Vehicle, false);//false // RT Defense
                  var i = oc.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Infantry, false);//false // RT Defense
                  var m = Math.max(a,v,i);
                  
                  var aa = oc.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeAir);
                  var av = oc.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeVeh);
                  var ai = oc.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeInf);                
                  var am = Math.min(aa,av,ai);
                  
                  var ohp=0;
                  ohp = oc.GetOffenseConditionInPercent();
                  
                  var ool = this.numberFormat(oc.get_LvlOffense(), 1);
                  
                  hp = {};
                  hp.name = '<b>Repair time (Your offence)</b>';
                  hp.lbs = ['Maximum:','Available:','Health:','Level:'];
                  t = [];
                  t.push(this.hms(m)); 
                  t.push(this.hms(am));
                  t.push(ohp);
                  t.push(ool);                 
                  hp.val = t;
                  //this.Display.infoArrays.push(hp);
                  this.Display.twoLineInfoArrays.push(hp);              
                  // store
                  this.lootList.store(xy,'twoLineInfoArrays',this.Display.twoLineInfoArrays);                       
                } catch (e) {
                  console.log("MHTools.Loot.calcInfo 3: ", e);
                }
              }
            },
            calcFriendlyInfo: function(xy) {
              //console.info("loot.calcFriendlyInfo"); 
              this.Display.twoLineInfoArrays = [];
              if(!this.settings.showLevels.v && !this.settings.showAllyRepairTimeInfo.v) return;
                          
              try { 
                if (!this.Data.loaded) return;            
                
                var hp;
                var t;
                
                //var cc = this.Data.cc;
                var oc = this.Data.oc;
                var ec = this.Data.ec;
                
                var ol = this.Data.ol;
                var el = this.Data.el;            
                
                var IsOwn = this.Data.IsOwnBase;                
                
                
                if(this.settings.showLevels.v) { 
                  var sd = ec.get_SupportData();
                  var sn;
                  var sl;
                  if(sd !== null) {
                    sl = sd.get_Level();
                    sn = ec.get_SupportWeapon().dn; 
                  }
                
                  hp = {};
                  hp.name = '<b>Levels</b>';
                  hp.lbs = ['Base:','Defence:','Offence:','Support:'];
                  t = [];
                  if(el.Buildings.c>0) t.push(this.numberFormat(ec.get_LvlBase(), 1)); else t.push('--');  
                  if(el.Defences.c>0) t.push(this.numberFormat(ec.get_LvlDefense(), 1)); else t.push('--');  
                  if(el.Offences.c>0) t.push(this.numberFormat(ec.get_LvlOffense(), 1)); else t.push('--'); 
                  if(sd !== null) t.push(this.numberFormat(sl, 1)); else t.push('--'); 
                  hp.val = t;
                  this.Display.twoLineInfoArrays.push(hp);
                }
              
                if(this.settings.showAllyRepairTimeInfo.v) {
                  
                  var a = ec.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Aircraft, false);//false // RT Defense
                  var v = ec.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Vehicle, false);//false // RT Defense
                  var i = ec.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Infantry, false);//false // RT Defense
                  var m = Math.max(a,v,i);
                  
                  var aa = ec.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeAir);
                  var av = ec.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeVeh);
                  var ai = ec.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeInf);                
                  var am = Math.min(aa,av,ai);
                  
                  var ofl;              
                  var ohp=0;
                  if(el.Offences.c>0) {
                    //my
                    //for (var k in el.Offences.d) ohp += el.Offences.d[k].get_HitpointsPercent();//get_Health();//Health - hitpoints
                    //ohp = 100.0 * ohp / el.Offences.c;
                    //console.log('Health',ohp,ec.GetOffenseConditionInPercent());
                    //ohp = this.numberFormat(ohp, 0);
                    //ea
                    ohp = ec.GetOffenseConditionInPercent();
                    //ohp = ec.GetOffenseConditionInPercent();//GetOffenseConditionInPercent ()
                    ofl = this.numberFormat(ec.get_LvlOffense(), 1);
                    //console.log('ec',ec,'ec.get_LvlOffense()',ec.get_LvlOffense());
                  } else {
                    ohp = '---';
                    ofl = '---';
                  }
                  
                  hp = {};
                  hp.name = IsOwn?'<b>Repair time (Your offence)</b>':'<b>Repair time (Ally offence)</b>';
                  hp.lbs = ['Maximum:','Available:','Health:','Level:'];
                  t = [];
                  t.push(this.hms(m)); 
                  //t.push('---');
                  t.push(this.hms(am));
                  t.push(ohp); 
                  t.push(ofl);       
                  hp.val = t;
                  this.Display.twoLineInfoArrays.push(hp);
                } 
                //this.Display.twoLineInfoArrays = twoLineInfoArrays;
                this.lootList.store(xy,'twoLineInfoArrays',this.Display.twoLineInfoArrays); 
              } catch (e) {
                console.warn("MHTools.Loot.calcFriendlyInfo: ", e);
              }
            },
            
//NOTE
//ClientLib.Vis.VisMain.GetInstance().GetObjectFromPosition
//ClientLib.Data.WorldSector.WorldObject GetObjectFromPosition (System.Int32 x ,System.Int32 y)
//ClientLib.Vis.City.CityObject GetObjectFromPosition (System.Single x ,System.Single y)
//ClientLib.Vis.Region.RegionObject GetObjectFromPosition (System.Single x ,System.Single y)
//ClientLib.Vis.VisObject GetObjectFromPosition (System.Single x ,System.Single y)
//ClientLib.Data.Hub GetObjectFromPosition (System.Int32 x ,System.Int32 y)
            calcDistance: function () {
              //console.info("loot.calcDistance"); 
              this.Display.distanceArray = [];
              
              var hp;
              
              if(!this.settings.showDistance.v) return;
              //console.log('calcDistance');              
              try {                
                var visObject = ClientLib.Vis.VisMain.GetInstance().get_SelectedObject();
                if (visObject!==null) {
                  var oc = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
                  var t = visObject.get_VisObjectType();
                  switch (t) {                   
                    case ClientLib.Vis.VisObject.EObjectType.RegionCityType:
                    case ClientLib.Vis.VisObject.EObjectType.RegionNPCBase:
                    case ClientLib.Vis.VisObject.EObjectType.RegionNPCCamp:
                    case ClientLib.Vis.VisObject.EObjectType.RegionPointOfInterest:
                    case ClientLib.Vis.VisObject.EObjectType.RegionRuin: 
                    case ClientLib.Vis.VisObject.EObjectType.RegionHubControl:
                    case ClientLib.Vis.VisObject.EObjectType.RegionHubCenter:
                      var ser = ClientLib.Data.MainData.GetInstance().get_Server();
                      var selX = visObject.get_RawX();
                      var selY = visObject.get_RawY();
                      var ocX = oc.get_X();
                      var ocY = oc.get_Y();          
                      var cenX = ser.get_ContinentWidth() / 2;
                      var cenY = ser.get_ContinentHeight() / 2;                        
                      //target is locked by button
                      // if(typeof(this.Data.Lock)=='undefined') {
                        // this.Data.Lock={X:ocX,Y:ocY};//{X:0,Y:0};
                      // }
                      //var locX = this.Data.Lock.X;                    
                      //var locY = this.Data.Lock.Y;
                      if(typeof(this.Data.Selected)=='undefined') {
                        this.Data.Selected={};
                      }
                      this.Data.Selected={X:selX,Y:selY};
                      var dis = ClientLib.Base.Util.CalculateDistance(ocX, ocY, selX, selY).toString();
                      var cen = ClientLib.Base.Util.CalculateDistance(cenX, cenY, selX, selY);
                      //var loc = ClientLib.Base.Util.CalculateDistance(locX, locY, selX, selY);
                      var cdt = oc.GetCityMoveCooldownTime(selX,selY);//cool down time
                      var stp = dis / 20;//steps
                      this.Data.Distance = dis;
                      //this.Data.MeasureDistance = loc;                      
                      var hp = {};
                      hp.name = '<b>Movement</b>';
                      hp.lbs = ['Distance:','EMT:','Steps:','To center:'];
                      var t = [];
                      t.push(dis);
                      t.push(this.dhms2(cdt));
                      t.push(stp);       
                      t.push(cen);       
                      hp.val = t;
                      this.Display.distanceArray.push(hp);
                      break;
                    default:
                      break;
                  }//switch (t) 
                }//if (visObject               
                //DISABLED this.lootList.store(xy,'distanceArray',this.Display.distanceArray);               
              } catch (e) {
                console.warn("MHTools.Loot.calcDistance: ", e);
              }
            },
            
            onSelectionChange: function(oldObject,newObject) {
              try { 
               if(qx.core.Init.getApplication().getChat().getFocused() || (qx.core.Init.getApplication().getPlayArea().getViewMode()!=ClientLib.Data.PlayerAreaViewMode.pavmNone)) {
                    //TODO something is wrong
                    //this.extTimer.stop();
                    //this.win.close();
                    //return;
                }            
                this.extItems = [];
                this.win.removeAll();
                this.win.close(); 
                
                if(oldObject=="Timer") {
                  //console.log("@Timer");
                }
                else {
                  //console.log("@Select");
                  this.Data.lastSelectedBaseId = -2;
                  this.waiting[0] = 1;
                }
                //ClientLib.Vis.SelectionChange
                //console.clear();
                var visObject = ClientLib.Vis.VisMain.GetInstance().get_SelectedObject();
                if(visObject!==null) {
                  var vt = visObject.get_VisObjectType();
                  //console.log('onSelectionChange.Object: ',this.LObjectType[vt]);
                }
                else {
                  //console.log('onSelectionChange.Object: ','null');
                  this.Data.lastSelectedBaseId = -3;
                }
                
                if (visObject!==null) {
                  var t = visObject.get_VisObjectType();
                  //console.log('Vis Object Type:',t,', ',this.LObjectType[t]);
                  //console.log('!=null: Object type: ',this.LObjectType[t]);
                  //window.MHTools.visObject = visObject;
                  //window.visObject = visObject;
                  this.Data.visObject = visObject;
                  this.extTimer.start();
                  var xy = -1;
                  if(typeof(visObject.get_RawX)!='undefined') {
                    var xy = 10000 * visObject.get_RawX() + visObject.get_RawY();
                  }
                  switch (t) {                    
                    // Own bases, ally base
                    case ClientLib.Vis.VisObject.EObjectType.RegionCityType:
                      //this.extTimer.setEnabled(true);
                      //this.extTimer.start();// does not work
                      var oc = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
                      var aid = oc.get_AllianceId();
                      var sid = visObject.get_AllianceId();
                      
                      this.calcDistance();                      
                      if(aid == sid) {
                        // Own, Ally
                        //clear                  
                        //self.Display.distanceArray = [];
                        if (this.loadBase() && oldObject=="Timer") {
                  this.extTimer.stop();
                          this.calcFriendlyInfo(xy);
                          this.addFriendlyLabel();
                        } else {
                          this.addLoadingLabel();
                        }
                      }
                      else {
                        // Enemy
                        if (this.loadBase() && oldObject=="Timer") {
                  this.extTimer.stop();
                          this.calcResources(xy);
                          this.calcTroops(xy);
                          this.calcInfo(xy);
                          this.addResourcesLabel();
                        } else {           
                          if(this.restoreDisplay(xy)) {
                            this.addResourcesLabel("r");
                          } else {          
                            this.addLoadingLabel();
                          }      
                        }
                      }
                      break;
                    // CAMP OUTPOST BASE
                    case ClientLib.Vis.VisObject.EObjectType.RegionNPCCamp:
                    case ClientLib.Vis.VisObject.EObjectType.RegionNPCBase:
                      this.calcDistance();
                      if (this.loadBase() && oldObject=="Timer") {
                  this.extTimer.stop();                       
                        this.calcResources(xy);
                        this.calcTroops(xy);
                        this.calcInfo(xy);
                        this.addResourcesLabel();
                      } else {          
                        if(this.restoreDisplay(xy)) {
                          this.addResourcesLabel("r");
                        } else {        
                          this.addLoadingLabel();
                        }
                      }
                      break;
                    case ClientLib.Vis.VisObject.EObjectType.RegionPointOfInterest:
                    case ClientLib.Vis.VisObject.EObjectType.RegionRuin:
                    case ClientLib.Vis.VisObject.EObjectType.RegionHubControl:
                    case ClientLib.Vis.VisObject.EObjectType.RegionHubCenter:
                      this.extTimer.stop();
                      //clear
                      this.Display.lootArray = [];
                      this.Display.troopsArray = [];
                      this.Display.infoArrays = [];
                      this.Display.twoLineInfoArrays = [];
                      this.calcDistance();
                      this.addResourcesLabel();
                      break;
                    default:
                      this.extTimer.stop();
                      this.win.close();
                      break;
                  }                  
                  // console.log('focusable: false');
                  // this.win.set({focusable: false});
                }
                else {                
                  this.extTimer.stop();
                  this.win.close();
                }
              } catch (e) {
                console.warn('MHTools.Loot.onSelectionChange: ', e);
              }
            },
            onViewChanged: function(oldMode, newMode) {
              //console.log('onViewChanged: ');
              // var p = qx.core.Init.getApplication().getPlayArea();
              // console.log('getViewMode',p.getViewMode());//0-map,1-base,2-def,3-off
              // qx.core.Init.getApplication().getPlayArea().getViewMode();
              // case ClientLib.Data.PlayerAreaViewMode.pavmCombatAttacker:
              // console.log('getViewCity',p.getViewCity());//id
              // var fH = ClientLib.Data.MainData.GetInstance().get_Combat();
              // qx.core.Init.getApplication().getPlayArea().getCurrentViewMode()
              // var c = qx.core.Init.getApplication().getChat();
              // c.getFocused();//good
              // c.getFocusedOrMoused();//good
              // qx.core.Init.getApplication().getChat().getFocusedOrMoused();
              try {
                //console.log('newMode: ',newMode);
                console.log('onViewChanged: ',this.LViewMode[newMode]);
                this.viewMode = newMode;
                if(newMode != ClientLib.Vis.Mode.Region) {
                  this.extTimer.stop();
                  this.win.close();
                }
              } catch (e) {
                console.warn('MHTools.Loot.onViewChanged: ', e);
              }
            },
            extendSelectionChange: function() {
              phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "SelectionChange", ClientLib.Vis.SelectionChange, this, this.onSelectionChange);
            },
            extendViewModeChange: function() {
              //disabled
              //phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "ViewModeChange", ClientLib.Vis.ViewModeChange, this , this.onViewChanged);
              
            },
            restoreDisplay: function(xy) {
              //console.info("loot.restoreDisplay");              
              var id = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId();
              if(this.lootList.exist(xy)) {
                var d = this.lootList.list.d[xy].Data;            
                var da = this.Display.distanceArray;
                this.Display = {};
                for(var k in d) this.Display[k] = d[k];
                this.Display.distanceArray = da;
                return true;
              }
              return false;
            },
            // DISPLAY data
            addLoadingLabel: function(widget) {
              //console.log('addLoadingLabel');
              try {
                this.extItems = [];
                //widget.removeAll();
                var r=0, c=0;
                var a;
                      
                // DISTANCE
                //console.log('DISTANCE');
                a = this.Display.distanceArray;
                if(typeof(a)!='undefined' && a.length>0) { 
                  for(var i in this.Display.distanceArray) {              
                    c=0;
                    this.extAdd(new qx.ui.basic.Label(this.Display.distanceArray[i].name).set({width: 230, rich: true, allowGrowX: true}), { row: r++, column: c, colSpan: 6}); 
                    c=1;
                    for(var j in this.Display.distanceArray[i].lbs) {
                      this.extAdd(new qx.ui.basic.Label(this.Display.distanceArray[i].lbs[j]), {row: r, column: c});                     
                      this.extAdd(new qx.ui.basic.Label(this.Display.distanceArray[i].val[j]), {row: r+1, column: c});
                      c+=2;
                    }
                    r+=2;
                  }
                }
                
                // AWAITING
                //console.log('AWAITING');
                c=0;
                var w = this.waiting[this.waiting[0]];
                if(++this.waiting[0] >= this.waiting.length) this.waiting[0]=1;
                this.extAdd(new qx.ui.basic.Label("<b style='color:white;font-size:10pt'>SCANNING... " + w + "</b>").set({rich: true}), {row: r++,column: c, colSpan: 6});//, allowGrowX: true, colSpan: 6
                
                this.extPrint();
              } catch (e) {
                console.warn('MHTools.Loot.addLoadingLabel: ', e);
              }
            }, 
            addResourcesLabel: function(type) {
              //console.log('addResourcesLabel');
              try {
                this.extItems = [];
                //widget.removeAll();
                var r=0, c=0;                
                var hp;
                var a;
                
                // DISTANCE
                a = this.Display.distanceArray;
                if(typeof(a)!='undefined' && a.length>0) { 
                  for(var i in this.Display.distanceArray) {              
                    c=0;
                    //widget.add(new qx.ui.basic.Label(this.Display.distanceArray[i].name).set({width: 200, rich: true, allowGrowX: true}), { row: r++, column: c, colSpan: 6}); 
                    this.extAdd(new qx.ui.basic.Label(this.Display.distanceArray[i].name).set({width: 200, rich: true, allowGrowX: true}), { row: r++, column: c, colSpan: 6}); 
                    c=1;
                    for(var j in this.Display.distanceArray[i].lbs) {
                      //widget.add(new qx.ui.basic.Label(this.Display.distanceArray[i].lbs[j]), {row: r, column: c});                     
                      this.extAdd(new qx.ui.basic.Label(this.Display.distanceArray[i].lbs[j]), {row: r, column: c});                     
                      //widget.add(new qx.ui.basic.Label(this.Display.distanceArray[i].val[j]), {row: r+1, column: c});
                      this.extAdd(new qx.ui.basic.Label(this.Display.distanceArray[i].val[j]), {row: r+1, column: c});
                      c+=2;
                    }
                    r+=2;
                  }
                }
                
                // LOOT
                if (this.settings.showLoot.v) {
                  a = this.Display.lootArray;
                  if(typeof(a)!='undefined' && a.length>0) {
                    hp = {};
                    hp.name = '<b>Lootable Resources</b>';
                    hp.img = this.resImages;
                    t = [];  
                    t.push(this.Display.lootArray[0]);//Research 6  
                    t.push(this.Display.lootArray[1]);//Tiberium 1
                    t.push(this.Display.lootArray[2]);//Crystal 2
                    t.push(this.Display.lootArray[3]);//Credits 3           
                    hp.val = t;
                    //iconArrays.push(hp);  //store !!
                    
                    // draw icon's info              
                    c=0;
                    //widget.add(new qx.ui.basic.Label(hp.name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6});    
                    this.extAdd(new qx.ui.basic.Label(hp.name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6});    
                    //console.log('A) i',i);   
                    for(var j in hp.val) {
                      //console.log('B) i',i,'j',j);
                      //widget.add(hp.img[j], {row: r, column: c++}); 
                      this.extAdd(hp.img[j], {row: r, column: c++}); 
                      //widget.add(new qx.ui.basic.Label(this.kMG(hp.val[j])).set({textAlign:'left'}), {row: r, column: c++});
                      this.extAdd(new qx.ui.basic.Label(this.kMG(hp.val[j])).set({textAlign:'left'}), {row: r, column: c++});
                    }
                    r++;
                  }
                }
                
                // TROOP
                if (this.settings.showTroops.v) { //to do  
                  a = this.Display.troopsArray;
                  if(typeof(a)!='undefined' && a.length>0) {   
                    hp = {};
                    hp.name = '<b>Troop Strength</b>';
                    hp.img = this.troopImages;
                    t = [];
                    t.push(this.Display.troopsArray[0]);
                    if (this.settings.showTroopsExtra.v) {
                      t.push(this.Display.troopsArray[1]);//inf
                      t.push(this.Display.troopsArray[2]);//veh
                      t.push(this.Display.troopsArray[3]);//stu
                      //t.push(this.Display.troopsArray[4]);//air
                    }              
                    hp.val = t;
                    // draw icon's info                            
                    c=0;
                    //widget.add(new qx.ui.basic.Label(hp.name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6});  
                    this.extAdd(new qx.ui.basic.Label(hp.name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6});  
                    //widget.add(new qx.ui.basic.Label(this.kMG(hp.val[0])).set({textAlign:'left'}), {row: r, column: c++});  
                    this.extAdd(new qx.ui.basic.Label(this.kMG(hp.val[0])).set({textAlign:'left'}), {row: r, column: c++});  
                    //console.log('A) i',i);
                    c=2;
                    for(var j=1;j<hp.val.length;j++) {
                      //console.log('B) i',i,'j',j);
                      //widget.add(hp.img[j-1], {row: r,column: c++}); 
                      this.extAdd(hp.img[j-1], {row: r,column: c++}); 
                      //widget.add(new qx.ui.basic.Label(this.kMG(hp.val[j])).set({textAlign:'left'}), {row: r, column: c++});
                      this.extAdd(new qx.ui.basic.Label(this.kMG(hp.val[j])).set({textAlign:'left'}), {row: r, column: c++});
                    }
                    r++;
                  }
                }
                
                // INFO
                a = this.Display.infoArrays;
                if(typeof(a)!='undefined' && a.length>0) { 
                  for(var i in this.Display.infoArrays) {              
                    c=0;
                    //widget.add(new qx.ui.basic.Label(this.Display.infoArrays[i].name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6}); 
                    this.extAdd(new qx.ui.basic.Label(this.Display.infoArrays[i].name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6}); 
                    c=1;
                    for(var j in this.Display.infoArrays[i].lbs) {
                      //widget.add(new qx.ui.basic.Label(this.Display.infoArrays[i].lbs[j]+' '+this.Display.infoArrays[i].val[j]), {row: r, column: c});
                      this.extAdd(new qx.ui.basic.Label(this.Display.infoArrays[i].lbs[j]+' '+this.Display.infoArrays[i].val[j]), {row: r, column: c});
                      c+=2;
                    }
                    r++;
                  }
                } 
                
                // 2 lines INFO
                a = this.Display.twoLineInfoArrays;
                if(typeof(a)!='undefined' && a.length>0) {       
                  for(var i in this.Display.twoLineInfoArrays) {              
                    c=0;
                    //widget.add(new qx.ui.basic.Label(this.Display.twoLineInfoArrays[i].name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6});    
                    this.extAdd(new qx.ui.basic.Label(this.Display.twoLineInfoArrays[i].name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6});    
                    c=1;
                    for(var j in this.Display.twoLineInfoArrays[i].lbs) {
                      //widget.add(new qx.ui.basic.Label(this.Display.twoLineInfoArrays[i].lbs[j]), {row: r, column: c});                     
                      this.extAdd(new qx.ui.basic.Label(this.Display.twoLineInfoArrays[i].lbs[j]), {row: r, column: c});                     
                      //widget.add(new qx.ui.basic.Label(this.Display.twoLineInfoArrays[i].val[j]), {row: r+1, column: c});
                      this.extAdd(new qx.ui.basic.Label(this.Display.twoLineInfoArrays[i].val[j]), {row: r+1, column: c});
                      c+=2;
                    }
                    r+=2;                
                  }
                }
                
                // WARNING
                c=0;
                if(type == "r") {
                  //this.extAdd(new qx.ui.basic.Label("<span style='color:blue'><b>Stored data. Wait...</b></span>").set({width: 200, rich: true, allowGrowX: true}), { row: r++, column: c, colSpan: 6});
                  this.extAdd(new qx.ui.basic.Label("<b style='color:white;font-size:10pt'>[*STORED DATA. WAIT...]</b>").set({width: 200, rich: true, allowGrowX: true}), { row: r++, column: c, colSpan: 6});
                }
                
                this.extPrint();
                
              } catch (e) {
                console.warn('MHTools.Loot.addResourcesLabel(): ', e);
              }
            },       
            addFriendlyLabel: function(widget) {
              //console.log('addFriendlyLabel');
              try {              
                this.extItems = [];
                //widget.removeAll();
                var a;
                var r=0, c=0;
                
                // DISTANCE
                a = this.Display.distanceArray;
                if(typeof(a)!='undefined' && a.length>0) {    
                  for(var i in this.Display.distanceArray) {              
                    c=0;
                    //widget.add(new qx.ui.basic.Label(this.Display.distanceArray[i].name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6}); 
                    this.extAdd(new qx.ui.basic.Label(this.Display.distanceArray[i].name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6}); 
                    c=1;
                    for(var j in this.Display.distanceArray[i].lbs) {
                      //widget.add(new qx.ui.basic.Label(this.Display.distanceArray[i].lbs[j]), {row: r, column: c});                     
                      this.extAdd(new qx.ui.basic.Label(this.Display.distanceArray[i].lbs[j]), {row: r, column: c});                     
                      //widget.add(new qx.ui.basic.Label(this.Display.distanceArray[i].val[j]), {row: r+1, column: c});
                      this.extAdd(new qx.ui.basic.Label(this.Display.distanceArray[i].val[j]), {row: r+1, column: c});
                      c+=2;
                    }
                    r+=2;
                  }
                }
                
                
                // 2 lines INFO
                a = this.Display.twoLineInfoArrays;
                if(typeof(a)!='undefined' && a.length>0) {  
                  c=0;
                  for(var i in this.Display.twoLineInfoArrays) {              
                    c=0;
                    //widget.add(new qx.ui.basic.Label(this.Display.twoLineInfoArrays[i].name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6}); 
                    this.extAdd(new qx.ui.basic.Label(this.Display.twoLineInfoArrays[i].name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6}); 
                    c=1;
                    for(var j in this.Display.twoLineInfoArrays[i].lbs) {
                      //widget.add(new qx.ui.basic.Label(this.Display.twoLineInfoArrays[i].lbs[j]), {row: r, column: c});                     
                      this.extAdd(new qx.ui.basic.Label(this.Display.twoLineInfoArrays[i].lbs[j]), {row: r, column: c});                     
                      //widget.add(new qx.ui.basic.Label(this.Display.twoLineInfoArrays[i].val[j]), {row: r+1, column: c});
                      this.extAdd(new qx.ui.basic.Label(this.Display.twoLineInfoArrays[i].val[j]), {row: r+1, column: c});
                      c+=2;
                    }
                    r+=2;                
                  }
                }
                
                this.extPrint();

              } catch (e) {
                console.warn('MHTools.Loot.addFriendlyLabel: ', e);
              }
            },
            // OPTIONS
            optionsTab: null,
            optionsPage: null,
            btnApply: null,
            optionsStoreName: 'MHToolLootOptions',
            addLootPage: function() {            
              //console.log('addLootPage');
              try {
                if(!MHTools.OptionsPage) OptionsPage();
                
                if(!this.optionsTab) {
                  //Create Tab
                  this.optionsTab = MHTools.OptionsPage.getInstance();
                }
                this.optionsPage = this.optionsTab.addPage("Loot");
                this.optionsPage.setLayout(new qx.ui.layout.VBox());
                // ...
                this.optionsPage.add(new qx.ui.basic.Label("<b>Options:</b></br>").set({rich: true}));//, textColor: red
                var i = 0;
                for(var k in this.settings) {
                  this.settings[k].cb = new qx.ui.form.CheckBox(this.settings[k].l).set({
                    value: this.settings[k].v,
                    paddingLeft: 10
                  });
                  this.settings[k].cb.addListener("execute", this.optionsChanged, this);
                  this.optionsPage.add(this.settings[k].cb);//, {row:1+i++, column:3});
                }
                //typeGet
                //this.optionsPage.add(new qx.ui.basic.Label("<b>Obf:"+this.typeGet()+"</b>").set({rich: true}));//, textColor: red
                //  container.add(new qx.ui.core.Spacer(50));
                this.loadOptions();
                this.addButtons();               
              } catch (e) {
                console.warn("MHTool.Loot.addLootPage: ", e);
              }           
            },
            addButtons: function() {
              try {
                this.btnApply = new qx.ui.form.Button("Apply");
                this.btnApply.set({ width:150, height:30, toolTipText: "Apply changes.", allowGrowX:false, enabled:false});//, marginTop:20});
                
                var c = new qx.ui.container.Composite(new qx.ui.layout.HBox(0,'right'));
                c.setMarginTop(20);
                c.add(this.btnApply);
                this.optionsPage.add(c);
                
                this.btnApply.addListener("execute", this.applyOptions, this); 
                this.btnApply.setEnabled(false);
              } catch (e) {
                console.warn("MHTool.Loot.addButtons: ", e);
              }
            },
            optionsChanged: function() {
              var c = false;
              for(var k in this.settings) {
                c = c || (this.settings[k].v != this.settings[k].cb.getValue());
              }
              this.btnApply.setEnabled(c);
            },
            applyOptions: function(e) {
              //console.log("applyOptions e:",e);
              this.saveOptions();
              this.btnApply.setEnabled(false); 
            },
            saveOptions: function() {   
              var c = {};
              var i = 0;
              for(var k in this.settings) {
                c[k] = this.settings[k].cb.getValue();
                this.settings[k].v = c[k];
              }
              var S = ClientLib.Base.LocalStorage;
              if (S.get_IsSupported()) S.SetItem(this.optionsStoreName, c);
            },
            loadOptions: function() {
              try {
                var c = {};            
                var S = ClientLib.Base.LocalStorage;
                if (S.get_IsSupported()) c = S.GetItem(this.optionsStoreName);
                //console.log('loadOptions c:',c);
                if(c===null) c = {};
                var i = 0;              
                for(var k in this.settings) {
                  if(typeof(c[k])!='undefined') {
                    this.settings[k].cb.setValue(c[k]);
                    this.settings[k].v = c[k];
                  } else {
                    this.settings[k].cb.setValue(this.settings[k].d);
                    this.settings[k].v = this.settings[k].d;
                  }
                }             
                //console.log('loadOptions settings:',this.settings);
              } catch (e) {
                  console.warn("MHTool.Loot.loadOptions: ", e);
              }
            }
          }//members
        });      
      } catch (e) {
        console.warn("qx.Class.define(MHTools.Loot: ", e);      
      }
      //======================================================= 
      // START
      MHTools.Loot.getInstance();
    }//function MHToolsLootCreate
    //=======================================================   
    function LoadExtension() {
      try {
        if (typeof(qx) != 'undefined') {
          //if (qx.core.Init.getApplication().getMenuBar() !== null) {
          if (!!qx.core.Init.getApplication().getMenuBar()) {
            MHToolsLootCreate();
            return; // done
          } 
        }
      } catch (e) {
        if (typeof(console) != 'undefined') console.log('LoadExtension:',e);
        else if (window.opera) opera.postError(e);
        else GM_log(e);
      }
      window.setTimeout(LoadExtension, 1000); // force it
    }
    LoadExtension();
  };
  //=======================================================
  function Inject() {
    var script = document.createElement('script');
    txt = MHLootMain.toString();
    script.innerHTML = '(' + txt + ')();';
    script.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(script);
  }
  Inject();
})();


// ==UserScript==
// @name        C&C: Tiberium Alliances Title Mod
// @namespace   http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @description Displays your player name in the browser title bar. Also shows the number of whispers you've received when in another tab or window.
// @include     https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @icon        https://sites.google.com/site/titlemod/home/favicon.png
// @version     0.7.0
// @author      null
// @copyleft    eternity
// @grant       none
// ==/UserScript==

(function () {
	var titleMod_main = function () {
		try {
			window.titleMod_Version = "0.7.0";
			console.log("C&C: Tiberium Alliances Title Mod v" + window.titleMod_Version + " loading...");
			var titleMod_init = function () {
				
				// Set this to false if you don't want any sound
				var playNotificationSounds = true;
				var checkPageFocusDelay = 2000;

				var SND_loud = new Audio("data:video/ogg;base64,T2dnUwACAAAAAAAAAADI7LN9AAAAAEdUMKsBHgF2b3JiaXMAAAAAAkSsAAD/////APQBAP////+4AU9nZ1MAAAAAAAAAAAAAyOyzfQEAAAA8VjxHEjb/////////////////////PAN2b3JiaXMNAAAATGF2ZjU0LjM2LjEwMAEAAAAVAAAAZW5jb2Rlcj1MYXZmNTQuMzYuMTAwAQV2b3JiaXMpQkNWAQAIAACAIkwYxIDQkFUAABAAAKCsN5Z7yL333nuBqEcUe4i9995746xH0HqIuffee+69pxp7y7333nMgNGQVAAAEAIApCJpy4ELqvfceGeYRURoqx733HhmFiTCUGYU9ldpa6yGT3ELqPeceCA1ZBQAAAgBACCGEFFJIIYUUUkghhRRSSCmlmGKKKaaYYsoppxxzzDHHIIMOOuikk1BCCSmkUEoqqaSUUkot1lpz7r0H3XPvQfgghBBCCCGEEEIIIYQQQghCQ1YBACAAAARCCCFkEEIIIYQUUkghpphiyimngNCQVQAAIACAAAAAAEmRFMuxHM3RHM3xHM8RJVESJdEyLdNSNVMzPVVURdVUVVdVXV13bdV2bdWWbddWbdV2bdVWbVm2bdu2bdu2bdu2bdu2bdu2bSA0ZBUAIAEAoCM5kiMpkiIpkuM4kgSEhqwCAGQAAAQAoCiK4ziO5EiOJWmSZnmWZ4maqJma6KmeCoSGrAIAAAEABAAAAAAA4HiK53iOZ3mS53iOZ3map2mapmmapmmapmmapmmapmmapmmapmmapmmapmmapmmapmmapmmapmmapmlAaMgqAEACAEDHcRzHcRzHcRxHciQHCA1ZBQDIAAAIAEBSJMdyLEdzNMdzPEd0RMd0TMmUVMm1XAsIDVkFAAACAAgAAAAAAEATLEVTPMeTPM8TNc/TNM0TTVE0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TVMUgdCQVQAABAAAIZ1mlmqACDOQYSA0ZBUAgAAAABihCEMMCA1ZBQAABAAAiKHkIJrQmvPNOQ6a5aCpFJvTwYlUmye5qZibc84555xszhnjnHPOKcqZxaCZ0JpzzkkMmqWgmdCac855EpsHranSmnPOGeecDsYZYZxzzmnSmgep2Vibc85Z0JrmqLkUm3POiZSbJ7W5VJtzzjnnnHPOOeecc86pXpzOwTnhnHPOidqba7kJXZxzzvlknO7NCeGcc84555xzzjnnnHPOCUJDVgEAQAAABGHYGMadgiB9jgZiFCGmIZMedI8Ok6AxyCmkHo2ORkqpg1BSGSeldILQkFUAACAAAIQQUkghhRRSSCGFFFJIIYYYYoghp5xyCiqopJKKKsoos8wyyyyzzDLLrMPOOuuwwxBDDDG00kosNdVWY4215p5zrjlIa6W11lorpZRSSimlIDRkFQAAAgBAIGSQQQYZhRRSSCGGmHLKKaegggoIDVkFAAACAAgAAADwJM8RHdERHdERHdERHdERHc/xHFESJVESJdEyLVMzPVVUVVd2bVmXddu3hV3Ydd/Xfd/XjV8XhmVZlmVZlmVZlmVZlmVZlmUJQkNWAQAgAAAAQgghhBRSSCGFlGKMMcecg05CCYHQkFUAACAAgAAAAABHcRTHkRzJkSRLsiRN0izN8jRP8zTRE0VRNE1TFV3RFXXTFmVTNl3TNWXTVWXVdmXZtmVbt31Ztn3f933f933f933f933f13UgNGQVACABAKAjOZIiKZIiOY7jSJIEhIasAgBkAAAEAKAojuI4jiNJkiRZkiZ5lmeJmqmZnumpogqEhqwCAAABAAQAAAAAAKBoiqeYiqeIiueIjiiJlmmJmqq5omzKruu6ruu6ruu6ruu6ruu6ruu6ruu6ruu6ruu6ruu6ruu6ruu6QGjIKgBAAgBAR3IkR3IkRVIkRXIkBwgNWQUAyAAACADAMRxDUiTHsixN8zRP8zTREz3RMz1VdEUXCA1ZBQAAAgAIAAAAAADAkAxLsRzN0SRRUi3VUjXVUi1VVD1VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVXVNE3TNIHQkJUAABkAAMO05NJyz42gSCpHtdaSUeUkxRwaiqCCVnMNFTSISYshYgohJjGWDjqmnNQaUykZc1RzbCFUiEkNOqZSKQYtCEJDVggAoRkADscBJMsCJEsDAAAAAAAAAEnTAM3zAMvzAAAAAAAAAEDSNMDyNEDzPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJE0DNM8DNM8DAAAAAAAAAM3zAE8UAU8UAQAAAAAAAMDyPMATPcATRQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHE0DNM8DNM8DAAAAAAAAAMvzAE8UAc8TAQAAAAAAAEDzPMATRcATRQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAEOAAABFkKhISsCgDgBAIckQZIgSdA0gGRZ0DRoGkwTIFkWNA2aBtMEAAAAAAAAAAAAQPI0aBo0DaIIkDQPmgZNgygCAAAAAAAAAAAAIGkaNA2aBlEESJoGTYOmQRQBAAAAAAAAAAAA0EwToghRhGkCPNOEKEIUYZoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAgAEHAIAAE8pAoSErAoA4AQCHolgWAAA4kmNZAADgOJJlAQCAZVmiCAAAlqWJIgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAACAAQcAgAATykChISsBgCgAAIeiWBZwHMsCjmNZQJIsC2BZAM0DaBpAFAGAAACAAgcAgAAbNCUWByg0ZCUAEAUA4FAUy9I0UeQ4lqVposiRLEvTRJFlaZrnmSY0zfNMEaLneaYJz/M804RpiqKqAlE0TQEAAAUOAAABNmhKLA5QaMhKACAkAMDhOJbleaLoeaJomqrKcSzL80RRFE1TVVWV42iW54miKJqmqqoqy9I0zxNFUTRNVVVdaJrniaIomqaqui48z/NEURRNU1VdF57neaIoiqapqq4LURRF0zRNVVVV1wWiaJqmqaqq6rpAFEXTNFVVVV0XiKIomqaqqq7rAtM0TVVVVdeVXYBpqqqquq7rAlRVVV3XdWUZoKqq6rquK8sA13Vd15VlWQbguq7ryrIsAADgwAEAIMAIOsmosggbTbjwABQasiIAiAIAAIxhSjGlDGMSQgqhYUxCSCFkUlIqKaUKQiollVJBSKWkUjJKLaWWUgUhlZJKqSCkUlIpBQCAHTgAgB1YCIWGrAQA8gAACGOUYowx5yRCSjHmnHMSIaUYc845qRRjzjnnnJSSMeecc05K6ZhzzjknpWTMOeeck1I655xzzkkppXTOOeeklFJC6Bx0UkopnXMOQgEAQAUOAAABNopsTjASVGjISgAgFQDA4DiWpWmeJ4qmaUmSpnme54mmqmqSpGmeJ4qmqao8z/NEURRNU1V5nueJoiiapqpyXVEURdM0TVUly6JoiqapqqoL0zRN01RV14VpmqZpqqrrwrZVVVVd13Vh26qqqq7rysB1Xdd1ZRnIruu6riwLAABPcAAAKrBhdYSTorHAQkNWAgAZAACEMQgphBBSyCCkEEJIKYWQAACAAQcAgAATykChISsBgFQAAIAQa6211lprDWPWWmuttdYS56y11lprrbXWWmuttdZaa6211lprrbXWWmuttdZaa6211lprrbXWWmuttdZaa6211lprrbXWWmuttdZaa6211lprrbXWWmuttdZaa6211lprrbXWWmuttVYAIHaFA8BOhA2rI5wUjQUWGrISAAgHAACMQYgx6CSUUkqFEGPQSUiltRgrhBiDUEpKrbWYPOcchFJaai3G5DnnIKTUWowxJtdCSCmllmKLsbgWQioptdZirMkYlVJqLbYYa+3FqJRKSzHGGGswxubUWowx1lqLMTq3EkuMMcZahBHGxRZjrLXXIowRssXSWq21BmOMsbm12GrNuRgjjK4ttVZrzQUAmDw4AEAl2DjDStJZ4WhwoSErAYDcAAACIaUYY8w555xzDkIIqVKMOecchBBCCKGUUlKlGHPOOQghhFBCKaWkjDHmHIQQQgillFJKaSllzDkIIYRQSimllNJS65xzEEIIpZRSSiklpdQ55yCEUEoppZRSSkothBBCKKGUUkoppZSUUkohhFBKKaWUUkopqaWUQgillFJKKaWUUlJKKYUQQimllFJKKaWklForpZRSSimllFJKSS21lFIopZRSSimllJJaSimlUkoppZRSSiklpdRSSqWUUkoppZRSSkuppZRKKaWUUkoppZSUUkoppVRKKaWUUkopKaXUWkoppZRKKaWUUlprKaWWUiqllFJKKaW01FprLbWUSimllFJKaa21lFJKKZVSSimllFIAANCBAwBAgBGVFmKnGVcegSMKGSagQkNWAgBkAAAMo5RSSS1FgiKlGKSWQiUVc1BSiihzDlKsqULOIOYklYoxhJSDVDIHlVLMQQohZUwpBq2VGDrGmKOYaiqhYwwAAABBAACBkAkECqDAQAYAHCAkSAEAhQWGDhEiQIwCA+Pi0gYAIAiRGSIRsRgkJlQDRcV0ALC4wJAPABkaG2kXF9BlgAu6uOtACEEIQhCLAyggAQcn3PDEG55wgxN0ikodCAAAAACAAwA8AAAkG0BERDRzHB0eHyAhIiMkJSYnKAIAAAAA4AYAHwAASQoQERHNHEeHxwdIiMgISYnJCUoAACCAAAAAAAAIIAABAQEAAAAAgAAAAAABAU9nZ1MABIBKAAAAAAAAyOyzfQIAAAAvvjOzGzrDdWeBbnOphcLvvv8P/xCvqP8a/xP/Of85IXwZk2fDuoX9iOjfwcI5uOtu3b640BuWqUK/87J5/f6fA3XedvjL/v8hN///+er4/+PAV0X0HzRfNgB6qN3TU+Il7P4N9lcTHGpX/5Q4lnj/WrG/KlkHGgAAcCWgCwCGYRiGpUsNKgAAAAAAQGnRIk5VFAAAAAAAIKlLwR2jQUZiFI2lcYrt634AAER65Ghz58tuk91dBQCAAUAFoAIfYEDFifoAfBwooCMAvP9BzeC9AhT1Y8d1Or/jHz/Oaqkz+M/pvMDnH5xvp9l7F/vkng07+/PzhlwPJ88cw4l/vEZN4ncuL9jb6rYwvkwB/MY3h4yES6rrU15dkYBLAQc+GZ7jW+IY0vu3iPl9jQ+mYTI8p7eEm5DevwfM72sc/gZkAAAcTQAAAH/WCQAAAAAACQwjIAAQAAAAAAAAINrUJEcFAAAAAIiiNwAAANi2ikAKIbTJFNr3pfECAACIZieNAGgYgAEsAFQAA8DVZIBPgAAAJgCeSZ7aW8JtyAd+x/xqJkEmeapvCTchH/gd86uZBMgAAHiuFwAAAHBMAAAAAAAAZCMAAAAAAAAAAAAy28rfOwAAiHgAEEoBAIAbkECCQv6eXH0SUjoAgHSKjZz+TBEjAAAAwGLB2RwAPhku5VuEQIR4Xi/H/KpEv4HJcCo/IgSi4nldjvlVjYoBrgAAPJ+xAEBRpx4AgGMCAAAAAADDYASIAAAAAAAAAIjmWCooAADG4EQAgF4BAAAAVqAikAhpJx/jearX9ZlEAQAAa/3viRwNAAAAOOAHnADADwAwlBMkeA1kDJwNGGgAnkme1re/AcTuF8yTi76BTPK4fPgDR5xuwTy56BngCgDAHwAAAOCYAAAAAAAACAQAAgAAAAAAAAAio50KALI0AIAoAAAA4AISUAVojY32ebb2pFICAOA74adZsU6dAADApW67l484AAAAaAC0DAB+KV4uT79DVLRlwX4iKuZyKV62T7+DVcx+xX4iKsoFGQAAz0/rSQCZ5XUAAP585hgAAAAAAAlIYAABAAAAAAAAAACUheQFAEAZQ2wkAIhhWQAAAACEtImojmLsMcrtToMBAAAo5htEtQAAig/AB4AFANAAfriN22+/g4Ua/cNtf0JU4XC4jdtvv4OFGv3DbX9CVBRABgDAp54CgKhbp5hZBYCof0wAAAAAZCOBYVhVxQAAAAAAANTw3QAAqEsYchMAAETOKwAAALBxpNBKf1Zru2rtMQIAAACAH2AATnACnx8AHAYMjik4zAcW+seJw1Kt/nyOvoEASTbEiSuiFlPMORM8Z/499bnbdK2Sjt9jdNijKo0zDsghBwinDd7ojddvv0CFdizg2LuoYNDojddvv0CFdizg2HvRjwPSASDj9DrVPwAAAMAxAQAAAACAYVQRGAMAAAAAABAEjPX/KgmAVAAApQAApjBRAAAcfzM17R2ijgAAEJ7ylg32FgcAAACA/jFUPpYfBTgrgMPjvQQpBVy2USVnDMYCPAiAggMUgAw+mI3n1/2akN5dcJxd9GMwmI3r1/1SSJ81OE45+jgczQkAAPADABgAELVn8ueTagAAAABgGKaMVMUYAAAAHKw2NWsmhihpbwIARL99BACoRX4GAACNfV8WAACArE0IIQRCLnFBsRt6qAIAkNLVbzAMgA8AFdB0hAEA/DF8LsCPcvzwptbvAOCzD9N54OQ+WLYkB0KK74ylV2EXyYEs0DfbWOIPw0DsZ6G28F0Ln7Ir4qttVMfLN6NBHPUTm+Q008gCAL75/bnu27Wl3uVTs9M2s7D5/XVdt6ul3uV3zU7bOwV+AAAAEMVNJ98AAAEMf16cAgCYYuMswzJ0MFYBAAAAAKC1AgAC5QGkoj2/BwDIcpujAAAqkjfjV7ZZFAAAFDNjQwWkgKgAaWZZAABIxSO5gwM/93v+++5jcZ4/jm+bDcCG/gbnwD7A1zmnv+3vv5/9FVAH2KeZPWz6254D1G9zvp397WuG+W7ANANfO/z33+cPX2ccqvlsNkBxnE777zc4Pg74/sdxnd8BUwe7NuxNb8j8Y3/YrZ/Pe67zQwcHrBn8AFQ8ANMARUhQDgAMAg0A/jn+cxs/+dRqZtuiD0Pn+Nd1uudLab/bts7hwA8AAAAyot53tQQgsjqjroA5JgAAU8UwDMMABgAAAAAAAIBmJAAAAICQoaUxKQAA6nP77wIAgIrc3gcAXGPVpSUMJQDA2VovAAAA4P9PdTipH36cGmrzHSgAzh7qO3zPP9XnnNNs+Fb9+2w25IbeA3yHvYE/juv8fHaccYDD8Z0FfhTw41j8/H9/3msn8F+14AR+4KP5oKmOjwXg8oMDQAMgAF7J/X4c29i07xAM233IDZXbn/u+hpI+QzTs1J3DDT8AAACgnvEDAJgGAGaPrbcAANiUqopNSQ2KAQAAAKA0AIASzSErlRfYKDUAQEAAAEDDrG4tAAAA+gl6AzUSRQo30uUOepurAABIg2JTAkAHgPr54vzANzhUczjnO4dD7s3ZcDjfLO+dzh/nD7Bhf3G+N4fz+fPRPx8nbPacQ8/35PCtDr/DPnuTnOHs7+zNPpzecA4cevOZHKqp3ABnn+79jfxv5nTWL/kA9fnDd/2O/30gk958NrDpzf9A08kk+/BT9Zt/b76fw/6igWF6YyEQ4FUY2u2rIa2l4dWSxY20XkKDkxkgpxwECPUzNIwAET55/XOfxhDiPX4ptpPlWLn9e597Furdflfs1BfLhx8AAACINeOrDbSPnx4AAFvFJpZNSVUBAAAAAEoNAJDfD9lryJ4c5OQjuxYAuhY32W2/UTIAALDK0jV1cYpEuNwIxe1k2x4AAFB/DBsSOGz4zvn9w4zv1X8zD5z9/2LX5sAB5jubc3oX5/tpzuEb1Mk553A4h/yfk6f57dx8r++7YNc57I/z7R++AsXZfObk3hs2/M/hGx8S9jkO8/m3Kh0dHWF8/Vdpcs8U35Odf97cjv/Uh8/snfv7Zpj+n3Pge+/D4ZwGTqs1w4nGWbCH3nXqB4AzBxA09g1h9eaMywQIJFu1w80q8FxKCK0WskNdwwc+Sv6fS1nexO0DO3U1jJL/51KWN3H7xE5bC18CACwBeyQBLFPFMAwAYAAAAAAAAIA2FQBAAQAAdRi43VAAAFpAI83NBYEUCClAChYAAHJsBwAA/EDZmMzA4XD8fL5+HA7Hz2ewgX02fGdvWACOzw/33/8fMBv2nE0DnP292UV9/7D3LvYB5nAANt/hfDanNxtys3GYjo4/aMf/7/kxTpTjHzAbmAI4+J4/AACzFeAAPlr+x89yahcb7BQwWv7Hz3JFF9MDJ7kCXwAA6I/9dAEADJtYhmEYAAAAAAAAAACojQQAajoUAAsW2rq3FZASZAghALDKAgAAHKuOoQAAGvQ2yx+Hszo+P4zK4If/nIDDOGbj+PyvnCj4JYfzDQAOh32AzZ9de+yP4+NwthxfnY6P4+dj+Jx9ADbf6DlKgYP/FfWfUh355wDnB+ADPwAATlAAFqgAALAA3nj9/RhTwn3DL9wy1NA4/fNoAfEtF44MwuErAMC6slWVWKabldKgCAAAAIBGAQAM9GaKVqciFTWQcQlstcjw3jErctspPqbn7Q+j+jDm2WN+kMVCM5hvZx8OACw2FkDBNMUETF+cnZvN9803Nnwc/39m4ORrc5I9bDZ831+9YR++ADabc5LOzeE7U7B3fR323hsOJJuzYX8bDmzobwUAh291YB/I/9k0sE9u2P8pYPPf8d9/n/95zwfHfzOdzHc2AGwOe356hjfj7LQ43/P5AZg+HHlPDTWFOzp2/Py5ThxA49//3/uMHAgMRmb3JTGRPMqO/wAh+Z/BWIkZlZyWf28PlFRCdJNafCl/NduqL/g6nUIIsbnCBATeSP31GHdcbLDT4tCI/XWfz6bm9sJJqYYvAgDsTbbYqsQyyaCoWAAAAICoAQDM9KYqggBsOyQdDGQBfN/8q2bRPk9wyCv8cj6VYd/TPE0TTMDM/u4aONbnyXECx/8dnPz3wfHj5PuP+v/nMN/hbIDNPhz4tmED3ylgOL3Pps/v28HhcCrH7A+dUJv8nzr7bA7JkPts9vfmsIE95wB8P4dT9XW+54E9AJzOs2efzfcfm686h8PZzfl8G+fnp9YZ/Ps4MR0/11byYYr5AXvO51vHz7//Pvz3Y+A639dpgL0Pp89vf1LmIYDbFz+hdPP/ek6PnE2n1ydYJFvb/8nXX3yxW/sbA8jGNqPREQTRWkQQIGoAHle8vFMGxA0aEFe8vFORizQAWH4DAHi4AtjXla1iU2KTKqqKFQNAzQQA48OnkYerlXL619ttJ7Wd5Ti/0XhTEKrilDyqZP5pO/HP9+bDmX+e782Lfs/de8zM9yaYpx2ruZWvZ5x54vDuDOyz9/7e+3AOmz3BDPM8f+1MTPPv24Z99tkcevM/jh/H1/9/fptqOGd/gzq7+Hb4zvc+5BR8Y+/+NpwNbD5TcPYAnJN8//7b+8AB9gHGbJjx+fdz4HufDWw4ZObm5D594P+dhs/u59ORc3bl3lOH+eqT/zq+b9qOn2o/6/3nn/MzB/YUXwCwgYS9C87n2xycgfDkFBHzmdS0YmpdncKudfLfZa+9HjVx9QLZrFPJFmAQ+lswqmLZvZmiTkCA06D+DyxbxsNkaAAGCgC/RAEDfmfclx48AIC65DGODaQJAK+yUkIKKeRWVVWVmJRUVVUxAPgoaow26ZgQ4mBasbBq1eJAe8ecGxNj9PrGAaaVPEvLvBFDZhnRIxmR0a3bhGHQ3UIFtbtHCitQaEVxnEGtubCypC05liYmIuZqj2RL5RRGrKX2+1xlqczCinCpx61xa26EUc88lyuFURv1W5LdKvPwHuFRz7TGLdxXu7Jnuset7Rau7LeUNa16j3AJ03q/UlP0vjvxuUbzd1t8MXL7iDzW9cmnKFJIYTqL/L3ViVGq6VA89A7i7eyh8z2ZxTYmn3wK0qtXYezYsX29hWlu6tdy42exeVlHIvGu1+t1T3kntV6v1yE2Ekkig8mVeqm8lPV6vQ6RSIRer3sqzamSW96zuR8bCZE+1+vlnJLiZ71er00kQK8OPpb87yxfugBuYCz531m+dAHcAAAAAAAAAAAAAAAAAAAA");
				var SND_twoTone = new Audio("data:video/ogg;base64,T2dnUwACAAAAAAAAAABjfwAAAAAAAC0oboIBHgF2b3JiaXMAAAAAAUSsAAAAAAAAcBEBAAAAAAC4AU9nZ1MAAAAAAAAAAAAAY38AAAEAAABXxqTrDi3///////////////8RA3ZvcmJpcx0AAABYaXBoLk9yZyBsaWJWb3JiaXMgSSAyMDA3MDYyMgAAAAABBXZvcmJpcyJCQ1YBAEAAACRzGCpGpXMWhBAaQlAZ4xxCzmvsGUJMEYIcMkxbyyVzkCGkoEKIWyiB0JBVAABAAACHQXgUhIpBCCGEJT1YkoMnPQghhIg5eBSEaUEIIYQQQgghhBBCCCGERTlokoMnQQgdhOMwOAyD5Tj4HIRFOVgQgydB6CCED0K4moOsOQghhCQ1SFCDBjnoHITCLCiKgsQwuBaEBDUojILkMMjUgwtCiJqDSTX4GoRnQXgWhGlBCCGEJEFIkIMGQcgYhEZBWJKDBjm4FITLQagahCo5CB+EIDRkFQCQAACgoiiKoigKEBqyCgDIAAAQQFEUx3EcyZEcybEcCwgNWQUAAAEACAAAoEiKpEiO5EiSJFmSJVmSJVmS5omqLMuyLMuyLMsyEBqyCgBIAABQUQxFcRQHCA1ZBQBkAAAIoDiKpViKpWiK54iOCISGrAIAgAAABAAAEDRDUzxHlETPVFXXtm3btm3btm3btm3btm1blmUZCA1ZBQBAAAAQ0mlmqQaIMAMZBkJDVgEACAAAgBGKMMSA0JBVAABAAACAGEoOogmtOd+c46BZDppKsTkdnEi1eZKbirk555xzzsnmnDHOOeecopxZDJoJrTnnnMSgWQqaCa0555wnsXnQmiqtOeeccc7pYJwRxjnnnCateZCajbU555wFrWmOmkuxOeecSLl5UptLtTnnnHPOOeecc84555zqxekcnBPOOeecqL25lpvQxTnnnE/G6d6cEM4555xzzjnnnHPOOeecIDRkFQAABABAEIaNYdwpCNLnaCBGEWIaMulB9+gwCRqDnELq0ehopJQ6CCWVcVJKJwgNWQUAAAIAQAghhRRSSCGFFFJIIYUUYoghhhhyyimnoIJKKqmooowyyyyzzDLLLLPMOuyssw47DDHEEEMrrcRSU2011lhr7jnnmoO0VlprrbVSSimllFIKQkNWAQAgAAAEQgYZZJBRSCGFFGKIKaeccgoqqIDQkFUAACAAgAAAAABP8hzRER3RER3RER3RER3R8RzPESVREiVREi3TMjXTU0VVdWXXlnVZt31b2IVd933d933d+HVhWJZlWZZlWZZlWZZlWZZlWZYgNGQVAAACAAAghBBCSCGFFFJIKcYYc8w56CSUEAgNWQUAAAIACAAAAHAUR3EcyZEcSbIkS9IkzdIsT/M0TxM9URRF0zRV0RVdUTdtUTZl0zVdUzZdVVZtV5ZtW7Z125dl2/d93/d93/d93/d93/d9XQdCQ1YBABIAADqSIymSIimS4ziOJElAaMgqAEAGAEAAAIriKI7jOJIkSZIlaZJneZaomZrpmZ4qqkBoyCoAABAAQAAAAAAAAIqmeIqpeIqoeI7oiJJomZaoqZoryqbsuq7ruq7ruq7ruq7ruq7ruq7ruq7ruq7ruq7ruq7ruq7ruq4LhIasAgAkAAB0JEdyJEdSJEVSJEdygNCQVQCADACAAAAcwzEkRXIsy9I0T/M0TxM90RM901NFV3SB0JBVAAAgAIAAAAAAAAAMybAUy9EcTRIl1VItVVMt1VJF1VNVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVN0zRNEwgNWQkAAAEAwByEzi2okEkJLZiKKMQk6FJBBynozjCCoPcSOYOcxxQ5QpDGlkmEmAZCQ1YEAFEAAIAxyDHEHHLOUeokRc45Kh2lxjlHqaPUUUqxphgzSiW2VGvjnKPUUeoopRpLix2lFGOKsQAAgAAHAIAAC6HQkBUBQBQAAIEQUgophZRizinnkFLKMeYcUoo5p5xTzjkonZTKOSadkxIppZxjzinnnJTOSeWck9JJKAAAIMABACDAQig0ZEUAECcA4HAczZM0TRQlTRNFTxRd1RNF1ZU0zTQ1UVRVTRRN1VRVWRZN1ZUlTTNNTRRVUxNFVRVVU5ZNVZVlzzRt2VRV3RZVVbdlW/ZtV5Z13zNN2RZV1dZNVbV1V5Z13ZVt3Zc0zTQ1UVRVTRRV11RVWzZV1bY1UXRdUVVlWVRVWXZl17ZVV9Z1TRRd11NN2RVVVZZV2dVlVZZ1X3RVXVdd19dVV/Z92dZ9XdZ1YRhV1dZN19V1VXZ1X9Zt35d1XVgmTTNNTRRdVRNFVTVV1bZNVZVtTRRdV1RVWRZN1ZVV2fV11XVtXRNF1xVVVZZFVZVdVXZ135Vl3RZVVbdV2fV1U3V1XbZtY5htWxdOVbV1VXZ1YZVd3Zd12xhuXfeNzTRt23RdXTddV9dtXTeGWdd9X1RVX1dl2TdWWfZ93fexdd8YRlXVdVN2hV91ZV+4dV9Zbl3nvLaNbPvKMeu+M/xGdF84ltW2Ka9uC8Os6/jC7iy78Cs907R101V13VRdX5dtWxluXUdUVV9XZVn4TVf2hVvXjePWfWcZXZeuyrIvrLKsDLfvG8Pu+8Ky2rZxzLaOa+vKsftKZfeVZXht21dmXSfMum0cu68zfmFIAADAgAMAQIAJZaDQkBUBQJwAAIOQc4gpCJFiEEIIKYUQUooYg5A5JyVjTkopJbVQSmoRYxAqx6RkzkkJpbQUSmkplNJaKSW2UEqLrbVaU2uxhlJaC6W0WEppMbVWY2utxogxCZlzUjLnpJRSWiultJY5R6VzkFIHIaWSUoslpRgr56Rk0FHpIKRUUomppBRjKCXGklKMJaUaW4ottxhzDqW0WFKJsaQUY4spxxZjzhFjUDLnpGTOSSmltFZKaq1yTkoHIaXMQUklpRhLSSlmzknqIKTUQUeppBRjSSm2UEpsJaUaS0kxthhzbim2GkppsaQUa0kpxhZjzi223DoIrYVUYgylxNhizLm1VmsoJcaSUqwlpdpirLW3GHMNpcRYUqmxpBRrq7HXGGPNKbZcU4s1txh7ri23XnMOPrVWc4op1xZj7jG3IGvOvXcQWgulxBhKibHFVmuLMedQSowlpRpLSbG2GHNtrdYeSomxpBRrSanGGGPOscZeU2u1thh7Ti3WXHPuvcYcg2qt5hZj7im2nGuuvdfcgiwAAGDAAQAgwIQyUGjISgAgCgAAMIYx5yA0CjnnnJQGKeeck5I5ByGElDLnIISQUucchJJa65yDUEprpZSUWouxlJJSazEWAABQ4AAAEGCDpsTiAIWGrAQAUgEADI5jWZ5nmqpqy44leZ4oqqar6rYjWZ4niqqqqrZteZ4pqqqquq6uW54niqqquq6r655pqqqquq4s675nmqqqqq4ry75vqqrruq4sy7Lwm6rquq4ry7LtC6vryrIs27ZuG8PqurIsy7Zt68px67qu+76xHEe2rvu6MPzGcCQAADzBAQCowIbVEU6KxgILDVkJAGQAABDGIGQQUsgghBRSSCmElFICAAAGHAAAAkwoA4WGrAQAogAAACKstdZaY6211lqLrLXWWmutpZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSAQBSEw4AUg82aEosDlBoyEoAIBUAADCGKaYcgww6w5Rz0EkoJaWGMeecg5JSSpVzUkpJqbXWMueklJJSazFmEFJpLcYaa80glJRajDH2GkppLcZac889lNJai7XW3HNpLcYce89BCJNSq7XmHIQOqrVaa845+CBMa7HWGnQQQhgAgNPgAAB6YMPqCCdFY4GFhqwEAFIBAAiElGLMMeecQ0ox5pxzzjmHlGLMMeecc04xxpxzzkEIoWLMMecghBBC5pxzzkEIIYTMOeecgxBCCJ1zDkIIIYQQOucghBBCCCF0DkIIIYQQQugghBBCCCGE0EEIIYQQQgihgxBCCCGEEEIBAIAFDgAAATasjnBSNBZYaMhKAAAIAACC2nIsMTNIOeYsNgQhBblVSCnFtGZGGeW4VQohpDRkTjFkpMRac6kcAAAAggAAASEBAAYICmYAgMEBwucg6AQIjjYAAEGIzBCJhoXg8KASICKmAoDEBIVcAKiwuEi7uIAuA1zQxV0HQghCEIJYHEABCTg44YYn3vCEG5ygU1TqIAAAAAAADADgAQDguAAiIprDyNDY4Ojw+AAJCQAAAAAAGAD4AAA4RICIiOYwMjQ2ODo8PkBCAgAAAAAAAAAAgICAAAAAAABAAAAAgIBPZ2dTAARVLgAAAAAAAGN/AAACAAAAGC2JEBokIBsYFxoaTkJFFhYYGh0bHiBvVVBeY1AvAazSs+OtJO2Gp/uX64BAadTDVfyobstqO3JtJ6f7XSyXNeW8B6zQW6Uqxi3ELlvvDDCQiPYe+ssvL+fpSx6PMPUMWGIDvNhV21SQp3AQjWQxzwAAAbi2MFIVO4zZNI0F5OA7tStIXKhopKcVCQAIAOgxJC1WrIEH9OR7pStI/JCe/jUaAACA+ZYQve7H1QLs5FftUWzHv63K/mpwFQAAAADm58/CvyYAAPTii/xRjIV3qVu5l4LPAgAAAMByzAf+ZQMAmkm2vzbL52p6NYwYvv5h7X8wvGc755xzTgBV7JYAYHSrAAAAAAAAAAAFiPsfDXqF41OAGGOMMcaREQAAAAAY1zc/9rGa/VEKO+cMVPETXike/vPru39ZY1TLP6+klST2T4aAGACO6/kTAHi6LADwZaupAAAAAAAAAAACKgB1hBiDAAAAsebiAABA9WsAAAAAdqjd+N+bf8+f7N880j//+BpEDKnhEYgBgMhtAIDtVgUAAAAAAAAAEMK6rCFIwPe08SsBQghBgIUDAAAAOLsb2D0SXz0A1Ny/3y/JxKpWAAAAACgBAMWXfx3TBdTcv91XbKJvRaIDAAAAAFq/dG4TAADU3L/9qySptco5VgcAAABASI+qyS0BACTE2L/3W0lmVm9EAwAEeMPfQmPWFwCvY189AMTYP+A9JYkdcq4iNQCgMFpfm2HeKQB2nZKqiPDY3N6L7FWSWMHmH5IsAIAAMDmnXTKzvmChCSoAHOFn8xXPkKR+nM32J7AXAAACwOSQuX98pNcKgKUALOG7fRWLoTqNEgAAAADwrAQ4Ba/rmnAnGxs98NADkAD6CfZfZ+uXXTPUU15JNUnDkxMA4JwDxhjgcVyVAADs8y8+knwCAJ0AAAAAAIA6ADivg+m6rusS2Y8hHo/v+44IRWvHPZ8DMcaoUQGAnLbQQmgAAEA1X9MIAAAAp2lvN13++PjBwbmO+pvRcgq+TQAe6j2/R+UGsv2D/e0pr6SqHWV2/vsFAKhzAIAHAHw5GQAAAAAAAAC0nyy3L8mvIt0BQKsXAAAAoNYYAAAAgJPtHvThQ8bt4sfOC2AFALBz6MadM9sRnrr988srC8z676PLLf/4YsPwov3VCWgAG8CKM5YHAHxWAgAAAAAAAMBiF2H5hi+mR0oBwOPynWdbRnMFAAAqcwYBAADgxx4fdPbf3s/rGjT+ef2/vmeVBUJ9RY+yvZIq5bHrW3b+ICJst9SSDcCJM7BNAAAAQEQEEKCniu37fkOOL449AQBK/zQQWUsAAAD4039nRUg2atyXzAUAwEYdPDQA0OGRAJioBwAFEiAAPlr9f86+oxrB6in6/L/9wWcaftn/zTOItC1DBEA6J9gOAAAgIiJA1MS0KPb4VlEJ6Q8ANJJeksIcAAAA8FumWiGOcqSHPdmbYnAAoPNfoGMCQMEE4NGBBQCzEgAJYIIO8IAJHjn9f44+SuhqQ9wY/jjqTGzkdgZCF0BARAQI4UjXPvbMy/LCP+14pKnJ8wjAfx+nCgDgM07ixwwAwB8+AACgAwSggEUCICBhRwENAAsToACeJ/2fMy2ausEGWvVIAAABChAgIoAA7DGjVhMHAODOcwI8kAAFCQQACzrgAQKABg4=");
				var SND_quiet = new Audio("data:video/ogg;base64,T2dnUwACAAAAAAAAAAAzeQAAAAAAAGMW9OABHgF2b3JiaXMAAAAAAkSsAAAAAAAAAHcBAAAAAAC4AU9nZ1MAAAAAAAAAAAAAM3kAAAEAAACApmwcEC3//////////////////+IDdm9yYmlzHQAAAFhpcGguT3JnIGxpYlZvcmJpcyBJIDIwMDcwNjIyAAAAAAEFdm9yYmlzJUJDVgEAQAAAJHMYKkalcxaEEBpCUBnjHELOa+wZQkwRghwyTFvLJXOQIaSgQohbKIHQkFUAAEAAAIdBeBSEikEIIYQlPViSgyc9CCGEiDl4FIRpQQghhBBCCCGEEEIIIYRFOWiSgydBCB2E4zA4DIPlOPgchEU5WBCDJ0HoIIQPQriag6w5CCGEJDVIUIMGOegchMIsKIqCxDC4FoQENSiMguQwyNSDC0KImoNJNfgahGdBeBaEaUEIIYQkQUiQgwZByBiERkFYkoMGObgUhMtBqBqEKjkIH4QgNGQVAJAAAKCiKIqiKAoQGrIKAMgAABBAURTHcRzJkRzJsRwLCA1ZBQAAAQAIAACgSIqkSI7kSJIkWZIlWZIlWZLmiaosy7Isy7IsyzIQGrIKAEgAAFBRDEVxFAcIDVkFAGQAAAigOIqlWIqlaIrniI4IhIasAgCAAAAEAAAQNENTPEeURM9UVde2bdu2bdu2bdu2bdu2bVuWZRkIDVkFAEAAABDSaWapBogwAxkGQkNWAQAIAACAEYowxIDQkFUAAEAAAIAYSg6iCa0535zjoFkOmkqxOR2cSLV5kpuKuTnnnHPOyeacMc4555yinFkMmgmtOeecxKBZCpoJrTnnnCexedCaKq0555xxzulgnBHGOeecJq15kJqNtTnnnAWtaY6aS7E555xIuXlSm0u1Oeecc84555xzzjnnnOrF6RycE84555yovbmWm9DFOeecT8bp3pwQzjnnnHPOOeecc84555wgNGQVAAAEAEAQho1h3CkI0udoIEYRYhoy6UH36DAJGoOcQurR6GiklDoIJZVxUkonCA1ZBQAAAgBACCGFFFJIIYUUUkghhRRiiCGGGHLKKaeggkoqqaiijDLLLLPMMssss8w67KyzDjsMMcQQQyutxFJTbTXWWGvuOeeag7RWWmuttVJKKaWUUgpCQ1YBACAAAARCBhlkkFFIIYUUYogpp5xyCiqogNCQVQAAIACAAAAAAE/yHNERHdERHdERHdERHdHxHM8RJVESJVESLdMyNdNTRVV1ZdeWdVm3fVvYhV33fd33fd34dWFYlmVZlmVZlmVZlmVZlmVZliA0ZBUAAAIAACCEEEJIIYUUUkgpxhhzzDnoJJQQCA1ZBQAAAgAIAAAAcBRHcRzJkRxJsiRL0iTN0ixP8zRPEz1RFEXTNFXRFV1RN21RNmXTNV1TNl1VVm1Xlm1btnXbl2Xb933f933f933f933f931dB0JDVgEAEgAAOpIjKZIiKZLjOI4kSUBoyCoAQAYAQAAAiuIojuM4kiRJkiVpkmd5lqiZmumZniqqQGjIKgAAEABAAAAAAAAAiqZ4iql4iqh4juiIkmiZlqipmivKpuy6ruu6ruu6ruu6ruu6ruu6ruu6ruu6ruu6ruu6ruu6ruu6rguEhqwCACQAAHQkR3IkR1IkRVIkR3KA0JBVAIAMAIAAABzDMSRFcizL0jRP8zRPEz3REz3TU0VXdIHQkFUAACAAgAAAAAAAAAzJsBTL0RxNEiXVUi1VUy3VUkXVU1VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU3TNE0TCA1ZCQCQAQCgEFtLrcXcCWocYtJyzCR0TmIQqrEIIke1t8oxpRzFnhqIlFESe6ooY4pJzDG00CknrdZSOoUUpJhTChVSDlogNGSFABCaAeBwHECyLECyNAAAAAAAAACQNA3QPA+wPA8AAAAAAAAAJE0DLE8DNM8DAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEDSNEDzPEDzPAAAAAAAAADQPA/wRBHwRBEAAAAAAAAALM8DPNEDPFEEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMDRNEDzPEDzPAAAAAAAAACwPA/wRBHwPBEAAAAAAAAANM8DPFEEPFEEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAQ4AAAEGAhFBqyIgCIEwAwOA40DZoGzwM4lgXPg+dBFAGOZcHz4HkQRQAAAAAAAAAAAAA0z4OqQlXhqgDN82CqUFWoLgAAAAAAAAAAAACW50FVoapwXYDleTBVmCpUFQAAAAAAAAAAAABPFKG6UF24KsAzRbgqXBWqCwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAYcAAACDChDBQasiIAiBMAcDiKZQEAgOM4lgUAAI7jWBYAAFiWJYoAAGBZmigCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAABhwAAAIMKEMFBqyEgCIAgAwKIplAcuyLGBZlgU0zbIAlgbQPIDnAUQRAAgAAChwAAAIsEFTYnGAQkNWAgBRAAAGRbEsTRNFmqZpmiaKNE3TNE0UeZ6meZ5pQtM8zzQhip5nmhBFzzNNmKYoqioQRVUVAABQ4AAAEGCDpsTiAIWGrAQAQgIADI5iWZ4niqIoiqapqjRN0zxPFEXRNFXVVWmapnmeKIqiaaqq6vI8TRNF0xRF01RV14WmiaJpmqJpqqrrwvNE0TRNU1VV1XXheaJomqapqq7ruhBFUTRN01RV13VdIIqmaZqq6rqyDETRNFVVVV1XloEomqaqqqrryjIwTdNUVdeVXVkGmKaquq4syzJAVV3XdWVZtgGq6rquK8uyDXBd15VlWbZtAK4ry7Js2wIAAA4cAAACjKCTjCqLsNGECw9AoSErAoAoAADAGKYUU8owJiGkEBrGJIQSQiYllZRKqiCkUlIpFYRUUiolo5JSailVEFIpKZUKQiqllVQAANiBAwDYgYVQaMhKACAPAIAgRinGGGMMMqYUY845B5VSijHnnJOMMcaYc85JKRljzDnnpJSMOeecc1JK5pxzzjkppXPOOeeclFJK55xzTkopJYTOOSellNI555wTAABU4AAAEGCjyOYEI0GFhqwEAFIBAAyOY1mapmmeJ4qWJGma53meKJqmZkma5nmeJ4qmyfM8TxRF0TRVled5niiKommqKtcVRdM0TVVVVbIsiqZpmqrqujBN01RV13VlmKZpqqrrui5s21RV1XVlGbatmqoqu7IMXFd1Zde2geu6ruzatgAA8AQHAKACG1ZHOCkaCyw0ZCUAkAEAQBiDjEIIIYUQQgohhJRSCAkAABhwAAAIMKEMFBqyEgBIBQAAkLHWWmuttdZARymllFJKqXCMUkoppZRSSimllFJKKaWUSkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKBQAuVTgA6D7YsDrCSdFYYKEhKwGAVAAAwBilmHJOQikVQow5JiGlFiuEGHNOSkoxFs85B6GU1losnnMOQimtxVhU6pyUlFqKragUMikppdZiEMKUlFprpbUghCqpxJZaa0EIXVNqKZbYghC2tpJSjDEG4YOPsZVYagw++CBbKzHVWgAAZoMDAESCDasjnBSNBRYashIACAkAIIxRijHGGHPOOeckY4wx5pxzEEIIoWSMMeeccw5CCCGUzjnnnHMQQgghhFJKx5xzDkIIIYRQUuqccxBCCKGEEEoqnXMOQgghhFJKSaVzEEIIoYRQQkklpdQ5CCGEEEIpKaWUQgghhBJCKCWllFIIIYQQQiihpJRSCiGEUkIIpZSUUkophRBKCKWUklJJKaUSSgkhhFJSSSmlFEIIJZRSSioppZRKCaGEUkoppaSUUkohlFBCKQUAABw4AAAEGEEnGVUWYaMJFx6AQkNWAgBkAACUslJKKK1VQCKlGKTaQkeZgxRziSxzDFrNpWIOKQathsoxpRi0FjIImVJMSgkldUwpJy3FmErnnKSYc42lcxAAAABBAICAkAAAAwQFMwDA4ADhcxB0AgRHGwCAIERmiETDQnB4UAkQEVMBQGKCQi4AVFhcpF1cQJcBLujirgMhBCEIQSwOoIAEHJxwwxNveMINTtApKnUgAAAAAAAMAPAAAJBcABER0cxhZGhscHR4fICEiIyQCAAAAAAAGAB8AAAkJUBERDRzGBkaGxwdHh8gISIjJAEAgAACAAAAACCAAAQEBAAAAAAAAgAAAAQET2dnUwAEAUMAAAAAAAAzeQAAAgAAABVnPF8USVHy2Ojs1tCwtJKQdWFOQT09NQG0UjXwh1/YKpVEf7mwczq3ymxXQHFy5YdDWH0f38bPp0UQD2C+y2rmZzOD+PLzkM8dHJhrZsoPq9M3R50+azq//fXfnB+0PyUHrFL1+FkdfrGF9lM+fHn+gObcK9mu/tsmV33FjgCIDzCcyx40JcdkVdQ5+6uT62+4/iW/+/GLmz+PXdBZF8uYf3hY3EneGWsmWho+IkC8v4YBWif9fQ7o6zzC4+tIzT8X+eqkf8/h+ir+4PJ1o9afV/C8ZXo5nuJtz/7T8apVGoQgAiDAWOB/IQUAdOtdv4yeWtr7j588XQAAAADsgAoAAAAAfyD5yJX3oP95e3L2ko5t19tFpj3MZ1W//DFfQZ7qL9YVHnKyj80CAAZg5kiZfwss/X0RWeyvzynI+zl4zB8fncD9zfuC6JMPwHzwdAbynTMBeUEumuq2X15g/e5gH38J3T6F+HwBN+ALrHadkLB+KPK949nV3serT8/H++qhKQRAo/26v75qxfvCv6sM/Ghg6r+dnybPGKX/UBWA/4kIAKBeJ/0+s6pNns3lm2wxwleYyPKkf7fDtBw/uH1PoRnhX4rwDqf4fvFCSIchwAgJFgDAWADDM29evz9b4PP//38mY2sBAKABAAAAQNmWu617ueuef4TOr98Nz07XCif1vfjkbt6RhhcND7096V/uOSu3e3e74c9MCi7m6yCPwNXwRUPoYLcAEcH2vAbw5fbXAMe7wfVnAdpPgH6BNy/wXoA5S4AF4BXgRJcTR6MRNADYMwjcxWBj+Gplzy8ePTx9qk0BIDSaRGT9j6fpt6EAVCBt07+Nmy8pAADeJv048krwg+e3IrX7eRPem/RnH1KKPrh9K1G7nzcQe1ERFaVKEpADoCUFADwAl3Ws+haBb9cfPT0AAAAAxgoAAAAAAB8vi7r3yrW3ifO9rXvRBhBmSLj3kzXdM7Zqm5NF5Ep73O3H9/tFawE3vDTHAACAiC/9sg3mP7/n4Pxw/Qssdp//YTMPg0E3oBbDOej/BWS/F4AP5DtRAZpzDuzeK9Qd4PnZgfkC9HA4hwRpod1wFw9sJIvjjzweChd/Gf/5uU+9u3q1p78Pm7Yg0KIwrz28e4OLKHfLm4umgknRDwUBAAhNol8B3ib9teai/4PLV5naft6S/Cb92vM6iz94v4YRvpIFp53OjhWWRhJEAGCRAQAegM8+jdB7sZ+lde3fu/J0AgAAACABABCE4ZE8LzOmudLDfTTzr90BgJEkmY3XvC9uzT9fX37WMG3j/srD/XK/zwbsPj9+L4KLL9/A3KN56MaPH40gX1eg380FZHuZL0Fe7s6Bt1soF+gZfK97AQU+BfSbwmyL4FtOnTwAxNzIu9M3yXb43uEz7haHZ9dO288v8ezffxkrsaKbwLl0umqDr+DRCdp+F+ctBw+lzbMLAAFpuh5n/mvbKACg4YADyAA+J/19DGqFfHC7nhjhLRs7J/2z59SDn8nlmTDCV4ScLSWzlLwgQQ6AUjk+q29UpACAC9zTgNbvqfWzf5/98eF7iz8/XfZ7AACgAAAABmEnqRZpo3RnOL9z/lB/R9a5vd/51vp29yj82Z85AGYgzDRl/1PdklK240jRjx03kbFEBvx5vYu7FvfTE3Kdr1sw/3mC793nfGFDOgIF9DjPgA878MUO+OQBroOA6wrk0+YVfgNspWgIEkpAQMhKYjlePn5/7JOkkqa8DRy0hTbpe6JOADIgAAEAPif9ew7qgke43IOa/ryxe9L/rkO64A8uVymsmn/O0hyr5BQh2OwAYDzi6lSkAwCMwPFbz1zNVC7b/3/77TdXMAAAYAEADIMwxAMnxb8z2dmo/dTZ1v1/xO6WZ+6Nzvm6mdyhe2eSYXbX+d07xjbzd/vnrq6iSREOf14UOowfkKnA3Q38PX5C/CXA9QG2vYU50y+4/s0XsM25saN80wbcE3CtCp1IsIEGzOYRjdFpEQc+cax+jijRACDQWL7bpZoWAABtRHz/QxIEAGCgARxAA14n/e8c1B04wsUmtf7M2lkn/fcc1Acc4WKH2n7OKts5jwIh2KQAIGEBAJQ2C/dDZwQAAHAAAMMgwGcnHT/mNvcfS+63umnucsb9rotdmQm6WQpac5BuBfflKdhTMO3fANf/wFwNuHpAcwSYWxSxKAMTeDYg44AGaM787D+S49XYc/PXjZVf/lnyRtrQLp8GtABA5e4vsaoR7euoXnz5+ReXDTTy+3eGVADAZQgoAIgAXif978x++S/w+6b27yxtTvrvmdv4H1xgUrufs3zaOj6wyygJwSaCAUAqPL/AAgCYnuqOx8pXP1s3AAAADQAGQaT7q8fFkdaGaQd7p1WrvDPrm5itHwUy2kP75o0nkreoqqiAAlm/K0j//gHZAQlY2hl09oEtmRUuz+8fbIt5AnuEygCYKUAJQgOI2r7ZNn9+7ibWAABF1VvDl/5Le1trmnv9iygAaNLcRV8IAHAgADSgYQAyXif97+Q+PAW8NrXeLHZO+u9pPbwT+NjU7oc1DWwSoTAASGAAwG3eWwIAADAABEEQ1N/M0Pt3HdozE8KwzZkxOD3+69vdf9k2gE+BKtA74FKRrjVumfxBZsD0FMrwaQ6AxoEBAKcS+Xn6s/WfPF404vUjXBtL78VsBOB2fv3LNG2kpPt6ALS3jEtTAKABDkAzgAE+J/33gG/2BB6bWhdbnHTzHd/ZA7gGNdWythyu5OGI2AQFAgAggQFAs/l2cAEYADgAHAaBZeDw6fu0Ix6uYHn5+PJla2rUdUwAsF/3DeRX0sspUEL9AD6AEt+yxaYpAm3Cdh/R2ry63FNnXDV54TZEmwKAZOy4/P6ukjSSfqkABwCgbc5/KYAMHLgDEAIYAMg+J/33kB9mAG4Qz0n/PcSH48CyyXTh6QwRAAAAIGAAIKsDhEEMAEEYBHF3xui7f+7Lc7NfR5tlKgMIoLB9gGjg8osx14+3LOv356vfpkNCAADC8f7+Ng0aDYju4u3v0Gt7RDUQGhgAOLi95UxaAIAMNAwAjgNeJ/3vjF+mAW6gTvrfGb9MA9yAHgwCAACQQBAEdYThAAjCIIymyxe+9Et/+NnjORo4MlBhAgEctjxnX5b/P9N/nyf9qwgAIAGYRV00xn77WNICUDCAAwQAWhkABHAHKAAcHifdfC9vugIOMCf990hvugFugAUAAAAAADAYBEEZhGEQAEEYhtGfYV5wR3FRevy9H02bhoIB0ADs4kCXd5elAGigQTEADoUGAI0MwAEBHifdfC93ugIOECfdfC93ugIOwAIAAAAAACAIwzAcBmEABEEQhO3fS2wAHeCAwwk4gKZAbpADqDugAUDOADQOABz+Jv27l4eugAPESTffy52ugAPAAAAAAACAIAiDgzAMgCAIgtBscOAgACgAudEAMpARFBoHKBAAQBDAAOAAXif9b1vedAUcYE7671HedAUcAAAAAAAAAARBGDwMgzAIgjBwOAADGAxABgcIABUM0AAawAE4OEABB6AYAF4n/e8sX7oCDlAn/e8sX7oAbgAAAAAAAAAEQRiEYRAAAAAEQRAMQAgABIDWAAg0AHAKACIADg==");
				// Volume - valid range 0.0 to 1.0
				SND_loud.volume = 0.4;
				SND_twoTone.volume = 0.5;
				SND_quiet.volume = 1.0;
				
				var debug = false;
				var msg_alliance = 0;
				var msg_whisper = 0;
				var msg_officer = 0;
				function setFavIcon(o) {
					try {
						var canvas = document.createElement('canvas');
						var ctx = canvas.getContext('2d');
						var canvasCopy = document.createElement('canvas');
						var ctxCopy = canvasCopy.getContext("2d");
						var children = document.head.childNodes;
						var iconDom;
						var img = document.createElement('img');
						
						//get favicon by rel
						if (!document.getElementById("Favicon")) {
							for (i in children) {
								if (children[i].rel) {
									children[i].id = "Favicon";
									iconDom = children[i];
									//children[i].parentNode.removeChild(children[i]);
									break;
								}
							}
						} else {
							iconDom = document.getElementById("Favicon");
						}
						//on
						if (o === 1) {
							if (debug)
								console.log("o === 1");
							img.src = 'favicon.ico';
							img.onload = function () {
								if (canvas.getContext) {
									canvas.height = canvas.width = 16; // set the size
									//Chrome fix for 64px favicon
									if (img.width > 16) {
										canvasCopy.width = img.width;
										canvasCopy.height = img.height;
										ctxCopy.drawImage(img, 0, 0);
										ctx.drawImage(canvasCopy, 0, 0, canvasCopy.width, canvasCopy.height, 0, 0, canvas.width, canvas.height);
									} else if (img.width == 16) {
										ctx.drawImage(img, 0, 0);
									}
									ctx.shadowOffsetX = 1;
									ctx.shadowOffsetY = 1;
									ctx.shadowBlur = 1;
									ctx.shadowColor = "#000000";
									ctx.font = 'bold 18px "helvetica", sans-serif';
									if (msg_alliance > 0 || debug) {
										ctx.fillStyle = '#a5f25b'; //alliance
										ctx.fillText("!", 1, 15);
									}
									if (msg_whisper > 0 || debug) {
										ctx.fillStyle = '#ff95b3'; //outgoing whisper
										//ctx.fillStyle = '#c59eff'; //incoming whisper
										ctx.fillText("!", 5, 15);
									}
									if (msg_officer > 0 || debug) {
										ctx.fillStyle = '#fdf05f'; //officer
										ctx.fillText("!", 9, 15);
									}
									iconDom.href = canvas.toDataURL('image/x-icon');
									document.head.appendChild(iconDom);
								}
							};
						}
						//off
						if (!o) {
							if (debug)
								console.log("o is false or 0");
							//var el = document.getElementById("Favicon");
							iconDom.href = 'favicon.ico';
							document.head.appendChild(iconDom);
						}
					} catch (err) {
						console.log("CNCTAtitleMod: Problem swapping favicon " + err);
					}
				}
				
				function init() {
					try {
						var mainData = ClientLib.Data.MainData.GetInstance();
						var player_cities = mainData.get_Cities();
						if (player_cities.get_CurrentOwnCity() != null) {
							if (debug)
								setFavIcon(1);
							var current_city = player_cities.get_CurrentOwnCity();
							var playerName = current_city.get_PlayerName();
							var PNRegex = new RegExp(">" + playerName + "<", "i");
							var inBackground = false;
							var title0 = window.document.title = playerName + " - C&C: Tiberium Alliances";
							console.log("Changing Window title from: " + window.document.title);
							window.document.title = playerName + " - C&C: Tiberium Alliances";
							if (typeof webfrontend.gui.chat.ChatWidget.prototype.titleMod_showMessage === 'undefined') {
								webfrontend.gui.chat.ChatWidget.prototype.titleMod_showMessage = webfrontend.gui.chat.ChatWidget.prototype.showMessage;
								webfrontend.gui.chat.ChatWidget.prototype.showMessage = function (message, sender, channel) {
									//console.log("\nmessage: "+message+"\nchannel: "+channel);
									// 1 system white
									// 3 alliance
									if (channel == 3 && inBackground) {
										if (playNotificationSounds){
											SND_quiet.play();
											//SND_twoTone.play();
											//SND_loud.play();
										}
										msg_alliance++;
										setFavIcon(1);
									}
									// 5 officer
									if (channel == 5 && inBackground) {
										if (playNotificationSounds){
											//SND_quiet.play();
											SND_twoTone.play();
											//SND_loud.play();
										}
										msg_officer++;
										setFavIcon(1);
									}
									// 9 whisper
									if (channel == 9 && inBackground && !PNRegex.test(sender)) {
										if (playNotificationSounds){
											//SND_quiet.play();
											//SND_twoTone.play();
											SND_loud.play();
										}
										msg_whisper++;
										title1 = window.document.title = "(" + msg_whisper + ")" + playerName + " - C&C: Tiberium Alliances";
										setFavIcon(1);
									}
									// 15 AFK blue
									this.titleMod_showMessage(message, sender, channel);
								};
							}
							var CheckPageFocus = function () {
								if (document.hasFocus() && inBackground) {
									msg_alliance = 0;
									msg_whisper = 0;
									msg_officer = 0;
									inBackground = false;
									window.document.title = playerName + " - C&C: Tiberium Alliances";
									if (!debug)
										setFavIcon(0);
								} else if (document.hasFocus() == false) {
									inBackground = true;
								}
							}
							setInterval(CheckPageFocus, checkPageFocusDelay);
						} else {
							window.setTimeout(init, 1000);
						}
					} catch (e) {
						console.log("CNCTAtitleMod: problem loading player name:\n" + e);
					}
				}
				init();
				
			}
		} catch (e) {
			console.log("titleMod_init: ", e);
		}
		
		function CNCTAtitleMod_checkIfLoaded() {
			try {
				if (typeof qx != 'undefined') {
					titleMod_init();
				} else {
					window.setTimeout(CNCTAtitleMod_checkIfLoaded, 1000);
				}
			} catch (e) {
				console.log("CNCTAtitleMod_checkIfLoaded: ", e);
			}
		}
		window.setTimeout(CNCTAtitleMod_checkIfLoaded, 2000);
	};
	
	try {
		var CNCTAtitleMod = document.createElement("script");
		CNCTAtitleMod.innerHTML = "(" + titleMod_main.toString() + ")();";
		CNCTAtitleMod.type = "text/javascript";
		document.getElementsByTagName("head")[0].appendChild(CNCTAtitleMod);
	} catch (e) {
		console.log("CNCTAtitleMod: init error: ", e);
	}
})();


// ==UserScript==
// @name Tiberium Alliances Supplies Mod
// @description Some modifications to make the *improved shop feature* in the April patch a little bit more bearable.
// @namespace supplies_mod
// @include https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version 1.4
// @author KRS_L
// @updateURL https://userscripts.org/scripts/source/166220.meta.js
// @downloadURL https://userscripts.org/scripts/source/166220.user.js
// ==/UserScript==
(function () {
	var SuppliesMod_main = function () {
		function createSuppliesMod() {
			try {
				var strFunction = webfrontend.gui.monetization.ShopOverlay.getInstance()._activate.toString();
				var re = /this\.\_\_..\.setModelSelection/;
				strFunction = strFunction.match(re).toString();
				var baseSelectionList = strFunction.slice(5,9);
				var functionBody = "return webfrontend.gui.monetization.ShopOverlay.getInstance()." + baseSelectionList + ";";
				var fn = Function('', functionBody);
				webfrontend.gui.monetization.ShopOverlay.getInstance().baseSelectionList = fn();
				webfrontend.gui.monetization.ShopOverlay.getInstance().addListener("appear", function () {
					setTimeout(function () {
						webfrontend.gui.monetization.ShopOverlay.getInstance().set_SwitchTabByChildIndex(1);
					}, 1);
				}, this);
				
				var strFunction2 = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCityId.toString();
				var re2 = /this\.[A-Z]{6}/;
				strFunction2 = strFunction2.match(re2).toString();
				var functionBody2 = "var $createHelper;return parseInt(" + strFunction2 + ");";
				var fn2 = Function('', functionBody2);
				ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCityId = fn2;
				
				phe.cnc.Util.attachNetEvent(ClientLib.Data.MainData.GetInstance().get_Cities(), "CurrentOwnChange", ClientLib.Data.CurrentOwnCityChange, this, setSelection);

				var disableFundsCheckBox = new qx.ui.form.CheckBox().set({allowGrowY:false,height:26,marginLeft:5,marginTop:5,marginRight:7,label:"Disable Funds *",toolTipText:"* Only applies while in the Supplies interface.",maxWidth:145,alignX:"center"});
				disableFundsCheckBox.setValue(JSON.parse(localStorage.getItem("TA_Supplies_Mod_Disable_Funds")));
				disableFundsCheckBox.addListener("click", function () {
					localStorage.setItem("TA_Supplies_Mod_Disable_Funds", disableFundsCheckBox.getValue());
					webfrontend.gui.monetization.ShopOverlay.getInstance().close();
					webfrontend.gui.monetization.ShopOverlay.getInstance().open();
					setTimeout(function () {
						webfrontend.gui.monetization.ShopOverlay.getInstance().set_SwitchTabByChildIndex(1);
					}, 1);
				}, this);

				var suppliesInterface = webfrontend.gui.monetization.ShopOverlay.getInstance().getChildren()[12].getChildren()[0].getChildren()[0].getChildren()[0].getChildren();
				suppliesInterface[0].add(disableFundsCheckBox);

				var inventory = ClientLib.Data.MainData.GetInstance().get_Inventory();
				if (!inventory.get_SpendableFunds_Original) {
					inventory.get_SpendableFunds_Original = inventory.get_SpendableFunds;
				}
				inventory.get_SpendableFunds = function () {
					var currentMenuOverlay = qx.core.Init.getApplication().getCurrentMenuOverlay();
					if (JSON.parse(localStorage.getItem("TA_Supplies_Mod_Disable_Funds")) && currentMenuOverlay != null && currentMenuOverlay.name == "webfrontend.gui.monetization.ShopOverlay") {
						return 0;
					} else {
						return this.get_SpendableFunds_Original();
					}
				};

				console.log('Supplies Mod loaded');
			} catch (e) {
				console.log("createSuppliesMod: ", e);
			}
		}
		
		function setSelection() {
			try {
				webfrontend.gui.monetization.ShopOverlay.getInstance().baseSelectionList.setModelSelection([ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCityId()]);
			} catch (e) {
				console.log("setSelection: ", e);
			}			
		}
	
		function SuppliesMod_checkIfLoaded() {
			try {
				if (typeof qx !== 'undefined' && qx.core.Init.getApplication() &&  qx.core.Init.getApplication().getMainOverlay()) {
					if (PerforceChangelist >= 400907) createSuppliesMod();
				} else {
					window.setTimeout(SuppliesMod_checkIfLoaded, 1000);
				}
			} catch (e) {
				console.log("SuppliesMod_checkIfLoaded: ", e);
			}
		}

		if (/commandandconquer\.com/i.test(document.domain)) {
			window.setTimeout(SuppliesMod_checkIfLoaded, 1000);
		}
	}

	try {
		var SuppliesMod = document.createElement("script");
		SuppliesMod.innerHTML = "(" + SuppliesMod_main.toString() + ")();";
		SuppliesMod.type = "text/javascript";
		if (/commandandconquer\.com/i.test(document.domain)) {
			document.getElementsByTagName("head")[0].appendChild(SuppliesMod);
		}
	} catch (e) {
		console.log("SuppliesMod: init error: ", e);
	}
})();


// 01 Command & Conquer TA World Map 1.0.0 
 
(function(){

	var injectScript = function()
	{
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
								
						var mapButton = new qx.ui.form.Button('Karte').set({ enabled: false });
						var app = qx.core.Init.getApplication();
						var optionsBar = app.getOptionsBar().getLayoutParent();
						this.__mapButton = mapButton;
						
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
												loader.setValue('Загрузка: ' + root.__completedProcesses + "/" + totalProcesses);
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
						console.log('Generierung Allianzen fertiggestellt', this.__data);
						this.__isLoading = false;
						var win = ccta_map.container.getInstance();
						win.receivedData = this.__data;
						win.__updateList();
						win.drawCanvas();
						win.loader.setValue('Oberfläche');
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
						
						
						var li1 = new qx.ui.form.ListItem('alle', null, "all");
						var li2 = new qx.ui.form.ListItem('Meine Basis', null, "bases");
						var li3 = new qx.ui.form.ListItem('Meine Allianz', null, "alliance");
						var li4 = new qx.ui.form.ListItem('ausgewählt', null, "selected");
						var displayMode = new qx.ui.form.SelectBox().set({ height: 28 });
							displayMode.add(li1);
							displayMode.add(li2);
							displayMode.add(li3);
							displayMode.add(li4);
						
						var zoomBar = new qx.ui.container.Composite(new qx.ui.layout.HBox(15));
						
						var bothOpt = new qx.ui.form.RadioButton('alle').set({ model: "both" });
						var basesOpt = new qx.ui.form.RadioButton('Basis').set({ model: "bases" });;
						var poisOpt = new qx.ui.form.RadioButton('POI').set({ model: "pois" });
						var displayOptions = new qx.ui.form.RadioButtonGroup().set({ layout: new qx.ui.layout.HBox(), font :'font_size_11' });
							displayOptions.add(bothOpt);
							displayOptions.add(basesOpt);
							displayOptions.add(poisOpt);
							
						var allianceList = new qx.ui.form.List().set({ font :'font_size_11', height: 215 });
						var editAlliance = new qx.ui.form.Button('ändern');
						var label = new qx.ui.basic.Label('Transparenz');
						var slider = new qx.ui.form.Slider().set({ minimum: 30, maximum: 100, value: 100 });
						var coordsField = new qx.ui.form.TextField().set({maxWidth: 100, textAlign: 'center', readOnly: 'true', alignX: 'center'});
						var loader = new qx.ui.basic.Label().set({ marginTop: 100 });
						
						grid.set({ minWidth: 780, backgroundColor: '#8e979b', minHeight: 524, margin: 3, paddingTop: 10 });
						rightBar.set({ maxWidth: 130, minWidth: 130, paddingTop: 30, paddingRight: 10 });
						leftBar.set({ maxWidth: 130, minWidth: 130, paddingTop: 30, paddingLeft: 10 });
						
						var hints = [[zoomIn,'vergrößern'], [zoomOut,'verkleinern'], [zoomReset,'rücksetzen'], [basesOpt,'Nur Basen'] , [poisOpt,'Nur POIs'], [bothOpt,'Base und POIs anzeigen']]
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
									var pois = ['Tiberium', 'Crystal', 'Reactor', 'Tungesten', 'Uranium', 'Aircraft Guidance', 'Resonater'];
									for ( var i in selectedBase)
									{
										var txt = "", val = "";
										switch(i)
										{
											case "an": txt = "Alliance: "; val = selectedBase[i]; break;
											case "bn": txt = "Base    : "; val = selectedBase[i]; break;
											case "pn": txt = "Player  : "; val = selectedBase[i]; break;
											case "l" : txt = "Level   : "; val = selectedBase[i]; break;
											case "t" : txt = "Type    : "; val = pois[selectedBase[i] - 2]; break;
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
							caption: 'Allianzen ändern'
						});
						
						this.__getAlliances();
						
						var root = this;
										
						var searchBox = new qx.ui.form.TextField().set({ placeholder: 'Suche...'});
						var list = new qx.ui.form.List().set({ height: 80 });
						var editList = new qx.ui.form.List().set({ height: 160, selectionMode: 'additive' });
							
						var radioButtons = [['Feind', 'enemy'],['Allianz', 'ally'],['neutral.', 'nap']];
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
							
						var addButton = new qx.ui.form.Button('hinzufügen').set({ enabled: false, width: 85, toolTipText: 'Maximum Anzahl Allianzen 8.' });;
						var removeButton = new qx.ui.form.Button('entfernen').set({ enabled: false, width: 85 });;
						var applyButton = new qx.ui.form.Button('anwenden').set({ enabled: false });;
						var defaultsButton = new qx.ui.form.Button('Standard').set({ enabled: false, width: 85 });;
						var saveButton = new qx.ui.form.Button('speichern').set({ enabled: false, width: 85 });;
						
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
			var qx = window["qx"];
			var ClientLib = window["ClientLib"];
			var webfrontend = window["webfrontend"];
			
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
	}
	
	inject();
	
})();


/***********************************************************************************
Multi Session ***** Version 0.5b
***********************************************************************************/

var $;

function log_it(e){
    if (typeof console != 'undefined') console.log('[Multi-Session] ', e);
    else if (window.opera) opera.postError('[Multi-Session] '+ e);
    else GM_log('[Multi-Session] '+ e);   
}

(function(){
    log_it("Wait for load....");
    cnc_ms_run1();   
})();

function cnc_ms_run1() {
    var head = document.getElementsByTagName('head')[0];
    if(!head)  {
        log_it("Wait for load....");
        window.setTimeout(cnc_ms_run1, 100);
    } else {
        if (typeof unsafeWindow.jQuery == 'undefined') {
            log_it("No Jquery Load it....");
            
            var jQuery_js = unsafeWindow.document.createElement('script');
            
            jQuery_js.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js';
            jQuery_js.type = 'text/javascript';
            jQuery_js.async = true;
            
            
           // head.insertBefore(jQuery_js, head.firstChild);
           	//head.appendChild(jQuery_js);
            
        }
        cnc_ms_run2();
    }
}



var wait_counter = 0;


function cnc_ms_run2() {
    if (typeof unsafeWindow.jQuery == 'undefined' ) {
        log_it("Wait for Jquery.... ");
        wait_counter = wait_counter + 1;
        window.setTimeout(cnc_ms_run2, 100);
    } else {
        $ = unsafeWindow.jQuery.noConflict(true);
        log_it("Jquery.... Done");
        $('.p4fnav-block').prepend('<div style="display:block;float:left;cursor:pointer;"><div class="p4fnav-topnav-separator"></div><span name="new_session" class="p4fnav-url">New Session</span></div>');          
        $('.returned-user').append(' - <b><span name="new_session" class="change-server" style="cursor:pointer;">New Session</span></b>');  
        
        
        $('[name="new_session"]').live("click", function(){
  			cncms_new_session();
		});
             
    }
}

  
function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name,"",-1);
}


function cncms_new_session() {
    eraseCookie("JSESSIONID");
    eraseCookie("Rememberme");
    eraseCookie("commandandconquer_remember_me");
    eraseCookie("commandandconquer_remember_me_success");
    window.location.reload();
}

// ==UserScript==
// @name       Chat Syncer
// @namespace  http://careers.stackoverflow.com/boris-churzin
// @version    1.0
// @description  Syncs tiberium alliances (for now) chat with gtalk (for now)
// @include	https://www.tiberiumalliances.com/*
// @include	https://*.alliances.commandandconquer.com/*
// @copyright  2012+, Boris Churzin
// ==/UserScript==

GROUP_TOKEN = 'beehive';

messages_done = {};
setInterval(check_messages, 1000);   

function xpath(path) {
    elements = document.evaluate (
        path,
        document,
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null
    );
    
    var result = [];
    
    for (var i = 0; i < elements.snapshotLength; ++i) {
        result.push(elements.snapshotItem(i));
    }
    return result;
}

function check_messages() {
    var temp = xpath("/html/body/div[3]/div/div[3]/div[1]/div[2]/div/div/div/div/div/div[2]/div[1]/div[2]/div/div[1]/div/div[1]/div/div/div/div/div");
    if(temp.length > 0) {
        messages = temp[0].children;
        for(var i = 0; i < messages.length; i++) {
            if(messages[i].innerHTML.match("\\[Alliance\\]")) {
                if(!messages_done[messages[i].innerHTML]) {
                    messages_done[messages[i].innerHTML] = true;
                    GM_xmlhttpRequest({
                        method: "GET",
                        url: "http://chat-syncer.herokuapp.com/message/" + GROUP_TOKEN + "/" + messages[i].children[1].children[0].innerHTML + "/" + escape(messages[i].children[1].children[1].innerHTML)
                    }); 
                }
            }
        }
    }
}

// ==UserScript==
// @version       1.0
// @author        ihsoft
// @name          C&C:TA IHSoftTools
// @namespace     http://cncopt.com/
// @icon          http://cncopt.com/favicon.ico
// @description   Aggregates battle reports results and shows how much resources you got and RT spent. Also indicates daily ratio of money farming. Aggregates are shown by day, two weeks of history. Requires "MaelstromTool Dev".
// @include       http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @include       http*://*.cncopt.com/*
// @include       http*://cncopt.com/*
// @grant         GM_log
// @grant         GM_setValue
// @grant         GM_getValue
// @grant         GM_registerMenuCommand
// @grant         GM_xmlhttpRequest
// @grant         GM_updatingEnabled
// @grant         unsafeWindow
// ==/UserScript==
/* 
Script is heavily based on "C&C:Tiberium Alliances Maelstrom Tools" (http://userscripts.org/scripts/show/140991).
Thank you, guys, for making such a wonderful script and giving it to people non-obfuscated.

This script comes packed with Packer 3.0 (http://dean.edwards.name/packer/).
Unpacked sources can be found here: http://real4x.ru/downloads/ihsoft_tools_v1_0.js.
*/
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('(q(){p l=q(){v{q 2i(){p j=A.T.U.K();p k=A.T.4l.K();Y.29.1N("9.t",{1c:"2t",2w:Y.4a.2D,1K:{2F:3V,2H:5,2I:3P,2d:"3N",1I:"33",2K:14*24*I*I*1W,},2M:{M:{},1e:0,O:0,W:x 1i(),X:C,1j:0,17:C,16:q(){v{8.25();8.28();r.s(\'9.t 3D\')}w(e){r.s("9.t.16: ",e)}},2O:q(a){8.W.1O(a)},3B:q(a){p b=8.W.2Q(a);u(b!==-1)8.W.3s(b,1)},25:q(){v{p a=A.T.2T;8.M=a.2Y(9.t.2d,{});8.O=a.2Y(9.t.1I,0);8.1e=8.O;p b=(x 1d()).3a()-9.t.2K;J(p c 11 8.M){u(c<b){39 8.M[c];8.17=13}}}w(e){r.s("9.t.25: ",e)}},1L:q(){v{u(8.17){8.O=8.1e;p a=A.T.2T;a.E(9.t.2d,8.M);a.E(9.t.1I,8.O);8.17=C}}w(e){r.s("9.t.1L: ",e)}},1p:q(){v{u(!8.X){8.X=13;8.1j=0;8.32=8.1Q();8.1S(8.1j++)}}w(e){r.s("9.t.1p: ",e)}},1Q:q(){p a=0;v{k.2Z();J(p b 11 k.2X){p c=k.2X[b].2D.3k();a+=z.U.2U.3m(c,C);a+=z.U.2U.3t(c,C)}}w(e){r.s("9.t.1Q: ",e)}D a*24},28:q(){8.X=13;k.2Z();u(k.3u>0){8.X=C;8.1p()}18{A.2c(G.F.19.2P(8,8.28),9.t.2I)}},1S:q(a){p b=(8.O===0?9.t.2F:9.t.2H);p c={1c:z.1a.1b.3Q.3U,3Y:a*b,4b:b,2v:z.1a.1b.4c.4j,4n:C};p d=G.F.19.2r(z.1x.2q,8,8.1Y);z.1x.2p.2o().2k("4s",c,d,Q)},1Y:q(a,b){v{u(b.1f){8.1B=x 1i();J(p i=0;i<b.1f;i++){8.1B.1O(9.y.1E(b[i]))}8.2a=0;8.2b()}18{8.1F()}}w(e){r.s("9.t.1Y: ",e)}},2b:q(){u(8.2a<8.1B.1f){p a=8.1B[8.2a++];u(a.1o()>8.O){8.2f(a)}18{8.1F()}}18{8.1S(8.1j++)}},1F:q(){J(p i=0;i<8.W.1f;i++){v{8.W[i]()}w(e){r.s("9.t.1F, 3l 2g: ",e)}}8.1L();8.X=C},2f:q(a){p b=G.F.19.2r(z.1x.2q,8,8.22);z.1x.2p.2o().2k("4r",{4q:a.2j()},b,a)},22:q(a,b){v{8.17=13;9.y.1y(a,b.d);p c=1d.4p((x 1d(a.1o()).4o()));p d=8.M[c];u(!d){d={2n:c,20:0,1Z:0,1X:0,1w:0,1T:0,21:0,1R:0};8.M[c]=d}d.20+=a.1t(z.U.1s.49);d.1Z+=a.1t(z.U.1s.2y);d.1X+=a.1t(z.U.1s.2z);d.1w+=a.1t(z.U.1s.48);d.1R=d.1w/8.32;d.1T+=a.44();u(a.42().1f){d.21++}u(8.1e<a.1o()){8.1e=a.1o()}8.2b()}w(e){r.s("9.t.22: ",e)}}}});Y.29.1N("9.n",{1c:"2t",2w:T.3X,1K:{2E:"3W",2G:2,1q:"3R",1M:"9 3O 3K 3J.0",2L:3E,2N:3C,1n:0,1G:1,1h:2,1g:3,1C:4,1z:5,1u:6,1U:7,31:["1d","35 34","3L 1r","2y 1r","2z 1r","30 1r","30 36 37 %","38"]},2M:{12:Q,B:Q,27:q(){v{8.3b=C;j.3c(9.n.1q,"L",3d,I,9.n.2L,9.n.2N);p a=j.3e(9.n.1M,9.n.2E,C,j.3f(9.n.2G));a.3g("3h",q(){A.9.n.K().3i(9.n.1q,9.n.1M)},Q);j.3j(9.n.1q,a)}w(e){r.s("2W.2V.27: ",e)}},26:q(){v{8.12=x Y.2e.2S.3n.3o();8.12.3p(9.n.31);8.B=x Y.2e.2S.3q(8.12);8.B.3r(C);8.B.H(9.n.1n,2R);8.B.H(9.n.1G,2R);8.B.H(9.n.1h,I);8.B.H(9.n.1g,I);8.B.H(9.n.1C,I);8.B.H(9.n.1z,I);8.B.H(9.n.1u,I);8.B.H(9.n.1U,40);8.1m.3v(0);8.1m.E({3w:13});8.1m.3x();8.1m.3y(8.B,{3z:1});p b=8.B.3A();b.N(9.n.1n,x P.S().E({R:q(a){D G.F.19.3F(x 1d(a))}}));b.N(9.n.1G,x P.S().E({R:z.3G.3H.3I}));b.N(9.n.1h,x P.S().E({R:G.F.Z.10.15.1A}));b.N(9.n.1g,x P.S().E({R:G.F.Z.10.15.1A}));b.N(9.n.1C,x P.S().E({R:G.F.Z.10.15.1A}));b.N(9.n.1z,x P.S().E({R:G.F.Z.10.15.1A}));b.N(9.n.1u,x P.S().E({R:G.F.Z.10.15.3M}));A.9.t.K().2O(G.F.19.2P(8,8.1H))}w(e){r.s("2W.2V.26: ",e)}},2J:q(){v{u(!8.B){8.26()}A.9.t.K().1p()}w(e){r.s("9.n.2J: ",e)}},1H:q(){v{p c=x 1i();p d=A.9.t.K().M;J(p f 11 d){p g=d[f];p h=x 1i();h[9.n.1n]=g.2n;h[9.n.1G]=g.1T;h[9.n.1h]=g.20;h[9.n.1g]=g.1Z;h[9.n.1C]=g.1X;h[9.n.1z]=g.1w;h[9.n.1u]=g.1R;h[9.n.1U]=g.21;c.1O(h)}c.2v(q(a,b){u(a[0]<b[0])D 1;u(a[0]>b[0])D-1;D 0});8.12.3S(c)}w(e){r.s("9.n.1H: ",e)}}}});Y.29.1N("9.y",{1c:"3T",1K:{1V:Q,1P:Q,16:q(){9.y.1V=9.y.V(z.1a.1b.1J.2C,\'=b.3Z;\',\'1E()\');9.y.1P=9.y.V(z.1a.1b.1J.2C,\'=b.41;\',\'1y()\')},2B:q(a,b){p c=a.43().d;J(p o 11 c){p d=c[o];u(d.2j()===b)D d}r.s(\'9.y.2B: 45 \'+b+\' 46 47\');D Q},1E:q(a){v{p b=x z.1a.1b.1J();9.y.1V.2A(b,a);D b}w(e){r.s("9.y.1E: ",e);2x e;}},1y:q(a,b){v{9.y.1P.2A(a,b);D a}w(e){r.s("9.y.1y: ",e);2x e;}},V:q(a,b,c,d){p f;v{u(d){f=a[d]}u(1k f===\'23\'){J(p g 11 a){p h=a[g];u(1k h===\'q\'&&h.2u().2Q(b)!==-1){r.s("9.y.V: 4d "+c+" 4e - "+g);f=h;4f}}}u(1k f===\'23\'){r.s("9.y.V: 4g 4h 4i "+c)}}w(e){r.s("9.y.V: "+e)}D f}}})}}w(e){r.s("9 1l 4k: ",e)}q 1v(){v{u(1k A.T!==\'23\'){2i();A.9.y.16();A.9.t.K().16();A.9.n.K().27()}18{r.s("9 1l: 4m J T...");A.2c(1v,1W)}}w(e){r.s("9 1l, 1v: ",e)}}u(/2s\\.2m/i.2l(1D.2h)){A.2c(1v,1W)}};v{p m=1D.4t("4u");m.4v="("+l.2u()+")();";m.1c="4w/4x";u(/2s\\.2m/i.2l(1D.2h)){1D.4y("4z")[0].4A(m)}}w(e){r.s("9 1l: 4B 2g: ",e)}})();',62,286,'||||||||this|IHSoft||||||||||||||FarmingStatsGUI||var|function|console|log|FarmingStats|if|try|catch|new|Utils|ClientLib|window|_table|false|return|set|cnc|phe|setColumnWidth|60|for|getInstance||reportsSummary|setDataCellRenderer|lastSavedTimestamp_|HuffyTools|null|ReplaceFunction|ReplaceRender|MaelstromTools|Base|findMethod|dataReadyCallbacks_|updateInProgress_|qx|gui|util|in|_model|true||Numbers|initialize|hasNewData_|else|Util|Data|Reports|type|Date|lastTimestamp_|length|COL_GREEN_REWARD|COL_RP_REWARD|Array|pageNum_|typeof|tools|Window|COL_DATE|get_Time|requestReports|WINDOW_NAME|reward|EResourceType|GetAttackerResourceReward|COL_GOLD_GAIN_RATIO|checkIfLoaded|gold|Net|addCombatReportData|COL_GOLD_REWARD|formatNumbersCompact|_reports|COL_BLUE_REWARD|document|getReportFromHeader|_endDataPoll|COL_RT_COST|setWidgetLabels|SETTING_LAST_TS|CombatReport|statics|saveStats|WINDOW_TITLE|define|push|FN_ADD_COMBAT_REPORT_DATA|calculateDailyMoneyRate|goldRatio|_requestReports|rt|COL_CRATES_COUNT|FN_PARSE_REPORT|1000|crystal|_reportsCallback|tiberium|rp|crates|_reportDataCallback|undefined||loadStats|initWindow|registerGUI|_getInitialState|Class|_currentReportNum|_requestNextReportData|setTimeout|SETTING_SUMMARY|ui|_requestReportData|error|domain|create|get_Id|SendSimpleCommand|test|com|date|GetInstance|CommunicationManager|CommandResult|createEventDelegate|commandandconquer|singleton|toString|sort|extend|throw|Tiberium|Crystal|call|getBuildingById|prototype|Object|BUTTON_IMAGE|INITIAL_POLL_SIZE|BUTTON_LINE|REFRESH_POLL_SIZE|STATE_CHECK_TIMEOUT|updateCache|HISTORY_LENGTH_MSEC|WINDOW_WIDTH|members|WINDOW_HEIGHT|registerDataReadyCallback|createMethodWrapper|indexOf|80|table|LocalStorage|Resource|FramingStatsGUI|IHsoft|Cities|get|updateCityCache|Money|COL_DEFS|todaysMoneyRate_|IHS_FS_LAST_TS|cost|RT|daily|gain|Crates|delete|getTime|IsTimerEnabled|createNewWindow|120|createDesktopButton|desktopPosition|addListener|execute|openWindow|addToMainMenu|get_CityCreditsProduction|callback|GetResourceGrowPerHour|model|Simple|setColumns|Table|setColumnVisibilityButtonVisible|splice|GetResourceBonusGrowPerHour|CityCount|setPadding|resizable|removeAll|add|flex|getTableColumnModel|unregisterDataReadyCallback|390|loaded|527|getLocaleShortDateString|Vis|VisMain|FormatTimespan|v1|Stats|RP|calculateDisplayPercentValue|IHS_FS_SUMMARY|Farming|200|EPlayerReportType|IHSoftFarmingStats|setData|static|CombatOffense|100|FocusBase|DefaultObject|skip|dbn||apn|get_AttackerItemRewards|get_Buildings|GetAttackerMaxRepairTime|Building|not|found|Gold|ResearchPoints|core|take|ESortColumn|Found|method|break|Failed|to|find|Time|main|Cache|Waiting|ascending|toDateString|parse|playerReportId|GetReportDataAndHeader|GetReportHeaderAll|createElement|script|innerHTML|text|javascript|getElementsByTagName|head|appendChild|init'.split('|'),0,{}))

// ==UserScript==
// @name           Alliance Dashboard
// @author         OswaldJon
// @description    Advanced Alliance Management Tool
// @namespace      https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @include        https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @grant          none
// @version        0.3
// ==/UserScript==
function initADReport() {
    var AD_main = function () {
    function createInstance() {
        qx.Class.define("AD", {
            type : "singleton",
            extend : qx.core.Object,
            members : {
				data: null,
                mail: null,
                ui: null,
                intervalUpdate: null,
                initialize : function () {
					
					this.data = ADDataProvider.getInstance().initialize();
                    this.ui = ADUserInterface.getInstance().initialize();

                },

            }
        });
        qx.Class.define("ADDataProvider", {
            type: "singleton",
            extend: qx.core.Object,
            members: {
                mainData:           null,                                               //  ClientLib.Data.MainData
                alliance:           null,                                               //  ClientLib.Data.Alliance
                members:            null,                                               //  System.Collections.Generic.Dictionary$2
                pois:               new Array,                                          //  Owned POIS
                poiTypes:           new Array,                                          //  POI Types
                poiColors:          new Array,                                          //  POI Colors
                /**
                 * Init main class data
                 * @return this
                 */
                initialize: function() {
                    this.mainData   = ClientLib.Data.MainData.GetInstance();
                    this.player     = this.mainData.get_Player();
                    this.alliance   = this.mainData.get_Alliance();
                    this.members    = this.initMemberData();
                    this.pois       = this.initPois();

                    return this;
                },
                /**
                 * Init alliance members data
                 * @return {Array} alliance members data
                 */
                initMemberData: function() {
                    var memberData = this.alliance.get_MemberData().d;
                    var output = new Array();
                    for(var i in memberData) {


                        var date = new Date(memberData[i]["LastSeen"]);
                        var hours = date.getHours();
                        if (hours<10) {hours = "0" + hours}
                        var minutes = date.getMinutes();
                        if (minutes<10) {minutes = "0" + minutes}
                        var seconds = date.getSeconds();
                        if (seconds<10) {seconds = "0" + seconds}
                        var day = date.getDate();
                        var month = date.getMonth();
                        var year = date.getFullYear();

                        var formattedTime = day + '/'+month+'/'+year+' '+hours + ':' + minutes + ':' + seconds;
                        var onlinestate = "Hidden";
                        if(memberData[i]["OnlineState"] == 0) onlinestate = "Offline";
                        if(memberData[i]["OnlineState"] == 1) onlinestate = "Online";
                        if(memberData[i]["OnlineState"] == 2) onlinestate = "Away";

                        output.push(new Array(
                            memberData[i]["Id"],
                            memberData[i]["Name"],
                            memberData[i]["Rank"],
                            memberData[i]["Points"],
                            memberData[i]["Bases"],
                            onlinestate,
                            formattedTime
                        ));
                    }
                    return output;
                },
                /**
                 * Return alliance member data
                 * @return {Array} alliance member data
                 */
				getMemberData: function() {
					return this.members;
				},
				
                /**
                 * Send request to EA servers
                 * @param command string - The name of the command to send
                 * @param params - JSON Params to send with the request
                 * @param context - Context used to determine action in the callback method
                 */
                doRequest: function(command, params, context) {
                    ClientLib.Net.CommunicationManager.GetInstance().SendSimpleCommand(command, params, phe.cnc.Util.createEventDelegate(ClientLib.Net.CommandResult, this, this.commandCallback), context);
                },
                /**
                 * Callback method called on requests to EA servers
                 * @param context string context used
                 * @param data object data returned from EA
                 */
                commandCallback: function(context, data) {
                    switch (context) {
                        case 'GetMemberDataForDetailMemberTab':
                            ADUserInterface.getInstance().populateDetailMemberTab(data);
                        break;
                        case 'GetBaseReportDataForDetailMemberBasesTabs':
                            ADUserInterface.getInstance().populateBaseReportDetailMemberBaseTab(data);
                        break;
                    }
                },
                /**
                 * Init Alliance owned POIs
                 * @return {Array} Alliance owned POIs
                 */
                initPois: function() {

                    this.poiTypes["2"] = "Tiberium";
                    this.poiTypes["3"] = "Crystal";
                    this.poiTypes["4"] = "Reacteur";
                    this.poiTypes["5"] = "Tungstène";
                    this.poiTypes["6"] = "Uranium";
                    this.poiTypes["7"] = "Aircraft";
                    this.poiTypes["8"] = "Résonateur";

                    this.poiColors["2"] = "00FF37";
                    this.poiColors["3"] = "8A54FF";
                    this.poiColors["4"] = "77F0FC";
                    this.poiColors["5"] = "E6FF00";
                    this.poiColors["6"] = "FFB13D";
                    this.poiColors["7"] = "FF5757";
                    this.poiColors["8"] = "FF73B0";



                    var pois = this.alliance.get_OwnedPOIs();
                    for (var key in pois) {
                        var poi = pois[key];
                        var item = new Array('<span style="background:#'+this.poiColors[poi["t"]]+';display:block;width:15px;height:15px;">&nbsp;</span>',this.poiTypes[poi["t"]], poi["l"], poi["x"], poi["y"]);
                        this.pois.push(item);
                    }
                    return this.pois;
                },
                /**
                 * Return Alliance owned POIs
                 * @return {Array} Alliance owned POIs
                 */
                getPois: function() {
                    return this.pois;
                },
                /**
                 * Return POI Types
                 * @return {Array} POI Types
                 */
                getPoiTypes: function() {
                    return this.poiTypes;
                },
                /**
                 * Return Alliance instance
                 * @return {Object} Alliance
                 */
                getAlliance: function() {
                    return this.alliance;
                },
                /**
                 * Get object param name by index. Used for obfuscated methods.
                 * @param object Object to search into
                 * @param idx Index of the key serched
                 * @return string Key searched
                 */
                getNameByIdx: function (object, idx){
                    var i=0;
                    for(var n in object) {
                        if(i==idx) return n;
                        i++;
                    }
                    return null;
                }
            }
        });
        qx.Class.define("ADUserInterface", {
            type: "singleton",
            extend: qx.core.Object,
            members: {
                adWindow:           null,                                 // Alliance Dashboard window
                data:               null,                                 // ClientLib.Data.MainData
                UIDetailGroupbox:   null,                                 // Current member details groupbox
                UITabsCities:       new Array,                            // Current member cities tabs
                /**
                 * Main UI initialization
                 */
                initialize: function() {
                    this.data = ADDataProvider.getInstance();
                    this.initMenu();
                },
                /**
                 * Init menus ans buttons
                 */
                initMenu: function() {
                    
                    // Init dashboard button
                    var bar = qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION);
                    var cctaBtn = new qx.ui.form.Button("CCTA Dashboard");
                    cctaBtn.set
                        ({
                            alignY: "middle",
                            width: 20,
                            height: 20,
                            toolTipText: "View Alliance Dashbord",
                            appearance: "button-text-small"
                        });
                    cctaBtn.addListener("click", function(){
                        ADUserInterface.getInstance().openADWindow();
                    }, this);
                    bar.add(cctaBtn);
					
                },
                /**
                 * Init alliance dashboard window
                 * @return {Object} Alliance dashboard window
                 */
                initADWindow: function() {
                    if(this.adWindow != null) return this.adWindow;

                    var adWindow = new qx.ui.window.Window("CCTA Dashboard: "+this.data.getAlliance().get_Name());
                    adWindow.set({
                        layout: new qx.ui.layout.VBox(10),
                        showMaximize: true,
                        showMinimize: false,
                        alignX: "center",
                        alignY: "middle",
                        width: 1000,
                        height: 660,
                        minWidth: 100,
                        minHeight: 200,
                        showStatusbar: true,
                        textColor: "#4E5661"
                    });

                    adWindow.addListener('close', function(e){
                        this.adWindow = null;
                    }, this);

                    // Tabs interface
                    var tabView = new qx.ui.tabview.TabView();

                    var poiTab = this.initAdWindowPoiTab();
                    tabView.add(poiTab, {flex:1});

                    // Members Tab
                    var membersTab = this.initAdWindowMembersTab();
                    tabView.add(membersTab, {flex:1});

					// Rank tab
                    var rankTab = this.initAdWindowRankTab();
                    tabView.add(rankTab, {flex:1});

                    adWindow.add(tabView, {flex:1});

                    var slider = new qx.ui.form.Slider();
                    slider.set({
                        value: 100,
                        minimum: 0,
                        maximum: 100,
                        singleStep: 1,
                        pageStep: 20
                    });
                    adWindow.add(slider);
                    slider.addListener("changeValue", function(e){
                        var op = e.getData()/100;
                        this.adWindow.set({opacity: op});
                    }, this);
                    this.adWindow = adWindow;

                    return this.adWindow;
                },
                /**
                 * Open alliance dashbord window
                 */
                openADWindow: function() {

                    if(this.adWindow == null) {
                        this.initADWindow();
                    }
                    this.adWindow.open();
                    this.adWindow.center();

                    this.adWindow.set({opacity:1});

                },
                /**
                 * Common actions applied to window tabs
                 * @param tab Tab used
                 * @return {Object} Tab altered
                 */
                initAbstractTab: function(tab) {
                    tab.setOpacity(1);
                    return tab;
                },
                /**
                 * Init owned POIs tab content
                 * @return {qx.ui.tabview.Page} Owned POIs tab content
                 */
                initAdWindowPoiTab: function() {
                    var tab = new qx.ui.tabview.Page("POI");

                    tab = this.initAbstractTab(tab);
                    tab.setLayout(new qx.ui.layout.HBox(10));

                    var groupbox = new qx.ui.groupbox.GroupBox("POI Acquis");
                    groupbox.setLayout(new qx.ui.layout.VBox(10));
                    tab.add(groupbox, {flex:1});

                    var tableModel = new qx.ui.table.model.Simple();
                    tableModel.setColumns([ "-", "Type", "Level", "X", "Y" ]);
                    var tableData = this.data.getPois();
                    tableModel.setData(tableData);
                    var customTCM =
                    {
                        tableColumnModel : function(obj) {
                            return new qx.ui.table.columnmodel.Resize(obj);
                        }
                    };

                    var table = new qx.ui.table.Table(tableModel,customTCM).set({
                        decorator: null
                    });
                    table.addListener('cellClick', function(e) {
                        webfrontend.gui.UtilView.centerCoordinatesOnRegionViewWindow(parseInt(tableData[e["$$user_row"]][3], 10), parseInt(tableData[e["$$user_row"]][4], 10));
                    }, this);

                    var tcm = table.getTableColumnModel();
                    var resizeBehavior = tcm.getBehavior();
                    resizeBehavior.set(0, { width:"1*", minWidth:20, maxWidth:30  });

                    var renderer = new qx.ui.table.cellrenderer.Html();
                    table.getTableColumnModel().setDataCellRenderer(0, renderer);

                    groupbox.add(table, {flex:1});

                    var detailPOIBox = new qx.ui.groupbox.GroupBox("Détail POI");
                    detailPOIBox.setLayout(new qx.ui.layout.VBox(10));

                    tab.add(detailPOIBox, {flex:1, width: "30%"});

                    return tab;
                },
                /**
                 * Init POI Ranking window tab content
                 * @return {qx.ui.tabview.Page} POI Ranking window tab content
                 */
                initAdWindowRankTab: function(){
                    var tab = new qx.ui.tabview.Page("Classement POI");

                    tab = this.initAbstractTab(tab);
                    tab.setLayout(new qx.ui.layout.HBox(10));

                    var alliance = this.data.alliance;
                    var tableModel = new qx.ui.table.model.Simple();
                    tableModel.setColumns([ "Type", "Classement", "Score", "Rang Suivant", "Informations complémentaires"]);

                    var rankScore = alliance.get_POIRankScore();
                    var rankSteps = new Array(
                        [0,0,0],
                        [5,14,3000],
                        [16,17,4000],
                        [27,20,5500],
                        [50,23,7000],
                        [90,26,8500],
                        [160,29,10000],
                        [260,32,12000],
                        [420,35,15000],
                        [750,38,18000],
                        [1300,41,22000],
                        [2200,44,26000],
                        [3600,47,30000],
                        [5700,50,36000],
                        [9700,53,45000],
                        [16400,56,60000],
                        [28000,58,80000],
                        [44000,60,105000],
                        [80000,62,135000],
                        [115000,64,170000],
                        [190000,66,215000],
                        [330000,68,270000]);

                    var nextSteps = new Array();
                    for(var i in rankScore) {
                        for(var j in rankScore[i]) {
                            for(var iStep in rankSteps) {
                                if(rankSteps[iStep][0] <= rankScore[i]["s"]) continue;
                                nextSteps[i] = rankSteps[iStep][0];
                                break;
                            }
                        }
                    }


                    var rankGeneral = new Array("Général", alliance.get_Rank(), alliance.get_TotalScore(), "/");
                    var rankTib = new Array("POI Tiberium", rankScore[0]["r"], rankScore[0]["s"], nextSteps[0], "Bonus: "+alliance.get_POITiberiumBonus()+"/h" );
                    var rankCry = new Array("POI Crystal",rankScore[1]["r"], rankScore[1]["s"], nextSteps[1], "Bonus: "+alliance.get_POICrystalBonus()+"/h");
                    var rankRea = new Array("POI Reacteur", rankScore[2]["r"], rankScore[2]["s"], nextSteps[2], "Bonus: "+alliance.get_POIPowerBonus()+"/h");
                    var rankTun = new Array("POI Tungstène", rankScore[3]["r"], rankScore[3]["s"], nextSteps[3], "Bonus: "+alliance.get_POIInfantryBonus()+"%");
                    var rankUra = new Array("POI Uranium", rankScore[4]["r"], rankScore[4]["s"], nextSteps[4], "Bonus: "+alliance.get_POIVehicleBonus()+"%");
                    var rankAir = new Array("POI Aircraft", rankScore[5]["r"], rankScore[5]["s"], nextSteps[5], "Bonus: "+alliance.get_POIAirBonus()+"%");
                    var rankRes = new Array("POI Résonateur", rankScore[6]["r"], rankScore[6]["s"], nextSteps[6], "Bonus: "+alliance.get_POIDefenseBonus()+"%");

                    var rankings = new Array();
                    rankings.push(rankGeneral,rankTib,rankCry,rankRea,rankTun,rankUra,rankAir,rankRes);


                    tableModel.setData(rankings);
                    var table = new qx.ui.table.Table(tableModel).set({
                        decorator: null
                    });
                    tab.add(table, {flex:1});

                    return tab;
                },
                /**
                 * Init Alliance members window tab content
                 * @return {qx.ui.tabview.Page} Alliance members window tab content
                 */
                initAdWindowMembersTab: function() {
                    var tab = new qx.ui.tabview.Page("Membres");
                    tab = this.initAbstractTab(tab);
                    tab.setLayout(new qx.ui.layout.HBox(10));

                    var groupbox = new qx.ui.groupbox.GroupBox("Membres");
                    groupbox.setLayout(new qx.ui.layout.VBox(10));
                    tab.add(groupbox, {flex:1, width: '50%'});

                    var tableModel = new qx.ui.table.model.Simple();
                    tableModel.setColumns([ "ID", "Nom", "Rank", "Points", "Bases", "Online", "Dernière visite" ]);
                    var tableData = this.data.getMemberData();
                    tableModel.setData(tableData);

                    var table = new qx.ui.table.Table(tableModel).set({
                        decorator: null
                    });


                    var detailGroupbox = new qx.ui.groupbox.GroupBox("Détails du Membre");

                    table.addListener('cellClick', function(e) {
                        var playerId = tableData[e["$$user_row"]][0];
                        detailGroupbox.removeAll();
                        this.initAdWindowDetailMemberTab(playerId);
                    }, this);

                    groupbox.add(table, {flex:1});


                    detailGroupbox.setLayout(new qx.ui.layout.VBox(10));
                    this.UIDetailGroupbox = detailGroupbox;
                    tab.add(this.UIDetailGroupbox, {flex:1, width: '50%'});

                    return tab;
                },
                /**
                 * Init Member details content by sending request to EA Servers. Will be continued in callback method.
                 * @param playerId
                 */
                initAdWindowDetailMemberTab: function(playerId) {

                    this.data.doRequest('GetPublicPlayerInfo', {id:playerId}, 'GetMemberDataForDetailMemberTab');



                },
                /**
                 * Callback method for detail member content init
                 * @param data
                 */
                populateDetailMemberTab: function(data) {
                    var detailTabView = new qx.ui.tabview.TabView();

                    var infoTab = new qx.ui.tabview.Page("Historique");
                    infoTab = this.initAbstractTab(infoTab);
                    infoTab.setLayout(new qx.ui.layout.VBox(10));

                    var citiesTabs = new qx.ui.tabview.TabView();

                    var memberCities = data.c;
                    for(var k in memberCities) {
                        var city = memberCities[k];
                        var cityTab = new qx.ui.tabview.Page(city["n"]);
                        cityTab.setLayout(new qx.ui.layout.VBox(10));
                        var noFightLabel = new qx.ui.basic.Label("Aucun combat pour cette base").set({
                            textColor: "text-value",
                            font: "font_size_13_bold"
                        });
                        cityTab.add(noFightLabel);
                        this.UITabsCities[city["i"]] = cityTab;
                        this.data.doRequest('GetReportHeaderBase', {
                            ascending: false,
                            baseId: city["i"],
                            skip: 0,
                            sort: 1,
                            take: 200,
                            type: 1
                        }, 'GetBaseReportDataForDetailMemberBasesTabs');
                        citiesTabs.add(cityTab,{flex:1});
                    }
                    infoTab.add(citiesTabs,{flex:1});


                   /* var ranking = new qx.ui.form.ListItem(JSON.stringify(data));
                    infoTab.add(ranking);*/
                    detailTabView.add(infoTab, {flex:1});

                    /*var infoTab = new qx.ui.tabview.Page("Layouts");
                    infoTab = this.initAbstractTab(infoTab);
                    infoTab.setLayout(new qx.ui.layout.VBox(10));
                    detailTabView.add(infoTab, {flex:1});*/

                    /*var infoTab = new qx.ui.tabview.Page("Maps");
                    infoTab = this.initAbstractTab(infoTab);
                    infoTab.setLayout(new qx.ui.layout.HBox(10));
                    detailTabView.add(infoTab, {flex:1});*/

                    this.UIDetailGroupbox.add(detailTabView, {flex:1});
                },
                /**
                 * Callback method for member bases reports content init
                 * @param data
                 * @return {Boolean} true if nothing to append, content appended else
                 */
                populateBaseReportDetailMemberBaseTab: function(data) {
                    if(data.length == 0) {
                        return true;
                    }
                    var firstObject = data[0];
                    var baseId = firstObject.bi;

                    var imgResult = new Array;
                    imgResult["img"] = 'none';
                    imgResult["img0"] = '0';
                    imgResult["img1"] = '<img src="https://eaassets-a.akamaihd.net/cncalliancesgame/cdn/data/5aaca4e32fdcbc59a332a90ab09560fd.png" />';
                    imgResult["img2"] = '2';
                    imgResult["img3"] = '3';
                    imgResult["img4"] = '<img src="https://eaassets-a.akamaihd.net/cncalliancesgame/cdn/data/d0b7b7f9cceaf177eeb45703dd5b8583.png" />';
                    imgResult["img5"] = '<img src="https://eaassets-a.akamaihd.net/cncalliancesgame/cdn/data/8b3f702643d0916531dd088032c0b14e.png" />';
                    imgResult["img6"] = '<img src="https://eaassets-a.akamaihd.net/cncalliancesgame/cdn/data/d0b7b7f9cceaf177eeb45703dd5b8583.png" />';

                    var thisCityTab = this.UITabsCities[baseId];
                    thisCityTab.removeAll();

                    var tableModel = new qx.ui.table.model.Simple();
                    tableModel.setColumns([ "Resultat", "Type", "Time" ]);
                    var tableData = new Array;

                    for(var i in data) {
                        var item = data[i];
                        var combatInfo = item.ad;

                        var typeVal = "Attack: "+combatInfo.dbn;
                        if(combatInfo.dbn == 2) typeVal = "<span style='color:green;'>Attack: Camp lvl "+combatInfo.dbl+"</span>";
                        if(combatInfo.dbn == 3) typeVal = "<span style='color:#ff8c00;'>Attack: Outpost lvl "+combatInfo.dbl+"</span>";
                        if(combatInfo.dbn == 4) typeVal = "<span style='color:red;'>Attack: Base lvl "+combatInfo.dbl+"</span>";

                        var date = new Date(item.t);
                        var hours = date.getHours();
                        if (hours<10) {hours = "0" + hours}
                        var minutes = date.getMinutes();
                        if (minutes<10) {minutes = "0" + minutes}
                        var seconds = date.getSeconds();
                        if (seconds<10) {seconds = "0" + seconds}
                        var day = date.getDate();
                        var month = date.getMonth();
                        var year = date.getFullYear();

                        var formattedTime = day + '/'+month+'/'+year+' '+hours + ':' + minutes + ':' + seconds;
                        tableData.push(new Array(imgResult["img"+combatInfo.cr], typeVal, formattedTime));

                    }

                    tableModel.setData(tableData);


                    var customTCM =
                    {
                        tableColumnModel : function(obj) {
                            return new qx.ui.table.columnmodel.Resize(obj);
                        }
                    };

                    var table = new qx.ui.table.Table(tableModel,customTCM).set({
                        decorator: null
                    });

                    var tcm = table.getTableColumnModel();
                    var resizeBehavior = tcm.getBehavior();
                    resizeBehavior.setWidth(0, 60);
                    resizeBehavior.set(1, { width:"1*", minWidth:100, maxWidth:600  });

                    var renderer = new qx.ui.table.cellrenderer.Html();
                    table.getTableColumnModel().setDataCellRenderer(0, renderer);
                    table.getTableColumnModel().setDataCellRenderer(1, renderer);

                    thisCityTab.add(table, {flex:1});



                }
            }
        });
    }

    // Loading
    function AD_checkIfLoaded() {
        try {
            if (typeof qx != 'undefined') {
                if (qx.core.Init.getApplication().getMenuBar() !== null) {
                    createInstance();
                    AD.getInstance().initialize();
                } else setTimeout(AD_checkIfLoaded, 1000);
            } else {
                setTimeout(AD_checkIfLoaded, 1000);
            }
        } catch (e) {
            if (typeof console != 'undefined') {
                console.log(e);
            } else if (window.opera) {
                opera.postError(e);
            } else {
                GM_log(e);
            }
        }
    }

    if (/commandandconquer\.com/i.test(document.domain)) {
        setTimeout(AD_checkIfLoaded, 1000);
    }
};

// injecting, because there seem to be problems when creating game interface with unsafeWindow
var AllDash = document.createElement("script");
var txt = AD_main.toString();
AllDash.innerHTML = "(" + txt + ")();";
AllDash.type = "text/javascript";
if (/commandandconquer\.com/i.test(document.domain)) {
    document.getElementsByTagName("head")[0].appendChild(AllDash);
}
}
/*Main*/
function waitForClientLib(){

    for(var i in unsafeWindow) {
        //alert(i+" --- "+unsafeWindow[i]);
    }

    qx = unsafeWindow["qx"];
    ClientLib = unsafeWindow["ClientLib"];
    webfrontend = unsafeWindow["webfrontend"];

    if ((typeof ClientLib == 'undefined') || (typeof qx == 'undefined') || (qx.core.Init.getApplication().initDone == false))
    {
        setTimeout(waitForClientLib, 10000);
        return;
    }
    else {
        initADReport();
    }

}
function startup(){
    setTimeout(waitForClientLib, 10000);
};
startup();

// ==UserScript==
// @name           C&C Autologin multicompte V2
// @author		   F1u5h3r / Christian17300
// @description    Autologin to C&C - Version améliorée
// @include        https*://www.tiberiumalliances.com*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require http://userscripts.org/scripts/source/107941.user.js
// @grant   GM_setValue 
// @grant   GM_getValue 
//
// @Script modifié par Christian_FR - Juin 2013
// @version 2
//
// ==/UserScript==

var language = "de"; // CHANGE FOR OTHER REGION
var url = window.location.href;
var CCEmail = GM_SuperValue.get("CCEmail", []);
var CCPassword = GM_SuperValue.get("CCPassword", []);

function login(){
	var profile = $('#selectionBox234562 option:selected').text();
	profile = profile.substring(profile.lastIndexOf("-")+1);
	$('input#username').val(CCEmail[profile]);
	$('input#password').val(CCPassword[profile]);
	$('input[type="submit"]').trigger('click');
}

function addProfile() {
	var email = $("#email234562").val();
	var password = $("#password234562").val();
	if(email != "" && password != "") {
		CCEmail.push(email);
		CCPassword.push(password);
		GM_SuperValue.set("CCEmail", CCEmail);
		GM_SuperValue.set("CCPassword", CCPassword);
		window.location.href = url;
	}
}

function removeProfile() {
	var profile = $('#selectionBox234562 option:selected').text();
	var splitProfileIndex = profile.lastIndexOf("-");
	profile = profile.substring(0, splitProfileIndex);
	var CCEmailString = CCEmail.toString();
	var profileIndex = CCEmail.indexOf(profile);
	CCEmail.splice(profileIndex, 1);
	CCPassword.splice(profileIndex, 1);
	GM_SuperValue.set("CCEmail", CCEmail);
	GM_SuperValue.set("CCPassword", CCPassword);
	window.location.href = url;
}

function init() {
	if (url == "https://alliances.commandandconquer.com/"+language+"/" || url == "https://alliances.commandandconquer.com/") {
		window.location.href = "https://alliances.commandandconquer.com/" + language + "/game/launch";
	} else if (url.search("/login/auth/step") != -1 || url.search("/login/auth") != -1) {
		//var width = $(window).width() / 2.5;
		var width = $(window).width() / 3.4; // Adaptation Christian17300 (largeur de l'écran divisé par 3.4)
		var height = $(window).height() / 4;
		//var selectionList = '<select name="selectionBox234562" size="1" style="width: 90px">';
		var selectionList = '<select name="selectionBox234562" size="1" style="width: 240px">'; // adaptation Christian17300
		for(var i = 0; i < CCEmail.length; i++){
			selectionList += '<option>'+CCEmail[i]+'-'+i+'</option>';
			if(i == CCEmail.length-1){
				selectionList += '</select>';
			}
		}
		//var selectionBox = '<div id="selectionBox234562" style="width: 350px; height: 80px; border: 4px solid grey; padding: 15px; z-index: 9999; position: absolute; background-color: #17341A; top: 199px; left: 665.2px; line-height: 20px; top: '+height+'px; left: '+width+'px;">Select one of the following profiles for your login.<br>Profiles: </div>';
		var selectionBox = '<div id="selectionBox234562" style="width: 500px; height: 150px; border: 4px solid grey; padding: 15px; z-index: 9999; position: absolute; background-color: #17341A; top: 199px; left: 665.2px; line-height: 20px; top: '+height+'px; left: '+width+'px;">Wählen Sie eine der folgenden Profile für Ihre Verbindung.<br>Profil : </div>'; // adaptation Christian17300
		$('body').append(selectionBox);
        
        // &nbsp fügt ein Leerzeichen ein HTML
		//$('#selectionBox234562').append(selectionList).append('<button id="login234562" type="button">Login</button><button type="button" id="remove234562">Supprimer Profil</button><br>Oder fügen Sie eine neue profil<br>EMail : <input type="text" style="width: 110px" id="email234562"> Password : <input type="text" style="width: 90px" id="password234562"> <button type="button" id="add234562">In dieses Profil</button></div>');
		$('#selectionBox234562').append(selectionList).append('&nbsp<button id="login234562" type="button">Login</button> &nbsp &nbsp &nbsp &nbsp\
								<button type="button" style="background:red;<button id="remove234562">Supprimer ce Profil</button>\
								<br><br>Oder fügen Sie ein neues Profil<br>\
								&nbsp &nbsp &nbsp &nbsp EMail : <input type="text" style="width: 240px" id="email234562"><br><br>\
								Password : <input type="text" style="width: 90px" id="password234562">&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp&nbsp\
								<button type="button" id="add234562">In dieses Profil</button></div>');
        
        document.getElementById("email234562").style.color = "Black";
		document.getElementById("password234562").style.color = "Black";
		$('#login234562').click(function() {
			var profile = $('#selectionBox234562 option:selected').text();
			profile = profile.substring(profile.lastIndexOf("-")+1);
			login(CCEmail[profile], CCPassword[profile]);
		});

		$('#add234562').click(function() {
			addProfile();
		});

		$('#remove234562').click(function() {
			removeProfile();
		});
	}
}

init();

/* Comment the code above and uncomment the following part if you want to use instant login for a single account (No clicks required for login) */
/*
var language = "en"; // CHANGE FOR OTHER REGION
var email = "YOUREMAIL"; // CHANGE
var password = "YOURPASSWORD"; // CHANGE
var url = window.location.href;

function init() {
	if (url == "https://alliances.commandandconquer.com/"+language+"/" || url == "https://alliances.commandandconquer.com/") {
		window.location.href = "https://alliances.commandandconquer.com/" + language + "/game/launch";
	} else if (url.search("/login/auth/step") != -1 || url.search("/login/auth") != -1) {
		$('input#username').val(email);
		$('input#password').val(password);
		$('input[type="submit"]').trigger('click');		
	}
}

init();
*/