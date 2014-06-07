// ==UserScript==
// @name        C&C:Tiberium Alliances Maelstrom Tools EXTEND
// @namespace   daim
// @description Just a set of statistics & summaries about repair time and base resources. Mainly for internal use, but you are free to test and comment it.
// @version     0.0.9.3
// @author      daim
// @include     http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @require     http://sizzlemctwizzle.com/updater.php?id=136153&days=1
// ==/UserScript==
(function() {
    var a = function() {
        function c() {
            try {
                if (typeof qx != "undefined" && qx.core.Init.getApplication() && qx.core.Init.getApplication().getNavigationBar() && qx.core.Init.getApplication().getNavigationBar().isVisible()) {
                    a();
                    window.MaelstromTools.main.getInstance().initialize()
                } else {
                    window.setTimeout(c, 1e3)
                }
            } catch(b) {
                console.log("MaelstromTools_checkIfLoaded: ", b)
            }
        }
        try {
            function a() {
                console.log("MaelstromTools loaded");
                qx.Class.define("MaelstromTools.main", {
                    type: "singleton",
                    extend: qx.core.Object,
                    members: {
                        timerInterval: null,
                        images: null,
                        currentOpenedWindow: null,
                        currentOpenedWindowName: null,
                        menuWindow: null,
                        mWindows: null,
                        forgottenBasesWindow: null,
                        forgottenBasesWidget: null,
                        itemsOnDesktop: null,
                        itemsOnDesktopCount: null,
                        buttonCollectAllResources: null,
                        buttonRepairAllUnits: null,
                        initialize: function() {
                            try {
                                this.itemsOnDesktopCount = 0;
                                this.itemsOnDesktop = new Object;
                                this.timerInterval = 1e3;
                                var b = ClientLib.File.FileManager.GetInstance();
                                this.createNewImage(a.Tiberium, "webfrontend/ui/common/icn_res_tiberium.png");
                                this.createNewImage(a.Crystal, "webfrontend/ui/common/icn_res_chrystal.png");
                                this.createNewImage(a.Power, "webfrontend/ui/common/icn_res_power.png");
                                this.createNewImage(a.Dollar, "webfrontend/ui/common/icn_res_dollar.png");
                                this.createNewImage("MainMenu", "ui/common/icn_build_slots.png", b);
                                this.createNewImage("AccessBase", "ui/icons/icon_mainui_enterbase.png", b);
                                this.createNewImage("Packages", "ui/gdi/icons/icon_collect_packages.png", b);
                                this.createNewImage("RepairAllUnits", "ui/gdi/icons/icon_repair_all_button.png", b);
                                this.createNewWindow("MainMenu", "R", 325, 40, 200, 80);
                                this.createNewWindow("Production", "L", 120, 25, 340, 140);
                                this.createNewWindow("RepairTime", "L", 120, 25, 340, 140);
                                this.createNewWindow("ResourceOverview", "L", 120, 25, 340, 140);
                                this.createNewWindow("ForgottenBases", "L", 120, 25, 340, 140);
                                this.buttonCollectAllResources = this.createDesktopButton("Collect all packages", "Packages");
                                this.buttonCollectAllResources.addListener("click", this.collectAllPackages, this);
                                this.buttonRepairAllUnits = this.createDesktopButton("Repair all units", "RepairAllUnits");
                                this.buttonRepairAllUnits.addListener("click", this.repairAllUnits, this);
                                var c = this.createDesktopButton("Open MaelstromTools", "MainMenu");
                                c.addListener("click", this.openMainMenu, this);
                                this.addToDesktop("MainMenu", c);
                                this.runAutoCollectPackageTimer() 
                            } catch(d) {
                                console.log("MaelstromTools.initialize: ", d)
                            }
                        },
                        createDesktopButton: function(a, b) {
                            try {
                                return (new qx.ui.form.Button(null, this.images[b])).set({
                                    toolTipText: a,
                                    width: 50,
                                    height: 40,
                                    maxWidth: 50,
                                    maxHeight: 40
                                })
                            } catch(c) {
                                console.log("MaelstromTools.createDesktopButton: ", c)
                            }
                        },
                        createNewImage: function(a, b, c) {
                            try {
                                if (!this.images) {
                                    this.images = new Object
                                }
                                if (!c) {
                                    this.images[a] = new qx.ui.basic.Image(b);
                                    this.images[a].setScale(true);
                                    this.images[a].setWidth(20);
                                    this.images[a].setHeight(20)
                                } else {
                                    this.images[a] = c.GetPhysicalPath(b)
                                }
                            } catch(d) {
                                console.log("MaelstromTools.createNewImage: ", d)
                            }
                        },
                        createNewWindow: function(a, b, c, d, e, f) {
                            try {
                                if (!this.mWindows) {
                                    this.mWindows = new Object
                                }
                                this.mWindows[a] = new Object;
                                this.mWindows[a]["Align"] = b;
                                this.mWindows[a]["x"] = c;
                                this.mWindows[a]["y"] = d;
                                this.mWindows[a]["w"] = e;
                                this.mWindows[a]["h"] = f
                            } catch(g) {
                                console.log("MaelstromTools.createNewWindow: ", g)
                            }
                        },
                        addToDesktop: function(a, b) {
                            try {
                                if (this.itemsOnDesktop[a] != null) {
                                    return
                                }
                                var c = qx.core.Init.getApplication();
                                var d = c.getNavigationBar();
                                c.getDesktop().add(b, {
                                    right: d.getBounds().width + 55 * this.itemsOnDesktopCount,
                                    top: 40
                                });
                                this.itemsOnDesktop[a] = b;
                                this.itemsOnDesktopCount++
                            } catch(e) {
                                console.log("MaelstromTools.addToDesktop: ", e)
                            }
                        },
                        removeFromDesktop: function(a, b) {
                            try {
                                if (b == null) {
                                    b = true
                                }
                                var c = qx.core.Init.getApplication();
                                if (this.itemsOnDesktop[a] != null) {
                                    c.getDesktop().remove(this.itemsOnDesktop[a]);
                                    this.itemsOnDesktop[a] = null;
                                    this.itemsOnDesktopCount--;
                                    if (b && this.itemsOnDesktopCount > 1) {
                                        for (var d in this.itemsOnDesktop) {
                                            if (d == "MainMenu") {
                                                continue
                                            }
                                            var e = this.itemsOnDesktop[d];
                                            if (e == null) {
                                                continue
                                            }
                                            this.removeFromDesktop(d, false);
                                            this.addToDesktop(d, e)
                                        }
                                    }
                                }
                            } catch(f) {
                                console.log("MaelstromTools.removeFromDesktop: ", f)
                            }
                        },
                        getCityButton: function(a) {
                            try {
                                var b = (new qx.ui.form.Button(null, this.images["AccessBase"])).set({
                                    appearance: "button-detailview-small",
                                    toolTipText: "Access " + a,
                                    width: 20,
                                    height: 20
                                });
                                b.setUserData("cityId", d.Cities[a].ID);
                                b.addListener("click",
                                function(a) {
                                    c.openCityScreen(a.getTarget().getUserData("cityId"))
                                },
                                this);
                                return b
                            } catch(e) {
                                console.log("MaelstromTools.getCityButton: ", e)
                            }
                        },
                        addToMainMenu: function(a, b) {
                            try {
                                var c = (new qx.ui.form.Button(a)).set({
                                    width: 100,
                                    appearance: "button-text-small",
                                    toolTipText: a
                                });
                                c.addListener("click", b, this);
                                this.menuWindow.add(c)
                            } catch(d) {
                                console.log("MaelstromTools.addToMainMenu: ", d)
                            }
                        },
                        openMainMenu: function() {
                            try {
                                if (!this.menuWindow) {
                                    this.menuWindow = (new qx.ui.popup.Popup(new qx.ui.layout.Canvas)).set({
                                        layout: new qx.ui.layout.VBox(5),
                                        backgroundColor: "#303030",
                                        padding: [5, 5]
                                    });
                                    this.addToMainMenu("Overall production", this.openProductionWindow);
                                    this.addToMainMenu("Base resource overview", this.openResourceOverviewWindow);
                                    this.addToMainMenu("Repair time overview", this.openRepairTimeWindow)
                                }
                                this.openWindow(this.menuWindow, "MainMenu")
                            } catch(a) {
                                console.log("MaelstromTools.openMainMenu: ", a)
                            }
                        },
                        runAutoCollectPackageTimer: function() {
                            this.checkForPackages();
                            this.checkRepairAllUnits();
                            var a = this;
                            window.setTimeout(function() {
                                a.runAutoCollectPackageTimer()
                            },
                            5e3)
                        },
                        runMainMenuTimer: function() {
                            try {} catch(a) {
                                console.log("MaelstromTools.startMainMenuTimer: ", a)
                            }
                        },
                        openWindow: function(a, b) {
                            try {
                                if (a != this.currentOpenedWindow) {
                                    this.closeCurrentWindow();
                                    this.currentOpenedWindow = a;
                                    this.currentOpenedWindowName = b
                                }
                                if (!a.isVisible()) {
                                    this.moveWindow();
                                    if (b == "MainMenu") {
                                        a.show()
                                    } else {
                                        a.open()
                                    }
                                    if (b == "MainMenu") {
                                        this.runMainMenuTimer()
                                    }
                                }
                            } catch(c) {
                                console.log("MaelstromTools.openWindow: ", c)
                            }
                        },
                        moveWindow: function() {
                            try {
                                if (this.mWindows[this.currentOpenedWindowName]["Align"] == "R") {
                                    this.currentOpenedWindow.moveTo(qx.bom.Viewport.getWidth(window) - this.mWindows[this.currentOpenedWindowName]["x"], this.mWindows[this.currentOpenedWindowName]["y"])
                                } else {
                                    this.currentOpenedWindow.moveTo(this.mWindows[this.currentOpenedWindowName]["x"], this.mWindows[this.currentOpenedWindowName]["y"])
                                }
                                this.currentOpenedWindow.setHeight(this.mWindows[this.currentOpenedWindowName]["h"]);
                                this.currentOpenedWindow.setWidth(this.mWindows[this.currentOpenedWindowName]["w"])
                            } catch(a) {
                                console.log("MaelstromTools.moveWindow: ", a)
                            }
                        },
                        closeCurrentWindow: function() {
                            try {
                                if (this.currentOpenedWindow != null) {
                                    if (this.currentOpenedWindowName == "MainMenu") {
                                        this.currentOpenedWindow.hide()
                                    } else {
                                        this.currentOpenedWindow.close()
                                    }
                                }
                            } catch(a) {
                                console.log("MaelstromTools.closeCurrentWindow: ", a)
                            }
                        },
                        openResourceOverviewWindow: function() {
                            window.MaelstromTools.ResourceOverview.getInstance().openResourceOverviewWindow()
                        },
                        openProductionWindow: function() {
                            window.MaelstromTools.Production.getInstance().openProductionWindow()
                        },
                        openRepairTimeWindow: function() {
                            window.MaelstromTools.RepairTime.getInstance().openRepairTimeWindow()
                        },
                        openScanForgottenBasesWindow: function() {
                            var a = window.MaelstromTools.Scanner.getInstance();
                            var b = ClientLib.Data.MainData.GetInstance();
                            var c = b.get_Cities();
                            var d = c.get_CurrentOwnCity();
                            var e = a.getForgottenBasesAroundCity(d);
                            a.scanForgottenBases(e)
                        },
                        checkForPackages: function() {
                            try {
                                d.updateCityCache();
                                for (var a in d.Cities) {
                                    var b = d.Cities[a].Object;
                                    if (b.get_CityBuildingsData().get_HasCollectableBuildings()) {
                                        this.addToDesktop("CollectAllResources", this.buttonCollectAllResources);
                                        this.collectAllPackages();
                                        return true
                                    }
                                }
                                this.removeFromDesktop("CollectAllResources");
                                return false
                            } catch(c) {
                                console.log("MaelstromTools.checkForPackages: ", c);
                                return false
                            }
                        },
                        collectAllPackages: function() {
                            try {
                                d.updateCityCache();
                                for (var a in d.Cities) {
                                    var b = d.Cities[a].Object;
                                    if (b.get_CityBuildingsData().get_HasCollectableBuildings()) {
                                        b.CollectAllResources()
                                    }
                                }
                                this.removeFromDesktop("CollectAllResources")
                            } catch(c) {
                                console.log("MaelstromTools.collectAllPackages: ", c)
                            }
                        },
                        checkRepairAllUnits: function() {
                            try {
                                d.updateCityCache();
                                for (var a in d.Cities) {
                                    var c = d.Cities[a].Object;
                                    if (b.CanRepairAll(c)) {
                                        this.addToDesktop("RepairAllUnits", this.buttonRepairAllUnits);
                                        return true
                                    }
                                }
                                this.removeFromDesktop("RepairAllUnits");
                                return false
                            } catch(e) {
                                console.log("MaelstromTools.repairAllUnits: ", e);
                                return false
                            }
                        },
                        repairAllUnits: function() {
                            try {
                                d.updateCityCache();
                                for (var a in d.Cities) {
                                    var c = d.Cities[a].Object;
                                    if (b.CanRepairAll(c)) {
                                        var e = ClientLib.Vis.VisMain.GetInstance().get_Mode();
                                        ClientLib.Vis.VisMain.GetInstance().set_Mode(ClientLib.Vis.Mode.ArmySetup);
                                        c.RepairAll();
                                        ClientLib.Vis.VisMain.GetInstance().set_Mode(e)
                                    }
                                }
                                this.removeFromDesktop("RepairAllUnits")
                            } catch(f) {
                                console.log("MaelstromTools.repairAllUnits: ", f)
                            }
                        }
                    }
                });
                qx.Class.define("MaelstromTools.Production", {
                    type: "singleton",
                    extend: qx.core.Object,
                    members: {
                        productionWindow: null,
                        productionWidget: null,
                        openProductionWindow: function() {
                            try {
                                if (!this.productionWindow) {
                                    this.productionWindow = (new qx.ui.window.Window("Overall global production")).set({
                                        resizable: false,
                                        showMaximize: false,
                                        showMinimize: false,
                                        allowMaximize: false,
                                        allowMinimize: false,
                                        showStatusbar: false
                                    });
                                    this.productionWindow.setPadding(10);
                                    this.productionWindow.setLayout(new qx.ui.layout.VBox(3));
                                    this.productionWindow.getApplicationRoot().set({
                                        blockerColor: "#000000",
                                        blockerOpacity: .6
                                    });
                                    this.productionWidget = new qx.ui.container.Composite(new qx.ui.layout.Grid);
                                    this.productionWidget.setTextColor("white");
                                    this.productionWindow.add(this.productionWidget)
                                }
                                e.openWindow(this.productionWindow, "Production");
                                this.calcProduction()
                            } catch(a) {
                                console.log("MaelstromTools.openProductionWindow: ", a)
                            }
                        },
                        calcProduction: function() {
                            try {
                                d.updateProductionCache();
                                this.setProductionWidgetLabels();
                                if (this.productionWindow.isVisible()) {
                                    var a = this;
                                    window.setTimeout(function() {
                                        a.calcProduction()
                                    },
                                    this.timerInterval)
                                }
                            } catch(b) {
                                console.log("MaelstromTools.calcProduction: ", b)
                            }
                        },
                        createProductionLabels2: function(c, f, g, h) {
                            try {
                                if (g == "-Total-") {
                                    var i = Object();
                                    i["Delta"] = 0;
                                    i["ExtraBonusDelta"] = 0;
                                    i["POI"] = 0;
                                    i["Total"] = 0;
                                    for (var g in d.Production) {
                                        i["Delta"] += d.Production[g][h]["Delta"];
                                        i["ExtraBonusDelta"] += d.Production[g][h]["ExtraBonusDelta"];
                                        i["POI"] += d.Production[g][h]["POI"]
                                    }
                                    i["Total"] = i["Delta"] + i["ExtraBonusDelta"] + i["POI"];
                                    c++;
                                    this.productionWidget.add((new qx.ui.basic.Label).set({
                                        value: b.FormatNumbersCompact(i["Delta"]),
                                        textAlign: "right",
                                        font: "bold",
                                        width: 100
                                    }), {
                                        row: c++,
                                        column: f
                                    });
                                    this.productionWidget.add((new qx.ui.basic.Label).set({
                                        value: b.FormatNumbersCompact(i["ExtraBonusDelta"]),
                                        textAlign: "right",
                                        font: "bold",
                                        width: 100
                                    }), {
                                        row: c++,
                                        column: f
                                    });
                                    if (h != a.Dollar) {
                                        this.productionWidget.add((new qx.ui.basic.Label).set({
                                            value: b.FormatNumbersCompact(i["POI"]),
                                            textAlign: "right",
                                            font: "bold",
                                            width: 100
                                        }), {
                                            row: c++,
                                            column: f
                                        })
                                    }
                                    this.productionWidget.add((new qx.ui.basic.Label).set({
                                        value: b.FormatNumbersCompact(i["Total"]),
                                        textAlign: "right",
                                        font: "bold",
                                        width: 100
                                    }), {
                                        row: c++,
                                        column: f
                                    })
                                } else if (g == "-Labels-") {
                                    this.productionWidget.add(e.images[h], {
                                        row: c++,
                                        column: f,
                                        width: 120
                                    });
                                    this.productionWidget.add((new qx.ui.basic.Label).set({
                                        value: "Continuous"
                                    }), {
                                        row: c++,
                                        column: f
                                    });
                                    this.productionWidget.add((new qx.ui.basic.Label).set({
                                        value: "Bonus"
                                    }), {
                                        row: c++,
                                        column: f
                                    });
                                    if (h != a.Dollar) {
                                        this.productionWidget.add((new qx.ui.basic.Label).set({
                                            value: "POI"
                                        }), {
                                            row: c++,
                                            column: f
                                        })
                                    }
                                    this.productionWidget.add((new qx.ui.basic.Label).set({
                                        value: "Total / h",
                                        textAlign: "right",
                                        font: "bold"
                                    }), {
                                        row: c++,
                                        column: f
                                    })
                                } else {
                                    if (c > 2) {
                                        c++
                                    }
                                    this.productionWidget.add((new qx.ui.basic.Label).set({
                                        value: b.FormatNumbersCompact(d.Production[g][h]["Delta"]),
                                        textAlign: "right",
                                        width: 100
                                    }), {
                                        row: c++,
                                        column: f
                                    });
                                    this.productionWidget.add((new qx.ui.basic.Label).set({
                                        value: b.FormatNumbersCompact(d.Production[g][h]["ExtraBonusDelta"]),
                                        textAlign: "right",
                                        width: 100
                                    }), {
                                        row: c++,
                                        column: f
                                    });
                                    if (h != a.Dollar) {
                                        this.productionWidget.add((new qx.ui.basic.Label).set({
                                            value: b.FormatNumbersCompact(d.Production[g][h]["POI"]),
                                            textAlign: "right",
                                            width: 100
                                        }), {
                                            row: c++,
                                            column: f
                                        })
                                    }
                                    this.productionWidget.add((new qx.ui.basic.Label).set({
                                        value: b.FormatNumbersCompact(d.Production[g][h]["Delta"] + d.Production[g][h]["ExtraBonusDelta"] + d.Production[g][h]["POI"]),
                                        textAlign: "right",
                                        width: 100,
                                        font: "bold"
                                    }), {
                                        row: c++,
                                        column: f
                                    })
                                }
                                return c
                            } catch(j) {
                                console.log("MaelstromTools.createProductionLabels2: ", j)
                            }
                        },
                        setProductionWidgetLabels: function() {
                            try {
                                this.productionWidget.removeAll();
                                var b = 1;
                                var c = 1;
                                b = this.createProductionLabels2(b, c, "-Labels-", a.Tiberium);
                                b = this.createProductionLabels2(b, c, "-Labels-", a.Crystal);
                                b = this.createProductionLabels2(b, c, "-Labels-", a.Power);
                                b = this.createProductionLabels2(b, c, "-Labels-", a.Dollar);
                                c++;
                                for (var f in d.Production) {
                                    b = 1;
                                    this.productionWidget.add((new qx.ui.basic.Label).set({
                                        value: f,
                                        textAlign: "right",
                                        width: 100
                                    }), {
                                        row: b,
                                        column: c
                                    });
                                    b++;
                                    b = this.createProductionLabels2(b, c, f, a.Tiberium);
                                    b = this.createProductionLabels2(b, c, f, a.Crystal);
                                    b = this.createProductionLabels2(b, c, f, a.Power);
                                    b = this.createProductionLabels2(b, c, f, a.Dollar);
                                    this.productionWidget.add(e.getCityButton(f), {
                                        row: b,
                                        column: c
                                    });
                                    c++
                                }
                                b = 1;
                                this.productionWidget.add((new qx.ui.basic.Label).set({
                                    value: "Total / h",
                                    textAlign: "right",
                                    font: "bold",
                                    width: 100
                                }), {
                                    row: b,
                                    column: c
                                });
                                b = this.createProductionLabels2(b, c, "-Total-", a.Tiberium);
                                b = this.createProductionLabels2(b, c, "-Total-", a.Crystal);
                                b = this.createProductionLabels2(b, c, "-Total-", a.Power);
                                b = this.createProductionLabels2(b, c, "-Total-", a.Dollar)
                            } catch(g) {
                                console.log("MaelstromTools.setProductionWidgetLabels: ", g)
                            }
                        }
                    }
                });
                qx.Class.define("MaelstromTools.RepairTime", {
                    type: "singleton",
                    extend: qx.core.Object,
                    members: {
                        repairTimeWindow: null,
                        repairTimeWidget: null,
                        openRepairTimeWindow: function() {
                            try {
                                if (!this.repairTimeWindow) {
                                    this.repairTimeWindow = (new qx.ui.window.Window("Repair time overview")).set({
                                        resizable: false,
                                        showMaximize: false,
                                        showMinimize: false,
                                        allowMaximize: false,
                                        allowMinimize: false,
                                        showStatusbar: false
                                    });
                                    this.repairTimeWindow.setPadding(10);
                                    this.repairTimeWindow.setLayout(new qx.ui.layout.VBox(3));
                                    this.repairTimeWindow.getApplicationRoot().set({
                                        blockerColor: "#000000",
                                        blockerOpacity: .6
                                    });
                                    this.repairTimeWidget = new qx.ui.container.Composite(new qx.ui.layout.Grid(5, 5));
                                    this.repairTimeWidget.setTextColor("white");
                                    this.repairTimeWindow.add(this.repairTimeWidget)
                                }
                                e.openWindow(this.repairTimeWindow, "RepairTime");
                                this.calcRepairTime()
                            } catch(a) {
                                console.log("MaelstromTools.openRepairTimeWindow: ", a)
                            }
                        },
                        calcRepairTime: function() {
                            try {
                                d.updateRepairTimeCache();
                                this.setRepairTimeWidgetLabels();
                                if (this.repairTimeWindow.isVisible()) {
                                    var a = this;
                                    window.setTimeout(function() {
                                        a.calcRepairTime()
                                    },
                                    this.timerInterval)
                                }
                            } catch(b) {
                                console.log("MaelstromTools.calcRepairTime: ", b)
                            }
                        },
                        setRepairTimeWidgetLabels: function() {
                            try {
                                this.repairTimeWidget.removeAll();
                                var a = 1;
                                var b = 2;
                                this.repairTimeWidget.add((new qx.ui.basic.Label).set({
                                    value: "Infantry",
                                    textAlign: "right",
                                    width: 60
                                }), {
                                    row: a,
                                    column: b++
                                });
                                this.repairTimeWidget.add((new qx.ui.basic.Label).set({
                                    value: "Vehicles",
                                    textAlign: "right",
                                    width: 60
                                }), {
                                    row: a,
                                    column: b++
                                });
                                this.repairTimeWidget.add((new qx.ui.basic.Label).set({
                                    value: "Aircraft",
                                    textAlign: "right",
                                    width: 60
                                }), {
                                    row: a,
                                    column: b++
                                });
                                this.repairTimeWidget.add((new qx.ui.basic.Label).set({
                                    value: "Available time",
                                    textAlign: "right",
                                    width: 80
                                }), {
                                    row: a,
                                    column: b++
                                });
                                a++;
                                for (var c in d.RepairTime) {
                                    if (d.RepairTime[c]["RepairTime"]["Infantry"] + d.RepairTime[c]["RepairTime"]["Vehicle"] + d.RepairTime[c]["RepairTime"]["Aircraft"] == 0) {
                                        continue
                                    }
                                    b = 1;
                                    this.repairTimeWidget.add((new qx.ui.basic.Label).set({
                                        value: c,
                                        textAlign: "left",
                                        width: 100
                                    }), {
                                        row: a,
                                        column: b++
                                    });
                                    this.repairTimeWidget.add((new qx.ui.basic.Label).set({
                                        value: ClientLib.Vis.VisMain.FormatTimespan(d.RepairTime[c]["RepairTime"]["Infantry"]),
                                        textAlign: "right",
                                        width: 60
                                    }), {
                                        row: a,
                                        column: b++
                                    });
                                    this.repairTimeWidget.add((new qx.ui.basic.Label).set({
                                        value: ClientLib.Vis.VisMain.FormatTimespan(d.RepairTime[c]["RepairTime"]["Vehicle"]),
                                        textAlign: "right",
                                        width: 60
                                    }), {
                                        row: a,
                                        column: b++
                                    });
                                    this.repairTimeWidget.add((new qx.ui.basic.Label).set({
                                        value: ClientLib.Vis.VisMain.FormatTimespan(d.RepairTime[c]["RepairTime"]["Aircraft"]),
                                        textAlign: "right",
                                        width: 60
                                    }), {
                                        row: a,
                                        column: b++
                                    });
                                    this.repairTimeWidget.add((new qx.ui.basic.Label).set({
                                        value: ClientLib.Vis.VisMain.FormatTimespan(d.RepairTime[c]["Repaircharge"]["Smallest"]),
                                        textAlign: "right",
                                        width: 80
                                    }), {
                                        row: a,
                                        column: b++
                                    });
                                    this.repairTimeWidget.add(e.getCityButton(c), {
                                        row: a,
                                        column: b++
                                    });
                                    a++
                                }
                            } catch(f) {
                                console.log("MaelstromTools.setRepairTimeWidgetLabels: ", f)
                            }
                        }
                    }
                });
                qx.Class.define("MaelstromTools.ResourceOverview", {
                    type: "singleton",
                    extend: qx.core.Object,
                    members: {
                        resourceOverviewWindow: null,
                        resourceOverviewWidget: null,
                        openResourceOverviewWindow: function() {
                            try {
                                if (!this.resourceOverviewWindow) {
                                    this.resourceOverviewWindow = (new qx.ui.window.Window("Base resource overview")).set({
                                        resizable: false,
                                        showMaximize: false,
                                        showMinimize: false,
                                        allowMaximize: false,
                                        allowMinimize: false,
                                        showStatusbar: false
                                    });
                                    this.resourceOverviewWindow.setPadding(10);
                                    this.resourceOverviewWindow.setLayout(new qx.ui.layout.VBox(3));
                                    this.resourceOverviewWindow.getApplicationRoot().set({
                                        blockerColor: "#000000",
                                        blockerOpacity: .6
                                    });
                                    this.resourceOverviewWidget = new qx.ui.container.Composite(new qx.ui.layout.Grid(5, 5));
                                    this.resourceOverviewWidget.setTextColor("white");
                                    this.resourceOverviewWindow.add(this.resourceOverviewWidget)
                                }
                                e.openWindow(this.resourceOverviewWindow, "ResourceOverview");
                                this.calcResourceOverview()
                            } catch(a) {
                                console.log("MaelstromTools.openResourceOverviewWindow: ", a)
                            }
                        },
                        calcResourceOverview: function() {
                            try {
                                d.updateResourceOverviewCache();
                                this.setResourceOverviewWidgetLabels();
                                if (this.resourceOverviewWindow.isVisible()) {
                                    var a = this;
                                    window.setTimeout(function() {
                                        a.calcResourceOverview()
                                    },
                                    this.timerInterval)
                                }
                            } catch(b) {
                                console.log("MaelstromTools.calcResourceOverview: ", b)
                            }
                        },
                        setResourceOverviewWidgetLabels: function() {
                            try {
                                this.resourceOverviewWidget.removeAll();
                                this.resourceOverviewWidget.add(e.images[a.Tiberium], {
                                    row: 1,
                                    column: 2
                                });
                                this.resourceOverviewWidget.add(e.images[a.Crystal], {
                                    row: 1,
                                    column: 4
                                });
                                this.resourceOverviewWidget.add(e.images[a.Power], {
                                    row: 1,
                                    column: 6
                                });
                                var c = 2;
                                var f = Object();
                                var g = 1;
                                f[a.Tiberium] = 0;
                                f[a.Crystal] = 0;
                                f[a.Power] = 0;
                                for (var h in d.ResourceOverview) {
                                    f[a.Tiberium] += d.ResourceOverview[h][a.Tiberium];
                                    f[a.Crystal] += d.ResourceOverview[h][a.Crystal];
                                    f[a.Power] += d.ResourceOverview[h][a.Power];
                                    g = 1;
                                    this.resourceOverviewWidget.add((new qx.ui.basic.Label).set({
                                        value: h,
                                        textAlign: "left",
                                        width: 100,
                                        rich: true
                                    }), {
                                        row: c,
                                        column: g++
                                    });
                                    this.resourceOverviewWidget.add((new qx.ui.basic.Label).set({
                                        value: b.FormatNumbersCompact(d.ResourceOverview[h][a.Tiberium]),
                                        textAlign: "right",
                                        width: 60,
                                        textColor: d.ResourceOverview[h][a.Tiberium] >= d.ResourceOverview[h][a.Tiberium + "Max"] ? a.ColorRed: d.ResourceOverview[h][a.Tiberium] >= .75 * d.ResourceOverview[h][a.Tiberium + "Max"] ? a.ColorYellow: a.ColorDefault
                                    }), {
                                        row: c,
                                        column: g++
                                    });
                                    if (d.ResourceOverview[h][a.Tiberium] < d.ResourceOverview[h][a.Tiberium + "Max"]) {
                                        this.resourceOverviewWidget.add((new qx.ui.basic.Label).set({
                                            value: b.GetDateTimeString(d.ResourceOverview[h][a.Tiberium + "Full"]),
                                            textAlign: "right",
                                            width: 100,
                                            textColor: d.ResourceOverview[h][a.Tiberium] >= .75 * d.ResourceOverview[h][a.Tiberium + "Max"] ? a.ColorYellow: a.ColorDefault
                                        }), {
                                            row: c,
                                            column: g++
                                        })
                                    } else {
                                        this.resourceOverviewWidget.add((new qx.ui.basic.Label).set({
                                            value: "Storage full!",
                                            textAlign: "right",
                                            width: 100,
                                            textColor: a.ColorRed
                                        }), {
                                            row: c,
                                            column: g++
                                        })
                                    }
                                    this.resourceOverviewWidget.add((new qx.ui.basic.Label).set({
                                        value: b.FormatNumbersCompact(d.ResourceOverview[h][a.Crystal]),
                                        textAlign: "right",
                                        width: 60,
                                        textColor: d.ResourceOverview[h][a.Crystal] >= d.ResourceOverview[h][a.Crystal + "Max"] ? a.ColorRed: d.ResourceOverview[h][a.Crystal] >= .75 * d.ResourceOverview[h][a.Crystal + "Max"] ? a.ColorYellow: a.ColorDefault
                                    }), {
                                        row: c,
                                        column: g++
                                    });
                                    if (d.ResourceOverview[h][a.Crystal] < d.ResourceOverview[h][a.Crystal + "Max"]) {
                                        this.resourceOverviewWidget.add((new qx.ui.basic.Label).set({
                                            value: b.GetDateTimeString(d.ResourceOverview[h][a.Crystal + "Full"]),
                                            textAlign: "right",
                                            width: 100,
                                            textColor: d.ResourceOverview[h][a.Crystal] >= .75 * d.ResourceOverview[h][a.Crystal + "Max"] ? a.ColorYellow: a.ColorDefault
                                        }), {
                                            row: c,
                                            column: g++
                                        })
                                    } else {
                                        this.resourceOverviewWidget.add((new qx.ui.basic.Label).set({
                                            value: "Storage full!",
                                            textAlign: "right",
                                            width: 100,
                                            textColor: a.ColorRed
                                        }), {
                                            row: c,
                                            column: g++
                                        })
                                    }
                                    this.resourceOverviewWidget.add((new qx.ui.basic.Label).set({
                                        value: b.FormatNumbersCompact(d.ResourceOverview[h][a.Power]),
                                        textAlign: "right",
                                        width: 60,
                                        textColor: d.ResourceOverview[h][a.Power] >= d.ResourceOverview[h][a.Power + "Max"] ? a.ColorRed: d.ResourceOverview[h][a.Power] >= .75 * d.ResourceOverview[h][a.Power + "Max"] ? a.ColorYellow: a.ColorDefault
                                    }), {
                                        row: c,
                                        column: g++
                                    });
                                    if (d.ResourceOverview[h][a.Power] < d.ResourceOverview[h][a.Power + "Max"]) {
                                        this.resourceOverviewWidget.add((new qx.ui.basic.Label).set({
                                            value: b.GetDateTimeString(d.ResourceOverview[h][a.Power + "Full"]),
                                            textAlign: "right",
                                            width: 100,
                                            textColor: d.ResourceOverview[h][a.Power] >= .75 * d.ResourceOverview[h][a.Power + "Max"] ? a.ColorYellow: a.ColorDefault
                                        }), {
                                            row: c,
                                            column: g++
                                        })
                                    } else {
                                        this.resourceOverviewWidget.add((new qx.ui.basic.Label).set({
                                            value: "Storage full!",
                                            textAlign: "right",
                                            width: 100,
                                            textColor: a.ColorRed
                                        }), {
                                            row: c,
                                            column: g++
                                        })
                                    }
                                    this.resourceOverviewWidget.add(e.getCityButton(h), {
                                        row: c,
                                        column: g++
                                    });
                                    c++
                                }
                                g = 1;
                                this.resourceOverviewWidget.add((new qx.ui.basic.Label).set({
                                    value: "Total resources",
                                    textAlign: "left",
                                    width: 100,
                                    font: "bold"
                                }), {
                                    row: c,
                                    column: g++
                                });
                                this.resourceOverviewWidget.add((new qx.ui.basic.Label).set({
                                    value: b.FormatNumbersCompact(f[a.Tiberium]),
                                    textAlign: "right",
                                    width: 60,
                                    font: "bold"
                                }), {
                                    row: c,
                                    column: g++
                                });
                                g++;
                                this.resourceOverviewWidget.add((new qx.ui.basic.Label).set({
                                    value: b.FormatNumbersCompact(f[a.Crystal]),
                                    textAlign: "right",
                                    width: 60,
                                    font: "bold"
                                }), {
                                    row: c,
                                    column: g++
                                });
                                g++;
                                this.resourceOverviewWidget.add((new qx.ui.basic.Label).set({
                                    value: b.FormatNumbersCompact(f[a.Power]),
                                    textAlign: "right",
                                    width: 60,
                                    font: "bold"
                                }), {
                                    row: c,
                                    column: g++
                                })
                            } catch(i) {
                                console.log("MaelstromTools.setResourceOverviewWidgetLabels: ", i)
                            }
                        }
                    }
                });
                qx.Class.define("MaelstromTools.Scanner", {
                    type: "singleton",
                    extend: qx.core.Object,
                    members: {
                        forgottenBaseCacheRechecks: 0,
                        scanForgottenBases: function(a) {
                            if (!d.ForgottenBases) {
                                d.ForgottenBases = new Object
                            }
                            var c = ClientLib.Data.MainData.GetInstance();
                            var e = c.get_Cities();
                            var f = ClientLib.Net.CommunicationManager.GetInstance();
                            var g = e.get_CurrentCityId();
                            for (var h in a) {
                                if (d.ForgottenBases[h]) {
                                    continue
                                }
                                e.set_CurrentCityId(0);
                                e.set_CurrentCityId(h);
                                var i = b.GetCityByCoord(a[h].x, a[h].y);
                                if (i == null) {
                                    if (this.forgottenBaseCacheRechecks <= 5) {
                                        this.forgottenBaseCacheRechecks++;
                                        if (this.forgottenBaseCacheRechecks > 1) {
                                            console.log("recheck: " + a[h].x + "," + a[h].y)
                                        }
                                        f.UserAction();
                                        var j = this;
                                        window.setTimeout(function() {
                                            j.scanForgottenBases(a)
                                        },
                                        1e3);
                                        return
                                    }
                                    d.ForgottenBases[h] = Object();
                                    this.forgottenBaseCacheRechecks = 0;
                                    return
                                }
                                this.forgottenBaseCacheRechecks = 0;
                                d.ForgottenBases[h] = Object();
                                d.ForgottenBases[h]["City"] = i;
                                d.ForgottenBases[h]["WorldObj"] = a[h].Object;
                                d.ForgottenBases[h]["Resources"] = this.getResources(i)
                            }
                        },
                        logForgottenBases: function() {
                            for (var a in d.ForgottenBases) {
                                var b = d.ForgottenBases[a].City;
                                var c = d.ForgottenBases[a].Resources;
                                console.log("checking: " + b.get_PosX() + "," + b.get_PosY());
                                if (c) {
                                    console.log("tib " + c[1])
                                } else {
                                    console.log("res null")
                                }
                            }
                        },
                        getForgottenBasesAroundCity: function(a, c) {
                            var d = new Object;
                            var e = ClientLib.Data.MainData.GetInstance();
                            var f = e.get_Server().get_MaxAttackDistance();
                            if (c == null) {
                                c = Math.ceil(f)
                            }
                            var g = e.get_World();
                            var h = a.get_PosX();
                            var i = a.get_PosY();
                            console.log("cityPos " + h + ", " + i);
                            for (var j = h - c; j < h + c; j++) {
                                for (var k = i - c; k < i + c; k++) {
                                    var l = g.GetObjectFromPosition(j, k);
                                    if (l == null || l.Type != ClientLib.Data.WorldSector.ObjectType.NPCBase || b.CalcDistance(h, i, j, k) > f) {
                                        continue
                                    }
                                    d[l.Id] = new Object;
                                    d[l.Id]["Object"] = l;
                                    d[l.Id]["x"] = j;
                                    d[l.Id]["y"] = k
                                }
                            }
                            return d
                        }
                    }
                });
                qx.Class.define("MaelstromTools.MT_Statics", {
                    type: "singleton",
                    extend: qx.core.Object,
                    members: {
                        ColorDefault: "#FFFFFF",
                        ColorYellow: "#FFFF00",
                        ColorRed: "#FF0000",
                        Tiberium: "Tiberium",
                        Crystal: "Crystal",
                        Power: "Power",
                        Dollar: "Dollar",
                        Research: "Research"
                    }
                });
                qx.Class.define("MaelstromTools.MT_Tools", {
                    type: "singleton",
                    extend: qx.core.Object,
                    members: {
                        openCityScreen: function(a) {
                            try {
                                if (a > 0) {
                                    var b = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(a);
                                    if (b != null && !b.get_IsGhostMode()) {
                                        webfrontend.gui.UtilView.openCityInMainWindow(a)
                                    }
                                }
                            } catch(c) {
                                console.log("MaelstromTools.MT_Tools.openCityScreen: ", c)
                            }
                        },
                        getResources: function(a) {
                            var b = [0, 0, 0, 0, 0, 0, 0, 0, false];
                            var c = 0;
                            var d = 0;
                            var e = 0;
                            if (a.m_CityUnits != null && a.m_CityBuildings != null) {
                                if (a.m_CityBuildings.m_Buildings != null) {
                                    var f = a.m_CityBuildings.m_Buildings.l.length;
                                    for (c = 0; c < f; c++) {
                                        var g = a.m_CityBuildings.m_Buildings.l[c];
                                        d = g.m_UnitLevelRequirements;
                                        for (e = 0; e < d.rer.length; e++) {
                                            b[d.rer[e].t] += d.rer[e].c * g.get_HitpointsPercent();
                                            if (g.get_HitpointsPercent() < 1) {
                                                b[8] = true
                                            }
                                        }
                                    }
                                }
                                if (a.m_CityUnits.m_DefenseUnits != null) {
                                    var h = a.m_CityUnits.m_DefenseUnits.l.length;
                                    for (c = 0; c < h; c++) {
                                        var i = a.m_CityUnits.m_DefenseUnits.l[c];
                                        d = i.m_UnitLevelRequirements;
                                        for (e = 0; e < d.rer.length; e++) {
                                            b[d.rer[e].t] += d.rer[e].c * i.get_HitpointsPercent();
                                            if (i.get_HitpointsPercent() < 1) {
                                                b[8] = true
                                            }
                                        }
                                    }
                                }
                                var j = true;
                                for (c = 0; c < 8; c++) {
                                    if (b[c] != 0) {
                                        j = false
                                    }
                                }
                                if (j) {
                                    return null
                                }
                                return b
                            }
                            return null
                        }
                    }
                });
                qx.Class.define("MaelstromTools.TA_Functions", {
                    type: "singleton",
                    extend: qx.core.Object,
                    members: {
                        FormatNumbersCompact: function(a) {
                            return webfrontend.gui.Util.formatNumbersCompact(a)
                        },
                        GetDateTimeString: function(a) {
                            return webfrontend.Util.getDateTimeString(a)
                        },
                        CanRepairAll: function(a) {
                            try {
                                var b = ClientLib.Vis.Mode.ArmySetup;
                                var c = a.get_CityRepairData();
                                c.VXI = c.TWI(0, b);
                                c.IXI(b);
                                return c.VXI != null && (!c.LXI.URE() || b != ClientLib.Vis.Mode.ArmySetup)
                            } catch(d) {
                                console.log("MaelstromTools.TA_Functions.CanRepairAll: ", d);
                                return false
                            }
                        },
                        CalcDistance: function(a, b, c, d) {
                            var e = a - c;
                            var f = b - d;
                            return Math.sqrt(e * e + f * f)
                        },
                        GetCityByCoord: function(a, b) {
                            var c = ClientLib.Data.MainData.GetInstance();
                            var d = c.get_Cities();
                            var e = d.GetCityByCoord(a, b);
                            if (e != null) {
                                return e
                            }
                            var f = d.m_OtherCities.d;
                            for (var g in f) {
                                if (f[g].get_PosX() == a && f[g].get_PosY() == b) {
                                    return f[g]
                                }
                            }
                            return null
                        }
                    }
                });
                qx.Class.define("MaelstromTools.MT_Cache", {
                    type: "singleton",
                    extend: qx.core.Object,
                    members: {
                        CityCount: 0,
                        Cities: null,
                        Production: null,
                        RepairTime: null,
                        ResourceOverview: null,
                        ForgottenBases: null,
                        updateCityCache: function() {
                            try {
                                this.CityCount = 0;
                                this.Cities = Object();
                                var a = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities();
                                for (var b in a.d) {
                                    this.CityCount++;
                                    var c = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(b);
                                    var d = c.get_Name();
                                    this.Cities[d] = Object();
                                    this.Cities[d]["ID"] = b;
                                    this.Cities[d]["Object"] = c
                                }
                            } catch(e) {
                                console.log("MaelstromTools.MT_Cache.updateCityCache: ", e)
                            }
                        },
                        updateProductionCache: function() {
                            try {
                                this.updateCityCache();
                                var b = ClientLib.Data.MainData.GetInstance().get_Time();
                                var c = ClientLib.Data.MainData.GetInstance().get_Alliance();
                                this.Production = Object();
                                for (var d in this.Cities) {
                                    var e = this.Cities[d].Object;
                                    var f = e.IOI;
                                    this.Production[d] = Object();
                                    this.Production[d][a.Tiberium] = Object();
                                    this.Production[d][a.Tiberium]["Delta"] = f.d[ClientLib.Base.EResourceType.Tiberium]["Delta"] * b.get_StepsPerHour();
                                    this.Production[d][a.Tiberium]["ExtraBonusDelta"] = f.d[ClientLib.Base.EResourceType.Tiberium]["ExtraBonusDelta"] * b.get_StepsPerHour();
                                    this.Production[d][a.Tiberium]["POI"] = c.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Tiberium);
                                    this.Production[d][a.Crystal] = Object();
                                    this.Production[d][a.Crystal]["Delta"] = f.d[ClientLib.Base.EResourceType.Crystal]["Delta"] * b.get_StepsPerHour();
                                    this.Production[d][a.Crystal]["ExtraBonusDelta"] = f.d[ClientLib.Base.EResourceType.Crystal]["ExtraBonusDelta"] * b.get_StepsPerHour();
                                    this.Production[d][a.Crystal]["POI"] = c.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Crystal);
                                    this.Production[d][a.Power] = Object();
                                    this.Production[d][a.Power]["Delta"] = f.d[ClientLib.Base.EResourceType.Power]["Delta"] * b.get_StepsPerHour();
                                    this.Production[d][a.Power]["ExtraBonusDelta"] = f.d[ClientLib.Base.EResourceType.Power]["ExtraBonusDelta"] * b.get_StepsPerHour();
                                    this.Production[d][a.Power]["POI"] = c.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Power);
                                    this.Production[d][a.Dollar] = Object();
                                    this.Production[d][a.Dollar]["Delta"] = e.get_CityCreditsProduction()["Delta"] * b.get_StepsPerHour();
                                    this.Production[d][a.Dollar]["ExtraBonusDelta"] = e.get_CityCreditsProduction()["ExtraBonusDelta"] * b.get_StepsPerHour();
                                    this.Production[d][a.Dollar]["POI"] = 0
                                }
                            } catch(g) {
                                console.log("MaelstromTools.MT_Cache.updateProductionCache: ", g)
                            }
                        },
                        updateRepairTimeCache: function() {
                            try {
                                this.updateCityCache();
                                this.RepairTime = Object();
                                for (var a in this.Cities) {
                                    var b = this.Cities[a].Object;
                                    this.RepairTime[a] = Object();
                                    this.RepairTime[a]["RepairTime"] = Object();
                                    this.RepairTime[a]["Repaircharge"] = Object();
                                    this.RepairTime[a]["Repaircharge"]["Smallest"] = 999999999;
                                    this.RepairTime[a]["RepairTime"]["Infantry"] = b.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Infantry, false);
                                    this.RepairTime[a]["RepairTime"]["Vehicle"] = b.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Vehicle, false);
                                    this.RepairTime[a]["RepairTime"]["Aircraft"] = b.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Aircraft, false);
                                    this.RepairTime[a]["Repaircharge"]["Infantry"] = b.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeInf);
                                    this.RepairTime[a]["Repaircharge"]["Vehicle"] = b.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeVeh);
                                    this.RepairTime[a]["Repaircharge"]["Aircraft"] = b.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeAir);
                                    if (this.RepairTime[a]["Repaircharge"]["Infantry"] < this.RepairTime[a]["Repaircharge"]["Smallest"]) {
                                        this.RepairTime[a]["Repaircharge"]["Smallest"] = this.RepairTime[a]["Repaircharge"]["Infantry"]
                                    }
                                    if (this.RepairTime[a]["Repaircharge"]["Vehicle"] < this.RepairTime[a]["Repaircharge"]["Smallest"]) {
                                        this.RepairTime[a]["Repaircharge"]["Smallest"] = this.RepairTime[a]["Repaircharge"]["Vehicle"]
                                    }
                                    if (this.RepairTime[a]["Repaircharge"]["Aircraft"] < this.RepairTime[a]["Repaircharge"]["Smallest"]) {
                                        this.RepairTime[a]["Repaircharge"]["Smallest"] = this.RepairTime[a]["Repaircharge"]["Aircraft"]
                                    }
                                }
                            } catch(c) {
                                console.log("MaelstromTools.MT_Cache.updateRepairTimeCache: ", c)
                            }
                        },
                        updateResourceOverviewCache: function() {
                            try {
                                this.updateCityCache();
                                this.ResourceOverview = Object();
                                for (var b in this.Cities) {
                                    var c = this.Cities[b].Object;
                                    var d = ClientLib.Data.MainData.GetInstance().get_Time();
                                    this.ResourceOverview[b] = Object();
                                    this.ResourceOverview[b][a.Tiberium] = c.GetResourceCount(ClientLib.Base.EResourceType.Tiberium);
                                    this.ResourceOverview[b][a.Tiberium + "Max"] = c.GetResourceMaxStorage(ClientLib.Base.EResourceType.Tiberium);
                                    this.ResourceOverview[b][a.Tiberium + "Full"] = d.GetJSStepTime(c.GetResourceStorageFullStep(ClientLib.Base.EResourceType.Tiberium));
                                    this.ResourceOverview[b][a.Crystal] = c.GetResourceCount(ClientLib.Base.EResourceType.Crystal);
                                    this.ResourceOverview[b][a.Crystal + "Max"] = c.GetResourceMaxStorage(ClientLib.Base.EResourceType.Crystal);
                                    this.ResourceOverview[b][a.Crystal + "Full"] = d.GetJSStepTime(c.GetResourceStorageFullStep(ClientLib.Base.EResourceType.Crystal));
                                    this.ResourceOverview[b][a.Power] = c.GetResourceCount(ClientLib.Base.EResourceType.Power);
                                    this.ResourceOverview[b][a.Power + "Max"] = c.GetResourceMaxStorage(ClientLib.Base.EResourceType.Power);
                                    this.ResourceOverview[b][a.Power + "Full"] = d.GetJSStepTime(c.GetResourceStorageFullStep(ClientLib.Base.EResourceType.Power))
                                }
                            } catch(e) {
                                console.log("MaelstromTools.MT_Cache.updateResourceOverviewCache: ", e)
                            }
                        }
                    }
                });
                var a = window.MaelstromTools.MT_Statics.getInstance();
                var b = window.MaelstromTools.TA_Functions.getInstance();
                var c = window.MaelstromTools.MT_Tools.getInstance();
                var d = window.MaelstromTools.MT_Cache.getInstance();
                var e = window.MaelstromTools.main.getInstance();
                console.log("MaelstromTools initialized")
            }
        } catch(b) {
            console.log("createMaelstromTools: ", b)
        }
        if (/commandandconquer\.com/i.test(document.domain)) {
            window.setTimeout(c, 1e3)
        }
    };
    try {
        var b = document.createElement("script");
        b.innerHTML = "(" + a.toString() + ")();";
        b.type = "text/javascript";
        if (/commandandconquer\.com/i.test(document.domain)) {
            document.getElementsByTagName("head")[0].appendChild(b)
        }
    } catch(c) {
        console.log("MaelstromTools: init error: ", c)
    }
})()