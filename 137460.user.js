// ==UserScript==
// @name           Tiberium Alliances Combat Simulator
// @description    Allows you to simulate combat before actually attacking.
// @namespace      https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @include        https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version        1.7.2.9
// @author         WildKatana | Updated by CodeEcho, PythEch, Matthias Fuchs, Enceladus and KRS_L
// @require        http://sizzlemctwizzle.com/updater.php?id=138212
// ==/UserScript==
(function() {
    var TASuite_mainFunction = function() {
        // New patched English servers

        function engCreateTweak() {

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
                    buttonUnlockReset: null,
                    buttonTools: null,
                    buttonCheck:null,
                    busy: null,

                    add_ViewModeChange: null,
                    add_ArmyChanged: null,

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
                    lastInfantryRepairTime: null,
                    lastVehicleRepairTime: null,
                    lastAircraftRepairTime: null,

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
                    statsPage: null,

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
                    enemySupportLevelLabel: null,
                    enemySupportStrengthLabel: null,
                    simTimeLabel: null,
                    totalSeconds: null,

                    initialize: function() {
                        this.add_ViewModeChange = (new ClientLib.Vis.ViewModeChange).LEUXCZ(this, this.onViewChange); //
                        this.add_ArmyChanged = (new $I.QUXOEF).LEUXCZ(this, this.onUnitMoved); //
                        this.buttonSimulateCombat = new qx.ui.form.Button("Simulate");
                        this.buttonSimulateCombat.set({
                            width: 58,
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
                            left: 0
                        });

                        var armyBar = qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_ATTACKSETUP);

                        this.buttonUnlockAttack = new qx.ui.form.Button("Unlock");
                        this.buttonUnlockAttack.set({
                            width: 60,
                            height: 45,
                            appearance: "button-text-small",
                            toolTipText: "Unlock Attack Button"
                        });
                        this.buttonUnlockAttack.addListener("click", this.unlockAttacks, this);
                        this.buttonUnlockAttack.setOpacity(0.5);
                        armyBar.add(this.buttonUnlockAttack, {
                            top: 103,
                            right: 0
                        });

                        this.buttonUnlockReset = new qx.ui.form.Button("Unlock");
                        this.buttonUnlockReset.set({
                            width: 60,
                            height: 45,
                            appearance: "button-text-small",
                            toolTipText: "Unlock Reset Button"
                        });
                        this.buttonUnlockReset.addListener("click", this.unlockResets, this);
                        this.buttonUnlockReset.setOpacity(0.5);
                        armyBar.add(this.buttonUnlockReset, {
                            top: 60,
                            right: 0
                        });

                        this.buttonTools = new qx.ui.form.Button("Tools");
                        this.buttonTools.set({
                            width: 58,
                            appearance: "button-text-small",
                            toolTipText: "Open Simulator Tools"
                        });
                        this.buttonTools.addListener("click", this.toggleTools, this);

                        this.buttonCheck = new qx.ui.form.Button("Check");
                        this.buttonCheck.set({
                            width:80,
                            appearance:"button-text-small",
                            toolTipText:"Open Yo"
                        });
                        this.buttonCheck.addListener("click", this.toggleCheck, this);

                        this.normalBoxus = new qx.ui.basic.Label("E04P 1000 Straussenarmeen Logbuch: ");
                        this.normalBoxus.setTextColor("red");

                        busy = false;

                        _this = this;
                        setTimeout(function() {
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
                                ClientLib.Vis.VisMain.GetInstance().add_ViewModeChange(_this.add_ViewModeChange);

                                armyBar.add(_this.normalBoxus, {
                                    top:250,
                                    left:150
                                });

                                armyBar.add(_this.buttonCheck, {
                                    top:0,
                                    right:0
                                });

                                armyBar.add(_this.buttonTools, {
                                    top: 74,
                                    right: 62
                                });
                                armyBar.add(_this.buttonSimulateCombat, {
                                    top: 112,
                                    right: 62
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

                        ////////////////// Stats ////////////////////
                        this.statsPage = new qx.ui.tabview.Page("Stats");
                        this.statsPage.setLayout(new qx.ui.layout.VBox(5));
                        this.statsPage.setPadding(1);
                        tabView.add(this.statsPage);

                        // The Enemy Vertical Box
                        var eVBox = new qx.ui.container.Composite()
                        eVBox.setLayout(new qx.ui.layout.VBox(5));
                        eVBox.setThemedFont("bold");
                        eVBox.setThemedPadding(2);
                        eVBox.setThemedBackgroundColor("#eef");
                        this.statsPage.add(eVBox);
                        // The Enemy Troop Strength Label
                        var eHBox1 = new qx.ui.container.Composite();
                        eHBox1.setLayout(new qx.ui.layout.HBox(5));
                        eHBox1.add(new qx.ui.basic.Label("Enemy Base: "));
                        this.enemyTroopStrengthLabel = new qx.ui.basic.Label("100");
                        eHBox1.add(this.enemyTroopStrengthLabel);
                        this.enemyTroopStrengthLabel.setTextColor("red");
                        eVBox.add(eHBox1);
                        // Units
                        var eHBox4 = new qx.ui.container.Composite();
                        eHBox4.setLayout(new qx.ui.layout.HBox(5));
                        eHBox4.add(new qx.ui.basic.Label("Defences: "));
                        this.enemyUnitsStrengthLabel = new qx.ui.basic.Label("100");
                        eHBox4.add(this.enemyUnitsStrengthLabel);
                        this.enemyUnitsStrengthLabel.setTextColor("green");
                        eVBox.add(eHBox4);
                        // Buildings
                        var eHBox5 = new qx.ui.container.Composite();
                        eHBox5.setLayout(new qx.ui.layout.HBox(5));
                        eHBox5.add(new qx.ui.basic.Label("Buildings: "));
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
                        eHBox3.add(new qx.ui.basic.Label("Defense Facility: "));
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
                        this.statsPage.add(tVBox);
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
                        tHBox3.add(new qx.ui.basic.Label("Vehicle: "));
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
                        this.simVictoryLabel = new qx.ui.basic.Label("Unknown");
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

                        this.statsPage.add(vBox);


                        ////////////////// Layouts ////////////////////
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
                            value: "<a target='_blank' href='http://userscripts.org/scripts/discuss/130344'>Forums</a>",
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
                    },
                    closeToolsBox: function() {
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
                    toggleTools: function() {
                        var units = this.getCityPreArmyUnits();
                        this.units = units.get_ArmyUnits().l;
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


                    //--------------------------------------------------------------------------
                    //--------------------------------------------------------------------------
                    //--------------------------------------------------------------------------
                    //--------------------------------------------------------------------------
                    //--------------------------------------------------------------------------

                    toggleCheck:function () {
                        var units = this.getCityPreArmyUnits();
                        this.units = units.get_ArmyUnits().l;

                        this.currentNumber = 0;
                        this.nOldRepairTime = 9999999999;


                        /*
                         var unitPosis = new Array();

                         for (var i = 0; (i < this.units.length); i++) {
                         var posi = this.getRandomFreePosition(unitPosis, 0);

                         this.units[i].set_CoordX(posi.x);
                         this.units[i].set_CoordY(posi.y);
                         }

                         units.DJG(); // UpdateArmyLayout$0() has been renamed to DJG()
                         units.BJG(); // RefreshData() has been renamed to BJG()
                         this.calculateLoot();
                         this.calculateSimResults();
                         this.updateStatsWindow();
                         this.saveFormation();
                         */

                        this.busy = true;
                        this.nCurIndex = 0;
                        this.nCurX = 0;
                        this.nCurY = 0;


                        var order = [];
                        for (var i = 0; i < this.units.length; i++){
                            order.push(i);
                        }

                        // Randomize the units order
                        var tmp, current, top = order.length;

                        if(top) while(--top) {
                            current = Math.floor(Math.random() * (top + 1));
                            tmp = order[current];
                            order[current] = order[top];
                            order[top] = tmp;
                        }

                        this.nOrder = order;

                        this.nOldCYPercent = 100;
                        this.nOldDFPercent = 100;
                        this.nOldEUPercent = 100;
                        this.nOldPoints = 0;

                        this.pulseCheckUnitPoint();
                    },


                    normalBoxus: null,
                    currentNumber: 0,
                    nOldCYPercent: 100,
                    n_unitList:null,
                    n_currentUnit:null,
                    nOldRepairTime: 99999999,

                    nOldDFPercent:100,
                    nOldEUPercent:100,
                    //
                    nOrder:null,
                    //
                    nCurIndex:0,
                    nCurX:0,
                    nCurY:0,
                    //
                    nOldPoints:0,


                    pulseCheckUnit:function () {
                        var units = this.getCityPreArmyUnits();
                        this.units = units.get_ArmyUnits().l;

                        if (this.nCurX < 8)
                        {
                            this.nCurX = this.nCurX + 1;
                        }
                        else
                        {
                            if (this.nCurY < 3)
                            {
                                this.nCurY = this.nCurY + 1;
                                this.nCurX = 0;
                            }
                            else
                            {
                                if (this.nCurIndex < (units.get_ArmyUnits().l.length -1))
                                {
                                    this.nCurIndex = this.nCurIndex + 1;
                                    this.nCurX = 0;
                                    this.nCurY = 0;
                                }
                                else
                                {
                                    if (Math.floor(this.nOldCYPercent) < 2)
                                        this.normalBoxus.setTextColor("green");
                                    else
                                        this.normalBoxus.setTextColor("red");

                                    this.normalBoxus.setValue("E04P 1000 Straussen-Armee: Fertig! Bauhof " + this.roundNumber(this.nOldCYPercent, 2) + "% Verteidigungseinrichtung " + this.roundNumber(this.lastDFPercentage, 2) + "% Verteidigung " + this.roundNumber(this.nOldEUPercent, 2) + "% Reperaturzeit " + this.formatSecondsAsTime(this.nOldRepairTime, "h:mm:ss"));
                                    this.busy = false;
                                    this.saveFormation();
                                    this.restoreFormation();
                                    units.CLEZCG(); // UpdateArmyLayout$0() has been renamed to CLEZCG()
                                    units.WRKUTR(); // RefreshData() has been renamed to WRKUTR()
                                    this.calculateLoot();
                                    this.calculateSimResults();
                                    this.updateStatsWindow();
                                    return;
                                }
                            }
                        }

                        if (Math.floor(this.nOldCYPercent) < 2)
                            this.normalBoxus.setTextColor("green");
                        else
                            this.normalBoxus.setTextColor("red");

                        this.normalBoxus.setValue("E04P 1000 Straussen-Armee: [" + (this.nCurIndex + 1).toString() + "/" + this.units.length.toString() + "] X " + this.nCurX.toString() + " Y " + this.nCurY.toString() + " Bauhof " + this.roundNumber(this.nOldCYPercent, 2) + "% Verteidigungseinrichtung " + this.roundNumber(this.lastDFPercentage, 2) + "% Verteidigung " + this.roundNumber(this.nOldEUPercent, 2) + "% Reperaturzeit " + this.formatSecondsAsTime(this.nOldRepairTime, "h:mm:ss"));
                        var oldUnit = null;

                        for (var i = 0; (i < this.units.length); i++) {
                            if (this.units[i].get_CoordX() == this.nCurX && this.units[i].get_CoordY() == this.nCurY)
                            {
                                oldUnit = this.units[i];
                                break;
                            }
                        }

                        var unit = this.units[this.nOrder[this.nCurIndex]];

                        var oldX = unit.get_CoordX();
                        var oldY = unit.get_CoordY();

                        this.saveFormation();

                        unit.set_CoordX(this.nCurX);
                        unit.set_CoordY(this.nCurY);

                        if (oldUnit != null)
                        {
                            oldUnit.set_CoordX(oldX);
                            oldUnit.set_CoordY(oldY);
                        }

                        var ta = window.TASuite.main.getInstance();
                        ta.calculateSimResults();

                        if (this.lastCYPercentage < this.nOldCYPercent)
                        {
                            this.saveFormation();
                        }
                        else if (this.lastCYPercentage > this.nOldCYPercent)
                        {
                            this.restoreFormation();
                        }
                        else
                        {
                            if (this.lastDFPercentage < this.nOldDFPercent)
                            {
                                this.saveFormation();
                            }
                            else if (this.lastEnemyUnitsPercentage < this.nOldEUPercent)
                            {
                                this.saveFormation();
                            }
                            else if (this.lastRepairTime < this.nOldRepairTime)
                            {
                                this.saveFormation();
                            }
                            else if (this.lastRepairTime > this.nOldRepairTime)
                            {
                                this.restoreFormation();
                            }
                        }

                        this.nOldCYPercent = this.lastCYPercentage;
                        this.nOldDFPercent = this.lastDFPercentage;
                        this.nOldEUPercent = this.lastEnemyUnitsPercentage;
                        this.nOldRepairTime = this.lastRepairTime;

                        var _this = this;
                        setTimeout(function () {
                            _this.pulseCheckUnit();
                        }, 1);
                    },

                    pulseCheckUnitPoint:function () {
                        var units = this.getCityPreArmyUnits();
                        this.units = units.get_ArmyUnits().l;

                        if (this.nCurX < 8)
                        {
                            this.nCurX = this.nCurX + 1;
                        }
                        else
                        {
                            if (this.nCurY < 3)
                            {
                                this.nCurY = this.nCurY + 1;
                                this.nCurX = 0;
                            }
                            else
                            {
                                if (this.nCurIndex < (units.get_ArmyUnits().l.length -1))
                                {
                                    this.nCurIndex = this.nCurIndex + 1;
                                    this.nCurX = 0;
                                    this.nCurY = 0;
                                }
                                else
                                {
                                    if (Math.floor(this.nOldCYPercent) < 2)
                                        this.normalBoxus.setTextColor("green");
                                    else
                                        this.normalBoxus.setTextColor("red");

                                    this.normalBoxus.setValue("E04P 1000 Straussen-Armee: Fertig! Bauhof " + this.roundNumber(this.nOldCYPercent, 2) + "% Verteidigungseinrichtung " + this.roundNumber(this.lastDFPercentage, 2) + "% Verteidigung " + this.roundNumber(this.nOldEUPercent, 2) + "% Reperaturzeit " + this.formatSecondsAsTime(this.nOldRepairTime, "h:mm:ss") + " Punkte " + this.nOldPoints);
                                    this.busy = false;
                                    this.saveFormation();
                                    this.restoreFormation();
                                    units.CLEZCG(); // UpdateArmyLayout$0() has been renamed to CLEZCG()
                                    units.WRKUTR(); // RefreshData() has been renamed to WRKUTR()
                                    this.calculateLoot();
                                    this.calculateSimResults();
                                    this.updateStatsWindow();
                                    return;
                                }
                            }
                        }

                        if (Math.floor(this.nOldCYPercent) < 2)
                            this.normalBoxus.setTextColor("green");
                        else
                            this.normalBoxus.setTextColor("red");

                        this.normalBoxus.setValue("E04P 1000 Straussen-Armee: [" + (this.nCurIndex + 1).toString() + "/" + this.units.length.toString() + "] X " + this.nCurX.toString() + " Y " + this.nCurY.toString() + " Bauhof " + this.roundNumber(this.nOldCYPercent, 2) + "% Verteidigungseinrichtung " + this.roundNumber(this.lastDFPercentage, 2) + "% Verteidigung " + this.roundNumber(this.nOldEUPercent, 2) + "% Reperaturzeit " + this.formatSecondsAsTime(this.nOldRepairTime, "h:mm:ss") + " Punkte " + this.nOldPoints);
                        var oldUnit = null;

                        for (var i = 0; (i < this.units.length); i++) {
                            if (this.units[i].get_CoordX() == this.nCurX && this.units[i].get_CoordY() == this.nCurY)
                            {
                                oldUnit = this.units[i];
                                break;
                            }
                        }

                        var unit = this.units[this.nOrder[this.nCurIndex]];

                        var oldX = unit.get_CoordX();
                        var oldY = unit.get_CoordY();

                        this.saveFormation();

                        unit.set_CoordX(this.nCurX);
                        unit.set_CoordY(this.nCurY);

                        if (oldUnit != null)
                        {
                            oldUnit.set_CoordX(oldX);
                            oldUnit.set_CoordY(oldY);
                        }

                        var ta = window.TASuite.main.getInstance();
                        ta.calculateSimResults();

                        var cur_points = 0; //

                        var cy_difference = 100 - this.lastCYPercentage;
                        cur_points = cur_points + (cy_difference * 1500); // 1500 Punkte pro Bauhof Prozent weg

                        var df_difference = 100 - this.lastDFPercentage;
                        cur_points = cur_points + (df_difference * 500); // 500 Punkte pro Verteidigungseinrichtung Prozent weg

                        var eu_difference = 100 - this.lastEnemyUnitsPercentage;
                        cur_points = cur_points + (eu_difference * 300); // 300 Punkte pro Verteidigungs Prozent weg

                        var eb_difference = 100 - this.lastEnemyBuildingsPercentage;
                        cur_points = cur_points + (eb_difference * 350); // 350 Punkte pro Gebaeude Prozent weg

                        var e_difference = 100 - this.lastEnemyBuildingsPercentage;
                        cur_points = cur_points + (e_difference * 250); // 250 Punkte pro Feind Prozent weg

                        // 240.000 Punkte wenn Bauhof auf 0% ist alles andere natürlich auch platt

                        var repairTimeDividor = this.lastRepairTime / 3600;

                        if(this.lastCYPercentage < 1)
                            cur_points = cur_points + 100000;

                        cur_points = cur_points / repairTimeDividor;

                        if (cur_points > this.nOldPoints)
                        {
                            this.nOldPoints = cur_points;
                            this.nOldCYPercent = this.lastCYPercentage;
                            this.nOldDFPercent = this.lastDFPercentage;
                            this.nOldEUPercent = this.lastEnemyUnitsPercentage;
                            this.nOldRepairTime = this.lastRepairTime;
                            this.saveFormation();
                        }
                        else
                        {
                            this.restoreFormation();
                        }

                        var _this = this;
                        setTimeout(function () {
                            _this.pulseCheckUnitPoint();
                        }, 1);
                    },

                    roundNumber:function (num, dec){
                        var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
                        return result;
                    },
                    getRandomFreePosition:function (array, _id) {
                        var pos = {};

                        while (true) {
                            pos.x = this.randomFromTo(0, 8);
                            pos.y = this.randomFromTo(0, 3);
                            pos.id = _id;

                            if (this.isPositionFree(array, pos.x, pos.y)) {
                                array.push(pos);
                                return pos;
                            }
                        }
                    },
                    isPositionFree:function (array, x, y) {
                        for (var i = 0; i < a.length; i++) {
                            if (array[i].x == x && array[i].y == y) {
                                return false;
                            }
                        }
                        return true;
                    },
                    randomFromTo:function (from, to) {
                        return Math.floor(Math.random() * (to - from + 1) + from);
                    },
                    //--------------------------------------------------------------------------
                    //--------------------------------------------------------------------------
                    //--------------------------------------------------------------------------
                    //--------------------------------------------------------------------------
                    //--------------------------------------------------------------------------




                    getCityPreArmyUnits: function() {
                        var armyBar = qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_ATTACKSETUP);
                        var units = null;
                        for (var key in armyBar) {
                            try {
                                if (armyBar[key] instanceof ClientLib.Data.CityPreArmyUnits) { // ClientLib.Data.CityPreArmyUnits renamed to $I.UIG  = $I.NSVPME *CHECKED*
                                    units = armyBar[key];
                                    break;
                                }
                            } catch (e) {

                            }
                        }

                        return units;
                    },
                    calculateLoot: function() {
                        // Adapted from the CNC Loot script: http://userscripts.org/scripts/show/135953
                        var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();
                        var num = 0;
                        var spoils = {
                            1: 0,
                            2: 0,
                            3: 0,
                            6: 0,
                            7: 0
                        };

                        if (city.get_CityBuildingsData().HWFIJH != null) { //
                            // every building
                            num = city.get_CityBuildingsData().HWFIJH.l.length; //
                            for (var j = num; --j >= 0;) {
                                var building = city.get_CityBuildingsData().HWFIJH.l[j]; //
                                //TODO: check for destroyed building
                                var mod = building.get_HitpointsPercent();
                                for (var i = building.MNNADO.rer.length; --i >= 0;) { //
                                    spoils[building.MNNADO.rer[i].t] += mod * building.MNNADO.rer[i].c; //
                                }
                            }
                        }

                        // every unit
                        if (city.get_CityUnitsData().TXDWUM != null) { //
                            num = city.get_CityUnitsData().TXDWUM.l.length; //
                            for (j = num; --j >= 0;) {
                                var unit = city.get_CityUnitsData().TXDWUM.l[j]; //
                                mod = unit.get_HitpointsPercent();
                                for (i = unit.MNNADO.rer.length; --i >= 0;) { //
                                    spoils[unit.MNNADO.rer[i].t] += mod * unit.MNNADO.rer[i].c; //
                                }
                            }
                        }

                        this.tiberiumSpoils.setLabel(this.formatNumberWithCommas(spoils[1]));
                        this.crystalSpoils.setLabel(this.formatNumberWithCommas(spoils[2]));
                        this.creditSpoils.setLabel(this.formatNumberWithCommas(spoils[3]));
                        this.researchSpoils.setLabel(this.formatNumberWithCommas(spoils[6]));
                    },
                    calculateSimResults: function() {
                        var battleground = this.setupBattleground(this.getCityPreArmyUnits());

                        // Run the simulation until it's done
                        while (battleground.DHSWQJ.OAEJMD(false)) {} // DoStep$0 was renamed to OAEJMD, m_Simulation was renamed to DHSWQJ

                        this.calculateTroopStrengths(battleground);
                    },
                    onUnitMoved: function(sender, e) {
                        if (!busy) {
                            var ta = window.TASuite.main.getInstance();
                            ta.calculateSimResults();
                            ta.updateStatsWindow();
                        }
                    },
                    onDamageDone: function(sender, e) {
                        var ta = window.TASuite.main.getInstance();
                        battleground = sender.GEZZQN.i[0].o; // DamageDone was renamed to GEZZQN
                        // For the sake of performance, only run this every 10th step
                        if (battleground.SAKGZR % 10 == 0) { // m_CurrentStep changed to SAKGZR
                            ta.calculateTroopStrengths(battleground);
                            ta.updateStatsWindow();
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
                        var i_end_hp = 0;
                        var v_end_hp = 0;
                        var a_end_hp = 0;
                        var v_total_hp = 0;
                        var a_total_hp = 0;
                        var i_total_hp = 0;
                        this.lastDFPercentage = 0;
                        this.lastCYPercentage = 0;
                        this.SupportLevel = 0;
                        this.lastSupportPercentage = 0;
                        this.lastInfantryRepairTime = 0;
                        this.lastVehicleRepairTime = 0;
                        this.lastAircraftRepairTime = 0;

                        var own_city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
                        var crd = own_city.get_CityRepairData();
                        var cud = own_city.get_CityUnitsData();
                        var repair_times = own_city.get_CityUnitsData().EDTHDX.d; // m_FullRawRepairTimeForUnitGroupTypes renamed to EDTHDX
                        var r_types = ClientLib.Base.EResourceType;

                        var entities = battleground.NNXRBC.d; // m_Entities has been renamed to NNXRBC

                        for (var i in entities) {
                            var entity = entities[i];
                            var i_entity = entity.QXYJOG; // get_Entity$0() has been removed. Propery is $I.TQL - QXYJOG
                            var a_entity = entity.GUXBBT; // ??? has been renamed to GUXBBT
                            var current_hp = i_entity.HOTKDN; // m_iHitpointsCurrent has been renamed to HOTKDN
                            var max_hp = i_entity.EUJPNP; // m_iHitpoints has been renamed to EUJPNP
                            if (a_entity.XPEHRJ == 2) { // ??? has been renamed to XPEHRJ, Attacker is 2
                                // This is one of the good guys
                                end_hp += current_hp;
                                total_hp += max_hp;
                                switch (a_entity.TRKXAB) { // movement type has been renamed to TRKXAB
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
                                    this.SupportLevel = parseInt(i_entity.m_iLevel);
                                    this.lastSupportPercentage = (current_hp / max_hp) * 100;
                                } else {
                                    switch (i_entity.XZXAQZ) { // m_MDCTypeId has been renamed to XZXAQZ
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
                        var totalOffenseHealth = 0;
                        for(var i in this.units) {
                            totalOffenseHealth += (this.units[i].get_MaxHealth()*16);
                            switch(this.units[i].get_UnitGameData_Obj().at) {
                                case ClientLib.Data.EUnitGroup.Infantry:
                                    totalInfantryHealth += (this.units[i].get_MaxHealth()*16);
                                    break;
                                case ClientLib.Data.EUnitGroup.Vehicle:
                                    totalVehicleHealth += (this.units[i].get_MaxHealth()*16);
                                    break;
                                case ClientLib.Data.EUnitGroup.Aircraft:
                                    totalAirHealth += (this.units[i].get_MaxHealth()*16);
                                    break;
                                default:
                                    alert("CombatSim: Unknown UnitType found!");
                                    break;
                            }
                        }

                        // Calculate Percentages
                        this.lastInfantryPercentage = i_total_hp ? (i_end_hp / i_total_hp) * 100 : 100;
                        this.lastVehiclePercentage = v_total_hp ? (v_end_hp / v_total_hp) * 100 : 100;
                        this.lastAirPercentage = a_total_hp ? (a_end_hp / a_total_hp) * 100 : 100;
                        this.totalSeconds = (battleground.DHSWQJ.NHMXEO * battleground.get_TimePerStep()) / 1000;

                        this.lastEnemyUnitsPercentage = (eu_end_hp / eu_total_hp) * 100;
                        this.lastEnemyBuildingsPercentage = (eb_end_hp / eb_total_hp) * 100;
                        this.lastEnemyPercentage = (e_end_hp / e_total_hp) * 100;
                        this.lastPercentage = (end_hp / total_hp) * 100;


                        // Calculate the repair time
                        crd.ConvertRepairCost = crd.JBTHHM; // ConvertRepairCost has been renamed to JBTHHM
                        this.lastInfantryRepairTime = crd.ConvertRepairCost(r_types.RepairChargeInf, repair_times[ClientLib.Data.EUnitGroup.Infantry], (1 - (i_end_hp + totalInfantryHealth - i_total_hp) / totalInfantryHealth));
                        this.lastAircraftRepairTime = crd.ConvertRepairCost(r_types.RepairChargeAir, repair_times[ClientLib.Data.EUnitGroup.Aircraft], (1 - (a_end_hp + totalAirHealth - a_total_hp) / totalAirHealth));
                        this.lastVehicleRepairTime = crd.ConvertRepairCost(r_types.RepairChargeVeh, repair_times[ClientLib.Data.EUnitGroup.Vehicle], (1 - (v_end_hp + totalVehicleHealth - v_total_hp) / totalVehicleHealth));
                        this.lastRepairTime = Math.max(this.lastVehicleRepairTime, this.lastAircraftRepairTime, this.lastInfantryRepairTime);

                    },
                    setLabelColor: function(obj, val, dir) {
                        var colors = ['black', 'blue', 'green', 'red'];
                        var color = colors[0];
                        var v = val;
                        if (dir >= 0) v = 100.0 - v;
                        if (v > 99.99) color = colors[3];
                        else if (v > 50) color = colors[2];
                        else if (v > 0) color = colors[1];
                        obj.setTextColor(color);
                    },
                    updateLabel100: function(obj, val, dir) {
                        this.setLabelColor(obj, val, dir);
                        obj.setValue(val.toFixed(2).toString());
                    },
                    updateLabel100time: function(obj, val, dir, time) {
                        var s = val.toFixed(2).toString() + " @ ";
                        s += this.formatSecondsAsTime(time, "h:mm:ss");
                        this.setLabelColor(obj, val, dir);
                        obj.setValue(s);
                    },
                    updateStatsWindow: function() {
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
                        this.updateLabel100(this.enemyTroopStrengthLabel, this.lastEnemyPercentage, -1);
                        this.updateLabel100(this.enemyUnitsStrengthLabel, this.lastEnemyUnitsPercentage, -1);
                        this.updateLabel100(this.enemyBuildingsStrengthLabel, this.lastEnemyBuildingsPercentage, -1);
                        this.updateLabel100(this.CYTroopStrengthLabel, this.lastCYPercentage, -1);
                        this.updateLabel100(this.DFTroopStrengthLabel, this.lastDFPercentage, -1);
                        // -SUPPORT
                        var SLabel = (this.SupportLevel > 0) ? this.SupportLevel.toString() : '--';
                        this.enemySupportLevelLabel.setValue('Suport lvl ' + SLabel + ': ');
                        this.updateLabel100(this.enemySupportStrengthLabel, this.lastSupportPercentage, -1);
                        // ATTACKER
                        this.setLabelColor(this.simRepairTimeLabel, this.lastRepairTime / 14400.0, -1); //max is 4h
                        this.simRepairTimeLabel.setValue(this.formatSecondsAsTime(this.lastRepairTime, "h:mm:ss"));
                        // OVERALL
                        this.updateLabel100(this.simTroopDamageLabel, this.lastPercentage, 1);
                        // INF
                        this.updateLabel100time(this.infantryTroopStrengthLabel, this.lastInfantryPercentage, 1, this.lastInfantryRepairTime);
                        // VEH
                        this.updateLabel100time(this.vehicleTroopStrengthLabel, this.lastVehiclePercentage, 1, this.lastVehicleRepairTime);
                        // AIR
                        this.updateLabel100time(this.airTroopStrengthLabel, this.lastAirPercentage, 1, this.lastAircraftRepairTime);
                        // BATTLE TIME
                        this.setLabelColor(this.simTimeLabel, this.totalSeconds / 120.0, -1); //max is 120s
                        this.simTimeLabel.setValue(this.totalSeconds.toFixed(2).toString());
                    },
                    formatNumberWithCommas: function(x) {
                        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    },
                    formatSecondsAsTime: function(secs, format) {
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
                    unlockAttacks: function() {
                        var armyBar = qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_ATTACKSETUP);
                        armyBar.remove(this.buttonUnlockAttack);
                        var _this = this;
                        setTimeout(function() {
                            armyBar.add(_this.buttonUnlockAttack);
                        }, 2000);
                    },
                    unlockResets: function() {
                        var armyBar = qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_ATTACKSETUP);
                        armyBar.remove(this.buttonUnlockReset);
                        var _this = this;
                        setTimeout(function() {
                            armyBar.add(_this.buttonUnlockReset);
                        }, 2000);
                    },
                    onViewChange: function(oldMode, newMode) {
                        try {
                            if (oldMode == webfrontend.gui.PlayArea.PlayArea.modes.EMode_CombatSetupDefense && newMode == webfrontend.gui.PlayArea.PlayArea.modes.EMode_PlayerOffense) {
                                // Actually we are doing this when we press the Simulate button instead for now
                                // Switched from Combat Setup to the Simulation, show the stats box
                                //this.battleResultsBox.open();
                                //var battleground = ClientLib.Vis.VisMain.GetInstance().get_Battleground();
                                //this.calculateTroopStrengths(battleground);
                                //this.updateStatsWindow();
                            } else {
                                // Close the stats box
                                this.battleResultsBox.close();
                            }
                        } catch (e) {
                            console.log(e);
                        }
                    },
                    returnSetup: function() {
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
                    setupBattleground: function(offense_units) {
                        try {
                            var mainData = ClientLib.Data.MainData.GetInstance();
                            var player_cities = mainData.get_Cities();
                            var current_city = player_cities.get_CurrentCity();
                            var own_city = player_cities.get_CurrentOwnCity();

                            // Bust the cache
                            //own_city.get_CityArmyFormationsManager().ZJG.d[own_city.get_CityArmyFormationsManager().XJG].UpdateFormation();

                            localStorage.ta_sim_last_city = current_city.get_Id();

                            var alliance = ClientLib.Data.MainData.GetInstance().get_Alliance();
                            var combatData = (new ClientLib.Data.Combat).$ctor();
                            //var combatData = (new $I.CM).QB();
                            combatData.MCXRNN = 1; // Version is MCXRNN

                            var unitData = own_city.get_CityUnitsData().YDBIOO().l; // Attacker Units renamed to YDBIOO
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

                            unitData = current_city.get_CityUnitsData().TXDWUM.l; // Defender Units renamed to TXDWUM
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

                            combatData.YDPGXU = data; // Terrain renamed to YDPGXU

                            unitData = current_city.get_CityBuildingsData().HWFIJH.l; // City Buildings renamed to HWFIJH
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
                            combatData.m_BoostDefense = current_city.m_AllianceDefenseBonus ? current_city.m_AllianceDefenseBonus : 0; // This might not be working
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

                            if (((combatData.m_DefenderFaction == ClientLib.Base.EFactionType.FORFaction) || (combatData.m_DefenderFaction == ClientLib.Base.EFactionType.NPCBase)) || (combatData.m_DefenderFaction == ClientLib.Base.EFactionType.NPCCamp)) {
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
                    startSimulation: function() {
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

                            // Add the event listeners
                            battleground.DHSWQJ.FCPPDZ((new $I.QUXOEF).LEUXCZ(this, this.onDamageDone)); // m_Simulation became DHSWQJ, The add_DamageDone$0 has been renamed to FCPPDZ, System.EventHandler.$ctor was renamed to $I.QUXOEF.LEUXCZ

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
                    updateLayoutsList: function() {
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
                    deleteCityLayout: function() {
                        try {
                            var layouts = this.loadLayouts();
                            var current_city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity().get_Id();
                            var own_city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity().get_Id();
                            var lid = this.layoutsList.getSelection()[0].getModel();
                            if (layouts && typeof layouts[current_city] != 'undefined' && typeof layouts[current_city][own_city] != 'undefined' && typeof layouts[current_city][own_city][lid] != 'undefined') {
                                delete layouts[current_city][own_city][lid];
                                this.saveLayouts(layouts);
                                this.updateLayoutsList();
                            }
                        } catch (e) {
                            console.log(e);
                        }
                    },
                    loadCityLayout: function() {
                        try {
                            var city_layouts = this.loadCityLayouts();
                            var lid = this.layoutsList.getSelection()[0].getModel();
                            if (city_layouts && typeof city_layouts[lid] != 'undefined') {
                                // Load the selected city layout
                                var saved_units = city_layouts[lid].layout;
                                this.restoreFormation(saved_units);
                            }
                        } catch (e) {
                            console.log(e);
                        }
                    },
                    saveCityLayout: function() {
                        try {
                            // Save the current layout for this city
                            var current_city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity().get_Id();
                            var own_city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity().get_Id();
                            var layouts = this.loadLayouts();
                            this.saveFormation();
                            var lid = new Date().getTime().toString();
                            var title = this.layoutsLabelText.getValue();
                            if (!title) {
                                return;
                            }
                            title += " (TS: " + this.lastPercentage.toFixed(2).toString() + ")";
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
                    loadLayouts: function() {
                        var temp = localStorage.tasim_layouts;
                        if (temp) {
                            return JSON.parse(temp);
                        }
                        return {};
                    },
                    loadCityLayouts: function() {
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
                    saveLayouts: function(layouts) {
                        // TODO - Remove cities that are no longer existing
                        localStorage.tasim_layouts = JSON.stringify(layouts);
                    },
                    restoreFormation: function(saved_units) {
                        saved_units = saved_units || this.saved_units;
                        var units = this.getCityPreArmyUnits();
                        var units_list = units.get_ArmyUnits().l;
                        for (var i = 0;
                             (i < units_list.length); i++) {
                            var saved_unit = saved_units[i];
                            units_list[i].set_CoordX(saved_unit.x);
                            units_list[i].set_CoordY(saved_unit.y);
                            units_list[i].QFBEOT = saved_unit.id; // m_UnitId renamed to QFBEOT
                        }

                        units.CLEZCG(); // UpdateArmyLayout$0() has been renamed to CLEZCG()
                        units.WRKUTR(); // RefreshData() has been renamed to WRKUTR()
                    },
                    saveFormation: function() {
                        this.saved_units = [];
                        for (var i = 0;
                             (i < this.units.length); i++) {
                            var unit = this.units[i];
                            var armyUnit = {};
                            armyUnit.x = unit.get_CoordX();
                            armyUnit.y = unit.get_CoordY();
                            armyUnit.id = unit.get_Id();
                            this.saved_units.push(armyUnit);
                        }
                    }
                }
            });
        }

        // Patched servers
        function newCreateTweak() {
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
                    buttonUnlockReset: null,
                    buttonTools: null,
                    busy: null,

                    add_ViewModeChange: null,
                    add_ArmyChanged: null,

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
                    lastInfantryRepairTime: null,
                    lastVehicleRepairTime: null,
                    lastAircraftRepairTime: null,

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
                    statsPage: null,

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
                    enemySupportLevelLabel: null,
                    enemySupportStrengthLabel: null,
                    simTimeLabel: null,
                    totalSeconds: null,

                    initialize: function() {
                        this.add_ViewModeChange = (new ClientLib.Vis.ViewModeChange).EJYJNU(this, this.onViewChange); //
                        this.add_ArmyChanged = (new $I.UMBJYW).EJYJNU(this, this.onUnitMoved); //
                        this.buttonSimulateCombat = new qx.ui.form.Button("Simulate");
                        this.buttonSimulateCombat.set({
                            width: 58,
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
                            left: 0
                        });

                        var armyBar = qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_ATTACKSETUP);

                        this.buttonUnlockAttack = new qx.ui.form.Button("Unlock");
                        this.buttonUnlockAttack.set({
                            width: 60,
                            height: 45,
                            appearance: "button-text-small",
                            toolTipText: "Unlock Attack Button"
                        });
                        this.buttonUnlockAttack.addListener("click", this.unlockAttacks, this);
                        this.buttonUnlockAttack.setOpacity(0.5);
                        armyBar.add(this.buttonUnlockAttack, {
                            top: 103,
                            right: 0
                        });

                        this.buttonUnlockReset = new qx.ui.form.Button("Unlock");
                        this.buttonUnlockReset.set({
                            width: 60,
                            height: 45,
                            appearance: "button-text-small",
                            toolTipText: "Unlock Reset Button"
                        });
                        this.buttonUnlockReset.addListener("click", this.unlockResets, this);
                        this.buttonUnlockReset.setOpacity(0.5);
                        armyBar.add(this.buttonUnlockReset, {
                            top: 60,
                            right: 0
                        });

                        this.buttonTools = new qx.ui.form.Button("Tools");
                        this.buttonTools.set({
                            width: 58,
                            appearance: "button-text-small",
                            toolTipText: "Open Simulator Tools"
                        });
                        this.buttonTools.addListener("click", this.toggleTools, this);

                        busy = false;

                        _this = this;
                        setTimeout(function() {
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

                                for (var i in g.NQWCNO.units) { //
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
                                ClientLib.Vis.VisMain.GetInstance().add_ViewModeChange(_this.add_ViewModeChange);

                                armyBar.add(_this.buttonTools, {
                                    top: 74,
                                    right: 62
                                });
                                armyBar.add(_this.buttonSimulateCombat, {
                                    top: 112,
                                    right: 62
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

                        ////////////////// Stats ////////////////////
                        this.statsPage = new qx.ui.tabview.Page("Stats");
                        this.statsPage.setLayout(new qx.ui.layout.VBox(5));
                        this.statsPage.setPadding(1);
                        tabView.add(this.statsPage);

                        // The Enemy Vertical Box
                        var eVBox = new qx.ui.container.Composite()
                        eVBox.setLayout(new qx.ui.layout.VBox(5));
                        eVBox.setThemedFont("bold");
                        eVBox.setThemedPadding(2);
                        eVBox.setThemedBackgroundColor("#eef");
                        this.statsPage.add(eVBox);
                        // The Enemy Troop Strength Label
                        var eHBox1 = new qx.ui.container.Composite();
                        eHBox1.setLayout(new qx.ui.layout.HBox(5));
                        eHBox1.add(new qx.ui.basic.Label("Enemy Base: "));
                        this.enemyTroopStrengthLabel = new qx.ui.basic.Label("100");
                        eHBox1.add(this.enemyTroopStrengthLabel);
                        this.enemyTroopStrengthLabel.setTextColor("red");
                        eVBox.add(eHBox1);
                        // Units
                        var eHBox4 = new qx.ui.container.Composite();
                        eHBox4.setLayout(new qx.ui.layout.HBox(5));
                        eHBox4.add(new qx.ui.basic.Label("Defences: "));
                        this.enemyUnitsStrengthLabel = new qx.ui.basic.Label("100");
                        eHBox4.add(this.enemyUnitsStrengthLabel);
                        this.enemyUnitsStrengthLabel.setTextColor("green");
                        eVBox.add(eHBox4);
                        // Buildings
                        var eHBox5 = new qx.ui.container.Composite();
                        eHBox5.setLayout(new qx.ui.layout.HBox(5));
                        eHBox5.add(new qx.ui.basic.Label("Buildings: "));
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
                        eHBox3.add(new qx.ui.basic.Label("Defense Facility: "));
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
                        this.statsPage.add(tVBox);
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
                        tHBox3.add(new qx.ui.basic.Label("Vehicle: "));
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
                        this.simVictoryLabel = new qx.ui.basic.Label("Unknown");
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

                        this.statsPage.add(vBox);


                        ////////////////// Layouts ////////////////////
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
                            value: "<a target='_blank' href='http://userscripts.org/scripts/discuss/130344'>Forums</a>",
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
                    },
                    closeToolsBox: function() {
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
                    toggleTools: function() {
                        var units = this.getCityPreArmyUnits();
                        this.units = units.get_ArmyUnits().l;
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
                    getCityPreArmyUnits: function() {
                        var armyBar = qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_ATTACKSETUP);
                        var units = null;
                        for (var key in armyBar) {
                            try {
                                if (armyBar[key] instanceof ClientLib.Data.CityPreArmyUnits) { // ClientLib.Data.CityPreArmyUnits renamed to $I.UIG  = $I.NSVPME *CHECKED*
                                    units = armyBar[key];
                                    break;
                                }
                            } catch (e) {

                            }
                        }

                        return units;
                    },
                    calculateLoot: function() {
                        // Adapted from the CNC Loot script: http://userscripts.org/scripts/show/135953
                        var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();
                        var num = 0;
                        var spoils = {
                            1: 0,
                            2: 0,
                            3: 0,
                            6: 0,
                            7: 0
                        };

                        if (city.get_CityBuildingsData().RKLPXW != null) { //
                            // every building
                            num = city.get_CityBuildingsData().RKLPXW.l.length; //
                            for (var j = num; --j >= 0;) {
                                var building = city.get_CityBuildingsData().RKLPXW.l[j]; //
                                //TODO: check for destroyed building
                                var mod = building.get_HitpointsPercent();
                                for (var i = building.YUQEXG.rer.length; --i >= 0;) { //
                                    spoils[building.YUQEXG.rer[i].t] += mod * building.YUQEXG.rer[i].c; //
                                }
                            }
                        }

                        // every unit
                        if (city.get_CityUnitsData().QNYAIE != null) { //
                            num = city.get_CityUnitsData().QNYAIE.l.length; //
                            for (j = num; --j >= 0;) {
                                var unit = city.get_CityUnitsData().QNYAIE.l[j]; //
                                mod = unit.get_HitpointsPercent();
                                for (i = unit.YUQEXG.rer.length; --i >= 0;) { //
                                    spoils[unit.YUQEXG.rer[i].t] += mod * unit.YUQEXG.rer[i].c; //
                                }
                            }
                        }

                        this.tiberiumSpoils.setLabel(this.formatNumberWithCommas(spoils[1]));
                        this.crystalSpoils.setLabel(this.formatNumberWithCommas(spoils[2]));
                        this.creditSpoils.setLabel(this.formatNumberWithCommas(spoils[3]));
                        this.researchSpoils.setLabel(this.formatNumberWithCommas(spoils[6]));
                    },
                    calculateSimResults: function() {
                        var battleground = this.setupBattleground(this.getCityPreArmyUnits());

                        // Run the simulation until it's done
                        while (battleground.LCZLRE.PFKXLZ(false)) {} // DoStep$0 was renamed to PFKXLZ, m_Simulation was renamed to LCZLRE

                        this.calculateTroopStrengths(battleground);
                    },
                    onUnitMoved: function(sender, e) {
                        if (!busy) {
                            var ta = window.TASuite.main.getInstance();
                            ta.calculateSimResults();
                            ta.updateStatsWindow();
                        }
                    },
                    onDamageDone: function(sender, e) {
                        var ta = window.TASuite.main.getInstance();
                        battleground = sender.VKIDTE.i[0].o; // DamageDone was renamed to VKIDTE
                        // For the sake of performance, only run this every 10th step
                        if (battleground.JLHUNA % 10 == 0) { // m_CurrentStep changed to JLHUNA
                            ta.calculateTroopStrengths(battleground);
                            ta.updateStatsWindow();
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
                        var i_end_hp = 0;
                        var v_end_hp = 0;
                        var a_end_hp = 0;
                        var v_total_hp = 0;
                        var a_total_hp = 0;
                        var i_total_hp = 0;
                        this.lastDFPercentage = 0;
                        this.lastCYPercentage = 0;
                        this.SupportLevel = 0;
                        this.lastSupportPercentage = 0;
                        this.lastInfantryRepairTime = 0;
                        this.lastVehicleRepairTime = 0;
                        this.lastAircraftRepairTime = 0;

                        var own_city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
                        var crd = own_city.get_CityRepairData();
                        var cud = own_city.get_CityUnitsData();
                        var repair_times = own_city.get_CityUnitsData().OLGZRY.d; // m_FullRawRepairTimeForUnitGroupTypes renamed to OLGZRY
                        var r_types = ClientLib.Base.EResourceType;

                        var entities = battleground.XYXNRM.d; // m_Entities has been renamed to XYXNRM

                        for (var i in entities) {
                            var entity = entities[i];
                            var i_entity = entity.OSWGOC; // get_Entity$0() has been removed. Propery is $I.TQL - OSWGOC
                            var a_entity = entity.UWWDAL; // ??? has been renamed to UWWDAL
                            var current_hp = i_entity.HUBIOH; // m_iHitpointsCurrent has been renamed to HUBIOH
                            var max_hp = i_entity.HINQGT; // m_iHitpoints has been renamed to HINQGT
                            if (a_entity.SZZYDF == 2) { // ??? has been renamed to SZZYDF, Attacker is 2
                                // This is one of the good guys
                                end_hp += current_hp;
                                total_hp += max_hp;
                                switch (a_entity.KMPXPC) { // movement type has been renamed to KMPXPC
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

                                if (i_entity.CJZMJZ >= 200 && i_entity.CJZMJZ <= 205) {
                                    this.SupportLevel = parseInt(i_entity.m_iLevel);
                                    this.lastSupportPercentage = (current_hp / max_hp) * 100;
                                } else {
                                    switch (i_entity.CJZMJZ) { // m_MDCTypeId has been renamed to CJZMJZ
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

                                switch (a_entity.KMPXPC) {
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
                        var totalOffenseHealth = 0;
                        for(var i in this.units) {
                            totalOffenseHealth += (this.units[i].get_MaxHealth()*16);
                            switch(this.units[i].get_UnitGameData_Obj().at) {
                                case ClientLib.Data.EUnitGroup.Infantry:
                                    totalInfantryHealth += (this.units[i].get_MaxHealth()*16);
                                    break;
                                case ClientLib.Data.EUnitGroup.Vehicle:
                                    totalVehicleHealth += (this.units[i].get_MaxHealth()*16);
                                    break;
                                case ClientLib.Data.EUnitGroup.Aircraft:
                                    totalAirHealth += (this.units[i].get_MaxHealth()*16);
                                    break;
                                default:
                                    alert("CombatSim: Unknown UnitType found!");
                                    break;
                            }
                        }

                        // Calculate Percentages
                        this.lastInfantryPercentage = i_total_hp ? (i_end_hp / i_total_hp) * 100 : 100;
                        this.lastVehiclePercentage = v_total_hp ? (v_end_hp / v_total_hp) * 100 : 100;
                        this.lastAirPercentage = a_total_hp ? (a_end_hp / a_total_hp) * 100 : 100;
                        this.totalSeconds = (battleground.LCZLRE.UAEITX * battleground.get_TimePerStep()) / 1000;

                        this.lastEnemyUnitsPercentage = (eu_end_hp / eu_total_hp) * 100;
                        this.lastEnemyBuildingsPercentage = (eb_end_hp / eb_total_hp) * 100;
                        this.lastEnemyPercentage = (e_end_hp / e_total_hp) * 100;
                        this.lastPercentage = (end_hp / total_hp) * 100;


                        // Calculate the repair time
                        crd.ConvertRepairCost = crd.RSRLVE; // ConvertRepairCost has been renamed to RSRLVE
                        this.lastInfantryRepairTime = crd.ConvertRepairCost(r_types.RepairChargeInf, repair_times[ClientLib.Data.EUnitGroup.Infantry], (1 - (i_end_hp + totalInfantryHealth - i_total_hp) / totalInfantryHealth));
                        this.lastAircraftRepairTime = crd.ConvertRepairCost(r_types.RepairChargeAir, repair_times[ClientLib.Data.EUnitGroup.Aircraft], (1 - (a_end_hp + totalAirHealth - a_total_hp) / totalAirHealth));
                        this.lastVehicleRepairTime = crd.ConvertRepairCost(r_types.RepairChargeVeh, repair_times[ClientLib.Data.EUnitGroup.Vehicle], (1 - (v_end_hp + totalVehicleHealth - v_total_hp) / totalVehicleHealth));
                        this.lastRepairTime = Math.max(this.lastVehicleRepairTime, this.lastAircraftRepairTime, this.lastInfantryRepairTime);

                    },
                    setLabelColor: function(obj, val, dir) {
                        var colors = ['black', 'blue', 'green', 'red'];
                        var color = colors[0];
                        var v = val;
                        if (dir >= 0) v = 100.0 - v;
                        if (v > 99.99) color = colors[3];
                        else if (v > 50) color = colors[2];
                        else if (v > 0) color = colors[1];
                        obj.setTextColor(color);
                    },
                    updateLabel100: function(obj, val, dir) {
                        this.setLabelColor(obj, val, dir);
                        obj.setValue(val.toFixed(2).toString());
                    },
                    updateLabel100time: function(obj, val, dir, time) {
                        var s = val.toFixed(2).toString() + " @ ";
                        s += this.formatSecondsAsTime(time, "h:mm:ss");
                        this.setLabelColor(obj, val, dir);
                        obj.setValue(s);
                    },
                    updateStatsWindow: function() {
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
                        this.updateLabel100(this.enemyTroopStrengthLabel, this.lastEnemyPercentage, -1);
                        this.updateLabel100(this.enemyUnitsStrengthLabel, this.lastEnemyUnitsPercentage, -1);
                        this.updateLabel100(this.enemyBuildingsStrengthLabel, this.lastEnemyBuildingsPercentage, -1);
                        this.updateLabel100(this.CYTroopStrengthLabel, this.lastCYPercentage, -1);
                        this.updateLabel100(this.DFTroopStrengthLabel, this.lastDFPercentage, -1);
                        // -SUPPORT
                        var SLabel = (this.SupportLevel > 0) ? this.SupportLevel.toString() : '--';
                        this.enemySupportLevelLabel.setValue('Suport lvl ' + SLabel + ': ');
                        this.updateLabel100(this.enemySupportStrengthLabel, this.lastSupportPercentage, -1);
                        // ATTACKER
                        this.setLabelColor(this.simRepairTimeLabel, this.lastRepairTime / 14400.0, -1); //max is 4h
                        this.simRepairTimeLabel.setValue(this.formatSecondsAsTime(this.lastRepairTime, "h:mm:ss"));
                        // OVERALL
                        this.updateLabel100(this.simTroopDamageLabel, this.lastPercentage, 1);
                        // INF
                        this.updateLabel100time(this.infantryTroopStrengthLabel, this.lastInfantryPercentage, 1, this.lastInfantryRepairTime);
                        // VEH
                        this.updateLabel100time(this.vehicleTroopStrengthLabel, this.lastVehiclePercentage, 1, this.lastVehicleRepairTime);
                        // AIR
                        this.updateLabel100time(this.airTroopStrengthLabel, this.lastAirPercentage, 1, this.lastAircraftRepairTime);
                        // BATTLE TIME
                        this.setLabelColor(this.simTimeLabel, this.totalSeconds / 120.0, -1); //max is 120s
                        this.simTimeLabel.setValue(this.totalSeconds.toFixed(2).toString());
                    },
                    formatNumberWithCommas: function(x) {
                        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    },
                    formatSecondsAsTime: function(secs, format) {
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
                    unlockAttacks: function() {
                        var armyBar = qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_ATTACKSETUP);
                        armyBar.remove(this.buttonUnlockAttack);
                        var _this = this;
                        setTimeout(function() {
                            armyBar.add(_this.buttonUnlockAttack);
                        }, 2000);
                    },
                    unlockResets: function() {
                        var armyBar = qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_ATTACKSETUP);
                        armyBar.remove(this.buttonUnlockReset);
                        var _this = this;
                        setTimeout(function() {
                            armyBar.add(_this.buttonUnlockReset);
                        }, 2000);
                    },
                    onViewChange: function(oldMode, newMode) {
                        try {
                            if (oldMode == webfrontend.gui.PlayArea.PlayArea.modes.EMode_CombatSetupDefense && newMode == webfrontend.gui.PlayArea.PlayArea.modes.EMode_PlayerOffense) {
                                // Actually we are doing this when we press the Simulate button instead for now
                                // Switched from Combat Setup to the Simulation, show the stats box
                                //this.battleResultsBox.open();
                                //var battleground = ClientLib.Vis.VisMain.GetInstance().get_Battleground();
                                //this.calculateTroopStrengths(battleground);
                                //this.updateStatsWindow();
                            } else {
                                // Close the stats box
                                this.battleResultsBox.close();
                            }
                        } catch (e) {
                            console.log(e);
                        }
                    },
                    returnSetup: function() {
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
                    setupBattleground: function(offense_units) {
                        try {
                            var mainData = ClientLib.Data.MainData.GetInstance();
                            var player_cities = mainData.get_Cities();
                            var current_city = player_cities.get_CurrentCity();
                            var own_city = player_cities.get_CurrentOwnCity();

                            // Bust the cache
                            //own_city.get_CityArmyFormationsManager().ZJG.d[own_city.get_CityArmyFormationsManager().XJG].UpdateFormation();

                            localStorage.ta_sim_last_city = current_city.get_Id();

                            var alliance = ClientLib.Data.MainData.GetInstance().get_Alliance();
                            var combatData = (new ClientLib.Data.Combat).$ctor();
                            //var combatData = (new $I.CM).QB();
                            combatData.XNEZHM = 1; // Version is XNEZHM

                            var unitData = own_city.get_CityUnitsData().HUQOMM().l; // Attacker Units renamed to HUQOMM
                            if (offense_units) {
                                offense_units = offense_units.OWFYBS.l;
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

                            combatData.DGGKMA = data; // Attackers renamed to DGGKMA

                            unitData = current_city.get_CityUnitsData().QNYAIE.l; // Defender Units renamed to QNYAIE
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
                            combatData.NLWXQK = data; // Defenders renamed to NLWXQK

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

                            combatData.JHDFIO = data; // Terrain renamed to JHDFIO

                            unitData = current_city.get_CityBuildingsData().RKLPXW.l; // City Buildings renamed to RKLPXW
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

                            combatData.RDRJHU = data; // Buildings renamed to RDRJHU

                            combatData.GPYKVU = null; // Support Structures renamed to GPYKVU
                            combatData.SSBLMM = 8696244; // Start Step - this is just a random number - renamed to SSBLMM
                            combatData.m_CombatSteps = 1;
                            combatData.m_BoostInfantry = alliance.get_POIInfantryBonus();
                            combatData.m_BoostVehicle = alliance.get_POIVehicleBonus();
                            combatData.m_BoostAir = alliance.get_POIAirBonus();
                            combatData.m_BoostDefense = current_city.m_AllianceDefenseBonus ? current_city.m_AllianceDefenseBonus : 0; // This might not be working
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

                            if (((combatData.m_DefenderFaction == ClientLib.Base.EFactionType.FORFaction) || (combatData.m_DefenderFaction == ClientLib.Base.EFactionType.NPCBase)) || (combatData.m_DefenderFaction == ClientLib.Base.EFactionType.NPCCamp)) {
                                combatData.LIWQQL(); // This might not be needed
                            }

                            combatData.m_MaxDuration = 120;
                            combatData.m_Complete = false;
                            combatData.CDVCPZ = null; // Debug renamed to CDVCPZ

                            var battleground = ClientLib.Vis.VisMain.GetInstance().get_Battleground();
                            battleground.Reset();
                            battleground.YJNZGC = combatData; // m_currentreplay
                            battleground.InitBattle();
                            battleground.HFKAEQ(combatData); // Set combat data
                            battleground.StartBattle();

                            return battleground;
                        } catch (e) {
                            console.log(e);
                        }
                    },
                    startSimulation: function() {
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

                            // Add the event listeners
                            battleground.LCZLRE.GAVKTB((new $I.UMBJYW).EJYJNU(this, this.onDamageDone)); // m_Simulation became LCZLRE, The add_DamageDone$0 has been renamed to GAVKTB, System.EventHandler.$ctor was renamed to $I.UMBJYW.EJYJNU

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
                    updateLayoutsList: function() {
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
                    deleteCityLayout: function() {
                        try {
                            var layouts = this.loadLayouts();
                            var current_city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity().get_Id();
                            var own_city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity().get_Id();
                            var lid = this.layoutsList.getSelection()[0].getModel();
                            if (layouts && typeof layouts[current_city] != 'undefined' && typeof layouts[current_city][own_city] != 'undefined' && typeof layouts[current_city][own_city][lid] != 'undefined') {
                                delete layouts[current_city][own_city][lid];
                                this.saveLayouts(layouts);
                                this.updateLayoutsList();
                            }
                        } catch (e) {
                            console.log(e);
                        }
                    },
                    loadCityLayout: function() {
                        try {
                            var city_layouts = this.loadCityLayouts();
                            var lid = this.layoutsList.getSelection()[0].getModel();
                            if (city_layouts && typeof city_layouts[lid] != 'undefined') {
                                // Load the selected city layout
                                var saved_units = city_layouts[lid].layout;
                                this.restoreFormation(saved_units);
                            }
                        } catch (e) {
                            console.log(e);
                        }
                    },
                    saveCityLayout: function() {
                        try {
                            // Save the current layout for this city
                            var current_city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity().get_Id();
                            var own_city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity().get_Id();
                            var layouts = this.loadLayouts();
                            this.saveFormation();
                            var lid = new Date().getTime().toString();
                            var title = this.layoutsLabelText.getValue();
                            if (!title) {
                                return;
                            }
                            title += " (TS: " + this.lastPercentage.toFixed(2).toString() + ")";
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
                    loadLayouts: function() {
                        var temp = localStorage.tasim_layouts;
                        if (temp) {
                            return JSON.parse(temp);
                        }
                        return {};
                    },
                    loadCityLayouts: function() {
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
                    saveLayouts: function(layouts) {
                        // TODO - Remove cities that are no longer existing
                        localStorage.tasim_layouts = JSON.stringify(layouts);
                    },
                    restoreFormation: function(saved_units) {
                        saved_units = saved_units || this.saved_units;
                        var units = this.getCityPreArmyUnits();
                        var units_list = units.get_ArmyUnits().l;
                        for (var i = 0;
                             (i < units_list.length); i++) {
                            var saved_unit = saved_units[i];
                            units_list[i].set_CoordX(saved_unit.x);
                            units_list[i].set_CoordY(saved_unit.y);
                            units_list[i].JMLCXC = saved_unit.id; // m_UnitId renamed to JMLCXC
                        }

                        units.KUCJBR(); // UpdateArmyLayout$0() has been renamed to KUCJBR()
                        units.RKBGVA(); // RefreshData() has been renamed to RKBGVA()
                    },
                    saveFormation: function() {
                        this.saved_units = [];
                        for (var i = 0;
                             (i < this.units.length); i++) {
                            var unit = this.units[i];
                            var armyUnit = {};
                            armyUnit.x = unit.get_CoordX();
                            armyUnit.y = unit.get_CoordY();
                            armyUnit.id = unit.get_Id();
                            this.saved_units.push(armyUnit);
                        }
                    }
                }
            });
        }

        // Unpatched servers
        function oldCreateTweak() {}

        function TASuite_checkIfLoaded() {
            try {
                if (typeof qx != 'undefined') {
                    a = qx.core.Init.getApplication(); // application
                    mb = qx.core.Init.getApplication().getMenuBar();
                    if (a && mb && typeof PerforceChangelist != 'undefined') {
                        if (PerforceChangelist == 364597) {
                            engCreateTweak();
                        } else if (PerforceChangelist == 363782) {
                            newCreateTweak();
                        } else if (PerforceChangelist == 361439) {
                            oldCreateTweak();
                        } else {
                            alert("C&C TA Simulator:\r\nUnsupported Version:" + PerforceChangelist);
                        }
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