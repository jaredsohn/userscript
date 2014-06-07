// ==UserScript==
// @name        Maelstrom ADDON Basescanner + hwao
// @namespace   http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @description Maelstrom ADDON Basescanner + hwao
// @include     http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version     1.8.4
// @author      BlinDManX, modification hwao
// @grant       none
// @copyright   2012+, Claus Neumann
// @license     CC BY-NC-ND 3.0 - http://creativecommons.org/licenses/by-nc-nd/3.0/
// ==/UserScript==
(function () {
	var MaelstromTools_Basescanner = function () {
		window.__msbs_version = "1.8.4";
		function createMaelstromTools_Basescanner() {

			qx.Class.define("Addons.BaseScannerGUI", {
				type : "singleton",
				extend : qx.ui.window.Window,
				construct : function () {
					try {
						this.base(arguments);
						console.info("Addons.BaseScannerGUI " + window.__msbs_version);
						this.T = Addons.Language.getInstance();
						this.setWidth(820);
						this.setHeight(400);
						this.setContentPadding(10);
						this.setShowMinimize(true);
						this.setShowMaximize(true);
						this.setShowClose(true);
						this.setResizable(true);
						this.setAllowMaximize(true);
						this.setAllowMinimize(true);
						this.setAllowClose(true);
						this.setShowStatusbar(false);
						this.setDecorator(null);
						this.setPadding(5);
						this.setLayout(new qx.ui.layout.VBox(3));
						this.stats.src = 'http://goo.gl/DrJ2x'; //1.5

						this.FI();
						this.FH();
						this.FD();
						if (this.ZE == null) {
							this.ZE = [];
						}
						this.setPadding(0);
						this.removeAll();

						this.add(this.ZF);
						this.add(this.ZN);

						this.add(this.ZP);
						this.ZL.setData(this.ZE);							

					} catch (e) {
						console.debug("Addons.BaseScannerGUI.construct: ", e);
					}
				},
				members : {
					// pictures
					stats : document.createElement('img'),
					T : null,
					ZA : 0,
					ZB : null,
					ZC : null,
					ZD : null,
					ZE : null,
					ZF : null,
					ZG : null,
					ZH : false,
					ZI : true,
					ZJ : null,
					ZK : null,
					ZL : null,
					ZM : null,
					ZN : null,
					ZO : null,
					ZP : null,
					ZQ : null,
					ZR : [],
					ZT : true,
					ZU : null,
					ZV : null,
					ZX : null,
					ZY : null,
					ZZ : [],
					ZS : {},
					YZ : null,
					YY : null,
					
					openWindow : function (title) {
						try {
							this.setCaption(title);
							if (this.isVisible()) {
								this.close();
							} else {
								MT_Cache.updateCityCache();
								MT_Cache = window.MaelstromTools.Cache.getInstance();
								var cname;								
								this.ZC.removeAll();
								for (cname in MT_Cache.Cities) {
									var item = new qx.ui.form.ListItem(cname, null, MT_Cache.Cities[cname].Object);
									this.ZC.add(item);
									if (Addons.LocalStorage.getserver("Basescanner_LastCityID") == MT_Cache.Cities[cname].Object.get_Id()) {
										this.ZC.setSelection([item]);
									}
								}							
								this.open();
								this.moveTo(100, 100);
							}
						} catch (e) {
							console.log("MaelstromTools.DefaultObject.openWindow: ", e);
						}
					},
					FI : function () {
						try {
							this.ZL = new qx.ui.table.model.Simple();
							this.ZL.setColumns(["ID", "LoadState", this.T.get("City"), this.T.get("Location"), this.T.get("Level"), this.T.get("Tiberium"), this.T.get("Crystal"), this.T.get("Dollar"), this.T.get("Research"), "Crystalfields", "Tiberiumfields", this.T.get("Building state"), this.T.get("Defense state"), this.T.get("CP"), "Def.HP/Off.HP", "Sum Tib+Cry+Cre", "(Tib+Cry+Cre)/CP", "CY", "DF", this.T.get("base set up at")]);
							this.YY = ClientLib.Data.MainData.GetInstance().get_Player();
							this.ZN = new qx.ui.table.Table(this.ZL);
							this.ZN.setColumnVisibilityButtonVisible(false);
							this.ZN.setColumnWidth(0, 0);
							this.ZN.setColumnWidth(1, 0);
							this.ZN.setColumnWidth(2, Addons.LocalStorage.getserver("Basescanner_ColWidth_2", 120));
							this.ZN.setColumnWidth(3, Addons.LocalStorage.getserver("Basescanner_ColWidth_3", 60));
							this.ZN.setColumnWidth(4, Addons.LocalStorage.getserver("Basescanner_ColWidth_4", 50));
							this.ZN.setColumnWidth(5, Addons.LocalStorage.getserver("Basescanner_ColWidth_5", 60));
							this.ZN.setColumnWidth(6, Addons.LocalStorage.getserver("Basescanner_ColWidth_6", 60));
							this.ZN.setColumnWidth(7, Addons.LocalStorage.getserver("Basescanner_ColWidth_7", 60));
							this.ZN.setColumnWidth(8, Addons.LocalStorage.getserver("Basescanner_ColWidth_8", 60));
							this.ZN.setColumnWidth(9, Addons.LocalStorage.getserver("Basescanner_ColWidth_9", 30));
							this.ZN.setColumnWidth(10, Addons.LocalStorage.getserver("Basescanner_ColWidth_10", 30));
							this.ZN.setColumnWidth(11, Addons.LocalStorage.getserver("Basescanner_ColWidth_11", 50));
							this.ZN.setColumnWidth(12, Addons.LocalStorage.getserver("Basescanner_ColWidth_12", 50));
							this.ZN.setColumnWidth(13, Addons.LocalStorage.getserver("Basescanner_ColWidth_13", 30));
							this.ZN.setColumnWidth(14, Addons.LocalStorage.getserver("Basescanner_ColWidth_14", 60));
							this.ZN.setColumnWidth(15, Addons.LocalStorage.getserver("Basescanner_ColWidth_15", 60));
							this.ZN.setColumnWidth(16, Addons.LocalStorage.getserver("Basescanner_ColWidth_16", 60));
							this.ZN.setColumnWidth(17, Addons.LocalStorage.getserver("Basescanner_ColWidth_17", 50));
							this.ZN.setColumnWidth(18, Addons.LocalStorage.getserver("Basescanner_ColWidth_18", 50));
							this.ZN.setColumnWidth(19, Addons.LocalStorage.getserver("Basescanner_ColWidth_19", 40));
							var c = 0;
							var tcm = this.ZN.getTableColumnModel();
							for (c = 0; c < this.ZL.getColumnCount(); c++) {
								if (c == 0 || c == 1 || c == 11 || c == 12) {
									tcm.setColumnVisible(c, Addons.LocalStorage.getserver("Basescanner_Column_" + c, false));
								} else {
									tcm.setColumnVisible(c, Addons.LocalStorage.getserver("Basescanner_Column_" + c, true));
								}
							}

							tcm.setColumnVisible(1, false);
							tcm.setHeaderCellRenderer(9, new qx.ui.table.headerrenderer.Icon(MT_Base.images[MaelstromTools.Statics.Crystal]), "Crystalfields");
							tcm.setHeaderCellRenderer(10, new qx.ui.table.headerrenderer.Icon(MT_Base.images[MaelstromTools.Statics.Tiberium], "Tiberiumfields"));
							tcm.setDataCellRenderer(5, new qx.ui.table.cellrenderer.Replace().set({
									ReplaceFunction : this.FA
								}));
							tcm.setDataCellRenderer(6, new qx.ui.table.cellrenderer.Replace().set({
									ReplaceFunction : this.FA
								}));
							tcm.setDataCellRenderer(7, new qx.ui.table.cellrenderer.Replace().set({
									ReplaceFunction : this.FA
								}));
							tcm.setDataCellRenderer(8, new qx.ui.table.cellrenderer.Replace().set({
									ReplaceFunction : this.FA
								}));
							tcm.setDataCellRenderer(15, new qx.ui.table.cellrenderer.Replace().set({
									ReplaceFunction : this.FA
								}));
							tcm.setDataCellRenderer(16, new qx.ui.table.cellrenderer.Replace().set({
									ReplaceFunction : this.FA
								}));
							tcm.setDataCellRenderer(19, new qx.ui.table.cellrenderer.Boolean());

							this.ZN.addListener("cellDblclick", function (e) {
								Addons.BaseScannerGUI.getInstance().FB(e);
							}, this);
							tcm.addListener("widthChanged", function (e) {
								//console.log(e, e.getData());
								var col = e.getData().col;
								var width = e.getData().newWidth;
								Addons.LocalStorage.setserver("Basescanner_ColWidth_" + col, width);
							}, tcm);

						} catch (e) {
							console.debug("Addons.BaseScannerGUI.FI: ", e);
						}
					},
					FB : function (e) {
						try {
							console.log("e",e.getRow(),this.ZE);
							var cityId = this.ZE[e.getRow()][0];
							var posData = this.ZE[e.getRow()][3];
							/* center screen */
							if (posData != null && posData.split(':').length == 2) {
								var posX = parseInt(posData.split(':')[0]);
								var posY = parseInt(posData.split(':')[1]);
								ClientLib.Vis.VisMain.GetInstance().CenterGridPosition(posX, posY);
							}
							/* and highlight base */
							if (cityId && !(this.ZK[4].getValue())) {
								//ClientLib.Data.MainData.GetInstance().get_Cities().set_CurrentCityId(cityId);
								//webfrontend.gui.UtilView.openCityInMainWindow(cityId);
								//webfrontend.gui.UtilView.openVisModeInMainWindow(1, cityId, false);
								var bk = qx.core.Init.getApplication();
								bk.getBackgroundArea().closeCityInfo();
								bk.getPlayArea().setView(ClientLib.Data.PlayerAreaViewMode.pavmCombatSetupDefense, cityId, 0, 0);
							}

							var q = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
							if (q != null)
								q.get_CityArmyFormationsManager().set_CurrentTargetBaseId(cityId);

						} catch (ex) {
							console.debug("Addons.BaseScannerGUI FB error: ", ex);
						}
					},
					FN : function (e) {
						this.ZG.setLabel(this.T.get("Scan"));
						this.ZH = false;
					},
					CBChanged : function (e) {
						this.ZH = false;
					},
					FA : function (oValue) {
						var f = new qx.util.format.NumberFormat();
						f.setGroupingUsed(true);
						f.setMaximumFractionDigits(3);
						if (!isNaN(oValue)) {
							if (Math.abs(oValue) < 100000)
								oValue = f.format(Math.floor(oValue));
							else if (Math.abs(oValue) >= 100000 && Math.abs(oValue) < 1000000)
								oValue = f.format(Math.floor(oValue / 100) / 10) + "k";
							else if (Math.abs(oValue) >= 1000000 && Math.abs(oValue) < 10000000)
								oValue = f.format(Math.floor(oValue / 1000) / 1000) + "M";
							else if (Math.abs(oValue) >= 10000000 && Math.abs(oValue) < 100000000)
								oValue = f.format(Math.floor(oValue / 10000) / 100) + "M";
							else if (Math.abs(oValue) >= 100000000 && Math.abs(oValue) < 1000000000)
								oValue = f.format(Math.floor(oValue / 100000) / 10) + "M";
							else if (Math.abs(oValue) >= 1000000000 && Math.abs(oValue) < 10000000000)
								oValue = f.format(Math.floor(oValue / 1000000) / 1000) + "G";
							else if (Math.abs(oValue) >= 10000000000 && Math.abs(oValue) < 100000000000)
								oValue = f.format(Math.floor(oValue / 10000000) / 100) + "G";
							else if (Math.abs(oValue) >= 100000000000 && Math.abs(oValue) < 1000000000000)
								oValue = f.format(Math.floor(oValue / 100000000) / 10) + "G";
							else if (Math.abs(oValue) >= 1000000000000 && Math.abs(oValue) < 10000000000000)
								oValue = f.format(Math.floor(oValue / 1000000000) / 1000) + "T";
							else if (Math.abs(oValue) >= 10000000000000 && Math.abs(oValue) < 100000000000000)
								oValue = f.format(Math.floor(oValue / 10000000000) / 100) + "T";
							else if (Math.abs(oValue) >= 100000000000000 && Math.abs(oValue) < 1000000000000000)
								oValue = f.format(Math.floor(oValue / 100000000000) / 10) + "T";
							else if (Math.abs(oValue) >= 1000000000000000)
								oValue = f.format(Math.floor(oValue / 1000000000000)) + "T";
						};
						return oValue.toString();
					},
					// updateCache : function () {
					// try {}
					// catch (e) {
					// console.debug("Addons.BaseScannerGUI.updateCache: ", e);
					// }
					// },
					// setWidgetLabels : function () {
					// try {
					// if (!this.ZL) {
					// this.FC();
					// }
					// this.ZL.setData(this.ZE);
					// } catch (e) {
					// console.debug("Addons.BaseScannerGUI.setWidgetLabels: ", e);
					// }
					// },
					FH : function () {
						try {
							var oBox = new qx.ui.layout.Flow();
							var oOptions = new qx.ui.container.Composite(oBox);
							this.ZC = new qx.ui.form.SelectBox();
							this.ZC.setHeight(25);
							this.ZC.setMargin(5);
							MT_Cache.updateCityCache();
							MT_Cache = window.MaelstromTools.Cache.getInstance();
							var cname;							
							for (cname in MT_Cache.Cities) {
								var item = new qx.ui.form.ListItem(cname, null, MT_Cache.Cities[cname].Object);
								this.ZC.add(item);
								if (Addons.LocalStorage.getserver("Basescanner_LastCityID") == MT_Cache.Cities[cname].Object.get_Id()) {
									this.ZC.setSelection([item]);
								}
							}
							this.ZC.addListener("changeSelection", function (e) {								
								this.FP(0, 1, 200);
								this.ZH = false;
								this.ZG.setLabel(this.T.get("Scan"));
							}, this);
							oOptions.add(this.ZC);

							var l = new qx.ui.basic.Label().set({
									value : this.T.get("CP Limit"),
									textColor : "white",
									margin : 5
								});
							oOptions.add(l);

							this.ZQ = new qx.ui.form.SelectBox();
							this.ZQ.setWidth(50);
							this.ZQ.setHeight(25);
							this.ZQ.setMargin(5);
							var limiter = Addons.LocalStorage.getserver("Basescanner_Cplimiter", 25);
							for (var m = 11; m < 41; m += 1) {
								item = new qx.ui.form.ListItem("" + m, null, m);
								this.ZQ.add(item);
								if (limiter == m) {
									this.ZQ.setSelection([item]);
								}
							}
							this.ZQ.addListener("changeSelection", function (e) {
								this.ZE = [];
								this.FP(0, 1, 200);
								this.ZH = false;
								this.ZG.setLabel(this.T.get("Scan"));
							}, this);
							oOptions.add(this.ZQ);

							var la = new qx.ui.basic.Label().set({
									value : this.T.get("min Level"),
									textColor : "white",
									margin : 5
								});
							oOptions.add(la);
							var minlevel = Addons.LocalStorage.getserver("Basescanner_minLevel", "1");
							this.ZY = new qx.ui.form.TextField(minlevel).set({
									width : 50
								});
							oOptions.add(this.ZY);

							this.ZK = [];
							this.ZK[0] = new qx.ui.form.CheckBox(this.T.get("Player"));
							this.ZK[0].setMargin(5);
							this.ZK[0].setTextColor("white");
							this.ZK[0].setValue(Addons.LocalStorage.getserver("Basescanner_Show0", false));
							this.ZK[0].addListener("changeValue", function (e) {
								this.ZE = [];
								this.FP(0, 1, 200);
								this.ZH = false;
								this.ZG.setLabel(this.T.get("Scan"));
							}, this);
							oOptions.add(this.ZK[0]);
							this.ZK[1] = new qx.ui.form.CheckBox(this.T.get("Bases"));
							this.ZK[1].setMargin(5);
							this.ZK[1].setTextColor("white");
							this.ZK[1].setValue(Addons.LocalStorage.getserver("Basescanner_Show1", false));
							this.ZK[1].addListener("changeValue", function (e) {
								this.ZE = [];
								this.FP(0, 1, 200);
								this.ZH = false;
								this.ZG.setLabel(this.T.get("Scan"));
							}, this);
							oOptions.add(this.ZK[1]);
							this.ZK[2] = new qx.ui.form.CheckBox(this.T.get("Outpost"));
							this.ZK[2].setMargin(5);
							this.ZK[2].setTextColor("white");
							this.ZK[2].setValue(Addons.LocalStorage.getserver("Basescanner_Show2", false));
							this.ZK[2].addListener("changeValue", function (e) {
								this.ZE = [];
								this.FP(0, 1, 200);
								this.ZH = false;
								this.ZG.setLabel(this.T.get("Scan"));
							}, this);
							oOptions.add(this.ZK[2]);
							this.ZK[3] = new qx.ui.form.CheckBox(this.T.get("Camp"));
							this.ZK[3].setMargin(5);
							this.ZK[3].setTextColor("white");
							this.ZK[3].setValue(Addons.LocalStorage.getserver("Basescanner_Show3", true));
							this.ZK[3].addListener("changeValue", function (e) {
								this.ZE = [];
								this.FP(0, 1, 200);
								this.ZH = false;
								this.ZG.setLabel(this.T.get("Scan"));
							}, this);
							oOptions.add(this.ZK[3], {
								lineBreak : true
							});

							this.ZG = new qx.ui.form.Button(this.T.get("Scan")).set({
									width : 100,
									minWidth : 100,
									maxWidth : 100,
									height : 25,
									margin : 5
								});
							this.ZG.addListener("execute", function () {

								this.FE();
							}, this);
							oOptions.add(this.ZG);

							var border = new qx.ui.decoration.Single(2, "solid", "blue");
							this.ZV = new qx.ui.container.Composite(new qx.ui.layout.Basic()).set({
									decorator : border,
									backgroundColor : "red",
									allowGrowX : false,
									height : 20,
									width : 200
								});
							this.ZU = new qx.ui.core.Widget().set({
									decorator : null,
									backgroundColor : "green",
									width : 0
								});
							this.ZV.add(this.ZU);
							this.ZX = new qx.ui.basic.Label("").set({
									decorator : null,
									textAlign : "center",
									width : 200
								});
							this.ZV.add(this.ZX, {
								left : 0,
								top : -3
							});
							oOptions.add(this.ZV);

							this.YZ = new qx.ui.form.Button(this.T.get("clear Cache")).set({
									minWidth : 100,
									height : 25,
									margin : 5
								});
							this.YZ.addListener("execute", function () {
								this.ZZ = [];
							}, this);
							oOptions.add(this.YZ);

							this.ZK[4] = new qx.ui.form.CheckBox(this.T.get("Only center on World"));
							this.ZK[4].setMargin(5);
							this.ZK[4].setTextColor("white");
							oOptions.add(this.ZK[4], {
								lineBreak : true
							});

							this.ZJ = new qx.ui.form.SelectBox();
							this.ZJ.setWidth(150);
							this.ZJ.setHeight(25);
							this.ZJ.setMargin(5);
							var item = new qx.ui.form.ListItem("7 " + this.T.get(MaelstromTools.Statics.Tiberium) + " 5 " + this.T.get(MaelstromTools.Statics.Crystal), null, 7);
							this.ZJ.add(item);
							item = new qx.ui.form.ListItem("6 " + this.T.get(MaelstromTools.Statics.Tiberium) + " 6 " + this.T.get(MaelstromTools.Statics.Crystal), null, 6);
							this.ZJ.add(item);
							item = new qx.ui.form.ListItem("5 " + this.T.get(MaelstromTools.Statics.Tiberium) + " 7 " + this.T.get(MaelstromTools.Statics.Crystal), null, 5);
							this.ZJ.add(item);
							oOptions.add(this.ZJ);
							this.ZD = new qx.ui.form.Button(this.T.get("Get Layouts")).set({
									width : 120,
									minWidth : 120,
									maxWidth : 120,
									height : 25,
									margin : 5
								});
							this.ZD.addListener("execute", function () {
								var layout = window.Addons.BaseScannerLayout.getInstance();
								layout.openWindow(this.T.get("BaseScanner Layout"));
							}, this);
							this.ZD.setEnabled(false);
							oOptions.add(this.ZD);

							this.ZB = new qx.ui.container.Composite();
							this.ZB.setLayout(new qx.ui.layout.Flow());
							this.ZB.setWidth(750);
							//oOptions.add(this.ZB, {flex:1});

							var J = webfrontend.gui.layout.Loader.getInstance();
							//var L = J.getLayout("playerbar", this);
							//this._ZZ = J.getElement(L, "objid", 'lblplayer');


							//this.tableSettings = new qx.ui.groupbox.GroupBox("Visable Columns");
							//box.add(this.tableSettings, {flex:1});
							var k = 2;
							for (k = 2; k < this.ZL.getColumnCount(); k++) {
								var index = k - 2;

								this.ZR[index] = new qx.ui.form.CheckBox(this.ZL.getColumnName(k));
								this.ZR[index].setValue(this.ZN.getTableColumnModel().isColumnVisible(k));
								this.ZR[index].setTextColor("white");
								this.ZR[index].index = k;
								this.ZR[index].table = this.ZN;
								this.ZR[index].addListener("changeValue", function (e) {
									//console.log("click", e, e.getData(), this.index);
									var tcm = this.table.getTableColumnModel();
									tcm.setColumnVisible(this.index, e.getData());
									Addons.LocalStorage.setserver("Basescanner_Column_" + this.index, e.getData());
								});
								this.ZB.add(this.ZR[index]);
								//this.tableSettings.add( this.ZR[index] );
							}

							this.ZO = new qx.ui.form.Button("+").set({
									margin : 5
								});
							this.ZO.addListener("execute", function () {
								if (this.ZI) {
									oOptions.addAfter(this.ZB, this.ZO);
									this.ZO.setLabel("-");
								} else {
									oOptions.remove(this.ZB);
									this.ZO.setLabel("+");
								}
								this.ZI = !this.ZI;
							}, this);
							this.ZO.setAlignX("right");
							oOptions.add(this.ZO, {
								lineBreak : true
							});

							this.ZF = oOptions;

						} catch (e) {
							console.debug("Addons.BaseScannerGUI.createOptions: ", e);
						}
					},
					FD : function () {
						//0.7
						//var n = ClientLib.Data.MainData.GetInstance().get_Cities();
						//var i = n.get_CurrentOwnCity();
						var st = '<a href="https://sites.google.com/site/blindmanxdonate" target="_blank">Support Development of BlinDManX Addons</a>';
						var l = new qx.ui.basic.Label().set({
								value : st,
								rich : true,
								width : 800
							});
						this.ZP = l;
					},
					FE : function () {
						var selectedBase = this.ZC.getSelection()[0].getModel();
						ClientLib.Vis.VisMain.GetInstance().CenterGridPosition(selectedBase.get_PosX(), selectedBase.get_PosY()); //Load data of region
						ClientLib.Vis.VisMain.GetInstance().Update();
						ClientLib.Vis.VisMain.GetInstance().ViewUpdate();
						ClientLib.Data.MainData.GetInstance().get_Cities().set_CurrentCityId(selectedBase.get_Id());

						if (this.ZT) {
							var obj = ClientLib.Data.WorldSector.WorldObjectCity.prototype;
							// var fa = foundfnkstring(obj['$ctor'], /=0;this\.(.{6})=g>>7&255;.*d\+=f;this\.(.{6})=\(/, "ClientLib.Data.WorldSector.WorldObjectCity", 2);
							var fa = foundfnkstring(obj['$ctor'], /this\.(.{6})=\(?\(?g>>8\)?\&.*d\+=f;this\.(.{6})=\(/, "ClientLib.Data.WorldSector.WorldObjectCity", 2);
							if (fa != null && fa[1].length == 6) {
								obj.getLevel = function () {
									return this[fa[1]];
								};
							} else {
								console.error("Error - ClientLib.Data.WorldSector.WorldObjectCity.Level undefined");
							}
							if (fa != null && fa[2].length == 6) {
								obj.getID = function () {
									return this[fa[2]];
								};
							} else {
								console.error("Error - ClientLib.Data.WorldSector.WorldObjectCity.ID undefined");
							}

							obj = ClientLib.Data.WorldSector.WorldObjectNPCBase.prototype;
							//var fb = foundfnkstring(obj['$ctor'], /100;this\.(.{6})=Math.floor.*d\+=f;this\.(.{6})=\(/, "ClientLib.Data.WorldSector.WorldObjectNPCBase", 2);
							var fb = foundfnkstring(obj['$ctor'], /100\){0,1};this\.(.{6})=Math.floor.*d\+=f;this\.(.{6})=\(/, "ClientLib.Data.WorldSector.WorldObjectNPCBase", 2);
							if (fb != null && fb[1].length == 6) {
								obj.getLevel = function () {
									return this[fb[1]];
								};
							} else {
								console.error("Error - ClientLib.Data.WorldSector.WorldObjectNPCBase.Level undefined");
							}
							if (fb != null && fb[2].length == 6) {
								obj.getID = function () {
									return this[fb[2]];
								};
							} else {
								console.error("Error - ClientLib.Data.WorldSector.WorldObjectNPCBase.ID undefined");
							}

							obj = ClientLib.Data.WorldSector.WorldObjectNPCCamp.prototype;
							//var fc = foundfnkstring(obj['$ctor'], /100;this\.(.{6})=Math.floor.*=-1;\}this\.(.{6})=\(/, "ClientLib.Data.WorldSector.WorldObjectNPCCamp", 2);
							var fc = foundfnkstring(obj['$ctor'], /100\){0,1};this\.(.{6})=Math.floor.*this\.(.{6})=\(*g\>\>(22|0x16)\)*\&.*=-1;\}this\.(.{6})=\(/, "ClientLib.Data.WorldSector.WorldObjectNPCCamp", 4);
							if (fc != null && fc[1].length == 6) {
								obj.getLevel = function () {
									return this[fc[1]];
								};
							} else {
								console.error("Error - ClientLib.Data.WorldSector.WorldObjectNPCCamp.Level undefined");
							}
							if (fc != null && fc[2].length == 6) {
								obj.getCampType = function () {
									return this[fc[2]];
								};
							} else {
								console.error("Error - ClientLib.Data.WorldSector.WorldObjectNPCCamp.CampType undefined");
							}

							if (fc != null && fc[4].length == 6) {
								obj.getID = function () {
									return this[fc[4]];
								};
							} else {
								console.error("Error - ClientLib.Data.WorldSector.WorldObjectNPCCamp.ID undefined");
							}
							this.ZT = false;
						}

						//Firstscan
						if (this.ZE == null) {
							this.ZH = false;
							this.ZG.setLabel("Pause");
							this.ZD.setEnabled(false);
							window.setTimeout("window.Addons.BaseScannerGUI.getInstance().FJ()", 1000);
							return;
						}
						//After Pause
						var c = 0;
						for (i = 0; i < this.ZE.length; i++) {
							if (this.ZE[i][1] == -1) {
								c++;
							}
						}

						if (!this.ZH) {
							this.ZG.setLabel("Pause");
							this.ZD.setEnabled(false);
							if (c > 0) {
								this.ZH = true;
								window.setTimeout("window.Addons.BaseScannerGUI.getInstance().FG()", 1000);
								return;
							} else {
								this.ZH = false;
								window.setTimeout("window.Addons.BaseScannerGUI.getInstance().FJ()", 1000);
							}
						} else {
							this.ZH = false;
							this.ZG.setLabel(this.T.get("Scan"));
						}

					},
					FP : function (value, max, maxwidth) {
						if (this.ZU != null && this.ZX != null) {
							this.ZU.setWidth(parseInt(value / max * maxwidth, 10));
							this.ZX.setValue(value + "/" + max);
						}
					},
					FJ : function () {
						try {
							this.ZM = {};
							this.ZE = [];
							var selectedBase = this.ZC.getSelection()[0].getModel();
							Addons.LocalStorage.setserver("Basescanner_LastCityID", selectedBase.get_Id());
							var ZQ = this.ZQ.getSelection()[0].getModel();
							Addons.LocalStorage.setserver("Basescanner_Cplimiter", ZQ);
							Addons.LocalStorage.setserver("Basescanner_minLevel", this.ZY.getValue());

							var c1 = this.ZK[0].getValue();
							var c2 = this.ZK[1].getValue();
							var c3 = this.ZK[2].getValue();
							var c4 = this.ZK[3].getValue();
							var c5 = parseInt(this.ZY.getValue(), 10);
							//console.log("Select", c1, c2, c3,c4,c5);
							Addons.LocalStorage.setserver("Basescanner_Show0", c1);
							Addons.LocalStorage.setserver("Basescanner_Show1", c2);
							Addons.LocalStorage.setserver("Basescanner_Show2", c3);
							Addons.LocalStorage.setserver("Basescanner_Show3", c4);
							var posX = selectedBase.get_PosX();
							var posY = selectedBase.get_PosY();
							var scanX = 0;
							var scanY = 0;
							var world = ClientLib.Data.MainData.GetInstance().get_World();
							console.info("Scanning from: " + selectedBase.get_Name());

							// world.CheckAttackBase (System.Int32 targetX ,System.Int32 targetY) -> ClientLib.Data.EAttackBaseResult
							// world.CheckAttackBaseRegion (System.Int32 targetX ,System.Int32 targetY) -> ClientLib.Data.EAttackBaseResult
							var t1 = true;
							var t2 = true;
							var t3 = true;

							var maxAttackDistance = ClientLib.Data.MainData.GetInstance().get_Server().get_MaxAttackDistance();
							for (scanY = posY - Math.floor(maxAttackDistance + 1); scanY <= posY + Math.floor(maxAttackDistance + 1); scanY++) {
								for (scanX = posX - Math.floor(maxAttackDistance + 1); scanX <= posX + Math.floor(maxAttackDistance + 1); scanX++) {
									var distX = Math.abs(posX - scanX);
									var distY = Math.abs(posY - scanY);
									var distance = Math.sqrt((distX * distX) + (distY * distY));
									if (distance <= maxAttackDistance) {
										var object = world.GetObjectFromPosition(scanX, scanY);
										var loot = {};
										if (object) {
											//console.log(object);

											if (object.Type == 1 && t1) {
												//console.log("object typ 1");
												//objfnkstrON(object);
												//t1 = !t1;
											}
											if (object.Type == 2 && t2) {
												//console.log("object typ 2");
												//objfnkstrON(object);
												//t2 = !t2;
											}

											if (object.Type == 3 && t3) {

												//console.log("object typ 3");
												//objfnkstrON(object);
												//t3 = !t3;
											}

											if (object.Type == 3) {
												if (c5 <= parseInt(object.getLevel(), 10)) {
													//console.log(object);
												}
											}

											//if(object.ConditionBuildings>0){
											var needcp = selectedBase.CalculateAttackCommandPointCostToCoord(scanX, scanY);
											if (needcp <= ZQ && typeof object.getLevel == 'function') {
												if (c5 <= parseInt(object.getLevel(), 10)) {
													// 0:ID , 1:Scanned, 2:Name, 3:Location, 4:Level, 5:Tib, 6:Kristal, 7:Credits, 8:Forschung, 9:Kristalfelder, 10:Tiberiumfelder,
													// 11:ConditionBuildings,12:ConditionDefense,13: CP pro Angriff , 14: defhp/offhp , 15:sum tib,krist,credits, 16: sum/cp
													var d = this.FL(object.getID(), 0);
													var e = this.FL(object.getID(), 1);
													if (e != null) {
														this.ZM[object.getID()] = e;
													}

													if (object.Type == 1 && c1) { //User
														//console.log("object ID LEVEL", object.getID() ,object.getLevel() );
														if (d != null) {
															this.ZE.push(d);
														} else {
															this.ZE.push([object.getID(),  - 1, this.T.get("Player"), scanX + ":" + scanY, object.getLevel(), 0, 0, 0, 0, 0, 0, 0, 0, needcp, 0, 0, 0, 0]);
														}
													}
													if (object.Type == 2 && c2) { //basen
														//console.log("object ID LEVEL", object.getID() ,object.getLevel() );
														if (d != null) {
															this.ZE.push(d);
														} else {
															this.ZE.push([object.getID(),  - 1, this.T.get("Bases"), scanX + ":" + scanY, object.getLevel(), 0, 0, 0, 0, 0, 0, 0, 0, needcp, 0, 0, 0, 0]);
														}
													}
													if (object.Type == 3 && (c3 || c4)) { //Lager Vposten
														//console.log("object ID LEVEL", object.getID() ,object.getLevel() );
														if (d != null) {
															if (object.getCampType() == 2 && c4) {
																this.ZE.push(d);
															}
															if (object.getCampType() == 3 && c3) {
																this.ZE.push(d);
															}

														} else {
															if (object.getCampType() == 2 && c4) {
																this.ZE.push([object.getID(),  - 1, this.T.get("Camp"), scanX + ":" + scanY, object.getLevel(), 0, 0, 0, 0, 0, 0, 0, 0, needcp, 0, 0, 0, 0]);
															}
															if (object.getCampType() == 3 && c3) {
																this.ZE.push([object.getID(),  - 1, this.T.get("Outpost"), scanX + ":" + scanY, object.getLevel(), 0, 0, 0, 0, 0, 0, 0, 0, needcp, 0, 0, 0, 0]);
															}
														}
													}
												}
											}
											//}
										}
									}
								}
							}
							this.ZH = true;
							this.ZL.setData(this.ZE);
							this.FP(0, this.ZE.length, 200);
							this.ZL.sortByColumn(4, false); //Sort form Highlevel to Lowlevel
							if (this.YY.name != "DR01D")
								window.setTimeout("window.Addons.BaseScannerGUI.getInstance().FG()", 50);
						} catch (ex) {
							console.debug("Maelstrom_Basescanner FJ error: ", ex);
						}
					},
					FG : function () {
						try {
							var retry = false;
							var loops = 0;
							var maxLoops = 10;
							var i = 0;
							var sleeptime = 150;
							while (!retry) {
								var ncity = null;
								var selectedid = 0;
								var id = 0;
								if (this.ZE == null) {
									console.warn("data null: ");
									this.ZH = false;
									break;
								}
								for (i = 0; i < this.ZE.length; i++) {
									// 1= "LoadState"
									if (this.ZE[i][1] == -1) {
										break;
									}
								}

								if (i == this.ZE.length) {
									this.ZH = false;
								}
								this.FP(i, this.ZE.length, 200); //Progressbar
								if (this.ZE[i] == null) {
									console.warn("data[i] null: ");
									this.ZH = false;
									this.ZG.setLabel(this.T.get("Scan"));
									this.ZD.setEnabled(true);
									break;
								}
								posData = this.ZE[i][3];
								/* make sure coordinates are well-formed enough */
								if (posData != null && posData.split(':').length == 2) {
									posX = parseInt(posData.split(':')[0]);
									posY = parseInt(posData.split(':')[1]);
									/* check if there is any base */
									var playerbase = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
									var world = ClientLib.Data.MainData.GetInstance().get_World();
									var foundbase = world.CheckFoundBase(posX, posY, playerbase.get_PlayerId(), playerbase.get_AllianceId());
									//console.log("foundbase",foundbase);
									this.ZE[i][19] = (foundbase == 0) ? true : false;
									//var obj = ClientLib.Vis.VisMain.GetInstance().get_SelectedObject();
									//console.log("obj", obj);
									id = this.ZE[i][0];
									ClientLib.Data.MainData.GetInstance().get_Cities().set_CurrentCityId(id);
									ncity = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(id);
									//console.log("ncity", ncity);
									if (ncity != null) {
										if (!ncity.get_IsGhostMode()) {
											//if(ncity.get_Name() != null)
											//console.log("ncity.get_Name ", ncity.get_Name() , ncity.get_CityBuildingsData().get_Buildings());
											//var cityBuildings = ncity.get_CityBuildingsData();
											var cityUnits = ncity.get_CityUnitsData();
											if (cityUnits != null) { // cityUnits !=null können null sein
												//console.log("ncity.cityUnits", cityUnits );

												var selectedBase = this.ZC.getSelection()[0].getModel();
												var buildings = ncity.get_Buildings().d;
												var defenseUnits = cityUnits.get_DefenseUnits().d;
												var offensivUnits = selectedBase.get_CityUnitsData().get_OffenseUnits().d;
												//console.log(buildings,defenseUnits,offensivUnits);

												if (buildings != null) //defenseUnits !=null können null sein
												{
													var buildingLoot = getResourcesPart(buildings);
													var unitLoot = getResourcesPart(defenseUnits);

													//console.log("buildingLoot", buildingLoot);
													//console.log("unitLoot", unitLoot);
													this.ZE[i][2] = ncity.get_Name();
													this.ZE[i][5] = buildingLoot[ClientLib.Base.EResourceType.Tiberium] + unitLoot[ClientLib.Base.EResourceType.Tiberium];
													this.ZE[i][6] = buildingLoot[ClientLib.Base.EResourceType.Crystal] + unitLoot[ClientLib.Base.EResourceType.Crystal];
													this.ZE[i][7] = buildingLoot[ClientLib.Base.EResourceType.Gold] + unitLoot[ClientLib.Base.EResourceType.Gold];
													this.ZE[i][8] = buildingLoot[ClientLib.Base.EResourceType.ResearchPoints] + unitLoot[ClientLib.Base.EResourceType.ResearchPoints];
													//console.log(posX,posY,"GetBuildingsConditionInPercent", ncity.GetBuildingsConditionInPercent() );
													if (ncity.GetBuildingsConditionInPercent() != 0) {
														this.ZA = 0;
														if (this.ZE[i][5] != 0) {
															var c = 0;
															var t = 0;
															var m = 0;
															var k = 0;
															var l = 0;
															this.ZM[id] = new Array(9);
															for (m = 0; m < 9; m++) {
																this.ZM[id][m] = new Array(8);
															}
															for (k = 0; k < 9; k++) {
																for (l = 0; l < 8; l++) {
																	//console.log( ncity.GetResourceType(k,l) );
																	switch (ncity.GetResourceType(k, l)) {
																	case 1:
																		/* Crystal */
																		this.ZM[id][k][l] = 1;
																		c++;
																		break;
																	case 2:
																		/* Tiberium */
																		this.ZM[id][k][l] = 2;
																		t++;
																		break;
																	default:
																		//none
																		break;
																	}
																}
															}
															//console.log( c,t );


															this.ZE[i][9] = c;
															this.ZE[i][10] = t;
															this.ZE[i][11] = ncity.GetBuildingsConditionInPercent();
															this.ZE[i][12] = ncity.GetDefenseConditionInPercent();

															try {
																var u = offensivUnits;
																//console.log("OffenseUnits",u);
																var offhp = 0;
																var defhp = 0;
																for (var g in u) {
																	offhp += u[g].get_Health();
																}

																u = defenseUnits;
																//console.log("DefUnits",u);
																for (var g in u) {
																	defhp += u[g].get_Health();
																}

																u = buildings;
																//console.log("DefUnits",u);
																for (var g in u) {
																	//var id=0;
																	//console.log("MdbUnitId",u[g].get_MdbUnitId());
																	var mid = u[g].get_MdbUnitId();
																	//DF
																	if (mid == 158 || mid == 131 || mid == 195) {
																		this.ZE[i][18] = 8 - u[g].get_CoordY();
																	}
																	//CY
																	if (mid == 112 || mid == 151 || mid == 177) {
																		this.ZE[i][17] = 8 - u[g].get_CoordY();
																	}
																}

																//console.log("HPs",offhp,defhp, (defhp/offhp) );
															} catch (x) {
																console.debug("HPRecord", x);
															}
															this.ZE[i][14] = (defhp / offhp);

															this.ZE[i][15] = this.ZE[i][5] + this.ZE[i][6] + this.ZE[i][7];
															this.ZE[i][16] = this.ZE[i][15] / this.ZE[i][13];

															this.ZE[i][1] = 0;
															retry = true;
															console.info(ncity.get_Name(), " finish");
															this.ZA = 0;
															this.countlastidchecked = 0;
															//console.log(this.ZE[i],this.ZM[id],id);
															this.FK(this.ZE[i], this.ZM[id], id);
															//update table
															this.ZL.setData(this.ZE);
														}
													} else {
														if (this.ZA > 250) {
															console.info(this.ZE[i][2], " on ", posX, posY, " removed (GetBuildingsConditionInPercent == 0)");
															this.ZE.splice(i, 1); //entfernt element aus array
															this.ZA = 0;
															this.countlastidchecked = 0;
															break;
														}
														this.ZA++;
													}
												}
											}
										} else {
											console.info(this.ZE[i][2], " on ", posX, posY, " removed (IsGhostMode)");
											this.ZE.splice(i, 1); //entfernt element aus array
											break;
										}
									}
								}
								loops++;
								if (loops >= maxLoops) {
									retry = true;
									break;
								}
							}

							//console.log("getResourcesByID end ", this.ZH, Addons.BaseScannerGUI.getInstance().isVisible());
							if (this.lastid != i) {
								this.lastid = i;
								this.countlastidchecked = 0;
								this.ZA = 0;
							} else {
								if (this.countlastidchecked > 16) {
									console.info(this.ZE[i][2], " on ", posX, posY, " removed (found no data)");
									this.ZE.splice(i, 1); //entfernt element aus array
									this.countlastidchecked = 0;
								} else if (this.countlastidchecked > 10) {
									sleeptime = 500;
								} else if (this.countlastidchecked > 4) {
									sleeptime = 250;
								}
								this.countlastidchecked++;
							}
							//console.log("this.ZH", this.ZH);
							if (this.ZH && Addons.BaseScannerGUI.getInstance().isVisible()) {
								//console.log("loop");
								window.setTimeout("window.Addons.BaseScannerGUI.getInstance().FG()", sleeptime);
							} else {
								this.ZG.setLabel(this.T.get("Scan"));
								this.ZH = false;
							}
						} catch (e) {
							console.debug("MaelstromTools_Basescanner getResources", e);
						}
					},
					FK : function (dataa, datab, id) {
						this.ZZ.push(dataa);
						this.ZS[id] = datab;
					},
					FL : function (id, t) {
						if (t == 0) {
							for (var i = 0; i < this.ZZ.length; i++) {
								if (this.ZZ[i][0] == id) {
									return this.ZZ[i];
								}
							}
						} else {
							if (this.ZS[id]) {
								return this.ZS[id];
							}
						}
						return null;
					}

				}
			});

			qx.Class.define("Addons.BaseScannerLayout", {
				type : "singleton",
				extend : qx.ui.window.Window,
				construct : function () {
					try {
						this.base(arguments);
						console.info("Addons.BaseScannerLayout " + window.__msbs_version);
						this.setWidth(820);
						this.setHeight(400);
						this.setContentPadding(10);
						this.setShowMinimize(false);
						this.setShowMaximize(true);
						this.setShowClose(true);
						this.setResizable(true);
						this.setAllowMaximize(true);
						this.setAllowMinimize(false);
						this.setAllowClose(true);
						this.setShowStatusbar(false);
						this.setDecorator(null);
						this.setPadding(10);
						this.setLayout(new qx.ui.layout.Grow());

						this.ZW = [];
						this.removeAll();
						this.ZZ = new qx.ui.container.Scroll();
						this.ZY = new qx.ui.container.Composite(new qx.ui.layout.Flow());
						this.add(this.ZZ, {
							flex : 3
						});
						this.ZZ.add(this.ZY);
						//this.FO();
					} catch (e) {
						console.debug("Addons.BaseScannerLayout.construct: ", e);
					}
				},
				members : {
					ZW : null,
					ZZ : null,
					ZY : null,
					ZX : null,
					openWindow : function (title) {
						try {
							this.setCaption(title);
							if (this.isVisible()) {
								this.close();
							} else {
								this.open();
								this.moveTo(100, 100);
								this.FO();
							}
						} catch (e) {
							console.log("Addons.BaseScannerLayout.openWindow: ", e);
						}
					},
					FO : function () {
						var ZM = window.Addons.BaseScannerGUI.getInstance().ZM;
						var ZE = window.Addons.BaseScannerGUI.getInstance().ZE;
						this.ZX = [];
						var selectedtype = window.Addons.BaseScannerGUI.getInstance().ZJ.getSelection()[0].getModel();
						//console.log("FO: " , ZM.length);
						var rowDataLine = null;
						if (ZE == null) {
							console.info("ZE null: ");
							return;
						}
						//console.log("FO: " , ZM);
						this.ZW = [];
						var id;
						var i;
						var x;
						var y;
						var a;
						for (id in ZM) {
							for (i = 0; i < ZE.length; i++) {
								if (ZE[i][0] == id) {
									rowDataLine = ZE[i];
								}
							}

							if (rowDataLine == null) {
								continue;
							}
							//console.log("ST",selectedtype,rowDataLine[10]);
							if (selectedtype > 4 && selectedtype < 8) {
								if (selectedtype != rowDataLine[10]) {
									continue;
								}
							} else {
								continue;
							}

							posData = rowDataLine[3];
							if (posData != null && posData.split(':').length == 2) {
								posX = parseInt(posData.split(':')[0]);
								posY = parseInt(posData.split(':')[1]);
							}
							var st = '<table border="2" cellspacing="0" cellpadding="0">';
							var link = rowDataLine[2] + " - " + rowDataLine[3];
							st = st + '<tr><td colspan="9"><font color="#FFF">' + link + '</font></td></tr>';
							for (y = 0; y < 8; y++) {
								st = st + "<tr>";
								for (x = 0; x < 9; x++) {
									var img = "";
									var res = ZM[id][x][y];
									//console.log("Res ",res);
									switch (res == undefined ? 0 : res) {
									case 2:
										//console.log("Tiberium " , MT_Base.images[MaelstromTools.Statics.Tiberium] );
										img = '<img width="14" height="14" src="' + MT_Base.images[MaelstromTools.Statics.Tiberium] + '">';
										break;
									case 1:
										//console.log("Crystal ");
										img = '<img width="14" height="14" src="' + MT_Base.images[MaelstromTools.Statics.Crystal] + '">';
										break;
									default:
										img = '<img width="14" height="14" src="' + MT_Base.images["Emptypixels"] + '">';
										break;
									}
									st = st + "<td>" + img + "</td>";
								}
								st = st + "</tr>";
							}
                            
                            var h_arr = [];
                            // Szukanie silosow
                            for (y = 0; y < 9; y++) {
                                for (x = 0; x < 9; x++) {
                                    var res = ZM[id][x][y];
                                    var magazyn_polaczenie = 0;
                                    if( res != 2 && res != 1 ) {
                                        // Puste pole
                                        for(x2=-1;x2<2;x2++) {
                                            for(y2=-1;y2<2;y2++) {
                                                var check_x = x + x2;
                                                var check_y = y + y2;
                                                if( check_x < 0 || check_x > 8 ) continue;
                                                if( check_y < 0 || check_y > 8 ) continue;
                                                var res2 =  ZM[id][check_x][check_y];
                                                if( res2 == 1 || res2 == 2 ) {
                                                    magazyn_polaczenie++;
                                                }
                                            }
                                        }
                                        h_arr.push(magazyn_polaczenie);
                                    }
                                }
                            }
                            var counts = {};
                            for(var i = 0; i< h_arr.length; i++) {
                                var num = h_arr[i];
                                counts[num] = counts[num] ? counts[num]+1 : 1;
                            }
                            var h_string = '';
                            for (var c_property in counts) {
                                if( c_property <= 2 ) continue;
                                var h_val = counts[c_property];
                                var h_key = c_property;
                                
                                if( ( h_key == 4 && h_val >= 2 ) || (h_key >= 5)) {
                                    h_key = "<b style=\"color: red;\">"+h_key+"</b>";
                                }
								h_string += h_key + ': ' + h_val+' <br>';
                            }
                            
                            st = st + "</tr><tr><td colspan=9 style=\"color: white;\">"+h_string+"</td></tr>";
							st = st + "</table>";
                      
							//console.log("setWidgetLabels ", st);
							var l = new qx.ui.basic.Label().set({
									backgroundColor : "#303030",
									value : st,
									rich : true
								});
							l.cid = id;
							this.ZX.push(id);
							l.addListener("click", function (e) {

								//console.log("clickid ", this.cid, );
								//webfrontend.gui.UtilView.openCityInMainWindow(this.cid);
								var bk = qx.core.Init.getApplication();
								bk.getBackgroundArea().closeCityInfo();
								bk.getPlayArea().setView(ClientLib.Data.PlayerAreaViewMode.pavmCombatSetupDefense, this.cid, 0, 0);
								var q = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
								if (q != null)
									q.get_CityArmyFormationsManager().set_CurrentTargetBaseId(this.cid);

							});
							l.setReturnValue = id;
							this.ZW.push(l);
						}
						this.ZY.removeAll();
						var b = 0;
						var c = 0;
						//console.log("this.ZW.length",this.ZW.length);
						for (a = 0; a < this.ZW.length; a++) {
							this.ZY.add(this.ZW[a], {
								row : b,
								column : c
							});
							c++;
							if (c > 4) {
								c = 0;
								b++;
							}
						}
					}
				}
			});

			qx.Class.define("Addons.LocalStorage", {
				type : "static",
				extend : qx.core.Object,
				statics : {
					isSupported : function () {
						return typeof(localStorage) !== "undefined";
					},
					isdefined : function (key) {
						return (localStorage[key] !== "undefined" && localStorage[key] != null);
					},
					isdefineddata : function (data, key) {
						return (data[key] !== "undefined" && data[key] != null);
					},
					setglobal : function (key, value) {
						try {
							if (Addons.LocalStorage.isSupported()) {
								localStorage[key] = JSON.stringify(value);
							}
						} catch (e) {
							console.debug("Addons.LocalStorage.setglobal: ", e);
						}
					},
					getglobal : function (key, defaultValue) {
						try {
							if (Addons.LocalStorage.isSupported()) {
								if (Addons.LocalStorage.isdefined(key)) {
									return JSON.parse(localStorage[key]);
								}
							}
						} catch (e) {
							console.log("Addons.LocalStorage.getglobal: ", e);
						}
						return defaultValue;
					},
					setserver : function (key, value) {
						try {
							if (Addons.LocalStorage.isSupported()) {
								var sn = ClientLib.Data.MainData.GetInstance().get_Server().get_Name();
								var data;
								if (Addons.LocalStorage.isdefined(sn)) {
									try {
										data = JSON.parse(localStorage[sn]);
										if (!(typeof data === "object")) {
											data = {};
											console.debug("LocalStorage data from server not null, but not object");
										}
									} catch (e) {
										console.debug("LocalStorage data from server not null, but parsererror", e);
										data = {};
									}
								} else {
									data = {};
								}
								data[key] = value;
								localStorage[sn] = JSON.stringify(data);
							}
						} catch (e) {
							console.debug("Addons.LocalStorage.setserver: ", e);
						}
					},
					getserver : function (key, defaultValue) {
						try {
							if (Addons.LocalStorage.isSupported()) {
								var sn = ClientLib.Data.MainData.GetInstance().get_Server().get_Name();
								if (Addons.LocalStorage.isdefined(sn)) {
									var data = JSON.parse(localStorage[sn]);
									if (Addons.LocalStorage.isdefineddata(data, key)) {
										return data[key];
									}
								}
							}
						} catch (e) {
							console.log("Addons.LocalStorage.getserver: ", e);
						}
						return defaultValue;
					}
				}
			});
			
			if(typeof Addons.Language === 'undefined'){
				qx.Class.define("Addons.Language", {
					type : "singleton",
					extend : qx.core.Object,
					members : {
						d : {},
						debug : false,
						addtranslateobj : function (o) {
							if ( o.hasOwnProperty("main") ){
								this.d[o.main.toString()] = o;								
								if(this.debug){
									console.log("Translate Added ", o.main.toString() );
								}
								delete o.main;								
							} else {
								console.debug("Addons.Language.addtranslateobj main not define");
							}
						},
						get : function (t) {
							var locale = qx.locale.Manager.getInstance().getLocale();
							var loc = locale.split("_")[0];
							if ( this.d.hasOwnProperty(t) ){
								if ( this.d[t].hasOwnProperty(loc) ){
									return this.d[t][loc];
								}
							}
							if(this.debug){
								console.debug("Addons.Language.get ", t, " not translate for locale ", loc);
							}
							return t;
						}
					}
				});
			}
			
			qx.Class.define("qx.ui.table.cellrenderer.Replace", {
				extend : qx.ui.table.cellrenderer.Default,

				properties : {

					replaceMap : {
						check : "Object",
						nullable : true,
						init : null
					},
					replaceFunction : {
						check : "Function",
						nullable : true,
						init : null
					}
				},
				members : {
					// overridden
					_getContentHtml : function (cellInfo) {
						var value = cellInfo.value;
						var replaceMap = this.getReplaceMap();
						var replaceFunc = this.getReplaceFunction();
						var label;

						// use map
						if (replaceMap) {
							label = replaceMap[value];
							if (typeof label != "undefined") {
								cellInfo.value = label;
								return qx.bom.String.escape(this._formatValue(cellInfo));
							}
						}

						// use function
						if (replaceFunc) {
							cellInfo.value = replaceFunc(value);
						}
						return qx.bom.String.escape(this._formatValue(cellInfo));
					},

					addReversedReplaceMap : function () {
						var map = this.getReplaceMap();
						for (var key in map) {
							var value = map[key];
							map[value] = key;
						}
						return true;
					}
				}
			});
			
			
			console.info("Maelstrom_Basescanner initalisiert");
			
			var T = Addons.Language.getInstance();
			T.debug = false;
			T.addtranslateobj( {main:"Point", de: "Position", pt: "Position", fr: "Position"} );
			T.addtranslateobj( {main:"BaseScanner Overview", de: "Basescanner Übersicht", pt: "Visão geral do scanner de base", fr: "Aperçu du scanner de base"} );
			T.addtranslateobj( {main:"Scan", de: "Scannen", pt: "Esquadrinhar", fr: "Balayer"} );
			T.addtranslateobj( {main:"Location", de: "Lage", pt: "localização", fr: "Emplacement"} );
			T.addtranslateobj( {main:"Player", de: "Spieler", pt: "Jogador", fr: "Joueur"} );
			T.addtranslateobj( {main:"Bases", de: "Bases", pt: "Bases", fr: "Bases"} );
			T.addtranslateobj( {main:"Camp,Outpost", de: "Lager,Vorposten", pt: "Camp,posto avançado", fr: "Camp,avant-poste"} );
			T.addtranslateobj( {main:"Camp", de: "Lager", pt: "Camp", fr: "Camp"} );						
			T.addtranslateobj( {main:"Outpost", de: "Vorposten", pt: "posto avançado", fr: "avant-poste"} );
			T.addtranslateobj( {main:"BaseScanner Layout", de: "BaseScanner Layout", pt: "Layout da Base de Dados de Scanner", fr: "Mise scanner de base"} );
			T.addtranslateobj( {main:"Show Layouts", de: "Layouts anzeigen", pt: "Mostrar Layouts", fr: "Voir Layouts"} );						
			T.addtranslateobj( {main:"Building state", de: "Gebäudezustand", pt: "construção do Estado", fr: "construction de l'État"} );
			T.addtranslateobj( {main:"Defense state", de: "Verteidigungszustand", pt: "de Defesa do Estado", fr: "défense de l'Etat"} );
			T.addtranslateobj( {main:"CP", de: "KP", pt: "CP", fr: "CP"} );
			T.addtranslateobj( {main:"CP Limit", de: "KP begrenzen", pt: "CP limitar", fr: "CP limiter"} );						
			T.addtranslateobj( {main:"min Level", de: "min. Level", pt: "nível mínimo", fr: "niveau minimum"} );
			T.addtranslateobj( {main:"clear Cache", de: "Cache leeren", pt: "limpar cache", fr: "vider le cache"} );
			T.addtranslateobj( {main:"Only center on World", de: "Nur auf Welt zentrieren", pt: "Único centro no Mundial", fr: "Seul centre sur World"} );
			T.addtranslateobj( {main:"base set up at", de: "Basis errichtbar", pt: "base de configurar a", fr: "mis en place à la base"} );	
			T.addtranslateobj( {main:"Infantry", de: "Infanterie", pt: "Infantaria", fr: "Infanterie"} );
			T.addtranslateobj( {main:"Vehicle", de: "Fahrzeuge", pt: "Veículos", fr: "Vehicule"} );
			T.addtranslateobj( {main:"Aircraft", de: "Flugzeuge", pt: "Aeronaves", fr: "Aviation"} );
			T.addtranslateobj( {main:"Tiberium", de: "Tiberium", pt: "Tibério", fr: "Tiberium"} );
			T.addtranslateobj( {main:"Crystal", de: "Kristalle", pt: "Cristal", fr: "Cristal"} );
			T.addtranslateobj( {main:"Power", de: "Strom", pt: "Potência", fr: "Energie"} );
			T.addtranslateobj( {main:"Dollar", de: "Credits", pt: "Créditos", fr: "Crédit"} );
			T.addtranslateobj( {main:"Research", de: "Forschung", pt: "Investigação", fr: "Recherche"} );
			T.addtranslateobj( {main:"-----", de: "--", pt: "--", fr: "--"} );
			

			
			
			var MT_Lang = null;
			var MT_Cache = null;
			var MT_Base = null;
			var fileManager = null;
			var lastid = 0;
			var countlastidchecked = 0;
			fileManager = ClientLib.File.FileManager.GetInstance();
			MT_Lang = window.MaelstromTools.Language.getInstance();
			MT_Cache = window.MaelstromTools.Cache.getInstance();
			MT_Base = window.MaelstromTools.Base.getInstance();

			MT_Base.createNewImage("BaseScanner", "ui/icons/icon_item.png", fileManager);
			MT_Base.createNewImage("Emptypixels", "ui/menues/main_menu/misc_empty_pixel.png", fileManager);
			var openBaseScannerOverview = MT_Base.createDesktopButton(T.get("BaseScanner Overview") + "version " + window.__msbs_version, "BaseScanner", false, MT_Base.desktopPosition(2));
			openBaseScannerOverview.addListener("execute", function () {
				Addons.BaseScannerGUI.getInstance().openWindow(T.get("BaseScanner Overview") + " version " + window.__msbs_version);
			}, this);
			Addons.BaseScannerGUI.getInstance().addListener("close", Addons.BaseScannerGUI.getInstance().FN, Addons.BaseScannerGUI.getInstance());
			//this.addListener("resize", function(){ }, this );
			
			MT_Base.addToMainMenu("BaseScanner", openBaseScannerOverview);
			
			if(typeof Addons.AddonMainMenu !== 'undefined'){
				var addonmenu = Addons.AddonMainMenu.getInstance();
				addonmenu.AddMainMenu("Basescanner", function () {
					Addons.BaseScannerGUI.getInstance().openWindow(T.get("BaseScanner Overview") + " version " + window.__msbs_version);
				},"ALT+B");
			}
			
		}

		function getResourcesPart(cityEntities) {
			try {
				var loot = [0, 0, 0, 0, 0, 0, 0, 0];
				if (cityEntities == null) {
					return loot;
				}

				for (var i in cityEntities) {
					var cityEntity = cityEntities[i];
					var unitLevelRequirements = MaelstromTools.Wrapper.GetUnitLevelRequirements(cityEntity);

					for (var x = 0; x < unitLevelRequirements.length; x++) {
						loot[unitLevelRequirements[x].Type] += unitLevelRequirements[x].Count * cityEntity.get_HitpointsPercent();
						if (cityEntity.get_HitpointsPercent() < 1.0) {
							// destroyed

						}
					}
				}
				return loot;
			} catch (e) {
				console.debug("MaelstromTools_Basescanner getResourcesPart", e);
			}
		}

		function objfnkstrON(obj) {
			var key;
			for (key in obj) {
				if (typeof(obj[key]) == "function") {
					var s = obj[key].toString();
					console.debug(key, s);
					//var protostring = s.replace(/\s/gim, "");
					//console.log(key, protostring);
				}
			}
		}

		function foundfnkstring(obj, redex, objname, n) {
			var redexfounds = [];
			var s = obj.toString();
			var protostring = s.replace(/\s/gim, "");
			redexfounds = protostring.match(redex);
			var i;
			for (i = 1; i < (n + 1); i++) {
				if (redexfounds != null && redexfounds[i].length == 6) {
					console.debug(objname, i, redexfounds[i]);
				} else if (redexfounds != null && redexfounds[i].length > 0) {
					console.warn(objname, i, redexfounds[i]);
				} else {
					console.error("Error - ", objname, i, "not found");
					console.warn(objname, protostring);
				}
			}
			return redexfounds;
		}

		function MaelstromTools_Basescanner_checkIfLoaded() {
			try {
				if (typeof qx != 'undefined' && typeof MaelstromTools != 'undefined') {
					createMaelstromTools_Basescanner();
				} else {
					window.setTimeout(MaelstromTools_Basescanner_checkIfLoaded, 1000);
				}
			} catch (e) {
				console.debug("MaelstromTools_Basescanner_checkIfLoaded: ", e);
			}
		}
		if (/commandandconquer\.com/i.test(document.domain)) {
			window.setTimeout(MaelstromTools_Basescanner_checkIfLoaded, 10000);
		}
	};
	try {
		var MaelstromScript_Basescanner = document.createElement("script");
		MaelstromScript_Basescanner.innerHTML = "(" + MaelstromTools_Basescanner.toString() + ")();";
		MaelstromScript_Basescanner.type = "text/javascript";
		if (/commandandconquer\.com/i.test(document.domain)) {
			document.getElementsByTagName("head")[0].appendChild(MaelstromScript_Basescanner);
		}
	} catch (e) {
		console.debug("MaelstromTools_Basescanner: init error: ", e);
	}
})();
