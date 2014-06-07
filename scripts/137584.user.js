// ==UserScript==
// @name           jka
// @description    The Best
// @namespace      https://prodgame*.alliances.commandandconquer.com/*/index.aspx* 
// @include        https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version        1.2.2.0
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
            layoutsList: null,
            layoutsLabelText: null,
            buttonReturnSetup: null,
            buttonGetProTools: null,
            buttonCheckPro: null,
            troopDamageLabel: null,
            battleResultsBox: null,
            add_ViewModeChange: null,
            attacker_modules: null,
            defender_modules: null,
            degree: null,
            currentDx: null,
            currentDy: null,
            currentUnit: null,
            units: null,
            units_list: null,
            buttonProTools: null,
            buttonOptimize: null,
            degreeSelect: null,
            primarySelect: null,
            secondarySelect: null,
            tertiarySelect: null,
            add_ArmyChanged: null,
            lastPrimary: null,
            lastSecondary: null,
            lastTertiary: null,
            currentPrimary: null,
            currentSecondary: null,
            currentTertiary: null,
            continuousCheckBox: null,
            soundCheckBox: null,
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
            tiberiumSpoils: null,
            crystalSpoils: null,
            creditSpoils: null,
            researchSpoils: null,
            totalSeconds: null,
            lastVictory: null,
            saved_units: null,
            optimizing: null,
            ajaxImage: null,
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
            lastInfantryRepairTime: null,
            lastVehicleRepairTime: null,
            lastAircraftRepairTime: null,
            doneSound: null,
            found_improvement: null,
            initialize: function () {
              this.doneSound = new Audio("https://dl.dropbox.com/u/41023713/tasim_done_snd.wav");
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

              _this = this;
              setTimeout(function () {
                try {
                  // Get the active modules
                  // Doing this the hard and unreliable way for now, until we figure out a better way
                  _this.attacker_modules = {};
                  var g = ClientLib.Res.ResMain.GetInstance();
                  var player = ClientLib.Data.MainData.GetInstance().get_Player();
                  _this.attacker_modules.l = [];
                  for (var i in g.YEJ.units) {
                    var ug = g.GetUnit_Obj(i);
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
                } catch (e) {
                  console.log(e);
                }

                ClientLib.Vis.VisMain.GetInstance().add_ViewModeChange(_this.add_ViewModeChange);
              }, 10000);

              var armyBar = qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_ATTACKSETUP);
              armyBar.add(this.buttonSimulateCombat, {
                top: 130,
                right: 0
              });

              var replayBar = qx.core.Init.getApplication().getReportReplayOverlay();
              replayBar.add(this.buttonReturnSetup, {
                top: 10,
                right: 80
              });

              this.troopDamageLabel = new qx.ui.basic.Label().set({
                value: "<span style='color: black; font-weight: bold;'>Troop Strength: 100%</span>",
                rich: true
              });
              replayBar.add(this.troopDamageLabel, {
                right: 100,
                top: 30
              });

              this.buttonUnlockAttack = new qx.ui.form.Button("Unlock");
              this.buttonUnlockAttack.set({
                width: 60,
                height: 45,
                appearance: "button-text-small",
                toolTipText: "Unlock"
              });
              this.buttonUnlockAttack.addListener("click", this.unlockAttacks, this);
              armyBar.add(this.buttonUnlockAttack, {
                top: 81,
                right: 0
              });

              this.add_ArmyChanged = (new System.EventHandler).HGL(this, this.onUnitMoved);

              this.buttonOptimize = new qx.ui.form.Button("Optimize");
              this.buttonOptimize.set({
                width: 80,
                appearance: "button-text-small",
                toolTipText: "Attempt to optimize your setup"
              });
              this.buttonOptimize.addListener("click", this.optimizeLayout, this);

              this.ajaxImage = new qx.ui.basic.Image("https://dl.dropbox.com/u/41023713/loading.gif");
              this.ajaxImage.setVisibility("none");
              this.ajaxImage.setThemedAlignX("center");

              // The Battle Simulator box
              this.battleResultsBox = new qx.ui.window.Window("Battle Simulator");
              this.battleResultsBox.setPadding(1);
              this.battleResultsBox.setLayout(new qx.ui.layout.VBox(1));
              this.battleResultsBox.setShowMaximize(false);
              this.battleResultsBox.setShowMinimize(false);
              this.battleResultsBox.moveTo(115, 15);
              this.battleResultsBox.setHeight(400);
              this.battleResultsBox.setWidth(250);
              this.battleResultsBox.getApplicationRoot().set({
                blockerColor: '#000000',
                blockerOpacity: 0.6
              });

              var tabView = new qx.ui.tabview.TabView();
              tabView.setPadding(5);

              ////////////////// Optimizer ////////////////////
              var optPage = new qx.ui.tabview.Page("Optimizer");
              optPage.setLayout(new qx.ui.layout.VBox(5));
              optPage.setPadding(1);
              tabView.add(optPage);

              // The Enemy Vertical Box
              var eVBox = new qx.ui.container.Composite()
              eVBox.setLayout(new qx.ui.layout.VBox(5));
              eVBox.setThemedFont("bold");
              eVBox.setThemedPadding(2);
              eVBox.setThemedBackgroundColor("#eef");
              optPage.add(eVBox);
              // The Enemy Troop Strength Label
              var eHBox1 = new qx.ui.container.Composite();
              eHBox1.setLayout(new qx.ui.layout.HBox(5));
              eHBox1.add(new qx.ui.basic.Label("Enemy Base: ")); //Strength: "));
              this.enemyTroopStrengthLabel = new qx.ui.basic.Label("100");
              eHBox1.add(this.enemyTroopStrengthLabel);
              this.enemyTroopStrengthLabel.setTextColor("red");
              eVBox.add(eHBox1);
              // Units
              var eHBox4 = new qx.ui.container.Composite();
              eHBox4.setLayout(new qx.ui.layout.HBox(5));
              eHBox4.add(new qx.ui.basic.Label("Defences:   ")); //Units: "));
              this.enemyUnitsStrengthLabel = new qx.ui.basic.Label("100");
              eHBox4.add(this.enemyUnitsStrengthLabel);
              this.enemyUnitsStrengthLabel.setTextColor("green");
              eVBox.add(eHBox4);
              // Buildings
              var eHBox5 = new qx.ui.container.Composite();
              eHBox5.setLayout(new qx.ui.layout.HBox(5));
              eHBox5.add(new qx.ui.basic.Label("Buildings:  "));
              this.enemyBuildingsStrengthLabel = new qx.ui.basic.Label("100");
              eHBox5.add(this.enemyBuildingsStrengthLabel);
              this.enemyBuildingsStrengthLabel.setTextColor("green");
              eVBox.add(eHBox5);
              // Command Center
              var eHBox2 = new qx.ui.container.Composite();
              eHBox2.setLayout(new qx.ui.layout.HBox(5));
              eHBox2.add(new qx.ui.basic.Label("Construction Yard: "));
              this.CYTroopStrengthLabel = new qx.ui.basic.Label("100");
              eHBox2.add(this.CYTroopStrengthLabel);
              this.CYTroopStrengthLabel.setTextColor("red");
              eVBox.add(eHBox2);
              // Defense Facility
              var eHBox3 = new qx.ui.container.Composite();
              eHBox3.setLayout(new qx.ui.layout.HBox(5));
              eHBox3.add(new qx.ui.basic.Label("Defense Facility:  "));
              this.DFTroopStrengthLabel = new qx.ui.basic.Label("100");
              eHBox3.add(this.DFTroopStrengthLabel);
              this.DFTroopStrengthLabel.setTextColor("red");
              eVBox.add(eHBox3);
              // The Support Horizontal Box
              var hboxSupportContainer = new qx.ui.container.Composite();
              hboxSupportContainer.setLayout(new qx.ui.layout.HBox(5));
              this.enemySupportLevelLabel = new qx.ui.basic.Label("Suport lvl ");
              hboxSupportContainer.add(this.enemySupportLevelLabel);
              this.enemySupportStrengthLabel = new qx.ui.basic.Label("--: 100");
              hboxSupportContainer.add(this.enemySupportStrengthLabel);
              this.enemySupportStrengthLabel.setTextColor("red");
              eVBox.add(hboxSupportContainer);
              // The Troops Vertical Box
              var tVBox = new qx.ui.container.Composite()
              tVBox.setLayout(new qx.ui.layout.VBox(5));
              tVBox.setThemedFont("bold");
              tVBox.setThemedPadding(2);
              tVBox.setThemedBackgroundColor("#eef");
              optPage.add(tVBox);
              // The Repair Time Label
              var tHBox1 = new qx.ui.container.Composite();
              tHBox1.setLayout(new qx.ui.layout.HBox(5));
              tHBox1.add(new qx.ui.basic.Label("Repair Time: "));
              this.simRepairTimeLabel = new qx.ui.basic.Label("0:00:00");
              tHBox1.add(this.simRepairTimeLabel);
              this.simRepairTimeLabel.setTextColor("blue");
              tVBox.add(tHBox1);
              // The Troop Strength Label
              var tHBox5 = new qx.ui.container.Composite();
              tHBox5.setLayout(new qx.ui.layout.HBox(5));
              tHBox5.add(new qx.ui.basic.Label("Overall: "));
              this.simTroopDamageLabel = new qx.ui.basic.Label("100");
              tHBox5.add(this.simTroopDamageLabel);
              this.simTroopDamageLabel.setTextColor("blue");
              tVBox.add(tHBox5);
              // The Infantry Troop Strength Label
              var tHBox2 = new qx.ui.container.Composite();
              tHBox2.setLayout(new qx.ui.layout.HBox(5));
              tHBox2.add(new qx.ui.basic.Label("Infantry: "));
              this.infantryTroopStrengthLabel = new qx.ui.basic.Label("100");
              tHBox2.add(this.infantryTroopStrengthLabel);
              this.infantryTroopStrengthLabel.setTextColor("green");
              tVBox.add(tHBox2);
              // The Vehicle Troop Strength Label
              var tHBox3 = new qx.ui.container.Composite();
              tHBox3.setLayout(new qx.ui.layout.HBox(5));
              tHBox3.add(new qx.ui.basic.Label("Vehicle:  "));
              this.vehicleTroopStrengthLabel = new qx.ui.basic.Label("100");
              tHBox3.add(this.vehicleTroopStrengthLabel);
              this.vehicleTroopStrengthLabel.setTextColor("green");
              tVBox.add(tHBox3);
              // The Air Troop Strength Label
              var tHBox4 = new qx.ui.container.Composite();
              tHBox4.setLayout(new qx.ui.layout.HBox(5));
              tHBox4.add(new qx.ui.basic.Label("Aircraft: "));
              this.airTroopStrengthLabel = new qx.ui.basic.Label("100");
              tHBox4.add(this.airTroopStrengthLabel);
              this.airTroopStrengthLabel.setTextColor("green");
              tVBox.add(tHBox4);

              // The inner Vertical Box
              var vBox = new qx.ui.container.Composite()
              vBox.setLayout(new qx.ui.layout.VBox(5));
              vBox.setThemedFont("bold");
              vBox.setThemedPadding(2);
              vBox.setThemedBackgroundColor("#eef");
              // The Victory Label
              var hBox2 = new qx.ui.container.Composite()
              hBox2.setLayout(new qx.ui.layout.HBox(5));
              hBox2.add(new qx.ui.basic.Label("Outcome: "));
              this.simVictoryLabel = new qx.ui.basic.Label("Yes");
              hBox2.add(this.simVictoryLabel);
              this.simVictoryLabel.setTextColor("green");
              vBox.add(hBox2);
              // The Battle Time Label
              var hBox1 = new qx.ui.container.Composite()
              hBox1.setLayout(new qx.ui.layout.HBox(5));
              hBox1.add(new qx.ui.basic.Label("Battle Time: "));
              this.simTimeLabel = new qx.ui.basic.Label("120");
              hBox1.add(this.simTimeLabel);
              this.simTimeLabel.setTextColor("black");
              vBox.add(hBox1);
              optPage.add(vBox);
              // Continuous Checkbox
              this.continuousCheckBox = new qx.ui.form.CheckBox('Continuous');
              vBox.add(this.continuousCheckBox);
              // Sound Checkbox
              this.soundCheckBox = new qx.ui.form.CheckBox('Play Sound');
              vBox.add(this.soundCheckBox);
              // Options for Optimize
              // Degree selector
              var hBox3 = new qx.ui.container.Composite()
              hBox3.setLayout(new qx.ui.layout.HBox(5));
              hBox3.add(new qx.ui.basic.Label("Mode: "));
              this.degreeSelect = new qx.ui.form.SelectBox();
              this.degreeSelect.add(new qx.ui.form.ListItem("Small", null, "1"));
              var averageChoice = new qx.ui.form.ListItem("Medium", null, "2");
              this.degreeSelect.add(averageChoice);
              this.degreeSelect.add(new qx.ui.form.ListItem("Large", null, "4"));
              this.degreeSelect.add(new qx.ui.form.ListItem("Full", null, "8"));
              this.degreeSelect.setSelection([averageChoice]);
              hBox3.add(this.degreeSelect);
              vBox.add(hBox3);
              // Primary selector
              var hBox4 = new qx.ui.container.Composite();
              hBox4.setLayout(new qx.ui.layout.HBox(5));
              hBox4.add(new qx.ui.basic.Label("1st: "));
              this.primarySelect = new qx.ui.form.SelectBox();
              var primarySelectDefault = new qx.ui.form.ListItem("C. Yard", null, "CY");
              this.primarySelect.add(primarySelectDefault);
              this.primarySelect.add(new qx.ui.form.ListItem("Repair Time", null, "RT"));
              this.primarySelect.add(new qx.ui.form.ListItem("Troop Strength", null, "TS"));
              this.primarySelect.add(new qx.ui.form.ListItem("Defense Facility", null, "DF"));
              this.primarySelect.add(new qx.ui.form.ListItem("Enemy Strength", null, "ES"));
              this.primarySelect.add(new qx.ui.form.ListItem("Battle Time", null, "BT"));
              this.primarySelect.setSelection([primarySelectDefault]);
              hBox4.add(this.primarySelect);
              vBox.add(hBox4);
              // Secondary selector
              var hBox5 = new qx.ui.container.Composite();
              hBox5.setLayout(new qx.ui.layout.HBox(5));
              hBox5.add(new qx.ui.basic.Label("2nd: "));
              this.secondarySelect = new qx.ui.form.SelectBox();
              this.secondarySelect.add(new qx.ui.form.ListItem("C. Yard", null, "CY"));
              var secondarySelectDefault = new qx.ui.form.ListItem("Repair Time", null, "RT");
              this.secondarySelect.add(secondarySelectDefault);
              this.secondarySelect.add(new qx.ui.form.ListItem("Troop Strength", null, "TS"));
              this.secondarySelect.add(new qx.ui.form.ListItem("Defense Facility", null, "DF"));
              this.secondarySelect.add(new qx.ui.form.ListItem("Enemy Strength", null, "ES"));
              this.secondarySelect.add(new qx.ui.form.ListItem("Battle Time", null, "BT"));
              this.secondarySelect.setSelection([secondarySelectDefault]);
              hBox5.add(this.secondarySelect);
              vBox.add(hBox5);
              // Tertiary selector
              var hBox6 = new qx.ui.container.Composite();
              hBox6.setLayout(new qx.ui.layout.HBox(5));
              hBox6.add(new qx.ui.basic.Label("3rd: "));
              this.tertiarySelect = new qx.ui.form.SelectBox();
              this.tertiarySelect.add(new qx.ui.form.ListItem("C. Yard", null, "CY"));
              this.tertiarySelect.add(new qx.ui.form.ListItem("Repair Time", null, "RT"));
              this.tertiarySelect.add(new qx.ui.form.ListItem("Troop Strength", null, "TS"));
              this.tertiarySelect.add(new qx.ui.form.ListItem("Defense Facility", null, "DF"));
              var tertiarySelectDefault = new qx.ui.form.ListItem("Enemy Strength", null, "ES");
              this.tertiarySelect.add(tertiarySelectDefault);
              this.tertiarySelect.add(new qx.ui.form.ListItem("Battle Time", null, "BT"));
              this.tertiarySelect.setSelection([tertiarySelectDefault]);
              hBox6.add(this.tertiarySelect);
              vBox.add(hBox6);
              // AJAX loader
              vBox.add(this.ajaxImage);
              // The Optimize button
              optPage.add(this.buttonOptimize);

              ////////////////// Layouts ////////////////////
              var layoutPage = new qx.ui.tabview.Page("Layouts");
              layoutPage.setLayout(new qx.ui.layout.VBox());
              tabView.add(layoutPage);

              this.layoutsList = new qx.ui.form.List();
              this.layoutsList.set({
                height: 280,
                width: 180,
                selectionMode: "one"
              });
              layoutPage.add(this.layoutsList);

              // Add the two buttons for save and load
              var layHBox = new qx.ui.container.Composite();
              layHBox.setLayout(new qx.ui.layout.HBox(5));
              // Load button
              this.buttonLayoutLoad = new qx.ui.form.Button("Load");
              this.buttonLayoutLoad.set({
                width: 80,
                appearance: "button-text-small",
                toolTipText: "Load this saved layout."
              });
              this.buttonLayoutLoad.addListener("click", this.loadCityLayout, this);
              layHBox.add(this.buttonLayoutLoad);
              // Delete button
              this.buttonLayoutDelete = new qx.ui.form.Button("Delete");
              this.buttonLayoutDelete.set({
                width: 80,
                appearance: "button-text-small",
                toolTipText: "Delete this saved layout."
              });
              this.buttonLayoutDelete.addListener("click", this.deleteCityLayout, this);
              layHBox.add(this.buttonLayoutDelete);
              layoutPage.add(layHBox);

              var layVBox = new qx.ui.container.Composite()
              layVBox.setLayout(new qx.ui.layout.VBox(5));
              layVBox.setThemedFont("bold");
              layVBox.setThemedPadding(2);
              layVBox.setThemedBackgroundColor("#eef");
              // The Label Textbox
              var layHBox2 = new qx.ui.container.Composite()
              layHBox2.setLayout(new qx.ui.layout.HBox(5));
              layHBox2.add(new qx.ui.basic.Label("Name: "));
              this.layoutsLabelText = new qx.ui.form.TextField();
              layHBox2.add(this.layoutsLabelText);
              layVBox.add(layHBox2);

              this.buttonLayoutSave = new qx.ui.form.Button("Save");
              this.buttonLayoutSave.set({
                width: 80,
                appearance: "button-text-small",
                toolTipText: "Save this layout."
              });
              this.buttonLayoutSave.addListener("click", this.saveCityLayout, this);
              layVBox.add(this.buttonLayoutSave);
              layoutPage.add(layVBox);

              ////////////////// Info ////////////////////
              var infoPage = new qx.ui.tabview.Page("Info");
              infoPage.setLayout(new qx.ui.layout.VBox(5));
              tabView.add(infoPage);

              // The Help Vertical Box
              var pVBox = new qx.ui.container.Composite()
              pVBox.setLayout(new qx.ui.layout.VBox(5));
              pVBox.setThemedFont("bold");
              pVBox.setThemedPadding(2);
              pVBox.setThemedBackgroundColor("#eef");
              infoPage.add(pVBox);
              var proHelpBar = new qx.ui.basic.Label().set({
                value: "<a target='_blank' href='http://www.youtube.com/watch?v=TcgryVL9jnk'>Tutorial</a> | <a target='_blank' href='http://www.moneyscripts.net/ta/faq'>FAQ</a> | <a target='_blank' href='http://userscripts.org/scripts/discuss/130344'>Forums</a>",
                rich: true
              });
              pVBox.add(proHelpBar);
              // The Spoils
              var psVBox = new qx.ui.container.Composite()
              psVBox.setLayout(new qx.ui.layout.VBox(5));
              psVBox.setThemedFont("bold");
              psVBox.setThemedPadding(2);
              psVBox.setThemedBackgroundColor("#eef");
              infoPage.add(psVBox);
              psVBox.add(new qx.ui.basic.Label("Spoils"));
              // Tiberium
              this.tiberiumSpoils = new qx.ui.basic.Atom("0", "webfrontend/ui/common/icn_res_tiberium.png");
              psVBox.add(this.tiberiumSpoils);
              // Crystal
              this.crystalSpoils = new qx.ui.basic.Atom("0", "webfrontend/ui/common/icn_res_chrystal.png");
              psVBox.add(this.crystalSpoils);
              // Credits
              this.creditSpoils = new qx.ui.basic.Atom("0", "webfrontend/ui/common/icn_res_dollar.png");
              psVBox.add(this.creditSpoils);
              // Research
              this.researchSpoils = new qx.ui.basic.Atom("0", "webfrontend/ui/common/icn_res_research_mission.png");
              psVBox.add(this.researchSpoils);

              this.battleResultsBox.add(tabView);

              this.buttonProTools = new qx.ui.form.Button("Tools");
              this.buttonProTools.set({
                width: 80,
                appearance: "button-text-small",
                toolTipText: "Open Simulator Tools"
              });
              this.buttonProTools.addListener("click", this.togglePro, this);
              armyBar.add(this.buttonProTools, {
                top: 17,
                right: 0
              });
            },
            updateLayoutsList: function () {
              this.layoutsList.removeAll();
              // Load the saved layouts for this city
              var layouts = this.loadCityLayouts();
              if (layouts) {
                for (var i in layouts) {
                  var layout = layouts[i];
                  var item = new qx.ui.form.ListItem(layout.label, null, layout.id);
                  this.layoutsList.add(item);
                };
              }
            },
            deleteCityLayout: function () {
              try {
                var layouts = this.loadLayouts();
                var current_city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity().get_Id();
                var lid = this.layoutsList.getSelection()[0].getModel();
                if (layouts && typeof layouts[current_city] != 'undefined' && typeof layouts[current_city][lid] != 'undefined') {
                  delete layouts[current_city][lid];
                  this.saveLayouts(layouts);
                  this.updateLayoutsList();
                }
              } catch (e) {
                console.log(e);
              }
            },
            loadCityLayout: function () {
              try {
                var layouts = this.loadCityLayouts();
                var lid = this.layoutsList.getSelection()[0].getModel();
                if (layouts && typeof layouts[lid] != 'undefined') {
                  // Load the selected city layout
                  var saved_units = layouts[lid].layout;
                  this.restoreFormation(saved_units);
                }
              } catch (e) {
                console.log(e);
              }
            },
            saveCityLayout: function () {
              try {
                // Save the current layout for this city
                var current_city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity().get_Id();
                var layouts = this.loadLayouts();
                this.saveFormation();
                var lid = new Date().getTime().toString();
                var title = this.layoutsLabelText.getValue();
                title += " (TS: " + this.lastPercentage.toFixed(2).toString() + ")";
                var city_layouts = this.loadCityLayouts();
                if (!layouts.hasOwnProperty(current_city)) {
                  layouts[current_city] = city_layouts;
                }
                layouts[current_city][lid] = {
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
              var temp = localStorage.tasim_city_layouts;
              if (temp) {
                return JSON.parse(temp);
              }
              return {};
            },
            loadCityLayouts: function () {
              var temp = localStorage.tasim_city_layouts;
              if (temp) {
                var layouts = JSON.parse(temp);
                var current_city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity().get_Id();

                if (layouts.hasOwnProperty(current_city)) {
                  return layouts[current_city];
                }
              }
              return {};
            },
            saveLayouts: function (layouts) {
              // TODO - Add some kind of global layout support
              // TODO - Remove cities that are no longer existing
              // TODO - There should be another key for the attacking city
              localStorage.tasim_city_layouts = JSON.stringify(layouts);
            },
            calculateLoot: function () {
              // Adapted from the CNC Loot script: http://userscripts.org/scripts/show/135953
              var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();
              var num = city.m_CityBuildings.m_BuildSlotsCurrent;
              var spoils = {
                1: 0,
                2: 0,
                3: 0,
                6: 0,
                7: 0
              };

               if (city.get_CityBuildingsData().LYXSZY  != null) {
                                // every building
                                num = city.get_CityBuildingsData().LYXSZY .l.length;
                                for (var j = num; --j >= 0;) {
                                    var building = city.get_CityBuildingsData().LYXSZY .l[j];
                                    //TODO: check for destroyed building
                                    var mod = building.get_HitpointsPercent();
                                    for (var i = building.KBUDOV.rer.length; --i >= 0;) {
                                        spoils[building.KBUDOV.rer[i].t] += mod * building.KBUDOV.rer[i].c;
                                    }
                                }
                            }

                            // every unit
                            if (city.get_CityUnitsData().QIG != null) {
                                num = city.get_CityUnitsData().QIG.l.length;
                                for (j = num; --j >= 0;) {
                                    var unit = city.get_CityUnitsData().QIG.l[j];
                                    mod = unit.get_HitpointsPercent();
                                    for (i = unit.KBUDOV.rer.length; --i >= 0;) {
                                        spoils[unit.KBUDOV.rer[i].t] += mod * unit.KBUDOV.rer[i].c;
                  }
                }
              }
              this.tiberiumSpoils.setLabel(this.formatNumberWithCommas(spoils[1]));
              this.crystalSpoils.setLabel(this.formatNumberWithCommas(spoils[2]));
              this.creditSpoils.setLabel(this.formatNumberWithCommas(spoils[3]));
              this.researchSpoils.setLabel(this.formatNumberWithCommas(spoils[6]));
            },
            getCityPreArmyUnits: function () {
              var armyBar = qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_ATTACKSETUP);
              var units = null;
              for (var key in armyBar) {
                try {
                  if (armyBar[key] instanceof ClientLib.Data.CityPreArmyUnits) {
                    units = armyBar[key];
                    break;
                  }
                } catch (e) {

                }
              }

              return units;
            },
            closeProBox: function () {
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
            togglePro: function () {
              var units = this.getCityPreArmyUnits();
              this.units = units.m_ArmyUnits.l;
              if (this.battleResultsBox.isVisible()) {
                this.closeProBox();
              } else {
                // Add the event listener for armybar
                try {
                  units.add_ArmyChanged(this.add_ArmyChanged);
                } catch (e) {
                  console.log(e);
                }

                this.updateLayoutsList();
                this.calculateLoot();
                this.updateProWindow();
                this.battleResultsBox.open();
              }
            },
            optimizeLayout: function () {
              try {
                // First, get the CityPreArmyUnits
                var units = this.getCityPreArmyUnits();
                if (this.optimizing) {
                  this.optimizingDone(false);
                  this.updateFormation();
                } else {
                  this.battleResultsBox.setModal(true);
                  this.battleResultsBox.setAllowClose(false);
                  this.buttonOptimize.setLabel("Stop"); // Cancel means that all changes will be restored back
                  this.ajaxImage.setVisibility("visible");
                  this.optimizing = true;
                  // Set the current primary and secondary targets
                  this.updateProWindow();
                  this.setTargets();
                  this.degree = parseInt(this.degreeSelect.getSelection()[0].getModel());
                  this.found_improvement = false;
                  this.checkBetterFormation();
                }
              } catch (e) {
                console.log(e);
              }
            },
            optimizingDone: function (cancelled) {
              if (cancelled == null) {
                var continuous = this.continuousCheckBox.getValue();
                var play_sound = this.soundCheckBox.getValue();
              } else {
                var play_sound = false;
                var continuous = false;
              }
              if (continuous && this.found_improvement) {
                this.optimizing = false;
                this.optimizeLayout();
              } else {
                this.buttonOptimize.setLabel("Optimize");
                this.battleResultsBox.setAllowClose(true);
                this.battleResultsBox.setModal(false);
                this.optimizing = false;
                this.ajaxImage.setVisibility("none");

                if (play_sound) {
                  this.doneSound.play();
                }
              }
            },
            checkBetterFormation: function () {
              this.saveFormation();

              var order = [];
              for (var i = 0; i < this.units.length; i++) {
                order.push(i);
              }

              // Randomize the units order
              var tmp, current, top = order.length;

              if (top) while (--top) {
                current = Math.floor(Math.random() * (top + 1));
                tmp = order[current];
                order[current] = order[top];
                order[top] = tmp;
              }

              this.units_list = order;
              this.currentUnit = this.units[this.units_list.pop()];
              this.currentDx = this.degree;
              this.currentDy = this.degree;
              setTimeout(this.moveLoop, 1000);

              return false;
            },
            moveLoop: function () {
              ta = window.TASuite.main.getInstance();
              if (!ta.optimizing) {
                return;
              }
              // First check if this move is legal
              var unit = ta.currentUnit;
              var x = unit.get_CoordX();
              var y = unit.get_CoordY();
              var degree = ta.degree;
              var dx = ta.currentDx;
              var dy = ta.currentDy;
              dx -= 1;

              new_x = dx + x;
              new_y = dy + y;
              if (dy == 0 && dx == 0) {
                dx -= 1;
              } else {
                if (new_x >= 0 && new_x < 8) {
                  if (new_y >= 0 && new_y < 4) {
                    // Move the unit
                    // TODO - First, check if the unit is a different type or level
                    /*
                  var other_unit = units.GetUnitByCoord(new_x,new_y);
                  console.log(other_unit);
                  console.log(unit);
                  console.log(units);
                  */
                    unit.MoveBattleUnit(new_x, new_y);
                    if (ta.checkNewResults()) {
                      ta.updateFormation();
                      ta.nextUnit();
                      return;
                    } else {
                      unit.MoveBattleUnit(x, y);
                    }
                  }
                }
              }

              if (dx < -degree || dx < 0) {
                dx = degree;
                dy -= 1;
                if (dy < -degree || dy < 0) {
                  ta.nextUnit();
                  return;
                }
              }

              // If we are still on this unit, then set the dx and dy and schedule another iteration
              ta.currentDx = dx;
              ta.currentDy = dy;
              setTimeout(ta.moveLoop, 10);
            },
            nextUnit: function () {
              // Set the next unit if this isn't the last one, and start the loop again
              if (this.units_list.length > 0) {
                this.currentDx = this.degree;
                this.currentDy = this.degree;
                this.currentUnit = this.units[this.units_list.pop()];
                setTimeout(this.moveLoop, 10);
              } else {
                // Subtract the degree and start over
                this.degree -= 1;
                if (this.degree > 0) {
                  this.checkBetterFormation();
                } else {
                  this.optimizingDone();
                  this.updateFormation();
                }
              }
            },
            setTargets: function () {
              var p = this.primarySelect.getSelection()[0].getModel();
              var s = this.secondarySelect.getSelection()[0].getModel();
              var t = this.tertiarySelect.getSelection()[0].getModel();

              this.lastPrimary = this.getTarget(p);
              this.lastSecondary = this.getTarget(s);
              this.lastTertiary = this.getTarget(t);

              this.currentPrimary = this.lastPrimary;
              this.currentSecondary = this.lastSecondary;
              this.currentTertiary = this.lastTertiary;
            },
            getTarget: function (key) {
              // i will add some options soon
              switch (key) {
              case 'DF':
                // enemyDF -1
                return this.lastDFPercentage;
              case 'CY':
                // enemyCY -1
                return this.lastCYPercentage;
              case 'RT':
                // attackerRT -1
                return this.lastRepairTime;
              case 'TS':
                // attacker Overall +1
                return this.lastPercentage;
              case 'ES':
                // enemyBase -1
                return this.lastEnemyPercentage;
              case 'BT':
                // battleTime -1
                return this.totalSeconds;
              }
            },
            compareTargets: function () {
              // simplyfied
              var np = -1;
              var ns = -1;
              var nt = -1;
              var p = this.primarySelect.getSelection()[0].getModel();
              var s = this.secondarySelect.getSelection()[0].getModel();
              var t = this.tertiarySelect.getSelection()[0].getModel();
              // Check if the primary should be negated
              switch (p) {
              case 'TS':
                np = 1;
                break;
              }
              switch (s) {
              case 'TS':
                ns = 1;
                break;
              }
              switch (t) {
              case 'TS':
                nt = 1;
                break;
              }
              this.lastPrimary = this.getTarget(p);
              this.lastSecondary = this.getTarget(s);
              this.lastTertiary = this.getTarget(t);
              // Check if the primary is higher, if so, return true
              if ((this.lastPrimary * np) > (this.currentPrimary * np)) {
                return true;
              } else if ((this.lastPrimary * np) == (this.currentPrimary * np)) {
                // Check if the primary is equal, if so, check the secondary
                if ((this.lastSecondary * ns) > (this.currentSecondary * ns)) {
                  return true;
                } else if ((this.lastSecondary * ns) == (this.currentSecondary * ns)) {
                  if ((this.lastTertiary * nt) > (this.currentTertiary * nt)) {
                    return true;
                  }
                }
              }

              return false;
            },
            checkNewResults: function () {
              this.calculateSimResults();

              if (this.compareTargets()) {
                this.found_improvement = true;
                this.saveFormation();
                this.setTargets();
                this.updateProWindow();
                return true;
              }

              return false;
            },
            restoreFormation: function (saved_units) {
              saved_units = saved_units || this.saved_units;
              var units = this.getCityPreArmyUnits();
              var units_list = units.m_ArmyUnits.l;
              for (var i = 0;
              (i < units_list.length); i++) {
                var saved_unit = saved_units[i];
                units_list[i].m_CoordX = saved_unit.x;
                units_list[i].m_CoordY = saved_unit.y;
                units_list[i].m_UnitId = saved_unit.id;
              }

              units.UpdateArmyLayout();
              units.RefreshData();
            },
            saveFormation: function () {
              this.saved_units = [];
              for (var i = 0;
              (i < this.units.length); i++) {
                var unit = this.units[i];
                var armyUnit = {};
                armyUnit.x = unit.m_CoordX;
                armyUnit.y = unit.m_CoordY;
                armyUnit.id = unit.m_UnitId;
                this.saved_units.push(armyUnit);
              }
            },
            calculateTroopStrengths: function(battleground) {
              var battleground = ClientLib.Vis.VisMain.GetInstance().get_Battleground();
              var total_hp = 0;
              var end_hp = 0;
              var e_total_hp = 0;
              var e_end_hp = 0;
              var eb_total_hp = 0;
              var eb_end_hp = 0;
              var eu_total_hp = 0;
              var eu_end_hp = 0;
              var i_total_hp = 0;
              var i_end_hp = 0;
              var v_total_hp = 0;
              var v_end_hp = 0;
              var a_total_hp = 0;
              var a_end_hp = 0;
              this.lastDFPercentage = 0;
              this.lastCYPercentage = 0;
              this.SupportLevel = 0;
              this.lastSupportPercentage = 0;
              this.lastInfantryRepairTime = 0;
              this.lastVehicleRepairTime = 0;
              this.lastAircraftRepairTime = 0;
              var entities = battleground.m_Entities.d;
              var attacker = SharedLib.Combat.ECbtAlignment.Attacker;

              // TODO - Get the x,y position of the enemy CY and DF, so we can add new metric for building in front of them
               for (var i in entities) {
                                var entity = entities[i];
                                var i_entity = entity.UBK; // get_Entity() has been removed. Propery is $I.TQL - UBK
                                var a_entity = entity.TAK; // get_Entity() has been removed. Propery is $I.TQL - UBK
                                var current_hp = i_entity.HUL; // m_iHitpointsCurrent has been renamed to HUL
                                var max_hp = i_entity.GUL; // m_iHitpoints has been renamed to GUL
                                if (a_entity.SIJ == 2) { // m_eAlignment has been renamed to SIJ, Attacker is 2
                                    // This is one of the good guys
                                    end_hp += current_hp;
                                    total_hp += max_hp;
                                    switch (a_entity.XIJ) { // XIJ is the movement type
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
                  }
                } else {
                  // Enemy Overall
                                    e_total_hp += max_hp;
                                    e_end_hp += current_hp;

                                    switch (a_entity.XIJ) {
                                    case ClientLib.Base.EUnitMovementType.Structure:
                                        // Enemy Building
                                        eb_total_hp += max_hp;
                                        eb_end_hp += current_hp;

                                        if (i_entity.VTL >= 200 && i_entity.VTL <= 205) {
                                            this.SupportLevel = parseInt(i_entity.m_iLevel);
                                            this.lastSupportPercentage = (current_hp / max_hp) * 100;
                                        } else {
                                            switch (i_entity.VTL) { // m_MDCTypeId has been renamed to VTL
                                            case 112:
                                                // CONSTRUCTION YARD
                                            case 151:
                                            case 177:
                                                this.lastCYPercentage = (current_hp / max_hp) * 100;
                                                break;
                                            case 158:
                                                // DEFENSE FACILITY
                                            case 131:
                                            case 195:
                                                this.lastDFPercentage = (current_hp / max_hp) * 100;
                                                break;
                                            }
                                        }
                                        break;
                      }
                    }
                  } else {
                  // Enemy Defence
                                        eu_total_hp += max_hp;
                                        eu_end_hp += current_hp;
                                        break;
                                    }
                                }
                            }

                            this.lastInfantryPercentage = i_total_hp ? (i_end_hp / i_total_hp) * 100 : 100;
                            this.lastVehiclePercentage = v_total_hp ? (v_end_hp / v_total_hp) * 100 : 100;
                            this.lastAirPercentage = a_total_hp ? (a_end_hp / a_total_hp) * 100 : 100;

                            this.lastEnemyUnitsPercentage = (eu_end_hp / eu_total_hp) * 100;
                            this.lastEnemyBuildingsPercentage = (eb_end_hp / eb_total_hp) * 100;
                            this.lastEnemyPercentage = (e_end_hp / e_total_hp) * 100;
                            this.lastPercentage = (end_hp / total_hp) * 100;

              / // Calculate the repair time
                            crd.ConvertRepairCost = crd.XWI; // ConvertRepairCost has been renamed to XWI
                            this.lastInfantryRepairTime = crd.ConvertRepairCost(r_types.RepairChargeInf, repair_times[ClientLib.Data.EUnitGroup.Infantry], (1 - this.lastInfantryPercentage / 100));
                            this.lastAircraftRepairTime = crd.ConvertRepairCost(r_types.RepairChargeAir, repair_times[ClientLib.Data.EUnitGroup.Aircraft], (1 - this.lastAirPercentage / 100));
                            this.lastVehicleRepairTime = crd.ConvertRepairCost(r_types.RepairChargeVeh, repair_times[ClientLib.Data.EUnitGroup.Vehicle], (1 - this.lastVehiclePercentage / 100));
                            this.lastRepairTime = Math.max(this.lastVehicleRepairTime, this.lastAircraftRepairTime, this.lastInfantryRepairTime);
                        },
            },
            updateFormation: function () {
              this.restoreFormation();
            },
            onViewChange: function (oldMode, newMode) {
              try {
                if (newMode == webfrontend.gui.PlayArea.PlayArea.modes.EMode_CombatSetupDefense) {
                  var current_city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity().get_Id();
                  if (localStorage.ta_sim_last_city != current_city) {
                    // Reset the battleground
                    this.bustCache();
                  }

                  this.setupBattleground();
                }
                if (newMode == webfrontend.gui.PlayArea.PlayArea.modes.EMode_PlayerDefense) {
                  this.closeProBox();
                }
              } catch (e) {
                console.log(e);
                if (newMode == webfrontend.gui.PlayArea.modes.EMode_CombatSetupDefense) {
                  var current_city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity().get_Id();
                  if (localStorage.ta_sim_last_city != current_city) {
                    // Reset the battleground
                    this.bustCache();
                  }

                  this.setupBattleground();
                }
                if (newMode == webfrontend.gui.PlayArea.modes.EMode_PlayerDefense) {
                  this.closeProBox();
                }
              }
            },
            onUnitMoved: function (sender, e) {
              if (!this.optimizing) {
                window.TASuite.main.getInstance().updateProWindow();
              }
            },
            onDamageDone: function (sender, e) {
              // Try to update the Troop Strength meter
              try {
                battleground = sender.DamageDone.i[0].o;
                // For the sake of performance, only run this every 10th step
                if (battleground.m_CurrentStep % 10 == 0) {
                  window.TASuite.main.getInstance().updateTroopStrength(battleground);
                }
              } catch (e) {
                console.log(e);
              }
            },
            onDefenseDestroyed: function (sender, e) {
              // Try to update the Troop Strength meter
              try {
                battleground = sender.DamageDone.i[0].o;
                window.TASuite.main.getInstance().updateTroopStrength(battleground);
              } catch (e) {
                console.log(e);
              }
            },
            calculateSimResults: function () {
              var battleground = this.setupBattleground(this.getCityPreArmyUnits());

              // Run the simulation until it's done
              while (battleground.m_Simulation.DoStep(false)) {}

              this.calculateTroopStrengths(battleground);

              this.lastVictory = battleground.m_Simulation.m_bDestroyDefense;
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
            updateProWindow: function () {
              this.calculateSimResults();
              var colors = ['black', 'blue', 'green', 'red'];
              var s = "";
              var n = 0;
              // VICTORY
              if (this.lastCYPercentage == 0) {
                 s = "Total Victory";
                 n = 0;
             } else if (this.lastEnemyBuildingsPercentage < 100) {
                 s = "Victory";
                 n = 1;
             } else {
                 s = "Total Defeat";
                 n = 3;
              }
              this.simVictoryLabel.setValue(s);
              this.simVictoryLabel.setTextColor(colors[n]);
              // i'll clear it  
              // ENEMY
              // -BASE              
              // this.updateLabel100(this.enemyBaseStrengthLabel, this.lastEnemyOverallPercentage, -1);// new names
              this.updateLabel100(this.enemyTroopStrengthLabel, this.lastEnemyPercentage, -1); // current names
              // -DEFENCES
              // this.updateLabel100(this.enemyDefencesStrengthLabel, this.lastEnemyDefencesPercentage, -1);
              this.updateLabel100(this.enemyUnitsStrengthLabel, this.lastEnemyUnitsPercentage, -1);
              // -BUILDINGS
              // this.updateLabel100(this.enemyBuildingsStrengthLabel, this.lastEnemyBuildingsPercentage, -1);
              this.updateLabel100(this.enemyBuildingsStrengthLabel, this.lastEnemyBuildingsPercentage, -1);
              // this.updateLabel100(this.CYTroopStrengthLabel, this.lastEnemyCYPercentage, -1);//enemyCYStrengthLabel
              this.updateLabel100(this.CYTroopStrengthLabel, this.lastCYPercentage, -1);
              // this.updateLabel100(this.DFTroopStrengthLabel, this.lastEnemyDFPercentage, -1);//enemyDFStrengthLabel
              this.updateLabel100(this.DFTroopStrengthLabel, this.lastDFPercentage, -1);
              // -SUPPORT
              var SLabel = (this.SupportLevel > 0) ? this.SupportLevel.toString() : '--';
              this.enemySupportLevelLabel.setValue('Suport lvl ' + SLabel + ': ');
              this.updateLabel100(this.enemySupportStrengthLabel, this.lastSupportPercentage, -1);
              // ATTACKER 
              // RepairTime
              // this.setLabelColor(this.simRepairTimeLabel, this.lastRepairTime / 14400, -1);//max is 4h
              // this.simRepairTimeLabel.setValue(this.formatSecondsAsTime(this.lastRepairTime, "h:mm:ss"));
              this.setLabelColor(this.simRepairTimeLabel, this.lastRepairTime / 14400.0, -1); //max is 4h
              this.simRepairTimeLabel.setValue(this.formatSecondsAsTime(this.lastRepairTime, "h:mm:ss"));
              // OVERALL
              // this.updateLabel100(this.simTroopLabel, this.lastTroopStrengthPercentage, 1);
              this.updateLabel100(this.simTroopDamageLabel, this.lastPercentage, 1);
              // INF
              // this.updateLabel100time(this.infantryTroopStrengthLabel, this.lastInfantryPercentage, 1, this.lastInfantryRepairTime);
              this.updateLabel100time(this.infantryTroopStrengthLabel, this.lastInfantryPercentage, 1, this.lastInfantryRepairTime);
              // VEH
              // this.updateLabel100time(this.vehicleTroopStrengthLabel, this.lastVehiclePercentage, 1, this.lastVehicleRepairTime);
              this.updateLabel100time(this.vehicleTroopStrengthLabel, this.lastVehiclePercentage, 1, this.lastVehicleRepairTime);
              // AIR
              // this.updateLabel100time(this.aircraftTroopStrengthLabel, this.lastAircraftPercentage, 1, this.lastAircraftRepairTime);
              this.updateLabel100time(this.airTroopStrengthLabel, this.lastAirPercentage, 1, this.lastAircraftRepairTime);
              // BATTLE TIME
              // this.setLabelColor(this.simBattleTimeLabel, this.totalBattleTime / 120, -1);//max is 120s
              // this.simBattleTimeLabel.setValue(this.totalBattleTime.toFixed(2).toString());
              this.setLabelColor(this.simTimeLabel, this.totalSeconds / 120.0, -1); //max is 120s
              this.simTimeLabel.setValue(this.totalSeconds.toFixed(2).toString());
            },
            formatNumberWithCommas: function (x) {
              return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            },
            formatSecondsAsTime: function (secs, format) {
              var hr = Math.floor(secs / 3600);
              var min = Math.floor((secs - (hr * 3600)) / 60);
              var sec = Math.floor(secs - (hr * 3600) - (min * 60));

              if (hr < 10) {
                hr = "0" + hr;
              }
              if (min < 10) {
                min = "0" + min;
              }
              if (sec < 10) {
                sec = "0" + sec;
              }

              if (format != null) {
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
              armyBar.remove(this.buttonUnlockAttack);
              var _this = this;
              setTimeout(function () {
                armyBar.add(_this.buttonUnlockAttack);
              }, 2000);
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
            calculateTroopStrength: function (battleground) {
              var total_hp = 0;
              var end_hp = 0;

              for (i in battleground.m_Entities.d) {
                var entity = battleground.m_Entities.d[i];
                if (entity.get_Entity().m_eAlignment == SharedLib.Combat.ECbtAlignment.Attacker) {
                  // This is one of the good guys
                  total_hp += entity.m_Entity.m_iHitpoints;
                  end_hp += entity.m_Entity.m_iHitpointsCurrent;
                }
              }

              return percentage = Math.floor((end_hp / total_hp) * 100);
            },
            updateTroopStrength: function (battleground) {
              var percentage = this.calculateTroopStrength(battleground);

              this.troopDamageLabel.setValue("<span style='color: black; font-weight: bold;'>Troop Strength: " + percentage.toString() + "%</span>");
            },
            bustCache: function () {
              // Bust the cache
              try {
                var own_city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
                own_city.m_CityArmyFormationsManager.m_ArmyFormations.d[own_city.m_CityArmyFormationsManager.m_CurrentTargetBaseId].CopyCityOffenseUnitsLayout();
              } catch (e) {
                console.log(e);
              }
            },
            setupBattleground: function (offense_units) {
              try {
                var mainData = ClientLib.Data.MainData.GetInstance();
                var player_cities = mainData.get_Cities();
                var current_city = player_cities.get_CurrentCity();
                var own_city = player_cities.get_CurrentOwnCity();

                localStorage.ta_sim_last_city = current_city.get_Id();

                var alliance = ClientLib.Data.MainData.GetInstance().m_Alliance;
                var combatData = (new ClientLib.Data.Combat).HGL();
                combatData.m_Version = 1;

                var unitData = own_city.m_CityUnits.m_OffenseUnits.l;
                var data = new Array();


                offense_units = offense_units || own_city.m_CityArmyFormationsManager.m_ArmyFormations.d[current_city.get_Id()];
                for (var i = 0; i < unitData.length; i++) {
                  var info = new Object();
                  info.h = unitData[i].m_CurrentHealth;
                  info.i = unitData[i].m_MdbUnitId
                  info.l = unitData[i].m_CurrentLevel
                  info.x = offense_units.m_ArmyUnits.l[i].m_CoordX
                  info.y = offense_units.m_ArmyUnits.l[i].m_CoordY
                  data.push(info);
                }

                combatData.m_Attacker = data;

                unitData = current_city.m_CityUnits.m_DefenseUnits.l;
                data = new Array();
                for (i = 0; i < unitData.length; i++) {
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
                for (var i = 0;
                (i < 9); i++) {
                  for (var j = 0;
                  (j < 8); j++) {
                    var terrainType = current_city.GetResourceType(i, (j + current_city.get_CityHeight()));
                    var unitType = -1;
                    switch (terrainType) {
                    case ClientLib.Data.ECityTerrainType.FOREST:
                      {
                        unitType = 0x7c;
                        break;
                      }
                    case ClientLib.Data.ECityTerrainType.BRIAR:
                      {
                        unitType = 0x7b;
                        break;
                      }
                    case ClientLib.Data.ECityTerrainType.SWAMP:
                      {
                        unitType = 0x7d;
                        break;
                      }
                    case ClientLib.Data.ECityTerrainType.WATER:
                      {
                        unitType = 0x7e;
                        break;
                      }
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
                combatData.m_Blocker = data;

                unitData = current_city.m_CityBuildings.m_Buildings.l;
                data = new Array();
                for (i = 0; i < unitData.length; i++) {
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
                for (var i = 0;
                (i < combatData.m_Buildings.length); i++) {
                  resourceLayout.l[combatData.m_Buildings[i].y] = 0;
                }
                combatData.m_ResourceLayout = resourceLayout;
                combatData.m_DefenderFaction = current_city.get_CityFaction();
                combatData.m_AttackerModules = this.attacker_modules;
                combatData.m_DefenderModules = this.defender_modules;

                if (((combatData.m_DefenderFaction == ClientLib.Base.EFactionType.FORFaction) || (combatData.m_DefenderFaction == ClientLib.Base.EFactionType.NPCBase)) || (combatData.m_DefenderFaction == ClientLib.Base.EFactionType.NPCCamp)) {
                  combatData.SetNPCNames();
                }
                combatData.m_MaxDuration = 120;
                combatData.m_Complete = false;
                if (combatData.m_Complete) {
                  combatData.m_Id = -1;
                }
                combatData.m_Debug = null;

                var battleground = ClientLib.Vis.VisMain.GetInstance().get_Battleground();
                battleground.Reset();
                battleground.m_CurrentReplay = combatData;
                battleground.InitBattle();
                battleground.SetCombatData(combatData);
                battleground.StartBattle();
                battleground.m_BattleDuration = (1200 * Math.floor(0x3e8 / battleground.m_SimSetup.get_SubSteps()));

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

                window.TASuite.main.getInstance().troopDamageLabel.setValue("<span style='color: black; font-weight: bold;'>Troop Strength: 100%</span>");

                try {
                  app.getPlayArea().setView(webfrontend.gui.PlayArea.PlayArea.modes.EMode_CombatReplay, current_city.get_Id(), 0, 0);
                } catch (e) {
                  app.getPlayArea().setView(webfrontend.gui.PlayArea.modes.EMode_CombatReplay, current_city.get_Id(), 0, 0);
                }
                var battleground = this.setupBattleground();

                // Add the event listeners
                battleground.m_Simulation.add_DamageDone((new System.EventHandler).HGL(this, this.onDamageDone));
                battleground.m_Simulation.add_OnDestroyDefense((new System.EventHandler).HGL(this, this.onDefenseDestroyed));

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