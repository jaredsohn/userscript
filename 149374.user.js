// ==UserScript==
// @name        Maelstrom ADDON Basescanner
// @namespace   http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @description Maelstrom ADDON Basescanner
// @include     http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version     0.8.4.2
// @author      BlinDManX
// @grant       none
// ==/UserScript==
(function () {
    var c = function () {
        try {
            window.__msbs_version = 0.8;
            console.log("Maelstrom_Basescanner " + window.__msbs_version + " loaded");

            function k() {
                qx.debug = true;
                console.log("Maelstrom_Basescanner initalisiert");
                var o = null;
                var m = null;
                var n = null;
                var q = null;
                var p = 0;
                var s = 0;
                q = ClientLib.File.FileManager.GetInstance();
                o = window.MaelstromTools.Language.getInstance();
                m = window.MaelstromTools.Cache.getInstance();
                n = window.MaelstromTools.Base.getInstance();
                var e = o.Languages.indexOf(qx.locale.Manager.getInstance()
                    .getLocale());
                if (e >= 0) {
                    o.Data["Point"] = ["Position", "Position", "Position"][e];
                    o.Data["BaseScanner Overview"] = ["Basescanner Übersicht", "Visão geral do scanner de base", "Aperçu du scanner de base"][e];
                    o.Data["Scan"] = ["Scannen", "Esquadrinhar", "Balayer"][e];
                    o.Data["Location"] = ["Lage", "localização", "Emplacement"][e];
                    o.Data["Player"] = ["Spieler", "Jogador", "Joueur"][e];
                    o.Data["Bases"] = ["Basen", "Bases", "Bases"][e];
                    o.Data["Camp,Outpost"] = ["Lager,Vorposten", "Camp,posto avançado", "Camp,avant-poste"][e];
                    o.Data["BaseScanner Layout"] = ["BaseScanner Layout", "Layout da Base de Dados de Scanner", "Mise scanner de base"][e];
                    o.Data["Show Layouts"] = ["Layouts anzeigen", "Mostrar Layouts", "Voir Layouts"][e];
                    o.Data["Building state"] = ["Gebäudezustand", "construção do Estado", "construction de l'État"][e];
                    o.Data["Defense state"] = ["Verteidigungszustand", "de Defesa do Estado", "défense de l'Etat"][e];
                    o.Data["CP"] = ["KP", "CP", "CP"][e];
                    o.Data["CP Limit"] = ["KP begrenzen", "CP limitar", "CP limiter"][e]
                }
                n.createNewImage("BaseScanner", "ui/icons/icon_item.png", q);
                n.createNewImage("Emptypixels", "ui/menues/main_menu/misc_empty_pixel.png", q);
                n.createNewWindow("BaseScanner", "L", 120, 60, 820, 400);
                n.createNewWindow("BaseScannerLayout", "L", 120, 460, 820, 350);
                var r = n.createDesktopButton(o.gt("BaseScanner Overview"), "BaseScanner", false, n.desktopPosition(2));
                r.addListener("execute", function () {
                    if (window.HuffyTools.BaseScannerGUI.getInstance()
                        .Window != null) {}
                    window.HuffyTools.BaseScannerGUI.getInstance()
                        .openWindow("BaseScanner", o.gt("BaseScanner Overview"))
                }, this);
                n.addToMainMenu("BaseScanner", r);
                qx.Class.define("HuffyTools.BaseScannerGUI", {
                    type: "singleton",
                    extend: MaelstromTools.DefaultObject,
                    members: {
                        HT_Tables: null,
                        HT_Models: null,
                        HT_Options: null,
                        HT_Frame: null,
                        HT_Stats: null,
                        upgradeInProgress: null,
                        scanButton: null,
                        runloop: null,
                        CitySelect: null,
                        HT_ShowBase: null,
                        resmap: null,
                        resmapViewOptions: null,
                        resmapViewButton: null,
                        rowData: null,
                        cplimiter: null,
                        buildingsConditioncount: 0,
                        toggleoptions: true,
                        moreoptions: null,
                        colvis: [],
                        tableSettingsbox: null,
                        tableSettingsCheckbox: [],
                        init: function () {
                            try {
                                this.upgradeInProgress = false;
                                this.createTable();
                                this.createOptions();
                                this.createFrame();
                                if (this.rowData == null) {
                                    this.rowData = []
                                }
                                this.Window.setPadding(0);
                                this.Window.set({
                                    resizable: true
                                });
                                this.Window.removeAll();
                                this.Window.add(this.HT_Options);
                                this.Window.add(this.HT_Tables);
                                this.Window.add(this.HT_Stats);
                                this.Window.addListener("close", window.HuffyTools.BaseScannerGUI.getInstance()
                                    .closeCallback)
                            } catch (l) {
                                console.log("HuffyTools.BaseScannerGUI.init: ", l)
                            }
                        },
                        createTable: function () {
                            try {
                                this.HT_Models = new qx.ui.table.model.Simple();
                                this.HT_Models.setColumns(["ID", "LoadState", o.gt("City"), o.gt("Location"), o.gt("Level"), o.gt(MaelstromTools.Statics.Tiberium), o.gt(MaelstromTools.Statics.Crystal), o.gt(MaelstromTools.Statics.Dollar), o.gt(MaelstromTools.Statics.Research), "Crystalfields", "Tiberiumfields", o.gt("Building state"), o.gt("Defense state"), o.gt("CP"), "Def.HP/Off.HP", "Sum Tib+Cry+Cre", "(Tib+Cry+Cre)/CP"]);
                                this.HT_Tables = new qx.ui.table.Table(this.HT_Models);
                                this.HT_Tables.setColumnVisibilityButtonVisible(false);
                                this.HT_Tables.setColumnWidth(0, 0);
                                this.HT_Tables.setColumnWidth(1, 0);
                                this.HT_Tables.setColumnWidth(2, 120);
                                this.HT_Tables.setColumnWidth(3, 60);
                                this.HT_Tables.setColumnWidth(4, 50);
                                this.HT_Tables.setColumnWidth(5, 60);
                                this.HT_Tables.setColumnWidth(6, 60);
                                this.HT_Tables.setColumnWidth(7, 60);
                                this.HT_Tables.setColumnWidth(8, 60);
                                this.HT_Tables.setColumnWidth(9, 30);
                                this.HT_Tables.setColumnWidth(10, 30);
                                this.HT_Tables.setColumnWidth(11, 50);
                                this.HT_Tables.setColumnWidth(12, 50);
                                this.HT_Tables.setColumnWidth(13, 30);
                                this.HT_Tables.setColumnWidth(14, 60);
                                this.HT_Tables.setColumnWidth(15, 60);
                                this.HT_Tables.setColumnWidth(16, 60);
                                var t = this.HT_Tables.getTableColumnModel();
                                for (var u = 0; u < this.HT_Models.getColumnCount(); u++) {
                                    if (u == 0 || u == 1 || u == 11 || u == 12) {
                                        t.setColumnVisible(u, MaelstromTools.LocalStorage.get("MS_Basescanner_Column_" + u, false))
                                    } else {
                                        t.setColumnVisible(u, MaelstromTools.LocalStorage.get("MS_Basescanner_Column_" + u, true))
                                    }
                                }
                                t.setColumnVisible(1, false);
                                t.setHeaderCellRenderer(9, new qx.ui.table.headerrenderer.Icon(n.images[MaelstromTools.Statics.Crystal]), "Crystalfields");
                                t.setHeaderCellRenderer(10, new qx.ui.table.headerrenderer.Icon(n.images[MaelstromTools.Statics.Tiberium], "Tiberiumfields"));
                                t.setDataCellRenderer(5, new HuffyTools.ReplaceRender()
                                    .set({
                                    ReplaceFunction: this.formatTiberiumAndPower
                                }));
                                t.setDataCellRenderer(6, new HuffyTools.ReplaceRender()
                                    .set({
                                    ReplaceFunction: this.formatTiberiumAndPower
                                }));
                                t.setDataCellRenderer(7, new HuffyTools.ReplaceRender()
                                    .set({
                                    ReplaceFunction: this.formatTiberiumAndPower
                                }));
                                t.setDataCellRenderer(8, new HuffyTools.ReplaceRender()
                                    .set({
                                    ReplaceFunction: this.formatTiberiumAndPower
                                }));
                                t.setDataCellRenderer(15, new HuffyTools.ReplaceRender()
                                    .set({
                                    ReplaceFunction: this.formatTiberiumAndPower
                                }));
                                t.setDataCellRenderer(16, new HuffyTools.ReplaceRender()
                                    .set({
                                    ReplaceFunction: this.formatTiberiumAndPower
                                }));
                                this.HT_Tables.addListener("cellDblclick", function (v) {
                                    window.HuffyTools.BaseScannerGUI.getInstance()
                                        .cellDoubleClickCallback(v)
                                }, this)
                            } catch (l) {
                                console.log("HuffyTools.BaseScannerGUI.createTable: ", l)
                            }
                        },
                        cellDoubleClickCallback: function (u) {
                            try {
                                var A = this.rowData[u.getRow()][0];
                                var z = this.rowData[u.getRow()][3];
                                if (z != null && z.split(":")
                                    .length == 2) {
                                    var w = parseInt(z.split(":")[0]);
                                    var v = parseInt(z.split(":")[1]);
                                    ClientLib.Vis.VisMain.GetInstance()
                                        .CenterGridPosition(w, v)
                                }
                                if (A) {
                                    var l = qx.core.Init.getApplication();
                                    l.getBackgroundArea()
                                        .closeCityInfo();
                                    l.getPlayArea()
                                        .setView(webfrontend.gui.PlayArea.PlayArea.modes.EMode_CombatSetupDefense, A, 0, 0)
                                }
                            } catch (t) {
                                console.log("HuffyTools.BaseScannerGUI cellDoubleClickCallback error: ", t)
                            }
                        },
                        closeCallback: function (l) {
                            this.runloop = false
                        },
                        CBChanged: function (l) {
                            this.upgradeInProgress = false;
                            this.runloop = false
                        },
                        formatTiberiumAndPower: function (l) {
                            return webfrontend.gui.Util.formatNumbersCompact(l)
                        },
                        updateCache: function () {
                            try {} catch (l) {
                                console.log("HuffyTools.BaseScannerGUI.updateCache: ", l)
                            }
                        },
                        setWidgetLabels: function () {
                            try {
                                if (!this.HT_Models) {
                                    this.init()
                                }
                                this.HT_Models.setData(this.rowData)
                            } catch (l) {
                                console.log("HuffyTools.BaseScannerGUI.setWidgetLabels: ", l)
                            }
                        },
                        createOptions: function () {
                            try {
                                var z = new qx.ui.layout.Flow();
                                var C = new qx.ui.container.Composite(z);
                                this.CitySelect = new qx.ui.form.SelectBox();
                                this.CitySelect.setHeight(25);
                                this.CitySelect.setMargin(5);
                                m.updateCityCache();
                                m = window.MaelstromTools.Cache.getInstance();
                                for (var w in m.Cities) {
                                    var D = new qx.ui.form.ListItem(w, null, m.Cities[w].Object);
                                    this.CitySelect.add(D);
                                    if (MaelstromTools.LocalStorage.get("MS_Basescanner_LastCityID") == m.Cities[w].Object.get_Id()) {
                                        this.CitySelect.setSelection([D])
                                    }
                                }
                                C.add(this.CitySelect);
                                var u = new qx.ui.basic.Label()
                                    .set({
                                    value: o.gt("CP Limit"),
                                    textColor: "white",
                                    margin: 5
                                });
                                C.add(u);
                                this.cplimiter = new qx.ui.form.SelectBox();
                                this.cplimiter.setWidth(50);
                                this.cplimiter.setHeight(25);
                                this.cplimiter.setMargin(5);
                                var t = MaelstromTools.LocalStorage.get("MS_Basescanner_Cplimiter", 25);
                                for (u = 10; u < 46; u += 5) {
                                    D = new qx.ui.form.ListItem("" + u, null, u);
                                    this.cplimiter.add(D);
                                    if (t == u) {
                                        this.cplimiter.setSelection([D])
                                    }
                                }
                                C.add(this.cplimiter);
                                this.HT_ShowBase = [];
                                this.HT_ShowBase[0] = new qx.ui.form.CheckBox(o.gt("Player"));
                                this.HT_ShowBase[0].setMargin(5);
                                this.HT_ShowBase[0].setTextColor("white");
                                this.HT_ShowBase[0].setValue(MaelstromTools.LocalStorage.get("MS_Basescanner_Show0", false));
                                C.add(this.HT_ShowBase[0]);
                                this.HT_ShowBase[1] = new qx.ui.form.CheckBox(o.gt("Bases"));
                                this.HT_ShowBase[1].setMargin(5);
                                this.HT_ShowBase[1].setTextColor("white");
                                this.HT_ShowBase[1].setValue(MaelstromTools.LocalStorage.get("MS_Basescanner_Show1", false));
                                C.add(this.HT_ShowBase[1]);
                                this.HT_ShowBase[2] = new qx.ui.form.CheckBox(o.gt("Camp,Outpost"));
                                this.HT_ShowBase[2].setMargin(5);
                                this.HT_ShowBase[2].setTextColor("white");
                                this.HT_ShowBase[2].setValue(MaelstromTools.LocalStorage.get("MS_Basescanner_Show2", true));
                                C.add(this.HT_ShowBase[2]);
                                this.scanButton = new qx.ui.form.Button(o.gt("Scan"))
                                    .set({
                                    width: 100,
                                    minWidth: 100,
                                    maxWidth: 100,
                                    height: 25,
                                    margin: 5
                                });
                                this.scanButton.addListener("execute", function () {
                                    this.beforscan()
                                }, this);
                                C.add(this.scanButton, {
                                    lineBreak: true
                                });
                                this.resmapViewOptions = new qx.ui.form.SelectBox();
                                this.resmapViewOptions.setWidth(150);
                                this.resmapViewOptions.setHeight(25);
                                this.resmapViewOptions.setMargin(5);
                                var D = new qx.ui.form.ListItem("7 " + o.gt(MaelstromTools.Statics.Tiberium) + " 5 " + o.gt(MaelstromTools.Statics.Crystal), null, 7);
                                this.resmapViewOptions.add(D);
                                D = new qx.ui.form.ListItem("6 " + o.gt(MaelstromTools.Statics.Tiberium) + " 6 " + o.gt(MaelstromTools.Statics.Crystal), null, 6);
                                this.resmapViewOptions.add(D);
                                D = new qx.ui.form.ListItem("5 " + o.gt(MaelstromTools.Statics.Tiberium) + " 7 " + o.gt(MaelstromTools.Statics.Crystal), null, 5);
                                this.resmapViewOptions.add(D);
                                C.add(this.resmapViewOptions);
                                this.resmapViewButton = new qx.ui.form.Button(o.gt("Get Layouts"))
                                    .set({
                                    width: 120,
                                    minWidth: 120,
                                    maxWidth: 120,
                                    height: 25,
                                    margin: 5
                                });
                                this.resmapViewButton.addListener("execute", function () {
                                    var l = window.HuffyTools.BaseScannerLayout.getInstance();
                                    if (l.Window != null) {
                                        l.Window.close();
                                        l.createmap()
                                    }
                                    l.openWindow("BaseScannerLayout", o.gt("BaseScanner Layout"))
                                }, this);
                                this.resmapViewButton.setEnabled(false);
                                C.add(this.resmapViewButton);
                                this.tableSettingsbox = new qx.ui.container.Composite;
                                this.tableSettingsbox.setLayout(new qx.ui.layout.Flow());
                                this.tableSettingsbox.setWidth(750);
                                for (var v = 2; v < this.HT_Models.getColumnCount(); v++) {
                                    var A = v - 2;
                                    this.tableSettingsCheckbox[A] = new qx.ui.form.CheckBox(this.HT_Models.getColumnName(v));
                                    this.tableSettingsCheckbox[A].setValue(this.HT_Tables.getTableColumnModel()
                                        .isColumnVisible(v));
                                    this.tableSettingsCheckbox[A].setTextColor("white");
                                    this.tableSettingsCheckbox[A].index = v;
                                    this.tableSettingsCheckbox[A].table = this.HT_Tables;
                                    this.tableSettingsCheckbox[A].addListener("changeValue", function (l) {
                                        console.log("klick", l, l.getData(), this.index);
                                        var E = this.table.getTableColumnModel();
                                        E.setColumnVisible(this.index, l.getData());
                                        MaelstromTools.LocalStorage.set("MS_Basescanner_Column_" + this.index, l.getData())
                                    });
                                    this.tableSettingsbox.add(this.tableSettingsCheckbox[A])
                                }
                                this.moreoptions = new qx.ui.form.Button("+")
                                    .set({
                                    margin: 5
                                });
                                this.moreoptions.addListener("execute", function () {
                                    if (this.toggleoptions) {
                                        C.addAfter(this.tableSettingsbox, this.moreoptions);
                                        this.moreoptions.setLabel("-")
                                    } else {
                                        C.remove(this.tableSettingsbox);
                                        this.moreoptions.setLabel("+")
                                    }
                                    this.toggleoptions = !this.toggleoptions
                                }, this);
                                this.moreoptions.setAlignX("right");
                                C.add(this.moreoptions, {
                                    lineBreak: true
                                });
                                this.HT_Options = C
                            } catch (B) {
                                console.log("HuffyTools.BaseScannerGUI.createOptions: ", B)
                            }
                        },
                        beforscan: function () {
                            this.scanButton.setEnabled(false);
                            this.resmapViewButton.setEnabled(false);
                            var w = this.CitySelect.getSelection()[0].getModel();
                            ClientLib.Vis.VisMain.GetInstance()
                                .CenterGridPosition(w.get_PosX(), w.get_PosY());
                            ClientLib.Vis.VisMain.GetInstance()
                                .Update();
                            ClientLib.Vis.VisMain.GetInstance()
                                .ViewUpdate();
                            ClientLib.Data.MainData.GetInstance()
                                .get_Cities()
                                .set_CurrentCityId(w.get_Id());
                            window.setTimeout("window.HuffyTools.BaseScannerGUI.getInstance().scan()", 1000);
                            var v = ClientLib.Data.WorldSector.WorldObjectCity.prototype;
                            var u = g(v["$ctor"], /=0;this\.(.{6})=g>>7&255;.*d\+=f;this\.(.{6})=\(/, "ClientLib.Data.WorldSector.WorldObjectCity", 2);
                            if (u != null && u[1].length == 6) {
                                v.getLevel = function () {
                                    return this[u[1]]
                                }
                            } else {
                                console.error("Error - ClientLib.Data.WorldSector.WorldObjectCity.Level undefined")
                            }
                            if (u != null && u[2].length == 6) {
                                v.getID = function () {
                                    return this[u[2]]
                                }
                            } else {
                                console.error("Error - ClientLib.Data.WorldSector.WorldObjectCity.ID undefined")
                            }
                            v = ClientLib.Data.WorldSector.WorldObjectNPCBase.prototype;
                            var t = g(v["$ctor"], /100;this\.(.{6})=Math.floor.*d\+=f;this\.(.{6})=\(/, "ClientLib.Data.WorldSector.WorldObjectNPCBase", 2);
                            if (t != null && t[1].length == 6) {
                                v.getLevel = function () {
                                    return this[t[1]]
                                }
                            } else {
                                console.error("Error - ClientLib.Data.WorldSector.WorldObjectNPCBase.Level undefined")
                            }
                            if (t != null && t[2].length == 6) {
                                v.getID = function () {
                                    return this[t[2]]
                                }
                            } else {
                                console.error("Error - ClientLib.Data.WorldSector.WorldObjectNPCBase.ID undefined")
                            }
                            v = ClientLib.Data.WorldSector.WorldObjectNPCCamp.prototype;
                            var l = g(v["$ctor"], /100;this\.(.{6})=Math.floor.*=-1;\}this\.(.{6})=\(/, "ClientLib.Data.WorldSector.WorldObjectNPCCamp", 2);
                            if (l != null && l[1].length == 6) {
                                v.getLevel = function () {
                                    return this[l[1]]
                                }
                            } else {
                                console.error("Error - ClientLib.Data.WorldSector.WorldObjectNPCCamp.Level undefined")
                            }
                            if (l != null && l[2].length == 6) {
                                v.getID = function () {
                                    return this[l[2]]
                                }
                            } else {
                                console.error("Error - ClientLib.Data.WorldSector.WorldObjectNPCCamp.ID undefined")
                            }
                        },
                        scan: function () {
                            try {
                                this.upgradeInProgress = true;
                                this.rowData = [];
                                var w = this.CitySelect.getSelection()[0].getModel();
                                MaelstromTools.LocalStorage.set("MS_Basescanner_LastCityID", w.get_Id());
                                var K = this.cplimiter.getSelection()[0].getModel();
                                MaelstromTools.LocalStorage.set("MS_Basescanner_Cplimiter", K);
                                var F = this.HT_ShowBase[0].getValue();
                                var D = this.HT_ShowBase[1].getValue();
                                var C = this.HT_ShowBase[2].getValue();
                                console.log("Select", F, D, C);
                                MaelstromTools.LocalStorage.set("MS_Basescanner_Show0", F);
                                MaelstromTools.LocalStorage.set("MS_Basescanner_Show1", D);
                                MaelstromTools.LocalStorage.set("MS_Basescanner_Show2", C);
                                var u = w.get_PosX();
                                var t = w.get_PosY();
                                var J = 0;
                                var I = 0;
                                var E = ClientLib.Data.MainData.GetInstance()
                                    .get_World();
                                console.log("Scanning from: " + w.get_Name());
                                var v = ClientLib.Data.MainData.GetInstance()
                                    .get_Server()
                                    .get_MaxAttackDistance();
                                for (I = t - Math.floor(v + 1); I <= t + Math.floor(v + 1); I++) {
                                    for (J = u - Math.floor(v + 1); J <= u + Math.floor(v + 1); J++) {
                                        var B = Math.abs(u - J);
                                        var A = Math.abs(t - I);
                                        var l = Math.sqrt((B * B) + (A * A));
                                        if (l <= v) {
                                            var L = E.GetObjectFromPosition(J, I);
                                            var G = {};
                                            if (L) {
                                                var z = w.CalculateAttackCommandPointCostToCoord(J, I);
                                                if (z <= K) {
                                                    if (L.Type == 1 && F) {
                                                        // this.rowData.push([L.getID(), - 1, o.gt("Player"), J + ":" + I, L.getLevel(), 0, 0, 0, 0, 0, 0, 0, 0, z, 0, 0, 0])
                                                        this.rowData.push([this.getID(L), - 1, o.gt("Player"), J + ":" + I, this.getLevel(L), 0, 0, 0, 0, 0, 0, 0, 0, z, 0, 0, 0])
                                                    }
                                                    if (L.Type == 2 && D) {
                                                        // this.rowData.push([L.getID(), - 1, o.gt("Bases"), J + ":" + I, L.getLevel(), 0, 0, 0, 0, 0, 0, 0, 0, z, 0, 0, 0])
                                                        this.rowData.push([this.getID(L), - 1, o.gt("Bases"), J + ":" + I, this.getLevel(L), 0, 0, 0, 0, 0, 0, 0, 0, z, 0, 0, 0])
                                                    }
                                                    if (L.Type == 3 && C) {
                                                        // this.rowData.push([L.getID(), - 1, o.gt("Camp,Outpost"), J + ":" + I, L.getLevel(), 0, 0, 0, 0, 0, 0, 0, 0, z, 0, 0, 0])
                                                        this.rowData.push([this.getID(L), - 1, o.gt("Camp,Outpost"), J + ":" + I, this.getLevel(L), 0, 0, 0, 0, 0, 0, 0, 0, z, 0, 0, 0])
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                this.runloop = true;
                                this.resmap = {};
                                this.HT_Models.sortByColumn(4, false);
                                window.setTimeout("window.HuffyTools.BaseScannerGUI.getInstance().getResourcesByID()", 50)
                            } catch (H) {
                                console.log("Maelstrom_Basescanner scan error: ", H)
                            }
                        },
                        getID: function(o) {
                            try {
                                var idKey = o.$ctor.toString().match(/\}this.([A-Z]{6})=\(e\.\$r\=\$I/g)[1].substr(6, 6);
                                id = o[idKey];
                            } catch (E) {
                                colsole.log('cant find ID "getID".', E);
                            }
                            if (!id) {
                                for(var n in o) {
                                    if (o[n].toString().match(/[0-9]{6}/)) {
                                        id = o[n];
                                        break;
                                    }
                                }
                            }
                            return id;
                        },
                        getLevel: function(o) {
                            lvl = 0;
                            try {
                                var idKey = o.$ctor.toString().match(/this.[A-Z]{1,}=Math.floor/g)[0].substr(5, 6)
                                lvl = o[idKey];
                            } catch (E) {
                                colsole.log('cant find Level "getLevel".', E);
                            }
                            if (!lvl) {
                                for(var n in o) {
                                    if (o[n].toString().match(/[0-9]{2}/)) {
                                        lvl = o[n];
                                        break;
                                    }
                                }
                            }
                            return lvl;
                        },
                        getResourcesByID: function () {
                            try {
                                var T = false;
                                var B = 0;
                                var J = 10;
                                var S = 0;
                                var v = 150;
                                while (!T) {
                                    var N = null;
                                    var z = 0;
                                    var O = 0;
                                    if (this.rowData == null) {
                                        console.log("rowData null: ");
                                        this.runloop = false;
                                        break
                                    }
                                    for (S = 0; S < this.rowData.length; S++) {
                                        if (this.rowData[S][1] == -1) {
                                            break
                                        }
                                    }
                                    if (S == this.rowData.length) {
                                        this.runloop = false
                                    }
                                    if (this.rowData[S] == null) {
                                        console.log("rowData[i] null: ");
                                        this.runloop = false;
                                        this.scanButton.setEnabled(true);
                                        this.resmapViewButton.setEnabled(true);
                                        break
                                    }
                                    posData = this.rowData[S][3];
                                    if (posData != null && posData.split(":")
                                        .length == 2) {
                                        posX = parseInt(posData.split(":")[0]);
                                        posY = parseInt(posData.split(":")[1]);
                                        O = this.rowData[S][0];
                                        webfrontend.gui.UtilView.openVisModeInMainWindow(1, O, false);
                                        N = window.MaelstromTools.Wrapper.GetCity(O);
                                        if (N != null) {
                                            if (!N.get_IsGhostMode()) {
                                                var D = N.get_CityBuildingsData();
                                                var H = N.get_CityUnitsData();
                                                if (D != null) {
                                                    var E = window.MaelstromTools.Wrapper.GetBuildings(D);
                                                    var C = window.MaelstromTools.Wrapper.GetDefenseUnits(H);
                                                    if (E != null) {
                                                        var I = window.MaelstromTools.Util.getResourcesPart(E);
                                                        var F = window.MaelstromTools.Util.getResourcesPart(C);
                                                        this.rowData[S][2] = N.get_Name();
                                                        this.rowData[S][5] = I[ClientLib.Base.EResourceType.Tiberium] + F[ClientLib.Base.EResourceType.Tiberium];
                                                        this.rowData[S][6] = I[ClientLib.Base.EResourceType.Crystal] + F[ClientLib.Base.EResourceType.Crystal];
                                                        this.rowData[S][7] = I[ClientLib.Base.EResourceType.Gold] + F[ClientLib.Base.EResourceType.Gold];
                                                        this.rowData[S][8] = I[ClientLib.Base.EResourceType.ResearchPoints] + F[ClientLib.Base.EResourceType.ResearchPoints];
                                                        if (N.GetBuildingsConditionInPercent() != 0) {
                                                            this.buildingsConditioncount = 0;
                                                            if (this.rowData[S][5] != 0) {
                                                                var W = 0;
                                                                var M = 0;
                                                                this.resmap[O] = new Array(9);
                                                                for (var P = 0; P < 9; P++) {
                                                                    this.resmap[O][P] = new Array(8)
                                                                }
                                                                for (var R = 0; R < 9; R++) {
                                                                    for (var Q = 0; Q < 8; Q++) {
                                                                        switch (N.GetResourceType(R, Q)) {
                                                                        case 1:
                                                                            this.resmap[O][R][Q] = 1;
                                                                            W++;
                                                                            break;
                                                                        case 2:
                                                                            this.resmap[O][R][Q] = 2;
                                                                            M++;
                                                                            break;
                                                                        default:
                                                                            break
                                                                        }
                                                                    }
                                                                }
                                                                this.rowData[S][9] = W;
                                                                this.rowData[S][10] = M;
                                                                this.rowData[S][11] = N.GetBuildingsConditionInPercent();
                                                                this.rowData[S][12] = N.GetDefenseConditionInPercent();
                                                                try {
                                                                    var G = this.CitySelect.getSelection()[0].getModel();
                                                                    var L = G.get_CityUnitsData()
                                                                        .get_OffenseUnits()
                                                                        .l;
                                                                    var w = 0;
                                                                    var A = 0;
                                                                    for (var U = 0; U < L.length; U++) {
                                                                        w += L[U].get_Health()
                                                                    }
                                                                    L = N.get_CityUnitsData()
                                                                        .get_DefenseUnits()
                                                                        .l;
                                                                    for (U = 0; U < L.length; U++) {
                                                                        A += L[U].get_Health()
                                                                    }
                                                                } catch (K) {
                                                                    console.log("HPRecord", K)
                                                                }
                                                                this.rowData[S][14] = (A / w);
                                                                this.rowData[S][15] = this.rowData[S][5] + this.rowData[S][6] + this.rowData[S][7];
                                                                this.rowData[S][16] = this.rowData[S][15] / this.rowData[S][13];
                                                                this.rowData[S][1] = 0;
                                                                T = true;
                                                                console.log(N.get_Name(), " finish")
                                                            }
                                                        } else {
                                                            if (this.buildingsConditioncount > 150) {
                                                                console.log(this.rowData[S][2], " on ", posX, posY, " removed (GetBuildingsConditionInPercent == 0)");
                                                                this.rowData.splice(S, 1);
                                                                break
                                                            }
                                                            this.buildingsConditioncount++
                                                        }
                                                    }
                                                }
                                            } else {
                                                console.log(this.rowData[S][2], " on ", posX, posY, " removed (IsGhostMode)");
                                                this.rowData.splice(S, 1);
                                                break
                                            }
                                        }
                                    }
                                    B++;
                                    if (B >= J) {
                                        T = true;
                                        break
                                    }
                                }
                                if (this.lastid != S) {
                                    this.lastid = S;
                                    this.countlastidchecked = 0
                                } else {
                                    if (this.countlastidchecked > 16) {
                                        console.log(this.rowData[S][2], " on ", posX, posY, " removed (found no data)");
                                        this.rowData.splice(S, 1);
                                        this.countlastidchecked = 0
                                    } else {
                                        if (this.countlastidchecked > 10) {
                                            v = 500
                                        } else {
                                            if (this.countlastidchecked > 4) {
                                                v = 250
                                            }
                                        }
                                    }
                                    this.countlastidchecked++
                                }
                                if (this.runloop && window.HuffyTools.BaseScannerGUI.getInstance()
                                    .Window.isVisible()) {
                                    window.setTimeout("window.HuffyTools.BaseScannerGUI.getInstance().getResourcesByID()", v)
                                } else {
                                    this.scanButton.setEnabled(true);
                                    this.runloop = false
                                }
                            } catch (V) {
                                console.log("MaelstromTools_Basescanner getResources", V)
                            }
                        },
                        createFrame: function () {
                            var w = ClientLib.Data.MainData.GetInstance()
                                .get_Cities();
                            var v = w.get_CurrentOwnCity();
                            var t = new qx.ui.basic.Label()
                                .set({
                                value: '',
                                rich: true,
                                width: 800
                            });
                            this.HT_Stats = t
                        },
                    }
                });
                qx.Class.define("HuffyTools.BaseScannerLayout", {
                    type: "singleton",
                    extend: MaelstromTools.DefaultObject,
                    members: {
                        labels: null,
                        scrollpane: null,
                        comp: null,
                        idcache: null,
                        init: function () {
                            try {
                                console.log("BaseScannerLayout.init: ");
                                this.labels = [];
                                this.Window.setPadding(0);
                                this.Window.set({
                                    resizable: false
                                });
                                this.Window.removeAll();
                                this.Window.setLayout(new qx.ui.layout.Flow()
                                    .set({
                                    spacingX: 3,
                                    spacingY: 3
                                }));
                                this.scrollpane = new qx.ui.container.Scroll()
                                    .set({
                                    width: 800,
                                    height: 350
                                });
                                this.comp = new qx.ui.container.Composite();
                                this.comp.setLayout(new qx.ui.layout.Flow()
                                    .set({
                                    spacingX: 3,
                                    spacingY: 3
                                }));
                                this.Window.add(this.scrollpane);
                                this.scrollpane.add(this.comp);
                                this.createmap()
                            } catch (l) {
                                console.log("HuffyTools.BaseScannerLayout.init: ", l)
                            }
                        },
                        updateCache: function () {
                            try {} catch (l) {
                                console.log("HuffyTools.BaseScannerLayout.updateCache: ", l)
                            }
                        },
                        setWidgetLabels: function () {
                            try {
                                if (this.labels == null) {
                                    this.init()
                                }
                            } catch (l) {
                                console.log("HuffyTools.BaseScannerLayout.setWidgetLabels: ", l)
                            }
                        },
                        createmap: function () {
                            var v = window.HuffyTools.BaseScannerGUI.getInstance()
                                .resmap;
                            var z = window.HuffyTools.BaseScannerGUI.getInstance()
                                .rowData;
                            this.idcache = [];
                            var C = window.HuffyTools.BaseScannerGUI.getInstance()
                                .resmapViewOptions.getSelection()[0].getModel();
                            var u = null;
                            if (z == null) {
                                console.log("rowData null: ");
                                return
                            }
                            this.labels = [];
                            for (var t in v) {
                                for (i = 0; i < z.length; i++) {
                                    if (z[i][0] == t) {
                                        u = z[i]
                                    }
                                }
                                if (u == null) {
                                    continue
                                }
                                if (C > 4 && C < 8) {
                                    if (C != u[10]) {
                                        continue
                                    }
                                } else {
                                    continue
                                }
                                posData = u[3];
                                if (posData != null && posData.split(":")
                                    .length == 2) {
                                    posX = parseInt(posData.split(":")[0]);
                                    posY = parseInt(posData.split(":")[1])
                                }
                                var E = '<table border="2" cellspacing="0" cellpadding="0">';
                                var D = u[2] + " - " + u[3];
                                E = E + '<tr><td colspan="9"><font color="#FFF">' + D + "</font></td></tr>";
                                for (y = 0; y < 8; y++) {
                                    E = E + "<tr>";
                                    for (x = 0; x < 9; x++) {
                                        var A = "";
                                        var B = v[t][x][y];
                                        switch (B == undefined ? 0 : B) {
                                        case 2:
                                            A = '<img width="14" height="14" src="' + n.images[MaelstromTools.Statics.Tiberium] + '">';
                                            break;
                                        case 1:
                                            A = '<img width="14" height="14" src="' + n.images[MaelstromTools.Statics.Crystal] + '">';
                                            break;
                                        default:
                                            A = '<img width="14" height="14" src="' + n.images["Emptypixels"] + '">';
                                            break
                                        }
                                        E = E + "<td>" + A + "</td>"
                                    }
                                    E = E + "</tr>"
                                }
                                E = E + "</table>";
                                var w = new qx.ui.basic.Label()
                                    .set({
                                    backgroundColor: "#303030",
                                    value: E,
                                    rich: true
                                });
                                w.cid = t;
                                this.idcache.push(t);
                                w.addListener("click", function (F) {
                                    console.log("clickid ", this.cid);
                                    var l = qx.core.Init.getApplication();
                                    l.getBackgroundArea()
                                        .closeCityInfo();
                                    l.getPlayArea()
                                        .setView(webfrontend.gui.PlayArea.PlayArea.modes.EMode_CombatSetupBase, this.cid, 0, 0)
                                });
                                w.setReturnValue = t;
                                this.labels.push(w);
                                this.comp.removeAll();
                                for (a = 0; a < this.labels.length; a++) {
                                    this.comp.add(this.labels[a])
                                }
                            }
                        },
                    }
                })
            }
            function f(m) {
                for (var e in m) {
                    if (typeof (m[e]) == "function") {
                        var l = m[e].toString();
                        console.log(e, l)
                    }
                }
            }
            function g(p, o, r, q) {
                var l = [];
                var m = p.toString();
                var e = m.replace(/\s/gim, "");
                l = e.match(o);
                for (i = 1; i < (q + 1); i++) {
                    if (l != null && l[i].length == 6) {
                        console.log(r, i, l[i])
                    } else {
                        console.error("Error - ", r, i, "not found");
                        console.warn(r, e)
                    }
                }
                return l
            }
            function j() {
                try {
                    if (typeof qx != "undefined" && typeof MaelstromTools != "undefined") {
                        k()
                    } else {
                        window.setTimeout(j, 1000)
                    }
                } catch (l) {
                    console.log("MaelstromTools_Basescanner_checkIfLoaded: ", l)
                }
            }
            if (/commandandconquer\.com/i.test(document.domain)) {
                window.setTimeout(j, 10000)
            }
        } catch (h) {
            console.log("Maelstrom_Basescanner ERROR A: ", h)
        }
    };
    try {
        var b = document.createElement("script");
        b.innerHTML = "(" + c.toString() + ")();";
        b.type = "text/javascript";
        if (/commandandconquer\.com/i.test(document.domain)) {
            document.getElementsByTagName("head")[0].appendChild(b)
        }
    } catch (d) {
        console.log("MaelstromTools_Basescanner: init error: ", d)
    }
})();