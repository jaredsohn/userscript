// ==UserScript==
// @name           Tiberium Alliances Combat Simulator
// @description    Allows you to simulate combat before actually attacking.
// @namespace      https://prodgame*.alliances.commandandconquer.com/*/index.aspx* 
// @include        https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version        1.3.0.9
// @author         WildKatana
// @require        http://sizzlemctwizzle.com/updater.php?id=130344&days=1
// ==/UserScript==
(function () {
  var TASuite_mainFunction = function () {
      function createTweak() {
        var TASuite = {};
        qx.Class.define("TASuite.main", {
          type: "singleton",
          extend: qx.core.Object,
          members: {
            buttonSimulateCombat: null,
            buttonLayoutSave: null,
            buttonLayoutLoad: null,
            buttonReturnSetup: null,
            buttonUnlockAttack: null,
            
            add_ViewModeChange: null,
            
            attacker_modules: null,
            defender_modules: null,
            
            lastPercentage: null,
            lastRepairTime: null,
            lastEnemyPercentage: null,
            lastDFPercentage: null,
            lastCYPercentage: null,
            lastInfantryPercentage: null,
            lastVehiclePercentage: null,
            lastAirPercentage: null,
            lastEnemyUnitsPercentage: null,
            lastEnemyBuildingsPercentage: null,
            lastVictory: null,
            lastInfantryRepairTime: null,
            lastVehicleRepairTime: null,
            lastAircraftRepairTime: null,
            totalSeconds: null,
            
            tiberiumSpoils: null,
            crystalSpoils: null,
            creditSpoils: null,
            researchSpoils: null,
            
            units: null,
            units_list: null,
            saved_units: null,
            layoutsList: null,
            layoutsLabelText: null,
            
            battleResultsBox: null,
            
            troopDamageLabel: null,
            enemyTroopStrengthLabel: null,
            enemyBuildingsStrengthLabel: null,
            enemyUnitsStrengthLabel: null,
            airTroopStrengthLabel: null,
            infantryTroopStrengthLabel: null,
            vehicleTroopStrengthLabel: null,
            CYTroopStrengthLabel: null,
            DFTroopStrengthLabel: null,
            simTroopDamageLabel: null,
            simRepairTimeLabel: null,
            simVictoryLabel: null,
            simTimeLabel: null,
            enemySupportLevelLabel: null,
            enemySupportStrengthLabel: null,
            
            initialize: function () {
              this.add_ViewModeChange = (new ClientLib.Vis.ViewModeChange).HGL(this, this.onViewChange);
              this.buttonSimulateCombat = new qx.ui.form.Button("Simulate");
              this.buttonSimulateCombat.set({
                width: 80,
                appearance: "button-text-small",
                toolTipText: "Start Combat Simulation"
              });
              this.buttonSimulateCombat.addListener("click", this.startSimulation, this);

              this.buttonReturnSetup = new qx.ui.form.Button("Setup");
              this.buttonReturnSetup.set({
                width: 80,
                appearance: "button-text-small",
                toolTipText: "Return to Combat Setup"
              });
              this.buttonReturnSetup.addListener("click", this.returnSetup, this);
              
              var replayBar = qx.core.Init.getApplication().getReportReplayOverlay();
              replayBar.add(this.buttonReturnSetup, {
                top: 10,
                right: 80
              });

              _this = this;
              setTimeout(function () {
                try {
                  // Get the active modules
                  // Doing this the hard and unreliable way for now, until we figure out a better way
                  _this.attacker_modules = {};
                  _this.attacker_modules.l = [];
                  var g = ClientLib.Res.ResMain.GetInstance();
                  
                  // Get the player faction
                  // var gdi_unit_ids = g.GetFactionUnitIds(1);
                  // var nod_unit_ids = g.GetFactionUnitIds(2);
                  // var forgotten_unit_ids = g.GetFactionUnitIds(3);
                  
                  var player_research = ClientLib.Data.MainData.GetInstance().get_Player().get_PlayerResearch();
                  
                  for (var i in g.YEJ.units) {
                    var ug = g.GetUnit_Obj(i);
                    var research = player_research.GetResearchItemFomMdbId(ug.tl);
                    
                    var modules = ug.m;
                    for (var j in modules) {
                      var module = modules[j];
                      if (research && module.r.length > 0) {
                        try {
                          // This is an upgradeable ability
                          var required_level = module.r[0].l;
                          var current_level = research.get_CurrentLevel();
                          if (current_level >= required_level) {
                            _this.attacker_modules.l.push(module.i);
                          }
                        }
                        catch (e) {
                          console.log(e);
                        }
                      }
                      else {
                        _this.attacker_modules.l.push(module.i);
                      }
                    }
                  }
                  
                  // Get the defender modules

                  _this.defender_modules = _this.attacker_modules;
                  ClientLib.Vis.VisMain.GetInstance().add_ViewModeChange(_this.add_ViewModeChange);
                } catch (e) {
                  console.log(e);
                }
              }, 10000);

              var armyBar = qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_ATTACKSETUP);
              armyBar.add(this.buttonSimulateCombat, {
                top: 130,
                right: 0
              });
              
              this.buttonUnlockAttack = new qx.ui.form.Button("Unlock");
              this.buttonUnlockAttack.set({
                width: 60,
                height: 45,
                appearance: "button-text-small",
                toolTipText: "Unlock"
              });
              this.buttonUnlockAttack.addListener("click", this.unlockAttacks, this);
              this.buttonUnlockAttack.setOpacity(0.5);
              armyBar.add(this.buttonUnlockAttack, {
                top: 81,
                right: 0
              });
            },
            unlockAttacks: function () {
              var armyBar = qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_ATTACKSETUP);
              armyBar.remove(this.buttonUnlockAttack);
              var _this = this;
              setTimeout(function () {
                armyBar.add(_this.buttonUnlockAttack);
              }, 2000);
            },
            onViewChange: function (oldMode, newMode) {
              try {
                if (oldMode == webfrontend.gui.PlayArea.PlayArea.modes.EMode_CombatSetupDefense && newMode == webfrontend.gui.PlayArea.PlayArea.modes.EMode_PlayerOffense) {
                  // TODO - Switched from Combat Setup to the Simulation, show the stats box
                  
                }
                else {
                  // TODO - Close the stats box
                }
              } catch (e) {
                console.log(e);
              }
            },
            returnSetup: function () {
              // Set the scene again, just in case it didn't work the first time
              var app = qx.core.Init.getApplication();
              var player_cities = ClientLib.Data.MainData.GetInstance().get_Cities();
              var current_city = player_cities.get_CurrentCity();
              try {
                app.getPlayArea().setView(webfrontend.gui.PlayArea.PlayArea.modes.EMode_CombatSetupDefense, localStorage.ta_sim_last_city, 0, 0);
              } catch (e) {
                app.getPlayArea().setView(webfrontend.gui.PlayArea.modes.EMode_CombatSetupDefense, localStorage.ta_sim_last_city, 0, 0);
              }
            },
            setupBattleground: function () {
              try {
                $I.LZH.KAI().EAI().JM(-1);
                var mainData = ClientLib.Data.MainData.GetInstance();
                var player_cities = mainData.get_Cities();
                var current_city = player_cities.get_CurrentCity();
                var own_city = player_cities.get_CurrentOwnCity();
                
                // Bust the cache
                //own_city.get_CityArmyFormationsManager().ZJG.d[own_city.get_CityArmyFormationsManager().XJG].UpdateFormation();
                
                localStorage.ta_sim_last_city = current_city.get_Id();

                var alliance = ClientLib.Data.MainData.GetInstance().get_Alliance();
                var combatData = (new $I.CM).$ctor();
                //var combatData = (new $I.CM).QB();
                combatData.RN = 1; // Version
                
                var unitData = own_city.get_CityUnitsData().HIG.l;
                var offense_units = own_city.get_CityArmyFormationsManager().ZJG.d[current_city.get_Id()].get_ArmyUnits().l; // FIXME - This is failing when there is a new city before moving a unit... That's why we need to bust the cache
                var data = new Array();

                for (var i = 0; i < unitData.length; i++) {
                  var info = new Object();
                  info.h = unitData[i].get_Health();
                  info.i = unitData[i].get_MdbUnitId();
                  info.l = unitData[i].get_CurrentLevel();
                  info.x = offense_units[i].get_CoordX();
                  info.y = offense_units[i].get_CoordY();
                  data.push(info);
                }

                combatData.TN = data; // Attackers

                unitData = current_city.get_CityUnitsData().QIG.l;
                data = new Array();
                for (i = 0; i < unitData.length; i++) {
                  info = new Object();
                  info.h = unitData[i].get_Health();
                  info.i = unitData[i].get_MdbUnitId();
                  info.l = unitData[i].get_CurrentLevel();
                  info.x = unitData[i].get_CoordX();
                  info.y = unitData[i].get_CoordY();
                  data.push(info);
                }
                combatData.UN = data; // Defenders

                data = new Array();
                for (var i = 0; i < 9; i++) {
                  for (var j = 0; j < 8 ; j++) {
                    var terrainType = current_city.GetResourceType(i, (j + 8));
                    var unitType = -1;
                    switch (terrainType) {
                      case ClientLib.Data.ECityTerrainType.FOREST:
                        unitType = 0x7c;
                        break;
                      case ClientLib.Data.ECityTerrainType.BRIAR:
                        unitType = 0x7b;
                        break;
                      case ClientLib.Data.ECityTerrainType.SWAMP:
                        unitType = 0x7d;
                        break;
                      case ClientLib.Data.ECityTerrainType.WATER:
                        unitType = 0x7e;
                        break;
                    }
                    
                    if (unitType != -1) {
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
                
                combatData.VN = data; // Terrain

                unitData = current_city.get_CityBuildingsData().ZEI.l;
                data = new Array();
                for (i = 0; i < unitData.length; i++) {
                  info = new Object();
                  info.h = unitData[i].get_Health();
                  info.i = unitData[i].get_MdbUnitId();
                  info.l = unitData[i].get_CurrentLevel();
                  info.x = unitData[i].get_CoordX();
                  info.y = unitData[i].get_CoordY();
                  data.push(info);
                }
                
                combatData.WN = data; // Buildings

                combatData.XN = null; // Support Structures
                combatData.SN = 8696244; // Start Step - this is just a random number
                combatData.m_CombatSteps = 1;
                combatData.m_BoostInfantry = alliance.get_POIInfantryBonus();
                combatData.m_BoostVehicle = alliance.get_POIVehicleBonus();
                combatData.m_BoostAir = alliance.get_POIAirBonus();
                combatData.m_BoostDefense = current_city.m_AllianceDefenseBonus ? current_city.m_AllianceDefenseBonus : 0; // This might not be working
                combatData.m_AttackerBaseId = own_city.get_Id();
                combatData.m_AttackerBaseName = own_city.get_Name();
                combatData.m_AttackerPlayerId = own_city.get_PlayerId();
                combatData.m_AttackerPlayerName = "Player"; // FIXME
                combatData.m_AttackerAllianceId = own_city.get_AllianceId();
                combatData.m_AttackerAllianceName = "Alliance"; // FIXME
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
                combatData.m_ResourceLayout = resourceLayout;
                combatData.m_DefenderFaction = current_city.get_CityFaction();
                combatData.m_AttackerModules = this.attacker_modules;
                combatData.m_DefenderModules = this.defender_modules;
                
                if (((combatData.m_DefenderFaction == $I.WHK.FORFaction) || (combatData.m_DefenderFaction == $I.WHK.NPCBase)) || (combatData.m_DefenderFaction == $I.WHK.NPCCamp)) {
                  combatData.GM();
                }

                combatData.m_MaxDuration = 120;
                combatData.m_Complete = false;
                combatData.ZN = null; // Debug

                var battleground = ClientLib.Vis.VisMain.GetInstance().get_Battleground();
                battleground.Reset();
                battleground.VBG = combatData;
                battleground.InitBattle();
                battleground.DXF(combatData);
                battleground.StartBattle();
                if (battleground.FAG < 0x1d4c0) {
                  //battleground.FAG += 0xbb8;
                }

                return battleground;
              } catch (e) {
                console.log(e);
              }
            },
            startSimulation: function () {
              try {
                var app = qx.core.Init.getApplication();
                var player_cities = ClientLib.Data.MainData.GetInstance().get_Cities();
                var current_city = player_cities.get_CurrentCity();

                try {
                  app.getPlayArea().setView(webfrontend.gui.PlayArea.PlayArea.modes.EMode_CombatReplay, current_city.get_Id(), 0, 0);
                } catch (e) {
                  app.getPlayArea().setView(webfrontend.gui.PlayArea.modes.EMode_CombatReplay, current_city.get_Id(), 0, 0);
                }
                var battleground = this.setupBattleground();

                // Set the scene again, just in case it didn't work the first time
                try {
                  app.getPlayArea().setView(webfrontend.gui.PlayArea.PlayArea.modes.EMode_CombatReplay, current_city.get_Id(), 0, 0);
                } catch (e) {
                  app.getPlayArea().setView(webfrontend.gui.PlayArea.modes.EMode_CombatReplay, current_city.get_Id(), 0, 0);
                }
              } catch (e) {
                console.log(e);
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
            } else window.setTimeout(TASuite_checkIfLoaded, 1000);
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