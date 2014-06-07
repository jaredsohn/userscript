// ==UserScript==
// @name           NEW
// @description    Allows you to simulate combat before actually attacking.
// @namespace      https://prodgame*.alliances.commandandconquer.com/*/index.aspx* 
// @include        https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version        1.0
// @author         DFONAJU - TAGUIARCC
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
          initialize: function() {
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
					  
					  _this = this;
					  setTimeout(function() {
					  	// Add a refresh button for the user to manually check for pro. Should only need to do it one time at max
					  	_this.buttonCheckPro = new qx.ui.form.Button("Refresh Pro");
						  _this.buttonCheckPro.set({appearance: "button-text-small", toolTipText: "Try to load pro."});
						  _this.buttonCheckPro.addListener("click", function() {
						  	_this.buttonCheckPro.setLabel("Checking...");
						  	_this.buttonCheckPro.setEnabled(false);
						  	var head = document.getElementsByTagName('head')[0];
							  var script = document.createElement('script');
							  script.type = 'text/javascript';							  
							  script.src = 'http://userscripts.org/scripts/source/135807.user.js';
							  head.appendChild(script);
						  }, _this);
						  _this.battleResultsBox.add(_this.buttonCheckPro);
					  	
					  	var proDonateText = new qx.ui.basic.Label().set({
						    value: "Battle Simulator Pro is only available to supporters of the project. To become a supporter, simply donate $1 or more by clicking the button below. If the donation is for less than $1, it won't qualify for the pro access. To see what the Pro version adds, take a look at this short video: <a style='color: #efefef;' target='_blank' href='http://www.youtube.com/watch?v=xVQ-l7BjTco'>Pro Video</a>. You will be given access to Pro immediately after the donation is received, usually within a minute or two. <a style='color: #efefef;' target='_blank' href='http://www.moneyscripts.net/ta/terms'>Terms & Conditions</a>",
						    rich : true,
						    width: 180,
						    textAlign: 'justify'
						  });
						  proDonateText.setTextColor("white");
						  _this.battleResultsBox.add(proDonateText);
						  
						  var paypalButton = new qx.ui.basic.Label().set({
						    value: "<form action='https://www.paypal.com/cgi-bin/webscr' method='post'><input type='hidden' name='cmd' value='_s-xclick'><input type='hidden' name='hosted_button_id' value='DB5VHSWX3CKR4'><input type='hidden' name='custom' value='" + ClientLib.Data.MainData.GetInstance().m_Player.accountId +"'><input type='image' src='https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif' border='0' name='submit' alt='PayPal - The safer, easier way to pay online!'><img alt='' border='0' src='https://www.paypalobjects.com/en_US/i/scr/pixel.gif' width='1' height='1'></form>",
						    rich : true,
						    width: 180,
						    textAlign: 'center'
						  });
							_this.battleResultsBox.add(paypalButton);
					  	
					  	// Check for the pro script if they have it for sure
					  	if (localStorage.getItem("tasim_pro") == "true") {
						  	var head = document.getElementsByTagName('head')[0];
							  var script = document.createElement('script');
							  script.type = 'text/javascript';
							  script.src = 'http://userscripts.org/scripts/source/135807.user.js';
							  head.appendChild(script);
						  }
					  }, 5000);
					  
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
          setupBattleground: function() {
          	var app = qx.core.Init.getApplication();
            var vis_main = ClientLib.Vis.VisMain.GetInstance();
            var battleground = vis_main.get_Battleground();
            var player_cities = ClientLib.Data.MainData.GetInstance().get_Cities();
            var current_city = player_cities.get_CurrentCity();
            var own_city = player_cities.get_CurrentOwnCity();
            localStorage.ta_sim_last_city = current_city.get_Id();
            
            ClientLib.Data.MainData.GetInstance$9().get_Combat$1().set_Id$0(-1);
            
            // First reset the battlefield
            battleground.Reset();
            battleground.m_CurrentReplay = null;
            battleground.InitBattle();
            battleground.m_BattleDuration = (1200 * Math.floor(0x3e8 / battleground.m_SimSetup.get_SubSteps$0()));
            
            // Let's add the bonuses for POI
            var alliance = ClientLib.Data.MainData.GetInstance().m_Alliance;
            try {
              battleground.set_BoostOffInfantry(alliance.get_POIInfantryBonus());
              battleground.set_BoostOffVehicles(alliance.get_POIVehicleBonus());
              battleground.set_BoostOffAir(alliance.get_POIAirBonus());
              battleground.set_BoostDef(current_city.m_AllianceDefenseBonus);
            }
            catch (e) {
              console.log(e);
            }
            
            // Add the offense, defense and base
            battleground.AddBase(current_city);
            
						try {
							// Get the active modules
							// Doing this the hard and unreliable way for now, until we figure out a better way
							var active_modules = {};
							var g = ClientLib.Res.ResMain.GetInstance$10();
							var player=ClientLib.Data.MainData.GetInstance$9().get_Player$2();
							active_modules.l = [];
							for (var i in g.m_Gamedata.units) {
								var ug = g.GetUnit$0(i);
								for (var j in ug.m) {
								  var module = ug.m[j];
								  var research = player.m_PlayerResearch.GetResearchItemFomMdbId(ug.tl);
								  if (module.t == 1) {
								    active_modules.l.push(module.i);
								  }
								  if (module.t == 3 && research.m_Level == 2) {
								    active_modules.l.push(module.i);
								  }
								}
							}
							
	            battleground.AddOffense(own_city.m_CityArmyFormationsManager.m_ArmyFormations.d[own_city.m_CityArmyFormationsManager.m_CurrentTargetBaseId], active_modules);
	            battleground.AddDefense(current_city.get_CityUnitsData(), active_modules);
            }
            catch (e) {
            	battleground.AddOffense(own_city.m_CityArmyFormationsManager.m_ArmyFormations.d[own_city.m_CityArmyFormationsManager.m_CurrentTargetBaseId]);
	            battleground.AddDefense(current_city.get_CityUnitsData());
            }
            
            battleground.SetDefender(current_city.get_Name(), current_city.get_OwnerName(), current_city.get_OwnerAllianceName(), current_city.get_CityFaction());
            
            // Initiation
            battleground.StartBattle();
            
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