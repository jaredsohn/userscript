// ==UserScript==
// @name        KlickitlikeShing0
// @namespace   http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @description optimale defense und credit upgrades
// @include     http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version     0.95
// @author      Shing0
// @grant       none
// @copyright   2013, xxx
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
			qx.Class.define("Addons.AddonMainMenu",{
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
                    var promptresult = 999;
                    var orange = "o";
                    var white = "w";
                    var cyan = "c";

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
					mainBar.getChildren()[0].setScale(true); //kosmetik
					mainBar.getChildren()[0].setWidth(764 + 80 );	//kosmetik	

					//console.log("Button added");
                    Addons_AddonMainMenu = "loaded";
				},
				members :
				{
					mainMenuContent : null,
					mainMenuButton : null,
					UpgradeDefHandle: null,
					UpgradeCredHandle: null,
    				runwindow: null,
    				credbtn: null,
    				defbtn: null,
    								
					
					makewindow: function(){
					
					   runwindow = new qx.ui.window.Window("Upgrader").set({
                        
                        height: 0,
                        
                        
                        padding: 5,
						paddingRight: 0,
						showMaximize:false,
						showMinimize:true,
						showClose:false,
						allowClose:false,
						resizable:false,
										                    
                        });
                        
                    
                        
                   
                        
                        runwindow.moveTo(280, 60);
                        runwindow.show();


                    },
                        
                        
				    __openOptionWindow: function()
					{
						try
						{
							if (Addons.AddonMainMenu.OptionWindow.getInstance().isVisible())
							{
								console.log("Closing Option Window");
								Addons.AddonMainMenu.OptionWindow.getInstance().close();
							}
							else
							{
								console.log("Opening Option Window");
								Addons.AddonMainMenu.OptionWindow.getInstance().open();
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
							console.log("Addons.AddonMainMenu.AddSubMenu: name empty");
							return;
						}
						if(command == null){
							console.log("Addons.AddonMainMenu.AddMainMenu: command empty");
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
							console.log("Addons.AddonMainMenu.AddSubMainMenu: name empty");
							return;
						}					
						var subMenu = new qx.ui.menu.Menu;
						var button = new qx.ui.menu.Button(name, null, null, subMenu);
						this.mainMenuContent.add(button);
						return subMenu;
					},
					AddSubMenu: function (subMenu,name,command,key) {		
						if(name == null){
							console.log("Addons.AddonMainMenu.AddSubMenu: name empty");
							return;
						}
						if(command == null){
							console.log("Addons.AddonMainMenu.AddSubMenu: command empty");
							return;
						}						
						if(subMenu == null){
							console.log("Addons.AddonMainMenu.AddSubMenu: subMenu empty");
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
					
					setmaxlvl: function(){
					       
					       promptresult = parseInt(window.prompt("DEFMAXLVL?", "50"));
					       console.debug("Maximum Defense Level set to ", promptresult);
									
					    },
				
					startUpgradeDef: function () {
																
							var addonmenu  = Addons.AddonMainMenu.getInstance();	
		
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
																
							var addonmenu  = Addons.AddonMainMenu.getInstance();	
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
						
					showcolors: function() {
					
					   try{
					       app = qx.core.Init.getApplication();
	                        colorfield = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
				        
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
                        }
                        catch(e) {}
					},
					
					createBasePlateFunction: function (b) {
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
                           var playerid = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity().get_PlayerId();
					       
					       if(localStorage["marker"] != "null"){
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
                                    if(object != null){
                                        var objectid = object.get_Id();
                                        
                                        if(objectid == marker[i].id){
                                    
                                            marker[i].c = 4;
                                            platecolor = ClientLib.Vis.EBackgroundPlateColor.Black;
                                            
                                            object.get_BasePlate().setPlateColor(platecolor);
                                        }
                                    }
                                }
                           }
					       localStorage.removeItem["marker"];
					       
					       
					   
					   }
					       
					       
					       
					   catch(e){}
					},
					
					loadcolors: function(){
                        try{
                        var VisMain = ClientLib.Vis.VisMain.GetInstance();
                        var region = VisMain.get_Region();
                        var playerid = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity().get_PlayerId();
                        
    					    if(localStorage["marker"] != "null"){
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
                                    if(object != null){
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
					    console.log(e);
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

                                    
                                    if(localStorage["marker"] != "null"){
                                        
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
                                        
                                        //console.log(marker);
                                        
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
								console.log("FlunikTools.CanRepairAll: ", e);
								return false;
							}
					},
					
					
					

					UpgradeDef: function () {
					
    					try{
    					
    							for (var nCity in ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d) {
    			
    								var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d[nCity];
    								var cityname = city.get_Name();
                                    var baselvl = city.get_LvlBase();
    								//var player = city.get_PlayerName();
    								var buildings = city.get_Buildings();
    								var defmaxlvl = 50;
    								//var optionwindow = Addons.AddonMainMenu.OptionWindow.getInstance();
    								if(typeof localStorage['defmax'] != 'undefined'){
    								    defmaxlvl = localStorage['defmax'];
        							}
        							
                                    var blockdef = false;
                                    var blockvz = false;
                                    var addonmenu  = Addons.AddonMainMenu.getInstance();
                                    var tib = city.GetResourceCount(ClientLib.Base.EResourceType.Tiberium);
        							var energy = city.GetResourceCount(ClientLib.Base.EResourceType.Power);
        							var costtib = 0;
    								var costenergy = 0;
    								var tibdef = false;
    								var krisdef = false;
    								var istibbuild = false;
    								var vzisok = true;
    								
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
    								
    								for (var nBuildings in buildings.d) {
    								
    								    var building = buildings.d[nBuildings];
    								    var TechLevelData = ClientLib.Base.Util.GetTechLevelResourceRequirements_Obj(building.get_CurrentLevel() + 1, building.get_TechGameData_Obj());
    								    var name = building.get_UnitGameData_Obj().dn;
    								    var tech = building.get_TechName();
    								    var buildinglvl = building.get_CurrentLevel();
    								    
    								    // wenn vz aktuelles gebäude ist
    								    if (tech == ClientLib.Base.ETechName.Defense_HQ && !blockvz){
    								   
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
                                                    
                                                    var optionwindow = Addons.AddonMainMenu.OptionWindow.getInstance();
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
    								
        								for (var nUnit in defenceUnits.d) {
        																						
        									var unit = defenceUnits.d[nUnit];
        									var unitlvl = unit.get_CurrentLevel();
        									var unitname = unit.get_UnitGameData_Obj().dn;
        									var nextLevel = unit.get_CurrentLevel() + 1;
        									var gameDataTech = unit.get_UnitGameData_Obj();
        									var hasEnoughResources = city.HasEnoughResources(ClientLib.Base.Util.GetTechLevelResourceRequirements_Obj(nextLevel, gameDataTech));
        									var techdata = ClientLib.Base.Util.GetUnitLevelResourceRequirements_Obj(nextLevel, gameDataTech)
        									istibbuild = false;
        									
        									if(unitname == "Mauer" ||   unitname == "Stacheldraht" || unitname == "Flak" || unitname == "Panzerabwehr-Barriere" ||  unitname == "Strahlenkanone" || 
        									   unitname == "Wall" ||   unitname == "Laser fence" || unitname == "Beam Cannon" || unitname == "Anti-tank barrier")
        									{
        									   istibbuild = true;
        									}
        									
        									//console.log("istibbuild", istibbuild);
        									       
        									
        									
        																	
        																	//console.log("deftib", tibdef);
                                                                            //console.log("defkris", krisdef);
        									var unit_obj = {
        											cityid: city.get_Id(),
        											unitId: unit.get_Id()
        									};
        									
        																	
        									if( (istibbuild && tibdef) || (!istibbuild && krisdef) ){
        								//	console.log("3");
            				    				if ((unitlvl < lowestdefunit) && (unitlvl < defmaxlvl) && hasEnoughResources) {
            									    
            										lowestdefunit = unitlvl;
            										var defmaxunit_obj = unit_obj;
            										var unitupgrname = unitname;
            								    }
        								    }
        								    
        								};
        								//console.log("4");
        								if ((lowestdefunit<999) && !blockdef && vzisok) {
        								
        								
        									if (!Addons.AddonMainMenu.prototype.CanRepairAll(city,ClientLib.Vis.Mode.ArmySetup)) {
      
     										ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UnitUpgrade", defmaxunit_obj, null, null, true);
        									
        									var optionwindow = Addons.AddonMainMenu.OptionWindow.getInstance();
        									var targetlevel = lowestdefunit+1;
        								    var log = "\""+cityname+"\"" + " - " + unitupgrname + " - Level: " + targetlevel;
    					                    optionwindow.makelistitem(log);
    					                    //optionwindow.makelistitem(vzisok);
        									
        									console.log("Upgradeinfo +++ Base:", cityname ," DefUnit:",unitupgrname, "from Level:", lowestdefunit , "to Level:", lowestdefunit+1,"+++ Upgradeinfo");
        									
        									} else {
        										console.debug("Upgrade skipped, Base:", cityname, " DefUnit:",unitname,"   Unit not repaired");
        									}
        								}
    
    							}; // for city
    							
    						}
    						catch(e)
    						{
    						      console.log("Error Upradedef: " + e.toString());
    						      var optionwindow = Addons.AddonMainMenu.OptionWindow.getInstance();
        						  var log = e.toString();
        						  var log2 = "infernal wrapper started?";
    					          optionwindow.makelistitem(log);
    					          optionwindow.makelistitem(log2);
    						}
							
							
							
							
							
							
						}, // function UpgradeDef
					
					
				    UpgradeCred: function () {		
					       
					       try
					       {
					       
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
    								var addonmenu  = Addons.AddonMainMenu.getInstance();
    								var tib = city.GetResourceCount(ClientLib.Base.EResourceType.Tiberium);
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
    									   
    									   console.log("Name:", name);
    									  
    									   if(name=="Raffinerie" || name == "Refinery" && !blockcred){
    									   
        									   for (ModifierType in city_buildingdetailview.OwnProdModifiers.d) {
                                                    if(parseInt(ModifierType, 10) == 32){       // Pakete
                                                    
                                                        var PaketObj = city_buildingdetailview.OwnProdModifiers.d[32];
    													var paketdelta = PaketObj.NewLvlDelta;
     												}
                                                    
                                                    if(parseInt(ModifierType, 10) == 30){       // Dauerhaft
                                                                                                  
                                                        var DauerObj = city_buildingdetailview.OwnProdModifiers.d[30];
                                                         var dauerdelta = DauerObj.NewLvlDelta;
                                                   }
    											}
                                              
    											gainperhour = paketdelta/6 + dauerdelta;
                                        
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
    											
    											if(upgratio > overallratio){
    											     overallratio  = upgratio;
    											     overallname = name;
    											     overalllvl = buildinglvl;
    											 
    											}
    											
    											
    											if(upgratio > bestupgratio && addonmenu.CanUpgr(costtib, costenergy, tib, energy)){
        						                  
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
    											
    											if(upgratio > overallratio){
    											     overallratio  = upgratio;
    											     overallname = name;
    											     overalllvl = buildinglvl;
    											}
         						           
    //											if(upgratio > bestupgratio && building.CanUpgrade()){
            						            if(upgratio > bestupgratio && addonmenu.CanUpgr(costtib, costenergy, tib, energy)){
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
    	                                    var optionwindow = Addons.AddonMainMenu.OptionWindow.getInstance();
        								    var log = "\""+cityname+"\"" + " - " + upgbuilding.get_UnitGameData_Obj().dn + " - Level: " + upgbuilding.get_CurrentLevel();
    					                    optionwindow.makelistitem(log);
    										console.debug("Upgradeinfo +++ Base: ", cityname , " ", upgbuilding.get_UnitGameData_Obj().dn, " Level: ",upgbuilding.get_CurrentLevel(), " +++ Upgradeinfo");
    	                                   
    										lastupgradedone = false;
    	                               
    									}
    
        						}; //for city
    						}
    						catch(e)
    						{
    						      console.log("Error upgradecred: " + e.toString());
    						      var optionwindow = Addons.AddonMainMenu.OptionWindow.getInstance();
        						  var log = e.toString();
        						  optionwindow.makelistitem(log);
    					         
    						}
					}, //function UpgradeCredits
				
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
			
			qx.Class.define("Addons.AddonMainMenu.OptionWindow", 
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
						width: 400,
						height: 300,
						allowMaximize: false,
						showMaximize: false,
						allowMinimize: false,
						showMinimize: false
					});
					var tabView = new qx.ui.tabview.TabView();
					tabView.set({height: 295, width: 395});
					var genPage = new qx.ui.tabview.Page("Options");
					genLayout = new qx.ui.layout.VBox(5);
					genPage.setLayout(genLayout);
					
					
					//Add General Page Items
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
							
						//Need to do this
						
					}
					
					this._deftib = new qx.ui.form.CheckBox("Tiberium Def");
					this._defkris = new qx.ui.form.CheckBox("Kristall Def");
					var defmaxcontainer = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
					this._defmax = new qx.ui.form.TextField("").set({width: 50});
					this._setbutton = new qx.ui.form.Button("set");
					this._deflabel = new qx.ui.basic.Label("Def-Max-Lvl").set({width: 80});
					
					
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
					
					
					buttonsBox.add(this._credresempty);
					buttonsBox.add(this._credopti);
					buttonsBox.add(this._deftib);
					buttonsBox.add(this._defkris);
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
					
					//this._input = new qx.ui.form.ListItem("hallo");
					
					//this._logfield.add(this._input);
					
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
					
					
					var howtoPage = new qx.ui.tabview.Page("How to");
					howtoLayout = new qx.ui.layout.VBox(5);
					howtoPage.setLayout(howtoLayout);
					
					var howtoHeader = new qx.ui.container.Composite(new qx.ui.layout.HBox(10));
					howtoHeader.setThemedFont("bold");
					var howtoTitle = new qx.ui.basic.Label("How to use this Script");
					howtoHeader.add(howtoTitle);
					//howtoPage.add(howtoHeader);
					
					var howtoBox = new qx.ui.container.Composite(new qx.ui.layout.VBox(3));
					this._howtotext1 = new qx.ui.basic.Label().set({
                        value: "include <b>.D</b> into your basename - exclude the base from leveling the Defense",
                        rich : true,
                        width: 385
                    });
                    this._howtotext2 = new qx.ui.basic.Label().set({
                        value: "include <b>.V</b> into your basename - exclude the base from leveling the VZ",
                        rich : true,
                        width: 385
                    });
                    this._howtotext3 = new qx.ui.basic.Label().set({
                        value: "include <b>.C</b> into your basename - exclude the base from leveling Credits \n",
                        rich : true,
                        width: 385
                    });
                    this._howtotext5 = new qx.ui.basic.Label().set({
                        value: "option.. <b>Creds optimal</b> - just optimal cred upgrades will be done",
                        rich : true,
                        width: 385
                    });
                    this._howtotext4 = new qx.ui.basic.Label().set({
                        value: "option.. <b>Creds until Res empty</b> - optimal cred upgrades, but resources get empty at the end (non-optimal)",
                        rich : true,
                        width: 385
                    });
                    this._howtotext6 = new qx.ui.basic.Label().set({
                        value: "<b>Tiberium Def</b> - activate Tiberium-building defupgrades",
                        rich : true,
                        width: 385
                    });
                    this._howtotext7 = new qx.ui.basic.Label().set({
                        value: "<b>Kristall Def</b> - activate Kristall-unit defupgrades",
                        rich : true,
                        width: 385
                    });
                    this._howtotext8 = new qx.ui.basic.Label().set({
                        value:":> :> :>",
                        
                        rich : true,
                        width: 385
                    });
                    
                
                    
					howtoBox.add(this._howtotext1);
					howtoBox.add(this._howtotext2);
					howtoBox.add(this._howtotext3);
					howtoBox.add(this._howtotext4);
					howtoBox.add(this._howtotext5);
					howtoBox.add(this._howtotext6);
					howtoBox.add(this._howtotext7);
					howtoBox.add(this._howtotext8);
					
					howtoPage.add(howtoBox);
					
					
					tabView.add(genPage);
					tabView.add(upgradePage);
					tabView.add(updateinfoPage);
					tabView.add(howtoPage);
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
					
					
					makelistitem: function(text)
					{
					   try
					   {
					       this._input = new qx.ui.form.ListItem(text);
					       this._logfield.add(this._input);
					       
					   }
					   catch(e)
					   {
					       console.log("Errormakelistitem" + e.toString());
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
			
            Addons.AddonMainMenu.getInstance();
            Addons.AddonMainMenu.OptionWindow.getInstance();
            Addons.AddonMainMenu.getInstance().initialize();

            
			//-----MENÜS------
			var addonmenu  = Addons.AddonMainMenu.getInstance();		
			//--SUBMENÜS--
			var submenu = addonmenu.AddSubMainMenu("CRED");
			addonmenu.AddSubMenu(submenu,"START",addonmenu.startUpgradeCred);
			addonmenu.AddSubMenu(submenu,"STOP",addonmenu.stopUpgradeCred);
			var submenu = addonmenu.AddSubMainMenu("DEF");
			addonmenu.AddSubMenu(submenu,"START",addonmenu.startUpgradeDef);
			addonmenu.AddSubMenu(submenu,"STOP",addonmenu.stopUpgradeDef);
			
			//var submenu = addonmenu.AddSubMainMenu("bla");
			//addonmenu.AddSubMenu(submenu,"test",addonmenu.colourbase);
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