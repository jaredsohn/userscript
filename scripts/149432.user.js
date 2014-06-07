// ==UserScript==
// @name           C&C Tiberium Alliances Combat Simulator
// @description    Allows you to simulate combat before actually attacking.
// @namespace      http://userscripts.org/scripts/show/145717
// @include        https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version        2.0
// @author         Quor | WildKatana | Updated by CodeEcho, PythEch, Matthias Fuchs, Enceladus, KRS_L, TheLuminary, Panavia2, Da Xue
// @require        http://sizzlemctwizzle.com/updater.php?id=145717
// ==/UserScript==

webfrontend = unsafeWindow["webfrontend"];
qx = unsafeWindow["qx"];
ClientLib = unsafeWindow["ClientLib"];

var buttons = {
	attack: {
		layout: {
			save: null, // buttonLayoutSave
			load: null, // buttonLayoutLoad
			deletef: null, // buttonLayoutDelete
		},
		simulate: null, // buttonSimulateCombat
		unlock: null, // buttonUnlockAttack
		unlockReset: null, // buttonUnlockReset
		tools: null, // buttonTools
	},
	simulate: {
		back: null // buttonReturnSetup
	}
}

var stats = {
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
	},
	time: null,
    supportlvl: null
}

var labels = {
	health: {
		infantry: null, // infantryTroopStrengthLabel
		vehicle: null, // vehicleTroopStrengthLabel
		aircraft: null, // airTroopStrengthLabel
		overall: null // simTroopDamageLabel
	},
	damage: {
		units: {
			infantry: null, // infantryTroopStrengthLabel
			vehicle: null, // vehicleTroopStrengthLabel
			structure: null, // structureTroopStrengthLabel
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
	supportlvl: null // enemySupportLevelLabel
}

// Using EA's API (Limited Support)

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
                var armyBar = qx.core.Init.getApplication().getUIItem(
                ClientLib.Data.Missions.PATH.BAR_ATTACKSETUP);
                var units = null;
                for (var key in armyBar) {
                    try {
                        if (armyBar[key] instanceof ClientLib.Data.CityPreArmyUnits) { // ClientLib.Data.CityPreArmyUnits renamed to $I.UIG = $I.NSVPME *CHECKED*
                            units = armyBar[key];
                            break;
						}
					} catch (e) {}
				}
				
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
                    //ta.calculateSimResults();
                    //ta.updateStatsWindow();
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
                    //var battleground = this.setupBattleground();
					
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
				
                units.CLEZCG(); // UpdateArmyLayout$0() has been renamed to CLEZCG()
                units.WRKUTR(); // RefreshData() has been renamed to WRKUTR()
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
		}
	});
}

