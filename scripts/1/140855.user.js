// ==UserScript==
// @name           Tiberium Alliances Combat Simulator
// @description    Allows you to simulate combat before actually attacking.
// @namespace      https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @include        https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version        1.4.0.9
// @author         WildKatana | Updated by CodeEcho, PythEch, Matthias Fuchs, Enceladus, KRS_L, TheLuminary, Panavia2, Da Xue, MrHIDEn, JDuarteDJ
// @require        http://sizzlemctwizzle.com/updater.php?id=138212
// ==/UserScript==
(function () {
  var TASuite_mainFunction = function () {
    console.log("Simulator loaded");

    // Using EA's API (Limited Support)
    function LimitedCreateTweak() {
      var TASuite = {};
      qx.Class.define("TASuite.main", {
        type: "singleton",
        extend: qx.core.Object,
        members: {
          buttons: {
            attack: {
              simulate: null, // buttonSimulateCombat
              unlock: null // buttonUnlockAttack
            },
            shiftFormationUp: null,
            shiftFormationDown: null,
            shiftFormationLeft: null,
            shiftFormationRight: null
          },
          units: null,
          saved_units: null,

          initialize: function () {
            var armyBar = qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_ATTACKSETUP);
            this.buttons.attack.simulate = new qx.ui.form.Button("Simulate");
            this.buttons.attack.simulate.set({
              width: 58,
              appearance: "button-text-small",
              toolTipText: "Start Combat Simulation"
            });
            this.buttons.attack.simulate.addListener("click", this.startSimulation, this);
            armyBar.add(this.buttons.attack.simulate, {
              top: 112,
              right: 62
            });
            this.buttons.attack.unlock = new qx.ui.form.Button("Unlock");
            this.buttons.attack.unlock.set({
              width: 55,
              height: 46,
              appearance: "button-text-small",
              toolTipText: "Unlock Attack Button"
            });
            this.buttons.attack.unlock.addListener("click", this.unlockAttacks, this);
            this.buttons.attack.unlock.setOpacity(0.5);
            armyBar.add(this.buttons.attack.unlock, {
              top: 107,
              right: 4
            });

            this.buttons.ShiftFormationLeft = new qx.ui.form.Button("<");
            this.buttons.ShiftFormationLeft.set({
              width: 30,
              appearance: "button-text-small",
              toolTipText: "Shift units Left"
            });
            this.buttons.ShiftFormationLeft.addListener("click", this.shiftFormationLeft, this);

            this.buttons.ShiftFormationRight = new qx.ui.form.Button(">");
            this.buttons.ShiftFormationRight.set({
              width: 30,
              appearance: "button-text-small",
              toolTipText: "Shift units RIGHT"
            });
            this.buttons.ShiftFormationRight.addListener("click", this.shiftFormationRight, this);

            this.buttons.ShiftFormationUp = new qx.ui.form.Button("^");
            this.buttons.ShiftFormationUp.set({
              width: 30,
              appearance: "button-text-small",
              toolTipText: "Shift units UP"
            });
            this.buttons.ShiftFormationUp.addListener("click", this.shiftFormationUp, this);

            this.buttons.ShiftFormationDown = new qx.ui.form.Button("v");
            this.buttons.ShiftFormationDown.set({
              width: 30,
              appearance: "button-text-small",
              toolTipText: "Shift units DOWN"
            });
            this.buttons.ShiftFormationDown.addListener("click", this.shiftFormationDown, this);

            armyBar.add(this.buttons.ShiftFormationUp, {
              top: 21,
              right: 77
            });
            armyBar.add(this.buttons.ShiftFormationLeft, {
              top: 40,
              right: 92
            });
            armyBar.add(this.buttons.ShiftFormationRight, {
              top: 40,
              right: 62
            });
            armyBar.add(this.buttons.ShiftFormationDown, {
              top: 55,
              right: 77
            });

            _this = this;
          },
          unlockAttacks: function () {
            var armyBar = qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_ATTACKSETUP);
            armyBar.remove(this.buttons.attack.unlock);
            var _this = this;
            setTimeout(function () {
              armyBar.add(_this.buttons.attack.unlock);
            }, 2000);
          },
          startSimulation: function () {
            try {
              var ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
              var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();
              ownCity.get_CityArmyFormationsManager().set_CurrentTargetBaseId(city.get_Id());
              ClientLib.Data.MainData.GetInstance().get_Combat().Clear();
              city.SimulateBattle();
              ClientLib.Data.MainData.GetInstance().get_Combat().set_Id(city.get_Id());
              var app = qx.core.Init.getApplication();
              app.getPlayArea().setView(webfrontend.gui.PlayArea.PlayArea.modes.EMode_CombatAttacker, city.get_Id(), 0, 0);

            } catch (e) {
              console.log(e);
            }
          },
          getCityPreArmyUnits: function () {
            var ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
            var formationManager = ownCity.get_CityArmyFormationsManager();
            var units = formationManager.GetFormationByTargetBaseId(formationManager.get_CurrentTargetBaseId());
            return units;
          },
          restoreFormation: function (saved_units) {
            var sUnits = saved_units || this.saved_units;
            var units = this.getCityPreArmyUnits();
            var units_list = units.get_ArmyUnits().l;
            for (var idx = 0; idx < sUnits.length; idx++) {
              var saved_unit = sUnits[idx];
              var uid = saved_unit.id;
              for (var i = 0;
              (i < units_list.length); i++) {
                if (units_list[i].get_Id() === uid) {
                  units_list[i].MoveBattleUnit(saved_unit.x, saved_unit.y);
                  if (saved_unit.enabled === undefined) units_list[i].set_Enabled(true);
                  else units_list[i].set_Enabled(saved_unit.enabled);
                }
              }
            }

            units.UpdateFormation(true); //this works and USES the API so works for both servers
            //units.CLEZCG(); // UpdateArmyLayout$0() has been renamed to CLEZCG()
            //units.WRKUTR(); // RefreshData() has been renamed to WRKUTR()
          },
          shiftFormation: function (direction) { //left right up down

            if (!direction) var direction = window.prompt("indicate a direction to shift units: up(u), down(d), left(l) or right(r)");

            if (direction == "up" || direction == "u") var v_shift = -1;
            if (direction == "down" || direction == "d") var v_shift = 1;
            if (direction == "left" || direction == "l") var h_shift = -1;
            if (direction == "right" || direction == "r") var h_shift = 1;

            if (!v_shift) var v_shift = 0;
            if (!h_shift) var h_shift = 0;

            var units = this.getCityPreArmyUnits();
            this.units = units.get_ArmyUnits().l;
            var Army = [];
            //read army, consider use saveFormation(?)
            for (var i = 0;
            (i < this.units.length); i++) {
              var unit = this.units[i];
              var armyUnit = {};
              var x = unit.get_CoordX() + h_shift;
              switch (x) {
              case 9:
                x = 0;
                break;
              case -1:
                x = 8;
                break;
              }
              var y = unit.get_CoordY() + v_shift;
              switch (y) {
              case 4:
                y = 0;
                break;
              case -1:
                y = 3;
                break;
              }
              armyUnit.x = x;
              armyUnit.y = y;
              armyUnit.id = unit.get_Id();
              armyUnit.enabled = unit.get_Enabled();
              Army.push(armyUnit);
            }
            this.restoreFormation(Army);
          },
          shiftFormationUp: function () {
            this.shiftFormation('u');
          },
          shiftFormationDown: function () {
            this.shiftFormation('d');
          },
          shiftFormationLeft: function () {
            this.shiftFormation('l');
          },
          shiftFormationRight: function () {
            this.shiftFormation('r');
          }
        }
      });
    }

    function CreateTweak() {
      var TASuite = {};
      qx.Class.define("TASuite.main", {
        type: "singleton",
        extend: qx.core.Object,
        members: {
          buttons: {
            attack: {
              layout: {
                save: null, // buttonLayoutSave
                load: null, // buttonLayoutLoad
              },
              simulate: null, // buttonSimulateCombat
              unlock: null, // buttonUnlockAttack
              unlockReset: null, // buttonUnlockReset
              tools: null, // buttonTools
              shiftFormationUp: null,
              shiftFormationDown: null,
              shiftFormationLeft: null,
              shiftFormationRight: null
            },
            simulate: {
              back: null // buttonReturnSetup
            }
          },

          stats: {
            spoils: {
              tiberium: null, // tiberiumSpoils
              crystal: null, // crystalSpoils
              credit: null, // creditSpoils
              research: null // researchSpoils
            },
            health: {
              infantry: null, // lastInfantryPercentage
              vehicle: null, // lastVehiclePercentage
              aircraft: null, // lastAirPercentage
              overall: null, // lastPercentage
            },
            repair: {
              infantry: null, // lastInfantryRepairTime
              vehicle: null, // lastVehicleRepairTime
              aircraft: null, // lastAircraftRepairTime
              overall: null // lastRepairTime
            },
            damage: {
              units: {
                overall: null // lastEnemyUnitsPercentage
              },
              structures: {
                construction: null, // lastCYPercentage
                defense: null, // lastDFPercentage
                command: null, // lastCCPercentage
                overall: null // lastEnemyBuildingsPercentage
              },
              overall: null // lastEnemyPercentage
            }
          },
          labels: {
            health: {
              infantry: null, // infantryTroopStrengthLabel
              vehicle: null, // vehicleTroopStrengthLabel
              aircraft: null, // airTroopStrengthLabel
              overall: null // simTroopDamageLabel
            },
            damage: {
              units: {
                overall: null // enemyUnitsStrengthLabel
              },
              structures: {
                construction: null, // CYTroopStrengthLabel
                defense: null, // DFTroopStrengthLabel
                command: null, // CCTroopStrengthLabel
                support: null, // enemySupportStrengthLabel
                overall: null // enemyBuildingsStrengthLabel
              },
              overall: null, // enemyTroopStrengthLabel
              outcome: null // simVictoryLabel
            },
            repair: {
              overall: null // simRepairTimeLabel
            },
            time: null, // simTimeLabel
            supportlevel: null // enemySupportLevelLabel
          },

          add_ViewModeChange: null,
          add_ArmyChanged: null,

          attacker_modules: null,
          defender_modules: null,

          units: null,
          units_list: null,
          saved_units: null,
          layoutsList: null,
          layoutsLabelText: null,

          battleResultsBox: null,
          statsPage: null,

          totalSeconds: null,
          isPlayerCity: null,

          initializeStats: function (tabView) {
            // ////////////////Stats ////////////////////
            this.statsPage = new qx.ui.tabview.Page("Stats");
            this.statsPage.setLayout(new qx.ui.layout.VBox(5));
            this.statsPage.setPadding(1);
            tabView.add(this.statsPage);

            // The Enemy Vertical Box
            var eVBox = new qx.ui.container.Composite();
            eVBox.setLayout(new qx.ui.layout.VBox(5));
            eVBox.setThemedFont("bold");
            eVBox.setThemedPadding(2);
            eVBox.setThemedBackgroundColor("#eef");
            this.statsPage.add(eVBox);
            // The Enemy Troop Strength Label
            var eHBox1 = new qx.ui.container.Composite();
            eHBox1.setLayout(new qx.ui.layout.HBox(5));
            eHBox1.add(new qx.ui.basic.Label("Enemy Base: "));
            this.labels.damage.overall = new qx.ui.basic.Label("100");
            eHBox1.add(this.labels.damage.overall);
            this.labels.damage.overall.setTextColor("red");
            eVBox.add(eHBox1);
            // Units
            var eHBox4 = new qx.ui.container.Composite();
            eHBox4.setLayout(new qx.ui.layout.HBox(5));
            eHBox4.add(new qx.ui.basic.Label("Defences: "));
            this.labels.damage.units.overall = new qx.ui.basic.Label("100");
            eHBox4.add(this.labels.damage.units.overall);
            this.labels.damage.units.overall.setTextColor("green");
            eVBox.add(eHBox4);
            // Buildings
            var eHBox5 = new qx.ui.container.Composite();
            eHBox5.setLayout(new qx.ui.layout.HBox(5));
            eHBox5.add(new qx.ui.basic.Label("Buildings: "));
            this.labels.damage.structures.overall = new qx.ui.basic.Label("100");
            eHBox5.add(this.labels.damage.structures.overall);
            this.labels.damage.structures.overall.setTextColor("green");
            eVBox.add(eHBox5);
            // Command Center
            var eHBox2 = new qx.ui.container.Composite();
            eHBox2.setLayout(new qx.ui.layout.HBox(5));
            eHBox2.add(new qx.ui.basic.Label("Construction Yard: "));
            this.labels.damage.structures.construction = new qx.ui.basic.Label("100");
            eHBox2.add(this.labels.damage.structures.construction);
            this.labels.damage.structures.construction.setTextColor("red");
            eVBox.add(eHBox2);
            // Defense Facility
            var eHBox3 = new qx.ui.container.Composite();
            eHBox3.setLayout(new qx.ui.layout.HBox(5));
            eHBox3.add(new qx.ui.basic.Label("Defense Facility: "));
            this.labels.damage.structures.defense = new qx.ui.basic.Label("100");
            eHBox3.add(this.labels.damage.structures.defense);
            this.labels.damage.structures.defense.setTextColor("red");
            eVBox.add(eHBox3);
            // Command Center
            var eHBox6 = new qx.ui.container.Composite();
            eHBox6.setLayout(new qx.ui.layout.HBox(5));
            eHBox6.add(new qx.ui.basic.Label("Command Center: "));
            this.labels.damage.structures.command = new qx.ui.basic.Label("100"), eHBox6.add(this.labels.damage.structures.command);
            this.labels.damage.structures.command.setTextColor("red");
            eVBox.add(eHBox6);
            // The Support Horizontal Box
            var hboxSupportContainer = new qx.ui.container.Composite();
            hboxSupportContainer.setLayout(new qx.ui.layout.HBox(5));
            this.labels.supportlevel = new qx.ui.basic.Label("Suport lvl ");
            hboxSupportContainer.add(this.labels.supportlevel);
            this.labels.damage.structures.support = new qx.ui.basic.Label("--: 100");
            hboxSupportContainer.add(this.labels.damage.structures.support);
            this.labels.damage.structures.support.setTextColor("red");
            eVBox.add(hboxSupportContainer);
            // The Troops Vertical Box
            var tVBox = new qx.ui.container.Composite();
            tVBox.setLayout(new qx.ui.layout.VBox(5));
            tVBox.setThemedFont("bold");
            tVBox.setThemedPadding(2);
            tVBox.setThemedBackgroundColor("#eef");
            this.statsPage.add(tVBox);
            // The Repair Time Label
            var tHBox1 = new qx.ui.container.Composite();
            tHBox1.setLayout(new qx.ui.layout.HBox(5));
            tHBox1.add(new qx.ui.basic.Label("Repair Time: "));
            this.labels.repair.overall = new qx.ui.basic.Label("0:00:00");
            tHBox1.add(this.labels.repair.overall);
            this.labels.repair.overall.setTextColor("blue");
            tVBox.add(tHBox1);
            // The Troop Strength Label
            var tHBox5 = new qx.ui.container.Composite();
            tHBox5.setLayout(new qx.ui.layout.HBox(5));
            tHBox5.add(new qx.ui.basic.Label("Overall: "));
            this.labels.health.overall = new qx.ui.basic.Label("100");
            tHBox5.add(this.labels.health.overall);
            this.labels.health.overall.setTextColor("blue");
            tVBox.add(tHBox5);
            // The Infantry Troop Strength Label
            var tHBox2 = new qx.ui.container.Composite();
            tHBox2.setLayout(new qx.ui.layout.HBox(5));
            tHBox2.add(new qx.ui.basic.Label("Infantry: "));
            this.labels.health.infantry = new qx.ui.basic.Label("100");
            tHBox2.add(this.labels.health.infantry);
            this.labels.health.infantry.setTextColor("green");
            tVBox.add(tHBox2);
            // The Vehicle Troop Strength Label
            var tHBox3 = new qx.ui.container.Composite();
            tHBox3.setLayout(new qx.ui.layout.HBox(5));
            tHBox3.add(new qx.ui.basic.Label("Vehicle: "));
            this.labels.health.vehicle = new qx.ui.basic.Label("100");
            tHBox3.add(this.labels.health.vehicle);
            this.labels.health.vehicle.setTextColor("green");
            tVBox.add(tHBox3);
            // The Air Troop Strength Label
            var tHBox4 = new qx.ui.container.Composite();
            tHBox4.setLayout(new qx.ui.layout.HBox(5));
            tHBox4.add(new qx.ui.basic.Label("Aircraft: "));
            this.labels.health.aircraft = new qx.ui.basic.Label("100");
            tHBox4.add(this.labels.health.aircraft);
            this.labels.health.aircraft.setTextColor("green");
            tVBox.add(tHBox4);

            // The inner Vertical Box
            var vBox = new qx.ui.container.Composite();
            vBox.setLayout(new qx.ui.layout.VBox(5));
            vBox.setThemedFont("bold");
            vBox.setThemedPadding(2);
            vBox.setThemedBackgroundColor("#eef");
            // The Victory Label
            var hBox2 = new qx.ui.container.Composite();
            hBox2.setLayout(new qx.ui.layout.HBox(5));
            hBox2.add(new qx.ui.basic.Label("Outcome: "));
            this.labels.damage.outcome = new qx.ui.basic.Label("Unknown");
            hBox2.add(this.labels.damage.outcome);
            this.labels.damage.outcome.setTextColor("green");
            vBox.add(hBox2);
            // The Battle Time Label
            var hBox1 = new qx.ui.container.Composite();
            hBox1.setLayout(new qx.ui.layout.HBox(5));
            hBox1.add(new qx.ui.basic.Label("Battle Time: "));
            this.labels.time = new qx.ui.basic.Label("120");
            hBox1.add(this.labels.time);
            this.labels.time.setTextColor("black");
            vBox.add(hBox1);
            this.statsPage.add(vBox);
          },
          initializeLayout: function (tabView) {
            // ////////////////Layouts ////////////////////
            var layoutPage = new qx.ui.tabview.Page("Layouts");
            layoutPage.setLayout(new qx.ui.layout.VBox());
            tabView.add(layoutPage);

            this.layoutsList = new qx.ui.form.List();
            this.layoutsList.set({
              height: 200,
              width: 180,
              selectionMode: "one"
            });
            layoutPage.add(this.layoutsList);

            // Add the two buttons for save and load
            var layHBox = new qx.ui.container.Composite();
            layHBox.setLayout(new qx.ui.layout.HBox(5));
            // Load button
            this.buttons.attack.layout.load = new qx.ui.form.Button("Load");
            this.buttons.attack.layout.load.set({
              width: 80,
              appearance: "button-text-small",
              toolTipText: "Load this saved layout."
            });
            this.buttons.attack.layout.load.addListener("click", this.loadCityLayout, this);
            layHBox.add(this.buttons.attack.layout.load);
            // Delete button
            this.buttonLayoutDelete = new qx.ui.form.Button("Delete");
            this.buttonLayoutDelete.set({
              width: 80,
              appearance: "button-text-small",
              toolTipText: "Delete this saved layout."
            });
            this.buttonLayoutDelete.addListener("click", this.deleteCityLayout,
            this);
            layHBox.add(this.buttonLayoutDelete);
            layoutPage.add(layHBox);

            var layVBox = new qx.ui.container.Composite();
            layVBox.setLayout(new qx.ui.layout.VBox(5));
            layVBox.setThemedFont("bold");
            layVBox.setThemedPadding(2);
            layVBox.setThemedBackgroundColor("#eef");
            // The Label Textbox
            var layHBox2 = new qx.ui.container.Composite();
            layHBox2.setLayout(new qx.ui.layout.HBox(5));
            layHBox2.add(new qx.ui.basic.Label("Name: "));
            this.layoutsLabelText = new qx.ui.form.TextField();
            layHBox2.add(this.layoutsLabelText);
            layVBox.add(layHBox2);

            this.buttons.attack.layout.save = new qx.ui.form.Button("Save");
            this.buttons.attack.layout.save.set({
              width: 80,
              appearance: "button-text-small",
              toolTipText: "Save this layout."
            });
            this.buttons.attack.layout.save.addListener("click", this.saveCityLayout, this);
            layVBox.add(this.buttons.attack.layout.save);
            layoutPage.add(layVBox);
          },
          initializeInfo: function (tabView) {
            // //////////////// Info ////////////////////
            var infoPage = new qx.ui.tabview.Page("Info");
            infoPage.setLayout(new qx.ui.layout.VBox(5));
            tabView.add(infoPage);

            // The Help Vertical Box
            var pVBox = new qx.ui.container.Composite();
            pVBox.setLayout(new qx.ui.layout.VBox(5));
            pVBox.setThemedFont("bold");
            pVBox.setThemedPadding(2);
            pVBox.setThemedBackgroundColor("#eef");
            infoPage.add(pVBox);
            var proHelpBar = new qx.ui.basic.Label().set({
              value: "<a target='_blank' href='http://userscripts.org/scripts/discuss/130344'>Forums</a>",
              rich: true
            });
            pVBox.add(proHelpBar);
            // The Spoils
            var psVBox = new qx.ui.container.Composite();
            psVBox.setLayout(new qx.ui.layout.VBox(5));
            psVBox.setThemedFont("bold");
            psVBox.setThemedPadding(2);
            psVBox.setThemedBackgroundColor("#eef");
            infoPage.add(psVBox);
            psVBox.add(new qx.ui.basic.Label("Spoils"));
            // Tiberium
            this.stats.spoils.tiberium = new qx.ui.basic.Atom("0", "webfrontend/ui/common/icn_res_tiberium.png");
            psVBox.add(this.stats.spoils.tiberium);
            // Crystal
            this.stats.spoils.crystal = new qx.ui.basic.Atom("0", "webfrontend/ui/common/icn_res_chrystal.png");
            psVBox.add(this.stats.spoils.crystal);
            // Credits
            this.stats.spoils.credit = new qx.ui.basic.Atom("0", "webfrontend/ui/common/icn_res_dollar.png");
            psVBox.add(this.stats.spoils.credit);
            // Research
            this.stats.spoils.research = new qx.ui.basic.Atom("0", "webfrontend/ui/common/icn_res_research_mission.png");
            psVBox.add(this.stats.spoils.research);

            this.battleResultsBox.add(tabView);
          },
          initialize: function () {
            this.add_ViewModeChange = (new ClientLib.Vis.ViewModeChange).LEUXCZ(this, this.onViewChange); //
            this.add_ArmyChanged = (new $I.QUXOEF).LEUXCZ(this, this.onUnitMoved); //
            this.buttons.attack.simulate = new qx.ui.form.Button("Simulate");
            this.buttons.attack.simulate.set({
              width: 58,
              appearance: "button-text-small",
              toolTipText: "Start Combat Simulation"
            });
            this.buttons.attack.simulate.addListener("click", this.startSimulation, this);

            this.buttons.simulate.back = new qx.ui.form.Button("Setup");
            this.buttons.simulate.back.set({
              width: 80,
              appearance: "button-text-small",
              toolTipText: "Return to Combat Setup"
            });
            this.buttons.simulate.back.addListener("click", this.returnSetup, this);

            this.buttons.ShiftFormationLeft = new qx.ui.form.Button("<");
            this.buttons.ShiftFormationLeft.set({
              width: 30,
              appearance: "button-text-small",
              toolTipText: "Shift units Left"
            });
            this.buttons.ShiftFormationLeft.addListener("click", this.shiftFormationLeft, this);

            this.buttons.ShiftFormationRight = new qx.ui.form.Button(">");
            this.buttons.ShiftFormationRight.set({
              width: 30,
              appearance: "button-text-small",
              toolTipText: "Shift units RIGHT"
            });
            this.buttons.ShiftFormationRight.addListener("click", this.shiftFormationRight, this);

            this.buttons.ShiftFormationUp = new qx.ui.form.Button("^");
            this.buttons.ShiftFormationUp.set({
              width: 30,
              appearance: "button-text-small",
              toolTipText: "Shift units UP"
            });
            this.buttons.ShiftFormationUp.addListener("click", this.shiftFormationUp, this);

            this.buttons.ShiftFormationDown = new qx.ui.form.Button("v");
            this.buttons.ShiftFormationDown.set({
              width: 30,
              appearance: "button-text-small",
              toolTipText: "Shift DOWN"
            });
            this.buttons.ShiftFormationDown.addListener("click", this.shiftFormationDown, this);

            var replayBar = qx.core.Init.getApplication().getReportReplayOverlay();
            replayBar.add(this.buttons.simulate.back, {
              top: 10,
              left: 0
            });
            var replayBar = qx.core.Init.getApplication().getReportReplayOverlay();
            replayBar.add(this.buttons.simulate.back, {
              top: 10,
              left: 0
            });

            var armyBar = qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_ATTACKSETUP);

            this.buttons.attack.unlock = new qx.ui.form.Button("Unlock");
            this.buttons.attack.unlock.set({
              width: 55,
              height: 46,
              appearance: "button-text-small",
              toolTipText: "Unlock Attack Button"
            });
            this.buttons.attack.unlock.addListener("click", this.unlockAttacks, this);
            this.buttons.attack.unlock.setOpacity(0.5);
            armyBar.add(this.buttons.attack.unlock, {
              top: 102,
              right: 4
            });

            this.buttons.attack.unlockReset = new qx.ui.form.Button("Unlock");
            this.buttons.attack.unlockReset.set({
              width: 55,
              height: 42,
              appearance: "button-text-small",
              toolTipText: "Unlock Reset Button"
            });
            this.buttons.attack.unlockReset.addListener("click", this.unlockResets, this);
            this.buttons.attack.unlockReset.setOpacity(0.5);
            armyBar.add(this.buttons.attack.unlockReset, {
              top: 59,
              right: 4
            });

            this.buttons.attack.tools = new qx.ui.form.Button("Tools");
            this.buttons.attack.tools.set({
              width: 58,
              appearance: "button-text-small",
              toolTipText: "Open Simulator Tools"
            });
            this.buttons.attack.tools.addListener("click", this.toggleTools, this);

            var battleUnitData = $I.PJNPPV.prototype;
            if (!battleUnitData.set_Enabled_Original) {
              battleUnitData.set_Enabled_Original = battleUnitData.set_Enabled;
            }
            battleUnitData.set_Enabled = function (a) {
              this.set_Enabled_Original(a);
              var ta = window.TASuite.main.getInstance();
              ta.onUnitMoved();
            };

            _this = this;
            setTimeout(

            function () {
              try {
                // Get the active modules
                // Doing this the hard and unreliable way for now, until
                // we figure out a better way
                _this.attacker_modules = {};
                _this.attacker_modules.l = [];
                var g = ClientLib.Res.ResMain.GetInstance();

                // Get the player faction
                // var gdi_unit_ids = g.GetFactionUnitIds(1);
                // var nod_unit_ids = g.GetFactionUnitIds(2);
                // var forgotten_unit_ids = g.GetFactionUnitIds(3);

                var player_research = ClientLib.Data.MainData.GetInstance().get_Player().get_PlayerResearch();

                for (var i in g.EUIRZQ.units) { //
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
                      } catch (e) {
                        console.log(e);
                      }
                    } else {
                      _this.attacker_modules.l.push(module.i);
                    }
                  }
                }

                // Get the defender modules
                _this.defender_modules = _this.attacker_modules;
                ClientLib.Vis.VisMain.GetInstance().add_ViewModeChange(
                _this.add_ViewModeChange);

                armyBar.add(_this.buttons.attack.tools, {
                  top: 74,
                  right: 62
                });
                armyBar.add(_this.buttons.attack.simulate, {
                  top: 112,
                  right: 62
                });
                armyBar.add(_this.buttons.ShiftFormationUp, {
                  top: 21,
                  right: 77
                });
                armyBar.add(_this.buttons.ShiftFormationLeft, {
                  top: 40,
                  right: 92
                });
                armyBar.add(_this.buttons.ShiftFormationRight, {
                  top: 40,
                  right: 62
                });
                armyBar.add(_this.buttons.ShiftFormationDown, {
                  top: 55,
                  right: 77
                });
              } catch (e) {
                console.log(e);
              }
            }, 10000);

            // The Battle Simulator box
            this.battleResultsBox = new qx.ui.window.Window("Battle Simulator");
            this.battleResultsBox.setPadding(1);
            this.battleResultsBox.setLayout(new qx.ui.layout.VBox(1));
            this.battleResultsBox.setShowMaximize(false);
            this.battleResultsBox.setShowMinimize(false);
            this.battleResultsBox.moveTo(125, 125);
            this.battleResultsBox.setHeight(300);
            this.battleResultsBox.setWidth(200);

            var tabView = new qx.ui.tabview.TabView();
            tabView.setPadding(5);
            this.battleResultsBox.add(tabView);

            this.initializeStats(tabView);
            this.initializeLayout(tabView);
            this.initializeInfo(tabView);
          },
          closeToolsBox: function () {
            try {
              var units = this.getCityPreArmyUnits();
              if (units) {
                units.remove_ArmyChanged(this.add_ArmyChanged);
              }
              this.battleResultsBox.close();
            } catch (e) {
              console.log(e);
            }
          },
          toggleTools: function () {
            var units = this.getCityPreArmyUnits();
            this.units = units.get_ArmyUnits().l;
            var cityFaction = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity().get_CityFaction();
            this.isPlayerCity = false;
            if ((cityFaction === ClientLib.Base.EFactionType.GDIFaction) || (cityFaction === ClientLib.Base.EFactionType.NODFaction)) this.isPlayerCity = true;

            if (this.battleResultsBox.isVisible()) {
              this.closeToolsBox();
            } else {
              // Add the event listener for armybar
              try {
                units.remove_ArmyChanged(this.add_ArmyChanged);
                units.add_ArmyChanged(this.add_ArmyChanged);
              } catch (e) {
                console.log(e);
              }

              this.updateLayoutsList();
              this.calculateLoot();
              this.calculateSimResults();
              this.updateStatsWindow();
              this.battleResultsBox.open();
            }
          },
          getCityPreArmyUnits: function () {
            var ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
            var formationManager = ownCity.get_CityArmyFormationsManager();
            var units = formationManager.GetFormationByTargetBaseId(formationManager.get_CurrentTargetBaseId());
            return units;
          },
          calculateLoot: function () {
            // Adapted from the CNC Loot script:
            // http://userscripts.org/scripts/show/135953
            var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();
            var num = 0;
            var spoils = {
              1: 0,
              2: 0,
              3: 0,
              6: 0,
              7: 0
            };

            if (city.get_CityBuildingsData().HWFIJH !== null) {
              // every building
              num = city.get_CityBuildingsData().HWFIJH.l.length;
              for (var j = num; --j >= 0;) {
                var building = city.get_CityBuildingsData().HWFIJH.l[j];
                // TODO: check for destroyed building
                var mod = building.get_HitpointsPercent();
                for (var i = building.MNNADO.rer.length; --i >= 0;) {
                  spoils[building.MNNADO.rer[i].t] += mod * building.MNNADO.rer[i].c;
                }
              }
            }

            // every unit
            if (city.get_CityUnitsData().TXDWUM !== null) {
              num = city.get_CityUnitsData().TXDWUM.l.length;
              for (j = num; --j >= 0;) {
                var unit = city.get_CityUnitsData().TXDWUM.l[j];
                mod = unit.get_HitpointsPercent();
                for (i = unit.MNNADO.rer.length; --i >= 0;) {
                  spoils[unit.MNNADO.rer[i].t] += mod * unit.MNNADO.rer[i].c;
                }
              }
            }

            this.stats.spoils.tiberium.setLabel(this.formatNumberWithCommas(spoils[1]));
            this.stats.spoils.crystal.setLabel(this.formatNumberWithCommas(spoils[2]));
            this.stats.spoils.credit.setLabel(this.formatNumberWithCommas(spoils[3]));
            this.stats.spoils.research.setLabel(this.formatNumberWithCommas(spoils[6]));
          },
          calculateSimResults: function () {
            var battleground = this.setupBattleground(this.getCityPreArmyUnits());

            // Run the simulation until it's done
            while (battleground.DHSWQJ.OAEJMD(false)) {}
            // DoStep$0 was renamed to OAEJMD, m_Simulation was renamed to DHSWQJ

            this.calculateTroopStrengths(battleground);
          },
          onUnitMoved: function (sender, e) {
            if (this.battleResultsBox.isVisible()) {
              var ta = window.TASuite.main.getInstance();
              ta.calculateSimResults();
              ta.updateStatsWindow();
            }
          },
          calculateTroopStrengths: function (battleground) {
            var battleground = ClientLib.Vis.VisMain.GetInstance().get_Battleground();
            var total_hp = 0;
            var end_hp = 0;
            var e_total_hp = 0;
            var e_end_hp = 0;
            var eb_total_hp = 0;
            var eb_end_hp = 0;
            var eu_total_hp = 0;
            var eu_end_hp = 0;
            var i_end_hp = 0;
            var v_end_hp = 0;
            var a_end_hp = 0;
            var v_total_hp = 0;
            var a_total_hp = 0;
            var i_total_hp = 0;
            this.stats.damage.structures.defense = 0;
            this.stats.damage.structures.construction = 0;
            this.stats.damage.structures.command = 0;
            this.SupportLevel = 0;
            this.lastSupportPercentage = 0;
            this.stats.repair.infantry = 0;
            this.stats.repair.vehicle = 0;
            this.stats.repair.aircraft = 0;

            var own_city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
            var crd = own_city.get_CityRepairData();
            var cud = own_city.get_CityUnitsData();

            //Found something similar in the API but the values I get are lower... using      cud.GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Infantry) -- note that its a function not an array -- instead of repair[ClientLib.Data.EUnitGroup.Infantry], this example refers to infantery but applies to all members of ClientLib.Data.EUnitGroup
            var repair_times = own_city.get_CityUnitsData().EDTHDX.d; // m_FullRawRepairTimeForUnitGroupTypes renamed to EDTHDX

            var r_types = ClientLib.Base.EResourceType;

            var entities = battleground.NNXRBC.d; // m_Entities has been renamed to NNXRBC
            for (var i in entities) {
              var entity = entities[i];
              var i_entity = entity.QXYJOG; // get_Entity$0() has been removed. Propery is $I.TQL - QXYJOG
              var a_entity = entity.GUXBBT; // ??? has been renamed to GUXBBT
              var current_hp = i_entity.HOTKDN; // m_iHitpointsCurrent has been renamed to HOTKDN
              var max_hp = i_entity.EUJPNP; // m_iHitpoints has been renamed to EUJPNP
              if (a_entity.XPEHRJ === 2) { // ??? has been renamed to XPEHRJ, Attacker is 2
                // This is one of the good guys
                end_hp += current_hp;
                total_hp += max_hp;
                switch (a_entity.TRKXAB) { // movement type has been renamed toTRKXAB
                case ClientLib.Base.EUnitMovementType.Air:
                case ClientLib.Base.EUnitMovementType.Air2:
                  a_end_hp += current_hp;
                  a_total_hp += max_hp;
                  break;
                case ClientLib.Base.EUnitMovementType.Feet:
                  i_end_hp += current_hp;
                  i_total_hp += max_hp;
                  break;
                case ClientLib.Base.EUnitMovementType.Track:
                case ClientLib.Base.EUnitMovementType.Wheel:
                  v_end_hp += current_hp;
                  v_total_hp += max_hp;
                  break;
                case ClientLib.Base.EUnitMovementType.Structure:
                  break;
                }
              } else {
                // Enemy Overall
                e_total_hp += max_hp;
                e_end_hp += current_hp;

                if (i_entity.XZXAQZ >= 200 && i_entity.XZXAQZ <= 205) {
                  this.SupportLevel = parseInt(i_entity.BGYEIQ); // m_iLevel has been renamed to BGYEIQ
                  this.lastSupportPercentage = (current_hp / max_hp) * 100;
                } else {
                  switch (i_entity.XZXAQZ) {
                    // m_MDCTypeId has been renamed to XZXAQZ
                  case 112:
                    // GDI YARD
                  case 151:
                    // NOD CY
                  case 177:
                    // FOR CY
                    this.stats.damage.structures.construction = (current_hp / max_hp) * 100;
                    break;
                  case 158:
                    // NOD DF
                  case 131:
                    // GDI DF
                  case 195:
                    // FOR DF
                    this.stats.damage.structures.defense = (current_hp / max_hp) * 100;
                    break;
                  case 111:
                    // GDI CC
                  case 159:
                    // NOD CC
                    this.stats.damage.structures.command = (current_hp / max_hp) * 100;
                    break;
                  }
                }

                switch (a_entity.TRKXAB) {
                case ClientLib.Base.EUnitMovementType.Structure:
                  // Enemy Building
                  eb_total_hp += max_hp;
                  eb_end_hp += current_hp;
                  break;
                default:
                  // Enemy Defence
                  eu_total_hp += max_hp;
                  eu_end_hp += current_hp;
                  break;
                }
              }
            }

            // Get MaxHealth for UnitTypes
            var totalInfantryHealth = 0;
            var totalVehicleHealth = 0;
            var totalAirHealth = 0;
            for (var i in this.units) {
              switch (this.units[i].get_UnitGameData_Obj().at) {
              case ClientLib.Data.EUnitGroup.Infantry:
                totalInfantryHealth += (this.units[i].get_MaxHealth() * 16);
                break;
              case ClientLib.Data.EUnitGroup.Vehicle:
                totalVehicleHealth += (this.units[i].get_MaxHealth() * 16);
                break;
              case ClientLib.Data.EUnitGroup.Aircraft:
                totalAirHealth += (this.units[i].get_MaxHealth() * 16);
                break;
              default:
                alert("CombatSim: Unknown UnitType found!");
                break;
              }
            }

            // Calculate Percentages
            this.stats.health.infantry = i_total_hp ? (i_end_hp / i_total_hp) * 100 : 100;
            this.stats.health.vehicle = v_total_hp ? (v_end_hp / v_total_hp) * 100 : 100;
            this.stats.health.aircraft = a_total_hp ? (a_end_hp / a_total_hp) * 100 : 100;
            this.totalSeconds = (battleground.DHSWQJ.NHMXEO * battleground.get_TimePerStep()) / 1000;

            this.stats.damage.units.overall = (eu_end_hp / eu_total_hp) * 100;
            this.stats.damage.structures.overall = (eb_end_hp / eb_total_hp) * 100;
            this.stats.damage.overall = (e_end_hp / e_total_hp) * 100;
            this.stats.health.overall = end_hp ? (end_hp / total_hp) * 100 : 0;

            // Calculate the repair time
            crd.ConvertRepairCost = crd.JBTHHM; // ConvertRepairCost has been renamed to JBTHHM
            this.stats.repair.infantry = crd.ConvertRepairCost(
            r_types.RepairChargeInf,
            repair_times[ClientLib.Data.EUnitGroup.Infantry], (1 - (i_end_hp + totalInfantryHealth - i_total_hp) / (totalInfantryHealth ? totalInfantryHealth : 1)));
            this.stats.repair.aircraft = crd.ConvertRepairCost(
            r_types.RepairChargeAir,
            repair_times[ClientLib.Data.EUnitGroup.Aircraft], (1 - (a_end_hp + totalAirHealth - a_total_hp) / (totalAirHealth ? totalAirHealth : 1)));
            this.stats.repair.vehicle = crd.ConvertRepairCost(
            r_types.RepairChargeVeh,
            repair_times[ClientLib.Data.EUnitGroup.Vehicle], (1 - (v_end_hp + totalVehicleHealth - v_total_hp) / (totalVehicleHealth ? totalVehicleHealth : 1)));
            this.stats.repair.overall = Math.max(this.stats.repair.vehicle,
            this.stats.repair.aircraft, this.stats.repair.infantry);

          },
          setLabelColor: function (obj, val, dir) {
            var colors = ['black', 'blue', 'green', 'red'];
            var color = colors[0];
            var v = val;
            if (dir >= 0) v = 100.0 - v;
            if (v > 99.99) color = colors[3];
            else if (v > 50) color = colors[2];
            else if (v > 0) color = colors[1];
            obj.setTextColor(color);
          },
          updateLabel100: function (obj, val, dir) {
            this.setLabelColor(obj, val, dir);
            obj.setValue(val.toFixed(2).toString());
          },
          updateLabel100time: function (obj, val, dir, time) {
            var s = val.toFixed(2).toString() + " @ ";
            s += this.formatSecondsAsTime(time, "h:mm:ss");
            this.setLabelColor(obj, val, dir);
            obj.setValue(s);
          },
          updateStatsWindow: function () {
            var colors = ['black', 'blue', 'green', 'red'];
            var s = "";
            var n = 0;
            if (this.stats.damage.structures.construction === 0) {
              s = "Total Victory";
              n = 0;
            } else if (this.stats.damage.structures.overall < 100) {
              s = "Victory";
              n = 1;
            } else {
              s = "Total Defeat";
              n = 3;
            }
            this.labels.damage.outcome.setValue(s);
            this.labels.damage.outcome.setTextColor(colors[n]);
            this.updateLabel100(this.labels.damage.overall, this.stats.damage.overall, - 1);
            this.updateLabel100(this.labels.damage.units.overall, this.stats.damage.units.overall, - 1);
            this.updateLabel100(this.labels.damage.structures.overall, this.stats.damage.structures.overall, - 1);
            this.updateLabel100(this.labels.damage.structures.construction, this.stats.damage.structures.construction, - 1);
            this.updateLabel100(this.labels.damage.structures.defense, this.stats.damage.structures.defense, - 1);
            // Command Center
            if (this.isPlayerCity) this.updateLabel100(this.labels.damage.structures.command, this.stats.damage.structures.command, - 1);
            else {
              this.labels.damage.structures.command.setValue("--");
              this.labels.damage.structures.command.setTextColor("green");
            }
            // SUPPORT
            var SLabel = (this.SupportLevel > 0) ? this.SupportLevel.toString() : '--';
            this.labels.supportlevel.setValue('Suport lvl ' + SLabel + ': ');
            this.updateLabel100(this.labels.damage.structures.support, this.lastSupportPercentage, - 1);
            // ATTACKER
            this.setLabelColor(this.labels.repair.overall, this.stats.repair.overall / 14400.0, - 1); // max is 4h
            this.labels.repair.overall.setValue(this.formatSecondsAsTime(this.stats.repair.overall, "h:mm:ss"));
            // OVERALL
            this.updateLabel100(this.labels.health.overall, this.stats.health.overall, 1);
            // INF
            this.updateLabel100time(this.labels.health.infantry, this.stats.health.infantry, 1, this.stats.repair.infantry);
            // VEH
            this.updateLabel100time(this.labels.health.vehicle, this.stats.health.vehicle, 1, this.stats.repair.vehicle);
            // AIR
            this.updateLabel100time(this.labels.health.aircraft, this.stats.health.aircraft, 1, this.stats.repair.aircraft);
            // BATTLE TIME
            this.setLabelColor(this.labels.time, this.totalSeconds / 120.0, - 1); // max is 120s
            this.labels.time.setValue(this.totalSeconds.toFixed(2).toString());
          },
          formatNumberWithCommas: function (x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          },
          formatSecondsAsTime: function (secs, format) {
            var hr = Math.floor(secs / 3600);
            var min = Math.floor((secs - (hr * 3600)) / 60);
            var sec = Math.floor(secs - (hr * 3600) - (min * 60));

            if (hr < 10) hr = "0" + hr;
            if (min < 10) min = "0" + min;
            if (sec < 10) sec = "0" + sec;

            if (format !== null) {
              var formatted_time = format.replace('hh', hr);
              formatted_time = formatted_time.replace('h', hr * 1 + "");
              formatted_time = formatted_time.replace('mm', min);
              formatted_time = formatted_time.replace('m', min * 1 + "");
              formatted_time = formatted_time.replace('ss', sec);
              formatted_time = formatted_time.replace('s', sec * 1 + "");
              return formatted_time;
            } else {
              return hr + ':' + min + ':' + sec;
            }
          },
          unlockAttacks: function () {
            var armyBar = qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_ATTACKSETUP);
            armyBar.remove(this.buttons.attack.unlock);
            var _this = this;
            setTimeout(function () {
              armyBar.add(_this.buttons.attack.unlock);
            }, 2000);
          },
          unlockResets: function () {
            var armyBar = qx.core.Init.getApplication().getUIItem(
            ClientLib.Data.Missions.PATH.BAR_ATTACKSETUP);
            armyBar.remove(this.buttons.attack.unlockReset);
            var _this = this;
            setTimeout(function () {
              armyBar.add(_this.buttons.attack.unlockReset);
            }, 2000);
          },
          onViewChange: function (oldMode, newMode) {
            try {
              if (oldMode !== webfrontend.gui.PlayArea.PlayArea.modes.EMode_CombatSetupDefense || newMode !== webfrontend.gui.PlayArea.PlayArea.modes.EMode_PlayerOffense) {
                // Close the stats box
                this.closeToolsBox();
                this.battleResultsBox.close();
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
          setupBattleground: function (offense_units) {
            try {
              var mainData = ClientLib.Data.MainData.GetInstance();
              var player_cities = mainData.get_Cities();
              var current_city = player_cities.get_CurrentCity();
              var own_city = player_cities.get_CurrentOwnCity();

              // Bust the cache
              // own_city.get_CityArmyFormationsManager().ZJG.d[own_city.get_CityArmyFormationsManager().XJG].UpdateFormation();

              localStorage.ta_sim_last_city = current_city.get_Id();

              var alliance = ClientLib.Data.MainData.GetInstance().get_Alliance();
              var combatData = (new ClientLib.Data.Combat).$ctor();
              // var combatData = (new $I.CM).QB();
              combatData.MCXRNN = 1; // Version is MCXRNN

              var unitData = own_city.get_CityUnitsData().YDBIOO().l; // Attacker Units renamed  to YDBIOO
              if (offense_units) {
                offense_units = offense_units.SXMOWS.l;
              } else {
                offense_units = own_city.get_CityArmyFormationsManager().GetFormationByTargetBaseId(current_city.get_Id()).get_ArmyUnits().l;
              }
              var data = new Array();

              for (var i = 0; i < unitData.length; i++) {
                if (offense_units[i].get_Enabled()) {
                  var info = new Object();
                  info.h = unitData[i].get_Health();
                  info.i = unitData[i].get_MdbUnitId();
                  info.l = unitData[i].get_CurrentLevel();
                  info.x = offense_units[i].get_CoordX();
                  info.y = offense_units[i].get_CoordY();
                  data.push(info);
                }
              }

              combatData.UJWJOI = data; // Attackers renamed to UJWJOI

              data = new Array();
              if (current_city.get_CityUnitsData().TXDWUM !== null) { // empty defender army
                unitData = current_city.get_CityUnitsData().TXDWUM.l; // defender units
                for (i = 0; i < unitData.length; i++) {
                  info = new Object();
                  info.h = unitData[i].get_Health();
                  info.i = unitData[i].get_MdbUnitId();
                  info.l = unitData[i].get_CurrentLevel();
                  info.x = unitData[i].get_CoordX();
                  info.y = unitData[i].get_CoordY();
                  data.push(info);
                }
              }
              combatData.PMEAOH = data; // Defenders renamed to PMEAOH

              data = new Array();
              for (var i = 0; i < 9; i++) {
                for (var j = 0; j < 8; j++) {
                  var terrainType = current_city.GetResourceType(i, (j + 8));
                  var unitType = -1;
                  switch (terrainType) {
                  case ClientLib.Data.ECityTerrainType.FOREST:
                    unitType = ClientLib.Base.EUnit.Forest;
                    break;
                  case ClientLib.Data.ECityTerrainType.BRIAR:
                    unitType = ClientLib.Base.EUnit.Scrub;
                    break;
                  case ClientLib.Data.ECityTerrainType.SWAMP:
                    unitType = ClientLib.Base.EUnit.Swamp;
                    break;
                  case ClientLib.Data.ECityTerrainType.WATER:
                    unitType = ClientLib.Base.EUnit.Water;
                    break;
                  }

                  if (unitType !== -1) {
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

              combatData.YDPGXU = data; // Terrain renamed to YDPGXU

              unitData = current_city.get_CityBuildingsData().HWFIJH.l; // City buildings renamed to HWFIJH

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

              combatData.YBXPKT = data; // Buildings renamed to YBXPKT

              combatData.XDMLON = null; // Support Structures renamed to XDMLON
              combatData.MALBMJ = 8696244; // Start Step - this is just a random number - renamed to MALBMJ
              combatData.m_CombatSteps = 1;
              combatData.m_BoostInfantry = alliance.get_POIInfantryBonus();
              combatData.m_BoostVehicle = alliance.get_POIVehicleBonus();
              combatData.m_BoostAir = alliance.get_POIAirBonus();
              combatData.m_BoostDefense = current_city.get_AllianceDefenseBonus();
              combatData.m_AttackerBaseId = own_city.get_Id();
              combatData.m_AttackerBaseName = own_city.get_Name();
              combatData.m_AttackerPlayerId = own_city.get_PlayerId();
              combatData.m_AttackerPlayerName = own_city.get_PlayerName();
              combatData.m_AttackerAllianceId = own_city.get_AllianceId();
              combatData.m_AttackerAllianceName = own_city.get_AllianceName();
              combatData.m_DefenderBaseId = current_city.get_Id();
              combatData.m_DefenderBaseName = current_city.get_Name();
              combatData.m_DefenderPlayerId = current_city.get_PlayerId();
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

              if (((combatData.m_DefenderFaction === ClientLib.Base.EFactionType.FORFaction) || (combatData.m_DefenderFaction === ClientLib.Base.EFactionType.NPCBase)) || (combatData.m_DefenderFaction === ClientLib.Base.EFactionType.NPCCamp)) {
                combatData.FGCUFQ(); // This might not be needed
              }

              combatData.m_MaxDuration = 120;
              combatData.m_Complete = false;
              combatData.SXOUOX = null; // Debug renamed to SXOUOX

              var battleground = ClientLib.Vis.VisMain.GetInstance().get_Battleground();
              battleground.Reset();
              battleground.QPRVSK = combatData; // m_currentreplay
              battleground.InitBattle();
              battleground.MYAZHR(combatData); // Set combat data
              battleground.StartBattle();

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

              this.battleResultsBox.close();
            } catch (e) {
              console.log(e);
            }
          },
          updateLayoutsList: function () {
            this.layoutsList.removeAll();
            // Load the saved layouts for this city
            var city_layouts = this.loadCityLayouts();
            if (city_layouts) {
              for (var i in city_layouts) {
                var layout = city_layouts[i];
                var item = new qx.ui.form.ListItem(layout.label, null, layout.id);
                this.layoutsList.add(item);
              };
            }
          },
          deleteCityLayout: function () {
            try {
              var layouts = this.loadLayouts();
              var current_city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity().get_Id();
              var own_city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity().get_Id();
              var lid = this.layoutsList.getSelection()[0].getModel();
              if (layouts && typeof layouts[current_city] !== 'undefined' && typeof layouts[current_city][own_city] !== 'undefined' && typeof layouts[current_city][own_city][lid] !== 'undefined') {
                delete layouts[current_city][own_city][lid];
                this.saveLayouts(layouts);
                this.updateLayoutsList();
              }
            } catch (e) {
              console.log(e);
            }
          },
          loadCityLayout: function () {
            try {
              this.toggleTools();
              var city_layouts = this.loadCityLayouts();
              var lid = this.layoutsList.getSelection()[0].getModel();
              if (city_layouts && typeof city_layouts[lid] !== 'undefined') {
                // Load the selected city layout
                var saved_units = city_layouts[lid].layout;
                this.restoreFormation(saved_units);
              }
              this.toggleTools();
            } catch (e) {
              console.log(e);
            }
          },
          saveCityLayout: function () {
            try {
              // Save the current layout for this city
              var current_city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity().get_Id();
              var own_city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity().get_Id();
              var layouts = this.loadLayouts();
              this.saveFormation();
              var lid = new Date().getTime().toString();
              var title = this.layoutsLabelText.getValue();
              if (!title) return;

              title += " (TS: " + this.stats.health.overall.toFixed(2).toString() + ")";
              var city_layouts = this.loadCityLayouts();
              if (!layouts.hasOwnProperty(current_city)) {
                layouts[current_city] = {};
              }
              if (!layouts[current_city].hasOwnProperty(own_city)) {
                layouts[current_city][own_city] = city_layouts;
              }
              layouts[current_city][own_city][lid] = {
                id: lid,
                label: title,
                layout: this.saved_units,
              };
              this.saveLayouts(layouts);
              this.updateLayoutsList();
              this.layoutsLabelText.setValue("");
            } catch (e) {
              console.log(e);
            }
          },
          loadLayouts: function () {
            var temp = localStorage.tasim_layouts;
            if (temp) return JSON.parse(temp);
            return {};
          },
          loadCityLayouts: function () {
            var temp = localStorage.tasim_layouts;
            if (temp) {
              var layouts = JSON.parse(temp);
              var current_city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity().get_Id();
              var own_city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity().get_Id();

              if (layouts.hasOwnProperty(current_city) && layouts[current_city].hasOwnProperty(own_city)) {
                return layouts[current_city][own_city];
              }
            }
            return {};
          },
          saveLayouts: function (layouts) {
            // TODO - Remove cities that are no longer existing
            localStorage.tasim_layouts = JSON.stringify(layouts);
          },
          restoreFormation: function (saved_units) {
            var sUnits = saved_units || this.saved_units;
            var units = this.getCityPreArmyUnits();
            var units_list = units.get_ArmyUnits().l;
            for (var idx = 0; idx < sUnits.length; idx++) {
              var saved_unit = sUnits[idx];
              var uid = saved_unit.id;
              for (var i = 0;
              (i < units_list.length); i++) {
                if (units_list[i].get_Id() === uid) {
                  units_list[i].MoveBattleUnit(saved_unit.x, saved_unit.y);
                  if (saved_unit.enabled === undefined) units_list[i].set_Enabled(true);
                  else units_list[i].set_Enabled(saved_unit.enabled);
                }
              }
            }

            units.UpdateFormation(true); //this works and USES the API so works for both servers
            //units.CLEZCG(); // UpdateArmyLayout$0() has been renamed to CLEZCG()
            //units.WRKUTR(); // RefreshData() has been renamed to WRKUTR()
          },
          saveFormation: function () {
            this.saved_units = [];
            for (var i = 0;
            (i < this.units.length); i++) {
              var unit = this.units[i];
              var armyUnit = {};
              armyUnit.x = unit.get_CoordX();
              armyUnit.y = unit.get_CoordY();
              armyUnit.id = unit.get_Id();
              armyUnit.enabled = unit.get_Enabled();
              this.saved_units.push(armyUnit);
            }
          },
          shiftFormation: function (direction) { //left right up down

            if (!direction) var direction = window.prompt("indicate a direction to shift units: up(u), down(d), left(l) or right(r)");

            if (direction == "up" || direction == "u") var v_shift = -1;
            if (direction == "down" || direction == "d") var v_shift = 1;
            if (direction == "left" || direction == "l") var h_shift = -1;
            if (direction == "right" || direction == "r") var h_shift = 1;

            if (!v_shift) var v_shift = 0;
            if (!h_shift) var h_shift = 0;

            var units = this.getCityPreArmyUnits();
            this.units = units.get_ArmyUnits().l;
            var Army = [];
            //read army, consider use saveFormation(?)
            for (var i = 0;
            (i < this.units.length); i++) {
              var unit = this.units[i];
              var armyUnit = {};
              var x = unit.get_CoordX() + h_shift;
              switch (x) {
              case 9:
                x = 0;
                break;
              case -1:
                x = 8;
                break;
              }
              var y = unit.get_CoordY() + v_shift;
              switch (y) {
              case 4:
                y = 0;
                break;
              case -1:
                y = 3;
                break;
              }
              armyUnit.x = x;
              armyUnit.y = y;
              armyUnit.id = unit.get_Id();
              armyUnit.enabled = unit.get_Enabled();
              Army.push(armyUnit);
            }
            this.restoreFormation(Army);
          },
          shiftFormationUp: function () {
            this.shiftFormation('u');
          },
          shiftFormationDown: function () {
            this.shiftFormation('d');
          },
          shiftFormationLeft: function () {
            this.shiftFormation('l');
          },
          shiftFormationRight: function () {
            this.shiftFormation('r');
          }
        }
      });
    }

    function TASuite_checkIfLoaded() {
      try {
        if (typeof qx !== 'undefined') {
          a = qx.core.Init.getApplication(); // application
          mb = qx.core.Init.getApplication().getMenuBar();
          if (a && mb && typeof PerforceChangelist !== 'undefined') {
            if (PerforceChangelist === 364597) {
              CreateTweak();
            } else {
              LimitedCreateTweak();
            }
            window.TASuite.main.getInstance().initialize();
          } else window.setTimeout(TASuite_checkIfLoaded, 1000);
        } else {
          window.setTimeout(TASuite_checkIfLoaded, 1000);
        }
      } catch (e) {
        if (typeof console !== 'undefined') console.log(e);
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
  if (/commandandconquer\.com/i.test(document.domain)) document.getElementsByTagName("head")[0].appendChild(TASuiteScript);
})();