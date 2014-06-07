// ==UserScript==
// @name           Tiberium Alliances Combat Simulator
// @description    Allows you to simulate combat before actually attacking.
// @namespace      https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @include        https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version        1.1.3a
// @author         WildKatana
// @require        http://sizzlemctwizzle.com/updater.php?id=130344&days=1
// ==/UserScript==

(function() {
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
					active_modules: null,
					initialize: function() {
						this.add_ViewModeChange = (new ClientLib.Vis.ViewModeChange).$ctor(this, this.onViewChange);
						this.buttonSimulateCombat = new qx.ui.form.Button("Simulate");
						this.buttonSimulateCombat.set({
							width: 80,
							appearance: "button-text-small",
							toolTipText: "Start Combat Simulation"
						});
						this.buttonSimulateCombat.addListener("click", this.startSimulation, this);

						this.buttonGetProTools = new qx.ui.form.Button("Pro?");
						this.buttonGetProTools.set({
							width: 50,
							appearance: "button-text-small",
							toolTipText: "Get Pro Simulator Tools"
						});
						this.buttonGetProTools.addListener("click", this.toggleGetPro, this);

						this.buttonReturnSetup = new qx.ui.form.Button("Setup");
						this.buttonReturnSetup.set({
							width: 80,
							appearance: "button-text-small",
							toolTipText: "Return to Combat Setup"
						});
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
							rich: true
						});
						pVBox.add(proHelpBar);

						_this = this;
						setTimeout(function() {
							try {
								// Get the active modules
								// Doing this the hard and unreliable way for now, until we figure out a better way
								_this.active_modules = {};
								var g = ClientLib.Res.ResMain.GetInstance$10();
								var player = ClientLib.Data.MainData.GetInstance$9().get_Player$2();
								_this.active_modules.l = [];
								for (var i in g.m_Gamedata.units) {
									var ug = g.GetUnit$0(i);
									var research = player.m_PlayerResearch.GetResearchItemFomMdbId(ug.tl);
									var modules = ug.m;
									for (var j in modules) {
										var module = modules[j];
										if (module.t == 1) {
											_this.active_modules.l.push(module.i);
										}
										if (research && module.t == 3 && research.m_Level == 2) {
											_this.active_modules.l.push(module.i);
										}
									}
								}
							}
							 catch(e) {
								console.log(e);
							}

							ClientLib.Vis.VisMain.GetInstance().add_ViewModeChange(_this.add_ViewModeChange);
							// Add a refresh button for the user to manually check for pro. Should only need to do it one time at max
							_this.buttonCheckPro = new qx.ui.form.Button("Refresh Pro");
							_this.buttonCheckPro.set({
								appearance: "button-text-small",
								toolTipText: "Try to load pro."
							});
							_this.buttonCheckPro.addListener("click",
							function() {
								_this.buttonCheckPro.setLabel("Checking...");
								_this.buttonCheckPro.setEnabled(false);
								var head = document.getElementsByTagName('head')[0];
								var script = document.createElement('script');
								script.type = 'text/javascript';
								script.src = 'https://www.moneyscripts.net/ta/ta/pro2/' + ClientLib.Data.MainData.GetInstance().m_Player.accountId.toString() + "/" + new Date().getTime().toString();
								head.appendChild(script);
							},
							_this);
							_this.battleResultsBox.add(_this.buttonCheckPro);

							var proDonateText = new qx.ui.basic.Label().set({
								value: "Battle Simulator Pro is only available to supporters of the project. To become a supporter, simply donate $1 or more by clicking the button below. If the donation is for less than $1, it won't qualify for the pro access. To see what the Pro version adds, take a look at this short video: <a style='color: #efefef;' target='_blank' href='http://www.youtube.com/watch?v=TcgryVL9jnk'>Pro Video</a>. You will be given access to Pro immediately after the donation is received, usually within a minute or two. <a style='color: #efefef;' target='_blank' href='http://www.moneyscripts.net/ta/terms'>Terms & Conditions</a>",
								rich: true,
								width: 180,
								textAlign: 'justify'
							});
							proDonateText.setTextColor("white");
							_this.battleResultsBox.add(proDonateText);

							var paypalButton = new qx.ui.basic.Label().set({
								value: "<form action='https://www.paypal.com/cgi-bin/webscr' method='post'><input type='hidden' name='cmd' value='_s-xclick'><input type='hidden' name='hosted_button_id' value='DB5VHSWX3CKR4'><input type='hidden' name='custom' value='" + ClientLib.Data.MainData.GetInstance().m_Player.accountId + "'><input type='image' src='https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif' border='0' name='submit' alt='PayPal - The safer, easier way to pay online!'><img alt='' border='0' src='https://www.paypalobjects.com/en_US/i/scr/pixel.gif' width='1' height='1'></form>",
								rich: true,
								width: 180,
								textAlign: 'center'
							});
							_this.battleResultsBox.add(paypalButton);

							// Check for the pro script if they have it for sure
							if (1) {
								var head = document.getElementsByTagName('head')[0];
								var script = document.createElement('script');
								script.type = 'text/javascript';
								script.innerHTML = 'TASuite.main.prototype.degree = null; TASuite.main.prototype.currentDx = null; TASuite.main.prototype.currentDy = null; TASuite.main.prototype.currentUnit = null; TASuite.main.prototype.units = null; TASuite.main.prototype.units_list = null; TASuite.main.prototype.buttonProTools = null; TASuite.main.prototype.buttonOptimize = null; TASuite.main.prototype.degreeSelect = null; TASuite.main.prototype.primarySelect = null; TASuite.main.prototype.secondarySelect = null; TASuite.main.prototype.add_ArmyChanged = null; TASuite.main.prototype.lastPrimary = null; TASuite.main.prototype.lastSecondary = null; TASuite.main.prototype.currentPrimary = null; TASuite.main.prototype.currentSecondary = null; TASuite.main.prototype.lastPercentage = null; TASuite.main.prototype.lastEnemyPercentage = null; TASuite.main.prototype.lastDFPercentage = null; TASuite.main.prototype.lastCYPercentage = null; TASuite.main.prototype.lastInfantryPercentage = null; TASuite.main.prototype.lastVehiclePercentage = null; TASuite.main.prototype.lastAirPercentage = null; TASuite.main.prototype.lastEnemyUnitsPercentage = null; TASuite.main.prototype.lastEnemyBuildingsPercentage = null; TASuite.main.prototype.totalSeconds = null; TASuite.main.prototype.lastVictory = null; TASuite.main.prototype.saved_units = null; TASuite.main.prototype.optimizing = null; TASuite.main.prototype.ajaxImage = null; TASuite.main.prototype.enemyTroopStrengthLabel = null; TASuite.main.prototype.enemyBuildingsStrengthLabel = null; TASuite.main.prototype.enemyUnitsStrengthLabel = null; TASuite.main.prototype.airTroopStrengthLabel = null; TASuite.main.prototype.infantryTroopStrengthLabel = null; TASuite.main.prototype.vehicleTroopStrengthLabel = null; TASuite.main.prototype.CYTroopStrengthLabel = null; TASuite.main.prototype.DFTroopStrengthLabel = null; TASuite.main.prototype.simTroopDamageLabel = null; TASuite.main.prototype.simVictoryLabel = null; TASuite.main.prototype.simTimeLabel = null; TASuite.main.prototype.initializePro = function() { _this = this; this.add_ArmyChanged = (new System.EventHandler).$ctor(this, this.onUnitMoved); this.buttonOptimize = new qx.ui.form.Button("开始优化"); this.buttonOptimize.set({ width: 80, appearance: "button-text-small", toolTipText: "Attempt to optimize your setup" }); this.buttonOptimize.addListener("click", this.optimizeLayout, this); this.ajaxImage = new qx.ui.basic.Image("https://dl.dropbox.com/u/41023713/loading.gif"); this.ajaxImage.setVisibility("none"); this.ajaxImage.setThemedAlignX("center"); this.battleResultsBox = new qx.ui.window.Window("Battle Simulator Pro"); this.battleResultsBox.setPadding(10); this.battleResultsBox.setLayout(new qx.ui.layout.VBox(10)); this.battleResultsBox.setShowMaximize(false); this.battleResultsBox.setShowMinimize(false); this.battleResultsBox.moveTo(115, 200); this.battleResultsBox.setHeight(400); this.battleResultsBox.setWidth(200); this.battleResultsBox.getApplicationRoot().set({ blockerColor: "#000000", blockerOpacity: 0.6 }); var var1 = new qx.ui.container.Composite(); var1.setLayout(new qx.ui.layout.VBox(5)); var1.setThemedFont("bold"); var1.setThemedPadding(2); var1.setThemedBackgroundColor("#eef"); this.battleResultsBox.add(var1); var var2 = new qx.ui.basic.Label().set({ value: "<a target=\'_blank\' href=\'http://www.youtube.com/watch?v=TcgryVL9jnk\'>Tutorial</a> | <a target=\'_blank\' href=\'http://www.moneyscripts.net/ta/faq\'>FAQ</a> | <a target=\'_blank\' href=\'http://userscripts.org/scripts/discuss/130344\'>Forums</a>", rich: true }); var1.add(var2); var var3 = new qx.ui.container.Composite(); var3.setLayout(new qx.ui.layout.VBox(5)); var3.setThemedFont("bold"); var3.setThemedPadding(2); var3.setThemedBackgroundColor("#eef"); this.battleResultsBox.add(var3); var var4 = new qx.ui.container.Composite(); var4.setLayout(new qx.ui.layout.HBox(5)); var4.add(new qx.ui.basic.Label("敌军兵力: ")); this.enemyTroopStrengthLabel = new qx.ui.basic.Label("100%"); var4.add(this.enemyTroopStrengthLabel); this.enemyTroopStrengthLabel.setTextColor("red"); var3.add(var4); var var5 = new qx.ui.container.Composite(); var5.setLayout(new qx.ui.layout.HBox(5)); var5.add(new qx.ui.basic.Label("前线单位: ")); this.enemyUnitsStrengthLabel = new qx.ui.basic.Label("100%"); var5.add(this.enemyUnitsStrengthLabel); this.enemyUnitsStrengthLabel.setTextColor("green"); var3.add(var5); var var6 = new qx.ui.container.Composite(); var6.setLayout(new qx.ui.layout.HBox(5)); var6.add(new qx.ui.basic.Label("后方建筑: ")); this.enemyBuildingsStrengthLabel = new qx.ui.basic.Label("100%"); var6.add(this.enemyBuildingsStrengthLabel); this.enemyBuildingsStrengthLabel.setTextColor("green"); var3.add(var6); var var7 = new qx.ui.container.Composite(); var7.setLayout(new qx.ui.layout.HBox(5)); var7.add(new qx.ui.basic.Label("主工厂: ")); this.CYTroopStrengthLabel = new qx.ui.basic.Label("100%"); var7.add(this.CYTroopStrengthLabel); this.CYTroopStrengthLabel.setTextColor("red"); var3.add(var7); var var8 = new qx.ui.container.Composite(); var8.setLayout(new qx.ui.layout.HBox(5)); var8.add(new qx.ui.basic.Label("维修场: ")); this.DFTroopStrengthLabel = new qx.ui.basic.Label("100%"); var8.add(this.DFTroopStrengthLabel); this.DFTroopStrengthLabel.setTextColor("red"); var3.add(var8); var var9 = new qx.ui.container.Composite(); var9.setLayout(new qx.ui.layout.VBox(5)); var9.setThemedFont("bold"); var9.setThemedPadding(2); var9.setThemedBackgroundColor("#eef"); this.battleResultsBox.add(var9); var vara = new qx.ui.container.Composite(); vara.setLayout(new qx.ui.layout.HBox(5)); vara.add(new qx.ui.basic.Label("我方兵力: ")); this.simTroopDamageLabel = new qx.ui.basic.Label("100%"); vara.add(this.simTroopDamageLabel); this.simTroopDamageLabel.setTextColor("blue"); var9.add(vara); var varb = new qx.ui.container.Composite(); varb.setLayout(new qx.ui.layout.HBox(5)); varb.add(new qx.ui.basic.Label("步兵: ")); this.infantryTroopStrengthLabel = new qx.ui.basic.Label("100%"); varb.add(this.infantryTroopStrengthLabel); this.infantryTroopStrengthLabel.setTextColor("green"); var9.add(varb); var varc = new qx.ui.container.Composite(); varc.setLayout(new qx.ui.layout.HBox(5)); varc.add(new qx.ui.basic.Label("战车: ")); this.vehicleTroopStrengthLabel = new qx.ui.basic.Label("100%"); varc.add(this.vehicleTroopStrengthLabel); this.vehicleTroopStrengthLabel.setTextColor("green"); var9.add(varc); var vard = new qx.ui.container.Composite(); vard.setLayout(new qx.ui.layout.HBox(5)); vard.add(new qx.ui.basic.Label("空军: ")); this.airTroopStrengthLabel = new qx.ui.basic.Label("100%"); vard.add(this.airTroopStrengthLabel); this.airTroopStrengthLabel.setTextColor("green"); var9.add(vard); var vare = new qx.ui.container.Composite(); vare.setLayout(new qx.ui.layout.VBox(5)); vare.setThemedFont("bold"); vare.setThemedPadding(2); vare.setThemedBackgroundColor("#eef"); var varf = new qx.ui.container.Composite(); varf.setLayout(new qx.ui.layout.HBox(5)); varf.add(new qx.ui.basic.Label("是否胜利: ")); this.simVictoryLabel = new qx.ui.basic.Label("是"); varf.add(this.simVictoryLabel); this.simVictoryLabel.setTextColor("green"); vare.add(varf); var var10 = new qx.ui.container.Composite(); var10.setLayout(new qx.ui.layout.HBox(5)); var10.add(new qx.ui.basic.Label("战斗用时: ")); this.simTimeLabel = new qx.ui.basic.Label("120"); var10.add(this.simTimeLabel); this.simTimeLabel.setTextColor("black"); vare.add(var10); this.battleResultsBox.add(vare); var var11 = new qx.ui.container.Composite(); var11.setLayout(new qx.ui.layout.HBox(5)); var11.add(new qx.ui.basic.Label("模式: ")); this.degreeSelect = new qx.ui.form.SelectBox(); this.degreeSelect.add(new qx.ui.form.ListItem("快速", null, "1")); var var12 = new qx.ui.form.ListItem("一般", null, "2"); this.degreeSelect.add(var12); this.degreeSelect.add(new qx.ui.form.ListItem("深入", null, "4")); this.degreeSelect.add(new qx.ui.form.ListItem("彻底", null, "8")); this.degreeSelect.setSelection([var12]); var11.add(this.degreeSelect); vare.add(var11); var var13 = new qx.ui.container.Composite(); var13.setLayout(new qx.ui.layout.HBox(5)); var13.add(new qx.ui.basic.Label("首要: ")); this.primarySelect = new qx.ui.form.SelectBox(); var var14 = new qx.ui.form.ListItem("主工厂", null, "CY"); this.primarySelect.add(var14); this.primarySelect.add(new qx.ui.form.ListItem("我方兵力", null, "TS")); this.primarySelect.add(new qx.ui.form.ListItem("维修场", null, "DF")); this.primarySelect.add(new qx.ui.form.ListItem("敌方兵力", null, "ES")); this.primarySelect.setSelection([var14]); var13.add(this.primarySelect); vare.add(var13); var var15 = new qx.ui.container.Composite(); var15.setLayout(new qx.ui.layout.HBox(5)); var15.add(new qx.ui.basic.Label("次要: ")); this.secondarySelect = new qx.ui.form.SelectBox(); this.secondarySelect.add(new qx.ui.form.ListItem("主工厂", null, "CY")); var var16 = new qx.ui.form.ListItem("我方兵力", null, "TS"); this.secondarySelect.add(var16); this.secondarySelect.add(new qx.ui.form.ListItem("维修场", null, "DF")); this.secondarySelect.add(new qx.ui.form.ListItem("敌方兵力", null, "ES")); this.secondarySelect.setSelection([var16]); var15.add(this.secondarySelect); vare.add(var15); vare.add(this.ajaxImage); this.battleResultsBox.add(this.buttonOptimize); var var17 = qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_ATTACKSETUP); this.buttonProTools = new qx.ui.form.Button("Pro"); this.buttonProTools.set({ width: 50, appearance: "button-text-small", toolTipText: "Open Pro Simulator Tools" }); this.buttonProTools.addListener("click", this.togglePro, this); var17.add(this.buttonProTools, { top: 17, right: 7 }); localStorage.setItem("tasim_pro", true); try { var17.remove(this.buttonGetProTools); } catch(e) {}; }; TASuite.main.prototype.getCityPreArmyUnits = function() { var var17 = qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_ATTACKSETUP); var var18 = null; for (var var19 in var17) { try { if (var17[var19] instanceof ClientLib.Data.CityPreArmyUnits) { var18 = var17[var19]; break; }; } catch(e) {}; }; return var18; }; TASuite.main.prototype.closeProBox = function() { var var18 = this.getCityPreArmyUnits(); var18.remove_ArmyChanged(this.add_ArmyChanged); this.battleResultsBox.close(); }; TASuite.main.prototype.togglePro = function() { var var18 = this.getCityPreArmyUnits(); this.units = var18.m_ArmyUnits.l; if (this.battleResultsBox.isVisible()) { this.closeProBox(); } else { try { var18.add_ArmyChanged(this.add_ArmyChanged); } catch(e) { console.log(e); }; this.updateProWindow(); this.battleResultsBox.moveTo(115, 200); this.battleResultsBox.setHeight(400); this.battleResultsBox.setWidth(200); this.battleResultsBox.open(); }; }; TASuite.main.prototype.optimizeLayout = function() { try { var var18 = this.getCityPreArmyUnits(); if (this.battleResultsBox.isModal()) { this.optimizingDone(); this.updateFormation(); } else { this.battleResultsBox.setModal(true); this.battleResultsBox.setAllowClose(false); this.buttonOptimize.setLabel("取消优化"); this.ajaxImage.setVisibility("visible"); this.optimizing = true; this.updateProWindow(); this.setTargets(); this.degree = parseInt(this.degreeSelect.getSelection()[0].getModel()); this.checkBetterFormation(); }; } catch(e) { console.log(e); }; }; TASuite.main.prototype.optimizingDone = function() { this.buttonOptimize.setLabel("开始优化"); this.battleResultsBox.setAllowClose(true); this.battleResultsBox.setModal(false); this.optimizing = false; this.ajaxImage.setVisibility("none"); }; TASuite.main.prototype.updateFormation = function() { var var18 = this.getCityPreArmyUnits(); this.restoreFormation(var18.m_ArmyUnits.l); var18.UpdateArmyLayout$0(); var18.RefreshData$0(); }; TASuite.main.prototype.checkBetterFormation = function() { this.saveFormation(); var var1a = []; for (var var1b = 0; var1b < this.units.length; var1b++) { var1a.push(var1b); }; var var1c, var1d, var1e = var1a.length; if (var1e) { while (--var1e) { var1d = Math.floor(Math.random() * (var1e + 1)); var1c = var1a[var1d]; var1a[var1d] = var1a[var1e]; var1a[var1e] = var1c; }; }; this.units_list = var1a; this.currentUnit = this.units[this.units_list.pop()]; this.currentDx = this.degree; this.currentDy = this.degree; setTimeout(this.moveLoop, 1000); return false; }; TASuite.main.prototype.moveLoop = function() { ta = window.TASuite.main.getInstance(); if (!ta.optimizing) { return; }; var var1f = ta.currentUnit; var var20 = var1f.get_CoordX(); var var21 = var1f.get_CoordY(); var var22 = ta.degree; var var23 = ta.currentDx; var var24 = ta.currentDy; var23 -= 1; new_x = var23 + var20; new_y = var24 + var21; if (var24 == 0 && var23 == 0) { var23 -= 1; } else { if (new_x >= 0 && new_x < 8) { if (new_y >= 0 && new_y < 4) { var1f.MoveBattleUnit(new_x, new_y); if (ta.checkNewResults()) { ta.updateFormation(); ta.nextUnit(); return; } else { var1f.MoveBattleUnit(var20, var21); }; }; }; }; if (var23 < -var22 || var23 < 0) { var23 = var22; var24 -= 1; if (var24 < -var22 || var24 < 0) { ta.nextUnit(); return; }; }; ta.currentDx = var23; ta.currentDy = var24; setTimeout(ta.moveLoop, 10); }; TASuite.main.prototype.nextUnit = function() { if (this.units_list.length > 0) { this.currentDx = this.degree; this.currentDy = this.degree; this.currentUnit = this.units[this.units_list.pop()]; setTimeout(this.moveLoop, 10); } else { this.degree -= 1; if (this.degree > 0) { this.checkBetterFormation(); } else { this.optimizingDone(); this.updateFormation(); }; }; }; TASuite.main.prototype.setTargets = function() { var var25 = this.primarySelect.getSelection()[0].getModel(); var var26 = this.secondarySelect.getSelection()[0].getModel(); this.lastPrimary = this.getTarget(var25); this.lastSecondary = this.getTarget(var26); this.currentPrimary = this.lastPrimary; this.currentSecondary = this.lastSecondary; }; TASuite.main.prototype.getTarget = function(var19) { switch (var19) { case "DF": return this.lastDFPercentage;; case "CY": return this.lastCYPercentage;; case "TS": return this.lastPercentage;; case "ES": return this.lastEnemyPercentage;; }; }; TASuite.main.prototype.compareTargets = function() { var var27 = 1; var var28 = 1; var var25 = this.primarySelect.getSelection()[0].getModel(); var var26 = this.secondarySelect.getSelection()[0].getModel(); switch (var25) { case "ES": ; case "DF": ; case "CY": var27 = -1; break;; }; switch (var26) { case "ES": ; case "DF": ; case "CY": var28 = -1; break;; }; this.lastPrimary = this.getTarget(var25); this.lastSecondary = this.getTarget(var26); if ((this.lastPrimary * var27) > (this.currentPrimary * var27)) { return true; } else { if ((this.lastPrimary * var27) == (this.currentPrimary * var27)) { if ((this.lastSecondary * var28) > (this.currentSecondary * var28)) { return true; } else { return false; }; }; return false; }; }; TASuite.main.prototype.checkNewResults = function() { this.calculateSimResults(); if (this.compareTargets()) { this.saveFormation(); this.setTargets(); this.updateProWindow(); return true; }; return false; }; TASuite.main.prototype.restoreFormation = function(var18) { for (var var1b = 0; (var1b < var18.length); var1b++) { var var29 = this.saved_units[var1b]; var18[var1b].m_CoordX = var29.x; var18[var1b].m_CoordY = var29.y; var18[var1b].m_UnitId = var29.id; }; }; TASuite.main.prototype.saveFormation = function() { this.saved_units = []; for (var var1b = 0; (var1b < this.units.length); var1b++) { var var1f = this.units[var1b]; var var2a = {}; var2a.x = var1f.m_CoordX; var2a.y = var1f.m_CoordY; var2a.id = var1f.m_UnitId; this.saved_units.push(var2a); }; }; TASuite.main.prototype.calculateTroopStrengths = function(var2b) { var var2c = 0; var var2d = 0; var var2e = 0; var var2f = 0; var var30 = 0; var var31 = 0; var var32 = 0; var var33 = 0; var var34 = 0; var var35 = 0; var var36 = 0; var var37 = 0; var var38 = 0; var var39 = 0; this.lastDFPercentage = 0; this.lastCYPercentage = 0; var var3a = var2b.m_Entities.d; var var3b = SharedLib.Combat.ECbtAlignment.Attacker; for (var var1b in var3a) { var var3c = var3a[var1b]; var var3d = var3c.get_Entity$0(); if (var3d.m_eAlignment == var3b) { var2c += var3d.m_iHitpoints; var2d += var3d.m_iHitpointsCurrent; if (var3c.m_UnitType.AirUnit) { var38 += var3d.m_iHitpoints; var39 += var3d.m_iHitpointsCurrent; } else { if (var3c.m_UnitType.MovementType == 1) { var34 += var3d.m_iHitpoints; var35 += var3d.m_iHitpointsCurrent; } else { var36 += var3d.m_iHitpoints; var37 += var3d.m_iHitpointsCurrent; }; }; } else { var2e += var3d.m_iHitpoints; var2f += var3d.m_iHitpointsCurrent; if (var3c.m_Type == 1) { var30 += var3d.m_iHitpoints; var31 += var3d.m_iHitpointsCurrent; if (var3d.m_MDCTypeId == 195) { this.lastDFPercentage = (var3d.m_iHitpointsCurrent / var3d.m_iHitpoints) * 100; }; if (var3d.m_MDCTypeId == 177) { this.lastCYPercentage = (var3d.m_iHitpointsCurrent / var3d.m_iHitpoints) * 100; }; } else { var32 += var3d.m_iHitpoints; var33 += var3d.m_iHitpointsCurrent; }; }; }; this.lastInfantryPercentage = (var35 / var34) * 100; this.lastVehiclePercentage = (var37 / var36) * 100; this.lastAirPercentage = (var39 / var38) * 100; this.totalSeconds = (var2b.m_Simulation.m_iCombatStep * var2b.m_TimePerStep) / 1000; this.lastEnemyUnitsPercentage = (var33 / var32) * 100; this.lastEnemyBuildingsPercentage = (var31 / var30) * 100; this.lastEnemyPercentage = (var2f / var2e) * 100; this.lastPercentage = (var2d / var2c) * 100; }; TASuite.main.prototype.onViewChange = function(var3e, var3f) { window.TASuite.main.getInstance().closeProBox(); }; TASuite.main.prototype.onUnitMoved = function(var40, var41) { if (!this.optimizing) { window.TASuite.main.getInstance().updateProWindow(); }; }; TASuite.main.prototype.onDamageDone = function(var40, var41) { try { battleground = var40.DamageDone.i[0].o; if (battleground.m_CurrentStep % 10 == 0) { window.TASuite.main.getInstance().updateTroopStrength(battleground); }; } catch(var41) { console.log(var41); }; }; TASuite.main.prototype.onDefenseDestroyed = function(var40, var41) { try { battleground = var40.DamageDone.i[0].o; window.TASuite.main.getInstance().updateTroopStrength(battleground); } catch(var41) { console.log(var41); }; }; TASuite.main.prototype.calculateSimResults = function() { var var2b = this.setupBattleground(this.getCityPreArmyUnits()); while (var2b.m_Simulation.DoStep$0()) {}; this.calculateTroopStrengths(var2b); this.lastVictory = var2b.m_Simulation.m_bDestroyDefense; }; TASuite.main.prototype.updateProWindow = function() { this.calculateSimResults(); if (this.lastVictory) { this.simVictoryLabel.setValue("是"); this.simVictoryLabel.setTextColor("green"); } else { this.simVictoryLabel.setValue("否"); this.simVictoryLabel.setTextColor("red"); }; this.enemyUnitsStrengthLabel.setValue(this.lastEnemyUnitsPercentage.toFixed(2).toString()); this.enemyBuildingsStrengthLabel.setValue(this.lastEnemyBuildingsPercentage.toFixed(2).toString()); this.enemyTroopStrengthLabel.setValue(this.lastEnemyPercentage.toFixed(2).toString()); this.airTroopStrengthLabel.setValue(this.lastAirPercentage.toFixed(2).toString()); this.infantryTroopStrengthLabel.setValue(this.lastInfantryPercentage.toFixed(2).toString()); this.vehicleTroopStrengthLabel.setValue(this.lastVehiclePercentage.toFixed(2).toString()); this.CYTroopStrengthLabel.setValue(this.lastCYPercentage.toFixed(2).toString()); this.DFTroopStrengthLabel.setValue(this.lastDFPercentage.toFixed(2).toString()); this.simTimeLabel.setValue(this.totalSeconds.toFixed(2).toString()); this.simTroopDamageLabel.setValue(this.lastPercentage.toFixed(2).toString()); }; TASuite.main.getInstance().battleResultsBox.close(); TASuite.main.getInstance().initializePro();';
								head.appendChild(script);
							}
						},
						5000);

						var armyBar = qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_ATTACKSETUP);
						armyBar.add(this.buttonSimulateCombat, {
							top: 130,
							right: 0
						});
						armyBar.add(this.buttonGetProTools, {
							top: 16,
							right: 7
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
							if (oldMode == webfrontend.gui.PlayArea.PlayArea.modes.EMode_CombatSetupDefense) {
								if (newMode == webfrontend.gui.PlayArea.PlayArea.modes.EMode_PlayerDefense) {
									this.closeProBox();
								}
							}
						}
						 catch(e) {
							console.log(e);
						}
					},
					unlockAttacks: function() {
						var armyBar = qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_ATTACKSETUP);
						armyBar.remove(this.buttonUnlockAttack);
						var _this = this;
						setTimeout(function() {
							armyBar.add(_this.buttonUnlockAttack);
						},
						2000);
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
						var player_cities = ClientLib.Data.MainData.GetInstance().get_Cities();
						var current_city = player_cities.get_CurrentCity();
						try {
							app.getPlayArea().setView(webfrontend.gui.PlayArea.PlayArea.modes.EMode_CombatSetupDefense, localStorage.ta_sim_last_city, 0, 0);
						}
						 catch(e) {
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
						 catch(e) {
							console.log(e);
						}
					},
					onDefenseDestroyed: function(sender, e) {
						// Try to update the Troop Strength meter
						try {
							battleground = sender.DamageDone.i[0].o;
							window.TASuite.main.getInstance().updateTroopStrength(battleground);
						}
						 catch(e) {
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
						var app = qx.core.Init.getApplication();
						var mainData = ClientLib.Data.MainData.GetInstance();
						var vis_main = ClientLib.Vis.VisMain.GetInstance();
						var player_cities = mainData.get_Cities();
						var current_city = player_cities.get_CurrentCity();
						var own_city = player_cities.get_CurrentOwnCity();
						var battleground = vis_main.get_Battleground();

						localStorage.ta_sim_last_city = current_city.get_Id();

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
						 catch(e) {
							console.log(e);
						}

						// Add the offense, defense and base
						battleground.AddBase(current_city);

						try {
							offense_units = offense_units || own_city.m_CityArmyFormationsManager.m_ArmyFormations.d[own_city.m_CityArmyFormationsManager.m_CurrentTargetBaseId];

							battleground.AddOffense(offense_units, this.active_modules);
							battleground.AddDefense(current_city.get_CityUnitsData(), this.active_modules);
						}
						 catch(e) {
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
						 catch(e) {
							app.getPlayArea().setView(webfrontend.gui.PlayArea.modes.EMode_CombatReplay, current_city.get_Id(), 0, 0);
						}
						var battleground = this.setupBattleground();

						// Add the event listeners
						battleground.m_Simulation.add_DamageDone$0((new System.EventHandler).$ctor(this, this.onDamageDone));
						battleground.m_Simulation.add_OnDestroyDefense$0((new System.EventHandler).$ctor(this, this.onDefenseDestroyed));

						// Set the scene again, just in case it didn't work the first time
						try {
							app.getPlayArea().setView(webfrontend.gui.PlayArea.PlayArea.modes.EMode_CombatReplay, current_city.get_Id(), 0, 0);
						}
						 catch(e) {
							app.getPlayArea().setView(webfrontend.gui.PlayArea.modes.EMode_CombatReplay, current_city.get_Id(), 0, 0);
						}
					}
				}
			});
		}

		function TASuite_checkIfLoaded() {
			try {
				if (typeof qx != 'undefined') {
					a = qx.core.Init.getApplication();
					// application
					mb = qx.core.Init.getApplication().getMenuBar();
					if (a && mb) {
						createTweak();
						window.TASuite.main.getInstance().initialize();
					} else
					 window.setTimeout(TASuite_checkIfLoaded, 1000);
				} else {
					window.setTimeout(TASuite_checkIfLoaded, 1000);
				}
			} catch(e) {
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