////////////////
//Tools window//
var toolsbtn;
var battleResultsBox;
function initializeTools() {
	// The Battle Simulator box
	qx = unsafeWindow["qx"];
	var armyBar = qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_ATTACKSETUP);
	
	/////////
	//Tools//
	
	toolsbtn = new qx.ui.form.Button("Stats");
    toolsbtn.set({
        width: 64,
        height: 26,
        appearance: "button-text-small",
        toolTipText: "Update Battle Simulation Statistics"
	});
	toolsbtn.addListener("click", function (){toolclick();});
	armyBar.add(toolsbtn, {
        left: 12,
        top: 89
	});
	
	battleResultsBox = (new qx.ui.window.Window("Battle Simulator", "FactionUI/icons/icon_loading_logo.gif")).set({
		contentPaddingTop: 0,
		contentPaddingBottom: 2,
		contentPaddingRight: 2,
		contentPaddingLeft: 6,
		showMaximize: false,
		showMinimize: false
	});
	battleResultsBox.getChildControl("icon").set({
		scale: true,
		width: 25,
		height: 25
	})					
	battleResultsBox.setLayout(new qx.ui.layout.HBox); 
	battleResultsBox.moveTo(125, 125);
	
	var tabView = (new qx.ui.tabview.TabView).set({
		contentPaddingTop: 3,
		contentPaddingBottom: 6,
		contentPaddingRight: 7,
		contentPaddingLeft: 3
	});
	battleResultsBox.add(tabView);
	
	var statsPage = new qx.ui.tabview.Page("Stats"); 
	statsPage.setLayout(new qx.ui.layout.VBox(1)), tabView.add(statsPage);
	var t = new qx.ui.container.Composite,n = new qx.ui.layout.Grid;
	n.setColumnAlign(1, "right", "middle"), n.setColumnFlex(0, 1), t.setLayout(n), t.setThemedFont("bold"), t.setThemedBackgroundColor("#eef"); 
	statsPage.add(t);
	// The Enemy Troop Strength Label
	t.add(new qx.ui.basic.Label("Enemy Base:"), {
		row: 0,
		column: 0
		}), labels.damage.overall = new qx.ui.basic.Label(" - "), t.add(labels.damage.overall, {
		row: 0,
		column: 1
		}), t.add(new qx.ui.basic.Label("Defences:"), {
		row: 1,
		column: 0
		}), labels.damage.units.overall = new qx.ui.basic.Label(" - "), t.add(labels.damage.units.overall, {
		row: 1,
		column: 1
		}), labels.supportlvl = new qx.ui.basic.Label(""), t.add(labels.supportlvl, {
		row: 4,
		column: 0
		}), labels.damage.structures.support = new qx.ui.basic.Label(""), t.add(labels.damage.structures.support, {
		row: 4,
		column: 1
		}), t.add(new qx.ui.basic.Label("Buildings:"), {
		row: 3,
		column: 0
		}), labels.damage.structures.overall = new qx.ui.basic.Label(" - "), t.add(labels.damage.structures.overall, {
		row: 3,
		column: 1
		}), t.add(new qx.ui.basic.Label(""), {
		row: 5,
		column: 0
		}), labels.damage.structures.command = new qx.ui.basic.Label(""), t.add(labels.damage.structures.command, {
		row: 5,
		column: 1
		}), t.add(new qx.ui.basic.Label("Defense Facility:"), {
		row: 6,
		column: 0
		}), labels.damage.structures.defense = new qx.ui.basic.Label(" - "), t.add(labels.damage.structures.defense, {
		row: 6,
		column: 1
		}), t.add(new qx.ui.basic.Label("Construction Yard:"), {
		row: 7,
		column: 0,
		width: 120
		}), labels.damage.structures.construction = new qx.ui.basic.Label(" - "), t.add(labels.damage.structures.construction, {
		row: 7,
		column: 1,
		width: 40
	}), t = new qx.ui.container.Composite; n = new qx.ui.layout.Grid, n.setColumnAlign(1, "right", "middle"), n.setColumnFlex(0, 1), t.setLayout(n), t.setThemedFont("bold"), t.setThemedBackgroundColor("#eef"), statsPage.add(t);
	t.add(new qx.ui.basic.Label("Overall:"), {
		row: 0,
		column: 0
		}), labels.health.overall = new qx.ui.basic.Label(" - "), t.add(labels.health.overall, {
		row: 0,
		column: 1
		}), t.add(new qx.ui.basic.Label("Infantry:"), {
		row: 1,
		column: 0
		}), labels.health.infantry = new qx.ui.basic.Label(" - "), t.add(labels.health.infantry, {
		row: 1,
		column: 1
		}), t.add(new qx.ui.basic.Label("Vehicle:"), {
		row: 2,
		column: 0
		}), labels.health.vehicle = new qx.ui.basic.Label(" - "), t.add(labels.health.vehicle, {
		row: 2,
		column: 1
		}), t.add(new qx.ui.basic.Label("Aircraft:"), {
		row: 3,
		column: 0
		}), labels.health.aircraft = new qx.ui.basic.Label(" - "), t.add(labels.health.aircraft, {
		row: 3,
		column: 1
	}), t = new qx.ui.container.Composite, n = new qx.ui.layout.Grid, n.setColumnAlign(1, "right", "middle"), n.setColumnFlex(0, 1), t.setLayout(n), t.setThemedFont("bold"), t.setThemedBackgroundColor("#eef"), statsPage.add(t);
	t.add(new qx.ui.basic.Label("Outcome:"), {
		row: 0,
		column: 0
		}), labels.damage.outcome = new qx.ui.basic.Label("Unknown"), t.add(labels.damage.outcome, {
		row: 0,
		column: 1
		}), t.add(new qx.ui.basic.Label("Battle Time:"), {
		row: 1,
		column: 0
		}), labels.time = new qx.ui.basic.Label(" - "), t.add(labels.time, {
		row: 1,
		column: 1
	});
	
	////////////////// Info ////////////////////
	var infoPage = new qx.ui.tabview.Page("Loot");
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
		value: "<a target='_blank' href='http://userscripts.org/scripts/discuss/145717'>Forums</a>",
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
	stats.spoils.tiberium = new qx.ui.basic.Atom("0", "webfrontend/ui/common/icn_res_tiberium.png");
	psVBox.add(stats.spoils.tiberium);
	// Crystal
	stats.spoils.crystal = new qx.ui.basic.Atom("0", "webfrontend/ui/common/icn_res_chrystal.png");
	psVBox.add(stats.spoils.crystal);
	// Credits
	stats.spoils.credit = new qx.ui.basic.Atom("0", "webfrontend/ui/common/icn_res_dollar.png");
	psVBox.add(stats.spoils.credit);
	// Research
	stats.spoils.research = new qx.ui.basic.Atom("0", "webfrontend/ui/common/icn_res_research_mission.png");
	psVBox.add(stats.spoils.research);
	
	battleResultsBox.add(tabView);
}

var wrapperinjected = false;
var timer;
function toolclick()
{
	
	CCTAWrapper_IsInstalled = unsafeWindow["CCTAWrapper_IsInstalled"];
	if (!wrapperinjected || typeof CCTAWrapper_IsInstalled == "undefined" || !CCTAWrapper_IsInstalled) {
		injectwrapper();
		wrapperinjected = true;
		setTimeout(toolclick,0);
		return;
	}
	wrapperinjected = true;
	
	
	if (battleResultsBox.isVisible()) {
		//battleResultsBox.close();
		} else {
		battleResultsBox.open();
	}
	
	if (loadBase())
	{
		var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();
		var ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
		ownCity.get_CityArmyFormationsManager().set_CurrentTargetBaseId(city.get_Id());
		var unitqq = ClientLib.Vis.VisMain.GetInstance().get_Battleground();
		unitqq.SimulateBattle();
		
		toolsbtn.set({enabled: false});
		timer=10;
		tooltimer();
		
		setTimeout(function() {
			while (unitqq.get_Simulation().DoStep(false)) {}
			calcTroops(unitqq);
		}, 1);
		calcResources();
	}
}
function tooltimer()
{
	if(timer>0)
	{
		toolsbtn.setLabel(Math.floor(timer/0));
		timer-=1;
		setTimeout(function () {
			tooltimer();
		}, 0)
	}
	else
	{
		setTimeout(function () {
			toolsbtn.set({enabled: true});
			toolsbtn.setLabel("Update");
		}, timer)
	}
}

////////
//Data//
var Data = null;

