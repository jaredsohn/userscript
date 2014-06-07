// ==UserScript==
// @name        KlickitlikeShing0
// @namespace   http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @description optimized defense, credit and power upgrades
// @include     http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @updateURL   http://userscripts.org/scripts/show/162680
// @downloadURL http://userscripts.org/scripts/show/162680
// @version     0.993
// @author      Shing0
// @grant       none
// @copyright   2013
// @license     
// ==/UserScript==




//////////////////////////////////////////////////////////////////////////////////////////////////////
//		levelt DefenseUnits, Raffinerien und Kraftwerke in allen Basen
//		falls alle DefenseUnits das Level der VZ erreicht haben, wird VZ um 1 level erhöht
//		.V im Basisnamen verhindert das hochleveln der VZ
//		.C im Basisnamen verhindert den Ausbau der Creditproduktion (leveln von Raffinerien und Kraftwerken) in der jeweiligen Basis
//		.D im Basisnamen verhindert das hochleveln der DefenseUnits (VZ wird dann auch nicht hochgelevelt)
//////////////////////////////////////////////////////////////////////////////////////////////////////		



(function () {
	var Upgrader = function () {
		function KlickitlikeShing0() {
			qx.Class.define("Klickit.MainMenu",{
				type : "singleton",
				extend : qx.core.Object,
				construct: function () { 				
					this.mainMenuContent = new qx.ui.menu.Menu();
					this.mainMenuButton = new qx.ui.form.MenuButton("Upgrade", null , this.mainMenuContent);
					this.mainMenuButton.set({
						width : 80,
						appearance : "button-bar-right",
						toolTipText : ""
					});
					var mainBar = qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_MENU);
                    var childs = mainBar.getChildren()[1].getChildren();
                    
                    var orange = "o";
                    var white = "w";
                    var cyan = "c";
                    
        			
                    colorfield = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));

                    credbtn = new qx.ui.form.Button("C");
					credbtn.set({
							
							appearance: "button-text-small"
						});
						
					defbtn = new qx.ui.form.Button("D");
					defbtn.set({
							
							appearance: "button-text-small"
						});
					
					
					
					app = qx.core.Init.getApplication();
					app.getDesktop().add(credbtn, {
					   right: 180,
					   top: 30
				    });
				    app.getDesktop().add(defbtn, {
					   right: 203,
					   top: 30
				    });
				    
				    credbtn.setEnabled(false);
				    defbtn.setEnabled(false);
				    
				    
				    
				    optionBtn = new qx.ui.form.Button("O");
						optionBtn.set
						({
							alignY: "middle", 
							toolTipText: "Klickeroptions öffnen",
							appearance: "button-text-small"
						});
						optionBtn.addListener("click", this.__openOptionWindow, this);
						
						
						app.getDesktop().add(optionBtn, {
					           right: 226,
					           top: 30
				        });
                    
				    showcolorsbutton = new qx.ui.form.Button("colors");
				        showcolorsbutton.set
						({
							alignY: "middle", 
							toolTipText: "",
							appearance: "button-text-small",
							                          
						});
				        showcolorsbutton.addListener("click", this.showcolors, this);
  						app.getDesktop().add(showcolorsbutton, {right: 270,	top: 30	});
				    
                    for( var z = childs.length - 1; z>=0;z--){	                       
						if( typeof childs[z].setAppearance === "function"){							
							if( childs[z].getAppearance() == "button-bar-right"){
								childs[z].setAppearance("button-bar-center");
							}
						}
                    }
					
					mainBar.getChildren()[1].add(this.mainMenuButton);					
					mainBar.getChildren()[0].setScale(true); 
					mainBar.getChildren()[0].setWidth(764 + 80 );

                    Addons_AddonMainMenu = "loaded";
				},
				members :
				{
					mainMenuContent : null,
					mainMenuButton : null,
					UpgradeDefHandle: null,
					UpgradeCredHandle: null,
					UpgradePowerHandle: null,
    				credbtn: null,
    				defbtn: null,
    				colorson: false,
    				colorfield: null,
    				
    				
    				
    				__openOptionWindow: function()
					{
						try
						{
						       var mycity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
    					       var cityname = mycity.get_Name();
							
							if (Klickit.MainMenu.OptionWindow.getInstance().isVisible())
							{
								console.log("Closing Option Window");
								Klickit.MainMenu.OptionWindow.getInstance().close();
							}
							else
							{
								console.log("Opening Option Window");
								var optionwindow = Klickit.MainMenu.OptionWindow.getInstance();
								optionwindow.open();
								optionwindow.powerTitle.setValue("City: " + cityname);
							}
						}
						catch(e)
						{
							console.log("Error Opening or Closing Option Window");
							console.log(e.toString());
						}
					},    
					
					
									
					AddMainMenu: function (name,command,key) {
						if(name == null){
							console.log("Klickit.MainMenu.AddSubMenu: name empty");
							return;
						}
						if(command == null){
							console.log("Klickit.MainMenu.AddMainMenu: command empty");
							return;
						}
						if(key != null){
							var newCommand = new qx.ui.core.Command(key);
							newCommand.addListener("execute", command);
							var button = new qx.ui.menu.Button(name, null, newCommand);
						} else {
							var button = new qx.ui.menu.Button(name);
							button.addListener("execute", command);
						}
						
						this.mainMenuContent.add(button);
						
						
					},
					AddSubMainMenu: function (name) {	
						if(name == null){
							console.log("Klickit.MainMenu.AddSubMainMenu: name empty");
							return;
						}					
						var subMenu = new qx.ui.menu.Menu;
						var button = new qx.ui.menu.Button(name, null, null, subMenu);
						this.mainMenuContent.add(button);
						return subMenu;
					},
					AddSubMenu: function (subMenu,name,command,key) {		
						if(name == null){
							console.log("Klickit.MainMenu.AddSubMenu: name empty");
							return;
						}
						if(command == null){
							console.log("Klickit.MainMenu.AddSubMenu: command empty");
							return;
						}						
						if(subMenu == null){
							console.log("Klickit.MainMenu.AddSubMenu: subMenu empty");
							return;
						}
						
						if(key != null){
							var newCommand = new qx.ui.core.Command(key);
							newCommand.addListener("execute", command);
							var button = new qx.ui.menu.Button(name, null, newCommand);
						} else {
							var button = new qx.ui.menu.Button(name);
							button.addListener("execute", command);
						}						
						subMenu.add(button);
			
						var subMenu = new qx.ui.menu.Menu;
						var actionsButton = new qx.ui.menu.Button(name, null, null, subMenu);
						
						return subMenu;
					},
					
					
					startUpgradeDef: function () {
																
							var addonmenu  = Klickit.MainMenu.getInstance();	
		
                            addonmenu.UpgradeDef();
                            
                            defbtn.setEnabled(true);
                            
							
							console.debug("started upgrading def");
							addonmenu.UpgradeDefHandle = window.setInterval(addonmenu.UpgradeDef, 1500);
							
						},
						
					stopUpgradeDef: function () {
							console.debug("stop upgrading");
							window.clearInterval(addonmenu.UpgradeDefHandle);
							addonmenu.UpgradeDefHandle = null;
        				    defbtn.setEnabled(false);
							
						},

					startUpgradeCred: function () {
																
							var addonmenu  = Klickit.MainMenu.getInstance();	
//							console.debug("start upgrading credits");
							addonmenu.UpgradeCred();
							credbtn.setEnabled(true);

							
							console.debug("started upgrading credits");
							addonmenu.UpgradeCredHandle = window.setInterval(addonmenu.UpgradeCred, 1500);
						},
						
					stopUpgradeCred: function () {
							console.debug("stop upgrading");
							window.clearInterval(addonmenu.UpgradeCredHandle);
							addonmenu.UpgradeCredHandle = null;
							
							credbtn.setEnabled(false);
						},
					
					startUpPower: function (){
					   
					   try{
					       var addonmenu  = Klickit.MainMenu.getInstance();
					       var optionwindow = Klickit.MainMenu.OptionWindow.getInstance();
					       
					       optionwindow.powerupgrade.setEnabled(false);
					       optionwindow.stopper.setEnabled(true);
					       addonmenu.UpgradePowerHandle = setInterval(addonmenu.UpPowerAll, 1500);
					       
					       
					   }
					   
					   catch (e){
					       console.log("startuppowererror", e);
					   }
					
					},
					
					stopUpPower: function (){
					   
					   try{
					       var addonmenu  = Klickit.MainMenu.getInstance();
					       var optionwindow = Klickit.MainMenu.OptionWindow.getInstance();
					       
					       optionwindow.powerupgrade.setEnabled(true);
					       optionwindow.stopper.setEnabled(false);
					       clearInterval(addonmenu.UpgradePowerHandle);
					       addonmenu.UpgradePowerHandle = null;
					       
					   }
					   
					   catch (e){
					       console.log("stopuppowererror", e);
					   
					   }
					
					},
						
					showcolors: function() {
					
					   try{
					        colororangeBtn = new qx.ui.form.Button("orange");
    						colororangeBtn.set({
    							alignY: "middle", 
    							toolTipText: "",
    							appearance: "button-text-small"
    						});
    						colororangeBtn.addListener("click", this.colorbaseorange, this);
    						
    				        colorwhiteBtn = new qx.ui.form.Button("white");
    						colorwhiteBtn.set
    						({
    							alignY: "middle", 
    							toolTipText: "",
    							appearance: "button-text-small"
    						});
    						colorwhiteBtn.addListener("click", this.colorbasewhite, this);
    						
    				        colorcyanBtn = new qx.ui.form.Button("cyan");
    						colorcyanBtn.set
    						({
    							alignY: "middle", 
    							toolTipText: "",
    							appearance: "button-text-small"
    						});
    						colorcyanBtn.addListener("click", this.colorbasecyan, this);
    						
    				        colorblackBtn = new qx.ui.form.Button("black");
    						colorblackBtn.set
    						({
    							alignY: "middle", 
    							toolTipText: "",
    							appearance: "button-text-small"
    						});
    						colorblackBtn.addListener("click", this.colorbaseblack, this);
    					
    				        loadBtn = new qx.ui.form.Button("load");
    						loadBtn.set
    						({
    							alignY: "middle", 
    							toolTipText: "",
    							appearance: "button-text-small",
    						});
    						loadBtn.addListener("click", this.loadcolors, this);
    						
    				        deleteBtn = new qx.ui.form.Button("del");
    						
    						deleteBtn.set
    						({
    							alignY: "middle", 
    							toolTipText: "",
    							appearance: "button-text-small",
    						});
    						deleteBtn.addListener("click", this.deletecolors, this);
					       
					       
					        if(!addonmenu.colorson){
					            app = qx.core.Init.getApplication();
	                            				        
    				            colorfield.add(colororangeBtn);
    				            colorfield.add(colorwhiteBtn);
                                colorfield.add(colorcyanBtn);
                                colorfield.add(colorblackBtn);
                                colorfield.add(deleteBtn);
                                colorfield.add(loadBtn);
    				        
    				        
    				            app.getDesktop().add(colorfield, {
    					            right: 350,
    					            top: 30
    					        });
    				        
    				            addonmenu.colorson = true;
    				       }
    				       else{
        				        colorfield.removeAll();
                                addonmenu.colorson = false;
                            }
    				       
                        }
                        catch(e) {
                        console.log(e);
                        }
					},
					
					createBasePlateFunction: function (b) {                //thx to KRS_L
                                                try {
                                                
                                                    var a = b.prototype,
                                                        c;
                                                    for (c in a) if ("function" === typeof a[c] && (e = a[c].toString(), -1 < e.indexOf("region_city_owner"))) {
                                                            c = /[A-Z]{6}\=\(new \$I.[A-Z]{6}\).[A-Z]{6}\(\$I.[A-Z]{6}.Black/;
                                                            var e = e.match(c).toString(),
                                                                d = e.slice(0, 6);
                                                            if (b === ClientLib.Vis.Region.RegionNPCCamp) {
                                                                var f = "return " + e.slice(12, 21) + ".prototype." + e.slice(23, 29) + ".toString();",
                                                                    g = Function("", f),
                                                                    e = g();
                                                                c = /.I.[A-Z]{6}.prototype.[A-Z]{6}/;
                                                                var j = e.match(/.I.[A-Z]{6}.prototype/).toString(),
                                                                    e = e.match(c).toString(),
                                                                    f = "return " + e + ".toString();",
                                                                    g = Function("", f),
                                                                    e = g(),
                                                                    k = e.match(/this.[A-Z]{6}=a/).toString(),
                                                                    k = "this." + k.slice(5, 11) + "=a;",
                                                                    m = e.match(/this.[A-Z]{6}\(\)/).toString(),
                                                                    m = "this." + m.slice(5, 13) + ";",
                                                                    l = j + ".setPlateColor = function(a){" + k + m + "};regionObject.get_BasePlate = function(){return this." + d + ";}"
                              } else l = "regionObject.get_BasePlate = function(){return this." + d + ";}";
                              g = Function("regionObject", l);
                              g(a);
                              break
                              }
                         } catch (y) {
                              console.log(y)
                         }
                    },
					
					colorbaseorange: function() {
					   try {this.colorbase(1);}					   
					   catch (e){}
					},
					
					colorbasecyan: function() {
					   try {this.colorbase(2);}
					   catch (e){}
					},
					
					colorbasewhite: function() {
					   try {this.colorbase(3);}
					   catch (e){}
					},
					colorbaseblack: function() {
					   try {this.colorbase(4);}
					   catch (e){}
					},
					
					deletecolors: function(){
					   try{
					   
					       var VisMain = ClientLib.Vis.VisMain.GetInstance();
                           var region = VisMain.get_Region();
                           var eobj = ClientLib.Vis.VisObject.EObjectType;
                           var playerid = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity().get_PlayerId();
					       
					       if(localStorage["marker"] != "null" && localStorage["marker"] != "undefined" && localStorage["marker"] != null && localStorage["marker"] != undefined){
                                var marker = JSON.parse(localStorage["marker"]);
                            }                            
                            else
                            {
                                var marker = [];
                            }
                            
                            var len = marker.length;
					       
					       	 
					       for (var i = 0;  i < len; i++) {
                                
                                if(playerid == marker[i].pid){
                                    var object = region.GetObjectFromPosition(marker[i].x * region.get_GridWidth(), marker[i].y * region.get_GridHeight());
                                    if(object != null && (object.get_VisObjectType() == eobj.RegionNPCCamp || object.get_VisObjectType() == eobj.RegionCityType || object.get_VisObjectType() == eobj.RegionNPCBase) && !(object.get_VisObjectType() == eobj.RegionNPCCamp && object.get_IsDestroyed()) && !(object.get_VisObjectType() == eobj.RegionCityType && object.IsOwnBase())){
                                        var objectid = object.get_Id();
                                        
                                        if(objectid == marker[i].id){
                                    
                                            marker[i].c = 4;
                                            
                                            platecolor = ClientLib.Vis.EBackgroundPlateColor.Black;
                                            
                                            object.get_BasePlate().setPlateColor(platecolor);
                                        }
                                    }
                                }
                           }
                           
					       localStorage.removeItem("marker");
					     
					   }
					       
					       
					       
					   catch(e){
					       console.log("deletecolors", e);
					   }
					},
					
					loadcolors: function(){
                        try{
                        var VisMain = ClientLib.Vis.VisMain.GetInstance();
                        var region = VisMain.get_Region();
                        var eobj = ClientLib.Vis.VisObject.EObjectType;
                        var playerid = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity().get_PlayerId();
                        
    					    if(localStorage["marker"] != "null" && localStorage["marker"] != "undefined" && localStorage["marker"] != null && localStorage["marker"] != undefined){
                                var marker = JSON.parse(localStorage["marker"]);
                            }                            
                            else
                            {
                                var marker = [];
                            }
                            console.log(marker);
                                        console.log(localStorage["marker"]);
                            var len = marker.length;
                            
                            console.log(marker);
                            
                            for (var i = 0;  i < len; i++) {
                                
                                if(playerid == marker[i].pid && marker[i].x != -1 && marker[i].y != -1){
                                    var object = region.GetObjectFromPosition(marker[i].x * region.get_GridWidth(), marker[i].y * region.get_GridHeight());
    
                                    if(object != null && (object.get_VisObjectType() == eobj.RegionNPCCamp || object.get_VisObjectType() == eobj.RegionCityType || object.get_VisObjectType() == eobj.RegionNPCBase) && !(object.get_VisObjectType() == eobj.RegionNPCCamp && object.get_IsDestroyed()) && !(object.get_VisObjectType() == eobj.RegionCityType && object.IsOwnBase())){
                                        var objectid = object.get_Id();
                                        
                                        if(objectid == marker[i].id){
                                    
                                            if (marker[i].c == 3){platecolor = ClientLib.Vis.EBackgroundPlateColor.White;}
                                            if (marker[i].c == 2){platecolor = ClientLib.Vis.EBackgroundPlateColor.Cyan;}
                                            if (marker[i].c == 1){platecolor = ClientLib.Vis.EBackgroundPlateColor.Orange;}
                                            if (marker[i].c == 4){platecolor = ClientLib.Vis.EBackgroundPlateColor.Black;}
                                            
                                            object.get_BasePlate().setPlateColor(platecolor);
                                        }
                                    }
                                }
                            }
					       
					    }
					    catch(e){
					    console.log("loadcolors", e);
					    
					    }
					},
					
					colorbase: function (color) {
                        try {
                           
                            if (color != null) {
                                
                                var MainData = ClientLib.Data.MainData.GetInstance();
                                var VisMain = ClientLib.Vis.VisMain.GetInstance();
                                var region = VisMain.get_Region();
                                var platecolor;
                                var coordsexist = false;
                                var playerid = MainData.get_Cities().get_CurrentOwnCity().get_PlayerId();
                                var marker = [];
                                var currentcity = MainData.get_Cities().get_CurrentCity();
                                
                                //console.log(localStorage["marker"]);                                
                                
                                if(currentcity != null){
                                    var ccid = currentcity.get_Id();
                                    var ccx = currentcity.get_X();      //current city x
                                    var ccy = currentcity.get_Y();      //current city y

                                    
                                    if(localStorage["marker"] != "null" && localStorage["marker"] != "undefined" && localStorage["marker"] != null && localStorage["marker"] != undefined){
                                        
                                        marker = JSON.parse(localStorage["marker"]);
                                    }                            
                                    
                                    
                                    if (color == 3){platecolor = ClientLib.Vis.EBackgroundPlateColor.White;}
                                    if (color == 2){platecolor = ClientLib.Vis.EBackgroundPlateColor.Cyan;}
                                    if (color == 1){platecolor = ClientLib.Vis.EBackgroundPlateColor.Orange;}
                                    if (color == 4){platecolor = ClientLib.Vis.EBackgroundPlateColor.Black;}
                                    
                                    if(ccx != -1 && ccy != -1){
                                    
                                        var topush = {}
                                        topush.x = ccx;
                                        topush.y = ccy;
                                        topush.id = ccid;
                                        topush.pid = playerid;
                                        topush.c = color;
                                        
                                        
                                        
                                        var len = marker.length;
                                        
                                        for (var i = 0;  i < len; i++) {
                                            if (marker[i].id == topush.id && marker[i].pid == topush.playerid) {
                                                marker[i].c = color;
                                                coordsexist = true;
                                            }
                                        }
                                                                                                            
                                        if(!coordsexist){
                                            marker.push(topush);
                                        }
                                        
                                        console.log(marker);
                                        console.log(localStorage["marker"]);
                                        
                                        localStorage["marker"] = JSON.stringify(marker);
                                        
                                        var object = region.GetObjectFromPosition(ccx * region.get_GridWidth(), ccy * region.get_GridHeight());
                                        if(object != null){
                                            object.get_BasePlate().setPlateColor(platecolor);
                                        }
                                    }
                                }   
                                
                            }
                        }
                        catch (e)
                        {
                        console.log("colorbaseError",e);
                        }
                    },
					
					
					
					
					CanUpgr: function(costtib, costenergy, tib, energy){
					        
					       try{
					           if(costtib<tib && costenergy < energy){
					           
					               return true;
					           
					           }
					           else {
					           
					               return false;
					           }
					       
					       }
					       catch (e){
					           console.log("CanUpgr: ", e);
					           return false;
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
								console.log("CanRepairAll: ", e);
								return false;
							}
					},
					
					
					

					UpgradeDef: function () {
					
    					try{   
    					
    					       var addonmenu  = Klickit.MainMenu.getInstance();
					           var stillworking = false;
					           var optionwindow = Klickit.MainMenu.OptionWindow.getInstance();
					           
					           if(optionwindow._stopdef.getValue() == false){
					               stillworking = true;
					           }
    					
    							for (var nCity in ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d) {
    			
    								var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d[nCity];
    								var cityname = city.get_Name();
                                    var baselvl = city.get_LvlBase();
    								//var player = city.get_PlayerName();
    								var buildings = city.get_Buildings();
    								var defmaxlvl = 50;
    								
    								if(typeof localStorage['defmax'] != 'undefined'){
    								    defmaxlvl = localStorage['defmax'];
        							}
        							
        							var blockdef = false;
                                    var blockvz = false;
                                    
                                    var tib = city.GetResourceCount(ClientLib.Base.EResourceType.Tiberium);
                                    var kris = city.GetResourceCount(ClientLib.Base.EResourceType.Crystal);
        							var energy = city.GetResourceCount(ClientLib.Base.EResourceType.Power);
        							var costtib = 0;
    								var costenergy = 0;
    								var tibdef = false;
    								var krisdef = false;
    								var istibbuild = false;
    								var vzisok = true;
    								var vzlvl = 0;
    								
    								if (typeof localStorage['deftib'] != 'undefined')
                					{
                						if (localStorage['deftib'] == "yes")
                							tibdef = true;
                						else
                							tibdef = false;
                					}		
                					
                					if (typeof localStorage['defkris'] != 'undefined')
                					{
                						if (localStorage['defkris'] == "yes")
                							krisdef = true;
                						else
                							krisdef = false;
                					}	
    								
    								if (cityname.indexOf('.D') !== -1){
    								    
    								    blockdef = true;
    								    blockvz = true;
    								    
    								}
    								
    								if (cityname.indexOf('.V') !== -1){
    								    
    								    blockvz = true;
    								    
    								}
    								
    								if(!city.get_IsDamaged()){
        								for (var nBuildings in buildings.d) {
        								
        								    var building = buildings.d[nBuildings];
        								    var TechLevelData = ClientLib.Base.Util.GetTechLevelResourceRequirements_Obj(building.get_CurrentLevel() + 1, building.get_TechGameData_Obj());
        								    var name = building.get_UnitGameData_Obj().dn;
        								    var tech = building.get_TechName();
        								    var buildinglvl = building.get_CurrentLevel();
        								    
        								    
        								    // wenn vz aktuelles gebäude ist
        								    if (tech == ClientLib.Base.ETechName.Defense_HQ && !blockvz){
        								        
        								        vzlvl = buildinglvl;
        								        var units = city.get_CityUnitsData();
        								        var defenceUnits = units.get_DefenseUnits();
        								        var lowestdefunit = 999; //aufbilligstedefunit ändern
        								        
        								        for (var nUnit in defenceUnits.d) {
        								        
        								            var unit = defenceUnits.d[nUnit];
        								            var unitlvl = unit.get_CurrentLevel();
        								            
        								            if(unitlvl < lowestdefunit){
        								            
        								                lowestdefunit = unitlvl;
        								            }
        								        }
        								        //lowestdefunit - level der kleinsten def einheit
        								        	
        								       
        								        if (lowestdefunit >= buildinglvl){
                                                    
                                                    vzisok = false;
                                                    for (var costtype in TechLevelData) {
            						               
        												if(costtype == 0){
            						                      costtib = TechLevelData[costtype].Count;
            						                      
        												}
        									
        												if(costtype == 1){
            						                      costenergy = TechLevelData[costtype].Count;
            						                      
        												}
        									       }
        									       
                                                   //if(building.CanUpgrade()){
                                                   if(addonmenu.CanUpgr(costtib, costenergy, tib, energy)){
                                                       
                                                        building.Upgrade();
                                                        vzisok = true;
                                                        stillworking = true;
                                                        var optionwindow = Klickit.MainMenu.OptionWindow.getInstance();
            									        var targetlevel = lowestdefunit+1;
            								            var log = "\""+cityname+"\"" + " VZ auf Level: " + building.get_CurrentLevel();
        					                            optionwindow.makelistitem(log);
                                                        
                                                        console.debug("Upgradeinfo +++ Base: ", cityname , " VZ auf Level: " ,building.get_CurrentLevel(), " +++ Upgradeinfo");
                                                        
                                                   }
                                                   
                                                }
        								    }
        								}					
        								//console.log("1");
        								var units = city.get_CityUnitsData();
        								var offenceUnits = units.get_OffenseUnits();
        								var defenceUnits = units.get_DefenseUnits();
        								var lowestdefunit = 999;
        								var cheapestdefunit = -1;
        								var unitupgradecosts = 0;
        								
            								for (var nUnit in defenceUnits.d) {
            																						
            									var unit = defenceUnits.d[nUnit];
            									var unitlvl = unit.get_CurrentLevel();
            									var unitname = unit.get_UnitGameData_Obj().dn;
            									var nextLevel = unit.get_CurrentLevel() + 1;
            									var gameDataTech = unit.get_UnitGameData_Obj();
            									var hasEnoughResources = city.HasEnoughResources(ClientLib.Base.Util.GetTechLevelResourceRequirements_Obj(nextLevel, gameDataTech));
            									var techdata = ClientLib.Base.Util.GetUnitLevelResourceRequirements_Obj(nextLevel, gameDataTech);
            									var unitupgradecosts = 0;
            									
            									istibbuild = false;
            									
            									//if(unitname == "Mauer" ||   unitname == "Stacheldraht" || unitname == "Flak" || unitname == "Panzerabwehr-Barriere" ||  unitname == "Strahlenkanone" || 
            									//   unitname == "Wall" ||   unitname == "Laser fence" || unitname == "Beam Cannon" || unitname == "Anti-tank barrier")
            									//{
            									//   istibbuild = true;
            									//}
            									
            									var unit_obj = {
            											cityid: city.get_Id(),
            											unitId: unit.get_Id()
            									};
            									
            									//get unit upgrade costs
            									for (var i in techdata){
            									    if(techdata[i].Type == 2){
            									        unitupgradecosts = techdata[i].Count;
            									        istibbuild = false;
            									    }
            									    if(techdata[i].Type == 1){
            									        unitupgradecosts = techdata[i].Count;
            									        istibbuild = true;
            									    }
            									}
            									
            									
            									var enoughresources = (istibbuild && (unitupgradecosts < tib)) || (!istibbuild && (unitupgradecosts < kris))
            									
            									
            									if( ((istibbuild && tibdef) || (!istibbuild && krisdef)) && (unitlvl < vzlvl) ){
                                                    if(enoughresources){
                                                        if(cheapestdefunit == -1){
                                                            
                                                            cheapestdefunit = unitupgradecosts;
                                                            var defmaxunit_obj = unit_obj;
                    										var unitupgrname = unitname;
                    										var unitupgrlevel = unitlvl;
                    									}
                    									else{
                    									   if ((unitupgradecosts < cheapestdefunit) && (unitlvl < defmaxlvl)) {    
                    									        cheapestdefunit = unitupgradecosts;
                        										var defmaxunit_obj = unit_obj;
                        										var unitupgrname = unitname;
                        										var unitupgrlevel = unitlvl;
                    								        }
                    								    }
                    								}
            								    }
            								    
            								}           
                                   
            								if (cheapestdefunit != -1 && !blockdef && vzisok && (vzlvl > unitupgrlevel)) {
            								
            								
            									if (!Klickit.MainMenu.prototype.CanRepairAll(city,ClientLib.Vis.Mode.ArmySetup)) {
          
         										ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UnitUpgrade", defmaxunit_obj, null, null, true);
            									
            									var optionwindow = Klickit.MainMenu.OptionWindow.getInstance();
            									var targetlevel = unitupgrlevel+1;
            								    var log = "\""+cityname+"\"" + " - " + unitupgrname + " - Level: " + targetlevel;
        					                    optionwindow.makelistitem(log);
        					                    //optionwindow.makelistitem(vzisok);
                                                stillworking = true;            									
            									console.log("Upgradeinfo +++ Base:", cityname ," DefUnit:",unitupgrname, "from Level:", unitupgrlevel , "to Level:", unitupgrlevel+1,"+++ Upgradeinfo");
            									
            									} else {
            										console.debug("Upgrade skipped, Base:", cityname, " DefUnit:",unitname,"   Unit not repaired");
            									}
            								}
        								}
    
    							};
    							
    							if(!stillworking){
        						  addonmenu.stopUpgradeDef();
        						}// for city
    							
    						}
    						catch(e)
    						{
    						      console.log("Error Upradedef: " + e.toString());
    						      var optionwindow = Klickit.MainMenu.OptionWindow.getInstance();
        						  var log = e.toString();
        						  var log2 = "infernal wrapper started?";
    					          optionwindow.makelistitem(log);
    					          optionwindow.makelistitem(log2);
    						}
							
							
						}, // function UpgradeDef
					
					
				    UpgradeCred: function () {		
					       
					       try
					       {   
    					       var addonmenu  = Klickit.MainMenu.getInstance();
					           var stillworking = false;
					           
					           var optionwindow = Klickit.MainMenu.OptionWindow.getInstance();
					           
					           if(optionwindow._stopcred.getValue() == false){
					               stillworking = true;
					           }
					       
    					       for (var nCity in ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d) {
    					
    								var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d[nCity];
    								var cityname = city.get_Name();
    								var cityid = city.get_Id();
    								var baselvl = city.get_LvlBase();
    								var buildings = city.get_Buildings();
    								var bestupgratio = 0;
    								var overallratio = 0;
    								var upgratio = 0;
    	                            var upgbuilding = null;
    	                            var overallname = "";
    								var overalllvl = 0;
    								var costtib = 0;
    								var costenergy = 0;
    								var gainperhour = 0;
    								var lastupgradedone = true;
    								var blockcred = false;
    								var blockvz = false;
    								//var addonmenu  = Klickit.MainMenu.getInstance();
    								var tib = city.GetResourceCount(ClientLib.Base.EResourceType.Tiberium);
    								var maxtib = city.GetResourceMaxStorage(ClientLib.Base.EResourceType.Tiberium);
        							var energy = city.GetResourceCount(ClientLib.Base.EResourceType.Power);
        							var credopti = true;
        							
        							
        							
        							if (typeof localStorage['credopti'] != 'undefined')
                					{
                						if (localStorage['credopti'] == "yes")
                							credopti = true;
                						else
                							credopti = false;
                					}
        							
    
    								//keine Raffs leveln
    								if (cityname.indexOf('.C') !== -1){
    								    
    								    blockcred = true;
    								    
    								}
    								
    														
    									for (var nBuildings in buildings.d) {
    	                               		
    	                                   var building = buildings.d[nBuildings];
    	                                   var city_buildingdetailview = city.GetBuildingDetailViewInfo(building);
    	                                   var TechLevelData = ClientLib.Base.Util.GetTechLevelResourceRequirements_Obj(building.get_CurrentLevel() + 1, building.get_TechGameData_Obj());
    	                                   var name = building.get_UnitGameData_Obj().dn;
    									   var tech = building.get_TechName();
    									   var buildinglvl = building.get_CurrentLevel();
    									   var timearray = [0,1,2,3.33,10,20,30,60,120,150,180,240,360];
    									   
    									  
    									   if(name=="Raffinerie" || name == "Refinery" && !blockcred){
    									   
        									   for (ModifierType in city_buildingdetailview.OwnProdModifiers.d) {
                                                    if(parseInt(ModifierType, 10) == 32){       // Pakete
                                                    
                                                        var PaketObj = city_buildingdetailview.OwnProdModifiers.d[32];
    													var paketdelta = PaketObj.NewLvlDelta/6;
    													var pakettotal = PaketObj.TotalValue;
    													
    													if(buildinglvl < 12){
    													   
    													   paketdelta = (paketdelta*6+pakettotal)*60/timearray[buildinglvl+1]-pakettotal*60/timearray[buildinglvl];
    													   
    													}
    													
    													
     												}
                                                    
                                                    if(parseInt(ModifierType, 10) == 30){       // Dauerhaft
                                                                                                  
                                                        var DauerObj = city_buildingdetailview.OwnProdModifiers.d[30];
                                                         var dauerdelta = DauerObj.NewLvlDelta;
                                                   }
    											}
                                              
    											gainperhour = paketdelta + dauerdelta;
                                        
    											for (var costtype in TechLevelData) {
        						               
    												if(costtype == 0){
        						                      costtib = TechLevelData[costtype].Count;
    												}
    									
    												if(costtype == 1){
        						                      costenergy = TechLevelData[costtype].Count;
    												}
    									
    																						
    											}
    											
    											
    											upgratio = gainperhour / costtib;
    											//if(upgratio > bestupgratio && building.CanUpgrade()){
    											
    											if(upgratio > overallratio && costtib < maxtib){
    											     overallratio  = upgratio;
    											     overallname = name;
    											     overalllvl = buildinglvl;
    											 
    											}
    											
    											
    											if(upgratio > bestupgratio && addonmenu.CanUpgr(costtib, costenergy, tib, energy) && costtib < maxtib){
        						                  
        						                  bestupgratio = upgratio;
        						                  upgbuilding = building;
    											}
    										} //Raffinerie
    	                                   
    										if(name == "Kraftwerk" || name == "Power Plant" && !blockcred){
    	
    											for (ModifierType in city_buildingdetailview.OwnProdModifiers.d) {
                                
                                                    if(parseInt(ModifierType, 10) == 30){       // Pakete
                                                    
                                                        var KwcredObj = city_buildingdetailview.OwnProdModifiers.d[30];
                                                        var Kwcreddelta = KwcredObj.NewLvlDelta;
    												}
                                                    
                                                }
    	                                   
    											for (var costtype in TechLevelData) {
            						               
            						                if(costtype == 0){
            						                 
            						                      costtib = TechLevelData[costtype].Count; 
    
            						                }
            						                if(costtype == 1){
            						                 
            						                    costenergy = TechLevelData[costtype].Count; 
                                                        
            						                }
    											}
        	                                                            
        	                                                            
        	                                                            
    											upgratio = Kwcreddelta / costtib;
    											
    											if(upgratio > overallratio && costtib < maxtib){
    											     overallratio  = upgratio;
    											     overallname = name;
    											     overalllvl = buildinglvl;
    											}
         						           
    //											if(upgratio > bestupgratio && building.CanUpgrade()){
            						            if(upgratio > bestupgratio && addonmenu.CanUpgr(costtib, costenergy, tib, energy) && costtib < maxtib){
    												bestupgratio = upgratio;
    												upgbuilding = building;
    											}
    										}	 //KW
    	                                } // buildings
    //console.log("credopti 1", credopti);
    //	                               console.log("overall: ", overallname, overalllvl, overallratio);	
    	                               //console.log("ratio:",bestupgratio);
    									if((bestupgratio != 0) && lastupgradedone && ((bestupgratio == overallratio) || !credopti)) {
    //console.log("credopti 2", credopti);
    										upgbuilding.Upgrade();
    										//console.debug(bestupgratio);
    //	                                    console.debug("ratio:",bestupgratio);
    
    	                                    var optionwindow = Klickit.MainMenu.OptionWindow.getInstance();
        								    var log = "\""+cityname+"\"" + " - " + upgbuilding.get_UnitGameData_Obj().dn + " - Level: " + upgbuilding.get_CurrentLevel();
    					                    optionwindow.makelistitem(log);
    										console.debug("Upgradeinfo +++ Base: ", cityname , " ", upgbuilding.get_UnitGameData_Obj().dn, " Level: ",upgbuilding.get_CurrentLevel(), " +++ Upgradeinfo");
    	                                   
    										lastupgradedone = false;
    										stillworking = true;
    	                               
    									}
    
        						}; //for city
        						
        						if(!stillworking){
        						  addonmenu.stopUpgradeCred();
        						}
    						}
    						catch(e)
    						{
    						      console.log("Error upgradecred: " + e.toString());
    						      var optionwindow = Klickit.MainMenu.OptionWindow.getInstance();
        						  var log = e.toString();
        						  optionwindow.makelistitem(log);
    					         
    						}
					}, //function UpgradeCredits
				    
				    
				    getPowerValues: function(){
				    
				        try{
				        
				            var mycity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
    							var cityname = mycity.get_Name();
				                var buildings = mycity.get_Buildings();
				                var tib = mycity.GetResourceCount(ClientLib.Base.EResourceType.Tiberium);
				                var power = mycity.GetResourceCount(ClientLib.Base.EResourceType.Power);
				                var bestkwobj = null;
				                var bestakkuobj = null;
				                var optionwindow = Klickit.MainMenu.OptionWindow.getInstance();
				                
				                
				                optionwindow.showmaxpowvalue.setValue(Math.round(power));
       							optionwindow.showmaxtibvalue.setValue(Math.round(tib));
       							if(optionwindow.cavaluekw.getValue() == false && optionwindow.cavalueakku.getValue() == false){
           							optionwindow.maxpowvalue.setValue(Math.round(power).toString());
           							optionwindow.maxtibvalue.setValue(Math.round(tib).toString());
           						}	
       							for (var nBuildings in buildings.d) {
    	                               		
    	                                   var building = buildings.d[nBuildings];
    	                                   var city_buildingdetailview = mycity.GetBuildingDetailViewInfo(building);
    	                                   var TechLevelData = ClientLib.Base.Util.GetTechLevelResourceRequirements_Obj(building.get_CurrentLevel() + 1, building.get_TechGameData_Obj());
    	                                   var name = building.get_UnitGameData_Obj().dn;
    									   var tech = building.get_TechName();
    									   var buildinglvl = building.get_CurrentLevel();
    									   var timearray = [0,1,2,3.33,10,20,30,60,120,150,180,240,360];
    									   var costtib = 0;
   								           var costenergy = 0;
   								           var gainperhour = 0;
    									   
    									   for (var costtype in TechLevelData) {
            						               
            						                if(costtype == 0){
            						                 
            						                      costtib = TechLevelData[costtype].Count; 
             						                }
            						                if(costtype == 1){
            						                 
            						                      costenergy = TechLevelData[costtype].Count; 
                                                      }
    									   }

    									   if(name == "Kraftwerk" || name == "Power Plant"){
    									       var objsix = city_buildingdetailview.OwnProdModifiers.d[6];
    									           									       
    									       for (var i in objsix.ConnectedLinkTypes.d) {
                                                     
                                                    if(i == 29){
                                                        
                                                        var KwdauerakkuObj = objsix.ConnectedLinkTypes.d[29];
                                                        var Kwdauerakkudelta = KwdauerakkuObj.NewLvlDelta;
                                                        var Kwdauerakkuiscon = KwdauerakkuObj.IsConnected;
                                                        if(!Kwdauerakkuiscon) Kwdauerakkudelta = 0;
                                                    }
                                                    
                                                    if(i == 38){
                                                        
                                                        var KwdauerkrisObj = objsix.ConnectedLinkTypes.d[38];
                                                        var Kwdauerkrisdelta = KwdauerkrisObj.NewLvlDelta;
                                                        var Kwdauerkrisiscon = KwdauerkrisObj.IsConnected;
                                                        if(!Kwdauerkrisiscon) Kwdauerkrisdelta = 0;
                                                    }
                                                }
                                            
                                                for (var j in city_buildingdetailview.OwnProdModifiers.d){
                                                
                                                    if(j == 28){
                                                    
                                                        var KwpackageObj = city_buildingdetailview.OwnProdModifiers.d[28];
                                                        var Kwpackagedelta = KwpackageObj.NewLvlDelta/6;
                                                        var Kwpackagetotal = KwpackageObj.TotalValue;
                                                        
                                                        if(buildinglvl < 12){
                                                            Kwpackagedelta = (Kwpackagedelta*6+Kwpackagetotal)*60/timearray[buildinglvl+1]-Kwpackagetotal*60/timearray[buildinglvl];
                                                        }                            
                                                    }
                                                }
                                                
                                                gainperhour = Kwpackagedelta + Kwdauerkrisdelta + Kwdauerakkudelta;
                                                
                                                var kwobj = {};
                                                kwobj.lvl = buildinglvl;
                                                kwobj.profit = costenergy/gainperhour;
                                                kwobj.tib = costtib;
                                                kwobj.pow = costenergy;
                                                kwobj.build = building;
                                                
                                                if(bestkwobj == null){
                                                    
                                                    bestkwobj = kwobj;
                                                }
                                                else{
                                                    if(bestkwobj.profit > kwobj.profit){
                                                        bestkwobj = kwobj;
                                                    }
                                                }
                                                //kwarray.push(kwobj);
                                                //kwbuildarray.push(building);
                                             
    								        }
                                            if(name == "Akkumulator" || name == "Accumulator"){
                                                

                                                for (var k in city_buildingdetailview.OwnProdModifiers.d){
                                                
                                                    if(k == 6){
                                                    
                                                        var akkuObj = city_buildingdetailview.OwnProdModifiers.d[6];
                                                        var akkudelta = akkuObj.NewLvlDelta;
                                                    }
                                                }
                                                
                                                var akkuobj = {};
                                                akkuobj.lvl = buildinglvl;
                                                akkuobj.profit = costenergy/akkudelta;
                                                akkuobj.tib = costtib;
                                                akkuobj.pow = costenergy;
                                                akkuobj.build = building;
                                            
                                                if(bestakkuobj ==  null){
                                                    bestakkuobj = akkuobj;
                                                    
                                                }
                                                else{
                                                    if(bestakkuobj.profit > akkuobj.profit){
                                                        bestakkuobj = akkuobj;
                                                    }
                                                }
                                            }   
                                }
                                
                                optionwindow.clvaluekw.setValue(bestkwobj.lvl);
                                optionwindow.clvalueakku.setValue(bestakkuobj.lvl);
                                
                                optionwindow.crvaluekw.setValue(Math.round(bestkwobj.profit) + " h");
                                optionwindow.crvalueakku.setValue(Math.round(bestakkuobj.profit)+ " h");
                                
                                optionwindow.ctvaluekw.setValue(bestkwobj.tib);
                                optionwindow.ctvalueakku.setValue(bestakkuobj.tib);
                                
                                optionwindow.cpvaluekw.setValue(bestkwobj.pow);
                                optionwindow.cpvalueakku.setValue(bestakkuobj.pow);
                        }
				        catch (e){
				        }
				    
				    },
				    
				    
				    UpPowerSingle: function(){
				       
				        try{
				            var mycity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
    							var cityname = mycity.get_Name();
				                var buildings = mycity.get_Buildings();
				                var tib = mycity.GetResourceCount(ClientLib.Base.EResourceType.Tiberium);
				                var power = mycity.GetResourceCount(ClientLib.Base.EResourceType.Power);
				                var bestkwobj = null;
				                var bestakkuobj = null;
				                var optionwindow = Klickit.MainMenu.OptionWindow.getInstance();
				                var addonmenu = Klickit.MainMenu.getInstance();
				               
				                for (var nBuildings in buildings.d) {
    	                               		
    	                                   var building = buildings.d[nBuildings];
    	                                   var city_buildingdetailview = mycity.GetBuildingDetailViewInfo(building);
    	                                   var TechLevelData = ClientLib.Base.Util.GetTechLevelResourceRequirements_Obj(building.get_CurrentLevel() + 1, building.get_TechGameData_Obj());
    	                                   var name = building.get_UnitGameData_Obj().dn;
    									   var tech = building.get_TechName();
    									   var buildinglvl = building.get_CurrentLevel();
    									   var timearray = [0,1,2,3.33,10,20,30,60,120,150,180,240,360];
    									   var costtib = 0;
   								           var costenergy = 0;
   								           var gainperhour = 0;
    									   
    									   for (var costtype in TechLevelData) {
            						               
            						                if(costtype == 0){
            						                 
            						                      costtib = TechLevelData[costtype].Count; 
             						                }
            						                if(costtype == 1){
            						                 
            						                      costenergy = TechLevelData[costtype].Count; 
                                                      }
    									   }

    									   if(name == "Kraftwerk" || name == "Power Plant"){
    									       var objsix = city_buildingdetailview.OwnProdModifiers.d[6];
    									           									       
    									       for (var i in objsix.ConnectedLinkTypes.d) {
                                                     
                                                    if(i == 29){
                                                        
                                                        var KwdauerakkuObj = objsix.ConnectedLinkTypes.d[29];
                                                        var Kwdauerakkudelta = KwdauerakkuObj.NewLvlDelta;
                                                        var Kwdauerakkuiscon = KwdauerakkuObj.IsConnected;
                                                        if(!Kwdauerakkuiscon) Kwdauerakkudelta = 0;
                                                    }
                                                    
                                                    if(i == 38){
                                                        
                                                        var KwdauerkrisObj = objsix.ConnectedLinkTypes.d[38];
                                                        var Kwdauerkrisdelta = KwdauerkrisObj.NewLvlDelta;
                                                        var Kwdauerkrisiscon = KwdauerkrisObj.IsConnected;
                                                        if(!Kwdauerkrisiscon) Kwdauerkrisdelta = 0;
                                                    }
                                                }
                                            
                                                for (var j in city_buildingdetailview.OwnProdModifiers.d){
                                                
                                                    if(j == 28){
                                                    
                                                        var KwpackageObj = city_buildingdetailview.OwnProdModifiers.d[28];
                                                        var Kwpackagedelta = KwpackageObj.NewLvlDelta/6;
                                                        var Kwpackagetotal = KwpackageObj.TotalValue;
                                                        
                                                        if(buildinglvl < 12){
                                                            Kwpackagedelta = (Kwpackagedelta*6+Kwpackagetotal)*60/timearray[buildinglvl+1]-Kwpackagetotal*60/timearray[buildinglvl];
                                                        }                            
                                                    }
                                                }
                                                
                                                gainperhour = Kwpackagedelta + Kwdauerkrisdelta + Kwdauerakkudelta;
                                                
                                                var kwobj = {};
                                                kwobj.lvl = buildinglvl;
                                                kwobj.profit = costenergy/gainperhour;
                                                kwobj.tib = costtib;
                                                kwobj.pow = costenergy;
                                                kwobj.build = building;
                                                
                                                if(bestkwobj == null){
                                                    
                                                    bestkwobj = kwobj;
                                                }
                                                else{
                                                    if(bestkwobj.profit > kwobj.profit){
                                                        bestkwobj = kwobj;
                                                    }
                                                }
                                                //kwarray.push(kwobj);
                                                //kwbuildarray.push(building);
                                             
    								        }
                                            if(name == "Akkumulator" || name == "Accumulator"){
                                                

                                                for (var k in city_buildingdetailview.OwnProdModifiers.d){
                                                
                                                    if(k == 6){
                                                    
                                                        var akkuObj = city_buildingdetailview.OwnProdModifiers.d[6];
                                                        var akkudelta = akkuObj.NewLvlDelta;
                                                    }
                                                }
                                                
                                                var akkuobj = {};
                                                akkuobj.lvl = buildinglvl;
                                                akkuobj.profit = costenergy/akkudelta;
                                                akkuobj.tib = costtib;
                                                akkuobj.pow = costenergy;
                                                akkuobj.build = building;
                                            
                                                if(bestakkuobj ==  null){
                                                    bestakkuobj = akkuobj;
                                                    
                                                }
                                                else{
                                                    if(bestakkuobj.profit > akkuobj.profit){
                                                        bestakkuobj = akkuobj;
                                                    }
                                                }
                                            }   
                                }
                                
                                
                                if(optionwindow.ccvaluekw.getValue() == true && bestkwobj.tib < tib && bestkwobj.pow < power){
				            
				                    bestkwobj.build.Upgrade();
				                    var log = "\""+cityname+"\"" + " - " + "Kraftwerk" + " - Level: " + bestkwobj.lvl + " to Level: " + (bestkwobj.lvl+1);
    					            optionwindow.makelistitem(log);
				                    addonmenu.getPowerValues();
				                }
				                
				                if(optionwindow.ccvalueakku.getValue() == true && bestakkuobj.tib < tib && bestakkuobj.pow < power){
				                
				                    bestakkuobj.build.Upgrade();
				                    
				                    var log = "\""+cityname+"\"" + " - " + "Akku" + " - Level: " + bestakkuobj.lvl+ " to Level: " + (bestakkuobj.lvl+1);
    					            optionwindow.makelistitem(log);
	       			                addonmenu.getPowerValues();
	       			            }
				                
				                
				        }
				        catch (e){
				            console.log("uppowersingleerror",e);
				        }
				    },
				    
				    UpPowerAll: function(){
				        try{
				            var mycity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
    							var cityname = mycity.get_Name();
				                var buildings = mycity.get_Buildings();
				                var tib = mycity.GetResourceCount(ClientLib.Base.EResourceType.Tiberium);
				                var power = mycity.GetResourceCount(ClientLib.Base.EResourceType.Power);
				                var bestkwobj = null;
				                var bestakkuobj = null;
				                var optionwindow = Klickit.MainMenu.OptionWindow.getInstance();
				                var addonmenu = Klickit.MainMenu.getInstance();
				               
				                for (var nBuildings in buildings.d) {
    	                               		
    	                                   var building = buildings.d[nBuildings];
    	                                   var city_buildingdetailview = mycity.GetBuildingDetailViewInfo(building);
    	                                   var TechLevelData = ClientLib.Base.Util.GetTechLevelResourceRequirements_Obj(building.get_CurrentLevel() + 1, building.get_TechGameData_Obj());
    	                                   var name = building.get_UnitGameData_Obj().dn;
    									   var tech = building.get_TechName();
    									   var buildinglvl = building.get_CurrentLevel();
    									   var timearray = [0,1,2,3.33,10,20,30,60,120,150,180,240,360];
    									   var costtib = 0;
   								           var costenergy = 0;
   								           var gainperhour = 0;
    									   
    									   for (var costtype in TechLevelData) {
            						               
            						                if(costtype == 0){
            						                 
            						                      costtib = TechLevelData[costtype].Count; 
             						                }
            						                if(costtype == 1){
            						                 
            						                      costenergy = TechLevelData[costtype].Count; 
                                                      }
    									   }

    									   if(name == "Kraftwerk" || name == "Power Plant"){
    									       var objsix = city_buildingdetailview.OwnProdModifiers.d[6];
    									           									       
    									       for (var i in objsix.ConnectedLinkTypes.d) {
                                                     
                                                    if(i == 29){
                                                        
                                                        var KwdauerakkuObj = objsix.ConnectedLinkTypes.d[29];
                                                        var Kwdauerakkudelta = KwdauerakkuObj.NewLvlDelta;
                                                        var Kwdauerakkuiscon = KwdauerakkuObj.IsConnected;
                                                        if(!Kwdauerakkuiscon) Kwdauerakkudelta = 0;
                                                    }
                                                    
                                                    if(i == 38){
                                                        
                                                        var KwdauerkrisObj = objsix.ConnectedLinkTypes.d[38];
                                                        var Kwdauerkrisdelta = KwdauerkrisObj.NewLvlDelta;
                                                        var Kwdauerkrisiscon = KwdauerkrisObj.IsConnected;
                                                        if(!Kwdauerkrisiscon) Kwdauerkrisdelta = 0;
                                                    }
                                                }
                                            
                                                for (var j in city_buildingdetailview.OwnProdModifiers.d){
                                                
                                                    if(j == 28){
                                                    
                                                        var KwpackageObj = city_buildingdetailview.OwnProdModifiers.d[28];
                                                        var Kwpackagedelta = KwpackageObj.NewLvlDelta/6;
                                                        var Kwpackagetotal = KwpackageObj.TotalValue;
                                                        
                                                        if(buildinglvl < 12){
                                                            Kwpackagedelta = (Kwpackagedelta*6+Kwpackagetotal)*60/timearray[buildinglvl+1]-Kwpackagetotal*60/timearray[buildinglvl];
                                                        }                            
                                                    }
                                                }
                                                
                                                gainperhour = Kwpackagedelta + Kwdauerkrisdelta + Kwdauerakkudelta;
                                                
                                                var kwobj = {};
                                                kwobj.lvl = buildinglvl;
                                                kwobj.profit = costenergy/gainperhour;
                                                kwobj.tib = costtib;
                                                kwobj.pow = costenergy;
                                                kwobj.build = building;
                                                
                                                if(bestkwobj == null){
                                                    
                                                    bestkwobj = kwobj;
                                                }
                                                else{
                                                    if(bestkwobj.profit > kwobj.profit){
                                                        bestkwobj = kwobj;
                                                    }
                                                }
                                                //kwarray.push(kwobj);
                                                //kwbuildarray.push(building);
                                             
    								        }
                                            if(name == "Akkumulator" || name == "Accumulator"){
                                                

                                                for (var k in city_buildingdetailview.OwnProdModifiers.d){
                                                
                                                    if(k == 6){
                                                    
                                                        var akkuObj = city_buildingdetailview.OwnProdModifiers.d[6];
                                                        var akkudelta = akkuObj.NewLvlDelta;
                                                    }
                                                }
                                                
                                                var akkuobj = {};
                                                akkuobj.lvl = buildinglvl;
                                                akkuobj.profit = costenergy/akkudelta;
                                                akkuobj.tib = costtib;
                                                akkuobj.pow = costenergy;
                                                akkuobj.build = building;
                                            
                                                if(bestakkuobj ==  null){
                                                    bestakkuobj = akkuobj;
                                                    
                                                }
                                                else{
                                                    if(bestakkuobj.profit > akkuobj.profit){
                                                        bestakkuobj = akkuobj;
                                                    }
                                                }
                                            }   
                                }
                                
                                if(bestkwobj.tib > tib || bestkwobj.pow > power || bestakkuobj.tib > tib || bestakkuobj.pow > power){
                                    
                                    addonmenu.stopUpPower();
    				            }
                                
                                if(optionwindow.cavaluekw.getValue() == true && bestkwobj.tib < tib && bestkwobj.pow < power){
				                    if((optionwindow.maxpowvalue.getValue()-bestkwobj.pow) > 0 && (optionwindow.maxtibvalue.getValue()-bestkwobj.tib) > 0){
    				                    bestkwobj.build.Upgrade();
    				                    var log = "\""+cityname+"\"" + " - " + "Kraftwerk" + " - Level: " + bestkwobj.lvl+ " to Level: " + (bestkwobj.lvl+1);
    					                optionwindow.makelistitem(log);
    				                    addonmenu.getPowerValues();
    				                    optionwindow.maxpowvalue.setValue(Math.round((optionwindow.maxpowvalue.getValue()-bestkwobj.pow)).toString());
    				                    optionwindow.maxtibvalue.setValue(Math.round((optionwindow.maxtibvalue.getValue()-bestkwobj.tib)).toString());
    				                }
    				                else{
    				                
    				                    addonmenu.stopUpPower();
    				                }
				                }
				               
				                
				                if(optionwindow.cavalueakku.getValue() == true && bestakkuobj.tib < tib && bestakkuobj.pow < power){
				                    if((optionwindow.maxpowvalue.getValue()-bestakkuobj.pow) > 0 && (optionwindow.maxtibvalue.getValue()-bestakkuobj.tib) > 0){
    				                    bestakkuobj.build.Upgrade();
    				                    
    				                    var log = "\""+cityname+"\"" + " - " + "Akku" + " - Level: " + bestakkuobj.lvl+ " to Level: " + (bestakkuobj.lvl+1);
    					                optionwindow.makelistitem(log);
    	       			                addonmenu.getPowerValues();
	       			                    optionwindow.maxpowvalue.setValue(Math.round((optionwindow.maxpowvalue.getValue()-bestakkuobj.pow)).toString());
    				                    optionwindow.maxtibvalue.setValue(Math.round((optionwindow.maxtibvalue.getValue()-bestakkuobj.tib)).toString());
    				                }
    				                else{
    				                
    				                    addonmenu.stopUpPower();
    				                }
	       			            }
	       			            
				            
				    
				        }
				        catch (e){
				            console.log("uppowerallerror",e);
				        }
				    },
				    
				    UpPower: function(){
				        try{
				            var addonmenu = Klickit.MainMenu.getInstance();
				            var optionwindow = Klickit.MainMenu.OptionWindow.getInstance();
				            
				            if(optionwindow.ccvaluekw.getValue() == true || optionwindow.ccvalueakku.getValue() == true){
				                addonmenu.UpPowerSingle();
				                
				            }
				            if(optionwindow.cavaluekw.getValue() == true || optionwindow.cavalueakku.getValue() == true){
				                addonmenu.startUpPower();
				            }
				            
				        }
				        catch (e){
				            console.log("uppowererror",e);
				        }
				    
				    
				    },
				    
				     
				    
    				initialize: function () {
                        try {
                           this.createBasePlateFunction(ClientLib.Vis.Region.RegionNPCCamp);
                           this.createBasePlateFunction(ClientLib.Vis.Region.RegionNPCBase);
                           this.createBasePlateFunction(ClientLib.Vis.Region.RegionCity);
                           this.loadcolors;
                        
                        }
                        catch (e)
                        {
                        }
                    }
				
				
				} //members
				
			});
			
			qx.Class.define("Klickit.MainMenu.OptionWindow", 
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
						caption: "KlickitlikeShing0",
						width: 500,
						height: 300,
						allowMaximize: false,
						showMaximize: false,
						allowMinimize: false,
						showMinimize: false
					});
					var tabView = new qx.ui.tabview.TabView();
					tabView.set({height: 295, width: 495});
					var genPage = new qx.ui.tabview.Page("Options");
					genLayout = new qx.ui.layout.VBox(5);
					genPage.setLayout(genLayout);
					
					var buttonsHeader = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
					buttonsHeader.setThemedFont("bold");
					var buttonsTitle = new qx.ui.basic.Label("auto-opti-upgrades:");
					buttonsHeader.add(buttonsTitle);
					genPage.add(buttonsHeader);
					
					var buttonsBox = new qx.ui.container.Composite(new qx.ui.layout.VBox(5));
					this._credopti = new qx.ui.form.RadioButton("Creds optimal");
					this._credresempty = new qx.ui.form.RadioButton("Creds optimal until Res empty");
					var credgroup = new qx.ui.form.RadioGroup();
					credgroup.add(this._credopti, this._credresempty);
					this._credopti.addListener("changeValue", this._oncredoptiChange, this);
					this._credresempty.addListener("changeValue", this._oncredresemptyChange, this);
					if (typeof localStorage['credopti'] != 'undefined')
					{
						if (localStorage['credopti'] == "yes")
							this._credopti.setValue(true);
						else
							this._credopti.setValue(false);
					}

					if (typeof localStorage['credresempty'] != 'undefined')
					{
						if (localStorage['credresempty'] == "yes")
							this._credresempty.setValue(true);
						else
							this._credresempty.setValue(false);
						
					}
					
					this._deftib = new qx.ui.form.CheckBox("Tiberium Def");
					this._defkris = new qx.ui.form.CheckBox("Kristall Def");
					var defmaxcontainer = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
					this._defmax = new qx.ui.form.TextField("").set({width: 50});
					this._setbutton = new qx.ui.form.Button("set");
					this._deflabel = new qx.ui.basic.Label("Def-Max-Lvl").set({width: 80});
					this._stopdef = new qx.ui.form.CheckBox("auto-stop Def Upgrades");
					this._stopcred = new qx.ui.form.CheckBox("auto-stop Credit Upgrades");
					
					this._stopdef.addListener("changeValue", this._onstopdefChange, this);
					this._stopcred.addListener("changeValue", this._onstopcredChange, this);
					this._deftib.addListener("changeValue", this._ondeftibChange, this);
					this._defkris.addListener("changeValue", this._ondefkrisChange, this);
					this._setbutton.addListener("click", this._onsetbuttonclick, this);
					
					if (typeof localStorage['deftib'] != 'undefined')
					{
						if (localStorage['deftib'] == "yes")
							this._deftib.setValue(true);
						else
							this._deftib.setValue(false);
					}		
					
					if (typeof localStorage['defkris'] != 'undefined')
					{
						if (localStorage['defkris'] == "yes")
							this._defkris.setValue(true);
						else
							this._defkris.setValue(false);
					}
					
					if (typeof localStorage['defmax'] != 'undefined')
					{
						this._defmax.setValue(localStorage['defmax']);
						
					}
					
					if (typeof localStorage['stopdef'] != 'undefined')
					{
						if (localStorage['stopdef'] == "yes")
							this._stopdef.setValue(true);
						else
							this._stopdef.setValue(false);
					}	
					
					if (typeof localStorage['stopcred'] != 'undefined')
					{
						if (localStorage['stopcred'] == "yes")
							this._stopcred.setValue(true);
						else
							this._stopcred.setValue(false);
					}	
					
					
					buttonsBox.add(this._credresempty);
					buttonsBox.add(this._credopti);
					buttonsBox.add(this._deftib);
					buttonsBox.add(this._defkris);
					buttonsBox.add(this._stopdef);
					buttonsBox.add(this._stopcred);
					
					defmaxcontainer.add(this._deflabel);
					defmaxcontainer.add(this._defmax);
					defmaxcontainer.add(this._setbutton);
					
					
					genPage.add(buttonsBox);
					genPage.add(defmaxcontainer);
					
					
					var upgradePage = new qx.ui.tabview.Page("Upgrades");
					upgradeLayout = new qx.ui.layout.VBox(20);
					upgradePage.setLayout(upgradeLayout);
					
					var upgradeHeader = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
					upgradeHeader.setThemedFont("bold");
					var upgradeTitle = new qx.ui.basic.Label("Upgrade all units/buildings to target level");
					upgradeHeader.add(upgradeTitle);
					upgradePage.add(upgradeHeader);
					
					var upgradeBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(10));
					var defgradeBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(10));

					this._upgradelabel = new qx.ui.basic.Label("buildings:").set({width:60});
					this._defgradelabel = new qx.ui.basic.Label("def units:").set({width:60});
					this._upgradelvl = new qx.ui.form.TextField("").set({width: 100});
					this._defgradelvl = new qx.ui.form.TextField("").set({width: 100});
					this._upgradebutton = new qx.ui.form.Button("upgrade");
					this._defgradebutton = new qx.ui.form.Button("upgrade");
					
										
					this._upgradebutton.addListener("click", this._onupgradebuttonclick, this);
					this._defgradebutton.addListener("click", this._ondefgradebuttonclick, this);
					
					upgradeBox.add(this._upgradelabel);
					upgradeBox.add(this._upgradelvl);
					upgradeBox.add(this._upgradebutton);
					defgradeBox.add(this._defgradelabel);
					defgradeBox.add(this._defgradelvl);
					defgradeBox.add(this._defgradebutton);
					
					
					upgradePage.add(upgradeBox);
					upgradePage.add(defgradeBox);
					
					
					var updateinfoPage = new qx.ui.tabview.Page("Updateinfo");
					updateinfoLayout = new qx.ui.layout.VBox(5);
					updateinfoPage.setLayout(updateinfoLayout);
					
					var updateinfoHeader = new qx.ui.container.Composite(new qx.ui.layout.HBox(10));
					updateinfoHeader.setThemedFont("bold");
					var updateinfoTitle = new qx.ui.basic.Label("");
					updateinfoHeader.add(updateinfoTitle);
					updateinfoPage.add(updateinfoHeader);
					
					var updateinfoBox = new qx.ui.container.Composite(new qx.ui.layout.VBox(10));
					this._logfield = new qx.ui.form.List(false);
					
					updateinfoBox.add(this._logfield);
					
					updateinfoPage.add(updateinfoBox);
					
					var powerPage= new qx.ui.tabview.Page("Power");
					powerLayout = new qx.ui.layout.VBox(5);
					powerPage.setLayout(powerLayout);
					
					
					
					
					
					var powerBox = new qx.ui.container.Composite(new qx.ui.layout.VBox(15));
					   					
					   var powerHeader = new qx.ui.container.Composite(new qx.ui.layout.HBox(190));
					       powerHeader.setThemedFont("bold");
					       this.powerTitle = new qx.ui.basic.Label("").set({width: 200});
					   powerHeader.add(this.powerTitle);
					       
					       var addonmenu = Klickit.MainMenu.getInstance();
					
    					   var powergetvalues = new qx.ui.form.Button("get values").set({
    					   width: 90});
    					   
    					   powergetvalues.addListener("click", addonmenu.getPowerValues, this);
					
					powerHeader.add(powergetvalues);
					       
					       
					powerBox.add(powerHeader);
					   
					   var powerrow = new qx.ui.container.Composite(new qx.ui.layout.HBox(10));
					   
					       var powercolumntype = new qx.ui.container.Composite(new qx.ui.layout.VBox(5));
        					
            					this.ctyvalue = new qx.ui.basic.Label().set({
            					   width: 50});
            					this.ctyvalue.setValue("Type");
            					this.ctyvaluekw = new qx.ui.basic.Label().set({
            					   width: 50});
            					this.ctyvaluekw.setValue("KW");
            					this.ctyvalueakku = new qx.ui.basic.Label().set({
            					   width: 50});
            					this.ctyvalueakku.setValue("Akku");
        					
            					powercolumntype.add(this.ctyvalue);
            					powercolumntype.add(this.ctyvaluekw);
            					powercolumntype.add(this.ctyvalueakku);
    					
    					powerrow.add(powercolumntype);
    					
    					   var powercolumnlvl = new qx.ui.container.Composite(new qx.ui.layout.VBox(5));
        					
            					this.clvalue = new qx.ui.basic.Label().set({
            					   width: 50});
            					this.clvalue.setValue("Level");
            					this.clvaluekw = new qx.ui.basic.Label().set({
            					   width: 50});
            					this.clvaluekw.setValue(" ");
            					this.clvalueakku = new qx.ui.basic.Label().set({
            					   width: 50});
            					this.clvalueakku.setValue(" ");
        					
            					powercolumnlvl.add(this.clvalue);
            					powercolumnlvl.add(this.clvaluekw);
            					powercolumnlvl.add(this.clvalueakku);
					   
					   powerrow.add(powercolumnlvl);
					   
					       var powercolumnrent = new qx.ui.container.Composite(new qx.ui.layout.VBox(5));
        					
            					this.crvalue = new qx.ui.basic.Label().set({
            					   width: 80});
            					this.crvalue.setValue("pays itself in");
            					this.crvaluekw = new qx.ui.basic.Label().set({
            					   width: 80});
            					this.crvaluekw.setValue(" ");
            					this.crvalueakku = new qx.ui.basic.Label().set({
            					   width: 80});
            					this.crvalueakku.setValue(" ");
        					
            					powercolumnrent.add(this.crvalue);
            					powercolumnrent.add(this.crvaluekw);
            					powercolumnrent.add(this.crvalueakku);
					   
					   powerrow.add(powercolumnrent);
					   
					       var powercolumntib = new qx.ui.container.Composite(new qx.ui.layout.VBox(5));
        					
            					this.ctvalue = new qx.ui.basic.Label().set({
            					   width: 80});
            					this.ctvalue.setValue("Tiberium");
            					this.ctvaluekw = new qx.ui.basic.Label().set({
            					   width: 80});
            					this.ctvaluekw.setValue(" ");
            					this.ctvalueakku = new qx.ui.basic.Label().set({
            					   width: 80});
            					this.ctvalueakku.setValue(" ");
        					
            					powercolumntib.add(this.ctvalue);
            					powercolumntib.add(this.ctvaluekw);
            					powercolumntib.add(this.ctvalueakku);
					   
					   powerrow.add(powercolumntib);
					   
					       var powercolumnpow = new qx.ui.container.Composite(new qx.ui.layout.VBox(5));
        					
            					this.cpvalue = new qx.ui.basic.Label().set({
            					   width: 80});
            					this.cpvalue.setValue("Power");
            					this.cpvaluekw = new qx.ui.basic.Label().set({
            					   width: 80});
            					this.cpvaluekw.setValue(" ");
            					this.cpvalueakku = new qx.ui.basic.Label().set({
            					   width: 80});
            					this.cpvalueakku.setValue(" ");
        					
            					powercolumnpow.add(this.cpvalue);
            					powercolumnpow.add(this.cpvaluekw);
            					powercolumnpow.add(this.cpvalueakku);
					   
					   powerrow.add(powercolumnpow);
					   
					       var powercolumncheck = new qx.ui.container.Composite(new qx.ui.layout.VBox(5));
        					
            					this.ccvalue = new qx.ui.basic.Label().set({
            					   width: 50});
            					this.ccvalue.setValue("Up Best");
            					this.ccvaluekw = new qx.ui.form.RadioButton();
            					this.ccvaluekw.addListener("changeValue", this._onccvaluekwChange, this);
            					this.ccvalueakku = new qx.ui.form.RadioButton();
            					this.ccvalueakku.addListener("changeValue", this._onccvalueakkuChange, this);
            					powercolumncheck.add(this.ccvalue);
            					powercolumncheck.add(this.ccvaluekw);
            					powercolumncheck.add(this.ccvalueakku);
					   
					   powerrow.add(powercolumncheck);
					   
					       var powercolumncheckall = new qx.ui.container.Composite(new qx.ui.layout.VBox(5));
        					
            					this.cavalue = new qx.ui.basic.Label().set({
            					   width: 50});
            					this.cavalue.setValue("Up all");
            					this.cavaluekw = new qx.ui.form.RadioButton();
            					this.cavaluekw.addListener("changeValue", this._oncavaluekwChange, this);
            					this.cavalueakku = new qx.ui.form.RadioButton();
            					this.cavalueakku.addListener("changeValue", this._oncavalueakkuChange, this);
        					
            					powercolumncheckall.add(this.cavalue);
            					powercolumncheckall.add(this.cavaluekw);
            					powercolumncheckall.add(this.cavalueakku);
					   
					   powerrow.add(powercolumncheckall);
					   
					   var upbuttongroup = new qx.ui.form.RadioGroup();
					       upbuttongroup.add(this.ccvaluekw, this.ccvalueakku, this.cavaluekw, this.cavalueakku);
					   
					   var powerbottom = new qx.ui.container.Composite(new qx.ui.layout.HBox(20));
					       
					       var powerline = new qx.ui.basic.Label("").set({width: 270});
					   powerbottom.add(powerline);
					   
					       this.powerupgrade = new qx.ui.form.Button("Upgrade").set({width: 80});
					       this.powerupgrade.addListener("click", addonmenu.UpPower, this);
					   
					   
					       this.stopper = new qx.ui.form.Button("stop it").set({width: 80});
					       this.stopper.addListener("click", addonmenu.stopUpPower, this);
					       this.stopper.setEnabled(false);
					   powerbottom.add(this.stopper);
					   powerbottom.add(this.powerupgrade);
					   
					   var maxcontainer = new qx.ui.container.Composite(new qx.ui.layout.HBox(40));
    					   
    					   var maxpow = new qx.ui.container.Composite(new qx.ui.layout.VBox(10));
    					   
        					   var showmaxpow = new qx.ui.container.Composite(new qx.ui.layout.HBox(10));
        					       
        					       var showmaxpowlabel = new qx.ui.basic.Label("Power Available:").set({width: 120});
        					       showmaxpowlabel.setThemedFont("bold");
        					       this.showmaxpowvalue = new qx.ui.basic.Label("").set({width: 90});
        					       this.showmaxpowvalue.setThemedFont("bold");
        					   showmaxpow.add(showmaxpowlabel);
        					   showmaxpow.add(this.showmaxpowvalue);        					   
        					   
        					   var maxpowline = new qx.ui.container.Composite(new qx.ui.layout.HBox(10));
        					       
        					       var maxpowlabel = new qx.ui.basic.Label("How much to invest:").set({width: 120});
        					       
        					       this.maxpowvalue = new qx.ui.form.TextField("").set({width: 90});
        					   
        					   maxpowline.add(maxpowlabel);
        					   maxpowline.add(this.maxpowvalue);
        				   
        				   maxpow.add(showmaxpow);
					       maxpow.add(maxpowline);
    					   
    					   var maxtib = new qx.ui.container.Composite(new qx.ui.layout.VBox(10));
    					   
        					   var showmaxtib = new qx.ui.container.Composite(new qx.ui.layout.HBox(10));
            					       
            					   var showmaxtiblabel = new qx.ui.basic.Label("Tiberium Available:").set({width: 120});
            					   showmaxtiblabel.setThemedFont("bold");
            					   this.showmaxtibvalue = new qx.ui.basic.Label("").set({width: 90});
            					   this.showmaxtibvalue.setThemedFont("bold");
            					   
            				    showmaxtib.add(showmaxtiblabel);
            					showmaxtib.add(this.showmaxtibvalue);        					   
            					   
            					var maxtibline = new qx.ui.container.Composite(new qx.ui.layout.HBox(10));
            					       
            					    var maxtiblabel = new qx.ui.basic.Label("How much to invest:").set({width: 120});
            					    this.maxtibvalue = new qx.ui.form.TextField("").set({width: 90});
            					  
            					maxtibline.add(maxtiblabel);
            					maxtibline.add(this.maxtibvalue);
					       
					       maxtib.add(showmaxtib);
					       maxtib.add(maxtibline);
					   
					   maxcontainer.add(maxtib);
					   maxcontainer.add(maxpow);
					
					
					
					powerBox.add(maxcontainer);
					
					powerBox.add(powerrow);
					powerBox.add(powerbottom);
					
					    
					
					//powerBox.add(powergetvalues);
					powerPage.add(powerBox);
					
					var howtoPage = new qx.ui.tabview.Page("How to");
					howtoLayout = new qx.ui.layout.VBox(5);
					howtoPage.setLayout(howtoLayout);
					
					var howtoHeader = new qx.ui.container.Composite(new qx.ui.layout.HBox(10));
					howtoHeader.setThemedFont("bold");
					var howtoTitle = new qx.ui.basic.Label("How to use this Script");
					howtoHeader.add(howtoTitle);
					
					
					var howtoBox = new qx.ui.container.Composite(new qx.ui.layout.VBox(3));
					this._howtotext1 = new qx.ui.basic.Label().set({
                        value: "include <b>.D</b> into your basename - exclude the base from leveling the Defense",
                        rich : true,
                        width: 485
                    });
                    this._howtotext2 = new qx.ui.basic.Label().set({
                        value: "include <b>.V</b> into your basename - exclude the base from leveling the VZ",
                        rich : true,
                        width: 485
                    });
                    this._howtotext3 = new qx.ui.basic.Label().set({
                        value: "include <b>.C</b> into your basename - exclude the base from leveling Credits \n",
                        rich : true,
                        width: 485
                    });
                    this._howtotext5 = new qx.ui.basic.Label().set({
                        value: "<b>Options</b> - \"Creds optimal\" - just optimal cred upgrades will be done",
                        rich : true,
                        width: 485
                    });
                    this._howtotext4 = new qx.ui.basic.Label().set({
                        value: "<b>Options</b> - \"Creds until Res empty\" - optimal cred upgrades, excluding to expensive refineries to empty resources",
                        rich : true,
                        width: 485
                    });
                    this._howtotext6 = new qx.ui.basic.Label().set({
                        value: "<b>Options</b> - \"Tiberium/Kristall Def\" - activate Tiberium/Kristall-building defupgrades",
                        rich : true,
                        width: 485
                    });
                    this._howtotext7 = new qx.ui.basic.Label().set({
                        value: "<b>Power</b> - \"How much to invest:\" set a limit, how much resources can be used (just for Up All)",
                        rich : true,
                        width: 485
                    });
                    this._howtotext8 = new qx.ui.basic.Label().set({
                        value: "<b>Power</b> - \"get Values\" to see best KW (PowerPlant) / Akku (Accumulator)",
                        rich : true,
                        width: 485
                    });
                    this._howtotext9 = new qx.ui.basic.Label().set({
                        value: "<b>Power</b> - \"Up Best\" - just 1 optimized upgrade ---- \"Up All\" - all possible optimized upgrades every 1,5sec",
                        rich : true,
                        width: 485
                    });
                    
                    
                
                    //howtoBox.add(howtoHeader);
					howtoBox.add(this._howtotext1);
					howtoBox.add(this._howtotext2);
					howtoBox.add(this._howtotext3);
					howtoBox.add(this._howtotext4);
					howtoBox.add(this._howtotext5);
					howtoBox.add(this._howtotext6);
					howtoBox.add(this._howtotext8);
    				howtoBox.add(this._howtotext9);
    				howtoBox.add(this._howtotext7);
					
					
					howtoPage.add(howtoBox);
					
					var donatePage = new qx.ui.tabview.Page("donate");
					donateLayout = new qx.ui.layout.VBox(5);
					donatePage.setLayout(donateLayout);
					
					var donateHeader = new qx.ui.container.Composite(new qx.ui.layout.HBox(10));
					donateHeader.setThemedFont("bold");
					var donateTitle = new qx.ui.basic.Label("If you want to support the script, you can donate here");
					donateHeader.add(donateTitle);
					
					var donateBox = new qx.ui.container.Composite(new qx.ui.layout.VBox(20));
					this._donatetext = new qx.ui.basic.Label().set({
                        value: "<form action=\"https://www.paypal.com/cgi-bin/webscr\" method=\"post\" target=\"_blank\"> <input type=\"hidden\" name=\"cmd\" value=\"_s-xclick\"> <input type=\"hidden\" name=\"hosted_button_id\" value=\"6YM5YHTWFHYRY\"> <input type=\"image\" src=\"https://www.paypalobjects.com/de_DE/DE/i/btn/btn_donate_SM.gif\" border=\"0\" name=\"submit\" alt=\"Jetzt einfach, schnell und sicher online bezahlen – mit PayPal.\"> <img alt=\"\" border=\"0\" src=\"https://www.paypalobjects.com/de_DE/i/scr/pixel.gif\" width=\"1\" height=\"1\"> </form>",
                        rich : true,
                        width: 385
                    });
                    
                    this.infotext = new qx.ui.basic.Label().set({
                        value: "<p></p> <p></p><p></p><p></p><p></p><p></p> <p>ScriptLink: <a href=\"http://userscripts.org/scripts/show/162680\" target=\"_blank\">userscripts.org/scripts/show/162680</a></p>",
                        rich : true,
                        width: 385
                    });
                    
					donateBox.add(donateHeader);
					donateBox.add(this._donatetext);
					donateBox.add(this.infotext);
					
					donatePage.add(donateBox);
					
					//this.powerLabel.setValue("test");
					
					tabView.add(genPage);
					tabView.add(upgradePage);
					tabView.add(powerPage);
					tabView.add(updateinfoPage);
					tabView.add(howtoPage);
					tabView.add(donatePage);
					this.add(tabView);
				},
				
				destruct: function()
				{
				},
				
				members:
				{	
					_credopti: null,
					_credresempty: null,
					_upgradebutton: null,
					_upgradelvl: null,
					_defgradelvl: null,
					_defgradebutton: null,
					_logfield: null,
					_defmax: null,
								
					
					getvalues: function(){
					   try{
					       var addonmenu = Klickit.MainMenu.getInstance();
					       addonmenu.UpgradePower;
					       
					       if(typeof localStorage["powerLabel"] != 'undefined'){
					           var log = localStorage["powerLabel"];
					           console.log("läuft");
					       }
					       else {
					           var log = "";
					       }
					       this.powerLabel.setValue(log);
					   }
					   catch (e){
					   
					       console.log("getvalues error", e);
					   }
					
					},
					
					makelistitem: function(text)
					{
					   try
					   {
					       this._input = new qx.ui.form.ListItem(text);
					       this._logfield.addAt(this._input,0);
					       
					   }
					   catch(e)
					   {
					       console.log("Errormakelistitem" + e.toString());
					   }					
					},
					
					_onccvaluekwChange: function()
					{
					   try
					   {
                            localStorage['ccvaluekw'] = this.ccvaluekw.getValue();					   
					   }
					   catch(e)
					   {
					       console.log("Errorccvaluekwclick" + e.toString());
					   }
					
					},
					
					_onccvalueakkuChange: function()
					{
					   try
					   {
                            localStorage['ccvalueakku'] = this.ccvalueakku.getValue();					   
					   }
					   catch(e)
					   {
					       console.log("Errorccvalueakkuclick" + e.toString());
					   }
					
					},
					
					_oncavaluekwChange: function()
					{
					   try
					   {
                            localStorage['cavaluekw'] = this.cavaluekw.getValue();					   
					   }
					   catch(e)
					   {
					       console.log("Errorcavaluekwclick" + e.toString());
					   }
					
					},
					
					_oncavalueakkuChange: function()
					{
					   try
					   {
                            localStorage['cavalueakku'] = this.cavalueakku.getValue();					   
					   }
					   catch(e)
					   {
					       console.log("Errorcavalueakkuclick" + e.toString());
					   }
					
					},
					
					_onsetbuttonclick: function()
					{
					   try
					   {
                            localStorage['defmax'] = this._defmax.getValue();					   
					   }
					   catch(e)
					   {
					       console.log("Errorsetbuttonclick" + e.toString());
					   }
					
					},
					
					_oncredoptiChange: function()
					{
						try
						{
							value = this._credopti.getValue();
							
							if (value == true)
								localStorage['credopti'] = "yes";
							else	
								localStorage['credopti'] = "no";
								
								
						}
						catch(e)
						{
							console.log("Error credopti Change: " + e.toString());
						}
					},
					
					_oncredresemptyChange: function()
					{
						try
						{
							value = this._credresempty.getValue();
								
							if (value == true)
								localStorage['credresempty'] = "yes";
							else	
								localStorage['credresempty'] = "no";
								
								
						}
						catch(e)
						{
							console.log("Error credresempty Change: " + e.toString());
						}
					},
					
					_ondeftibChange: function()
					{
						try
						{
							value = this._deftib.getValue();
								
							if (value == true)
								localStorage['deftib'] = "yes";
							else	
								localStorage['deftib'] = "no";
								
								
						}
						catch(e)
						{
							console.log("Error deftib Change: " + e.toString());
						}
					},
					
					_onstopdefChange: function()
					{
						try
						{
							value = this._stopdef.getValue();
								
							if (value == true)
								localStorage['stopdef'] = "yes";
							else	
								localStorage['stopdef'] = "no";
								
								
						}
						catch(e)
						{
							console.log("Error stopdef Change: " + e.toString());
						}
					},
					
					_onstopcredChange: function()
					{
						try
						{
							value = this._stopcred.getValue();
								
							if (value == true)
								localStorage['stopcred'] = "yes";
							else	
								localStorage['stopcred'] = "no";
								
								
						}
						catch(e)
						{
							console.log("Error stopcred Change: " + e.toString());
						}
					},
					
					_ondefkrisChange: function()
					{
						try
						{
							value = this._defkris.getValue();
								
							if (value == true)
								localStorage['defkris'] = "yes";
							else	
								localStorage['defkris'] = "no";
								
								
						}
						catch(e)
						{
							console.log("Error defkris Change: " + e.toString());
						}
					},
					
					_onupgradebuttonclick: function()
					{
					
	       				newLevel = this._upgradelvl.getValue();
	       				
	       				if (newLevel > 0) ClientLib.API.City.GetInstance().UpgradeAllBuildingsToLevel(newLevel);
					    				        
				        var log = "all buildings to Level: "+ newLevel; 
				        
				        this.makelistitem(log);
					
					},
					
					_ondefgradebuttonclick: function()
					{
					newLevel =this._defgradelvl.getValue();
					
                    if (newLevel > 0) ClientLib.API.Defense.GetInstance().UpgradeAllUnitsToLevel(newLevel);
                    
                    var log = "all def units to Level: "+ newLevel; 
				        
				    this.makelistitem(log);
					
					}
					
				}
			});
			
            Klickit.MainMenu.getInstance();
            Klickit.MainMenu.OptionWindow.getInstance();
            Klickit.MainMenu.getInstance().initialize();

            
			//-----MENÜS------
			var addonmenu  = Klickit.MainMenu.getInstance();		
			//--SUBMENÜS--
			var submenu = addonmenu.AddSubMainMenu("CRED");
			addonmenu.AddSubMenu(submenu,"START",addonmenu.startUpgradeCred);
			addonmenu.AddSubMenu(submenu,"STOP",addonmenu.stopUpgradeCred);
			var submenu = addonmenu.AddSubMainMenu("DEF");
			addonmenu.AddSubMenu(submenu,"START",addonmenu.startUpgradeDef);
			addonmenu.AddSubMenu(submenu,"STOP",addonmenu.stopUpgradeDef);
						
			function debugfunction(k){
            	console.log("working key:" + k);
			}
		}

		function KlickitlikeShing0_checkIfLoaded() {
			try {
				if (typeof qx != 'undefined' && qx.core.Init.getApplication() && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION) && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION).isVisible()) {
					KlickitlikeShing0();
					
					for (var key in ClientLib.Data.CityBuilding.prototype) { //KRS_L
						if (ClientLib.Data.CityBuilding.prototype[key] !== null) {
							var strFunction = ClientLib.Data.CityBuilding.prototype[key].toString();
							if (typeof ClientLib.Data.CityBuilding.prototype[key] === 'function' & strFunction.indexOf("true).l.length==0)){return true;}}return false") > -1) {
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
										
				} else {
					window.setTimeout(KlickitlikeShing0_checkIfLoaded, 1000);
				}
			} catch (e) {
				console.log("KlickitlikeShing0_checkIfLoaded: ", e);
			}
		}
		if (/commandandconquer\.com/i.test(document.domain)) {
			window.setTimeout(KlickitlikeShing0_checkIfLoaded, 1000);
            Addons_AddonMainMenu = "install";
		}
	}
	try {
		var upgrading = document.createElement("script");
		upgrading.innerHTML = "(" + Upgrader.toString() + ")();";
		upgrading.type = "text/javascript";
		if (/commandandconquer\.com/i.test(document.domain)) {
			document.getElementsByTagName("head")[0].appendChild(upgrading);
		}
	} catch (e) {
		console.log("Upgrader init error: ", e);
	}
})();