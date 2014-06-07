// ==UserScript==
// @name           CNCTurkiye Savas Smilatoru
// @description    Allows you to simulate combat before actually attacking.
// @namespace      https://prodgame*.alliances.commandandconquer.com/*/index.aspx* 
// @include        https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version        1.1.6
// @author         WildKatana
// @require        http://sizzlemctwizzle.com/updater.php?id=130344&days=1
// ==/UserScript==

(function(){
  var TASuite_mainFunction = function() {
    function createTweak() {
      var TASuite = {};
      qx.Class.define("TASuite.main", {
        type: "singleton",
        extend: qx.core.Object,
        members: {
          buttonSimulateCombat: null,
          buttonReturnSetup: null,
          buttonGetProTools: null,
          buttonCheckPro: null,
          troopDamageLabel: null,
          battleResultsBox: null,
          add_ViewModeChange: null,
          attacker_modules: null,
          defender_modules: null,
          initialize: function() {
          	this.add_ViewModeChange = (new ClientLib.Vis.ViewModeChange).$ctor(this, this.onViewChange);
            this.buttonSimulateCombat = new qx.ui.form.Button("Simulate");
            this.buttonSimulateCombat.set({width: 80, appearance: "button-text-small", toolTipText: "Start Combat Simulation"});
            this.buttonSimulateCombat.addListener("click", this.startSimulation, this);
            
            this.buttonGetProTools = new qx.ui.form.Button("Pro?");
            this.buttonGetProTools.set({width: 50, appearance: "button-text-small", toolTipText: "Get Pro Simulator Tools"});
            this.buttonGetProTools.addListener("click", this.toggleGetPro, this);
            
            this.buttonReturnSetup = new qx.ui.form.Button("Setup");
            this.buttonReturnSetup.set({width: 80, appearance: "button-text-small", toolTipText: "Return to Combat Setup"});
            this.buttonReturnSetup.addListener("click", this.returnSetup, this);
            
            // The Battle Simulator Pro box
            this.battleResultsBox = new qx.ui.window.Window("Battle Simulator Pro");
            this.battleResultsBox.setPadding(10);
					  this.battleResultsBox.setLayout(new qx.ui.layout.VBox(10));
					  this.battleResultsBox.setShowMaximize(false);
					  this.battleResultsBox.setShowMinimize(false);
					  this.battleResultsBox.moveTo(115, 200);
					  this.battleResultsBox.setHeight(400);
					  this.battleResultsBox.setWidth(200);
					  this.battleResultsBox.getApplicationRoot().set({
						  blockerColor: '#000000',
						  blockerOpacity: 0.6
						});
						
						// The Help Vertical Box
					  var pVBox = new qx.ui.container.Composite()
					  pVBox.setLayout(new qx.ui.layout.VBox(5));
					  pVBox.setThemedFont("bold");
						pVBox.setThemedPadding(2);
						pVBox.setThemedBackgroundColor("#eef");
						this.battleResultsBox.add(pVBox);
						var proHelpBar = new qx.ui.basic.Label().set({
					    value: "<a target='_blank' href='http://www.youtube.com/watch?v=TcgryVL9jnk'>Pro</a> | <a target='_blank' href='http://www.moneyscripts.net/ta/faq'>FAQ</a> | <a target='_blank' href='http://userscripts.org/scripts/discuss/130344'>Forums</a>",
					    rich : true
					  });
					  pVBox.add(proHelpBar);
					  
					  _this = this;
					  setTimeout(function() {
					  	try {
						  	// Get the active modules
								// Doing this the hard and unreliable way for now, until we figure out a better way
								
								/*
								_this.attacker_modules = {};
								_this.defender_modules = {};
								var report_id = 3133449;
								ClientLib.Net.CommunicationManager.GetInstance().SendSimpleCommand ("GetCombatData",{playerReportId:report_id}, (new ClientLib.Net.CommandResult).$ctor(this,function(context, result){
								var combatData=(new ClientLib.Data.Combat).$ctor$1();
								combatData.SetCombatData$0(result); 
								_this.attacker_modules = combatData.m_AttackerModules;
								_this.defender_modules = combatData.m_DefenderModules;
								}), null);
								*/
								
								_this.attacker_modules = {};
								var g = ClientLib.Res.ResMain.GetInstance$10();
								var player = ClientLib.Data.MainData.GetInstance$9().get_Player$2();
								_this.attacker_modules.l = [];
								for (var i in g.m_Gamedata.units) {
									var ug = g.GetUnit$0(i);
									var research = player.m_PlayerResearch.GetResearchItemFomMdbId(ug.tl);
									var modules = ug.m;
									for (var j in modules) {
									  var module = modules[j];
									  if (module.t == 1) {
									    _this.attacker_modules.l.push(module.i);
									  }
									  if (research && module.t == 3 && research.m_Level == 2) {
									    _this.attacker_modules.l.push(module.i);
									  }
									}
								}
								
								_this.defender_modules = _this.attacker_modules;
							}
							catch(e) {
								console.log(e);
							}
					  	
					  	ClientLib.Vis.VisMain.GetInstance().add_ViewModeChange(_this.add_ViewModeChange);
					  	// Add a refresh button for the user to manually check for pro. Should only need to do it one time at max
					  	_this.buttonCheckPro = new qx.ui.form.Button("Refresh Pro");
						  _this.buttonCheckPro.set({appearance: "button-text-small", toolTipText: "Try to load pro."});
						  _this.buttonCheckPro.addListener("click", function() {
						  	_this.buttonCheckPro.setLabel("Checking...");
						  	_this.buttonCheckPro.setEnabled(false);
						  	var head = document.getElementsByTagName('head')[0];
							  var script = document.createElement('script');
							  script.type = 'text/javascript';
							  script.src = 'https://dl.dropbox.com/s/0hp6yp5led4lhw0/pro3.js';
							  head.appendChild(script);
						  }, _this);
						  _this.battleResultsBox.add(_this.buttonCheckPro);
					  	
					  	var proDonateText = new qx.ui.basic.Label().set({
						    value: "Battle Simulator Pro is only available to supporters of the project. To become a supporter, simply donate $1 or more by clicking the button below. If the donation is for less than $1, it won't qualify for the pro access. To see what the Pro version adds, take a look at this short video: <a style='color: #efefef;' target='_blank' href='http://www.youtube.com/watch?v=TcgryVL9jnk'>Pro Video</a>. You will be given access to Pro immediately after the donation is received, usually within a minute or two. <a style='color: #efefef;' target='_blank' href='http://www.moneyscripts.net/ta/terms'>Terms & Conditions</a>",
						    rich : true,
						    width: 180,
						    textAlign: 'justify'
						  });
						  proDonateText.setTextColor("white");
						  _this.battleResultsBox.add(proDonateText);
						  
						  if (ClientLib.Data.MainData.GetInstance().m_Player.name) {
							  var paypalButton = new qx.ui.basic.Label().set({
							    value: "<form action='https://www.paypal.com/cgi-bin/webscr' method='post'><input type='hidden' name='cmd' value='_s-xclick'><input type='hidden' name='hosted_button_id' value='DB5VHSWX3CKR4'><input type='hidden' name='custom' value='" + ClientLib.Data.MainData.GetInstance().m_Player.name.toString() +"'><input type='image' src='https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif' border='0' name='submit' alt='PayPal - The safer, easier way to pay online!'><img alt='' border='0' src='https://www.paypalobjects.com/en_US/i/scr/pixel.gif' width='1' height='1'></form>",
							    rich : true,
							    width: 180,
							    textAlign: 'center'
							  });
								_this.battleResultsBox.add(paypalButton);
							}
					  	
					  	// Check for the pro script if they have it for sure
					  	if (localStorage.getItem("tasim_pro") == "true") {
						  	var head = document.getElementsByTagName('head')[0];
							  var script = document.createElement('script');
							  script.type = 'text/javascript';
							  script.src = 'https://dl.dropbox.com/s/0hp6yp5led4lhw0/pro3.js';
							  head.appendChild(script);
						  }
					  }, 10000);
					  
            var armyBar = qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_ATTACKSETUP);
            armyBar.add(this.buttonSimulateCombat, {top: 130, right: 0});
            armyBar.add(this.buttonGetProTools, {top: 16, right: 7});
            
            var replayBar = qx.core.Init.getApplication().getReportReplayOverlay();
            replayBar.add(this.buttonReturnSetup, {top: 10, right: 80});
            
            this.troopDamageLabel = new qx.ui.basic.Label().set({
					    value: "<span style='color: black; font-weight: bold;'>Troop Strength: 100%</span>",
					    rich : true
					  });
						replayBar.add(this.troopDamageLabel, { right : 100, top: 30});
            
            this.buttonUnlockAttack = new qx.ui.form.Button("Unlock");
						this.buttonUnlockAttack.set({width: 60, height: 45, appearance: "button-text-small", toolTipText: "Unlock"});
						this.buttonUnlockAttack.addListener("click", this.unlockAttacks, this);
						armyBar.add(this.buttonUnlockAttack, {top: 81, right: 0});
          },
          closeProBox: function() {
						this.battleResultsBox.close();
					},
          onViewChange: function(oldMode, newMode) {
          	try {
	          	if (newMode == webfrontend.gui.PlayArea.PlayArea.modes.EMode_CombatSetupDefense) {
	            	var current_city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity().get_Id();
	          		if (localStorage.ta_sim_last_city != current_city) {
	          			// Reset the battleground
	          			this.bustCache();
	          		}
	          	}
	          	if (newMode == webfrontend.gui.PlayArea.PlayArea.modes.EMode_PlayerDefense) {
	          		this.closeProBox();
	          	}
          	}
          	catch(e) {
          		console.log(e);
          		if (newMode == webfrontend.gui.PlayArea.modes.EMode_CombatSetupDefense) {
	            	var current_city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity().get_Id();
	          		if (localStorage.ta_sim_last_city != current_city) {
	          			// Reset the battleground
	          			this.bustCache();
	          		}
	          	}
	          	if (newMode == webfrontend.gui.PlayArea.modes.EMode_PlayerDefense) {
	          		this.closeProBox();
	          	}
          	}
          },
					unlockAttacks: function() {
						var armyBar = qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_ATTACKSETUP);
						armyBar.remove(this.buttonUnlockAttack);
						var _this = this;
						setTimeout(function() { armyBar.add(_this.buttonUnlockAttack); }, 2000);
					},
          toggleGetPro: function() {
          	var armyBar = qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_ATTACKSETUP);
          	if (this.battleResultsBox.isVisible()) {
          		this.battleResultsBox.close();
          	}
          	else {
          		this.battleResultsBox.moveTo(115, 200);
						  this.battleResultsBox.setHeight(400);
						  this.battleResultsBox.setWidth(200);
          		this.battleResultsBox.open();
          	}
          },
          returnSetup: function() {
            // Set the scene again, just in case it didn't work the first time
            var app = qx.core.Init.getApplication();
            var player_cities =ClientLib.Data.MainData.GetInstance().get_Cities();
            var current_city = player_cities.get_CurrentCity();
            try {
            	app.getPlayArea().setView(webfrontend.gui.PlayArea.PlayArea.modes.EMode_CombatSetupDefense, localStorage.ta_sim_last_city, 0, 0);
            }
            catch (e) {
            	app.getPlayArea().setView(webfrontend.gui.PlayArea.modes.EMode_CombatSetupDefense, localStorage.ta_sim_last_city, 0, 0);
            }
          },
          calculateTroopStrength: function(battleground) {
          	var total_hp = 0;
            var end_hp = 0;
            
            for (i in battleground.m_Entities.d) {
            	var entity = battleground.m_Entities.d[i];
						  if (entity.get_Entity$0().m_eAlignment == SharedLib.Combat.ECbtAlignment.Attacker) {
						  	// This is one of the good guys
						  	total_hp += entity.m_Entity.m_iHitpoints;
						  	end_hp += entity.m_Entity.m_iHitpointsCurrent;
						  }
					  }
					  
					  return percentage = Math.floor((end_hp / total_hp) * 100);
          },
          updateTroopStrength: function(battleground) {
					  var percentage = this.calculateTroopStrength(battleground);
					  
					  this.troopDamageLabel.setValue("<span style='color: black; font-weight: bold;'>Troop Strength: " + percentage.toString() + "%</span>");
          },
          onDamageDone: function(sender, e) {
          	// Try to update the Troop Strength meter
						try {
	            battleground = sender.DamageDone.i[0].o;
	            // For the sake of performance, only run this every 10th step
	            if (battleground.m_CurrentStep % 10 == 0) {
		            window.TASuite.main.getInstance().updateTroopStrength(battleground);
						  }
						}
	          catch (e) {
	          	console.log(e);
	          }
          },
          onDefenseDestroyed: function(sender, e) {
          	// Try to update the Troop Strength meter
						try {
	            battleground = sender.DamageDone.i[0].o;
		          window.TASuite.main.getInstance().updateTroopStrength(battleground);
						}
	          catch (e) {
	          	console.log(e);
	          }
          },
          bustCache: function() {
          	// Bust the cache
        		try {
	            var own_city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
        			own_city.m_CityArmyFormationsManager.m_ArmyFormations.d[own_city.m_CityArmyFormationsManager.m_CurrentTargetBaseId].CopyCityOffenseUnitsLayout$0();
        		}
        		catch(e) {
        			console.log(e);
        		}
          },
          setupBattleground: function(offense_units) {
          	var mainData = ClientLib.Data.MainData.GetInstance();
            var player_cities = mainData.get_Cities();
            var current_city = player_cities.get_CurrentCity();
            var own_city = player_cities.get_CurrentOwnCity();
            
            localStorage.ta_sim_last_city = current_city.get_Id();
            
            var alliance = ClientLib.Data.MainData.GetInstance().m_Alliance;
            var combatData = (new ClientLib.Data.Combat).$ctor$1();
            combatData.m_Version = 1;
            
            var unitData = own_city.m_CityUnits.m_OffenseUnits.l;
            var data = new Array();
            
            try {
            	console.log(offense_units);
            	offense_units = offense_units || own_city.m_CityArmyFormationsManager.m_ArmyFormations.d[current_city.get_Id()];
            	console.log(offense_units);
	            for(var i = 0; i < unitData.length; i++)  {
	              var info = new Object();
	              info.h = unitData[i].m_CurrentHealth;
	              info.i = unitData[i].m_MdbUnitId
	              info.l = unitData[i].m_CurrentLevel
	              info.x = offense_units.m_ArmyUnits.l[i].m_CoordX
	              info.y = offense_units.m_ArmyUnits.l[i].m_CoordY
	              data.push(info);
	            }
            }
            catch (e) {
            	console.log(e);
            }
            combatData.m_Attacker = data;
            
            unitData = current_city.m_CityUnits.m_DefenseUnits.l;
            data = new Array();
            for(i = 0; i < unitData.length; i++)  {
              info = new Object();
              info.h = unitData[i].m_CurrentHealth;
              info.i = unitData[i].m_MdbUnitId;
              info.l = unitData[i].m_CurrentLevel;
              info.x = unitData[i].m_Coords.m_iX;
              info.y = unitData[i].m_Coords.m_iY;
              data.push(info);
            }
            combatData.m_Defender = data;

            data = new Array();
            for (var i=0; (i < 9); i++) {
              for (var j=0; (j < 8); j++) {
                var terrainType=current_city.GetResourceType$0(i, (j + current_city.get_CityHeight$0()));
                var unitType=-1;
                switch (terrainType)
                {
                  case ClientLib.Data.ECityTerrainType.FOREST: {
                    unitType=0x7c;
                    break;
                  }
                  case ClientLib.Data.ECityTerrainType.BRIAR: {
                    unitType=0x7b;
                    break;
                  }
                  case ClientLib.Data.ECityTerrainType.SWAMP: {
                    unitType=0x7d;
                    break;
                  }
                  case ClientLib.Data.ECityTerrainType.WATER: {
                    unitType=0x7e;
                    break;
                  }
                }
                if(unitType != -1)
                {
                  info = new Object();
                  info.h = 100;
                  info.i = unitType;
                  info.l = 1;
                  info.x = i;
                  info.y = j;
                  data.push(info);
                }
              }
            } 
            combatData.m_Blocker = data;

            unitData = current_city.m_CityBuildings.m_Buildings.l;
            data = new Array();
            for(i = 0; i < unitData.length; i++)  {
              info = new Object();
              info.h = unitData[i].m_CurrentHealth;
              info.i = unitData[i].m_MdbUnitId;
              info.l = unitData[i].m_CurrentLevel;
              info.x = unitData[i].m_Coords.m_iX;
              info.y = unitData[i].m_Coords.m_iY;
              data.push(info);
            }
            combatData.m_Buildings = data;
            
            combatData.m_Supports = null;
            combatData.m_StartStep = 5902339;
            combatData.m_CombatSteps = 1;
            combatData.m_BoostInfantry = alliance.get_POIInfantryBonus();
            combatData.m_BoostVehicle = alliance.get_POIVehicleBonus();
            combatData.m_BoostAir = alliance.get_POIAirBonus();
            combatData.m_BoostDefense = current_city.m_AllianceDefenseBonus;
            combatData.m_AttackerBaseId = own_city.get_Id();
            combatData.m_AttackerBaseName = own_city.get_Name();
            combatData.m_AttackerPlayerId = own_city.get_PlayerId();
            combatData.m_AttackerPlayerName = own_city.get_OwnerName();
            combatData.m_AttackerAllianceId = own_city.get_AllianceId();
            combatData.m_AttackerAllianceName = own_city.get_OwnerAllianceName();
            combatData.m_DefenderBaseId = current_city.get_Id();
            combatData.m_DefenderBaseName = current_city.get_Name();
            combatData.m_DefenderPlayerId = own_city.get_PlayerId();
            combatData.m_DefenderPlayerName = current_city.get_OwnerName();
            combatData.m_DefenderAllianceId = current_city.get_AllianceId();
            combatData.m_DefenderAllianceName = current_city.get_OwnerAllianceName();
            combatData.m_DefenderBlockStep = 0;
            combatData.m_AttackTimeStamp = new Date().getTime();
            var resourceLayout = new Object();
            resourceLayout.l = new Array();
            for (var i=0; (i < combatData.m_Buildings.length); i++) {
              resourceLayout.l[combatData.m_Buildings[i].y] = 0;
            }
            combatData.m_ResourceLayout = resourceLayout;
            combatData.m_DefenderFaction = current_city.get_CityFaction();
            combatData.m_AttackerModules = this.attacker_modules;
            combatData.m_DefenderModules = this.defender_modules;
            
            if(((combatData.m_DefenderFaction == ClientLib.Base.EFactionType.FORFaction) || (combatData.m_DefenderFaction == ClientLib.Base.EFactionType.NPCBase)) || (combatData.m_DefenderFaction == ClientLib.Base.EFactionType.NPCCamp))
            {
	  					combatData.SetNPCNames$0();
            }
            combatData.m_MaxDuration = 120;
            combatData.m_Complete = false;
            if(combatData.m_Complete) {
	  					combatData.m_Id=-1;
            }
            combatData.m_Debug = null;
	
            var battleground = ClientLib.Vis.VisMain.GetInstance().get_Battleground(); 
            battleground.Reset();
            battleground.m_CurrentReplay = combatData;
            battleground.InitBattle$0();
            battleground.SetCombatData$1(combatData);
            battleground.StartBattle$0();
            battleground.m_BattleDuration = (1200 * Math.floor(0x3e8 / battleground.m_SimSetup.get_SubSteps$0()));
                          
            return battleground;
          },
          startSimulation: function() {
          	var app = qx.core.Init.getApplication();
          	var player_cities = ClientLib.Data.MainData.GetInstance().get_Cities();
          	var current_city = player_cities.get_CurrentCity();
          	
          	window.TASuite.main.getInstance().troopDamageLabel.setValue("<span style='color: black; font-weight: bold;'>Troop Strength: 100%</span>");
            
            try {
            	app.getPlayArea().setView(webfrontend.gui.PlayArea.PlayArea.modes.EMode_CombatReplay, current_city.get_Id(), 0, 0);
            }
            catch (e) {
            	app.getPlayArea().setView(webfrontend.gui.PlayArea.modes.EMode_CombatReplay, current_city.get_Id(), 0, 0);
            }
            var battleground = this.setupBattleground();
            
            // Add the event listeners
            battleground.m_Simulation.add_DamageDone$0((new System.EventHandler).$ctor(this, this.onDamageDone));
            battleground.m_Simulation.add_OnDestroyDefense$0((new System.EventHandler).$ctor(this,this.onDefenseDestroyed));
            
            // Set the scene again, just in case it didn't work the first time
            try {
            	app.getPlayArea().setView(webfrontend.gui.PlayArea.PlayArea.modes.EMode_CombatReplay, current_city.get_Id(), 0, 0);
            }
            catch (e) {
            	app.getPlayArea().setView(webfrontend.gui.PlayArea.modes.EMode_CombatReplay, current_city.get_Id(), 0, 0);
            }
          }
        }
      });
    }
    
    function TASuite_checkIfLoaded() {
      try {
        if (typeof qx != 'undefined') {
          a = qx.core.Init.getApplication(); // application
          mb = qx.core.Init.getApplication().getMenuBar();
          if (a && mb) {
            createTweak();
            window.TASuite.main.getInstance().initialize();
          } else
            window.setTimeout(TASuite_checkIfLoaded, 1000);
        } else {
          window.setTimeout(TASuite_checkIfLoaded, 1000);
        }
      } catch (e) {
        if (typeof console != 'undefined') console.log(e);
        else if (window.opera) opera.postError(e);
        else GM_log(e);
      }
    }
    
    if (/commandandconquer\.com/i.test(document.domain)) {
      window.setTimeout(TASuite_checkIfLoaded, 1000);
    }
  }

  // injecting, because there seem to be problems when creating game interface with unsafeWindow
  var TASuiteScript = document.createElement("script");
  var txt = TASuite_mainFunction.toString();
  TASuiteScript.innerHTML = "(" + txt + ")();";
  TASuiteScript.type = "text/javascript";
  if (/commandandconquer\.com/i.test(document.domain)) {
    document.getElementsByTagName("head")[0].appendChild(TASuiteScript);
  }

})();