function getData(city) {
	var b = Data.Bypass;
	if(typeof(b.rdy) == 'undefined') {
		b = getBypass(city, b);//b must be obj to pass via reference
	}
	l = {};
	try {
		var o;
		
		l.Buildings = [];
		l.Defences = [];
		l.Offences = [];
		
		if(b.keys.Buildings!==undefined) {
			o = city.get_CityBuildingsData()[b.keys.Buildings];
			if(o!==null) l.Buildings = o.l;
		}
		
		if(b.keys.Defences!==undefined) {
			o = city.get_CityUnitsData()[b.keys.Defences];
			if(o!==null) l.Defences = o.l;
		}
		
		if(b.keys.Offences!==undefined) {
			o = city.get_CityUnitsData()[b.keys.Offences];
			if(o!==null) l.Offences = o.l;
		}
		
		l.rdy = true;              
		} catch (e) {
		console.warn('getData: ', e);
	}            
	return l;
}
function getBypass(city, b) {
	if(b.rdy === undefined) {
		// get keys
		b.keys = {};
		//b.dnucKeys = {};
		try {
			b = getKeys(city.get_CityUnitsData(), b);
			b = getKeys(city.get_CityBuildingsData(), b);
			var o;  
			o = city.get_CityBuildingsData()[b.keys.Buildings].l;
			b.keys.Hitpoints = getKeyHitpoints(o);//Buildings   
			b.rdy = true;
			} catch (e) {
			console.warn('getBypass: ', e);
		}
	}
	console.dir(b.keys);
	return b;
}
function getKeys(list, b) {
	for (var k in list) {
		var o = list[k];
		if (o === null) continue;
		if (typeof(o.l) == 'undefined') continue;
		if (o.l.length === 0) continue;
		var m = getKey(o.l[0],'mt');//dnuc & mt=MoveType
		if(typeof(m) == 'undefined') continue;
		if(typeof(b.keys.Type) == 'undefined') {
			b.keys.Type = m;//MoveType & dnucKeys aviable in this branch
			//alert(m);
		}
		if(typeof(o.l[0].GetUnitGroupType) ==  'undefined') {
			if(typeof(b.keys.Resources) == 'undefined') {
				b.keys.Resources = getResKey(o.l[0],'Count');//Resouces
			}
			// buildings
			b.keys.Buildings = k;
			} else {
			// units
			if(o.l[0].GetUnitGroupType()) {
				//1-attack
				b.keys.Offences = k;
				} else {
				//0-defend
				b.keys.Defences = k;
			}
		}
	}
	return b;
}
function getKey(list, find) {
	for (var k in list) {
		var o = list[k];
		if (o === null) continue;
		if (o[find] === undefined) continue;
		if (find != 'l') {
			//console.info('getKey',k); 
			return k; 
		}
		if (o.l.length === 0) continue;
		//console.info('getKey',k);
		return k;
	}
	return undefined;
}
function getResKey(list,find) {
	for (var k in list) {
		var o = list[k];
		if (o === null) continue;
		if (!Array.isArray(o)) continue;
		if (o.length===0) continue;
		if (typeof(o[0][find]) == 'undefined') continue;
		return k;
	}
}
function getKeyHitpoints(l) {
	var unit = l[0];
	s = unit.get_IsAlive.toString();//get_HitpointsPercent
	var sa = 'this.';
	var sb = '()';
	var a = s.indexOf(sa) + sa.length;
	var t = s.substr(a);
	var b = t.indexOf(sb);    
	var k = t.substr(0, b);      
	//console.info('a',a,'b',b,'k',k);
	return k;
}

////////
//Info//

function loadBase() {
	try {
		if (Data === null) Data = {lastSelectedBaseId: -1, Bypass: {}};
		
		var r = Data;         
		
		r.selectedBaseId = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId();
		r.selectedOwnBaseId = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCityId();
		
		if (r.lastSelectedBaseId !== r.selectedBaseId) r.loaded = false;
		r.lastSelectedBaseId = r.selectedBaseId;  
		
		r.IsOwnBase = r.selectedBaseId === r.selectedOwnBaseId;
		
		r.cc = ClientLib.Data.MainData.GetInstance().get_Cities();
		
		r.ec = r.cc.GetCity(r.selectedBaseId);// it is very nice function          
		if(r.ec === null) return false;
		if(r.ec.get_CityBuildingsData() === null) return false;          
		
		r.oc = r.cc.get_CurrentOwnCity();            
		if(r.oc === null) return false;
		if(r.oc.get_CityBuildingsData() === null) return false;
		
		r.ol = getData(r.oc);
		r.el = getData(r.ec);// Buildings Defence Offence               
		if(typeof(r.ol)=='undefined') return false;
		if(typeof(r.el)=='undefined') return false;
		
		if(typeof(Data.Bypass.rdy)=='undefined') return false;
		
		if(r.el.Buildings.length === 0) return false;
		
		// for testing
		//MHTools();
		
		r.loaded = true;
		//flagBaseLoaded = true;
		return true;
		} catch (e) {
		console.warn("loadBase: ", e);
		console.dir("Data:",Data);
		return false;
	}
}

