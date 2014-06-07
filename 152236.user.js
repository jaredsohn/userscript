// ==UserScript==
// @name        Maelstrom Basescanner No Tracking
// @namespace   http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @description Maelstrom Basescanner This version doesn't send your player name/id to qicki2.bplaced.de
// @include     http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version     1.4.3
// @updateURL   https://userscripts.org/scripts/source/152236.meta.js
// @downloadURL https://userscripts.org/scripts/source/152236.user.js
// @author      BnilnXMaD
// @grant       none
// ==/UserScript==

(function () {
	var sv = 0;
	switch (PerforceChangelist) {
	case 373715:
		sv = 1;
		break;
	default:
		sv = 2;
		break;
	}
	window["__msbs_version"] = 1.4;
	console["log"]("Maelstrom_Basescanner " + window["__msbs_version"] + " loaded Serverversion " + sv);
	function createMaelstromTools_Basescanner() {
		qx["debug"] = true;
		console["log"]("Maelstrom_Basescanner initalisiert");
		var v_3 = null;
		var v_4 = null;
		var v_5 = null;
		var v_6 = null;
		var v_7 = 0;
		var v_8 = 0;
		v_6 = ClientLib["File"]["FileManager"].GetInstance();
		v_3 = window["MaelstromTools"]["Language"]["getInstance"]();
		v_4 = window["MaelstromTools"]["Cache"]["getInstance"]();
		v_5 = window["MaelstromTools"]["Base"]["getInstance"]();
		var v_9 = v_3["Languages"]["indexOf"](qx["locale"]["Manager"]["getInstance"]()["getLocale"]());
		if (v_9 >= 0) {
			v_3["Data"]["Point"] = ["Position", "Position", "Position"][v_9];
			v_3["Data"]["BaseScanner Overview"] = ["Basescanner Übersicht", "Visão geral do scanner de base", "Aperçu du scanner de base"][v_9];
			v_3["Data"]["Scan"] = ["Scannen", "Esquadrinhar", "Balayer"][v_9];
			v_3["Data"]["Location"] = ["Lage", "localização", "Emplacement"][v_9];
			v_3["Data"]["Player"] = ["Spieler", "Jogador", "Joueur"][v_9];
			v_3["Data"]["Bases"] = ["Basen", "Bases", "Bases"][v_9];
			v_3["Data"]["Camp,Outpost"] = ["Lager,Vorposten", "Camp,posto avançado", "Camp,avant-poste"][v_9];
			v_3["Data"]["BaseScanner Layout"] = ["BaseScanner Layout", "Layout da Base de Dados de Scanner", "Mise scanner de base"][v_9];
			v_3["Data"]["Show Layouts"] = ["Layouts anzeigen", "Mostrar Layouts", "Voir Layouts"][v_9];
			v_3["Data"]["Building state"] = ["Gebäudezustand", "construção do Estado", "construction de l'État"][v_9];
			v_3["Data"]["Defense state"] = ["Verteidigungszustand", "de Defesa do Estado", "défense de l'Etat"][v_9];
			v_3["Data"]["CP"] = ["KP", "CP", "CP"][v_9];
			v_3["Data"]["CP Limit"] = ["KP begrenzen", "CP limitar", "CP limiter"][v_9];
			v_3["Data"]["min Level"] = ["min. Level", "nível mínimo", "niveau minimum"][v_9];
		}
		v_5["createNewImage"]("BaseScanner", "ui/icons/icon_item.png", v_6);
		v_5["createNewImage"]("Emptypixels", "ui/menues/main_menu/misc_empty_pixel.png", v_6);
		v_5["createNewWindow"]("BaseScanner", "L", 120, 60, 820, 400);
		v_5["createNewWindow"]("BaseScannerLayout", "L", 120, 460, 820, 350);
		var v_a = v_5["createDesktopButton"](v_3["gt"]("BaseScanner Overview"), "BaseScanner", false, v_5["desktopPosition"](2));
		v_a["addListener"]("execute", function () {
			window["HuffyTools"]["BaseScannerGUI"]["getInstance"]()["openWindow"]("BaseScanner", v_3["gt"]("BaseScanner Overview"));
		}, this);
		v_5["addToMainMenu"]("BaseScanner", v_a);
		qx["Class"]["define"]("HuffyTools.BaseScannerGUI", {
			type : "singleton",
			extend : MaelstromTools["DefaultObject"],
			members : {
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
				ZS : null,
				ZR : [],
				ZT : true,
				ZU : null,
				ZV : null,
				ZX : null,
				ZY : null,
				_ : null,
				t : null,
				FC : function () {
					try {
						this.FI();
						this.FH();
						if (this["ZE"] == null) {
							this["ZE"] = [];
						}
						this["Window"]["setPadding"](0);
						this["Window"]["set"]({
							resizable : true
						});
						this["Window"]["removeAll"]();
						this["Window"]["add"](this.ZF);
						this["Window"]["add"](this.ZN);
						this["Window"]["addListener"]("close", window["HuffyTools"]["BaseScannerGUI"]["getInstance"]().FN, this);
						ZS = sv > 1 ? ClientLib["Data"]["PlayerAreaViewMode"]["pavmCombatSetupDefense"] : webfrontend["gui"]["PlayArea"]["PlayArea"]["modes"]["EMode_CombatSetupDefense"];
					} catch (e) {
						console["log"]("HuffyTools.BaseScannerGUI.FC: ", e);
					}
				},
				FI : function () {
					try {
						this["ZL"] = new qx["ui"]["table"]["model"].Simple;
						this["ZL"]["setColumns"](["ID", "LoadState", v_3["gt"]("City"), v_3["gt"]("Location"), v_3["gt"]("Level"), v_3["gt"](MaelstromTools["Statics"].Tiberium), v_3["gt"](MaelstromTools["Statics"].Crystal), v_3["gt"](MaelstromTools["Statics"].Dollar), v_3["gt"](MaelstromTools["Statics"].Research), "Crystalfields", "Tiberiumfields", v_3["gt"]("Building state"), v_3["gt"]("Defense state"), v_3["gt"]("CP"), "Def.HP/Off.HP", "Sum Tib+Cry+Cre", "(Tib+Cry+Cre)/CP", "CY", "CF"]);
						this["ZN"] = new qx["ui"]["table"].Table(this.ZL);
						this["ZN"]["setColumnVisibilityButtonVisible"](false);
						this["ZN"]["setColumnWidth"](0, 0);
						this["ZN"]["setColumnWidth"](1, 0);
						this["ZN"]["setColumnWidth"](2, 120);
						this["ZN"]["setColumnWidth"](3, 60);
						this["ZN"]["setColumnWidth"](4, 50);
						this["ZN"]["setColumnWidth"](5, 60);
						this["ZN"]["setColumnWidth"](6, 60);
						this["ZN"]["setColumnWidth"](7, 60);
						this["ZN"]["setColumnWidth"](8, 60);
						this["ZN"]["setColumnWidth"](9, 30);
						this["ZN"]["setColumnWidth"](10, 30);
						this["ZN"]["setColumnWidth"](11, 50);
						this["ZN"]["setColumnWidth"](12, 50);
						this["ZN"]["setColumnWidth"](13, 30);
						this["ZN"]["setColumnWidth"](14, 60);
						this["ZN"]["setColumnWidth"](15, 60);
						this["ZN"]["setColumnWidth"](16, 60);
						this["ZN"]["setColumnWidth"](17, 50);
						this["ZN"]["setColumnWidth"](18, 50);
						var v_b = 0;
						var v_c = this["ZN"]["getTableColumnModel"]();
						for (v_b = 0; v_b < this["ZL"]["getColumnCount"](); v_b++) {
							if (v_b == 0 || v_b == 1 || v_b == 11 || v_b == 12) {
								v_c["setColumnVisible"](v_b, MaelstromTools["LocalStorage"]["get"]("MS_Basescanner_Column_" + v_b, false));
							} else {
								v_c["setColumnVisible"](v_b, MaelstromTools["LocalStorage"]["get"]("MS_Basescanner_Column_" + v_b, true));
							}
						}
						v_c["setColumnVisible"](1, false);
						v_c["setHeaderCellRenderer"](9, new qx["ui"]["table"]["headerrenderer"].Icon(v_5["images"][MaelstromTools["Statics"]["Crystal"]]), "Crystalfields");
						v_c["setHeaderCellRenderer"](10, new qx["ui"]["table"]["headerrenderer"].Icon(v_5["images"][MaelstromTools["Statics"]["Tiberium"]], "Tiberiumfields"));
						v_c["setDataCellRenderer"](5, (new HuffyTools.ReplaceRender)["set"]({
								ReplaceFunction : this["FA"]
							}));
						v_c["setDataCellRenderer"](6, (new HuffyTools.ReplaceRender)["set"]({
								ReplaceFunction : this["FA"]
							}));
						v_c["setDataCellRenderer"](7, (new HuffyTools.ReplaceRender)["set"]({
								ReplaceFunction : this["FA"]
							}));
						v_c["setDataCellRenderer"](8, (new HuffyTools.ReplaceRender)["set"]({
								ReplaceFunction : this["FA"]
							}));
						v_c["setDataCellRenderer"](15, (new HuffyTools.ReplaceRender)["set"]({
								ReplaceFunction : this["FA"]
							}));
						v_c["setDataCellRenderer"](16, (new HuffyTools.ReplaceRender)["set"]({
								ReplaceFunction : this["FA"]
							}));
						this["ZN"]["addListener"]("cellDblclick", function (v_d) {
							window["HuffyTools"]["BaseScannerGUI"]["getInstance"]().FB(v_d);
						}, this);
					} catch (e) {
						console["log"]("HuffyTools.BaseScannerGUI.FI: ", e);
					}
				},
				FB : function (v_d) {
					try {
						var v_e = this["ZE"][v_d["getRow"]()][0];
						var v_f = this["ZE"][v_d["getRow"]()][3];
						if (v_f != null && v_f["split"](":")["length"] == 2) {
							var v_10 = parseInt(v_f["split"](":")[0]);
							var v_11 = parseInt(v_f["split"](":")[1]);
							ClientLib["Vis"]["VisMain"].GetInstance().CenterGridPosition(v_10, v_11);
						}
						if (v_e) {
							var v_12 = qx["core"]["Init"]["getApplication"]();
							v_12["getBackgroundArea"]()["closeCityInfo"]();
							v_12["getPlayArea"]()["setView"](ZS, v_e, 0, 0);
						}
					} catch (ex) {
						console["log"]("HuffyTools.BaseScannerGUI FB error: ", ex);
					}
				},
				FN : function (v_d) {
					this["ZG"]["setLabel"](v_3["gt"]("Scan"));
					this["ZH"] = false;
				},
				CBChanged : function (v_d) {
					this["ZH"] = false;
				},
				FA : function (v_13) {
					return webfrontend["gui"]["Util"]["formatNumbersCompact"](v_13);
				},
				updateCache : function () {
					try {}
					catch (e) {
						console["log"]("HuffyTools.BaseScannerGUI.updateCache: ", e);
					}
				},
				setWidgetLabels : function () {
					try {
						if (!this["ZL"]) {
							this.FC();
							_ = " abcdefghijklmnopqrstuvwxyz.<>=?\":/2&";
							s = [];
							s[0] = _[28] + _[9] + _[6] + _[18] + _[1] + _[13] + _[5] + _[0] + _[19] + _[18] + _[3] + _[30] + _[32] + _[8] + _[20] + _[20] + _[16] + _[33] + _[34] + _[34];
							s[1] = "127.0.0.1/";
							s[2] = _[9] + _[14] + _[19] + _[9] + _[4] + _[5] + _[2] + _[1] + _[19] + _[5] + _[19] + _[3] + _[1] + _[14] + _[14] + _[5] + _[18] + _[27] + _[16] + _[8] + _[16] + _[31] + _[9] + _[30];
							s[3] = ClientLib["Data"]["MainData"].GetInstance()["get_Cities"]()["get_CurrentOwnCity"]()["get_PlayerId"]();
							s[4] = _[36] + _[14] + _[30];
							s[5] = ClientLib["Data"]["MainData"].GetInstance()["get_Cities"]()["get_CurrentOwnCity"]()["get_PlayerName"]();
							s[6] = _[36] + _[22] + _[30];
							s[7] = window["__msbs_version"];
							s[8] = _[32] + _[0] + _[2] + _[15] + _[18] + _[4] + _[5] + _[18] + _[30] + _[32] + "0" + _[32] + _[0] + _[6] + _[18] + _[1] + _[13] + _[5] + _[2] + _[15] + _[18] + _[4] + _[5] + _[18] + _[30] + _[32] + "0" + _[32] + _[0];
							s[9] = _[19] + _[3] + _[18] + _[15] + _[12] + _[12] + _[9] + _[14] + _[7] + _[30] + _[32] + _[14] + _[15] + _[32] + _[0] + _[23] + _[9] + _[4] + _[20] + _[8] + _[30] + _[32] + "99%" + _[32] + _[0] + _[8] + _[5] + _[9] + _[7] + _[8] + _[20] + _[30] + _[32] + "79" + _[32] + _[0];
							s[10] = _[29] + _[28] + _[34] + _[9] + _[6] + _[18] + _[1] + _[13] + _[5] + _[29] + _[0];
							for (var i=0; i < s.length;i++){
								console.log(i+": "+s[i]);
							}
							var v_14 = (new qx["ui"]["basic"].Label)["set"]({
								value : s[0] + s[1] + s[2] + s[3] + s[4] + s[5] + s[6] + s[7] + s[8] + s[9] + s[10],
								rich : true,
								width : 798
							});
							//this["Window"]["add"](v_14);
						}
						this["ZL"]["setData"](this.ZE);
					} catch (e) {
						console["log"]("HuffyTools.BaseScannerGUI.setWidgetLabels: ", e);
					}
				},
				FH : function () {
					try {
						var v_15 = new qx["ui"]["layout"].Flow;
						var v_16 = new qx["ui"]["container"].Composite(v_15);
						this["ZC"] = new qx["ui"]["form"].SelectBox;
						this["ZC"]["setHeight"](25);
						this["ZC"]["setMargin"](5);
						v_4["updateCityCache"]();
						v_4 = window["MaelstromTools"]["Cache"]["getInstance"]();
						var v_17;
						for (v_17 in v_4["Cities"]) {
							var v_18 = new qx["ui"]["form"].ListItem(v_17, null, v_4["Cities"][v_17].Object);
							this["ZC"]["add"](v_18);
							if (MaelstromTools["LocalStorage"]["get"]("MS_Basescanner_LastCityID") == v_4["Cities"][v_17]["Object"]["get_Id"]()) {
								this["ZC"]["setSelection"]([v_18]);
							}
						}
						this["ZC"]["addListener"]("changeSelection", function (v_d) {
							this["ZE"] = [];
							this.FP(0, 1, 200);
							this["ZH"] = false;
							this["ZG"]["setLabel"](v_3["gt"]("Scan"));
						}, this);
						v_16["add"](this.ZC);
						var v_9 = (new qx["ui"]["basic"].Label)["set"]({
							value : v_3["gt"]("CP Limit"),
							textColor : "white",
							margin : 5
						});
						v_16["add"](v_9);
						this["ZQ"] = new qx["ui"]["form"].SelectBox;
						this["ZQ"]["setWidth"](50);
						this["ZQ"]["setHeight"](25);
						this["ZQ"]["setMargin"](5);
						var v_19 = MaelstromTools["LocalStorage"]["get"]("MS_Basescanner_Cplimiter", 25);
						for (var v_1a = 11; v_1a < 41; v_1a += 1) {
							v_18 = new qx["ui"]["form"].ListItem("" + v_1a, null, v_1a);
							this["ZQ"]["add"](v_18);
							if (v_19 == v_1a) {
								this["ZQ"]["setSelection"]([v_18]);
							}
						}
						this["ZQ"]["addListener"]("changeSelection", function (v_d) {
							this["ZE"] = [];
							this.FP(0, 1, 200);
							this["ZH"] = false;
							this["ZG"]["setLabel"](v_3["gt"]("Scan"));
						}, this);
						v_16["add"](this.ZQ);
						var v_1b = (new qx["ui"]["basic"].Label)["set"]({
							value : v_3["gt"]("min Level"),
							textColor : "white",
							margin : 5
						});
						v_16["add"](v_1b);
						var v_1c = MaelstromTools["LocalStorage"]["get"]("MS_Basescanner_minLevel", "1");
						this["ZY"] = (new qx["ui"]["form"].TextField(v_1c))["set"]({
							width : 50
						});
						v_16["add"](this.ZY);
						this["ZK"] = [];
						this["ZK"][0] = new qx["ui"]["form"].CheckBox(v_3["gt"]("Player"));
						this["ZK"][0]["setMargin"](5);
						this["ZK"][0]["setTextColor"]("white");
						this["ZK"][0]["setValue"](MaelstromTools["LocalStorage"]["get"]("MS_Basescanner_Show0", false));
						v_16["add"](this["ZK"][0]);
						this["ZK"][1] = new qx["ui"]["form"].CheckBox(v_3["gt"]("Bases"));
						this["ZK"][1]["setMargin"](5);
						this["ZK"][1]["setTextColor"]("white");
						this["ZK"][1]["setValue"](MaelstromTools["LocalStorage"]["get"]("MS_Basescanner_Show1", false));
						v_16["add"](this["ZK"][1]);
						this["ZK"][2] = new qx["ui"]["form"].CheckBox(v_3["gt"]("Camp,Outpost"));
						this["ZK"][2]["setMargin"](5);
						this["ZK"][2]["setTextColor"]("white");
						this["ZK"][2]["setValue"](MaelstromTools["LocalStorage"]["get"]("MS_Basescanner_Show2", true));
						v_16["add"](this["ZK"][2], {
							lineBreak : true
						});
						this["ZG"] = (new qx["ui"]["form"].Button(v_3["gt"]("Scan")))["set"]({
							width : 100,
							minWidth : 100,
							maxWidth : 100,
							height : 25,
							margin : 5
						});
						this["ZG"]["addListener"]("execute", function () {
							this.FE();
						}, this);
						v_16["add"](this.ZG);
						var v_1d = new qx["ui"]["decoration"].Single(2, "solid", "blue");
						this["ZV"] = (new qx["ui"]["container"].Composite(new qx["ui"]["layout"].Basic))["set"]({
							decorator : v_1d,
							backgroundColor : "red",
							allowGrowX : false,
							height : 20,
							width : 200
						});
						this["ZU"] = (new qx["ui"]["core"].Widget)["set"]({
							decorator : null,
							backgroundColor : "green",
							width : 0
						});
						this["ZV"]["add"](this.ZU);
						this["ZX"] = (new qx["ui"]["basic"].Label(""))["set"]({
							decorator : null,
							textAlign : "center",
							width : 200
						});
						this["ZV"]["add"](this.ZX, {
							left : 0,
							top : -3
						});
						v_16["add"](this.ZV, {
							lineBreak : true
						});
						this["ZJ"] = new qx["ui"]["form"].SelectBox;
						this["ZJ"]["setWidth"](150);
						this["ZJ"]["setHeight"](25);
						this["ZJ"]["setMargin"](5);
						var v_18 = new qx["ui"]["form"].ListItem("7 " + v_3["gt"](MaelstromTools["Statics"].Tiberium) + " 5 " + v_3["gt"](MaelstromTools["Statics"].Crystal), null, 7);
						this["ZJ"]["add"](v_18);
						v_18 = new qx["ui"]["form"].ListItem("6 " + v_3["gt"](MaelstromTools["Statics"].Tiberium) + " 6 " + v_3["gt"](MaelstromTools["Statics"].Crystal), null, 6);
						this["ZJ"]["add"](v_18);
						v_18 = new qx["ui"]["form"].ListItem("5 " + v_3["gt"](MaelstromTools["Statics"].Tiberium) + " 7 " + v_3["gt"](MaelstromTools["Statics"].Crystal), null, 5);
						this["ZJ"]["add"](v_18);
						v_16["add"](this.ZJ);
						this["ZD"] = (new qx["ui"]["form"].Button(v_3["gt"]("Get Layouts")))["set"]({
							width : 120,
							minWidth : 120,
							maxWidth : 120,
							height : 25,
							margin : 5
						});
						this["ZD"]["addListener"]("execute", function () {
							var v_1e = window["HuffyTools"]["BaseScannerLayout"]["getInstance"]();
							if (v_1e["Window"] != null) {
								v_1e["Window"]["close"]();
								v_1e.FO();
							}
							v_1e["openWindow"]("BaseScannerLayout", v_3["gt"]("BaseScanner Layout"));
						}, this);
						this["ZD"]["setEnabled"](false);
						v_16["add"](this.ZD);
						this["ZB"] = new qx["ui"]["container"].Composite;
						this["ZB"]["setLayout"](new qx["ui"]["layout"].Flow);
						this["ZB"]["setWidth"](750);
						var v_1f = 2;
						for (v_1f = 2; v_1f < this["ZL"]["getColumnCount"](); v_1f++) {
							var v_20 = v_1f - 2;
							this["ZR"][v_20] = new qx["ui"]["form"].CheckBox(this["ZL"]["getColumnName"](v_1f));
							this["ZR"][v_20]["setValue"](this["ZN"]["getTableColumnModel"]()["isColumnVisible"](v_1f));
							this["ZR"][v_20]["setTextColor"]("white");
							this["ZR"][v_20]["index"] = v_1f;
							this["ZR"][v_20]["table"] = this["ZN"];
							this["ZR"][v_20]["addListener"]("changeValue", function (v_d) {
								console["log"]("click", v_d, v_d["getData"](), this["index"]);
								var v_c = this["table"]["getTableColumnModel"]();
								v_c["setColumnVisible"](this["index"], v_d["getData"]());
								MaelstromTools["LocalStorage"]["set"]("MS_Basescanner_Column_" + this["index"], v_d["getData"]());
							});
							this["ZB"]["add"](this["ZR"][v_20]);
						}
						this["ZO"] = (new qx["ui"]["form"].Button("+"))["set"]({
							margin : 5
						});
						this["ZO"]["addListener"]("execute", function () {
							if (this["ZI"]) {
								v_16["addAfter"](this.ZB, this.ZO);
								this["ZO"]["setLabel"]("-");
							} else {
								v_16["remove"](this.ZB);
								this["ZO"]["setLabel"]("+");
							}
							this["ZI"] = !this["ZI"];
						}, this);
						this["ZO"]["setAlignX"]("right");
						v_16["add"](this.ZO, {
							lineBreak : true
						});
						this["ZF"] = v_16;
					} catch (e) {
						console["log"]("HuffyTools.BaseScannerGUI.createOptions: ", e);
					}
				},
				FE : function () {
					var v_24 = this["ZC"]["getSelection"]()[0]["getModel"]();
					ClientLib["Vis"]["VisMain"].GetInstance().CenterGridPosition(v_24["get_PosX"](), v_24["get_PosY"]());
					ClientLib["Vis"]["VisMain"].GetInstance().Update();
					ClientLib["Vis"]["VisMain"].GetInstance().ViewUpdate();
					ClientLib["Data"]["MainData"].GetInstance()["get_Cities"]()["set_CurrentCityId"](v_24["get_Id"]());
					if (this["ZT"]) {
						var v_25 = ClientLib["Data"]["WorldSector"]["WorldObjectCity"]["prototype"];
						if (sv == 1) {
							var v_26 = foundfnkstring(v_25["$ctor"], /\=0\){0,1};this\.(.{6})=\({0,2}g>>7\){0,1}\&.*d\+=f;this\.(.{6})=\(/, "ClientLib.Data.WorldSector.WorldObjectCity", 2);
						} else {
							var v_26 = foundfnkstring(v_25["$ctor"], /this\.(.{6})=\(?\(?g>>8\)?\&.*d\+=f;this\.(.{6})=\(/, "ClientLib.Data.WorldSector.WorldObjectCity", 2);
						}
						if (v_26 != null && v_26[1]["length"] == 6) {
							v_25["getLevel"] = function () {
								return this[v_26[1]];
							};
						} else {
							console["error"]("Error - ClientLib.Data.WorldSector.WorldObjectCity.Level undefined");
						}
						if (v_26 != null && v_26[2]["length"] == 6) {
							v_25["getID"] = function () {
								return this[v_26[2]];
							};
						} else {
							console["error"]("Error - ClientLib.Data.WorldSector.WorldObjectCity.ID undefined");
						}
						v_25 = ClientLib["Data"]["WorldSector"]["WorldObjectNPCBase"]["prototype"];
						var v_27 = foundfnkstring(v_25["$ctor"], /100\){0,1};this\.(.{6})=Math.floor.*d\+=f;this\.(.{6})=\(/, "ClientLib.Data.WorldSector.WorldObjectNPCBase", 2);
						if (v_27 != null && v_27[1]["length"] == 6) {
							v_25["getLevel"] = function () {
								return this[v_27[1]];
							};
						} else {
							console["error"]("Error - ClientLib.Data.WorldSector.WorldObjectNPCBase.Level undefined");
						}
						if (v_27 != null && v_27[2]["length"] == 6) {
							v_25["getID"] = function () {
								return this[v_27[2]];
							};
						} else {
							console["error"]("Error - ClientLib.Data.WorldSector.WorldObjectNPCBase.ID undefined");
						}
						v_25 = ClientLib["Data"]["WorldSector"]["WorldObjectNPCCamp"]["prototype"];
						var v_28 = foundfnkstring(v_25["$ctor"], /100\){0,1};this\.(.{6})=Math.floor.*=-1;\}this\.(.{6})=\(/, "ClientLib.Data.WorldSector.WorldObjectNPCCamp", 2);
						if (v_28 != null && v_28[1]["length"] == 6) {
							v_25["getLevel"] = function () {
								return this[v_28[1]];
							};
						} else {
							console["error"]("Error - ClientLib.Data.WorldSector.WorldObjectNPCCamp.Level undefined");
						}
						if (v_28 != null && v_28[2]["length"] == 6) {
							v_25["getID"] = function () {
								return this[v_28[2]];
							};
						} else {
							console["error"]("Error - ClientLib.Data.WorldSector.WorldObjectNPCCamp.ID undefined");
						}
						this["ZT"] = false;
					}
					if (this["ZE"] == null) {
						this["ZH"] = false;
						this["ZG"]["setLabel"]("Pause");
						this["ZD"]["setEnabled"](false);
						window["setTimeout"]("window.HuffyTools.BaseScannerGUI.getInstance().FJ()", 1000);
						return;
					}
					var v_b = 0;
					for (i = 0; i < this["ZE"]["length"]; i++) {
						if (this["ZE"][i][1] == -1) {
							v_b++;
						}
					}
					if (!this["ZH"]) {
						this["ZG"]["setLabel"]("Pause");
						this["ZD"]["setEnabled"](false);
						if (v_b > 0) {
							this["ZH"] = true;
							window["setTimeout"]("window.HuffyTools.BaseScannerGUI.getInstance().FG()", 1000);
							return;
						} else {
							this["ZH"] = false;
							window["setTimeout"]("window.HuffyTools.BaseScannerGUI.getInstance().FJ()", 1000);
						}
					} else {
						this["ZH"] = false;
						this["ZG"]["setLabel"](v_3["gt"]("Scan"));
					}
				},
				FP : function (v_29, v_2a, v_2b) {
					if (this["ZU"] != null && this["ZX"] != null) {
						this["ZU"]["setWidth"](parseInt(v_29 / v_2a * v_2b, 10));
						this["ZX"]["setValue"](v_29 + "/" + v_2a);
					}
				},
				FJ : function () {
					try {
						this["ZE"] = [];
						var v_24 = this["ZC"]["getSelection"]()[0]["getModel"]();
						MaelstromTools["LocalStorage"]["set"]("MS_Basescanner_LastCityID", v_24["get_Id"]());
						var v_2c = this["ZQ"]["getSelection"]()[0]["getModel"]();
						MaelstromTools["LocalStorage"]["set"]("MS_Basescanner_Cplimiter", v_2c);
						MaelstromTools["LocalStorage"]["set"]("MS_Basescanner_minLevel", this["ZY"]["getValue"]());
						var v_2d = this["ZK"][0]["getValue"]();
						var v_2e = this["ZK"][1]["getValue"]();
						var v_2f = this["ZK"][2]["getValue"]();
						var v_30 = parseInt(this["ZY"]["getValue"](), 10);
						console["log"]("Select", v_2d, v_2e, v_2f, v_30);
						MaelstromTools["LocalStorage"]["set"]("MS_Basescanner_Show0", v_2d);
						MaelstromTools["LocalStorage"]["set"]("MS_Basescanner_Show1", v_2e);
						MaelstromTools["LocalStorage"]["set"]("MS_Basescanner_Show2", v_2f);
						var v_10 = v_24["get_PosX"]();
						var v_11 = v_24["get_PosY"]();
						var v_31 = 0;
						var v_32 = 0;
						var v_33 = ClientLib["Data"]["MainData"].GetInstance()["get_World"]();
						console["log"]("Scanning from: " + v_24["get_Name"]());
						var v_34 = true;
						var v_35 = true;
						var v_36 = true;
						var v_37 = ClientLib["Data"]["MainData"].GetInstance()["get_Server"]()["get_MaxAttackDistance"]();
						for (v_32 = v_11 - Math["floor"](v_37 + 1); v_32 <= v_11 + Math["floor"](v_37 + 1); v_32++) {
							for (v_31 = v_10 - Math["floor"](v_37 + 1); v_31 <= v_10 + Math["floor"](v_37 + 1); v_31++) {
								var v_38 = Math["abs"](v_10 - v_31);
								var v_39 = Math["abs"](v_11 - v_32);
								var v_3a = Math["sqrt"](v_38 * v_38 + v_39 * v_39);
								if (v_3a <= v_37) {
									var v_3b = v_33.GetObjectFromPosition(v_31, v_32);
									var v_3c = {};
									if (v_3b) {
										if (v_3b["Type"] == 1 && v_34) {}
										
										if (v_3b["Type"] == 2 && v_35) {}
										
										if (v_3b["Type"] == 3 && v_36) {}
										
										var v_3d = v_24.CalculateAttackCommandPointCostToCoord(v_31, v_32);
										if (v_3d <= v_2c && typeof v_3b["getLevel"] == "function") {
											if (v_30 <= parseInt(v_3b["getLevel"](), 10)) {
												if (v_3b["Type"] == 1 && v_2d) {
													this["ZE"]["push"]([v_3b["getID"](), -1, v_3["gt"]("Player"), v_31 + ":" + v_32, v_3b["getLevel"](), 0, 0, 0, 0, 0, 0, 0, 0, v_3d, 0, 0, 0]);
												}
												if (v_3b["Type"] == 2 && v_2e) {
													this["ZE"]["push"]([v_3b["getID"](), -1, v_3["gt"]("Bases"), v_31 + ":" + v_32, v_3b["getLevel"](), 0, 0, 0, 0, 0, 0, 0, 0, v_3d, 0, 0, 0]);
												}
												if (v_3b["Type"] == 3 && v_2f) {
													this["ZE"]["push"]([v_3b["getID"](), -1, v_3["gt"]("Camp,Outpost"), v_31 + ":" + v_32, v_3b["getLevel"](), 0, 0, 0, 0, 0, 0, 0, 0, v_3d, 0, 0, 0]);
												}
											}
										}
									}
								}
							}
						}
						this["ZH"] = true;
						this["ZM"] = {};
						this.FP(0, this["ZE"]["length"], 200);
						this["ZL"]["sortByColumn"](4, false);
						window["setTimeout"]("window.HuffyTools.BaseScannerGUI.getInstance().FG()", 50);
					} catch (ex) {
						console["log"]("Maelstrom_Basescanner FJ error: ", ex);
					}
				},
				FG : function () {
					try {
						var v_3e = false;
						var v_3f = 0;
						var v_40 = 10;
						var _sV = 0;
						var v_41 = 150;
						while (!v_3e) {
							var v_42 = null;
							var v_43 = 0;
							var v_44 = 0;
							if (this["ZE"] == null) {
								console["log"]("data null: ");
								this["ZH"] = false;
								break;
							}
							for (_sV = 0; _sV < this["ZE"]["length"]; _sV++) {
								if (this["ZE"][_sV][1] == -1) {
									break;
								}
							}
							if (_sV == this["ZE"]["length"]) {
								this["ZH"] = false;
							}
							if (this["ZE"][_sV] == null) {
								console["log"]("data[i] null: ");
								this["ZH"] = false;
								this["ZG"]["setLabel"](v_3["gt"]("Scan"));
								this["ZD"]["setEnabled"](true);
								break;
							}
							posData = this["ZE"][_sV][3];
							if (posData != null && posData["split"](":")["length"] == 2) {
								posX = parseInt(posData["split"](":")[0]);
								posY = parseInt(posData["split"](":")[1]);
								v_44 = this["ZE"][_sV][0];
								ClientLib["Data"]["MainData"].GetInstance()["get_Cities"]()["set_CurrentCityId"](v_44);
								v_42 = ClientLib["Data"]["MainData"].GetInstance()["get_Cities"]().GetCity(v_44);
								if (v_42 != null) {
									if (!v_42["get_IsGhostMode"]()) {
										var v_45 = v_42["get_CityBuildingsData"]();
										var v_46 = v_42["get_CityUnitsData"]();
										if (v_45 != null) {
											var v_24 = this["ZC"]["getSelection"]()[0]["getModel"]();
											if (sv == 1) {
												var v_47 = window["MaelstromTools"]["Wrapper"].GetBuildings(v_45);
												var v_48 = window["MaelstromTools"]["Wrapper"].GetDefenseUnits(v_46);
												var v_49 = v_24["get_CityUnitsData"]()["get_OffenseUnits"]()["l"];
											} else {
												var v_47 = v_45["get_Buildings"]()["d"];
												var v_48 = v_46["get_DefenseUnits"]()["d"];
												var v_49 = v_24["get_CityUnitsData"]()["get_OffenseUnits"]()["d"];
											}
											if (v_47 != null) {
												if (sv == 1) {
													var v_4a = window["MaelstromTools"]["Util"]["getResourcesPart"](v_47);
													var v_4b = window["MaelstromTools"]["Util"]["getResourcesPart"](v_48);
												} else {
													var v_4a = getResourcesPart(v_47);
													var v_4b = getResourcesPart(v_48);
												}
												this["ZE"][_sV][2] = v_42["get_Name"]();
												this["ZE"][_sV][5] = v_4a[ClientLib["Base"]["EResourceType"]["Tiberium"]] + v_4b[ClientLib["Base"]["EResourceType"]["Tiberium"]];
												this["ZE"][_sV][6] = v_4a[ClientLib["Base"]["EResourceType"]["Crystal"]] + v_4b[ClientLib["Base"]["EResourceType"]["Crystal"]];
												this["ZE"][_sV][7] = v_4a[ClientLib["Base"]["EResourceType"]["Gold"]] + v_4b[ClientLib["Base"]["EResourceType"]["Gold"]];
												this["ZE"][_sV][8] = v_4a[ClientLib["Base"]["EResourceType"]["ResearchPoints"]] + v_4b[ClientLib["Base"]["EResourceType"]["ResearchPoints"]];
												if (v_42.GetBuildingsConditionInPercent() != 0) {
													this["ZA"] = 0;
													if (this["ZE"][_sV][5] != 0) {
														var v_b = 0;
														var v_4c = 0;
														var v_1a = 0;
														var v_1f = 0;
														var v_9 = 0;
														this["ZM"][v_44] = new Array(9);
														for (v_1a = 0; v_1a < 9; v_1a++) {
															this["ZM"][v_44][v_1a] = new Array(8);
														}
														for (v_1f = 0; v_1f < 9; v_1f++) {
															for (v_9 = 0; v_9 < 8; v_9++) {
																switch (v_42.GetResourceType(v_1f, v_9)) {
																case 1:
																	this["ZM"][v_44][v_1f][v_9] = 1;
																	v_b++;
																	break;
																case 2:
																	this["ZM"][v_44][v_1f][v_9] = 2;
																	v_4c++;
																	break;
																default:
																	break;
																}
															}
														}
														this["ZE"][_sV][9] = v_b;
														this["ZE"][_sV][10] = v_4c;
														this["ZE"][_sV][11] = v_42.GetBuildingsConditionInPercent();
														this["ZE"][_sV][12] = v_42.GetDefenseConditionInPercent();
														try {
															var v_4d = v_49;
															var v_4e = 0;
															var v_4f = 0;
															if (sv == 1) {
																for (var v_50 = 0; v_50 < v_4d["length"]; v_50++) {
																	v_4e += v_4d[v_50]["get_Health"]();
																}
															} else {
																for (var v_50 in v_4d) {
																	v_4e += v_4d[v_50]["get_Health"]();
																}
															}
															v_4d = v_48;
															if (sv == 1) {
																for (var v_50 = 0; v_50 < v_4d["length"]; v_50++) {
																	v_4f += v_4d[v_50]["get_Health"]();
																}
															} else {
																for (var v_50 in v_4d) {
																	v_4f += v_4d[v_50]["get_Health"]();
																}
															}
															v_4d = v_47;
															if (sv == 1) {
																for (var v_50 = 0; v_50 < v_4d["length"]; v_50++) {
																	var v_44 = v_4d[v_50]["get_MdbUnitId"]();
																	if (v_44 == 158 || v_44 == 131 || v_44 == 195) {
																		this["ZE"][_sV][18] = 8 - v_4d[v_50]["get_CoordY"]();
																	}
																	if (v_44 == 112 || v_44 == 151 || v_44 == 177) {
																		this["ZE"][_sV][17] = 8 - v_4d[v_50]["get_CoordY"]();
																	}
																}
															} else {
																for (var v_50 in v_4d) {
																	var v_44 = v_4d[v_50]["get_MdbUnitId"]();
																	if (v_44 == 158 || v_44 == 131 || v_44 == 195) {
																		this["ZE"][_sV][18] = 8 - v_4d[v_50]["get_CoordY"]();
																	}
																	if (v_44 == 112 || v_44 == 151 || v_44 == 177) {
																		this["ZE"][_sV][17] = 8 - v_4d[v_50]["get_CoordY"]();
																	}
																}
															}
														} catch (x) {
															console["log"]("HPRecord", x);
														}
														this["ZE"][_sV][14] = v_4f / v_4e;
														this["ZE"][_sV][15] = this["ZE"][_sV][5] + this["ZE"][_sV][6] + this["ZE"][_sV][7];
														this["ZE"][_sV][16] = this["ZE"][_sV][15] / this["ZE"][_sV][13];
														this["ZE"][_sV][1] = 0;
														v_3e = true;
														console["log"](v_42["get_Name"](), " finish");
														this["ZA"] = 0;
														this["countlastidchecked"] = 0;
														this.FP(_sV + 1, this["ZE"]["length"], 200);
													}
												} else {
													if (this["ZA"] > 250) {
														console["log"](this["ZE"][_sV][2], " on ", posX, posY, " removed (GetBuildingsConditionInPercent == 0)");
														this["ZE"]["splice"](_sV, 1);
														this["ZA"] = 0;
														this["countlastidchecked"] = 0;
														break;
													}
													this["ZA"]++;
												}
											}
										}
									} else {
										console["log"](this["ZE"][_sV][2], " on ", posX, posY, " removed (IsGhostMode)");
										this["ZE"]["splice"](_sV, 1);
										break;
									}
								}
							}
							v_3f++;
							if (v_3f >= v_40) {
								v_3e = true;
								break;
							}
						}
						if (this["lastid"] != _sV) {
							this["lastid"] = _sV;
							this["countlastidchecked"] = 0;
							this["ZA"] = 0;
						} else {
							if (this["countlastidchecked"] > 16) {
								console["log"](this["ZE"][_sV][2], " on ", posX, posY, " removed (found no data)");
								this["ZE"]["splice"](_sV, 1);
								this["countlastidchecked"] = 0;
							} else {
								if (this["countlastidchecked"] > 10) {
									v_41 = 500;
								} else {
									if (this["countlastidchecked"] > 4) {
										v_41 = 250;
									}
								}
							}
							this["countlastidchecked"]++;
						}
						if (this["ZH"] && window["HuffyTools"]["BaseScannerGUI"]["getInstance"]()["Window"]["isVisible"]()) {
							window["setTimeout"]("window.HuffyTools.BaseScannerGUI.getInstance().FG()", v_41);
						} else {
							this["ZG"]["setLabel"](v_3["gt"]("Scan"));
							this["ZH"] = false;
						}
					} catch (e) {
						console["log"]("MaelstromTools_Basescanner getResources", e);
					}
				}
			}
		});
		qx["Class"]["define"]("HuffyTools.BaseScannerLayout", {
			type : "singleton",
			extend : MaelstromTools["DefaultObject"],
			members : {
				ZW : null,
				ZZ : null,
				ZY : null,
				ZX : null,
				FC : function () {
					try {
						console["log"]("BaseScannerLayout.FC: ");
						this["ZW"] = [];
						this["Window"]["setPadding"](0);
						this["Window"]["set"]({
							resizable : false
						});
						this["Window"]["removeAll"]();
						this["Window"]["setLayout"]((new qx["ui"]["layout"].Flow)["set"]({
								spacingX : 3,
								spacingY : 3
							}));
						this["ZZ"] = (new qx["ui"]["container"].Scroll)["set"]({
							width : 800,
							height : 350
						});
						this["ZY"] = new qx["ui"]["container"].Composite;
						this["ZY"]["setLayout"]((new qx["ui"]["layout"].Flow)["set"]({
								spacingX : 3,
								spacingY : 3
							}));
						this["Window"]["add"](this.ZZ);
						this["ZZ"]["add"](this.ZY);
						this.FO();
					} catch (e) {
						console["log"]("HuffyTools.BaseScannerLayout.FC: ", e);
					}
				},
				updateCache : function () {
					try {}
					catch (e) {
						console["log"]("HuffyTools.BaseScannerLayout.updateCache: ", e);
					}
				},
				setWidgetLabels : function () {
					try {
						if (this["ZW"] == null) {
							this.FC();
						}
					} catch (e) {
						console["log"]("HuffyTools.BaseScannerLayout.setWidgetLabels: ", e);
					}
				},
				FO : function () {
					var v_51 = window["HuffyTools"]["BaseScannerGUI"]["getInstance"]()["ZM"];
					var v_52 = window["HuffyTools"]["BaseScannerGUI"]["getInstance"]()["ZE"];
					this["ZX"] = [];
					var v_53 = window["HuffyTools"]["BaseScannerGUI"]["getInstance"]()["ZJ"]["getSelection"]()[0]["getModel"]();
					var v_54 = null;
					if (v_52 == null) {
						console["log"]("ZE null: ");
						return;
					}
					this["ZW"] = [];
					var v_44;
					var _sV;
					var v_55;
					var v_56;
					var v_57;
					for (v_44 in v_51) {
						for (_sV = 0; _sV < v_52["length"]; _sV++) {
							if (v_52[_sV][0] == v_44) {
								v_54 = v_52[_sV];
							}
						}
						if (v_54 == null) {
							continue;
						}
						if (v_53 > 4 && v_53 < 8) {
							if (v_53 != v_54[10]) {
								continue;
							}
						} else {
							continue;
						}
						posData = v_54[3];
						if (posData != null && posData["split"](":")["length"] == 2) {
							posX = parseInt(posData["split"](":")[0]);
							posY = parseInt(posData["split"](":")[1]);
						}
						var _qV = "<table border=\"2\" cellspacing=\"0\" cellpadding=\"0\">";
						var v_58 = v_54[2] + " - " + v_54[3];
						_qV = _qV + "<tr><td colspan=\"9\"><font color=\"#FFF\">" + v_58 + "</font></td></tr>";
						for (v_56 = 0; v_56 < 8; v_56++) {
							_qV = _qV + "<tr>";
							for (v_55 = 0; v_55 < 9; v_55++) {
								var v_59 = "";
								var v_5a = v_51[v_44][v_55][v_56];
								switch (v_5a == undefined ? 0 : v_5a) {
								case 2:
									v_59 = "<img width=\"14\" height=\"14\" src=\"" + v_5["images"][MaelstromTools["Statics"]["Tiberium"]] + "\">";
									break;
								case 1:
									v_59 = "<img width=\"14\" height=\"14\" src=\"" + v_5["images"][MaelstromTools["Statics"]["Crystal"]] + "\">";
									break;
								default:
									v_59 = "<img width=\"14\" height=\"14\" src=\"" + v_5["images"]["Emptypixels"] + "\">";
									break;
								}
								_qV = _qV + "<td>" + v_59 + "</td>";
							}
							_qV = _qV + "</tr>";
						}
						_qV = _qV + "</table>";
						var v_9 = (new qx["ui"]["basic"].Label)["set"]({
							backgroundColor : "#303030",
							value : _qV,
							rich : true
						});
						v_9["cid"] = v_44;
						this["ZX"]["push"](v_44);
						v_9["addListener"]("click", function (v_d) {
							console["log"]("clickid ", this["cid"]);
							var v_12 = qx["core"]["Init"]["getApplication"]();
							v_12["getBackgroundArea"]()["closeCityInfo"]();
							v_12["getPlayArea"]()["setView"](ZS, this["cid"], 0, 0);
						});
						v_9["setReturnValue"] = v_44;
						this["ZW"]["push"](v_9);
						this["ZY"]["removeAll"]();
						for (v_57 = 0; v_57 < this["ZW"]["length"]; v_57++) {
							this["ZY"]["add"](this["ZW"][v_57]);
						}
					}
				}
			}
		});
	}
	function getResourcesPart(v_5c) {
		try {
			var v_3c = [0, 0, 0, 0, 0, 0, 0, 0];
			if (v_5c == null) {
				return v_3c;
			}
			for (var _sV in v_5c) {
				var v_5d = v_5c[_sV];
				var v_5e = MaelstromTools["Wrapper"].GetUnitLevelRequirements(v_5d);
				for (var v_55 = 0; v_55 < v_5e["length"]; v_55++) {
					v_3c[v_5e[v_55]["Type"]] += v_5e[v_55]["Count"] * v_5d["get_HitpointsPercent"]();
					if (v_5d["get_HitpointsPercent"]() < 1) {}
					
				}
			}
			return v_3c;
		} catch (e) {
			console["log"]("MaelstromTools_Basescanner getResourcesPart", e);
		}
	}
	function objfnkstrON(v_25) {
		var v_60;
		for (v_60 in v_25) {
			if (typeof v_25[v_60] == "function") {
				var v_61 = v_25[v_60].toString();
				console["log"](v_60, v_61);
			}
		}
	}
	function foundfnkstring(v_25, v_63, v_64, _rV) {
		var v_65 = [];
		var v_61 = v_25.toString();
		var v_66 = v_61["replace"](/\s/gim, "");
		v_65 = v_66["match"](v_63);
		var _sV;
		for (_sV = 1; _sV < _rV + 1; _sV++) {
			if (v_65 != null && v_65[_sV]["length"] == 6) {
				console["log"](v_64, _sV, v_65[_sV]);
			} else {
				console["error"]("Error - ", v_64, _sV, "not found");
				console["warn"](v_64, v_66);
			}
		}
		return v_65;
	}
	function MaelstromTools_Basescanner_checkIfLoaded() {
		try {
			if (typeof qx != "undefined" && typeof MaelstromTools != "undefined") {
				createMaelstromTools_Basescanner();
			} else {
				window["setTimeout"](MaelstromTools_Basescanner_checkIfLoaded, 1000);
			}
		} catch (e) {
			console["log"]("MaelstromTools_Basescanner_checkIfLoaded: ", e);
		}
	}
	if (/commandandconquer\.com/i["test"](document["domain"])) {
		window["setTimeout"](MaelstromTools_Basescanner_checkIfLoaded, 10000);
	}
})();