function calcResources() {
	try {          
		if (!Data.loaded) return;
		
		var el = Data.el;
		
		var loots = [0, 0, 0, 0, 0, 0, 0, 0];
		
		// enemy buildings
		for (var j in el.Buildings) {
			var building = el.Buildings[j];
			var mod = building.get_HitpointsPercent(); // 0-1 , 1 means 100%
			var resourcesList = building[Data.Bypass.keys.Resources]; 
			for (var i in resourcesList) {
				loots[resourcesList[i].Type] += mod * resourcesList[i].Count;// resourcesList[i].Type resourcesList[i].Count
			}
		}
		
		// enemy defences
		for (var j in el.Defences) {
			var unit = el.Defences[j];
			var mod = unit.get_HitpointsPercent(); // 0-1 , 1 means 100%
			var resourcesList = unit[Data.Bypass.keys.Resources];
			for (var i in resourcesList) {
				loots[resourcesList[i].Type] += mod * resourcesList[i].Count;
			}
		}
		
		stats.spoils.tiberium.setLabel(formatNumberWithCommas(loots[1]));
		stats.spoils.crystal.setLabel(formatNumberWithCommas(loots[2]));
		stats.spoils.credit.setLabel(formatNumberWithCommas(loots[3]));
		stats.spoils.research.setLabel(formatNumberWithCommas(loots[6]));
		
		} catch (e) {
		console.warn("calcResources: ", e);
		console.dir("Bypass:",MHLoot.Data.Bypass);
	}
}
function calcTroops(battleground) {
	try {
		//console.log(battleground);
		
		var b,w,E,S,x,T,N=0,C=0,k=0,t=0,n=0,r=0,i=0,s=0,o=0,u=0,a=0,f=0,l=0,c=0,h=0,p=0,d=0;var g=ClientLib.Res.ResMain.GetInstance().GetGamedata().units;var entities=battleground.get_Entities().d;var m=ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity().get_CityRepairData();for(var i in entities){w=entities[i].get_Entity();E=g[w.get_MDCTypeId()];if(E.r.length<=1){continue}S=w.get_iHitpointsCurrent(),x=w.get_iHitpoints(),T=ClientLib.Base.Util.GetUnitLevelData(w.get_iLevel(),E);console.log(E);if(w.get_eAlignment()==1){n+=S,t+=x;switch(E.at){case ClientLib.Base.EUnitType.Air:c+=S,p+=x,k+=calculateRepairCost(T,ClientLib.Base.EResourceType.RepairChargeAir,S/x,m);break;case ClientLib.Base.EUnitType.Infantry:f+=S,d+=x,N+=calculateRepairCost(T,ClientLib.Base.EResourceType.RepairChargeInf,S/x,m);break;case ClientLib.Base.EUnitType.Tank:l+=S,h+=x,C+=calculateRepairCost(T,ClientLib.Base.EResourceType.RepairChargeVeh,S/x,m);break;default:}}else{r+=x,i+=S;if(w.get_MDCTypeId()>=200&&w.get_MDCTypeId()<=205){stats.supportlvl=w.get_iLevel(),stats.damage.structures.support=S/x*100}else{switch(w.get_MDCTypeId()){case 112:case 151:case 177:stats.damage.structures.construction=S/x*100;break;case 158:case 131:case 195:stats.damage.structures.defense=S/x*100;break;case 111:case 159:stats.damage.structures.command=S/x*100;break;default:}}switch(E.pt){case ClientLib.Base.EPlacementType.Structure:s+=x,o+=S;break;default:u+=x,a+=S}}}
		
		stats.health.overall = n ? n / t * 100 : 0;
		stats.health.infantry = d ? f / d * 100 : 100;
		stats.health.vehicle = h ? l / h * 100 : 100;
		stats.health.aircraft = p ? c / p * 100 : 100;
		
		stats.damage.units.overall = a / u * 100;
		stats.damage.structures.overall = o / s * 100;
		stats.damage.overall = i / r * 100;
		
		stats.repair.overall = Math.max(N,k,C);
		stats.repair.infantry = N;
		stats.repair.aircraft = k;
		stats.repair.vehicle = C;
		
		stats.time=(battleground.get_BattleDuration()/1000);
		
		
		updateStatsWindow();
		
		} catch (e) {
		console.warn("calcTroops: ", e);
		//console.dir("Bypass:",MHLoot.Data.Bypass);
	}
}

function calculateRepairCost(e, t, n, r) {
	if (n >= 1) {
		return 0;
	}
	var ii = e.length,s;
	while (ii--) {
		s = e[ii];
		if (s.Type == t) {
			return r.ConvertRepairCost(s.Type, s.Count, 1 - n);
		}
	}
	return 0;
}

function setLabelColor(e, t, n) {
	var r = ["green", "blue", "black", "red"],
	i = r[0],
	s = t;
	n >= 0 && (s = 100 - s), s > 99.99 ? (i = r[3]) : s > 50 ? (i = r[2]) : s > 0 && (i = r[1]), e.setTextColor(i);
}
function updateLabel100(e, t, n) {
	setLabelColor(e, t, n), e.setValue(t.toFixed(2).toString());
}
function updateLabel100time(e, t, n, r) {
	var i = t.toFixed(2).toString() + " @ ";
	i += formatSecondsAsTime(r), setLabelColor(e, t, n), e.setValue(i);
}
function updateStatsWindow() {
	var e = ["black", "blue", "green", "red"],
	t = "",
	n = 0;
	stats.damage.structures.construction === 0 ? (t = "Total Victory", n = 0) : stats.damage.structures.overall < 100 ? (t = "Victory", n = 1) : (t = "Total Defeat", n = 3);
	labels.damage.outcome.setValue(t), labels.damage.outcome.setTextColor(e[n]);
	updateLabel100(labels.damage.overall, stats.damage.overall, - 1);
	updateLabel100(labels.damage.units.overall, stats.damage.units.overall, - 1);
	updateLabel100(labels.damage.structures.overall, stats.damage.structures.overall, - 1);
	updateLabel100(labels.damage.structures.construction, stats.damage.structures.construction, - 1);
	updateLabel100(labels.damage.structures.defense, stats.damage.structures.defense, - 1);
	//mnm.nnnmm ? updateLabel100(labels.damage.structures.command, stats.damage.structures.command, - 1) : (labels.damage.structures.command.setValue("--"),labels.damage.structures.command.setTextColor("green"));
	//var r = stats.supportlvl > 0 ? stats.supportlvl.toString() : "--";
	//labels.supportlvl.setValue("Suport lvl " + r + ": ");
	//updateLabel100(labels.damage.structures.support,stats.damage.structures.support, - 1);
	updateLabel100time(labels.health.overall, stats.health.overall, 1, stats.repair.overall);
	updateLabel100time(labels.health.infantry, stats.health.infantry, 1, stats.repair.infantry);
	updateLabel100time(labels.health.vehicle, stats.health.vehicle, 1, stats.repair.vehicle);
	updateLabel100time(labels.health.aircraft, stats.health.aircraft, 1, stats.repair.aircraft);
	setLabelColor(labels.time, stats.time / 120, - 1);
	labels.time.setValue(stats.time.toFixed(2).toString());
}
function formatNumberWithCommas(e) {
	return Math.floor(e).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function formatSecondsAsTime(e, t) {
	var n = Math.floor(e / 3600),
	r = Math.floor((e - n * 3600) / 60),
	i = Math.floor(e - n * 3600 - r * 60);
	r < 10 && (r = "0" + r), i < 10 && (i = "0" + i);
	return n + ":" + r + ":" + i;
}


//////////////
//Formations//
function getCityPreArmyUnits() {
	ClientLib = unsafeWindow["ClientLib"];
	var ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
	var formationManager = ownCity.get_CityArmyFormationsManager();
	return formationManager.GetFormationByTargetBaseId(formationManager.get_CurrentTargetBaseId());
}
function restoreFormation(saved_units) {
	var sUnits = saved_units;
	var units = getCityPreArmyUnits();
	var units_list = units.get_ArmyUnits().l;
	for (var idx = 0; idx < sUnits.length; idx++) {
		var saved_unit = sUnits[idx];
		var uid = saved_unit.id;
		for (var i = 0; (i < units_list.length); i++) {
			if (units_list[i].get_Id() === uid) {
				units_list[i].MoveBattleUnit(saved_unit.x, saved_unit.y);
				if (saved_unit.enabled === undefined) units_list[i].set_Enabled(true);
				else units_list[i].set_Enabled(saved_unit.enabled);
			}
		}
	}
	units.UpdateFormation(true); //this works and USES the API so works for both servers
}

function shiftFormation(direction) { //left right up down
	
	if (!direction) var direction = window.prompt("indicate a direction to shift units: up(u), down(d), left(l) or right(r)");
	
	if (direction == "up" || direction == "u") var v_shift = -1;
	if (direction == "down" || direction == "d") var v_shift = 1;
	if (direction == "left" || direction == "l") var h_shift = -1;
	if (direction == "right" || direction == "r") var h_shift = 1;
	
	if (!v_shift) var v_shift = 0;
	if (!h_shift) var h_shift = 0;
	
	units = getCityPreArmyUnits().get_ArmyUnits().l;
	var Army = [];
	//read army, consider use saveFormation(?)
	for (var i = 0;	(i < this.units.length); i++) {
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
	restoreFormation(Army);
}

//Basic simulate functions
var lock = false;
function initSimulateBattle() {
    qx = unsafeWindow["qx"];
    ClientLib = unsafeWindow["ClientLib"];
    var armyBar = qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_ATTACKSETUP);
	
	////////////
    //Simulate//
	
    var simulatebtn = new qx.ui.form.Button("Simulate");
    simulatebtn.set({
		width: 64,
		height: 26,
		appearance: "button-text-small",
		toolTipText: "Start Combat Simulation"
	});
    simulatebtn.addListener("click", function () {
		qx = unsafeWindow["qx"];
		ClientLib = unsafeWindow["ClientLib"];
		webfrontend = unsafeWindow["webfrontend"];
		
		if (lock) return;
		
		qx = unsafeWindow["qx"];
		var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();
		var ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
		var app = qx.core.Init.getApplication();
		
		if (city.get_OwnerAllianceId() != 0) {
			alert("Not allowed for PvP!");
			return;
		}
		var mainData = ClientLib.Data.MainData.GetInstance();
		var player_cities = mainData.get_Cities();
		var current_city = player_cities.get_CurrentCity();
		localStorage.ta_sim_last_city = current_city.get_Id();
		
		ownCity.get_CityArmyFormationsManager().set_CurrentTargetBaseId(city.get_Id());
		ClientLib.Vis.VisMain.GetInstance().get_Battleground().SimulateBattle();
		app.getPlayArea().setView(webfrontend.gui.PlayArea.PlayArea.modes.EMode_CombatReplay, city.get_Id(), 0, 0);
		lock = true;
		simulatebtn.setOpacity(0.2);
		setTimeout(function () {
			simulatebtn.setOpacity(1.0);
			lock = false;
		}, 10100)
	}, this)
    armyBar.add(simulatebtn, {
		left: 12,
		top: 126
	});
	
	//////////
	//Unlock//
	
	var unlockbtn = new qx.ui.form.Button("Unlock");
	unlockbtn.set({
		width: 55,
		height: 46,
		appearance: "button-text-small",
		toolTipText: "Unlock Attack Button"
	});
	unlockbtn.setOpacity(0.5);
	unlockbtn.addListener("click", function () {
		qx = unsafeWindow["qx"];
		var armyBar = qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_ATTACKSETUP);
		armyBar.remove(unlockbtn);
		setTimeout(function () {
			armyBar.add(unlockbtn, {
				top: 107,
				right: 4
			});
		}, 2000);
	}, this);
	armyBar.add(unlockbtn, {
		top: 107,
		right: 4
	});
	
	
	////////
	//Back//
	
	var backbtn = new qx.ui.form.Button("Setup");
    backbtn.set({
		width: 50,
		height: 24,
		appearance: "button-text-small",
		toolTipText: "Return to Combat Setup"
	});
    backbtn.addListener("click", function () {
		qx = unsafeWindow["qx"];
		var app = qx.core.Init.getApplication();
		var player_cities = ClientLib.Data.MainData.GetInstance().get_Cities();
		var current_city = player_cities.get_CurrentCity();
		try {
			app.getPlayArea().setView(webfrontend.gui.PlayArea.PlayArea.modes.EMode_CombatSetupDefense, localStorage.ta_sim_last_city, 0, 0);
			} catch (e) {
			app.getPlayArea().setView(webfrontend.gui.PlayArea.modes.EMode_CombatSetupDefense, localStorage.ta_sim_last_city, 0, 0);
		}	
	}, this);
	
	var replayBar = qx.core.Init.getApplication().getReportReplayOverlay();
    replayBar.add(backbtn, {
		top: 37,
		left: 255
	});
	
	
	/////////
	//Shift//
	
	var arrows = {};
	arrows.ShiftFormationLeft = new qx.ui.form.Button("←");
	arrows.ShiftFormationLeft.set(
	{
		width: 30,
		appearance: "button-text-small",
		toolTipText: "Shift units Left"
	});
	arrows.ShiftFormationLeft.addListener("click", function(){shiftFormation('l');}, this);
	
	arrows.ShiftFormationRight = new qx.ui.form.Button("→");
	arrows.ShiftFormationRight.set(
	{
		width: 30,
		appearance: "button-text-small",
		toolTipText: "Shift units RIGHT"
	});
	arrows.ShiftFormationRight.addListener("click", function(){shiftFormation('r');}, this);
	
	arrows.ShiftFormationUp = new qx.ui.form.Button("↑");
	arrows.ShiftFormationUp.set(
	{
		width: 30,
		appearance: "button-text-small",
		toolTipText: "Shift units UP"
	});
	arrows.ShiftFormationUp.addListener("click", function(){shiftFormation('u');}, this);
	
	arrows.ShiftFormationDown = new qx.ui.form.Button("↓");
	arrows.ShiftFormationDown.set(
	{
		width: 30,
		appearance: "button-text-small",
		toolTipText: "Shift units DOWN"
	});
	arrows.ShiftFormationDown.addListener("click", function(){shiftFormation('d');}, this);
	
	armyBar.add(arrows.ShiftFormationUp,
	{
		top: 17,
		left: 29
	});
	armyBar.add(arrows.ShiftFormationLeft,
	{
		top: 34,
		left: 12
	});
	armyBar.add(arrows.ShiftFormationRight,
	{
		top: 34,
		left: 46
	});
	armyBar.add(arrows.ShiftFormationDown,
	{
		top: 51,
		left: 29
	});
	
}

//////////////////////////////////////////////////
//infernal wrapper by infernal me
//149068
//Version: 0.372798 
//////////////////////////////////////////////////
function injectwrapper() {
	var CCTAWrapper_main = function () {
		try {
			
			gni = function(o, idx){
				var i = 0;
				for (k in o){
					if (i == idx){
						return k;
					}
					i++;
				}
				return '';
			}
			gbi = function(n, o, idx){_log(n);_logp(o);var i=0;for(k in o){i++;if(i==idx) return o[k];}}
			sbi = function(n, o, idx, v){_log(n);_logp(o);var i=0;for(k in o){i++;if(i==idx) o[k]=v;}}
			_log = function(){
				if(typeof console != 'undefined') console.log(arguments);
				else if(window.opera) opera.postError(arguments);
				else GM_log(arguments);
			}
			hmm = []
			CCTAWrapper = []
			_show = function(o){var ks=[];var i=0; for (k in o)ks[i++]=k;return ks;}
			_logp = function(o){_log(_show(o));}
			//_log('have fun :)')
			wrapper = {
				_val_or_def: function(val, def) {
					if(typeof val != 'undefined') return val;
					return def;
				},
				_prop_name: function(prop_map) {return prop_map[this.versions[this.version]];},
				_prop_index: function(prop_map) {return prop_map[this.versions[this.version]+1];},
				versions: {'368132': 0, '372393': 2, '372567': 4, '372798': 6},
				version: null,//'368132',
				init_wrap: function(wrap) {
					try {
						var fn = wrap[0]
						var to_name = wrap[1]
						var tp_name = wrap[2]
						var sp_map = wrap[3]
						if(wrap.length == 5) var opt_so_name = wrap[4];
						var so_name = this._val_or_def(opt_so_name, to_name)
						var sp_index = sp_map[this._index]
						//_log('testing '+to_name+'.'+tp_name+'='+sp_name+':'+sp_index+':'+sp_map[this._name])
						switch (fn){
							case 0:
							var sp_name = gni(eval(so_name), sp_index)
							var eval_str = to_name+"."+tp_name+" = "+so_name+"."+sp_name;
							break;
							case 1: 
							var sp_name = gni(eval(so_name+'.prototype'), sp_index)
							var eval_str = to_name+".prototype."+tp_name+" = "+so_name+".prototype."+sp_name;
							break;
							case 2:
							var sp_name = gni(eval("(new "+so_name+")"), sp_index)
							var eval_str = to_name+".prototype."+tp_name+" = function(){return this."+sp_name+";}"
							break;
							case 3:
							var sp_name = gni(eval("(new "+so_name+")"), sp_index)
							var eval_str = to_name+".prototype."+tp_name+" = function(value){this."+sp_name+"=value;}"
							break;
						}
						//hmm.push([sp_map[this._name], sp_name])
						CCTAWrapper.push(eval_str);
						//console.log(eval_str);
						eval(eval_str);
						} catch(e) {
						_log(e)
					}
				},
				wraps: [
				[0, 'System', 'EventHandler', ['UXDRTN', 515, 'NGTHZJ', 529, 'JCSGJY', 529, 'KFYAAI', 529]],
				[1, 'System.EventHandler', '$ctor', ['NKAYQG', 1, 'MIARKA', 1, 'EWWHOL', 1, 'ZAXRBM', 1]],
				[1, 'ClientLib.Vis.ViewModeChange', '$ctor', ['NKAYQG', 1, 'MIARKA', 1, 'EWWHOL', 1, 'ZAXRBM', 1]],
				[0, 'SharedLib', 'Combat', ['ABMZCA', 479, 'IDXMKY', 489, 'ADKXKR', 489, 'HXFPLA', 489]],
				[0, 'SharedLib.Combat', 'CbtSetup', ['PIZEIS', 511, 'NRUUGI', 523, 'WHLOUM', 523, 'KLFTJR', 523], 'SharedLib'],
				[0, 'SharedLib.Combat', 'CbtSimulation', ['MTNICQ', 514, 'DZXTYL', 526, 'ACBTHR', 526, 'HVADQY', 526], 'SharedLib'],
				[2, 'ClientLib.Vis.Battleground.Battleground', 'get_Entities', ['VMKWMN', 47, 'XSWELH', 32, 'KMBRZW', 32, 'SUEDOE', 32]],
				[1, 'SharedLib.Combat.CbtSimulation', 'DoStep', ['RVQKEM', 24, 'OWGEVP', 26, 'UZQRCL', 26, 'DCQBPW', 26]],
				[2, 'SharedLib.Combat.CbtSimulation', 'get_iCombatStep', ['XPJFXB', 12, 'VMUZIL', 13, 'DRBCLE', 13, 'LNMEAH', 13]],
				[0, 'SharedLib.Combat', 'CbtEntity', ['RMODUK', 517, 'JTEOOI', 531, 'JCGAHG', 531, 'ECRBKG', 531], 'SharedLib'],
				[2, 'SharedLib.Combat.CbtEntity', 'get_eAlignment', ['VTZLJN', 12, 'DGCHHX', 16, 'FNFYRU', 16, 'OZMCXW', 16]],
				[2, 'SharedLib.Combat.CbtEntity', 'get_iHitpoints', ['FOYNHE', 20, 'WVNYBU', 24, 'KZYUFV', 24, 'YSIGTS', 24]],
				[2, 'SharedLib.Combat.CbtEntity', 'get_iHitpointsCurrent', ['BVCBXJ', 21, 'JRPGGY', 25, 'TQGPMJ', 25, 'FKIJLL', 25]],
				[2, 'SharedLib.Combat.CbtEntity', 'get_MDCTypeId', ['ADPYGJ', 9, 'LWEMLL', 13, 'DOHVCH', 13, 'NYWTBP', 13]],
				[2, 'SharedLib.Combat.CbtEntity', 'get_iLevel', ['XAWKEE', 33, 'BBOCMN', 40, 'VLRZBZ', 40, 'BVTEXJ', 40]],
				[0, 'ClientLib.Base.Util', 'GetUnitLevelData', ['MYJUVV', 35, 'NSRLEW', 36, 'LBVSBJ', 36, 'UAETGG', 36]],
				[0, 'ClientLib.Data', 'World', ['DHZVSV', 225, 'FBIHPA', 222, 'ZNNOJA', 222, 'RXBFAJ', 222], 'SharedLib'],
				[2, 'ClientLib.Data.World', 'getSectors', ['EBJZUK', 2, 'USDXCN', 8, 'XKDXDO', 8, 'DXWDMU', 8]],
				[2, 'ClientLib.Data.CityUnits', 'get_FullRawRepairTimeForUnitGroupTypes', ['IKDTVE', 6, 'OTDSKU', 6, 'KJXNLV', 6, 'EGPVJG', 6]],
				[1, 'ClientLib.Data.CityUnits', 'get_OffenseUnits', ['VPNCHY', 68, 'YFPFEA', 68, 'VQTZWZ', 68, 'LFLRDX', 68]],
				[1, 'ClientLib.Data.CityUnits', 'get_DefenseUnits', ['BFENHD', 69, 'BVLEOM', 69, 'KSNJIL', 69, 'OZUZHB', 69]],
				[0, 'ClientLib.Data', 'CityRepair', ['KBVZQX', 295, 'XSCVQY', 302, 'EMJXEK', 302, 'OGYYVR', 302], 'SharedLib'],
				[1, 'ClientLib.Data.CityRepair', 'CanRepair', ['JPPHSL', 51, 'KPJOGJ', 51, 'CJNJHS', 51, 'ELLALQ', 51]],
				[1, 'ClientLib.Data.CityRepair', 'UpdateCachedFullRepairAllCost', ['IMVKOC', 63, 'FPXIRL', 63, 'USKKAR', 63, 'EUNASQ', 63]],
				[1, 'ClientLib.Data.CityRepair', 'ConvertRepairCost', ['SPZDZS', 54, 'KTBNUH', 54, 'SZMDMZ', 54, 'AEQAYN', 54]],
				[1, 'ClientLib.Data.CityPreArmyUnits', 'RefreshData', ['UPLGQX', 20, 'AYSULX', 20, 'GGASDX', 20, 'WWOZKG', 20]],
				[2, 'ClientLib.Data.City', 'getResourceLayout', ['TTZXUV', 50, 'VEVRWH', 51, 'LTUGHT', 51, 'DIKBFF', 51]],
				[2, 'ClientLib.Data.CityBuildings', 'get_Buildings', ['QQXUFW', 2, 'KXNWER', 2, 'MJZVZV', 2, 'YJFUGH', 2]],
				[2, 'ClientLib.Data.CityEntity', 'get_UnitLevelRequirements', ['JSPNOJ', 2, 'ELBALP', 2, 'GPJTIV', 2, 'MYYNWB', 2]],
				[1, 'ClientLib.Data.CityEntity', 'get_UnitLevelRepairCost', ['get_UnitLevelRequirements', 67, 'get_UnitLevelRequirements', 69, 'get_UnitLevelRequirements', 69, 'get_UnitLevelRequirements', 69]],
				[3, 'ClientLib.Data.Combat', 'set_Version', ['QVVMKN', 2, 'JVAKKQ', 1, 'SWINUM', 1, 'IIEPGR', 1]],
				[3, 'ClientLib.Data.Combat', 'set_StartStep', ['ILFZUG', 3, 'FIGZGC', 3, 'XNBJZC', 3, 'TNMYVN', 3]],
				[3, 'ClientLib.Data.Combat', 'set_Attacker', ['OYABQD', 4, 'TRRERK', 4, 'PYFENC', 4, 'YORRBM', 4]],
				[3, 'ClientLib.Data.Combat', 'set_Defender', ['UQJQSW', 5, 'ZSTKUP', 5, 'MSSCZL', 5, 'DWOQYP', 5]],
				[3, 'ClientLib.Data.Combat', 'set_Blocker', ['ZBVZOD', 6, 'KFQWVW', 6, 'IQSLLP', 6, 'KHZCWR', 6]],
				[3, 'ClientLib.Data.Combat', 'set_Buildings', ['DFGGIB', 7, 'FSVKTA', 7, 'OPLYEK', 7, 'CZWYBW', 7]],
				[3, 'ClientLib.Data.Combat', 'set_Supports', ['DZOZGI', 8, 'PTSGBE', 8, 'PIHBNH', 8, 'ZHUQEN', 8]],
				[3, 'ClientLib.Data.Combat', 'set_Debug', ['GNSESK', 36, 'LEEPKR', 38, 'JNJGAB', 38, 'UQGSLK', 38]],
				[1, 'ClientLib.Data.Combat', 'setNPCNames', ['DUVWXR', 44, 'GOAFQJ', 46, 'ZUQXYT', 46, 'ZYQOUF', 46]],
				[0, 'ClientLib.Vis.Battleground', 'BattlegroundEntity', ['BLEBFL', 516, 'QGVOPO', 530, 'KOBQGP', 530, 'ZMJNME', 530], 'System'],
				[2, 'ClientLib.Vis.Battleground.BattlegroundEntity', 'get_Entity', ['ILLYJL', 25, 'RVVLCA', 25, 'KZYXTD', 25, 'UIKENY', 25]],
				[2, 'ClientLib.Vis.Battleground.BattlegroundEntity', 'get_UnitType', ['KPWXBD', 1, 'IQTKIG', 1, 'CIZUDY', 1, 'ODLTMA', 1]],
				[2, 'ClientLib.Vis.Battleground.Battleground', 'get_Simulation', ['YPYRGP', 44, 'QRDUJM', 29, 'WQOTHV', 29, 'WVQJYL', 29]],
				[3, 'ClientLib.Vis.Battleground.Battleground', 'set_CurrentReplay', ['YMADLI', 79, 'OMDYHD', 54, 'FMVUZS', 54, 'YNIYUR', 54]],
				[1, 'ClientLib.Vis.Battleground.Battleground', 'setCombatData', ['ZMQRGW', 182, 'ADMYQP', 159, 'GREBVM', 159, 'JEQDDM', 159]],
				[2, 'ClientLib.Res.ResMain', 'get_Gamedata', ['YMIGZX', 1, 'BQKOXH', 1, 'FEPVKS', 1, 'BMONHF', 1]]
				//[2, 'SharedLib.Combat.CbtSetup', 'get_Entities', ['VMKWMN', 48, 'XSWELH', 0]],//??
				//[1, 'ClientLib.Data.CityPreArmyUnits', 'UpdateArmyLayout', ['CIVNTG', 0, 'JKGIUG', 0]],// Should not be needed
				],
				init: function() {
					try{
						this._name = this.versions[this.version]
						this._index = this._name + 1
						
						System = $I
						SharedLib = $I
						
						for (var i in this.wraps) this.init_wrap(this.wraps[i]);
						}catch(e){
						_log(e)
					}
				}
			}  
			function createCCTAWrapper() {
				console.log('CCTAWrapper loaded');
				console.log('Wrapper loading '+PerforceChangelist);
				wrapper.version = '' + PerforceChangelist
				wrapper.init()
				console.log('Wrapper loaded')
				//console.log(hmm)
				//console.log(CCTAWrapper)
				
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
}

function waitForClientLib() {
    ClientLib = unsafeWindow["ClientLib"];
    qx = unsafeWindow["qx"];
	
    if ((typeof ClientLib == 'undefined') || (typeof qx == 'undefined') || (qx.core.Init.getApplication().initDone == false)) {
		setTimeout(waitForClientLib, 1);
		return;
	}
    initSimulateBattle();
	initializeTools();
};

function startup() {
    setTimeout(waitForClientLib, 1);
};

startup();							